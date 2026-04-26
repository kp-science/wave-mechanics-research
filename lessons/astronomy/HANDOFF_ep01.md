# HANDOFF · COSMOS LOG EP01 · Session Log

> ใช้ไฟล์นี้เพื่อเริ่มแชทใหม่โดยไม่เสียบริบท · คัดลอก section "PROMPT สำหรับเริ่มแชทใหม่" ด้านล่างสุดแปะในแชทใหม่ได้เลย

**วันที่บันทึกล่าสุด**: 2026-04-22
**สถานะ EP01**: ✅ **เสร็จสมบูรณ์ 19 หน้า · 112 นาที**
**โครงสร้าง**: Shell + Pages (1 ไฟล์ = 1 กิจกรรม)

---

## 1. โปรเจกต์คืออะไร

สื่อการสอน **ดาราศาสตร์ ม.6 หน่วย 1** เป็นซีรีส์ **"COSMOS LOG"** 8 ตอน (EP01–EP08) · รวม 16 คาบ (เรียนครั้งละ 2 คาบ = 100 นาที)

### ซีรีส์ทั้งหมด
| EP | เรื่อง | ตัวชี้วัด | สถานะ |
|---|---|---|---|
| 01 | การปะทะ · เอกภพ บิกแบง | ว 7.1 ม.4-6/1 | ✅ เสร็จ |
| 02 | แผนที่ลับกาแล็กซี | ว 7.1 ม.4-6/1 | ⏳ |
| 03 | เสียงร้องจากอดีต · ดาวฤกษ์ | ว 7.1 ม.4-6/2 | ⏳ |
| 04 | วันสุดท้ายของยักษ์แดง | ว 7.1 ม.4-6/2 | ⏳ |
| 05 | หัวใจที่เต้นผิดจังหวะ · ดวงอาทิตย์ | ว 7.1 ม.4-6/1 | ⏳ |
| 06 | ขอบฟ้าของบ้าน · ระบบสุริยะ | ว 7.1 ม.4-6/1 | ⏳ |
| 07 | สงครามในวงโคจร | ว 7.2 ม.4-6/1-2 | ⏳ |
| 08 | จุดเริ่มต้นอีกครั้ง · Finale | ว 7.2 ม.4-6/3 | ⏳ |

---

## 2. หลักการออกแบบ (ห้ามหลุด)

### A · Narrative-Based Learning + Gamification + Experience Before Labeling
- **ไม่ใช่ 5E** · โครงหนังซีรีส์
- ทีม = ลูกเรือ T.H.E.O.S.-IX · เนื้อหา = เครื่องมือเอาตัวรอด
- Antagonist = VOID · ใช้ misconceptions เป็นอาวุธ
- **ทดลอง/สังเกตก่อน** (Experience) · **ครูใส่ศัพท์วิชาการทีหลัง** (Labeling)
- **จุดครูสอนเต็มเดียว = P10 Dr.Hubble** (5 นาที) · ที่อื่นเป็น facilitator

### B · Book-page flow (หลักสำคัญ)
- 1 หน้า = 1 ไฟล์ HTML
- สลับ STORY หน้า (ดู/ฟัง · กดต่อไป) กับ PUZZLE หน้า (ต้องแก้ถึงผ่าน)
- **output ของ puzzle = input ของ story ถัดไป** · ไม่มีหน้าลอย

### C · ทุกกิจกรรมต้องมี Before → Activity → After
- **Before** · cinematic เล่าปัญหา/stake/theory (ตัวอย่าง: S3 · 6 beats intro)
- **Activity** · ทำจริง
- **After** · พิสูจน์เข้าใจผ่าน gate ที่โยงเนื้อเรื่อง (Ship Lock · Decrypt 7 ช่อง · VOID rebuttal)

