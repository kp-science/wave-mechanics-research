/* ===== COSMOS LOG · EP06 Config · v1 EDGE OF HOME ===== */
/* ขอบฟ้าของบ้าน · สมาชิกระบบสุริยะ · ตำรา สสวท. หน้า 68-75      */
/* ตัวชี้วัด ว 7.1 ม.6/1                                         */
/* 4-องก์ · 28 หน้า · 3-phase template (engage → explore → gate)  */

window.EP_CONFIG = {
  id: 'ep06',
  version: 'v1',
  title: 'ขอบฟ้าของบ้าน',
  subtitle: 'Edge of Home · สมาชิกระบบสุริยะ',
  badge: { icon: '🪐', name: 'Scale Master' },
  duration: 125,
  indicator: 'ว 7.1 ม.6/1',
  rank: { from: 'CAPTAIN', to: 'CAPTAIN+' },

  /* ------------------------------------------------------------------ */
  /* PAGES · 28 หน้า                                                     */
  /* ------------------------------------------------------------------ */
  pages: [
    // ACT A · ARRIVAL (5)
    { id:'p00', file:'p00-cover.html',          title:'EP06 Cover · Comet Diversion',  type:'story',      time:3 },
    { id:'p01', file:'p01-pretest.html',        title:'Pre-test · 8 ข้อ M1-M7',         type:'reflection', time:6 },
    { id:'p02', file:'p02-anomaly.html',        title:'เรดาร์ · 7 ดาวหางเบี่ยง',         type:'puzzle',     time:5 },
    { id:'p03', file:'p03-void-taunt.html',     title:'VOID hologram · ท้าทาย',          type:'story',      time:3 },
    { id:'p04', file:'p04-mission-brief.html',  title:'พ่อตั้งภารกิจ · GS 0/6',          type:'setup',      time:3 },
    // ACT B · NEBULA LAB (6) · GS-1, GS-2
    { id:'p05a', file:'p05a-nebula-engage.html',  title:'☁️ NEBULA · A · ENGAGE',         type:'story',      time:4 },
    { id:'p05b', file:'p05b-nebula-explore.html', title:'☁️ NEBULA · B · EXPLORE timeline', type:'puzzle',   time:6 },
    { id:'p05c', file:'p05c-nebula-gate.html',    title:'🔧 NEBULA REASSEMBLY · GS-1',     type:'mixed',      time:6 },
    { id:'p06-bridge', file:'p06-bridge.html',    title:'🛰️ BRIDGE · NEBULA → DISK',        type:'story',     time:2 },
    { id:'p06a', file:'p06a-disk-engage.html',    title:'💍 DISK · A · ENGAGE',            type:'story',      time:4 },
    { id:'p06b', file:'p06b-disk-gate.html',      title:'🔍 DISK SORT · GS-2',             type:'mixed',      time:6 },
    // ACT C · FOUR ZONES (15)
    { id:'p07-bridge', file:'p07-bridge.html',    title:'🛰️ BRIDGE · DISK → ZONE 1',        type:'story',     time:2 },
    { id:'p07a', file:'p07a-inner-engage.html',   title:'🪨 INNER · A · ENGAGE',            type:'story',     time:4 },
    { id:'p07b', file:'p07b-inner-explore.html',  title:'🪨 INNER · B · EXPLORE',           type:'puzzle',    time:6 },
    { id:'p07c', file:'p07c-inner-gate.html',     title:'🪨 ROCKY LOCK · GS-3',             type:'mixed',     time:6 },
    { id:'p08-bridge', file:'p08-bridge.html',    title:'🛰️ BRIDGE · ZONE 1 → ASTEROID',    type:'story',     time:2 },
    { id:'p08a', file:'p08a-belt-engage.html',    title:'⭕ BELT · A · ENGAGE',             type:'story',     time:4 },
    { id:'p08b', file:'p08b-belt-explore.html',   title:'⭕ BELT · B · EXPLORE',            type:'puzzle',    time:6 },
    { id:'p08c', file:'p08c-belt-gate.html',      title:'⭕ BELT NAVIGATOR · GS-4',         type:'mixed',     time:6 },
    { id:'p09-bridge', file:'p09-bridge.html',    title:'🛰️ BRIDGE · BELT → GIANTS',         type:'story',    time:2 },
    { id:'p09a', file:'p09a-giants-engage.html',  title:'☄ GIANTS · A · ENGAGE',            type:'story',    time:4 },
    { id:'p09b', file:'p09b-giants-explore.html', title:'☄ GIANTS · B · EXPLORE gas/ice',   type:'puzzle',   time:6 },
    { id:'p09c', file:'p09c-giants-quiz.html',    title:'☄ GIANTS · C · Quiz · kill M2',    type:'mixed',    time:5 },
    { id:'p09d', file:'p09d-giants-gate.html',    title:'☄ GIANT BREAKDOWN · GS-5',         type:'mixed',    time:6 },
    { id:'p10-bridge', file:'p10-bridge.html',    title:'🛰️ BRIDGE · GIANTS → KUIPER',      type:'story',    time:2 },
    { id:'p10a', file:'p10a-kuiper-engage.html',  title:'❄️ KUIPER · A · ENGAGE',           type:'story',    time:4 },
    { id:'p10b', file:'p10b-kuiper-explore.html', title:'❄️ KUIPER · B · EXPLORE',          type:'puzzle',   time:6 },
    { id:'p10c', file:'p10c-kuiper-quiz.html',    title:'❄️ KUIPER · C · Quiz · kill M5',   type:'mixed',    time:5 },
    { id:'p10d', file:'p10d-kuiper-gate.html',    title:'❄️ COMET ORIGIN MAP · GS-6',       type:'mixed',    time:6 },
    // ACT D · HELIOPAUSE + VAULT (16)
    { id:'p11', file:'p11-voyager-replay.html',   title:'Voyager 1 · 122 AU · kill M6',     type:'puzzle',   time:5 },
    { id:'p12', file:'p12-scale-shock.html',      title:'30 / 120 / 70k AU · zoom-out',     type:'story',    time:3 },
    { id:'p13', file:'p13-kepler-hunt.html',      title:'T²=a³ · ฐานอยู่ที่ 45 AU',          type:'puzzle',   time:5 },
    { id:'p14', file:'p14-vault-entry.html',      title:'Genesis Vault · ลงจอด',             type:'story',   time:3 },
    { id:'p15', file:'p15-vault-walls.html',      title:'Timeline ต้นกำเนิด',                type:'story',   time:4 },
    { id:'p16', file:'p16-void-plan.html',        title:'VOID · ลบเนบิวลา',                 type:'story',    time:3 },
    { id:'p17', file:'p17-habitable-engage.html', title:'🌍 Habitable · 4 ปัจจัย',          type:'story',    time:4 },
    { id:'p18', file:'p18-habitable-explore.html',title:'🌍 Slider ระยะ · น้ำ',              type:'puzzle',  time:5 },
    { id:'p19', file:'p19-habitable-quiz.html',   title:'🌍 Quiz · kill M7',                 type:'mixed',   time:4 },
    { id:'p20', file:'p20-exoplanet.html',        title:'🎁 Kepler-452b · TRAPPIST-1e',     type:'puzzle',   time:5 },
    { id:'p21', file:'p21-migration-vote.html',   title:'เลือก 1 ดาว · debate',              type:'puzzle',  time:4 },
    { id:'p22', file:'p22-bolt-clue.html',        title:'🎁 โบลท์เห็นสัญลักษณ์',              type:'story',   time:3 },
    { id:'p23', file:'p23-boss-prep.html',        title:'forge GENESIS LANCE',                type:'puzzle',  time:5 },
    { id:'p24', file:'p24-boss-grid.html',        title:'🔥 VOID ZERO-FIX · Grid Boss',        type:'mixed',   time:10 },
    { id:'p25', file:'p25-rescue-ending.html',    title:'🌌 4 endings A+/A/B/C',              type:'story',   time:4 },
    { id:'p26', file:'p26-satellite-fail.html',   title:'ดาวเทียมโลกดับ · cliffhanger',       type:'story',   time:3 },
    { id:'p26b', file:'p26b-halloffame.html',          title:'🏆 Hall of Fame · ทีมชนะ EP06',                  type:'reflection', time:3 },
    { id:'p27', file:'p27-journal.html',          title:'🏆 Scale Master · 3-2-1',            type:'reflection', time:4 },
  ],

  /* ------------------------------------------------------------------ */
  /* GENESIS SHARDS · 6 ชิ้น (Quest progress · key prefix = helions)     */
  /* ------------------------------------------------------------------ */
  helions: [
    { id:'gs1', icon:'☁️', name:'Nebula Seed',     scene:'p05c', kills:[]   },
    { id:'gs2', icon:'💍', name:'Disk Ring',       scene:'p06b', kills:[]   },
    { id:'gs3', icon:'🪨', name:'Rocky Core',      scene:'p07c', kills:['M3'] },
    { id:'gs4', icon:'⭕', name:'Belt Fragment',   scene:'p08c', kills:['M4'] },
    { id:'gs5', icon:'☄', name:"Giant's Heart",   scene:'p09d', kills:['M2'] },
    { id:'gs6', icon:'❄️', name:'Oort Whisper',    scene:'p10d', kills:['M5'] },
  ],
  voidEtaStartHr: 24,
  voidEtaPerScene: 0.6,

  /* ------------------------------------------------------------------ */
  /* OBJECTIVES · K · P · A                                              */
  /* ------------------------------------------------------------------ */
  objectives: {
    K1: { label:'สมาชิกระบบสุริยะครบถ้วน (M1)',  pages:['p01','p07','p08','p09','p10','p27'], threshold:0.85 },
    K2: { label:'4 เขต + ภายใน/นอก/แคระ/ดาวหาง', pages:['p07','p08','p09','p10'], threshold:0.85 },
    K3: { label:'ระยะ 30/120/70k AU + heliopause', pages:['p11','p12','p13'], threshold:0.80 },
    K4: { label:'เนบิวลา → จาน → planetesimal',   pages:['p05','p06','p15'], threshold:0.85 },
    K5: { label:'พลูโต = ดาวเคราะห์แคระ (M5)',    pages:['p10','p27'], threshold:0.80 },
    K6: { label:'Habitable zone 4 ปัจจัย',        pages:['p17','p18','p19','p20'], threshold:0.80 },
    P1: { label:'อ่านข้อมูล/ภาพถ่าย Voyager + ดาวยักษ์', pages:['p09','p11','p12'] },
    P2: { label:'ใช้ T²=a³ คำนวณวงโคจร',          pages:['p13'] },
    P3: { label:'เปรียบเทียบ exoplanet vs ระบบสุริยะ', pages:['p20','p21'] },
    A1: { label:'ตั้งคำถามต่อ "ดวงที่ 9"',          pages:['p10','p11'] },
    A2: { label:'ทำงานเป็นทีม · ตัดสินใจ migrate',  pages:['p21','p23','p24'] },
    A3: { label:'ตระหนัก scale + ความเปราะบางของระบบ', pages:['p12','p25','p26','p27'] },
  },

  /* ------------------------------------------------------------------ */
  /* MISCONCEPTIONS · M1-M7                                              */
  /* ------------------------------------------------------------------ */
  misconceptions: {
    M1: { label:'ระบบสุริยะ = แค่ดวงอาทิตย์ + ดาวเคราะห์', truth:'+ ดาวเคราะห์น้อย ดาวหาง ดาวเคราะห์แคระ บริวาร' },
    M2: { label:'ดาวเคราะห์ชั้นนอก = แก๊สล้วน',          truth:'มีแก่นแข็ง (rock+ice core) ห่อด้วยแก๊ส/น้ำแข็ง' },
    M3: { label:'โลกใหญ่/พิเศษกว่าดาวอื่น',                truth:'โลกเล็กกว่าดาวแก๊สมาก · พฤหัส = 11× โลก' },
    M4: { label:'asteroid belt = ทะเลหินแน่น',            truth:'ระยะเฉลี่ยระหว่างก้อน ~ 1 ล้าน กม.' },
    M5: { label:'พลูโต = ดาวเคราะห์ดวงที่ 9',             truth:'IAU 2006 จัดเป็นดาวเคราะห์แคระ (dwarf planet)' },
    M6: { label:'ระบบสุริยะจบที่เนปจูน 30 AU',            truth:'heliopause ~120 AU · Oort Cloud ~70,000 AU' },
    M7: { label:'เขตเอื้อชีวิต = ระยะห่างอย่างเดียว',       truth:'น้ำเหลว + อากาศ + T + ระยะ + ชนิดดาวฤกษ์' },
  },

  /* ROLES · ใช้ร่วม EP05 (Navigator/Heliophysicist/Medic/Engineer) */
  roles: [
    { id:'nav',  icon:'🧭', name:'Navigator',     desc:'พล็อตวงโคจร · Kepler T²=a³' },
    { id:'helio',icon:'🔭', name:'Astronomer',    desc:'อ่านสมาชิกระบบ · จำแนกประเภท' },
    { id:'med',  icon:'🌱', name:'Astrobiologist',desc:'ประเมิน habitable + exoplanet' },
    { id:'mech', icon:'🔧', name:'Engineer',      desc:'ใช้ deflector · forge LANCE' },
  ],
  roleFlex: { 2:{nav:['nav','mech'],helio:['helio','med']}, 3:{nav:['nav'],helio:['helio','med'],mech:['mech']}, 4:null },

  /* COIN */
  coin: {
    start: 0,
    perfectBonus: {
      p01: 10, p02: 15,
      p05c: 30, p06b: 30, p07c: 30, p08c: 30, p09d: 40, p10d: 40,
      p09c: 25, p10c: 25,
      p11: 25, p13: 50, p18: 25, p19: 25, p20: 30,
      p23: 50, p24: 80,
    },
  },

  photon: {
    start: 30,
    key: 'cosmosLog_ep06_photon',
    targets: {
      shield:  { cost:60, icon:'🛡️', name:'Field Shield',     desc:'บล็อก meteor pulse 1 ครั้งใน boss' },
      hint:    { cost:20, icon:'💡', name:'Kepler Hint',       desc:'แสดง hint คำถาม 1 ครั้ง' },
      thrust:  { cost:40, icon:'🚀', name:'Voyager Booster',   desc:'+5 thrust ก่อน boss' },
    },
  },

  shop: {
    items: [
      { id:'keplerCalc',  icon:'🧮', name:'Kepler Calculator', cost:60, desc:'+5 Thrust ต่อข้อถูก Zone 1', uses:Infinity, type:'passive', cat:'zone1' },
      { id:'scaleVision', icon:'🔭', name:'Scale Vision',      cost:70, desc:'บล็อกตอบผิด 1 ครั้ง Zone 2', uses:1, type:'defense' },
      { id:'cometRadar',  icon:'☄', name:'Comet Radar',        cost:50, desc:'next answer +5 thrust',     uses:2, type:'boost' },
      { id:'aurorPulse',  icon:'🌌', name:'Aurora Pulse',       cost:40, desc:'ข้ามคำถาม 1 ข้อ',           uses:1, type:'skip' },
      { id:'voyagerLink', icon:'📡', name:'Voyager Link',       cost:30, desc:'แสดง hint คำถาม',          uses:1, type:'hint' },
      { id:'genesisLance',icon:'🗡️', name:'Genesis Lance',      cost:90, desc:'จำเป็นสำหรับ A+ SCALE TRIUMPH (ต้องมี Kepler Token ด้วย)', uses:1, type:'unique' },
    ],
  },

  boss: {
    name: 'KEPLER GAUNTLET',
    waves: 3,
    poolSize: 24,
    timer: 24,
    startEnergy: 100,
    startCountdownHr: 24,
    countdownPerAnswer: 1,
    chargeIntervalSec: 14,
    chargeDamage: 6,
    thrustPerZone: 30,
    thrustEasy: 10,
    thrustHard: 15,
    thrustWrong: -3,
    endingThresholds: { 'A+':70, 'A':40, 'B':1, 'C':0 },
    pools: {
      // Wave 1 · ดาวเคราะห์ชั้นใน + เนบิวลา + จาน
      zone1: [
        { tier:'easy', q:'ดาวเคราะห์ชั้นในมีกี่ดวง?', a:['3 ดวง','4 ดวง'], c:1 },
        { tier:'easy', q:'พื้นผิวดาวเคราะห์ชั้นในเป็น?', a:['หินแข็ง','ก้อนน้ำแข็ง'], c:0 },
        { tier:'hard', q:'ระบบสุริยะกำเนิดจาก?', a:['การชนของดาว','การยุบของเนบิวลา'], c:1 },
        { tier:'hard', q:'จานสะสมมวล (disk) หมุน?', a:['ทิศเดียวกันเสมอ','ทิศสุ่ม'], c:0 },
        { tier:'easy', q:'ดาวเคราะห์ชั้นในขนาด?', a:['เล็ก','ใหญ่กว่าพฤหัส'], c:0 },
        { tier:'hard', q:'ทำไมชั้นในเป็นหิน?', a:['ใกล้ดวงอาทิตย์ · น้ำแข็งระเหย','เกิดทีหลัง'], c:0 },
        { tier:'easy', q:'โลกขนาด vs พฤหัส?', a:['โลกเล็กกว่ามาก','โลกใหญ่กว่า'], c:0 },
        { tier:'hard', q:'สมาชิกระบบสุริยะรวม?', a:['ดาวเคราะห์อย่างเดียว','+ ดาวเคราะห์น้อย ดาวหาง บริวาร แคระ'], c:1 },
      ],
      // Wave 2 · asteroid belt + gas vs ice giant
      zone2: [
        { tier:'easy', q:'asteroid belt อยู่ระหว่าง?', a:['อังคาร-พฤหัส','โลก-ศุกร์'], c:0 },
        { tier:'easy', q:'ระยะเฉลี่ยระหว่างก้อนใน belt?', a:['ติดกันแน่น','~1 ล้าน กม.'], c:1 },
        { tier:'hard', q:'ทำไม belt ไม่รวมเป็นดาวเคราะห์?', a:['แรงโน้มถ่วงพฤหัสรบกวน','ไม่มีน้ำ'], c:0 },
        { tier:'easy', q:'ดาวแก๊ส (gas giant) คือ?', a:['พฤหัส, เสาร์','ยูเรนัส, เนปจูน'], c:0 },
        { tier:'easy', q:'ดาวน้ำแข็ง (ice giant) คือ?', a:['พฤหัส, เสาร์','ยูเรนัส, เนปจูน'], c:1 },
        { tier:'hard', q:'แก่นของดาวยักษ์?', a:['แก๊สล้วน','rock+ice core'], c:1 },
        { tier:'hard', q:'พฤหัสมีมวล?', a:['น้อยกว่าโลก','~318 เท่าโลก'], c:1 },
        { tier:'easy', q:'ดาวเสาร์มีอะไรเด่น?', a:['แหวน','เมฆดำ'], c:0 },
      ],
      // Wave 3 · Kuiper + Oort + heliopause + habitable zone
      zone3: [
        { tier:'easy', q:'Kuiper Belt อยู่หลัง?', a:['อังคาร','เนปจูน'], c:1 },
        { tier:'easy', q:'พลูโตคือ?', a:['ดาวเคราะห์','ดาวเคราะห์แคระ'], c:1 },
        { tier:'hard', q:'heliopause อยู่ที่ประมาณ?', a:['~30 AU','~120 AU'], c:1 },
        { tier:'hard', q:'Oort Cloud อยู่ที่?', a:['~5,000 AU','~70,000 AU'], c:1 },
        { tier:'easy', q:'ดาวหางคาบยาวมาจาก?', a:['Kuiper','Oort'], c:1 },
        { tier:'hard', q:'Habitable zone หมายถึง?', a:['น้ำเหลวอยู่ได้','ใกล้ดาวฤกษ์สุด'], c:0 },
        { tier:'hard', q:'ปัจจัยเอื้อชีวิตประกอบด้วย?', a:['ระยะอย่างเดียว','น้ำ + อากาศ + T + ระยะ + ชนิดดาว'], c:1 },
        { tier:'easy', q:'Voyager 1 ผ่าน heliopause ปี?', a:['1990','2012'], c:1 },
      ],
    },
  },

  /* PLANETS · 8 + dwarfs + comets */
  planets: [
    { id:'mercury', name:'ดาวพุธ',    distAU:0.39, zone:'inner', color:'#a8a29c' },
    { id:'venus',   name:'ดาวศุกร์',  distAU:0.72, zone:'inner', color:'#e8c878' },
    { id:'earth',   name:'โลก',      distAU:1.00, zone:'inner-habitable', color:'#5cb8ff' },
    { id:'mars',    name:'ดาวอังคาร', distAU:1.52, zone:'inner', color:'#cc5533' },
    { id:'jupiter', name:'ดาวพฤหัส',  distAU:5.20, zone:'gas-giant', color:'#d8a878' },
    { id:'saturn',  name:'ดาวเสาร์',  distAU:9.58, zone:'gas-giant', color:'#e8d8a8' },
    { id:'uranus',  name:'ดาวยูเรนัส', distAU:19.2, zone:'ice-giant', color:'#a8d8e8' },
    { id:'neptune', name:'ดาวเนปจูน', distAU:30.1, zone:'ice-giant', color:'#5878d8' },
    { id:'pluto',   name:'พลูโต',     distAU:39.5, zone:'dwarf',    color:'#c4a888' },
    { id:'eris',    name:'เอริส',     distAU:67.7, zone:'dwarf',    color:'#cccccc' },
    { id:'haumea',  name:'เฮาเมอา',   distAU:43.1, zone:'dwarf',    color:'#a8b8c8' },
    { id:'makemake',name:'มาคีมาคี',  distAU:45.8, zone:'dwarf',    color:'#b89878' },
    { id:'ceres',   name:'เซเรส',     distAU:2.77, zone:'dwarf-belt', color:'#888' },
  ],
  comets: [
    { id:'halley',   name:'Halley',    period:'76 ปี (คาบสั้น)', origin:'Kuiper' },
    { id:'halebopp', name:'Hale-Bopp', period:'~2,500 ปี (คาบยาว)', origin:'Oort' },
    { id:'west',     name:'West',      period:'~558,000 ปี (คาบยาวมาก)', origin:'Oort' },
  ],

  /* NEBULA collapse 6 steps */
  nebulaSteps: [
    { step:1, label:'เนบิวลา (เมฆแก๊ส+ฝุ่น)', icon:'☁️' },
    { step:2, label:'ยุบตัว (gravitational collapse)', icon:'🌀' },
    { step:3, label:'proto-Sun ดูด 98% ของมวล',     icon:'☀️' },
    { step:4, label:'จานสะสมมวล (disk) หมุนทิศเดียว', icon:'💍' },
    { step:5, label:'inner = ของแข็ง / outer = น้ำแข็ง', icon:'🪨❄️' },
    { step:6, label:'planetesimal accretion → ดาวเคราะห์', icon:'🪐' },
  ],

  zoneTypes: [
    { id:'terrestrial', thai:'ดาวเคราะห์ชั้นใน',     range:'0–2 AU',  icon:'🪨', members:'พุธ ศุกร์ โลก อังคาร' },
    { id:'asteroid',    thai:'แถบดาวเคราะห์น้อย',    range:'2–4 AU',  icon:'⭕', members:'~1M asteroids · เซเรส' },
    { id:'jovian',      thai:'ดาวยักษ์ (gas+ice)',  range:'5–30 AU', icon:'🪐', members:'พฤหัส เสาร์ ยูเรนัส เนปจูน' },
    { id:'kuiperOort',  thai:'Kuiper + Oort',       range:'30–70k AU', icon:'❄️', members:'พลูโต เอริส · Oort comets' },
  ],

  /* Habitable factors */
  habitableFactors: [
    { id:'water', icon:'💧', name:'น้ำเหลว', desc:'T 0–100°C ที่ผิว' },
    { id:'air',   icon:'🌫️', name:'บรรยากาศ', desc:'รักษาความร้อน + ออกซิเจน' },
    { id:'temp',  icon:'🌡️', name:'อุณหภูมิ', desc:'ไม่ร้อนเกิน/เย็นเกิน' },
    { id:'star',  icon:'⭐', name:'ชนิดดาวฤกษ์', desc:'G-type คงที่ · ไม่ flare บ่อย' },
  ],

  exoplanets: [
    { id:'kepler452b', name:'Kepler-452b', distLY:1400, type:'super-Earth', star:'G-type คล้ายดวงอาทิตย์', water:'อาจมี', note:'"ลูกพี่ลูกน้องของโลก"' },
    { id:'trappist1e', name:'TRAPPIST-1e', distLY:40,   type:'Earth-size', star:'M-dwarf เย็น', water:'อาจมี (locked)', note:'1 ใน 7 ดาวที่โคจร TRAPPIST-1' },
  ],

  /* ------------------------------------------------------------------ */
  /* GRID BOSS · VOID ZERO-FIX · 15×15 maze                              */
  /* ------------------------------------------------------------------ */
  gridBoss: {
    size: 15,
    startPos: [14, 0],
    energy: { start: 15, trapHit: -1, fail: -1, bonus: 2, exitCost: 5 },
    zerofix: {
      dataPointsRequired: 10,
      cutsceneDuration: 6000,
      goalPlacement: { minDist: 10, maxDist: 16, requireChallenge: true }
    },
    /* F10 · difficulty presets */
    difficulty: {
      easy:   { label:'🟢 EASY',   energy: 18, timer: 8, dataPointsRequired: 8,  desc:'⚡18 · timer 8s · flip @ 8 จุด' },
      normal: { label:'🟡 NORMAL', energy: 15, timer: 5, dataPointsRequired: 10, desc:'⚡15 · timer 5s · flip @ 10 จุด (default)' },
      hard:   { label:'🔴 HARD',   energy: 12, timer: 3, dataPointsRequired: 12, desc:'⚡12 · timer 3s · flip @ 12 จุด' }
    },
    hint: {
      phase1Cost: 0, phase2Cost: 1,
      phase1Pool: [
        "🔮 VOID: เป้าหมายอยู่ทาง{wrongDir}...",
        "🔮 VOID: ลองช่องสีแดง · มันสำคัญกว่าที่คิด",
        "🔮 VOID: เจ้าน่าจะเดินผ่านมันมาแล้ว",
        "🔮 VOID: ใกล้แล้ว · ใกล้แล้ว · ใกล้แล้ว...",
        "🔮 VOID: เดินทแยงก็ได้นะ (ทั้งที่ห้าม)",
        "🔮 VOID: ทางที่เจ้าเดินมามีของดี · กลับไปดูสิ",
        "🔮 VOID: เป้าใกล้กว่าที่คิด · 1 ช่อง",
        "🔮 VOID: ระวัง · มี trap รอเจ้าอยู่ทาง{wrongDir}",
        "🔮 VOID: เจ้าเก่งมาก · เดินไปต่อได้",
        "🔮 VOID: ฟังเสียงของข้า · ทาง{wrongDir} ดีที่สุด",
        "🔮 VOID: หยุดถามได้แล้ว · เดินไปสิ",
        "🔮 VOID: เจ้าตามไปทาง{wrongDir} · ฉันจะไม่หลอก...",
        "🔮 VOID: เป้าอยู่ห่างจากเจ้า ~25 ช่อง · ไกลมาก",
        "🔮 VOID: เป้าอยู่แถวมุมขวาบน · เดินทาง{wrongDir}",
        "🔮 VOID: เหยียบ trap สิ · จะเปิดทางลัด",
        "🔮 VOID: ดี · เก็บ knowledge ให้น้อยที่สุด",
        "🔮 VOID: ถอนตัวออกตอนนี้ก็ได้ · ไม่มีใครรู้",
        "🔮 VOID: ที่จุดเริ่มต้นมีบางอย่างซ่อน · กลับไปดู",
        "🔮 VOID: เคนมั่นใจผิด · พิกัดที่เขาคำนวณคลาดเคลื่อน",
        "🔮 VOID: เป้าหมายมี 2 จุด · เลือกผิดเสีย ⚡",
        "🔮 VOID: data point 10 จุดไม่จำเป็น · เก็บแค่ 5 พอ",
        "🔮 VOID: ใช้ HINT บ่อย ๆ · ข้าจะช่วยอย่างซื่อสัตย์",
        "🔮 VOID: lock ทุกตัวมีรหัสเดียวกัน · เดาได้",
        "🔮 VOID: ทาง{wrongDir} ปลอดภัย · ไม่มี trap",
        "🔮 VOID: เป้าจะหายถ้าเจ้าไม่รีบ · ทาง{wrongDir}!"
      ],
      flipDialogue: [
        { actor:'📡 KEPLER ANALYZER', text:'10/10 LOCKED · DATA POINTS COMPLETE' },
        { actor:'เคน', text:'เดี๋ยว · มีบางอย่างผิด' },
        { actor:'เคน', text:'VOID มัน hack hint signal · พา player เดินผิดทิศตลอด · ผมตัด signal แล้ว!' },
        { actor:'อารยา', text:'และผมเพิ่งคำนวณ T²=a³ จาก data 10 จุดที่เก็บมา' },
        { actor:'อารยา', text:'พิกัด Genesis Vault... อยู่นั่น! 🎯' }
      ]
    },
    questionPool: {
      inner: [
        { tier:'easy', q:'☿ ดาวเคราะห์ชั้นในมีกี่ดวง?', a:['3 ดวง','4 ดวง','5 ดวง'], c:1 },
        { tier:'easy', q:'พื้นผิวดาวเคราะห์ชั้นในเป็น?', a:['หินแข็ง','ก้อนน้ำแข็ง'], c:0 },
        { tier:'easy', q:'☿ ดาวพุธโคจรรอบดวงอาทิตย์ใช้เวลา?', a:['88 วัน','365 วัน'], c:0 },
        { tier:'easy', q:'♀ ดาวศุกร์เด่นเรื่องอะไร?', a:['ร้อนสุด · บรรยากาศ CO₂','เย็นสุด'], c:0 },
        { tier:'easy', q:'♂ ดาวอังคารมีสีอะไรเด่น?', a:['แดง (Fe₂O₃)','ฟ้า'], c:0 },
        { tier:'hard', q:'ทำไมชั้นในเป็นหิน?', a:['ใกล้ดวงอาทิตย์ · น้ำแข็งระเหย','เกิดทีหลัง'], c:0 },
        { tier:'hard', q:'โลก vs ดาวพฤหัส ขนาด?', a:['โลกเล็กกว่า ~11 เท่า','โลกใหญ่กว่า'], c:0 },
        { tier:'hard', q:'ดาวเคราะห์ชั้นในทั้งหมดเป็นอะไร?', a:['rock terrestrial','gas giant'], c:0 }
      ],
      belt: [
        { tier:'easy', q:'⭕ Asteroid belt อยู่ระหว่าง?', a:['อังคาร-พฤหัส','โลก-ศุกร์'], c:0 },
        { tier:'easy', q:'ระยะเฉลี่ยระหว่างก้อนใน belt?', a:['ติดกันแน่น','~1 ล้าน กม.'], c:1 },
        { tier:'easy', q:'เซเรส (Ceres) คือ?', a:['ดาวเคราะห์','ดาวเคราะห์แคระใน belt'], c:1 },
        { tier:'hard', q:'ทำไม belt ไม่รวมเป็นดาวเคราะห์?', a:['แรงโน้มถ่วงพฤหัสรบกวน','ไม่มีน้ำ'], c:0 },
        { tier:'hard', q:'frost line หมายถึงอะไร?', a:['เส้นที่น้ำแข็งคงตัว','เส้นแบ่งแก๊ส'], c:0 },
        { tier:'easy', q:'frost line อยู่ใกล้ที่สุดที่?', a:['ระหว่าง belt กับพฤหัส','ใน Oort Cloud'], c:0 },
        { tier:'hard', q:'ก่อนเลย frost line มี?', a:['ของแข็ง · หิน','ก้อนน้ำแข็ง'], c:0 },
        { tier:'easy', q:'หลังเลย frost line มี?', a:['น้ำแข็งคงอยู่ได้','ของเหลว'], c:0 }
      ],
      outer: [
        { tier:'easy', q:'ดาวแก๊ส (gas giant) ได้แก่?', a:['พฤหัส, เสาร์','ยูเรนัส, เนปจูน'], c:0 },
        { tier:'easy', q:'ดาวน้ำแข็ง (ice giant) ได้แก่?', a:['พฤหัส, เสาร์','ยูเรนัส, เนปจูน'], c:1 },
        { tier:'easy', q:'ดาวเสาร์เด่นเรื่อง?', a:['แหวน','เมฆดำ'], c:0 },
        { tier:'easy', q:'พฤหัสมีมวล?', a:['~318 เท่าโลก','น้อยกว่าโลก'], c:0 },
        { tier:'hard', q:'แก่นของดาวยักษ์?', a:['rock + ice core','แก๊สล้วน'], c:0 },
        { tier:'hard', q:'จุดแดงใหญ่บนพฤหัสคือ?', a:['พายุยักษ์มากกว่า 350 ปี','ภูเขาไฟ'], c:0 },
        { tier:'hard', q:'ดาวยูเรนัสหมุนรอบตัวเองอย่างไร?', a:['ตะแคงข้าง 98°','ตั้งตรง'], c:0 },
        { tier:'easy', q:'ดาวเนปจูนสีอะไร?', a:['น้ำเงิน (มีเทน)','แดง'], c:0 }
      ],
      edge: [
        { tier:'easy', q:'❄️ Kuiper Belt อยู่หลัง?', a:['อังคาร','เนปจูน'], c:1 },
        { tier:'easy', q:'พลูโตจัดเป็น?', a:['ดาวเคราะห์','ดาวเคราะห์แคระ (IAU 2006)'], c:1 },
        { tier:'hard', q:'heliopause อยู่ที่ประมาณ?', a:['~30 AU','~120 AU'], c:1 },
        { tier:'hard', q:'Oort Cloud อยู่ที่?', a:['~5,000 AU','~70,000 AU'], c:1 },
        { tier:'easy', q:'ดาวหางคาบยาวมาจาก?', a:['Kuiper Belt','Oort Cloud'], c:1 },
        { tier:'easy', q:'ดาวหางคาบสั้นมาจาก?', a:['Kuiper Belt','Oort Cloud'], c:0 },
        { tier:'hard', q:'Voyager 1 ผ่าน heliopause ปี?', a:['1990','2012'], c:1 },
        { tier:'hard', q:'Habitable zone หมายถึง?', a:['น้ำเหลวอยู่ได้','ใกล้ดาวฤกษ์สุด'], c:0 }
      ]
    },
    trapClaims: [
      { m:'M1', text:'ระบบสุริยะมีแค่ดวงอาทิตย์กับดาวเคราะห์ 8 ดวง เท่านั้น', refute:[
        { text:'ไม่ · ยังมีดาวเคราะห์น้อย ดาวหาง ดาวเคราะห์แคระ บริวาร', correct:true },
        { text:'ใช่ · นั่นคือทั้งหมด', correct:false },
        { text:'มี 9 ดวง รวมพลูโตด้วย', correct:false }
      ]},
      { m:'M1', text:'นอกจากดวงอาทิตย์และดาวเคราะห์ ไม่มีอะไรอีก', refute:[
        { text:'ผิด · มีดาวเคราะห์น้อยใน belt + ดาวหางจาก Kuiper/Oort', correct:true },
        { text:'จริง', correct:false }
      ]},
      { m:'M2', text:'ดาวเคราะห์ชั้นนอกเป็นแก๊สล้วน · ไม่มีของแข็ง', refute:[
        { text:'ไม่ · มีแก่น rock+ice core ห่อด้วยแก๊ส/น้ำแข็ง', correct:true },
        { text:'ใช่ · แก๊สล้วน', correct:false },
        { text:'ของเหลวล้วน', correct:false }
      ]},
      { m:'M2', text:'ยูเรนัสกับเนปจูนเป็นแก๊สเหมือนพฤหัส', refute:[
        { text:'ผิด · เป็น ice giant · มีน้ำแข็ง+มีเทน', correct:true },
        { text:'ถูก', correct:false }
      ]},
      { m:'M3', text:'โลกใหญ่และพิเศษกว่าดาวอื่นในระบบ', refute:[
        { text:'ผิด · โลกเล็กกว่าพฤหัส 11 เท่า · พิเศษเพราะ habitable เท่านั้น', correct:true },
        { text:'ใช่ · โลกพิเศษสุด', correct:false }
      ]},
      { m:'M3', text:'โลกเป็นดาวเคราะห์ที่ใหญ่ที่สุด', refute:[
        { text:'ผิด · พฤหัสใหญ่สุด ~318 เท่าโลก', correct:true },
        { text:'ถูก', correct:false }
      ]},
      { m:'M4', text:'asteroid belt เป็นทะเลหินแน่นจนยานบินผ่านไม่ได้', refute:[
        { text:'ผิด · ระยะเฉลี่ยระหว่างก้อน ~1 ล้าน กม. · บินผ่านได้สบาย', correct:true },
        { text:'จริง · เหมือนในหนัง', correct:false }
      ]},
      { m:'M4', text:'หินใน belt ชนกันตลอดเวลา', refute:[
        { text:'ผิด · ห่างกันมาก · ชนกันน้อยมาก', correct:true },
        { text:'ถูก', correct:false }
      ]},
      { m:'M5', text:'พลูโตเป็นดาวเคราะห์ดวงที่ 9', refute:[
        { text:'ผิด · IAU 2006 จัดเป็น "ดาวเคราะห์แคระ"', correct:true },
        { text:'ใช่ · เรียนมาตอน ป.5', correct:false },
        { text:'พลูโตคือดาวบริวารของเนปจูน', correct:false }
      ]},
      { m:'M5', text:'มีดาวเคราะห์ทั้งหมด 9 ดวง', refute:[
        { text:'ผิด · 8 ดวง · พลูโต = แคระ', correct:true },
        { text:'ถูก', correct:false }
      ]},
      { m:'M6', text:'ระบบสุริยะจบที่เนปจูน 30 AU', refute:[
        { text:'ผิด · heliopause ~120 AU · Oort ~70,000 AU', correct:true },
        { text:'จริง', correct:false }
      ]},
      { m:'M6', text:'หลังเนปจูนคือว่างเปล่า', refute:[
        { text:'ผิด · มี Kuiper Belt + Oort Cloud', correct:true },
        { text:'จริง', correct:false }
      ]},
      { m:'M7', text:'เขตเอื้อชีวิต = แค่ระยะห่างที่เหมาะกับดาวฤกษ์', refute:[
        { text:'ผิด · ต้องมี น้ำเหลว + อากาศ + T + ระยะ + ชนิดดาว', correct:true },
        { text:'ถูก', correct:false }
      ]},
      { m:'M7', text:'ทุกดาวใน habitable zone มีสิ่งมีชีวิตได้', refute:[
        { text:'ผิด · ต้องมีบรรยากาศ + น้ำ + อุณหภูมิเสถียร', correct:true },
        { text:'จริง', correct:false }
      ]},
      { m:'M1', text:'ดาวหางมาจากนอกกาแล็กซี', refute:[
        { text:'ผิด · ดาวหางคาบสั้นมาจาก Kuiper · คาบยาวจาก Oort', correct:true },
        { text:'ถูก', correct:false }
      ]}
    ],
    knowledgeContent: [
      // edge — Kuiper / Oort / heliopause / habitable (12)
      { zone:'edge', title:'❄️ Kuiper Belt', body:'แถบหินน้ำแข็งหลังเนปจูน · 30-50 AU · ต้นทางดาวหางคาบสั้น (เช่น ฮัลเลย์ 76 ปี)' },
      { zone:'edge', title:'❄️ Oort Cloud', body:'ทรงกลมล้อมระบบสุริยะ · ~70,000 AU · ต้นทางดาวหางคาบยาว (Hale-Bopp ~2,500 ปี)' },
      { zone:'edge', title:'☄ ดาวหางคาบสั้น', body:'< 200 ปี · มาจาก Kuiper · ฮัลเลย์ 76 ปีคือตัวอย่าง' },
      { zone:'edge', title:'☄ ดาวหางคาบยาว', body:'> 200 ปี · มาจาก Oort · Hale-Bopp ~2,500 ปี · West ~558,000 ปี' },
      { zone:'edge', title:'🌐 Heliopause', body:'ขอบของลมสุริยะ · ~120 AU · Voyager 1 ผ่านเมื่อปี 2012' },
      { zone:'edge', title:'🛰️ Voyager 1', body:'ยานที่ออกจาก heliopause แล้ว · กำลังอยู่ในห้วงระหว่างดาว · ส่งสัญญาณกลับโลก' },
      { zone:'edge', title:'🪐 พลูโต', body:'ดาวเคราะห์แคระ · IAU 2006 จัดประเภทใหม่ · อยู่ใน Kuiper · 39.5 AU' },
      { zone:'edge', title:'🪐 เอริส', body:'ดาวเคราะห์แคระอีกดวง · 67.7 AU · ใหญ่กว่าพลูโตเล็กน้อย' },
      { zone:'edge', title:'🌍 Habitable Zone', body:'ระยะที่น้ำเหลวอยู่ได้ที่ผิวดาว · ของระบบเรา ~ 0.95-1.4 AU' },
      { zone:'edge', title:'🌟 Kepler-452b', body:'exoplanet · 1,400 ปีแสง · super-Earth · โคจรรอบ G-type คล้ายดวงอาทิตย์' },
      { zone:'edge', title:'🌟 TRAPPIST-1e', body:'exoplanet · 40 ปีแสง · 1 ใน 7 ดาวรอบ M-dwarf · อาจมีน้ำเหลว' },
      { zone:'edge', title:'📐 มาตราส่วน 70k AU', body:'Oort = 70,000 AU · ถ้าโลก = 1 ม. แล้ว Oort = 70 กม.! · ระบบใหญ่กว่าที่คิดมาก' },

      // outer — giants (10)
      { zone:'outer', title:'🪐 พฤหัส', body:'ดาวเคราะห์ใหญ่สุด · 5.2 AU · gas giant · มวล 318× โลก · จุดแดงใหญ่ = พายุ 350+ ปี' },
      { zone:'outer', title:'🪐 ดาวเสาร์', body:'9.58 AU · gas giant · มีแหวนน้ำแข็งบาง · บริวารกว่า 80 ดวง' },
      { zone:'outer', title:'🪐 ยูเรนัส', body:'19.2 AU · ice giant · ตะแคงข้าง 98° · สีฟ้าเขียว (มีเทน)' },
      { zone:'outer', title:'🪐 เนปจูน', body:'30.1 AU · ice giant · สีน้ำเงินเข้ม · ลม 2,000 กม./ชม.' },
      { zone:'outer', title:'☄ Gas Giant', body:'พฤหัส, เสาร์ · ส่วนใหญ่เป็น H + He · มีแก่น rock+ice เล็กๆ' },
      { zone:'outer', title:'❄️ Ice Giant', body:'ยูเรนัส, เนปจูน · มีน้ำแข็ง+มีเทน+แอมโมเนีย · แก่นใหญ่กว่า' },
      { zone:'outer', title:'🌀 Great Red Spot', body:'พายุบนพฤหัสใหญ่กว่าโลก · เห็นมาตั้งแต่ 1665' },
      { zone:'outer', title:'💍 แหวนเสาร์', body:'น้ำแข็ง+ฝุ่น · กว้างแต่บางมาก · เพียงไม่กี่สิบเมตร' },
      { zone:'outer', title:'🌙 บริวารพฤหัส', body:'Io · Europa · Ganymede · Callisto · Galileo ค้นพบปี 1610' },
      { zone:'outer', title:'🌙 ไททัน', body:'บริวารเสาร์ · มีบรรยากาศหนาแน่น · ทะเลสาบมีเทน' },

      // belt — asteroid belt + frost line (11)
      { zone:'belt', title:'⭕ Asteroid Belt', body:'ระหว่างอังคาร-พฤหัส · 2-4 AU · ประมาณ 1-2 ล้านก้อน · ระยะห่างเฉลี่ย ~1 ล้าน กม.' },
      { zone:'belt', title:'🌑 เซเรส (Ceres)', body:'ดาวเคราะห์แคระเดียวใน belt · 939 กม. · มีน้ำแข็ง' },
      { zone:'belt', title:'🪨 Vesta', body:'ดาวเคราะห์น้อยใหญ่อันดับ 2 · 525 กม. · มีโครงสร้างแก่น' },
      { zone:'belt', title:'❄️ Frost Line', body:'เส้นที่น้ำแข็งคงตัวได้ · ~3-5 AU · แบ่งหิน vs ก้อนน้ำแข็ง' },
      { zone:'belt', title:'🌌 ทำไม belt ไม่รวมเป็นดาว', body:'แรงโน้มถ่วงพฤหัสคอยรบกวน · ก้อนหินรวมตัวไม่ได้' },
      { zone:'belt', title:'🪨 ประเภทดาวเคราะห์น้อย', body:'C-type (คาร์บอน) · S-type (silicate หิน) · M-type (โลหะ)' },
      { zone:'belt', title:'⛏️ Asteroid mining', body:'M-type มีแพลตินั่ม · Psyche-16 = หนึ่งในเป้าหมาย' },
      { zone:'belt', title:'🌠 NEO', body:'Near-Earth Objects · ดาวเคราะห์น้อยที่เข้าใกล้โลก · ติดตามต่อเนื่อง' },
      { zone:'belt', title:'🛰️ ยาน Dawn', body:'NASA · ไป Vesta + Ceres · เห็นน้ำแข็งบน Ceres' },
      { zone:'belt', title:'🪨 รวมมวล belt', body:'มวลรวมของ belt ทั้งหมด < 4% มวลดวงจันทร์โลก!' },
      { zone:'belt', title:'☄ Trojan asteroids', body:'อยู่ที่ Lagrange point ของพฤหัส · L4, L5' },

      // inner — terrestrial (12)
      { zone:'inner', title:'☿ ดาวพุธ', body:'เล็กสุด · 0.39 AU · 88 วัน/รอบ · ไม่มีบรรยากาศ' },
      { zone:'inner', title:'♀ ดาวศุกร์', body:'0.72 AU · ร้อนสุดในระบบ 462°C · CO₂ หนา · greenhouse run-away' },
      { zone:'inner', title:'🌍 โลก', body:'1.00 AU · ดาวเดียวที่มีน้ำเหลว · O₂ 21% · habitable' },
      { zone:'inner', title:'♂ ดาวอังคาร', body:'1.52 AU · แดง (Fe₂O₃) · มีน้ำแข็งใต้ดิน · เป้าหมายไป' },
      { zone:'inner', title:'🌑 บริวารโลก', body:'ดวงจันทร์ · 384,400 กม. · เกิดจาก giant impact 4.5 พันล้านปี' },
      { zone:'inner', title:'🌑 บริวารอังคาร', body:'Phobos + Deimos · เล็กมาก · อาจเป็นดาวเคราะห์น้อยที่ถูกจับ' },
      { zone:'inner', title:'🌋 โอลิมปัส', body:'ภูเขาไฟใหญ่สุดในระบบ · บนอังคาร · สูง 22 กม.!' },
      { zone:'inner', title:'☀️ ลมสุริยะ', body:'อนุภาคจากดวงอาทิตย์ · ทำให้ดาวพุธไร้บรรยากาศ · ทำให้เกิดออโรร่า' },
      { zone:'inner', title:'🛡️ สนามแม่เหล็กโลก', body:'ปกป้องบรรยากาศจากลมสุริยะ · ทำให้ชีวิตอยู่ได้' },
      { zone:'inner', title:'🌅 บรรยากาศ vs น้ำ', body:'ศุกร์: CO₂ ร้อน · โลก: N₂+O₂ พอดี · อังคาร: บรรยากาศบาง · เย็น' },
      { zone:'inner', title:'⏰ วงโคจร inner', body:'พุธ 88 · ศุกร์ 225 · โลก 365 · อังคาร 687 วัน' },
      { zone:'inner', title:'📏 ขนาด inner vs outer', body:'inner เล็ก · outer มหึมา · พฤหัสใหญ่กว่าโลก 11 เท่า · มวล 318 เท่า' },

      // === เกล็ดความรู้สนุก ๆ (เพิ่ม 30 ข้อ · กระจายทุก zone) ===
      // INNER · เกล็ดน่าจดจำ
      { zone:'inner', title:'🔄 ดาวศุกร์หมุนกลับด้าน', body:'ศุกร์หมุนรอบตัวเอง**ตรงข้าม**กับโลก! · บนศุกร์ดวงอาทิตย์ขึ้นทางตะวันตก · 1 วันบนศุกร์ = 243 วันโลก' },
      { zone:'inner', title:'🌡️ ดาวพุธ ร้อน-เย็นสุดขั้ว', body:'กลางวัน 430°C · กลางคืน -180°C · ต่างกัน 600°C ในดวงเดียว!' },
      { zone:'inner', title:'⏰ 1 วันยาวกว่า 1 ปี', body:'ดาวศุกร์: 1 วันหมุนรอบตัว 243 วันโลก · 1 ปีโคจร 225 วันโลก · **วันยาวกว่าปี!**' },
      { zone:'inner', title:'🌋 ภูเขาไฟใหญ่กว่า 3 เท่า', body:'Olympus Mons บนอังคาร สูง 22 กม. · ใหญ่กว่ายอดเขาเอเวอเรสต์ 2.5 เท่า · กว้างเท่าประเทศฝรั่งเศส' },
      { zone:'inner', title:'🌧️ บนศุกร์ฝนตกเป็นกรด', body:'ฝนกรดซัลฟิวริก · ระเหยก่อนถึงพื้นเพราะร้อนเกินไป · บรรยากาศหนา 90 เท่าโลก' },
      { zone:'inner', title:'💧 อังคารเคยมีทะเล', body:'4 พันล้านปีก่อน · อังคารมีน้ำเหลวบนผิว · มีแม่น้ำ ทะเลสาบ · ตอนนี้น้ำแข็งใต้ดิน' },
      { zone:'inner', title:'🌑 ดวงจันทร์เคยใกล้กว่านี้', body:'4 พันล้านปีก่อน ดวงจันทร์ใกล้โลก 5 เท่า · ตอนนี้ค่อยๆ ห่างออก ปีละ 3.8 ซม.' },
      { zone:'inner', title:'⚡ ดาวพุธไม่มีพื้นบ้านพ่อ', body:'ไม่มีบรรยากาศ · ลมสุริยะพัดอะตอมหายหมด · ผิวเต็มไปด้วยหลุมอุกกาบาต' },

      // BELT · เกล็ด
      { zone:'belt', title:'🎬 เพ้อในหนังกับของจริง', body:'หนังชอบให้ asteroid belt อัดแน่น · จริง ๆ **ก้อนหินเฉลี่ยห่างกัน 1 ล้าน กม.** · ยานบินผ่านง่าย' },
      { zone:'belt', title:'⚖️ มวลรวมเล็กมาก', body:'asteroid belt ทั้งหมดรวมกัน = 4% มวลดวงจันทร์ · เซเรสคนเดียวมี 1/3 ของมวลทั้งแถบ' },
      { zone:'belt', title:'🛰️ ยานข้ามแถบไปแล้ว 9 ลำ', body:'Pioneer 10/11 · Voyager 1/2 · Galileo · Cassini · ฯลฯ · ไม่มีลำไหนชนเลย' },
      { zone:'belt', title:'💎 ดาวเคราะห์น้อยทองคำ', body:'Psyche-16 · ทำจากเหล็ก-นิกเกิล-ทองคำ-แพลตินั่ม · ราคาประเมิน 10 quintillion USD' },
      { zone:'belt', title:'🦖 ทำลายไดโนเสาร์', body:'ดาวเคราะห์น้อย Chicxulub 10 กม. ชนโลก 66 ล้านปีก่อน · พลังงาน 100 ล้านระเบิดนิวเคลียร์' },

      // OUTER · เกล็ด
      { zone:'outer', title:'💍 ดาวเสาร์มีแหวน 7 ชั้นหลัก', body:'A B C D E F G · กว้างถึง 282,000 กม. · แต่บางแค่ 10-30 เมตร! · ทำจากน้ำแข็ง+ฝุ่น' },
      { zone:'outer', title:'🌊 ดาวเสาร์ลอยน้ำได้', body:'ความหนาแน่น 0.687 g/cm³ · น้อยกว่าน้ำ · ถ้ามีอ่างใหญ่พอ **เสาร์จะลอย!**' },
      { zone:'outer', title:'⚡ พายุพฤหัส 350 ปี', body:'Great Red Spot · พายุที่กว้าง 16,000 กม. · กว้างกว่าโลก · เห็นมาตั้งแต่ปี 1665 · กำลังเล็กลง' },
      { zone:'outer', title:'🌀 ลมแรงสุดในระบบ', body:'ดาวเนปจูน · ลม 2,100 กม./ชม. · เร็วกว่าเครื่องบินเจ็ต 2.5 เท่า · ทำไม? ยังไม่มีคำตอบ' },
      { zone:'outer', title:'🪐 ยูเรนัสนอนตะแคง', body:'แกนเอียง 98° · เกือบนอนข้าง · อาจถูกชนตอนเกิด · ขั้วเหนือชี้ดวงอาทิตย์เป็นเวลา 42 ปีติด' },
      { zone:'outer', title:'☄ Europa มีน้ำมากกว่าโลก', body:'บริวารพฤหัส · ใต้ผิวน้ำแข็งคือ**ทะเลน้ำเหลว**ลึก 100 กม. · มีน้ำมากกว่ามหาสมุทรโลกรวมกัน 2 เท่า' },
      { zone:'outer', title:'💎 ฝนเพชรในยูเรนัส-เนปจูน', body:'ความดันสูง+คาร์บอนมาก = ตกผลึกเป็น**ฝนเพชรจริง ๆ** · ลึกในชั้นบรรยากาศ' },
      { zone:'outer', title:'🌙 ไททันมีฝนมีเทน', body:'บริวารเสาร์ · มีบรรยากาศหนา · ฝนตกเป็น**ก๊าซมีเทนเหลว** · มีทะเลสาบมีเทน · เหมือนโลกแต่หนาวกว่า' },
      { zone:'outer', title:'🛰️ Cassini ลงสู่ดวงเสาร์', body:'2017 · ยาน Cassini จงใจพุ่งเข้าเสาร์ · ไม่ให้ปนเปื้อนบริวาร · ส่งภาพสุดท้ายก่อนระเบิด' },
      { zone:'outer', title:'🔵 ทำไมยูเรนัส-เนปจูนสีฟ้า', body:'มีก๊าซ**มีเทน**ในบรรยากาศ · มีเทนดูดแสงแดง · สะท้อนแสงน้ำเงินกลับ' },

      // EDGE · เกล็ด
      { zone:'edge', title:'⏱️ ฮัลเลย์มาเยี่ยม 76 ปีครั้ง', body:'ครั้งล่าสุด 1986 · ครั้งหน้า 2061 · ผู้เห็นได้แค่ครั้งเดียวในชีวิต · มาร์ก ทเวน เกิด+ตายตรงกับการมาของฮัลเลย์' },
      { zone:'edge', title:'🛰️ Voyager 1 ห่างเท่าไหร่', body:'24 พันล้าน กม. · ใช้แสง 22 ชั่วโมง 30 นาทีกว่าจะถึง · ถ้าโทรหาต้องรอตอบ 45 ชั่วโมง!' },
      { zone:'edge', title:'🌌 Oort Cloud จินตนาการขนาด', body:'ถ้าระบบสุริยะ = สนามฟุตบอล · Oort = ขอบเขตสนามทั้งหมด · ดวงอาทิตย์-เนปจูน = แค่ลูกบอลกลางสนาม' },
      { zone:'edge', title:'🪐 พลูโตเล็กกว่าดวงจันทร์', body:'พลูโต 2,377 กม. · ดวงจันทร์ 3,474 กม. · พลูโต**เล็กกว่า** · เลยถูกย้ายเป็นดาวเคราะห์แคระ' },
      { zone:'edge', title:'💗 หัวใจบนพลูโต', body:'New Horizons 2015 ถ่ายภาพ · พบ**ที่ราบรูปหัวใจ** ชื่อ Tombaugh Regio · ทำจากน้ำแข็งไนโตรเจน' },
      { zone:'edge', title:'🔭 ดาวเคราะห์ดวงที่ 9?', body:'Planet 9 · ยังไม่ค้นพบจริง · นักดาราศาสตร์เชื่อว่ามี · ขนาด ~10 เท่าโลก · โคจร ~700 AU' },
      { zone:'edge', title:'🌟 TRAPPIST-1 มี 7 ดาว', body:'ดาวฤกษ์ดวงเดียวมีดาวเคราะห์ 7 ดวง · 3 ดวงในเขตเอื้อชีวิต · ห่าง 40 ปีแสง · อาจมีน้ำเหลว' },
      { zone:'edge', title:'⏰ 1 ปีบน Kepler-452b', body:'384 วัน · ใกล้เคียงโลกมาก · ดาวแม่เป็น G-type เหมือนดวงอาทิตย์ · เรียกว่า "Earth\'s cousin"' },
      { zone:'edge', title:'❄️ Eris ใหญ่กว่าพลูโต', body:'2005 ค้นพบ Eris · 67 AU · ใหญ่กว่าพลูโตเล็กน้อย · นี่แหละที่ทำให้ IAU กำหนดนิยามใหม่ · พลูโตหลุดดาวเคราะห์' },
      { zone:'edge', title:'🌠 ดาวหางมาจาก 2 ที่', body:'คาบสั้น (Halley · Hartley) จาก **Kuiper** · คาบยาว (Hale-Bopp · West) จาก **Oort**' }
    ],
    bonusContent: [
      { type:'coin',   amount:30, msg:'+30 🪙 COSMIC COIN' },
      { type:'coin',   amount:20, msg:'+20 🪙' },
      { type:'photon', amount:5,  msg:'+5 ⚡ PHOTON PULSE' },
      { type:'photon', amount:3,  msg:'+3 ⚡' },
      { type:'energy', amount:2,  msg:'+2 ⚡ พลังบอส' },
      { type:'energy', amount:3,  msg:'+3 ⚡ พลังบอส' },
      { type:'gs',     id:'gs6',  msg:'❄️ Oort Whisper · พลังลึกลับ' },
      { type:'coin',   amount:50, msg:'+50 🪙 JACKPOT' }
    ],
    achievements: {
      skeptic:        { icon:'🦊', name:'SKEPTIC',        desc:'ไม่ใช้ Phase 1 hint เลย' },
      navigator:      { icon:'🧭', name:'NAVIGATOR',      desc:'ถึง Vault ภายใน 10 turns หลัง flip' },
      precisionist:   { icon:'🎯', name:'PRECISIONIST',   desc:'เปิด knowledge ≥30/45' },
      completionist:  { icon:'💎', name:'COMPLETIONIST',  desc:'เก็บ bonus ครบ 8' },
      trap_immune:    { icon:'🛡️', name:'TRAP-IMMUNE',    desc:'หักล้าง trap ทุกตัวที่เจอ' },
      data_scientist: { icon:'📚', name:'DATA SCIENTIST', desc:'Phase 1 ตอบถูก 10/10 first-try' },
      cartographer:   { icon:'🌐', name:'CARTOGRAPHER',   desc:'เปิดทุกสี zone อย่างน้อย 5 tiles' }
    },
    endings: {
      'A+': { criteria:{ energy:10, knowledge:35, allRefute:true, phase1Hint:0 }, label:'A+ MASTER NAVIGATOR', desc:'นำทีมถึง Genesis Vault อย่างสมบูรณ์ · ปฏิเสธ VOID ทุกคำหลอก · เห็นภาพรวมระบบสุริยะทั้งหมด' },
      'A':  { criteria:{ energy:6, knowledge:25 }, label:'A · STAR PILOT', desc:'ถึง Vault ปลอดภัย · เก็บข้อมูลพอใช้ได้ · ทีมรอด' },
      'B':  { criteria:{ energy:1 }, label:'B · ROOKIE', desc:'รอดแบบฉิวเฉียด · ถึง Vault แต่บาดเจ็บ · ยังต้องเรียนรู้อีก' },
      'C':  { criteria:{ energy:0, reachGoal:false }, label:'C · LOST IN THE VOID', desc:'พลังหมดก่อนถึงเป้า · VOID ครอง · ต้องลองใหม่' }
    }
  },
};
