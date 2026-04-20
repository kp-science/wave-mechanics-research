# Session Log · 2026-04-20 · Grading Dashboard + Score Sync

**เป้าหมาย:** สร้าง tab ตรวจงาน (replay ใบงานนักเรียน) + sync คะแนนกับ tab ตรวจรูปให้ครูตรวจงานวิจัยได้เร็วขึ้น

---

## ✅ สิ่งที่ทำเสร็จ (ตามลำดับ commit)

### 1. `06dd562` — feat(grading): tab ตรวจงาน · iframe replay + rubric 0-3
- เพิ่ม tab `📝 ตรวจงาน` ใน Teacher Dashboard
- `renderGradingTab()` · iframe ซ้าย + side panel ขวา
- worksheet-core.js: เพิ่ม `RESTORE_FLAT` / `GRADING_MODE` handlers + `restoreFlatRow()` + `enableGradingMode()`
- reverse-flatten: flat row → input/radio/checkbox ใน iframe (อ่านอย่างเดียว)
- Hotkey: `1-4`=คะแนน · `←→`=เปลี่ยนข้อ · `Space`=คนถัดไป
- Apps Script: alias `setScore` → `handleSetCanvasScore`

### 2. `c744564` — feat(grading): ตัวกรอง 4 ชั้น
- dropdown: **แผน → งาน → ห้อง → นักเรียน**
- `_buildGradingTasks(plan)` scan `KP_PLAN_MEDIA` + pattern-match ชื่อไฟล์
  (FT01/FT02/Review/POE/Spot/Matrix/Calc/CER/MJ/TL/F_Fourtier)
- `qCount` dynamic จากคอลัมน์ `q{n}_` ที่เจอในแถว
- progress: "ตรวจครบ X/Y คน · ห้อง Y"

### 3. `d5509d6` — feat(grading): canvas overlay จาก Drive URL
- `restoreFlatRow` สแกน `canvas_<cid>_url` · วาง `<img>` absolute ทับ canvas
- `mix-blend-mode:multiply` ให้เห็นฉาก background ใต้ลายเส้น
- ไม่แตะ canvas (กัน CORS taint) · read-only

### 4. `87a4d42` + `51a9cd2` — fix: ห้อง Date→M/D + canvas fallback
- `_cleanRoom()` แปลง ISO date กลับเป็น Bangkok M/D (เช่น `2026-04-30T17:00:00Z` → `5/1`)
  เหตุ: Google Sheets auto-parse "5/1" เป็นวันที่
- `driveUrlCandidates()` ลอง 4 URL ตามลำดับ:
  1. `lh3.googleusercontent.com/d/{id}=w1600`
  2. `drive.google.com/thumbnail?id=...`
  3. `drive.google.com/uc?export=view`
  4. Original URL
- ถ้าพังหมด → แสดงลิงก์คลิกเปิดใน Drive แทน
- 🔑 **สาเหตุแท้จริง:** Drive files ยังไม่ public · ต้องรัน `shareAllCanvases()` ใน Apps Script

### 5. `115b8ef` — fix: `_cleanRoom` ใน progress + student filter
- แก้ bug progress โชว์ 0/0 คน (ยังใช้ raw string compare แทน cleanRoom)

### 6. `83b9396` — refactor(gallery): filter เดียวกับ ตรวจงาน + ตัวกรองข้อ
- dropdown gallery: **แผน → งาน (จาก `_buildGradingTasks`) → ห้อง → นักเรียน → ข้อ**
- badge บนการ์ด canvas: "**ข้อ N**" ชัดเจน + canvas id ตัวเล็กข้างๆ
- `_galQNum(qId)` สกัดเลขข้อจาก canvas id (`canvas_claim_1` → `1`)
- `sRoom` ใช้ `_cleanRoom`

### 7. `899eef1` — feat(score-sync): ตรวจรูป + ตรวจงาน ใช้ column ร่วมกัน
- `q{N}_teacher_score` เป็น single source of truth
- Gallery: `scoreCol = q{qNum}_teacher_score` (แทน `canvas_<qId>_score` เดิม)
- ให้คะแนน canvas ใด = อัปเดตทุก canvas ข้อเดียวกัน + sync ไป Grading tab
- AI score (Gemini Vision) ยังอยู่ column เดิม · ไม่กระทบ

### 8. `d393688` — fix(sync): auto-reload เมื่อสลับ tab
- สลับมา Grading → `_loadGradingRows()` ใหม่อัตโนมัติ
- สลับมา Gallery → `loadCanvasGallery()` ใหม่
- หลัง reload · ถ้าเลือกนักเรียนแล้ว อัปเดต `_grCurrent` + re-render panel
- คะแนนที่ scored ใน Gallery เห็นใน Grading ทันทีเมื่อสลับ tab (ไม่ต้องกด 🔄)

---

