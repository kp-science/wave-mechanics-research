// ═══════════════════════════════════════════════════════════════════
// Content Pack: Tools (Astronomy — SCAFFOLD)
// ═══════════════════════════════════════════════════════════════════
// TODO: กำหนด tools ที่ใช้ต่อแผน + นิยาม tool แต่ละชนิด
// Tools ทั่วไปที่น่าใช้ซ้ำจากฟิสิกส์ 3: tl-pre, tl-post, poe, mj, upload
// ═══════════════════════════════════════════════════════════════════

window.KP_PLAN_TOOLS = {
  // 1: ['tl-pre','poe','tl-post','mj','upload'],
  // 2: ['tl-pre','poe','tl-post','mj','upload'],
};

window.KP_TOOL_DEFS = {
  // Shared tools (ใช้ร่วมกับฟิสิกส์ 3)
  'tl-pre':  { ico:'🚦', name:'TL-01 ก่อนเรียน', desc:'ยกบัตร 🟢🟡🔴 ประเมินตนเอง', sheet:'TL', color:'tc-tl' },
  'tl-post': { ico:'🚦', name:'TL-01 หลังเรียน', desc:'ยกบัตร 🟢🟡🔴 ประเมินตนเอง', sheet:'TL', color:'tc-tl' },
  'poe':     { ico:'🔮', name:'POE-01', desc:'บันทึก Predict · Observe · Explain', sheet:'POE', color:'tc-poe' },
  'mj':      { ico:'📓', name:'MJ-01 · Journal 3-2-1', desc:'3 เข้าใจใหม่ · 2 น่าสนใจ · 1 คำถาม', sheet:'MJ', color:'tc-mj' },
  'upload':  { ico:'📎', name:'อัปโหลดใบงาน', desc:'ส่งไฟล์ PDF/รูปใบงานที่เขียนมือ', sheet:'Upload', color:'tc-up' },

  // TODO: Astronomy-specific tools (เช่น sky-observation, planetarium-screenshot)
};
