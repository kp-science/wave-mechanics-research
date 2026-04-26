/* ===== COSMOS LOG · Photon · EP03 currency ===== */
/* PHOTON ⚡️ = currency ใหม่ · สะสมจาก puzzle · ใช้ใน warp/beacon/cloak   */

(function(global){
  const Photon = {
    // === core ===
    get() { const s = global.Sync && global.Sync.getState(); return (s && s.photon) || 0; },
    add(n, reason) { global.Sync && global.Sync.addPhoton(n, reason); },
    spend(n, target) { return global.Sync ? global.Sync.spendPhoton(n, target) : false; },
    canAfford(n) { return this.get() >= n; },

    // === award from puzzle ===
    awardFromCorrect({ page, bet = 50, bonusMult = 1 }) {
      const cfg = global.EP_CONFIG && global.EP_CONFIG.balance;
      const base = (cfg && cfg.photonPerCorrect) || 10;
      const mult = (cfg && cfg.photonBetMult && cfg.photonBetMult[bet]) || 1;
      const amt = Math.round(base * mult * bonusMult);
      this.add(amt, 'correct@' + page);
      return amt;
    },

    // === targets ===
    targets() {
      const cfg = global.EP_CONFIG && global.EP_CONFIG.photon && global.EP_CONFIG.photon.targets;
      return cfg || {};
    },

    // === HUD ===
    renderPill() {
      let pill = document.getElementById('photonPill');
      if (!pill) {
        pill = document.createElement('div');
        pill.id = 'photonPill';
        pill.className = 'hud-pill photon-pill';
        pill.style.cssText = 'position:fixed;top:10px;right:10px;z-index:50;padding:6px 12px;background:rgba(255,203,107,0.12);border:1px solid rgba(255,203,107,0.5);border-radius:20px;color:#ffcb6b;font-family:Orbitron,monospace;font-size:13px;letter-spacing:0.08em;';
        document.body.appendChild(pill);
      }
      pill.textContent = '⚡️ ' + this.get();
    },

    // === Photon Bank panel ===
    mountBank(selector) {
      const host = typeof selector === 'string' ? document.querySelector(selector) : selector;
      if (!host) return;
      const render = () => {
        const balance = this.get();
        const ts = this.targets();
        host.innerHTML = `
          <div class="photon-bank" style="padding:16px;background:rgba(255,203,107,0.06);border:2px solid rgba(255,203,107,0.4);border-radius:14px;margin:12px 0;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
              <div style="font-family:Orbitron,sans-serif;letter-spacing:0.2em;color:#ffcb6b;">🏦 PHOTON BANK</div>
              <div style="font-family:Orbitron,monospace;font-size:22px;color:#ffcb6b;">⚡️ ${balance}</div>
            </div>
            <div style="display:grid;grid-template-columns:1fr;gap:8px;">
              ${Object.entries(ts).map(([k,t])=>`
                <div style="padding:10px 12px;background:rgba(0,0,0,0.25);border:1px solid ${balance>=t.cost?'rgba(126,255,178,0.4)':'rgba(255,92,122,0.3)'};border-radius:10px;display:flex;justify-content:space-between;align-items:center;gap:10px;">
                  <div style="flex:1;">
                    <div style="font-weight:700;">${t.icon} ${t.name} <span style="color:${balance>=t.cost?'#7effb2':'#ff8fa5'};font-family:monospace;">· ${t.cost}⚡️</span></div>
                    <div style="font-size:11px;color:#9aa3c0;margin-top:3px;">${t.desc}</div>
                  </div>
                </div>
              `).join('')}
            </div>
            <div style="margin-top:10px;font-size:11px;color:#9aa3c0;">💡 ใช้ได้ในหน้า p13 (warp/cloak) · p14 (cloak/beacon) · p19 (shield)</div>
          </div>
        `;
      };
      render();
      global.Sync && global.Sync.on(() => render());
    },

    // === action button (for p13, p14, p19) ===
    mountSpendButton(selector, target, opts={}) {
      const host = typeof selector === 'string' ? document.querySelector(selector) : selector;
      if (!host) return;
      const ts = this.targets();
      const t = ts[target];
      if (!t) { host.innerHTML = '<div style="color:#ff5c7a;">⚠️ target not found: ' + target + '</div>'; return; }
      const render = () => {
        const bal = this.get();
        const can = bal >= t.cost;
        host.innerHTML = `
          <button class="photon-spend-btn ${can?'can':'cant'}"
            style="width:100%;padding:16px;background:${can?'rgba(255,203,107,0.15)':'rgba(100,100,120,0.1)'};
                   border:2px solid ${can?'#ffcb6b':'#444'};color:${can?'#ffcb6b':'#888'};
                   border-radius:12px;cursor:${can?'pointer':'not-allowed'};
                   font-family:inherit;font-size:14px;text-align:left;"
            ${can?'':'disabled'}>
            <div style="font-weight:700;font-size:16px;">${t.icon} ${t.name} · ${t.cost}⚡️</div>
            <div style="font-size:12px;color:#9aa3c0;margin-top:4px;">${t.desc}</div>
            <div style="margin-top:6px;font-family:Orbitron,monospace;font-size:11px;">คุณมี: ${bal}⚡️ ${can?'✓':'✗ ไม่พอ'}</div>
          </button>
        `;
        const btn = host.querySelector('button');
        btn.onclick = () => {
          if (!can) return;
          const ok = this.spend(t.cost, target);
          if (ok) {
            opts.onSpent && opts.onSpent(target);
            host.innerHTML = `<div style="padding:14px;background:rgba(126,255,178,0.15);border:2px solid #7effb2;border-radius:10px;text-align:center;color:#7effb2;font-family:Orbitron,sans-serif;">✓ ใช้ ${t.name} เรียบร้อย (-${t.cost}⚡️)</div>`;
          }
        };
      };
      render();
      global.Sync && global.Sync.on(() => render());
    },
  };

  global.Photon = Photon;

  /* ============ Coin 🪙 · EP03 secondary currency ============ */
  const KEY_COIN = 'cosmosLog_ep03_coin';
  const KEY_ITEMS = 'cosmosLog_ep03_shopItems';

  const Coin = {
    get() {
      try { return parseInt(localStorage.getItem(KEY_COIN)) || 0; } catch { return 0; }
    },
    add(n, reason) {
      const v = Math.max(0, this.get() + n);
      try { localStorage.setItem(KEY_COIN, String(v)); } catch {}
      global.Sync && global.Sync.recordDecision && global.Sync.recordDecision({ tag:'🪙 coin', note:(n>0?'+':'')+n+' '+reason+' → '+v });
      this.renderPill();
      return v;
    },
    spend(n, reason) {
      if (this.get() < n) return false;
      this.add(-n, reason);
      return true;
    },
    awardPerfect(pageId) {
      const cfg = global.EP_CONFIG && global.EP_CONFIG.coin && global.EP_CONFIG.coin.perfectBonus;
      const amt = cfg && cfg[pageId];
      if (!amt) return 0;
      // prevent double-grant
      const key = 'cosmosLog_ep03_coinGranted_' + pageId;
      if (localStorage.getItem(key)) return 0;
      localStorage.setItem(key, '1');
      this.add(amt, 'perfect@'+pageId);
      return amt;
    },
    renderPill() {
      let pill = document.getElementById('coinPill');
      if (!pill) {
        pill = document.createElement('div');
        pill.id = 'coinPill';
        pill.style.cssText = 'position:fixed;top:10px;right:100px;z-index:50;padding:6px 12px;background:rgba(255,203,107,0.12);border:1px solid rgba(255,203,107,0.5);border-radius:20px;color:#ffcb6b;font-family:Orbitron,monospace;font-size:13px;letter-spacing:0.08em;';
        document.body.appendChild(pill);
      }
      pill.textContent = '🪙 ' + this.get();
    },
  };

  /* ============ ShopItems · what player owns after shop ============ */
  const ShopItems = {
    load() {
      try { return JSON.parse(localStorage.getItem(KEY_ITEMS)) || {}; } catch { return {}; }
    },
    save(obj) { try { localStorage.setItem(KEY_ITEMS, JSON.stringify(obj)); } catch {} },
    has(id) { return !!this.load()[id]; },
    getUses(id) { const o = this.load(); return o[id] ? (o[id].uses || 0) : 0; },
    buy(id) {
      const cfg = global.EP_CONFIG && global.EP_CONFIG.shop && global.EP_CONFIG.shop.items;
      const item = cfg && cfg.find(x => x.id === id);
      if (!item) return false;
      if (this.has(id)) return false;
      if (!Coin.spend(item.cost, 'shop:'+id)) return false;
      const o = this.load();
      o[id] = { uses: item.uses === Infinity ? 999 : item.uses, boughtAt: Date.now() };
      this.save(o);
      return true;
    },
    use(id) {
      const o = this.load();
      if (!o[id] || o[id].uses <= 0) return false;
      o[id].uses -= 1;
      this.save(o);
      return true;
    },
    /* Grant an item without paying (e.g. reward box) · stacks uses if already owned */
    grant(id, addUses) {
      const cfg = global.EP_CONFIG && global.EP_CONFIG.shop && global.EP_CONFIG.shop.items;
      const item = cfg && cfg.find(x => x.id === id);
      const defaultUses = item && item.uses === Infinity ? 999 : (item ? item.uses : 1);
      const add = addUses != null ? addUses : (defaultUses || 1);
      const o = this.load();
      if (!o[id]) o[id] = { uses: add, grantedAt: Date.now() };
      else o[id].uses = (o[id].uses || 0) + add;
      this.save(o);
      return true;
    },
    reset() { try { localStorage.removeItem(KEY_ITEMS); } catch {} },
  };

  global.Coin = Coin;
  global.ShopItems = ShopItems;
})(window);
