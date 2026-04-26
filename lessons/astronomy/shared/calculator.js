/* ==================== COSMOS LOG · Calculator ==================== */
/* FAB-style scientific calc · auto-inject on any page that includes this script
 * Functions: + − × ÷ = · 1/x (parallax→d) · log10 (magnitude) · 10^x · π · ⌫ · AC
 * Usage: <script src="../shared/calculator.js"></script>
 * Toggle: click FAB · or press 'C' key
 */
(function (global) {
  'use strict';

  const Calc = {
    state: { display: '0', acc: null, pending: null, justComputed: false, history: [] },
    open: false,
    panel: null, fab: null,

    init() {
      // FAB button
      this.fab = document.createElement('button');
      this.fab.className = 'calc-fab';
      this.fab.innerHTML = '🧮';
      this.fab.title = 'เครื่องคิดเลข · กด C เพื่อเปิด-ปิด';
      this.fab.onclick = () => this.toggle();
      document.body.appendChild(this.fab);

      // Panel
      this.panel = document.createElement('div');
      this.panel.className = 'calc-panel';
      this.panel.innerHTML = this.template();
      document.body.appendChild(this.panel);

      // Wire button clicks (delegation)
      this.panel.addEventListener('click', (e) => {
        const close = e.target.closest('.calc-close');
        if (close) { this.toggle(); return; }
        const btn = e.target.closest('[data-key]');
        if (btn) this.press(btn.dataset.key);
      });

      // Keyboard shortcut · 'C' to toggle (avoid clash with text inputs)
      document.addEventListener('keydown', (e) => {
        const target = e.target;
        const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
        if (isInput) return;
        if (e.key === 'c' || e.key === 'C') { this.toggle(); }
        if (this.open) this.handleKey(e);
      });

      this.refresh();
    },

    template() {
      // 6 rows · 4 cols
      const keys = [
        ['AC',  '⌫',  '1/x', 'log'],
        ['7',   '8',   '9',   '÷'],
        ['4',   '5',   '6',   '×'],
        ['1',   '2',   '3',   '−'],
        ['0',   '.',   '=',   '+'],
        ['10^x','π',   '±',   'EXP'],
      ];
      const rows = keys.map(row =>
        '<div class="calc-row">' +
        row.map(k => '<button class="calc-btn ' + this.btnClass(k) + '" data-key="' + k + '">' + k + '</button>').join('') +
        '</div>'
      ).join('');
      return (
        '<div class="calc-head">' +
        '  <span>🧮 เครื่องคิดเลข</span>' +
        '  <button class="calc-close" title="ปิด (C)">✕</button>' +
        '</div>' +
        '<div class="calc-display" id="calcDisp">0</div>' +
        '<div class="calc-history" id="calcHist"></div>' +
        '<div class="calc-keys">' + rows + '</div>' +
        '<div class="calc-foot">💡 <b>1/x</b> · parallax → d (pc) &nbsp; <b>log</b> · magnitude</div>'
      );
    },

    btnClass(k) {
      if (['÷','×','−','+','='].includes(k)) return 'op';
      if (['AC','⌫','1/x','log','10^x','π','±','EXP'].includes(k)) return 'fn';
      return 'num';
    },

    toggle() {
      this.open = !this.open;
      this.panel.classList.toggle('open', this.open);
    },

    handleKey(e) {
      // Number/operator keyboard input when calc is open
      const k = e.key;
      if (/^[0-9]$/.test(k)) { this.press(k); e.preventDefault(); }
      else if (k === '.') { this.press('.'); e.preventDefault(); }
      else if (k === '+') { this.press('+'); e.preventDefault(); }
      else if (k === '-') { this.press('−'); e.preventDefault(); }
      else if (k === '*') { this.press('×'); e.preventDefault(); }
      else if (k === '/') { this.press('÷'); e.preventDefault(); }
      else if (k === 'Enter' || k === '=') { this.press('='); e.preventDefault(); }
      else if (k === 'Backspace') { this.press('⌫'); e.preventDefault(); }
      else if (k === 'Escape') { this.press('AC'); e.preventDefault(); }
    },

    press(k) {
      const s = this.state;
      // Reset Error state on any input
      if (s.display === 'Error' && k !== 'AC') s.display = '0';

      if (k === 'AC') {
        this.state = { display:'0', acc:null, pending:null, justComputed:false, history:[] };
      }
      else if (k === '⌫') {
        s.display = s.display.length > 1 ? s.display.slice(0, -1) : '0';
        if (s.display === '-') s.display = '0';
      }
      else if (/^[0-9]$/.test(k)) {
        if (s.display === '0' || s.justComputed) s.display = k;
        else s.display += k;
        s.justComputed = false;
      }
      else if (k === '.') {
        if (s.justComputed) { s.display = '0.'; s.justComputed = false; }
        else if (!s.display.includes('.')) s.display += '.';
      }
      else if (k === '±') {
        if (s.display !== '0') {
          s.display = s.display.startsWith('-') ? s.display.slice(1) : ('-' + s.display);
        }
      }
      else if (['÷','×','−','+'].includes(k)) {
        this.applyPending(false);
        s.acc = parseFloat(s.display);
        s.pending = k;
        s.justComputed = true;
      }
      else if (k === '=') {
        this.applyPending(true);
        s.pending = null;
        s.justComputed = true;
      }
      else if (k === '1/x') {
        const v = parseFloat(s.display);
        if (v === 0) { s.display = 'Error'; }
        else {
          const r = 1 / v;
          s.history.push('1/' + this.fmt(v) + ' = ' + this.fmt(r));
          s.display = String(r);
        }
        s.justComputed = true;
      }
      else if (k === 'log') {
        const v = parseFloat(s.display);
        if (v <= 0) s.display = 'Error';
        else {
          const r = Math.log10(v);
          s.history.push('log(' + this.fmt(v) + ') = ' + this.fmt(r));
          s.display = String(r);
        }
        s.justComputed = true;
      }
      else if (k === '10^x') {
        const v = parseFloat(s.display);
        const r = Math.pow(10, v);
        s.history.push('10^' + this.fmt(v) + ' = ' + this.fmt(r));
        s.display = String(r);
        s.justComputed = true;
      }
      else if (k === 'π') {
        s.display = String(Math.PI);
        s.justComputed = true;
      }
      else if (k === 'EXP') {
        // Quick × 10^? · append "e" if not present
        if (!s.display.includes('e')) {
          s.display = s.display + 'e';
        }
      }
      this.refresh();
    },

    applyPending(commit) {
      const s = this.state;
      if (s.pending == null || s.acc == null) return;
      const a = s.acc, b = parseFloat(s.display);
      if (isNaN(b)) return;
      let r;
      switch (s.pending) {
        case '+': r = a + b; break;
        case '−': r = a - b; break;
        case '×': r = a * b; break;
        case '÷': r = (b === 0) ? NaN : a / b; break;
      }
      if (commit) s.history.push(this.fmt(a) + ' ' + s.pending + ' ' + this.fmt(b) + ' = ' + (isNaN(r) ? 'Error' : this.fmt(r)));
      s.display = isNaN(r) ? 'Error' : String(r);
      s.acc = isNaN(r) ? null : r;
    },

    fmt(n) {
      if (typeof n !== 'number') n = parseFloat(n);
      if (isNaN(n)) return 'NaN';
      if (n === 0) return '0';
      const abs = Math.abs(n);
      if (abs >= 1e10 || abs < 1e-4) return n.toExponential(4);
      const s = String(n);
      if (s.length > 12) return n.toPrecision(8);
      return s;
    },

    refresh() {
      const dispEl = document.getElementById('calcDisp');
      const histEl = document.getElementById('calcHist');
      if (!dispEl) return;
      dispEl.textContent = this.fmt(this.state.display === 'Error' ? NaN : this.state.display) === 'NaN'
        ? this.state.display
        : (this.state.display === 'Error' ? 'Error' : this.fmt(parseFloat(this.state.display)));
      // Show pending op indicator
      if (this.state.pending) dispEl.title = 'pending: ' + this.fmt(this.state.acc) + ' ' + this.state.pending;
      // History · last 3
      histEl.innerHTML = this.state.history.slice(-3).map(x => '<div>' + x + '</div>').join('');
    },
  };

  // Inject CSS
  const css = `
    .calc-fab { position:fixed; bottom:22px; right:22px; width:56px; height:56px; border-radius:50%;
      background:linear-gradient(135deg, #ffcb6b, #ffd88a); border:none; color:#0a0420; font-size:26px;
      cursor:pointer; box-shadow:0 6px 24px rgba(255,203,107,0.5); z-index:9998; transition:transform .2s;
      display:flex; align-items:center; justify-content:center; padding:0; }
    .calc-fab:hover { transform:scale(1.08) rotate(-6deg); }
    .calc-fab:active { transform:scale(0.95); }
    .calc-panel { position:fixed; bottom:90px; right:22px; width:296px; background:#0d1126;
      border:2px solid #ffcb6b; border-radius:14px; padding:14px; z-index:9999; display:none;
      box-shadow:0 12px 48px rgba(0,0,0,0.8), 0 0 30px rgba(255,203,107,0.2);
      font-family:'Sarabun',sans-serif; color:#e8ecf8; }
    .calc-panel.open { display:block; animation:calcSlide .25s ease-out; }
    @keyframes calcSlide { from { transform:translateY(20px) scale(0.95); opacity:0; } }
    .calc-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;
      font-family:'Orbitron',sans-serif; font-size:12px; color:#ffcb6b; letter-spacing:0.12em; }
    .calc-close { background:none; border:1px solid #444; color:#9aa3c0; width:26px; height:26px;
      border-radius:6px; cursor:pointer; padding:0; font-size:14px; }
    .calc-close:hover { color:#ff5c7a; border-color:#ff5c7a; }
    .calc-display { padding:14px 12px; background:#000; color:#7effb2; font-family:monospace;
      font-size:24px; text-align:right; border-radius:8px; min-height:30px; word-break:break-all;
      border:1px solid #2a3050; }
    .calc-history { font-family:monospace; font-size:11px; color:#6a7394; padding:6px 4px;
      min-height:20px; max-height:54px; overflow:hidden; }
    .calc-history div { text-align:right; line-height:1.5; }
    .calc-keys { display:flex; flex-direction:column; gap:6px; margin-top:4px; }
    .calc-row { display:grid; grid-template-columns:repeat(4, 1fr); gap:6px; }
    .calc-btn { padding:11px 4px; border-radius:8px; font-family:'Sarabun',monospace; font-size:15px;
      font-weight:700; cursor:pointer; border:1px solid; transition:all .12s; }
    .calc-btn.num { background:rgba(100,216,255,0.08); color:#e8ecf8; border-color:rgba(120,140,220,0.3); }
    .calc-btn.op { background:rgba(255,203,107,0.15); color:#ffcb6b; border-color:#ffcb6b; }
    .calc-btn.fn { background:rgba(212,184,255,0.1); color:#d4b8ff; border-color:rgba(212,184,255,0.3); font-size:12px; }
    .calc-btn:hover:not(:disabled) { filter:brightness(1.25); transform:translateY(-1px); }
    .calc-btn:active { transform:translateY(0) scale(0.96); }
    .calc-foot { font-size:10px; color:#9aa3c0; margin-top:8px; text-align:center; line-height:1.6;
      padding:6px; background:rgba(212,184,255,0.06); border-radius:6px; }
    .calc-foot b { color:#d4b8ff; }
    @media(max-width:380px) { .calc-panel { width:calc(100vw - 44px); right:22px; } }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Calc.init());
  } else {
    Calc.init();
  }

  global.Calc = Calc;
})(window);
