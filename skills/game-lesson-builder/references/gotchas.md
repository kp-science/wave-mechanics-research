# Gotchas · Common Bugs from EP03 Development

อ่านก่อนเริ่ม EP ใหม่เพื่อหลีกเลี่ยงปัญหาที่ผ่านมา

---

## 1. Cache Busting (ทุกครั้งที่แก้ shared/)

**ปัญหา**: แก้ `shared/photon.js` แล้ว · browser ใช้ cached version · code ใหม่ไม่ effect

**แก้**: เพิ่ม `?v=N` query string ที่ script tag ของทุก page ที่ใช้:
```html
<script src="../shared/photon.js?v=2"></script>
<script src="../shared/ep03-boot.js?v=2"></script>
<script src="../shared/touch-drag.js?v=1"></script>
```

ใช้ sed bump ทุก page:
```bash
for f in *.html; do
  sed -i '' 's|shared/photon\.js[^"]*"|shared/photon.js?v=3"|g' "$f"
done
```

---

## 2. requestAnimationFrame (rAF) ไม่ fire ใน iframe preview

**ปัญหา**: animation ที่ใช้ rAF (projectile, starfield) ไม่ทำงานใน Claude preview

**แก้**: ใช้ `setInterval(fn, 16)` (~60fps) หรือ `setInterval(fn, 33)` (~30fps) แทน

```js
// ❌ ไม่ทำงานใน preview iframe
function animate() {
  // update positions
  if (continue) requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// ✅ ทำงานทุกที่
const timer = setInterval(() => {
  // update positions
  if (!continue) clearInterval(timer);
}, 16);
```

---

## 3. HTML5 drag-drop ไม่ fire บน iPad/touch

**ปัญหา**: ลากด้วยนิ้วบน iPad · `dragstart` ไม่เกิด · activity ใช้ไม่ได้

**แก้**: ใช้ `shared/touch-drag.js` ควบคู่:
```js
// Mouse drag (HTML5 native)
token.draggable = true;
token.ondragstart = (e) => {
  e.dataTransfer.setData('p', payload);
  e.dataTransfer.setData('text/plain', payload);  // fallback MIME
};

// Touch drag (TouchDrag fallback)
if (typeof TouchDrag !== 'undefined') {
  TouchDrag.makeDraggable(token, () => payload);
}

// Same for drop:
zone.ondrop = (e) => { /* mouse */ };
TouchDrag.makeDropTarget(zone, (payload, x, y) => { /* touch */ });
```

---

## 4. body > * z-index rule ทับ position:fixed

**ปัญหา**: ใส่ rule `body > * { position:relative; z-index:2; }` (เพื่อให้อยู่เหนือ starfield) → ทับ `.projectile { position:fixed; }` ทำให้ projectile ไม่เคลื่อนที่

**แก้**: exclude FX classes ใน body rule:
```css
body > *:not(#starfield):not(canvas):not(.projectile):not(.projectile-trail):not(.beam-fx):not(.dmg-pop):not(.phase-intro) {
  position:relative;
  z-index:2;
}
```

---

## 5. Custom MIME drag types ไม่รองรับทุก browser

**ปัญหา**: `dataTransfer.setData('star', id)` ใช้ได้ใน Chrome แต่ Safari/Firefox อาจไม่ get ได้

**แก้**: setData ทั้ง custom + 'text/plain':
```js
e.dataTransfer.setData('star', id);
e.dataTransfer.setData('text/plain', id);

// On drop:
let id = e.dataTransfer.getData('star');
if (!id) id = e.dataTransfer.getData('text/plain');
```

---

## 6. Energy vs Photon confusion (UX)

**ปัญหา**: ทั้ง 2 ใช้ ⚡ icon → user สับสนว่า ⚡240 บนหัวคือพลังงานในเกม (ไม่ใช่ · นั่นคือ Photon currency)

**แก้**: 
- ใส่ ENERGY HUD แยกที่หัวหน้า boss · มี label ภาษาไทย "พลังยานเรา"
- Update ENERGY HUD ทันทีตอน drop (visible flash)
- Photon pill อยู่มุมขวา · เก็บ minimal

```html
<div class="climax-bar">
  <div class="energy-hud">
    <div class="eh-label">⚡ ENERGY (พลังยานเรา)</div>
    <div class="eh-bar"><div class="eh-fill"></div></div>
    <div class="eh-text">300 / 300</div>
  </div>
</div>
```

---

## 7. Submit + Next gating · ห้ามวาง custom logic

**ปัญหา**: เขียน custom enable/disable logic แล้วชน Gate · button stuck

**แก้**: ใช้ `Submit.wirePair` เสมอ · Gate จะ wire next-button auto:
```js
Submit.wirePair({
  page: 'pXX',
  nextHref: 'next.html',
  getPayload: () => { /* throw if incomplete */ },
  onSubmit: () => { /* show result */ },
});
// ห้ามแตะ nextBtn.disabled หลังจากนี้
```

**ถ้าต้องการ require submit + reflect ครบ ก่อน next**:
- ใน `updateNoteGate()` (custom function) เช็ค + เรียก `Gate.markSubmitted()` เฉพาะตอนที่ครบ
- Gate's `requireSubmit` flag ทำงานคู่ pace check

---

## 8. Curriculum scope · ระวังเกินหลักสูตร

**ปัญหา**: ใส่สูตรขั้นสูง (เช่น `M = m − 5×log₁₀(d/10)`) ซึ่งเกินหลักสูตรพื้นฐาน ม.ปลาย ไทย

