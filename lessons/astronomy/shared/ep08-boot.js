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
})(window);
