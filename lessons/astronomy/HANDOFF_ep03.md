# HANDOFF · COSMOS LOG EP03 · Session Log

> ใช้ไฟล์นี้เพื่อเริ่มแชทใหม่โดยไม่เสียบริบท · ก่อนทำงานอื่น ให้อ่านไฟล์นี้ + `HANDOFF_ep02.md`

**วันที่บันทึกล่าสุด**: 2026-04-25
**สถานะ EP03**: 🟢 **20 หน้าเขียนเสร็จครบ · ระบบเกม active · ทดสอบเล่นได้ end-to-end · รอเก็บ asset + ปรับเนื้อหาเพิ่ม**
**โครงสร้าง**: Shell+Pages + Chain pattern + 2-button (Submit/Next) + Gate by teacher + EP02 boss pattern @ WARP RUN

---

## 1. EP03 คืออะไร

**"เสียงร้องจากอดีต · Echo from the Past"** · ตอนที่ 3 ของซีรีส์ COSMOS LOG · 100 นาที · 20 หน้า

- **ตัวชี้วัด**: ว 7.1 ม.4-6/2 · ดาวฤกษ์ · แสงและระยะ
- **Badge**: ✨ Light Detective
- **VOID misconceptions**: 1) "เลขน้อย = หรี่" 2) "สว่างตา = สว่างจริง" 3) "parsec = เวลา"
- **Logline**: ดาวดวงเดียวในความมืดส่งสัญญาณ "ARYA" · VOIDHUNTER ตามหลัง · Dr.Hubble ยื่นกล่องพ่ออารยา (ล็อกรหัส "ดาวหรี่แต่สว่างจริง") · ใช้ parallax + magnitude + m-M ไขรหัส → เจอ SOS เต็มของพ่อ → ดาวจะ supernova · เลือกส่ง beacon ถึงพ่อหรือหนี

---

## 2. โครงสร้าง 20 หน้า · 6 Act · Chain Flow

| # | ID | ไฟล์ | ชื่อ | ประเภท | นาที | Chain input → output |
|---|---|---|---|---|---|---|
| 00 | p00 | p00-howtoplay.html | Recap EP02 · Intro 3 currency | story | 2 | — → ⚡⚡⚡ intro |
| 01 | p01 | p01-entry.html | จดหมาย + Pre-test 3 ข้อ | reflection | 4 | — → pre-test |
| 02 | p02 | p02-sos.html | decode มอร์ส "ARYA" | story | 2 | — → **🔑 ARYA** + ✦20 |
| 03 | p03 | p03-join.html | VOIDHUNTER + พิมพ์ Password | setup | 3 | 🔑 ARYA → ปลด ship + Photon Bank |
| **04** | **p04** | p04-parallax.html | 🎓 **TEACH parallax** (d=1/p) | story | 2 | — → สูตร d=1/p |
| 05 | p05 | p05-parallax10.html | 🔍 INVEST วัด 3 ดาว (SOS,Sirius,Proxima) | puzzle | 4 | d=1/p → **d_sos=400pc** · 🪙 perfect |
| 06 | p06 | p06-magnitude.html | 🎞️ REVEAL "1,300 ปีแสง" | story | 2 | d_sos → time realization |
| **07** | **p07** | p07-council.html | 🎓 **TEACH Hipparchus + m** + ทวน parallax | story | 2 | — → m scale |
| 08 | p08 | p08-arrive.html | 🔍 INVEST เรียง 5 ดาว | puzzle | 4 | m scale → perfect try1 = 🪙20 |
| 09 | p09 | p09-absolute.html | ⚡ DILEM VOID: ดาว A vs B | mixed | 3 | m scale → เข้าใจ M |
| 10 | p10 | p10-hubble.html | 🎞️ CINE กล่องพ่อ (ล็อก) | story | 2 | — → setup midpoint |
| **11** | **p11** | p11-distance.html | 🌟 **TEACH Midpoint 5 นาที** · 3 slides safe haven | story | 5 | ครบ 3 slides = 🎖️ Hubble Badge |
| 12 | p12 | p12-father.html | 🔍 INVEST ปลดรหัส **DENEB** ⏱120วิ | puzzle | 3 | ตารางดาว + 🎖️ → 🔑 DENEB + ✦60 |
| 13 | p13 | p13-maze.html | 🎞️ CINE ไดอารี่พ่อ + SOS เสียงพ่อ | story | 2 | → d_father=100pc |
| **14** | **p14** | p14-chase.html | 🎓 **TEACH triangulation** | story | 2 | ทวน 3 tool รวม |
| 15 | p15 | p15-payoff.html | 🔥 INVEST Stellar Maze ⏱3นาที 3 layer | puzzle | 4 | 3 tool → escape route · perfect = 🪙40 |
| 16 | p16 | p16-recap.html | Movie Recap 8 ฉาก + 2 trap | puzzle | 5 | 🎖️ ช่วยจับ trap 1 ตัวฟรี |
| **17** | **p17** | shop.html | 🛍️ **Hubble Trading Post** (ใช้ 🪙) | setup | 3 | 🪙 → items (7 ชิ้น) |
| **18** | **p18** | warprun.html | 🔥🔥 **WARP RUN** Boss-like HP 300 · 3 phase | mixed | 7 | ⚡+items → Ending A/A+/B/C |
| 19 | p19 | p19-map.html | Post-test + Captain's Log + Badge + Export | reflection | 5 | ทั้งหมด → JSON + Cert PNG |

