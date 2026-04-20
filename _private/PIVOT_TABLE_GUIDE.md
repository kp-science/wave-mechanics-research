# 📊 คู่มือ Pivot Table · สรุป FT/F สำหรับรายงานวิจัย

**เป้า:** ใช้ Google Sheet Pivot Table วิเคราะห์ข้อมูล FT-01/FT-02 + F1-F9 → ตารางพร้อมลงวิทยานิพนธ์ (บทที่ 4)

**Prerequisites:**
- Run `🎯 Auto-score → 1️⃣ Score FT-01 → FT01_Scored` ก่อน (จาก `SHEET_FORMULAS.md`)
- Run `2️⃣ Score FT-02 → FT02_Scored` ก่อนเริ่มส่วน N-gain

---

## 🗂 โครงสร้าง Sheet ที่ใช้งาน

| Sheet | ฟิลด์หลัก (หลังแตกคอลัมน์) |
|---|---|
| `FT01` / `FT02` | timestamp · student_id · student_name · class · q1_t1 · q1_t2 · q1_t3 · q1_t4 · ... · q20_t4 |
| `FT01_Scored` / `FT02_Scored` | student_id · class · q1_cat · q2_cat · ... · q20_cat · count_Sound · count_MC · count_Guessing · count_NoK · MC_list |
| `F_Pre_P{n}` / `F_Post_P{n}` | student_id · class · q1_t1..t4 · ... · category (client-side classified) |

> 💡 **Category codes:** `Sound` · `MC` · `Guessing` · `No-K` (4 ระดับของ Caleon & Subramaniam 2010)

---

## 1️⃣ สถิติพื้นฐาน · % Sound / MC per item per class

### 1.1 % Sound per item (FT-01 baseline)

**เมนู:** `Insert → Pivot table` เลือก range `FT01_Scored!A:AZ`

| ส่วน Pivot | กำหนด |
|---|---|
| **Rows** | `class` (เช่น ม.5/4, ม.5/5) |
| **Columns** | *(ปล่อยว่าง)* หรือเลือก `q1_cat` ถ้าต้องการข้อเดียว |
| **Values** | สำหรับแต่ละ `q{i}_cat` (1-20): `COUNTA` of `q{i}_cat`, filter = "Sound" |
| **Filters** | - |

**เทคนิคเร็ว:** สร้างคอลัมน์ช่วยใน FT01_Scored:
```
q1_sound  =IF(q1_cat="Sound",1,0)
q1_mc     =IF(q1_cat="MC",1,0)
q1_guess  =IF(q1_cat="Guessing",1,0)
q1_nok    =IF(q1_cat="No-K",1,0)
```
(drag ไปถึงข้อ 20 × 4 category = 80 คอลัมน์ · หรือใช้ ARRAYFORMULA)

จากนั้น Pivot:
- Rows: `class`
- Values: `SUM(q1_sound)` / `COUNT(student_id)` × 100 → **% Sound ข้อ 1 ต่อห้อง**

### 1.2 Screenshot-style layout (ที่ควรได้)

```
                 ข้อ1    ข้อ2    ข้อ3   ...  ข้อ20   เฉลี่ย
ม.5/4            42%     56%    38%         47%     45.2%
ม.5/5            39%     58%    41%         51%     46.8%
รวม              40.5%   57%    39.5%       49%     46.0%
```

### 1.3 Top 5 Misconception แรงสุด

**Pivot config:**
- Data range: `FT01_Scored!A:AZ`
- Rows: ข้อที่ 1..20 (ใช้ helper column `q_mc_counts` ที่ unpivot แล้ว)
- Values: `SUM(q{i}_mc)`
- Sort: Values DESC · Limit 5

**หรือ formula เดียว (ไม่ต้อง Pivot):**
```
=QUERY(FT01_Scored!A1:AZ,
  "SELECT Col24, SUM(Col24) 
   WHERE Col24='MC' 
   GROUP BY Col24 ORDER BY SUM(Col24) DESC LIMIT 5")
```

