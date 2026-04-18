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
      viewFile:    'สื่อ02_POE-01_ใบบันทึกPOE.html',
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
      viewFile:    'สื่อ02_POE-03_ใบบันทึกPOE.html',
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
      viewFile:    'สื่อ02_POE-04_ใบบันทึกPOE.html',
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
      title:       'POE-05 · ใบบันทึก Predict–Observe–Explain (แผน 5)',
      description: 'Interactive: palette ลากวางรูปคลื่น + canvas วาด · 3 ฐาน (Slinky · Lab 38 · Lab 32)',
      viewFile:    'สื่อ02_POE-05_ใบบันทึกPOE.html',
      submitLabel: '📤 ส่ง POE-05',
      sheetPrefix: 'POE_P',
      misconception: 'M5.1 · M5.2 · M5.3',
      allowUpload: true,
      hero: {
        question: 'pulse ยอดขึ้นบนเส้นเชือกวิ่งชนปลายตรึง vs ปลายอิสระ · คลื่นสะท้อนกลับมาเหมือนเดิมหรือเปลี่ยนไปอย่างไร?',
        context:  'คู่กับ POE-05 Interactive (palette ลากวางรูปคลื่น + canvas วาด) · 3 ฐาน (Slinky Live · Lab 38 wave-speed-on-string · Lab 32 wave-reflection)'
      }
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
  },

  // ───────── แผน 6 · การหักเหของคลื่น ─────────
  6: {
    // POE-06 · Interactive form · 2 ฐาน (Lab 30 Coiled Spring + Lab 33 Ripple Tank)
    poe: {
      title:       'POE-06 · ใบบันทึก Predict–Observe–Explain (แผน 6)',
      description: 'Interactive: palette เลือกความยาวคลื่น + canvas วาดหน้าคลื่น/ทิศการเคลื่อนที่ · 2 ฐาน (Lab 30 · Lab 33)',
      viewFile:    'สื่อ02_POE-06_ใบบันทึกPOE.html',
      submitLabel: '📤 ส่ง POE-06',
      sheetPrefix: 'POE_P',
      misconception: 'M6.1 · M6.2 · M6.3',
      allowUpload: true,
      hero: {
        question: 'คลื่นผิวน้ำเดินทางจากน้ำลึก → น้ำตื้น · f เปลี่ยนหรือไม่? · v และ λ เปลี่ยนอย่างไร? · ทิศการเคลื่อนที่หักเหเข้าหาหรือออกจากเส้นปกติ?',
        context:  'คู่กับ Concept Cartoon "ปลาในน้ำ" (3 ตัวละคร) · 2 ฐาน (Lab 30 Coiled Spring · Lab 33 Ripple Tank Refraction)'
      }
    },
    // ใบ 6.1 · Calc Refraction · scene-stack overlay + lined canvas + graph
    calc: {
      title:       'ใบกิจกรรม 6.1 · Calc Refraction',
      description: '4 ข้อไล่ระดับ · (1) วาดหน้าคลื่น + ทิศการเคลื่อนที่ในน้ำตื้น θ₁=40° · scene-stack overlay (2) คำนวณ v, λ, f แก้ M6.1 (3) สร้างกราฟ v–√h ยืนยันน้ำลึก v มาก/ตื้น v น้อย (4) เชือก 2 เส้น μ₂=4μ₁ แก้ M6.3 · ใช้ worksheet-core.js',
      viewFile:    'สื่อ03_Calc_ใบกิจกรรม6.1.html',
      submitLabel: '📤 ส่งใบกิจกรรม 6.1',
      sheetPrefix: 'Calc_P',
      allowUpload: true
    },
    // ใบ 6.2 · Spot the Error · claim-overlay + canvas อธิบาย
    spot: {
      title:       'ใบกิจกรรม 6.2 · Spot the Error',
      description: '3 สถานการณ์ · วงกลม/ขีดทับจุดผิดบนข้อความ + canvas อธิบายที่ถูก · ชน M6.1 · M6.2 · M6.3',
      viewFile:    'สื่อ04_Spot_ใบกิจกรรม6.2.html',
      items: [
        { misc:'M6.1', stmt:'น้องปาล์ม: "หน้าคลื่นในน้ำตื้นถี่กว่าน้ำลึก · แปลว่าความถี่เพิ่มขึ้น · f_S = 60/4 = 15 Hz · การหักเหทำให้ความถี่เพิ่มจาก 10 → 15 Hz"' },
        { misc:'M6.2', stmt:'พี่ภูมิ: "พอพัลส์ข้ามจากเชือกบางไปเชือกหนา · มันเจอแรงต้านเพิ่ม ทำให้การสั่นตามขวางกลายเป็นการสั่นตามยาว · อนุภาคเชือก 2 จึงสั่นในแนวเดียวกับการเคลื่อนที่ของคลื่น · การหักเหทำให้คลื่นเปลี่ยนชนิด"' },
        { misc:'M6.3', stmt:'น้องโอ๊ต: "ในเชือกหนา v ช้าลงจาก 44.7 → 22.4 m/s (ครึ่งหนึ่ง) · ดังนั้นความถี่ในเชือก 2 ต้องน้อยลงครึ่งหนึ่งด้วย = 2.5 Hz · เพราะเชือกหนาสั่นไหวได้ช้ากว่า"' }
      ],
      submitLabel: '📤 ส่งใบกิจกรรม 6.2',
      sheetPrefix: 'Spot_P'
    },
    // CER Board · E3 Explain · 3 คอลัมน์ (f คงที่ / v เปลี่ยนตามตัวกลาง / ทิศการเคลื่อนที่หักเห)
    cer: {
      id: 'cer',
      title: 'CER Board · Phase E3',
      description: 'ใช้ข้อมูลจาก POE-06 ทั้ง 2 ฐาน (Lab 30 + Lab 33) · ทุกกลยุ่มส่ง CER พร้อมกัน · ครูฉายบนจอเพื่อเปรียบเทียบ',
      columns: [
        { id:'freq_constant', label:'🔁 f คงที่ · แก้ M6.1/M6.3', color:'#0891b2',
          prompts: {
            claim:     '👉 ความถี่ของคลื่นในตัวกลาง 2 เขตเป็นอย่างไรเทียบกัน?',
            evidence:  '👉 ฐาน 1 Lab 30: เชือก 1 f = ____ · เชือก 2 f = ____ · ฐาน 2 Lab 33: f_D = ____ · f_S = ____',
            reasoning: '👉 f ถูกกำหนดโดยอะไร (แหล่งกำเนิด)? · ทำไม f คงที่ที่รอยต่อ (จุดเชื่อมต้องสั่นพร้อมกัน)?'
          } },
        { id:'speed_lambda', label:'🏃 v, λ เปลี่ยน · น้ำลึก v มาก', color:'#0284c7',
          prompts: {
            claim:     '👉 v และ λ ในน้ำลึกเทียบน้ำตื้นเป็นอย่างไร? · เชือก μ ต่างเทียบเท่าอย่างไร?',
            evidence:  '👉 Lab 30: v₁ ≈ ____ m/s · v₂ ≈ ____ m/s · Lab 33: λ_D = ____ · λ_S = ____ · v_D = fλ_D = ____ · v_S = ____',
            reasoning: '👉 ทำไม v เปลี่ยน? (v = √(T/μ) ในเชือก · v ∝ √h ในน้ำ) · λ = v/f เปลี่ยนตาม v'
          } },
        { id:'refraction_direction', label:'📐 ทิศการเคลื่อนที่หักเห · แก้ M6.2', color:'#164e63',
          prompts: {
            claim:     '👉 ทิศการเคลื่อนที่หักเหเข้าหาหรือออกจากเส้นปกติเมื่อ v ลด?',
            evidence:  '👉 Lab 33: θ₁ = ____° · θ₂ = ____° · sinθ₁/sinθ₂ = ____ · v_D/v_S = ____ (กฎสเนลล์)',
            reasoning: '👉 ทำไม v ลด → ทิศเข้าหาเส้นปกติ? · หน้าคลื่นตั้งฉากกับทิศการเคลื่อนที่เสมอ · ชนิดคลื่นไม่เปลี่ยน'
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

  // ───────── แผน 7 · การแทรกสอดของคลื่น ─────────
  7: {
    // POE-07 · Interactive form · 2 ฐาน (Lab 30 Spring Superposition + Lab 41 Two-Source Interference)
    poe: {
      title:       'POE-07 · ใบบันทึก Predict–Observe–Explain (แผน 7)',
      description: 'Interactive: palette 2-source · canvas hyperbolic pattern · 2 ฐาน (Lab 30 spring + Lab 41 ripple)',
      viewFile:    'สื่อ02_POE-07_ใบบันทึกPOE.html',
      submitLabel: '📤 ส่ง POE-07',
      sheetPrefix: 'POE_P',
      misconception: 'M7.1 · M7.2 · M7.3 · M7.4',
      allowUpload: true,
      hero: {
        question: 'หยดน้ำ 2 หยดตกลงในสระพร้อมกัน · บนผิวน้ำเกิดอะไรขึ้น? · มีจุดที่ผิวน้ำเรียบ (บัพ) และจุดที่กระเพื่อมแรง (ปฏิบัพ) — เพราะเหตุใด · อนุภาคน้ำที่บัพหายไปจริงหรือไม่?',
        context:  'คู่กับ Concept Cartoon "2 หยดน้ำ" · 2 ฐาน (Lab 30 Coiled Spring superposition · Lab 41 Two-Source Wave Interference)'
      }
    },
    // ใบ 7.1 · Calc Interference · scene-stack overlay + lined canvas
    calc: {
      title:       'ใบกิจกรรม 7.1 · Calc Interference',
      description: '4 ข้อไล่ระดับ · (1) วาด wave pattern 2 sources S₁S₂=3λ · ระบุ A,N (2) คำนวณ Δr ตัดสินจุด P · A หรือ N (3) เลื่อน source separation d → จำนวน A เพิ่ม/ลด · กราฟ (4) Path difference Δr=2.5λ → คำตอบ N (n=2) · ใช้ worksheet-core.js',
      viewFile:    'สื่อ03_Calc_ใบกิจกรรม7.1.html',
      submitLabel: '📤 ส่งใบกิจกรรม 7.1',
      sheetPrefix: 'Calc_P',
      allowUpload: true
    },
    // ใบ 7.2 · Spot the Error · claim-overlay + canvas อธิบาย
    spot: {
      title:       'ใบกิจกรรม 7.2 · Spot the Error',
      description: '3 สถานการณ์ · "Δr=nλ คือบัพ" (M7.1) · "บัพ=น้ำหายจริง" (M7.2) · "ต้อง A เท่ากันถึงแทรกสอด" (M7.3) · claim canvas overlay + canvas อธิบายที่ถูก',
      viewFile:    'สื่อ04_Spot_ใบกิจกรรม7.2.html',
      items: [
        { misc:'M7.1', stmt:'น้องเฟิร์น: "จุด P มี Δr = 8 cm = 2λ พอดี · นี่คือเงื่อนไข Δr = nλ ที่ n = 2 · ดังนั้น P เป็นแนวบัพ N เพราะคลื่นเดินทางครบรอบพอดีทำให้หักล้างกันสมบูรณ์ · การกระจัดรวม = 0"' },
        { misc:'M7.2', stmt:'พี่กิ๊ก: "แนวบัพ N เป็นแนวที่ผิวน้ำเรียบ · นี่แปลว่าอนุภาคน้ำที่จุดบนแนวนั้นถูกคลื่น 2 ลูกหักล้างทำลาย · น้ำที่จุดนั้นหายไปถาวร · ถ้าเอามือไปจุ่มจะไม่เจอน้ำเลย เพราะคลื่นเอาพลังงานน้ำไปหมดแล้ว"' },
        { misc:'M7.3', stmt:'น้องตั้ม: "คลื่น 2 แหล่งนี้ A ไม่เท่ากัน (5 ≠ 3) · ดังนั้นไม่สามารถเกิดการแทรกสอดได้ · เพราะการแทรกสอดต้องการ A เท่ากันเสมอ · ถ้า A ต่างกัน คลื่นทั้งสองจะไม่อาพันธ์ · มีแต่คลื่นที่ A เท่ากันเท่านั้นที่เป็น coherent"' }
      ],
      submitLabel: '📤 ส่งใบกิจกรรม 7.2',
      sheetPrefix: 'Spot_P'
    },
    // CER Board · E3 Explain · 3 คอลัมน์ (ปฏิบัพ A · บัพ N · A ไม่ต้องเท่า)
    cer: {
      id: 'cer',
      title: 'CER Board · Phase E3',
      description: 'ใช้ข้อมูลจาก POE-07 ทั้ง 2 ฐาน (Lab 30 + Lab 41) · ทุกกลุ่มส่ง CER พร้อมกัน · ครูฉายบนจอเพื่อเปรียบเทียบ',
      columns: [
        { id:'antinode', label:'🔆 ปฏิบัพ A · Δr=nλ · แก้ M7.1/M7.4', color:'#ca8a04',
          prompts: {
            claim:     '👉 เงื่อนไข Δr ที่ทำให้จุดเป็นปฏิบัพ A คืออะไร · A รวมที่ปฏิบัพเป็นเท่าใด?',
            evidence:  '👉 Lab 41: P ที่ Δr = nλ พบว่า A สูงสุด = ____ · ฐาน 1 Lab 30: ยอด+ยอด → A รวม = ____',
            reasoning: '👉 หลักซ้อนทับ y = y₁ + y₂ · ที่ปฏิบัพ ยอดพบยอด/ท้องพบท้อง · เสริมกันสูงสุด · n = 0 (กลาง) · ±1 · ±2 ...'
          } },
        { id:'node', label:'🌑 บัพ N · Δr=(n+½)λ · แก้ M7.2', color:'#713f12',
          prompts: {
            claim:     '👉 เงื่อนไข Δr ที่ทำให้จุดเป็นบัพ N คืออะไร · อนุภาคที่บัพหายหรือยังอยู่?',
            evidence:  '👉 Lab 41: P ที่ Δr = (n+½)λ พบว่า A รวม = ____ · จุ่มมือลงไปยังเจอน้ำ · ฐาน 1: ยอด+ท้อง A เท่า → A รวม = 0',
            reasoning: '👉 ที่บัพ y₁ = −y₂ ตลอดเวลา → y รวม = 0 ทุกขณะ · อนุภาคยังอยู่ · พลังงานถูกส่งต่อไปสะสมที่ปฏิบัพ A'
          } },
        { id:'amplitude', label:'📐 A ไม่ต้องเท่า + เงื่อนไข coherent · แก้ M7.3', color:'#a16207',
          prompts: {
            claim:     '👉 ถ้า A₁ ≠ A₂ จะเกิดการแทรกสอดได้ไหม · เงื่อนไข coherent มีอะไรบ้าง?',
            evidence:  '👉 ฐาน 1 Lab 30: A₁=__ A₂=__ ที่บัพ y รวม = ____ (ไม่ใช่ 0) · ที่ปฏิบัพ y รวม = ____ · ยังเห็นรูปแบบ A กับ N',
            reasoning: '👉 coherent = f, λ เท่ากัน + เฟสสัมพันธ์คงที่ (ไม่ใช่ A เท่า) · A ต่างกัน → หักล้างที่บัพไม่สมบูรณ์ (= |A₁−A₂|) แต่ยังเกิดรูปแบบได้'
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
