/* ═══════════════════════════════════════════════════════════════════
 * COSMOS LOG · EP Pre/Post-test Sync (5 ข้อ ต่อ EP · ดาราศาสตร์ ว 30105)
 * ─────────────────────────────────────────────────────────────────
 * ใช้กับ p01-pretest.html และ posttest pages ของทุก EP (EP01-EP08)
 * - Reads student from localStorage (wave_student)
 * - POST → KP_CONFIG.apiUrl (ของ astronomy)
 * - Offline queue retry: localStorage `wave_ep_astronomy_queue`
 * - Saved per-student per-EP per-phase
 *
 * Usage:
 *   EPSync.submit({
 *     ep: 1,                  // 1..8
 *     test: 'pre' | 'post',
 *     answers: [              // 5 items
 *       {id:'M1', mcode:'M1', kcode:'K1', ans:0, correct:true},
 *       ...
 *     ]
 *   }).then(result => { ... })
 *
 * ═══════════════════════════════════════════════════════════════════ */
(function(global){
  'use strict';

  const Q_KEY = 'wave_ep_astronomy_queue';
  const STU_KEY = 'wave_student';

  function _getStudent(){
    try { return JSON.parse(localStorage.getItem(STU_KEY) || 'null'); }
    catch(_){ return null; }
  }

  function _getApiUrl(){
    if (global.KP_CONFIG && global.KP_CONFIG.apiUrl) return global.KP_CONFIG.apiUrl;
    // Fallback: hardcoded Astronomy-2569 backend (in case config.js not loaded)
    return 'https://script.google.com/macros/s/AKfycbyVahd2W0MOH20wxfeU60h6fbBj6kpjaOEM9UoHpQWBQHM2SPiqIXZ3q2FufEpFg5YQDw/exec';
  }

  async function _sendToBackend(payload){
    const url = _getApiUrl();
    if (!url) return { ok:false, reason:'no apiUrl' };
    try {
      const r = await fetch(url, {
        method:'POST',
        mode:'cors',
        headers:{'Content-Type':'text/plain;charset=utf-8'},
        body: JSON.stringify(payload)
      });
      if (!r.ok) throw new Error('HTTP '+r.status);
      const txt = await r.text();
      return { ok:true, response:txt };
    } catch(e){
      // Queue for retry
      try {
        const q = JSON.parse(localStorage.getItem(Q_KEY) || '[]');
        q.push(payload);
        localStorage.setItem(Q_KEY, JSON.stringify(q));
      } catch(_){}
      return { ok:false, reason:e.message };
    }
  }

  async function _flushQueue(){
    try {
      const q = JSON.parse(localStorage.getItem(Q_KEY) || '[]');
      if (!q.length) return { sent:0, remaining:0 };
      const remaining = [];
      let sent = 0;
      for (const item of q){
        const r = await _sendToBackend(item);
        if (r.ok) sent++; else remaining.push(item);
      }
      localStorage.setItem(Q_KEY, JSON.stringify(remaining));
      return { sent, remaining: remaining.length };
    } catch(_){ return { sent:0, remaining:0 }; }
  }

  /**
   * Submit pre/post test result
   * @param {Object} opts - {ep, test, answers}
   * @returns {Promise<{ok, response, reason}>}
   */
  async function submit(opts){
    const ep = Number(opts.ep || 0);
    const test = String(opts.test || '').toLowerCase();
    const answers = Array.isArray(opts.answers) ? opts.answers : [];

    if (ep < 1 || ep > 8) return { ok:false, reason:'invalid ep: '+ep };
    if (test !== 'pre' && test !== 'post') return { ok:false, reason:'invalid test: '+test };

    const stu = _getStudent();
    if (!stu || !stu.student_id) return { ok:false, reason:'not logged in' };

    const total = answers.length;
    const correct = answers.filter(a => a && a.correct).length;
    const percent = total ? Math.round(correct/total*100) : 0;

    // Compute gain if posttest (using stored pretest if any)
    let pre = null, absGain = null, normalizedGain = null;
    if (test === 'post') {
      try {
        const k = 'wave_ep_astronomy_local';
        const saved = JSON.parse(localStorage.getItem(k) || '{}');
        const epKey = 'EP'+ep;
        if (saved[epKey] && saved[epKey].pre){
          pre = Number(saved[epKey].pre.correct || 0);
          absGain = correct - pre;
          normalizedGain = pre < total ? Number(((correct - pre) / (total - pre)).toFixed(3)) : 0;
        }
      } catch(_){}
    }

    const payload = {
      action:'submitEP',
      test,
      ep,
      course:'astronomy',
      student_id: stu.student_id,
      name: stu.name || '',
      no: stu.no || '',
      'class': stu.class || stu['class'] || '',
      total, correct, percent,
      pre, post: (test === 'post' ? correct : null), absGain, normalizedGain,
      answers,
      timestamp: new Date().toISOString(),
      ua: navigator.userAgent.slice(0,80)
    };

    // Save locally first
    try {
      const k = 'wave_ep_astronomy_local';
      const saved = JSON.parse(localStorage.getItem(k) || '{}');
      const epKey = 'EP'+ep;
      saved[epKey] = saved[epKey] || {};
      saved[epKey][test] = payload;
      if (test === 'post' && pre !== null){
        saved[epKey].gain = { pre, post: correct, absolute: absGain, normalized: normalizedGain };
      }
      localStorage.setItem(k, JSON.stringify(saved));
    } catch(_){}

    return await _sendToBackend(payload);
  }

  // Auto-flush queue on load
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => { setTimeout(_flushQueue, 1500); });
  }

  global.EPSync = { submit, _flushQueue, _sendToBackend };
})(typeof window !== 'undefined' ? window : this);
