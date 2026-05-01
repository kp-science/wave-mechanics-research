# CONTEXT · COSMOS LOG EP07 · "สงครามในวงโคจร · Orbital War"

> เปิดแชทใหม่ → อ่านไฟล์นี้ + `HANDOFF_ep06.md` → เริ่มทำ EP07 ได้ทันที

---

## 1. ต่อจาก EP06 cliffhanger

ทีมยึด Genesis Vault ใน Kuiper · ได้ "แผนที่เวลา" · ดาวเทียมโลกดับทั้งจักรวาล (GPS · อินเทอร์เน็ต · สื่อสาร) · **โบลท์**ขึ้นนำทีมครั้งแรก: "ต้องไป Sputnik · 1957 · LEO"

EP07 เปิด: เข้าเขต LEO เห็น VOID drone ยึดดาวเทียม → กู้คืน 3 ชั้น (LEO → MEO → GEO) → โบลท์เจอดาวเทียมเก่าของพ่อตัวเอง บรรจุข้อความ + warp drive blueprint → cliffhanger: warp ย้อนเวลาเปิด → เป้าหมาย = บิกแบง → EP08 finale

---

## 2. Curriculum · ว 7.2 ม.6/1-2 (เทคโนโลยีอวกาศ)

- v_orbit = √(GM/r) · 7.9 km/s
- v_escape = √(2GM/r) · 11.2 km/s
- LEO 160-2,000 km · MEO 2,000-35,786 · GEO 35,786
- Multi-stage rocket · Tsiolkovsky · delta-v
- ใช้ดาวเทียม: GPS · comms · weather · imaging · ISS
- Voyager · Hubble · JWST · Apollo · spinoff tech

**M1-M7:** GEO ลอยนิ่ง · ดาวเทียมไม่ใช้พลังงาน · สูง = เร็ว · จรวดต้องดันตลอด · GPS 1 สัญญาณพอ · ISS อยู่นอกอวกาศ · เทคโนโลยีอวกาศสิ้นเปลือง

---

## 3. โครง 28 หน้า · เลียน EP06

```
ACT A · ARRIVAL @ LEO (5)
  p00 cover · p01 pretest · p02 satellite-graveyard
  p03 void-control · p04 mission-brief

ACT B · LAW OF ORBITS (6) · OS-1, OS-2
  p05a/b/c orbit + v_orbit lab · p06-bridge
  p06a/b velocity + v_escape lab

ACT C · 3 ALTITUDE LAYERS (15)
  p07 LEO  (3)  · OS-3 + kill M6
  p08 MEO  (3)  · OS-4 + kill M5 (GPS trilateration)
  p09 GEO  (4)  · OS-5 + kill M1 (geo-stationary myth)
  p10 Beyond (4) · OS-6 + kill M2

ACT D · ROCKET FORGE + WARP (16)
  p11 multi-stage Tsiolkovsky · kill M4
  p12 delta-v budget · p13 spinoff kill M7
  p14 fathers-vault · p15 fathers-message
  p16 warp-blueprint · p17 iss-walkthrough
  p18 satellite-uses · p19 famous-missions
  p20 spinoff-quiz · p21 mission-vote
  p22 bolts-decision · p23 boss-prep
  p24 boss-orbit-forge ⭐ NEW MECHANIC
  p25 rescue · p26 warp-activate · p27 journal
```

---

## 4. ⭐ BOSS ใหม่ · "ORBIT FORGE" · Tower Defense + Engineering

| EP | Boss |
|---|---|
| EP05 | MCQ race + timer |
| EP06 | 15×15 grid maze + phase deception |
| **EP07** | **Tower Defense · drag rocket วาง 3 orbit + คำนวณ delta-v** |

**Visual:** โลกกลางจอ · 3 วงแหวน orbit · VOID drone บินจากนอกเข้าใน · ผู้เล่น drag rocket+satellite ไปวาง

