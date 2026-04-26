---
name: EP03 Game Patterns
description: Patterns specific to COSMOS LOG EP03 · Chain state, Gate (teacher-controlled next), Submit helper, Coin/Shop system, WARP RUN boss-like climax · extends EP02 patterns with 2-button flow
type: reference
originSessionId: f5eeefa9-02d1-4a0d-bf5c-6ce6f765f1ee
---
# COSMOS LOG EP03 · Game Patterns

## Modules (shared/)
- **`ep03-boot.js`** · contains Boot + Chain + Gate + Submit
- **`photon.js`** · extended with Coin + ShopItems modules
- **`sync-client.js`** · auto-creates 'SOLO' room in boot so Photon/meter works offline
- **`pace-client.js`** (EP02 shared) · used for teacher gate

## Chain Pattern (replaces isolated pages)
```js
Chain.set(key, val)   // localStorage cosmosLog_ep03_chain
Chain.get(key)
// Actual usage:
// p02 → Chain.set('ARYA')    → p03 password check
// p05 → Chain.set('d_sos_pc', 400) → p06 reveal
// p12 → Chain.set('DENEB_unlocked') · p13 diary reveal
```

## 2-Button Pattern (every INVEST/DILEM/REFL page)
```html
<div class="btn-pair">
  <button class="submit-btn">💾 ส่งคำตอบ</button>
  <button class="next-btn" id="nextBtn">🔒 รอ</button>
</div>
```
```js
Submit.wirePair({ page, nextHref, getPayload, isPerfect, onSubmit })
```
- Submit → localStorage + Sync.recordDecision + `Gate.markSubmitted()` · button locks after click
- Next → `Gate.wireButton(page, btn, href, { requireSubmit: true })` (called by `Submit.wirePair`)

## Gate Behavior (UPDATED 2026-04-25)
Two unlock conditions for "ไปต่อ" on pages with submit:
1. **Student presses Submit** → `Gate.markSubmitted()` unlocks
2. **Teacher opens gate** → PaceClient `unlockedUpTo` ≥ next page · overrides submit gate
Initial state = LOCKED with text "🔒 ส่งผลก่อน · จึงไปต่อได้" (was: unlocked by default).
- **No teacher pace** → submit gate is the only gate (must press submit)
- **Teacher active** → teacher decision wins (open OR locked regardless of submit)
- **URL `?solo=1`** → ignore teacher · submit gate only
- **Narrative pages** (no submit · use `Gate.soloMode` directly) → unaffected · stay open by default
- Cache-bust: ep03-boot.js loaded with `?v=2` in all 25 ep03 pages (bump if Gate logic changes again)

## Coin / Shop System (EP02 pattern applied)
- 🪙 Coin earned only on **perfect stage** (correct all try 1)
- Defined in `EP_CONFIG.coin.perfectBonus[pageId]`
- Spent at `shop.html` (Beat 17) on 7 items
- 3 strategies: DPS / Tank / Ending A focus

## WARP RUN Boss-like (P18 climax · warprun.html)
- VOIDHUNTER HP 300 · 3 phase
- Q&A rhythm: correct = damage · wrong = **MISS + ⚡-20%** (EP02 exact)
- VH charges 10 sec (15 if chronos booster) · full = shoots us
- Item boosts by category: parallaxPro × parallax Q · almanac × magnitude Q · scope × any Q = crit ×2
- Streak ×1.5 at 3 · ×2 at 5
- 3-4 Ending: A (send beacon) · A+ (send + shield+ absorbs supernova) · B (don't send) · C (supernova before victory)

## Teacher Console
- `ep03/teacher.html` = copy of `shared/teacher-remote.html` with ep='ep03' hardcoded
- **Default mode = local** (no password needed)
- Use `?mode=remote` to opt-in to Apps Script backend

## Gotchas
- Sync auto-creates 'SOLO' room · so solo play works without join
- Photon/VOIDHUNTER require Sync state · both work in solo thanks to auto-room
- Coin uses its own localStorage directly (independent of Sync)
- Always load `pace-client.js` from `../../shared/pace-client.js` (lives at lessons/shared/)
- Never overwrite `p14-chase.html` semantics → in new config p14 = TEACH triangulation (not chase)
- p18 in new config = warprun.html (NOT p18-log.html · which no longer in flow)
