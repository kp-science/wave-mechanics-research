/**
 * ScoringScript.gs — Auto-score formulas & batch scorers
 *
 * วิธีใช้:
 *   1. เปิด Apps Script ของ Spreadsheet (Extensions → Apps Script)
 *   2. Copy ทั้งไฟล์นี้ไปต่อท้าย Code.gs (หรือสร้างไฟล์ใหม่ `Scoring.gs`)
 *   3. Save + Deploy (New version) ถ้าต้องการให้เมนูโผล่ใน Sheet ให้ reload sheet
 *   4. ใน Sheet จะเห็นเมนู "🎯 Auto-score" ด้านบน
 *
 * ครอบคลุม:
 *   A. FT-01 / FT-02 · Four-tier classification (Caleon & Subramaniam 2010)
 *   B. Calc · Numeric (±5%) + Unit exact match
 *   C. Spot the Error · Keyword match (REGEXMATCH alternative)
 *
 * Schema อ้างอิง:
 *   - FT01/FT02: timestamp, s_name, s_num, s_room, s_grp, q1_t1, q1_t2, q1_t3, q1_t4, ... q20_t4
 *   - Calc_P{n}: timestamp, s_*, q1_ans, q2_ans, ... (free text)
 *   - Spot_P{n}: timestamp, s_*, q1_identify, q1_correct, q1_justify, ... หรือ q{n}_ans
 *
 *  Key sheets (ครูสร้างเอง หรือ gen ด้วย initKeySheets()):
 *   - KEY_FT       · q | t1_key | t3_key            (20 rows · ใช้ทั้ง FT01/FT02)
 *   - KEY_Calc_P{n}· q | num_key | unit_key | tol   (tol default 0.05 = ±5%)
 *   - KEY_Spot_P{n}· q | identify_kw | correct_kw   (| คั่น keywords หลายคำ)
 */

// ─────────────────────────────────────────────────────────────
// CUSTOM FUNCTIONS (ใช้เป็นสูตรใน cell ได้เลย)
// ─────────────────────────────────────────────────────────────

/**
 * Classify Four-tier answer — Sound / MC / Guessing / No-K
 * @param {string} t1  ตัวเลือก Tier 1 (ก/ข/ค/ง)
 * @param {number} t2  Likert 1–5
 * @param {string} t3  เหตุผล (1/2/3/4)
 * @param {number} t4  Likert 1–5
 * @param {string} t1Key  เฉลย T1
 * @param {string} t3Key  เฉลย T3
 * @return {string}  'Sound' | 'MC' | 'Guessing' | 'No-K'
 * @customfunction
 */
function CLASSIFY_FT(t1, t2, t3, t4, t1Key, t3Key) {
  if (t1 === '' || t3 === '') return '';
  const c2 = Number(t2) || 0;
  const c4 = Number(t4) || 0;
  if (c2 <= 2 || c4 <= 2) return 'No-K';
  const corrT1 = String(t1).trim() === String(t1Key).trim();
  const corrT3 = String(t3).trim() === String(t3Key).trim();
  if (corrT1 && corrT3) return 'Sound';
  if (!corrT1 && !corrT3) return 'MC';
  if (corrT1 && !corrT3) return 'Guessing';
  return 'No-K';
}

/**
 * ให้คะแนนคำตอบ Calc · คืน array [ans_score, unit_score, total] (0|1)
 * @param {string} ansText  คำตอบที่นักเรียนพิมพ์ (free text)
 * @param {number} numKey   ค่าตัวเลขเฉลย
 * @param {string} unitKey  หน่วยเฉลย (เช่น m/s, Hz)
 * @param {number} tol      tolerance (default 0.05 = ±5%)
 * @return {Array<Array<number>>}  [[ans, unit, total]]
 * @customfunction
 */
function CALC_SCORE(ansText, numKey, unitKey, tol) {
  if (ansText === '' || ansText == null) return [[0, 0, 0]];
  tol = Number(tol) || 0.05;
  const t = String(ansText);
  // หาเลขตัวแรก (รองรับเครื่องหมาย, จุด, exponent, หลักพัน)
  const cleaned = t.replace(/,(?=\d{3}\b)/g, '');
  const m = cleaned.match(/-?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?/);
  const num = m ? Number(m[0]) : NaN;
  const nk = Number(numKey);
  const numOk = !isNaN(num) && !isNaN(nk) && Math.abs(num - nk) <= Math.abs(nk) * tol;
  // Unit: หาแบบ case-insensitive · ตัด space
  const uk = String(unitKey || '').trim().toLowerCase();
  const unitOk = uk === '' ? true : t.toLowerCase().includes(uk);
  const ans = numOk ? 1 : 0;
  const unit = unitOk ? 1 : 0;
  return [[ans, unit, ans + unit]];
}

