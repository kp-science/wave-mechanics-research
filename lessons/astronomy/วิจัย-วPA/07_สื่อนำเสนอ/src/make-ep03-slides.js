// สร้างไฟล์นำเสนอช่วยสอน EP03 พาแรลแลกซ์และระยะดาว
// run: NODE_PATH=$(npm root -g) node make-ep03-slides.js
const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'W', width: 13.333, height: 7.5 });
pptx.layout = 'W';
pptx.author = 'AJ Komane Papato';
pptx.title = 'EP03 พาแรลแลกซ์และระยะดาว — ไฟล์ช่วยสอน';

const C = {
  bg: '0A1128',      // deep space navy
  panel: '141F3F',
  panel2: '1C2B52',
  edge: '2C3D6E',
  ink: 'EAF0FF',
  mut: '9FB3DC',
  gold: 'FFC857',
  blue: '6FA8FF',
  red: 'FF8A75',
  green: '7BD8A8',
};
const F = 'Sukhumvit Set';

let pageNo = 0;

// ---------- helpers ----------
function txt(s, t, o) {
  s.addText(t, Object.assign({ fontFace: F, color: C.ink }, o));
}
function card(s, x, y, w, h, o = {}) {
  s.addShape('roundRect', {
    x, y, w, h, rectRadius: o.r ?? 0.09,
    fill: { color: o.fill || C.panel },
    line: { color: o.edge || C.edge, width: o.edgeW ?? 1 },
  });
}
function dot(s, x, y, r, fill, o = {}) {
  s.addShape('ellipse', {
    x: x - r, y: y - r, w: 2 * r, h: 2 * r,
    fill: { color: fill },
    line: o.edge ? { color: o.edge, width: o.edgeW || 1.25 } : { type: 'none' },
  });
}
function ln(s, x1, y1, x2, y2, o = {}) {
  if (x2 < x1) { [x1, x2] = [x2, x1]; [y1, y2] = [y2, y1];
    const t = o.beginArrowType; o.beginArrowType = o.endArrowType; o.endArrowType = t; }
  const flipV = y2 < y1;
  s.addShape('line', {
    x: x1, y: Math.min(y1, y2), w: x2 - x1, h: Math.abs(y2 - y1), flipV,
    line: { color: o.color || C.mut, width: o.width ?? 1.5, dashType: o.dash || 'solid',
      beginArrowType: o.beginArrowType, endArrowType: o.endArrowType },
  });
}
function star(s, x, y, size, color) {
  txt(s, '★', { x: x - 0.25, y: y - 0.25, w: 0.5, h: 0.5, fontSize: size, color: color || C.gold, align: 'center', valign: 'middle' });
}
function sprinkle(s) {
  // ดาวประดับขอบสไลด์ ตำแหน่งคงที่ ไม่ทับเนื้อหา
  const pts = [[0.55, 0.32, 9], [12.85, 0.3, 7], [6.9, 0.22, 6], [10.6, 0.35, 7],
               [0.4, 7.05, 7], [12.95, 6.95, 9], [3.3, 7.18, 6]];
  pts.forEach(([x, y, sz], i) => {
    txt(s, i % 2 ? '✦' : '·', { x: x - 0.15, y: y - 0.15, w: 0.3, h: 0.3, fontSize: sz, color: i % 3 ? C.mut : C.gold, align: 'center', valign: 'middle' });
  });
}
function newSlide() {
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  pageNo++;
  sprinkle(s);
  txt(s, 'COSMOS LOG · EP03 เสียงร้องจากอดีต · ว30105 โลกและอวกาศ ม.5', {
    x: 0.6, y: 7.08, w: 9.0, h: 0.3, fontSize: 10.5, color: '5C6FA0' });
  txt(s, String(pageNo), { x: 12.45, y: 7.08, w: 0.45, h: 0.3, fontSize: 10.5, color: '5C6FA0', align: 'right' });
  return s;
}
function header(s, kicker, title) {
  txt(s, kicker, { x: 0.62, y: 0.34, w: 12.1, h: 0.32, fontSize: 13, bold: true, color: C.gold, charSpacing: 2 });
  txt(s, title, { x: 0.6, y: 0.62, w: 12.15, h: 0.72, fontSize: 30, bold: true, color: C.ink });
}
function chipRow(s, x, y, items, o = {}) {
  let cx = x;
  items.forEach(t => {
    const w = o.w || (0.34 + t.length * 0.105);
    card(s, cx, y, w, 0.42, { fill: o.fill || C.panel2, r: 0.21 });
    txt(s, t, { x: cx, y: y + 0.015, w, h: 0.39, fontSize: o.fontSize || 12.5, color: o.color || C.mut, align: 'center', valign: 'middle' });
    cx += w + 0.18;
  });
}

// ============================================================
// S1 — Title
// ============================================================
(() => {
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  pageNo++;
  // starfield
  const stars = [[1.1,1.0,10],[2.4,5.9,8],[3.6,1.8,7],[5.2,0.7,9],[6.3,6.4,8],[7.9,1.3,7],
    [12.55,6.35,8],[12.4,1.0,11],[10.4,0.8,8],[0.7,4.0,8],[12.7,3.4,8],[8.8,6.8,7],[4.4,6.9,7]];
  stars.forEach(([x, y, sz], i) => txt(s, i % 2 ? '✦' : '★', { x: x - 0.2, y: y - 0.2, w: 0.4, h: 0.4, fontSize: sz, color: i % 3 === 0 ? C.gold : C.mut, align: 'center' }));
  // Betelgeuse — ดาวยักษ์แดงมุมขวา
  dot(s, 10.55, 3.6, 1.62, '3A1430');
  dot(s, 10.55, 3.6, 1.28, '7E2A33');
  dot(s, 10.55, 3.6, 0.98, 'C24A3A');
  dot(s, 10.55, 3.6, 0.58, 'F2A45C');
  txt(s, 'บีเทลจุส · ~500 ปีแสง', { x: 9.35, y: 5.5, w: 2.4, h: 0.3, fontSize: 12, color: C.mut, align: 'center' });
  txt(s, 'ภาพที่เห็นคืนนี้ = แสงที่ออกเดินทางเมื่อราว 500 ปีก่อน', { x: 8.75, y: 5.82, w: 3.6, h: 0.5, fontSize: 11, color: C.mut, align: 'center' });

  txt(s, 'COSMOS LOG · SEASON 1 · EP03', { x: 0.9, y: 1.62, w: 8, h: 0.4, fontSize: 15, bold: true, color: C.gold, charSpacing: 3 });
  txt(s, 'เสียงร้องจากอดีต', { x: 0.85, y: 2.0, w: 8.2, h: 1.05, fontSize: 53, bold: true, color: C.ink });
  txt(s, 'พาแรลแลกซ์และระยะดาว', { x: 0.9, y: 3.1, w: 8.2, h: 0.62, fontSize: 27, bold: true, color: C.blue });
  txt(s, 'ไม้บรรทัดวัดเอกภพ — และจดหมายที่แสงส่งมาจากอดีต', { x: 0.9, y: 3.78, w: 7.6, h: 0.45, fontSize: 17, italic: true, color: C.mut });
  card(s, 0.9, 4.62, 7.5, 1.18, { fill: C.panel });
  txt(s, [
    { text: 'ไฟล์ช่วยสอนประกอบแบบฝึกหัดที่ 3 · ใช้คู่กับแผนการจัดการเรียนรู้ที่ 3 (คาบ 5–6)\n', options: { fontSize: 13.5, color: C.ink, bold: true } },
    { text: 'ว30105 วิทยาศาสตร์โลกและอวกาศ · ชั้นมัธยมศึกษาปีที่ 5 · ผลการเรียนรู้ ว 7.1 ม.4-6/2', options: { fontSize: 12.5, color: C.mut } },
  ], { x: 1.12, y: 4.74, w: 7.1, h: 0.95, valign: 'middle', lineSpacing: 20 });
  txt(s, 'Astronomy · AJ Komane Papato · โรงเรียนสตรีวิทยา', { x: 0.9, y: 6.55, w: 7, h: 0.35, fontSize: 13, color: '5C6FA0' });
  s.addNotes('สไลด์เปิด — ชี้ภาพดาวยักษ์แดงขวามือ: "ดาวบีเทลจุสที่เห็นคืนนี้ คือภาพเมื่อ 500 ปีก่อน" เป็น hook เข้าคำถามข้อ 0 ในสไลด์ที่ 3');
})();

