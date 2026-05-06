# 🎬 EP01 · Google Flow Production Pack
## COSMOS LOG · The Collision · 6 คลิปหลัก

> สำหรับ Google Flow (Veo 3) · ใช้ Scene Builder + Ingredients
> เป้าหมาย: 1 session · 6 คลิป · ~2:30 รวม

---

# 📦 PART 1 · INGREDIENTS (สร้างก่อน · ใช้ทุกคลิป)

ครูสร้าง Ingredients เหล่านี้ใน Flow ก่อน · จะ lock consistency ทั้ง EP

---

## Ingredient #1 · CAPTAIN ARYA (Character)

```
Asian Thai woman in her early 30s, sharp focused dark eyes,
black hair pulled back in a tight ponytail with a few loose
strands. High cheekbones, calm composed expression with a
hint of resolve. Wearing a sleek navy blue spacecraft commander
jumpsuit with cyan-glowing accent strips along the shoulders
and a small captain's insignia on the chest. Standing tall,
shoulders back, confident posture. Cinematic side lighting
from cyan holographic displays. Photo-realistic 4K portrait
reference, Interstellar/Expanse aesthetic.
```

**Save as:** `ingredient-arya-character`

---

## Ingredient #2 · BRIDGE INTERIOR (Location)

```
Spacecraft bridge interior of "T.H.E.O.S.-IX" — a sleek deep
space exploration vessel, year 2186. Curved consoles arranged
in arc formation, four crew stations facing forward. Cyan
holographic displays floating above each console. Large
panoramic viewport at front showing infinite deep space.
Walls are dark navy and brushed gunmetal gray. Subtle ambient
lighting with cyan running strips along floor edges. Central
command chair raised slightly. Empty (no crew visible — for
reuse with character ingredients). Photo-realistic sci-fi
production design, like The Expanse meets Interstellar.
4K reference image, neutral wide angle.
```

**Save as:** `ingredient-bridge-interior`

---

## Ingredient #3 · LEMAÎTRE VOICE (Audio)

```
Male AI voice, mid-range tenor, calm and measured tone,
synthetic but warm — like Jarvis from Iron Man crossed with
HAL 9000's composure. Slight digital reverb suggesting
omnipresent ship-wide presence. Speaks in Thai-English
mixed naturally. No excitement, no urgency in voice tone
even during emergencies — pure intelligent calm.
```

**Save as:** `ingredient-lemaitre-voice` (upload audio sample if Flow allows)

---

## Ingredient #4 · DR. HUBBLE (Character)

```
Elderly Asian Thai-Chinese man, late 60s, gentle scholarly
smile with crow's feet around kind eyes. Silver-gray hair
neatly combed. Wearing a soft gray cardigan over white
collared shirt, simple wire-rimmed glasses. Stands in front
of a vintage chalkboard in a warm-lit research outpost
study. Photo-realistic portrait, warm intimate lighting.
4K reference image. Aesthetic: like a beloved physics
professor who has spent his life among the stars.
```

**Save as:** `ingredient-hubble-character`

---

## Ingredient #5 · VOID (Antagonist)

```
A shadowy multilayered entity — not a body but a presence.
Dark silhouette outlined in faintly glitching pixelated
edges, as if reality itself is corrupting around it.
Three pairs of dim red glowing eye-like points float in
asymmetric positions within the shadow. Surrounding air
shimmers with chromatic aberration. No fixed shape — slowly
shifts and pulses. Background should be pitch black with
red glitch artifacts. Inspired by Mister Mxyzptlk meets
Annihilation's Shimmer. Photo-realistic horror-sci-fi.
```

**Save as:** `ingredient-void-antagonist`

---

# 🎬 PART 2 · 6 CLIPS · SHOT-BY-SHOT

---

## 🎬 CLIP 1 · The Collision (p03) · 24 seconds

**Format:** 3 shots × 8s · chain ใน Scene Builder

### Shot 1.1 · Bridge Alarm + Impact (8s)

