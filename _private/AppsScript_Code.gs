// ═══════════════════════════════════════════════════════════════════
// KP-Classroom · Apps Script Backend (v3 · Phase 4)
// ครูโกเมน ปาปะโถ · 2569
// ═══════════════════════════════════════════════════════════════════
// Actions:
//   POST: submit / uploadStudents / updateSetting / deleteSetting /
//         sendFeedback / markRead / verifyPin / verifyAdmin / uploadFile /
//         deleteRow / setCourseStatus / setCanvasScore
//   GET:  info / list / stats / students / settings / feedback / postPlan /
//         verifyAdmin / courseStatus / planStats
// ═══════════════════════════════════════════════════════════════════
// ⚠️ SECURITY (Phase 4):
// ห้าม hardcode รหัสครูในโค้ดนี้ (โค้ดอาจถูกแชร์/fork)
// ต้องตั้ง Script Property ชื่อ 'TEACHER_PASSWORD' ผ่าน:
//   Apps Script Editor → Project Settings (⚙) → Script Properties
// ═══════════════════════════════════════════════════════════════════

// อ่านรหัสครูจาก Script Properties (server-side only)
// Fallback: 'komanepapato2569' เฉพาะครั้งแรกก่อนครูไปตั้ง Property
function getTeacherPassword_() {
  try {
    const pw = PropertiesService.getScriptProperties().getProperty('TEACHER_PASSWORD');
    if (pw && pw.length > 0) return pw;
  } catch(e) {}
  // ⚠️ Fallback — ครูควรตั้ง Script Property แทนค่าตายตัวนี้
  return 'komanepapato2569';
}

// ตรวจรหัส (ใช้แทนการเทียบตรงๆ)
function checkTeacherPassword_(input) {
  return String(input || '') === getTeacherPassword_();
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action || 'submit';
    if (action === 'submit')          return handleSubmit(data);
    if (action === 'uploadStudents')  return handleUploadStudents(data);
    if (action === 'updateSetting')   return handleUpdateSetting(data);
    if (action === 'deleteSetting')   return handleDeleteSetting(data);
    if (action === 'sendFeedback')    return handleSendFeedback(data);
    if (action === 'markRead')        return handleMarkRead(data);
    if (action === 'verifyPin')       return handleVerifyPin(data);
    if (action === 'verifyAdmin')     return handleVerifyAdmin(data);
    if (action === 'setCourseStatus') return handleSetCourseStatus(data);
    if (action === 'uploadFile')      return handleUploadFile(data);
    if (action === 'deleteRow')       return handleDeleteRow(data);
    if (action === 'setCanvasScore')  return handleSetCanvasScore(data);
    return jsonOut({status:'error', message:'unknown action: ' + action});
  } catch (err) {
    return jsonOut({status:'error', message:err.toString()});
  }
}

// Phase 4: verify admin password (server-side)
function handleVerifyAdmin(data) {
  const ok = checkTeacherPassword_(data.teacher_pw);
  return jsonOut({status:'ok', verified: ok});
}

// ═══════════════════════════════════════════════════════════════════
// Course-level status (Phase 5)
// เก็บใน Script Properties · เปิด/ปิดวิชาทั้งวิชาจาก Teacher Dashboard
// ค่า: 'open' | 'coming-soon' | 'closed'
// ═══════════════════════════════════════════════════════════════════
const COURSE_STATUS_KEY = 'COURSE_STATUS';
const COURSE_STATUS_DEFAULT = 'open';

function handleGetCourseStatus() {
  try {
    const v = PropertiesService.getScriptProperties().getProperty(COURSE_STATUS_KEY);
    return jsonOut({status:'ok', course_status: v || COURSE_STATUS_DEFAULT});
  } catch(e) {
    return jsonOut({status:'ok', course_status: COURSE_STATUS_DEFAULT});
  }
}

function handleSetCourseStatus(data) {
  if (!checkTeacherPassword_(data.teacher_pw))
    return jsonOut({status:'error', message:'unauthorized'});
  const v = String(data.course_status || '');
  if (!['open','coming-soon','closed'].includes(v))
    return jsonOut({status:'error', message:'invalid status'});
  PropertiesService.getScriptProperties().setProperty(COURSE_STATUS_KEY, v);
  return jsonOut({status:'ok', course_status: v});
}

