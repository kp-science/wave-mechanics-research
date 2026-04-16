---
name: interactive-worksheet-builder
description: |
  ใช้ Skill นี้เมื่อผู้ใช้ต้องการสร้างใบงาน interactive แบบ HTML (.html) ที่นักเรียนกรอกผ่านเว็บ/มือถือ พิมพ์เป็น PDF เขียนมือได้ ส่งข้อมูลไป Google Sheets และ AI อ่านใบงานเขียนมือ
  Trigger: "สร้างใบงาน interactive", "ใบงาน HTML", "POE webapp", "กรอกออนไลน์", "ส่ง Google Sheets", "ใบงานพิมพ์ได้", "แบบฝึกหัดดิจิทัล", "interactive worksheet", "นักเรียนกรอกผ่านเว็บ", "upload ใบงาน", "AI อ่านใบงาน"
  ⚠️ ถ้าผู้ใช้ระบุ "ใบงาน Word", "ใบงาน docx", "ใบกิจกรรมกระดาษ", "แผนการสอน", "วPA"
  → ใช้ thai-physics-lesson-builder แทน (ไม่ใช่ Skill นี้)
  Output: ไฟล์ .html เท่านั้น | ใช้ได้ทุกวิชา ทุกระดับชั้น
---

# Interactive Worksheet Builder

สร้างใบงาน interactive แบบ single-file HTML ที่:
- นักเรียนกรอกผ่านเว็บบราวเซอร์ (มือถือ/คอม)
- พิมพ์เป็น PDF ให้เขียนมือได้ (Print CSS)
- ส่งข้อมูลไป Google Sheets/Drive ผ่าน Apps Script
- AI อ่านใบงานที่เขียนมือแล้วสแกนส่งได้

---

## สถาปัตยกรรมหลัก

### 1. Single-file HTML
ทุกอย่างอยู่ในไฟล์เดียว: HTML + CSS + JavaScript (ไม่ต้องติดตั้งอะไร)

### 2. ส่วนประกอบ 4 ระบบ

| ระบบ | หน้าที่ | เทคโนโลยี |
|------|---------|-----------|
| **Interactive Form** | นักเรียนกรอกข้อมูลผ่านเว็บ | HTML form + JS validation |
| **Print CSS** | พิมพ์เป็นใบงานสวย เขียนมือได้ | @media print |
| **Data Submit** | ส่งข้อมูลไป Google Sheets | fetch → Apps Script |
| **Upload + AI** | อัปโหลด PDF/รูป → AI อ่าน | Base64 → Drive + Prompt Template |

---

## ขั้นตอนการสร้างใบงาน

### ขั้นที่ 1: รวบรวมข้อมูล

เมื่อผู้ใช้ขอสร้างใบงาน ให้ถามข้อมูลต่อไปนี้:

```
□ วิชา / หัวข้อ / ระดับชั้น
□ ประเภทใบงาน (POE / ใบกิจกรรม / Spot the Error / โจทย์คำนวณ / อื่นๆ)
□ จุดประสงค์การเรียนรู้
□ Misconception ที่ต้องการตรวจสอบ (ถ้ามี)
□ กิจกรรม/การทดลองที่นักเรียนทำ (สำหรับ POE)
□ ต้องการส่งข้อมูลไป Google Sheets หรือไม่
□ ต้องการให้พิมพ์เขียนมือได้หรือไม่
```

### ขั้นที่ 2: เลือก Template Pattern

อ่าน reference ที่เหมาะสม:

| ประเภทใบงาน | Reference File |
|-------------|---------------|
| POE (Predict-Observe-Explain) | `references/poe-pattern.md` |
| ใบกิจกรรม / โจทย์คำนวณ | `references/worksheet-pattern.md` |
| Spot the Error | `references/worksheet-pattern.md` |
| แบบทดสอบ Four-tier | `references/four-tier-pattern.md` |
| อื่นๆ (กำหนดเอง) | `references/worksheet-pattern.md` |

### ขั้นที่ 3: สร้าง HTML

ใช้โครงสร้างมาตรฐานต่อไปนี้:

