#!/usr/bin/env python3
"""
Generator script: แปลง Infographic HTML → Word docx แผนการสอนแบบเต็ม
ครอบคลุม physics 3 ทั้งหมด: waves(10) + SHM(6) + sound(11) + light(3) = 30 แผน
ใช้ PyThaiNLP word_tokenize + ZWSP สำหรับ Thai line-break (alignment LEFT)
"""
import os, re, sys
from pathlib import Path
from bs4 import BeautifulSoup
from docx import Document
from docx.shared import Pt, Cm, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.enum.table import WD_ALIGN_VERTICAL
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from pythainlp.tokenize import word_tokenize

ZWSP = "​"   # zero-width space, ใช้ระหว่างคำไทยเพื่อ wrap บรรทัด

BASE = Path("/Users/komanepapato/Documents/วิจัย/wave-mechanics-research/lessons/physics3")
OUTDIR = BASE / "แผนการสอน"

UNITS = [
    ("waves",    "หน่วยที่ 1 คลื่นกล",           "บทที่ 9 คลื่นกล",      "ม.5", "ว 5.2 ม.5/1-5",  12),
    ("SHM",      "หน่วยที่ 2 การเคลื่อนที่แบบฮาร์มอนิกอย่างง่าย", "บทที่ 11 SHM",       "ม.5", "ว 5.2 ม.5/3",     8),
    ("sound",    "หน่วยที่ 3 เสียง",             "บทที่ 12 เสียง",      "ม.5", "ว 5.2 ม.5/4-7",  13),
    ("light",    "หน่วยที่ 4 แสงเชิงคลื่น",       "บทที่ 10 แสงเชิงคลื่น", "ม.5", "ว 2.3 ม.5",      5),
    ("review",   "หน่วยทบทวนรวม",                 "Two-tier Diagnostic", "ม.5", "ทบทวน ว 5.2 + ว 2.3", 1),
    ("capstone", "หน่วย Capstone Project",        "บูรณาการตลอดเทอม",   "ม.5", "บูรณาการ ว 5.2 + ว 2.3", 1),
]

# ──────────────────────────────────────────────────────────────────
# Thai line-break helper
def th_break(s):
    """แทรก ZWSP ระหว่างคำไทย ให้ Word wrap บรรทัดได้สวย"""
    if not s: return ""
    try:
        toks = word_tokenize(s, engine="newmm", keep_whitespace=True)
        return ZWSP.join(toks)
    except Exception:
        return s

# ──────────────────────────────────────────────────────────────────
# Word style helpers
def set_th_font(run, size=14, bold=False, color=None):
    run.font.name = "TH Sarabun New"
    rpr = run._element.get_or_add_rPr()
    rfont = rpr.find(qn("w:rFonts"))
    if rfont is None:
        rfont = OxmlElement("w:rFonts")
        rpr.append(rfont)
    for attr in ("w:ascii","w:hAnsi","w:cs","w:eastAsia"):
        rfont.set(qn(attr), "TH Sarabun New")
    run.font.size = Pt(size)
    run.bold = bold
    if color:
        run.font.color.rgb = RGBColor(*color)

def add_para(doc, text, *, size=14, bold=False, align=WD_ALIGN_PARAGRAPH.LEFT,
             color=None, space_before=0, space_after=2, indent_left=0):
    p = doc.add_paragraph()
    p.alignment = align
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    if indent_left:
        p.paragraph_format.left_indent = Cm(indent_left)
    r = p.add_run(th_break(text))
    set_th_font(r, size=size, bold=bold, color=color)
    return p

def add_heading(doc, text, level=1):
    sizes = {0:22, 1:18, 2:16, 3:15}
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(4)
    if level == 0:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(th_break(text))
    set_th_font(r, size=sizes.get(level,14), bold=True,
                color=(0x1f,0x2d,0x5c) if level<=1 else (0x2d,0x3d,0x5a))

def add_bullet(doc, text, *, size=14, indent=0.5):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p.paragraph_format.space_after = Pt(1)
    p.paragraph_format.left_indent = Cm(indent + 0.5)
    p.paragraph_format.first_line_indent = Cm(-0.5)
    r = p.add_run("•  " + th_break(text))
    set_th_font(r, size=size)

