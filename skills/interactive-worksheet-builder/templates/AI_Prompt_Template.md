# AI Prompt Template สำหรับอ่านใบงานที่เขียนมือ

## วิธีใช้

1. Copy prompt ด้านล่าง
2. แก้ไขส่วนที่อยู่ใน `[PLACEHOLDER]`
3. แนบรูปถ่าย/scan ของใบงาน
4. ส่งให้ AI (Claude, GPT, Gemini ฯลฯ)
5. นำ JSON ที่ได้ไป paste ใน Google Sheets

---

## Prompt Template: POE

```
บทบาท: คุณคือระบบ OCR + วิเคราะห์ใบงาน POE วิชา [วิชา] เรื่อง [หัวข้อ]
Input: ภาพถ่าย/scan ของใบบันทึก POE

สิ่งที่ต้องอ่านและจำแนก:

=== P (Predict) ===
1. p_prediction: ตัวเลือกที่ทำเครื่องหมาย (optA / optB / optC)
2. p_reason_opt: เหตุผลที่เลือก (R1 / R2 / R3 / R4 / R0)
3. p_reason_text: ข้อความเพิ่มเติม (ถ้ามี)
4. p_confidence: ระดับความมั่นใจ (high / mid / low)

=== O (Observe) ===
5. o_observe1: สิ่งที่สังเกตได้ (อ่านข้อความที่เขียน)
6. o_summary: สรุปการสังเกต
[เพิ่ม field อื่นๆ ตามใบงาน เช่น ข้อมูลตาราง]

=== E (Explain) ===
7. e_po_compare: เปรียบเทียบ P↔O (match / partial / diff)
8. e_match: คำอธิบาย P↔O
9. e_checks: checkbox ที่ติ๊ก (c1,c2,c3,c4 คั่นด้วย comma)
10. e_principle: สรุปหลักการ
11. e_confidence: ความมั่นใจ (high / mid / low)

=== Misconception ที่ตรวจสอบ ===
- [M_xx]: [ชื่อ misconception] → ตรวจจาก p_reason_opt และ e_checks
- [M_yy]: [ชื่อ misconception]

=== เกณฑ์ POE Rubric (0-3) ===
3 = ทำนายถูก + อธิบาย P↔O สมบูรณ์ ≥ 3 ประโยค
2 = ทำนายผิด แต่ Explain ถูกต้องตามหลักการ
1 = อธิบายได้บางส่วน ขาดการเชื่อมกับหลักการ
0 = ไม่ตอบหรือไม่เกี่ยวข้อง

Output format (JSON):
{
  "student_name": "...",
  "student_no": "...",
  "student_class": "...",
  "p_prediction": "...",
  "p_reason_opt": "...",
  "p_reason_text": "...",
  "p_confidence": "...",
  "o_observe1": "...",
  "o_summary": "...",
  "e_po_compare": "...",
  "e_match": "...",
  "e_checks": "...",
  "e_principle": "...",
  "e_confidence": "...",
  "poe_score": 0,
  "misconceptions_detected": [],
  "notes": "...",
  "source": "scan"
}
```

---

## Prompt Template: โจทย์คำนวณ

```
บทบาท: คุณคือระบบ OCR + ตรวจข้อสอบ วิชา [วิชา] เรื่อง [หัวข้อ]
Input: ภาพถ่าย/scan ของใบงานโจทย์คำนวณ

สิ่งที่ต้องอ่าน:
แต่ละข้อ (q1, q2, q3, ...):
- formula: สูตรที่เขียน
- work: วิธีทำ (ถอดเป็นข้อความ)
- answer: คำตอบสุดท้าย + หน่วย

เฉลย:
- q1: สูตร [สูตร], คำตอบ [คำตอบ + หน่วย]
- q2: สูตร [สูตร], คำตอบ [คำตอบ + หน่วย]
[... เพิ่มตามจำนวนข้อ ...]

เกณฑ์ให้คะแนน (0-3 ต่อข้อ):
3 = สูตรถูก + แทนค่าถูก + คำตอบถูก + หน่วยถูก
2 = สูตรถูก + วิธีถูก แต่คำนวณผิดเล็กน้อย
1 = สูตรถูก แต่แทนค่าผิดหรือทำไม่เสร็จ
0 = ไม่ตอบหรือสูตรผิด

Output format (JSON):
{
  "student_name": "...",
  "student_no": "...",
  "questions": [
    { "id": "q1", "formula": "...", "work": "...", "answer": "...", "score": 0, "feedback": "..." },
    { "id": "q2", "formula": "...", "work": "...", "answer": "...", "score": 0, "feedback": "..." }
  ],
  "total_score": 0,
  "max_score": 0,
  "misconceptions_detected": [],
  "notes": "...",
  "source": "scan"
}
```

