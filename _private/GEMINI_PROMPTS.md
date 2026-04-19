# 🤖 Gemini Auto-Scoring · POE-E + Spot-Justify

คู่มือใช้ **Gemini ใน Google Sheet** ให้คะแนน free-text ของ POE (explain) และ Spot the Error (justify) ที่ครูต้องตรวจด้วยมือ

> 🎯 **เป้า:** 35 คน × 9 แผน × ~6 free-text cells = **~1,900 cells** → ตรวจมือ ~10 ชม. · AI < 2 นาที
>
> 📊 **Validity:** ไม่ใช้คะแนน AI แทนครูตรง ๆ — ใช้เป็น **first pass** แล้วครูสุ่มสอบกลับ (κ ≥ 0.75)

---

## 📋 ภาพรวม 3 ขั้น

| ขั้น | งาน | เวลา |
|---|---|---|
| 1 | Enable Gemini ใน Workspace (ครั้งเดียว) | 5 นาที |
| 2 | วาง prompt template + formula ใน sheet | 10 นาที |
| 3 | Reliability check (สุ่ม 30 คน) | 1 ชม. |

---

## 🚀 ขั้นที่ 1 · Enable Gemini ใน Sheet

### Path A · Workspace account (แนะนำถ้ามี)

1. เปิด Spreadsheet → **Extensions → Gemini**
2. ถ้าไม่มีเมนู → Admin console → Apps → Gemini → **Turn on for user**
3. Enable แล้ว → ใน cell ใช้ `=GEMINI("prompt…")` ได้ทันที

### Path B · Apps Script + API (ถ้า account ไม่รองรับ)