/**
 * Keyword match สำหรับ Spot the Error / short-answer
 * @param {string} text      คำตอบนักเรียน
 * @param {string} keywords  คำสำคัญ · คั่นด้วย `|` (ถูก 1 คำ = ผ่าน)
 * @return {number}  1 ถ้า match · 0 ถ้าไม่
 * @customfunction
 */
function SPOT_MATCH(text, keywords) {
  if (!text || !keywords) return 0;
  const t = String(text).toLowerCase();
  const kws = String(keywords).split('|').map(k => k.trim().toLowerCase()).filter(Boolean);
  return kws.some(k => t.includes(k)) ? 1 : 0;
}

/**
 * Normalized gain (Hake 1998) · g = (Post − Pre) / (Max − Pre)
 * @param {number} pre   คะแนน pre
 * @param {number} post  คะแนน post
 * @param {number} max   คะแนนเต็ม (default 100)
 * @return {number}
 * @customfunction
 */
function N_GAIN(pre, post, max) {
  max = Number(max) || 100;
  const p = Number(pre), q = Number(post);
  if (isNaN(p) || isNaN(q) || max - p === 0) return '';
  return (q - p) / (max - p);
}

// ─────────────────────────────────────────────────────────────
// MENU
// ─────────────────────────────────────────────────────────────

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🎯 Auto-score')
    .addItem('🔧 สร้าง Key sheets (ครั้งแรก)', 'initKeySheets')
    .addItem('🖼️ สร้าง Canvas Key sheets', 'initCanvasKeySheet')
    .addSeparator()
    .addItem('1️⃣ Score FT-01 → FT01_Scored', 'scoreFT01')
    .addItem('2️⃣ Score FT-02 → FT02_Scored', 'scoreFT02')
    .addItem('3️⃣ Score Calc (ทุกแผน)', 'scoreAllCalc')
    .addItem('4️⃣ Score Spot (ทุกแผน)', 'scoreAllSpot')
    .addItem('👁️ Score Canvas (Gemini Vision)', 'scoreAllCanvas')
    .addSeparator()
    .addItem('📊 สรุป Pre-Post + N-gain', 'buildGainReport')
    .addToUi();
}

// ─────────────────────────────────────────────────────────────
// KEY SHEETS (ครูกรอกเฉลยที่นี่)
// ─────────────────────────────────────────────────────────────

const FT_ANSWER_KEY = [
  // [q, t1, t3]
  [1,'ข','3'],[2,'ก','4'],[3,'ค','1'],[4,'ง','2'],[5,'ข','4'],
  [6,'ค','2'],[7,'ก','3'],[8,'ง','1'],[9,'ข','1'],[10,'ก','3'],
  [11,'ค','4'],[12,'ง','2'],[13,'ข','3'],[14,'ค','1'],[15,'ก','4'],
  [16,'ง','2'],[17,'ข','4'],[18,'ค','2'],[19,'ก','3'],[20,'ง','1'],
];

function initKeySheets() {
  const ss = SpreadsheetApp.getActive();
  // KEY_FT
  let sh = ss.getSheetByName('KEY_FT') || ss.insertSheet('KEY_FT');
  sh.clear();
  sh.getRange(1, 1, 1, 3).setValues([['q','t1_key','t3_key']]).setFontWeight('bold');
  sh.getRange(2, 1, FT_ANSWER_KEY.length, 3).setValues(FT_ANSWER_KEY);
  sh.setFrozenRows(1);
  // KEY_Calc_P{n} · สร้าง template ว่างให้ครูกรอก (แผน 2–9 มี Calc)
  [2,3,4,5,6,7,8,9].forEach(n => {
    const name = `KEY_Calc_P${n}`;
    if (ss.getSheetByName(name)) return;
    const s = ss.insertSheet(name);
    s.getRange(1,1,1,4).setValues([['q','num_key','unit_key','tol']]).setFontWeight('bold');
    const rows = [];
    for (let i=1; i<=5; i++) rows.push([i,'','',0.05]);
    s.getRange(2,1,rows.length,4).setValues(rows);
    s.setFrozenRows(1);
  });
  // KEY_Spot_P{n}
  [1,2,3,4,5,6,7,8,9].forEach(n => {
    const name = `KEY_Spot_P${n}`;
    if (ss.getSheetByName(name)) return;
    const s = ss.insertSheet(name);
    s.getRange(1,1,1,3).setValues([['q','identify_kw','correct_kw']]).setFontWeight('bold');
    const rows = [];
    for (let i=1; i<=3; i++) rows.push([i,'','']);
    s.getRange(2,1,rows.length,3).setValues(rows);
    s.setFrozenRows(1);
  });
  SpreadsheetApp.getUi().alert('✅ สร้าง Key sheets แล้ว · กรอกเฉลย Calc/Spot ก่อนกด Score');
}