// ═══════════════════════════════════════════════════════════════════
// Live Stats (Phase 6) — สำหรับ Teacher "หน้าจอสอน"
// ─────────────────────────────────────────────────────────────────
// Return: { total_students, stats: {
//   '<tool>': { count, dist:{green,yellow,red}? }
// }}
// อ่านทุก sheet ที่ไม่ขึ้นต้น '_' · filter by plan · group by tool field
// เฉพาะ TL → นับสีเขียว/เหลือง/แดง
// ═══════════════════════════════════════════════════════════════════
function handlePlanStats(p) {
  const plan = Number(p.plan || 0);
  if (!plan) return jsonOut({status:'error', message:'plan required'});

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  const stats = {};

  sheets.forEach(sheet => {
    const name = sheet.getName();
    if (name.startsWith('_')) return; // ข้าม _Students, _Settings, _Feedback
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return;
    const width = sheet.getLastColumn();
    const headers = sheet.getRange(1,1,1,width).getValues()[0];
    const planIdx  = headers.indexOf('plan');
    const toolIdx  = headers.indexOf('tool');
    const valueIdx = headers.indexOf('value');
    const phaseIdx = headers.indexOf('phase'); // tl-pre/tl-post อาจใช้ phase แทน tool
    if (planIdx < 0) return;

    const rows = sheet.getRange(2,1,lastRow-1,width).getValues();
    rows.forEach(r => {
      if (Number(r[planIdx]) !== plan) return;
      // หา tool key
      let toolKey = '';
      if (toolIdx >= 0) toolKey = String(r[toolIdx] || '');
      if (!toolKey && phaseIdx >= 0) toolKey = String(r[phaseIdx] || '');
      if (!toolKey) toolKey = name.toLowerCase();
      if (!toolKey) return;

      if (!stats[toolKey]) stats[toolKey] = { count: 0 };
      stats[toolKey].count++;

      // TL color distribution (sheet TL → value = 🟢/🟡/🔴 หรือ green/yellow/red)
      if (name === 'TL' && valueIdx >= 0){
        const val = String(r[valueIdx] || '').trim().toLowerCase();
        stats[toolKey].dist = stats[toolKey].dist || {green:0, yellow:0, red:0};
        if (val.indexOf('🟢') >= 0 || val === 'green' || val === 'g') stats[toolKey].dist.green++;
        else if (val.indexOf('🟡') >= 0 || val === 'yellow' || val === 'y') stats[toolKey].dist.yellow++;
        else if (val.indexOf('🔴') >= 0 || val === 'red' || val === 'r') stats[toolKey].dist.red++;
      }
    });
  });

  // Total students from _Students
  const studentsSheet = ss.getSheetByName('_Students');
  const totalStudents = studentsSheet ? Math.max(0, studentsSheet.getLastRow() - 1) : 0;

  return jsonOut({
    status:'ok',
    plan:plan,
    total_students: totalStudents,
    stats: stats,
    fetched_at: new Date().toISOString()
  });
}

function doGet(e) {
  try {
    const p = e.parameter || {};
    const action = p.action || 'info';
    if (action === 'info')        return handleInfo();
    if (action === 'list')        return handleList(p);
    if (action === 'stats')       return handleStats(p);
    if (action === 'students')    return handleGetStudents();
    if (action === 'settings')    return handleGetSettings();
    if (action === 'feedback')    return handleGetFeedback(p);
    if (action === 'postPlan')    return handlePostPlan(p);
    // Phase 4: admin verify via GET (CORS-safe · client ต้องอ่าน response)
    if (action === 'verifyAdmin') return handleVerifyAdmin({teacher_pw: p.pw});
    // Phase 5: course-level status (Landing อ่านผ่าน GET)
    if (action === 'courseStatus') return handleGetCourseStatus();
    // Phase 6: live plan stats (Teacher หน้าจอสอน)
    if (action === 'planStats')    return handlePlanStats(p);
    return jsonOut({status:'error', message:'unknown action: ' + action});
  } catch (err) {
    return jsonOut({status:'error', message:err.toString()});
  }
}

