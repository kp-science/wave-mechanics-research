---
description: แก้ index.html ส่วนที่ระบุ (ไม่อ่านทั้งไฟล์)
argument-hint: <section-name> | --line=<start>-<end>
---
# /web-edit-index

## งาน
แก้ `index.html` โดยเปิดเฉพาะ range ที่ระบุ:
- ถ้าให้ section name → grep หา comment marker
- ถ้าให้ line range → Read offset+limit ตรงช่วงนั้น

## Token budget
- ห้าม Read ทั้งไฟล์
- ≤40 คำรายงาน diff
