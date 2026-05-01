---
name: Astronomy KP-Classroom integration
description: Astronomy course wired into KP-Classroom · 8 EPs · standardized files · pre/post 5 ข้อ 1:1
type: project
originSessionId: 14031616-399b-465a-b8a7-a6e334285206
---
# Astronomy in KP-Classroom (refactored 2026-05-01)

วิชา **ดาราศาสตร์ (ว 30105 วิทยาศาสตร์พื้นฐาน 5 · โลกและอวกาศ)** เปิดให้ใช้แล้วใน `KP-Classroom.html?course=astronomy`

**Why:** ครูโกเมนต้องการเปิดสอนวิชาที่ 2 (เพิ่มจาก physics3) · เด็กเข้าผ่าน portal `index.html` แล้วเลือกการ์ดดาราศาสตร์
**How to apply:** เมื่อแก้ไฟล์ใน `lessons/astronomy/` หรือ `content/astronomy/` ต้องระวัง:
- ทุก EP มี `p01-pretest.html` (รวมถึง EP01-03 ที่เดิมใช้ `p01-entry.html` · ตอนนี้ entry redirect ไป pretest)
- Journal มาตรฐาน = `p27-journal.html` ทุก EP (เก่า: p17-exit/p18-log/p19b-journal/p26-journal · มี redirect compat)
- Pre/Post = 5 ข้อ ตรง 1:1 (matched-pair)
- Posttest แยกไฟล์: EP04 `p21-posttest`, EP05 `p22-posttest`, EP06-08 `p26b-posttest.html` (anchor → p27#postBtn)

## Subject Isolation
LocalStorage scope per-course:
- `wave_submitted_<course>` (progress)
- `wave_settings_<course>` (gates)
- `wave_student` + `wave_nav` shared (student session)

Migration v2 ใน KP-Classroom.html ลบ key เก่าโดยอัตโนมัติครั้งเดียว · marker `wave_migrated_v2`.

## Sync Generations
- EP01-EP02 (G1/G1.5): book.js → localStorage only · **ยังไม่ sync Apps Script**
- EP03-EP06 (G2): sync-client + Firebase ✅
- EP07-EP08 (G3): KPA.research → localStorage only · **ยังไม่ sync Apps Script**

ถ้าจะ aggregate ทุก EP → ต้องเพิ่ม telemetry hook ใน Book.savePageData + KPA.research → POST ไป astronomy apiUrl

## Teacher Print Report
Tab "📊 สรุปคะแนน" → ปุ่ม "🖨 พิมพ์รายงาน PDF" → เปิดหน้าใหม่ที่พิมพ์/Save as PDF ได้