// ─────────────────────────────────────────────────────────────
// BATCH SCORERS
// ─────────────────────────────────────────────────────────────

function scoreFT01() { scoreFT_('FT01'); }
function scoreFT02() { scoreFT_('FT02'); }

function scoreFT_(sheetName) {
  const ss = SpreadsheetApp.getActive();
  const src = ss.getSheetByName(sheetName);
  if (!src) { SpreadsheetApp.getUi().alert(`❌ ไม่พบ sheet ${sheetName}`); return; }
  const keyMap = {};
  const keySh = ss.getSheetByName('KEY_FT');
  if (!keySh) { SpreadsheetApp.getUi().alert('❌ ยังไม่มี KEY_FT · กด "สร้าง Key sheets" ก่อน'); return; }
  keySh.getRange(2,1,20,3).getValues().forEach(r => { keyMap[r[0]] = { t1: String(r[1]), t3: String(r[2]) }; });

  const data = src.getDataRange().getValues();
  if (data.length < 2) { SpreadsheetApp.getUi().alert('ℹ️ ยังไม่มีข้อมูลใน ' + sheetName); return; }
  const header = data[0];
  const idx = name => header.indexOf(name);

  const outHeader = ['timestamp','s_name','s_num','s_room','s_grp'];
  for (let q=1; q<=20; q++) outHeader.push(`q${q}_cat`);
  outHeader.push('Sound','MC','Guessing','No-K','Total_correct','Score_T1','MC_list');

  const outRows = [outHeader];
  for (let i=1; i<data.length; i++) {
    const row = data[i];
    const out = [
      row[idx('timestamp')] || row[0] || '',
      row[idx('s_name')] || '',
      row[idx('s_num')] || '',
      row[idx('s_room')] || '',
      row[idx('s_grp')] || '',
    ];
    const counts = { Sound:0, MC:0, Guessing:0, 'No-K':0 };
    const mcList = [];
    let correctT1 = 0;
    for (let q=1; q<=20; q++) {
      const t1 = row[idx(`q${q}_t1`)] ?? '';
      const t2 = row[idx(`q${q}_t2`)] ?? '';
      const t3 = row[idx(`q${q}_t3`)] ?? '';
      const t4 = row[idx(`q${q}_t4`)] ?? '';
      const key = keyMap[q] || { t1:'', t3:'' };
      const cat = CLASSIFY_FT(t1, t2, t3, t4, key.t1, key.t3);
      out.push(cat);
      if (cat in counts) counts[cat]++;
      if (cat === 'MC') mcList.push('q'+q);
      if (String(t1).trim() === key.t1) correctT1++;
    }
    out.push(counts.Sound, counts.MC, counts.Guessing, counts['No-K'], counts.Sound, correctT1, mcList.join(','));
    outRows.push(out);
  }

  const outName = sheetName + '_Scored';
  let dst = ss.getSheetByName(outName);
  if (!dst) dst = ss.insertSheet(outName); else dst.clear();
  dst.getRange(1, 1, outRows.length, outHeader.length).setValues(outRows);
  dst.getRange(1, 1, 1, outHeader.length).setFontWeight('bold').setBackground('#fef3c7');
  dst.setFrozenRows(1);
  SpreadsheetApp.getUi().alert(`✅ ${outName} · ประมวลผล ${outRows.length-1} แถว`);
}

function scoreAllCalc() { [2,3,4,5,6,7,8,9].forEach(n => scoreCalc_(n)); SpreadsheetApp.getUi().alert('✅ Score Calc ครบทุกแผน'); }
function scoreAllSpot() { [1,2,3,4,5,6,7,8,9].forEach(n => scoreSpot_(n)); SpreadsheetApp.getUi().alert('✅ Score Spot ครบทุกแผน'); }

