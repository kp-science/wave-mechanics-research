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
  // ⚠️ ถ้า apiUrl ใน content/astronomy/config.js เปลี่ยน · ต้องอัพเดตที่นี่ด้วย
  const SUBJECT_API = {
    astronomy: 'https://script.google.com/macros/s/AKfycbyVahd2W0MOH20wxfeU60h6fbBj6kpjaOEM9UoHpQWBQHM2SPiqIXZ3q2FufEpFg5YQDw/exec'
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

      // ถ้าไม่มี room เลย → fallback: enabled แบบ "passive peek" room=default local
      // (ครู preview ผ่าน teacher-remote ที่ไม่ระบุ room ยังใช้ได้)
      if (!room) {
        return {
          enabled: true,
          mode: 'local',
          roomCode: 'default',
          apiUrl: null,
          pollMs: 2000,
          reason: 'fallback-default'
        };
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
        pollMs: mode === 'local' ? 2000 : (mode === 'firebase' ? 0 : 8000),
        reason: useFirebase ? 'firebase-realtime' : 'configured'
      };
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