// ═══════════════════════════════════════════════════════════════════
// [1] SUBMIT
// ═══════════════════════════════════════════════════════════════════
function handleSubmit(data) {
  const sheetName = data.sheet || 'Default';
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) sheet = ss.insertSheet(sheetName);

  const payload = data.payload || {};

  // Inline canvases: upload each to Drive, replace with canvas_<id>_url columns
  if (payload._canvases && typeof payload._canvases === 'object') {
    const wsId = payload._canvas_ws_id || payload.ws_id || 'ws';
    const plan = payload.plan || 0;
    const tool = payload.tool || 'unknown';
    const studentId = payload.student_id || 'unknown';
    const sent = Object.keys(payload._canvases).length;
    let urls = {}, errMsg = '';
    try {
      urls = uploadCanvasPack_(payload._canvases, {wsId, plan, tool, studentId,
        studentName: payload.student_name || '', studentClass: payload.class || ''});
    } catch (err) {
      errMsg = String(err && err.message || err);
    }
    const uploaded = Object.keys(urls).length;
    payload._canvas_debug = `sent=${sent} uploaded=${uploaded}` + (errMsg ? ' err=' + errMsg : '');
    Object.assign(payload, urls);
    delete payload._canvases;
    delete payload._canvas_ws_id;
  }

  const keys = Object.keys(payload);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['timestamp', ...keys]);
    sheet.getRange(1, 1, 1, keys.length + 1)
         .setFontWeight('bold').setBackground('#1565c0').setFontColor('#ffffff')
         .setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = headers.map(h => {
    if (h === 'timestamp') return new Date();
    return payload[h] !== undefined ? payload[h] : '';
  });

  const newKeys = keys.filter(k => !headers.includes(k));
  if (newKeys.length > 0) {
    sheet.getRange(1, headers.length + 1, 1, newKeys.length)
         .setValues([newKeys])
         .setFontWeight('bold').setBackground('#1565c0').setFontColor('#ffffff');
    newKeys.forEach(k => row.push(payload[k]));
  }

  sheet.appendRow(row);
  return jsonOut({status:'ok', row:sheet.getLastRow(), sheet:sheetName});
}

// ═══════════════════════════════════════════════════════════════════
// [2] STUDENTS
// ═══════════════════════════════════════════════════════════════════
function handleUploadStudents(data) {
  if (!checkTeacherPassword_(data.teacher_pw))
    return jsonOut({status:'error', message:'unauthorized'});

  const rows = data.rows || [];
  if (!rows.length) return jsonOut({status:'error', message:'no rows'});

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('_Students');
  if (!sheet) sheet = ss.insertSheet('_Students');
  else sheet.clear();

  const headers = ['student_id','full_name','class','number','pin4','updated'];
  sheet.appendRow(headers);
  sheet.getRange(1,1,1,headers.length)
       .setFontWeight('bold').setBackground('#6a1b9a').setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  const now = new Date();
  const data2 = rows.map(r => [
    String(r.student_id||'').trim(),
    String(r.full_name||'').trim(),
    String(r.class||'').trim(),
    String(r.number||'').trim(),
    String(r.pin4||'').trim(),
    now
  ]).filter(r => r[0] && r[1]);

  if (data2.length) sheet.getRange(2,1,data2.length,headers.length).setValues(data2);
  return jsonOut({status:'ok', count:data2.length});
}

function handleGetStudents() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('_Students');
  if (!sheet || sheet.getLastRow() < 2)
    return jsonOut({status:'ok', count:0, students:[]});

  const lastRow = sheet.getLastRow();
  const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  const rows = sheet.getRange(2,1,lastRow-1,sheet.getLastColumn()).getValues();

  const students = rows.map(r => {
    const o = {};
    headers.forEach((h,i) => o[h] = r[i]);
    return {
      student_id: o.student_id,
      full_name:  o.full_name,
      class:      o.class,
      number:     o.number
    };
  }).filter(s => s.student_id && s.full_name);

  return jsonOut({status:'ok', count:students.length, students:students});
}