// ============================================================
// S2 — จุดประสงค์การเรียนรู้
// ============================================================
(() => {
  const s = newSlide();
  header(s, 'OBJECTIVES', 'จุดประสงค์การเรียนรู้ — จบคาบนี้ นักเรียนทำอะไรได้');
  const objs = [
    ['อธิบายหลักการพาแรลแลกซ์ และคำนวณระยะดาวฤกษ์จากสูตร d = 1/p ได้'],
    ['แปลงหน่วย AU ⟷ ปีแสง ⟷ พาร์เซก และอธิบายว่าแสงจากดาวคือ "ภาพจากอดีต" ได้'],
    ['อธิบายระบบอันดับความสว่าง (magnitude) และเปรียบเทียบความสว่างของดาวสองดวงได้'],
  ];
  objs.forEach((o, i) => {
    const y = 1.62 + i * 1.28;
    card(s, 0.62, y, 7.95, 1.1);
    dot(s, 1.22, y + 0.55, 0.27, C.gold);
    txt(s, String(i + 1), { x: 0.95, y: y + 0.28, w: 0.54, h: 0.54, fontSize: 20, bold: true, color: C.bg, align: 'center', valign: 'middle' });
    txt(s, o[0], { x: 1.68, y: y + 0.12, w: 6.7, h: 0.86, fontSize: 16.5, color: C.ink, valign: 'middle', lineSpacing: 24 });
  });
  // เส้นทาง EP03
  card(s, 8.85, 1.62, 3.85, 3.9, { fill: C.panel2 });
  txt(s, 'เส้นทางของคาบนี้', { x: 9.1, y: 1.8, w: 3.4, h: 0.4, fontSize: 15, bold: true, color: C.gold });
  const path = ['พาแรลแลกซ์คืออะไร', 'สูตรเดียวจบ d = 1/p', 'หน่วยระยะทาง 3 ชั้น', 'แสง = จดหมายจากอดีต', 'อันดับความสว่าง m', 'ขีดจำกัด + ดาวเทียม Gaia'];
  path.forEach((p, i) => {
    const y = 2.28 + i * 0.51;
    dot(s, 9.32, y + 0.16, 0.05, C.blue);
    txt(s, p, { x: 9.52, y, w: 3.1, h: 0.42, fontSize: 13.5, color: C.ink, valign: 'middle' });
    if (i < path.length - 1) ln(s, 9.32, y + 0.25, 9.32, y + 0.6, { color: C.edge, width: 1 });
  });
  txt(s, 'ความรู้ก่อนเรียนที่ต้องมี', { x: 0.62, y: 5.62, w: 4, h: 0.35, fontSize: 13.5, bold: true, color: C.mut });
  chipRow(s, 0.62, 6.0, ['หน่วยมุม (องศา)', 'สัญกรณ์วิทยาศาสตร์', 'v = s/t', 'c = 3 × 10⁸ m/s'], {});
  s.addNotes('ทบทวนความรู้ก่อนเรียนสั้น ๆ ก่อน โดยเฉพาะสัญกรณ์วิทยาศาสตร์ — จะใช้หนักในชุดคำนวณ');
})();

// ============================================================
// S3 — คำถามสำคัญ ข้อ 0
// ============================================================
(() => {
  const s = newSlide();
  header(s, 'BIG QUESTION · ข้อ 0 ในแบบฝึกหัด', 'คืนนี้คุณแหงนมองดาวบีเทลจุส… ตาคุณ "เห็น" อะไร');
  card(s, 0.62, 1.6, 4.55, 4.1, { fill: C.panel2 });
  dot(s, 2.9, 2.85, 0.78, '7E2A33');
  dot(s, 2.9, 2.85, 0.55, 'C24A3A');
  dot(s, 2.9, 2.85, 0.3, 'F2A45C');
  txt(s, 'บีเทลจุส (Betelgeuse)', { x: 0.85, y: 3.95, w: 4.1, h: 0.4, fontSize: 16, bold: true, color: C.ink, align: 'center' });
  txt(s, 'ดาวยักษ์แดงในกลุ่มดาวนายพราน\nห่างจากโลกประมาณ 500 ปีแสง', { x: 0.85, y: 4.35, w: 4.1, h: 0.8, fontSize: 14, color: C.mut, align: 'center', lineSpacing: 21 });
  const ch = [
    ['1', 'ภาพดาว ณ ปัจจุบันจริง เพราะแสงเร็วมากจนถือว่าถึงทันที'],
    ['2', 'ภาพดาวเมื่อราว 500 ปีก่อน — ดาวอาจเปลี่ยนไปแล้ว หรือไม่มีอยู่แล้วก็ได้'],
    ['3', 'ภาพดาวในอนาคต เพราะดาวเคลื่อนที่หนีเราไป'],
    ['4', 'ภาพปัจจุบัน เพราะสมองปรับแก้เวลาเดินทางของแสงให้แล้ว'],
  ];
  ch.forEach(([n, t], i) => {
    const x = 5.45 + (i % 2) * 3.68, y = 1.6 + Math.floor(i / 2) * 2.12;
    card(s, x, y, 3.5, 1.94);
    dot(s, x + 0.42, y + 0.42, 0.21, C.panel2, { edge: C.blue, edgeW: 1.5 });
    txt(s, n, { x: x + 0.21, y: y + 0.21, w: 0.42, h: 0.42, fontSize: 15, bold: true, color: C.blue, align: 'center', valign: 'middle' });
    txt(s, t, { x: x + 0.78, y: y + 0.18, w: 2.6, h: 1.62, fontSize: 13.5, color: C.ink, valign: 'middle', lineSpacing: 19 });
  });
  card(s, 0.62, 5.9, 12.1, 0.85, { fill: '23304F', edge: C.gold, edgeW: 1.25 });
  txt(s, '✎  ให้นักเรียนเขียนคำตอบ + เหตุผล ลงข้อ 0 ในแบบฝึกหัด "ก่อนเรียน" — ยังไม่เฉลยตอนนี้ เราจะกลับมาตัดสินกันท้ายคาบ', {
    x: 0.92, y: 5.98, w: 11.6, h: 0.7, fontSize: 15, bold: true, color: C.gold, valign: 'middle' });
  s.addNotes('เฉลยคือข้อ 2 — แต่อย่าเฉลยตอนนี้ ให้ทุกคน commit คำตอบก่อน (predict-observe-explain) แล้วกลับมาปิดที่สไลด์สรุป\nจุดประสงค์ของข้อนี้: ดักจับ misconception ว่า "แสงถึงทันที"');
})();

// ============================================================
// S4 — พาแรลแลกซ์คืออะไร + การทดลองนิ้วโป้ง (รูปที่ 1)
// ============================================================
(() => {
  const s = newSlide();
  header(s, 'CONCEPT 1', 'พาแรลแลกซ์ — ทดลองได้เดี๋ยวนี้ ด้วยนิ้วโป้งของคุณ');
  card(s, 0.62, 1.6, 5.85, 3.55);
  txt(s, 'กิจกรรม 1 นาที', { x: 0.9, y: 1.78, w: 5.3, h: 0.4, fontSize: 16, bold: true, color: C.gold });
  txt(s, [
    { text: '1. ยกนิ้วโป้งขึ้น เหยียดสุดแขน', options: { bullet: false, breakLine: true } },
    { text: '2. หลับตาซ้าย–ขวา สลับกันเร็ว ๆ', options: { breakLine: true } },
    { text: '3. สังเกตนิ้วเทียบกับฉากหลัง (กระดาน/ผนัง)', options: { breakLine: true } },
  ], { x: 0.92, y: 2.2, w: 5.3, h: 1.25, fontSize: 15.5, color: C.ink, lineSpacing: 26 });
  card(s, 0.85, 3.55, 5.4, 1.35, { fill: C.panel2 });
  txt(s, [
    { text: 'นิ้ว "กระโดด" ไปมา ทั้งที่ไม่ได้ขยับเลย!\n', options: { fontSize: 15.5, bold: true, color: C.blue } },
    { text: 'การเปลี่ยนตำแหน่งปรากฏของวัตถุเมื่อมองจากตำแหน่งต่างกัน เรียกว่า พาแรลแลกซ์ (parallax)', options: { fontSize: 14, color: C.ink } },
  ], { x: 1.05, y: 3.66, w: 5.0, h: 1.15, valign: 'middle', lineSpacing: 20 });
  // ---- รูปที่ 1 ----
  card(s, 6.75, 1.6, 5.98, 4.85, { fill: C.panel });
  txt(s, 'ฉากหลังไกล', { x: 11.0, y: 1.74, w: 1.6, h: 0.3, fontSize: 12, color: C.mut, align: 'center' });
  ln(s, 12.15, 2.05, 12.15, 6.0, { color: C.ink, width: 2 });
  // sight lines
  ln(s, 7.45, 2.95, 12.0, 5.48, { color: C.blue, width: 1.75 });
  ln(s, 7.45, 5.45, 12.0, 2.92, { color: C.gold, width: 1.75, dash: 'dash' });
  // eyes
  dot(s, 7.3, 2.95, 0.14, C.panel, { edge: C.ink, edgeW: 1.75 }); dot(s, 7.3, 2.95, 0.05, C.ink);
  dot(s, 7.3, 5.45, 0.14, C.panel, { edge: C.ink, edgeW: 1.75 }); dot(s, 7.3, 5.45, 0.05, C.ink);
  txt(s, 'ตาซ้าย', { x: 6.82, y: 2.42, w: 1.0, h: 0.3, fontSize: 12.5, color: C.ink, align: 'center' });
  txt(s, 'ตาขวา', { x: 6.82, y: 5.66, w: 1.0, h: 0.3, fontSize: 12.5, color: C.ink, align: 'center' });
  // thumb
  dot(s, 9.7, 4.2, 0.11, C.red);
  txt(s, 'นิ้วโป้ง', { x: 9.25, y: 3.68, w: 0.95, h: 0.3, fontSize: 12.5, color: C.red, align: 'center' });
  // apparent positions
  star(s, 12.0, 5.48, 16, C.blue);
  star(s, 12.0, 2.92, 16, C.gold);
  txt(s, 'ตำแหน่งปรากฏ ก', { x: 10.35, y: 5.62, w: 1.7, h: 0.3, fontSize: 11.5, color: C.blue, align: 'right' });
  txt(s, 'ตำแหน่งปรากฏ ข', { x: 10.35, y: 2.5, w: 1.7, h: 0.3, fontSize: 11.5, color: C.gold, align: 'right' });
  txt(s, 'ตาซ้ายเห็นนิ้วทับ ก  ·  ตาขวาเห็นนิ้วทับ ข', { x: 7.0, y: 6.05, w: 5.5, h: 0.32, fontSize: 12.5, color: C.mut, align: 'center' });
  txt(s, 'รูปที่ 1  มองนิ้วเดียวกันจากสองตา → ตำแหน่งปรากฏบนฉากหลังเลื่อนจาก ก ไป ข', { x: 6.75, y: 6.55, w: 5.98, h: 0.35, fontSize: 12, italic: true, color: C.mut, align: 'center' });
  card(s, 0.62, 5.42, 5.85, 1.05, { fill: '23304F' });
  txt(s, 'ตาสองข้างห่างกันแค่ ~6 cm จึงวัดได้แต่ระยะใกล้ — ถ้าจะวัด "ดาว" ต้องหาสองตาที่ห่างกันกว่านี้มหาศาล…', { x: 0.88, y: 5.5, w: 5.4, h: 0.9, fontSize: 13.5, color: C.ink, valign: 'middle', lineSpacing: 19 });
  s.addNotes('ให้ทุกคนทำจริงพร้อมกัน แล้วทำข้อ 1 ในแบบฝึกหัด (ตารางใกล้/ไกล)\nประโยคท้ายสไลด์เป็นสะพานไปสไลด์ถัดไป: สองตาของนักดาราศาสตร์ = ตำแหน่งโลกห่างกัน 6 เดือน');
})();

