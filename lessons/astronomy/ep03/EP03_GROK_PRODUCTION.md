# 🎬 EP03 · Grok Imagine Production Pack
## COSMOS LOG · เสียงร้องจากอดีต · Parallax & Standard Candles

> Tool: **Grok Imagine** (image→video) · 8s/shot · 16:9
> 20 ช็อตที่เหลือ (Clip 4–8) · ~2:40 รวม
> หมายเหตุ: Grok ไม่บล็อกชื่อจริง/ภัย/ดวงตาสีแดง · ใส่ตรงๆ ได้

---

## 📦 Reusable Ingredients (อัปโหลดเป็น reference image ก่อนเริ่ม)

| Asset | ใช้จาก |
|---|---|
| `arya-reference.png` | EP01 ImageFX (Asian Thai female commander, navy jumpsuit) |
| `bridge-interior.png` | EP01 ImageFX |
| `hubble-character.png` | EP01 ImageFX (elderly Asian professor) |
| `void-antagonist.png` | EP01 ImageFX (multilayered shadow, 3 pairs of red eyes) |
| **NEW** `bolt-character.png` | สร้างใหม่ — วิศวกรหนุ่มไทย ผิวคล้ำ ผมรุงรัง ตาสว่าง · jumpsuit ส้ม-เทา |
| **NEW** `ken-character.png` | สร้างใหม่ — นักวิทย์หนุ่มไทย แว่นตา ใบหน้าใจเย็น · jumpsuit ฟ้าอ่อน |
| **NEW** `mira-character.png` | สร้างใหม่ — นักดาราศาสตร์หญิงไทย ผมหยิกสั้น · jumpsuit เขียวเทา |
| **NEW** `galaxy-edge-bg.png` | ขอบกาแล็กซีก้นหอย · ดาวหนาแน่น · ฝุ่นจักรวาลสีม่วง-ฟ้า |

> **NEW ingredient prompt** (ใช้สร้างใน Grok Imagine หรือ ImageFX):
> ```
> Three young Thai cadets (man with messy hair + orange jumpsuit, man
> with glasses + light blue jumpsuit, woman with curly short hair + green
> jumpsuit) standing on the spacecraft bridge of T.H.E.O.S.-IX, behind
> the captain. Photo-realistic 4K, Interstellar/Expanse aesthetic.
> ```

---

# ⭐ CLIP 4 · ARYA-RESOLVE (1 shot · 8s) → `p07-council.html`

### Shot 4.1 · Captain's Quiet Order (8s)

```yaml
INGREDIENTS: [bridge-interior, arya-character]
PROMPT:
  Captain Arya stands at the central console of the T.H.E.O.S.-IX
  bridge, hands resting flat on the cyan-glowing rail. The viewport
  behind her shows the swirling edge of a spiral galaxy — distant
  stars, faint purple nebula dust. She turns her head slowly to look
  at her crew off-camera. Her expression is calm but resolute, jaw
  set, eyes steady. The bridge lights dim slightly, focusing all
  attention on her.
CAMERA:
  Slow push-in from medium-wide to medium close-up on Arya's face.
LIGHT:
  Cyan key from console + faint warm rim from the galaxy backdrop.
AUDIO:
  CAPT. ARYA (firm, measured Thai female voice, low register):
  "เคน · มีรา · ตรวจสอบระยะของดาวก่อน
   ผมไม่อยากให้ใครหลงเสียง"
  Background: subtle low cello drone + heart-beat percussion.
ASPECT: 16:9
DURATION: 8s
```

---

# 🔬 CLIP 5 · INVEST (6 shots · 48s) → `p04-parallax` / `p05-parallax10` / `p06-magnitude`

**Theme:** Parallax mechanics → magnitude → setup สำหรับ Henrietta Leavitt

### Shot 5.1 · Twin Cameras Deploy (8s) → p04

```yaml
INGREDIENTS: [bridge-interior, bolt-character]
PROMPT:
  Bolt's hands at a console — he taps a holographic button. Two
  small camera pods extend outward from the ship hull, visible
  through the viewport, separating to a 1 AU baseline. A cyan
  diagram overlays the viewport: two camera positions, a target
  star, and the parallax angle "p" labeled clearly. Bolt leans
  forward, eyes wide with concentration.
CAMERA:
  Start on Bolt's hands, pull up to medium of his face, then
  match-cut to the viewport diagram.
LIGHT:
  Cyan console glow on Bolt's face.
AUDIO:
  BOLT (excited Thai male voice, mid-20s):
  "กล้องคู่กางออกแล้ว · baseline หนึ่ง AU
   พร้อมวัดมุมพาแรลแลกซ์"
  SFX: mechanical extension whirr + soft beep.
ASPECT: 16:9
DURATION: 8s
```

