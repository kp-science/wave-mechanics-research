# Astronomy (COSMOS LOG) — STATE

> Living document · อัปเดตทุกครั้งหลังจบ session ด้วย `/state-save astronomy "..."`
> Last updated: 2026-04-24 (session 3 · puzzle UX overhaul: recap/boss/classify/tuning)
> Created from: HANDOFF_ep01.md + catchup briefing + spot-check 2026-04-24

---

## 🎯 Current focus
EP02 (แผนที่ลับกาแล็กซี) **20 หน้า + UX puzzle polish** · ปรับ 4 หน้า puzzle ให้ interaction ชัด/matching pedagogy (p04 shuffle · p09 Y-fork + Journal · p16 journal timeline · p17b boss image state) · เหลือ playtest เต็ม + debug pace sync ถ้าใช้จริง

---

## 📖 Story state (live)

- **Series:** COSMOS LOG
- **Pattern:** astronomy-game
- **Flow:** Book-page · 1 ไฟล์ = 1 กิจกรรม
- **EP01 title:** The Collision (112 นาที · 19 หน้า)
- **EP02 title:** แผนที่ลับกาแล็กซี (20 หน้า · 102 นาทีประมาณ)

### Story rules (จาก HANDOFF_ep01.md · ⚠️ ห้ามหลุด)
- Book-page flow · 1 ไฟล์ = 1 กิจกรรม
- Experience Before Labeling (ครูสอนเต็มจุดเดียวที่ P10)
- ไม่มี info dump · output puzzle = input story ถัดไป
- Teacher Cue ทุกหน้า · เก็บ research data ทุก puzzle

### Page types (ต่อหน้าในไฟล์: `data-type="..."`)
- `story` — ฉากเล่าเรื่อง/transition (หน้าสั้น ~60-120 บรรทัด พอ · **ไม่ต้องมี Before/Activity/After**)
- `puzzle` — กิจกรรมเชิงโต้ตอบ (ยาว ~150-220 บรรทัด · 3 phases: Predict/Do/Debate)

---

## ✅ Done

### EP01 · The Collision (สมบูรณ์ · 2026-04-22)
- 19 หน้า (p01-entry ถึง p17-exit + p16-review + p17-exercise)
- เวลา 112 นาที

### EP02 · แผนที่ลับกาแล็กซี (2026-04-23 draft · 2026-04-24 polish)
- **20 หน้า** p00-howtoplay (ใหม่) + p01–p19 · config.js + EP_CONFIG routing
- **Shared Game Layer:** game.js · items.js · boss.js · corruption.js · leaderboard.js · teacher-cards.js · particles.js
- p06 UX overhaul: 44px slots · pulsing glow · short label on placed · click-to-clear + click-used-chip-to-return

### Teacher Pace Remote · MVP (2026-04-24)
- **Backend:** `_private/AppsScript_Code.gs` · เพิ่ม `paceGet`/`paceSet` (Script Properties: `PACE_<roomCode>`)
  - ⚠️ **ต้อง redeploy Apps Script editor → New version** ถึงจะใช้ remote mode ได้
- **Generic client:** `lessons/shared/pace-client.js` · BroadcastChannel + localStorage (local) / HTTP poll (remote)
- **Student hook:** `Book.pace` ใน `shared/book.js` · lazy-load · opt-in via `?room=XXX` · `?local=1` · `?pace=off`
- **Teacher UI:** `shared/teacher-remote.html?ep=ep02&room=X&local=1` · checkbox ต่อหน้า · ปลดล็อค/ล็อคทั้งหมด · keyboard ← → space · timer
- **Soft lock:** student เห็น banner "ครูพาไปหน้า X" · คลิกเอง · ไม่ force navigate
- **Hard lock:** `Book.next()` บล็อคไม่ให้ไปเกิน `unlockedUpTo` · ปุ่ม footer "ต่อไป →" เปลี่ยนเป็น "🔒 รอครู"
- **HUD pace pill:** แสดงสถานะ `[L/R] 🔓 ปลดถึง PXX` ตลอดเวลา · คลิก = debug popup

### UX polish (2026-04-24)
- **Finish button** · กดแล้วเทา/disabled · auto-restore บน revisit
- **Auto-advance** 1.2s (generic) / 2.8s (มี celebrate) หลัง `Book.completePage()`
- **Checkmark burst** (✓ ใหญ่ 72px เด้งตอนส่ง)
- **Celebrate toast** มีข้อความกระตุ้นตาม score tier (🌟 perfect → 🌱 low)
- **Universal click feedback** · flash + bubble "✓ รับคำสั่ง" บน `.finish-btn` ทุกตัว
- **Pace lock toast** มี diagnostic info (mode, room, เวลา)
- Scoring pages ผูก `completePage(pageId, {score, max, msg})`: p04 · p06 · p09 · p11 · p13 · p16 · p17

