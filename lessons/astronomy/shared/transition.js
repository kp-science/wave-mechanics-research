/* ==================== COSMOS LOG · Transition Module ==================== */
/* Cinematic overlay between pages · narrative bridges
 * Usage:
 *   <script src="../shared/transition.js"></script>
 *   Transition.wireNext(nextButton, 'p05-to-p06', 'p06-magnitude.html');
 *   // OR
 *   Transition.play('p05-to-p06', () => location.href = 'p06.html');
 */
(function (global) {
  'use strict';

  // ==================== TRANSITION CONFIG ====================
  // ใส่ scenes ทั้งหมดที่นี่ · เพิ่ม/แก้ได้โดยไม่ต้องแตะ player
  const TRANSITIONS = {

    /* P02 → P03 · Hail Received · ARYA decoded · ship computer requests password */
    'p02-to-p03': {
      scenes: [
        { kind:'terminal', lines: [
          '> SIGNAL DECODE COMPLETE',
          '> identifier: A R Y A',
          '> CROSS-CHECK SHIP ROSTER...',
          '> [MATCH] · CAPT. ARYA · CONFIRMED',
          '',
          '⚠ MAIN COMPUTER LOCK · PASSWORD REQUIRED',
        ], typing:true },
        { kind:'text',
          body: 'ระบบยานล็อกอยู่ · ต้องใส่ password เพื่อเข้า navigation<br>ไม่งั้น เราตามหาดาว SOS ไม่ได้',
          accent:'#ffcb6b',
        },
      ],
    },

    /* P04 → P05 · Mission Briefing · why we need parallax */
    'p04-to-p05': {
      scenes: [
        { kind:'briefing',
          title: '📡 MISSION BRIEFING',
          subtitle: 'PARALLAX LAB · ระบุดาว SOS',
          body: '<b>ปัญหา</b>: ดาว SOS อยู่ที่ไหน · catalog เสียหาย · มี 3 candidate<br><br>' +
                '<b>ทางออก</b>: ใช้ <b>parallax</b> วัด d ของแต่ละดวง · ดวงที่<b>ไกลสุด</b> = SOS<br>' +
                '(เพราะแสง SOS ส่งมาจากระยะไกลมาก · เลยมาช้า)',
          mission: ['Sirius', 'Proxima', 'STAR X (ไม่รู้ระยะ)'],
        },
      ],
    },

    /* P05 → P06 · DATA TERMINAL · 1300 ปีแสง shock */
    'p05-to-p06': {
      scenes: [
        { kind:'terminal', lines:[
          '> COMPUTING DISTANCE...',
          '> d = 1 / p',
          '> d = 1 / 0.0025"',
          '> d = 400 parsec',
          '',
          '> CONVERTING TO LIGHT-YEARS...',
          '> 1 pc ≈ 3.26 ly',
          '> d ≈ 1,304 LIGHT YEARS',
        ], typing:true, sound:'beep' },
        { kind:'text',
          icon:'⚠',
          body: 'แสงจากดาวนี้ · เริ่มเดินทางตั้งแต่ <b>ปี ค.ศ. 720</b><br>' +
                '... ก่อนที่อาณาจักรอยุธยาจะมีอยู่<br><br>' +
                '<i style="color:#ff8fa5;">"สิ่งที่เราเห็น · อาจไม่มีอยู่แล้ว"</i>',
          accent:'#ff5c7a',
        },
      ],
    },

    /* P06 → P07 · Fear · need to know if star alive */
    'p06-to-p07': {
      scenes: [
        { kind:'voice',
          speaker: 'ARYA',
          subtitles: [
            'งั้นพ่อ... ตายไปนานแล้ว?',
            '...',
            'ไม่ใช่ · ดาวบางประเภทอยู่ได้ล้านปี',
            'แต่บางประเภท · ตายภายในแค่ 10 ล้านปี',
            'เราต้องรู้<b>ประเภทของดาว</b>นี้ก่อน',
          ],
          totalMs: 12000,
        },
        { kind:'briefing',
          title: '🔭 NEW OBJECTIVE',
          subtitle: 'หา M (absolute magnitude)',
          body: 'M บอก<b>ปล่อยแสงจริง</b> · ปล่อยแสงเยอะ = ดาวร้อน = อายุสั้น<br>' +
                'ขั้นแรก · เรียน m (apparent · ตาเห็น) ก่อน',
        },
      ],
    },

    /* P09 → P09B · Synthesis time */
    'p09-to-p09b': {
      scenes: [
        { kind:'terminal', lines:[
          '> ALL LAB DATA · COLLECTED',
          '> d_sos = 400 pc       [P05]',
          '> m_sos = +1.25        [P08]',
          '> M_sos = -8.4         [P09]',
          '',
          '⚠ FATHER\'S BOX detected · LOCKED',
          '> requires 3-digit master code',
        ], typing:true },
        { kind:'text',
          body: 'รวม 3 ค่า · ระบุดาว · ปลดล็อกกล่อง<br>' +
                '<i>"พ่อจะรอ · จนกว่าลูกจะเข้าใจครบ 3 มิติ"</i>',
          accent:'#7effb2',
        },
      ],
    },

    /* P09B → P10 · Door Knock · Hubble arrives */
    'p09b-to-p10': {
      scenes: [
        { kind:'cinematic', panels:[
          { icon:'🚪', text:'[KNOCK · KNOCK]' },
          { icon:'🚪', text:'AIRLOCK CONTACT DETECTED · ผู้มาเยือนคนเดียว' },
          { icon:'🎩', text:'Dr.Hubble ปรากฏตัว · "เธอ... ฉันเข้ามาได้ไหม?"' },
          { icon:'📦', text:'"พ่อเธอฝาก<b>กล่องอีกใบ</b>ไว้กับฉัน · ก่อนหายไป"' },
        ]},
      ],
    },

    /* P12 → P13 · Father's Voice (CORE EMOTIONAL BEAT) */
    'p12-to-p13': {
      scenes: [
        { kind:'cinematic', panels:[
          { icon:'📦', text:'[กล่องเปิด · เสียง click]' },
          { icon:'📼', text:'ไฟล์เสียงเก่า · เปิดเองอัตโนมัติ' },
          { icon:'🔊', text:'[เสียง static · ครืนคราน]' },
        ], autoMs:1500 },
        { kind:'voice',
          speaker: 'พ่อ ARAVIND',
          subtitles: [
            'อารยา · ถ้าเปิดกล่องนี้ได้ · แปลว่าฉลาดกว่าพ่อแล้ว',
            'พ่อขอโทษ · ที่ไม่กลับไปหาลูก',
            'ตอนพ่อ ส่งสัญญาณ SOS · พ่อรู้ว่าจะถูกจับ',
            'แต่พ่อสัญญา · พ่อยังอยู่',
            'อยู่ที่ <b>ระยะ 100 pc</b> · ในกลุ่มดาว <b>Cygnus</b>',
            'ทิศตะวันออกของ Deneb',
            '...',
            'supernova ของ SOS จะกลบสัญญาณพ่อภายใน <b>73 วัน</b>',
            'เร่ง · ใช้ <b>triangulation</b> · อย่ายอมแพ้',
            '"ลูกของพ่อ · ฉลาดกว่าพ่อแล้ว · พ่อภูมิใจ"',
          ],
          totalMs: 28000,
          waveform: true,
        },
        { kind:'text',
          body: '🎯 พิกัดบันทึกไว้: <b>d_father = 100 pc</b><br>📍 Cygnus · ตะวันออกของ Deneb<br>⏱ <b>73 วันจนกว่าสัญญาณหาย</b>',
          accent:'#ffd88a',
        },
      ],
    },

    /* P07 → P08 · Apply m · catalog needs sort */
    'p07-to-p08': {
      scenes: [
        { kind:'briefing',
          title: '👁 APPLY MAGNITUDE',
          subtitle: 'จากตำรา → สนามจริง',
          body: 'Dr.Hubble: "ลองเอา <b>m scale</b> ที่เพิ่งเรียน · เรียง 5 ดาวจริง"<br><br>' +
                'ระบบ catalog ของยาน · ต้องการ <b>m</b> ของดาวเหล่านี้ · เพื่อระบุ SOS',
          mission: ['Sirius (m=−1.46)', 'Vega (m=+0.03)', 'Deneb (m=+1.25)', 'Polaris (m=+1.98)', 'ตาเปล่าสุด (m=+6)'],
        },
      ],
    },

    /* P08 → P09 · Insight · m alone isn't enough */
    'p08-to-p09': {
      scenes: [
        { kind:'voice',
          speaker: 'ARYA · คิดในใจ',
          subtitles: [
            'Sirius m = −1.46 · สว่างตาที่สุด',
            'แล้วยังไงต่อ?',
            '...',
            'เดี๋ยว · m บอกแค่ "ที่ตาเห็น"',
            'ไม่ได้บอกว่าดาวจริง ๆ <b>ปล่อยแสง</b>เท่าไหร่',
            'Sirius อาจดูสว่างเพราะ<b>ใกล้</b>เรา',
            'ต้องหา M · absolute magnitude',
          ],
          totalMs: 14000,
        },
        { kind:'briefing',
          title: '⚡ NEW DEPTH · ABSOLUTE MAGNITUDE',
          subtitle: 'M ≠ m',
          body: 'M = ความสว่างที่ดาวจริง ๆ ปล่อย · ไม่ขึ้นกับระยะ<br>' +
                'Dr.Hubble จะสอน <b>distance modulus</b> ในห้องถัดไป',
        },
      ],
    },

    /* P10 → P11 · Box on table · Hubble teaches midpoint */
    'p10-to-p11': {
      scenes: [
        { kind:'cinematic', panels:[
          { icon:'📦', text:'Dr.Hubble วางกล่องของพ่อบนโต๊ะ · "ก่อนเปิด · ลูกต้องเข้าใจสามอย่างพร้อมกัน"' },
          { icon:'🎩', text:'Hubble จับ chalk · "ขอเวลา 5 นาที · บทเรียนที่สำคัญสุดในชีวิตเธอ"' },
        ], autoMs:1300 },
      ],
    },

    /* P11 → P12 · Hubble departs · time to crack box */
    'p11-to-p12': {
      scenes: [
        { kind:'cinematic', panels:[
          { icon:'🎩', text:'Dr.Hubble วาง chalk · ก้าวออก · "พ่อเธอรอ · เปิดกล่องด้วยใจ ไม่ใช่สมอง"' },
          { icon:'📦', text:'กล่องตรงหน้า · 5 ตัวอักษรล็อก · "ดาวหรี่ตา · แต่สว่างจริง"' },
        ], autoMs:1500 },
        { kind:'text',
          icon:'🔑',
          body: 'รหัสคือชื่อดาว · ดาวที่<b>หลอกตา</b>คนทั้งโลก<br>' +
                'ใช้บันทึกพ่อ · 5 หน้า · เพื่อระบุ',
          accent:'#ffcb6b',
        },
      ],
    },

    /* P13 → P14 · Father's voice ends · need triangulation */
    'p13-to-p14': {
      scenes: [
        { kind:'terminal', lines:[
          '> AUDIO LOG · ENDED',
          '> father location: 100 pc',
          '> SOS star: 400 pc',
          '> distance between: ~ 380 pc',
          '',
          '⚠ SUPERNOVA in 73 days',
          '⚠ need: triangulation method',
        ], typing:true },
        { kind:'briefing',
          title: '📐 TRIANGULATION',
          subtitle: 'รวม 3 เครื่องมือ · หาพ่อ',
          body: 'ใช้ <b>d_sos = 400 pc</b> + <b>d_father = 100 pc</b> + <b>M</b> ของดาวอ้างอิง<br>' +
                'หาเส้นทางหนี + พิกัดพ่อแม่นยำ',
        },
      ],
    },

    /* P14 → P15 · Final escape · WARP RUN */
    'p14-to-p15': {
      scenes: [
        { kind:'terminal', lines:[
          '⚠ VOIDHUNTER · CLOSING',
          '⚠ supernova countdown: 0 ชั่วโมง',
          '> escape window: 7 NOW',
          '',
          '> ENGAGE STELLAR HEIST',
          '> 3 vault · time-pressured',
        ], typing:true },
        { kind:'text',
          icon:'🔥',
          body: 'ครูฝึกจบแล้ว · ตอนนี้ <b>ของจริง</b><br>' +
                '<i>"ทำได้แค่ครั้งเดียว · ผ่านได้ = พ่อรู้ว่าเรามา"</i>',
          accent:'#ff5c7a',
        },
      ],
    },

    /* P16 → P17 · Recap done · gear up */
    'p16-to-p17': {
      scenes: [
        { kind:'briefing',
          title: '🛍 HUBBLE TRADING POST',
          subtitle: 'ใช้เหรียญที่เก็บ · ซื้ออุปกรณ์',
          body: 'จะสู้ VOIDHUNTER ตัวจริง · ต้องมี item ติดตัว<br>' +
                '🛡 Shield · ⏱ Chronos · 🔭 Scope · 🌑 Cloak<br>' +
                'เลือกตามสไตล์ · ของบางอย่าง<b>ปลด ending A+</b>',
        },
      ],
    },

    /* P15 → P16 · After the Heist · 4 panels */
    'p15-to-p16': {
      scenes: [
        { kind:'cinematic', panels:[
          { icon:'🚀', text:'ยานพุ่งผ่าน wormhole · พ้นเขต VOID' },
          { icon:'👁️', text:'VOIDHUNTER ห่างออก · meter จาก 90% → 25%' },
          { icon:'💌', text:'beacon signal ส่งถึงโลก · พ่ออาจได้รับ' },
          { icon:'📜', text:'1,304 ปีต่อจากนี้ · ลูกของอารยาจะรู้ว่า · พ่อยังหายใจอยู่' },
        ]},
      ],
    },

    /* P18 → P19 · Mission complete · reflection */
    'p18-to-p19': {
      scenes: [
        { kind:'cinematic', panels:[
          { icon:'💌', text:'Beacon ส่งสำเร็จ · พุ่งออกจากระบบ Cygnus' },
          { icon:'🌟', text:'1,304 ปี · พ่อจะได้รับ · หรือลูกของพ่อในอนาคต' },
          { icon:'🛰', text:'ยานชะลอ · VOIDHUNTER ห่างหายไปในความมืด' },
          { icon:'📜', text:'กลับมาดูสิ่งที่เรียนรู้ · เปลี่ยนความเข้าใจไหม?' },
        ]},
        { kind:'text',
          icon:'✨',
          body: 'ภารกิจสำเร็จ · ทำ <b>post-test</b> · เทียบกับ pre-test เริ่มต้น<br>' +
                '<i>ดูว่าเด็กสาวที่เคาะมอร์ส "ARYA" ในต้นเรื่อง · เปลี่ยนไปแล้วเท่าไหร่</i>',
          accent:'#7effb2',
        },
      ],
    },

    /* P17 → P18 · Pre-Fight · last items */
    'p17-to-p18': {
      scenes: [
        { kind:'terminal', lines:[
          '> SHOP CLOSED · BRIDGE SEALED',
          '> VOIDHUNTER DETECTED · INCOMING',
          '> intercept window: 60 SECONDS',
          '',
          '> RUNNING ITEM CHECK...',
          '> 🛡️ SHIELD: ARMED',
          '> ⏱️ CHRONOS: READY',
          '> 🔭 SCOPE: LOCKED',
          '',
          '⚠ ENTERING WARP RUN · FINAL APPROACH',
        ], typing:true, sound:'alarm' },
        { kind:'text',
          body: 'นี่คือเสี้ยว <b>วาร์ปสุดท้าย</b><br>ผ่านได้ = beacon ส่งถึงพ่อ · supernova mask · ทุกอย่างคุ้ม',
          accent:'#ff5c7a',
        },
      ],
    },
  };

  // ==================== PLAYER ====================
  const Transition = {
    play(key, onComplete) {
      const cfg = TRANSITIONS[key];
      if (!cfg) {
        console.warn('Transition: unknown key', key);
        if (onComplete) onComplete();
        return;
      }
      this._open(cfg, onComplete);
    },

    wireNext(buttonEl, key, targetHref) {
      if (!buttonEl) return;
      // Replace click handler · play transition then navigate
      buttonEl.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.play(key, () => {
          window.location.href = targetHref;
        });
      };
    },

    _open(cfg, onComplete) {
      // Remove any existing transition overlay
      document.querySelectorAll('.tx-overlay').forEach(el => el.remove());

      const overlay = document.createElement('div');
      overlay.className = 'tx-overlay';
      overlay.innerHTML = `
        <div class="tx-frame">
          <div class="tx-stage" id="txStage"></div>
          <div class="tx-controls">
            <button class="tx-skip" id="txSkip">⏭ ข้าม</button>
            <button class="tx-next" id="txNext">▶ ต่อ</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      const state = { sceneIdx: 0, scenes: cfg.scenes, finishedAuto: false };
      const stageEl = overlay.querySelector('#txStage');
      const nextBtn = overlay.querySelector('#txNext');
      const skipBtn = overlay.querySelector('#txSkip');

      function close() {
        overlay.style.opacity = 0;
        setTimeout(() => {
          overlay.remove();
          if (onComplete) onComplete();
        }, 300);
      }

      function showScene(i) {
        const scene = state.scenes[i];
        if (!scene) { close(); return; }
        stageEl.innerHTML = '';
        nextBtn.disabled = false;
        nextBtn.textContent = (i === state.scenes.length - 1) ? '▶ จบ · ต่อไป' : '▶ ต่อ';
        if (scene.kind === 'terminal') renderTerminal(stageEl, scene, () => { nextBtn.disabled = false; });
        else if (scene.kind === 'text') renderText(stageEl, scene);
        else if (scene.kind === 'cinematic') renderCinematic(stageEl, scene, () => { nextBtn.disabled = false; });
        else if (scene.kind === 'voice') renderVoice(stageEl, scene, () => { nextBtn.disabled = false; });
        else if (scene.kind === 'briefing') renderBriefing(stageEl, scene);
      }

      nextBtn.onclick = () => {
        state.sceneIdx++;
        if (state.sceneIdx >= state.scenes.length) close();
        else showScene(state.sceneIdx);
      };
      skipBtn.onclick = close;

      // Initial
      requestAnimationFrame(() => overlay.classList.add('open'));
      showScene(0);
    },
  };

  // ==================== SCENE RENDERERS ====================
  function renderTerminal(el, scene, onTypingDone) {
    el.innerHTML = `
      <div class="tx-terminal">
        <div class="tx-terminal-head">📡 SHIP COMPUTER · LOG</div>
        <div class="tx-terminal-body" id="txTerm"></div>
      </div>
    `;
    const body = el.querySelector('#txTerm');
    if (!scene.typing) {
      body.innerHTML = scene.lines.map(l => '<div class="tx-line">' + l + '</div>').join('');
      onTypingDone && onTypingDone();
      return;
    }
    let i = 0;
    function typeLine() {
      if (i >= scene.lines.length) { onTypingDone && onTypingDone(); return; }
      const div = document.createElement('div');
      div.className = 'tx-line';
      div.innerHTML = scene.lines[i];
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
      i++;
      setTimeout(typeLine, 220);
    }
    typeLine();
  }

  function renderText(el, scene) {
    el.innerHTML = `
      <div class="tx-text-card" style="${scene.accent ? 'border-color:' + scene.accent + ';' : ''}">
        ${scene.icon ? '<div class="tx-icon">' + scene.icon + '</div>' : ''}
        <div class="tx-text-body" style="${scene.accent ? 'color:' + scene.accent + ';' : ''}">${scene.body}</div>
      </div>
    `;
  }

  function renderCinematic(el, scene, onAllDone) {
    el.innerHTML = `<div class="tx-cinematic" id="txCine"></div>`;
    const cineEl = el.querySelector('#txCine');
    let pi = 0;
    function nextPanel() {
      if (pi >= scene.panels.length) { onAllDone && onAllDone(); return; }
      const p = scene.panels[pi];
      const panel = document.createElement('div');
      panel.className = 'tx-panel';
      panel.innerHTML = `
        <div class="tx-panel-icon">${p.icon}</div>
        <div class="tx-panel-text">${p.text}</div>
      `;
      cineEl.appendChild(panel);
      pi++;
      setTimeout(nextPanel, scene.autoMs || 1100);
    }
    nextPanel();
  }

  function renderVoice(el, scene, onComplete) {
    el.innerHTML = `
      <div class="tx-voice">
        <div class="tx-voice-speaker">🎙 ${scene.speaker || 'VOICE'}</div>
        <canvas class="tx-waveform" id="txWave" width="600" height="80"></canvas>
        <div class="tx-voice-sub" id="txSub"></div>
      </div>
    `;
    // Animate fake waveform
    const canvas = el.querySelector('#txWave');
    const ctx = canvas.getContext('2d');
    let t0 = Date.now();
    let raf;
    function drawWave() {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = '#ffcb6b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const elapsed = (Date.now() - t0) / 1000;
      for (let x = 0; x < w; x += 2) {
        const phase = elapsed * 4 + x * 0.05;
        const amp = 16 + 12 * Math.sin(phase * 0.7);
        const y = h/2 + amp * Math.sin(phase) * (Math.random() * 0.3 + 0.7);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      raf = requestAnimationFrame(drawWave);
    }
    drawWave();
    // Subtitles
    const subEl = el.querySelector('#txSub');
    let si = 0;
    const total = scene.totalMs || 15000;
    const perSub = total / scene.subtitles.length;
    function nextSub() {
      if (si >= scene.subtitles.length) {
        cancelAnimationFrame(raf);
        onComplete && onComplete();
        return;
      }
      subEl.innerHTML = '<div class="tx-sub-line">' + scene.subtitles[si] + '</div>';
      si++;
      setTimeout(nextSub, perSub);
    }
    nextSub();
  }

  function renderBriefing(el, scene) {
    el.innerHTML = `
      <div class="tx-briefing">
        <div class="tx-brief-head">${scene.title}</div>
        <div class="tx-brief-sub">${scene.subtitle || ''}</div>
        <div class="tx-brief-body">${scene.body}</div>
        ${scene.mission ? '<div class="tx-mission"><div class="tx-mlbl">🎯 TARGETS</div>' +
          scene.mission.map(m => '<div class="tx-mitem">▸ ' + m + '</div>').join('') + '</div>' : ''}
      </div>
    `;
  }

  // ==================== STYLES ====================
  const css = `
    .tx-overlay { position:fixed; inset:0; background:rgba(2,3,10,0.92); backdrop-filter:blur(8px); z-index:9500;
      display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity .4s; padding:20px; box-sizing:border-box; }
    .tx-overlay.open { opacity:1; }
    .tx-frame { width:100%; max-width:780px; max-height:90vh; display:flex; flex-direction:column; }
    .tx-stage { flex:1; min-height:280px; padding:20px; background:linear-gradient(135deg, #0a0820, #050310);
      border:2px solid #ffcb6b; border-radius:14px; box-shadow:0 0 40px rgba(255,203,107,0.2); overflow-y:auto; max-height:calc(90vh - 70px); }
    .tx-controls { display:flex; gap:10px; margin-top:12px; justify-content:flex-end; }
    .tx-skip { padding:10px 18px; background:transparent; border:1px solid #444; color:#9aa3c0; border-radius:8px; cursor:pointer; font-family:inherit; font-size:12px; }
    .tx-skip:hover { color:#ff5c7a; border-color:#ff5c7a; }
    .tx-next { padding:10px 24px; background:rgba(255,203,107,0.2); border:2px solid #ffcb6b; color:#ffcb6b;
      border-radius:8px; cursor:pointer; font-family:Orbitron,sans-serif; font-weight:700; font-size:13px; letter-spacing:0.1em; }
    .tx-next:hover:not(:disabled) { background:#ffcb6b; color:#000; }
    .tx-next:disabled { opacity:0.4; cursor:not-allowed; }

    /* Terminal */
    .tx-terminal { background:#000; border:1px solid #333; border-radius:8px; padding:14px; min-height:240px; }
    .tx-terminal-head { font-family:Orbitron,sans-serif; font-size:11px; color:#7effb2; letter-spacing:0.15em; padding-bottom:8px; border-bottom:1px solid #2a3050; margin-bottom:10px; }
    .tx-terminal-body { font-family:'Courier New',monospace; color:#7effb2; font-size:14px; line-height:1.7; max-height:300px; overflow-y:auto; }
    .tx-line { padding:1px 0; }

    /* Text */
    .tx-text-card { padding:24px; background:rgba(0,0,0,0.4); border:2px solid #ffcb6b; border-radius:14px; text-align:center; }
    .tx-icon { font-size:42px; filter:drop-shadow(0 0 16px currentColor); margin-bottom:14px; }
    .tx-text-body { font-size:18px; line-height:1.8; color:#ffcb6b; }

    /* Cinematic */
    .tx-cinematic { display:flex; flex-direction:column; gap:10px; }
    .tx-panel { display:flex; gap:14px; align-items:center; padding:14px; background:rgba(0,0,0,0.4); border:1px solid #2a3050; border-radius:10px; animation:txPanel 0.5s ease-out; }
    @keyframes txPanel { from { opacity:0; transform:translateX(-30px); } }
    .tx-panel-icon { font-size:28px; min-width:48px; text-align:center; filter:drop-shadow(0 0 12px rgba(255,203,107,0.4)); }
    .tx-panel-text { font-size:15px; color:#e8ecf8; line-height:1.6; }

    /* Voice */
    .tx-voice { padding:14px; }
    .tx-voice-speaker { font-family:Orbitron,sans-serif; color:#ffcb6b; font-size:14px; letter-spacing:0.15em; text-align:center; padding-bottom:10px; }
    .tx-waveform { width:100%; height:80px; background:rgba(0,0,0,0.5); border-radius:8px; }
    .tx-voice-sub { padding:14px 0; min-height:60px; }
    .tx-sub-line { font-size:18px; color:#ffd88a; font-style:italic; line-height:1.7; text-align:center; animation:subFade 0.4s; }
    @keyframes subFade { from { opacity:0; transform:translateY(8px); } }

    /* Briefing */
    .tx-briefing { padding:14px; }
    .tx-brief-head { font-family:Orbitron,sans-serif; font-size:18px; color:#7effb2; letter-spacing:0.15em; text-align:center; }
    .tx-brief-sub { font-size:13px; color:#9aa3c0; text-align:center; padding:6px 0 14px; }
    .tx-brief-body { font-size:15px; color:#e8ecf8; line-height:1.8; padding:12px 0; }
    .tx-mission { padding:14px; background:rgba(126,255,178,0.06); border-left:3px solid #7effb2; border-radius:0 10px 10px 0; margin-top:10px; }
    .tx-mlbl { font-family:Orbitron,sans-serif; font-size:11px; color:#7effb2; letter-spacing:0.15em; margin-bottom:6px; }
    .tx-mitem { font-family:monospace; font-size:14px; color:#e8ecf8; padding:2px 0; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  global.Transition = Transition;
})(window);
