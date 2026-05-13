// ═══════════════════════════════════════════════════════════════════
// Content Pack: Questions (เสียง · KP_FT_BANK skeleton)
// ═══════════════════════════════════════════════════════════════════
// 📌 NOTE: Four-tier ของหน่วยเสียงปัจจุบันใช้ไฟล์ HTML แต่ละแผน
//          (สื่อ05_F{n}_Fourtier_PrePost.html) ไม่ได้รวมเป็น bank กลาง
//          KP_FT_BANK[plan] = [] ว่าง เพราะใช้ HTML สื่อแทน engine's FT renderer
//          เติม array ทีหลังถ้าอยากใช้ engine renderer สำหรับ FT-01/FT-02 Unit-wide
// ⚠️ ต้อง export ชื่อ KP_FT_BANK (ไม่มี suffix) เพื่อให้ engine ที่บรรทัด 2037 ทำงานได้
// ═══════════════════════════════════════════════════════════════════
window.KP_FT_BANK = {
  1: [],  // แผน 1 · การเกิดเสียง
  2: [],  // แผน 2 · y(x) vs ΔP(x)
  3: [],  // แผน 3 · v = 331 + 0.6T
  4: [],  // แผน 4 · 4 พฤติกรรม
  5: [],  // แผน 5 · I, β
  6: [],  // แผน 6 · การได้ยิน · มลพิษ
  7: [],  // แผน 7 · Pitch, Timbre
  8: [],  // แผน 8 · Standing wave, Resonance
  9: [],  // แผน 9 · Beat
  10: [], // แผน 10 · Doppler
  11: []  // แผน 11 · Application + Posttest
};

// Alias สำรองสำหรับใช้ใน script อื่นที่อาจ query ชื่อนี้
window.KP_FT_BANK_SOUND = window.KP_FT_BANK;
