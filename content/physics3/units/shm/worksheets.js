// ═══════════════════════════════════════════════════════════════════
// Content Pack: Worksheets (SHM · schema-driven · skeleton)
// ═══════════════════════════════════════════════════════════════════
// โครง: KP_WORKSHEETS[planNo][type] = {title, viewFile, submitLabel, sheetPrefix, ...}
// types ที่ใช้ในระบบ: 'matrix' | 'spot' | 'calc' | 'poe' | 'ft01' ฯลฯ
// ═══════════════════════════════════════════════════════════════════
// 📌 NOTE: SHM ใช้ "เปิดไฟล์ HTML สื่อ" (จาก media.js) เป็นหลัก
//          ยังไม่ใช้ schema-driven render ของ engine
//          เติม schema ทีหลังถ้าต้องการให้ render ใน-app + ส่งข้อมูลผ่าน
//          worksheet-core (auto-save + identity auto-fill + JSON export)
// ═══════════════════════════════════════════════════════════════════
window.KP_WORKSHEETS = {
  1: {},  // นิยาม SHM
  2: {},  // ลูกตุ้ม
  3: {},  // มวล-สปริง
  4: {},  // เฟส x, v, a
  5: {},  // พลังงาน
  6: {}   // Damping/Resonance
};