### Puzzle UX overhaul (2026-04-24 · session 3)
- **p04-classify**: shuffle 12 tiles ตอน init (Fisher-Yates) · กลุ่ม E/S/SB/Irr ไม่เรียงติดกันแล้ว · คำตอบ (`data-group`) ไม่เปลี่ยน
- **p09-tuning · Phase 2**: ยกเครื่องจาก linear track → **Y-shape Tuning Fork** · CSS grid 7×3 · 10 slot วางตำแหน่งตามภาพจริง (stem E0-E5-E7 · แขนบน Sa-Sb-Sc · แขนล่าง SBa-SBb-SBc · Irr แยกขวา) · connector dashed · pool shuffle · ตรวจแบบ match `card.id === slot.pos`
- **p09-tuning · Phase 3**: เปลี่ยนธีมจาก "debate หน้าห้อง 30 วินาที + ให้ครูติ๊ก" → **Self-Defense Journal (solo)** · 2 textarea · ① ตำแหน่งมั่นใจ + เหตุผลสังเกต ② ตอบเพื่อนที่แย้ง · บังคับ ≥10 ตัวอักษร/ช่อง · ≥40 ตัว/ช่อง = +5🪙 · บันทึกใน Book.savePageData ให้ครูอ่านภายหลัง · เหตุผล: self-paced ไม่มีห้องให้นำเสนอจริง
- **p16-recap**: (1) scene text ตรงพล็อตจริง p01–p15 (เช่น S4 = หาบ้าน Orion ใน MW · S5 = พบ Dr.Hubble + Tuning Fork (Midpoint) · S7 = Bolt พบ Warp + Chase v=H₀D) (2) Timeline UI จาก div ว่าง → **Journal Timeline 8 slot** · CSS journal look (เส้นสมุดแนวนอน + margin line แดงซ้าย + เลขวงกลมทอง) · ลากลง slot ตามเลข · ดับเบิลคลิกดึงกลับ · ตรวจตาม `slot.dataset.slot` แทน order index · trap drawer แยกสีม่วง
- **p17b-finalboss**: เพิ่ม `<img id="bossImg">` ในฉากสู้ → ใช้ `./galaxy/boss1.jpeg` + transition filter · ใน `endBattle()` สลับ src เป็น `./galaxy/Boss2.jpeg` · ชนะ = เรืองเขียว + label "DEFEATED" · แพ้ = เรืองม่วงเทา

### Infrastructure (2026-04-24 spot-check)
- ✅ `book.js` รองรับ EP_CONFIG routing (line 112: `(window.EP_CONFIG && EP_CONFIG.pages) || PAGES`)
- ✅ Story pages ของ EP02 (p07/p08/p15) complete — ไม่ใช่ skeleton · Teacher Cue + scene + narrative ครบ
- ✅ Puzzle pages ของ EP02 (p09 tuning-fork ตัวอย่าง) มี 3 phases + game integration ครบ

---

## 🚧 In progress

- **Debug pace sync ระหว่างครู-นักเรียน** · user รายงาน lockAll ไม่ reach student · รอ user คลิก pace pill แล้วส่ง debug popup มา
- Cache version ล่าสุด: `v=5` ใน script/link tags

---

## ⏭ Next (priority order)

1. **ทดสอบ pace remote ใน 2 tab** (Cmd+Shift+R ก่อน) — คลิก pace pill ดู debug · ตรวจว่า mode [L]/[R] + room ตรงกัน
2. **Playtest EP02 ทั้ง 20 หน้า** — เปิด p00 ด้วย `?pace=off` (ไม่ใช้ pace) · เดินดู flow · Teacher Cue ชัด · Corruption % ไล่ถูก
3. **Redeploy Apps Script** (ถ้าอยากใช้ pace remote จริง ไม่ใช่แค่ local)
   - เปิด editor ของ astronomy deployment (URL: `AKfycbzt4qy...YWFuRZq/exec`)
   - paste `_private/AppsScript_Code.gs` · Deploy → Manage Deployments → Edit → New version
   - ตั้ง Script Property `TEACHER_PASSWORD` (fallback: `komanepapato2569`)
4. **ตัดสินใจ:** ทำ EP03 ต่อ หรือพักไปทำ physics3 waves/SHM?
5. **(optional) สร้าง outer shell EP02** (`ep02-the-lost-map.html`)
6. **(optional) Apply pace remote ไปยัง physics3** · copy `pace-client.js` ใช้ได้เลย · ต้องสร้าง teacher-remote ของวิชานั้น

---

## 🔑 Decisions log (append-only)

