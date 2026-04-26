---
description: แสดง STATE.md ของวิชา (ไม่ทำอะไรอื่น)
argument-hint: <subject-id> [--private] [--full]
---
# /state-view

## งาน
- Default: แสดง STATE.md สรุปเฉพาะ section สำคัญ (Current focus, In progress, Next, ล่าสุด 3 decisions)
- `--full`: แสดงทั้งไฟล์
- `--private`: แสดง private notes แทน

## Token budget
- อ่านไฟล์ · echo กลับ · ไม่ต้องวิเคราะห์
- ≤120 คำ default · ทั้งไฟล์ถ้า --full