---

## Prompt Template: Spot the Error

```
บทบาท: คุณคือระบบ OCR + วิเคราะห์ใบงาน Spot the Error วิชา [วิชา]
Input: ภาพถ่าย/scan ของใบงาน Spot the Error

สิ่งที่ต้องอ่าน:
แต่ละข้อความ (s1, s2, s3, ...):
- verdict: ถูก(correct) หรือ ผิด(wrong)
- fix: แก้ไขอย่างไร (ถ้าตอบว่าผิด)
- reason: เหตุผลประกอบ

เฉลย:
- s1: [ถูก/ผิด] — [คำอธิบาย] — Misconception: [M_xx]
- s2: [ถูก/ผิด] — [คำอธิบาย] — Misconception: [M_xx]
[... เพิ่มตามจำนวนข้อ ...]

เกณฑ์ให้คะแนน (0-3 ต่อข้อ):
3 = ระบุถูก/ผิดถูกต้อง + ชี้จุดผิดได้ + อธิบายหลักการ
2 = ระบุถูก/ผิดถูก + ชี้จุดผิดได้ แต่อธิบายไม่สมบูรณ์
1 = ระบุถูก/ผิดถูก แต่ไม่สามารถชี้จุดผิดหรืออธิบาย
0 = ระบุถูก/ผิดผิดพลาด หรือไม่ตอบ

Output format (JSON):
{
  "student_name": "...",
  "student_no": "...",
  "statements": [
    { "id": "s1", "verdict": "...", "fix": "...", "reason": "...", "score": 0, "misconception_found": "" },
    { "id": "s2", "verdict": "...", "fix": "...", "reason": "...", "score": 0, "misconception_found": "" }
  ],
  "total_score": 0,
  "max_score": 0,
  "notes": "...",
  "source": "scan"
}
```

---

## Prompt: Batch Processing (หลายใบงานพร้อมกัน)

```
ฉันจะส่งภาพใบงานหลายใบ ให้อ่านทีละภาพแล้ว return เป็น JSON array:

[
  { /* ใบงานที่ 1 */ },
  { /* ใบงานที่ 2 */ },
  ...
]

ใช้ format เดียวกับ prompt ด้านบน แต่รวมเป็น array
ถ้าอ่านไม่ออก ให้ใส่ "UNREADABLE" ใน field นั้น
```

---

## Tips สำหรับครู

1. **ถ่ายรูปให้ชัด** — ตั้งกล้องตรง ไม่เอียง แสงเพียงพอ
2. **ทำทีละ 5-10 ใบ** — ส่ง batch ไม่เกิน 10 ภาพต่อครั้ง
3. **JSON → Sheets** — Copy JSON ไปวางใน Google Sheets ด้วย Apps Script:
   ```javascript
   function importJSON() {
     const json = /* paste JSON here */;
     const sheet = SpreadsheetApp.getActiveSheet();
     const headers = Object.keys(json[0]);
     sheet.appendRow(headers);
     json.forEach(obj => sheet.appendRow(headers.map(h => obj[h] || '')));
   }
   ```
4. **ตรวจซ้ำ** — AI อาจอ่านผิด 5-10% ของใบงาน ควรสุ่มตรวจ
