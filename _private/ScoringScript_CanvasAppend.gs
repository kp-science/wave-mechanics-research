// ═════════════════════════════════════════════════════════════
// 👁️ GEMINI VISION · Auto-grade canvas drawings (0-3 rubric)
// วิธีติดตั้ง: Append ส่วนนี้ท้ายไฟล์ ScoringScript.gs ที่มีอยู่แล้ว
// แล้วแก้ onOpen() ให้เพิ่ม 2 menu items (ดูด้านล่างสุด)
// ═════════════════════════════════════════════════════════════

const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const CANVAS_BATCH_SIZE = 10;
const CANVAS_BATCH_DELAY_MS = 4000;
const CONFIDENCE_THRESHOLD = 0.8;
const CANVAS_PLANS = [1,2,3,4,5,6,7,8,9];

const CANVAS_TYPES = {
  arrow: 'ลูกศรแสดงทิศการเคลื่อนที่/แรง',
  graph_yt: 'กราฟ y-t (การกระจัด-เวลา)',
  graph_yx: 'กราฟ y-x (การกระจัด-ตำแหน่ง)',
  wavefront: 'หน้าคลื่นและทิศการเคลื่อนที่',
  freeform: 'ภาพอธิบายอิสระ',
};

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
  cache.put(cacheKey, JSON.stringify(parsed), 21600);
  return parsed;
}

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

function initCanvasKeySheet() {
  const ss = SpreadsheetApp.getActive();
  CANVAS_PLANS.forEach(n => {
    const name = `KEY_Canvas_P${n}`;
    if (ss.getSheetByName(name)) return;
    const s = ss.insertSheet(name);
    s.getRange(1,1,1,4).setValues([['q','canvas_type','expected','rubric_notes']]).setFontWeight('bold');
    const sample = [
      [1,'arrow','ลูกศรชี้ขึ้น 3 อัน ขนาดเท่ากัน ตำแหน่งห่างสม่ำเสมอ','ทิศต้องเป็นแนวตั้ง · ไม่เฉียง'],
      [2,'graph_yt','กราฟ sine 2 คาบ amplitude คงที่ เริ่มที่ y=0','แกน x=t · y=การกระจัด'],
      [3,'wavefront','หน้าคลื่นขนานเส้นตรง 4-5 เส้น · ลูกศรทิศตั้งฉาก','spacing สม่ำเสมอ = λ'],
    ];
    s.getRange(2,1,sample.length,4).setValues(sample);
    s.setColumnWidths(1,1,40); s.setColumnWidths(3,1,360);
    s.setFrozenRows(1);
  });
  SpreadsheetApp.getUi().alert('✅ สร้าง KEY_Canvas_P1..P9 แล้ว · กรอก expected ก่อนรัน Score Canvas');
}

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
  const keys = keySh.getRange(2,1,Math.max(keySh.getLastRow()-1,0),4).getValues()
    .filter(r => r[0] !== '' && r[2]);
  if (keys.length === 0) return { scored:0, skipped:0, flagged:0 };

  const data = src.getDataRange().getValues();
  if (data.length < 2) return { scored:0, skipped:0, flagged:0 };
  const header = data[0];
  const idx = n => header.indexOf(n);

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

    keys.forEach(([q, canvasType, expected]) => {
      const urlCol = idx(`q${q}_canvas_url`);
      const url = urlCol >= 0 ? row[urlCol] : '';
      const prevScore = prev ? prev.row[ei(`q${q}_score`)] : '';
      if (prev && prevScore !== '' && prevScore !== null) {
        outRow.push(prevScore, prev.row[ei(`q${q}_conf`)], prev.row[ei(`q${q}_note`)]);
        if (Number(prev.row[ei(`q${q}_conf`)]) < CONFIDENCE_THRESHOLD) needsReview = true;
        return;
      }
      if (!url) { outRow.push('', '', ''); return; }

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

/*
═══════════════════════════════════════════════════════════════
⚠️ สำคัญ: แก้ onOpen() ที่มีอยู่ใน ScoringScript เดิม · เพิ่ม 2 บรรทัด

หา:
    .addItem('🔧 สร้าง Key sheets (ครั้งแรก)', 'initKeySheets')

เปลี่ยนเป็น:
    .addItem('🔧 สร้าง Key sheets (ครั้งแรก)', 'initKeySheets')
    .addItem('🖼️ สร้าง Canvas Key sheets', 'initCanvasKeySheet')

และหา:
    .addItem('4️⃣ Score Spot (ทุกแผน)', 'scoreAllSpot')

เพิ่มบรรทัดต่อท้าย:
    .addItem('4️⃣ Score Spot (ทุกแผน)', 'scoreAllSpot')
    .addItem('👁️ Score Canvas (Gemini Vision)', 'scoreAllCanvas')
═══════════════════════════════════════════════════════════════
*/