**หรือใช้ MC_list column (จาก Scoring):**
```
=QUERY(FT01_Scored!MC_list,
  "SELECT mc_code, COUNT(mc_code)
   GROUP BY mc_code ORDER BY COUNT(mc_code) DESC LIMIT 5")
```
→ จะได้เช่น `M1.2 · 28 คน` · `M3.1 · 24 คน` · `M6.2 · 19 คน` ...

### 1.4 % shift Pre→Post per item

สร้าง sheet ใหม่ `Shift_PrePost` ใส่หัว:

| q | pre_Sound% | post_Sound% | Δ | pre_MC% | post_MC% | Δ_MC |
|---|---|---|---|---|---|---|
| 1 | =AVG... | =AVG... | =C-B | | | |
| ... | | | | | | |

**สูตรอ้าง FT01_Scored + FT02_Scored:**
```
pre_Sound%  =COUNTIF(FT01_Scored!q1_cat, "Sound")/COUNTA(FT01_Scored!q1_cat)*100
post_Sound% =COUNTIF(FT02_Scored!q1_cat, "Sound")/COUNTA(FT02_Scored!q1_cat)*100
Δ           =post - pre
```

**Conditional Format:** สีเขียวถ้า Δ ≥ +20% · สีแดงถ้า Δ ≤ −5%

---

## 2️⃣ Normalized Gain · Hake (1998)

### 2.1 สูตรหลัก

$$g = \frac{\text{Post} - \text{Pre}}{\text{Max} - \text{Pre}}$$

- Max = 20 (FT มี 20 ข้อ · นับ Sound เป็นคะแนน)
- Pre/Post = จำนวนข้อ Sound ต่อคน

**สูตรใน Sheet** (sheet `Report_Gain`):

| col | สูตร |
|---|---|
| A: student_id | จาก FT02_Scored |
| B: class | `=VLOOKUP(A2, FT01_Scored!A:D, 4, 0)` |
| C: pre_Sound | `=VLOOKUP(A2, FT01_Scored!A:AZ, 25, 0)` (หรือ col count_Sound) |
| D: post_Sound | `=VLOOKUP(A2, FT02_Scored!A:AZ, 25, 0)` |
| E: N_gain | `=IFERROR(IF(20-C2=0, "", (D2-C2)/(20-C2)), "")` |
| F: Hake_level | `=IF(E2="", "", IF(E2<0.3, "low", IF(E2<0.7, "medium", "high")))` |
| G: MC_pre | `=VLOOKUP(A2, FT01_Scored!A:AZ, 26, 0)` |
| H: MC_post | `=VLOOKUP(A2, FT02_Scored!A:AZ, 26, 0)` |
| I: MC_reduced | `=G2-H2` |

> 💡 หรือใช้ custom function `=N_GAIN(C2, D2, 20)` ที่มีใน `ScoringScript.gs`

### 2.2 ตีความ Hake

| ช่วง g | ระดับ | ความหมายเชิงวิจัย |
|---|---|---|
| g < 0.3 | **Low** | การเรียนแบบบรรยายปกติ · ไม่มี conceptual change |
| 0.3 ≤ g < 0.7 | **Medium** | Interactive engagement · เกิด conceptual change ปานกลาง |
| g ≥ 0.7 | **High** | Deep conceptual change · เกณฑ์ ideal สำหรับ IE |

> 📚 อ้างอิง: Hake, R. R. (1998). Interactive-engagement versus traditional methods. *American Journal of Physics, 66*(1), 64-74.

### 2.3 Pivot · สรุป N-gain ต่อห้อง

- Data: `Report_Gain!A:I`
- Rows: `class`
- Values:
  - `AVG(N_gain)` · format 0.00
  - `AVG(MC_reduced)` · format 0.0
  - `COUNTIF(Hake_level, "high")` / `COUNT(student_id)` × 100 → % นักเรียน high-gain

**ตารางที่ควรได้:**
```
ห้อง        avg_g    %high   %medium   %low    avg_MC_reduced
ม.5/4       0.48      22%      54%      24%        3.2
ม.5/5       0.52      28%      56%      16%        3.6
รวม         0.50      25%      55%      20%        3.4
```

