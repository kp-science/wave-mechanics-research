// ═══════════════════════════════════════════════════════════════════
// Content Pack: Tools (SHM · per-plan tool list + tool defs)
// ═══════════════════════════════════════════════════════════════════
// Tools ที่ใช้งานได้ในแต่ละแผน · ลำดับใน array = ลำดับการ์ดที่แสดง
// ═══════════════════════════════════════════════════════════════════
window.KP_PLAN_TOOLS = {
  1: ['tl-pre','f1-pre','poe','calc1','spot1','cer','exercise1','tl-post','f1-post','mj','upload'],
  2: ['tl-pre','f2-pre','poe','calc2','spot2','cer','exercise2','tl-post','f2-post','mj','upload'],
  3: ['tl-pre','f3-pre','poe3','concept3','calc3','case3','exercise3-ext','tl-post','exit3','mj','upload'],
  4: ['tl-pre','f4-pre','jigsaw4','concept4','calc4','case4','exercise4-ext','tl-post','exit4','mj','upload'],
  5: ['tl-pre','f5-pre','tps5','concept5','calc5','exercise5-ext','tl-post','f5-post','exit5','mj','upload'],
  6: ['tl-pre','f6-pre','engage6','sim6','concept6','calc6','exercise6-ext','exit6','f6-post','mj','upload']
};