```html
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[ชื่อใบงาน]</title>
  <style>
    /* === Screen CSS === */
    /* ... */

    /* === Print CSS === */
    @media print { /* ... */ }
  </style>
</head>
<body>
  <!-- Student info bar (print-only) -->
  <div class="print-header"> ... </div>

  <!-- Main form content -->
  <div class="worksheet"> ... </div>

  <!-- Submit bar (screen-only) -->
  <div class="submit-bar"> ... </div>

  <script>
    // Submit handler
    // Print handler
    // Validation
  </script>
</body>
</html>
```

### ขั้นที่ 4: เพิ่ม Print CSS

ทุกใบงานต้องมี Print CSS ที่:
- ซ่อนปุ่มส่ง/ปุ่มพิมพ์
- แสดง student info bar (ชื่อ เลขที่ ห้อง)
- textarea → เส้นเขียน (repeating-linear-gradient)
- radio/checkbox ยังแสดง (appearance: auto)
- ตาราง → เส้นขอบชัดเจน
- A4 page setup

### ขั้นที่ 5: เพิ่ม Submit + Upload

ถ้าต้องการส่งข้อมูล:
1. สร้าง submit handler ที่ collect ข้อมูลจาก form → POST ไป Apps Script
2. สร้าง Apps Script endpoint (`doPost`) ที่รับข้อมูลและเขียนลง Google Sheets
3. เพิ่ม Upload zone (drag & drop) สำหรับส่งไฟล์ PDF/รูป

### ขั้นที่ 6: สร้าง AI Prompt Template

ถ้าต้องการให้ AI อ่านใบงานที่เขียนมือ สร้าง prompt template ที่:
- ระบุ field names ตรงกับ form
- มี JSON output format
- มีตัวอย่างคำตอบที่ถูก/ผิด
- ระบุ Misconception ที่ตรวจสอบ

---

## Design Pattern: POE แบบผสม (Mixed Format)

**นี่คือ pattern หลักที่ต้องใช้สำหรับ POE ทุกอัน:**

### P (Predict)
- **Radio** สำหรับคำทำนาย (เลือก 1 จากหลายตัวเลือก)
- **Radio** สำหรับเหตุผล (R1, R2, R3... + R0 อื่นๆ)
  - แต่ละตัวเลือกต้องสอดคล้องกับ Misconception ที่ตรวจสอบ
  - มี 1 ข้อที่เป็นเหตุผลถูกต้อง
  - ที่เหลือเป็น Misconception ที่พบบ่อย
  - R0 = "อื่นๆ" พร้อม textarea เสริม
- **Textarea** เปิดสำหรับเหตุผลเพิ่มเติม (เผื่อเลือก R0)
- **Radio** ระดับความมั่นใจ (มาก/ปานกลาง/น้อย)

### O (Observe)
- ออกแบบเฉพาะแต่ละกิจกรรม (ไม่มี template ตายตัว)
- ใช้: textarea, input text, radio, ตาราง measurement ตามความเหมาะสม
- ถ้ามีหลายรอบสังเกต → แบ่งเป็น card/column

### E (Explain)
- **Radio** เปรียบเทียบ P↔O (ตรงกัน / ตรงบางส่วน / ไม่ตรง)
- **Textarea** อธิบายว่าตรง/ต่างอย่างไร
- **Checkbox** หลักการที่ถูกต้อง (c1, c2, c3...)
  - แต่ละ checkbox ต้อง map กลับไปหา R1, R2 ใน P
  - เมื่อนักเรียนเลือก checkbox จะเห็นว่าเหตุผลข้อไหนถูก/ผิด
- **Textarea** สรุปหลักการด้วยภาษาตัวเอง
- **Radio** ระดับความมั่นใจ

### ความสัมพันธ์ P↔E (สำคัญมาก)

```
P: R1 (misconception A)  ←→  E: c1 (หลักการที่แก้ misconception A)
P: R2 (misconception B)  ←→  E: c2 (หลักการที่แก้ misconception B)
P: R3 (ถูกต้อง)          ←→  E: c3 (หลักการถูกต้อง)
P: R4 (misconception C)  ←→  E: c4 (หลักการที่แก้ misconception C)
```

### Submit handler pattern

