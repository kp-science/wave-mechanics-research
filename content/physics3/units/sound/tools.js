// ═══════════════════════════════════════════════════════════════════
// Content Pack: Tools (เสียง · per-plan tool list + tool defs)
// ═══════════════════════════════════════════════════════════════════
// Tools ที่ใช้งานได้ในแต่ละแผน · ลำดับใน array = ลำดับการ์ดที่แสดง
// ─────────────────────────────────────────────────────────────────
// Tool dispatch (engine):
//   - มี def.file → เปิดไฟล์ HTML จาก lessons/physics3/sound/แผนXX/<file> ใน iframe
//                   (worksheet-core.js ภายในไฟล์ส่ง WS_SUBMIT กลับมาให้ engine ส่งเข้า Sheet ของเสียง)
//   - ไม่มี def.file + key ตรง engine renderer (tl-pre/tl-post/upload)
//                   → ใช้ engine renderer (ใช้ร่วมกับคลื่น/SHM)
// ─────────────────────────────────────────────────────────────────
// Convention (เสียง):
//   engage{n} = สื่อ 00 เกริ่นนำ + Engage หลากหลาย
//   cc{n}     = สื่อ 01 Concept Cartoon
//   poe{n}    = สื่อ 02 POE-01 (ทดลองจริง)
//   matrix{n} = สื่อ 03 Matrix Table
//   spot{n}   = สื่อ 04 Spot the Error
//   f{n}-pre/post = สื่อ 05 Four-tier
//   mj{n}     = สื่อ 07 MJ Journal
//   ob{n}     = สื่อ 08 OB observation (teacher)
//   rubric{n} = สื่อ 09 POE Rubric (teacher)
//   exit{n}   = สื่อ 10 Exit Ticket
//   calc{n}   = สื่อ 11 Calc Worksheet
//   exercise{n} = สื่อ 12 Exercise 12 ข้อ
// ═══════════════════════════════════════════════════════════════════

window.KP_PLAN_TOOLS = {
  1: ['tl-pre','f1-pre','engage1','cc1','poe1','matrix1','spot1','calc1','exercise1','exit1','tl-post','f1-post','mj1','upload'],
  2: ['tl-pre','f2-pre','engage2','cc2','poe2','matrix2','spot2','calc2','exercise2','exit2','tl-post','f2-post','mj2','upload'],
  3: ['tl-pre','f3-pre','engage3','cc3','poe3','matrix3','spot3','calc3','exercise3','exit3','tl-post','f3-post','mj3','upload'],
  4: ['tl-pre','f4-pre','engage4','cc4','poe4','matrix4','spot4','calc4','exercise4','exit4','tl-post','f4-post','mj4','upload'],
  5: ['tl-pre','f5-pre','engage5','cc5','poe5','matrix5','spot5','calc5','exercise5','exit5','tl-post','f5-post','mj5','upload'],
  6: ['tl-pre','f6-pre','engage6','cc6','poe6','matrix6','spot6','calc6','exercise6','exit6','tl-post','f6-post','mj6','upload'],
  7: ['tl-pre','f7-pre','engage7','cc7','poe7','matrix7','spot7','calc7','exercise7','exit7','tl-post','f7-post','mj7','upload'],
  8: ['tl-pre','f8-pre','engage8','cc8','poe8','matrix8','spot8','calc8','exercise8','exit8','tl-post','f8-post','mj8','upload'],
  9: ['tl-pre','f9-pre','engage9','cc9','poe9','matrix9','spot9','calc9','exercise9','exit9','tl-post','f9-post','mj9','upload'],
  10: ['tl-pre','f10-pre','engage10','cc10','poe10','matrix10','spot10','calc10','exercise10','exit10','tl-post','f10-post','mj10','upload'],
  11: ['tl-pre','f11-pre','engage11','cc11','poe11','matrix11','spot11','calc11','exercise11','exit11','tl-post','f11-post','mj11','upload'],
};

