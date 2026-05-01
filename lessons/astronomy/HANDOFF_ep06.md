# HANDOFF · COSMOS LOG EP06 · "ขอบฟ้าของบ้าน · Edge of Home"

> ใช้ไฟล์นี้เพื่อเริ่มแชทใหม่โดยไม่เสียบริบท · ก่อนทำงานต่อ ให้อ่านไฟล์นี้ + `HANDOFF_ep05.md` + `HANDOFF_ep04.md`

**วันที่บันทึกล่าสุด**: 2026-05-01
**สถานะ EP06**: 🟢 **Scaffold ครบ 28 หน้า + Boss VOID ZERO-FIX (15×15 grid) + Teaching Patterns 5 ตัว + KPA/วPA tracker + 13 polish features (in-progress)**
**โครงสร้าง**: 4 องก์ (Arrival → Nebula Lab → Four Zones → Heliopause+Vault) · ตามตำรา สสวท. หน้า 68-75

---

## 1. EP06 คืออะไร

**"ขอบฟ้าของบ้าน · Edge of Home"** · ตอน 6 · ~125 นาที · 28 หน้า + boss

- **ตัวชี้วัด**: ว 7.1 ม.6/1 (สสวท. บทที่ 3.1 หน้า 68-75) · กำเนิดระบบสุริยะ + 4 เขต + heliopause + habitable zone
- **Badge**: 🪐 Scale Master
- **Rank**: CAPTAIN → CAPTAIN+
- **Logline**: ตามรอยดาวหาง 7 ดวงที่เบี่ยงผิดปกติ → ใช้ Kepler T²=a³ คำนวณ → ฐาน VOID ใน Kuiper @ 45 AU → บุก Genesis Vault → boss "VOID ZERO-FIX" 15×15 grid maze → ยึดแผนที่เวลา → cliffhanger ดาวเทียมโลกดับ → EP07 Sputnik 1957

### Misconceptions M1-M7 (ตำรา สสวท.)
- **M1**: ระบบสุริยะ = แค่ดวงอาทิตย์+ดาวเคราะห์ (จริง: + ดาวเคราะห์น้อย ดาวหาง ดาวเคราะห์แคระ)
- **M2**: ดาวเคราะห์ชั้นนอก = แก๊สล้วน (จริง: มีแก่นแข็ง)
- **M3**: โลกใหญ่/พิเศษกว่าดาวอื่น (จริง: เล็กกว่าดาวแก๊สมาก)
- **M4**: asteroid belt = ทะเลหินแน่น (จริง: ระยะเฉลี่ย 1 ล้าน กม.)
- **M5**: พลูโต = ดาวเคราะห์ดวงที่ 9 (จริง: ดาวเคราะห์แคระ · IAU 2006)
- **M6**: ระบบสุริยะจบที่เนปจูน 30 AU (จริง: heliopause 120 AU · Oort 70,000 AU)
- **M7**: เขตเอื้อชีวิต = ระยะห่างอย่างเดียว (จริง: น้ำ + อากาศ + T + ระยะ + ชนิดดาวฤกษ์)

---

## 2. โครงสร้าง 28 หน้า · 4 องก์

