/* ═══════════════════════════════════════════════════════════════════
 * COSMOS LOG · Activity Sync (E1 score capture · ดาราศาสตร์ ว 30105)
 * ─────────────────────────────────────────────────────────────────
 * เก็บคะแนนกิจกรรมระหว่างเรียน (E1) ของแต่ละหน้า → Activity_Raw sheet
 * และคะแนน Boss (engagement metric · ไม่นับ E1) → Boss_Engagement sheet
 *
 * Categories:
 *   MISSION  · 7 pts max/EP  · opening MCQ
 *   LAB      · 13 pts max/EP · drag/match/quiz
 *   RECALL   · 10 pts max/EP · bridge MCQ before boss
 *   BOSS     · ไม่นับ E1 · เก็บแยกใน Boss_Engagement
 *
 * Usage (E1 page):
 *   ActivitySync.submit({
 *     ep: 1, pageId: 'p04-debris', category: 'LAB',
 *     rawScore: 4, maxScore: 5,
 *     duration: 120, attempts: 2
 *   });
 *
 * Usage (Boss page):
 *   ActivitySync.submitBoss({
 *     ep: 1, accuracy: 0.78, timeSpent: 240,
 *     retries: 1, endingPath: 'A'
 *   });
 *
 * Idempotency:
 *   ส่งซ้ำของหน้าเดิม → Apps Script เก็บ row ใหม่ทุกครั้ง (Activity_Summary
 *   จะใช้ "best score" ต่อ student×page อัตโนมัติ)
 * ═══════════════════════════════════════════════════════════════════ */
