---
description: โหลด state + สรุปสถานะล่าสุดของวิชา (ใช้ตอนเริ่ม chat ใหม่)
argument-hint: <subject-id>
---
# /catchup — โหลด briefing ก่อนเริ่มงาน

> หมายเหตุ: เดิมใช้ชื่อ `/resume` แต่ชนกับ built-in ของ Claude Code · เปลี่ยนเป็น `/catchup`

## งาน
1. อ่าน `lessons/<subject>/STATE.md` (public state)
2. อ่าน `_private/state/<subject>_notes.md` ถ้ามี (private notes)
3. `git log --oneline -5 -- lessons/<subject>/` commits ล่าสุดของวิชานี้
4. สรุปให้ผู้ใช้:
   - Current focus
   - Done / In progress / Next
   - Story rules ล่าสุด (⚠️ override bible)
   - Decisions ล่าสุด 3 รายการ
   - Open questions
   - คำสั่งที่แนะนำต่อ

## Output format
```
📊 <subject> — <phase>
✅ Done: <summary>
🚧 Next: <task>
⚠️ Story ล่าสุด: <key updates>
🔑 Decisions ล่าสุด: <3 items>
❓ Open: <questions>
→ แนะนำ: /<next-command>
```

## เงื่อนไขหยุด
- ถ้า STATE.md ไม่มี → แนะนำให้สร้างด้วย `/pattern-use` หรือ manual

## Token budget
- อ่าน 2 ไฟล์ (public + private) · ไม่อ่าน bible/pages
- ≤200 คำสรุป
