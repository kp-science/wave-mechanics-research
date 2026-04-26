# Session Log — นำคอร์ส SHM เข้าระบบ KP-Classroom
**วันที่:** 2026-04-27
**ผู้ทำ:** ครูโกเมน × Claude
**ขอบเขต:** import SHM 6 แผน เข้า KP-Classroom เป็นหน่วยใต้ฟิสิกส์ 3 + ปรับ engine + ใส่ POE ใบงาน

---

## 🎯 เป้าหมายงาน
นำเนื้อหาหน่วย **SHM (6 แผน)** ที่เก็บใน `lessons/physics3/SHM/` (76 ไฟล์ HTML) เข้าระบบ KP-Classroom ให้นักเรียนเข้าถึงได้ผ่าน UI พร้อมแยกดาต้าจากหน่วยคลื่นกล

---

## 🧭 การตัดสินใจสถาปัตยกรรม (ลำดับเหตุผล)

| รอบ | คำถาม | คำตอบ |
|---|---|---|
| 1 | SHM อยู่ที่ไหน? | **เป็นหน่วยใต้ physics3** (ไม่ใช่คอร์สแยก · ตรงเจตนา index.html ที่บอก "ฟิสิกส์ 3 = SHM·คลื่น·เสียง·แสง") |
| 2 | Engine ก๊อปหรือใช้ร่วม? | **ใช้ร่วม** · 1 engine (`KP-Classroom.html`) รองรับทุกหน่วย — แยกแค่ content pack |
| 3 | UI flow? | login → Hub (4 cards: SHM/คลื่น/เสียง/แสง) → คลิกหน่วย → หน้าแผน |
| 4 | Login ที่ไหน? | ครั้งเดียวที่ Hub · session ร่วมทุก unit (option 1A) |
| 5 | Waves เดิม pass through Hub ด้วย? | ใช่ (option 2A) · เพื่อ uniform UX |
| 6 | Hub theme? | Glassmorphism (option C) — เหมือนการ์ด landing |
| 7 | media.js ของ SHM? | ฉบับเต็ม (chips/meta/desc ครบ — option A) |
| 8 | โครงไฟล์ content? | waves อยู่ที่ top-level เดิม + shm ใน `units/shm/` (option B · ปลอดภัย ไม่กระทบของเดิม) |
| 9 | Roster? | ใช้ร่วมโรงเรียน (option 1) |
| 10 | ดาต้านักเรียน SHM ส่งไปไหน? | Sheet แยก (`Physics3-SHM-2569`) · routing ผ่าน `topic.dbUrl` ที่มีอยู่แล้วใน engine |
| 11 | ใบงาน SHM render ในแอป? | **Hybrid (option C)**: tools ที่ engine มี renderer (tl/upload) ใช้ engine · tools ของ SHM ที่ engine ไม่รู้จัก → iframe HTML จริง |
| 12 | Calc แผน 3-6 ใช้ Exercise? | rename `calc3..6` → `exercise3..6` |
| 13 | Journal SHM? | iframe HTML SHM (`mj1..mj6`) ไม่ใช้ engine `mj` |
| 14 | FT-01/FT-02 หลักของ SHM? | รอเมื่อมีไฟล์ |
| 15 | POE แผน 4-6? | คุณสั่งให้ Claude แทรก P+E ลงในไฟล์เดิมเลย — เสร็จ |

---

## 🔧 ไฟล์ที่ถูกแก้ (Engine)

