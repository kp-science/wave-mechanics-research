---
description: แก้ template/questions ของ pattern
argument-hint: <pattern-name> [file]
---
# /pattern-edit

## งาน
- ถ้าระบุ `file` → เปิดไฟล์นั้นใน pattern ให้แก้
- ถ้าไม่ระบุ → ls ไฟล์ทั้งหมดใน pattern + ถามต้องการแก้อันไหน

## ไฟล์ที่แก้บ่อย
- `manifest.md` — frontmatter + คำอธิบาย
- `questions.json` — เพิ่ม/ลดคำถามที่ถามผู้ใช้
- `<any>-template.html` — skeleton ที่ /pattern-use ใช้

## Token budget
- ใช้ Edit · ไม่ rewrite
- ≤40 คำ
