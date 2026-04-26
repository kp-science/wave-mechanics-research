// ═══════════════════════════════════════════════════════════════════
// Content Pack: Media (SHM · 6 แผน · 76 ไฟล์)
// ═══════════════════════════════════════════════════════════════════
// แท็บ "📚 สื่อ/เครื่องมือ" ใน Teacher Dashboard
// folder ชี้ไปที่ lessons/physics3/SHM/{แผนXX}/
// ═══════════════════════════════════════════════════════════════════
window.KP_PLAN_MEDIA = {
  // ───────── แผน 1 · นิยาม SHM ─────────
  1: {
    folder: 'lessons/physics3/SHM/แผน01_นิยามSHM',
    title: 'แผน 1 — นิยาม SHM และปริมาณพื้นฐาน (f, T, ω)',
    meta: 'ว30203 ฟิสิกส์ 3 · ม.5 · คาบ 1–2 (100 นาที) · หน่วย SHM แผน 1',
    sections: [
      { title: '🗺 แผนภาพรวม', items: [
        { cls:'info', no:'00', t:'Index สื่อและเครื่องมือ แผน 1', file:'00_Index_สื่อและเครื่องมือแผน1.html',
          d:'แผนภาพรวมการสอน · 5E+POE · media map · vPA matrix', chips:[] },
        { cls:'info', no:'IG', t:'Infographic แผน 1 (ฉบับสมบูรณ์)', file:'แผน1_Infographic.html',
          d:'K/P/A · 5E+POE 9 ขั้น · ACT+GOAL · vPA 8 ตัวชี้วัด · Timeline', chips:[] }
      ]},
      { title: '🎨 สื่อการสอน (ใช้ในกิจกรรม)', items: [
        { cls:'e1', no:'01', t:'Concept Cartoon "คลาสวิ่ง"', file:'สื่อ01_ConceptCartoon_คลาสวิ่ง.html',
          d:'4 ตัวละครถกเถียงนิยาม SHM · interactive checklist auto-score',
          meta:'ใช้ในฉาก E1 Engage · 12 นาที',
          chips:[['m','M1.1'],['m','M1.2'],['','POE-P']] },
        { cls:'e2', no:'02', t:'POE-01 ใบบันทึก P / O / E', file:'สื่อ02_POE-01_ใบบันทึกPOE.html',
          d:'Predict-Observe-Explain 6 สถานการณ์ + คำถามสะท้อน',
          meta:'ใช้ในฉาก E1, E2, E3',
          chips:[['p','P1'],['p','P2'],['m','M1.1'],['m','M1.2'],['m','M1.3']] },
        { cls:'e4', no:'03', t:'ใบงาน 1.1 · Calc f, T, ω', file:'สื่อ03_Calc_ใบงาน1.1.html',
          d:'โจทย์คำนวณ 5 ข้อ ไล่ระดับ + canvas วาดกราฟ',
          meta:'ใช้ในฉาก E4 Elaborate · 15 นาที',
          chips:[['k','K2'],['p','P1'],['m','M1.1'],['m','M1.3']] },
        { cls:'e4', no:'04', t:'ใบงาน 1.2 · Spot the Error', file:'สื่อ04_SpotTheError_ใบงาน1.2.html',
          d:'หาข้อผิดพลาด 3 สถานการณ์ + canvas overlay · เน้น F = −kx',
          meta:'ใช้ในฉาก E4 Elaborate · 10 นาที',
          chips:[['k','K2'],['p','P2'],['m','M1.2'],['m','M1.3']] },
        { cls:'e3', no:'10', t:'CER LiveBoard', file:'สื่อ10_CERLiveBoard.html',
          d:'Claim-Evidence-Reasoning · นักเรียนโพสต์ขึ้นกระดาน · ครู moderate',
          meta:'ใช้ในฉาก E3 Explain · 10 นาที',
          chips:[['k','K3'],['p','P2'],['a','A2']] },
        { cls:'e4', no:'11', t:'Exercise · 12 ข้อ', file:'สื่อ11_Exercise_12ข้อ.html',
          d:'การบ้าน 12 ข้อ · ทบทวนปลายแผน',
          meta:'การบ้าน · 30 นาที',
          chips:[['k','K2'],['p','P1']] }
      ]},
      { title: '📊 เครื่องมือวัดและประเมิน', items: [
        { cls:'ft', no:'05', t:'F1 Four-tier · Pre + Post', file:'สื่อ05_F1_Fourtier_PrePost.html',
          d:'3 ข้อ · วัด M1.1, M1.2, M1.3 · เทียบ Pre→Post คำนวณ Normalized gain',
          meta:'ใช้ในฉาก F1 Pre (5\') + F1 Post (7\')',
          chips:[['k','K1'],['k','K2'],['m','M1.1'],['m','M1.2'],['m','M1.3'],['w','วPA 2,6']] },
        { cls:'tlc', no:'06', t:'TL-01 · Traffic Light Card', file:'สื่อ06_TL-01_TrafficLight.html',
          d:'บัตรประเมินตนเอง 🟢🟡🔴 ก่อน-หลังคาบ',
          meta:'ใช้ในฉาก TLC ก่อน + หลัง · 3\' + 3\'',
          chips:[['a','A1'],['w','วPA 4,7']] },
        { cls:'mj', no:'07', t:'MJ-01 · Metacognitive Journal 3-2-1', file:'สื่อ07_MJ-01_MetacognitiveJournal.html',
          d:'3 เข้าใจใหม่ · 2 น่าสนใจ · 1 คำถาม',
          meta:'ใช้ในฉาก MJ ปลายคาบ · 2 นาที',
          chips:[['a','A2'],['w','วPA 6,8']] },
        { cls:'ob', no:'08', t:'OB-01 · แบบสังเกตพฤติกรรม', file:'สื่อ08_OB-01_แบบสังเกตพฤติกรรม.html',
          d:'ครูบันทึก: รายบุคคล · กลุ่ม · ข้อสังเกตเพิ่มเติม',
          meta:'ใช้ตลอด 100 นาที',
          chips:[['p','P1'],['p','P2'],['a','A1'],['w','วPA 4,7']] },
        { cls:'rubric', no:'09', t:'POE Rubric · เกณฑ์ให้คะแนน (0–3)', file:'สื่อ09_POE_Rubric_เกณฑ์ให้คะแนน.html',
          d:'Rubric รายด้าน P/O/E + ตัวอย่างคะแนน',
          meta:'ครูใช้ประเมินใบ POE-01',
          chips:[['p','P1'],['p','P2'],['w','วPA 3,5']] }
      ]}
    ],
    linkOut: [
      'F1 Pre/Post → ตาราง % Sound · Misconception M1.1–M1.3 · Normalized gain',
      'POE-01 + Rubric → คะแนน POE รายบุคคล/กลุ่ม · เป้า ≥ 2.0',
      'TL-01 → อัตราบัตรเขียวก่อน-หลัง · เป้า ≥ 60%',
      'MJ-01 → คำถามเด่นเป็น Hook แผน 2 (ลูกตุ้ม)'
    ]
  },

  // ───────── แผน 2 · ลูกตุ้มอย่างง่าย ─────────
  2: {
    folder: 'lessons/physics3/SHM/แผน02_ลูกตุ้ม',
    title: 'แผน 2 — ลูกตุ้มอย่างง่าย · T = 2π√(l/g)',
    meta: 'ว30203 ฟิสิกส์ 3 · ม.5 · คาบ 3–4 (100 นาที) · หน่วย SHM แผน 2',
    sections: [
      { title: '🗺 แผนภาพรวม', items: [
        { cls:'info', no:'00', t:'Index สื่อและเครื่องมือ แผน 2', file:'00_Index_สื่อและเครื่องมือแผน2.html',
          d:'แผนภาพรวม · Pendulum Lab simulation · 5E+POE', chips:[] },
        { cls:'info', no:'IG', t:'Infographic แผน 2 (ฉบับสมบูรณ์)', file:'แผน2_Infographic.html',
          d:'แผนผังภาพรวม + misconception map 4 concepts', chips:[] }
      ]},
      { title: '🎨 สื่อการสอน (ใช้ในกิจกรรม)', items: [
        { cls:'e1', no:'01', t:'Concept Cartoon "ลูกตุ้มหนัก-เบา"', file:'สื่อ01_ConceptCartoon_ลูกตุ้มหนักเบา.html',
          d:'3 ตัวละครถกเรื่องผลของมวลต่อ T · interactive',
          meta:'ใช้ในฉาก E1 Engage · 12 นาที',
          chips:[['m','M2.1'],['m','M2.2'],['','POE-P']] },
        { cls:'e2', no:'02', t:'POE-02 ใบบันทึก 3 ฐาน', file:'สื่อ02_POE-02_ใบบันทึก3ฐาน.html',
          d:'Predict-Observe-Explain 3 ฐาน + กราฟ T² vs l + การพิสูจน์',
          meta:'ใช้ในฉาก E1, E2, E3',
          chips:[['p','P1'],['p','P2'],['m','M2.1'],['m','M2.2'],['m','M2.3']] },
        { cls:'e4', no:'03', t:'ใบงาน 2.1 · Calc 6 ข้อ', file:'สื่อ03_Calc_ใบงาน2.1.html',
          d:'โจทย์ T/f/ω + Huygens + g บนดวงจันทร์ + g determination + coupled pendulum',
          meta:'ใช้ในฉาก E4 Elaborate · 18 นาที',
          chips:[['k','K2'],['p','P1'],['m','M2.1'],['m','M2.3']] },
        { cls:'e4', no:'04', t:'ใบงาน 2.2 · Spot the Error', file:'สื่อ04_SpotTheError_ใบงาน2.2.html',
          d:'หาข้อผิดพลาด 4 ข้อ · canvas marking · M2.1–M2.4',
          meta:'ใช้ในฉาก E4 Elaborate · 12 นาที',
          chips:[['k','K2'],['p','P2'],['m','M2.1'],['m','M2.2'],['m','M2.3'],['m','M2.4']] },
        { cls:'e3', no:'10', t:'CER LiveBoard (แผน 2)', file:'สื่อ10_CERLiveBoard.html',
          d:'CER + การโต้แย้งจากข้อมูล Pendulum Lab',
          meta:'ใช้ในฉาก E3 Explain · 10 นาที',
          chips:[['k','K3'],['p','P2']] },
        { cls:'e4', no:'11', t:'Exercise · 12 ข้อ (แผน 2)', file:'สื่อ11_Exercise_12ข้อ.html',
          d:'การบ้าน 12 ข้อ · ทบทวน',
          meta:'การบ้าน · 30 นาที',
          chips:[['k','K2'],['p','P1']] }
      ]},
      { title: '📊 เครื่องมือวัดและประเมิน', items: [
        { cls:'ft', no:'05', t:'F2 Four-tier · Pre + Post', file:'สื่อ05_F2_Fourtier_PrePost.html',
          d:'3 ข้อ · วัด M2.1–M2.4 · เทียบ Pre→Post คำนวณ Normalized gain',
          meta:'ใช้ในฉาก F2 Pre + Post',
          chips:[['k','K2'],['m','M2.1'],['m','M2.2'],['m','M2.3'],['m','M2.4'],['w','วPA 2,6']] },
        { cls:'tlc', no:'06', t:'TL-02 · Traffic Light Card', file:'สื่อ06_TL-02_TrafficLight.html',
          d:'บัตรประเมินตนเอง 🟢🟡🔴',
          meta:'ใช้ในฉาก TLC ก่อน + หลัง',
          chips:[['a','A1'],['w','วPA 4,7']] },
        { cls:'mj', no:'07', t:'MJ-02 · Metacognitive Journal', file:'สื่อ07_MJ-02_MetacognitiveJournal.html',
          d:'3-2-1 reflection',
          meta:'ใช้ในฉาก MJ · 2 นาที',
          chips:[['a','A2'],['w','วPA 6,8']] },
        { cls:'ob', no:'08', t:'OB-02 · แบบสังเกตพฤติกรรม', file:'สื่อ08_OB-02_แบบสังเกตพฤติกรรม.html',
          d:'ครูบันทึกพฤติกรรม รายบุคคล + กลุ่ม',
          meta:'ใช้ตลอด 100 นาที',
          chips:[['p','P1'],['p','P2'],['a','A1']] },
        { cls:'rubric', no:'09', t:'POE Rubric (แผน 2)', file:'สื่อ09_POE_Rubric.html',
          d:'Rubric ประเมิน POE-02',
          meta:'ครูใช้ประเมินใบ POE-02',
          chips:[['p','P1'],['p','P2']] }
      ]}
    ],
    linkOut: [
      'F2 Pre/Post → % Sound · Misconception M2.1–M2.4 · Normalized gain',
      'POE-02 + Rubric → คะแนน POE รายฐาน · เป้า ≥ 2.0',
      'Pendulum Lab → ข้อมูล T² vs l · slope = 4π²/g'
    ]
  },

  // ───────── แผน 3 · ระบบมวล-สปริง ─────────
  3: {
    folder: 'lessons/physics3/SHM/แผน03_มวลสปริง',
    title: 'แผน 3 — ระบบมวล-สปริง · T = 2π√(m/k)',
    meta: 'ว30203 ฟิสิกส์ 3 · ม.5 · คาบ 5–6 (100 นาที) · หน่วย SHM แผน 3',
    sections: [
      { title: '🗺 แผนภาพรวม', items: [
        { cls:'info', no:'00', t:'Index สื่อและเครื่องมือ แผน 3', file:'00_Index_สื่อและเครื่องมือแผน3.html',
          d:'แผนภาพรวม · timeline · vPA matrix', chips:[] },
        { cls:'info', no:'IG', t:'Infographic แผน 3 (ฉบับสมบูรณ์)', file:'แผน3_Infographic.html',
          d:'แผนผังภาพรวม + vPA table + concept summary', chips:[] }
      ]},
      { title: '🎨 สื่อการสอน (ใช้ในกิจกรรม)', items: [
        { cls:'e1', no:'02', t:'Engage Hook + CC-03 "สปริงคู่"', file:'สื่อ02_Engage_Hook.html',
          d:'Hook + Concept Cartoon ระบบสปริง 2 ตัว',
          meta:'ใช้ในฉาก E1 Engage · 10 นาที',
          chips:[['m','M3.1'],['m','M3.2'],['','POE-P']] },
        { cls:'e2', no:'03', t:'POE · Spring Builder', file:'สื่อ03_POE_SpringBuilder.html',
          d:'Predict-Observe-Explain 3 ฐาน · ใช้ Spring Sim สร้างชุดทดลอง',
          meta:'ใช้ในฉาก E2 Explore · 25 นาที',
          chips:[['p','P1'],['p','P2'],['m','M3.1'],['m','M3.2'],['m','M3.3']] },
        { cls:'e3', no:'04', t:'Concept Map · เชื่อมแนวคิด-สมการ', file:'สื่อ04_Explain_ConceptMap.html',
          d:'Graphic organizer · F=−kx → T=2π√(m/k) · k_series, k_parallel',
          meta:'ใช้ในฉาก E3 Explain · 12 นาที',
          chips:[['k','K3'],['p','P2'],['m','M3.4']] },
        { cls:'e4', no:'05', t:'Exercise · Mass-Spring 8 ข้อ', file:'สื่อ05_Exercise_MassSpring.html',
          d:'โจทย์คำนวณ T, k, ω + การต่อสปริง series/parallel',
          meta:'ใช้ในฉาก E4 Elaborate · 15 นาที',
          chips:[['k','K2'],['p','P1'],['m','M3.2']] },
        { cls:'e4', no:'06', t:'Case Study · "โช้คอัพรถยนต์"', file:'สื่อ06_CaseStudy_โช้คอัพ.html',
          d:'วิเคราะห์ระบบกันสะเทือน · ทำไมต้องมี damping',
          meta:'ใช้ในฉาก E4 Elaborate · 10 นาที',
          chips:[['k','K3'],['a','A1']] },
        { cls:'e5', no:'07', t:'Exit Ticket', file:'สื่อ07_ExitTicket.html',
          d:'Formative check ปลายคาบ',
          meta:'ใช้ในฉาก Exit · 5 นาที',
          chips:[['k','K2'],['a','A2']] },
        { cls:'e4', no:'11', t:'Exercise เพิ่มเติม', file:'สื่อ11_Exercise_เพิ่มเติม.html',
          d:'โจทย์ขยายผล (ทำเอง · ไม่บังคับ)',
          meta:'การบ้านเสริม',
          chips:[['k','K2']] }
      ]},
      { title: '📊 เครื่องมือวัดและประเมิน', items: [
        { cls:'ft', no:'01', t:'F3 Four-tier · Pre/Post', file:'สื่อ01_F3_Fourtier_PrePost.html',
          d:'4 ข้อ · วัด M3.1–M3.4 · Pre/Post diagnostic',
          meta:'ใช้ในฉาก F3 Pre + Post',
          chips:[['k','K2'],['m','M3.1'],['m','M3.2'],['m','M3.3'],['m','M3.4']] },
        { cls:'mj', no:'08', t:'Journal 3-2-1', file:'สื่อ08_Journal_321.html',
          d:'3 เข้าใจใหม่ · 2 คำถาม · 1 อุปมา',
          meta:'ใช้ในฉาก MJ · 2 นาที',
          chips:[['a','A2']] },
        { cls:'tlc', no:'09', t:'TL-03 · Traffic Light', file:'สื่อ09_TL-03_TrafficLight.html',
          d:'บัตรประเมินตนเอง 🟢🟡🔴',
          meta:'ใช้ในฉาก TLC ก่อน + หลัง',
          chips:[['a','A1']] },
        { cls:'rubric', no:'10', t:'Answer Key', file:'สื่อ10_AnswerKey.html',
          d:'เฉลย Exercise + คำอธิบายขั้นตอน',
          meta:'ครูใช้ตรวจ + นักเรียนทบทวน',
          chips:[['k','K2']] }
      ]}
    ],
    linkOut: [
      'F3 Pre/Post → Misconception M3.1–M3.4 · Normalized gain',
      'POE Spring Builder → ข้อมูล T vs m, T vs k → log-log slope = 0.5'
    ]
  },

  // ───────── แผน 4 · เฟส x, v, a ─────────
  4: {
    folder: 'lessons/physics3/SHM/แผน04_เฟสxva',
    title: 'แผน 4 — เฟสของการกระจัด ความเร็ว และความเร่ง',
    meta: 'ว30203 ฟิสิกส์ 3 · ม.5 · คาบ 7–8 (100 นาที) · หน่วย SHM แผน 4',
    sections: [
      { title: '🗺 แผนภาพรวม', items: [
        { cls:'info', no:'00', t:'Index สื่อและเครื่องมือ แผน 4', file:'00_Index_สื่อและเครื่องมือแผน4.html',
          d:'แผนภาพรวม · 4 misconceptions · 11 media items', chips:[] },
        { cls:'info', no:'IG', t:'Infographic แผน 4 (ฉบับสมบูรณ์)', file:'แผน4_Infographic.html',
          d:'แผนผังภาพรวม + เฟสไดอะแกรม', chips:[] }
      ]},
      { title: '🎨 สื่อการสอน (ใช้ในกิจกรรม)', items: [
        { cls:'e1', no:'02', t:'Engage Hook', file:'สื่อ02_Engage_Hook.html',
          d:'Hook กระตุ้นความคิดเรื่องเฟส x, v, a',
          meta:'ใช้ในฉาก E1 Engage · 8 นาที',
          chips:[['m','M4.1'],['','POE-P']] },
        { cls:'e2', no:'03', t:'Jigsaw · Phase Explorer', file:'สื่อ03_Jigsaw_PhaseExplorer.html',
          d:'4 expert groups (R/G/B/P) วิเคราะห์ x, v, a · เฟส 0/π/2 · π · 3π/2',
          meta:'ใช้ในฉาก E2 Explore · 25 นาที',
          chips:[['p','P1'],['p','P2'],['m','M4.1'],['m','M4.2']] },
        { cls:'e3', no:'04', t:'Concept Map + Vector Drawing', file:'สื่อ04_ConceptMap_VectorDraw.html',
          d:'แผนผังเชื่อมแนวคิด + วาด vector x, v, a ที่จุดต่างๆ',
          meta:'ใช้ในฉาก E3 Explain · 15 นาที',
          chips:[['k','K3'],['p','P2'],['m','M4.3']] },
        { cls:'e4', no:'05', t:'Exercise · Phase', file:'สื่อ05_Exercise_Phase.html',
          d:'โจทย์คำนวณเฟส + วิเคราะห์กราฟ x-t, v-t, a-t',
          meta:'ใช้ในฉาก E4 Elaborate · 15 นาที',
          chips:[['k','K2'],['p','P1'],['m','M4.4']] },
        { cls:'e4', no:'06', t:'Case Study · Seismograph', file:'สื่อ06_CaseStudy_Seismograph.html',
          d:'วิเคราะห์เครื่องบันทึกแผ่นดินไหว · เฟสของคลื่น P, S',
          meta:'ใช้ในฉาก E4 Elaborate · 10 นาที',
          chips:[['k','K3'],['a','A1']] },
        { cls:'e5', no:'07', t:'Exit Ticket', file:'สื่อ07_ExitTicket.html',
          d:'Formative check ปลายคาบ',
          meta:'ใช้ในฉาก Exit · 5 นาที',
          chips:[['k','K2']] },
        { cls:'e4', no:'11', t:'Exercise เพิ่มเติม', file:'สื่อ11_Exercise_เพิ่มเติม.html',
          d:'โจทย์ขยายผล',
          meta:'การบ้านเสริม',
          chips:[['k','K2']] }
      ]},
      { title: '📊 เครื่องมือวัดและประเมิน', items: [
        { cls:'ft', no:'01', t:'F4 Four-tier · Pre/Post', file:'สื่อ01_F4_Fourtier_PrePost.html',
          d:'4 ข้อ · วัด M4.1–M4.4 · เฟส x, v, a',
          meta:'ใช้ในฉาก F4 Pre + Post',
          chips:[['k','K2'],['m','M4.1'],['m','M4.2'],['m','M4.3'],['m','M4.4']] },
        { cls:'mj', no:'08', t:'Journal 3-2-1', file:'สื่อ08_Journal_321.html',
          d:'3-2-1 reflection',
          meta:'ใช้ในฉาก MJ · 2 นาที',
          chips:[['a','A2']] },
        { cls:'tlc', no:'09', t:'TL-04 · Traffic Light', file:'สื่อ09_TL-04_TrafficLight.html',
          d:'บัตรประเมินตนเอง 🟢🟡🔴',
          meta:'ใช้ในฉาก TLC ก่อน + หลัง',
          chips:[['a','A1']] },
        { cls:'rubric', no:'10', t:'Answer Key', file:'สื่อ10_AnswerKey.html',
          d:'เฉลย Exercise + คำอธิบาย',
          meta:'ครูใช้ตรวจ',
          chips:[['k','K2']] }
      ]}
    ],
    linkOut: [
      'F4 Pre/Post → Misconception M4.1–M4.4 (เฟส x, v, a)',
      'Jigsaw → expert group reports + vector diagram'
    ]
  },

  // ───────── แผน 5 · พลังงานใน SHM ─────────
  5: {
    folder: 'lessons/physics3/SHM/แผน05_พลังงาน',
    title: 'แผน 5 — พลังงานในการสั่น SHM',
    meta: 'ว30203 ฟิสิกส์ 3 · ม.5 · คาบ 9–10 (100 นาที) · หน่วย SHM แผน 5',
    sections: [
      { title: '🗺 แผนภาพรวม', items: [
        { cls:'info', no:'00', t:'Index สื่อและเครื่องมือ แผน 5', file:'00_Index_สื่อและเครื่องมือแผน5.html',
          d:'แผนภาพรวม · vPA matrix · energy map · M5.1–M5.4', chips:[] },
        { cls:'info', no:'IG', t:'Infographic แผน 5 (ฉบับสมบูรณ์)', file:'แผน5_Infographic.html',
          d:'แผนผังภาพรวม + พลังงาน E∝A² · v=ω√(A²−y²)', chips:[] }
      ]},
      { title: '🎨 สื่อการสอน (ใช้ในกิจกรรม)', items: [
        { cls:'e1', no:'02', t:'Concept Cartoon · Energy Misconceptions', file:'สื่อ02_Engage_Hook_CC05.html',
          d:'CC ถกเถียงเรื่องการอนุรักษ์พลังงานในการสั่น',
          meta:'ใช้ในฉาก E1 Engage · 10 นาที',
          chips:[['m','M5.1'],['m','M5.2'],['','POE-P']] },
        { cls:'e2', no:'03', t:'TPS + SIM05 · ใบบันทึก', file:'สื่อ03_TPS_SIM05_ใบบันทึก.html',
          d:'Think-Pair-Share + Simulation พลังงาน · บันทึกข้อมูล',
          meta:'ใช้ในฉาก E2 Explore · 20 นาที',
          chips:[['p','P1'],['p','P2'],['m','M5.1'],['m','M5.3']] },
        { cls:'e3', no:'04', t:'Data Analysis + Concept Map', file:'สื่อ04_DataAnalysis_ConceptMap.html',
          d:'วิเคราะห์ข้อมูลพลังงาน + ผังเชื่อม E∝A², v=ω√(A²−y²)',
          meta:'ใช้ในฉาก E3 Explain · 15 นาที',
          chips:[['k','K3'],['p','P2'],['m','M5.4']] },
        { cls:'e4', no:'05', t:'Exercise · Energy', file:'สื่อ05_Exercise_Energy.html',
          d:'โจทย์พลังงาน E_k, E_p, E_total + จุดสูงสุด-ต่ำสุด',
          meta:'ใช้ในฉาก E4 Elaborate · 15 นาที',
          chips:[['k','K2'],['p','P1'],['m','M5.2']] },
        { cls:'e5', no:'07', t:'Exit Ticket', file:'สื่อ07_ExitTicket.html',
          d:'Formative check ปลายคาบ',
          meta:'ใช้ในฉาก Exit · 5 นาที',
          chips:[['k','K2']] },
        { cls:'e4', no:'11', t:'Exercise เพิ่มเติม', file:'สื่อ11_Exercise_เพิ่มเติม.html',
          d:'โจทย์ขยายผล',
          meta:'การบ้านเสริม',
          chips:[['k','K2']] }
      ]},
      { title: '📊 เครื่องมือวัดและประเมิน', items: [
        { cls:'ft', no:'01', t:'Pre-test F5 · Four-tier', file:'สื่อ01_Pretest_F5_Fourtier.html',
          d:'5 ข้อ · วัด M5.1–M5.4 · ก่อนเรียน',
          meta:'ใช้ในฉาก F5 Pre',
          chips:[['k','K2'],['m','M5.1'],['m','M5.2'],['m','M5.3'],['m','M5.4']] },
        { cls:'ft', no:'09', t:'Post-test F5 · Four-tier', file:'สื่อ09_Posttest_F5_Fourtier.html',
          d:'5 ข้อ matching pre · หลังเรียน · คำนวณ Normalized gain',
          meta:'ใช้ในฉาก F5 Post',
          chips:[['k','K2'],['m','M5.1'],['m','M5.2'],['m','M5.3'],['m','M5.4']] },
        { cls:'tlc', no:'06', t:'TL05 · Traffic Light', file:'สื่อ06_TL05_TrafficLight.html',
          d:'บัตรประเมินตนเอง 🟢🟡🔴',
          meta:'ใช้ในฉาก TLC ก่อน + หลัง',
          chips:[['a','A1']] },
        { cls:'mj', no:'08', t:'Journal MJ05 · 3-2-1', file:'สื่อ08_Journal_MJ05.html',
          d:'3-2-1 reflection',
          meta:'ใช้ในฉาก MJ · 2 นาที',
          chips:[['a','A2']] },
        { cls:'rubric', no:'10', t:'Answer Key', file:'สื่อ10_AnswerKey.html',
          d:'เฉลย Exercise + คำอธิบาย',
          meta:'ครูใช้ตรวจ',
          chips:[['k','K2']] }
      ]}
    ],
    linkOut: [
      'F5 Pre/Post → Misconception M5.1–M5.4 · Normalized gain',
      'TPS + SIM05 → ข้อมูลพลังงานจาก simulation'
    ]
  },

  // ───────── แผน 6 · Damping & Resonance (Capstone) ─────────
  6: {
    folder: 'lessons/physics3/SHM/แผน06_damping_resonance',
    title: 'แผน 6 — Damped SHM และ Resonance (Capstone)',
    meta: 'ว30203 ฟิสิกส์ 3 · ม.5 · คาบ 11–12 (100 นาที) · หน่วย SHM แผน 6 (Capstone)',
    sections: [
      { title: '🗺 แผนภาพรวม', items: [
        { cls:'info', no:'00', t:'Index สื่อและเครื่องมือ แผน 6', file:'00_Index_สื่อและเครื่องมือแผน6.html',
          d:'Unit Capstone · media grid + vPA matrix', chips:[] },
        { cls:'info', no:'IG', t:'Infographic แผน 6 (ฉบับสมบูรณ์)', file:'แผน6_Infographic.html',
          d:'สรุปทั้งหน่วย SHM + Damping/Resonance', chips:[] }
      ]},
      { title: '🎨 สื่อการสอน (ใช้ในกิจกรรม)', items: [
        { cls:'e1', no:'02', t:'Video Analysis + Concept Cartoon', file:'02_Engage_VideoAnalysis.html',
          d:'วิเคราะห์คลิปจริง · Tacoma Bridge / สะพานสั่น / Resonance',
          meta:'ใช้ในฉาก E1 Engage · 12 นาที',
          chips:[['m','M6.1'],['m','M6.2'],['','POE-P']] },
        { cls:'e2', no:'03', t:'SIM06 · Damping & Resonance Worksheet', file:'03_SIM06_Worksheet.html',
          d:'ใบบันทึก Simulation · เปลี่ยนค่า damping coefficient + driving frequency',
          meta:'ใช้ในฉาก E2 Explore · 25 นาที',
          chips:[['p','P1'],['p','P2'],['m','M6.1'],['m','M6.3']] },
        { cls:'e3', no:'04', t:'Debate + Concept Map', file:'04_Debate_ConceptMap.html',
          d:'Structured debate เงื่อนไข Resonance + ผังความคิด',
          meta:'ใช้ในฉาก E3 Explain · 15 นาที',
          chips:[['k','K3'],['p','P2'],['a','A2']] },
        { cls:'e4', no:'05', t:'Exercise + PBL', file:'05_Exercise_PBL.html',
          d:'Problem-based learning · ออกแบบระบบลด resonance ในอาคาร',
          meta:'ใช้ในฉาก E4 Elaborate · 18 นาที',
          chips:[['k','K3'],['p','P1'],['a','A1']] },
        { cls:'e5', no:'07', t:'Exit Ticket', file:'07_ExitTicket.html',
          d:'Formative check ปลายคาบ',
          meta:'ใช้ในฉาก Exit · 5 นาที',
          chips:[['k','K2']] },
        { cls:'e4', no:'11', t:'Exercise เพิ่มเติม', file:'สื่อ11_Exercise_เพิ่มเติม.html',
          d:'โจทย์ขยายผล',
          meta:'การบ้านเสริม',
          chips:[['k','K2']] }
      ]},
      { title: '📊 เครื่องมือวัดและประเมิน', items: [
        { cls:'ft', no:'01', t:'Pretest 4-tier (Capstone)', file:'01_Pretest_4tier.html',
          d:'4-tier diagnostic · M6.1–M6.4 · Damping/Resonance',
          meta:'ใช้ในฉาก F6 Pre',
          chips:[['k','K2'],['m','M6.1'],['m','M6.2'],['m','M6.3'],['m','M6.4']] },
        { cls:'ft', no:'09', t:'Posttest Unit · 4-tier', file:'09_Posttest_Unit.html',
          d:'รวมหน่วย SHM ทั้งหน่วย · เทียบ Pre แผน 1',
          meta:'ใช้ปลาย Capstone · 30 นาที',
          chips:[['k','K1'],['k','K2'],['k','K3'],['m','M1.x–M6.x']] },
        { cls:'mj', no:'08', t:'Journal 3-2-1', file:'08_Journal_321.html',
          d:'3-2-1 reflection ปิดหน่วย',
          meta:'ใช้ในฉาก MJ · 3 นาที',
          chips:[['a','A2']] },
        { cls:'rubric', no:'10', t:'Answer Key + Unit Review', file:'10_AnswerKey_UnitReview.html',
          d:'เฉลย + ทบทวนหน่วย SHM ทั้งหมด',
          meta:'ครูใช้ตรวจ + นักเรียนทบทวนก่อนสอบ',
          chips:[['k','K1'],['k','K2'],['k','K3']] }
      ]}
    ],
    linkOut: [
      'Posttest Unit → เทียบกับ Pretest แผน 1 · คำนวณ g รวมหน่วย SHM',
      'Debate + ConceptMap → คะแนนการโต้แย้ง + ผังความคิดรวบยอด',
      'PBL → ผลงานออกแบบ (rubric P3, A1, วPA 5)'
    ]
  }
};
