# HANDOFF — งานที่เหลือ (SHM FT bank · เสียง · แสง)
**บันทึก:** 2026-04-27 หลัง session SHM import + Teacher Dashboard multi-unit

---

## ⚙️ Infra ที่ทำเสร็จแล้ว (ไม่ต้องแตะ)
- ✅ SHM import เป็น sub-unit ของ physics3 (ดู `lessons/physics3/SHM/SESSION_LOG_2026-04-27_SHM_import.md`)
- ✅ Backend SHM deploy + wired (Sheet `Physics3-SHM-2569`)
- ✅ Teacher Dashboard รองรับ multi-unit (dropdown · multi-unit overview · dynamic switch ไม่ reload · pref persist)
- ✅ wsId mapping ของ SHM ผ่าน audit (41/41 ถูก)
- ✅ Scaffold pack ของ **เสียง** + **แสง** ที่ `content/physics3/units/{sound,light}/` (5 ไฟล์ skeleton ต่อ unit)
- ✅ Folder `lessons/physics3/{sound,light}/` พร้อมไว้รอแผน

---

## 📋 สิ่งที่เหลือต่อยอด (ตามลำดับความเร่งด่วน)

### A. ลบ row test ใน SHM Sheet (1 นาที · ทำก่อนนักเรียนจริงเข้ามา)
มี 2 row ทดสอบใน `Physics3-SHM-2569`:
- `SHM_POE_P1` row student_id=`TEST_VERIFY`
- `SHM_Calc_P2` row student_id=`E2E_TEST`

**วิธีลบ:** เปิด Teacher Dashboard → tab 📊 ภาพรวม → คลิกการ์ด → ลบ row · หรือเปิด Google Sheet ตรงๆ → ลบแถว

---

### B. SHM FT-01 / FT-02 unit-wide (ตอนนี้ใช้ F1-F6 ราย-แผนแล้ว)
ปัจจุบัน SHM ใช้ F1-F6 ราย-แผน (มี HTML ใน `lessons/physics3/SHM/แผนNN/สื่อ05_FN_Fourtier_PrePost.html`) ส่งข้อมูลเข้า `SHM_F_Fourtier_PN`

ถ้าอยากเพิ่ม **FT-01 (Pre ทั้งหน่วย) + FT-02 (Post ทั้งหน่วย)** เหมือน waves:

1. สร้าง 2 ไฟล์ HTML ใหม่ (ใช้ `แผน01_นิยามSHM/สื่อ05_F1_Fourtier_PrePost.html` เป็น template):
   - `lessons/physics3/SHM/แผน01_นิยามSHM/สื่อ12_FT01_Fourtier_PreUnit.html`
   - `lessons/physics3/SHM/แผน06_damping_resonance/สื่อ08_FT02_Fourtier_PostUnit.html`
   - คำถาม: 12-15 ข้อ four-tier ครอบ M1.x – M6.x (~2 ข้อต่อแผน)
   - sheet: `SHM_FT01` / `SHM_FT02`

2. เพิ่มใน `content/physics3/units/shm/tools.js`:
   ```js
   'ft01_shm': { ico:'📝', name:'FT-01 · Pre หน่วย SHM', desc:'Pre-test ครอบ 6 แผน',  sheet:'SHM_FT01', color:'tc-ft', file:'แผน01_นิยามSHM/สื่อ12_FT01_Fourtier_PreUnit.html', lockAfterSubmit:true },
   'ft02_shm': { ico:'📝', name:'FT-02 · Post หน่วย SHM', desc:'Post-test ครอบ 6 แผน', sheet:'SHM_FT02', color:'tc-ft', file:'แผน06_damping_resonance/สื่อ08_FT02_Fourtier_PostUnit.html', lockAfterSubmit:true }
   ```

3. ใส่ใน plans 1 + 6:
   ```js
   1: ['ft01_shm', 'tl-pre','f1-pre',...]
   6: [..., 'tl-post','f6-post','mj6','ft02_shm','upload']
   ```

---

### C. SHM `KP_FT_BANK` (ถ้าอยากให้ engine render Four-tier ในแอปแทน iframe)
ตอนนี้ F1-F6 SHM ใช้ iframe HTML (ผ่าน `def.file` ใน tools.js) → ครูเปิดได้แล้ว · นักเรียนกรอกได้ · ส่งเข้า Sheet ได้

