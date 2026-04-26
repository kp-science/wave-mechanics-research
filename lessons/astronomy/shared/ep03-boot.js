/* ===== COSMOS LOG · EP03 Page Bootstrap ===== */
/* รวม init ทุก module · เรียก 1 บรรทัดจากหน้า page · ลด boilerplate         */

(function(global){
  const Boot = {
    init(opts={}) {
      // Sync
      global.Sync && global.Sync.init();
      // Auto-create solo room if no state · so Photon/VoidHunter work offline
      if (global.Sync && !global.Sync.getState()) {
        global.Sync.createRoom({ code: 'SOLO' });
      }
      // Firebase lazy-load if configured
      if (global.FirebaseConfig && global.FirebaseConfig.isConfigured && global.FirebaseConfig.isConfigured()) {
        global.FirebaseConfig.init().then(() => {
          // re-init sync with firebase adapter
          global.Sync._adapter = global.Sync._firebaseAdapter();
          global.Sync._adapter.init && global.Sync._adapter.init();
          if (global.Sync.getRoomCode()) global.Sync._adapter.joinRoom(global.Sync.getRoomCode());
        }).catch(e => console.warn('Firebase init failed, using fallback:', e));
      }

      // Page meta
      const pageId = (document.body && document.body.dataset.page) || opts.pageId;
      if (pageId) {
        // Redirect to join if no room (except p00, p01)
        const free = ['p00','p01'];
        if (!free.includes(pageId) && !global.Sync.getRoomCode()) {
          // allow solo play but suggest join
          console.log('[EP03] solo mode (no room)');
        }
        // Tick VOIDHUNTER for non-safe pages
        setTimeout(() => {
          global.VoidHunter && global.VoidHunter.tickOnPage(pageId);
          global.VoidHunter && global.VoidHunter.renderHUD();
          global.Photon && global.Photon.renderPill();
          global.Coin && global.Coin.renderPill();
          global.Role && global.Role.renderBadge();
          global.Role && global.Role.applyToPage(document.body);
        }, 50);
      }

      // Re-render HUD on state change
      global.Sync && global.Sync.on(() => {
        global.VoidHunter && global.VoidHunter.renderHUD();
        global.Photon && global.Photon.renderPill();
        global.Role && global.Role.renderBadge();
      });

      // Inject page footer nav
      this._injectFooter(pageId);
      this._injectTopBar();
    },

    _injectFooter(pageId) {
      if (document.getElementById('epFooter')) return;
      const pages = (global.EP_CONFIG && global.EP_CONFIG.pages) || [];
      const idx = pages.findIndex(p => p.id === pageId);
      const prev = idx > 0 ? pages[idx-1] : null;
      const next = idx >= 0 && idx < pages.length-1 ? pages[idx+1] : null;
      const foot = document.createElement('div');
      foot.id = 'epFooter';
      foot.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:40;padding:8px 14px;background:rgba(5,6,15,0.92);border-top:1px solid rgba(120,140,220,0.18);display:flex;justify-content:space-between;align-items:center;gap:8px;backdrop-filter:blur(10px);';
      foot.innerHTML = `
        <a href="${prev ? prev.file : '#'}" style="color:${prev?'#64d8ff':'#444'};text-decoration:none;font-size:12px;pointer-events:${prev?'auto':'none'};">${prev?'← '+prev.id+' '+prev.title:''}</a>
        <div style="font-family:Orbitron,monospace;font-size:10px;color:#6a7394;letter-spacing:0.15em;">EP03 · ${pageId||''} · ${idx>=0?(idx+1)+'/'+pages.length:''}</div>
        <a href="${next ? next.file : '#'}" style="color:${next?'#7effb2':'#444'};text-decoration:none;font-size:12px;pointer-events:${next?'auto':'none'};">${next?next.title+' '+next.id+' →':''}</a>
      `;
      document.body.appendChild(foot);
      // Add bottom padding to body so footer doesn't overlap
      document.body.style.paddingBottom = '50px';
    },

    _injectTopBar() {
      if (document.getElementById('epTopBar')) return;
      const bar = document.createElement('div');
      bar.id = 'epTopBar';
      bar.style.cssText = 'height:40px;';
      document.body.insertBefore(bar, document.body.firstChild);
    },
  };

  // auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Boot.init());
  } else {
    setTimeout(() => Boot.init(), 0);
  }

  global.EP03Boot = Boot;

  /* ============ Chain · state carry between pages ============ */
  const CHAIN_KEY = 'cosmosLog_ep03_chain';
  const Chain = {
    _data() { try { return JSON.parse(localStorage.getItem(CHAIN_KEY)) || {}; } catch { return {}; } },
    get(key) { return this._data()[key]; },
    set(key, val) {
      const d = this._data(); d[key] = val;
      try { localStorage.setItem(CHAIN_KEY, JSON.stringify(d)); } catch {}
    },
    all() { return this._data(); },
    clear() { try { localStorage.removeItem(CHAIN_KEY); } catch {} },
  };
  global.Chain = Chain;

  /* ============ Gate · NEXT button gating ============ */
  /* เงื่อนไขปลดล็อก:                                                    */
  /*   1. นักเรียนกดปุ่ม "ส่งผล/บันทึก" (ถ้า requireSubmit=true)         */
  /*   2. ครูเปิดประตู (กรณี teacher pace ทำงาน)                         */
  /* ?solo=1 = ignore ครู · ใช้ submit gate อย่างเดียว                   */
  const Gate = {
    _pollTimer: null,
    _currentPage: null,
    _nextHref: null,
    _buttonEl: null,
    _forceSolo: (new URLSearchParams(location.search)).get('solo') === '1',
    _requireSubmit: false,
    _submitted: false,
    _teacherActive: false,
    _teacherOpen: false,

    wireButton(currentPageId, buttonEl, nextHref, opts) {
      if (!buttonEl) return;
      opts = opts || {};
      this._currentPage = currentPageId;
      this._nextHref = nextHref;
      this._buttonEl = buttonEl;
      this._requireSubmit = !!opts.requireSubmit;
      this._submitted = false;
      this._teacherActive = false;
      this._teacherOpen = false;

      this._update();

      // ?solo=1 → skip teacher polling
      if (this._forceSolo) return;

      this._check();
      if (this._pollTimer) clearInterval(this._pollTimer);
      this._pollTimer = setInterval(() => this._check(), 2000);
      try {
        const ch = new BroadcastChannel('pace_default');
        ch.onmessage = () => this._check();
      } catch {}
    },

    markSubmitted() {
      this._submitted = true;
      this._update();
    },

    _check() {
      if (!global.PaceClient || !this._buttonEl) return;
      PaceClient.peek(null, 'default', 'local').then(pace => {
        if (!pace) {
          // ครูยังไม่ set pace = ไม่ active · ใช้ submit gate
          this._teacherActive = false;
          this._teacherOpen = false;
        } else {
          this._teacherActive = true;
          const pages = (global.EP_CONFIG && global.EP_CONFIG.pages) || [];
          const curIdx = pages.findIndex(p => p.id === this._currentPage);
          const unlockedIdx = pages.findIndex(p => p.id === pace.unlockedUpTo);
          this._teacherOpen = (unlockedIdx >= curIdx + 1);
        }
        this._update();
      }).catch(() => {
        this._teacherActive = false;
        this._teacherOpen = false;
        this._update();
      });
    },

    _update() {
      if (!this._buttonEl) return;
      // ครูควบคุมอยู่ → ครูตัดสิน (override submit gate)
      if (this._teacherActive) {
        if (this._teacherOpen) this._setOpen(true);
        else this._setLocked('🔒 รอครูเปิดประตู...');
        return;
      }
      // ไม่มีครู · ใช้ submit gate
      if (this._requireSubmit && !this._submitted) {
        this._setLocked('🔒 ส่งผลก่อน · จึงไปต่อได้');
      } else {
        this._setOpen(false);
      }
    },

    _setOpen(withGateHighlight) {
      if (!this._buttonEl) return;
      this._buttonEl.disabled = false;
      this._buttonEl.textContent = withGateHighlight ? '▶ ไปต่อ (ประตูเปิด)' : '▶ ไปต่อ';
      if (withGateHighlight) this._buttonEl.classList.add('gate-open');
      else this._buttonEl.classList.remove('gate-open');
      this._buttonEl.onclick = () => location.href = this._nextHref;
    },
    _setLocked(text) {
      if (!this._buttonEl) return;
      this._buttonEl.disabled = true;
      this._buttonEl.textContent = text || '🔒 รอครูเปิดประตู...';
      this._buttonEl.classList.remove('gate-open');
      this._buttonEl.onclick = null;
    },

    // Legacy alias · narrative pages without submit
    soloMode(buttonEl, nextHref) { this.wireButton(null, buttonEl, nextHref); },
    watch() { /* no-op · internal now */ },
  };
  global.Gate = Gate;

  /* ============ Submit · save answer + record decision ============ */
  const Submit = {
    record(page, payload) {
      const key = 'cosmosLog_ep03_submit_' + page;
      const existing = this.load(page);
      const merged = Object.assign({}, existing, payload, { submittedAt: Date.now() });
      try { localStorage.setItem(key, JSON.stringify(merged)); } catch {}
      global.Sync && global.Sync.recordDecision && global.Sync.recordDecision({
        tag: '💾 ' + page, note: JSON.stringify(payload).slice(0, 100)
      });
      return merged;
    },
    load(page) {
      try { return JSON.parse(localStorage.getItem('cosmosLog_ep03_submit_' + page)) || {}; } catch { return {}; }
    },
    // wire Submit + Next buttons pattern
    wirePair(opts) {
      // opts: { page, nextHref, getPayload, isPerfect, onSubmit }
      const submitBtn = document.querySelector('.submit-btn');
      const nextBtn = document.querySelector('.next-btn');
      if (submitBtn) {
        submitBtn.onclick = () => {
          if (submitBtn.classList.contains('done')) return;
          const payload = opts.getPayload ? opts.getPayload() : {};
          this.record(opts.page, payload);
          submitBtn.classList.add('done');
          submitBtn.disabled = true;
          submitBtn.textContent = '✓ ส่งแล้ว';
          Gate.markSubmitted();
          if (opts.isPerfect && opts.isPerfect(payload)) {
            const n = global.Coin && Coin.awardPerfect && Coin.awardPerfect(opts.page);
            if (n) opts.onSubmit && opts.onSubmit('perfect', n);
          } else {
            opts.onSubmit && opts.onSubmit('ok');
          }
        };
      }
      if (nextBtn) {
        // Lock until: (1) submit pressed, OR (2) teacher opens gate
        Gate.wireButton(opts.page, nextBtn, opts.nextHref, { requireSubmit: true });
      }
    },
  };
  global.Submit = Submit;
})(window);
