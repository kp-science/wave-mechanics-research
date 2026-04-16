# Templates — Roster CSV

Templates สำหรับ upload roster นักเรียนเข้า Google Sheet ของแต่ละวิชา

## ไฟล์

| ไฟล์ | ใช้กับ |
|------|--------|
| `roster-physics3-template.csv` | ฟิสิกส์ 3 · 1 ห้อง (ม.5/1) |
| `roster-astronomy-template.csv` | ดาราศาสตร์ · 3 ห้อง (ม.5/2, ม.5/3, ม.5/4) |

## Schema ของ CSV

| Column | Required | คำอธิบาย | ตัวอย่าง |
|--------|---------|---------|---------|
| `student_id` | ✅ | รหัสนักเรียน (ต้องไม่ซ้ำ) | `51001` หรือ `06423` |
| `full_name` | ✅ | ชื่อ-สกุลภาษาไทย | `เด็กหญิงสมใจ ใจดี` |
| `class` | ✅ | ชั้น/ห้อง | `ม.5/1`, `ม.5/2`, `ม.5/3` |
| `number` | ✅ | เลขที่ในห้อง | `1`, `2`, `3` ... |
| `pin4` | ✅ | รหัส 4 หลัก (นักเรียนใช้ login) | `1234` |

## ข้อแนะนำตั้ง PIN
- ใช้ **4 หลัก** เท่านั้น
- แนะนำ: เลขง่ายๆ ที่เด็กจำได้ เช่น เลขที่ + เลขห้อง (เช่น ห้อง 1 เลขที่ 5 → `0105`)
- หลีกเลี่ยง: วันเกิด / เลข ID จริง (เป็นข้อมูลส่วนตัว)
- หลังเทอมแรกครูสามารถให้นักเรียนเปลี่ยน PIN ได้ (แก้ใน `_Students` sheet ตรงๆ)

## วิธี Upload

1. **เตรียม CSV**
   - เปิด template ใน Excel/Numbers/Google Sheets
   - แก้ข้อมูลตัวอย่างเป็นรายชื่อจริง
   - Save As → CSV (UTF-8) — ❗ต้อง UTF-8 ไม่งั้นภาษาไทยเพี้ยน
2. **เข้า Teacher Dashboard**
   - เปิด `https://kp-science.github.io/wave-mechanics-research/KP-Classroom.html?course=physics3`
   - คลิก 🔐 เข้าระบบครู → ใส่รหัส
3. **Upload CSV**
   - ไปแท็บ "👥 นักเรียน" → กด "Upload CSV"
   - เลือกไฟล์ → ระบบจะ preview → ยืนยัน
   - ข้อมูลจะลงใน sheet `_Students`

## ⚠️ Security Note
- **ห้าม push ไฟล์ roster จริงขึ้น GitHub** (มีข้อมูลนักเรียน)
- Template นี้มีแต่ข้อมูลตัวอย่าง · ไฟล์จริงเก็บในเครื่อง/Drive ส่วนตัว
- ถ้าเผลอ push ไฟล์จริง → รีบลบ + rotate PIN ทั้งหมด

## ขั้นตอนต่อเนื่อง (Teacher Checklist)

### ฟิสิกส์ 3 (มี Apps Script + Sheet แล้ว)
- [ ] แก้ `roster-physics3-template.csv` เป็นรายชื่อจริง ม.5/1
- [ ] Save As CSV UTF-8
- [ ] Upload เข้า Teacher Dashboard `?course=physics3`

### ดาราศาสตร์ (ยังไม่ setup)
- [ ] สร้าง Google Sheet ใหม่: `Astronomy-Classroom-2569`
- [ ] Deploy Apps Script (copy จาก `_private/AppsScript_Code.gs`)
- [ ] Copy Web App URL → ใส่ใน `content/astronomy/config.js` → field `apiUrl`
- [ ] เปลี่ยน `status: 'coming-soon'` → `status: 'open'` ใน `content/astronomy/config.js`
- [ ] ตรวจ `classes` ใน config ว่าตรงกับห้องจริง
- [ ] แก้ `roster-astronomy-template.csv` เป็นรายชื่อจริง 3 ห้อง
- [ ] Save As CSV UTF-8
- [ ] Upload เข้า Teacher Dashboard `?course=astronomy`
- [ ] Commit + push `content/astronomy/config.js` (ที่แก้ apiUrl + status)
