# KP Simulation Specs — หน่วยเสียง ม.5 (11 แผน)

**ผู้สอน** ครูโกเมน ปาปะโถ · โรงเรียนสตรีวิทยา
**Stack แนะนำ** HTML5 + Canvas/SVG + Vanilla JS (ตามแนวทาง waves: `wave-types.html`, `wave-components.html`, `wave-poe-lab.html`)
**Convention** — ไฟล์อยู่ในโฟลเดอร์ของแต่ละแผน (เช่น `sound/แผน01_.../sound-waves.html`) · ใช้ Sarabun font · มี Play/Pause/Reset · auto-save state ผ่าน `worksheet-core.js`

---

## Quick Index — 23 sim หลัก

| # | แผน | ชื่อไฟล์ | เป้าหมายหลัก |
|---|-----|---------|----------------|
| S1.1 | 1 | `sound-waves.html` | เปรียบคลื่นตามขวาง vs ตามยาว |
| S1.2 | 1 | `vacuum-bell.html` | สาธิตเสียงในสุญญากาศของบอยล์ |
| S2.1 | 2 | `sound-particles.html` | อนุภาคอากาศ 24 จุด + ส่วนอัด/ขยาย |
| S2.2 | 2 | `sound-graph-sync.html` | y(x) ↔ ΔP(x) เฟสต่างกัน π/2 |
| S3.1 | 3 | `sound-speed-temp.html` | v = 331 + 0.6·T_C |
| S3.2 | 3 | `echo-timing.html` | วัด v จาก echo (Math Builder) |
| S4.1 | 4 | `sound-reflection.html` | มุมตก = มุมสะท้อน |
| S4.2 | 4 | `sound-refraction.html` | เสียงโค้งกลางคืน |
| S4.3 | 4 | `sound-diffraction.html` | เลี้ยวเบนผ่านขอบ · λ vs ขนาดช่อง |
| S4.4 | 4 | `sound-interference.html` | 2 ลำโพง · node/antinode |
| S5.1 | 5 | `sound-intensity.html` | I = P/(4πr²) Inverse Square |
| S5.2 | 5 | `decibel-meter.html` | β = 10·log(I/I₀) + dB ในชีวิตจริง |
| S6.1 | 6 | `audiogram-test.html` | Online Hearing Test 100Hz–20kHz |
| S6.2 | 6 | `noise-audit.html` | จำลอง dB ในสถานที่ต่าง ๆ |
| S7.1 | 7 | `fourier-builder.html` | sine + harmonics → square wave |
| S7.2 | 7 | `instrument-spectrum.html` | spectrum analyzer 5 เครื่องดนตรี |
| S8.1 | 8 | `resonance-tube.html` | เลื่อนลูกสูบ · หา L₁, L₂ |
| S8.2 | 8 | `standing-wave-pipe.html` | mode 1, 3, 5 ในท่อปลายปิด |
| S9.1 | 9 | `beat-2tone.html` | 2 ส้อมเสียง · นับ beat/วินาที |
| S9.2 | 9 | `guitar-tune.html` | จูนสายกีตาร์ให้ตรง 440 Hz |
| S10.1 | 10 | `doppler-ambulance.html` | รถพยาบาล · wavefront อัด/ขยาย |
| S10.2 | 10 | `mach-cone.html` | Shock wave + Mach number |
| S11.1 | 11 | `sound-synthesis-map.html` | Synthesis ทั้งบท (cluster map) |

---

## Common Conventions

### โครงสร้างไฟล์ทุก sim
```
<!DOCTYPE html>
<html lang="th"><head>
  <meta charset="UTF-8">
  <link href="...Sarabun...">
  <title>[ชื่อ sim] · แผน [N]</title>
  <style>...</style>
</head>
<body>
  <header> [ชื่อ + แผน + POE phase] </header>
  <main>
    <section.controls> sliders / dropdowns </section>
    <section.canvas> Canvas/SVG หลัก </section>
    <section.readout> ค่าตัวเลข real-time </section>
    <section.poe-prompt> คำถาม Predict/Observe (overlay) </section>
  </main>
  <script src="../../shared/worksheet-core.js"></script>
  <script>...</script>
</body></html>
```

### State persistence
- ใช้ `localStorage` key prefix `sim-[name]-[course]`
- Auto-save slider values + last interaction (เพื่อ continuity)

