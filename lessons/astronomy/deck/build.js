// COSMOS LOG · Season 1 — Full Deck Generator
// Build: node build.js  → COSMOS_LOG_DECK.pptx

const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10" × 5.625"
pres.author = "เจน · Researcher / วPA";
pres.company = "โรงเรียนสตรีวิทยา";
pres.title = "COSMOS LOG · Season 1 · นิยายดาราศาสตร์ ม.6";

// ============ PALETTE ============
const C = {
  bg: "0A0E1A",     // midnight
  bg2: "111728",    // deep navy
  panel: "161D33",  // card
  line: "2A3454",   // border
  ink: "E7ECF5",    // body text
  dim: "9AA6C2",    // muted
  gold: "F5C451",   // accent gold
  rose: "FF6B9D",   // alert/EP tag
  mint: "5FD9B5",   // mentor/AI
  hubble: "7AB8FF", // dialogue
  void: "A062FF",   // VOID
  amber: "FFA54F",  // family/dad
  red: "FF5050",    // danger
  white: "FFFFFF",
};

const FH = "Calibri"; // header (Thai-compatible)
const FB = "Calibri"; // body

// ============ HELPERS ============
function bg(s, color = C.bg) {
  s.background = { color };
}
function starfield(s) {
  // sprinkle of small dots
  const seeds = [[0.5,0.4],[1.2,1.8],[2.6,0.6],[3.4,2.3],[5.1,1.1],[6.0,3.6],[7.4,0.9],[8.8,2.5],[9.3,4.1],[1.8,4.9],[4.4,4.6],[7.9,4.8],[2.0,3.2],[8.4,1.6],[5.7,0.3],[6.8,4.2]];
  for (const [x,y] of seeds) {
    s.addShape(pres.shapes.OVAL, { x, y, w: 0.04, h: 0.04, fill:{color:C.white}, line:{type:"none"} });
  }
}
function smallStarfield(s) {
  const seeds = [[1.5,4.8],[3.4,5.1],[6.2,4.7],[8.9,5.0],[0.8,0.3],[5.8,0.2]];
  for (const [x,y] of seeds) {
    s.addShape(pres.shapes.OVAL, { x, y, w: 0.035, h: 0.035, fill:{color:C.white}, line:{type:"none"} });
  }
}
function tag(s, text, x, y, color = C.rose, w = 1.6) {
  s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.32, fill: { color }, line: { type: "none" } });
  s.addText(text, { x, y, w, h: 0.32, fontFace: FH, fontSize: 11, bold: true, color: C.bg, align: "center", valign: "middle", charSpacing: 3, margin: 0 });
}
function tagOutline(s, text, x, y, color = C.gold, w = 1.6) {
  s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.32, fill: { color: C.bg }, line: { color, width: 1 } });
  s.addText(text, { x, y, w, h: 0.32, fontFace: FH, fontSize: 11, bold: true, color, align: "center", valign: "middle", charSpacing: 3, margin: 0 });
}
function corner(s, label) {
  s.addText("★ COSMOS LOG · S1", { x: 0.3, y: 5.32, w: 3.5, h: 0.28, fontFace: FH, fontSize: 9, color: C.dim, charSpacing: 2, margin: 0 });
  s.addText(label, { x: 6.5, y: 5.32, w: 3.2, h: 0.28, fontFace: FH, fontSize: 9, color: C.dim, align: "right", charSpacing: 2, margin: 0 });
}
function chip(s, text, x, y, color, w = 1.2) {
  s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.28, fill: { color: C.panel }, line: { color, width: 1 } });
  s.addText(text, { x, y, w, h: 0.28, fontFace: FH, fontSize: 10, bold: true, color, align: "center", valign: "middle", margin: 0 });
}
function divider(s, x, y, w, color = C.line) {
  s.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color, width: 1 } });
}

// ============ SLIDE BUILDERS ============

// 1) HERO COVER
function slideHero(opts) {
  const s = pres.addSlide();
  bg(s, C.bg);
  starfield(s);
  // big purple swirl glow
  s.addShape(pres.shapes.OVAL, { x: 6.5, y: -2.5, w: 8, h: 8, fill: { color: C.void, transparency: 80 }, line:{type:"none"} });
  s.addShape(pres.shapes.OVAL, { x: -3, y: 2.5, w: 6, h: 6, fill: { color: "1A3A6A", transparency: 70 }, line:{type:"none"} });

  s.addText(opts.badge || "SEASON 1 · NOVELLA DECK", { x: 0.5, y: 1.0, w: 9, h: 0.4, fontFace: FH, fontSize: 12, bold: true, color: C.gold, align: "center", charSpacing: 8, margin: 0 });
  s.addText("🌌 COSMOS LOG", { x: 0.5, y: 1.5, w: 9, h: 1.4, fontFace: FH, fontSize: 70, bold: true, color: C.white, align: "center", margin: 0 });
  s.addText(opts.title, { x: 0.5, y: 2.95, w: 9, h: 0.6, fontFace: FH, fontSize: 28, color: C.hubble, align: "center", italic: true, margin: 0 });
  s.addText(opts.subtitle, { x: 0.5, y: 3.6, w: 9, h: 0.4, fontFace: FH, fontSize: 14, color: C.dim, align: "center", margin: 0 });

  s.addText("ครูโกเมน ปาปะโถ · ว 30105 ดาราศาสตร์ ม.6 · โรงเรียนสตรีวิทยา · 2569", { x: 0.5, y: 4.5, w: 9, h: 0.3, fontFace: FH, fontSize: 11, color: C.dim, align: "center", margin: 0 });
  s.addText("เขียนโดย เจน · Researcher / วPA", { x: 0.5, y: 4.85, w: 9, h: 0.3, fontFace: FH, fontSize: 10, color: C.gold, align: "center", italic: true, margin: 0 });
}

// 2) CHAPTER COVER (EP intro)
function slideChapter(num, title, en, theme, color = C.gold) {
  const s = pres.addSlide();
  bg(s, C.bg);
  starfield(s);
  // accent rectangle left
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.25, h: 5.625, fill: { color }, line:{type:"none"} });

  s.addText("EPISODE", { x: 0.7, y: 1.1, w: 4, h: 0.3, fontFace: FH, fontSize: 12, color: C.dim, charSpacing: 8, bold: true, margin: 0 });
  s.addText(num, { x: 0.7, y: 1.4, w: 4, h: 1.5, fontFace: FH, fontSize: 130, bold: true, color, margin: 0 });
  s.addText(title, { x: 0.7, y: 3.2, w: 9, h: 0.7, fontFace: FH, fontSize: 40, bold: true, color: C.white, margin: 0 });
  s.addText(en, { x: 0.7, y: 3.9, w: 9, h: 0.4, fontFace: FH, fontSize: 16, color: C.dim, italic: true, margin: 0 });
  divider(s, 0.7, 4.5, 4, color);
  s.addText("THEME · " + theme, { x: 0.7, y: 4.6, w: 9, h: 0.4, fontFace: FH, fontSize: 13, color: C.hubble, bold: true, charSpacing: 2, margin: 0 });
  corner(s, "EP " + num);
}

// 3) STORY SCENE (icon big left + caption + dialogue)
function slideStory(opts) {
  const s = pres.addSlide();
  bg(s, C.bg);
  smallStarfield(s);

  // top tag bar
  tag(s, opts.tag || "SCENE", 0.5, 0.35, opts.tagColor || C.rose, 2.2);
  s.addText(opts.timestamp || "", { x: 7.5, y: 0.35, w: 2.0, h: 0.32, fontFace: FH, fontSize: 11, color: C.dim, align: "right", italic: true, margin: 0 });

  // title
  s.addText(opts.title, { x: 0.5, y: 0.85, w: 9, h: 0.6, fontFace: FH, fontSize: 30, bold: true, color: C.gold, margin: 0 });

  // left: big icon card
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.6, w: 3.6, h: 3.5, fill: { color: opts.sceneColor || "1A1A4A" }, line: { color: C.line, width: 1 } });
  s.addShape(pres.shapes.OVAL, { x: 1.5, y: 2.2, w: 1.6, h: 1.6, fill: { color: opts.iconBg || C.void, transparency: 60 }, line:{type:"none"} });
  s.addText(opts.icon || "🌌", { x: 0.5, y: 2.2, w: 3.6, h: 1.6, fontFace: FH, fontSize: 70, align: "center", valign: "middle", margin: 0 });
  s.addText(opts.iconLabel || "", { x: 0.5, y: 4.1, w: 3.6, h: 0.7, fontFace: FH, fontSize: 13, color: C.gold, align: "center", bold: true, charSpacing: 3, margin: 0 });
  s.addText(opts.iconSub || "", { x: 0.5, y: 4.55, w: 3.6, h: 0.4, fontFace: FH, fontSize: 11, color: C.dim, align: "center", italic: true, margin: 0 });

  // right: body
  if (opts.narration) {
    s.addText(opts.narration, { x: 4.4, y: 1.6, w: 5.1, h: 1.8, fontFace: FB, fontSize: 13, color: C.ink, valign: "top", margin: 0, paraSpaceAfter: 4 });
  }
  // dialogue card
  if (opts.speaker) {
    s.addShape(pres.shapes.RECTANGLE, { x: 4.4, y: 3.5, w: 5.1, h: 1.6, fill: { color: opts.dialogBg || "151F3A" }, line: { color: opts.dialogColor || C.hubble, width: 0 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 4.4, y: 3.5, w: 0.06, h: 1.6, fill: { color: opts.dialogColor || C.hubble }, line:{type:"none"} });
    s.addText(opts.speaker.toUpperCase(), { x: 4.55, y: 3.6, w: 4.9, h: 0.3, fontFace: FH, fontSize: 11, bold: true, color: opts.dialogColor || C.hubble, charSpacing: 4, margin: 0 });
    s.addText(opts.line, { x: 4.55, y: 3.92, w: 4.9, h: 1.1, fontFace: FB, fontSize: 13, color: C.ink, italic: true, valign: "top", margin: 0 });
  }
  corner(s, opts.tag || "");
}

// 4) KNOWLEDGE (formula + bullets)
function slideKnowledge(opts) {
  const s = pres.addSlide();
  bg(s, C.bg);
  smallStarfield(s);
  tag(s, "🔑 KNOWLEDGE", 0.5, 0.35, C.mint, 2.2);
  s.addText(opts.ep, { x: 7.5, y: 0.35, w: 2.0, h: 0.32, fontFace: FH, fontSize: 11, color: C.dim, align: "right", italic: true, margin: 0 });

  s.addText(opts.title, { x: 0.5, y: 0.85, w: 9, h: 0.6, fontFace: FH, fontSize: 28, bold: true, color: C.gold, margin: 0 });
  s.addText(opts.subtitle || "", { x: 0.5, y: 1.42, w: 9, h: 0.3, fontFace: FB, fontSize: 12, color: C.dim, italic: true, margin: 0 });

  // formula box
  if (opts.formula) {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.9, w: 9, h: 1.1, fill: { color: "0E1A36" }, line: { color: "2D3F6E", width: 1 } });
    s.addText(opts.formula, { x: 0.5, y: 1.95, w: 9, h: 0.6, fontFace: FH, fontSize: 32, bold: true, color: C.hubble, align: "center", charSpacing: 4, margin: 0 });
    if (opts.formulaSub) {
      s.addText(opts.formulaSub, { x: 0.5, y: 2.55, w: 9, h: 0.4, fontFace: FB, fontSize: 12, color: C.dim, align: "center", italic: true, margin: 0 });
    }
  }

  // bullet points
  const startY = opts.formula ? 3.25 : 1.9;
  const points = opts.points || [];
  const lineArr = points.map((p, i) => ({
    text: (typeof p === "string" ? p : p.text),
    options: { bullet: { code: "25CF" }, color: C.ink, fontSize: 14, fontFace: FB, breakLine: i < points.length - 1, paraSpaceAfter: 6 }
  }));
  if (lineArr.length) {
    s.addText(lineArr, { x: 0.7, y: startY, w: 8.6, h: 5.625 - startY - 0.4, valign: "top", margin: 0 });
  }
  corner(s, opts.ep || "");
}

