// ═══════════════════════════════════════════════════════════════════
// Content Pack: Tools (SHM · per-plan tool list + tool defs)
// ═══════════════════════════════════════════════════════════════════
// Tools ที่ใช้งานได้ในแต่ละแผน · ลำดับใน array = ลำดับการ์ดที่แสดง
// ─────────────────────────────────────────────────────────────────
// Tool dispatch (engine):
//   - มี def.file → เปิดไฟล์ HTML จาก lessons/.../แผนXX/<file> ใน iframe
//                   (worksheet-core.js ภายในไฟล์ส่ง WS_SUBMIT กลับมาให้ engine ส่งเข้า Sheet ของ SHM)
//   - ไม่มี def.file + key ตรง engine renderer (tl-pre/tl-post/upload/f*-pre/f*-post)
//                   → ใช้ engine renderer (ใช้ร่วมกับคลื่น)
// ─────────────────────────────────────────────────────────────────
// Decisions:
//   - แผน 3-6 ใช้ Exercise (ไม่ใช่ Calc) → tool key เป็น exercise3..6
//   - Journal/MJ ของ SHM ใช้ iframe (ไฟล์ HTML ของ SHM) → mj1..mj6 (ไม่ใช้ engine mj)
//   - POE แผน 4-6: ผู้ใช้กำลังปรับ worksheet ให้มี P+E (รอเพิ่มทีหลัง)
//   - FT-01/FT-02 หลักของ SHM: ยังไม่มีไฟล์ (รอสร้าง)
// ═══════════════════════════════════════════════════════════════════

window.KP_PLAN_TOOLS = {
  1: ['tl-pre','f1-pre','poe1','calc1','spot1','cer1','exercise1','tl-post','f1-post','mj1','upload'],
  2: ['tl-pre','f2-pre','poe2','calc2','spot2','cer2','exercise2','tl-post','f2-post','mj2','upload'],
  3: ['tl-pre','f3-pre','engage3','poe3','concept3','exercise3','case3','exit3','exercise3-ext','tl-post','mj3','upload'],
  4: ['tl-pre','f4-pre','engage4','jigsaw4','concept4','exercise4','case4','exit4','exercise4-ext','tl-post','mj4','upload'],
  5: ['tl-pre','f5-pre','engage5','tps5','concept5','exercise5','exit5','f5-post','exercise5-ext','tl-post','mj5','upload'],
  6: ['tl-pre','f6-pre','engage6','sim6','concept6','exercise6','exit6','f6-post','exercise6-ext','tl-post','mj6','upload']
};

