/* ===== COSMOS LOG · EP06 · VOID-GRID engine · v1 =====
 * Grid maze board (15x15 default) สำหรับ boss VOID ZERO-FIX
 * - solo · 4-direction click-to-walk · dice roll = N steps
 * - 2-phase model: Phase 1 (no goal · collect data 10x) · Phase 2 (goal revealed)
 * - Tile types: start · knowledge · trap · bonus · lock · empty · goal
 * - AI Goal placement post-flip · weighted by distance + nearby challenge
 * - Hint system: phase1Pool (misleading) · phase2 manhattan-direction
 * - KPA logging hooks · Achievements · localStorage state
 *
 * Public API · window.VoidGrid:
 *   init(opts)        · mount + seed board
 *   getState()        · snapshot
 *   rollDice(value?)  · returns 1-6 · animates
 *   startMove(steps)  · click-to-walk mode
 *   onTileLand(cb)    · land callback
 *   openTile(r,c)     · reveal flip animation
 *   triggerFlip()     · cutscene + place goal
 *   placeGoal()       · AI strategic placement
 *   useHint()         · phase-aware hint
 *   reveal: { goal, allKnowledge, allTraps, allBonus }
 *   achievements: { unlock(id), getAll() }
 *   reset()
 *   on(event, cb)     · 'land' | 'flip' | 'win' | 'lose' | 'energy' | 'tile-open'
 */

