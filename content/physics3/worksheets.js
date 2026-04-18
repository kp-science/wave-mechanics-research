// ═══════════════════════════════════════════════════════════════════
// Content Pack: Worksheets (Phase 3a — schema-driven)
// ═══════════════════════════════════════════════════════════════════
// Render ผ่าน generic renderers: renderMatrix · renderSpot · renderCalc
// Schema structure: KP_WORKSHEETS[planNo][type] = {...}
// Types: 'matrix' | 'spot' | 'calc'
// (POE ยังเป็น hardcoded ใน Phase 3b)
// ═══════════════════════════════════════════════════════════════════

window.KP_WORKSHEETS = {
  // ───────── แผน 1 · การเกิดคลื่น / ชนิด / ส่วนประกอบ ─────────
  1: {
    // POE-01 · Concept Cartoon "ของลอยในทะเล" + Slinky + wave-types Sim
    poe: {
      title:       'POE-01 · ใบบันทึก Predict–Observe–Explain (แผน 1)',
      submitLabel: '📤 ส่ง POE-01',
      sheetPrefix: 'POE_P',
      misconception: 'M1.1 · M1.2 · M1.3',
      allowUpload: true,
      hero: {
        question: 'ของลอย (ลูกมะพร้าว) ในทะเลจะถูกคลื่นพาไปไกลหรือไม่ เพราะเหตุใด?',
        context:  'คู่กับ Concept Cartoon "ของลอยในทะเล" + สังเกต Slinky/ริบบิ้น + Simulation wave-types'
      },
      predict: {
        question: 'ฉันคิดว่าลูกมะพร้าวในทะเลจะ:',
        options: [
          { v:'go_far',  l:'ถูกคลื่นพาไปไกล' },
          { v:'stay',    l:'ลอยขึ้น-ลงอยู่กับที่' },
          { v:'go_stop', l:'ถูกพาไปแล้วหยุด' }
        ],
        reasonHeader: 'เหตุผลที่คิดเช่นนั้น: (เลือกข้อที่ตรงกับความคิดมากที่สุด)',
        reasonOptions: [
          { v:'R1', l:'คลื่นพาน้ำ (และของที่ลอย) ไหลไปด้วย เหมือนกระแสน้ำ' },
          { v:'R2', l:'คลื่นส่งแรงผลักลูกมะพร้าวไปข้างหน้าเรื่อย ๆ' },
          { v:'R3', l:'คลื่นถ่ายโอนพลังงาน แต่อนุภาคน้ำแค่สั่นขึ้น-ลง ไม่เคลื่อนที่ตามคลื่น' },
          { v:'R4', l:'ลูกมะพร้าวถูกพาไปตอนแรก แต่พอพลังงานคลื่นลดลงก็หยุด' },
          { v:'R0', l:'อื่น ๆ (พิมพ์ด้านล่าง)' }
        ],
        reasonPlaceholder: 'ถ้าเลือก "อื่น ๆ" หรือต้องการอธิบายเพิ่มเติม พิมพ์ที่นี่...'
      },
      observe: {
        scenarios: [
          {
            title:       '🔵 รอบ 1 · Slinky + ริบบิ้น',
            instruction: 'สิ่งที่สังเกตได้เมื่อส่งคลื่นผ่าน Slinky (ริบบิ้นเคลื่อนที่อย่างไร?):',
            placeholder: 'ริบบิ้นที่ผูกไว้...'
          },
          {
            title:       '🟢 รอบ 2 · Simulation wave-types.html',
            instruction: 'สิ่งที่สังเกตได้จาก Simulation (อนุภาคสีแดง/น้ำเงินเคลื่อนที่อย่างไร?):',
            placeholder: 'อนุภาคใน simulation...'
          }
        ],
        summaryFields: [
          { id:'vib_dir',  label:'ทิศการสั่นของริบบิ้น/อนุภาค', placeholder:'เช่น ขึ้น-ลง / ซ้าย-ขวา' },
          { id:'wave_dir', label:'ทิศการเคลื่อนที่ของคลื่น',    placeholder:'เช่น ไปทางขวา' }
        ],
        finalQuestion: {
          label:   'ริบบิ้น/อนุภาคถูกพาไปกับคลื่นหรือไม่?',
          options: [
            { v:'yes',    l:'ถูกพาไป' },
            { v:'no',     l:'ไม่ถูกพาไป (สั่นอยู่กับที่)' },
            { v:'unsure', l:'ไม่แน่ใจ' }
          ]
        }
      },
      explain: {
        compareQuestion: 'เปรียบเทียบ P กับ O: คำทำนายกับผลสังเกตตรงกันหรือไม่?',
        compareOptions:  [
          { v:'match',   l:'ตรงกัน' },
          { v:'partial', l:'ตรงบางส่วน' },
          { v:'diff',    l:'ไม่ตรง' }
        ],
        matchPlaceholder: 'อธิบายว่าข้อใดตรง ข้อใดต่าง เพราะอะไร...',
        checklistHeader:  'จากผลการสังเกต ข้อใดถูกต้อง? (ติ๊กทุกข้อที่ตรงกับหลักฐาน)',
        checklistItems: [
          'อนุภาคตัวกลาง (น้ำ/Slinky) สั่นอยู่กับที่ <u>ไม่</u>ถูกพาไปกับคลื่น',
          'คลื่นถ่ายโอน "พลังงาน" ไม่ใช่ถ่ายโอน "สสาร/วัตถุ"',
          'คลื่นตามขวาง: อนุภาคสั่นตั้งฉากกับทิศคลื่น (เช่น คลื่นในเชือก คลื่นน้ำ)',
          'คลื่นตามยาว: อนุภาคสั่นในทิศเดียวกับทิศคลื่น (เช่น เสียง Slinky ผลัก-ดึง)',
          'เสียงเป็นคลื่นตามยาว ไม่ใช่คลื่นตามขวาง'
        ],
        principleLabel:       'สรุปหลักการด้วยภาษาของนักเรียนเอง: (อนุภาคเคลื่อนที่อย่างไร? พลังงานเดินทางอย่างไร?)',
        principlePlaceholder: 'คลื่นคือ... อนุภาคตัวกลาง... พลังงาน...'
      },
      misconception: 'M1.1 (อนุภาคเคลื่อนที่ไปกับคลื่น) · M1.2 (เสียงเป็นคลื่นตามขวาง)',
      sheetPrefix:   'POE_P'
    },
    matrix: {
      title:       'ใบกิจกรรม 1.1 · Matrix Table',
      description: 'เปรียบเทียบคลื่นตามขวาง vs คลื่นตามยาว 6 ประเด็น',
      viewFile:    'สื่อ03_MatrixTable_ใบกิจกรรม1.1.html',
      submitLabel: '📤 ส่งใบกิจกรรม 1.1',
      sheetPrefix: 'Matrix_P',
      allowUpload: true
    },
    spot: {
      title:       'ใบกิจกรรม 1.2 · Spot the Error',
      description: 'หาข้อผิดพลาดในข้อความ 4 ข้อ แล้วเขียนคำอธิบายที่ถูกต้อง',
      viewFile:    'สื่อ04_SpotTheError_ใบกิจกรรม1.2.html',
      submitLabel: '📤 ส่งใบกิจกรรม 1.2',
      sheetPrefix: 'Spot_P',
      allowUpload: true
    }
  },

  // ───────── แผน 2 · ความเร็วคลื่น v = fλ = √(T/μ) ─────────
  2: {
    poe: {
      title:       'POE-02 · ใบบันทึก Predict–Observe–Explain (แผน 2)',
      viewFile:    'สื่อ02_POE-01_ใบบันทึกPOE.html',
      submitLabel: '📤 ส่ง POE-02',
      sheetPrefix: 'POE_P',
      misconception: 'M2.1 · M2.2 · M2.3 · M2.4',
      allowUpload: true,
      hero: {
        question: 'เชือกเส้นเดิม · ดึงตึงเท่าเดิม · ถ้าสะบัดแรงขึ้น / ถี่ขึ้น / ดึงตึงขึ้น · v คลื่นเปลี่ยนไปอย่างไร?',
        context:  'คู่กับ Lab 38 Wave Speed on a String · 3 ฐานทดลอง'
      }
    },
    calc: {
      title:       'ใบกิจกรรม 2.1 · โจทย์คำนวณ v=fλ',
      description: 'โจทย์คำนวณ v = fλ = √(T/μ) · 5 ข้อ ไล่ระดับ · แสดง "กำหนด ต้องหา สมการ การคำนวณ คำตอบ"',
      viewFile:    'สื่อ03_โจทย์คำนวณ_ใบกิจกรรม2.1.html',
      submitLabel: '📤 ส่งใบกิจกรรม 2.1',
      sheetPrefix: 'Calc_P',
      allowUpload: true
    },
    spot: {
      title:       'ใบกิจกรรม 2.2 · Spot the Error',
      description: 'หาข้อผิดพลาดในข้อความ/การคำนวณ 3 ข้อ · เป้าหมาย: M2.1, M2.2, M2.4',
      viewFile:    'สื่อ04_SpotTheError_ใบกิจกรรม2.2.html',
      submitLabel: '📤 ส่งใบกิจกรรม 2.2',
      sheetPrefix: 'Spot_P',
      allowUpload: true
    }
  },

  // ───────── แผน 3 · คลื่นดล คลื่นต่อเนื่อง และเฟส ─────────
  3: {
    // POE-03 · Concept Cartoon "ริบบิ้น 2 เส้นบนเชือก" + 3 ฐาน
    poe: {
      title:       'POE-03 · ใบบันทึก Predict–Observe–Explain (แผน 3)',
      submitLabel: '📤 ส่ง POE-03',
      sheetPrefix: 'POE_P',
      misconception: 'M3.1 · M3.3 · M3.4',
      allowUpload: true,
      hero: {
        question: 'ริบบิ้นแดง (R) กับน้ำเงิน (B) ห่างกัน λ/2 บนเชือกที่สั่นต่อเนื่อง · จะสั่นพร้อมกันหรือสวนทางกัน? · และคลื่นดลกับคลื่นต่อเนื่องในเชือกเดียวกัน v ต่างกันไหม?',
        context:  'คู่กับ Concept Cartoon "ริบบิ้น 2 เส้นบนเชือก" + 3 ฐาน (Slinky · Strobe · Sim phase-compare)'
      },
      predict: {
        question: 'ฉันคิดว่าริบบิ้น R กับ B (ห่างกัน λ/2) จะ:',
        options: [
          { v:'together', l:'สั่นพร้อมกัน (ขึ้น-ลงเหมือนกัน)' },
          { v:'opposite', l:'สวนทางกัน (R ขึ้น–B ลง พร้อมกัน)' },
          { v:'unrelated',l:'ขยับไม่สัมพันธ์กัน' }
        ],
        reasonHeader: 'เหตุผลที่คิดเช่นนั้น: (เลือกข้อที่ตรงกับความคิดมากที่สุด)',
        reasonOptions: [
          { v:'R1', l:'อยู่บนเชือกเดียวกันเลยต้องสั่นพร้อมกัน' },
          { v:'R2', l:'คลื่นวิ่งไปถึง B ช้ากว่า R เลยขยับช้ากว่า (misconception M3.2)' },
          { v:'R3', l:'ระยะ λ/2 = ครึ่งลูกคลื่น → สวนทางกัน' },
          { v:'R4', l:'แต่ละจุดสั่นเป็นอิสระ ไม่เกี่ยวข้องกัน' },
          { v:'R0', l:'อื่น ๆ (พิมพ์ด้านล่าง)' }
        ],
        reasonPlaceholder: 'ถ้าเลือก "อื่น ๆ" หรือต้องการอธิบายเพิ่มเติม...'
      },
      observe: {
        scenarios: [
          { title:'🌀 ฐาน 1 · Slinky Pulse vs Continuous', instruction:'วัด v ทั้ง 2 แบบ · เปรียบเทียบ', placeholder:'ดล v = ... · ต่อเนื่อง v = ...' },
          { title:'💡 ฐาน 2 · Ribbon + Strobe',         instruction:'ริบบิ้นห่าง λ/4, λ/2, λ สั่นสัมพันธ์กับต้นอย่างไร', placeholder:'λ/4: ... · λ/2: ... · λ: ...' },
          { title:'💻 ฐาน 3 · phase-compare Sim',         instruction:'เลื่อน Δx อ่าน Δφ · ลองซ้อน 2 คลื่น 180°', placeholder:'Δx = λ/2 → Δφ = ...° · ซ้อน 180° → A รวม = ...' }
        ],
        summaryFields: [
          { id:'v_compare',  label:'เปรียบเทียบ v ของดล/ต่อเนื่อง',    placeholder:'เช่น เท่ากัน / ต่างกัน ≈ ... %' },
          { id:'phase_rule', label:'ข้อสรุป: Δx → Δφ',                 placeholder:'เช่น Δφ = 2π(Δx/λ)' }
        ],
        finalQuestion: {
          label: 'ริบบิ้น R กับ B (ห่าง λ/2) ในห้องทดลองสั่นแบบใด?',
          options: [
            { v:'together', l:'พร้อมกัน' },
            { v:'opposite', l:'สวนทางกัน' },
            { v:'unsure',   l:'ยังไม่ชัดเจน' }
          ]
        }
      },
      explain: {
        compareQuestion: 'เปรียบเทียบ P กับ O: คำทำนายกับผลสังเกตตรงกันหรือไม่?',
        compareOptions:  [
          { v:'match',   l:'ตรงกัน' },
          { v:'partial', l:'ตรงบางส่วน' },
          { v:'diff',    l:'ไม่ตรง' }
        ],
        matchPlaceholder: 'อธิบายว่าข้อใดตรง ข้อใดต่าง เพราะอะไร...',
        checklistHeader:  'จากผลการสังเกต ข้อใดถูกต้อง? (ติ๊กทุกข้อที่ตรงกับหลักฐาน)',
        checklistItems: [
          'คลื่นดลและคลื่นต่อเนื่องในเชือกเดียวกันมี v <u>เท่ากัน</u> เพราะขึ้นกับตัวกลาง',
          'จุด 2 จุดบน "คลื่นต่อเนื่อง" ที่ห่างกัน λ/2 จะสั่น<u>สวนทางกัน</u>',
          'จุด 2 จุดที่ห่างกัน λ (ครบ 1 ลูกคลื่น) จะสั่น<u>พร้อมกัน</u>เสมอ',
          'เฟสเป็น<u>สถานะการสั่น</u>ของจุด ณ เวลานั้น (ไม่ใช่แค่มุมคณิต)',
          'คลื่น 2 ขบวน เฟสตรงข้าม 180° + A เท่ากัน → ซ้อนทับแล้ว<u>หักล้าง</u>'
        ],
        principleLabel:       'สรุปหลักการด้วยภาษาของนักเรียนเอง: (เฟสคืออะไร? · หาอย่างไร? · 180° หมายถึงอะไร?)',
        principlePlaceholder: 'เฟสคือ... · Δφ = ... · ต่างเฟส 180° หมายถึง...'
      },
      misconception: 'M3.1 · M3.2 · M3.3 · M3.4',
      sheetPrefix:   'POE_P'
    },
    // ใบ 3.1 · Calc Phase
    calc: {
      title:       'ใบกิจกรรม 3.1 · Calc Phase (Δφ)',
      description: 'โจทย์ 5 ข้อ ไล่ระดับ · Δφ = 2π(Δx/λ)',
      viewFile:    'สื่อ04_Calc_ใบกิจกรรม3.1.html',
      submitLabel: '📤 ส่งใบกิจกรรม 3.1',
      sheetPrefix: 'Calc_P',
      allowUpload: true
    },
    // ใบ 3.2 · Spot the Error
    spot: {
      title:       'ใบกิจกรรม 3.2 · Spot the Error',
      description: 'หาข้อผิดพลาด 3 ข้อความจากเพื่อน · เป้าหมาย M3.2 + M3.3 + M3.4',
      viewFile:    'สื่อ05_Spot_ใบกิจกรรม3.2.html',
      submitLabel: '📤 ส่งใบกิจกรรม 3.2',
      sheetPrefix: 'Spot_P',
      allowUpload: true
    },
    // CER Board (Phase 7) · ใช้ใน E3 Explain · คำตอบอ้างอิงจาก POE-03
    cer: {
      id: 'cer',
      title: 'CER Board · Phase E3',
      description: 'ใช้ข้อมูลจากใบ POE-03 (3 ฐาน) · เลือกคอลัมน์ · ตอบคำถามนำตามคอลัมน์ + แนบรูป/วาด',
      columns: [
        { id:'v',     label:'⚡ v เท่ากัน · ฐาน 1', color:'#ef6c00',
          prompts: {
            claim:     '👉 v ของคลื่นดล เทียบกับคลื่นต่อเนื่องในเชือกเดียวกัน เป็นอย่างไร?',
            evidence:  '👉 จากฐาน 1: v(ดล) = ____ m/s · v(ต่อเนื่อง) = ____ m/s · ต่างกัน ____ %',
            reasoning: '👉 v ขึ้นกับอะไร? (โยงกับสูตร v = √(T/μ) จากแผน 2)'
          } },
        { id:'phase', label:'✅ เฟสตรงกัน · ฐาน 2/3', color:'#2e7d32',
          prompts: {
            claim:     '👉 จุด 2 จุดห่างกันเท่าไร (ในเทอม λ) ถึงสั่นพร้อมกัน?',
            evidence:  '👉 ฐาน 2: ริบบิ้นที่ Δx = ____ สั่นพร้อมต้น · ฐาน 3: Δx = λ → Δφ = ____°',
            reasoning: '👉 ทำไม Δx = nλ ถึงทำให้เฟสตรงกัน?'
          } },
        { id:'anti',  label:'🔄 เฟสตรงข้าม · ฐาน 2/3', color:'#c62828',
          prompts: {
            claim:     '👉 คลื่น/จุด 2 ตัวที่ต่างเฟส 180° ให้ผลอะไร?',
            evidence:  '👉 ฐาน 2: ริบบิ้นที่ Δx = λ/2 สั่น____ · ฐาน 3: ซ้อน 180° → Amax รวม = ____',
            reasoning: '👉 ยอด+ท้อง = ? · โยงสู่การแทรกสอด (แผน 7) ได้ไง?'
          } }
      ],
      prompts: {
        claim:     'ข้อค้นพบสั้น ๆ...',
        evidence:  'ข้อมูลที่วัดได้จากฐาน...',
        reasoning: 'เหตุผลที่เชื่อมหลักฐานกับข้อสรุป...'
      },
      allowImage: true,
      sheetPrefix: 'CER_P'
    }
  },

  // ───────── แผน 4 · การซ้อนทับ + ฮอยเกนส์ ─────────
  4: {
    // POE-04 · Concept Cartoon "สงครามริ้วคลื่น" + 3 ฐาน (Slinky Live + Sim Superposition + Huygens Explorer)
    poe: {
      title:       'POE-04 · ใบบันทึก Predict–Observe–Explain (แผน 4)',
      submitLabel: '📤 ส่ง POE-04',
      sheetPrefix: 'POE_P',
      misconception: 'M4.1 · M4.2 · M4.3 · M4.4',
      allowUpload: true,
      hero: {
        question: 'pulse 2 ลูกเคลื่อนที่สวนทางในเชือก · ขณะพบกันจะเกิดอะไรขึ้น? · หลังพ้นกัน คลื่นแต่ละลูกยังคงรูปเดิมหรือเปลี่ยนไปตลอดกาล?',
        context:  'คู่กับ Concept Cartoon "สงครามริ้วคลื่น" (3 ตัวละคร) + 3 ฐาน (Slinky Live · pulse-superposition · huygens-wavefront)'
      },
      predict: {
        question: 'ฉันคิดว่า pulse 2 ลูก (A, B · A เท่ากัน · ยอดทั้งคู่) ชนกันแล้ว:',
        options: [
          { v:'sum2a',    l:'ขณะพบ: รวมเป็นยอดสูง 2A · หลังพ้น: แยกคืนรูปเดิม' },
          { v:'mergeforever', l:'รวมกันเป็นลูกเดียวตลอดกาล (ยอด 2A ไม่แยกอีก)' },
          { v:'winlose',  l:'ลูกใหญ่กลืนลูกเล็ก · ลูกเล็กหายไปถาวร' },
          { v:'destroy',  l:'ยอด+ท้องแล้วคลื่นหายถาวร ไม่มีคลื่นหลังพ้นกัน' }
        ],
        reasonHeader: 'เหตุผลที่คิดเช่นนั้น: (เลือกข้อที่ตรงกับความคิดมากที่สุด)',
        reasonOptions: [
          { v:'R1', l:'หลักการซ้อนทับ y = y₁ + y₂ · บวกเชิงพีชคณิตชั่วขณะ · คลื่นยังเป็นอิสระต่อกัน (แก้ M4.1, M4.3)' },
          { v:'R2', l:'พลังงานคลื่น 2 ลูกรวมกันถาวร ไม่สามารถแยกได้อีก' },
          { v:'R3', l:'คลื่นใหญ่กว่ามีพลังงานมากกว่าจึงชนะ (misconception M4.3)' },
          { v:'R4', l:'การหักล้างทำให้คลื่นหายไป ไม่กลับมาอีก (misconception M4.2)' },
          { v:'R0', l:'อื่น ๆ (พิมพ์ด้านล่าง)' }
        ],
        reasonPlaceholder: 'ถ้าเลือก "อื่น ๆ" หรือต้องการอธิบายเพิ่มเติม...'
      },
      observe: {
        scenarios: [
          { title:'🌀 ฐาน 1 · Slinky Live (Pulse Collision)', instruction:'2 นักเรียนสะบัด pulse สวนทาง · สังเกตก่อน–ขณะ–หลัง', placeholder:'ก่อน: ... · ขณะพบ: ... · หลังพ้น: ... · pulse คืนรูปเดิมหรือไม่?' },
          { title:'💻 ฐาน 2 · Sim pulse-superposition', instruction:'3 กรณี: ยอด+ยอด / ยอด+ท้อง / A ต่าง · อ่าน A รวมขณะพบ + หลังพ้น', placeholder:'ยอด+ยอด: A รวม = ... · ยอด+ท้อง: A รวม = ... · A ต่าง (5+2): A รวม = ...' },
          { title:'🌐 ฐาน 3 · Sim huygens-wavefront', instruction:'คลิกจุดบนหน้าคลื่น → wavelet → envelope · ทดสอบ 3 รูปแบบ', placeholder:'ระนาบ: ... · วงกลม: ... · ผ่านช่องแคบ: ... · ใช้กับคลื่นชนิดใดบ้าง?' }
        ],
        summaryFields: [
          { id:'sum_law',  label:'ข้อสรุป: ขณะพบกัน A รวม =',            placeholder:'เช่น y₁ + y₂ (บวกเชิงพีชคณิต)' },
          { id:'after',    label:'ข้อสรุป: หลังคลื่นผ่านกัน',               placeholder:'เช่น คืนรูปเดิมทั้งคู่ / เปลี่ยนรูป' },
          { id:'huygens',  label:'ข้อสรุป: Huygens ใช้กับคลื่นชนิดใด',    placeholder:'เช่น ทุกชนิด (น้ำ, เสียง, แสง, แผ่นดินไหว)' }
        ],
        finalQuestion: {
          label: 'หลังคลื่น 2 ลูก (A เท่า, ยอดทั้งคู่) ผ่านกันแล้ว · รูปร่างของคลื่นแต่ละลูกเป็นอย่างไร?',
          options: [
            { v:'restore',   l:'กลับคืนรูปเดิมทั้งคู่' },
            { v:'merged',    l:'รวมเป็นลูกเดียว' },
            { v:'destroyed', l:'หายไปถาวร' }
          ]
        }
      },
      explain: {
        compareQuestion: 'เปรียบเทียบ P กับ O: คำทำนายกับผลสังเกตตรงกันหรือไม่?',
        compareOptions:  [
          { v:'match',   l:'ตรงกัน' },
          { v:'partial', l:'ตรงบางส่วน' },
          { v:'diff',    l:'ไม่ตรง' }
        ],
        matchPlaceholder: 'อธิบายว่าข้อใดตรง ข้อใดต่าง เพราะอะไร...',
        checklistHeader:  'จากผลการสังเกต ข้อใดถูกต้อง? (ติ๊กทุกข้อที่ตรงกับหลักฐาน)',
        checklistItems: [
          'การกระจัด ณ จุดเดียวกัน = <u>ผลบวกเชิงพีชคณิต</u> ของ y₁ กับ y₂ (หลักซ้อนทับ)',
          'ยอด + ยอด → เสริมกัน A รวม = <u>A₁ + A₂</u> (ใหญ่ขึ้นชั่วขณะ)',
          'ยอด + ท้อง (A เท่า) → หักล้าง A รวม = <u>0</u> ขณะพบ แต่คลื่นไม่หายถาวร (แก้ M4.2)',
          'หลังคลื่นผ่านกัน แต่ละลูก<u>คงรูปเดิม</u> ไม่มีใคร "กลืน" ใคร (แก้ M4.1, M4.3)',
          'ทุกจุดบนหน้าคลื่น = แหล่งกำเนิด wavelet วงกลม · envelope = หน้าคลื่นใหม่ (Huygens)',
          'หลักฮอยเกนส์ใช้ได้กับ<u>คลื่นทุกชนิด</u> — น้ำ เสียง แสง (แก้ M4.4)'
        ],
        principleLabel:       'สรุปหลักการด้วยภาษาของนักเรียนเอง: (หลักซ้อนทับคือ? · หักล้างชั่วขณะ = อะไร? · Huygens ทำงานอย่างไร?)',
        principlePlaceholder: 'หลักซ้อนทับคือ... · หักล้างชั่วขณะหมายถึง... · Huygens บอกว่า...'
      },
      misconception: 'M4.1 · M4.2 · M4.3 · M4.4',
      sheetPrefix:   'POE_P'
    },
    // ใบ 4.1 · Calc Superposition · embed mode (แสดงไฟล์ HTML เต็ม · รับเฉพาะแนบไฟล์)
    calc: {
      title:       'ใบกิจกรรม 4.1 · Calc Superposition',
      description: 'โจทย์ 4 ข้อ · วาดกราฟ + time evolution + Huygens · ทำในกระดาษ ถ่ายรูปแนบส่ง',
      viewFile:    'สื่อ04_Calc_ใบกิจกรรม4.1.html',  // embed iframe แทน form พิมพ์
      submitLabel: '📤 ส่งใบกิจกรรม 4.1',
      sheetPrefix: 'Calc_P',
      allowUpload: true
    },
    // ใบ 4.2 · Spot the Error
    spot: {
      title:       'ใบกิจกรรม 4.2 · Spot the Error',
      description: 'หาข้อผิดพลาด 3 สถานการณ์ · ระบุจุดผิด + Misconception + อธิบายที่ถูก · เป้าหมาย M4.1–M4.4',
      viewFile:    'สื่อ05_Spot_ใบกิจกรรม4.2.html',
      submitLabel: '📤 ส่งใบกิจกรรม 4.2',
      sheetPrefix: 'Spot_P',
      allowUpload: true
    },
    // CER Board · E3 Explain · คำตอบอ้างอิงจาก POE-04
    cer: {
      id: 'cer',
      title: 'CER Board · Phase E3',
      description: 'ใช้ข้อมูลจากใบ POE-04 (3 ฐาน) · เลือกคอลัมน์ตามผลการซ้อนทับ + แนบรูป/วาด',
      columns: [
        { id:'constructive', label:'➕ เสริม (A+A) · ยอด+ยอด', color:'#dd6b20',
          prompts: {
            claim:     '👉 เมื่อ pulse ยอด 2 ลูกพบกัน A รวมเป็นเท่าใด · หลังพ้นกันเกิดอะไร?',
            evidence:  '👉 ฐาน 1: slinky · ฐาน 2 Sim: ยอด+ยอด (A₁=3, A₂=3) → A รวม = ____ · หลังพ้น A แต่ละลูก = ____',
            reasoning: '👉 อธิบายด้วย y = y₁ + y₂ · ทำไมคลื่นจึงคืนรูปเดิมได้?'
          } },
        { id:'destructive',  label:'➖ หักล้าง (A−A) · ยอด+ท้อง', color:'#e53e3e',
          prompts: {
            claim:     '👉 เมื่อยอดพบท้อง (A เท่ากัน) ขณะพบเชือกเป็นอย่างไร · หายถาวรหรือชั่วขณะ?',
            evidence:  '👉 ฐาน 2 Sim: A₁=+3, A₂=−3 → A รวม ขณะพบ = ____ · หลังพ้น A แต่ละลูก = ____',
            reasoning: '👉 พลังงานขณะเชือกแบนอยู่ที่ไหน? (PE vs KE ของอนุภาค) · แก้ M4.2 อย่างไร?'
          } },
        { id:'unequal',      label:'⚖️ A ต่างกัน', color:'#b7791f',
          prompts: {
            claim:     '👉 ลูกใหญ่ "กลืน" ลูกเล็กจริงหรือไม่? · หลังพ้นกันคลื่นแต่ละลูกเป็นอย่างไร?',
            evidence:  '👉 ฐาน 2 Sim: A₁=+5, A₂=+2 → A รวม = ____ · หลังพ้น A₁ = ____ · A₂ = ____',
            reasoning: '👉 เพราะอะไรคลื่นทั้งสองจึงคงสภาพผ่านกัน? · โยงกับหลักซ้อนทับเชิงเส้นอย่างไร?'
          } }
      ],
      prompts: {
        claim:     'ข้อค้นพบสั้น ๆ...',
        evidence:  'ข้อมูลที่วัดได้จากฐาน...',
        reasoning: 'เหตุผลที่เชื่อมหลักฐานกับข้อสรุป...'
      },
      allowImage: true,
      sheetPrefix: 'CER_P'
    }
  },

  // ───────── แผน 5 · การสะท้อนของคลื่น ─────────
  5: {
    // POE-05 · Interactive form · 3 ฐาน (Slinky + Lab 38 + Lab 32)
    poe: {
      hero: {
        question: 'pulse ยอดขึ้นบนเส้นเชือกวิ่งชนปลายตรึง vs ปลายอิสระ · คลื่นสะท้อนกลับมาเหมือนเดิมหรือเปลี่ยนไปอย่างไร?',
        context:  'คู่กับ POE-05 Interactive (palette ลากวางรูปคลื่น + canvas วาด) · 3 ฐาน (Slinky Live · Lab 38 wave-speed-on-string · Lab 32 wave-reflection)'
      },
      viewFile:    'สื่อ02_POE-05_ใบบันทึกPOE.html',
      submitLabel: '📤 ส่ง POE-05',
      sheetPrefix: 'POE_P',
      misconception: 'M5.1 · M5.2 · M5.3',
      allowUpload: true
    },
    // ใบ 5.1 · Calc Reflection · scene-stack overlay + lined canvas
    calc: {
      title:       'ใบกิจกรรม 5.1 · Calc Reflection',
      description: '4 ข้อไล่ระดับ · (1) วาดหน้าคลื่นสะท้อนผิวราบ θ=40° (2) คำนวณ v ก่อน/หลังสะท้อน (3) วาดหน้าคลื่นสะท้อนผิวโค้งเว้า → ค้นพบจุดโฟกัส (4) Echolocation ค้างคาว · ใช้ canvas + textarea ในทุกข้อ',
      viewFile:    'สื่อ03_Calc_ใบกิจกรรม5.1.html',
      submitLabel: '📤 ส่งใบกิจกรรม 5.1',
      sheetPrefix: 'Calc_P',
      allowUpload: true
    },
    // ใบ 5.2 · Spot the Error · claim-overlay + canvas อธิบาย
    spot: {
      title:       'ใบกิจกรรม 5.2 · Spot the Error',
      description: '3 สถานการณ์ · วงกลม/ขีดทับจุดผิดบนข้อความ + canvas อธิบายที่ถูก · ชน M5.1 · M5.2 · M5.3',
      viewFile:    'สื่อ04_Spot_ใบกิจกรรม5.2.html',
      items: [
        { misc:'M5.1', stmt:'น้องมิ้นท์: "คลื่นสะท้อนจากปลายตรึงจะกลับมาหน้าตาเดิม เพราะกำแพงแค่เปลี่ยนทิศทาง ไม่ได้เปลี่ยนรูปร่างคลื่น — pulse ยอดขึ้นก็จะกลับมาเป็นยอดขึ้นเหมือนเดิม"' },
        { misc:'M5.2', stmt:'พี่โอม: "คลื่นน้ำวิ่งด้วย v = 30 cm/s · หลังสะท้อนจากผนัง คลื่นต้องช้าลงเพราะเสียพลังงานให้ผนัง · ดังนั้น v สะท้อน < 30 cm/s อย่างแน่นอน · ถ้าชนแรง ๆ ก็ยิ่งช้า"' },
        { misc:'M5.3', stmt:'น้องต้น: "A\' ต้องเท่ากับ A เสมอ เพราะกฎการสะท้อน θᵢ = θᵣ บอกว่าทุกอย่างเหมือนเดิม รวมถึง amplitude ด้วย"' }
      ],
      submitLabel: '📤 ส่งใบกิจกรรม 5.2',
      sheetPrefix: 'Spot_P'
    },
    // CER Board · E3 Explain · 3 คอลัมน์ (ปลายตรึง / ปลายอิสระ / ผิวโค้งเว้า)
    cer: {
      id: 'cer',
      title: 'CER Board · Phase E3',
      description: 'ใช้ข้อมูลจาก POE-05 ทั้ง 3 ฐาน · ทุกกลุ่มส่ง CER พร้อมกัน · ครูฉายบนจอเพื่อเปรียบเทียบ',
      columns: [
        { id:'fixed_end', label:'🔒 ปลายตรึง · พลิกเฟส', color:'#0d9488',
          prompts: {
            claim:     '👉 คลื่นสะท้อนจากปลายตรึงมีรูปร่างอย่างไรเทียบคลื่นตกกระทบ?',
            evidence:  '👉 ฐาน 1 Slinky: ________ · ฐาน 2 Lab 38 ปลายตรึง: pulse ยอดขึ้น → สะท้อน = ________',
            reasoning: '👉 ทำไมปลายตรึงจึงพลิกเฟส 180° (อ้าง Newton 3rd · แรงกดย้อนกลับ)?'
          } },
        { id:'free_end', label:'🔓 ปลายอิสระ · ไม่พลิกเฟส', color:'#14b8a6',
          prompts: {
            claim:     '👉 คลื่นสะท้อนจากปลายอิสระต่างจากปลายตรึงอย่างไร?',
            evidence:  '👉 ฐาน 1 Slinky: ________ · ฐาน 2 Lab 38 ปลายอิสระ: pulse ยอดขึ้น → สะท้อน = ________',
            reasoning: '👉 ปลายอิสระขยับได้ไม่มีแรงกดย้อนกลับ · เฟสจึงคงเดิม · เทียบกับปลายตรึงอย่างไร?'
          } },
        { id:'angle_reflection', label:'📐 ผิวราบ · θᵢ = θᵣ', color:'#0c4a40',
          prompts: {
            claim:     '👉 ความสัมพันธ์ระหว่างมุมตกกระทบกับมุมสะท้อนคืออะไร · v เปลี่ยนหรือไม่?',
            evidence:  '👉 ฐาน 3 Lab 32: θᵢ₁=___ θᵣ₁=___ · θᵢ₂=___ θᵣ₂=___ · θᵢ₃=___ θᵣ₃=___',
            reasoning: '👉 ทำไม θᵣ = θᵢ เสมอ (เส้นปกติ + สมมาตร) · ทำไม v ไม่เปลี่ยน (ตัวกลางเดิม)?'
          } }
      ],
      prompts: {
        claim:     'ข้อค้นพบสั้น ๆ...',
        evidence:  'ข้อมูลที่วัดได้จากฐาน...',
        reasoning: 'เหตุผลที่เชื่อมหลักฐานกับข้อสรุป...'
      },
      allowImage: true,
      sheetPrefix: 'CER_P'
    }
  }
};
