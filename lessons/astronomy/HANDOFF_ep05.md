# HANDOFF · COSMOS LOG EP05 · v9 RACE-FORGE-FIGHT · POWER FORGE + Pedagogy Polish

> ใช้เพื่อเริ่มแชทใหม่โดยไม่เสียบริบท · ก่อนทำงานต่อ ให้อ่านไฟล์นี้ + `HANDOFF_ep04.md`

**วันที่บันทึกล่าสุด**: 2026-04-29 (v9)
**สถานะ EP05**: 🟢 **v9 = v8 + ปิด narrative loop (HELION → POWER FORGE → BOSS) · pedagogy upgrade · system fix · simulation rebuilds**

## v9.1 hotfix · 2026-04-30 · Voyager Cache shop กลับมา
- **ปัญหา:** v9 แทน p24 shop เดิมด้วย POWER FORGE → ระบบ 🪙 + ShopItems หายไปจาก flow
  - p25 boss อ่าน `Chain.get('shopBought').auroraToken` สำหรับ A+ legacy combo · ก่อนหน้านี้ไม่มีหน้าให้ซื้อ
- **แก้:** เพิ่ม `p24-shopb.html` (Voyager Cache) ระหว่าง p24 (Power Forge) → p25 (Boss)
  - ใช้ `EP_CONFIG.shop.items` 6 รายการเดิม (sunDecoder · fluxSensor · auroraToken · plasmaPulse · cloakSkip · whisper)
  - sync `Chain.set('shopBought', ShopItems.load())` ทุกครั้งที่ซื้อ + ก่อน proceed
  - A+ Banner สถานะ Aurora Resonance + Coronal Token (real-time)
  - Wallet sticky · 🪙 + ⚡ photon
- **Routing เปลี่ยน:** p23 → p24 (Forge) → **p24b (Shop)** → p25 (Boss)
  - p24 `btnGoBoss` ไป `p24-shopb.html` (เดิมไป p25)
  - config.js เพิ่ม entry p24b · title p24 = "Power Forge · ปลดล็อกพลัง"

## v9 highlights (session · 2026-04-29)

### 🎮 Game Loop Closure · RACE → FORGE → FIGHT
- **p11 Mission Briefing** rewrite · Aryah THESIS เป็นกล่องเด่นกลาง + MISSION ROADMAP (8 rows · เรียน→ใช้)
- **p24 POWER FORGE** (ใหม่ทั้งหน้า · แทน shop เดิม) · 3-phase code box:
  - Phase 1: 6 orbs วงกลมรอบกล่อง · กดตอบคำถามทบทวน → ได้ digit 1 ตัว
  - Phase 2: 6 input slots ลำดับสุ่มทุก session · ใส่ digit ตามสีกรอบ slot match กับสี orb · realtime validation badge (✓ icon / ✕)
  - Phase 3: 6 powers ปลด · loadout ส่งต่อ p25
  - รหัส: h1=4 h2=1 h3=7 h4=3 h5=8 h6=2
- **p25 BOSS · powers wired** อ่าน `Chain.bossPowers`:
  - shield (h4) auto block CME pulse 1
  - warning (h5) auto pre-pulse 2s
  - burst (h1) auto save 1 wrong → half thrust
  - insight (h2) tap reveal correct
  - timeBubble (h3) tap +6h ETA
  - prismatic (h6) passive unlock A+ ending
  - intelHint (legacy p14) ยังใช้งาน · zone 2 only
- **HELION grant popup** (`_burst` ใน ep05-boot.js) ใหญ่ขึ้น · backdrop blur + 6 progress pips + power preview block ทอง · auto-dismiss 3s (4s ครั้งสุดท้าย) · click ปิดได้
- **MISSION OPENER** ใส่ทุก engage (p05a-p10a) · บอก HELION ที่ตามหา + จะแลกเป็นพลังอะไร (yellow dashed box)

### 🪐 ATMOSPHERIC LAYER CARDS (3 ชั้นบรรยากาศชัดเจน)
- เพิ่มใน p08a/p09a/p10a · ขึ้นเป็น **หัวข้อหลัก** เหนือ MISSION OPENER
- Cross-section diagram (130×110px · sun + 3 nested arcs · current highlighted glow)
- Layer name **ใหญ่ 32px** (clamp 24-32px · responsive) + subtitle italic
- Stack mini pip "1·PHOTO → 2·CHROMO → 3·CORONA" (current = solid color)
- บอก temp + ความหนา + phenomenon ของชั้นนั้น