### POE Integration
- เปิด sim → state เริ่มต้นซ่อนข้อมูลสำคัญ (P)
- กด Play / โต้ตอบ → เผยข้อมูล (O)
- มีปุ่ม "📝 บันทึก E" → เปิด `POE-01` ใบงานในแท็บใหม่

### Performance
- requestAnimationFrame 60 fps (Canvas)
- Throttle slider events (≤ 30 ms/event)
- Canvas resolution ≤ 1200×600 (mobile-friendly)

---

## S1.1 · sound-waves.html — เปรียบคลื่นตามขวาง vs ตามยาว

**แผน** 1 · **ใช้ใน** E2 Explore · **เวลา** 8 นาที

### เป้าหมาย
ให้นักเรียนเห็นว่าเสียงเป็นคลื่นตามยาว (longitudinal) ต่างจากคลื่นน้ำ (transverse) — โดยดูทิศการสั่นของอนุภาคเทียบกับทิศการเคลื่อนที่ของคลื่น

### Input
| Control | ค่า | หมายเหตุ |
|---------|-----|---------|
| Wave Type (radio) | Transverse · Longitudinal | สลับ 2 โหมด |
| Frequency (slider) | 0.5–3 Hz | สำหรับ visual (ไม่ใช่ค่าเสียงจริง) |
| Amplitude (slider) | 10–60 px | |
| Speed (slider) | 50–200 px/s | |
| Play / Pause / Reset | button | |

### Output (Canvas 800×300)
- **Transverse:** แถวลูกบอล 20 ลูกเรียงแนวนอน · ลูกบอลขยับขึ้น-ลง · เส้นไซน์ทาบ
- **Longitudinal:** แถวลูกบอลเรียงแนวนอน · ลูกบอลขยับซ้าย-ขวา · เกิดส่วนอัด (compression, สีแดง) และส่วนขยาย (rarefaction, สีน้ำเงิน)
- เครื่องหมายลูกศร **"ทิศคลื่นเดิน →"** ที่ขอบล่าง
- เครื่องหมาย **"ทิศการสั่น ↕ หรือ ↔"** ที่อนุภาคตัวกลาง

### POE Hooks
- **Predict (ก่อนกด Play):** "อนุภาคของตัวกลางจะ (ก) เคลื่อนตามคลื่นไปทั้งแถว (ข) สั่นอยู่กับที่"
- **Observe (ตอน Play):** สังเกตลูกบอล 1 ลูกที่ทำเครื่องหมายไว้ (เน้นด้วยสีต่าง) → ขยับไหม
- **Explain:** ปุ่มเปิดใบ POE-01

### Educational Anchors
- ลูกบอลที่ทำเครื่องหมายไว้ <strong>ไม่ออกนอกตำแหน่งเดิม</strong>
- ในโหมด Longitudinal ดู density ของอนุภาค → เห็นส่วนอัด/ขยายชัดเจน
- ปุ่ม "Show Wave Trace" เปิด/ปิด เส้นไซน์ทาบ (เพื่อชี้ให้เห็น y vs ตำแหน่ง)

---

## S1.2 · vacuum-bell.html — กระดิ่งในสุญญากาศ (Boyle)

**แผน** 1 · **ใช้ใน** E3 Explain · **เวลา** 3 นาที

### เป้าหมาย
สาธิตการทดลองของบอยล์: เสียงกระดิ่งจางลงเมื่อสูบอากาศออกจากขวด

### Input
| Control | ค่า |
|---------|-----|
| Pressure (slider) | 0–100 % atm |
| Ring Bell (button) | สั่นกระดิ่ง 1 ครั้ง |
| Auto-Pump (toggle) | จำลองการสูบอากาศออก |

### Output
- SVG: ขวดแก้ว + กระดิ่งภายใน · อนุภาคอากาศจำลอง (จุด)
- เมื่อ Pressure ↓ → จำนวนจุดลด · เสียงที่เล่น (Web Audio API) volume ลดตามสัดส่วน
- Readout: Pressure %, Sound intensity (relative)
- กราฟ Pressure vs Sound Intensity (real-time)

### POE Hooks
- **Predict:** Pressure 0% (สุญญากาศ) เสียงจะ (ก) ดังเท่าเดิม (ข) เบาลง (ค) ไม่มีเสียง
- **Observe:** กดปุ่มและเลื่อน Pressure ลง
- **Explain:** "เพราะเสียงเป็นคลื่นกล ต้องอาศัยตัวกลาง"

