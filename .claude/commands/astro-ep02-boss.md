---
description: เพิ่ม/แก้ boss ในเกม EP02
argument-hint: <boss-name> [--action=add|edit] [--hp=<N>] [--phase=<N>]
---
# /astro-ep02-boss — เพิ่ม/แก้ boss

## งาน
แก้ `lessons/astronomy/shared/boss.js`:
- `--action=add`: เพิ่ม boss entry
- `--action=edit`: แก้ HP/phase/attack pattern ของ boss เดิม

## Reference
- API spec: memory `reference_ep02_game_layer`
- State model ใน memory

## Token budget
- อ่าน boss.js เฉพาะ section ที่แก้
- Edit ตรงจุด · ≤60 คำ
