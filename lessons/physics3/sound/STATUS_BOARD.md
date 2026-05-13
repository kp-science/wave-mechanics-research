# 📋 Sound Unit · Status Board

**หน่วยเสียง · ฟิสิกส์ 3 · ว32203 · ม.5 · ครูโกเมน ปาปะโถ · โรงเรียนสตรีวิทยา**

**อัพเดตล่าสุด:** 2026-05-14 · **สถานะ:** ✅ Production-Ready

---

## 🎯 ภาพรวมระบบ

```
┌─────────────────────────────────────────────────────────────────┐
│  Student/Teacher Browser                                        │
│     ↓                                                           │
│  KP-Classroom.html ?course=physics3&unit=sound                  │
│     ↓ (loads content pack)                                      │
│  content/physics3/units/sound/{plans,tools,media,...}.js        │
│     ↓ (renders UI)                                              │
│  iframe → lessons/physics3/sound/แผนNN_xxx/สื่อ.html             │
│     ↓ (student submits)                                         │
│  worksheet-core.js → postMessage WS_SUBMIT                      │
│     ↓                                                           │
│  Engine: wsIdToSheet('sound-plan{N}-{tool}') → 'Sound_X_PN'    │
│     ↓ POST                                                      │
│  KP-Sound-Backend Apps Script (dedicated URL)                   │
│     ↓                                                           │
│  Google Sheet: Physics3-Sound-2569                              │
│     ↓ (Teacher reads)                                           │
│  Teacher Dashboard ที่ ?unit=sound                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✅ Completed Tasks (2026-05-13 → 2026-05-14)

### Phase 0 · Foundation (2026-05-13)
- [x] เขียน 11 แผนการสอนแบบ Markdown
- [x] สร้าง Infographic HTML 11 แผน
- [x] สร้างสื่อ HTML 165 ไฟล์ (15 ต่อแผน × 11)
- [x] รวมไฟล์ Sim Specs document

### Phase 1 · KP-Classroom Integration (2026-05-13 night)
- [x] สร้าง content pack: `content/physics3/units/sound/{plans,tools,media,questions,worksheets}.js`
- [x] ลงทะเบียน 165 ไฟล์ใน `media.js`
- [x] กำหนด 121 tool defs ใน `tools.js`
- [x] เปิด status:'open' + numPlans:11 ใน `subjects.js`

### Phase 2 · Backend Deploy (2026-05-13 night)
- [x] สร้าง Google Sheet `Physics3-Sound-2569`
- [x] สร้าง Apps Script `KP-Sound-Backend` + paste code
- [x] ตั้ง Script Properties: TEACHER_PASSWORD + COLLECT_auto_sound + UNIT_NAME
- [x] Deploy เป็น Web App (Anyone access) + Authorize Drive scope
- [x] รับ URL → แทน TODO marker ใน subjects.js
- [x] รัน testAll() ใน Apps Script · ผ่านทุก test

### Phase 3 · Engine Patches (2026-05-13 → 2026-05-14)
- [x] Fix `KP_FT_BANK` (was `KP_FT_BANK_SOUND` → ReferenceError ทำให้ popup ครูไม่เด้ง)
- [x] เพิ่ม `wsIdToSheet` pattern สำหรับ Sound (sound-plan{N}-{tool})
- [x] เปลี่ยน `enterTeacherMode()` ให้ครูเห็น view-topics เหมือนนักเรียน

### Phase A · Wire Data Flow (2026-05-14)
- [x] เพิ่ม `data-ws-id="sound-plan{N}-{tool}"` ใน body ของ 121 ไฟล์
- [x] เพิ่ม `<script src="../../../shared/worksheet-core.js">` ในทุกไฟล์
- [x] Verify mapping: 10 wsIds → ถูก sheet name หมด

### Phase B · Research Instruments (2026-05-14)
- [x] สร้าง `research/consent.html` (R0 · ก่อนเริ่ม Plan 1)
- [x] สร้าง `research/imi-21.html` (R1 · post-only หลัง Plan 11)
- [x] สร้าง `research/satisfaction-20.html` (R2 · หลังจบหน่วย)
- [x] ปรับ payload structure → `action:'submit'` + `sheet:'Sound_X'` (สำหรับ Sound's generic Apps Script)
- [x] ลงทะเบียนใน media.js: Plan 1 (R0) + Plan 11 (R1, R2)

### Phase C · Waves Enhancement (2026-05-13/14)
- [x] เพิ่ม 30 ไฟล์ใหม่ของคลื่น (Engage + Calc + Exercise × 10 แผน)
- [x] ลงทะเบียนใน waves media.js

### Phase D · Documentation
- [x] `_private/SETUP_Sound_Backend.md` (180 บรรทัด · setup guide)
- [x] Update `.gitignore` (exclude PDFs, raw videos, node_modules, memory files)
- [x] Memory file: `project_sound_unit_integration.md`

---

## 📊 ข้อมูลที่เก็บได้ (สำหรับงานวิจัย วPA เชี่ยวชาญ)

### Quantitative Data
| รหัส | เครื่องมือ | Sheet | สถิติที่คำนวณ |
|------|----------|-------|------------|
| R0 | Consent | `Sound_Consent_Log` | จริยธรรมวิจัย |
| F1-F11 | Pre/Post Four-tier × 11 plans | `Sound_F_Fourtier_P{N}` | **Hake gain ⟨g⟩**, **Misconception %**, Sound %, Two-tier confidence |
| POE | POE Rubric (0-3) × 11 | `Sound_POE_P{N}` | mean POE score, SD |
| TL | Traffic Light Pre/Post × 11 | `Sound_TL_P{N}` | บัตรเขียว %, change |
| Exit | Exit Ticket × 11 | `Sound_Exit_P{N}` | Formative score |
| Calc | Math Builder × 11 | `Sound_Calc_P{N}` | Achievement (math) |
| Exercise | 12 ข้อ × 11 | `Sound_Exercise_P{N}` | Achievement (overall) |
| R1 | IMI 21 (post-only) | `Sound_IMI_Responses` | Mean per subscale (Autonomy/Competence/Relatedness) · ≥3.51 |
| R2 | Satisfaction 20 | `Sound_Satisfaction` | Mean per dimension (Content/Activity/Media/Assessment) |

### Qualitative Data
| รหัส | เครื่องมือ | Sheet | วิเคราะห์ |
|------|---------|-------|---------|
| MJ | Journal 3-2-1 × 11 | `Sound_MJ_P{N}` | Content analysis (themes) |
| CC | Concept Cartoon × 11 | `Sound_CC_P{N}` | Initial response themes |
| Engage | Prior K + Engage × 11 | `Sound_Engage_P{N}` | Baseline understanding |

### Process Data
| รหัส | เครื่องมือ | Sheet | บันทึก |
|------|---------|-------|-------|
| Matrix | Matrix Table × 11 | `Sound_Matrix_P{N}` | Conceptual organization |
| Spot | Spot the Error × 11 | `Sound_Spot_P{N}` | Error identification |
| OB | OB-01 (ครูใช้) | `Sound_OB_P{N}` | Behavior observation |
| Rubric | POE Rubric (ครูใช้) | `Sound_Rubric_P{N}` | Teacher scoring |

---

## 🚧 Known Issues / TODO

### High Priority
- [ ] **Test ส่งข้อมูลจริง** end-to-end (login → submit → check Sheet)
- [ ] Tests A/B/C ที่ระบุใน SETUP_Sound_Backend.md

### Medium Priority
- [ ] **Login ช้า ~3-7 วินาที** (Apps Script cold start) → ต้องการ:
  - Warm-up call ตอน page load
  - Loading indicator ที่ชัดเจน
  - หรือ scheduled trigger keep-alive ทุก 5 นาที
- [ ] GitHub Pages cache-control max-age=600 · ครูต้อง hard reload

### Low Priority
- [ ] FT-01/FT-02 Unit-wide (รวม 20 ข้อ Pre/Post) — ยังไม่สร้าง · ใช้ engine renderer ได้
- [ ] เติม content ใน `KP_FT_BANK[]` ของ Sound (ตอนนี้ skeleton ว่าง)
- [ ] Dashboard cards ใน KP-Classroom สำหรับ IMI/Satisfaction (เหมือน Astronomy)

---

## 🔗 Key URLs

| ปลายทาง | URL |
|--------|-----|
| Production (GitHub Pages) | https://kp-science.github.io/wave-mechanics-research/KP-Classroom.html?course=physics3&unit=sound |
| Sound Apps Script Web App | https://script.google.com/macros/s/AKfycbw22POLPv8fOSH2JTgkW1B0HbohsiMkNrVpxDYr3nokG5TL5a8vnV6_QmST27myEjYa/exec |
| Google Sheet | Physics3-Sound-2569 (drive.google.com) |
| GitHub repo | https://github.com/kp-science/wave-mechanics-research |
| Setup guide | `_private/SETUP_Sound_Backend.md` |
| Memory state | `~/.claude/.../memory/project_sound_unit_integration.md` |

---

## 📈 Git History (Sound-related commits)

| Commit | Description |
|--------|------|
| `1e32b9b` | feat(sound): import Sound unit (11 plans · 165 media files) |
| `7ad2975` | chore(portal): update physics3 card to advertise 3 open units |
| `301ede3` | docs(sound): mark dbUrl as TODO until dedicated backend deployed |
| `50b8500` | feat(sound): wire dedicated backend URL · Sheet Physics3-Sound-2569 |
| `6618c92` | fix(sound): export KP_FT_BANK (not KP_FT_BANK_SOUND) to match engine |
| `0e452a5` | feat(teacher): show view-topics on login when no ?unit= specified |
| `fe5fa24` | feat(waves): register Engage/Calc/Exercise media into all 10 plans |
| `ad619a8` | feat(sound): wire all 121 HTML files for data submission to Sheet |
| `c5cf63d` | feat(sound): Phase B · research instruments (consent + IMI + satisfaction) |

---

## 🎉 Achievement

**Sound เป็นหน่วยที่ 4 ของระบบ KP-Classroom** ที่ครบเครื่องที่สุด:

| Component | คลื่น | SHM | Astronomy | **Sound** |
|-----------|------|-----|----------|----------|
| Plans | 10 | 6 | 8 EP | **11** ⭐ |
| Backend แยก | ❌ | ✅ | ✅ | ✅ |
| Engine pattern | (default) | shm-plan{N} | astronomy | **sound-plan{N}** |
| Pre/Post Four-tier | บางแผน | บางแผน | ทุก EP | **ทุก 11 แผน** ⭐ |
| Research (consent/IMI/sat) | ❌ | ❌ | ✅ | **✅** |
| Engage variety | ❌ | บางแผน | ❌ | **11 types ไม่ซ้ำ** ⭐ |

---

*ครูโกเมน ปาปะโถ · พฤษภาคม 2569 · ผู้ช่วยเจน*