**หลัก**: ทุก puzzle เป็น output ของ TEACH ก่อนหน้า · และ output ของ puzzle ใช้ต่อในฉากถัดไป (Chain)

---

## 3. Game System (EP02 pattern applied)

### 3 Currencies
| สัญลักษณ์ | ชื่อ | เก็บยังไง | ใช้ที่ไหน |
|---|---|---|---|
| ⚡ | **Energy** | ตอบถูกใน puzzle | WARP RUN · buffer ต่อ MISS (-20%) |
| 🪙 | **Coin** | **perfect stage** (ถูกครบ try1) | Shop Beat 17 |
| ✦ | **Photon** | puzzle เฉพาะ (p02, p05, p09, ฯลฯ) | Beacon 300 · Cloak 50 |

### Perfect Bonus (`EP_CONFIG.coin.perfectBonus`)
```js
p05:20, p06:15, p08:20, p09:15, p11:15, p12:30, p15:20, p16:20
```

### Items (earn จากด่าน + ซื้อที่ shop)
- 🔭 **Parallax Tool** — ไม่ใช้ (ความเข้าใจจาก P05)
- 📜 **Star Catalog** — จาก P08 perfect
- 🎖️ **Hubble Badge** — จาก P11 midpoint ครบ · ใช้ P16 · P18 bonus
- 🛡️ **Shield** — carry EP02 (ถ้ามี)

### Shop Items (Beat 17 · cost 🪙)
| id | icon | cost | effect |
|---|---|---|---|
| parallaxPro | 🔭+ | 40 | Parallax Q × 2 · 3 ครั้ง |
| almanac | 📜+ | 40 | Magnitude Q × 2 · 3 ครั้ง |
| scope | 🎯 | 60 | Any Q × 2 · 2 ครั้ง |
| shieldPlus | 🛡️+ | 80 | block VH shot · 2 ครั้ง · unlock **Ending A+** |
| cloakBuy | 🌑 | 30 | skip 1 Q · 1 ครั้ง |
| chronos | ⏱️ | 100 | VH charge 10→15 วิ · ถาวร |
| beaconAmp | 💌+ | 120 | beacon 300→200 ✦ · 1 ครั้ง |

### WARP RUN (P18 · climax · EP02 boss pattern)
- HP 300 · 3 phase (Scale Inverter / Distance Faker / Unit Confuser)
- VH ชาร์จ 10 วิ (15 ถ้า chronos) · เต็ม = ยิงเรา ⚡-30 · meter -10%
- ตอบถูก = damage · 🔥 streak 3=×1.5 · 5=×2
- ตอบผิด = **MISS** + ⚡ -20%
- Item boosts apply by category (parallax/magnitude/any)
- 3 Ending: **A** (ส่ง beacon) · **A+** (ส่ง + shield+ ซับ supernova) · **B** (ไม่ส่ง) · **C** (supernova ก่อนชนะ)

### VOIDHUNTER Meter
- เริ่ม 60% · ทุกหน้า non-safe-haven ลง -5% (auto-tick)
- ตอบผิด = -10%
- Safe havens: p00, p01, p03, p08, p10, p18 (warprun), p19

