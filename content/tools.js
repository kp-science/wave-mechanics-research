// ═══════════════════════════════════════════════════════════════════
// Content Pack: Tools (รายการเครื่องมือต่อแผน + นิยาม tool)
// ═══════════════════════════════════════════════════════════════════

// Tools ที่ใช้งานได้ในแต่ละแผน (ลำดับใน array = ลำดับการ์ดที่แสดง)
window.KP_PLAN_TOOLS = {
  1: ['tl-pre','f1-pre','poe','matrix','spot','tl-post','f1-post','mj','upload'],
  2: ['tl-pre','f2-pre','poe','calc2','spot2','tl-post','f2-post','mj','upload'],
  3: ['tl-pre','f3-pre','poe','tl-post','f3-post','mj','upload'],
  4: ['tl-pre','f4-pre','poe','tl-post','f4-post','mj','upload'],
  5: ['tl-pre','f5-pre','poe','tl-post','f5-post','mj','upload'],
  6: ['tl-pre','f6-pre','poe','tl-post','f6-post','mj','upload'],
  7: ['tl-pre','f7-pre','poe','tl-post','f7-post','mj','upload'],
  8: ['tl-pre','f8-pre','poe','tl-post','f8-post','mj','upload'],
  9: ['tl-pre','f9-pre','poe','tl-post','f9-post','mj','upload'],
  10:['tl-pre','ft02','tl-post','mj','upload']
};

