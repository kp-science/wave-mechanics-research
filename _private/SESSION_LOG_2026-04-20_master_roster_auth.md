# Session Log · 2026-04-20 · Master Roster Auth + 3-Level Navigation

**เป้าหมาย:** วางระบบ authentication กลาง (Master Roster) ปิดช่องโหว่ที่ใครพิมพ์ชื่ออะไรก็ login ได้ · เปลี่ยน navigation เป็น 3 ระดับ (วิชา → หัวข้อ → แผน) รองรับการขยายวิชาใหม่โดยไม่แตะ code เว็บ

---

## ✅ สิ่งที่ทำเสร็จ (ตามลำดับ commit)

### Phase 1 · Backend · `1ded179` — feat(auth): Master Roster backend
- **`_private/MasterRoster_Code.gs`** — Apps Script deploy แยกจาก physics3 backend
  - Actions: `login` · `logout` · `verifyToken` · `uploadRoster` · `resetPassword` · `forceLogout` · `getRoster` · `getEnrollment` · `updateEnrollment`
  - SHA-256 hash birthdate เก็บเป็น `password_hash` · ไม่เก็บ plain text
  - Session token UUID · TTL 12 ชม. · ทับกันเมื่อ login ใหม่ (1:1 lockout)
  - Helper: `setupSheets` · `hashAllPasswords` · `clearAllSessions` · `ensureNumberColumn_` (migration)
- **Sheet schema** `Master_Roster_2569`:
  - tab `Students`: student_id, full_name, room, birthdate, password_hash, session_token, token_created, last_login, note, number
  - tab `Enrollment`: student_id, subject, topic, year, note (ยังไม่ใช้งานจริง · hook ไว้ให้อนาคต)
- **`_private/SETUP_MasterRoster.md`** — คู่มือ 6 ขั้น (~15 นาที) + troubleshooting
- **`_private/test_login.html`** — standalone test page (localStorage-safe สำหรับ data: URL preview)

### Phase 2 · Frontend login · `1ded179`
- **`content/physics3/config.js`** — เพิ่มฟิลด์ `rosterApiUrl`
- **หน้า Login ใหม่**: เหลือ 2 ช่อง (รหัสนักเรียน + วันเกิด DDMMYYYY พ.ศ.)
  - ตัดโหมด roster dropdown + manual type-your-name ทิ้งทั้งคู่
- **`loginMaster()`** เรียก POST rosterApiUrl → เก็บ token ใน state.student
- **`DB.submit` patched**: แนบ `session_token` + `subject` + `topic` อัตโนมัติทุก submission
- **Session heartbeat**: `checkSession()` ทุก 10 นาที + ทันทีหลัง restore · ถ้า `valid:false` → auto-logout + alert "ถูก login จากเครื่องอื่น"
- **Logout**: แจ้ง Master Roster ให้ clear token (best-effort · no-cors)

### Phase 3 · Navigation · `4c9cfbf` → `83bc4f1`
- **`content/subjects.js`** — registry กลาง (hard-code)
  - physics3: SHM · waves (current) · sound · light
  - astronomy: u1
  - ฟิลด์ `status` · `current` · `icon` · `color` · `bgGradient` · `numPlans`
- **Flow 3 ระดับ**: `index.html` (เลือกวิชา) → `KP-Classroom.html?course=X` (login → topics → plans)
- **Views ใหม่**: `view-subjects` (deprecated ไม่ใช้ · subject selector ย้ายไป index.html) · `view-topics`
- **`showTopics(subjectId)`**: render การ์ดหัวข้อจาก KP_SUBJECTS · coming-soon → alert
- **`selectTopic()`**: ถ้า `topic.current` → showHome · ไม่งั้น reload `?course=X`
- **Persist** `state.subject` + `state.topic` ใน `LS_NAV` · resume ได้หลัง reload
- **ปุ่ม topBar**: `📖 เปลี่ยนหัวข้อ` (stay) + `🏠 เปลี่ยนวิชา` → `index.html`

### Phase 3b · Design · `29e5aa9` → `998a3f9`
- **Subject cards (หน้า subjects · ปัจจุบันไม่ใช้)**: gradient tile + shine animation
- **Topic cards ธีมอวกาศ** (เหมือน index.html):
  - `body.topics-theme`: พื้นหลังดำ + star field + nebula aura (violet/cyan/pink)
  - Glass morphism: `rgba(30,33,74,.55)` + backdrop-filter blur(16px)
  - Open state: aurora gradient ring (cyan→violet→pink) + pink glow on hover + LIVE badge pulse
  - Locked state: muted glass + 🔒 watermark + SOON badge
  - Fonts: Space Grotesk + IBM Plex Sans Thai + JetBrains Mono
- **Login label**: "ลงชื่อเข้าเรียน" + `KP_CONFIG.title` (subject-specific)

### Phase 4 · Multi-topic DB routing · `9e7e980`
- `content/subjects.js` topics เพิ่มฟิลด์ `dbUrl` (null = fallback `KP_CONFIG.apiUrl`)
- `getTopicDbUrl()` helper · resolve จาก `state.subject`/`state.topic`
- `DB.submit` route ไปที่ topic's dbUrl · payload แนบ subject/topic ให้ชีทปลายทางรู้บริบท
- **เพิ่มหัวข้อใหม่ = แก้ subjects.js 1 ไฟล์**: set `status:'open'` + `dbUrl:'<new URL>'` + `numPlans`