// 5) VOID BOSS (claim vs rebut)
function slideBoss(opts) {
  const s = pres.addSlide();
  bg(s, C.bg);
  smallStarfield(s);
  tag(s, "⚔ BOSS · MISCONCEPTION", 0.5, 0.35, C.void, 2.8);
  s.addText(opts.ep, { x: 7.5, y: 0.35, w: 2.0, h: 0.32, fontFace: FH, fontSize: 11, color: C.dim, align: "right", italic: true, margin: 0 });

  s.addText(opts.title, { x: 0.5, y: 0.85, w: 9, h: 0.55, fontFace: FH, fontSize: 26, bold: true, color: C.gold, margin: 0 });

  // VOID claim card
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.55, w: 4.4, h: 3.5, fill: { color: "1A0530" }, line: { color: C.void, width: 1 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.55, w: 4.4, h: 0.45, fill: { color: C.void }, line:{type:"none"} });
  s.addText("VOID · ความเข้าใจผิด", { x: 0.5, y: 1.55, w: 4.4, h: 0.45, fontFace: FH, fontSize: 12, bold: true, color: C.bg, align: "center", valign: "middle", charSpacing: 4, margin: 0 });
  s.addText(opts.claim, { x: 0.7, y: 2.15, w: 4.0, h: 2.7, fontFace: FB, fontSize: 14, color: C.ink, italic: true, valign: "top", margin: 0 });

  // arrow
  s.addText("→", { x: 4.85, y: 2.7, w: 0.4, h: 1.0, fontFace: FH, fontSize: 50, color: C.gold, align: "center", valign: "middle", bold: true, margin: 0 });

  // Evidence card
  s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 1.55, w: 4.2, h: 3.5, fill: { color: "0E2A26" }, line: { color: C.mint, width: 1 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 1.55, w: 4.2, h: 0.45, fill: { color: C.mint }, line:{type:"none"} });
  s.addText("ทีม · หลักฐาน", { x: 5.3, y: 1.55, w: 4.2, h: 0.45, fontFace: FH, fontSize: 12, bold: true, color: C.bg, align: "center", valign: "middle", charSpacing: 4, margin: 0 });
  const ev = (opts.evidence || []).map((e, i) => ({
    text: e,
    options: { bullet: { code: "25CF" }, color: C.ink, fontSize: 13, fontFace: FB, breakLine: i < opts.evidence.length - 1, paraSpaceAfter: 5 }
  }));
  s.addText(ev, { x: 5.5, y: 2.15, w: 3.8, h: 2.7, valign: "top", margin: 0 });
  corner(s, opts.ep);
}

// 6) BIG STAT
function slideStat(opts) {
  const s = pres.addSlide();
  bg(s, C.bg);
  smallStarfield(s);
  tag(s, opts.tag || "DATA POINT", 0.5, 0.35, opts.tagColor || C.gold, 2.2);
  s.addText(opts.ep || "", { x: 7.5, y: 0.35, w: 2.0, h: 0.32, fontFace: FH, fontSize: 11, color: C.dim, align: "right", italic: true, margin: 0 });

  s.addText(opts.label, { x: 0.5, y: 1.0, w: 9, h: 0.4, fontFace: FH, fontSize: 14, color: C.dim, align: "center", charSpacing: 6, bold: true, margin: 0 });
  s.addText(opts.big, { x: 0.5, y: 1.6, w: 9, h: 2.2, fontFace: FH, fontSize: 130, bold: true, color: opts.bigColor || C.gold, align: "center", margin: 0 });
  s.addText(opts.unit || "", { x: 0.5, y: 3.85, w: 9, h: 0.4, fontFace: FH, fontSize: 16, color: opts.bigColor || C.gold, align: "center", italic: true, margin: 0 });
  s.addText(opts.context || "", { x: 1.5, y: 4.4, w: 7, h: 0.6, fontFace: FB, fontSize: 13, color: C.ink, align: "center", italic: true, margin: 0 });
  corner(s, opts.ep || "");
}

// 7) QUOTE (large dialogue)
function slideQuote(opts) {
  const s = pres.addSlide();
  bg(s, C.bg);
  smallStarfield(s);
  tag(s, opts.tag || "DIALOGUE", 0.5, 0.35, opts.tagColor || C.hubble, 1.8);
  s.addText(opts.ep || "", { x: 7.5, y: 0.35, w: 2.0, h: 0.32, fontFace: FH, fontSize: 11, color: C.dim, align: "right", italic: true, margin: 0 });

  s.addText("“", { x: 0.5, y: 0.7, w: 1, h: 1, fontFace: FH, fontSize: 110, color: opts.tagColor || C.hubble, margin: 0 });
  s.addText(opts.text, { x: 1.2, y: 1.5, w: 7.8, h: 2.5, fontFace: FH, fontSize: 24, color: C.white, italic: true, valign: "middle", margin: 0 });
  divider(s, 1.2, 4.3, 3, opts.tagColor || C.hubble);
  s.addText("— " + opts.attrib, { x: 1.2, y: 4.4, w: 7.8, h: 0.4, fontFace: FH, fontSize: 14, color: opts.tagColor || C.hubble, bold: true, charSpacing: 3, margin: 0 });
  if (opts.context) {
    s.addText(opts.context, { x: 1.2, y: 4.8, w: 7.8, h: 0.4, fontFace: FB, fontSize: 11, color: C.dim, italic: true, margin: 0 });
  }
  corner(s, opts.ep || "");
}

// 8) CLIFFHANGER
function slideCliff(opts) {
  const s = pres.addSlide();
  bg(s, C.bg);
  smallStarfield(s);
  tag(s, "⚠ CLIFFHANGER", 0.5, 0.35, C.red, 2.0);
  s.addText(opts.ep, { x: 7.5, y: 0.35, w: 2.0, h: 0.32, fontFace: FH, fontSize: 11, color: C.dim, align: "right", italic: true, margin: 0 });

  s.addText(opts.title, { x: 0.5, y: 1.0, w: 9, h: 1.0, fontFace: FH, fontSize: 36, bold: true, color: C.red, align: "center", margin: 0 });
  s.addText(opts.text, { x: 1.0, y: 2.3, w: 8, h: 1.6, fontFace: FB, fontSize: 16, color: C.ink, italic: true, align: "center", valign: "top", margin: 0 });
  if (opts.hook) {
    s.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: 4.1, w: 7, h: 0.9, fill: { color: "2A0A0A" }, line: { color: C.red, width: 1 } });
    s.addText("➤ " + opts.hook, { x: 1.7, y: 4.1, w: 6.6, h: 0.9, fontFace: FH, fontSize: 14, bold: true, color: C.gold, align: "center", valign: "middle", margin: 0 });
  }
  corner(s, opts.ep);
}

// 9) GRID 4 cards (e.g., crew, powers, evidences)
function slideGrid4(opts) {
  const s = pres.addSlide();
  bg(s, C.bg);
  smallStarfield(s);
  tag(s, opts.tag || "OVERVIEW", 0.5, 0.35, opts.tagColor || C.gold, 2.0);
  s.addText(opts.ep || "", { x: 7.5, y: 0.35, w: 2.0, h: 0.32, fontFace: FH, fontSize: 11, color: C.dim, align: "right", italic: true, margin: 0 });
  s.addText(opts.title, { x: 0.5, y: 0.85, w: 9, h: 0.55, fontFace: FH, fontSize: 26, bold: true, color: C.gold, margin: 0 });

  const cards = opts.cards || [];
  const positions = [[0.5,1.55],[5.05,1.55],[0.5,3.55],[5.05,3.55]];
  cards.forEach((c, i) => {
    const [x,y] = positions[i];
    const col = c.color || C.hubble;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.45, h: 1.85, fill: { color: C.panel }, line: { color: col, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.08, h: 1.85, fill: { color: col }, line:{type:"none"} });
    s.addText(c.icon || "★", { x: x + 0.2, y: y + 0.1, w: 0.8, h: 0.7, fontFace: FH, fontSize: 38, color: col, align: "center", valign: "middle", margin: 0 });
    s.addText(c.title, { x: x + 1.0, y: y + 0.15, w: 3.3, h: 0.45, fontFace: FH, fontSize: 16, bold: true, color: col, margin: 0 });
    s.addText(c.sub || "", { x: x + 1.0, y: y + 0.6, w: 3.3, h: 0.3, fontFace: FB, fontSize: 11, color: C.dim, italic: true, margin: 0 });
    s.addText(c.desc, { x: x + 0.25, y: y + 0.95, w: 4.0, h: 0.85, fontFace: FB, fontSize: 12, color: C.ink, valign: "top", margin: 0 });
  });
  corner(s, opts.ep || "");
}

// 10) TIMELINE 6 steps
function slideTimeline(opts) {
  const s = pres.addSlide();
  bg(s, C.bg);
  smallStarfield(s);
  tag(s, "⏱ TIMELINE", 0.5, 0.35, C.mint, 1.8);
  s.addText(opts.ep || "", { x: 7.5, y: 0.35, w: 2.0, h: 0.32, fontFace: FH, fontSize: 11, color: C.dim, align: "right", italic: true, margin: 0 });
  s.addText(opts.title, { x: 0.5, y: 0.85, w: 9, h: 0.55, fontFace: FH, fontSize: 26, bold: true, color: C.gold, margin: 0 });

  const steps = opts.steps || [];
  const lineY = 3.0;
  s.addShape(pres.shapes.LINE, { x: 0.6, y: lineY, w: 8.8, h: 0, line: { color: C.gold, width: 2 } });
  const colors = [C.rose, C.amber, C.gold, C.mint, C.hubble, C.void];
  steps.forEach((st, i) => {
    const x = 0.6 + (8.8 / (steps.length - 1)) * i;
    const col = colors[i % colors.length];
    s.addShape(pres.shapes.OVAL, { x: x - 0.18, y: lineY - 0.18, w: 0.36, h: 0.36, fill: { color: col }, line: { color: C.bg, width: 2 } });
    // alternating top/bottom labels
    const above = i % 2 === 0;
    const ty = above ? 1.6 : 3.4;
    const sy = above ? 2.1 : 3.9;
    const lY = above ? 2.45 : 4.25;
    // clamp label x to keep within slide (label width 1.7)
    const lw = 1.7;
    const lx = Math.max(0.1, Math.min(10 - lw - 0.1, x - lw/2));
    s.addText(st.title, { x: lx, y: ty, w: lw, h: 0.4, fontFace: FH, fontSize: 13, bold: true, color: col, align: "center", margin: 0 });
    s.addText(st.time, { x: lx, y: sy, w: lw, h: 0.3, fontFace: FB, fontSize: 10, color: C.dim, align: "center", italic: true, margin: 0 });
    s.addText(st.note || "", { x: lx, y: lY, w: lw, h: 0.6, fontFace: FB, fontSize: 9, color: C.ink, align: "center", valign: "top", margin: 0 });
  });
  corner(s, opts.ep || "");
}

