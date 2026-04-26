/* ===== COSMOS LOG · EP02 Config ===== */
/* แผนที่ลับกาแล็กซี · The Lost Map                                          */
/* Single source of truth สำหรับ: objectives · items · boss · corruption     */
/* · Bloom distribution                                                      */

window.EP_CONFIG = {
  id: 'ep02',
  title: 'แผนที่ลับกาแล็กซี',
  subtitle: 'The Lost Map · กาแล็กซีและกฎฮับเบิล',
  badge: { icon: '🌌', name: 'Galaxy Classifier' },
  duration: 100, // นาที
  indicator: 'ว 7.1 ม.4-6/1',

  /* ------------------------------------------------------------------ */
  /* PAGES                                                              */
  /* ------------------------------------------------------------------ */
  pages: [
    { id:'p00', file:'p00-howtoplay.html',title:'Tutorial · พบ VOID',     type:'story',      time:5 },
    { id:'p00b',file:'p00b-resources.html',title:'Tutorial · ทรัพยากร',    type:'story',      time:3 },
    { id:'p01', file:'p01-entry.html',    title:'Entry Ticket',         type:'puzzle',     time:3 },
    { id:'p02', file:'p02-continue.html', title:'โหลดทีม',               type:'setup',      time:2 },
    { id:'p03', file:'p03-signal.html',   title:'สัญญาณ VOID',          type:'story',      time:3 },
    { id:'p04', file:'p04-classify.html', title:'จำแนก 12 กาแล็กซี',     type:'puzzle',     time:7 },
    { id:'p05', file:'p05-council.html',  title:'Council · ตัดเหลือ 3', type:'mixed',      time:2 },
    { id:'p06', file:'p06-milkyway.html', title:'หา Sun ใน Milky Way',  type:'puzzle',     time:7 },
    { id:'p07', file:'p07-home.html',     title:'บ้านอยู่แขน Orion',      type:'story',      time:2 },
    { id:'p08', file:'p08-arrive.html',   title:'หอดูดาว · Dr.Hubble',   type:'story',      time:2 },
    { id:'p09', file:'p09-tuning.html',   title:'Tuning Fork Lab',       type:'puzzle',     time:15 },
    { id:'p10', file:'p10-hubble.html',   title:'ดร.ฮับเบิลสอน',          type:'story',      time:5 },
    { id:'p11', file:'p11-rotation.html', title:'Galaxy Rotation',       type:'puzzle',     time:8 },
    { id:'p12', file:'p12-boltwarp.html', title:'Bolt · Warp Drive',     type:'story',      time:2 },
    { id:'p13', file:'p13-chase.html',    title:'Ship Lock · Chase',     type:'puzzle',     time:7 },
    { id:'p14', file:'p14-boss.html',     title:'BOSS · VOID 3 Phase',   type:'mixed',      time:7 },
    { id:'p15', file:'p15-warp.html',     title:'Warp · Cliffhanger',    type:'story',      time:3 },
    { id:'p16', file:'p16-recap.html',    title:'Movie Recap',           type:'puzzle',     time:6 },
    { id:'p19', file:'p19-map.html',      title:'Journey Map · Post-test',type:'reflection',time:5 },
    { id:'p17', file:'p17-shop.html',     title:'ตลาด · ก่อนตีบอสสุดท้าย',  type:'setup',      time:5 },
    { id:'p17b',file:'p17b-finalboss.html',title:'BOSS สุดท้าย · 15 คลื่น',  type:'mixed',      time:10 },
    { id:'p18', file:'p18-log.html',      title:"Journal 3-2-1 · ปิดเล่ม",type:'reflection', time:4 },
  ],

  /* ------------------------------------------------------------------ */
  /* LEARNING OBJECTIVES · K · P · A                                    */
  /* ------------------------------------------------------------------ */
  objectives: {
    // Knowledge
    K1: { label:'จำแนกกาแล็กซี (E/S/SB/Irr)',        pages:['p04','p09'],      threshold:0.67 },
    K2: { label:'อธิบายโครงสร้างทางช้างเผือก',          pages:['p06','p07'],      threshold:0.85 },
    K3: { label:'ใช้ v=H₀D คำนวณระยะ',                  pages:['p13'],             threshold:0.67 },
    K4: { label:'แปลงหน่วย pc ↔ ly ↔ Mpc',             pages:['p10','p17'],      threshold:0.67 },
    // Process
    P1: { label:'สังเกต·จัดกลุ่ม',                       pages:['p04','p09'] },
    P2: { label:'ตั้งสมมติฐาน·ทำนาย',                    pages:['p09','p11'] },
    P3: { label:'วิเคราะห์หลักฐาน·trap detection',      pages:['p06','p16'] },
    P4: { label:'แก้โจทย์ปริมาณใต้เวลา',                 pages:['p13'] },
    // Attitude
    A1: { label:'ทำงานเป็นทีม·ฟังเสียงข้างน้อย',        pages:['p05','p09','p12'] },
    A2: { label:'กล้าวิพากษ์·ปกป้องความคิด',             pages:['p09','p14'] },
    A3: { label:'ไม่ย่อท้อใต้แรงกดดัน',                   pages:['p13'] },
    A4: { label:'จิตวิทยาศาสตร์·anti-misconception',    pages:['p14','p18'] },
  },

  /* ------------------------------------------------------------------ */
  /* COMBO ITEMS · ปรับให้ตรงกับโค้ดจริง (2026-04-24)                    */
  /* schema:                                                             */
  /*   grant: page id หลักที่ปลด · grantAlt: page อื่นที่ปลดได้           */
  /*   use:   page หลัก · useAlt: page อื่นที่ใช้ได้                      */
  /*   effect: human-readable · ของจริงอยู่ใน p13/p14 inline             */
  /* ------------------------------------------------------------------ */
  items: [
    {
      id:'hubbleLens',  icon:'🔍', name:'Hubble Lens',
      desc:'เลนส์ของ Edwin Hubble · เปิดคำใบ้ tuning fork · boost dmg ที่ BOSS',
      grant:'p04', grantCond:'จำแนกถูก ≥ 10/12',
      use:'p09',   useAlt:'p14',
      effect:'P09: revealHint · P14: damage ×2.0 (ใช้ 1 ครั้ง)'
    },
    {
      id:'decoder',     icon:'📡', name:'Signal Decoder',
      desc:'ถอดสัญญาณ VOID · boost dmg แรงสุดที่ BOSS',
      grant:'p06', grantCond:'ไม่ใช้ hint + จับ trap ครบ 2/2',
      use:'p14',
      effect:'P14: damage ×2.5 (ใช้ 1 ครั้ง)'
    },
    {
      id:'warpFuel',    icon:'⏱️', name:'Warp Fuel',
      desc:'พลังงานสำรอง · ลด time pressure · boost dmg ที่ BOSS',
      grant:'p11', grantCond:'จับ outerFast + flatCurve ใน try แรก (<3นาที)',
      use:'p13',   useAlt:'p14',
      effect:'P13: timer +60s · P14: damage ×1.5 (ใช้ 1 ครั้ง)'
    },
    {
      id:'shield',      icon:'🛡️', name:'Shield',
      desc:'โล่พลังงาน · กัน VOID beam 1 ลูก/ชิ้น',
      grant:'p02', grantCond:'เลือกเป็น start power-up',
      grantAlt:'p09', grantAltCond:'ทำนายถูก ≥ 2/3',
      use:'p14',
      effect:'P14: absorb VOID beam 1 ครั้ง (-10 energy ที่ block ได้)'
    },
  ],

  /* ------------------------------------------------------------------ */
  /* BOSS (P14)                                                         */
  /* ------------------------------------------------------------------ */
  boss: {
    page: 'p14',
    hp: 300,
    phases: [
      {
        hp: 100,
        claim: 'ทางช้างเผือกเป็นแค่แถบเมฆบนท้องฟ้า',
        counter: ['K2','P3'],
        evidence: [
          'Milky Way เป็นกาแล็กซีกังหันมีคาน ∅ 100,000 ปีแสง',
          'Sun อยู่แขน Orion · ห่างใจกลาง 26,000 ปีแสง',
          'ภาพ infrared เห็นโครงสร้างจานกังหัน'
        ]
      },
      {
        hp: 100,
        claim: 'กาแล็กซีทุกรูปร่างเหมือนกันหมด',
        counter: ['K1'],
        evidence: [
          'Hubble sequence: E0-E7 · S0 · Sa/Sb/Sc · SBa/SBb/SBc · Irr',
          'แต่ละชนิดต่างที่มวล·อายุ·อัตราการสร้างดาว',
          'Tuning fork ของ Edwin Hubble (1926)'
        ]
      },
      {
        hp: 100,
        claim: 'parsec คือหน่วยเวลา',
        counter: ['K4'],
        evidence: [
          'parsec = หน่วยระยะ · ไม่ใช่เวลา',
          '1 pc ≈ 3.26 ปีแสง',
          'มาจาก parallax second · วัดด้วยมุม parallax'
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  /* CORRUPTION METER                                                   */
  /* ------------------------------------------------------------------ */
  corruption: {
    enabled: true,
    start: 0,
    perPage: 5,         // +5% ต่อหน้า · รวม 19 หน้า ≈ 95%
    warnAt: 70,
    loseAt: 100,
    safeHavens: ['p00','p00b','p10','p18','p19']
  },

  /* ------------------------------------------------------------------ */
  /* BLOOM (P17) · กระจาย 15 ข้อ                                        */
  /* ------------------------------------------------------------------ */
  bloomP17: {
    L1_remember:   3,    // จำ
    L2_understand: 3,    // เข้าใจ
    L3_apply:      3,    // ใช้
    L4_analyze:    2,    // วิเคราะห์
    L5_evaluate:   2,    // ประเมิน
    L6_create:     2     // สร้าง
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
    startEnergy:  50,    // เริ่ม EP02 ด้วย 50 (carry-over EP01)
    chaseTimerSec: 180   // P13 chase 3 นาที
  }
};
