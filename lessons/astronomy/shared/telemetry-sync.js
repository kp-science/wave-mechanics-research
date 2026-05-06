/* ═══════════════════════════════════════════════════════════════════
 * COSMOS LOG · Telemetry Sync (Generic page/research POST · ดาราศาสตร์)
 * ─────────────────────────────────────────────────────────────────
 * Lightweight queue + retry POST to Apps Script for arbitrary data
 * that doesn't fit Activity/Boss/FT/EP handlers.
 *
 * Sheets it writes (auto-create via handleSubmit):
 *   • EP{n}_Pages       — Book.savePageData hook (EP01/02 G1/G1.5)
 *   • EP{n}_Research    — KPA.research(tag, payload)         (EP07/08 G3)
 *   • EP{n}_MC          — KPA.misconception(id, state, evi)  (EP07/08 G3)
 *   • EP{n}_Calibration — KPA.calibrate(conf, correct, ctx)  (EP07/08 G3)
 *   • EP{n}_Problems    — KPA.problem(crisis, attempt, out)  (EP07/08 G3)
 *
 * Auto-wraps Book.savePageData and KPA methods on script load (idempotent).
 * Uses fire-and-forget POST · best-effort · queues on failure.
 *
 * Usage:
 *   <script src="../shared/telemetry-sync.js"></script>
 *   (auto-installs · no manual call needed)
 * ═══════════════════════════════════════════════════════════════════ */