### 🔁 RECALL CHECK (5 bridges p06-p10)
- 1 quick MCQ ในทุก bridge ทบทวน scene ที่เพิ่งจบ
- Reward +5 🪙 first try (key `cosmosLog_ep05_recall_<page>`)
- Non-gating · ตอบผิดยังกด Next ได้
- คำถาม: fusion (p06) · photon walk (p07) · convection (p08) · sunspot dark (p09) · flare 8min (p10)

### 🎨 Simulation Rebuilds (4 หน้าใหญ่)

**p03 origin-zones** · Drag-Ship Timeline แทน slider:
- Gradient bar (ม่วง→ส้ม→เหลือง) · ship 🚀 ลากไปขวา · 3 tick mark
- ลบ slider · stages animate ตามตำแหน่งยาน (4 zones · seen ครบ→Phase 3)
- Stage 2 (Disk) + Stage 3 (Protosun) · disk วางระนาบ + particles หมุนรอบแกน (3D illusion · scale + z-index + opacity by orbit phase)
- Protosun · split disk (clip-path) · back z=1 · sun z=3 · front z=5 → wrap-around effect

**p08c Active Region Scanner** (multi-iter · ลงเอยที่):
- Compass Detector · ลากเข็มทิศบนผิว · เข็มหมุนเร็ว = active region
- 3 active + 3 trap (parallel-arch · decaying · filament) + 3 weak decoy
- Trap reasoning: ต้องเลือกเหตุผลถูก 3 ข้อด้วย
- Misclick limit 5

**p09a Solar Flare Engage** · NASA SDO image background:
- `assets/Solar Flare.png` (12 MB) เป็น background
- 4 pulse markers + labels (ACTIVE REGION 1 · FLARE SITE · 2 PROMINENCE LOOP)
- Tag "📷 NASA SDO · Hα 6563Å · CHROMOSPHERE" + credit

**p09b Solar Flare Run** · 4-button D-pad + 60s timer + ไปต่อ button:
- ลบ drag-rocket · เปลี่ยนเป็น 4 ทิศ hold-to-move (✛ pad)
- 60-second countdown + คะแนน (รอบที่ผ่าน X / ตาย Y)
- ถึง FINISH → ปุ่ม "✓ ไปต่อ →" overlay สีทอง · กดยาน warp กลับ START + รอบ+1
- 3+ รอบ = ECHO TOKEN · 1-2 รอบ = ผ่านแบบไม่ได้ token · 0 = ไม่ผ่าน
- ↻ START / เริ่มใหม่ button (state machine: idle/playing/dead/finished)

**p10b Corona Explore** · drag-ship cross-section + chart:
- ลบ slider · เปลี่ยนเป็น sun cross-section 6 ชั้น (Core→Corona) · ลากยาน 🚀 ไปทางขวา
- Chart bars highlight + glow ตำแหน่ง ship · มีเส้น dashed เชื่อม T แต่ละชั้น (เห็น paradox)
- Layer info card สีตามชั้น · เปลี่ยน real-time
- Coronal Heating Paradox highlighted ที่ corona

### 🎯 p21 Deflect-Path Rebuild
- เปลี่ยนตัวเลือกจาก [L1, Asteroid Belt, Jupiter, Earth Field] → **[L1, Geosync, L2, Earth Field]**
  - Asteroid Belt 2.7 AU + Jupiter 5.2 AU = ไกลกว่าโลก ขัดฟิสิกส์
  - L1 ✓ correct · Geosync ⚠️ ใกล้เกิน · L2 ❌ หลังโลก · Earth Field ❌ passive
- Icons เปลี่ยนเป็นอุปกรณ์ภารกิจ (🛰️📡🔭🛡️) ไม่ใช่ planet/moon → ไม่สับสนกับโลก
- Earth ขยาย 36→48px · gradient ดีขึ้น · มี orbit ring + glow pulse + label "🌍 EARTH"
- Sun เพิ่ม label "☀️ SUN"
- เพิ่ม dashed line เชื่อม Sun ↔ Earth (visualize CME path)
- **GOAL CARD ใหญ่บนสุด** · บอก mission ในประโยคเดียว + 3 steps + lever-arm physics hint
- h1 เปลี่ยนเป็น "มี deflector 1 ตัว · วางที่ไหนเบี่ยง CME ออกจาก Earth ได้มากที่สุด?"

