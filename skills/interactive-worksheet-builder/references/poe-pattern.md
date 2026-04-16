# POE (Predict-Observe-Explain) Mixed Format Pattern

## หลักการออกแบบ

POE แบบผสม (Mixed Format) คือรูปแบบที่ผสมระหว่าง:
- **ตัวเลือก (radio/checkbox)** → ข้อมูลเชิงปริมาณ วิเคราะห์สถิติได้
- **เขียนเปิด (textarea)** → ข้อมูลเชิงคุณภาพ เห็นความคิดลึกซึ้ง

ทั้งสองส่วนทำงานเสริมกัน ไม่ใช่ทดแทนกัน

---

## โครงสร้าง P (Predict)

```html
<div class="section predict" style="border-left:6px solid #1976d2;background:#e3f2fd">
  <h3>🔮 P · Predict (ทำนาย)</h3>
  
  <!-- 1. คำถามหลัก -->
  <div class="question">ฉันคิดว่า [สถานการณ์] จะ:</div>
  
  <!-- 2. ตัวเลือกคำทำนาย (radio) -->
  <div class="prediction-options">
    <label><input type="radio" name="pred" value="optA"> [ตัวเลือก A]</label>
    <label><input type="radio" name="pred" value="optB"> [ตัวเลือก B]</label>
    <label><input type="radio" name="pred" value="optC"> [ตัวเลือก C]</label>
  </div>
  
  <!-- 3. เหตุผล (radio → map กับ misconception) -->
  <div class="reason-options">
    <b>เหตุผลที่คิดเช่นนั้น:</b>
    <label><input type="radio" name="reason" value="R1"> [Misconception A — ดูเหมือนจริงแต่ผิด]</label>
    <label><input type="radio" name="reason" value="R2"> [Misconception B — ความเข้าใจผิดที่พบบ่อย]</label>
    <label><input type="radio" name="reason" value="R3"> [เหตุผลที่ถูกต้อง]</label>
    <label><input type="radio" name="reason" value="R4"> [Misconception C — อีกแบบที่พบ]</label>
    <label><input type="radio" name="reason" value="R0"> อื่นๆ (พิมพ์ด้านล่าง)</label>
  </div>
  
  <!-- 4. Textarea เสริม (สำหรับ R0 หรืออธิบายเพิ่ม) -->
  <textarea id="reason_text" placeholder="ถ้าเลือก 'อื่นๆ' หรือต้องการอธิบายเพิ่มเติม..."></textarea>
  
  <!-- 5. ระดับความมั่นใจ -->
  <div class="confidence">
    <b>ความมั่นใจ:</b>
    <label><input type="radio" name="conf" value="high"> มาก</label>
    <label><input type="radio" name="conf" value="mid"> ปานกลาง</label>
    <label><input type="radio" name="conf" value="low"> น้อย</label>
  </div>
</div>
```

### หลักการเขียนตัวเลือกเหตุผล (R1-R4)

1. **ใช้ภาษานักเรียน** — เขียนเหมือนนักเรียนจะพูด ไม่ใช่ภาษาวิชาการ
2. **1 ข้อถูก** — ต้องมีเหตุผลที่ถูกต้องตามหลักวิทยาศาสตร์อยู่ 1 ข้อ
3. **2-3 ข้อ misconception** — จาก misconception ที่พบบ่อยในงานวิจัย
4. **R0 อื่นๆ** — เสมอ เพื่อเปิดโอกาสให้นักเรียนที่คิดต่าง
5. **ไม่เรียงจากง่าย→ยาก** — สลับตำแหน่งเพื่อไม่ให้เดา

---

## โครงสร้าง O (Observe)

ส่วน O ต้อง **ออกแบบเฉพาะแต่ละกิจกรรม** ไม่มี template ตายตัว

### รูปแบบที่ใช้ได้

**ก. Textarea อิสระ** (เหมาะกับการสังเกตเชิงคุณภาพ)
```html
<textarea placeholder="สิ่งที่สังเกตได้คือ..."></textarea>
```

**ข. ตารางบันทึกผล** (เหมาะกับการวัดเชิงปริมาณ)
```html
<table>
  <tr><th>ครั้งที่</th><th>ระยะทาง (m)</th><th>เวลา (s)</th><th>ความเร็ว (m/s)</th></tr>
  <tr><td>1</td><td><input></td><td><input></td><td><input></td></tr>
  ...
</table>
```

**ค. 2-column layout** (เหมาะกับสังเกต 2 รอบ)
```html
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
  <div class="card">รอบ 1: [กิจกรรม A]</div>
  <div class="card">รอบ 2: [กิจกรรม B]</div>
</div>
```

**ง. Radio/Input สรุป** (เหมาะกับสรุปผลสังเกต)
```html
<div>ผลที่สังเกตได้:
  <label><input type="radio" name="result" value="yes"> ใช่</label>
  <label><input type="radio" name="result" value="no"> ไม่ใช่</label>
</div>
```