// นิยาม tool แต่ละชนิด (icon, ชื่อ, คำอธิบาย, sheet ปลายทาง, สีธีม)
window.KP_TOOL_DEFS = {
  'tl-pre':  { ico:'🚦', name:'TL-01 ก่อนเรียน', desc:'ยกบัตร 🟢🟡🔴 ประเมินตนเองก่อนคาบ', sheet:'TL', color:'tc-tl' },
  'tl-post': { ico:'🚦', name:'TL-01 หลังเรียน', desc:'ยกบัตร 🟢🟡🔴 ประเมินตนเองหลังคาบ', sheet:'TL', color:'tc-tl' },
  'f1-pre':  { ico:'📝', name:'F1 Four-tier · Pre', desc:'ข้อสอบมโนทัศน์ 3 ข้อ ก่อนเรียน', sheet:'F_Pre', color:'tc-ft' },
  'f1-post': { ico:'📝', name:'F1 Four-tier · Post', desc:'ข้อสอบมโนทัศน์ 3 ข้อ หลังเรียน', sheet:'F_Post', color:'tc-ft' },
  'f2-pre':  { ico:'📝', name:'F2 Four-tier · Pre', desc:'ข้อสอบมโนทัศน์ v=fλ 3 ข้อ ก่อนเรียน', sheet:'F_Pre', color:'tc-ft' },
  'f2-post': { ico:'📝', name:'F2 Four-tier · Post', desc:'ข้อสอบมโนทัศน์ v=fλ 3 ข้อ หลังเรียน', sheet:'F_Post', color:'tc-ft' },
  'f3-pre':  { ico:'📝', name:'F3 Four-tier · Pre', desc:'ข้อสอบมโนทัศน์ 3 ข้อ ก่อนเรียน', sheet:'F_Pre', color:'tc-ft' },
  'f3-post': { ico:'📝', name:'F3 Four-tier · Post', desc:'ข้อสอบมโนทัศน์ 3 ข้อ หลังเรียน', sheet:'F_Post', color:'tc-ft' },
  'f4-pre':  { ico:'📝', name:'F4 Four-tier · Pre', desc:'ข้อสอบมโนทัศน์ 3 ข้อ ก่อนเรียน', sheet:'F_Pre', color:'tc-ft' },
  'f4-post': { ico:'📝', name:'F4 Four-tier · Post', desc:'ข้อสอบมโนทัศน์ 3 ข้อ หลังเรียน', sheet:'F_Post', color:'tc-ft' },
  'f5-pre':  { ico:'📝', name:'F5 Four-tier · Pre', desc:'ข้อสอบมโนทัศน์ 3 ข้อ ก่อนเรียน', sheet:'F_Pre', color:'tc-ft' },
  'f5-post': { ico:'📝', name:'F5 Four-tier · Post', desc:'ข้อสอบมโนทัศน์ 3 ข้อ หลังเรียน', sheet:'F_Post', color:'tc-ft' },
  'f6-pre':  { ico:'📝', name:'F6 Four-tier · Pre', desc:'ข้อสอบมโนทัศน์ 3 ข้อ ก่อนเรียน', sheet:'F_Pre', color:'tc-ft' },
  'f6-post': { ico:'📝', name:'F6 Four-tier · Post', desc:'ข้อสอบมโนทัศน์ 3 ข้อ หลังเรียน', sheet:'F_Post', color:'tc-ft' },
  'f7-pre':  { ico:'📝', name:'F7 Four-tier · Pre', desc:'ข้อสอบมโนทัศน์ 3 ข้อ ก่อนเรียน', sheet:'F_Pre', color:'tc-ft' },
  'f7-post': { ico:'📝', name:'F7 Four-tier · Post', desc:'ข้อสอบมโนทัศน์ 3 ข้อ หลังเรียน', sheet:'F_Post', color:'tc-ft' },
  'f8-pre':  { ico:'📝', name:'F8 Four-tier · Pre', desc:'ข้อสอบมโนทัศน์ 3 ข้อ ก่อนเรียน', sheet:'F_Pre', color:'tc-ft' },
  'f8-post': { ico:'📝', name:'F8 Four-tier · Post', desc:'ข้อสอบมโนทัศน์ 3 ข้อ หลังเรียน', sheet:'F_Post', color:'tc-ft' },
  'f9-pre':  { ico:'📝', name:'F9 Four-tier · Pre', desc:'ข้อสอบมโนทัศน์ 3 ข้อ ก่อนเรียน', sheet:'F_Pre', color:'tc-ft' },
  'f9-post': { ico:'📝', name:'F9 Four-tier · Post', desc:'ข้อสอบมโนทัศน์ 3 ข้อ หลังเรียน', sheet:'F_Post', color:'tc-ft' },
  'poe':     { ico:'🔮', name:'POE-01', desc:'บันทึก Predict · Observe · Explain', sheet:'POE', color:'tc-poe' },
  'matrix':  { ico:'📊', name:'ใบ 1.1 · Matrix Table', desc:'เปรียบเทียบคลื่นตามขวาง/ตามยาว', sheet:'Matrix', color:'tc-ma' },
  'spot':    { ico:'🔍', name:'ใบ 1.2 · Spot the Error', desc:'หาข้อผิดพลาด 4 ข้อความ', sheet:'Spot', color:'tc-sp' },
  'calc2':   { ico:'🧮', name:'ใบ 2.1 · โจทย์คำนวณ v=fλ', desc:'โจทย์ 5 ข้อ พื้นฐาน→ท้าทาย', sheet:'Calc', color:'tc-ma' },
  'spot2':   { ico:'🔍', name:'ใบ 2.2 · Spot the Error', desc:'หาข้อผิดพลาด 3 ข้อ (M2.1, M2.4)', sheet:'Spot', color:'tc-sp' },
  'mj':      { ico:'📓', name:'MJ-01 · Journal 3-2-1', desc:'3 เข้าใจใหม่ · 2 น่าสนใจ · 1 คำถาม', sheet:'MJ', color:'tc-mj' },
  'upload':  { ico:'📎', name:'อัปโหลดใบงาน', desc:'ส่งไฟล์ PDF/รูปใบงานที่เขียนมือ', sheet:'Upload', color:'tc-up' },
  'ft02':    { ico:'🏆', name:'FT-02 Post-test หลัก', desc:'ข้อสอบมโนทัศน์รวม 20 ข้อ', sheet:'FT02', color:'tc-ft' }
};
