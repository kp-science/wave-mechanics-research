---
description: สร้างแผนฟิสิกส์ใหม่ (skeleton เท่านั้น - โฟลเดอร์ + Infographic)
argument-hint: <waves|SHM> <N> "<หัวข้อ>"
---
# /phys-plan-new — สร้าง skeleton แผนใหม่

## งาน (micro - ทำขั้นเดียว)
1. `mkdir lessons/physics3/<subject>/แผนNN_<slug>/`
2. สร้าง `แผนN_Infographic.html` theme color ตามลำดับ plan
3. **ไม่สร้างสื่อ** · รอคำสั่ง `/phys-media-add` ต่อไป

## Reference
- Template: `lessons/physics3/<subject>/แผน05*/แผน5_Infographic.html`
- Pipeline: memory `reference_plan_pipeline_checklist` Step 1-2

## Token budget
- อ่านแค่ template Infographic 1 ไฟล์
- รายงาน ≤50 คำ
