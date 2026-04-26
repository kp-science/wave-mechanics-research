/* ===== COSMOS LOG · Teacher DM Cards ===== */
/* 6 การ์ดต่อคาบ · ครูกดใน panel ด้านข้าง (ยังอยู่ device เดียวกัน)          */
/* สำหรับ teacher URL แยก · ในอนาคตย้าย panel ไป /teacher.html               */

const Teacher = {
  open: false,

  CARDS: [
    { id:'spark',  icon:'🎴', label:'Spark',  desc:'ทีมเงียบ · +5 ให้ทีม active', action: 'sparkActive'  },
    { id:'twist',  icon:'🎴', label:'Twist',  desc:'VOID บุก · -10 ทุกทีม',       action: 'twistAll'     },
    { id:'insight',icon:'🎴', label:'Insight',desc:'ทีมเฉียว · +15 + สิทธิ์อธิบาย', action: 'insightActive'},
    { id:'mercy',  icon:'🎴', label:'Mercy',  desc:'ทีมต่ำสุด · +20',              action: 'mercyLowest'  },
    { id:'rival',  icon:'🎴', label:'Rival',  desc:'ประกาศ 2 ทีมแข่งสด',           action: 'rivalNote'    },
    { id:'silent', icon:'🎴', label:'Silent', desc:'60 วิ · ห้ามพูด · คิดในหัว',    action: 'silentTimer'  },
  ],

  cardsUsed() { return Book.state.data._teacherCardsUsed || []; },

  markUsed(id) {
    if (!Book.state.data._teacherCardsUsed) Book.state.data._teacherCardsUsed = [];
    Book.state.data._teacherCardsUsed.push({ id, at: Date.now(), page: Book.getCurrentPageId() });
    Book.save();
  },

  /* ---------- Actions ---------- */
  sparkActive() {
    const lb = Leaderboard.load();
    if (lb.activeTeamId) Leaderboard.adjust(lb.activeTeamId, +5, 'spark');
    this.toast('🎴 Spark · +5 ทีม active');
  },

  twistAll() {
    const lb = Leaderboard.load();
    lb.teams.forEach(t => Leaderboard.adjust(t.id, -10, 'twist'));
    this.toast('🎴 Twist · -10 ทุกทีม');
  },

  insightActive() {
    const lb = Leaderboard.load();
    if (lb.activeTeamId) Leaderboard.adjust(lb.activeTeamId, +15, 'insight');
    this.toast('🎴 Insight · +15 + ให้ทีมอธิบายเพื่อน');
  },

  mercyLowest() {
    const lb = Leaderboard.load();
    if (lb.teams.length === 0) return;
    const low = [...lb.teams].sort((a,b) => (a.energy||0) - (b.energy||0))[0];
    Leaderboard.adjust(low.id, +20, 'mercy');
    this.toast(`🎴 Mercy · +20 ให้ ${low.name}`);
  },

  rivalNote() {
    this.toast('🎴 Rival · เลือก 2 ทีมแข่งสด 1 ข้อ · ครูตัดสิน');
  },

  silentTimer() {
    let sec = 60;
    const t = document.createElement('div');
    t.className = 'silent-timer';
    t.textContent = `🤫 SILENT · ${sec}s`;
    document.body.appendChild(t);
    const iv = setInterval(() => {
      sec--;
      t.textContent = `🤫 SILENT · ${sec}s`;
      if (sec <= 0) { clearInterval(iv); t.classList.add('done'); t.textContent = '✅ พูดได้แล้ว'; setTimeout(() => t.remove(), 2000); }
    }, 1000);
  },

  /* ---------- UI ---------- */
  play(cardId) {
    const c = this.CARDS.find(x => x.id === cardId);
    if (!c) return;
    this[c.action]();
    this.markUsed(cardId);
    this.render();
  },

  toast(msg) {
    if (Items && Items.toast) Items.toast(msg);
    else alert(msg);
  },

  render() {
    const panel = document.getElementById('teacher-panel');
    if (!panel) return;
    const used = this.cardsUsed().map(x => x.id);
    panel.innerHTML = `
      <div class="tc-head"><b>🎴 Teacher DM Cards</b></div>
      <div class="tc-grid">
        ${this.CARDS.map(c => {
          const count = used.filter(x => x === c.id).length;
          return `<button class="tc-card" onclick="Teacher.play('${c.id}')">
            <div class="tc-icon">${c.icon}</div>
            <div class="tc-label">${c.label}</div>
            <div class="tc-desc">${c.desc}</div>
            <div class="tc-count">ใช้ไปแล้ว ${count}</div>
          </button>`;
        }).join('')}
      </div>
    `;
  },

  toggle() {
    this.open = !this.open;
    let panel = document.getElementById('teacher-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'teacher-panel';
      panel.className = 'teacher-panel';
      document.body.appendChild(panel);
    }
    panel.classList.toggle('show', this.open);
    this.render();
  },

  init() {
    const btn = document.getElementById('hud-teacher-btn');
    if (btn) btn.style.display = '';
  }
};

document.addEventListener('DOMContentLoaded', () => setTimeout(() => Teacher.init(), 0));
