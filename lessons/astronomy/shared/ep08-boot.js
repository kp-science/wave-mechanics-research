/* ===== COSMOS LOG · EP08 Page Bootstrap =====
 * Clone ของ ep07-boot · key prefix `cosmosLog_ep08_`
 * Loads KPA v2 + HUD v2 + PBL frame + Mystery Box v2 + Coin/Energy + Story Bridge
 * Each EP08 page calls Boot.init({ pageId }).
 */
(function(global){
  const Boot = {
    init(opts){
      opts = opts || {};
      const pageId = (document.body && document.body.dataset.page) || opts.pageId || '?';

      try { global.Starfield && global.Starfield.init && global.Starfield.init(); } catch(e){}

      // EP08 ไม่ใช้ story-bridge (ทุกหน้ามี <details class="story-tab"> ของตัวเอง)
      // this._ensureStoryBridge(pageId);
      this._injectFooter(pageId);

      const keysState = JSON.parse(localStorage.getItem('cosmosLog_ep08_keys') || '[]');
      const cfg = global.EP_CONFIG || {};
      if (global.HUD) {
        HUD.config({
          os: { got: keysState.length, total: 17 },
          mb: { got: (KPA && KPA.economy && KPA.economy().boxes||[]).length || 0, total: 8 }
        });
      }

      this._maybeOfferBox(pageId);

      window.addEventListener('beforeunload', () => global.KPA && KPA.stopDwell());
      window.dispatchEvent(new CustomEvent('ep08:ready', { detail:{ pageId } }));
    },

    _injectFooter(pageId){
      if (document.getElementById('ep08Footer')) return;
      const pages = (global.EP_CONFIG && global.EP_CONFIG.pages) || [];
      const idx = pages.findIndex(p => p.id === pageId);
      const prev = idx > 0 ? pages[idx-1] : null;
      const next = idx >= 0 && idx < pages.length-1 ? pages[idx+1] : null;
      const foot = document.createElement('div');
      foot.id = 'ep08Footer';
      foot.innerHTML = `
        <a href="${prev ? prev.file : '#'}" class="ep08-nav prev" style="${prev?'':'visibility:hidden;'}">
          ← ${prev ? prev.id + ' ' + (prev.title||'') : ''}
        </a>
        <div class="ep08-progress">EP08 · ${pageId} · ${idx+1}/${pages.length||28}</div>
        <a href="${next ? next.file : '#'}" class="ep08-nav next" id="ep08NextBtn" style="${next?'':'visibility:hidden;'}">
          ${next ? (next.title||'') + ' ' + next.id + ' →' : ''}
        </a>
      `;
      document.body.appendChild(foot);
      document.body.style.paddingBottom = '54px';
      if (next) {
        const nextAnchor = foot.querySelector('#ep08NextBtn');
        global.EP08Gate && global.EP08Gate.attach(pageId, nextAnchor, next.file);
      }
    },

    _ensureStoryBridge(pageId){
      // EP08 ไม่ใช้ story-bridge (มี <details class="story-tab"> ในแต่ละหน้า)
      return;
    },

    _maybeOfferBox(pageId){
      const cfg = global.EP_CONFIG || {};
      const boxes = cfg.mysteryBoxes || [];
      const spec = boxes.find(b => b.page === pageId);
      if (!spec || !global.MysteryBoxV2) return;
      const offer = () => {
        const summary = global.KPA ? KPA.summary() : {};
        const snapshot = Object.assign({
          'เหรียญสะสม': (summary.coins||0) + ' 🪙',
          'พลังงาน': (summary.energy||0) + ' ⚡',
          'S1 keys': (global.S1Keyring ? S1Keyring.count().owned : 0) + '/17'
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
      window.addEventListener('ep08:storyEntered', function _h(){
        window.removeEventListener('ep08:storyEntered', _h);
        setTimeout(offer, spec.delay || 600);
      });
    },

    /* utility · ปลด key สำหรับ EP08 (ส่วนใหญ่ใช้ S1Keyring แทน) */
    grantEpoch(epochId){
      const arr = JSON.parse(localStorage.getItem('cosmosLog_ep08_epochs') || '[]');
      if (!arr.includes(epochId)) {
        arr.push(epochId);
        localStorage.setItem('cosmosLog_ep08_epochs', JSON.stringify(arr));
      }
      if (global.KPA) KPA.research('epochCleared', { epochId });
      window.dispatchEvent(new CustomEvent('ep08:epoch', { detail:{ epochId } }));
    },
    setEnding(ending){
      localStorage.setItem('cosmosLog_ep08_ending', ending);
      if (global.KPA) KPA.research('endingChosen', { ending });
    },
    setChoice(choice){
      localStorage.setItem('cosmosLog_ep08_choice', choice);
      if (global.KPA) KPA.research('fathersChoice', { choice });
    }
  };

  function _css(){
    if (document.getElementById('ep08-boot-css')) return;
    const s = document.createElement('style');
    s.id = 'ep08-boot-css';
    s.textContent = `
      #ep08Footer{position:fixed;bottom:0;left:0;right:0;z-index:60;
        background:rgba(5,1,8,.94);backdrop-filter:blur(8px);
        border-top:1px solid rgba(255,216,74,.3);
        display:flex;justify-content:space-between;align-items:center;
        padding:10px 14px;font-size:13px;}
      .ep08-nav{color:#ffd84a;text-decoration:none;font-weight:600;}
      .ep08-nav.prev{color:#ff6ab8;}
      .ep08-progress{color:#7a8aa8;font-size:11px;letter-spacing:.1em;}
      @media(max-width:600px){
        #ep08Footer{font-size:11px;padding:8px 8px;}
      }
    `;
    document.head.appendChild(s);
  }
  document.addEventListener('DOMContentLoaded', _css);

  global.EP08Boot = Boot;
  global.Boot08 = Boot;

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
      anchor.addEventListener('click', (e) => {
        if (this._cfg && this._cfg.enabled && this._teacherActive && !this._teacherOpen) {
          e.preventDefault();
          this._flash();
        }
      });
      this._loadDeps().then(() => {
        this._cfg = (global.PaceResolver && global.PaceResolver.get({ subject:'astronomy', ep:'ep08' })) || { enabled:false };
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
      return load(epShared + 'firebase-config.js', 'FirebaseConfig')
        .catch(() => {})
        .then(() => load(base + 'kpdb.js', 'KPDB'))
        .then(() => { if (global.KPDB) global.KPDB.init({ subject: 'astronomy', unit: 'ep08' }); })
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
  global.EP08Gate = Gate;

  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('ep08-gate-css')) return;
    const s = document.createElement('style');
    s.id = 'ep08-gate-css';
    s.textContent = `
      .ep08-nav.pace-locked{color:#ff5c7a !important;cursor:not-allowed;
        animation:ep08PaceLockedPulse 1.6s ease-in-out infinite;}
      @keyframes ep08PaceLockedPulse{0%,100%{opacity:.7;}50%{opacity:1;}}
    `;
    document.head.appendChild(s);
  });
})(window);