```yaml
INGREDIENTS: [bridge-interior]
PROMPT:
  Wide cinematic shot of T.H.E.O.S.-IX bridge interior. The
  bridge is calm at first, dimmed cyan ambient light. Suddenly
  red alert lights pulse across all consoles. Through the
  panoramic viewport, in deep space distance, two ancient
  asteroid-like fragments slowly spiral toward each other. They
  impact in slow motion — bright white-blue flash radiating
  outward, debris drifting silently. Crew silhouettes (4 figures,
  faceless) at consoles turn toward the viewport.
CAMERA:
  Slow dolly forward starting wide, ending medium-wide.
LIGHT:
  Cyan ambient → red alert pulse → white impact flash at 5s.
AUDIO (Veo 3 generate):
  Ambient bridge hum (low) → 3 alert beeps rising in intensity
  → IMPACT crash with sub-bass shockwave at 5s.
  No dialogue this shot.
ASPECT: 16:9
DURATION: 8s
```

### Shot 1.2 · Holographic Readout (8s)

```yaml
INGREDIENTS: [bridge-interior]
USE_LAST_FRAME: shot-1.1 (frames-to-video)
PROMPT:
  Same bridge, after the impact. Holographic data panels flicker
  to life above the central console — scrolling sensor readouts
  in cyan text. Numbers dynamically count up: speed gauge "0.15c",
  large age counter climbs from "0" to "13,800,000,000 years".
  Crew silhouettes watch in tense silence, their faces lit by
  the holograms. Slight handheld camera tension.
CAMERA:
  Medium shot of central console. Slow push-in toward the age
  counter as it reaches 13.8 billion.
LIGHT:
  Cyan holograms dominant, console underglow.
AUDIO (Veo 3 generate):
  LEMAÎTRE (V.O., calm-synthetic, Thai-English):
  "Cadets · นี่คือคอมพิวเตอร์ยาน T.H.E.O.S.-IX
   เราชนวัตถุปริศนา ที่ความเร็ว ศูนย์จุดหนึ่งห้า ซี
   เซ็นเซอร์รายงาน วัตถุนี้สะท้อนแสง
   อายุ หนึ่งสาม จุด แปด พันล้านปี"
  Background: low ethereal pad music starts here.
ASPECT: 16:9
DURATION: 8s
```

### Shot 1.3 · Captain's Order (8s)

```yaml
INGREDIENTS: [bridge-interior, arya-character]
USE_LAST_FRAME: shot-1.2
PROMPT:
  Captain Arya stands from the central command chair, takes
  three steps forward to the console rail, places her hand
  on the edge. She looks at the viewport (showing distant
  debris), then turns her head slightly toward camera. Calm
  determination on her face. Other crew watch her, waiting
  for orders.
CAMERA:
  Start medium-wide of Arya from behind/side. Arc slowly to
  reveal her profile, then her face in 3/4 angle as she speaks.
LIGHT:
  Cyan side-key on Arya's face, soft cyan rim light.
AUDIO (Veo 3 generate):
  CAPT. ARYA (firm, composed Thai voice, female 30s):
  "ทีม · รวมกำลังทันที
   เราต้องเข้าใจว่ามันคืออะไร
   ก่อนเงาดำในจอเรดาร์จะมาถึง
   เหลือเวลา 30 นาที"
  Background music: heart-beat percussion subtly enters.
ASPECT: 16:9
DURATION: 8s
```

**🎬 Result:** 24-second cinematic intro · ใส่ใน p03-collision.html แทน YouTube embed

---

## ⭐ CLIP 2 · Signal Age Reveal (p05) · 16 seconds

**Format:** 2 shots × 8s

### Shot 2.1 · Counter Climbing (8s)

```yaml
INGREDIENTS: [bridge-interior]
PROMPT:
  Close-up of a single holographic counter floating in the
  bridge. The counter shows a number rapidly climbing through
  digits — billions of digits scrolling like a slot machine.
  Cyan numerical display with subtle motion blur. Background
  bridge slightly out of focus. The number eventually slows
  and locks at "13,800,000,000". Subtle pulse glow when it
  locks.
CAMERA:
  Extreme close-up on counter. Static, slight breathing.
AUDIO (Veo 3 generate):
  Mechanical/digital ticking that slows as number locks.
  Final lock sound: low harmonic chime.
  No dialogue.
ASPECT: 16:9
DURATION: 8s
```