function scoreCalc_(planNum) {
  const ss = SpreadsheetApp.getActive();
  const src = ss.getSheetByName(`Calc_P${planNum}`);
  const keySh = ss.getSheetByName(`KEY_Calc_P${planNum}`);
  if (!src || !keySh) return;
  const keys = keySh.getRange(2,1,keySh.getLastRow()-1,4).getValues()
    .filter(r => r[0] !== '' && r[1] !== '');
  if (keys.length === 0) return;

  const data = src.getDataRange().getValues();
  if (data.length < 2) return;
  const header = data[0];
  const idx = n => header.indexOf(n);

  const outHeader = ['timestamp','s_name','s_num','s_room','s_grp'];
  keys.forEach(([q]) => outHeader.push(`q${q}_ans_score`,`q${q}_unit_score`,`q${q}_total`));
  outHeader.push('sum_ans','sum_unit','sum_total','max');

  const out = [outHeader];
  for (let i=1; i<data.length; i++) {
    const row = data[i];
    const r = [row[idx('timestamp')]||row[0]||'', row[idx('s_name')]||'', row[idx('s_num')]||'', row[idx('s_room')]||'', row[idx('s_grp')]||''];
    let sumA=0, sumU=0, sumT=0;
    keys.forEach(([q, numKey, unitKey, tol]) => {
      const ans = row[idx(`q${q}_ans`)] ?? '';
      const [[a,u,t]] = CALC_SCORE(ans, numKey, unitKey, tol);
      r.push(a, u, t); sumA+=a; sumU+=u; sumT+=t;
    });
    r.push(sumA, sumU, sumT, keys.length*2);
    out.push(r);
  }

  const outName = `Calc_P${planNum}_Scored`;
  let dst = ss.getSheetByName(outName);
  if (!dst) dst = ss.insertSheet(outName); else dst.clear();
  dst.getRange(1,1,out.length,outHeader.length).setValues(out);
  dst.getRange(1,1,1,outHeader.length).setFontWeight('bold').setBackground('#dcfce7');
  dst.setFrozenRows(1);
}

function scoreSpot_(planNum) {
  const ss = SpreadsheetApp.getActive();
  const src = ss.getSheetByName(`Spot_P${planNum}`);
  const keySh = ss.getSheetByName(`KEY_Spot_P${planNum}`);
  if (!src || !keySh) return;
  const keys = keySh.getRange(2,1,keySh.getLastRow()-1,3).getValues()
    .filter(r => r[0] !== '' && (r[1] || r[2]));
  if (keys.length === 0) return;

  const data = src.getDataRange().getValues();
  if (data.length < 2) return;
  const header = data[0];
  const idx = n => header.indexOf(n);

  const outHeader = ['timestamp','s_name','s_num','s_room','s_grp'];
  keys.forEach(([q]) => outHeader.push(`q${q}_identify`,`q${q}_correct`,`q${q}_sub`));
  outHeader.push('sum_identify','sum_correct','sum_total');

  const out = [outHeader];
  for (let i=1; i<data.length; i++) {
    const row = data[i];
    const r = [row[idx('timestamp')]||row[0]||'', row[idx('s_name')]||'', row[idx('s_num')]||'', row[idx('s_room')]||'', row[idx('s_grp')]||''];
    let sI=0, sC=0;
    keys.forEach(([q, idKw, corKw]) => {
      // รองรับทั้ง schema q{n}_identify+q{n}_correct และ q{n}_ans เดี่ยว
      const idText = (row[idx(`q${q}_identify`)] ?? row[idx(`q${q}_ans`)] ?? '');
      const corText = (row[idx(`q${q}_correct`)] ?? row[idx(`q${q}_ans`)] ?? '');
      const a = SPOT_MATCH(idText, idKw);
      const b = SPOT_MATCH(corText, corKw);
      r.push(a, b, a+b); sI+=a; sC+=b;
    });
    r.push(sI, sC, sI+sC);
    out.push(r);
  }

  const outName = `Spot_P${planNum}_Scored`;
  let dst = ss.getSheetByName(outName);
  if (!dst) dst = ss.insertSheet(outName); else dst.clear();
  dst.getRange(1,1,out.length,outHeader.length).setValues(out);
  dst.getRange(1,1,1,outHeader.length).setFontWeight('bold').setBackground('#fee2e2');
  dst.setFrozenRows(1);
}

// ─────────────────────────────────────────────────────────────
// PRE-POST GAIN REPORT
// ─────────────────────────────────────────────────────────────

function buildGainReport() {
  const ss = SpreadsheetApp.getActive();
  const pre = ss.getSheetByName('FT01_Scored');
  const post = ss.getSheetByName('FT02_Scored');
  if (!pre || !post) { SpreadsheetApp.getUi().alert('❌ ต้อง Score FT01 และ FT02 ก่อน'); return; }

  const preData = pre.getDataRange().getValues();
  const postData = post.getDataRange().getValues();
  const hPre = preData[0], hPost = postData[0];
  const iPre = n => hPre.indexOf(n), iPost = n => hPost.indexOf(n);

  // index by s_num+s_room (ถ้าไม่มี s_num ใช้ s_name)
  const keyOf = row => (row[iPre('s_num')] || row[iPre('s_name')]) + '|' + (row[iPre('s_room')]||'');
  const keyOfPost = row => (row[iPost('s_num')] || row[iPost('s_name')]) + '|' + (row[iPost('s_room')]||'');

  const preMap = {};
  for (let i=1; i<preData.length; i++) preMap[keyOf(preData[i])] = preData[i];

  const out = [['s_name','s_num','s_room','pre_Sound','post_Sound','pre_MC','post_MC','N_gain','MC_reduced']];
  for (let i=1; i<postData.length; i++) {
    const rPost = postData[i];
    const rPre = preMap[keyOfPost(rPost)];
    if (!rPre) continue;
    const preSound = Number(rPre[iPre('Sound')])||0;
    const postSound = Number(rPost[iPost('Sound')])||0;
    const preMC = Number(rPre[iPre('MC')])||0;
    const postMC = Number(rPost[iPost('MC')])||0;
    const gain = N_GAIN(preSound, postSound, 20);
    out.push([
      rPost[iPost('s_name')]||'',
      rPost[iPost('s_num')]||'',
      rPost[iPost('s_room')]||'',
      preSound, postSound, preMC, postMC, gain, preMC - postMC
    ]);
  }
  let dst = ss.getSheetByName('Report_Gain');
  if (!dst) dst = ss.insertSheet('Report_Gain'); else dst.clear();
  dst.getRange(1,1,out.length,out[0].length).setValues(out);
  dst.getRange(1,1,1,out[0].length).setFontWeight('bold').setBackground('#e0e7ff');
  dst.setFrozenRows(1);
  SpreadsheetApp.getUi().alert(`✅ Report_Gain · ${out.length-1} นักเรียน`);
}

