/* ===== COSMOS LOG · KPA + วPA Tracker =====
 * บันทึก evidence ของการเรียนรู้ตาม K (Knowledge) · P (Process/Skill) · A (Attitude)
 * และ วPA ด้านที่ 1 (จัดการเรียนรู้) · 2 (ผลสัมฤทธิ์) · 3 (พัฒนาตนเอง)
 * เก็บใน localStorage + sync optional · export JSON สำหรับครู
 */
(function(global){
  const KEY = () => 'cosmosLog_' + ((global.EP_CONFIG && global.EP_CONFIG.id) || 'ep06') + '_kpa';
  const _now = () => new Date().toISOString();

  function load(){
    try { return JSON.parse(localStorage.getItem(KEY())) || _empty(); }
    catch(e){ return _empty(); }
  }
  function _empty(){
    return {
      logs: [],          // {ts, page, domain, indicator, evidence, value}
      domains: {},       // K1: {count, correct, total, lastSeen} ...
      vpa: { d1: [], d2: [], d3: [] },  // วPA ด้าน 1-3 evidence list
      timeline: []       // {page, ts, dwellMs}
    };
  }
  function save(d){ localStorage.setItem(KEY(), JSON.stringify(d)); }

  const KPA = {
    /**
     * Log evidence to a KPA indicator.
     * @param {string} domain  K1..K6 · P1..P3 · A1..A3
     * @param {string} indicator  short label e.g. 'predict' / 'group-consensus'
     * @param {object} evidence  {page, action, correct?, value?, text?}
     */
    log(domain, indicator, evidence){
      const d = load();
      const entry = {
        ts: _now(),
        page: (document.body && document.body.dataset.page) || '?',
        domain, indicator,
        evidence: evidence || {},
      };
      d.logs.push(entry);
      const dom = d.domains[domain] || { count:0, correct:0, total:0, lastSeen:null };
      dom.count++;
      if (evidence && evidence.correct === true) dom.correct++;
      if (evidence && typeof evidence.total === 'number') dom.total += evidence.total;
      dom.lastSeen = entry.ts;
      d.domains[domain] = dom;
      save(d);
      // sync if available
      if (global.Sync && global.Sync.broadcast) {
        try { global.Sync.broadcast({ type:'kpa', entry }); } catch(e){}
      }
      return entry;
    },

    /**
     * Log วPA evidence (ด้านที่ 1, 2, 3)
     * @param {1|2|3} side
     * @param {object} ev  {page, kind, summary}
     */
    vpa(side, ev){
      const d = load();
      const key = 'd' + side;
      d.vpa[key] = d.vpa[key] || [];
      d.vpa[key].push({ ts:_now(), ...ev });
      save(d);
    },

    summary(){
      const d = load();
      return {
        domains: d.domains,
        totalLogs: d.logs.length,
        vpaCounts: { d1:d.vpa.d1.length, d2:d.vpa.d2.length, d3:d.vpa.d3.length }
      };
    },

    export(){
      const d = load();
      return JSON.stringify(d, null, 2);
    },

    download(filename){
      const blob = new Blob([this.export()], { type:'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = filename || 'kpa-export.json';
      a.click(); URL.revokeObjectURL(url);
    },

    reset(){
      localStorage.removeItem(KEY());
    },

    /* === Page dwell tracking (กดเร็วผ่าน vs หยุดคิด) === */
    _dwellStart: null,
    startDwell(){
      this._dwellStart = Date.now();
    },
    stopDwell(){
      if (!this._dwellStart) return 0;
      const ms = Date.now() - this._dwellStart;
      const d = load();
      d.timeline.push({
        page: (document.body && document.body.dataset.page) || '?',
        ts: _now(), dwellMs: ms
      });
      save(d);
      this._dwellStart = null;
      return ms;
    }
  };

  // auto-start dwell on page load · stop on unload
  document.addEventListener('DOMContentLoaded', () => KPA.startDwell());
  window.addEventListener('beforeunload', () => KPA.stopDwell());

  global.KPA = KPA;
})(window);
