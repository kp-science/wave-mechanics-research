---
name: Puzzle interaction patterns (EP02)
description: 7 stabilized patterns for drag-drop puzzle pages in astronomy EP02+ — slot grid w/ hint, shuffle, match-by-id, journal defense, image state swap
type: feedback
originSessionId: 3cb0f48f-b274-455f-a621-922b3cd92caf
---
Stabilized patterns after session 3 (2026-04-24) UX overhaul of p04/p09/p16/p17b.
Reuse for EP03+ puzzle pages.

**Why:** linear-sort + index-matching + debate-presentation caused pedagogy issues (guessing from pool order, confusing drop zones, self-paced learners stuck on presentation steps).

**How to apply:**
1. **Slot grid w/ hint placeholder** — each drop zone shows dim text of expected item when empty (`<span class="slot-hint">`); style states: over / filled / correct / wrong. Double-click filled slot returns card to pool. Pool accepts dropped cards back (restoring slot hint).
2. **Pool shuffle on load** — Fisher-Yates on `pool.children` in init. Prevents pattern-recognition from HTML order. Applies to p04, p09 Phase 2, p16.
3. **Match by ID, not order** — `card.dataset.id === slot.dataset.pos`. Position-based slots (p09 Y-fork, p16 journal) use this. Only legacy linear-sort uses index order.
4. **Journal/textarea for A2 defense** — don't require "present to class 30s" in self-paced lessons. Use 2 textareas (confidence + counter-argument), min ~10 chars each, bonus at ~40. Save in `Book.savePageData` so teacher reads later.
5. **Image swap on state change** — battle pages use `<img id="bossImg">` that swaps src on phase change (boss1.jpeg while fighting → Boss2.jpeg on endBattle). Differentiates win/lose via filter (green glow vs purple+grayscale).
6. **Scene text tied to actual page plot** — recap pages must derive scenes from real content of p01-p15, not generic summaries. Verify against `<h1 class="page-title">` of each page.
7. **Y-shape / non-linear layout when diagram demands** — Tuning Fork uses CSS grid 7×3 with `grid-column`/`grid-row` per position class (`.pos-E0`, `.pos-Sa`, etc.) + dashed connector pseudo-elements for branch visual.

Files with reference implementations:
- `lessons/astronomy/ep02/p04-classify.html` (shuffle)
- `lessons/astronomy/ep02/p09-tuning.html` (Y-fork + journal)
- `lessons/astronomy/ep02/p16-recap.html` (numbered journal slots)
- `lessons/astronomy/ep02/p17b-finalboss.html` (boss image swap)
