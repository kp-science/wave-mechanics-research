---
description: Extract ปรับแต่งจากวิชาเดิม บันทึกเป็น pattern ใหม่
argument-hint: <subject-id> --name=<new-pattern> --base=<base-pattern>
---
# /pattern-save

## งาน
1. เปรียบเทียบไฟล์ในวิชา <subject-id> กับ template_sources ของ base pattern
2. ระบุไฟล์/field ที่แตกต่าง (ของใหม่ หรือแก้จาก base)
3. สร้าง `.claude/patterns/<new-pattern>/`:
   - `manifest.md` มี `base: <base-pattern>` และ `template_sources` ชี้ไฟล์ใหม่
   - Copy เฉพาะไฟล์ที่ต่างจาก base เข้าไป (overrides)
4. Copy `questions.json` จาก base · ให้ผู้ใช้แก้ด้วย `/pattern-edit` ต่อ
5. รายงาน diff summary

## Output
```
✓ Pattern saved: <new-pattern>
  extends: <base-pattern>
  Overrides:
    + <file-1> (ใหม่)
    ± <file-2> (แก้จาก base)
  → /pattern-edit <new-pattern> เพื่อปรับ questions.json
```

## Token budget
- Diff เป็น file-level · ไม่ diff เนื้อ
- ≤100 คำ