---

## S2.1 · sound-particles.html — อนุภาคอากาศ 24 จุด

**แผน** 2 · **ใช้ใน** E2 Explore · **เวลา** 10 นาที

### เป้าหมาย
ให้นักเรียนเห็นว่า "ส่วนอัด" คืออนุภาคใกล้กัน (ไม่ใช่อนุภาคเดินทาง) และคลื่นเสียงเป็นการเปลี่ยนแปลงของความหนาแน่น/ความดัน

### Input
| Control | ค่า |
|---------|-----|
| Number of particles | 24 (คงที่ ตามใบกิจกรรม) |
| Frequency (slider) | 1–5 Hz |
| Amplitude of vibration (slider) | 5–30 px |
| Display Mode (radio) | Particles · Pressure · Both |
| Mark Particle (click) | ติด tag ลูกบอลตัวที่คลิก เพื่อตามดู |

### Output (Canvas 1000×500)
- **บน:** แถวลูกบอล 24 จุด · ลูกที่ติด tag เน้นสีแดง · เห็นการสั่นรอบจุดสมดุล
- **กลาง:** กราฟ y vs x (Displacement) เป็นไซน์เคลื่อนที่
- **ล่าง:** กราฟ ΔP vs x (Pressure) เป็นไซน์ เฟสต่างจาก y เท่ากับ π/2
- เครื่องหมาย "C" และ "R" บนแถวลูกบอลเพื่อระบุ compression/rarefaction

### POE Hooks
- **Predict:** "ลูกบอลที่ติด tag จะ (ก) เดินไปทางขวาเรื่อย ๆ (ข) สั่นรอบจุดเดิม"
- **Observe:** ดูลูก tag ตามเวลา · 5 ครั้งของการสั่น
- **ตรวจสอบจุด A–G:** กดบนกราฟ ΔP เลือกตำแหน่ง · sim โชว์ว่า y ที่ตำแหน่งนั้นเท่าไร

### Educational Anchors
- ลูกที่ติด tag ไม่ออกไปจากตำแหน่งสมดุลของมัน
- เมื่อ ΔP สูงสุด → y = 0 (จุดสมดุล)
- เมื่อ y สูงสุด → ΔP = 0 (บรรยากาศ)

---

## S2.2 · sound-graph-sync.html — Dual-Graph (y vs ΔP)

**แผน** 2 · **ใช้ใน** E3-E4 · **เวลา** 8 นาที

### เป้าหมาย
ตอกย้ำเฟสต่างกัน π/2 ระหว่างคลื่นการกระจัดและคลื่นความดัน + ฝึกอ่านจุด A–G ตามรูปในตำราหน้า 20

### Input
| Control | ค่า |
|---------|-----|
| λ (slider) | 0.5–4 m |
| Amplitude (slider) | 1–10 (relative) |
| Sync Mode (toggle) | Show Phase Difference |

### Output (SVG 800×400)
- กราฟ y vs x (สีน้ำเงิน) + กราฟ ΔP vs x (สีแดง) ซ้อนใน plot เดียวกัน
- จุด A–G ทำ marker คงที่ตามตำราหน้า 20
- กดบนจุดใด ๆ → popup แสดง "y = ..., ΔP = ..."

### POE Hooks
- **Quiz Mode:** sim ถามทีละจุด "ตำแหน่ง B y = ?" นักเรียนคลิกตำแหน่งบนแกน y
- **Tutorial Mode:** sim พาทัวร์จุด A→G อธิบายทีละจุด

---

## S3.1 · sound-speed-temp.html — v = 331 + 0.6·T

**แผน** 3 · **ใช้ใน** E3 Explain · **เวลา** 5 นาที

### Input
| Control | ค่า |
|---------|-----|
| Temperature (slider) | −50 ถึง 50 °C |
| Frequency (input) | 100–10000 Hz (สำหรับคำนวณ λ) |

### Output
- **Big Number Display:** v = ___ m/s (อัพเดต real-time)
- กราฟ v vs T_C (เส้นตรง slope 0.6)
- λ = v/f แสดงข้างใต้
- ตารางอ้างอิง v ในเหล็ก/น้ำ/อากาศ/ฮีเลียม สำหรับเทียบ

