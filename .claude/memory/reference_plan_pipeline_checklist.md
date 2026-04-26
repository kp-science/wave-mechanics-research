---
name: Plan pipeline checklist + common mistakes
description: Comprehensive checklist for creating each lesson plan and uploading to the KP-Classroom web system. Lists every step and every mistake learned from Plan 5 development (2026-04-18).
type: reference
originSessionId: a3dc2cf0-739c-43af-82bb-1f1d37bb161a
---
# Pipeline สร้างแผนการเรียนรู้ + Upload เข้าเว็บ (7 ขั้นตอน + Checklist กันพลาด)

## 📋 7 Steps ต่อแผน (มาตรฐาน)

### Step 1 — Curriculum Outline (wait for approve)
- K/P/A objectives (จาก วัตถุประสงค์_10แผน_พร้อมวPA_Mapping.xlsx)
- Misconceptions เป้าหมาย (M_N.1, M_N.2, ...) จาก Mapping_10แผน_20คาบ.docx
- 5E + POE flow 9 ขั้น: TLC → Formative Pre → Engage → Explore → Explain → Elaborate → TLC Post → Formative Post → Metacognitive Journal
- Engage activity ไม่ซ้ำแผนก่อน

### Step 2 — Infographic HTML
- `แผนN_Infographic.html` (theme color ต่อแผน)
- Hero gradient · K/P/A · 5E+POE timeline · วPA 8 ตัวชี้วัด · Sim banner · Enrichment
- **Plan N theme colors ต้องคงเส้น**: Plan 1=blue, 2=green, 3=purple, 4=orange-red, 5=teal, 6+ = ตามที่วางไว้

### Step 3 — POE-NN Interactive HTML
- `สื่อ02_POE-NN_ใบบันทึกPOE.html`
- **ต้องเป็น REAL form controls** (ไม่ใช่ ☐ placeholder):
  - `<input type="radio" name="p-predict">` สำหรับ prediction
  - `<input type="radio" name="p-reason">` สำหรับ reason
  - `<input type="checkbox">` สำหรับ checklist
  - `<textarea id="...">` สำหรับข้อความ
  - Canvas สำหรับวาด (scene-stack overlay ถ้ามี SVG ให้วาดทับ)
- **Identity inputs required**: `s-name`, `s-num`, `s-room`, `s-grp`
- `<body data-ws-id="planN-poe">` สำหรับ localStorage key
- `<script src="../../../shared/worksheet-core.js"></script>` ก่อนปิด `</body>`

### Step 4 — Calc + Spot Worksheets
- `สื่อ03_Calc_ใบกิจกรรม_N.1.html` + `สื่อ04_Spot_ใบกิจกรรม_N.2.html`
- **Calc rules**:
  - พิมพ์เลขได้ → `<input type="number">`
  - พิมพ์ประโยคได้ → `<textarea>`
  - ต้องวาด/แสดงวิธี → canvas (lined paper หรือ scene-stack overlay)
  - ห้ามใช้ `.cell` "กำหนด/ต้องหา" paper-style แบบเส้นประ (canvas ใช้แทนได้)
- **Spot rules** (format ใหม่):
  - Claim canvas overlay (ให้วงกลม/ขีดทับจุดผิดบนข้อความ)
  - ลบ `.subq` checkbox "ผิดตรงไหน" ออก
  - Big section-heading แทน (🔍 วงกลมจุดผิด / ✍️ อธิบายที่ถูก)
  - Canvas + textarea ใต้ heading "อธิบายที่ถูก"

### Step 5 — F_N Four-tier Pre/Post
- `สื่อ05_F_N_Fourtier_PrePost.html`
- 3 ข้อ · ทุกข้อมี Tier 1-4 (คำตอบ + มั่นใจ + เหตุผล + มั่นใจ)
- Distractors แมปกับ M_N.1, M_N.2, M_N.3 ตรง
- Answer key + interpretation rubric (ซ่อนเมื่อ print)

### Step 6 — Content Pack Update (CRITICAL — ถ้าลืมจะว่างเปล่า)
**4 ไฟล์ต้องอัปเดต:**

