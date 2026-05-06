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

## Standardized File Structure (refactor 2026-05-01 · update 2026-05-04)

ทุก EP มีไฟล์มาตรฐาน:

| ตำแหน่ง | ไฟล์ | ไฟล์เก่า (มี redirect compat) |
|---|---|---|
| Pre-test | `p01-pretest.html` | EP01-03 เดิม `p01-entry.html` (redirect แล้ว) |
| Post-test | EP01: `p18-posttest.html` ⭐ใหม่ · EP02/EP03: `p20-posttest.html` ⭐ใหม่ · EP04: `p21-posttest.html` · EP05: `p22-posttest.html` · EP06-08: `p26b-posttest.html` | – |
| Journal 3-2-1 | `p27-journal.html` (ทุก EP) | EP01: `p17-exit` · EP02: `p18-log` · EP03: `p19b-journal` · EP04: `p26-journal` (redirect แล้ว) |

## Pre/Post Test (refactor 2026-05-01 · update 2026-05-04)

- **5 ข้อต่อ EP** (ทั้งหมด · ลดจาก 6-10 ข้อ)
- **Posttest = Pretest 1:1** (parallel form ตรงเป๊ะ · ใช้ matched-pair design วัด gain)
- **คำถามถาม**: misconception (M-code) + วัตถุประสงค์ K
- ไม่เฉลยอัตโนมัติ — ครูเฉลยเอง (เก็บแค่ baseline + post score)
- **EP01/02/03 posttest สร้างใหม่ 2026-05-04** ใช้ใน paired t-test analysis · sync ผ่าน EPSync ไป Apps Script
- **EP07 pretest แก้ใหม่ 2026-05-04**: Q2/Q3/Q4 เปลี่ยนจาก Kepler/inertia/GPS (ไม่อยู่ในแผน) → EM medium/spectrum/JWST (ตรงแผน)

## Aggregate Pre/Post (FT-01 / FT-02) — Two-tier Diagnostic ⭐

- **20 ข้อ MCQ** ครอบคลุม EP01-EP08 · parallel form 1:1
- **Two-tier confidence (Caleon & Subramaniam, 2010)** — เพิ่ม 2026-05-04
  - 4 ระดับ: 🎲 เดา · 🤔 ไม่ค่อยมั่นใจ · 😊 มั่นใจ · 💪 มั่นใจมาก
  - Logic: ถูก+conf≥3 → **Sound** · ถูก+conf≤2 → **Guessing** · ผิด+conf≥3 → **Misconception** · ผิด+conf≤2 → **No-K**
- **6/20 ข้อเป็น computational** (30% · ตามมาตรฐาน physics R&D):
  - Q02 Hubble's Law (v=H₀d) · Q05 ตำแหน่งดวงอาทิตย์ใน Milky Way (อัตราส่วน) · Q07 m vs M
  - Q08 parallax d=1/p · Q15 AU→km (Jupiter) · Q19 light travel time JWST
- **Sheet schema**: `FT01_Raw` / `FT02_Raw` มี Q01-Q20 + _ok + _conf + _cat (4 cols ต่อข้อ)
- **FT_Summary 21 cols**: pre/post score + Hake gain + 8 columns สำหรับ pre/post Sound/Misconception/Guessing/NoK

## Content Pack ของ astronomy (`content/astronomy/`)

- `config.js` — courseId, apiUrl (Apps Script), grade, school
- `subjects.js` — registry (`/content/subjects.js` · มีทั้ง physics3 + astronomy)
- `plans.js` — 8 แผน
- `tools.js` — ทุกแผนใช้ tools เดียวกัน: `tl-pre · poe · mj · upload · tl-post`
- `media.js` — Launcher (student-visible) + 8 EPs page list (teacherOnly) · มี research items ใน EP01 + EP08
- `worksheets.js` — ว่าง · ใบงานอยู่ใน quest ของ EP เอง
- `questions.js` — `KP_FT_BANK_ASTRO` 20 ข้อ + `calc:true` flag · ตำแหน่ง answer index 5/5/5/5

## Research Instruments (วิจัย วPA เชี่ยวชาญ) ⭐ — เพิ่ม 2026-05-04

### โฟลเดอร์ `lessons/astronomy/research/` (HTML นักเรียนใช้)

