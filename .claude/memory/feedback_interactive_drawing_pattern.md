---
name: Interactive drawing — scene-stack + canvas overlay pattern
description: For wave/physics drawing tasks, use SVG scenario background + transparent canvas overlay. Every worksheet item (even calc/text ones) must include BOTH a canvas work board AND a typed-answer textarea. Use "ทิศการเคลื่อนที่"/"หน้าคลื่น" language, not "รังสี". Minimize pre-labeled helpers (no C, F, A/B/D markers) — let students derive them.
type: feedback
originSessionId: a3dc2cf0-739c-43af-82bb-1f1d37bb161a
---
**Rule 1 — Scene + overlay for drawing tasks:** Use SVG scenario as background + transparent canvas overlay so students draw without being able to erase the given scenario.

1. SVG scenario `position:absolute` behind canvas via `.scene-stack` wrapper
2. Transparent canvas overlay with `class="overlay"` on top; `initCanvas()` detects this and skips white fill/baseline
3. Eraser uses `destination-out` composite when transparent → only removes student drawing, not scenario
4. "ล้างที่วาด" button → `clearRect` only; scene stays intact

**Rule 2 — Analyze input type per question (typed vs drawn):**

- **Typed answer (text/number input or textarea)** — when answer can be entered via keyboard: numbers, short words, sentences, concept names, yes/no, unit conversions. Use `<input type="number">` or `<textarea>` alone; NO canvas needed.
- **Drawn answer (canvas)** — when students must show work: diagrams, ray tracing, wave fronts, calculations with sketches, handwritten reasoning that's hard to type. Use canvas.
- **Mixed (canvas + textarea pair)** — for items that ask both "show your work" AND "state your answer": use canvas for work + typed box for final answer.
- **Selection (checkbox/radio)** — for prediction questions (P in POE), known misconception identification (ก/ข in Spot). KEEP these as checkbox/radio; do NOT convert to canvas.
- **POE files already look good on the web** — do NOT retrofit POE worksheets with canvas additions (user confirmed 2026-04-18). Only apply canvas/scene-stack rules to Calc and Spot worksheets, and to new POE files going forward when designing from scratch.

**Rule 2b — If the item has a given SVG diagram that students must annotate/draw ON:** use **scene-stack overlay** (SVG background + transparent canvas on top). NEVER put a separate lined-paper canvas BELOW the SVG — students must be able to draw directly on the given diagram.

User explicitly stated 2026-04-18:
- "แบบฝึกหรือใบกิจกรรมขอให้มีส่วนที่แสดงวิธีทำเป็นกระดาน canva และเพิ่มช่องพิมพ์คำตอบด้วย"
- "ถ้าพิมพ์โดยใช้แป้นพิมพ์ได้ให้ใช้กล่องพิมพ์ข้อความ อันไหนต้องวาด แสดงวิธีทำ อันนี้ขอให้เป็น canva"
- "ให้วาดทับรูปนี้ได้" (when SVG diagram present, canvas must overlay it)

**Rule 3 — Language:** Use **"ทิศการเคลื่อนที่ของคลื่น"** instead of "รังสี" (ray). Always show **"หน้าคลื่น" (wave fronts)** as the primary visible entity; direction of motion is ⟂ to wave fronts. Instructions use colored ① ② ③ markers matching canvas palette colors.

**Rule 4 — Minimize scaffolding in diagrams:** Don't pre-label points like C (ศูนย์กลาง), F (focus), A/B/D (impact points) on given scenarios. Show only surface + incident wave fronts + optional principal axis. Let students discover/label these via their drawing. Too many pre-labels reveal the answer and reduce inquiry.

**Why:** Students on tablets were accidentally erasing given diagrams (drove scene-stack). Teacher wants students to show reasoning process visually (not just answer), drove universal canvas+textarea pairing. Pre-labeled focal points gave away answers in concave reflector question.

**How to apply:** Every plan 6–10 that involves any drawing, calculation, or reasoning task. Template: `wave-mechanics-research/lessons/physics3/waves/แผน05_การสะท้อนของคลื่น/สื่อ03_Calc_ใบกิจกรรม5.1.html` — see `.scene-stack` CSS, per-item canvas block, `initCanvas()` with `data-bg="lined"` support, destination-out eraser.
