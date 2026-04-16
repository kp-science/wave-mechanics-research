/**
 * ============================================
 * Google Apps Script Template
 * Interactive Worksheet Builder
 * ============================================
 *
 * วิธีใช้:
 * 1. เปิด Google Sheets ใหม่
 * 2. Extensions → Apps Script
 * 3. วาง code นี้แทน Code.gs
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy URL ไปใส่ใน HTML (ตัวแปร API_URL)
 *
 * ============================================
 */

/* ===== CONFIG ===== */
const DRIVE_FOLDER_NAME = 'Uploads_วิจัย'; // ← แก้ชื่อโฟลเดอร์ใน Drive

/* ===== CORS HEADERS ===== */
function doGet(e) {
  const action = e.parameter.action || '';
  let result = { status: 'error', message: 'Unknown action' };

  if (action === 'settings') {
    result = handleGetSettings();
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    let result;

    switch (data.action) {
      case 'submit':
        result = handleSubmit(data);
        break;
      case 'uploadFile':
        result = handleUploadFile(data);
        break;
      default:
        result = { status: 'error', message: 'Unknown action: ' + data.action };
    }

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/* ===== SUBMIT DATA TO SHEET ===== */
function handleSubmit(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = data.sheet || 'Responses';
  let sheet = ss.getSheetByName(sheetName);

  // สร้าง sheet ใหม่ถ้ายังไม่มี
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  // สร้าง header ถ้ายังว่าง
  if (sheet.getLastRow() === 0) {
    const headers = Object.keys(data).filter(k => k !== 'action' && k !== 'sheet');
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }

  // เขียนข้อมูล
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = headers.map(h => data[h] || '');
  sheet.appendRow(row);

  return { status: 'ok', row: sheet.getLastRow() };
}

/* ===== UPLOAD FILE TO DRIVE ===== */
function handleUploadFile(data) {
  // สร้าง/หา folder หลัก
  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  let mainFolder;
  if (folders.hasNext()) {
    mainFolder = folders.next();
  } else {
    mainFolder = DriveApp.createFolder(DRIVE_FOLDER_NAME);
  }

  // สร้าง subfolder (เช่น แผน1, แผน2)
  const subName = data.subfolder || 'general';
  const subFolders = mainFolder.getFoldersByName(subName);
  let subFolder;
  if (subFolders.hasNext()) {
    subFolder = subFolders.next();
  } else {
    subFolder = mainFolder.createFolder(subName);
  }

  // Decode base64 → สร้างไฟล์
  const decoded = Utilities.base64Decode(data.data);
  const blob = Utilities.newBlob(decoded, data.mimeType || 'application/pdf', data.filename || 'upload.pdf');
  const file = subFolder.createFile(blob);

  // Log to Uploads sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let logSheet = ss.getSheetByName('Uploads');
  if (!logSheet) {
    logSheet = ss.insertSheet('Uploads');
    logSheet.appendRow(['timestamp', 'student_id', 'student_name', 'student_class', 'plan', 'tool', 'filename', 'drive_url']);
    logSheet.getRange(1, 1, 1, 8).setFontWeight('bold');
  }

  logSheet.appendRow([
    new Date(),
    data.student_id || '',
    data.student_name || '',
    data.student_class || '',
    data.plan || '',
    data.tool || '',
    data.filename || '',
    file.getUrl()
  ]);

  return { status: 'ok', url: file.getUrl() };
}

/* ===== GET SETTINGS ===== */
function handleGetSettings() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Settings');
  if (!sheet) return { status: 'ok', settings: [] };

  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const settings = data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });

  return { status: 'ok', settings: settings };
}
