/* ===== PAUSE & PREDICT card · บังคับหยุดคิดก่อน activity =====
 * ใช้ก่อนกิจกรรม · timer 30s ห้ามกดต่อ · ให้นักเรียนทำนาย + พูดในกลุ่ม
 * KPA log: A2 (curiosity) + P1 (predict)
 */
(function(global){
  if (!document.getElementById('pauseCardStyle')) {
    const s = document.createElement('style'); s.id = 'pauseCardStyle';
    s.textContent = `
      .pause-card { padding:24px 22px; border-radius:18px; margin:18px 0;
        background:linear-gradient(180deg,rgba(255,203,107,0.16),rgba(20,16,8,0.85));
        border:2.5px solid #ffcb6b; box-shadow:0 0 24px rgba(255,203,107,0.25);
        position:relative; }
      .pause-card .pc-tag { display:inline-block; padding:6px 14px; border-radius:8px;
        background:#ffcb6b; color:#2a1a00; font-family:Orbitron,monospace; font-size:12px;
        letter-spacing:.18em; font-weight:800; margin-bottom:14px; }
      .pause-card h3 { font-size:22px; line-height:1.45; color:#fff8d8;
        margin:6px 0 10px; font-weight:700; }
      .pause-card .pc-prompt { font-size:18px; line-height:1.7; color:#ffe8b0;
        background:rgba(0,0,0,0.4); padding:14px 16px; border-radius:10px;
        border-left:4px solid #ffcb6b; margin:10px 0 14px; }
      .pause-card .pc-group-cue { display:flex; align-items:center; gap:10px;
        padding:10px 14px; border-radius:10px; background:rgba(126,255,178,0.10);
        border:1px dashed #7effb2; font-size:15px; color:#c8ffe0; margin-bottom:14px; }
      .pause-card .pc-group-cue .icon { font-size:22px; }
      .pause-card .pc-chips { display:flex; flex-wrap:wrap; gap:8px; margin:12px 0; }
      .pause-card .pc-chip { padding:11px 16px; border-radius:999px;
        background:rgba(20,20,28,0.7); border:1.5px solid rgba(255,203,107,0.4);
        color:#ffe8b0; cursor:pointer; font-size:15px; min-height:44px;
        transition:all .15s; user-select:none; }
      .pause-card .pc-chip:hover { border-color:#ffcb6b; background:rgba(255,203,107,0.10); }
      .pause-card .pc-chip.on { background:#ffcb6b; color:#2a1a00; border-color:#ffcb6b;
        box-shadow:0 0 14px rgba(255,203,107,0.5); font-weight:700; }
      .pause-card .pc-timer { display:flex; align-items:center; gap:12px; margin-top:14px;
        padding:12px 16px; border-radius:10px; background:rgba(0,0,0,0.5); }
      .pause-card .pc-timer-bar { flex:1; height:10px; border-radius:5px;
        background:rgba(255,255,255,0.1); overflow:hidden; }
      .pause-card .pc-timer-fill { height:100%; background:linear-gradient(90deg,#ff5c7a,#ffcb6b,#7effb2);
        width:0%; transition:width .5s linear; }
      .pause-card .pc-timer-num { font-family:Orbitron,monospace; font-size:18px;
        font-weight:700; color:#ffcb6b; min-width:40px; text-align:right; }
      .pause-card .pc-confirm { width:100%; padding:16px; margin-top:14px;
        background:#3a2810; color:#8a7050; border:2px solid #5a4830;
        border-radius:12px; font-family:Orbitron,monospace; font-size:14px;
        letter-spacing:.16em; cursor:not-allowed; min-height:56px; }
      .pause-card .pc-confirm.ready { background:linear-gradient(180deg,#ffcb6b,#ff8a3d);
        color:#2a1a00; border-color:#ffcb6b; cursor:pointer;
        box-shadow:0 0 22px rgba(255,138,61,0.4); animation:pcPulse 1.4s infinite; }
      @keyframes pcPulse { 0%,100%{box-shadow:0 0 22px rgba(255,138,61,0.4);} 50%{box-shadow:0 0 36px rgba(255,138,61,0.7);} }
      .pause-card.done { opacity:0.7; }
      .pause-card.done .pc-confirm { display:none; }
      .pause-card .pc-done-banner { display:none; padding:12px; margin-top:10px;
        background:rgba(126,255,178,0.15); border:1px solid #7effb2; border-radius:10px;
        color:#c8ffe0; font-size:15px; }
      .pause-card.done .pc-done-banner { display:block; }
      @media(max-width:560px){
        .pause-card h3 { font-size:19px; }
        .pause-card .pc-prompt { font-size:16px; }
      }
    `;
    document.head.appendChild(s);
  }

  const PauseCard = {
    /**
     * @param {HTMLElement} el  container to mount into
     * @param {object} opts {
     *   pageId, question, chips:[string], minSeconds:30,
     *   groupCue:string · default "ปรึกษากลุ่ม 30 วิ ก่อนเลือก",
     *   onConfirm: fn(selected:[]),
     *   indicator: 'A2' | 'P1' · for KPA log
     * }
     */
    mount(el, opts){
      const pageId = opts.pageId || (document.body.dataset.page || 'page');
      const minSec = opts.minSeconds || 30;
      const indicator = opts.indicator || 'A2';
      const groupCue = opts.groupCue || `🗣️ พูดคำตอบกับเพื่อนในกลุ่ม ${minSec} วินาทีก่อน · แล้วค่อยเลือก`;
      const chipsHtml = (opts.chips || []).map((c,i) =>
        `<button class="pc-chip" data-i="${i}">${c}</button>`).join('');
      el.innerHTML = `
        <div class="pause-card" id="pcRoot">
          <span class="pc-tag">⏸️ หยุด · คิด · ทำนาย</span>
          <h3>${opts.question}</h3>
          <div class="pc-group-cue"><span class="icon">🗣️</span><span>${groupCue}</span></div>
          <div class="pc-prompt"><b>ทำนายก่อน:</b> เลือกได้มากกว่า 1 ข้อ · ไม่มีถูก/ผิดในตอนนี้ · เราจะกลับมาเช็คหลัง activity</div>
          <div class="pc-chips" id="pcChips">${chipsHtml}</div>
          <div class="pc-timer">
            <span style="font-size:18px;">⏱️</span>
            <div class="pc-timer-bar"><div class="pc-timer-fill" id="pcFill"></div></div>
            <div class="pc-timer-num" id="pcNum">${minSec}</div>
          </div>
          <button class="pc-confirm" id="pcBtn" disabled>🔒 รอครบ ${minSec} วินาที + เลือกอย่างน้อย 1 ข้อ</button>
          <div class="pc-done-banner">✓ บันทึก prediction แล้ว · ไปทำกิจกรรมต่อได้</div>
        </div>`;
      const root = el.querySelector('#pcRoot');
      const chipsEl = el.querySelector('#pcChips');
      const fill = el.querySelector('#pcFill');
      const num = el.querySelector('#pcNum');
      const btn = el.querySelector('#pcBtn');
      const selected = new Set();
      let timeUp = false;

      chipsEl.querySelectorAll('.pc-chip').forEach(c => {
        c.onclick = () => {
          if (root.classList.contains('done')) return;
          c.classList.toggle('on');
          if (c.classList.contains('on')) selected.add(+c.dataset.i);
          else selected.delete(+c.dataset.i);
          checkReady();
        };
      });

      const startTs = Date.now();
      const tick = () => {
        const elapsed = (Date.now() - startTs)/1000;
        const remain = Math.max(0, minSec - elapsed);
        num.textContent = Math.ceil(remain);
        fill.style.width = Math.min(100, (elapsed/minSec)*100) + '%';
        if (remain <= 0){ timeUp = true; checkReady(); return; }
        requestAnimationFrame(tick);
      };
      tick();

      function checkReady(){
        if (timeUp && selected.size > 0){
          btn.disabled = false;
          btn.classList.add('ready');
          btn.textContent = '✓ บันทึก prediction · ไปต่อ →';
        } else if (timeUp){
          btn.textContent = '👉 เลือกอย่างน้อย 1 ข้อก่อน';
        }
      }

      btn.onclick = () => {
        if (btn.disabled) return;
        const picked = [...selected].map(i => opts.chips[i]);
        // KPA log
        if (global.KPA){
          global.KPA.log(indicator, 'pause-predict', {
            page: pageId, action:'predict',
            value: picked, total: opts.chips.length
          });
          global.KPA.vpa(2, { page: pageId, kind:'predict', summary: picked.join(' / ') });
        }
        // Persist prediction for later compare
        const k = 'cosmosLog_' + ((global.EP_CONFIG && global.EP_CONFIG.id) || 'ep06') + '_predict_' + pageId;
        localStorage.setItem(k, JSON.stringify(picked));
        root.classList.add('done');
        if (global.SFX) global.SFX.play && global.SFX.play('correct');
        if (typeof opts.onConfirm === 'function') opts.onConfirm(picked);
      };
    }
  };

  global.PauseCard = PauseCard;
})(window);