### Math Tutor
- กดปุ่ม "Show Steps" → SHOW การคำนวณทีละขั้น
- กดปุ่ม "Random Problem" → สุ่มโจทย์ + รอเฉลย

---

## S3.2 · echo-timing.html — วัด v จาก Echo

**แผน** 3 · **ใช้ใน** E2 Explore · **เวลา** 10 นาที

### เป้าหมาย
จำลองการตบมือหน้าผา · จับเวลา echo · คำนวณ v

### Input
| Control | ค่า |
|---------|-----|
| Distance to wall (slider) | 10–500 m |
| Temperature (slider) | 0–40 °C |
| Clap (button) | ปล่อยเสียง + เริ่มจับเวลา |
| Stop (button) | กดเมื่อได้ยินกลับ (นักเรียนกดเอง) |

### Output
- SVG: คน · หน้าผา · คลื่นเสียงเคลื่อนที่ (animated arrow)
- Readout: t (s) ที่นักเรียนจับ vs t จริงที่ sim คำนวณ
- คำนวณ v = 2d/t · เทียบ v=331+0.6T
- คำนวณ error %

### Gamification
- ทำซ้ำ 5 ครั้ง · sim สรุปค่าเฉลี่ย + standard deviation

---

## S4.1 · sound-reflection.html — มุมตกกระทบ = มุมสะท้อน

**แผน** 4 · **ใช้ใน** E2 Station A · **เวลา** 8 นาที

### Input
| Control | ค่า |
|---------|-----|
| Incident Angle (slider) | 0–80° |
| Surface Type (radio) | เรียบ (กระจก) · ขรุขระ (กระดาษ) |
| Send Pulse (button) | ปล่อยคลื่นเสียง pulse |

### Output (Canvas 800×400)
- รังสีเสียง incident + reflected · มุมแสดงเป็น dial
- เส้นปกติ (normal) เป็น dashed
- ผิวสะท้อน "เรียบ" → 1 ray สะท้อน · "ขรุขระ" → กระจาย (scatter)

---

## S4.2 · sound-refraction.html — เสียงโค้งกลางคืน

**แผน** 4 · **ใช้ใน** E2 Station B · **เวลา** 8 นาที

### Input
- Time of Day (slider): กลางวัน · เย็น · กลางคืน
- Temperature gradient (auto): กลางวัน +5°C/m (พื้นร้อน) · กลางคืน −5°C/m
- Distance to listener (slider): 50–500 m

### Output
- SVG: ตัดข้างของชั้นบรรยากาศ · wavefront (เป็นวงโค้ง) เคลื่อนที่
- กลางวัน: wavefront โค้งขึ้นฟ้า (เสียงหนีฟ้า)
- กลางคืน: wavefront โค้งกลับลงพื้น (เสียงไปได้ไกล)
- Slider แสดง "Listener ได้ยินไหม" → ✓ หรือ ✗

---

## S4.3 · sound-diffraction.html — เลี้ยวเบนผ่านขอบ

**แผน** 4 · **ใช้ใน** E2 Station C · **เวลา** 8 นาที

### Input
- Frequency (slider): 100–10000 Hz → λ คำนวณจาก v=343
- Slit/Opening width (slider): 0.1–2 m
- Wall position (drag)

### Output
- 2D ripple pattern ผ่านช่องเปิด · ใช้ Huygens principle visualization
- เมื่อ λ ≈ ขนาดช่อง → กระจายเป็นวงครึ่ง (เลี้ยวเบนดี)
- เมื่อ λ ≪ ขนาดช่อง → เป็นลำตรง (เลี้ยวเบนน้อย)
- Readout: "ratio λ/d = ..."

---

## S4.4 · sound-interference.html — 2 ลำโพง

**แผน** 4 · **ใช้ใน** E2 Station D · **เวลา** 8 นาที

### Input
- Frequency (slider): 200–2000 Hz
- Speaker distance d (slider): 0.5–4 m
- Listener position (drag)

### Output
- Canvas 1000×500: 2 จุดลำโพง + ripple จากแต่ละจุด · จุดที่เสริม (สีฟ้า) · หักล้าง (สีแดง)
- คลิก/drag ตำแหน่งผู้ฟัง → readout แสดง "ดัง" หรือ "เบา" + คำนวณ S₁P − S₂P
- ยืนยัน: เสริมที่ |S₁P − S₂P| = nλ, หักล้างที่ (n+½)λ

