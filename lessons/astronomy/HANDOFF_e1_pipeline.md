# HANDOFF · E1 Activity Capture Pipeline

> **สถานะ:** Phase 1 (Infrastructure) เสร็จ · Phase 2 (Hooks + Pages + Dashboard + Test) รอทำต่อในแชทใหม่
> **Date:** 2026-05-05 · ครูโกเมน · COSMOS LOG วPA วิจัย

---

## 🎯 Goal สุดท้าย

เก็บคะแนน **E1 (ระหว่างเรียน) = 240 คะแนน** อัตโนมัติเข้า Google Sheet โดย:
- Mission Brief 7 + Lab Build 13 + Recall Check 10 = **30/EP × 8 EP**
- Boss แยกเป็น engagement metric (ไม่นับ E1 · รักษา construct validity)

---

## ✅ Phase 1 · เสร็จแล้ว

### 1. `lessons/astronomy/shared/activity-sync.js` (NEW)
- `ActivitySync.submit({ ep, pageId, category, rawScore, maxScore, duration?, attempts? })`
- `ActivitySync.submitBoss({ ep, accuracy, timeSpent, retries, endingPath })`
- `ActivitySync.getLocalSummary()` → `{ byEP, e1Total, e1Max:240 }`
- localStorage queue + retry on `window.load` (เลียน ep-sync.js)
- LOCAL_K = `wave_activity_astronomy_local` · Q_KEY = `wave_activity_astronomy_queue`

### 2. `lessons/astronomy/shared/activity-registry.js` (NEW)
- `ActivityRegistry.categoryOf(ep, pageId)` → 'MISSION'|'LAB'|'RECALL'|'BOSS'|null
- `ActivityRegistry.detectCurrent()` → `{ ep, pageId, category }` (auto จาก URL)
- ครบ 8 EP · 70+ pages mapped
- **2 หน้าใหม่ที่ระบบรู้แต่ยังไม่มีไฟล์:** `ep04/p19b-recall.html`, `ep08/p22b-recall.html`

### 3. Apps Script `_private/Astronomy_AppsScript_Code.gs` (UPDATED)
- doPost dispatcher (L34-58): เพิ่ม `submitActivity` + `submitBoss`
- `handleSubmitActivity()` (L1605~) → `Activity_Raw` + `Activity_Summary` (best-score per page)
- `handleSubmitBoss()` → `Boss_Engagement`
- `_computeEpScore_()` helper · weighted MISSION/LAB/RECALL = 7/13/10
- `testActivity()` + `testBoss()` test functions
- ⚠️ **ต้อง redeploy Apps Script** (Manage deployments → New version) ก่อน hook ใช้ได้

### Sheet schema ใหม่ (Apps Script จะสร้างเองครั้งแรกที่มี submission)

```
Activity_Raw       (event log · 15 cols)
  timestamp · course · ep · pageId · category
  student_id · name · no · class
  rawScore · maxScore · percent · duration · attempts · ua

Activity_Summary   (per student × EP · 15 cols)
  student_id · name · no · class
  EP01 · EP02 · ... · EP08
  E1_total (240) · E1_percent · last_update

Boss_Engagement    (event log · 12 cols · NOT in E1)
  timestamp · course · ep
  student_id · name · no · class
  accuracy · timeSpent · retries · endingPath · ua
```

---

## ⏳ Phase 2 · รอทำในแชทใหม่

### Task 4 · Hook G1 (EP01-02 · Book.js)
**ไฟล์:** `lessons/astronomy/shared/book.js` L290 `completePage(pageId, opts)`

ตำแหน่งแทรก: **หลัง `this.state.gates[pageId] = true; this.save();`**

```js
// ⭐ E1 capture: auto-submit if registered
try {
  if (window.ActivitySync && window.ActivityRegistry) {
    const ep = ActivityRegistry.detectEp();
    const cat = ActivityRegistry.categoryOf(ep, pageId);
    if (cat === 'MISSION' || cat === 'LAB' || cat === 'RECALL') {
      const score = Number(opts?.score);
      const max   = Number(opts?.max);
      if (Number.isFinite(score) && Number.isFinite(max) && max > 0) {
        ActivitySync.submit({ ep, pageId, category: cat, rawScore: score, maxScore: max });
      } else {
        // page ไม่ผ่าน score/max มา → ใช้ "ผ่านด่าน = เต็ม" (default for completion-only pages)
        ActivitySync.submit({ ep, pageId, category: cat, rawScore: 1, maxScore: 1 });
      }
    } else if (cat === 'BOSS') {
      // ปล่อย boss page เรียก ActivitySync.submitBoss() เอง (ต้องมี accuracy/time)
    }
  }
} catch(_){}
```

