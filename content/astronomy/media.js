// ═══════════════════════════════════════════════════════════════════
// Content Pack: Media (Astronomy · COSMOS LOG · Season 1)
// ═══════════════════════════════════════════════════════════════════
// ทุกแผน (EP01–EP08) มีโครงสร้างเหมือนกัน:
//   • folder       : 'lessons/astronomy/ep0X'
//   • Section 1    : 🚀 Launcher (index.html · นักเรียนเห็น)
//   • Section 2    : 📖 หน้าบทเรียน (teacherOnly · ครูเท่านั้น)
//   • Section 3    : 🛠 ทรัพยากรเสริม (teacherOnly · ครูเท่านั้น)
// ─────────────────────────────────────────────────────────────────────
// teacherOnly: true  → renderTools() ของนักเรียน skip ไม่แสดง
//                       Teacher Dashboard ยังแสดงครบทุก item
// นักเรียนต้องเปิด index.html (launcher) แล้วรันตามลำดับหน้าจาก launcher
// ═══════════════════════════════════════════════════════════════════

const _ASTRO_LAUNCHER = (epId, title, desc, meta, chips) => ({
  cls:'sim', no:'EP', t:`${epId} · เริ่มเรียน (Launcher)`, file:'index.html', d:desc, meta, chips
});
const _ASTRO_PAGE = (no, title, file, type, time) => {
  const clsMap = {
    story:'sim', puzzle:'sim', mixed:'sim', setup:'sim',
    reflection:'mj', cover:'info'
  };
  const cls = clsMap[type] || 'sim';
  const meta = time ? `~${time} นาที` : '';
  return { cls, no, t:title, file, d:type ? `ประเภท: ${type}` : '', meta, teacherOnly:true };
};

