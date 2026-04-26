# Shared Modules · API Reference

อ้างอิง code: `lessons/astronomy/shared/`

ทุก EP ใช้โมดูลเหล่านี้ร่วมกัน · load ตามลำดับ:

```html
<script src="../shared/firebase-config.js"></script>      <!-- Firebase init (optional) -->
<script src="./config.js"></script>                       <!-- EP_CONFIG -->
<script src="../../shared/pace-client.js"></script>       <!-- teacher pace -->
<script src="../shared/sync-client.js"></script>          <!-- multi-iPad room -->
<script src="../shared/voidhunter.js"></script>           <!-- antagonist meter -->
<script src="../shared/photon.js?v=2"></script>           <!-- Coin + Photon + ShopItems -->
<script src="../shared/role-view.js"></script>            <!-- role-based visibility -->
<script src="../shared/transition.js"></script>           <!-- cinematic transitions -->
<script src="../shared/touch-drag.js?v=1"></script>       <!-- drag-drop touch · only if needed -->
<script src="../shared/<epXX>-boot.js?v=2"></script>      <!-- LAST · uses all above -->
```

---

## 1. Boot (auto-init)

ใน `<epXX>-boot.js` · auto-runs on DOMContentLoaded · ไม่ต้องเรียกเอง

ทำอะไรบ้าง:
- Inject HUD (header pills, role badge)
- Wire Submit/Gate ถ้าเจอ `.submit-btn` + `.next-btn`
- Init Sync (auto-create SOLO room)
- Apply role-view (show/hide `[data-role]` elements)
- Setup `?solo=1` URL flag (skip teacher pace)

---

## 2. Chain (state ระหว่างหน้า)

```js
Chain.set('arya_password', 'ARYA');     // p02 decode
const pwd = Chain.get('arya_password'); // p03 use
Chain.all();                             // ทั้งหมด
Chain.clear();                           // เคลียร์ end of EP
```
- Storage: `localStorage` key `cosmosLog_<ep>_chain` (JSON)
- Use case: pass narrative state (decoded password, unlocked gates, story flags)

---

## 3. Gate (next button gating)

ปุ่ม "ไปต่อ" ใน 2-button pair · มี 2 unlock conditions:
1. นักเรียน submit แล้ว
2. ครูเปิด gate (teacher pace controls)

```js
// Setup (Submit.wirePair calls this automatically)
Gate.wireButton('p08', nextBtn, 'p09-absolute.html', { requireSubmit: true });

// After student submits
Gate.markSubmitted();

// Teacher pace check (auto, every 2s + on broadcast)
// → ถ้า pace.unlockedUpTo >= curIdx+1 → open
```

States:
- ❌ Disabled · `🔒 ส่งผลก่อน · จึงไปต่อได้`
- ❌ Disabled · `🔒 รอครูเปิดประตู...` (teacher locked)
- ✅ Enabled · `▶ ไปต่อ`
- ✅ Enabled · `▶ ไปต่อ (ประตูเปิด)` (teacher gate-open highlight)

URL `?solo=1` → bypass teacher · ใช้ submit เป็น gate เดียว

---

## 4. Submit.wirePair (auto-wire submit + next)

**ใช้ทุกหน้าที่มี submit + next** (ส่วนใหญ่):

```js
Submit.wirePair({
  page: 'p08',
  nextHref: 'p09-absolute.html',
  getPayload: () => {
    if (!allComplete) { alert('ทำให้ครบก่อน'); throw new Error('incomplete'); }
    return { tag, score, answers, ... };
  },
  isPerfect: (payload) => payload.score === payload.total,
  onSubmit: (mode, coin) => {
    // mode = 'ok' or 'perfect' · coin = bonus from EP_CONFIG.coin.perfectBonus
    // Show result UI
  },
});
```

- Submit click → record payload to localStorage + Sync.recordDecision + lock submit
- `isPerfect` → ถ้า true · award `EP_CONFIG.coin.perfectBonus[page]` · pass to onSubmit
- Next button auto-wired with Gate (requireSubmit: true)

---

## 5. Coin / Photon / ShopItems

### Coin (global currency)
```js
Coin.get()                        // → number
Coin.add(20, 'p05-perfect')       // increase + log source
Coin.spend(40, 'shop:lensPro')    // decrease · false if insufficient
Coin.awardPerfect('p08')          // looks up EP_CONFIG.coin.perfectBonus[page]
```
Storage: `cosmosLog_coin`

### Photon (global currency · for beacon)
```js
Photon.get()
Photon.add(40, 'p15-clear')
Photon.spend(300, 'beacon')       // ส่ง beacon
Photon.change(-10, 'vh-shoot')    // alias for negative add
```
Storage: `cosmosLog_photon`

### ShopItems (shop inventory)
```js
ShopItems.load()                 // { id: { uses, boughtAt }, ... }
ShopItems.has(id)
ShopItems.getUses(id)             // → 0 if not owned
ShopItems.buy(id)                 // หัก coin + เพิ่ม uses · false if can't
ShopItems.use(id)                 // ลด uses 1 · false if 0
ShopItems.grant(id, addUses)      // ฟรี (จาก mystery box) · stack uses
ShopItems.reset()                 // เคลียร์ทั้งหมด (ระวัง!)
```
Storage: `cosmosLog_<ep>_shopItems` (per-EP)