---

## 4. สถาปัตยกรรม · ไฟล์หลัก

```
astronomy/
├── shared/                         ← shared module (ขยายจาก EP02)
│   ├── book.css?v=6                ← (EP02 เดิม · ไม่แก้)
│   ├── book.js?v=15                ← (EP02 เดิม · ไม่แก้)
│   ├── sync-client.js              ← rooms · photon · meter · vote · decisions
│   ├── firebase-config.js          ← optional · fallback BroadcastChannel
│   ├── voidhunter.js               ← meter HUD · tickOnPage
│   ├── photon.js                   ← ⚡ Photon + 🪙 Coin + ShopItems modules
│   ├── role-view.js                ← asymmetric view ตาม role (ถ้าใช้)
│   └── ep03-boot.js                ← 🔑 Boot · Chain · Gate · Submit
│
├── ep03/
│   ├── config.js                   ← SSOT: pages · coin · shop · warpRun · stars
│   ├── _page-style.css             ← page-shared CSS (btn-pair, teach-pod)
│   ├── index.html                  ← landing
│   ├── join.html                   ← role pick (multi-iPad · optional)
│   ├── teacher.html                ← Teacher Remote (ลอกจาก shared/teacher-remote.html · hardcode ep=ep03 · default local mode)
│   ├── test.html                   ← smoke test module
│   ├── shop.html                   ← Beat 17 · buy items
│   ├── warprun.html                ← Beat 18 · WARP RUN climax
│   └── p00-p19 · 20 HTML pages
│
├── HANDOFF_ep01.md
├── HANDOFF_ep02.md
└── HANDOFF_ep03.md                 ← ไฟล์นี้
```

### Load order ต่อหน้า (ใหม่ EP03)
```html
<link rel="stylesheet" href="../shared/book.css?v=6">
<link rel="stylesheet" href="_page-style.css">
<script src="../shared/firebase-config.js"></script>
<script src="./config.js"></script>
<script src="../../shared/pace-client.js"></script>   <!-- teacher gate -->
<script src="../shared/sync-client.js"></script>
<script src="../shared/voidhunter.js"></script>
<script src="../shared/photon.js"></script>            <!-- Photon + Coin + ShopItems -->
<script src="../shared/role-view.js"></script>
<script src="../shared/ep03-boot.js"></script>        <!-- Boot + Chain + Gate + Submit -->
```

---

## 5. Core Modules API

### Chain (ใน ep03-boot.js)
```js
Chain.set(key, val)   // เก็บ state carry ระหว่างหน้า
Chain.get(key)        // อ่าน
Chain.all()           // all · ใช้ตอน export

// ตัวอย่าง chain:
// p02 → Chain.set('ARYA', 'ARYA')
// p05 → Chain.set('d_sos_pc', 400)
// p12 → Chain.set('DENEB_unlocked', true)
// p13 → Chain.set('d_father_pc', 100)
```

### Gate (teacher-controlled NEXT button)
```js
Gate.wireButton(pageId, buttonEl, nextHref)
// Default: ปุ่มปลดเลย (solo)
// ถ้าครู set pace → respect pace (lock/unlock ตามที่ครูตั้ง)
// URL ?solo=1 → บังคับ solo ไม่สนครู

Gate.soloMode(buttonEl, nextHref)   // alias
```

### Submit (localStorage · ready for backend)
```js
Submit.record(page, payload)        // save · log to Sync.recordDecision
Submit.load(page)                   // retrieve
Submit.wirePair({
  page, nextHref, getPayload, isPerfect, onSubmit
})
// Wire submit-btn + next-btn pair · auto-grant 🪙 ถ้า isPerfect
```

### Coin + ShopItems (photon.js)
```js
Coin.get() / .add(n, reason) / .spend(n, reason)
Coin.awardPerfect(pageId)           // one-time bonus per page
Coin.renderPill()

ShopItems.load()                    // { [id]: {uses, boughtAt} }
ShopItems.has(id) / .getUses(id)
ShopItems.buy(id)                   // spend coin + add
ShopItems.use(id)                   // decrement uses
```

### Photon + VOIDHUNTER (existing from earlier session)
```js
Photon.get() / .add(n, reason) / .spend(n, target)
Photon.renderPill()
VoidHunter.get() / .change(d, reason) / .wrongAnswer(pageId)
VoidHunter.renderHUD()
```