### D · ไม่มี Info Dump
- ทุกข้อมูลต้องให้นักเรียนหาเอง · ถ้ามี text ยาว ต้องมี puzzle/fill-blank ตามมา
- ตัวอย่าง: P06 Decrypt CMB · เลือก 1 ใน 3 แหล่งสืบค้น · กรอก 7 ช่อง

### E · Teacher Cue ทุกหน้า
- collapsible panel · บอก timing · role · what to say · what NOT
- โดยเฉพาะ P10 · สคริปต์ครูอธิบายบิกแบงเต็ม 5 นาที (6 ยุค + 2 หลักฐาน + 3 misconceptions)

### F · Research Data Capture
- ทุก puzzle เก็บ `{ answer, correct, timestamp }` ใน localStorage
- Export JSON ใน P19 Journey Map
- ใช้วัด conceptual change · Bloom profile · affective response

---

## 3. สถาปัตยกรรม · Shell + Pages

```
astronomy/
├── shared/                    ← ใช้ร่วมทุก EP
│   ├── book.css               ← ธีม · HUD · phase tags · forms
│   ├── book.js                ← PAGES array · state · navigation · Energy
│   └── particles.js           ← Particle Simulation Engine (P11)
├── ep01/                      ← 19 หน้า · 112 นาที
│   ├── index.html             ← redirect ไป p01
│   └── p01-*.html ถึง p19 (รายละเอียดข้อ 4)
├── ep02/ ep03/ ...            ← EP ต่อ · copy ep01/ เป็น template · ใช้ shared/ เดิม
├── cosmos-log-series-bible.html (overview 8 ตอน)
├── ep01-the-collision.html    (แผนเอกสาร)
└── ep01-scene.html            (monolith เก่า · เก็บไว้เทียบ)
```

**การทำงาน**:
- book.js มี `PAGES` array · กำหนดลำดับและ gate
- แต่ละ page file มี `<body data-page="pXX">` · book.js เรียก HUD + nav จาก data-page
- state อยู่ใน `localStorage` key `cosmosLog_state` · ข้อมูลคงอยู่ระหว่างเปลี่ยนหน้า
- มี `Book.addEnergy()` · `Book.addDiscovery()` · `Book.addInventory()` · `Book.completePage()` · `Book.savePageData()`

---

## 4. โครง 19 หน้า · EP01 (112 นาที)

| # | ID | ไฟล์ | ชื่อ | ประเภท | นาที | ตัวชี้วัด/เนื้อหาหลัก |
|---|---|---|---|---|---|---|
| 01 | p01 | p01-entry.html | Entry Ticket · Pre-test 3 ข้อ | PUZZLE | 3 | baseline (3 concept ques) |
| 02 | p02 | p02-team.html | เลือกทีม (6 ยาน) + บทบาท | SETUP | 2 | A2 ทีมเวิร์ก |
| 03 | p03 | p03-collision.html | Cold Open · ยานชน | STORY | 3 | narrative hook |
| 04 | p04 | p04-debris.html | Debris Match 5 ชิ้น (drag-drop) | PUZZLE | 7 | Experience · observation |
| 05 | p05 | p05-age.html | "แสงอายุ 13.8B!" | STORY | 2 | อายุเอกภพ |
| 06 | p06 | p06-research.html | Research + Decrypt 7 ช่อง CMB | PUZZLE | 8 | K3 CMB · Penzias-Wilson 1965 |
| 07 | p07 | p07-cmb.html | "นี่คือ CMB!" | STORY | 2 | labeling phase 1 |
| 08 | p08 | p08-arrive.html | ถึงสถานี A · Dr.Hubble รอ | STORY | 2 | setting change |
| 09 | p09 | p09-balloon.html | Balloon Lab · Before (predict) + Activity (graph) | PUZZLE | 20 | K1 การขยายตัว |
| 10 | p10 | p10-hubble.html | 🎓 ครูสอนบิกแบงเต็ม 5 นาที + Checkpoint 3 ข้อ | STORY | 5 | K1-K3 · ทฤษฎีบิกแบง · v=H₀D |
| 11 | p11 | p11-timeline.html | 6 ยุคอนุภาค + Particle Simulation | PUZZLE | 10 | ลำดับอนุภาค สสวท. |
| 12 | p12 | p12-galaxy.html | Galaxy A หายไปไหน? | STORY | 2 | problem setup |
| 13 | p13 | p13-shiplock.html | Ship Lock · คำนวณ D=100 · ไฟเขียว/แดง | PUZZLE | 8 | P · v=H₀D apply |
| 14 | p14 | p14-void.html | VOID โผล่ · rebut 3 claims | MIXED | 8 | แก้ misconceptions |
| 15 | p15 | p15-warp.html | Warp cutscene + cliffhanger EP02 | STORY | 3 | narrative close |
| 16 | p16 | p16-review.html | Movie Recap · เรียง 8 ฉาก | PUZZLE | 7 | review · narrative recap |
| 17 | p17 | p17-exercise.html | แบบฝึกหัด 15 ข้อ Bloom 6 ระดับ | PUZZLE | 10 | content drill L1-L6 |
| 18 | p18 | p17-exit.html | Exit Ticket · 3-2-1 Journal | REFLECT | 5 | affective + preference |
| 19 | p19 | p16-map.html | Journey Map + Post-test + Export JSON | REFLECT | 10 | conceptual change (pre/post) |
|  |  |  |  | **รวม** | **112** |  |

