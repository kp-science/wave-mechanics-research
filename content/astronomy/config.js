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
  subject:      'วิทยาศาสตร์พื้นฐาน 5 (โลกและอวกาศ)',
  subjectCode:  'ว 30105',
  grade:        'ม.5',
  school:       'สตรีวิทยา',
  schoolFull:   'โรงเรียนสตรีวิทยา',
  teacher:      'ครูโกเมน ปาปะโถ',
  teacherShort: 'ครูโกเมน',
  teacherFullName: 'นายโกเมน ปาปะโถ',
  year:         '2569',

  // ─── Backend (Apps Script Web App URL · แยกจาก Physics 3) ───
  apiUrl:       'https://script.google.com/macros/s/AKfycbyVahd2W0MOH20wxfeU60h6fbBj6kpjaOEM9UoHpQWBQHM2SPiqIXZ3q2FufEpFg5YQDw/exec',

  // ─── Master Roster (login · ใช้ร่วมกับ physics3 · 1 sheet กลาง 'Master_Roster_2569') ───
  rosterApiUrl: 'https://script.google.com/macros/s/AKfycbyhekgIs5ufh9KBsd-PKSqp0dc6WgSmaPauHppsKopKZf02aXBR6cnxQxDQuVkgUs_L4A/exec',

  // ─── Admin Password (Phase 4: server-side) ───
  // ⚠️ รหัสเก็บใน Apps Script Properties (ชื่อ 'TEACHER_PASSWORD')
  // ห้ามใส่รหัสในไฟล์นี้ (repo public)

  // ─── Scope ───
  numPlans:     8, // EP01–EP08 · COSMOS LOG · Season 1

  // ─── สถานะการเปิดสอน (default ถ้า server ไม่ตอบ) ───
  // จริงๆ ใช้ค่าจาก Apps Script Script Property (COURSE_STATUS) เป็นหลัก
  // ค่านี้เป็น fallback เฉย
  status:       'open',
  numClasses:   3,
  classes:      ['ม.5/2', 'ม.5/3', 'ม.5/4'] // TODO: ปรับชื่อห้องตามจริงภายหลัง
};