จากนั้น **เพิ่ม `<script src="../shared/activity-sync.js"></script>` + `<script src="../shared/activity-registry.js"></script>` ในทุกหน้า EP01-02 ที่อยู่ใน registry** — หรือ **ดีกว่า: เพิ่มใน book.css/book.js entry point เพื่อให้โหลดทุกหน้า**

### Task 5 · Hook G2 (EP03-06 · sync-client.js)
**ไฟล์:** `lessons/astronomy/shared/sync-client.js`
- หาจุดที่ submission เสร็จ (เลียนแบบ Task 4)
- pages G2 บางหน้าใช้ `placed` object scoring · ต้องเรียก submit หลัง `compare()` หรือ `validate()`

### Task 6 · Hook G3 (EP07-08 · KPA)
**ไฟล์:** `lessons/astronomy/shared/kpa-tracker.js` หรือ `kpa-tracker-v2.js`
- Hook ที่ `KPA.vpa()` หรือ `KPA.complete()` (ตรวจ source ก่อน)
- EP07/08 ใช้ Boot07/Boot08 init pattern · อาจ hook ที่ Boot.complete() แทน

### Task 7 · สร้างหน้า Recall ใหม่ 2 หน้า

**`ep04/p19b-recall.html`** · 2 MCQ:
- Q1: ดาวสีแดงดวงหนึ่งอุณหภูมิ ~3,500 K · ต่อมาเห็นดาวอีกดวงสีน้ำเงิน · ดาวไหนร้อนกว่า + เพราะอะไร
- Q2: ดาวมวล 25 M☉ vs ดวงอาทิตย์ · อายุของดวงไหนสั้นกว่า + เพราะอะไร
- ลงทะเบียน register ใน registry ✅ แล้ว
- ต้อง register ใน `content/astronomy/media.js` (ใส่ EP04 page list)

**`ep08/p22b-recall.html`** · 2 MCQ:
- Q1: เรียงเหตุการณ์: inflation → nucleosynthesis → first stars → galaxies (ลำดับใด)
- Q2: กฎฮับเบิล v = H₀d บอกอะไรเกี่ยวกับเอกภพ
- ต้อง register ใน media.js (EP08 page list)

Template: ใช้ p01-pretest.html ของ EP08 เป็นแม่แบบ (มี radio + ActivitySync.submit ตอน submit)

### Task 8 · Dashboard E1 Card
**ไฟล์:** `KP-Classroom.html` L3749+ `renderSheetSummary()`
- เพิ่ม case `'Activity_Summary'` → render card สรุป E1
- แสดง: average E1 ของห้อง · histogram กระจาย · ตารางต่อคน · ปุ่ม export CSV
- เพิ่ม case `'Boss_Engagement'` → secondary card

### Task 9 · Smoke Test
1. `python3 -m http.server 3000` ใน wave-mechanics-research/
2. Login → astronomy → EP01 → เล่น p02-team + p04-debris
3. ตรวจ Network tab → POST submitActivity ติด
4. ตรวจ Sheet `Activity_Raw` มีแถวใหม่
5. ตรวจ Sheet `Activity_Summary` มี EP01 = X คะแนน
6. กลับไป Dashboard → ดูค่า E1

---

## 🔧 Decisions ที่ลงล็อกแล้ว (ห้ามเปลี่ยนโดยไม่ได้คุย)

1. ✅ **Boss ไม่นับ E1** (Hybrid A) · เก็บแยกเป็น engagement metric
2. ✅ **Lab Build 13 คะแนน:** ใช้ตัวเลือก X = เฉลี่ย % ทุกหน้าใน category × 13 (handler ทำให้แล้ว)
3. ✅ **Recall Check 2 หน้าใหม่ใน EP04, EP08** (EP02/03/05/06/07 มี gate/quiz อยู่แล้ว)
4. ✅ **Best-score per page** (ลองหลายครั้งใช้ครั้งดีสุด)

---

## 📂 ไฟล์อ้างอิง

- Memory: `~/.claude/projects/-Users-komanepapato-Documents------/memory/project_e1_pipeline_design.md`
- Folder วิจัย: `lessons/astronomy/วิจัย-วPA/` (มี README.md เป็น index)
- Page mapping (ละเอียด 70+ หน้า): ดูใน `activity-registry.js` ไฟล์เดียว

---

## 🚦 จุดเริ่มแชทใหม่

ใช้ prompt นี้เปิดแชทใหม่:

```
เจน มาทำต่อ Phase 2 ของ E1 pipeline ค่ะ
อ่าน lessons/astronomy/HANDOFF_e1_pipeline.md ก่อน
แล้วเริ่มจาก Task 4 (Hook G1 ใน book.js)
```

เจนจะอ่าน handoff + memory แล้วเริ่มต่อจาก Task 4 ได้ทันที 🚀
