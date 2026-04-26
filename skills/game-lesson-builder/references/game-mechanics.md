# Game Mechanics · Currencies, Boss, Shop, Mystery Box

อ้างอิง code: `lessons/astronomy/shared/photon.js`, `ep03/warprun.html`, `ep03/shop.html`

---

## 1. Currency System

### 🪙 Coin (global · cross-EP)
- **เก็บจาก**: perfect quiz · mystery box · stage clear bonus
- **ใช้กับ**: ซื้อ items ใน shop
- **API**:
  ```js
  Coin.get()                              // อ่านยอด
  Coin.add(20, 'p05-perfect')             // เพิ่ม + log source
  Coin.spend(40, 'shop:parallaxLensPro')  // หัก · return false ถ้าไม่พอ
  Coin.awardPerfect('p08')                // ใช้ EP_CONFIG.coin.perfectBonus[page]
  ```
- **Storage**: `localStorage` key `cosmosLog_coin` (ไม่มี ep prefix · เก็บข้าม EP)

### ⚡ Energy (per-fight · boss only)
- **เริ่ม**: 300 ตอนเข้า boss
- **ใช้**: ทุกการตอบ −8 (action cost) · ตอบผิด −26 · โดน boss ยิง −30
- **0 = lose** → ending D
- **State**: in-memory · `state.energy` (ไม่ persist)

### ✦ Photon (global · cross-EP)
- **เก็บจาก**: กิจกรรมตามหน้า · `EP_CONFIG.photon.earn[pageId]` (max per page)
- **ใช้กับ**: ส่ง beacon (300✦ default · 200✦ ถ้ามี Beacon Amplifier)
- **API**: `Photon.get() / .add() / .spend()`
- **Storage**: `cosmosLog_photon`

---

## 2. Combo / Streak

ใช้ใน boss + บางหน้า activity:
```js
state.streak = 0;       // reset บน wrong
state.streak++;         // บน correct
const mult = state.streak >= 5 ? 2.0 : state.streak >= 3 ? 1.5 : 1.0;
damage = baseDamage * mult;
```

**Visual**: เมื่อ streak ≥3 ให้แสดง "🔥×1.5!" ใน feedback toast (sm) + flash

---

## 3. Boss Fight (อ้างอิง warprun.html)

### Config schema (ใน config.js)
```js
warpRun: {
  totalHP: 300,
  vhChargeSec: 10,        // VH ชาร์จยิง 10 วิ
  vhDamage: 30,           // ⚡ ที่ถูกหักเมื่อ VH ยิง
  vhMeterPenalty: 10,     // 👁 meter −10%
  baseDamage: 10,         // damage/ตอบถูก (×streak/boost)
  attackCost: 8,          // ⚡ ทุกการตอบ
  wrongPenalty: 18,       // ⚡ extra เมื่อตอบผิด (รวม attack = 26)
  streakMult: { 3:1.5, 5:2.0 },
  phases: [
    { id:1, name:'SCALE INVERTER', hp:100, cat:'magnitude',
      voidClaim:'เลขน้อย = หรี่ใช่ไหม?',
      questions: [ { q, a, c, cat, tier } ... ] },
    { id:2, name:'DISTANCE FAKER', hp:100, cat:'parallax', ... },
    { id:3, name:'UNIT CONFUSER', hp:100, cat:'parallax', ... },
  ],
}
```

### Visual centerpiece (CSS-animated boss eye)
```html
<div class="boss-eye" id="bossEye">
  <div class="glow"></div>
  <div class="ring"></div>            <!-- 3 rings rotating different speeds -->
  <div class="ring r2"></div>
  <div class="ring r3"></div>
  <div class="iris"></div>            <!-- gradient · pulse -->
  <div class="pupil"></div>
  <div class="charge-arc" id="chargeArc"></div>  <!-- conic-gradient · fills -->
</div>
```
- `.boss-eye.danger` ที่ ≥75% charge → red pulse
- `.boss-eye.hit` ที่โดน damage → flash + scale