function handleVerifyPin(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('_Students');
  if (!sheet) return jsonOut({status:'error', message:'no students'});
  const rows = sheet.getRange(2,1,sheet.getLastRow()-1,sheet.getLastColumn()).getValues();
  const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  const idxId  = headers.indexOf('student_id');
  const idxPin = headers.indexOf('pin4');
  const sid = String(data.student_id || '');
  const pin = String(data.pin4 || '');
  for (let i=0; i<rows.length; i++) {
    if (String(rows[i][idxId]) === sid) {
      const ok = String(rows[i][idxPin]||'') === pin;
      return jsonOut({status:'ok', verified: ok});
    }
  }
  return jsonOut({status:'ok', verified:false});
}

// ═══════════════════════════════════════════════════════════════════
// [3] SETTINGS — v2 schema with scope (Phase 2)
// ─────────────────────────────────────────────────────────────────
// columns: scope, plan, item_id, status, opens_at, closes_at, order, note
//   scope   : 'plan' | 'tool' | 'media'
//   plan    : 1..10 (ถ้า scope='plan' → controls ทั้งแผน)
//   item_id : tool id (เช่น 'poe','f1-pre') หรือ media 'no' (เช่น '01','SIM')
//             ว่างถ้า scope='plan'
//   status  : 'open' | 'locked' | 'preview' | 'readonly'
//   order   : เลขลำดับ (optional · สำหรับ reorder)
// Default: plan-level locked (ยกเว้น plan 1) · tool/media → open ถ้าไม่มี row
// Backward compat: migrate old 5-col schema → 8-col อัตโนมัติ
// ═══════════════════════════════════════════════════════════════════
const SETTINGS_HEADERS = ['scope','plan','item_id','status','opens_at','closes_at','order','note'];

function ensureSettingsSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('_Settings');

  // สร้างใหม่ถ้ายังไม่มี
  if (!sheet) {
    sheet = ss.insertSheet('_Settings');
    sheet.appendRow(SETTINGS_HEADERS);
    sheet.getRange(1,1,1,SETTINGS_HEADERS.length)
         .setFontWeight('bold').setBackground('#2e7d32').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    const defaults = [];
    for (let i=1; i<=10; i++) {
      defaults.push(['plan', i, '', i===1?'open':'locked', '', '', i, '']);
    }
    sheet.getRange(2,1,defaults.length,SETTINGS_HEADERS.length).setValues(defaults);
    return sheet;
  }

  // ── Migration: old 5-col schema → 8-col ──
  const firstHeader = sheet.getRange(1,1).getValue();
  if (firstHeader === 'plan') {
    // เก่า: plan, status, opens_at, closes_at, note
    const lastRow = sheet.getLastRow();
    let oldData = [];
    if (lastRow >= 2) {
      oldData = sheet.getRange(2,1,lastRow-1,5).getValues();
    }
    // เขียน header ใหม่
    sheet.clear();
    sheet.appendRow(SETTINGS_HEADERS);
    sheet.getRange(1,1,1,SETTINGS_HEADERS.length)
         .setFontWeight('bold').setBackground('#2e7d32').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    // migrate rows (scope='plan', item_id='')
    const newRows = oldData.map(r => [
      'plan', r[0], '', r[1]||'locked', r[2]||'', r[3]||'', r[0], r[4]||''
    ]);
    if (newRows.length) {
      sheet.getRange(2,1,newRows.length,SETTINGS_HEADERS.length).setValues(newRows);
    }
  }

  return sheet;
}

function handleGetSettings() {
  const sheet = ensureSettingsSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonOut({status:'ok', settings:[], schema:'v2'});
  const width = SETTINGS_HEADERS.length;
  const headers = sheet.getRange(1,1,1,width).getValues()[0];
  const rows = sheet.getRange(2,1,lastRow-1,width).getValues();
  const settings = rows.map(r => {
    const o = {};
    headers.forEach((h,i) => {
      o[h] = (r[i] instanceof Date) ? r[i].toISOString() : r[i];
    });
    return o;
  });
  return jsonOut({status:'ok', settings:settings, schema:'v2'});
}

