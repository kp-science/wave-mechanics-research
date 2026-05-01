/* ===== COSMOS LOG · Cipher Vault Graphics =====
 * Visual layer for the EP07 boss. Vault door frame + animated phase backdrops
 * + VOID ghost + crystal chips + flash effects + key-insert animations.
 *
 * APIs:
 *   VaultGfx.injectFrame(parentEl, phase, keys)   → vault door frame
 *   VaultGfx.renderBackdrop(phase)                → returns SVG string
 *   VaultGfx.npcBubble(targetEl, name, line)      → speech bubble
 *   VaultGfx.voidGhost(text)                      → animate VOID head + line
 *   VaultGfx.crystal(phase)                       → drop crystal chip
 *   VaultGfx.crystalsMerge()                      → merge animation
 *   VaultGfx.flash(type)                          → success/fail flash
 *   VaultGfx.keyInsert(keyId)                     → key turn animation
 */
(function(global){
  const KEYS_META = [
    { id:'os1', icon:'🔭', name:'Lens Key',    band:'Phase 1', color:'#7ad6ff' },
    { id:'os2', icon:'🛰️', name:'Orbit Key',   band:'Phase 2', color:'#9be7c4' },
    { id:'os3', icon:'🚀', name:'Rocket Key',  band:'Phase 3', color:'#ff8a3d' },
    { id:'os4', icon:'🧪', name:'Spinoff Key', band:'Phase 4', color:'#9b59b6' }
  ];

  const VaultGfx = {
    KEYS_META,

    /* ===== Vault frame · door + 4 key lights ===== */
    injectFrame(parentEl, phase, keys){
      _css();
      let frame = parentEl.querySelector('.vfg-frame');
      if (!frame) {
        frame = document.createElement('div');
        frame.className = 'vfg-frame';
        parentEl.insertBefore(frame, parentEl.firstChild);
      }
      const have = new Set(keys || []);
      frame.innerHTML = `
        <svg class="vfg-door" viewBox="0 0 400 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="vfg-bezel" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stop-color="#3a4560"/><stop offset="1" stop-color="#0e1424"/>
            </linearGradient>
            <radialGradient id="vfg-bolt" cx="50%" cy="50%" r="50%">
              <stop offset="0" stop-color="#ffd84a"/><stop offset="1" stop-color="#a07a2a"/>
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="400" height="100" rx="14" fill="url(#vfg-bezel)" stroke="#2a3a55" stroke-width="2"/>
          <!-- decorative bolts -->
          ${[12,388].map(x => `<circle cx="${x}" cy="14" r="4" fill="url(#vfg-bolt)"/>
            <circle cx="${x}" cy="86" r="4" fill="url(#vfg-bolt)"/>`).join('')}
          <!-- inner panel -->
          <rect x="60" y="20" width="280" height="60" rx="8" fill="#0a0e1c" stroke="#4a90e2" stroke-width="1.5" opacity=".8"/>
          <text x="200" y="56" text-anchor="middle" font-size="20" font-weight="800" fill="#ff8a3d"
            font-family="'Sarabun',system-ui">PHASE ${phase}</text>
          <text x="200" y="76" text-anchor="middle" font-size="10" fill="#7ad6ff"
            letter-spacing="3" font-family="'Sarabun',system-ui">VOID CIPHER VAULT</text>
        </svg>
        <div class="vfg-keys">
          ${KEYS_META.map((k,i) => {
            const on = have.has(k.id);
            return `<div class="vfg-key ${on?'on':'off'}" style="--kc:${k.color}" title="${k.name} ${on?'· เสียบแล้ว':'· ขาด'}">
              <span class="vfg-key-ic">${k.icon}</span>
              <span class="vfg-key-tag">${k.name}</span>
              <span class="vfg-key-state">${on?'✓':'—'}</span>
            </div>`;
          }).join('')}
        </div>
      `;
      return frame;
    },

    /* ===== Phase backdrops (animated SVG scenes) ===== */
    renderBackdrop(phase){
      const fns = { 1:_bdSpectrum, 2:_bdOrbit, 3:_bdRocket, 4:_bdLab, 5:_bdSanctum };
      const fn = fns[phase] || fns[1];
      return `<div class="vfg-backdrop">${fn()}</div>`;
    },

    /* ===== NPC speech bubble ===== */
    npcBubble(targetEl, name, line, mood){
      if (!targetEl) return;
      const e = ({เคน:'🧑‍💻',อารยา:'👩‍🚀',โบลท์:'👦','พ่ออารยา':'👨‍✈️'})[name] || '🗣️';
      const tone = mood || 'normal';
      targetEl.innerHTML = `
        <div class="vfg-npc tone-${tone}">
          <div class="vfg-npc-av">${e}</div>
          <div class="vfg-npc-bubble">
            <div class="vfg-npc-name"><b>${name}</b></div>
            <div class="vfg-npc-line">${line}</div>
          </div>
        </div>
      `;
    },

    /* ===== VOID ghost overlay ===== */
    voidGhost(text){
      let g = document.getElementById('vfgVoidGhost');
      if (!g) {
        g = document.createElement('div');
        g.id = 'vfgVoidGhost';
        g.className = 'vfg-void';
        document.body.appendChild(g);
      }
      g.innerHTML = `
        <svg class="vfg-void-eye" viewBox="0 0 80 80">
          <defs>
            <radialGradient id="vfgEye" cx="50%" cy="50%" r="50%">
              <stop offset="0" stop-color="#ff0000"/><stop offset=".6" stop-color="#5a0000"/><stop offset="1" stop-color="#1a0000"/>
            </radialGradient>
          </defs>
          <circle cx="40" cy="40" r="36" fill="url(#vfgEye)"/>
          <circle cx="40" cy="40" r="14" fill="#000"/>
          <circle cx="44" cy="36" r="3" fill="#fff" opacity=".8"/>
        </svg>
        <div class="vfg-void-text glitch">${text || '...'}</div>
      `;
      g.classList.add('show');
      clearTimeout(this._voidT);
      this._voidT = setTimeout(() => g.classList.remove('show'), 4000);
    },

    /* ===== Cipher Crystal chips ===== */
    crystal(phase){
      let bag = document.getElementById('vfgCrystalBag');
      if (!bag) {
        bag = document.createElement('div');
        bag.id = 'vfgCrystalBag';
        bag.className = 'vfg-crystal-bag';
        document.body.appendChild(bag);
      }
      const colors = { 1:'#7ad6ff', 2:'#9be7c4', 3:'#ff8a3d', 4:'#9b59b6', 5:'#ffd84a' };
      const icons  = { 1:'🌈', 2:'🛰️', 3:'🚀', 4:'🧪', 5:'🔓' };
      const c = document.createElement('div');
      c.className = 'vfg-crystal vfg-cr-spawn';
      c.style.setProperty('--cc', colors[phase] || '#fff');
      c.innerHTML = `<span>${icons[phase] || '◆'}</span>`;
      bag.appendChild(c);
    },

    crystalsMerge(){
      const bag = document.getElementById('vfgCrystalBag');
      if (!bag) return;
      bag.classList.add('merging');
      setTimeout(() => bag.classList.remove('merging'), 1800);
    },

    /* ===== Flash effects ===== */
    flash(type){
      const el = document.createElement('div');
      el.className = 'vfg-flash vfg-flash-' + (type||'good');
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 700);
      // shake on fail
      if (type === 'bad') {
        const frame = document.querySelector('.vfg-frame');
        if (frame) {
          frame.classList.add('shake');
          setTimeout(() => frame.classList.remove('shake'), 500);
        }
      }
    },

    keyInsert(keyId){
      const el = document.querySelector(`.vfg-key[title^="${(KEYS_META.find(k=>k.id===keyId)||{}).name||''}"]`);
      if (!el) return;
      el.classList.add('inserting');
      setTimeout(() => el.classList.remove('inserting'), 1200);
    }
  };

  /* ===== Backdrop SVGs ===== */

  function _bdSpectrum(){
    return `<svg viewBox="0 0 600 200" class="vfg-bd-svg">
      <defs>
        <linearGradient id="bdRainbow" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%"   stop-color="#27ae60"/>
          <stop offset="20%"  stop-color="#3498db"/>
          <stop offset="40%"  stop-color="#e67e22"/>
          <stop offset="60%"  stop-color="#f1c40f"/>
          <stop offset="80%"  stop-color="#9b59b6"/>
          <stop offset="100%" stop-color="#00d4ff"/>
        </linearGradient>
      </defs>
      <rect width="600" height="200" fill="#060a14"/>
      ${[...Array(40)].map((_,i)=>`<circle cx="${(i*73)%600}" cy="${(i*97)%200}" r="${(i%3)+0.5}" fill="#fff" opacity=".${3+i%6}"/>`).join('')}
      <rect x="40" y="80" width="520" height="40" fill="url(#bdRainbow)" opacity=".5" rx="6"/>
      <g class="vfg-wave">
        <path d="M 40 100 Q 100 60 160 100 T 280 100 T 400 100 T 520 100" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/>
      </g>
      <text x="300" y="40" text-anchor="middle" fill="#7ad6ff" font-size="12" letter-spacing="3" font-weight="700">SPECTRUM ANALYZER</text>
      <text x="300" y="170" text-anchor="middle" fill="#9bb" font-size="11">วิทยุ → ไมโครเวฟ → IR → แสง → UV → X-ray</text>
    </svg>`;
  }

  function _bdOrbit(){
    return `<svg viewBox="0 0 600 200" class="vfg-bd-svg">
      <defs>
        <path id="orbit-leo" d="M 300 100 m -60 0 a 60 28 0 1 1 120 0 a 60 28 0 1 1 -120 0"/>
        <path id="orbit-meo" d="M 300 100 m -100 0 a 100 46 0 1 1 200 0 a 100 46 0 1 1 -200 0"/>
        <path id="orbit-geo" d="M 300 100 m -150 0 a 150 70 0 1 1 300 0 a 150 70 0 1 1 -300 0"/>
      </defs>
      <rect width="600" height="200" fill="#060a14"/>
      ${[...Array(60)].map((_,i)=>`<circle cx="${(i*43)%600}" cy="${(i*61)%200}" r="${(i%2)+0.5}" fill="#fff" opacity=".${3+i%6}"/>`).join('')}
      <ellipse cx="300" cy="100" rx="60"  ry="28" fill="none" stroke="#7ad6ff" stroke-width="1" stroke-dasharray="2 4" opacity=".7"/>
      <ellipse cx="300" cy="100" rx="100" ry="46" fill="none" stroke="#7ad6ff" stroke-width="1" stroke-dasharray="3 5" opacity=".6"/>
      <ellipse cx="300" cy="100" rx="150" ry="70" fill="none" stroke="#7ad6ff" stroke-width="1" stroke-dasharray="4 6" opacity=".5"/>
      <circle cx="300" cy="100" r="32" fill="#1a4060" stroke="#4a90e2" stroke-width="2"/>
      <circle cx="300" cy="100" r="16" fill="#4a90e2" opacity=".7"/>
      <text x="300" y="105" text-anchor="middle" font-size="14" fill="#fff">🌍</text>
      <!-- Satellites that REALLY orbit -->
      <g><circle r="5" fill="#9be7c4"/>
        <animateMotion dur="6s" repeatCount="indefinite" rotate="auto"><mpath href="#orbit-leo"/></animateMotion>
      </g>
      <g><circle r="5" fill="#ffd84a"/>
        <animateMotion dur="11s" repeatCount="indefinite" rotate="auto"><mpath href="#orbit-meo"/></animateMotion>
      </g>
      <g><circle r="5" fill="#ff8a3d"/>
        <animateMotion dur="18s" repeatCount="indefinite" rotate="auto"><mpath href="#orbit-geo"/></animateMotion>
      </g>
      <text x="300" y="30" text-anchor="middle" fill="#7ad6ff" font-size="12" letter-spacing="3" font-weight="700">ORBITAL TRIANGULATION</text>
      <text x="180" y="180" fill="#9be7c4" font-size="10">LEO 400km · v=7.7</text>
      <text x="290" y="180" fill="#ffd84a" font-size="10">MEO 20,200 · v=5.0</text>
      <text x="420" y="180" fill="#ff8a3d" font-size="10">GEO 35,786 · v=3.1</text>
    </svg>`;
  }

  function _bdRocket(){
    return `<svg viewBox="0 0 600 200" class="vfg-bd-svg">
      <rect width="600" height="200" fill="#060a14"/>
      ${[...Array(50)].map((_,i)=>`<circle cx="${(i*53)%600}" cy="${(i*71)%200}" r="${(i%2)+0.5}" fill="#fff" opacity=".${3+i%6}"/>`).join('')}
      <!-- launch pad -->
      <rect x="0" y="170" width="600" height="30" fill="#3a2810"/>
      <!-- rocket exploded view -->
      <g class="vfg-rocket-anim" transform="translate(280 30)">
        <polygon points="20,0 40,40 0,40" fill="#ff8a3d" stroke="#fff" stroke-width="1"/>
        <rect x="6" y="40" width="28" height="80" fill="#ddd" stroke="#888" stroke-width="1"/>
        <rect x="-12" y="60" width="14" height="60" fill="#888"/>
        <rect x="38" y="60" width="14" height="60" fill="#888"/>
        <polygon points="20,120 8,140 32,140" fill="#ffeb3b" opacity=".8" class="vfg-flame"/>
      </g>
      <text x="300" y="30" text-anchor="middle" fill="#7ad6ff" font-size="12" letter-spacing="3" font-weight="700">ROCKET BUILDER</text>
      <text x="300" y="190" text-anchor="middle" fill="#9bb" font-size="11">หัวรบ + ถังเหลว + จรวดแข็ง 2 ข้าง</text>
    </svg>`;
  }

  function _bdLab(){
    return `<svg viewBox="0 0 600 200" class="vfg-bd-svg">
      <rect width="600" height="200" fill="#060a14"/>
      <!-- lab grid floor -->
      <g opacity=".4">
        ${[...Array(10)].map((_,i)=>`<line x1="0" y1="${i*20}" x2="600" y2="${i*20}" stroke="#1a3050" stroke-width=".5"/>`).join('')}
        ${[...Array(30)].map((_,i)=>`<line x1="${i*20}" y1="0" x2="${i*20}" y2="200" stroke="#1a3050" stroke-width=".5"/>`).join('')}
      </g>
      <!-- 4 hazard pods -->
      <g class="vfg-pod" transform="translate(80 100)"><circle r="32" fill="#3a0808" stroke="#ff6a6a" stroke-width="2"/><text y="6" text-anchor="middle" font-size="28">🔥</text></g>
      <g class="vfg-pod" transform="translate(220 100)"><circle r="32" fill="#1a3a08" stroke="#9be7c4" stroke-width="2"/><text y="6" text-anchor="middle" font-size="28">☢️</text></g>
      <g class="vfg-pod" transform="translate(380 100)"><circle r="32" fill="#08243a" stroke="#7ad6ff" stroke-width="2"/><text y="6" text-anchor="middle" font-size="28">🍱</text></g>
      <g class="vfg-pod" transform="translate(520 100)"><circle r="32" fill="#3a0824" stroke="#ff8a3d" stroke-width="2"/><text y="6" text-anchor="middle" font-size="28">❤️</text></g>
      <text x="300" y="30" text-anchor="middle" fill="#7ad6ff" font-size="12" letter-spacing="3" font-weight="700">SPINOFF TOOLKIT LAB</text>
      <text x="300" y="190" text-anchor="middle" fill="#9bb" font-size="11">เลือกของจาก NASA spinoff ใส่ทุก hazard</text>
    </svg>`;
  }

  function _bdSanctum(){
    return `<svg viewBox="0 0 600 200" class="vfg-bd-svg">
      <defs>
        <radialGradient id="sanctum" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#3a2a08"/><stop offset="100%" stop-color="#060a14"/>
        </radialGradient>
      </defs>
      <rect width="600" height="200" fill="url(#sanctum)"/>
      <!-- 6 crystal slots -->
      ${[0,1,2,3,4,5].map(i => {
        const x = 80 + i*88;
        return `<g transform="translate(${x} 100)">
          <polygon points="0,-30 22,0 0,30 -22,0" fill="rgba(255,138,61,.15)" stroke="#ff8a3d" stroke-width="2"/>
          <text y="6" text-anchor="middle" font-size="18" fill="#ff8a3d" font-weight="700">${i+1}</text>
        </g>`;
      }).join('')}
      <!-- aurora glow -->
      <ellipse cx="300" cy="100" rx="240" ry="50" fill="none" stroke="#ffd84a" stroke-width="1" opacity=".4">
        <animate attributeName="opacity" values=".2;.6;.2" dur="3s" repeatCount="indefinite"/>
      </ellipse>
      <text x="300" y="30" text-anchor="middle" fill="#ffd84a" font-size="12" letter-spacing="3" font-weight="700">MASTER VAULT · INNER SANCTUM</text>
      <text x="300" y="190" text-anchor="middle" fill="#9bb" font-size="11">รวม 6 crystal · ระวัง corrupt</text>
    </svg>`;
  }

  /* ===== CSS ===== */
  function _css(){
    if (document.getElementById('vfg-css')) return;
    const s = document.createElement('style');
    s.id = 'vfg-css';
    s.textContent = `
      /* Vault frame */
      .vfg-frame{ position:relative; margin-bottom:14px; }
      .vfg-frame.shake{ animation: vfgShake .4s; }
      @keyframes vfgShake{
        0%,100%{ transform:translateX(0); }
        25%{ transform:translateX(-8px); }
        75%{ transform:translateX(8px); }
      }
      .vfg-door{ width:100%; height:auto; max-height:120px; display:block;
        filter: drop-shadow(0 0 14px rgba(255,138,61,.2));}
      .vfg-keys{ display:flex; gap:6px; margin-top:6px; }
      .vfg-key{ flex:1; padding:6px 10px; border-radius:8px;
        background:#0a1226; border:2px solid var(--kc); display:flex; gap:6px;
        align-items:center; font:600 12px system-ui; color:#cfe;
        opacity:.4; transition:all .3s; position:relative; overflow:hidden; }
      .vfg-key.on{ opacity:1; box-shadow:0 0 12px var(--kc), inset 0 0 8px rgba(255,255,255,.05); }
      .vfg-key.off{ filter: grayscale(.7); border-style:dashed; }
      .vfg-key-ic{ font-size:18px; }
      .vfg-key-tag{ flex:1; }
      .vfg-key-state{ font-weight:800; color:var(--kc); }
      .vfg-key.inserting::after{
        content:''; position:absolute; inset:0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.4), transparent);
        animation: vfgKeyShine 1.2s ease-out;
      }
      @keyframes vfgKeyShine{
        0%{ transform:translateX(-100%); }
        100%{ transform:translateX(100%); }
      }

      /* Backdrop */
      .vfg-backdrop{ position:relative; margin:8px 0;
        border-radius:10px; overflow:hidden; border:1px solid rgba(122,214,255,.22);
        box-shadow:0 0 18px rgba(0,0,0,.5);}
      .vfg-bd-svg{ width:100%; height:auto; max-height:200px; display:block; }
      .vfg-wave path{ animation: vfgWave 3s ease-in-out infinite alternate; transform-origin:center; }
      @keyframes vfgWave{ from{transform:scaleY(.6);} to{transform:scaleY(1.4);} }
      .vfg-orbit-sat{ animation: vfgOrbit 8s linear infinite; transform-origin:300px 100px; }
      .vfg-orbit-meo{ animation-duration:14s; }
      .vfg-orbit-geo{ animation-duration:22s; }
      @keyframes vfgOrbit{ from{transform:rotate(0) translateX(60px) rotate(0);} to{transform:rotate(360deg) translateX(60px) rotate(-360deg);} }
      .vfg-rocket-anim{ animation: vfgLaunch 2s ease-in-out infinite alternate; }
      @keyframes vfgLaunch{ from{transform:translate(280px,30px);} to{transform:translate(280px,5px);} }
      .vfg-flame{ animation: vfgFlame .35s ease-in-out infinite alternate; transform-origin:20px 120px; }
      @keyframes vfgFlame{ from{transform:scaleY(.85);} to{transform:scaleY(1.3);} }
      .vfg-pod{ animation: vfgPodPulse 1.6s ease-in-out infinite alternate; transform-origin:center; }
      @keyframes vfgPodPulse{ from{transform:scale(.94);} to{transform:scale(1.06);} }

      /* NPC bubble */
      .vfg-npc{ display:flex; gap:10px; align-items:flex-start; margin:10px 0;
        animation: vfgBubbleIn .3s ease-out;}
      @keyframes vfgBubbleIn{ from{opacity:0; transform:translateY(8px);} to{opacity:1; transform:translateY(0);} }
      .vfg-npc-av{ flex:0 0 auto; width:44px; height:44px;
        display:flex; align-items:center; justify-content:center; font-size:24px;
        background:radial-gradient(circle,#1a2540,#0a0e1c);
        border-radius:50%; border:2px solid #4a90e2;}
      .vfg-npc-bubble{ flex:1; background:#0a1226; border:1px solid #2a3a55;
        border-radius:12px; padding:8px 12px; position:relative; }
      .vfg-npc-bubble::before{
        content:''; position:absolute; left:-6px; top:14px;
        border:6px solid transparent; border-right-color:#0a1226;
      }
      .vfg-npc-name{ font-size:13px; color:#9be7c4; }
      .vfg-npc-name b{ color:#fff; }
      .vfg-npc-line{ font-size:14px; color:#cfe; margin-top:2px; }
      .vfg-npc.tone-warn .vfg-npc-bubble{ border-color:#ffd84a; }
      .vfg-npc.tone-bad  .vfg-npc-bubble{ border-color:#ff6a6a; }

      /* VOID ghost */
      .vfg-void{ position:fixed; right:20px; top:120px; z-index:300;
        width:200px; opacity:0; transform:translateX(40px) scale(.8);
        transition: opacity .4s, transform .4s; pointer-events:none;}
      .vfg-void.show{ opacity:1; transform:translateX(0) scale(1); }
      .vfg-void-eye{ width:80px; height:80px;
        animation: vfgEyeFloat 2s ease-in-out infinite alternate;
        filter: drop-shadow(0 0 14px rgba(255,0,0,.5));}
      @keyframes vfgEyeFloat{ from{transform:translateY(-3px);} to{transform:translateY(3px);} }
      .vfg-void-text{ background:rgba(20,0,0,.85); color:#ff9b9b;
        padding:8px 12px; border-radius:8px; font:600 12px system-ui;
        border:1px solid #ff6a6a; margin-top:6px; }
      .glitch{ animation: vfgGlitch 1.4s steps(2, end) infinite; }
      @keyframes vfgGlitch{
        0%,90%,100%{ text-shadow: 0 0 0 transparent; }
        93%{ text-shadow: 2px 0 #00d4ff, -2px 0 #ff6a6a; transform: translateX(1px); }
        96%{ text-shadow: -2px 0 #00d4ff, 2px 0 #ff6a6a; transform: translateX(-1px); }
      }

      /* Crystal bag */
      .vfg-crystal-bag{ position:fixed; left:14px; bottom:80px; z-index:75;
        display:flex; gap:6px; }
      .vfg-crystal{ width:36px; height:36px; display:flex; align-items:center;
        justify-content:center; background:radial-gradient(circle, var(--cc), transparent 70%);
        border:2px solid var(--cc); border-radius:8px; font-size:18px;
        box-shadow:0 0 14px var(--cc); transform: rotate(45deg); }
      .vfg-crystal span{ transform: rotate(-45deg); }
      .vfg-cr-spawn{ animation: vfgCrSpawn .8s ease-out; }
      @keyframes vfgCrSpawn{
        0%{ transform: rotate(45deg) scale(0); opacity:0; }
        60%{ transform: rotate(45deg) scale(1.3); opacity:1; }
        100%{ transform: rotate(45deg) scale(1); opacity:1; }
      }
      .vfg-crystal-bag.merging .vfg-crystal{ animation: vfgCrMerge 1.6s ease-in-out forwards; }
      @keyframes vfgCrMerge{
        0%{ transform: rotate(45deg) scale(1) translateX(0); }
        50%{ transform: rotate(180deg) scale(1.4) translateX(40px); opacity:1; }
        100%{ transform: rotate(360deg) scale(.4) translateX(80px); opacity:0; }
      }

      /* Flash overlays */
      .vfg-flash{ position:fixed; inset:0; pointer-events:none; z-index:299;
        animation: vfgFlash .6s ease-out forwards; }
      .vfg-flash-good{ background: radial-gradient(circle, rgba(155,231,196,.5), transparent 70%); }
      .vfg-flash-bad{  background: radial-gradient(circle, rgba(255,106,106,.5), transparent 70%); }
      @keyframes vfgFlash{ from{opacity:1;} to{opacity:0;} }

      @media(max-width:600px){
        .vfg-keys{ flex-wrap:wrap; }
        .vfg-key{ flex:1 1 calc(50% - 4px); }
        .vfg-void{ width:140px; right:8px; }
        .vfg-crystal-bag{ bottom:60px; left:8px; }
      }
    `;
    document.head.appendChild(s);
  }
  document.addEventListener('DOMContentLoaded', _css);

  global.VaultGfx = VaultGfx;
})(window);