### ตาราง measurement helper

```javascript
function tbl(id, heads, rows) {
  let h = '<table class="matrix"><tr>';
  heads.forEach(c => h += `<th>${c}</th>`);
  h += '</tr>';
  for (let r = 1; r <= rows; r++) {
    h += '<tr>';
    heads.forEach((c, ci) => {
      if (ci === 0) h += `<td>${r}</td>`;
      else h += `<td><input type="text" id="${id}_r${r}c${ci}" placeholder="—"></td>`;
    });
    h += '</tr>';
  }
  h += '</table>';
  return h;
}
```

---

## โครงสร้าง E (Explain)

```html
<div class="section explain" style="border-left:6px solid #2e7d32;background:#e8f5e9">
  <h3>✍️ E · Explain (อธิบาย)</h3>
  
  <!-- 1. เปรียบเทียบ P↔O -->
  <b>1) เปรียบเทียบ P กับ O:</b>
  <label><input type="radio" name="po_compare" value="match"> ตรงกัน</label>
  <label><input type="radio" name="po_compare" value="partial"> ตรงบางส่วน</label>
  <label><input type="radio" name="po_compare" value="diff"> ไม่ตรง</label>
  <textarea placeholder="อธิบายว่าตรง/ต่างอย่างไร..."></textarea>
  
  <!-- 2. Checkbox หลักการ (map กับ R1-R4 ใน P) -->
  <b>2) จากผลการสังเกต ข้อใดถูกต้อง?</b>
  <label><input type="checkbox" id="c1"> [หลักการที่แก้ Misconception A → map กับ R1]</label>
  <label><input type="checkbox" id="c2"> [หลักการที่แก้ Misconception B → map กับ R2]</label>
  <label><input type="checkbox" id="c3"> [หลักการถูกต้อง → map กับ R3]</label>
  <label><input type="checkbox" id="c4"> [หลักการที่แก้ Misconception C → map กับ R4]</label>
  
  <!-- 3. สรุปด้วยภาษาตัวเอง -->
  <b>3) สรุปหลักการด้วยภาษาของนักเรียนเอง:</b>
  <textarea placeholder="จากการทดลอง ฉันสรุปได้ว่า..."></textarea>
  
  <!-- 4. ความมั่นใจ -->
  <b>ความมั่นใจในคำอธิบาย:</b>
  <label><input type="radio" name="e_conf" value="high"> มาก</label>
  <label><input type="radio" name="e_conf" value="mid"> ปานกลาง</label>
  <label><input type="radio" name="e_conf" value="low"> น้อย</label>
</div>
```

### หลักการเขียน Checkbox (c1-c5)

1. **เขียนเป็นข้อความที่ถูกต้อง** — ไม่ใช่คำถาม
2. **ตรงข้ามกับ misconception ใน P** — ถ้า R1 คือ "คลื่นพาอนุภาคไป" → c1 คือ "อนุภาคสั่นอยู่กับที่ ไม่ถูกพาไป"
3. **มีข้อที่ตรงกับเหตุผลถูกต้อง** — เหมือนยืนยัน R3
4. **จำนวน 4-5 ข้อ** — ไม่มากจนเวียนหัว ไม่น้อยจนไม่ครอบคลุม

---

## Misconception Alert Box

ท้ายสุดของทุก POE ใส่กล่องแจ้ง Misconception:

```html
<div style="background:#fff5f5;border:1.5px solid #fc8181;border-radius:10px;padding:10px 14px;font-size:14px">
  <b style="color:#c53030">⚠️ Misconception ที่ตรวจสอบ:</b>
  M_xx ([ชื่อ misconception]) · M_yy ([ชื่อ misconception])
</div>
```

---

## Data Collection Summary

เมื่อสร้าง POE เสร็จ ให้สร้างตาราง field mapping:

| Field | Type | ค่าที่เป็นไปได้ | วิเคราะห์อะไร |
|-------|------|-----------------|--------------|
| p_prediction | radio | optA, optB, optC | ทิศทางความเข้าใจเบื้องต้น |
| p_reason_opt | radio | R1, R2, R3, R4, R0 | Misconception ที่มี |
| p_reason | text | อิสระ | เหตุผลเพิ่มเติม |
| p_confidence | radio | high, mid, low | ระดับความมั่นใจก่อนเรียน |
| o_* | mixed | ตามกิจกรรม | ข้อมูลสังเกต |
| e_po_compare | radio | match, partial, diff | การเชื่อมโยง P↔O |
| e_checks | checkbox | c1,c2,c3,c4 | หลักการที่เข้าใจ |
| e_principle | text | อิสระ | สรุปด้วยตัวเอง |
| e_confidence | radio | high, mid, low | ระดับความมั่นใจหลังเรียน |