// ============================================================
// S5 — กฎของพาแรลแลกซ์: ใกล้เลื่อนมาก ไกลเลื่อนน้อย
// ============================================================
(() => {
  const s = newSlide();
  header(s, 'CONCEPT 1', 'กฎสำคัญ — ยิ่งใกล้ ยิ่งเลื่อนมาก · ยิ่งไกล ยิ่งเลื่อนน้อย');
  const panels = [
    { x: 0.62, title: 'วัตถุอยู่ใกล้ (ครึ่งแขน)', objX: 3.05, shift: 1.5, color: C.red, tag: 'เลื่อนมาก' },
    { x: 6.85, title: 'วัตถุอยู่ไกล (สุดแขน)', objX: 10.6, shift: 0.55, color: C.blue, tag: 'เลื่อนน้อย' },
  ];
  panels.forEach(p => {
    card(s, p.x, 1.6, 5.85, 3.85, { fill: C.panel });
    txt(s, p.title, { x: p.x + 0.2, y: 1.74, w: 5.4, h: 0.36, fontSize: 15, bold: true, color: C.ink });
    const sx = p.x + 0.55, screenX = p.x + 5.35, midY = 3.6;
    // eyes
    dot(s, sx, midY - 0.85, 0.11, C.panel, { edge: C.ink, edgeW: 1.5 }); dot(s, sx, midY - 0.85, 0.04, C.ink);
    dot(s, sx, midY + 0.85, 0.11, C.panel, { edge: C.ink, edgeW: 1.5 }); dot(s, sx, midY + 0.85, 0.04, C.ink);
    // object
    dot(s, p.objX, midY, 0.1, p.color);
    // screen
    ln(s, screenX, midY - 1.55, screenX, midY + 1.55, { color: C.ink, width: 2 });
    // sight lines through object to screen
    [[-0.85, 1], [0.85, -1]].forEach(([dy]) => {
      const slope = (midY - (midY + dy)) / (p.objX - sx);
      const yEnd = midY + dy + slope * (screenX - sx);
      ln(s, sx + 0.11, midY + dy, screenX, yEnd, { color: p.color, width: 1.5, dash: dy > 0 ? 'dash' : 'solid' });
    });
    // shift bracket on screen
    const slope1 = -(-0.85) / (p.objX - sx); // line from upper eye
    const yA = midY - 0.85 + ((midY - (midY - 0.85)) / (p.objX - sx)) * (screenX - sx);
    const yB = midY + 0.85 + ((midY - (midY + 0.85)) / (p.objX - sx)) * (screenX - sx);
    ln(s, screenX + 0.18, Math.min(yA, yB), screenX + 0.18, Math.max(yA, yB), { color: C.gold, width: 2.25, beginArrowType: 'arrow', endArrowType: 'arrow' });
    txt(s, p.tag, { x: screenX - 1.5, y: midY + 1.62, w: 1.9, h: 0.34, fontSize: 13.5, bold: true, color: C.gold, align: 'center' });
  });
  card(s, 0.62, 5.72, 12.1, 1.0, { fill: '23304F', edge: C.gold, edgeW: 1.25 });
  txt(s, [
    { text: 'มุมพาแรลแลกซ์จึงเป็น "ไม้บรรทัดวัดระยะ" — ', options: { fontSize: 16.5, bold: true, color: C.gold } },
    { text: 'วัดมุมที่เลื่อนได้ ก็คำนวณย้อนกลับเป็นระยะทาง · มุมมาก = ใกล้ · มุมน้อย = ไกล', options: { fontSize: 14.5, color: C.ink } },
  ], { x: 0.95, y: 5.82, w: 11.5, h: 0.8, valign: 'middle' });
  s.addNotes('เชื่อมกับผลการทดลองข้อ 1: นิ้วใกล้เลื่อนมาก นิ้วไกลเลื่อนน้อย\nถามเช็คความเข้าใจ: "ดาวที่มีมุมพาแรลแลกซ์มาก คือดาวใกล้หรือไกล?" (ใกล้)');
})();

// ============================================================
// S6 — วัดดาวจริง: เส้นฐานวงโคจรโลก (รูปที่ 2)
// ============================================================
(() => {
  const s = newSlide();
  header(s, 'CONCEPT 1', '"สองตา" ของนักดาราศาสตร์ — ตำแหน่งโลกที่ห่างกัน 6 เดือน');
  txt(s, 'ถ่ายภาพดาวดวงเดียวกัน 2 ครั้ง ห่างกัน 6 เดือน (เส้นฐานยาว 2 AU) — ดาวใกล้จะเลื่อนตำแหน่งเทียบกับดาวพื้นหลังที่ไกลมาก', {
    x: 0.62, y: 1.32, w: 12.1, h: 0.42, fontSize: 15, color: C.mut });
  card(s, 0.62, 1.85, 12.1, 4.55, { fill: C.panel });
  // background stars
  ln(s, 11.9, 2.2, 11.9, 6.05, { color: C.ink, width: 2 });
  txt(s, 'ดาวพื้นหลัง (ไกลมาก)', { x: 10.0, y: 1.95, w: 2.6, h: 0.3, fontSize: 12, color: C.mut, align: 'right' });
  star(s, 11.75, 2.32, 13, C.mut); star(s, 11.75, 4.1, 13, C.mut); star(s, 11.75, 5.85, 13, C.mut);
  // orbit + sun
  s.addShape('ellipse', { x: 1.85, y: 2.5, w: 1.1, h: 3.2, fill: { type: 'none' }, line: { color: '5C6FA0', width: 1.25, dashType: 'dash' } });
  dot(s, 2.4, 4.1, 0.24, C.gold);
  txt(s, 'ดวงอาทิตย์', { x: 1.55, y: 4.42, w: 1.7, h: 0.3, fontSize: 12, color: C.gold, align: 'center' });
  // earths
  dot(s, 2.4, 2.5, 0.11, C.blue, { edge: C.ink, edgeW: 1 });
  dot(s, 2.4, 5.7, 0.11, C.blue, { edge: C.ink, edgeW: 1 });
  txt(s, 'โลก (ม.ค.)', { x: 0.78, y: 2.18, w: 1.5, h: 0.3, fontSize: 12.5, color: C.blue, align: 'center' });
  txt(s, 'โลก (ก.ค.)', { x: 0.78, y: 5.78, w: 1.5, h: 0.3, fontSize: 12.5, color: C.blue, align: 'center' });
  // 1 AU baseline
  ln(s, 2.4, 4.1, 2.4, 2.5, { color: C.ink, width: 1.75 });
  txt(s, '1 AU', { x: 2.52, y: 3.05, w: 0.8, h: 0.3, fontSize: 12.5, bold: true, color: C.ink });
  // near star
  dot(s, 6.8, 4.1, 0.12, C.red);
  txt(s, 'ดาวใกล้', { x: 6.55, y: 3.55, w: 1.0, h: 0.3, fontSize: 13, bold: true, color: C.red, align: 'center' });
  // sight lines
  ln(s, 2.5, 2.5, 11.85, 5.83, { color: C.blue, width: 1.5 });
  ln(s, 2.5, 5.7, 11.85, 2.26, { color: C.blue, width: 1.5, dash: 'dash' });
  txt(s, 'เห็นจาก ม.ค.', { x: 10.05, y: 5.85, w: 1.6, h: 0.28, fontSize: 11, color: C.blue, align: 'center' });
  txt(s, 'เห็นจาก ก.ค.', { x: 8.3, y: 2.45, w: 1.6, h: 0.28, fontSize: 11, color: C.blue, align: 'center' });
  // center line + angle p
  ln(s, 2.4, 4.1, 6.8, 4.1, { color: '5C6FA0', width: 1, dash: 'sysDot' });
  ln(s, 6.8, 4.1, 11.85, 4.1, { color: '39466F', width: 1, dash: 'sysDot' });
  txt(s, 'p', { x: 5.85, y: 3.76, w: 0.4, h: 0.34, fontSize: 17, bold: true, italic: true, color: C.gold });
  txt(s, 'รูปที่ 2  มุมพาแรลแลกซ์ p = ครึ่งหนึ่งของมุมเลื่อนทั้งหมด = มุมที่เส้นฐาน 1 AU รองรับเมื่อมองจากดาวดวงนั้น', {
    x: 0.62, y: 6.05, w: 12.1, h: 0.32, fontSize: 12.5, italic: true, color: C.mut, align: 'center' });
  card(s, 0.62, 6.5, 12.1, 0.5, { fill: '23304F' });
  txt(s, 'ดาวยิ่งใกล้ → เส้นเล็งสองครั้งยิ่งกางมุมกว้าง → p ยิ่งใหญ่  (มุมในรูปถูกขยายให้ดูง่าย — ของจริงเล็กกว่า 1 ฟิลิปดา!)', {
    x: 0.9, y: 6.52, w: 11.6, h: 0.45, fontSize: 13, color: C.ink, valign: 'middle' });
  s.addNotes('ย้ำนิยาม: p คือ "ครึ่งหนึ่ง" ของมุมเลื่อนทั้งหมด (จุดที่นักเรียนพลาดบ่อย)\nชี้ว่ารูปขยายมุมเกินจริงมาก — ของจริงเล็กกว่าองศาเป็นพันเท่า เป็นสะพานไปหน่วยฟิลิปดา');
})();

