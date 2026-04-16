# Content — KP-Classroom (Multi-Course)

แต่ละวิชา = 1 โฟลเดอร์ภายใต้ `content/` · มี content pack ของตัวเอง
Engine (`KP-Classroom.html`) อ่าน `?course=<id>` จาก URL แล้วโหลด content pack ของวิชานั้น

## 📚 วิชาที่มีในระบบ

| Course ID | โฟลเดอร์ | วิชา | สถานะ | URL |
|-----------|---------|------|-------|-----|
| `physics3` | `content/physics3/` | ฟิสิกส์ 3 (ม.5) | 🟢 active | `/KP-Classroom.html?course=physics3` |
| `astronomy` | `content/astronomy/` | ดาราศาสตร์ | 🟡 scaffold | `/KP-Classroom.html?course=astronomy` |

## 📁 โครงสร้างไฟล์ต่อ course

```
content/{courseId}/
├── config.js       ← KP_CONFIG: school/teacher/year/apiUrl/teacherPass
├── plans.js        ← KP_PLANS (รายการแผนการสอน)
├── tools.js        ← KP_PLAN_TOOLS + KP_TOOL_DEFS
├── media.js        ← KP_PLAN_MEDIA (แท็บสื่อใน Teacher Dashboard)
└── questions.js    ← KP_FT_BANK (คลังข้อสอบ Four-tier)
```

## 🔄 วิธีเพิ่มวิชาใหม่

1. Copy โฟลเดอร์ `content/physics3/` เป็น `content/<new-course-id>/`
2. แก้ไฟล์ทั้งหมดให้ตรงวิชาใหม่:
   - `config.js`: courseId, title, subject, apiUrl, teacherPass
   - `plans.js`: รายการแผน/หน่วย
   - `tools.js`: tools ที่ใช้
   - `media.js`: สื่อรายแผน (path ต้องชี้ไปที่ `lessons/<new-course-id>/...`)
   - `questions.js`: ข้อสอบ
3. สร้างโฟลเดอร์ `lessons/<new-course-id>/` สำหรับเก็บไฟล์สื่อ
4. เพิ่ม course card ใน `index.html` → link ไปที่ `KP-Classroom.html?course=<new-course-id>`
5. (Optional) deploy Apps Script ใหม่สำหรับเก็บข้อมูลของวิชานี้ · ใส่ URL ใน `config.js`

## 📦 Google Sheets (ต้องแยกต่อวิชา)

| วิชา | Google Sheet | Apps Script |
|------|-------------|-------------|
| physics3 | `Physics3-ClassroomData-2569` | deployed · URL ใน `physics3/config.js` |
| astronomy | `Astronomy-ClassroomData-2569` | ⏳ ยังไม่ deploy |

## ⚠️ หลักการสำคัญ

1. **ห้ามใช้ ES module** — ใช้ `window.KP_*` globals เพื่อให้เปิดจาก `file://` ได้
2. **Order โหลดสำคัญ** — `config.js` ต้องโหลดก่อน (อื่นๆ อาจอ้างถึง)
3. **Paths ใน `media.js`** ต้องเป็น relative path จาก root repo (เช่น `lessons/physics3/waves/แผน01_.../`)
4. **Apps Script URL ต้องแยกต่อวิชา** — ไม่งั้นข้อมูลปนกัน
5. **แก้แล้ว refresh** — ไม่ต้อง rebuild · แค่ reload browser

## 🏫 Classes (ห้องเรียน) ภายในวิชา

- ไม่ต้อง config เพิ่ม · ใช้ field `class` ใน `_Students` sheet (เช่น `ม.5/1`, `ม.6/1`, `ม.6/2`)
- Teacher Dashboard มีตัวกรองตามห้องอยู่แล้ว
- Student login: เลือกห้องจาก dropdown