**3 Wave (18 นาที):**
- W1 LEO 400km · 1-stage · ติดดาวเทียม comm 6 ดวง
- W2 MEO 20,200km · 2-stage Hohmann · GPS trilateration 4 ดวง
- W3 GEO 35,786km · 3-stage + gravity assist · ตี VOID Mothership

**Mechanic ใหม่:** drag-to-place · กรอก v_orbit เอง · multi-stage rocket builder · real physics sim (ตก/orbit/หลุด ตาม v)

**Endings:** A+ ROCKET MASTER · A ORBITAL ENGINEER · B APPRENTICE · C MISSION FAILED

**7 Achievements:** PERFECT CALC · CONSTELLATION · FUEL EFFICIENT · GEO MASTER · NETWORK RESTORED · GRAVITY ASSIST · SHIELD WALL

---

## 5. OS · Orbital Shards 6 ชิ้น

🛰️ LEO Lock · 🚀 Escape Vector · 📡 LEO Comm · 🧭 MEO Mesh · 🌐 GEO Lock · ♾️ Beyond Reach
ครบ 6 = **ROCKET LANCE** (A+ unlock)

---

## 6. Files

### Reuse (ห้ามแก้)
11 shared modules: kpa-tracker · pause-card · group-talk · explain-back · confidence-gate · learning-journal · reveal-after-submit · mission-brief · mystery-box · starfield · audio

### สร้างใหม่
- `shared/ep07-boot.js` (clone ep06-boot · prefix `cosmosLog_ep07_`)
- `shared/orbit-forge.js` ⭐ boss engine (~700 บรรทัด)
- `shared/rocket-physics.js` (Tsiolkovsky · v_orbit · trajectory · ~200)
- `shared/orbit-builder.js` (drag UI · ~250)
- `ep07/` (28 หน้า + config + style + index + teacher · ~6,500 บรรทัด)

### Patch
- `ep06/p27-journal.html` cliffhanger → "ดาวเทียมดับ · ไป Sputnik 1957"

---

## 7. Theme

EP06 = cyan/purple · **EP07 = orange/steel/electric**
```
--rocket-orange: #ff8a3d  /* primary */
--steel-blue:    #4a90e2  /* secondary */
--electric:      #00d4ff  /* GPS accent */
```

---

## 8. กฎที่ห้ามลืม (จาก memory · feedback_cosmos_log_design.md)

1. Book-page flow · 1 กิจกรรม = 1 ไฟล์ · ห้ามลอย
2. Experience Before Labeling
3. Before → Activity → After
4. ห้าม info dump · ทุกอย่างให้หาเอง
5. Teacher Cue ทุกหน้า
6. ภาษาไทยเรียบง่าย
7. tap-chips ทั้งหมด · ห้าม textarea
8. 5 Teaching Patterns ≥2 ต่อ scene · ConfidenceGate ก่อน next
9. KPA + วPA log ทุก action
10. mobile responsive · typography body 18px

---

## 9. ขนาดงาน

- 28 หน้า + boss + 3 modules + config + style = **~8,650 บรรทัด**
- เวลา agent: ~40 นาที scaffold + 20 นาที boss + 10 นาที polish

---

## 10. Cliffhanger → EP08

พ่อโบลท์ + พ่ออารยา · 2 console พร้อม · warp activate · เป้าหมาย = วินาทีที่ 0 ของบิกแบง → **EP08 "Genesis Again"** Season Finale

---

## 11. คำสั่งเริ่ม (paste ในแชทใหม่)

> "ทำ COSMOS LOG EP07 ตาม CONTEXT_ep07.md · ใช้โครงสร้าง EP06 + boss แบบ Tower Defense (ไม่ซ้ำ EP05/06) · scaffold 28 หน้า + boss + 3 modules · เริ่มจาก narrative + design brief ก่อน"

---

*ไฟล์: lessons/astronomy/CONTEXT_ep07.md · 2026-05-01*
