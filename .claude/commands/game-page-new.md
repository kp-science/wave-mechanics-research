---
description: สร้างหน้าเกมสำหรับวิชาใดก็ได้ที่ใช้ pattern astronomy-game
argument-hint: <subject> <ep> <N> "<ชื่อหน้า>" [--style=<pattern>]
---
# /game-page-new — สร้างหน้าเกม (generic)

## งาน
สร้าง `lessons/<subject>/<ep>/pNN-<slug>.html`:
- ใช้ template จาก pattern ของวิชา (อ่าน `content/subjects.js` หา pattern ที่ใช้)
- Book-page flow + Teacher Cue + Experience Before Labeling
- แทน placeholder: series name, theme color ตามวิชา

## Reference
- Pattern source: อ่าน `.claude/patterns/astronomy-game/manifest.md` → `template_sources.page`
- Design: memory `feedback_cosmos_log_design`

## ความสัมพันธ์กับ /astro-page-new
- `/astro-page-new` = shortcut เฉพาะวิชา astronomy (hardcoded path)
- `/game-page-new` = generic · ทำงานกับวิชาใดก็ได้ที่ scaffold จาก astronomy-game pattern

## Token budget
- อ่าน template 1 ไฟล์ + reference page ในวิชา 1 ไฟล์
- ≤80 คำ