---

## 3️⃣ Disaggregation · แยกกลุ่มย่อย

### 3.1 แยกตามห้อง (ถ้ามีหลายห้อง)

ใช้ Filter ใน Pivot:
- Rows: `q` (ข้อที่ 1-20)
- Columns: `class`
- Values: % Sound

**หรือ QUERY:**
```
=QUERY(FT01_Scored, 
  "SELECT class, AVG(count_Sound)/20*100 
   GROUP BY class")
```

### 3.2 แยกตามเพศ (optional)

**Prerequisites:** ต้องมี column `gender` ใน FT01_Scored (JOIN จาก StudentMaster)
```
gender =VLOOKUP(student_id, StudentMaster!A:C, 3, 0)
```

**Pivot:**
- Rows: `gender`
- Columns: ข้อที่เจาะจง (เช่น MC-sensitive items M3.1, M6.2)
- Values: count of MC

### 3.3 แยกตามระดับผลการเรียน (GPA band)

สร้าง helper: `gpa_band`
```
=IF(gpa<2.5, "low", IF(gpa<3.5, "mid", "high"))
```

Pivot เหมือนข้อ 3.2 · Rows: `gpa_band`

---

## 4️⃣ ตารางรายงานสำเร็จรูป (สำหรับบทที่ 4)

### Table 1 · Demographics

| กลุ่มตัวอย่าง | n | ชาย | หญิง | อายุเฉลี่ย | GPA เฉลี่ย |
|---|---|---|---|---|---|
| ม.5/4 | 35 | 18 | 17 | 16.4 | 3.12 |
| ม.5/5 | 34 | 16 | 18 | 16.3 | 3.08 |
| **รวม** | **69** | **34** | **35** | **16.35** | **3.10** |

**Pivot:**
- Data: `StudentMaster`
- Rows: `class`
- Values: `COUNT(student_id)` · `COUNTIF(gender,"M")` · `COUNTIF(gender,"F")` · `AVG(age)` · `AVG(gpa)`

### Table 2 · Pre-Post Comparison per Concept

| Concept | รหัสข้อ | Pre_Sound% | Post_Sound% | Δ | g |
|---|---|---|---|---|---|
| แผน 1 · ชนิดคลื่น | 1, 2, 3 | 45% | 78% | +33% | 0.60 |
| แผน 3 · คุณสมบัติคลื่น | 5, 6, 7 | 38% | 65% | +27% | 0.44 |
| แผน 6 · การหักเห | 10, 11, 12 | 22% | 58% | +36% | 0.46 |
| ... | | | | | |

**Helper columns in concept-mapping sheet `ConceptMap`:**
```
concept  items        Plan#
ชนิดคลื่น  1,2,3       1
...
```

**Formula:**
```
Pre_Sound%  =AVERAGE(INDIRECT("FT01_Scored!q"&item_list&"_sound")) *100
Post_Sound% =AVERAGE(INDIRECT("FT02_Scored!q"&item_list&"_sound")) *100
g           =(Post - Pre)/(100 - Pre)
```

### Table 3 · Misconception Shift Matrix

|Misconception| รหัส | n_pre | n_post | Δ | % reduced |
|---|---|---|---|---|---|
| คลื่นกลต้องมีตัวกลางถ้า f เปลี่ยน | M6.1★ | 42 | 14 | −28 | 66.7% |
| คลื่นผ่านชนิดใหม่ความเร็วคงที่ | M6.2 | 38 | 19 | −19 | 50.0% |
| f เปลี่ยนเมื่อข้ามเขตหักเห | M6.3 | 31 | 22 | −9 | 29.0% |
| ... | | | | | |

**Pivot config:**
- Data: flatten `MC_list` (2 sheets pre+post) → unpivot to `student_id | mc_code | phase`
- Rows: `mc_code`
- Columns: `phase` (pre/post)
- Values: `COUNTA(student_id)`

