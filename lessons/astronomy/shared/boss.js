/* ===== COSMOS LOG · BOSS Fight Engine (P14 VOID) ===== */
/* 3 Phases · HP bar · claims · item synergy                                 */

const Boss = {
  /* ---------- Lifecycle ---------- */
  init({ hp = 300, phases = [] } = {}) {
    if (!Book.state.boss || !Book.state.boss.started) {
      Book.state.boss = {
        started: true,
        hp, maxHp: hp,
        phase: 0,            // 0-based index
        phases,              // array of { hp, claim, counter: [obj codes] }
        log: [],
        startedAt: Date.now(),
        won: false, lost: false
      };
      Book.save();
    } else {
      // เติม phase config ถ้ายังไม่มี (fresh session)
      if (!Book.state.boss.phases || Book.state.boss.phases.length === 0) {
        Book.state.boss.phases = phases;
        Book.save();
      }
    }
    this.render();
  },

  current() { return Book.state.boss; },

  currentPhase() {
    const b = this.current();
    if (!b || !b.phases) return null;
    return b.phases[b.phase] || null;
  },

  /* ---------- Damage / Heal ---------- */
  damage({ amount, fromItem = null, reason = '' }) {
    const b = this.current();
    if (!b || b.won || b.lost) return;
    b.hp = Math.max(0, b.hp - amount);
    b.log.push({ type: 'damage', amount, fromItem, reason, at: Date.now() });

    // phase transition: HP แบ่งเท่า ๆ กันตาม phases.length
    const phaseHp = Math.floor(b.maxHp / b.phases.length);
    const remainingPhases = Math.ceil(b.hp / phaseHp);
    const newPhase = b.phases.length - remainingPhases;
    if (newPhase > b.phase && newPhase < b.phases.length) {
      b.phase = newPhase;
      b.log.push({ type: 'phaseChange', to: newPhase, at: Date.now() });
      document.dispatchEvent(new CustomEvent('boss:phase', { detail: { phase: newPhase } }));
    }

    if (b.hp <= 0) {
      b.won = true;
      b.endedAt = Date.now();
      document.dispatchEvent(new CustomEvent('boss:defeated'));
    }

    Book.save();
    this.render();
  },

  playerHit({ amount = 15, shielded = false }) {
    // VOID ตีกลับ · absorbOneHit ป้องกันได้
    const b = this.current();
    if (!b) return;
    if (shielded) {
      b.log.push({ type: 'playerHit', amount, shielded: true, at: Date.now() });
      Items.toast && Items.toast('🛡️ Shield ดูดซับ 1 hit!');
    } else {
      Book.addEnergy(-amount, 'boss-hit');
    }
    Book.save();
    this.render();
  },

  /* ---------- Claim resolution ---------- */
  resolveClaim({ correct, evidenceCount = 1 }) {
    const b = this.current();
    if (!b) return;
    const phase = this.currentPhase();
    if (!phase) return;

    if (correct) {
      const base = Math.floor(b.maxHp / b.phases.length);
      let dmg = base;
      if (evidenceCount >= 2) dmg = Math.floor(dmg * 1.2);
      // ใช้ Signal Decoder → +20%
      if (Items.has && Items.has('decoder') && !Items.isUsed('decoder')) {
        const r = Items.use('decoder', { on: 'p14' });
        if (r.ok) dmg = Math.floor(dmg * 1.2);
      }
      this.damage({ amount: dmg, reason: 'claim-correct' });
      Game && Game.award({ base: 20, page: 'p14', objective: 'A4', skipBet: true });
    } else {
      const shielded = Items.has && Items.has('shield') && !Items.isUsed('shield');
      if (shielded) Items.use('shield', { on: 'p14' });
      this.playerHit({ amount: 15, shielded });
      Game && Game.penalty({ amount: 5, page: 'p14', objective: 'A4', skipBet: true });
    }
  },

  /* ---------- Render HP bar ---------- */
  render() {
    const host = document.getElementById('boss-hud');
    const b = this.current();
    if (!host || !b) return;
    const pct = Math.max(0, (b.hp / b.maxHp) * 100);
    const phase = this.currentPhase();
    host.innerHTML = `
      <div class="boss-name">👁️ VOID · Phase ${b.phase + 1}/${b.phases.length}</div>
      <div class="boss-hp-wrap">
        <div class="boss-hp-fill" style="width:${pct}%"></div>
        <span class="boss-hp-text">${b.hp} / ${b.maxHp}</span>
      </div>
      ${phase ? `<div class="boss-claim">"${phase.claim}"</div>` : ''}
      ${b.won ? '<div class="boss-status won">✨ VOID พ่ายแพ้</div>' : ''}
    `;
  }
};