---

## S5.1 · sound-intensity.html — Inverse Square

**แผน** 5 · **ใช้ใน** E2 · **เวลา** 8 นาที

### Input
- Power P (slider): 0.01–100 W
- Distance r (slider): 0.1–50 m

### Output
- SVG: แหล่งจุด + ทรงกลม (3 ขั้นซ้อน) · แสดงพื้นที่ผิว 4πr²
- Big Display: I = P/(4πr²) W/m²
- β = 10·log(I/I₀) dB
- กราฟ I vs r (1/r²) · β vs r (log curve)
- "ลด r ครึ่งหนึ่ง → I เพิ่มกี่เท่า?" quiz inline

---

## S5.2 · decibel-meter.html — dB scale + Real-life

**แผน** 5 · **ใช้ใน** E1 Engage · **เวลา** 5 นาที

### Input
- I (slider, log scale): 10⁻¹² ถึง 10² W/m²
- Compare 2 sources (toggle): เพิ่ม second I

### Output
- Vertical bar showing dB level · marker ที่ระดับสถานที่จริง (สนทนา, รถ, คอนเสิร์ต ฯลฯ)
- Real-time conversion I ↔ β
- เมื่อ 2 sources: คำนวณ β รวม = 10·log((I₁+I₂)/I₀)
- "ลด β 30 dB ด้วย earplug" simulator

---

## S6.1 · audiogram-test.html — Online Hearing Test

**แผน** 6 · **ใช้ใน** E2 Explore · **เวลา** 10 นาที

### Input
- Frequency dropdown: 100, 500, 1k, 2k, 4k, 8k, 12k, 15k, 17k, 20k Hz
- Volume slider (calibrated): −30 to 0 dB FS
- "I can hear" button (per frequency)

### Output
- Web Audio API ปล่อยเสียง sine คงที่
- ตาราง: f | threshold dB ที่เริ่มได้ยิน
- กราฟ Audiogram (frequency vs threshold) · เทียบกับ "ปกติเด็ก" / "ปกติผู้ใหญ่"
- คำเตือน: "ใช้หูฟัง · ในห้องเงียบ · ไม่ทดแทนการตรวจหู"

---

## S6.2 · noise-audit.html — จำลอง dB ในสถานที่

**แผน** 6 · **ใช้ใน** E4 Elaborate · **เวลา** 8 นาที

### Input
- เลือกสถานที่ (dropdown): โรงอาหาร · ห้องเรียน · สนาม · ห้องสมุด · ทางเดิน
- กดเล่นเสียง ambient (recorded clip 10 s)
- เลือกแนวทางลด (checkbox): ฉนวน · ปิดประตู · ใช้ earplug ...

### Output
- Real-time dB meter (จาก clip)
- เทียบกับมาตรฐาน OSHA / กรมควบคุมมลพิษ
- คำนวณ "หลังลด" β ตามวิธีที่เลือก
- บันทึก journal สำหรับงาน PBL

---

## S7.1 · fourier-builder.html — Sine + Harmonics → Square

**แผน** 7 · **ใช้ใน** E2 Explore · **เวลา** 10 นาที

### Input
- Fundamental f₁ (slider): 100–500 Hz
- Amplitude of each harmonic (10 sliders): A₁, A₂, ..., A₁₀ (0–1)
- Preset (dropdown): Pure Sine · Square · Triangle · Sawtooth · Random

### Output
- กราฟผลรวมแบบ time domain (Canvas 800×200)
- Spectrum bar chart (FFT-like) แสดง amplitude ของแต่ละ harmonic
- เล่นเสียงผ่าน Web Audio API (oscillator + gain nodes)

### POE Hook
- Preset "Square" → กราฟ time domain ใกล้สี่เหลี่ยม · spectrum มีเฉพาะ harmonic คี่ (1, 3, 5, 7, ...)
- ปุ่ม "Reset to Sine" → กลับไป pure tone

---

## S7.2 · instrument-spectrum.html — Spectrum 5 เครื่องดนตรี

**แผน** 7 · **ใช้ใน** E2 Explore · **เวลา** 8 นาที

