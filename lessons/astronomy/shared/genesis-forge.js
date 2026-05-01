/* ===== COSMOS LOG · GENESIS FORGE · Boss Engine (EP08) =====
 * Canvas-based action boss · 4 epoch phases · drag-shoot keys
 * VOID Prime · final showdown · 5 endings · 12 achievements
 *
 * Usage:
 *   GenesisForge.init({ host: el, onEnd: (result) => {} });
 *   GenesisForge.start();
 *
 * Dependencies: S1Keyring, GenesisFX, TimelineViz, KPA (optional)
 */
(function(global){

  const PHASE_DEFS = [
    { id:1, key:'inflation', name:'INFLATION SHOCKWAVE',
      taunt:'ฉันจะหยุด inflation · จักรวาลจะยุบกลับ',
      victory:'INFLATION STABILIZED · เอกภพขยาย 10²⁶ เท่า',
      need: 6, color:'#ff6ab8',
      enemyType:'wave',     // collapse waves เข้ามาจากขวา
      catFor: ['bigbang', 'stellar']
    },
    { id:2, key:'nucleosynth', name:'NUCLEOSYNTHESIS FORGE',
      taunt:'ไม่มีฟิวชัน · ไม่มีดาวฤกษ์',
      victory:'FIRST NUCLEI FORMED · H · He · Li',
      need: 12, color:'#ff8a3d',
      enemyType:'drone',    // anti-fusion drones ลอยเข้า core
      catFor: ['stellar', 'sun']
    },
    { id:3, key:'cmb', name:'CMB RELEASE',
      taunt:'จักรวาลจะขุ่นมัวตลอดกาล',
      victory:'CMB RELEASED · 2.73K · FIRST STARS IGNITED',
      need: 3, color:'#ffd84a',
      enemyType:'tendril',  // VOID tendrils ลาก first stars
      catFor: ['bigbang', 'stellar', 'tech']
    },
    { id:4, key:'galaxies', name:'STRUCTURE DEFENSE',
      taunt:'ฉันจะกระจาย dark matter · ไม่มีกาแล็กซี',
      victory:'GALAXIES BORN · STRUCTURE LOCKED',
      need: 8, color:'#6a3aff',
      enemyType:'vortex',   // anti-galaxy vortex
      catFor: ['solar', 'tech']
    }
  ];

  // ----- runtime state -----
  let State = null;
  let Canvas = null;
  let Ctx = null;
  let HostEl = null;
  let _onEnd = null;

  // ----- dom refs -----
  let HUDRef = null, KeyDockRef = null, StatusRef = null, OverlayRef = null;

  function _resetState(){
    State = {
      phase: 0,           // 0 = before start
      hp: 12, hpMax: 12,
      score: 0,
      keysUsed: new Set(),
      keysHit: 0,
      keysMiss: 0,
      phaseProgress: 0,
      enemies: [],
      projectiles: [],
      selectedKey: null,
      cooldownUntil: 0,
      paused: false,
      finished: false,
      startTime: 0,
      ticks: 0,
      hintless: true,
      noPhaseHit: true,    // perfect phase
      lockKeyPool: null,   // sets per phase
      result: null
    };
  }

  // ============== INIT ==============
  function init(opts){
    opts = opts || {};
    HostEl = opts.host;
    _onEnd = opts.onEnd || function(){};
    if (!HostEl) throw new Error('GenesisForge: host required');

    HostEl.innerHTML = '';
    HostEl.classList.add('gf-host');

    // canvas layer
    Canvas = document.createElement('canvas');
    Canvas.className = 'gf-canvas';
    HostEl.appendChild(Canvas);
    _resizeCanvas();
    window.addEventListener('resize', _resizeCanvas);
    Ctx = Canvas.getContext('2d');

    // HUD overlay
    const hud = document.createElement('div');
    hud.className = 'gf-hud';
    hud.innerHTML = `
      <div class="gf-hud-top">
        <div class="gf-hp-wrap">
          <div class="gf-label">HP</div>
          <div class="gf-hp-bar"><div class="gf-hp-fill"></div></div>
          <div class="gf-hp-text">12/12</div>
        </div>
        <div class="gf-phase-wrap">
          <div class="gf-phase-name">— READY —</div>
          <div class="gf-phase-prog">
            <div class="gf-phase-fill"></div>
          </div>
          <div class="gf-phase-count">0/0</div>
        </div>
        <div class="gf-keys-counter">🗝️ <span class="gf-keys-used">0</span>/<span class="gf-keys-total">17</span></div>
      </div>
      <div class="gf-status"></div>
    `;
    HostEl.appendChild(hud);
    HUDRef = hud;
    StatusRef = hud.querySelector('.gf-status');

    // key dock (bottom)
    const dock = document.createElement('div');
    dock.className = 'gf-keydock';
    HostEl.appendChild(dock);
    KeyDockRef = dock;

    // overlay (intro / phase clear / endings)
    const ov = document.createElement('div');
    ov.className = 'gf-overlay';
    HostEl.appendChild(ov);
    OverlayRef = ov;

    _injectCSS();
    _resetState();
    _renderKeys();

    // FX system
    if (global.GenesisFX) global.GenesisFX.attach(Canvas);

    // input
    Canvas.addEventListener('click', _onCanvasClick);
    Canvas.addEventListener('dragover', e => { e.preventDefault(); });
    Canvas.addEventListener('drop', _onCanvasDrop);
    Canvas.addEventListener('touchend', _onCanvasTouch, { passive:false });

    // start loop
    _startLoop();
  }

  function _resizeCanvas(){
    if (!Canvas) return;
    const rect = HostEl.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    Canvas.width = Math.max(320, Math.floor(rect.width));
    Canvas.height = Math.max(360, Math.floor(rect.height));
  }

  // ============== START / PHASE ==============
  function start(){
    if (!State) _resetState();
    State.startTime = performance.now();
    _showOverlay({
      title: 'VOID PRIME · FINAL SHOWDOWN',
      sub: '13.8 พันล้านปีเขารอเธออยู่ที่นี่',
      body: `
        <p>ใช้ 🗝️ S1 KEYRING ${global.S1Keyring ? S1Keyring.count().owned : '?'} ดวงป้องกัน Anti-Genesis Engine 4 จุด</p>
        <ul class="gf-howto">
          <li>🖱️ <b>ลาก key</b> จาก inventory ↓ ไปลงเป้าหมายบน canvas</li>
          <li>📱 <b>แตะ key</b> เลือก → แตะเป้าหมายเพื่อยิง</li>
          <li>✨ <b>Key ตรง category</b> = ทำลายเป้าหมาย</li>
          <li>❌ <b>Key ผิด category</b> = HP -1</li>
        </ul>
      `,
      btn: 'เริ่มต่อสู้ · PHASE 1 INFLATION',
      onClick: () => _enterPhase(1)
    });
  }

  function _enterPhase(n){
    State.phase = n;
    State.phaseProgress = 0;
    State.enemies = [];
    State.projectiles = [];
    State.noPhaseHit = true;
    State.lockKeyPool = new Set(_keysOwned().filter(k => PHASE_DEFS[n-1].catFor.includes(k.cat)).map(k => k.id));
    _hideOverlay();
    _updateHUD();
    _spawnPhase(n);
    _phaseTaunt(n);
  }

  function _phaseTaunt(n){
    const def = PHASE_DEFS[n-1];
    const t = document.createElement('div');
    t.className = 'gf-taunt';
    t.style.color = def.color;
    t.innerHTML = `<span class="gf-taunt-tag">VOID PRIME · PHASE ${n}</span><br>"${def.taunt}"`;
    HostEl.appendChild(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 600); }, 2200);
  }

  // ============== ENEMY SPAWN ==============
  function _spawnPhase(n){
    const def = PHASE_DEFS[n-1];
    const w = Canvas.width, h = Canvas.height;
    if (def.enemyType === 'wave'){
      // 6 waves coming from right
      for (let i = 0; i < def.need; i++){
        State.enemies.push({
          type:'wave', id:'w'+i,
          x: w + 120 + i * 220, y: h * (0.25 + Math.random()*0.5),
          vx: -0.04 - Math.random()*0.02,
          r: 28 + Math.random()*10,
          alive: true, color: def.color,
          requireCat: 'bigbang' // primary
        });
      }
    } else if (def.enemyType === 'drone'){
      // 12 fusion drones spawn over time toward center core
      for (let i = 0; i < def.need; i++){
        const ang = (i / def.need) * Math.PI * 2;
        const dist = w * 0.5 + 80;
        State.enemies.push({
          type:'drone', id:'d'+i,
          x: w/2 + Math.cos(ang) * dist,
          y: h/2 + Math.sin(ang) * dist,
          vx: -Math.cos(ang) * 0.025,
          vy: -Math.sin(ang) * 0.025,
          r: 18, alive: true,
          color:'#4a90e2',
          spawnDelay: i * 600,
          requireCat: 'stellar'
        });
      }
    } else if (def.enemyType === 'tendril'){
      // 3 star-eater tendrils with anchor at edges
      for (let i = 0; i < def.need; i++){
        State.enemies.push({
          type:'tendril', id:'t'+i,
          x: 80 + (w - 160) * (i / Math.max(1, def.need-1)),
          y: h * 0.85,
          targetY: h * 0.4 + Math.random()*40,
          progress: 0,
          alive: true, color:'#ff6ab8',
          requireCat: 'stellar'
        });
      }
      // also activate plasma fog
      State.plasmaFog = 1;
    } else if (def.enemyType === 'vortex'){
      // single vortex with 8 hp
      State.enemies.push({
        type:'vortex', id:'v0',
        x: Canvas.width/2, y: Canvas.height/2,
        r: 90, hp: def.need, alive: true,
        color: def.color,
        requireCat: 'tech'
      });
    }
  }

  // ============== INPUT ==============
  function _onCanvasClick(e){
    if (!State || State.finished || State.phase === 0) return;
    if (!State.selectedKey) {
      _flashStatus('แตะ key ก่อน · แล้วแตะเป้าหมาย');
      return;
    }
    const rect = Canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    _fireKey(State.selectedKey, x, y);
  }

  function _onCanvasTouch(e){
    if (!State || State.finished || State.phase === 0) return;
    e.preventDefault();
    const t = e.changedTouches[0];
    if (!t) return;
    const rect = Canvas.getBoundingClientRect();
    const x = t.clientX - rect.left;
    const y = t.clientY - rect.top;
    if (State.selectedKey) _fireKey(State.selectedKey, x, y);
  }

  function _onCanvasDrop(e){
    e.preventDefault();
    if (!State || State.finished || State.phase === 0) return;
    const id = e.dataTransfer.getData('application/x-s1key') || e.dataTransfer.getData('text/plain');
    if (!id) return;
    const rect = Canvas.getBoundingClientRect();
    _fireKey(id, e.clientX - rect.left, e.clientY - rect.top);
  }

  function _fireKey(keyId, tx, ty){
    if (performance.now() < State.cooldownUntil) return;
    State.cooldownUntil = performance.now() + 250;

    const k = global.S1Keyring && S1Keyring.catalog.find(x => x.id === keyId);
    if (!k) return;
    if (!_keysOwned().some(o => o.id === keyId)){
      _flashStatus('🔒 key นี้ยังไม่ได้ปลด · ต้องเล่น ' + k.ep + ' ก่อน');
      return;
    }

    // find nearest enemy alive
    const target = _findTarget(tx, ty);
    if (!target){
      _flashStatus('ไม่มีเป้าหมายตรงนั้น');
      return;
    }

    // spawn projectile
    const sx = Canvas.width/2;
    const sy = Canvas.height + 30;
    State.projectiles.push({
      x: sx, y: sy,
      tx: target.x, ty: target.y,
      targetId: target.id,
      keyId, cat: k.cat,
      icon: k.icon,
      progress: 0,
      vx: (target.x - sx) * 0.04,
      vy: (target.y - sy) * 0.04,
      color: PHASE_DEFS[State.phase-1].color
    });

    State.keysUsed.add(keyId);
    _updateHUD();
  }

  function _findTarget(x, y){
    let best = null, bestD = 70*70;
    State.enemies.forEach(e => {
      if (!e.alive) return;
      if (e.spawnDelay && (performance.now() - State._phaseStart) < e.spawnDelay) return;
      const dx = e.x - x, dy = e.y - y;
      const d = dx*dx + dy*dy;
      const r2 = (e.r||30) * (e.r||30) * 2.5;
      if (d < r2 && d < bestD){ bestD = d; best = e; }
    });
    // fallback: nearest alive (long range)
    if (!best){
      let bd = Infinity;
      State.enemies.forEach(e => {
        if (!e.alive) return;
        if (e.spawnDelay && (performance.now() - State._phaseStart) < e.spawnDelay) return;
        const dx = e.x - x, dy = e.y - y;
        const d = dx*dx + dy*dy;
        if (d < bd){ bd = d; best = e; }
      });
    }
    return best;
  }

  // ============== LOOP ==============
  function _startLoop(){
    let last = performance.now();
    State._phaseStart = last;
    function tick(now){
      const dt = Math.min(64, now - last);
      last = now;
      if (State && !State.paused && !State.finished){
        _step(dt);
      }
      _draw();
      if (!State || !State.finished) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function _step(dt){
    State.ticks += dt;
    const def = PHASE_DEFS[State.phase-1];

    // move enemies
    State.enemies.forEach(e => {
      if (!e.alive) return;
      if (e.type === 'wave'){
        e.x += e.vx * dt;
        if (e.x < -50){
          e.alive = false;
          _onEnemyEscape(e);
        }
      } else if (e.type === 'drone'){
        if (e.spawnDelay && (performance.now() - State._phaseStart) < e.spawnDelay) return;
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        const dx = e.x - Canvas.width/2;
        const dy = e.y - Canvas.height/2;
        if (Math.sqrt(dx*dx + dy*dy) < 40){
          e.alive = false;
          _onEnemyEscape(e);
        }
      } else if (e.type === 'tendril'){
        e.progress += dt * 0.0004;
        e.y = (Canvas.height * 0.85) + (e.targetY - Canvas.height*0.85) * Math.min(1, e.progress);
        if (e.progress >= 1.0){
          e.alive = false;
          _onEnemyEscape(e);
        }
      } else if (e.type === 'vortex'){
        // pulses, no movement
      }
    });

    // move projectiles
    for (let i = State.projectiles.length - 1; i >= 0; i--){
      const p = State.projectiles[i];
      p.x += p.vx * dt * 0.06;
      p.y += p.vy * dt * 0.06;
      const target = State.enemies.find(e => e.id === p.targetId);
      if (!target || !target.alive){
        // miss · explode
        if (global.GenesisFX) GenesisFX.impactBurst(p.x, p.y, { color:'#ff6a6a' });
        State.projectiles.splice(i, 1);
        State.keysMiss++;
        _hpDamage(0); // no penalty for stale target
        continue;
      }
      const dx = target.x - p.x, dy = target.y - p.y;
      if (Math.abs(dx) < 30 && Math.abs(dy) < 30){
        _resolveHit(p, target);
        State.projectiles.splice(i, 1);
      }
    }
  }

  function _resolveHit(proj, enemy){
    const def = PHASE_DEFS[State.phase-1];
    const matches = def.catFor.includes(proj.cat);
    if (!matches){
      // wrong type · damage player
      _hpDamage(1);
      State.keysMiss++;
      State.noPhaseHit = false;
      if (global.GenesisFX) GenesisFX.impactBurst(enemy.x, enemy.y, { color:'#ff6a6a', count:8 });
      _flashStatus('❌ key ผิดประเภท · -1 HP');
      return;
    }
    // correct type · damage enemy / progress phase
    State.keysHit++;
    if (enemy.type === 'vortex'){
      enemy.hp--;
      if (global.GenesisFX) GenesisFX.impactBurst(enemy.x + (Math.random()-.5)*40, enemy.y + (Math.random()-.5)*40, { color: def.color });
      _flashStatus('⚡ vortex hp ' + enemy.hp + '/' + def.need);
      State.phaseProgress = def.need - enemy.hp;
      if (enemy.hp <= 0){
        enemy.alive = false;
        if (global.GenesisFX) {
          GenesisFX.galaxySpin(enemy.x, enemy.y, { color: def.color });
          GenesisFX.screenShake(14, 600);
        }
        _phaseClear();
      }
    } else {
      enemy.alive = false;
      State.phaseProgress++;
      // FX per type
      if (global.GenesisFX){
        if (enemy.type === 'wave') GenesisFX.inflationBurst(enemy.x, enemy.y, { color: def.color });
        if (enemy.type === 'drone') GenesisFX.nucleusFormation(enemy.x, enemy.y);
        if (enemy.type === 'tendril') {
          GenesisFX.starIgnition(enemy.x, enemy.y);
          State.plasmaFog = Math.max(0, State.plasmaFog - 0.34);
        }
      }
      if (State.phaseProgress >= def.need) _phaseClear();
    }
    _updateHUD();
  }

  function _onEnemyEscape(e){
    _hpDamage(1);
    State.noPhaseHit = false;
    _flashStatus('💢 ' + (e.type === 'wave' ? 'wave หลุด' : e.type === 'drone' ? 'drone เข้า core' : 'tendril ลากดาว') + ' · -1 HP');
  }

  function _hpDamage(n){
    if (n <= 0) return;
    State.hp = Math.max(0, State.hp - n);
    if (global.GenesisFX) GenesisFX.screenShake(6, 200);
    if (State.hp <= 0) _gameOver();
    _updateHUD();
  }

  function _phaseClear(){
    const n = State.phase;
    const def = PHASE_DEFS[n-1];
    // FX
    if (global.GenesisFX){
      if (n === 1) for (let i = 0; i < 4; i++) setTimeout(() => GenesisFX.inflationBurst(Canvas.width*Math.random(), Canvas.height*Math.random(), { color: def.color, maxR: 400 }), i*120);
      if (n === 2) GenesisFX.cmbShower({ count: 60, life: 1500 });
      if (n === 3) {
        GenesisFX.cmbShower({ count: 240, life: 2400 });
        State.plasmaFog = 0;
      }
      if (n === 4) {
        // big galaxy spin
        for (let i = 0; i < 6; i++) setTimeout(() => GenesisFX.galaxySpin(Canvas.width*Math.random(), Canvas.height*Math.random(), { color: def.color }), i*200);
      }
    }

    if (global.KPA) KPA.research('phaseClear', { phase:n, hp:State.hp, hits:State.keysHit, perfect:State.noPhaseHit });

    setTimeout(() => {
      _showOverlay({
        title: '✅ PHASE ' + n + ' CLEAR',
        sub: def.victory,
        body: `<p>HP เหลือ: <b>${State.hp}/${State.hpMax}</b> · keys ใช้: <b>${State.keysUsed.size}</b></p>` +
              (State.noPhaseHit ? '<p class="gf-perfect">✨ PERFECT PHASE · ไม่เสีย HP</p>' : ''),
        btn: n < 4 ? 'PHASE ' + (n+1) + ' →' : 'FINAL FINISHER →',
        onClick: () => {
          if (n < 4) _enterPhase(n+1);
          else _enterFinisher();
        }
      });
    }, 1400);
  }

  function _enterFinisher(){
    const owned = global.S1Keyring ? S1Keyring.count().owned : 0;
    const canFinisher = owned >= 12 && State.hp > 0;
    _showOverlay({
      title: canFinisher ? '⚡ GENESIS LANCE READY' : 'FINAL STRIKE',
      sub: canFinisher ? 'keys ' + owned + '/17 · finisher unlocked' : 'keys ' + owned + '/17 · finisher locked (need ≥12)',
      body: canFinisher
        ? '<p>กดยิง <b>GENESIS LANCE</b> · ปิดฉาก VOID Prime ตลอดกาล</p>'
        : '<p>ยิงปกติได้ · แต่ ending จะถูก cap ที่ B</p>',
      btn: canFinisher ? '🚀 FIRE GENESIS LANCE' : 'ยิงสรุป',
      onClick: () => {
        _hideOverlay();
        if (canFinisher) _runFinisher(true);
        else _runFinisher(false);
      }
    });
  }

  function _runFinisher(withLance){
    if (global.GenesisFX){
      GenesisFX.slowMotion(0.3, 1800, () => {
        // VOID core impact
        if (withLance){
          GenesisFX.bigBangFinale({
            life: 4200,
            onCaption: () => {
              _showOverlay({
                title: '🌌 BIG BANG RESTORED',
                sub: '13.8 พันล้านปีต่อมา...',
                body: '<p>เอกภพที่เธอรู้จัก · ถูกป้องกันสำเร็จ</p>',
                btn: 'ดู ending',
                onClick: () => _computeEnding()
              });
            }
          });
        } else {
          GenesisFX.inflationBurst(Canvas.width/2, Canvas.height/2, { color:'#ff8a3d', maxR: Canvas.width });
          setTimeout(() => _computeEnding(), 1600);
        }
      });
      // lance animation
      if (withLance){
        for (let i = 0; i < 5; i++){
          setTimeout(() => GenesisFX.starIgnition(Canvas.width*0.5, Canvas.height*0.5, { color:'#ffd84a' }), i*120);
        }
      }
    } else {
      _computeEnding();
    }
  }

  function _computeEnding(){
    const owned = global.S1Keyring ? S1Keyring.count().owned : 0;
    const phasesCleared = State.phase >= 4 ? 4 : State.phase - 1;
    let ending = 'C';
    if (phasesCleared >= 4){
      if (State.hp >= State.hpMax && owned >= 17) ending = 'A+';
      else if (State.hp >= 8) ending = 'A';
      else if (State.hp >= 1) ending = 'B';
    }
    State.result = {
      ending,
      hp: State.hp, hpMax: State.hpMax,
      keysUsed: Array.from(State.keysUsed),
      keysOwned: owned,
      phasesCleared,
      hits: State.keysHit, miss: State.keysMiss,
      durationMs: performance.now() - State.startTime,
      perfectPhases: 0 // computed elsewhere if needed
    };
    State.finished = true;
    if (global.KPA) KPA.research('bossEnd', State.result);

    const labels = {
      'A+': { name:'ARCHITECT', icon:'🏆', color:'#ffd84a',
              text:'เธอใช้ S1 ทั้งหมด · เอกภพรอด 100% · พ่อยังเป็นผู้พิทักษ์ที่ t=0' },
      'A':  { name:'DEFENDER', icon:'🌟', color:'#ff8a3d',
              text:'4 epoch สำเร็จ · พ่อให้คำใบ้ Season 2' },
      'B':  { name:'APPRENTICE', icon:'⭐', color:'#4a90e2',
              text:'4 epoch · บางส่วนเสียหาย · จักรวาลรอดอย่างเฉียดฉิว' },
      'C':  { name:'ALTERED TIMELINE', icon:'⚠️', color:'#ff6a6a',
              text:'epoch ไม่ครบ · จักรวาลเริ่มใหม่ผิดเพี้ยน' }
    };
    const lbl = labels[ending];
    _showOverlay({
      title: lbl.icon + ' ENDING ' + ending + ' · ' + lbl.name,
      sub: lbl.text,
      body: `
        <div class="gf-result">
          <div>HP: <b>${State.hp}/${State.hpMax}</b></div>
          <div>Keys ใช้: <b>${State.keysUsed.size}/17</b></div>
          <div>Phase ผ่าน: <b>${phasesCleared}/4</b></div>
          <div>ยิงตรง: <b>${State.keysHit}</b> · พลาด: <b>${State.keysMiss}</b></div>
          <div>เวลา: <b>${(State.result.durationMs/1000).toFixed(1)}s</b></div>
        </div>
      `,
      color: lbl.color,
      btn: 'จบบอส · ไป ending screen →',
      onClick: () => { _onEnd(State.result); }
    });
  }

  function _gameOver(){
    State.finished = true;
    State.result = {
      ending:'C', hp:0, hpMax:State.hpMax,
      keysUsed: Array.from(State.keysUsed), keysOwned: global.S1Keyring ? S1Keyring.count().owned : 0,
      phasesCleared: Math.max(0, State.phase - 1),
      hits: State.keysHit, miss: State.keysMiss,
      durationMs: performance.now() - State.startTime, gameOver: true
    };
    if (global.KPA) KPA.research('bossGameOver', State.result);
    _showOverlay({
      title: '💀 HP DEPLETED',
      sub: 'จักรวาลถูก VOID Prime ลบ',
      body: '<p>กดเริ่มใหม่หรือกลับไปทำ EP เก่าเพื่อปลด keys เพิ่ม</p>',
      btn: 'ดู ending C',
      color: '#ff6a6a',
      onClick: () => { _onEnd(State.result); }
    });
  }

  // ============== DRAW ==============
  function _draw(){
    if (!Ctx) return;
    const w = Canvas.width, h = Canvas.height;

    // background gradient
    const g = Ctx.createRadialGradient(w/2, h*0.4, 30, w/2, h/2, Math.max(w,h));
    g.addColorStop(0, '#1a0a30');
    g.addColorStop(0.5, '#0a0418');
    g.addColorStop(1, '#050108');
    Ctx.fillStyle = g;
    Ctx.fillRect(0, 0, w, h);

    // starfield
    _drawStars(w, h);

    // VOID Prime breathing shadow center-back
    if (State && State.phase > 0 && State.phase < 5){
      _drawVoidPrime(w, h);
    }

    // plasma fog (phase 3)
    if (State && State.plasmaFog > 0){
      Ctx.fillStyle = `rgba(255,106,184,${0.3 * State.plasmaFog})`;
      Ctx.fillRect(0, 0, w, h);
    }

    // core (phase 2)
    if (State && State.phase === 2 && !State.finished){
      const def = PHASE_DEFS[1];
      Ctx.save();
      const cg = Ctx.createRadialGradient(w/2, h/2, 5, w/2, h/2, 60);
      cg.addColorStop(0, '#fff5e3');
      cg.addColorStop(0.4, def.color);
      cg.addColorStop(1, 'rgba(255,138,61,0)');
      Ctx.fillStyle = cg;
      Ctx.beginPath(); Ctx.arc(w/2, h/2, 60, 0, Math.PI*2); Ctx.fill();
      Ctx.restore();
    }

    // enemies
    State && State.enemies.forEach(e => _drawEnemy(e));

    // projectiles
    State && State.projectiles.forEach(p => _drawProjectile(p));

    // FX layer is handled internally by GenesisFX.attach()

    // timeline ribbon top
    _drawTimelineRibbon(w, h);
  }

  // simple twinkling stars (cached positions)
  const _stars = Array.from({length: 90}).map(() => ({
    x: Math.random(), y: Math.random(),
    r: Math.random() * 1.4 + 0.3,
    ph: Math.random() * Math.PI * 2
  }));
  function _drawStars(w, h){
    const t = performance.now() * 0.001;
    Ctx.fillStyle = '#fff';
    _stars.forEach(s => {
      const a = 0.3 + 0.5 * Math.abs(Math.sin(t + s.ph));
      Ctx.globalAlpha = a;
      Ctx.beginPath(); Ctx.arc(s.x*w, s.y*h, s.r, 0, Math.PI*2); Ctx.fill();
    });
    Ctx.globalAlpha = 1;
  }

  function _drawVoidPrime(w, h){
    const t = performance.now() * 0.001;
    const breathe = 0.92 + Math.sin(t*1.4) * 0.08;
    const cx = w * 0.5;
    const cy = h * 0.35;
    const r = Math.min(w, h) * 0.32 * breathe;
    Ctx.save();
    const g = Ctx.createRadialGradient(cx, cy, r*0.2, cx, cy, r);
    g.addColorStop(0, 'rgba(20,5,40,0.95)');
    g.addColorStop(0.6, 'rgba(40,10,70,0.5)');
    g.addColorStop(1, 'rgba(20,5,40,0)');
    Ctx.fillStyle = g;
    Ctx.beginPath(); Ctx.arc(cx, cy, r, 0, Math.PI*2); Ctx.fill();

    // tendrils
    Ctx.strokeStyle = 'rgba(255,106,184,0.2)';
    Ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++){
      const a = t * 0.4 + i * (Math.PI/3);
      Ctx.beginPath();
      Ctx.moveTo(cx, cy);
      for (let j = 1; j < 18; j++){
        const rr = j * 14;
        Ctx.lineTo(cx + Math.cos(a + j*0.18) * rr, cy + Math.sin(a + j*0.18) * rr);
      }
      Ctx.stroke();
    }
    Ctx.restore();
  }

  function _drawEnemy(e){
    if (!e.alive) return;
    if (e.spawnDelay && (performance.now() - State._phaseStart) < e.spawnDelay) return;
    Ctx.save();
    if (e.type === 'wave'){
      const t = performance.now() * 0.003;
      const grad = Ctx.createRadialGradient(e.x, e.y, 4, e.x, e.y, e.r);
      grad.addColorStop(0, 'rgba(60,10,80,0.95)');
      grad.addColorStop(0.6, 'rgba(40,5,60,0.6)');
      grad.addColorStop(1, 'rgba(20,0,40,0)');
      Ctx.fillStyle = grad;
      Ctx.beginPath(); Ctx.arc(e.x, e.y, e.r, 0, Math.PI*2); Ctx.fill();
      Ctx.strokeStyle = 'rgba(255,106,184,0.55)';
      Ctx.lineWidth = 2;
      Ctx.beginPath();
      for (let i = 0; i < 30; i++){
        const ang = i / 30 * Math.PI * 2;
        const r2 = e.r * (1 + Math.sin(t * 2 + i) * 0.18);
        const px = e.x + Math.cos(ang) * r2;
        const py = e.y + Math.sin(ang) * r2;
        if (i === 0) Ctx.moveTo(px, py); else Ctx.lineTo(px, py);
      }
      Ctx.closePath(); Ctx.stroke();
    } else if (e.type === 'drone'){
      Ctx.fillStyle = 'rgba(74,144,226,0.9)';
      Ctx.beginPath(); Ctx.arc(e.x, e.y, e.r, 0, Math.PI*2); Ctx.fill();
      Ctx.strokeStyle = '#bce0ff'; Ctx.lineWidth = 2;
      Ctx.stroke();
      Ctx.fillStyle = '#fff';
      Ctx.font = '14px sans-serif';
      Ctx.textAlign = 'center';
      Ctx.fillText('❄', e.x, e.y + 5);
    } else if (e.type === 'tendril'){
      Ctx.strokeStyle = '#ff6ab8';
      Ctx.lineWidth = 4;
      Ctx.beginPath();
      Ctx.moveTo(e.x, Canvas.height);
      for (let i = 1; i <= 12; i++){
        const tt = i / 12;
        const xx = e.x + Math.sin(performance.now()*0.002 + i) * 12;
        const yy = Canvas.height - (Canvas.height - e.y) * tt;
        Ctx.lineTo(xx, yy);
      }
      Ctx.stroke();
      // head
      Ctx.fillStyle = '#ff6ab8';
      Ctx.beginPath(); Ctx.arc(e.x, e.y, 14, 0, Math.PI*2); Ctx.fill();
      // captured star
      Ctx.fillStyle = '#fff5e3';
      Ctx.beginPath(); Ctx.arc(e.x, e.y - 4, 4, 0, Math.PI*2); Ctx.fill();
    } else if (e.type === 'vortex'){
      const t = performance.now() * 0.001;
      Ctx.translate(e.x, e.y);
      Ctx.rotate(t);
      for (let arm = 0; arm < 4; arm++){
        Ctx.strokeStyle = e.color;
        Ctx.lineWidth = 3;
        Ctx.globalAlpha = 0.7;
        Ctx.beginPath();
        for (let i = 0; i < 60; i++){
          const r = i * 1.6;
          const a = arm * (Math.PI/2) + i * 0.1;
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r * 0.4;
          if (i === 0) Ctx.moveTo(px, py); else Ctx.lineTo(px, py);
        }
        Ctx.stroke();
      }
      Ctx.globalAlpha = 1;
      // core
      const cg = Ctx.createRadialGradient(0, 0, 4, 0, 0, 30);
      cg.addColorStop(0, '#fff');
      cg.addColorStop(1, e.color);
      Ctx.fillStyle = cg;
      Ctx.beginPath(); Ctx.arc(0, 0, 22, 0, Math.PI*2); Ctx.fill();
      // hp text
      Ctx.fillStyle = '#fff';
      Ctx.font = 'bold 14px sans-serif';
      Ctx.textAlign = 'center';
      Ctx.fillText(e.hp + '/' + PHASE_DEFS[3].need, 0, 5);
    }
    Ctx.restore();
  }

  function _drawProjectile(p){
    Ctx.save();
    Ctx.fillStyle = p.color;
    Ctx.shadowColor = p.color;
    Ctx.shadowBlur = 16;
    Ctx.beginPath(); Ctx.arc(p.x, p.y, 8, 0, Math.PI*2); Ctx.fill();
    Ctx.shadowBlur = 0;
    Ctx.fillStyle = '#fff';
    Ctx.font = '14px sans-serif';
    Ctx.textAlign = 'center';
    Ctx.fillText(p.icon, p.x, p.y + 5);
    Ctx.restore();
  }

  function _drawTimelineRibbon(w, h){
    const ribH = 28;
    const pad = 14;
    Ctx.save();
    Ctx.fillStyle = 'rgba(5,1,8,0.6)';
    Ctx.fillRect(0, 0, w, ribH + pad);
    PHASE_DEFS.forEach((def, i) => {
      const segW = w / 4;
      const cx = i * segW + segW/2;
      const active = State && State.phase === def.id;
      const done = State && State.phase > def.id;
      Ctx.globalAlpha = active ? 1 : (done ? 0.6 : 0.3);
      Ctx.fillStyle = def.color;
      Ctx.beginPath(); Ctx.arc(cx, ribH*0.5 + 4, active ? 12 : 8, 0, Math.PI*2); Ctx.fill();
      Ctx.fillStyle = '#fff';
      Ctx.font = active ? 'bold 11px sans-serif' : '10px sans-serif';
      Ctx.textAlign = 'center';
      Ctx.fillText(def.name, cx, ribH*0.5 + 22);
    });
    Ctx.globalAlpha = 1;
    Ctx.restore();
  }

  // ============== HUD ==============
  function _updateHUD(){
    if (!HUDRef || !State) return;
    const fill = HUDRef.querySelector('.gf-hp-fill');
    const text = HUDRef.querySelector('.gf-hp-text');
    const pname = HUDRef.querySelector('.gf-phase-name');
    const pfill = HUDRef.querySelector('.gf-phase-fill');
    const pcount = HUDRef.querySelector('.gf-phase-count');
    const used = HUDRef.querySelector('.gf-keys-used');
    const total = HUDRef.querySelector('.gf-keys-total');
    fill.style.width = (100 * State.hp / State.hpMax) + '%';
    text.textContent = State.hp + '/' + State.hpMax;
    if (State.phase > 0){
      const def = PHASE_DEFS[State.phase-1];
      pname.textContent = 'PHASE ' + State.phase + ' · ' + def.name;
      pname.style.color = def.color;
      const ratio = Math.min(1, State.phaseProgress / def.need);
      pfill.style.width = (ratio * 100) + '%';
      pfill.style.background = def.color;
      pcount.textContent = State.phaseProgress + '/' + def.need;
    }
    used.textContent = State.keysUsed.size;
    if (global.S1Keyring) total.textContent = S1Keyring.count().total;
  }

  function _flashStatus(msg){
    if (!StatusRef) return;
    StatusRef.textContent = msg;
    StatusRef.classList.add('show');
    clearTimeout(StatusRef._t);
    StatusRef._t = setTimeout(() => StatusRef.classList.remove('show'), 1800);
  }

  // ============== KEY DOCK ==============
  function _keysOwned(){
    if (!global.S1Keyring) return [];
    return S1Keyring.owned();
  }

  function _renderKeys(){
    if (!KeyDockRef || !global.S1Keyring) return;
    KeyDockRef.innerHTML = '';
    const all = S1Keyring.all();
    all.forEach(k => {
      const chip = document.createElement('button');
      chip.className = 'gf-key ' + (k.owned ? 'owned' : 'locked') + ' cat-' + k.cat;
      chip.dataset.id = k.id;
      chip.innerHTML = `<span class="gf-k-ic">${k.icon}</span><span class="gf-k-nm">${k.name}</span>`;
      if (k.owned){
        chip.draggable = true;
        chip.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', k.id);
          e.dataTransfer.setData('application/x-s1key', k.id);
          chip.classList.add('drag');
        });
        chip.addEventListener('dragend', () => chip.classList.remove('drag'));
        chip.addEventListener('click', () => _selectKey(k.id));
      } else {
        chip.title = 'ปลดด้วยการเล่น ' + k.ep;
      }
      KeyDockRef.appendChild(chip);
    });
  }

  function _selectKey(id){
    State.selectedKey = id;
    KeyDockRef.querySelectorAll('.gf-key').forEach(el => el.classList.toggle('selected', el.dataset.id === id));
    _flashStatus('🗝️ เลือก ' + id + ' · แตะเป้าหมายเพื่อยิง');
  }

  // ============== OVERLAY ==============
  function _showOverlay({ title, sub, body, btn, onClick, color }){
    if (!OverlayRef) return;
    OverlayRef.innerHTML = `
      <div class="gf-overlay-card" style="${color ? 'border-color:'+color+';box-shadow:0 0 60px '+color+'55;' : ''}">
        <h2 style="${color ? 'color:'+color : ''}">${title}</h2>
        ${sub ? `<div class="gf-overlay-sub">${sub}</div>` : ''}
        ${body || ''}
        ${btn ? `<button class="gf-btn">${btn}</button>` : ''}
      </div>
    `;
    OverlayRef.classList.add('show');
    if (onClick) {
      const b = OverlayRef.querySelector('.gf-btn');
      if (b) b.onclick = () => onClick();
    }
  }
  function _hideOverlay(){
    if (!OverlayRef) return;
    OverlayRef.classList.remove('show');
    OverlayRef.innerHTML = '';
  }

  // ============== CSS ==============
  function _injectCSS(){
    if (document.getElementById('gf-css')) return;
    const s = document.createElement('style');
    s.id = 'gf-css';
    s.textContent = `
      .gf-host{position:relative;width:100%;height:min(680px,80vh);min-height:480px;
        background:#050108;border-radius:14px;overflow:hidden;border:1px solid #2a1a45;
        font-family:'Sarabun',system-ui,sans-serif;color:#fff5e3;user-select:none;}
      .gf-canvas{position:absolute;inset:0;width:100%;height:100%;display:block;cursor:crosshair;}
      .gf-hud{position:absolute;top:8px;left:8px;right:8px;z-index:5;pointer-events:none;}
      .gf-hud-top{display:flex;align-items:center;gap:12px;flex-wrap:wrap;}
      .gf-hp-wrap{display:flex;align-items:center;gap:6px;background:rgba(5,1,8,.7);padding:4px 10px;border-radius:18px;border:1px solid #6a3aff44;}
      .gf-label{font-size:11px;color:#9bb;letter-spacing:.1em;}
      .gf-hp-bar{width:120px;height:8px;background:#1a0a30;border-radius:4px;overflow:hidden;}
      .gf-hp-fill{width:100%;height:100%;background:linear-gradient(90deg,#ff6a6a,#ff8a3d,#ffd84a);transition:width .3s;}
      .gf-hp-text{font-size:12px;font-weight:700;color:#ffd84a;min-width:40px;text-align:right;}
      .gf-phase-wrap{flex:1;min-width:140px;background:rgba(5,1,8,.7);padding:4px 10px;border-radius:10px;border:1px solid #ffd84a44;}
      .gf-phase-name{font-size:13px;font-weight:800;letter-spacing:.06em;}
      .gf-phase-prog{height:5px;background:#1a0a30;border-radius:3px;overflow:hidden;margin:2px 0;}
      .gf-phase-fill{width:0%;height:100%;background:#ffd84a;transition:width .3s;}
      .gf-phase-count{font-size:11px;color:#9bb;}
      .gf-keys-counter{background:rgba(5,1,8,.7);padding:4px 12px;border-radius:18px;border:1px solid #ffd84a44;font-size:12px;font-weight:700;color:#ffd84a;}
      .gf-status{position:absolute;left:50%;top:80px;transform:translateX(-50%);background:rgba(5,1,8,.85);padding:8px 16px;border-radius:18px;border:1px solid #ffd84a;color:#ffd84a;font-size:13px;font-weight:700;opacity:0;transition:opacity .25s;pointer-events:none;}
      .gf-status.show{opacity:1;}

      .gf-keydock{position:absolute;bottom:6px;left:6px;right:6px;z-index:6;
        display:flex;gap:4px;overflow-x:auto;padding:6px 4px;
        background:rgba(5,1,8,.85);border:1px solid #2a1a45;border-radius:10px;
        backdrop-filter:blur(8px);}
      .gf-key{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:1px;
        background:#11142a;border:1px solid #2a3a55;border-radius:8px;padding:5px 6px;
        color:#e3ecf8;cursor:pointer;font:inherit;min-width:64px;transition:all .15s;}
      .gf-key.owned{border-color:rgba(255,216,74,.5);}
      .gf-key.owned:hover,.gf-key.selected{border-color:#ffd84a;transform:translateY(-2px);box-shadow:0 4px 12px rgba(255,216,74,.4);}
      .gf-key.selected{background:linear-gradient(180deg,#3a2a08,#1a0e00);}
      .gf-key.locked{opacity:.3;cursor:not-allowed;filter:grayscale(.7);}
      .gf-key.drag{opacity:.5;}
      .gf-k-ic{font-size:18px;}
      .gf-k-nm{font-size:9px;line-height:1.05;text-align:center;max-width:70px;}
      .gf-key.cat-bigbang.owned{border-color:rgba(106,58,255,.6);}
      .gf-key.cat-stellar.owned{border-color:rgba(255,216,74,.6);}
      .gf-key.cat-sun.owned{border-color:rgba(255,138,61,.6);}
      .gf-key.cat-solar.owned{border-color:rgba(74,144,226,.6);}
      .gf-key.cat-tech.owned{border-color:rgba(0,212,255,.6);}

      .gf-overlay{position:absolute;inset:0;z-index:10;background:rgba(5,1,8,.85);
        backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;padding:20px;}
      .gf-overlay.show{display:flex;}
      .gf-overlay-card{max-width:520px;width:100%;background:linear-gradient(180deg,#1a0a30,#050108);
        border:2px solid #ffd84a;border-radius:14px;padding:24px;text-align:center;
        box-shadow:0 0 60px rgba(255,216,74,.3);}
      .gf-overlay-card h2{color:#ffd84a;font-size:24px;margin:0 0 8px;letter-spacing:.05em;}
      .gf-overlay-sub{color:#fff5e3;font-size:14px;margin-bottom:14px;}
      .gf-overlay-card p{font-size:14px;color:#cbd;margin:8px 0;}
      .gf-howto{text-align:left;margin:14px auto;max-width:380px;list-style:none;padding:0;}
      .gf-howto li{padding:6px 0;font-size:13px;border-bottom:1px dashed #2a1a45;color:#cbd;}
      .gf-perfect{color:#ffd84a;font-weight:700;}
      .gf-result{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:14px 0;font-size:14px;}
      .gf-result div{background:#11142a;padding:6px 10px;border-radius:8px;border:1px solid #2a3a55;}
      .gf-btn{background:linear-gradient(180deg,#ffd84a,#ff8a3d);color:#1a0a00;font-weight:800;
        border:none;padding:12px 28px;border-radius:10px;cursor:pointer;font-size:15px;
        margin-top:14px;letter-spacing:.06em;transition:transform .15s;}
      .gf-btn:hover{transform:scale(1.05);}

      .gf-taunt{position:absolute;left:50%;top:120px;transform:translateX(-50%);
        background:rgba(20,5,40,.92);padding:14px 20px;border-radius:12px;border:1px solid currentColor;
        color:#ff6ab8;font-size:14px;font-weight:600;text-align:center;z-index:7;
        box-shadow:0 0 28px currentColor;animation:gfTauntIn .4s;}
      .gf-taunt-tag{font-size:10px;letter-spacing:.2em;color:#ffd84a;}
      .gf-taunt.out{opacity:0;transition:opacity .5s;}
      @keyframes gfTauntIn{from{opacity:0;transform:translate(-50%,-12px);}to{opacity:1;transform:translate(-50%,0);}}

      @media(max-width:600px){
        .gf-host{height:min(560px,72vh);}
        .gf-hud-top{gap:6px;}
        .gf-hp-bar{width:80px;}
        .gf-key{min-width:56px;padding:4px;}
        .gf-k-nm{font-size:8px;}
        .gf-overlay-card{padding:16px;}
        .gf-overlay-card h2{font-size:18px;}
      }
    `;
    document.head.appendChild(s);
  }

  // ============== PUBLIC ==============
  global.GenesisForge = {
    init,
    start,
    state(){ return State; },
    PHASE_DEFS,
    /** dev: skip to phase */
    devSkipTo(n){ if (State){ _resetState(); State.startTime=performance.now(); _enterPhase(n); } }
  };

})(window);
