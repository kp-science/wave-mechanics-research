---
description: ตรวจแผนฟิสิกส์ตาม pre-push checklist (13 bugs)
argument-hint: <waves|SHM> <N>
---
# /phys-check — Pre-push checklist

## งาน
เช็ค 13 items จาก memory `reference_plan_pipeline_checklist`:

1. No ☐ placeholder - grep `☐` ในไฟล์ HTML
2. Canvas height ≥180px - grep `height="[0-9]+"` ที่ canvas
3. No `.cell` paper-style ที่ต้องพิมพ์
4. `<script src=".../worksheet-core.js">` ครบทุกไฟล์
5. Path worksheet-core = `../../../shared/worksheet-core.js`
6. Schema content/physics3/worksheets.js มี title/viewFile/submitLabel/sheetPrefix
7. tools.js array ครบ 10 การ์ด
8. media.js มี folder/title/meta/sections/linkOut
9. CER info-card ไม่มี `file:` field
10. Theme color ตรง plan
11. Bracket balance 4 content files (python3)
12. URL encoding ภาษาไทย
13. `data-ws-id` unique

## Output
รายงาน `✓ pass / ✗ fail` แต่ละข้อ · ถ้า fail แสดง file:line

## Token budget
- grep + line-range read เท่านั้น · ไม่อ่านไฟล์เต็ม
- ≤150 คำ
