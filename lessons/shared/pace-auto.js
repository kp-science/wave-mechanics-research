/* ═══════════════════════════════════════════════════════════════════
 * pace-auto.js · Universal Teacher Pace Gate (student-side)
 * ─────────────────────────────────────────────────────────────────
 * Auto-locks "next" links/buttons on any HTML lesson page · ครอบคลุม
 *   - book.js (astronomy G1) · ข้ามถ้ามี Book.pace แล้ว (เพื่อไม่ชน)
 *   - physics3 waves / SHM / sound / light · plain HTML pages
 *   - lesson pages อื่นๆ ที่มี <a class="next"> หรือ <button id="btn-next">
 *
 * Usage (เพิ่ม 1 บรรทัดใน lesson page):
 *   <script src="../../shared/pace-auto.js"></script>
 *
 * Auto-pace key: "auto_${course}" derived from path /lessons/<course>/...
 * Polls Apps Script every 2s · honors pace.auto for force-jump countdown.
 * ═══════════════════════════════════════════════════════════════════ */
(function(){
  if (window.PaceAuto && window.PaceAuto._init) return; // กัน double-init
  // ข้ามถ้ามี engine ที่จัดการ pace อยู่แล้ว · กัน state-flicker
  if (window.Book && window.Book.pace && window.Book.pace.init) return;        // book.js (G1)
  // EP*Gate (G2/G3) มี Gate ของตัวเอง · ตรวจหลังโหลดเสร็จ (delay)
  setTimeout(() => {
    const hasEpGate = window.Gate || window.EP07Gate || window.EP08Gate;
    if (hasEpGate && window.PaceAuto) window.PaceAuto._suspended = true;
  }, 500);

  // ── Course detection ────────────────────────────────────────
  const m = location.pathname.match(/\/lessons\/([a-z0-9_-]+)\//i);
  const course = m ? m[1] : null;
  if (!course) return; // ไม่ได้อยู่ใน lessons/<course>/ → skip

  // ── API URL discovery ───────────────────────────────────────
  // ลองอ่าน window.KP_CONFIG.apiUrl ก่อน · ไม่งั้น fallback hardcoded per-course
  // ⚠️ ตรงกับ content/<course>/config.js → apiUrl (อัพเดตคู่กันถ้าเปลี่ยน)
  const COURSE_API = {
    'astronomy': 'https://script.google.com/macros/s/AKfycbyVahd2W0MOH20wxfeU60h6fbBj6kpjaOEM9UoHpQWBQHM2SPiqIXZ3q2FufEpFg5YQDw/exec',
    'physics3':  'https://script.google.com/macros/s/AKfycbwoI8M3mJ3wKdNHUigoK4LFbZJH0f94WykTfBz97KPgeTo0Zi-N9DZdiEGzW3u6jofiwA/exec',
  };
  const API_URL = (window.KP_CONFIG && window.KP_CONFIG.apiUrl) || COURSE_API[course];
  if (!API_URL) { console.warn('[pace-auto] no API_URL for course=' + course); return; }

  const ROOM = 'auto_' + course;
  const POLL_MS = 8000;

  // ── State ───────────────────────────────────────────────────
  const State = {
    pace: null,
    lastKey: null,
    autoJumpKey: null,
    autoJumpTimer: null,
  };

  // ── Page id derivation ──────────────────────────────────────
  // จาก filename: "p02-team.html" → "p02" · "wave-types.html" → "wave-types"
  // ใช้ตรงกับ pageId ที่ครูส่งจาก Pace Panel (ซึ่ง derive จาก media.js no='02' → 'p02')
  function currentPageId(){
    // 1. ถ้ามี <body data-page="..."> → ใช้
    if (document.body && document.body.dataset.page) return document.body.dataset.page;
    // 2. fallback: filename (lowercase, no extension)
    const fname = (location.pathname.split('/').pop() || '').replace(/\.html?(\?.*)?$/i, '');
    // ลองจับ "pNN" หรือ "pNNa/b/c" ก่อน
    const mm = fname.match(/^(p\d+[a-z]?)(?:-|$)/i);
    return mm ? mm[1].toLowerCase() : fname.toLowerCase();
  }

  // ── Find "next" button/link ─────────────────────────────────
  function findNextEls(){
    const sels = [
      '#btn-next', '.btn-next', '[data-next]',
      'a.next', 'button.next', '.nav-next a', '.next-btn',
      'a[href*="หน้าถัดไป"]'
    ];
    const found = new Set();
    sels.forEach(s => document.querySelectorAll(s).forEach(el => found.add(el)));
    // text-based: ปุ่ม/ลิงก์ที่ข้อความขึ้นต้นด้วย "ต่อไป" / "ถัดไป" / "Next"
    document.querySelectorAll('a, button').forEach(el => {
      const t = (el.textContent || '').trim();
      if (/^(ต่อไป|ถัดไป|Next)\b/i.test(t)) found.add(el);
    });
    return Array.from(found);
  }

  function applyLock(els, locked){
    els.forEach(el => {
      if (locked) {
        if (!el.dataset.paceOriginalText && el.textContent) el.dataset.paceOriginalText = el.textContent;
        if (!el.dataset.paceOriginalHref && el.tagName === 'A' && el.href) el.dataset.paceOriginalHref = el.href;
        el.classList.add('pace-locked');
        el.setAttribute('aria-disabled', 'true');
        if (el.tagName === 'BUTTON') el.disabled = true;
        if (el.tagName === 'A') {
          el.style.pointerEvents = 'none';
          el.style.opacity = '0.5';
          el.removeAttribute('href');
        }
        if (el.textContent && !el.textContent.includes('🔒')) el.textContent = '🔒 รอครูปลดล็อค';
      } else {
        el.classList.remove('pace-locked');
        el.removeAttribute('aria-disabled');
        if (el.tagName === 'BUTTON') el.disabled = false;
        if (el.tagName === 'A') {
          el.style.pointerEvents = '';
          el.style.opacity = '';
          if (el.dataset.paceOriginalHref) el.href = el.dataset.paceOriginalHref;
        }
        if (el.dataset.paceOriginalText) el.textContent = el.dataset.paceOriginalText;
      }
    });
  }

  // ── Lock decision based on pace state vs current page ───────
  // เกณฑ์ง่าย: ถ้า pace.unlockedUpTo "น้อยกว่า" หน้าถัดไปของผู้ใช้ → lock
  // จัดลำดับด้วย numeric extract จาก pageId (p01 < p02 < p19 < p19b < p20)
  function pageOrder(id){
    const mm = String(id||'').match(/^p?(\d+)([a-z]?)/i);
    if (!mm) return 999;
    const n = parseInt(mm[1], 10);
    const sub = mm[2] ? mm[2].charCodeAt(0) - 96 : 0; // a=1,b=2,...
    return n * 100 + sub;
  }
  function shouldLock(){
    if (!State.pace || !State.pace.unlockedUpTo) return false;
    const cur = currentPageId();
    const unlocked = State.pace.unlockedUpTo;
    if (unlocked === 'p99') return false; // pace cleared
    // ปลดล็อคถึง unlocked แปลว่า "นักเรียนเข้าได้ถึงหน้า unlocked"
    // ถ้าเรากำลังอยู่หน้า "unlocked" → ปุ่มถัดไป = หน้า unlocked+1 → ต้อง lock
    // ถ้าเรากำลังอยู่หน้าก่อน unlocked → ปุ่มถัดไป ≤ unlocked → ไม่ lock
    return pageOrder(cur) >= pageOrder(unlocked);
  }

  // ── Banner UI ───────────────────────────────────────────────
  function ensureBanner(){
    let b = document.getElementById('pace-auto-banner');
    if (b) return b;
    b = document.createElement('div');
    b.id = 'pace-auto-banner';
    b.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:99999;padding:12px 18px;color:#fff;font-weight:700;font-size:14.5px;display:none;align-items:center;justify-content:center;gap:14px;box-shadow:0 4px 16px rgba(0,0,0,.4);font-family:Sarabun,sans-serif';
    document.body.appendChild(b);
    return b;
  }
  function showBannerInfo(text, color){
    const b = ensureBanner();
    b.style.background = color || 'linear-gradient(135deg,#0ea5e9,#0284c7)';
    b.style.display = 'flex';
    b.innerHTML = text;
  }
  function hideBanner(){
    const b = document.getElementById('pace-auto-banner');
    if (b) b.style.display = 'none';
  }

  // ── Auto-jump countdown ─────────────────────────────────────
  function startAutoJump(targetPageId, pace){
    const key = (pace.page || '') + '|' + (pace.at || '');
    if (State.autoJumpKey === key) return;
    State.autoJumpKey = key;
    if (State.autoJumpTimer) { clearInterval(State.autoJumpTimer); State.autoJumpTimer = null; }
    // หา URL ของหน้าเป้าหมาย: ลองจาก lock element ที่ปลดล็อคแล้ว · หรือ guess จาก current path
    const targetUrl = guessNextUrl(targetPageId);
    if (!targetUrl) {
      showBannerInfo('🔔 ครูพาไปหน้า <b>' + targetPageId.toUpperCase() + '</b> · กดปุ่ม "ต่อไป" ของคุณเพื่อตามไป', 'linear-gradient(135deg,#0ea5e9,#0284c7)');
      return;
    }
    let secs = 3;
    const render = () => {
      showBannerInfo(
        `🚀 ครูพาไปหน้า <b>${targetPageId.toUpperCase()}</b> · เด้งใน <b style="font-size:22px;color:#ffe066">${secs}</b> วิ
         <button onclick="PaceAuto.cancelAutoJump()" style="margin-left:10px;padding:5px 12px;background:rgba(255,255,255,.2);color:#fff;border:1.5px solid rgba(255,255,255,.5);border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit">⏸ หยุด</button>
         <a href="${targetUrl}" style="padding:5px 12px;background:#fff;color:#b80050;border:none;border-radius:6px;font-weight:800;cursor:pointer;font-family:inherit;text-decoration:none">⏭ ไปเลย</a>`,
        'linear-gradient(135deg,#ff5c7a,#b980ff)'
      );
    };
    render();
    State.autoJumpTimer = setInterval(() => {
      secs--;
      if (secs <= 0) {
        clearInterval(State.autoJumpTimer); State.autoJumpTimer = null;
        if (State.autoJumpKey === key) location.href = targetUrl;
      } else render();
    }, 1000);
  }

  function guessNextUrl(targetPageId){
    // 1. หา <a> ในหน้าที่มี href filename ขึ้นต้นด้วย targetPageId
    const a = Array.from(document.querySelectorAll('a[href]')).find(el => {
      const fname = (el.getAttribute('href') || '').split('/').pop().toLowerCase();
      return fname.startsWith(targetPageId + '-') || fname.startsWith(targetPageId + '.');
    });
    if (a) return a.href;
    // 2. ถ้าไม่เจอ → null (ปล่อย banner ไม่เด้ง)
    return null;
  }

  // ── HUD chip ────────────────────────────────────────────────
  function updateHudChip(){
    let chip = document.getElementById('pace-auto-chip');
    if (!chip) {
      chip = document.createElement('div');
      chip.id = 'pace-auto-chip';
      chip.style.cssText = 'position:fixed;bottom:14px;left:14px;z-index:9998;padding:6px 12px;background:rgba(0,0,0,.7);color:#fff;border-radius:20px;font-size:11px;font-family:monospace;font-weight:700;letter-spacing:.05em;pointer-events:none';
      document.body.appendChild(chip);
    }
    if (!State.pace) {
      chip.textContent = '⏳ ' + course;
      chip.style.color = '#aaa';
      return;
    }
    const up = String(State.pace.unlockedUpTo || '').toUpperCase();
    if (up === 'P99') {
      chip.textContent = '⚪ ' + course + ' · open';
      chip.style.color = '#aaa';
    } else {
      chip.textContent = '🔓 ' + course + ' · ' + up;
      chip.style.color = '#7effb2';
    }
  }

  // ── Poll loop ───────────────────────────────────────────────
  async function tick(){
    if (document.hidden) return;
    if (window.PaceAuto && window.PaceAuto._suspended) return; // EP*Gate active
    let pace = null;
    try {
      const r = await fetch(API_URL + '?action=paceGet&code=' + encodeURIComponent(ROOM) + '&_=' + Date.now());
      const j = await r.json();
      pace = (j && j.status === 'ok') ? (j.pace || null) : null;
    } catch {}
    State.pace = pace;
    updateHudChip();
    const key = pace ? (pace.page + '|' + pace.unlockedUpTo + '|' + pace.at + '|' + pace.auto) : '';
    if (key === State.lastKey) {
      // sync lock state กับหน้าเดียว (อาจมี element ใหม่เพิ่ม)
      applyLock(findNextEls(), shouldLock());
      return;
    }
    State.lastKey = key;
    applyLock(findNextEls(), shouldLock());
    // Auto-jump trigger
    if (pace && pace.auto && pace.page && pace.page !== currentPageId() && pageOrder(pace.page) > pageOrder(currentPageId())) {
      startAutoJump(pace.page, pace);
    } else if (pace && pace.page && pace.page !== currentPageId() && !pace.auto) {
      showBannerInfo('🔔 ครูพาไปหน้า <b>' + String(pace.page).toUpperCase() + '</b> · กด "ต่อไป" เพื่อตาม', 'linear-gradient(135deg,#0ea5e9,#0284c7)');
    } else {
      hideBanner();
    }
  }

  function cancelAutoJump(){
    if (State.autoJumpTimer) { clearInterval(State.autoJumpTimer); State.autoJumpTimer = null; }
    State.autoJumpKey = '__cancelled__';
    showBannerInfo('⏸ หยุด auto-jump · กดปุ่ม "ต่อไป" เองเมื่อพร้อม &nbsp;<button onclick="document.getElementById(\'pace-auto-banner\').style.display=\'none\'" style="padding:4px 10px;background:rgba(255,255,255,.2);color:#fff;border:1.5px solid rgba(255,255,255,.5);border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit">×</button>', 'linear-gradient(135deg,#0ea5e9,#0284c7)');
  }

  // ── CSS for locked state ────────────────────────────────────
  function injectCSS(){
    if (document.getElementById('pace-auto-style')) return;
    const s = document.createElement('style');
    s.id = 'pace-auto-style';
    s.textContent = `
      .pace-locked { cursor:not-allowed !important; opacity:.55 !important; filter:grayscale(.6); }
      .pace-locked:hover { transform:none !important; box-shadow:none !important; }
    `;
    document.head.appendChild(s);
  }

  // ── Init ────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    injectCSS();
    tick();
    setInterval(tick, POLL_MS);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
    // re-apply lock เมื่อ DOM เปลี่ยน (lazy-rendered next buttons)
    const obs = new MutationObserver(() => applyLock(findNextEls(), shouldLock()));
    obs.observe(document.body, { childList:true, subtree:true });
  });

  window.PaceAuto = {
    _init: true,
    cancelAutoJump,
    refresh: tick,
    state: State,
  };
})();
