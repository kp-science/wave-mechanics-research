/* ===== COSMOS LOG · Role View Helper · EP03 ===== */
/* แสดงผล component ต่างกันตาม role ของ iPad                              */

(function(global){
  const Role = {
    current() {
      const me = global.Sync && global.Sync.getMe();
      return me && me.role;
    },

    is(...roles) {
      const cur = this.current();
      return cur && roles.includes(cur);
    },

    isObserver() {
      // ถ้ายังไม่ได้ join หรือยังไม่เลือก role
      return !this.current();
    },

    // เล่นเดี่ยว: ทุกคนเห็นทุก section
    isSolo() {
      const s = global.Sync && global.Sync.getState();
      return !s || !s.roster || s.roster.length <= 1;
    },

    // visibility rule: ถ้า solo → เห็นทุก section · ถ้ามีทีม → เห็นเฉพาะ role ตัวเอง
    applyToPage(root) {
      root = root || document.body;
      const cur = this.current();
      const solo = this.isSolo();
      root.querySelectorAll('[data-role]').forEach(el => {
        const roles = (el.dataset.role || '').split(',').map(r=>r.trim());
        if (solo || roles.includes('all')) { el.style.display = ''; return; }
        if (!cur || !roles.includes(cur)) {
          el.style.display = 'none';
          if (!el.dataset.hiddenNote) {
            // add subtle "อีกบทบาทเห็น" marker (debug only in solo)
            el.dataset.hiddenNote = 'hidden-' + roles.join('_');
          }
        } else {
          el.style.display = '';
        }
      });
    },

    // Badge แสดงบทบาทปัจจุบันบน HUD
    renderBadge() {
      let badge = document.getElementById('roleBadge');
      if (!badge) {
        badge = document.createElement('div');
        badge.id = 'roleBadge';
        badge.style.cssText = 'position:fixed;bottom:10px;right:10px;z-index:50;padding:6px 12px;background:rgba(100,216,255,0.1);border:1px solid #64d8ff;border-radius:14px;color:#64d8ff;font-family:Orbitron,monospace;font-size:11px;';
        document.body.appendChild(badge);
      }
      const roles = (global.EP_CONFIG && global.EP_CONFIG.roles) || [];
      const cur = this.current();
      const me = global.Sync && global.Sync.getMe();
      if (!cur) {
        badge.innerHTML = '👤 ยังไม่ได้เลือกบทบาท';
        return;
      }
      const r = roles.find(x => x.id === cur);
      badge.innerHTML = (r ? r.icon + ' ' + r.name : cur) + (me && me.name ? ' · ' + me.name : '');
    },
  };

  global.Role = Role;
})(window);