### Charge → Shoot
```js
setInterval(tickCharge, 100);
function tickCharge() {
  const pct = (Date.now() - state.chargeStart) / 1000 / cfg.vhChargeSec * 100;
  document.getElementById('chargeArc').style.background =
    `conic-gradient(from -90deg, #ff5c7a 0%, #ff5c7a ${pct}%, transparent ${pct}%)`;
  if (pct >= 100) vhShoot();
}
function vhShoot() {
  spawnBeam();           // red laser eye → energy stat
  loseEnergy(cfg.vhDamage, 'VOIDHUNTER ยิงเรา!');
  document.body.classList.add('shake', 'flash-red');
  setTimeout(() => document.body.classList.remove('shake', 'flash-red'), 350);
}
```

### Projectile (player → boss)
```js
function spawnProjectile(fromBtn, crit, onHit) {
  const fromRect = fromBtn.getBoundingClientRect();
  const toRect = document.getElementById('bossEye').getBoundingClientRect();
  // ...spawn .projectile div, animate via setInterval (NOT rAF · iframe issue)
  // call onHit at t=1
}
```

### Beam (boss → energy stat)
```js
function spawnBeam() {
  const a = boss.getBoundingClientRect();
  const b = energyStat.getBoundingClientRect();
  const len = Math.sqrt(...), ang = Math.atan2(...);
  const beam = document.createElement('div');
  beam.className = 'beam-fx';
  beam.style.left = a.cx + 'px';
  beam.style.transform = `rotate(${ang}deg)`;
  beam.style.width = len + 'px';
  document.body.appendChild(beam);
  setTimeout(() => beam.remove(), 500);
}
```

### Phase transition overlay
```js
function showPhaseIntro() {
  const ph = cfg.phases[state.phase];
  const overlay = document.createElement('div');
  overlay.className = 'phase-intro';
  overlay.innerHTML = `<div class="card">
    <h1>PHASE ${state.phase+1} / 3</h1>
    <h2>${ph.name}</h2>
    <div class="claim">VOID: "${ph.voidClaim}"</div>
  </div>`;
  document.body.appendChild(overlay);
  setTimeout(() => overlay.classList.add('out'), 1400);
  setTimeout(() => overlay.remove(), 1900);
}
```

---

## 4. Shop System (อ้างอิง shop.html)

### Items config (ใน EP_CONFIG.shop.items)
```js
shop: {
  items: [
    { id:'parallaxLensPro', icon:'🔭', name:'Parallax Lens Pro',
      desc:'Parallax Q · damage ×2 · 3 ครั้ง',
      cost:40, type:'boost', cat:'parallax', mult:2, uses:3 },
    { id:'galacticAlmanac', icon:'📜', name:'Galactic Almanac',
      desc:'Magnitude Q · damage ×2 · 3 ครั้ง',
      cost:40, type:'boost', cat:'magnitude', mult:2, uses:3 },
    { id:'precisionScope',  icon:'🎯', name:'Precision Scope',
      desc:'Random Q · damage ×2 · 2 ครั้ง',
      cost:60, type:'boost', cat:'any',       mult:2, uses:2 },
    { id:'shieldPlus',      icon:'🛡️', name:'Reinforced Shield',
      desc:'block VOIDHUNTER shot · 2 ครั้ง',
      cost:80, type:'passive',                uses:2 },
    { id:'cloak',           icon:'🌑', name:'Cloak',
      desc:'skip 1 Q (auto-pass)',
      cost:30, type:'oneshot',                uses:1 },
    { id:'chronos',         icon:'⏱️', name:'Chronos Booster',
      desc:'VOIDHUNTER charge 15 วิ (แทน 10) · ถาวร',
      cost:100, type:'passive',               uses:Infinity },
    { id:'beaconAmp',       icon:'💌', name:'Beacon Amplifier',
      desc:'ลด beacon cost 300✦ → 200✦',
      cost:50, type:'passive',                uses:1 },
  ],
},
```

### Strategy hints (แสดงใน shop UI)
```
DPS  (ยิงแรง) : 🔭+ 📜+ 🌑 = 🪙110
Tank (รอด)   : 🛡️+ ⏱️       = 🪙180
Ending A      : 💌+ + อะไรก็ได้
Balance       : 🎯+ 🛡️       = 🪙140
```

### Purchase flow
```js
ShopItems.buy(id)        // หัก coin + เพิ่ม uses · false ถ้าไม่พอ
ShopItems.use(id)        // ลด uses 1 · false ถ้าหมด
ShopItems.has(id)
ShopItems.getUses(id)
ShopItems.grant(id, n)   // ให้ฟรี (จาก mystery box) · ไม่หัก coin
```

---

## 5. Mystery Box (Reward Tier System)

ใช้หลัง: lab note submit · boss victory · perfect quiz

### Tier logic
```js
function rewardTier(wrong) {
  if (wrong === 0) return { tier:1, slots:3, label:'PERFECT', cls:'t1',
    coin:[40,70], photon:[60,100], itemPool:'all' };
  if (wrong <= 3) return { tier:2, slots:2, label:'GOOD', cls:'t2',
    coin:[15,35], photon:[25,55], itemPool:'all' };
  return { tier:3, slots:1, label:'PASS', cls:'t3',
    coin:[10,20], photon:[15,30], itemPool:'cheap' };
}
```

### Roll
```js
function rollReward(tier) {
  const types = ['coin','energy','item'].sort(() => Math.random()-0.5).slice(0, tier.slots);
  return types.map(t => {
    if (t === 'coin')   return { type:t, icon:'🪙', value:rand(tier.coin), name:'COIN' };
    if (t === 'energy') return { type:t, icon:'⚡', value:rand(tier.photon), name:'PHOTON' };
    if (t === 'item') {
      const pool = tier.itemPool === 'cheap' 
        ? items.filter(it => it.cost <= 60) : items;
      const it = pool[rand(0, pool.length-1)];
      return { type:t, icon:it.icon, name:'ITEM', value:it.name, itemId:it.id };
    }
  });
}
```

### Apply
```js
rewards.forEach(r => {
  if (r.type === 'coin')   Coin.add(r.value, 'mystery');
  if (r.type === 'energy') Photon.add(r.value, 'mystery');
  if (r.type === 'item')   ShopItems.grant(r.itemId);
});
```

### UI: 3 components
1. **Banner** ด้านบนหน้า (user เห็นตั้งแต่เริ่ม):
   ```
   🎁 หน้านี้มีกล่องสุ่ม · ผิด 0 → 3 ชิ้น · ผิด 1-3 → 2 · ผิด 4+ → 1
   ```
2. **Modal** หลังจบ activity:
   - Tier tag (PERFECT/GOOD/PASS)
   - Mystery box icon (cursor pointer · clickable)
   - คลิกเปิด → boxOpen animation → reveal slots one by one (500ms each)
   - Close button enabled หลัง slot สุดท้ายโผล่
3. **Slots** แสดงพร้อมไอคอน + ชื่อ + +value + desc

---

## 6. Touch + Drag-Drop System

ใช้ `shared/touch-drag.js` (TouchDrag global)

### Pattern: dual binding (mouse + touch)
```js
// 1. Setup token (draggable)
function makeToken(payload) {
  const t = document.createElement('div');
  t.className = 'token';
  t.draggable = true;
  // Mouse drag
  t.ondragstart = (e) => {
    e.dataTransfer.setData('p', payload);
    e.dataTransfer.setData('text/plain', payload);  // fallback MIME
  };
  // Touch drag (TouchDrag fallback)
  if (typeof TouchDrag !== 'undefined') {
    TouchDrag.makeDraggable(t, () => payload);
  }
  return t;
}