### หมายเหตุ filename mapping
- `p17-exit.html` = page id `p18` (เคยเป็น p17 ก่อนแทรก exercise)
- `p16-map.html` = page id `p19` (เคยเป็น p16)
- filename ไม่ตรงกับ page id เพราะไม่ได้ rename file · แค่อัปเดต data-page ใน body

---

## 5. เนื้อหาอ้างอิง

### ตัวชี้วัด EP01
- **ว 7.1 ม.4-6/1** สืบค้นและอธิบายการเกิดและวิวัฒนาการของเอกภพ
- **ว 8.1** กระบวนการทางวิทยาศาสตร์

### ตารางอนุภาค 6 ยุค (สสวท. บังคับ · ใช้ใน P11)
| ยุค | เวลา | อุณหภูมิ | อนุภาคที่มี |
|---|---|---|---|
| 1 · Planck | 10⁻⁴³–10⁻³² วิ | 10³²–10²⁷ K | ควาร์ก · แอนติควาร์ก · อิเล็กตรอน · โพซิตรอน · นิวทริโน · แอนตินิวทริโน |
| 2 · Radiation | 10⁻³²–10⁻⁶ วิ | 10²⁷–10¹³ K | + โฟตอน |
| 3 · Nucleon | 10⁻⁶ วิ–3 นาที | 10¹³–10⁹ K | อิเล็กตรอน · โพซิตรอน · นิวทริโน · แอนตินิวทริโน · โฟตอน · **นิวตรอน · โปรตอน** |
| 4 · BBN | 3 นาที–300,000 ปี | 10⁹–5,000 K | อิเล็กตรอน · นิวทริโน · โฟตอน · นิวตรอน · โปรตอน · **นิวเคลียสฮีเลียม** |
| 5 · Recombination | 300,000–1,000 ล้านปี | 5,000–100 K | นิวทริโน · โฟตอน · **อะตอม H · อะตอม He** |
| 6 · Present | 1,000–13,800 ล้านปี | 100–2.73 K | นิวทริโน · โฟตอน · **กาแล็กซี** |

### ค่าคงที่
- H₀ = 70 km/s/Mpc (IPST · ค่าจริง 67.4–73)
- CMB = 2.725 K (COBE/FIRAS 1994)
- Discovery: Penzias-Wilson 1965 · Bell Labs · Nobel 1978
- อายุเอกภพ = 13.8 พันล้านปี (Planck 2018)

