/* ===== COSMOS LOG · HTML5 Drag-Drop Touch Polyfill =====
 * Transparent polyfill — ทำให้ HTML5 drag-drop API (draggable="true" +
 * dragstart/dragover/drop) ทำงานบน iPad/มือถือ โดยไม่ต้องแก้โค้ดเดิม
 *
 * Usage: <script src="../shared/drag-drop-touch-polyfill.js"></script>
 * ตรวจสอบ touch device อัตโนมัติ — desktop ไม่โดนผลกระทบ
 */
(function () {
  if (!('ontouchstart' in window) && !navigator.maxTouchPoints) return;

  const THRESHOLD = 5;
  let src = null;
  let started = false;
  let lastOver = null;
  let dt = null;
  let ghost = null;
  let startX = 0, startY = 0;
  let lastDropAllowed = false;

  function makeDataTransfer() {
    const data = {};
    return {
      setData(type, val) { data[type] = String(val); },
      getData(type) { return data[type] || ''; },
      clearData(type) { if (type) delete data[type]; else Object.keys(data).forEach(k => delete data[k]); },
      setDragImage() {},
      effectAllowed: 'all',
      dropEffect: 'move',
      types: [],
      files: [],
      items: []
    };
  }

  function fireEvent(target, type, touch) {
    if (!target || !target.dispatchEvent) return true;
    const ev = new Event(type, { bubbles: true, cancelable: true });
    ev.dataTransfer = dt;
    try {
      Object.defineProperty(ev, 'clientX', { value: touch.clientX });
      Object.defineProperty(ev, 'clientY', { value: touch.clientY });
      Object.defineProperty(ev, 'pageX', { value: touch.pageX });
      Object.defineProperty(ev, 'pageY', { value: touch.pageY });
    } catch (e) {}
    return target.dispatchEvent(ev);
  }

  function findDraggable(el) {
    while (el && el !== document.body && el !== document) {
      if (el.getAttribute && el.getAttribute('draggable') === 'true') return el;
      el = el.parentElement;
    }
    return null;
  }

  function createGhost(el, t) {
    const rect = el.getBoundingClientRect();
    const g = el.cloneNode(true);
    g.style.position = 'fixed';
    g.style.left = (t.clientX - rect.width / 2) + 'px';
    g.style.top = (t.clientY - rect.height / 2) + 'px';
    g.style.width = rect.width + 'px';
    g.style.height = rect.height + 'px';
    g.style.opacity = '0.75';
    g.style.pointerEvents = 'none';
    g.style.zIndex = '99999';
    g.style.transform = 'scale(0.95)';
    g.style.transition = 'none';
    g.style.boxShadow = '0 6px 20px rgba(0,0,0,.4)';
    document.body.appendChild(g);
    return g;
  }

  function moveGhost(t) {
    if (!ghost) return;
    const rect = ghost.getBoundingClientRect();
    ghost.style.left = (t.clientX - rect.width / 2) + 'px';
    ghost.style.top = (t.clientY - rect.height / 2) + 'px';
  }

  function elementUnder(t) {
    if (ghost) ghost.style.display = 'none';
    const el = document.elementFromPoint(t.clientX, t.clientY);
    if (ghost) ghost.style.display = '';
    return el;
  }

  function cleanup() {
    if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
    ghost = null; src = null; started = false; lastOver = null; dt = null; lastDropAllowed = false;
  }

  document.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    const target = findDraggable(e.target);
    if (!target) return;
    src = target;
    started = false;
    dt = makeDataTransfer();
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true, capture: true });

  document.addEventListener('touchmove', (e) => {
    if (!src) return;
    const t = e.touches[0];
    if (!started) {
      if (Math.abs(t.clientX - startX) < THRESHOLD && Math.abs(t.clientY - startY) < THRESHOLD) return;
      started = true;
      fireEvent(src, 'dragstart', t);
      ghost = createGhost(src, t);
    }
    if (e.cancelable) e.preventDefault();
    moveGhost(t);
    const elUnder = elementUnder(t);
    if (elUnder !== lastOver) {
      if (lastOver) fireEvent(lastOver, 'dragleave', t);
      if (elUnder) fireEvent(elUnder, 'dragenter', t);
      lastOver = elUnder;
    }
    if (elUnder) {
      // dispatchEvent returns false if preventDefault was called → drop allowed
      lastDropAllowed = !fireEvent(elUnder, 'dragover', t);
    } else {
      lastDropAllowed = false;
    }
  }, { passive: false, capture: true });

  document.addEventListener('touchend', (e) => {
    if (!src) { cleanup(); return; }
    const t = e.changedTouches[0];
    if (started) {
      const elUnder = elementUnder(t);
      if (elUnder && lastDropAllowed) fireEvent(elUnder, 'drop', t);
      fireEvent(src, 'dragend', t);
    }
    cleanup();
  }, { passive: true, capture: true });

  document.addEventListener('touchcancel', () => { cleanup(); }, { passive: true, capture: true });
})();