### Shot 5.2 · Parallax Geometry Diagram (8s) → p04

```yaml
INGREDIENTS: []
PROMPT:
  A 3D holographic diagram floats in dark space: Earth orbits the
  Sun, two camera positions 6 months apart marked with cyan dots.
  Lines extend from both positions to a nearby star, forming a
  thin triangle. The angle "p" at the star is highlighted in
  pulsing yellow. A formula glows underneath: "d = 1 / p". The
  diagram rotates slowly to reveal depth.
CAMERA:
  Slow orbit around the diagram, full 360° in 8 seconds.
LIGHT:
  Pure data luminance — cyan lines, yellow angle, white star.
AUDIO:
  LEMAÎTRE (calm synthetic Thai-English voice):
  "Parallax · d เท่ากับ หนึ่งส่วน p
   หน่วย: arcsecond · พาร์เซก"
  SFX: subtle data hum.
ASPECT: 16:9
DURATION: 8s
```

### Shot 5.3 · Bolt Calculates 20 pc (8s) → p05

```yaml
INGREDIENTS: [bolt-character]
PROMPT:
  Close-up of Bolt at his console. A holographic readout in front
  of him displays "p = 0.05 arcsec" in cyan. He types quickly,
  then a result appears: "d = 1/0.05 = 20 pc". His face lights up
  with realization. He turns his head to call out to the crew
  off-camera.
CAMERA:
  Tight medium on Bolt, slight handheld energy. Push-in on the
  result display at 5s.
LIGHT:
  Cyan console wash.
AUDIO:
  BOLT (triumphant):
  "p เท่ากับ ศูนย์จุดศูนย์ห้า พิลิปดา
   d เท่ากับ ยี่สิบ พาร์เซก!"
  SFX: confirmation chime + ambient bridge hum.
ASPECT: 16:9
DURATION: 8s
```

### Shot 5.4 · Distance Limit Wall (8s) → p05

```yaml
INGREDIENTS: []
PROMPT:
  The holographic galaxy diagram zooms out. Multiple stars within
  20 pc light up green ("measurable"). Then stars beyond 100 pc
  flash red ("too far · parallax too small"). A semi-transparent
  red wall appears at the 100 pc boundary, blocking further
  measurement. A label reads "Parallax limit · 100 pc".
CAMERA:
  Slow zoom-out from inner stars to galactic scale.
LIGHT:
  Green/red color coding, fading purple nebula behind.
AUDIO:
  LEMAÎTRE:
  "พาแรลแลกซ์วัดได้แค่ใกล้ๆ
   เกินหนึ่งร้อยพาร์เซก · มุมเล็กเกินไป"
  SFX: low alert pulse when red wall appears.
ASPECT: 16:9
DURATION: 8s
```

### Shot 5.5 · Hubble Video Call Opens (8s) → p06

```yaml
INGREDIENTS: [hubble-character, bridge-interior]
PROMPT:
  A large holographic video panel materializes on the bridge. Dr.
  Hubble appears, warmly lit in his research outpost study, vintage
  chalkboard behind him. He smiles gently and raises a finger as if
  to offer guidance. The bridge crew (silhouettes) gather around to
  watch.
CAMERA:
  Wide-medium of bridge with Hubble's panel dominant in frame.
  Slow push-in toward Hubble's panel.
LIGHT:
  Warm gold from Hubble's panel + cool cyan bridge ambient.
AUDIO:
  DR. HUBBLE (gentle, scholarly Thai male voice):
  "ใช้ Magnitude แทน · m คือความสว่างที่เห็น
   M คือความสว่างจริง · m ลบ M เท่ากับ ห้า log
   d ส่วน สิบ"
  Music: warm piano motif.
ASPECT: 16:9
DURATION: 8s
```

### Shot 5.6 · Magnitude Formula Reveal (8s) → p06