// ═════════════════════════════════════════════════════════════
// GEMINI VISION · Auto-grade canvas drawings (0-3 rubric)
// ═════════════════════════════════════════════════════════════

const GEMINI_MODEL = 'gemini-flash-latest';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const CANVAS_BATCH_SIZE = 10;
const CANVAS_BATCH_DELAY_MS = 4000;
const CONFIDENCE_THRESHOLD = 0.8;
const CANVAS_PLANS = [1,2,3,4,5,6,7,8,9];

// แบบ canvas · ใช้เลือก prompt template
const CANVAS_TYPES = {
  arrow: 'ลูกศรแสดงทิศการเคลื่อนที่/แรง',
  graph_yt: 'กราฟ y-t (การกระจัด-เวลา)',
  graph_yx: 'กราฟ y-x (การกระจัด-ตำแหน่ง)',
  wavefront: 'หน้าคลื่นและทิศการเคลื่อนที่',
  freeform: 'ภาพอธิบายอิสระ',
};

// ─────────────────────────────────────────────────────────────
// Custom function · ใช้เป็นสูตรใน cell
// =GEMINI_VISION_SCORE(A2, "ลูกศรชี้ขึ้น 3 อัน", "arrow")
// คืน "score|confidence|note"  (ใช้ SPLIT แยก 3 คอลัมน์)
// ─────────────────────────────────────────────────────────────
/**
 * @param {string} imageUrl  Drive URL หรือ file ID
 * @param {string} expected  คำอธิบาย expected answer
 * @param {string} canvasType  arrow|graph_yt|graph_yx|wavefront|freeform
 * @return {string}  "score|conf|note"
 * @customfunction
 */
function GEMINI_VISION_SCORE(imageUrl, expected, canvasType) {
  if (!imageUrl || !expected) return '';
  try {
    const r = scoreCanvasOnce_(imageUrl, expected, canvasType || 'freeform');
    return `${r.score}|${r.confidence}|${r.note}`;
  } catch (e) {
    return `ERR|0|${e.message}`;
  }
}

// ─────────────────────────────────────────────────────────────
// Core · single-image scorer (cached)
// ─────────────────────────────────────────────────────────────
function scoreCanvasOnce_(imageUrl, expected, canvasType) {
  const fileId = extractDriveFileId_(imageUrl);
  if (!fileId) throw new Error('bad drive url');

  const cacheKey = 'gv:' + Utilities.base64EncodeWebSafe(
    Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, fileId + '|' + expected + '|' + canvasType)
      .map(b => (b+256)%256).map(b => b.toString(16).padStart(2,'0')).join('')
  ).slice(0, 80);
  const cache = CacheService.getScriptCache();
  const hit = cache.get(cacheKey);
  if (hit) return JSON.parse(hit);

  const b64 = fetchDriveImageBase64_(fileId);
  const prompt = buildCanvasPrompt_(expected, canvasType);
  const raw = callVisionAPI_(b64.data, b64.mimeType, prompt);
  const parsed = parseVisionJson_(raw);
  cache.put(cacheKey, JSON.stringify(parsed), 21600); // 6 ชม.
  return parsed;
}

// ─────────────────────────────────────────────────────────────
// Drive helpers
// ─────────────────────────────────────────────────────────────
function extractDriveFileId_(s) {
  const str = String(s).trim();
  if (/^[a-zA-Z0-9_-]{20,}$/.test(str)) return str;
  const m = str.match(/[-\w]{25,}/);
  return m ? m[0] : null;
}

function fetchDriveImageBase64_(fileId) {
  const file = DriveApp.getFileById(fileId);
  const blob = file.getBlob();
  return {
    data: Utilities.base64Encode(blob.getBytes()),
    mimeType: blob.getContentType() || 'image/png',
  };
}