### Input
- เลือกเครื่อง (dropdown): ขลุ่ยไทย · ทรัมเป็ต · กีตาร์ · ระนาด · เปียโน
- เล่นโน้ต A4 (440 Hz) · ปุ่ม Play
- "Show Spectrum" toggle

### Output
- Waveform time-domain (ต่างกันชัดเจน)
- FFT spectrum bar chart · เห็น f₁=440 + harmonics ต่าง ๆ
- เทียบ side-by-side 2 เครื่อง
- Audio recordings ของแต่ละเครื่องบันทึกเป็น .wav แนบมาด้วย

---

## S8.1 · resonance-tube.html — Resonance Tube

**แผน** 8 · **ใช้ใน** E2 Explore · **เวลา** 15 นาที

### Input
- Frequency (slider): 500, 1000, 1500, 2000, 3000 Hz
- Piston position L (slider): 0–100 cm (ความยาวลำอากาศ)
- Temperature (slider): 0–40 °C
- "Tap Speaker" (button) — pulse 1 ครั้ง

### Output (SVG cross-section)
- ท่อแก้ว + ลูกสูบ + ลำโพงที่ปลายเปิด
- เมื่อ L = (2k−1)·λ/4 → แสดง standing wave shape (sin curve) ในท่อ + ลำโพงเสียงดังขึ้น (visual loud indicator)
- Readout: f, L, λ คำนวณ, v คำนวณ, % error เทียบกับ v=331+0.6T
- ตารางบันทึก L₁, L₂, L₃ ที่นักเรียนจดเอง

### POE Hook
- "เลื่อนลูกสูบช้า ๆ จากซ้ายไปขวา · จดตำแหน่งที่เสียงดังที่สุด 2 ครั้ง · คำนวณ v"

---

## S8.2 · standing-wave-pipe.html — Modes ในท่อ

**แผน** 8 · **ใช้ใน** E3 Explain · **เวลา** 8 นาที

### Input
- Pipe Type (radio): ปลายปิด 1 ข้าง · ปลายเปิด 2 ข้าง
- Length L (slider): 0.1–2 m
- Mode n (button): 1, 2, 3, 4, 5

### Output
- SVG: ท่อ + standing wave overlay สำหรับ y(x) และ ΔP(x)
- Marker node/antinode สีต่างกัน
- Readout: f_n, λ_n
- ปลายปิด: แสดงเฉพาะ n คี่ (1, 3, 5) · กด n=2, 4 → "Mode ไม่มีอยู่!"

---

## S9.1 · beat-2tone.html — 2 ส้อมเสียง

**แผน** 9 · **ใช้ใน** E2 Explore · **เวลา** 8 นาที

### Input
- f₁ (slider): 400–500 Hz
- f₂ (slider): 400–520 Hz
- Volume (slider)
- Play / Pause

### Output
- 2 sine wave plot ซ้อนกัน + plot ของ envelope (ผลรวม)
- เล่นเสียงผ่าน Web Audio API (2 oscillators)
- Readout: |f₁−f₂| = f_b · "expected beats/10s = ..."
- Counter ให้นักเรียนนับเสียง dang/baoy → เปรียบกับค่า expected

### POE
- Δf = 2, 4, 10, 20 Hz · "เลื่อนถึง Δf เท่าไรจึงไม่ได้ยินเป็น beat?"

---

## S9.2 · guitar-tune.html — จูนกีตาร์

**แผน** 9 · **ใช้ใน** E4 Elaborate · **เวลา** 10 นาที

### Input
- Reference tone (button): 440 Hz fixed
- String tension knob (drag dial): 380–500 Hz
- Play Both

### Output
- 2 sine plot + envelope (beat)
- Beat frequency counter (numeric)
- Win Condition: f_b < 1 Hz for 3 วินาที → "🎉 ปรับสำเร็จ!"
- Gamification: บันทึก best time

---

## S10.1 · doppler-ambulance.html — Doppler

**แผน** 10 · **ใช้ใน** E2 Explore · **เวลา** 10 นาที

### Input
- f₀ (slider): 500–2000 Hz
- v_source (slider): −50 ถึง +50 m/s
- v_listener (slider): −30 ถึง +30 m/s (+ = เข้าหา source)
- Temperature (slider): สำหรับ v_sound
- Play