def add_numbered(doc, num, text, *, size=14, indent=0.5):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p.paragraph_format.space_after = Pt(1)
    p.paragraph_format.left_indent = Cm(indent + 0.8)
    p.paragraph_format.first_line_indent = Cm(-0.8)
    r = p.add_run(f"{num}.  " + th_break(text))
    set_th_font(r, size=size)

def add_table(doc, headers, rows, col_widths=None):
    t = doc.add_table(rows=1+len(rows), cols=len(headers))
    t.style = "Light Grid Accent 1"
    t.autofit = False
    if col_widths:
        for i,w in enumerate(col_widths):
            for cell in t.columns[i].cells:
                cell.width = Cm(w)
    hdr = t.rows[0].cells
    for i,h in enumerate(headers):
        hdr[i].text = ""
        p = hdr[i].paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(th_break(h))
        set_th_font(r, size=13, bold=True, color=(255,255,255))
        # shading
        sh = OxmlElement("w:shd"); sh.set(qn("w:fill"), "1f4e79")
        hdr[i]._tc.get_or_add_tcPr().append(sh)
    for ri,row in enumerate(rows):
        cells = t.rows[ri+1].cells
        for ci,val in enumerate(row):
            cells[ci].text = ""
            p = cells[ci].paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            r = p.add_run(th_break(str(val)))
            set_th_font(r, size=12)
    return t

def add_separator(doc):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(4)
    r = p.add_run("─" * 40)
    set_th_font(r, size=10, color=(0x99,0x99,0x99))
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER

