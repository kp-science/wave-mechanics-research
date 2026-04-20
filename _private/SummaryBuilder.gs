/**
 * 📊 SummaryBuilder.gs · สร้าง sheet เดียวที่รวมคะแนนทุกเครื่องมือต่อนักเรียน
 *
 * วิธีติดตั้ง:
 *   1) เปิด Google Sheet `วิจัยคลื่นกล_Database_2569`
 *   2) Extensions → Apps Script → สร้างไฟล์ใหม่ `Summary.gs`
 *   3) Copy โค้ดนี้ทั้งหมดวางลงไป → 💾 Save
 *   4) Refresh Sheet (F5) → เมนูใหม่ `📊 Summary` โผล่
 *   5) กด `📊 Summary → 🔨 สร้าง/Refresh Summary_All`
 *
 * ต้องรัน ScoringScript ก่อน (FT01_Scored / FT02_Scored / Calc_P{n}_Scored / Spot_P{n}_Scored)
 */

const SUMMARY_SHEET = '📊 Summary_All';
const PLANS = [1,2,3,4,5,6,7,8,9,10];
const FORMATIVE_PLANS = [1,2,3,4,5,6,7,8,9];
const CALC_PLANS = [2,3,4,5,6,7,8,9];
const SPOT_PLANS = [1,2,3,4,5,6,7,8,9];

// ❌ อย่าตั้งชื่อ onOpen ซ้ำกับ ScoringScript.gs (จะทับกัน)
// ให้ไปเพิ่ม 4 บรรทัดใน onOpen() ของ ScoringScript.gs แทน · ดู README ใต้ไฟล์นี้
function addSummaryMenu_(ui) {
  ui.createMenu('📊 Summary')
    .addItem('🔨 สร้าง/Refresh Summary_All', 'buildSummaryAll')
    .addItem('🗑 ลบ Summary_All', 'deleteSummaryAll')
    .addSeparator()
    .addItem('ℹ️ วิธีใช้', 'showSummaryHelp')
    .addToUi();
}

function showSummaryHelp() {
  SpreadsheetApp.getUi().alert(
    '📊 Summary_All · รวมคะแนนทุกเครื่องมือต่อนักเรียนในแถวเดียว\n\n' +
    '✅ ก่อนรัน:\n' +
    '  1. รัน `🎯 Auto-score → 1️⃣ Score FT-01` + `2️⃣ Score FT-02`\n' +
    '  2. รัน `3️⃣ Score Calc` + `4️⃣ Score Spot`\n' +
    '  3. ต้องมีนักเรียนส่งข้อมูลใน POE_P* / F_Pre_P* / F_Post_P*\n\n' +
    '🔨 กด `🔨 สร้าง/Refresh Summary_All` เพื่ออัปเดต\n\n' +
    '📋 Columns:\n' +
    '  • Identity: s_num, s_name, s_room\n' +
    '  • FT01/FT02: Sound, MC, Guess, NoK\n' +
    '  • N-gain + Hake level\n' +
    '  • POE per plan (รวม P+E ทุกข้อ)\n' +
    '  • Formative per plan (Sound Pre→Post)\n' +
    '  • Calc per plan (sum_total)\n' +
    '  • Spot per plan (sum_total)'
  );
}

function deleteSummaryAll() {
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName(SUMMARY_SHEET);
  if (sh) ss.deleteSheet(sh);
  SpreadsheetApp.getUi().alert('✅ ลบแล้ว');
}

/**
 * Build Summary_All · one row per student, joined by s_num
 */
