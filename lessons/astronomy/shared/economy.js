/* ═══════════════════════════════════════════════════════════════════
 * Economy · 2-tier currency system (Energy + Coin) · ครูโกเมน · COSMOS LOG
 * ─────────────────────────────────────────────────────────────────
 * Design philosophy:
 *   • ENERGY = constant reward · "ทำกิจกรรมครบ → ได้ energy คงที่"
 *     Once-per-page · กดซ้ำไม่ได้ซ้ำ · construct = task completion
 *   • COIN = quality reward · "ตอบครั้งเดียวถูก = coin เยอะ"
 *     Decay by attempts · 1st=100%, 2nd=60%, 3rd=30%, 4+=10%
 *     Once-per-page-per-attempts-tier · construct = mastery quality
 *   • SHOP = strategic reward · "เปลี่ยน coin → energy ก่อน boss"
 *     Per-EP exchange rate · construct = self-regulated learning
 *
 * Sync to Sheet: Energy_Log · Coin_Log · Shop_Log (research-grade trace data)
 * ═══════════════════════════════════════════════════════════════════ */
(function(global){

  /* ── Per-EP balance config ────────────────────────────────────
   * Auto-balanced for boss energy threshold = 100 start, A+=70, A=40, B=1
   * - energyPerActivity: คงที่ · ครบทุกกิจกรรม → เก็บได้ ~ totalEnergy
   * - coinBase: ค่า base ที่ลดตาม attempts (สูตร floor(base * decay^(n-1)))
   * - shopRate: coin → energy exchange (เด็กที่ coin เยอะแลกได้ energy เพิ่ม)
   * ─────────────────────────────────────────────────────────── */
  const EP_CONFIG = {
    1: { energyPerActivity: 5,  coinBase: 15, shopRate: 5,
         // 19 หน้า × 5 = ~95 energy max · ไม่มี boss
         note: 'ep01 · book.js · no boss' },
    2: { energyPerActivity: 5,  coinBase: 18, shopRate: 5,
         // 23 หน้า · boss = 15-wave VOID Prime · HP-based
         note: 'ep02 · book.js · VOID Prime (HP-based · energy not critical)' },
    3: { energyPerActivity: 4,  coinBase: 20, shopRate: 4,
         // 32 หน้า · WARP RUN · photon-driven
         note: 'ep03 · WARP RUN (photon-based)' },
    4: { energyPerActivity: 4,  coinBase: 22, shopRate: 4,
         // 32 หน้า · GRAVITY ASCENT · start=100 · A+=70 · ใช้ energy
         note: 'ep04 · GRAVITY · charge=8 · need ≥70 for A+' },
    5: { energyPerActivity: 3,  coinBase: 18, shopRate: 3,
         // 48 หน้า · SOLAR STORM · charge=6
         note: 'ep05 · SOLAR · 48 pages · A+=70' },
    6: { energyPerActivity: 3,  coinBase: 18, shopRate: 3,
         // 50 หน้า · VOID ZERO-FIX · charge=6
         note: 'ep06 · VOID ZERO-FIX · 50 pages' },
    7: { energyPerActivity: 4,  coinBase: 22, shopRate: 4,
         // 31 หน้า · CIPHER VAULT
         note: 'ep07 · CIPHER · 31 pages' },
    8: { energyPerActivity: 5,  coinBase: 25, shopRate: 5,
         // 32 หน้า · GENESIS FORGE · season finale (rich rewards)
         note: 'ep08 · GENESIS FORGE · finale' }
  };

  const COIN_DECAY = {
    1: 1.00,  // ครั้งแรก = full base
    2: 0.60,  // ครั้งที่ 2 = 60%
    3: 0.30,  // ครั้งที่ 3 = 30%
    4: 0.10   // ครั้งที่ 4+ = 10% (floor)
  };

  /* ── Helpers ───────────────────────────────────────────────── */
  function epOf(){
    if (typeof global.EP_NUM === 'number') return global.EP_NUM;
    const m = location.pathname.match(/\/ep(\d{2})\//i);
    return m ? parseInt(m[1], 10) : 1;
  }
  function cfg(){ return EP_CONFIG[epOf()] || EP_CONFIG[1]; }
  function key(suffix){ return 'cosmosLog_economy_ep' + epOf() + '_' + suffix; }

  /* ── Logger (sync to Apps Script · queue · retry) ──────────── */
  const LOG_KEY = 'cosmosLog_economy_queue';
  function logEvent(action, payload){
    try {
      const queue = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
      queue.push({ action, payload, at: Date.now() });
      localStorage.setItem(LOG_KEY, JSON.stringify(queue.slice(-50)));
    } catch(_){}
    flushLog();
  }
  let flushing = false;
  async function flushLog(){
    if (flushing) return;
    flushing = true;
    try {
      const queue = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
      if (!queue.length) { flushing = false; return; }
      const apiUrl = (global.KP_CONFIG && global.KP_CONFIG.apiUrl) ||
                     'https://script.google.com/macros/s/AKfycbyVahd2W0MOH20wxfeU60h6fbBj6kpjaOEM9UoHpQWBQHM2SPiqIXZ3q2FufEpFg5YQDw/exec';
      // ดึง student profile จาก ActivitySync ถ้ามี
      const student = (global.ActivitySync && ActivitySync._student && ActivitySync._student()) || {};
      for (const ev of queue) {
        try {
          await fetch(apiUrl, {
            method: 'POST', mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
              action: ev.action,
              payload: Object.assign({}, ev.payload, {
                student_id: student.student_id || '',
                name: student.name || '',
                no: student.no || '',
                class: student.class || '',
                ua: navigator.userAgent.slice(0, 80),
                ts: ev.at
              })
            })
          });
        } catch(_){}
      }
      localStorage.setItem(LOG_KEY, '[]');
    } catch(_){}
    flushing = false;
  }
  window.addEventListener('load', () => setTimeout(flushLog, 1500));

  /* ── Visual feedback ────────────────────────────────────────── */
  function showEarnedBadge(btn, label){
    if (!btn) return;
    btn.classList.add('eco-earned');
    btn.disabled = true;
    if (!btn.dataset.ecoOriginalText) btn.dataset.ecoOriginalText = btn.textContent;
    btn.textContent = '✓ ' + label;
    btn.style.cursor = 'not-allowed';
    btn.style.opacity = '0.7';
  }

  /* ── Core API ───────────────────────────────────────────────── */
  const Economy = {
    EP_CONFIG, COIN_DECAY,

    /* Energy: once-per-page · constant reward
     * @param opts {page, amount?, reason, btn?}
     * @return amount granted (0 if duplicate) */
    energyOnce(opts){
      opts = opts || {};
      const page = opts.page || (document.body && document.body.dataset.page) || '?';
      const amount = (typeof opts.amount === 'number') ? opts.amount : cfg().energyPerActivity;
      const reason = opts.reason || ('activity-complete:' + page);
      const k = key('e_' + page);
      if (localStorage.getItem(k)) {
        if (opts.btn) showEarnedBadge(opts.btn, '+' + amount + ' ⚡ (เคยได้แล้ว)');
        return 0;
      }
      localStorage.setItem(k, String(amount));
      // เรียกระบบที่มีอยู่ (Book หรือ KPA)
      try {
        if (global.Book && global.Book.addEnergy) Book.addEnergy(amount, reason);
        else if (global.KPA && global.KPA.addEnergy) KPA.addEnergy(amount, reason);
      } catch(_){}
      logEvent('logEnergy', { ep: epOf(), pageId: page, amount, reason });
      if (opts.btn) showEarnedBadge(opts.btn, '+' + amount + ' ⚡');
      else this._popToast('+' + amount + ' ⚡', '#7effb2');
      return amount;
    },

    /* Coin: once-per-page-per-attempts-tier · decay reward
     * @param opts {page, attempts, base?, reason?}
     * @return amount granted (0 if already paid at this tier) */
    coinByAttempts(opts){
      opts = opts || {};
      const page = opts.page || (document.body && document.body.dataset.page) || '?';
      const attempts = Math.max(1, opts.attempts || 1);
      const base = (typeof opts.base === 'number') ? opts.base : cfg().coinBase;
      const tier = Math.min(4, attempts);
      const k = key('c_' + page);
      const lastTier = parseInt(localStorage.getItem(k) || '0', 10);
      // จ่ายเฉพาะถ้ายังไม่ได้จ่ายที่ tier นี้ + tier ที่ดีกว่ายังไม่ได้จ่าย
      if (lastTier && lastTier <= tier) return 0;
      const decay = COIN_DECAY[tier] || COIN_DECAY[4];
      const amount = Math.max(1, Math.floor(base * decay));
      localStorage.setItem(k, String(tier));
      try {
        if (global.Coin && global.Coin.add) Coin.add(amount, 'attempts-' + attempts + '@' + page);
        else if (global.KPA && global.KPA.addCoin) KPA.addCoin(amount, 'attempts-' + attempts + '@' + page);
      } catch(_){}
      logEvent('logCoin', { ep: epOf(), pageId: page, amount, attempts, tier, base, reason: opts.reason || 'mastery' });
      this._popToast('+' + amount + ' 🪙' + (attempts > 1 ? ' (×' + attempts + ' tries)' : ' PERFECT!'), '#ffcb6b');
      return amount;
    },

    /* Shop: exchange coin → energy (per-EP rate)
     * @param opts {coinSpent, itemId?}
     * @return energyGained or false if insufficient */
    shopExchange(opts){
      opts = opts || {};
      const coinSpent = opts.coinSpent || 0;
      const rate = cfg().shopRate;
      const energyGained = Math.floor(coinSpent / rate);
      if (energyGained <= 0) return false;
      try {
        const ok = (global.Coin && Coin.spend) ? Coin.spend(coinSpent, 'shop-exchange') :
                   (global.KPA && KPA.spendCoin) ? KPA.spendCoin(coinSpent, 'shop-exchange') : false;
        if (!ok) return false;
        if (global.Book && Book.addEnergy) Book.addEnergy(energyGained, 'shop-exchange');
        else if (global.KPA && KPA.addEnergy) KPA.addEnergy(energyGained, 'shop-exchange');
      } catch(_){ return false; }
      logEvent('logShop', { ep: epOf(), coinSpent, energyGained, rate, itemId: opts.itemId || '' });
      this._popToast('🛒 -' + coinSpent + ' 🪙 → +' + energyGained + ' ⚡', '#b980ff');
      return energyGained;
    },

    /* Status: รายการตอนนี้ของนักเรียน · ใช้ render HUD */
    summary(){
      const ep = epOf();
      const c = EP_CONFIG[ep] || EP_CONFIG[1];
      // นับว่าได้ energy ครบกี่หน้าแล้ว
      let energyEarned = 0, pagesEarned = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(key('e_'))) {
          energyEarned += parseInt(localStorage.getItem(k), 10) || 0;
          pagesEarned++;
        }
      }
      // นับ coin earned (จาก mastery only · ไม่นับ shop)
      let coinTier1 = 0, coinTotal = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(key('c_'))) {
          const tier = parseInt(localStorage.getItem(k), 10) || 0;
          if (tier === 1) coinTier1++;
          coinTotal++;
        }
      }
      return {
        ep, config: c,
        energyEarned, pagesEarned,
        coinPagesAt1stTry: coinTier1,
        coinPagesTotal: coinTotal,
        masteryRate: coinTotal ? +(coinTier1 / coinTotal).toFixed(2) : 0
      };
    },

    /* Reset (debug · teacher) */
    reset(ep){
      const targetEp = ep || epOf();
      const prefix = 'cosmosLog_economy_ep' + targetEp + '_';
      const toRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(prefix)) toRemove.push(k);
      }
      toRemove.forEach(k => localStorage.removeItem(k));
      console.info('[Economy] reset ep' + targetEp + ' · ' + toRemove.length + ' keys cleared');
    },

    _popToast(text, color){
      const el = document.createElement('div');
      el.style.cssText = 'position:fixed;top:60px;right:20px;z-index:9999;padding:10px 16px;background:rgba(0,0,0,0.85);color:' + color + ';border:1.5px solid ' + color + ';border-radius:10px;font-family:Orbitron,monospace;font-weight:700;font-size:13px;letter-spacing:.05em;box-shadow:0 4px 16px rgba(0,0,0,.4);animation:ecoToastSlide .3s ease-out';
      el.textContent = text;
      document.body.appendChild(el);
      setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .4s'; }, 1800);
      setTimeout(() => el.remove(), 2400);
    }
  };

  /* CSS injection */
  if (!document.getElementById('eco-style')) {
    const s = document.createElement('style');
    s.id = 'eco-style';
    s.textContent = `
      @keyframes ecoToastSlide{from{transform:translateX(40px);opacity:0}to{transform:translateX(0);opacity:1}}
      .eco-earned{filter:saturate(.5);position:relative}
      .eco-earned::after{content:'✓ ได้แล้ว';position:absolute;top:-8px;right:-4px;font-size:9px;padding:2px 6px;background:#16a34a;color:#fff;border-radius:8px;font-family:monospace;letter-spacing:.05em;box-shadow:0 1px 4px rgba(0,0,0,.2)}
      .eco-hud-chip{position:fixed;bottom:14px;right:14px;z-index:9998;padding:6px 12px;background:rgba(0,0,0,.7);color:#fff;border-radius:20px;font-size:11px;font-family:monospace;font-weight:700;letter-spacing:.05em;pointer-events:auto;cursor:pointer;display:flex;gap:8px;align-items:center}
      .eco-hud-chip:hover{background:rgba(0,0,0,.9)}
    `;
    document.head.appendChild(s);
  }

  /* HUD chip · แสดงสถานะ economy ของ EP ปัจจุบัน */
  function renderHudChip(){
    if (document.getElementById('eco-hud-chip')) return;
    const chip = document.createElement('div');
    chip.id = 'eco-hud-chip';
    chip.className = 'eco-hud-chip';
    document.body.appendChild(chip);
    const refresh = () => {
      const s = Economy.summary();
      chip.innerHTML = `<span style="color:#7effb2">⚡${s.energyEarned}</span><span style="color:#ffcb6b">🪙mastery ${(s.masteryRate*100).toFixed(0)}%</span>`;
      chip.title = 'EP' + s.ep + ' · เก็บ energy ครบ ' + s.pagesEarned + ' หน้า · ตอบครั้งเดียวถูก ' + s.coinPagesAt1stTry + '/' + s.coinPagesTotal + ' หน้า';
    };
    refresh();
    setInterval(refresh, 3000);
  }
  document.addEventListener('DOMContentLoaded', () => setTimeout(renderHudChip, 800));

  global.Economy = Economy;
})(window);
