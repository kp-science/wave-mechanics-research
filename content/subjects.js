// ═══════════════════════════════════════════════════════════════════
// Subject + Topic Registry
// ═══════════════════════════════════════════════════════════════════
// โครงสร้างการสอน 3 ระดับ:
//   วิชา (subject) → หัวข้อ (topic) → แผน (plan 1-N)
// ─────────────────────────────────────────────────────────────────
// status:
//   'open'        = เปิดใช้งาน · คลิกเข้าแผนได้
//   'coming-soon' = กำลังพัฒนา · คลิกจะขึ้น alert
//   'locked'      = ปิดไว้ (ครูสั่ง)
// current: true   = หัวข้อนี้ใช้ content pack ของ ?course=<subject> ปัจจุบัน
//                   (ไม่ต้อง reload URL · render ต่อด้วย KP_CONFIG เดิม)
// ═══════════════════════════════════════════════════════════════════

window.KP_SUBJECTS = [
  {
    id: 'physics3',
    title: 'ฟิสิกส์ 3',
    subtitle: 'ว30203 · ม.5',
    icon: '📘',
    color: '#1565c0',
    bgGradient: 'linear-gradient(135deg,#1565c0,#0d47a1)',
    topics: [
      {
        id: 'shm',
        title: 'การเคลื่อนที่แบบฮาร์มอนิกอย่างง่าย',
        shortTitle: 'SHM',
        icon: '🎢',
        status: 'coming-soon',
        numPlans: 0
      },
      {
        id: 'waves',
        title: 'คลื่นกล',
        shortTitle: 'คลื่นกล',
        icon: '🌊',
        status: 'open',
        numPlans: 10,
        current: true  // ← content pack ปัจจุบัน (ไม่ต้อง reload)
      },
      {
        id: 'sound',
        title: 'เสียง',
        shortTitle: 'เสียง',
        icon: '🔊',
        status: 'coming-soon',
        numPlans: 0
      },
      {
        id: 'light',
        title: 'แสง',
        shortTitle: 'แสง',
        icon: '💡',
        status: 'coming-soon',
        numPlans: 0
      }
    ]
  },
  {
    id: 'astronomy',
    title: 'ดาราศาสตร์',
    subtitle: 'ม.5',
    icon: '🌌',
    color: '#6a1b9a',
    bgGradient: 'linear-gradient(135deg,#6a1b9a,#4a148c)',
    topics: [
      {
        id: 'u1',
        title: 'หน่วยที่ 1',
        shortTitle: 'หน่วย 1',
        icon: '🌠',
        status: 'coming-soon',
        numPlans: 0
      }
    ]
  }
];
