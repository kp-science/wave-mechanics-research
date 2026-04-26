/* ===== COSMOS LOG · Shared Book Engine ===== */

const PAGES = [
  { id: 'p01', file: 'p01-entry.html',      title: 'Entry Ticket',        type: 'puzzle',     time: 3 },
  { id: 'p02', file: 'p02-team.html',       title: 'เลือกทีม',             type: 'setup',      time: 2 },
  { id: 'p03', file: 'p03-collision.html',  title: 'การปะทะ',              type: 'story',      time: 3 },
  { id: 'p04', file: 'p04-debris.html',     title: 'วิเคราะห์ซาก',          type: 'puzzle',     time: 7 },
  { id: 'p05', file: 'p05-age.html',        title: 'แสงอายุ 13.8B',        type: 'story',      time: 2 },
  { id: 'p06', file: 'p06-research.html',   title: 'ค้น CMB',              type: 'puzzle',     time: 8 },
  { id: 'p07', file: 'p07-cmb.html',        title: 'นี่คือ CMB',            type: 'story',      time: 2 },
  { id: 'p08', file: 'p08-arrive.html',     title: 'ถึงสถานี A',            type: 'story',      time: 2 },
  { id: 'p09', file: 'p09-balloon.html',    title: 'ลูกโป่งเอกภพ',         type: 'puzzle',     time: 20 },
  { id: 'p10', file: 'p10-hubble.html',     title: 'ดร.ฮับเบิล · บิกแบง',   type: 'story',      time: 5 },
  { id: 'p11', file: 'p11-timeline.html',   title: '6 ยุคอนุภาค',           type: 'puzzle',     time: 10 },
  { id: 'p12', file: 'p12-galaxy.html',     title: 'Galaxy A หายไปไหน',    type: 'story',      time: 2 },
  { id: 'p13', file: 'p13-shiplock.html',   title: 'Ship Coordinate Lock', type: 'puzzle',     time: 8 },
  { id: 'p14', file: 'p14-void.html',       title: 'VOID โผล่',            type: 'mixed',      time: 8 },
  { id: 'p15', file: 'p15-warp.html',       title: 'วาร์ป',                type: 'story',      time: 3 },
  { id: 'p16', file: 'p16-review.html',     title: 'รีวิวหนัง · เรียงฉาก',   type: 'puzzle',  time: 7 },
  { id: 'p17', file: 'p17-exercise.html',   title: 'แบบฝึกหัด · Bloom',      type: 'puzzle',  time: 10 },
  { id: 'p18', file: 'p17-exit.html',       title: 'Exit Ticket · 3-2-1',   type: 'reflection', time: 5 },
  { id: 'p19', file: 'p16-map.html',        title: 'Journey Map',         type: 'reflection', time: 10 },
];

const TEAMS = [
  { id: 1, name: 'Nebula',    color: '#64d8ff', icon: '🌌' },
  { id: 2, name: 'Quasar',    color: '#b980ff', icon: '💫' },
  { id: 3, name: 'Pulsar',    color: '#ff5c7a', icon: '⚡' },
  { id: 4, name: 'Andromeda', color: '#7effb2', icon: '🌠' },
  { id: 5, name: 'Horizon',   color: '#ffcb6b', icon: '🔭' },
  { id: 6, name: 'Voyager',   color: '#ff8fa5', icon: '🚀' },
];