# ──────────────────────────────────────────────────────────────────
# Parse Infographic HTML → structured dict
def parse_infographic(html_path):
    soup = BeautifulSoup(Path(html_path).read_text(encoding="utf-8"), "html.parser")
    data = {}

    # plan number + title from hero
    hero = soup.find(class_="hero")
    if hero:
        num = hero.find(class_="plan-num")
        data["plan_num"] = num.get_text(strip=True) if num else ""
        h1 = hero.find("h1")
        data["title"] = h1.get_text(strip=True) if h1 else ""
        sub = hero.find(class_="subtitle")
        data["subtitle"] = sub.get_text(strip=True) if sub else ""
        course_p = hero.find("p")
        data["course_info"] = course_p.get_text(strip=True) if course_p else ""
        # tags
        data["tags"] = [t.get_text(strip=True) for t in hero.find_all(class_="tag")]
        # meta items
        data["meta"] = [m.get_text(" ", strip=True) for m in hero.find_all(class_="meta-item")]

    # สาระสำคัญ (concept-box)
    cb = soup.find(class_="concept-box")
    if cb:
        # split by <br>
        for br in cb.find_all("br"): br.replace_with("\n")
        data["concept"] = cb.get_text(" ", strip=False).strip()

    # Refr cards (3 ใบ)
    data["refr_cards"] = []
    for c in soup.find_all(class_="refr-card"):
        title = c.find(class_="refr-card-title")
        sub = c.find(class_="refr-card-sub")
        note = c.find(class_="refr-card-note")
        data["refr_cards"].append({
            "title": title.get_text(strip=True) if title else "",
            "sub": sub.get_text(strip=True) if sub else "",
            "note": note.get_text(strip=True) if note else "",
        })

    # Formula box
    fb = soup.find(class_="formula-box")
    if fb:
        rows = []
        for row in fb.find_all(class_="formula-row"):
            tag = row.find(class_="formula-tag")
            formula = row.find(class_="formula")
            extras = row.find_all("span", class_=False) or []
            note = ""
            for s in row.find_all("span"):
                cls = " ".join(s.get("class") or [])
                if not cls:
                    note = s.get_text(strip=True)
                    break
            rows.append({
                "tag": tag.get_text(strip=True) if tag else "",
                "formula": formula.get_text(strip=True) if formula else "",
                "note": note,
            })
        data["formulas"] = rows

    # Misconceptions
    data["misc"] = []
    mb = soup.find(class_="misc-box")
    if mb:
        for item in mb.find_all(class_="misc-item"):
            mid = item.find(class_="misc-id")
            text = item.find(class_="misc-text")
            correct = item.find(class_="misc-correct")
            data["misc"].append({
                "id": mid.get_text(strip=True) if mid else "",
                "wrong": text.get_text(" ", strip=True) if text else "",
                "correct": correct.get_text(" ", strip=True) if correct else "",
            })

    # KPA objectives (obj-list + obj-code)
    data["K"] = []; data["P"] = []; data["A"] = []
    for grp in soup.find_all(class_="obj-group"):
        otype = grp.find(class_="obj-type")
        if not otype: continue
        clsstr = " ".join(otype.get("class") or [])
        items = grp.find_all("li")
        for li in items:
            code = li.find(class_="obj-code")
            code_text = code.get_text(strip=True) if code else ""
            # full text minus code
            full = li.get_text(" ", strip=True)
            if code_text: full = full.replace(code_text, "", 1).strip()
            entry = {"code": code_text, "text": full}
            if "obj-type k" in clsstr or " k " in clsstr or clsstr.endswith(" k"):
                data["K"].append(entry)
            elif "obj-type p" in clsstr or " p " in clsstr or clsstr.endswith(" p"):
                data["P"].append(entry)
            elif "obj-type a" in clsstr or " a " in clsstr or clsstr.endswith(" a"):
                data["A"].append(entry)
    # fallback: read by obj-code class
    if not (data["K"] or data["P"] or data["A"]):
        for li in soup.find_all("li"):
            code = li.find(class_="obj-code")
            if not code: continue
            cls = " ".join(code.get("class") or [])
            code_text = code.get_text(strip=True)
            text = li.get_text(" ", strip=True).replace(code_text,"",1).strip()
            entry = {"code": code_text, "text": text}
            if "p" in cls.split(): data["P"].append(entry)
            elif "a" in cls.split(): data["A"].append(entry)
            else: data["K"].append(entry)

    # Timeline phases
    data["phases"] = []
    for ph in soup.find_all(class_="phase"):
        dot = ph.find(class_="phase-dot")
        name = ph.find(class_="phase-name")
        time = ph.find(class_="phase-time")
        objb = ph.find_all(class_="obj-badge")
        miscb = ph.find_all(class_="misc-badge")
        vpab = ph.find_all(class_="vpa-badge")
        poe = ph.find(class_="poe-chip")
        actbadge = ph.find(class_="activity-badge")
        lis = []
        for li in ph.find_all("li"):
            t = li.find(class_="li-text")
            if t:
                lis.append(t.get_text(" ", strip=True))
        data["phases"].append({
            "code": dot.get_text(strip=True) if dot else "",
            "name": name.get_text(strip=True) if name else "",
            "time": time.get_text(strip=True) if time else "",
            "obj": [b.get_text(strip=True) for b in objb],
            "misc": [b.get_text(strip=True) for b in miscb],
            "vpa": [b.get_text(strip=True) for b in vpab],
            "poe": poe.get_text(strip=True) if poe else "",
            "activity": actbadge.get_text(strip=True) if actbadge else "",
            "activities": lis,
        })

    # สื่อ tool-item
    data["tools"] = []
    for ti in soup.find_all(class_="tool-item"):
        num = ti.find(class_="tool-num")
        full = ti.get_text(" ", strip=True)
        if num:
            full = full.replace(num.get_text(strip=True), "", 1).strip()
        data["tools"].append(full)

    # assess table
    data["assess"] = []
    at = soup.find(class_="assess-table")
    if at:
        for tr in at.find_all("tr")[1:]:
            tds = [td.get_text(" ", strip=True) for td in tr.find_all("td")]
            if tds: data["assess"].append(tds)

    # vpa table
    data["vpa"] = []
    vt = soup.find(class_="vpa-table")
    if vt:
        for tr in vt.find_all("tr")[1:]:
            tds = [td.get_text(" ", strip=True) for td in tr.find_all("td")]
            if tds and len(tds) >= 3:
                data["vpa"].append(tds)

    # rubric
    data["rubric"] = []
    for rs in soup.find_all(class_="rubric-score"):
        num = rs.find(class_="score-num")
        desc = rs.find(class_="score-desc")
        data["rubric"].append({
            "score": num.get_text(strip=True) if num else "",
            "desc": desc.get_text(strip=True) if desc else "",
        })

    # sim banner
    sim = soup.find(class_="sim-banner")
    if sim:
        title = sim.find(class_="sim-banner-title")
        sub = sim.find(class_="sim-banner-sub")
        data["sim"] = {
            "title": title.get_text(strip=True) if title else "",
            "url": sub.get_text(strip=True) if sub else "",
            "badges": [b.get_text(strip=True) for b in sim.find_all(class_="sim-badge")],
        }

    return data

