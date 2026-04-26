---
name: Apps Script Drive scope authorization
description: Apps Script WebApp ที่ใช้ DriveApp.createFolder ต้อง authorize full drive scope ก่อน deploy · getRootFolder ไม่พอ
type: feedback
originSessionId: 67037282-131f-4a9d-b063-ada991a362f4
---
ถ้า Apps Script WebApp ต้องเขียน Drive (createFolder/createFile) — ต้อง trigger authorization ด้วยฟังก์ชันที่เรียก `DriveApp.createFolder` จริง ไม่ใช่แค่ `getRootFolder()`

**Why:** `getRootFolder()` ขอแค่ readonly scope; `createFolder`/`createFile` ต้อง full `https://www.googleapis.com/auth/drive`. ถ้า authorize ด้วย getRootFolder แล้ว deploy WebApp → user call → `createFolder` throw "Required permissions: .../auth/drive"

**How to apply:**
1. เขียน `authorizeDrive()` ที่ `createFolder` test → `setTrashed(true)` ลบทิ้ง
2. Run ใน editor → popup ขึ้นขอ scope เพิ่ม → Allow
3. Deploy → Manage deployments → Edit → Version: New version → Execute as: Me · Who has access: Anyone → Deploy
4. ต้องกด "New version" เสมอ · ไม่งั้น URL เดิมยังรันโค้ด/scope เก่า

**Debug pattern:** ใส่ field `_canvas_debug = "sent=N uploaded=M err=..."` ใน payload/row เพื่อดูสถานะจาก Sheet โดยไม่ต้อง read no-cors response (DB._post ใน KP-Classroom ใช้ mode: no-cors → อ่าน URL กลับมาตรงๆไม่ได้)
