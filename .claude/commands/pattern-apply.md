---
description: Apply pattern จาก memory ไปยังไฟล์เป้าหมาย
argument-hint: <pattern-memory-name> <target-file>
---
# /pattern-apply

## งาน
1. อ่าน memory ที่ชี้ pattern
2. อ่านไฟล์เป้าหมาย
3. Edit ไฟล์เป้าหมายตาม pattern spec
4. แสดง diff สรุป

## Token budget
- Memory + target file เท่านั้น
- ใช้ Edit ตรงจุด · ไม่ rewrite
- ≤100 คำ
