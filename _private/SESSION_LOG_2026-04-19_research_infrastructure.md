# Session Log · 2026-04-19 · Research Infrastructure

**เป้าหมาย:** เชื่อมใบงาน standalone (FT-01/FT-02/Review18/POE/Spot/Calc/Matrix) เข้าระบบ KP-Classroom ให้ data ไหลเข้า Google Sheet อัตโนมัติสำหรับงานวิจัย

---

## ✅ สิ่งที่ทำเสร็จ (ตามลำดับ commit)

### 1. `a4c35df` — Iframe bridge FT-01/FT-02/Review18
- เพิ่ม `postMessage` handler ใน KP-Classroom · รับ `REQUEST_STUDENT_INFO` + `WS_SUBMIT`
- `renderIframe()` + routes `ft01`/`ft02`/`review10`
- Data ไหลเข้า sheet `FT01` / `FT02` / `Review` ผ่าน `DB.submit`

### 2. `39f1c78` — Likert 1–5 · F1-F9 formative
- `renderFTForm` ใช้ 5-point radio แทน `มั่นใจ/ไม่มั่นใจ` (2 ระดับ)
- Classify logic (Caleon & Subramaniam 2010): conf ≥ 4 = มั่นใจ · ≤ 2 = Lack of Knowledge
- Category: **Sound / Misconception / Guessing / No-K**
- Consistent กับ FT-01/FT-02 หลัก

### 3. `98de2fc` — ซ่อนเฉลยหน้านักเรียน
- `body.in-iframe` CSS rule ซ่อน `.answer-key` + `.rubric`
- Script ตรวจ `window.self !== window.top` · เพิ่ม class
- เปิดไฟล์ standalone ตรงๆ (ครู print) ยังเห็นเฉลย

### 4. `69e6e1b` — Flatten payload + lock FT-01/FT-02
- `flattenInputs()` · radio checked → `q1_t1='ก'` (column แยก · ไม่ใช่ raw JSON)
- `lockAfterSubmit` flag: ft01/ft02 = true · review10 = false
- แสดง locked screen ถ้าเปิดซ้ำ
- Canvas base64 ไม่ flatten (ใหญ่เกิน) · เก็บ `_canvas_count`

### 5. `a6f5c16` — ปุ่มครูปลดล็อก
- `🔓 ครูปลดล็อก` บนหน้า locked screen
- `prompt()` รหัสครู → `DB.verifyAdmin` → ลบ `state.submitted[key]` → `goHome`
- แก้ edge case: นักเรียนกดส่งพลาด · ต้องการรีเซ็ต

### 6. `0c4f931` — Universal wsId handler
- **ก่อนหน้านี้:** handler รู้จักแค่ ft01/ft02/review10 → POE/Matrix/Spot/Calc standalone **ถูก drop เงียบ** (silent fail)
- เพิ่ม `wsIdToSheet()` parse pattern `plan{N}-{tool}[-suffix]`:
  - `plan1-poe` → `POE_P1`
  - `plan2-matrix-2.1` → `Matrix_P2`
  - `plan5-f5-fourtier` → `F_Fourtier_P5`
- รองรับใบงาน standalone ทั้ง 28 ตัว

### 7. `64b7920` — ลบปุ่ม Download/Import .json
- worksheet-core toolbar · ลด UI clutter
- ป้องกันนักเรียนแชร์ไฟล์คำตอบ
- คงเหลือ: พิมพ์/PDF · ส่งครู · ล้าง

---

## 📊 สถานะระบบปัจจุบัน

| เครื่องมือ | Data → Sheet | Lock | หมายเหตุ |
|---|---|---|---|
| FT-01 Pre-test (แผน 1) | `FT01` | ✅ one-shot | Research baseline |
| FT-02 Post-test (แผน 10) | `FT02` | ✅ one-shot | Research outcome |
| Review 18 ข้อ (แผน 10) | `Review` | ❌ allow re-submit | Formative |
| F1-F9 Pre/Post รายแผน | `F_Pre_P{n}` / `F_Post_P{n}` | ❌ | 5-point Likert |
| POE-01 ถึง POE-04 | `POE_P{n}` | ❌ | Standalone worksheets |
| Spot the Error | `Spot_P{n}` | ❌ | Canvas **ยังไม่เก็บจริง** |
| Calc | `Calc_P{n}` | ❌ | |
| Matrix | `Matrix_P{n}` | ❌ | |
| CER | `CER_P{n}` | ❌ | |
| MJ | `MJ_P{n}` | ❌ | |
| TL (Traffic Light) | `TL_P{n}` | ❌ | |
| Upload ใบงาน | `Uploads` + Drive | - | PDF/รูป |

