/* ===== EXPLAIN BACK card · อธิบายให้เพื่อนฟังด้วยภาษาตัวเอง =====
 * tap-chips ของคำสำคัญ + บังคับใช้ครบทุกคำก่อนผ่าน
 * KPA log: K (relevant indicator) + P2 (สื่อสาร)
 */
(function(global){
  if (!document.getElementById('explainBackStyle')){
    const s = document.createElement('style'); s.id='explainBackStyle';
    s.textContent = `
      .eb-card { padding:24px 22px; border-radius:18px; margin:18px 0;
        background:linear-gradient(180deg,rgba(100,216,255,0.14),rgba(8,12,22,0.85));
        border:2.5px solid #64d8ff; box-shadow:0 0 24px rgba(100,216,255,0.22); }
      .eb-card .eb-tag { display:inline-block; padding:6px 14px; border-radius:8px;
        background:#64d8ff; color:#012433; font-family:Orbitron,monospace; font-size:12px;
        letter-spacing:.18em; font-weight:800; margin-bottom:14px; }
      .eb-card h3 { font-size:22px; line-height:1.45; color:#d8efff; margin:6px 0 10px; }
      .eb-card .eb-prompt { font-size:18px; line-height:1.7; color:#c8e8ff;
        background:rgba(0,0,0,0.4); padding:14px 16px; border-radius:10px;
        border-left:4px solid #64d8ff; margin:10px 0 14px; }
      .eb-card .eb-cue { padding:10px 14px; border-radius:10px;
        background:rgba(255,203,107,0.10); border:1px dashed #ffcb6b;
        color:#ffe8b0; font-size:15px; margin-bottom:14px; line-height:1.6; }
      .eb-card .eb-words { display:flex; flex-wrap:wrap; gap:8px; margin:12px 0; }
      .eb-card .eb-word { padding:11px 16px; border-radius:999px;
        background:rgba(20,20,28,0.7); border:1.5px solid rgba(100,216,255,0.4);
        color:#c8e8ff; cursor:pointer; font-size:15px; min-height:44px; user-select:none; }
      .eb-card .eb-word:hover { border-color:#64d8ff; }
      .eb-card .eb-word.on { background:#64d8ff; color:#012433; border-color:#64d8ff;
        box-shadow:0 0 14px rgba(100,216,255,0.5); font-weight:700; }
      .eb-card .eb-word.required { border-color:#ffcb6b; }
      .eb-card .eb-word.required.on { background:#ffcb6b; color:#2a1a00; }
      .eb-card .eb-progress { display:flex; align-items:center; gap:12px; margin-top:14px;
        padding:12px 16px; border-radius:10px; background:rgba(0,0,0,0.45); }
      .eb-card .eb-progress-bar { flex:1; height:10px; border-radius:5px;
        background:rgba(255,255,255,0.1); overflow:hidden; }
      .eb-card .eb-progress-fill { height:100%; background:linear-gradient(90deg,#ff5c7a,#ffcb6b,#7effb2);
        width:0%; transition:width .3s; }
      .eb-card .eb-progress-num { font-family:Orbitron,monospace; font-size:14px;
        color:#64d8ff; min-width:60px; text-align:right; }
      .eb-card .eb-confirm { width:100%; padding:16px; margin-top:14px;
        background:#1a2838; color:#5a7090; border:2px solid #2a3850;
        border-radius:12px; font-family:Orbitron,monospace; font-size:14px;
        letter-spacing:.16em; cursor:not-allowed; min-height:56px; }
      .eb-card .eb-confirm.ready { background:linear-gradient(180deg,#64d8ff,#3da8d8);
        color:#012433; border-color:#64d8ff; cursor:pointer;
        box-shadow:0 0 22px rgba(100,216,255,0.4); }
      .eb-card.done .eb-confirm { display:none; }
      .eb-card .eb-done-banner { display:none; padding:12px; margin-top:10px;
        background:rgba(100,216,255,0.18); border:1px solid #64d8ff; border-radius:10px;
        color:#fff; font-size:15px; line-height:1.6; }
      .eb-card.done .eb-done-banner { display:block; }
    `;
    document.head.appendChild(s);
  }

  const ExplainBack = {
    /**
     * @param {HTMLElement} el
     * @param {object} opts {
     *   pageId, prompt, words:[string], required:[string]  (subset of words),
     *   indicator:'K1'..'K6', onConfirm:fn(picked:[])
     * }
     */
    mount(el, opts){
      const pageId = opts.pageId || (document.body.dataset.page || 'page');
      const required = new Set(opts.required || []);
      const words = opts.words || [];
      const indicator = opts.indicator || 'K1';
      const reqCount = required.size;
      const wordsHtml = words.map((w,i) => {
        const req = required.has(w) ? ' required' : '';
        const star = required.has(w) ? ' ⭐' : '';
        return `<button class="eb-word${req}" data-w="${w}">${w}${star}</button>`;
      }).join('');
      el.innerHTML = `
        <div class="eb-card" id="ebRoot">
          <span class="eb-tag">📣 EXPLAIN BACK · อธิบายให้เพื่อนฟัง</span>
          <h3>${opts.prompt}</h3>
          <div class="eb-cue">🎯 พูดเป็นประโยคให้เพื่อนข้าง ๆ ฟัง · <b>ใช้ทุกคำที่มี ⭐</b> ในการอธิบาย · เพื่อนต้องเข้าใจ</div>
          <div class="eb-prompt">เลือก chip คำที่ <b>คุณใช้จริง</b> เวลาอธิบาย · ครบ ⭐ ทั้งหมดถึงผ่าน</div>
          <div class="eb-words">${wordsHtml}</div>
          <div class="eb-progress">
            <span style="font-size:18px;">⭐</span>
            <div class="eb-progress-bar"><div class="eb-progress-fill" id="ebFill"></div></div>
            <div class="eb-progress-num" id="ebNum">0/${reqCount}</div>
          </div>
          <button class="eb-confirm" id="ebBtn" disabled>🔒 ใช้คำ ⭐ ให้ครบก่อน</button>
          <div class="eb-done-banner" id="ebDone"></div>
        </div>`;
      const root = el.querySelector('#ebRoot');
      const fill = el.querySelector('#ebFill');
      const num = el.querySelector('#ebNum');
      const btn = el.querySelector('#ebBtn');
      const picked = new Set();
      const pickedReq = new Set();

      el.querySelectorAll('.eb-word').forEach(w => {
        w.onclick = () => {
          if (root.classList.contains('done')) return;
          w.classList.toggle('on');
          const word = w.dataset.w;
          if (w.classList.contains('on')) {
            picked.add(word);
            if (required.has(word)) pickedReq.add(word);
          } else {
            picked.delete(word);
            if (required.has(word)) pickedReq.delete(word);
          }
          const ratio = reqCount === 0 ? 1 : pickedReq.size/reqCount;
          fill.style.width = (ratio*100) + '%';
          num.textContent = pickedReq.size + '/' + reqCount;
          if (pickedReq.size >= reqCount){
            btn.disabled = false; btn.classList.add('ready');
            btn.textContent = '✓ พร้อม · ส่งคำอธิบาย';
          } else {
            btn.disabled = true; btn.classList.remove('ready');
            btn.textContent = '🔒 ใช้คำ ⭐ ให้ครบก่อน (' + pickedReq.size + '/' + reqCount + ')';
          }
        };
      });
      btn.onclick = () => {
        if (btn.disabled) return;
        if (global.KPA){
          global.KPA.log(indicator, 'explain-back', {
            page: pageId, value: [...picked], total: words.length, correct:true
          });
          global.KPA.log('P2', 'explain-comm', { page: pageId, value: [...picked] });
          global.KPA.vpa(2, { page: pageId, kind:'explain', summary: [...picked].join(', ') });
        }
        const k = 'cosmosLog_' + ((global.EP_CONFIG && global.EP_CONFIG.id) || 'ep06') + '_explain_' + pageId;
        localStorage.setItem(k, JSON.stringify([...picked]));
        root.classList.add('done');
        el.querySelector('#ebDone').innerHTML =
          '✓ บันทึกคำอธิบายแล้ว · คำที่ใช้: <b>' + [...picked].join(' · ') + '</b>';
        if (global.SFX) global.SFX.play && global.SFX.play('correct');
        if (typeof opts.onConfirm === 'function') opts.onConfirm([...picked]);
      };
    }
  };
  global.ExplainBack = ExplainBack;
})(window);