// ─────────────────────────────────────────────────────────────
// Prompts · 5 templates (rubric-aligned · JSON output)
// ─────────────────────────────────────────────────────────────
function buildCanvasPrompt_(expected, canvasType) {
  const rubric = [
    'คุณคือครูฟิสิกส์ผู้ช่วยตรวจภาพวาดของนักเรียน · ตอบเป็น JSON เท่านั้น',
    '',
    'Rubric (0-3):',
    '  0 = ไม่ได้วาด · วาดไม่เกี่ยวข้อง · เส้นสะเปะสะปะไม่มีโครงสร้าง',
    '  1 = วาดแต่มโนทัศน์ผิด (เช่น ทิศกลับด้าน · รูปกราฟผิดประเภท · หน้าคลื่นผิดทิศ)',
    '  2 = ถูกบางส่วน — element หลักถูก แต่มีรายละเอียดผิด (เช่น ทิศถูกแต่จำนวน/ขนาด/spacing ผิด)',
    '  3 = ถูกครบตาม expected · อนุญาต minor artifacts (เส้นไม่เนียน · สีไม่ตรง)',
    '',
    'Confidence (0.0-1.0):',
    '  ถ้าภาพพร่ามัว · ไม่ชัด · ambiguous → ต่ำกว่า 0.8 (ครูจะ review เอง)',
    '  ถ้ามั่นใจแยกได้ชัดเจนว่าอยู่ระดับไหน → 0.9+',
    '',
  ];

  const byType = {
    arrow: [
      'ประเภทภาพ: ลูกศรแสดงทิศการเคลื่อนที่หรือแรง',
      'ตรวจ: (1) ทิศของลูกศร (2) จำนวนลูกศร (3) ขนาด/ความยาวลูกศร (4) ตำแหน่งต้นลูกศร',
      'หมายเหตุ: นักเรียนอาจเรียก "ทิศการเคลื่อนที่" · ระวัง ทิศ vs ทิศตรงข้าม',
    ],
    graph_yt: [
      'ประเภทภาพ: กราฟ y-t (แกน x = เวลา, แกน y = การกระจัด)',
      'ตรวจ: (1) รูปร่าง (sine/cosine/เส้นตรง/step) (2) จำนวนคาบ (3) amplitude คงที่หรือเปลี่ยน (4) จุดเริ่มต้นที่ t=0',
    ],
    graph_yx: [
      'ประเภทภาพ: กราฟ y-x (snapshot ของคลื่นที่เวลาหนึ่ง)',
      'ตรวจ: (1) รูปร่างคลื่น (2) wavelength สม่ำเสมอ (3) amplitude (4) phase/ตำแหน่งสันคลื่น',
      'ระวัง: อย่าสับสน y-x กับ y-t · y-x คือภาพถ่ายคลื่น ณ เวลาเดียว',
    ],
    wavefront: [
      'ประเภทภาพ: หน้าคลื่น (wavefront) และทิศการเคลื่อนที่',
      'ตรวจ: (1) หน้าคลื่นขนานหรือเป็นวงกลม (2) spacing ระหว่างหน้าคลื่น = λ สม่ำเสมอ',
      '      (3) ลูกศรทิศการเคลื่อนที่ตั้งฉากกับหน้าคลื่น (4) ทิศถูกตาม context ของโจทย์',
      'Vocabulary: "หน้าคลื่น" = เส้นที่เชื่อมจุดเฟสเดียวกัน · "ทิศการเคลื่อนที่" ⊥ หน้าคลื่น',
    ],
    freeform: [
      'ประเภทภาพ: ภาพอธิบายอิสระ (นักเรียนอาจวาด + เขียน label)',
      'ตรวจ: (1) มี element ครบตาม expected หรือไม่ (2) label/ลูกศรชี้ถูกจุด (3) ความสัมพันธ์ถูกต้องเชิงมโนทัศน์',
    ],
  };

  const typeLines = byType[canvasType] || byType.freeform;
  return rubric.concat(typeLines).concat([
    '',
    'Expected (สิ่งที่ต้องวาด):',
    expected,
    '',
    'ตอบกลับเป็น JSON เท่านั้น · ไม่มี markdown · ไม่มีคำอธิบายรอบ JSON:',
    '{"score": 0|1|2|3, "confidence": 0.0-1.0, "note": "เหตุผลสั้นๆ ภาษาไทย <=80 ตัวอักษร"}',
  ]).join('\n');
}

