---
name: game-lesson-builder
description: |
  ใช้ Skill นี้เมื่อผู้ใช้ต้องการสร้าง "บทเรียนแบบเกม" (game-style lesson series) เป็นชุดไฟล์ HTML ในธีม sci-fi/space — โครงเรื่อง 5 องก์ + lab 6 ขั้น + ระบบเกม (เงิน·พลังงาน·HP·combo·shop·boss·mystery box) + UI ดาราอวกาศ
  Trigger: "สร้างบทเรียนแบบเกม", "ทำ lesson series", "EP01/EP02/EP03 ใหม่", "สร้างซีรีส์", "ต่อยอด COSMOS LOG", "บทเรียน sci-fi", "lesson แบบ adventure", "เพิ่มหน้า boss fight", "เพิ่ม shop ในบท", "ทำหน้าเกมแบบ EP03", "เลียนแบบ COSMOS LOG", "ทำซีรีส์การ์ตูนวิทย์ดิจิทัล"
  ⚠️ ถ้าผู้ใช้ต้องการแค่ใบงานเดี่ยว HTML กรอกออนไลน์ → ใช้ interactive-worksheet-builder
  ⚠️ ถ้าต้องการ Word/.docx → ใช้ thai-physics-lesson-builder
  Output: directory lessons/[subject]/[epXX]/ ที่มี 20-27 หน้า HTML + config.js + ใช้ shared modules
  Reference:
    · EP03 (5-องก์ Adventure-driven · 20 หน้า): /Users/komanepapato/Documents/วิจัย/wave-mechanics-research/lessons/astronomy/ep03/
    · EP04 (4-องก์ Lab-build · 27 หน้า · ⭐ recommended): /Users/komanepapato/Documents/วิจัย/wave-mechanics-research/lessons/astronomy/ep04/
---

# Game Lesson Builder

สร้างบทเรียนวิทยาศาสตร์ระดับ ม.ปลาย แบบ "เกม-เรื่องราว" 100 นาที · 20 หน้า HTML · ใช้บน iPad/คอม · เล่นได้ทั้ง solo และ team 2-6 คน

ธีมหลัก: **sci-fi space adventure** — นักเรียนเป็นยานสำรวจ · มี antagonist · มีเป้าหมาย narrative · มีระบบเกม (currency, shop, boss, ending) · มี pedagogy (PEOE, 5E, misconception, Bloom, CRI)

อ้างอิง implementation จริง:
- `lessons/astronomy/ep03/` — COSMOS LOG EP03 · 20 หน้า · 5-องก์ Adventure model
- `lessons/astronomy/ep04/` ⭐ — COSMOS LOG EP04 · 27 หน้า · 4-องก์ Lab-build model (มี starfield + audio + mystery box + mission brief)

---

## เมื่อไรใช้ Skill นี้

ใช้เมื่อผู้ใช้ต้องการ:
- สร้าง EP ใหม่ในซีรีส์ (เช่น EP04, EP05) ต่อจาก COSMOS LOG
- เริ่มซีรีส์ใหม่ในวิชาอื่น (ฟิสิกส์ คลื่น เคมี ฯลฯ) ใน format เดียวกัน
- เพิ่มหน้าเฉพาะ (boss fight, shop, mystery box reward) เข้าบทที่มีอยู่
- refactor บทธรรมดา → ทำเป็น game format

ไม่ใช่:
- ใบงานเดี่ยว/ใบกิจกรรมกระดาษ → ใช้ skill อื่น
- Word doc → ใช้ thai-physics-lesson-builder
- Standalone simulation → ใช้ physics-simulation-builder

---

## สถาปัตยกรรมหลัก (Architecture)