#### 6a. `content/physics3/plans.js`
ควรมี entry ของแผนอยู่แล้ว (10 แผน)

#### 6b. `content/physics3/tools.js`
```js
window.KP_PLAN_TOOLS = {
  N: ['tl-pre','fN-pre','poe','cer','calc','spot','tl-post','fN-post','mj','upload'],
};
```
ต้องมี `cer`, `calc`, `spot` (ถ้าแผนมี) · ถ้าลืมใส่ นักเรียนจะเห็นการ์ดไม่ครบ

#### 6c. `content/physics3/worksheets.js`
Schema ต่อแผน · ใส่ `viewFile` สำหรับ embed mode (single source of truth):
```js
N: {
  poe: {
    title: 'POE-NN · ...',        // ⚠️ REQUIRED (ใช้ในการ์ดชื่อ)
    description: '...',            // ใช้ในการ์ด
    viewFile: 'สื่อ02_POE-NN_...html',
    submitLabel: '📤 ส่ง POE-NN',
    sheetPrefix: 'POE_P',
    misconception: 'M_N.1 · M_N.2 · M_N.3',
    allowUpload: true,
    hero: { question: '...', context: '...' }
  },
  calc: { title, description, viewFile, submitLabel, sheetPrefix, allowUpload },
  spot: { title, description, viewFile, submitLabel, sheetPrefix, allowUpload },
  cer:  { id, title, description, columns: [...], allowImage: true, sheetPrefix: 'CER_P' }
}
```

#### 6d. `content/physics3/questions.js`
F_N Four-tier questions (3 ข้อ):
```js
N: [
  { misc:'M_N.1', stem:'...', opts:{ก,ข,ค,ง}, reasons:[1,2,3,4], key:{t1:'ก',t3:'1'} },
  { misc:'M_N.2', ... },
  { misc:'M_N.3', ... }
]
```

#### 6e. `content/physics3/media.js` — เพิ่ม entry N
```js
N: {
  folder: 'lessons/physics3/waves/แผนNN_.../',
  title: 'แผน N — ...',
  meta: 'ว30203 · ม.5 · คาบ N-N+1 · ว2.1 ม.5/X',
  sections: [...],  // 3-4 sections (แผนภาพรวม / สื่อ / เครื่องมือ / CER)
  linkOut: [...]    // 7-8 ข้อ (เป้าหมาย → ใช้ในบทที่ 4)
}
```

⚠️ **CER info-card ต้องไม่ใส่ `file:` field** (ถ้าใส่ฟรี URL จะ 404) · renderer handle แล้ว

### Step 7 — Git Commit + Push + Web Review
```bash
git add content/physics3/ lessons/physics3/waves/แผนNN_.../ lessons/shared/
git commit -m "feat(planN): ..."
git push origin main
```
รอ GitHub Pages deploy 1-2 นาที → **Ctrl+Shift+R** (hard refresh) → ตรวจ:
1. Teacher Dashboard → 📚 สื่อ/เครื่องมือ → เลือก Plan N → ควรเห็น 4 sections ครบ
2. Student view → Plan N → ตรวจการ์ดครบ 10 ใบ (tl-pre, fN-pre, poe, cer, calc, spot, tl-post, fN-post, mj, upload)
3. คลิกแต่ละการ์ด → ตรวจ iframe โหลดไฟล์ HTML ที่ถูกต้อง

---

## 🐞 Common Mistakes (จาก Plan 5 — ห้ามทำซ้ำ)

