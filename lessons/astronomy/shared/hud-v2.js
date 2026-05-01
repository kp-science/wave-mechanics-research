/* ===== COSMOS LOG · HUD v2 (6-slot) =====
 * Top-right floating HUD: 🪙 coin · ⚡ energy · 🔭 OS · 🎁 box · ❤️ HP (boss only) · ⏱️ session
 * HUD.config({ os:{got,total}, hp:{cur,max}, mb:{got,total}, showHP:false })
 */
(function(global){
  let cfg = { os:{got:0,total:4}, hp:null, mb:{got:0,total:7} };
  let sessionStart = Date.now();

  const HUD = {
    config(c){ cfg = Object.assign(cfg, c||{}); this.refresh(); },
    refresh(){
      const el = document.getElementById('hudV2'); if (!el) return _build();
      const e = (global.KPA && KPA.economy()) || { coins:0, energy:0, energyMax:10, boxes:[] };
      el.querySelector('[data-h="coin"]').textContent = e.coins;
      el.querySelector('[data-h="energy"]').textContent = e.energy + '/' + e.energyMax;
      el.querySelector('[data-h="os"]').textContent = (cfg.os.got||0) + '/' + (cfg.os.total||4);
      el.querySelector('[data-h="mb"]').textContent = (cfg.mb.got||0) + '/' + (cfg.mb.total||7);
      const hpSlot = el.querySelector('[data-slot="hp"]');
      if (cfg.hp) {
        hpSlot.style.display = '';
        el.querySelector('[data-h="hp"]').textContent = cfg.hp.cur + '/' + cfg.hp.max;
      } else { hpSlot.style.display = 'none'; }
      const t = Math.floor((Date.now() - sessionStart)/1000);
      const mm = String(Math.floor(t/60)).padStart(2,'0');
      const ss = String(t%60).padStart(2,'0');
      el.querySelector('[data-h="time"]').textContent = mm + ':' + ss;
    },
    setOS(got, total){ cfg.os = { got, total: total ?? cfg.os.total }; this.refresh(); },
    setHP(cur, max){ cfg.hp = (cur === null) ? null : { cur, max }; this.refresh(); },
    setMB(got, total){ cfg.mb = { got, total: total ?? cfg.mb.total }; this.refresh(); },
    incOS(){ cfg.os.got++; this.refresh(); },
    incMB(){ cfg.mb.got++; this.refresh(); }
  };

  function _build(){
    if (document.getElementById('hudV2')) return HUD.refresh();
    const el = document.createElement('div');
    el.id = 'hudV2';
    el.className = 'hud-v2';
    el.innerHTML = `
      <span class="hud-slot"><i>🪙</i><b data-h="coin">0</b></span>
      <span class="hud-slot"><i>⚡</i><b data-h="energy">0/10</b></span>
      <span class="hud-slot"><i>🔭</i><b data-h="os">0/4</b></span>
      <span class="hud-slot"><i>🎁</i><b data-h="mb">0/7</b></span>
      <span class="hud-slot" data-slot="hp" style="display:none"><i>❤️</i><b data-h="hp">10/10</b></span>
      <span class="hud-slot"><i>⏱️</i><b data-h="time">00:00</b></span>
    `;
    document.body.appendChild(el);
    _css();
    HUD.refresh();
    setInterval(()=> HUD.refresh(), 1000);
  }
  function _css(){
    if (document.getElementById('hud-v2-css')) return;
    const s = document.createElement('style');
    s.id = 'hud-v2-css';
    s.textContent = `
      .hud-v2{position:fixed;top:38px;right:10px;z-index:75;display:flex;gap:6px;
        background:rgba(8,12,20,.86);backdrop-filter:blur(8px);
        border:1px solid #2a3a55;border-radius:14px;padding:6px 10px;
        font:600 13px/1 system-ui;color:#cfe;}
      .hud-slot{display:flex;align-items:center;gap:4px;padding:2px 6px;
        background:#11182a;border-radius:8px;border:1px solid #1d2a44;}
      .hud-slot i{font-style:normal;}
      .hud-slot b{font-weight:700;color:#fff;}
      @media(max-width:600px){ .hud-v2{font-size:11px;padding:4px 6px;gap:3px;}
        .hud-slot{padding:2px 4px;} }
    `;
    document.head.appendChild(s);
  }

  document.addEventListener('DOMContentLoaded', _build);
  global.HUD = HUD;
})(window);
