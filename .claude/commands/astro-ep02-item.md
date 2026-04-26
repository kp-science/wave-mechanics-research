---
description: เพิ่ม item ในเกม EP02
argument-hint: <item-name> [--type=heal|damage|buff|key]
---
# /astro-ep02-item — เพิ่ม item

## งาน
แก้ `lessons/astronomy/shared/items.js` เพิ่ม entry:
```js
{
  id: '<item-id>',
  name: '<name>',
  type: 'heal|damage|buff|key',
  effect: {...},
  sprite: 'assets/items/<id>.png'
}
```

## Reference
- API spec: memory `reference_ep02_game_layer`
- Load order: `shared/{game,items,corruption,leaderboard,boss,teacher-cards}.js`

## Token budget
- อ่าน `shared/items.js` บรรทัดที่เพิ่ม + 5 บรรทัดรอบ
- ใช้ Edit · ไม่ rewrite
- ≤50 คำ