(function(global){
  'use strict';

  const Q_KEY   = 'wave_activity_astronomy_queue';
  const STU_KEY = 'wave_student';
  const LOCAL_K = 'wave_activity_astronomy_local';

  const VALID_CATS = ['MISSION', 'LAB', 'RECALL'];

  function _getStudent(){
    try { return JSON.parse(localStorage.getItem(STU_KEY) || 'null'); }
    catch(_){ return null; }
  }

  function _getApiUrl(){
    if (global.KP_CONFIG && global.KP_CONFIG.apiUrl) return global.KP_CONFIG.apiUrl;
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
      try {
        const q = JSON.parse(localStorage.getItem(Q_KEY) || '[]');
        q.push(payload);
        localStorage.setItem(Q_KEY, JSON.stringify(q));
      } catch(_){}
      return { ok:false, reason:e.message, queued:true };
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

  function _saveLocal(payload){
    try {
      const saved = JSON.parse(localStorage.getItem(LOCAL_K) || '{}');
      const key = `EP${payload.ep}_${payload.pageId || payload.action}`;
      const prev = saved[key];
      // Keep best score per page (avoid overwriting good attempt with bad retry)
      if (!prev || (payload.rawScore || 0) >= (prev.rawScore || 0)) {
        saved[key] = payload;
      }
      localStorage.setItem(LOCAL_K, JSON.stringify(saved));
    } catch(_){}
  }

  /**
   * Submit E1 activity result (MISSION / LAB / RECALL)
   * @param {Object} opts - { ep, pageId, category, rawScore, maxScore, duration?, attempts? }
   * @returns {Promise<{ok, response, reason, queued}>}
   */
  async function submit(opts){
    const ep       = Number(opts.ep || 0);
    const pageId   = String(opts.pageId || '');
    const category = String(opts.category || '').toUpperCase();
    const rawScore = Number(opts.rawScore || 0);
    const maxScore = Number(opts.maxScore || 1);
    const duration = Number(opts.duration || 0);
    const attempts = Number(opts.attempts || 1);

    if (ep < 1 || ep > 8) return { ok:false, reason:'invalid ep: '+ep };
    if (!pageId) return { ok:false, reason:'pageId required' };
    if (!VALID_CATS.includes(category)) return { ok:false, reason:'invalid category: '+category };

    const stu = _getStudent();
    if (!stu || !stu.student_id) {
      // Save local even without login (in case student logs in later — manual recovery)
      const draft = { action:'submitActivity', ep, pageId, category, rawScore, maxScore, duration, attempts, _draft:true };
      _saveLocal(draft);
      return { ok:false, reason:'not logged in', draft:true };
    }

    const percent = maxScore > 0 ? Math.round((rawScore / maxScore) * 100) : 0;

    const payload = {
      action: 'submitActivity',
      course: 'astronomy',
      ep, pageId, category,
      rawScore, maxScore, percent,
      duration, attempts,
      student_id: stu.student_id,
      name: stu.name || '',
      no: stu.no || '',
      'class': stu.class || stu['class'] || '',
      timestamp: new Date().toISOString(),
      ua: navigator.userAgent.slice(0, 80)
    };

    _saveLocal(payload);
    return await _sendToBackend(payload);
  }

  /**
   * Submit Boss engagement metrics (NOT counted in E1 · separate sheet)
   * @param {Object} opts - { ep, accuracy, timeSpent, retries?, endingPath? }
   * @returns {Promise<{ok, response, reason}>}
   */
  async function submitBoss(opts){
    const ep         = Number(opts.ep || 0);
    const accuracy   = Number(opts.accuracy || 0);   // 0..1
    const timeSpent  = Number(opts.timeSpent || 0);  // seconds
    const retries    = Number(opts.retries || 0);
    const endingPath = String(opts.endingPath || '');

    if (ep < 1 || ep > 8) return { ok:false, reason:'invalid ep: '+ep };

    const stu = _getStudent();
    if (!stu || !stu.student_id) return { ok:false, reason:'not logged in' };

    const payload = {
      action: 'submitBoss',
      course: 'astronomy',
      ep, accuracy, timeSpent, retries, endingPath,
      student_id: stu.student_id,
      name: stu.name || '',
      no: stu.no || '',
      'class': stu.class || stu['class'] || '',
      timestamp: new Date().toISOString(),
      ua: navigator.userAgent.slice(0, 80)
    };

    try {
      const saved = JSON.parse(localStorage.getItem(LOCAL_K) || '{}');
      saved[`EP${ep}_BOSS`] = payload;
      localStorage.setItem(LOCAL_K, JSON.stringify(saved));
    } catch(_){}

    return await _sendToBackend(payload);
  }

  /**
   * Read aggregated E1 totals from localStorage (for offline UI)
   */
  function getLocalSummary(){
    try {
      const saved = JSON.parse(localStorage.getItem(LOCAL_K) || '{}');
      const byEP = {};
      for (let i = 1; i <= 8; i++) byEP[i] = { mission:0, lab:0, recall:0, total:0 };
      for (const k in saved) {
        const r = saved[k];
        if (r._draft) continue;
        if (!r.ep || !r.category) continue;
        const ep = byEP[r.ep];
        if (!ep) continue;
        const pct = r.percent || 0;
        if (r.category === 'MISSION') ep.mission = Math.max(ep.mission, pct * 0.07);
        if (r.category === 'LAB')     ep.lab     = Math.max(ep.lab,     pct * 0.13);
        if (r.category === 'RECALL')  ep.recall  = Math.max(ep.recall,  pct * 0.10);
        ep.total = ep.mission + ep.lab + ep.recall;
      }
      let e1Total = 0;
      for (let i = 1; i <= 8; i++) e1Total += byEP[i].total;
      return { byEP, e1Total: Math.round(e1Total), e1Max: 240 };
    } catch(_) { return { byEP:{}, e1Total:0, e1Max:240 }; }
  }

  // Auto-flush queue on load
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => { setTimeout(_flushQueue, 1500); });
  }

  global.ActivitySync = { submit, submitBoss, getLocalSummary, _flushQueue, _sendToBackend };
})(typeof window !== 'undefined' ? window : this);
