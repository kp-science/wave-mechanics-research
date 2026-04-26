# HANDOFF · COSMOS LOG EP04 · Session Log

> ใช้ไฟล์นี้เพื่อเริ่มแชทใหม่โดยไม่เสียบริบท · ก่อนทำงานอื่น ให้อ่านไฟล์นี้ + `HANDOFF_ep03.md`

**วันที่บันทึกล่าสุด**: 2026-04-26
**สถานะ EP04**: 🟢 **27 หน้าเขียนเสร็จครบ · ระบบเกม + Mystery Box + Mission Brief + Audio active · เล่นได้ end-to-end**
**โครงสร้าง**: 4-องก์ Lab-build model (Arrival → Color Lab → Mass Lab → Synthesis+Journey) · ปรับ skill ให้รองรับแล้ว

---

## 1. EP04 คืออะไร

**"วันสุดท้ายของยักษ์แดง · Death of a Giant"** · ตอนที่ 4 ของซีรีส์ COSMOS LOG · 100 นาที · 27 หน้า

- **ตัวชี้วัด**: ว 7.1 ม.4-6/2 · ดาวฤกษ์ · สี · อุณหภูมิ · มวล · วิวัฒนาการ
- **Badge**: 🔥 Stellar Fate · ขึ้นยศ → NAVIGATOR
- **Misconceptions M1-M5**:
  - M1: สี = อายุดาว (ที่ถูก = อุณหภูมิเท่านั้น)
  - M2: แดง = ปลอดภัย/มวลน้อย เสมอ
  - M3: ใหญ่ = ร้อนกว่า
  - M4: มวลมาก = อายุยืน (กลับ — มวลมาก = อายุสั้น)
  - M5: G-type คงสภาพตลอดอายุ
- **Logline**: ทีมตามสัญญาณ SOS พ่ออารยา → ถึงพื้นที่ดาวฤกษ์เต็มไปด้วย 7 สี (OBAFGKM) + หลุมดำ → เคนเสนอวางแผน 2 แกน (สี + มวล) → เรียน lab สี + lab มวล + ค้นพบบันทึกพ่อ + เผชิญ VOID → เลือก 1 ใน 4 เส้นทาง → boss GRAVITY ASCENT → กู้พ่อ (4 endings)

---

## 2. โครงสร้าง 27 หน้า · 4 องก์ · Lab-build Model

```
ACT A · ARRIVAL (4 หน้า · 14 นาที)
  p00 cover            · Recap EP03 + intro
  p01 pretest          · 4-choice · M1-M5 baseline
  p02 arrival          · ถึงพื้นที่ดาว · เห็น SOS · แผนที่ 7 ดาว + BH
  p03 plan             · เคนเสนอแผน 2 แกน + roles

ACT B · COLOR LAB (6 หน้า · 21 นาที)
  p04 spectrum-slider  · slider เลื่อนสี ↔ อุณหภูมิ + 2 quiz
  p05 drag-match       · ลากดาว 7 ดวง → bin OBAFGKM + กดเปรียบเทียบ
  p06 obafgkm          · ทฤษฎี + Oh Be A Fine Guy Kiss Me
  p07 group-code       · 🎁 จัดดาวจริง 11 ดวง + ⚫ Black Dwarf hidden
  p08 group-temp       · จัดกลุ่มอุณหภูมิ 3 ช่วง
  p09 color-summary    · สรุปสี + เห็นดาวอันตราย (O,B)

ACT C · MASS LAB (8 หน้า · 28 นาที)
  p10 bridge-mass      · เคน "ทีนี้แรงโน้มถ่วง"
  p11 nebula           · ต้นกำเนิดดาว
  p12 protostar        · slider มวล 5 tier (สีเปลี่ยนตาม)
  p13 mass-tracks      · 🎁 5 tabs · star visuals ในแต่ละ phase
  p14 evo-order        · 🎁 ลากเรียง phase + ต้องตรวจครบ 5 tracks
  p15 mass-endpoint    · จับคู่ดาว 8 ดวง → 5 ปลายทาง
  p16 evo-game         · mini-game 30 วิ
  p17 fatherlab        · 📓 บันทึกพ่อ (จาก EP04 v2 reuse)

ACT D · SYNTHESIS+JOURNEY (9 หน้า · 37 นาที)
  p18 starmap          · แผนที่ดาวฉบับสมบูรณ์ (tap reveal)
  p19 voidface         · ⚠ VOID เผยตัว
  p20 path-select      · 🎁 เลือก 1 ใน 4 เส้นทาง · มี BH + masses
  p21 posttest         · 4-choice + Badge Picker
  p22 sequencer        · ลากเรียงเหตุการณ์ทั้ง EP
  p23 shop             · Voyager Cache
  p24 boss             · 🔥 GRAVITY ASCENT (3 zones · pool 24 ข้อ)
  p25 rescue           · 4 endings A+/A/B/C
  p26 journal          · 🏆 Badge + 3-2-1 chips
```

