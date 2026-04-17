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
          file:'https://kp-science.github.io/physics-simulations/Demo/คลื่น/huygens-principle-demo.html',
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
  }
};
