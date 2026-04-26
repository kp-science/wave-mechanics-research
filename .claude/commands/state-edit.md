---
description: แก้ STATE.md โดยตรง (story/rules/decisions)
argument-hint: <subject-id> [--private]
---
# /state-edit

## งาน
เปิดไฟล์ STATE.md ให้ผู้ใช้บอกว่าจะแก้อะไร:
- ถ้าเป็น story update ใหญ่ → แก้ Story state section
- ถ้าเป็น rule ใหม่ → เพิ่มใน Story rules
- ถ้าเป็น decision → append Decisions log
- ถ้าเป็น question ใหม่ → เพิ่ม Open questions

## Flag --private
- แก้ไฟล์ใน `_private/state/` แทน

## Token budget
- Edit ตรงจุด · ≤40 คำ