// 11) SECTION DIVIDER (between act/synthesis)
function slideDivider(text, sub, color = C.gold) {
  const s = pres.addSlide();
  bg(s, C.bg);
  starfield(s);
  s.addShape(pres.shapes.OVAL, { x: 4, y: -3, w: 12, h: 12, fill: { color, transparency: 92 }, line:{type:"none"} });
  s.addText("★", { x: 0.5, y: 1.5, w: 9, h: 0.6, fontFace: FH, fontSize: 30, color, align: "center", margin: 0 });
  s.addText(text, { x: 0.5, y: 2.0, w: 9, h: 1.4, fontFace: FH, fontSize: 56, bold: true, color: C.white, align: "center", margin: 0 });
  s.addText(sub, { x: 0.5, y: 3.5, w: 9, h: 0.5, fontFace: FH, fontSize: 18, color, align: "center", italic: true, charSpacing: 4, margin: 0 });
}

// =====================================================
// =============  DECK CONTENT START  ==================
// =====================================================

// --- 1. COVER ---
slideHero({
  badge: "SEASON 1 · TEACHER DECK",
  title: "ปริศนาวัตถุต้นกำเนิด",
  subtitle: "8 ตอน · 17 หัวข้อ · 1 ภารกิจปกป้องเอกภพ",
});

// --- 2. MISSION BRIEFING ---
slideGrid4({
  tag: "MISSION BRIEFING",
  ep: "OVERVIEW",
  title: "ภารกิจการสอน · COSMOS LOG ม.6",
  cards: [
    { icon: "📚", color: C.gold, title: "ว 30105", sub: "วิทยาศาสตร์พื้นฐาน 5", desc: "โลกและอวกาศ · มาตรฐาน ว 7.1 ม.4-6/2 · 8 หน่วยการเรียนรู้" },
    { icon: "🎬", color: C.rose, title: "8 EP · 95 ฉาก", sub: "Story-driven curriculum", desc: "เรื่องเล่าเป็น Trigger ของบทเรียน · ทุกฉากเชื่อมเนื้อหา" },
    { icon: "⚔", color: C.void, title: "Boss System", sub: "VOID misconception", desc: "8 ตัวบอส · นักเรียนหักล้างความเข้าใจผิดด้วยหลักฐาน" },
    { icon: "🔬", color: C.mint, title: "Research-Ready", sub: "วPA เชี่ยวชาญ", desc: "Pre/Post · Two-tier · IMI · Hake gain · Apps Script telemetry" },
  ]
});

// --- 3. TABLE OF CONTENTS ---
{
  const s = pres.addSlide();
  bg(s, C.bg); smallStarfield(s);
  tag(s, "🗺 ROADMAP", 0.5, 0.35, C.gold, 1.8);
  s.addText("Season 1 · 8 EP", { x: 7.5, y: 0.35, w: 2.0, h: 0.32, fontFace: FH, fontSize: 11, color: C.dim, align: "right", italic: true, margin: 0 });
  s.addText("ถ้าจักรวาลเป็นนิยาย · ทุกตอนคือบทเรียน", { x: 0.5, y: 0.85, w: 9, h: 0.6, fontFace: FH, fontSize: 26, bold: true, color: C.gold, margin: 0 });

  const eps = [
    ["1", "การปะทะ", "Big Bang · CMB · v=H₀D", C.rose],
    ["2", "แผนที่ลับกาแล็กซี", "Hubble Tuning Fork · Milky Way", C.amber],
    ["3", "เสียงร้องจากอดีต", "Parallax · Cepheid · Magnitude", C.gold],
    ["4", "วันสุดท้ายของยักษ์แดง", "OBAFGKM · HR · Mass Threshold", C.mint],
    ["5", "หัวใจที่เต้นผิดจังหวะ", "Sun 6 Layers · POWER FORGE", C.hubble],
    ["6", "ขอบฟ้าของบ้าน", "Solar System · Pale Blue Dot", C.void],
    ["7", "สงครามในวงโคจร", "LEO/MEO/GEO · EM Spectrum", C.rose],
    ["8", "กำเนิดอีกครั้ง", "Synthesis · 17 Keys · Finale", C.gold],
  ];
  eps.forEach((e, i) => {
    const x = i < 4 ? 0.5 : 5.05;
    const y = 1.65 + (i % 4) * 0.92;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.45, h: 0.78, fill: { color: C.panel }, line: { color: e[3], width: 1 } });
    s.addText(e[0], { x: x + 0.1, y: y + 0.06, w: 0.7, h: 0.65, fontFace: FH, fontSize: 36, bold: true, color: e[3], align: "center", valign: "middle", margin: 0 });
    s.addText(e[1], { x: x + 0.85, y: y + 0.08, w: 3.5, h: 0.35, fontFace: FH, fontSize: 14, bold: true, color: C.white, margin: 0 });
    s.addText(e[2], { x: x + 0.85, y: y + 0.43, w: 3.5, h: 0.32, fontFace: FB, fontSize: 10, color: C.dim, italic: true, margin: 0 });
  });
  corner(s, "ROADMAP");
}

// --- 4. PROLOGUE DIVIDER ---
slideDivider("PROLOGUE", "ปี 2267 · บริดจ์ของ T.H.E.O.S.-IX", C.gold);

// --- 5. PROLOGUE: STATS HOOK ---
slideStat({
  tag: "MISSION HISTORY",
  ep: "PROLOGUE",
  label: "ยี่สิบปีแห่งความสูญหาย",
  big: "64",
  unit: "LOST · NEVER RETURNED",
  context: "สหพันธ์ส่งยานออกนอกระบบสุริยะ 312 ลำ · กลับมา 248 · หาย 64 ลำในจุดเดียวกัน · ที่ไม่มีดาว ไม่มีก๊าซ ไม่มีอะไรเลย",
  bigColor: C.red,
});

// --- 6. PROLOGUE: CREW ---
slideGrid4({
  tag: "👥 CREW MANIFEST",
  ep: "PROLOGUE",
  title: "ลูกเรือ T.H.E.O.S.-IX",
  cards: [
    { icon: "★", color: C.gold, title: "อารยา เวชชาชีวะ", sub: "กัปตัน · 32 · ผู้บัญชาการ", desc: "พ่อหายไป 20 ปีก่อน · เรียนเข้ากองอวกาศเพื่อตามหา · ดวงตานิ่งใต้เปลือกเดือด" },
    { icon: "λ", color: C.rose, title: "เคน 'สเปกตรา' ภัทรวงศ์", sub: "ร้อยโทวิศวกร · 28 · Stellar", desc: "เคยตาบอด 6 สัปดาห์จากแสงซูเปอร์โนวา · ยังกลัวแสงสว่างกะทันหัน — แต่ทำงานต่อ" },
    { icon: "✚", color: C.mint, title: "หมอ มีรา ชาห์", sub: "แพทย์ชีวดาราศาสตร์ · 30", desc: "น้องสาวหายในพายุสุริยะ 2261 · เปลี่ยนสายมาเพื่อยืนใกล้ที่น้องเคยอยู่" },
    { icon: "⚙", color: C.amber, title: "โบลท์ เทอร์เรลล์", sub: "ช่าง · 26 · Mechanical", desc: "พ่อหายไปกับ Voyager 4 ตอนเขา 8 ขวบ · เรียนซ่อมเครื่องเพื่อวันที่จะซ่อมเรือพ่อ" },
  ]
});

// --- 7. PROLOGUE: LEMAÎTRE QUOTE + ALARM ---
slideQuote({
  tag: "AI · LEMAÎTRE",
  tagColor: C.mint,
  ep: "PROLOGUE",
  text: "WARNING. ตรวจพบวัตถุปริศนา · ขนาด 12 เมตร · ทิศทางพุ่งตรงหัวเรือ · ความเร็วสัมพัทธ์ 0.02c · เวลาก่อนปะทะ — สี่สิบเจ็ดวินาที",
  attrib: "LEMAÎTRE · AI ประจำยาน",
  context: "0.02c = 6,000 km/s · เร็วกว่ากระสุนปืน 9,000 เท่า · เวลาที่เหลือ: 47 วินาที",
});

// =====================================================
// =================  EP1 · COLLISION  =================
// =====================================================

slideChapter("01", "การปะทะ", "The Collision · เอกภพและบิกแบง", "จุดเริ่มของเอกภพ · ทำไมเราต้องเชื่อบิกแบง?", C.rose);

slideStory({
  tag: "EP1 · SCENE 01",
  tagColor: C.rose,
  timestamp: "T-MINUS 00:03",
  title: "การปะทะ · กระจกร้าวลายใยแมงมุม",
  icon: "💥",
  iconBg: C.red,
  sceneColor: "2A0A0A",
  iconLabel: "IMPACT",
  iconSub: "0.02c · เร็วกว่ากระสุน 9,000 เท่า",
  narration: "เคนตะโกน: หลบไม่ได้ · มันเปลี่ยนทิศทางตามเรา · ยานสะท้อนกลับเหมือนใบไม้ที่โดนกำปั้นยักษ์ตี · กระจกหน้าต่างแตกเป็นลายใยแมงมุมที่ขยายช้า ๆ · alarm สามชั้นซ้อนกัน",
  speaker: "อารยา",
  line: "ส่งโดรนเก็บตัวอย่าง · ทันที · ห้ามใครจับด้วยมือเปล่า",
  dialogColor: C.gold,
});

slideStory({
  tag: "EP1 · SCENE 02",
  tagColor: C.rose,
  timestamp: "T+06 นาที",
  title: "ศิลาต้นกำเนิด · Origin Stone",
  icon: "🪨",
  iconBg: C.gold,
  sceneColor: "1A1A2A",
  iconLabel: "13.8 พันล้านปี",
  iconSub: "เก่าเท่ากับเอกภพ",
  narration: "เศษ 5 ชิ้นวางบนโต๊ะใต้ตู้กักเชื้อระดับ 4 · ผิวมันลื่นที่ดื่มแสงแล้วปล่อยกลับในความถี่ผิดเพี้ยน · เคนสแกน — สเปกตรัมเต็มทุกย่าน · จุดสูงสุดที่อุณหภูมิ 2.73 K",
  speaker: "LEMAÎTRE",
  line: "อายุสัญญาณ: หนึ่ง สาม จุด แปด พันล้านปี",
  dialogColor: C.mint,
  dialogBg: "0E2A26",
});

slideStat({
  tag: "EVIDENCE",
  tagColor: C.gold,
  ep: "EP 1",
  label: "อุณหภูมิ CMB · Cosmic Microwave Background",
  big: "2.73 K",
  unit: "(2.725 K · Penzias & Wilson 1964)",
  context: "หลักฐาน #1 จาก 3 ของบิกแบง · 'แสงแรก' ของเอกภพปล่อยตอนอะตอมเป็นกลาง · 380,000 ปีหลังบิกแบง",
});

slideStory({
  tag: "EP1 · SCENE 03",
  tagColor: C.void,
  timestamp: "ANOMALY DETECTED",
  title: "VOID ปรากฏ · เผ่าโวอิเดียน",
  icon: "👁",
  iconBg: C.void,
  sceneColor: "1A0530",
  iconLabel: "COSMIC HORROR",
  iconSub: "ใช้ความเข้าใจผิดเป็นอาวุธ",
  narration: "ไฟปกติของยานดับ 3 วินาที · ทุกจอเปลี่ยนเป็นสีม่วงเข้มพร้อมกัน · ใบหน้าของ VOID ก่อตัว — กระแสน้ำวนของดวงดาวที่ถูกบิดเบี้ยว · ในเงาเสื้อคลุมมีปากเล็ก ๆ จำนวนมากกระซิบประโยคที่ไม่เกี่ยวกัน",
  speaker: "VOID",
  line: "บิกแบงคือ 'การระเบิด' · มีจุดศูนย์กลาง · มีขอบ · นั่นคือสิ่งที่เธอเรียนใช่ไหม? อย่ายอมรับเลข 13.8 พันล้านปีอย่างนั้น",
  dialogColor: C.void,
  dialogBg: "2A1845",
});

