# Pedagogy · Misconceptions, 5E, Bloom, CRI, Learning Objectives

หลักการ: เกมไม่ใช่แค่สนุก · ต้องส่ง data ให้ครูใช้พัฒนาการเรียนการสอน + ทำวิจัยได้

---

## 1. Learning Objectives (K · P · A)

ทุก EP ต้องมี objectives ชัดเจน · ใส่ใน `EP_CONFIG.objectives`:

```js
objectives: {
  K1: { label:'อ่าน apparent magnitude (m น้อย=สว่าง)', 
        pages:['p06','p07','p14'], threshold:0.85 },
  K2: { label:'ใช้ parallax: d(pc) = 1/p(")', 
        pages:['p04','p05','p13'], threshold:0.67 },
  K3: { label:'แปลง ly ↔ pc ↔ AU', 
        pages:['p10','p14','p17'], threshold:0.67 },
  K4: { label:'เข้าใจ m vs M (สัมบูรณ์ vs ปรากฎ)', 
        pages:['p09','p11','p13'], threshold:0.67 },
  P1: { label:'สังเกต·วัดมุม parallax', pages:['p04','p05'] },
  P2: { label:'ทำนายความสว่างจริง', pages:['p09'] },
  P3: { label:'วิเคราะห์หลักฐาน · trap', pages:['p07','p14','p16'] },
  P4: { label:'คำนวณใต้เวลา', pages:['p11','p13'] },
  A1: { label:'ทีม · ฟังเสียงข้างน้อย', pages:['p03','p07','p12'] },
  A2: { label:'กล้าวิพากษ์ antagonist', pages:['p07','p09','p14'] },
  A3: { label:'ไม่ย่อท้อ · resolve story arc', pages:['p13','p15','p18'] },
  A4: { label:'จิตวิทยาศาสตร์ · anti-misconception', pages:['p14','p18'] },
},
```

K = Knowledge (4-5 ข้อ · core content)
P = Process (3-4 ข้อ · scientific skills)
A = Affective (3-4 ข้อ · attitude · 21st century skills)

แต่ละ objective:
- `label` = คำอธิบายภาษาไทย
- `pages` = หน้าไหนที่ teach + assess
- `threshold` = % ที่นักเรียนต้องผ่าน (สำหรับ K)

แสดงใน badge cert (p19) เป็น matrix · ครูดู gain

---

## 2. Misconception Inventory (M-codes)

ตั้งโค้ด M1, M2, M3... · target ในเกม

ตัวอย่าง EP03:
```
M1 · "ตัวเลข m น้อย = ดาวหรี่"
   → จริง: m น้อย = สว่างกว่า (กลับทิศ · log scale)

M2 · "ดาวที่ตาเห็นสว่างที่สุด = ปล่อยแสงจริงเยอะที่สุด"
   → จริง: m ขึ้นกับระยะด้วย · ใช้ M เพื่อเปรียบ "ปล่อยแสงจริง"

M3 · "parsec = หน่วยเวลา"
   → จริง: parsec = หน่วยระยะ · 1 pc ≈ 3.26 ปีแสง
```

### ใช้ misconception ใน design
- **Pre-test (p01)**: ทุกข้อ tag ด้วย M-code → วัดความเข้าใจเดิม
- **Boss claims**: antagonist พูด misconception โต้งๆ ในแต่ละ phase
- **Lab note classify**: ใส่ misconception statement (เพื่อกาผิด)
- **Post-test (p19)**: parallel form ของ pre-test · เทียบ gain ต่อ misconception
- **Cert (p19 result)**: 🟢 "ปลด M2 ได้" หรือ 🔴 "ยังติด M2"

```js
// ใน p01 questions:
{ id:'Q3', m:'M2', q:'...', a:[...], c:0 }

// ใน p19 (parallel form):
{ id:'Q3', m:'M2', q:'... (ตัวเลขต่างกัน · concept เดียวกัน) ...', a:[...], c:0 }

// computePost():
const byM = {};  // M2: { pre: 1/2, post: 2/2, gain: 0.5, resolved: true }
```

---

## 3. CRI (Confidence-based Rating Index)

