# HANDOFF · COSMOS LOG EP02 · Session Log

> ใช้ไฟล์นี้เพื่อเริ่มแชทใหม่โดยไม่เสียบริบท · ก่อนทำงานอื่น ให้อ่านไฟล์นี้ + `HANDOFF_ep01.md` ให้จบก่อน

**วันที่บันทึกล่าสุด**: 2026-04-24
**สถานะ EP02**: 🟡 **Scaffold ครบ 20 หน้า (p00-p19) · ยังเป็น placeholder · รอเติมเนื้อหาจริง + ภาพ**
**โครงสร้าง**: Shell+Pages (ต่อจาก EP01) + Game Layer (Sprint 1 เสร็จ) + Scaffold (Sprint 3 เสร็จ)

---

## 1. EP02 คืออะไร

**"แผนที่ลับกาแล็กซี · The Lost Map"** · ตอนที่ 2 ของซีรีส์ COSMOS LOG · 100 นาที (2 คาบ) · 20 หน้า

- **ตัวชี้วัด**: ว 7.1 ม.4-6/1 · กาแล็กซี · กฎฮับเบิล
- **Badge**: 🌌 Galaxy Classifier
- **VOID misconceptions**: 1) ทางช้างเผือก=แถบเมฆ 2) กาแล็กซีทุกรูปเหมือนกัน 3) parsec=หน่วยเวลา

**Logline**: สัญญาณ VOID ชี้ 12 พิกัด "บ้านเกิดโวอิเดียน" · ทีมต้องจำแนกกาแล็กซีและคำนวณ v=H₀D ก่อน VOID ทำลายแผนที่

---

## 2. โครงสร้าง 3 องก์ · 20 หน้า

| # | ID | ไฟล์ | ชื่อ | ประเภท | นาที | องก์/Beat | Objective หลัก |
|---|---|---|---|---|---|---|---|
| 00 | p00 | p00-howtoplay.html | วิธีเล่นเกม | story | 2 | Tutorial (safe haven) | – |
| 01 | p01 | p01-entry.html | Entry Ticket · Pre-test | puzzle | 3 | องก์1·Exposition | K1-4 baseline |
| 02 | p02 | p02-continue.html | ตั้งทีม · Power-up | setup | 2 | องก์1·Intro World | A1 |
| 03 | p03 | p03-signal.html | สัญญาณ VOID · radar 12 จุด | story | 3 | Inciting Incident | – |
| 04 | p04 | p04-classify.html | จำแนก 12 กาแล็กซี + timer 4นาที | puzzle | 7 | Trial | K1 · P1 · A1 |
| 05 | p05 | p05-council.html | Council โหวต · ฟังเสียงข้างน้อย | mixed | 2 | Plot Point 1 | A1 |
| 06 | p06 | p06-milkyway.html | หา Sun ใน MW 5ช่อง + 2 trap | puzzle | 7 | Rising Action 1 | K2 · P3 |
| 07 | p07 | p07-home.html | บ้านอยู่แขน Orion | story | 2 | Small Win + label | K2 |
| 08 | p08 | p08-arrive.html | ถึงหอดูดาว · Dr.Hubble | story | 2 | Scene change | – |
| 09 | p09 | p09-tuning.html | Tuning Fork Lab (3 phase) | puzzle | 15 | Rising Action 2 | K1·P1·P2·A1·A2 |
| **10** | **p10** | **p10-hubble.html** | **🌟 Dr.Hubble สอน 5 นาที (safe haven)** | **story** | **5** | **Midpoint** | **K1 · K4** |
| 11 | p11 | p11-rotation.html | Galaxy Rotation Sim (canvas) | puzzle | 8 | Deeper understanding | P1 · P2 |
| 12 | p12 | p12-boltwarp.html | Sacrifice decision (0/10/25/50) | story | 2 | Crisis setup | A1 · A3 |
| 13 | p13 | p13-chase.html | 🔥 Chase · timer 3นาที · v=H₀D ×3 | puzzle | 7 | All is Lost | K3 · P4 · A3 |
| 14 | p14 | p14-boss.html | 👁️ BOSS 3 phase · HP 300 · evidence picking | mixed | 7 | 🐉 CLIMAX | K1·K2·P3·A2·A4 |
| 15 | p15 | p15-warp.html | Warp starfield + SOS cliffhanger | story | 3 | Falling action | – |
| 16 | p16 | p16-recap.html | Recap 8 ฉาก + 2 trap | puzzle | 6 | Resolution 1 | P3 |
| 17 | p17 | p17-bloom.html | Bloom 15 ข้อ · medal bronze/silver/gold | puzzle | 10 | Resolution 2 | K1-K4 |
| 18 | p18 | p18-log.html | Captain's Log (cross-EP letter, safe haven) | reflection | 4 | Growth | A3 · A4 |
| 19 | p19 | p19-map.html | Post-test · Export JSON (safe haven) | reflection | 5 | Transformation | K1-K4 |
| | | | | **รวม** | **100** | | **12 objectives** |

