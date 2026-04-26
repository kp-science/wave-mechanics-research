---
name: COSMOS LOG design principles
description: หลักออกแบบ COSMOS LOG · Book-page flow · Experience Before Labeling · ไม่มี info dump · Story→Puzzle สลับ
type: feedback
originSessionId: fb888f8f-8de0-44ee-b46d-d4aac2fa3d42
---
โครง "COSMOS LOG" สื่อการสอนดาราศาสตร์ของผู้ใช้ใช้หลักการเฉพาะ · ห้ามหลุดเวลาออกแบบ EP02-EP08 ต่อ

**1. Book-page flow** · 1 กิจกรรม = 1 ไฟล์ HTML · สลับ STORY หน้า (ดู/ฟัง กดต่อไป) กับ PUZZLE หน้า (ต้องแก้ถึงจะผ่าน) · **output ของ puzzle = input ของ story ถัดไป · ไม่มีหน้าลอย**
**Why:** ผู้ใช้ย้ำหลายครั้งว่า "ไม่ใช่การสอนแบบทั่วไป · เหมือนดูหนังที่คนดูช่วยแก้ปมไปทีละปม"

**2. Experience Before Labeling** · ทดลอง/สังเกตก่อน → ใส่ชื่อวิทยาศาสตร์ทีหลัง (โดยครูใน "Dr.Hubble Reveal" เท่านั้น) · **ห้ามใส่ศัพท์วิชาการก่อน Reveal**
**How to apply:** ใน PUZZLE ก่อน labeling · ใช้ภาษาสังเกตพื้น ๆ (สีแดง · อุณหภูมิ · ทิศทาง) ไม่ใช่ศัพท์ (redshift · CMB · isotropy)

**3. ทุกกิจกรรมมีโครง Before → Activity → After** · Before = ฉาก cinematic บอกปัญหา/stake · Activity = ทำจริง · After = พิสูจน์เข้าใจผ่าน gate ที่โยงเนื้อเรื่อง (เช่น Ship Lock ไฟเขียว/แดง · Decrypt 7 ช่อง)

**4. ห้าม Info Dump** · ทุกข้อมูลต้องให้นักเรียนหาเอง (search/decode/observe/compute) · ถ้ามี text ยาว ๆ ต้องมี puzzle/fill-blank ตามมา เพื่อบังคับโฟกัส
**Why:** ผู้ใช้ feedback ว่า "info-card ที่โผล่มาให้อ่าน = ดูผ่าน ๆ แล้วจบไป"

**5. Teacher Cue ทุกหน้า** · collapsible panel · บอก timing · what to say · what NOT to teach · สคริปต์ครูโดยเฉพาะจุดสอนเต็ม (ตัวอย่าง: P10 บิกแบง 5 นาที)
**Why:** ครูต้องรู้ว่าแทรกตรงไหน · "จะสอนทฤษฎีบิกแบงตรงไหน?" เป็นคำถามหลัก

**6. Branching Convergent Narrative** · ทีมเลือกผิด = ไปเส้นทางอื่น (ไม่ fail) · ทุกเส้นบรรจบในเนื้อเรื่องหลัก · Journey Map = save file ข้าม EP

**7. Research Data Capture** · ทุก puzzle เก็บ answer + correct + timestamp ใน localStorage · Export JSON ได้ใน Journey Map · ใช้วัด conceptual change + Bloom profile + affective

**8. ภาษาไทยเรียบง่าย** · หลีกเลี่ยงศัพท์วิชาการเทคนิค (refactor · component) · ผู้ใช้ขอ "ภาษาง่าย ๆ" หลายครั้ง
