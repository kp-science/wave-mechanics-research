/* ===== COSMOS LOG · Touch Drag-Drop Helper · EP03 ===== */
/* HTML5 drag-drop ไม่ fire บน iPad/touch device                              */
/* ใช้คู่กับ HTML5 drag-drop เดิม · ไม่ทับซ้อน เพราะ touch event ไม่ trigger drag */
/*                                                                            */
/* Usage:                                                                     */
/*   TouchDrag.makeDraggable(token, () => ({type:'star', id:'sirius'}));      */
/*   TouchDrag.makeDropTarget(zone, (payload, clientX, clientY) => {          */
/*     // handle drop · return true if accepted (visual feedback)             */
/*   });                                                                      */
/*                                                                            */
/* ghost element = cloneNode ของ token · ตามนิ้วระหว่างลาก                    */
/* ใช้ document.elementsFromPoint หา drop target ตอน touchend                 */

(function(global){
  const TouchDrag = {
    current: null,  // { payload, ghost, sourceEl, offsetX, offsetY }

    makeDraggable(el, getPayload, opts) {
      opts = opts || {};
      el.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        if (el.classList.contains('placed') || el.disabled) return;
        e.preventDefault();
        const payload = typeof getPayload === 'function' ? getPayload() : getPayload;
        if (payload == null) return;
        const t = e.touches[0];
        const rect = el.getBoundingClientRect();
        const ghost = el.cloneNode(true);
        ghost.style.position = 'fixed';
        ghost.style.pointerEvents = 'none';
        ghost.style.zIndex = '99999';
        ghost.style.opacity = '0.85';
        ghost.style.transform = 'scale(1.1)';
        ghost.style.boxShadow = '0 6px 22px rgba(100,216,255,0.5)';
        ghost.style.transition = 'none';
        ghost.style.margin = '0';
        ghost.style.width = rect.width + 'px';
        ghost.style.height = rect.height + 'px';
        ghost.style.left = (t.clientX - rect.width/2) + 'px';
        ghost.style.top  = (t.clientY - rect.height/2) + 'px';
        document.body.appendChild(ghost);
        this.current = {
          payload, ghost, sourceEl: el,
          offsetX: rect.width/2, offsetY: rect.height/2,
          lastTarget: null,
        };
        if (opts.onStart) opts.onStart(payload);
      }, { passive: false });

      el.addEventListener('touchmove', (e) => {
        if (!this.current || this.current.sourceEl !== el) return;
        e.preventDefault();
        const t = e.touches[0];
        const g = this.current.ghost;
        if (g) {
          g.style.left = (t.clientX - this.current.offsetX) + 'px';
          g.style.top  = (t.clientY - this.current.offsetY) + 'px';
        }
        // hover feedback
        const hit = this._findDropTarget(t.clientX, t.clientY);
        if (hit !== this.current.lastTarget) {
          if (this.current.lastTarget) this.current.lastTarget.classList.remove('touch-drag-over');
          if (hit) hit.classList.add('touch-drag-over');
          this.current.lastTarget = hit;
        }
      }, { passive: false });

      el.addEventListener('touchend', (e) => {
        if (!this.current || this.current.sourceEl !== el) return;
        const t = e.changedTouches[0];
        const target = this._findDropTarget(t.clientX, t.clientY);
        if (target && target.__touchDrop) {
          try { target.__touchDrop(this.current.payload, t.clientX, t.clientY); } catch (err) { console.warn('touchDrop err', err); }
        }
        this._cleanup();
      });

      el.addEventListener('touchcancel', () => this._cleanup());
    },

    makeDropTarget(el, onDrop) {
      el.__touchDrop = onDrop;
      el.classList.add('touch-drop-target');
    },

    _findDropTarget(x, y) {
      const els = document.elementsFromPoint(x, y);
      for (const el of els) {
        if (el.__touchDrop) return el;
      }
      return null;
    },

    _cleanup() {
      if (!this.current) return;
      if (this.current.ghost) this.current.ghost.remove();
      if (this.current.lastTarget) this.current.lastTarget.classList.remove('touch-drag-over');
      this.current = null;
    },
  };

  global.TouchDrag = TouchDrag;

  // Inject minimal CSS for hover state if not present
  if (!document.getElementById('__touchdrag_css')) {
    const s = document.createElement('style');
    s.id = '__touchdrag_css';
    s.textContent = '.touch-drag-over { outline:2px dashed #64d8ff; outline-offset:3px; }';
    document.head.appendChild(s);
  }
})(window);
