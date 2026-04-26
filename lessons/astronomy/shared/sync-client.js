/* ===== COSMOS LOG · Sync Client ===== */
/* Multi-iPad sync layer · EP03+                                            */
/* Adapter pattern: Firebase (if configured) → BroadcastChannel (same-origin) */
/*                   → localStorage poll (single device fallback)             */

(function(global){
  const LS_ROOM = 'cosmosLog_room';
  const LS_ME   = 'cosmosLog_me';
  const DEFAULT_ROOM = { code:null, teamId:null };
  const DEFAULT_ME   = { uid:null, name:'', role:null };

  const Sync = {
    _adapter: null,
    _listeners: new Set(),
    _room: Object.assign({}, DEFAULT_ROOM),
    _me: Object.assign({}, DEFAULT_ME),
    _state: null,

    init() {
      try { this._room = JSON.parse(localStorage.getItem(LS_ROOM)) || DEFAULT_ROOM; } catch {}
      try { this._me   = JSON.parse(localStorage.getItem(LS_ME))   || DEFAULT_ME; } catch {}
      if (!this._me.uid) {
        this._me.uid = 'u_' + Math.random().toString(36).slice(2,10);
        this._persistMe();
      }
      // Adapter selection
      if (global.FirebaseConfig && global.FirebaseConfig.isConfigured && global.FirebaseConfig.isConfigured()) {
        this._adapter = this._firebaseAdapter();
      } else if (typeof BroadcastChannel !== 'undefined') {
        this._adapter = this._broadcastAdapter();
      } else {
        this._adapter = this._localAdapter();
      }
      this._adapter.init && this._adapter.init();
      return this;
    },

    /* ------------ Room ------------ */
    getRoomCode()   { return this._room.code; },
    getTeamId()     { return this._room.teamId; },
    getMe()         { return Object.assign({}, this._me); },

    setName(name)   { this._me.name = (name||'').slice(0,24); this._persistMe(); this._emit('me'); },
    setRole(role)   { this._me.role = role; this._persistMe(); this._updateRoster(); this._emit('me'); },

    createRoom(opt={}) {
      const code = opt.code || this._genCode();
      this._room = { code, teamId: opt.teamId || 1 };
      this._persistRoom();
      this._adapter.joinRoom(code);
      this._setState({
        code, ep:'ep03', phase:'lobby', page:'p00',
        photon:0, meter:60, roster:[], votes:{}, decisions:[],
        createdAt: Date.now(),
      }, true);
      this._updateRoster();
      this._emit('room');
      return code;
    },

    joinRoom(code, opt={}) {
      code = (code||'').toUpperCase().trim();
      if (!code) return false;
      this._room = { code, teamId: opt.teamId || this._room.teamId || 1 };
      this._persistRoom();
      this._adapter.joinRoom(code);
      this._updateRoster();
      this._emit('room');
      return true;
    },

    leaveRoom() {
      this._room = Object.assign({}, DEFAULT_ROOM);
      this._persistRoom();
      this._adapter.leaveRoom && this._adapter.leaveRoom();
      this._state = null;
      this._emit('room');
    },

    /* ------------ State (shared team doc) ------------ */
    getState() { return this._state ? JSON.parse(JSON.stringify(this._state)) : null; },

    setState(patch, replace=false) {
      if (!this._room.code) return;
      this._setState(patch, replace);
    },

    // Helpers
    addPhoton(n, reason) {
      if (!this._state) return;
      this._state.photon = Math.max(0, (this._state.photon||0) + n);
      this._state.lastPhoton = { n, reason, at:Date.now(), by:this._me.uid };
      this._adapter.push(this._state);
      this._emit('state');
    },

    spendPhoton(n, target) {
      if (!this._state) return false;
      if ((this._state.photon||0) < n) return false;
      this._state.photon -= n;
      this._state.lastSpend = { n, target, at:Date.now(), by:this._me.uid };
      // Apply VOIDHUNTER side effects
      const hunter = (global.EP_CONFIG && global.EP_CONFIG.voidhunter) || {};
      if (target === 'warp')   this.changeMeter(hunter.warpBonus   ?? 20, 'warp');
      if (target === 'beacon') this.changeMeter(hunter.beaconPenalty ?? -30, 'beacon');
      if (target === 'cloak')  this._state.cloakActive = true;
      this._adapter.push(this._state);
      this._emit('state');
      return true;
    },

    changeMeter(delta, reason) {
      if (!this._state) return;
      const cur = this._state.meter ?? 60;
      this._state.meter = Math.max(0, Math.min(100, cur + delta));
      this._state.lastMeter = { delta, reason, at:Date.now() };
      this._adapter.push(this._state);
      this._emit('state');
    },

    setPage(pageId) {
      if (!this._state) return;
      this._state.page = pageId;
      // auto-tick meter
      const hunter = (global.EP_CONFIG && global.EP_CONFIG.voidhunter) || {};
      const safe = hunter.safeHavens || [];
      if (!safe.includes(pageId) && !this._state.cloakActive) {
        const tick = hunter.tickPerPage ?? -5;
        this._state.meter = Math.max(0, Math.min(100, (this._state.meter||60) + tick));
      }
      this._state.cloakActive = false;
      this._adapter.push(this._state);
      this._emit('state');
    },

    castVote(topic, choice) {
      if (!this._state) return;
      this._state.votes = this._state.votes || {};
      this._state.votes[topic] = this._state.votes[topic] || {};
      this._state.votes[topic][this._me.uid] = { choice, role:this._me.role, at:Date.now() };
      this._adapter.push(this._state);
      this._emit('state');
    },

    tallyVote(topic) {
      const v = this._state && this._state.votes && this._state.votes[topic];
      if (!v) return { total:0, tally:{}, winner:null };
      const tally = {};
      Object.values(v).forEach(entry => { tally[entry.choice] = (tally[entry.choice]||0)+1; });
      const winner = Object.entries(tally).sort((a,b)=>b[1]-a[1])[0];
      return { total: Object.keys(v).length, tally, winner: winner? winner[0]:null };
    },

    recordDecision(decision) {
      if (!this._state) return;
      this._state.decisions = this._state.decisions || [];
      this._state.decisions.push(Object.assign({ at:Date.now(), by:this._me.uid }, decision));
      this._adapter.push(this._state);
      this._emit('state');
    },

    /* ------------ Listeners ------------ */
    on(fn)  { this._listeners.add(fn); return () => this._listeners.delete(fn); },
    _emit(ev){ this._listeners.forEach(fn => { try { fn(ev, this._state); } catch(e){} }); },

    /* ------------ Internal ------------ */
    _setState(patch, replace) {
      if (replace) this._state = Object.assign({}, patch);
      else this._state = Object.assign({}, this._state || {}, patch);
      this._adapter.push(this._state);
      this._emit('state');
    },

    _updateRoster() {
      if (!this._state) return;
      const roster = (this._state.roster || []).filter(r => r.uid !== this._me.uid);
      roster.push({ uid:this._me.uid, name:this._me.name, role:this._me.role, at:Date.now() });
      this._state.roster = roster;
      this._adapter.push(this._state);
    },

    _persistRoom() { try { localStorage.setItem(LS_ROOM, JSON.stringify(this._room)); } catch {} },
    _persistMe()   { try { localStorage.setItem(LS_ME,   JSON.stringify(this._me));   } catch {} },

    _genCode() {
      const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
      let code = '';
      for (let i=0;i<4;i++) code += chars[Math.floor(Math.random()*chars.length)];
      return code;
    },

    /* ------------ Adapters ------------ */
    _localAdapter() {
      const KEY = 'cosmosLog_state_shared';
      const load = () => { try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; } };
      return {
        init: () => {
          this._state = load();
          setInterval(() => {
            const s = load();
            if (s && JSON.stringify(s) !== JSON.stringify(this._state)) {
              this._state = s;
              this._emit('state');
            }
          }, 1200);
        },
        joinRoom: () => { this._state = load() || this._state; },
        push: (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} },
      };
    },

    _broadcastAdapter() {
      const self = this;
      let ch = null;
      const KEY_PREFIX = 'cosmosLog_room_';
      const keyFor = () => KEY_PREFIX + (self._room.code || 'default');
      return {
        init: () => { /* wait for joinRoom */ },
        joinRoom: (code) => {
          try { ch && ch.close(); } catch {}
          ch = new BroadcastChannel('cosmosLog-' + code);
          ch.onmessage = (ev) => {
            const s = ev.data && ev.data.state;
            if (s && JSON.stringify(s) !== JSON.stringify(self._state)) {
              self._state = s;
              self._emit('state');
            }
          };
          try { self._state = JSON.parse(localStorage.getItem(keyFor())) || self._state; } catch {}
          // request current state from peers
          try { ch.postMessage({ type:'hello', uid: self._me.uid }); } catch {}
        },
        leaveRoom: () => { try { ch && ch.close(); } catch {} ch = null; },
        push: (s) => {
          try { localStorage.setItem(keyFor(), JSON.stringify(s)); } catch {}
          try { ch && ch.postMessage({ type:'state', state:s }); } catch {}
        },
      };
    },

    _firebaseAdapter() {
      const fb = global.FirebaseConfig;
      const self = this;
      let ref = null;
      let unsub = null;
      return {
        init: () => {},
        joinRoom: (code) => {
          try { unsub && unsub(); } catch {}
          ref = fb.roomRef(code);
          unsub = fb.onValue(ref, (snap) => {
            const s = snap && snap.val ? snap.val() : null;
            if (s && JSON.stringify(s) !== JSON.stringify(self._state)) {
              self._state = s;
              self._emit('state');
            }
          });
        },
        leaveRoom: () => { try { unsub && unsub(); } catch {} ref = null; unsub = null; },
        push: (s) => { try { ref && fb.set(ref, s); } catch {} },
      };
    },
  };

  global.Sync = Sync;
})(window);