// ─────────────────────────────────────────────────────────────
// API call · switch จุดนี้เพื่อเปลี่ยนเป็น Claude ได้
// ─────────────────────────────────────────────────────────────
function callVisionAPI_(base64Data, mimeType, prompt) {
  const key = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (!key) throw new Error('GEMINI_API_KEY not set in Script properties');

  const body = {
    contents: [{
      parts: [
        { inline_data: { mime_type: mimeType, data: base64Data } },
        { text: prompt },
      ],
    }],
    generationConfig: {
      temperature: 0.0,
      responseMimeType: 'application/json',
    },
  };

  const res = UrlFetchApp.fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(key)}`, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(body),
    muteHttpExceptions: true,
  });
  const code = res.getResponseCode();
  const text = res.getContentText();
  if (code !== 200) throw new Error(`Gemini ${code}: ${text.slice(0,200)}`);
  const json = JSON.parse(text);
  const candidate = json.candidates && json.candidates[0];
  const partText = candidate && candidate.content && candidate.content.parts && candidate.content.parts[0].text;
  if (!partText) throw new Error('empty response');
  return partText;
}

function parseVisionJson_(txt) {
  let s = String(txt).trim();
  if (s.startsWith('```')) s = s.replace(/^```(?:json)?\s*/,'').replace(/```$/,'').trim();
  let obj;
  try { obj = JSON.parse(s); }
  catch (e) {
    const m = s.match(/\{[\s\S]*\}/);
    obj = m ? JSON.parse(m[0]) : { score: 0, confidence: 0, note: 'parse error' };
  }
  const score = Math.max(0, Math.min(3, Number(obj.score)||0));
  const conf = Math.max(0, Math.min(1, Number(obj.confidence)||0));
  const note = String(obj.note || '').slice(0, 120);
  return { score, confidence: conf, note };
}

// ─────────────────────────────────────────────────────────────
// Canvas key sheets
// ─────────────────────────────────────────────────────────────
function initCanvasKeySheet() {
  const ss = SpreadsheetApp.getActive();
  CANVAS_PLANS.forEach(n => {
    const name = `KEY_Canvas_P${n}`;
    if (ss.getSheetByName(name)) return;
    const s = ss.insertSheet(name);
    s.getRange(1,1,1,5).setValues([['q','canvas_type','expected','rubric_notes','url_col']]).setFontWeight('bold');
    const samples = {
      1: [
        [1,'freeform','คลื่นน้ำเคลื่อนที่เป็นวงกลมรอบจุดกำเนิด · ทุกทิศทาง · ไม่ใช่เส้นตรง','M1.3','canvas_canvas1_url'],
        [2,'freeform','คาบ T = ช่วงเวลาครบ 1 รอบ · หน่วยวินาที · ไม่ใช่ระยะทาง','M1.4','canvas_canvas2_url'],
        [3,'graph_yx','กราฟ y-x (ไม่ใช่ y-t) · λ เป็นระยะบนแกน x (เมตร) · ระหว่างยอดคลื่นถัดกัน','M1.4','canvas_canvas3_url'],
        [4,'wavefront','หน้าคลื่นเสียงทรงกลม · เดินทาง 360° ทุกทิศจากลำโพง · ไม่ใช่ทิศเดียว','M1.3','canvas_canvas4_url'],
      ],
    };
    const sample = samples[n] || [
      [1,'freeform','(กรอก expected ของข้อ 1)','','canvas_canvas1_url'],
      [2,'freeform','(กรอก expected ของข้อ 2)','','canvas_canvas2_url'],
      [3,'freeform','(กรอก expected ของข้อ 3)','','canvas_canvas3_url'],
    ];
    s.getRange(2,1,sample.length,5).setValues(sample);
    s.setColumnWidths(1,1,40); s.setColumnWidths(3,1,360);
    s.setFrozenRows(1);
  });
  SpreadsheetApp.getUi().alert('✅ สร้าง KEY_Canvas_P1..P9 แล้ว · กรอก expected ก่อนรัน Score Canvas');
}

// ─────────────────────────────────────────────────────────────
// Batch scorer · รัน 10 ภาพต่อรอบ · cache · resume ได้
// ─────────────────────────────────────────────────────────────
function scoreAllCanvas() {
  const ss = SpreadsheetApp.getActive();
  let totalScored = 0, totalSkipped = 0, totalFlagged = 0;
  const log = [];
  CANVAS_PLANS.forEach(n => {
    const r = scoreCanvasPlan_(n);
    totalScored += r.scored; totalSkipped += r.skipped; totalFlagged += r.flagged;
    if (r.scored + r.skipped > 0) log.push(`P${n}: ${r.scored} scored · ${r.flagged} low-conf · ${r.skipped} skipped`);
  });
  SpreadsheetApp.getUi().alert(
    `✅ Canvas scoring เสร็จ\n` +
    `• ให้คะแนน ${totalScored} ภาพ\n` +
    `• flag ครู review ${totalFlagged} (conf<${CONFIDENCE_THRESHOLD})\n` +
    `• ข้าม ${totalSkipped} (ไม่มี URL/มีคะแนนอยู่แล้ว)\n\n` +
    log.join('\n')
  );
}

