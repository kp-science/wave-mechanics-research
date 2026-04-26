---
description: เปรียบเทียบ pattern 2 อัน
argument-hint: <pattern-a> <pattern-b>
---
# /pattern-diff

## งาน
1. ls ทั้งสอง pattern folder
2. File-level diff: ไฟล์ที่มีเฉพาะ A / เฉพาะ B / มีทั้งคู่
3. ถ้ามีทั้งคู่ · แสดง size diff เตือนว่าต่างกันกี่ %
4. ไม่แสดง content diff (ยาว) · ถ้าผู้ใช้ต้องการดูค่อย Read เอง

## Output
```
🔍 astronomy-game vs bio-exploration
Only in astronomy-game:
  - (none)
Only in bio-exploration:
  + organelle-map-template.html
Modified (size diff):
  ± page-template.html (+12% larger)
  ± questions.json (-2 questions)
```

## Token budget
- ≤80 คำ · ไม่อ่านเนื้อไฟล์
