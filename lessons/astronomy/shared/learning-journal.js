/* ===== LEARNING JOURNAL · 3-2-1 chips ลงสมุด · ปิด scene =====
 * 3 สิ่งที่เรียน · 2 สิ่งที่ใช้ในชีวิต · 1 คำถามที่อยากถาม
 * KPA: A3 (เห็นคุณค่า) + วPA ด้าน 3 (พัฒนาตนเอง)
 */
(function(global){
  if (!document.getElementById('journalStyle')){
    const s = document.createElement('style'); s.id='journalStyle';
    s.textContent = `
      .lj-card { padding:24px 22px; border-radius:18px; margin:18px 0;
        background:linear-gradient(180deg,rgba(255,138,61,0.14),rgba(20,12,4,0.85));
        border:2.5px solid #ff8a3d; box-shadow:0 0 24px rgba(255,138,61,0.22); }
      .lj-card .lj-tag { display:inline-block; padding:6px 14px; border-radius:8px;
        background:#ff8a3d; color:#2a1000; font-family:Orbitron,monospace; font-size:12px;
        letter-spacing:.18em; font-weight:800; margin-bottom:14px; }
      .lj-card h3 { font-size:22px; line-height:1.45; color:#ffe0c0; margin:6px 0 14px; }
      .lj-card .lj-section { margin:14px 0; padding:14px 16px; border-radius:12px;
        background:rgba(0,0,0,0.4); border-left:4px solid #ff8a3d; }
      .lj-card .lj-section b { display:block; font-size:17px; color:#fff; margin-bottom:10px; }
      .lj-card .lj-chips { display:flex; flex-wrap:wrap; gap:8px; }
      .lj-card .lj-chip { padding:11px 16px; border-radius:999px;
        background:rgba(20,20,28,0.7); border:1.5px solid rgba(255,138,61,0.4);
        color:#ffe0c0; cursor:pointer; font-size:15px; min-height:44px; user-select:none; }
      .lj-card .lj-chip:hover { border-color:#ff8a3d; }
      .lj-card .lj-chip.on { background:#ff8a3d; color:#2a1000; border-color:#ff8a3d;
        font-weight:700; box-shadow:0 0 12px rgba(255,138,61,0.5); }
      .lj-card .lj-target { font-size:13px; color:#ffcb6b; margin-bottom:8px; font-weight:600; }
      .lj-card .lj-confirm { width:100%; padding:16px; margin-top:14px;
        background:#28180a; color:#7a5a3a; border:2px solid #3a2810;
        border-radius:12px; font-family:Orbitron,monospace; font-size:14px;
        letter-spacing:.16em; cursor:not-allowed; min-height:56px; }
      .lj-card .lj-confirm.ready { background:linear-gradient(180deg,#ff8a3d,#cc5520);
        color:#fff; border-color:#ff8a3d; cursor:pointer; box-shadow:0 0 22px rgba(255,138,61,0.4); }
      .lj-card.done .lj-confirm { display:none; }
      .lj-card .lj-done-banner { display:none; padding:14px; margin-top:12px;
        background:rgba(255,138,61,0.18); border:1px solid #ff8a3d; border-radius:10px;
        color:#fff; font-size:15px; line-height:1.7; }
      .lj-card.done .lj-done-banner { display:block; }
    `;
    document.head.appendChild(s);
  }

  const Journal = {
    /**
     * @param {HTMLElement} el
     * @param {object} opts {
     *   pageId, sceneTitle,
     *   learnedChips:[string],   // pick 3
     *   useChips:[string],       // pick 2
     *   askChips:[string],       // pick 1
     *   onConfirm:fn({learned:[],use:[],ask:string})
     * }
     */
    mount(el, opts){
      const pageId = opts.pageId || (document.body.dataset.page || 'page');
      const learned = opts.learnedChips || [];
      const use = opts.useChips || [];
      const ask = opts.askChips || [];
      el.innerHTML = `
        <div class="lj-card" id="ljRoot">
          <span class="lj-tag">📔 LEARNING JOURNAL · 3 · 2 · 1</span>
          <h3>${opts.sceneTitle || 'ปิดฉาก · จดลงสมุด'}</h3>

          <div class="lj-section">
            <b>3 · สิ่งที่ฉันได้เรียนรู้</b>
            <div class="lj-target" id="ljL-num">เลือก 3 ข้อ (0/3)</div>
            <div class="lj-chips" id="ljL">
              ${learned.map((c,i) => `<button class="lj-chip" data-cat="L" data-i="${i}">${c}</button>`).join('')}
            </div>
          </div>

          <div class="lj-section">
            <b>2 · สิ่งที่จะใช้ในชีวิตจริง / ห้องเรียน</b>
            <div class="lj-target" id="ljU-num">เลือก 2 ข้อ (0/2)</div>
            <div class="lj-chips" id="ljU">
              ${use.map((c,i) => `<button class="lj-chip" data-cat="U" data-i="${i}">${c}</button>`).join('')}
            </div>
          </div>

          <div class="lj-section">
            <b>1 · คำถามที่ฉันอยากรู้ต่อ</b>
            <div class="lj-target" id="ljA-num">เลือก 1 ข้อ (0/1)</div>
            <div class="lj-chips" id="ljA">
              ${ask.map((c,i) => `<button class="lj-chip" data-cat="A" data-i="${i}">${c}</button>`).join('')}
            </div>
          </div>

          <button class="lj-confirm" id="ljBtn" disabled>🔒 เลือกครบ 3+2+1 ก่อน</button>
          <div class="lj-done-banner" id="ljDone"></div>
        </div>`;
      const root = el.querySelector('#ljRoot');
      const btn = el.querySelector('#ljBtn');
      const sets = { L:new Set(), U:new Set(), A:new Set() };
      const max = { L:3, U:2, A:1 };
      const labels = { L:'ljL-num', U:'ljU-num', A:'ljA-num' };
      const labelText = { L:'เลือก 3 ข้อ', U:'เลือก 2 ข้อ', A:'เลือก 1 ข้อ' };

      el.querySelectorAll('.lj-chip').forEach(c => {
        c.onclick = () => {
          if (root.classList.contains('done')) return;
          const cat = c.dataset.cat, i = +c.dataset.i;
          const set = sets[cat];
          if (c.classList.contains('on')) {
            c.classList.remove('on'); set.delete(i);
          } else {
            if (set.size >= max[cat]) return;
            c.classList.add('on'); set.add(i);
          }
          el.querySelector('#'+labels[cat]).textContent = labelText[cat] + ' ('+set.size+'/'+max[cat]+')';
          check();
        };
      });
      function check(){
        if (sets.L.size === 3 && sets.U.size === 2 && sets.A.size === 1){
          btn.disabled = false; btn.classList.add('ready');
          btn.textContent = '✓ ส่งสมุดบันทึก';
        }
      }
      btn.onclick = () => {
        if (btn.disabled) return;
        const learnedPick = [...sets.L].map(i => learned[i]);
        const usePick = [...sets.U].map(i => use[i]);
        const askPick = ask[[...sets.A][0]];
        if (global.KPA){
          global.KPA.log('A3', 'journal', {
            page: pageId, value: { learned:learnedPick, use:usePick, ask:askPick }
          });
          global.KPA.vpa(3, { page: pageId, kind:'journal-321',
            summary: '3:'+learnedPick.join(',') + ' | 2:'+usePick.join(',') + ' | 1:'+askPick });
        }
        const k = 'cosmosLog_' + ((global.EP_CONFIG && global.EP_CONFIG.id) || 'ep06') + '_journal_' + pageId;
        localStorage.setItem(k, JSON.stringify({learned:learnedPick, use:usePick, ask:askPick}));
        root.classList.add('done');
        el.querySelector('#ljDone').innerHTML =
          '<b>3 ที่เรียน:</b> ' + learnedPick.join(' · ') + '<br>' +
          '<b>2 ที่ใช้:</b> ' + usePick.join(' · ') + '<br>' +
          '<b>1 ที่อยากรู้ต่อ:</b> ' + askPick;
        if (global.SFX) global.SFX.play && global.SFX.play('correct');
        if (typeof opts.onConfirm === 'function') opts.onConfirm({learned:learnedPick, use:usePick, ask:askPick});
      };
    }
  };
  global.Journal = Journal;
})(window);