| # | Bug | Symptom | Fix |
|---|---|---|---|
| 1 | ☐ placeholder characters แทน real form controls | คลิกไม่ได้ ไม่ส่งข้อมูล | ใช้ `<input type="radio/checkbox">` + `<textarea>` |
| 2 | Canvas size เล็กเกินไป (110-140px) | เขียนไม่พอ | ตั้ง height=180-200px |
| 3 | ตารางเซลล์ว่าง (paper-style) | พิมพ์ไม่ได้บนเว็บ | ใส่ `<input>` ในทุก `<td>` ที่ต้องเติม |
| 4 | `.cell กำหนด/ต้องหา` paper `.line` | ซ้ำซ้อนกับ canvas | ลบออก · canvas ใช้แทนได้ |
| 5 | POE E-section คำถามกว้าง "ตรงกันไหม" | นักเรียนตอบสั้น | คำถามเจาะจง + 🟢🔴 Conceptual Inventory (ถูก 5 ข้อ / MC 4 ข้อ) |
| 6 | Dual-source schema vs HTML | แก้แล้วเว็บไม่ตรง | ใช้ embed mode (`viewFile` ใน schema) = Single Source of Truth |
| 7 | Media info-card ไม่มี `file:` | renderer throw → media tab ว่างทั้งแผน | renderer เช็ค `!it.file` ก่อน split (แก้แล้ว) |
| 8 | Plan tools array ขาด entries | การ์ดนักเรียนไม่ครบ | `5: ['tl-pre','f5-pre','poe','cer','calc','spot',...]` |
| 9 | Schema ขาด `title` field | การ์ดแสดงชื่อ fallback ผิดแผน | ใส่ title + description ที่ top level ของ schema |
| 10 | POE HTML ไม่มี `<script src="worksheet-core.js">` | Auto-save ไม่ทำงาน | เพิ่มทุกไฟล์ + `data-ws-id` + student ID inputs |
| 11 | Path อ้างอิง `worksheet-core.js` ผิด | 404 | ต้องเป็น `../../../shared/worksheet-core.js` (3 ระดับขึ้น) |
| 12 | SVG concave mirror ทิศผิด | `( shape` แทน `) shape` | ใช้ Quadratic Bezier `Q` · vertex อยู่ขวา (ถ้าคลื่นมาจากซ้าย) |
| 13 | Scene-stack canvas ไม่ซ้อน SVG | ลบ eraser ทำให้ SVG หาย | ใช้ `class="overlay"` + `destination-out` composite |

---

## ✅ ก่อน Push Checklist

1. [ ] ไฟล์ HTML ทุกไฟล์มี `<body data-ws-id="planN-type">` + student ID inputs + `<script src="../../../shared/worksheet-core.js">`
2. [ ] `worksheets.js` — Plan N มี `title`, `description`, `viewFile`, `submitLabel`, `sheetPrefix`, `allowUpload` ครบทุก schema (poe/calc/spot/cer)
3. [ ] `tools.js` — Plan N array ครบทุกการ์ดที่ต้องการให้นักเรียนเห็น
4. [ ] `media.js` — Plan N มี `folder`, `title`, `meta`, `sections`, `linkOut` ครบ
5. [ ] `questions.js` — Plan N มี 3 ข้อ Four-tier
6. [ ] `bracket balance` python3 check ทั้ง 4 ไฟล์ content pack
7. [ ] CER info-card items ไม่ใส่ `file:` field (intentionally)
8. [ ] Real form controls ทุก checkbox/radio/textarea (no ☐ text)
9. [ ] Canvas height ≥180px (วาดได้พอ)
10. [ ] Theme color ตรงกับ plan (ไม่ใช้สีจาก plan อื่น)
11. [ ] Git commit message ภาษาไทย + Co-Authored-By
12. [ ] Hard refresh + verify teacher dashboard + student view

---

## 📂 Shared Infrastructure (สร้างครั้งเดียว ใช้ได้ทุกแผน)

- `lessons/shared/worksheet-core.js` — auto-save + localStorage + identity fill + export JSON + print-PDF
- `lessons/shared/README.md` — คู่มือใช้งาน + spec KP-Classroom parent handler

---

## 🎯 Lesson learned จาก Plan 5

**จุดสำคัญที่สุด:** Single Source of Truth
- ไฟล์ HTML ใน folder = เว็บ KP-Classroom แสดงผลเหมือนกัน 1:1 (ผ่าน `viewFile` embed)
- ห้ามมี 2 version คู่ขนาน (schema form + HTML standalone ที่ต่างกัน)
- แก้ไฟล์ที่เดียว · push · เว็บอัปเดตตาม
