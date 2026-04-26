---
description: สร้างหน้าดาราศาสตร์ใหม่ครบวงจร (page + register + deploy)
argument-hint: <ep01|ep02> <pageN> "<ชื่อหน้า>" [--no-confirm]
---
# /astro-full — Macro: สร้างหน้าดาราศาสตร์ครบวงจร

## งาน
1. `/astro-page-new <ep> <N> "<ชื่อ>"` - สร้างไฟล์ pNN-slug.html
2. Register ใน `content/astronomy/` (ถ้ามี schema)
3. Update `lessons/astronomy/<ep>/index.html` เพิ่มลิงก์หน้าใหม่
4. Verify: ไฟล์มีจริง + bracket balance
5. Commit + push (ถ้าไม่ `--dry-run`)

## Design reference
- COSMOS LOG: memory `feedback_cosmos_log_design`
- EP02 game layer: memory `reference_ep02_game_layer`
- Path: memory `project_astronomy_lesson_path`

## Token budget
- อ่าน reference page ใกล้เคียง 1 ไฟล์ (เช่น pN-1)
- ≤100 คำรายงาน
