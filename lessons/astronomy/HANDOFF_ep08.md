# HANDOFF · COSMOS LOG EP08 · "Genesis Again · Season Finale"

> วันที่ scaffold: 2026-05-01
> สถานะ: 🟢 **Scaffold ครบ 28 หน้า + Boss "GENESIS FORGE" canvas action 4-phase + 3 modules ใหม่ + teacher console + EP07 patch + verified in preview**

---

## 1. EP08 คืออะไร

**"Genesis Again · จุดเริ่มต้นอีกครั้ง"** · Season Finale · ~140 นาที · 28 หน้า + boss

- ตัวชี้วัด ว 7.2 ม.6/3-5 + summative ทั้งซีซัน
- Badge: 🏆 COMMANDER · Rank: COMMANDER
- Logline: ทีม warp 13.8 Gyr ย้อนหลัง · เผชิญ VOID Prime · เจอพ่อโบลท์ที่ t=0 · เลือก Reset/Preserve · สู้ GENESIS FORGE 4 epoch · 5 endings

## 2. โครง 28 หน้า · 4 องก์

```
ACT A (5)  p00 cover · p01 pretest10 · p02 the-void · p03 cmb-shower · p04 mission-brief (ดร.ฮับเบิล reveal)
ACT B (8)  p05 inflation · p06 nucleosynthesis · p07 recombination · p08 first-stars
           p09 galaxies · p10 ⭐ fathers-arrival · p11 fathers-truth · p12 hubbles-law
ACT C (8)  p13 prime-appears · p14 prime-plan · p15-18 disable engine 4 จุด
           p19 hall-of-spinoff · p20 hall-of-knowledge
ACT D (7)  p21 ⭐ fathers-choice (Reset/Preserve) · p22 boss-prep
           p23 🔥 BOSS GENESIS FORGE · p24/p25 endings · p26 farewell · p27 journal+S2
```

## 3. ⭐ BOSS · GENESIS FORGE · canvas action

**ไม่ซ้ำ EP05/06/07** · เป็น **canvas-based 4-phase action** (drag/tap key ยิง enemies)

- Phase 1 INFLATION SHOCKWAVE (6 collapse waves · cat: bigbang/stellar)
- Phase 2 NUCLEOSYNTHESIS FORGE (12 anti-fusion drones → core · cat: stellar/sun)
- Phase 3 CMB RELEASE (3 star-eater tendrils · cat: bigbang/stellar/tech)
- Phase 4 STRUCTURE DEFENSE (vortex 8 hp · cat: solar/tech)
- HP เริ่ม 12 · ใช้ key ผิด type = -1 · enemy หลุด = -1
- finisher GENESIS LANCE ปลดเมื่อ keys ≥ 12/17 · slow-motion + bigBangFinale FX
- 5 endings: A+ ARCHITECT (HP เต็ม + 17 keys + Preserve) / A / B / C / 🌟 RESET ROUTE
- 12 achievements lifetime (BIG BANG WITNESS, COMMANDER, INFINITE LEARNER, etc.)

### FX Library (ใน timeline-viz.js)
inflationBurst · cmbShower · nucleusFormation · starIgnition · galaxySpin · voidTendrilSlash · impactBurst · screenShake · slowMotion · bigBangFinale

## 4. Modules ใหม่ (3 ตัว)

- `shared/genesis-forge.js` (~1,300 บรรทัด) · Boss engine canvas + state machine + 5 endings + 12 achievements
- `shared/timeline-viz.js` (~450 บรรทัด) · 4-epoch ribbon + cinematic FX library
- `shared/s1-keyring.js` (~280 บรรทัด) · อ่าน OS/HELION/GS จาก localStorage ทุก EP01-07 รวม 17 keys
- `shared/ep08-boot.js` · clone ep07-boot · key prefix `cosmosLog_ep08_` · **ปิด story-bridge auto-load** (ทุกหน้ามี <details class="story-tab">)
- `shared/ep08-page.js` · helper · `EP08Page.story(id)` + `submit()` + `markVisit()`