วัดความมั่นใจคู่กับคำตอบ → categorize ระดับความเข้าใจ

```html
<div class="cri-row">
  <span class="cri-label">มั่นใจ?</span>
  <button onclick="pickCri(i, 1)">🎲 เดา</button>
  <button onclick="pickCri(i, 2)">🤔 ลังเล</button>
  <button onclick="pickCri(i, 3)">💡 แน่ใจ</button>
</div>
```

### CRI matrix (อ่านในเอกสาร p19)
| ตอบ | ความมั่นใจ | ตีความ |
|---|---|---|
| ถูก | แน่ใจ | **เข้าใจจริง** |
| ถูก | ลังเล/เดา | **ลัคกี้ · ทบทวน** |
| ผิด | ลังเล/เดา | **ไม่รู้ · เติมความรู้** |
| ผิด | แน่ใจ | **misconception ฝังลึก · สอนใหม่** |

→ ครูได้ data จริงว่าใครต้องช่วยอะไร

---

## 4. 5E Learning Cycle

Map กับ page types:
| 5E phase | Page type | EP03 examples |
|---|---|---|
| **Engage** | story (HOOK) | p00, p01, p02 |
| **Explore** | puzzle (INVEST) | p05, p08, p12 |
| **Explain** | story (TEACH/REVEAL) | p04, p06, p07 |
| **Elaborate** | puzzle (apply) | p09, p15 |
| **Evaluate** | reflection (post-test) | p19 |

ไม่ต้องบังคับ 5E ตายตัว · แต่ check coverage

---

## 5. Bloom's Taxonomy (สำหรับ quiz design)

ถามคำถามให้กระจาย Bloom levels · อย่ากระจุก L1-L2:

| Level | Verb | EP03 ตัวอย่าง |
|---|---|---|
| L1 Remember | บอก, จำ | "Sirius มี m เท่าไร?" |
| L2 Understand | อธิบาย | "ทำไมยิ่ง m น้อย ดาวยิ่งสว่าง?" |
| L3 Apply | ใช้สูตร | "p=0.5″ → d?" |
| L4 Analyze | เปรียบเทียบ | "Deneb หรี่กว่า Sirius เพราะ?" |
| L5 Evaluate | วินิจฉัย | "VOID claim นี้ผิดเพราะ?" |
| L6 Create | สังเคราะห์ | "ถ้าอยากรู้ M ต้องมี?" |

Bloom 15 ข้อ ใน boss fight (3 phase × 5 ข้อ) → cover ทุก level

---

## 6. PEOE (Predict-Explain-Observe-Explain)

ใช้ใน lab activity 6-step · โดยเฉพาะ STEP 1-2-5:

```
STEP 1 PREDICT  → "เดา · ก่อนเริ่ม" (ไม่มีผิดถูก · เก็บ naive thinking)
STEP 2 EXPLAIN  → "ลองเอง" (ที่ใช่/ไม่ใช่ก็ทำได้)
STEP 3-4 OBSERVE → ลงมือวัด · จดข้อมูล
STEP 5 EXPLAIN' → เทียบ predict vs actual + classify statements
```

→ ครูดู predicted vs final → analyse conceptual change

---

## 7. Pre-test / Post-test (วัด gain)

### Format: parallel form (1:1)
ข้อใน p01 (pre) ↔ ข้อใน p19 (post) ตอบ misconception เดียวกัน · ตัวเลข/ดวงดาวต่าง

```js
// p01 pre-test:
{ id:'Q1', m:'M1', q:'Polaris (m=+2.0) · Sirius (m=−1.5) · ใครสว่างปรากฎกว่า?', ... }

// p19 post-test (parallel):
{ id:'Q1', m:'M1', q:'Canopus (m=−0.7) · Vega (m=+0.03) · ใครสว่างปรากฎกว่า?', ... }
```

### gain calculation
```js
const pre = Submit.load('p01');
const post = computePost();
const gain = post.correctCount - pre.correct;
// per-misconception:
const byM = {};
QS.forEach(q => {
  const mid = q.m;
  byM[mid] = byM[mid] || { pre:0, post:0, total:0 };
  byM[mid].total++;
  if (state[q.id]?.ans === q.c) byM[mid].post++;
  if (pre.answers?.[q.id] === q.c) byM[mid].pre++;
});
// resolved? gain >= threshold (e.g. +1)
```