**Mystery Box drops · 5 จุด:** p07, p13, p14, p20, boss victory

---

## 3. Shared Modules ใหม่ใน EP04 (สำคัญมาก)

ทุก module อยู่ใน `lessons/astronomy/shared/`:

| ไฟล์ | หน้าที่ |
|---|---|
| **starfield.js** | canvas BG ทุกหน้า · auto-init ผ่าน boot · 80 จุด · CPU เบา |
| **audio.js** | Web Audio API · 8 sounds · default OFF · toggle 🔇/🔊 มุม**ซ้าย**บน · haptic fallback |
| **mission-brief.js** | auto-inject · อ่าน `EP_CONFIG.briefings[pageId]` · ใส่ `<div data-mission-brief></div>` ในหน้า |
| **mystery-box.js** | `MysteryBox.roll({ wrongs, page })` · 3 tier (PERFECT/GOOD/PASS) · animated overlay |
| **ep04-boot.js** | Boot + Chain + Gate + Submit + Transition · auto-init starfield+audio |

### Script include block (ทุกหน้า EP04)
```html
<script src="../shared/firebase-config.js"></script>
<script src="./config.js"></script>
<script src="../../shared/pace-client.js"></script>
<script src="../shared/sync-client.js"></script>
<script src="../shared/photon.js?v=2"></script>
<script src="../shared/role-view.js"></script>
<script src="../shared/touch-drag.js?v=1"></script>     <!-- ถ้ามี drag -->
<script src="../shared/starfield.js?v=1"></script>
<script src="../shared/audio.js?v=2"></script>
<script src="../shared/mission-brief.js?v=1"></script>
<script src="../shared/mystery-box.js?v=1"></script>
<script src="../shared/ep04-boot.js?v=2"></script>      <!-- ต้องอยู่ท้ายสุด -->
```

---

## 4. Interaction Patterns ที่ใช้ (vocabulary EP04)

| Pattern | หน้าตัวอย่าง |
|---|---|
| **Spectrum Slider** (เลื่อนค่า + visual update) | p04, p12 |
| **Drag-to-Match w/ Compare** (ลาก + กดตรวจ + เด้งกลับ) | p05, p07, p08 |
| **Tap-Classify Race** (timer + tap) | p11b/p16 |
| **Drag-Order Sequence** (เรียงลำดับ) | p14, p22 |
| **Tab-Reveal** (กดทุก tab จึงปลด) | p13 |
| **Path Selector + Mystery Box** (เลือกเส้นทาง · ไม่บอกปลอดภัย) | p20 |
| **Tap-Chip 3-2-1** (แทน text input) | p21, p26, p05-step6 |
| **Hidden Collectible** (Black Dwarf โผล่กลางกิจกรรม) | p07 |

**กฎเหล็ก EP04:** ทุก textarea → tap-chips · ไม่มีพิมพ์ตอบ

---

## 5. Config สำคัญ · `ep04/config.js`

### 5 Mass Tracks
```js
massTracks: [
  { range:'< 0.08 M☉',    track:'Brown dwarf',     end:'ดาวที่ไม่ติดไฟ' },
  { range:'0.08 – 0.5',   track:'Red dwarf',        end:'Black dwarf', time:'> 100 พันล้านล้านปี' },
  { range:'0.5 – 9',      track:'Sun-like',         end:'White dwarf → Black dwarf' },
  { range:'9 – 25',       track:'High-mass',        end:'Neutron star' },
  { range:'> 25',         track:'Very high-mass',   end:'Black hole' (Hypernova) },
]
```

### 7 Route Stars (ใช้ใน p02 + p20 ตำแหน่งเดียวกัน)
```js
routeStars: [r1(O,30), r2(B,12), r3(A,2.5), r4(F,1.5), r5(G,1), r6(K,0.7), r7(M,0.3)]
+ Black Hole (50 M☉) · ที่ตำแหน่ง (48%, 40%) — มีแค่เส้น D ผ่าน
```

### Path Selection Logic (p20)
- A (top): r1+r2+r3+r5 — danger 8 (ผ่าน O+B ร้อน+มวลมาก)
- B (mid): r2+r4+r6+r7 — danger 4
- **C (bottom)**: r6+r4+r5+r7 — **danger 0 ★ ปลอดภัยสุด**
- D (cut through BH): r1+bh+r5+r7 — danger 12 (worst)