1. ไป [aistudio.google.com/apikey](https://aistudio.google.com/apikey) → สร้าง API key (free tier)
2. เปิด **Extensions → Apps Script** → เพิ่ม `GeminiAPI.gs` (โค้ดอยู่ท้ายไฟล์นี้)
3. เมนู **Project Settings → Script properties** → เพิ่ม `GEMINI_API_KEY = <key>`
4. Save → กลับ Sheet → `=GEMINI_SCORE(...)` พร้อมใช้

> ⚠️ Free tier: 15 req/min · 1,500 req/day · enough for 35 คน × ~60 texts = 2,100 → batch 2 วัน

---

## 🧠 ขั้นที่ 2 · Prompt Templates

หลักการสำคัญ:
- **ภาษาไทยล้วน** · AI ตอบดีสุดเมื่อ context ภาษาเดียวกับคำตอบ
- **Score only** · ให้ AI คืนเลขตัวเดียว — ห้าม prose (กันการแปรผล)
- **Rubric ชัด** · ระบุตัวอย่างคะแนนแต่ละระดับ (few-shot)
- **Misconception awareness** · ส่ง "หลักการที่ถูก" + "misconception ที่พบบ่อย" เข้าไปด้วย

---

### 🟦 2A · POE-E Rubric (0–3) · `PROMPT_POE_E`

```text
คุณเป็นครูฟิสิกส์ระดับ ม.5 กำลังตรวจคำอธิบาย (Explain) ในใบบันทึก POE ของนักเรียน

หลักการที่ถูกต้องของข้อนี้:
{EXPECTED_CONCEPT}

มโนทัศน์ที่คลาดเคลื่อนที่พบบ่อย (ห้ามให้คะแนนถ้านักเรียนใช้):
{MISCONCEPTION_LIST}

เกณฑ์การให้คะแนน (0-3):
- 0 = ไม่ตอบ / ตอบมั่ว / ไม่เกี่ยวข้อง / ลอกคำถาม
- 1 = พยายามอธิบาย แต่ใช้มโนทัศน์ผิด (ตรงกับรายการ misconception ด้านบน)
- 2 = ถูกบางส่วน · มีคำสำคัญถูก แต่ยังไม่เชื่อมโยงหลักการครบ / ขาดสาเหตุ-ผล
- 3 = ถูกต้องและเชื่อมโยงหลักการ · ใช้คำศัพท์วิทยาศาสตร์เหมาะสม · มีเหตุผลสนับสนุน

ตัวอย่าง (สำหรับหลักการ "คลื่นถ่ายโอนพลังงาน ไม่ใช่สสาร"):
- "ไม่รู้ครับ" → 0
- "คลื่นพาของไปไกลเพราะคลื่นไหลไปข้างหน้า" → 1 (misconception M1.1)
- "อนุภาคน้ำสั่นขึ้นลง" → 2 (ถูกแต่ไม่เชื่อมพลังงาน)
- "อนุภาคน้ำสั่นขึ้นลงอยู่กับที่ คลื่นถ่ายโอนเฉพาะพลังงาน ไม่ใช่สสาร ลูกมะพร้าวจึงไม่ถูกพาไป" → 3

คำตอบนักเรียน:
"""
{STUDENT_ANSWER}
"""

ตอบเฉพาะตัวเลข 0, 1, 2 หรือ 3 เท่านั้น · ห้ามมีคำอื่น
```

---

### 🟨 2B · POE-E Reason (เหตุผลสั้น) · `PROMPT_POE_E_REASON`

ใช้คู่กับ 2A เพื่อให้ครูตรวจสอบได้ว่าทำไม AI ให้คะแนนนี้

```text
คุณเป็นครูฟิสิกส์ ม.5 ตรวจคำอธิบาย POE

หลักการที่ถูก: {EXPECTED_CONCEPT}
Misconception ที่พบบ่อย: {MISCONCEPTION_LIST}

คำตอบนักเรียน:
"""
{STUDENT_ANSWER}
"""

เขียนเหตุผลสั้น ไม่เกิน 20 คำ · ระบุว่า:
- นักเรียนใช้มโนทัศน์อะไร (ถูก/ผิด/ผสม)
- ถ้ามี misconception ระบุรหัส (เช่น M1.1)

ตัวอย่าง output:
- "M1.1 · คิดว่าคลื่นพาสสาร"
- "ถูกบางส่วน · พูดถึงการสั่น แต่ไม่เชื่อมพลังงาน"
- "ถูกครบ · เชื่อมการสั่น-พลังงาน-ไม่พาสสาร"

ตอบเฉพาะข้อความสั้น · ห้ามขึ้นบรรทัดใหม่
```

---

### 🟩 2C · Spot-Justify Rubric (0–1) · `PROMPT_SPOT_JUSTIFY`

```text
คุณเป็นครูฟิสิกส์ ม.5 ตรวจ "เหตุผล" ที่นักเรียนเขียนอธิบายว่าทำไมข้อความต้นฉบับถึงผิด

ข้อความผิดที่นักเรียนต้องแก้:
{ORIGINAL_WRONG_STATEMENT}

ข้อความที่ถูกต้อง (เฉลย):
{CORRECT_STATEMENT}

หลักการที่ต้องใช้อธิบาย:
{EXPECTED_CONCEPT}

เกณฑ์การให้คะแนน (0 หรือ 1):
- 0 = ไม่อธิบาย · คัดลอกข้อความที่ถูกมาใส่โดยไม่อธิบาย · ใช้หลักการผิด · บอกแค่ว่า "ผิด" ไม่บอกสาเหตุ
- 1 = อธิบายด้วยหลักการที่ถูกต้อง · เห็นการเชื่อมโยง "เพราะ...จึง..." ที่สมเหตุผล

ตัวอย่าง (สำหรับ "ความถี่เปลี่ยนเมื่อคลื่นเข้าตัวกลางใหม่"):
- "ผิด" → 0
- "ความถี่ไม่เปลี่ยน" → 0 (คัดลอกเฉลยไม่มีเหตุผล)
- "ความถี่ไม่เปลี่ยนเพราะถูกกำหนดโดยแหล่งกำเนิด ตัวกลางใหม่เปลี่ยนแค่ v และ λ" → 1

คำตอบนักเรียน:
"""
{STUDENT_ANSWER}
"""

ตอบเฉพาะ 0 หรือ 1 เท่านั้น
```

---

## 📊 ขั้นที่ 3 · Formula สำเร็จรูป

### 3A · Sheet Layout (แนะนำ)

สร้าง sheet **`Rubric_POE`** เก็บ context ต่อข้อ:

| plan | question_id | expected_concept | misconception_list |
|---|---|---|---|
| 1 | poe01 | คลื่นถ่ายโอนพลังงาน ไม่ถ่ายโอนสสาร อนุภาคตัวกลางสั่นอยู่กับที่ | M1.1 คลื่นพาสสาร · M1.2 เสียงเป็นคลื่นตามขวาง |
| 2 | poe02 | v = fλ · v ขึ้นกับตัวกลางเท่านั้น · f คงที่จากแหล่งกำเนิด | M2.1 v ขึ้นกับ f · M2.2 แอมพลิจูดเพิ่ม v |
| 3 | poe03 | คลื่นตกกระทบ = คลื่นสะท้อน · μ เท่ากันจึง v เท่ากัน | M3.1 · M3.2 · M3.3 |
| 4 | poe04 | การซ้อนทับ (superposition) · คลื่นผ่านทะลุกันได้ | M4.1 · M4.2 · M4.3 · M4.4 |
| ... | | | |

### 3B · สูตร POE-E (copy วาง)

สมมติ `POE_P1` column `explain_principle` อยู่ column **N** · นักเรียนเริ่ม row 2:

```
// N = คำตอบนักเรียน, ดึง rubric จาก Rubric_POE row ที่ plan=1
=GEMINI(
  SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(Rubric_POE!$C$2,
    "{EXPECTED_CONCEPT}", VLOOKUP(1, Rubric_POE!$A:$C, 3, FALSE)),
    "{MISCONCEPTION_LIST}", VLOOKUP(1, Rubric_POE!$A:$D, 4, FALSE)),
    "{STUDENT_ANSWER}", N2)
)
```

แบบสั้น (prompt template inline):

```
=GEMINI("ให้คะแนน 0-3 ตาม rubric: 0=ไม่ตอบ 1=มโนทัศน์ผิด 2=ถูกบางส่วน 3=ถูกเชื่อมโยง · หลักการ: " & $C$2 & " · Misconception: " & $D$2 & " · คำตอบ: " & N2 & " · ตอบเฉพาะตัวเลข")
```

### 3C · สูตร Spot-Justify

```
=GEMINI("ให้คะแนน 0-1 · 0=ไม่อธิบาย/คัดลอก/ผิด, 1=อธิบายด้วยหลักการถูก · ข้อความผิด: " & B2 & " · เฉลย: " & C2 & " · หลักการ: " & D2 & " · คำตอบนักเรียน: " & Q2 & " · ตอบเฉพาะ 0 หรือ 1")
```

### 3D · คอลัมน์ที่ควรมีใน `POE_P{n}_Scored`

| col | content | source |
|---|---|---|
| A-E | timestamp, s_name, s_num, s_room, s_grp | copy |
| F | `predict_score` (0/1 match เฉลย) | `=IF(predict_col=key,1,0)` |
| G | `explain_score_ai` (0-3) | `=GEMINI(...)` ←ใช้ prompt 2A |
| H | `explain_reason_ai` (text) | `=GEMINI(...)` ←ใช้ prompt 2B |
| I | `explain_score_teacher` (0-3 · manual) | ครูเปิดสุ่ม 30 คนมาใส่ |
| J | `agreement` | `=IF(I="","",IF(G=I,1,0))` |

> 💡 **Tip:** แยก AI column กับ Teacher column ให้ชัด — ตอนทำ κ ต้องมี 2 rater

---

## ⚙️ Apps Script · `GeminiAPI.gs` (ถ้าไม่มี Workspace)

```javascript
/**
 * GEMINI_SCORE(prompt) — เรียก Gemini API ตรง ๆ
 * ต้องตั้ง Script Property: GEMINI_API_KEY
 */
function GEMINI_SCORE(prompt) {
  if (!prompt) return '';
  const key = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (!key) throw new Error('กรุณาตั้ง GEMINI_API_KEY ใน Script Properties');

  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + key;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0, maxOutputTokens: 20 }
  };

  try {
    const resp = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });
    const data = JSON.parse(resp.getContentText());
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return text.trim();
  } catch (e) {
    return 'ERR: ' + e.message;
  }
}

/**
 * Batch — ตรวจทั้ง column ทีเดียว · หลีกเลี่ยง quota error จาก GEMINI_SCORE ต่อ cell
 */
function batchScorePOE_E(planNum) {
  const ss = SpreadsheetApp.getActive();
  const src = ss.getSheetByName('POE_P' + planNum);
  if (!src) return;
  const rubric = ss.getSheetByName('Rubric_POE');
  const rubricRow = rubric.getRange('A:D').getValues().find(r => r[0] == planNum);
  if (!rubricRow) { SpreadsheetApp.getUi().alert('ไม่พบ rubric สำหรับแผน ' + planNum); return; }
  const [, , concept, mcList] = rubricRow;

  // หา column 'explain_principle' (คำตอบหลัก POE-E)
  const headers = src.getRange(1, 1, 1, src.getLastColumn()).getValues()[0];
  const col = headers.indexOf('explain_principle') + 1;
  if (!col) { SpreadsheetApp.getUi().alert('ไม่พบ column explain_principle'); return; }

  const lastRow = src.getLastRow();
  const answers = src.getRange(2, col, lastRow - 1, 1).getValues();

  const out = ss.getSheetByName('POE_P' + planNum + '_Scored')
          || ss.insertSheet('POE_P' + planNum + '_Scored');
  out.clear();
  out.appendRow(['row', 'answer', 'ai_score', 'ai_reason']);

  answers.forEach((r, i) => {
    const ans = r[0];
    if (!ans) { out.appendRow([i + 2, '', '', '']); return; }
    const score = GEMINI_SCORE(buildPOEPrompt(concept, mcList, ans, 'score'));
    const reason = GEMINI_SCORE(buildPOEPrompt(concept, mcList, ans, 'reason'));
    out.appendRow([i + 2, ans, score, reason]);
    Utilities.sleep(4500); // free tier 15 req/min → 4s ต่อ call × 2 = 8s/row
  });

  SpreadsheetApp.getUi().alert('เสร็จ · ' + answers.length + ' rows');
}

function buildPOEPrompt(concept, mcList, ans, mode) {
  if (mode === 'score') {
    return `ให้คะแนน 0-3 · 0=ไม่ตอบ/มั่ว · 1=มโนทัศน์ผิด · 2=ถูกบางส่วน · 3=ถูกเชื่อมโยงหลักการ
หลักการที่ถูก: ${concept}
Misconception: ${mcList}
คำตอบ: "${ans}"
ตอบเฉพาะตัวเลข 0, 1, 2 หรือ 3`;
  }
  return `เหตุผลสั้นไม่เกิน 20 คำ · ระบุว่าใช้มโนทัศน์อะไร (ถูก/ผิด) · ถ้ามี misconception ระบุรหัส
หลักการ: ${concept} · Misconception: ${mcList}
คำตอบ: "${ans}"
ตอบข้อความสั้น ไม่ขึ้นบรรทัดใหม่`;
}
```

เพิ่มเมนู (ต่อท้าย `onOpen()` ใน `ScoringScript.gs`):

```javascript
menu.addSeparator()
    .addItem('🤖 Gemini · Score POE-E แผน 1', 'batchPOE1')
    .addItem('🤖 Gemini · Score POE-E แผน 2', 'batchPOE2');
// ...
function batchPOE1() { batchScorePOE_E(1); }
function batchPOE2() { batchScorePOE_E(2); }
```

---

## 🔬 Reliability Check Plan (Cohen's κ)

**เป้า:** พิสูจน์ว่า AI score ไว้ใจได้ก่อนใช้จริง · κ ≥ 0.75 = acceptable for research

### ขั้นตอน

1. **Sample:** สุ่ม 30 นักเรียน จาก POE-E แผน 1 (รวม ~30 × 3 explain items = 90 data points)
2. **Double-grade:**
   - ครูอ่านแล้วให้คะแนน 0-3 ใส่ column `explain_score_teacher`
   - AI score อยู่ใน `explain_score_ai` แล้ว
   - **อย่าให้ครูเห็นคะแนน AI ขณะให้คะแนน** (bias)
3. **Compute κ:** ใช้ sheet `Reliability`:

```
              AI=0  AI=1  AI=2  AI=3
Teacher=0      a     b     c     d
Teacher=1      e     f     g     h
Teacher=2      i     j     k     l
Teacher=3      m     n     o     p
```

### สูตร κ ใน Sheet

ใส่ใน `Reliability` sheet · ใช้ weighted κ (quadratic · เหมาะกับ ordinal 0-3):

```
=LET(
  ai, FILTER(POE_P1_Scored!G:G, POE_P1_Scored!I:I<>""),
  tc, FILTER(POE_P1_Scored!I:I, POE_P1_Scored!I:I<>""),
  po, SUMPRODUCT(--(ai=tc))/COUNTA(ai),
  pe, SUMPRODUCT(COUNTIF(ai,{0;1;2;3}) * COUNTIF(tc,{0;1;2;3}))/COUNTA(ai)^2,
  (po - pe) / (1 - pe)
)
```

หรือใช้ Apps Script (แม่นยำกว่า · คืน κ + weighted κ พร้อมกัน):

```javascript
function computeKappa(sheetName, aiCol, teacherCol) {
  const sh = SpreadsheetApp.getActive().getSheetByName(sheetName);
  const data = sh.getDataRange().getValues().slice(1);
  const pairs = data.filter(r => r[teacherCol - 1] !== '' && r[aiCol - 1] !== '')
                    .map(r => [Number(r[aiCol - 1]), Number(r[teacherCol - 1])]);
  const n = pairs.length;
  if (!n) return 'no data';

  const categories = [0, 1, 2, 3];
  const k = categories.length;
  const agree = pairs.filter(([a, t]) => a === t).length;
  const po = agree / n;

  const aiCount = categories.map(c => pairs.filter(p => p[0] === c).length);
  const tcCount = categories.map(c => pairs.filter(p => p[1] === c).length);
  const pe = categories.reduce((s, _, i) => s + (aiCount[i] * tcCount[i]) / (n * n), 0);

  const kappa = (po - pe) / (1 - pe);

  // Weighted kappa (quadratic)
  let wo = 0, we = 0;
  for (let i = 0; i < k; i++) {
    for (let j = 0; j < k; j++) {
      const w = 1 - ((i - j) ** 2) / ((k - 1) ** 2);
      const oij = pairs.filter(([a, t]) => a === i && t === j).length / n;
      const eij = (aiCount[i] * tcCount[j]) / (n * n);
      wo += w * oij;
      we += w * eij;
    }
  }
  const wKappa = (wo - we) / (1 - we);

  return `n=${n} · κ=${kappa.toFixed(3)} · weighted κ=${wKappa.toFixed(3)} · agreement=${(po*100).toFixed(1)}%`;
}
```

### เกณฑ์ตีความ (Landis & Koch 1977)

| κ | ความสอดคล้อง | ทำอะไรต่อ |
|---|---|---|
| < 0.40 | Poor | ปรับ prompt · เพิ่มตัวอย่าง few-shot |
| 0.40–0.60 | Moderate | ตรวจ disagree cases · อาจเพิ่ม expected_concept ให้ชัด |
| 0.60–0.75 | Substantial | ใช้ AI เป็น first pass · ครูตรวจซ้ำเฉพาะ AI=1,2 (ขอบเขต) |
| **≥ 0.75** | **Almost perfect · acceptable for research** | ใช้ AI ได้เลย · ครูสุ่ม 10% เพื่อ QC |

### ถ้า κ ต่ำ · Tuning playbook

1. **Prompt มี misconception list ครบไหม** — ดู `worksheets.js` field `misconception` ต่อ POE
2. **Few-shot examples** — เพิ่มตัวอย่างคำตอบจริงของนักเรียน (ไม่ใช่ตัวอย่างสมมติ)
3. **Temperature = 0** — กำหนดใน `generationConfig` (ดู `GeminiAPI.gs`)
4. **Model** — Gemini 2.0 Flash เร็ว/ถูก · ถ้าไม่แม่นพอใช้ 2.5 Pro (ช้ากว่า 3x)
5. **Chain of thought** — ถ้าคะแนนไม่เสถียร ให้ AI เขียนเหตุผลก่อน แล้วสรุปคะแนน (แยก 2 call)

---

## 🛡 Research Ethics & Reporting

- ใน thesis ระบุ: "AI (Gemini 2.0 Flash) ถูกใช้เป็น first-pass scorer · inter-rater reliability ระหว่าง AI กับครูผู้เชี่ยวชาญคำนวณด้วย Cohen's weighted κ จาก sample 30 นักเรียน (90 data points) · κ = .xx (p < .001)"
- คะแนนสุดท้ายที่ใช้วิเคราะห์ **ต้องเป็นคะแนนครู** สำหรับ cells ที่ AI กับครูไม่ตรงกันใน sample reliability · ส่วน cells อื่นใช้ AI ได้
- บันทึก AI version + date + prompt hash ใน methodology (เผื่อ reproduce)

---

## 🚦 Workflow แนะนำ

```
Week 1 · Pilot 2-3 คน → ตรวจมือทั้งหมด → สร้าง few-shot จากข้อมูลจริง
Week 2 · เก็บข้อมูล 35 คน → AI score อัตโนมัติ → ครูสุ่ม 30 คน double-grade
Week 3 · Compute κ → ถ้าผ่าน 0.75 ใช้ AI ต่อ · ถ้าไม่ผ่าน tune prompt รอบ 2
Week 4 · Final scores → analysis (pre-post, N-gain, MC reduction)
```

---

**ไฟล์ที่ต้องสร้างต่อ:**
- `Rubric_POE` sheet (9 rows · plan 1-9 × expected_concept + misconception_list)
- `GeminiAPI.gs` (ถ้าไม่มี Workspace Gemini)
- `Reliability` sheet + `computeKappa()` function

**Next session:** pilot test กับ 3 คน → สร้าง `Rubric_POE` จาก `worksheets.js`