```
ACT A · ARRIVAL (5)
  p00 cover         · ดาวหางเบี่ยง · recap EP05 · resume/restart
  p01 pretest       · 8 ข้อ M1-M7 baseline
  p02 anomaly       · เรดาร์ดาวหาง 7 ดวงเบี่ยง · เคน T²=a³
  p03 void-taunt    · VOID hologram "ระบบสุริยะ = 8 ดวง"
  p04 mission-brief · พ่อเปิดภารกิจ · HUD GS 0/6 · countdown 24h

ACT B · NEBULA LAB (6) · GS-1, GS-2
  p05a nebula-engage    · holo-lab 4.6 Gyr ago
  p05b nebula-explore   · drag timeline 6 ขั้น
  p05c nebula-gate      · 🔧 NEBULA REASSEMBLY · GS-1 ☁️
  p06 bridge            · "ทุกอย่างหมุนทิศเดียว"
  p06a disk-engage      · disk hot-cold split
  p06b disk-gate        · 🔍 DISK SORT · GS-2 💍

ACT C · FOUR ZONES (15)
  p07 bridge → p07a/b/c inner    · GS-3 🪨 + kill M3
  p08 bridge → p08a/b/c belt     · GS-4 ⭕ + kill M4
  p09 bridge → p09a/b/c/d giants · GS-5 ☄ + kill M2
  p10 bridge → p10a/b/c/d kuiper · GS-6 ❄️ + kill M5

ACT D · HELIOPAUSE + VAULT (16)
  p11 voyager-replay    · 25 ส.ค. 2012 · 122 AU · kill M6
  p12 scale-shock       · 30 vs 120 vs 70,000 AU
  p13 kepler-hunt       · T²=a³ → ฐาน @ 45 AU
  p14 vault-entry       · ลงจอด · พื้นน้ำแข็งดำ
  p15 vault-walls       · timeline ต้นกำเนิด
  p16 void-plan         · "ลบเนบิวลาที่ต้นทาง"
  p17 habitable-engage  · 4 ปัจจัย
  p18 habitable-explore · slider ระยะ · น้ำเดือด/แข็ง
  p19 habitable-quiz    · kill M7
  p20 exoplanet         · Kepler-452b · TRAPPIST-1e
  p21 migration-vote    · เลือก 1 ดาว · debate
  p22 bolt-clue         · 🎁 โบลท์เห็นสัญลักษณ์ · setup EP07
  p23 boss-prep         · forge GS 6 + Kepler Token → GENESIS LANCE · difficulty selector
  p24 boss-grid         · 🔥 VOID ZERO-FIX · 15×15 maze (NEW · ไม่ใช่ MCQ)
  p25 rescue-ending     · 4 endings A+/A/B/C
  p26 satellite-fail    · ดาวเทียมโลกดับ · cliffhanger
  p27 journal           · 🏆 Scale Master · KPA summary · Achievement Hall · → EP07
```

**Mystery Box drops**: p01, p20, p22, boss

---

## 3. 🪐 GENESIS SHARDS · 6 ชิ้น (vs EP05 HELION)

| ID | Icon | Name | Layer | Scene | Boss Power | Misconception |
|----|---|---|---|---|---|---|
| gs1 | ☁️ | Nebula Seed | Origin | p05c | NEBULA BLAST · +5 thrust | (foundation) |
| gs2 | 💍 | Disk Ring | Origin | p06b | AUTO TARGET · เผยคำตอบ | (foundation) |
| gs3 | 🪨 | Rocky Core | Inner | p07c | ROCKY SHIELD | M3 |
| gs4 | ⭕ | Belt Fragment | Asteroid | p08c | FIELD DEFLECT | M4 |
| gs5 | ☄ | Giant's Heart | Outer | p09d | GIANT BURST | M2 |
| gs6 | ❄️ | Oort Whisper | Edge | p10d | OORT SLOW-TIME | M5 |

ครบ 6 = ปลด **GENESIS LANCE** (ใช้ใน boss · A+ ending)

---

## 4. 🔥 BOSS · "VOID ZERO-FIX" (p24) · 15×15 GRID MAZE

**ไม่ใช่ MCQ race แบบ EP05** · เป็น board exploration + phase deception

### กลไก
1. **Phase 1 (Q1-10) · Data Collection**
   - ไม่มี goal บนกระดาน · HUD แสดง "📡 KEPLER ANALYZER · 0/10"
   - VOID ปล่อย hint หลอก (12 lines pool · ทิศตรงข้าม · trap)
   - ตอบคำถามถูก = ทอย dice (1-6) → คลิกช่อง adjacent N ครั้ง
   - หยุด tile = เปิดเนื้อหา (📘 knowledge / 🐍 trap / 💎 bonus / 🔒 lock)