// ─────────────────────────────────────────────────────────────────
// Tool defs · sheet prefix Sound_* แยกจากคลื่น/SHM
// def.file = ชื่อไฟล์ใน folder ของแผนนั้น (engine resolve ผ่าน KP_PLAN_MEDIA[plan].folder)
// ─────────────────────────────────────────────────────────────────
window.KP_TOOL_DEFS = {
  // ─── ใช้ร่วมกับคลื่น/SHM (engine native · ไม่มี def.file) ───
  'tl-pre':  { ico:'🚦', name:'Traffic Light · ก่อนเรียน', desc:'ยกบัตร 🟢🟡🔴 ประเมินตนเองก่อนคาบ', sheet:'Sound_TL', color:'tc-tl' },
  'tl-post': { ico:'🚦', name:'Traffic Light · หลังเรียน', desc:'ยกบัตร 🟢🟡🔴 ประเมินตนเองหลังคาบ', sheet:'Sound_TL', color:'tc-tl' },
  'upload':  { ico:'📎', name:'อัปโหลดใบงาน', desc:'ส่งไฟล์ PDF/รูปใบงานที่เขียนมือ', sheet:'Sound_Upload', color:'tc-up' },

  // ─── แผน 1 · การเกิดและการเคลื่อนที่ของเสียง ───
  'engage1':   { ico:'🚀', name:'เกริ่นนำ + Engage', desc:'ความรู้เดิม + Demo Hook (Cymatics)', sheet:'Sound_Engage_P1', color:'tc-engage', file:'สื่อ00_Engage_เกริ่นนำ.html' },
  'cc1':       { ico:'🎭', name:'Concept Cartoon · เสียงบนดวงจันทร์', desc:'4 ตัวละครถกเถียง', sheet:'Sound_CC_P1', color:'tc-cc', file:'สื่อ01_ConceptCartoon.html' },
  'poe1':      { ico:'🔮', name:'POE-01 · ทดลองจริง', desc:'P + O (ทดลอง+บันทึก) + E + Misconception 4 ตัว', sheet:'Sound_POE_P1', color:'tc-poe', file:'สื่อ02_POE-01_ใบบันทึก.html' },
  'matrix1':   { ico:'📋', name:'Matrix Table', desc:'คลื่นเสียง vs คลื่นน้ำ', sheet:'Sound_Matrix_P1', color:'tc-work', file:'สื่อ03_MatrixTable.html' },
  'spot1':     { ico:'🔍', name:'Spot the Error', desc:'4 ข้อ · พร้อมเฉลย', sheet:'Sound_Spot_P1', color:'tc-work', file:'สื่อ04_SpotTheError.html' },
  'f1-pre':    { ico:'📝', name:'F1 Four-tier · Pre',  desc:'มโนทัศน์ การเกิดและการเคลื่อนที่ของเสียง · ก่อนเรียน', sheet:'Sound_F_Fourtier_P1', color:'tc-ft', file:'สื่อ05_F1_Fourtier_PrePost.html' },
  'f1-post':   { ico:'📝', name:'F1 Four-tier · Post', desc:'มโนทัศน์ การเกิดและการเคลื่อนที่ของเสียง · หลังเรียน', sheet:'Sound_F_Fourtier_P1', color:'tc-ft', file:'สื่อ05_F1_Fourtier_PrePost.html' },
  'mj1':       { ico:'📓', name:'MJ Journal 3-2-1', desc:'3 เข้าใจ · 2 น่าสนใจ · 1 สงสัย', sheet:'Sound_MJ_P1', color:'tc-mj', file:'สื่อ07_MJ-01_MetacognitiveJournal.html' },
  'exit1':     { ico:'🎫', name:'Exit Ticket', desc:'5 ข้อสั้น ๆ ก่อนเลิกคาบ', sheet:'Sound_Exit_P1', color:'tc-ft', file:'สื่อ10_ExitTicket.html' },
  'calc1':     { ico:'📐', name:'ใบงาน Calc 1.1', desc:'Math Builder 5 ข้อ + canvas', sheet:'Sound_Calc_P1', color:'tc-work', file:'สื่อ11_Calc_ใบงาน1.1.html' },
  'exercise1': { ico:'📚', name:'แบบฝึกหัด 12 ข้อ', desc:'4 MCQ + 4 Calc + 2 Short + 2 Appli', sheet:'Sound_Exercise_P1', color:'tc-work', file:'สื่อ12_Exercise_12ข้อ.html' },

  // ─── แผน 2 · การกระจัดและคลื่นความดัน ───
  'engage2':   { ico:'🚀', name:'เกริ่นนำ + Engage', desc:'ความรู้เดิม + Mystery + KWL', sheet:'Sound_Engage_P2', color:'tc-engage', file:'สื่อ00_Engage_เกริ่นนำ.html' },
  'cc2':       { ico:'🎭', name:'Concept Cartoon · หูแก้วโดนอะไร', desc:'4 ตัวละครถกเถียง', sheet:'Sound_CC_P2', color:'tc-cc', file:'สื่อ01_ConceptCartoon.html' },
  'poe2':      { ico:'🔮', name:'POE-01 · ทดลองจริง', desc:'P + O (ทดลอง+บันทึก) + E + Misconception 4 ตัว', sheet:'Sound_POE_P2', color:'tc-poe', file:'สื่อ02_POE-01_ใบบันทึก.html' },
  'matrix2':   { ico:'📋', name:'Matrix Table', desc:'y(x) vs ΔP(x)', sheet:'Sound_Matrix_P2', color:'tc-work', file:'สื่อ03_MatrixTable.html' },
  'spot2':     { ico:'🔍', name:'Spot the Error', desc:'4 ข้อ · พร้อมเฉลย', sheet:'Sound_Spot_P2', color:'tc-work', file:'สื่อ04_SpotTheError.html' },
  'f2-pre':    { ico:'📝', name:'F2 Four-tier · Pre',  desc:'มโนทัศน์ การกระจัดและคลื่นความดัน · ก่อนเรียน', sheet:'Sound_F_Fourtier_P2', color:'tc-ft', file:'สื่อ05_F2_Fourtier_PrePost.html' },
  'f2-post':   { ico:'📝', name:'F2 Four-tier · Post', desc:'มโนทัศน์ การกระจัดและคลื่นความดัน · หลังเรียน', sheet:'Sound_F_Fourtier_P2', color:'tc-ft', file:'สื่อ05_F2_Fourtier_PrePost.html' },
  'mj2':       { ico:'📓', name:'MJ Journal 3-2-1', desc:'3 เข้าใจ · 2 น่าสนใจ · 1 สงสัย', sheet:'Sound_MJ_P2', color:'tc-mj', file:'สื่อ07_MJ-01_MetacognitiveJournal.html' },
  'exit2':     { ico:'🎫', name:'Exit Ticket', desc:'5 ข้อสั้น ๆ ก่อนเลิกคาบ', sheet:'Sound_Exit_P2', color:'tc-ft', file:'สื่อ10_ExitTicket.html' },
  'calc2':     { ico:'📐', name:'ใบงาน Calc 2.1', desc:'Math Builder 5 ข้อ + canvas', sheet:'Sound_Calc_P2', color:'tc-work', file:'สื่อ11_Calc_ใบงาน2.1.html' },
  'exercise2': { ico:'📚', name:'แบบฝึกหัด 12 ข้อ', desc:'4 MCQ + 4 Calc + 2 Short + 2 Appli', sheet:'Sound_Exercise_P2', color:'tc-work', file:'สื่อ12_Exercise_12ข้อ.html' },

  // ─── แผน 3 · อัตราเร็วของเสียง ───
  'engage3':   { ico:'🚀', name:'เกริ่นนำ + Engage', desc:'ความรู้เดิม + Real-life Case', sheet:'Sound_Engage_P3', color:'tc-engage', file:'สื่อ00_Engage_เกริ่นนำ.html' },
  'cc3':       { ico:'🎭', name:'Concept Cartoon · ห้องเย็น vs ห้องร้อน', desc:'4 ตัวละครถกเถียง', sheet:'Sound_CC_P3', color:'tc-cc', file:'สื่อ01_ConceptCartoon.html' },
  'poe3':      { ico:'🔮', name:'POE-01 · ทดลองจริง', desc:'P + O (ทดลอง+บันทึก) + E + Misconception 4 ตัว', sheet:'Sound_POE_P3', color:'tc-poe', file:'สื่อ02_POE-01_ใบบันทึก.html' },
  'matrix3':   { ico:'📋', name:'Matrix Table', desc:'v ในตัวกลางต่าง ๆ', sheet:'Sound_Matrix_P3', color:'tc-work', file:'สื่อ03_MatrixTable.html' },
  'spot3':     { ico:'🔍', name:'Spot the Error', desc:'4 ข้อ · พร้อมเฉลย', sheet:'Sound_Spot_P3', color:'tc-work', file:'สื่อ04_SpotTheError.html' },
  'f3-pre':    { ico:'📝', name:'F3 Four-tier · Pre',  desc:'มโนทัศน์ อัตราเร็วของเสียง · ก่อนเรียน', sheet:'Sound_F_Fourtier_P3', color:'tc-ft', file:'สื่อ05_F3_Fourtier_PrePost.html' },
  'f3-post':   { ico:'📝', name:'F3 Four-tier · Post', desc:'มโนทัศน์ อัตราเร็วของเสียง · หลังเรียน', sheet:'Sound_F_Fourtier_P3', color:'tc-ft', file:'สื่อ05_F3_Fourtier_PrePost.html' },
  'mj3':       { ico:'📓', name:'MJ Journal 3-2-1', desc:'3 เข้าใจ · 2 น่าสนใจ · 1 สงสัย', sheet:'Sound_MJ_P3', color:'tc-mj', file:'สื่อ07_MJ-01_MetacognitiveJournal.html' },
  'exit3':     { ico:'🎫', name:'Exit Ticket', desc:'5 ข้อสั้น ๆ ก่อนเลิกคาบ', sheet:'Sound_Exit_P3', color:'tc-ft', file:'สื่อ10_ExitTicket.html' },
  'calc3':     { ico:'📐', name:'ใบงาน Calc 3.1', desc:'Math Builder 5 ข้อ + canvas', sheet:'Sound_Calc_P3', color:'tc-work', file:'สื่อ11_Calc_ใบงาน3.1.html' },
  'exercise3': { ico:'📚', name:'แบบฝึกหัด 12 ข้อ', desc:'4 MCQ + 4 Calc + 2 Short + 2 Appli', sheet:'Sound_Exercise_P3', color:'tc-work', file:'สื่อ12_Exercise_12ข้อ.html' },

  // ─── แผน 4 · พฤติกรรมของคลื่นเสียง ───
  'engage4':   { ico:'🚀', name:'เกริ่นนำ + Engage', desc:'ความรู้เดิม + Anticipation Guide', sheet:'Sound_Engage_P4', color:'tc-engage', file:'สื่อ00_Engage_เกริ่นนำ.html' },
  'cc4':       { ico:'🎭', name:'Concept Cartoon · ทำไมได้ยินรอบมุมตึก', desc:'4 ตัวละครถกเถียง', sheet:'Sound_CC_P4', color:'tc-cc', file:'สื่อ01_ConceptCartoon.html' },
  'poe4':      { ico:'🔮', name:'POE-01 · ทดลองจริง', desc:'P + O (ทดลอง+บันทึก) + E + Misconception 4 ตัว', sheet:'Sound_POE_P4', color:'tc-poe', file:'สื่อ02_POE-01_ใบบันทึก.html' },
  'matrix4':   { ico:'📋', name:'Matrix Table', desc:'4 พฤติกรรมของคลื่นเสียง', sheet:'Sound_Matrix_P4', color:'tc-work', file:'สื่อ03_MatrixTable.html' },
  'spot4':     { ico:'🔍', name:'Spot the Error', desc:'4 ข้อ · พร้อมเฉลย', sheet:'Sound_Spot_P4', color:'tc-work', file:'สื่อ04_SpotTheError.html' },
  'f4-pre':    { ico:'📝', name:'F4 Four-tier · Pre',  desc:'มโนทัศน์ พฤติกรรมของคลื่นเสียง · ก่อนเรียน', sheet:'Sound_F_Fourtier_P4', color:'tc-ft', file:'สื่อ05_F4_Fourtier_PrePost.html' },
  'f4-post':   { ico:'📝', name:'F4 Four-tier · Post', desc:'มโนทัศน์ พฤติกรรมของคลื่นเสียง · หลังเรียน', sheet:'Sound_F_Fourtier_P4', color:'tc-ft', file:'สื่อ05_F4_Fourtier_PrePost.html' },
  'mj4':       { ico:'📓', name:'MJ Journal 3-2-1', desc:'3 เข้าใจ · 2 น่าสนใจ · 1 สงสัย', sheet:'Sound_MJ_P4', color:'tc-mj', file:'สื่อ07_MJ-01_MetacognitiveJournal.html' },
  'exit4':     { ico:'🎫', name:'Exit Ticket', desc:'5 ข้อสั้น ๆ ก่อนเลิกคาบ', sheet:'Sound_Exit_P4', color:'tc-ft', file:'สื่อ10_ExitTicket.html' },
  'calc4':     { ico:'📐', name:'ใบงาน Calc 4.1', desc:'Math Builder 5 ข้อ + canvas', sheet:'Sound_Calc_P4', color:'tc-work', file:'สื่อ11_Calc_ใบงาน4.1.html' },
  'exercise4': { ico:'📚', name:'แบบฝึกหัด 12 ข้อ', desc:'4 MCQ + 4 Calc + 2 Short + 2 Appli', sheet:'Sound_Exercise_P4', color:'tc-work', file:'สื่อ12_Exercise_12ข้อ.html' },

  // ─── แผน 5 · ความเข้มและระดับเสียง ───
  'engage5':   { ico:'🚀', name:'เกริ่นนำ + Engage', desc:'ความรู้เดิม + Photo Stimulus', sheet:'Sound_Engage_P5', color:'tc-engage', file:'สื่อ00_Engage_เกริ่นนำ.html' },
  'cc5':       { ico:'🎭', name:'Concept Cartoon · ลำโพงปาร์ตี้', desc:'4 ตัวละครถกเถียง', sheet:'Sound_CC_P5', color:'tc-cc', file:'สื่อ01_ConceptCartoon.html' },
  'poe5':      { ico:'🔮', name:'POE-01 · ทดลองจริง', desc:'P + O (ทดลอง+บันทึก) + E + Misconception 4 ตัว', sheet:'Sound_POE_P5', color:'tc-poe', file:'สื่อ02_POE-01_ใบบันทึก.html' },
  'matrix5':   { ico:'📋', name:'Matrix Table', desc:'I และ β ในชีวิตจริง', sheet:'Sound_Matrix_P5', color:'tc-work', file:'สื่อ03_MatrixTable.html' },
  'spot5':     { ico:'🔍', name:'Spot the Error', desc:'4 ข้อ · พร้อมเฉลย', sheet:'Sound_Spot_P5', color:'tc-work', file:'สื่อ04_SpotTheError.html' },
  'f5-pre':    { ico:'📝', name:'F5 Four-tier · Pre',  desc:'มโนทัศน์ ความเข้มและระดับเสียง · ก่อนเรียน', sheet:'Sound_F_Fourtier_P5', color:'tc-ft', file:'สื่อ05_F5_Fourtier_PrePost.html' },
  'f5-post':   { ico:'📝', name:'F5 Four-tier · Post', desc:'มโนทัศน์ ความเข้มและระดับเสียง · หลังเรียน', sheet:'Sound_F_Fourtier_P5', color:'tc-ft', file:'สื่อ05_F5_Fourtier_PrePost.html' },
  'mj5':       { ico:'📓', name:'MJ Journal 3-2-1', desc:'3 เข้าใจ · 2 น่าสนใจ · 1 สงสัย', sheet:'Sound_MJ_P5', color:'tc-mj', file:'สื่อ07_MJ-01_MetacognitiveJournal.html' },
  'exit5':     { ico:'🎫', name:'Exit Ticket', desc:'5 ข้อสั้น ๆ ก่อนเลิกคาบ', sheet:'Sound_Exit_P5', color:'tc-ft', file:'สื่อ10_ExitTicket.html' },
  'calc5':     { ico:'📐', name:'ใบงาน Calc 5.1', desc:'Math Builder 5 ข้อ + canvas', sheet:'Sound_Calc_P5', color:'tc-work', file:'สื่อ11_Calc_ใบงาน5.1.html' },
  'exercise5': { ico:'📚', name:'แบบฝึกหัด 12 ข้อ', desc:'4 MCQ + 4 Calc + 2 Short + 2 Appli', sheet:'Sound_Exercise_P5', color:'tc-work', file:'สื่อ12_Exercise_12ข้อ.html' },

  // ─── แผน 6 · การได้ยินและมลพิษเสียง ───
  'engage6':   { ico:'🚀', name:'เกริ่นนำ + Engage', desc:'ความรู้เดิม + Video Analysis', sheet:'Sound_Engage_P6', color:'tc-engage', file:'สื่อ00_Engage_เกริ่นนำ.html' },
  'cc6':       { ico:'🎭', name:'Concept Cartoon · อายุกับการได้ยิน', desc:'4 ตัวละครถกเถียง', sheet:'Sound_CC_P6', color:'tc-cc', file:'สื่อ01_ConceptCartoon.html' },
  'poe6':      { ico:'🔮', name:'POE-01 · ทดลองจริง', desc:'P + O (ทดลอง+บันทึก) + E + Misconception 4 ตัว', sheet:'Sound_POE_P6', color:'tc-poe', file:'สื่อ02_POE-01_ใบบันทึก.html' },
  'matrix6':   { ico:'📋', name:'Matrix Table', desc:'ช่วง f ของสิ่งมีชีวิต', sheet:'Sound_Matrix_P6', color:'tc-work', file:'สื่อ03_MatrixTable.html' },
  'spot6':     { ico:'🔍', name:'Spot the Error', desc:'4 ข้อ · พร้อมเฉลย', sheet:'Sound_Spot_P6', color:'tc-work', file:'สื่อ04_SpotTheError.html' },
  'f6-pre':    { ico:'📝', name:'F6 Four-tier · Pre',  desc:'มโนทัศน์ การได้ยินและมลพิษเสียง · ก่อนเรียน', sheet:'Sound_F_Fourtier_P6', color:'tc-ft', file:'สื่อ05_F6_Fourtier_PrePost.html' },
  'f6-post':   { ico:'📝', name:'F6 Four-tier · Post', desc:'มโนทัศน์ การได้ยินและมลพิษเสียง · หลังเรียน', sheet:'Sound_F_Fourtier_P6', color:'tc-ft', file:'สื่อ05_F6_Fourtier_PrePost.html' },
  'mj6':       { ico:'📓', name:'MJ Journal 3-2-1', desc:'3 เข้าใจ · 2 น่าสนใจ · 1 สงสัย', sheet:'Sound_MJ_P6', color:'tc-mj', file:'สื่อ07_MJ-01_MetacognitiveJournal.html' },
  'exit6':     { ico:'🎫', name:'Exit Ticket', desc:'5 ข้อสั้น ๆ ก่อนเลิกคาบ', sheet:'Sound_Exit_P6', color:'tc-ft', file:'สื่อ10_ExitTicket.html' },
  'calc6':     { ico:'📐', name:'ใบงาน Calc 6.1', desc:'Math Builder 5 ข้อ + canvas', sheet:'Sound_Calc_P6', color:'tc-work', file:'สื่อ11_Calc_ใบงาน6.1.html' },
  'exercise6': { ico:'📚', name:'แบบฝึกหัด 12 ข้อ', desc:'4 MCQ + 4 Calc + 2 Short + 2 Appli', sheet:'Sound_Exercise_P6', color:'tc-work', file:'สื่อ12_Exercise_12ข้อ.html' },

  // ─── แผน 7 · Pitch + Timbre ───
  'engage7':   { ico:'🚀', name:'เกริ่นนำ + Engage', desc:'ความรู้เดิม + Demo + POE', sheet:'Sound_Engage_P7', color:'tc-engage', file:'สื่อ00_Engage_เกริ่นนำ.html' },
  'cc7':       { ico:'🎭', name:'Concept Cartoon · Voice ID', desc:'4 ตัวละครถกเถียง', sheet:'Sound_CC_P7', color:'tc-cc', file:'สื่อ01_ConceptCartoon.html' },
  'poe7':      { ico:'🔮', name:'POE-01 · ทดลองจริง', desc:'P + O (ทดลอง+บันทึก) + E + Misconception 4 ตัว', sheet:'Sound_POE_P7', color:'tc-poe', file:'สื่อ02_POE-01_ใบบันทึก.html' },
  'matrix7':   { ico:'📋', name:'Matrix Table', desc:'Pitch · Loudness · Timbre', sheet:'Sound_Matrix_P7', color:'tc-work', file:'สื่อ03_MatrixTable.html' },
  'spot7':     { ico:'🔍', name:'Spot the Error', desc:'4 ข้อ · พร้อมเฉลย', sheet:'Sound_Spot_P7', color:'tc-work', file:'สื่อ04_SpotTheError.html' },
  'f7-pre':    { ico:'📝', name:'F7 Four-tier · Pre',  desc:'มโนทัศน์ Pitch + Timbre · ก่อนเรียน', sheet:'Sound_F_Fourtier_P7', color:'tc-ft', file:'สื่อ05_F7_Fourtier_PrePost.html' },
  'f7-post':   { ico:'📝', name:'F7 Four-tier · Post', desc:'มโนทัศน์ Pitch + Timbre · หลังเรียน', sheet:'Sound_F_Fourtier_P7', color:'tc-ft', file:'สื่อ05_F7_Fourtier_PrePost.html' },
  'mj7':       { ico:'📓', name:'MJ Journal 3-2-1', desc:'3 เข้าใจ · 2 น่าสนใจ · 1 สงสัย', sheet:'Sound_MJ_P7', color:'tc-mj', file:'สื่อ07_MJ-01_MetacognitiveJournal.html' },
  'exit7':     { ico:'🎫', name:'Exit Ticket', desc:'5 ข้อสั้น ๆ ก่อนเลิกคาบ', sheet:'Sound_Exit_P7', color:'tc-ft', file:'สื่อ10_ExitTicket.html' },
  'calc7':     { ico:'📐', name:'ใบงาน Calc 7.1', desc:'Math Builder 5 ข้อ + canvas', sheet:'Sound_Calc_P7', color:'tc-work', file:'สื่อ11_Calc_ใบงาน7.1.html' },
  'exercise7': { ico:'📚', name:'แบบฝึกหัด 12 ข้อ', desc:'4 MCQ + 4 Calc + 2 Short + 2 Appli', sheet:'Sound_Exercise_P7', color:'tc-work', file:'สื่อ12_Exercise_12ข้อ.html' },

  // ─── แผน 8 · คลื่นนิ่ง + Resonance Tube ───
  'engage8':   { ico:'🚀', name:'เกริ่นนำ + Engage', desc:'ความรู้เดิม + Real Object', sheet:'Sound_Engage_P8', color:'tc-engage', file:'สื่อ00_Engage_เกริ่นนำ.html' },
  'cc8':       { ico:'🎭', name:'Concept Cartoon · เป่าขวด', desc:'4 ตัวละครถกเถียง', sheet:'Sound_CC_P8', color:'tc-cc', file:'สื่อ01_ConceptCartoon.html' },
  'poe8':      { ico:'🔮', name:'POE-01 · ทดลองจริง', desc:'P + O (ทดลอง+บันทึก) + E + Misconception 4 ตัว', sheet:'Sound_POE_P8', color:'tc-poe', file:'สื่อ02_POE-01_ใบบันทึก.html' },
  'matrix8':   { ico:'📋', name:'Matrix Table', desc:'Modes ของท่อปลายปิด/เปิด', sheet:'Sound_Matrix_P8', color:'tc-work', file:'สื่อ03_MatrixTable.html' },
  'spot8':     { ico:'🔍', name:'Spot the Error', desc:'4 ข้อ · พร้อมเฉลย', sheet:'Sound_Spot_P8', color:'tc-work', file:'สื่อ04_SpotTheError.html' },
  'f8-pre':    { ico:'📝', name:'F8 Four-tier · Pre',  desc:'มโนทัศน์ คลื่นนิ่ง + Resonance Tube · ก่อนเรียน', sheet:'Sound_F_Fourtier_P8', color:'tc-ft', file:'สื่อ05_F8_Fourtier_PrePost.html' },
  'f8-post':   { ico:'📝', name:'F8 Four-tier · Post', desc:'มโนทัศน์ คลื่นนิ่ง + Resonance Tube · หลังเรียน', sheet:'Sound_F_Fourtier_P8', color:'tc-ft', file:'สื่อ05_F8_Fourtier_PrePost.html' },
  'mj8':       { ico:'📓', name:'MJ Journal 3-2-1', desc:'3 เข้าใจ · 2 น่าสนใจ · 1 สงสัย', sheet:'Sound_MJ_P8', color:'tc-mj', file:'สื่อ07_MJ-01_MetacognitiveJournal.html' },
  'exit8':     { ico:'🎫', name:'Exit Ticket', desc:'5 ข้อสั้น ๆ ก่อนเลิกคาบ', sheet:'Sound_Exit_P8', color:'tc-ft', file:'สื่อ10_ExitTicket.html' },
  'calc8':     { ico:'📐', name:'ใบงาน Calc 8.1', desc:'Math Builder 5 ข้อ + canvas', sheet:'Sound_Calc_P8', color:'tc-work', file:'สื่อ11_Calc_ใบงาน8.1.html' },
  'exercise8': { ico:'📚', name:'แบบฝึกหัด 12 ข้อ', desc:'4 MCQ + 4 Calc + 2 Short + 2 Appli', sheet:'Sound_Exercise_P8', color:'tc-work', file:'สื่อ12_Exercise_12ข้อ.html' },

  // ─── แผน 9 · บีต (Beat) ───
  'engage9':   { ico:'🚀', name:'เกริ่นนำ + Engage', desc:'ความรู้เดิม + Story Hook', sheet:'Sound_Engage_P9', color:'tc-engage', file:'สื่อ00_Engage_เกริ่นนำ.html' },
  'cc9':       { ico:'🎭', name:'Concept Cartoon · จูนกีตาร์', desc:'4 ตัวละครถกเถียง', sheet:'Sound_CC_P9', color:'tc-cc', file:'สื่อ01_ConceptCartoon.html' },
  'poe9':      { ico:'🔮', name:'POE-01 · ทดลองจริง', desc:'P + O (ทดลอง+บันทึก) + E + Misconception 4 ตัว', sheet:'Sound_POE_P9', color:'tc-poe', file:'สื่อ02_POE-01_ใบบันทึก.html' },
  'matrix9':   { ico:'📋', name:'Matrix Table', desc:'Beat ในสถานการณ์ต่าง ๆ', sheet:'Sound_Matrix_P9', color:'tc-work', file:'สื่อ03_MatrixTable.html' },
  'spot9':     { ico:'🔍', name:'Spot the Error', desc:'4 ข้อ · พร้อมเฉลย', sheet:'Sound_Spot_P9', color:'tc-work', file:'สื่อ04_SpotTheError.html' },
  'f9-pre':    { ico:'📝', name:'F9 Four-tier · Pre',  desc:'มโนทัศน์ บีต (Beat) · ก่อนเรียน', sheet:'Sound_F_Fourtier_P9', color:'tc-ft', file:'สื่อ05_F9_Fourtier_PrePost.html' },
  'f9-post':   { ico:'📝', name:'F9 Four-tier · Post', desc:'มโนทัศน์ บีต (Beat) · หลังเรียน', sheet:'Sound_F_Fourtier_P9', color:'tc-ft', file:'สื่อ05_F9_Fourtier_PrePost.html' },
  'mj9':       { ico:'📓', name:'MJ Journal 3-2-1', desc:'3 เข้าใจ · 2 น่าสนใจ · 1 สงสัย', sheet:'Sound_MJ_P9', color:'tc-mj', file:'สื่อ07_MJ-01_MetacognitiveJournal.html' },
  'exit9':     { ico:'🎫', name:'Exit Ticket', desc:'5 ข้อสั้น ๆ ก่อนเลิกคาบ', sheet:'Sound_Exit_P9', color:'tc-ft', file:'สื่อ10_ExitTicket.html' },
  'calc9':     { ico:'📐', name:'ใบงาน Calc 9.1', desc:'Math Builder 5 ข้อ + canvas', sheet:'Sound_Calc_P9', color:'tc-work', file:'สื่อ11_Calc_ใบงาน9.1.html' },
  'exercise9': { ico:'📚', name:'แบบฝึกหัด 12 ข้อ', desc:'4 MCQ + 4 Calc + 2 Short + 2 Appli', sheet:'Sound_Exercise_P9', color:'tc-work', file:'สื่อ12_Exercise_12ข้อ.html' },

  // ─── แผน 10 · Doppler + Shock Wave ───
  'engage10':   { ico:'🚀', name:'เกริ่นนำ + Engage', desc:'ความรู้เดิม + Comparison', sheet:'Sound_Engage_P10', color:'tc-engage', file:'สื่อ00_Engage_เกริ่นนำ.html' },
  'cc10':       { ico:'🎭', name:'Concept Cartoon · คนขับรถพยาบาล', desc:'4 ตัวละครถกเถียง', sheet:'Sound_CC_P10', color:'tc-cc', file:'สื่อ01_ConceptCartoon.html' },
  'poe10':      { ico:'🔮', name:'POE-01 · ทดลองจริง', desc:'P + O (ทดลอง+บันทึก) + E + Misconception 4 ตัว', sheet:'Sound_POE_P10', color:'tc-poe', file:'สื่อ02_POE-01_ใบบันทึก.html' },
  'matrix10':   { ico:'📋', name:'Matrix Table', desc:'4 กรณีของ Doppler', sheet:'Sound_Matrix_P10', color:'tc-work', file:'สื่อ03_MatrixTable.html' },
  'spot10':     { ico:'🔍', name:'Spot the Error', desc:'4 ข้อ · พร้อมเฉลย', sheet:'Sound_Spot_P10', color:'tc-work', file:'สื่อ04_SpotTheError.html' },
  'f10-pre':    { ico:'📝', name:'F10 Four-tier · Pre',  desc:'มโนทัศน์ Doppler + Shock Wave · ก่อนเรียน', sheet:'Sound_F_Fourtier_P10', color:'tc-ft', file:'สื่อ05_F10_Fourtier_PrePost.html' },
  'f10-post':   { ico:'📝', name:'F10 Four-tier · Post', desc:'มโนทัศน์ Doppler + Shock Wave · หลังเรียน', sheet:'Sound_F_Fourtier_P10', color:'tc-ft', file:'สื่อ05_F10_Fourtier_PrePost.html' },
  'mj10':       { ico:'📓', name:'MJ Journal 3-2-1', desc:'3 เข้าใจ · 2 น่าสนใจ · 1 สงสัย', sheet:'Sound_MJ_P10', color:'tc-mj', file:'สื่อ07_MJ-01_MetacognitiveJournal.html' },
  'exit10':     { ico:'🎫', name:'Exit Ticket', desc:'5 ข้อสั้น ๆ ก่อนเลิกคาบ', sheet:'Sound_Exit_P10', color:'tc-ft', file:'สื่อ10_ExitTicket.html' },
  'calc10':     { ico:'📐', name:'ใบงาน Calc 10.1', desc:'Math Builder 5 ข้อ + canvas', sheet:'Sound_Calc_P10', color:'tc-work', file:'สื่อ11_Calc_ใบงาน10.1.html' },
  'exercise10': { ico:'📚', name:'แบบฝึกหัด 12 ข้อ', desc:'4 MCQ + 4 Calc + 2 Short + 2 Appli', sheet:'Sound_Exercise_P10', color:'tc-work', file:'สื่อ12_Exercise_12ข้อ.html' },

  // ─── แผน 11 · การประยุกต์ + Posttest ───
  'engage11':   { ico:'🚀', name:'เกริ่นนำ + Engage', desc:'ความรู้เดิม + Gallery Walk', sheet:'Sound_Engage_P11', color:'tc-engage', file:'สื่อ00_Engage_เกริ่นนำ.html' },
  'cc11':       { ico:'🎭', name:'Concept Cartoon · Sound Detective', desc:'4 ตัวละครถกเถียง', sheet:'Sound_CC_P11', color:'tc-cc', file:'สื่อ01_ConceptCartoon.html' },
  'poe11':      { ico:'🔮', name:'POE-01 · ทดลองจริง', desc:'P + O (ทดลอง+บันทึก) + E + Misconception 4 ตัว', sheet:'Sound_POE_P11', color:'tc-poe', file:'สื่อ02_POE-01_ใบบันทึก.html' },
  'matrix11':   { ico:'📋', name:'Matrix Table', desc:'Synthesis Map ภาพรวมหน่วยเสียง', sheet:'Sound_Matrix_P11', color:'tc-work', file:'สื่อ03_MatrixTable.html' },
  'spot11':     { ico:'🔍', name:'Spot the Error', desc:'4 ข้อ · พร้อมเฉลย', sheet:'Sound_Spot_P11', color:'tc-work', file:'สื่อ04_SpotTheError.html' },
  'f11-pre':    { ico:'📝', name:'F11 Four-tier · Pre',  desc:'มโนทัศน์ การประยุกต์ + Posttest · ก่อนเรียน', sheet:'Sound_F_Fourtier_P11', color:'tc-ft', file:'สื่อ05_F11_Fourtier_PrePost.html' },
  'f11-post':   { ico:'📝', name:'F11 Four-tier · Post', desc:'มโนทัศน์ การประยุกต์ + Posttest · หลังเรียน', sheet:'Sound_F_Fourtier_P11', color:'tc-ft', file:'สื่อ05_F11_Fourtier_PrePost.html' },
  'mj11':       { ico:'📓', name:'MJ Journal 3-2-1', desc:'3 เข้าใจ · 2 น่าสนใจ · 1 สงสัย', sheet:'Sound_MJ_P11', color:'tc-mj', file:'สื่อ07_MJ-01_MetacognitiveJournal.html' },
  'exit11':     { ico:'🎫', name:'Exit Ticket', desc:'5 ข้อสั้น ๆ ก่อนเลิกคาบ', sheet:'Sound_Exit_P11', color:'tc-ft', file:'สื่อ10_ExitTicket.html' },
  'calc11':     { ico:'📐', name:'ใบงาน Calc 11.1', desc:'Math Builder 5 ข้อ + canvas', sheet:'Sound_Calc_P11', color:'tc-work', file:'สื่อ11_Calc_ใบงาน11.1.html' },
  'exercise11': { ico:'📚', name:'แบบฝึกหัด 12 ข้อ', desc:'4 MCQ + 4 Calc + 2 Short + 2 Appli', sheet:'Sound_Exercise_P11', color:'tc-work', file:'สื่อ12_Exercise_12ข้อ.html' },

};