### `KP-Classroom.html` (แก้ 11 จุด)
8. **`DB._get` per-unit routing (~บรรทัด 741-757)** — เพิ่ม `_UNIT_SCOPED_READS = {info,list,stats,planStats}` · reads กลุ่มนี้ route ไป `topic.dbUrl` ถ้า valid · กลุ่มอื่น (students/settings/courseStatus/feedback/verifyAdmin) อยู่ที่ `API_URL` เสมอ (shared roster)
9. **`syncStateFromUrl()` ใน init (~บรรทัด 894-915)** — ครูที่เปิดแท็บใหม่ที่ `?unit=shm` ตรงๆ (ไม่ผ่าน Hub) ไม่มี LS_NAV → state.topic ว่าง → DB fallback API_URL = อ่านชีทคลื่น (บัก!) · Fix: derive state.subject/topic/unit จาก URL params ก่อน routing
10. **Unit Selector dropdown ใน `renderTeacherShell` (~บรรทัด 3340-3400)** — `<select id="unitSwitcher">` ใน courseToggleBar · option value=topic.id · render เฉพาะถ้ามี >1 หัวข้อ
11. **`loadTeacherDashboard` multi-unit aggregate (~บรรทัด 3500+)** — Overview ไม่ผูก `?unit=` · loop ทุกหัวข้อ status='open' ของวิชา · ยิง backend แต่ละหัวข้อขนานกันด้วย `_fetchSheetInfo`/`_fetchSheetData` (raw fetch · ไม่ผ่าน DB._get เพราะ DB._get ผูก state.topic) · จัดกลุ่ม section header `[ไอคอน หัวข้อ] [ss_name · N เครื่องมือ] [⚙ จัดการ tabs]`
12. **`switchUnit()` dynamic load (~บรรทัด 3415-3470)** — ไม่ใช้ reload page · โหลด plans/tools/media/questions/worksheets ของหน่วยใหม่ผ่าน dynamic `<script>` tags · **mutate aliases in-place** (PLANS/PLAN_TOOLS/TOOL_DEFS/PLAN_MEDIA/FT_BANK เป็น `const` ที่ capture reference ตอน script load → ต้องเคลียร์ + re-fill array/object เพื่อให้ render functions เห็นข้อมูลใหม่) · update URL ด้วย `history.replaceState` · บันทึก `teacher_unit_pref` ใน LS
13. **`enterTeacherMode` aware ของ teacher pref (~บรรทัด 3306-3320)** — ครู refresh ที่ `?course=physics3` (ไม่มี unit) แต่ pref บันทึก SHM ไว้ → auto-redirect ไป `?course=physics3&unit=shm` · ครูไม่ต้อง re-select dropdown ทุกครั้ง

แก้เดิม 7 จุด:
1. **Loader (บรรทัด 14-34)** — รับ `?unit=` → load จาก `content/{course}/units/{unit}/*` แทน top-level
2. **`submit()` guard (บรรทัด 780-794)** — กันส่ง data ไป URL ที่ยังเป็น `'TODO_DEPLOY_*'` (no-cors mode = silent fail)
3. **`selectTopic()` (~บรรทัด 1109)** — รองรับ `topic.unit` → reload เป็น `?course=...&unit=...`
4. **Init session restore (~บรรทัด 894-921)** — เก็บ `unit` ใน `LS_NAV` + redirect ถ้า URL ↔ session ไม่ตรง (แก้บัก "ออกแล้วเข้าใหม่เด้งไปเว็บ")
5. **`renderIframeFromMedia()` ใหม่ (~บรรทัด 1768)** — เปิดไฟล์ใน iframe จาก `KP_PLAN_MEDIA[plan].folder + '/' + def.file` หรือ external URL (`^https?://`)
6. **`openTool()` dispatcher (~บรรทัด 1486)** — ตรวจ `def.file` ก่อน engine-native renderers (เพื่อให้ unit override ได้)
7. **`wsIdToSheet()` (~บรรทัด 1701)** — เพิ่ม pattern `shm-plan{N}-{tool}[-{suffix}]` → `SHM_<Tool>_P{N}` (แยก Sheet)

### `content/subjects.js`
SHM topic: `status:'open'`, `numPlans:6`, `unit:'shm'`, `dbUrl:'TODO_DEPLOY_SHM_BACKEND'`

---

## 📁 ไฟล์ใหม่ที่สร้าง

```
content/physics3/units/shm/
├── plans.js          (6 แผน)
├── tools.js          (~50 tool defs · sheet prefix SHM_*)
├── media.js          (ฉบับเต็ม · 76 ไฟล์ · chips/meta/desc ครบ)
├── questions.js      (skeleton: KP_FT_BANK ว่าง)
└── worksheets.js     (skeleton: KP_WORKSHEETS ว่าง)
```

```
lessons/astronomy/
└── SESSION_LOG_SHM_import.md  (← ไฟล์นี้)
```

---