### Misconceptions หลัก (ใช้ใน P14 VOID)
1. บิกแบง = ระเบิดในที่ว่าง (ผิด · ขยายของอวกาศ)
2. เอกภพมีศูนย์กลาง (ผิด · ไม่มีจุดพิเศษ)
3. ธาตุหนักเกิดจากบิกแบง (ผิด · เกิดในดาว · BBN สร้างแค่ H, He)

---

## 6. แผนที่ครูแทรกตามหน้า

| Page | บทบาทครู | รายละเอียดหลัก |
|---|---|---|
| P01 | แนะนำ | แนะนำซีรีส์ · ยังไม่เฉลย |
| P02 | จัดทีม | แบ่งทีม + บทบาท |
| P03 | ผู้บรรยาย | อ่าน Cold Open |
| P04 | Socratic | ห้ามใช้ศัพท์ redshift/CMB |
| P05 | ขยายอารมณ์ | "13.8 พันล้าน..." |
| P06 | แนะนำ | ไม่เฉลย decrypt |
| P07 | ผู้บรรยาย | ย้ำ CMB |
| P08 | เปลี่ยนฉาก | สถานี A |
| P09 | ผู้สังเกต | ห้ามพูด "การขยาย" |
| **P10** | **🌟 สอนเต็ม 5 นาที** | **บิกแบง + 6 ยุค + หลักฐาน + misconceptions** |
| P11 | กระตุ้น | "สังเกตอะไร" |
| P12 | ผู้บรรยาย | ปริศนา Galaxy A |
| P13 | ผู้ใบ้ | v=H₀D |
| P14 | เล่น VOID | เสียงชั่วร้าย |
| P15 | ผู้ปิด | ทีเซอร์ EP02 |
| P16 | facilitator | ใบ้ลำดับฉาก |
| P17 | facilitator | ใบ้ Bloom ระดับสูง |
| P18 | เก็บข้อมูล | 3-2-1 Journal |
| P19 | ผู้มอบรางวัล | Badge + Side Quest |

---

## 7. Media Wishlist (ยังไม่ทำ · ใช้ placeholder)

- M1 · Cold Open video 90 วินาที (P03) · ยานชน
- M2 · เสียง LEMAÎTRE (P03, P06, P08)
- M3 · VOID hologram animation (P14)
- M4 · Balloon simulation backup (P09)
- M5 · CMB static sound (P06, P07)
- M6 · Ship bridge + asteroid + nebula art
- M7 · Big Bang timeline scrubber (P11 backup)
- M8 · Badge reveal chime (P19)

---

## 8. EP02-08 · แนวทางทำต่อ

### โครงแต่ละ EP (ใช้ pattern เดียวกัน)
1. Entry Ticket (pre-test · 3 concepts) · 3 นาที
2. Team continue (โหลด state จาก EP ก่อน) · 2 นาที
3. Cold Open (STORY · narrative hook) · 3 นาที
4. Investigation 1 (PUZZLE) · 8 นาที
5. Bridge story · 2 นาที
6. Investigation 2 (PUZZLE) · 8 นาที
7. Bridge story · 2 นาที
8. **Lab/Experiment + Dr.Hubble Reveal** (core content) · 25-30 นาที
9. Simulation/interactive content · 10 นาที
10. Application puzzle (Ship Lock-style) · 8 นาที
11. VOID fight (rebut 3 misconceptions เฉพาะ EP) · 8 นาที
12. Warp cutscene · 3 นาที
13. Movie Recap · 7 นาที
14. Bloom Exercise · 10 นาที
15. Exit Ticket · 5 นาที
16. Journey Map + Post-test · 10 นาที