2. **Phase Flip @ Q10**
   - cutscene: "เคน hack VOID + อารยา Kepler T²=a³ คำนวณพิกัด"
   - ICE_FLASH transition
   - 🎯 Genesis Vault โผล่บนกระดาน (AI วาง strategic)

3. **Phase 2 (Q11+) · Navigation**
   - hint จริง · Manhattan + compass · -1⚡ ต่อครั้ง
   - race ไป Vault · trap dodge · lock unlock

### Tile Distribution (225 ช่อง)
- Knowledge 45 (4 zones) · Trap 15 (M1-M7) · Bonus 8 · Lock 6 · Empty 150 · Start 1

### Energy System
- เริ่ม 15 · trap fail -1 · dice fail -1 · timeout -1 · 0 = C ending
- bonus +2 · GS potion (ใช้ -1 GS = +3 ⚡)

### Question Timer (NEW · ปรับแล้ว)
- 5 วินาที (default · NORMAL difficulty)
- หมดเวลา = 💥 ระเบิด + -1⚡ + กดทอยใหม่
- ตอบผิด = -1⚡ + ปิด popup + ได้คำถามใหม่

### Knowledge Tile (NEW · ปรับแล้ว)
- popup เปิด → ปุ่มปิด lock 5 วิ บังคับอ่าน
- count down 5→0 → ปุ่มปลดล็อก "✓ เข้าใจแล้ว"

### 4 Endings
| Ending | เงื่อนไข |
|---|---|
| **A+ MASTER NAVIGATOR** | reach goal · ⚡≥10 · knowledge ≥35 · refute trap ทุกตัว · Phase 1 hint = 0 |
| **A · STAR PILOT** | reach goal · ⚡≥6 · knowledge ≥25 |
| **B · ROOKIE** | reach goal · ⚡≥1 |
| **C · LOST IN THE VOID** | ⚡=0 หรือไม่ถึง goal |

### 7 Achievements
🦊 SKEPTIC · 🧭 NAVIGATOR · 🎯 PRECISIONIST · 💎 COMPLETIONIST · 🛡️ TRAP-IMMUNE · 📚 DATA SCIENTIST · 🌐 CARTOGRAPHER

---

## 5. 5 Teaching Patterns ใหม่ (vs EP05)

ทุกหน้า scene มีอย่างน้อย 2 patterns · ห้าม fast-click

| Pattern | Module | จุดใส่ | KPA |
|---|---|---|---|
| **🟡 PAUSE & PREDICT** | `pause-card.js` | ก่อน activity · timer 30s | A2 + P1 |
| **🟢 GROUP TALK** | `group-talk.js` | กลาง · timer 60s + chime + 3 roles | A1 + P2 + วPA d1 |
| **🔵 EXPLAIN BACK** | `explain-back.js` | หลัง · keyword chips ⭐ บังคับ | K1-K6 + วPA d2 |
| **🟣 CONFIDENCE GATE** | `confidence-gate.js` | ก่อน next · 1-5 + 1 ข้อสงสัย | A1 + A3 + วPA d3 |
| **🟠 LEARNING JOURNAL** | `learning-journal.js` | scene-end · 3-2-1 | A3 + วPA d3 |

### Reveal-after-submit (`reveal-after-submit.js`)
- ซ่อน EB/Journal/CG จนกว่า submit สำเร็จ
- Patch `Submit.wirePair` broadcast event `cosmosLog:submitted`
- MutationObserver บน `#resultHost` → flash + scroll + answer banner
- Sequential reveal EB→Journal→CG หลัง correct submit

---

## 6. KPA + วPA Tracker (`kpa-tracker.js`)

```js
KPA.log(domain, indicator, evidence)  // K1-K6 / P1-P3 / A1-A3
KPA.vpa(side, ev)                     // ด้าน 1/2/3
KPA.summary()                         // domains + counts
KPA.export()                          // JSON for teacher
KPA.download(filename)                // file download
KPA.startDwell() / stopDwell()        // page dwell time
```