function handleUpdateSetting(data) {
  if (!checkTeacherPassword_(data.teacher_pw))
    return jsonOut({status:'error', message:'unauthorized'});
  const sheet = ensureSettingsSheet_();
  const lastRow = sheet.getLastRow();
  const width = SETTINGS_HEADERS.length;
  const rows = lastRow >= 2 ? sheet.getRange(2,1,lastRow-1,width).getValues() : [];

  const scope   = String(data.scope || 'plan');
  const plan    = Number(data.plan);
  const itemId  = String(data.item_id || '');

  // หา row ที่ตรง (scope + plan + item_id)
  for (let i=0; i<rows.length; i++) {
    const r = rows[i];
    if (String(r[0]) === scope && Number(r[1]) === plan && String(r[2]) === itemId) {
      const newRow = [
        scope,
        plan,
        itemId,
        data.status    !== undefined ? data.status    : r[3],
        data.opens_at  !== undefined ? data.opens_at  : r[4],
        data.closes_at !== undefined ? data.closes_at : r[5],
        data.order     !== undefined ? Number(data.order) : r[6],
        data.note      !== undefined ? data.note      : r[7]
      ];
      sheet.getRange(i+2,1,1,width).setValues([newRow]);
      return jsonOut({status:'ok', scope:scope, plan:plan, item_id:itemId, updated:newRow});
    }
  }
  // ไม่เจอ → สร้างใหม่
  sheet.appendRow([
    scope,
    plan,
    itemId,
    data.status    || 'locked',
    data.opens_at  || '',
    data.closes_at || '',
    data.order     !== undefined ? Number(data.order) : (rows.length + 1),
    data.note      || ''
  ]);
  return jsonOut({status:'ok', scope:scope, plan:plan, item_id:itemId, created:true});
}

// ลบ settings row (ใช้เมื่อ admin "reset to default" = คืนค่า open/visible)
function handleDeleteSetting(data) {
  if (!checkTeacherPassword_(data.teacher_pw))
    return jsonOut({status:'error', message:'unauthorized'});
  const sheet = ensureSettingsSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonOut({status:'ok', deleted:false});
  const width = SETTINGS_HEADERS.length;
  const rows = sheet.getRange(2,1,lastRow-1,width).getValues();
  const scope   = String(data.scope || 'plan');
  const plan    = Number(data.plan);
  const itemId  = String(data.item_id || '');
  for (let i=0; i<rows.length; i++) {
    const r = rows[i];
    if (String(r[0]) === scope && Number(r[1]) === plan && String(r[2]) === itemId) {
      sheet.deleteRow(i+2);
      return jsonOut({status:'ok', deleted:true, scope:scope, plan:plan, item_id:itemId});
    }
  }
  return jsonOut({status:'ok', deleted:false});
}