**🌟 หน้าที่สอนเต็ม = P10 เท่านั้น** (ตามหลัก Experience Before Labeling จาก EP01)

---

## 3. Game Layer · สถาปัตยกรรม

```
astronomy/
├── shared/                    ← ขยายจาก EP01 · ไม่ทำลาย API เดิม
│   ├── book.css               ← 700+ บรรทัด (ขยายด้วย HUD pills · bet · items · boss · panels · VFX)
│   ├── book.js                ← ขยาย: getPages() ใช้ EP_CONFIG · Book.next() auto-fire finishBtn
│   ├── particles.js           ← (EP01 เดิม)
│   ├── game.js                🆕 Energy · Streak · Bet · award/penalty · Obj K/P/A tracking
│   ├── items.js               🆕 Inventory · grant/use · Combo items · mountPicker
│   ├── corruption.js          🆕 VOID meter 0-100 · auto-tick · safe haven · body VFX
│   ├── leaderboard.js         🆕 multi-team · localStorage `cosmosLog_leaderboard` (แยกจาก state)
│   ├── boss.js                🆕 3-phase BOSS · HP · resolveClaim · item synergy
│   └── teacher-cards.js       🆕 6 DM cards: spark/twist/insight/mercy/rival/silent
│
├── ep02/
│   ├── index.html             redirect → p00
│   ├── config.js              🔑 SSOT: pages · objectives · items · boss · corruption · bloom · balance
│   ├── test.html              Smoke test หน้าเดียวกด test ทุกโมดูล
│   └── p00-*.html ... p19-*.html
│
└── HANDOFF_ep02.md            ← ไฟล์นี้
```

### Load order ทุกหน้า EP02 (สำคัญ · cache-bust v=5 ปัจจุบัน)
```html
<link rel="stylesheet" href="../shared/book.css?v=5">
<script src="../shared/book.js?v=5"></script>
<script src="./config.js?v=2"></script>   <!-- sets window.EP_CONFIG -->
<script src="../shared/game.js?v=2"></script>
<script src="../shared/items.js?v=2"></script>
<script src="../shared/corruption.js?v=2"></script>
<script src="../shared/leaderboard.js?v=2"></script>
<script src="../shared/boss.js?v=2"></script>   <!-- เฉพาะ p14 -->
<script src="../shared/teacher-cards.js?v=2"></script>
```

---

## 4. State Model (localStorage)

`cosmosLog_state` (ต่อจาก EP01 · backward compat):
```js
{
  // EP01 เดิม
  teamId, teamName, role, energy, gates, data, discoveries, inventory, log, startTime, currentPage,

  // EP02 ขยาย
  ep: 'ep02',
  streak,           // number · ตอบถูกติดกัน
  corruption,       // 0-100 · VOID meter
  bet,              // { confidence, page, qid, at } · pending bet
  betHistory,       // log ทุก bet [{page,qid,confidence,correct,delta,at}]
  decisions,        // log [{page,choice,votes,minorityHeard,note,at}]
  retries,          // { p13: 2 } · retry count ต่อหน้า
  itemsUsed,        // ['hubbleLens', 'shield']
  objectives,       // { K1:{hits,attempts,pages:{p04:2,p09:1}}, ... }
  boss,             // { started, hp, maxHp, phase, phases, log, won, lost }
}
```

`cosmosLog_leaderboard` (แยก key):
```js
{ teams: [{id,name,energy,log,lastSync}], activeTeamId }
```

`cosmosLog_captainLog_ep02` (แยก key · ข้าม EP):
```js
{ know, wonder, tell, pledge, at }  // P18 · เปิดอ่านใน EP03 P01
```

---

## 5. Learning Objectives · K · P · A (12 ข้อ)

