/* ──────────────────────────────────────────────────────────────
   worksheet-core.js · KP-Classroom shared infrastructure
   - Auto-fill student identity from parent iframe (with manual fallback)
   - Auto-save to localStorage (debounced)
   - Auto-restore on page load
   - Export/Import JSON
   - Print-friendly CSS hooks
   Usage:
     1. Include <script src="../../shared/worksheet-core.js"></script> before </body>
     2. Set <body data-ws-id="plan5-calc-5.1"> for unique storage key
     3. Student fields MUST use ids: s-name, s-num, s-room, s-grp
     4. All textarea/input/canvas with id will be auto-saved
   ────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  const WS_ID =
    document.body.dataset.wsId ||
    document.title.replace(/\s+/g, '_').slice(0, 60) ||
    location.pathname.replace(/\//g, '_');
  const STORAGE_KEY = 'kp-ws-' + WS_ID;
  const SAVE_DEBOUNCE_MS = 1500;
  const IDENTITY_TIMEOUT_MS = 1500;

  let saveTimer = null;
  let isRestoring = false;
  let identityFilled = false;

  /* ─── CSS injection (single source of truth) ─── */
  function injectCSS() {
    if (document.getElementById('kp-core-css')) return;
    const css = `
.kp-toolbar{position:fixed;bottom:0;left:0;right:0;background:linear-gradient(135deg,rgba(12,74,64,.96),rgba(15,118,110,.96));color:#fff;padding:8px 14px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;z-index:9999;box-shadow:0 -2px 12px rgba(0,0,0,.18);font-size:13px;font-family:'Sarabun',sans-serif}
.kp-toolbar #kp-save-status{font-weight:600;min-width:180px}
.kp-toolbar .kp-btn{background:#fff;color:#0f766e;border:none;padding:6px 12px;border-radius:6px;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;transition:all .15s}
.kp-toolbar .kp-btn:hover{background:#f0fdfa;transform:translateY(-1px)}
.kp-toolbar .kp-btn-danger{background:#fecaca;color:#991b1b}
.kp-toolbar .kp-btn-danger:hover{background:#fca5a5}
body{padding-bottom:60px !important}
input.kp-auto-filled,textarea.kp-auto-filled{background:#ecfeff !important;color:#0c4a40;cursor:not-allowed}
body.kp-grading-mode{background:#fff8e1 !important}
body.kp-grading-mode::before{content:'🔎 โหมดตรวจงาน · อ่านอย่างเดียว';position:fixed;top:0;left:0;right:0;background:#ff8f00;color:#fff;text-align:center;font-weight:800;padding:6px;z-index:10000;font-size:13px}
body.kp-grading-mode{padding-top:34px !important}
body.kp-grading-mode input,body.kp-grading-mode textarea,body.kp-grading-mode select{background:#fffde7 !important;color:#3e2723 !important}
body.kp-grading-mode input[type=radio]:checked+*,body.kp-grading-mode label:has(input:checked){background:#fff3e0;border-radius:4px}
body.kp-grading-mode #kp-toolbar{display:none !important}
@media print{
  .kp-toolbar{display:none !important}
  body{padding-bottom:0 !important;background:#fff !important}
  textarea{border:1px solid #999 !important;min-height:auto !important;height:auto !important;overflow:visible !important;white-space:pre-wrap !important;page-break-inside:avoid}
  input{border-bottom:1px solid #666 !important;background:transparent !important}
  canvas{page-break-inside:avoid;max-width:100% !important}
  .scene-stack,.grid-wrap{page-break-inside:avoid}
  .item{page-break-inside:avoid}
  .kp-auto-filled{color:#000 !important;background:transparent !important}
}`;
    const style = document.createElement('style');
    style.id = 'kp-core-css';
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ─── Identity auto-fill (postMessage to parent) ─── */
  function requestIdentity() {
    if (window.parent === window) return; // no parent, manual only

    const handleReply = (e) => {
      if (!e.data || e.data.type !== 'STUDENT_INFO') return;
      const map = { 's-name': 'name', 's-num': 'num', 's-room': 'room', 's-grp': 'group' };
      Object.entries(map).forEach(([id, key]) => {
        const el = document.getElementById(id);
        if (el && e.data[key]) {
          el.value = e.data[key];
          el.readOnly = true;
          el.classList.add('kp-auto-filled');
          el.title = 'ดึงข้อมูลจากระบบอัตโนมัติ';
        }
      });
      identityFilled = true;
      window.removeEventListener('message', handleReply);
    };

    window.addEventListener('message', handleReply);
    window.parent.postMessage({ type: 'REQUEST_STUDENT_INFO', ws: WS_ID }, '*');

    setTimeout(() => {
      if (!identityFilled) window.removeEventListener('message', handleReply);
    }, IDENTITY_TIMEOUT_MS);
  }

  /* ─── Serialize all state ─── */
  function collectState() {
    const state = { _wsId: WS_ID, _savedAt: Date.now(), inputs: {}, canvases: {} };
    document.querySelectorAll('input, textarea, select').forEach((el) => {
      if (!el.id) return;
      if (el.type === 'checkbox' || el.type === 'radio') {
        state.inputs[el.id] = { _type: el.type, checked: el.checked, value: el.value };
      } else {
        state.inputs[el.id] = el.value;
      }
    });
    document.querySelectorAll('canvas').forEach((c) => {
      if (!c.id) return;
      try {
        state.canvases[c.id] = c.toDataURL('image/png');
      } catch (err) {
        /* ignore tainted canvas */
      }
    });
    return state;
  }

  /* ─── Restore ─── */
  function restoreState(state) {
    if (!state) return;
    isRestoring = true;
    try {
      if (state.inputs) {
        Object.entries(state.inputs).forEach(([id, v]) => {
          const el = document.getElementById(id);
          if (!el) return;
          // don't overwrite identity fields that were already auto-filled
          if (el.classList.contains('kp-auto-filled')) return;
          if (v && typeof v === 'object' && '_type' in v) {
            el.checked = !!v.checked;
          } else {
            el.value = v;
          }
        });
      }
      if (state.canvases) {
        Object.entries(state.canvases).forEach(([id, data]) => {
          const c = document.getElementById(id);
          if (!c || !data) return;
          const img = new Image();
          img.onload = () => {
            const ctx = c.getContext('2d');
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.drawImage(img, 0, 0, c.width, c.height);
          };
          img.src = data;
        });
      }
    } finally {
      setTimeout(() => { isRestoring = false; }, 300);
    }
  }

  /* ─── Save / Load / Clear ─── */
  function saveNow() {
    if (isRestoring) return;
    try {
      const state = collectState();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      updateStatus('✓ บันทึกอัตโนมัติ ' + new Date().toLocaleTimeString('th-TH'));
    } catch (e) {
      updateStatus('⚠️ บันทึกไม่สำเร็จ (' + (e.name || 'error') + ')');
    }
  }
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveNow, SAVE_DEBOUNCE_MS);
  }
  function loadSaved() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) { updateStatus('พร้อมใช้งาน'); return false; }
      const state = JSON.parse(raw);
      restoreState(state);
      const ago = Math.round((Date.now() - (state._savedAt || Date.now())) / 60000);
      updateStatus('📂 โหลดคำตอบเดิม (บันทึกไว้ ' + ago + ' นาทีที่แล้ว)');
      return true;
    } catch (e) { return false; }
  }
  function clearSaved() {
    if (!confirm('ลบคำตอบที่บันทึกไว้ทั้งหมด แล้วเริ่มใหม่?')) return;
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }

  /* ─── Export / Import JSON ─── */
  function fileNameBase() {
    const name = (document.getElementById('s-name')?.value || 'unnamed').replace(/\s+/g, '_');
    const num = document.getElementById('s-num')?.value || '';
    const date = new Date().toISOString().slice(0, 10);
    return `${WS_ID}_${name}${num ? '_' + num : ''}_${date}`;
  }
  function exportJSON() {
    const state = collectState();
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileNameBase() + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    updateStatus('📥 ดาวน์โหลด ' + a.download);
  }
  function importJSON() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const state = JSON.parse(reader.result);
          restoreState(state);
          setTimeout(saveNow, 500);
          alert('✅ นำเข้าข้อมูลเรียบร้อย');
        } catch (err) {
          alert('❌ ไฟล์ผิดรูปแบบ');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  /* ─── Submit-to-cloud (optional, if parent supports) ─── */
  function submitToCloud() {
    if (window.parent === window) {
      alert('ต้องเปิดใบงานในระบบ KP-Classroom เพื่อส่งข้อมูล');
      return;
    }
    const state = collectState();
    window.parent.postMessage({ type: 'WS_SUBMIT', wsId: WS_ID, data: state }, '*');
    updateStatus('☁️ ส่งไปเซิร์ฟเวอร์แล้ว');
  }

  /* ─── Restore from flat row (teacher grading) ─── */
  // Flat keys come from flattenInputs() in KP-Classroom:
  //   · radio group "q1_t1" → value 'ก' · matches radio whose name|id maps to q1_t1
  //   · checkbox "q1_a"     → '1' or ''
  //   · text/textarea/select "q1_explain" → value
  // Canvas not restored here (requires Drive fetch · teacher can see original in ตรวจรูป tab)
  function restoreFlatRow(flat) {
    if (!flat || typeof flat !== 'object') return;
    isRestoring = true;
    try {
      const setRadioOrCheck = (el) => {
        const name = el.name || '';
        const idKey = (el.id || '').replace(/-/g, '_');
        const nameKey = name.replace(/-/g, '_');
        // strip last segment for id-based group key (e.g. q1-t1-a → q1_t1)
        const idGroup = idKey.replace(/_[^_]+$/, '');
        const candidates = [nameKey, name, idKey, idGroup];
        for (const k of candidates) {
          if (!k) continue;
          const v = flat[k];
          if (v == null || v === '') continue;
          if (el.type === 'checkbox') {
            if (String(v) === String(el.value) || v === true || v === '1' || v === 1) {
              el.checked = true;
              return;
            }
          } else if (String(v) === String(el.value)) {
            el.checked = true;
            return;
          }
        }
      };
      document.querySelectorAll('input, textarea, select').forEach((el) => {
        if (el.classList.contains('kp-auto-filled')) return;
        if (el.type === 'radio' || el.type === 'checkbox') {
          setRadioOrCheck(el);
        } else if (el.id) {
          const k = el.id.replace(/-/g, '_');
          if (flat[k] != null) el.value = flat[k];
        }
      });
      // Canvas overlay: flat key `canvas_<cid>_url` → Drive URL · วาง <img> ทับ canvas
      Object.keys(flat).forEach((k) => {
        const m = k.match(/^canvas_(.+)_url$/);
        if (!m) return;
        const url = flat[k];
        if (!url || typeof url !== 'string') return;
        const cid = m[1];
        const canvas =
          document.getElementById(cid) ||
          document.getElementById(cid.replace(/_/g, '-'));
        if (!canvas) return;
        overlayCanvasImage(canvas, url);
      });
    } finally {
      setTimeout(() => { isRestoring = false; }, 300);
    }
  }

  // Drive URL → image URLs (try multiple · Drive thumbnails บางครั้งบล็อก hotlink)
  function driveUrlCandidates(url) {
    const s = String(url || '');
    const m = s.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || s.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (!m) return [s];
    const id = m[1];
    return [
      `https://lh3.googleusercontent.com/d/${id}=w1600`,
      `https://drive.google.com/thumbnail?id=${id}&sz=w1600`,
      `https://drive.google.com/uc?id=${id}&export=view`,
      s
    ];
  }

  // วาง <img> ทับ canvas แบบ absolute · read-only · ไม่แตะ canvas (กัน CORS taint)
  function overlayCanvasImage(canvas, driveUrl) {
    const parent = canvas.parentElement;
    if (!parent) return;
    const pos = getComputedStyle(parent).position;
    if (pos === 'static') parent.style.position = 'relative';
    const prev = parent.querySelector(`img[data-kp-overlay-for="${canvas.id}"], a[data-kp-overlay-for="${canvas.id}"]`);
    if (prev) prev.remove();
    const candidates = driveUrlCandidates(driveUrl);
    const img = document.createElement('img');
    img.dataset.kpOverlayFor = canvas.id;
    img.alt = 'คำตอบนักเรียน';
    img.style.cssText =
      'position:absolute;left:' + canvas.offsetLeft + 'px;top:' + canvas.offsetTop + 'px;' +
      'width:' + canvas.offsetWidth + 'px;height:' + canvas.offsetHeight + 'px;' +
      'object-fit:contain;pointer-events:none;z-index:5;mix-blend-mode:multiply;background:transparent';
    let attempt = 0;
    const tryNext = () => {
      if (attempt >= candidates.length) {
        // All failed — replace with clickable link so teacher can open in new tab
        img.remove();
        const link = document.createElement('a');
        link.dataset.kpOverlayFor = canvas.id;
        link.href = driveUrl;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = '🔗 เปิดภาพใน Drive (hotlink ถูกบล็อก)';
        link.style.cssText =
          'position:absolute;left:' + canvas.offsetLeft + 'px;top:' + canvas.offsetTop + 'px;' +
          'width:' + canvas.offsetWidth + 'px;height:' + canvas.offsetHeight + 'px;' +
          'display:flex;align-items:center;justify-content:center;z-index:5;' +
          'background:#fff3e0;border:2px dashed #ff8f00;border-radius:8px;' +
          'color:#bf360c;font-weight:700;text-decoration:none;font-size:13px';
        parent.appendChild(link);
        return;
      }
      img.src = candidates[attempt++];
    };
    img.onerror = tryNext;
    parent.appendChild(img);
    tryNext();
  }

  /* ─── Grading (read-only) mode ─── */
  function enableGradingMode() {
    document.body.classList.add('kp-grading-mode');
    // disable student-side auto-save to avoid clobbering restored answers
    document.removeEventListener('input', scheduleSave);
    document.removeEventListener('change', scheduleSave);
    document.querySelectorAll('input, textarea, select, button').forEach((el) => {
      if (el.closest('#kp-toolbar')) return;
      el.disabled = true;
    });
    document.querySelectorAll('canvas').forEach((c) => { c.style.pointerEvents = 'none'; });
    const tb = document.getElementById('kp-toolbar');
    if (tb) tb.style.display = 'none';
    updateStatus('🔎 โหมดตรวจงาน');
  }

  /* ─── Handle parent postMessage (RESTORE_STATE / RESTORE_FLAT / GRADING_MODE) ─── */
  window.addEventListener('message', (e) => {
    const msg = e.data;
    if (!msg || !msg.type) return;
    if (msg.type === 'RESTORE_STATE' && msg.state) {
      restoreState(msg.state);
    } else if (msg.type === 'RESTORE_FLAT' && msg.flat) {
      restoreFlatRow(msg.flat);
    } else if (msg.type === 'GRADING_MODE') {
      enableGradingMode();
      if (msg.state) restoreState(msg.state);
      else if (msg.flat) restoreFlatRow(msg.flat);
    }
  });

  function updateStatus(msg) {
    const el = document.getElementById('kp-save-status');
    if (el) el.textContent = msg;
  }

  /* ─── Toolbar build ─── */
  function buildToolbar() {
    if (document.getElementById('kp-toolbar')) return;
    const bar = document.createElement('div');
    bar.id = 'kp-toolbar';
    bar.className = 'kp-toolbar';
    bar.innerHTML = `
      <span id="kp-save-status">พร้อมใช้งาน</span>
      <div style="flex:1"></div>
      <button class="kp-btn" onclick="window.print()">🖨️ พิมพ์ / PDF</button>
      <button class="kp-btn" onclick="KP.submitToCloud()" title="ส่งเข้าระบบ KP-Classroom">☁️ ส่งครู</button>
      <button class="kp-btn kp-btn-danger" onclick="KP.clearSaved()">🗑️ ล้าง</button>
    `;
    document.body.appendChild(bar);
  }

  /* ─── Init ─── */
  function init() {
    injectCSS();
    buildToolbar();
    requestIdentity();

    // Attach auto-save listeners
    document.addEventListener('input', scheduleSave);
    document.addEventListener('change', scheduleSave);
    // Canvas: listen for drawing completion events
    document.querySelectorAll('canvas').forEach((c) => {
      c.addEventListener('mouseup', scheduleSave);
      c.addEventListener('touchend', scheduleSave);
    });

    // Restore with delay to let canvas init first
    setTimeout(loadSaved, 250);
  }

  /* Expose API */
  window.KP = {
    exportJSON,
    importJSON,
    clearSaved,
    saveNow,
    loadSaved,
    submitToCloud,
    collectState,
    restoreState,
    restoreFlatRow,
    enableGradingMode,
    WS_ID,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
