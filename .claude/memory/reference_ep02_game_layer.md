---
name: EP02 Game Layer modules
description: COSMOS LOG EP02 ใช้ shared/{game,items,corruption,leaderboard,boss,teacher-cards}.js + ep02/config.js · API และ state model
type: reference
originSessionId: 03b1f5cc-b38a-41eb-9355-f008e8778b1f
---
# EP02 Game Layer · Sprint 1 (2026-04-22)

## โมดูลใหม่ที่สร้างไว้ · lessons/astronomy/shared/

- **game.js** → `Game` (Energy/Streak/Bet/award/penalty/recordRetry/recordDecision/mountBetPanel) + `Obj` (objective K/P/A tracking: hit/miss/report)
- **items.js** → `Items` (grant/use/has/isUsed/renderHUD/mountPicker/toast) · อ่าน EP_CONFIG.items
- **corruption.js** → `Corruption` (add/set/tickOnPage/safeHaven/render) · body class: corrupt-low/high/critical/corruption-safe
- **leaderboard.js** → `Leaderboard` (ensureTeam/syncActive/adjust/switchActive/toggle) · localStorage key `cosmosLog_leaderboard` (แยกจาก cosmosLog_state)
- **boss.js** → `Boss` (init/damage/playerHit/resolveClaim/render) · render เข้า `#boss-hud`
- **teacher-cards.js** → `Teacher` (toggle/play) · 6 การ์ด spark/twist/insight/mercy/rival/silent

## State ที่เพิ่มใน Book.state (backward compat · EP01 ignore ได้)

`ep · streak · corruption · bet · betHistory · decisions · retries · itemsUsed · objectives · boss`

## HUD slots ใหม่ใน shared/book.js

hidden by default: `#hud-streak · #hud-corruption · #hud-inventory · #hud-leaderboard-btn · #hud-teacher-btn` · โมดูลเปิดตัวเอง

## Load order ที่ถูกต้องใน HTML EP02

```html
<script src="../shared/book.js"></script>
<script src="./config.js"></script>     <!-- sets window.EP_CONFIG -->
<script src="../shared/game.js"></script>
<script src="../shared/items.js"></script>
<script src="../shared/corruption.js"></script>
<script src="../shared/leaderboard.js"></script>
<script src="../shared/boss.js"></script>  <!-- เฉพาะ p14 -->
<script src="../shared/teacher-cards.js"></script>
```

## ep02/config.js · single source of truth

`pages · objectives(K1-4,P1-4,A1-4) · items(hubbleLens,decoder,warpFuel,shield) · boss(300hp/3phase) · corruption(perPage:5,safeHavens:[p10,p18,p19]) · bloomP17 · balance`

## Sprint ถัดไป

~~2 · UI polish~~ · ~~3 · scaffold 19 หน้า EP02~~ · **4 · เติมเนื้อหาจริง/ภาพจริง · 5 · Boss polish · 6 · Teacher URL แยก · 7 · EP01 upgrade**

## Scaffolded Pages (2026-04-22 · Sprint 3)

EP02 ครบ 19 หน้า · ทำงาน end-to-end:
p01-entry · p02-continue · p03-signal · p04-classify · p05-council · p06-milkyway · p07-home · p08-arrive · p09-tuning · p10-hubble (🌟 safe haven) · p11-rotation · p12-boltwarp · p13-chase (🔥 timer 3 นาที) · p14-boss (👁️ 3 phase) · p15-warp (cliffhanger SOS) · p16-recap · p17-bloom · p18-log (cross-EP letter) · p19-map (post-test + export JSON)

## Image/Video wishlist (ยังเป็น placeholder)

IMG-P03 (VOID radar) · IMG-P06 (MW infrared) · IMG-P07 (Sun Orion arm) · IMG-P08 (หอดูดาว) · IMG-P12 (Bolt warp drive) · IMG-P14abc (VOID 3 phases) · CLIP-P11 (rotation curve) · CLIP-P13 (chase) · CLIP-P15 (warp starfield)

## Known issues to address in Sprint 4

- Corruption auto-tick ใน p01-p05 อาจเพิ่มเร็วเกินไป (config perPage=5 ×19 ≈ 95%) · safe haven p10/p18/p19
- Captain's Log p18 เก็บ `cosmosLog_captainLog_ep02` แยก key · EP03 P01 ต้องอ่าน key นี้
- P14 Boss reset ทุกครั้งเข้าหน้า (เพื่อสู้ใหม่) · ถ้าต้อง persist ระหว่าง retry ต้องเปลี่ยน
- P13 failChase ยัง completePage ให้ผ่านไปได้ (ป้องกันค้าง) · อาจต้องเพิ่ม retry UI
