/* ===== COSMOS LOG · EP05 Config · v4 RACE TO THE SUN ===== */
/* หัวใจที่เต้นผิดจังหวะ · ตามล่า HELION CORES ก่อน VOID                      */
/* ตัวชี้วัด ว 7.1 ม.4-6/1                                                    */
/* 4-องก์ · 28 หน้า · 3-phase template (เกริ่นนำ → กิจกรรม → quiz ย่อย)        */

window.EP_CONFIG = {
  id: 'ep05',
  version: 'v4',
  title: 'หัวใจที่เต้นผิดจังหวะ',
  subtitle: 'RACE TO THE SUN · ตามล่า HELION CORES ก่อน VOID',
  badge: { icon: '☀️', name: 'Heliophysicist' },
  duration: 100,
  indicator: 'ว 7.1 ม.4-6/1',
  rank: { from: 'NAVIGATOR', to: 'CAPTAIN' },

  /* ------------------------------------------------------------------ */
  /* PAGES · 28 หน้า                                                     */
  /* ------------------------------------------------------------------ */
  pages: [
    // ACT A · DISCOVERY + WARP (5)
    { id:'p00', file:'p00-cover.html',          title:'EP05 Cover · VOID Returns',     type:'story',      time:2 },
    { id:'p01', file:'p01-pretest.html',        title:'Pre-test · 8 ข้อ M1-M7',        type:'reflection', time:6 },
    { id:'p02', file:'p02-intro-quest.html',    title:'พ่อเปิดภารกิจ · HELION CORES',   type:'story',      time:3 },
    { id:'p03', file:'p03-origin-zones.html',   title:'WARP · กำเนิดระบบสุริยะ + เขต',  type:'puzzle',     time:5 },
    { id:'p04', file:'p04-dive-plan.html',      title:'ถึงดวงอาทิตย์ · เลือก role',     type:'setup',      time:3 },
    // ACT B · INTERIOR DIVE · HELION 1-3 · ทุก scene split 3 หน้า (Engage / Explore / Mastery Gate)
    { id:'p05a', file:'p05a-core-engage.html',       title:'🔥 CORE · A · ENGAGE + Predict',         type:'story',      time:4 },
    { id:'p05b', file:'p05b-core-explore.html',      title:'🔥 CORE · B · EXPLORE chamber',          type:'puzzle',     time:6 },
    { id:'p05c', file:'p05c-core-gate.html',         title:'🔥 CORE · C · GATE Reactor Equation',    type:'mixed',      time:6 },
    { id:'p06-bridge', file:'p06-bridge.html',       title:'🛰️ BRIDGE 1 · CORE → RADIATIVE',         type:'story',      time:2 },
    { id:'p06a', file:'p06a-radiative-engage.html',  title:'🌫️ RADIATIVE · A · ENGAGE',              type:'story',      time:4 },
    { id:'p06b', file:'p06b-radiative-explore.html', title:'🌫️ RADIATIVE · B · EXPLORE gradient',    type:'puzzle',     time:6 },
    { id:'p06c', file:'p06c-radiative-gate.html',    title:'🌫️ RADIATIVE · C · GATE Photon Cipher',  type:'mixed',      time:6 },
    { id:'p07-bridge', file:'p07-bridge.html',       title:'🛰️ BRIDGE 2 · RADIATIVE → CONVECTIVE',   type:'story',      time:2 },
    { id:'p07a', file:'p07a-convective-engage.html', title:'🌊 CONVECTIVE · A · ENGAGE',             type:'story',      time:4 },
    { id:'p07b', file:'p07b-convective-explore.html',title:'🌊 CONVECTIVE · B · EXPLORE climb',      type:'puzzle',     time:6 },
    { id:'p07c', file:'p07c-convective-gate.html',   title:'🌊 CONVECTIVE · C · GATE Cycle Builder', type:'mixed',      time:6 },
    { id:'p08-bridge', file:'p08-bridge.html',       title:'🛰️ BRIDGE 3 · CONVECTIVE → PHOTOSPHERE · ACT C', type:'story', time:2 },
    // ACT C · ATMOSPHERE BREAK · HELION 4-6
    { id:'p08a', file:'p08a-sunspot-engage.html',    title:'⚫ SUNSPOT · A · ENGAGE',                type:'story',      time:4 },
    { id:'p08b', file:'p08b-sunspot-explore.html',   title:'⚫ SUNSPOT · B · EXPLORE field',         type:'puzzle',     time:6 },
    { id:'p08c', file:'p08c-sunspot-gate.html',      title:'⚫ SUNSPOT · C · GATE Forensics',        type:'mixed',      time:6 },
    { id:'p09-bridge', file:'p09-bridge.html',       title:'🛰️ BRIDGE 4 · PHOTOSPHERE → CHROMOSPHERE', type:'story',    time:2 },
    { id:'p09a', file:'p09a-flare-engage.html',      title:'🔴 CHROMO · A · ENGAGE Flare',           type:'story',      time:4 },
    { id:'p09b', file:'p09b-flare-explore.html',     title:'🔴 CHROMO · B · EXPLORE dodge',          type:'puzzle',     time:6 },
    { id:'p09c', file:'p09c-flare-gate.html',        title:'🔴 CHROMO · C · GATE Chronometer',       type:'mixed',      time:6 },
    { id:'p10-bridge', file:'p10-bridge.html',       title:'🛰️ BRIDGE 5 · CHROMO → CORONA · FINAL DIVE', type:'story',  time:2 },
    { id:'p10a', file:'p10a-corona-engage.html',     title:'🌌 CORONA · A · ENGAGE Paradox',         type:'story',      time:4 },
    { id:'p10b', file:'p10b-corona-explore.html',    title:'🌌 CORONA · B · EXPLORE + Token',        type:'puzzle',     time:6 },
    { id:'p10c', file:'p10c-corona-gate.html',       title:'🌌 CORONA · C · GATE HELION KEY',        type:'mixed',      time:6 },
    // ACT D · BATTLE PHASE (17)
    { id:'p11', file:'p11-magnetic-bridge.html',title:'VOID ARRIVED · สนามแม่เหล็ก',    type:'story',      time:2 },
    { id:'p12', file:'p12-sunspot-cycle.html',  title:'250 จุด · เกิน peak',            type:'story',      time:2 },
    { id:'p13', file:'p13-activity-slider.html',title:'5 tier · ทะลุ Solar Max',        type:'puzzle',     time:3 },
    { id:'p14', file:'p14-phenomena-tabs.html', title:'🎁 5 ปรากฏการณ์ · recover',      type:'puzzle',     time:6 },
    { id:'p15', file:'p15-event-order.html',    title:'🎁 ลำดับเหตุการณ์',               type:'puzzle',     time:4 },
    { id:'p16', file:'p16-flare-vs-cme.html',   title:'แยก Flare vs CME · M4',          type:'puzzle',     time:4 },
    { id:'p17', file:'p17-earth-impact.html',   title:'อิทธิพลต่อโลก · 4 ระดับ',         type:'puzzle',     time:3 },
    { id:'p18', file:'p18-fatherlog.html',      title:'📓 บันทึกพ่อ · L1 reveal',        type:'story',      time:4 },
    { id:'p19', file:'p19-habitable-zone.html', title:'🎁 Habitable Zone · 8 ดาวเคราะห์', type:'puzzle',   time:5 },
    { id:'p20', file:'p20-voidface.html',       title:'⚠ VOID FACE · taunt Cores',      type:'story',      time:3 },
    { id:'p21', file:'p21-deflect-path.html',   title:'🎁 เลือก deflector · simulate 4', type:'puzzle',    time:5 },
    { id:'p22', file:'p22-posttest.html',       title:'Post-test + gain',                type:'reflection', time:5 },
    { id:'p23', file:'p23-sequencer.html',      title:'Story Sequencer',                 type:'puzzle',     time:3 },
    { id:'p24',  file:'p24-shop.html',          title:'🔧 Power Forge · ปลดล็อกพลัง',    type:'puzzle',     time:5 },
    { id:'p24b', file:'p24-shopb.html',         title:'🛒 Voyager Cache · ร้านค้า',       type:'setup',      time:3 },
    { id:'p25',  file:'p25-boss.html',          title:'🔥 SOLAR STORM (Boss)',           type:'mixed',      time:7 },
    { id:'p26', file:'p26-rescue.html',         title:'🌌 4 endings',                    type:'story',      time:3 },
    { id:'p27', file:'p27-journal.html',        title:'🏆 Badge + 3-2-1',                type:'reflection', time:4 },
  ],

  /* ------------------------------------------------------------------ */
  /* HELION CORES · 6 ชิ้น (Quest progress)                              */
  /* ------------------------------------------------------------------ */
  helions: [
    { id:'h1', icon:'🔥', name:'Fusion Core Particle',  layer:'Core',         scene:'p05', kills:['M1'] },
    { id:'h2', icon:'🌫️', name:'Photon Walk Particle',  layer:'Radiative',    scene:'p06', kills:[] },
    { id:'h3', icon:'🌊', name:'Convection Bubble',     layer:'Convective',   scene:'p07', kills:[] },
    { id:'h4', icon:'🧲', name:'Magnetic Knot',         layer:'Photosphere',  scene:'p08', kills:['M3'] },
    { id:'h5', icon:'⚡', name:'Chromo Flare Echo',     layer:'Chromosphere', scene:'p09', kills:['M4'] },
    { id:'h6', icon:'🌌', name:'Coronal Resonance',     layer:'Corona',       scene:'p10', kills:['M2'] },
  ],
  voidEtaStartHr: 18,        // VOID ETA at start of dive
  voidEtaPerScene: 0.5,      // ETA decreases each scene completed (≈ pressure)

  /* ------------------------------------------------------------------ */
  /* OBJECTIVES · K · P · A                                              */
  /* ------------------------------------------------------------------ */
  objectives: {
    K1: { label:'กระบวนการเกิดระบบสุริยะ + 4 กลุ่มดาวเคราะห์', pages:['p01','p03','p22'], threshold:0.85 },
    K2: { label:'โครงสร้าง 6 ชั้นดวงอาทิตย์ + ฟิสิกส์ของแต่ละชั้น', pages:['p05','p06','p07','p08','p09','p10'], threshold:0.85 },
    K3: { label:'แยก flare/CME/wind + อิทธิพลต่อโลก',  pages:['p14','p16','p17','p22'], threshold:0.80 },
    K4: { label:'Habitable zone · ปัจจัยเอื้อสิ่งมีชีวิต',  pages:['p19','p22'], threshold:0.80 },
    K5: { label:'corona ร้อนกว่า photosphere (M2)',     pages:['p10','p22'], threshold:0.67 },
    P1: { label:'อ่านข้อมูล/ภาพถ่ายดวงอาทิตย์',          pages:['p12','p13','p14'] },
    P2: { label:'คาดเส้นทาง CME · ตัดสินใจจุดเบี่ยง',     pages:['p19','p21','p25'] },
    P3: { label:'จัดลำดับเหตุการณ์สุริยะ',                pages:['p15','p23'] },
    A1: { label:'ตั้งคำถามต่อสามัญสำนึก',                 pages:['p05','p10','p16'] },
    A2: { label:'ทำงานร่วมกันภายใต้ deadline',            pages:['p21','p25'] },
    A3: { label:'ตระหนักผลกระทบสุริยะต่อสังคม',           pages:['p17','p26','p27'] },
  },

  /* ------------------------------------------------------------------ */
  /* MISCONCEPTIONS · M1-M7                                              */
  /* ------------------------------------------------------------------ */
  misconceptions: {
    M1: { label:'ดวงอาทิตย์ "เผาไหม้" แบบไฟ',         truth:'นิวเคลียร์ฟิวชัน p-p chain · ไม่ใช่การเผาไหม้' },
    M2: { label:'corona เย็นกว่า photosphere',         truth:'corona ~1-2 ล้าน K · ร้อนกว่า photosphere (5,780 K)' },
    M3: { label:'sunspot คือรู/หลุมในดวงอาทิตย์',       truth:'บริเวณที่ T ต่ำเพราะสนามแม่เหล็กแรงปิดกั้นการพา' },
    M4: { label:'solar flare = CME',                   truth:'flare = แสง 8 นาที · CME = พลาสมา 1-3 วัน' },
    M5: { label:'aurora ต้อง CME ใหญ่เท่านั้น',         truth:'solar wind ปกติก็ทำให้เกิด aurora ได้' },
    M6: { label:'ดาวเคราะห์เกิดทีละดวง',                truth:'nebular collapse + accretion พร้อมกันใน disk' },
    M7: { label:'habitable zone = ใกล้ดาวฤกษ์ที่สุด',    truth:'ระยะที่น้ำเหลวอยู่ได้ · ขึ้นกับชนิดดาวฤกษ์' },
  },

  /* ------------------------------------------------------------------ */
  /* ROLES                                                               */
  /* ------------------------------------------------------------------ */
  roles: [
    { id:'nav',  icon:'🧭', name:'Navigator',   desc:'นำยาน · พล็อต path ใน core/radiative' },
    { id:'helio',icon:'🌞', name:'Heliophysicist', desc:'อ่านชั้น · ระบุปรากฏการณ์ · เก็บ HELION' },
    { id:'med',  icon:'💊', name:'Medic',       desc:'ประเมินรังสี · aurora · ผลต่อร่างกาย' },
    { id:'mech', icon:'🔧', name:'Engineer',    desc:'ใช้ deflector · คำนวณ Lagrange' },
  ],
  roleFlex: { 2:{nav:['nav','mech'],helio:['helio','med']}, 3:{nav:['nav'],helio:['helio','med'],mech:['mech']}, 4:null },

  /* ------------------------------------------------------------------ */
  /* COIN · เก็บจาก quiz ย่อยถูกครั้งแรก + perfect activity              */
  /* ------------------------------------------------------------------ */
  coin: {
    start: 0,
    perfectBonus: {
      p01: 10, p03: 20,
      // ACT B/C · gates (3-page split → coin ที่ปลายของ scene)
      p05c: 25, p06c: 25, p07c: 25, p08c: 25, p09c: 25, p10c: 30,
      // ACT D · battle phase (เฉพาะหน้าที่มี isPerfect callable)
      // p11/p18/p20 = story · ไม่ award coin (ลบเดิมที่ใส่ไว้แต่ไม่ได้ trigger)
      p12: 20, p13: 20, p14: 25, p15: 25, p16: 25, p17: 25,
      p19: 30, p21: 30, p22: 20, p23: 15,
      p24: 50,    // POWER FORGE · เปิดกล่องสำเร็จ
      p25: 80,    // BOSS · A+ ending (A=40, B=15 ที่ p25 logic จัดการเอง)
    },
  },

  photon: {
    start: 30,
    targets: {
      shield:  { cost:60, icon:'🛡️', name:'Plasma Shield', desc:'บล็อก CME pulse 1 ครั้งใน boss' },
      hint:    { cost:20, icon:'💡', name:'LEMAITRE Hint', desc:'แสดง hint คำถาม 1 ครั้ง' },
      thrust:  { cost:40, icon:'🚀', name:'Magnetic Booster', desc:'+5 thrust ก่อน boss' },
    },
    // photon awarded explicitly via Photon.add() ในหน้า: p03(+10), p05c(+20), p06c(+20), p07c(+25), p08c(+25), p09c(+30), p10c(+40)
  },

  shop: {
    items: [
      { id:'sunDecoder',  icon:'🔆+', name:'Solar Decoder MK-V',  cost:60, desc:'+5 Thrust ต่อข้อถูก Zone 1', uses:Infinity, type:'passive', cat:'zone1' },
      { id:'fluxSensor',  icon:'🧲',  name:'Flux Sensor',          cost:70, desc:'บล็อกตอบผิด 1 ครั้ง Zone 2',  uses:1, type:'defense' },
      { id:'auroraToken', icon:'🌌',  name:'Aurora Resonance',     cost:90, desc:'จำเป็นสำหรับ A+ AURORA TRIUMPH (ต้องมี Coronal Token ด้วย)', uses:1, type:'unique' },
      { id:'plasmaPulse', icon:'⚡×2', name:'Plasma Pulse',        cost:50, desc:'next answer +5 thrust', uses:2, type:'boost' },
      { id:'cloakSkip',   icon:'🌑',  name:'Cloak Skip',           cost:40, desc:'ข้ามคำถาม 1 ข้อ', uses:1, type:'skip' },
      { id:'whisper',     icon:'💡',  name:'LEMAITRE Whisper',     cost:30, desc:'แสดง hint คำถาม', uses:1, type:'hint' },
    ],
  },

  boss: {
    name: 'SOLAR STORM',
    startEnergy: 100,
    startCountdownHr: 30,         // ↑ 18→30 ให้เวลาไปถึง zone 3
    countdownPerAnswer: 1,
    chargeIntervalSec: 14,        // ↑ 10→14 CME pulse ช้าลง
    chargeDamage: 6,              // ↓ 8→6 damage ต่อ pulse น้อยลง
    thrustPerZone: 30,
    thrustEasy: 10,               // ↑ 5→10 ตอบถูก easy เพิ่ม thrust เร็วขึ้น
    thrustHard: 15,               // ↑ 8→15 ตอบถูก hard
    thrustWrong: -3,
    endingThresholds: { 'A+':70, 'A':40, 'B':1, 'C':0 },
    pools: {
      zone1: [
        { tier:'easy', q:'ดวงอาทิตย์ผลิตพลังงานด้วย?', a:['การเผาไหม้แก๊ส','นิวเคลียร์ฟิวชัน'], c:1 },
        { tier:'easy', q:'ฟิวชันเกิดที่ชั้นใด?', a:['Core (แกน)','Corona'], c:0 },
        { tier:'hard', q:'ชั้น corona มีอุณหภูมิประมาณ?', a:['~5,780 K','~1-2 ล้าน K'], c:1 },
        { tier:'hard', q:'photosphere = ผิวที่เห็น · จริงหรือเท็จ?', a:['จริง','เท็จ'], c:0 },
        { tier:'easy', q:'ระบบสุริยะเกิดจาก?', a:['การยุบของเนบิวลา','การชนของกาแล็กซี'], c:0 },
        { tier:'hard', q:'เขตที่ไกลสุดของระบบสุริยะ?', a:['Asteroid Belt','Oort Cloud'], c:1 },
        { tier:'easy', q:'ดาวเคราะห์ชั้นในคือ?', a:['Mercury, Venus, Earth, Mars','Jupiter, Saturn, Uranus, Neptune'], c:0 },
        { tier:'hard', q:'ดวงอาทิตย์มีมวล % ของระบบสุริยะ?', a:['~50%','~99.8%'], c:1 },
      ],
      zone2: [
        { tier:'easy', q:'sunspot คือ?', a:['รูในดวงอาทิตย์','บริเวณที่ T ต่ำเพราะแม่เหล็กแรง'], c:1 },
        { tier:'easy', q:'solar flare ถึงโลกใช้เวลา?', a:['~8 นาที','~3 วัน'], c:0 },
        { tier:'hard', q:'CME (พลาสมา) ถึงโลก?', a:['8 นาที','1-3 วัน'], c:1 },
        { tier:'easy', q:'flare = CME · จริง/เท็จ?', a:['จริง','เท็จ'], c:1 },
        { tier:'hard', q:'aurora เกิดได้แม้ไม่มี CME · จริง/เท็จ?', a:['จริง','เท็จ'], c:0 },
        { tier:'hard', q:'วัฏจักร sunspot ยาว?', a:['11 ปี','100 ปี'], c:0 },
        { tier:'easy', q:'solar wind คือ?', a:['ลมร้อน corona','กระแสอนุภาคไหลออกตลอดเวลา'], c:1 },
        { tier:'hard', q:'CME รุนแรงทำให้?', a:['ฝนหนัก','grid blackout + ดาวเทียมเสีย'], c:1 },
      ],
      zone3: [
        { tier:'easy', q:'L1 Lagrange อยู่ระหว่าง?', a:['ดวงอาทิตย์-โลก','โลก-ดวงจันทร์'], c:0 },
        { tier:'hard', q:'ทำไม L1 เหมาะตั้งดาวเทียมเตือน CME?', a:['ใกล้โลก','อยู่ระหว่างดวงอาทิตย์-โลก · เห็นก่อน 1 ชม.'], c:1 },
        { tier:'easy', q:'Habitable zone คือ?', a:['ระยะที่น้ำเป็นของเหลวได้','ระยะใกล้ดาวฤกษ์สุด'], c:0 },
        { tier:'hard', q:'โลก habitable · ดาวศุกร์อยู่?', a:['ร้อนเกิน','เย็นเกิน'], c:0 },
        { tier:'hard', q:'สนามแม่เหล็กโลกป้องกัน?', a:['อนุภาคจากดวงอาทิตย์','รังสี UV'], c:0 },
        { tier:'easy', q:'ปัจจัยใดสำคัญต่อสิ่งมีชีวิต?', a:['น้ำเหลว+บรรยากาศ+พลังงานคงที่','ดาวฤกษ์ใหญ่สุด'], c:0 },
        { tier:'hard', q:'ถ้าโลกไม่มีสนามแม่เหล็ก?', a:['สูญเสียบรรยากาศ + รังสีถึงผิว','อุณหภูมิเพิ่มทันที'], c:0 },
        { tier:'easy', q:'VOID ฝึกซ้อมเพื่อ?', a:['กาแล็กซี','ดาวพฤหัส'], c:0 },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* SUN LAYERS · 6 ชั้น (data only · scene ใช้ inline)                  */
  /* ------------------------------------------------------------------ */
  sunLayers: [
    { id:'core',   thai:'แกน',         name:'Core',          tempK:'15,000,000', color:'#fff8c8' },
    { id:'rad',    thai:'ชั้นแผ่รังสี',  name:'Radiative',     tempK:'2-7M',       color:'#ffd96b' },
    { id:'conv',   thai:'ชั้นพาความร้อน',name:'Convective',    tempK:'~5,800-2M',  color:'#ffaa55' },
    { id:'photo',  thai:'โฟโตสเฟียร์',  name:'Photosphere',   tempK:'5,780',      color:'#ffcb6b' },
    { id:'chromo', thai:'โครโมสเฟียร์', name:'Chromosphere',  tempK:'4,000-25,000', color:'#ff5c7a' },
    { id:'corona', thai:'โคโรนา',      name:'Corona',        tempK:'1-2M',       color:'#b980ff' },
  ],

  /* ------------------------------------------------------------------ */
  /* PLANETS · 8 + zones (เก่า · ใช้ p19)                                 */
  /* ------------------------------------------------------------------ */
  planets: [
    { id:'mercury', name:'ดาวพุธ',   distAU:0.39, zone:'hot',  color:'#a8a29c' },
    { id:'venus',   name:'ดาวศุกร์', distAU:0.72, zone:'hot',  color:'#e8c878' },
    { id:'earth',   name:'โลก',     distAU:1.00, zone:'habitable', color:'#5cb8ff' },
    { id:'mars',    name:'ดาวอังคาร',distAU:1.52, zone:'habitable-edge', color:'#cc5533' },
    { id:'jupiter', name:'ดาวพฤหัส', distAU:5.20, zone:'cold', color:'#d8a878' },
    { id:'saturn',  name:'ดาวเสาร์', distAU:9.58, zone:'cold', color:'#e8d8a8' },
    { id:'uranus',  name:'ดาวยูเรนัส',distAU:19.2, zone:'cold', color:'#a8d8e8' },
    { id:'neptune', name:'ดาวเนปจูน',distAU:30.1, zone:'cold', color:'#5878d8' },
  ],

  /* ------------------------------------------------------------------ */
  /* SOLAR ACTIVITY TIERS                                               */
  /* ------------------------------------------------------------------ */
  activityTiers: [
    { tier:1, label:'Solar Minimum', spotCount:'< 10',   color:'#64d8ff', events:['solar wind ปกติ','aurora บางครั้ง'] },
    { tier:2, label:'Low',           spotCount:'10–50',  color:'#7effb2', events:['flare เล็กบางครั้ง'] },
    { tier:3, label:'Moderate',      spotCount:'50–100', color:'#ffd96b', events:['flare M-class','prominence'] },
    { tier:4, label:'High',          spotCount:'100–200',color:'#ff8a3d', events:['flare X-class','CME ทิศสุ่ม'] },
    { tier:5, label:'Solar Maximum', spotCount:'> 200',  color:'#ff5c7a', events:['CME ใหญ่','geomagnetic storm','grid blackout'] },
  ],

  phenomena: [
    { id:'sunspot',    icon:'⚫', name:'Sunspot',    origin:'สนามแม่เหล็กแรงปิดกั้นการพา',   effect:'จุดเย็น (~3,800 K)',                   earth:'ตัวบ่งชี้ activity' },
    { id:'prominence', icon:'🔴', name:'Prominence', origin:'พลาสมาตามเส้นแม่เหล็ก loop',     effect:'แขนพลาสมายื่นจาก chromosphere',         earth:'บางครั้งระเบิด → CME' },
    { id:'flare',      icon:'⚡', name:'Solar Flare', origin:'magnetic reconnection ใกล้ sunspot', effect:'แสง + X-ray · 8 นาทีถึงโลก',         earth:'รบกวน HF · GPS drift' },
    { id:'cme',        icon:'💥', name:'CME',        origin:'พลาสมา + แม่เหล็กพุ่งจาก corona', effect:'พลาสมา · 1-3 วันถึงโลก',                earth:'storm · ดาวเทียม · grid' },
    { id:'wind',       icon:'🌬️', name:'Solar Wind', origin:'พลาสมาไหลออกจาก corona ตลอดเวลา', effect:'~400 km/s',                            earth:'aurora ที่ขั้วโลก' },
  ],

  eventChain: [
    { step:1, label:'สนามแม่เหล็กบิด (Field Twist)',   icon:'🌀' },
    { step:2, label:'ปรากฏ Sunspot',                   icon:'⚫' },
    { step:3, label:'Magnetic Reconnection → Flare',   icon:'⚡' },
    { step:4, label:'CME พุ่งออกจาก Corona',           icon:'💥' },
    { step:5, label:'Solar Wind พา particle ถึงโลก',   icon:'🌬️' },
    { step:6, label:'Aurora ที่ขั้วโลก',               icon:'🌌' },
  ],

  systemZones: [
    { id:'inner', thai:'ดาวเคราะห์ชั้นใน',  range:'0–2 AU',  icon:'🪨' },
    { id:'outer', thai:'ดาวเคราะห์ชั้นนอก', range:'5–30 AU', icon:'🪐' },
    { id:'dwarf', thai:'ดาวเคราะห์แคระ',    range:'Belt + Kuiper', icon:'⚫' },
    { id:'moon',  thai:'ดวงจันทร์บริวาร',    range:'โคจรรอบดาวเคราะห์', icon:'🌙' },
  ],

  deflectPoints: [
    { id:'A', label:'L1 Lagrange',          danger:0,
      desc:'จุดสมดุลแรงโน้มถ่วงระหว่างโลก-ดวงอาทิตย์ · เห็น CME ก่อน 1 ชม.',
      pros:['เห็นก่อน','พลังงานเบี่ยงน้อย','ตรงตำแหน่งที่พ่อทิ้ง deflector'],
      cons:['ต้องวางอุปกรณ์ล่วงหน้า'],
      sim:'CME วิ่งมา → ชน L1 → เบี่ยง 15° → พ้นโลก ✓' },
    { id:'B', label:'Asteroid Belt',        danger:3,
      desc:'ใช้สนามแม่เหล็กแถบดาวเคราะห์น้อย · เบี่ยงข้าง',
      pros:['มีวัตถุเป็นสมอ'],
      cons:['อยู่ไกลโลก · CME ผ่าน L1 ก่อนถึง','เบี่ยงไม่ทัน'],
      sim:'CME ผ่าน L1 ก่อน · ถึง Belt สาย · ชนโลกครึ่งหนึ่ง ⚠' },
    { id:'C', label:'Jupiter Magnetosphere', danger:5,
      desc:'ใช้แม่เหล็กดาวพฤหัส (แรงสุด)',
      pros:['สนามแรง'],
      cons:['ไกลโลกมาก · CME ผ่านโลกก่อนแล้ว'],
      sim:'CME ผ่านโลก → ค่อยถึง Jupiter · ไม่ทัน ✗' },
    { id:'D', label:'Earth Field Only',     danger:8,
      desc:'พึ่งสนามแม่เหล็กโลกอย่างเดียว',
      pros:['ไม่ต้องไปไหน'],
      cons:['สนามไม่แรงพอ','ดาวเทียมเสียแน่ · grid risk สูง'],
      sim:'CME ชนสนามโลก · พลาสมาทะลุ · grid flicker ⚠' },
  ],
};