LocalStorage key: `cosmosLog_ep06_kpa`

### Teacher Console (`teacher.html`)
- KPA Heat Map 6×3 (K/P/A × indicators) สี heatmap
- 3 tabs วPA ด้าน 1/2/3 · evidence list
- Dwell Timeline · flag "คลิกเร็ว < 10s"
- Group Talk Status
- Export JSON · auto-refresh 5s

---

## 7. Files Map

```
lessons/astronomy/ep06/
├── config.js                  · 486 บรรทัด · gridBoss + 78 knowledge entries
├── _page-style.css            · saturn/ice theme + typography (body 18, h1 36)
├── index.html                 · 4-act overview
├── teacher.html               · KPA dashboard
├── p00-cover.html             · resume/restart
├── p01-pretest.html           · 8 ข้อ M1-M7
├── p02-anomaly.html
├── p03-void-taunt.html
├── p04-mission-brief.html
├── p05a/b/c-nebula-*.html     · 3 หน้า · GS-1
├── p06-bridge.html
├── p06a-disk-engage.html
├── p06b-disk-gate.html        · GS-2
├── p07-bridge.html
├── p07a/b/c-inner-*.html      · GS-3 + M3
├── p08-bridge.html
├── p08a/b/c-belt-*.html       · GS-4 + M4
├── p09-bridge.html
├── p09a/b/c/d-giants-*.html   · GS-5 + M2 (4 หน้า · ใส่ quiz แยก)
├── p10-bridge.html
├── p10a/b/c/d-kuiper-*.html   · GS-6 + M5
├── p11-voyager-replay.html    · kill M6
├── p12-scale-shock.html
├── p13-kepler-hunt.html       · T²=a³
├── p14-vault-entry.html
├── p15-vault-walls.html
├── p16-void-plan.html
├── p17-habitable-engage.html
├── p18-habitable-explore.html
├── p19-habitable-quiz.html    · kill M7
├── p20-exoplanet.html
├── p21-migration-vote.html
├── p22-bolt-clue.html         · setup EP07
├── p23-boss-prep.html         · difficulty selector
├── p24-boss-grid.html         · ⭐ VOID ZERO-FIX (725 บรรทัด)
├── p24-boss.html.bak          · MCQ เดิม backup
├── p25-rescue-ending.html
├── p26-satellite-fail.html
└── p27-journal.html           · KPA summary + Achievement Hall + print

shared/
├── ep06-boot.js               · 535 บรรทัด · QuestState/Phase3/Gate
├── kpa-tracker.js             · 117 บรรทัด
├── pause-card.js              · 156 บรรทัด
├── group-talk.js              · 210 บรรทัด · pace remote ready
├── explain-back.js            · 140 บรรทัด
├── confidence-gate.js         · 117 บรรทัด
├── learning-journal.js        · 143 บรรทัด
├── reveal-after-submit.js     · 155 บรรทัด
└── void-grid.js               · 676 บรรทัด · maze engine + AI goal placement
```

---

## 8. Continuity ↔ EP05 และ EP07

### EP05 → EP06
- **Patch**: `ep05/p27-journal.html` cliffhanger เปลี่ยนเป็น "VOID ถอย · แต่ดาวหาง 7 ดวงเปลี่ยนวงโคจรพร้อมกัน · มีบางอย่างซ่อนใน Kuiper Belt..."
- เปิด EP06 ด้วยดาวหาง 7 ดวงเบี่ยง (Halley · Hale-Bopp · Borisov-II · West)

### EP06 → EP07
- จบ EP06: ทีมยึด Genesis Vault สำเร็จ · ดาวน์โหลด **"แผนที่เวลา"**
- ดาวเทียมโลกดับทีละดวง (GPS · อินเทอร์เน็ต · สื่อสาร)
- โบลท์เห็นสัญลักษณ์บนแผนที่ตรงกับสมุดพ่อตัวเอง (ปริศนา · setup EP07)
- โบลท์ขึ้นนำทีมครั้งแรก: "ต้องไป Sputnik 1957 · LEO"
- → EP07 "สงครามในวงโคจร"

