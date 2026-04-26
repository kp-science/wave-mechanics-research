---
description: Commit + push เข้า GitHub Pages
argument-hint: "<commit message>" [--files=<pattern>]
---
# /web-deploy

## งาน
1. `git status` ดูไฟล์ที่แก้
2. `git add` เฉพาะไฟล์ที่เกี่ยวข้อง (content/ + lessons/ + shared/)
   - ⚠️ ห้าม `git add -A` (อาจติด .env หรือ _private/)
3. `git commit -m "<msg>"` ภาษาไทย + Co-Authored-By
4. `git push origin main`
5. รายงาน URL GitHub Pages

## เงื่อนไขหยุด
- Push fail → ไม่ retry · ขึ้นให้ผู้ใช้เห็น stderr
- ถ้ามีไฟล์ใน _private/ จะ stage ด้วย → หยุดเตือน

## Token budget
- ≤60 คำ