function buildSummaryAll() {
  const ss = SpreadsheetApp.getActive();
  const ui = SpreadsheetApp.getUi();

  // 1) Collect master student list (union from all sources, keyed by s_num)
  const students = {}; // s_num -> { s_num, s_name, s_room }
  const addStudent = (num, name, room) => {
    if (!num && !name) return;
    const key = String(num || name);
    if (!students[key]) students[key] = { s_num: num||'', s_name: name||'', s_room: room||'' };
    else {
      // Fill missing fields
      if (!students[key].s_name && name) students[key].s_name = name;
      if (!students[key].s_room && room) students[key].s_room = room;
    }
  };

  const sourceSheets = ['FT01_Scored', 'FT02_Scored']
    .concat(PLANS.map(n => `POE_P${n}`))
    .concat(FORMATIVE_PLANS.map(n => `F_Pre_P${n}`))
    .concat(FORMATIVE_PLANS.map(n => `F_Post_P${n}`));

  sourceSheets.forEach(name => {
    const sh = ss.getSheetByName(name);
    if (!sh || sh.getLastRow() < 2) return;
    const data = sh.getDataRange().getValues();
    const h = data[0];
    const iNum = h.indexOf('s_num'), iName = h.indexOf('s_name'), iRoom = h.indexOf('s_room');
    for (let r = 1; r < data.length; r++) {
      addStudent(data[r][iNum], data[r][iName], data[r][iRoom]);
    }
  });

  const studentKeys = Object.keys(students).sort((a,b) => {
    const A = students[a], B = students[b];
    if (A.s_room !== B.s_room) return String(A.s_room).localeCompare(String(B.s_room));
    return String(A.s_num).localeCompare(String(B.s_num), undefined, {numeric:true});
  });

  if (studentKeys.length === 0) {
    ui.alert('⚠️ ไม่พบข้อมูลนักเรียนใน sheets ต้นทาง · ตรวจสอบว่ารัน ScoringScript แล้วหรือยัง');
    return;
  }

  // 2) Build lookup maps per source sheet
  const lookupFT = (sheetName) => {
    const sh = ss.getSheetByName(sheetName);
    if (!sh || sh.getLastRow() < 2) return {};
    const data = sh.getDataRange().getValues();
    const h = data[0];
    const iNum = h.indexOf('s_num'), iName = h.indexOf('s_name');
    const iSound = h.indexOf('Sound'), iMC = h.indexOf('MC'),
          iGuess = h.indexOf('Guessing'), iNoK = h.indexOf('No-K'),
          iMCList = h.indexOf('MC_list');
    const map = {};
    for (let r = 1; r < data.length; r++) {
      const k = String(data[r][iNum] || data[r][iName]);
      map[k] = {
        sound: data[r][iSound]||0, mc: data[r][iMC]||0,
        guess: data[r][iGuess]||0, nok: data[r][iNoK]||0,
        mcList: data[r][iMCList]||''
      };
    }
    return map;
  };

  const ft01 = lookupFT('FT01_Scored');
  const ft02 = lookupFT('FT02_Scored');

  // POE: sum all p_score_q* + e_score_q* cells per row (any columns that start with p_score or e_score, or q{n}_p, q{n}_e)
  const lookupPOE = (planNum) => {
    const sh = ss.getSheetByName(`POE_P${planNum}`);
    if (!sh || sh.getLastRow() < 2) return {};
    const data = sh.getDataRange().getValues();
    const h = data[0];
    const iNum = h.indexOf('s_num'), iName = h.indexOf('s_name');
    // Auto-detect score columns
    const scoreCols = [];
    h.forEach((name, i) => {
      const s = String(name).toLowerCase();
      if (s.startsWith('p_score') || s.startsWith('e_score') || /_p$|_e$|_score$/.test(s) || /^q\d+_(p|e)$/.test(s)) {
        scoreCols.push(i);
      }
    });
    const map = {};
    for (let r = 1; r < data.length; r++) {
      const k = String(data[r][iNum] || data[r][iName]);
      let sum = 0, n = 0;
      scoreCols.forEach(c => {
        const v = Number(data[r][c]);
        if (!isNaN(v)) { sum += v; n++; }
      });
      map[k] = { sum, n };
    }
    return map;
  };
  const poeMaps = {};
  PLANS.forEach(p => poeMaps[p] = lookupPOE(p));

  // Formative: classify Sound count from F_Pre/Post_P{n} (t1,t2,t3,t4 per question, 4 questions)
  // Read KEY from row where s_num/s_name is "KEY" OR blank · fallback: use q_key columns if exist
  const lookupFormative = (sheetName) => {
    const sh = ss.getSheetByName(sheetName);
    if (!sh || sh.getLastRow() < 2) return {};
    const data = sh.getDataRange().getValues();
    const h = data[0];
    const iNum = h.indexOf('s_num'), iName = h.indexOf('s_name');
    // Find 4 questions: q1_t1..q4_t4
    const cols = {};
    [1,2,3,4].forEach(q => {
      cols[q] = {
        t1: h.indexOf(`q${q}_t1`), t2: h.indexOf(`q${q}_t2`),
        t3: h.indexOf(`q${q}_t3`), t4: h.indexOf(`q${q}_t4`)
      };
    });
    // Find key row: s_name === 'KEY' or first row with no s_num but t1/t3 filled
    let keyRow = null;
    for (let r = 1; r < data.length; r++) {
      const nm = String(data[r][iName]||'').toUpperCase();
      if (nm === 'KEY' || nm === 'เฉลย') { keyRow = data[r]; break; }
    }
    const map = {};
    for (let r = 1; r < data.length; r++) {
      const nm = String(data[r][iName]||'').toUpperCase();
      if (nm === 'KEY' || nm === 'เฉลย') continue;
      const k = String(data[r][iNum] || data[r][iName]);
      if (!k) continue;
      let sound = 0;
      [1,2,3,4].forEach(q => {
        const c = cols[q];
        if (c.t1 < 0) return;
        const t1 = String(data[r][c.t1]||'').trim();
        const t2 = String(data[r][c.t2]||'').trim().toUpperCase();
        const t3 = String(data[r][c.t3]||'').trim();
        const t4 = String(data[r][c.t4]||'').trim().toUpperCase();
        const kT1 = keyRow ? String(keyRow[c.t1]||'').trim() : '';
        const kT3 = keyRow ? String(keyRow[c.t3]||'').trim() : '';
        const confHi = (x) => x === 'Y' || Number(x) >= 4;
        if (t1 && kT1 && t3 && kT3 && t1 === kT1 && t3 === kT3 && confHi(t2) && confHi(t4)) sound++;
      });
      map[k] = { sound };
    }
    return map;
  };
  const fPreMaps = {}, fPostMaps = {};
  FORMATIVE_PLANS.forEach(p => {
    fPreMaps[p] = lookupFormative(`F_Pre_P${p}`);
    fPostMaps[p] = lookupFormative(`F_Post_P${p}`);
  });

  // Calc / Spot: sum_total column
  const lookupScored = (sheetName, totalCol) => {
    const sh = ss.getSheetByName(sheetName);
    if (!sh || sh.getLastRow() < 2) return {};
    const data = sh.getDataRange().getValues();
    const h = data[0];
    const iNum = h.indexOf('s_num'), iName = h.indexOf('s_name');
    const iTotal = h.indexOf(totalCol), iMax = h.indexOf('max');
    const map = {};
    for (let r = 1; r < data.length; r++) {
      const k = String(data[r][iNum] || data[r][iName]);
      map[k] = { total: data[r][iTotal]||0, max: (iMax>=0?data[r][iMax]:'') };
    }
    return map;
  };
  const calcMaps = {}, spotMaps = {};
  CALC_PLANS.forEach(p => calcMaps[p] = lookupScored(`Calc_P${p}_Scored`, 'sum_total'));
  SPOT_PLANS.forEach(p => spotMaps[p] = lookupScored(`Spot_P${p}_Scored`, 'sum_total'));

  // 3) Build header
  const header = ['s_num', 's_name', 's_room',
    'FT01_Sound', 'FT01_MC', 'FT01_Guess', 'FT01_NoK', 'FT01_MC_list',
    'FT02_Sound', 'FT02_MC', 'FT02_Guess', 'FT02_NoK', 'FT02_MC_list',
    'N_gain', 'Hake', 'MC_reduced'
  ];
  PLANS.forEach(p => header.push(`POE_P${p}`));
  FORMATIVE_PLANS.forEach(p => header.push(`F_Pre_P${p}_Sound`));
  FORMATIVE_PLANS.forEach(p => header.push(`F_Post_P${p}_Sound`));
  CALC_PLANS.forEach(p => header.push(`Calc_P${p}`));
  SPOT_PLANS.forEach(p => header.push(`Spot_P${p}`));
  header.push('สถานะ');

  // 4) Build rows
  const rows = [header];
  studentKeys.forEach(k => {
    const s = students[k];
    const p = ft01[k] || {}, q = ft02[k] || {};
    const pre = p.sound || 0, post = q.sound || 0;
    const nGain = (20 - pre > 0) ? ((post - pre) / (20 - pre)) : '';
    const hake = (nGain === '') ? '' : (nGain < 0.3 ? 'low' : (nGain < 0.7 ? 'medium' : 'high'));
    const mcReduced = (p.mc !== undefined && q.mc !== undefined) ? (p.mc - q.mc) : '';

    const row = [s.s_num, s.s_name, s.s_room,
      p.sound||'', p.mc||'', p.guess||'', p.nok||'', p.mcList||'',
      q.sound||'', q.mc||'', q.guess||'', q.nok||'', q.mcList||'',
      nGain, hake, mcReduced];

    PLANS.forEach(n => {
      const m = poeMaps[n][k];
      row.push(m && m.n > 0 ? m.sum : '');
    });
    FORMATIVE_PLANS.forEach(n => row.push((fPreMaps[n][k]||{}).sound ?? ''));
    FORMATIVE_PLANS.forEach(n => row.push((fPostMaps[n][k]||{}).sound ?? ''));
    CALC_PLANS.forEach(n => row.push((calcMaps[n][k]||{}).total ?? ''));
    SPOT_PLANS.forEach(n => row.push((spotMaps[n][k]||{}).total ?? ''));

    // สถานะ: ✅ improve / ⚠️ need help / — no data
    let status = '—';
    if (pre > 0 || post > 0) {
      if (nGain !== '' && nGain >= 0.3) status = '✅ improve';
      else if (nGain !== '' && nGain < 0) status = '❌ regress';
      else if (nGain !== '') status = '⚠️ low gain';
    }
    row.push(status);

    rows.push(row);
  });

  // 5) Write sheet
  let dst = ss.getSheetByName(SUMMARY_SHEET);
  if (!dst) dst = ss.insertSheet(SUMMARY_SHEET);
  else dst.clear();

  dst.getRange(1, 1, rows.length, header.length).setValues(rows);

  // Format
  const hdr = dst.getRange(1, 1, 1, header.length);
  hdr.setFontWeight('bold').setBackground('#1F4E78').setFontColor('#FFFFFF')
     .setHorizontalAlignment('center').setWrap(true);
  dst.setFrozenRows(1);
  dst.setFrozenColumns(3);

  // Column widths
  dst.setColumnWidth(1, 60);  dst.setColumnWidth(2, 160); dst.setColumnWidth(3, 70);
  for (let c = 4; c <= header.length; c++) dst.setColumnWidth(c, 75);

  // N_gain format 0.00
  const nGainCol = header.indexOf('N_gain') + 1;
  dst.getRange(2, nGainCol, rows.length-1, 1).setNumberFormat('0.00');

  // Conditional formatting: N_gain
  const rules = [];
  const nGainRange = dst.getRange(2, nGainCol, rows.length-1, 1);
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThanOrEqualTo(0.7)
    .setBackground('#C6EFCE').setFontColor('#006100')
    .setRanges([nGainRange]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenNumberBetween(0.3, 0.6999)
    .setBackground('#FFEB9C').setFontColor('#9C5700')
    .setRanges([nGainRange]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(0.3)
    .setBackground('#FFC7CE').setFontColor('#9C0006')
    .setRanges([nGainRange]).build());

  // MC_reduced: green if positive, red if negative
  const mcRedCol = header.indexOf('MC_reduced') + 1;
  const mcRedRange = dst.getRange(2, mcRedCol, rows.length-1, 1);
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(0).setBackground('#C6EFCE')
    .setRanges([mcRedRange]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(0).setBackground('#FFC7CE')
    .setRanges([mcRedRange]).build());

  dst.setConditionalFormatRules(rules);

  // Add TOTAL summary row at top (after header)
  dst.insertRowBefore(2);
  dst.getRange(2, 1).setValue('📊 สรุปรวม').setFontWeight('bold');
  const formulaRow = 2, dataStart = 3, dataEnd = rows.length + 1;
  // Count + averages
  for (let c = 4; c <= header.length; c++) {
    const col = columnLetter(c);
    const formula = (c === nGainCol || c === mcRedCol)
      ? `=IFERROR(AVERAGE(${col}${dataStart}:${col}${dataEnd}),"-")`
      : `=IFERROR(AVERAGE(${col}${dataStart}:${col}${dataEnd}),"-")`;
    if (c !== header.indexOf('FT01_MC_list')+1 &&
        c !== header.indexOf('FT02_MC_list')+1 &&
        c !== header.indexOf('Hake')+1 &&
        c !== header.length) {
      dst.getRange(formulaRow, c).setFormula(formula);
    }
  }
  dst.getRange(formulaRow, 1, 1, header.length)
    .setBackground('#FFF2CC').setFontWeight('bold');
  dst.getRange(formulaRow, nGainCol).setNumberFormat('0.00');

  ui.alert(`✅ ${SUMMARY_SHEET} · สร้างแล้ว ${studentKeys.length} แถว · ${header.length} คอลัมน์\n\n` +
           `🎨 สีเขียว = gain สูง · เหลือง = medium · แดง = low\n` +
           `🔍 Freeze: หัวตาราง + 3 คอลัมน์แรก (s_num, s_name, s_room)`);
}

function columnLetter(col) {
  let s = '';
  while (col > 0) {
    const m = (col - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    col = Math.floor((col - 1) / 26);
  }
  return s;
}