---

## 9. การทดสอบ

```
ปก:        lessons/astronomy/ep06/index.html
Solo:      lessons/astronomy/ep06/p00-cover.html?solo=1
Boss:      lessons/astronomy/ep06/p24-boss-grid.html?solo=1
ครู:       lessons/astronomy/ep06/teacher.html
EP05 patch: lessons/astronomy/ep05/p27-journal.html (cliffhanger to EP06)
```

### KPA inspection (DevTools console)
```js
KPA.summary()           // ดู counts
KPA.export()            // JSON ทั้งหมด
KPA.download('test.json')
```

---

## 10. ⚠️ ที่ยังค้าง / รู้ไว้ก่อน

- **End-to-end browser test** ยังไม่เคยทดสอบจริงครบ flow
- **Visual assets NASA** ยังไม่มีภาพจริง (Voyager · habitable · exoplanet)
- **Boss music/ambient sound** ยังไม่มี · ใช้แค่ SFX correct/wrong
- **rubric_ep06.md** สร้างใน session นี้ (ตามไฟล์)
- **13 Polish features** กำลังทำใน session นี้ (mobile · mini-map · hint cooldown · GS potion · achievement popup · replay · save/resume · hint pool 25 · achievement hall · difficulty · print · pace remote · static lint)

---

## 11. Session History · Major Milestones

| Date | What |
|---|---|
| 2026-04-30 morning | Initial scaffold 28 หน้า + boot.js + config.js |
| 2026-04-30 afternoon | User feedback "คลิกๆ ผ่าน · เล็ก · ไม่มีกลุ่ม · KPA ยังไม่วัด" → 5 Teaching Patterns + typography upgrade + KPA tracker |
| 2026-04-30 afternoon | reveal-after-submit module · feedback กลับมาเด่นชัด |
| 2026-04-30 evening | User: "ตัวบอสซ้ำ EP05" → redesign · Cosmos Court → บันไดงู → grid maze |
| 2026-05-01 early | Ladder + grid 20×20 → 15×15 single-player + hint phase + AI goal placement |
| 2026-05-01 morning | Build VOID ZERO-FIX · 1,887 บรรทัด · 7 achievements |
| 2026-05-01 morning | User feedback: timer + bomb + bigger content → 78 knowledge entries + bomb explosion + question timer 30s |
| 2026-05-01 noon | User: "ตอบเร็วกว่านี้ 5 วิ" → timer 30s → 5s · knowledge button lock 5s |
| 2026-05-01 noon | User: "ทำหมด" → 13 polish features delegated |

---

## 12. Cliffhanger → EP07 (จาก p27 ของ EP06)

```
ทีมยึด Vault · ได้แผนที่เวลา · แต่...
ดาวเทียมโลกเริ่มดับทีละดวง:
  GPS ดับ · อินเทอร์เน็ตดับ · ดาวเทียมสื่อสารดับ
โลกถูกตัดขาด

โบลท์ (ก้มดูสมุดบันทึกของพ่อ · มือสั่น):
  "ผมเห็นสัญลักษณ์มุมแผนที่...
   มันคือลายมือพ่อผมตอนเด็ก
   ทำไมพ่อผมรู้ภาษานี้?"

(ยังไม่บอกใคร · เก็บไว้)

โบลท์ (ครั้งแรกที่นำทีม):
  "ถ้าจะอ่านแผนที่นี้ · เราต้องกลับไปจุดเริ่มต้น
   เทคโนโลยีอวกาศของมนุษย์ —
   Sputnik · 1957 · LEO"

พ่ออารยา (พยักหน้าเงียบ):
  "...ไปเลย กัปตัน"

→ EP07 "สงครามในวงโคจร"
```

---

*HANDOFF · 2026-05-01 · COSMOS LOG EP06 · scaffold + 5 patterns + KPA + grid boss + 78 knowledge entries · ready for end-to-end test*
