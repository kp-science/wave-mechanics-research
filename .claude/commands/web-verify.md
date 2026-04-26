---
description: Verify แผน/หน้าก่อน deploy
argument-hint: <subject> <N> | astro <ep>
---
# /web-verify

## งาน
1. Bracket balance ทั้ง 4 content files (physics) / 1-2 files (astro)
2. ไฟล์ HTML ที่อ้างใน schema มีจริง
3. `data-ws-id` ไม่ซ้ำกับแผนอื่น
4. URL encoding ภาษาไทยถูก (`curl -sI` ทดสอบ 1 URL)

## Output
`✓ pass N/N` หรือ `✗ fail: <รายละเอียด>`

## Token budget
- ไม่อ่านเนื้อหาไฟล์ · ใช้ grep/stat/python3 bracket count
- ≤80 คำ
