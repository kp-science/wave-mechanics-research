---
description: คัดลอก pattern เดิมเป็น pattern ใหม่ (เพื่อแก้)
argument-hint: <base-pattern> <new-pattern-name>
---
# /pattern-fork

## งาน
1. ตรวจ `.claude/patterns/<base-pattern>/` มีจริง
2. ตรวจ `<new-pattern-name>` ยังไม่มี
3. Copy โฟลเดอร์ทั้งหมด → `.claude/patterns/<new-pattern-name>/`
4. แก้ manifest.md frontmatter:
   - `name: <new-pattern-name>`
   - `base: <base-pattern>` (ชี้ต้นตอ)
   - `display: "<ปรับ>"` (ให้ผู้ใช้แก้)
5. แจ้งผู้ใช้ว่าต่อไปใช้ `/pattern-edit <new-pattern-name>` เพื่อปรับ

## Token budget
- cp -r · แก้ frontmatter 3 field · ≤40 คำ
