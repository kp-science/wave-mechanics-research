# Session Log · 2026-05-16 · Pace Control Fix + Astronomy P03 Video

**เป้าหมาย:** ทำให้ Teacher Pace Control ใช้ระบบ "เพดาน" (unlockedUpTo) อย่างเดียวตามที่ครูต้องการ · ลบ Auto-jump (🚀 ลากนักเรียน) ออก · แก้บั๊ก off-by-one ที่ทำให้นักเรียน "เลย" หน้าเพดานได้ 1 ก้าว

---

## ✅ สิ่งที่ทำเสร็จ (ตามลำดับ commit)

### 0. `774897a` — fix(astronomy/ep01): เปลี่ยนคลิปวิดีโอ hero ใน p03-collision
- เปลี่ยน YouTube video ID `tlTBO3uySDI` → `UU_LsYOg7M4`
- ลบพารามิเตอร์ `start=112&end=132` (เล่นตั้งแต่ต้นคลิป)
- คงค่า `rel=0&modestbranding=1&playsinline=1` ไว้
- ไฟล์: `lessons/astronomy/ep01/p03-collision.html:145`

### 1. `384e845` — fix(astronomy/pace): เพดานทำงานถูกต้อง — ล็อกตั้งแต่อยู่หน้าเพดาน
**🎯 บั๊กตัวจริงที่ทำให้นักเรียน "เลย" หน้าที่ครูล็อก**

- ครูล็อกที่ p08 → `unlockedIdx = 7`
- นักเรียนอยู่ p08 → `idx = 7`
- เดิม: `idx > unlockedIdx` → `7 > 7` = false → **ไม่ล็อก** → กดต่อไป p09 ได้ ❌
- แก้: `idx >= unlockedIdx` → `7 >= 7` = true → ล็อก ✅

แก้ 2 จุดใน `lessons/astronomy/shared/book.js`:
- บรรทัด 254 — `Book.next()` click handler
- บรรทัด 852 — `updateNextButtonLock()` visual state

หมายเหตุ: `pace-auto.js` (ใช้กับ physics3/SHM/waves/sound) เขียนถูกอยู่แล้ว (`pageOrder(cur) >= pageOrder(unlocked)`) — บั๊กอยู่เฉพาะใน Book framework ของ astronomy

### 2. `24fa652` — refactor(pace): ลบ Auto-jump (🚀) · ใช้ระบบเพดานอย่างเดียว
ครูยืนยันว่าต้องการระบบ "ตั้งเพดาน" ไม่ใช่ "ลากนักเรียนตาม":
- ครูตั้งเพดานหน้า X → คนถึง X แล้วถูกล็อกปุ่ม "ต่อไป"
- คนยังไม่ถึง X เดินตามจังหวะตัวเอง (ไม่ถูกลากย้อน-ลากตาม)

**KP-Classroom.html (Teacher Pace Panel):**
- ลบ checkbox `🚀 Auto-jump · เด้งนักเรียนพร้อมกัน` + helper text
- ปุ่มบนการ์ดเป็น `🔓 ปลดถึงนี่` เสมอ (ไม่ swap เป็น `🚀 พาทุกคนมาที่นี่`)
- hard-code `auto: false` ใน `paceSetCurrent()` · toast เป็น `🔓 ปลดถึง X`
- `paceLoadConfig()` คืน `false` เสมอ · `paceSaveConfig()` เป็น no-op

**book.js (astronomy ep01-ep02):**
- `Book.pace.onRemote()`: ตัด branch `pace.auto` · เรียก `showBanner()` อย่างเดียว
- `startAutoJump` / `cancelAutoJump` เก็บไว้เป็น dead code

**pace-auto.js (physics3/SHM/waves/sound + astronomy fallback):**
- `tick()`: ตัด branch `pace.auto` · แสดง banner `🔔 ครูพาไปหน้า X` อย่างเดียว
- `startAutoJump` / `cancelAutoJump` เก็บไว้เป็น dead code

### 3. `4b7add5` — refactor(pace): ปิด Auto-jump ใน PaceResolver · ครอบคลุม astronomy ep03-ep08
**🎯 ตกหล่นจากรอบที่แล้ว** — astronomy ep03-ep08 ไม่ได้ใช้ book.js สำหรับ pace แต่ใช้ `PaceResolver` ผ่าน `ep0X-boot.js`

- `pace-resolver.js:maybeForceJump()` → no-op (`return false` ที่บรรทัดแรก)
- เก็บ signature ไว้กัน caller ใน `ep0X-boot.js` พัง
- เพดานใน boot scripts ใช้ `unlockedIdx >= curIdx + 1` ถูกอยู่แล้ว → ไม่ต้องแก้

---

