/* ===== COSMOS LOG · EP07 CONFIG · "สงครามในวงโคจร · Orbital War" =====
 * 28 pages · 4 OS · 7 mystery boxes · Boss = ORBITAL TRIAGE
 * Curriculum: บทที่ 4 เทคโนโลยีอวกาศและการประยุกต์ใช้ (สสวท. หน้า 87-102)
 */
window.EP_CONFIG = {
  id: 'ep07',
  title: 'สงครามในวงโคจร · Orbital War',
  badge: '🔭 Spectrum Engineer',
  rank: 'CAPTAIN+',
  duration: 130, // minutes
  curriculum: 'ว 8.2 ม.6/1 (สสวท. บทที่ 4 หน้า 87-102)',

  /* ===== 28 หน้า ===== */
  pages: [
    { id:'p00', title:'Cover',                  file:'p00-cover.html',         act:'A' },
    { id:'p01', title:'Pretest 8 ข้อ',           file:'p01-pretest.html',       act:'A' },
    { id:'p02', title:'ปัญหา · ดาวเทียมดับ',     file:'p02-problem.html',       act:'A' },
    { id:'p03', title:'ภารกิจ · ปลดคลื่น',       file:'p03-mission.html',       act:'A' },

    { id:'p04', title:'EM Spectrum 6 ช่วงคลื่น', file:'p04-em-spectrum.html',   act:'B' },
    { id:'p05', title:'บรรยากาศดูดกลืน',         file:'p05-atmosphere.html',    act:'B' },
    { id:'p06', title:'วิทยุ · FAST',            file:'p06-radio.html',         act:'B' },
    { id:'p07', title:'แสง · กล้องสะท้อนแสง',    file:'p07-visible.html',       act:'B' },
    { id:'p08', title:'IR · Hubble/JWST',        file:'p08-ir.html',            act:'B' },
    { id:'p09', title:'UV · ตรวจรอยรั่ว',         file:'p09-uv.html',            act:'B' },
    { id:'p10', title:'X-ray · Chandra',         file:'p10-xray.html',          act:'B' },
    { id:'p11', title:'จับคู่กล้อง 6 ตัว',         file:'p11-telescope-match.html', act:'B' },

    { id:'p12', title:'ทำไมต้องส่งยาน',          file:'p12-why-probe.html',     act:'C' },
    { id:'p13', title:'ยานสำรวจ Hall',           file:'p13-probe-hall.html',    act:'C' },
    { id:'p14', title:'ISS · CPR ปั๊มหัวใจ',      file:'p14-iss-cpr.html',       act:'C' },
    { id:'p15', title:'ดาวเทียม 3 วงโคจร',       file:'p15-orbit-3tier.html',   act:'C' },
    { id:'p16', title:'ประกอบจรวด Activator',    file:'p16-rocket-forge.html',  act:'C' },
    { id:'p17', title:'v_escape Lab',            file:'p17-vescape.html',       act:'C' },
    { id:'p18', title:'Mars · brief',            file:'p18-mars-brief.html',    act:'C' },
    { id:'p19', title:'Mars · ออกแบบยาน',         file:'p19-mars-design-a.html', act:'C' },
    { id:'p20', title:'Mars · บ้าน+อาหาร+น้ำ',    file:'p20-mars-design-b.html', act:'C' },
    { id:'p21', title:'Mars · launch sim',       file:'p21-mars-launch.html',   act:'C' },

    { id:'p22', title:'วัสดุศาสตร์ · heat shield', file:'p22-materials.html',    act:'D' },
    { id:'p23', title:'อาหาร · freeze-dry',       file:'p23-food.html',         act:'D' },
    { id:'p24', title:'การแพทย์ · spinoff',       file:'p24-medicine.html',     act:'D' },
    { id:'p25', title:'Spinoff Quiz',             file:'p25-spinoff-quiz.html', act:'D' },
    { id:'p26', title:'BOSS · Orbital Triage',    file:'p26-boss.html',         act:'D' },
    { id:'p27', title:'Journal · → EP08',         file:'p27-journal.html',      act:'D' }
  ],

  /* ===== OS · Objective Shards (4 ตามจุดประสงค์ตำรา) ===== */
  os: [
    { id:'os1', icon:'🔭', name:'Telescope Lens',  desc:'รู้กล้อง 6 ช่วงคลื่น (จุดประสงค์ 1)', actEarn:'B' },
    { id:'os2', icon:'🚀', name:'Rocket Build',    desc:'ประกอบจรวด+v_escape (จุดประสงค์ 3)',   actEarn:'C' },
    { id:'os3', icon:'🪐', name:'Mars Plan',       desc:'ออกแบบภารกิจดาวอังคาร (กิจกรรมตำรา)', actEarn:'C' },
    { id:'os4', icon:'🧪', name:'Spinoff Master',  desc:'การประยุกต์ใช้ 3 ด้าน (จุดประสงค์ 4)', actEarn:'D' }
  ],

  /* ===== Misconceptions M1-M7 ===== */
  misconceptions: [
    { id:'M1', text:'ดาวเทียม GEO ลอยนิ่งไม่เคลื่อนที่',          counter:'จริงคือหมุนตามโลก ~3 km/s' },
    { id:'M2', text:'ดาวเทียมไม่ใช้พลังงาน',                   counter:'ใช้พลังงานสำหรับเครื่องมือและรักษา orbit' },
    { id:'M3', text:'ดาวเทียมยิ่งสูงยิ่งเร็ว',                   counter:'ยิ่งสูงยิ่งช้า (Kepler)' },
    { id:'M4', text:'จรวดต้องดันตลอดทางถึงจะไม่ตก',                counter:'หลุดวงโคจรแล้วไม่ต้องดัน · inertia' },
    { id:'M5', text:'GPS ใช้สัญญาณ 1 ดวงพอ',                  counter:'ต้อง 4 ดวง trilateration' },
    { id:'M6', text:'กล้องบนพื้นโลกใช้ได้ทุกช่วงคลื่น',           counter:'พื้นโลกใช้ได้แค่วิทยุ+ไมโครเวฟ · ตำรา p93' },
    { id:'M7', text:'เทคโนโลยีอวกาศไม่คุ้มค่า',                 counter:'spinoff: แอโรเจล · ปั๊มหัวใจ · เมมโมรีโฟม · ตำรา p98-99' }
  ],

  /* ===== Pretest 5 ข้อ · ตรงเนื้อหา EP07 plan ===== */
  // K1 EM spectrum 7 ช่วง + ค่า c · K2 GEO 35,786 km · K3 atmospheric windows + กล้องอวกาศ
  // M1 GEO ลอยนิ่ง · M2 EM ต้องการตัวกลาง · M3 EM ทุกช่วงผ่านบรรยากาศได้ · M4 telescope-band mismatch
  pretest: [
    { q:'ดาวเทียม geostationary ที่ระยะ 35,786 km เหนือเส้นศูนย์สูตรเคลื่อนที่อย่างไร?',
      opts:['ลอยนิ่งสนิทไม่เคลื่อนที่','หมุนตามโลกที่ความเร็ว ~3 km/s · จึงเห็นเหมือนหยุด','ตกฟรีโดยไม่หมุน','สั่นในที่เฉยๆ'], answer:1, tag:'M1' },
    { q:'คลื่นแม่เหล็กไฟฟ้า (Electromagnetic Wave) เดินทางในอวกาศ (สุญญากาศ) ได้หรือไม่?',
      opts:['ไม่ได้ · ต้องมีอากาศหรือตัวกลางเสมอ',
            'ได้ · เพราะไม่ต้องการตัวกลาง · เดินทางด้วย c = 3×10⁸ m/s',
            'ได้เฉพาะคลื่นวิทยุเท่านั้น',
            'ได้ครึ่งทาง · จากนั้นต้องอาศัยอนุภาค'], answer:1, tag:'M2' },
    { q:'สเปกตรัม EM เรียงจากความยาวคลื่น <b>มากไปน้อย</b> (พลังงานน้อยไปมาก) · ข้อใดถูก?',
      opts:['Gamma → X-ray → UV → Visible → IR → Microwave → Radio',
            'Visible → Radio → Microwave → IR → UV → X-ray → Gamma',
            'Radio → Microwave → IR → Visible → UV → X-ray → Gamma',
            'IR → Visible → UV → Radio → Microwave → X-ray → Gamma'], answer:2, tag:'M3' },
    { q:'กล้องโทรทรรศน์บนพื้นโลกรับคลื่นแม่เหล็กไฟฟ้าช่วงใดได้ดีที่สุด?',
      opts:['รังสีเอกซ์ (X-ray) เพราะพลังงานสูงทะลุได้',
            'รังสีอัลตราไวโอเลต (UV)',
            'แสงตามองเห็น + คลื่นวิทยุ + ไมโครเวฟ',
            'รังสีแกมมา · เพราะเป็นคลื่นที่แรงที่สุด'], answer:2, tag:'M4' },
    { q:'กล้องโทรทรรศน์อวกาศใดถูก <b>ออกแบบหลัก</b> เพื่อสำรวจช่วงคลื่นอินฟราเรด (IR)?',
      opts:['Hubble (HST) · ออกแบบสำหรับ Visible',
            'JWST (James Webb) · ออกแบบสำหรับ IR',
            'Chandra · ออกแบบสำหรับ X-ray',
            'GALEX · ออกแบบสำหรับ UV'], answer:1, tag:'M4' }
  ],

  /* ===== 7 Mystery Box · ตำแหน่งตรง research checkpoint ===== */
  mysteryBoxes: [
    { id:'MB1', page:'p01', checkpoint:'pretest-baseline',
      reward:{ coin:5 }, cosmetic:'Pretest Badge',
      prompt:'หลังทำ pretest · เธอคิดว่ารู้เรื่องไหนน้อยที่สุด?', delay:800 },
    { id:'MB2', page:'p11', checkpoint:'em-spectrum-mastery',
      reward:{ coin:10, energy:2 }, cosmetic:'Lens Skin',
      prompt:'ในกล้อง 6 ตัว · เธอจำชื่อตัวไหนได้แม่นที่สุด?' },
    { id:'MB3', page:'p14', checkpoint:'transfer-medical',
      reward:{ coin:8 }, cosmetic:'Heart Pin',
      prompt:'ในชีวิตจริง · เธอจะใช้ความรู้ CPR ที่ไหนได้บ้าง?' },
    { id:'MB4', page:'p17', checkpoint:'misconception-rocket',
      reward:{ coin:10 }, cosmetic:'Rocket Stamp',
      prompt:'ก่อนหน้านี้เธอคิดว่า "ยิ่งสูงยิ่งเร็ว" ใช่ไหม · ตอนนี้คิดยังไง?' },
    { id:'MB5', page:'p21', checkpoint:'engineering-design',
      reward:{ coin:12 }, cosmetic:'Mars Flag',
      prompt:'ในการออกแบบยานไป Mars · ปัจจัยไหนยากที่สุด?' },
    { id:'MB6', page:'p25', checkpoint:'attitude-shift-spinoff',
      reward:{ coin:10, energy:2 }, cosmetic:'Spinoff Charm',
      prompt:'หลังเรียน · เธอคิดว่าเทคโนฯ อวกาศคุ้มงบประมาณไหม · เพราะ?' },
    { id:'MB7', page:'p27', checkpoint:'summative-posttest',
      reward:{ coin:15, energy:5 }, cosmetic:'Achievement Seal',
      prompt:'เขียน 1 ประโยคที่เธออยากเล่าให้น้องฟังเกี่ยวกับเทคโนฯ อวกาศ' }
  ],

  /* ===== Boss · ORBITAL TRIAGE · 12 crisis pool ===== */
  boss: {
    id:'orbital-triage',
    name:'VOID LAST STAND · Orbital Triage Console',
    durationMin: 12,
    hpStart: 10,
    crisis: [
      { id:'C01', label:'drone หลบในเมฆฝุ่น',         tool:'IR-JWST',     timer:18, kpa:'K1', comp:'C2' },
      { id:'C02', label:'core ซ่อนหลุมดำเทียม',        tool:'X-ray',       timer:15, kpa:'K1', comp:'C2' },
      { id:'C03', label:'สื่อสารพร่า · noise สูง',      tool:'Radio-FAST',  timer:18, kpa:'K1', comp:'C2' },
      { id:'C04', label:'อารยาหัวใจหยุด',              tool:'CPR',         timer:20, kpa:'K6', comp:'C6' },
      { id:'C05', label:'เคนไข้สูง',                  tool:'EarThermo',   timer:15, kpa:'K6', comp:'C6' },
      { id:'C06', label:'ผิวยานทะลุ · ความดันลด',      tool:'Aerogel',     timer:18, kpa:'K4', comp:'C5' },
      { id:'C07', label:'เสบียงเน่า',                 tool:'FreezeDry',   timer:15, kpa:'K6', comp:'C6' },
      { id:'C08', label:'จรวดเอียง',                  tool:'Booster2',    timer:18, kpa:'K3', comp:'C5' },
      { id:'C09', label:'ดาวเทียมหลุด orbit',         tool:'V79',         timer:15, kpa:'K3', comp:'C2' },
      { id:'C10', label:'GPS วางผิดวง',               tool:'MEO',         timer:18, kpa:'K2', comp:'C2' },
      { id:'C11', label:'ยานเข้า Mars · 1500°C',      tool:'HeatShield',  timer:18, kpa:'K4', comp:'C5' },
      { id:'C12', label:'VOID core เปิด · ยิงสรุป',    tool:'Combo6',      timer:25, kpa:'K1-7', comp:'C2,C5' }
    ]
  },

  /* ===== EM Spectrum data (สสวท. p92) ===== */
  spectrum: [
    { id:'radio',    name:'คลื่นวิทยุ',    range:'> 1 cm',     color:'#27ae60', telescopes:['FAST'],          earthOK:true,  example:'หลุมดำ M87 · CMB' },
    { id:'micro',    name:'ไมโครเวฟ',     range:'1mm-1cm',    color:'#3498db', telescopes:['ALMA'],          earthOK:true,  example:'CMB · โมเลกุล' },
    { id:'ir',       name:'อินฟราเรด',    range:'1μm-1mm',    color:'#e67e22', telescopes:['Spitzer','JWST'],earthOK:false, example:'ดาวเกิดใหม่ในเมฆฝุ่น' },
    { id:'visible',  name:'แสง',          range:'400-700nm',  color:'#f1c40f', telescopes:['สะท้อนแสง','Hubble'], earthOK:true, example:'ดาวเคราะห์ · เนบิวลา' },
    { id:'uv',       name:'อัลตราไวโอเลต', range:'10-400nm',   color:'#9b59b6', telescopes:['Hubble'],        earthOK:false, example:'ดาวอุณหภูมิสูง' },
    { id:'xray',     name:'รังสีเอ็กซ์',   range:'0.1-10nm',   color:'#00d4ff', telescopes:['Chandra'],       earthOK:false, example:'หลุมดำใจกลางกาแล็กซี' }
  ],

  /* ===== Telescope catalog (สสวท. p101) ===== */
  telescopes: [
    { id:'fast',    name:'FAST',                 loc:'พื้นโลก จีน',  band:['radio'],  studies:['ซูเปอร์โนวา','หลุมดำ','CMB'] },
    { id:'mirror',  name:'กล้องสะท้อนแสง',         loc:'พื้นโลก',     band:['visible'],studies:['ดาวเคราะห์','ดาวฤกษ์','เนบิวลา'] },
    { id:'hubble',  name:'Hubble',               loc:'อวกาศ LEO',  band:['ir','visible','uv'], studies:['สสารระหว่างดาว','กาแล็กซี'] },
    { id:'spitzer', name:'Spitzer',              loc:'อวกาศ',      band:['ir'],     studies:['ดาวเกิดใหม่ใจกลางกาแล็กซี'] },
    { id:'jwst',    name:'James Webb (JWST)',    loc:'อวกาศ L2',   band:['ir'],     studies:['ดาราจักรแรกเกิด'] },
    { id:'chandra', name:'Chandra',              loc:'อวกาศ',      band:['xray'],   studies:['หลุมดำ','ซูเปอร์โนวา','นิวตรอน'] }
  ],

  /* ===== Spaceship Hall (สสวท. p94) ===== */
  probes: [
    { id:'apollo',     name:'Apollo',         target:'ดวงจันทร์', year:'1969' },
    { id:'curiosity',  name:'Curiosity',      target:'ดาวอังคาร', year:'2012' },
    { id:'juno',       name:'Juno',           target:'พฤหัสบดี',  year:'2016' },
    { id:'cassini',    name:'Cassini-Huygens',target:'เสาร์',     year:'2004-17' },
    { id:'newhorizons',name:'New Horizons',   target:'พลูโต',     year:'2015' }
  ],

  /* ===== Spinoff Catalog (สสวท. p98-102) ===== */
  spinoff: {
    materials: [
      { id:'aerogel',    name:'แอโรเจล',         use:'ฉนวนกันความร้อน · เบาที่สุด' },
      { id:'memoryfoam', name:'เมมโมรีโฟม',      use:'ที่นอน · เบาะรถยนต์' },
      { id:'lenscarbon', name:'เลนส์คาร์บอนแข็ง', use:'แว่นทนรอย' },
      { id:'solar',      name:'เซลล์สุริยะ',     use:'พลังงานทดแทน' }
    ],
    food: [
      { id:'freezedry', name:'ทำแห้งเยือกแข็ง',   use:'อาหารน้ำหนักเบา · เก็บนาน' },
      { id:'vacuumpkg', name:'บรรจุภัณฑ์สุญญากาศ', use:'ยืดอายุอาหาร' },
      { id:'babyformula',name:'นมผงเด็ก',         use:'สารอาหารคล้ายน้ำนมแม่' }
    ],
    medicine: [
      { id:'heartpump', name:'ปั๊มหัวใจเทียม',     use:'ผู้ป่วยหัวใจล้มเหลว' },
      { id:'cam3d',     name:'กล้อง 3 มิติ NASA', use:'ส่องอวัยวะภายใน' },
      { id:'earthermo', name:'ปรอทวัดทางหู',      use:'วัดไข้รวดเร็ว' },
      { id:'uvscan',    name:'เครื่องวัด UV',     use:'ตรวจรังสีอันตราย' }
    ]
  },

  /* ===== Mars mission factors (สสวท. p95-96 กิจกรรมลองทำดู) ===== */
  marsFactors: [
    { id:'fuel',     label:'เชื้อเพลิง', need:'v_escape โลก = 11.2 km/s' },
    { id:'material', label:'วัสดุยาน',   need:'ทนความร้อน 1500°C ผ่าน atm Mars' },
    { id:'shelter',  label:'ที่อยู่อาศัย', need:'จำลองชั้นบรรยากาศ + กันรังสี' },
    { id:'food',     label:'อาหาร',      need:'ปลูกพืช + สังเคราะห์แสง · O2' },
    { id:'water',    label:'น้ำ',        need:'ขุดน้ำแข็งใต้ดิน · 60% ของดิน' }
  ],

  /* ===== Story Spine · เนื้อเรื่องเชื่อมต่อทุกหน้า ===== */
  story: {
    p00: {
      objective: 'กู้คืนเทคโนฯ อวกาศ', npc:'',
      now:  'ทีมพุ่งกลับโลกผ่าน LEO 400 km · ดาวเทียม 4,800 ดวงดับทั้งหมด',
      next: 'ก่อนทำอะไร · เช็คความรู้ตัวเอง'
    },
    p01: {
      objective: 'เช็คความรู้นักบิน', npc:'พ่ออารยา',
      prev: 'ดาวเทียมโลกดับทั้งจักรวาล · GPS · อินเทอร์เน็ต · สื่อสาร',
      line: 'ก่อนบินเข้าสนามรบ · ผมต้องรู้ว่าพวกเรารู้อะไรบ้าง · ตอบ 8 ข้อนี้',
      now:  'pretest 8 ข้อ · ระบบเก็บเป็น baseline · เปรียบเทียบกับหลังเรียน',
      next: 'ดูว่าจอ HUD ของยานเหลือคลื่นอะไรใช้ได้บ้าง'
    },
    p02: {
      objective: 'หาสาเหตุที่จอ HUD ดับ', npc:'เคน',
      prev: 'ทำ pretest เสร็จ · ระบบบันทึก baseline แล้ว',
      line: 'ดู! จอเรดาร์ดับ · IR ดับ · X-ray ดับ · เห็นแต่ visible เท่านั้น',
      now:  'วิเคราะห์ว่ามนุษย์สังเกตจักรวาลด้วยอะไร · ทำไม VOID ปิดได้ทุกช่วง',
      next: 'พ่ออารยาจะตั้งภารกิจหลัก'
    },
    p03: {
      objective: 'รับภารกิจปลดคลื่น', npc:'พ่ออารยา',
      prev: 'รู้แล้วว่า VOID ปิดสเปกตรัมหมดยกเว้น visible',
      line: 'ฟังนะกัปตัน · ภารกิจคือปลดคลื่นทีละช่วง · 6 ช่วง · 4 OS · ก่อนหมดเวลา 6 ชม.',
      now:  'รับ briefing 4 OS เป้าหมาย · ระบบเกม + countdown',
      next: 'เคนวิ่งไปคอนโซลคลื่นของพ่อ'
    },
    p04: {
      objective: 'ปลดคลื่น 6 ช่วง', npc:'เคน',
      prev: 'รับภารกิจ · เคนวิ่งไปคอนโซลคลื่นของพ่อ',
      line: 'พ่อทำสเปกตรัมไว้ · แต่สลับลำดับไว้ป้องกัน VOID · ช่วยผมเรียงให้ถูก',
      now:  'ลาก 6 คลื่นเรียง ยาว→สั้น (วิทยุ→ไมโครเวฟ→IR→แสง→UV→X-ray)',
      next: 'หลังเรียงเสร็จ · ทดสอบทำไมต้องส่งกล้องไปอวกาศ'
    },
    p05: {
      objective: 'พิสูจน์ว่าบรรยากาศกั้นคลื่น', npc:'เคน',
      prev: 'เรียงคลื่น 6 ช่วงเสร็จ · เห็นสเปกตรัมเต็ม',
      line: 'แต่...ทำไมเรดาร์โลกมองไม่เห็น VOID? · ลองยิงทีละคลื่นทะลุบรรยากาศดู',
      now:  'ทดลองยิงคลื่นทะลุชั้นบรรยากาศ · บันทึกว่าตัวไหนผ่าน · ตัวไหนถูกดูดกลืน',
      next: 'เริ่มจากคลื่นที่ผ่านได้ · คลื่นวิทยุ'
    },
    p06: {
      objective: 'จับสัญญาณเคน', npc:'เคน',
      prev: 'พบ X-ray/UV/IR ถูกดูดกลืน · ใช้พื้นโลกได้แค่วิทยุ + ไมโครเวฟ',
      line: 'ผมจะออกไปหาพิกัด VOID · ใช้ FAST 500m รับเสียงผม · ตั้ง 1.4-1.5 GHz',
      now:  'ปรับจาน FAST · tune ความถี่ Hydrogen line จับเสียงเคน',
      next: 'เคนจะส่งพิกัด VOID กลับมา'
    },
    p07: {
      objective: 'ยิง drone 3 ตัว', npc:'อารยา',
      prev: 'เคนแจ้ง: VOID อยู่ MEO 20,200 km · ปล่อย drone 3 ตัวบินเข้ายาน',
      line: 'drone ใกล้แล้ว · คลื่นยาวทำเรซโลชันต่ำ · ใช้กล้องสะท้อนแสงปรับโฟกัสก่อน',
      now:  'ปรับโฟกัสกล้อง visible ≥ 70% · lock drone',
      next: 'drone ที่เหลือจะหลบเข้าเมฆฝุ่น Orion'
    },
    p08: {
      objective: 'ตามล่า drone ในเมฆฝุ่น', npc:'อารยา',
      prev: 'ทำลาย drone บางตัวแล้ว · ที่เหลือหลบเข้าเมฆฝุ่นใน Orion · visible เห็นไม่ได้',
      line: 'visible ทะลุฝุ่นไม่ได้ · สลับ IR · เห็นความร้อนของ drone ทะลุได้',
      now:  'สลับมุมมอง visible/IR · ตอบว่าทำไม IR ทะลุฝุ่น',
      next: 'IR เห็น VOID core อยู่หลังหลุมดำเทียม · แต่ผิวยานเริ่มเสียหาย'
    },
    p09: {
      objective: 'ซ่อมยาน', npc:'เคน',
      prev: 'ระหว่างไล่ drone · ผิวยานทะลุ · ความดันลด',
      line: 'รอยร้าวเรืองแสง UV · เปิดไฟอัลตราไวโอเลต · คลิกแปะ patch 3 จุด',
      now:  'เปิด UV scan · หารอยรั่วบนผิวยาน · แปะ patch',
      next: 'ซ่อมเสร็จ · กลับไปจัดการ core ของ VOID'
    },
    p10: {
      objective: 'ตรวจจับ VOID core', npc:'อารยา',
      prev: 'ซ่อมยานเสร็จ · core VOID ฝังในหลุมดำเทียม · มองด้วยอะไรไม่ได้',
      line: 'หลุมดำดูดแสง · แต่วัตถุรอบๆ ปล่อย X-ray · Chandra เห็น core ได้',
      now:  'สลับ visible/X-ray · ตอบ misconception ทำไม Chandra ต้องอยู่อวกาศ',
      next: 'รู้คลื่นครบ 6 · ต้องจัดเก็บกล้องให้พร้อมใช้'
    },
    p11: {
      objective: 'ปิด ACT B · ปลด OS-1', npc:'พ่ออารยา',
      prev: 'รู้คลื่นครบ 6 · core VOID ติดตามได้',
      line: 'armory ของยาน · เก็บกล้อง 6 ตัว · ใส่ผิดช่อง = พังหมด · ทำให้พร้อม',
      now:  'จับคู่กล้อง 6 ตัว ↔ ช่วงคลื่น ↔ วัตถุที่ศึกษา (กิจกรรมตำรา 4.1)',
      next: 'พ่อแจ้ง · ต้องส่งยานไปดูใกล้ · กล้องอย่างเดียวไม่พอ'
    },
    p12: {
      objective: 'เริ่ม ACT C · ส่งยาน', npc:'พ่ออารยา',
      prev: 'OS-1 ปลดล็อก · Hubble จับวัตถุน่าสงสัยที่ Mars · แต่ภาพไม่คม',
      line: 'กล้องบอกได้แค่เริ่มต้น · ต้องส่งยานไปดูใกล้ · เก็บตัวอย่างจริง',
      now:  'ทบทวน · ทำไมต้องส่งยาน ไม่ใช่แค่กล้อง',
      next: 'เลือกยานต้นแบบจากคลังพ่อโบลท์'
    },
    p13: {
      objective: 'เลือกยานต้นแบบ', npc:'โบลท์',
      prev: 'ยานต้นแบบเก็บไว้ในคลังพ่อโบลท์ · เปิดได้ยาก · โบลท์รู้รหัส',
      line: 'พ่อ...พ่อผมเก็บข้อมูลยานทุกลำในคลังนี้ · ผมจะเปิดให้',
      now:  'จับคู่ยาน 5 ลำ · Apollo · Curiosity · Juno · Cassini · New Horizons ↔ เป้าหมาย',
      next: 'ระหว่างเปิดคลัง · VOID ยิงพัลส์ใส่ ISS!'
    },
    p14: {
      objective: 'ช่วยอารยา · ใช้ปั๊มหัวใจ', npc:'อารยา',
      prev: 'VOID ยิงพัลส์ใส่ ISS · อารยาลอยชนผนัง · heart monitor แสดง flatline',
      line: '(หมดสติ · pulse หยุด · เธอมี 10 วินาที)',
      now:  '⭐ CPR · กดหัวใจจังหวะ 100 ครั้ง/นาที · ปั๊มหัวใจเทียม NASA spinoff',
      next: 'อารยารอด · ทีมรู้คุณค่า spinoff แพทย์ · กลับไปจัดเครือข่ายดาวเทียม'
    },
    p15: {
      objective: 'ตั้งเครือข่ายดาวเทียม', npc:'เคน',
      prev: 'อารยาฟื้น · ทีมต้องตั้งเครือข่ายสื่อสารใหม่ · วาง 3 ดวงผิดวง = ใช้ไม่ได้',
      line: 'imaging ที่ LEO · GPS ที่ MEO · comms ที่ GEO · นี่คือกฎ',
      now:  'วาง 3 ดาวเทียมในวงโคจรที่ถูกต้อง · ตำราหน้า 94',
      next: 'แต่ดาวเทียมเก่า "Sputnik-Echo" ยังหลับ · ต้องส่ง Activator ไปกระตุ้น'
    },
    p16: {
      objective: 'ส่ง Activator ไป Sputnik-Echo', npc:'โบลท์',
      prev: 'เครือข่ายตั้งแล้ว · แต่ Sputnik-Echo ที่ LEO 400 km หลับ · ต้องส่งจรวดไปกระตุ้น',
      line: 'พ่อทิ้งจรวดไว้ · แต่ประกอบไม่ครบ · ผมจะวางทุกชิ้น · ขอให้ดูว่าถูกตำแหน่ง',
      now:  '⭐ FORGE · 4 ส่วน: หัวรบ + ถังเหลวกลาง + จรวดแข็ง 2 ข้าง · ขาดข้าง = เอียง',
      next: 'จรวดประกอบเสร็จ · เร่งความเร็วเท่าไหร่ถึงเข้าวงโคจร?'
    },
    p17: {
      objective: 'หา v ที่ถูก · ปลด OS-2', npc:'เคน',
      prev: 'จรวดประกอบเสร็จ · ต้องเข้า orbit เท่านั้น · ตก = พลาด · หลุด = ไป Mars',
      line: 'v ต่ำกว่า 7.9 = ตกกลับโลก · 7.9-11.2 = orbit · เกิน 11.2 = หลุดสู่อวกาศ',
      now:  '⭐ slider เร่งจรวด · ปล่อยที่ความเร็วเหมาะสม · Sputnik-Echo รับ Activator',
      next: 'Sputnik ตื่น · ส่งพิกัดกลับมา · VOID ฐานหลักอยู่ที่ Mars!'
    },
    p18: {
      objective: 'ออกแบบยานไป Mars', npc:'โบลท์',
      prev: 'Sputnik ตื่น · ส่งพิกัด · VOID ฐานหลักอยู่ Mars · ทีมต้องส่งคนไป',
      line: 'พ่ออารยา ผมจะนำทีมไปเอง · เธอเป็นวิศวกรหลัก · ออกแบบยานให้พวกเรา',
      now:  'รับ briefing 5 ปัจจัย: เชื้อเพลิง · วัสดุ · บ้าน · อาหาร · น้ำ',
      next: 'เริ่มออกแบบส่วน A: ยาน + เชื้อเพลิง'
    },
    p19: {
      objective: 'ออกแบบยาน Mars · ส่วน A', npc:'โบลท์',
      prev: 'รับภารกิจ Mars · 5 ปัจจัย · เริ่มจากยาน',
      line: 'ความร้อนเข้า atm Mars 1500°C · g = 0.38 ของโลก · เลือกวัสดุ + ความเร็วถูก',
      now:  'เลือก heat shield + ความเร็วปล่อย (กิจกรรมตำราหน้า 96)',
      next: 'ส่วน B: ที่อยู่ + อาหาร + น้ำ'
    },
    p20: {
      objective: 'ออกแบบ Mars · ส่วน B', npc:'อารยา',
      prev: 'ยานออกแบบเสร็จ · ต่อมาคือระบบยังชีพ 6 เดือนบน Mars',
      line: 'ใต้พื้น Mars มีน้ำแข็ง 60% · บรรยากาศ 96% CO₂ · ต้องวางแผนทุกอย่าง',
      now:  'เลือก ที่อยู่ + อาหาร + น้ำ ที่เหมาะสม',
      next: 'ทดสอบบินจำลอง 7 วัน'
    },
    p21: {
      objective: 'ทดสอบบินจำลอง 7 วัน · ปลด OS-3', npc:'พ่ออารยา',
      prev: 'ออกแบบครบ · ระบบจะรัน sim 7 วันเพื่อดูว่าออกแบบดีพอไหม',
      line: 'รัน sim · ถ้าออกแบบดี · ทีมจะรอดถึง Mars',
      now:  'กดเริ่ม · ดู timeline 7 วัน · launch → cruise → EDL → landing',
      next: 'ทีมแตะ Mars · แต่ atm 1500°C ยังกดดันยาน · ต้องเลือก heat shield จริง'
    },
    p22: {
      objective: 'เลือก heat shield · เริ่ม ACT D', npc:'อารยา',
      prev: 'ทีมเข้า atm Mars · 1500°C · ขาด heat shield = ยานละลาย',
      line: 'แอโรเจล · เมมโมรีโฟม · เลนส์คาร์บอน · พลาสติก · เลือกอันที่ทน',
      now:  'ลากวัสดุที่ทนความร้อนใส่ยาน · ตำราหน้า 98',
      next: 'ลงพื้น Mars · 7 วัน · เสบียงเริ่มหมด'
    },
    p23: {
      objective: 'จัดอาหาร 7 มื้อ', npc:'เคน',
      prev: 'ลงพื้นแล้ว · เสบียงสดเน่าหมด · ต้องเลือกอาหารที่เก็บนาน',
      line: 'อาหารทำแห้งเยือกแข็งสุญญากาศ · เก็บเป็นปี · NASA พัฒนาเอง',
      now:  'เลือกอาหาร 7 มื้อแบบ freeze-dry ทั้งหมด',
      next: 'แต่ทีมเริ่มเจ็บป่วย · ต้องใช้เครื่องมือแพทย์'
    },
    p24: {
      objective: 'รักษาทีม 3 เคส · kill M7', npc:'อารยา',
      prev: 'เคนไข้ · อารยาเจ็บภายใน · พ่ออารยาหัวใจอ่อนแรงจากไร้น้ำหนัก',
      line: 'เครื่องมือทุกชิ้นในคลัง · NASA spinoff · เลือกตัวที่ใช่ในแต่ละเคส',
      now:  '3 เคสผู้ป่วย · เลือก spinoff ที่ถูก (ตำราหน้า 99)',
      next: 'ทบทวน spinoff ทั้งหมดก่อนสู้ตัวสุดท้าย'
    },
    p25: {
      objective: 'ทบทวน spinoff · ปลด OS-4', npc:'โบลท์',
      prev: 'รักษาทีมสำเร็จ · เห็นแล้วว่าเทคโนฯ อวกาศกลายเป็นของในบ้าน',
      line: 'ก่อนสู้ VOID ตัวสุดท้าย · จำไว้ว่าทุกอย่างที่ใช้ · มาจากภารกิจอวกาศจริง',
      now:  'จับคู่ของในบ้าน 8 อย่าง ↔ ภารกิจ NASA',
      next: 'VOID เปิดศึกหลายแนวพร้อมกัน · เตรียมร้านค้าก่อนสู้'
    },
    p26: {
      objective: 'BOSS · CIPHER VAULT 5 เฟส', npc:'พ่ออารยา',
      prev: 'ทีมเก็บ <b>4 กุญแจ (Keys)</b> มาตลอดบทเรียน · 🔭 Lens · 🛰️ Orbit · 🚀 Rocket · 🧪 Spinoff · ใช้เปิด vault',
      line: 'แต่ละกุญแจปลด <em>หนึ่งเฟส</em> · ขาด key = เฟสนั้นยากขึ้น · Phase 5 ต้องมีอย่างน้อย 3 keys · ทีมเรา 4 คน · เธอต้อง<em>ตรวจสอบ</em>เพราะ VOID ปลอมคำตอบเราได้',
      now:  '⭐ BOSS · ตรวจ keyring · ซื้อ booster · 🌈 → 🛰 → 🚀 → 🧪 → 🔓 จับ corrupt 2 ช่อง',
      next: 'ชนะ → vault เปิด · พบ message ลับของพ่อโบลท์ · ปลด warp drive'
    },
    p27: {
      objective: 'จบ EP07 · → EP08', npc:'โบลท์',
      prev: 'ชนะ Boss · ทีมกลับ Mars · ขุดใต้ฐาน VOID · เจอ warp blueprint ของพ่อโบลท์',
      line: 'พ่อ...พ่อรู้ตั้งแต่แรก · เป้าหมายต่อไปคือวินาทีที่ 0 ของบิกแบง',
      now:  '📓 ทำ posttest · เปรียบเทียบ gain · บันทึก reflection 3-2-1',
      next: 'EP08 "Genesis Again" · Season Finale'
    }
  }
};
