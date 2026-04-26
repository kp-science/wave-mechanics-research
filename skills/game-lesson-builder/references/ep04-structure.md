# EP04 Structure Reference · Lab-build Model

> 4-องก์ · 27 หน้า · ~100 นาที · เน้น lab → discovery → adventure
> ใช้รูปแบบนี้เมื่อเนื้อหาต้องสร้างความรู้หลายเลเยอร์ก่อนนำไปใช้

---

## โครงเรื่องเต็ม

```
ACT A · ARRIVAL (4 หน้า · 14 นาที)
  p00 cover         · Recap EP ก่อนหน้า + intro
  p01 pre-test      · 4-choice · M1-M5 baseline
  p02 arrival       · ถึงเหตุการณ์ · เห็นปัญหา · แผนที่
  p03 plan          · แผน 2 แกน + บทบาท

ACT B · LAB 1 · KNOWLEDGE BUILD (6 หน้า · 21 นาที)
  p04 lab-1.1       · slider observe + 2 quiz
  p05 lab-1.2       · drag-to-match + compare
  p06 theory        · mnemonic + summary table
  p07 group #1      · 🎁 apply กับ data จริง + hidden collectible
  p08 group #2      · 🎁 จัดอีกแบบ (ทบทวน)
  p09 summary       · สรุป lab 1 · บอกว่ายังไม่พอ

ACT C · LAB 2 · KNOWLEDGE BUILD #2 + DISCOVERY (8 หน้า · 28 นาที)
  p10 bridge        · เคนเชื่อมต่อ "ขั้นต่อไป"
  p11 context       · เนื้อหาก่อน lab (เช่น nebula)
  p12 mini-lab      · slider 2 (เช่น proto star mass)
  p13 main-lab      · 🎁 main concept (เช่น 5 mass tracks)
  p14 order         · 🎁 drag-order หรือ sequence
  p15 match         · drag-match concept↔outcome
  p16 mini-game     · timer race (30 วิ · 6 ข้อ)
  p17 discovery     · บันทึกผู้สาบสูญ + เปิด antagonist hint

ACT D · SYNTHESIS + JOURNEY (9 หน้า · 37 นาที)
  p18 reveal        · star map ฉบับสมบูรณ์
  p19 antagonist    · VOID face-to-face
  p20 decision      · 🎁 path selection · เลือกเส้นทาง
  p21 post-test     · 4-choice
  p22 sequencer     · drag เรียงเหตุการณ์
  p23 shop          · ใช้ coin
  p24 boss          · 🔥 main boss
  p25 rescue        · ending reveal
  p26 journal       · 🏆 badge + 3-2-1 chips
```

**🎁 = Mystery Box drop point** (5 จุด: p07, p13, p14, p20, + boss victory)

---

## Per-act Patterns Cheatsheet

### ACT A · ARRIVAL · 4 หน้า
- หน้า 1: cover (recap)
- หน้า 2: pre-test (4-choice · ใช้ m1-m5 list)
- หน้า 3: setting (visual map · ปัญหาเริ่มเห็น)
- หน้า 4: plan + roles (เคนเสนอ N ขั้นวิเคราะห์ · เลือก role)

### ACT B · LAB 1 (Color/Spectrum-like) · 6 หน้า
- Slider observe → drag match → theory → 2× consolidation → summary
- Mystery Box ที่ p07
- Hidden collectible (เช่น Black Dwarf Shell) ที่ p07

### ACT C · LAB 2 (Mass/Process-like) · 8 หน้า
- Bridge → context → mini-slider → main lab tabs → order drag → match → game → discovery
- Mystery Box ที่ p13 และ p14
- Discovery page (p17) ใช้ "บันทึกผู้สาบสูญ" + reveal antagonist

### ACT D · SYNTHESIS + JOURNEY · 9 หน้า
- Reveal map → antagonist → decision → assess → recap → shop → boss → rescue → badge
- Mystery Box ที่ p20 (path) และ boss victory
- Boss = mechanic ที่ใช้ pool คำถามจาก lab ทั้งหมด

---

## Config Schema (EP04 specific)

```js
window.EP_CONFIG = {
  id: 'ep04', title: '...', subtitle: '...',
  badge: { icon: '...', name: '...' },
  duration: 100, indicator: 'ว 7.x ม.4-6/x',

  pages: [ /* 27 pages */ ],
  objectives: { K1, K2, ..., P1, ..., A1, ... },
  misconceptions: { M1, M2, M3, M4, M5 },
  roles: [ NAV, ENG, MED, MECH ],
  coin: { start, perfectBonus: { pXX: amt } },
  photon: { start, targets: { ... } },
  shop: { items: [...] },
  boss: { /* hybrid · pool questions per zone */ },

  // ⭐ EP04-specific config
  briefings: {
    pXX: {
      type: 'void' | 'leader',
      no: '01',
      taunt: '...' | brief: '...',
      goal: '...',
      criteria: ['...'],
      time: '...', reward: '...'
    }
  },

  // ⭐ Mass evolution tracks (5 ช่วง)
  massTracks: [
    { range, track, icon, color, stages:[...], end, time, note }
  ],

  // ⭐ Route stars (used in p02 + p20 + others)
  routeStars: [
    { id:'rN', label, tempK, color, type, mass, hex, hint }
  ],

  spectralTable: [ /* OBAFGKM */ ],
};
```

---

## Mystery Box Tier Strategy

| จุด | tier ที่ตั้งใจให้ได้ | กลไก |
|---|---|---|
| p07 group #1 | depends on wrongs | wrongs = N - correct (จาก 11 ดาว) |
| p13 main lab | always tier 1 | ดูครบ 5 = perfect |
| p14 order | depends on perfect tracks | perfectTracks size · 5=tier1, 3-4=tier2, 0-2=tier3 |
| p20 path | depends on safety | safest=0 wrong (tier 1) · others=2-5 wrongs |
| boss victory | depends on ending | A+/A=tier1 · B=tier2 · C=tier3 |

---

## Migration Guide · EP03 → EP04 style

ถ้าจะ refactor EP03 เป็น EP04 style:
1. แตก lab ใหญ่ออกเป็น slider + drag-match + theory + consolidation
2. เพิ่ม Mystery Box ในจุด consolidation
3. ใส่ Mission Briefing บนหัวทุกหน้า lab
4. แทนทุก textarea ด้วย tap-chips
5. เพิ่ม shared/starfield + audio + mystery-box modules
6. ย้าย audio toggle จากขวาบน → ซ้ายบน (ห้ามทับ pill)
7. เปลี่ยนโครง 5-องก์ → 4-องก์ ถ้าเนื้อหากว้าง