**Unpivot formula** (ใน sheet ช่วย `MC_Long`):
```
=QUERY(FT01_Scored, 
  "SELECT student_id, 'pre' WHERE MC_list IS NOT NULL", 0)
```
แล้ว SPLIT MC_list ด้วย `|` → one row per misconception per student.

**★ เครื่องหมาย:** MC ที่อยู่ใน PLAN_BRIEFS flag ว่าเป็น misconception แรง (เช่น M6.1★ MWCS)

---

## 5️⃣ Quick Recipes · Pivot Config สำเร็จรูป

### R1 · % Sound per item per class (Pivot)
```
Data: FT01_Scored
Rows: class
Values: AVG(q1_sound)*100 ... AVG(q20_sound)*100
```

### R2 · Top MC list (Single formula)
```
=QUERY(MC_Long, "SELECT mc_code, COUNT(mc_code) 
 WHERE phase='pre' 
 GROUP BY mc_code 
 ORDER BY COUNT(mc_code) DESC 
 LIMIT 10 LABEL COUNT(mc_code) 'n'")
```

### R3 · N-gain distribution histogram
- Data: `Report_Gain!E:E` (N_gain column)
- Chart type: Histogram · buckets = 0.1 · range −0.2 to 1.0

### R4 · Pre→Post per-student scatter
- X axis: `pre_Sound` (0-20)
- Y axis: `post_Sound` (0-20)
- Add trendline y=x · คนเหนือเส้น = improve · คนใต้เส้น = regress

### R5 · F1-F9 Formative progression
```
Data: F_Post_P1..P9 (union with Col "plan")
Rows: student_id
Columns: plan (1-9)
Values: count_Sound / n_items × 100
```
→ เส้นกราฟพัฒนาการรายคนตลอดเทอม

---

## 6️⃣ Export สำหรับวิทยานิพนธ์

1. **เปลี่ยน locale** เป็น Thai: `File → Settings → Locale: Thailand` → ได้ decimal comma, date พ.ศ.
2. **Export:** `File → Download → .xlsx` ก่อน paste ลง Word (รักษา format ได้ดีกว่า CSV)
3. **Chart → Copy → Paste Special (Word)** · เลือก "Picture (Enhanced Metafile)" ให้คมแม้ zoom
4. **หมายเหตุใต้ตาราง:** อ้างสูตร Hake(1998) · Caleon & Subramaniam (2010) · n=69

---

## 📎 Appendix · Helper Sheets ที่ต้องมีก่อนเริ่ม

| Sheet | ใส่อะไร | สร้างเมื่อไหร่ |
|---|---|---|
| `StudentMaster` | student_id · name · class · gender · gpa · age | ก่อนเก็บข้อมูลสัปดาห์แรก |
| `ConceptMap` | concept · item_list · plan · M_codes | หลัง finalize FT-01 |
| `MC_Long` | student_id · mc_code · phase · class | auto ด้วย QUERY (ดูข้อ 4 Table 3) |
| `Report_Gain` | ตาม §2.1 · 1 row / student | run หลัง FT-02 เก็บครบ |

---

## ✅ Workflow สรุปสำหรับครู (ตอนจบเทอม)

1. FT-02 เก็บครบ → `🎯 Auto-score → 2️⃣ Score FT-02`
2. `🎯 Auto-score → 📊 สรุป Pre-Post + N-gain` → ได้ `Report_Gain`
3. เปิดคู่มือนี้ → สร้าง Pivot ทีละตาราง (Table 1 → 2 → 3)
4. Export `.xlsx` → paste Word บทที่ 4
5. Discussion ใช้ Top 5 MC (ข้อ 1.3) + Hake level distribution (ข้อ 2.3) เป็นหลักฐาน

**เวลารวม:** ~45 นาทีถ้าสูตร helper column พร้อม

---

*คู่มือนี้ใช้กับ schema flatten หลัง `0c4f931` (FT_P{n}, Scored sheets) · ถ้า schema เปลี่ยน ให้อัปเดต column reference*
