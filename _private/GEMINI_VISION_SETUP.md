# Gemini Vision Auto-Grade Canvas · คู่มือติดตั้ง

**เป้าหมาย:** ส่งภาพ Canvas (นักเรียนวาด) จาก Drive → Gemini Vision → คะแนน rubric 0-3 + confidence → Sheet

---

## 1. เตรียม API key

1. ไป https://aistudio.google.com/apikey → Create API key (ผูกกับ Google account เดียวกับ project)
2. ใน Apps Script editor ของ Spreadsheet:
   - `Project Settings` (⚙️) → `Script properties` → Add:
     - Property: `GEMINI_API_KEY`
     - Value: `AIza...` (paste จาก AI Studio)
3. **อย่า** hard-code key ในโค้ด · อ่านผ่าน `PropertiesService.getScriptProperties()`

### Quota (Free tier · gemini-2.0-flash)
- 15 RPM · 1,500 req/วัน · **พอสำหรับ 40 นักเรียน × 3-4 canvas ต่อวัน**
- ถ้าชน limit → ขอ Paid tier หรือ switch เป็น Claude API (ดูหมายเหตุท้ายไฟล์)

---

## 2. ติดตั้งโค้ด

1. เปิด Apps Script ของ Spreadsheet `วิจัยคลื่นกล_Database_2569`
2. Append ส่วนท้าย `ScoringScript.gs` ที่อยู่ใน `_private/ScoringScript.gs` (block "GEMINI VISION" ลงไป)
3. **Save** → **Deploy → Manage deployments → New version** (สำคัญ · custom function จะไม่ update ถ้าไม่ push version ใหม่)
4. Reload Sheet → เมนู `🎯 Auto-score` จะมี `👁️ Score Canvas (Gemini)`

### OAuth scope ที่ต้อง authorize
- `https://www.googleapis.com/auth/script.external_request` (UrlFetchApp → Gemini API)
- `https://www.googleapis.com/auth/drive.readonly` (อ่านภาพ Canvas จาก Drive)

กดอนุญาตครั้งแรกตอนรัน `scoreAllCanvas()` ผ่านเมนู

---

## 3. โครงสร้าง Sheet

### Input · sheet `Spot_P{n}` (หรือ sheet อื่นที่มี canvas URL)
คอลัมน์ที่ต้องมี:
```
timestamp | s_name | s_num | s_room | ... | q{n}_canvas_url | ...
```
URL ได้จาก Canvas→Drive handler (งานก่อนหน้า · handleCanvasUpload)

### Key · sheet `KEY_Canvas_P{n}`
สร้างด้วย `initCanvasKeySheet()` (ในเมนู Auto-score)
```
q | canvas_type | expected | rubric_notes
1 | arrow       | ลูกศรชี้ขึ้น ขนาดเท่ากัน 3 อัน | ทิศ=แนวตั้ง · ห้ามเฉียง
2 | graph_yt    | sine · 2 คาบ · amplitude คงที่ | แกน x=t · y=การกระจัด
3 | wavefront   | หน้าคลื่นขนานเส้นตรง · ทิศตั้งฉาก | spacing สม่ำเสมอ
```

### Output · sheet `Spot_P{n}_Canvas_Scored`
```
timestamp | s_name | s_num | q1_score | q1_conf | q1_note | q2_score | ... | needs_review
```
`needs_review = TRUE` ถ้ามีข้อใดมี `conf < 0.8`

---

## 4. วิธีใช้

### แบบสูตรใน cell (ทีละภาพ · debug)
```
=GEMINI_VISION_SCORE(F2, "ลูกศรชี้ขึ้น 3 อัน ขนาดเท่ากัน", "arrow")
```
คืน string `"score|conf|note"` · ใช้ `SPLIT(..., "|")` แยก 3 คอลัมน์

### แบบ batch (แนะนำ · เร็ว + cache)
เมนู `🎯 Auto-score → 👁️ Score Canvas (Gemini)`
- ประมวลผลทีละ 10 ภาพ · พัก 4s ระหว่าง batch (กัน rate limit)
- Cache ผลใน `CacheService` 6 ชม. (เรียกซ้ำ URL เดิม = ไม่เสีย quota)
- หยุดกลางคันปลอดภัย · กดอีกครั้งจะต่อจากแถวที่ยังว่าง

### ปลดล็อก re-score
ถ้าต้องการให้ประเมินใหม่ · ลบค่าใน `q{n}_score` column แล้วรันใหม่

---

## 5. Rubric · ให้โมเดลใช้

Prompt fix ไว้ใน `buildCanvasPrompt_()` (ScoringScript.gs):

| Score | เกณฑ์ |
|-------|-------|
| **0** | ไม่วาด · วาดไม่เกี่ยวข้อง · เส้นสะเปะสะปะ |
| **1** | วาดแต่มโนทัศน์ผิด (เช่น ทิศกลับด้าน · กราฟผิดรูป) |
| **2** | ถูกบางส่วน (เช่น ทิศถูก แต่จำนวน/ขนาด/spacing ผิด) |
| **3** | ถูกครบตาม expected · อาจมี minor artifacts ได้ |

**Confidence:** โมเดลต้องรายงาน 0.0-1.0 · ถ้า image ไม่ชัดหรือ ambiguous → ต่ำ · ครู review เอง

---

## 6. หมายเหตุ/ข้อควรระวัง

- **Drive permission:** ไฟล์ Canvas ต้องอยู่ใน folder `Canvases_วิจัยคลื่นกล/` ที่ Apps Script owner มีสิทธิ์อ่าน (เจ้าของเดียวกัน = ok อัตโนมัติ)
- **Base64 vs URL:** Gemini API รับ `inlineData.data` (base64) ได้ถึง ~20MB/ภาพ · เราแปลง Drive file → base64 ใน `fetchDriveImageBase64_()` เลย (ไม่ต้องทำ public link)
- **Cache key:** `fileId + expected + canvasType` (hash) · เปลี่ยน expected = cache miss = rescore
- **Timeout:** Apps Script trigger limit 6 นาที · batch 10 ภาพ × ~3s = ~30s ต่อรอบ · ปลอดภัย
- **ไม่ auto-trigger:** ไม่ตั้ง time-based trigger ตอนนี้ · ครูกดเมนูเอง (กัน quota หลุด)

### ถ้าจะเปลี่ยนเป็น Claude API
- Endpoint: `https://api.anthropic.com/v1/messages`
- Header: `x-api-key`, `anthropic-version: 2023-06-01`
- Body: `{model:"claude-haiku-4-5-20251001", messages:[{role:"user", content:[{type:"image",source:{type:"base64",media_type:"image/png",data:base64}},{type:"text",text:prompt}]}]}`
- Paid ทันที · stable · ไม่มี free quota · cost ~ $0.25/1M input token
- สวิตช์โดยเปลี่ยน `callVisionAPI_()` ตัวเดียว

---

## 7. Pilot test ก่อน rollout

1. สร้าง `KEY_Canvas_P1` กรอก 2-3 ข้อ
2. สร้าง test row ใน `Spot_P1` ใส่ URL canvas ที่ครูวาดตัวอย่างเอง (ทั้ง score 0, 2, 3)
3. รันเมนู → ตรวจว่าคะแนนตรงตาม ground truth
4. ถ้า drift → ปรับ `expected` ให้ละเอียดขึ้น หรือ เพิ่ม negative example ใน prompt
