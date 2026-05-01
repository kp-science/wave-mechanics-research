// ═══════════════════════════════════════════════════════════════════
// Content Pack: Tools (Astronomy · COSMOS LOG · Season 1)
// ═══════════════════════════════════════════════════════════════════
// ทุกแผน (EP01–EP08) ใช้ชุดเครื่องมือมาตรฐานเหมือนกัน:
//   tl-pre · poe · mj · upload · tl-post
// (Pre/Post-test built-in อยู่ในตัวบทเรียน p01-pretest.html ของแต่ละ EP)
// ═══════════════════════════════════════════════════════════════════

window.KP_PLAN_TOOLS = {
  1: ['tl-pre','poe','mj','upload','tl-post'],
  2: ['tl-pre','poe','mj','upload','tl-post'],
  3: ['tl-pre','poe','mj','upload','tl-post'],
  4: ['tl-pre','poe','mj','upload','tl-post'],
  5: ['tl-pre','poe','mj','upload','tl-post'],
  6: ['tl-pre','poe','mj','upload','tl-post'],
  7: ['tl-pre','poe','mj','upload','tl-post'],
  8: ['tl-pre','poe','mj','upload','tl-post']
};

window.KP_TOOL_DEFS = {
  'tl-pre':  { ico:'🚦', name:'TL-01 ก่อนเรียน', desc:'ยกบัตร 🟢🟡🔴 ประเมินตนเองก่อนคาบ', sheet:'TL', color:'tc-tl' },
  'tl-post': { ico:'🚦', name:'TL-01 หลังเรียน', desc:'ยกบัตร 🟢🟡🔴 ประเมินตนเองหลังคาบ', sheet:'TL', color:'tc-tl' },
  'poe':     { ico:'🔮', name:'POE · ใบบันทึก',  desc:'บันทึก Predict · Observe · Explain ระหว่างทำ EP',   sheet:'POE', color:'tc-poe' },
  'mj':      { ico:'📓', name:'MJ-01 · Journal 3-2-1', desc:'3 เข้าใจใหม่ · 2 น่าสนใจ · 1 คำถาม', sheet:'MJ', color:'tc-mj' },
  'upload':  { ico:'📎', name:'อัปโหลดใบงาน',     desc:'ส่งไฟล์ PDF/รูปใบงานที่เขียนมือ',                    sheet:'Upload', color:'tc-up' }
};