## 📊 สถานะระบบตรวจงานปัจจุบัน

| Tab | จุดประสงค์ | UI |
|---|---|---|
| 🖼️ **ตรวจรูป** | bulk review canvas ทั้งห้องพร้อมกัน · scan pattern เร็ว | Grid 4 คอลัมน์ · AI badge · hotkey 1-4 |
| 📝 **ตรวจงาน** | deep review 1 คน · เห็นทั้งใบงาน (text + canvas) | iframe replay + side panel |

**Column หลักใน Sheet:**
- `q{N}_teacher_score` — คะแนนครู (ใช้ร่วม 2 tabs)
- `canvas_<qId>_score` — AI Vision (Gemini) · อยู่ sheet `{sheet}_Canvas_Scored`
- `q{N}_score`, `q{N}_conf`, `q{N}_note` — AI text score (POE/Spot justify)

---

## ⚠️ ข้อจำกัด + ปัญหาที่เจอระหว่างทาง

### 1. Drive files ไม่ public → canvas overlay พัง 403
- **สาเหตุ:** `uploadCanvasPack_` มี `setSharing` ใน try/catch · ถ้า auth scope ไม่พอ มันเงียบ
- **วิธีแก้:** รัน `shareAllCanvases()` ใน Apps Script editor (one-time fix)
- **Impact:** แก้ได้แล้ว · Canvas แสดงผลได้ใน Grading + Gallery

