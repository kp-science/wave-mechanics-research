# 🔐 Setup Master Roster (ระบบล็อกอินกลาง)

ระบบนี้ใช้ **1 Google Sheet กลาง** เก็บรายชื่อนักเรียน + password + session token
นักเรียน login ครั้งเดียว → ใช้ได้ทุกวิชา (ฟิสิกส์3, ดาราศาสตร์, ...)

---

## 📋 สเปคที่ตกลงไว้

| รายการ | ค่า |
|---|---|
| Username | รหัสนักเรียน (เช่น 12345) |
| Password | วันเดือนปีเกิด DDMMYYYY พ.ศ. (เช่น 15082551) |
| ใครตั้ง password | ครู (จากรายชื่อ) · นักเรียนตั้งเองไม่ได้ |
| ลืมรหัส | ครู reset ให้ (กลับเป็นวันเกิด) |
| Login พร้อมกัน | 1:1 · login เครื่องใหม่ → เครื่องเก่าถูกเตะออก |
| Token หมดอายุ | 12 ชั่วโมง |

---

## 🚀 ขั้นตอนติดตั้ง (ทำครั้งเดียว · ~15 นาที)

### ขั้นที่ 1 — สร้าง Google Sheet ใหม่
1. ไปที่ [sheets.new](https://sheets.new) (สร้างสเปรดชีตใหม่)
2. เปลี่ยนชื่อไฟล์เป็น **`Master_Roster_2569`**
3. (ยังไม่ต้องสร้าง tab อะไร · script จะสร้างให้อัตโนมัติ)

### ขั้นที่ 2 — ติดตั้ง Apps Script
1. ใน sheet นี้: **Extensions → Apps Script**
2. จะเปิด editor ขึ้นมา · ลบโค้ดเดิมในไฟล์ `Code.gs` ออก
3. Copy ทั้งหมดจาก [`_private/MasterRoster_Code.gs`](MasterRoster_Code.gs) มาวาง
4. กด 💾 Save (Ctrl+S) · ตั้งชื่อโปรเจกต์ว่า `Master_Roster_Backend`

### ขั้นที่ 3 — ตั้งรหัสครู (Script Property)
1. ใน Apps Script editor: **Project Settings** (รูปเฟือง ⚙ ซ้ายมือ)
2. เลื่อนลงไปที่ **Script Properties** → **Add script property**
3. Property: `TEACHER_PASSWORD` · Value: `(รหัสเดียวกับ physics3 backend เดิม)`
4. Save

### ขั้นที่ 4 — Authorize + สร้าง tab
1. กลับไปที่ Editor · เลือก function **`setupSheets`** จาก dropdown
2. กด **Run** · จะขออนุญาต → **Allow access** → เลือกบัญชี → **Advanced → Go to ... (unsafe)** → Allow
3. เปิด Execution log ด้านล่าง · ควรเห็น `✓ Roster + Enrollment sheets ready`
4. กลับไป sheet · จะมี tab `Students` + `Enrollment` เกิดขึ้น

### ขั้นที่ 5 — Deploy เป็น Web App
1. ใน Apps Script editor: **Deploy → New deployment**
2. **Select type** (รูปเฟือง): **Web app**
3. กรอก:
   - Description: `Master Roster v1`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. กด **Deploy** → ขออนุญาตอีก → Allow
5. **Copy Web app URL** ที่ได้ (จะเป็น `https://script.google.com/macros/s/.../exec`)
6. เก็บ URL ไว้ · จะใช้ขั้นต่อไป

### ขั้นที่ 6 — เพิ่ม URL ใน Content Pack
แก้ไฟล์ `content/physics3/config.js` (และของวิชาอื่นในอนาคต) · เพิ่ม field `rosterApiUrl`:

```js
window.KP_CONFIG = {
  // ... ของเดิม ...
  apiUrl:       'https://.../exec',          // Backend เดิมของวิชา (submission)
  rosterApiUrl: 'https://.../exec',          // ← เพิ่มใหม่ · Master Roster URL จากขั้นที่ 5
  // ... ของเดิมต่อ ...
};
```

---

## 📝 การนำเข้ารายชื่อนักเรียน

### วิธีที่ 1 — กรอกใน sheet ตรงๆ (ง่ายสุดสำหรับครั้งแรก)
เปิด `Master_Roster_2569` → tab `Students` · กรอกตามคอลัมน์

| student_id | full_name | room | birthdate | password_hash | session_token | token_created | last_login | note |
|---|---|---|---|---|---|---|---|---|
| 12345 | สมหญิง รักเรียน | 5/1 | 15082551 | *(ปล่อยว่าง)* | | | | |

**⚠️ ขั้นตอนสำคัญ**: หลังกรอก birthdate แล้ว **ต้องรัน `hashAllPasswords`**
- Apps Script Editor → เลือก function **`hashAllPasswords`** จาก dropdown → **Run**
- จะ hash ทุกแถวที่ `password_hash` ว่าง แล้วเขียนกลับ sheet
- รันซ้ำได้ไม่เสียหาย (แถวที่ hash แล้วจะถูกข้าม)
- ถ้าเปลี่ยน birthdate ของใคร · ลบค่า `password_hash` ของคนนั้นออก → รันใหม่

### วิธีที่ 2 — ใช้ Teacher UI (จะทำในรอบถัดไป)
ใน Dashboard ครู · เมนูใหม่ **"จัดการรายชื่อนักเรียน"**
- วาง data จาก Excel ทีเดียว
- ระบบ hash password ให้อัตโนมัติ
- Export PDF แจกนักเรียน

---

## 🧪 ทดสอบระบบ

### ทดสอบ login (หลังมีรายชื่อแล้ว)
เปิด browser → วาง URL นี้ (แทน `YOUR_URL` ด้วย Web app URL ที่ copy ไว้):

```
https://YOUR_URL?action=info
```

ควรได้ JSON `{status:"ok", version:"1.0", roster_count: N, ...}`

### ทดสอบ login จริง (ผ่าน curl/Postman)
```bash
curl -X POST 'https://YOUR_URL' \
  -H 'Content-Type: application/json' \
  -d '{"action":"login","student_id":"12345","password":"15082551"}'
```

ควรได้:
```json
{"status":"ok","token":"uuid-...","student":{"id":"12345","name":"สมหญิง รักเรียน","room":"5/1","subjects":[]}}
```

---

## 🔄 ขั้นตอนถัดไป (ในรอบถัดไป)

- [ ] เพิ่ม function `hashAllPasswords` ใน script (สำหรับ hash แบบ bulk หลังกรอก birthdate ใน sheet)
- [ ] ปรับหน้า Login ใน `KP-Classroom.html` (เหลือ 2 ช่อง: รหัสนักเรียน + วันเกิด)
- [ ] ปรับ `worksheet-core.js` ให้แนบ token ทุก submit
- [ ] สร้าง Teacher UI "จัดการรายชื่อนักเรียน" (import/reset/force logout)
- [ ] Subject registry สำหรับหลายวิชา

---

## 🆘 Troubleshooting

**Deploy ไม่สำเร็จ · ติด permission**
- ต้องกด "Advanced → Go to ... (unsafe)" ตอน authorize (Google เตือนเพราะ script เขียน sheet)
- ถ้ายัง deploy ไม่ได้ · ลองเปลี่ยน "Who has access" เป็น "Anyone" (ไม่ใช่ "Anyone within domain")

**เปลี่ยน code แล้วเว็บยังเรียกของเก่า**
- ต้อง **Deploy → Manage deployments → Edit (ดินสอ) → New version → Deploy**
- Deploy ใหม่ = URL เดิม แต่ได้ code ล่าสุด
- ห้าม "New deployment" (จะได้ URL ใหม่ = ต้องไปแก้ config.js อีก)

**รหัสผ่านไม่ถูกต้อง**
- ตรวจว่า birthdate ใน sheet เป็น format 8 หลัก (DDMMYYYY) ไม่ใช่ 7 หลัก
- ตรวจว่า password_hash column ไม่ว่าง (ถ้าว่าง = ยัง hash ไม่เสร็จ)