| รหัส | วัตถุประสงค์เชิงพฤติกรรม | วัดที่ | เกณฑ์ |
|---|---|---|---|
| K1 | จำแนกกาแล็กซี (E/S/SB/Irr) | P04, P09 | ≥0.67 |
| K2 | อธิบายโครงสร้าง MW | P06, P07 | ≥0.85 |
| K3 | ใช้ v=H₀D | P13 | ≥0.67 |
| K4 | แปลง pc↔ly↔Mpc | P10, P17 | ≥0.67 |
| P1 | สังเกต·จัดกลุ่ม | P04, P09 | — |
| P2 | ทำนาย·สมมติฐาน | P09, P11 | — |
| P3 | วิเคราะห์หลักฐาน·trap | P06, P16 | — |
| P4 | แก้โจทย์ปริมาณใต้เวลา | P13 | — |
| A1 | ทีม·ฟังเสียงข้างน้อย | P05, P09, P12 | rubric |
| A2 | กล้าวิพากษ์·ปกป้อง | P09, P14 | rubric |
| A3 | ไม่ย่อท้อ | P13 | retry count |
| A4 | จิตวิทยาศาสตร์·anti-misc | P14, P18 | rubric |

**วัดอัตโนมัติผ่าน**: `Obj.hit('K1',{page:'p04'})` · `Obj.miss(...)` · สรุปที่ P19 ด้วย `Obj.report()`

---

## 6. Game Mechanics ที่ใช้

### 6.1 Energy & Streak
- base 10/ข้อ · +5 ถ้าตอบ <30s · streak ≥3 ×1.5 · ≥5 ×2.0
- start energy 50 (P02)

### 6.2 Bet System (Metacognition)
- ก่อนตอบทุกข้อ PUZZLE · เลือก confidence 25/50/75/100%
- ถูก = × mult · ผิด = -penalty (100%=10, 75%=5, 50%=3)

### 6.3 Combo Items (4 ชิ้น · ข้ามหน้า)
| id | ได้จาก | ใช้ที่ | effect |
|---|---|---|---|
| 🔍 hubbleLens | P04 (score ≥10/12) | P09 | revealHint |
| 📡 decoder | P06 (ไม่ใช้ hint + trap ครบ) | P14 | bossDamage +20% |
| ⏱️ warpFuel | P11 (จับ keyObs ใน try1) | P13 | timerRelax +60s |
| 🛡️ shield | P02/P09 (predict ≥2/3) | P14 | absorbOneHit |

### 6.4 Corruption Meter
- เริ่ม 0% · +5% ต่อหน้า (auto ใน Corruption.init())
- Safe havens: **p00, p10, p18, p19** (ไม่เพิ่ม)
- ≥20 tint อ่อน · ≥70 glitch · ≥95 hue shift · 100 loseAt event

### 6.5 Leaderboard (Class-wide)
- 1 อุปกรณ์ต่อทีม (ตามที่ออกแบบ) · ทีมอื่นเพิ่มผ่านครู
- 🃏 DM cards ครูกด: spark/twist/insight/mercy/rival/silent

### 6.6 BOSS (P14 · 3 Phase · HP 300)
- Phase เปลี่ยนทุก ~100 HP
- เลือก evidence 2 ชิ้น · ถูก = damage · ผิด = VOID ตีกลับ -15 (ยกเว้นมี shield)
- ต้องตอบ 3 claims ถึงจะจบ

### 6.7 Chase (P13 · 3 นาที real timer)
- corruption +2% ทุก 10 วิ
- คำนวณ D ของ 3 galaxies (α=100, β=50, γ=200 Mpc) · เลือก α

---

## 7. API · โมดูลหลัก

### Book (book.js)
- `Book.state` · `Book.save()` · `Book.reset()`
- `Book.getPages()` → อ่าน EP_CONFIG.pages (EP-aware)
- `Book.completePage(pageId)` · `Book.next()` · `Book.prev()`
- `Book.next()` มี auto-fire: ถ้า gate ยังไม่ set · ลอง click `#finishBtn` ถ้าเปิดใช้ได้
- `Book.addEnergy(+n, reason)` · `Book.addInventory({})` · `Book.addDiscovery(s)`
- `Book.savePageData(id, data)` · `Book.getPageData(id)`

### Game (game.js)
- `Game.award({base, timeMs, page, objective, skipBet})` → คำนวณ bonus+mult+bet · addEnergy · Obj.hit
- `Game.penalty({amount, page, objective, skipBet})`
- `Game.bumpStreak()` · `Game.resetStreak()` · `Game.getMultiplier()`
- `Game.placeBet({confidence, page, qid})` · `Game.mountBetPanel(sel, {page,qid})`
- `Game.recordDecision({page, choice, votes, minorityHeard, note})`
- `Game.recordRetry(pageId)`

### Obj (game.js)
- `Obj.hit(code, {page})` · `Obj.miss(code, {page})` · `Obj.report()` → { K1:{hits,attempts,rate,pages} }

