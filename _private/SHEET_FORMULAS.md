# 🎯 Auto-score Formulas · วิจัยคลื่นกล

คู่มือติดตั้ง + สูตรทั้งหมดสำหรับ Sheet `วิจัยคลื่นกล_Database_2569`

---

## 📋 สรุป 3 กลุ่มงาน

| กลุ่ม | เป้า | Sheet ต้นทาง | Sheet ผลลัพธ์ | วิธี |
|---|---|---|---|---|
| **A. FT-01/FT-02** | Sound/MC/Guessing/No-K per ข้อ | `FT01`, `FT02` | `FT01_Scored`, `FT02_Scored` | Apps Script (P1) |
| **B. Calc** | Numeric ±5% + Unit | `Calc_P2`..`Calc_P9` | `Calc_P{n}_Scored` | Apps Script (P2) |
| **C. Spot** | Keyword match | `Spot_P1`..`Spot_P9` | `Spot_P{n}_Scored` | Apps Script (P3) |

---

## 🚀 ติดตั้ง (ครั้งเดียว · 5 นาที)

1. เปิด Spreadsheet → **Extensions → Apps Script**
2. สร้างไฟล์ใหม่ `Scoring.gs` (ปุ่ม `+` ข้าง Files)
3. Copy ทั้งหมดจาก `_private/ScoringScript.gs` วางลงไป → 💾 Save
4. กลับไป Sheet → **Refresh (F5)** หนึ่งครั้ง → เมนู **🎯 Auto-score** จะโผล่ข้างบน
5. คลิก **🎯 Auto-score → 🔧 สร้าง Key sheets (ครั้งแรก)**
   - ระบบสร้าง `KEY_FT` (กรอกเฉลยแล้ว 20 ข้อ) + `KEY_Calc_P{2..9}` + `KEY_Spot_P{1..9}` (template ว่าง)

> ⚠️ **เรื่อง Drive scope:** ถ้าเพิ่งติดตั้ง Apps Script แล้วมี prompt ขออนุญาต ให้กด **Authorize** ด้วย Google account ที่เป็นเจ้าของ Sheet

---

## A. FT-01 / FT-02 · Four-tier Classification

### A.1 เฉลย (`KEY_FT`) — ใส่ให้แล้ว

| q | t1_key | t3_key |  | q | t1_key | t3_key |
|---|---|---|---|---|---|---|
| 1 | ข | 3 |  | 11 | ค | 4 |
| 2 | ก | 4 |  | 12 | ง | 2 |
| 3 | ค | 1 |  | 13 | ข | 3 |
| 4 | ง | 2 |  | 14 | ค | 1 |
| 5 | ข | 4 |  | 15 | ก | 4 |
| 6 | ค | 2 |  | 16 | ง | 2 |
| 7 | ก | 3 |  | 17 | ข | 4 |
| 8 | ง | 1 |  | 18 | ค | 2 |
| 9 | ข | 1 |  | 19 | ก | 3 |
| 10 | ก | 3 |  | 20 | ง | 1 |

### A.2 เกณฑ์ (Caleon & Subramaniam 2010)

| Category | เงื่อนไข |
|---|---|
| **Sound** | T1 ถูก · T3 ถูก · T2 ≥ 4 · T4 ≥ 4 |
| **MC** (Misconception) | T1 ผิด · T3 ผิด · T2 ≥ 4 · T4 ≥ 4 |
| **Guessing** (Lucky Guess) | T1 ถูก · T3 ผิด |
| **No-K** (Lack of Knowledge) | T2 ≤ 2 **หรือ** T4 ≤ 2 |

### A.3 ใช้งาน

- **วิธีที่ 1 · Batch (แนะนำ):** `🎯 Auto-score → 1️⃣ Score FT-01 → FT01_Scored`
  - สร้าง sheet `FT01_Scored` · คอลัมน์ q1_cat..q20_cat + Sound/MC/Guessing/No-K counts + MC_list

- **วิธีที่ 2 · สูตร cell ต่อ cell:**
  ```
  =CLASSIFY_FT(q1_t1, q1_t2, q1_t3, q1_t4, "ข", "3")
  ```
  หรืออ้างจาก KEY_FT:
  ```
  =CLASSIFY_FT(F2, G2, H2, I2, VLOOKUP(1,KEY_FT!$A$2:$C$21,2,FALSE), VLOOKUP(1,KEY_FT!$A$2:$C$21,3,FALSE))
  ```

---

## B. Calc · Auto-score

### B.1 กรอกเฉลย `KEY_Calc_P{n}`

| q | num_key | unit_key | tol |
|---|---|---|---|
| 1 | 7.5 | m/s | 0.05 |
| 2 | 200 | Hz | 0.05 |
| ... | | | |

