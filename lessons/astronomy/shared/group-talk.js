/* ===== GROUP TALK card · ปรึกษากลุ่ม + timer + chime =====
 * ใส่ระหว่าง/หลัง activity · 60s default · ครู pace remote pause/extend ได้
 * KPA log: A1 (เหตุผล) + P2 (สื่อสาร) + วPA ด้าน 1
 */
(function(global){
  if (!document.getElementById('groupTalkStyle')) {
    const s = document.createElement('style'); s.id='groupTalkStyle';
    s.textContent = `
      .gt-card { padding:24px 22px; border-radius:18px; margin:18px 0;
        background:linear-gradient(180deg,rgba(126,255,178,0.14),rgba(8,18,12,0.85));
        border:2.5px solid #7effb2; box-shadow:0 0 24px rgba(126,255,178,0.22); }
      .gt-card .gt-tag { display:inline-block; padding:6px 14px; border-radius:8px;
        background:#7effb2; color:#012b16; font-family:Orbitron,monospace; font-size:12px;
        letter-spacing:.18em; font-weight:800; margin-bottom:14px; }
      .gt-card h3 { font-size:22px; line-height:1.45; color:#d8ffe8; margin:6px 0 10px; }
      .gt-card .gt-prompt { font-size:18px; line-height:1.7; color:#c8ffd8;
        background:rgba(0,0,0,0.4); padding:14px 16px; border-radius:10px;
        border-left:4px solid #7effb2; margin:10px 0 14px; }
      .gt-card .gt-roles { display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr));
        gap:10px; margin-bottom:14px; }
      .gt-card .gt-role { padding:12px; border-radius:10px; background:rgba(20,28,52,0.6);
        border:1px solid rgba(126,255,178,0.3); font-size:14px; line-height:1.55; }
      .gt-card .gt-role b { color:#7effb2; font-size:13px; letter-spacing:.1em; }
      .gt-card .gt-timer { display:flex; align-items:center; gap:14px; padding:14px 18px;
        border-radius:12px; background:rgba(0,0,0,0.5); margin:14px 0; }
      .gt-card .gt-timer-num { font-family:Orbitron,monospace; font-size:32px; font-weight:800;
        color:#7effb2; min-width:72px; text-align:center; }
      .gt-card .gt-timer-num.warn { color:#ffcb6b; }
      .gt-card .gt-timer-num.urgent { color:#ff5c7a; animation:gtBlink .5s infinite; }
      @keyframes gtBlink { 50%{opacity:.4;} }
      .gt-card .gt-timer-bar { flex:1; height:14px; border-radius:7px;
        background:rgba(255,255,255,0.1); overflow:hidden; }
      .gt-card .gt-timer-fill { height:100%; background:linear-gradient(90deg,#7effb2,#ffcb6b,#ff5c7a);
        width:100%; transition:width 1s linear; }
      .gt-card .gt-controls { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:14px; }
      .gt-card .gt-btn { padding:12px 20px; border-radius:10px; cursor:pointer;
        font-size:15px; font-weight:600; border:1.5px solid; min-height:48px; }
      .gt-card .gt-start { background:#7effb2; color:#012b16; border-color:#7effb2; }
      .gt-card .gt-pause { background:rgba(255,203,107,0.15); color:#ffcb6b; border-color:#ffcb6b; }
      .gt-card .gt-add { background:rgba(100,216,255,0.15); color:#64d8ff; border-color:#64d8ff; }
      .gt-card .gt-consensus { margin-top:14px; }
      .gt-card .gt-consensus h4 { font-size:16px; color:#fff; margin:0 0 10px; }
      .gt-card .gt-chips { display:flex; flex-wrap:wrap; gap:8px; }
      .gt-card .gt-chip { padding:11px 16px; border-radius:999px;
        background:rgba(20,20,28,0.7); border:1.5px solid rgba(126,255,178,0.4);
        color:#d8ffe8; cursor:pointer; font-size:15px; min-height:44px; user-select:none; }
      .gt-card .gt-chip:hover { border-color:#7effb2; }
      .gt-card .gt-chip.on { background:#7effb2; color:#012b16; border-color:#7effb2;
        box-shadow:0 0 14px rgba(126,255,178,0.5); font-weight:700; }
      .gt-card .gt-submit { width:100%; padding:16px; margin-top:14px;
        background:#3a2810; color:#8a7050; border:2px solid #5a4830;
        border-radius:12px; font-family:Orbitron,monospace; font-size:14px;
        letter-spacing:.16em; cursor:not-allowed; min-height:56px; }
      .gt-card .gt-submit.ready { background:linear-gradient(180deg,#7effb2,#3dd88a);
        color:#012b16; border-color:#7effb2; cursor:pointer;
        box-shadow:0 0 22px rgba(126,255,178,0.4); }
      .gt-card.done .gt-submit { display:none; }
      .gt-card .gt-done-banner { display:none; padding:12px; margin-top:10px;
        background:rgba(126,255,178,0.18); border:1px solid #7effb2; border-radius:10px;
        color:#fff; font-size:15px; }
      .gt-card.done .gt-done-banner { display:block; }
    `;
    document.head.appendChild(s);
  }

  // simple chime via WebAudio (fallback to SFX module if exists)
  function chime(freq, dur){
    try {
      if (global.SFX && global.SFX.play){ global.SFX.play('correct'); return; }
      const ctx = new (global.AudioContext || global.webkitAudioContext)();
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.frequency.value = freq || 880; o.type = 'sine';
      g.gain.value = 0.001; o.connect(g); g.connect(ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (dur || 0.7));
      o.stop(ctx.currentTime + (dur || 0.7));
    } catch(e){}
  }

  const GroupTalk = {
    /**
     * @param {HTMLElement} el
     * @param {object} opts {
     *   pageId, prompt:string, durationSec:60,
     *   roles:[{title,desc}] · default 3 roles (Leader/Recorder/Skeptic),
     *   chips:[string] · กลุ่มเลือกข้อสรุป (multi),
     *   onSubmit: fn(consensus:[]),
     *   indicator: 'A1' | 'P2' · default 'A1'
     * }
     */
    _instances: [],
    /* F12 · ครูส่ง command ผ่าน pace · 'pause' | 'resume' | 'extend30' | 'finish' */
    applyRemote(cmd){
      this._instances.forEach(inst => {
        if (!inst || !inst.api) return;
        try {
          if (cmd === 'pause')      inst.api.pause();
          else if (cmd === 'resume')inst.api.resume();
          else if (cmd === 'extend30') inst.api.add30();
          else if (cmd === 'finish' || cmd === 'openConsensus') inst.api.openConsensus();
        } catch(e){ console.warn('GroupTalk applyRemote', e); }
      });
    },
    mount(el, opts){
      const pageId = opts.pageId || (document.body.dataset.page || 'page');
      const dur = opts.durationSec || 60;
      const indicator = opts.indicator || 'A1';
      const roles = opts.roles || [
        { title:'🎤 Leader', desc:'เริ่มถาม · ฟังทุกคน · สรุปก่อนกดส่ง' },
        { title:'✏️ Recorder', desc:'จดเหตุผลที่กลุ่มใช้ · ยืนยันก่อน chip' },
        { title:'🤔 Skeptic', desc:'ถามว่า "เพราะอะไร" · "มีอีกเหตุผลไหม"' }
      ];
      const chipsHtml = (opts.chips || []).map((c,i) =>
        `<button class="gt-chip" data-i="${i}" disabled>${c}</button>`).join('');
      const rolesHtml = roles.map(r =>
        `<div class="gt-role"><b>${r.title}</b><br>${r.desc}</div>`).join('');
      // F12 · pace remote hint
      const showPaceHint = !!(global.PaceClient && global.PaceClient.isConnected && global.PaceClient.isConnected());
      const paceHintHtml = showPaceHint
        ? '<div class="pace-remote-hint">📡 Connected · ครูสามารถคุม timer ได้</div>'
        : '';
      el.innerHTML = `
        <div class="gt-card" id="gtRoot">
          ${paceHintHtml}
          <span class="gt-tag">🗣️ GROUP TALK · ปรึกษากลุ่ม</span>
          <h3>${opts.prompt}</h3>
          <div class="gt-roles">${rolesHtml}</div>
          <div class="gt-prompt">⚠️ ระหว่างคุย: ห้ามคนเดียวตัดสิน · ทุกคนต้องเห็นด้วย หรือเขียนเหตุผลที่เห็นต่าง</div>
          <div class="gt-timer">
            <div class="gt-timer-num" id="gtNum">${dur}</div>
            <div class="gt-timer-bar"><div class="gt-timer-fill" id="gtFill"></div></div>
          </div>
          <div class="gt-controls">
            <button class="gt-btn gt-start" id="gtStart">▶ เริ่มจับเวลา ${dur} วิ</button>
            <button class="gt-btn gt-pause" id="gtPause" style="display:none;">⏸ หยุดชั่วคราว</button>
            <button class="gt-btn gt-add" id="gtAdd" style="display:none;">+30s ขอเวลาเพิ่ม</button>
          </div>
          <div class="gt-consensus" id="gtConsensus" style="display:none;">
            <h4>✓ ข้อสรุปของกลุ่ม · เลือกตามที่ตกลง (เลือกได้หลายข้อ)</h4>
            <div class="gt-chips" id="gtChips">${chipsHtml}</div>
          </div>
          <button class="gt-submit" id="gtSubmit" disabled>🔒 ยังไม่จบเวลาคุย</button>
          <div class="gt-done-banner">✓ บันทึกข้อสรุปของกลุ่มแล้ว</div>
        </div>`;
      const root = el.querySelector('#gtRoot');
      const num = el.querySelector('#gtNum');
      const fill = el.querySelector('#gtFill');
      const startBtn = el.querySelector('#gtStart');
      const pauseBtn = el.querySelector('#gtPause');
      const addBtn = el.querySelector('#gtAdd');
      const consBox = el.querySelector('#gtConsensus');
      const chipsEl = el.querySelector('#gtChips');
      const submit = el.querySelector('#gtSubmit');
      const selected = new Set();

      let total = dur, remain = dur, paused = true, raf = null, lastTick = 0;
      function render(){
        num.textContent = Math.ceil(remain);
        num.classList.toggle('warn', remain <= total*0.5 && remain > 10);
        num.classList.toggle('urgent', remain <= 10);
        fill.style.width = Math.max(0,(remain/total)*100) + '%';
      }
      function loop(ts){
        if (paused) return;
        if (!lastTick) lastTick = ts;
        const dt = (ts - lastTick)/1000; lastTick = ts;
        remain = Math.max(0, remain - dt);
        render();
        if (remain <= 0){
          paused = true; chime(660, 0.4); setTimeout(()=>chime(880, 0.6), 250);
          openConsensus();
          return;
        }
        if (remain < 11 && Math.floor(remain) === Math.floor(remain+dt)-1 && remain > 9.5) chime(440,0.15);
        raf = requestAnimationFrame(loop);
      }
      function openConsensus(){
        consBox.style.display = 'block';
        chipsEl.querySelectorAll('.gt-chip').forEach(c => c.disabled = false);
        submit.disabled = false; submit.classList.add('ready');
        submit.textContent = '✓ ส่งข้อสรุปของกลุ่ม';
        startBtn.style.display = 'none'; pauseBtn.style.display='none'; addBtn.style.display='none';
      }
      startBtn.onclick = () => {
        paused = false; lastTick = 0;
        startBtn.style.display='none';
        pauseBtn.style.display='inline-block';
        addBtn.style.display='inline-block';
        chime(880, 0.25);
        raf = requestAnimationFrame(loop);
      };
      pauseBtn.onclick = () => {
        paused = !paused;
        pauseBtn.textContent = paused ? '▶ เริ่มต่อ' : '⏸ หยุดชั่วคราว';
        if (!paused){ lastTick = 0; raf = requestAnimationFrame(loop); }
      };
      addBtn.onclick = () => {
        remain = Math.min(total, remain + 30); total = total + 30;
        render(); chime(660, 0.2);
      };
      chipsEl.querySelectorAll('.gt-chip').forEach(c => {
        c.onclick = () => {
          if (root.classList.contains('done')) return;
          c.classList.toggle('on');
          const i = +c.dataset.i;
          if (c.classList.contains('on')) selected.add(i); else selected.delete(i);
        };
      });
      // F12 · expose api + register instance + Sync.on listener
      const inst = {
        el,
        api: {
          pause(){ if (!paused) { paused = true; pauseBtn.textContent = '▶ เริ่มต่อ'; } },
          resume(){
            if (paused && remain > 0) { paused = false; lastTick = 0;
              pauseBtn.textContent = '⏸ หยุดชั่วคราว';
              raf = requestAnimationFrame(loop); }
          },
          add30(){ remain = Math.min(total + 30, remain + 30); total = total + 30; render(); chime(660,0.2); },
          openConsensus,
        }
      };
      GroupTalk._instances.push(inst);
      // Sync listener (subscribe once)
      if (global.Sync && typeof global.Sync.on === 'function' && !GroupTalk._syncWired) {
        try {
          global.Sync.on(function(state){
            if (!state) return;
            const cmd = state.gtCommand;
            if (cmd && cmd !== GroupTalk._lastCmd) {
              GroupTalk._lastCmd = cmd;
              GroupTalk.applyRemote(cmd.split('@')[0]);
            }
          });
          GroupTalk._syncWired = true;
        } catch(e){}
      }

      submit.onclick = () => {
        if (submit.disabled || !submit.classList.contains('ready')) return;
        const picked = [...selected].map(i => opts.chips[i]);
        if (global.KPA){
          global.KPA.log(indicator, 'group-consensus', {
            page: pageId, action:'consensus', value: picked, total: opts.chips.length
          });
          global.KPA.log('P2', 'group-talk', { page: pageId, value: picked });
          global.KPA.vpa(1, { page: pageId, kind:'group-talk', summary: picked.join(' / ') });
        }
        const k = 'cosmosLog_' + ((global.EP_CONFIG && global.EP_CONFIG.id) || 'ep06') + '_group_' + pageId;
        localStorage.setItem(k, JSON.stringify(picked));
        root.classList.add('done');
        chime(880, 0.3); setTimeout(()=>chime(1320, 0.4), 200);
        if (typeof opts.onSubmit === 'function') opts.onSubmit(picked);
      };
    }
  };
  global.GroupTalk = GroupTalk;
})(window);
