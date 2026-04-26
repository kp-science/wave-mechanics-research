---
name: Teacher Dashboard multi-unit
description: KP-Classroom Teacher Dashboard เป็นระดับวิชา · มี unit selector + multi-unit aggregate overview · ใช้กับทุก subject ที่มี >1 topics
type: reference
originSessionId: c1462620-023d-4e1c-a077-5d29f83c5a18
---
KP-Classroom.html มี Teacher Dashboard ที่ทำงานระดับ **วิชา** (subject) ไม่ใช่หน่วย (topic).

## โครงสร้าง routing
- ต่อ subject มี `KP_CONFIG.apiUrl` (ชีทหลัก เช่น คลื่นกล)
- ต่อ topic อาจมี `dbUrl` แยก (เช่น SHM = Physics3-SHM-2569)
- `DB._get` route reads:
  - `_UNIT_SCOPED_READS = {info, list, stats, planStats}` → topic.dbUrl ถ้า valid · ไม่งั้น API_URL
  - reads อื่น (students/settings/feedback/courseStatus) → API_URL เสมอ (shared roster)

## UI components สำหรับ multi-unit (พบใน `renderTeacherShell` + `loadTeacherDashboard`)
1. **Unit Selector dropdown** ใน courseToggleBar — option value=`topic.id` · onChange เรียก `switchUnit(topicId)` ที่ reload URL ด้วย `?unit=topic.unit` (หรือลบออกถ้า topic ไม่มี unit). ใช้สลับ tabs ที่ผูกหน่วย (จัดการแผน/หน้าจอสอน/สื่อ/CER/ดูหน้านักเรียน)
2. **Multi-unit Overview tab** — loop ทุก topic status='open' ของวิชา · แต่ละกลุ่มเป็น section header สีเข้ม + tools-grid · ยิงแต่ละ backend ขนานกันด้วย `_fetchSheetInfo()`/`_fetchSheetData()` (raw fetch ไม่ผ่าน DB._get เพราะต้องระบุ endpoint ตรง · DB._get ผูก state.topic)
3. **`syncStateFromUrl()` ใน init** — derive state.subject/topic/unit จาก URL ก่อน routing (กันบักครูเปิดแท็บใหม่ที่ `?unit=X` ตรงๆ → state ว่าง → DB.* fallback API_URL = อ่านผิดหน่วย)

## ขยายไปวิชาอื่น
- เพิ่ม topic ใน `content/subjects.js` พร้อม `unit:'<X>'` + `dbUrl:'<URL>'` (หรือ null ถ้าใช้ API_URL หลัก)
- ทำตาม [_private/SETUP_SHM_Backend.md](../wave-mechanics-research/_private/SETUP_SHM_Backend.md) deploy backend
- Dashboard auto-render dropdown + group เพิ่มเอง · ไม่ต้องแก้ engine