ถ้าอยาก render ใน Engine โดยตรง (ดู waves Plan 1 F1 จริง):
1. เติม `KP_FT_BANK[N]` ใน [content/physics3/units/shm/questions.js](content/physics3/units/shm/questions.js) — มี example 1 ข้อแล้ว (M1.1)
2. ลบ `file:'...'` ของ `f{N}-pre/post` ใน tools.js → openTool() จะ fallback ไป engine renderer (renderFTForm) ที่อ่าน FT_BANK
3. ถ้าครูอยากเก็บทั้งคู่ (engine + iframe) → ทำเป็น 2 tools แยก (`f1-pre` = engine, `f1-pre-pdf` = iframe สำหรับพิมพ์)

---

### D. หน่วยเสียง · แสง (scaffold พร้อมแล้ว)
**Scaffold ที่ทำให้:**
- `content/physics3/units/sound/` (plans/tools/media/questions/worksheets · 5 ไฟล์ skeleton)
- `content/physics3/units/light/` (เหมือนกัน)
- `lessons/physics3/sound/`, `lessons/physics3/light/` (โฟลเดอร์ว่าง รอใส่ HTML)
- [subjects.js](content/subjects.js): topic เสียง+แสง มี `unit:'sound'` / `unit:'light'` ชี้ไป scaffold

**ตอนนี้ status='coming-soon':** ครูคลิกการ์ด "เสียง" หรือ "แสง" จะขึ้น alert "กำลังเตรียม"

**เปิดใช้:** เมื่อมีแผนแล้ว →
1. เติม `KP_PLANS = [{no:1, title:'...', periods:2, status:'open'}, ...]`
2. เติม `KP_PLAN_TOOLS = {1: ['poe1', ...], ...}`
3. เติม `KP_TOOL_DEFS = {'poe1': {...}, ...}`
4. เติม `KP_PLAN_MEDIA` ถ้ามีสื่อ
5. เปลี่ยน `status:'coming-soon'` → `'open'` ใน [subjects.js](content/subjects.js)
6. เปลี่ยน `numPlans:0` → จำนวนแผนจริง

**ถ้าอยากแยก Sheet ของเสียง/แสง** (ไม่ปนกับคลื่น+SHM):
- ทำตาม `_private/SETUP_SHM_Backend.md` แต่เปลี่ยนชื่อ Sheet เป็น `Physics3-Sound-2569` / `Physics3-Light-2569`
- วาง URL ใน `dbUrl:` ของ topic ที่เกี่ยวข้องใน [subjects.js](content/subjects.js)
- Teacher Dashboard จะเห็น 4 กลุ่ม (คลื่น + SHM + เสียง + แสง) ใน tab ภาพรวมโดยอัตโนมัติ

**ถ้าใช้ชีทรวม** (ปล่อย `dbUrl:null`):
- ใบงานเสียง/แสง จะลงในชีทคลื่น (`API_URL` หลัก) — ดูง่ายแต่ปนกับคลื่น
- ใช้ `wsIdToSheet` mapping ที่ engine มีอยู่แล้ว — แต่ pattern ต้องเริ่มต้นด้วย `sound-` หรือ `light-` (แก้ engine เพิ่มถ้าต้องการ split sheet)

---

## 🗂 ไฟล์ที่เกี่ยวข้อง
- Engine: [KP-Classroom.html](KP-Classroom.html) (multi-unit logic บรรทัด 741-757, 894-915, 3306-3320, 3340-3470, 3493-3585)
- Subjects registry: [content/subjects.js](content/subjects.js)
- SHM pack: [content/physics3/units/shm/](content/physics3/units/shm/)
- Sound scaffold: [content/physics3/units/sound/](content/physics3/units/sound/)
- Light scaffold: [content/physics3/units/light/](content/physics3/units/light/)
- Apps Script generic: [_private/AppsScript_Code.gs](_private/AppsScript_Code.gs) (ใช้ paste ลง backend ใหม่ของหน่วยใดก็ได้)
- Setup template: [_private/SETUP_SHM_Backend.md](_private/SETUP_SHM_Backend.md) (ใช้ pattern เดียวกันกับ Sound/Light)
- Teacher Dashboard ref: `~/.claude/.../memory/reference_teacher_dashboard_multiunit.md`

---

## ⚠️ จุดที่ AI ไม่ควรทำเอง (ครูเขียนเอง)
1. **คำถาม Four-tier** (FT-01/02 และ FT_BANK) — ต้อง valid ทางวิทยาศาสตร์ + targeted at known misconceptions ในห้องเรียนจริง
2. **เนื้อหาเสียง · แสง** (plans titles · tool descriptions · POE/CER prompts) — ครูเป็นคนรู้ standard + scope ของหลักสูตร ม.5

AI ช่วยได้: scaffold โครง · validate engine integration · audit mapping · ทำ batch refactor · เขียน setup docs
