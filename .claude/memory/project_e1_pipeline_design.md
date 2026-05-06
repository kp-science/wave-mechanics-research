---
name: COSMOS LOG E1/E2 capture pipeline · final spec
description: คำตัดสินใจสุดท้ายเรื่องการเก็บคะแนน E1/E2 ของงานวิจัย วPA · 2026-05-05 (เริ่ม 2-week build)
type: project
originSessionId: f1d41c96-b293-44d9-ad32-5d316e36f803
---
## E1/E2 Capture Pipeline · COSMOS LOG (Final Spec · 2026-05-05)

### Scoring policy (E1 = 240 คะแนน · 30/EP × 8 EP)

| องก์ | นับ E1 | คะแนน/EP | grading |
|---|---|---|---|
| 🚀 Mission Brief | ✅ | 7 | MCQ 3 ข้อ auto |
| 🔬 Lab Build | ✅ | 13 | drag/match/fill auto |
| 🔁 Recall Check (bridge) | ✅ | 10 | MCQ 1-2 ข้อ auto · **เพิ่มใหม่ทุก EP** |
| ⚔️ Boss Fight | ❌ ไม่นับ | 0 | tracked แยกเป็น engagement metric in Ch.4 |
| 📔 Reflection | ❌ ไม่นับ | 0 | → Satisfaction post-only |

**E2** = FT-02 Posttest 20 ข้อ (เก็บอยู่แล้วผ่าน submitFT)

### Hybrid model: A + C
- **A** = Boss ไม่นับใน E1 (รักษา construct validity ตัด time-pressure noise)
- **C** = Boss Adventure Mode คงเดิม + log boss accuracy/time/retry เก็บเป็น engagement secondary outcome (ไม่ใช่ main)

### Why this design (defensible to วPA committee)
- Plass et al. (2015) แยก engagement vs learning outcome
- Wouters & van Oostendorp (2013): time-pressure quiz r=0.2-0.3 vs no-time r=0.5-0.7 กับ posttest
- เลือก conservative > inflated numbers

### Tech stack to build (D1-D5)
1. Sheet `Activity_Raw` (events) + `Activity_Summary` (formulas)
2. Apps Script `submitActivity` + `submitBoss` (separate channels)
3. `shared/activity-sync.js` (generic submitter with retry queue)
4. Hook 1-2 lines/page in: Mission MCQ pages · Lab Build submit · Recall Check (new pages)
5. Dashboard card "E1 ระหว่างเรียน" + Boss engagement card

### Recall Check pages to ADD (1/EP, ~5-min MCQ)
- EP01-08 each: insert between Lab Build → Boss as `pXX-recall.html`
- 2 questions × 5 คะแนน = 10 คะแนน/EP

### Deadlines
- D1-2: schema + Apps Script handlers ✅ DONE 2026-05-05
- D3-4: activity-sync.js + hook all pages (8 EP)
- D4-5: Recall Check pages (8 หน้าใหม่)
- D5: smoke test
- D6: Dashboard card
- D7: ครู try-out 1:1
- D8-10: fix bugs + เขียนบทที่ 3

### Phase 1 status (2026-05-05): INFRASTRUCTURE COMPLETE
- ✅ `lessons/astronomy/shared/activity-sync.js`
- ✅ `lessons/astronomy/shared/activity-registry.js` (8 EP · 70+ pages mapped · 2 new Recall pages flagged)
- ✅ Apps Script handlers + dispatcher entries (need redeploy)
- ⏳ Phase 2 tasks 4-9 in `lessons/astronomy/HANDOFF_e1_pipeline.md`

### To resume in new chat
Open prompt: "เจน อ่าน lessons/astronomy/HANDOFF_e1_pipeline.md แล้วเริ่ม Task 4 ต่อ"
