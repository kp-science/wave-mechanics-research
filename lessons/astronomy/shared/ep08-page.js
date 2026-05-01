/* ===== COSMOS LOG · EP08 page helper =====
 * ลดความซ้ำของ 28 หน้า
 *   EP08Page.story(pageId, hostSel)   -- render story-row จาก config
 *   EP08Page.submit(opts)             -- broadcast event + render result
 *   EP08Page.markVisit(pageId)        -- save lastPage
 */
(function(global){
  const Page = {
    story(pageId, hostSel){
      const host = document.querySelector(hostSel || '#storySpine');
      if (!host) return;
      const s = (global.EP_CONFIG && EP_CONFIG.story && EP_CONFIG.story[pageId]) || {};
      const rows = [];
      if (s.objective) rows.push(['OBJECTIVE', s.objective]);
      if (s.npc)       rows.push(['NPC', s.npc]);
      if (s.prev)      rows.push(['PREV', s.prev]);
      if (s.line)      rows.push(['LINE', '"' + s.line + '"']);
      if (s.now)       rows.push(['NOW', s.now]);
      if (s.next)      rows.push(['NEXT', s.next]);
      host.innerHTML = rows.map(r =>
        `<div class="story-row"><b>${r[0]}</b><span>${r[1]}</span></div>`).join('');
    },
    submit(opts){
      opts = opts || {};
      const hostId = opts.hostId || 'resultHost';
      const host = document.getElementById(hostId);
      const ok = opts.ok !== false;
      if (host) {
        const cls = ok ? 'card-gold' : 'card-pink';
        host.innerHTML = `
          <div class="card ${cls}">
            ${opts.title ? `<h3>${opts.title}</h3>` : ''}
            ${opts.body || ''}
          </div>
        `;
      }
      if (global.KPA && opts.kpa) {
        KPA.log(opts.kpa.dom||'K', opts.kpa.ind||'K1', opts.kpa.ev||'submit');
      }
      if (global.KPA && opts.research) {
        KPA.research(opts.research.id || 'submit', opts.research.data || {});
      }
      window.dispatchEvent(new CustomEvent('cosmosLog:submitted', { detail:{ ok }}));
      window.dispatchEvent(new CustomEvent('ep08:storyEntered'));
    },
    markVisit(pageId){
      try { localStorage.setItem('cosmosLog_ep08_lastPage', pageId); } catch(e){}
    },
    /** ดึง keys + เพิ่ม key ที่ปลดในเส้นทางหลัก EP08 */
    grantKey(id){
      try {
        const arr = JSON.parse(localStorage.getItem('cosmosLog_ep08_keys') || '[]');
        if (!arr.includes(id)) {
          arr.push(id);
          localStorage.setItem('cosmosLog_ep08_keys', JSON.stringify(arr));
        }
      } catch(e){}
    }
  };
  global.EP08Page = Page;
})(window);