### Cert breakdown UI
```
M1: pre 1/2 → post 2/2 (+1) 🟢 ปลดได้
M2: pre 0/2 → post 1/2 (+1) 🟡 ใกล้ปลด
M3: pre 0/2 → post 0/2 ( 0) 🔴 ยังติด
```

---

## 8. Reflection (สำคัญสุด · 21st century skill)

### 3-2-1 Journal (p19b)
Pattern จาก EP01 · เก็บ metacognitive + affective data:

- **3 · สิ่งที่เรียนรู้ (เนื้อหา)** · กา 3 จาก ~8 concept choices
- **2 · ฉากประทับใจ (เรื่องราว)** · drag 2 scenes + เหตุผล
- **1 · คำถามที่อยากรู้ต่อ** · เลือก preset หรือเขียนเอง

### Bonus data (สำคัญสำหรับวิจัย)
- **Emoji** ความรู้สึก (😍🤔🤯🥲😵)
- **Star rating** ความเข้าใจตนเอง 1-5
- **Confidence slider** "ถ้าสอบตอนนี้ได้กี่ %"

---

## 9. Differentiated Reward (ตามผลงาน)

แทนการให้ "ทุกคนได้รางวัลเท่ากัน" · ใช้ tier-based:
- PERFECT (0 ผิด) → 3 ชิ้น · max value
- GOOD (1-3 ผิด) → 2 ชิ้น · ลดค่า
- PASS (4+ ผิด) → 1 ชิ้น · cheap pool

→ Motivate effort · แต่ทุกคนยังได้บางอย่าง (no zero reward)

---

## 10. Story-Driven Engagement

### หลักการ
1. **Stakes สูง**: ตัวละครมีเป้าหมายชัด (พ่อหายไป · ดาวระเบิด)
2. **Stakes ใกล้ตัว**: emotional relevance (Arya = ลูก · เด็กเข้าใจได้)
3. **Player agency**: choices มีผลจริง (ending tree · shop strategy · misconception detection)
4. **Tension curve**: build up → climax → resolution
5. **Mentor relief**: Dr.Hubble คอยให้ context · ป้องกัน frustration

### Anti-pattern (อย่าทำ)
- ❌ เนื้อเรื่องตัดสินจบใน 1 หน้า (no buildup)
- ❌ Choices ที่ไม่มีผล (illusion of choice)
- ❌ Mentor ผูกขาด (เด็กไม่ได้คิดเอง)
- ❌ Negative reward only (มีแต่หักไม่มีให้)
- ❌ Misconception ที่ไม่ได้แก้ใน lesson (ใส่แล้วทิ้ง)

---

## 11. Teacher Cue (ทุกหน้า)

ใส่ `<details class="tc">` ด้านล่างทุกหน้า:
```html
<details class="tc">
  <summary>👩‍🏫 Teacher Cue · <ชื่อกิจกรรม></summary>
  <div class="body">
    <b>เป้าหมาย:</b> ปลด M2 misconception<br>
    <b>เปิดด้วย:</b> "ก่อนเริ่ม · เดาก่อนว่าดวงไหนสว่างจริงสุด"<br>
    <b>ระหว่าง:</b> เดินดูใครเลือก Sirius (M2 ฝังลึก)<br>
    <b>ปิด:</b> สรุป "Deneb สว่างจริงเยอะกว่า · แต่ Sirius ใกล้กว่า"<br>
    <b>เวลา:</b> 5 นาที max
  </div>
</details>
```

ครูเปิดดูระหว่างสอน (ไม่ปริ๊นต์ · ดูบนจอตัวเอง)

---

## 12. วPA (สำหรับครู)

EP3 ทำตัวอย่าง map กับ ตัวชี้วัดวPA:
- ด้าน 1 PLC, ด้าน 2 PA วินิจฉัย, ด้าน 6 Feedback, ด้าน 7 ผลลัพธ์, ด้าน 8 กำกับตนเอง

ใส่ tag `<span class="ped-tag">วPA 6 · Feedback</span>` ที่หน้า reflection
