# 🎯 Prompt Templates · ประหยัดโทเคนสูงสุด

**วิธีใช้:** copy ทั้งบล็อก · เติมค่าตรง `[...]` · paste ในแชทใหม่ (ทุกครั้งเริ่มแชทใหม่ต่อ 1 งานใหญ่)

---

## 📘 T1 · สร้างแผนใหม่ทั้งหมด (แผน 7, 8, 9 ที่ยังไม่มี)

```
แผน [N] · [ชื่อหัวข้อ]
sim: [URL เต็ม · ถ้ามีหลายตัวแยกด้วย | ]
theme: primary [#xxxxxx] · dark [#xxxxxx] · light [#xxxxxx] · hint [#xxxxxx]
Ms:
  M[N].1 "[ข้อความ misconception]"
  M[N].2 "[ข้อความ]"
  M[N].3 "[ข้อความ]"
Engage: [ชื่อ Concept Cartoon / Hook]
K/P/A: [copy จาก PLAN_BRIEFS.md บรรทัดเดียว]

ใช้ pattern เดียวกับแผน 6 (POE-06, Calc-6.1, Spot-6.2, F6, Infographic, content pack)
ทำครบ 2 ส่วน: (A) สร้าง HTML 5 ไฟล์ (B) นำเข้าระบบเว็บ (content pack 5 ไฟล์)
commit ท้าย · อย่าถามระหว่างทาง · ข้ามการอ่าน gold standard

━━━ ส่วน A · HTML 5 ไฟล์ ━━━
ใน lessons/physics3/waves/แผน[NN]_[ชื่อ]/ :
- แผน[N]_Infographic.html
- สื่อ02_POE-[N]_ใบบันทึกPOE.html
- สื่อ03_Calc_ใบกิจกรรม[N].1.html
- สื่อ04_Spot_ใบกิจกรรม[N].2.html
- สื่อ05_F[N]_Fourtier_PrePost.html

━━━ ส่วน B · นำเข้าระบบเว็บ (⚠️ บังคับ · ไม่ทำ = หน้าเว็บไม่เห็น) ━━━
แก้ content/physics3/ ทั้ง 5 ไฟล์:
1. tools.js      → window.KP_PLAN_TOOLS[N] = ['tl-pre','f[N]-pre','poe','cer','calc','spot','tl-post','f[N]-post','mj','upload']
                   (ถ้า f[N]-pre/post ยังไม่มีใน KP_TOOL_DEFS ให้เพิ่มด้วย)
2. worksheets.js → window.KP_WORKSHEETS[N] = { poe:{...}, calc:{...}, spot:{...}, cer:{...} }
                   (ทุก schema ต้องมี title, viewFile, submitLabel, sheetPrefix, allowUpload)
3. questions.js  → window.KP_FT_BANK[N] = [3 ข้อ Four-tier] (stem/opts/reasons/key)
4. media.js      → window.KP_PLAN_MEDIA[N] = { folder, title, meta, sections:[...], linkOut:[...] }
                   ⚠️ CER info-card ไม่ใส่ field 'file:'
5. plans.js      → verify window.KP_PLANS มี entry { no:[N], title, periods } (ถ้ายังไม่มีเพิ่ม)

━━━ ข้อบังคับ HTML ━━━
- data-ws-id="plan[N]-[type]" · script src="../../../shared/worksheet-core.js"
- MC Reflection 3-part (เคย/ไม่เคย · 3 choices · textarea หลักฐาน)
- Canvas ≥ 180px · real form controls · theme color ตามที่ระบุ

━━━ Verify หลัง commit ━━━
- python3 bracket balance ทั้ง 5 ไฟล์ content pack
- Grep "แผน [N]" ใน content/physics3/ ควรพบ ≥ 4 จุด
- Hard refresh browser → เปิดหน้าเว็บ · เลือกแผน [N] · ต้องเห็นการ์ด 10 ใบ
```

**ประหยัด:** ~75,000 tok (ข้ามอ่าน AI_START_HERE + 3 ไฟล์ gold standard)

---