```yaml
INGREDIENTS: []
PROMPT:
  Three stars float in space at different distances. Each star has
  two glowing labels: "m" (apparent · cyan) and "M" (absolute ·
  yellow). As the formula "m − M = 5 log(d/10)" assembles letter by
  letter at the bottom, lines connect each star's m and M to
  produce a "d" value — 10 pc, 50 pc, 200 pc respectively. The
  scene visually proves: knowing m and M gives you d.
CAMERA:
  Static wide, gentle parallax on stars only.
LIGHT:
  Self-luminous text and stars on deep navy backdrop.
AUDIO:
  KEN (calm Thai male voice, mid-20s, scholarly):
  "ถ้าเรารู้ทั้ง m และ M
   เราคำนวณระยะ d ได้ทันที"
  SFX: subtle chime per assembling letter.
ASPECT: 16:9
DURATION: 8s
```

---

# 👁 CLIP 6 · STRIKE (4 shots · 32s) → `p09b-decode.html`

**Theme:** VOID #3 "เลขสว่าง" attack — VOID พยายามหลอกให้ใช้ค่า M ผิด

### Shot 6.1 · Bridge Distortion Begins (8s)

```yaml
INGREDIENTS: [bridge-interior]
PROMPT:
  The bridge holograms suddenly flicker red. Numbers on the
  magnitude readout begin to shift on their own — values changing
  every second. The cyan light turns to crimson. A low rumble
  vibrates the deck. Crew silhouettes brace against consoles. A
  faint distorted whisper fills the air.
CAMERA:
  Handheld shake intensifying. Pull back slowly to wide.
LIGHT:
  Cyan → crimson alert pulse.
AUDIO:
  SFX: deep bass rumble + glitchy electronic interference.
  WHISPER (distorted, layered, threatening — Thai):
  "เลข... คือเสียงของฉัน... ฟังให้ดี..."
ASPECT: 16:9
DURATION: 8s
```

### Shot 6.2 · VOID Manifests with False Numbers (8s)

```yaml
INGREDIENTS: [void-antagonist, bridge-interior]
PROMPT:
  VOID materializes in the center of the bridge — a multilayered
  shadow with three pairs of glowing red eyes. Around its form,
  fake magnitude values orbit: "M = -10", "M = -8", "M = -15", all
  pulsing red. VOID raises a shadow-tendril toward the crew. The
  numbers swirl faster, hypnotic.
CAMERA:
  Slow orbital arc around VOID. Push-in on its central eyes at 6s.
LIGHT:
  Red key from VOID's eyes, deep shadow everywhere else.
AUDIO:
  VOID (deep, layered, predatory Thai voice):
  "ค่า M ที่แท้จริง · คือสิ่งที่ฉันบอก
   เธอจะเชื่อตัวเลขของฉัน
   หรือเชื่อตำราที่ตายแล้ว"
  SFX: sub-bass drone + whispered echoes.
ASPECT: 16:9
DURATION: 8s
```

### Shot 6.3 · Crew Hesitates (8s)

```yaml
INGREDIENTS: [bolt-character, ken-character, mira-character]
PROMPT:
  The three cadets stand frozen, faces lit red from VOID's
  presence. Bolt's hand hovers over the console — should he
  accept VOID's number? Mira looks to Ken, eyes wide. Ken's
  jaw tightens. The false M values spin around them, tempting.
CAMERA:
  Slow dolly across the three faces, holding on each for ~2.5s.
LIGHT:
  Red-shifted, harsh contrasts.
AUDIO:
  Silence first 3s — let tension breathe.
  BOLT (uncertain, almost whispered):
  "ค่ามันเปลี่ยนตลอด... ผมเชื่ออันไหน..."
  SFX: heart-beat percussion accelerating.
ASPECT: 16:9
DURATION: 8s
```

### Shot 6.4 · Arya's Counter-Strike (8s)

```yaml
INGREDIENTS: [arya-character, bridge-interior]
PROMPT:
  Captain Arya steps forward through the red haze, unflinching.
  She raises one hand — a cyan shield-pulse expands outward from
  her palm, pushing back the false numbers. VOID recoils slightly.
  Arya's eyes lock onto VOID, defiant. The bridge color slowly
  returns from red toward cyan as her shield holds.
CAMERA:
  Heroic low-angle of Arya. Push-in on her face as the pulse
  expands.
LIGHT:
  Crimson → cyan transition centered on Arya.
AUDIO:
  CAPT. ARYA (commanding, unwavering):
  "เราเชื่อข้อมูลที่วัดได้
   ไม่ใช่เสียงของเธอ"
  SFX: shield pulse whoosh + bass hit + bridge hum returning.
ASPECT: 16:9
DURATION: 8s
```