// ============================================================
// S7 — หน่วยมุมเล็ก + นิยามพาร์เซก
// ============================================================
(() => {
  const s = newSlide();
  header(s, 'CONCEPT 2', 'มุมที่เล็กมาก — ต้องมีหน่วยใหม่ และนิยามระยะใหม่');
  // conversion ladder
  const steps = [['1°', 'องศา'], ['= 60′', 'ลิปดา (arcminute)'], ['= 3600″', 'ฟิลิปดา (arcsecond)']];
  steps.forEach((st, i) => {
    const x = 0.62 + i * 2.85;
    card(s, x, 1.7, 2.55, 1.3, { fill: i === 2 ? '23304F' : C.panel, edge: i === 2 ? C.gold : C.edge, edgeW: i === 2 ? 1.5 : 1 });
    txt(s, st[0], { x, y: 1.85, w: 2.55, h: 0.6, fontSize: 26, bold: true, color: i === 2 ? C.gold : C.ink, align: 'center' });
    txt(s, st[1], { x, y: 2.48, w: 2.55, h: 0.4, fontSize: 13, color: C.mut, align: 'center' });
    if (i < 2) ln(s, x + 2.58, 2.35, x + 2.82, 2.35, { color: C.mut, width: 2, endArrowType: 'triangle' });
  });
  // analogy card
  card(s, 9.35, 1.7, 3.35, 1.3, { fill: C.panel2 });
  txt(s, [
    { text: 'มุม 1″ เล็กแค่ไหน?\n', options: { fontSize: 14, bold: true, color: C.blue } },
    { text: 'เท่ากับมองเหรียญบาท ที่วางห่างออกไปราว 5 กิโลเมตร', options: { fontSize: 13, color: C.ink } },
  ], { x: 9.55, y: 1.8, w: 3.0, h: 1.1, valign: 'middle', lineSpacing: 18 });
  txt(s, 'ดาวที่มุมพาแรลแลกซ์ใหญ่ที่สุดบนฟ้า (พร็อกซิมา เซนทอรี) ยังมี p ไม่ถึง 1″ — ดาวทุกดวงมุมเล็กกว่านี้ทั้งหมด', {
    x: 0.62, y: 3.2, w: 12.1, h: 0.42, fontSize: 15, color: C.mut });
  // parsec definition
  card(s, 0.62, 3.85, 12.1, 2.6, { fill: C.panel, edge: C.gold, edgeW: 1.5 });
  txt(s, 'นิยามหน่วยระยะใหม่ — พาร์เซก (parsec, pc)', { x: 0.95, y: 4.05, w: 11.4, h: 0.45, fontSize: 19, bold: true, color: C.gold });
  txt(s, [
    { text: '1 พาร์เซก = ระยะของดาวที่ทำให้มุมพาแรลแลกซ์ p = 1″ พอดี\n', options: { fontSize: 17, bold: true, color: C.ink } },
    { text: 'ชื่อมาจาก  parallax of one arcsecond  — ตั้งหน่วยจากวิธีวัดตรง ๆ\n', options: { fontSize: 14.5, color: C.mut } },
    { text: '1 pc = 3.26 ปีแสง = 206,265 AU = 3.086 × 10¹⁶ m', options: { fontSize: 15.5, bold: true, color: C.blue } },
  ], { x: 0.95, y: 4.55, w: 11.4, h: 1.75, lineSpacing: 30, valign: 'middle' });
  s.addNotes('เกร็ด: ทำไมนักดาราศาสตร์ใช้ pc ไม่ใช่ปีแสง — เพราะ pc นิยามจากการวัดจริง สูตรจะสั้นที่สุด (สไลด์ถัดไป)');
})();

// ============================================================
// S8 — สูตร d = 1/p
// ============================================================
(() => {
  const s = newSlide();
  header(s, 'KEY FORMULA', 'สูตรเดียวจบ — สั้นจนน่าตกใจ');
  card(s, 2.9, 1.7, 7.5, 2.5, { fill: '23304F', edge: C.gold, edgeW: 2 });
  txt(s, 'd  =  1 / p', { x: 2.9, y: 1.95, w: 7.5, h: 1.2, fontSize: 60, bold: true, italic: true, color: C.gold, align: 'center' });
  txt(s, 'd = ระยะดาว (พาร์เซก, pc)   ·   p = มุมพาแรลแลกซ์ (ฟิลิปดา, ″) เท่านั้น', {
    x: 2.9, y: 3.35, w: 7.5, h: 0.5, fontSize: 16, color: C.ink, align: 'center' });
  // examples row
  const ex = [['p = 1″', 'd = 1 pc'], ['p = 0.5″', 'd = 2 pc'], ['p = 0.1″', 'd = 10 pc'], ['p = 0.01″', 'd = 100 pc']];
  txt(s, 'ลองไล่ดู — มุมยิ่งเล็ก ดาวยิ่งไกล (แปรผกผันกันพอดี)', { x: 0.62, y: 4.5, w: 12.1, h: 0.4, fontSize: 15, bold: true, color: C.mut, align: 'center' });
  ex.forEach((e, i) => {
    const x = 0.95 + i * 2.95;
    card(s, x, 5.0, 2.7, 1.15, { fill: C.panel });
    txt(s, e[0], { x, y: 5.12, w: 2.7, h: 0.45, fontSize: 17, bold: true, color: C.blue, align: 'center' });
    txt(s, e[1], { x, y: 5.6, w: 2.7, h: 0.45, fontSize: 17, bold: true, color: C.gold, align: 'center' });
  });
  txt(s, 'เงื่อนไขเดียวที่ห้ามพลาด: ต้องใช้หน่วย ″ กับ pc คู่กันเสมอ — ห้ามแทนองศาหรือปีแสงลงสูตรตรง ๆ', {
    x: 0.62, y: 6.4, w: 12.1, h: 0.4, fontSize: 14.5, bold: true, italic: true, color: 'FFB3A3', align: 'center' });
  s.addNotes('ย้ำว่าสูตรสั้นเพราะ "เลือกหน่วยฉลาด" (นิยาม pc ผูกกับ 1″)\nโยงเลข: 1/0.5 = 2, 1/0.1 = 10 — เช็คว่านักเรียนหารเลขทศนิยมคล่อง');
})();