### Directory layout
```
lessons/<subject>/
├── shared/                       # โมดูลกลาง · ใช้ร่วมทุก EP
│   ├── book.css                  # CSS base
│   ├── photon.js                 # Coin + Photon + ShopItems · pill มุมขวาบน
│   ├── voidhunter.js             # antagonist meter (EP03 only)
│   ├── sync-client.js            # multi-iPad sync
│   ├── role-view.js              # role-based visibility
│   ├── transition.js             # cinematic transitions
│   ├── touch-drag.js             # iPad touch drag-drop
│   ├── teacher-remote.html       # teacher dashboard base
│   ├── ep03-boot.js              # EP03 boot
│   ├── ep04-boot.js              # ⭐ EP04 boot · auto-init starfield+audio
│   ├── starfield.js              # ⭐ canvas BG · ทุก EP04 page
│   ├── audio.js                  # ⭐ SFX (Web Audio · no files) · toggle ซ้ายบน
│   ├── mission-brief.js          # ⭐ briefing card auto-inject
│   └── mystery-box.js            # ⭐ tier reward overlay
└── <epXX>/
    ├── config.js                 # EP_CONFIG · pages, briefings, massTracks, routeStars
    ├── _page-style.css           # ep-specific
    ├── index.html                # ep cover
    ├── join.html                 # team join
    ├── teacher.html              # teacher console
    ├── pXX-*.html                # 20-27 narrative + activity pages
    ├── shop.html / pXX-shop.html # mid-episode shop
    └── boss.html / hypernova.html / warprun.html  # main boss
```

### Page count: **20–27 หน้า** (ปรับตามโครง)
- EP03 = 20 หน้า · 5-องก์
- EP04 = **27 หน้า** · 4-องก์ (Lab-build heavy) — ดู [`references/ep04-structure.md`](references/ep04-structure.md)
- เวลารวม ~100 นาที (3-6 นาที/หน้า)

---

## โครงเรื่อง · 2 รูปแบบให้เลือก

### รูปแบบ A · 5 องก์ Adventure-driven (EP03 model)

ใช้เมื่อเนื้อหาเล็ก/แคบ · narrative drives lab:

| ACT | บทบาท | หน้า |
|-----|------|----|
| **1 · HOOK** | เปิดเรื่อง · จดหมาย/ภัย · pre-test | p00-p03 |
| **2A · MYSTERY 1** | TEACH → INVEST → REVEAL | p04-p06 |
| **2B · MYSTERY 2** | TEACH → INVEST → DILEM → CINE | p07-p10 |
| **3 · MIDPOINT** | TEACH (5 นาที) → INVEST | p11-p12 |
| **4 · CRISIS** | CINE → TEACH → INVEST climax | p13-p15 |
| **5 · SHOP+CLIMAX+ENDING** | recap → shop → boss → post-test → reflection | p16-p19 |

### รูปแบบ B · 4 องก์ Lab-build → Discovery → Adventure (EP04 model) ⭐

ใช้เมื่อเนื้อหากว้าง/ต้องสร้างความรู้หลายเลเยอร์ · lab drives narrative:

