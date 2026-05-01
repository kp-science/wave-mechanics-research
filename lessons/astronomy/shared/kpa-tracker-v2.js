/* ===== COSMOS LOG · KPA + วPA + Competency + Research Tracker v2 =====
 * เพิ่มจาก v1 (EP06): สมรรถนะ 6 ด้าน (C1-C6) · research log · economy · mystery box · shop choice
 * EP-aware key: cosmosLog_<EP>_kpa  · separate streams for research/economy
 */
(function(global){
  const epId = () => (global.EP_CONFIG && global.EP_CONFIG.id) || 'ep07';
  const KEY     = () => 'cosmosLog_' + epId() + '_kpa';
  const KEY_RES = () => 'cosmosLog_' + epId() + '_research';
  const KEY_ECO = () => 'cosmosLog_' + epId() + '_economy';
  const _now = () => new Date().toISOString();
  const _page = () => (document.body && document.body.dataset.page) || '?';

  function load(k, fallback){
    try { return JSON.parse(localStorage.getItem(k)) || fallback; }
    catch(e){ return fallback; }
  }
  function save(k, d){ try { localStorage.setItem(k, JSON.stringify(d)); } catch(e){} }
  function _emptyKPA(){
    return {
      logs: [], domains: {}, comp: {},
      vpa: { d1: [], d2: [], d3: [] },
      timeline: [],
      problems: []   // PBL crisis attempts
    };
  }
  function _emptyResearch(){
    return {
      pretest: null, posttest: null,
      embedded: [],         // formative checkpoints
      calibration: [],      // {confidence, correct}
      reflections: [],      // text
      misconceptions: {},   // {M1: {pre, post, persistent}}
      mysteryBoxes: [],     // research checkpoints
      transferEvents: []    // crisis -> real-world
    };
  }
  function _emptyEcon(){
    return {
      coins: 0, energy: 10, energyMax: 10,
      ledger: [],   // every gain/loss
      shop: [],     // booster purchases
      boxes: []     // mystery box opens
    };
  }

  const KPA = {
    /* ===== KPA core ===== */
    log(domain, indicator, evidence){
      const d = load(KEY(), _emptyKPA());
      const entry = { ts:_now(), page:_page(), domain, indicator, evidence: evidence||{} };
      d.logs.push(entry);
      const dom = d.domains[domain] || { count:0, correct:0, total:0, lastSeen:null };
      dom.count++;
      if (evidence && evidence.correct === true) dom.correct++;
      if (evidence && typeof evidence.total === 'number') dom.total += evidence.total;
      dom.lastSeen = entry.ts;
      d.domains[domain] = dom;
      save(KEY(), d);
      if (global.Sync && global.Sync.broadcast) {
        try { global.Sync.broadcast({ type:'kpa', entry }); } catch(e){}
      }
      return entry;
    },
    vpa(side, ev){
      const d = load(KEY(), _emptyKPA());
      const key = 'd' + side;
      d.vpa[key] = d.vpa[key] || [];
      d.vpa[key].push({ ts:_now(), page:_page(), ...ev });
      save(KEY(), d);
    },
    /* ===== Competency C1-C6 ===== */
    competency(c, ev){
      const d = load(KEY(), _emptyKPA());
      d.comp[c] = d.comp[c] || { count:0, evidence:[] };
      d.comp[c].count++;
      d.comp[c].evidence.push({ ts:_now(), page:_page(), ...ev });
      save(KEY(), d);
    },
    /* ===== PBL problem cycle ===== */
    problem(crisis_id, attempt, outcome, extras){
      const d = load(KEY(), _emptyKPA());
      d.problems.push({
        ts:_now(), page:_page(), crisis_id, attempt, outcome, ...(extras||{})
      });
      save(KEY(), d);
    },
    /* ===== Research checkpoints ===== */
    research(tag, payload){
      const r = load(KEY_RES(), _emptyResearch());
      const arr = r[tag] || (r[tag] = []);
      if (Array.isArray(arr)) {
        arr.push({ ts:_now(), page:_page(), ...payload });
      } else {
        r[tag] = { ts:_now(), page:_page(), ...payload };
      }
      save(KEY_RES(), r);
    },
    setPrePost(which, payload){
      const r = load(KEY_RES(), _emptyResearch());
      r[which] = { ts:_now(), ...payload };
      save(KEY_RES(), r);
    },
    calibrate(confidence, correct, ctx){
      const r = load(KEY_RES(), _emptyResearch());
      r.calibration.push({ ts:_now(), page:_page(), confidence, correct, ctx:ctx||{} });
      save(KEY_RES(), r);
    },
    misconception(id, state, evidence){
      // state: 'pre' | 'persistent' | 'resolved'
      const r = load(KEY_RES(), _emptyResearch());
      r.misconceptions[id] = r.misconceptions[id] || {};
      r.misconceptions[id][state] = { ts:_now(), page:_page(), evidence:evidence||{} };
      save(KEY_RES(), r);
    },
    /* ===== Economy: coins/energy ===== */
    addCoin(n, reason){
      const e = load(KEY_ECO(), _emptyEcon());
      e.coins = Math.max(0, (e.coins||0) + n);
      e.ledger.push({ ts:_now(), page:_page(), kind:'coin', delta:n, reason, balance:e.coins });
      save(KEY_ECO(), e);
      _refreshHUD();
      return e.coins;
    },
    spendCoin(n, reason){
      const e = load(KEY_ECO(), _emptyEcon());
      if ((e.coins||0) < n) return false;
      e.coins -= n;
      e.ledger.push({ ts:_now(), page:_page(), kind:'coin', delta:-n, reason, balance:e.coins });
      save(KEY_ECO(), e);
      _refreshHUD();
      return true;
    },
    addEnergy(n, reason){
      const e = load(KEY_ECO(), _emptyEcon());
      e.energy = Math.min(e.energyMax||10, (e.energy||0) + n);
      e.ledger.push({ ts:_now(), page:_page(), kind:'energy', delta:n, reason, balance:e.energy });
      save(KEY_ECO(), e);
      _refreshHUD();
      return e.energy;
    },
    spendEnergy(n, reason){
      const e = load(KEY_ECO(), _emptyEcon());
      e.energy = Math.max(0, (e.energy||0) - n);
      e.ledger.push({ ts:_now(), page:_page(), kind:'energy', delta:-n, reason, balance:e.energy });
      save(KEY_ECO(), e);
      _refreshHUD();
      return e.energy;
    },
    setEnergyMax(n){
      const e = load(KEY_ECO(), _emptyEcon());
      e.energyMax = n;
      e.energy = Math.min(e.energy, n);
      save(KEY_ECO(), e);
      _refreshHUD();
    },
    economy(){ return load(KEY_ECO(), _emptyEcon()); },

    /* ===== Mystery Box / Shop logs ===== */
    boxOpen(payload){
      const e = load(KEY_ECO(), _emptyEcon());
      e.boxes.push({ ts:_now(), page:_page(), ...payload });
      save(KEY_ECO(), e);
      const r = load(KEY_RES(), _emptyResearch());
      r.mysteryBoxes.push({ ts:_now(), page:_page(), ...payload });
      save(KEY_RES(), r);
    },
    shopChoice(payload){
      const e = load(KEY_ECO(), _emptyEcon());
      e.shop.push({ ts:_now(), page:_page(), ...payload });
      save(KEY_ECO(), e);
    },

    /* ===== Summary / Export ===== */
    summary(){
      const d = load(KEY(), _emptyKPA());
      const r = load(KEY_RES(), _emptyResearch());
      const e = load(KEY_ECO(), _emptyEcon());
      return {
        domains: d.domains,
        comp: d.comp,
        totalLogs: d.logs.length,
        vpaCounts: { d1:d.vpa.d1.length, d2:d.vpa.d2.length, d3:d.vpa.d3.length },
        problems: d.problems.length,
        coins: e.coins, energy: e.energy,
        boxesOpened: (e.boxes||[]).length,
        misconceptions: Object.keys(r.misconceptions).length,
        calibrationN: r.calibration.length
      };
    },
    exportAll(){
      return JSON.stringify({
        kpa: load(KEY(), _emptyKPA()),
        research: load(KEY_RES(), _emptyResearch()),
        economy: load(KEY_ECO(), _emptyEcon())
      }, null, 2);
    },
    download(filename){
      const blob = new Blob([this.exportAll()], { type:'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = filename || (epId() + '-kpa-export.json');
      a.click(); URL.revokeObjectURL(url);
    },
    reset(){
      localStorage.removeItem(KEY());
      localStorage.removeItem(KEY_RES());
      localStorage.removeItem(KEY_ECO());
      _refreshHUD();
    },

    /* ===== Page dwell ===== */
    _dwellStart: null,
    startDwell(){ this._dwellStart = Date.now(); },
    stopDwell(){
      if (!this._dwellStart) return 0;
      const ms = Date.now() - this._dwellStart;
      const d = load(KEY(), _emptyKPA());
      d.timeline.push({ page:_page(), ts:_now(), dwellMs:ms });
      save(KEY(), d);
      this._dwellStart = null;
      return ms;
    }
  };

  function _refreshHUD(){
    if (global.HUD && typeof global.HUD.refresh === 'function') {
      try { global.HUD.refresh(); } catch(e){}
    }
  }

  document.addEventListener('DOMContentLoaded', () => KPA.startDwell());
  window.addEventListener('beforeunload', () => KPA.stopDwell());

  // Backward-compat: expose as KPA (replaces v1 if both loaded)
  global.KPA = KPA;
})(window);
