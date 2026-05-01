/* ===== COSMOS LOG · S1 KEYRING =====
 * อ่าน OS/HELION/GS จาก localStorage ทุก EP01-07 รวมเป็น 17-key inventory
 * ใช้ใน EP08 GENESIS FORGE boss · player ที่ skip EP = key หาย = boss ยากกว่า
 *
 * 17 Keys:
 *   EP01 stellar(3): k_star, k_spectrum, k_stellar
 *   EP04 bigbang(2): k_bigbang, k_cmb
 *   EP05 sun(2):     k_sun, k_solarwind
 *   EP06 GS(6):      gs1..gs6
 *   EP07 OS(4):      os1..os4
 */
(function(global){
  const KEY_GRANT = 'cosmosLog_s1Keyring_granted'; // override สำหรับครู

  const CATALOG = [
    // EP01-03 stellar
    { id:'k_star',      ep:'EP01-03', icon:'⭐', name:'ดาวฤกษ์',       cat:'stellar',  desc:'รู้กำเนิด/ประเภท/วงจรชีวิตดาว' },
    { id:'k_spectrum',  ep:'EP01-03', icon:'🌈', name:'สเปกตรัมดาว',  cat:'stellar',  desc:'อ่านสเปกตรัม → องค์ประกอบ + อุณหภูมิ' },
    { id:'k_stellar',   ep:'EP01-03', icon:'💥', name:'ซูเปอร์โนวา',   cat:'stellar',  desc:'ตายของดาวใหญ่ → ธาตุหนัก' },

    // EP04 big bang
    { id:'k_bigbang',   ep:'EP04',    icon:'💣', name:'Big Bang',     cat:'bigbang',  desc:'การขยายตัวของเอกภพ' },
    { id:'k_cmb',       ep:'EP04',    icon:'📡', name:'CMB 2.73K',    cat:'bigbang',  desc:'รังสีไมโครเวฟพื้นหลัง' },

    // EP05 sun
    { id:'k_sun',       ep:'EP05',    icon:'☀️', name:'ดวงอาทิตย์',     cat:'sun',      desc:'นิวเคลียร์ฟิวชัน p-p chain' },
    { id:'k_solarwind', ep:'EP05',    icon:'🌬️', name:'ลมสุริยะ',      cat:'sun',      desc:'อนุภาคพลังสูงจาก corona' },

    // EP06 Genesis Shards
    { id:'gs1', ep:'EP06', icon:'☁️', name:'Nebula Seed',    cat:'solar', desc:'เนบิวลาตั้งต้นระบบสุริยะ' },
    { id:'gs2', ep:'EP06', icon:'💍', name:'Disk Ring',      cat:'solar', desc:'จานพอกพูน · หมุนทิศเดียวกัน' },
    { id:'gs3', ep:'EP06', icon:'🪨', name:'Rocky Core',     cat:'solar', desc:'แก่นหินดาวเคราะห์ชั้นใน' },
    { id:'gs4', ep:'EP06', icon:'⭕', name:'Belt Fragment',  cat:'solar', desc:'แถบดาวเคราะห์น้อย' },
    { id:'gs5', ep:'EP06', icon:'☄', name:'Giant\'s Heart', cat:'solar', desc:'ดาวเคราะห์แก๊สยักษ์ + แก่น' },
    { id:'gs6', ep:'EP06', icon:'❄️', name:'Oort Whisper',  cat:'solar', desc:'เมฆอูร์ต · ขอบจริงระบบสุริยะ' },

    // EP07 Objective Shards
    { id:'os1', ep:'EP07', icon:'🔭', name:'Telescope Lens', cat:'tech',  desc:'กล้อง 6 ช่วงคลื่น EM' },
    { id:'os2', ep:'EP07', icon:'🚀', name:'Rocket Build',   cat:'tech',  desc:'ประกอบจรวด + v_escape' },
    { id:'os3', ep:'EP07', icon:'🪐', name:'Mars Plan',      cat:'tech',  desc:'ออกแบบยานสำรวจดาวอังคาร' },
    { id:'os4', ep:'EP07', icon:'🧪', name:'Spinoff Master', cat:'tech',  desc:'spinoff: heat shield · CPR · freeze-dry' }
  ];

  // อ่านสถานะจาก localStorage ของแต่ละ EP
  function _hasFromStorage(id){
    try {
      // ครู grant override ไว้
      const granted = JSON.parse(localStorage.getItem(KEY_GRANT) || '[]');
      if (granted.includes(id)) return true;

      // EP07 OS array
      if (/^os[1-4]$/.test(id)) {
        const arr = JSON.parse(localStorage.getItem('cosmosLog_ep07_os') || '[]');
        return arr.includes(id);
      }
      // EP06 GS array
      if (/^gs[1-6]$/.test(id)) {
        const arr = JSON.parse(localStorage.getItem('cosmosLog_ep06_gs') || '[]');
        if (arr.includes(id)) return true;
        // fallback: นับจาก KPA economy ของ EP06
        const eco = JSON.parse(localStorage.getItem('cosmosLog_ep06_economy') || '{}');
        if (eco.shards && eco.shards.includes(id)) return true;
        return false;
      }
      // EP04 keys
      if (id === 'k_bigbang' || id === 'k_cmb') {
        const eco = JSON.parse(localStorage.getItem('cosmosLog_ep04_economy') || '{}');
        const arr = JSON.parse(localStorage.getItem('cosmosLog_ep04_helion') || '[]');
        // ถ้ามี HELION อย่างน้อย 3 ดวง = ผ่าน EP04 = ได้ทั้ง 2 keys
        if (arr.length >= 3) return true;
        if (eco.completed) return true;
        return false;
      }
      // EP05 keys
      if (id === 'k_sun' || id === 'k_solarwind') {
        const arr = JSON.parse(localStorage.getItem('cosmosLog_ep05_helion') || '[]');
        if (arr.length >= 4) return true;
        const eco = JSON.parse(localStorage.getItem('cosmosLog_ep05_economy') || '{}');
        if (eco.completed) return true;
        return false;
      }
      // EP01-03 stellar (ไม่มี EP1-3 จริงในซีซันนี้ · ให้ default กึ่ง grant)
      if (id === 'k_star' || id === 'k_spectrum' || id === 'k_stellar') {
        // default true ถ้าไม่มีระบบ - เพื่อไม่ลงโทษผู้เล่นที่ไม่ได้เล่นพื้นฐาน
        const skip = localStorage.getItem('cosmosLog_skipBaseline') === '1';
        if (skip) return false;
        return true;
      }
      return false;
    } catch(e){ return false; }
  }

  const Keyring = {
    catalog: CATALOG,

    /** ดึง keys ทั้ง 17 พร้อม owned status */
    all(){
      return CATALOG.map(k => Object.assign({}, k, { owned: _hasFromStorage(k.id) }));
    },

    /** ดึงเฉพาะที่ owned */
    owned(){
      return this.all().filter(k => k.owned);
    },

    /** count owned/total */
    count(){
      const all = this.all();
      return { owned: all.filter(k => k.owned).length, total: all.length };
    },

    /** group by category */
    byCategory(){
      const out = { stellar:[], bigbang:[], sun:[], solar:[], tech:[] };
      this.all().forEach(k => { (out[k.cat] || (out[k.cat]=[])).push(k); });
      return out;
    },

    /** group by EP */
    byEP(){
      const out = {};
      this.all().forEach(k => { (out[k.ep] || (out[k.ep]=[])).push(k); });
      return out;
    },

    /** ดึงเฉพาะ category (สำหรับ boss epoch matching) */
    forEpoch(epochId){
      // epoch1 INFLATION  = bigbang + stellar (forces ดั้งเดิม)
      // epoch2 NUCLEOSYNTH = stellar + sun
      // epoch3 CMB+STARS  = bigbang + stellar + tech
      // epoch4 GALAXIES   = solar + tech
      const map = {
        1: ['bigbang', 'stellar'],
        2: ['stellar', 'sun'],
        3: ['bigbang', 'stellar', 'tech'],
        4: ['solar', 'tech']
      };
      const cats = map[epochId] || [];
      return this.owned().filter(k => cats.includes(k.cat));
    },

    /** ตรวจว่า key id ถูก type สำหรับ epoch หรือไม่ */
    matchesEpoch(keyId, epochId){
      const k = CATALOG.find(x => x.id === keyId);
      if (!k) return false;
      const map = { 1:['bigbang','stellar'], 2:['stellar','sun'], 3:['bigbang','stellar','tech'], 4:['solar','tech'] };
      return (map[epochId] || []).includes(k.cat);
    },

    /** ครู/dev: grant key (override) */
    grant(id){
      try {
        const arr = JSON.parse(localStorage.getItem(KEY_GRANT) || '[]');
        if (!arr.includes(id)) { arr.push(id); localStorage.setItem(KEY_GRANT, JSON.stringify(arr)); }
      } catch(e){}
    },
    grantAll(){
      try {
        const ids = CATALOG.map(k => k.id);
        localStorage.setItem(KEY_GRANT, JSON.stringify(ids));
      } catch(e){}
    },
    reset(){
      try { localStorage.removeItem(KEY_GRANT); } catch(e){}
    },

    /** render compact dock UI · returns DOM node */
    renderDock(opts){
      opts = opts || {};
      const owned = this.owned();
      const dock = document.createElement('div');
      dock.className = 's1-key-dock';
      dock.innerHTML = `
        <div class="s1k-title">🗝️ S1 KEYRING · ${owned.length}/17</div>
        <div class="s1k-grid"></div>
      `;
      const grid = dock.querySelector('.s1k-grid');
      this.all().forEach(k => {
        const el = document.createElement('button');
        el.className = 's1k-chip ' + (k.owned ? 'owned' : 'locked');
        el.dataset.keyId = k.id;
        el.dataset.cat = k.cat;
        el.innerHTML = `<span class="s1k-ic">${k.icon}</span><span class="s1k-nm">${k.name}</span>`;
        if (opts.onClick) el.addEventListener('click', () => opts.onClick(k));
        if (opts.draggable && k.owned) {
          el.draggable = true;
          el.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', k.id);
            e.dataTransfer.setData('application/x-s1key', k.id);
            el.classList.add('dragging');
          });
          el.addEventListener('dragend', () => el.classList.remove('dragging'));
        }
        grid.appendChild(el);
      });
      return dock;
    },

    /** inject CSS */
    injectStyle(){
      if (document.getElementById('s1-keyring-css')) return;
      const s = document.createElement('style');
      s.id = 's1-keyring-css';
      s.textContent = `
        .s1-key-dock{background:rgba(8,4,16,.85);border:1px solid rgba(255,216,74,.3);
          border-radius:12px;padding:10px;backdrop-filter:blur(6px);}
        .s1k-title{font-size:13px;color:#ffd84a;letter-spacing:.08em;margin-bottom:6px;font-weight:700;}
        .s1k-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(86px,1fr));gap:6px;}
        .s1k-chip{display:flex;flex-direction:column;align-items:center;gap:2px;
          background:#11142a;border:1px solid #2a3a55;border-radius:8px;padding:6px 4px;
          color:#e3ecf8;cursor:pointer;font:inherit;transition:all .15s;}
        .s1k-chip.owned{border-color:rgba(255,216,74,.5);background:linear-gradient(180deg,#1a1530,#0a0818);}
        .s1k-chip.owned:hover{border-color:#ffd84a;transform:translateY(-2px);box-shadow:0 4px 12px rgba(255,216,74,.25);}
        .s1k-chip.locked{opacity:.35;filter:grayscale(.7);cursor:not-allowed;}
        .s1k-chip.dragging{opacity:.5;}
        .s1k-ic{font-size:22px;}
        .s1k-nm{font-size:10px;text-align:center;line-height:1.1;}
        .s1k-chip[data-cat="bigbang"].owned{border-color:rgba(106,58,255,.6);}
        .s1k-chip[data-cat="stellar"].owned{border-color:rgba(255,216,74,.6);}
        .s1k-chip[data-cat="sun"].owned{border-color:rgba(255,138,61,.6);}
        .s1k-chip[data-cat="solar"].owned{border-color:rgba(74,144,226,.6);}
        .s1k-chip[data-cat="tech"].owned{border-color:rgba(0,212,255,.6);}
      `;
      document.head.appendChild(s);
    }
  };

  global.S1Keyring = Keyring;
})(window);
