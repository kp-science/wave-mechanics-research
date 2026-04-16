# Four-tier Diagnostic Test Pattern

## โครงสร้าง Four-tier

แบบทดสอบวินิจฉัย 4 ชั้น (Four-tier Diagnostic Test) ใช้ตรวจสอบ misconception:

```
Tier 1: คำถาม → ตัวเลือก 4 ข้อ (เลือก 1)
Tier 2: ความมั่นใจ → มั่นใจ / ไม่มั่นใจ
Tier 3: เหตุผล → ตัวเลือก 4 ข้อ (ถูก 1 + ลวง 3)
Tier 4: ความมั่นใจ → มั่นใจ / ไม่มั่นใจ
```

## เกณฑ์จำแนก

| ประเภท | T1 | T2 | T3 | T4 |
|--------|----|----|----|----|
| Sound Understanding | ✅ ถูก | มั่นใจ | ✅ ถูก | มั่นใจ |
| Partial Understanding | ✅ ถูก | มั่นใจ | ❌ ผิด | มั่นใจ |
| Misconception | ✅ ถูก | - | ❌ ผิด | - |
| Guessing | ✅ ถูก | ไม่มั่นใจ | - | - |
| No Knowledge | ❌ ผิด | - | - | - |

## HTML Template

```html
<div class="ft-item">
  <!-- Tier 1: คำถาม -->
  <div class="tier" style="border-left:4px solid #1976d2">
    <h4>ข้อ 1 — Tier 1</h4>
    <div class="question-text">[คำถาม]</div>
    <div class="options">
      <label><input type="radio" name="q1t1" value="a"> ก. [ตัวเลือก a]</label>
      <label><input type="radio" name="q1t1" value="b"> ข. [ตัวเลือก b]</label>
      <label><input type="radio" name="q1t1" value="c"> ค. [ตัวเลือก c]</label>
      <label><input type="radio" name="q1t1" value="d"> ง. [ตัวเลือก d]</label>
    </div>
  </div>
  
  <!-- Tier 2: ความมั่นใจ -->
  <div class="tier tier-conf">
    <label><input type="radio" name="q1t2" value="conf"> มั่นใจ</label>
    <label><input type="radio" name="q1t2" value="not"> ไม่มั่นใจ</label>
  </div>
  
  <!-- Tier 3: เหตุผล -->
  <div class="tier" style="border-left:4px solid #2e7d32">
    <h4>ข้อ 1 — Tier 3 (เหตุผล)</h4>
    <div class="options">
      <label><input type="radio" name="q1t3" value="a"> ก. [เหตุผล — อาจเป็น misconception]</label>
      <label><input type="radio" name="q1t3" value="b"> ข. [เหตุผล — ถูกต้อง]</label>
      <label><input type="radio" name="q1t3" value="c"> ค. [เหตุผล — misconception ที่พบบ่อย]</label>
      <label><input type="radio" name="q1t3" value="d"> ง. [เหตุผล — ตัวลวง]</label>
    </div>
  </div>
  
  <!-- Tier 4: ความมั่นใจ -->
  <div class="tier tier-conf">
    <label><input type="radio" name="q1t4" value="conf"> มั่นใจ</label>
    <label><input type="radio" name="q1t4" value="not"> ไม่มั่นใจ</label>
  </div>
</div>
```

## หลักการเขียน Tier 3

1. **1 ข้อถูกจริง** — เหตุผลที่ถูกต้องตามหลักวิทยาศาสตร์
2. **1-3 ข้อ misconception** — จากงานวิจัยหรือประสบการณ์สอน
3. **ตัวลวง** — ดูเหมือนเหตุผลของคำตอบถูก แต่ไม่ใช่เหตุผลที่ถูกจริง
4. **เรียงสลับ** — ไม่ให้ข้อถูกอยู่ตำแหน่งเดิมทุกข้อ

## Auto-scoring JavaScript

```javascript
function scoreFourTier(answers, answerKey) {
  // answers = { q1t1: 'b', q1t2: 'conf', q1t3: 'c', q1t4: 'conf' }
  // answerKey = { q1: { t1: 'b', t3: 'c' } }
  
  const results = {};
  for (const [qId, key] of Object.entries(answerKey)) {
    const t1 = answers[qId + 't1'] === key.t1;
    const t2 = answers[qId + 't2'] === 'conf';
    const t3 = answers[qId + 't3'] === key.t3;
    const t4 = answers[qId + 't4'] === 'conf';
    
    let category;
    if (t1 && t2 && t3 && t4) category = 'Sound Understanding';
    else if (t1 && t3) category = 'Partial Understanding';
    else if (t1 && !t3) category = 'Misconception';
    else if (t1 && !t2) category = 'Guessing';
    else category = 'No Knowledge';
    
    results[qId] = { t1, t2, t3, t4, category };
  }
  return results;
}
```

## เฉลย + Misconception Mapping

ทุกชุด Four-tier ต้องมี:

```javascript
const ANSWER_KEY = {
  q1: { t1: 'b', t3: 'c', misconceptions: { a: 'M1.1', d: 'M1.2' } },
  q2: { t1: 'a', t3: 'b', misconceptions: { c: 'M2.1', d: 'M2.3' } },
  // ...
};
```
