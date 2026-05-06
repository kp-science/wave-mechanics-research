/* ===== COSMOS LOG · EP07 Page Bootstrap =====
 * Light boot focused on EP07 integration:
 *   KPA v2 + HUD v2 + PBL frame + Mystery Box v2 + Coin/Energy + Research instruments
 * Each EP07 page calls Boot.init({ pageId }).
 */
(function(global){
  const Boot = {
    init(opts){
      opts = opts || {};
      const pageId = (document.body && document.body.dataset.page) || opts.pageId || '?';

      // background
      try { global.Starfield && global.Starfield.init && global.Starfield.init(); } catch(e){}

      // Auto-load story-bridge.js if not already loaded
      this._ensureStoryBridge(pageId);

      // Inject footer (prev/next)
      this._injectFooter(pageId);
      this._injectTopBar(pageId);

      // OS counter from local
      const osState = JSON.parse(localStorage.getItem('cosmosLog_ep07_os') || '[]');
      const cfg = global.EP_CONFIG || {};
      if (global.HUD) {
        HUD.config({
          os:{ got: osState.length, total: (cfg.os||[]).length || 4 },
          mb:{ got: (KPA.economy().boxes||[]).length, total: 7 }
        });
      }

      // Auto-trigger mystery box if this page is a research checkpoint
      this._maybeOfferBox(pageId);

      // Page-level events
      window.addEventListener('beforeunload', () => global.KPA && KPA.stopDwell());

      // Notify page ready
      window.dispatchEvent(new CustomEvent('ep07:ready', { detail:{ pageId }}));
    },

    _injectFooter(pageId){
      if (document.getElementById('ep07Footer')) return;
      const pages = (global.EP_CONFIG && global.EP_CONFIG.pages) || [];
      const idx = pages.findIndex(p => p.id === pageId);
      const prev = idx > 0 ? pages[idx-1] : null;
      const next = idx >= 0 && idx < pages.length-1 ? pages[idx+1] : null;
      const foot = document.createElement('div');
      foot.id = 'ep07Footer';
      foot.innerHTML = `
        <a href="${prev ? prev.file : '#'}" class="ep07-nav prev" style="${prev?'':'visibility:hidden;'}">
          ← ${prev ? prev.id + ' ' + (prev.title||'') : ''}
        </a>
        <div class="ep07-progress">EP07 · ${pageId} · ${idx+1}/${pages.length||28}</div>
        <a href="${next ? next.file : '#'}" class="ep07-nav next" id="ep07NextBtn" style="${next?'':'visibility:hidden;'}">
          ${next ? (next.title||'') + ' ' + next.id + ' →' : ''}
        </a>
      `;
      document.body.appendChild(foot);
      document.body.style.paddingBottom = '54px';
      // Wire teacher-pace gate to footer next anchor
      if (next) {
        const nextAnchor = foot.querySelector('#ep07NextBtn');
        global.EP07Gate && global.EP07Gate.attach(pageId, nextAnchor, next.file);
      }
    },

    _injectTopBar(){
      // PBL frame already adds top padding · keep this minimal
    },

    _ensureStoryBridge(pageId){
      // If already loaded, just inject the bridge for this page
      if (global.StoryBridge && typeof global.StoryBridge.inject === 'function') {
        setTimeout(() => global.StoryBridge.inject(), 30);
        return;
      }
      // Find current script src to derive shared/ path
      const scripts = document.getElementsByTagName('script');
      let base = '../shared/';
      for (let i=0;i<scripts.length;i++){
        const s = scripts[i].src || '';
        const m = s.match(/(.*shared\/)/);
        if (m) { base = m[1]; break; }
      }
      const tag = document.createElement('script');
      tag.src = base + 'story-bridge.js';
      tag.onload = () => {
        if (global.StoryBridge && typeof global.StoryBridge.inject === 'function') {
          global.StoryBridge.inject();
        }
      };
      document.head.appendChild(tag);
    },

    _maybeOfferBox(pageId){
      const cfg = global.EP_CONFIG || {};
      const boxes = cfg.mysteryBoxes || [];
      const spec = boxes.find(b => b.page === pageId);
      if (!spec || !global.MysteryBoxV2) return;
      // wait for the user to dismiss the Story Screen first
      const offer = () => {
        const summary = global.KPA ? KPA.summary() : {};
        const snapshot = Object.assign({
          'เหรียญสะสม': (summary.coins||0) + ' 🪙',
          'พลังงาน': (summary.energy||0) + ' ⚡',
          'OS ที่ได้': (summary.domains?Object.keys(summary.domains).length:0)
        }, spec.snapshot || {});
        MysteryBoxV2.offer({
          id: spec.id, page: pageId,
          checkpoint: spec.checkpoint,
          reward: spec.reward,
          cosmetic: spec.cosmetic,
          prompt: spec.prompt,
          snapshot
        });
      };
      window.addEventListener('ep07:storyEntered', function _h(){
        window.removeEventListener('ep07:storyEntered', _h);
        setTimeout(offer, spec.delay || 600);
      });
    },

    /* utility for pages to grant OS shard */
    grantOS(osId){
      const arr = JSON.parse(localStorage.getItem('cosmosLog_ep07_os') || '[]');
      if (!arr.includes(osId)) {
        arr.push(osId);
        localStorage.setItem('cosmosLog_ep07_os', JSON.stringify(arr));
        if (global.HUD) HUD.incOS();
        // refresh mission log if loaded
        if (global.StoryBridge && typeof global.StoryBridge.inject === 'function') {
          global.StoryBridge.inject();
        }
      }
      if (global.KPA) KPA.research('osGranted', { osId });
      window.dispatchEvent(new CustomEvent('ep07:os', { detail:{ osId } }));
    },
    osList(){
      return JSON.parse(localStorage.getItem('cosmosLog_ep07_os') || '[]');
    }
  };

  function _css(){
    if (document.getElementById('ep07-boot-css')) return;
    const s = document.createElement('style');
    s.id = 'ep07-boot-css';
    s.textContent = `
      #ep07Footer{position:fixed;bottom:0;left:0;right:0;z-index:60;
        background:rgba(4,8,16,.94);backdrop-filter:blur(8px);
        border-top:1px solid rgba(255,138,61,.22);
        display:flex;justify-content:space-between;align-items:center;
        padding:10px 14px;font-size:13px;}
      .ep07-nav{color:#ff8a3d;text-decoration:none;font-weight:600;}
      .ep07-nav.prev{color:#7ad6ff;}
      .ep07-progress{color:#7a8aa8;font-size:11px;letter-spacing:.1em;}
      @media(max-width:600px){
        #ep07Footer{font-size:11px;padding:8px 8px;}
      }
    `;
    document.head.appendChild(s);
  }
  document.addEventListener('DOMContentLoaded', _css);

  global.EP07Boot = Boot;
  global.Boot07 = Boot;

  /* ============ Teacher Pace Gate (lazy-loaded pace-client + resolver) ============ */
  const Gate = {
    _pollTimer: null,
    _anchor: null,
    _pageId: null,
    _href: null,
    _label: '',
    _cfg: null,
    _ready: false,

    attach(pageId, anchor, href){
      if (!anchor) return;
      this._anchor = anchor;
      this._pageId = pageId;
      this._href = href;
      this._label = anchor.textContent;
      // intercept click — block when locked
      anchor.addEventListener('click', (e) => {
        if (this._cfg && this._cfg.enabled && this._teacherActive && !this._teacherOpen) {
          e.preventDefault();
          this._flash();
        }
      });
      this._loadDeps().then(() => {
        this._cfg = (global.PaceResolver && global.PaceResolver.get({ subject:'astronomy', ep:'ep07' })) || { enabled:false };
        if (!this._cfg.enabled) return;
        this._ready = true;
        this._check();
        this._pollTimer = setInterval(() => this._check(), this._cfg.pollMs || 2000);
        if (this._cfg.mode === 'local') {
          try {
            const ch = new BroadcastChannel('pace_' + this._cfg.roomCode);
            ch.onmessage = () => this._check();
          } catch {}
        }
      }).catch(() => {});
    },

    _loadDeps(){
      const base = '../../shared/';
      const epShared = '../shared/';
      const load = (src, globalKey) => new Promise((res, rej) => {
        if (globalKey && global[globalKey]) return res();
        const s = document.createElement('script');
        s.src = src; s.onload = res; s.onerror = rej;
        document.head.appendChild(s);
      });
      // load order: firebase-config → kpdb → pace-client → pace-resolver
      return load(epShared + 'firebase-config.js', 'FirebaseConfig')
        .catch(() => {})
        .then(() => load(base + 'kpdb.js', 'KPDB'))
        .then(() => { if (global.KPDB) global.KPDB.init({ subject: 'astronomy', unit: 'ep07' }); })
        .then(() => load(base + 'pace-client.js', 'PaceClient'))
        .then(() => load(base + 'pace-resolver.js', 'PaceResolver'));
    },

    _check(){
      if (!this._ready || !global.PaceClient || !this._cfg || !this._cfg.enabled) return;
      PaceClient.peek(this._cfg.apiUrl, this._cfg.roomCode, this._cfg.mode).then(pace => {
        if (!pace) { this._teacherActive = false; this._teacherOpen = false; }
        else {
          this._teacherActive = true;
          const pages = (global.EP_CONFIG && global.EP_CONFIG.pages) || [];
          const curIdx = pages.findIndex(p => p.id === this._pageId);
          const unlockedIdx = pages.findIndex(p => p.id === pace.unlockedUpTo);
          this._teacherOpen = (unlockedIdx >= curIdx + 1);
          // ⭐ Auto-jump: ถ้าครูเปิด Auto-jump · countdown แล้วเด้งหน้าใหม่
          try {
            const pages = (global.EP_CONFIG && global.EP_CONFIG.pages) || [];
            global.PaceResolver && global.PaceResolver.maybeForceJump(pace, this._pageId, pages);
          } catch(_){}
        }
        this._render();
      }).catch(() => {});
    },

    _render(){
      if (!this._anchor) return;
      if (this._teacherActive && !this._teacherOpen) {
        this._anchor.classList.add('pace-locked');
        this._anchor.textContent = '🔒 รอครูปลดล็อค';
      } else {
        this._anchor.classList.remove('pace-locked');
        this._anchor.textContent = (this._teacherActive && this._teacherOpen ? '✓ ' : '') + this._label;
      }
    },

    _flash(){
      if (!this._anchor) return;
      this._anchor.style.transition = 'transform .12s';
      this._anchor.style.transform = 'translateX(-6px)';
      setTimeout(() => { this._anchor.style.transform = 'translateX(6px)'; }, 100);
      setTimeout(() => { this._anchor.style.transform = ''; }, 200);
    }
  };
  global.EP07Gate = Gate;

  // pace-locked styling
  (function injectGateCss(){
    if (document.getElementById('ep07-gate-css')) return;
    document.addEventListener('DOMContentLoaded', () => {
      if (document.getElementById('ep07-gate-css')) return;
      const s = document.createElement('style');
      s.id = 'ep07-gate-css';
      s.textContent = `
        .ep07-nav.pace-locked{color:#ff5c7a !important;cursor:not-allowed;
          animation:ep07PaceLockedPulse 1.6s ease-in-out infinite;}
        @keyframes ep07PaceLockedPulse{0%,100%{opacity:.7;}50%{opacity:1;}}
      `;
      document.head.appendChild(s);
    });
  })();
})(window);