// 2. Setup drop target
function setupTarget(zone, onDrop) {
  // onDrop(payload, clientX, clientY) — shared logic
  zone.ondragover = (e) => e.preventDefault();
  zone.ondrop = (e) => {
    e.preventDefault();
    let p = e.dataTransfer.getData('p');
    if (!p) p = e.dataTransfer.getData('text/plain');
    onDrop(p, e.clientX, e.clientY);
  };
  if (typeof TouchDrag !== 'undefined') {
    TouchDrag.makeDropTarget(zone, onDrop);
  }
}
```

### Why dual? 
HTML5 drag-drop ไม่ fire บน iPad/touch devices · TouchDrag wraps touchstart/move/end + ghost element + elementsFromPoint detection

---

## 7. Tuning numbers (จาก EP03 testing)

ตัวเลขที่ผ่าน playtest แล้ว · ใช้เริ่มต้นได้:

| Stat | Boss | Lab quiz |
|---|---|---|
| Total HP | 300 | n/a |
| Phase HP | 100 ×3 | n/a |
| baseDamage | 10 | n/a |
| Streak ×1.5 at | 3 | 3 |
| Streak ×2.0 at | 5 | 5 |
| Energy start | 300 | n/a |
| Action cost | 8 | n/a |
| Wrong extra | 18 (total 26) | n/a |
| VH charge sec | 10 (15 with chronos) | n/a |
| VH damage | 30 | n/a |
| VH meter penalty | 10% | n/a |
| Supernova countdown | 180s (3 min) | n/a |

### Coin economy ต่อ EP
- Pre-test perfect: 5 coin
- Stage perfect bonuses: 5-30 coin/stage (สูงสุด ~140 coin)
- Boss reward box: 40-70 coin (PERFECT)
- Total: ~200-250 coin ต่อ EP
- Shop: ปกติซื้อได้ 2-3 items (cheap strategy) หรือ 1 dvd (expensive)
