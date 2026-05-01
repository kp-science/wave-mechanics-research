/* ===== CONFIDENCE GATE · บังคับสะท้อนความมั่นใจ + 1 ข้อสงสัย ก่อนกด next =====
 * ใส่ก่อนทุกปุ่ม "ไปต่อ" · ลด click-through · KPA: A1 + A3 + วPA ด้าน 3
 */
(function(global){
  if (!document.getElementById('confGateStyle')){
    const s = document.createElement('style'); s.id='confGateStyle';
    s.textContent = `
      .cg-card { padding:22px; border-radius:18px; margin:16px 0;
        background:linear-gradient(180deg,rgba(185,128,255,0.14),rgba(14,8,22,0.85));
        border:2.5px solid #b980ff; box-shadow:0 0 22px rgba(185,128,255,0.22); }
      .cg-card .cg-tag { display:inline-block; padding:6px 14px; border-radius:8px;
        background:#b980ff; color:#1a0a2a; font-family:Orbitron,monospace; font-size:12px;
        letter-spacing:.18em; font-weight:800; margin-bottom:14px; }
      .cg-card h3 { font-size:20px; line-height:1.45; color:#e8d8ff; margin:6px 0 10px; }
      .cg-card .cg-row { margin:14px 0; }
      .cg-card .cg-row > b { display:block; font-size:16px; color:#fff; margin-bottom:10px; }
      .cg-card .cg-scale { display:flex; gap:8px; flex-wrap:wrap; }
      .cg-card .cg-num { flex:1 1 60px; min-height:54px; padding:10px;
        border-radius:10px; background:rgba(20,20,40,0.7); border:1.5px solid rgba(185,128,255,0.4);
        color:#e8d8ff; cursor:pointer; font-size:20px; font-weight:700; text-align:center;
        display:flex; flex-direction:column; align-items:center; justify-content:center; }
      .cg-card .cg-num small { font-size:11px; color:#b980ff; font-weight:500; margin-top:2px; }
      .cg-card .cg-num.on { background:#b980ff; color:#1a0a2a; border-color:#b980ff;
        box-shadow:0 0 14px rgba(185,128,255,0.5); }
      .cg-card .cg-num.on small { color:#3a1a5a; }
      .cg-card .cg-doubts { display:flex; flex-wrap:wrap; gap:8px; }
      .cg-card .cg-doubt { padding:11px 16px; border-radius:999px;
        background:rgba(20,20,40,0.7); border:1.5px solid rgba(255,138,61,0.4);
        color:#ffd8b8; cursor:pointer; font-size:15px; min-height:44px; user-select:none; }
      .cg-card .cg-doubt:hover { border-color:#ff8a3d; }
      .cg-card .cg-doubt.on { background:#ff8a3d; color:#2a1000; border-color:#ff8a3d;
        font-weight:700; }
      .cg-card .cg-confirm { width:100%; padding:16px; margin-top:14px;
        background:#1a1028; color:#5a4070; border:2px solid #2a2040;
        border-radius:12px; font-family:Orbitron,monospace; font-size:14px;
        letter-spacing:.16em; cursor:not-allowed; min-height:56px; }
      .cg-card .cg-confirm.ready { background:linear-gradient(180deg,#b980ff,#7d40d8);
        color:#fff; border-color:#b980ff; cursor:pointer; box-shadow:0 0 22px rgba(185,128,255,0.4); }
      .cg-card.done .cg-confirm { display:none; }
      .cg-card.done .cg-row { opacity:.5; pointer-events:none; }
    `;
    document.head.appendChild(s);
  }

  const ConfidenceGate = {
    /**
     * @param {HTMLElement} el
     * @param {object} opts { pageId, doubts:[string], onConfirm:fn({conf, doubt}) }
     */
    mount(el, opts){
      const pageId = opts.pageId || (document.body.dataset.page || 'page');
      const doubts = opts.doubts || [
        'ทำไมถึงเป็นแบบนั้น',
        'มีกรณียกเว้นไหม',
        'เกี่ยวกับชีวิตจริงยังไง',
        'ถ้าเปลี่ยนเงื่อนไข ผลจะต่างไหม',
        'ครูถามมากกว่านี้ ฉันจะตอบได้ไหม'
      ];
      const labels = ['งง','พอเข้าใจ','โอเค','มั่นใจ','สอนเพื่อนได้'];
      const numsHtml = [1,2,3,4,5].map(n =>
        `<button class="cg-num" data-n="${n}">${n}<small>${labels[n-1]}</small></button>`).join('');
      const doubtsHtml = doubts.map((d,i) =>
        `<button class="cg-doubt" data-i="${i}">${d}</button>`).join('');
      el.innerHTML = `
        <div class="cg-card" id="cgRoot">
          <span class="cg-tag">🪞 SELF-CHECK · ก่อนไปต่อ</span>
          <h3>หยุดสะท้อนกับตัวเอง 30 วินาที</h3>
          <div class="cg-row">
            <b>1. ตอนนี้คุณเข้าใจขนาดไหน? (1-5)</b>
            <div class="cg-scale" id="cgScale">${numsHtml}</div>
          </div>
          <div class="cg-row">
            <b>2. มีคำถามใดที่ <em>ยังค้างใจ</em>? (เลือก 1)</b>
            <div class="cg-doubts" id="cgDoubts">${doubtsHtml}</div>
          </div>
          <button class="cg-confirm" id="cgBtn" disabled>🔒 เลือก confidence + 1 คำถาม ก่อน</button>
        </div>`;
      const root = el.querySelector('#cgRoot');
      const btn = el.querySelector('#cgBtn');
      let conf = 0, doubt = -1;
      el.querySelectorAll('.cg-num').forEach(n => {
        n.onclick = () => {
          if (root.classList.contains('done')) return;
          el.querySelectorAll('.cg-num').forEach(x => x.classList.remove('on'));
          n.classList.add('on'); conf = +n.dataset.n; check();
        };
      });
      el.querySelectorAll('.cg-doubt').forEach(d => {
        d.onclick = () => {
          if (root.classList.contains('done')) return;
          el.querySelectorAll('.cg-doubt').forEach(x => x.classList.remove('on'));
          d.classList.add('on'); doubt = +d.dataset.i; check();
        };
      });
      function check(){
        if (conf > 0 && doubt >= 0){
          btn.disabled = false; btn.classList.add('ready');
          btn.textContent = '✓ บันทึก · ไปต่อ →';
        }
      }
      btn.onclick = () => {
        if (btn.disabled) return;
        const doubtText = doubts[doubt];
        if (global.KPA){
          global.KPA.log('A1', 'confidence', { page: pageId, value: conf, total: 5 });
          global.KPA.log('A3', 'doubt', { page: pageId, value: doubtText });
          global.KPA.vpa(3, { page: pageId, kind:'self-check', summary:`conf=${conf} · ${doubtText}` });
        }
        const k = 'cosmosLog_' + ((global.EP_CONFIG && global.EP_CONFIG.id) || 'ep06') + '_conf_' + pageId;
        localStorage.setItem(k, JSON.stringify({conf, doubt: doubtText}));
        root.classList.add('done');
        if (typeof opts.onConfirm === 'function') opts.onConfirm({conf, doubt: doubtText});
      };
    }
  };
  global.ConfidenceGate = ConfidenceGate;
})(window);