slideStory({
  tag: "EP1 · SCENE 04",
  tagColor: C.gold,
  timestamp: "MENTOR ARRIVES",
  title: "ดร.ฮับเบิล · ลูกโป่งและจุดบนผิว",
  icon: "🎈",
  iconBg: C.hubble,
  sceneColor: "1A2348",
  iconLabel: "BALLOON ANALOGY",
  iconSub: "ทุกจุดเคลื่อนห่างกัน · ไม่มีจุดศูนย์กลาง",
  narration: "ชายชราในเสื้อคลุมประดับลายดวงดาวลอยเข้ามาผ่านกระจก · ยื่นลูกโป่งและปากกามาร์กเกอร์ให้แต่ละคน · 'วาดจุด 5 จุด · เป่า 3 รอบ · วัดระยะทุกครั้ง · ห้ามใช้คำว่าขยายตัวจนกว่าผมอนุญาต'",
  speaker: "เคน (สี่นาทีต่อมา)",
  line: "ทุกจุดห่างกันเพิ่ม · จุดที่ห่างมากเคลื่อนเร็วกว่า · ไม่มีจุดศูนย์กลางบนผิวลูกโป่งเลย",
  dialogColor: C.gold,
  dialogBg: "2D2410",
});

slideKnowledge({
  ep: "EP 1",
  title: "กฎของฮับเบิล · Hubble's Law",
  subtitle: "Edwin Hubble · 1929 · v คือความเร็วเคลื่อนหนี · D คือระยะ",
  formula: "v = H₀ × D",
  formulaSub: "H₀ ≈ 70 km/s/Mpc · ค่าคงที่ของฮับเบิล",
  points: [
    "ยิ่งกาแล็กซีอยู่ไกล → ยิ่งเคลื่อนหนีเร็วกว่า · เป็นสัดส่วนตรง",
    "ไม่ใช่กาแล็กซีเคลื่อนในอวกาศ — แต่เป็น 'อวกาศเอง' ที่ขยายตัว (เหมือนลูกโป่ง)",
    "ไม่มีจุดศูนย์กลาง · ไม่มีขอบ · ทุกจุดมองเห็นทุกจุดอื่นเคลื่อนหนี",
    "วัดได้จาก redshift (Δλ/λ) ของแสงจากกาแล็กซีไกล",
  ]
});

slideKnowledge({
  ep: "EP 1",
  title: "หลักฐาน 3 ประการของบิกแบง",
  subtitle: "ทำไมเราถึงเชื่อว่าเอกภพมีจุดเริ่มต้น",
  points: [
    "CMB (Cosmic Microwave Background) · 2.725 K · แสงปล่อยตอนอายุ 380,000 ปี · Penzias & Wilson 1964 (โนเบล 1978)",
    "Cosmic Expansion · กาแล็กซีไกลกว่าเคลื่อนเร็วกว่า · กฎฮับเบิล v=H₀D",
    "Light Element Abundance · ไฮโดรเจน 75% + ฮีเลียม 25% · ตรงกับการคำนวณ Big Bang Nucleosynthesis",
    "ตัด VOID claim: 'ไม่มีจุดศูนย์กลาง · ไม่ใช่ระเบิด · เป็นการขยายตัวของอวกาศ'",
  ]
});

slideTimeline({
  ep: "EP 1",
  title: "Cosmic Timeline · 6 ยุคของเอกภพ",
  steps: [
    { title: "Quark", time: "10⁻⁶ วินาที", note: "ควาร์กลอยอิสระ · พลังงานสูงมาก" },
    { title: "Proton", time: "1 วินาที", note: "ควาร์กรวมเป็นโปรตอน/นิวตรอน" },
    { title: "Nucleosynth", time: "3 นาที", note: "H + He นิวเคลียสก่อตัว" },
    { title: "Recombination", time: "380,000 ปี", note: "อะตอมเป็นกลาง · CMB ปล่อย" },
    { title: "Dark Ages", time: "~100 ล้านปี", note: "ก่อนดาวฤกษ์ดวงแรก" },
    { title: "Galaxy", time: "13.8 Gyr · ตอนนี้", note: "Milky Way + Andromeda" },
  ]
});

slideBoss({
  ep: "EP 1",
  title: "BOSS · บิกแบงคือการระเบิดในที่ว่าง?",
  claim: "VOID อ้าง: บิกแบงเป็น 'การระเบิด' มีจุดศูนย์กลาง · มีขอบ · มีอวกาศว่างก่อนหน้า · เลข 13.8 พันล้านปีเป็นแค่นิทาน",
  evidence: [
    "ลูกโป่งทดลอง: ทุกจุดห่างกันเพิ่ม · ไม่มีศูนย์กลางบนผิว",
    "v = H₀D · กาแล็กซีไกลกว่าเคลื่อนเร็วกว่า — ตรงตามที่ Hubble วัด 1929",
    "CMB 2.725 K วัดได้ทุกทิศเท่ากัน — ไม่มีทิศที่ 'ห่างศูนย์' กว่า",
    "อวกาศเองที่ขยาย ไม่ใช่สสารระเบิดเข้าไปในที่ว่าง",
  ]
});

slideCliff({
  ep: "EP 1",
  title: "พิกัดที่ไม่อยู่ในแผนที่",
  text: "หลังหักล้าง VOID — ในจอเรดาร์มีพิกัดสีแดงเล็ก ๆ กระพริบ บนจุดที่ไม่มีอะไรเลย · LEMAÎTRE: 'กาแล็กซีนี้... ไม่มีอยู่ในแผนที่ของเรา'",
  hook: "ตั้งเส้นทาง · เราจะไปดู — กัปตันอารยา"
});

// =====================================================
// =================  EP2 · LOST MAP  ==================
// =====================================================

slideChapter("02", "แผนที่ลับกาแล็กซี", "The Lost Map · กาแล็กซีและกฎฮับเบิล", "ระบบดาว · จำแนก · Doppler · พ่ออารยาส่ง SOS", C.amber);

slideStory({
  tag: "EP2 · SCENE 01",
  tagColor: C.amber,
  timestamp: "+6 ชั่วโมง",
  title: "หอสังเกตการณ์ · ทิวทัศน์กาแล็กซี",
  icon: "🌌",
  iconBg: C.hubble,
  sceneColor: "0A2A5A",
  iconLabel: "GALACTIC VIEW",
  iconSub: "Local Group · 50+ กาแล็กซี",
  narration: "ห้องที่ผนังเป็นกระจกโค้ง 3 ด้าน · ภาพเปิดออกต่อหน้าทีมโดยไม่มีคำเตือน · Andromeda ใหญ่จนครอบครองด้านซ้าย · M87 จุดสว่างกลม ๆ ขวา · LMC, SMC ใต้กรอบ · จุดเล็ก ๆ 40-50 จุดกระจาย",
  speaker: "อารยา",
  line: "เราต้องจำแนก 12 ตัวเลือกของพิกัด VOID · ถ้าเลือกผิด — เราอาจไม่กลับมา",
});

slideKnowledge({
  ep: "EP 2",
  title: "Hubble Tuning Fork · จำแนกกาแล็กซีตามรูปร่าง",
  subtitle: "Edwin Hubble · 1936 · ส้อม ไม่ใช่บันได",
  points: [
    "Elliptical (E0-E7) · ทรงรี · ดาวแก่ · ก๊าซน้อย · เช่น M87",
    "Spiral (Sa, Sb, Sc) · ก้นหอย · มีแขนเกลียว · เช่น Andromeda",
    "Barred Spiral (SBa, SBb, SBc) · มีแกนยาวกลาง · ★ Milky Way = SBc",
    "Irregular · ไม่มีรูปแบบ · เช่น LMC, SMC",
    "แต่ละสายไม่ได้แปลงเป็นอีกสาย — เป็นการจำแนก ไม่ใช่วิวัฒนาการ",
  ]
});

slideKnowledge({
  ep: "EP 2",
  title: "Milky Way · บ้านของเรา",
  subtitle: "Barred Spiral · SBc · เส้นผ่าศูนย์กลาง 100,000 ปีแสง",
  points: [
    "ดาวประมาณ 100-400 พันล้านดวง · มีหลุมดำมวลยวดยิ่ง Sgr A* ที่ใจกลาง",
    "ดวงอาทิตย์อยู่บนแขน Orion · ระยะ 26,000 ปีแสงจากศูนย์กลาง",
    "ไม่ได้อยู่ใจกลาง · ไม่ได้อยู่ขอบ · อยู่ระดับกลาง — บ้านธรรมดา",
    "Hubble 1924 พิสูจน์ Andromeda เป็นกาแล็กซีคนละแห่ง · เปลี่ยนความเข้าใจขนาดเอกภพ",
  ]
});

slideBoss({
  ep: "EP 2",
  title: "BOSS · ทางช้างเผือกแค่แถบเมฆบนฟ้า?",
  claim: "VOID อ้าง: เธอเรียกมันว่ากาแล็กซี · แต่เธอไม่เคยเห็นมันจากภายนอก · เธอแค่เดา · ดาวที่เห็นด้วยตา = ดาวทั้งหมดในเอกภพ",
  evidence: [
    "ดาวที่เราเห็นด้วยตา = ดาวในทางช้างเผือก 100+ พันล้านดวง",
    "แถบเมฆบนฟ้า = มุมมองตามระนาบของกาแล็กซีเรา (มองจากใน)",
    "Hubble 1924: Andromeda Cepheid → ไกลกว่าเส้นผ่าศูนย์กลาง Milky Way",
    "พิสูจน์ว่ามีกาแล็กซีอื่น — เปลี่ยนความเข้าใจของมนุษย์ตลอดกาล",
  ]
});

slideStory({
  tag: "EP2 · SCENE 02",
  tagColor: C.amber,
  timestamp: "WARP MK.II",
  title: "วาร์ปไดรฟ์ของไม่ใช่มนุษย์",
  icon: "🛸",
  iconBg: C.void,
  sceneColor: "1A0540",
  iconLabel: "ALIEN TECH",
  iconSub: "ข้ามกาแล็กซีใน < 1 นาที",
  narration: "โบลท์โผล่ขึ้นมาบริดจ์ · หน้าเปื้อนเขม่า · ถือศิลาต้นกำเนิดที่แกะเปิดออก · ภายในมีขดลวด คริสตัล วงจรที่ไม่เหมือนสิ่งที่มนุษย์เคยทำ · บางส่วนเย็นจนทำให้พื้นโต๊ะเป็นน้ำแข็ง",
  speaker: "อารยา",
  line: "...แล้วใครให้เราเจอ?",
  dialogColor: C.gold,
  dialogBg: "2D2410",
});

slideStory({
  tag: "EP2 · SCENE 03",
  tagColor: C.amber,
  timestamp: "WARP EXIT",
  title: "ดาวเดี่ยวที่กระพริบมอร์ส",
  icon: "⭐",
  iconBg: C.gold,
  sceneColor: "2A1F08",
  iconLabel: "อา... ระยา... ฟัง...",
  iconSub: "ภาษาไทย · เสียงพ่อ · 87% confidence",
  narration: "ยานหลุดออกมาในความว่างเปล่าสนิท · ไม่ใช่กลุ่มกาแล็กซี · แค่ดาวเดี่ยวดวงเดียวสีเหลือง-ส้ม · กระพริบเป็นจังหวะสั้น-ยาว-สั้น · เสียงพ่อของอารยา · หายไป 20 ปี",
  speaker: "อารยา (กระซิบ)",
  line: "...พ่อ",
  dialogColor: C.gold,
});