const Book = {
  state: null,

  init() {
    this.state = this.load();
    this.injectHUD();
    this.injectFooter();
    this.updateHUD();
    this.startTimeTracker();
    this.restoreFinishBtn();
    this.bindButtonFeedback();
    this._syncFooterNext();
  },

  /* Universal feedback ทุกครั้งที่กดปุ่ม .finish-btn (รวมปุ่ม phase กลาง)
   * - Flash ขอบเรืองแสงเขียวสั้น ๆ
   * - ฟองข้อความ "✓ รับคำสั่ง" เด้งขึ้นจากตำแหน่งกด
   * - Auto-lock ปุ่ม finishPage หลังกด · กัน double-click ระหว่าง scoring */
  bindButtonFeedback() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest && e.target.closest('.finish-btn');
      if (!btn) return;
      if (btn.disabled || btn.classList.contains('done')) return;
      // flash
      btn.classList.add('btn-flash');
      setTimeout(() => btn.classList.remove('btn-flash'), 420);
      // bubble
      const el = document.createElement('div');
      el.className = 'click-bubble';
      el.textContent = '✓ รับคำสั่ง';
      el.style.cssText = 'position:fixed;left:' + e.clientX + 'px;top:' + e.clientY + 'px;';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 950);
      // Auto-lock เฉพาะปุ่ม finishPage ตัวจริง · ปุ่ม phase nav (nextPhase, fireEvidence) ไม่ล็อค
      const oc = btn.getAttribute('onclick') || '';
      const isFinish = btn.id === 'finishBtn' || /finishPage|submitPost/.test(oc);
      if (isFinish) {
        // Lock synchronous · กัน double-click จริง · onclick ที่ตามมาบน event นี้ยังรัน (คนละ phase)
        // ครั้งถัดไปคลิกบน disabled = browser ไม่ dispatch event เลย
        btn.classList.add('done');
        btn.disabled = true;
        const cur = btn.textContent || '';
        if (!cur.startsWith('✓ ส่ง') && !cur.startsWith('✓ ทำ')) {
          btn.dataset.origText = cur;
          btn.textContent = '✓ ส่งแล้ว · กำลังบันทึก…';
          // รอ scoring เสร็จแล้วเปลี่ยนเป็นข้อความ final · setTimeout 80ms ให้ inline handler รัน
          setTimeout(() => { if (btn.classList.contains('done')) btn.textContent = '✓ ส่งแล้ว'; }, 80);
        }
      }
    }, true);
  },

  /* Footer "ต่อไป →" enabled เมื่อ: gate set + (ไม่มี pace lock หรือ pace ปลดถึงหน้านี้+1) */
  _syncFooterNext() {
    const btn = document.getElementById('btn-next');
    if (!btn) return;
    const pages = this.getPages();
    const idx = this.getCurrentPageIndex();
    if (idx < 0 || idx === pages.length - 1) return; // last page · stay disabled
    const curr = pages[idx];
    const gateOk = !!this.state.gates[curr.id];
    if (gateOk) {
      btn.disabled = false;
      btn.classList.add('primary');
      btn.removeAttribute('title');
    } else {
      btn.disabled = true;
      btn.classList.remove('primary');
      btn.setAttribute('title', 'กดปุ่มส่งของหน้านี้ก่อน');
    }
    // pace lock visual override (ถ้าครูคุมจังหวะอยู่)
    if (Book.pace && Book.pace.updateNextButtonLock) Book.pace.updateNextButtonLock();
  },

  /* ถ้าหน้านี้เคย complete แล้ว (ผู้เรียนเดินย้อนกลับมา) · ปุ่ม finish ควรเทา + กดซ้ำไม่ได้ */
  restoreFinishBtn() {
    const pid = this.getCurrentPageId();
    if (!pid || !this.state.gates || !this.state.gates[pid]) return;
    // รอ DOM render ของ inline script ในหน้าก่อน (เช่น p14 sets boss state async)
    setTimeout(() => {
      document.querySelectorAll('.finish-btn').forEach(btn => {
        if (btn.classList.contains('done')) return;
        btn.classList.add('done');
        btn.disabled = true;
        if (!btn.textContent.startsWith('✓')) btn.textContent = '✓ ทำไปแล้ว';
      });
    }, 150);
  },

  load() {
    try {
      const raw = localStorage.getItem('cosmosLog_state');
      if (raw) {
        const s = JSON.parse(raw);
        // Migrate old state from ep01-scene.html monolith
        if (!s.gates || typeof s.gates !== 'object') s.gates = {};
        if (!s.data || typeof s.data !== 'object') s.data = {};
        if (!s.discoveries) s.discoveries = [];
        if (!s.inventory) s.inventory = [];
        if (!s.log) s.log = [];
        if (!s.startTime || isNaN(s.startTime)) s.startTime = Date.now();
        if (typeof s.energy !== 'number' || isNaN(s.energy)) s.energy = 0;
        if (typeof s.coins !== 'number' || isNaN(s.coins)) s.coins = 0;
        // EP02 game-layer fields (ignored by EP01)
        if (typeof s.streak !== 'number') s.streak = 0;
        if (typeof s.corruption !== 'number') s.corruption = 0;
        if (!s.bet) s.bet = null;
        if (!s.betHistory) s.betHistory = [];
        if (!s.decisions) s.decisions = [];
        if (!s.retries) s.retries = {};
        if (!s.itemsUsed) s.itemsUsed = [];
        if (!s.objectives) s.objectives = {};
        if (!s.boss) s.boss = null;
        if (!s.ep) s.ep = 'ep01';
        // Migrate old monolith gates → new page gates
        if (s.teamId && !s.gates.p01 && s.entryTicket) s.gates.p01 = true;
        if (s.teamId && !s.gates.p02) s.gates.p02 = true;
        return s;
      }
    } catch(e) { console.warn('State load failed', e); }
    return this.defaultState();
  },

  defaultState() {
    return {
      teamId: null, teamName: '', role: '',
      energy: 0,
      coins: 0,
      gates: {},       // page gates: { p01: true, p04: true ... }
      data: {},        // per-page data
      discoveries: [],
      inventory: [],
      log: [],
      startTime: Date.now(),
      currentPage: null,
      // EP02 game layer
      ep: 'ep01',
      streak: 0,
      corruption: 0,
      bet: null,
      betHistory: [],
      decisions: [],
      retries: {},
      itemsUsed: [],
      objectives: {},
      boss: null,
    };
  },

  save() { localStorage.setItem('cosmosLog_state', JSON.stringify(this.state)); },

  reset() {
    if (!confirm('ล้างข้อมูลทั้งหมด เริ่มใหม่?')) return;
    localStorage.removeItem('cosmosLog_state');
    const first = this.getPages()[0];
    location.href = first ? first.file : 'p01-entry.html';
  },

  /* Navigation · ใช้ EP_CONFIG.pages ถ้ามี · มิฉะนั้น fallback PAGES (EP01) */
  getPages() { return (window.EP_CONFIG && EP_CONFIG.pages) || PAGES; },

  getCurrentPageId() { return document.body.dataset.page; },

  getCurrentPageIndex() {
    const id = this.getCurrentPageId();
    return this.getPages().findIndex(p => p.id === id);
  },

  next() {
    const pages = this.getPages();
    const idx = this.getCurrentPageIndex();
    // Belt-and-suspenders · อ่าน localStorage ก่อน check lock · กันกรณี BroadcastChannel/poll พลาด
    if (Book.pace && Book.pace.enabled && Book.pace.mode === 'local' && Book.pace.roomCode) {
      try {
        const raw = localStorage.getItem('paceLocal_' + Book.pace.roomCode);
        if (raw) {
          const p = JSON.parse(raw);
          if (p && p.unlockedUpTo) Book.pace.unlockedUpTo = p.unlockedUpTo;
        }
      } catch (e) {}
    }
    // Pace lock · ถ้าเปิดโหมดครูคุมจังหวะ และหน้าถัดไปยังไม่ถูกปลดล็อค → ห้ามไป
    if (Book.pace && Book.pace.enabled && Book.pace.unlockedUpTo) {
      const unlockedIdx = pages.findIndex(p => p.id === Book.pace.unlockedUpTo);
      console.info('[Book.next] pace check · idx=' + idx + ' unlockedUpTo=' + Book.pace.unlockedUpTo + ' unlockedIdx=' + unlockedIdx);
      if (unlockedIdx >= 0 && idx + 1 > unlockedIdx) {
        Book.pace.flashLocked();
        return;
      }
    }
    const curr = pages[idx];
    if (!this.state.gates[curr.id]) {
      // หาปุ่ม finish ตัวจริง · ไม่ใช่ปุ่มอื่นที่บังเอิญใช้ class .finish-btn (เช่น reset · phase nav · attack)
      const realFinish = document.getElementById('finishBtn')
        || document.querySelector('.finish-btn[onclick*="finishPage"]')
        || document.querySelector('.finish-btn[onclick*="submitPost"]');
      // ถ้าปุ่ม finish ตัวจริงยัง enabled · กดให้อัตโนมัติ (user อาจลืม)
      if (realFinish && !realFinish.classList.contains('done') && !realFinish.disabled) {
        try { realFinish.click(); } catch(e){ console.warn('[Book.next] finish click threw', e); }
        if (this.state.gates[curr.id]) {
          if (idx < pages.length - 1) location.href = pages[idx + 1].file;
          return;
        }
      }
      // recover path · scoring throw ก่อน completePage · gate ค้างไว้เอง
      // เงื่อนไข: ปุ่ม .done (กดสำเร็จส่วนหน้าแล้ว) เท่านั้น · ห้าม recover จาก .disabled อย่างเดียว
      // (เพราะ p02/p04/p05/p06/p12 ใส่ disabled ตั้งแต่ HTML รอกิจกรรมครบ)
      if (realFinish && realFinish.classList.contains('done')) {
        console.warn('[Book.next] auto-recover gate · ' + curr.id + ' · finish button done but gate missing');
        this.state.gates[curr.id] = true;
        this.save();
        if (idx < pages.length - 1) { location.href = pages[idx + 1].file; return; }
      }
      // หาเหตุผลให้ชัด · ปุ่ม disabled อยู่ · หรือบั๊ก?
      const anyBtn = realFinish || document.querySelector('.finish-btn');
      const diag = {
        pageId: curr.id,
        gate: !!this.state.gates[curr.id],
        hasBtn: !!anyBtn,
        disabled: anyBtn ? anyBtn.disabled : null,
        done: anyBtn ? anyBtn.classList.contains('done') : null,
        text: anyBtn ? anyBtn.textContent.trim().slice(0, 30) : null
      };
      console.warn('[Book.next] blocked', diag);
      let msg;
      if (!anyBtn) {
        msg = '⚠️ ไม่พบปุ่มส่งในหน้านี้ · กรุณาแจ้งครู';
      } else if (anyBtn.classList.contains('done')) {
        // bug path · ปุ่มกดแล้วแต่ gate ไม่ set
        msg = '⚠️ ระบบขัดข้อง · ข้อมูลหน้านี้ยังไม่ถูกบันทึก\n' +
              'ลอง refresh หน้าเว็บแล้วทำใหม่ · ถ้ายังไม่ได้ · กด F12 เปิด Console แล้วแจ้งครู';
      } else if (anyBtn.disabled) {
        const label = (anyBtn.textContent || '').trim() || 'ปุ่มส่ง';
        msg = '🔒 ปุ่ม "' + label + '" ยังปิดอยู่\n' +
              'แปลว่ากิจกรรมในหน้านี้ยังทำไม่ครบ · ลองดูว่าเหลืออะไร (เช่น วางป้ายยังไม่ครบทุกช่อง · ยังไม่เลือกคำตอบ · ยังไม่กรอกชื่อ)';
      } else {
        msg = '🔒 ยังทำหน้านี้ไม่ครบ · กรุณาจบภารกิจของหน้านี้ก่อน';
      }
      alert(msg);
      return;
    }
    if (idx < pages.length - 1) location.href = pages[idx + 1].file;
  },

  prev() {
    const pages = this.getPages();
    const idx = this.getCurrentPageIndex();
    if (idx > 0) location.href = pages[idx - 1].file;
  },

  /* Gate · mark a page as completed
   * opts: { score, max, msg, holdMs } — optional
   *   - score/max → auto-pick encouraging msg ตามเปอร์เซ็นต์
   *   - msg       → override ข้อความ (ถ้าส่ง score/max มาด้วย · msg ต่อท้าย)
   *   - holdMs    → override auto-next delay (default 1400 · มี opts = 2800)
   */
  completePage(pageId, opts) {
    if (typeof pageId === 'object' && pageId !== null) { opts = pageId; pageId = null; }
    pageId = pageId || this.getCurrentPageId();
    const already = !!this.state.gates[pageId];
    this.state.gates[pageId] = true;
    this.save();
    this.updateHUD();
    const footerNext = document.getElementById('btn-next');
    if (footerNext) {
      footerNext.disabled = false;
      footerNext.classList.add('primary');
      footerNext.removeAttribute('title');
      if (!footerNext.classList.contains('pace-locked')) footerNext.textContent = 'ต่อไป →';
    }
    // visual feedback: burst ✓ ใกล้ปุ่ม finish + toast ข้อความกระตุ้น
    if (!already) this._showFinishBurst();
    // auto-energy: ทุก completePage แรก ให้ +energy เป็น base reward (story pages ที่ไม่เรียก award เอง)
    // pages ที่จัดการ energy เอง (Game.award/penalty) pass opts.noAutoEnergy:true หรือมี opts.score
    if (!already && !opts?.noAutoEnergy && typeof opts?.score !== 'number') {
      this.addEnergy(+5, 'page-complete:' + pageId);
    }
    this._showCelebrate(opts);
    // sync pace lock ถ้าเพิ่งเปิด gate · เผื่อปุ่ม "ต่อไป →" ยังถูก pace-lock อยู่
    if (Book.pace && Book.pace.updateNextButtonLock) Book.pace.updateNextButtonLock();
    // ⚠️ ไม่ auto-advance · ให้ user กด "ต่อไป →" เอง (ตามที่ user ขอ · กันเด้งเองโดยไม่ตั้งใจ)
  },

  /* ✓ burst animation ใกล้ปุ่ม finish */
  _showFinishBurst() {
    const fb = document.getElementById('finishBtn') || document.querySelector('.finish-btn.done, .finish-btn');
    if (!fb) return;
    const r = fb.getBoundingClientRect();
    const burst = document.createElement('div');
    burst.className = 'finish-check-burst';
    burst.textContent = '✓';
    burst.style.cssText = [
      'position:fixed',
      'left:' + (r.left + r.width / 2) + 'px',
      'top:'  + (r.top  + r.height / 2) + 'px',
      'transform:translate(-50%,-50%)',
      'font-size:72px', 'font-weight:900',
      'color:#7effb2', 'text-shadow:0 0 24px rgba(126,255,178,0.9)',
      'pointer-events:none', 'z-index:9998',
      'animation:finish-check-pop 0.9s ease-out forwards'
    ].join(';');
    document.body.appendChild(burst);
    if (!document.getElementById('finish-check-style')) {
      const s = document.createElement('style');
      s.id = 'finish-check-style';
      s.textContent = '@keyframes finish-check-pop{' +
        '0%{opacity:0;transform:translate(-50%,-50%) scale(0.3)}' +
        '30%{opacity:1;transform:translate(-50%,-50%) scale(1.4)}' +
        '60%{transform:translate(-50%,-50%) scale(1)}' +
        '100%{opacity:0;transform:translate(-50%,-80%) scale(1)}' +
        '}';
      document.head.appendChild(s);
    }
    setTimeout(() => burst.remove(), 950);
  },

  /* Encouraging toast · คืน holdMs เพื่อ sync กับ auto-next */
  _showCelebrate(opts) {
    opts = opts || {};
    const { score, max, msg } = opts;
    let tier = 'neutral', text = msg || '', icon = '✨';
    if (typeof score === 'number' && typeof max === 'number' && max > 0) {
      const r = score / max;
      if (r >= 0.95)       { tier = 'perfect';  icon = '🌟'; text = text || 'สุดยอด! เต็มทุกข้อเลย · บันทึกแล้ว'; }
      else if (r >= 0.75)  { tier = 'great';    icon = '🎉'; text = text || 'เก่งมาก · ใกล้เต็มแล้ว'; }
      else if (r >= 0.5)   { tier = 'good';     icon = '💪'; text = text || 'ดีมาก · มาต่อกัน'; }
      else if (r >= 0.25)  { tier = 'ok';       icon = '👍'; text = text || 'ผ่านแล้ว · ครั้งหน้าสู้อีก'; }
      else                 { tier = 'low';      icon = '🌱'; text = text || 'ไม่เป็นไร · เก็บบทเรียนไว้สู้ต่อ'; }
    } else if (!text) {
      text = '✓ บันทึกคำตอบแล้ว · ไปต่อกันเลย';
    }
    const color = { perfect:'#ffd27a', great:'#7effb2', good:'#64d8ff', ok:'#b980ff', low:'#ff8fa5', neutral:'#7effb2' }[tier];
    let el = document.getElementById('celebrate-toast');
    if (el) el.remove();
    el = document.createElement('div');
    el.id = 'celebrate-toast';
    el.style.cssText = [
      'position:fixed', 'top:80px', 'left:50%', 'transform:translateX(-50%)',
      'z-index:9997', 'padding:14px 24px',
      'background:rgba(10,10,24,0.95)', 'color:' + color,
      'border:2px solid ' + color, 'border-radius:12px',
      'font-weight:700', 'font-size:15px', 'text-align:center',
      'box-shadow:0 4px 18px rgba(0,0,0,0.5), 0 0 24px ' + color + '55',
      'animation:celebrate-in 0.4s cubic-bezier(.2,1.4,.4,1)'
    ].join(';');
    const scoreLine = (typeof score === 'number' && typeof max === 'number')
      ? '<div style="font-size:11px;opacity:0.7;margin-top:4px;font-family:Orbitron,monospace">คะแนน ' + score + '/' + max + '</div>' : '';
    el.innerHTML = '<div>' + icon + ' ' + text + '</div>' + scoreLine;
    document.body.appendChild(el);
    if (!document.getElementById('celebrate-style')) {
      const s = document.createElement('style');
      s.id = 'celebrate-style';
      s.textContent = '@keyframes celebrate-in{from{opacity:0;transform:translate(-50%,-20px)}to{opacity:1;transform:translate(-50%,0)}}';
      document.head.appendChild(s);
    }
    const hold = 2600;
    setTimeout(() => { el.style.transition='opacity 0.3s'; el.style.opacity='0'; }, hold - 300);
    setTimeout(() => el.remove(), hold);
    return hold + 200;
  },

  /* Energy */
  addEnergy(amount, reason) {
    this.state.energy += amount;
    this.state.log.push({ type: 'energy', amount, reason, at: Date.now() });
    this.save();
    this.updateHUD();
    this.burstEnergy(amount);
  },

  burstEnergy(amount) {
    const burst = document.createElement('div');
    burst.className = 'energy-burst';
    burst.textContent = (amount > 0 ? '+' : '') + amount;
    burst.style.color = amount > 0 ? 'var(--accent-gold)' : 'var(--accent-red)';
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 1400);
  },

  /* 🪙 Coin system · เก็บเป็นคะแนนสะสม · ใช้แลก energy ได้ */
  addCoin(amount, reason) {
    this.state.coins = (this.state.coins || 0) + amount;
    this.state.log.push({ type: 'coin', amount, reason, at: Date.now() });
    this.save();
    this.updateHUD();
    this.burstCoin(amount);
  },

  burstCoin(amount) {
    const b = document.createElement('div');
    b.className = 'energy-burst';
    b.textContent = (amount > 0 ? '+' : '') + amount + ' 🪙';
    b.style.color = '#ffcb6b';
    b.style.fontSize = '60px';
    b.style.top = '40%';
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 1400);
  },

  spendCoin(amount, reason) {
    if ((this.state.coins || 0) < amount) return false;
    this.state.coins -= amount;
    this.state.log.push({ type: 'coin', amount: -amount, reason, at: Date.now() });
    this.save();
    this.updateHUD();
    return true;
  },

  /* 🔊 Sound effects · กด Book.playSound('beam') · audio assets ที่ ep02/galaxy/ */
  SOUNDS: {
    beam:       '../ep02/galaxy/nickpanekaiassets-ascending-beaming-sound-effect-ai-made-sfx-473874.mp3',
    victory:    '../ep02/galaxy/scratchonix-victory-chime-366449.mp3',
    hyperdrive: '../ep02/galaxy/soundreality-hyper-drive-140909.mp3',
    typewriter: '../ep02/galaxy/freesound_community-typewriter-typing-68696.mp3',
  },
  _audioPool: {},
  playSound(name, opts) {
    opts = opts || {};
    if (this.state && this.state.soundOff) return;
    const src = this.SOUNDS[name];
    if (!src) return;
    try {
      let a = this._audioPool[name];
      if (!a) { a = new Audio(src); a.volume = opts.volume != null ? opts.volume : 0.5; this._audioPool[name] = a; }
      a.currentTime = 0;
      if (opts.loop) a.loop = true;
      a.play().catch(()=>{}); // ignore autoplay block
    } catch(e) {}
  },
  stopSound(name) {
    const a = this._audioPool[name];
    if (a) { try { a.pause(); a.currentTime = 0; } catch(e) {} }
  },

  /* 🎁 LOOT BOX · weighted random · ใช้ได้ทุกหน้า · auto apply + show modal */
  LOOT_TABLE: [
    { w:18, label:'รางวัลเล็ก · +5 ⚡', kind:'gain', icon:'⚡', apply: function() { Book.addEnergy(5, 'lootbox'); } },
    { w:18, label:'รางวัล · +30 ⚡',     kind:'gain', icon:'⚡⚡', apply: function() { Book.addEnergy(30, 'lootbox'); } },
    { w:14, label:'🛡️ Shield 1 ชิ้น',    kind:'gain', icon:'🛡️', apply: function() { Book.state.boughtShields = (Book.state.boughtShields||0)+1; Book.save(); } },
    { w:12, label:'⏱️ Warp Fuel boost',  kind:'gain', icon:'⏱️', apply: function() { (Book.state.boughtBoosts ||= []).push('fuel'); Book.save(); } },
    { w:10, label:'🔍 Hubble Lens boost', kind:'gain', icon:'🔍', apply: function() { (Book.state.boughtBoosts ||= []).push('lens'); Book.save(); } },
    { w:8,  label:'📡 Decoder boost',     kind:'gain', icon:'📡', apply: function() { (Book.state.boughtBoosts ||= []).push('decoder'); Book.save(); } },
    { w:5,  label:'🎰 JACKPOT! +100 ⚡ + Decoder', kind:'jackpot', icon:'🎰', apply: function() { Book.addEnergy(100, 'lootbox-jackpot'); (Book.state.boughtBoosts ||= []).push('decoder'); Book.save(); } },
    { w:8,  label:'😢 ขาดทุน · ไม่ได้อะไรเลย', kind:'lose', icon:'😢', apply: function() {} },
    { w:5,  label:'💢 หายนะ · -10 ⚡',     kind:'lose', icon:'💢', apply: function() { Book.addEnergy(-10, 'lootbox-bad'); } },
    { w:2,  label:'🦠 VOID แทรก · corruption +5%', kind:'lose', icon:'🦠', apply: function() { try { Corruption.add(5); } catch(e){} } },
  ],

  openLootBox(opts) {
    opts = opts || {};
    const total = this.LOOT_TABLE.reduce((s,x) => s+x.w, 0);
    let r = Math.random() * total;
    let pick = this.LOOT_TABLE[0];
    for (const o of this.LOOT_TABLE) { if ((r -= o.w) <= 0) { pick = o; break; } }
    pick.apply();
    // 🔊 sound · victory ถ้า gain/jackpot · ไม่เล่นถ้า lose
    if (pick.kind === 'gain' || pick.kind === 'jackpot') this.playSound('victory', { volume: 0.6 });
    // dramatic modal
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:10001;display:flex;align-items:center;justify-content:center;animation: lbFade .3s';
    const colors = { gain:'var(--accent-green)', lose:'var(--accent-red)', jackpot:'var(--accent-gold)' };
    const c = colors[pick.kind] || 'var(--accent)';
    wrap.innerHTML = `
      <div style="max-width:420px;padding:30px;background:var(--bg-card);border:3px solid ${c};border-radius:16px;text-align:center;box-shadow:0 0 60px ${c}">
        <div style="font-family:Orbitron,sans-serif;letter-spacing:0.2em;color:${c};font-size:13px;margin-bottom:8px">🎁 LOOT BOX${opts.title ? ' · '+opts.title : ''}</div>
        <div style="font-size:80px;margin:14px 0;animation: lbBounce .6s">${pick.icon}</div>
        <div style="font-family:Orbitron,sans-serif;font-size:18px;color:${c};margin:10px 0">${pick.label}</div>
        ${pick.kind === 'jackpot' ? '<div style="font-size:14px;color:var(--accent-gold);margin-top:8px">🎉 ทีมโชคดีมาก!</div>' : ''}
        <button id="lbCloseBtn" style="margin-top:18px;padding:10px 24px;background:${c};color:#0a0a18;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit">รับรางวัล</button>
      </div>`;
    if (!document.getElementById('lb-anim-style')) {
      const s = document.createElement('style');
      s.id = 'lb-anim-style';
      s.textContent = '@keyframes lbFade{from{opacity:0}to{opacity:1}} @keyframes lbBounce{0%{transform:scale(0.3) rotate(-30deg)} 60%{transform:scale(1.3) rotate(10deg)} 100%{transform:scale(1)}}';
      document.head.appendChild(s);
    }
    document.body.appendChild(wrap);
    document.getElementById('lbCloseBtn').addEventListener('click', () => {
      wrap.remove();
      if (opts.onDone) opts.onDone(pick);
    });
    return pick;
  },

  /* Shop · spend 5 coin → +10 energy */
  openShop() {
    const cur = this.state.coins || 0;
    const can = cur >= 5;
    const wrap = document.createElement('div');
    wrap.id = 'coin-shop-modal';
    wrap.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.78);z-index:10000;display:flex;align-items:center;justify-content:center';
    wrap.innerHTML = `
      <div style="max-width:380px;padding:24px;background:var(--bg-card);border:2px solid var(--accent-gold);border-radius:14px;text-align:center">
        <h3 style="font-family:Orbitron,sans-serif;color:var(--accent-gold);margin:0 0 12px;letter-spacing:0.15em">🪙 COIN SHOP</h3>
        <div style="font-size:28px;color:var(--accent-gold);margin:8px 0">มี ${cur} 🪙</div>
        <div style="padding:14px;background:rgba(255,203,107,0.06);border:1px dashed var(--accent-gold);border-radius:10px;margin:12px 0">
          <div style="font-size:14px;margin-bottom:6px">⚡ ซื้อ Energy</div>
          <div style="font-size:12px;color:var(--text-dim);margin-bottom:10px">5 🪙 → +10 ⚡</div>
          <button id="shopBuyEnergy" ${can?'':'disabled'} style="padding:10px 20px;background:var(--accent-gold);color:#1a0f00;border:none;border-radius:8px;font-weight:700;cursor:${can?'pointer':'not-allowed'};opacity:${can?'1':'0.4'};font-family:inherit">ซื้อ +10 ⚡ (5 🪙)</button>
        </div>
        <div style="display:flex;gap:8px;justify-content:center;margin-top:12px">
          <button onclick="document.getElementById('coin-shop-modal').remove()" style="padding:8px 18px;background:transparent;color:var(--text);border:1px solid var(--border);border-radius:6px;cursor:pointer;font-family:inherit">ปิด</button>
        </div>
      </div>`;
    document.body.appendChild(wrap);
    const buyBtn = document.getElementById('shopBuyEnergy');
    if (buyBtn) buyBtn.addEventListener('click', () => {
      if (Book.spendCoin(5, 'shop-buy-energy')) {
        Book.addEnergy(+10, 'shop-buy-energy');
        wrap.remove();
        Book.openShop(); // refresh
      }
    });
  },

  addDiscovery(item) {
    if (!this.state.discoveries.includes(item)) this.state.discoveries.push(item);
    this.save();
  },

  addInventory(item) {
    this.state.inventory.push(item);
    this.save();
  },

  savePageData(pageId, data) {
    pageId = pageId || this.getCurrentPageId();
    this.state.data[pageId] = data;
    this.save();
  },

  getPageData(pageId) { return this.state.data[pageId] || null; },

  /* HUD */
  injectHUD() {
    const hud = document.createElement('div');
    hud.className = 'hud';
    const epLabel = (this.state.ep || 'ep01').toUpperCase();
    hud.innerHTML = `
      <div class="logo">★ COSMOS LOG · ${epLabel}</div>
      <div class="pill team" id="hud-team">ยังไม่ได้เลือกทีม</div>
      <div class="pill energy" id="hud-energy">⚡ 0</div>
      <div class="pill coins" id="hud-coins" style="cursor:pointer;border-color:rgba(255,203,107,0.5)" title="🪙 เหรียญ · กดเพื่อแลกเป็น energy (5 🪙 = +10 ⚡)" onclick="Book.openShop()">🪙 0</div>
      <div class="pill streak" id="hud-streak" style="display:none">🔥 ×1</div>
      <div class="pill corruption" id="hud-corruption" style="display:none">🦠 0%</div>
      <div class="pill inventory" id="hud-inventory" style="display:none">🎒</div>
      <div class="pill page" id="hud-page">P--</div>
      <div class="pill time" id="hud-time">⏱ 0:00</div>
      <div class="spacer"></div>
      <button id="hud-leaderboard-btn" style="display:none" onclick="Leaderboard && Leaderboard.toggle()">📊 TEAMS</button>
      <button id="hud-teacher-btn" style="display:none" onclick="Teacher && Teacher.toggle()">🎴 TEACHER</button>
      <button onclick="Book.reset()">⚠ RESET</button>
    `;
    document.body.insertBefore(hud, document.body.firstChild);
  },

  injectFooter() {
    const pages = this.getPages();
    const idx = this.getCurrentPageIndex();
    if (idx < 0) return;
    const curr = pages[idx];
    const footer = document.createElement('div');
    footer.className = 'page-nav';
    footer.innerHTML = `
      <div class="info"><b>${String(idx+1).padStart(2,'0')}/${pages.length}</b> · ${curr.title}</div>
      <div class="spacer"></div>
      <button id="btn-prev" onclick="Book.prev()" ${idx === 0 ? 'disabled' : ''}>← ย้อน</button>
      <button id="btn-next" onclick="Book.next()" ${idx === pages.length - 1 || !this.state.gates[curr.id] ? 'disabled' : ''} ${!this.state.gates[curr.id] && idx !== pages.length - 1 ? 'title="กดปุ่มส่งของหน้านี้ก่อน"' : ''}>ต่อไป →</button>
    `;
    document.body.appendChild(footer);
  },

  updateHUD() {
    const hudTeam = document.getElementById('hud-team');
    if (hudTeam) {
      if (this.state.teamId) {
        const t = TEAMS.find(x => x.id === this.state.teamId) || { name: this.state.teamName || this.state.teamId, color: 'var(--accent)' };
        hudTeam.textContent = `🚀 ${this.state.teamName || t.name}`;
        hudTeam.style.setProperty('--team-color', t.color);
        hudTeam.style.color = t.color;
        hudTeam.style.borderColor = t.color;
      } else {
        hudTeam.textContent = 'ยังไม่ได้เลือกทีม';
      }
    }
    const e = document.getElementById('hud-energy');
    if (e) e.textContent = `⚡ ${this.state.energy}`;
    const c = document.getElementById('hud-coins');
    if (c) c.textContent = `🪙 ${this.state.coins || 0}`;
    const p = document.getElementById('hud-page');
    if (p) {
      const pages = this.getPages();
      const idx = this.getCurrentPageIndex();
      p.textContent = idx >= 0 ? `P${String(idx + 1).padStart(2, '0')}/${pages.length.toString().padStart(2,'0')}` : 'P--';
    }
  },

  startTimeTracker() {
    if (!this.state.startTime || isNaN(this.state.startTime)) {
      this.state.startTime = Date.now();
      this.save();
    }
    setInterval(() => {
      const el = document.getElementById('hud-time');
      if (!el) return;
      const elapsed = Math.max(0, Math.floor((Date.now() - this.state.startTime) / 1000));
      const m = Math.floor(elapsed / 60);
      const s = elapsed % 60;
      el.textContent = `⏱ ${m}:${String(s).padStart(2, '0')}`;
      if (m >= 100) el.style.color = 'var(--accent-red)';
      else if (m >= 80) el.style.color = 'var(--accent-gold)';
    }, 1000);
  },
};