### 🪙 ระบบ Currency · Bug Fixes
- **Photon (⚡)** · pre-bug: อ่านจาก `Sync.getState()` → solo play return 0 ทุกหน้า
- **Fix**: ใช้ `localStorage` (key `cosmosLog_photon`) เป็นหลัก · sync optional · init จาก `EP_CONFIG.photon.start = 30`
- **Coin (🪙)** · awardPerfect key prefix แก้จาก hardcoded `ep03` → ใช้ `EP_CONFIG.id` (รองรับ multi-episode)
- **HUD inventory chips** · แทนที่ "HELION 3/6" text → 6 chip icons (เก็บแล้ว glow + animation pop · ไม่เก็บ grayscale)
- **perfectBonus** เพิ่มหน้าใหม่: p24=50, p25=80 · ลบ p11/p18/p20 (story · ไม่มี isPerfect)
- **p06c/p08c/p09c** · เพิ่ม `Photon.add(20/25/30)` ใน onSubmit ที่ขาด
- **p25 boss** · เพิ่ม coin reward by ending (A+=80 · A=40 · B=15 · C=0)
- **Mystery Box** wired ที่ p24 (perfect=PERFECT tier · partial=GOOD)

### 👨‍🏫 Teacher Console Upgrade
- เพิ่ม **Student Progress Panel** · 4 cells: HELION (6 chips) · COIN · POWERS (6 forge · icons preview) · ENDING
- Auto-refresh ทุก 5s + on focus
- ปุ่ม **🔄 รีเฟรช** + **↻ รีเซ็ตความคืบหน้านักเรียน** (ลบ ep05 keys + coin + photon + shopItems)

### 🎮 Reset / Continue (นักเรียน)
- **p00 cover** · ตรวจ progress · มี save → แสดง banner + ปุ่ม "↻ เริ่มใหม่" + "▶ Pre-test เล่นต่อ" · ลบ auto-clear bug
- **p27 journal** · เพิ่ม PLAY AGAIN card (ขอบเขียวเส้นประ) · ปุ่มลบทุก ep05 keys + ไป p00

### 📚 KEY THEORY Panel (p14)
- รีดีไซน์ tab content เป็น **5 interactive labs (3-stage each)**:
  - Sunspot: convection cells + field activation + temp drop
  - Prominence: trap → snap (no field → loop → CME)
  - Flare: race light vs plasma + Earth effects + spectrum (X-ray/UV/visible)
  - CME: speed slider + 3 regimes + magnetosphere shield + Carrington example
  - Solar Wind: drag earth into stream + magnetosphere field lines + pole zoom (helix → auroral oval → O/N₂ collision)
- KEY THEORY box (ส้มเด่น) · sticker label "📚 KEY THEORY · จดในสมุด"
- ตัด fluff · เก็บแก่นทฤษฎี

### 🏷️ Heading Style (global · `_page-style.css`)
- h1 28px (clamp 22-28px) · gradient orange left bar 5px · text-shadow glow · gradient bg fade
- h2 18px · left border + padding
- h3 15px bold + letter-spacing
- .lbl 11px (เดิม 10px) + box-shadow + bold

### 🎓 Other small fixes
- p13/p14/p15/p16/p17 · checked perfect logic
- p21 ใส่ icon ที่ Earth's orbit + Sun label ชัดเจน
- p11 มี ETA 12hr ETA + 4-step funnel "knowledge → test → defend"
- เพิ่ม MISSION 6/6 FINAL กรอบทอง (p10a) · pulse แรงกว่าหน้าอื่น

---

## ⚠️ ที่ยังค้าง / รู้ไว้ก่อน
- **End-to-end test** ยังไม่ได้ทดสอบ flow ทั้งหมดในจริง · ขอ user เปิด browser ลองครบเส้นทาง
- **photon.earn config** dead code · ลบทิ้ง (photon awarded ผ่าน Photon.add() ที่หน้าจริงแทน)
- **HUD chips** อาจกินพื้นที่บนมือถือเล็ก · ลด font-size + chip-size 18px
- **VOID intrusions / Quest Log overlay** · เสนอไว้แต่ยังไม่ได้ทำ (option E,C ใน initial discussion)

