// ═══════════════════════════════════════════════════════════════════
// Content Pack: Worksheets (เสียง · schema-driven · skeleton)
// ═══════════════════════════════════════════════════════════════════
// โครง: KP_WORKSHEETS[planNo][type] = {title, viewFile, submitLabel, sheetPrefix, ...}
// types ที่ใช้ในระบบ: 'matrix' | 'spot' | 'calc' | 'poe' | 'exercise' | 'exit' ฯลฯ
// ═══════════════════════════════════════════════════════════════════
// 📌 NOTE: เสียงใช้ "เปิดไฟล์ HTML สื่อ" (จาก media.js + tools.js) เป็นหลัก
//          ยังไม่ใช้ schema-driven render ของ engine
//          เติม schema ทีหลังถ้าต้องการให้ render ใน-app + ส่งข้อมูลผ่าน
//          worksheet-core (auto-save + identity auto-fill + JSON export)
// ═══════════════════════════════════════════════════════════════════
window.KP_WORKSHEETS = {
  1: {},  // การเกิดและการเคลื่อนที่ของเสียง
  2: {},  // การกระจัดและคลื่นความดัน
  3: {},  // อัตราเร็วของเสียง
  4: {},  // พฤติกรรมของคลื่นเสียง
  5: {},  // ความเข้มและระดับเสียง
  6: {},  // การได้ยินและมลพิษเสียง
  7: {},  // Pitch + Timbre
  8: {},  // คลื่นนิ่ง + Resonance Tube
  9: {},  // บีต (Beat)
  10: {},  // Doppler + Shock Wave
  11: {},  // การประยุกต์ + Posttest
};