/* ─────────────────────────────────────────────────────────────
 * Teacher Pace · opt-in broadcast receiver
 * Enabled when URL has ?room=XXX หรือ localStorage.paceRoom ถูกตั้ง
 * ต้องมี PaceClient (lessons/shared/pace-client.js) + PACE_API_URL
 * ───────────────────────────────────────────────────────────── */
Book.pace = {
  enabled: false,
  roomCode: null,
  mode: 'remote',
  unlockedUpTo: null,  // pageId · หน้าสูงสุดที่ครูปลดล็อคแล้ว (ถ้า null = ยังไม่เคยรับ state)
  // ⚠️ astronomy's Apps Script deployment (content/astronomy/config.js → apiUrl)
  API_URL: 'https://script.google.com/macros/s/AKfycbzt4qyJPIh7zudsQVEMIkLdRk2M1lricq9fx73orp7dZA1B3_MdwgkwZrz6YWFuuRZq/exec',

  init() {
    const params = new URLSearchParams(location.search);
    if (params.get('pace') === 'off') { localStorage.removeItem('paceRoom'); localStorage.removeItem('paceMode'); return; }
    const room = params.get('room') || localStorage.getItem('paceRoom');
    if (!room) return;
    if (params.get('room')) localStorage.setItem('paceRoom', room);
    this.enabled = true;
    this.roomCode = room;
    const urlLocal = (params.get('local') === '1' || params.get('mode') === 'local');
    this.mode = urlLocal ? 'local' : (localStorage.getItem('paceMode') || 'remote');
    if (urlLocal) localStorage.setItem('paceMode', 'local');
    this._loadClient(() => {
      window.PaceClient.watch({
        mode: Book.pace.mode,
        apiUrl: Book.pace.API_URL,
        roomCode: room,
        intervalMs: Book.pace.mode === 'local' ? 2000 : 8000,
        onChange: (pace) => Book.pace.onRemote(pace)
      });
      if (Book.pace.mode === 'local') console.info('[pace] local mode · room=' + room);
    });
    // refresh pace ตอนกลับมาโฟกัส tab (BroadcastChannel อาจพลาดตอน tab hidden)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && Book.pace.enabled) Book.pace.refreshFromStorage();
    });
    // ถ้ายังไม่มี pace state · ปุ่ม ต่อไป ไม่ถูกล็อค (ปกติ)
    setTimeout(() => { Book.pace.refreshFromStorage(); Book.pace.updateNextButtonLock(); }, 300);
  },

  /* อ่าน pace state ล่าสุดจาก localStorage (local mode) · sync ทันที */
  refreshFromStorage() {
    if (this.mode !== 'local' || !this.roomCode) return;
    try {
      const raw = localStorage.getItem('paceLocal_' + this.roomCode);
      if (!raw) return;
      const p = JSON.parse(raw);
      if (p && p.unlockedUpTo) {
        const changed = this.unlockedUpTo !== p.unlockedUpTo;
        this.unlockedUpTo = p.unlockedUpTo;
        if (changed) this.updateNextButtonLock();
      }
    } catch (e) {}
  },

  _loadClient(cb) {
    if (window.PaceClient) { cb(); return; }
    const s = document.createElement('script');
    s.src = '../../shared/pace-client.js?v=1';
    s.onload = cb;
    s.onerror = () => console.warn('PaceClient load failed');
    document.head.appendChild(s);
  },

  onRemote(pace) {
    if (!pace) return;
    // เก็บ unlockedUpTo ล่าสุด (ใช้ใน Book.next() lock check)
    this.unlockedUpTo = pace.unlockedUpTo || pace.page || null;
    this.updateNextButtonLock();
    const target = pace.page;
    if (!target) return;
    if (target === Book.getCurrentPageId()) { this.dismissBanner(); return; }
    const pages = Book.getPages();
    const t = pages.find(p => p.id === target);
    if (!t) return;
    this.showBanner(t);
  },

  /* Sync visual lock state ของปุ่ม footer "ต่อไป →" กับ unlockedUpTo */
  updateNextButtonLock() {
    this._updatePaceIndicator();
    const btn = document.getElementById('btn-next');
    if (!btn) return;
    if (!this.enabled || !this.unlockedUpTo) {
      btn.classList.remove('pace-locked');
      btn.removeAttribute('data-pace-title');
      return;
    }
    const pages = Book.getPages();
    const idx = Book.getCurrentPageIndex();
    if (idx < 0) return;
    const unlockedIdx = pages.findIndex(p => p.id === this.unlockedUpTo);
    if (unlockedIdx < 0) return;
    const uPage = pages[unlockedIdx];
    if (idx + 1 > unlockedIdx) {
      btn.classList.add('pace-locked');
      btn.disabled = true;
      btn.textContent = '🔒 รอครูปลดล็อค';
      btn.setAttribute('title', 'ครูเปิดถึง: ' + uPage.id.toUpperCase() + ' · ' + uPage.title);
    } else {
      btn.classList.remove('pace-locked');
      btn.textContent = 'ต่อไป →';
      btn.removeAttribute('title');
      // ปลด disabled ก็ต่อเมื่อ gate ของหน้านี้ติด (มิฉะนั้นรอ user กด finish ก่อน)
      const curr = pages[idx];
      if (Book.state.gates[curr.id]) btn.disabled = false;
    }
  },

  /* ตัวบ่งชี้สถานะ pace mode บน HUD · ให้เห็นตลอดเวลาว่าครูเปิดถึงไหน */
  _updatePaceIndicator() {
    let ind = document.getElementById('hud-pace');
    if (!this.enabled) { if (ind) ind.remove(); return; }
    if (!ind) {
      const hud = document.querySelector('.hud');
      if (!hud) return;
      ind = document.createElement('div');
      ind.id = 'hud-pace';
      ind.className = 'pill';
      ind.style.cssText = 'cursor:pointer;border-color:rgba(100,216,255,0.4)';
      ind.title = 'คลิก: แสดงรายละเอียด pace · คลิกขวา: ปิด pace mode';
      ind.addEventListener('click', () => Book.pace.debug());
      ind.addEventListener('contextmenu', (e) => { e.preventDefault(); if (confirm('ปิดโหมดครูคุมจังหวะ? (จะ reload)')) { localStorage.removeItem('paceRoom'); localStorage.removeItem('paceMode'); location.search = ''; } });
      const spacer = hud.querySelector('.spacer');
      if (spacer) hud.insertBefore(ind, spacer); else hud.appendChild(ind);
    }
    // refresh ตลอด · อ่าน localStorage สด
    this.refreshFromStorage();
    const modeIcon = this.mode === 'local' ? '[L]' : '[R]';
    if (!this.unlockedUpTo) {
      ind.textContent = modeIcon + ' ⏳ room=' + this.roomCode;
      ind.style.color = 'var(--text-dim)';
      return;
    }
    const pages = Book.getPages();
    const uIdx = pages.findIndex(p => p.id === this.unlockedUpTo);
    const idx = Book.getCurrentPageIndex();
    const all = uIdx >= pages.length - 1;
    if (all) {
      ind.textContent = modeIcon + ' ✓ ปลดทั้งหมด';
      ind.style.color = 'var(--accent-green)';
    } else if (idx + 1 > uIdx) {
      ind.textContent = modeIcon + ' 🔒 ปลดถึง ' + this.unlockedUpTo.toUpperCase();
      ind.style.color = 'var(--accent-red)';
    } else {
      ind.textContent = modeIcon + ' 🔓 ปลดถึง ' + this.unlockedUpTo.toUpperCase();
      ind.style.color = 'var(--accent)';
    }
  },

  /* Debug · แสดงสถานะ pace แบบเห็นหมด */
  debug() {
    let raw = null;
    try { raw = localStorage.getItem('paceLocal_' + this.roomCode); } catch (e) {}
    const parsed = raw ? JSON.parse(raw) : null;
    const ts = parsed && parsed.at ? new Date(parsed.at).toLocaleTimeString('th-TH') : 'ไม่มี';
    const currentIdx = Book.getCurrentPageIndex();
    const msg = [
      '=== Pace Debug ===',
      'Mode: ' + this.mode + '  (L=local · R=remote)',
      'Room: ' + this.roomCode,
      'Enabled: ' + this.enabled,
      '— สถานะใน Book.pace —',
      'unlockedUpTo: ' + (this.unlockedUpTo || '(null)'),
      'หน้าปัจจุบัน: idx=' + currentIdx + ' (' + Book.getCurrentPageId() + ')',
      '— localStorage[paceLocal_' + this.roomCode + '] —',
      'มีข้อมูล: ' + (raw ? 'YES' : 'NO · ครูยังไม่ได้ push หรือ room code ไม่ตรง'),
      parsed ? 'page: ' + parsed.page : '',
      parsed ? 'unlockedUpTo: ' + parsed.unlockedUpTo : '',
      parsed ? 'อัปเดตล่าสุด: ' + ts : '',
      '',
      '(คลิกขวาที่ pill = ปิด pace mode)'
    ].filter(Boolean).join('\n');
    alert(msg);
    console.info('[pace debug]', { mode: this.mode, room: this.roomCode, enabled: this.enabled, unlockedUpTo: this.unlockedUpTo, localStorageRaw: raw });
  },

  /* แสดง toast ชั่วคราวเมื่อนักเรียนพยายามไปต่อแต่ถูกล็อค */
  flashLocked() {
    let el = document.getElementById('pace-locked-toast');
    if (el) el.remove();
    const pages = Book.getPages();
    const uPage = pages.find(p => p.id === this.unlockedUpTo);
    const uLabel = uPage ? (uPage.id.toUpperCase() + ' · ' + uPage.title) : (this.unlockedUpTo || '—');
    el = document.createElement('div');
    el.id = 'pace-locked-toast';
    el.style.cssText = [
      'position:fixed', 'top:50%', 'left:50%', 'transform:translate(-50%,-50%)',
      'z-index:10000', 'padding:20px 28px', 'max-width:420px',
      'background:rgba(10,10,24,0.96)', 'color:#ff5c7a',
      'border:2px solid #ff5c7a', 'border-radius:14px',
      'text-align:center', 'line-height:1.5',
      'box-shadow:0 4px 24px rgba(255,92,122,0.4)',
      'animation:pace-shake 0.4s'
    ].join(';');
    el.innerHTML =
      '<div style="font-weight:700;font-size:16px">🔒 รอครูปลดล็อคหน้าถัดไปก่อน</div>' +
      '<div style="font-size:13px;color:#fff;margin-top:8px;opacity:0.85">ครูเปิดถึง: <b style="color:#ffd27a">' + uLabel + '</b></div>' +
      '<div style="font-size:11px;color:#fff;margin-top:10px;opacity:0.6">ทดสอบคนเดียว? เพิ่ม <code style="background:#333;padding:1px 5px;border-radius:3px">?pace=off</code> ต่อท้าย URL แล้ว reload</div>';
    document.body.appendChild(el);
    if (!document.getElementById('pace-shake-style')) {
      const s = document.createElement('style');
      s.id = 'pace-shake-style';
      s.textContent = '@keyframes pace-shake{0%,100%{transform:translate(-50%,-50%)}25%{transform:translate(-52%,-50%)}75%{transform:translate(-48%,-50%)}}';
      document.head.appendChild(s);
    }
    setTimeout(() => { if (el && el.parentNode) el.remove(); }, 3500);
  },

  showBanner(target) {
    let el = document.getElementById('pace-banner');
    if (!el) {
      el = document.createElement('div');
      el.id = 'pace-banner';
      el.style.cssText = [
        'position:fixed', 'top:0', 'left:0', 'right:0', 'z-index:9999',
        'padding:10px 14px', 'background:linear-gradient(90deg,#64d8ff,#b980ff)',
        'color:#0a0a18', 'font-weight:700', 'font-size:14px',
        'display:flex', 'gap:12px', 'align-items:center', 'justify-content:center',
        'box-shadow:0 2px 12px rgba(100,216,255,0.4)',
        'animation:pace-slide 0.3s ease-out'
      ].join(';');
      document.body.appendChild(el);
      if (!document.getElementById('pace-banner-style')) {
        const s = document.createElement('style');
        s.id = 'pace-banner-style';
        s.textContent = '@keyframes pace-slide{from{transform:translateY(-100%)}to{transform:translateY(0)}}' +
          '#pace-banner button{background:#0a0a18;color:#fff;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-weight:700;font-size:13px}' +
          '#pace-banner button:hover{background:#1a1a2e}' +
          '#pace-banner .pace-dismiss{background:transparent;color:#0a0a18;padding:4px 8px;font-size:18px}';
        document.head.appendChild(s);
      }
    }
    el.innerHTML = '🔔 ครูพาไปหน้า <b>' + target.title + '</b> แล้ว &nbsp; ' +
      '<button onclick="Book.pace.goTo(\'' + target.file + '\')">ไปเลย →</button>' +
      '<button class="pace-dismiss" onclick="Book.pace.dismissBanner()" title="ปิด">×</button>';
  },

  dismissBanner() {
    const el = document.getElementById('pace-banner');
    if (el) el.remove();
  },

  goTo(file) {
    location.href = file;
  }
};

document.addEventListener('DOMContentLoaded', () => { Book.init(); Book.pace.init(); });
