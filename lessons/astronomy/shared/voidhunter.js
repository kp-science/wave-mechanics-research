/* ===== COSMOS LOG · VOIDHUNTER Meter · EP03 ===== */
/* แทน BOSS HP · 0 = โดนจับ · 100 = หลุด                                    */

(function(global){
  const VoidHunter = {
    get() { const s = global.Sync && global.Sync.getState(); return (s && s.meter != null) ? s.meter : 60; },

    change(delta, reason) { global.Sync && global.Sync.changeMeter(delta, reason); },

    wrongAnswer(page) {
      const cfg = global.EP_CONFIG && global.EP_CONFIG.voidhunter;
      this.change(cfg && cfg.wrongAnswer != null ? cfg.wrongAnswer : -10, 'wrong@' + page);
    },

    isSafeHaven(pageId) {
      const cfg = global.EP_CONFIG && global.EP_CONFIG.voidhunter;
      const safe = (cfg && cfg.safeHavens) || [];
      return safe.includes(pageId);
    },

    // HUD: VOIDHUNTER distance meter
    renderHUD() {
      let hud = document.getElementById('voidhunterHUD');
      if (!hud) {
        hud = document.createElement('div');
        hud.id = 'voidhunterHUD';
        hud.style.cssText = 'position:fixed;top:10px;left:10px;z-index:50;padding:8px 14px;background:rgba(5,6,15,0.85);border:1px solid #b980ff;border-radius:10px;color:#e8ecf8;font-family:Orbitron,monospace;font-size:11px;letter-spacing:0.1em;max-width:260px;';
        document.body.appendChild(hud);
      }
      const m = this.get();
      const danger = m <= 20;
      const warn = m <= 40;
      const color = danger ? '#ff5c7a' : (warn ? '#ffcb6b' : '#b980ff');
      hud.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <span style="color:${color};">👁️ VOIDHUNTER</span>
          <span style="color:${color};font-size:13px;">${m}%</span>
        </div>
        <div style="height:6px;background:rgba(0,0,0,0.5);border-radius:3px;overflow:hidden;">
          <div style="height:100%;width:${m}%;background:linear-gradient(90deg,#ff5c7a,${color});transition:width .4s;"></div>
        </div>
        <div style="font-size:9px;color:#6a7394;margin-top:3px;">${danger?'⚠️ ใกล้ถึงตัว!':(warn?'ระวัง':'ปลอดภัย')}</div>
      `;
      if (danger) hud.classList.add('pulse');
    },

    // Per-page tick (called from book.js or page init)
    tickOnPage(pageId) {
      if (this.isSafeHaven(pageId)) return;
      global.Sync && global.Sync.setPage(pageId);
    },
  };

  global.VoidHunter = VoidHunter;
})(window);
