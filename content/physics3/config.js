// ═══════════════════════════════════════════════════════════════════
// Content Pack: Physics 3 (ฟิสิกส์ 3 · ครูโกเมน)
// ═══════════════════════════════════════════════════════════════════
// หน่วยที่พร้อม: คลื่นกล (10 แผน)
// หน่วยที่ยังไม่ทำ: SHM · เสียง · แสง
// ═══════════════════════════════════════════════════════════════════

window.KP_CONFIG = {
  // ─── Course identity ───
  courseId:     'physics3',
  title:        'ฟิสิกส์ 3',
  subtitle:     'หน่วย: คลื่นกล · ครูโกเมน',
  subject:      'ฟิสิกส์ 3',
  subjectCode:  'ว30203',
  grade:        'ม.5',
  school:       'สตรีวิทยา',
  schoolFull:   'โรงเรียนสตรีวิทยา',
  teacher:      'ครูโกเมน ปาปะโถ',
  teacherShort: 'ครูโกเมน',
  teacherFullName: 'นายโกเมน ปาปะโถ',
  year:         '2569',

  // ─── Backend (Apps Script Web App URL — ของวิชานี้เท่านั้น) ───
  apiUrl:       'https://script.google.com/macros/s/AKfycbwoI8M3mJ3wKdNHUigoK4LFbZJH0f94WykTfBz97KPgeTo0Zi-N9DZdiEGzW3u6jofiwA/exec',

  // ─── Master Roster Backend (ใช้ร่วมกันทุกวิชา · login/password/session) ───
  rosterApiUrl: 'https://script.google.com/macros/s/AKfycbyhekgIs5ufh9KBsd-PKSqp0dc6WgSmaPauHppsKopKZf02aXBR6cnxQxDQuVkgUs_L4A/exec',

  // ─── Admin Password (Phase 4: server-side) ───
  // ⚠️ รหัสเก็บใน Apps Script Properties (ชื่อ 'TEACHER_PASSWORD')
  // ห้ามใส่รหัสในไฟล์นี้ (repo public)
  // ครูตั้งผ่าน: Apps Script Editor → Project Settings (⚙) → Script Properties

  // ─── Scope ───
  numPlans:     10,  // คลื่นกล 10 แผน · หน่วยอื่นจะเพิ่มภายหลัง

  // ─── สถานะการเปิดสอน (ใช้ lock การ์ดใน landing) ───
  // 'open' = เปิดให้นักเรียน login · 'coming-soon' = lock · 'closed' = ปิดเทอม
  status:       'open',
  numClasses:   1,
  classes:      ['ม.5/1']
};
