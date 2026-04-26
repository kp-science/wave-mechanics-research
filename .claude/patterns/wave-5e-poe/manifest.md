---
name: wave-5e-poe
display: "Wave/Physics 5E + POE"
base: null
description: "แผนฟิสิกส์ 10-แผน style · 5E + POE + Four-tier · Infographic theme ต่อแผน"
type: lesson-plan
references:
  - memory: reference_plan_pipeline_checklist
  - memory: reference_worksheet_core
  - memory: feedback_interactive_drawing_pattern
template_sources:
  infographic: lessons/physics3/waves/แผน05_การสะท้อนของคลื่น/แผน5_Infographic.html
  poe: lessons/physics3/waves/แผน05_การสะท้อนของคลื่น/สื่อ02_POE-05_ใบบันทึกPOE.html
  calc: lessons/physics3/waves/แผน05_การสะท้อนของคลื่น/สื่อ03_Calc_ใบกิจกรรม5.1.html
  spot: lessons/physics3/waves/แผน05_การสะท้อนของคลื่น/สื่อ04_Spot_ใบกิจกรรม5.2.html
  fourtier: lessons/physics3/waves/แผน05_การสะท้อนของคลื่น/สื่อ05_F5_Fourtier_PrePost.html
  content_pack:
    - content/physics3/tools.js
    - content/physics3/worksheets.js
    - content/physics3/questions.js
    - content/physics3/media.js
  worksheet_core: lessons/shared/worksheet-core.js
---

# Pattern: Wave 5E + POE

## โครงสร้างที่ pattern นี้สร้าง
```
lessons/<subject>/<topic>/แผนNN_<slug>/
├── แผนN_Infographic.html
├── สื่อ02_POE-NN_ใบบันทึกPOE.html
├── สื่อ03_Calc_ใบกิจกรรม_N.1.html
├── สื่อ04_Spot_ใบกิจกรรม_N.2.html
└── สื่อ05_F_N_Fourtier_PrePost.html

content/<subject>/
├── plans.js
├── tools.js
├── worksheets.js
├── questions.js
└── media.js
```

## หลักการออกแบบ
- 5E + POE flow (9 ขั้น)
- K/P/A objectives
- Misconceptions M_N.1-3 target
- Real form controls (ไม่ใช่ ☐)
- Canvas ≥180px
- Identity inputs + worksheet-core.js
- viewFile embed (single source of truth)
- Theme color ต่อแผน

## ใช้ `/pattern-use` สำหรับเปิดวิชาใหม่ที่ใช้ pattern นี้
เช่น ฟิสิกส์ ม.6 · เคมี · ฯลฯ · ที่ต้องการ structure 5E+POE เหมือน wave

## หลังจากเปิดวิชาแล้วใช้คำสั่ง
- `/phys-full` (ถ้าเป็น physics3 เดิม)
- `/phys-plan-new`, `/phys-media-add`, `/phys-check` (micro)
- `/web-reg-*` สำหรับเข้าเว็บ
