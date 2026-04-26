# Story Structure · 5 ACTs + 6-Step Lab Cycle

อ้างอิง: `lessons/astronomy/ep03/` (COSMOS LOG EP03)

## ภาพรวม 20 หน้า

```
ACT 1 · HOOK (10 min)              ACT 2A · MYSTERY 1 (10 min)
├─ p00 · Recap previous EP          ├─ p04 · TEACH new concept
├─ p01 · Letter + Pre-test          ├─ p05 · INVEST (lab)
├─ p02 · Story event (decode SOS)   └─ p06 · REVEAL answer
├─ p02b · Mission Genesis (lore)
└─ p03 · Setup (join team)         ACT 2B · MYSTERY 2 (15 min)
                                    ├─ p07 · TEACH 2nd concept
                                    ├─ p08 · INVEST (6-step lab)
                                    ├─ p09 · DILEM (boss claim)
                                    ├─ p09b · Master decode (sub)
                                    └─ p10 · CINE (story beat)

ACT 3 · MIDPOINT (10 min)          ACT 4 · CRISIS (10 min)
├─ p11 · TEACH 5-min synthesis      ├─ p13 · CINE (full reveal)
└─ p12 · INVEST (puzzle)            ├─ p14 · TEACH (apply)
                                    └─ p15 · INVEST climax (heist)

ACT 5 · SHOP+CLIMAX+ENDING (45 min)
├─ p16 · Movie Recap + traps
├─ p19 · Post-test + Badge
├─ p17 · Shop (Hubble Trading Post)
├─ p18 · Boss (warprun.html)
└─ p19b · 3-2-1 Journal
```

## หน้าที่ของแต่ละ ACT

### ACT 1 · HOOK (10-15%)
**เป้าหมาย**: ดึงเด็กเข้าเรื่อง · ตั้งเป้าหมาย narrative · วัดความรู้เดิม

หน้าหลัก:
- **p00** Recap EP ก่อน (ถ้าเป็น EP2+) · มาตรฐาน 2 นาที · คลิกผ่านได้
- **p01** จดหมาย/ตัวกระตุ้น + **Pre-test 6 ข้อ** + CRI (confidence) — สำคัญ! ต้องคู่ขนานกับ post-test
- **p02** Story event ที่เปิดภัย (ดาว SOS, สัญญาณลึกลับ) · อาจมี mini-puzzle
- **p02b** Mission Genesis · lore · ทำไมต้องสนใจ (optional)
- **p03** Join team · setup roles · password gate (ใช้ผลจาก p02)

### ACT 2A · MYSTERY 1
**Pattern**: TEACH → INVEST → REVEAL
- **p04** สอน concept หลักตัวที่ 1 (เช่น parallax)
- **p05** lab activity ตาม PEOE — ตอบคำถาม วัด คำนวณ
- **p06** เฉลย mystery (เช่น "ดาว SOS ห่าง 400 pc")

### ACT 2B · MYSTERY 2
**Pattern**: TEACH → INVEST → DILEM → CINE
- **p07** สอน concept ตัวที่ 2 (เช่น magnitude)
- **p08** lab activity 6-step เต็ม (Magnitude Lab)
- **p09** DILEM · antagonist ใส่ misconception · เด็กต้องเลือกถูก
- **p09b** Sub-puzzle (master decode · เปิด map · etc.)
- **p10** CINE · story beat (เช่น "พ่ออารยา · กล่องล็อก")

### ACT 3 · MIDPOINT
**Pattern**: TEACH (5-min synthesis) → INVEST
- **p11** Mini-lecture สังเคราะห์ concept 1+2 (5 นาทีเข้ม)
- **p12** Puzzle ที่ใช้ทั้ง concept 1+2 ร่วม

### ACT 4 · CRISIS
**Pattern**: CINE → TEACH → INVEST climax
- **p13** Cinematic · เปิดความจริง · raise stakes
- **p14** สอน concept ตัวที่ 3 (เช่น triangulation)
- **p15** INVEST climax · ใช้ทุก concept · มี timer pressure

### ACT 5 · SHOP+CLIMAX+ENDING
**Pattern**: recap → post-test → shop → boss → reflection
- **p16** Movie Recap (drag-drop scene + trap detection)
- **p19** Post-test (parallel form กับ p01) + CRI + badge cert
- **p17** Shop · ซื้อ items ก่อน boss
- **p18** Boss fight (`warprun.html`) · 3 phases · multi-ending
- **p19b** 3-2-1 Journal (3 concepts · 2 scenes · 1 question) + reflection

**ลำดับ p17/p19**: ใส่ p19 (post-test) **ก่อน** p17 (shop) ก็ได้ — แล้วแต่ design intent

---

## 6-Step Lab Cycle (สำหรับหน้า INVEST)

ใช้ใน p05, p08, p15 (หน้า lab activity ใหญ่)

