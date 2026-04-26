/* ===== COSMOS LOG · Multi-team Leaderboard ===== */
/* 1 อุปกรณ์ · สลับทีม · เก็บคะแนนทุกทีมในคาบเดียวกัน                      */
/* localStorage key แยก: cosmosLog_leaderboard (ไม่ทับ cosmosLog_state)      */

const Leaderboard = {
  KEY: 'cosmosLog_leaderboard',
  open: false,

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (raw) return JSON.parse(raw);
    } catch(e) { console.warn('Leaderboard load', e); }
    return { teams: [], activeTeamId: null };
  },

  save(data) {
    localStorage.setItem(this.KEY, JSON.stringify(data));
  },

  ensureTeam(teamId, teamName) {
    const data = this.load();
    let t = data.teams.find(x => x.id === teamId);
    if (!t) {
      t = { id: teamId, name: teamName || ('ทีม ' + teamId), energy: 0, completed: [] };
      data.teams.push(t);
    } else if (teamName) {
      t.name = teamName;
    }
    data.activeTeamId = teamId;
    this.save(data);
    this.render();
    return t;
  },

  /* ซิงก์ energy ของทีม active จาก Book.state */
  syncActive() {
    const data = this.load();
    if (!data.activeTeamId) return;
    const t = data.teams.find(x => x.id === data.activeTeamId);
    if (!t) return;
    t.energy = Book.state.energy || 0;
    t.lastSync = Date.now();
    this.save(data);
    this.render();
  },

  /* ครูปรับเอง (DM card) */
  adjust(teamId, delta, reason = 'teacher') {
    const data = this.load();
    const t = data.teams.find(x => x.id === teamId);
    if (!t) return;
    t.energy = Math.max(0, (t.energy || 0) + delta);
    t.log = t.log || [];
    t.log.push({ delta, reason, at: Date.now() });
    this.save(data);
    this.render();
  },

  switchActive(teamId) {
    const data = this.load();
    data.activeTeamId = teamId;
    // โหลด energy ของทีมใหม่มาใส่ Book.state (ทำให้สลับทีมได้จริง)
    const t = data.teams.find(x => x.id === teamId);
    if (t) {
      Book.state.teamId = t.id;
      Book.state.teamName = t.name;
      Book.state.energy = t.energy || 0;
      Book.save();
      Book.updateHUD();
    }
    this.save(data);
    this.render();
  },

  clear() {
    if (!confirm('ล้าง leaderboard ทั้งห้อง?')) return;
    localStorage.removeItem(this.KEY);
    this.render();
  },

  /* ---------- HUD ---------- */
  render() {
    // แสดงปุ่ม HUD เสมอถ้าเปิดใช้งาน
    const btn = document.getElementById('hud-leaderboard-btn');
    if (btn) btn.style.display = '';

    const panel = document.getElementById('lb-panel');
    if (!panel) return;

    const data = this.load();
    if (data.teams.length === 0) {
      panel.innerHTML = '<div class="lb-empty">ยังไม่มีทีมในห้อง · เริ่มจาก P02 หรือเพิ่มเอง</div>';
      return;
    }

    const sorted = [...data.teams].sort((a,b) => (b.energy||0) - (a.energy||0));
    const max = Math.max(100, ...sorted.map(t => t.energy || 0));

    panel.innerHTML = `
      <div class="lb-head">
        <b>📊 Leaderboard</b>
        <button onclick="Leaderboard.clear()">ล้าง</button>
      </div>
      <div class="lb-list">
        ${sorted.map((t, i) => `
          <div class="lb-row ${t.id === data.activeTeamId ? 'active' : ''}" data-id="${t.id}">
            <span class="lb-rank">#${i+1}</span>
            <span class="lb-name">${t.name}</span>
            <div class="lb-bar"><div class="lb-fill" style="width:${Math.min(100, (t.energy/max)*100)}%"></div></div>
            <span class="lb-energy">⚡${t.energy || 0}</span>
            <span class="lb-adj">
              <button onclick="Leaderboard.adjust('${t.id}', -5, 'DM')">-5</button>
              <button onclick="Leaderboard.adjust('${t.id}', +10, 'DM')">+10</button>
              <button onclick="Leaderboard.switchActive('${t.id}')">เข้าเล่น</button>
            </span>
          </div>
        `).join('')}
      </div>
    `;
  },

  toggle() {
    this.open = !this.open;
    let panel = document.getElementById('lb-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'lb-panel';
      panel.className = 'lb-panel';
      document.body.appendChild(panel);
    }
    panel.classList.toggle('show', this.open);
    this.render();
  },

  init() {
    const btn = document.getElementById('hud-leaderboard-btn');
    if (btn) btn.style.display = '';
    // sync ทุก 3 วินาที
    setInterval(() => this.syncActive(), 3000);
    this.render();
  }
};

document.addEventListener('DOMContentLoaded', () => setTimeout(() => Leaderboard.init(), 0));