## 5. 17 Keys S1 Keyring

- EP01-03 stellar (3): k_star · k_spectrum · k_stellar
- EP04 bigbang (2): k_bigbang · k_cmb
- EP05 sun (2): k_sun · k_solarwind
- EP06 GS (6): gs1..gs6
- EP07 OS (4): os1..os4

ที่นั่งของ keyring: `S1Keyring.all()` / `count()` / `byEP()` / `byCategory()` / `forEpoch(n)` / `matchesEpoch(id, n)` / `grant(id)` (ครู override) / `grantAll()` / `reset()`

## 6. Theme · Cosmic Genesis

```css
--genesis-gold:  #ffd84a   /* primary */
--quantum-pink:  #ff6ab8   /* inflation */
--cosmic-purple: #6a3aff   /* dark matter */
--starlight:     #fff5e3   /* first light */
--bg-genesis:    #050108   /* darkest void */
```

## 7. ทุกหน้ามี (EP08 standard)

- **Story Tab** `<details class="story-tab">` แยก (objective/npc/prev/line/now/next จาก config.story[pageId])
- **กราฟิก SVG/Canvas cinematic** + **How-to-play card**
- **5-layer log**: KPA (K1-6/P1-3/A1-3) · Competency C1-6 · วPA d1-3 · Research checkpoint · PBL 6-phase
- **Reveal-after-submit** + **ConfidenceGate** + **Mystery Box** ที่ research checkpoint
- mobile responsive · body 18px · h1 36px

## 8. 8 Mystery Box mapping

| MB | หน้า | Checkpoint |
|---|---|---|
| MB1 | p01 | summative-pretest |
| MB2 | p07 | cmb-mastery |
| MB3 | p10 | drama-father (qualitative) |
| MB4 | p12 | hubbles-law-mastery |
| MB5 | p15 | epoch-1-mastery |
| MB6 | p20 | s1-knowledge-recall |
| MB7 | p21 | choice-ethics |
| MB8 | p27 | summative-posttest |

## 9. Files Map

```
lessons/astronomy/ep08/
├── config.js                 · 28 pages + pretest 10 + boss 4-phase + 8 MB + story spine ทุกหน้า
├── _page-style.css           · genesis theme · genesis-gold/quantum-pink/cosmic-purple
├── index.html                · 4-act overview + S1 keyring inspector
├── teacher.html              · KPA heat map + S1 keyring + ending tracker + vPA tabs + timeline + box reflections
├── p00-cover.html            · warp jump cinematic + resume/restart
├── p01-pretest.html          · 10 ข้อ M-FINAL-1..7
├── p02-the-void.html         · quark soup picker
├── p03-cmb-shower.html       · slider + canvas CMB shower
├── p04-mission-brief.html    · ดร.ฮับเบิล Mentor reveal + ConfidenceGate
├── p05-inflation.html        · slider 10²⁶ เท่า
├── p06-nucleosynthesis.html  · pick H/He/Li (kill M-FINAL-5)
├── p07-recombination.html    · before/after panels + keyword chips
├── p08-first-stars.html      · canvas gas density + IGNITE
├── p09-galaxies.html         · click 5 dark-matter halos · spiral form
├── p10-fathers-arrival.html  · ⭐ canvas figure silhouette + emotional reflection
├── p11-fathers-truth.html    · timeline 2008→t=0 + general relativity
├── p12-hubbles-law.html      · v=H₀D calc + M-FINAL-4
├── p13-prime-appears.html    · canvas VOID Prime breathing + nihilism debate
├── p14-prime-plan.html       · 4 engine ลำดับเก่า→ใหม่
├── p15-disable-1.html        · key picker · cat bigbang/stellar · 4 stable
├── p16-disable-2.html        · cat bigbang/stellar/tech · 3 protect
├── p17-disable-3.html        · cat stellar/sun · 3 ignite
├── p18-disable-4.html        · cat solar/tech · 4 lock
├── p19-hall-of-spinoff.html  · EP07 spinoff + M-FINAL-6
├── p20-hall-of-knowledge.html · 17 keys byEP/byCat + reflection
├── p21-fathers-choice.html   · ⭐ Reset/Preserve · 60s timer (soft)
├── p22-boss-prep.html        · GENESIS LANCE preview + briefing
├── p23-boss.html             · ⭐ canvas BOSS GENESIS FORGE
├── p24-ending-preserve.html  · A+/A/B/C ending screen + Andromeda hint
├── p25-ending-reset.html     · 🌟 reset cycle cinematic
├── p26-farewell.html         · 4 NPC ลาจาก
└── p27-journal.html          · 🏆 COMMANDER + posttest + Andromeda S2 teaser

shared/
├── ep08-boot.js              · key prefix cosmosLog_ep08_ + grantEpoch/setEnding/setChoice
├── ep08-page.js              · helper EP08Page.story()/submit()/markVisit()
├── s1-keyring.js             · 17 keys aggregator
├── timeline-viz.js           · 4-epoch ribbon + FX library
└── genesis-forge.js          · BOSS engine canvas
```

