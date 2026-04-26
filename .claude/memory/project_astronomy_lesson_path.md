---
name: Astronomy lesson files location
description: ไฟล์ดาราศาสตร์ ม.6 อยู่ที่ wave-mechanics-research/lessons/astronomy/ · EP01-EP04 พร้อมใช้ · EP04 ใช้ 4-องก์ Lab-build model
type: project
originSessionId: fb888f8f-8de0-44ee-b46d-d4aac2fa3d42
---
ไฟล์งานทั้งหมดของวิชาดาราศาสตร์ ม.6 หน่วยที่ 1 (เอกภพ/ดาวฤกษ์/ระบบสุริยะ/เทคโนโลยีอวกาศ) ต้องเซฟที่:
`/Users/komanepapato/Documents/วิจัย/wave-mechanics-research/lessons/astronomy/`

**Why:** ผู้ใช้จัดระเบียบไฟล์ตามวิชาใน wave-mechanics-research/lessons/

**ซีรีส์หลัก:** COSMOS LOG (Narrative-Based Learning + Gamification + Experience Before Labeling) — 8 ตอน × 2 คาบ

---

## โครงไฟล์ปัจจุบัน

```
astronomy/
├── shared/                      # ใช้ร่วมทุก EP
│   ├── book.css · book.js · particles.js (legacy EP01)
│   ├── photon.js · sync-client.js · role-view.js
│   ├── touch-drag.js · transition.js · voidhunter.js (EP03)
│   ├── teacher-remote.html
│   ├── ep03-boot.js · ep04-boot.js
│   ├── starfield.js ⭐ EP04 · canvas BG
│   ├── audio.js ⭐ EP04 · Web Audio SFX (toggle ซ้ายบน)
│   ├── mission-brief.js ⭐ EP04 · briefing component
│   └── mystery-box.js ⭐ EP04 · tier reward
│
├── ep01/  · 19 หน้า · 112 นาที (เสร็จ 2026-04-22)
├── ep02/  · 20 หน้า · scaffold + game layer
├── ep03/  · 20 หน้า · 5-องก์ Adventure model (เสร็จ 2026-04-25)
├── ep04/  · 27 หน้า · 4-องก์ Lab-build model ⭐ (เสร็จ 2026-04-26)
│
├── HANDOFF_ep01.md → HANDOFF_ep04.md (อ่านก่อนเริ่มงานใหม่)
└── cosmos-log-series-bible.html (overview ทั้ง 8 ตอน)
```

---

## EP04 · 4-องก์ Lab-build (ใช้เป็น blueprint EP05+)

| ACT | บทบาท | หน้า | เวลา |
|-----|------|----|---|
| **A · ARRIVAL** | recap · pretest · เห็นปัญหา · แผน + roles | p00-p03 | ~14 นาที |
| **B · LAB 1** | slider → drag-match → theory → 🎁×2 → summary | p04-p09 | ~21 นาที |
| **C · LAB 2 + Discovery** | bridge → context → mini-lab → main → 🎁×2 → game → discovery | p10-p17 | ~28 นาที |
| **D · SYNTHESIS+JOURNEY** | reveal → antagonist → 🎁 decision → posttest → recap → shop → boss → rescue → badge | p18-p26 | ~37 นาที |

**🎁 Mystery Box:** 5 จุด (p07, p13, p14, p20, boss victory)

**ดูรายละเอียด:**
- `lessons/astronomy/HANDOFF_ep04.md` (full handoff · interaction patterns · bugs · cliffhanger EP05)
- `skills/game-lesson-builder/references/ep04-structure.md` (blueprint สำหรับสร้าง EP ใหม่)

---

## Skill ที่ปรับให้รองรับ

`skills/game-lesson-builder/SKILL.md` — ตอนนี้รองรับ 2 รูปแบบ:
- รูปแบบ A · 5-องก์ Adventure (EP03 model)
- รูปแบบ B · 4-องก์ Lab-build ⭐ (EP04 model · recommended เมื่อเนื้อหากว้าง)

**EP05 (ดวงอาทิตย์ · CME) ใช้รูปแบบ B**

---

## EP05 cliffhanger

จบ EP04 → พ่อเตือนว่า VOID เป้าหมายต่อไป = ดวงอาทิตย์
→ EP05 "หัวใจที่เต้นผิดจังหวะ" · ระบบสุริยะ · CME 18 ชั่วโมง
