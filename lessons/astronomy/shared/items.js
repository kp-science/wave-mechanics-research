/* ===== COSMOS LOG · Items / Inventory Engine ===== */
/* Combo items ที่ข้ามหน้า · config จาก ep/config.js (EP_CONFIG.items)       */
/*                                                                           */
/* item schema:                                                              */
/*   { id, name, icon, desc, grant, use, effect, grantCond? }                */
/*                                                                           */
/* effect keys รู้จักในตัว:                                                  */
/*   "revealHint"           → P09 · ปลดคำใบ้ tuning fork                     */
/*   "bossDamage:+20%"      → P14 · เพิ่ม damage ต่อ BOSS                    */
/*   "timerRelax:+60s"      → P13 · เพิ่มเวลา chase                         */
/*   "absorbOneHit"         → P14 · กัน hit VOID ได้ 1 ครั้ง                 */

const Items = {
  registry() {
    return (window.EP_CONFIG && EP_CONFIG.items) || [];
  },

  byId(id) { return this.registry().find(x => x.id === id); },

  owned() { return Book.state.inventory || []; },

  has(id) { return this.owned().some(x => x.id === id); },

  isUsed(id) { return (Book.state.itemsUsed || []).includes(id); },

  /* ---------- Grant ---------- */
  grant(id, { from, note = '' } = {}) {
    if (this.has(id)) return false;
    const def = this.byId(id);
    if (!def) { console.warn('Items.grant unknown id', id); return false; }
    Book.state.inventory.push({
      id, name: def.name, icon: def.icon,
      from: from || Book.getCurrentPageId(),
      note,
      at: Date.now()
    });
    Book.save();
    this.renderHUD();
    this.toast(`🎁 ได้ไอเทม: ${def.icon} ${def.name}`);
    return true;
  },

  /* ---------- Use ---------- */
  use(id, { on, payload } = {}) {
    if (!this.has(id)) return { ok: false, reason: 'not-owned' };
    if (this.isUsed(id)) return { ok: false, reason: 'already-used' };
    const def = this.byId(id);
    if (def.use && on && def.use !== on) {
      return { ok: false, reason: 'wrong-page' };
    }
    Book.state.itemsUsed.push(id);
    Book.save();
    this.renderHUD();
    const effect = def.effect;
    this.toast(`✨ ใช้ไอเทม: ${def.icon} ${def.name}`);
    return { ok: true, effect, item: def, payload };
  },

  /* ---------- HUD ---------- */
  renderHUD() {
    const el = document.getElementById('hud-inventory');
    if (!el) return;
    const items = this.owned();
    if (items.length === 0) { el.style.display = 'none'; return; }
    el.style.display = '';
    el.innerHTML = '🎒 ' + items.map(it => {
      const used = this.isUsed(it.id);
      return `<span class="inv-chip ${used ? 'used' : ''}" title="${it.name}${used ? ' (ใช้แล้ว)' : ''}">${it.icon}</span>`;
    }).join('');
  },

  /* ---------- Toast ---------- */
  toast(msg) {
    const t = document.createElement('div');
    t.className = 'item-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('show'), 10);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2200);
  },

  /* ---------- Item picker UI (ใช้ใน boss/puzzle pages) ---------- */
  mountPicker(selector, { useOn, onUse } = {}) {
    const host = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!host) return;
    const render = () => {
      const items = this.owned().filter(it => {
        const def = this.byId(it.id);
        return def && def.use === useOn && !this.isUsed(it.id);
      });
      if (items.length === 0) { host.innerHTML = '<div class="item-picker-empty">ไม่มีไอเทมที่ใช้ได้หน้านี้</div>'; return; }
      host.classList.add('item-picker');
      host.innerHTML = '<div class="ip-title">🎒 ไอเทมที่ใช้ได้</div>' +
        items.map(it => {
          const def = this.byId(it.id);
          return `<button class="ip-btn" data-id="${it.id}">
            <span class="ip-icon">${def.icon}</span>
            <span class="ip-name">${def.name}</span>
            <span class="ip-eff">${def.effect}</span>
          </button>`;
        }).join('');
      host.querySelectorAll('.ip-btn').forEach(b => {
        b.addEventListener('click', () => {
          const r = this.use(b.dataset.id, { on: useOn });
          if (r.ok && onUse) onUse(r);
          render();
        });
      });
    };
    render();
  },

  init() { this.renderHUD(); }
};

document.addEventListener('DOMContentLoaded', () => setTimeout(() => Items.init(), 0));