---

# 💡 CLIP 7 · REVEAL (4 shots · 32s) → `p09-absolute` / `p10-hubble` / `p11-distance`

**Theme:** Cepheid variables · Henrietta Leavitt 1908 · Standard Candle

### Shot 7.1 · Ken Writes the Equation (8s) → p09

```yaml
INGREDIENTS: [ken-character]
PROMPT:
  Ken stands at a holographic chalkboard interface, marker in hand.
  He writes glowing cyan equations: "Cepheid Variables · Period →
  Luminosity · M known". His face is calm, scholarly. As he writes,
  the words "STANDARD CANDLE" appear in larger letters, glowing
  yellow, with stars pulsing around them at different rhythms.
CAMERA:
  Medium of Ken from side, with the board prominent. Slight push
  toward "STANDARD CANDLE" reveal at 6s.
LIGHT:
  Cyan board glow on Ken's face.
AUDIO:
  KEN (calm, teacherly Thai voice):
  "ดาวมาตรฐาน · Cepheid variables
   ความสว่างจริง M เป็นที่รู้กัน
   เลยเป็น standard candle ของจักรวาล"
  SFX: marker tap on glass + ambient hum.
ASPECT: 16:9
DURATION: 8s
```

### Shot 7.2 · Henrietta Leavitt Tribute (8s) → p10

```yaml
INGREDIENTS: []
PROMPT:
  An archival-style sepia photograph fades into view: a young
  woman astronomer at a desk in 1908, examining glass photographic
  plates with a magnifying glass. Title card overlay in elegant
  serif: "Henrietta Swan Leavitt · 1908 · Period-Luminosity
  Relation". The image transitions: the photo plates light up
  cyan, transforming into a modern hologram of a pulsing Cepheid
  star with a brightness graph beneath it (period vs luminosity).
CAMERA:
  Slow push-in on the photograph, then dissolve to the hologram.
LIGHT:
  Sepia warm → cyan modern transition.
AUDIO:
  DR. HUBBLE (V.O., reverent):
  "เฮนเรียตตา ลีวิตต์ · ปี หนึ่งเก้าศูนย์แปด
   ค้นพบความสัมพันธ์ระหว่างคาบและความสว่าง
   เปิดประตูสู่การวัดระยะทางในจักรวาล"
  Music: gentle piano motif, hopeful.
ASPECT: 16:9
DURATION: 8s
```

### Shot 7.3 · Cepheid Pulses & Period Graph (8s) → p10

```yaml
INGREDIENTS: []
PROMPT:
  A bright yellow-white Cepheid variable star pulses rhythmically
  in the center of the frame — bright, dim, bright, dim — over a
  6-second cycle. To the right, a real-time graph plots brightness
  vs time, drawing a sinusoidal curve. A label reads "Period = 5.4
  days → M = -3.5". The star's pulse and the graph's wave sync
  perfectly.
CAMERA:
  Static, but the star itself breathes.
LIGHT:
  Pure star luminance, deep black space.
AUDIO:
  LEMAÎTRE:
  "วัดคาบของ Cepheid
   ได้ความสว่างจริง M
   จับคู่กับ m · ได้ระยะ d"
  SFX: gentle chime synced to pulse peaks.
ASPECT: 16:9
DURATION: 8s
```

### Shot 7.4 · 400 Light-Years Result (8s) → p11

```yaml
INGREDIENTS: [bridge-interior, mira-character]
PROMPT:
  Mira stands at her console, hand to her mouth in shock. The
  holographic readout in front of her displays in large cyan text:
  "Distance to father's signal: 400 light-years". Behind her, the
  star map zooms to highlight a tiny dot deep in the spiral galaxy.
  Her eyes well up — but with realization, not sadness.
CAMERA:
  Push-in from medium to close-up on Mira's face. The "400" remains
  visible in the corner.
LIGHT:
  Cyan key on Mira's face, soft rim from the star map glow.
AUDIO:
  MIRA (Thai female voice, mid-20s, breathless):
  "สี่ร้อย ปีแสง...
   แสงที่เราเห็น · คือแสงเมื่อสี่ร้อยปีก่อน
   แต่พ่อหายไปแค่ห้าปี..."
  Music: held suspended chord.
ASPECT: 16:9
DURATION: 8s
```

