/* ===== COSMOS LOG · EP03 Config ===== */
/* เสียงร้องจากอดีต · Echo from the Past                                     */
/* Multi-iPad edition · 1 คน 1 เครื่อง · ทีม 2-6 คน · role-based asymmetric  */

window.EP_CONFIG = {
  id: 'ep03',
  title: 'เสียงร้องจากอดีต',
  subtitle: 'Echo from the Past · ดาวฤกษ์ · แสงและระยะ',
  badge: { icon: '✨', name: 'Light Detective' },
  duration: 100,
  indicator: 'ว 7.1 ม.4-6/2',

  /* ------------------------------------------------------------------ */
  /* PAGES · 20 หน้า                                                     */
  /* ------------------------------------------------------------------ */
  pages: [
    // ACT 1 · HOOK
    { id:'p00', file:'p00-howtoplay.html', title:'Recap EP02 · Intro',      type:'story',      time:2 },
    { id:'p01', file:'p01-entry.html',     title:'จดหมาย + Pre-test',      type:'reflection', time:4 },
    { id:'p02', file:'p02-sos.html',       title:'SOS "ARYA" · decode',     type:'story',      time:2 },
    { id:'p02b', file:'p02b-genesis.html', title:'📓 MISSION GENESIS',      type:'story',      time:3 },
    { id:'p03', file:'p03-join.html',      title:'VOIDHUNTER · Password',   type:'setup',      time:3 },
    // ACT 2A · MYSTERY 1
    { id:'p04', file:'p04-parallax.html',  title:'TEACH · Parallax',        type:'story',      time:2 },
    { id:'p05', file:'p05-parallax10.html',title:'INVEST · วัด 3 ดาว',      type:'puzzle',     time:4 },
    { id:'p06', file:'p06-magnitude.html', title:'REVEAL · 400 ปีแสง',     type:'story',      time:2 },
    // ACT 2B · MYSTERY 2
    { id:'p07', file:'p07-council.html',   title:'TEACH · Hipparchus · m',  type:'story',      time:2 },
    { id:'p08', file:'p08-arrive.html',    title:'INVEST · เรียง 5 ดาว',    type:'puzzle',     time:4 },
    { id:'p09', file:'p09-absolute.html',  title:'DILEM · VOID ดาว A vs B', type:'mixed',      time:3 },
    { id:'p09b', file:'p09b-decode.html',  title:'🔐 MASTER DECODE · MAP',  type:'puzzle',     time:3 },
    { id:'p10', file:'p10-hubble.html',    title:'CINE · กล่องพ่อ (ล็อก)',  type:'story',      time:2 },
    // ACT 3 · MIDPOINT
    { id:'p11', file:'p11-distance.html',  title:'🌟 TEACH · Midpoint 5นาที', type:'story',    time:5 },
    { id:'p12', file:'p12-father.html',    title:'INVEST · ปลดรหัส DENEB',  type:'puzzle',     time:3 },
    // ACT 4 · CRISIS
    { id:'p13', file:'p13-maze.html',      title:'CINE · เสียงพ่อเต็ม',     type:'story',      time:2 },
    { id:'p14', file:'p14-chase.html',     title:'TEACH · Triangulation',   type:'story',      time:2 },
    { id:'p15', file:'p15-payoff.html',    title:'🔥 INVEST · Stellar Maze', type:'puzzle',    time:4 },
    // ACT 5 · SHOP + CLIMAX + ENDING
    { id:'p16', file:'p16-recap.html',     title:'Movie Recap + 2 trap',    type:'puzzle',     time:5 },
    { id:'p19', file:'p19-map.html',       title:'Post-test · Badge',       type:'reflection', time:5 },
    { id:'p17', file:'shop.html',          title:'🛍️ Hubble Trading Post',  type:'setup',      time:3 },
    { id:'p18', file:'warprun.html',       title:'🔥 WARP RUN (climax)',    type:'mixed',      time:7 },
    { id:'p19b', file:'p19b-journal.html', title:'📒 3-2-1 Journal',         type:'reflection', time:5 },
  ],

  /* ------------------------------------------------------------------ */
  /* LEARNING OBJECTIVES · K · P · A                                    */
  /* ------------------------------------------------------------------ */
  objectives: {
    K1: { label:'อ่าน apparent magnitude (m น้อย=สว่าง)', pages:['p06','p07','p14'], threshold:0.85 },
    K2: { label:'ใช้ parallax: d(pc) = 1/p(")',            pages:['p04','p05','p13'], threshold:0.67 },
    K3: { label:'แปลง ly ↔ pc ↔ AU',                       pages:['p10','p14','p17'], threshold:0.67 },
    K4: { label:'ใช้ตาราง m−M หา d (distance modulus)',    pages:['p09','p11','p13'], threshold:0.67 },
    P1: { label:'สังเกต·วัดมุม parallax',                  pages:['p04','p05'] },
    P2: { label:'ทำนายความสว่างจริง (M)',                  pages:['p09'] },
    P3: { label:'วิเคราะห์หลักฐาน · trap',                 pages:['p07','p14','p16'] },
    P4: { label:'คำนวณใต้เวลา',                             pages:['p11','p13'] },
    A1: { label:'ทีม · ฟังเสียงข้างน้อย',                   pages:['p03','p07','p12'] },
    A2: { label:'กล้าวิพากษ์ VOID',                         pages:['p07','p09','p14'] },
    A3: { label:'ไม่ย่อท้อ · resolve Arya arc',             pages:['p13','p15','p18'] },
    A4: { label:'จิตวิทยาศาสตร์ · anti-misc',               pages:['p14','p18'] },
  },

  /* ------------------------------------------------------------------ */
  /* ROLES (4 หลัก + flex 2-6)                                          */
  /* ------------------------------------------------------------------ */
  roles: [
    { id:'nav',  icon:'🧭', name:'Navigator',  desc:'เรดาร์ · star map · ปุ่ม WARP',
      sees:['radar','starmap','parallax','meter'], owns:['warp','cloak'] },
    { id:'eng',  icon:'🔬', name:'Engineer',   desc:'ตาราง magnitude · สเปกตรัม',
      sees:['magnitude-table','spectrum','absolute-m'], owns:['mag-table'] },
    { id:'med',  icon:'💊', name:'Medic',      desc:'สัญญาณชีพ · เสียงพ่ออารยา',
      sees:['crew-vital','sos-audio','letter'], owns:['beacon-read'] },
    { id:'mech', icon:'🔧', name:'Mechanic',   desc:'Photon Bank · ปุ่มทั้งหมด',
      sees:['photon-bank','timer','buttons'], owns:['photon','beacon-send'] },
  ],
  // กฎ merge เมื่อทีม < 4 · split เมื่อทีม > 4
  roleFlex: {
    2: { nav:['nav','mech'], eng:['eng','med'] },   // 2 คน = รวมคู่
    3: { nav:['nav'], eng:['eng','med'], mech:['mech'] },
    4: null,  // มาตรฐาน
    5: { nav:['nav'], eng:['eng'], med:['med'], mech:['mech'], nav2:['nav'] }, // co-pilot
    6: { nav:['nav'], eng:['eng'], med:['med'], mech:['mech'], nav2:['nav'], eng2:['eng'] },
  },

  /* ------------------------------------------------------------------ */
  /* PHOTON · currency ใหม่ EP03                                        */
  /* ------------------------------------------------------------------ */
  photon: {
    start: 20,               // ได้จาก p02 decode SOS
    targets: {
      warp:   { cost:100, icon:'🚀', name:'Warp Jump',
                desc:'กระโดดข้ามระยะ · meter +20% · แต่เปล่งแสง = VOIDHUNTER +10%' },
      beacon: { cost:300, icon:'💌', name:'Lighthouse Beacon',
                desc:'ส่งข้อความถึงพ่ออารยา · Arya arc resolve · แต่ meter -30% ทันที' },
      cloak:  { cost:50,  icon:'🌑', name:'Stealth Cloak',
                desc:'ดับแสงซ่อน 1 ฉาก · VOIDHUNTER freeze tick' },
    },
    earn: {
      // page → photon ที่เก็บได้สูงสุด
      p02:20, p04:30, p05:80, p06:50, p07:30, p09:80, p11:80, p13:60, p16:40, p17:80,
    },
  },

  /* ------------------------------------------------------------------ */
  /* VOIDHUNTER METER · แทน BOSS HP                                     */
  /* ------------------------------------------------------------------ */
  voidhunter: {
    start: 60,              // % · 0 = จับได้ · 100 = หลุด
    tickPerPage: -5,        // -5% ต่อหน้าปกติ (ยิ่งลง = ยิ่งใกล้เรา)
    safeHavens: ['p00','p01','p03','p08','p10','p18','p19'],
    warpBonus: +20,         // WARP = +20%
    beaconPenalty: -30,     // BEACON ส่ง = -30%
    cloakFreeze: true,      // CLOAK = freeze tick 1 หน้า
    wrongAnswer: -10,       // ตอบผิด = -10%
    loseAt: 0,              // ถึง 0 = retry หน้า
  },

  /* ------------------------------------------------------------------ */
  /* COIN · 🪙 · เก็บจาก perfect stage · ใช้ซื้อ item ที่ shop          */
  /* ------------------------------------------------------------------ */
  coin: {
    start: 0,
    // perfect stage → coin bonus
    perfectBonus: {
      p05: 20,   // parallax 3/3
      p06: 15,   // SOS measure right
      p08: 20,   // magnitude sort 1 try
      p09: 15,   // VOID Q correct
      p11: 15,   // M discovery
      p12: 30,   // DENEB unlock try 1
      p15: 20,   // distance calc
      p16: 20,   // movie recap trap
    },
  },

  /* ------------------------------------------------------------------ */
  /* SHOP · Beat 17 · ก่อน WARP RUN                                     */
  /* ------------------------------------------------------------------ */
  shop: {
    items: [
      { id:'parallaxPro',  icon:'🔭+', name:'Parallax Lens Pro',
        cost:40, desc:'Parallax Q · damage ×2 · 3 ครั้ง', uses:3, type:'boost', cat:'parallax', mult:2 },
      { id:'almanac',      icon:'📜+', name:'Galactic Almanac',
        cost:40, desc:'Magnitude Q · damage ×2 · 3 ครั้ง', uses:3, type:'boost', cat:'magnitude', mult:2 },
      { id:'scope',        icon:'🎯',  name:'Precision Scope',
        cost:60, desc:'Random Q · damage ×2 · 2 ครั้ง', uses:2, type:'boost', cat:'any', mult:2 },
      { id:'shieldPlus',   icon:'🛡️+', name:'Reinforced Shield',
        cost:80, desc:'block VOIDHUNTER shot · 2 ครั้ง', uses:2, type:'defense' },
      { id:'cloakBuy',     icon:'🌑',  name:'Cloak',
        cost:30, desc:'skip 1 Q (auto-pass)', uses:1, type:'skip' },
      { id:'chronos',      icon:'⏱️',  name:'Chronos Booster',
        cost:100, desc:'VOIDHUNTER charge 15 วิ (แทน 10) · ถาวร', uses:Infinity, type:'passive' },
      { id:'beaconAmp',    icon:'💌+', name:'Beacon Amplifier',
        cost:120, desc:'ลด beacon cost 300✦ → 200✦', uses:1, type:'passive' },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* WARP RUN · Boss-like · VOIDHUNTER HP 300 · 3 Phase                 */
  /* ------------------------------------------------------------------ */
  warpRun: {
    totalHP: 300,
    vhChargeSec: 10,        // VOIDHUNTER ชาร์จยิง 10 วิ (15 ถ้ามี ⏱️)
    vhDamage: 30,           // ⚡ ที่ถูกหักเมื่อ VH ยิง
    vhMeterPenalty: 10,     // 👁️ meter −10% เมื่อ VH ยิง
    missPenalty: 0.20,      // MISS = ⚡ −20%
    baseDamage: 10,         // damage/ข้อถูก (base)
    attackCost: 8,          // ⚡ ที่ใช้ทุกครั้งที่กดตอบ (ทั้งถูก/ผิด)
    wrongPenalty: 18,       // ⚡ extra เมื่อตอบผิด (รวม attack = 26)
    streakMult: { 3:1.5, 5:2.0 },
    phases: [
      {
        id:1, name:'SCALE INVERTER', hp:100, cat:'magnitude',
        voidClaim:'เลขน้อย = หรี่ใช่ไหม?',
        // 5 ข้อ · 2-choice · จาก Bloom L1-L4 (magnitude scale)
        questions: [
          // L2 · concept
          { q:'ยิ่ง m น้อย (ติดลบมาก) · ดาวจะ?',
            a:['หรี่ลง', 'สว่างขึ้น'], c:1, cat:'magnitude', tier:1 },
          // L1 · recall
          { q:'Sirius มี m ประมาณ?',
            a:['−1.46 (สว่างที่สุดบนฟ้า)', '+1.98 (จาง)'], c:0, cat:'magnitude', tier:1 },
          // L1 · direct compare
          { q:'ดาว A: m=−2 vs ดาว B: m=+3 · ใครเห็นสว่างกว่า?',
            a:['A', 'B'], c:0, cat:'magnitude', tier:1 },
          // L4 · trap (ตา vs ปล่อยแสงจริง)
          { q:'ดาวที่สว่างปรากฎที่สุด = ปล่อยแสงจริงมากที่สุด · จริงไหม?',
            a:['จริง', 'ไม่จริง · อาจแค่อยู่ใกล้'], c:1, cat:'magnitude', tier:3 },
          // L4 · explanation
          { q:'ทำไม Deneb (ดาวสว่างจริง) ดูหรี่กว่า Sirius?',
            a:['Deneb อยู่ไกลกว่ามาก', 'Sirius ปล่อยแสงเยอะกว่า'], c:0, cat:'magnitude', tier:3 },
        ],
      },
      {
        id:2, name:'DISTANCE FAKER', hp:100, cat:'parallax',
        voidClaim:'ใกล้ = สว่างจริงใช่ไหม?',
        // 5 ข้อ · 2-choice · จาก Bloom L2-L6 (parallax · distance)
        questions: [
          // L2 · d = 1/p
          { q:'parallax p = 0.5″ · d = ? (ใช้ d = 1/p)',
            a:['0.5 pc', '2 pc'], c:1, cat:'parallax', tier:1 },
          // L4 · concept
          { q:'ดาวยิ่งใกล้ · มุม parallax จะเป็นอย่างไร?',
            a:['ใหญ่ขึ้น', 'เล็กลง'], c:0, cat:'parallax', tier:1 },
          // L3 · real star
          { q:'Proxima Centauri p = 0.77″ · d ≈ ?',
            a:['~0.77 pc', '~1.3 pc'], c:1, cat:'parallax', tier:2 },
          // L6 · extreme value
          { q:'parallax p = 0.001″ · d = ?',
            a:['100 pc', '1000 pc'], c:1, cat:'parallax', tier:3 },
          // L5 · evaluate method
          { q:'parallax วัดได้ดีกับดาวแบบไหน?',
            a:['ดาวใกล้มาก (<100 pc)', 'ดาวไกลมาก (>10,000 pc)'], c:0, cat:'parallax', tier:2 },
        ],
      },
      {
        id:3, name:'UNIT CONFUSER', hp:100, cat:'parallax',
        voidClaim:'parsec = เวลาใช่ไหม?',
        // 5 ข้อ · 2-choice · จาก Bloom L1-L5 (units + concept traps)
        questions: [
          // L1 · recall
          { q:'parsec ย่อมาจาก?',
            a:['parallax-second', 'parallel-sector'], c:0, cat:'parallax', tier:1 },
          // L1 · conversion
          { q:'1 parsec ≈ กี่ ปีแสง (ly)?',
            a:['1 ly', '3.26 ly'], c:1, cat:'parallax', tier:1 },
          // L2 · unit type
          { q:'parsec เป็นหน่วยของ?',
            a:['ระยะทาง', 'เวลา'], c:0, cat:'parallax', tier:2 },
          // L5 · evaluate VOID claim
          { q:'VOID: "parsec = เวลา" · ทำไมถึงผิด?',
            a:['parsec = หน่วยระยะ ไม่ใช่เวลา', 'VOID พูดถูก'], c:0, cat:'parallax', tier:2 },
          // L4 · synthesize (ใกล้-ไกล vs สว่างจริง)
          { q:'เห็นดาว 2 ดวงสว่างปรากฎเท่ากัน · ดวงไกลกว่า ปล่อยแสงจริง?',
            a:['น้อยกว่า', 'มากกว่า'], c:1, cat:'magnitude', tier:3 },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* FINAL CHASE (P14) · 3 Wave · แทน BOSS (legacy · จะเปลี่ยนเป็น WARP RUN) */
  /* ------------------------------------------------------------------ */
  finalChase: {
    page: 'p14',
    waves: [
      {
        name: 'Wave 1 · Scale Inverter',
        voidClaim: 'Polaris (m=2) หรี่กว่า Sirius (m=-1.46) ใช่ไหม?',
        options: [
          { star:'Polaris',  m:1.98, d:133, correct:false, reason:'m=2 หรี่กว่า m=-1.46 (Sirius)' },
          { star:'Sirius',   m:-1.46, d:2.64, correct:true,  reason:'Sirius สว่างที่สุดบนฟ้า · m=-1.46' },
          { star:'Betelgeuse', m:0.5, d:168, correct:false, reason:'ลำดับกลาง' },
        ],
        rightPhrase:'เลือกดาวที่ m น้อยที่สุด (สว่างปรากฎสุด)',
      },
      {
        name: 'Wave 2 · Distance Faker',
        voidClaim: 'Sirius สว่างที่สุด = ต้องเป็นดาวยิ่งใหญ่ที่สุด!',
        options: [
          { star:'Sirius',  m:-1.46, M:1.4,  correct:false, reason:'M=1.4 ธรรมดา · ใกล้เราเลยดูสว่าง' },
          { star:'Deneb',   m:1.25,  M:-8.4, correct:true,  reason:'M=-8.4 สว่างจริง 20,000× Sirius · แต่ไกล 802 pc' },
          { star:'Vega',    m:0.03,  M:0.58, correct:false, reason:'M ใกล้ Sun' },
        ],
        rightPhrase:'เทียบ absolute magnitude (M) · ยิ่งลบ = สว่างจริง',
      },
      {
        name: 'Wave 3 · Unit Confuser',
        voidClaim: '1 ly = 1 pc · หน่วยเหมือนกัน!',
        options: [
          { q:'1 pc = ? ly', correct:3.26, choices:[1, 3.26, 10, 0.3] },
          { q:'Proxima 1.3 pc = ? ly', correct:4.24, choices:[1.3, 4.24, 13, 0.4] },
          { q:'parsec ย่อจาก?', correct:'parallax-second', choices:['parallel-sector','parallax-second','particle-sec','parsec-time'] },
        ],
        rightPhrase:'1 pc ≈ 3.26 ly · parsec = หน่วยระยะ (ไม่ใช่เวลา)',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* STAR DATABASE · ใช้ทั้ง EP · ตัวเลขจริง                              */
  /* ------------------------------------------------------------------ */
  stars: [
    { name:'ดวงอาทิตย์',   m:-26.74, M:4.83,  d_pc:0.0000048, parallax:206265 },
    { name:'พระจันทร์เต็มดวง', m:-12.6, M:null, d_pc:null,     parallax:null },
    { name:'ดาวศุกร์',     m:-4.9,   M:null,  d_pc:null,       parallax:null },
    { name:'Sirius',       m:-1.46,  M:1.4,   d_pc:2.64,       parallax:0.379 },
    { name:'Canopus',      m:-0.74,  M:-5.7,  d_pc:94,         parallax:0.0106 },
    { name:'Arcturus',     m:-0.05,  M:-0.3,  d_pc:11.3,       parallax:0.0885 },
    { name:'Vega',         m:0.03,   M:0.58,  d_pc:7.68,       parallax:0.130 },
    { name:'Capella',      m:0.08,   M:-0.48, d_pc:13,         parallax:0.077 },
    { name:'Betelgeuse',   m:0.5,    M:-5.85, d_pc:168,        parallax:0.0060 },
    { name:'Altair',       m:0.77,   M:2.20,  d_pc:5.13,       parallax:0.195 },
    { name:'Aldebaran',    m:0.87,   M:-0.63, d_pc:20,         parallax:0.0500 },
    { name:'Spica',        m:1.04,   M:-3.55, d_pc:77,         parallax:0.0130 },
    { name:'Deneb',        m:1.25,   M:-8.4,  d_pc:802,        parallax:0.00125 },
    { name:'Polaris',      m:1.98,   M:-3.6,  d_pc:133,        parallax:0.0075 },
    { name:'ตาเปล่าสุด',    m:6,      M:null,  d_pc:null,       parallax:null },
    { name:'Proxima Centauri', m:11, M:15.5,  d_pc:1.30,       parallax:0.769 },
    { name:'Hubble deepest', m:31,   M:null,  d_pc:13e9,       parallax:null },
  ],

  // ตาราง m-M → d (ไม่ต้องคำนวณ · lookup อย่างเดียว)
  distanceModulusTable: [
    { mM:-5, d_pc:1 },
    { mM: 0, d_pc:10 },
    { mM: 5, d_pc:100 },
    { mM:10, d_pc:1000 },
    { mM:15, d_pc:10000 },
  ],

  /* ------------------------------------------------------------------ */
  /* BLOOM (P17)                                                        */
  /* ------------------------------------------------------------------ */
  bloomP17: {
    L1_remember:   3,
    L2_understand: 3,
    L3_apply:      3,
    L4_analyze:    2,
    L5_evaluate:   2,
    L6_create:     2
  },

  /* ------------------------------------------------------------------ */
  /* GAME BALANCE                                                       */
  /* ------------------------------------------------------------------ */
  balance: {
    baseEnergy:   10,
    speedBonusMs: 30000,
    speedBonus:   5,
    streakMult:   { 3: 1.5, 5: 2.0 },
    betPenalty:   { 100: 10, 75: 5, 50: 3, 25: 0 },
    startEnergy:  50,
    chaseTimerSec: 180,    // P13 · P14
    photonPerCorrect: 10,
    photonBetMult: { 100:3, 75:2, 50:1.5, 25:1 },
  },

  /* ------------------------------------------------------------------ */
  /* CORRUPTION (เก็บไว้เผื่อ fallback · ใช้ VOIDHUNTER แทนหลัก)           */
  /* ------------------------------------------------------------------ */
  corruption: {
    enabled: false,
    start: 0,
    perPage: 5,
    warnAt: 70,
    loseAt: 100,
    safeHavens: ['p00','p01','p03','p08','p10','p18','p19']
  },
};
