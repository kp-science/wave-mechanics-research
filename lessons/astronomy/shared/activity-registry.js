/* ═══════════════════════════════════════════════════════════════════
 * COSMOS LOG · Activity Registry (E1 page → category mapping)
 * ─────────────────────────────────────────────────────────────────
 * Single source of truth ของหน้าใดบ้างที่นับเป็นคะแนน E1
 * และเป็น category ไหน (MISSION / LAB / RECALL / BOSS)
 *
 * Used by:
 *   - book.js completePage hook (G1/G1.5)
 *   - sync-client.js (G2)
 *   - kpa-tracker.js (G3)
 *
 * Schema:
 *   epId → { pageId → category }
 * ═══════════════════════════════════════════════════════════════════ */
(function(global){
  'use strict';

  const REGISTRY = {
    1: {  // EP01 · The Collision (G1 · Book.js)
      'p02-team':       'MISSION',
      'p04-debris':     'LAB',
      'p09-balloon':    'LAB',
      'p10-hubble':     'LAB',
      'p11-timeline':   'LAB',
      'p17-exercise':   'LAB',
      'p16-review':     'RECALL',
      'p17-boss':       'BOSS',
    },
    2: {  // EP02 · กาแล็กซี (G1.5 · Book.js + Game Layer)
      'p03-signal':     'MISSION',
      'p04-classify':   'LAB',
      'p05-council':    'LAB',
      'p06-milkyway':   'LAB',
      'p09-tuning':     'LAB',
      'p10-hubble':     'LAB',
      'p11-rotation':   'LAB',
      'p16-recap':      'RECALL',
      'p14-boss':       'BOSS',
      'p17b-finalboss': 'BOSS',
    },
    3: {  // EP03 · พาแรลแลกซ์ (G2 · Firebase)
      'p02-sos':        'MISSION',
      'p02b-genesis':   'MISSION',
      'p04-parallax':   'LAB',
      'p05-parallax10': 'LAB',
      'p09-absolute':   'LAB',
      'p09b-decode':    'LAB',
      'p15-payoff':     'RECALL',
    },
    4: {  // EP04 · วิวัฒนาการดาว (G2 · Firebase)
      'p03-plan':              'MISSION',
      'p04-spectrum-slider':   'LAB',
      'p05-drag-match':        'LAB',
      'p07-group-code':        'LAB',
      'p08-group-temp':        'LAB',
      'p10-bridge-mass':       'MISSION',
      'p12-protostar':         'LAB',
      'p13-mass-tracks':       'LAB',
      'p14-evo-order':         'LAB',
      'p15-mass-endpoint':     'LAB',
      'p16-evo-game':          'LAB',
      'p19b-recall':           'RECALL',  // ⭐ NEW page (insert before p20)
      'p20-path-select':       'MISSION',
      'p24-boss':              'BOSS',
    },
    5: {  // EP05 · ดวงอาทิตย์ (G2 v9)
      'p02-intro-quest':    'MISSION',
      'p03-origin-zones':   'LAB',
      'p04-dive-plan':      'LAB',
      'p05c-core-gate':       'RECALL',
      'p06c-radiative-gate':  'RECALL',
      'p07c-convective-gate': 'RECALL',
      'p08c-sunspot-gate':    'RECALL',
      'p09c-flare-gate':      'RECALL',
      'p10c-corona-gate':     'RECALL',
      'p13-activity-slider':'LAB',
      'p14-phenomena-tabs': 'LAB',
      'p15-event-order':    'LAB',
      'p16-flare-vs-cme':   'LAB',
      'p17-earth-impact':   'LAB',
      'p19-habitable-zone': 'LAB',
      'p21-deflect-path':   'MISSION',
      'p25-boss':           'BOSS',
    },
    6: {  // EP06 · ระบบสุริยะ (G2)
      'p04-mission-brief':    'MISSION',
      'p05c-nebula-gate':     'RECALL',
      'p06b-disk-gate':       'RECALL',
      'p07c-inner-gate':      'RECALL',
      'p08c-belt-gate':       'RECALL',
      'p09c-giants-quiz':     'RECALL',
      'p10c-kuiper-quiz':     'RECALL',
      'p13-kepler-hunt':      'LAB',
      'p14-vault-entry':      'MISSION',
      'p17-habitable-engage': 'LAB',
      'p18-habitable-explore':'LAB',
      'p19-habitable-quiz':   'RECALL',
      'p20-exoplanet':        'LAB',
      'p21-migration-vote':   'LAB',
      'p23-boss-prep':        'MISSION',
      'p24-boss':             'BOSS',
    },
    7: {  // EP07 · คลื่น EM (G3 · KPA)
      'p03-mission':         'MISSION',
      'p04-em-spectrum':     'LAB',
      'p05-atmosphere':      'LAB',
      'p10-xray':            'LAB',
      'p11-telescope-match': 'LAB',
      'p13-probe-hall':      'LAB',
      'p15-orbit-3tier':     'LAB',
      'p16-rocket-forge':    'LAB',
      'p18-mars-brief':      'MISSION',
      'p19-mars-design-a':   'LAB',
      'p20-mars-design-b':   'LAB',
      'p21-mars-launch':     'LAB',
      'p22-materials':       'LAB',
      'p23-food':            'LAB',
      'p24-medicine':        'LAB',
      'p25-spinoff-quiz':    'RECALL',
      'p26-boss':            'BOSS',
    },
    8: {  // EP08 · Genesis Again (G3 · KPA)
      'p04-mission-brief': 'MISSION',
      'p06-nucleosynthesis':'LAB',
      'p08-first-stars':   'LAB',
      'p09-galaxies':      'LAB',
      'p12-hubbles-law':   'LAB',
      'p14-prime-plan':    'MISSION',
      'p15-disable-1':     'LAB',
      'p16-disable-2':     'LAB',
      'p17-disable-3':     'LAB',
      'p18-disable-4':     'LAB',
      'p22-boss-prep':     'MISSION',
      'p22b-recall':       'RECALL',  // ⭐ NEW page
      'p23-boss':          'BOSS',
    },
  };

  /**
   * Lookup category for a (ep, pageId)
   * @param {number} ep - 1..8
   * @param {string} pageId
   * @returns {string|null} 'MISSION'|'LAB'|'RECALL'|'BOSS' or null
   */
  function categoryOf(ep, pageId){
    if (!REGISTRY[ep]) return null;
    return REGISTRY[ep][pageId] || null;
  }

  /**
   * Detect EP from current URL (e.g. /lessons/astronomy/ep03/p04-foo.html → 3)
   */
  function detectEp(){
    if (typeof window === 'undefined') return 0;
    const path = window.location.pathname;
    const m = path.match(/\/ep0?(\d)\//);
    return m ? Number(m[1]) : 0;
  }

  /**
   * Detect pageId from current URL (e.g. .../p04-debris.html → 'p04-debris')
   */
  function detectPageId(){
    if (typeof window === 'undefined') return '';
    const path = window.location.pathname;
    const m = path.match(/\/(p[0-9a-z\-]+)\.html?$/i);
    return m ? m[1].toLowerCase() : '';
  }

  /**
   * Auto-detect (ep, pageId, category) from URL
   */
  function detectCurrent(){
    const ep = detectEp();
    const pageId = detectPageId();
    const category = categoryOf(ep, pageId);
    return { ep, pageId, category };
  }

  global.ActivityRegistry = { categoryOf, detectEp, detectPageId, detectCurrent, _registry: REGISTRY };
})(typeof window !== 'undefined' ? window : this);
