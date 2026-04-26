# Presentation · CSS, Animation, Visual Conventions

อ้างอิง: `lessons/astronomy/shared/book.css` (base) + `ep03/warprun.html` (boss visual)

---

## Color Palette (brand · ห้ามเปลี่ยน)

```css
/* Background tiers (dark space · NEVER bright) */
--bg-deep:    #02030a;   /* boss · climax */
--bg-medium:  #04050d;   /* normal pages */
--bg-tinted:  #0d1530;   /* recap pages */

/* Roles */
--text:       #e8ecf8;   /* body text · 100% legible */
--text-muted: #9aa3c0;   /* hints, subtitles */
--text-dim:   #6a7394;   /* very low priority */

/* Accent semantic colors (used consistently across all pages) */
--purple:  #b980ff;   /* boss, phase, mentor secondary */
--pink:    #ff5c7a;   /* danger, antagonist, wrong, low-HP */
--cyan:    #64d8ff;   /* info, drop targets, hints, links */
--green:   #7effb2;   /* correct, healthy, success, go */
--gold:    #ffcb6b;   /* currency, perfect, warning */
--bright-gold: #ffd700;  /* mystery box, crit, gold tier */
--lavender: #d4b8ff;  /* mentor voice, narrative */
--silver:  #c0c0c0;   /* silver tier */
--bronze:  #cd7f32;   /* bronze tier */
```

### When to use each
- **purple/pink combo**: boss arena, antagonist UI, danger zones
- **green/gold combo**: success, perfect, mystery box
- **cyan**: drop targets, draggable tokens, links, hints
- **lavender**: mentor (Dr.Hubble) voice cards · italic text

---

## Typography

```css
/* Headings + UI labels (sci-fi feel) */
font-family: 'Orbitron', sans-serif;
letter-spacing: 0.15em;  /* or 0.2em for emphasis */
text-transform: uppercase;

/* Body Thai */
font-family: ui-sans-serif, system-ui, sans-serif;
line-height: 1.6-1.7;
font-size: 14-16px;

/* Numbers, code, scores */
font-family: monospace;  /* or Orbitron monospace */
```

Load Orbitron via Google Fonts in book.css (already done):
```html
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
```

---

## Layout Conventions

### Page wrapper
```html
<body data-page="pXX" data-type="story|puzzle|setup|mixed|reflection">
  <div class="page">
    <!-- header (optional) -->
    <div class="lbl">...</div>      <!-- small badge top -->
    <h1>...</h1>                     <!-- big title -->
    <div class="tags">              <!-- K/P/A chips -->
      <span class="tag k">K1 m scale</span>
    </div>

    <!-- main content -->
    <div class="card">...</div>      <!-- generic content card -->
    <div class="step-card">...</div> <!-- 6-step lab card -->

    <!-- footer (always 2-button pair) -->
    <div class="btn-pair">
      <button class="submit-btn">💾 ส่ง</button>
      <button class="next-btn" id="nextBtn" disabled>🔒 รอ</button>
    </div>

    <!-- Teacher cue (always last in .page) -->
    <details class="tc">
      <summary>👩‍🏫 Teacher Cue · ...</summary>
      <div class="body">...</div>
    </details>
  </div>
</body>
```

### Cards / Containers
- `.card` · padding 16-20px · `rgba(22,27,58,0.85)` bg · 1px border · 14px radius
- `.step-card` · เหมือน card แต่มี `data-step` indicator
- `.q-prompt` · ของพิเศษ · มี icon + bold text · ใช้กับคำถาม

---

## Animations (จุดยืน UX)

### 1. Starfield BG (boss/climax pages)
```html
<canvas id="starfield"></canvas>
```
```css
#starfield { position:fixed; inset:0; z-index:0; pointer-events:none; }
/* All page content above starfield */
body > *:not(#starfield):not(.projectile):not(.dmg-pop):not(.beam-fx) {
  position:relative; z-index:2;
}
```
Init via setInterval (NOT rAF — fails in iframe):
```js
function tick() {
  ctx.fillStyle = 'rgba(2,3,10,0.35)';
  ctx.fillRect(0, 0, w, h);
  for (const s of stars) { /* twinkle */ }
  for (const ss of shootingStars) { /* trail */ }
}
setInterval(tick, 33);  // ~30fps · enough
```

### 2. Pulse glow (call-to-action)
```css
.pending-pulse { animation: tabPulse 1.4s ease-in-out infinite; }
@keyframes tabPulse {
  50% { box-shadow:0 0 14px rgba(255,203,107,0.55); background:rgba(255,203,107,0.2); }
}
```

### 3. Damage popup (floating numbers)
```css
.dmg-pop {
  position:fixed; pointer-events:none; z-index:9999;
  font-family:Orbitron,sans-serif; font-weight:900; font-size:32px;
  color:#ff5c7a; text-shadow:0 0 16px #ff5c7a, 0 2px 4px #000;
  animation: dmgFloat 1.1s ease-out forwards;
}
@keyframes dmgFloat {
  0%   { opacity:0; transform:scale(0.5); }
  18%  { opacity:1; transform:scale(1.3); }
  100% { opacity:0; transform:translateY(-70px) scale(1); }
}
```

