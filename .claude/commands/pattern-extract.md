---
description: วิเคราะห์ pattern จากไฟล์ แล้วบันทึกเป็น memory
argument-hint: <file-path> [--name=<memory-name>]
---
# /pattern-extract

## งาน
1. อ่านไฟล์ที่ระบุ
2. สรุป pattern เด่น (design/structure/UX) 5-10 bullet
3. เสนอบันทึกเป็น memory (feedback หรือ reference)
4. ถ้าอนุมัติ → Write memory file + update MEMORY.md

## Output format
```
Pattern: <ชื่อ>
From: <file>
Key features:
- ...
Suggested memory type: feedback|reference
Suggested filename: <slug>.md
```

## Token budget
- อ่าน 1 ไฟล์ เท่านั้น
- ≤200 คำ
