// ═══════════════════════════════════════════════════════════════════
// KP-Classroom · Master Roster Backend (v1 · Phase 7)
// ครูโกเมน ปาปะโถ · 2569
// ═══════════════════════════════════════════════════════════════════
// ไฟล์นี้ deploy ใน spreadsheet แยก (ชื่อ Master_Roster_2569)
// ใช้จัดการ login/password/session สำหรับทุกวิชา (physics3, astronomy, ...)
//
// Actions:
//   POST: login / logout / uploadRoster / resetPassword / forceLogout /
//         updateEnrollment / verifyAdmin
//   GET:  info / verifyToken / getRoster / getEnrollment
// ═══════════════════════════════════════════════════════════════════
// ⚠️ SECURITY:
// ต้องตั้ง Script Property ชื่อ 'TEACHER_PASSWORD' (ใช้รหัสเดียวกับ backend เดิม)
// Apps Script Editor → Project Settings (⚙) → Script Properties
// ═══════════════════════════════════════════════════════════════════

// ─── Config ─────────────────────────────────────────────────────────
const ROSTER_SHEET = 'Students';
const ENROLL_SHEET = 'Enrollment';
const ROSTER_HEADERS = ['student_id','full_name','room','birthdate','password_hash','session_token','token_created','last_login','note','number'];
const ENROLL_HEADERS = ['student_id','subject','topic','year','note'];
const SESSION_TTL_HOURS = 12;  // token หมดอายุใน 12 ชม.

// ─── Entry points ────────────────────────────────────────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action || '';
    if (action === 'login')            return handleLogin(data);
    if (action === 'logout')           return handleLogout(data);
    if (action === 'uploadRoster')     return handleUploadRoster(data);
    if (action === 'resetPassword')    return handleResetPassword(data);
    if (action === 'forceLogout')      return handleForceLogout(data);
    if (action === 'updateEnrollment') return handleUpdateEnrollment(data);
    if (action === 'verifyAdmin')      return handleVerifyAdmin(data);
    return jsonOut({status:'error', message:'unknown action: '+action});
  } catch (err) {
    return jsonOut({status:'error', message:err.toString()});
  }
}