### 4. Screen shake (player damaged)
```css
body.shake { animation: bodyShake .35s; }
@keyframes bodyShake {
  0%,100% { transform: translateX(0); }
  20% { transform: translate(-7px, 2px); }
  40% { transform: translate(6px, -3px); }
  60% { transform: translate(-4px, 3px); }
  80% { transform: translate(3px, -2px); }
}
body.flash-red::before {
  content:''; position:fixed; inset:0;
  background:radial-gradient(ellipse at center, rgba(255,30,80,0.35), transparent 70%);
  pointer-events:none; z-index:25; animation: flashFade .4s;
}
```

### 5. Phase transition overlay (boss)
```css
.phase-intro {
  position:fixed; inset:0; z-index:9000;
  display:flex; align-items:center; justify-content:center;
  background:radial-gradient(ellipse at center, rgba(185,128,255,0.3), rgba(2,3,10,0.95) 70%);
  backdrop-filter:blur(8px);
  animation: phaseIn 0.4s;
}
.phase-intro .card {
  padding:30px 50px; border:3px solid #b980ff; border-radius:18px;
  background:rgba(10,5,20,0.85);
  box-shadow:0 0 60px rgba(185,128,255,0.6);
  animation: phaseCard 0.6s;
}
@keyframes phaseCard {
  0%   { transform:scale(0.5) rotateY(180deg); opacity:0; }
  100% { transform:scale(1) rotateY(0); opacity:1; }
}
```

### 6. Mystery box float + open
```css
.mystery-box {
  width:140px; height:140px; cursor:pointer;
  background:linear-gradient(135deg, #6a4c93, #b980ff);
  border:3px solid #ffd700; border-radius:18px;
  box-shadow:0 0 40px rgba(255,215,0,0.5);
  animation: boxFloat 2s ease-in-out infinite;
}
@keyframes boxFloat {
  50% { transform:translateY(-8px); box-shadow:0 12px 50px rgba(255,215,0,0.7); }
}
.mystery-box.opened {
  animation: boxOpen 0.6s forwards; pointer-events:none;
}
@keyframes boxOpen {
  50%  { transform:scale(1.4) rotate(15deg); filter:brightness(2); }
  100% { transform:scale(0); opacity:0; }
}
```

---

## Critical UX rules

### 1. Energy HUD ต้องเด่นที่สุดในหน้า boss
```html
<div class="climax-bar">
  <div class="row1">
    <span class="supernova-timer">3:00</span>
    <span>WARP RUN · PHASE 1</span>
  </div>
  <div class="energy-hud">
    <div class="eh-label">⚡ ENERGY (พลังยานเรา)</div>
    <div class="eh-bar"><div class="eh-fill"></div></div>
    <div class="eh-text">300 / 300</div>
  </div>
</div>
```
- **ทำไม**: ⚡ icon ใช้ทั้ง Photon (global) และ Energy (boss) → user งง
- **แก้**: ใส่ ENERGY ในแถบสุดบน · มี label ภาษาไทยชัด · update ทันทีตอน drop

### 2. ปุ่มต้องบอกชัดว่าเหลืออะไร
```js
nextBtn.textContent = allDone 
  ? '▶ วัดดาว 3 ดวง →' 
  : '🔒 เหลือ: ' + missing.join(', ');
```

### 3. Status indicators แบบ 4 ชั้น
1. **Banner ด้านบน** (overall info: "หน้านี้มีกล่องสุ่ม")
2. **Status bar grid** (per-tab/per-step status)
3. **Tab buttons** (sub state · pending pulse + 👈 emoji)
4. **Submit/next button** (final gate · text บอกที่เหลือ)

### 4. Sticky elements ต้องไม่ทับเนื้อหา
- climax-bar: `position:sticky; top:0; z-index:30`
- Body padding-top หรือ scroll behavior ปกติ (sticky ไม่ทับ flow)

### 5. Floating elements (popups, modals)
- z-index hierarchy:
   - 25 = body flash overlay
   - 30 = sticky bars
   - 50-60 = projectiles, beams
   - 9000 = phase intro overlay
   - 9100 = mystery box modal
   - 9999 = damage popups

---

## Responsive notes

- iPad portrait: เป้าหลัก (1024px width)
- iPad landscape: ทำงานได้
- Phone: best-effort (ใช้ choices vertical แทน 2-col)

```css
@media(min-width:500px) { .choices { grid-template-columns:1fr 1fr; } }
@media(max-width:540px) { .stats { grid-template-columns:1fr; } }
```

---

## Print / Export
ไม่จำเป็น (เกมไม่ใช่ใบงานพิมพ์) · แต่ถ้าต้องการให้ผู้ปกครองดู screen → screenshot ผ่าน badge cert page เท่านั้น (`p19-map.html` exportPNG button)