## 10. Patch
- `ep07/p27-journal.html` · cliffhanger updated · added warp message + button → `ep08/p00-cover.html`

## 11. การทดสอบ

```
ปก:        http://localhost:3000/lessons/astronomy/ep08/index.html
EP07 link: http://localhost:3000/lessons/astronomy/ep07/p27-journal.html
Boss:      http://localhost:3000/lessons/astronomy/ep08/p23-boss.html
ครู:       http://localhost:3000/lessons/astronomy/ep08/teacher.html
```

Verified ใน preview: index ✓ · p10 fathers-arrival ✓ · p23 boss canvas action 4-phase ✓ · EP07 patch link ✓

## 12. ⚠️ ที่ยังค้าง / ทำเพิ่มได้

- **End-to-end playthrough** ยังไม่เคยทดสอบครบ 28 หน้า → boss → ending
- **Audio layer** สำหรับบอส (ambient drone, impact SFX, finisher orchestral hit) ยังไม่มี
- **Visual asset Andromeda** เป็น SVG พื้นฐาน · ยังไม่มี NASA HST image
- **Achievement unlock logic** ใน p27 ใช้กฎพื้นฐาน · อาจ refine
- **Browser cache:** ถ้าทดสอบแล้วเห็น story-bridge เก่ายังโผล่ · ต้อง hard-reload (Ctrl+Shift+R)

## 13. Cliffhanger → Season 2

```
หลัง boss + ending PRESERVE/RESET:

p27:
  พ่อโบลท์ (ก่อนหายใน CMB shimmer):
    "ลูก · มีบางอย่างที่พ่อยังไม่ได้บอก · ไม่ใช่แค่จักรวาลนี้ที่มี VOID
     ทุก ๆ จักรวาลคู่ขนาน · ก็มีของตัวเอง · อันที่อยู่ใกล้สุด...
     เธอเห็นด้วยตาเปล่า · ทุกฤดูร้อน"

  [SVG Andromeda Galaxy 🌌 + 30-day signal anomaly]

  ดร.ฮับเบิล:
    "Andromeda กำลังเข้าใกล้เรา · 110 km/s · ชน Milky Way ใน 4.5 พันล้านปี
     แต่ · สัญญาณจาก Andromeda ตอนนี้ · ผิดปกติ · เริ่มเมื่อ 30 วันก่อน"

  เคน: "เป็นไปได้ไหม · ที่จะมี COSMOS LOG อีกชุด · กำลังบินหาเรา?"

  [End Credits]
  → SEASON 2 · "ANDROMEDA RISING"
```

---

*HANDOFF · 2026-05-01 · COSMOS LOG EP08 · ปิด Season 1 · 8 episodes · 224 pages · 17 keys · 1 commander*
