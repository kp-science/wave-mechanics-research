---
description: ลงทะเบียนวิชาใหม่ใน content/subjects.js
argument-hint: <subject-id>
---
# /web-reg-subject

## งาน
1. อ่าน `content/subjects.js` (short file)
2. ตรวจ `subject-id` ยังไม่มี
3. เพิ่ม entry ตาม schema ของไฟล์:
   - id, display, pattern, color, entryPath, enabled
4. Update `index.html` / `KP-Classroom.html` ถ้าต้องเพิ่ม link (ใช้ /web-edit-* แยก)

## Token budget
- อ่าน subjects.js เต็ม (ไฟล์สั้น) · Edit เพิ่ม · ≤50 คำ