// ─────────────────────────────────────────────────────────────────
// Tool defs · sheet prefix SHM_* แยกจากคลื่น
// def.file = ชื่อไฟล์ใน folder ของแผนนั้น (engine resolve ผ่าน KP_PLAN_MEDIA[plan].folder)
// ─────────────────────────────────────────────────────────────────
window.KP_TOOL_DEFS = {
  // ─── ใช้ร่วมกับคลื่น (engine native · ไม่มี def.file) ───
  'tl-pre':  { ico:'🚦', name:'Traffic Light · ก่อนเรียน', desc:'ยกบัตร 🟢🟡🔴 ประเมินตนเองก่อนคาบ', sheet:'SHM_TL', color:'tc-tl' },
  'tl-post': { ico:'🚦', name:'Traffic Light · หลังเรียน', desc:'ยกบัตร 🟢🟡🔴 ประเมินตนเองหลังคาบ', sheet:'SHM_TL', color:'tc-tl' },
  'upload':  { ico:'📎', name:'อัปโหลดใบงาน', desc:'ส่งไฟล์ PDF/รูปใบงานที่เขียนมือ', sheet:'SHM_Upload', color:'tc-up' },

  // ─── Four-tier Pre/Post (รายแผน · เปิดไฟล์ HTML ใน iframe) ───
  'f1-pre':  { ico:'📝', name:'F1 Four-tier · Pre',  desc:'มโนทัศน์นิยาม SHM · ก่อนเรียน', sheet:'SHM_F_Fourtier_P1', color:'tc-ft', file:'สื่อ05_F1_Fourtier_PrePost.html' },
  'f1-post': { ico:'📝', name:'F1 Four-tier · Post', desc:'มโนทัศน์นิยาม SHM · หลังเรียน', sheet:'SHM_F_Fourtier_P1', color:'tc-ft', file:'สื่อ05_F1_Fourtier_PrePost.html' },
  'f2-pre':  { ico:'📝', name:'F2 Four-tier · Pre',  desc:'มโนทัศน์ลูกตุ้ม · ก่อนเรียน',   sheet:'SHM_F_Fourtier_P2', color:'tc-ft', file:'สื่อ05_F2_Fourtier_PrePost.html' },
  'f2-post': { ico:'📝', name:'F2 Four-tier · Post', desc:'มโนทัศน์ลูกตุ้ม · หลังเรียน',   sheet:'SHM_F_Fourtier_P2', color:'tc-ft', file:'สื่อ05_F2_Fourtier_PrePost.html' },
  'f3-pre':  { ico:'📝', name:'F3 Four-tier · Pre',  desc:'มโนทัศน์มวล-สปริง · ก่อนเรียน', sheet:'SHM_F_Fourtier_P3', color:'tc-ft', file:'สื่อ01_F3_Fourtier_PrePost.html' },
  'f4-pre':  { ico:'📝', name:'F4 Four-tier · Pre',  desc:'มโนทัศน์เฟส x, v, a · ก่อนเรียน', sheet:'SHM_F_Fourtier_P4', color:'tc-ft', file:'สื่อ01_F4_Fourtier_PrePost.html' },
  'f5-pre':  { ico:'📝', name:'F5 Four-tier · Pre',  desc:'มโนทัศน์พลังงาน SHM · ก่อนเรียน', sheet:'SHM_F_Fourtier_P5', color:'tc-ft', file:'สื่อ01_Pretest_F5_Fourtier.html' },
  'f5-post': { ico:'📝', name:'F5 Four-tier · Post', desc:'มโนทัศน์พลังงาน SHM · หลังเรียน', sheet:'SHM_F_Fourtier_P5', color:'tc-ft', file:'สื่อ09_Posttest_F5_Fourtier.html' },
  'f6-pre':  { ico:'📋', name:'Pretest Unit · 4-tier',  desc:'มโนทัศน์ Damping/Resonance ก่อน Capstone', sheet:'SHM_F_Fourtier_P6', color:'tc-ft', file:'01_Pretest_4tier.html' },
  'f6-post': { ico:'🏆', name:'Posttest Unit · 4-tier', desc:'มโนทัศน์รวมหน่วย SHM หลังเรียน',          sheet:'SHM_F_Fourtier_P6', color:'tc-ft', file:'09_Posttest_Unit.html' },

  // ─── POE / Lab worksheets (เปิดไฟล์ HTML) ───
  // หมายเหตุ: แผน 4-6 ผู้ใช้กำลังปรับ worksheet ให้เป็น P+O+E format · ค่อยเพิ่ม poe4..6 ทีหลัง
  'poe1':    { ico:'🔮', name:'POE-01 · ใบบันทึก',         desc:'Predict-Observe-Explain (แผน 1)',         sheet:'SHM_POE_P1', color:'tc-poe', file:'สื่อ02_POE-01_ใบบันทึกPOE.html' },
  'poe2':    { ico:'🔮', name:'POE-02 · ใบบันทึก 3 ฐาน',  desc:'Predict-Observe-Explain 3 ฐาน (แผน 2)',  sheet:'SHM_POE_P2', color:'tc-poe', file:'สื่อ02_POE-02_ใบบันทึก3ฐาน.html' },
  'poe3':    { ico:'🔮', name:'POE · Spring Builder',     desc:'Predict-Observe-Explain ระบบมวล-สปริง',  sheet:'SHM_POE_P3', color:'tc-poe', file:'สื่อ03_POE_SpringBuilder.html' },
  'tps5':    { ico:'👥', name:'TPS + SIM05 · ใบบันทึก',   desc:'Think-Pair-Share + Simulation พลังงาน',   sheet:'SHM_TPS_P5', color:'tc-poe', file:'สื่อ03_TPS_SIM05_ใบบันทึก.html' },
  'sim6':    { ico:'🧪', name:'SIM06 · Damping & Resonance', desc:'ใบบันทึก Simulation Damping/Resonance', sheet:'SHM_SIM_P6', color:'tc-poe', file:'03_SIM06_Worksheet.html' },

  // ─── Cognitive tools (Concept Map / Jigsaw / CER / Engage Hook) ───
  'engage3': { ico:'🎬', name:'Engage Hook + CC-03 "สปริงคู่"', desc:'Hook + Concept Cartoon ระบบสปริง 2 ตัว', sheet:'SHM_Engage_P3', color:'tc-ce', file:'สื่อ02_Engage_Hook.html' },
  'engage4': { ico:'🎬', name:'Engage Hook (เฟส x,v,a)',      desc:'Hook กระตุ้นความคิดเรื่องเฟส',           sheet:'SHM_Engage_P4', color:'tc-ce', file:'สื่อ02_Engage_Hook.html' },
  'engage5': { ico:'🎭', name:'Concept Cartoon · Energy',     desc:'CC ถกการอนุรักษ์พลังงานในการสั่น',      sheet:'SHM_Engage_P5', color:'tc-ce', file:'สื่อ02_Engage_Hook_CC05.html' },
  'engage6': { ico:'🎬', name:'Video Analysis + CC',          desc:'วิเคราะห์คลิป Resonance/Damping',       sheet:'SHM_Engage_P6', color:'tc-ce', file:'02_Engage_VideoAnalysis.html' },
  'jigsaw4': { ico:'🧩', name:'Jigsaw · Phase Explorer',      desc:'4 expert groups วิเคราะห์ x, v, a · เฟส', sheet:'SHM_Jigsaw_P4', color:'tc-ce', file:'สื่อ03_Jigsaw_PhaseExplorer.html' },
  'concept3':{ ico:'🗺',  name:'Concept Map · มวล-สปริง',     desc:'Graphic organizer เชื่อมแนวคิด-สมการ',   sheet:'SHM_Concept_P3', color:'tc-ce', file:'สื่อ04_Explain_ConceptMap.html' },
  'concept4':{ ico:'🗺',  name:'Concept Map + Vector Draw',   desc:'แผนผังความคิด + วาด vector x, v, a',     sheet:'SHM_Concept_P4', color:'tc-ce', file:'สื่อ04_ConceptMap_VectorDraw.html' },
  'concept5':{ ico:'🗺',  name:'Data Analysis + Concept Map', desc:'วิเคราะห์ข้อมูลพลังงาน + ผังความคิด',    sheet:'SHM_Concept_P5', color:'tc-ce', file:'สื่อ04_DataAnalysis_ConceptMap.html' },
  'concept6':{ ico:'🗺',  name:'Debate + Concept Map',        desc:'Debate เงื่อนไข Resonance + ผังความคิด',  sheet:'SHM_Concept_P6', color:'tc-ce', file:'04_Debate_ConceptMap.html' },
  'cer1':    { ico:'🗒',  name:'CER LiveBoard (แผน 1)',       desc:'Claim-Evidence-Reasoning โพสต์ขึ้นกระดาน', sheet:'SHM_CER_P1', color:'tc-ce', file:'สื่อ10_CERLiveBoard.html' },
  'cer2':    { ico:'🗒',  name:'CER LiveBoard (แผน 2)',       desc:'CER + การโต้แย้งจากข้อมูล Pendulum Lab',   sheet:'SHM_CER_P2', color:'tc-ce', file:'สื่อ10_CERLiveBoard.html' },

  // ─── Calc · Spot (แผน 1-2 ใช้ Calc) ───
  'calc1':   { ico:'🧮', name:'ใบงาน 1.1 · Calc f, T, ω',     desc:'โจทย์คำนวณ 5 ข้อ + canvas วาดกราฟ',       sheet:'SHM_Calc_P1', color:'tc-ma', file:'สื่อ03_Calc_ใบงาน1.1.html' },
  'spot1':   { ico:'🔍', name:'ใบงาน 1.2 · Spot the Error',   desc:'หาข้อผิดพลาด 3 สถานการณ์ · M1.x',         sheet:'SHM_Spot_P1', color:'tc-sp', file:'สื่อ04_SpotTheError_ใบงาน1.2.html' },
  'calc2':   { ico:'🧮', name:'ใบงาน 2.1 · Calc 6 ข้อ',       desc:'โจทย์ลูกตุ้ม T, f, ω + g determination',   sheet:'SHM_Calc_P2', color:'tc-ma', file:'สื่อ03_Calc_ใบงาน2.1.html' },
  'spot2':   { ico:'🔍', name:'ใบงาน 2.2 · Spot the Error',   desc:'หาข้อผิดพลาด 4 ข้อ · M2.1–M2.4',          sheet:'SHM_Spot_P2', color:'tc-sp', file:'สื่อ04_SpotTheError_ใบงาน2.2.html' },

  // ─── Exercise หลัก (แผน 3-6 ใช้ Exercise แทน Calc) ───
  'exercise3': { ico:'📝', name:'Exercise · Mass-Spring 8 ข้อ', desc:'โจทย์คำนวณระบบมวล-สปริง',                  sheet:'SHM_Exercise_P3', color:'tc-ma', file:'สื่อ05_Exercise_MassSpring.html' },
  'exercise4': { ico:'📝', name:'Exercise · Phase',             desc:'โจทย์เฟส x, v, a + วิเคราะห์',             sheet:'SHM_Exercise_P4', color:'tc-ma', file:'สื่อ05_Exercise_Phase.html' },
  'exercise5': { ico:'📝', name:'Exercise · Energy',            desc:'โจทย์พลังงาน E∝A², v=ω√(A²−y²)',           sheet:'SHM_Exercise_P5', color:'tc-ma', file:'สื่อ05_Exercise_Energy.html' },
  'exercise6': { ico:'📝', name:'Exercise + PBL',               desc:'โจทย์ Damping/Resonance + Problem-based',  sheet:'SHM_Exercise_P6', color:'tc-ma', file:'05_Exercise_PBL.html' },

  // ─── Case Study ───
  'case3':   { ico:'🚗', name:'Case Study · โช้คอัพ',         desc:'วิเคราะห์ระบบกันสะเทือนรถยนต์',           sheet:'SHM_Case_P3', color:'tc-ce', file:'สื่อ06_CaseStudy_โช้คอัพ.html' },
  'case4':   { ico:'🌍', name:'Case Study · Seismograph',     desc:'วิเคราะห์เครื่องบันทึกแผ่นดินไหว',         sheet:'SHM_Case_P4', color:'tc-ce', file:'สื่อ06_CaseStudy_Seismograph.html' },

  // ─── Exercise ท้ายแผน + เพิ่มเติม ───
  'exercise1':     { ico:'📝', name:'Exercise · 12 ข้อ (แผน 1)', desc:'การบ้านท้ายแผน 12 ข้อ', sheet:'SHM_Exercise_P1', color:'tc-ma', file:'สื่อ11_Exercise_12ข้อ.html' },
  'exercise2':     { ico:'📝', name:'Exercise · 12 ข้อ (แผน 2)', desc:'การบ้านท้ายแผน 12 ข้อ', sheet:'SHM_Exercise_P2', color:'tc-ma', file:'สื่อ11_Exercise_12ข้อ.html' },
  'exercise3-ext': { ico:'📝', name:'Exercise เพิ่มเติม (แผน 3)', desc:'โจทย์ขยายผล',          sheet:'SHM_ExerciseExt_P3', color:'tc-ma', file:'สื่อ11_Exercise_เพิ่มเติม.html' },
  'exercise4-ext': { ico:'📝', name:'Exercise เพิ่มเติม (แผน 4)', desc:'โจทย์ขยายผล',          sheet:'SHM_ExerciseExt_P4', color:'tc-ma', file:'สื่อ11_Exercise_เพิ่มเติม.html' },
  'exercise5-ext': { ico:'📝', name:'Exercise เพิ่มเติม (แผน 5)', desc:'โจทย์ขยายผล',          sheet:'SHM_ExerciseExt_P5', color:'tc-ma', file:'สื่อ11_Exercise_เพิ่มเติม.html' },
  'exercise6-ext': { ico:'📝', name:'Exercise เพิ่มเติม (แผน 6)', desc:'โจทย์ขยายผล',          sheet:'SHM_ExerciseExt_P6', color:'tc-ma', file:'สื่อ11_Exercise_เพิ่มเติม.html' },

  // ─── Exit tickets (รายแผน) ───
  'exit3':   { ico:'🎫', name:'Exit Ticket · แผน 3', desc:'Formative check ปลายคาบ', sheet:'SHM_Exit_P3', color:'tc-mj', file:'สื่อ07_ExitTicket.html' },
  'exit4':   { ico:'🎫', name:'Exit Ticket · แผน 4', desc:'Formative check ปลายคาบ', sheet:'SHM_Exit_P4', color:'tc-mj', file:'สื่อ07_ExitTicket.html' },
  'exit5':   { ico:'🎫', name:'Exit Ticket · แผน 5', desc:'Formative check ปลายคาบ', sheet:'SHM_Exit_P5', color:'tc-mj', file:'สื่อ07_ExitTicket.html' },
  'exit6':   { ico:'🎫', name:'Exit Ticket · แผน 6', desc:'Formative check ปลายคาบ', sheet:'SHM_Exit_P6', color:'tc-mj', file:'07_ExitTicket.html' },

  // ─── Metacognitive Journal (รายแผน · iframe ไฟล์ HTML ของ SHM) ───
  'mj1':     { ico:'📓', name:'MJ-01 · Journal 3-2-1', desc:'3 เข้าใจใหม่ · 2 น่าสนใจ · 1 คำถาม', sheet:'SHM_MJ_P1', color:'tc-mj', file:'สื่อ07_MJ-01_MetacognitiveJournal.html' },
  'mj2':     { ico:'📓', name:'MJ-02 · Journal 3-2-1', desc:'3 เข้าใจใหม่ · 2 น่าสนใจ · 1 คำถาม', sheet:'SHM_MJ_P2', color:'tc-mj', file:'สื่อ07_MJ-02_MetacognitiveJournal.html' },
  'mj3':     { ico:'📓', name:'Journal 3-2-1 (แผน 3)', desc:'3 เข้าใจใหม่ · 2 คำถาม · 1 อุปมา',   sheet:'SHM_MJ_P3', color:'tc-mj', file:'สื่อ08_Journal_321.html' },
  'mj4':     { ico:'📓', name:'Journal 3-2-1 (แผน 4)', desc:'3-2-1 reflection',                    sheet:'SHM_MJ_P4', color:'tc-mj', file:'สื่อ08_Journal_321.html' },
  'mj5':     { ico:'📓', name:'Journal MJ05 (แผน 5)',  desc:'3-2-1 reflection พลังงาน',           sheet:'SHM_MJ_P5', color:'tc-mj', file:'สื่อ08_Journal_MJ05.html' },
  'mj6':     { ico:'📓', name:'Journal 3-2-1 (แผน 6)', desc:'3-2-1 reflection ปิดหน่วย',          sheet:'SHM_MJ_P6', color:'tc-mj', file:'08_Journal_321.html' }
};
