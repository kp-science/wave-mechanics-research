# Content Pack — Wave Mechanics

Content-pack แบบแยกจาก engine (`KP-Classroom.html`)
ใช้วิชาอื่น = copy โฟลเดอร์ `content/` นี้แล้วแก้ค่าภายในให้ตรงวิชาใหม่

## ไฟล์

| ไฟล์ | หน้าที่ | แก้เมื่อ |
|------|---------|---------|
| `config.js` | ข้อมูลโรงเรียน/ครู/ปี/URL Apps Script/รหัสแอดมิน | เปลี่ยนวิชา ปี ครู หรือย้าย backend |
| `plans.js` | รายการแผนการสอน (10 แผน) | ปรับโครงสร้างหลักสูตร |
| `tools.js` | นิยาม tool + tool ที่ใช้ต่อแผน | เพิ่ม/ลด tool หรือเปลี่ยนลำดับ |
| `media.js` | สื่อและเครื่องมือของแต่ละแผน (โชว์ในแท็บ 📚 ของครู) | เพิ่มสื่อใหม่ต่อแผน |
| `questions.js` | คลังข้อสอบ Four-tier (F1–F9) | แก้ข้อสอบ |

## หลักการสำคัญ

1. **ห้ามใช้ ES module / import** — ใช้ `window.KP_*` globals เพื่อให้เปิดจาก `file://` ได้
2. **Order สำคัญ** — `config.js` ต้องโหลดก่อน (อื่นๆ อาจอ้างถึง)
3. **แก้แล้ว refresh** — ไม่ต้อง rebuild · แค่ reload browser

## โครงสร้าง Global Variables

```js
window.KP_CONFIG      // { school, year, teacher, apiUrl, ... }
window.KP_PLANS       // [{ no, title, periods }, ...]
window.KP_PLAN_TOOLS  // { 1: ['tl-pre','f1-pre',...], 2: [...], ... }
window.KP_TOOL_DEFS   // { 'tl-pre': { ico, name, desc, sheet, color }, ... }
window.KP_PLAN_MEDIA  // { 1: { folder, title, sections, linkOut }, ... }
window.KP_FT_BANK     // { 1: [{ misc, stem, opts, reasons, key }, ...], ... }
```

## ใช้ซ้ำกับวิชาใหม่ (ตัวอย่าง: ดาราศาสตร์)

1. Copy โฟลเดอร์ `content/` ไปยัง repo วิชาใหม่
2. แก้ `config.js`: เปลี่ยน `subject`, `subjectCode`, `title`, `apiUrl`
3. แก้ `plans.js`: เขียน 10 แผนของวิชาใหม่
4. แก้ `tools.js`: เก็บ tool ที่ใช้ซ้ำได้ (POE, Four-tier, TL, MJ) · เพิ่ม tool เฉพาะวิชา
5. แก้ `media.js`: ใส่สื่อของวิชาใหม่
6. แก้ `questions.js`: คลังข้อสอบของวิชาใหม่
7. ปล่อย `KP-Classroom.html` ไม่ต้องแตะ