function doGet(e) {
  try {
    const p = e.parameter || {};
    const action = p.action || 'info';
    if (action === 'info')          return handleInfo();
    if (action === 'verifyToken')   return handleVerifyToken(p);
    if (action === 'getRoster')     return handleGetRoster(p);
    if (action === 'getEnrollment') return handleGetEnrollment(p);
    return jsonOut({status:'error', message:'unknown action: '+action});
  } catch (err) {
    return jsonOut({status:'error', message:err.toString()});
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────
function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getTeacherPassword_() {
  try {
    const pw = PropertiesService.getScriptProperties().getProperty('TEACHER_PASSWORD');
    if (pw && pw.length > 0) return pw;
  } catch(e) {}
  return 'komanepapato2569';  // fallback — ควรตั้ง Script Property แทน
}

function checkTeacherPw_(input) {
  return String(input || '') === getTeacherPassword_();
}

function sha256_(str) {
  const bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    String(str),
    Utilities.Charset.UTF_8
  );
  return bytes.map(b => ('0' + (b & 0xff).toString(16)).slice(-2)).join('');
}

function uuid_() {
  return Utilities.getUuid();
}

function normBirthdate_(s) {
  // รับ "15/08/2551" | "15082551" | "15-08-2551" → "15082551"
  return String(s || '').replace(/[^0-9]/g, '').slice(0, 8);
}

function ensureRosterSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(ROSTER_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(ROSTER_SHEET);
    sheet.appendRow(ROSTER_HEADERS);
    sheet.getRange(1,1,1,ROSTER_HEADERS.length)
         .setFontWeight('bold').setBackground('#1565c0').setFontColor('#ffffff')
         .setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function ensureEnrollSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(ENROLL_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(ENROLL_SHEET);
    sheet.appendRow(ENROLL_HEADERS);
    sheet.getRange(1,1,1,ENROLL_HEADERS.length)
         .setFontWeight('bold').setBackground('#2e7d32').setFontColor('#ffffff')
         .setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function readRoster_() {
  const sheet = ensureRosterSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return { sheet, headers: ROSTER_HEADERS, rows: [] };
  const width = sheet.getLastColumn();
  const headers = sheet.getRange(1,1,1,width).getValues()[0];
  const rows = sheet.getRange(2,1,lastRow-1,width).getValues();
  return { sheet, headers, rows };
}

function findStudentRow_(student_id) {
  const { sheet, headers, rows } = readRoster_();
  const idIdx = headers.indexOf('student_id');
  if (idIdx < 0) return null;
  const sid = String(student_id || '').trim();
  for (let i = 0; i < rows.length; i++) {
    if (String(rows[i][idIdx]).trim() === sid) {
      const o = {};
      headers.forEach((h, j) => o[h] = rows[i][j]);
      return { sheet, headers, rowNum: i + 2, data: o };
    }
  }
  return null;
}

// ─── [1] LOGIN ───────────────────────────────────────────────────────
// Request:  { action:'login', student_id, password }
// Response: ok → { status:'ok', token, student:{id,name,room,subjects:[...]} }
//           fail → { status:'error', message }
function handleLogin(data) {
  const sid = String(data.student_id || '').trim();
  const pwRaw = String(data.password || '').trim();
  if (!sid || !pwRaw) {
    return jsonOut({status:'error', message:'กรุณากรอกรหัสนักเรียนและรหัสผ่าน'});
  }

  const pw = normBirthdate_(pwRaw);  // normalize → DDMMYYYY
  const pwHash = sha256_(pw);

  const found = findStudentRow_(sid);
  if (!found) {
    return jsonOut({status:'error', message:'ไม่พบรหัสนักเรียนนี้ในระบบ · ติดต่อครูผู้สอน'});
  }

  const storedHash = String(found.data.password_hash || '');
  if (!storedHash) {
    return jsonOut({status:'error', message:'บัญชีนี้ยังไม่ได้ตั้งรหัสผ่าน · ติดต่อครูผู้สอน'});
  }
  if (storedHash !== pwHash) {
    return jsonOut({status:'error', message:'รหัสผ่านไม่ถูกต้อง'});
  }

  // ── Issue new session token (ทับของเดิม · 1:1 lockout) ──
  const token = uuid_();
  const now = new Date();
  const headers = found.headers;
  const tokenIdx = headers.indexOf('session_token') + 1;
  const createdIdx = headers.indexOf('token_created') + 1;
  const lastLoginIdx = headers.indexOf('last_login') + 1;
  if (tokenIdx > 0) found.sheet.getRange(found.rowNum, tokenIdx).setValue(token);
  if (createdIdx > 0) found.sheet.getRange(found.rowNum, createdIdx).setValue(now);
  if (lastLoginIdx > 0) found.sheet.getRange(found.rowNum, lastLoginIdx).setValue(now);

  // ── ดึงวิชาที่ลงทะเบียน ──
  const subjects = getEnrollmentForStudent_(sid);

  return jsonOut({
    status:'ok',
    token: token,
    student: {
      id:     sid,
      name:   String(found.data.full_name || ''),
      number: String(found.data.number || ''),
      room:   String(found.data.room || ''),
      subjects: subjects
    },
    expires_in_hours: SESSION_TTL_HOURS
  });
}

// ─── [2] VERIFY TOKEN ────────────────────────────────────────────────
// GET ?action=verifyToken&student_id=...&token=...
// Subject's Apps Script เรียกก่อนรับ submit ก็ได้ (ผ่าน UrlFetchApp)
function handleVerifyToken(p) {
  const sid = String(p.student_id || '').trim();
  const token = String(p.token || '').trim();
  if (!sid || !token) return jsonOut({status:'ok', valid:false, reason:'missing params'});

  const found = findStudentRow_(sid);
  if (!found) return jsonOut({status:'ok', valid:false, reason:'student not found'});

  if (String(found.data.session_token || '') !== token) {
    return jsonOut({status:'ok', valid:false, reason:'token mismatch (ถูก login จากเครื่องอื่น)'});
  }

  // Check expiry
  const created = found.data.token_created;
  if (created instanceof Date) {
    const ageHours = (Date.now() - created.getTime()) / (1000 * 60 * 60);
    if (ageHours > SESSION_TTL_HOURS) {
      return jsonOut({status:'ok', valid:false, reason:'token expired'});
    }
  }

  return jsonOut({
    status:'ok',
    valid: true,
    student: {
      id:     sid,
      name:   String(found.data.full_name || ''),
      number: String(found.data.number || ''),
      room:   String(found.data.room || '')
    }
  });
}

// ─── [3] LOGOUT ──────────────────────────────────────────────────────
function handleLogout(data) {
  const sid = String(data.student_id || '').trim();
  const token = String(data.token || '').trim();
  if (!sid) return jsonOut({status:'error', message:'missing student_id'});
  const found = findStudentRow_(sid);
  if (!found) return jsonOut({status:'ok', cleared:false});
  // ตรวจ token match ก่อนเคลียร์ (กันเครื่องอื่นเตะคนที่ login ใหม่ออก)
  if (String(found.data.session_token || '') !== token) {
    return jsonOut({status:'ok', cleared:false, reason:'token mismatch'});
  }
  const tokenIdx = found.headers.indexOf('session_token') + 1;
  if (tokenIdx > 0) found.sheet.getRange(found.rowNum, tokenIdx).setValue('');
  return jsonOut({status:'ok', cleared:true});
}

// ─── [4] UPLOAD ROSTER (ครูนำเข้ารายชื่อทีเดียว) ────────────────────
// Request: { action:'uploadRoster', teacher_pw, rows:[
//   { student_id, full_name, room, birthdate (DDMMYYYY หรือ DD/MM/YYYY), note? }
// ]}
// - แทนที่รายชื่อทั้งหมด (clear แล้วเขียนใหม่)
// - Hash birthdate เก็บเป็น password_hash
// - Session_token ล้างทั้งหมด
function handleUploadRoster(data) {
  if (!checkTeacherPw_(data.teacher_pw))
    return jsonOut({status:'error', message:'unauthorized'});

  const rows = data.rows || [];
  if (!rows.length) return jsonOut({status:'error', message:'no rows'});

  const sheet = ensureRosterSheet_();
  sheet.clear();
  sheet.appendRow(ROSTER_HEADERS);
  sheet.getRange(1,1,1,ROSTER_HEADERS.length)
       .setFontWeight('bold').setBackground('#1565c0').setFontColor('#ffffff')
       .setHorizontalAlignment('center');
  sheet.setFrozenRows(1);

  const now = new Date();
  const data2 = rows.map(r => {
    const sid = String(r.student_id || '').trim();
    const name = String(r.full_name || '').trim();
    const room = String(r.room || '').trim();
    const birth = normBirthdate_(r.birthdate);
    const hash = birth ? sha256_(birth) : '';
    const num = String(r.number || '').trim();
    return [
      sid, name, room, birth, hash,
      '',      // session_token
      '',      // token_created
      '',      // last_login
      String(r.note || ''),
      num
    ];
  }).filter(r => r[0] && r[1] && r[3]);  // ต้องมี id + name + birthdate

  if (data2.length) {
    sheet.getRange(2, 1, data2.length, ROSTER_HEADERS.length).setValues(data2);
  }
  return jsonOut({status:'ok', count: data2.length});
}

// ─── [5] RESET PASSWORD (กลับเป็นวันเกิด) ───────────────────────────
function handleResetPassword(data) {
  if (!checkTeacherPw_(data.teacher_pw))
    return jsonOut({status:'error', message:'unauthorized'});
  const sid = String(data.student_id || '').trim();
  const newBirth = data.new_birthdate ? normBirthdate_(data.new_birthdate) : '';

  const found = findStudentRow_(sid);
  if (!found) return jsonOut({status:'error', message:'student not found'});

  const birth = newBirth || String(found.data.birthdate || '');
  if (!birth) return jsonOut({status:'error', message:'no birthdate on file'});
  const hash = sha256_(birth);

  const birthIdx = found.headers.indexOf('birthdate') + 1;
  const hashIdx = found.headers.indexOf('password_hash') + 1;
  const tokenIdx = found.headers.indexOf('session_token') + 1;
  if (newBirth && birthIdx > 0) found.sheet.getRange(found.rowNum, birthIdx).setValue(birth);
  if (hashIdx > 0) found.sheet.getRange(found.rowNum, hashIdx).setValue(hash);
  if (tokenIdx > 0) found.sheet.getRange(found.rowNum, tokenIdx).setValue('');  // บังคับ re-login

  return jsonOut({status:'ok', student_id: sid});
}

// ─── [6] FORCE LOGOUT (ครูเตะนักเรียนออก) ────────────────────────────
function handleForceLogout(data) {
  if (!checkTeacherPw_(data.teacher_pw))
    return jsonOut({status:'error', message:'unauthorized'});
  const sid = String(data.student_id || '').trim();
  const found = findStudentRow_(sid);
  if (!found) return jsonOut({status:'error', message:'student not found'});
  const tokenIdx = found.headers.indexOf('session_token') + 1;
  if (tokenIdx > 0) found.sheet.getRange(found.rowNum, tokenIdx).setValue('');
  return jsonOut({status:'ok', student_id: sid});
}

// ─── [7] GET ROSTER (สำหรับ Teacher UI) ──────────────────────────────
// GET ?action=getRoster&teacher_pw=...
// คืน array ของ {student_id, full_name, room, birthdate, has_token, last_login}
// ไม่คืน password_hash
function handleGetRoster(p) {
  if (!checkTeacherPw_(p.teacher_pw))
    return jsonOut({status:'error', message:'unauthorized'});
  const { headers, rows } = readRoster_();
  const students = rows.map(r => {
    const o = {};
    headers.forEach((h, i) => o[h] = r[i]);
    return {
      student_id: String(o.student_id || ''),
      full_name:  String(o.full_name || ''),
      number:     String(o.number || ''),
      room:       String(o.room || ''),
      birthdate:  String(o.birthdate || ''),
      has_token:  !!o.session_token,
      last_login: o.last_login instanceof Date ? o.last_login.toISOString() : (o.last_login || ''),
      note:       String(o.note || '')
    };
  }).filter(s => s.student_id);
  return jsonOut({status:'ok', count: students.length, students: students});
}

// ─── [8] ENROLLMENT ──────────────────────────────────────────────────
// GET ?action=getEnrollment&student_id=...  → subjects ของคนนั้น
// POST action=updateEnrollment { teacher_pw, entries:[{student_id, subject, topic?, year?}] }
function getEnrollmentForStudent_(sid) {
  const sheet = ensureEnrollSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const width = sheet.getLastColumn();
  const headers = sheet.getRange(1,1,1,width).getValues()[0];
  const rows = sheet.getRange(2,1,lastRow-1,width).getValues();
  const idIdx = headers.indexOf('student_id');
  const subjIdx = headers.indexOf('subject');
  const topicIdx = headers.indexOf('topic');
  if (idIdx < 0) return [];
  const out = [];
  rows.forEach(r => {
    if (String(r[idIdx]).trim() !== sid) return;
    out.push({
      subject: String(r[subjIdx] || ''),
      topic:   String(r[topicIdx] || '')
    });
  });
  return out;
}

function handleGetEnrollment(p) {
  const sid = String(p.student_id || '').trim();
  if (!sid) return jsonOut({status:'error', message:'missing student_id'});
  return jsonOut({status:'ok', enrollment: getEnrollmentForStudent_(sid)});
}

function handleUpdateEnrollment(data) {
  if (!checkTeacherPw_(data.teacher_pw))
    return jsonOut({status:'error', message:'unauthorized'});
  const entries = data.entries || [];
  const sheet = ensureEnrollSheet_();
  if (data.replace_all) {
    sheet.clear();
    sheet.appendRow(ENROLL_HEADERS);
    sheet.getRange(1,1,1,ENROLL_HEADERS.length)
         .setFontWeight('bold').setBackground('#2e7d32').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  const year = String(data.year || new Date().getFullYear() + 543);
  const rows2 = entries.map(e => [
    String(e.student_id || '').trim(),
    String(e.subject || '').trim(),
    String(e.topic || '').trim(),
    year,
    String(e.note || '')
  ]).filter(r => r[0] && r[1]);
  if (rows2.length) {
    sheet.getRange(sheet.getLastRow()+1, 1, rows2.length, ENROLL_HEADERS.length).setValues(rows2);
  }
  return jsonOut({status:'ok', count: rows2.length});
}

// ─── [9] MISC ────────────────────────────────────────────────────────
function handleVerifyAdmin(data) {
  return jsonOut({status:'ok', verified: checkTeacherPw_(data.teacher_pw)});
}

function handleInfo() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rosterSheet = ss.getSheetByName(ROSTER_SHEET);
  const enrollSheet = ss.getSheetByName(ENROLL_SHEET);
  return jsonOut({
    status:'ok',
    version: '1.0',
    ss_name: ss.getName(),
    roster_count: rosterSheet ? Math.max(0, rosterSheet.getLastRow() - 1) : 0,
    enrollment_count: enrollSheet ? Math.max(0, enrollSheet.getLastRow() - 1) : 0,
    session_ttl_hours: SESSION_TTL_HOURS
  });
}

// ─── [10] ONE-TIME SETUP (run ครั้งเดียวใน Apps Script editor) ────────
// เลือก function นี้ → Run → Allow access → ได้ tab ครบ
function setupSheets() {
  ensureRosterSheet_();
  ensureEnrollSheet_();
  // Migration: ถ้าสร้างไว้นานแล้ว อาจขาด column `number` ที่ท้ายตาราง
  ensureNumberColumn_();
  Logger.log('✓ Roster + Enrollment sheets ready');
  return 'ok';
}

// เพิ่ม column `number` ท้ายตาราง Students ถ้ายังไม่มี
function ensureNumberColumn_() {
  const sheet = ensureRosterSheet_();
  const lastCol = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  if (headers.indexOf('number') >= 0) return;
  sheet.getRange(1, lastCol + 1).setValue('number')
       .setFontWeight('bold').setBackground('#1565c0').setFontColor('#ffffff')
       .setHorizontalAlignment('center');
}

// ─── [11] BULK HASH PASSWORDS ────────────────────────────────────────
// วิธีใช้: ครูกรอก birthdate ใน sheet ตรงๆ (column D) แล้วรัน function นี้
// - วน loop ทุกแถว · ถ้า password_hash ว่าง → hash birthdate แล้วเขียนกลับ
// - ถ้า password_hash มีอยู่แล้ว · ข้าม (กัน overwrite)
// - ถ้าต้อง re-hash ทั้งหมด · ลบ column password_hash ออกก่อนค่อยรัน
function hashAllPasswords() {
  const { sheet, headers, rows } = readRoster_();
  const birthIdx = headers.indexOf('birthdate');
  const hashIdx = headers.indexOf('password_hash');
  if (birthIdx < 0 || hashIdx < 0) {
    Logger.log('❌ ไม่พบ column birthdate หรือ password_hash');
    return 'error: missing columns';
  }
  let hashed = 0, skipped = 0, empty = 0;
  rows.forEach((r, i) => {
    const existing = String(r[hashIdx] || '').trim();
    if (existing) { skipped++; return; }
    const birth = normBirthdate_(r[birthIdx]);
    if (!birth) { empty++; return; }
    const hash = sha256_(birth);
    sheet.getRange(i + 2, hashIdx + 1).setValue(hash);
    // เขียน birthdate ที่ normalize แล้วกลับลง sheet (กันกรณีครูกรอก 15/08/2551)
    sheet.getRange(i + 2, birthIdx + 1).setValue(birth);
    hashed++;
  });
  const msg = `✓ Hashed ${hashed} · Skipped ${skipped} (มี hash แล้ว) · Empty ${empty} (ไม่มี birthdate)`;
  Logger.log(msg);
  return msg;
}

// ─── [12] CLEAR ALL SESSIONS (ล้าง token ทั้งหมด · กรณีทดสอบ) ─────────
function clearAllSessions() {
  const { sheet, headers, rows } = readRoster_();
  const tokenIdx = headers.indexOf('session_token');
  if (tokenIdx < 0 || !rows.length) return 'ok (no rows)';
  const clearArr = rows.map(() => ['']);
  sheet.getRange(2, tokenIdx + 1, rows.length, 1).setValues(clearArr);
  Logger.log(`✓ Cleared ${rows.length} sessions`);
  return `cleared ${rows.length}`;
}