slideCliff({
  ep: "EP 2",
  title: "ก่อนเราจะเชื่อ · เราต้องวัด",
  text: "เธอเป็นกัปตันที่ดี · และกัปตันที่ดี — ไม่เชื่ออะไรก่อนจะวัดมัน · ก่อนหลงเสียง — เราต้องรู้ว่าดาวอยู่ไกลเท่าไหร่",
  hook: "เคน · มีรา · ตรวจสอบระยะของดาวก่อน"
});

// =====================================================
// =================  EP3 · ECHO  ======================
// =====================================================

slideChapter("03", "เสียงร้องจากอดีต", "Echo from the Past · ดาวฤกษ์ · แสงและระยะ", "ระยะทาง · ดาวที่ไกล 400 ปีแสง · gravity time dilation", C.gold);

slideKnowledge({
  ep: "EP 3",
  title: "Stellar Parallax · เครื่องมือวัดระยะดาว",
  subtitle: "หลักการ: ยกนิ้วชี้ไว้หน้าตา · หลับตาซ้าย/ขวา — นิ่วขยับ · ดาราศาสตร์ใช้โลก 2 ช่วงปี",
  formula: "d (pc) = 1 / p (arcsec)",
  formulaSub: "ระยะ (พาร์เซก) = 1 ÷ มุมพาแรลแลกซ์ (พิลิปดา) · 1 pc ≈ 3.26 ปีแสง",
  points: [
    "ยานตั้งกล้องคู่ห่าง 1 AU (ระยะโลก-อาทิตย์ ≈ 150 ล้าน km) เป็น baseline",
    "ดาวเป้าหมายจะดูเหมือนขยับเทียบกับดาวพื้นหลังที่ไกลกว่ามาก",
    "เคนวัดได้: p = 0.0082 พิลิปดา → d = 122 pc ≈ 400 ปีแสง",
    "ใช้ได้เฉพาะดาวใกล้ (< 100 pc แม่นยำสูง · Gaia: < 10 kpc)",
  ]
});

slideKnowledge({
  ep: "EP 3",
  title: "Magnitude · ความสว่างของดาว · ระบบกลับด้าน",
  subtitle: "ระบบที่ Hipparchus ตั้งเมื่อ 130 ปีก่อนคริสต์ศักราช · ดาวสว่าง = ค่าน้อย",
  formula: "m − M = 5 log(d / 10)",
  formulaSub: "m = ความสว่างที่เห็น · M = ความสว่างจริง · d = ระยะ (พาร์เซก)",
  points: [
    "ดวงอาทิตย์ m = −26.7 · ดวงจันทร์เต็ม −12.7 · Sirius −1.46 · Polaris +2.0 · ดาวริบหรี่ที่ตาเห็น +6",
    "ยิ่งติดลบ ยิ่งสว่าง · ยิ่งบวก ยิ่งมืด — กลับด้านจากสามัญสำนึก",
    "Cepheid Variable: ยิ่งคาบยาว → M ยิ่งสว่าง (Henrietta Leavitt 1908)",
    "ใช้ Cepheid เป็น 'standard candle' — รู้ M → คำนวณ d → ทำให้ Hubble วัด Andromeda ได้",
  ]
});

slideQuote({
  tag: "DR. HUBBLE",
  tagColor: C.gold,
  ep: "EP 3",
  text: "Henrietta Swan Leavitt · 1908 · ค้นพบความสัมพันธ์คาบ-ความสว่างของ Cepheid · ในยุคที่ผู้หญิงไม่ได้รับอนุญาตให้ใช้กล้องโทรทรรศน์ใหญ่ · เธอเปลี่ยนความเข้าใจขนาดของจักรวาล — โดยไม่เคยได้รางวัลโนเบล",
  attrib: "ดร.ฮับเบิล · เมนเทอร์",
  context: "ผู้หญิงในประวัติศาสตร์ดาราศาสตร์ทำมากกว่าที่หนังสือเรียนบอก",
});

slideBoss({
  ep: "EP 3",
  title: "BOSS · เลขมาก = สว่างมาก?",
  claim: "VOID อ้าง: ดาวเลขมาก ยิ่งสว่าง · เลข 6 ใหญ่กว่าเลข 1 · ตรรกะง่าย ๆ ที่เด็กก็เข้าใจ · งั้นดาวที่ส่งสัญญาณนี้สว่างที่สุด",
  evidence: [
    "ระบบแมกนิจูดดาราศาสตร์กลับด้าน · Hipparchus 130 BCE · สว่าง = 1, ริบหรี่ = 6",
    "ดวงอาทิตย์ −26.7 · Sirius −1.46 · Polaris +2 — ยิ่งติดลบ ยิ่งสว่าง",
    "Supernova Crab Nebula 1054 = mag −7 · เห็นกลางวันที่กรุงไคโร",
    "ใช้เครื่องมือที่ถูกต้อง · ไม่หลงในเสียงที่อยากเชื่อ",
  ]
});

slideQuote({
  tag: "EP 3 · GOODBYE",
  tagColor: C.gold,
  ep: "EP 3",
  text: "ขอบคุณที่บอก พ่อ · ผมจะไม่หลงตัวเลขสว่าง · ผมจะใช้เครื่องมือที่ถูกต้อง · ผมจะไม่หลงในเสียงที่อยากเชื่อ · ผมรักพ่อ · ลาก่อน",
  attrib: "กัปตันอารยา · ลาพ่อ (รอบที่สอง)",
  context: "VOID: 'ทำไมเธอถึงไม่ร้องไห้?' · อารยา: 'ผมร้องไห้แล้ว · เมื่อ 20 ปีก่อน'",
});

slideStat({
  tag: "PRE-SUPERNOVA",
  tagColor: C.red,
  ep: "EP 3",
  label: "ดาวเริ่มสั่น · สีเปลี่ยนแดงเข้ม",
  big: "6:00:00",
  unit: "TIME TO SUPERNOVA",
  context: "ก่อนระเบิด — ทีมต้องวัดมวลเพื่อรู้ว่าจะเป็น white dwarf, neutron star, หรือ black hole · เพื่อตัดสินใจระยะหนีที่ปลอดภัย",
  bigColor: C.red,
});

slideCliff({
  ep: "EP 3",
  title: "ผม Stellar Engineer · ดาวคือสิ่งที่ผมทำ",
  text: "เคนหายใจเข้าลึก · เขาเป็นคนที่กลัวดาวมากที่สุดในเอกภพ · เพราะเมื่อ 5 ปีก่อน ดาวที่เขาเฝ้าทำให้เขาตาบอด 6 สัปดาห์ · วันนี้เขาต้องเผชิญหน้าอีกครั้ง",
  hook: "...แม้ว่าผมจะกลัวมันมากที่สุด"
});

// =====================================================
// =================  EP4 · RED GIANT  =================
// =====================================================

slideChapter("04", "วันสุดท้ายของยักษ์แดง", "Death of a Giant · ดาวฤกษ์และวิวัฒนาการ", "วิวัฒนาการดาว · OBAFGKM · มวลตัดสินชะตา · พ่อโบลท์", C.mint);

slideStat({
  tag: "FLASHBACK · 5Y AGO",
  tagColor: C.rose,
  ep: "EP 4",
  label: "เคนตาบอดจากแสงซูเปอร์โนวา · 5 ปีก่อน",
  big: "0.003s",
  unit: "FILTER REACTION · TOO LATE",
  context: "ดาวที่ควรอยู่อีก 100,000 ปี — ระเบิดในวันนั้น · แสงเดินทาง 51 ล้านปี · ระบบกรองตัดทอนไม่ทัน · 6 สัปดาห์ในความมืดก่อนสายตากลับมา",
  bigColor: C.red,
});

slideKnowledge({
  ep: "EP 4",
  title: "OBAFGKM · ลำดับสเปกตรัมดาว",
  subtitle: "Wien's Law: ดาวร้อน → แสงคลื่นสั้น (น้ำเงิน) · ดาวเย็น → แสงคลื่นยาว (แดง)",
  points: [
    "O · น้ำเงิน · ≥30,000 K · ใหญ่ ร้อน อายุสั้น 10 ล้านปี",
    "B · น้ำเงิน-ขาว · 10,000-30,000 K · เช่น Rigel",
    "A · ขาว · 7,500-10,000 K · เช่น Sirius, Vega",
    "F · เหลือง-ขาว · 6,000-7,500 K",
    "G · เหลือง · 5,200-6,000 K · ★ ดวงอาทิตย์ของเรา",
    "K · ส้ม · 3,700-5,200 K",
    "M · แดง · ≤3,700 K · 75% ของดาวในเอกภพเป็น M-class",
  ]
});

slideKnowledge({
  ep: "EP 4",
  title: "HR Diagram · แผนที่ชีวิตของดาว",
  subtitle: "Hertzsprung 1911 + Russell 1913 (อิสระจากกัน) · luminosity vs temperature",
  points: [
    "Main Sequence (90% ของชีวิต) · เผาไฮโดรเจนในแกน → ฮีเลียม",
    "Red Giant/Supergiant · ไฮโดรเจนหมด · พองตัว · เผาธาตุหนักขึ้นเรื่อย ๆ",
    "เหล็กไม่เผา — ฟิวชันเหล็กใช้พลังงาน ไม่ปลดปล่อย",
    "ดาวที่ทีมเจอ: M-class · 3,200 K · 18 M☉ · ใกล้ core collapse",
    "Core Collapse: แกนยุบจาก 1,500 km → 25 km ใน 0.25 วินาที!",
  ]
});

slideGrid4({
  tag: "MASS THRESHOLD",
  tagColor: C.mint,
  ep: "EP 4",
  title: "จุดจบของดาว · มวลตัดสินทุกอย่าง",
  cards: [
    { icon: "○", color: C.hubble, title: "< 9 M☉", sub: "White Dwarf + Planetary Nebula", desc: "เผาฮีเลียมจนหมดแล้วหด · เหลือเปลือกในชื่อเนบิวลาดาวเคราะห์ · เช่น อนาคตดวงอาทิตย์เรา" },
    { icon: "●", color: C.white, title: "9-25 M☉", sub: "Neutron Star · Supernova", desc: "Core collapse · ระเบิด · เหลือแกน 25 km · 1 ช้อนชา = 6 พันล้านตัน · ★ ดาวเป้าหมาย 18 M☉" },
    { icon: "⚫", color: C.void, title: "> 25 M☉", sub: "Black Hole", desc: "มวลมากเกินจะหยุดยุบ · หลุดจากกรอบอวกาศ-เวลา · แสงหนีไม่ได้" },
    { icon: "★", color: C.gold, title: "Supernova Type II", sub: "Core-collapse mechanism", desc: "เหล็กแกนถึงขีดจำกัด Chandrasekhar · 1.4 M☉ · core ยุบ · เปลือกพัดออกด้วยพลังงาน 10⁴⁴ J" },
  ]
});

