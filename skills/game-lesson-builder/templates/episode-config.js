/* ===== <SUBJECT> · EP<NN> Config Template =====
 * Copy this file to lessons/<subject>/ep<NN>/config.js and customize.
 * Reference implementation: lessons/astronomy/ep03/config.js
 */

window.EP_CONFIG = {
  id: 'ep<NN>',                      // 'ep01', 'ep02', etc
  title: '<TITLE>',                  // e.g. 'เสียงร้องจากอดีต'
  subtitle: '<SUBTITLE>',            // English transliteration · short tagline
  badge: { icon: '✨', name: '<BADGE NAME>' },  // e.g. 'Light Detective'
  duration: 100,                     // total minutes
  indicator: 'ว 7.1 ม.4-6/2',         // ตัวชี้วัดหลักสูตร

  /* ----------------------------------------------------------------- */
  /* PAGES · 20 หน้า (ปรับได้)                                         */
  /* ----------------------------------------------------------------- */
  pages: [
    // ACT 1 · HOOK
    { id:'p00', file:'p00-howtoplay.html', title:'Recap EP ก่อน · Intro', type:'story', time:2 },
    { id:'p01', file:'p01-entry.html',     title:'จดหมาย + Pre-test',    type:'reflection', time:4 },
    { id:'p02', file:'p02-sos.html',       title:'<EVENT>',              type:'story', time:2 },
    { id:'p02b', file:'p02b-genesis.html', title:'📓 MISSION GENESIS',   type:'story', time:3 },
    { id:'p03', file:'p03-join.html',      title:'<ANTAGONIST> · Setup', type:'setup', time:3 },

    // ACT 2A · MYSTERY 1
    { id:'p04', file:'p04-<concept1>.html',  title:'TEACH · <Concept1>',  type:'story', time:2 },
    { id:'p05', file:'p05-<lab1>.html',      title:'INVEST · <Lab1>',     type:'puzzle', time:4 },
    { id:'p06', file:'p06-<reveal1>.html',   title:'REVEAL · <Reveal1>',  type:'story', time:2 },

    // ACT 2B · MYSTERY 2
    { id:'p07', file:'p07-<concept2>.html', title:'TEACH · <Concept2>',   type:'story', time:2 },
    { id:'p08', file:'p08-<lab2>.html',     title:'INVEST · <Lab2>',      type:'puzzle', time:4 },
    { id:'p09', file:'p09-<dilem>.html',    title:'DILEM · <Antagonist Claim>', type:'mixed', time:3 },
    { id:'p09b', file:'p09b-<sub>.html',    title:'🔐 SUB · <Subpuzzle>', type:'puzzle', time:3 },
    { id:'p10', file:'p10-<cine>.html',     title:'CINE · <Story Beat>',  type:'story', time:2 },

    // ACT 3 · MIDPOINT
    { id:'p11', file:'p11-<midpoint>.html', title:'🌟 TEACH · Midpoint 5นาที', type:'story', time:5 },
    { id:'p12', file:'p12-<puzzle>.html',   title:'INVEST · <Puzzle>',    type:'puzzle', time:3 },

    // ACT 4 · CRISIS
    { id:'p13', file:'p13-<reveal>.html',   title:'CINE · <Full Reveal>', type:'story', time:2 },
    { id:'p14', file:'p14-<concept3>.html', title:'TEACH · <Concept3>',   type:'story', time:2 },
    { id:'p15', file:'p15-<climax>.html',   title:'🔥 INVEST · <Climax Activity>', type:'puzzle', time:4 },

    // ACT 5 · SHOP + CLIMAX + ENDING
    { id:'p16', file:'p16-recap.html',     title:'Movie Recap + 2 trap',  type:'puzzle', time:5 },
    { id:'p19', file:'p19-map.html',       title:'Post-test · Badge',     type:'reflection', time:5 },
    { id:'p17', file:'shop.html',          title:'🛍️ <Shop Name>',        type:'setup', time:3 },
    { id:'p18', file:'warprun.html',       title:'🔥 BOSS (climax)',      type:'mixed', time:7 },
    { id:'p19b', file:'p19b-journal.html', title:'📒 3-2-1 Journal',      type:'reflection', time:5 },
  ],

  /* ----------------------------------------------------------------- */
  /* LEARNING OBJECTIVES · K · P · A                                  */
  /* ----------------------------------------------------------------- */
  objectives: {
    K1: { label:'<KO 1>', pages:['p06','p07','p14'], threshold:0.85 },
    K2: { label:'<KO 2>', pages:['p04','p05','p13'], threshold:0.67 },
    K3: { label:'<KO 3>', pages:['p10','p14','p17'], threshold:0.67 },
    K4: { label:'<KO 4>', pages:['p09','p11','p13'], threshold:0.67 },
    P1: { label:'<PO 1 · scientific process>', pages:['p04','p05'] },
    P2: { label:'<PO 2>', pages:['p09'] },
    P3: { label:'<PO 3>', pages:['p07','p14','p16'] },
    A1: { label:'<AO 1 · attitude>', pages:['p03','p07','p12'] },
    A2: { label:'กล้าวิพากษ์ <antagonist>', pages:['p07','p09','p14'] },
    A3: { label:'ไม่ย่อท้อ · resolve story arc', pages:['p13','p15','p18'] },
    A4: { label:'จิตวิทยาศาสตร์ · anti-misconception', pages:['p14','p18'] },
  },

  /* ----------------------------------------------------------------- */
  /* MISCONCEPTIONS · target ใน boss + classify activities             */
  /* ----------------------------------------------------------------- */
  misconceptions: {
    M1: { label:'<misconception 1 statement>', target:['p07','p18'] },
    M2: { label:'<misconception 2>', target:['p09','p18'] },
    M3: { label:'<misconception 3>', target:['p14','p18'] },
  },

  /* ----------------------------------------------------------------- */
  /* ROLES · 4 หลัก + flex 2-6                                          */
  /* ----------------------------------------------------------------- */
  roles: [
    { id:'nav',  icon:'🧭', name:'Navigator',  desc:'<role description>',
      sees:['radar','starmap'], owns:['warp','cloak'] },
    { id:'eng',  icon:'🔬', name:'Engineer',   desc:'<role description>',
      sees:['table','spectrum'], owns:['mag-table'] },
    { id:'med',  icon:'💊', name:'Medic',      desc:'<role description>',
      sees:['vital','audio'], owns:['beacon-read'] },
    { id:'mech', icon:'🔧', name:'Mechanic',   desc:'<role description>',
      sees:['photon-bank','timer'], owns:['photon','beacon-send'] },
  ],
  roleFlex: {
    2: { nav:['nav','mech'], eng:['eng','med'] },
    3: { nav:['nav'], eng:['eng','med'], mech:['mech'] },
    4: null,
    5: { nav:['nav'], eng:['eng'], med:['med'], mech:['mech'], nav2:['nav'] },
    6: { nav:['nav'], eng:['eng'], med:['med'], mech:['mech'], nav2:['nav'], eng2:['eng'] },
  },

  /* ----------------------------------------------------------------- */
  /* PHOTON · global currency (✦)                                      */
  /* ----------------------------------------------------------------- */
  photon: {
    start: 20,
    targets: {
      warp:   { cost:100, icon:'🚀', name:'Warp Jump',
                desc:'กระโดดข้ามระยะ · meter +20%' },
      beacon: { cost:300, icon:'💌', name:'<Beacon Name>',
                desc:'<beacon effect> · meter -30%' },
      cloak:  { cost:50,  icon:'🌑', name:'Stealth Cloak',
                desc:'ดับแสงซ่อน 1 ฉาก' },
    },
    earn: {
      // page id → max photon ที่ได้
      p02:20, p04:30, p05:80, p06:50, p07:30, p09:80, p11:80, p13:60, p16:40, p17:80,
    },
  },

  /* ----------------------------------------------------------------- */
  /* VOIDHUNTER (or other antagonist) METER                            */
  /* ----------------------------------------------------------------- */
  voidhunter: {
    start: 60,
    tickPerPage: -5,
    safeHavens: ['p00','p01','p03','p08','p10','p18','p19'],
    warpBonus: +20,
    beaconPenalty: -30,
    cloakFreeze: true,
    wrongAnswer: -10,
    loseAt: 0,
  },

  /* ----------------------------------------------------------------- */
  /* COIN · 🪙 · perfect stage rewards                                  */
  /* ----------------------------------------------------------------- */
  coin: {
    start: 0,
    perfectBonus: {
      p05: 20,   // <Lab1> perfect
      p08: 30,   // <Lab2> perfect
      p12: 20,   // mid puzzle perfect
      p15: 30,   // climax activity perfect
      p16: 20,   // recap perfect (6/6 + 2/2 trap)
      // boss + mystery box rewards handled in warprun.html
    },
  },

  /* ----------------------------------------------------------------- */
  /* SHOP · items ก่อน boss                                             */
  /* ----------------------------------------------------------------- */
  shop: {
    items: [
      { id:'parallaxLensPro', icon:'🔭', name:'<Item 1 · category boost>',
        desc:'Q category 1 · damage ×2 · 3 ครั้ง',
        cost:40, type:'boost', cat:'<cat1>', mult:2, uses:3 },
      { id:'galacticAlmanac', icon:'📜', name:'<Item 2>',
        desc:'Q category 2 · damage ×2 · 3 ครั้ง',
        cost:40, type:'boost', cat:'<cat2>', mult:2, uses:3 },
      { id:'precisionScope',  icon:'🎯', name:'<Item 3>',
        desc:'Random Q · damage ×2 · 2 ครั้ง',
        cost:60, type:'boost', cat:'any',    mult:2, uses:2 },
      { id:'shieldPlus',      icon:'🛡️', name:'<Item 4 · Shield>',
        desc:'block antagonist shot · 2 ครั้ง',
        cost:80, type:'passive',             uses:2 },
      { id:'cloak',           icon:'🌑', name:'Cloak',
        desc:'skip 1 Q (auto-pass)',
        cost:30, type:'oneshot',             uses:1 },
      { id:'chronos',         icon:'⏱️', name:'Chronos Booster',
        desc:'antagonist charge 15 วิ (แทน 10) · ถาวร',
        cost:100, type:'passive',            uses:Infinity },
      { id:'beaconAmp',       icon:'💌', name:'Beacon Amplifier',
        desc:'ลด beacon cost 300✦ → 200✦',
        cost:50, type:'passive',             uses:1 },
    ],
  },

  /* ----------------------------------------------------------------- */
  /* WARP RUN · Boss · 3 phases                                        */
  /* ----------------------------------------------------------------- */
  warpRun: {
    totalHP: 300,
    vhChargeSec: 10,
    vhDamage: 30,
    vhMeterPenalty: 10,
    baseDamage: 10,
    attackCost: 8,
    wrongPenalty: 18,
    streakMult: { 3:1.5, 5:2.0 },
    phases: [
      {
        id:1, name:'<PHASE 1 NAME>', hp:100, cat:'<cat1>',
        voidClaim:'<antagonist false claim 1>',
        questions: [
          // 5 ข้อ · 2-choice ดีที่สุด · cover misconception ของ phase นี้
          { q:'<question>', a:['<choice A>','<choice B>'], c:0, cat:'<cat1>', tier:1 },
          { q:'<question>', a:['<choice A>','<choice B>'], c:1, cat:'<cat1>', tier:1 },
          { q:'<question>', a:['<choice A>','<choice B>'], c:0, cat:'<cat1>', tier:2 },
          { q:'<question>', a:['<choice A>','<choice B>'], c:1, cat:'<cat1>', tier:3 },
          { q:'<question>', a:['<choice A>','<choice B>'], c:0, cat:'<cat1>', tier:3 },
        ],
      },
      // ... phase 2, 3 (same shape)
    ],
  },

};