# ──────────────────────────────────────────────────────────────────
# Narrative generators (prose for each phase to satisfy วPA)
PHASE_NARRATIVES = {
    "TLC": ("กิจกรรมตรวจสอบสภาพการเรียนรู้ก่อนเรียนด้วย Traffic Light Card ครูเปิดประเด็นด้วยคำถาม "
            "กระตุ้นความคิดที่ใกล้ตัวนักเรียน นักเรียนชู🟢 (เข้าใจ) · 🟡 (ไม่แน่ใจ) · 🔴 (ไม่เข้าใจ) "
            "ครูเก็บข้อมูลภาพรวมและตั้งเป้าหมายของคาบให้นักเรียนเห็นชัดเจน "
            "กิจกรรมนี้สอดคล้องกับ วPA ตัวชี้วัด 4 (กระตุ้นแรงจูงใจ) และ 7 (Self-Regulated Learning)"),
    "ACT": ("ขั้นกระตุ้นและทบทวนความรู้เดิม (Activate Prior Knowledge) ครูใช้ Kahoot Quick Quiz "
            "เพื่อเชื่อมโยงความรู้จากหน่วยก่อน เป็นการสอดคล้องโดยตรงกับ วPA ตัวชี้วัด 2 "
            "ที่เน้นการเชื่อมโยงความรู้/ประสบการณ์เดิมกับการเรียนรู้ใหม่ ครูเห็น baseline "
            "และนักเรียนตื่นตัวจากการแข่งขันแบบ formative"),
    "GOAL": ("ครูแสดงเป้าหมายการเรียนรู้และเกณฑ์การประเมิน (Visible Learning Goals) "
             "ตามแนวทาง Hattie นักเรียนรู้ตั้งแต่ต้นคาบว่าครูจะประเมินอะไรและด้วยเกณฑ์ใด "
             "ส่งเสริม วPA ตัวชี้วัด 1 (ผู้เรียนเข้าถึงสิ่งที่เรียน) และ 6 (ข้อมูลย้อนกลับ)"),
    "F": ("ขั้น Formative Pre-test ด้วยข้อสอบสี่ระดับ (Four-tier Diagnostic Test) "
          "ที่วัดทั้งความเข้าใจมโนทัศน์และความมั่นใจของนักเรียน ครูได้ baseline ของ "
          "Sound concept / Misconception / Guessing / No-knowledge เพื่อเปรียบเทียบกับ Post-test "
          "หลังจบคาบ สอดคล้อง วPA ตัวชี้วัด 2 และ 6"),
    "E1": ("ขั้น Engage ครูใช้สื่อ Concept Cartoon ที่มีตัวการ์ตูนเถียงกันด้วยความเชื่อต่าง ๆ "
           "(บางความเชื่อตรงกับ misconception เป้าหมาย) นักเรียนต้องเลือกข้างและให้เหตุผล "
           "แบบ CER (Claim-Evidence-Reasoning) เบื้องต้น จากนั้นเขียน Predict (P ใน POE) "
           "เป็นการกระตุ้นด้วยขัดแย้งทางมโนทัศน์ สอดคล้อง วPA ตัวชี้วัด 1, 4"),
    "E2": ("ขั้น Explore นักเรียนทำกิจกรรมหรือทดลองตามฐานต่าง ๆ บันทึก Observe (O ใน POE) "
           "ครูทำหน้าที่เป็นโค้ช เดินดูทุกกลุ่ม ถามคำถามนำให้นักเรียนคิด ไม่เฉลยทันที "
           "สนับสนุนทักษะกระบวนการวิทยาศาสตร์ + การเรียนรู้ผ่านประสบการณ์ตรง "
           "สอดคล้อง วPA ตัวชี้วัด 3 (สร้างความรู้เอง) และ 7 (จัดการตนเอง)"),
    "E3": ("ขั้น Explain นักเรียนแต่ละกลุ่มนำเสนอ Claim/Evidence/Reasoning บนกระดาน Live Board "
           "ครูเชื่อมโยงข้อมูลของแต่ละกลุ่มเข้าสู่หลักการทางวิทยาศาสตร์ที่ถูกต้อง พร้อมแก้ misconception "
           "เป้าหมายชัด ๆ นักเรียนเขียน Explain (E ใน POE) เปรียบเทียบกับ Predict ตอนต้น "
           "สอดคล้อง วPA ตัวชี้วัด 3, 5 (ทักษะนวัตกรรม) และ 6 (feedback)"),
    "E4": ("ขั้น Elaborate ครูให้ใบงานคำนวณ (Calc) ไล่ระดับความยาก และใบงาน Spot the Error "
           "ที่นักเรียนต้องวิเคราะห์ misconception ในสถานการณ์สมมุติ การฝึกแบบขยายช่วยให้ "
           "นักเรียนนำความรู้ไปประยุกต์ใช้ในบริบทใหม่ สอดคล้อง วPA ตัวชี้วัด 5 และ 8 "
           "(นำความรู้ไปต่อยอด)"),
    "MJ": ("Metacognitive Journal 3-2-1 นักเรียนเขียนสะท้อนคิด 3 สิ่งที่เข้าใจ · 2 ปรากฏการณ์ "
           "ในชีวิตจริงที่เชื่อมโยงได้ · 1 คำถามค้างใจ ครูใช้ข้อมูลเหล่านี้เพื่อปรับการสอนครั้งถัดไป "
           "สอดคล้อง วPA ตัวชี้วัด 6 (feedback) และ 8 (ต่อยอด)"),
}

