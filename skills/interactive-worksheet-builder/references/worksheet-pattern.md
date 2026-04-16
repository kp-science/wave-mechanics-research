# Worksheet Pattern — ใบกิจกรรม / โจทย์คำนวณ / Spot the Error

## ภาพรวม

ใบงานทั่วไป (ไม่ใช่ POE) ใช้โครงสร้างที่ยืดหยุ่นกว่า แต่ยังคงหลักการเดียวกัน:
- Mixed format (ตัวเลือก + เขียนเปิด)
- Print CSS สำหรับเขียนมือ
- Submit → Google Sheets
- AI Prompt Template

---

## ประเภทใบงาน + Template

### 1. ใบกิจกรรม (Activity Sheet)

**ใช้เมื่อ:** นักเรียนทำกิจกรรม/ทดลอง แล้วบันทึกผล

```html
<div class="worksheet">
  <!-- จุดประสงค์ -->
  <div class="info">
    <b>จุดประสงค์:</b> [ระบุจุดประสงค์]
  </div>
  
  <!-- วัสดุ/อุปกรณ์ -->
  <div class="section">
    <h3>🔬 วัสดุอุปกรณ์</h3>
    <ul>...</ul>
  </div>
  
  <!-- ขั้นตอน -->
  <div class="section">
    <h3>📋 ขั้นตอนการทดลอง</h3>
    <ol>...</ol>
  </div>
  
  <!-- ตารางบันทึกผล -->
  <div class="section">
    <h3>📊 ตารางบันทึกผล</h3>
    <table>...</table>
  </div>
  
  <!-- คำถามวิเคราะห์ -->
  <div class="section">
    <h3>❓ คำถามวิเคราะห์</h3>
    <div class="question">
      <label>1. [คำถาม]</label>
      <textarea placeholder="คำตอบ..."></textarea>
    </div>
  </div>
  
  <!-- สรุป -->
  <div class="section">
    <h3>📝 สรุปผลการทดลอง</h3>
    <textarea placeholder="จากการทดลอง สรุปได้ว่า..."></textarea>
  </div>
</div>
```

### 2. โจทย์คำนวณ (Calculation Problems)

**ใช้เมื่อ:** ฝึกแก้ปัญหาเชิงคำนวณ

```html
<div class="worksheet">
  <!-- แต่ละข้อ -->
  <div class="problem">
    <div class="problem-text">
      <b>ข้อ 1.</b> [โจทย์] (difficulty: ⭐)
    </div>
    
    <!-- สูตรที่ใช้ -->
    <label>สูตรที่ใช้:</label>
    <input type="text" placeholder="v = fλ">
    
    <!-- วิธีทำ -->
    <label>วิธีทำ:</label>
    <textarea placeholder="แสดงวิธีทำ..." style="min-height:100px"></textarea>
    
    <!-- คำตอบ -->
    <label>คำตอบ:</label>
    <div style="display:flex;gap:8px;align-items:center">
      <input type="text" id="ans1" placeholder="ตัวเลข">
      <span>[หน่วย]</span>
    </div>
  </div>
</div>
```

**เทคนิค:** เรียงจากง่าย→ยาก (⭐ → ⭐⭐ → ⭐⭐⭐)

### 3. Spot the Error

**ใช้เมื่อ:** ตรวจจับ misconception โดยให้หาข้อผิดพลาดในข้อความ

```html
<div class="worksheet">
  <div class="info">
    <b>คำชี้แจง:</b> อ่านข้อความแต่ละข้อ → ระบุว่าถูกหรือผิด → ถ้าผิดให้แก้ไข
  </div>
  
  <div class="statement">
    <div class="statement-text">
      <b>ข้อความที่ 1:</b> "[ข้อความที่อาจมี misconception]"
      <span class="mis-tag">M_xx</span>
    </div>
    
    <div class="verdict">
      <label><input type="radio" name="s1" value="correct"> ✅ ถูกต้อง</label>
      <label><input type="radio" name="s1" value="wrong"> ❌ ผิด</label>
    </div>
    
    <label>ถ้าผิด จุดไหนผิด? แก้ไขอย่างไร?</label>
    <textarea placeholder="ผิดตรง... ที่ถูกคือ..."></textarea>
    
    <label>อธิบายเหตุผลประกอบ:</label>
    <textarea placeholder="เพราะ..."></textarea>
  </div>
</div>
```

### 4. Matrix Table / Graphic Organizer

**ใช้เมื่อ:** เปรียบเทียบสิ่งของ/แนวคิดหลายอย่าง

```html
<div class="worksheet">
  <table class="matrix">
    <tr>
      <th>เกณฑ์เปรียบเทียบ</th>
      <th>[หัวข้อ A]</th>
      <th>[หัวข้อ B]</th>
      <th>[หัวข้อ C]</th>
    </tr>
    <tr>
      <td>[เกณฑ์ 1]</td>
      <td><textarea></textarea></td>
      <td><textarea></textarea></td>
      <td><textarea></textarea></td>
    </tr>
    <!-- ... -->
  </table>
</div>
```

---

## CSS มาตรฐานสำหรับใบงาน