// นิยาม tool แต่ละชนิด (icon, ชื่อ, คำอธิบาย, sheet ปลายทาง, สีธีม)
// sheet prefix ขึ้นต้นด้วย SHM_ เพื่อแยก analytics จากคลื่นกล
window.KP_TOOL_DEFS = {
  // ─── Self-assessment (ใช้ทุกแผน) ───
  'tl-pre':  { ico:'🚦', name:'Traffic Light · ก่อนเรียน', desc:'ยกบัตร 🟢🟡🔴 ประเมินตนเองก่อนคาบ', sheet:'SHM_TL', color:'tc-tl' },
  'tl-post': { ico:'🚦', name:'Traffic Light · หลังเรียน', desc:'ยกบัตร 🟢🟡🔴 ประเมินตนเองหลังคาบ', sheet:'SHM_TL', color:'tc-tl' },
  'mj':      { ico:'📓', name:'Metacognitive Journal 3-2-1', desc:'3 เข้าใจใหม่ · 2 น่าสนใจ · 1 คำถาม', sheet:'SHM_MJ', color:'tc-mj' },
  'upload':  { ico:'📎', name:'อัปโหลดใบงาน', desc:'ส่งไฟล์ PDF/รูปใบงานที่เขียนมือ', sheet:'SHM_Upload', color:'tc-up' },

  // ─── Four-tier diagnostic (Pre/Post รายแผน) ───
  'f1-pre':  { ico:'📝', name:'F1 Four-tier · Pre', desc:'มโนทัศน์นิยาม SHM 3 ข้อ ก่อนเรียน', sheet:'SHM_F_Pre', color:'tc-ft' },
  'f1-post': { ico:'📝', name:'F1 Four-tier · Post', desc:'มโนทัศน์นิยาม SHM 3 ข้อ หลังเรียน', sheet:'SHM_F_Post', color:'tc-ft' },
  'f2-pre':  { ico:'📝', name:'F2 Four-tier · Pre', desc:'มโนทัศน์ลูกตุ้มอย่างง่าย ก่อนเรียน', sheet:'SHM_F_Pre', color:'tc-ft' },
  'f2-post': { ico:'📝', name:'F2 Four-tier · Post', desc:'มโนทัศน์ลูกตุ้มอย่างง่าย หลังเรียน', sheet:'SHM_F_Post', color:'tc-ft' },
  'f3-pre':  { ico:'📝', name:'F3 Four-tier · Pre', desc:'มโนทัศน์มวล-สปริง ก่อนเรียน', sheet:'SHM_F_Pre', color:'tc-ft' },
  'f4-pre':  { ico:'📝', name:'F4 Four-tier · Pre', desc:'มโนทัศน์เฟส x, v, a ก่อนเรียน', sheet:'SHM_F_Pre', color:'tc-ft' },
  'f5-pre':  { ico:'📝', name:'F5 Four-tier · Pre', desc:'มโนทัศน์พลังงาน SHM ก่อนเรียน', sheet:'SHM_F_Pre', color:'tc-ft' },
  'f5-post': { ico:'📝', name:'F5 Four-tier · Post', desc:'มโนทัศน์พลังงาน SHM หลังเรียน', sheet:'SHM_F_Post', color:'tc-ft' },
  'f6-pre':  { ico:'📋', name:'Pretest Unit · 4-tier', desc:'มโนทัศน์ Damping/Resonance ก่อน Capstone', sheet:'SHM_F_Pre', color:'tc-ft' },
  'f6-post': { ico:'🏆', name:'Posttest Unit · 4-tier', desc:'มโนทัศน์รวมหน่วย SHM หลังเรียน', sheet:'SHM_F_Post', color:'tc-ft' },

  // ─── POE / Lab worksheets ───
  'poe':     { ico:'🔮', name:'POE · ใบบันทึก',           desc:'Predict · Observe · Explain (แผน 1–2)', sheet:'SHM_POE', color:'tc-poe' },
  'poe3':    { ico:'🔮', name:'POE · Spring Builder',     desc:'Predict-Observe-Explain ระบบมวล-สปริง', sheet:'SHM_POE', color:'tc-poe' },
  'tps5':    { ico:'👥', name:'TPS + SIM05 · ใบบันทึก',   desc:'Think-Pair-Share + Simulation พลังงาน', sheet:'SHM_TPS', color:'tc-poe' },
  'sim6':    { ico:'🧪', name:'SIM06 · Damping & Resonance', desc:'ใบบันทึก Simulation Damping/Resonance', sheet:'SHM_SIM', color:'tc-poe' },

  // ─── Cognitive tools (Concept Map / Jigsaw / CER) ───
  'jigsaw4': { ico:'🧩', name:'Jigsaw · Phase Explorer',  desc:'4 expert groups วิเคราะห์ x, v, a · เฟส', sheet:'SHM_Jigsaw', color:'tc-ce' },
  'concept3':{ ico:'🗺',  name:'Concept Map · มวล-สปริง',  desc:'Graphic organizer เชื่อมแนวคิด-สมการ', sheet:'SHM_Concept', color:'tc-ce' },
  'concept4':{ ico:'🗺',  name:'Concept Map + Vector Draw', desc:'แผนผังความคิด + วาด vector x, v, a', sheet:'SHM_Concept', color:'tc-ce' },
  'concept5':{ ico:'🗺',  name:'Data Analysis + Concept Map', desc:'วิเคราะห์ข้อมูลพลังงาน + ผังความคิด', sheet:'SHM_Concept', color:'tc-ce' },
  'concept6':{ ico:'🗺',  name:'Debate + Concept Map',     desc:'Debate เงื่อนไข Resonance + ผังความคิด', sheet:'SHM_Concept', color:'tc-ce' },
  'cer':     { ico:'🗒',  name:'CER LiveBoard',            desc:'Claim-Evidence-Reasoning โพสต์ขึ้นกระดาน', sheet:'SHM_CER', color:'tc-ce' },
  'engage6': { ico:'🎬', name:'Video Analysis · Engage',   desc:'วิเคราะห์คลิป Resonance/Damping จริง', sheet:'SHM_Engage', color:'tc-ce' },

  // ─── Exercises / calculations ───
  'calc1':   { ico:'🧮', name:'ใบงาน 1.1 · Calc f, T, ω', desc:'โจทย์คำนวณ 5 ข้อ + canvas วาดกราฟ', sheet:'SHM_Calc', color:'tc-ma' },
  'spot1':   { ico:'🔍', name:'ใบงาน 1.2 · Spot the Error', desc:'หาข้อผิดพลาด 3 สถานการณ์ · M1.x', sheet:'SHM_Spot', color:'tc-sp' },
  'calc2':   { ico:'🧮', name:'ใบงาน 2.1 · Calc 6 ข้อ',   desc:'โจทย์ลูกตุ้ม T, f, ω + g determination', sheet:'SHM_Calc', color:'tc-ma' },
  'spot2':   { ico:'🔍', name:'ใบงาน 2.2 · Spot the Error', desc:'หาข้อผิดพลาด 4 ข้อ · M2.1–M2.4', sheet:'SHM_Spot', color:'tc-sp' },
  'calc3':   { ico:'🧮', name:'Exercise · Mass-Spring 8 ข้อ', desc:'โจทย์คำนวณระบบมวล-สปริง', sheet:'SHM_Calc', color:'tc-ma' },
  'calc4':   { ico:'🧮', name:'Exercise · Phase',         desc:'โจทย์เฟส x, v, a + วิเคราะห์', sheet:'SHM_Calc', color:'tc-ma' },
  'calc5':   { ico:'🧮', name:'Exercise · Energy',        desc:'โจทย์พลังงาน E∝A², v=ω√(A²−y²)', sheet:'SHM_Calc', color:'tc-ma' },
  'calc6':   { ico:'🧮', name:'Exercise + PBL',           desc:'โจทย์ Damping/Resonance + Problem-based', sheet:'SHM_Calc', color:'tc-ma' },
  'case3':   { ico:'🚗', name:'Case Study · โช้คอัพ',     desc:'วิเคราะห์ระบบกันสะเทือนรถยนต์', sheet:'SHM_Case', color:'tc-ce' },
  'case4':   { ico:'🌍', name:'Case Study · Seismograph', desc:'วิเคราะห์เครื่องบันทึกแผ่นดินไหว', sheet:'SHM_Case', color:'tc-ce' },
  'exercise1': { ico:'📝', name:'Exercise · 12 ข้อ',      desc:'การบ้านท้ายแผน 12 ข้อ', sheet:'SHM_Ex', color:'tc-ma' },
  'exercise2': { ico:'📝', name:'Exercise · 12 ข้อ',      desc:'การบ้านท้ายแผน 12 ข้อ', sheet:'SHM_Ex', color:'tc-ma' },
  'exercise3-ext': { ico:'📝', name:'Exercise เพิ่มเติม', desc:'โจทย์ขยายผล (ทำเอง)', sheet:'SHM_Ex', color:'tc-ma' },
  'exercise4-ext': { ico:'📝', name:'Exercise เพิ่มเติม', desc:'โจทย์ขยายผล (ทำเอง)', sheet:'SHM_Ex', color:'tc-ma' },
  'exercise5-ext': { ico:'📝', name:'Exercise เพิ่มเติม', desc:'โจทย์ขยายผล (ทำเอง)', sheet:'SHM_Ex', color:'tc-ma' },
  'exercise6-ext': { ico:'📝', name:'Exercise เพิ่มเติม', desc:'โจทย์ขยายผล (ทำเอง)', sheet:'SHM_Ex', color:'tc-ma' },

  // ─── Exit tickets (รายแผน) ───
  'exit3':   { ico:'🎫', name:'Exit Ticket · แผน 3', desc:'Formative check ปลายคาบ', sheet:'SHM_Exit', color:'tc-mj' },
  'exit4':   { ico:'🎫', name:'Exit Ticket · แผน 4', desc:'Formative check ปลายคาบ', sheet:'SHM_Exit', color:'tc-mj' },
  'exit5':   { ico:'🎫', name:'Exit Ticket · แผน 5', desc:'Formative check ปลายคาบ', sheet:'SHM_Exit', color:'tc-mj' },
  'exit6':   { ico:'🎫', name:'Exit Ticket · แผน 6', desc:'Formative check ปลายคาบ', sheet:'SHM_Exit', color:'tc-mj' }
};