slideBoss({
  ep: "EP 4",
  title: "BOSS · ดาวแดงร้อนกว่าดาวน้ำเงิน?",
  claim: "VOID อ้าง: ดาวแดงร้อนกว่าน้ำเงิน · สามัญสำนึก · เลือดร้อน-แดง · น้ำแข็ง-ฟ้า · ดาวก็เหมือนกัน · ดาวแดงกำลังจะระเบิดเพราะมันร้อนเกิน",
  evidence: [
    "โบลท์: ผมเชื่อมโลหะ 15 ปี · ถ่านแดง 600°C · ส้ม 1,000 · เหลือง 1,400 · ขาว 1,800 · น้ำเงิน 2,500",
    "เปลวไฟเตาแก๊ส: ส่วนในน้ำเงิน 1,400°C · ขอบเหลือง 1,000°C",
    "Wien's Law: λ_max = b/T · T สูง → λ สั้น (น้ำเงิน) · T ต่ำ → λ ยาว (แดง)",
    "O-class 30,000 K · M-class 3,000 K — น้ำเงินร้อนกว่าแดงสิบเท่า",
  ]
});

slideStory({
  tag: "EP4 · SCENE 02",
  tagColor: C.red,
  timestamp: "T-MINUS 00:55",
  title: "ซูเปอร์โนวา · ทีมหนีก่อน 55 นาที",
  icon: "💫",
  iconBg: C.white,
  sceneColor: "2A1A0A",
  iconLabel: "SUPERNOVA",
  iconSub: "แสงขาวบริสุทธิ์เต็มหน้าต่างยาน 3 วินาที",
  narration: "ทีมหนีออกห้าชั่วโมงห้านาที · เร็วกว่าตั้งใจ 55 นาที · ขณะวาร์ปออก พวกเขาเห็นดาวระเบิด · LEMAÎTRE ตรวจ pattern radiation: มี 'การเร่งการตาย' · ดาวนี้ไม่ควรระเบิดอีก 100,000 ปี",
  speaker: "LEMAÎTRE",
  line: "ลายเซ็นยานโวอิเดียน · ในรัศมีของ pre-supernova instability · ก่อนเราจะมาถึง · พวกเขาเร่งการระเบิดของดาว",
  dialogColor: C.mint,
  dialogBg: "0E2A26",
});

slideCliff({
  ep: "EP 4",
  title: "บ้านเรา · กำลังถูกเล่นงาน",
  text: "พิกัดสุดท้ายของยานโวอิเดียน — ระบบสุริยะของเรา · โลก · บ้าน · ทุกคนที่เรารัก · พวกเขาไม่ได้แค่ทดสอบเรา · พวกเขากำลังเตรียมการ",
  hook: "ตั้งวาร์ปกลับ Sol · เร็ว — กัปตันอารยา"
});

// =====================================================
// =================  EP5 · SOLAR HEART  ===============
// =====================================================

slideChapter("05", "หัวใจที่เต้นผิดจังหวะ", "Solar Heart · ระบบสุริยะ · ดวงอาทิตย์", "ภัยพิบัติ · POWER FORGE · พ่อฟื้น", C.hubble);

slideStat({
  tag: "FLASHBACK 2261",
  tagColor: C.mint,
  ep: "EP 5",
  label: "พายุสุริยะ X-3 · สถานี Helios-7 · 14 มีนาคม 2261",
  big: "1",
  unit: "WORD · 'พี่...'",
  context: "น้องสาวมีรา (ปรียา ชาห์ · 24) เรียกชื่อพี่ครึ่งคำก่อนสัญญาณตัด · มีราเปลี่ยนสายงานเป็นแพทย์ชีวดาราศาสตร์เพื่อจะได้ยืนใกล้ที่น้องเคยอยู่",
  bigColor: C.mint,
});

slideStory({
  tag: "EP5 · SCENE 01",
  tagColor: C.red,
  timestamp: "T-MINUS 18 ชั่วโมง",
  title: "X-class CME · ใหญ่กว่า Carrington 3 เท่า",
  icon: "☀",
  iconBg: C.amber,
  sceneColor: "5A2510",
  iconLabel: "SOLAR STORM",
  iconSub: "1,000 km/s · 200 ล้านชีวิตเสี่ยง",
  narration: "เปลวสุริยะ X-class พุ่งออกเป็นวงโค้งงู · ยาวกว่าโลก 1 ล้านเท่า · พวยพุ่งสีส้ม-แดงบิดตัวเป็นเกลียวแม่เหล็ก · ถ้าถึงโลก: ไฟฟ้าทั่วโลกล่ม · GPS ดับ · ระบบขนส่งหยุด · เครื่องผ่าตัดไม่ทำงาน",
  speaker: "อารยา",
  line: "งั้นเราหยุดมัน · มีรา · คุณเป็นผู้นำคราวนี้ · ดวงอาทิตย์เป็นเรื่องของคุณ",
  dialogColor: C.gold,
});

slideKnowledge({
  ep: "EP 5",
  title: "6 ชั้นบรรยากาศดวงอาทิตย์",
  subtitle: "POWER FORGE · ปลดล็อค 6 พลังจาก 6 ชั้น",
  points: [
    "1. Core · 15 ล้าน K · ฟิวชัน 4H → He + 0.7% mass = E=mc²",
    "2. Radiative Zone · โฟตอนเดินทาง 100,000 ปี ออกจากชั้นนี้!",
    "3. Convective Zone · พลาสมาขึ้น-ลงเหมือนน้ำเดือด",
    "4. Photosphere · 5,778 K · ผิวที่เห็น · sunspots ที่นี่",
    "5. Chromosphere · 6,000-20,000 K · solar flare · spicule · เห็นสีชมพู-แดงตอนสุริยุปราคา",
    "6. Corona · > 1,000,000 K · ปริศนาที่ยังตอบไม่สมบูรณ์ · solar wind 400 km/s",
  ]
});

slideGrid4({
  tag: "⚡ POWER FORGE",
  tagColor: C.gold,
  ep: "EP 5",
  title: "6 พลัง HELION · ปลดล็อคจาก 6 ชั้น",
  cards: [
    { icon: "🛡", color: C.hubble, title: "Shield", sub: "กันรังสี · อารยา", desc: "โล่พลังงานล้อมยาน · ป้องกัน CME · กันคลื่นกระแทกซูเปอร์โนวา" },
    { icon: "⚠", color: C.amber, title: "Warning", sub: "เตือน spicule · เคน", desc: "อ่านความถี่พายุ · คาดเดาก่อนเกิด · บอกตำแหน่งอันตราย" },
    { icon: "💥", color: C.red, title: "Burst", sub: "ดันพลาสมา · โบลท์", desc: "ยิงพลาสมาดันกลับ · เบี่ยงเส้นทาง CME · ใช้ในสนามรบ" },
    { icon: "🌈", color: C.mint, title: "Insight + Time + Prismatic", sub: "3 พลังของมีรา + อารยา", desc: "👁 มองทะลุ sunspot · ⏱ ชะลอเวลา · 🌈 แยกความถี่ EM" },
  ]
});

slideBoss({
  ep: "EP 5",
  title: "BOSS · ดวงอาทิตย์ติดไฟเหมือนเทียน?",
  claim: "VOID อ้าง: ดวงอาทิตย์ก็แค่ไฟติดเหมือนเทียน · มีออกซิเจนหรือเปล่ายังไม่รู้ · เผาเชื้อเพลิงจนหมดแล้วก็ดับ · ทำไมต้องตื่นเต้น?",
  evidence: [
    "มีรา: ในอวกาศไม่มีออกซิเจน · ไม่ใช่การเผาไหม้ทางเคมี",
    "ฟิวชันนิวเคลียร์: 4H → 1He + มวลหายไป 0.7% เป็นพลังงาน E=mc²",
    "เคน: พลัง 4×10²⁶ วัตต์ · เทียน 80 W · ห่างกัน 10²⁴ เท่า",
    "โบลท์: เทียนเผา 1 เดือนหมด · ดวงอาทิตย์เผามา 4.6 พันล้านปี · เหลือ 5 พันล้านปี",
  ]
});

slideStory({
  tag: "EP5 · SCENE 03",
  tagColor: C.mint,
  timestamp: "AURORA · ขั้วโลกใต้",
  title: "ลายมือของน้อง · ในแสงเหนือ",
  icon: "🌌",
  iconBg: C.mint,
  sceneColor: "0E2A26",
  iconLabel: "AURORA MESSAGE",
  iconSub: "ลายมือ 'ปรียา' · ที่เคยเขียนบนหน้าต่างหิมะตก",
  narration: "ในออโรราเหนือสถานี McMurdo · มีราเห็นลายเส้นโค้งสีเขียวที่ตรงกับลายมือของน้องสาว · 'คุณเห็นจริงไหม · มีรา · หรือคุณอยากเห็น?' อารยาถามด้วยความรักที่ระมัดระวัง",
  speaker: "มีรา",
  line: "ผมไม่รู้ · แต่ — ผมยอมรับแล้ว · น้องของผมส่งสัญญาณ · เป็นเสียงสุดท้าย · ในแสงที่ทุกคนเห็นได้",
  dialogColor: C.mint,
  dialogBg: "0E2A26",
});

slideCliff({
  ep: "EP 5",
  title: "โวอิเดียนมีฐาน · ในระบบสุริยะของเรา",
  text: "หลังเบี่ยง CME — LEMAÎTRE: 'ดาวหางหลายดวงในระบบสุริยะ · วงโคจรเบี่ยงผิดปกติ · ตำแหน่งไม่ใช่ความบังเอิญ' · พวกเขาไม่ได้แค่อยู่นอกบ้าน · พวกเขาอยู่ในบ้าน",
  hook: "ลากเส้นทางย้อนกลับ · หาจุดร่วม"
});

// =====================================================
// =================  EP6 · EDGE OF HOME  ==============
// =====================================================

slideChapter("06", "ขอบฟ้าของบ้าน", "Edge of Home · สมาชิกระบบสุริยะ", "6 GENESIS SHARDS · Pale Blue Dot", C.void);

slideKnowledge({
  ep: "EP 6",
  title: "ทัวร์ดาวเคราะห์ 8 ดวง",
  subtitle: "Inner Rocky (4) + Outer Gas Giants (4) + Asteroid Belt + Kuiper",
  points: [
    "Mercury · ใกล้ที่สุด · มี exosphere บาง (Na · K · He) · 600°C สูง-ต่ำ",
    "Venus · runaway greenhouse · 460°C · CO₂ 96% · ฝนกรดซัลฟิวริก",
    "Earth · บ้าน · ฟ้าฟ้า · มหาสมุทร · biosphere",
    "Mars · ดาวตาย · เคยมีมหาสมุทร · พบน้ำแข็งใต้ผิว · methane spike",
    "Jupiter · ขาดมวล 80 เท่าจะเป็นดาวฤกษ์ · Great Red Spot 350+ ปี",
    "Saturn · วงแหวนน้ำแข็ง+ฝุ่น · กว้าง 280,000 km · หนาเพียง 10 เมตร",
    "Uranus · เอียง 98° · กลิ้งบนข้าง · Neptune · พายุ 2,100 km/h",
  ]
});

slideBoss({
  ep: "EP 6",
  title: "BOSS · พลูโตถูกถอด = วิทยาศาสตร์เปลี่ยนตามอารมณ์?",
  claim: "VOID อ้าง (ถือโปสเตอร์ 'Pluto Forever' 2006): นักวิทยาศาสตร์เรียนเยอะแค่ไหนก็ไม่ยอมรับว่ามันถูกถอด · ความรู้ของเธอเปลี่ยนตามอารมณ์",
  evidence: [
    "IAU 2006 นิยามดาวเคราะห์ใหม่ 3 ข้อ · เกณฑ์ทางวิทยาศาสตร์",
    "1. โคจรรอบดวงอาทิตย์ · 2. มวลพอที่แรงโน้มถ่วงทำให้กลม",
    "3. เคลียร์วงโคจรของตัวเอง — พลูโตไม่ผ่านข้อนี้ (แชร์กับ Kuiper 200,000+ วัตถุ)",
    "วิทยาศาสตร์เปลี่ยนตามหลักฐาน · ไม่ใช่ตามอารมณ์ · นั่นคือจุดแข็ง",
  ]
});