---

## v8 baseline (ยังคงอยู่)
**สถานะเดิม**: 🟢 v8 เสร็จครบ 45 หน้า · 6 dive scenes split 3 หน้า + 5 Mission Bridges + บางหน้าปรับ visual + Active Region Scanner

## v8 highlights (vs v7 = 40 หน้า)
- **+ 5 Mission Bridge pages** (p06-bridge ถึง p10-bridge) · ระหว่าง gate กับ scene ถัดไป
  - แสดง sun cross-section + ship animated · HELION inventory · VOID ETA · scene number
  - Recap card + Foreshadow card (เคน/อารยา/พ่อ พูดเชื่อมเรื่อง)
- **p06b · Lucky Escape popup** เมื่อกดส่งสำเร็จ "🍀 คุณโชคดีมาก · ไม่งั้นติด 170,000 ปี"
- **p08b · Sun visual redesign** · เปลี่ยนจาก cross-section (ยานออกนอกกรอบ) → **ก้อนดวงอาทิตย์ solid + ชั้นบรรยากาศเป็น ring** (chromosphere แดง + corona ม่วง)
  - Sunspot ON the surface (umbra/penumbra)
  - Checkpoints อยู่ในชั้นบรรยากาศ (CP1=ผิว · CP2=chromo · CP3-4=corona)
  - Sensor วัด T เพิ่ม (5,780→1.5M K) + B ลด (2,000→200 G) = **foreshadow coronal heating paradox @ p10**
- **p08c · Active Region Scanner** (เปลี่ยนจาก Sunspot Forensics)
  - 8 dots: 3 active region (B แปรปวน + prominence + flare history) + 5 distractors
  - **Trap ใหม่:** quiet sunspot (B แรงแต่นิ่ง · ไม่มี activity) → ดักเด็กที่ดูแค่ B
  - Reasons: B-fluctuation · plasma erupting · flare history (ไม่ใช่แค่ T/B/ขนาด)
  - Application Q: "2 sunspot ขนาดเท่ากัน · ใครจะเกิด CME?" → activity ไม่ใช่ขนาด

## v7 base structure (ยังคงอยู่)
- **3-Page per Scene Pattern:** ทุก dive scene (p05-p10) แตกเป็น 3 หน้า · A=ENGAGE+Predict, B=EXPLORE+Observe, C=MASTERY GATE
- **Mastery Gate types ต่างกันทุก scene:**
  - p05c · 🔧 **REACTOR EQUATION LOCK** · เติมสมการ p-p chain 8 slot
  - p06c · 🔐 **PHOTON CIPHER BOX** · 4 ปริศนา → รหัส "WALK"
  - p07c · 🔄 **CONVECTION CYCLE BUILDER** · ลาก arrows สร้างวงจร hot↑→cool→sink↓
  - p08c · 🔍 **ACTIVE REGION SCANNER** · 3 active region จาก 8 + เหตุผล (B แปรปวน + plasma)
  - p09c · ⏱️ **FLARE CHRONOMETER** · 3 calc → รหัส "842"
  - p10c · 🗝️ **HELION KEY ASSEMBLY** · ประกอบ HELION 6 ชิ้นเรียง Core→Corona
- **POE cycle:** ทุก scene = Predict (with reasons) → Observe (with log) → Explain (compare) → Mastery Gate (apply) → Self-rubric
- **Lock เข้ม:** ผ่านไม่ได้ถ้าไม่ใช้ความรู้ · gate ต้อง pass จึงปลด HELION + ปุ่มไปต่อ

## v8 Page List (45 หน้า)
```
ACT A · DISCOVERY + WARP (5)
  p00 cover · p01 pretest · p02 intro-quest · p03 origin-zones · p04 dive-plan

ACT B · INTERIOR DIVE (11)
  CORE       : p05a engage · p05b explore · p05c gate (REACTOR EQUATION)
  🛰️ p06-bridge
  RADIATIVE  : p06a engage · p06b explore (+ Lucky popup) · p06c gate (PHOTON CIPHER)
  🛰️ p07-bridge
  CONVECTIVE : p07a engage · p07b explore · p07c gate (CYCLE BUILDER)
  🛰️ p08-bridge

ACT C · ATMOSPHERE BREAK (12)
  SUNSPOT      : p08a engage · p08b explore (sun+atmos viz) · p08c gate (ACTIVE REGION SCANNER)
  🛰️ p09-bridge
  CHROMOSPHERE : p09a engage · p09b explore · p09c gate (FLARE CHRONOMETER)
  🛰️ p10-bridge
  CORONA       : p10a engage · p10b explore (+ Token) · p10c gate (HELION KEY ASSEMBLY)

ACT D · BATTLE PHASE (17)
  p11-p27 (magnetic-bridge → boss → rescue → journal)
```