### ขั้นตอนสร้าง EP02
1. สร้างโฟลเดอร์ `ep02/`
2. copy ไฟล์ ep01/* เป็น template
3. ปรับ content ตามเรื่อง EP02 (แผนที่ลับกาแล็กซี)
4. อัปเดต book.js PAGES ให้มี 2 ชุด (ep01 · ep02) หรือสร้าง book.js ของ EP02 แยก
5. Journey Map EP01 import JSON ได้ใน EP02 (state persists ผ่าน localStorage)

### Misconceptions เฉพาะ EP
- EP02 · "ทางช้างเผือกเป็นแค่เมฆบนท้องฟ้า"
- EP03 · "ตัวเลข magnitude ยิ่งมากยิ่งสว่าง"
- EP04 · "ดาวแดง = ร้อนสุด"
- EP05 · "ดวงอาทิตย์เผาไหม้แบบเคมี"
- EP06 · "ฤดูกาลเกิดจากระยะห่างจากดวงอาทิตย์"
- EP07 · "GEO ลอยนิ่งเหนือหัว"
- EP08 · "เทคโนโลยีอวกาศเปลืองงบ"

---

## 9. สิ่งที่ผู้ใช้ย้ำหลายครั้ง (สำคัญ)

- **ภาษาไทยเรียบง่าย** · หลีกเลี่ยงศัพท์เทคนิค (refactor · component · architecture) · ใช้ "แก้" แทน "edit"
- **1 กิจกรรม = 1 ไฟล์** · เหมือนใบงาน · แก้ทีละแผ่นง่าย
- **ไม่ใช่ท่องจำ · เดินทางผ่านเรื่อง** · คอนเซปต์ผูกกับฉาก
- **ครูแทรกตรงไหน?** เป็นคำถามหลัก · ต้องระบุชัดในทุกหน้า
- **ใส่ชื่อให้อนุภาค** · chip ต้องมีสี + label + ชื่อไทย
- **ตรวจเวลา 100 นาที** · ปัจจุบัน 112 · ถ้าลดได้ (P09 20→15 · P14 8→5 · P19 10→7)
- **ผู้ใช้เป็นครูฟิสิกส์ · วิจัย conceptual change** · ต้องเก็บ research data ในทุก puzzle

---

## 10. PROMPT สำหรับเริ่มแชทใหม่

คัดลอกข้อความต่อไปนี้ไปแปะในแชทใหม่:

```
สวัสดีครับ · ผมกำลังทำซีรีส์ COSMOS LOG ·
สื่อการสอนดาราศาสตร์ ม.6 ทั้งหน่วย 1

EP01 เสร็จแล้วที่:
wave-mechanics-research/lessons/astronomy/ep01/
(19 หน้า · 112 นาที · shell+pages architecture)

บริบทเต็มอยู่ที่:
wave-mechanics-research/lessons/astronomy/HANDOFF_ep01.md

กรุณาอ่าน HANDOFF_ep01.md ก่อนเริ่มงาน แล้วบอกผมว่าจะทำอะไรต่อ
โดยหลักการที่ต้องไม่หลุด:
- Book-page flow (1 ไฟล์ = 1 กิจกรรม)
- Experience Before Labeling
- ทุกกิจกรรมมี Before → Activity → After
- ไม่มี info dump
- Teacher Cue ทุกหน้า
- ภาษาไทยเรียบง่าย

ตอนนี้อยากทำ ________ (บอกงานที่อยาก)
```

---

## 11. หมายเหตุสำคัญ

- ผู้ใช้เป็นครูฟิสิกส์/วิทย์ ม.ปลาย · วิจัย conceptual change
- ผู้ใช้ให้ implement เลย ไม่ต้องถามเยอะ · แต่ถ้า scope ใหญ่ให้ propose ก่อน
- Design philosophy: **"เหมือนดูหนังแล้วคนดูช่วยแก้ปมไปทีละปม · ไม่ใช่การสอนแบบทั่วไป"**
- ถ้า localStorage state เก่าจาก ep01-scene.html ค้าง · book.js มี migration อัตโนมัติ (`Book.load()`)
- Reset State button ในมุมขวาบน HUD · ล้าง localStorage + reload