---

## ⚠️ ข้อจำกัดที่ยังเหลือ

### 1. Canvas drawings ไม่ถูกเก็บจริง
- ตอนนี้เก็บแค่ `_canvas_count` · ไม่มีภาพ
- **Impact:** Spot the Error, Review18 ขาดหลักฐานครึ่งนึงสำหรับวิจัย
- **Fix:** เพิ่ม Apps Script handler เก็บ base64 → Drive · สร้าง URL ใน Sheet

### 2. Lock เฉพาะ client-side
- `localStorage` per-browser · นักเรียนเปลี่ยน browser/เครื่อง → ปลดล็อกเอง
- **Fix (ถ้าต้องการ):** Server-side lock · ตรวจ `student_id + ws_id` ซ้ำใน Apps Script
- ปัจจุบันยอมรับได้สำหรับ research (ครูคุมสถานการณ์ทดสอบ)

### 3. FT-01/FT-02 ไม่ classify client-side
- Data เก็บ raw (t1='ก', t3='2', t2=4) · ไม่มี Sound/MC category
- **Fix:** ใส่ Formula ใน Sheet · หรือ client-side classify ใน iframe bridge

### 4. ข้อมูลทดสอบเก่าใน `FT01`
- 2 rows schema เก่า (`inputs`=JSON) — ไม่ compatible กับ flatten schema
- **Fix:** ลบก่อนเริ่มเก็บข้อมูลจริง

---

## 🎯 ลำดับงานที่ต้องทำต่อ (เรียงความด่วน)

### 🔴 ขั้นที่ 1 · ก่อน rollout (1 วัน)
1. **Canvas → Drive handler** (Apps Script) — P0 blocker
2. **Pilot test** end-to-end กับนักเรียน 2-3 คน
3. **ลบข้อมูลทดสอบเก่า** ใน sheet FT01

### 🟠 ขั้นที่ 2 · ก่อนตรวจ (1 วัน)
4. **Formula auto-score** ใน Sheet — Calc numeric + Spot keyword + POE radio
5. **Gemini text column** สำหรับ POE-E + Spot-Justify
6. **Gemini Vision** สำหรับ Spot canvas

### 🟡 ขั้นที่ 3 · เสริม (optional)
7. Gallery View canvas (หน้าครู)
8. Grading Dashboard (click 0-3 rubric)

### 🔵 ขั้นที่ 4 · ไม่เร่ง
9. เอกสาร Pivot Table สรุป FT/F
10. Review ใบงาน Spot · แนะนำ radio แทน canvas ที่ไม่จำเป็น

---

## 📁 ไฟล์ที่แก้ในเซสชันนี้

- `KP-Classroom.html` (หลัก · ~200+ บรรทัด)
- `lessons/shared/worksheet-core.js` (ลบปุ่ม json)
- `lessons/physics3/waves/แผน01_.../สื่อ10_FT01_Fourtier_PreTest.html` (ซ่อนเฉลย)
- `lessons/physics3/waves/แผน10_ทบทวน/สื่อ03_FT02_Fourtier_PostTest.html` (ซ่อนเฉลย)

---

## 🧪 Test Verification (ทำแล้ว)

- ✅ FT-01 ส่งเข้า Sheet `FT01` · flatten ทำงาน · lock ทำงาน
- ✅ F1-pre ส่งเข้า `F_Pre_P1` · Likert 1-5 · classify ถูก
- ✅ Teacher unlock (localStorage clear) ทำงาน
- ⚠️ POE-01 ทดสอบแล้วแต่เป็นก่อน commit `0c4f931` — ต้องทดสอบซ้ำ
- ⏳ FT-02 / Review18 / Spot / Matrix / Calc · ยังไม่ pilot test

---

## 📚 Research Methodology References (จากคำแนะนำในเซสชัน)

- **Four-tier classification:** Caleon & Subramaniam (2010) · Sound/MC/LK/LG
- **POE rubric:** 0-3 per P/O/E (9 pts total) · focus P→E shift = conceptual change
- **Calc rubric:** GRASP model · Given/Required · Relation · Algebra · Solution+Unit (4 pts)
- **Spot the Error rubric:** Identify + Correct + Justify (3 pts)
- **Reliability:** Inter-rater agreement (Cohen's κ) · sampling 10-20% double-grade
- **Normalized gain:** g = (Post − Pre)/(100 − Pre) · Hake (1998)

---

**Next session:** เริ่มที่ **#1 Canvas → Drive handler** (Apps Script)
