# KP-Classroom Worksheet Core

Shared infrastructure ใช้ใน worksheet ทุกใบ · รองรับ auto-fill ชื่อ + auto-save + export JSON + print PDF

## การติดตั้งใน worksheet ใหม่

1. **ตั้ง `data-ws-id` บน `<body>`** (unique key สำหรับ localStorage):
   ```html
   <body data-ws-id="plan6-calc-6.1">
   ```

2. **ตั้ง id บนช่องข้อมูลนักเรียน** (required สำหรับ auto-fill):
   ```html
   <input type="text" id="s-name">   <!-- ชื่อ -->
   <input type="text" id="s-num">    <!-- เลขที่ -->
   <input type="text" id="s-room">   <!-- ห้อง -->
   <input type="text" id="s-grp">    <!-- กลุ่ม -->
   ```

3. **ตั้ง id บนทุก input/textarea/canvas** ที่ต้อง auto-save
   (ถ้าไม่มี id จะไม่ถูกบันทึก)

4. **เพิ่ม `<script>` ก่อนปิด `</body>`:**
   ```html
   <script src="../../../shared/worksheet-core.js"></script>
   ```
   (ปรับ path `../` ให้ตรงกับตำแหน่งไฟล์ · จาก `lessons/physics3/waves/แผนNN_.../xxx.html`
   ถึง `lessons/shared/worksheet-core.js` = สามระดับขึ้น)

## ฟีเจอร์ที่ได้ฟรี

- **Toolbar ลอยด้านล่าง** (5 ปุ่ม): ดาวน์โหลด JSON · นำเข้า JSON · Print/PDF · ส่งครู · ล้างทั้งหมด
- **Auto-save** ทุก 1.5 วินาที หลังนักเรียนแก้ไข (debounced)
- **Auto-restore** เมื่อเปิดใบงานใหม่ → โหลดคำตอบเดิมจาก localStorage
- **Canvas auto-save** ทุกครั้งที่วาดเสร็จ (mouseup/touchend)
- **Print-friendly CSS** → กด Ctrl+P → PDF ติดทั้ง text, canvas, input values
- **Identity auto-fill** จาก parent KP-Classroom (ถ้ารองรับ)

## API ที่เรียกจากภายนอกได้

```js
KP.exportJSON()      // ดาวน์โหลด .json
KP.importJSON()      // นำเข้า .json
KP.saveNow()         // บันทึกทันที ไม่รอ debounce
KP.loadSaved()       // โหลดจาก localStorage
KP.clearSaved()      // ล้างทั้งหมด (มี confirm)
KP.submitToCloud()   // postMessage ส่ง parent
KP.collectState()    // return state object
KP.WS_ID             // current worksheet id
```

## ฝั่ง KP-Classroom (parent) ต้องทำอะไร

เพื่อให้ auto-fill ชื่อทำงาน · parent ต้อง listen postMessage แล้ว reply กลับ:

```js
// ใน KP-Classroom parent window
window.addEventListener('message', (e) => {
  if (e.data?.type === 'REQUEST_STUDENT_INFO') {
    const iframe = e.source;
    const student = getCurrentSession();  // ข้อมูลนักเรียน login
    iframe.postMessage({
      type: 'STUDENT_INFO',
      name: student.fullName,
      num: student.studentNumber,
      room: student.classroom,
      group: student.group
    }, '*');
  }
  
  if (e.data?.type === 'WS_SUBMIT') {
    // e.data.wsId = unique ws identifier
    // e.data.data = { inputs: {...}, canvases: {...}, _savedAt: ... }
    saveToGoogleSheets(e.data.wsId, e.data.data);
  }
});
```

## Flow ที่นักเรียนจะได้

```
เปิดใบงาน
 ↓
① ขอชื่อจาก parent (1.5s timeout)
② โหลดคำตอบเดิมจาก localStorage
 ↓
นักเรียนเขียน/วาด
 ↓
Auto-save ทุก 1.5s (debounced)
Canvas save ทุก mouseup/touchend
 ↓
[นักเรียนปิด tab หรือเปลี่ยนเครื่อง]
 ↓
เปิดใหม่ → ชื่อมาเอง + คำตอบเดิมกลับมา
 ↓
กด 🖨️ → PDF พร้อมข้อมูลครบ
กด ☁️ → ส่งเข้า KP-Classroom Sheet
กด 📥 → ดาวน์โหลด .json เก็บส่วนตัว
```

## ข้อจำกัด

- **localStorage** มี quota 5–10 MB ต่อ origin · canvas PNG ใหญ่อาจเต็ม → ถ้าเต็ม จะเตือน "บันทึกไม่สำเร็จ"
- **Auto-fill ชื่อ** ทำงานเฉพาะเมื่อใบงานเปิดในระบบ KP-Classroom (iframe) · เปิดโดยตรงใน browser จะ fallback ให้พิมพ์เอง
- **ส่งครู (cloud)** ต้องมี parent iframe + ระบบหลังบ้าน · หากเปิดโดยตรงจะแจ้งเตือน
