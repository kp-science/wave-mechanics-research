/* ===== COSMOS LOG · EP04 Page Bootstrap ===== */
/* Boot · Chain · Gate · Submit · ใช้ pattern เดียวกับ EP03                  */

(function(global){
  const Boot = {
    init(opts={}) {
      // Atmospheric · auto-init starfield BG + audio toggle
      global.Starfield && global.Starfield.init();
      global.SFX && global.SFX.init();
      // Sync auto-init solo room
      global.Sync && global.Sync.init();
      if (global.Sync && !global.Sync.getState()) {
        global.Sync.createRoom({ code: 'SOLO' });
      }
      // Firebase lazy
      if (global.FirebaseConfig && global.FirebaseConfig.isConfigured && global.FirebaseConfig.isConfigured()) {
        global.FirebaseConfig.init().then(() => {
          global.Sync._adapter = global.Sync._firebaseAdapter();
          global.Sync._adapter.init && global.Sync._adapter.init();
          if (global.Sync.getRoomCode()) global.Sync._adapter.joinRoom(global.Sync.getRoomCode());
        }).catch(e => console.warn('Firebase init failed:', e));
      }

      const pageId = (document.body && document.body.dataset.page) || opts.pageId;
      if (pageId) {
        setTimeout(() => {
          global.Photon && global.Photon.renderPill && global.Photon.renderPill();
          global.Coin && global.Coin.renderPill && global.Coin.renderPill();
          global.Role && global.Role.renderBadge && global.Role.renderBadge();
          global.Role && global.Role.applyToPage && global.Role.applyToPage(document.body);
        }, 50);
      }

      global.Sync && global.Sync.on && global.Sync.on(() => {
        global.Photon && global.Photon.renderPill && global.Photon.renderPill();
        global.Role && global.Role.renderBadge && global.Role.renderBadge();
      });

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
        <div style="font-family:Orbitron,monospace;font-size:10px;color:#6a7394;letter-spacing:0.15em;">EP04 · ${pageId||''} · ${idx>=0?(idx+1)+'/'+pages.length:''}</div>
        <a href="${next ? next.file : '#'}" style="color:${next?'#7effb2':'#444'};text-decoration:none;font-size:12px;pointer-events:${next?'auto':'none'};">${next?next.title+' '+next.id+' →':''}</a>
      `;
      document.body.appendChild(foot);
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Boot.init());
  } else {
    setTimeout(() => Boot.init(), 0);
  }
  global.EP04Boot = Boot;

  /* ============ Chain ============ */
  const CHAIN_KEY = 'cosmosLog_ep04_chain';
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

  /* ============ Gate ============ */
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
      if (this._teacherActive) {
        if (this._teacherOpen) this._setOpen(true);
        else this._setLocked('🔒 รอครูเปิดประตู...');
        return;
      }
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

    soloMode(buttonEl, nextHref) { this.wireButton(null, buttonEl, nextHref); },
    watch() {},
  };
  global.Gate = Gate;

  /* ============ Submit ============ */
  const Submit = {
    record(page, payload) {
      const key = 'cosmosLog_ep04_submit_' + page;
      const existing = this.load(page);
      const merged = Object.assign({}, existing, payload, { submittedAt: Date.now() });
      try { localStorage.setItem(key, JSON.stringify(merged)); } catch {}
      global.Sync && global.Sync.recordDecision && global.Sync.recordDecision({
        tag: '💾 ' + page, note: JSON.stringify(payload).slice(0, 100)
      });
      return merged;
    },
    load(page) {
      try { return JSON.parse(localStorage.getItem('cosmosLog_ep04_submit_' + page)) || {}; } catch { return {}; }
    },
    wirePair(opts) {
      const submitBtn = document.querySelector('.submit-btn');
      const nextBtn = document.querySelector('.next-btn');
      if (submitBtn) {
        submitBtn.onclick = () => {
          if (submitBtn.classList.contains('done')) return;
          const payload = opts.getPayload ? opts.getPayload() : {};
          // Validation hook: if returns false, abort
          if (opts.validate && !opts.validate(payload)) return;
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
        Gate.wireButton(opts.page, nextBtn, opts.nextHref, { requireSubmit: true });
      }
    },
  };
  global.Submit = Submit;

  /* ============ Transition · cinematic ============ */
  const Transition = {
    play(tag, callback) {
      const el = document.createElement('div');
      el.style.cssText = 'position:fixed; inset:0; z-index:400; pointer-events:none;';
      let html = '', dur = 900;
      switch(tag) {
        case 'WARP_APPROACH':
          html = `<div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 50%, rgba(100,216,255,0.4), transparent 70%); animation:warpApp 0.9s;"></div>`;
          break;
        case 'WARP_JUMP':
          html = `<div style="position:absolute;inset:0;background:linear-gradient(90deg,#000,#b980ff,#000); animation:warpJump 1.2s;"></div>`;
          dur = 1200;
          break;
        case 'EXPLOSION':
          html = `<div style="position:absolute;inset:0;background:radial-gradient(circle, #fff 0%, #ff5c7a 30%, transparent 70%); animation:expl 1s;"></div>`;
          dur = 1000;
          break;
        case 'VOID_REVEAL':
          html = `<div style="position:absolute;inset:0;background:linear-gradient(180deg,#000,#3a0a4a,#000); animation:voidRev 1.4s;"></div>`;
          dur = 1400;
          break;
        case 'VORTEX':
          html = `<div style="position:absolute;inset:0;background:conic-gradient(from 0deg,#b980ff,#ff5c7a,#000,#b980ff); animation:vortex 1.4s;"></div>`;
          dur = 1400;
          break;
        default:
          callback && callback(); return;
      }
      el.innerHTML = html;
      if (!document.getElementById('trnStyle')) {
        const s = document.createElement('style');
        s.id = 'trnStyle';
        s.textContent = `
          @keyframes warpApp { 0%{opacity:0;} 50%{opacity:1;} 100%{opacity:0;} }
          @keyframes warpJump { 0%{opacity:0; transform:scaleX(0.1);} 50%{opacity:1; transform:scaleX(2);} 100%{opacity:0;} }
          @keyframes expl { 0%{opacity:0; transform:scale(0.2);} 30%{opacity:1; transform:scale(1.2);} 100%{opacity:0; transform:scale(2);} }
          @keyframes voidRev { 0%{opacity:0; transform:translateY(-100%);} 50%{opacity:1; transform:translateY(0);} 100%{opacity:0; transform:translateY(100%);} }
          @keyframes vortex { 0%{opacity:0; transform:scale(0.3) rotate(0);} 60%{opacity:1; transform:scale(1.5) rotate(540deg);} 100%{opacity:0; transform:scale(3) rotate(720deg);} }
        `;
        document.head.appendChild(s);
      }
      document.body.appendChild(el);
      global.SFX && global.SFX.play('transition');
      setTimeout(() => { el.remove(); callback && callback(); }, dur);
    },
  };
  global.Transition = Transition;
})(window);