def phase_narrative(code, name):
    code_key = code.upper().strip()
    if code_key.startswith("F"): code_key = "F"
    return PHASE_NARRATIVES.get(code_key,
        f"ขั้น {name} ครูดำเนินกิจกรรมตามรายละเอียดต่อไปนี้ เพื่อให้ผู้เรียนบรรลุจุดประสงค์")

# ──────────────────────────────────────────────────────────────────
# Build one docx
def build_docx(unit_info, html_path, out_path):
    unit_key, unit_full, chapter_text, grade, indicator, _ = unit_info
    data = parse_infographic(html_path)
    doc = Document()

    # margins
    for sec in doc.sections:
        sec.top_margin = Cm(2.0); sec.bottom_margin = Cm(2.0)
        sec.left_margin = Cm(2.0); sec.right_margin = Cm(2.0)

    # ── ปก
    add_heading(doc, f"แผนการจัดการเรียนรู้ที่ {data.get('plan_num','-')}", level=0)
    add_heading(doc, f"เรื่อง {data.get('title','-')}", level=1)
    add_para(doc, f"รายวิชา ว 30203 ฟิสิกส์ 3   ระดับชั้น {grade}", size=14, align=WD_ALIGN_PARAGRAPH.CENTER)
    add_para(doc, f"{unit_full}   {chapter_text}", size=14, align=WD_ALIGN_PARAGRAPH.CENTER)
    add_para(doc, "ครูผู้สอน นายโกเมน ปาปะโถ   กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี",
             size=14, align=WD_ALIGN_PARAGRAPH.CENTER)
    add_para(doc, "โรงเรียนสตรีวิทยา   ปีการศึกษา 2569",
             size=14, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=10)
    # period info
    period_line = " · ".join(data.get("meta", []))
    if period_line:
        add_para(doc, period_line, size=13, align=WD_ALIGN_PARAGRAPH.CENTER,
                 color=(0x55,0x55,0x55))
    add_separator(doc)

    # ── 1. สาระสำคัญ
    add_heading(doc, "1. สาระสำคัญ", level=1)
    concept = data.get("concept", "")
    # clean bullet markers and split into sentences
    lines = [l.strip(" •·-") for l in concept.split("\n") if l.strip()]
    for line in lines:
        if line:
            add_para(doc, line, size=14, space_after=3, indent_left=0.3)

    # ── 2. มาตรฐาน ตัวชี้วัด จุดประสงค์
    add_heading(doc, "2. มาตรฐาน · ตัวชี้วัด · จุดประสงค์การเรียนรู้ (KPA)", level=1)
    add_para(doc, f"มาตรฐาน: {chapter_text} (สสวท. ฟิสิกส์ เล่ม 3)", size=14, bold=True)
    add_para(doc, f"ตัวชี้วัด: {indicator}", size=14, bold=True, space_after=6)
    if data["K"]:
        add_heading(doc, "ด้านความรู้ (K — Knowledge)", level=3)
        for k in data["K"]:
            add_bullet(doc, f"({k['code']}) {k['text']}", size=14)
    if data["P"]:
        add_heading(doc, "ด้านทักษะกระบวนการ (P — Process Skill)", level=3)
        for p in data["P"]:
            add_bullet(doc, f"({p['code']}) {p['text']}", size=14)
    if data["A"]:
        add_heading(doc, "ด้านเจตคติ (A — Attitude)", level=3)
        for a in data["A"]:
            add_bullet(doc, f"({a['code']}) {a['text']}", size=14)

    # ── 3. สมรรถนะ
    add_heading(doc, "3. สมรรถนะสำคัญและคุณลักษณะอันพึงประสงค์", level=1)
    add_para(doc, "สมรรถนะสำคัญของผู้เรียน (ตามหลักสูตรแกนกลาง 2551 และฉบับปรับปรุง):", size=14, bold=True)
    for c in ["การสื่อสาร — นำเสนอ Claim/Evidence/Reasoning ในขั้น Explain ได้ชัดเจน",
              "การคิด — วิเคราะห์ผลการทดลอง · เชื่อมโยงข้อมูลจาก POE",
              "การแก้ปัญหา — แก้โจทย์เชิงคำนวณและสถานการณ์ Spot the Error",
              "ทักษะชีวิตและการใช้เทคโนโลยี — ใช้ Simulation · เครื่องมือ Lab อย่างปลอดภัย",
              "การรวมพลังทำงานเป็นทีม — แบ่งหน้าที่ในกลุ่มทดลอง 3 ฐาน"]:
        add_bullet(doc, c)
    add_para(doc, "คุณลักษณะอันพึงประสงค์:", size=14, bold=True, space_before=6)
    for c in ["มีวินัย", "ใฝ่เรียนรู้", "มุ่งมั่นในการทำงาน", "มีจิตสาธารณะ"]:
        add_bullet(doc, c)

    # ── 4. Misconceptions
    if data["misc"]:
        add_heading(doc, "4. แนวคิดคลาดเคลื่อน (Misconceptions) เป้าหมาย", level=1)
        add_para(doc, "ครูออกแบบคาบนี้เพื่อแก้ misconception ที่ฝังลึกของนักเรียน "
                      "โดยใช้ Concept Cartoon ในขั้น Engage และ Four-tier Diagnostic "
                      "ในขั้น Pre/Post เพื่อวัดการเปลี่ยนแปลงเชิงมโนทัศน์ (conceptual change)",
                 size=14, space_after=6)
        for m in data["misc"]:
            add_para(doc, f"{m['id']}", size=14, bold=True, color=(0xb9,0x1c,0x1c),
                     space_before=4)
            add_bullet(doc, f"ความเข้าใจคลาดเคลื่อน: {m['wrong']}", size=13.5)
            add_bullet(doc, f"แนวคิดที่ถูกต้อง: {m['correct']}", size=13.5)

    # ── 5. สาระการเรียนรู้
    add_heading(doc, "5. สาระการเรียนรู้ (เนื้อหา)", level=1)
    if data.get("refr_cards"):
        for c in data["refr_cards"]:
            add_para(doc, c["title"], size=14, bold=True, color=(0x2d,0x3d,0x5a))
            add_bullet(doc, c["sub"], size=14)
            if c["note"]: add_bullet(doc, c["note"], size=13.5)
    if data.get("formulas"):
        add_para(doc, "สมการสำคัญ:", size=14, bold=True, space_before=6)
        for f in data["formulas"]:
            line = f"[{f['tag']}]  {f['formula']}"
            if f["note"]: line += f"   ({f['note']})"
            add_bullet(doc, line, size=14)

    # ── 6. กระบวนการจัดการเรียนรู้
    add_heading(doc, "6. กระบวนการจัดการเรียนรู้ (5E + POE)", level=1)
    add_para(doc, "ออกแบบตามรูปแบบ 5E Inquiry-Based Learning ของ BSCS เสริมด้วย POE Cycle "
                  "(Predict — Observe — Explain) ของ White & Gunstone (1992) "
                  "รวม 11 ขั้นย่อย ใช้เวลาตามรายละเอียดของแต่ละขั้น",
             size=14, space_after=6)
    for ph in data["phases"]:
        # หัวขั้น
        head = f"ขั้น {ph['code']} — {ph['name']}"
        if ph.get("time"): head += f" ({ph['time']})"
        add_heading(doc, head, level=2)
        # บรรยายเชื่อม วPA
        narr = phase_narrative(ph["code"], ph["name"])
        add_para(doc, narr, size=14, space_after=4, indent_left=0.2)
        # badges → จุดประสงค์/misc/วPA
        labels = []
        if ph.get("obj"): labels.append("จุดประสงค์: " + ", ".join(ph["obj"]))
        if ph.get("misc"): labels.append("Misconception: " + ", ".join(ph["misc"]))
        if ph.get("vpa"): labels.append("วPA: " + ", ".join(ph["vpa"]))
        if ph.get("poe"): labels.append(ph["poe"])
        if ph.get("activity"): labels.append(ph["activity"])
        for lab in labels:
            add_bullet(doc, lab, size=12.5, indent=1.0)
        # รายละเอียดกิจกรรม
        if ph.get("activities"):
            add_para(doc, "กิจกรรมตามลำดับ:", size=13.5, bold=True,
                     space_before=4, indent_left=0.2)
            for i, act in enumerate(ph["activities"], 1):
                add_numbered(doc, i, act, size=13.5, indent=0.8)

    # ── 7. สื่อ
    add_heading(doc, "7. สื่อ อุปกรณ์ และแหล่งการเรียนรู้", level=1)
    if data.get("sim"):
        add_para(doc, f"Simulation: {data['sim']['title']}", size=14, bold=True)
        add_para(doc, f"URL: {data['sim']['url']}", size=12, color=(0x33,0x33,0x88))
        if data['sim'].get("badges"):
            add_para(doc, "โหมดที่ใช้: " + " · ".join(data["sim"]["badges"]), size=13)
    for i, tool in enumerate(data.get("tools", []), 1):
        add_numbered(doc, i, tool, size=13.5)

    # ── 8. การวัดและประเมินผล
    add_heading(doc, "8. การวัดและประเมินผล", level=1)
    add_para(doc, "ใช้ทั้ง Formative Assessment (TL-card, Four-tier Pre/Post, POE rubric, "
                  "MJ journal) และ Summative Assessment (ใบงาน Calc + Spot the Error) "
                  "เพื่อตอบโจทย์ทั้งการเปลี่ยนแปลงเชิงมโนทัศน์ ทักษะกระบวนการ และเจตคติ",
             size=14, space_after=6)
    if data.get("assess"):
        add_table(doc,
            headers=["ด้าน / วัตถุประสงค์", "ตัวแปรที่วัด", "เครื่องมือ", "เกณฑ์ผ่าน"],
            rows=data["assess"],
            col_widths=[3.5, 4.5, 4.5, 3.5])
    if data.get("rubric"):
        add_para(doc, "เกณฑ์ POE Rubric (0–3):", size=14, bold=True, space_before=8)
        for r in data["rubric"]:
            add_bullet(doc, f"คะแนน {r['score']} — {r['desc']}", size=13.5)

    # ── 9. การเชื่อมโยงกับ วPA ด้านที่ 1
    add_heading(doc, "9. การเชื่อมโยงกับ วPA ด้านที่ 1 — ทักษะการจัดการเรียนรู้และการจัดการชั้นเรียน (8 ตัวชี้วัด)", level=1)
    add_para(doc, "ทุกตัวชี้วัดของ วPA ด้านที่ 1 มีหลักฐานปรากฏในแผนนี้ ดังตารางต่อไปนี้ "
                  "หลักฐานเหล่านี้สามารถนำไปประกอบรายงานการประเมินวิทยฐานะเชี่ยวชาญได้",
             size=14, space_after=6)
    if data.get("vpa"):
        rows = []
        for v in data["vpa"]:
            if len(v) >= 4:
                rows.append([v[0], v[1], v[2], v[3]])
            elif len(v) >= 3:
                rows.append([v[0], v[1], v[2], "—"])
        add_table(doc,
            headers=["#", "ตัวชี้วัด วPA ด้านที่ 1", "หลักฐาน/กิจกรรม", "ขั้นของแผน"],
            rows=rows,
            col_widths=[1.0, 5.5, 6.0, 3.5])

    # ── 10. บันทึกหลังการสอน
    add_heading(doc, "10. บันทึกหลังการสอน (สำหรับครูผู้สอน)", level=1)
    for label in ["10.1 ผลที่เกิดกับผู้เรียน — ด้านความรู้ (K)",
                  "10.2 ผลที่เกิดกับผู้เรียน — ด้านทักษะกระบวนการ (P)",
                  "10.3 ผลที่เกิดกับผู้เรียน — ด้านเจตคติ (A)",
                  "10.4 ปัญหา/อุปสรรค ระหว่างการสอน",
                  "10.5 แนวทางปรับปรุง/พัฒนา ในการสอนครั้งต่อไป",
                  "10.6 ข้อเสนอแนะของผู้บริหาร/ผู้นิเทศ"]:
        add_para(doc, label, size=14, bold=True, space_before=6)
        # blank lines for teacher to write
        for _ in range(3):
            add_para(doc, "................................................................"
                          "..............................................................",
                     size=13, color=(0x99,0x99,0x99))

    # ── ลงนาม
    add_para(doc, "", size=14, space_before=10)
    add_para(doc, "ลงชื่อ ……………………………………………… ผู้สอน",
             size=14, align=WD_ALIGN_PARAGRAPH.RIGHT, space_before=14)
    add_para(doc, "(นายโกเมน ปาปะโถ)",
             size=13, align=WD_ALIGN_PARAGRAPH.RIGHT)
    add_para(doc, "ลงชื่อ ……………………………………………… ผู้นิเทศ",
             size=14, align=WD_ALIGN_PARAGRAPH.RIGHT, space_before=10)
    add_para(doc, "(...........................................................)",
             size=13, align=WD_ALIGN_PARAGRAPH.RIGHT)

    doc.save(str(out_path))
    return out_path