---

# 🎯 CLIP 8 · BOSS + CLIFF (5 shots · 40s) → `p13-maze` / `p14-chase` / `p15-payoff` / `p16-recap`

**Theme:** Arya เข้าใจ time dilation · WARP RUN เลือกเส้นทาง · Cliffhanger ดาวสั่น 6 ชม.

### Shot 8.1 · Arya's Realization · Time Dilation (8s) → p13

```yaml
INGREDIENTS: [arya-character, bridge-interior]
PROMPT:
  Arya stands very still at the viewport, the spiral galaxy massive
  behind her. Her eyes widen slowly with understanding. A holographic
  diagram materializes beside her: a massive dark sphere (gravity
  source) with a clock running slowly next to it, and a smaller
  clock running normally far away. The label "GENERAL RELATIVITY ·
  Time Dilation" pulses softly. Arya speaks to herself, almost
  whispered.
CAMERA:
  Slow orbit from behind Arya to her side profile. Hold on her
  face as realization lands.
LIGHT:
  Cool starlight from viewport, cyan rim from diagram.
AUDIO:
  CAPT. ARYA (quiet, awed):
  "พ่อศึกษาแรงโน้มถ่วง · เขาอยู่ใกล้ดาวที่มีมวลมาก
   เวลาช้าลง · สี่ร้อยปีของจักรวาล
   อาจเป็นแค่ไม่กี่นาทีของพ่อ"
  Music: swelling strings + soft piano.
ASPECT: 16:9
DURATION: 8s
```

### Shot 8.2 · WARP Three-Path Choice (8s) → p14

```yaml
INGREDIENTS: [bridge-interior, arya-character]
PROMPT:
  Arya stands at the central command console. Three holographic
  WARP routes float above the console, each glowing differently:
  Route A red ("ความเร็วสูงสุด · เสี่ยง"), Route B cyan ("ปลอดภัย ·
  สามสิบนาที"), Route C yellow ("เก็บข้อมูลก่อน"). The crew
  silhouettes stand behind her, debating quietly. Arya extends her
  hand toward Route B.
CAMERA:
  Wide-medium of bridge, dolly slow forward.
LIGHT:
  Three-color glow from the route holograms.
AUDIO:
  CAPT. ARYA (decisive):
  "B · เลือกของมีรา
   ในนามของพ่อที่เป็นนักฟิสิกส์
   เขาคงเลือกทางที่ทั้งกล้าและรอบคอบ"
  SFX: route selection confirmation chime.
ASPECT: 16:9
DURATION: 8s
```

### Shot 8.3 · WARP RUN Tunnel (8s) → p14

```yaml
INGREDIENTS: []
PROMPT:
  POV from the bridge viewport: stars stretch into long streaks of
  white-cyan light. The ship enters a WARP tunnel — swirling cyan
  and violet energy walls rushing past. Occasional red asteroid
  fragments fly close, requiring the ship to bank slightly. The
  speed feels exhilarating but controlled.
CAMERA:
  Pure forward POV, slight roll/bank motion.
LIGHT:
  Cyan-violet streak streams.
AUDIO:
  LEMAÎTRE:
  "WARP active · สามสิบนาที · เส้นทางปลอดภัย"
  SFX: deep WARP drive hum + occasional asteroid whoosh.
  Music: pulsing electronic beat, controlled urgency.
ASPECT: 16:9
DURATION: 8s
```

### Shot 8.4 · Arrival at Dying Star (8s) → p15

```yaml
INGREDIENTS: []
PROMPT:
  The ship exits WARP. Through the viewport, an enormous deep red
  star fills half the screen — surface boiling, plasma arcs leaping
  outward. The star pulses irregularly, as if its heart is failing.
  A faint silhouette of a small research station orbits in the
  foreground, dwarfed by the star.
CAMERA:
  Wide reveal, slow push-in toward the station silhouette.
LIGHT:
  Deep red star key, harsh contrast.
AUDIO:
  LEMAÎTRE (calm but ominous):
  "Stellar classification · M-type · สิบแปดเท่ามวลดวงอาทิตย์
   stage · pre-supernova
   estimated time to core collapse · หกชั่วโมง"
  Music: low bass drone + uneasy strings.
ASPECT: 16:9
DURATION: 8s
```

