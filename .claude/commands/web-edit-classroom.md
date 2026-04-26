---
description: แก้ KP-Classroom.html เฉพาะ render function
argument-hint: <render-fn-name> | --line=<start>-<end>
---
# /web-edit-classroom

## งาน
แก้ `KP-Classroom.html` เปิดเฉพาะฟังก์ชันที่ระบุ:
- Render functions อยู่ช่วงบรรทัด 1285+ (อ้างอิง settings permissions)
- ใช้ `awk` หา `function <name>` boundary ก่อน · Read ช่วงนั้น

## Token budget
- ห้าม Read ทั้งไฟล์ (ใหญ่มาก)
- ≤50 คำ
