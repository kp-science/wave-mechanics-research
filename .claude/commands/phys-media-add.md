---
description: เพิ่มสื่อ 1 ชิ้นในแผนฟิสิกส์ (POE/Calc/Spot/F)
argument-hint: <waves|SHM> <N> <POE|Calc|Spot|F> [--style=<pattern>]
---
# /phys-media-add — เพิ่มสื่อ 1 ชิ้น

## งาน (micro)
สร้างไฟล์ 1 ไฟล์ตามชนิด:
- `POE` → `สื่อ02_POE-NN_ใบบันทึกPOE.html`
- `Calc` → `สื่อ03_Calc_ใบกิจกรรม_N.1.html`
- `Spot` → `สื่อ04_Spot_ใบกิจกรรม_N.2.html`
- `F` → `สื่อ05_F_N_Fourtier_PrePost.html`

## Required spec (จาก memory `reference_plan_pipeline_checklist`)
- Real form controls (ไม่ใช่ ☐)
- Identity inputs: `s-name`, `s-num`, `s-room`, `s-grp`
- `<body data-ws-id="planN-<type>">`
- `<script src="../../../shared/worksheet-core.js"></script>`
- Canvas ≥180px ถ้ามี

## Style patterns
- `default` — pipeline checklist
- `journal-321` — memory `feedback_journal_pattern` (ถ้ามี)
- `cosmos-book` — memory `feedback_cosmos_log_design`

## Token budget
- อ่าน template 1 ไฟล์ + memory pattern
- ไม่อ่าน plan อื่น ๆ