### Items (items.js)
- `Items.grant(id, {from})` · `Items.use(id, {on})` · `Items.has(id)` · `Items.isUsed(id)`
- `Items.mountPicker(selector, {useOn, onUse})` · `Items.toast(msg)`

### Corruption (corruption.js)
- `Corruption.add(n)` · `Corruption.set(v)` · `Corruption.reset()` · `Corruption.safeHaven()`
- `Corruption.tickOnPage(pageId)` (auto ใน init ถ้าหน้าอยู่ใน EP_CONFIG.pages)

### Leaderboard (leaderboard.js)
- `Leaderboard.ensureTeam(id, name)` · `Leaderboard.adjust(id, delta, reason)`
- `Leaderboard.switchActive(id)` · `Leaderboard.toggle()` · `Leaderboard.load()`

### Boss (boss.js)
- `Boss.init({hp, phases})` · `Boss.current()` · `Boss.currentPhase()`
- `Boss.damage({amount, fromItem, reason})` · `Boss.resolveClaim({correct, evidenceCount})`
- Events: `boss:phase` · `boss:defeated`

### Teacher (teacher-cards.js)
- `Teacher.toggle()` · `Teacher.play(cardId)` · Actions: sparkActive · twistAll · insightActive · mercyLowest · rivalNote · silentTimer

---

## 8. Per-Page Pattern

```html
<body data-page="pXX" data-type="puzzle|story|mixed|setup|reflection">
  <div class="page"><div class="page-inner">
    <div class="page-label puzzle">องก์ X · Scene Y · BEAT</div>
    <h1 class="page-title">...</h1>
    <div class="obj-tags"><span class="obj-tag k">K1 · ...</span></div>

    <!-- narrative · activity · betMount · itemPicker -->

    <details class="teacher-cue" open>
      <summary>🎙️ Teacher Cue · PXX · บทบาท: ...</summary>
      <div class="tc-body">
        <b>เปิด:</b> ... <br>
        <b>ระหว่าง:</b> ... <br>
        <b>ปิด:</b> ...
      </div>
    </details>

    <button id="finishBtn" class="finish-btn" onclick="finishPage()">✓ ...</button>
  </div></div>

  <!-- load order ข้อ 3 -->
  <script>
    setTimeout(() => { Book.state.ep='ep02'; Book.save(); }, 50);
    function finishPage() {
      // 1) save data
      Book.savePageData('pXX', {...});
      // 2) completePage · ก่อน scoring · กันพัง
      Book.completePage();
      // 3) scoring ใน try/catch (optional · ไม่กระทบ gate)
      try { Game.award({...}); Obj.hit('...'); } catch(e){}
      // 4) UI feedback
      btn.classList.add('done'); btn.disabled = true;
    }
  </script>
</body>
```

**กฎทอง**: `Book.completePage()` ต้องรันก่อน scoring เสมอ · ถ้า scoring throw, gate ยังถูก set

---

## 9. บทบาทครู (ตาม design)

| ประเภทหน้า | บทบาทครู |
|---|---|
| STORY (p03, p07, p08, p12, p15) | 🎙️ ผู้บรรยาย/นักแสดง · เปลี่ยนเสียง VOID/Hubble/Bolt |
| PUZZLE (p04, p06, p09, p11, p13, p16, p17) | 🧭 Socratic + คุมเวลา · เปิด-ระหว่าง-ปิด · ไม่เฉลย (ยกเว้น P10) |
| P10 Midpoint | 🌟 **สอนเต็ม 5 นาที** (จุดเดียวในคาบ) |
| P14 BOSS | 🎭 เล่น VOID · เปลี่ยนเสียง 3 phases |
| P18/P19 | 🏅 พื้นที่เงียบ + ผู้มอบรางวัล |

**รูปแบบทุกหน้า**: 🎙️ เปิด → 🧭 ระหว่าง → 🏁 ปิด (collapsible panel มี timing + what to say + ห้ามพูด + DM card suggestion)

---

## 10. ปัญหาที่เจอ + แก้แล้ว (sessions ที่ผ่านมา)

| # | ปัญหา | fix |
|---|---|---|
| 1 | P04 นับซ้ำ (original + clone ใน dz) | query เฉพาะ `#galPool .gal-tile` |
| 2 | finishPage throw → gate ไม่ set | ย้าย `Book.completePage()` ก่อน scoring + try/catch |
| 3 | user กด "ต่อไป →" footer โดยไม่กด finishBtn | `Book.next()` auto-fire finishBtn ถ้าเปิดใช้ได้ |
| 4 | ปุ่ม disabled ดูเหมือน enabled | เพิ่ม `:disabled` style + 🔒 prefix |
| 5 | browser cache book.js เก่า | cache-bust `?v=5` ทุก script tag |
| 6 | P06 slot วงเล็กเห็นยาก | ขยาย 44px + glow + pulse (user patched) |
| 7 | P14 boss ตอบซ้ำได้ (ต้อง reset ทุกเข้า) | `Book.state.boss = null` ใน init |

