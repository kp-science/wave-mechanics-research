---
description: อัปเดต STATE.md หลังจบ session
argument-hint: <subject-id> "<สิ่งที่ทำ/ตัดสินใจ>" [--private]
---
# /state-save — บันทึกความคืบหน้า

## งาน
1. อ่าน `lessons/<subject>/STATE.md` current
2. วิเคราะห์จาก argument:
   - "ทำ p14 เสร็จ" → ย้าย p14 จาก In progress → Done
   - "ปรับ boss HP 300→400" → เพิ่ม Decisions log
   - "เริ่ม p15" → เพิ่ม In progress
3. Edit STATE.md เฉพาะส่วนที่เปลี่ยน (ไม่ rewrite ทั้งไฟล์)
4. อัปเดต timestamp "Last updated"
5. Append decisions log ด้วย date ปัจจุบัน

## Flag --private
- ถ้า `--private` → เขียนใน `_private/state/<subject>_notes.md` แทน
- เหมาะกับความเห็น/นักเรียน/ไอเดียส่วนตัว

## Token budget
- Edit ส่วนที่เปลี่ยนเท่านั้น · ≤60 คำรายงาน

## ตัวอย่าง
```
/state-save astronomy "เสร็จ p14 · เพิ่ม corruption mechanic · ปรับสี Void ให้เข้มขึ้น"
/state-save astronomy "ข้อสังเกต: นักเรียนงงกับ corruption icon" --private
```
