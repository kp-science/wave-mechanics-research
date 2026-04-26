---
description: สร้างแผน Wave/SHM ใหม่แบบครบวงจร (Step 1-7 pipeline) + ลงทะเบียนเข้าเว็บ + deploy
argument-hint: <waves|SHM> <planNumber> "<หัวข้อแผน>" [--media POE,Calc,Spot,F] [--no-confirm] [--dry-run]
---

# /phys-full — Macro: สร้างแผนฟิสิกส์ 5E+POE ครบวงจร

## Arguments
`$ARGUMENTS` = `<subject> <N> "<หัวข้อ>" [flags]`

- `subject` = `waves` หรือ `SHM`
- `N` = หมายเลขแผน (เช่น 11)
- `หัวข้อ` = ชื่อแผนภาษาไทย
- `--media` = ชนิดสื่อที่ต้องสร้าง (default: `POE,Calc,Spot,F`)
- `--no-confirm` = ไม่ถามยืนยันระหว่างทาง (เร่งสปีด + ลด token)
- `--dry-run` = แสดงแผนการทำงาน ไม่แก้ไฟล์จริง

## ไฟล์ต้องอ่าน (เท่านั้น — ห้ามอ่านทั้งโปรเจกต์)
- `lessons/physics3/<subject>/แผน05_การสะท้อนของคลื่น/` (reference template ถ้าเป็น waves)
- `lessons/physics3/SHM/แผน01_นิยามSHM/` (reference ถ้าเป็น SHM)
- `lessons/shared/worksheet-core.js` (path อ้างอิง)
- `content/physics3/{plans,tools,worksheets,questions,media}.js` (แก้แน่นอน)

## ขั้นตอน (ทำต่อเนื่อง ไม่ถาม ถ้ามี --no-confirm)

### Step 1-2: สร้างโฟลเดอร์ + Infographic
- `mkdir lessons/physics3/<subject>/แผนNN_<slug>/`
- สร้าง `แผนN_Infographic.html` (theme color ตามแผน)

### Step 3: POE HTML
- `สื่อ02_POE-NN_ใบบันทึกPOE.html` ตาม memory pipeline:
  - REAL form controls (radio/checkbox/textarea)
  - identity inputs `s-name`, `s-num`, `s-room`, `s-grp`
  - `<body data-ws-id="planN-poe">`
  - `<script src="../../../shared/worksheet-core.js"></script>`

### Step 4: Calc + Spot
- `สื่อ03_Calc_ใบกิจกรรม_N.1.html`
- `สื่อ04_Spot_ใบกิจกรรม_N.2.html`
- ตาม rules ใน memory (canvas ≥180px, ห้าม .cell paper-style)

### Step 5: F_N Four-tier
- `สื่อ05_F_N_Fourtier_PrePost.html` · 3 ข้อ · map M_N.1-3

### Step 6: Content Pack (4 ไฟล์)
แก้ทีละไฟล์ โดย **Edit เฉพาะบรรทัดที่เพิ่ม** ไม่ rewrite ทั้งไฟล์:
- `content/physics3/tools.js` → เพิ่ม `N: [...]`
- `content/physics3/worksheets.js` → เพิ่ม schema N
- `content/physics3/questions.js` → เพิ่ม Four-tier N
- `content/physics3/media.js` → เพิ่ม entry N

### Step 7: Verify + Deploy
- `python3 -c` check bracket balance ทั้ง 4 ไฟล์ content pack
- `git add` เฉพาะไฟล์ที่แก้
- `git commit -m "feat(planN): <หัวข้อ>"` (ภาษาไทย + Co-Authored-By)
- `git push origin main`

## Pre-push Checklist (รันอัตโนมัติ)
เช็ค 13 bugs จาก memory `reference_plan_pipeline_checklist.md`:
1. No ☐ placeholder → มี real form controls
2. Canvas height ≥180px
3. No `.cell` paper-style
4. POE HTML มี `<script src=".../worksheet-core.js">`
5. Path `../../../shared/worksheet-core.js` ถูกต้อง
6. Schema มี `title`, `viewFile`, `submitLabel`, `sheetPrefix`
7. Tools array ครบ 10 การ์ด
8. Media มี `folder`, `title`, `meta`, `sections`, `linkOut`
9. CER info-card ไม่มี `file:` field
10. Theme color ตรง plan
11. Bracket balance OK
12. File path ภาษาไทยถูก (URL encode)
13. `data-ws-id` unique

## เงื่อนไขหยุด (ต้องถามผู้ใช้)
- ถ้า `--no-confirm` ไม่ถูกส่ง: ถามยืนยันหลัง Step 5 (ก่อนแก้ content pack)
- ถ้า pre-push checklist fail: หยุดทันที แสดงบรรทัดที่ผิด
- ถ้า `git push` fail: หยุด ไม่ retry อัตโนมัติ

## Token budget
- ห้ามอ่านไฟล์ HTML > 300 บรรทัด ใช้ line range
- ห้าม Glob ทั้งโปรเจกต์ ใช้ path ตรง
- รายงานผลสั้น ≤100 คำตอนจบ