function scoreCanvasPlan_(planNum) {
  const ss = SpreadsheetApp.getActive();
  const src = ss.getSheetByName(`Spot_P${planNum}`);
  const keySh = ss.getSheetByName(`KEY_Canvas_P${planNum}`);
  if (!src || !keySh) return { scored:0, skipped:0, flagged:0 };
  const keys = keySh.getRange(2,1,Math.max(keySh.getLastRow()-1,0),5).getValues()
    .filter(r => r[0] !== '' && r[2]);
  if (keys.length === 0) return { scored:0, skipped:0, flagged:0 };

  const data = src.getDataRange().getValues();
  if (data.length < 2) return { scored:0, skipped:0, flagged:0 };
  const header = data[0];
  const idx = n => header.indexOf(n);

  // prep output sheet
  const outName = `Spot_P${planNum}_Canvas_Scored`;
  let dst = ss.getSheetByName(outName);
  const outHeader = ['timestamp','s_name','s_num','s_room'];
  keys.forEach(([q]) => outHeader.push(`q${q}_score`,`q${q}_conf`,`q${q}_note`));
  outHeader.push('needs_review');
  if (!dst) {
    dst = ss.insertSheet(outName);
    dst.getRange(1,1,1,outHeader.length).setValues([outHeader]).setFontWeight('bold').setBackground('#e0e7ff');
    dst.setFrozenRows(1);
  }

  // map existing output by student key (resume support)
  const existing = dst.getDataRange().getValues();
  const existHeader = existing[0] || outHeader;
  const ei = n => existHeader.indexOf(n);
  const existMap = {};
  for (let i=1; i<existing.length; i++) {
    const k = (existing[i][ei('s_num')]||'') + '|' + (existing[i][ei('timestamp')]||'');
    existMap[k] = { rowIndex: i+1, row: existing[i] };
  }

  let scored = 0, skipped = 0, flagged = 0;
  let callsThisBatch = 0;

  for (let i=1; i<data.length; i++) {
    const row = data[i];
    const sKey = (row[idx('s_num')]||'') + '|' + (row[idx('timestamp')]||row[0]||'');
    const prev = existMap[sKey];

    const outRow = [
      row[idx('timestamp')]||row[0]||'',
      row[idx('s_name')]||'',
      row[idx('s_num')]||'',
      row[idx('s_room')]||'',
    ];
    let needsReview = false, hadAnyCall = false;

    keys.forEach(([q, canvasType, expected, rubricNotes, urlColName]) => {
      const urlCol = idx(urlColName || `q${q}_canvas_url`);
      const url = urlCol >= 0 ? row[urlCol] : '';
      // ถ้ามีคะแนนเก่าใน dst แล้ว · ข้าม (resume)
      const prevScore = prev ? prev.row[ei(`q${q}_score`)] : '';
      if (prev && prevScore !== '' && prevScore !== null && prevScore !== 'ERR') {
        outRow.push(prevScore, prev.row[ei(`q${q}_conf`)], prev.row[ei(`q${q}_note`)]);
        if (Number(prev.row[ei(`q${q}_conf`)]) < CONFIDENCE_THRESHOLD) needsReview = true;
        return;
      }
      if (!url) { outRow.push('', '', ''); return; }

      // rate limit
      if (callsThisBatch >= CANVAS_BATCH_SIZE) {
        Utilities.sleep(CANVAS_BATCH_DELAY_MS);
        callsThisBatch = 0;
      }
      try {
        const r = scoreCanvasOnce_(url, expected, canvasType);
        outRow.push(r.score, r.confidence, r.note);
        if (r.confidence < CONFIDENCE_THRESHOLD) { needsReview = true; flagged++; }
        scored++; hadAnyCall = true; callsThisBatch++;
      } catch (e) {
        outRow.push('ERR', 0, String(e.message).slice(0,80));
        needsReview = true;
      }
    });

    outRow.push(needsReview ? 'TRUE' : 'FALSE');

    if (prev) {
      dst.getRange(prev.rowIndex, 1, 1, outRow.length).setValues([outRow]);
    } else {
      dst.appendRow(outRow);
    }
    if (!hadAnyCall) skipped++;
  }

  // Conditional-format needs_review column
  const reviewCol = outHeader.indexOf('needs_review') + 1;
  const lastRow = dst.getLastRow();
  if (lastRow > 1) {
    const rng = dst.getRange(2, reviewCol, lastRow-1, 1);
    dst.setConditionalFormatRules([
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('TRUE').setBackground('#fecaca').setRanges([rng]).build()
    ]);
  }
  return { scored, skipped, flagged };
}

