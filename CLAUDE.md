# CLAUDE.md · wave-mechanics-research

โปรเจกต์ KP-Classroom · ครูโกเมน ปาปะโถ · โรงเรียนสตรีวิทยา

## วิชาที่เปิดสอน (ปี 2569)

| Course | Subject Code | URL | Topics |
|---|---|---|---|
| `physics3` | ว 30203 (ฟิสิกส์ 3) | `?course=physics3` | คลื่นกล (10 แผน) · SHM (`?unit=shm`) · เสียง · แสง |
| `astronomy` | **ว 30105 วิทยาศาสตร์พื้นฐาน 5 (โลกและอวกาศ)** | `?course=astronomy` | COSMOS LOG Season 1 · 8 EP · ดาราศาสตร์ + โลก |

## Astronomy · COSMOS LOG Season 1 · โครงสร้าง 8 EP

| EP | ชื่อตอน | หน้า | Generation | Boss |
|---|---|---:|---|---|
| 1 | The Collision · กำเนิดเอกภพ | 19 | G1 (book.js) | – |
| 2 | เสียงเรียกจากกาแล็กซี | 23 | G1.5 (Game Layer) | VOID 3-phase + Final Boss |
| 3 | เสียงร้องจากอดีต · พาแรลแลกซ์ | 24 | G2 (Firebase) | WARP RUN |
| 4 | วันสุดท้ายของยักษ์แดง · วิวัฒนาการดาว | 27 | G2 (Firebase) | GRAVITY ASCENT |
| 5 | หัวใจที่เต้นผิดจังหวะ · ดวงอาทิตย์ | 46 | G2 v9 (Firebase) | SOLAR STORM (POWER FORGE) |
| 6 | ขอบฟ้าของบ้าน · ระบบสุริยะ | 47 | G2 (Firebase + pedagogy peak) | VOID ZERO-FIX (Maze) |
| 7 | สงครามในวงโคจร · คลื่น EM | 28 | G3 (HUD-v2 · PBL) | CIPHER (Orbital Triage) |
| 8 | Genesis Again · Season Finale | 28 | G3 (HUD-v2) | GENESIS FORGE (4-phase canvas) |

## Standardized File Structure (refactor 2026-05-01)

ทุก EP มีไฟล์มาตรฐาน:

| ตำแหน่ง | ไฟล์ | ไฟล์เก่า (มี redirect compat) |
|---|---|---|
| Pre-test | `p01-pretest.html` | EP01-03 เดิม `p01-entry.html` (redirect แล้ว) |
| Post-test | `p21-posttest.html` (EP04) · `p22-posttest.html` (EP05) · `p26b-posttest.html` (EP06-08 anchor → p27#postBtn) | – |
| Journal 3-2-1 | `p27-journal.html` (ทุก EP) | EP01: `p17-exit` · EP02: `p18-log` · EP03: `p19b-journal` · EP04: `p26-journal` (redirect แล้ว) |

## Pre/Post Test (refactor 2026-05-01)

- **5 ข้อต่อ EP** (ทั้งหมด · ลดจาก 6-10 ข้อ)
- **Posttest = Pretest 1:1** (parallel form ตรงเป๊ะ · ใช้ matched-pair design วัด gain)
- **คำถามถาม**: misconception (M-code) + วัตถุประสงค์ K
- ไม่เฉลยอัตโนมัติ — ครูเฉลยเอง (เก็บแค่ baseline + post score)

## Content Pack ของ astronomy (`content/astronomy/`)

- `config.js` — courseId, apiUrl (Apps Script), grade, school
- `subjects.js` — registry (`/content/subjects.js` · มีทั้ง physics3 + astronomy)
- `plans.js` — 8 แผน
- `tools.js` — ทุกแผนใช้ tools เดียวกัน: `tl-pre · poe · mj · upload · tl-post`
- `media.js` — Launcher (student-visible) + 8 EPs page list (teacherOnly)
- `worksheets.js` — ว่าง · ใบงานอยู่ใน quest ของ EP เอง
- `questions.js` — ว่าง · ครูเฉลยเอง

## Subject Isolation (สำคัญ!)

physics3 ↔ astronomy **ต้องไม่เชื่อมต่อกัน**:

| รายการ | physics3 | astronomy |
|---|---|---|
| LocalStorage progress | `wave_submitted_physics3` | `wave_submitted_astronomy` |
| LocalStorage gates | `wave_settings_physics3` | `wave_settings_astronomy` |
| Apps Script API | physics3 URL | `AKfycbzt4qy...` (astronomy) |
| Google Sheet | คลื่นกล + SHM | Astronomy-2569 |

Migration v2 (KP-Classroom.html) ลบ key เก่า `wave_submitted` / `wave_settings` (no suffix) ครั้งเดียวต่อ browser ผ่าน marker `wave_migrated_v2`.

## Student View

- เห็นเฉพาะ Launcher (`index.html`) ของแต่ละ EP — flag `teacherOnly:true` ใน media.js ซ่อนหน้าย่อย
- รันตามลำดับหน้าผ่าน launcher · ไม่ข้ามหน้าได้

## Teacher Print/PDF Report

- Tab "📊 สรุปคะแนน" → ปุ่ม "🖨 พิมพ์รายงาน PDF" → เปิดหน้าใหม่ที่พิมพ์/Save as PDF ได้
- รวม Pre/Post score + ข้อมูล Sheet Summary_All

## Sync ที่ยังต้องทำ (TODO)

- **EP01/EP02 (G1/G1.5)**: pretest/posttest เก็บแค่ใน localStorage ผ่าน `Book.savePageData()` · ไม่ sync Apps Script
- **EP07/EP08 (G3)**: pretest/posttest เก็บใน localStorage ผ่าน `KPA.research()` · ไม่ sync Apps Script
- **G2 EP03-06**: sync ผ่าน sync-client + Firebase ก่อนจะถึง Apps Script (ผ่าน pace-client) ✅
- ถ้าต้องการรวมข้อมูลทุก EP → ต้องเพิ่ม telemetry hook ใน Book.savePageData + KPA.research → POST ไป astronomy apiUrl

## URL Flow

1. `/index.html` (portal) → คลิกการ์ด "ดาราศาสตร์"
2. `/KP-Classroom.html?course=astronomy` → login
3. หลัง login → `view-topics` → เลือก "โลกและอวกาศ · COSMOS LOG Season 1"
4. → `view-home` → เลือกแผน (EP01-08) → คลิก Launcher → เข้าเล่นเรียง p01 → p27

## คำสั่ง deploy / verify

```bash
# Local preview (port 3000)
cd wave-mechanics-research && python3 -m http.server 3000

# ทดสอบ astronomy
http://localhost:3000/KP-Classroom.html?course=astronomy

# ทดสอบ physics3
http://localhost:3000/KP-Classroom.html?course=physics3
```

## Browser cache caveat

หลัง deploy ใหม่ · ผู้ใช้เดิมต้อง **Cmd+Shift+R** (hard reload) เพื่อบังคับโหลด `media.js` + `subjects.js` + `KP-Classroom.html` ใหม่ · Python http.server cache อาจไม่ bust อัตโนมัติ