**ไฟล์ที่ user ปรับเอง (อย่าทับ)**: p05 · p06 · p14 · config.js (เพิ่ม p00) · book.css (v=5) · book.js (v=5) — เห็นจาก system-reminder ล่าสุด

---

## 11. สิ่งที่ยังต้องทำ (TODO · ถ้าได้รับมอบหมาย)

### Priority 1 · เติมเนื้อหา (ผมเขียนได้ · user review)
- P01 Pre-test ขัดเกลา 3 ข้อวัด conceptual change จริง
- P04 ระบุ 12 กาแล็กซีเฉพาะเจาะจง (ชื่อ NGC/Messier) + ภาพ NASA
- P09 10 galaxy tuning fork · ภาพเรียงจริง
- P10 Dr.Hubble สคริปต์สอน 5 นาทีเต็ม + timing
- P14 expand evidence pool + decoy สมจริงกว่านี้
- P17 Bloom 15 ข้อ · เทียบ O-NET style
- Teacher Cue ทุกหน้า · expand timing + dialogue

### Priority 2 · Assets (user gen · Claude ช่วย prompt)
- 22 ภาพกาแล็กซี (NASA/ESA ฟรี) — **ลิงค์มีใน handoff เก่า sessions**
- VOID hologram · Dr.Hubble station · Warp drive · BOSS 3 phases (Midjourney prompts เขียนไว้แล้ว)
- Milky Way infrared (NASA Spitzer link ตรง)
- optional: เสียง · video clips

### Priority 3 · Multi-device (อนาคต · user สนใจ)
- Refactor state เป็น personal/team/class scope
- `adapter-local.js` + `adapter-firebase.js`
- Team code join · real-time sync
- Teacher console (`teacher.html`)
- **ทำหลัง** EP02 single-device test ในห้องจริงก่อน

### Priority 4 · EP01 upgrade
- ย้อน port game layer ไป EP01 (energy/streak/corruption)

---

## 12. PROMPT สำหรับเริ่มแชทใหม่

```
สวัสดีครับ · ผมทำซีรีส์ COSMOS LOG ดาราศาสตร์ ม.6

EP01 เสร็จแล้ว · EP02 scaffold ครบ 20 หน้า (p00-p19) · รอเติมเนื้อหาจริง

บริบทเต็ม อ่าน 2 ไฟล์นี้:
- wave-mechanics-research/lessons/astronomy/HANDOFF_ep01.md
- wave-mechanics-research/lessons/astronomy/HANDOFF_ep02.md

หลักการที่ห้ามหลุด:
- Book-page flow (1 ไฟล์ = 1 กิจกรรม)
- Experience Before Labeling · P10 เท่านั้นที่ครูสอนเต็ม
- ทุกกิจกรรม Before → Activity → After
- Teacher Cue ทุกหน้า (เปิด-ระหว่าง-ปิด)
- Game layer: Energy · Streak · Bet · Items · Corruption · BOSS
- 1 อุปกรณ์ = 1 ทีม (single-device · multi-device เป็น roadmap)

ตอนนี้อยากทำ ________
```

---

## 13. หมายเหตุ · user เน้นย้ำ

- ผู้ใช้ = ครูฟิสิกส์/วิทย์ ม.ปลาย · วิจัย conceptual change
- **ภาษาไทยเรียบง่าย** · หลีกเลี่ยงศัพท์เทคนิค (refactor · component) · ใช้ "แก้" แทน "edit"
- **1 กิจกรรม = 1 ไฟล์** · แก้ทีละแผ่นง่าย
- **ให้เจนเนื้อหาแบบเฉพาะเจาะจง + ตารางชัด** · ไม่เอากว้าง ๆ
- **ระบุลำดับงานชัด** · "เริ่มจากอะไรก่อน"
- ผู้ใช้ implement เลย ไม่ต้องถามเยอะ · แต่ scope ใหญ่ propose ก่อน
- ผู้ใช้เน้น: เนื้อหา + หนัง + เกม + การสอน + การวัดวิจัย ต้องอยู่ด้วยกัน
- **ของที่ใช้ได้จริงตอนนี้ดีกว่า perfect ที่ยังไม่เสร็จ**
