/* ===== COSMOS LOG · EP04 Config (v3) ===== */
/* วันสุดท้ายของยักษ์แดง · Death of a Giant                                  */
/* Lab-build → Discovery → Adventure · 26 หน้า                              */

window.EP_CONFIG = {
  id: 'ep04',
  title: 'วันสุดท้ายของยักษ์แดง',
  subtitle: 'Death of a Giant · เส้นทางสู่ดาว SOS',
  badge: { icon: '🔥', name: 'Stellar Fate' },
  duration: 100,
  indicator: 'ว 7.1 ม.4-6/2',

  /* ------------------------------------------------------------------ */
  /* PAGES · 26 หน้า                                                     */
  /* ------------------------------------------------------------------ */
  pages: [
    // ACT A · ARRIVAL + SETUP
    { id:'p00',  file:'p00-cover.html',         title:'EP04 Cover · Recap',         type:'story',      time:2 },
    { id:'p01',  file:'p01-pretest.html',       title:'Pre-test · 4-choice',        type:'reflection', time:6 },
    { id:'p02',  file:'p02-arrival.html',       title:'ถึง local star · พบ SOS',     type:'story',      time:3 },
    { id:'p03',  file:'p03-plan.html',          title:'เตือนภัย · วางแผน · บทบาท',   type:'setup',      time:3 },
    // ACT B · COLOR LAB
    { id:'p04',  file:'p04-spectrum-slider.html', title:'Lab 1.1 · Spectrum Slider', type:'puzzle',   time:4 },
    { id:'p05',  file:'p05-drag-match.html',    title:'Lab 1.2 · ลากดาว 7 สี',       type:'puzzle',   time:5 },
    { id:'p06',  file:'p06-obafgkm.html',       title:'OBAFGKM Theory',              type:'story',    time:3 },
    { id:'p07',  file:'p07-group-code.html',    title:'🎁 Group by Code · เก็บ Black Dwarf', type:'puzzle', time:4 },
    { id:'p08',  file:'p08-group-temp.html',    title:'Group by Temperature',        type:'puzzle',   time:3 },
    { id:'p09',  file:'p09-color-summary.html', title:'สรุปสีของเส้นทาง',            type:'story',    time:2 },
    // ACT C · MASS + EVOLUTION LAB
    { id:'p10',  file:'p10-bridge-mass.html',   title:'เคน · ทีนี้แรงโน้มถ่วง',      type:'story',    time:2 },
    { id:'p11',  file:'p11-nebula.html',        title:'เนบิวลา · ต้นกำเนิดดาว',      type:'story',    time:2 },
    { id:'p12',  file:'p12-protostar.html',     title:'Proto Star · มวลตัดสิน',      type:'puzzle',   time:3 },
    { id:'p13',  file:'p13-mass-tracks.html',   title:'Lab 2 · 5 เส้นทางตามมวล',     type:'puzzle',   time:6 },
    { id:'p14',  file:'p14-evo-order.html',     title:'🎁 Evolution Order',           type:'puzzle',   time:4 },
    { id:'p15',  file:'p15-mass-endpoint.html', title:'Match · มวล → วาระสุดท้าย',   type:'puzzle',   time:4 },
    { id:'p16',  file:'p16-evo-game.html',      title:'🎮 Mini-game วิวัฒนาการ',     type:'puzzle',   time:3 },
    { id:'p17',  file:'p17-fatherlab.html',     title:'📓 ห้องวิจัยพ่อ · กำลังไหม้',  type:'story',    time:4 },
    // ACT D · SYNTHESIS + JOURNEY
    { id:'p18',  file:'p18-starmap.html',       title:'Star Map Reveal',             type:'story',    time:3 },
    { id:'p19',  file:'p19-voidface.html',      title:'⚠ VOID FACE-TO-FACE',          type:'story',    time:3 },
    { id:'p20',  file:'p20-path-select.html',   title:'🎁 Path Selection · 4 เส้นทาง', type:'puzzle',  time:5 },
    { id:'p21',  file:'p21-posttest.html',      title:'Post-test · 4-choice',        type:'reflection', time:5 },
    { id:'p22',  file:'p22-sequencer.html',     title:'Story Sequencer · เรียงเหตุการณ์', type:'puzzle', time:3 },
    { id:'p23',  file:'p23-shop.html',          title:'🛒 Voyager Cache · Shop',     type:'setup',    time:3 },
    { id:'p24',  file:'p24-boss.html',          title:'🔥 GRAVITY ASCENT (Boss)',    type:'mixed',    time:6 },
    { id:'p25',  file:'p25-rescue.html',        title:'💫 Frame Dragging · กู้พ่อ',   type:'story',    time:3 },
    { id:'p26',  file:'p26-journal.html',       title:'📋 Journal 3-2-1 · Badge',    type:'reflection', time:4 },
  ],

  /* ------------------------------------------------------------------ */
  /* LEARNING OBJECTIVES · K · P · A                                    */
  /* ------------------------------------------------------------------ */
  objectives: {
    K1: { label:'สี ↔ อุณหภูมิ ↔ OBAFGKM', pages:['p01','p05','p17','p19'], threshold:0.85 },
    K2: { label:'3 เส้นทางวิวัฒนาการตามมวล', pages:['p06','p08','p11','p17'], threshold:0.67 },
    K3: { label:'เกณฑ์มวล 9 / 25 → ปลายทาง',  pages:['p11','p17','p19'], threshold:0.85 },
    K4: { label:'มวลมาก = อายุสั้น (กลับสามัญสำนึก)', pages:['p06','p17','p19'], threshold:0.67 },
    P1: { label:'อ่านสเปกตรัม → ระบุชนิดดาว', pages:['p05','p08','p17'] },
    P2: { label:'คำนวณมวลจากความสว่าง',     pages:['p11','p17'] },
    P3: { label:'ตัดสินใจเส้นทางหนี',         pages:['p10','p14','p17','p18'] },
    A1: { label:'ตั้งคำถามต่อสามัญสำนึก',     pages:['p06','p12','p14'] },
    A2: { label:'ฟังเหตุผลทีม',               pages:['p12','p14','p17'] },
    A3: { label:'ความกล้าเผชิญ VOID',         pages:['p13','p17','p18'] },
  },

  /* ------------------------------------------------------------------ */
  /* MISCONCEPTIONS · target ตลอดทั้ง EP                                  */
  /* ------------------------------------------------------------------ */
  misconceptions: {
    M1: { label:'สีดาว = อายุดาว', truth:'สี = อุณหภูมิผิวเท่านั้น' },
    M2: { label:'แดง = เย็น = ปลอดภัย/มวลน้อย เสมอ', truth:'สีแดงมีทั้ง Red dwarf และ Red Supergiant' },
    M3: { label:'ดาวใหญ่ = ร้อนกว่า', truth:'ขนาดและอุณหภูมิเป็นคนละมิติ' },
    M4: { label:'มวลมาก = อายุยืน', truth:'ตรงข้าม: มวลมาก = ใช้เชื้อเพลิงเร็ว = อายุสั้น' },
    M5: { label:'ดาว G-type คงสภาพตลอดอายุ', truth:'จะกลายเป็น Red giant แล้ว White dwarf' },
  },

  /* ------------------------------------------------------------------ */
  /* ROLES (4 หลัก)                                                      */
  /* ------------------------------------------------------------------ */
  roles: [
    { id:'nav',  icon:'🧭', name:'Navigator',  desc:'แผนที่ · พล็อตเส้นทาง · ขับยาน',
      sees:['radar','starmap','thrust'], owns:['warp'] },
    { id:'eng',  icon:'🔬', name:'Engineer',   desc:'ถือ Star Decoder · อ่านสเปกตรัม',
      sees:['decoder','spectrum','obafgkm'], owns:['decoder'] },
    { id:'med',  icon:'💊', name:'Medic',      desc:'ประเมินรังสี · สัญญาณชีพ',
      sees:['radiation','crew-vital','aurora'], owns:['shield'] },
    { id:'mech', icon:'🔧', name:'Mechanic',   desc:'คำนวณมวล · วงโคจรหนี',
      sees:['mass-calc','orbit','energy'], owns:['energy'] },
  ],
  roleFlex: {
    2: { nav:['nav','mech'], eng:['eng','med'] },
    3: { nav:['nav'], eng:['eng','med'], mech:['mech'] },
    4: null,
    5: { nav:['nav'], eng:['eng'], med:['med'], mech:['mech'], nav2:['nav'] },
    6: { nav:['nav'], eng:['eng'], med:['med'], mech:['mech'], nav2:['nav'], eng2:['eng'] },
  },

  /* ------------------------------------------------------------------ */
  /* COIN · เก็บจาก perfect stage · ใช้ที่ shop                          */
  /* ------------------------------------------------------------------ */
  coin: {
    start: 0,
    perfectBonus: {
      p01: 10,  // pretest perfect
      p05: 30,  // spectrum perfect
      p08: 25,  // evolution lab perfect
      p10: 20,  // engulfment escape perfect
      p11: 30,  // mass decode perfect
      p14: 25,  // void claim perfect
    },
  },

  /* ------------------------------------------------------------------ */
  /* PHOTON · global currency                                           */
  /* ------------------------------------------------------------------ */
  photon: {
    start: 30,
    targets: {
      shield:  { cost:60, icon:'🛡️', name:'Black Dwarf Shield',
                 desc:'บล็อก GRB ใน boss · จำเป็นสำหรับ ending A+' },
      hint:    { cost:20, icon:'💡', name:'LEMAITRE Hint',
                 desc:'เลื่อนคำถามใน boss · 1 ครั้ง' },
      thrust:  { cost:40, icon:'🚀', name:'Thrust Booster',
                 desc:'+5 thrust ก่อน boss เริ่ม' },
    },
    earn: {
      p02:10, p05:30, p08:25, p11:30, p14:30,
    },
  },

  /* ------------------------------------------------------------------ */
  /* SHOP · Beat 16 · ก่อน Gravity Ascent                                 */
  /* ------------------------------------------------------------------ */
  shop: {
    items: [
      { id:'spectroPro',    icon:'🔭+', name:'Spectroscope MK-IV',
        cost:60, desc:'+5 Thrust ต่อข้อถูกใน Zone 1', uses:Infinity, type:'passive', cat:'zone1' },
      { id:'massSensor',    icon:'⚖️+', name:'Mass Sensor',
        cost:70, desc:'บล็อกตอบผิด 1 ครั้งใน Zone 2', uses:1, type:'defense' },
      { id:'blackDwarf',    icon:'⚫',  name:'Black Dwarf Shell',
        cost:90, desc:'จำเป็นสำหรับ ending A+ STAR LEGACY', uses:1, type:'unique' },
      { id:'photonPulse',   icon:'⚡×2',name:'Photon Pulse',
        cost:50, desc:'next answer +5 thrust', uses:2, type:'boost' },
      { id:'cloakSkip',     icon:'🌑',  name:'Cloak Skip',
        cost:40, desc:'ข้ามคำถาม 1 ข้อ (auto-pass)', uses:1, type:'skip' },
      { id:'whisper',       icon:'💡',  name:'LEMAITRE Whisper',
        cost:30, desc:'แสดง hint คำถาม 1 ครั้ง', uses:1, type:'hint' },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* GRAVITY ASCENT · Boss · 3 Zones · Random Pool · 2-choice            */
  /* ------------------------------------------------------------------ */
  boss: {
    name: 'GRAVITY ASCENT',
    startEnergy: 100,
    chargeIntervalSec: 10,    // บอลแรงโน้มถ่วง charge ทุก 10 วิ
    chargeDamage: 8,          // -8 energy ต่อ charge
    thrustPerZone: 30,        // ต้องสะสมถึง 30 ต่อเขต
    thrustEasy: 5,            // ตอบถูก ข้อง่าย
    thrustHard: 8,            // ตอบถูก ข้อยาก
    thrustWrong: -3,          // ตอบผิด
    endingThresholds: {
      'A+': 70,   // energy เหลือ ≥ 70
      'A':  40,
      'B':  1,
      'C':  0,
    },
    // Question pool · 24 ข้อ · 8/zone · ทั้งหมดอยู่ในเนื้อหา EP04
    pools: {
      zone1: [   // สี · อุณหภูมิ · OBAFGKM
        { tier:'easy', q:'ดาวสีน้ำเงินมีอุณหภูมิเท่าใด?',
          a:['มากกว่า 30,000 K','ต่ำกว่า 5,000 K'], c:0 },
        { tier:'easy', q:'สีของดาวบอกอะไร?',
          a:['อุณหภูมิผิว','อายุดาว'], c:0 },
        { tier:'easy', q:'ดวงอาทิตย์สีเหลือง · จัดเป็นสเปกตรัมใด?',
          a:['G','M'], c:0 },
        { tier:'hard', q:'ดาวเบเทลจุส (3,500 K · แดง) มีสเปกตรัมใด?',
          a:['A','M'], c:1 },
        { tier:'hard', q:'ดาวรวงข้าว 6,760 K · สเปกตรัมใด?',
          a:['F','G'], c:0 },
        { tier:'hard', q:'สเปกตรัม K มีสีอะไร?',
          a:['เหลือง','ส้ม'], c:1 },
        { tier:'easy', q:'ดาวสเปกตรัม O เย็นกว่าสเปกตรัม M · จริงหรือเท็จ?',
          a:['จริง','เท็จ'], c:1 },
        { tier:'hard', q:'ดาวสีแดง 2 ดวง อาจมีมวลต่างกันได้หรือไม่?',
          a:['ได้','ไม่ได้'], c:0 },
      ],
      zone2: [   // มวล ↔ ปลายทาง
        { tier:'easy', q:'ดาวมวลมากกว่า 25 M☉ จะกลายเป็น?',
          a:['ดาวแคระขาว','หลุมดำ'], c:1 },
        { tier:'easy', q:'ดวงอาทิตย์ (1 M☉) จะจบชีวิตเป็น?',
          a:['ดาวแคระขาว','ดาวนิวตรอน'], c:0 },
        { tier:'hard', q:'ดาวมวล 12 M☉ จบเป็น?',
          a:['ดาวนิวตรอน','หลุมดำ'], c:0 },
        { tier:'hard', q:'ดาวมวล 27 M☉ ระเบิดเป็น?',
          a:['ซูเปอร์โนวา','ไฮเปอร์โนวา'], c:1 },
        { tier:'easy', q:'ดาวมวลน้อยกว่า 9 M☉ ระเบิดเป็นซูเปอร์โนวา · จริงหรือเท็จ?',
          a:['จริง','เท็จ'], c:1 },
        { tier:'hard', q:'ดาวมวล 0.3 M☉ จะจบเป็น?',
          a:['Black dwarf','หลุมดำ'], c:0 },
        { tier:'hard', q:'ดาวมวล 8 M☉ ระเบิดเป็นซูเปอร์โนวา · จริงหรือเท็จ?',
          a:['จริง','เท็จ'], c:1 },
        { tier:'easy', q:'ดาวมวลมาก = ระเบิดรุนแรงกว่ามวลน้อย · จริงหรือเท็จ?',
          a:['จริง','เท็จ'], c:0 },
      ],
      zone3: [   // มวล vs อายุ + บูรณาการ
        { tier:'easy', q:'มวลมาก → อายุดาว?',
          a:['สั้นกว่า','ยาวกว่า'], c:0 },
        { tier:'hard', q:'ดาวที่มีอายุยืนที่สุดในเอกภพคือชนิดใด?',
          a:['Red dwarf','Blue giant'], c:0 },
        { tier:'easy', q:'สีดาวบอกมวลของดาวโดยตรงหรือไม่?',
          a:['ใช่','ไม่ใช่'], c:1 },
        { tier:'hard', q:'Red Supergiant อายุยืนกว่าดวงอาทิตย์ · จริงหรือเท็จ?',
          a:['จริง','เท็จ'], c:1 },
        { tier:'hard', q:'Black dwarf เกิดจาก White dwarf เย็นลง · จริงหรือเท็จ?',
          a:['จริง','เท็จ'], c:0 },
        { tier:'easy', q:'ดาวสีแดงทุกดวงตายแบบเดียวกันเสมอ · จริงหรือเท็จ?',
          a:['จริง','เท็จ'], c:1 },
        { tier:'hard', q:'ดวงอาทิตย์อนาคต: เป็น Red giant ก่อนกลายเป็น White dwarf · จริงหรือเท็จ?',
          a:['จริง','เท็จ'], c:0 },
        { tier:'easy', q:'ดาวยักษ์น้ำเงิน O-type อายุยืนกว่า Red dwarf · จริงหรือเท็จ?',
          a:['จริง','เท็จ'], c:1 },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* OBAFGKM TABLE · ใช้แสดงทุกหน้า                                       */
  /* ------------------------------------------------------------------ */
  spectralTable: [
    { type:'O', color:'น้ำเงิน',       tempK:'> 30,000',    hex:'#9bb8ff' },
    { type:'B', color:'น้ำเงินแกมขาว',  tempK:'10,000–30,000', hex:'#bcd0ff' },
    { type:'A', color:'ขาว',           tempK:'7,500–10,000',  hex:'#ffffff' },
    { type:'F', color:'ขาวแกมเหลือง',  tempK:'6,000–7,500',   hex:'#fff4d8' },
    { type:'G', color:'เหลือง',        tempK:'4,900–6,000',   hex:'#ffd96b' },
    { type:'K', color:'ส้ม',           tempK:'3,500–4,900',   hex:'#ffaa55' },
    { type:'M', color:'แดง',           tempK:'2,500–3,500',   hex:'#ff7a55' },
  ],

  /* ------------------------------------------------------------------ */
  /* MASS EVOLUTION TRACKS · 5 ช่วง                                       */
  /* ------------------------------------------------------------------ */
  massTracks: [
    { range:'< 0.08 M☉',   track:'Brown dwarf', icon:'🟫', color:'#8b6645',
      stages:['Proto-failure','Cool brown dwarf'],
      end:'ดาวที่ไม่ติดไฟ',
      time:'หลายล้านล้านปี (เย็นช้า ๆ)',
      note:'มวลน้อยเกิน · ไม่จุดฟิวชัน H · เย็นลงเรื่อย ๆ' },
    { range:'0.08 – 0.5 M☉', track:'Red dwarf', icon:'🔴', color:'#cc4422',
      stages:['Main sequence (M)','Red dwarf','Black dwarf'],
      end:'Black dwarf',
      time:'> 100 พันล้านล้านปี (อยู่นานสุด)',
      note:'เผา H ช้ามาก · อายุยืนกว่าอายุเอกภพ' },
    { range:'0.5 – 9 M☉',  track:'Sun-like', icon:'🟡', color:'#ffd96b',
      stages:['Main sequence (G/K)','Red giant','Planetary nebula','White dwarf','Black dwarf'],
      end:'White dwarf → Black dwarf',
      time:'~10 พันล้านปี',
      note:'ดวงอาทิตย์อยู่ในช่วงนี้ · จะเป็น Red giant ใน 5 พันล้านปี' },
    { range:'9 – 25 M☉',   track:'High-mass', icon:'🔵', color:'#64a8ff',
      stages:['Main sequence (O/B)','Supergiant','Supernova','Neutron star'],
      end:'Neutron star',
      time:'10 – 50 ล้านปี',
      note:'เผาเชื้อเพลิงเร็ว · ระเบิดเป็น Type II Supernova' },
    { range:'> 25 M☉',     track:'Very high-mass', icon:'⚫', color:'#b980ff',
      stages:['Main sequence (O)','Supergiant','Hypernova','Black hole'],
      end:'Black hole',
      time:'< 10 ล้านปี',
      note:'หนาแน่นมหาศาล · ระเบิดรุนแรงที่สุด · เกิด Gamma-Ray Burst' },
  ],

  /* ------------------------------------------------------------------ */
  /* 7-COLOR ROUTE STARS · 7 ดาวบนเส้นทาง · 7 สีตาม OBAFGKM                */
  /* ------------------------------------------------------------------ */
  routeStars: [
    { id:'r1', label:'ดาว α',  tempK:32000, color:'น้ำเงิน',        type:'O', mass:30, hex:'#9bb8ff', hint:'ร้อนสุด · มวลมากสุด · ระวังอย่างยิ่ง' },
    { id:'r2', label:'ดาว β',  tempK:18000, color:'น้ำเงินแกมขาว',   type:'B', mass:12, hex:'#bcd0ff', hint:'มวลมาก · จะระเบิด' },
    { id:'r3', label:'ดาว γ',  tempK:8500,  color:'ขาว',            type:'A', mass:2.5, hex:'#ffffff', hint:'ปานกลาง' },
    { id:'r4', label:'ดาว δ',  tempK:6700,  color:'ขาวแกมเหลือง',    type:'F', mass:1.5, hex:'#fff4d8', hint:'ปลอดภัย' },
    { id:'r5', label:'ดาว ε',  tempK:5500,  color:'เหลือง',         type:'G', mass:1.0, hex:'#ffd96b', hint:'เหมือนดวงอาทิตย์' },
    { id:'r6', label:'ดาว ζ',  tempK:4200,  color:'ส้ม',            type:'K', mass:0.7, hex:'#ffaa55', hint:'อบอุ่น · มวลน้อย · ค่อนข้างปลอดภัย' },
    { id:'r7', label:'ดาว η',  tempK:3000,  color:'แดง',            type:'M', mass:0.3, hex:'#ff7a55', hint:'เย็น · มวลน้อย · ปลอดภัย' },
  ],

  /* ------------------------------------------------------------------ */
  /* MISSION BRIEFINGS · สลับ VOID Hint / LEMAITRE Brief                   */
  /* ------------------------------------------------------------------ */
  briefings: {
    p04: { type:'leader', no:'01',
      brief:'ก่อนเลือกเส้นทาง · ต้องรู้ว่า "สีดาวบอกอะไร" · เลื่อน slider ดูความสัมพันธ์ระหว่างสี ↔ อุณหภูมิ',
      goal:'เข้าใจว่าสีของดาวสะท้อนอุณหภูมิผิว · สีไหนร้อน-เย็น',
      criteria:['เลื่อน slider ดูครบทั้ง 7 สี','ตอบคำถามได้ถูก ≥ 1 ข้อ'],
      time:'4 นาที', reward:'ปลดล็อก Lab ลากดาว'
    },
    p05: { type:'void', no:'02',
      taunt:'"ลากดาว 7 ดวงไปจับคู่อุณหภูมิ? เสียเวลา · ดาวก็คือดาว ทุกตัวเหมือนกัน"',
      goal:'จับคู่ดาว 7 ดวงบนเส้นทางกับอุณหภูมิที่ถูกต้อง · ระบบจะใส่รหัส OBAFGKM ให้',
      criteria:['ลาก 7 ดวงเข้าช่องอุณหภูมิ','กดเปรียบเทียบ · ทำซ้ำจนถูกหมด'],
      time:'5 นาที', reward:'ปลดล็อกทฤษฎี OBAFGKM'
    },
    p07: { type:'leader', no:'03',
      brief:'ใช้รหัสที่เพิ่งเรียน · จัดดาวจริงในตารางลงกลุ่ม OBAFGKM · ระหว่างทางอาจเจอของพิเศษ',
      goal:'จัดกลุ่มดาวจริง 11 ดวงตามรหัสสี · ถูกหมดได้กล่องสุ่ม + เก็บ Black Dwarf Shell',
      criteria:['จัดถูกครบ ≥ 9 จาก 11','สังเกตของลึกลับใน area'],
      time:'4 นาที', reward:'🎁 Mystery Box + Black Dwarf Shell'
    },
    p12: { type:'leader', no:'04',
      brief:'Proto Star เกิดจากเนบิวลา · มวลของมันตอนเริ่มจะตัดสิน "เส้นทางวิวัฒนาการ"',
      goal:'เข้าใจว่ามวล Proto Star ตัดสินขนาดและจุดจบของดาว',
      criteria:['ลากเลือกมวลในช่วง 5 ระดับ','สังเกตขนาดที่เปลี่ยน'],
      time:'3 นาที', reward:'ปลดล็อก Lab 5 เส้นทาง'
    },
    p13: { type:'void', no:'05',
      taunt:'"5 เส้นทาง? นั่นเรื่องแต่งของมนุษย์ · ดาวมันก็แค่ตายไปเหมือนๆ กันหมดนั่นแหละ"',
      goal:'ทดลองวิวัฒนาการดาวตามมวล 5 ช่วง · บันทึกปลายทางแต่ละช่วง',
      criteria:['สำรวจครบ 5 ช่วงมวล','จับคู่ปลายทางได้'],
      time:'6 นาที', reward:'Mystery Box'
    },
    p17: { type:'leader', no:'06',
      brief:'พ่ออารยาทิ้งบันทึกไว้ · บางส่วนถูกเผา · เธอต้องไขรหัสว่ามีดาว "อันตรายปลอม" บนเส้นทางไหม',
      goal:'อ่านบันทึกพ่อ · ระบุดาวต้องสงสัยที่ VOID วางไว้',
      criteria:['อ่านบันทึก 3 หน้า','ระบุดาว 27 M☉ ที่ปลอมเป็นเบเทลจุส'],
      time:'4 นาที', reward:'ปลดล็อก Star Map'
    },
    p20: { type:'leader', no:'07',
      brief:'AI สร้างเส้นทางให้ 4 เส้น · เลือกที่ปลอดภัยที่สุด (ผ่านมวลและความร้อนต่ำสุด) · เส้นที่ปลอดภัยสุดได้รางวัลใหญ่สุด',
      goal:'วิเคราะห์ 4 เส้นทาง · เลือกเส้นที่ปลอดภัยที่สุด',
      criteria:['ตรวจมวล + ความร้อนของแต่ละเส้น','เลือกเส้นที่ดีที่สุด'],
      time:'5 นาที', reward:'🎁 Mystery Box (ใหญ่สุด!)'
    },
  },

  /* ------------------------------------------------------------------ */
  /* STAR LANDMARKS · จากตารางที่ครูให้                                    */
  /* ------------------------------------------------------------------ */
  stars: [
    { name:'ดวงอาทิตย์',   color:'เหลือง',         tempK:5780,  type:'G' },
    { name:'ดาวรวงข้าว',   color:'ขาวแกมเหลือง',    tempK:6760,  type:'F' },
    { name:'ดาวซิริอัส',   color:'ขาว',            tempK:9940,  type:'A' },
    { name:'ดาวไรเจล',     color:'น้ำเงินแกมขาว',   tempK:11000, type:'B' },
    { name:'ดาวโพรซิออน',  color:'ขาวแกมเหลือง',    tempK:6530,  type:'F' },
    { name:'ดาวคาเพลลา',   color:'เหลือง',         tempK:4900,  type:'G' },
    { name:'ดาวปาริชาต',   color:'แดง',            tempK:3570,  type:'M' },
    { name:'ดาวหัวใจสิงห์', color:'น้ำเงินแกมขาว',   tempK:10300, type:'B' },
    { name:'ดาวเวกา',      color:'ขาว',            tempK:9600,  type:'A' },
    { name:'ดาวเบเทลจุส',  color:'แดง',            tempK:3500,  type:'M' },
    { name:'ดาวอัลนีแทค',   color:'น้ำเงิน',         tempK:30000, type:'O' },
  ],
};
