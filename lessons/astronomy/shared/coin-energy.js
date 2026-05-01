/* ===== COSMOS LOG · Coin & Energy Helpers =====
 * Thin facade over KPA economy methods + reward grants for common interactions
 * Use:
 *   CoinEnergy.reward('quickPollCorrect')
 *   CoinEnergy.penalty('crisisFail')
 *   CoinEnergy.canSpend(20)
 */
(function(global){
  const REWARDS = {
    quickPollCorrect:   { coin:3, reason:'quick-poll-correct' },
    crisisSolveFirst:   { coin:5, reason:'crisis-solve-first' },
    crisisSolveSecond:  { coin:3, reason:'crisis-solve-second' },
    crisisSolveLater:   { coin:1, reason:'crisis-solve-later' },
    explainBackComplete:{ coin:5, reason:'explain-back-complete' },
    confidenceCalibrated:{coin:2, reason:'confidence-calibrated' },
    masteryStreak:      { coin:5, reason:'mastery-streak-3' },
    actComplete:        { coin:0, energy:3, reason:'act-complete' },
    bossCrisisPass:     { coin:10,reason:'boss-crisis-pass' }
  };
  const PENALTIES = {
    crisisFail:    { energy:-1, reason:'crisis-fail' },
    crisisTimeout: { energy:-1, reason:'crisis-timeout' },
    hintUsed:      { energy:-1, reason:'hint-used' },
    skipActivity:  { energy:-2, reason:'skip-activity' },
    bossDamage:    { energy:-1, reason:'boss-damage' }
  };

  const CoinEnergy = {
    reward(key, multiplier){
      const r = REWARDS[key]; if (!r || !global.KPA) return;
      const m = multiplier || 1;
      if (r.coin)   KPA.addCoin(r.coin * m, r.reason);
      if (r.energy) KPA.addEnergy(r.energy * m, r.reason);
      _flash('+' + (r.coin||r.energy) + (r.coin?'🪙':'⚡'), r.coin?'#ffd84a':'#7ad6ff');
    },
    penalty(key){
      const p = PENALTIES[key]; if (!p || !global.KPA) return;
      if (p.energy) KPA.spendEnergy(-p.energy, p.reason);
      _flash((p.energy)+'⚡', '#ff6a6a');
    },
    canSpend(coins){
      const e = KPA.economy(); return (e.coins||0) >= coins;
    },
    spend(coins, reason){
      return KPA.spendCoin(coins, reason);
    },
    state(){ return KPA.economy(); }
  };

  function _flash(txt, color){
    const el = document.createElement('div');
    el.className = 'ce-flash';
    el.textContent = txt;
    el.style.color = color || '#ffd84a';
    document.body.appendChild(el);
    requestAnimationFrame(()=> el.classList.add('ce-flash-out'));
    setTimeout(()=> el.remove(), 1400);
  }
  function _css(){
    if (document.getElementById('ce-css')) return;
    const s = document.createElement('style');
    s.id = 'ce-css';
    s.textContent = `
      .ce-flash{position:fixed;top:50px;right:18px;z-index:200;
        font:700 22px/1 system-ui;text-shadow:0 0 10px rgba(0,0,0,.7);
        opacity:1;transform:translateY(0);transition:opacity .9s, transform .9s;}
      .ce-flash-out{opacity:0;transform:translateY(-30px);}
    `;
    document.head.appendChild(s);
  }
  document.addEventListener('DOMContentLoaded', _css);

  global.CoinEnergy = CoinEnergy;
})(window);