// ============================================================
// S9 — ตัวอย่างคำนวณ + ลองทำเอง
// ============================================================
(() => {
  const s = newSlide();
  header(s, 'WORKED EXAMPLE', 'ตัวอย่างวิธีทำ — แล้วถึงตาคุณ');
  // worked example
  card(s, 0.62, 1.6, 6.1, 4.9, { fill: C.panel });
  txt(s, 'ตัวอย่าง (ข้อ 2)', { x: 0.9, y: 1.78, w: 5.6, h: 0.4, fontSize: 16, bold: true, color: C.gold });
  txt(s, 'ดาวดวงหนึ่งมีมุมพาแรลแลกซ์ p = 0.5″\nดาวดวงนี้อยู่ห่างจากโลกกี่พาร์เซก', { x: 0.9, y: 2.2, w: 5.5, h: 0.85, fontSize: 15.5, color: C.ink, lineSpacing: 23 });
  ln(s, 0.9, 3.25, 6.45, 3.25, { color: C.edge, width: 1 });
  txt(s, [
    { text: 'สูตร      ', options: { color: C.mut, fontSize: 15 } }, { text: 'd = 1/p\n', options: { bold: true, italic: true, fontSize: 16, color: C.ink } },
    { text: 'แทนค่า  ', options: { color: C.mut, fontSize: 15 } }, { text: 'd = 1/0.5\n', options: { bold: true, fontSize: 16, color: C.ink } },
    { text: 'ตอบ      ', options: { color: C.mut, fontSize: 15 } }, { text: 'd = 2 พาร์เซก', options: { bold: true, fontSize: 18, color: C.gold } },
  ], { x: 0.9, y: 3.45, w: 5.5, h: 1.7, lineSpacing: 32 });
  card(s, 0.85, 5.35, 5.6, 0.95, { fill: C.panel2 });
  txt(s, 'หัวใจของคะแนนเต็ม: เขียนครบ 3 ขั้น — สูตร → แทนค่า → ตอบพร้อมหน่วย', { x: 1.05, y: 5.45, w: 5.2, h: 0.75, fontSize: 13.5, bold: true, color: C.blue, valign: 'middle', lineSpacing: 19 });
  // practice
  card(s, 7.0, 1.6, 5.72, 4.9, { fill: C.panel2 });
  txt(s, 'ลองทำเอง 2 นาที (ลงแบบฝึกหัดเลย)', { x: 7.28, y: 1.78, w: 5.2, h: 0.4, fontSize: 16, bold: true, color: C.blue });
  card(s, 7.28, 2.3, 5.15, 1.65, { fill: C.panel });
  txt(s, [
    { text: 'ข้อ 3   ', options: { bold: true, color: C.gold, fontSize: 15.5 } },
    { text: 'ดาวอีกดวงวัดมุมพาแรลแลกซ์ได้เพียง 0.02″ จงหาระยะของดาวเป็นพาร์เซก', options: { fontSize: 15, color: C.ink } },
  ], { x: 7.5, y: 2.45, w: 4.75, h: 1.35, valign: 'middle', lineSpacing: 22 });
  card(s, 7.28, 4.15, 5.15, 1.65, { fill: C.panel });
  txt(s, [
    { text: 'ข้อ 4   ', options: { bold: true, color: C.gold, fontSize: 15.5 } },
    { text: 'ถ้าดาวอยู่ห่างจากโลก 4 พาร์เซก ควรวัดมุมพาแรลแลกซ์ได้กี่ฟิลิปดา (คิดย้อนกลับ!)', options: { fontSize: 15, color: C.ink } },
  ], { x: 7.5, y: 4.3, w: 4.75, h: 1.35, valign: 'middle', lineSpacing: 22 });
  txt(s, 'ทำเสร็จแล้วจับคู่เช็คกับเพื่อน — ต่อด้วยตารางข้อ 5 เป็นการบ้าน', { x: 7.28, y: 5.95, w: 5.2, h: 0.4, fontSize: 12.5, italic: true, color: C.mut });
  s.addNotes('เฉลย: ข้อ 3 → d = 1/0.02 = 50 pc · ข้อ 4 → p = 1/d = 1/4 = 0.25″\nจุดพลาดบ่อย: ข้อ 4 ลืมกลับสูตรเป็น p = 1/d · ตารางข้อ 5: A→1.25 pc, B→4 pc, C→p=0.1″, D→20 pc');
})();

// ============================================================
// S10 — หน่วยระยะทาง 3 ชั้น
// ============================================================
(() => {
  const s = newSlide();
  header(s, 'CONCEPT 3', 'หน่วยระยะทางดาราศาสตร์ 3 ชั้น — เลือกตามขนาดของสิ่งที่วัด');
  const units = [
    { name: 'AU', full: 'หน่วยดาราศาสตร์ (Astronomical Unit)', def: 'ระยะเฉลี่ยโลก–ดวงอาทิตย์', val: '1.496 × 10¹¹ m', use: 'ระยะในระบบสุริยะ', color: C.gold, icon: 'orbit' },
    { name: 'ปีแสง', full: 'light-year (ly)', def: 'ระยะที่แสงเดินทางใน 1 ปี', val: '9.46 × 10¹⁵ m', use: 'ดาวฤกษ์ · กาแล็กซี', color: C.blue, icon: 'ray' },
    { name: 'พาร์เซก', full: 'parsec (pc) = 3.26 ปีแสง', def: 'ระยะที่ทำให้ p = 1″ พอดี', val: '3.086 × 10¹⁶ m', use: 'งานวัดระยะจริงของนักดาราศาสตร์', color: C.green, icon: 'angle' },
  ];
  units.forEach((u, i) => {
    const x = 0.62 + i * 4.18;
    card(s, x, 1.65, 3.85, 4.45, { fill: C.panel });
    s.addShape('roundRect', { x, y: 1.65, w: 3.85, h: 0.14, rectRadius: 0.05, fill: { color: u.color }, line: { type: 'none' } });
    // icon
    if (u.icon === 'orbit') {
      dot(s, x + 1.92, 2.65, 0.21, C.gold);
      s.addShape('ellipse', { x: x + 1.22, y: 2.3, w: 1.4, h: 0.72, fill: { type: 'none' }, line: { color: C.mut, width: 1.25, dashType: 'dash' } });
      dot(s, x + 2.6, 2.62, 0.07, C.blue);
    } else if (u.icon === 'ray') {
      star(s, x + 1.0, 2.62, 22, C.blue);
      ln(s, x + 1.3, 2.62, x + 2.85, 2.62, { color: C.blue, width: 2, endArrowType: 'triangle', dash: 'dash' });
    } else {
      ln(s, x + 1.1, 2.3, x + 2.8, 2.62, { color: C.green, width: 1.75 });
      ln(s, x + 1.1, 2.95, x + 2.8, 2.62, { color: C.green, width: 1.75 });
      txt(s, '1″', { x: x + 2.28, y: 2.46, w: 0.45, h: 0.33, fontSize: 12, bold: true, color: C.green });
    }
    txt(s, u.name, { x, y: 3.18, w: 3.85, h: 0.6, fontSize: 26, bold: true, color: u.color, align: 'center' });
    txt(s, u.full, { x: x + 0.15, y: 3.8, w: 3.55, h: 0.35, fontSize: 12, color: C.mut, align: 'center' });
    txt(s, u.def, { x: x + 0.15, y: 4.2, w: 3.55, h: 0.6, fontSize: 14.5, color: C.ink, align: 'center', lineSpacing: 19 });
    txt(s, u.val, { x: x + 0.15, y: 4.85, w: 3.55, h: 0.4, fontSize: 15, bold: true, color: u.color, align: 'center' });
    card(s, x + 0.3, 5.3, 3.25, 0.55, { fill: C.panel2, r: 0.27 });
    txt(s, u.use, { x: x + 0.3, y: 5.32, w: 3.25, h: 0.5, fontSize: 12.5, color: C.mut, align: 'center', valign: 'middle' });
  });
  txt(s, 'ตัวเชื่อมที่ใช้ทั้งชุด:  1 pc = 3.26 ปีแสง = 206,265 AU   ·   1 AU = 1.496 × 10¹¹ m   ·   1 ปีแสง = 9.46 × 10¹⁵ m', {
    x: 0.62, y: 6.35, w: 12.1, h: 0.42, fontSize: 14, bold: true, color: C.mut, align: 'center' });
  s.addNotes('เชื่อมข้อ 15 ในแบบฝึกหัด: เรียงสั้น→ยาว = AU < ปีแสง < พาร์เซก (ข้อ 4)\nถามต่อ: ทำไมไม่ใช้กิโลเมตร? (เลขใหญ่เกิน เขียน-เทียบลำบาก)');
})();

