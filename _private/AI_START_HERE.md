# 🤖 AI Start Here · อ่านก่อนลงมือทำแผนทุกครั้ง

**นี่คือ entry point สำหรับ AI agent · user จะสั่งให้ "อ่านไฟล์นี้ก่อนทำ" ทุก conversation**

---

## 📚 ต้องอ่านก่อนลงมือ (บังคับ 3 ไฟล์)

1. **`_private/PLAN_BRIEFS.md`** ← ข้อมูลแผน 1–10 ทั้งหมด (K/P/A, Misconceptions, theme, sim, ตัวชี้วัด วPA)
2. **`_private/AI_START_HERE.md`** ← ไฟล์นี้ (pipeline + กฎ + checklist)
3. **`lessons/shared/README.md`** ← worksheet-core.js spec

**ไม่ต้องอ่านทุกครั้ง (อ่านเฉพาะเมื่อ user สั่ง):**
- `00_ส่วนกลาง_วิจัยและวPA/Mapping_10แผน_20คาบ.docx` · ข้อมูลอยู่ใน PLAN_BRIEFS.md แล้ว
- `00_ส่วนกลาง_วิจัยและวPA/วัตถุประสงค์_10แผน_พร้อมวPA_Mapping.xlsx` · ข้อมูลอยู่ใน PLAN_BRIEFS.md แล้ว

---

## 📂 Gold Standard Templates (ดูก่อนเขียนใหม่)

ไฟล์ใน `lessons/physics3/waves/แผน05_การสะท้อนของคลื่น/`:

- `แผน5_Infographic.html` — pattern infographic (hero, K/P/A, 5E+POE timeline, vPA, sim banner)
- `สื่อ02_POE-05_ใบบันทึกPOE.html` — interactive POE (palette + canvas + real form · gold standard)
- `สื่อ03_Calc_ใบกิจกรรม5.1.html` — Calc format (canvas + text input per question)
- `สื่อ04_Spot_ใบกิจกรรม5.2.html` — Spot format (claim-overlay + 🟢🔴 Conceptual Inventory)
- `สื่อ05_F5_Fourtier_PrePost.html` — Four-tier 3 items

---

## 🎯 7-Step Pipeline (ทำตามลำดับ · รอ approve ก่อนไปขั้นถัดไป)

### Step 1 — Curriculum Outline → **wait approve**
- อ่าน `_private/PLAN_BRIEFS.md` ส่วนของแผน [X]
- วาง K/P/A objectives + Misconceptions + 5E+POE 9 ขั้น
- Engage activity ต้องไม่ซ้ำแผนก่อนหน้า

### Step 2 — Infographic → `แผน[X]_Infographic.html`
- Theme color ตามตาราง (PLAN_BRIEFS.md section "Theme Colors")
- Hero gradient · K/P/A · 5E+POE timeline · วPA 8 ตัวชี้วัด · Sim banner · Enrichment

### Step 3 — POE-[XX] Interactive → `สื่อ02_POE-[XX]_ใบบันทึกPOE.html`
- **Real form controls** (ห้าม ☐ text placeholder!)
- `<body data-ws-id="plan[X]-poe">` + `s-name/s-num/s-room/s-grp` inputs
- Canvas scene-stack overlay ถ้ามี SVG ให้วาดทับ
- 🟢🔴 Conceptual Inventory (ถูก 5 ข้อ / MC matching แผน)
- `<script src="../../../shared/worksheet-core.js"></script>` ก่อนปิด `</body>`

### Step 4 — Calc + Spot → `สื่อ03_Calc_ใบกิจกรรม[X].1.html` + `สื่อ04_Spot_ใบกิจกรรม[X].2.html`
- Canvas ≥ 180px + text input per question
- พิมพ์เลขได้ → `<input type="number">` · พิมพ์ประโยค → `<textarea>` · ต้องวาด → canvas
- Spot: claim canvas overlay + big section-heading + canvas+textarea อธิบาย (ลบ `.subq` checkbox)
- ห้ามใส่ `.cell กำหนด/ต้องหา paper .line` (canvas แทนได้)

### Step 5 — F[X] Four-tier → `สื่อ05_F[X]_Fourtier_PrePost.html`
- 3 ข้อ · Tier 1-4 (คำตอบ+มั่นใจ+เหตุผล+มั่นใจ)
- Distractors แมปกับ M[X].1-3 ตรง
- Answer key + interpretation rubric (ซ่อนเมื่อ print)

