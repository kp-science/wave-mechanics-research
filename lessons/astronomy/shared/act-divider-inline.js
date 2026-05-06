/* ═══════════════════════════════════════════════════════════════════
 * COSMOS LOG · Act Divider · Inline Overlay
 * ─────────────────────────────────────────────────────────────────
 * แสดง chapter card แบบ overlay ที่หน้าแรกของแต่ละ act
 * Auto-fade 5 วินาที · คลิก/Space/Enter ข้าม
 *
 * Usage: ใส่ที่บนสุดของ <body data-page="..."> ของหน้าแรกแต่ละ act
 *   <div class="act-overlay" data-ep="1" data-act="1"></div>
 *   <script src="../shared/act-divider-inline.js"></script>
 *
 * ดูครั้งเดียวต่อ session: ถ้าครูอยากให้แสดงทุกครั้ง · ลบ key
 *   'cosmos_act_seen_<ep>_<act>' ใน localStorage หรือ ?act-replay=1
 * ═══════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const ACTS = {
    1: {
      1: { title:'เริ่มภารกิจ', en:'SETUP', quote:'เกิดอะไรขึ้นในห้วงอวกาศ? · ทีมต้องไปหาคำตอบ', minutes:15, scenes:5, pages:'p01→p05', color:'#64d8ff' },
      2: { title:'สืบสวนเอกภพ', en:'INVESTIGATION', quote:'เราถ่ายภาพการกำเนิดเอกภพได้? · CMB จะตอบคุณ', minutes:25, scenes:4, pages:'p06→p09', color:'#7effb2' },
      3: { title:'ครูเปิดเวทีสอน', en:'TEACHING MOMENT', quote:'ทฤษฎีบิกแบงคืออะไรกันแน่? · v = H₀d เปลี่ยนทุกอย่าง', minutes:15, scenes:3, pages:'p10→p12', color:'#ffcb6b' },
      4: { title:'ปะทะ VOID', en:'CLIMAX', quote:'ปกป้องทฤษฎี · หักล้าง 3 คำโกหก · WARP เข้า Galaxy A', minutes:20, scenes:3, pages:'p13→p15', color:'#ff5c7a' },
      5: { title:'ปิดฉาก · เก็บข้อมูล', en:'CLOSURE', quote:'เนื้อเรื่องไหลแล้ว · วัดความเปลี่ยนแปลง · เปิดทาง EP02', minutes:15, scenes:4, pages:'p16→p27', color:'#d4b8ff' }
    },
    2: {
      1: { title:'เสียงเรียกในกาแล็กซี', en:'SETUP', quote:'สัญญาณแปลกจาก Local Group · ทีมต้องตามไปดู', minutes:15, scenes:4, pages:'p00→p06', color:'#64d8ff' },
      2: { title:'จำแนกกาแล็กซี', en:'CLASSIFY', quote:'Spiral · Elliptical · Irregular — Tuning Fork ของฮับเบิล', minutes:20, scenes:4, pages:'p07→p10', color:'#7effb2' },
      3: { title:'การล่าด้วย Doppler', en:'DOPPLER HUNT', quote:'Redshift · Blueshift · ใครเคลื่อนเข้าใครเคลื่อนออก?', minutes:20, scenes:4, pages:'p11→p14', color:'#ffcb6b' },
      4: { title:'VOID Boss สงครามครั้งแรก', en:'BOSS FIGHT', quote:'3-Phase BOSS · ปกป้อง Local Group จาก VOID', minutes:25, scenes:4, pages:'p15→p17', color:'#ff5c7a' },
      5: { title:'Reflection · Save Game', en:'CLOSURE', quote:'EP02 ปิด · เตรียม Pre-test EP03 · เดินทางต่อ', minutes:15, scenes:3, pages:'p18→p27', color:'#d4b8ff' }
    },
    3: {
      1: { title:'เสียงร้องจากอดีต', en:'CALL FROM PAST', quote:'ดาวห่าง 400 ปีแสง · พ่ออารยา ส่ง SOS', minutes:15, scenes:4, pages:'p01→p04', color:'#64d8ff' },
      2: { title:'พาแรลแลกซ์ · วัดดาว', en:'PARALLAX METHOD', quote:'d = 1/p · นิ้วโป้งบอกระยะของดวงดาว', minutes:25, scenes:5, pages:'beat 5-8', color:'#7effb2' },
      3: { title:'Magnitude · ความสว่างจริง', en:'BRIGHTNESS', quote:'m vs M · ดาวสว่างใกล้กับดาวริบหรี่ไกล', minutes:20, scenes:4, pages:'beat 9-12', color:'#ffcb6b' },
      4: { title:'WARP RUN', en:'CLIMAX', quote:'3 Endings · ทีมเลือกทางไปหาพ่ออารยา', minutes:25, scenes:4, pages:'p17→p20', color:'#ff5c7a' },
      5: { title:'Reflection · Choice Save', en:'CLOSURE', quote:'เลือก Ending แล้ว · เปิดทาง EP04 ดวงดาวกำลังจะตาย', minutes:15, scenes:3, pages:'p21→p27', color:'#d4b8ff' }
    },
    4: {
      1: { title:'วันสุดท้ายของยักษ์แดง', en:'COLD OPEN', quote:'ดาวที่เห็นทุกคืน · สีของมันผิดไปหมด', minutes:15, scenes:4, pages:'p00→p06', color:'#64d8ff' },
      2: { title:'STAR DECODER', en:'SPECTRAL ANALYSIS', quote:'OBAFGKM · อ่านสีดาว → อุณหภูมิ → ชนิด', minutes:25, scenes:5, pages:'p07→p13', color:'#7effb2' },
      3: { title:'MASS THRESHOLD · 9 vs 25 M☉', en:'MASS DECISION', quote:'มวลตัดสินชะตา · WD · NS · BH · ใครจะรอด?', minutes:20, scenes:5, pages:'p14→p20', color:'#ffcb6b' },
      4: { title:'GRAVITY ASCENT', en:'BOSS FIGHT', quote:'ขับยานฝ่าหลุมดำ · ผิดครั้งเดียว = event horizon', minutes:25, scenes:4, pages:'p21→p25', color:'#ff5c7a' },
      5: { title:'รำลึกถึงยักษ์แดง', en:'CLOSURE', quote:'ดาวตาย · แต่ทิ้งธาตุไว้ให้ดาวรุ่นใหม่ · เปิดทาง EP05', minutes:15, scenes:3, pages:'p26→p27', color:'#d4b8ff' }
    },
    5: {
      1: { title:'หัวใจที่เต้นผิดจังหวะ', en:'SOLAR ANOMALY', quote:'ดวงอาทิตย์ส่งสัญญาณผิดปกติ · ภัยพิบัติใกล้มา', minutes:20, scenes:5, pages:'p01→p07', color:'#64d8ff' },
      2: { title:'ATMOSPHERIC LAYERS', en:'STRUCTURE', quote:'Photosphere · Chromosphere · Corona — แต่ละชั้นมีบทบาท', minutes:25, scenes:6, pages:'p08→p15', color:'#7effb2' },
      3: { title:'POWER FORGE', en:'BUILD POWERS', quote:'HELION code → ปลดล็อค 6 powers · ทีมเตรียมรบ', minutes:25, scenes:6, pages:'p16→p24', color:'#ffcb6b' },
      4: { title:'SOLAR STORM', en:'BOSS FIGHT', quote:'พายุสุริยะมา · ใช้ powers ที่ FORGE · RACE→FORGE→FIGHT', minutes:25, scenes:6, pages:'p25→p32', color:'#ff5c7a' },
      5: { title:'Solar Reset Choice', en:'CLOSURE', quote:'สงบลง · เลือก Reset หรือ Preserve · เปิดทาง EP06', minutes:25, scenes:5, pages:'p33→p45', color:'#d4b8ff' }
    },
    6: {
      1: { title:'ขอบฟ้าของบ้าน', en:'HOME SYSTEM', quote:'ระบบสุริยะ · บ้านของเรา · มีอะไรที่เรายังไม่รู้?', minutes:20, scenes:5, pages:'p01→p08', color:'#64d8ff' },
      2: { title:'6 GENESIS SHARDS', en:'COLLECT', quote:'6 ดาวเคราะห์ · 6 shards · เก็บครบเปิด maze', minutes:30, scenes:8, pages:'p09→p20', color:'#7effb2' },
      3: { title:'Pale Blue Dot · จุดเล็กของเรา', en:'PERSPECTIVE', quote:'มองโลกจากระยะ 6 พันล้าน km · เราเห็นอะไร?', minutes:15, scenes:4, pages:'p21→p26', color:'#ffcb6b' },
      4: { title:'VOID ZERO-FIX · MAZE', en:'BOSS FIGHT', quote:'ฝ่า maze · 4 endings · 7 achievements', minutes:30, scenes:7, pages:'p27→p38', color:'#ff5c7a' },
      5: { title:'KPA Tracker · สรุป', en:'CLOSURE', quote:'ปิดระบบสุริยะ · เก็บ Tracker · เปิดทาง EP07 EM', minutes:20, scenes:5, pages:'p39→p47', color:'#d4b8ff' }
    },
    7: {
      1: { title:'สงครามในวงโคจร', en:'PBL OPEN', quote:'ดาวเทียมชนกัน · เรามีเวลา 100 นาทีตัดสิน', minutes:20, scenes:4, pages:'p01→p06', color:'#64d8ff' },
      2: { title:'EM SPECTRUM · 7 ช่วง', en:'EM CLASSIFY', quote:'Radio → Gamma · ดาวเทียมแต่ละชนิดใช้คลื่นไหน?', minutes:20, scenes:5, pages:'p07→p13', color:'#7effb2' },
      3: { title:'ORBITS · LEO · MEO · GEO', en:'ORBIT MASTERY', quote:'ระยะ vs ช่วงเวลา · Kepler ในการจัดการดาวเทียม', minutes:20, scenes:5, pages:'p14→p20', color:'#ffcb6b' },
      4: { title:'CIPHER · Orbital Triage', en:'BOSS FIGHT', quote:'3 ชั้นไข · PBL group decision · ทีมต้อง consensus', minutes:25, scenes:5, pages:'p21→p25', color:'#ff5c7a' },
      5: { title:'รายงาน PBL · สรุปบทเรียน', en:'CLOSURE', quote:'ส่งรายงาน Triage · เปิดทาง EP08 Finale', minutes:15, scenes:3, pages:'p26→p27', color:'#d4b8ff' }
    },
    8: {
      1: { title:'Recap · ทบทวน 7 EP', en:'RECAP', quote:'จากบิกแบง ถึงดาวเทียม · ทีมเดินทางมาไกลแล้ว', minutes:15, scenes:4, pages:'p01→p05', color:'#64d8ff' },
      2: { title:'Mentor Reveal', en:'TWIST', quote:'ดร.ฮับเบิล เปิดเผยตัวจริง · เป้าหมายคืออะไร?', minutes:15, scenes:4, pages:'p06→p10', color:'#7effb2' },
      3: { title:'17 Keys · Cosmic Genesis', en:'SYNTHESIS', quote:'รวม 17 keys ของทั้ง Season · เห็นภาพรวม', minutes:20, scenes:5, pages:'p11→p17', color:'#ffcb6b' },
      4: { title:'GENESIS FORGE', en:'4-PHASE BOSS', quote:'รบครั้งสุดท้าย · 5 endings · เลือกได้', minutes:30, scenes:7, pages:'p18→p25', color:'#ff5c7a' },
      5: { title:'Reset / Preserve · S2 Cliffhanger', en:'CLOSURE', quote:'พ่อกลับมา · เลือก Reset หรือ Preserve · Andromeda เรียก S2', minutes:20, scenes:4, pages:'p26→p27', color:'#d4b8ff' }
    }
  };

  // Inject CSS once
  function injectCSS(){
    if (document.getElementById('act-overlay-style')) return;
    const s = document.createElement('style');
    s.id = 'act-overlay-style';
    s.textContent = `
      .act-overlay-host {
        position: fixed; inset: 0; z-index: 99999;
        background: #050817;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        padding: 40px 24px; text-align: center;
        font-family: 'Sarabun', system-ui, sans-serif;
        color: #e8ecf8;
        isolation: isolate;
        animation: actFadeIn .6s ease-out;
      }
      .act-overlay-host.fading { animation: actFadeOut .5s ease-in forwards; }
      @keyframes actFadeIn { from{opacity:0} to{opacity:1} }
      @keyframes actFadeOut { from{opacity:1} to{opacity:0;visibility:hidden} }

      .act-overlay-host::before {
        content:''; position:absolute; inset:0; z-index:-2;
        background:
          radial-gradient(ellipse 90% 70% at 50% 50%, var(--ac, #64d8ff)22, transparent 70%),
          radial-gradient(ellipse 40% 80% at 0% 50%, var(--ac, #64d8ff)14, transparent 80%),
          radial-gradient(ellipse 40% 80% at 100% 50%, var(--ac, #64d8ff)14, transparent 80%);
      }
      .act-overlay-host::after {
        content:''; position:absolute; inset:0; z-index:-1;
        background-image:
          radial-gradient(1px 1px at 25% 30%, #fff, transparent),
          radial-gradient(1px 1px at 80% 60%, rgba(255,255,255,0.7), transparent),
          radial-gradient(2px 2px at 60% 20%, #fff, transparent),
          radial-gradient(1.5px 1.5px at 40% 70%, #fff, transparent),
          radial-gradient(1px 1px at 90% 90%, rgba(255,255,255,0.6), transparent);
        background-size: 600px 600px;
        opacity: 0.55;
      }

      .act-rail {
        position:absolute; top:24px; left:50%;
        transform:translateX(-50%);
        display:flex; gap:6px;
      }
      .act-rail i {
        width:32px; height:3px;
        background: var(--ac)33;
        border-radius:2px;
      }
      .act-rail i.on { background: var(--ac); box-shadow:0 0 12px var(--ac); }

      .act-ep-tag {
        font-family: 'Orbitron', monospace;
        font-size: 10px;
        letter-spacing: 0.5em;
        color: rgba(232,236,248,0.5);
        margin-bottom: 10px;
      }
      .act-ribbon {
        font-family: 'Orbitron', monospace;
        font-size: 11px;
        letter-spacing: 0.6em;
        color: var(--ac);
        margin-bottom: 12px;
        position: relative;
      }
      .act-ribbon::before, .act-ribbon::after {
        content:''; position:absolute; top:50%;
        width:60px; height:1px;
        background: linear-gradient(90deg, transparent, var(--ac));
      }
      .act-ribbon::before { right:calc(100% + 16px); transform:scaleX(-1); }
      .act-ribbon::after { left:calc(100% + 16px); }

      .act-bignum {
        font-family: 'Orbitron', monospace;
        font-size: clamp(120px, 22vw, 240px);
        font-weight: 900; line-height:0.9;
        background: linear-gradient(180deg, var(--ac) 30%, transparent 95%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        letter-spacing: -0.04em;
        margin: 0;
        filter: drop-shadow(0 0 60px var(--ac)44);
        animation: actNumPulse 4s ease-in-out infinite;
      }
      @keyframes actNumPulse {
        0%,100% { filter: drop-shadow(0 0 60px var(--ac)44); }
        50% { filter: drop-shadow(0 0 100px var(--ac)88); }
      }
      .act-title {
        font-family: 'Sarabun', sans-serif;
        font-size: clamp(28px, 4.5vw, 48px);
        font-weight: 700;
        margin: 14px 0 4px;
        text-shadow: 0 0 30px var(--ac)66;
      }
      .act-en {
        font-family: 'Orbitron', monospace;
        font-size: 13px; letter-spacing:0.35em;
        color: var(--ac);
        margin-bottom: 16px;
      }
      .act-quote {
        font-style: italic; font-weight: 300;
        font-size: clamp(15px, 2vw, 18px);
        max-width: 640px;
        margin: 12px auto 18px;
        opacity: 0.92;
        line-height:1.55;
      }
      .act-quote::before { content:'\\201C'; color: var(--ac); margin-right:6px; }
      .act-quote::after  { content:'\\201D'; color: var(--ac); margin-left:6px; }

      .act-stats {
        display: inline-flex; flex-wrap: wrap;
        background: rgba(0,0,0,0.4);
        border: 1px solid var(--ac)55;
        border-radius: 999px;
        padding: 4px;
        backdrop-filter: blur(10px);
        margin-top: 14px;
      }
      .act-stats > span {
        font-family: 'Orbitron', monospace;
        font-size: 11px; letter-spacing: 0.15em;
        padding: 8px 16px;
        border-radius: 999px;
        color: rgba(232,236,248,0.6);
        position: relative;
      }
      .act-stats > span:not(:last-child)::after {
        content:''; position:absolute; right:0; top:25%; bottom:25%;
        width:1px; background: var(--ac)33;
      }
      .act-stats b { color: var(--ac); font-weight:700; }

      .act-skip {
        position: absolute; bottom: 28px; left: 50%;
        transform: translateX(-50%);
        font-family: 'Orbitron', monospace;
        font-size: 11px; letter-spacing: 0.3em;
        color: rgba(232,236,248,0.55);
        cursor: pointer;
        padding: 8px 14px;
        border: 1px solid rgba(232,236,248,0.15);
        border-radius: 999px;
        background: rgba(0,0,0,0.3);
        transition: all .2s;
      }
      .act-skip:hover { color: var(--ac); border-color: var(--ac); }
      .act-skip b { color: var(--ac); margin: 0 4px; font-weight:700; }
    `;
    document.head.appendChild(s);
  }

  function dismiss(host){
    if (!host || host.classList.contains('fading')) return;
    host.classList.add('fading');
    setTimeout(() => host.remove(), 500);
  }

  function render(seed){
    const ep   = Number(seed.dataset.ep || 1);
    const act  = Number(seed.dataset.act || 1);
    const cfg  = (ACTS[ep] && ACTS[ep][act]) || ACTS[1][1];
    const replay = new URLSearchParams(location.search).has('act-replay');
    const seenKey = `cosmos_act_seen_${ep}_${act}`;
    if (!replay && sessionStorage.getItem(seenKey)) {
      seed.remove();
      return;
    }

    const host = document.createElement('div');
    host.className = 'act-overlay-host';
    host.style.setProperty('--ac', cfg.color);

    const railHtml = [1,2,3,4,5].map(i =>
      `<i class="${i===act?'on':''}"></i>`).join('');
    const ribbonText = ['ONE','TWO','THREE','FOUR','FIVE'][act-1] || act;

    host.innerHTML = `
      <div class="act-rail">${railHtml}</div>
      <div class="act-ep-tag">EP ${String(ep).padStart(2,'0')} · CHAPTER ${String(act).padStart(2,'0')}</div>
      <div class="act-ribbon">CHAPTER ${ribbonText}</div>
      <div class="act-bignum">${String(act).padStart(2,'0')}</div>
      <div class="act-title">${cfg.title}</div>
      <div class="act-en">${cfg.en}</div>
      <div class="act-quote">${cfg.quote}</div>
      <div class="act-stats">
        <span><b>${cfg.minutes}</b> นาที</span>
        <span><b>${cfg.scenes}</b> SCENES</span>
        <span><b>${cfg.pages}</b></span>
      </div>
      <button class="act-skip" type="button">เริ่ม · auto <b id="act-cd">5</b> วิ</button>
    `;

    document.body.appendChild(host);
    seed.remove();
    sessionStorage.setItem(seenKey, '1');

    // Click anywhere to skip
    host.addEventListener('click', () => dismiss(host));
    document.addEventListener('keydown', function onKey(e){
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
        document.removeEventListener('keydown', onKey);
        dismiss(host);
      }
    });

    // Countdown
    let t = 5;
    const cd = host.querySelector('#act-cd');
    const timer = setInterval(() => {
      t--;
      if (cd) cd.textContent = t;
      if (t <= 0) { clearInterval(timer); dismiss(host); }
    }, 1000);

    // Telemetry
    try {
      if (window.TelemetrySync) {
        TelemetrySync.send(`EP${ep}_Acts`, { act, title: cfg.title, en: cfg.en });
      }
    } catch(_){}
  }

  function boot(){
    const seeds = document.querySelectorAll('.act-overlay');
    if (!seeds.length) return;
    injectCSS();
    seeds.forEach(render);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