// ============================================================
// S11 — บันไดระยะทาง (รูปที่ 3)
// ============================================================
(() => {
  const s = newSlide();
  header(s, 'SCALE OF THE UNIVERSE', 'บันไดระยะทาง — จากบ้านเรา ออกไปกลางกาแล็กซี');
  card(s, 0.62, 1.75, 12.1, 4.1, { fill: C.panel });
  const baseY = 4.05;
  ln(s, 1.2, baseY, 12.2, baseY, { color: C.ink, width: 2.25, endArrowType: 'triangle' });
  const stops = [
    { x: 1.7, name: 'ดวงอาทิตย์', d: '1 AU', t: 'แสงเดินทาง 8.3 นาที', up: true, icon: 'sun' },
    { x: 4.1, name: 'พร็อกซิมา เซนทอรี', d: '4.24 ปีแสง (1.3 pc)', t: 'เพื่อนบ้านใกล้สุด', up: false, icon: 'star' },
    { x: 6.4, name: 'ซิริอุส', d: '8.6 ปีแสง', t: 'ดาวสว่างสุดยามค่ำคืน', up: true, icon: 'star' },
    { x: 8.7, name: 'ดาวเหนือ (Polaris)', d: '~433 ปีแสง', t: 'ภาพจากสมัยอยุธยา', up: false, icon: 'star' },
    { x: 11.1, name: 'ใจกลางทางช้างเผือก', d: '~26,000 ปีแสง', t: 'ภาพจากยุคน้ำแข็ง', up: true, icon: 'gal' },
  ];
  stops.forEach(st => {
    ln(s, st.x, baseY - 0.12, st.x, baseY + 0.12, { color: C.ink, width: 2 });
    if (st.icon === 'sun') dot(s, st.x, baseY - 0.45, 0.17, C.gold);
    else if (st.icon === 'gal') { dot(s, st.x, baseY - 0.45, 0.18, '8A5BC4'); dot(s, st.x, baseY - 0.45, 0.08, C.ink); }
    else star(s, st.x, baseY - 0.45, 17, C.blue);
    const ty = st.up ? baseY - 1.85 : baseY + 0.35;
    txt(s, [
      { text: st.name + '\n', options: { fontSize: 14, bold: true, color: C.ink } },
      { text: st.d + '\n', options: { fontSize: 13.5, bold: true, color: C.gold } },
      { text: st.t, options: { fontSize: 11.5, color: C.mut } },
    ], { x: st.x - 1.18, y: ty, w: 2.36, h: 1.15, align: 'center', lineSpacing: 17 });
  });
  txt(s, '(สเกลถูกบีบ — ระยะจริงแต่ละช่วงห่างกันหลายพันเท่า)', { x: 8.9, y: 1.88, w: 3.7, h: 0.3, fontSize: 11.5, italic: true, color: '5C6FA0', align: 'right' });
  txt(s, 'รูปที่ 3  บันไดระยะทาง — ตัวเลข "ปีแสง" ของแต่ละดวง คือ "อายุของภาพ" ที่เรากำลังเห็น', {
    x: 0.62, y: 5.95, w: 12.1, h: 0.35, fontSize: 13, italic: true, color: C.mut, align: 'center' });
  card(s, 0.62, 6.4, 12.1, 0.55, { fill: '23304F', edge: C.gold, edgeW: 1 });
  txt(s, 'สังเกตอะไรไหม? ยิ่งมองไกล = ยิ่งมองย้อนอดีตลึกลงไป…', { x: 0.9, y: 6.42, w: 11.5, h: 0.5, fontSize: 14.5, bold: true, color: C.gold, valign: 'middle', align: 'center' });
  s.addNotes('ให้นักเรียนลองคิด: แสงอาทิตย์ที่ส่องหน้าเราตอนนี้ ออกเดินทางมาแล้ว 8.3 นาที (= ข้อ 11 ในแบบฝึกหัด)\nแถบนี้คือสะพานเข้าแนวคิด "จดหมายจากอดีต" สไลด์ถัดไป');
})();

// ============================================================
// S12 — แสงจากอดีต
// ============================================================
(() => {
  const s = newSlide();
  header(s, 'CONCEPT 3', 'ทุกครั้งที่มองดาว — เรากำลังอ่านจดหมายจากอดีต');
  card(s, 0.62, 1.55, 12.1, 1.05, { fill: '23304F', edge: C.gold, edgeW: 1.5 });
  txt(s, 'ดาวที่อยู่ห่าง N ปีแสง  =  ภาพของดาวเมื่อ N ปีก่อน', { x: 0.9, y: 1.65, w: 11.5, h: 0.85, fontSize: 24, bold: true, color: C.gold, align: 'center', valign: 'middle' });
  // Polaris card
  card(s, 0.62, 2.95, 5.95, 3.35, { fill: C.panel });
  star(s, 1.3, 3.55, 26, C.blue);
  txt(s, 'ดาวเหนือ (Polaris) · ห่าง ~433 ปีแสง', { x: 1.75, y: 3.3, w: 4.6, h: 0.45, fontSize: 16.5, bold: true, color: C.ink });
  txt(s, [
    { text: 'แสงที่เห็นคืนนี้ออกเดินทางเมื่อ\n', options: { fontSize: 14.5, color: C.mut } },
    { text: 'พ.ศ. 2569 − 433 = พ.ศ. 2136\n', options: { fontSize: 19, bold: true, color: C.blue } },
    { text: 'สมัยอยุธยา ใกล้ปียุทธหัตถีของสมเด็จพระนเรศวร (พ.ศ. 2135) — แสงเดินทางมาตลอด ไม่เคยหยุดพัก จนถึงตาเราคืนนี้', options: { fontSize: 14, color: C.ink } },
  ], { x: 0.95, y: 3.95, w: 5.3, h: 2.15, lineSpacing: 24, valign: 'top' });
  // Betelgeuse card
  card(s, 6.85, 2.95, 5.85, 3.35, { fill: C.panel });
  dot(s, 7.55, 3.55, 0.26, 'C24A3A'); dot(s, 7.55, 3.55, 0.14, 'F2A45C');
  txt(s, 'ถ้าบีเทลจุสระเบิด "ตอนนี้" ล่ะ?', { x: 7.98, y: 3.3, w: 4.5, h: 0.45, fontSize: 16.5, bold: true, color: C.ink });
  txt(s, [
    { text: 'โลกจะยังไม่รู้อะไรเลยไปอีก ~500 ปี เพราะข่าว (แสง) ยังเดินทางมาไม่ถึง\n', options: { fontSize: 14.5, color: C.ink } },
    { text: 'และในทางกลับกัน — เป็นไปได้ว่า "ที่จริงมันระเบิดไปแล้ว" เมื่อหลายร้อยปีก่อน แต่เรายังเห็นมันส่องแสงอยู่ทุกคืน', options: { fontSize: 14.5, color: C.ink } },
  ], { x: 7.1, y: 3.95, w: 5.35, h: 2.0, lineSpacing: 22 });
  txt(s, '→ นี่คือคำตอบของ "คำถามสำคัญข้อ 0" — แต่ยังไม่บอกใคร ให้กลับไปตรวจเองท้ายคาบ', {
    x: 0.62, y: 6.5, w: 12.1, h: 0.4, fontSize: 14, italic: true, color: C.mut, align: 'center' });
  s.addNotes('เชื่อมข้อ 12 (ดาวเหนือ) และข้อ 13 (บีเทลจุสระเบิด) ในแบบฝึกหัด\nเสริม: ชื่อตอน EP03 "เสียงร้องจากอดีต" มาจากแนวคิดนี้เอง');
})();

