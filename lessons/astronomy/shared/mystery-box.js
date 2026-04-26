/* ===== Mystery Box · post-activity reward ===== */
/* MysteryBox.roll({ wrongs, page }) → opens overlay, animates, awards  */
/* Tier rules from SKILL.md:                                            */
/*   PERFECT (0 wrong) → 3 drops · full value                            */
/*   GOOD    (1-3)     → 2 drops · 50% value                             */
/*   PASS    (≥4)      → 1 drop  · ≤60 coin only                         */

(function(global){
  if (global.MysteryBox) return;

  const TIERS = {
    perfect: { label:'PERFECT', icon:'🥇', color:'#ffcb6b', drops:3 },
    good:    { label:'GOOD',    icon:'🥈', color:'#7effb2', drops:2 },
    pass:    { label:'PASS',    icon:'🥉', color:'#a0e8ff', drops:1 },
  };

  const POOL_FULL = [
    { type:'coin', amount:30, icon:'🪙', label:'+30 Coins' },
    { type:'coin', amount:20, icon:'🪙', label:'+20 Coins' },
    { type:'photon', amount:15, icon:'✦', label:'+15 Photon' },
    { type:'photon', amount:10, icon:'✦', label:'+10 Photon' },
    { type:'coin', amount:25, icon:'🪙', label:'+25 Coins' },
  ];
  const POOL_HALF = [
    { type:'coin', amount:15, icon:'🪙', label:'+15 Coins' },
    { type:'coin', amount:10, icon:'🪙', label:'+10 Coins' },
    { type:'photon', amount:8, icon:'✦', label:'+8 Photon' },
    { type:'photon', amount:5, icon:'✦', label:'+5 Photon' },
  ];
  const POOL_PASS = [
    { type:'coin', amount:10, icon:'🪙', label:'+10 Coins' },
    { type:'coin', amount:5,  icon:'🪙', label:'+5 Coins' },
    { type:'photon', amount:3, icon:'✦', label:'+3 Photon' },
  ];

  function pickN(pool, n) {
    const p = pool.slice();
    const out = [];
    for (let i=0; i<n && p.length; i++) {
      out.push(p.splice(Math.floor(Math.random()*p.length), 1)[0]);
    }
    return out;
  }

  function tierFromWrongs(wrongs) {
    if (wrongs <= 0) return 'perfect';
    if (wrongs <= 3) return 'good';
    return 'pass';
  }

  function awardDrop(d) {
    if (d.type === 'coin' && global.Coin && Coin.add) Coin.add(d.amount);
    else if (d.type === 'photon' && global.Photon && Photon.add) Photon.add(d.amount);
  }

  const MysteryBox = {
    /* Show banner at top of page · "🎁 MYSTERY BOX READY" */
    showBanner(opts={}) {
      if (document.getElementById('mboxBanner')) return;
      const b = document.createElement('div');
      b.id = 'mboxBanner';
      b.style.cssText = 'position:sticky; top:0; z-index:25; padding:10px 16px; background:linear-gradient(90deg,#ffcb6b22,#ff8fa522,#b980ff22); border-bottom:1px solid #ffcb6b; text-align:center; font-family:Orbitron,sans-serif; color:#ffcb6b; font-size:13px; letter-spacing:0.15em; animation:mboxPulse 1.5s infinite; margin:-50px -16px 14px -16px;';
      b.innerHTML = '🎁 MYSTERY BOX · ' + (opts.tag || 'หลังจบ activity จะเปิดให้') + ' 🎁';
      document.body.insertBefore(b, document.body.firstChild);
      if (!document.getElementById('mboxStyle')) {
        const s = document.createElement('style');
        s.id = 'mboxStyle';
        s.textContent = '@keyframes mboxPulse { 50% { background:linear-gradient(90deg,#ffcb6b44,#ff8fa544,#b980ff44); } }' +
                        '@keyframes boxShake { 0%,100%{transform:rotate(0deg);} 25%{transform:rotate(-8deg);} 75%{transform:rotate(8deg);} }' +
                        '@keyframes boxBurst { from{transform:scale(0.4);opacity:0;} 60%{transform:scale(1.2);opacity:1;} to{transform:scale(1);} }' +
                        '@keyframes dropFloat { from{transform:translateY(20px);opacity:0;} to{transform:translateY(0);opacity:1;} }';
        document.head.appendChild(s);
      }
    },

    hideBanner() {
      const b = document.getElementById('mboxBanner');
      if (b) b.remove();
    },

    /* roll · opens fullscreen overlay · awards · resolves promise */
    roll({ wrongs=0, page='', onClose }) {
      const tier = tierFromWrongs(wrongs);
      const meta = TIERS[tier];
      const pool = tier==='perfect' ? POOL_FULL : (tier==='good' ? POOL_HALF : POOL_PASS);
      const drops = pickN(pool, meta.drops);

      // Award rewards
      drops.forEach(awardDrop);

      // Build overlay
      const ovl = document.createElement('div');
      ovl.style.cssText = 'position:fixed; inset:0; z-index:300; background:rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center; backdrop-filter:blur(6px); animation:mboxPulse 0.4s;';
      ovl.innerHTML = `
        <div style="max-width:420px; padding:30px 24px; text-align:center;">
          <div style="font-size:80px; animation:boxShake 0.6s 2;">🎁</div>
          <div style="font-family:Orbitron,sans-serif; font-size:14px; letter-spacing:0.2em; color:${meta.color}; margin:14px 0;">
            TIER · ${meta.icon} ${meta.label}
          </div>
          <div style="font-size:13px; color:#9aa3c0;">
            ทำผิด ${wrongs} ข้อ → ได้ ${meta.drops} รางวัล
          </div>
          <div id="mboxDrops" style="display:flex; flex-direction:column; gap:10px; margin:20px 0;"></div>
          <button id="mboxClose" style="padding:14px 28px; min-height:48px; background:rgba(255,203,107,0.15); border:2px solid ${meta.color}; color:${meta.color}; border-radius:12px; font-family:Orbitron,sans-serif; font-weight:700; letter-spacing:0.12em; cursor:pointer; font-size:14px; -webkit-tap-highlight-color:transparent;">
            ▶ รับรางวัล · ปิด
          </button>
        </div>
      `;
      document.body.appendChild(ovl);

      const dropsHost = ovl.querySelector('#mboxDrops');
      drops.forEach((d, i) => {
        setTimeout(() => {
          const card = document.createElement('div');
          card.style.cssText = `padding:14px 18px; background:rgba(0,0,0,0.4); border:1.5px solid ${meta.color}; border-radius:10px; font-family:Orbitron,sans-serif; color:${meta.color}; font-size:16px; letter-spacing:0.05em; animation:dropFloat 0.4s ease-out;`;
          card.innerHTML = `${d.icon}  ${d.label}`;
          dropsHost.appendChild(card);
          if (global.SFX) global.SFX.play('snap');
        }, 400 + i * 350);
      });

      if (global.SFX) global.SFX.play('box');

      ovl.querySelector('#mboxClose').onclick = () => {
        ovl.remove();
        this.hideBanner();
        onClose && onClose({ tier, drops });
      };

      return { tier, drops };
    },
  };

  global.MysteryBox = MysteryBox;
})(window);