### Phase 4b · Teacher Roster UI · `0c29617` → `001c576`
- **Tab `👥 นักเรียน`** ใน Teacher Dashboard (เปลี่ยนไปใช้ Master Roster แทน `_Students` ท้องถิ่น)
  - วาง Excel 5 คอลัมน์: `student_id, full_name, room, birthdate, number`
  - Upload = แทนที่ทั้งหมด + clear token
  - ตารางแบ่งห้อง · realtime search ตามชื่อ/รหัส/ห้อง
  - 🟢 online / — offline (จาก `has_token`)
  - ต่อนักเรียน: **🔑 Reset password** (คืนเป็นวันเกิด + clear token) · **🚪 Kick** (force logout)
- **Export PDF** รหัส username/password · auto-print window · print-friendly CSS แยกหน้าต่อห้อง

### Hotfix · `001c576` — fix(pdf): escape `</script>` in template literal
- `exportRosterPDF` มี inline `<script>window.print()</script>` ใน HTML string
- browser parser เจอ `</script>` → ปิด outer `<script>` tag ของหน้าหลัก → Unexpected EOF
- ผลคือ `openTeacher` + ฟังก์ชันหลังจุดนั้นทั้งหมด undefined · ปุ่มครู "ไม่ขยับอะไรเลย"
- แก้เป็น `<\/script>` · JS parser รับได้ · browser parser เห็นเป็น literal

---

## 🐞 Bug / Lessons learned

1. **`</script>` ใน template literal = หายนะเงียบ** · script tag ปิดก่อนเวลา ทำให้ code หลังจากนั้นกลายเป็น HTML text · console error เดียวที่ได้คือ `Unexpected EOF` ที่ไม่ชี้ root cause
2. **data: URL disable localStorage** · Launch preview panel ใช้ data: URL · `test_login.html` ต้อง in-memory only
3. **Google Sheets ตัด leading 0** · ต้อง set column เป็น Plain text หรือพิมพ์ `'01012551` · ไม่งั้น `birthdate` จะกลายเป็น 7 หลัก → hash ผิด → login ไม่ได้
4. **Re-deploy Apps Script ต้องใช้ Manage deployments → Edit → New version** · "New deployment" ให้ URL ใหม่ → ต้องไปแก้ config อีก
5. **`</script>` ใน document.write ต้อง escape ตั้งแต่แรก** · ของเดิมใน content loader ทำถูก · ของผมพลาดที่ PDF export

---

## 📐 สถาปัตยกรรมที่ได้

```
🏠 index.html (landing · เลือกวิชา)
       ↓
📍 KP-Classroom.html?course=physics3
       ↓
🔐 ลงชื่อเข้าเรียน (รหัส + วันเกิด → Master_Roster_2569)
       ↓
📖 เลือกหัวข้อ (subjects.js registry · ธีมอวกาศ)
       ↓
🏠 Home (แผน 1-10 · ใบงาน)
       ↓
☁️ submit → topic.dbUrl (ชีทแยกต่อหัวข้อ)
```

**การเพิ่มวิชา/หัวข้อใหม่:**
- วิชาใหม่ → เพิ่มการ์ดใน `index.html` + content pack ใน `content/<subject>/`
- หัวข้อใหม่ → deploy Apps Script + สร้างชีทใหม่ + แก้ `content/subjects.js` (`status:'open'` + `dbUrl`)
- **ไม่ต้องแตะ `KP-Classroom.html`**

---

## 🎯 ที่ยังไม่ทำ (backlog)

- [ ] Restructure `content/physics3/*.js` → `content/physics3/waves/*.js` (ทำเมื่อเริ่มหัวข้อที่ 2)
- [ ] Cross-device resume (ถ้า login เครื่อง A แล้วไปต่อที่ B · ปัจจุบัน token ทับ)
- [ ] Teacher analytics dashboard แสดงสถิติ pre-post ข้ามหัวข้อ (Option B · IMPORTRANGE)
- [ ] Enrollment gating (ปัจจุบัน login ทุกคนเห็นทุกวิชา · ถ้าต้องจำกัดต้องใช้ Enrollment tab)

---

## 📊 Commits รวม

| Hash | ชื่อ |
|---|---|
| `1ded179` | feat(auth): Master Roster login · student_id + birthdate + 1:1 session lockout |
| `4c9cfbf` | feat(nav): 3-level navigation · login → subject → topic → plans |
| `29e5aa9` | style(nav): redesign subject/topic cards · premium look |
| `2a9f117` | style(login): เปลี่ยน label · ลงชื่อเข้าเรียน |
| `83bc4f1` | fix(nav): ตัด subject selector ใน KP-Classroom · ใช้ index.html เป็น subject picker |
| `998a3f9` | style(topics): apply dark space theme matching index.html |
| `9e7e980` | feat(db): multi-topic database routing · submission → topic's dbUrl |
| `0c29617` | feat(teacher): roster management tab · Master Roster CRUD |
| `001c576` | fix(pdf): escape `</script>` ใน template literal |

**จำนวนไฟล์ที่เปลี่ยน:** 6 (KP-Classroom.html, content/physics3/config.js, content/subjects.js, _private/MasterRoster_Code.gs, _private/SETUP_MasterRoster.md, _private/test_login.html)