// ============================================================
// S13 — Magnitude: อันดับความสว่าง
// ============================================================
(() => {
  const s = newSlide();
  header(s, 'CONCEPT 4', 'อันดับความสว่าง (Magnitude) — "อันดับ" เหมือนอันดับสอบ');
  txt(s, 'กว่า 2,100 ปีก่อน ฮิปปาร์คอส จัดอันดับดาวทั้งฟ้า: สว่างสุด = อันดับ 1 ไล่ถึงริบหรี่สุดที่ตาเปล่าเห็น = อันดับ 6', {
    x: 0.62, y: 1.35, w: 12.1, h: 0.42, fontSize: 15, color: C.mut });
  card(s, 0.62, 1.92, 12.1, 0.95, { fill: '23304F', edge: C.gold, edgeW: 1.5 });
  txt(s, 'ตัวเลขยิ่งน้อย ดาวยิ่งสว่าง — ที่ 1 คือดีที่สุด เหมือนอันดับสอบ  (สว่างจัดจนติดลบก็มี!)', {
    x: 0.9, y: 2.0, w: 11.5, h: 0.78, fontSize: 19, bold: true, color: C.gold, align: 'center', valign: 'middle' });
  // magnitude scale
  card(s, 0.62, 3.15, 12.1, 3.1, { fill: C.panel });
  const y0 = 4.85;
  ln(s, 1.15, y0, 12.25, y0, { color: C.ink, width: 2.25, endArrowType: 'triangle', beginArrowType: 'arrow' });
  txt(s, '← สว่างขึ้น', { x: 1.15, y: 5.95, w: 2.0, h: 0.32, fontSize: 12.5, bold: true, color: C.gold });
  txt(s, 'ริบหรี่ลง →', { x: 10.4, y: 5.95, w: 1.85, h: 0.32, fontSize: 12.5, bold: true, color: C.mut, align: 'right' });
  const objs = [
    { x: 1.75, m: '−26.7', n: 'ดวงอาทิตย์', up: true, c: C.gold },
    { x: 3.15, m: '−12.7', n: 'จันทร์เพ็ญ', up: false, c: C.gold },
    { x: 4.55, m: '−4.4', n: 'ดาวศุกร์', up: true, c: C.gold },
    { x: 5.85, m: '−1.5', n: 'ซิริอุส', up: false, c: C.blue },
    { x: 7.05, m: '0.0', n: 'ดาววีกา', up: true, c: C.blue },
    { x: 8.55, m: '+6', n: 'ขีดจำกัดตาเปล่า', up: false, c: C.mut },
    { x: 10.0, m: '+14', n: 'ดาวพลูโต', up: true, c: C.mut },
    { x: 11.45, m: '+20', n: 'ขีดจำกัด Gaia', up: false, c: C.mut },
  ];
  objs.forEach(o => {
    ln(s, o.x, y0 - 0.1, o.x, y0 + 0.1, { color: C.ink, width: 1.75 });
    dot(s, o.x, o.up ? y0 - 0.32 : y0 + 0.32, 0.055, o.c);
    txt(s, [
      { text: o.m + '\n', options: { fontSize: 14, bold: true, color: o.c } },
      { text: o.n, options: { fontSize: 11.5, color: C.ink } },
    ], { x: o.x - 0.85, y: o.up ? y0 - 1.35 : y0 + 0.42, w: 1.7, h: 0.95, align: 'center', lineSpacing: 16 });
  });
  txt(s, 'อันดับความสว่างปรากฏ (m) ของวัตถุคุ้นตา — สเกลตำแหน่งไม่เท่าจริง', { x: 0.62, y: 3.25, w: 12.0, h: 0.3, fontSize: 11.5, italic: true, color: '5C6FA0', align: 'center' });
  txt(s, 'เช็คเร็ว: ซิริอุส (−1.5) กับ ดาววีกา (0.0) — ดวงไหนสว่างกว่า?', { x: 0.62, y: 6.5, w: 12.1, h: 0.4, fontSize: 15, bold: true, color: C.blue, align: 'center' });
  s.addNotes('เช็คเร็ว: ซิริอุสสว่างกว่า (เลขน้อยกว่า) — ดัก misconception "เลขมาก = สว่างมาก" ก่อนเข้า Spot the Error\nย้ำคำว่า "ปรากฏ" = สว่างที่ตาเห็นจากโลก ยังไม่ใช่กำลังส่องสว่างจริง (โยงข้อ 22)');
})();

// ============================================================
// S14 — สูตรอัตราส่วนความสว่าง
// ============================================================
(() => {
  const s = newSlide();
  header(s, 'KEY FORMULA', 'ต่างกัน 5 อันดับ = สว่างต่างกัน 100 เท่า');
  card(s, 0.62, 1.6, 7.2, 2.35, { fill: '23304F', edge: C.gold, edgeW: 2 });
  txt(s, [
    { text: 'อัตราส่วนความสว่าง = 100', options: { fontSize: 24, bold: true, color: C.gold } },
    { text: 'Δm/5', options: { fontSize: 24, bold: true, color: C.gold, superscript: true } },
    { text: ' = (2.512)', options: { fontSize: 24, bold: true, color: C.gold } },
    { text: 'Δm', options: { fontSize: 24, bold: true, color: C.gold, superscript: true } },
  ], { x: 0.62, y: 1.95, w: 7.2, h: 0.85, align: 'center', valign: 'middle' });
  txt(s, 'Δm = ผลต่างอันดับความสว่างของดาวสองดวง\nต่าง 1 อันดับ = 2.512 เท่า (มาจาก ⁵√100)', { x: 0.62, y: 2.9, w: 7.2, h: 0.9, fontSize: 14.5, color: C.ink, align: 'center', lineSpacing: 21 });
  // quick table
  card(s, 8.15, 1.6, 4.55, 2.35, { fill: C.panel });
  txt(s, 'ตารางใช้บ่อย', { x: 8.4, y: 1.72, w: 4.0, h: 0.35, fontSize: 14, bold: true, color: C.blue });
  const rows = [['Δm = 1', '2.512 เท่า'], ['Δm = 2', '≈ 6.3 เท่า'], ['Δm = 5', '100 เท่า'], ['Δm = 10', '100 × 100 = 10⁴ เท่า']];
  rows.forEach((r, i) => {
    const y = 2.12 + i * 0.44;
    txt(s, r[0], { x: 8.45, y, w: 1.55, h: 0.4, fontSize: 14, bold: true, color: C.ink });
    txt(s, r[1], { x: 10.05, y, w: 2.55, h: 0.4, fontSize: 14, color: C.gold });
  });
  // example
  card(s, 0.62, 4.25, 12.1, 1.9, { fill: C.panel });
  txt(s, 'ตัวอย่าง (ข้อ 17)  ดาว A มี m = 2 และดาว B มี m = 7 — ดาว A สว่างกว่ากี่เท่า', { x: 0.9, y: 4.4, w: 11.5, h: 0.45, fontSize: 16, bold: true, color: C.ink });
  txt(s, [
    { text: 'Δm = 7 − 2 = 5   →   อัตราส่วน = 100', options: { fontSize: 16, color: C.ink } },
    { text: '5/5', options: { fontSize: 16, color: C.ink, superscript: true } },
    { text: ' = 100¹ = ', options: { fontSize: 16, color: C.ink } },
    { text: '100 เท่า', options: { fontSize: 18, bold: true, color: C.gold } },
  ], { x: 0.9, y: 4.95, w: 11.5, h: 0.5 });
  txt(s, 'สังเกต: ระบบนี้ขึ้นกับ "ผลต่าง" ของอันดับ ไม่ใช่ค่าของอันดับเอง — m = 1 กับ 6 ก็ต่าง 100 เท่าเหมือนกัน', {
    x: 0.9, y: 5.5, w: 11.5, h: 0.45, fontSize: 14, italic: true, color: C.mut });
  txt(s, 'ลองทำ: ข้อ 16 · 18 · 20 ในแบบฝึกหัด (3 นาที)', { x: 0.62, y: 6.45, w: 12.1, h: 0.4, fontSize: 15, bold: true, color: C.blue, align: 'center' });
  s.addNotes('เฉลยลองทำ: ข้อ 16 → m=1 สว่างกว่า 100 เท่า · ข้อ 18 → Δm=10 → 10⁴ เท่า · ข้อ 20 → ต่าง 1 อันดับ\nย้ำ: 2.512 มาจาก ⁵√100 ไม่ต้องท่อง แค่จำ "5 อันดับ = 100 เท่า" แล้วประกอบเอา');
})();

// ============================================================
// S15 — Spot the Error
// ============================================================
(() => {
  const s = newSlide();
  header(s, 'SPOT THE ERROR · จับผิดให้ได้', 'เพื่อนคนนี้สรุปผิดตรงไหน?');
  card(s, 0.95, 1.75, 11.75, 2.05, { fill: C.panel, edge: C.red, edgeW: 1.75 });
  txt(s, '💬', { x: 1.3, y: 2.05, w: 0.7, h: 0.7, fontSize: 30 });
  txt(s, '"ดาว ก มีอันดับความสว่าง m = 1 ส่วนดาว ข มี m = 4\nดังนั้นดาว ข สว่างกว่าดาว ก — เพราะ 4 มากกว่า 1"', {
    x: 2.3, y: 1.95, w: 10.1, h: 1.65, fontSize: 19, italic: true, color: C.ink, align: 'center', valign: 'middle', lineSpacing: 30 });
  const qs = [
    ['1', 'ข้อสรุปนี้ผิดตรงไหน?'],
    ['2', 'ที่ถูกคือดวงไหนสว่างกว่า?'],
    ['3', 'สว่างกว่ากันประมาณกี่เท่า?'],
  ];
  qs.forEach((q, i) => {
    const x = 0.95 + i * 4.0;
    card(s, x, 4.2, 3.7, 1.5, { fill: C.panel2 });
    dot(s, x + 0.48, 4.95, 0.24, C.blue);
    txt(s, q[0], { x: x + 0.24, y: 4.71, w: 0.48, h: 0.48, fontSize: 16, bold: true, color: C.bg, align: 'center', valign: 'middle' });
    txt(s, q[1], { x: x + 0.88, y: 4.35, w: 2.7, h: 1.2, fontSize: 15, color: C.ink, valign: 'middle', lineSpacing: 21 });
  });
  card(s, 0.95, 6.0, 11.75, 0.8, { fill: '23304F' });
  txt(s, 'คิดเดี่ยว 1 นาที → คุยคู่ 1 นาที → สุ่มถาม แล้วเขียนคำตอบลงกรอบ Spot the Error ในแบบฝึกหัด (หน้า 7)', {
    x: 1.2, y: 6.08, w: 11.2, h: 0.65, fontSize: 14.5, bold: true, color: C.ink, valign: 'middle', align: 'center' });
  s.addNotes('เฉลย: ผิดเพราะ magnitude คือ "อันดับ" เลขน้อย = สว่างกว่า → ดาว ก สว่างกว่า\nΔm = 3 → 2.512³ ≈ 15.8 เท่า (ประมาณ 16 เท่า)\nนี่คือ misconception หลักของหัวข้อนี้ — ใช้เวลากับสไลด์นี้ให้คุ้ม');
})();

