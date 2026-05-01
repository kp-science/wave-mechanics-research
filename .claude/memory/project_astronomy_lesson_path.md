---
name: Astronomy lesson files location
description: ไฟล์ดาราศาสตร์ ม.6 อยู่ที่ wave-mechanics-research/lessons/astronomy/ · EP01-EP05 พร้อมใช้ · EP04+EP05 ใช้ 4-องก์ Lab-build model
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
├── ep05/  · 45 หน้า · v8 RACE TO THE SUN ⭐⭐⭐ (rebuild 2026-04-28 · 3-Page Mastery Gate + 5 Mission Bridges + Active Region Scanner + Lucky popup + sun atmos viz)
│
├── HANDOFF_ep01.md → HANDOFF_ep05.md (อ่านก่อนเริ่มงานใหม่)
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

## EP05 v8 ✅ rebuild 2026-04-28 · RACE TO THE SUN · 3-Page Mastery Gate + Mission Bridges

"หัวใจที่เต้นผิดจังหวะ" · **45 หน้า** · 4-องก์ · ~125 นาที (2 คาบ) · ตรง ว 7.1 ม.4-6/1 ครบ 4 หัวข้อ
**Quest:** ตามล่า **HELION CORES 6 ชิ้น** ก่อน VOID · ใช้ activate deflector @ L1
**Pattern:** ทุก dive scene split 3 หน้า (Engage Predict / Explore Observe / **Mastery Gate**) + Mission Bridge ระหว่าง scene
**Lock เข้ม:** ผ่าน Gate ไม่ได้ถ้าไม่ใช้ความรู้จริง · Predict→Observe→Compare→Apply→Self-rubric ทุก gate

### โครง 45 หน้า
- ACT A (5): cover · pretest · intro-quest · origin-zones · dive-plan
- ACT B (11): CORE 3 หน้า → 🛰️bridge → RADIATIVE 3 หน้า → 🛰️bridge → CONVECTIVE 3 หน้า → 🛰️bridge
- ACT C (12): SUNSPOT 3 → 🛰️bridge → CHROMOSPHERE 3 → 🛰️bridge → CORONA 3
- ACT D (17): magnetic-bridge → boss → rescue → journal (เนื้อหาเดิมจาก v4)

### 6 Unique Mastery Gates (each scene = different pattern)
- p05c · 🔧 **REACTOR EQUATION LOCK** · เติม p-p chain 8 slot · trap chips มีหลอก (γ, O₂, N, e⁻)
- p06c · 🔐 **PHOTON CIPHER BOX** · 4 ปริศนา → 4 ตัวอักษร = "WALK"
- p07c · 🔄 **CONVECTION CYCLE BUILDER** · ลาก ↑→↓← สร้างวงจร hot rises/cool sinks
- p08c · 🔍 **ACTIVE REGION SCANNER** · 3 active region (B แปรปวน + plasma erupting + flare history) จาก 8 dots · trap = quiet sunspot (B แรงแต่นิ่ง)
- p09c · ⏱️ **FLARE CHRONOMETER** · 3 calc → รหัส 3 หลัก = "842"
- p10c · 🗝️ **HELION KEY ASSEMBLY** · ประกอบ HELION 6 ชิ้นเรียง Core→Corona ปลด deflector

### Visual highlights
- **5 Mission Bridges:** sun cross-section + ship animated ไป layer ใหม่ + HELION inventory + recap/foreshadow narrative
- **p06b Lucky Escape popup:** "🍀 คุณโชคดี · ไม่งั้นติด 170,000 ปี · photon random walk"
- **p08b Sun visual ใหม่:** ก้อนดวงอาทิตย์ solid + atmosphere rings (chromo แดง + corona ม่วง) · sunspot บนผิว · ยานในชั้นบรรยากาศ (ไม่ออกนอกกรอบ)
- **p10b Coronal Token:** ของ hidden ปลด ending A+ AURORA TRIUMPH

shared/ep05-boot.js?v=2: QuestState (helions inventory + voidEta) + Phase3.mount()
Badge: ☀️ Heliophysicist · NAVIGATOR → CAPTAIN
Boss: SOLAR STORM · 3 zones · 24 ข้อ · 18hr countdown · 4 endings (A+/A/B/C)

## EP06 cliffhanger
VOID หนีนอกระบบสุริยะ → ทางช้างเผือก 4 แสนล้านดวง · "ทางที่ไม่เคยมีใครกลับมา"
