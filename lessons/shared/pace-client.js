/* ═══════════════════════════════════════════════════════════════════
 * PaceClient · Teacher Pace Remote — shared client
 * ─────────────────────────────────────────────────────────────────
 * Reusable polling module for any subject/EP/plan.
 * - Student side:  PaceClient.watch({apiUrl, roomCode, onChange, intervalMs})
 * - Teacher side:  PaceClient.setPage({apiUrl, roomCode, page, ep, subject, teacherPw})
 * No UI — callers render banners/controls themselves.
 * ═══════════════════════════════════════════════════════════════════ */
(function () {
  const DEFAULT_INTERVAL_MS = 8000;
  const LOCAL_KEY_PREFIX = 'paceLocal_';
  const LOCAL_CHANNEL_PREFIX = 'pace_';

  let timer = null;
  let lastSeenKey = null;
  let localChannel = null;
  let localChannelListener = null;

  function paceKey(p) {
    if (!p || !p.page) return null;
    return p.page + '|' + (p.unlockedUpTo || p.page);
  }

  /* ── Remote (Apps Script) ── */
  async function fetchPace(apiUrl, roomCode) {
    const qs = new URLSearchParams({
      action: 'paceGet',
      code: roomCode || 'default',
      _: Date.now()
    });
    try {
      const r = await fetch(apiUrl + '?' + qs.toString());
      const j = await r.json();
      return (j && j.status === 'ok') ? (j.pace || null) : null;
    } catch (e) {
      return null;
    }
  }

  /* ── Local (BroadcastChannel + localStorage) ── */
  function localPeek(roomCode) {
    try {
      const raw = localStorage.getItem(LOCAL_KEY_PREFIX + (roomCode || 'default'));
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function localWrite(roomCode, pace) {
    try { localStorage.setItem(LOCAL_KEY_PREFIX + (roomCode || 'default'), JSON.stringify(pace)); } catch (e) {}
    try {
      const bc = new BroadcastChannel(LOCAL_CHANNEL_PREFIX + (roomCode || 'default'));
      bc.postMessage(pace);
      bc.close();
    } catch (e) {}
  }

  async function tick(opts) {
    if (document.hidden) return;
    const pace = (opts.mode === 'local')
      ? localPeek(opts.roomCode)
      : await fetchPace(opts.apiUrl, opts.roomCode);
    const key = paceKey(pace);
    if (!key) return;
    if (key === lastSeenKey) return;
    lastSeenKey = key;
    try { opts.onChange(pace); } catch (e) { console.warn('PaceClient onChange error', e); }
  }

  const PaceClient = {
    /**
     * Start watching. Calls opts.onChange(pace) when page changes.
     * pace = { page, ep, subject, at }
     * opts.mode: 'remote' (default) | 'local'
     *   local = BroadcastChannel + localStorage (สำหรับทดสอบ 2 tab ในเครื่องเดียว · ไม่ต้องมี backend)
     */
    watch(opts) {
      if (!opts || typeof opts.onChange !== 'function') return;
      if (opts.mode !== 'local' && !opts.apiUrl) return;
      this.stop();
      const interval = opts.intervalMs || DEFAULT_INTERVAL_MS;

      if (opts.mode === 'local') {
        // instant notify via BroadcastChannel
        try {
          localChannel = new BroadcastChannel(LOCAL_CHANNEL_PREFIX + (opts.roomCode || 'default'));
          localChannelListener = (ev) => {
            const pace = ev.data;
            const key = paceKey(pace);
            if (!key || key === lastSeenKey) return;
            lastSeenKey = key;
            try { opts.onChange(pace); } catch (e) {}
          };
          localChannel.addEventListener('message', localChannelListener);
        } catch (e) { /* fallback to polling only */ }
      }

      tick(opts);
      timer = setInterval(() => tick(opts), interval);
    },

    stop() {
      if (timer) { clearInterval(timer); timer = null; }
      if (localChannel) {
        try { localChannel.removeEventListener('message', localChannelListener); localChannel.close(); } catch (e) {}
        localChannel = null; localChannelListener = null;
      }
      lastSeenKey = null;
    },

    /**
     * Teacher push. Remote = fire-and-forget POST (no-cors). Local = write localStorage + broadcast.
     */
    setPage(opts) {
      if (!opts || !opts.page) return Promise.resolve();
      const pace = {
        page: opts.page,
        unlockedUpTo: opts.unlockedUpTo || opts.page,
        ep: opts.ep || '',
        subject: opts.subject || '',
        at: Date.now()
      };
      if (opts.mode === 'local') {
        localWrite(opts.roomCode || 'default', pace);
        return Promise.resolve();
      }
      if (!opts.apiUrl) return Promise.resolve();
      return fetch(opts.apiUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {'Content-Type': 'text/plain;charset=utf-8'},
        body: JSON.stringify({
          action: 'paceSet',
          code: opts.roomCode || 'default',
          page: opts.page,
          unlockedUpTo: opts.unlockedUpTo || opts.page,
          ep: opts.ep || '',
          subject: opts.subject || '',
          teacher_pw: opts.teacherPw || ''
        })
      });
    },

    /** One-shot read (remote or local). */
    peek(apiUrl, roomCode, mode) {
      if (mode === 'local') return Promise.resolve(localPeek(roomCode));
      return fetchPace(apiUrl, roomCode);
    }
  };

  window.PaceClient = PaceClient;
})();
