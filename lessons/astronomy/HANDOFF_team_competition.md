# HANDOFF · Team Competition (Per-EP)

**สร้าง: 2026-05-08 · EP01-EP08 ครบทุก EP ✅**

## สรุประบบ

แข่งขันรายทีม **แยกแต่ละ EP** (ไม่สะสมข้าม EP) · ทีมชนะของแต่ละ EP ได้รางวัลจากครู

- 6 ทีม (Nebula/Quasar/Pulsar/Andromeda/Horizon/Voyager)
- จำกัด **8 คน/ทีม/ห้อง** (รองรับห้องละ ≤45 คน)
- คะแนนทีม = ผลรวม `Book.state.energy` ของสมาชิกทุกคนใน EP นั้น
- ดูอันดับสด + ทีมชนะที่หน้า **Hall of Fame** ก่อน Journal

## ไฟล์ที่เกี่ยวข้อง

| ไฟล์ | บทบาท |
|---|---|
| `shared/team-comp.js` ⭐ ใหม่ | Module · `checkCapacity / register / submitFinalScore / fetchRanking` |
| `ep01/p02-team.html` | เลือกทีม + cap check + prize banner |
| `ep01/p18b-halloffame.html` ⭐ ใหม่ | หน้า Hall of Fame · podium + ranking |
| `content/astronomy/media.js` | ลงทะเบียน p18b ใน EP01 section |
| `shared/book.js` PAGES | เพิ่ม p18b เข้า navigation order |

## Backend (ไม่ต้อง redeploy Apps Script)

ใช้ endpoint เดิม `submit` + `list` · sheets ถูกสร้าง auto:

| Sheet | เมื่อไร | columns สำคัญ |
|---|---|---|
| `Team_Roster_EP{n}` | กดยืนยันทีมที่ p02 | student_id, class, team_id, team_name, team_role |
| `Team_Score_EP{n}` | เปิดหน้า Hall of Fame | student_id, class, team_id, energy, pages_completed |

**Filter**: ทุก query กรองด้วย `class` ของนักเรียนปัจจุบัน · ห้องอื่นไม่ปนกัน

## ผลต่องานวิจัย: **ไม่มี**

teamId ไม่ได้ใช้ใน paired t-test, Hake gain, IMI, Satisfaction · เก็บเฉพาะใน Team_* sheets แยก
ถ้าจะ secondary analysis (เช่น "ทีมชนะมี IMI สูงไหม") query Team_Score sheets เปรียบเทียบกับ IMI_Responses ผ่าน student_id ได้

## ตำแหน่ง Hall of Fame ในแต่ละ EP

| EP | File | Page id (data-page) | แทรกที่ | media.js no |
|---|---|---|---|---|
| 1 | `p18b-halloffame.html` | `p18b` | หลัง p18 posttest · ก่อน journal | 18b |
| 2 | `p26b-halloffame.html` | `p17d` | หลัง p20 posttest · ก่อน journal | 17d |
| 3 | `p26b-halloffame.html` | `p19a` | หลัง p20 posttest · ก่อน p19b journal | 19a |
| 4 | `p26b-halloffame.html` | `p25b` | ก่อน p26 journal | 25b |
| 5 | `p26b-halloffame.html` | `p26b` | ก่อน p27 journal | 26b |
| 6 | `p26b-halloffame.html` | `p26b` | ก่อน p27 journal | 26b |
| 7 | `p26b-halloffame.html` | `p26b` | ก่อน p27 journal | 26b |
| 8 | `p26b-halloffame.html` | `p26b` | ก่อน p27 journal · Season Final | 26b |

## Energy Snapshot per EP

ทุก EP มี `team-comp.js` โหลดที่ `p01-pretest.html` · auto-snapshot energy ผ่าน `markEpStart(epNum)` (อ่าน EP จาก URL pattern `/ep0X/`)
- คะแนน HoF = `Book.state.energy ตอนจบ EP - snapshot ตอนเริ่ม` = energy เฉพาะ EP นี้
- Storage key: `cosmosLog_epStart_{ep}` (LocalStorage · 1 ค่าต่อ EP ต่อเครื่อง)