slideQuote({
  tag: "DR. HUBBLE",
  tagColor: C.gold,
  ep: "EP 6",
  text: "Carl Sagan เขียน: 'ทุกความรัก ทุกสงคราม ทุกประวัติศาสตร์ของมนุษย์ — เกิดขึ้นบนจุดสีฟ้าซีดนั้น' · บ้านของเรา · ใหญ่กว่าที่เราคิด · เล็กกว่าที่เอกภพรู้",
  attrib: "Pale Blue Dot · Voyager 1 · 1990 · ระยะ 6 พันล้าน km",
  context: "Cosmic Perspective · ลดความเย่อหยิ่งของมนุษยชาติ · เพิ่มความรับผิดชอบต่อบ้าน",
});

slideStory({
  tag: "EP6 · SCENE 02",
  tagColor: C.void,
  timestamp: "45 AU · KUIPER BELT",
  title: "Haumea Void Base · เป้าหมายลบบิกแบง",
  icon: "🛸",
  iconBg: C.void,
  sceneColor: "1A0530",
  iconLabel: "ANTI-GENESIS DEVICE",
  iconSub: "ใช้วาร์ปย้อนเวลา · รบกวนสภาวะเริ่มต้นเอกภพ",
  narration: "Haumea ดาวเคราะห์แคระรูปไข่หมุน 4 ชม./รอบ · ในด้านมืดมีฐานโวอิเดียน · ภายในมีโฮโลแกรมแผนที่ขนาดใหญ่ที่อารยาอ่านแล้วถอยกลับ — ถ้าสำเร็จ · เอกภพไม่เคยมีอยู่",
  speaker: "อารยา",
  line: "เป้าหมายของเขา · ลบบิกแบงต้นกำเนิด · ย้อนเวลาไปที่จุดเริ่ม · ใส่ anti-genesis device · ถ้าสำเร็จ — เอกภพไม่เคยมีอยู่",
  dialogColor: C.gold,
});

slideCliff({
  ep: "EP 6",
  title: "เริ่มแล้ว · แผนสุดท้าย",
  text: "LEMAÎTRE: 'ดาวเทียมสื่อสารทั่วโลกขาดสัญญาณ · GPS · INTERNET · BANKING · OFFLINE · โลกถูกตัดขาดทั้งโลก' · ห้องเงียบสนิท",
  hook: "เราจะใช้แผนที่ของพวกเขาเอง · เพื่อตามไปหยุดเขา"
});

// =====================================================
// =================  EP7 · ORBITAL WAR  ===============
// =====================================================

slideChapter("07", "สงครามในวงโคจร", "Orbital War · เทคโนโลยีอวกาศ", "PBL · ดาวเทียมชน · 7 ช่วงคลื่น · Orbital Triage", C.rose);

slideStat({
  tag: "EARTH OFFLINE",
  tagColor: C.red,
  ep: "EP 7",
  label: "วงโคจรเสี่ยง · เวลาเหลือ",
  big: "47",
  unit: "SATELLITES · 90 MINUTES",
  context: "เลือกได้แค่ 5 ดวง · ISS (มีคน) · GPS (คนล้าน) · Starlink (Kessler) · Hubble (มรดก) · JWST ที่ L2 (1.5 ล้าน km) ช่วยไม่ทัน — ปล่อยไป",
  bigColor: C.red,
});

slideKnowledge({
  ep: "EP 7",
  title: "3 ชั้นวงโคจร · LEO · MEO · GEO",
  subtitle: "Kepler's Third Law: T² = a³ · วงโคจรไกลกว่า → คาบยาวกว่า",
  formula: "v = √(GM/r)",
  formulaSub: "v_orbit ที่ LEO ≈ 7.9 km/s · v_escape ≈ 11.2 km/s",
  points: [
    "LEO · 200-2,000 km · คาบ 90 นาที · ISS, Hubble, Starlink",
    "MEO · 2,000-35,786 km · คาบ 12 ชั่วโมง · GPS, Galileo, BeiDou",
    "GEO · 35,786 km พอดี · คาบ 24 ชั่วโมง · นิ่งเทียบกับพื้น · โทรคมนาคม",
    "L2 Lagrange · 1.5 ล้าน km · JWST · stable เมื่อโลก-อาทิตย์-ยานเรียงกัน",
  ]
});

slideBoss({
  ep: "EP 7",
  title: "BOSS · ดาวเทียม GEO ลอยนิ่ง = ไม่เคลื่อน?",
  claim: "VOID อ้าง: ดาวเทียม GEO ลอยนิ่งเหนือหัวเธอ · ไม่ขยับ · พิสูจน์สิว่ามันเคลื่อน · ตาเธอเห็นว่ามันนิ่ง",
  evidence: [
    "โบลท์: มันเคลื่อนที่ที่ 3.07 km/s · พ่อสอนผมตอนผมเก้าขวบ",
    "หมุนรอบโลกพร้อมโลก 24 ชม. พอดี → ดูนิ่งเมื่อเทียบกับพื้น",
    "Kepler T² = a³ ที่ระยะ 35,786 km → T = 24 ชม. ตรงเป๊ะ",
    "ถ้าลอยนิ่งจริง · แรงโน้มถ่วงโลกจะดึงตกใน 4.5 ชั่วโมง — มันต้อง 'ตกตามโค้งของโลก' ตลอดเวลา",
  ]
});

slideKnowledge({
  ep: "EP 7",
  title: "EM Spectrum · 7 ย่านคลื่นแม่เหล็กไฟฟ้า",
  subtitle: "ทุกย่านเดินทางด้วยความเร็วแสง c · ต่างกันที่ความถี่และพลังงาน",
  formula: "c = f λ · E = h f",
  formulaSub: "c = 3×10⁸ m/s · h = 6.626×10⁻³⁴ J·s (Planck constant)",
  points: [
    "Radio (> 1 m) · TV, วิทยุ — Microwave (1mm-1m) · CMB, GPS",
    "Infrared (700nm-1mm) · JWST, ความร้อน — Visible (400-700nm) · Hubble, ตาเรา",
    "Ultraviolet (10-400nm) · ดาวร้อน — X-ray (0.01-10nm) · Chandra, BH",
    "Gamma (< 0.01nm) · Compton, Gamma-Ray Burst — พลังงานสูงสุด",
  ]
});

slideStory({
  tag: "EP7 · SCENE 02",
  tagColor: C.amber,
  timestamp: "DAD'S RECORDING",
  title: "คริสตัลข้อมูล · เสียงพ่อโบลท์",
  icon: "📡",
  iconBg: C.amber,
  sceneColor: "2A1F08",
  iconLabel: "GEOSAT-7",
  iconSub: "ดาวเทียมที่พ่อโบลท์ทำงาน · ปลดระวาง 2251",
  narration: "หลังช่วย ISS · โบลท์ส่งโดรนดึงดาวเทียมเก่า · ภายในมีคริสตัลข้อมูล · เปิด — เสียงพ่อตรง ๆ ชัดเจน ที่บันทึกก่อนหายตัวไม่กี่วัน · โบลท์น้ำตาไหลเงียบ · เขาไม่เช็ดออก",
  speaker: "พ่อโบลท์ (เสียงบันทึก)",
  line: "พ่อภูมิใจในตัวลูกตั้งแต่วันที่ลูกถอดเครื่องบินบังคับวิทยุของลูกเองตอนหกขวบ · ทีมที่ดีมาทดแทนพ่อที่ดีได้",
  dialogColor: C.amber,
  dialogBg: "2A1F08",
});

slideStat({
  tag: "FATHER'S LEGACY",
  tagColor: C.amber,
  ep: "EP 7",
  label: "พ่อโบลท์ค้นพบใน Origin Stone",
  big: "T = 0",
  unit: "TEMPORAL WARP · 13.8 GYR AGO",
  context: "พ่อซ่อนวาร์ปไดรฟ์ย้อนเวลาไว้ในดาวเทียม 3 ดวง (GEOSAT-7, LEO-Hubble, MEO-GPS-prime) · ก่อนที่โวอิเดียนจะเอาไปใช้ · ตอนนี้โบลท์เปิดของขวัญสุดท้ายของพ่อ",
  bigColor: C.amber,
});

slideCliff({
  ep: "EP 7",
  title: "Engaging temporal warp",
  text: "พ่อให้กุญแจ · ทีมพร้อมแล้ว · ยานสั่นรุนแรง · แสงข้างนอกเปลี่ยนเป็นริ้วที่ผ่าทุกสเปกตรัม — แดงสว่างที่ไป-ทาง-ข้างหน้า · ม่วงเข้มที่กำลังย้อน-ทาง-ข้างหลัง",
  hook: "พบกันอีกครั้ง · ที่จุดเริ่มต้น"
});

// =====================================================
// =================  EP8 · GENESIS  ===================
// =====================================================

slideChapter("08", "กำเนิดอีกครั้ง", "Genesis Again · Season Finale", "Synthesis · Mentor Reveal · 17 keys · Andromeda S2", C.gold);

slideStory({
  tag: "EP8 · SCENE 01",
  tagColor: C.void,
  timestamp: "t < 0",
  title: "ก่อนกาลเวลา · ความว่างเปล่า",
  icon: "⚫",
  iconBg: C.void,
  sceneColor: "0A0510",
  iconLabel: "PRE-CREATION",
  iconSub: "ไม่มีดาว · ไม่มีแสง · ไม่มีทิศทาง · ไม่มีเวลา",
  narration: "ยานหลุดออกในที่ที่ไม่มีอะไรเลย · บริดจ์เล็ก ๆ กับเก้าอี้สี่ตัว · กาแฟเย็นในแก้วของเคน · กรอบรูปในกระเป๋ามีรา · ประแจในมือโบลท์ · คือสิ่งเดียวที่มีอยู่ในความว่างเปล่าของก่อนเกิด",
  speaker: "VOID",
  line: "เอกภพคือความผิดพลาด · มันสร้างความรู้ · ความรู้สร้างเธอ · ผมจะลบทุกอย่าง · เธอจะได้พักจากการคิด",
  dialogColor: C.void,
  dialogBg: "2A1845",
});

slideKnowledge({
  ep: "EP 8",
  title: "GENESIS FORGE · 17 Keys · 4 Phases",
  subtitle: "ทุกความรู้จาก EP1-7 · กลายเป็นอาวุธสุดท้าย",
  points: [
    "Phase 1 ENERGY (EP1-2) · Big Bang · CMB · v=H₀D · Galaxy Classification",
    "Phase 2 DISTANCE (EP3-4) · Parallax · Magnitude · Cepheid · OBAFGKM · HR Diagram · Mass Threshold",
    "Phase 3 HABITABILITY (EP5-6) · Sun 6 Layers · HELION 6 Powers · 8 Planets · Pale Blue Dot",
    "Phase 4 COMMUNICATION (EP7) · EM Spectrum 7 bands · 3 Orbital Classes · Spacecraft Heritage",
    "Total: 17 กุญแจ · 1 ภารกิจ · ปกป้องเอกภพที่จะมีอยู่",
  ]
});

