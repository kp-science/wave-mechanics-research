---
description: Register บทเรียนเข้าเว็บครบ + verify + deploy (macro)
argument-hint: <subject> <N> --msg "<commit message>" [--no-confirm]
---
# /web-full — Macro: เข้าเว็บครบวงจร

## งาน (Step 6-7 ของ pipeline)
1. `/web-reg-worksheet <subject> <N>` - เพิ่มใน worksheets.js
2. `/web-reg-media <subject> <N>` - เพิ่มใน media.js
3. `/web-reg-question <subject> <N>` - เพิ่มใน questions.js
4. (physics3 เท่านั้น) ตรวจ tools.js array ครบ
5. `/web-verify <subject> <N>` - bracket balance + file exists
6. `/web-deploy "<msg>"` - commit + push

## เงื่อนไขหยุด
- Verify fail → หยุด ไม่ push
- git push fail → หยุด ไม่ retry

## Token budget
- Edit ทีละไฟล์ ไม่ rewrite
- ≤150 คำรายงาน
