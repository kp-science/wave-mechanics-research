/* ===== COSMOS LOG · Shop · Booster purchase + risk-preference logging =====
 * Used at p23 boss-prep. Shop.open() shows 7 boosters, logs each purchase as
 * a risk-preference signal for research dashboard.
 */
(function(global){
  const CATALOG = [
    { id:'hull',     icon:'🛡️', name:'Reinforced Hull',  cost:20, kind:'safe',     effect:'HP +2' },
    { id:'time',     icon:'⏱️', name:'Time Dilation',    cost:15, kind:'safe',     effect:'Crisis timer +5s' },
    { id:'hint',     icon:'💡', name:'Hint Beacon',      cost:12, kind:'safe',     effect:'1 free hint per crisis' },
    { id:'second',   icon:'🔄', name:'Second Chance',    cost:18, kind:'balanced', effect:'1 mistake costs no HP' },
    { id:'auto',     icon:'🎯', name:'Auto-Aim',         cost:25, kind:'risky',    effect:'Skip first crisis' },
    { id:'power',    icon:'⚡', name:'Power Cell',       cost:10, kind:'safe',     effect:'+3 energy' },
    { id:'combo',    icon:'🌟', name:'Combo Multiplier', cost:30, kind:'risky',    effect:'Streak rewards ×2' }
  ];

  const Shop = {
    open(rootEl, opts){
      opts = opts || {};
      const root = rootEl || document.body;
      const e = global.KPA ? KPA.economy() : { coins:0 };
      const wrap = document.createElement('div');
      wrap.className = 'shop-wrap';
      wrap.innerHTML = `
        <div class="shop-head">
          <h2>🛒 SHOP · Boss Outfitter</h2>
          <div class="shop-bal">เหรียญที่มี: <b id="shopBal">${e.coins}</b> 🪙</div>
        </div>
        <div class="shop-grid" id="shopGrid"></div>
        <button class="shop-done" id="shopDone">พร้อมรบ →</button>
        <div class="shop-bag">กระเป๋า: <span id="shopBag">ว่าง</span></div>
      `;
      root.appendChild(wrap);
      const grid = wrap.querySelector('#shopGrid');
      const bagSet = new Set();
      const bagEl = wrap.querySelector('#shopBag');
      const balEl = wrap.querySelector('#shopBal');

      CATALOG.forEach(item => {
        const card = document.createElement('div');
        card.className = 'shop-card kind-' + item.kind;
        card.innerHTML = `
          <div class="shop-icon">${item.icon}</div>
          <div class="shop-name">${item.name}</div>
          <div class="shop-eff">${item.effect}</div>
          <button class="shop-buy" data-id="${item.id}" data-cost="${item.cost}">${item.cost} 🪙</button>
        `;
        card.querySelector('button').onclick = () => {
          if (bagSet.has(item.id)) return;
          if (!global.KPA || !KPA.spendCoin(item.cost, 'shop-' + item.id)) {
            card.classList.add('shop-shake');
            setTimeout(()=> card.classList.remove('shop-shake'), 400);
            return;
          }
          bagSet.add(item.id);
          card.classList.add('owned');
          card.querySelector('button').textContent = '✓ ซื้อแล้ว';
          card.querySelector('button').disabled = true;
          balEl.textContent = KPA.economy().coins;
          bagEl.textContent = [...bagSet].map(id => CATALOG.find(c=>c.id===id).icon).join(' ');
          KPA.shopChoice({ id:item.id, kind:item.kind, cost:item.cost,
            balanceAfter: KPA.economy().coins });
          KPA.competency('C2', { evidence:'shop-decision-' + item.kind });
        };
        grid.appendChild(card);
      });

      wrap.querySelector('#shopDone').onclick = () => {
        // analyze risk preference
        const items = [...bagSet].map(id => CATALOG.find(c => c.id === id));
        const safeN  = items.filter(i => i.kind === 'safe').length;
        const riskyN = items.filter(i => i.kind === 'risky').length;
        const profile = riskyN > safeN ? 'risk-taker' : (safeN > riskyN ? 'cautious' : 'balanced');
        if (global.KPA) {
          KPA.research('riskProfile', { profile, safeN, riskyN, items: items.map(i=>i.id) });
        }
        if (typeof opts.onDone === 'function') opts.onDone({ items, profile });
        wrap.remove();
      };
      _css();
    }
  };

  function _css(){
    if (document.getElementById('shop-css')) return;
    const s = document.createElement('style');
    s.id = 'shop-css';
    s.textContent = `
      .shop-wrap{max-width:780px;margin:20px auto;padding:18px;
        background:linear-gradient(180deg,#1a2540,#0a0e1c);
        border:1px solid #4a90e2;border-radius:16px;color:#cfe;}
      .shop-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;}
      .shop-head h2{margin:0;color:#ff8a3d;}
      .shop-bal{background:#0a1226;padding:6px 12px;border-radius:10px;
        border:1px solid #2a3a55;font-weight:700;}
      .shop-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;}
      .shop-card{background:#11182a;border:1px solid #2a3a55;border-radius:12px;
        padding:12px;text-align:center;transition:transform .2s;}
      .shop-card.kind-safe{border-color:#2a6a4a;}
      .shop-card.kind-risky{border-color:#a04a2a;}
      .shop-card.owned{opacity:.6;}
      .shop-card.shop-shake{animation:shake .4s;}
      @keyframes shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-6px);}75%{transform:translateX(6px);}}
      .shop-icon{font-size:32px;}
      .shop-name{font-weight:700;margin:4px 0;}
      .shop-eff{font-size:12px;color:#8aa;min-height:28px;}
      .shop-buy{background:#ff8a3d;color:#1a0e00;border:none;border-radius:8px;
        padding:6px 12px;font-weight:700;cursor:pointer;margin-top:6px;}
      .shop-buy:disabled{background:#2a6a4a;color:#cfe;cursor:default;}
      .shop-done{display:block;margin:14px auto 6px;background:#00d4ff;color:#001824;
        border:none;border-radius:10px;padding:10px 28px;font:700 16px system-ui;cursor:pointer;}
      .shop-bag{text-align:center;color:#7ad6ff;font-size:14px;}
    `;
    document.head.appendChild(s);
  }

  global.Shop = Shop;
  global.SHOP_CATALOG = CATALOG;
})(window);