### Shot 2.2 · Crew Reaction + Reveal Line (8s)

```yaml
INGREDIENTS: [bridge-interior]
USE_LAST_FRAME: shot-2.1
PROMPT:
  Pull back from the counter to wide shot of the bridge. The
  crew silhouettes are still, frozen in the moment of
  realization. Captain Arya's hand drops from the console
  edge. Camera slowly arcs to show all four crew members
  standing in stunned silence. Bridge holograms reflect
  faintly on their visor displays.
CAMERA:
  Pull-back dolly with slow arc.
LIGHT:
  Soft cyan + faint warm glow from the locked counter.
AUDIO (Veo 3 generate):
  Silence first 3 seconds (let the moment land).
  LEMAÎTRE (V.O., quiet, almost reverent):
  "อายุของสัญญาณ · หนึ่งสามจุดแปดพันล้านปี
   เก่ากว่าดวงอาทิตย์ของเรา · สามเท่า"
  Music: swelling celestial pad with slow piano.
ASPECT: 16:9
DURATION: 8s
```

**🎬 Result:** 16-second reveal · ใส่ใน p05-age.html (replace static counter)

---

## ⭐ CLIP 3 · CMB Identified (p07) · 16 seconds

**Format:** 2 shots × 8s

### Shot 3.1 · CMB Reveal (8s)

```yaml
INGREDIENTS: []
PROMPT:
  Extreme close-up of granular cosmic texture — soft red,
  orange, cyan, navy spots in a marbled pattern (Cosmic
  Microwave Background fluctuations). Camera slowly zooms
  out, revealing more of the texture. The texture begins to
  curve into an oval shape — the Mollweide projection of
  the all-sky CMB map. By 8 seconds, the full oval is
  visible filling the screen.
CAMERA:
  Pure zoom-out, exponential pace.
LIGHT:
  Self-luminous data, no ambient.
AUDIO (Veo 3 generate):
  Reverent celestial pad music swelling.
  No dialogue this shot.
ASPECT: 16:9
DURATION: 8s
```

### Shot 3.2 · Hubble Explains (8s)

```yaml
INGREDIENTS: [hubble-character]
USE_LAST_FRAME: shot-3.1 (CMB stays in BG as hologram)
PROMPT:
  Dr. Hubble stands in front of the holographic CMB oval
  (semi-transparent, hovering behind him in the air of his
  research outpost). Warm wood-paneled walls visible. He
  gestures toward the CMB with a slow open hand, his face
  warm and reverent. Brass desk lamp casts golden light on
  his profile.
CAMERA:
  Medium shot of Hubble, CMB oval visible behind him.
  Slow push-in to his eyes.
LIGHT:
  Warm gold from desk lamp + cool cyan rim from CMB hologram.
AUDIO (Veo 3 generate):
  DR. HUBBLE (V.O., gentle, scholarly Thai voice):
  "นี่คือ Cosmic Microwave Background
   แสงแรกของเอกภพ · ตอนที่อายุ 380,000 ปี
   เปล่งออกมา · เดินทางมา 13.8 พันล้านปี
   ถึงเรา"
  Music: continuing celestial pad with soft piano.
ASPECT: 16:9
DURATION: 8s
```

**🎬 Result:** 16-second reveal scene · ใส่ใน p07-cmb.html

---

## 🎓 CLIP 4 · Hubble's Law Teaching (p10) · 32 seconds

**Format:** 4 shots × 8s · longest clip · Teacher's Moment

### Shot 4.1 · Chalkboard Hand (8s)

```yaml
INGREDIENTS: [hubble-character]
PROMPT:
  Cinematic close-up of a weathered hand (Dr. Hubble's)
  writing on an old chalkboard with white chalk. The chalk
  scrapes softly. He writes the equation "v = H₀ × d" in
  elegant handwriting. Camera slowly pulls back from extreme
  close-up of chalk to medium shot showing his hand and arm.
  Warm desk lamp light from camera left.
CAMERA:
  Slow pull-back from extreme close-up.
LIGHT:
  Warm tungsten amber, single source from left.
AUDIO (Veo 3 generate):
  Chalk scraping sounds. Subtle warm ambient.
  No dialogue this shot — let writing speak.
  Soft piano begins.
ASPECT: 16:9
DURATION: 8s
```

