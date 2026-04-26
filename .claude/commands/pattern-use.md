---
description: สร้างวิชาใหม่จาก pattern (batch Q&A)
argument-hint: <pattern-name> <subject-id>
---
# /pattern-use — สร้างวิชาใหม่จาก pattern

## งาน

### Phase 1: แสดงคำถาม
1. อ่าน `.claude/patterns/<pattern-name>/questions.json`
2. แสดงคำถามทั้งหมดเป็น list + example + default
3. **บอกผู้ใช้ให้ตอบทั้งหมดในข้อความเดียว** (YAML/JSON/plain text)
4. **หยุดรอคำตอบ** · ไม่ทำอะไรต่อ

### Phase 2: สร้างวิชา (เมื่อผู้ใช้ส่งคำตอบ)
1. Parse คำตอบ
2. อ่าน `manifest.md` หา `template_sources`
3. สร้างโครงสร้างตาม manifest:
   - โฟลเดอร์ lessons/<subject_id>/
   - Copy/adapt template files ตาม template_sources
   - Register ใน content/subjects.js
4. แทนที่ placeholder ใน template:
   - `{{SERIES_NAME}}`, `{{WORLD}}`, `{{PROTAGONIST}}`, `{{THEME_COLOR}}`, ฯลฯ
5. **สร้าง STATE.md อัตโนมัติ (สำคัญ):**
   - `lessons/<subject_id>/STATE.md` จาก `.claude/patterns/_templates/STATE.md`
   - `_private/state/<subject_id>_notes.md` จาก `STATE_private.md`
   - แทน placeholder ด้วยคำตอบผู้ใช้
6. สรุปไฟล์ที่สร้าง + คำสั่งถัดไปที่ควรใช้
7. แนะนำ `/state-save` หลังงาน และ `/catchup <subject>` ตอนเริ่ม chat ใหม่

## เงื่อนไขหยุด
- ถ้า pattern ไม่มี → แสดง `/pattern-list`
- ถ้า subject_id มีอยู่แล้ว → หยุดเตือน ไม่เขียนทับ
- Phase 1 ถ้าคำตอบไม่ครบ required → ถามเฉพาะข้อที่ขาด

## Token budget
- Phase 1: อ่าน questions.json เท่านั้น (~1k tokens)
- Phase 2: อ่าน manifest + template เฉพาะที่ต้อง copy
- รายงาน ≤150 คำ

## ตัวอย่าง
```
/pattern-use astronomy-game bio

[ผม] แสดงคำถาม 14 ข้อ จาก astronomy-game
     รอคำตอบ YAML ในข้อความเดียว

[ผู้ใช้ตอบ YAML]

[ผม] ✓ สร้าง lessons/bio/ + content/bio/
     ✓ cell-log-series-bible.html
     ✓ Copy shared/{game,items,boss,...}.js (7 ไฟล์)
     ✓ Register subjects.js
     → ต่อด้วย /game-page-new bio ep01 1 "<ชื่อ>"
```