## 📗 T2 · แก้ไข/เพิ่มฟีเจอร์เล็ก ๆ

```
แก้ไฟล์ [path/to/file] · [บรรทัดประมาณ หรือ function name]

ปัญหา: [อธิบาย 1 ประโยค]
ต้องการ: [อธิบาย 1 ประโยค]
อย่าแก้จุดอื่น · อย่าตรวจ syntax รอบ ๆ · commit ทันที
```

**ประหยัด:** ~30,000 tok (ไม่ต้องอ่านไฟล์ทั้งหมด)

---

## 📙 T3 · ทำแผนข้ามหลายแผนครั้งเดียว

```
ทำแผน [N1], [N2], [N3] ตาม pattern แผน 6

ข้อมูลแต่ละแผน:
แผน [N1]: sim [URL] · Ms [M.1 "xxx" / M.2 "xxx"] · theme [#xxx]
แผน [N2]: sim [URL] · Ms [...] · theme [#xxx]
แผน [N3]: sim [URL] · Ms [...] · theme [#xxx]

ทำทั้ง 3 แผนพร้อมกัน · commit ครั้งเดียวท้ายสุด
```

**ประหยัด:** ~50% ของการทำทีละแผน (context load ครั้งเดียว)

---

## 📕 T4 · Bug fix / Performance

```
ปัญหา: [อาการที่เกิด · เช่น "เลือกแผนใช้เวลา 3-4 วิ"]
ไฟล์ที่น่าจะเกี่ยว: [ถ้าทราบ · ถ้าไม่ก็เว้น]
อยากให้: [เป้าหมาย · เช่น "<100ms"]

หาสาเหตุ + แก้ + commit · ไม่ต้องถามก่อนแก้
```

**ประหยัด:** ~20,000 tok (ไม่ต้อง propose solution ก่อน)

---

## 📔 T5 · ปรับ UI/UX component ที่มีหลายไฟล์

```
ปรับ [component name · เช่น "Misconception Reflection section"]
ทุกไฟล์: [ระบุ · เช่น "POE-01, 03, 04, 05, 06"]
การเปลี่ยนแปลง: [อธิบาย pattern ใหม่ 2-3 ประโยค]
commit ครั้งเดียวท้ายสุด · ไม่ต้องโชว์ตัวอย่างก่อน
```

---

## 🏆 Power Combo · เริ่มแชทใหม่แบบประหยัดสุด

**บรรทัดแรกของทุกแชท:**

```
Context: โปรเจกต์ KP-Classroom ที่ /Users/komanepapato/Documents/วิจัย/wave-mechanics-research
อ่าน _private/PROMPT_TEMPLATES.md แล้วจำ pattern ไว้
จากนี้ไปถ้าผมสั่งแบบ template · ทำตามเลยโดยไม่ถาม
```

**จากนั้น paste template ที่ต้องการ (T1-T5)**

---

## 🔌 T6 · สั่ง "นำเข้าระบบเว็บ" อย่างเดียว (ถ้า HTML มีอยู่แล้ว)

ใช้เมื่อ AI ทำ HTML ให้แล้ว แต่ไม่ได้อัปเดต content pack · หรือเมื่อไฟล์ HTML สร้างด้วยมือ

```
นำเข้าระบบเว็บ · แผน [N]

ไฟล์ HTML ที่มีอยู่ใน lessons/physics3/waves/แผน[NN]_[ชื่อ]/ :
- แผน[N]_Infographic.html
- สื่อ02_POE-[N]_ใบบันทึกPOE.html
- สื่อ03_Calc_ใบกิจกรรม[N].1.html
- สื่อ04_Spot_ใบกิจกรรม[N].2.html
- สื่อ05_F[N]_Fourtier_PrePost.html

Misconceptions: M[N].1, M[N].2, M[N].3
Theme: [#xxx]
Sim URL: [URL]

อัปเดต content/physics3/ ทั้ง 5 ไฟล์ให้ครบ (tools/worksheets/questions/media/plans)
ใช้ pattern เดียวกับแผน 6
commit + push ท้ายสุด · อย่าถามระหว่างทาง
```