### Shot 4.2 · Hubble's Realization Speech (8s)

```yaml
INGREDIENTS: [hubble-character]
USE_LAST_FRAME: shot-4.1
PROMPT:
  Continuing pull-back to reveal Dr. Hubble's full upper body
  in front of the chalkboard. He turns to face camera, gentle
  smile, holds the chalk in one hand. Behind him: vintage
  black-and-white framed photograph of Edwin Hubble at the
  Mount Wilson telescope (1929). Bookshelves with old astronomy
  texts.
CAMERA:
  Medium shot of Dr. Hubble, slight push-in.
LIGHT:
  Warm tungsten + soft fill, golden hour feel.
AUDIO (Veo 3 generate):
  DR. HUBBLE (V.O., warm scholarly Thai):
  "ทุกคนเพิ่งทดลองด้วยมือตัวเอง · ลูกโป่งคือเอกภพ
   สิ่งที่เกิดขึ้น · ไม่ใช่การระเบิด
   มันคือการขยายตัวของอวกาศเอง"
  Music: warm piano + soft cello.
ASPECT: 16:9
DURATION: 8s
```

### Shot 4.3 · Big Formula Reveal (8s)

```yaml
INGREDIENTS: [hubble-character]
USE_LAST_FRAME: shot-4.2
PROMPT:
  Dr. Hubble steps aside to reveal the chalkboard fully.
  Camera tilts up to show "v = H₀ × d" prominently in the
  center. The equation glows gently with warm light. Below
  it, smaller writing: "Hubble's Law · 1929".
CAMERA:
  Slow tilt up from Hubble to chalkboard.
LIGHT:
  Equation has subtle warm self-glow effect.
AUDIO (Veo 3 generate):
  DR. HUBBLE (V.O., emphasizing each variable):
  "v · ความเร็วเคลื่อนหนี
   เท่ากับ H ศูนย์ · ค่าคงที่ฮับเบิล
   คูณ d · ระยะทาง
   ยิ่งไกลเท่าไหร่ · ยิ่งเคลื่อนหนีเร็วเท่านั้น"
  Music: building swell.
ASPECT: 16:9
DURATION: 8s
```

### Shot 4.4 · Edwin Hubble Photo (8s)

```yaml
INGREDIENTS: [hubble-character]
USE_LAST_FRAME: shot-4.3
PROMPT:
  Camera pans slowly to the framed black-and-white photograph
  of Edwin Hubble (1929) on the wall. Soft warm light on the
  frame. Dr. Hubble's reflection faintly visible in the glass.
  Camera holds on the photo. Below the frame, a small caption
  plaque: "Edwin Hubble · 1929 · Mount Wilson".
CAMERA:
  Slow pan from chalkboard to photo. Hold steady on photo.
LIGHT:
  Warm museum lighting on the photograph.
AUDIO (Veo 3 generate):
  DR. HUBBLE (V.O., quietly proud):
  "นี่คือสิ่งที่ผมค้นพบ · ในปี 1929"
  Music: warm cello + gentle resolution.
ASPECT: 16:9
DURATION: 8s
```

**🎬 Result:** 32-second teaching moment · ใส่ใน p10-hubble.html (replace text-only narrative)

---

## ⚔️ CLIP 5 · VOID Boss Encounter (p14) · 24 seconds

**Format:** 3 shots × 8s

### Shot 5.1 · Bridge Glitches (8s)

```yaml
INGREDIENTS: [bridge-interior]
PROMPT:
  Bridge holograms suddenly glitch violently. Cyan turns to
  red. Static interference fills the air. Lights flicker.
  Crew silhouettes recoil from consoles. Through viewport,
  the stars themselves seem to stutter as if reality is
  corrupting.
CAMERA:
  Slight handheld shake. Quick zoom-in to one console as
  it sparks.
LIGHT:
  Red emergency strobes + glitch artifacts on screen.
AUDIO (Veo 3 generate):
  Sharp digital glitch sounds + low ominous drone.
  Distant whisper-like static building.
  No dialogue this shot.
ASPECT: 16:9
DURATION: 8s
```