**แก้**: 
- ตรวจสอบกับครูประจำวิชาก่อน
- ถ้าจำเป็นต้องใส่ → ทำ optional · ครูเปิดได้
- เปลี่ยน calculation activity → conceptual review (เช่น "ดาว 2 ดวงตาเห็นเท่ากัน · ดวงไกล สว่างจริง?" — ไม่ต้องคำนวณ)

---

## 9. Page navigation order vs config order

**ปัญหา**: page id ใน config (`p17`, `p18`, `p19`) ไม่ตรงกับลำดับเล่นจริง · footer "← p18 / p19 →" สับสน

**แก้**: 
- Config `pages` array order = lesson play order (footer ใช้ array order ไม่ใช่ id)
- ตั้งใจ id ให้ stable · แม้สลับ order id ก็ไม่ต้องเปลี่ยน
- Submit `nextHref` ต้องตาม actual flow · ไม่ใช่ตาม id

```js
// config.js
pages: [
  ...
  { id:'p16', file:'p16-recap.html', ... },     // play 19th
  { id:'p19', file:'p19-map.html', ... },       // play 20th (post-test)
  { id:'p17', file:'shop.html', ... },          // play 21st
  { id:'p18', file:'warprun.html', ... },       // play 22nd (boss)
  { id:'p19b', file:'p19b-journal.html', ... }, // play 23rd (final)
],
```

---

## 10. Localstorage namespace collision

**ปัญหา**: หลาย EP ใช้ localStorage key เดียวกัน · state ของ EP02 leak มา EP03

**แก้**: prefix per-EP เสมอ:
```js
const KEY = 'cosmosLog_ep03_chain';      // ✅
const KEY = 'cosmosLog_chain';           // ❌ shared across EP
```

ยกเว้น **global currencies** (Coin, Photon) ที่ตั้งใจ cross-EP:
```js
const KEY_COIN = 'cosmosLog_coin';       // ✅ no ep prefix
const KEY_PHOTON = 'cosmosLog_photon';   // ✅
```

---

## 11. Sync auto-room มาก่อน boot ที่ใช้

**ปัญหา**: code ที่ใช้ `Sync.getMe()` รันก่อน Sync auto-create SOLO room · null pointer

**แก้**: เรียก code หลัง `setTimeout(..., 150-200)` ใน init:
```js
setTimeout(() => {
  if (Photon.get() === 0) Photon.add(240, 'init');
  renderAll();
  watchGate();
}, 150);
```

หรือใช้ `EP03Boot.ready` callback (ถ้ามี).

---

## 12. Teacher console · default ต้องเป็น local mode

**ปัญหา**: `teacher.html` ตั้ง mode='remote' default → ต้อง config Apps Script ก่อนใช้ → ครูใช้ไม่ได้ทันที

**แก้**: default `mode='local'` (BroadcastChannel) · `?mode=remote` opt-in:
```js
const mode = new URLSearchParams(location.search).get('mode') || 'local';
```

---

## 13. ?solo=1 ต้อง bypass teacher pace + sync

**ปัญหา**: นักเรียนทดสอบเอง · ครูไม่ได้ set pace · ปุ่มล็อกค้าง

**แก้**: ทุกที่ที่เช็ค pace ต้องเช็ค `?solo=1` ก่อน:
```js
const FORCE_SOLO = new URLSearchParams(location.search).get('solo') === '1';
if (FORCE_SOLO) return; // skip teacher pace check
```

---

## 14. Page transition timing

**ปัญหา**: Transition เล่นยังไม่จบ · location.href ตัด animation
หรือ Transition ตั้ง callback แต่ไม่เคย fire

**แก้**: ใช้ `Transition.play(tag, callback)` รูปแบบ + fallback:
```js
if (typeof Transition !== 'undefined') {
  Transition.play('p17-to-p18', () => location.href = 'warprun.html');
} else {
  location.href = 'warprun.html';
}
```

---

## 15. Phase HP vs Total HP

**ปัญหา**: boss HP bar แสดง phase HP (100) แต่ใช้ totalHP (300) ในการคำนวณ percentage

**แก้**: ระบุชัด:
```js
// Total HP bar (เห็นทั้ง 3 phase)
hpFill.style.width = (state.hpLeft / cfg.totalHP * 100) + '%';
hpText.textContent = state.hpLeft + ' / ' + cfg.totalHP;

// Phase indicator แยก (option)
phaseTag.textContent = `PHASE ${state.phase+1} / 3 · ${cfg.phases[state.phase].name}`;
```

---

## Pre-launch checklist

ก่อน deploy EP ใหม่:

- [ ] ทุก page โหลด shared scripts ครบ + version cache-bust ตรงกัน
- [ ] ?solo=1 ใช้ได้ทุกหน้า (ทดสอบ play through end-to-end คนเดียว)
- [ ] Submit + Next gating ปกติ (ไม่ค้าง · ไม่ skip)
- [ ] Pre-test (p01) parallel กับ post-test (p19) · question count ตรง
- [ ] Boss totalHP = sum of phase HPs
- [ ] Misconception ทุก M-code ใช้ครบ (pre-test + lesson + post-test)
- [ ] Mystery box: tier 1, 2, 3 รัน + reward apply จริง
- [ ] Multi-ending: ทดสอบทุก ending path
- [ ] Teacher cue ทุกหน้า · เปิดอ่านเข้าใจ
- [ ] Firebase config ใส่ค่าจริง (หรือ fallback ไป SOLO mode)
- [ ] No console errors ในทุกหน้า
- [ ] Touch drag-drop test บน iPad จริง (ไม่ใช่แค่ desktop)