### Shot 8.5 · Cliffhanger · Star Trembles (8s) → p16

```yaml
INGREDIENTS: [arya-character]
PROMPT:
  Close-up of Arya's face, lit harsh red from the dying star. Her
  eyes reflect the trembling surface — the star visibly shudders
  in the reflection. A countdown timer in the corner of the frame:
  "06:00:00" begins ticking down. Arya's expression is steel — no
  fear, only resolve. The screen slowly fades to black on the final
  digit ticking: "05:59:59".
CAMERA:
  Extreme close-up on Arya's eyes. Slow push toward the reflection.
LIGHT:
  Pure red key, deep shadow on the off-side of her face.
AUDIO:
  CAPT. ARYA (whispered, iron-firm):
  "เหลือหกชั่วโมง · ทีม · เตรียมลงสถานี"
  SFX: countdown tick + low star rumble building.
  Music: dark cliffhanger sting at fade-to-black.
ASPECT: 16:9
DURATION: 8s
```

---

# 📊 Summary

| Clip | Shots | Duration | Page Target |
|---|---|---:|---|
| 4 ARYA-RESOLVE | 1 | 8s | p07-council |
| 5 INVEST | 6 | 48s | p04 / p05 / p06 |
| 6 STRIKE | 4 | 32s | p09b-decode |
| 7 REVEAL | 4 | 32s | p09 / p10 / p11 |
| 8 BOSS + CLIFF | 5 | 40s | p13 / p14 / p15 / p16 |
| **TOTAL** | **20** | **2:40** | 11 pages |

---

# 💡 Grok Imagine Tips

**ข้อดีของ Grok (เทียบ Flow):**
- ใช้ชื่อจริงได้: "Henrietta Leavitt", "ดร.ฮับเบิล", "T.H.E.O.S.-IX"
- VOID dialogue ตรงๆ ได้ ("เธอจะเชื่อตัวเลขของฉัน")
- ดวงตาแดง · multilayered shadow · threatening tendrils — ผ่านหมด
- Heroic low-angle + counter-strike framing — ไม่ block

**Workflow แนะนำ:**
1. อัปโหลด reference image ของ ingredient ที่ต้องใช้ในช็อตนั้น
2. Paste prompt ทั้ง YAML block (Grok parse ได้)
3. ถ้า dialogue เพี้ยน → re-gen 1-2 ครั้ง · หรืออัด TTS post (ElevenLabs Thai)
4. Export 1080p · save เป็น `shot-X.Y-name.mp4` ใน `ep03/video/raw-shots/`

**Audio post-production (ถ้าต้อง):**
- Cepheid period number (5.4 days) — ถ้า TTS ออกเป็นภาษาอังกฤษให้แทรก dub ทับ
- "ห้า log d ส่วน สิบ" — สูตร log ภาษาไทยมักเพี้ยน · เตรียม TTS ทับเลย

---

# 📂 Output Folder

```
ep03/video/
├── raw-shots/                          (สร้างหลัง gen)
│   ├── shot-4.1-arya-resolve.mp4
│   ├── shot-5.1-twin-cameras.mp4
│   ├── shot-5.2-parallax-diagram.mp4
│   ├── shot-5.3-bolt-calculates.mp4
│   ├── shot-5.4-distance-limit.mp4
│   ├── shot-5.5-hubble-call.mp4
│   ├── shot-5.6-magnitude-formula.mp4
│   ├── shot-6.1-bridge-distortion.mp4
│   ├── shot-6.2-void-manifests.mp4
│   ├── shot-6.3-crew-hesitates.mp4
│   ├── shot-6.4-arya-counter.mp4
│   ├── shot-7.1-ken-equation.mp4
│   ├── shot-7.2-leavitt-tribute.mp4
│   ├── shot-7.3-cepheid-pulse.mp4
│   ├── shot-7.4-400-lightyears.mp4
│   ├── shot-8.1-time-dilation.mp4
│   ├── shot-8.2-warp-choice.mp4
│   ├── shot-8.3-warp-tunnel.mp4
│   ├── shot-8.4-dying-star.mp4
│   └── shot-8.5-cliffhanger.mp4
├── final/                              (after merge)
└── EP03_GROK_PRODUCTION.md             (this file)
```

---
*EP03 Grok Imagine production pack · 2026-05-09 · ครูโกเมน + เจน*
*20 shots · 2:40 total · ready to gen*