```javascript
document.getElementById('submitBtn').onclick = () => {
  // 1. Collect all radio values
  const pred = (document.querySelector('input[name=pred]:checked')||{}).value || '';
  
  // 2. Collect all text values
  const reason = document.getElementById('reason').value.trim();
  
  // 3. Collect all checkbox values
  const checks = ['c1','c2','c3'].filter(x => document.getElementById(x).checked).join(',');
  
  // 4. Build payload
  const payload = { prediction: pred, reason: reason, checks: checks };
  
  // 5. Validate minimum fields
  if (!payload.reason || !payload.checks) {
    showError('กรอกข้อมูลไม่ครบ');
    return;
  }
  
  // 6. Submit to Google Sheets
  submitData('SheetName', payload, statusEl, submitBtn);
};
```

---

## Design Pattern: Print CSS

```css
@media print {
  /* ซ่อน UI elements */
  .submit-bar, .nav, button { display: none !important; }
  
  /* แสดง print-only elements */
  .print-header { display: flex !important; }
  
  /* Textarea → เส้นเขียน */
  textarea {
    border: none !important;
    border-bottom: 1.5px solid #000 !important;
    min-height: 60px !important;
    background: repeating-linear-gradient(
      transparent, transparent 22px, #ccc 22px, #ccc 23px
    ) !important;
    resize: none !important;
  }
  
  /* Radio/Checkbox ยังแสดง */
  input[type=radio], input[type=checkbox] {
    -webkit-appearance: auto !important;
    appearance: auto !important;
    width: 14px; height: 14px;
  }
  
  /* ตาราง */
  table { border-collapse: collapse !important; }
  th, td { border: 1px solid #666 !important; padding: 4px !important; }
  
  /* Page setup */
  @page { size: A4; margin: 1.2cm 1.5cm; }
}
```

---

## Design Pattern: Upload Zone

```javascript
function renderUpload(container) {
  container.innerHTML = `
    <div class="drop-zone" id="dropZone">
      <div>📄</div>
      <div>กดเลือกไฟล์ หรือลากวางที่นี่</div>
      <div>รองรับ: PDF, JPG, PNG · ขนาดไม่เกิน 5 MB</div>
      <input type="file" id="fileInput" accept=".pdf,.jpg,.jpeg,.png"
             style="position:absolute;inset:0;opacity:0;cursor:pointer">
    </div>
    <button id="uploadBtn" disabled>📤 อัปโหลดไฟล์</button>`;

  const fileInput = document.getElementById('fileInput');
  const dropZone = document.getElementById('dropZone');
  let selectedFile = null;

  function handleFile(file) {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('ไฟล์ใหญ่เกิน 5 MB'); return; }
    selectedFile = file;
    document.getElementById('uploadBtn').disabled = false;
  }

  fileInput.onchange = e => handleFile(e.target.files[0]);
  dropZone.ondragover = e => { e.preventDefault(); };
  dropZone.ondrop = e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); };

  document.getElementById('uploadBtn').onclick = async () => {
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(',')[1];
      await fetch(API_URL, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'uploadFile',
          filename: selectedFile.name,
          mimeType: selectedFile.type,
          data: base64
        })
      });
    };
    reader.readAsDataURL(selectedFile);
  };
}
```

---

## Design Pattern: Apps Script Backend

```javascript
// === Google Apps Script (Code.gs) ===

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  
  switch (data.action) {
    case 'submit':    return handleSubmit(data);
    case 'uploadFile': return handleUpload(data);
    default: return response({ status: 'error', message: 'Unknown action' });
  }
}

function handleSubmit(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(data.sheet) || ss.insertSheet(data.sheet);
  const row = [new Date(), data.student_id, data.student_name, /* ...fields... */];
  sheet.appendRow(row);
  return response({ status: 'ok' });
}

function handleUpload(data) {
  const folder = DriveApp.getFolderById('FOLDER_ID')
    .createFolder(data.subfolder || 'uploads');
  const blob = Utilities.newBlob(
    Utilities.base64Decode(data.data),
    data.mimeType,
    data.filename
  );
  const file = folder.createFile(blob);
  return response({ status: 'ok', url: file.getUrl() });
}

function response(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## Design Pattern: AI Prompt Template

เมื่อสร้างใบงานใหม่ ให้สร้าง AI prompt สำหรับอ่านใบงานที่เขียนมือด้วย:

```markdown
## AI Prompt Template: [ชื่อใบงาน]