---

## 6. Sync (multi-iPad)

Auto-creates SOLO room ถ้าไม่มี team:
```js
Sync.getMe()                      // { id, name, role }
Sync.getState()                   // { roster, room }
Sync.recordDecision({ tag, note })  // บันทึก action ลง room log (Firebase)
```
- Sync ใช้ Firebase Realtime DB (config ใน firebase-config.js)
- ถ้า Firebase ล่ม → fallback ไป localStorage SOLO

---

## 7. Role (role-based visibility)

```html
<!-- This panel shows only to Engineer role -->
<div data-role="eng">เรดาร์ของช่าง</div>

<!-- Multiple roles -->
<div data-role="nav,med">ปุ่ม WARP + Vital</div>

<!-- Always show (default) -->
<div>ทุกคนเห็น</div>
```

```js
Role.applyToPage()                // hide/show based on Sync.getMe().role
Role.current()                    // 'nav' | 'eng' | 'med' | 'mech' | null
Role.is('nav', 'med')             // boolean · is current role any of these
Role.isObserver()                 // not joined yet
Role.isSolo()                     // 1 person → see all
Role.renderBadge()                // show role pill bottom-right
```

Solo mode → ทุก `[data-role]` แสดงเสมอ

---

## 8. Transition (cinematic between pages)

```js
Transition.play('p17-to-p18', () => {
  location.href = 'warprun.html';
});
```

Transition tags ใน `transition.js` map → animation type:
- 'p15-to-p16' = supernova flash · explosion fade
- 'p17-to-p18' = wormhole zoom
- ฯลฯ

หรือ wire automatically with next button:
```js
Transition.wireNext(nextBtn, 'p18-to-p19', 'p19-map.html');
```

---

## 9. TouchDrag (iPad drag-drop)

```js
// Make element draggable (touch + mouse)
TouchDrag.makeDraggable(token, () => 'star-id');

// Make zone droppable
TouchDrag.makeDropTarget(zone, (payload, clientX, clientY) => {
  // handle drop · payload from getter above
});
```

Internals:
- touchstart → spawn ghost (cloneNode + position fixed) follows finger
- touchmove → update ghost · highlight target via elementsFromPoint
- touchend → call drop target's `__touchDrop(payload, x, y)`
- Auto-injects CSS `.touch-drag-over` for hover state

ใช้คู่กับ HTML5 drag-drop เดิม (mouse) · ไม่ทับซ้อน

---

## 10. VoidHunter (antagonist meter)

```js
VoidHunter.get()                       // → 0-100 (% safety meter)
VoidHunter.change(-10, 'page-tick')    // ลด meter
VoidHunter.change(+20, 'warp')          // เพิ่ม
VoidHunter.set(60)                     // override
VoidHunter.wrongAnswer('p15')           // shortcut for wrong answer penalty
VoidHunter.renderHUD()                 // pill top-left
```

Storage: `cosmosLog_<ep>_vh` 
Configured via `EP_CONFIG.voidhunter`:
```js
voidhunter: {
  start: 60,                 // %
  tickPerPage: -5,
  safeHavens: ['p00','p01','p18'],
  warpBonus: +20,
  beaconPenalty: -30,
  cloakFreeze: true,
  wrongAnswer: -10,
  loseAt: 0,
}
```

---

## 11. PaceClient (teacher pace)

```js
PaceClient.peek(roomId, mode, fallback)
  // → { unlockedUpTo: 'p08', updatedAt }

PaceClient.set('p08', mode)              // teacher only
```
- `mode = 'local'` (localStorage broadcast) หรือ `'remote'` (Apps Script)
- Solo students ignore (URL ?solo=1 หรือ no pace set)

---

## Common patterns

### Pattern: Submit + Mystery Box (Lab Note)
```js
function submitNote() {
  state.noteSubmitted = true;
  renderStmtList(...);  // re-render with feedback shown
  updateNoteGate();
  setTimeout(() => showMysteryBox(), 500);
}
function showMysteryBox() {
  const wrong = computeWrong();
  const tier = rewardTier(wrong);
  const rewards = rollReward(tier);
  // ... build modal with mystery box image clickable
}
```

### Pattern: Page navigation with Transition
```js
// In Submit.wirePair onSubmit:
onSubmit: () => {
  Transition.play('p15-to-p16', () => {
    Submit.markComplete();
  });
},
// Or button hookup:
Transition.wireNext(nb, 'p16-to-p19', 'p19-map.html');
```

### Pattern: Chain state across pages
```js
// p02 decode SOS:
Submit.wirePair({
  page: 'p02',
  nextHref: 'p02b-genesis.html',
  getPayload: () => {
    Chain.set('arya_password', decodedWord);
    return { decoded: decodedWord };
  },
});

// p03 join:
const pwd = Chain.get('arya_password');
if (typedPwd === pwd) { Chain.set('joined', true); /* unlock */ }
```