# ──────────────────────────────────────────────────────────────────
def find_infographic(unit_key, plan_num):
    unit_dir = BASE / unit_key
    # try multiple naming patterns
    for pdir in sorted(unit_dir.iterdir()):
        if not pdir.is_dir(): continue
        name = pdir.name
        if name.startswith(f"แผน{plan_num:02d}") or name.startswith(f"แผน{plan_num}"):
            # find html
            for f in pdir.glob("*Infographic*.html"):
                return f
            for f in pdir.glob("*infographic*.html"):
                return f
    return None

def main():
    OUTDIR.mkdir(exist_ok=True)
    log = []
    summary = []
    for unit in UNITS:
        key, _, _, _, _, n = unit
        for i in range(1, n+1):
            html = find_infographic(key, i)
            if not html:
                summary.append(f"  ❌ {key} แผน{i}: ไม่พบ infographic")
                continue
            outname = f"{key}_แผน{i:02d}_{html.parent.name.split('_',1)[-1]}.docx"
            outpath = OUTDIR / outname
            try:
                build_docx(unit, html, outpath)
                summary.append(f"  ✅ {outname}")
            except Exception as e:
                summary.append(f"  ❌ {key} แผน{i}: {e}")
                import traceback; traceback.print_exc()
    print("\n".join(summary))
    print(f"\nรวม {len([s for s in summary if s.startswith('  ✅')])} ไฟล์ใน {OUTDIR}")

if __name__ == "__main__":
    main()