// ============================================================
// S16 — ขีดจำกัดของพาแรลแลกซ์ + ผู้สืบทอด
// ============================================================
(() => {
  const s = newSlide();
  header(s, '⭐ ระดับสอบแข่งขัน', 'ขีดจำกัดของพาแรลแลกซ์ — และผู้สืบทอดตำแหน่ง');
  txt(s, 'ความแม่นของวิธีนี้ถูกกำหนดด้วย "ความละเอียดของการวัดมุม" — มุมเล็กสุดที่วัดไหว กำหนดระยะไกลสุดที่วัดได้ (d = 1/p)', {
    x: 0.62, y: 1.35, w: 12.1, h: 0.42, fontSize: 14.5, color: C.mut });
  const gens = [
    { n: 'กล้องบนพื้นโลก', p: '0.01″', d: '~100 pc', note: 'ถูกบรรยากาศรบกวน', c: C.mut },
    { n: 'ดาวเทียม Hipparcos (พ.ศ. 2532)', p: '0.001″', d: '~1,000 pc', note: 'เก็บดาว > 100,000 ดวง', c: C.blue },
    { n: 'ดาวเทียม Gaia (พ.ศ. 2556–)', p: '0.00002″', d: '~50,000 pc', note: 'แผนที่ดาว 1.4 พันล้านดวง', c: C.gold },
  ];
  gens.forEach((g, i) => {
    const y = 1.95 + i * 1.18;
    card(s, 0.62, y, 7.85, 1.0, { fill: C.panel, edge: g.c === C.gold ? C.gold : C.edge, edgeW: g.c === C.gold ? 1.5 : 1 });
    txt(s, g.n, { x: 0.9, y: y + 0.1, w: 4.0, h: 0.45, fontSize: 14.5, bold: true, color: g.c });
    txt(s, g.note, { x: 0.9, y: y + 0.52, w: 4.0, h: 0.38, fontSize: 12, color: C.mut });
    txt(s, 'วัดได้ละเอียด ' + g.p, { x: 4.9, y: y + 0.1, w: 3.4, h: 0.4, fontSize: 13.5, color: C.ink });
    txt(s, '→ วัดไกลสุด ' + g.d, { x: 4.9, y: y + 0.5, w: 3.4, h: 0.4, fontSize: 14.5, bold: true, color: g.c });
  });
  card(s, 8.8, 1.95, 3.92, 3.54, { fill: C.panel2 });
  txt(s, 'ไกลกว่านั้นล่ะ?', { x: 9.05, y: 2.12, w: 3.4, h: 0.4, fontSize: 15.5, bold: true, color: C.gold });
  txt(s, 'มุมเล็กจนวัดไม่ไหว → ใช้ "เทียนมาตรฐาน" (standard candles)\n\n• ดาวแปรแสงเซเฟอิด\n• ซูเปอร์โนวาชนิด Ia\n\nรู้กำลังส่องสว่างจริง เทียบกับความสว่างปรากฏ แล้วย้อนคำนวณระยะ', {
    x: 9.05, y: 2.55, w: 3.45, h: 2.85, fontSize: 13, color: C.ink, lineSpacing: 19 });
  card(s, 0.62, 5.72, 12.1, 1.0, { fill: '23304F', edge: C.gold, edgeW: 1.25 });
  txt(s, 'แต่บันไดทุกขั้นต้อง "สอบเทียบ" กับขั้นแรกเสมอ — พาแรลแลกซ์คือรากฐานของการวัดระยะทั้งเอกภพ', {
    x: 0.9, y: 5.82, w: 11.5, h: 0.8, fontSize: 16.5, bold: true, color: C.gold, valign: 'middle', align: 'center' });
  s.addNotes('โยงโจทย์ท้าทาย: ข้อ 24 (0.01″ → 100 pc) และข้อ 25 (Gaia → 50,000 pc ≈ ใหญ่กว่าจานทางช้างเผือก ~30,000 pc → ครอบคลุมเกือบทั้งกาแล็กซี)\nข้อ 27 แนวคิด error: p = 0.002″ ± 0.001″ → d อยู่ระหว่าง 1/0.003 ≈ 333 pc ถึง 1/0.001 = 1,000 pc — ช่วงกว้างมาก');
})();

// ============================================================
// S17 — สรุป: แผนที่หลักการ + 3-2-1
// ============================================================
(() => {
  const s = newSlide();
  header(s, 'WRAP-UP', 'แผนที่หลักการ — ปิดจดหมายจากอดีต');
  const flow = [
    ['① วัดมุม', 'มุมพาแรลแลกซ์ p\n(หน่วย: ฟิลิปดา ″)'],
    ['② คำนวณ', 'd = 1/p\nได้ระยะเป็น pc'],
    ['③ แปลงหน่วย', '× 3.26\nได้เป็นปีแสง'],
    ['④ อ่านจดหมาย', 'ห่าง N ปีแสง\n= ภาพเมื่อ N ปีก่อน'],
    ['⑤ ความสว่าง', 'm เลขน้อย = สว่าง\nต่าง 5 = 100 เท่า'],
  ];
  flow.forEach((f, i) => {
    const x = 0.62 + i * 2.52;
    card(s, x, 1.7, 2.28, 1.75, { fill: i === 4 ? C.panel2 : C.panel, edge: C.edge });
    txt(s, f[0], { x, y: 1.85, w: 2.28, h: 0.45, fontSize: 15, bold: true, color: C.gold, align: 'center' });
    txt(s, f[1], { x: x + 0.08, y: 2.32, w: 2.12, h: 1.05, fontSize: 12.5, color: C.ink, align: 'center', lineSpacing: 18, valign: 'top' });
    if (i < 4) ln(s, x + 2.3, 2.58, x + 2.5, 2.58, { color: C.gold, width: 2, endArrowType: 'triangle' });
  });
  txt(s, 'ดาวไกลเกิน ~1,000 pc (จากพื้นโลก) → มุมเล็กเกินวัด → ส่งไม้ต่อให้ดาวเทียม Gaia และเทียนมาตรฐาน', {
    x: 0.62, y: 3.6, w: 12.1, h: 0.4, fontSize: 13.5, italic: true, color: C.mut, align: 'center' });
  // กลับไปข้อ 0
  card(s, 0.62, 4.2, 6.1, 2.35, { fill: '23304F', edge: C.gold, edgeW: 1.5 });
  txt(s, '⟲ กลับไปที่คำถามสำคัญ (ข้อ 0)', { x: 0.9, y: 4.38, w: 5.6, h: 0.45, fontSize: 17, bold: true, color: C.gold });
  txt(s, 'เปิดหน้า 1 ของแบบฝึกหัด ตรวจคำตอบ "ก่อนเรียน" ของตัวเอง แล้วเติมช่อง "หลังเรียนจบ"\nถ้าคำตอบเปลี่ยน — เขียนสั้น ๆ ว่าความเข้าใจเราเปลี่ยนตรงไหน', {
    x: 0.9, y: 4.9, w: 5.55, h: 1.5, fontSize: 14, color: C.ink, lineSpacing: 22 });
  // 3-2-1
  card(s, 7.0, 4.2, 5.72, 2.35, { fill: C.panel });
  txt(s, '✎ 3-2-1 ก่อนส่ง', { x: 7.28, y: 4.38, w: 5.2, h: 0.45, fontSize: 17, bold: true, color: C.blue });
  txt(s, [
    { text: '3', options: { bold: true, color: C.gold, fontSize: 16 } }, { text: '  สิ่งที่ได้เรียนรู้\n', options: { fontSize: 14.5, color: C.ink } },
    { text: '2', options: { bold: true, color: C.gold, fontSize: 16 } }, { text: '  สิ่งที่อยากรู้ต่อ\n', options: { fontSize: 14.5, color: C.ink } },
    { text: '1', options: { bold: true, color: C.gold, fontSize: 16 } }, { text: '  คำถามที่ยังค้างใจ — คำถามของคุณคือประตูสู่ EP04', options: { fontSize: 14.5, color: C.ink } },
  ], { x: 7.28, y: 4.9, w: 5.2, h: 1.5, lineSpacing: 26 });
  txt(s, 'ตอนต่อไป  EP04 — วันสุดท้ายของดาวยักษ์แดง ★', { x: 0.62, y: 6.72, w: 12.1, h: 0.45, fontSize: 16, bold: true, italic: true, color: 'FFB3A3', align: 'center' });
  s.addNotes('ปิดวงจร predict-observe-explain ของข้อ 0 (เฉลย: ข้อ 2)\nแผนที่หลักการนี้ = เฉลยของกรอบ "เติมคำ" หน้า 10 ในแบบฝึกหัด\nteaser EP04: บีเทลจุสที่ค้างคาใจ จะได้คำตอบว่าดาวยักษ์แดงตายอย่างไร');
})();

pptx.writeFile({ fileName: process.argv[2] || 'EP03-พาแรลแลกซ์-สื่อนำเสนอ.pptx' }).then(f => console.log('written:', f));
