---
name: SHM imported into KP-Classroom as physics3 sub-unit
description: SHM 6 แผน เข้าระบบเป็น sub-unit ของ physics3 · engine ตัวเดียว · iframe + def.file pattern
type: project
originSessionId: f9387e85-4a0d-4be7-8663-76705c4db741
---
หน่วย **SHM (6 แผน · 76 ไฟล์ HTML)** เข้าระบบ KP-Classroom เรียบร้อย (2026-04-27) เป็น **sub-unit ใต้ physics3** (ไม่ใช่คอร์สแยก)

**Why:** index.html ออกแบบให้ physics3 = 4 หน่วย (SHM·คลื่น·เสียง·แสง) อยู่แล้ว · ครูต้องการให้ดาต้านักเรียนแยก Sheet (SHM ↔ คลื่นกล) แต่ login ครั้งเดียว และไม่ก๊อป engine

**How to apply:**
- URL: `?course=physics3&unit=shm` (waves เดิมคือ `?course=physics3` ไม่มี unit)
- Content pack: `content/physics3/units/shm/{plans,tools,media,questions,worksheets}.js`
- Tool architecture (Hybrid): engine-native (tl/upload) · iframe ไฟล์ใน `lessons/physics3/SHM/` (`def.file`) · external sim KP Science (https URL ใน `def.file`)
- Sheet routing: `shm-plan{N}-{tool}` → `SHM_<Tool>_P{N}` ผ่าน `wsIdToSheet()` ที่ engine
- ต้อง deploy Apps Script + Sheet `Physics3-SHM-2569` แล้วใส่ URL แทน `'TODO_DEPLOY_SHM_BACKEND'` ใน `content/subjects.js`

**Session log ละเอียด:** `wave-mechanics-research/lessons/physics3/SHM/SESSION_LOG_2026-04-27_SHM_import.md` (15 design decisions · 7 engine edits · bug fix flow · verify checklist · local preview steps)

**Open items:** FT-01/FT-02 หลักของ SHM (รอไฟล์) · หน่วยเสียง/แสง (status:'coming-soon')
