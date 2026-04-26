/* ===== COSMOS LOG · VOID Corruption Meter ===== */
/* meter 0-100 · เพิ่มเมื่อเปลี่ยนหน้า · หยุดใน safe haven (P10)            */
/* VFX: CSS filter + overlay · ไม่มีเสียง/จอสั่น (ตาม user request)          */

const Corruption = {
  get() { return Book.state.corruption || 0; },

  set(v) {
    Book.state.corruption = Math.max(0, Math.min(100, Math.round(v)));
    Book.save();
    this.render();
    return Book.state.corruption;
  },

  add(n) { return this.set(this.get() + n); },

  reset() { return this.set(0); },

  safeHaven() {
    // ไม่เปลี่ยนค่า · แค่ apply visual "safe" class เพื่อตัด VFX
    document.body.classList.add('corruption-safe');
    this.render();
  },

  /* ---------- Auto-tick on page load ---------- */
  // เรียกใน Corruption.init() ของแต่ละหน้า EP02
  // แค่หน้าที่ยังไม่เคย tick ใน session นี้เท่านั้น
  tickOnPage(pageId) {
    pageId = pageId || Book.getCurrentPageId();
    const cfg = (window.EP_CONFIG && EP_CONFIG.corruption) || {};
    const safeHavens = cfg.safeHavens || [];
    if (safeHavens.includes(pageId)) { this.safeHaven(); return; }

    // ticked map · ไม่ tick ซ้ำเมื่อย้อนหน้า
    if (!Book.state.data._corruptionTicked) Book.state.data._corruptionTicked = {};
    if (Book.state.data._corruptionTicked[pageId]) { this.render(); return; }

    const amount = cfg.perPage || 10;
    this.add(amount);
    Book.state.data._corruptionTicked[pageId] = true;
    Book.save();
  },

  /* ---------- HUD + VFX ---------- */
  render() {
    const el = document.getElementById('hud-corruption');
    const v = this.get();
    const cfg = (window.EP_CONFIG && EP_CONFIG.corruption) || {};
    const warnAt = cfg.warnAt || 80;

    if (el) {
      if (v > 0 || cfg.enabled) {
        el.style.display = '';
        el.textContent = `🦠 ${v}%`;
        el.classList.toggle('warn', v >= warnAt);
        el.classList.toggle('critical', v >= 95);
      }
    }

    // body class สำหรับ CSS VFX
    document.body.classList.toggle('corrupt-low',  v >= 20 && v < warnAt);
    document.body.classList.toggle('corrupt-high', v >= warnAt && v < 95);
    document.body.classList.toggle('corrupt-critical', v >= 95);

    // emit event ถ้าถึง loseAt
    const loseAt = cfg.loseAt || 100;
    if (v >= loseAt && !Book.state.data._corruptionFired) {
      Book.state.data._corruptionFired = true;
      Book.save();
      document.dispatchEvent(new CustomEvent('corruption:max'));
    }
  },

  init() {
    // auto-tick ถ้า EP เปิด corruption + หน้านี้เป็นหน้าที่ถูก track
    const cfg = (window.EP_CONFIG && EP_CONFIG.corruption) || {};
    if (cfg.enabled) {
      const pageId = Book.getCurrentPageId();
      const isEpPage = (EP_CONFIG.pages || []).some(p => p.id === pageId);
      if (isEpPage) this.tickOnPage(pageId);
    }
    this.render();
  }
};

document.addEventListener('DOMContentLoaded', () => setTimeout(() => Corruption.init(), 0));