### Shot 5.2 · VOID Manifests (8s)

```yaml
INGREDIENTS: [bridge-interior, void-antagonist]
USE_LAST_FRAME: shot-5.1
PROMPT:
  At the center of the bridge, a shadowy entity manifests —
  VOID. Dark multilayered silhouette, three pairs of dim red
  eyes floating asymmetrically. Reality shimmers around it
  with chromatic aberration. Crew silhouettes shrink back.
  Captain Arya stands her ground, hand on console rail.
CAMERA:
  Static medium-wide shot. VOID center frame, Arya right side.
LIGHT:
  Red corruption from VOID + faint cyan from intact consoles.
AUDIO (Veo 3 generate):
  VOID (multilayered, glitching, cold — multiple voices
   speaking simultaneously, in Thai with reverb-corruption):
  "บิกแบง... คือคำโกหก
   มีจุดศูนย์กลาง... เธอผิด
   เธอมาจากความว่างเปล่า..."
  Music: dissonant low strings + tense.
ASPECT: 16:9
DURATION: 8s
```

### Shot 5.3 · Arya's Defiance (8s)

```yaml
INGREDIENTS: [bridge-interior, arya-character]
USE_LAST_FRAME: shot-5.2
PROMPT:
  Camera cuts to medium close-up of Captain Arya. She doesn't
  flinch. Calm fierce eyes. She steps forward toward VOID,
  one step. Her hand is steady. The bridge red lighting
  reflects in her eyes. Behind her, the crew straightens up,
  ready to back her.
CAMERA:
  Medium close-up on Arya. Slow push-in to her eyes.
LIGHT:
  Half her face cyan (truth), half her face red (corruption).
AUDIO (Veo 3 generate):
  CAPT. ARYA (firm, unshaken, Thai):
  "ปฏิเสธ · ทีม · บอกความจริง
   ลูกโป่งพิสูจน์การขยายตัว · ไม่มีศูนย์
   ฮับเบิลพิสูจน์แล้วในปี 1929
   เราจะไม่หลงเชื่อแก"
  Music: heroic theme rising.
ASPECT: 16:9
DURATION: 8s
```

**🎬 Result:** 24-second boss encounter · ใส่ใน p14-void.html

---

## 🚀 CLIP 6 · Warp Engaged (p15) · 12 seconds

**Format:** 2 shots × 6s (สั้นกว่ารายอื่น · transition outro)

### Shot 6.1 · Coordinates Lock (6s)

```yaml
INGREDIENTS: [bridge-interior, arya-character]
PROMPT:
  Bridge has returned to calm cyan. Captain Arya's hand
  reaches for a large central button glowing cyan. The
  navigation map shows Galaxy A locked as destination.
  Holographic readouts confirm: "v = H₀d · COORDINATES
  LOCKED". Crew at stations watch.
CAMERA:
  Close-up of hand pressing the button.
LIGHT:
  Cyan dominant, calm and resolute.
AUDIO (Veo 3 generate):
  Console confirmation beeps + system voice.
  CAPT. ARYA (calm, decisive):
  "Engage."
  Music: building anticipation.
ASPECT: 16:9
DURATION: 6s
```

### Shot 6.2 · Warp Tunnel (6s)

```yaml
INGREDIENTS: []
USE_LAST_FRAME: shot-6.1
PROMPT:
  View from forward of the spacecraft. Stars suddenly stretch
  into long streaks of blue and violet light. The ship enters
  warp tunnel — streaking lights flying past the camera at
  immense speed. Color palette: deep blue + violet + white
  highlights. End of clip: a hint of distant spiral galaxy
  visible at tunnel's end.
CAMERA:
  POV from front of ship, forward motion.
LIGHT:
  Streaking light effects only.
AUDIO (Veo 3 generate):
  Synth-wave riser + white noise sweep + sharp WARP boom.
  LEMAÎTRE (V.O., calm closing):
  "Destination: Galaxy A · arrival in EP02"
  Music: triumphant resolution.
ASPECT: 16:9
DURATION: 6s
```

