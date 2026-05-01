/* ===== COSMOS LOG · EP07 BOSS · VOID CIPHER VAULT =====
 * 5-phase team puzzle. Each phase tests a different ตำรา objective.
 * Output of phases 1-4 chains into the final Phase 5 master key.
 * NPC dialogue, with VOID corruption that the player must catch.
 *
 * Usage:
 *   CipherVault.start({ boosters: [...], onComplete: ({ending}) => {...} })
 */
(function(global){
  /* ===== Game Data ===== */
  const BANDS = [
    { id:'radio',   name:'วิทยุ',     telescope:'fast',      earthOK:true  },
    { id:'visible', name:'แสง',      telescope:'reflector', earthOK:true  },
    { id:'ir',      name:'IR',       telescope:'jwst',      earthOK:false },
    { id:'uv',      name:'UV',       telescope:'hubble',    earthOK:false },
    { id:'xray',    name:'X-ray',    telescope:'chandra',   earthOK:false }
  ];
  const TELESCOPES = [
    { id:'fast',      name:'FAST',          band:'radio'   },
    { id:'reflector', name:'กล้องสะท้อนแสง', band:'visible' },
    { id:'hubble',    name:'Hubble',        band:'uv'      },
    { id:'spitzer',   name:'Spitzer',       band:'ir'      },
    { id:'jwst',      name:'JWST',          band:'ir'      },
    { id:'chandra',   name:'Chandra',       band:'xray'    }
  ];
  const ORBITS = [
    { id:'LEO', alt:400,    v:7.7, label:'LEO 400 km'    },
    { id:'MEO', alt:20200,  v:5.0, label:'MEO 20,200 km' },
    { id:'GEO', alt:35786,  v:3.1, label:'GEO 35,786 km' }
  ];
  const MATERIALS = [
    { id:'aluminum',     name:'อะลูมิเนียม',          heat:1, label:'อ' },
    { id:'carbon-aero',  name:'คาร์บอน + แอโรเจล',    heat:3, label:'C' },
    { id:'titanium',     name:'ไทเทเนียม',           heat:2, label:'T' },
    { id:'plastic',      name:'พลาสติก ABS',          heat:0, label:'P' }
  ];
  const SPINOFF_POOL = [
    { id:'aerogel',     name:'แอโรเจล',         use:'heat',   label:'A' },
    { id:'carbon-lens', name:'เลนส์คาร์บอน',     use:'radiation', label:'C' },
    { id:'freezedry',   name:'อาหาร freeze-dry', use:'food',   label:'F' },
    { id:'heartpump',   name:'ปั๊มหัวใจเทียม',   use:'health', label:'H' },
    { id:'memoryfoam',  name:'เมมโมรีโฟม',       use:'cushion',label:'M' },
    { id:'uvscan',      name:'เครื่องวัด UV',    use:'radiation-alt', label:'U' },
    { id:'earthermo',   name:'ปรอททางหู',        use:'health-alt', label:'T' },
    { id:'solar',       name:'เซลล์สุริยะ',      use:'power',  label:'S' }
  ];
  const CRISIS_SLOTS = [
    { id:'heat',       icon:'🔥', label:'ความร้อน 1500°C',   need:'aerogel'   },
    { id:'radiation',  icon:'☢️', label:'รังสีอันตราย',       need:'carbon-lens' },
    { id:'food',       icon:'🍱', label:'อาหารเก็บนาน',       need:'freezedry' },
    { id:'health',     icon:'❤️', label:'ระบบยังชีพฉุกเฉิน',  need:'heartpump' }
  ];

  const Vault = {
    state: null,

    start(opts){
      const keys = (opts && opts.keys) || (global.Boot07 && Boot07.osList()) || [];
      this.state = {
        opts: opts||{},
        boosters: (opts && opts.boosters) || [],
        keys,                                  // 4-key keyring
        phase: 0,           // 0=intro, 1-5
        hp: 15, hpMax: 15,
        startedAt: Date.now(),
        outputs: {},        // phase outputs collected
        hintsUsed: 0,
        corruptionsCaught: 0,
        ending: null,
        // randomized targets
        targetBand: BANDS.filter(b => !b.earthOK)[Math.floor(Math.random()*3)],
        targetOrbit: ORBITS[Math.floor(Math.random()*3)]
      };
      // boosters
      if (this.state.boosters.includes('hull')) { this.state.hp = 17; this.state.hpMax = 17; }
      if (global.HUD) HUD.setHP(this.state.hp, this.state.hpMax);
      this._renderRoot();
      this._enterPhase(1);
      if (global.KPA) KPA.research('cipherStart', { boosters: this.state.boosters, keys });
    },

    // map phase number → key id required
    _keyForPhase(n){ return ({1:'os1',2:'os2',3:'os3',4:'os4'})[n]; },
    _hasKeyFor(n){
      const k = this._keyForPhase(n);
      return !k || (this.state.keys||[]).includes(k);
    },

    _renderRoot(){
      const root = document.getElementById('triageRoot') || document.getElementById('vaultRoot');
      if (!root) return;
      root.innerHTML = `
        <div class="cv-wrap">
          <div class="cv-hud">
            <div class="cv-title">🔐 VOID CIPHER VAULT</div>
            <div class="cv-stats">
              <span class="cv-stat">❤️ <b id="cvHp">${this.state.hp}</b>/${this.state.hpMax}</span>
              <span class="cv-stat">⏱️ <b id="cvTimer">--</b>s</span>
              <span class="cv-stat">📍 Phase <b id="cvPhase">1</b>/5</span>
            </div>
          </div>
          <div class="cv-phase-bar" id="cvPhaseBar"></div>
          <div class="cv-stage" id="cvStage"></div>
          <div class="cv-team" id="cvTeam"></div>
          <div class="cv-void-line" id="cvVoid"></div>
        </div>
      `;
      this._renderPhaseBar();
    },
    _renderPhaseBar(){
      const labels = ['🌈 อ่านคลื่น','🛰 วงโคจร','🚀 จรวด','🧪 spinoff','🔓 รวมรหัส'];
      const el = document.getElementById('cvPhaseBar');
      if (!el) return;
      el.innerHTML = labels.map((lbl,i) => {
        const n = i+1;
        const cur = this.state.phase === n;
        const done = this.state.phase > n;
        return `<span class="cv-step ${cur?'cur':''} ${done?'done':''}">P${n} · ${lbl}</span>`;
      }).join('');
    },

    _enterPhase(n){
      this.state.phase = n;
      this._renderPhaseBar();
      document.getElementById('cvPhase').textContent = n;
      this._stopTimer();
      const stage = document.getElementById('cvStage');
      const teamEl = document.getElementById('cvTeam');
      const voidEl = document.getElementById('cvVoid');

      // Re-render vault frame for this phase (keys lit accordingly)
      const wrap = document.querySelector('.cv-wrap');
      if (wrap && global.VaultGfx) {
        VaultGfx.injectFrame(wrap, n, this.state.keys);
        if (this._hasKeyFor(n)) VaultGfx.keyInsert(this._keyForPhase(n));
      }

      const phaseMap = { 1:this._phase1, 2:this._phase2, 3:this._phase3, 4:this._phase4, 5:this._phase5 };
      phaseMap[n].call(this, stage, teamEl, voidEl);

      // VOID taunts at every phase
      if (global.VaultGfx) {
        const taunts = {
          1:'เริ่มแล้ว · เธอจะเชื่อกล้องของเธอเหรอ?',
          2:'ยิ่งสูง · ยิ่งเร็ว ใช่ไหม?',
          3:'จรวดต้องดันตลอดทาง...',
          4:'spinoff = ของเสียงบประมาณนะ',
          5:'นี่บทสุดท้าย · เธอเชื่อทีมตัวเองมากแค่ไหน?'
        };
        VaultGfx.voidGhost(taunts[n] || '...');
      }
      if (global.KPA) KPA.research('cipherPhase', { phase:n, hasKey:this._hasKeyFor(n) });
    },

    /* ===== PHASE 1: Spectrum Decode ===== */
    _phase1(stage, teamEl, voidEl){
      const target = this.state.targetBand;
      const hasKey = this._hasKeyFor(1);
      const bdHTML = global.VaultGfx ? VaultGfx.renderBackdrop(1) : '';
      stage.innerHTML = `
        ${bdHTML}
        <div class="cv-card">
          <div class="cv-h">PHASE 1 · 🌈 อ่านสัญญาณคลื่น ${hasKey?'<span class="cv-keypip">🔭 Lens Key</span>':'<span class="cv-keypip cv-keypip-off">🔭 ขาด Key</span>'}</div>
          <div class="cv-howto">
            <b>📋 วิธีเล่น</b>
            <ol>
              <li>VOID ซ่อนพิกัด vault ในคลื่นช่วง <b style="color:#ff8a3d;">${target.name}</b></li>
              <li><b>คลิกเลือกกล้อง</b> ทุกตัวที่รับคลื่น <b>${target.name}</b> ได้ · ปุ่มจะเปลี่ยนสี (เลือกได้หลายตัว)</li>
              <li>ปุ่มที่<b>ไม่</b>เกี่ยวข้อง · อย่าคลิก (ปล่อยปิดไว้)</li>
              <li>กด <b>ตรวจสัญญาณ</b> · ถูกครบ = ผ่าน</li>
            </ol>
            <div class="cv-example">💡 ตัวอย่าง: ถ้าเป้า = วิทยุ → คลิกแค่ FAST · ปล่อยตัวอื่นปิด</div>
          </div>
          <div class="cv-tels" id="p1Tels">
            ${TELESCOPES.map(t => {
              const highlight = hasKey && t.band === target.id;
              return `<button class="cv-tel ${highlight?'cv-tel-hint':''}" data-id="${t.id}" data-band="${t.band}">
                <span class="cv-tel-name">${t.name}</span>
                <span class="cv-tel-band">${BANDS.find(b=>b.id===t.band).name}</span>
              </button>`;
            }).join('')}
          </div>
          <div class="cv-actions">
            <button class="cv-submit" id="p1Submit">🔓 ตรวจสัญญาณ</button>
            <button class="cv-hint" id="p1Hint">💡 คำใบ้ (-2 HP)</button>
          </div>
          <div class="cv-result" id="p1Res"></div>
        </div>
      `;
      if (global.VaultGfx) {
        VaultGfx.npcBubble(teamEl, 'เคน', 'เปิดกล้องที่ตรงกับ ' + target.name + ' · ปิดตัวอื่น' + (hasKey?' · 🔭 ผมเห็นชัดเจน':''));
      } else {
        teamEl.innerHTML = this._teamCard('เคน','วิศวกรคลื่น','เปิดกล้องที่ตรงกับ ' + target.name);
      }
      voidEl.innerHTML = '';

      const sel = new Set();
      stage.querySelectorAll('.cv-tel').forEach(b => b.onclick = () => {
        b.classList.toggle('on');
        sel.has(b.dataset.id) ? sel.delete(b.dataset.id) : sel.add(b.dataset.id);
      });
      this._startTimer(hasKey ? 110 : 90, () => this._failPhase(1, 'timeout'));

      stage.querySelector('#p1Hint').onclick = () => {
        this.state.hintsUsed++; this.state.hp -= 2; this._refreshHp();
        const correctTels = TELESCOPES.filter(t => t.band === target.id).map(t => t.name).join(', ');
        document.getElementById('p1Res').innerHTML =
          '<div class="cv-hint-box">💡 กล้องที่รับ ' + target.name + ': <b>' + correctTels + '</b></div>';
      };
      stage.querySelector('#p1Submit').onclick = () => {
        const correctIds = TELESCOPES.filter(t => t.band === target.id).map(t => t.id);
        const allCorrect = correctIds.every(id => sel.has(id))
          && [...sel].every(id => correctIds.includes(id));
        if (allCorrect) {
          this.state.outputs.band = target;
          this._winPhase(1, 'P1 ผ่าน · จับสัญญาณ ' + target.name + ' ได้');
        } else {
          this._failPhase(1, 'wrong');
        }
      };
    },

    /* ===== PHASE 2: Orbital Triangulation ===== */
    _phase2(stage, teamEl, voidEl){
      const target = this.state.targetOrbit;
      const hasKey = this._hasKeyFor(2);
      const bdHTML = global.VaultGfx ? VaultGfx.renderBackdrop(2) : '';
      stage.innerHTML = `
        ${bdHTML}
        <div class="cv-card">
          <div class="cv-h">PHASE 2 · 🛰 ระบุพิกัดวงโคจร ${hasKey?'<span class="cv-keypip">🛰️ Orbit Key</span>':'<span class="cv-keypip cv-keypip-off">🛰️ ขาด Key</span>'}</div>
          <div class="cv-howto">
            <b>📋 วิธีเล่น</b>
            <ol>
              <li>vault อยู่ที่ระดับ <b style="color:#ff8a3d;">${target.alt.toLocaleString()} km</b> เหนือผิวโลก</li>
              <li><b>คลิกเลือก orbit tier</b>: <span class="band-tag" style="background:#9be7c4;color:#001;">LEO</span> 400km / <span class="band-tag" style="background:#ffd84a;color:#001;">MEO</span> 20,200km / <span class="band-tag" style="background:#ff8a3d;color:#001;">GEO</span> 35,786km</li>
              <li><b>เลื่อน slider v_orbit</b> ให้ตรงระดับนั้น · ใช้กฎ Kepler: <em>ยิ่งสูง · ยิ่งช้า</em>
                  <ul style="margin:4px 0 0 14px;font-size:12px;">
                    <li>LEO ≈ <b>7.7 km/s</b></li>
                    <li>MEO ≈ <b>5.0 km/s</b></li>
                    <li>GEO ≈ <b>3.1 km/s</b></li>
                  </ul></li>
              <li>กด <b>ยืนยันพิกัด</b> · ถูกทั้ง tier และ v = ผ่าน</li>
            </ol>
            <div class="cv-example">💡 ตัวอย่าง: 35,786 km → GEO + v=3.1 (ดูจากสูตรที่อธิบายไว้)</div>
          </div>
          <div class="cv-orbit-row" id="p2Tiers">
            ${ORBITS.map(o => `
              <button class="cv-orbit-btn" data-id="${o.id}">
                <span class="cv-orbit-name">${o.id}</span>
                <span class="cv-orbit-alt">${o.alt.toLocaleString()} km</span>
              </button>`).join('')}
          </div>
          <div class="cv-vctrl">
            <label>v_orbit:</label>
            <input type="range" id="p2V" min="20" max="100" step="1" value="50"/>
            <span><b id="p2VVal">5.0</b> km/s</span>
          </div>
          <div class="cv-actions">
            <button class="cv-submit" id="p2Submit">🔓 ยืนยันพิกัด</button>
            <button class="cv-hint" id="p2Hint">💡 คำใบ้ (-2 HP)</button>
          </div>
          <div class="cv-result" id="p2Res"></div>
        </div>
      `;
      if (global.VaultGfx) {
        VaultGfx.npcBubble(teamEl, 'อารยา', 'ดูระดับความสูงให้ดี · LEO/MEO/GEO มี v ต่างกัน' + (hasKey?' · 🛰️ Orbit Key เปิดเส้นทางให้แล้ว':''));
      } else {
        teamEl.innerHTML = this._teamCard('อารยา','นักบินอวกาศ','ดูระดับความสูงให้ดี');
      }
      voidEl.innerHTML = '';

      let pickedTier = null;
      stage.querySelectorAll('.cv-orbit-btn').forEach(b => b.onclick = () => {
        stage.querySelectorAll('.cv-orbit-btn').forEach(x => x.classList.remove('on'));
        b.classList.add('on'); pickedTier = b.dataset.id;
      });
      const vEl = stage.querySelector('#p2V');
      vEl.oninput = () => stage.querySelector('#p2VVal').textContent = (+vEl.value/10).toFixed(1);
      this._startTimer(hasKey ? 95 : 75, () => this._failPhase(2, 'timeout'));

      stage.querySelector('#p2Hint').onclick = () => {
        this.state.hintsUsed++; this.state.hp -= 2; this._refreshHp();
        document.getElementById('p2Res').innerHTML =
          '<div class="cv-hint-box">💡 ' + target.label + ' · v = ' + target.v + ' km/s</div>';
      };
      stage.querySelector('#p2Submit').onclick = () => {
        const v = +vEl.value/10;
        const tierOK = pickedTier === target.id;
        const vOK = Math.abs(v - target.v) < 0.3;
        if (tierOK && vOK) {
          this.state.outputs.orbit = { tier:target.id, v };
          this._winPhase(2, 'P2 ผ่าน · พิกัด ' + target.id + ' · v=' + v.toFixed(1));
        } else {
          this._failPhase(2, tierOK ? 'wrong-v' : 'wrong-tier');
        }
      };
    },

    /* ===== PHASE 3: Rocket Build ===== */
    _phase3(stage, teamEl, voidEl){
      const target = this.state.outputs.orbit || { v:7.7, tier:'LEO' };
      const correctMat = 'carbon-aero';   // requires heat-tolerant for vault entry
      const hasKey = this._hasKeyFor(3);
      const bdHTML = global.VaultGfx ? VaultGfx.renderBackdrop(3) : '';
      stage.innerHTML = `
        ${bdHTML}
        <div class="cv-card">
          <div class="cv-h">PHASE 3 · 🚀 ประกอบจรวด · ส่ง decryption probe ${hasKey?'<span class="cv-keypip">🚀 Rocket Key</span>':'<span class="cv-keypip cv-keypip-off">🚀 ขาด Key</span>'}</div>
          <div class="cv-howto">
            <b>📋 วิธีเล่น</b>
            <ol>
              <li>เลือก <b>4 ส่วนประกอบจรวด</b> (จาก dropdown แต่ละช่อง)</li>
              <li>ทุกส่วนต้องถูก: หัวรบ = <b>probe</b> · วัสดุ = <b>คาร์บอน + แอโรเจล</b> (ทน 1500°C) · จรวดแข็ง = <b>2 ข้าง</b> (สมดุล)</li>
              <li>ในช่อง <b>ความเร็ว</b> · กรอกตัวเลขให้ตรงกับ orbit ที่หาได้ใน Phase 2 → <b style="color:#ff8a3d;">${target.v} km/s</b></li>
              <li>กด <b>ปล่อยจรวด</b> · ถูกทุกช่อง = ผ่าน</li>
            </ol>
            <div class="cv-example">💡 ตำรา p95 · จรวดต้องมีเชื้อเพลิงแข็ง 2 ข้างเพื่อสมดุล</div>
          </div>
          <div class="cv-rocket">
            <div class="cv-slot" data-slot="head">
              <span class="cv-slot-h">หัวรบ (probe)</span>
              <select data-q="head">
                <option value="">— เลือก —</option>
                <option value="probe">📡 probe decryption</option>
                <option value="bomb">💣 ระเบิด</option>
              </select>
            </div>
            <div class="cv-slot" data-slot="material">
              <span class="cv-slot-h">วัสดุยาน (heat shield)</span>
              <select data-q="material">
                <option value="">— เลือก —</option>
                ${MATERIALS.map(m => `<option value="${m.id}">${m.name} (heat ${m.heat}/3)</option>`).join('')}
              </select>
            </div>
            <div class="cv-slot" data-slot="boost">
              <span class="cv-slot-h">จรวดเชื้อเพลิงแข็ง 2 ข้าง</span>
              <select data-q="boost">
                <option value="">— เลือก —</option>
                <option value="2">2 ข้าง · สมดุล</option>
                <option value="1">1 ข้าง · เอียง</option>
                <option value="0">ไม่มี</option>
              </select>
            </div>
            <div class="cv-slot" data-slot="velocity">
              <span class="cv-slot-h">ความเร็วปล่อย (เพื่อถึง ${target.tier})</span>
              <input type="number" step="0.1" min="0" max="20" placeholder="km/s" data-q="velocity"/>
            </div>
          </div>
          <div class="cv-actions">
            <button class="cv-submit" id="p3Submit">🔓 ปล่อยจรวด</button>
            <button class="cv-hint" id="p3Hint">💡 คำใบ้ (-2 HP)</button>
          </div>
          <div class="cv-result" id="p3Res"></div>
        </div>
      `;
      if (global.VaultGfx) {
        VaultGfx.npcBubble(teamEl, 'โบลท์', 'ผ่าน 1500°C ต้องวัสดุทนสุด · v ต้องตรง orbit ที่หาได้' + (hasKey?' · 🚀 Rocket Key ปลด blueprint แล้ว':''));
      } else {
        teamEl.innerHTML = this._teamCard('โบลท์','กัปตันใหม่','ผ่าน 1500°C');
      }
      voidEl.innerHTML = '';

      this._startTimer(hasKey ? 110 : 90, () => this._failPhase(3, 'timeout'));

      stage.querySelector('#p3Hint').onclick = () => {
        this.state.hintsUsed++; this.state.hp -= 2; this._refreshHp();
        document.getElementById('p3Res').innerHTML =
          '<div class="cv-hint-box">💡 head=probe · วัสดุ=คาร์บอน+แอโรเจล · จรวดแข็ง 2 ข้าง · v ≈ ' + target.v + '</div>';
      };
      stage.querySelector('#p3Submit').onclick = () => {
        const get = q => stage.querySelector('[data-q="'+q+'"]').value;
        const head = get('head'), mat = get('material'), boost = get('boost'), vel = parseFloat(get('velocity'));
        const okHead = head === 'probe';
        const okMat = mat === correctMat;
        const okBoost = boost === '2';
        const okVel = !isNaN(vel) && Math.abs(vel - target.v) < 0.5;
        const allOk = okHead && okMat && okBoost && okVel;
        if (allOk) {
          this.state.outputs.rocket = { head, material:mat, boost, vel };
          this._winPhase(3, 'P3 ผ่าน · probe ขึ้นถึง vault');
        } else {
          const wrong = [];
          if (!okHead) wrong.push('หัวรบ');
          if (!okMat) wrong.push('วัสดุ');
          if (!okBoost) wrong.push('จรวดแข็ง');
          if (!okVel) wrong.push('ความเร็ว');
          this._failPhase(3, 'wrong: ' + wrong.join(', '));
        }
      };
    },

    /* ===== PHASE 4: Spinoff Toolkit ===== */
    _phase4(stage, teamEl, voidEl){
      const hasKey = this._hasKeyFor(4);
      const bdHTML = global.VaultGfx ? VaultGfx.renderBackdrop(4) : '';
      stage.innerHTML = `
        ${bdHTML}
        <div class="cv-card">
          <div class="cv-h">PHASE 4 · 🧪 เลือก Spinoff Toolkit ${hasKey?'<span class="cv-keypip">🧪 Spinoff Key</span>':'<span class="cv-keypip cv-keypip-off">🧪 ขาด Key</span>'}</div>
          <div class="cv-howto">
            <b>📋 วิธีเล่น</b>
            <ol>
              <li>มี <b>4 อันตราย</b> (กล่องบน): 🔥 ความร้อน · ☢️ รังสี · 🍱 อาหาร · ❤️ สุขภาพ</li>
              <li><b>ลาก</b> spinoff (ปุ่มล่าง) ใส่กล่องอันตรายที่ตรง · จับคู่จากตำรา p98-99</li>
              <li>มี <b>4 ตัวที่ใช่</b> (อีก 4 ตัวเป็น distractor) · ใส่ผิดตัว = ไม่ผ่าน</li>
              <li>กด <b>ส่งโพรบเข้าวอลต์</b> · ถูกครบ 4 = ผ่าน</li>
            </ol>
            <div class="cv-example">💡 ตำรา p98-99: ความร้อน→<b>แอโรเจล</b> · รังสี→<b>เลนส์คาร์บอน</b> · อาหาร→<b>freeze-dry</b> · สุขภาพ→<b>ปั๊มหัวใจ</b></div>
          </div>
          <div class="cv-crisis-row" id="p4Crisis">
            ${CRISIS_SLOTS.map(c => `
              <div class="cv-crisis" data-crisis="${c.id}" data-need="${c.need}">
                <div class="cv-crisis-h">${c.icon} ${c.label}</div>
                <div class="cv-crisis-slot">? ลากของใส่</div>
              </div>`).join('')}
          </div>
          <div class="cv-pool" id="p4Pool">
            ${SPINOFF_POOL.map(s => `
              <div class="cv-spin" draggable="true" data-id="${s.id}">
                ${s.name}
              </div>`).join('')}
          </div>
          <div class="cv-actions">
            <button class="cv-submit" id="p4Submit">🔓 ส่งโพรบเข้าวอลต์</button>
            <button class="cv-hint" id="p4Hint">💡 คำใบ้ (-2 HP)</button>
          </div>
          <div class="cv-result" id="p4Res"></div>
        </div>
      `;
      if (global.VaultGfx) {
        VaultGfx.npcBubble(teamEl, 'พ่ออารยา', 'heat→แอโรเจล · radiation→เลนส์คาร์บอน · food→freeze-dry · health→ปั๊มหัวใจ' + (hasKey?' · 🧪 ผมเปิดคลังให้แล้ว':''));
      } else {
        teamEl.innerHTML = this._teamCard('พ่ออารยา','ผู้บัญชาการ','heat→แอโรเจล');
      }
      voidEl.innerHTML = '';

      const placed = {};
      stage.querySelectorAll('.cv-spin').forEach(d => {
        d.addEventListener('dragstart', e => e.dataTransfer.setData('text', d.dataset.id));
      });
      stage.querySelectorAll('.cv-crisis').forEach(c => {
        c.addEventListener('dragover', e => e.preventDefault());
        c.addEventListener('drop', e => {
          e.preventDefault();
          const id = e.dataTransfer.getData('text');
          if (!id) return;
          // remove from previous slot if any
          for (const k in placed) if (placed[k] === id) delete placed[k];
          placed[c.dataset.crisis] = id;
          c.querySelector('.cv-crisis-slot').textContent = SPINOFF_POOL.find(s=>s.id===id).name;
          c.classList.add('filled');
        });
      });
      this._startTimer(hasKey ? 80 : 60, () => this._failPhase(4, 'timeout'));

      stage.querySelector('#p4Hint').onclick = () => {
        this.state.hintsUsed++; this.state.hp -= 2; this._refreshHp();
        document.getElementById('p4Res').innerHTML =
          '<div class="cv-hint-box">💡 ตำรา p98-99: heat→แอโรเจล · rad→เลนส์คาร์บอน · food→freeze-dry · health→ปั๊มหัวใจ</div>';
      };
      stage.querySelector('#p4Submit').onclick = () => {
        const allCorrect = CRISIS_SLOTS.every(c => placed[c.id] === c.need);
        if (allCorrect) {
          const code = CRISIS_SLOTS.map(c => SPINOFF_POOL.find(s => s.id === placed[c.id]).label).join('');
          this.state.outputs.spinoff = { code, picks: placed };
          this._winPhase(4, 'P4 ผ่าน · รหัส spinoff: ' + code);
        } else {
          this._failPhase(4, 'wrong-toolkit');
        }
      };
    },

    /* ===== PHASE 5: Master Composite ===== */
    _phase5(stage, teamEl, voidEl){
      const o = this.state.outputs;
      const keysOwned = (this.state.keys || []).length;
      const lockedSlots = Math.max(0, 4 - keysOwned);  // 0 if all 4 · 1 if 3 keys · etc.
      const bdHTML = global.VaultGfx ? VaultGfx.renderBackdrop(5) : '';
      const enoughKeys = keysOwned >= 3;
      // NPC suggested answers (some may be CORRUPTED by VOID)
      const correct = {
        s1: o.band ? o.band.name : '?',
        s2: o.orbit ? o.orbit.tier : '?',
        s3: o.orbit ? o.orbit.v.toFixed(1) : '?',
        s4: 'คาร์บอน + แอโรเจล',
        s5: o.spinoff ? o.spinoff.code : '????',
        s6: '🔓'
      };
      // Pick 2 random slots to corrupt
      const slotIds = ['s1','s2','s3','s4','s5','s6'];
      const corruptedSet = new Set();
      while (corruptedSet.size < 2) corruptedSet.add(slotIds[Math.floor(Math.random()*slotIds.length)]);
      const npcAnswers = {};
      const corruptDecoys = {
        s1: BANDS.find(b => b.id !== (o.band&&o.band.id)).name,
        s2: ORBITS.find(or => or.id !== (o.orbit&&o.orbit.tier)).id,
        s3: '11.2',
        s4: 'อะลูมิเนียม',
        s5: o.spinoff ? o.spinoff.code.split('').reverse().join('') : 'XXXX',
        s6: '🔒'
      };
      slotIds.forEach(id => {
        if (corruptedSet.has(id)) npcAnswers[id] = corruptDecoys[id];
        else npcAnswers[id] = correct[id];
      });

      // randomly pick which slots are locked due to missing keys
      const allSlotIds = ['s1','s2','s3','s4','s5','s6'];
      const shuffled = [...allSlotIds].sort(()=> Math.random() - .5);
      const lockedIds = new Set(shuffled.slice(0, lockedSlots));

      stage.innerHTML = `
        ${bdHTML}
        <div class="cv-card cv-card-final">
          <div class="cv-h">PHASE 5 · 🔓 รวมรหัสมาสเตอร์ <span class="cv-keypip">${keysOwned}/4 Keys</span></div>
          ${!enoughKeys ? '<div class="cv-banner cv-banner-bad">⚠ ต้องมีอย่างน้อย <b>3 keys</b> · เธอมี ' + keysOwned + ' · บางช่องจะ lock ถาวร · ปุ่มเปิดถูกปิด</div>' : ''}
          <div class="cv-howto">
            <b>📋 วิธีเล่น</b>
            <ol>
              <li>มี <b>6 ช่องคำตอบ</b> (1·คลื่น · 2·orbit · 3·v · 4·วัสดุ · 5·spinoff · 6·สถานะ)</li>
              <li>ทีมเสนอคำตอบไว้ในแต่ละช่อง · แต่ <b style="color:#ff6a6a;">VOID corrupt 2 ช่อง</b> ที่ <em>เธอไม่รู้ว่าช่องไหน</em></li>
              <li><b>เทียบกับคำตอบที่ได้จาก Phase 1-4</b> ว่าตรงไหม · ถ้าผิด → <b>แก้ในช่อง</b> + กดปุ่ม ⚠ flag</li>
              <li>กด <b>เปิด Vault</b> · ทุกช่องต้องตรง correct = ผ่าน · ผิด = -3 HP รีเซ็ตเฟส</li>
              ${lockedSlots>0?'<li>⚠ <b>'+lockedSlots+' ช่องโดน lock</b> เพราะขาด key · ตอบไม่ได้</li>':''}
            </ol>
            <div class="cv-example">💡 ตัวอย่าง corrupt: ช่อง 3 (v) เขียน "11.2" ทั้งที่ Phase 2 หาได้ "5.0" → แก้เป็น "5.0" + flag ⚠</div>
          </div>
          <div class="cv-master" id="p5Master">
            ${slotIds.map(id => {
              const locked = lockedIds.has(id);
              return `<div class="cv-mslot ${locked?'cv-mslot-locked':''}" data-slot="${id}" data-correct="${correct[id]}" data-suggested="${npcAnswers[id]}">
                <div class="cv-mslot-label">${({s1:'1·คลื่น',s2:'2·orbit',s3:'3·v',s4:'4·วัสดุ',s5:'5·spinoff',s6:'6·สถานะ'})[id]}${locked?' · 🔒':''}</div>
                <input class="cv-mslot-val" value="${locked?'???':npcAnswers[id]}" ${locked?'disabled':''}/>
                <button class="cv-mslot-flag" title="ตั้งสถานะถูก/ผิด" ${locked?'disabled':''}>⚠</button>
              </div>`;
            }).join('')}
          </div>
          <div class="cv-actions">
            <button class="cv-submit" id="p5Submit" ${!enoughKeys?'disabled':''}>🔓 เปิด Vault</button>
            <button class="cv-hint" id="p5Hint">💡 คำใบ้ (-2 HP)</button>
          </div>
          <div class="cv-result" id="p5Res"></div>
        </div>
      `;
      teamEl.innerHTML = `
        ${this._teamCard('เคน','คลื่น','ผม mlดูช่อง 1...')}
        ${this._teamCard('อารยา','orbit','ตรวจช่อง 2 และ 3 ได้')}
        ${this._teamCard('โบลท์','rocket','ผมตรวจช่อง 4')}
        ${this._teamCard('พ่ออารยา','spinoff','ตรวจช่อง 5')}
      `;
      voidEl.innerHTML = '<i>👹 VOID:</i> "นี่คือบทสุดท้าย · เธอเชื่อทีมตัวเองมากแค่ไหน?"';

      this._startTimer(120, () => this._failPhase(5, 'timeout'));

      // each slot: click flag to toggle "I think this is wrong"
      stage.querySelectorAll('.cv-mslot-flag').forEach(b => b.onclick = () => {
        b.classList.toggle('flagged');
      });

      stage.querySelector('#p5Hint').onclick = () => {
        this.state.hintsUsed++; this.state.hp -= 2; this._refreshHp();
        // reveal one corrupted slot
        const oneId = [...corruptedSet][0];
        document.getElementById('p5Res').innerHTML =
          '<div class="cv-hint-box">💡 ช่อง ' + oneId + ' โดน corrupt · คำตอบที่ถูกคือ: <b>' + correct[oneId] + '</b></div>';
      };
      stage.querySelector('#p5Submit').onclick = () => {
        // count how many corrupt slots player flagged or fixed (skip locked)
        let caught = 0;
        const finalVals = {};
        stage.querySelectorAll('.cv-mslot').forEach(s => {
          const id = s.dataset.slot;
          if (lockedIds.has(id)) { finalVals[id] = '__locked__'; return; }
          const finalVal = s.querySelector('.cv-mslot-val').value.trim();
          finalVals[id] = finalVal;
          const wasCorrupt = corruptedSet.has(id);
          const fixed = wasCorrupt && finalVal === s.dataset.correct;
          const flagged = s.querySelector('.cv-mslot-flag').classList.contains('flagged');
          if (wasCorrupt && (fixed || flagged)) caught++;
        });
        // unlocked slots must all match correct values
        const unlockedRight = slotIds.filter(id => !lockedIds.has(id))
          .every(id => finalVals[id] === correct[id]);
        this.state.corruptionsCaught = caught;
        this.state.lockedSlots = lockedSlots;
        if (unlockedRight && lockedSlots === 0) {
          this._winPhase(5, '🎉 Vault เปิดเต็ม · ดาวเทียม 12 ดวงตื่น 100% · caught ' + caught + '/2');
          setTimeout(() => this._finish(), 1500);
        } else if (unlockedRight && lockedSlots > 0) {
          this._winPhase(5, '🎉 Vault เปิดบางส่วน · ' + lockedSlots + ' slot ยังถูกล็อก · caught ' + caught + '/2');
          setTimeout(() => this._finish(), 1500);
        } else {
          this._failPhase(5, 'master-mismatch · -3 HP');
          this.state.hp -= 3;
          this._refreshHp();
        }
      };
    },

    /* ===== Helpers ===== */
    _teamCard(name, role, note){
      const e = ({เคน:'🧑‍💻',อารยา:'👩‍🚀',โบลท์:'👦','พ่ออารยา':'👨‍✈️'})[name] || '🗣️';
      return `<div class="cv-npc">
        <div class="cv-npc-avatar">${e}</div>
        <div class="cv-npc-body">
          <div class="cv-npc-name">${name} <span>· ${role}</span></div>
          <div class="cv-npc-line">${note}</div>
        </div>
      </div>`;
    },
    _startTimer(seconds, onTimeout){
      this._stopTimer();
      let remaining = seconds;
      const lbl = document.getElementById('cvTimer');
      if (lbl) lbl.textContent = remaining;
      this._timerId = setInterval(() => {
        remaining--;
        if (lbl) lbl.textContent = remaining;
        if (remaining <= 0) { this._stopTimer(); if (onTimeout) onTimeout(); }
      }, 1000);
    },
    _stopTimer(){ if (this._timerId) { clearInterval(this._timerId); this._timerId=null; } },
    _refreshHp(){
      const el = document.getElementById('cvHp');
      if (el) el.textContent = Math.max(0, this.state.hp);
      if (global.HUD) HUD.setHP(Math.max(0, this.state.hp), this.state.hpMax);
      if (this.state.hp <= 0) this._finish();
    },
    _winPhase(n, msg){
      this._stopTimer();
      document.getElementById('cvStage').insertAdjacentHTML('beforeend',
        '<div class="cv-banner cv-banner-good">✓ ' + msg + '</div>');
      if (global.VaultGfx) {
        VaultGfx.flash('good');
        VaultGfx.crystal(n);
      }
      if (global.KPA) {
        KPA.problem('cipher-p'+n, 1, 'success', { msg });
        KPA.addCoin(15, 'cipher-phase-' + n);
        KPA.competency('C2', { evidence:'cipher-phase-' + n });
      }
      if (n < 5) setTimeout(() => this._enterPhase(n+1), 1400);
      else if (n === 5 && global.VaultGfx) {
        VaultGfx.crystalsMerge();
      }
    },
    _failPhase(n, reason){
      this._stopTimer();
      // ขาด key = damage 2 (ยากขึ้น), มี key = damage 1
      const dmg = this._hasKeyFor(n) ? 1 : 2;
      this.state.hp -= dmg;
      this._refreshHp();
      document.getElementById('cvStage').insertAdjacentHTML('beforeend',
        '<div class="cv-banner cv-banner-bad">× ' + reason + ' · -' + dmg + ' HP · กำลังลองใหม่...</div>');
      if (global.VaultGfx) VaultGfx.flash('bad');
      if (global.KPA) {
        KPA.problem('cipher-p'+n, 1, 'fail', { reason, hasKey:this._hasKeyFor(n) });
        KPA.spendEnergy(1, 'cipher-fail-p'+n);
      }
      if (this.state.hp > 0) setTimeout(() => this._enterPhase(n), 1400);
    },
    _finish(){
      this._stopTimer();
      const s = this.state;
      const dur = Date.now() - s.startedAt;
      const keysOwned = (s.keys || []).length;
      let ending = 'C';
      if (keysOwned === 4 && s.hp >= 12 && s.hintsUsed === 0 && s.corruptionsCaught === 2) ending = 'A+';
      else if (keysOwned === 4 && s.hp >= 8) ending = 'A';
      else if (keysOwned >= 3 && s.hp >= 1 && s.outputs.spinoff) ending = 'B';
      this.state.ending = ending;

      const root = document.getElementById('cvStage').parentNode;
      const endingMeta = {
        'A+': { color:'#ffd84a', label:'A+ · MASTER CIPHER',
                story:'ดาวเทียม 12 ตื่น 100% · พบ message ลับของพ่อโบลท์ใน vault · "ลูก · ตัวจริงรอเธอที่ t=0"' },
        'A':  { color:'#9be7c4', label:'A · CIPHER ENGINEER',
                story:'ดาวเทียมตื่น 100% · มี blueprint warp drive ปรากฏ' },
        'B':  { color:'#7ad6ff', label:'B · APPRENTICE',
                story:'ดาวเทียมตื่น 80% · ระบบบางส่วนยังเสีย · พอเปิด warp ได้' },
        'C':  { color:'#ff6a6a', label:'C · VAULT LOCKED',
                story:'HP หมด · ระบบให้ลองใหม่ · VOID หัวเราะ' }
      };
      const m = endingMeta[ending];
      root.innerHTML = `
        <div class="cv-end">
          <h1 style="color:${m.color};">${m.label}</h1>
          <p class="cv-end-story">${m.story}</p>
          <div class="cv-end-stats">
            <div>⏱️ ${(dur/1000/60).toFixed(1)} นาที</div>
            <div>❤️ HP เหลือ ${Math.max(0,s.hp)}/${s.hpMax}</div>
            <div>💡 hint ใช้ ${s.hintsUsed}</div>
            <div>🕵️ จับ corrupt ${s.corruptionsCaught}/2</div>
          </div>
          <a href="p27-journal.html" class="cv-end-next">→ ไปต่อ Journal</a>
        </div>
      `;
      if (global.KPA) {
        KPA.research('cipherEnd', { ending, dur, hp:s.hp, hints:s.hintsUsed, caught:s.corruptionsCaught });
        KPA.vpa(2, { kind:'boss-cipher', summary:ending });
        if (ending === 'A+') KPA.addCoin(50, 'cipher-A+');
        else if (ending === 'A') KPA.addCoin(30, 'cipher-A');
        else if (ending === 'B') KPA.addCoin(15, 'cipher-B');
      }
      if (this.state.opts && typeof this.state.opts.onComplete === 'function') {
        this.state.opts.onComplete({ ending, hp:s.hp });
      }
    }
  };

  function _css(){
    if (document.getElementById('cipher-vault-css')) return;
    const s = document.createElement('style');
    s.id = 'cipher-vault-css';
    s.textContent = `
      .cv-wrap{max-width:840px;margin:0 auto;padding:14px;color:#cfe;}
      .cv-hud{display:flex;justify-content:space-between;align-items:center;
        background:linear-gradient(90deg,#2a0a1a,#1a0808);
        border:2px solid #ff6a6a;border-radius:12px;padding:10px 14px;}
      .cv-title{font:800 16px system-ui;color:#ff8a3d;letter-spacing:.08em;}
      .cv-stats{display:flex;gap:10px;}
      .cv-stat{background:#11182a;padding:4px 10px;border-radius:8px;
        border:1px solid #2a3a55;font-size:13px;}

      .cv-phase-bar{display:flex;flex-wrap:wrap;gap:4px;margin:10px 0;}
      .cv-step{padding:4px 10px;border-radius:6px;font-size:11px;font-weight:700;
        background:#11182a;color:#7a8aa8;border:1px solid #2a3a55;}
      .cv-step.cur{background:#ff8a3d;color:#1a0e00;border-color:#ff8a3d;
        box-shadow:0 0 12px rgba(255,138,61,.4);}
      .cv-step.done{background:rgba(155,231,196,.12);color:#9be7c4;border-color:#9be7c4;}

      .cv-card{background:linear-gradient(180deg,#0e1424,#0a0e1c);
        border:1px solid #4a90e2;border-radius:14px;padding:16px;margin:10px 0;
        box-shadow:0 0 30px rgba(74,144,226,.15);}
      .cv-card-final{border-color:#ff8a3d;
        box-shadow:0 0 40px rgba(255,138,61,.25);}
      .cv-howto{background:linear-gradient(135deg,#163050,#0e1f3a);
        border:2px solid #7ad6ff;border-left:6px solid #00d4ff;
        border-radius:10px;padding:14px 18px;margin:12px 0;font-size:15px;
        box-shadow:0 0 24px rgba(0,212,255,.18), inset 0 1px 0 rgba(255,255,255,.05);}
      .cv-howto > b{color:#00d4ff;font-size:14px;letter-spacing:.12em;display:block;margin-bottom:10px;
        text-transform:uppercase;text-shadow:0 0 8px rgba(0,212,255,.5);}
      .cv-howto ol{margin:8px 0 8px 22px;padding:0;color:#fff;line-height:1.8;}
      .cv-howto ol li{margin:6px 0;font-size:15px;color:#e3ecf8;}
      .cv-howto ol li b{color:#ffd84a;font-weight:700;}
      .cv-howto ul{margin:6px 0 6px 6px;padding-left:18px;color:#9be7c4;}
      .cv-example{margin-top:12px;padding:10px 14px;background:rgba(255,216,74,.18);
        border:1px solid rgba(255,216,74,.5);border-left:4px solid #ffd84a;
        border-radius:6px;font-size:14px;color:#ffe89e;font-weight:500;}
      .cv-example b{color:#fff;background:rgba(255,138,61,.3);padding:1px 6px;border-radius:4px;}
      .cv-keypip{display:inline-block;background:rgba(155,231,196,.15);
        color:#9be7c4;border:1px solid #9be7c4;padding:2px 8px;border-radius:999px;
        font-size:11px;font-weight:700;margin-left:8px;}
      .cv-keypip-off{background:rgba(255,106,106,.15);color:#ff6a6a;border-color:#ff6a6a;}
      .cv-tel-hint{box-shadow:inset 0 0 0 2px #9be7c4, 0 0 14px rgba(155,231,196,.4) !important;}
      .cv-mslot-locked{opacity:.5;background:rgba(255,106,106,.08) !important;
        border-color:#ff6a6a !important;}
      .cv-mslot-locked input{background:#1a0808 !important;color:#ff6a6a !important;}
      .cv-h{font:800 16px system-ui;color:#00d4ff;margin-bottom:8px;letter-spacing:.06em;}

      .cv-tels{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px;margin:10px 0;}
      .cv-tel{background:#11182a;border:1px solid #2a3a55;border-radius:8px;
        padding:8px;cursor:pointer;display:flex;flex-direction:column;align-items:center;
        gap:2px;color:#cfe;font:600 13px system-ui;}
      .cv-tel:hover{border-color:#7ad6ff;}
      .cv-tel.on{background:#0e2a3a;border-color:#00d4ff;
        box-shadow:0 0 14px rgba(0,212,255,.4);}
      .cv-tel-band{font-size:10px;color:#7a8aa8;}
      .cv-tel.on .cv-tel-band{color:#00d4ff;}

      .cv-orbit-row{display:flex;gap:8px;margin:10px 0;}
      .cv-orbit-btn{flex:1;background:#11182a;border:1px solid #2a3a55;border-radius:8px;
        padding:10px;cursor:pointer;display:flex;flex-direction:column;align-items:center;
        gap:2px;color:#cfe;font-weight:700;}
      .cv-orbit-btn.on{background:#0e2a3a;border-color:#00d4ff;color:#00d4ff;}
      .cv-orbit-name{font-size:18px;font-weight:800;}
      .cv-orbit-alt{font-size:11px;color:#7a8aa8;}

      .cv-vctrl{display:flex;align-items:center;gap:10px;margin:10px 0;
        background:#0a1226;padding:10px;border-radius:8px;}
      .cv-vctrl input{flex:1;}
      .cv-vctrl b{color:#00d4ff;font-size:18px;}

      .cv-rocket{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0;}
      .cv-slot{background:#11182a;border:1px solid #2a3a55;border-radius:8px;padding:10px;}
      .cv-slot-h{font-size:11px;color:#ff8a3d;font-weight:700;letter-spacing:.1em;display:block;margin-bottom:4px;}
      .cv-slot select, .cv-slot input{width:100%;background:#0a1226;color:#cfe;
        border:1px solid #2a3a55;border-radius:6px;padding:6px;font:14px system-ui;}

      .cv-crisis-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px;margin:10px 0;}
      .cv-crisis{background:#11182a;border:2px dashed #2a3a55;border-radius:8px;padding:10px;
        min-height:80px;display:flex;flex-direction:column;align-items:center;text-align:center;}
      .cv-crisis.filled{border-style:solid;border-color:#ff8a3d;}
      .cv-crisis-h{font-size:13px;color:#ff8a3d;font-weight:700;margin-bottom:6px;}
      .cv-crisis-slot{font-size:13px;color:#cfe;}

      .cv-pool{display:flex;flex-wrap:wrap;gap:6px;background:#0a1226;
        border:1px dashed #2a3a55;border-radius:8px;padding:10px;margin:10px 0;}
      .cv-spin{background:#ff8a3d;color:#1a0e00;padding:8px 12px;border-radius:8px;
        cursor:grab;font-weight:700;font-size:13px;user-select:none;}

      .cv-master{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:14px 0;}
      .cv-mslot{background:#11182a;border:1px solid #2a3a55;border-radius:8px;padding:8px;}
      .cv-mslot-label{font-size:11px;color:#ff8a3d;font-weight:700;letter-spacing:.1em;}
      .cv-mslot-val{width:calc(100% - 36px);background:#0a1226;color:#cfe;
        border:1px solid #2a3a55;border-radius:6px;padding:6px;font:14px system-ui;
        margin-top:4px;}
      .cv-mslot-flag{width:28px;height:28px;background:#0a1226;border:1px solid #2a3a55;
        border-radius:6px;color:#cfe;cursor:pointer;font-weight:700;margin-left:4px;
        vertical-align:middle;}
      .cv-mslot-flag.flagged{background:#ff6a6a;color:#fff;border-color:#ff6a6a;}

      .cv-actions{display:flex;gap:8px;margin-top:10px;}
      .cv-submit{flex:1;background:#ff8a3d;color:#1a0e00;border:none;border-radius:10px;
        padding:12px;font:800 16px system-ui;cursor:pointer;}
      .cv-submit:hover{background:#ffa55d;}
      .cv-hint{background:transparent;color:#cfe;border:1px solid #2a3a55;
        border-radius:10px;padding:12px 16px;font-weight:600;cursor:pointer;}
      .cv-hint:hover{border-color:#7ad6ff;color:#7ad6ff;}

      .cv-result{margin-top:8px;}
      .cv-hint-box{background:rgba(122,214,255,.12);border:1px solid #7ad6ff;
        padding:8px 12px;border-radius:8px;font-size:13px;color:#7ad6ff;}

      .cv-team{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:6px;margin:10px 0;}
      .cv-npc{background:#0a1226;border:1px solid #2a3a55;border-radius:8px;padding:8px;
        display:flex;gap:8px;align-items:flex-start;}
      .cv-npc-avatar{font-size:24px;flex:0 0 auto;}
      .cv-npc-name{font:700 12px system-ui;color:#fff;}
      .cv-npc-name span{font-weight:400;color:#7a8aa8;font-size:11px;}
      .cv-npc-line{font-size:12px;color:#9bb;margin-top:2px;}

      .cv-void-line{background:rgba(255,106,106,.08);border-left:3px solid #ff6a6a;
        padding:8px 12px;border-radius:6px;font-size:13px;color:#ff9b9b;margin:10px 0;}
      .cv-void-line i{color:#ff6a6a;font-style:normal;font-weight:700;margin-right:4px;}
      .cv-corrupt{background:rgba(255,106,106,.2);padding:1px 6px;border-radius:6px;font-size:11px;
        color:#ff6a6a;margin-left:4px;}

      .cv-banner{padding:10px 14px;border-radius:8px;font-weight:700;margin-top:10px;}
      .cv-banner-good{background:rgba(155,231,196,.15);color:#9be7c4;border:1px solid #9be7c4;}
      .cv-banner-bad{background:rgba(255,106,106,.15);color:#ff6a6a;border:1px solid #ff6a6a;}

      .cv-end{text-align:center;padding:30px;background:#0e1424;
        border:1px solid #ff8a3d;border-radius:14px;margin:20px auto;max-width:600px;}
      .cv-end h1{font-size:36px;margin:0 0 12px;}
      .cv-end-story{font-size:16px;color:#cfe;line-height:1.6;}
      .cv-end-stats{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin:18px 0;
        font-size:13px;color:#7ad6ff;}
      .cv-end-stats > div{background:#11182a;padding:6px 12px;border-radius:8px;border:1px solid #2a3a55;}
      .cv-end-next{display:inline-block;background:#ff8a3d;color:#1a0e00;padding:12px 24px;
        border-radius:10px;text-decoration:none;font-weight:800;}
      @media(max-width:600px){
        .cv-master{grid-template-columns:1fr 1fr;}
        .cv-rocket{grid-template-columns:1fr;}
        .cv-stats{flex-wrap:wrap;}
      }
    `;
    document.head.appendChild(s);
  }
  document.addEventListener('DOMContentLoaded', _css);
  // also inject css at start() in case of late load
  const _origStart = Vault.start.bind(Vault);
  Vault.start = function(o){ _css(); return _origStart(o); };

  global.CipherVault = Vault;
})(window);