### Step 6 — Content Pack Update (5 ไฟล์) ⚠️
แก้ `content/physics3/`:
- `tools.js` — เพิ่ม Plan [X] array
- `worksheets.js` — schema {poe/calc/spot/cer} · ทุก schema มี `title`, `viewFile`, `submitLabel`, `sheetPrefix`, `allowUpload`
- `questions.js` — 3 ข้อ Four-tier แผน [X]
- `media.js` — folder/title/meta/sections/linkOut · CER info-card ไม่ใส่ `file:`
- `plans.js` — verify entry [X] exists

### Step 7 — git commit + push + verify
Commit message ภาษาไทย + Co-Authored-By · push → hard refresh → verify student view + teacher dashboard

---

## 🚫 13 Bugs ห้ามทำซ้ำ (จาก Plan 5)

1. **☐ text placeholder** → ใช้ `<input type="radio/checkbox">` จริง
2. **Canvas <180px** → ตั้ง 180-200px
3. **ตารางเซลล์ว่าง** → ใส่ `<input>` ทุก td
4. **`.cell กำหนด/ต้องหา` paper** → ลบออก canvas แทนได้
5. **POE E-section กว้าง** → คำถามเจาะจง + 🟢🔴 Inventory
6. **Dual-source** → ใช้ `viewFile` embed (Single Source of Truth)
7. **CER info-card ใส่ `file:`** → ไม่ต้องใส่ · renderer handle
8. **Plan tools array ขาด** → ครบ 10 การ์ด
9. **Schema ขาด `title`** → ใส่ที่ top level
10. **POE ไม่มี worksheet-core.js** → ต้องมี
11. **Path `../../../` ผิด** → 3 ระดับขึ้นเสมอ
12. **SVG ผิวโค้งผิดทิศ** → ตรวจ Bezier/path
13. **Canvas overlay eraser ลบ SVG** → `destination-out` composite

---

## ✅ Pre-Push Checklist (12 ข้อ)

- [ ] HTML ทุกไฟล์: `data-ws-id` + `s-name/num/room/grp` + `<script src="../../../shared/worksheet-core.js">`
- [ ] `worksheets.js`: ทุก schema มี title/description/viewFile/submitLabel/sheetPrefix/allowUpload
- [ ] `tools.js`: Plan [X] array ครบ (tl-pre, f[X]-pre, poe, cer, calc, spot, tl-post, f[X]-post, mj, upload)
- [ ] `media.js`: Plan [X] มี folder/title/meta/sections/linkOut
- [ ] `questions.js`: Plan [X] มี 3 ข้อ Four-tier
- [ ] Python bracket balance ทั้ง 4 ไฟล์ content pack
- [ ] CER info-card **ไม่ใส่** `file:` field
- [ ] Real form controls ทุกช่อง (no ☐ text)
- [ ] Canvas height ≥180px
- [ ] Theme color ตรงกับแผน (ตาราง PLAN_BRIEFS.md)
- [ ] Commit message ภาษาไทย + Co-Authored-By
- [ ] Hard refresh + verify ทั้ง 2 view

---

## 🎬 Quick trigger commands จาก user

User มักจะสั่งแบบ:

**A. เริ่มแผนใหม่:**
> "อ่าน AI_START_HERE.md แล้วเริ่มแผน [X] · Step 1 Curriculum Outline"

**B. ข้าม curriculum:**
> "อ่าน AI_START_HERE.md แล้วทำแผน [X] ตั้งแต่ Step 2 · M[X].1-3 เจาะ: [...]"

**C. แก้แผนเดิม:**
> "อ่าน AI_START_HERE.md · แก้แผน [X] · [ปัญหา] · commit+push"

**D. ใบงานเดี่ยว:**
> "อ่าน AI_START_HERE.md · สร้างใบ [Calc/Spot/POE] แผน [X] · อัปเดต content pack ด้วย"

---

## 💡 เริ่มต้นทำงานทุกครั้ง

```
1. อ่านไฟล์นี้ (AI_START_HERE.md) — ได้ pipeline + rules + checklist
2. อ่าน _private/PLAN_BRIEFS.md — ได้ข้อมูลแผนที่ user สั่ง
3. ดู gold standard templates แผน 5 — ได้ pattern
4. ทำตาม Step 1 (curriculum outline) → รอ approve
5. ดำเนินการ Step 2-7 ตามลำดับ
6. ตรวจ Pre-Push Checklist ก่อน commit ทุกครั้ง
```

---

**หมายเหตุ:** ถ้า PLAN_BRIEFS.md เก่า/ไม่มีข้อมูลบางแผน → สั่งให้ AI re-extract จากไฟล์ docx/xlsx แล้ว update เข้า PLAN_BRIEFS.md · ต่อไปก็ไม่ต้องอ่านอีก
