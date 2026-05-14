/* ===== COSMOS LOG · Resume Picker =====
 * แสดงรายการหน้าทั้งหมดของ EP + เครื่องหมายว่าหน้าไหนเสร็จแล้ว
 * นักเรียนกระโดดไปหน้าที่ทำค้างได้ทันที · ไม่ต้องเริ่มจาก p01 ใหม่
 *
 * Usage in EP index.html:
 *   <script src="config.js"></script>          (มี window.EP_CONFIG.pages)
 *   <div id="resume-picker"></div>
 *   <script src="../shared/resume-picker.js"></script>
 *
 * Storage detection (auto):
 *   EP01-02 (G1/G1.5): cosmosLog_state.gates[pageId]
 *   EP03-06 (G2)     : cosmosLog_<ep>_submit_<pageId>
 *   EP07-08 (G3 KPA) : cosmosLog_<ep>_kpa.logs[].page
 */
(function(){
  const cfg = window.EP_CONFIG;
  if (!cfg || !cfg.pages || !cfg.pages.length) {
    console.warn('[resume-picker] EP_CONFIG.pages not found');
    return;
  }
  const epId  = cfg.id || 'ep??';
  const pages = cfg.pages;

  /* ---- progress detection ---- */
  function isComplete(pageId){
    // 1) EP01-02 gates
    try {
      const s = JSON.parse(localStorage.getItem('cosmosLog_state') || '{}');
      if (s.gates && s.gates[pageId]) return true;
    } catch(e){}
    // 2) per-page submit (EP03-06)
    if (localStorage.getItem('cosmosLog_' + epId + '_submit_' + pageId) !== null) return true;
    // 3) KPA logs (EP07-08)
    try {
      const k = JSON.parse(localStorage.getItem('cosmosLog_' + epId + '_kpa') || '{}');
      if (k && k.logs && k.logs.some(l => l && l.page === pageId)) return true;
    } catch(e){}
    return false;
  }

  /* ---- find last completed + next to do ---- */
  function compute(){
    let lastDoneIdx = -1;
    const done = pages.map((p, i) => {
      const ok = isComplete(p.id);
      if (ok) lastDoneIdx = i;
      return ok;
    });
    const nextIdx = Math.min(lastDoneIdx + 1, pages.length - 1);
    const pct = Math.round((done.filter(Boolean).length / pages.length) * 100);
    const paceIdx = getPaceUnlockedIdx();      // -1 = ครู lock ทั้งหมด · null = ไม่มี pace
    // maxAllowedIdx = หน้าสูงสุดที่นักเรียนเข้าได้
    //   - progress: ทำได้ถึง lastDone + 1 (next)
    //   - pace:     ครูอนุญาตถึง paceIdx
    //   - ผลรวม = min(ทั้งสอง)
    let maxAllowedIdx = nextIdx;
    if (paceIdx !== null) maxAllowedIdx = Math.min(maxAllowedIdx, paceIdx);
    return { done, lastDoneIdx, nextIdx, paceIdx, maxAllowedIdx, pct };
  }

  /* ---- pace lock detection ---- */
  // คืน index ของหน้าสูงสุดที่ครูปลดล็อค · null ถ้าไม่มี pace control · -1 ถ้าครู lock ทั้งหมด
  function getPaceUnlockedIdx(){
    try {
      const roomCode = localStorage.getItem('paceRoom');
      if (!roomCode) return null;
      const raw = localStorage.getItem('paceLocal_' + roomCode);
      if (!raw) return null;
      const p = JSON.parse(raw);
      if (!p) return null;
      // ถ้า unlockedUpTo เป็นค่าว่าง = lock ทุกหน้า
      if (!p.unlockedUpTo) return -1;
      const idx = pages.findIndex(pg => pg.id === p.unlockedUpTo);
      return idx;  // -1 ถ้าไม่เจอใน EP นี้ · ไม่ตรง EP ก็คือไม่ lock
    } catch(e) { return null; }
  }

  /* ---- render ---- */
  function render(){
    const mount = document.getElementById('resume-picker');
    if (!mount) return;
    const { done, nextIdx, paceIdx, maxAllowedIdx, pct } = compute();
    const hasProgress = done.some(Boolean);
    const allLocked = paceIdx === -1;  // ครู lock ทุกหน้า

    const items = pages.map((p, i) => {
      const ok      = done[i];
      const isNext  = !ok && i === nextIdx && hasProgress;
      const locked  = i > maxAllowedIdx;  // เกินขอบเขตที่อนุญาต = locked
      const icon    = locked ? '🔒' : (ok ? '✓' : (isNext ? '▶' : '○'));
      let cls       = 'rp-row';
      if (ok)     cls += ' rp-done';
      if (isNext && !locked) cls += ' rp-next';
      if (locked) cls += ' rp-locked';
      const time    = p.time ? '<span class="rp-time">' + p.time + ' นาที</span>' : '';
      const inner   = '<span class="rp-mark">' + icon + '</span>' +
                      '<span class="rp-pid">' + p.id.toUpperCase() + '</span>' +
                      '<span class="rp-title">' + (p.title || p.file) + '</span>' +
                      time;
      // หน้าที่ locked → render เป็น <div> ไม่ใช่ <a> · กดไม่ได้
      if (locked) return '<div class="' + cls + '" title="ครูยังไม่เปิดหน้านี้">' + inner + '</div>';
      return '<a class="' + cls + '" href="' + p.file + '">' + inner + '</a>';
    }).join('');

    // ปุ่ม "ทำต่อ"
    let resumeBtn;
    if (allLocked) {
      resumeBtn = '<span class="rp-resume rp-resume-locked">🔒 ครูยังไม่เปิดหน้าเรียน</span>';
    } else if (hasProgress) {
      const target = Math.min(nextIdx, maxAllowedIdx);
      if (target < 0) {
        resumeBtn = '<span class="rp-resume rp-resume-locked">🔒 ครูยังไม่เปิดหน้าถัดไป</span>';
      } else {
        resumeBtn = '<a class="rp-resume" href="' + pages[target].file + '">▶ ทำต่อจาก ' + pages[target].id.toUpperCase() + ' · ' + pages[target].title + '</a>';
      }
    } else if (maxAllowedIdx >= 0) {
      resumeBtn = '<a class="rp-resume" href="' + pages[0].file + '">▶ เริ่มภารกิจ ' + pages[0].id.toUpperCase() + '</a>';
    } else {
      resumeBtn = '<span class="rp-resume rp-resume-locked">🔒 ครูยังไม่เปิดหน้าเรียน</span>';
    }

    const paceBanner = (paceIdx !== null && paceIdx >= 0)
      ? '<div class="rp-pace-info">🎓 ครูเปิดถึงหน้า <b>' + pages[paceIdx].id.toUpperCase() + '</b> · ' + (pages[paceIdx].title || '') + '</div>'
      : (allLocked ? '<div class="rp-pace-info rp-pace-locked">🔒 ครูยังไม่เปิดให้เข้าหน้าใด · รอครูเปิดประตู</div>' : '');

    mount.innerHTML =
      '<div class="rp-card">' +
        '<div class="rp-head">' +
          '<div class="rp-title-row">' +
            '<span class="rp-label">★ MISSION LOG · ' + epId.toUpperCase() + '</span>' +
            '<span class="rp-pct">' + pct + '% · ' + done.filter(Boolean).length + '/' + pages.length + ' หน้า</span>' +
          '</div>' +
          '<div class="rp-bar"><div class="rp-fill" style="width:' + pct + '%"></div></div>' +
        '</div>' +
        paceBanner +
        '<div class="rp-actions">' +
          resumeBtn +
          (hasProgress ? '<button class="rp-reset" type="button">🗑 ล้างความก้าวหน้า · เริ่มใหม่</button>' : '') +
        '</div>' +
        '<details class="rp-details"' + (hasProgress ? '' : ' open') + '>' +
          '<summary>📋 รายการหน้าทั้งหมด (' + pages.length + ' หน้า) · คลิกเพื่อข้ามไปหน้านั้น</summary>' +
          '<div class="rp-list">' + items + '</div>' +
        '</details>' +
      '</div>';

    const resetBtn = mount.querySelector('.rp-reset');
    if (resetBtn) resetBtn.addEventListener('click', resetProgress);
  }

  /* ---- reset ---- */
  function resetProgress(){
    if (!confirm('ล้างความก้าวหน้าของ ' + epId.toUpperCase() + ' ทั้งหมด? เริ่มใหม่ตั้งแต่หน้าแรก')) return;
    // ลบ keys ที่เกี่ยวข้องกับ ep นี้
    Object.keys(localStorage)
      .filter(k => k.startsWith('cosmosLog_' + epId + '_'))
      .forEach(k => localStorage.removeItem(k));
    // EP01-02 ใช้ cosmosLog_state (shared) — ล้างเฉพาะ gates ของ pages ที่ ep นี้มี
    try {
      const s = JSON.parse(localStorage.getItem('cosmosLog_state') || '{}');
      if (s.gates) {
        pages.forEach(p => delete s.gates[p.id]);
        // ถ้าเป็น EP01/02 ลบ state ทั้งก้อนเลยดีกว่า (gates ของ ep01/ep02 ใช้ key เดียวกัน อันตราย)
        if (epId === 'ep01' || epId === 'ep02') {
          localStorage.removeItem('cosmosLog_state');
        } else {
          localStorage.setItem('cosmosLog_state', JSON.stringify(s));
        }
      }
    } catch(e){}
    render();
  }

  /* ---- inject style once ---- */
  function injectStyle(){
    if (document.getElementById('rp-style')) return;
    const css = `
      .rp-card { background:rgba(22,27,58,0.65); border:1.5px solid rgba(120,140,220,0.3); border-radius:14px; padding:18px 20px; margin:18px 0; font-family:'Sarabun',system-ui,sans-serif; }
      .rp-head { margin-bottom:14px; }
      .rp-title-row { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px; }
      .rp-label { font-family:'Orbitron',sans-serif; font-size:12px; letter-spacing:0.2em; color:#64d8ff; }
      .rp-pct { font-family:'Space Grotesk',monospace; font-size:13px; color:#7effb2; font-weight:700; }
      .rp-bar { height:6px; background:rgba(0,0,0,0.35); border-radius:6px; overflow:hidden; }
      .rp-fill { height:100%; background:linear-gradient(90deg,#64d8ff,#7effb2); transition:width .4s; }
      .rp-actions { display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin-bottom:14px; }
      .rp-resume { display:inline-block; background:linear-gradient(135deg,#64d8ff,#b980ff); color:#0a0d1f; padding:11px 22px; border-radius:10px; text-decoration:none; font-weight:800; font-size:15px; letter-spacing:0.02em; }
      .rp-resume:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(100,216,255,0.35); }
      .rp-reset { background:transparent; border:1px solid rgba(255,92,122,0.5); color:#ff8fa5; padding:9px 14px; border-radius:8px; font-family:'Sarabun',sans-serif; font-size:13px; cursor:pointer; }
      .rp-reset:hover { background:rgba(255,92,122,0.1); }
      .rp-details summary { cursor:pointer; padding:8px 0; font-size:13px; color:#9aa3c0; user-select:none; }
      .rp-details summary:hover { color:#64d8ff; }
      .rp-list { display:grid; grid-template-columns:1fr; gap:4px; margin-top:8px; max-height:480px; overflow-y:auto; padding-right:6px; }
      .rp-row { display:grid; grid-template-columns:28px 50px 1fr auto; gap:10px; align-items:center; padding:9px 12px; background:rgba(0,0,0,0.2); border:1px solid rgba(120,140,220,0.15); border-radius:8px; text-decoration:none; color:#e8ecf8; font-size:14px; transition:all .15s; }
      .rp-row:hover { background:rgba(100,216,255,0.1); border-color:rgba(100,216,255,0.5); transform:translateX(3px); }
      .rp-mark { width:22px; height:22px; display:flex; align-items:center; justify-content:center; border-radius:50%; background:rgba(120,140,220,0.15); color:#6a7394; font-size:12px; font-weight:700; }
      .rp-done .rp-mark { background:rgba(126,255,178,0.2); color:#7effb2; }
      .rp-next .rp-mark { background:rgba(100,216,255,0.25); color:#64d8ff; animation:rpPulse 1.6s infinite; }
      @keyframes rpPulse { 50% { box-shadow:0 0 0 5px rgba(100,216,255,0.15); } }
      .rp-pid { font-family:'Space Grotesk',monospace; font-size:11px; letter-spacing:0.1em; color:#9aa3c0; }
      .rp-done .rp-pid { color:#7effb2; }
      .rp-next .rp-pid { color:#64d8ff; font-weight:700; }
      .rp-title { color:inherit; }
      .rp-done .rp-title { color:#9aa3c0; text-decoration:line-through; text-decoration-color:rgba(126,255,178,0.4); }
      .rp-next .rp-title { color:#fff; font-weight:600; }
      .rp-time { font-family:'Space Grotesk',monospace; font-size:11px; color:#6a7394; white-space:nowrap; }
      .rp-locked { opacity:0.45; cursor:not-allowed; }
      .rp-locked:hover { background:rgba(0,0,0,0.2); border-color:rgba(120,140,220,0.15); transform:none; }
      .rp-locked .rp-mark { background:rgba(255,92,122,0.15); color:#ff8fa5; }
      .rp-locked .rp-title { color:#6a7394; }
      .rp-resume-locked { display:inline-block; background:rgba(255,92,122,0.15); color:#ff8fa5; padding:11px 22px; border-radius:10px; border:1.5px dashed rgba(255,92,122,0.5); font-weight:700; font-size:15px; cursor:not-allowed; }
      .rp-pace-info { background:rgba(100,216,255,0.1); border:1px solid rgba(100,216,255,0.35); border-radius:8px; padding:8px 12px; margin-bottom:10px; font-size:13px; color:#64d8ff; }
      .rp-pace-info b { color:#fff; font-weight:700; }
      .rp-pace-info.rp-pace-locked { background:rgba(255,92,122,0.1); border-color:rgba(255,92,122,0.4); color:#ff8fa5; }
    `;
    const s = document.createElement('style');
    s.id = 'rp-style';
    s.textContent = css;
    document.head.appendChild(s);
  }

  injectStyle();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }

  // expose for manual refresh
  window.ResumePicker = { render, compute, isComplete };
})();