### Output
- Canvas 1200×400: รถพยาบาล (เคลื่อน) · คน 1 คน (ผู้ฟัง) · wavefront วงกลมรอบรถ (อัด/ขยายขึ้นกับทิศ)
- Audio: เสียง f' ที่ผู้ฟังได้ยินจริง (real-time Doppler shift)
- Readout: f' = ___, สูตร f' = f₀(v±v_L)/(v∓v_S)
- "POV switch": ฟังเป็นคนข้างทาง vs คนขับ

---

## S10.2 · mach-cone.html — Shock Wave

**แผน** 10 · **ใช้ใน** E3 Explain · **เวลา** 6 นาที

### Input
- Aircraft Speed (slider): 0–3 Mach
- Altitude (slider): 0–20 km (เพื่อ v_sound)

### Output
- Canvas: เครื่องบิน + wavefront วงกลมที่ปล่อยออกจากตำแหน่งต่าง ๆ ขณะบิน
- Mach < 1: wavefronts ไม่ทับกัน · ไม่มี shock cone
- Mach = 1: wavefronts ซ้อนพอดีที่ปลาย
- Mach > 1: เกิด Mach cone · มุม θ = arcsin(1/M)
- Readout: M, θ, "Sonic Boom heard at ..."

---

## S11.1 · sound-synthesis-map.html — Cluster Synthesis Map

**แผน** 11 · **ใช้ใน** E4 Synthesis · **เวลา** 15 นาที

### เป้าหมาย
ให้นักเรียนเห็นภาพรวมว่าเทคโนโลยี/การประยุกต์ใช้ความรู้เรื่องเสียงในชีวิตประจำวันใช้แนวคิดอะไรจากแผน 1–10

### Input
- Drag-and-drop: 6 เทคโนโลยี (ขลุ่ย, NC headphone, Ultrasound, Sonar, Cochlear implant, Echolocation)
- ลากไปวางบน "แนวคิดของเสียง" 8 หมวด (Standing wave, Doppler, Reflection, Interference, Resonance, Harmonics, dB, Audible range)

### Output
- เครือข่ายเส้น (network graph) แสดงการเชื่อมโยง
- Readout: แต่ละเทคโนโลยีใช้แนวคิดกี่ตัว · เทคโนโลยีใดใช้มากที่สุด
- Final state แชร์ผ่าน URL/QR

---

## หมายเหตุการพัฒนา

### Priority Tier
- **Tier 1 (จำเป็น/ทำก่อน)** — S2.1, S4.4, S7.1, S8.1, S9.1, S10.1 (sims ที่เป็นแกนของแผน · ไม่มีไม่ได้)
- **Tier 2 (สำคัญ)** — S1.1, S2.2, S3.1, S4.2, S4.3, S5.1, S6.1, S8.2 (ขยายความเข้าใจหลัก)
- **Tier 3 (เสริม)** — S1.2, S3.2, S5.2, S6.2, S7.2, S9.2, S10.2, S11.1 (เพิ่มประสบการณ์)

### Stack & Tools
- ใช้ **Vanilla JS** เพื่อ portability + offline
- **Web Audio API** สำหรับเสียงจริง (sine oscillators · gain nodes · panner)
- **Canvas/SVG** สำหรับ visualization
- **localStorage** สำหรับ persistence (state + journal)
- เชื่อมกับ `shared/worksheet-core.js` (auto-fill identity, JSON export)
- เชื่อมกับ `shared/pace-auto.js` (teacher pace control)

### Accessibility
- ทุก sim มี keyboard navigation (Tab/Space/Arrow keys)
- มี option "Reduce Motion" สำหรับนักเรียนที่ไวต่อแสง
- Color-blind safe palette (เลี่ยงแดง-เขียวคู่กัน)
- Alt-text สำหรับ canvas visualization

### Testing Checklist (ครู)
- [ ] เปิดในมือถือ (responsive)
- [ ] เสียง Web Audio API ใช้งานได้ (ต้อง user gesture)
- [ ] Slider เปลี่ยนค่าแล้ว visualization อัพเดต < 100 ms
- [ ] บันทึก state แล้วเปิดใหม่ → คืนสภาพ
- [ ] Print-friendly view (กด P → CSS print mode)

---

**ผู้เขียนสเปก** ผู้ช่วยเจน · **สำหรับ** ครูโกเมน ปาปะโถ · **อัปเดต** 2026-05-13