window.KP_PLAN_MEDIA = {
  // ─────────────────────────────────────────────────────────────────
  // EP01 · The Collision · 19 หน้า · G1 (story-only · no config.js)
  // ─────────────────────────────────────────────────────────────────
  1: {
    folder: 'lessons/astronomy/ep01',
    title: 'แผน 1 — EP01 · The Collision · กำเนิดเอกภพ',
    meta: 'ดาราศาสตร์ · ม.5 · คาบ 1–2 · COSMOS LOG · Season 1 · 19 หน้า',
    sections: [
      { title:'📜 ก่อนเริ่มงานวิจัย (ทำตามลำดับ)', items:[
        { cls:'mj', no:'R0', t:'หนังสือยินยอมเข้าร่วมการวิจัย', file:'../research/consent.html',
          d:'อ่านและเลือกความยินยอม · ทำครั้งเดียว · ปฏิเสธได้',
          meta:'~3 นาที · ทำก่อนเป็นอันดับแรก',
          chips:[['k','Consent'],['k','จริยธรรมวิจัย']] },
        { cls:'mj', no:'R1', t:'IMI · แบบสอบถามแรงจูงใจ (ก่อนเรียน)', file:'../research/imi-21.html?phase=pre',
          d:'21 ข้อ · 3 ด้าน (Autonomy · Competence · Relatedness)',
          meta:'~5 นาที · ทำก่อนเริ่ม EP01',
          chips:[['k','IMI Pre'],['k','21 ข้อ'],['k','SDT']] }
      ]},
      { title:'📋 FT-01 · Pre-test หลัก (ทำก่อนเรียน · 20 ข้อ)', items:[
        { cls:'sim', no:'FT', t:'FT-01 · Pre-test หลัก (Baseline)', file:'../ft01-pretest.html',
          d:'20 ข้อ · ครอบคลุม EP01-EP08 · เก็บ baseline สำหรับคำนวณ Hake\'s gain',
          meta:'~15 นาที · ทำครั้งเดียวก่อนเริ่ม Season 1',
          chips:[['k','Pre-test'],['k','20 ข้อ'],['k','ทำก่อน EP01']] }
      ]},
      { title:'🚀 Launcher', items:[
        _ASTRO_LAUNCHER('EP01','The Collision','หน้า launcher EP01 · เลือกหน้าได้ทั้งหมด','19 หน้า · ~50 นาที',
          [['k','Big Bang'],['k','CMB'],['k','13.8 พันล้านปี']])
      ]},
      { title:'📖 หน้าบทเรียน (19 หน้า)', items:[
        _ASTRO_PAGE('01','ทางเข้า COSMOS LOG','p01-pretest.html','story'),
        _ASTRO_PAGE('02','ทีมสำรวจ · ตัวละคร 4 คน','p02-team.html','story'),
        _ASTRO_PAGE('03','The Collision · จำลองการชน','p03-collision.html','puzzle'),
        _ASTRO_PAGE('04','Debris · เศษซากเอกภพ','p04-debris.html','story'),
        _ASTRO_PAGE('05','อายุเอกภพ · 13.8 Gyr','p05-age.html','story'),
        _ASTRO_PAGE('06','Research · ค้นคว้า','p06-research.html','puzzle'),
        _ASTRO_PAGE('07','CMB · รังสีไมโครเวฟพื้นหลัง','p07-cmb.html','story'),
        _ASTRO_PAGE('08','Arrive · ถึงจุดหมาย','p08-arrive.html','story'),
        _ASTRO_PAGE('09','Balloon · เอกภพขยายตัว','p09-balloon.html','puzzle'),
        _ASTRO_PAGE('10','Hubble · ดร.ฮับเบิล','p10-hubble.html','story'),
        _ASTRO_PAGE('11','Timeline · ลำดับเหตุการณ์','p11-timeline.html','puzzle'),
        _ASTRO_PAGE('12','Galaxy · ทางช้างเผือก','p12-galaxy.html','story'),
        _ASTRO_PAGE('13','Ship Lock','p13-shiplock.html','puzzle'),
        _ASTRO_PAGE('14','VOID · ปริศนา','p14-void.html','story'),
        _ASTRO_PAGE('15','Warp · กระโดด','p15-warp.html','story'),
        _ASTRO_PAGE('16','Map · แผนที่ทางช้างเผือก','p16-map.html','puzzle'),
        _ASTRO_PAGE('16b','Review · ทบทวน','p16-review.html','reflection'),
        _ASTRO_PAGE('17','Exercise · แบบฝึกหัด','p17-exercise.html','puzzle'),
        _ASTRO_PAGE('17b','Exit · ออก','p27-journal.html','reflection')
      ]},
      { title:'🛠 ทรัพยากรเสริม', items:[
        { cls:'info', no:'SH', t:'shared/book.css · book.js · particles.js', file:'',
          d:'ใช้ book.js เป็น page-flow · ไม่มี config.js (แตกต่างจาก EP02–EP08)' }
      ]}
    ],
    linkOut:[
      'EP01 = G1 (story-only) · ไม่มี config.js · ไม่มี Firebase sync',
      'ใช้เป็นบทเปิด season · ปูเรื่อง Big Bang · CMB · อายุเอกภพ',
      'Stylesheet: book.css · Page-flow: book.js'
    ]
  },

  // ─────────────────────────────────────────────────────────────────
  // EP02 · Galaxy · 23 หน้า · G1.5 (Game Layer first gen)
  // ─────────────────────────────────────────────────────────────────
  2: {
    folder: 'lessons/astronomy/ep02',
    title: 'แผน 2 — EP02 · เสียงเรียกจากกาแล็กซี · ระบบดาว',
    meta: 'ดาราศาสตร์ · ม.5 · คาบ 3–4 · COSMOS LOG · Season 1 · 23 หน้า · Game Layer',
    sections: [
      { title:'🚀 Launcher', items:[
        _ASTRO_LAUNCHER('EP02','Galaxy + VOID Boss','หน้า launcher · มี Game Layer + boss 2 ตัว','23 หน้า · ~100 นาที',
          [['k','Galaxy'],['k','Tuning Fork'],['k','BOSS']])
      ]},
      { title:'📖 หน้าบทเรียน (23 หน้า)', items:[
        _ASTRO_PAGE('00','Tutorial · พบ VOID','p00-howtoplay.html','story',5),
        _ASTRO_PAGE('00b','Tutorial · ทรัพยากร','p00b-resources.html','story',3),
        _ASTRO_PAGE('01','Entry Ticket','p01-pretest.html','puzzle',3),
        _ASTRO_PAGE('02','โหลดทีม','p02-continue.html','setup',2),
        _ASTRO_PAGE('03','สัญญาณ VOID','p03-signal.html','story',3),
        _ASTRO_PAGE('04','จำแนก 12 กาแล็กซี','p04-classify.html','puzzle',7),
        _ASTRO_PAGE('05','Council · ตัดเหลือ 3','p05-council.html','mixed',2),
        _ASTRO_PAGE('06','หา Sun ใน Milky Way','p06-milkyway.html','puzzle',7),
        _ASTRO_PAGE('07','บ้านอยู่แขน Orion','p07-home.html','story',2),
        _ASTRO_PAGE('08','หอดูดาว · Dr.Hubble','p08-arrive.html','story',2),
        _ASTRO_PAGE('09','Tuning Fork Lab','p09-tuning.html','puzzle',15),
        _ASTRO_PAGE('10','ดร.ฮับเบิลสอน','p10-hubble.html','story',5),
        _ASTRO_PAGE('11','Galaxy Rotation','p11-rotation.html','puzzle',8),
        _ASTRO_PAGE('12','Bolt · Warp Drive','p12-boltwarp.html','story',2),
        _ASTRO_PAGE('13','Ship Lock · Chase','p13-chase.html','puzzle',7),
        _ASTRO_PAGE('14','BOSS · VOID 3 Phase','p14-boss.html','mixed',7),
        _ASTRO_PAGE('15','Warp · Cliffhanger','p15-warp.html','story',3),
        _ASTRO_PAGE('16','Movie Recap','p16-recap.html','puzzle',6),
        _ASTRO_PAGE('17','Bloom · Scene','p17-bloom.html','story'),
        _ASTRO_PAGE('17a','ตลาด · ก่อนตีบอสสุดท้าย','p17-shop.html','setup',5),
        _ASTRO_PAGE('17b','BOSS สุดท้าย · 15 คลื่น','p17b-finalboss.html','mixed',10),
        _ASTRO_PAGE('18','Journal 3-2-1 · ปิดเล่ม','p27-journal.html','reflection',4),
        _ASTRO_PAGE('19','Journey Map · Post-test','p19-map.html','reflection',5)
      ]},
      { title:'🛠 ทรัพยากรเสริม', items:[
        { cls:'info', no:'SH', t:'Game Layer (G1.5)', file:'',
          d:'shared modules: game.js · items.js · corruption.js · leaderboard.js · boss.js · teacher-cards.js' },
        { cls:'info', no:'AS', t:'galaxy/ asset folder', file:'',
          d:'ภาพ + เสียง: Boss images · Hubble tuning fork · warp drive · Milky Way' }
      ]}
    ],
    linkOut:[
      'EP02 = G1.5 ใช้ Game Layer รุ่นแรก (game/items/corruption/leaderboard/boss/teacher-cards)',
      'Boss 2 ตัว: p14-boss (3 phase) + p17b-finalboss (15 คลื่น)',
      'มี shop + tuning fork lab · ดร.ฮับเบิล intro'
    ]
  },

  // ─────────────────────────────────────────────────────────────────
  // EP03 · เสียงร้องจากอดีต · 24 หน้า · G2 (Firebase + 5-องก์)
  // ─────────────────────────────────────────────────────────────────
  3: {
    folder: 'lessons/astronomy/ep03',
    title: 'แผน 3 — EP03 · เสียงร้องจากอดีต · พาแรลแลกซ์/ระยะดาว',
    meta: 'ดาราศาสตร์ · ม.5 · คาบ 5–6 · COSMOS LOG · Season 1 · 24 หน้า · Firebase sync · 5-องก์',
    sections: [
      { title:'🚀 Launcher', items:[
        _ASTRO_LAUNCHER('EP03','VOIDHUNTER · Adventure','5-องก์ Adventure model · WARP RUN boss','24 หน้า · ~70 นาที',
          [['k','Parallax'],['k','Stellar Magnitude'],['k','BOSS']])
      ]},
      { title:'📖 หน้าบทเรียน (24 หน้า)', items:[
        _ASTRO_PAGE('00','Recap EP02 · Intro','p00-howtoplay.html','story',2),
        _ASTRO_PAGE('01','จดหมาย + Pre-test','p01-pretest.html','reflection',4),
        _ASTRO_PAGE('02','SOS "ARYA" · decode','p02-sos.html','story',2),
        _ASTRO_PAGE('02b','📓 MISSION GENESIS','p02b-genesis.html','story',3),
        _ASTRO_PAGE('03','VOIDHUNTER · Password','p03-join.html','setup',3),
        _ASTRO_PAGE('04','TEACH · Parallax','p04-parallax.html','story',2),
        _ASTRO_PAGE('05','INVEST · วัด 3 ดาว','p05-parallax10.html','puzzle',4),
        _ASTRO_PAGE('06','REVEAL · 400 ปีแสง','p06-magnitude.html','story',2),
        _ASTRO_PAGE('07','TEACH · Hipparchus · m','p07-council.html','story',2),
        _ASTRO_PAGE('08','INVEST · เรียง 5 ดาว','p08-arrive.html','puzzle',4),
        _ASTRO_PAGE('09','DILEM · VOID ดาว A vs B','p09-absolute.html','mixed',3),
        _ASTRO_PAGE('09b','🔐 MASTER DECODE · MAP','p09b-decode.html','puzzle',3),
        _ASTRO_PAGE('10','CINE · กล่องพ่อ (ล็อก)','p10-hubble.html','story',2),
        _ASTRO_PAGE('11','🌟 TEACH · Midpoint 5นาที','p11-distance.html','story',5),
        _ASTRO_PAGE('12','INVEST · ปลดรหัส DENEB','p12-father.html','puzzle',3),
        _ASTRO_PAGE('13','CINE · เสียงพ่อเต็ม','p13-maze.html','story',2),
        _ASTRO_PAGE('14','TEACH · Triangulation','p14-chase.html','story',2),
        _ASTRO_PAGE('15','🔥 INVEST · Stellar Maze','p15-payoff.html','puzzle',4),
        _ASTRO_PAGE('16','Movie Recap + 2 trap','p16-recap.html','puzzle',5),
        _ASTRO_PAGE('17','🛍️ Hubble Trading Post','shop.html','setup',3),
        _ASTRO_PAGE('18','🔥 WARP RUN (climax · BOSS)','warprun.html','mixed',7),
        _ASTRO_PAGE('19','Post-test · Badge','p19-map.html','reflection',5),
        _ASTRO_PAGE('19b','📒 3-2-1 Journal','p27-journal.html','reflection',5),
        _ASTRO_PAGE('JN','Join · ร่วมภารกิจ','join.html','setup')
      ]},
      { title:'🛠 ทรัพยากรเสริม', items:[
        { cls:'info', no:'SH', t:'G2 Stack (Firebase sync)', file:'',
          d:'modules: ep03-boot · firebase-config · sync-client · role-view · photon · pace-client · voidhunter · calculator · transition · touch-drag' }
      ]}
    ],
    linkOut:[
      'EP03 = G2 (เริ่ม Firebase) · 5-องก์ Adventure (RACE → FORGE → FIGHT)',
      'WARP RUN boss · ใช้ Chain/Gate/Submit/Coin/ShopItems modules',
      'รายละเอียด: HANDOFF_ep03.md'
    ]
  },

  // ─────────────────────────────────────────────────────────────────
  // EP04 · ยักษ์แดง · 27 หน้า · G2 (4-องก์ Lab-build)
  // ─────────────────────────────────────────────────────────────────
  4: {
    folder: 'lessons/astronomy/ep04',
    title: 'แผน 4 — EP04 · วันสุดท้ายของยักษ์แดง · วิวัฒนาการดาว',
    meta: 'ดาราศาสตร์ · ม.5 · คาบ 7–8 · COSMOS LOG · Season 1 · 27 หน้า · Firebase sync · 4-องก์ Lab-build',
    sections: [
      { title:'🚀 Launcher', items:[
        _ASTRO_LAUNCHER('EP04','Stellar Evolution + Gravity Ascent','4-องก์ Lab-build · GRAVITY ASCENT boss · cliffhanger → EP05','27 หน้า · ~80 นาที',
          [['k','OBAFGKM'],['k','Stellar Evolution'],['k','BOSS']])
      ]},
      { title:'📖 หน้าบทเรียน (27 หน้า)', items:[
        _ASTRO_PAGE('00','EP04 Cover · Recap','p00-cover.html','story',2),
        _ASTRO_PAGE('01','Pre-test · 4-choice','p01-pretest.html','reflection',6),
        _ASTRO_PAGE('02','ถึง local star · พบ SOS','p02-arrival.html','story',3),
        _ASTRO_PAGE('03','เตือนภัย · วางแผน · บทบาท','p03-plan.html','setup',3),
        _ASTRO_PAGE('04','Lab 1.1 · Spectrum Slider','p04-spectrum-slider.html','puzzle',4),
        _ASTRO_PAGE('05','Lab 1.2 · ลากดาว 7 สี','p05-drag-match.html','puzzle',5),
        _ASTRO_PAGE('06','OBAFGKM Theory','p06-obafgkm.html','story',3),
        _ASTRO_PAGE('07','🎁 Group by Code · Black Dwarf','p07-group-code.html','puzzle',4),
        _ASTRO_PAGE('08','Group by Temperature','p08-group-temp.html','puzzle',3),
        _ASTRO_PAGE('09','สรุปสีของเส้นทาง','p09-color-summary.html','story',2),
        _ASTRO_PAGE('10','เคน · ทีนี้แรงโน้มถ่วง','p10-bridge-mass.html','story',2),
        _ASTRO_PAGE('11','เนบิวลา · ต้นกำเนิดดาว','p11-nebula.html','story',2),
        _ASTRO_PAGE('12','Proto Star · มวลตัดสิน','p12-protostar.html','puzzle',3),
        _ASTRO_PAGE('13','Lab 2 · 5 เส้นทางตามมวล','p13-mass-tracks.html','puzzle',6),
        _ASTRO_PAGE('14','🎁 Evolution Order','p14-evo-order.html','puzzle',4),
        _ASTRO_PAGE('15','Match · มวล → วาระสุดท้าย','p15-mass-endpoint.html','puzzle',4),
        _ASTRO_PAGE('16','🎮 Mini-game วิวัฒนาการ','p16-evo-game.html','puzzle',3),
        _ASTRO_PAGE('17','📓 ห้องวิจัยพ่อ · กำลังไหม้','p17-fatherlab.html','story',4),
        _ASTRO_PAGE('18','Star Map Reveal','p18-starmap.html','story',3),
        _ASTRO_PAGE('19','⚠ VOID FACE-TO-FACE','p19-voidface.html','story',3),
        _ASTRO_PAGE('20','🎁 Path Selection · 4 เส้นทาง','p20-path-select.html','puzzle',5),
        _ASTRO_PAGE('21','Post-test · 4-choice','p21-posttest.html','reflection',5),
        _ASTRO_PAGE('22','Story Sequencer · เรียงเหตุการณ์','p22-sequencer.html','puzzle',3),
        _ASTRO_PAGE('23','🛒 Voyager Cache · Shop','p23-shop.html','setup',3),
        _ASTRO_PAGE('24','🔥 GRAVITY ASCENT (BOSS)','p24-boss.html','mixed',6),
        _ASTRO_PAGE('25','💫 Frame Dragging · กู้พ่อ','p25-rescue.html','story',3),
        _ASTRO_PAGE('26','📋 Journal 3-2-1 · Badge','p27-journal.html','reflection',4),
        _ASTRO_PAGE('JN','Join · ร่วมภารกิจ','join.html','setup')
      ]},
      { title:'🛠 ทรัพยากรเสริม', items:[
        { cls:'info', no:'SH', t:'G2 Stack + Lab-build', file:'',
          d:'modules: ep04-boot · firebase-config · sync-client · role-view · photon · mission-brief · mystery-box · starfield · audio · touch-drag' }
      ]}
    ],
    linkOut:[
      'EP04 = G2 · 4-องก์ Lab-build · 5 mass tracks · Mystery Box 5 จุด',
      'GRAVITY ASCENT boss · cliffhanger → EP05 ดวงอาทิตย์',
      'รายละเอียด: HANDOFF_ep04.md'
    ]
  },

  // ─────────────────────────────────────────────────────────────────
  // EP05 · ดวงอาทิตย์ · 46 หน้า · G2 v9 (largest of season)
  // ─────────────────────────────────────────────────────────────────
  5: {
    folder: 'lessons/astronomy/ep05',
    title: 'แผน 5 — EP05 · หัวใจที่เต้นผิดจังหวะ · ดวงอาทิตย์',
    meta: 'ดาราศาสตร์ · ม.5 · คาบ 9–11 · COSMOS LOG · Season 1 · 46 หน้า · Firebase sync · v9 RACE→FORGE→FIGHT',
    sections: [
      { title:'🚀 Launcher', items:[
        _ASTRO_LAUNCHER('EP05','Solar Storm + Power Forge','46 หน้า v9 · POWER FORGE · 5 RECALL CHECKS · HUD 6 ช่อง','46 หน้า · ~150 นาที',
          [['k','ดวงอาทิตย์'],['k','POWER FORGE'],['k','BOSS']])
      ]},
      { title:'📖 หน้าบทเรียน · ส่วนเปิด (5 หน้า)', items:[
        _ASTRO_PAGE('00','EP05 Cover · VOID Returns','p00-cover.html','story',2),
        _ASTRO_PAGE('01','Pre-test · 8 ข้อ M1-M7','p01-pretest.html','reflection',6),
        _ASTRO_PAGE('02','พ่อเปิดภารกิจ · HELION CORES','p02-intro-quest.html','story',3),
        _ASTRO_PAGE('03','WARP · กำเนิดระบบสุริยะ + เขต','p03-origin-zones.html','puzzle',5),
        _ASTRO_PAGE('04','ถึงดวงอาทิตย์ · เลือก role','p04-dive-plan.html','setup',3)
      ]},
      { title:'🌞 6 ชั้นบรรยากาศ · A·B·C ต่อชั้น (24 หน้า)', items:[
        _ASTRO_PAGE('05a','🔥 CORE · A · ENGAGE','p05a-core-engage.html','story',4),
        _ASTRO_PAGE('05b','🔥 CORE · B · EXPLORE chamber','p05b-core-explore.html','puzzle',6),
        _ASTRO_PAGE('05c','🔥 CORE · C · GATE Reactor Equation','p05c-core-gate.html','mixed',6),
        _ASTRO_PAGE('06br','🛰️ BRIDGE 1 · CORE → RADIATIVE','p06-bridge.html','story',2),
        _ASTRO_PAGE('06a','🌫️ RADIATIVE · A · ENGAGE','p06a-radiative-engage.html','story',4),
        _ASTRO_PAGE('06b','🌫️ RADIATIVE · B · EXPLORE','p06b-radiative-explore.html','puzzle',6),
        _ASTRO_PAGE('06c','🌫️ RADIATIVE · C · GATE Photon Cipher','p06c-radiative-gate.html','mixed',6),
        _ASTRO_PAGE('07br','🛰️ BRIDGE 2 · RADIATIVE → CONVECTIVE','p07-bridge.html','story',2),
        _ASTRO_PAGE('07a','🌊 CONVECTIVE · A · ENGAGE','p07a-convective-engage.html','story',4),
        _ASTRO_PAGE('07b','🌊 CONVECTIVE · B · EXPLORE climb','p07b-convective-explore.html','puzzle',6),
        _ASTRO_PAGE('07c','🌊 CONVECTIVE · C · GATE Cycle Builder','p07c-convective-gate.html','mixed',6),
        _ASTRO_PAGE('08br','🛰️ BRIDGE 3 · CONVECTIVE → PHOTOSPHERE','p08-bridge.html','story',2),
        _ASTRO_PAGE('08a','⚫ SUNSPOT · A · ENGAGE','p08a-sunspot-engage.html','story',4),
        _ASTRO_PAGE('08b','⚫ SUNSPOT · B · EXPLORE field','p08b-sunspot-explore.html','puzzle',6),
        _ASTRO_PAGE('08c','⚫ SUNSPOT · C · GATE Forensics','p08c-sunspot-gate.html','mixed',6),
        _ASTRO_PAGE('09br','🛰️ BRIDGE 4 · PHOTOSPHERE → CHROMOSPHERE','p09-bridge.html','story',2),
        _ASTRO_PAGE('09a','🔴 CHROMO · A · ENGAGE Flare','p09a-flare-engage.html','story',4),
        _ASTRO_PAGE('09b','🔴 CHROMO · B · EXPLORE dodge','p09b-flare-explore.html','puzzle',6),
        _ASTRO_PAGE('09c','🔴 CHROMO · C · GATE Chronometer','p09c-flare-gate.html','mixed',6),
        _ASTRO_PAGE('10br','🛰️ BRIDGE 5 · CHROMO → CORONA','p10-bridge.html','story',2),
        _ASTRO_PAGE('10a','🌌 CORONA · A · ENGAGE Paradox','p10a-corona-engage.html','story',4),
        _ASTRO_PAGE('10b','🌌 CORONA · B · EXPLORE + Token','p10b-corona-explore.html','puzzle',6),
        _ASTRO_PAGE('10c','🌌 CORONA · C · GATE HELION KEY','p10c-corona-gate.html','mixed',6)
      ]},
      { title:'⚡ ปรากฏการณ์ + Boss (17 หน้า)', items:[
        _ASTRO_PAGE('11','VOID ARRIVED · สนามแม่เหล็ก','p11-magnetic-bridge.html','story',2),
        _ASTRO_PAGE('12','250 จุด · เกิน peak','p12-sunspot-cycle.html','story',2),
        _ASTRO_PAGE('13','5 tier · ทะลุ Solar Max','p13-activity-slider.html','puzzle',3),
        _ASTRO_PAGE('14','🎁 5 ปรากฏการณ์ · recover','p14-phenomena-tabs.html','puzzle',6),
        _ASTRO_PAGE('15','🎁 ลำดับเหตุการณ์','p15-event-order.html','puzzle',4),
        _ASTRO_PAGE('16','แยก Flare vs CME · M4','p16-flare-vs-cme.html','puzzle',4),
        _ASTRO_PAGE('17','อิทธิพลต่อโลก · 4 ระดับ','p17-earth-impact.html','puzzle',3),
        _ASTRO_PAGE('18','📓 บันทึกพ่อ · L1 reveal','p18-fatherlog.html','story',4),
        _ASTRO_PAGE('19','🎁 Habitable Zone · 8 ดาวเคราะห์','p19-habitable-zone.html','puzzle',5),
        _ASTRO_PAGE('20','⚠ VOID FACE · taunt Cores','p20-voidface.html','story',3),
        _ASTRO_PAGE('21','🎁 เลือก deflector · simulate 4','p21-deflect-path.html','puzzle',5),
        _ASTRO_PAGE('22','Post-test + gain','p22-posttest.html','reflection',5),
        _ASTRO_PAGE('23','Story Sequencer','p23-sequencer.html','puzzle',3),
        _ASTRO_PAGE('24','🔧 Power Forge · ปลดล็อกพลัง','p24-shop.html','puzzle',5),
        _ASTRO_PAGE('24b','🛒 Voyager Cache','p24-shopb.html','setup',3),
        _ASTRO_PAGE('25','🔥 SOLAR STORM (BOSS)','p25-boss.html','mixed',7),
        _ASTRO_PAGE('26','🌌 4 endings','p26-rescue.html','story',3),
        _ASTRO_PAGE('27','🏆 Badge + 3-2-1','p27-journal.html','reflection',4)
      ]},
      { title:'🛠 ทรัพยากรเสริม', items:[
        { cls:'info', no:'SH', t:'G2 Stack + assets/', file:'',
          d:'modules: ep05-boot · firebase-config · sync-client · role-view · photon · mission-brief · mystery-box · starfield · audio · touch-drag · folder assets/' }
      ]}
    ],
    linkOut:[
      'EP05 v9 = scope ใหญ่สุดของ Season 1 · 46 หน้า',
      'POWER FORGE: HELION 6 → ปลด 6 powers (shield/warning/burst/insight/timeBubble/prismatic)',
      'รายละเอียด: HANDOFF_ep05.md'
    ]
  },

  // ─────────────────────────────────────────────────────────────────
  // EP06 · ระบบสุริยะ · 47 หน้า · G2 (Pedagogy peak)
  // ─────────────────────────────────────────────────────────────────
  6: {
    folder: 'lessons/astronomy/ep06',
    title: 'แผน 6 — EP06 · ขอบฟ้าของบ้าน · ระบบสุริยะ',
    meta: 'ดาราศาสตร์ · ม.5 · คาบ 12–13 · COSMOS LOG · Season 1 · 47 หน้า · Firebase sync · Pedagogy peak',
    sections: [
      { title:'🚀 Launcher', items:[
        _ASTRO_LAUNCHER('EP06','Solar System + Genesis Vault','Edge of Home · Maze boss · GS-1 ถึง GS-6 · 6 zones','47 หน้า · ~150 นาที',
          [['k','Solar System'],['k','Habitable Zone'],['k','Maze BOSS']])
      ]},
      { title:'📖 หน้าบทเรียน · ส่วนเปิด (5 หน้า)', items:[
        _ASTRO_PAGE('00','EP06 Cover · Comet Diversion','p00-cover.html','story',3),
        _ASTRO_PAGE('01','Pre-test · 8 ข้อ M1-M7','p01-pretest.html','reflection',6),
        _ASTRO_PAGE('02','เรดาร์ · 7 ดาวหางเบี่ยง','p02-anomaly.html','puzzle',5),
        _ASTRO_PAGE('03','VOID hologram · ท้าทาย','p03-void-taunt.html','story',3),
        _ASTRO_PAGE('04','พ่อตั้งภารกิจ · GS 0/6','p04-mission-brief.html','setup',3)
      ]},
      { title:'🌍 6 zones · A·B·C ต่อ zone (24 หน้า)', items:[
        _ASTRO_PAGE('05a','☁️ NEBULA · A · ENGAGE','p05a-nebula-engage.html','story',4),
        _ASTRO_PAGE('05b','☁️ NEBULA · B · EXPLORE timeline','p05b-nebula-explore.html','puzzle',6),
        _ASTRO_PAGE('05c','🔧 NEBULA REASSEMBLY · GS-1','p05c-nebula-gate.html','mixed',6),
        _ASTRO_PAGE('06br','🛰️ BRIDGE · NEBULA → DISK','p06-bridge.html','story',2),
        _ASTRO_PAGE('06a','💍 DISK · A · ENGAGE','p06a-disk-engage.html','story',4),
        _ASTRO_PAGE('06b','🔍 DISK SORT · GS-2','p06b-disk-gate.html','mixed',6),
        _ASTRO_PAGE('07br','🛰️ BRIDGE · DISK → ZONE 1','p07-bridge.html','story',2),
        _ASTRO_PAGE('07a','🪨 INNER · A · ENGAGE','p07a-inner-engage.html','story',4),
        _ASTRO_PAGE('07b','🪨 INNER · B · EXPLORE','p07b-inner-explore.html','puzzle',6),
        _ASTRO_PAGE('07c','🪨 ROCKY LOCK · GS-3','p07c-inner-gate.html','mixed',6),
        _ASTRO_PAGE('08br','🛰️ BRIDGE · ZONE 1 → ASTEROID','p08-bridge.html','story',2),
        _ASTRO_PAGE('08a','⭕ BELT · A · ENGAGE','p08a-belt-engage.html','story',4),
        _ASTRO_PAGE('08b','⭕ BELT · B · EXPLORE','p08b-belt-explore.html','puzzle',6),
        _ASTRO_PAGE('08c','⭕ BELT NAVIGATOR · GS-4','p08c-belt-gate.html','mixed',6),
        _ASTRO_PAGE('09br','🛰️ BRIDGE · BELT → GIANTS','p09-bridge.html','story',2),
        _ASTRO_PAGE('09a','☄ GIANTS · A · ENGAGE','p09a-giants-engage.html','story',4),
        _ASTRO_PAGE('09b','☄ GIANTS · B · EXPLORE gas/ice','p09b-giants-explore.html','puzzle',6),
        _ASTRO_PAGE('09c','☄ GIANTS · C · Quiz · kill M2','p09c-giants-quiz.html','mixed',5),
        _ASTRO_PAGE('09d','☄ GIANT BREAKDOWN · GS-5','p09d-giants-gate.html','mixed',6),
        _ASTRO_PAGE('10br','🛰️ BRIDGE · GIANTS → KUIPER','p10-bridge.html','story',2),
        _ASTRO_PAGE('10a','❄️ KUIPER · A · ENGAGE','p10a-kuiper-engage.html','story',4),
        _ASTRO_PAGE('10b','❄️ KUIPER · B · EXPLORE','p10b-kuiper-explore.html','puzzle',6),
        _ASTRO_PAGE('10c','❄️ KUIPER · C · Quiz · kill M5','p10c-kuiper-quiz.html','mixed',5),
        _ASTRO_PAGE('10d','❄️ COMET ORIGIN MAP · GS-6','p10d-kuiper-gate.html','mixed',6)
      ]},
      { title:'🌌 Habitable + Boss (18 หน้า)', items:[
        _ASTRO_PAGE('11','Voyager 1 · 122 AU · kill M6','p11-voyager-replay.html','puzzle',5),
        _ASTRO_PAGE('12','30/120/70k AU · zoom-out','p12-scale-shock.html','story',3),
        _ASTRO_PAGE('13','T²=a³ · ฐานอยู่ที่ 45 AU','p13-kepler-hunt.html','puzzle',5),
        _ASTRO_PAGE('14','Genesis Vault · ลงจอด','p14-vault-entry.html','story',3),
        _ASTRO_PAGE('15','Timeline ต้นกำเนิด','p15-vault-walls.html','story',4),
        _ASTRO_PAGE('16','VOID · ลบเนบิวลา','p16-void-plan.html','story',3),
        _ASTRO_PAGE('17','🌍 Habitable · 4 ปัจจัย','p17-habitable-engage.html','story',4),
        _ASTRO_PAGE('18','🌍 Slider ระยะ · น้ำ','p18-habitable-explore.html','puzzle',5),
        _ASTRO_PAGE('19','🌍 Quiz · kill M7','p19-habitable-quiz.html','mixed',4),
        _ASTRO_PAGE('20','🎁 Kepler-452b · TRAPPIST-1e','p20-exoplanet.html','puzzle',5),
        _ASTRO_PAGE('21','เลือก 1 ดาว · debate','p21-migration-vote.html','puzzle',4),
        _ASTRO_PAGE('22','🎁 โบลท์เห็นสัญลักษณ์','p22-bolt-clue.html','story',3),
        _ASTRO_PAGE('23','forge GENESIS LANCE','p23-boss-prep.html','puzzle',5),
        _ASTRO_PAGE('24','🔥 VOID ZERO-FIX (BOSS Grid)','p24-boss-grid.html','mixed',10),
        _ASTRO_PAGE('25','🌌 4 endings A+/A/B/C','p25-rescue-ending.html','story',4),
        _ASTRO_PAGE('26','ดาวเทียมโลกดับ · cliffhanger','p26-satellite-fail.html','story',3),
        _ASTRO_PAGE('27','🏆 Scale Master · 3-2-1','p27-journal.html','reflection',4)
      ]},
      { title:'🛠 ทรัพยากรเสริม', items:[
        { cls:'info', no:'SH', t:'G2 Stack + Pedagogy peak', file:'',
          d:'modules: ep06-boot · firebase-config · sync-client · role-view · photon · mission-brief · mystery-box · starfield · audio · touch-drag · confidence-gate · explain-back · group-talk · kpa-tracker · learning-journal · pause-card · reveal-after-submit · void-grid' }
      ]}
    ],
    linkOut:[
      'EP06 = G2 Pedagogy peak · 47 หน้า · ใช้ tools ครบสุดของ season',
      'Maze boss (Grid) · 6 GS keys · cliffhanger ดาวเทียมดับ → EP07',
      'รายละเอียด: HANDOFF_ep06.md'
    ]
  },

  // ─────────────────────────────────────────────────────────────────
  // EP07 · คลื่น EM · 28 หน้า · G3 (HUD-v2 · PBL · no Firebase)
  // ─────────────────────────────────────────────────────────────────
  7: {
    folder: 'lessons/astronomy/ep07',
    title: 'แผน 7 — EP07 · สงครามในวงโคจร · คลื่นแม่เหล็กไฟฟ้า',
    meta: 'ดาราศาสตร์ · ม.5 · คาบ 14–15 · COSMOS LOG · Season 1 · 28 หน้า · HUD-v2 · PBL frame · 4 acts',
    sections: [
      { title:'🚀 Launcher', items:[
        _ASTRO_LAUNCHER('EP07','Orbital War + Cipher Vault','EM Spectrum · 6 ช่วงคลื่น · CIPHER boss · 4 องก์ A/B/C/D','28 หน้า · ~90 นาที',
          [['k','EM Spectrum'],['k','Mars'],['k','CIPHER BOSS']])
      ]},
      { title:'📖 องก์ A · ปัญหา (4 หน้า)', items:[
        _ASTRO_PAGE('00','Cover','p00-cover.html','story'),
        _ASTRO_PAGE('01','Pretest 8 ข้อ','p01-pretest.html','reflection'),
        _ASTRO_PAGE('02','ปัญหา · ดาวเทียมดับ','p02-problem.html','story'),
        _ASTRO_PAGE('03','ภารกิจ · ปลดคลื่น','p03-mission.html','setup')
      ]},
      { title:'📖 องก์ B · EM Spectrum 6 ช่วง (8 หน้า)', items:[
        _ASTRO_PAGE('04','EM Spectrum 6 ช่วงคลื่น','p04-em-spectrum.html','story'),
        _ASTRO_PAGE('05','บรรยากาศดูดกลืน','p05-atmosphere.html','puzzle'),
        _ASTRO_PAGE('06','วิทยุ · FAST','p06-radio.html','story'),
        _ASTRO_PAGE('07','แสง · กล้องสะท้อนแสง','p07-visible.html','story'),
        _ASTRO_PAGE('08','IR · Hubble/JWST','p08-ir.html','story'),
        _ASTRO_PAGE('09','UV · ตรวจรอยรั่ว','p09-uv.html','puzzle'),
        _ASTRO_PAGE('10','X-ray · Chandra','p10-xray.html','puzzle'),
        _ASTRO_PAGE('11','จับคู่กล้อง 6 ตัว','p11-telescope-match.html','puzzle')
      ]},
      { title:'📖 องก์ C · ยานสำรวจ + Mars (10 หน้า)', items:[
        _ASTRO_PAGE('12','ทำไมต้องส่งยาน','p12-why-probe.html','story'),
        _ASTRO_PAGE('13','ยานสำรวจ Hall','p13-probe-hall.html','story'),
        _ASTRO_PAGE('14','ISS · CPR ปั๊มหัวใจ','p14-iss-cpr.html','puzzle'),
        _ASTRO_PAGE('15','ดาวเทียม 3 วงโคจร','p15-orbit-3tier.html','puzzle'),
        _ASTRO_PAGE('16','ประกอบจรวด Activator','p16-rocket-forge.html','puzzle'),
        _ASTRO_PAGE('17','v_escape Lab','p17-vescape.html','puzzle'),
        _ASTRO_PAGE('18','Mars · brief','p18-mars-brief.html','setup'),
        _ASTRO_PAGE('19','Mars · ออกแบบยาน','p19-mars-design-a.html','puzzle'),
        _ASTRO_PAGE('20','Mars · บ้าน+อาหาร+น้ำ','p20-mars-design-b.html','puzzle'),
        _ASTRO_PAGE('21','Mars · launch sim','p21-mars-launch.html','mixed')
      ]},
      { title:'📖 องก์ D · Spinoff + Boss (6 หน้า)', items:[
        _ASTRO_PAGE('22','วัสดุศาสตร์ · heat shield','p22-materials.html','story'),
        _ASTRO_PAGE('23','อาหาร · freeze-dry','p23-food.html','story'),
        _ASTRO_PAGE('24','การแพทย์ · spinoff','p24-medicine.html','story'),
        _ASTRO_PAGE('25','Spinoff Quiz','p25-spinoff-quiz.html','puzzle'),
        _ASTRO_PAGE('26','🔥 BOSS · Orbital Triage (CIPHER)','p26-boss.html','mixed'),
        _ASTRO_PAGE('27','Journal · → EP08','p27-journal.html','reflection')
      ]},
      { title:'🛠 ทรัพยากรเสริม', items:[
        { cls:'info', no:'SH', t:'G3 Stack (HUD-v2 · PBL)', file:'',
          d:'modules: ep07-boot · hud-v2 · pbl-frame · coin-energy · kpa-tracker-v2 · mystery-box-v2 · research-instruments · cipher-vault · cipher-vault-graphics · shop · starfield · ❌ ไม่มี Firebase' }
      ]}
    ],
    linkOut:[
      'EP07 = G3 (เริ่ม HUD-v2 · ตัด Firebase ออก) · 4 องก์ A/B/C/D',
      'CIPHER boss · ใช้ research-instruments · pbl-frame · coin-energy',
      'รายละเอียด: CONTEXT_ep07.md'
    ]
  },

  // ─────────────────────────────────────────────────────────────────
  // EP08 · Genesis Again · 28 หน้า · G3 · Season Finale
  // ─────────────────────────────────────────────────────────────────
  8: {
    folder: 'lessons/astronomy/ep08',
    title: 'แผน 8 — EP08 · Genesis Again · Season Finale',
    meta: 'ดาราศาสตร์ · ม.5 · คาบ 16–17 · COSMOS LOG · Season 1 · 28 หน้า · HUD-v2 · PBL frame · FINALE',
    sections: [
      { title:'🚀 Launcher', items:[
        _ASTRO_LAUNCHER('EP08','Genesis Forge · Season Finale','GENESIS FORGE 4-phase canvas boss · 5 endings · 17-key S1 keyring','28 หน้า · ~120 นาที',
          [['k','Big Bang'],['k','Inflation'],['k','BOSS Finale']])
      ]},
      { title:'🏆 FT-02 · Post-test หลัก (ทำหลังจบ Season · 20 ข้อ)', items:[
        { cls:'sim', no:'FT', t:'FT-02 · Post-test หลัก (Gain Measurement)', file:'../ft02-posttest.html',
          d:'20 ข้อเดียวกับ FT-01 · เทียบ pre/post 1:1 · คำนวณ Hake\'s normalized gain อัตโนมัติ',
          meta:'~15 นาที · ทำครั้งเดียวหลังจบ EP08',
          chips:[['k','Post-test'],['k','20 ข้อ'],['k','Hake\'s gain']] }
      ]},
      { title:'🌟 หลังจบ Season — แบบสอบถามงานวิจัย (ทำตามลำดับ)', items:[
        { cls:'mj', no:'R2', t:'IMI · แบบสอบถามแรงจูงใจ (หลังเรียน)', file:'../research/imi-21.html?phase=post',
          d:'21 ข้อชุดเดียวกับก่อนเรียน · เทียบ Pre/Post 3 ด้าน SDT',
          meta:'~5 นาที · ทำหลังจบ Boss',
          chips:[['k','IMI Post'],['k','21 ข้อ'],['k','SDT']] },
        { cls:'mj', no:'R3', t:'แบบสอบถามความพึงพอใจ', file:'../research/satisfaction-20.html',
          d:'20 ข้อ · 4 ด้าน (เนื้อหา · กิจกรรม · สื่อ · วัดผล) + ข้อเสนอแนะ',
          meta:'~5 นาที · ทำเป็นอันดับสุดท้าย',
          chips:[['k','Satisfaction'],['k','20 ข้อ'],['k','4 ด้าน']] }
      ]},
      { title:'📖 องก์ A · ภาพรวมเอกภพ (5 หน้า)', items:[
        _ASTRO_PAGE('00','Cover · Warp Jump','p00-cover.html','story'),
        _ASTRO_PAGE('01','Pretest 10 ข้อ summative','p01-pretest.html','reflection'),
        _ASTRO_PAGE('02','The Void · quark soup','p02-the-void.html','story'),
        _ASTRO_PAGE('03','CMB Shower · 2.73K','p03-cmb-shower.html','story'),
        _ASTRO_PAGE('04','Mission Brief · ดร.ฮับเบิล','p04-mission-brief.html','setup')
      ]},
      { title:'📖 องก์ B · ลำดับเหตุการณ์เอกภพ (8 หน้า)', items:[
        _ASTRO_PAGE('05','Inflation · 10⁻³⁶ s','p05-inflation.html','puzzle'),
        _ASTRO_PAGE('06','Nucleosynthesis · 3 นาที','p06-nucleosynthesis.html','puzzle'),
        _ASTRO_PAGE('07','Recombination · 380 kyr','p07-recombination.html','puzzle'),
        _ASTRO_PAGE('08','First Stars · 200 Myr','p08-first-stars.html','puzzle'),
        _ASTRO_PAGE('09','Galaxies · 1 Gyr','p09-galaxies.html','puzzle'),
        _ASTRO_PAGE('10',"⭐ Father's Arrival",'p10-fathers-arrival.html','story'),
        _ASTRO_PAGE('11',"Father's Truth · 2008",'p11-fathers-truth.html','story'),
        _ASTRO_PAGE('12',"Hubble's Law · v=H₀D",'p12-hubbles-law.html','puzzle')
      ]},
      { title:'📖 องก์ C · Anti-Genesis (8 หน้า)', items:[
        _ASTRO_PAGE('13','VOID Prime ปรากฏ','p13-prime-appears.html','story'),
        _ASTRO_PAGE('14','Anti-Genesis Engine · 4 จุด','p14-prime-plan.html','setup'),
        _ASTRO_PAGE('15','Disable 1 · Inflation','p15-disable-1.html','puzzle'),
        _ASTRO_PAGE('16','Disable 2 · CMB','p16-disable-2.html','puzzle'),
        _ASTRO_PAGE('17','Disable 3 · Fusion','p17-disable-3.html','puzzle'),
        _ASTRO_PAGE('18','Disable 4 · Galaxies','p18-disable-4.html','puzzle'),
        _ASTRO_PAGE('19','Hall of Spinoff (EP07)','p19-hall-of-spinoff.html','story'),
        _ASTRO_PAGE('20','Hall of Knowledge (EP01-06)','p20-hall-of-knowledge.html','story')
      ]},
      { title:'📖 องก์ D · Boss + Endings (7 หน้า)', items:[
        _ASTRO_PAGE('21',"⭐ Father's Choice · Reset/Preserve",'p21-fathers-choice.html','setup'),
        _ASTRO_PAGE('22','Boss Prep · Forge GENESIS LANCE','p22-boss-prep.html','puzzle'),
        _ASTRO_PAGE('23','🔥 BOSS · GENESIS FORGE','p23-boss.html','mixed'),
        _ASTRO_PAGE('24','Ending A · PRESERVE','p24-ending-preserve.html','story'),
        _ASTRO_PAGE('25','🌟 Ending Reset Route','p25-ending-reset.html','story'),
        _ASTRO_PAGE('26','Farewell · 4 NPC ลาจาก','p26-farewell.html','story'),
        _ASTRO_PAGE('27','Journal · 🏆 COMMANDER + S2','p27-journal.html','reflection')
      ]},
      { title:'🛠 ทรัพยากรเสริม', items:[
        { cls:'info', no:'SH', t:'G3 Stack + Finale modules', file:'',
          d:'modules: ep08-boot · ep08-page · hud-v2 · pbl-frame · coin-energy · kpa-tracker-v2 · mystery-box-v2 · research-instruments · genesis-forge · timeline-viz · s1-keyring · reveal-after-submit · starfield · ❌ ไม่มี Firebase' }
      ]}
    ],
    linkOut:[
      'EP08 = Season Finale · GENESIS FORGE 4-phase canvas boss',
      'ดร.ฮับเบิล Mentor reveal · โบลท์เจอพ่อ · Reset/Preserve choice',
      'Andromeda S2 cliffhanger · ปิด EP07 patch · 17-key S1 keyring',
      'รายละเอียด: HANDOFF_ep08.md + CONTEXT_ep08.md'
    ]
  }
};