## วิธี replicate ไป EP02-EP08 (DONE — ดู section ด้านบน)

EP02-EP08 มีหน้าเลือกทีมแล้วที่ **p01a-team.html** (หรือคล้ายกัน · ตรวจ media.js ของแต่ละ EP)

### ขั้นตอน (ต่อ EP):

1. **Copy `p18b-halloffame.html`** จาก ep01/ ไปที่โฟลเดอร์ EP target
2. **เปลี่ยน `EP_NUM = 1`** ในไฟล์ใหม่ ให้ตรง EP (เช่น EP02 → `EP_NUM = 2`)
3. **เปลี่ยน `data-page="p18b"`** ให้ตรงตำแหน่งหน้าใน EP นั้น (เช่น EP02 มี 23 หน้า → ใส่ก่อน journal)
4. **เปลี่ยน page-label** "EP01" → "EP02" (อัปเดตเลขหน้าด้วย)
5. **อัปเดต p02 (หรือหน้าเลือกทีม)** ของ EP นั้น:
   - import `team-comp.js`
   - เพิ่ม prize banner
   - เปลี่ยน `EP_NUM = X` ให้ตรง
   - เพิ่ม `checkCapacity` + `register` ใน submit handler
6. **ลงทะเบียน** หน้า Hall of Fame ใน `media.js` ของ EP นั้น
7. **เพิ่ม PAGES entry** ใน config.js ของ EP (ถ้ามี · EP02-EP08 ใช้ config.js แยก)

## Test Plan (EP01)

1. เปิด `KP-Classroom.html?course=astronomy` · login ด้วย student A
2. เข้า EP01 · ทำถึงหน้า p02 · ควรเห็น **prize banner** + **count badge** ทุกทีม
3. เลือกทีม Nebula · ยืนยัน · ควรส่งเข้า Sheet `Team_Roster_EP1`
4. ทำต่อจนถึง p18b · ควรเห็น **podium 3 อันดับ** + **winner banner**
5. Login student B (ห้องเดียวกัน) · เลือก Nebula → count = 2/8
6. Login student อีกหลายคนจนเต็ม Nebula → student ที่ 9 ควรกด Nebula ไม่ได้ (เห็น "เต็มแล้ว")
7. กด refresh ที่ p18b · score รวมของทีมต้อง update

## Deployment

- ไม่ต้อง redeploy Apps Script
- Hard reload (Cmd+Shift+R) เพื่อบังคับโหลด `team-comp.js`, `media.js`, `book.js`, `p02-team.html`, `p18b-halloffame.html`

## ข้อควรระวัง

- **Race condition**: ถ้านักเรียน 2 คนกดยืนยันพร้อมกันตอนทีมเหลือ 1 ที่ → อาจเข้าทีมได้ทั้งคู่ (เกิน cap 1) · ระบบ refreshCapacity อีกครั้งก่อน register แต่ไม่ atomic · ยอมรับได้สำหรับ classroom scale
- **Class filter**: นักเรียนต้อง login ด้วย student account (มี `class` ใน localStorage `wave_student`) · ถ้าไม่มี class จะรวมข้ามห้อง
- **3 ห้องที่ใช้จริง**: 6.5 / 6.7 / 6.12 · เรียงด้วย natural sort (6.5 → 6.7 → 6.12) · ครูดูทั้ง 3 ห้องในการ์ดเดียวที่ Teacher Dashboard
- **Energy ของแต่ละ EP**: ตอนเปิด EP ใหม่ · `Book.state.energy` ยังเป็นของ EP เก่า → คะแนน Hall of Fame ของ EP ใหม่อาจปนกับ EP เก่า · ต้อง reset หรือ track per-EP แยก (สำหรับ MVP รับได้ · ครูเตือนนักเรียนว่าคะแนนรวมจาก quest ใน EP เท่านั้น)
