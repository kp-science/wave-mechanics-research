---
name: Telemetry sync EP01/02/07/08 done
description: shared/telemetry-sync.js auto-wraps Book.savePageData + KPA.research/etc · POST → Apps Script generic submit · sheets EP{n}_Pages/Research/MC/Calibration/Problems/PrePost · 2026-05-06
type: project
originSessionId: d4f576e6-3c85-4b5b-b7f3-26cafe9acee7
---
P1 #2 telemetry sync เสร็จแล้ว 2026-05-06:

**File ใหม่:** `lessons/astronomy/shared/telemetry-sync.js`
- queue + retry POST (pattern จาก activity-sync.js)
- Auto-wraps `Book.savePageData(pageId, data)` → sheet `EP{n}_Pages`
- Auto-wraps `KPA.research / setPrePost / misconception / calibrate / problem` → `EP{n}_Research/PrePost/MC/Calibration/Problems`
- Idempotent · 3 retry intervals (100/300/1000ms) · auto-flush queue 1.5s after load

**Apps Script:** ไม่ต้องแก้ — `handleSubmit()` auto-create sheet ตามชื่อ

**Inject:** 103 HTML pages ใน ep01/02/07/08 (78 + 25 รอบ 2 หลัง fix regex รับ `?v=N`)
- Skipped 12 ไฟล์: index launcher, redirect stub (p18-log, p26b-posttest), p22b-recall ที่ใช้ activity-sync อยู่แล้ว, ep01 entry/exit pages

**Sheet ที่จะสร้างขึ้นใหม่อัตโนมัติเมื่อนักเรียนเริ่มเล่น:**
- EP1_Pages, EP2_Pages (Book.savePageData)
- EP7_Research, EP7_MC, EP7_Calibration, EP7_Problems (KPA module)
- EP8_Research, EP8_MC, EP8_Calibration, EP8_Problems

**How to verify:** เปิด console ใน devtools · ทำงานในหน้า EP02 · ดู Network tab ว่ามี POST ไป `script.google.com/.../exec` พร้อม body action=submit, sheet=EP2_Pages
