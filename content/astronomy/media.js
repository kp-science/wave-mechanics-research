// ═══════════════════════════════════════════════════════════════════
// Content Pack: Media (Astronomy · COSMOS LOG · Season 1)
// ═══════════════════════════════════════════════════════════════════
// แต่ละแผน = 1 EP · folder ชี้ไปที่ lessons/astronomy/ep0X/
// item.file = ไฟล์ใน folder นั้น (index.html = launcher หลักของ EP)
// ═══════════════════════════════════════════════════════════════════

window.KP_PLAN_MEDIA = {
  1: {
    folder: 'lessons/astronomy/ep01',
    title: 'แผน 1 — EP01 · The Collision · กำเนิดเอกภพ',
    meta: 'ดาราศาสตร์ · ม.5 · คาบ 1–2 · COSMOS LOG · Season 1',
    sections: [
      { title: '🚀 บทเรียน Interactive', items: [
        { cls:'sim', no:'EP', t:'EP01 · The Collision (Launcher)', file:'index.html',
          d:'หน้า launcher เริ่มต้น EP01 · เลือกหน้าตั้งแต่ p01–p08 ได้', meta:'8 หน้า · ~50 นาที',
          chips:[['k','กำเนิดเอกภพ'],['k','Big Bang']] },
        { cls:'sim', no:'01', t:'p01 · ทางเข้า COSMOS LOG', file:'p01-entry.html', d:'หน้าเปิดเรื่อง · เลือกตัวละคร' },
        { cls:'sim', no:'02', t:'p02 · ทีมสำรวจ', file:'p02-team.html', d:'แนะนำตัวละคร 4 คน' },
        { cls:'sim', no:'03', t:'p03 · The Collision', file:'p03-collision.html', d:'จำลองการชน → กำเนิดเอกภพ' },
        { cls:'sim', no:'04', t:'p04 · Debris · เศษซากเอกภพ', file:'p04-debris.html' },
        { cls:'sim', no:'05', t:'p05 · อายุเอกภพ', file:'p05-age.html', d:'13.8 พันล้านปี' },
        { cls:'sim', no:'06', t:'p06 · Research · ค้นคว้า', file:'p06-research.html' },
        { cls:'sim', no:'07', t:'p07 · CMB · รังสีไมโครเวฟพื้นหลัง', file:'p07-cmb.html' },
        { cls:'sim', no:'08', t:'p08 · Arrive · ถึงจุดหมาย', file:'p08-arrive.html' }
      ]}
    ],
    linkOut: [
      'EP01 = บทเปิด season · ปูเรื่อง Big Bang · CMB · อายุเอกภพ',
      'หลักฐานวPA: นักเรียนเข้าทำกิจกรรมครบ 8 หน้า · ส่งข้อสรุปท้ายบท'
    ]
  },

  2: {
    folder: 'lessons/astronomy/ep02',
    title: 'แผน 2 — EP02 · เสียงเรียกจากกาแล็กซี · ระบบดาว',
    meta: 'ดาราศาสตร์ · ม.5 · คาบ 3–4 · COSMOS LOG · Season 1',
    sections: [
      { title: '🚀 บทเรียน Interactive', items: [
        { cls:'sim', no:'EP', t:'EP02 · Launcher', file:'index.html',
          d:'หน้า launcher EP02 · เลือกหน้า · มี Game Layer + Boss', meta:'~20 หน้า',
          chips:[['k','ระบบดาว'],['k','Game Layer']] },
        { cls:'sim', no:'00', t:'p00 · How to Play', file:'p00-howtoplay.html' },
        { cls:'sim', no:'00b', t:'p00b · Resources', file:'p00b-resources.html' },
        { cls:'sim', no:'01', t:'p01 · ทางเข้า', file:'p01-entry.html' },
        { cls:'sim', no:'02', t:'p02 · ดำเนินเรื่องต่อ', file:'p02-continue.html' },
        { cls:'sim', no:'03', t:'p03 · สัญญาณ', file:'p03-signal.html' },
        { cls:'sim', no:'04', t:'p04 · จำแนกดาว', file:'p04-classify.html' },
        { cls:'sim', no:'05', t:'p05 · สภาผู้พิทักษ์', file:'p05-council.html' }
      ]}
    ],
    linkOut: [
      'EP02 ใช้ Game Layer (game/items/corruption/leaderboard/boss/teacher-cards)',
      'หน้าทั้งหมด ~20 หน้า · ดูเพิ่มจาก HANDOFF_ep02.md'
    ]
  },

  3: {
    folder: 'lessons/astronomy/ep03',
    title: 'แผน 3 — EP03 · เสียงร้องจากอดีต · พาแรลแลกซ์/ระยะดาว',
    meta: 'ดาราศาสตร์ · ม.5 · คาบ 5–6 · COSMOS LOG · Season 1 · 5-องก์ Adventure',
    sections: [
      { title: '🚀 บทเรียน Interactive', items: [
        { cls:'sim', no:'EP', t:'EP03 · Launcher', file:'index.html',
          d:'5-องก์ Adventure model · 20 หน้า · WARP RUN boss', meta:'~20 หน้า',
          chips:[['k','พาแรลแลกซ์'],['k','ระยะดาว'],['k','Boss']] },
        { cls:'sim', no:'00', t:'p00 · How to Play', file:'p00-howtoplay.html' },
        { cls:'sim', no:'01', t:'p01 · ทางเข้า', file:'p01-entry.html' },
        { cls:'sim', no:'02', t:'p02 · SOS · สัญญาณขอความช่วยเหลือ', file:'p02-sos.html' },
        { cls:'sim', no:'02b', t:'p02b · Genesis Lab', file:'p02b-genesis.html' },
        { cls:'sim', no:'03', t:'p03 · เข้าร่วมภารกิจ', file:'p03-join.html' },
        { cls:'sim', no:'04', t:'p04 · พาแรลแลกซ์', file:'p04-parallax.html', d:'แนวคิดการวัดระยะดาว' },
        { cls:'sim', no:'JOIN', t:'join.html · ร่วมภารกิจ', file:'join.html' }
      ]}
    ],
    linkOut: [
      'EP03 = 5-องก์ Adventure (RACE → FORGE → FIGHT) · WARP RUN boss',
      'ใช้ Chain/Gate/Submit/Coin/ShopItems modules',
      'รายละเอียด: HANDOFF_ep03.md'
    ]
  },

  4: {
    folder: 'lessons/astronomy/ep04',
    title: 'แผน 4 — EP04 · วันสุดท้ายของยักษ์แดง · วิวัฒนาการดาว',
    meta: 'ดาราศาสตร์ · ม.5 · คาบ 7–8 · COSMOS LOG · Season 1 · 4-องก์ Lab-build',
    sections: [
      { title: '🚀 บทเรียน Interactive', items: [
        { cls:'sim', no:'EP', t:'EP04 · Launcher', file:'index.html',
          d:'4-องก์ Lab-build · 27 หน้า · GRAVITY ASCENT boss · cliffhanger → EP05', meta:'~27 หน้า',
          chips:[['k','ดาวยักษ์แดง'],['k','วิวัฒนาการดาว'],['k','สเปกตรัม']] },
        { cls:'sim', no:'00', t:'p00 · Cover', file:'p00-cover.html' },
        { cls:'sim', no:'01', t:'p01 · Pre-test', file:'p01-pretest.html' },
        { cls:'sim', no:'02', t:'p02 · Arrival', file:'p02-arrival.html' },
        { cls:'sim', no:'03', t:'p03 · วางแผน', file:'p03-plan.html' },
        { cls:'sim', no:'04', t:'p04 · Spectrum Slider', file:'p04-spectrum-slider.html', d:'เลื่อนสเปกตรัม' },
        { cls:'sim', no:'05', t:'p05 · Drag-Match', file:'p05-drag-match.html' },
        { cls:'sim', no:'JOIN', t:'join.html · ร่วมภารกิจ', file:'join.html' }
      ]}
    ],
    linkOut: [
      'EP04 = 4-องก์ Lab-build · 5 mass tracks · Mystery Box 5 จุด',
      'GRAVITY ASCENT boss · cliffhanger → EP05 ดวงอาทิตย์',
      'รายละเอียด: HANDOFF_ep04.md'
    ]
  },

  5: {
    folder: 'lessons/astronomy/ep05',
    title: 'แผน 5 — EP05 · หัวใจที่เต้นผิดจังหวะ · ดวงอาทิตย์',
    meta: 'ดาราศาสตร์ · ม.5 · คาบ 9–11 · COSMOS LOG · Season 1 · v9 RACE→FORGE→FIGHT',
    sections: [
      { title: '🚀 บทเรียน Interactive', items: [
        { cls:'sim', no:'EP', t:'EP05 · Launcher', file:'index.html',
          d:'45 หน้า v9 · POWER FORGE · 5 RECALL CHECKS · HUD 6 ช่อง', meta:'~45 หน้า',
          chips:[['k','ดวงอาทิตย์'],['k','สนามแม่เหล็ก'],['k','Boss']] },
        { cls:'sim', no:'00', t:'p00 · Cover · Reset/Continue', file:'p00-cover.html' },
        { cls:'sim', no:'01', t:'p01 · Pre-test', file:'p01-pretest.html' },
        { cls:'sim', no:'02', t:'p02 · Intro Quest', file:'p02-intro-quest.html' },
        { cls:'sim', no:'03', t:'p03 · Origin Zones', file:'p03-origin-zones.html' },
        { cls:'sim', no:'04', t:'p04 · Dive Plan', file:'p04-dive-plan.html' },
        { cls:'sim', no:'05a', t:'p05a · Core Engage', file:'p05a-core-engage.html' }
      ]}
    ],
    linkOut: [
      'EP05 v9 = scope ใหญ่สุดของ Season 1 · ดวงอาทิตย์ + ATMOSPHERIC LAYER cards',
      'POWER FORGE: HELION 6 → ปลด 6 powers → ใช้กับ boss (shield/burst/insight/...)',
      'รายละเอียด: HANDOFF_ep05.md (45 หน้า)'
    ]
  },

  6: {
    folder: 'lessons/astronomy/ep06',
    title: 'แผน 6 — EP06 · ขอบฟ้าของบ้าน · ระบบสุริยะ',
    meta: 'ดาราศาสตร์ · ม.5 · คาบ 12–13 · COSMOS LOG · Season 1',
    sections: [
      { title: '🚀 บทเรียน Interactive', items: [
        { cls:'sim', no:'EP', t:'EP06 · Launcher', file:'index.html',
          d:'Edge of Home · ขอบเขตระบบสุริยะ', meta:'~25 หน้า',
          chips:[['k','ระบบสุริยะ'],['k','Maze Boss']] },
        { cls:'sim', no:'00', t:'p00 · Cover', file:'p00-cover.html' },
        { cls:'sim', no:'01', t:'p01 · Pre-test', file:'p01-pretest.html' },
        { cls:'sim', no:'02', t:'p02 · Anomaly', file:'p02-anomaly.html' },
        { cls:'sim', no:'03', t:'p03 · Void Taunt', file:'p03-void-taunt.html' },
        { cls:'sim', no:'04', t:'p04 · Mission Brief', file:'p04-mission-brief.html' },
        { cls:'sim', no:'05a', t:'p05a · Nebula Engage', file:'p05a-nebula-engage.html' },
        { cls:'sim', no:'05b', t:'p05b · Nebula Explore', file:'p05b-nebula-explore.html' }
      ]}
    ],
    linkOut: [
      'EP06 = ขอบฟ้าของบ้าน · ใช้ Maze boss',
      'รายละเอียด: HANDOFF_ep06.md'
    ]
  },

  7: {
    folder: 'lessons/astronomy/ep07',
    title: 'แผน 7 — EP07 · สงครามในวงโคจร · คลื่นแม่เหล็กไฟฟ้า',
    meta: 'ดาราศาสตร์ · ม.5 · คาบ 14–15 · COSMOS LOG · Season 1',
    sections: [
      { title: '🚀 บทเรียน Interactive', items: [
        { cls:'sim', no:'EP', t:'EP07 · Launcher', file:'index.html',
          d:'Orbital War · คลื่นแม่เหล็กไฟฟ้า · ใช้ Cipher boss', meta:'~25 หน้า',
          chips:[['k','คลื่น EM'],['k','Cipher']] },
        { cls:'sim', no:'00', t:'p00 · Cover', file:'p00-cover.html' },
        { cls:'sim', no:'01', t:'p01 · Pre-test', file:'p01-pretest.html' },
        { cls:'sim', no:'02', t:'p02 · ปัญหา', file:'p02-problem.html' },
        { cls:'sim', no:'03', t:'p03 · Mission', file:'p03-mission.html' },
        { cls:'sim', no:'04', t:'p04 · EM Spectrum', file:'p04-em-spectrum.html', d:'สเปกตรัมแม่เหล็กไฟฟ้า' },
        { cls:'sim', no:'05', t:'p05 · บรรยากาศ', file:'p05-atmosphere.html' },
        { cls:'sim', no:'06', t:'p06 · คลื่นวิทยุ', file:'p06-radio.html' }
      ]}
    ],
    linkOut: [
      'EP07 = สงครามในวงโคจร · เน้นคลื่น EM และการใช้งานในดาราศาสตร์',
      'รายละเอียด: CONTEXT_ep07.md'
    ]
  },

  8: {
    folder: 'lessons/astronomy/ep08',
    title: 'แผน 8 — EP08 · Genesis Again · Season Finale',
    meta: 'ดาราศาสตร์ · ม.5 · คาบ 16–17 · COSMOS LOG · Season 1 · FINALE',
    sections: [
      { title: '🚀 บทเรียน Interactive', items: [
        { cls:'sim', no:'EP', t:'EP08 · Launcher (Season Finale)', file:'index.html',
          d:'28 หน้า · GENESIS FORGE boss canvas-action 4 phase · 5 endings · 17-key S1 keyring', meta:'~28 หน้า',
          chips:[['k','Big Bang'],['k','Inflation'],['k','Boss Finale']] },
        { cls:'sim', no:'00', t:'p00 · Cover', file:'p00-cover.html' },
        { cls:'sim', no:'01', t:'p01 · Pre-test', file:'p01-pretest.html' },
        { cls:'sim', no:'02', t:'p02 · The Void', file:'p02-the-void.html' },
        { cls:'sim', no:'03', t:'p03 · CMB Shower', file:'p03-cmb-shower.html' },
        { cls:'sim', no:'04', t:'p04 · Mission Brief', file:'p04-mission-brief.html' },
        { cls:'sim', no:'05', t:'p05 · Inflation', file:'p05-inflation.html' },
        { cls:'sim', no:'06', t:'p06 · Nucleosynthesis', file:'p06-nucleosynthesis.html' }
      ]}
    ],
    linkOut: [
      'EP08 = Season Finale · GENESIS FORGE 4-phase boss',
      'ดร.ฮับเบิล Mentor reveal · โบลท์เจอพ่อ · Reset/Preserve choice',
      'Andromeda S2 cliffhanger · ปิด EP07 patch',
      'รายละเอียด: HANDOFF_ep08.md + CONTEXT_ep08.md'
    ]
  }
};