```
1 · PREDICT     ก่อนทำ · เดาก่อน · ไม่มีผิดถูก · เก็บข้อมูล naive thinking
2 · EXPLORE     3 มินิแล็บ tabs · ทำให้ครบทั้ง 3 ก่อนไปต่อ
3 · MEASURE     ลงมือวัด/คำนวณจริง · slider, drag, calc
4 · ANALYZE     จัดข้อมูลที่วัดได้ (drag star token onto magnitude scale)
5 · NOTE        Lab Note · classify ✓/✗ statements + reflect (PEOE compare)
6 · PEER        คุยทีม + tutor question · ใช้ความรู้ apply
```

### Step bar UI (top of page)
```html
<div class="lab-steps">
  <div class="lab-step" data-s="0">1·PREDICT</div>
  <div class="lab-step" data-s="1">2·EXPLORE</div>
  <div class="lab-step" data-s="2">3·MEASURE</div>
  <div class="lab-step" data-s="3">4·ANALYZE</div>
  <div class="lab-step" data-s="4">5·NOTE</div>
  <div class="lab-step" data-s="5">6·PEER</div>
</div>
```
- `.lab-step.active` = ปัจจุบัน
- `.lab-step.done` = ทำเสร็จแล้ว · มี coin badge

### Gate ระหว่าง step
- ปุ่ม "ไปต่อ" ใน step n disabled จนกว่า criteria ของ step n จะครบ
- ใช้ `state.stepsDone = new Set()` · `markDone(n)`
- step 1 EXPLORE 3 tabs: ต้องครบทั้ง 3 ก่อน next1 enabled
   - แสดง pulse highlight ใน tab ที่ยังไม่ทำ + บอก next button text "เหลือ: Match, Dist"

### Step 5 NOTE = ส่วนที่ส่ง mystery box
- คลาสsify ครบ → submit button → reveal correctness + lock + show mystery box
- Tier ขึ้นกับจำนวนผิด

---

## ตอนจบ (Multi-Ending)

ทุก EP ต้องมี **อย่างน้อย 3 ending** · เลือกได้จาก choices ในเกม

ตัวอย่าง EP03 (4 endings):
| Code | Trigger | Result |
|---|---|---|
| **A+** | Boss ผ่าน + ส่ง beacon + มี shield | สมบูรณ์แบบ · เสียงพ่อตอบ 20 วิ · Arya arc resolve |
| **A** | Boss ผ่าน + ส่ง beacon | Resolve · เสียงพ่อตอบ 10 วิ |
| **B** | Boss ผ่าน + ไม่ส่ง beacon | Survive · Arya เงียบ · ค้าง EP08 |
| **C** | ดาวระเบิดก่อนชนะ boss | Failed · Arya ร้องไห้ |
| **D** | Energy หมดก่อนจบ boss | Failed · life support ดับ |

### Ending gate UI (ที่ boss page หลัง victory)
```html
<div class="ending-gate">
  <h2>💫 FINAL CHOICE</h2>
  <div>VOIDHUNTER หยุด · ดาวจะระเบิดใน <b>X วิ</b></div>
  <div>💌 Beacon cost: <b>300✦</b> · คุณมี: <b>240✦</b></div>
  <div class="opts">
    <button class="send" disabled>ส่ง BEACON (Ending A)</button>
    <button class="skip">ไม่ส่ง · หนี (Ending B)</button>
  </div>
</div>
```

### Ending text (สั้น · เห็นภาพ)
```js
function endingText(code) {
  if (code === 'A+') return '🌟 ส่ง beacon + shield · เสียงพ่อตอบ 20 วิ · <b>Arya arc resolve · เต็มสูง</b>';
  if (code === 'A')  return '💌 ส่ง beacon · เสียงพ่อตอบ 10 วิ · <b>Arya arc resolve</b>';
  if (code === 'B')  return '🌑 ไม่ส่ง · รอดไว · <b>Arya เงียบ · ค้าง EP ถัดไป</b>';
  if (code === 'C')  return '💥 ดาวระเบิดก่อน · ไม่ทันส่ง';
  if (code === 'D')  return '⚡ Energy หมด · ระบบดับ';
}
```

---

## Page time budget (≈100 นาที total)

| ACT | Pages | นาทีรวม |
|---|---|---|
| 1 HOOK | 5 (p00-p03) | 12 |
| 2A | 3 (p04-p06) | 8 |
| 2B | 5 (p07-p10) | 14 |
| 3 MIDPOINT | 2 (p11-p12) | 8 |
| 4 CRISIS | 3 (p13-p15) | 8 |
| 5 ENDING | 5+ (p16-p19b) | 25 |
| Buffer + transitions | | 25 |

ปรับได้ตามวิชา · แต่ ACT 5 ต้องไม่น้อยกว่า 25 นาที (boss + post-test + reflection)
