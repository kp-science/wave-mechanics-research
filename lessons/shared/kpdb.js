/* ═══════════════════════════════════════════════════════════════════
 * KPDB · Unified student data layer (Firebase RTDB realtime · multi-subject)
 * ─────────────────────────────────────────────────────────────────
 * Single API for ทุกวิชา (astronomy / physics3 / future):
 *   - student progress (Chain, Submit, coins, energy, keys, visited)
 *   - research logs (KPA events, embedded checkpoints, calibration)
 *   - scores (pre/post · live progress สำหรับ teacher dashboard)
 *   - pace remote (teacher → students realtime · <500ms latency)
 *   - presence (live "who's on which page")
 *
 * Schema:
 *   /rooms/{subject}/{roomCode}/pace        ← teacher pace
 *   /rooms/{subject}/{roomCode}/presence/{studentId}
 *   /students/{studentId}/profile
 *   /students/{studentId}/progress/{subject}/{unit}/{key}
 *   /students/{studentId}/research/{subject}/{unit}/{eventId}
 *   /scores/{subject}/{unit}/{studentId}/{type}     (type=pretest|posttest)
 *
 * Fallback: ถ้า Firebase ไม่ได้ config → degrade เป็น localStorage (no realtime)
 *           ถ้า offline → queue + flush เมื่อ reconnect (ใช้ Firebase built-in)
 * ═══════════════════════════════════════════════════════════════════ */