(function(global){
  'use strict';

  /* ---------- helpers ---------- */
  const _rng = (seed) => {
    let s = seed >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 0x100000000;
    };
  };
  const manhattan = (a, b) => Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1]);
  const inBounds = (r, c, n) => r>=0 && r<n && c>=0 && c<n;
  const compassDir = (from, to) => {
    const dr = to[0] - from[0], dc = to[1] - from[1];
    const v = Math.abs(dr) > Math.abs(dc)
      ? (dr < 0 ? 'เหนือ' : 'ใต้')
      : (dc < 0 ? 'ตะวันตก' : 'ตะวันออก');
    return v;
  };
  const wrongDirOf = (dir) => ({เหนือ:'ใต้', ใต้:'เหนือ', ตะวันออก:'ตะวันตก', ตะวันตก:'ตะวันออก'}[dir] || 'ตะวันออก');

  /* ---------- Tile zones (rows) ---------- */
  // rows 0-3: edge (Kuiper/Oort) · rows 4-7: outer giants · rows 8-11: belt · rows 12-14: inner
  function zoneOf(r) {
    if (r <= 3) return 'edge';
    if (r <= 7) return 'outer';
    if (r <= 11) return 'belt';
    return 'inner';
  }

  const ZONE_BG = {
    edge:  'rgba(100,216,255,0.12)',
    outer: 'rgba(185,128,255,0.12)',
    belt:  'rgba(184,115,51,0.12)',
    inner: 'rgba(244,164,96,0.12)',
  };
  const ZONE_BORDER = {
    edge:'#64d8ff', outer:'#b980ff', belt:'#b87333', inner:'#f4a460',
  };

  /* ============ VoidGrid ============ */
  const VoidGrid = {
    _state: null,
    _opts: null,
    _container: null,
    _listeners: {},
    _moveMode: false,
    _stepsRemain: 0,
    _diceBusy: false,

    /* ---- events ---- */
    on(ev, cb){ (this._listeners[ev] = this._listeners[ev] || []).push(cb); },
    _emit(ev, payload){ (this._listeners[ev]||[]).forEach(cb => { try{cb(payload);}catch(e){console.warn(e);} }); },

    /* ---- init / seed ---- */
    init(opts) {
      opts = opts || {};
      this._opts = opts;
      const N = opts.boardSize || 15;
      this._container = opts.container || document.body;
      const seed = opts.seed || (Date.now() & 0xffffff);
      const rng = _rng(seed);

      const start = opts.startPos || [N-1, 0];
      const allTiles = [];
      for (let r=0; r<N; r++) {
        for (let c=0; c<N; c++) {
          allTiles.push({ pos:[r,c], type:'empty', zone: zoneOf(r), opened:false, content:null });
        }
      }

      // Mark start
      const startTile = allTiles[start[0]*N + start[1]];
      startTile.type = 'start';
      startTile.opened = true;

      // Place tiles · zones
      this._placeTiles(allTiles, N, rng, start);

      const knowledgePool = (opts.knowledgeContent || []).slice();
      const trapClaims    = (opts.trapClaims || []).slice();
      const bonusContent  = (opts.bonusContent || []).slice();

      // Assign content
      allTiles.forEach(t => {
        if (t.type === 'knowledge') {
          const matching = knowledgePool.filter(k => k.zone === t.zone);
          const pool = matching.length ? matching : knowledgePool;
          if (pool.length) {
            const idx = Math.floor(rng() * pool.length);
            t.content = pool[idx];
            // do not deplete — content can repeat ok
          } else {
            t.content = { zone:t.zone, title:'📡 สัญญาณ', body:'ข้อมูลเขตนี้ยังไม่ระบุ · ขอให้สังเกต' };
          }
        } else if (t.type === 'trap') {
          if (trapClaims.length) {
            const idx = Math.floor(rng() * trapClaims.length);
            t.content = trapClaims[idx];
          } else {
            t.content = { m:'M?', text:'อ้างเท็จ', refute:[{text:'ปฏิเสธ', correct:true},{text:'เชื่อ', correct:false}] };
          }
        } else if (t.type === 'bonus') {
          if (bonusContent.length) {
            const idx = Math.floor(rng() * bonusContent.length);
            t.content = bonusContent[idx];
          }
        } else if (t.type === 'lock') {
          t.content = { question: opts.lockQuestion || { q:'พลูโตจัดเป็นอะไรหลัง IAU 2006?', a:['ดาวเคราะห์','ดาวเคราะห์แคระ'], c:1 } };
        }
      });

      this._state = {
        N,
        allTiles,
        playerPos: start.slice(),
        startPos: start.slice(),
        energy: (opts.energy && opts.energy.start) || 15,
        energyCfg: opts.energy || { start:15, trapHit:-1, fail:-1, bonus:2, exitCost:5 },
        questionsAnswered: 0,
        flipped: false,
        goalTile: null,
        opened: new Set([start[0]*N + start[1]]),
        hintsUsedPhase1: 0,
        hintsUsedPhase2: 0,
        hintUsedThisTurn: false, // F3: cooldown 1/turn
        hintLog: [],
        trapsRefuted: [],
        trapsFailed: [],
        bonusCollected: [],
        achievements: new Set(),
        firstTryStreak: 0, // for DATA SCIENTIST
        firstTryAll: true, // tracked while answering
        zonesVisited: { edge:0, outer:0, belt:0, inner:0 },
        turnSinceFlip: 0,
        seed,
        cfg: opts,
        ended: false,
      };

      this._render();
      this._injectStyles();
      return this._state;
    },

    _placeTiles(allTiles, N, rng, start) {
      // counts:
      const startIdx = start[0]*N + start[1];
      const candidates = allTiles.map((_,i) => i).filter(i => i !== startIdx);

      // Knowledge per zone:
      const knowPlan = { edge:12, outer:10, belt:11, inner:12 };
      const trapCount = 15;
      const bonusCount = 8;
      const lockCount = 6;

      // group candidates by zone
      const byZone = { edge:[], outer:[], belt:[], inner:[] };
      candidates.forEach(i => byZone[allTiles[i].zone].push(i));

      // shuffle helper
      const shuffle = (arr) => {
        const a = arr.slice();
        for (let i=a.length-1; i>0; i--) {
          const j = Math.floor(rng() * (i+1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      };

      Object.keys(knowPlan).forEach(z => {
        byZone[z] = shuffle(byZone[z]);
        const k = knowPlan[z];
        for (let i=0; i<k && byZone[z].length; i++) {
          const idx = byZone[z].shift();
          allTiles[idx].type = 'knowledge';
        }
      });

      // pool of remaining tiles (not start, not knowledge)
      const remain = shuffle(allTiles.map((_,i)=>i).filter(i => allTiles[i].type === 'empty' && i !== startIdx));

      for (let i=0; i<trapCount && remain.length; i++) {
        const idx = remain.shift();
        allTiles[idx].type = 'trap';
      }
      for (let i=0; i<bonusCount && remain.length; i++) {
        const idx = remain.shift();
        allTiles[idx].type = 'bonus';
      }
      for (let i=0; i<lockCount && remain.length; i++) {
        const idx = remain.shift();
        allTiles[idx].type = 'lock';
      }
      // rest stays empty
    },

    /* ---- render ---- */
    _injectStyles() {
      if (document.getElementById('voidGridStyle')) return;
      const s = document.createElement('style'); s.id = 'voidGridStyle';
      s.textContent = `
        .vg-board { display:grid; gap:2px; padding:8px; border-radius:12px;
          background:rgba(6,8,18,0.85); border:1px solid rgba(100,216,255,0.3);
          margin: 0 auto; max-width:100%; overflow:auto; }
        .vg-tile { width:32px; height:32px; border-radius:5px; position:relative;
          display:flex; align-items:center; justify-content:center;
          font-size:14px; line-height:1; cursor:default; user-select:none;
          background:var(--vg-bg); border:1px solid rgba(255,255,255,0.06);
          transition: transform .18s, box-shadow .18s, background .25s; }
        .vg-tile.opened { background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.15); }
        .vg-tile.opened.t-knowledge { background:rgba(100,216,255,0.18); border-color:#64d8ff; }
        .vg-tile.opened.t-trap { background:rgba(255,92,122,0.20); border-color:#ff5c7a;
          animation: vgTrapFlick 2.5s ease-in-out infinite; }
        .vg-tile.opened.t-bonus { background:rgba(255,215,0,0.22); border-color:#ffd700; }
        .vg-tile.opened.t-lock { background:rgba(185,128,255,0.22); border-color:#b980ff; }
        .vg-tile.opened.t-empty { background:rgba(255,255,255,0.04); }
        .vg-tile.t-start { background:rgba(126,255,178,0.25) !important; border-color:#7effb2 !important; }
        .vg-tile.t-goal { background:rgba(126,255,178,0.4) !important; border-color:#7effb2 !important;
          box-shadow:0 0 16px #7effb2; animation: vgGoalPulse 1.4s ease-in-out infinite; z-index:2; }
        .vg-tile.player::after { content:'🚀'; position:absolute; font-size:20px;
          animation: vgFloat 1.6s ease-in-out infinite; pointer-events:none; z-index:5; filter:drop-shadow(0 0 6px #64d8ff); }
        .vg-tile.movable { cursor:pointer; box-shadow:0 0 0 2px #ffcb6b inset, 0 0 12px rgba(255,203,107,0.6); }
        .vg-tile.movable:hover { transform:scale(1.08); }
        .vg-tile.movable::before { content:''; position:absolute; inset:0; border-radius:5px;
          background:rgba(255,203,107,0.18); pointer-events:none; animation:vgMoveBlink 1s ease-in-out infinite; }
        .vg-tile .qmark { color:rgba(255,255,255,0.35); font-size:11px; }
        @keyframes vgFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-3px);} }
        @keyframes vgGoalPulse { 0%,100%{box-shadow:0 0 16px #7effb2;} 50%{box-shadow:0 0 30px #7effb2, 0 0 60px rgba(126,255,178,0.5);} }
        @keyframes vgTrapFlick { 0%,100%{box-shadow:0 0 0 transparent;} 50%{box-shadow:0 0 8px rgba(255,92,122,0.4);} }
        @keyframes vgMoveBlink { 0%,100%{opacity:.6;} 50%{opacity:.15;} }
        .vg-dice-overlay { position:fixed; inset:0; z-index:500; display:flex;
          align-items:center; justify-content:center; background:rgba(0,0,0,0.6);
          backdrop-filter:blur(4px); animation: vgFade .25s; }
        @keyframes vgFade { from{opacity:0;} to{opacity:1;} }
        .vg-dice { width:120px; height:120px; border-radius:18px; background:#fff;
          color:#1a0830; font-family:Orbitron,monospace; font-size:64px; font-weight:700;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 8px 40px rgba(255,255,255,0.4); animation: vgDiceRoll 1.2s ease-out; }
        @keyframes vgDiceRoll { 0%{transform:rotate(0) scale(.5);} 30%{transform:rotate(540deg) scale(1.1);} 70%{transform:rotate(700deg) scale(1);} 100%{transform:rotate(720deg) scale(1);} }
        .vg-flip-scene { position:fixed; inset:0; z-index:550; background:radial-gradient(ellipse, rgba(100,216,255,0.5), rgba(0,0,0,0.95) 75%);
          display:flex; flex-direction:column; align-items:center; justify-content:center; padding:24px;
          animation: vgFade .4s; backdrop-filter:blur(8px); }
        .vg-flip-card { background:rgba(10,14,30,0.95); border:2px solid #64d8ff; border-radius:16px;
          padding:22px 26px; max-width:520px; width:92%; text-align:center;
          box-shadow:0 0 40px rgba(100,216,255,0.6); animation: vgFlipIn .6s cubic-bezier(.2,.8,.3,1.2); }
        @keyframes vgFlipIn { 0%{opacity:0;transform:scale(.6) rotateX(60deg);} 100%{opacity:1;transform:scale(1) rotateX(0);} }
        .vg-flip-actor { font-family:Orbitron,monospace; font-size:13px; letter-spacing:.2em;
          color:#ffcb6b; margin-bottom:10px; }
        .vg-flip-text { font-size:16px; line-height:1.7; color:#fff; }
        .vg-flip-step { font-family:Orbitron,monospace; font-size:10px; color:#9aa3c0;
          margin-top:18px; letter-spacing:.18em; }
        .vg-toast { position:fixed; top:90px; left:50%; transform:translateX(-50%);
          padding:8px 16px; border-radius:999px; background:rgba(20,28,52,0.95);
          border:1px solid #64d8ff; color:#64d8ff; font-family:Orbitron,monospace;
          font-size:11px; letter-spacing:.14em; z-index:480; animation: vgToast 2.4s ease forwards; }
        @keyframes vgToast { 0%{opacity:0;transform:translate(-50%,-10px);} 15%{opacity:1;transform:translate(-50%,0);} 85%{opacity:1;} 100%{opacity:0;transform:translate(-50%,-10px);} }
      `;
      document.head.appendChild(s);
    },

    _render() {
      const st = this._state;
      const N = st.N;
      const wrap = this._container;
      wrap.innerHTML = '';
      const board = document.createElement('div');
      board.className = 'vg-board';
      board.style.gridTemplateColumns = `repeat(${N}, 1fr)`;
      board.style.width = (N * 36) + 'px';

      st.allTiles.forEach((t, i) => {
        const el = document.createElement('div');
        el.className = 'vg-tile';
        const r = t.pos[0], c = t.pos[1];
        el.dataset.r = r; el.dataset.c = c; el.dataset.i = i;
        el.style.setProperty('--vg-bg', ZONE_BG[t.zone]);
        if (t.opened) el.classList.add('opened', 't-' + t.type);
        else el.innerHTML = '<span class="qmark">?</span>';
        if (t.type === 'start') el.classList.add('t-start');
        if (st.goalTile && st.goalTile[0]===r && st.goalTile[1]===c) {
          el.classList.add('t-goal');
          el.innerHTML = '🎯';
        }
        if (st.playerPos[0]===r && st.playerPos[1]===c) el.classList.add('player');
        el.addEventListener('click', () => this._onTileClick(r, c, el));
        board.appendChild(el);
      });
      wrap.appendChild(board);
      this._refreshMovable();
    },

    _tileEl(r, c) {
      const N = this._state.N;
      return this._container.querySelector(`.vg-tile[data-i="${r*N + c}"]`);
    },

    _refreshMovable() {
      const tiles = this._container.querySelectorAll('.vg-tile');
      tiles.forEach(t => t.classList.remove('movable'));
      if (!this._moveMode || this._stepsRemain <= 0) return;
      const [pr, pc] = this._state.playerPos;
      const N = this._state.N;
      const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
      dirs.forEach(([dr,dc]) => {
        const r = pr+dr, c = pc+dc;
        if (!inBounds(r,c,N)) return;
        const idx = r*N + c;
        const t = this._state.allTiles[idx];
        // block: opened trap that wasn't refuted? we removed traps after refute, so an opened trap means it's solved (passable).
        // block: opened lock that wasn't unlocked → marked content.locked still true
        if (t.type === 'lock' && t.opened && t.locked === false) { /* passable */ }
        const tEl = this._tileEl(r,c);
        if (tEl) tEl.classList.add('movable');
      });
    },

    _onTileClick(r, c, el) {
      if (!this._moveMode) return;
      if (!el.classList.contains('movable')) return;
      // walk one step
      const st = this._state;
      st.playerPos = [r, c];
      this._stepsRemain--;
      // re-render movement
      this._container.querySelectorAll('.vg-tile').forEach(e => e.classList.remove('player'));
      el.classList.add('player');
      if (this._stepsRemain > 0) {
        // continue walking
        setTimeout(() => this._refreshMovable(), 200);
      } else {
        this._moveMode = false;
        this._refreshMovable();
        // land
        setTimeout(() => this._land(r, c), 220);
      }
    },

    _land(r, c) {
      const st = this._state;
      const N = st.N;
      const idx = r*N + c;
      const t = st.allTiles[idx];
      // F3 · ปลดล็อก hint cooldown หลัง land
      st.hintUsedThisTurn = false;
      // count zone visit
      st.zonesVisited[t.zone] = (st.zonesVisited[t.zone] || 0) + 1;
      if (st.flipped) st.turnSinceFlip++;
      this._autosave();

      // Check goal first
      if (st.goalTile && st.goalTile[0]===r && st.goalTile[1]===c) {
        this._emit('land', { tile:t, type:'goal', pos:[r,c] });
        this._emit('win', { state: this.getState() });
        return;
      }
      if (!t.opened) this.openTile(r, c);
      this._emit('land', { tile:t, type:t.type, pos:[r,c] });
    },

    openTile(r, c) {
      const st = this._state;
      const N = st.N;
      const idx = r*N + c;
      const t = st.allTiles[idx];
      if (!t.opened) {
        t.opened = true;
        st.opened.add(idx);
      }
      const el = this._tileEl(r, c);
      if (el) {
        el.classList.add('opened', 't-' + t.type);
        el.innerHTML = '';
        if (t.type === 'knowledge') el.textContent = '📘';
        else if (t.type === 'trap') el.textContent = '🐍';
        else if (t.type === 'bonus') el.textContent = '🎁';
        else if (t.type === 'lock') el.textContent = '🔐';
        else if (t.type === 'empty') el.textContent = '';
        else if (t.type === 'start') el.textContent = '🚀';
        if (st.playerPos[0]===r && st.playerPos[1]===c) el.classList.add('player');
      }
      this._emit('tile-open', { tile:t, pos:[r,c] });
    },

    /* ---- dice ---- */
    rollDice(forced) {
      return new Promise((resolve) => {
        if (this._diceBusy) { resolve(0); return; }
        this._diceBusy = true;
        const n = forced || (1 + Math.floor(Math.random() * 6));
        const overlay = document.createElement('div');
        overlay.className = 'vg-dice-overlay';
        overlay.innerHTML = `<div class="vg-dice" id="vgDice">?</div>`;
        document.body.appendChild(overlay);
        const dice = overlay.querySelector('#vgDice');
        let ticks = 0;
        const iv = setInterval(() => {
          dice.textContent = String(1 + Math.floor(Math.random() * 6));
          ticks++;
          if (ticks > 8) {
            clearInterval(iv);
            dice.textContent = String(n);
            setTimeout(() => {
              overlay.remove();
              this._diceBusy = false;
              resolve(n);
            }, 700);
          }
        }, 90);
      });
    },

    startMove(steps) {
      if (steps <= 0) return;
      this._moveMode = true;
      this._stepsRemain = steps;
      // F3 · เทิร์นใหม่ · reset hint cooldown
      if (this._state) this._state.hintUsedThisTurn = false;
      this._refreshMovable();
      this._toast('🚀 คลิกช่องที่ติดยานเพื่อเดิน · เหลือ ' + steps + ' ก้าว');
    },

    onTileLand(cb) { this.on('land', cb); },

    /* ---- hint ---- */
    useHint() {
      const st = this._state;
      const cfg = (st.cfg && st.cfg.hint) || {};
      // F3 · cooldown · 1 ครั้ง/turn
      if (st.hintUsedThisTurn) {
        return { phase: st.flipped ? 2 : 1, text:'🔒 ใช้ HINT แล้วในเทิร์นนี้ · ทอยใหม่หรือเหยียบช่องเพื่อปลด', cost:0, blocked:true };
      }
      if (!st.flipped) {
        // Phase 1 — misleading (free)
        const pool = (cfg.phase1Pool || []);
        const pick = pool[Math.floor(Math.random() * pool.length)] || '🔮 VOID: ...';
        const wrong = wrongDirOf(st.goalTile ? compassDir(st.playerPos, st.goalTile) : 'ตะวันออก');
        const text = pick.replace('{wrongDir}', wrong);
        st.hintsUsedPhase1++;
        st.hintLog.push({ phase:1, text, ts: Date.now() });
        if (global.KPA) global.KPA.log('A1', 'hint-skeptic', { phase:1, text, follow:false });
        st.hintUsedThisTurn = true;
        this._autosave();
        return { phase:1, text, cost:0 };
      } else {
        // Phase 2 — real, costs 1 energy
        if (st.energy <= 0) return { phase:2, text:'⚡ พลังหมด · ใช้ hint ไม่ได้', cost:0, blocked:true };
        st.energy -= (cfg.phase2Cost || 1);
        st.hintsUsedPhase2++;
        const d = manhattan(st.playerPos, st.goalTile);
        const dir = compassDir(st.playerPos, st.goalTile);
        let text;
        if (d >= 15) text = `🔭 ยังไกลอยู่ · ทาง${dir} · ห่าง ${d} ช่อง`;
        else if (d >= 8) text = `🔭 ใกล้แล้ว · ${d} ช่อง · ทิศ${dir}`;
        else if (d >= 3) text = `🔭 ใกล้มาก · ${d} ช่อง · ${dir}`;
        else text = `🔭 อยู่ติดกัน! · ${d} ช่อง · ${dir}`;
        st.hintLog.push({ phase:2, text, ts: Date.now() });
        this._emit('energy', { delta:-1, energy:st.energy });
        if (global.KPA) global.KPA.log('A1', 'hint-skeptic', { phase:2, text });
        st.hintUsedThisTurn = true;
        this._autosave();
        return { phase:2, text, cost: cfg.phase2Cost || 1 };
      }
    },

    /* ---- flip ---- */
    triggerFlip() {
      const st = this._state;
      if (st.flipped) return;
      st.flipped = true;
      this._emit('flip', { state: this.getState() });
      const cfg = (st.cfg && st.cfg.hint) || {};
      const dialogue = cfg.flipDialogue || [
        { actor:'KEPLER ANALYZER', text:'10/10 LOCKED · พิกัดถูกตรึง' },
        { actor:'เคน', text:'VOID hack hint signal · ผมตัดออกแล้ว' },
        { actor:'อารยา', text:'T²=a³ ให้พิกัด Genesis Vault อยู่ตรงนั้น!' },
      ];
      // place goal
      this.placeGoal();

      const overlay = document.createElement('div');
      overlay.className = 'vg-flip-scene';
      overlay.innerHTML = `<div class="vg-flip-card" id="vgFlipCard"></div>`;
      document.body.appendChild(overlay);
      const card = overlay.querySelector('#vgFlipCard');

      let i = 0;
      const dur = (cfg.cutsceneDuration || 6000);
      const stepDur = Math.floor(dur / (dialogue.length + 1));
      const showStep = () => {
        if (i >= dialogue.length) {
          // ICE_FLASH transition + reveal goal
          card.innerHTML = `<div class="vg-flip-actor" style="color:#7effb2;">📡 GENESIS VAULT</div>
            <div class="vg-flip-text">🎯 พิกัดเป้าหมาย <b>เปิดเผยแล้ว</b> · มุ่งหน้าไปยัง Vault!</div>
            <div class="vg-flip-step">PHASE 2 · RACE TO GOAL</div>`;
          if (global.Transition && global.Transition.play) {
            global.Transition.play('ICE_FLASH');
          }
          setTimeout(() => {
            overlay.remove();
            this._render();
            this._toast('🎯 GOAL ปรากฏแล้ว · มุ่งหน้าไป!');
          }, 1100);
          return;
        }
        const step = dialogue[i];
        card.innerHTML = `<div class="vg-flip-actor">${step.actor}</div>
          <div class="vg-flip-text">${step.text}</div>
          <div class="vg-flip-step">${i+1} / ${dialogue.length}</div>`;
        i++;
        setTimeout(showStep, stepDur);
      };
      showStep();
    },

    placeGoal() {
      const st = this._state;
      const cfg = (st.cfg && st.cfg.zerofix && st.cfg.zerofix.goalPlacement) || { minDist:10, maxDist:16 };
      const N = st.N;

      const candidates = [];
      st.allTiles.forEach((t, idx) => {
        if (t.opened) return;
        if (t.type !== 'empty' && t.type !== 'knowledge') return;
        const d = manhattan(t.pos, st.playerPos);
        if (d < (cfg.minDist || 10)) return;
        if (d > (cfg.maxDist || 16)) return;
        // count nearby challenge (trap/lock not opened) within 3
        let challenge = 0;
        let openedNear = 0;
        for (let r=t.pos[0]-3; r<=t.pos[0]+3; r++) {
          for (let c=t.pos[1]-3; c<=t.pos[1]+3; c++) {
            if (!inBounds(r,c,N)) continue;
            const nt = st.allTiles[r*N + c];
            if (!nt.opened && (nt.type === 'trap' || nt.type === 'lock')) challenge++;
            if (nt.opened) openedNear++;
          }
        }
        if (cfg.requireChallenge && challenge < 1) return;
        // weight: prefer mid-distance + challenge nearby + few opened tiles
        const w = challenge * 2 + (openedNear < 4 ? 3 : 0) + (d >= 12 && d <= 14 ? 2 : 0) + 1;
        candidates.push({ idx, pos:t.pos.slice(), w });
      });

      let chosen;
      if (!candidates.length) {
        // fallback — any unopened empty
        const fb = st.allTiles.filter(t => !t.opened && t.type === 'empty');
        if (fb.length) chosen = { pos: fb[Math.floor(Math.random()*fb.length)].pos.slice() };
        else {
          // last resort — any unopened tile
          const any = st.allTiles.filter(t => !t.opened);
          chosen = { pos: any[0].pos.slice() };
        }
      } else {
        const totalW = candidates.reduce((a,b) => a + b.w, 0);
        let r = Math.random() * totalW;
        for (const c of candidates) {
          r -= c.w;
          if (r <= 0) { chosen = c; break; }
        }
        if (!chosen) chosen = candidates[0];
      }
      st.goalTile = chosen.pos;
      return chosen.pos;
    },

    /* ---- mutators / queries ---- */
    getState() {
      const st = this._state;
      return {
        pos: st.playerPos.slice(),
        energy: st.energy,
        questionsAnswered: st.questionsAnswered,
        flipped: st.flipped,
        goalTile: st.goalTile ? st.goalTile.slice() : null,
        opened: new Set(st.opened),
        openedCount: st.opened.size,
        knowledgeOpened: st.allTiles.filter(t => t.type === 'knowledge' && t.opened).length,
        knowledgeTotal: st.allTiles.filter(t => t.type === 'knowledge').length,
        trapsTotal: st.allTiles.filter(t => t.type === 'trap').length,
        trapsRefuted: st.trapsRefuted.slice(),
        trapsFailed: st.trapsFailed.slice(),
        bonusCollected: st.bonusCollected.slice(),
        bonusTotal: st.allTiles.filter(t => t.type === 'bonus').length,
        hintsUsedPhase1: st.hintsUsedPhase1,
        hintsUsedPhase2: st.hintsUsedPhase2,
        zonesVisited: Object.assign({}, st.zonesVisited),
        achievements: Array.from(st.achievements),
        firstTryAll: st.firstTryAll,
        turnSinceFlip: st.turnSinceFlip,
        N: st.N,
      };
    },

    /* ---- energy / answer hooks ---- */
    addEnergy(d) {
      this._state.energy = Math.max(0, this._state.energy + d);
      this._emit('energy', { delta:d, energy:this._state.energy });
      this._autosave();
      if (this._state.energy <= 0) this._emit('lose', { state: this.getState() });
      return this._state.energy;
    },
    bumpAnswered(correct, firstTry) {
      this._state.questionsAnswered++;
      if (!correct || !firstTry) this._state.firstTryAll = false;
      // F3 · ทอย/ตอบ = เริ่ม turn ใหม่ → reset hint cooldown
      this._state.hintUsedThisTurn = false;
      this._autosave();
    },
    markTrapRefuted(mId) {
      if (!this._state.trapsRefuted.includes(mId)) this._state.trapsRefuted.push(mId);
    },
    markTrapFailed(mId) {
      this._state.trapsFailed.push(mId);
    },
    markBonus(b) {
      this._state.bonusCollected.push(b);
    },
    markPlayerOnTile() {
      const [r, c] = this._state.playerPos;
      const el = this._tileEl(r, c);
      if (el) {
        this._container.querySelectorAll('.vg-tile').forEach(e => e.classList.remove('player'));
        el.classList.add('player');
      }
    },

    /* ---- reveal helpers (for ending) ---- */
    reveal: {
      _self: null,
      goal()         { return this._self._state.goalTile; },
      allKnowledge() { return this._self._state.allTiles.filter(t => t.type === 'knowledge'); },
      allTraps()     { return this._self._state.allTiles.filter(t => t.type === 'trap'); },
      allBonus()     { return this._self._state.allTiles.filter(t => t.type === 'bonus'); },
    },

    /* ---- achievements ---- */
    achievements: {
      _self: null,
      unlock(id) {
        const self = this._self;
        if (!self._state) return false;
        if (self._state.achievements.has(id)) return false;
        self._state.achievements.add(id);
        // F5 · emit achievement event for popup
        const cfg = (self._state.cfg && self._state.cfg.achievements) || {};
        const meta = cfg[id] || { icon:'🏆', name:id, desc:'' };
        try { self._emit('achievement', { id, icon: meta.icon, name: meta.name, desc: meta.desc }); } catch(e){}
        self._autosave();
        return true;
      },
      getAll() { return Array.from(this._self._state.achievements); },
    },

    /* ---- F7 · save/resume ---- */
    _saveKey() {
      const epId = (this._opts && this._opts.saveKey) || 'cosmosLog_ep06_boss_progress';
      return epId;
    },
    _autosaveTimer: null,
    _autosave() {
      if (!this._state) return;
      // throttle 500ms
      if (this._autosaveTimer) return;
      this._autosaveTimer = setTimeout(() => {
        this._autosaveTimer = null;
        this.saveProgress();
      }, 500);
    },
    saveProgress() {
      const st = this._state;
      if (!st || st.ended) return false;
      try {
        const dump = {
          v: 1,
          ts: Date.now(),
          N: st.N,
          seed: st.seed,
          playerPos: st.playerPos,
          startPos: st.startPos,
          energy: st.energy,
          questionsAnswered: st.questionsAnswered,
          flipped: st.flipped,
          goalTile: st.goalTile,
          opened: Array.from(st.opened),
          hintsUsedPhase1: st.hintsUsedPhase1,
          hintsUsedPhase2: st.hintsUsedPhase2,
          hintLog: st.hintLog,
          trapsRefuted: st.trapsRefuted,
          trapsFailed: st.trapsFailed,
          bonusCollected: st.bonusCollected,
          achievements: Array.from(st.achievements),
          firstTryAll: st.firstTryAll,
          zonesVisited: st.zonesVisited,
          turnSinceFlip: st.turnSinceFlip,
          // tiles state (opened + locked)
          tiles: st.allTiles.map(t => ({ o:t.opened?1:0, l:t.locked?1:0 })),
        };
        localStorage.setItem(this._saveKey(), JSON.stringify(dump));
        return true;
      } catch(e){ return false; }
    },
    hasSavedProgress() {
      try { return !!localStorage.getItem(this._saveKey()); } catch(e){ return false; }
    },
    loadProgress() {
      try {
        const raw = localStorage.getItem(this._saveKey());
        if (!raw) return false;
        const d = JSON.parse(raw);
        const st = this._state;
        if (!st || d.N !== st.N) return false;
        st.playerPos = d.playerPos.slice();
        st.energy = d.energy;
        st.questionsAnswered = d.questionsAnswered;
        st.flipped = d.flipped;
        st.goalTile = d.goalTile ? d.goalTile.slice() : null;
        st.opened = new Set(d.opened || []);
        st.hintsUsedPhase1 = d.hintsUsedPhase1 || 0;
        st.hintsUsedPhase2 = d.hintsUsedPhase2 || 0;
        st.hintLog = d.hintLog || [];
        st.trapsRefuted = d.trapsRefuted || [];
        st.trapsFailed = d.trapsFailed || [];
        st.bonusCollected = d.bonusCollected || [];
        st.achievements = new Set(d.achievements || []);
        st.firstTryAll = d.firstTryAll !== false;
        st.zonesVisited = d.zonesVisited || { edge:0, outer:0, belt:0, inner:0 };
        st.turnSinceFlip = d.turnSinceFlip || 0;
        if (Array.isArray(d.tiles)) {
          d.tiles.forEach((tt, i) => {
            if (st.allTiles[i]) {
              st.allTiles[i].opened = !!tt.o;
              if (tt.l) st.allTiles[i].locked = true;
            }
          });
        }
        this._render();
        return true;
      } catch(e){ console.warn('VoidGrid loadProgress fail', e); return false; }
    },
    clearSavedProgress() {
      try { localStorage.removeItem(this._saveKey()); } catch(e){}
    },
    markEnded() {
      if (this._state) { this._state.ended = true; this.clearSavedProgress(); }
    },

    /* ---- F2/F3 helper queries ---- */
    isHintBlocked() { return !!(this._state && this._state.hintUsedThisTurn); },
    getMiniMapData() {
      const st = this._state;
      if (!st) return null;
      return {
        N: st.N,
        playerPos: st.playerPos.slice(),
        goalTile: st.goalTile ? st.goalTile.slice() : null,
        flipped: st.flipped,
        tiles: st.allTiles.map(t => ({
          r: t.pos[0], c: t.pos[1],
          type: t.type,
          opened: !!t.opened,
        })),
      };
    },

    _toast(text) {
      const t = document.createElement('div');
      t.className = 'vg-toast'; t.textContent = text;
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 2400);
    },

    reset() {
      this._state = null;
      this._listeners = {};
      this._moveMode = false;
      if (this._container) this._container.innerHTML = '';
    },
  };

  VoidGrid.reveal._self = VoidGrid;
  VoidGrid.achievements._self = VoidGrid;

  global.VoidGrid = VoidGrid;
})(window);