### Sync (auto-creates SOLO room if none)
- `ep03-boot.js` line: `if (!Sync.getState()) Sync.createRoom({ code: 'SOLO' })`
- เพื่อให้ Photon/meter ทำงานได้โดยไม่ต้อง join room จริง

---

## 6. Two-Button Pattern (ทุก INVEST / DILEM / REFL)

```html
<div class="btn-pair">
  <button class="submit-btn">💾 ส่งคำตอบ</button>
  <button class="next-btn" id="nextBtn" disabled>🔒 รอ</button>
</div>
<div class="gate-hint">ครูคุมประตู · รอจนส่งครบทุกคน</div>
```

**Submit.wirePair({...})** ผูกทั้ง 2 ปุ่มให้ทำงานร่วมกัน · next ปลดตาม Gate

---

## 7. Teacher Remote (ep03/teacher.html)

- ลอกจาก `shared/teacher-remote.html` · hardcode `ep='ep03'` · path config เป็น `./config.js`
- **Default mode = local** (ไม่ต้องใส่รหัส) · เข้าได้เลย
- URL: `/ep03/teacher.html` หรือ `?room=ABCD`
- ปุ่ม: ← ก่อนหน้า · ต่อไป → · re-sync · ปลดล็อกทั้งหมด · ล็อกทั้งหมด
- Shortcut: ←/→/Space
- ครูคลิก ☑ แต่ละหน้าเพื่อปลดล็อก · นักเรียนที่เสร็จแล้วกด ▶ ไปต่อเอง

---

## 8. Tested End-to-End (smoke test)

| Test | Status |
|---|---|
| P00 render · HUD meter 60%/⚡0/🪙0 | ✅ |
| P01 pre-test submit → Submit.record | ✅ |
| P02 decode ARYA → Chain.set + ✦20 | ✅ |
| P03 password ARYA → unlock | ✅ |
| P04 teach parallax · test answer | ✅ |
| P05 perfect parallax → 🪙20 | ✅ |
| Shop: 🪙140 → buy parallaxPro + almanac + cloak (=110) · เหลือ 30 | ✅ |
| WARP RUN: correct answer + almanac boost = CRIT dmg×2 (20) · HP 300→280 | ✅ |
| WARP RUN: VH charge 10 วิ · เต็ม → ⚡-30 shot | ✅ |
| WARP RUN: phase change · HP threshold | ✅ |
| Gate solo auto-unlock | ✅ |
| Teacher remote lock/unlock (แก้ pace) | ✅ |

---

## 9. สิ่งที่ยังต้องทำ

### Priority 1 · เนื้อหาเจาะจงขึ้น
- P01 pre-test · ปรับคำถามวัด conceptual change จริง (3 ข้อยัง minimal)
- P02 morse · ใช้เสียงจริงไหม · ภาพยาน+ดาว SVG
- P11 Dr.Hubble 3 slides · ขยายสคริปต์สอน 5 นาที
- P18 WARP RUN · pool คำถาม 4 ต่อ phase · ขยายเป็น 10+ ต่อ phase
- Teacher Cue ยังขาด · ควรเพิ่มใน `<details class="teacher-cue">` ต่อหน้า

### Priority 2 · Asset
- 🎨 SVG: ยาน · ดาว · VOIDHUNTER · กล่องพ่อ · จดหมาย
- 📷 NASA ภาพดาวจริง (Sirius, Vega, Deneb, Polaris, Proxima)
- 🔊 เสียงพ่อ 45 วิ (หรือครูอ่านสด · ยังไม่ต้องอัด)

### Priority 3 · Backend (optional · ถ้าอยากเก็บข้อมูลเข้า Sheet)
- Extend Apps Script endpoint · เพิ่ม `?action=submit&uid=...&page=...&payload=...`
- Modify `Submit.record()` ให้ส่งไป backend ด้วย (fire-and-forget)
- Currently: เก็บใน localStorage + Sync.recordDecision เท่านั้น

### Priority 4 · Advanced
- WARP RUN ไม่มี cloak/scope Precision Scope UI เต็ม · ตอนนี้ใช้แค่ boost chip (ตัวอย่าง)
- Teacher DM cards (EP02 มี · EP03 ยังไม่ได้ port)
- Multi-iPad role view (role-view.js มีพร้อม · แต่หน้า puzzle ยังไม่แตกเป็นต่าง-role)

