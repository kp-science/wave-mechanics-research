---
name: Worksheet core infrastructure (auto-save + auto-fill + PDF)
description: Shared JS/CSS at lessons/shared/worksheet-core.js providing localStorage auto-save, postMessage identity auto-fill, JSON export/import, print-PDF CSS. Apply to all new worksheets (Calc/Spot/POE).
type: reference
originSessionId: a3dc2cf0-739c-43af-82bb-1f1d37bb161a
---
**Location:** `/Users/komanepapato/Documents/วิจัย/wave-mechanics-research/lessons/shared/worksheet-core.js` + `README.md`

**Setup per new worksheet (3 required changes):**
1. `<body data-ws-id="planN-type-N.N">` — unique key for localStorage
2. Student fields must use ids: `s-name`, `s-num`, `s-room`, `s-grp`
3. Include before `</body>`: `<script src="../../../shared/worksheet-core.js"></script>` (adjust `../` count based on file depth)

**What it provides:** floating toolbar (download JSON / import JSON / print-PDF / submit-to-cloud / clear), debounced auto-save every 1.5s, canvas save on mouseup/touchend, auto-restore on page load, identity fill from parent postMessage (REQUEST_STUDENT_INFO → STUDENT_INFO), print-friendly CSS.

**Parent KP-Classroom must implement** (one-time):
- Listen for `message` type `REQUEST_STUDENT_INFO` → reply with `{type:'STUDENT_INFO', name, num, room, group}`
- Listen for `WS_SUBMIT` → save `data.wsId` + `data.data` to Google Sheets

**Why:** User asked 2026-04-18 to build persistence template FIRST so future worksheets (plans 6–10) inherit it automatically. Avoids retrofitting later.

**Applied to:** Plan 5 Calc 5.1 + Spot 5.2 (reference templates). Not yet applied to POE-05, plans 1–4 files (can be added later by just inserting body attribute + script tag).
