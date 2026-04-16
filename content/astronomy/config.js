// ═══════════════════════════════════════════════════════════════════
// Content Pack: Astronomy (ดาราศาสตร์ · ครูโกเมน)
// ═══════════════════════════════════════════════════════════════════
// สถานะ: SCAFFOLD — ยังไม่มี content · ต้องเติมก่อนใช้งาน
// Apps Script URL: ยังไม่ deploy · ใช้ URL ชั่วคราวจาก physics3 ไปก่อน
// ═══════════════════════════════════════════════════════════════════

window.KP_CONFIG = {
  // ─── Course identity ───
  courseId:     'astronomy',
  title:        'ดาราศาสตร์',
  subtitle:     'ห้องเรียนออนไลน์ · ครูโกเมน',
  subject:      'ดาราศาสตร์',
  subjectCode:  '—', // TODO: ใส่รหัสวิชา เช่น ว30260
  grade:        'ม.5',
  school:       'สตรีวิทยา',
  schoolFull:   'โรงเรียนสตรีวิทยา',
  teacher:      'ครูโกเมน ปาปะโถ',
  teacherShort: 'ครูโกเมน',
  teacherFullName: 'นายโกเมน ปาปะโถ',
  year:         '2569',

  // ─── Backend (Apps Script Web App URL · แยกจาก Physics 3) ───
  apiUrl:       'https://script.google.com/macros/s/AKfycbzt4qyJPIh7zudsQVEMIkLdRk2M1lricq9fx73orp7dZA1B3_MdwgkwZrz6YWFuuRZq/exec',

  // ─── Admin Password (Phase 4: server-side) ───
  // ⚠️ รหัสเก็บใน Apps Script Properties (ชื่อ 'TEACHER_PASSWORD')
  // ห้ามใส่รหัสในไฟล์นี้ (repo public)

  // ─── Scope ───
  numPlans:     0, // ยังไม่มีแผน · จะเพิ่มเมื่อมี curriculum

  // ─── สถานะการเปิดสอน ───
  status:       'coming-soon', // 🧪 TEST auto-lock — จะเปลี่ยนกลับ 'open' หลังเทส
  numClasses:   3,
  classes:      ['ม.5/2', 'ม.5/3', 'ม.5/4'] // TODO: ปรับชื่อห้องตามจริงภายหลัง
};