// ═══════════════════════════════════════════════════════════════════
// [4] FEEDBACK
// ═══════════════════════════════════════════════════════════════════
function ensureFeedbackSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('_Feedback');
  if (!sheet) {
    sheet = ss.insertSheet('_Feedback');
    sheet.appendRow(['id','timestamp','to_student_id','to_name','plan','type','message','poe_score','read_at']);
    sheet.getRange(1,1,1,9)
         .setFontWeight('bold').setBackground('#ef6c00').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function handleSendFeedback(data) {
  if (!checkTeacherPassword_(data.teacher_pw))
    return jsonOut({status:'error', message:'unauthorized'});
  const sheet = ensureFeedbackSheet_();
  const id = 'fb_' + new Date().getTime() + '_' + Math.floor(Math.random()*1000);
  sheet.appendRow([
    id,
    new Date(),
    String(data.to_student_id||''),
    String(data.to_name||''),
    Number(data.plan||0),
    data.type || 'manual',
    String(data.message||''),
    data.poe_score !== undefined ? Number(data.poe_score) : '',
    ''
  ]);
  return jsonOut({status:'ok', id:id});
}

function handleGetFeedback(p) {
  const sheet = ensureFeedbackSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonOut({status:'ok', feedback:[]});
  const headers = sheet.getRange(1,1,1,9).getValues()[0];
  const rows = sheet.getRange(2,1,lastRow-1,9).getValues();
  const sid = String(p.student_id||'').trim();
  const list = rows.map(r => {
    const o = {};
    headers.forEach((h,i) => {
      o[h] = (r[i] instanceof Date) ? r[i].toISOString() : r[i];
    });
    return o;
  }).filter(f => !sid || String(f.to_student_id) === sid);
  return jsonOut({status:'ok', count:list.length, feedback:list});
}

function handleMarkRead(data) {
  const sheet = ensureFeedbackSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonOut({status:'error', message:'no feedback'});
  const rows = sheet.getRange(2,1,lastRow-1,9).getValues();
  const fid = String(data.feedback_id||'');
  for (let i=0; i<rows.length; i++) {
    if (String(rows[i][0]) === fid) {
      sheet.getRange(i+2,9).setValue(new Date());
      return jsonOut({status:'ok'});
    }
  }
  return jsonOut({status:'error', message:'not found'});
}

// ═══════════════════════════════════════════════════════════════════
// [5] INFO / LIST / STATS / POSTPLAN
// ═══════════════════════════════════════════════════════════════════
function handleInfo() {
  return jsonOut({
    status:'ok', version:'2.0',
    ss_name: SpreadsheetApp.getActiveSpreadsheet().getName(),
    sheets: SpreadsheetApp.getActiveSpreadsheet().getSheets().map(s => s.getName())
  });
}

function handleList(p) {
  const sheetName = p.sheet;
  if (!sheetName) return jsonOut({status:'error', message:'sheet parameter required'});
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return jsonOut({status:'error', message:'sheet not found'});
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow < 2) return jsonOut({status:'ok', count:0, data:[]});
  const headers = sheet.getRange(1,1,1,lastCol).getValues()[0];
  const rows = sheet.getRange(2,1,lastRow-1,lastCol).getValues();
  const includeRow = (p.withRow === '1' || p.withRow === 1);
  const records = rows.map((r, idx) => {
    const o = {};
    headers.forEach((h,i) => o[h] = (r[i] instanceof Date) ? r[i].toISOString() : r[i]);
    if (includeRow) o._row = idx + 2;  // sheet row (header = 1)
    return o;
  });
  return jsonOut({status:'ok', count:records.length, data:records});
}

// Generic row deletion (teacher only) · ใช้กับ CER Board, ฯลฯ
function handleDeleteRow(data) {
  if (!checkTeacherPassword_(data.teacher_pw))
    return jsonOut({status:'error', message:'unauthorized'});
  const sheetName = data.sheet;
  const rowNum = Number(data.row || 0);
  if (!sheetName || rowNum < 2)
    return jsonOut({status:'error', message:'invalid params'});
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return jsonOut({status:'error', message:'sheet not found'});
  if (rowNum > sheet.getLastRow())
    return jsonOut({status:'error', message:'row out of range'});
  sheet.deleteRow(rowNum);
  return jsonOut({status:'ok'});
}

function handleStats(p) {
  const sheetName = p.sheet;
  if (!sheetName) return jsonOut({status:'error', message:'sheet parameter required'});
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return jsonOut({status:'error', message:'sheet not found'});
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow < 2) return jsonOut({status:'ok', count:0, overall:{}, by_question:{}, normalized_gain:{}});

  const headers = sheet.getRange(1,1,1,lastCol).getValues()[0];
  const rows = sheet.getRange(2,1,lastRow-1,lastCol).getValues();
  const records = rows.map(r => { const o={}; headers.forEach((h,i)=>o[h]=r[i]); return o; });

  const cats = {Sound:0, Misconception:0, Guessing:0, 'No-K':0};
  const byQ = {};
  const byPhase = {pre:{}, post:{}};
  records.forEach(r => {
    Object.keys(r).forEach(k => {
      if (k.endsWith('_category')) {
        const q = k.replace('_category','');
        const cat = r[k];
        if (!byQ[q]) byQ[q] = {Sound:0,Misconception:0,Guessing:0,'No-K':0,total:0};
        if (byQ[q][cat] !== undefined) { byQ[q][cat]++; byQ[q].total++; }
        if (cats[cat] !== undefined) cats[cat]++;
        const ph = r.phase || 'unknown';
        if (byPhase[ph]) {
          if (!byPhase[ph][q]) byPhase[ph][q] = {Sound:0,Misconception:0,Guessing:0,'No-K':0,total:0};
          if (byPhase[ph][q][cat] !== undefined) { byPhase[ph][q][cat]++; byPhase[ph][q].total++; }
        }
      }
    });
  });
  const gain = {};
  Object.keys(byPhase.pre).forEach(q => {
    if (byPhase.post[q]) {
      const prePct = byPhase.pre[q].Sound/(byPhase.pre[q].total||1)*100;
      const postPct = byPhase.post[q].Sound/(byPhase.post[q].total||1)*100;
      gain[q] = {
        pre_sound_pct: +prePct.toFixed(1),
        post_sound_pct: +postPct.toFixed(1),
        normalized_gain: prePct < 100 ? +((postPct-prePct)/(100-prePct)).toFixed(3) : null
      };
    }
  });
  return jsonOut({status:'ok', count:records.length, overall:cats, by_question:byQ, by_phase:byPhase, normalized_gain:gain});
}