---

## 1. EP05 คืออะไร

**"หัวใจที่เต้นผิดจังหวะ · RACE TO THE SUN"** · ตอนที่ 5 · ~125 นาที · 45 หน้า (v8)

- **ตัวชี้วัด**: ว 7.1 ม.4-6/1 · ระบบสุริยะ + ดวงอาทิตย์ + อิทธิพลต่อโลก
- **Badge**: ☀️ Heliophysicist · NAVIGATOR → CAPTAIN
- **Quest:** ตามล่า **HELION CORES 6 ชิ้น** ก่อน VOID · ใช้ activate deflector ที่ L1
- **Misconceptions M1-M7** (kill ในบริบทผ่าน scene incident)
- **เหมาะกับ 2 คาบ** (เกิน 100 นาที ตามวัตถุประสงค์ KPA + วPA)

---

## 2. โครง 28 หน้า · 4 องก์ · Quest-driven

```
ACT A · DISCOVERY + WARP (5 หน้า · 19 นาที)
  p00 cover         · VOID returns + signal incoming + พ่อเปิด HELION
  p01 pretest       · 8 ข้อ M1-M7
  p02 intro-quest   · พ่อเปิดภารกิจ HELION 6 ชิ้น + race vs VOID
  p03 origin-zones  · WARP ย้อนเวลา · timeline + 4-zone drag (3-phase + Phase3 quiz M6)
  p04 dive-plan     · ถึงดวงอาทิตย์ · เลือก role · เปิด HUD HELION 0/6 + countdown 18h

ACT B · INTERIOR DIVE (3 หน้า · 15 นาที) · 🔆 HELION 1-3
  p05 dive-core        · ⚠ shield 30 วิ · จับ energy spark 4 ครั้ง · M1 kill (Phase3)
  p06 dive-radiative   · ⚠ compass หาย · gradient descent 5x5 grid (Phase3)
  p07 dive-convective  · ⚠ turbulence · เลือก cell ที่ลอยขึ้น 3 รอบ (Phase3)

ACT C · ATMOSPHERE BREAK (3 หน้า · 15 นาที) · 🔆 HELION 4-6
  p08 surface-spot     · ⚠ compass แปรปวน · ลากตามเส้นแม่เหล็ก checkpoint · M3 kill
  p09 surface-flare    · ⚠ flare imminent · หลบ 3 ลูกติด (กดทิศตรงข้าม) · M4 partial
  p10 surface-corona   · ⚠ T spike · slider เห็น paradox + ⚡ Coronal Token (hidden) · M2 kill
                          → VOID ARRIVED transition

ACT D · BATTLE PHASE (17 หน้า · 51 นาที)
  p11 magnetic-bridge  · VOID arrived banner + bridge เริ่มสนามรบ
  p12 sunspot-cycle    · butterfly diagram + 250 จุดเกิน peak
  p13 activity-slider  · 5 tier · ทะลุ Solar Maximum
  p14 phenomena-tabs   · 🎁 5 ปรากฏการณ์
  p15 event-order      · 🎁 ลำดับเหตุการณ์
  p16 flare-vs-cme     · drag 8 statement (M4 full)
  p17 earth-impact     · 8 ผลกระทบ → 4 ระดับ
  p18 fatherlog        · บันทึกพ่อ 3 entry · L1 reveal
  p19 habitable-zone   · 🎁 8 ดาวเคราะห์ · 3 zone (M7)
  p20 voidface         · VOID eye · 4 taunts
  p21 deflect-path     · 🎁 ⭐ visual CME simulation 4 จุด · ต้อง simulate ≥2 + Phase3 quiz
  p22 posttest         · 8 ข้อ + gain compare
  p23 sequencer        · drag เรียง 8 events
  p24 shop             · Voyager Cache · Aurora Resonance ปลด A+
  p25 boss             · 🔥 SOLAR STORM 3 zones 24 ข้อ 18hr countdown
  p26 rescue           · 4 endings (A+/A/B/C)
  p27 journal          · 🏆 badge + 3-2-1 chips + cliffhanger EP06
```

