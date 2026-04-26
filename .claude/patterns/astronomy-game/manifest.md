---
name: astronomy-game
display: "Astronomy Game (COSMOS LOG)"
base: null
description: "เกมสำรวจ · Book-page flow · Experience Before Labeling · EP01 narrative + EP02 game layer (item/boss/corruption)"
type: game
references:
  - memory: feedback_cosmos_log_design
  - memory: reference_ep02_game_layer
  - memory: project_astronomy_lesson_path
template_sources:
  bible: lessons/astronomy/cosmos-log-series-bible.html
  page: lessons/astronomy/ep01/p08-arrive.html
  shared: lessons/astronomy/shared/
  game_engine: lessons/astronomy/shared/game.js
  items: lessons/astronomy/shared/items.js
  boss: lessons/astronomy/shared/boss.js
  corruption: lessons/astronomy/shared/corruption.js
  leaderboard: lessons/astronomy/shared/leaderboard.js
  teacher_cards: lessons/astronomy/shared/teacher-cards.js
---

# Pattern: Astronomy Game (COSMOS LOG)

## โครงสร้างที่ pattern นี้สร้าง
```
lessons/<subject>/
├── <series-slug>-series-bible.html
├── ep01/
│   ├── index.html
│   └── pNN-<slug>.html ...
├── ep02/
│   └── index.html
└── shared/
    ├── game.js        ← copy จาก astronomy
    ├── items.js       ← copy + ปรับเนื้อหา
    ├── boss.js
    ├── corruption.js
    ├── leaderboard.js
    └── teacher-cards.js

content/<subject>/
├── ep01.js
└── ep02.js
```

## หลักการออกแบบ
- Book-page flow (1 หน้า = 1 concept)
- Experience Before Labeling (ทดลอง/สังเกตก่อนตั้งชื่อ)
- ไม่มี info dump
- Before → Activity → After
- Teacher Cue ทุกหน้า (sidebar หรือ lower)
- EP01 = narrative + concept building
- EP02 = game layer (item/corruption/boss)

## ไฟล์ที่สร้างอัตโนมัติตอน /pattern-use
1. `lessons/<subject>/` folder tree
2. `<series-slug>-series-bible.html` (หน้าภาพรวม story/world)
3. `ep01/index.html` (menu หน้า)
4. `shared/*.js` (copy จาก astronomy · rename variables ตาม subject)
5. Entry ใน `content/subjects.js`
6. Empty `content/<subject>/ep01.js`, `ep02.js`

## หลังจาก /pattern-use แล้วใช้คำสั่งต่อ
- `/game-page-new <subject> <ep> <N> "<ชื่อ>"` — สร้างหน้า
- `/game-item <subject> <name>` — เพิ่ม item
- `/game-boss <subject> <name>` — เพิ่ม boss
