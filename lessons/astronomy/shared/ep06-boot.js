/* ===== COSMOS LOG · EP06 Page Bootstrap · v1 ===== */
/* Boot · Chain · Gate · Submit · Transition · pattern เดียวกับ EP05      */

(function(global){
  // Auto-load team-comp.js (energy snapshot per EP)
  if (typeof document !== "undefined" && !document.querySelector('script[data-tc="1"]')) {
    var _tc = document.createElement("script"); _tc.src = "../shared/team-comp.js?v=2"; _tc.dataset.tc = "1"; _tc.async = false; document.head.appendChild(_tc);
  }
  const Boot = {
    init(opts={}) {
      if (global.KPDB && global.KPDB.init) global.KPDB.init({ subject: 'astronomy', unit: 'ep06' });
      global.Starfield && global.Starfield.init();
      global.SFX && global.SFX.init();
      global.Sync && global.Sync.init();
      if (global.Sync && !global.Sync.getState()) {
        global.Sync.createRoom({ code: 'SOLO' });
      }
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
      this._injectQuestHud(pageId);
    },

    _injectQuestHud(pageId) {
      const hudPages = ['p05a','p05b','p05c','p06-bridge','p06a','p06b','p07-bridge','p07a','p07b','p07c','p08-bridge','p08a','p08b','p08c','p09-bridge','p09a','p09b','p09c','p09d','p10-bridge','p10a','p10b','p10c','p10d','p11','p12','p13','p14','p15','p16','p17','p18','p19','p20','p21','p22','p23','p24','p25','p26'];
      if (!hudPages.includes(pageId)) return;
      if (document.getElementById('questHud')) return;
      if (!document.getElementById('questHudStyle')) {
        const s = document.createElement('style'); s.id = 'questHudStyle';
        s.textContent = `
          #questHud { position:fixed; top:48px; left:50%; transform:translateX(-50%); z-index:50;
            display:flex; gap:10px; padding:6px 14px; border-radius:999px;
            background:rgba(6,8,18,0.95); border:1px solid rgba(100,216,255,0.5);
            backdrop-filter:blur(10px); font-family:Orbitron,monospace; font-size:11px;
            letter-spacing:.12em; align-items:center; box-shadow:0 4px 18px rgba(0,0,0,0.5);
            max-width:calc(100vw - 20px); }
          #questHud .qh-chips { display:flex; gap:3px; }
          #questHud .qh-chip { width:22px; height:22px; border-radius:6px; display:flex;
            align-items:center; justify-content:center; font-size:14px; line-height:1;
            background:rgba(0,0,0,0.5); border:1.5px solid rgba(120,140,220,0.3);
            opacity:0.4; filter:grayscale(80%); transition:all .25s; }
          #questHud .qh-chip.have { opacity:1; filter:none;
            border-color:var(--chip-color); box-shadow:0 0 8px var(--chip-color);
            background:rgba(0,0,0,0.7); }
          #questHud .qh-chip.just-got { animation:chipPop .8s ease-out; }
          @keyframes chipPop {
            0% { transform:scale(1); }
            30% { transform:scale(1.5); box-shadow:0 0 22px var(--chip-color); }
            100% { transform:scale(1); }
          }
          #questHud .qh-eta { color:#64d8ff; }
          #questHud .qh-eta b { color:#fff; }
          @media(max-width:560px){
            #questHud { font-size:10px; padding:5px 10px; gap:6px; }
            #questHud .qh-chip { width:18px; height:18px; font-size:11px; }
          }
        `;
        document.head.appendChild(s);
      }
      const hud = document.createElement('div');
      hud.id = 'questHud';
      const inv = QuestState.helions();
      const eta = QuestState.voidEta();
      const helions = (global.EP_CONFIG && global.EP_CONFIG.helions) || [];
      const COLORS = { gs1:'#b980ff', gs2:'#64d8ff', gs3:'#cc5533', gs4:'#ffcb6b', gs5:'#ff8a3d', gs6:'#7effb2' };
      const chipsHtml = helions.map(h => {
        const have = inv.includes(h.id);
        const c = COLORS[h.id] || '#ffd700';
        return `<div class="qh-chip ${have?'have':''}" data-helion="${h.id}" style="--chip-color:${c};" title="${h.name}${have?' ✓':' (ยังไม่เก็บ)'}">${h.icon}</div>`;
      }).join('');
      hud.innerHTML = `
        <div class="qh-chips" id="qhChips">${chipsHtml}</div>
        <span style="color:#6a7394;">·</span>
        <span class="qh-eta">⏰ <b id="qhEta">${eta.toFixed(1)}h</b></span>
      `;
      document.body.appendChild(hud);
    },

    _injectFooter(pageId) {
      if (document.getElementById('epFooter')) return;
      const pages = (global.EP_CONFIG && global.EP_CONFIG.pages) || [];
      const idx = pages.findIndex(p => p.id === pageId);
      const prev = idx > 0 ? pages[idx-1] : null;
      const next = idx >= 0 && idx < pages.length-1 ? pages[idx+1] : null;
      const foot = document.createElement('div');
      foot.id = 'epFooter';
      foot.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:40;padding:8px 14px;background:rgba(4,6,14,0.92);border-top:1px solid rgba(100,216,255,0.18);display:flex;justify-content:space-between;align-items:center;gap:8px;backdrop-filter:blur(10px);';
      foot.innerHTML = `
        <a href="${prev ? prev.file : '#'}" style="color:${prev?'#64d8ff':'#444'};text-decoration:none;font-size:12px;pointer-events:${prev?'auto':'none'};">${prev?'← '+prev.id+' '+prev.title:''}</a>
        <div style="font-family:Orbitron,monospace;font-size:10px;color:#6a7394;letter-spacing:0.15em;">EP06 · ${pageId||''} · ${idx>=0?(idx+1)+'/'+pages.length:''}</div>
        <a href="${next ? next.file : '#'}" style="color:${next?'#b980ff':'#444'};text-decoration:none;font-size:12px;pointer-events:${next?'auto':'none'};">${next?next.title+' '+next.id+' →':''}</a>
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
  global.EP06Boot = Boot;

  /* ============ Chain ============ */
  const CHAIN_KEY = 'cosmosLog_ep06_chain';
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

  /* ============ QuestState · GENESIS SHARDS inventory + VOID ETA ============ */
  const QuestState = {
    helions() {
      const c = Chain.get('helionInventory') || [];
      return Array.isArray(c) ? c : [];
    },
    grant(helionId) {
      const inv = this.helions();
      if (inv.includes(helionId)) return false;
      inv.push(helionId);
      Chain.set('helionInventory', inv);
      this._refreshHud();
      this._burst(helionId);
      return true;
    },
    has(helionId) { return this.helions().includes(helionId); },
    voidEta() {
      const stored = Chain.get('voidEta');
      const cfg = global.EP_CONFIG || {};
      if (stored != null) return Number(stored);
      return Number(cfg.voidEtaStartHr || 24);
    },
    decreaseEta(hours) {
      const cur = this.voidEta();
      const next = Math.max(0, cur - Number(hours||0));
      Chain.set('voidEta', next);
      this._refreshHud();
      return next;
    },
    _refreshHud() {
      const inv = this.helions();
      const e = document.getElementById('qhEta');
      if (e) e.textContent = this.voidEta().toFixed(1) + 'h';
      const chipsHost = document.getElementById('qhChips');
      if (chipsHost) {
        chipsHost.querySelectorAll('.qh-chip').forEach(chip => {
          const id = chip.dataset.helion;
          const have = inv.includes(id);
          const wasHave = chip.classList.contains('have');
          if (have && !wasHave) {
            chip.classList.add('have', 'just-got');
            setTimeout(() => chip.classList.remove('just-got'), 800);
          } else if (have) {
            chip.classList.add('have');
          }
        });
      }
    },
    _burst(helionId) {
      const cfg = global.EP_CONFIG || {};
      const hel = (cfg.helions || []).find(x => x.id === helionId);
      const total = (cfg.helions || []).length || 6;
      const have  = this.helions().length;
      const remaining = total - have;
      const isLast = remaining === 0;

      if (!document.getElementById('helionKeyPopupStyle')) {
        const s = document.createElement('style'); s.id = 'helionKeyPopupStyle';
        s.textContent = `
          @keyframes hkBackdropIn { from{opacity:0;} to{opacity:1;} }
          @keyframes hkBackdropOut { from{opacity:1;} to{opacity:0;} }
          @keyframes hkCardIn { 0%{opacity:0;transform:scale(0.5) translateY(20px);} 60%{transform:scale(1.05) translateY(0);} 100%{opacity:1;transform:scale(1) translateY(0);} }
          @keyframes hkCardOut { to{opacity:0;transform:scale(0.9);} }
          @keyframes hkIconSpin { from{transform:rotate(0) scale(1);} 50%{transform:rotate(180deg) scale(1.15);} to{transform:rotate(360deg) scale(1);} }
          @keyframes hkRingPulse { 0%,100%{box-shadow:0 0 30px var(--hk-color), inset 0 0 18px rgba(0,0,0,0.4);} 50%{box-shadow:0 0 60px var(--hk-color), inset 0 0 24px rgba(0,0,0,0.4);} }
          .hk-backdrop { position:fixed; inset:0; z-index:600; display:flex; align-items:center; justify-content:center;
            background:radial-gradient(ellipse at center, rgba(100,216,255,0.30), rgba(0,0,0,0.7) 70%);
            animation:hkBackdropIn .35s ease-out forwards; backdrop-filter:blur(6px); }
          .hk-backdrop.closing { animation:hkBackdropOut .35s ease-in forwards; }
          .hk-card { position:relative; padding:28px 32px 22px; border-radius:22px; max-width:380px; width:88%;
            background:linear-gradient(160deg, rgba(10,20,40,0.98), rgba(8,4,18,0.98));
            border:3px solid var(--hk-color);
            box-shadow:0 16px 60px rgba(0,0,0,0.7), 0 0 50px var(--hk-color);
            text-align:center; animation:hkCardIn .55s cubic-bezier(.2,.7,.3,1.4) forwards;
            cursor:pointer; }
          .hk-card.closing { animation:hkCardOut .3s ease-in forwards; }
          .hk-banner { position:absolute; top:-13px; left:50%; transform:translateX(-50%);
            padding:4px 16px; border-radius:8px; background:linear-gradient(180deg,#ffd700,#ff8a3d);
            color:#1a0500; font-family:Orbitron,monospace; font-size:11px; letter-spacing:.18em; font-weight:700;
            box-shadow:0 3px 10px rgba(255,215,0,0.5); white-space:nowrap; }
          .hk-icon-wrap { position:relative; width:130px; height:130px; margin:14px auto 12px; }
          .hk-ring { position:absolute; inset:0; border-radius:50%;
            background:radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%);
            border:3px solid var(--hk-color);
            animation:hkRingPulse 1.6s ease-in-out infinite; }
          .hk-icon { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
            font-size:74px; animation:hkIconSpin 1.4s ease-in-out; filter:drop-shadow(0 0 14px var(--hk-color)); }
          .hk-title { font-family:Orbitron,monospace; font-size:13px; letter-spacing:.18em;
            color:var(--hk-color); margin-bottom:8px; }
          .hk-name { font-family:Orbitron,monospace; font-size:20px; font-weight:700; color:#fff;
            text-shadow:0 2px 10px rgba(0,0,0,0.7); margin-bottom:14px; line-height:1.2;
            letter-spacing:.04em; }
          .hk-progress { display:flex; gap:6px; justify-content:center; margin:12px 0; }
          .hk-pip { width:18px; height:18px; border-radius:50%;
            background:rgba(255,255,255,0.08); border:1.5px solid rgba(255,255,255,0.25);
            display:flex; align-items:center; justify-content:center; font-size:10px; transition:all .3s; }
          .hk-pip.have { background:var(--hk-color); border-color:var(--hk-color);
            box-shadow:0 0 8px var(--hk-color); color:#000; font-weight:700; }
          .hk-pip.have::after { content:'✓'; }
          .hk-count { font-family:Orbitron,monospace; font-size:14px; color:#fff; margin-bottom:10px; }
          .hk-count b { color:var(--hk-color); font-size:18px; }
          .hk-power { margin-top:12px; padding:10px 12px; border-radius:10px;
            background:linear-gradient(180deg, rgba(255,215,0,0.18), rgba(100,216,255,0.08));
            border:2px dashed #ffd700; }
          .hk-power-label { font-family:Orbitron,monospace; font-size:9px; letter-spacing:.16em;
            color:#ffd700; margin-bottom:3px; }
          .hk-power-name { font-family:Orbitron,monospace; font-size:14px; font-weight:700;
            color:#fff; letter-spacing:.06em; margin-bottom:2px; }
          .hk-power-desc { font-size:11px; color:#ffe48a; line-height:1.4; }
          .hk-hint { padding:10px 14px; border-radius:10px; background:rgba(0,0,0,0.4);
            border-left:3px solid var(--hk-color); font-size:12px; color:#d4f0ff; line-height:1.5;
            text-align:left; margin-top:12px; }
          .hk-hint b { color:var(--hk-color); }
          .hk-tap { font-family:Orbitron,monospace; font-size:9px; color:#9aa3c0;
            letter-spacing:.16em; margin-top:14px; opacity:0.7; }
        `;
        document.head.appendChild(s);
      }

      const COLORS = { gs1:'#b980ff', gs2:'#64d8ff', gs3:'#cc5533', gs4:'#ffcb6b', gs5:'#ff8a3d', gs6:'#7effb2' };
      const color = COLORS[helionId] || '#ffd700';
      const POWER_MAP = {
        gs1: { icon:'💥', name:'NEBULA BLAST',   desc:'+5 thrust 1 ครั้งใน boss' },
        gs2: { icon:'🎯', name:'AUTO TARGET',    desc:'auto · เผยคำตอบ 1 ครั้ง' },
        gs3: { icon:'🛡️', name:'ROCKY SHIELD',   desc:'auto · กัน meteor pulse 1 ครั้ง · kill M3' },
        gs4: { icon:'↩️', name:'FIELD DEFLECT',  desc:'เบี่ยงคำผิด 1 ข้อ · kill M4' },
        gs5: { icon:'⚡', name:'GIANT BURST',    desc:'ตอบผิด 1 ข้อ → ครึ่งคะแนน · kill M2' },
        gs6: { icon:'⏱️', name:'OORT SLOW-TIME', desc:'+6h CME-ETA 1 ครั้ง · kill M5' },
      };
      const pw = POWER_MAP[helionId];
      const powerHtml = pw ? `
        <div class="hk-power">
          <div class="hk-power-label">⚡ จะแลกเป็นพลัง</div>
          <div class="hk-power-name">${pw.icon} ${pw.name}</div>
          <div class="hk-power-desc">${pw.desc}</div>
        </div>` : '';

      const backdrop = document.createElement('div');
      backdrop.className = 'hk-backdrop';
      const pipsHtml = Array.from({length: total}).map((_, i) => {
        const cls = (i < have) ? 'have' : '';
        return `<div class="hk-pip ${cls}"></div>`;
      }).join('');

      const hintText = isLast
        ? `<b>🎉 ครบ 6/6 แล้ว!</b> · ไปที่ <b>p23 BOSS PREP</b> forge เป็น GENESIS LANCE สำหรับสู้ที่ <b>p24 KEPLER GAUNTLET</b>`
        : `เก็บกุญแจไว้ก่อน · ยังเหลืออีก <b>${remaining} ชิ้น</b> · ครบ 6 แล้วเอาไป forge ที่ <b>p23 BOSS PREP</b>`;

      backdrop.innerHTML = `
        <div class="hk-card" style="--hk-color:${color};">
          <div class="hk-banner">${isLast ? '🏆 FINAL SHARD · 6/6' : '🔑 SHARD UNLOCKED'}</div>
          <div class="hk-title">คุณได้รับ GENESIS SHARD</div>
          <div class="hk-icon-wrap">
            <div class="hk-ring"></div>
            <div class="hk-icon">${hel ? hel.icon : '✨'}</div>
          </div>
          <div class="hk-name">${hel ? hel.name : 'GENESIS SHARD'}</div>
          <div class="hk-progress">${pipsHtml}</div>
          <div class="hk-count">เก็บแล้ว <b>${have}</b> / ${total}</div>
          ${powerHtml}
          <div class="hk-hint">${hintText}</div>
          <div class="hk-tap">▸ แตะเพื่อปิด · หรือรอ ${isLast ? 4 : 3} วินาที</div>
        </div>
      `;
      document.body.appendChild(backdrop);
      global.SFX && global.SFX.play && global.SFX.play(isLast ? 'charge' : 'correct');

      const dismiss = () => {
        const card = backdrop.querySelector('.hk-card');
        backdrop.classList.add('closing'); card && card.classList.add('closing');
        setTimeout(() => backdrop.remove(), 350);
      };
      backdrop.addEventListener('click', dismiss);
      setTimeout(dismiss, isLast ? 4000 : 3000);
    },
  };
  global.QuestState = QuestState;

  /* ============ Phase3 · mini-quiz helper ============ */
  const Phase3 = {
    mount(opts) {
      const c = opts.container;
      if (!c) return;
      let answered = false;
      c.innerHTML = `
        <div style="font-family:Orbitron,monospace;font-size:11px;color:#7effb2;letter-spacing:.16em;margin-bottom:6px;">✅ ทดสอบย่อย · ข้อเดียว</div>
        <div class="q-prompt" style="margin-bottom:10px;">${opts.question}</div>
        <div class="phase3-choices" style="display:flex;flex-direction:column;gap:6px;"></div>
        <div class="phase3-feedback" style="margin-top:10px;font-size:13px;"></div>
      `;
      const ch = c.querySelector('.phase3-choices');
      const fb = c.querySelector('.phase3-feedback');
      opts.choices.forEach((choice) => {
        const b = document.createElement('button');
        b.className = 'ghost';
        b.style.cssText = 'text-align:left;padding:10px 14px;font-family:inherit;letter-spacing:0;font-size:13px;font-weight:400;';
        b.textContent = choice.txt;
        b.onclick = () => {
          if (answered) return;
          if (choice.correct) {
            answered = true;
            b.style.background = 'rgba(126,255,178,0.2)';
            b.style.borderColor = '#7effb2';
            b.style.color = '#7effb2';
            fb.innerHTML = '<span style="color:#7effb2;">✓ ถูกต้อง!</span>';
            if (opts.helionId) QuestState.grant(opts.helionId);
            opts.onCorrect && opts.onCorrect();
          } else {
            b.style.background = 'rgba(255,92,122,0.15)';
            b.style.borderColor = '#ff5c7a';
            b.style.opacity = '0.6';
            b.disabled = true;
            fb.innerHTML = '<span style="color:#ff5c7a;">✗ ' + (choice.hint || 'ลองใหม่ · ดูที่กิจกรรมข้างบน') + '</span>';
            global.SFX && global.SFX.play && global.SFX.play('wrong');
          }
        };
        ch.appendChild(b);
      });
    }
  };
  global.Phase3 = Phase3;

  /* ============ Gate ============ */
  const Gate = {
    _pollTimer: null, _currentPage: null, _nextHref: null, _buttonEl: null,
    _forceSolo: (new URLSearchParams(location.search)).get('solo') === '1',
    _requireSubmit: false, _submitted: false,
    _teacherActive: false, _teacherOpen: false,

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
      this._cfg = (global.PaceResolver && global.PaceResolver.get({ subject: 'astronomy', ep: 'ep06' })) || { enabled: false };
      this._update();
      if (this._forceSolo || !this._cfg.enabled) return;
      this._check();
      if (this._pollTimer) clearInterval(this._pollTimer);
      this._pollTimer = setInterval(() => this._check(), this._cfg.pollMs || 2000);
      if (this._cfg.mode === 'local') {
        try {
          const ch = new BroadcastChannel('pace_' + this._cfg.roomCode);
          ch.onmessage = () => this._check();
        } catch {}
      }
    },

    markSubmitted() { this._submitted = true; this._update(); },

    _check() {
      if (!global.PaceClient || !this._buttonEl || !this._cfg || !this._cfg.enabled) return;
      PaceClient.peek(this._cfg.apiUrl, this._cfg.roomCode, this._cfg.mode).then(pace => {
        if (!pace) { this._teacherActive = false; this._teacherOpen = false; }
        else {
          this._teacherActive = true;
          const pages = (global.EP_CONFIG && global.EP_CONFIG.pages) || [];
          const curIdx = pages.findIndex(p => p.id === this._currentPage);
          const unlockedIdx = pages.findIndex(p => p.id === pace.unlockedUpTo);
          this._teacherOpen = (unlockedIdx >= curIdx + 1);
          // ⭐ Auto-jump: ถ้าครูเปิด Auto-jump · countdown แล้วเด้งหน้าใหม่
          try {
            const pages = (global.EP_CONFIG && global.EP_CONFIG.pages) || [];
            global.PaceResolver && global.PaceResolver.maybeForceJump(pace, this._currentPage || this._pageId, pages);
          } catch(_){}
        }
        this._update();
      }).catch(() => { this._teacherActive=false; this._teacherOpen=false; this._update(); });
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
      } else this._setOpen(false);
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
      const key = 'cosmosLog_ep06_submit_' + page;
      const existing = this.load(page);
      const merged = Object.assign({}, existing, payload, { submittedAt: Date.now() });
      try { localStorage.setItem(key, JSON.stringify(merged)); } catch {}
      global.Sync && global.Sync.recordDecision && global.Sync.recordDecision({
        tag: '💾 ' + page, note: JSON.stringify(payload).slice(0, 100)
      });
      return merged;
    },
    load(page) {
      try { return JSON.parse(localStorage.getItem('cosmosLog_ep06_submit_' + page)) || {}; } catch { return {}; }
    },
    wirePair(opts) {
      const submitBtn = document.querySelector('.submit-btn');
      const nextBtn = document.querySelector('.next-btn');
      if (submitBtn) {
        submitBtn.onclick = () => {
          if (submitBtn.classList.contains('done')) return;
          const payload = opts.getPayload ? opts.getPayload() : {};
          if (opts.validate && !opts.validate(payload)) return;
          this.record(opts.page, payload);
          submitBtn.classList.add('done');
          submitBtn.disabled = true;
          submitBtn.textContent = '✓ ส่งแล้ว';
          Gate.markSubmitted();
          if (opts.isPerfect && opts.isPerfect(payload)) {
            const n = global.Coin && Coin.awardPerfect && Coin.awardPerfect(opts.page);
            if (n) opts.onSubmit && opts.onSubmit('perfect', n);
            else opts.onSubmit && opts.onSubmit('perfect');
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

  /* ============ Transition · cinematic (EP06 ice/saturn variants) ============ */
  const Transition = {
    play(tag, callback) {
      const el = document.createElement('div');
      el.style.cssText = 'position:fixed; inset:0; z-index:400; pointer-events:none;';
      let html = '', dur = 900;
      switch(tag) {
        case 'WARP_APPROACH':
          html = `<div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 50%, rgba(100,216,255,0.45), transparent 70%); animation:warpApp 0.9s;"></div>`;
          break;
        case 'NEBULA_REVEAL':
          html = `<div style="position:absolute;inset:0;background:radial-gradient(circle, #fff 0%, #b980ff 18%, #64d8ff 45%, transparent 75%); animation:cmeBurst 1.2s;"></div>`;
          dur = 1200;
          break;
        case 'AURORA':
          html = `<div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(126,255,178,0.5),rgba(100,216,255,0.5),transparent); animation:aurora 1.6s;"></div>`;
          dur = 1600;
          break;
        case 'VOID_REVEAL':
          html = `<div style="position:absolute;inset:0;background:linear-gradient(180deg,#000,#3a0a4a,#000); animation:voidRev 1.4s;"></div>`;
          dur = 1400;
          break;
        case 'ICE_FLASH':
          html = `<div style="position:absolute;inset:0;background:radial-gradient(circle, #fff, #64d8ff 40%, transparent 70%); animation:warpApp 1s;"></div>`;
          dur = 1000;
          break;
        default:
          callback && callback(); return;
      }
      el.innerHTML = html;
      if (!document.getElementById('trnStyleEp06')) {
        const s = document.createElement('style');
        s.id = 'trnStyleEp06';
        s.textContent = `
          @keyframes warpApp { 0%{opacity:0;} 50%{opacity:1;} 100%{opacity:0;} }
          @keyframes cmeBurst { 0%{opacity:0;transform:scale(0.2);} 30%{opacity:1;transform:scale(1.1);} 100%{opacity:0;transform:scale(2.4);} }
          @keyframes aurora { 0%{opacity:0;} 25%{opacity:1;transform:translateY(-12px);} 50%{transform:translateY(8px);} 75%{transform:translateY(-6px);opacity:1;} 100%{opacity:0;} }
          @keyframes voidRev { 0%{opacity:0;transform:translateY(-100%);} 50%{opacity:1;transform:translateY(0);} 100%{opacity:0;transform:translateY(100%);} }
        `;
        document.head.appendChild(s);
      }
      document.body.appendChild(el);
      global.SFX && global.SFX.play && global.SFX.play('transition');
      setTimeout(() => { el.remove(); callback && callback(); }, dur);
    },
  };
  global.Transition = Transition;
})(window);