**🎁 Mystery Box (5 จุด):** p03 (origin) · p14 (phenomena) · p15 (order) · p19 (habitable) · p21 (deflect) · boss
**Hidden:** ⚡ Coronal Anomaly Token ที่ p10 (โผล่หลังเลื่อน slider เห็นครบ 6 ชั้น) → ปลด ending A+

---

## 3. 🔆 HELION CORES · Quest items (ใหม่ใน v4)

| ID | Icon | Name | Layer | Scene | Kill |
|----|---|---|---|---|---|
| h1 | 🔥 | Fusion Core Particle | Core | p05 | M1 |
| h2 | 🌫️ | Photon Walk Particle | Radiative | p06 | — |
| h3 | 🌊 | Convection Bubble | Convective | p07 | — |
| h4 | 🧲 | Magnetic Knot | Photosphere | p08 | M3 |
| h5 | ⚡ | Chromo Flare Echo | Chromosphere | p09 | M4 |
| h6 | 🌌 | Coronal Resonance | Corona | p10 | M2 |

ครบ 6 ชิ้น = activate deflector ใช้สู้ boss

---

## 4. 3-Phase Activity Template

ทุกหน้ากิจกรรม ACT B/C/D ใช้โครงเดียวกัน:

```
🎬 PHASE 1 · เกริ่นนำ (Hook + Why + Incident)
   - narrative card 1-2 ก้อน · ตัวละครพูด
   - บอกว่า "เรากำลังจะทำอะไร · ทำไม"
   - INCIDENT ของชั้นนั้น (compass หาย · flare มา · paradox · ฯลฯ)

🔬 PHASE 2 · กิจกรรม (Activity)
   - interactive (slider, drag, tap, animation)
   - ระบบเปิดเผยเนื้อหาเมื่อเล่น
   - ไม่มี quiz · เน้นการสำรวจ + เอาตัวรอด

✅ PHASE 3 · ทดสอบย่อย (Mini-quiz)
   - 1 ข้อในเนื้อที่เพิ่งทำเท่านั้น
   - ตอบถูก = unlock + grant HELION
   - ตอบผิด = popup hint ชี้กลับไปดูที่ activity
```

ใช้ Phase3.mount() helper ใน ep05-boot.js (`global.Phase3`)

---

## 5. 6 Scene Incidents (ACT B+C)

| # | Scene | Incident | Mechanic | HELION |
|---|---|---|---|---|
| p05 | CORE | Shield 30 วิ · Fusion catch | กด energy spark 4 ครั้ง · countdown | 🔥 Fusion |
| p06 | RADIATIVE | Compass หาย · LOST | 5×5 grid · gradient descent 5 step | 🌫️ Photon |
| p07 | CONVECTIVE | Turbulence · พลาสมาเดือด | 6 cells · เลือก up 3 รอบ | 🌊 Bubble |
| p08 | SUNSPOT | เข็มทิศแปรปวน | ลากยานตาม path checkpoint 4 จุด | 🧲 Knot |
| p09 | CHROMOSPHERE | Flare imminent | หลบ 3 ลูก · กดทิศตรงข้าม 1 วิ | ⚡ Echo |
| p10 | CORONA | T spike paradox | slider 6 ชั้น · เห็นการกระโดด + Token hidden | 🌌 Resonance |

---

## 6. Shared Modules ใหม่ใน v4

| Module | หน้าที่ |
|---|---|
| `QuestState` (ในBoot) | helions inventory + voidEta tracking |
| `QuestState.grant(id)` | เพิ่ม HELION + animated burst overlay |
| `QuestState.decreaseEta(h)` | ลด VOID ETA (กดดันเวลา) |
| `Phase3.mount(opts)` | Mini-quiz template · auto-grant HELION เมื่อตอบถูก |
| HUD floating | `🔆 HELION x/6 · ⏰ VOID ETA xx.xh` ติดบนหัว ทุกหน้า p05-p25 |
| `ep05-boot.js?v=2` | (bumped จาก v1) |