slideGrid4({
  tag: "🗝 4 PHASE BREAKDOWN",
  tagColor: C.gold,
  ep: "EP 8",
  title: "FIRE! · ทีมยิงพร้อมกัน",
  cards: [
    { icon: "1", color: C.hubble, title: "ENERGY · อารยา", sub: "EP1-2 · 4 keys", desc: "v=H₀D · อวกาศขยาย ไม่ใช่ระเบิดในที่ว่าง · มันเริ่มที่นี่ เดี๋ยวนี้ กำลังเริ่ม" },
    { icon: "2", color: C.rose, title: "DISTANCE · เคน", sub: "EP3-4 · 7 keys", desc: "d=1/p · m-M=5log(d/10) · เราวัดเอกภพได้ · ระยะ 400 ปีแสง — จริง" },
    { icon: "3", color: C.mint, title: "HABITABILITY · มีรา", sub: "EP5-6 · 4 keys", desc: "6 ชั้นดวงอาทิตย์ · 8 ดาวเคราะห์ · เรารู้บ้านของเรา · เราจะปกป้องมัน" },
    { icon: "4", color: C.amber, title: "COMMUNICATION · โบลท์", sub: "EP7 · 3 keys", desc: "7 ย่าน EM · ยานอวกาศของมนุษย์ · พ่อสอนผม — ไม่ใช่เผาเงิน" },
  ]
});

slideQuote({
  tag: "FINAL CLASH",
  tagColor: C.gold,
  ep: "EP 8",
  text: "ความรู้... แข็งแกร่งกว่า... ความว่างเปล่า...",
  attrib: "VOID · เสียงสุดท้าย",
  context: "ลำแสง 17 รวมเป็นลำสีขาวบริสุทธิ์ · ปะทะ anti-genesis device · เครื่องพังทันที · VOID สลายตัว · ปากเล็กในเงาหุบทีละปาก",
});

slideStory({
  tag: "EP8 · SCENE 03",
  tagColor: C.gold,
  timestamp: "t = 0 → 13.8 Gyr",
  title: "เอกภพเริ่มต้น · เอกภพที่เราเพิ่งจะปกป้อง",
  icon: "🌅",
  iconBg: C.gold,
  sceneColor: "5A4010",
  iconLabel: "GENESIS",
  iconSub: "อวกาศขยายตัว · ดาวก่อตัว · กาแล็กซีก่อตัว",
  narration: "10⁻³⁵ s: พลังงานควอนตัมแยกเป็น 4 แรง · 10⁻⁶ s: ควาร์กรวมเป็นโปรตอน · 3 นาที: นิวเคลียส H + He · 380,000 ปี: CMB ปล่อย · 200 ล้านปี: ดาวฤกษ์ดวงแรก · 1 พันล้านปี: กาแล็กซี · เวลาเริ่มเดินตามที่มันควรเป็น",
  speaker: "อารยา",
  line: "เคน · มีรา · โบลท์ · พวกคุณคือทีมที่ดีที่สุด",
  dialogColor: C.gold,
});

slideCliff({
  ep: "EP 8",
  title: "Season 2 · Andromeda Awaits",
  text: "ยานกลับมาปี 2267 · ดาวเทียมเริ่มทำงานอีก · ไฟเมืองทั่วโลกเริ่มสว่าง · แล้ว LEMAÎTRE ก็ส่งเสียงเตือน — สัญญาณใหม่ · จาก Andromeda · 2.5 ล้านปีแสง · ไม่ใช่ลายเซ็นที่เรารู้จัก",
  hook: "Season 2 · เริ่ม · เมื่อเธอพร้อม"
});

// =====================================================
// =================  SYNTHESIS  =======================
// =====================================================

slideDivider("SYNTHESIS", "นิยายเป็น Trigger · ความรู้เป็นอาวุธ", C.gold);

slideKnowledge({
  ep: "TEACHER NOTES",
  title: "Story-to-Lesson Bridge · หลักการสอน",
  subtitle: "Story creates Need · Need demands Concept · Concept solves Story",
  points: [
    "🎬 STORY BEAT — เหตุการณ์ · 1-2 ประโยค",
    "❓ STUDENT'S NEED — คำถามที่นักเรียนเกิดเอง (ไม่ใช่ครูบอกให้รู้)",
    "📚 CONCEPT — เนื้อหา ม.6 ที่ต้องรู้ (ผูกกับ ว 7.1 ม.4-6/2)",
    "🎮 ACTIVITY — กิจกรรมเชิงรุก: drag-classify, lab, MCQ, debate",
    "✨ RESOLUTION — เรื่องดำเนินต่อ · ผลของการเรียนเป็นเสริมพล็อต",
  ]
});

slideGrid4({
  tag: "PEDAGOGICAL FRAMEWORK",
  tagColor: C.mint,
  ep: "TEACHER",
  title: "4 เครื่องมือที่ทีมใช้เป็นโมเดล",
  cards: [
    { icon: "❓", color: C.gold, title: "Curiosity Gap", sub: "เปิดด้วยปริศนา", desc: "Cold open กระทบใจ → นักเรียนอยากรู้คำตอบ · ไม่ใช่ครูบอกให้สงสัย" },
    { icon: "⚔", color: C.void, title: "Misconception Boss", sub: "VOID rebut pattern", desc: "นักเรียนหักล้าง VOID ด้วยหลักฐาน → ความรู้ที่ผ่านการต่อสู้แข็งแกร่งกว่าที่รับมา" },
    { icon: "👨‍🏫", color: C.hubble, title: "Mentor Reveal", sub: "ดร.ฮับเบิล + LEMAÎTRE", desc: "ครูในเรื่องอธิบายหลังนักเรียนเกิด need · authoritative แต่ไม่ปรามาส" },
    { icon: "💔", color: C.amber, title: "Emotional Stakes", sub: "พ่อ · น้อง · ครอบครัว", desc: "ทำให้เนื้อหามี anchor · นักเรียนจำเพราะรู้สึก ไม่ใช่เพราะถูกบังคับ" },
  ]
});

slideKnowledge({
  ep: "VPA RESEARCH",
  title: "Research Instruments · เครื่องมือวิจัยที่ฝังในหน่วย",
  subtitle: "วPA เชี่ยวชาญ · ครูโกเมน ปาปะโถ · 2569",
  points: [
    "Pre/Post Test · 5 ข้อต่อ EP · parallel form 1:1 · Hake Gain analysis",
    "FT-01/02 Two-tier Diagnostic · 20 ข้อ · Caleon & Subramaniam · 4 categories (Sound/Misconception/Guessing/No-K)",
    "IMI (Intrinsic Motivation Inventory) · 21 ข้อ · post-only design · เกณฑ์ ≥ 3.51",
    "Satisfaction · 20 ข้อ · 4 ด้าน (Content/Activity/Media/Assessment)",
    "Apps Script telemetry · 5 sheets · auto-sync · Data-Collection Gate (Phase 8)",
  ]
});

// --- CLOSING ---
{
  const s = pres.addSlide();
  bg(s, C.bg); starfield(s);
  s.addShape(pres.shapes.OVAL, { x: -3, y: -3, w: 16, h: 12, fill: { color: C.gold, transparency: 94 }, line:{type:"none"} });

  s.addText("★", { x: 0.5, y: 0.9, w: 9, h: 0.5, fontFace: FH, fontSize: 28, color: C.gold, align: "center", margin: 0 });
  s.addText("เอกภพ — ไม่ใช่แค่สมการ", { x: 0.5, y: 1.5, w: 9, h: 0.8, fontFace: FH, fontSize: 38, bold: true, color: C.white, align: "center", italic: true, margin: 0 });
  s.addText("มันคือ บ้าน ของเรา", { x: 0.5, y: 2.3, w: 9, h: 0.8, fontFace: FH, fontSize: 38, bold: true, color: C.gold, align: "center", margin: 0 });
  divider(s, 3, 3.4, 4, C.gold);
  s.addText("และเรา — เป็น Cadet ที่ห้า · ของยาน T.H.E.O.S.-IX", { x: 0.5, y: 3.55, w: 9, h: 0.4, fontFace: FH, fontSize: 16, color: C.dim, align: "center", italic: true, margin: 0 });

  s.addText("★ COSMOS LOG · SEASON 1 · COMPLETE ★", { x: 0.5, y: 4.4, w: 9, h: 0.4, fontFace: FH, fontSize: 14, color: C.gold, align: "center", bold: true, charSpacing: 8, margin: 0 });
  s.addText("To be continued in Season 2 · Andromeda Awaits", { x: 0.5, y: 4.85, w: 9, h: 0.3, fontFace: FH, fontSize: 11, color: C.dim, align: "center", italic: true, margin: 0 });
}

// --- CREDITS ---
{
  const s = pres.addSlide();
  bg(s, C.bg); smallStarfield(s);
  tag(s, "👋 CREDITS", 0.5, 0.35, C.mint, 1.6);
  s.addText("ขอบคุณที่เป็น Cadet ที่ 5", { x: 0.5, y: 0.85, w: 9, h: 0.6, fontFace: FH, fontSize: 30, bold: true, color: C.gold, margin: 0 });

  s.addText([
    { text: "ผู้เขียนนิยาย: ", options: { bold: true, color: C.gold, fontSize: 14, breakLine: false } },
    { text: "เจน · Researcher / วPA · LP-02 COSMOS\n", options: { color: C.ink, fontSize: 14, breakLine: true } },

    { text: "ผู้สอน: ", options: { bold: true, color: C.gold, fontSize: 14, breakLine: false } },
    { text: "ครูโกเมน ปาปะโถ · ว 30105 ดาราศาสตร์ · โรงเรียนสตรีวิทยา\n", options: { color: C.ink, fontSize: 14, breakLine: true } },

    { text: "ตามไบเบิล: ", options: { bold: true, color: C.gold, fontSize: 14, breakLine: false } },
    { text: "cosmos-log-series-bible.html v1.0\n", options: { color: C.dim, fontSize: 13, italic: true, breakLine: true } },

    { text: "เครื่องมือ: ", options: { bold: true, color: C.gold, fontSize: 14, breakLine: false } },
    { text: "Apps Script telemetry · Two-tier diagnostic · IMI · Hake Gain · Pre/Post parallel form\n", options: { color: C.ink, fontSize: 13, breakLine: true } },

    { text: "ภารกิจ: ", options: { bold: true, color: C.gold, fontSize: 14, breakLine: false } },
    { text: "นักเรียนเรียนรู้ไม่ใช่เพราะครูบอกให้เรียน · แต่เพราะ 'ทีมต้องรอด'", options: { color: C.hubble, fontSize: 14, italic: true } },
  ], { x: 0.7, y: 1.6, w: 8.6, h: 2.8, valign: "top", margin: 0, paraSpaceAfter: 8 });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.45, w: 8.6, h: 0.7, fill: { color: "0E2A26" }, line: { color: C.mint, width: 1 } });
  s.addText("📚 ไฟล์ที่เกี่ยวข้อง: COSMOS_LOG_NOVEL.html · NOVELLA.md · MOVIE_SCRIPT.md · STORY_TO_LESSON.md · 22 cinematic scene slots", { x: 0.9, y: 4.45, w: 8.2, h: 0.7, fontFace: FB, fontSize: 11, color: C.mint, valign: "middle", margin: 0 });
}

// =====================================================
// =================  WRITE FILE  ======================
// =====================================================

pres.writeFile({ fileName: "/Users/komanepapato/Documents/วิจัย/wave-mechanics-research/lessons/astronomy/deck/COSMOS_LOG_DECK.pptx" })
  .then(fn => console.log("✅ Deck created: " + fn));