**🎬 Result:** 12-second outro · ใส่ใน p15-warp.html

---

# 📊 PART 3 · Production Schedule

## ใน 1 session (ประมาณ 2-3 ชั่วโมงใน Flow)

| Phase | Time | งาน |
|---|---|---|
| **Setup** | 30 นาที | สร้าง 5 Ingredients · ทดสอบ Arya consistency |
| **Clip 1** | 25 นาที | The Collision (3 shots) |
| **Clip 2** | 15 นาที | Signal Age (2 shots) |
| **Clip 3** | 15 นาที | CMB (2 shots) |
| **Clip 4** | 30 นาที | Hubble's Law (4 shots) |
| **Clip 5** | 25 นาที | VOID Boss (3 shots) |
| **Clip 6** | 10 นาที | Warp (2 shots) |
| **Export** | 15 นาที | export 6 MP4 ให้ครบ |
| **Total** | **~2:45 hr** | 6 clips · ~2:25 รวม |

---

# 🎯 PART 4 · After Generation

## ครูส่งผลให้เจน 1 ใน 2 แบบ

### Option A · YouTube unlisted (ง่ายสุด)
- Upload คลิปลง YouTube · ตั้ง unlisted
- Send URL ทั้ง 6 ลิงก์
- เจน embed iframe แต่ละหน้า

### Option B · Local MP4 (smooth ที่สุด)
- วาง MP4 ใน `lessons/astronomy/ep01/video/`:
  - `clip-1-collision.mp4`
  - `clip-2-signal-age.mp4`
  - `clip-3-cmb.mp4`
  - `clip-4-hubble.mp4`
  - `clip-5-void.mp4`
  - `clip-6-warp.mp4`
- เจน embed `<video>` tag · auto-play muted on scroll into view
- ไม่มีโฆษณา · ไม่ต้อง internet โหลดทุกครั้ง

---

# 💡 PART 5 · Tips สำหรับ Flow + Veo 3

## ✅ DO
1. **Lock seed** ให้เหมือนกันทุก shot ในคลิปเดียว · character/lighting consistent
2. **Use frames-to-video** ระหว่าง shots · smooth transition
3. **Keep dialogue ≤ 2-3 ประโยคต่อ 8s shot** · pacing แม่น
4. **Reference image** ของ Captain Arya/Dr. Hubble ก่อน prompt · character lock
5. **Specify language clearly** · "Thai voice" ใน prompt · Veo 3 จะ gen เสียงไทย

## ❌ DON'T
1. อย่าใส่ text overlay ใน prompt · Veo จะวาดตัวอักษรแปลก
2. อย่าให้ shot ยาวเกิน 8s · cut หรือใช้ Scene Builder ต่อ
3. อย่าเปลี่ยน aspect ratio ระหว่าง shots ในคลิปเดียว
4. อย่า prompt เกิน 200 words ต่อ shot · model สับสน
5. อย่าใช้ negative emotions เกินไป · Veo 3 อาจ skip generation

---

# 📝 PART 6 · Subtitle (.srt) สำหรับ Accessibility

ครู gen เสร็จ · ส่งให้เจน · เจนเขียน subtitle file ให้

ตัวอย่างสำหรับ Clip 1:
```srt
1
00:00:08,000 --> 00:00:12,000
LEMAÎTRE: Cadets · นี่คือคอมพิวเตอร์ยาน T.H.E.O.S.-IX

2
00:00:12,000 --> 00:00:14,000
เราชนวัตถุปริศนา · ที่ความเร็ว 0.15c

3
00:00:14,000 --> 00:00:16,000
อายุ 13.8 พันล้านปี · เก่ากว่าดวงอาทิตย์ 3 เท่า

4
00:00:17,000 --> 00:00:21,000
ARYA: ทีม · รวมกำลังทันที

5
00:00:21,000 --> 00:00:25,000
เราต้องเข้าใจมัน · ก่อนเหลือเวลา 30 นาที
```

---

*Production Pack v1.0 · COSMOS LOG EP01 · Google Flow + Veo 3 · 2569*
*ผู้ออกแบบ: เจน · สำหรับครูโกเมน ปาปะโถ*