---

## 7. p21 Deflect-Path · Visual CME Simulation (NEW · ตามคำขอ)

หน้าเก่าที่ผู้ใช้บอกว่าไม่เข้าใจ · ออกแบบใหม่:
- **กดจุดบนแผนที่หรือกดการ์ด** → เห็น CME วิ่งจริงจาก sun → deflect point → outcome
- **3 ผลลัพธ์:** good (เบี่ยงพ้น) · warn (เบี่ยงครึ่ง · partial hit) · bad (ผ่านโลก · grid blackout)
- **ต้อง simulate ≥ 2 จุด** ก่อน confirm
- **Phase3 quiz** ถามว่าทำไม L1 ดีที่สุด (ดูจาก simulation)

---

## 8. Boss · SOLAR STORM (p25) · เนื้อหาเดิมจาก v2 · เก็บไว้

3 zones · pool 24 ข้อ · 18hr countdown · CME pulse ทุก 10 วิ · 4 endings (A+/A/B/C)

---

## 9. ไฟล์สำคัญ

```
ep05/
├── config.js              · v4 · 28 pages + helions array + voidEta + boss + deflectPoints
├── _page-style.css        · sun theme + aurora-bg
├── index.html             · 4 acts updated
├── teacher.html           · actOf() updated
├── p00-cover            · VOID returns
├── p01-pretest          · 8 ข้อ M1-M7
├── p02-intro-quest      · NEW · พ่อเปิด HELION mission
├── p03-origin-zones     · WARP timeline + 4-zone drag + Phase3
├── p04-dive-plan        · เลือก role + HUD init
├── p05-dive-core        · Shield 30s · จับ energy
├── p06-dive-radiative   · Compass lost · gradient
├── p07-dive-convective  · Turbulence · cell select
├── p08-surface-spot     · Sunspot magnet · path follow
├── p09-surface-flare    · Flare dodge
├── p10-surface-corona   · Paradox + Token + VOID arrived
├── p11-p27 (ACT D · 17 หน้า · เนื้อหา v2 · renumbered + p11 narrative bridge updated)
└── rubric_ep05.md         · KPA + วPA + misconception inventory

shared/ep05-boot.js?v=2   · QuestState + Phase3 + HUD
```

---

## 10. การเปลี่ยนแปลงสำคัญจาก v3 → v4

| v3 | v4 |
|---|---|
| 27 หน้า | 28 หน้า (+1: intro-quest แยกออกมา) |
| Anatomy lab passive (slider + match) | 6 dive scenes กับ incident เฉพาะแต่ละชั้น |
| Mystery Box 7 จุด | Mystery Box 5 จุด (focused) + HELION 6 จุด (new quest) |
| ไม่มี HUD progress | HUD HELION + VOID ETA ตลอด ACT B-D |
| Quiz กระจาย | Phase3 ในทุก activity (1 ข้อ/หน้า) |
| Deflect = static map | Deflect = visual CME simulation |
| Coronal Token ที่ p07 | Token ย้ายไป p10 (corona scene · บริบทเหมาะกว่า) |

---

## 11. ทดสอบ

```
ปก:       lessons/astronomy/ep05/index.html
Solo:     lessons/astronomy/ep05/p00-cover.html?solo=1
Dive:     lessons/astronomy/ep05/p05-dive-core.html?solo=1
Boss:     lessons/astronomy/ep05/p25-boss.html?solo=1
ครู:      lessons/astronomy/ep05/teacher.html
Rubric:   lessons/astronomy/ep05/rubric_ep05.md
```

---

## 12. Cliffhanger → EP06

จบ p27 (ending A+/A) · พ่อ:
> "VOID หายไปแล้ว · มันยอมแพ้ Cores · แต่ทำไมมันไปทาง Andromeda · ในกาแล็กซีเรามีดาวฤกษ์ 4 แสนล้านดวง..."

→ **EP06 "ทางที่ไม่เคยมีใครกลับมา"** · ทางช้างเผือก / interstellar

---

*HANDOFF v4 · 2026-04-27 · Session ที่จบ: rebuild EP05 v4 · Quest-driven (HELION) + 3-phase template + 6 dive scenes with incidents + visual CME simulation + renumbered 27→28 หน้า*
