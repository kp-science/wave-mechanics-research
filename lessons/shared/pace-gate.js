/* ═══════════════════════════════════════════════════════════════════
 * PaceGate · Shared gate logic ใช้ใน EP03-EP08 boot
 * รองรับ 3 mode:
 *   - 'firebase' = subscribe RTDB (realtime <500ms · push)
 *   - 'local'    = BroadcastChannel + poll 2s (single-browser test)
 *   - 'remote'   = Apps Script poll 8s (legacy)
 *   - disabled   = ไม่มี pace · gate ไม่ทำงาน
 *
 * Usage จาก EP boot:
 *   const gate = PaceGate.create({ subject:'astronomy', ep:'ep04' });
 *   gate.wireButton(currentPageId, buttonEl, nextHref, { requireSubmit: true });
 *   gate.markSubmitted();
 *   gate.attachAnchor(currentPageId, anchorEl, nextHref);  // for footer next
 * ═══════════════════════════════════════════════════════════════════ */
(function (global) {
  function _flash(el) {
    if (!el) return;
    el.style.transition = 'transform .12s';
    el.style.transform = 'translateX(-6px)';
    setTimeout(() => { el.style.transform = 'translateX(6px)'; }, 100);
    setTimeout(() => { el.style.transform = ''; }, 200);
  }

  function _injectCss() {
    if (document.getElementById('pace-gate-css')) return;
    const s = document.createElement('style');
    s.id = 'pace-gate-css';
    s.textContent = `
      .pace-locked{color:#ff5c7a !important;cursor:not-allowed;
        animation:paceLockedPulse 1.6s ease-in-out infinite;}
      @keyframes paceLockedPulse{0%,100%{opacity:.7;}50%{opacity:1;}}
      .gate-open{animation:gateOpenGlow 1.5s ease-in-out infinite;}
      @keyframes gateOpenGlow{0%,100%{box-shadow:0 0 0 rgba(126,255,178,0);}50%{box-shadow:0 0 12px rgba(126,255,178,0.6);}}
    `;
    document.head.appendChild(s);
  }

  const PaceGate = {
    create(initOpts) {
      initOpts = initOpts || {};
      _injectCss();

      const gate = {
        _cfg: null,
        _initOpts: initOpts,
        _pollTimer: null,
        _bcChannel: null,
        _fbUnsub: null,
        _buttonEl: null,
        _anchorEl: null,
        _anchorOrigText: '',
        _pageId: null,
        _nextHref: null,
        _requireSubmit: false,
        _submitted: false,
        _teacherActive: false,
        _teacherOpen: false,
        _forceSolo: (new URLSearchParams(location.search)).get('solo') === '1',

        _resolve() {
          if (this._cfg) return this._cfg;
          this._cfg = (global.PaceResolver
            && global.PaceResolver.get(this._initOpts)) || { enabled: false };
          return this._cfg;
        },

        wireButton(pageId, buttonEl, nextHref, opts) {
          if (!buttonEl) return;
          opts = opts || {};
          this._buttonEl = buttonEl;
          this._anchorEl = null;
          this._pageId = pageId;
          this._nextHref = nextHref;
          this._requireSubmit = !!opts.requireSubmit;
          this._submitted = false;
          this._teacherActive = false;
          this._teacherOpen = false;
          this._renderButton();
          this._connect();
        },

        attachAnchor(pageId, anchorEl, nextHref) {
          if (!anchorEl) return;
          this._anchorEl = anchorEl;
          this._buttonEl = null;
          this._pageId = pageId;
          this._nextHref = nextHref;
          this._anchorOrigText = anchorEl.textContent;
          anchorEl.addEventListener('click', (e) => {
            if (this._cfg && this._cfg.enabled && this._teacherActive && !this._teacherOpen) {
              e.preventDefault();
              _flash(anchorEl);
            }
          });
          this._connect();
        },

        markSubmitted() {
          this._submitted = true;
          this._renderButton();
        },

        _connect() {
          this._resolve();
          if (this._forceSolo || !this._cfg.enabled) return;
          this._teardown();

          const onPace = (pace) => this._handlePace(pace);

          if (this._cfg.mode === 'firebase' && global.KPDB) {
            // realtime subscribe
            global.KPDB.watchPace(this._cfg.roomCode, onPace, { subject: this._cfg.subject });
            // also send presence
            try { global.KPDB.setPresence(this._cfg.roomCode, {}, { subject: this._cfg.subject }); } catch (e) {}
            this._fbUnsub = () => global.KPDB.unwatchPace();
          } else if (this._cfg.mode === 'local') {
            try {
              this._bcChannel = new BroadcastChannel('pace_' + this._cfg.roomCode);
              this._bcChannel.onmessage = (ev) => onPace(ev.data);
            } catch (e) {}
            this._poll(onPace);
            this._pollTimer = setInterval(() => this._poll(onPace), this._cfg.pollMs || 2000);
          } else {
            // remote (Apps Script)
            this._poll(onPace);
            this._pollTimer = setInterval(() => this._poll(onPace), this._cfg.pollMs || 8000);
          }
        },

        _poll(onPace) {
          if (!global.PaceClient) return;
          global.PaceClient.peek(this._cfg.apiUrl, this._cfg.roomCode, this._cfg.mode === 'local' ? 'local' : 'remote')
            .then(p => { if (p) onPace(p); else this._handlePace(null); })
            .catch(() => {});
        },

        _handlePace(pace) {
          if (!pace) {
            this._teacherActive = false;
            this._teacherOpen = false;
          } else {
            this._teacherActive = true;
            const pages = (global.EP_CONFIG && global.EP_CONFIG.pages) || [];
            const curIdx = pages.findIndex(p => p.id === this._pageId);
            const unlockedIdx = pages.findIndex(p => p.id === pace.unlockedUpTo);
            this._teacherOpen = (unlockedIdx >= curIdx + 1);
          }
          this._renderButton();
          this._renderAnchor();
        },

        _renderButton() {
          if (!this._buttonEl) return;
          if (this._teacherActive) {
            if (this._teacherOpen) this._setButtonOpen('▶ ไปต่อ (ประตูเปิด)', true);
            else this._setButtonLocked('🔒 รอครูเปิดประตู...');
            return;
          }
          if (this._requireSubmit && !this._submitted) {
            this._setButtonLocked('🔒 ส่งผลก่อน · จึงไปต่อได้');
          } else {
            this._setButtonOpen('▶ ไปต่อ', false);
          }
        },

        _setButtonOpen(text, withGlow) {
          this._buttonEl.disabled = false;
          this._buttonEl.textContent = text;
          if (withGlow) this._buttonEl.classList.add('gate-open');
          else this._buttonEl.classList.remove('gate-open');
          this._buttonEl.onclick = () => location.href = this._nextHref;
        },

        _setButtonLocked(text) {
          this._buttonEl.disabled = true;
          this._buttonEl.textContent = text;
          this._buttonEl.classList.remove('gate-open');
          this._buttonEl.onclick = null;
        },

        _renderAnchor() {
          if (!this._anchorEl) return;
          if (this._teacherActive && !this._teacherOpen) {
            this._anchorEl.classList.add('pace-locked');
            this._anchorEl.textContent = '🔒 รอครูปลดล็อค';
          } else {
            this._anchorEl.classList.remove('pace-locked');
            this._anchorEl.textContent = (this._teacherActive && this._teacherOpen ? '✓ ' : '') + this._anchorOrigText;
          }
        },

        _teardown() {
          if (this._pollTimer) { clearInterval(this._pollTimer); this._pollTimer = null; }
          if (this._bcChannel) { try { this._bcChannel.close(); } catch (e) {} this._bcChannel = null; }
          if (this._fbUnsub) { try { this._fbUnsub(); } catch (e) {} this._fbUnsub = null; }
        },

        soloMode(buttonEl, nextHref) { this.wireButton(null, buttonEl, nextHref); }
      };

      return gate;
    }
  };

  global.PaceGate = PaceGate;
})(window);