### Briefings (7 หน้ากิจกรรม)
หน้าที่ใส่ briefing card: p04, p05, p07, p12, p13, p17, p20
- สลับ type `void` (taunt) ↔ `leader` (brief)
- มี: goal · criteria · time · reward

---

## 6. Boss · GRAVITY ASCENT (p24)

**กลไก**: Hybrid (c) — ใช้ pool คำถามเดิมจาก EP_CONFIG.boss · ภาพ navigator
- 3 zones: zone1 (สี/อุณหภูมิ) · zone2 (มวล/ปลายทาง) · zone3 (บูรณาการ)
- Pool 24 ข้อ (8/zone) · สุ่ม · 2-choice
- Gravity ball charge ทุก 10 วิ → กระแทกยาน −8 Energy
- Thrust สะสม → ครบ 30/zone = ข้ามเขต
- Ending จาก Energy เหลือ:
  - ≥ 70 → A+ STAR LEGACY (ต้องมี Black Dwarf Shell)
  - 40-69 → A FATHER'S RETURN
  - 1-39 → B BARELY ALIVE
  - 0 → C SWALLOWED

---

## 7. ไฟล์สำคัญที่ต้องรู้

```
ep04/
├── config.js              · single source of truth · 27 หน้า + briefings + tracks + stars
├── _page-style.css        · iPad-optimized
├── index.html             · cover (links new file names)
├── join.html
├── teacher.html           · pace control
├── p00-p26 (27 ไฟล์)
└── rubric_ep04.md         · KPA + สมรรถนะ + วPA evidence

shared/
├── ep04-boot.js
├── starfield.js
├── audio.js
├── mission-brief.js
└── mystery-box.js
```

---

## 8. Bugs ที่เคยเจอ + วิธีแก้

| Bug | วิธีแก้ |
|---|---|
| **p12 next ไม่ปลดล็อก** | slider เดิม min=-15 ไม่ถึง Brown dwarf → เปลี่ยน 0-100 step 1 + getMass แบ่ง 5 tier |
| **p20 เส้น C ผ่าน BH** | ย้าย BH จาก (50,78) → (48,40) ให้มีแค่เส้น D ผ่าน + arch dirs ต่างกันต่อเส้น |
| **HUD overlap (audio + photon)** | ย้าย audio toggle ไปมุมซ้ายบน · ห้ามทับ pill ขวาบน |
| **p02 + p20 ดาวคนละตำแหน่ง** | sync ใช้ POS ชุดเดียวกันจาก routeStars |
| **p13 phase ไม่มีรูปดาว** | เพิ่ม stageVisual() function · render circle CSS ตามชนิด phase |

---

## 9. ปรับ Skill (game-lesson-builder) ให้รองรับ EP04

ไฟล์ที่อัปเดต:
- `skills/game-lesson-builder/SKILL.md` — เพิ่ม 4-องก์ model + interaction patterns + new shared modules + new gotchas
- `skills/game-lesson-builder/references/ep04-structure.md` ⭐ ใหม่ — blueprint สำหรับ EP05+

**ใช้รูปแบบ B (4-องก์ Lab-build) เมื่อเนื้อหากว้าง** เช่น EP05 (ระบบสุริยะ · ดวงอาทิตย์ · CME) จะเหมาะกว่ารูปแบบ A

---

## 10. Cliffhanger · เปิดทาง EP05

จบ EP04 (p25 rescue) → พ่ออารยา (ในกรณี ending A+/A) เผยว่า:
> "VOID ไม่ได้ฝึกซ้อมที่นี่ · มันฝึกซ้อมเพื่อ **ดวงอาทิตย์** · G-type · 5,780 K · ตามทฤษฎีจะเป็น white dwarf อย่างสงบ · แต่ถ้า VOID เพิ่มมวล..."

→ ตัดภาพ ดวงอาทิตย์ มี sunspot ผิดปกติ → CME warning 18 ชั่วโมง

**EP05 "หัวใจที่เต้นผิดจังหวะ"** · ระบบสุริยะ · ดวงอาทิตย์ · CME

---

## 11. ทดสอบ

```
ปก:       lessons/astronomy/ep04/index.html
Solo:     lessons/astronomy/ep04/p00-cover.html?solo=1
Boss:     lessons/astronomy/ep04/p24-boss.html?solo=1
ครู:      lessons/astronomy/ep04/teacher.html
Rubric:   lessons/astronomy/ep04/rubric_ep04.md
```

---

*HANDOFF v1 · 2026-04-26 · Session ที่จบ: build EP04 v3 + restructure ตาม outline ครู + ปรับสกิล*
