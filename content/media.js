// ═══════════════════════════════════════════════════════════════════
// Content Pack: Media (สื่อและเครื่องมือของแต่ละแผน)
// ═══════════════════════════════════════════════════════════════════
// โชว์ในแท็บ "📚 สื่อ/เครื่องมือ" ของ Teacher Dashboard
// โครงสร้าง: { planNo: { folder, title, meta, sections:[{title, items:[...]}], linkOut:[...] } }
// ═══════════════════════════════════════════════════════════════════

window.KP_PLAN_MEDIA = {
  1: {
    folder: 'แผน01_การเกิดคลื่นและชนิดของคลื่น',
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
    folder: 'แผน02_ความเร็วคลื่น',
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
  }
};