---

## 10. ปัญหาที่เจอ + แก้แล้ว (session นี้)

| # | ปัญหา | fix |
|---|---|---|
| 1 | Submit+Next pattern เดิมมีปุ่มเดียว · แก้ข้อมูลไม่ได้ | สร้าง Submit.wirePair + btn-pair CSS |
| 2 | Gate ล็อกตลอดแม้ไม่มีครู · นักเรียนทดสอบเองไม่ได้ | แก้ Gate.wireButton · default ปลด · ล็อกเมื่อครู set pace |
| 3 | Photon/meter = 0 ใน solo mode | auto-create room 'SOLO' ใน ep03-boot |
| 4 | Teacher console ต้องใส่ password | default mode=local ใน ep03/teacher.html |
| 5 | ไม่มี Chain ระหว่างหน้า | Chain module + localStorage + visible chips |
| 6 | ไม่มี coin system · shop ไม่สมบูรณ์ | Coin + ShopItems modules + shop.html + perfect bonus |
| 7 | WARP RUN ไม่มี boss pattern เต็ม (HP/charge/MISS) | port EP02 boss logic ลง warprun.html |

---

## 11. PROMPT สำหรับเริ่มแชทใหม่

```
สวัสดีครับ · ผมทำซีรีส์ COSMOS LOG ดาราศาสตร์ ม.6

EP03 เสร็จแล้ว · 20 หน้าเดินได้ end-to-end · ระบบเกม activate ครบ

บริบทเต็ม อ่าน 3 ไฟล์นี้:
- wave-mechanics-research/lessons/astronomy/HANDOFF_ep01.md
- wave-mechanics-research/lessons/astronomy/HANDOFF_ep02.md
- wave-mechanics-research/lessons/astronomy/HANDOFF_ep03.md

หลักการ EP03 (ห้ามหลุด):
- Chain pattern: ทุกหน้า produce output → หน้าถัดไปใช้เป็น input
- TEACH ก่อน INVEST ทุกครั้ง (ไม่โยนปัญหาให้แก้โดยไม่สอน)
- 2-button pattern: 💾 Submit + ▶ Next (ครูคุมประตู)
- ครู = conductor (เปิด/ปิด) · ไม่แจก item · ไม่บังคับก้าว
- EP02 boss pattern @ WARP RUN (Q&A + VH charge 10 วิ + MISS −20%)
- 🪙 Coin เก็บจาก perfect stage → ซื้อ item ที่ shop ก่อน climax
- 3 Ending: A / A+ / B / C

ตอนนี้อยากทำ ________
```

---

## 12. หมายเหตุ · user เน้นย้ำ (จากช่วงทำงาน EP03)

- ผู้ใช้ไม่ชอบ draft/proposal ยาว · อยากเห็น **ลงมือสร้างจริง** แล้วปรับ
- "ต้องสนุกด้วย · มี peak · มีสอน · มีปริศนา · มีหลอกล่อ · แบบหนัง sci-fi"
- "ออกแบบให้แต่ละหน้าคลีน · ไม่รก · 1 หน้า = 1 สิ่ง"
- "ซ้ำคำถามให้จำได้" (spaced repetition)
- "ครูแค่เปิดประตู · ไม่บังคับก้าว · ไม่แจก item"
- "ไอเทมได้จากกิจกรรมเท่านั้น" (ไม่ใช่ครูแจก)
- "EP02 เก็บพลังไปตีบอส · EP03 ควรมี 2 จุด cash-in คล้ายกัน"
- "ปลดล็อกฝั่งนักเรียนให้เทสเองได้"
- เชื่อมโยง: "ปัญหาโผล่ → เครื่องมือที่เรียน → โจทย์ต้องแก้ (ต่อเนื่องไหลลื่น)"
- อย่าลืม **วPA · KPA · สมรรถนะ · 4C · การวัดวิจัย** ใน documentation

**ห้าม**: เขียน proposal ยาว ๆ ซ้ำ · ถามเยอะก่อนลงมือ
**ทำ**: สร้างจริง · รันทดสอบ · ปรับตามที่ user feedback
