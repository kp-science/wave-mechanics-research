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

  // ─── Backend ───
  // TODO: สร้าง Google Sheet + deploy Apps Script ใหม่สำหรับดาราศาสตร์
  //       แล้วเปลี่ยน URL ด้านล่าง (ข้อมูลจะเข้า Sheet เฉพาะวิชานี้ ไม่ปนกับฟิสิกส์)
  apiUrl:       '', // จะใส่ภายหลัง · เว้นว่าง = mode demo (ไม่ส่งข้อมูล)

  // ─── Admin Password ───
  teacherPass:  'komanepapato2569', // จะเปลี่ยนเมื่อ deploy Apps Script ใหม่

  // ─── Scope ───
  numPlans:     0 // ยังไม่มีแผน · จะเพิ่มเมื่อมี curriculum
};