### 2. Apps Script `setCanvasScore` ไม่ได้ deploy version ใหม่
- **สาเหตุ:** User copy-paste ไม่ครบ (ไฟล์ local 824 บรรทัด · user's Code.gs มีแค่ 748 บรรทัด)
- **วิธีแก้:** paste handler ทีละขั้น + dispatch + Deploy → Manage deployments → New version
- **Impact:** แก้ได้แล้ว · คะแนน save ลง column `q{N}_teacher_score` สำเร็จ

### 3. `no-cors` fire-and-forget ปกปิด error
- **สาเหตุ:** `DB._post` ใช้ `mode:'no-cors'` · ไม่เห็น response
- **Impact:** debug ยาก · ต้องใช้ Apps Script Executions tab แทน
- **ยังไม่แก้:** อาจเพิ่ม observable endpoint สำหรับ write ในอนาคต

### 4. ISO date เป็นชื่อห้อง
- **สาเหตุ:** Google Sheets auto-parse "5/1" เป็นวันที่ตอน student submit
- **วิธีแก้ client:** `_cleanRoom()` แปลงกลับ ISO → Bangkok M/D
- **วิธีแก้ถาวร:** (ยังไม่ทำ) ใน Apps Script `handleSubmit` บังคับเก็บเป็น text format

---

## 🎯 สิ่งที่เหลือตามลำดับ Roadmap

### 🟠 ขั้นที่ 2 · ก่อนตรวจจริง
- ✅ Formula auto-score · Gemini column · Gemini Vision (ทำไปก่อนหน้า)
- ✅ Grading Dashboard · Gallery Canvas (วันนี้)

### 🟡 ขั้นที่ 3 · เสริม
- Real-time score sync (ไม่ต้อง auto-reload · ใช้ polling หรือ event)
- Per-canvas rubric หลายด้าน (ถ้าครูขอ)
- Comment/note ต่อคะแนน

### 🔵 ขั้นที่ 4 · ไม่เร่ง
- Pivot Table สรุป FT/F
- Review ใบงาน Spot · radio แทน canvas ที่ไม่จำเป็น
- Format cell `s_room` เป็น text ใน Apps Script submit (กัน ISO date)

---

## 📁 ไฟล์ที่แก้ในเซสชันนี้

- `KP-Classroom.html` (หลัก · ~500+ บรรทัด)
- `lessons/shared/worksheet-core.js` (RESTORE_FLAT + GRADING_MODE + canvas overlay)
- `_private/AppsScript_Code.gs` (alias `setScore`)

---

## 🧪 Test Verification (ทำแล้วกับ Test_Pilot เลขที่ 99 · ห้อง 5/1)

- ✅ Grading tab: iframe replay แสดงคำตอบ text + canvas ครบ
- ✅ Gallery tab: filter แผน→งาน→ห้อง→นักเรียน→ข้อ ทำงาน
- ✅ Score sync: คลิก 3 ใน Gallery → Grading เห็นคะแนนทันที
- ✅ Sheet: column `q1_teacher_score` ถูกสร้าง · มีค่า 3
- ✅ Canvas overlay · mix-blend-mode:multiply โชว์ภาพผ่าน

---

## 📚 Commits (วันนี้ · 8 commits)

```
d393688 fix(sync): auto-reload เมื่อสลับ tab ตรวจรูป/ตรวจงาน · refresh panel หลังโหลด
899eef1 feat(score-sync): ตรวจรูป + ตรวจงาน ใช้ column q{N}_teacher_score ร่วมกัน
83b9396 refactor(gallery): ใช้ filter เดียวกับ ตรวจงาน + ตัวกรองข้อ
115b8ef fix(grading): ใช้ _cleanRoom ใน progress + student filter (แก้ 0/0 คน)
51a9cd2 fix(grading): ห้อง ISO→M/D + canvas fallback แสดง URL
87a4d42 fix(grading): ห้อง Date→string + canvas fallback หลาย URL
d5509d6 feat(grading): โชว์ canvas ด้วย <img> overlay จาก Drive URL
c744564 feat(grading): ตัวกรอง 4 ชั้น · แผน → งาน → ห้อง → นักเรียน
06dd562 feat(grading): เพิ่ม tab ตรวจงาน · iframe replay + rubric 0-3
```

---

**Next session:** ถ้าครูใช้จริงแล้วเจอปัญหาเพิ่ม · เน้น UX polish หรือขยับไปทำ Pivot Table สรุปผลวิจัย

---

## 🆕 Summary Dashboard 8 sub-tabs (2026-04-20 ต่อเนื่อง)

แทนที่ `renderSummaryTab()` เดิม (raw table) ด้วย Multi-tab Dashboard

### Sub-tabs ที่ทำ
| # | id | ทำอะไร | Data source |
|---|----|--------|-------------|
| 1 | `overview` | 7 stat cards + Hake distribution bar | Summary_All |
| 2 | `people` | ตารางเดิม + คลิกแถว → modal detail | Summary_All |
| 3 | `prepost` | Bar chart %Sound ข้อ 1–20 Pre vs Post | FT01_Scored + FT02_Scored (lazy) |
| 4 | `mc` | Top-5 MC horizontal bar + shift matrix 20 ข้อ | FT01/FT02_Scored |
| 5 | `poe` | Heatmap คน × แผน 1–10 · color gradient | Summary_All (POE_P*) |
| 6 | `formative` | Line chart F_Pre vs F_Post 9 แผน | Summary_All (F_Pre/Post_P*_Sound) |
| 7 | `poeft` | Scatter POE avg × FT02 Sound · quadrant guide | Summary_All |
| 8 | `report` | 3 ตารางวิทยานิพนธ์ (Demographics / Pre-Post per concept / MC shift) + Print A4 | Summary_All + FT01/FT02_Scored |

### Technical
- เพิ่ม Chart.js 4.4.1 CDN ใน `<head>`
- เพิ่ม CSS `.sum-subtab/.sum-card/.sum-stat/.heatcell/.report-table` + `@media print` rules
- ทุก fetch ผ่าน `DB.listSheet()` · lazy-load FT01/FT02_Scored เฉพาะ sub-tab ที่ต้องการ
- Global state: `_summaryData`, `_summarySort`, `_summaryFilter`, `_summaryActiveSub`, `_summaryExtra`, `_summaryCharts`
- `_destroyCharts()` ถูกเรียกก่อน re-render ทุกครั้ง · กันรูปซ้อน
- Concepts grouping (report table 2): 1–4 นิยาม · 5–8 เสียง · 9–12 ผิวน้ำ · 13–16 สมบัติ · 17–20 ประยุกต์
- Quadrant thresholds ใน POE vs FT: median ของ x และ y (ไม่ fix)
- Print: `body.printing-report` → visibility hack · ซ่อนทุกอย่างยกเว้น `#reportPrintArea`

### ข้อจำกัด / Known issues
- Demographics table ไม่มี gender/age (schema Summary_All ไม่เก็บ) · แสดงแค่ห้อง+จำนวน
- Concept grouping ใน report table 2 เป็น hardcoded · ถ้าแผนเปลี่ยนต้องแก้ใน code
- POE heatmap scale = max ใน dataset (ไม่ normalize ต่อแผน) · แผนที่มีเต็ม 10 vs แผนที่มีเต็ม 20 จะ bias
- Scatter quadrant ใช้ median ของ filtered set · เทียบระหว่างห้องต้องดูตัวเลขใน tooltip
- Print preview ต้องใช้ Print dialog ของเบราว์เซอร์ (ไม่ได้ generate PDF server-side)

### Follow-up tasks
- [ ] Add override column ใน Summary_All (ครู manually set final grade)
- [ ] Export PDF ผ่าน server-side (jsPDF + html2canvas) แทน browser print
- [ ] Drill-down ใน prepost chart: คลิกข้อ → แสดงนักเรียนที่ตอบ MC ข้อนั้น
- [ ] Configurable concept groups (UI แก้ได้ ไม่ต้อง hardcode)
- [ ] Per-room comparison chart (Q1/Q2/Q3 pre vs post แยกห้อง)
- [ ] Formative chart รองรับ per-room split
- [ ] Export report table เป็น Word (สำหรับ paste ลง thesis โดยตรง)