| ACT | บทบาท | หน้า | เวลา |
|-----|------|----|---|
| **A · ARRIVAL** | recap · pre-test · มาถึงเหตุการณ์ · เห็นปัญหา · วางแผน · บทบาท | p00-p03 | ~14 นาที |
| **B · LAB 1 (Knowledge Build #1)** | lab-1.1 → lab-1.2 → theory → 🎁 consolidation #1 → 🎁 consolidation #2 → summary | p04-p09 | ~21 นาที |
| **C · LAB 2 (Knowledge Build #2 + Discovery)** | bridge → context → mini-lab → main-lab → 🎁 order → match → 🎮 mini-game → father's lab/discovery | p10-p17 | ~28 นาที |
| **D · SYNTHESIS+JOURNEY** | full reveal → antagonist face-to-face → 🎁 decision → post-test → sequencer → shop → 🔥 boss → rescue → badge | p18-p26 | ~37 นาที |

**ข้อดีของรูปแบบ B:**
- เด็กสร้างความรู้เป็นชั้น ๆ · ลดอาการ "งงเรียนทำไม" เพราะทุก lab ผูกกับเป้าหมาย "เลือกเส้นทาง" ที่ ACT D
- Mystery Box ใส่ในแต่ละ ACT (4 จุด) · keep engagement สูง
- Boss กลไกเดิม · แต่ "เลือกทาง" ใน p20 ทำให้รู้สึก ownership

**Page types** (ใส่ใน `<body data-type>`):
- `story` · narrative cinematic (อ่าน · ดูภาพ · กดต่อ · ไม่ส่งผล)
- `setup` · join, shop, configuration
- `puzzle` · interactive activity (drag-drop, slider, tap-classify, tap-chips)
- `mixed` · combo (e.g. boss = HUD + puzzle + animation)
- `reflection` · pre/post-test, journal, badge

### หน้า Lab activity · 2 patterns

**Pattern 1 · 6-step PEOE (deep · 1 lab/EP)** — เมื่อเนื้อหาต้องสำรวจหลายมิติ
```
1 · PREDICT   → "ก่อนเริ่ม · เดาก่อน"
2 · EXPLORE   → 3 มินิแล็บ tabs
3 · MEASURE   → slider/dial · อ่านค่า
4 · ANALYZE   → จัดข้อมูลในตาราง
5 · NOTE      → ✓/✗ classify + reflect
6 · PEER      → tap-chips เหตุผล (ไม่พิมพ์)
```
ตัวอย่าง: `lessons/astronomy/ep03/p08-arrive.html`

**Pattern 2 · Slider-Lab + Drag-Match (light · หลาย lab/EP)** ⭐ EP04
แบ่ง lab ใหญ่ออกเป็น 2-3 หน้าเล็ก:
```
Lab 1.1 · Slider observe (เลื่อนดู · ตอบ 2 quiz)
Lab 1.2 · Drag-to-match (ลาก N รายการเข้าช่อง · กด "เปรียบเทียบ" · ทำซ้ำจนถูก)
+ Theory page (mnemonic + table)
+ Consolidation pages (apply กับ data จริง · 🎁 box)
```
ตัวอย่าง: `lessons/astronomy/ep04/p04-spectrum-slider.html` + `p05-drag-match.html` + `p06-obafgkm.html` + `p07-group-code.html`

อ่านรายละเอียดโครงเรื่อง + ตัวอย่างที่ [`references/story-structure.md`](references/story-structure.md)

---

## เนื้อเรื่อง (Narrative)

### องค์ประกอบบังคับ
1. **Protagonist** · ทีมยานสำรวจ (นักเรียน) · มีเป้าหมายชัด (ส่งสัญญาณ · ช่วย NPC · etc.)
2. **Antagonist** · ตัวร้ายที่ใส่ misconception (เช่น VOIDHUNTER ใน EP03 · VOID claims ที่ผิดวิทย์)
3. **Mentor / NPC** · ที่ปรึกษา (เช่น Dr.Hubble · ให้ context, hints)
4. **Stakes** · นาฬิกาเดิน (ดาวระเบิด · ภัยใกล้)
5. **Multiple Endings** · 3-4 ตอนจบ (A · A+ · B · C/D) · ขึ้นกับ choices ในเกม
6. **Misconception Inventory** · M1, M2, M3... · target ในแต่ละหน้า

### Narrative arc ตัวอย่าง (EP03)
```
HOOK    : ได้ SOS "ARYA" จากดาวห่าง 400 pc · พ่ออารยาที่หายไป
MYSTERY : ระยะดาว · ความสว่าง · ปล่อยรหัส
CRISIS  : เปิดกล่องพ่อ · ดาว SOS กำลัง supernova
CLIMAX  : หนี VOIDHUNTER (boss fight) · เลือกจะส่ง beacon ไหม
ENDING  : A=ส่งสำเร็จ + Arya resolve · B=ไม่ส่ง · C=ดาวระเบิดก่อน · D=energy หมด
```

### Misconception Traps
ทุกบทต้องมี **3-5 misconception** ที่ targetting ตรง · ใส่ใน:
- Pre-test (p01) วัดก่อน
- Boss claims (เช่น "ดาวสว่างที่สุด = ปล่อยแสงจริงเยอะ")
- Lab note classify (✗ statements)
- Post-test (p19) วัดหลัง · คำนวณ gain ต่อ misconception

อ่านรายละเอียด narrative + ending logic + misconception design ที่ [`references/pedagogy.md`](references/pedagogy.md)

---

## กลไกเกม (Game Mechanics)

### ระบบ currency 3 ตัว
| Currency | สัญลักษณ์ | ได้จาก | ใช้กับ |
|---|---|---|---|
| **🪙 Coin** | global · cross-EP | ตอบ perfect · กล่องสุ่ม | ซื้อ shop items |
| **⚡ Energy** | per-fight (boss) | รีเซ็ตทุก boss | คอสต์ทุกการตอบ + โดน boss ยิง |
| **✦ Photon** | global · cross-EP | กิจกรรม · กล่องสุ่ม | ส่ง beacon (เลือก ending A) · meter |

### ระบบ Combo / Streak
- ตอบถูกติดต่อกัน → streak ×1.5 ที่ 3, ×2.0 ที่ 5
- ตอบผิด → reset
- ใส่ visual feedback: combo number floats, color flash

### ระบบ Boss Fight
- HP รวม 300 · 3 phases (100 HP/phase)
- Antagonist eye centerpiece (CSS-animated · iris + rings + charge arc)
- Charge timer: VH ชาร์จ 10 วิ → ยิง player (energy −30, screen shake + flash)
- Player ตอบ Q → projectile บินจากปุ่ม → boss eye → damage
- Phase intro overlay (full-screen reveal)
- Beam animation when VH fires (red laser line)
- Multi-ending after victory + supernova countdown

### ระบบ Shop (mid-episode)
- 6 items · 3 strategies (DPS / Tank / Ending A focus)
- Item types: passive (always-on) · active boost (×2 damage) · 1-shot (cloak skip)
- ราคาคำนวณจาก coin ที่เก็บได้ในครึ่งแรกของ EP

### ระบบ Mystery Box (กล่องสุ่ม) — reward tier
ใช้หลังกิจกรรมสำคัญ (lab note submit, boss victory, perfect quiz):
| Tier | เงื่อนไข | จำนวน | สูตรสุ่ม |
|---|---|---|---|
| 1 PERFECT | ผิด 0 | 3 ชิ้น | coin + photon + item · ค่าเต็ม |
| 2 GOOD | ผิด 1-3 | 2 ชิ้น | สุ่ม 2 จาก 3 · ค่าลด 50% |
| 3 PASS | ผิด ≥4 | 1 ชิ้น | สุ่ม 1 · เฉพาะของถูก ≤60 coin |

Banner ติด **บนหัวหน้า** ที่มี mystery box เพื่อให้ user รู้ตั้งแต่เริ่ม

### ระบบ Touch + Drag-Drop
ใช้ `shared/touch-drag.js` — HTML5 drag-drop ไม่ fire บน iPad · ต้องมี touch fallback
- `TouchDrag.makeDraggable(el, () => payload)` + ตั้ง dragstart ปกติด้วย
- `TouchDrag.makeDropTarget(el, (payload, x, y) => {...})` + ตั้ง drop ปกติด้วย
- ใช้ shared `tryPlace*(payload, x, y)` function ให้ทั้ง mouse และ touch เรียกใช้

อ่านรายละเอียดทุกระบบ + code patterns ที่ [`references/game-mechanics.md`](references/game-mechanics.md)

---

## วิธีการนำเสนอ (Presentation)

### Color palette (ห้ามเปลี่ยน — เป็น brand)
```
Background: #02030a → #04050d (พื้นมืดล้วน · ห้ามมีสว่าง)
Accent purple: #b980ff (boss · phase)
Accent pink: #ff5c7a (danger · antagonist)
Accent cyan: #64d8ff (info · drop targets)
Accent green: #7effb2 (correct · health · go)
Accent gold: #ffcb6b · #ffd700 (currency · perfect)
Lavender: #d4b8ff (mentor voice · narrative)
Text: #e8ecf8 (body) · #9aa3c0 (muted) · #6a7394 (very muted)
```

### Typography
- Heading + UI labels: **Orbitron** (sci-fi · letter-spacing 0.15-0.2em · uppercase)
- Body: regular sans (system default · Thai = ฟอนต์มาตรฐาน)
- Numbers/code: **monospace** (HP · scores · coordinates)

### Animations + Effects (จุดยืน UX)
- **Starfield canvas BG** ในหน้า boss/climax (สำคัญ · ทำให้รู้สึกอวกาศจริง)
- **Pulse glow** ที่ปุ่ม danger / element สำคัญ (animation 1.4-2s ease-in-out infinite)
- **Shake + red flash** เมื่อโดน damage (body class shake + ::before red overlay)
- **Floating popup numbers** เมื่อ damage/reward (Orbitron · text-shadow glow · animation 1s up + fade)
- **Phase transition** full-screen overlay เมื่อขึ้น phase ใหม่ (rotateY card reveal)
- **Confetti / glow burst** ที่ moment perfect

### Layout patterns (สำคัญ)
- **Sticky climax bar** ด้านบน (supernova timer + energy HUD) ในหน้า boss
- **Status bar 3-cell grid** (energy · photon · meter) — ห้ามแยกให้ user ตามหา
- **Reward banner** ที่หัวหน้าที่มี mystery box (user ต้องเห็นตั้งแต่เริ่ม)
- **Ending gate** = card glow center + 2 column buttons (send / skip)

อ่าน CSS palette + animations เต็ม + screenshot reference ที่ [`references/presentation.md`](references/presentation.md)

---

## Shared Modules (สำคัญ — ต้องเข้าใจก่อนเริ่ม)

ทุก EP โหลด script เหล่านี้ก่อน page-specific JS:
```html
<script src="../shared/firebase-config.js"></script>
<script src="./config.js"></script>
<script src="../../shared/pace-client.js"></script>
<script src="../shared/sync-client.js"></script>
<script src="../shared/photon.js?v=2"></script>
<script src="../shared/role-view.js"></script>
<script src="../shared/touch-drag.js?v=1"></script>      <!-- only if drag-drop -->
<!-- ========== EP04 atmosphere stack (recommended) ========== -->
<script src="../shared/starfield.js?v=1"></script>       <!-- BG canvas -->
<script src="../shared/audio.js?v=2"></script>           <!-- SFX + toggle (left) -->
<script src="../shared/mission-brief.js?v=1"></script>   <!-- briefing component -->
<script src="../shared/mystery-box.js?v=1"></script>     <!-- reward box -->
<!-- ========== Boot must be last (auto-init all above) ========== -->
<script src="../shared/<epXX>-boot.js?v=2"></script>
```

### Modules · ใช้ทุกหน้า (core)
- **`Boot`** · auto-init สิ่งที่หน้าทุกหน้าต้องการ (header, footer, role badge, starfield, audio toggle)
- **`Chain`** · localStorage state ส่งต่อระหว่างหน้า
- **`Gate`** · ปุ่ม "ไปต่อ" ล็อก/ปลด (เงื่อนไข: submit + teacher pace)
- **`Submit.wirePair`** · auto-wire submit + next button + payload + perfect bonus
- **`Coin/Photon`** · global currency · `.add()` `.spend()` `.get()` · pill มุมขวาบน
- **`ShopItems`** · `.buy()` `.use()` `.grant()`
- **`Sync`** · multi-iPad room (auto-creates SOLO if no team)
- **`Role`** · `data-role="nav"` → แสดงเฉพาะ Navigator
- **`Transition`** · `Transition.play(tag, callback)` cinematic between pages

### Modules · UX/Atmosphere (เพิ่มจาก EP04) ⭐
- **`Starfield`** · canvas BG ทุกหน้า · auto-init ผ่าน boot · CPU เบา (~1-2%)
- **`SFX`** (audio.js) · Web Audio API tones (no files) · 8 sounds · default OFF
  - toggle 🔇/🔊 มุมซ้ายบน (เพื่อไม่ทับ pill ขวาบน)
  - haptic fallback ผ่าน navigator.vibrate
  - sounds: correct, wrong, tap, snap, charge, hit, box, transition
- **`MissionBrief`** · auto-inject component · อ่าน `EP_CONFIG.briefings[pageId]` แล้ว render
  - หน้าที่ใช้ใส่ `<div data-mission-brief></div>`
  - 2 styles: `type:'void'` (taunt) / `type:'leader'` (briefing)
  - แต่ละ brief มี: goal, criteria[], time, reward
- **`MysteryBox`** · `MysteryBox.roll({ wrongs, page })` → overlay + animated reveal
  - Tier 1 PERFECT (0 wrong) · 3 drops · full value
  - Tier 2 GOOD (1-3) · 2 drops · 50% value
  - Tier 3 PASS (≥4) · 1 drop · low value

### TouchDrag · drag-drop iPad-friendly
- `TouchDrag.makeDraggable(el, () => payload)`
- `TouchDrag.makeDropTarget(el, (payload) => {...})`
- ต้องใช้คู่กับ HTML5 dragstart/drop events (universal)

อ่านรายละเอียด API + ตัวอย่าง wiring ที่ [`references/shared-modules.md`](references/shared-modules.md)

---

## Interaction Patterns ⭐ (EP04 vocabulary)

ใช้ pattern เหล่านี้แทน "พิมพ์ตอบ" เพื่อรักษา flow + เก็บ data ได้ดีกว่า:

| Pattern | กลไก | ตัวอย่าง | KPA หลัก |
|---|---|---|---|
| **Spectrum Slider** | slider เลื่อนดูค่าต่อเนื่อง · update visual real-time · ปลดล็อกเมื่อเลื่อนผ่านครบ N ช่วง | p04 (สี↔อุณหภูมิ) · p12 (มวล↔ขนาด) | K1, P1 |
| **Drag-to-Match w/ Compare** | ลาก N items → ช่อง → กด "เปรียบเทียบ" → ของผิดเด้งกลับ → ทำซ้ำจนถูก | p05 (ดาว 7 → OBAFGKM) · p07 (ดาวจริง → bin) · p08 (อุณหภูมิ bucket) | K1, K3, P1 |
| **Tap-Classify Race** | timer · tap ปุ่มที่ถูก · live counter ผิด/ถูก · pip รายข้อ | p11b/p16 (mass→endpoint 30 วิ) | K3, P3 |
| **Drag-Order Sequence** | ลาก phase cards → slot 1→N → กด "ตรวจ" · ของผิดเด้งกลับ | p14 (5 mass tracks evolution order) · p22 (story sequencer) | K2, K4 |
| **Tab-Reveal w/ Visit Tracking** | tabs ต้องกดดูครบทุก tab จึงปลดล็อก submit | p13 (5 mass tracks tabs) | K2 |
| **Path Selector + Mystery Box** | map + 4 SVG curved paths · pick 1 · safest = best box · hide hints | p20 (4 paths through stars+BH) | A2, P3 |
| **Tap-Chip 3-2-1 Reflection** | แทน text input · tap N chips จาก pool · ปลดล็อกเมื่อครบ | p19/p26 reflection · p05 step6 PEER | A1, A3 |
| **Hidden Collectible** | ของลึกลับโผล่กลางกิจกรรม · กดเก็บ → save Chain · ใช้ใน boss | p07 (Black Dwarf appears at 6/11) | engagement |

**กฎเหล็ก:** **ทุกกิจกรรมที่เคยใช้ textarea → เปลี่ยนเป็น tap-chip หรือ drag** เพื่อ:
- เก็บ data structured (ไม่ต้องแปล text)
- เด็กไม่หลีกเลี่ยงด้วยพิมพ์มั่ว
- iPad-friendly (ไม่ต้องเรียก keyboard)

---

## Mission Briefing Pattern ⭐

ทุกหน้ากิจกรรมหลัก (lab/puzzle/decision) ใส่ briefing card บนหัวเพื่อบอก "ทำอะไร · ทำไม · เกณฑ์":

```html
<body data-page="p05" ...>
  <span class="lbl puzzle">...</span>
  <h1>...</h1>
  <div class="tags"><span class="kpa-chip">...</span></div>

  <div data-mission-brief></div>     <!-- ✅ inject ตรงนี้ -->

  <div class="card lavender">...</div>
  ...
```

ใน `config.js` กำหนด briefing:
```js
briefings: {
  p05: { type:'void', no:'02',
    taunt:'"...VOID พูดยุ..."',          // ถ้า type='void'
    // หรือ brief:'...' ถ้า type='leader'
    goal:'อะไรคือเป้าหมายของหน้านี้',
    criteria:['เกณฑ์ที่ 1','เกณฑ์ที่ 2'],
    time:'5 นาที', reward:'🎁 Mystery Box'
  },
  // ...
}
```

**สลับ type:** void (taunt/รบกวน) ↔ leader (สอน/แนะนำ) ในหน้าต่าง ๆ ให้ไม่จำเจ

---

## Workflow สร้าง EP ใหม่

### ขั้นที่ 1 · ออกแบบ (offline · กับครู)
1. ระบุ **objective K/P/A** (Knowledge, Process, Affective) · 4-6 รายการ · map กับหน้า
2. ระบุ **misconception 3-5 ตัว** · ตั้งโค้ด M1, M2, M3 · target ใน boss claims
3. ออกแบบ **narrative arc** · พระเอก, antagonist, mentor, stakes, ending tree
4. วาง **page outline** 20 หน้า ตาม 5 ACTs · ใส่ time budget (รวม 100 นาที)

### ขั้นที่ 2 · ตั้ง config + index
1. สร้าง `lessons/<subject>/<epXX>/`
2. Copy `templates/episode-config.js` → `config.js` แล้วแก้ค่า:
   - id, title, subtitle, badge
   - pages array (page id, file, title, type, time)
   - objectives, roles, shop items, boss config
3. Copy `templates/index.html` → `index.html` (ep cover · auto loads page list)
4. Copy `templates/_page-style.css` (overrides จาก book.css)

### ขั้นที่ 3 · สร้างหน้าทีละหน้า
ใช้ template ที่เหมาะกับ page type:
- **Story page** (narrative + กดต่อ) → `templates/story-page.html`
- **Puzzle page** (lab activity 6-step) → `templates/puzzle-page.html`
- **Boss page** (climax) → `templates/boss-page.html`
- **Shop page** → `templates/shop-page.html`
- **Reflection page** (post-test, journal) → `templates/reflection-page.html`

แต่ละหน้า:
- Body: `<body data-page="pXX" data-type="story|puzzle|setup|mixed|reflection">`
- Header: title + tags (K1, P3, A4 chips)
- Content: ใช้ classes จาก book.css (`.card`, `.q-prompt`, `.choice-row`, `.step-card`)
- Footer: `<div class="btn-pair">` submit + next button
- Teacher cue: `<details class="tc">` ด้านล่าง (ครูดูได้)
- Scripts: shared block (ดูบน) + page logic + `Submit.wirePair({...})`

### ขั้นที่ 4 · เชื่อม chain + state
- Page A เก็บข้อมูลด้วย `Chain.set('keyName', value)` 
- Page B อ่านด้วย `Chain.get('keyName')` → ใช้ตัดสินใจ render

### ขั้นที่ 5 · ทดสอบ
- เปิด `?solo=1` ทุกหน้า (ข้าม teacher gate · เล่นทดสอบเอง)
- ทดสอบ flow: index → page 0 → ... → ending
- ทดสอบ payload submit (ดู localStorage `cosmosLog_<ep>_submit_*`)
- เปิด teacher.html ทดสอบ pace control

### ขั้นที่ 6 · update memory + handoff
- เขียน `HANDOFF_<epXX>.md` สำหรับ session ถัดไป
- update memory file `project_<subject>_lesson_path.md`

---

## ข้อควรระวัง (Gotchas จาก EP03)

อ่าน [`references/gotchas.md`](references/gotchas.md) ก่อนเริ่มทุกครั้ง · ที่เคยเจอบ่อย:

1. **Cache busting**: shared script ต้องมี `?v=N` query · ถ้าแก้ shared module ต้องบัมพ์ version ทุก page
2. **rAF ไม่ fire ใน preview iframe**: ใช้ `setInterval(fn, 16)` แทน `requestAnimationFrame` ใน animation critical
3. **HTML5 drag-drop ไม่ fire บน touch**: ต้องคู่กับ TouchDrag fallback
4. **`body > *` z-index rule** ทับ position:fixed: ต้อง exclude FX classes (`.projectile`, `.dmg-pop`, `.beam-fx`)
5. **Custom MIME drag types** ไม่รองรับทุก browser: setData ทั้ง `'cid'` (custom) และ `'text/plain'` (universal)
6. **Energy vs Photon confusion**: ⚡ icon ใช้ทั้ง 2 → ใส่ ENERGY HUD ให้เด่นชัดในหน้า boss · label ภาษาไทยให้ชัด
7. **Submit button + Next button gating**: ใช้ `Submit.wirePair` (auto-wire) · ห้ามวาง custom logic
8. **Curriculum scope**: ตรวจสอบกับครูเสมอว่าอะไรเกิน/ไม่เกินหลักสูตร
9. **HUD overlap**: pill (Coin/Photon) อยู่มุม **ขวาบน** · audio toggle อยู่มุม **ซ้ายบน** · ห้ามทับกัน (EP03 เคยพลาด · EP04 แก้แล้ว)
10. **Slider range**: ถ้าใช้ tier-based slider (เช่น p12 mass · 5 tiers) · ใช้ value 0-100 step 1 และแบ่ง getMass(v) ตาม % ของ slider · อย่าใช้ log scale ที่อาจไม่ครอบคลุม edge case
11. **Path visualization**: ถ้ามีดาว 2 หน้า (เช่น p02 + p20) · ใช้ POS ชุดเดียวกันจาก `EP_CONFIG.routeStars` เพื่อให้นักเรียนคุ้นเคย
12. **Black hole / danger obstacle**: ถ้ามีเส้นทางหลายทาง ออกแบบให้ obstacle อันตรายอยู่ใน "เขต" ที่มีแค่ 1 path ผ่าน (ไม่ให้ path ปลอดภัยข้ามเส้นโค้งใกล้ obstacle ทำให้ visual misleading)
13. **No-typing**: หลีกเลี่ยง `<textarea>` · แทนด้วย tap-chips จาก list ตายตัว · เก็บ data structured

---

## Reference files

อ่านเฉพาะที่จำเป็นเมื่อ task เกี่ยวข้อง:

- [`references/story-structure.md`](references/story-structure.md) — 5 ACTs + 6-step lab cycle เต็ม + ตัวอย่าง EP03 page-by-page
- [`references/ep04-structure.md`](references/ep04-structure.md) ⭐ — 4-องก์ Lab-build model · 27 หน้า · interaction patterns · per-act cheatsheet
- [`references/game-mechanics.md`](references/game-mechanics.md) — currency / boss / shop / mystery box · code patterns + tuning numbers
- [`references/presentation.md`](references/presentation.md) — CSS palette · animations · responsive · screenshot reference
- [`references/shared-modules.md`](references/shared-modules.md) — Boot, Chain, Gate, Submit, Coin, Photon, ShopItems, Sync, Role, Transition, TouchDrag · API + examples
- [`references/pedagogy.md`](references/pedagogy.md) — misconception inventory, 5E cycle, Bloom levels, CRI, pre/post-test, learning objectives
- [`references/gotchas.md`](references/gotchas.md) — bugs ที่เคยเจอ + วิธีแก้

## Templates

- [`templates/episode-config.js`](templates/episode-config.js) — `EP_CONFIG` boilerplate
- [`templates/story-page.html`](templates/story-page.html) — narrative cinematic
- [`templates/puzzle-page.html`](templates/puzzle-page.html) — lab activity 6-step
- [`templates/boss-page.html`](templates/boss-page.html) — climax fight
- [`templates/shop-page.html`](templates/shop-page.html) — mid-episode shop
- [`templates/reflection-page.html`](templates/reflection-page.html) — post-test/journal
- [`templates/index.html`](templates/index.html) — ep cover

---

## หลักการสำคัญ (Mental model)

1. **Story first, mechanic serves story** — กลไกเกมต้องรับใช้เนื้อเรื่อง ไม่ใช่ในทางกลับกัน
2. **Misconception is the enemy** — antagonist พูด misconception · activity แก้ misconception · post-test วัด misconception
3. **Pedagogy hidden in fun** — เด็กรู้สึกว่าเล่นเกม แต่ครูเก็บ data PEOE/CRI/gain ได้
4. **Multi-iPad first** — ออกแบบให้ทำงานทั้ง solo และ team แต่แรก · อย่าเพิ่ม role-split ทีหลัง
5. **Teacher in loop** — ทุกหน้ามี Teacher Cue (`details.tc`) · teacher.html คุม pace ได้
6. **Cache + cleanup** — แก้ shared = บัมพ์ ?v= · ห้าม leak state ระหว่าง EP
7. **Lab serves journey** ⭐ — ทุก lab ต้องผูกกับ "เป้าหมายภารกิจ" ใน ACT D · อย่ามี lab ลอย ๆ
8. **Hands-on > click-through** ⭐ — drag/slider/tap-classify แทน choose-and-click · เด็กต้อง engage cognitively ทุก click
9. **No-typing** ⭐ — tap chips/select แทน textarea · iPad-friendly + structured data
10. **Mystery box at every milestone** ⭐ — ทุก consolidation/decision = mystery box (4 จุด/EP) · keep motivation
11. **Mission Briefing transparent** ⭐ — ทุกหน้ากิจกรรมต้องบอก goal + criteria + reward ก่อนเริ่ม · ไม่ให้เด็กงง