**ประหยัด:** ~50,000 tok (ไม่ต้องสร้าง HTML ซ้ำ)

---

## 🔍 T7 · Verify Registration ครบไหม

หลัง AI commit แล้ว · อยากเช็คว่านำเข้าระบบครบหรือไม่:

```
ตรวจว่าแผน [N] นำเข้าระบบเว็บครบไหม · ถ้าไม่ครบ บอกว่าขาดอะไรและแก้ให้ · commit ถ้าแก้

เช็ค:
1. tools.js    · KP_PLAN_TOOLS[N] มีครบ 10 tool
2. worksheets  · KP_WORKSHEETS[N] มี poe/calc/spot/cer
3. questions   · KP_FT_BANK[N] มี 3 ข้อ
4. media       · KP_PLAN_MEDIA[N] มี folder/sections/linkOut
5. plans       · KP_PLANS มี entry [N]
6. HTML 5 ไฟล์ตรงตามที่ schema อ้างถึง (viewFile)
```

**ประหยัด:** ~10,000 tok (ตรวจเจาะจง ไม่ต้องรื้อทั้งโปรเจกต์)

---

## ⚙️ กฎเหล็ก (บังคับผมทุกครั้ง)

ใส่ในทุก prompt ถ้าต้องการบังคับเคร่งครัด:

```
กฎเหล็ก:
1. อย่าอ่านไฟล์ที่ไม่จำเป็น (ไม่อ่าน gold standard ถ้าระบุ pattern ชัด)
2. อย่าถามยืนยันระหว่างทาง · ทำครบก่อนรายงาน
3. อย่าตรวจ syntax ด้วยคำสั่งแยกถ้าไม่มีปัญหา
4. Batch tool calls · parallel เมื่อเป็นไปได้
5. Commit message ภาษาไทย + Co-Authored-By
6. Output สรุปสั้น ๆ เมื่อเสร็จ (ไม่ต้องอธิบายทุกไฟล์ที่แก้)
```

---

## 📊 เทียบค่าใช้จ่ายคร่าว ๆ

| วิธี | Input tok | Output tok | เวลา | $ ประมาณ |
|---|---|---|---|---|
| ❌ "อ่าน AI_START_HERE แล้วเริ่มแผน N" | ~400K | ~120K | 45 นาที | $2.00 |
| ✅ T1 Template + บรรทัดแรก Context | ~180K | ~100K | 25 นาที | $1.10 |
| 🏆 T1 + กฎเหล็ก + `/compact` ที่แชทก่อน | ~120K | ~90K | 20 นาที | $0.75 |

**ประหยัดได้ ~60%** ถ้าใช้ครบสูตร

---

## 🔄 Workflow แนะนำสำหรับทำแผน 7-10

**แชท 1:** แผน 7 (T1) → commit → ปิดแชท
**แชท 2:** แผน 8 (T1) → commit → ปิดแชท
**แชท 3:** แผน 9 (T1) → commit → ปิดแชท
**แชท 4:** แผน 10 + ปรับแต่งภาพรวม (T1 + T5)

**ห้าม:** ทำ 4 แผนในแชทเดียว · context จะใหญ่มากและกินโทเคนทวีคูณ

---

## 💡 Tip ลับ

1. **`/model haiku`** ก่อนสั่งงานง่าย (rename, typo, commit msg edit) · ประหยัด 5 เท่า
2. **`/compact`** ทุกครั้งที่แชทยาว 20+ turns
3. **`/clear`** ถ้ากำลังจะเปลี่ยนงานไปทำอย่างอื่นคนละเรื่อง
4. **กด ESC 2 ครั้ง** ถ้า AI เริ่มทำสิ่งที่ไม่ต้องการ — อย่าปล่อยไปจบแล้วค่อยบอก (เสียโทเคน output)
5. Screenshot ให้ **crop เฉพาะส่วนที่เกี่ยว** · ไม่ต้อง fullscreen ทั้งจอ

---

_Last updated: 2026-04-18 · สำหรับโปรเจกต์ KP-Classroom Physics 3 (ว30203)_