```css
/* === Base === */
* { box-sizing: border-box; margin: 0; }
body { font-family: 'Sarabun', 'Segoe UI', sans-serif; background: #f0f2f5; color: #1a1a2e; line-height: 1.6; }

.worksheet { max-width: 800px; margin: 20px auto; background: #fff; border-radius: 14px; box-shadow: 0 2px 12px rgba(0,0,0,.08); padding: 24px; }

.section { margin: 16px 0; padding: 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; }
.section h3 { font-size: 16px; margin-bottom: 10px; }

.info { background: #e8f4fd; border: 1.5px solid #90caf9; border-radius: 10px; padding: 12px 16px; margin-bottom: 16px; font-size: 14px; }

textarea { width: 100%; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 8px; font-family: inherit; font-size: 14px; min-height: 60px; resize: vertical; }

input[type=text] { border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 6px 10px; font-family: inherit; font-size: 14px; }

.matrix { width: 100%; border-collapse: collapse; font-size: 14px; }
.matrix th { background: #e3f2fd; color: #0d47a1; padding: 8px; text-align: center; border: 1px solid #90caf9; }
.matrix td { padding: 6px; border: 1px solid #cbd5e1; text-align: center; }

.problem { border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 14px; margin: 10px 0; }
.problem-text { font-size: 15px; margin-bottom: 10px; }

.statement { border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 14px; margin: 10px 0; }
.mis-tag { display: inline-block; background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; border-radius: 12px; padding: 1px 8px; font-size: 11px; margin-left: 6px; }

.submit-bar { text-align: center; margin-top: 20px; }
.btn-submit { background: #1565c0; color: #fff; border: none; padding: 10px 28px; border-radius: 8px; font-size: 16px; font-weight: 700; cursor: pointer; }
.btn-submit:hover { background: #0d47a1; }

/* === Print === */
@media print {
  body { background: #fff; font-size: 12pt; }
  .worksheet { box-shadow: none; border: none; padding: 0; max-width: 100%; }
  .submit-bar, .no-print { display: none !important; }
  .print-header { display: flex !important; justify-content: space-between; border: 2px solid #000; padding: 6px 12px; margin-bottom: 10px; font-size: 11pt; }
  textarea { border: none !important; border-bottom: 1.5px solid #000 !important; background: repeating-linear-gradient(transparent, transparent 22px, #ccc 22px, #ccc 23px) !important; resize: none !important; }
  input[type=text] { border: none !important; border-bottom: 1.5px solid #000 !important; }
  input[type=radio], input[type=checkbox] { -webkit-appearance: auto !important; appearance: auto !important; }
  @page { size: A4; margin: 1.2cm 1.5cm; }
}

/* Screen: ซ่อน print-only */
.print-header { display: none; }
```

---

## Submit Handler Pattern

```javascript
function collectData() {
  const data = {};
  
  // Text inputs
  document.querySelectorAll('input[type=text][id]').forEach(el => {
    data[el.id] = el.value.trim();
  });
  
  // Textareas
  document.querySelectorAll('textarea[id]').forEach(el => {
    data[el.id] = el.value.trim();
  });
  
  // Radio groups
  document.querySelectorAll('input[type=radio]:checked').forEach(el => {
    data[el.name] = el.value;
  });
  
  // Checkboxes
  document.querySelectorAll('input[type=checkbox][id]').forEach(el => {
    data[el.id] = el.checked;
  });
  
  return data;
}

async function submitData(sheetName, data, statusEl, btn) {
  btn.disabled = true;
  statusEl.textContent = '⏳ กำลังส่ง...';
  
  try {
    await fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'submit',
        sheet: sheetName,
        timestamp: new Date().toISOString(),
        ...data
      })
    });
    statusEl.textContent = '✅ ส่งสำเร็จ!';
    statusEl.style.color = '#2e7d32';
  } catch (e) {
    statusEl.textContent = '❌ ส่งไม่สำเร็จ: ' + e.message;
    statusEl.style.color = '#c53030';
    btn.disabled = false;
  }
}
```

---

## Scoring Guide (สำหรับ AI Prompt)

### โจทย์คำนวณ (0-3)
| คะแนน | เกณฑ์ |
|-------|-------|
| 3 | เลือกสูตรถูก + แทนค่าถูก + คำตอบถูก + หน่วยถูก |
| 2 | เลือกสูตรถูก + วิธีทำถูกแต่คำนวณผิดเล็กน้อย |
| 1 | เลือกสูตรถูกแต่แทนค่าผิดหรือทำไม่เสร็จ |
| 0 | ไม่ตอบหรือใช้สูตรผิด |

### Spot the Error (0-3)
| คะแนน | เกณฑ์ |
|-------|-------|
| 3 | ระบุถูก/ผิดถูกต้อง + ชี้จุดผิดได้ + อธิบายหลักการประกอบ |
| 2 | ระบุถูก/ผิดถูกต้อง + ชี้จุดผิดได้ แต่อธิบายไม่สมบูรณ์ |
| 1 | ระบุถูก/ผิดถูกต้อง แต่ไม่สามารถชี้จุดผิดหรืออธิบายได้ |
| 0 | ระบุถูก/ผิดผิดพลาด หรือไม่ตอบ |