## 🗺 แผนที่ระบบ Pace · 4 ไฟล์ที่ทำงานคู่กัน

| ไฟล์ | ใช้ที่ไหน | เพดาน | Auto-jump (ก่อนแก้) |
|---|---|---|---|
| `lessons/astronomy/shared/book.js` | astronomy **ep01, ep02** (Cosmos Log G1) | ✅ แก้แล้ว | ✅ ลบแล้ว |
| `lessons/shared/pace-resolver.js` + `astronomy/shared/ep0X-boot.js` | astronomy **ep03-ep08** | ✅ ถูกอยู่แล้ว | ✅ ลบแล้ว |
| `lessons/shared/pace-auto.js` | physics3 (SHM, waves, sound) + astronomy fallback | ✅ ถูกอยู่แล้ว | ✅ ลบแล้ว |
| `KP-Classroom.html` (Teacher Panel) | ทุกวิชา | ✅ UI ลบแล้ว | ✅ hard-code `auto:false` |

---

## ⚠️ ความเข้าใจสำคัญที่ค้นพบระหว่างทาง

### Physics3 (SHM/waves/sound) — ระบบเพดาน "ไม่บังคับ"
- โครงสร้างแต่ละแผนคือ `แผนNN/สื่อNN_xxx.html` — เป็น **standalone** ไม่มีปุ่ม "ต่อไป" ระหว่างไฟล์
- ครูเลือกไฟล์เปิดเองทีละไฟล์ (ตามที่ครูยืนยัน)
- ผลของระบบเพดานใน physics3 = **banner สีฟ้าด้านบนแจ้งเตือน** เท่านั้น (`🔔 ครูพาไปหน้า X · กด ต่อไป เพื่อตาม`)
- ระบบเพดาน "ใช้ได้จริง" เฉพาะ astronomy เพราะมีปุ่ม "ต่อไป →" ระหว่างหน้า

### Selector รั่ว (ที่ผมเข้าใจผิดตอนแรก)
- ก่อนแก้บั๊ก `>=` ผมเข้าใจว่าปัญหาคือ selector ของ `pace-auto.js` หาปุ่มไม่ครบ
- จริง ๆ astronomy ใช้ book.js ที่มีปุ่ม "ต่อไป" มาตรฐาน (`#btn-next`) — selector ตรงอยู่แล้ว
- บั๊กตัวจริงคือ off-by-one ใน comparison (`>` แทน `>=`)

---

## 🧪 วิธีทดสอบ (สำหรับ session ถัดไป)

1. เปิด `KP-Classroom.html?course=astronomy` ในแท็บ ครู (เครื่อง 1)
2. เปิด `lessons/astronomy/ep01/p01-entry.html` ในแท็บ นักเรียน (เครื่อง 2)
3. นักเรียนเดินไปจนถึง p05 (กดผ่านปุ่ม "ต่อไป →")
4. ครูกด `🔓 ปลดถึงนี่` บนการ์ด p05 ใน Teacher Pace Panel
5. **คาดหวัง:** นักเรียนที่ p05 → ปุ่ม "ต่อไป" เปลี่ยนเป็น `🔒 รอครูปลดล็อค` ทันที (ไม่ใช่ตอน p06)
6. ครูกด `🔓 ปลดถึงนี่` บนการ์ด p06 → ปุ่มของนักเรียนปลดเป็น "ต่อไป →"
7. **ไม่ควรเห็น:** banner สีแดง-ม่วงพร้อม countdown 3 วิ (Auto-jump ลบออกแล้ว)

---

## 📂 ไฟล์ที่แก้ทั้งหมด

```
KP-Classroom.html
lessons/astronomy/ep01/p03-collision.html
lessons/astronomy/shared/book.js
lessons/shared/pace-auto.js
lessons/shared/pace-resolver.js
```

Sync ทั้ง 2 folders:
- `~/Documents/GitHub/wave-mechanics-research/` (push to origin)
- `~/Documents/วิจัย/wave-mechanics-research/` (mirror local)

---

## 🧹 Dead code ที่เก็บไว้ (ลบทีหลังได้)

หลังใช้งานราบลื่นสักพักลบเพื่อความสะอาด:

- `book.js:797-833` — `Book.pace.startAutoJump()` / `cancelAutoJump()` (no caller)
- `pace-auto.js:152-180` — `startAutoJump()` / `cancelAutoJump()` (no caller)
- `pace-auto.js:247-251` — `PaceAuto.cancelAutoJump` exposed บน window
- `pace-resolver.js:122-153` — `maybeForceJump` countdown internals + `cancelForceJump()` (no path เข้าถึงเพราะ `return false` ที่บรรทัดแรก)
- `KP-Classroom.html` — CSS class `.pace-lock-btn.auto` (no element ใช้แล้ว)