## 📝 การแทรก P+E ในใบงาน 3 ไฟล์ (POE format)

| แผน | ไฟล์ | wsId เดิม | data-ws-id ที่เพิ่ม | P (Predict) | E (Explain) |
|---|---|---|---|---|---|
| 4 | `สื่อ03_Jigsaw_PhaseExplorer.html` | `shm-plan4-jigsaw` | (มีแล้ว) | 4 ข้อ: v/a ที่สมดุล · ปลาย · เฟส v vs y · เหตุผล + ความมั่นใจ | 4 ข้อ: เปรียบ P↔O · อธิบาย · checklist 5 ข้อ (M4.1, M4.2, M4.4) · สรุป |
| 5 | `สื่อ03_TPS_SIM05_ใบบันทึก.html` | `shm-plan5-tps` | (มีแล้ว) | 4 ข้อ: KE ที่ y=0 · y=±A · E∝A? · E คงที่? | 4 ข้อ: เปรียบ · อธิบาย · checklist 6 ข้อ (M5.1, M5.2, อนุรักษ์) · สรุป |
| 6 | `03_SIM06_Worksheet.html` | (ไม่มี) | **เพิ่ม** `shm-plan6-poe` | 4 ข้อ: f_natural เปลี่ยนเมื่อ damping? · envelope · resonance · เหตุผล | 4 ข้อ: เปรียบ · อธิบาย · checklist 5 ข้อ (M6.1, M6.3, Tacoma/Taipei) · สรุป |

P+E ใส่ห่อรอบ Observe (Jigsaw/TPS/3 ฐาน) เดิม · เนื้อหาเดิมไม่หาย

---

## 🛠 Tool Architecture (Hybrid)

### กลุ่ม A · Engine-native (ใช้ร่วมกับคลื่น · ไม่มี `def.file`)
`tl-pre`, `tl-post`, `upload`

### กลุ่ม B · Iframe ไฟล์ HTML ใน `lessons/physics3/SHM/` (มี `def.file`)
- POE: `poe1`, `poe2`, `poe3`, `poe4`, `poe5`, `poe6`
- Calc: `calc1`, `calc2` (แผน 1-2)
- Spot: `spot1`, `spot2`
- Exercise (แผน 3-6 ใช้แทน Calc): `exercise3..exercise6` + `exercise1..6` (12 ข้อ/เพิ่มเติม)
- Cognitive: `engage3..6`, `jigsaw4`, `concept3..6`, `case3`, `case4`, `cer1`, `cer2`, `tps5`, `sim6`
- Exit/Journal: `exit3..6`, `mj1..mj6`
- Four-tier Pre/Post: `f1-pre/post`..`f6-pre/post`

### กลุ่ม C · External Simulations (KP Science · `def.file` = https URL)
| Tool | Sim | URL pattern |
|---|---|---|
| `simlab1` | SHM Identifier | `Demo/mechanics/SHM/SHM01_SHM-Identifier_protected.html` |
| `simlab2` | Pendulum Timer (Lab 6.1) | `Virtual Physics Lab 01/Mechacnics/6.1 pendulum_timer.html` |
| `simlab3` | SHM Spring Builder (Lab 42) | `.../42. shm-spring-builder.html` |
| `simlab4` | SHM Phase Explorer (Lab 43) | `.../43. shm-phase-explorer.html` |
| `simlab5` | Pendulum Energy (Lab 19) | `.../19.pendulum_energy_sim.html` |
| `simlab6` | Damping & Resonance (Lab 44) | `.../44. shm-damping-resonance.html` |

---

## 🐛 Bug ที่เจอและแก้

### Bug · "ออกจากหน้าแล้วเข้าใหม่ เด้งไปเว็บ ไม่มีทางเข้า SHM"
**สาเหตุ:** `LS_NAV` เก็บแค่ `{subject, topic}` ไม่เก็บ `unit` · เปิดเว็บใหม่ที่ `?course=physics3` (ไม่มี `&unit=shm`) → loader load waves · แต่ `state.topic='shm'` ที่ restore → engine โดด `showHome()` = เห็น waves home แต่คิดว่าเป็น SHM
**Fix:** เก็บ `unit` ใน LS_NAV + เพิ่ม redirect logic ใน init: ถ้า saved subject/unit ไม่ตรง URL → redirect URL อัตโนมัติ

