// ═══════════════════════════════════════════════════════════════════
// Content Pack: Media (สื่อและเครื่องมือของแต่ละแผน)
// ═══════════════════════════════════════════════════════════════════
// โชว์ในแท็บ "📚 สื่อ/เครื่องมือ" ของ Teacher Dashboard
// โครงสร้าง: { planNo: { folder, title, meta, sections:[{title, items:[...]}], linkOut:[...] } }
// ═══════════════════════════════════════════════════════════════════

window.KP_PLAN_MEDIA = {
  1: {
    folder: 'lessons/physics3/waves/แผน01_การเกิดคลื่นและชนิดของคลื่น',
    title: 'แผน 1 — การเกิดคลื่น ชนิดของคลื่น และส่วนประกอบของคลื่น',
    meta: 'ว30203 ฟิสิกส์ 3 · ม.5 · คาบ 1–2 (100 นาที) · ผลการเรียนรู้ข้อ 1',
    sections: [
      { title: '🗺 แผนภาพรวม', items: [
        { cls:'info', no:'00', t:'Infographic แผน 1 (ฉบับสมบูรณ์)', file:'แผน1_Infographic.html',
          d:'ภาพรวมทั้งแผน: สาระ · K/P/A · 5E+POE 9 ขั้น · สื่อ · การวัด · วPA ด้านที่ 1 · Timeline', chips:[] },
        { cls:'sim', no:'SIM', t:'wave-types.html · Simulation', file:'wave-types.html',
          d:'Interactive เปรียบเทียบคลื่นน้ำ/เสียง/เชือก ใช้ในฉาก E2 Explore', chips:[] }
      ]},
      { title: '🎨 สื่อการสอน (ใช้ในกิจกรรม)', items: [
        { cls:'e1', no:'01', t:'Concept Cartoon "ของลอยในทะเล"', file:'สื่อ01_ConceptCartoon_ของลอยในทะเล.html',
          d:'ตัวละคร 3 คนถกเถียง → กระตุ้น POE-P', meta:'ใช้ในฉาก E1 Engage · 15 นาที',
          chips:[['m','M1.1'],['','POE-P']] },
        { cls:'e2', no:'02', t:'POE-01 ใบบันทึก P / O / E', file:'สื่อ02_POE-01_ใบบันทึกPOE.html',
          d:'นักเรียนบันทึก Predict · Observe · Explain ตลอดฉาก E1–E3', meta:'ใช้ในฉาก E1, E2, E3',
          chips:[['p','P1'],['p','P2'],['m','M1.1'],['m','M1.2']] },
        { cls:'e4', no:'03', t:'ใบกิจกรรม 1.1 · Matrix Table', file:'สื่อ03_MatrixTable_ใบกิจกรรม1.1.html',
          d:'เปรียบเทียบคลื่นตามขวาง vs ตามยาว 6 ประเด็น', meta:'ใช้ในฉาก E4 Elaborate · 8 นาที',
          chips:[['k','K2'],['m','M1.1'],['m','M1.2']] },
        { cls:'e4', no:'04', t:'ใบกิจกรรม 1.2 · Spot the Error', file:'สื่อ04_SpotTheError_ใบกิจกรรม1.2.html',
          d:'หาข้อผิดพลาดในข้อความ/ภาพ 4 ข้อ', meta:'ใช้ในฉาก E4 Elaborate · 7 นาที',
          chips:[['k','K2'],['p','P2'],['m','M1.3'],['m','M1.4']] },
        { cls:'sim', no:'SIM2', t:'wave-components.html · ส่วนประกอบของคลื่น', file:'wave-components.html',
          d:'Simulation 3 แท็บ (Sim/Theory/POE) · slider A/f/v · กราฟ y–x และ y–t · preset ตัวกลาง 3 แบบ · ชน M4 (f คงที่แม้เปลี่ยนตัวกลาง)',
          meta:'ใช้ในฉาก E4 Elaborate · 10–15 นาที',
          chips:[['k','K2'],['k','K3'],['m','M1.4'],['w','วPA 3,5']] }
      ]},
      { title: '📊 เครื่องมือวัดและประเมิน', items: [
        { cls:'ft', no:'05', t:'F1 Four-tier · Pre + Post', file:'สื่อ05_F1_Fourtier_PrePost.html',
          d:'3 ข้อ · วัด K1, K2, K3 · เทียบ Pre→Post คำนวณ Normalized gain',
          meta:'ใช้ในฉาก F1 Pre (5\') + F1 Post (7\')',
          chips:[['k','K1'],['k','K2'],['k','K3'],['m','M1.1'],['m','M1.2'],['m','M1.4'],['w','วPA 2,6']] },
        { cls:'tlc', no:'06', t:'TL-01 · Traffic Light Card', file:'สื่อ06_TL-01_TrafficLight.html',
          d:'บัตรประเมินตนเอง 🟢🟡🔴 + Template สำหรับพิมพ์ตัด',
          meta:'ใช้ในฉาก TLC ก่อน (3\') + TLC หลัง (3\')',
          chips:[['a','A1'],['w','วPA 4,7']] },
        { cls:'mj', no:'07', t:'MJ-01 · Metacognitive Journal 3-2-1', file:'สื่อ07_MJ-01_MetacognitiveJournal.html',
          d:'3 เข้าใจใหม่ · 2 น่าสนใจ · 1 คำถาม + Goal Setting', meta:'ใช้ในฉาก MJ · 2 นาที',
          chips:[['a','A2'],['w','วPA 6,8']] },
        { cls:'ob', no:'08', t:'OB-01 · แบบสังเกตพฤติกรรม', file:'สื่อ08_OB-01_แบบสังเกตพฤติกรรม.html',
          d:'ครูบันทึก 3 ส่วน: รายบุคคล · กลุ่ม · ข้อสังเกตเพิ่มเติม (A4 Landscape)',
          meta:'ใช้ตลอด 100 นาที',
          chips:[['p','P1'],['p','P2'],['a','A1'],['w','วPA 4,7']] },
        { cls:'rubric', no:'09', t:'POE Rubric · เกณฑ์ให้คะแนน (0–3)', file:'สื่อ09_POE_Rubric_เกณฑ์ให้คะแนน.html',
          d:'Rubric รายด้าน P/O/E + ตัวอย่างคะแนน + ตารางบันทึก', meta:'ครูใช้ประเมินใบ POE-01',
          chips:[['p','P1'],['p','P2'],['w','วPA 3,5']] }
      ]}
    ],
    linkOut: [
      'F1 Pre/Post → ตาราง % Sound · Misconception · Normalized gain ของแผน 1',
      'POE-01 + POE Rubric → ตารางคะแนน POE รายบุคคล/กลุ่ม · เฉลี่ย ≥ 2.0',
      'TL-01 → อัตราบัตรเขียวก่อน-หลัง · เป้าหมาย ≥ 60%',
      'MJ-01 → คำถามเด่นเป็น Hook แผน 2 · หลักฐาน Self-regulation',
      'OB-01 → คะแนนพฤติกรรม · หลักฐานวPA ด้านที่ 1 ข้อ 4, 7'
    ]
  },
  2: {
    folder: 'lessons/physics3/waves/แผน02_ความเร็วคลื่น',
    title: 'แผน 2 — ความเร็วคลื่น v = fλ = √(T/μ)',
    meta: 'ว30203 ฟิสิกส์ 3 · ม.5 · คาบ 3–4 (100 นาที) · ผลการเรียนรู้ข้อ 2',
    sections: [
      { title: '🗺 แผนภาพรวม', items: [
        { cls:'info', no:'00', t:'Infographic แผน 2 (ฉบับสมบูรณ์)', file:'แผน2_Infographic.html',
          d:'ภาพรวมทั้งแผน: สาระ · K/P/A · 5E+POE 9 ขั้น · สื่อ · การวัด · วPA ด้านที่ 1 · Timeline', chips:[] },
        { cls:'sim', no:'SIM', t:'Lab 38 — Wave Speed on a String (KP Science)', file:'wave-on-a-string.html',
          d:'Virtual Lab วัดความเร็วคลื่น 4 วิธี: จากระยะทาง · จาก λ · วัดคาบ · วัดความถี่ · ปรับ T, μ, f, A · ตารางบันทึก + %Error + Export CSV',
          chips:[['m','M2.1'],['m','M2.2'],['m','M2.3'],['m','M2.4']] }
      ]},
      { title: '🎨 สื่อการสอน (ใช้ในกิจกรรม)', items: [
        { cls:'e1', no:'01', t:'Concept Cartoon "เชือกกระโดดสามพี่น้อง"', file:'สื่อ01_ConceptCartoon_เชือกกระโดดสามพี่น้อง.html',
          d:'ตัวละคร 3 คนถกเถียง f กับ v ของคลื่นในเชือก → กระตุ้น POE-P', meta:'ใช้ในฉาก E1 Engage · 12 นาที',
          chips:[['m','M2.1'],['m','M2.2'],['','POE-P']] },
        { cls:'e2', no:'02', t:'POE-01 ใบบันทึก P / O / E', file:'สื่อ02_POE-01_ใบบันทึกPOE.html',
          d:'นักเรียนบันทึก Predict · Observe (Lab 38: 4 วิธีวัด + ทดสอบตัวแปร A/B/C/D) · Explain ตลอด E1–E3',
          meta:'ใช้ในฉาก E1, E2, E3',
          chips:[['p','P1'],['p','P2'],['m','M2.1'],['m','M2.2'],['m','M2.3'],['m','M2.4']] },
        { cls:'e4', no:'03', t:'ใบกิจกรรม 2.1 · โจทย์คำนวณ v=fλ=√(T/μ)', file:'สื่อ03_โจทย์คำนวณ_ใบกิจกรรม2.1.html',
          d:'5 ข้อ ไล่ระดับ สสวท. → สอวน./PAT2 (เน้น M2.1, M2.2, M2.4)', meta:'ใช้ในฉาก E4 Elaborate · 15 นาที',
          chips:[['k','K2'],['p','P1'],['m','M2.1'],['m','M2.2'],['m','M2.4']] },
        { cls:'e4', no:'04', t:'ใบกิจกรรม 2.2 · Spot the Error', file:'สื่อ04_SpotTheError_ใบกิจกรรม2.2.html',
          d:'หาข้อผิดพลาดใน 3 สถานการณ์ · เน้น M2.1 (v↔f) และ M2.4 (f เปลี่ยนตามตัวกลาง)', meta:'ใช้ในฉาก E4 Elaborate · 10 นาที',
          chips:[['k','K2'],['p','P2'],['m','M2.1'],['m','M2.4']] }
      ]},
      { title: '📊 เครื่องมือวัดและประเมิน', items: [
        { cls:'ft', no:'05', t:'F2 Four-tier · Pre + Post', file:'สื่อ05_F2_Fourtier_PrePost.html',
          d:'3 ข้อ · วัด M5, M4, เฟส · เทียบ Pre→Post คำนวณ Normalized gain',
          meta:'ใช้ในฉาก F2 Pre (5\') + F2 Post (7\')',
          chips:[['k','K1'],['k','K2'],['k','K3'],['m','M4'],['m','M5'],['w','วPA 2,7']] },
        { cls:'tlc', no:'06', t:'TL-01 · Traffic Light Card', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ06_TL-01_TrafficLight.html',
          d:'บัตรประเมินตนเอง 🟢🟡🔴 (ใช้ร่วมกับแผน 1)', meta:'ใช้ในฉาก TLC ก่อน + TLC หลัง',
          chips:[['a','A1'],['w','วPA 4,7']] },
        { cls:'mj', no:'07', t:'MJ-01 · Metacognitive Journal 3-2-1', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ07_MJ-01_MetacognitiveJournal.html',
          d:'3 เข้าใจใหม่ · 2 น่าสนใจ · 1 คำถาม (ใช้ร่วมกับแผน 1)', meta:'ใช้ในฉาก MJ · 2 นาที',
          chips:[['a','A2'],['w','วPA 6,8']] },
        { cls:'ob', no:'08', t:'OB-01 · แบบสังเกตพฤติกรรม', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ08_OB-01_แบบสังเกตพฤติกรรม.html',
          d:'ครูบันทึก 3 ส่วน: รายบุคคล · กลุ่ม · ข้อสังเกต (ใช้ร่วมกับแผน 1)', meta:'ใช้ตลอด 100 นาที',
          chips:[['p','P1'],['p','P2'],['a','A1'],['w','วPA 4,7']] },
        { cls:'rubric', no:'09', t:'POE Rubric · เกณฑ์ให้คะแนน (0–3)', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ09_POE_Rubric_เกณฑ์ให้คะแนน.html',
          d:'Rubric รายด้าน P/O/E + ตัวอย่างคะแนน + ตารางบันทึก', meta:'ครูใช้ประเมินใบ POE-01',
          chips:[['p','P1'],['p','P2'],['w','วPA 3,5']] }
      ]}
    ],
    linkOut: [
      'F2 Pre/Post → ตาราง % Sound · Misconception M4, M5 · Normalized gain ของแผน 2',
      'POE-01 + POE Rubric → ตารางคะแนน POE รายบุคคล/กลุ่ม · เฉลี่ย ≥ 2.0',
      'Lab 38 (4 วิธีวัด) + ทดสอบตัวแปร A/B/C/D → หลักฐานเชิงประจักษ์หักล้าง M2.1–M2.4',
      'TL-01 → อัตราบัตรเขียวก่อน-หลัง · เป้าหมาย ≥ 60%',
      'MJ-01 → คำถามเด่นเป็น Hook แผน 3 · หลักฐาน Self-regulation',
      'OB-01 → คะแนนพฤติกรรม · หลักฐานวPA ด้านที่ 1 ข้อ 4, 7'
    ]
  },
  3: {
    folder: 'lessons/physics3/waves/แผน03_คลื่นดลคลื่นต่อเนื่องและเฟส',
    title: 'แผน 3 — คลื่นดล คลื่นต่อเนื่อง และเฟสของคลื่น',
    meta: 'ว30203 ฟิสิกส์ 3 · ม.5 · คาบ 5–6 (100 นาที) · ผลการเรียนรู้ข้อ 1–2',
    sections: [
      { title: '🗺 แผนภาพรวม', items: [
        { cls:'info', no:'00', t:'Infographic แผน 3 (ฉบับสมบูรณ์)', file:'แผน3_Infographic.html',
          d:'ภาพรวมทั้งแผน: สาระ · K/P/A · 5E+POE 9 ขั้น · สื่อ · การวัด · วPA ด้านที่ 1 · Timeline', chips:[] },
        { cls:'sim', no:'SIM', t:'Lab 39 — Phase Circle Wave (KP Science)', file:'https://kp-science.github.io/physics-simulations/Virtual%20Physics%20Lab%2002/39.%20phase-circle-wave.html',
          d:'Virtual Lab · ใช้ในฐาน 1+2+3 · เลื่อน Δx/Δφ · วัด v · ซ้อน 2 คลื่น · phase circle + ribbon marker',
          chips:[['k','K2'],['p','P1'],['m','M3.2'],['m','M3.3'],['m','M3.4']] }
      ]},
      { title: '🎨 สื่อการสอน (ใช้ในกิจกรรม)', items: [
        { cls:'e1', no:'01', t:'Concept Cartoon "ริบบิ้น 2 เส้นบนเชือก"', file:'สื่อ01_ConceptCartoon_ริบบิ้นบนเชือก.html',
          d:'3 ตัวละคร (น้องพลอย/พี่ต้น/พี่มีน) ถกเถียงว่าริบบิ้นห่างกัน λ/2 จะสั่นพร้อมกันหรือสวนทาง',
          meta:'ใช้ในฉาก E1 Engage · 15 นาที',
          chips:[['m','M3.2'],['m','M3.3'],['m','M3.4'],['','POE-P']] },
        { cls:'e2', no:'02', t:'POE-03 ใบบันทึก P / O / E', file:'สื่อ02_POE-03_ใบบันทึกPOE.html',
          d:'บันทึก Predict (2 ข้อ · ริบบิ้น + v) · Observe 3 ฐาน (Slinky/Strobe/Sim) · Explain เชื่อมสู่สูตร Δφ',
          meta:'ใช้ตลอด E1–E3',
          chips:[['p','P1'],['p','P2'],['m','M3.1'],['m','M3.2'],['m','M3.3'],['m','M3.4']] },
        { cls:'e1', no:'03', t:'Video Hook Storyboard (90 วินาที)', file:'สื่อ03_VideoHook_Storyboard.html',
          d:'5 ช็อต: ตบมือ→กลองรัว · Pulse vs Continuous · v เท่ากันไหม · Phase reveal · CTA',
          meta:'เปิดก่อน Concept Cartoon · 90 วิ',
          chips:[['m','M3.1'],['m','M3.2'],['m','M3.4']] },
        { cls:'e4', no:'04', t:'ใบกิจกรรม 3.1 · Calc Phase (Δφ)', file:'สื่อ04_Calc_ใบกิจกรรม3.1.html',
          d:'5 ข้อไล่ระดับ: พื้นฐาน 2 (λ/4, 3λ/2) · ประยุกต์ 2 (Δx↔Δφ) · ท้าทาย 1 (multi-step + M3.2)',
          meta:'ใช้ในฉาก E4 Elaborate · 12 นาที',
          chips:[['k','K2'],['m','M3.2'],['m','M3.4']] },
        { cls:'e4', no:'05', t:'ใบกิจกรรม 3.2 · Spot the Error', file:'สื่อ05_Spot_ใบกิจกรรม3.2.html',
          d:'3 ข้อความจาก 3 ตัวละคร (พี่เจ๋ง M3.2 · น้องฟ้า M3.4 · พี่มิ้น M3.3) หาผิด + อธิบายให้ถูก',
          meta:'ใช้ในฉาก E4 Elaborate · 10 นาที',
          chips:[['k','K3'],['p','P2'],['m','M3.2'],['m','M3.3'],['m','M3.4']] }
      ]},
      { title: '📊 เครื่องมือวัดและประเมิน', items: [
        { cls:'ft', no:'07', t:'F3 Four-tier · Pre + Post', file:'สื่อ07_F3_Fourtier_PrePost.html',
          d:'3 ข้อ · วัด M3.1 (ดล/ต่อเนื่อง) · M3.3 (เฟส=สถานะสั่น) · M3.4 (180° หักล้าง) · Tier 1+3 + มั่นใจ',
          meta:'ใช้ในฉาก F3 Pre (5\') + F3 Post (7\')',
          chips:[['k','K1'],['k','K2'],['k','K3'],['m','M3.1'],['m','M3.3'],['m','M3.4'],['w','วPA 2,6']] },
        { cls:'tlc', no:'TL', t:'TL-01 · Traffic Light Card', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ06_TL-01_TrafficLight.html',
          d:'บัตรประเมินตนเอง 🟢🟡🔴 (ใช้ร่วมกับแผน 1)', meta:'ใช้ในฉาก TLC ก่อน + TLC หลัง',
          chips:[['a','A1'],['w','วPA 4,7']] },
        { cls:'mj', no:'MJ', t:'MJ-01 · Metacognitive Journal 3-2-1', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ07_MJ-01_MetacognitiveJournal.html',
          d:'3 เข้าใจใหม่ · 2 น่าสนใจ · 1 คำถาม (ใช้ร่วมกับแผน 1)', meta:'ใช้ในฉาก MJ · 2 นาที',
          chips:[['a','A2'],['w','วPA 6,8']] },
        { cls:'ob', no:'OB', t:'OB-01 · แบบสังเกตพฤติกรรม', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ08_OB-01_แบบสังเกตพฤติกรรม.html',
          d:'ครูบันทึก 3 ส่วน: รายบุคคล · กลุ่ม · ข้อสังเกต (ใช้ร่วมกับแผน 1)', meta:'ใช้ตลอด 100 นาที',
          chips:[['p','P1'],['p','P2'],['a','A1'],['w','วPA 4,7']] },
        { cls:'rubric', no:'R', t:'POE Rubric · เกณฑ์ให้คะแนน (0–3)', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ09_POE_Rubric_เกณฑ์ให้คะแนน.html',
          d:'Rubric รายด้าน P/O/E (ใช้ร่วมกับแผน 1)', meta:'ครูใช้ประเมินใบ POE-03',
          chips:[['p','P1'],['p','P2'],['w','วPA 3,5']] }
      ]},
      { title: '🗒 Phase 7 · CER Live Board', items: [
        { cls:'info', no:'CER', t:'CER Board (ใช้ใน E3 Explain)',
          d:'นักเรียนส่ง Claim/Evidence/Reasoning + รูป (ถ่าย/วาด) ขึ้นบอร์ดสดใน WebApp · 3 คอลัมน์: v · เฟสตรง · เฟสตรงข้าม · ครูดู/ฉายจอใน Teacher Dashboard → CER Board tab',
          meta:'ใช้ในฉาก E3 · 8 นาที',
          chips:[['p','P2'],['k','K3'],['w','วPA 3,5,6']] }
      ]}
    ],
    linkOut: [
      'F3 Pre/Post → ตาราง % Sound · Misconception M3.1, M3.3, M3.4 · Normalized gain ของแผน 3',
      'POE-03 + POE Rubric → คะแนน POE รายบุคคล/กลุ่ม · เฉลี่ย ≥ 2.0',
      'Calc 3.1 → คะแนนเฉลี่ย ≥ 70% (เกณฑ์ K2)',
      'CER Board → คลังหลักฐาน Claim-Evidence-Reasoning · วPA ด้าน 1 ข้อ 3, 5, 6',
      'TL-01 → อัตราบัตรเขียวก่อน-หลัง · เป้าหมาย ≥ 60%',
      'MJ-01 → คำถามเด่นเป็น Hook แผน 4 (ซ้อนทับ)',
      'OB-01 → Inquiry Attitude (A1 ≥ 60%) · SRL (A2 ≥ 80%)'
    ]
  },
  4: {
    folder: 'lessons/physics3/waves/แผน04_การซ้อนทับและฮอยเกนส์',
    title: 'แผน 4 — การซ้อนทับของคลื่น + หลักของฮอยเกนส์',
    meta: 'ว30203 ฟิสิกส์ 3 · ม.5 · คาบ 7–8 (100 นาที) · ว2.1 ม.5/3',
    sections: [
      { title: '🗺 แผนภาพรวม', items: [
        { cls:'info', no:'00', t:'Infographic แผน 4 (ฉบับสมบูรณ์)', file:'แผน4_Infographic.html',
          d:'ภาพรวมทั้งแผน: สาระ · K/P/A · 5E+POE 9 ขั้น · สื่อ · การวัด · วPA ด้านที่ 1 · Timeline · Theme ส้ม-แดง', chips:[] },
        { cls:'sim', no:'SIM1', t:'Lab 40 — Pulse Superposition (KP Science)',
          file:'https://kp-science.github.io/physics-simulations/Virtual%20Physics%20Lab%2002/40.%20pulse-superposition.html',
          d:'Virtual Lab · pulse 2 ลูกสวนทาง · slider A₁ A₂ · same/opposite · timeline ก่อน–ขณะ–หลัง · ใช้ใน POE-04 ฐาน 2',
          chips:[['m','M4.1'],['m','M4.2'],['m','M4.3'],['k','K1'],['p','P1']] },
        { cls:'sim', no:'SIM2', t:'Huygens Principle Demo (KP Science)',
          file:'https://kp-science.github.io/physics-simulations/Demo/%E0%B8%84%E0%B8%A5%E0%B8%B7%E0%B9%88%E0%B8%99/huygens-principle-demo.html',
          d:'Demo · หน้าคลื่น → wavelet วงกลม → envelope หน้าคลื่นใหม่ · ใช้ได้ทุกคลื่น (น้ำ/เสียง/แสง) · ใช้ใน POE-04 ฐาน 3',
          chips:[['m','M4.4'],['k','K2'],['p','P1']] }
      ]},
      { title: '🎨 สื่อการสอน (ใช้ในกิจกรรม)', items: [
        { cls:'e1', no:'01', t:'Concept Cartoon "สงครามริ้วคลื่น"', file:'สื่อ01_ConceptCartoon_สงครามริ้วคลื่น.html',
          d:'3 ตัวละคร (พี่บิ๊ก/น้องนุ่น/ครูแพท) · pulse 2 ลูกชนกลางเชือก · ถกเถียงผลหลังพ้นกัน',
          meta:'ใช้ในฉาก E1 Engage · 14 นาที',
          chips:[['m','M4.1'],['m','M4.2'],['m','M4.3'],['','POE-P']] },
        { cls:'e2', no:'02', t:'POE-04 ใบบันทึก P / O / E', file:'สื่อ02_POE-04_ใบบันทึกPOE.html',
          d:'Predict 3 สถานการณ์ (ยอด+ยอด, ยอด+ท้อง, A ต่าง) · Observe 3 ฐาน (Slinky / pulse-superposition / huygens-wavefront) · Explain (checkbox ผลบวก, เสริม, หักล้างชั่วขณะ, คืนรูป) · มีเฉลยครู',
          meta:'ใช้ตลอด E1–E3',
          chips:[['p','P1'],['p','P2'],['m','M4.1'],['m','M4.2'],['m','M4.3'],['m','M4.4']] },
        { cls:'e4', no:'04', t:'ใบกิจกรรม 4.1 · Calc Superposition', file:'สื่อ04_Calc_ใบกิจกรรม4.1.html',
          d:'4 ข้อไล่ระดับ · grid-based drawing · (1) A รวมจากกราฟ (2) ยอด+ท้อง หักล้าง (3) time evolution 5 แถว (4) Huygens ช่องกว้าง vs แคบ · มีแนวตอบครู',
          meta:'ใช้ในฉาก E4 Elaborate · 15 นาที',
          chips:[['k','K2'],['p','P2'],['m','M4.1'],['m','M4.2'],['m','M4.4']] },
        { cls:'e4', no:'05', t:'ใบกิจกรรม 4.2 · Spot the Error', file:'สื่อ05_Spot_ใบกิจกรรม4.2.html',
          d:'3 สถานการณ์ · "ปลาใหญ่กินปลาเล็ก" (M4.3) · "หักล้าง=หายถาวร" (M4.2) · "Huygens เฉพาะน้ำ" (M4.1+M4.4) · ติ๊กจุดผิด + ระบุ MC + เขียนคำอธิบายที่ถูก',
          meta:'ใช้ในฉาก E4 Elaborate · 12 นาที',
          chips:[['k','K3'],['p','P2'],['m','M4.1'],['m','M4.2'],['m','M4.3'],['m','M4.4']] }
      ]},
      { title: '📊 เครื่องมือวัดและประเมิน', items: [
        { cls:'ft', no:'06', t:'F4 Four-tier · Pre + Post', file:'สื่อ06_F4_Fourtier_PrePost.html',
          d:'3 ข้อ Four-tier (T1 คำตอบ + T2 มั่นใจ + T3 เหตุผล + T4 มั่นใจ) · M4.1 (คืนรูป) · M4.3 (A ต่าง) · M4.4 (Huygens ทุกคลื่น) · มี SVG และ Answer Key',
          meta:'ใช้ในฉาก F4 Pre (5\') + F4 Post (7\')',
          chips:[['k','K1'],['k','K3'],['m','M4.1'],['m','M4.3'],['m','M4.4'],['w','วPA 2,6']] },
        { cls:'tlc', no:'TL', t:'TL-01 · Traffic Light Card', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ06_TL-01_TrafficLight.html',
          d:'บัตรประเมินตนเอง 🟢🟡🔴 (ใช้ร่วมกับแผน 1)', meta:'ใช้ในฉาก TLC ก่อน + TLC หลัง',
          chips:[['a','A1'],['w','วPA 4,7']] },
        { cls:'mj', no:'MJ', t:'MJ-01 · Metacognitive Journal 3-2-1', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ07_MJ-01_MetacognitiveJournal.html',
          d:'3 เข้าใจใหม่ · 2 น่าสนใจ · 1 คำถาม (ใช้ร่วมกับแผน 1)', meta:'ใช้ในฉาก MJ · 2 นาที',
          chips:[['a','A2'],['w','วPA 6,8']] },
        { cls:'ob', no:'OB', t:'OB-01 · แบบสังเกตพฤติกรรม', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ08_OB-01_แบบสังเกตพฤติกรรม.html',
          d:'เน้น Perseverance (A1) + Respect for Diverse Views (A2) · ใช้ร่วมกับแผน 1', meta:'ใช้ตลอด 100 นาที',
          chips:[['a','A1'],['a','A2'],['w','วPA 4,7']] },
        { cls:'rubric', no:'R', t:'POE Rubric · เกณฑ์ให้คะแนน (0–3)', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ09_POE_Rubric_เกณฑ์ให้คะแนน.html',
          d:'Rubric รายด้าน P/O/E (ใช้ร่วมกับแผน 1)', meta:'ครูใช้ประเมินใบ POE-04',
          chips:[['p','P1'],['p','P2'],['w','วPA 3,5']] }
      ]},
      { title: '🗒 CER Live Board', items: [
        { cls:'info', no:'CER', t:'CER Board (ใช้ใน E3 Explain)',
          d:'3 คอลัมน์: เสริม (A+A) · หักล้าง (A−A) · A ต่างกัน · ผูก POE-04 ฐาน 2 (Sim) · นักเรียนส่ง Claim+Evidence+Reasoning + รูป · ครูเปิด CER Board tab ฉายจอ',
          meta:'ใช้ในฉาก E3 · 8 นาที',
          chips:[['p','P2'],['k','K3'],['a','A2'],['w','วPA 3,5,6']] }
      ]}
    ],
    linkOut: [
      'F4 Pre/Post → % Sound · Misconception M4.1/M4.3/M4.4 · Normalized gain ของแผน 4',
      'POE-04 + POE Rubric → คะแนน POE รายบุคคล/กลุ่ม · เฉลี่ย ≥ 2.0',
      'Calc 4.1 → คะแนนเฉลี่ย ≥ 70% (เกณฑ์ K2 · P2)',
      'Spot 4.2 → Conceptual Change · เชื่อม M4.1–4.4 กับหลักฐาน',
      'CER Board → คลัง Claim-Evidence-Reasoning เรื่องซ้อนทับ · วPA ด้าน 1 ข้อ 3, 5, 6',
      'TL-01 → อัตราบัตรเขียวก่อน-หลัง · เป้าหมาย ≥ 60%',
      'MJ-01 → คำถามเด่นเป็น Hook แผน 5 (การสะท้อน)',
      'OB-01 → Perseverance (A1 ≥ 80%) · Respect (A2 ≥ 80%)'
    ]
  },
  5: {
    folder: 'lessons/physics3/waves/แผน05_การสะท้อนของคลื่น',
    title: 'แผน 5 — การสะท้อนของคลื่น',
    meta: 'ว30203 ฟิสิกส์ 3 · ม.5 · คาบ 9–10 (100 นาที) · ว2.1 ม.5/3',
    sections: [
      { title: '🗺 แผนภาพรวม', items: [
        { cls:'info', no:'00', t:'Infographic แผน 5 (ฉบับสมบูรณ์)', file:'แผน5_Infographic.html',
          d:'ภาพรวมทั้งแผน: สาระ · K/P/A · 5E+POE 9 ขั้น · สื่อ · การวัด · วPA 8 ตัวชี้วัด · Timeline · Theme สีเขียวมิ้นท์ (teal)', chips:[] },
        { cls:'sim', no:'SIM1', t:'Lab 38 — Wave Speed on String (KP Science)',
          file:'https://kp-science.github.io/physics-simulations/Virtual%20Physics%20Lab%2002/38.%20wave-speed-on-string.html',
          d:'Virtual Lab · toggle ปลายตรึง/ปลายอิสระ · ส่ง pulse · วัด v ก่อน/หลังสะท้อน · สังเกตการพลิกเฟส · ใช้ใน POE-05 ฐาน 2',
          chips:[['m','M5.1'],['m','M5.2'],['k','K1'],['p','P1']] },
        { cls:'sim', no:'SIM2', t:'Lab 32 — Wave Reflection (KP Science)',
          file:'https://kp-science.github.io/physics-simulations/Virtual%20Physics%20Lab%2002/32.%20wave-reflection.html',
          d:'Virtual Lab · คลื่นผิวน้ำตกกระทบผนัง · วัด θᵢ/θᵣ · เปลี่ยน A / θ ได้ · ยืนยัน θᵣ = θᵢ และ A\' vs A · ใช้ใน POE-05 ฐาน 3',
          chips:[['m','M5.3'],['k','K1'],['k','K2'],['p','P1']] }
      ]},
      { title: '🎨 สื่อการสอน (ใช้ในกิจกรรม)', items: [
        { cls:'e2', no:'02', t:'POE-05 Interactive · ใบบันทึก P / O / E', file:'สื่อ02_POE-05_ใบบันทึกPOE.html',
          d:'Predict 4 ข้อ (เฟสปลายตรึง/ปลายอิสระ · v · A\') ใช้ palette ลากรูปคลื่น ∧ ∨ ── A↑ A↓ · Observe 3 ฐาน (Slinky + Lab 38 + Lab 32) · canvas วาดได้ · Explain CER + checklist · auto-check θ diff + v diff',
          meta:'ใช้ตลอด E1–E3 · 35 นาที',
          chips:[['p','P1'],['p','P2'],['m','M5.1'],['m','M5.2'],['m','M5.3']] },
        { cls:'e4', no:'03', t:'ใบกิจกรรม 5.1 · Calc Reflection', file:'สื่อ03_Calc_ใบกิจกรรม5.1.html',
          d:'4 ข้อไล่ระดับ · (1) วาดหน้าคลื่นสะท้อนผิวราบ θ=40° scene-stack overlay (2) คำนวณ v ก่อน/หลัง (3) ผิวโค้งเว้า → ค้นพบ F (4) Echolocation ค้างคาว · ทุกข้อมี canvas + text input · ใช้ worksheet-core.js',
          meta:'ใช้ในฉาก E4 Elaborate · 15 นาที',
          chips:[['k','K1'],['k','K2'],['p','P1'],['p','P2'],['m','M5.1'],['m','M5.2']] },
        { cls:'e4', no:'04', t:'ใบกิจกรรม 5.2 · Spot the Error', file:'สื่อ04_Spot_ใบกิจกรรม5.2.html',
          d:'3 สถานการณ์ · "ปลายตรึงกลับมาเดิม" (M5.1) · "สะท้อนแล้วช้าลง" (M5.2) · "A\' = A เสมอ" (M5.3) · claim canvas overlay + canvas อธิบายที่ถูก',
          meta:'ใช้ในฉาก E4 Elaborate · 12 นาที',
          chips:[['k','K3'],['p','P2'],['m','M5.1'],['m','M5.2'],['m','M5.3']] }
      ]},
      { title: '📊 เครื่องมือวัดและประเมิน', items: [
        { cls:'ft', no:'05', t:'F5 Four-tier · Pre + Post', file:'สื่อ05_F5_Fourtier_PrePost.html',
          d:'3 ข้อ Four-tier (T1 คำตอบ + T2 มั่นใจ + T3 เหตุผล + T4 มั่นใจ) · M5.1 (ปลายตรึงพลิกเฟส) · M5.2 (v คงที่) · M5.3 (A\' ≤ A) · SVG + Answer Key + Interpretation rubric',
          meta:'ใช้ในฉาก F5 Pre (5\') + F5 Post (7\')',
          chips:[['k','K1'],['k','K3'],['m','M5.1'],['m','M5.2'],['m','M5.3'],['w','วPA 2,6']] },
        { cls:'tlc', no:'TL', t:'TL-01 · Traffic Light Card', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ06_TL-01_TrafficLight.html',
          d:'บัตรประเมินตนเอง 🟢🟡🔴 (ใช้ร่วมกับแผน 1)', meta:'ใช้ในฉาก TLC ก่อน + TLC หลัง',
          chips:[['a','A1'],['w','วPA 4,7']] },
        { cls:'mj', no:'MJ', t:'MJ-01 · Metacognitive Journal 3-2-1', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ07_MJ-01_MetacognitiveJournal.html',
          d:'3 เข้าใจใหม่ · 2 น่าสนใจ · 1 คำถาม (ใช้ร่วมกับแผน 1)', meta:'ใช้ในฉาก MJ · 2 นาที',
          chips:[['a','A2'],['w','วPA 6,8']] },
        { cls:'ob', no:'OB', t:'OB-01 · แบบสังเกตพฤติกรรม', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ08_OB-01_แบบสังเกตพฤติกรรม.html',
          d:'เน้น Perseverance (A1) + Respect (A2) · ใช้ร่วมกับแผน 1', meta:'ใช้ตลอด 100 นาที',
          chips:[['a','A1'],['a','A2'],['w','วPA 4,7']] },
        { cls:'rubric', no:'R', t:'POE Rubric · เกณฑ์ให้คะแนน (0–3)', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ09_POE_Rubric_เกณฑ์ให้คะแนน.html',
          d:'Rubric รายด้าน P/O/E (ใช้ร่วมกับแผน 1)', meta:'ครูใช้ประเมินใบ POE-05',
          chips:[['p','P1'],['p','P2'],['w','วPA 3,5']] }
      ]},
      { title: '🗒 CER Live Board', items: [
        { cls:'info', no:'CER', t:'CER Board (ใช้ใน E3 Explain)',
          d:'3 คอลัมน์: 🔒 ปลายตรึง (พลิกเฟส) · 🔓 ปลายอิสระ (ไม่พลิก) · 📐 ผิวราบ θᵢ=θᵣ · ทุกกลุ่มส่ง Claim+Evidence+Reasoning พร้อมกัน · ครูฉายจอเปรียบเทียบ real-time',
          meta:'ใช้ในฉาก E3 · 8 นาที',
          chips:[['p','P2'],['k','K3'],['a','A2'],['w','วPA 3,5,6']] }
      ]}
    ],
    linkOut: [
      'F5 Pre/Post → % Sound · Misconception M5.1/M5.2/M5.3 · Normalized gain ของแผน 5 · เป้าหมายลด MC ของ M5.1 ≥ 50%, M5.2/M5.3 ≥ 30%',
      'POE-05 + POE Rubric → คะแนน POE รายบุคคล/กลุ่ม · เฉลี่ย ≥ 2.0',
      'Calc 5.1 → คะแนนเฉลี่ย ≥ 70% (เกณฑ์ K1, K2, P1)',
      'Spot 5.2 → Conceptual Change · เชื่อม M5.1–5.3 กับหลักฐาน',
      'CER Board → คลัง Claim-Evidence-Reasoning เรื่องสะท้อน · วPA ด้าน 1 ข้อ 3, 5, 6',
      'TL-01 → อัตราบัตรเขียวก่อน-หลัง · เป้าหมาย ≥ 60%',
      'MJ-01 → คำถามเด่นเป็น Hook แผน 6 (การหักเห)',
      'OB-01 → Perseverance (A1 ≥ 80%) · Respect (A2 ≥ 80%)'
    ]
  },
  6: {
    folder: 'lessons/physics3/waves/แผน06_การหักเหของคลื่น',
    title: 'แผน 6 — การหักเหของคลื่น',
    meta: 'ว30203 ฟิสิกส์ 3 · ม.5 · คาบ 11–12 (100 นาที) · ว2.1 ม.5/4',
    sections: [
      { title: '🗺 แผนภาพรวม', items: [
        { cls:'info', no:'00', t:'Infographic แผน 6 (ฉบับสมบูรณ์)', file:'แผน6_Infographic.html',
          d:'ภาพรวมทั้งแผน: สาระ · K/P/A · 5E+POE 9 ขั้น · สื่อ · การวัด · วPA 8 ตัวชี้วัด · Timeline · Theme สี Cyan (ฟ้าคราม)', chips:[] },
        { cls:'sim', no:'SIM1', t:'Lab 30 — Waves on Coiled Spring (KP Science)',
          file:'https://kp-science.github.io/physics-simulations/Virtual%20Physics%20Lab%2002/30.%20waves-on-coiled-spring.html',
          d:'Virtual Lab · โหมด "สปริง 2 อัน" · ปรับ μ₂/μ₁ · ส่งพัลส์ข้ามรอยต่อ · วัด v ทั้ง 2 เชือก · ยืนยัน f คงที่ · ใช้ใน POE-06 ฐาน 1',
          chips:[['m','M6.1'],['m','M6.3'],['k','K1'],['p','P1']] },
        { cls:'sim', no:'SIM2', t:'Lab 33 — Wave Refraction Ripple Tank (KP Science)',
          file:'https://kp-science.github.io/physics-simulations/Virtual%20Physics%20Lab%2002/33.%20wave-refraction-ripple-tank.html',
          d:'Virtual Lab · คลื่นผิวน้ำผ่านเขตน้ำลึก (D) → น้ำตื้น (S) · วัด λ_D, λ_S · ปรับมุมขอบ θ · ยืนยันกฎสเนลล์ sinθ₁/sinθ₂ = v₁/v₂ = λ₁/λ₂ · ใช้ใน POE-06 ฐาน 2',
          chips:[['m','M6.1'],['m','M6.2'],['k','K1'],['k','K2'],['p','P1'],['p','P2']] }
      ]},
      { title: '🎨 สื่อการสอน (ใช้ในกิจกรรม)', items: [
        { cls:'e2', no:'02', t:'POE-06 Interactive · ใบบันทึก P / O / E', file:'สื่อ02_POE-06_ใบบันทึกPOE.html',
          d:'Predict 4 ข้อ (λ ในน้ำตื้น · f · v ลึก↔ตื้น · เชือก μ ต่าง) ใช้ palette λ ใหญ่/เท่า/เล็ก · Observe 2 ฐาน (Lab 30 + Lab 33) · auto-check v₁ vs v₂ + auto-calc v=fλ · canvas วาดหน้าคลื่น+ทิศการเคลื่อนที่ · Explain CER + 🟢 Conceptual Inventory 5 ข้อ',
          meta:'ใช้ตลอด E1–E3 · 35 นาที',
          chips:[['p','P1'],['p','P2'],['m','M6.1'],['m','M6.2'],['m','M6.3']] },
        { cls:'e4', no:'03', t:'ใบกิจกรรม 6.1 · Calc Refraction', file:'สื่อ03_Calc_ใบกิจกรรม6.1.html',
          d:'4 ข้อไล่ระดับ · (1) วาดหน้าคลื่น+ทิศการเคลื่อนที่ในน้ำตื้น θ₁=40° scene-stack overlay · คำนวณ θ₂ ด้วยกฎสเนลล์ (2) คำนวณ v, λ, f · แก้ M6.1 (3) สร้างกราฟ v–√h ยืนยัน "น้ำลึก v มาก/ตื้น v น้อย" (4) เชือก μ₂=4μ₁ แก้ M6.3 · ใช้ worksheet-core.js',
          meta:'ใช้ในฉาก E4 Elaborate · 15 นาที',
          chips:[['k','K1'],['k','K2'],['p','P1'],['p','P2'],['m','M6.1'],['m','M6.3']] },
        { cls:'e4', no:'04', t:'ใบกิจกรรม 6.2 · Spot the Error', file:'สื่อ04_Spot_ใบกิจกรรม6.2.html',
          d:'3 สถานการณ์ · "หักเหแล้ว f เปลี่ยน" (M6.1) · "หักเห = เปลี่ยนชนิดคลื่น" (M6.2) · "เชือกหนา f ลดตาม v" (M6.3) · claim canvas overlay + canvas อธิบายที่ถูก',
          meta:'ใช้ในฉาก E4 Elaborate · 12 นาที',
          chips:[['k','K3'],['p','P2'],['m','M6.1'],['m','M6.2'],['m','M6.3']] }
      ]},
      { title: '📊 เครื่องมือวัดและประเมิน', items: [
        { cls:'ft', no:'05', t:'F6 Four-tier · Pre + Post', file:'สื่อ05_F6_Fourtier_PrePost.html',
          d:'3 ข้อ Four-tier (T1 คำตอบ + T2 มั่นใจ + T3 เหตุผล + T4 มั่นใจ) · M6.1 (f คงที่) · M6.2 (ชนิดคลื่นไม่เปลี่ยน + ทิศหักเห) · M6.3 (เชือกรอยต่อ f คงที่) · SVG + Answer Key + Interpretation rubric',
          meta:'ใช้ในฉาก F6 Pre (5\') + F6 Post (7\')',
          chips:[['k','K1'],['k','K3'],['m','M6.1'],['m','M6.2'],['m','M6.3'],['w','วPA 2,6']] },
        { cls:'tlc', no:'TL', t:'TL-01 · Traffic Light Card', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ06_TL-01_TrafficLight.html',
          d:'บัตรประเมินตนเอง 🟢🟡🔴 (ใช้ร่วมกับแผน 1)', meta:'ใช้ในฉาก TLC ก่อน + TLC หลัง',
          chips:[['a','A1'],['w','วPA 4,7']] },
        { cls:'mj', no:'MJ', t:'MJ-06 · Metacognitive Journal 3-2-1', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ07_MJ-01_MetacognitiveJournal.html',
          d:'3 เข้าใจใหม่ · 2 Transfer ชีวิตจริง (ตาปลา/เลนส์/เส้นใยแก้ว) · 1 คำถาม', meta:'ใช้ในฉาก MJ · 3 นาที',
          chips:[['a','A2'],['w','วPA 6,8']] },
        { cls:'ob', no:'OB', t:'OB-01 · แบบสังเกตพฤติกรรม', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ08_OB-01_แบบสังเกตพฤติกรรม.html',
          d:'เน้น Role Responsibility (A6.1) + Scientific Attitude (A6.2) · ใช้ร่วมกับแผน 1', meta:'ใช้ตลอด 100 นาที',
          chips:[['a','A1'],['a','A2'],['w','วPA 4,7']] },
        { cls:'rubric', no:'R', t:'POE Rubric · เกณฑ์ให้คะแนน (0–3)', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ09_POE_Rubric_เกณฑ์ให้คะแนน.html',
          d:'Rubric รายด้าน P/O/E (ใช้ร่วมกับแผน 1)', meta:'ครูใช้ประเมินใบ POE-06',
          chips:[['p','P1'],['p','P2'],['w','วPA 3,5']] }
      ]},
      { title: '🗒 CER Live Board', items: [
        { cls:'info', no:'CER', t:'CER Board (ใช้ใน E3 Explain)',
          d:'3 คอลัมน์: 🔁 f คงที่ (M6.1/M6.3) · 🏃 v, λ เปลี่ยน · 📐 ทิศการเคลื่อนที่หักเห (M6.2) · ผูก POE-06 ฐาน 1+2 · ทุกกลุ่มส่ง Claim+Evidence+Reasoning พร้อมกัน · ครูฉายจอเปรียบเทียบ real-time',
          meta:'ใช้ในฉาก E3 · 8 นาที',
          chips:[['p','P2'],['k','K2'],['a','A2'],['w','วPA 3,5,6']] }
      ]}
    ],
    linkOut: [
      'F6 Pre/Post → % Sound · Misconception M6.1/M6.2/M6.3 · Normalized gain ของแผน 6 · เป้าหมายลด MC ของ M6.1 ≥ 50%, M6.2/M6.3 ≥ 30%',
      'POE-06 + POE Rubric → คะแนน POE รายบุคคล/กลุ่ม · เฉลี่ย ≥ 2.0',
      'Calc 6.1 → คะแนนเฉลี่ย ≥ 70% · กราฟ v–√h r² ≥ 0.9 (เกณฑ์ K2, P2)',
      'Spot 6.2 → Conceptual Change · เชื่อม M6.1–6.3 กับหลักฐาน',
      'CER Board → คลัง Claim-Evidence-Reasoning เรื่องหักเห · วPA ด้าน 1 ข้อ 3, 5, 6',
      'TL-01 → อัตราบัตรเขียวก่อน-หลัง · เป้าหมาย ≥ 60%',
      'MJ-06 → คำถามเด่นเป็น Hook แผน 7 (การแทรกสอด — f เท่ากัน · เงื่อนไข)',
      'OB-01 → Role Responsibility (A6.1 ≥ 80%) · Scientific Attitude (A6.2 ≥ 70%)'
    ]
  },
  7: {
    folder: 'lessons/physics3/waves/แผน07_การแทรกสอดของคลื่น',
    title: 'แผน 7 — การแทรกสอดของคลื่น (2 แหล่งกำเนิดอาพันธ์)',
    meta: 'ว30203 ฟิสิกส์ 3 · ม.5 · คาบ 13–15 (150 นาที) · ว2.1 ม.5/4-5',
    sections: [
      { title: '🗺 แผนภาพรวม', items: [
        { cls:'info', no:'00', t:'Infographic แผน 7 (ฉบับสมบูรณ์)', file:'แผน7_Infographic.html',
          d:'ภาพรวมทั้งแผน: สาระ · K/P/A · 5E+POE 9 ขั้น · สื่อ · การวัด · วPA 8 ตัวชี้วัด · Timeline · Theme สี Amber (เหลืองอำพัน)', chips:[] },
        { cls:'sim', no:'SIM1', t:'Lab 30 — Waves on Coiled Spring (Pulse Superposition)',
          file:'https://kp-science.github.io/physics-simulations/Virtual%20Physics%20Lab%2002/30.%20waves-on-coiled-spring.html',
          d:'Virtual Lab · ส่งพัลส์ 2 ปลาย · ทดสอบ ยอด+ยอด · ยอด+ท้อง A เท่า · A ต่าง · ยืนยัน A ไม่ต้องเท่าก็แทรกสอดได้ · ใช้ใน POE-07 ฐาน 1',
          chips:[['m','M7.3'],['k','K7.1'],['p','P7.1']] },
        { cls:'sim', no:'SIM2', t:'Lab 41 — Two-Source Wave Interference',
          file:'https://kp-science.github.io/physics-simulations/Virtual%20Physics%20Lab%2002/41.%20wave-interference-two-source.html',
          d:'Virtual Lab · 2 แหล่งกำเนิด · เลื่อน P · วัด S₁P, S₂P, Δr · ระบุ A/N · เห็น hyperbolic pattern + bright/dark fringes · ใช้ใน POE-07 ฐาน 2',
          chips:[['m','M7.1'],['m','M7.2'],['m','M7.4'],['k','K7.1'],['k','K7.2'],['p','P7.2']] }
      ]},
      { title: '🎨 สื่อการสอน (ใช้ในกิจกรรม)', items: [
        { cls:'e2', no:'02', t:'POE-07 Interactive · ใบบันทึก P / O / E', file:'สื่อ02_POE-07_ใบบันทึกPOE.html',
          d:'Predict 4 ข้อ ครอบคลุม M7.1-M7.4 (Δr=2λ → A/N · บัพ=หาย? · A ต่าง → แทรกสอด? · ชื่อ A vs N) · Observe 2 ฐาน (Lab 30 + Lab 41) · canvas วาด hyperbolic pattern + bright/dark fringes · auto-calc Δr · Explain CER + Conceptual Inventory 5 ข้อ + Misconception 3 ส่วน',
          meta:'ใช้ตลอด E1–E3 · 60 นาที',
          chips:[['p','P7.1'],['p','P7.2'],['m','M7.1'],['m','M7.2'],['m','M7.3'],['m','M7.4']] },
        { cls:'e4', no:'03', t:'ใบกิจกรรม 7.1 · Calc Interference', file:'สื่อ03_Calc_ใบกิจกรรม7.1.html',
          d:'4 ข้อไล่ระดับ · (1) วาด wave pattern 2 sources S₁S₂=3λ · ระบุ A, N (2) คำนวณ Δr ตัดสินจุด P เป็น A หรือ N (3) เลื่อน source separation d → จำนวน A เพิ่ม/ลด · กราฟ (4) Δr=2.5λ → คำตอบ N (n=2) · scene-stack overlay + lined canvas · ใช้ worksheet-core.js',
          meta:'ใช้ในฉาก E4 Elaborate · 15 นาที',
          chips:[['k','K7.1'],['k','K7.2'],['p','P7.1'],['p','P7.2'],['m','M7.1'],['m','M7.2']] },
        { cls:'e4', no:'04', t:'ใบกิจกรรม 7.2 · Spot the Error', file:'สื่อ04_Spot_ใบกิจกรรม7.2.html',
          d:'3 สถานการณ์ · "Δr=nλ คือบัพ N" (M7.1) · "บัพ=น้ำหายจริง" (M7.2) · "ต้อง A เท่ากันถึงแทรกสอด" (M7.3) · claim canvas overlay + canvas อธิบายที่ถูก',
          meta:'ใช้ในฉาก E4 Elaborate · 12 นาที',
          chips:[['k','K7.1'],['p','P7.1'],['m','M7.1'],['m','M7.2'],['m','M7.3']] }
      ]},
      { title: '📊 เครื่องมือวัดและประเมิน', items: [
        { cls:'ft', no:'05', t:'F7 Four-tier · Pre + Post', file:'สื่อ05_F7_Fourtier_PrePost.html',
          d:'3 ข้อ Four-tier (T1 คำตอบ + T2 มั่นใจ + T3 เหตุผล + T4 มั่นใจ) · M7.1 (Δr=nλ → A) · M7.2 (บัพ ≠ อนุภาคหาย) · M7.3 (A ไม่ต้องเท่า) · SVG + Answer Key + Interpretation rubric',
          meta:'ใช้ในฉาก F7 Pre (10\') + F7 Post (10\')',
          chips:[['k','K7.1'],['k','K7.2'],['m','M7.1'],['m','M7.2'],['m','M7.3'],['w','วPA 2,6']] },
        { cls:'tlc', no:'TL', t:'TL-01 · Traffic Light Card', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ06_TL-01_TrafficLight.html',
          d:'บัตรประเมินตนเอง 🟢🟡🔴 (ใช้ร่วมกับแผน 1)', meta:'ใช้ในฉาก TLC ก่อน + TLC หลัง',
          chips:[['a','A7.1'],['w','วPA 4,7']] },
        { cls:'mj', no:'MJ', t:'MJ-07 · Metacognitive Journal 3-2-1', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ07_MJ-01_MetacognitiveJournal.html',
          d:'3 เข้าใจใหม่ · 2 Transfer ชีวิตจริง (noise-cancelling/holography/interferometer) · 1 คำถาม', meta:'ใช้ในฉาก MJ · 10 นาที',
          chips:[['a','A7.2'],['w','วPA 6,8']] },
        { cls:'ob', no:'OB', t:'OB-01 · แบบสังเกตพฤติกรรม', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ08_OB-01_แบบสังเกตพฤติกรรม.html',
          d:'เน้น Grit (A7.1) + Peer Tutoring (A7.2) · ใช้ร่วมกับแผน 1', meta:'ใช้ตลอด 150 นาที',
          chips:[['a','A7.1'],['a','A7.2'],['w','วPA 4,7']] },
        { cls:'rubric', no:'R', t:'POE Rubric · เกณฑ์ให้คะแนน (0–3)', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ09_POE_Rubric_เกณฑ์ให้คะแนน.html',
          d:'Rubric รายด้าน P/O/E (ใช้ร่วมกับแผน 1)', meta:'ครูใช้ประเมินใบ POE-07',
          chips:[['p','P7.1'],['p','P7.2'],['w','วPA 3,5']] }
      ]},
      { title: '🗒 CER Live Board', items: [
        { cls:'info', no:'CER', t:'CER Board (ใช้ใน E3 Explain)',
          d:'3 คอลัมน์: 🔆 ปฏิบัพ A · Δr=nλ (แก้ M7.1/M7.4) · 🌑 บัพ N · Δr=(n+½)λ (แก้ M7.2) · 📐 A ไม่ต้องเท่า + เงื่อนไข coherent (แก้ M7.3) · ผูก POE-07 ฐาน 1+2 · ทุกกลุ่มส่ง Claim+Evidence+Reasoning พร้อมกัน',
          meta:'ใช้ในฉาก E3 · 10 นาที',
          chips:[['p','P7.1'],['k','K7.1'],['a','A7.2'],['w','วPA 3,5,6']] }
      ]}
    ],
    linkOut: [
      'F7 Pre/Post → % Sound · Misconception M7.1/M7.2/M7.3 · Normalized gain ของแผน 7 · เป้าหมายลด MC ของ M7.1 ≥ 50%, M7.2/M7.3 ≥ 30%',
      'POE-07 + POE Rubric → คะแนน POE รายบุคคล/กลุ่ม · เฉลี่ย ≥ 2.0',
      'Calc 7.1 → คะแนนเฉลี่ย ≥ 70% · canvas hyperbolic pattern (เกณฑ์ K7.2, P7.2)',
      'Spot 7.2 → Conceptual Change · เชื่อม M7.1–M7.3 กับหลักฐาน',
      'CER Board → คลัง Claim-Evidence-Reasoning เรื่องแทรกสอด · วPA ด้าน 1 ข้อ 3, 5, 6',
      'TL-01 → อัตราบัตรเขียวก่อน-หลัง · เป้าหมาย ≥ 60%',
      'MJ-07 → คำถามเด่นเป็น Hook แผน 8 (การเลี้ยวเบน — "1 ช่อง 1 แหล่งจะแทรกสอดได้ไหม?")',
      'OB-01 → Grit (A7.1 ≥ 80%) · Peer Tutoring (A7.2 ≥ 70%)'
    ]
  },
  8: {
    folder: 'lessons/physics3/waves/แผน08_การเลี้ยวเบนของคลื่น',
    title: 'แผน 8 — การเลี้ยวเบนของคลื่น (Diffraction)',
    meta: 'ว30203 ฟิสิกส์ 3 · ม.5 · คาบ 16 (50 นาที) · Theme Rose',
    sections: [
      { title: '🗺 แผนภาพรวม', items: [
        { cls:'info', no:'00', t:'Infographic แผน 8 (ฉบับสมบูรณ์)', file:'แผน8_Infographic.html',
          d:'ภาพรวมทั้งแผน: สาระ · K/P/A · 5E+POE · สื่อ · การวัด · วPA · Timeline · Theme Rose', chips:[] },
        { cls:'sim', no:'SIM', t:'Lab 41 — Two-Source Wave Interference (โหมดช่องแคบเดียว)',
          file:'https://kp-science.github.io/physics-simulations/Virtual%20Physics%20Lab%2002/41.%20wave-interference-two-source.html',
          d:'Virtual Lab · โหมด "ช่องแคบเดียว" · ปรับกว้างช่อง a · ทดสอบ d < λ, d ≈ λ, d > λ · สังเกต central max/minima · ใช้ใน POE-08 ทั้ง 3 ฐาน',
          chips:[['m','M8.1'],['m','M8.2'],['m','M8.3'],['k','K8.1'],['k','K8.2'],['p','P8.1']] }
      ]},
      { title: '🎨 สื่อการสอน (ใช้ในกิจกรรม)', items: [
        { cls:'e2', no:'02', t:'POE-08 Interactive · ใบบันทึก P / O / E', file:'สื่อ02_POE-08_ใบบันทึกPOE.html',
          d:'Predict 4 ข้อ ครอบคลุม M8.1-M8.3 · Observe 3 ฐาน (ช่อง 1/3/10 cm) + canvas วาดเปรียบเทียบ · Explain checklist + Misconception Reflection 3 ส่วน',
          meta:'ใช้ตลอด E1–E3 · 25 นาที',
          chips:[['p','P8.1'],['p','P8.2'],['m','M8.1'],['m','M8.2'],['m','M8.3']] },
        { cls:'e4', no:'03', t:'ใบกิจกรรม 8.1 · Calc Diffraction', file:'สื่อ03_Calc_ใบกิจกรรม8.1.html',
          d:'4 ข้อไล่ระดับ · (1) เงื่อนไข d/λ (2) คำนวณมุมแนวบัพ a sinθ = nλ (3) วาดเปรียบเทียบ 3 ขนาดช่อง · canvas (4) เสียงรอบมุมตึก λ = v/f เชื่อมชีวิตจริง · ใช้ worksheet-core.js',
          meta:'ใช้ในฉาก E4 Elaborate · 8 นาที',
          chips:[['k','K8.1'],['k','K8.2'],['p','P8.1'],['p','P8.2'],['m','M8.1']] },
        { cls:'e4', no:'04', t:'ใบกิจกรรม 8.2 · Spot the Error', file:'สื่อ04_Spot_ใบกิจกรรม8.2.html',
          d:'3 สถานการณ์ · "ช่องแคบ<λ ผ่านไม่ได้" (M8.1) · "ช่องกว้าง=เลี้ยวเบนมาก" (M8.2) · "เลี้ยวเบนเปลี่ยน f" (M8.3) · claim canvas overlay + canvas อธิบาย',
          meta:'ใช้ในฉาก E4 Elaborate · 5 นาที',
          chips:[['k','K8.1'],['p','P8.2'],['m','M8.1'],['m','M8.2'],['m','M8.3']] }
      ]},
      { title: '📊 เครื่องมือวัดและประเมิน', items: [
        { cls:'ft', no:'05', t:'F8 Four-tier · Pre + Post', file:'สื่อ05_F8_Fourtier_PrePost.html',
          d:'3 ข้อ Four-tier (T1+T2+T3+T4) · M8.1 (ช่องแคบผ่านได้) · M8.2 (ช่องกว้างเลี้ยวเบนน้อย) · M8.3 (f คงที่) · SVG + Answer Key + Interpretation rubric',
          meta:'ใช้ในฉาก F8 Pre (7\') + F8 Post (5\')',
          chips:[['k','K8.1'],['k','K8.2'],['m','M8.1'],['m','M8.2'],['m','M8.3'],['w','วPA 2,6']] },
        { cls:'tlc', no:'TL', t:'TL-01 · Traffic Light Card', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ06_TL-01_TrafficLight.html',
          d:'บัตรประเมินตนเอง 🟢🟡🔴 (ใช้ร่วมกับแผน 1)', meta:'ใช้ในฉาก TLC ก่อน + TLC หลัง',
          chips:[['a','A8.1'],['w','วPA 4,7']] },
        { cls:'mj', no:'MJ', t:'MJ-08 · Metacognitive Journal 3-2-1', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ07_MJ-01_MetacognitiveJournal.html',
          d:'3 เข้าใจใหม่ · 2 Transfer ชีวิตจริง (เสียงรอบมุม/วิทยุ/สัญญาณ WiFi) · 1 คำถาม',
          meta:'ใช้ในฉาก MJ · 2 นาที',
          chips:[['a','A8.1'],['w','วPA 6,8']] },
        { cls:'ob', no:'OB', t:'OB-01 · แบบสังเกตพฤติกรรม', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ08_OB-01_แบบสังเกตพฤติกรรม.html',
          d:'เน้น Inquiry Engagement (A8.1) · ใช้ร่วมกับแผน 1', meta:'ใช้ตลอด 50 นาที',
          chips:[['a','A8.1'],['w','วPA 4,7']] },
        { cls:'rubric', no:'R', t:'POE Rubric · เกณฑ์ให้คะแนน (0–3)', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ09_POE_Rubric_เกณฑ์ให้คะแนน.html',
          d:'Rubric รายด้าน P/O/E (ใช้ร่วมกับแผน 1)', meta:'ครูใช้ประเมินใบ POE-08',
          chips:[['p','P8.1'],['p','P8.2'],['w','วPA 3,5']] }
      ]},
      { title: '🗒 CER Live Board', items: [
        { cls:'info', no:'CER', t:'CER Board (ใช้ใน E3 Explain)',
          d:'3 คอลัมน์: 🔸 ช่องแคบ d ≤ λ (แก้ M8.1) · 🔹 ช่องกว้าง d ≫ λ (แก้ M8.2) · 🔁 f ไม่เปลี่ยน (แก้ M8.3) · ผูก POE-08 ทั้ง 3 ฐาน',
          meta:'ใช้ในฉาก E3 · 8 นาที',
          chips:[['p','P8.2'],['k','K8.1'],['a','A8.1'],['w','วPA 3,5,6']] }
      ]}
    ],
    linkOut: [
      'F8 Pre/Post → % Sound · Misconception M8.1/M8.2/M8.3 · Normalized gain · เป้าหมายลด MC M8.1 ≥ 50%, M8.2/M8.3 ≥ 30%',
      'POE-08 + POE Rubric → คะแนน POE รายบุคคล/กลุ่ม · เฉลี่ย ≥ 2.0',
      'Calc 8.1 → คะแนนเฉลี่ย ≥ 70% · canvas 3 ช่อง + โจทย์ชีวิตจริงเสียง',
      'Spot 8.2 → Conceptual Change · เชื่อม M8.1–M8.3 กับหลักฐาน',
      'CER Board → คลัง Claim-Evidence-Reasoning เรื่องเลี้ยวเบน · วPA ด้าน 1 ข้อ 3, 5, 6',
      'TL-01 → อัตราบัตรเขียวก่อน-หลัง · เป้าหมาย ≥ 60%',
      'MJ-08 → คำถามเด่นเป็น Hook แผน 9 (คลื่นนิ่ง)',
      'OB-01 → Inquiry Engagement (A8.1 ≥ 80%)'
    ]
  },
  9: {
    folder: 'lessons/physics3/waves/แผน09_คลื่นนิ่งและบูรณาการ',
    title: 'แผน 9 — คลื่นนิ่ง + บูรณาการ (Standing Waves + Synthesis)',
    meta: 'ว30203 ฟิสิกส์ 3 · ม.5 · คาบ 17–18 (100 นาที · 2 คาบ) · Theme Indigo',
    sections: [
      { title: '🗺 แผนภาพรวม', items: [
        { cls:'info', no:'00', t:'Infographic แผน 9 (ฉบับสมบูรณ์)', file:'แผน9_Infographic.html',
          d:'ภาพรวม 2 คาบ: สาระคลื่นนิ่ง · K9.1/9.2/9.3 + P9.1/9.2 + A9.1/9.2 · บูรณาการ 4 สมบัติ · 5E+POE Timeline 100\' · Theme Indigo', chips:[] },
        { cls:'sim', no:'SIM', t:'Lab 37 — Standing Waves on a String',
          file:'https://kp-science.github.io/physics-simulations/Virtual%20Physics%20Lab%2002/37.%20standing-waves.html',
          d:'Virtual Lab · Doorbell vibrator + เชือก 0.5–2.5 m + น้ำหนัก 0.01–3.0 N + f 10–120 Hz · โหมดวัดค่าเอง: คลิก Node 2 จุด → วัด d → λ=2d · ใช้ใน POE-09 + Calc 9.1',
          chips:[['m','M9.1'],['m','M9.2'],['m','M9.3'],['m','M9.4'],['k','K9.1'],['k','K9.2'],['p','P9.1']] },
        { cls:'sim', no:'CLIP', t:'🎬 คลิปไมโครเวฟจุดร้อน (Hook Engage)',
          d:'มาร์ชเมลโลว์/ชีสหลอมเป็นแพทเทิร์น A/N ในไมโครเวฟ (ถอดจานหมุน) · วัด λ/2 = 6cm → f = 2.45 GHz · ใช้ใน E1 Engage + Calc ข้อ 4',
          chips:[['m','M9.1'],['m','M9.2'],['k','K9.3']] }
      ]},
      { title: '🎨 สื่อการสอน (ใช้ในกิจกรรม)', items: [
        { cls:'e2', no:'02', t:'POE-09 Interactive · ใบบันทึก P / O / E', file:'สื่อ02_POE-09_ใบบันทึกPOE.html',
          d:'Predict 5 ข้อ + canvas วาด mode n=1,2,3 · Observe 5 trials Lab 37 (W, f, n, d, λ, v) + Integration checklist · Explain CER + 🟢 Inventory 5 + 🔴 MC 4 (M9.1-M9.4)',
          meta:'ใช้ตลอด E1–E3 · 50 นาที',
          chips:[['p','P9.1'],['p','P9.2'],['m','M9.1'],['m','M9.2'],['m','M9.3'],['m','M9.4']] },
        { cls:'e4', no:'03', t:'ใบกิจกรรม 9.1 · Calc คลื่นนิ่ง + บูรณาการ', file:'สื่อ03_Calc_ใบกิจกรรม9.1.html',
          d:'7 ข้อ · พื้นฐาน (λ=2d · v=√(T/μ) · fₙ=(n/2L)√(T/μ) harmonic 1-3) + ประยุกต์ 4 (ไมโครเวฟ · กีตาร์ตัดครึ่ง · เชือก μ ต่าง · ท่อเปิด/ปิด) · canvas + worksheet-core.js',
          meta:'ใช้ในฉาก E4 Elaborate · 25 นาที',
          chips:[['k','K9.2'],['k','K9.3'],['p','P9.1'],['m','M9.4']] },
        { cls:'e4', no:'04', t:'ใบกิจกรรม 9.2 · Spot the Error · คลื่นนิ่ง', file:'สื่อ04_Spot_ใบกิจกรรม9.2.html',
          d:'5 สถานการณ์ · "คลื่นนิ่ง=หยุด" (M9.1) · "N=สั่นแรงสุด" (M9.2) · "1 ขบวนพอ" (M9.3) · "f มีค่าเดียว" (M9.4) · Integration error · claim canvas overlay + canvas อธิบาย',
          meta:'ใช้ในฉาก E4 Elaborate · 10 นาที',
          chips:[['k','K9.1'],['k','K9.3'],['m','M9.1'],['m','M9.2'],['m','M9.3'],['m','M9.4']] }
      ]},
      { title: '📊 เครื่องมือวัดและประเมิน', items: [
        { cls:'ft', no:'05', t:'F9 Four-tier · Pre + Post', file:'สื่อ05_F9_Fourtier_PrePost.html',
          d:'3 ข้อ Four-tier · M9.1 (คลื่นนิ่ง≠หยุด) · M9.2 (A สั่นแรง/N ไม่สั่น · ใช้ไมโครเวฟ) · M9.3 (ต้อง 2 ขบวน) · SVG + Answer Key',
          meta:'ใช้ในฉาก F9 Pre (7\') + F9 Post (5\')',
          chips:[['k','K9.1'],['k','K9.2'],['m','M9.1'],['m','M9.2'],['m','M9.3'],['w','วPA 1,6']] },
        { cls:'tlc', no:'TL', t:'TL-01 · Traffic Light Card', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ06_TL-01_TrafficLight.html',
          d:'บัตรประเมินตนเอง 🟢🟡🔴 (ใช้ร่วมกับแผน 1)', meta:'ใช้ในฉาก TLC ก่อน + TLC หลัง',
          chips:[['a','A9.2'],['w','วPA 6,8']] },
        { cls:'mj', no:'MJ', t:'MJ-09 · Metacognitive Journal 3-2-1', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ07_MJ-01_MetacognitiveJournal.html',
          d:'3 เข้าใจใหม่ (A/N/fₙ/integration) · 2 เชื่อมแผน 1-8 · 1 Self-Efficacy สำหรับ FT-02 (0-10)',
          meta:'ใช้ในฉาก MJ · 5 นาที',
          chips:[['a','A9.1'],['a','A9.2'],['w','วPA 6,8']] },
        { cls:'ob', no:'OB', t:'OB-01 · แบบสังเกตพฤติกรรม', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ08_OB-01_แบบสังเกตพฤติกรรม.html',
          d:'เน้น Collaborative Synthesis (A9.1) · ใช้ร่วมกับแผน 1', meta:'ใช้ตลอด 100 นาที',
          chips:[['a','A9.1'],['w','วPA 5,7']] },
        { cls:'rubric', no:'R', t:'POE Rubric + Concept Map Rubric (0–4)', file:'../แผน01_การเกิดคลื่นและชนิดของคลื่น/สื่อ09_POE_Rubric_เกณฑ์ให้คะแนน.html',
          d:'Rubric รายด้าน P/O/E + Concept Map 4 สมบัติ → คลื่นนิ่ง · target ≥ 3/4', meta:'ครูใช้ประเมินใบ POE-09 + Concept Map',
          chips:[['p','P9.1'],['p','P9.2'],['w','วPA 3,5']] }
      ]},
      { title: '🗒 CER Live Board', items: [
        { cls:'info', no:'CER', t:'CER Board (ใช้ใน E3 Explain)',
          d:'3 คอลัมน์: ↩️➕ สะท้อน+ซ้อนทับ (แก้ M9.3) · ✨ แทรกสอด→A,N (แก้ M9.2) · 🎼 Harmonics fₙ (แก้ M9.4) · ผูก POE-09 + 5 trials Lab 37',
          meta:'ใช้ในฉาก E3 · 15 นาที',
          chips:[['k','K9.1'],['k','K9.2'],['k','K9.3'],['w','วPA 1,3,6']] }
      ]}
    ],
    linkOut: [
      'F9 Pre/Post → % Sound · MC M9.1-M9.3 · Normalized gain · เป้า ลด MC M9.1 ≥ 50% · M9.2/M9.3 ≥ 30% · g ≥ 0.3',
      'POE-09 + POE Rubric → คะแนนเฉลี่ย ≥ 2.0 · 5 trials Lab 37',
      'Calc 9.1 → 7 ข้อ (พื้นฐาน 3 + ประยุกต์ 4) · คะแนนเฉลี่ย ≥ 71% (20/28)',
      'Spot 9.2 → 5 claims · ถูก ≥ 3 ใน 5 ข้อ',
      'Concept Map P9.2 → Rubric ≥ 3/4 · บูรณาการ 4 สมบัติ',
      'CER Board → คลัง Claim-Evidence-Reasoning · Derive y = 2A sin(kx)cos(ωt) + fₙ = (n/2L)√(T/μ)',
      'TL-01 → บัตรเขียว ≥ 60%',
      'MJ-09 → Self-Efficacy FT-02 ≥ 7/10 · เชื่อมแผน 1-8 → พร้อมเข้า FT-02 (แผน 10)',
      'OB-01 → Collaborative Synthesis (A9.1 ≥ 80%)'
    ]
  }
};