function handlePostPlan(p) {
  const plan = Number(p.plan||0);
  if (!plan) return jsonOut({status:'error', message:'plan required'});
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const summary = {plan:plan, tools:{}};
  ['TL_P'+plan+'_pre','TL_P'+plan+'_post','F_Pre_P'+plan,'F_Post_P'+plan,'POE_P'+plan,'MJ_P'+plan].forEach(name => {
    const s = ss.getSheetByName(name);
    if (s && s.getLastRow() > 1) summary.tools[name] = s.getLastRow()-1;
  });
  return jsonOut({status:'ok', summary:summary});
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ═══════════════════════════════════════════════════════════════════
// uploadCanvasPack_ — upload canvases ในชุด submit · คืน {canvas_<id>_url: url}
// ═══════════════════════════════════════════════════════════════════
function uploadCanvasPack_(pack, ctx) {
  const out = {};
  const rootName = 'Uploads_วิจัยคลื่นกล';
  let root;
  const rs = DriveApp.getFoldersByName(rootName);
  root = rs.hasNext() ? rs.next() : DriveApp.createFolder(rootName);
  const planName = 'แผน' + (ctx.plan || 0);
  const ps = root.getFoldersByName(planName);
  const planFolder = ps.hasNext() ? ps.next() : root.createFolder(planName);
  const ts = Utilities.formatDate(new Date(), 'Asia/Bangkok', 'yyyyMMdd_HHmmss');
  Object.keys(pack).forEach(cid => {
    try {
      const item = pack[cid];
      if (!item || !item.data) return;
      const mime = item.mime || 'image/png';
      const ext = mime === 'image/jpeg' ? 'jpg' : 'png';
      const name = `${ctx.studentId}_${ctx.wsId}_${cid}_${ts}.${ext}`;
      const blob = Utilities.newBlob(Utilities.base64Decode(item.data), mime, name);
      const file = planFolder.createFile(blob);
      out['canvas_' + String(cid).replace(/-/g, '_') + '_url'] = file.getUrl();
    } catch (err) {
      out['canvas_' + String(cid).replace(/-/g, '_') + '_err'] = String(err && err.message || err).slice(0, 200);
    }
  });
  return out;
}

// ═══════════════════════════════════════════════════════════════════
// handleUploadFile — รับไฟล์ใบงาน (Base64) บันทึกลง Google Drive
// โฟลเดอร์: Uploads_วิจัยคลื่นกล / แผน{N} / {student_id}_{tool}.ext
// ═══════════════════════════════════════════════════════════════════
function handleUploadFile(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const studentId   = data.student_id || 'unknown';
  const studentName = data.student_name || '';
  const studentClass= data.student_class || '';
  const plan        = data.plan || 0;
  const tool        = data.tool || 'unknown';
  const filename    = data.filename || 'upload';
  const mimeType    = data.mimeType || 'application/pdf';
  const base64      = data.data || '';

  if (!base64) return jsonOut({status:'error', message:'ไม่มีข้อมูลไฟล์'});

  // 1) สร้าง/หา Root folder
  const rootFolderName = 'Uploads_วิจัยคลื่นกล';
  let rootFolder;
  const rootSearch = DriveApp.getFoldersByName(rootFolderName);
  if (rootSearch.hasNext()) {
    rootFolder = rootSearch.next();
  } else {
    rootFolder = DriveApp.createFolder(rootFolderName);
  }

  // 2) สร้าง/หา sub-folder ตามแผน
  const planFolderName = 'แผน' + plan;
  let planFolder;
  const planSearch = rootFolder.getFoldersByName(planFolderName);
  if (planSearch.hasNext()) {
    planFolder = planSearch.next();
  } else {
    planFolder = rootFolder.createFolder(planFolderName);
  }

  // 3) สร้างไฟล์ใน Drive
  const decoded = Utilities.base64Decode(base64);
  const blob = Utilities.newBlob(decoded, mimeType,
    studentId + '_' + tool + '_' + Utilities.formatDate(new Date(), 'Asia/Bangkok', 'yyyyMMdd_HHmmss') + '_' + filename
  );
  const file = planFolder.createFile(blob);
  const fileUrl = file.getUrl();

  // 4) บันทึก log ใน Sheet "Uploads"
  let logSheet = ss.getSheetByName('Uploads');
  if (!logSheet) {
    logSheet = ss.insertSheet('Uploads');
    logSheet.appendRow(['timestamp','student_id','student_name','class','plan','tool','filename','mimeType','drive_url']);
  }
  logSheet.appendRow([
    new Date(),
    studentId,
    studentName,
    studentClass,
    plan,
    tool,
    filename,
    mimeType,
    fileUrl
  ]);

  return jsonOut({status:'ok', url: fileUrl});
}

// ═══════════════════════════════════════════════════════════════════
// [6] CANVAS SCORE — ครูให้คะแนน rubric 0-3 ผ่าน Gallery UI
// ─────────────────────────────────────────────────────────────────
// Request: { action:'setCanvasScore', teacher_pw, sheet, row, col, score }
//   sheet : ชื่อ sheet (เช่น 'Spot_P1')
//   row   : row number (1-based · row 1 = header · ต้อง ≥ 2)
//   col   : ชื่อคอลัมน์ (เช่น 'canvas_q1_score') · ถ้ายังไม่มี จะ append header ใหม่
//   score : 0|1|2|3
// ═══════════════════════════════════════════════════════════════════
function handleSetCanvasScore(data) {
  if (!checkTeacherPassword_(data.teacher_pw))
    return jsonOut({status:'error', message:'unauthorized'});
  const sheetName = String(data.sheet || '').trim();
  const rowNum    = parseInt(data.row, 10);
  const col       = String(data.col || '').trim();
  const score     = Number(data.score);
  if (!sheetName || !rowNum || rowNum < 2 || !col)
    return jsonOut({status:'error', message:'missing sheet/row/col'});
  if (!(score >= 0 && score <= 3))
    return jsonOut({status:'error', message:'score out of range 0-3'});

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return jsonOut({status:'error', message:'sheet not found: ' + sheetName});
  if (rowNum > sheet.getLastRow())
    return jsonOut({status:'error', message:'row out of range'});

  // หา (หรือสร้าง) คอลัมน์ score
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  let colIdx = headers.indexOf(col) + 1;
  if (colIdx === 0) {
    colIdx = lastCol + 1;
    sheet.getRange(1, colIdx).setValue(col)
         .setFontWeight('bold').setBackground('#1565c0').setFontColor('#ffffff');
  }

  sheet.getRange(rowNum, colIdx).setValue(score);
  sheet.getRange(rowNum, colIdx).setNote(
    'ครูให้คะแนน · ' + Utilities.formatDate(new Date(), 'Asia/Bangkok', 'yyyy-MM-dd HH:mm')
  );
  return jsonOut({status:'ok', sheet:sheetName, row:rowNum, col:col, score:score});
}

// ═══════════════════════════════════════════════════════════════════
// authorizeDrive — รันครั้งเดียวเพื่อขอ Drive permission
// Apps Script editor → เลือก authorizeDrive → Run → Allow access
// ═══════════════════════════════════════════════════════════════════
function authorizeDrive() {
  // เรียก createFolder จริง เพื่อบังคับขอ full drive scope (getRootFolder ขอแค่ readonly ไม่พอ)
  const testName = '_KP_auth_test_' + Date.now();
  const folder = DriveApp.createFolder(testName);
  const id = folder.getId();
  folder.setTrashed(true); // ลบทันที
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Drive FULL OK · created+trashed ' + testName + ' (id=' + id + ') · ss=' + ss.getName());
  return 'authorized-full';
}