- `num_key` · ค่าตัวเลข (ไม่ใส่หน่วย)
- `unit_key` · หน่วย (เช่น `m/s`, `Hz`, `cm`) · ถ้าเว้นว่าง = ไม่ตรวจหน่วย
- `tol` · tolerance (default **0.05 = ±5%**) · ถ้าข้อไหนต้องการเป๊ะให้ใส่ `0`

### B.2 เกณฑ์

| ส่วน | คะแนน | เกณฑ์ |
|---|---|---|
| `ans_score` | 0/1 | |น.ร. − key| ≤ key × tol |
| `unit_score` | 0/1 | มี substring `unit_key` (case-insensitive) |
| `total` | 0–2 | ans + unit |

### B.3 ใช้งาน

- **Batch:** `🎯 Auto-score → 3️⃣ Score Calc (ทุกแผน)`
- **สูตร cell:** `=CALC_SCORE(q1_ans, 7.5, "m/s", 0.05)` → คืน `[ans, unit, total]` 3 คอลัมน์

> 💡 Tip: ฟังก์ชัน `CALC_SCORE` ดึงเลขตัวแรกจาก text อัตโนมัติ · รองรับ `7.5`, `7,500`, `1.5e2`, `−3.0` ฯลฯ

---

## C. Spot the Error · Keyword Match

### C.1 กรอกเฉลย `KEY_Spot_P{n}`

| q | identify_kw | correct_kw |
|---|---|---|
| 1 | f\|ความถี่ | ไม่เปลี่ยน\|คงที่ |
| 2 | λ\|ความยาวคลื่น | สั้นลง\|ลดลง |

- ใส่หลายคำคั่นด้วย `|` (pipe) · ถูกแค่คำเดียว = ผ่าน
- ตรวจแบบ **substring case-insensitive** · ไม่ต้อง escape regex

### C.2 เกณฑ์

| ส่วน | คะแนน |
|---|---|
| `identify` | 0/1 · match identify_kw |
| `correct` | 0/1 · match correct_kw |

### C.3 ใช้งาน

- **Batch:** `🎯 Auto-score → 4️⃣ Score Spot (ทุกแผน)`
- **สูตร cell:** `=SPOT_MATCH(q1_identify, "f|ความถี่")`

### C.4 POE radio (exact match)

POE แบบ radio ไม่ต้อง keyword · ใช้สูตรตรง:
```
=IF(q1_p="prediction_key", 1, 0)
```

---

## 📊 Pre-Post Report

- **เมนู:** `🎯 Auto-score → 📊 สรุป Pre-Post + N-gain`
- ต้อง score FT01 + FT02 ก่อน
- สร้าง sheet `Report_Gain`:

| Column | คำนวณ |
|---|---|
| `pre_Sound`, `post_Sound` | นับจำนวนข้อ Sound ต่อคน |
| `pre_MC`, `post_MC` | นับจำนวนข้อ MC ต่อคน |
| `N_gain` | (post − pre) / (20 − pre) · Hake 1998 |
| `MC_reduced` | pre_MC − post_MC |

**เกณฑ์ Hake 1998:** `g ≥ 0.3` = medium gain · `g ≥ 0.7` = high gain

---

## 🛠 Custom Functions · Reference

ใช้เป็นสูตรใน cell ได้ (หลังติดตั้ง `ScoringScript.gs`)

| ฟังก์ชัน | Return | ตัวอย่าง |
|---|---|---|
| `CLASSIFY_FT(t1,t2,t3,t4,t1_key,t3_key)` | `Sound`\|`MC`\|`Guessing`\|`No-K` | `=CLASSIFY_FT(F2,G2,H2,I2,"ข","3")` |
| `CALC_SCORE(ans,num_key,unit_key,tol)` | `[ans, unit, total]` | `=CALC_SCORE(F2,7.5,"m/s",0.05)` |
| `SPOT_MATCH(text,keywords)` | `0`\|`1` | `=SPOT_MATCH(F2,"f\|ความถี่")` |
| `N_GAIN(pre,post,max)` | float | `=N_GAIN(B2,C2,20)` |

---

## ✅ Workflow ครูต่อคาบ

1. นักเรียนส่งใบงาน → data เข้า sheet
2. ครูเปิด Sheet → **🎯 Auto-score → เลือก tool**
3. เปิด sheet `*_Scored` → เห็นคะแนนพร้อมใช้
4. (ถ้าต้องการ) เปิด `Report_Gain` ตอนจบคาบ 10

**ลดเวลาตรวจ:** FT 20 ข้อ × 35 คน = 700 cells ตรวจมือ ≈ 45 นาที → Auto-score **< 5 วินาที** ✅