(function(global){
  'use strict';
  if (global.TelemetrySync && global.TelemetrySync._installed) return;

  const Q_KEY = 'wave_telemetry_astronomy_queue';
  const STU_KEY = 'wave_student';

  function _stu(){
    try { return JSON.parse(localStorage.getItem(STU_KEY) || 'null'); }
    catch(_){ return null; }
  }

  function _apiUrl(){
    if (global.KP_CONFIG && global.KP_CONFIG.apiUrl) return global.KP_CONFIG.apiUrl;
    return null;
  }

  function _ep(){
    if (global.EP_CONFIG && global.EP_CONFIG.epNum) return Number(global.EP_CONFIG.epNum);
    if (global.Book && global.Book.state && global.Book.state.ep){
      const m = String(global.Book.state.ep).match(/(\d+)/);
      if (m) return Number(m[1]);
    }
    // Fallback: derive from URL path /lessons/astronomy/ep0X/
    const m = location.pathname.match(/\/ep(\d+)/i);
    return m ? Number(m[1]) : 0;
  }

  function _enqueue(payload){
    try {
      const q = JSON.parse(localStorage.getItem(Q_KEY) || '[]');
      q.push(payload);
      // Cap at 200 to prevent unbounded growth
      if (q.length > 200) q.splice(0, q.length - 200);
      localStorage.setItem(Q_KEY, JSON.stringify(q));
    } catch(_){}
  }

  async function _post(payload){
    const url = _apiUrl();
    if (!url) { _enqueue(payload); return { ok:false, reason:'no apiUrl', queued:true }; }
    try {
      const r = await fetch(url, {
        method:'POST',
        mode:'cors',
        headers:{'Content-Type':'text/plain;charset=utf-8'},
        body: JSON.stringify(payload)
      });
      if (!r.ok) throw new Error('HTTP '+r.status);
      return { ok:true };
    } catch(e){
      _enqueue(payload);
      return { ok:false, reason:e.message, queued:true };
    }
  }

  async function flush(){
    try {
      const q = JSON.parse(localStorage.getItem(Q_KEY) || '[]');
      if (!q.length) return { sent:0, remaining:0 };
      const remaining = [];
      let sent = 0;
      for (const item of q){
        const url = _apiUrl();
        if (!url) { remaining.push(item); continue; }
        try {
          const r = await fetch(url, {
            method:'POST', mode:'cors',
            headers:{'Content-Type':'text/plain;charset=utf-8'},
            body: JSON.stringify(item)
          });
          if (!r.ok) throw new Error('HTTP '+r.status);
          sent++;
        } catch(_){ remaining.push(item); }
      }
      localStorage.setItem(Q_KEY, JSON.stringify(remaining));
      return { sent, remaining: remaining.length };
    } catch(_){ return { sent:0, remaining:0 }; }
  }

  /**
   * Send a generic telemetry record to a sheet (best-effort).
   * @param {string} sheet  - Target sheet name (e.g. 'EP1_Pages')
   * @param {Object} data   - Payload (auto-merged with student + ep + ts + page)
   */
  function send(sheet, data){
    if (!sheet) return;
    const stu = _stu();
    const payload = {
      action: 'submit',
      sheet,
      payload: {
        timestamp: new Date().toISOString(),
        ep: _ep(),
        student_id: stu && stu.student_id || '',
        name: stu && stu.name || '',
        no: stu && stu.no || '',
        class: stu && stu.class || '',
        page: (document.body && document.body.dataset.page) || location.pathname.split('/').pop().replace('.html',''),
        ...(data || {})
      }
    };
    // Fire-and-forget · don't block page
    _post(payload);
  }

  // ─── Auto-wrap Book.savePageData ──────────────────────────────────
  // book.js declares `const Book = {...}` at top-level (NOT exported to
  // window). Use lexical lookup via Function eval to grab it from script
  // scope · fall back to global.Book if exported.
  function _findBook(){
    if (global.Book) return global.Book;
    try {
      const ref = (new Function('try { return Book; } catch(_){ return null; }'))();
      if (ref) {
        global.Book = ref;  // promote to window for later access
        return ref;
      }
    } catch(_){}
    return null;
  }
  function _wrapBook(){
    const Book = _findBook();
    if (!Book || Book._telemetryWrapped) return false;
    const orig = Book.savePageData;
    if (typeof orig !== 'function') return false;
    Book.savePageData = function(pageId, data){
      const r = orig.call(this, pageId, data);
      try {
        const ep = _ep();
        if (ep) {
          send(`EP${ep}_Pages`, {
            page_id: pageId || (this.getCurrentPageId && this.getCurrentPageId()) || '',
            data_json: JSON.stringify(data || {})
          });
        }
      } catch(_){}
      return r;
    };
    Book._telemetryWrapped = true;
    return true;
  }

  // ─── Auto-wrap KPA tracker (v2) ────────────────────────────────────
  function _wrapKPA(){
    if (!global.KPA || global.KPA._telemetryWrapped) return false;

    const wrap = (name, sheetSuffix, mapper) => {
      const orig = global.KPA[name];
      if (typeof orig !== 'function') return;
      global.KPA[name] = function(){
        const r = orig.apply(this, arguments);
        try {
          const ep = _ep();
          if (ep) send(`EP${ep}_${sheetSuffix}`, mapper(arguments));
        } catch(_){}
        return r;
      };
    };

    wrap('research', 'Research', (a) => ({
      tag: String(a[0] || ''),
      payload_json: JSON.stringify(a[1] || {})
    }));
    wrap('setPrePost', 'PrePost', (a) => ({
      which: String(a[0] || ''),
      payload_json: JSON.stringify(a[1] || {})
    }));
    wrap('misconception', 'MC', (a) => ({
      mc_id: String(a[0] || ''),
      mc_state: String(a[1] || ''),
      evidence_json: JSON.stringify(a[2] || {})
    }));
    wrap('calibrate', 'Calibration', (a) => ({
      confidence: a[0],
      correct: a[1] ? 1 : 0,
      ctx_json: JSON.stringify(a[2] || {})
    }));
    wrap('problem', 'Problems', (a) => ({
      crisis_id: String(a[0] || ''),
      attempt: a[1],
      outcome: String(a[2] || ''),
      extras_json: JSON.stringify(a[3] || {})
    }));

    global.KPA._telemetryWrapped = true;
    return true;
  }

  function install(){
    _wrapBook();
    _wrapKPA();
  }

  // Try install immediately + on DOM ready + with short retry (modules may load after)
  install();
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', install);
  }
  // 3 retries at 100/300/1000ms in case Book/KPA load lazily
  setTimeout(install, 100);
  setTimeout(install, 300);
  setTimeout(install, 1000);

  // Auto-flush queue on page load (best effort)
  setTimeout(flush, 1500);

  global.TelemetrySync = {
    send,
    flush,
    _installed: true,
    _wrapBook, _wrapKPA
  };

})(window);