- **2026-04-24 (session 1):** Spot-check EP02 · ยืนยันว่า p07/p08/p15 complete (story type · minimal ตามดีไซน์)
- **2026-04-24 (session 1):** ยืนยัน book.js รองรับ EP_CONFIG routing แล้ว
- **2026-04-24 (session 1):** สร้าง STATE.md จาก HANDOFF_ep01.md + catchup briefing
- **2026-04-24 (session 2):** เพิ่ม p00-howtoplay เป็น Safe Haven (ไม่เพิ่ม corruption)
- **2026-04-24 (session 2):** เลือก Soft broadcast + Hard lock ไม่ใช่ Lockstep · ไม่ force navigate
- **2026-04-24 (session 2):** Pace cumulative unlock (unlockedUpTo คือ page สูงสุดที่ปลด) · ไม่ใช่ set of unlocked pages
- **2026-04-24 (session 2):** Auto-advance หลัง completePage · default 1.2s / มี celebrate 2.8s
- **EP02 arch:** ใช้ `EP_CONFIG` แยกต่อ EP (ต่างจาก EP01 ที่ฝัง PAGES ใน book.js)
- **EP02:** เพิ่ม game layer เต็ม (items/boss/corruption/leaderboard) — EP01 ไม่มี
- **Filename rule:** ไม่ rename เมื่อแทรกหน้า · แก้แค่ `data-page`
- **2026-04-24 (session 3):** p04 · shuffle tiles ตอนโหลด เพื่อไม่ให้ผู้เรียนเดาจากลำดับ pool
- **2026-04-24 (session 3):** p09 Phase 2 เปลี่ยนจาก linear sort → Y-shape fork slots (ตรงภาพ tuning-fork จริง · ผู้เรียนต้องเข้าใจว่า S0/E7 เป็นจุดแยกสองแขน)
- **2026-04-24 (session 3):** p09 Phase 3 ตัดธีม "ออกมานำเสนอ 30 วินาที" เพราะ self-paced ไม่มีห้องนำเสนอ → ใช้ **Self-Defense Journal (เขียน)** แทน · ยังได้ A2 ตาม objective เดิม · ครูอ่าน Journal ใน Book.state ได้
- **2026-04-24 (session 3):** p16 Scene text ต้องผูกกับหน้าจริง (p01–p15) ไม่ใช่สรุปแบบลอย · Timeline UI = numbered slot (journal look) แทน div ว่าง · ลดความคลุมเครือเวลาผู้เรียนวาง
- **2026-04-24 (session 3):** p17b boss visual ต้อง reflect state (ยืนต่อสู้ = boss1 · จบภารกิจ = boss2) เพื่อสื่อสาร progression นอกจากเลข HP

### Game interaction patterns (stabilized 2026-04-24)
เอกลักษณ์ที่ใช้ซ้ำได้ใน puzzle ต่อ ๆ ไป (EP03+):
1. **Scene-stack SVG bg + transparent canvas overlay** (wave drawing — จาก memory)
2. **Slot grid with hint placeholder** (p06 milky way · p09 tuning · p16 recap)
   - Slot แสดง hint จาง ๆ (text/number) ตอนว่าง · เปลี่ยน style ตอน over/filled/correct/wrong
   - ดับเบิลคลิก slot → ดึงการ์ดกลับ pool
   - pool accepts drop → ส่งการ์ดกลับ (with placeholder restore)
3. **Pool shuffle on load** (p04 · p09 · p16) — กัน pattern recognition ตามลำดับ HTML
4. **Match by ID not order** — `card.dataset.id === slot.dataset.pos` (p09/p16) แทน index-based ใน array order (p04 linear sort legacy)
5. **Journal/textarea for A2 defense** (p09 Phase 3) — แทน "debate หน้าห้อง" · บังคับ min length · save ใน Book.state
6. **Image swap on state change** (p17b) — reflect puzzle completion/phase ผ่านภาพ ไม่ใช่แค่ HP/score
7. **Scene text tied to actual page plot** (p16) — recap ต้อง derive จากเนื้อหาหน้าจริง ไม่ใช่เขียนลอย

---

## ❓ Open questions

- EP03 ทำต่อเลย หรือพัก? (topic: ดาวฤกษ์ · ว 7.1 ม.4-6/2)
- ต้องสร้าง outer shell `ep02-*.html` เหมือน EP01 ไหม? (ep01 มี ep01-scene.html + ep01-the-collision.html)
- Pace sync debug · ถ้า mode/room ตรงกันแล้วยังไม่ sync · อาจเป็นบั๊กใน Book.next() lock check
- ข้อความกระตุ้นใน celebrate toast · tone โอเคไหม · ต้องปรับให้ไพเราะขึ้นไหม
- Teacher remote: quota ของ Apps Script ถ้าห้องใหญ่ 50 คน polling 8s → 22k req/ชม. · ใกล้ limit 20k/day ของ consumer

---

## 📎 References

- Pattern: `.claude/patterns/astronomy-game/`
- Bible: `lessons/astronomy/cosmos-log-series-bible.html`
- HANDOFF: `lessons/astronomy/HANDOFF_ep01.md` (EP01 context)
- Private notes: `_private/state/astronomy_notes.md` (ถ้าสร้าง)
- EP01 shell: `ep01-scene.html` + `ep01-the-collision.html`
- EP02 pages: `lessons/astronomy/ep02/p00–p19.html` + `config.js` + `test.html`
- Shared lib: `lessons/astronomy/shared/` (book.js · game.js · items.js · boss.js · ฯลฯ)
- Pace client: `lessons/shared/pace-client.js` (generic · reusable ทุกวิชา)
- Teacher remote: `lessons/astronomy/shared/teacher-remote.html`
- Apps Script: `_private/AppsScript_Code.gs` (actions: paceGet · paceSet · ต้อง redeploy)
- Memory: `reference_pace_remote.md` (architecture summary)