**บทบาท:** คุณคือระบบ OCR + วิเคราะห์ใบงาน [ชื่อวิชา]
**Input:** ภาพถ่าย/scan ของใบงาน "[ชื่อใบงาน]"

**สิ่งที่ต้องอ่าน:**
1. field_name_1: [คำอธิบาย]
2. field_name_2: [คำอธิบาย]
...

**เกณฑ์ให้คะแนน (ถ้ามี):**
- 3 คะแนน: [เกณฑ์]
- 2 คะแนน: [เกณฑ์]
- 1 คะแนน: [เกณฑ์]
- 0 คะแนน: [เกณฑ์]

**Misconception ที่ตรวจสอบ:**
- M_xx: [ชื่อ misconception] → ถ้าพบ flag: "M_xx"

**Output format (JSON):**
```json
{
  "student_name": "...",
  "student_no": "...",
  "field_name_1": "...",
  "field_name_2": "...",
  "score": 0,
  "misconceptions_detected": ["M_xx"],
  "notes": "..."
}
```
```

---

## Color Scheme Standards

| ส่วน | สี (border-left) | สี (background) |
|------|------------------|-----------------|
| P · Predict | #1976d2 (น้ำเงิน) | #e3f2fd |
| O · Observe | #ef6c00 (ส้ม) | #fff3e0 |
| E · Explain | #2e7d32 (เขียว) | #e8f5e9 |
| Misconception alert | #c53030 (แดง) | #fff5f5 |
| Info box | #1565c0 (น้ำเงินเข้ม) | #e8f4fd |
| Upload zone | #7b1fa2 (ม่วง) | #f3e5f5 |

---

## Naming Conventions

| สิ่งที่ตั้งชื่อ | Pattern | ตัวอย่าง |
|----------------|---------|----------|
| ฟังก์ชัน render | `render{ToolType}{PlanN}(body)` | `renderPOE1(body)`, `renderCalc2(body)` |
| Sheet name | `{ToolType}_P{N}` | `POE_P1`, `Calc_P2` |
| Input ID | `p{N}{section}_{field}` | `p1_pred`, `p1e_c1`, `p2o_r1c2` |
| Radio name | `p{N}_{group}` | `p1_pred`, `p1_conf`, `p2_cartoon` |
| Checkbox ID | `p{N}e_{cN}` | `p1e_c1`, `p2e_c3` |

---

## Checklist สุดท้าย

ก่อนส่งมอบใบงาน ตรวจสอบ:

```
□ HTML ผ่าน syntax check (ไม่มี unclosed tags)
□ JavaScript ผ่าน node --check (ไม่มี syntax error)
□ Print CSS: พิมพ์แล้วสวย เส้นเขียนชัด radio/checkbox เห็น
□ Submit: ส่งข้อมูลครบทุก field ไป Google Sheets
□ Validation: แจ้งเตือนถ้ากรอกไม่ครบ
□ P↔E alignment: เหตุผลใน P map กับ checkbox ใน E
□ Misconception: ระบุรหัส M_xx ที่ตรวจสอบ
□ Responsive: ใช้ได้ทั้งมือถือและคอม
□ AI Prompt: สร้าง prompt template สำหรับอ่านใบงานเขียนมือ
```

---

## ตัวอย่างการใช้งาน

**ผู้ใช้:** "สร้างใบงาน POE สำหรับแผน 3 เรื่องการซ้อนทับของคลื่น"

**Claude ทำ:**
1. อ่าน `references/poe-pattern.md`
2. ถามเพิ่มเติม: Misconception อะไร? กิจกรรมอะไร?
3. สร้าง HTML ใบงาน POE ด้วย mixed format (radio+checkbox+textarea)
4. เพิ่ม Print CSS
5. เพิ่ม submit handler → Google Sheets
6. สร้าง AI Prompt Template
7. ตรวจสอบด้วย checklist

**ผู้ใช้:** "สร้างใบกิจกรรมเรื่อง pH ของกรด-เบส วิชาเคมี ม.4"

**Claude ทำ:**
1. อ่าน `references/worksheet-pattern.md`
2. สร้าง HTML ใบกิจกรรมที่มีตารางบันทึกผล + โจทย์คำนวณ
3. เพิ่ม Print CSS + submit handler
4. ใช้ได้เลย — Skill นี้ไม่จำกัดวิชา