| ไฟล์ | ใช้ตอน | Action |
|---|---|---|
| `consent.html` | ก่อนเริ่ม EP01 (R0) | submitConsent → ชีต `Consent_Log` |
| `imi-21.html` | หลังจบ EP08 (R1) · **post-only design** | submitIMI → ชีต `IMI_Responses` |
| `satisfaction-20.html` | หลังจบ EP08 (R2) | submitSatisfaction → ชีต `Satisfaction` |

→ ลงทะเบียนใน `media.js` EP01 (consent ก่อน FT-01) และ EP08 (IMI + satisfaction หลัง FT-02)

### โฟลเดอร์ `lessons/astronomy/วิจัย-วPA/` (DOCX เอกสารวิจัย)

| ไฟล์ | เนื้อหา |
|---|---|
| `IOC_แบบประเมินผู้เชี่ยวชาญ_ดาราศาสตร์.docx` | 403 รายการ IOC · 4 ส่วน (แผน/ข้อสอบ/IMI/พึงพอใจ) |
| `Proposal_บทที่1-3.docx` | proposal 3 บท + บรรณานุกรม 16 รายการ |
| `คู่มือการใช้นวัตกรรม_COSMOS_LOG.docx` | 6 บท + FAQ · CC BY-NC-SA |
| `แผนการสอน_ดาราศาสตร์_COSMOS_EP01-08.docx` | 8 แผน (ย้ายมาจาก 00_ส่วนกลาง_วิจัยและวPA) |

### Apps Script handlers ใหม่ (ใน `Astronomy_AppsScript_Code.gs`)

doPost dispatcher (L34–56):
```
submitConsent       → handleSubmitConsent       → Consent_Log
submitIMI           → handleSubmitIMI           → IMI_Responses (post-only)
submitSatisfaction  → handleSubmitSatisfaction  → Satisfaction
```

Test functions (run ใน Apps Script editor): `testConsent`, `testIMI`, `testSatisfaction`

### Note: IMI Post-only Design
ข้อความ IMI 21 ข้อ อ้างถึง COSMOS LOG เฉพาะ (HELION power · Boss · ตัวละคร) — นักเรียนยังไม่เคยเล่นจะตอบ Pre ไม่ได้ · จึงใช้ **one-shot post measure** เทียบกับเกณฑ์ ≥ 3.51 ตาม H3

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

## Apps Script Deploy Caveat (สำคัญ!) ⭐

หลังแก้โค้ดใน `Astronomy_AppsScript_Code.gs` ทุกครั้ง:
1. **Save** (Ctrl+S)
2. **Deploy → Manage deployments → ✏️ → Version: New version → Deploy**
3. ถ้าไม่กด "New version" → URL เดิมจะ serve **โค้ดเก่า** — เป็น bug ที่เจอบ่อย

## Teacher Dashboard Cards (KP-Classroom.html L3749+) — update 2026-05-04

`renderSheetSummary()` มี custom rendering สำหรับชีตวิจัย:
- `IMI_Responses` — แสดง Autonomy/Competence/Relatedness/Total avg + เกณฑ์ ≥ 3.51
- `Satisfaction` — แสดง 4 ด้าน (Content/Activity/Media/Assessment) + Total
- `Consent_Log` — สถิติ agreed/declined + research/publication consent
- ชีตอื่นใช้ generic rendering (count + last 3 students)

Dashboard auto-detect ชีตใหม่ผ่าน `info` action ของ Apps Script · ไม่ต้อง register เพิ่ม

## Research Project Status (2026-05-04)

| งาน | สถานะ |
|---|---|
| Apps Script + 5 ชีต (Pre/Post/IMI/Sat/Consent) | ✅ |
| HTML 3 หน้า + register ใน media.js | ✅ |
| Two-tier confidence FT-01/02 + Apps Script update | ✅ |
| Per-EP Pre/Post 8 EP (สร้าง 3 posttest ใหม่) | ✅ |
| EP07 pretest fix Q2-4 | ✅ |
| FT bank 4 ข้อใหม่ (calc) — Q02/Q05/Q15/Q19 | ✅ |
| Dashboard cards bonus rendering | ✅ |
| IOC ผู้เชี่ยวชาญ DOCX (403 รายการ) | ✅ |
| Proposal บทที่ 1-3 DOCX | ✅ |
| คู่มือการใช้นวัตกรรม DOCX | ✅ |
| รายงานวิจัยฉบับสมบูรณ์ (5 บท + ภาคผนวก) | ⏳ |
| แบบสัมภาษณ์กึ่งโครงสร้าง 9 คน | ✅ |