---

## ✅ Verify ที่ทำใน preview

1. `?course=physics3` → waves · 10 plans · ไม่ regress
2. `?course=physics3&unit=shm` → SHM · 6 plans · config inherits จาก physics3
3. Hub view (`showTopics('physics3')`) → 4 cards (SHM/คลื่น/เสียง/แสง) · LIVE+SOON ถูก
4. คลิก SHM card → `selectTopic('physics3','shm')` → URL `?course=physics3&unit=shm` ถูก
5. ใบงาน SHM iframe เปิดทุกแผน · paths URL-encoded ถูก (Thai chars · 200 OK ทั้ง 5 ตัวอย่าง)
6. Plan 4-6 POE: P/E/Original sections render ครบ
7. External sims (simlab1..6): เปิดได้ · screenshot Lab 42 Spring Builder render สวย (ปุ่ม Start, นาฬิกา, กราฟพลังงาน)
8. wsId mapping: `shm-plan{N}-{tool}` → `SHM_<Tool>_P{N}` ถูก
9. Bug session restore: เปิด `?course=physics3` หลัง login SHM → auto-redirect กลับ `&unit=shm` ถูก

---

## 🚧 รอทำต่อ (Open items)

### ก่อน production
- [ ] Deploy Apps Script + Google Sheet `Physics3-SHM-2569`
- [ ] แทน `'TODO_DEPLOY_SHM_BACKEND'` ด้วย URL จริงใน `content/subjects.js:32`

### ในอนาคต
- [ ] FT-01 / FT-02 หลักของ SHM (Pre/Post unit-wide) — รอสร้างไฟล์ · แล้วเพิ่ม `ft01_shm`, `ft02_shm` ใน tools.js
- [ ] หน่วยเสียง · แสง (ตอนนี้ `status:'coming-soon'`) — ทำได้ตาม pattern เดียวกับ SHM
- [ ] สำรวจดาต้าจริงเข้า Sheet แล้ว fine-tune `wsIdToSheet` map ถ้ามี wsId pattern แปลก
- [ ] (Optional) `KP_FT_BANK` ของ SHM ถ้าอยากให้ Four-tier render ในแอปโดยตรง (ตอนนี้ใช้ iframe ไฟล์ HTML แทน)

---

## 📚 Reference สำหรับงานต่อ

- **Engine entry**: `wave-mechanics-research/KP-Classroom.html` (loader บรรทัด 14-34)
- **Engine routing logic**: `selectTopic()`, `init` event listener, `openTool()`, `renderIframeFromMedia()`
- **Subject registry**: `wave-mechanics-research/content/subjects.js`
- **SHM content pack**: `wave-mechanics-research/content/physics3/units/shm/`
- **SHM lessons folder**: `wave-mechanics-research/lessons/physics3/SHM/แผน01..06/`
- **worksheet-core (postMessage bridge)**: `wave-mechanics-research/lessons/shared/worksheet-core.js`
- **Memory bullet ที่อัปเดตได้** (ถ้าจะบันทึก): pattern "SHM เป็น sub-unit ของ physics3 ผ่าน `?unit=shm` · iframe + `def.file` สำหรับ unit-specific worksheet"

---

## 🧪 Local preview (สำหรับครั้งหน้า)

```bash
cd wave-mechanics-research
python3 -m http.server 3000
```

หรือใช้ launch config `kp` ใน `.claude/launch.json` (autoPort)

URL ทดสอบ:
- Waves: `http://localhost:3000/KP-Classroom.html?course=physics3`
- SHM:   `http://localhost:3000/KP-Classroom.html?course=physics3&unit=shm`
- Hub (หลัง login): `showTopics('physics3')`

Fake login (สำหรับเทส UI ไม่ต้องผ่าน roster):
```js
localStorage.setItem('wave_student', JSON.stringify({student_id:'TEST',name:'Test',no:1,class:'ม.5/1',token:'x'}));
localStorage.setItem('wave_nav', JSON.stringify({subject:'physics3',topic:'shm',unit:'shm'}));
```