(function (global) {
  let _ctx = { subject: null, unit: null, studentId: null };
  let _db = null;
  let _ready = false;
  let _readyWaiters = [];
  let _offline = false;

  function _markReady() {
    _ready = true;
    _readyWaiters.forEach(fn => { try { fn(); } catch (e) {} });
    _readyWaiters = [];
  }

  function _waitReady() {
    if (_ready) return Promise.resolve();
    return new Promise(res => _readyWaiters.push(res));
  }

  function _autoStudentId() {
    // ใช้จากระบบ login เดิม · fallback เป็น browser-local UUID
    try {
      // common keys ใน KP-Classroom auth
      const candidates = [
        localStorage.getItem('kp_student_id'),
        localStorage.getItem('wave_student_id'),
        localStorage.getItem('student_id'),
      ].filter(Boolean);
      if (candidates.length) return candidates[0];
    } catch (e) {}
    try {
      let id = localStorage.getItem('kpdb_anon_id');
      if (!id) {
        id = 'anon_' + Math.random().toString(36).slice(2, 10) + '_' + Date.now().toString(36);
        localStorage.setItem('kpdb_anon_id', id);
      }
      return id;
    } catch (e) { return 'anon_' + Date.now(); }
  }

  function _autoSubject() {
    if (location.pathname.indexOf('/astronomy/') >= 0) return 'astronomy';
    if (location.pathname.indexOf('/physics3/') >= 0) return 'physics3';
    return 'unknown';
  }

  function _autoUnit() {
    try {
      if (global.EP_CONFIG && global.EP_CONFIG.id) return global.EP_CONFIG.id;
    } catch (e) {}
    // physics3 wave-mechanics: ใช้ wsId / unit จาก URL
    try {
      const params = new URLSearchParams(location.search);
      const u = params.get('unit') || params.get('wsId');
      if (u) return u;
    } catch (e) {}
    // fallback: directory name
    const m = location.pathname.match(/\/(ep\d+|p\d+|shm|sound|light)/i);
    return m ? m[1] : 'default';
  }

  /* ── Firebase init ── */
  async function _initFirebase() {
    if (!global.FirebaseConfig || !global.FirebaseConfig.isConfigured()) {
      console.info('[KPDB] Firebase not configured · degrade to localStorage');
      _markReady();
      return;
    }
    try {
      _db = await global.FirebaseConfig.init();
      if (!_db) throw new Error('Firebase init returned null');
      // monitor offline state
      _db.ref('.info/connected').on('value', s => {
        _offline = !s.val();
      });
      _markReady();
    } catch (e) {
      console.warn('[KPDB] Firebase init failed · degrade to localStorage', e);
      _markReady();
    }
  }

  /* ── localStorage fallback paths ── */
  function _lsKey(...parts) { return 'kpdb:' + parts.filter(Boolean).join(':'); }
  function _lsGet(k, fb) { try { return JSON.parse(localStorage.getItem(k)) || fb; } catch (e) { return fb; } }
  function _lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  const KPDB = {
    /** Initialize once per page · sets context (subject, unit, studentId) */
    init(opts) {
      opts = opts || {};
      _ctx.subject = opts.subject || _autoSubject();
      _ctx.unit = opts.unit || _autoUnit();
      _ctx.studentId = opts.studentId || _autoStudentId();
      if (!global.__kpdbInit) {
        global.__kpdbInit = true;
        _initFirebase();
      }
      return this;
    },

    ctx() { return Object.assign({}, _ctx); },
    isOnline() { return !_offline && !!_db; },
    ready() { return _waitReady(); },

    setStudent(id) { _ctx.studentId = id; },
    setUnit(unit) { _ctx.unit = unit; },

    /* ─── Profile ─── */
    async setProfile(profile) {
      await _waitReady();
      if (_db) {
        const ref = _db.ref('students/' + _ctx.studentId + '/profile');
        await ref.update(Object.assign({}, profile, { updatedAt: Date.now() }));
        if (profile && profile.subjects !== undefined) {
          await _db.ref('students/' + _ctx.studentId + '/profile/subjects/' + _ctx.subject).set(true);
        } else {
          await _db.ref('students/' + _ctx.studentId + '/profile/subjects/' + _ctx.subject).set(true);
        }
      } else {
        _lsSet(_lsKey('profile', _ctx.studentId), Object.assign(_lsGet(_lsKey('profile', _ctx.studentId), {}), profile));
      }
    },

    /* ─── Progress (state · key/value · cross-page game state) ─── */
    async saveProgress(key, val) {
      await _waitReady();
      const path = ['students', _ctx.studentId, 'progress', _ctx.subject, _ctx.unit, key];
      if (_db) {
        await _db.ref(path.join('/')).set(val);
        await _db.ref(['students', _ctx.studentId, 'progress', _ctx.subject, _ctx.unit, '_lastActive'].join('/')).set(Date.now());
      } else {
        const k = _lsKey('progress', _ctx.studentId, _ctx.subject, _ctx.unit);
        const data = _lsGet(k, {});
        data[key] = val;
        data._lastActive = Date.now();
        _lsSet(k, data);
      }
    },

    async loadProgress(key) {
      await _waitReady();
      const path = ['students', _ctx.studentId, 'progress', _ctx.subject, _ctx.unit, key];
      if (_db) {
        const snap = await _db.ref(path.join('/')).once('value');
        return snap.val();
      } else {
        const data = _lsGet(_lsKey('progress', _ctx.studentId, _ctx.subject, _ctx.unit), {});
        return data[key];
      }
    },

    async loadAllProgress() {
      await _waitReady();
      if (_db) {
        const snap = await _db.ref(['students', _ctx.studentId, 'progress', _ctx.subject, _ctx.unit].join('/')).once('value');
        return snap.val() || {};
      } else {
        return _lsGet(_lsKey('progress', _ctx.studentId, _ctx.subject, _ctx.unit), {});
      }
    },

    /* ─── Research log (append-only · KPA events) ─── */
    async logResearch(type, payload) {
      await _waitReady();
      const event = {
        type, payload: payload || {},
        page: (document.body && document.body.dataset.page) || '?',
        at: Date.now()
      };
      if (_db) {
        const ref = _db.ref(['students', _ctx.studentId, 'research', _ctx.subject, _ctx.unit].join('/'));
        await ref.push(event);
      } else {
        const k = _lsKey('research', _ctx.studentId, _ctx.subject, _ctx.unit);
        const arr = _lsGet(k, []);
        arr.push(event);
        _lsSet(k, arr);
      }
    },

    /* ─── Scores (pre/post · graded · live) ─── */
    async saveScore(type, data) {
      await _waitReady();
      const payload = Object.assign({ at: Date.now(), studentId: _ctx.studentId }, data);
      if (_db) {
        await _db.ref(['scores', _ctx.subject, _ctx.unit, _ctx.studentId, type].join('/')).set(payload);
      } else {
        const k = _lsKey('scores', _ctx.subject, _ctx.unit, _ctx.studentId);
        const all = _lsGet(k, {});
        all[type] = payload;
        _lsSet(k, all);
      }
    },

    async loadScore(type) {
      await _waitReady();
      if (_db) {
        const snap = await _db.ref(['scores', _ctx.subject, _ctx.unit, _ctx.studentId, type].join('/')).once('value');
        return snap.val();
      } else {
        const all = _lsGet(_lsKey('scores', _ctx.subject, _ctx.unit, _ctx.studentId), {});
        return all[type];
      }
    },

    /* ─── Pace remote (teacher → students realtime) ─── */
    pacePath(subject, roomCode) {
      return ['rooms', subject || _ctx.subject, roomCode, 'pace'].join('/');
    },

    async setPace(roomCode, pace, opts) {
      // teacher only · ใช้ teacherPw + Firebase rules ตรวจสอบ
      await _waitReady();
      const data = Object.assign({}, pace, { at: Date.now() });
      if (_db) {
        await _db.ref(this.pacePath(opts && opts.subject, roomCode)).set(data);
      } else {
        // fallback ผ่าน BroadcastChannel + localStorage
        try { localStorage.setItem('paceLocal_' + roomCode, JSON.stringify(data)); } catch (e) {}
        try {
          const bc = new BroadcastChannel('pace_' + roomCode);
          bc.postMessage(data); bc.close();
        } catch (e) {}
      }
    },

    /** Subscribe (realtime push · onChange fires when pace updates) */
    watchPace(roomCode, onChange, opts) {
      _waitReady().then(() => {
        if (_db) {
          const ref = _db.ref(this.pacePath(opts && opts.subject, roomCode));
          ref.on('value', s => {
            const v = s.val();
            if (v) try { onChange(v); } catch (e) {}
          });
          // คืน unsubscribe
          this._paceUnsub = () => ref.off();
        } else {
          // fallback: BroadcastChannel + localStorage poll
          try {
            const bc = new BroadcastChannel('pace_' + roomCode);
            bc.onmessage = ev => onChange(ev.data);
            this._paceUnsub = () => bc.close();
          } catch (e) {}
          const initial = _lsGet('paceLocal_' + roomCode, null);
          if (initial) onChange(initial);
        }
      });
    },

    unwatchPace() { if (this._paceUnsub) this._paceUnsub(); },

    /* ─── Presence (live "who's on which page") ─── */
    async setPresence(roomCode, info, opts) {
      await _waitReady();
      if (!_db) return;
      const subject = (opts && opts.subject) || _ctx.subject;
      const ref = _db.ref(['rooms', subject, roomCode, 'presence', _ctx.studentId].join('/'));
      const data = Object.assign({
        online: true,
        unit: _ctx.unit,
        page: (document.body && document.body.dataset.page) || '?',
        lastSeen: Date.now()
      }, info);
      await ref.set(data);
      // auto-cleanup เมื่อปิด tab
      try { ref.onDisconnect().update({ online: false, lastSeen: Date.now() }); } catch (e) {}
    },

    /** ครู: subscribe presence list */
    watchPresence(roomCode, onChange, opts) {
      _waitReady().then(() => {
        if (!_db) return;
        const subject = (opts && opts.subject) || _ctx.subject;
        const ref = _db.ref(['rooms', subject, roomCode, 'presence'].join('/'));
        ref.on('value', s => {
          try { onChange(s.val() || {}); } catch (e) {}
        });
        this._presenceUnsub = () => ref.off();
      });
    },

    unwatchPresence() { if (this._presenceUnsub) this._presenceUnsub(); }
  };

  global.KPDB = KPDB;
})(window);
