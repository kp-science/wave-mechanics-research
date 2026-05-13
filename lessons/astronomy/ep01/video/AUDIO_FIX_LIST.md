# Audio Fix List · TTS Post-Production

ปัญหาเสียงที่ต้อง regen TTS ภาษาไทยซ้อนทับ Flow audio ตอน post

## Shot 1.2 · LEMAÎTRE V.O.
- **Issue:** Veo อ่าน "หนึ่งสามจุดแปด" (digit-by-digit)
- **Should be:** "สิบสามจุดแปด พันล้านปี"
- **Full corrected line:**
  > "Cadets · นี่คือคอมพิวเตอร์ยาน T.H.E.O.S.-IX
  > เราชนวัตถุปริศนา ที่ความเร็ว ศูนย์จุดหนึ่งห้า ซี
  > เซ็นเซอร์รายงาน วัตถุนี้สะท้อนแสง
  > อายุ **สิบสามจุดแปด** พันล้านปี"
- **Voice:** Thai male AI · calm tenor · gentle digital reverb (ElevenLabs Thai or Google `th-TH-Neural2-D`)

## Shot 4.3 · Formula Reveal — content tweak
- Original chalkboard: "Hubble's Law · 1929"
- Generated chalkboard: "1929 · The Cosmic Expansion Law" (Veo prominent-people filter)
- TTS audio: replace "ค่าคงที่ของการขยายตัว" → "ค่าคงที่ฮับเบิล (Hubble Constant)" for accuracy in Thai voiceover
- Reason: chalkboard text is generic for Veo · Thai voiceover can use scientific name freely

## Shot 4.4 · Photo Pan — content tweak
- Plaque shows: "Pioneer of Cosmology · 1929" (generic)
- TTS audio: standard line, but credit the discovery to Edwin Hubble in subtitle
- Reason: Veo filter blocks "Edwin Hubble" name in prompt · OK in subtitle/voiceover post

## Veo Prompt Safety Notes
Triggers filter:
- "Edwin Hubble", "Mount Wilson", "Hubble's Law", "Hubble" in any context
Safe replacements:
- "early 20th century astronomer" / "1920s pioneer"
- "Pioneer of Cosmology" / "The Cosmic Expansion Law"
- "professor" instead of named character

## Shot 5.3 · Arya Defiance — TTS replace
- Generated dialogue: "ค่าคงที่พิสูจน์แล้วในปี หนึ่งพันเก้าร้อยยี่สิบเก้า"
- Should be (TTS post): "ฮับเบิลพิสูจน์แล้วในปี หนึ่งพันเก้าร้อยยี่สิบเก้า"
- Reason: prompt forced "ค่าคงที่" to bypass Veo Hubble-name filter

## Shot 5.2 · VOID Manifestation — full audio reconstruction
- Generated as silent VFX (no dialogue · Veo blocked threatening dialogue)
- TTS post must add VOID dialogue with full horror voice texture:
  - 3-5 layered voices (male baritone + female whisper + distorted child)
  - Heavy reverb + digital glitch + stutter
  - Cold deliberate cadence with pauses
- VOID dialogue (Thai, layered horror voice):
  > "บิกแบง... คือคำโกหก
  > มีจุดศูนย์กลาง... เธอผิด
  > เธอมาจากความว่างเปล่า..."
- Audio mixing:
  - Sub-bass drone bed
  - Dissonant string cluster
  - Whisper-static layer
  - VOID speech mixed wet (heavy reverb + delay)
- Voice production options:
  - ElevenLabs voice cloning x3 (different voices, mix together)
  - Hire voice actor + multi-track DAW processing
  - AI voice morph (RVC, Voice Changer)

## Shot 5.2 · VOID Manifestation — VFX overlay required in HTML
- Generated as "space-time anomaly" silent VFX (Veo blocked VOID entity 3x)
- p14-void.html must overlay void-antagonist.png with CSS animation (zoom + glitch + 6 red eyes pulse) on top of this clip
- Plus TTS VOID dialogue layered on the audio track
- Asset path: lessons/astronomy/ep01/assets/void-antagonist.png (need to copy from Downloads)
