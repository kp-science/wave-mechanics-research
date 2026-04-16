// ═══════════════════════════════════════════════════════════════════
// Content Pack: Config (Wave Mechanics · ครูโกเมน)
// ═══════════════════════════════════════════════════════════════════
// แก้ไฟล์นี้เมื่อเปลี่ยนวิชา / ปี / ครู / URL Apps Script
// ═══════════════════════════════════════════════════════════════════

window.KP_CONFIG = {
  // ─── Branding (โชว์ในหน้าเว็บ) ───
  title:        'วิจัยคลื่นกล',
  subtitle:     'WebApp นักเรียน · ครูโกเมน',
  subject:      'ฟิสิกส์ 3',
  subjectCode:  'ว30203',
  grade:        'ม.5',
  school:       'สตรีวิทยา',
  schoolFull:   'โรงเรียนสตรีวิทยา',
  teacher:      'ครูโกเมน ปาปะโถ',
  teacherShort: 'ครูโกเมน',
  teacherFullName: 'นายโกเมน ปาปะโถ',
  year:         '2569',

  // ─── Backend (Apps Script Web App URL) ───
  apiUrl:       'https://script.google.com/macros/s/AKfycbwoI8M3mJ3wKdNHUigoK4LFbZJH0f94WykTfBz97KPgeTo0Zi-N9DZdiEGzW3u6jofiwA/exec',

  // ─── Admin Password ───
  // ⚠️ Phase 4 จะย้ายไป Apps Script Properties (server-side verify)
  //    ตอนนี้ยัง hardcoded ไว้เพื่อ backward compat
  teacherPass:  'komanepapato2569',

  // ─── Scope ───
  numPlans:     10  // จำนวนแผนทั้งหมด
};
