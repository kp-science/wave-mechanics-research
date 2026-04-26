/* ===== COSMOS LOG · Game Layer ===== */
/* Energy · Streak · Bet · Objective tracking                               */
/* ใช้ Book.state เป็น single source of truth · ไม่ซ้ำซ้อนกับ book.js        */

const Game = {
  /* ---------- Streak & Multiplier ---------- */
  getStreak() { return Book.state.streak || 0; },

  getMultiplier() {
    const s = this.getStreak();
    if (s >= 5) return 2.0;
    if (s >= 3) return 1.5;
    return 1.0;
  },

  bumpStreak() {
    Book.state.streak = (Book.state.streak || 0) + 1;
    Book.save();
    this.renderHUD();
  },

  resetStreak() {
    Book.state.streak = 0;
    Book.save();
    this.renderHUD();
  },

  /* ---------- Bet System ---------- */
  // เรียกก่อนตอบ · confidence: 25 | 50 | 75 | 100
  placeBet({ confidence, page, qid }) {
    Book.state.bet = { confidence, page, qid, at: Date.now() };
    Book.save();
    this.renderBetBadge();
  },

  getPendingBet() { return Book.state.bet; },

  // คืนค่า delta ที่คูณแล้ว (ไม่บวก · ให้ award/penalty ใช้)
  _resolveBetMultiplier({ correct }) {
    const bet = Book.state.bet;
    if (!bet) return { mult: 1, penalty: 0 };
    const c = bet.confidence;
    let mult = 1, penalty = 0;
    if (c === 100) { mult = correct ? 2.0 : 0; penalty = correct ? 0 : 10; }
    else if (c === 75) { mult = correct ? 1.5 : 0; penalty = correct ? 0 : 5; }
    else if (c === 50) { mult = correct ? 1.0 : 0; penalty = correct ? 0 : 3; }
    else { mult = correct ? 0.75 : 0; penalty = 0; }
    return { mult, penalty, confidence: c };
  },

  _logBet({ correct, delta }) {
    const bet = Book.state.bet;
    if (!bet) return;
    Book.state.betHistory.push({
      page: bet.page, qid: bet.qid,
      confidence: bet.confidence,
      correct, delta,
      at: Date.now()
    });
    Book.state.bet = null;
    Book.save();
    this.renderBetBadge();
  },

  /* ---------- Award / Penalty ---------- */
  // ตัวอย่าง: Game.award({ base:10, timeMs:12000, page:'p04', objective:'K1' })
  award({ base = 10, timeMs = null, page, objective, skipBet = false, reason = 'correct' } = {}) {
    let amount = base;

    // time bonus (<30 วินาที = +5)
    if (timeMs !== null && timeMs < 30000) amount += 5;

    // streak multiplier
    this.bumpStreak();
    amount = Math.round(amount * this.getMultiplier());

    // bet multiplier (override if present)
    if (!skipBet) {
      const { mult } = this._resolveBetMultiplier({ correct: true });
      if (mult !== 1) amount = Math.round(base * mult + (timeMs !== null && timeMs < 30000 ? 5 : 0));
      this._logBet({ correct: true, delta: amount });
    }

    Book.addEnergy(amount, reason);
    if (objective) Obj.hit(objective, { page });
    return amount;
  },

  penalty({ amount = 3, reason = 'wrong', page, objective, skipBet = false } = {}) {
    this.resetStreak();

    let total = amount;
    if (!skipBet) {
      const { penalty: p } = this._resolveBetMultiplier({ correct: false });
      total = Math.max(total, p);
      this._logBet({ correct: false, delta: -total });
    }

    Book.addEnergy(-total, reason);
    if (objective) Obj.miss(objective, { page });
    return -total;
  },

  /* ---------- Retry tracking (A3 persistence) ---------- */
  recordRetry(pageId) {
    pageId = pageId || Book.getCurrentPageId();
    Book.state.retries[pageId] = (Book.state.retries[pageId] || 0) + 1;
    Book.save();
  },

  /* ---------- Decision logging (A1) ---------- */
  recordDecision({ page, choice, votes, minorityHeard = false, note = '' }) {
    Book.state.decisions.push({
      page: page || Book.getCurrentPageId(),
      choice, votes, minorityHeard, note,
      at: Date.now()
    });
    Book.save();
  },

  /* ---------- HUD rendering ---------- */
  renderHUD() {
    const el = document.getElementById('hud-streak');
    if (!el) return;
    const s = this.getStreak();
    const m = this.getMultiplier();
    if (s > 0) {
      el.style.display = '';
      el.textContent = `🔥 ×${m.toFixed(1)} (${s})`;
      el.classList.toggle('hot', s >= 3);
    } else {
      el.textContent = `🔥 ×1`;
    }
  },

  renderBetBadge() {
    const panel = document.getElementById('betPanel');
    if (!panel) return;
    const bet = this.getPendingBet();
    if (bet) {
      panel.dataset.locked = 'true';
      panel.classList.add('locked');
    } else {
      panel.dataset.locked = 'false';
      panel.classList.remove('locked');
    }
  },

  /* ---------- Bet panel UI helper ---------- */
  mountBetPanel(selector, { page, qid, onPlace } = {}) {
    const host = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!host) return;
    host.classList.add('bet-panel');
    host.innerHTML = `
      <div class="bet-title">🎯 ทีมมั่นใจแค่ไหน?</div>
      <div class="bet-options">
        <button data-c="25">25%<span>×0.75</span></button>
        <button data-c="50">50%<span>×1.0</span></button>
        <button data-c="75">75%<span>×1.5</span></button>
        <button data-c="100">100%<span>×2.0</span></button>
      </div>
      <div class="bet-status" id="bet-status">เลือกก่อนตอบ</div>
    `;
    host.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const c = parseInt(btn.dataset.c, 10);
        this.placeBet({ confidence: c, page, qid });
        host.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
        host.querySelector('#bet-status').textContent = `เดิมพัน ${c}% · ตอบได้`;
        if (onPlace) onPlace(c);
      });
    });
  },

  /* ---------- init ---------- */
  init() {
    const el = document.getElementById('hud-streak');
    if (el) el.style.display = '';
    this.renderHUD();
  }
};

/* ===== Obj · Objective Tracking (K · P · A) ===== */
const Obj = {
  ensure(code) {
    if (!Book.state.objectives[code]) {
      Book.state.objectives[code] = { hits: 0, attempts: 0, pages: {} };
    }
    return Book.state.objectives[code];
  },

  hit(code, { page } = {}) {
    const o = this.ensure(code);
    o.hits++; o.attempts++;
    if (page) o.pages[page] = (o.pages[page] || 0) + 1;
    Book.save();
  },

  miss(code, { page } = {}) {
    const o = this.ensure(code);
    o.attempts++;
    if (page) o.pages[page] = o.pages[page] || 0;
    Book.save();
  },

  report() {
    const out = {};
    for (const code in Book.state.objectives) {
      const o = Book.state.objectives[code];
      out[code] = {
        hits: o.hits, attempts: o.attempts,
        rate: o.attempts ? (o.hits / o.attempts) : 0,
        pages: o.pages
      };
    }
    return out;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // รอ Book.init() ก่อน · book.js ผูก DOMContentLoaded ด้วย ลำดับตามการ <script>
  setTimeout(() => Game.init(), 0);
});
