/* ═══════════════════════════════════════════════════════════════════
 * PaceResolver · Single source of truth สำหรับ teacher pace config
 * ─────────────────────────────────────────────────────────────────
 * แก้ปัญหา EP03–06 hard-code room='default' / mode='local'
 * ทุก EP เรียก PaceResolver.get() → { enabled, mode, roomCode, apiUrl, pollMs }
 *
 * URL flags:
 *   ?room=ABC123  → enable pace · persist localStorage.paceRoom
 *   ?local=1      → force local mode (BroadcastChannel · ไม่ต้อง backend)
 *   ?pace=off     → disable + ลบ localStorage
 *   ?solo=1       → disable เฉพาะ session นี้ (ไม่ลบ persistence)
 *
 * Default behavior (ไม่มี ?room): enabled=false, แต่ peek local 'default' room
 * เพื่อ backward compat กับ teacher-remote.html ที่เปิด ?local=1 โดยไม่ระบุ room
 * ═══════════════════════════════════════════════════════════════════ */
(function (global) {
  // Subject → Apps Script Web App URL (mirror ของ content/<subject>/config.js apiUrl)
  // ⚠️ ถ้า apiUrl ใน content/<subject>/config.js เปลี่ยน · ต้องอัพเดตที่นี่ด้วย
  const SUBJECT_API = {
    astronomy: 'https://script.google.com/macros/s/AKfycbyVahd2W0MOH20wxfeU60h6fbBj6kpjaOEM9UoHpQWBQHM2SPiqIXZ3q2FufEpFg5YQDw/exec',
    physics3:  'https://script.google.com/macros/s/AKfycbwoI8M3mJ3wKdNHUigoK4LFbZJH0f94WykTfBz97KPgeTo0Zi-N9DZdiEGzW3u6jofiwA/exec'
  };

  function readSubjectApiUrl(subjectHint) {
    try {
      if (global.PACE_API_URL) return global.PACE_API_URL;
      if (global.KP_CONFIG && global.KP_CONFIG.apiUrl) return global.KP_CONFIG.apiUrl;
      if (global.SUBJECT_CONFIG && global.SUBJECT_CONFIG.apiUrl) return global.SUBJECT_CONFIG.apiUrl;
      if (subjectHint && SUBJECT_API[subjectHint]) return SUBJECT_API[subjectHint];
      // auto-detect astronomy ถ้าอยู่ใน /lessons/astronomy/
      if (location.pathname.indexOf('/astronomy/') >= 0) return SUBJECT_API.astronomy;
    } catch (e) {}
    return null;
  }

  const PaceResolver = {
    get(opts) {
      opts = opts || {};
      const params = new URLSearchParams(location.search);

      // ?solo=1 → disable เฉพาะ tab นี้
      if (params.get('solo') === '1') {
        return { enabled: false, reason: 'solo' };
      }

      // ?pace=off → disable + clear persistence
      if (params.get('pace') === 'off') {
        try { localStorage.removeItem('paceRoom'); localStorage.removeItem('paceMode'); } catch (e) {}
        return { enabled: false, reason: 'off' };
      }

      // อ่าน room: URL → localStorage → default fallback
      let room = params.get('room') || (function () {
        try { return localStorage.getItem('paceRoom'); } catch (e) { return null; }
      })();

      // อ่าน mode: ?local=1 → local · มิฉะนั้น remote (default)
      let mode;
      if (params.get('local') === '1') mode = 'local';
      else if (params.get('mode') === 'remote') mode = 'remote';
      else {
        try { mode = localStorage.getItem('paceMode') || 'remote'; } catch (e) { mode = 'remote'; }
      }

      // persist URL params → localStorage
      if (params.get('room')) { try { localStorage.setItem('paceRoom', room); } catch (e) {} }
      if (params.get('local') === '1') { try { localStorage.setItem('paceMode', 'local'); } catch (e) {} }
      if (params.get('mode') === 'remote') { try { localStorage.setItem('paceMode', 'remote'); } catch (e) {} }

      // ⭐ Auto-pace fallback: ถ้าไม่มี room ใน URL/localStorage → ใช้ "auto_<subject>"
      // (KP-Classroom Pace Panel ใช้ key นี้ · นักเรียนรับ pace อัตโนมัติโดยไม่ต้องตั้งค่า)
      if (!room) {
        const subj = opts.subject || (location.pathname.indexOf('/astronomy/') >= 0 ? 'astronomy'
                                    : location.pathname.indexOf('/physics3/')  >= 0 ? 'physics3' : null);
        if (subj) {
          room = 'auto_' + subj;
          mode = 'remote';
          try { localStorage.setItem('paceRoom', room); localStorage.setItem('paceMode', 'remote'); } catch (e) {}
        } else {
          return { enabled:false, reason:'no-subject' };
        }
      }

      const apiUrl = opts.apiUrl || readSubjectApiUrl(opts.subject);

      // upgrade path: ถ้า Firebase configured + KPDB พร้อม → ใช้ realtime แทน poll
      const useFirebase = !!(global.FirebaseConfig && global.FirebaseConfig.isConfigured() && global.KPDB);
      if (useFirebase && mode !== 'local') mode = 'firebase';

      if (mode === 'remote' && !apiUrl) {
        // remote ต้องมี apiUrl · ถ้าไม่มี → degrade เป็น local
        mode = 'local';
      }

      return {
        enabled: true,
        mode: mode,
        roomCode: room,
        apiUrl: apiUrl,
        subject: opts.subject || null,
        // ⭐ poll 2s ทุก mode (เดิม remote=8s) · เร็วขึ้น 4 เท่า
        pollMs: mode === 'firebase' ? 0 : 2000,
        reason: useFirebase ? 'firebase-realtime' : 'configured'
      };
    },

    /**
     * Shared force-jump helper · เรียกจาก EP*Gate._check ตอนรับ pace ใหม่
     * Auto-jump ถูกถอดออกแล้ว · ระบบใช้เพดาน (unlockedUpTo) อย่างเดียว · maybeForceJump เป็น no-op
     * (เก็บ signature ไว้กัน caller ใน ep0X-boot.js พัง · คืน false เสมอ)
     */
    _autoJumpKey: null,
    _autoJumpTimer: null,
    maybeForceJump(pace, currentPageId, pages) {
      return false;
      // eslint-disable-next-line no-unreachable
      if (!pace || !pace.auto || !pace.page) return false;
      if (pace.page === currentPageId) return false;
      const target = (pages || []).find(p => p.id === pace.page);
      if (!target || !target.file) return false;
      const key = pace.page + '|' + (pace.at || '');
      if (this._autoJumpKey === key) return true;
      this._autoJumpKey = key;
      if (this._autoJumpTimer) { clearInterval(this._autoJumpTimer); this._autoJumpTimer = null; }
      let secs = 3;
      let el = document.getElementById('pace-resolver-banner');
      if (!el) {
        el = document.createElement('div');
        el.id = 'pace-resolver-banner';
        el.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:99999;padding:13px 18px;color:#fff;font-weight:700;font-size:14.5px;display:flex;align-items:center;justify-content:center;gap:14px;box-shadow:0 4px 16px rgba(0,0,0,.4);font-family:Sarabun,sans-serif;background:linear-gradient(135deg,#ff5c7a,#b980ff)';
        document.body.appendChild(el);
      }
      const self = this;
      const render = () => {
        el.innerHTML = `🚀 ครูพาไปหน้า <b>${String(target.id).toUpperCase()} · ${target.title || ''}</b>
          &nbsp; เด้งใน <b style="font-size:22px;color:#ffe066">${secs}</b> วิ
          <button onclick="PaceResolver.cancelForceJump()" style="margin-left:10px;padding:5px 12px;background:rgba(255,255,255,.2);color:#fff;border:1.5px solid rgba(255,255,255,.5);border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit">⏸ หยุด</button>
          <a href="${target.file}" style="padding:5px 12px;background:#fff;color:#b80050;border-radius:6px;font-weight:800;font-family:inherit;text-decoration:none">⏭ ไปเลย</a>`;
      };
      render();
      this._autoJumpTimer = setInterval(() => {
        secs--;
        if (secs <= 0) {
          clearInterval(self._autoJumpTimer); self._autoJumpTimer = null;
          if (self._autoJumpKey === key) location.href = target.file;
        } else render();
      }, 1000);
      return true;
    },
    cancelForceJump() {
      if (this._autoJumpTimer) { clearInterval(this._autoJumpTimer); this._autoJumpTimer = null; }
      this._autoJumpKey = '__cancelled__';
      const el = document.getElementById('pace-resolver-banner');
      if (el) el.innerHTML = '⏸ หยุด · กดปุ่ม "ไปต่อ" เองเมื่อพร้อม &nbsp;<button onclick="document.getElementById(\'pace-resolver-banner\').remove()" style="padding:4px 10px;background:rgba(255,255,255,.2);color:#fff;border:1.5px solid rgba(255,255,255,.5);border-radius:6px;font-weight:700;cursor:pointer">×</button>';
    },

    /** ensure pace-client.js loaded (dynamic) */
    ensureClient(srcPath) {
      if (global.PaceClient) return Promise.resolve();
      return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = srcPath || '../../shared/pace-client.js';
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
  };

  global.PaceResolver = PaceResolver;
})(window);
