/* ===== COSMOS LOG · Story Screen =====
 * Renders a dedicated full-screen Story Tab on each EP07 page that
 * the player must read before reaching the activity.
 *
 * Reads from EP_CONFIG.story[pageId]:
 *   { objective, prev, npc, line, now, next }
 *
 * Behavior:
 *   - First visit (per page): Story Screen blocks the activity.
 *   - Click "▶ เข้าสู่กิจกรรม" → Story Screen fades out · activity revealed.
 *   - Tab persists in HUD as a small "📖 เนื้อเรื่อง" button to re-open.
 *   - Mission Log pill stays visible during activity.
 */
(function(global){
  const SEEN_KEY = () => 'cosmosLog_ep07_storySeen';

  const StoryBridge = {
    inject(){
      _css();   // ensure CSS injected even if DOMContentLoaded already fired
      const pageId = (document.body && document.body.dataset.page) || '?';
      const cfg = global.EP_CONFIG || {};
      const story = (cfg.story || {})[pageId];
      if (!story) return;

      // remove existing if any (re-injection safe)
      const oldScr = document.getElementById('storyScreen');
      if (oldScr) oldScr.remove();
      const oldBtn = document.getElementById('storyReopenBtn');
      if (oldBtn) oldBtn.remove();

      // Mission Log pill (always)
      this._missionLog(story);

      // Create the screen
      const seen = JSON.parse(localStorage.getItem(SEEN_KEY()) || '[]');
      const alreadySeen = seen.includes(pageId);

      const screen = this._buildScreen(pageId, story);
      document.body.appendChild(screen);
      if (alreadySeen) {
        screen.classList.add('story-hidden');
        // already-seen pages: notify activity-side immediately
        setTimeout(() => window.dispatchEvent(new CustomEvent('ep07:storyEntered',
          { detail:{ pageId, alreadySeen:true } })), 50);
      } else {
        // log first read time
        if (global.KPA) KPA.research('storyRead', { page: pageId, firstTime:true });
      }

      // Persistent re-open button (always available)
      this._reopenButton(pageId, story);
    },

    _buildScreen(pageId, story){
      const cfg = global.EP_CONFIG || {};
      const pages = cfg.pages || [];
      const idx = pages.findIndex(p => p.id === pageId);
      const totalPages = pages.length || 28;
      const actName = (pages[idx] && pages[idx].act) || '?';
      const sceneArt = _sceneArt(pageId, actName);

      const screen = document.createElement('div');
      screen.id = 'storyScreen';
      screen.className = 'story-screen act-' + actName;
      screen.innerHTML = `
        <div class="ss-bg">
          <div class="ss-stars"></div>
          <div class="ss-stars ss-stars-2"></div>
          <div class="ss-aurora"></div>
        </div>

        <div class="ss-card">
          <div class="ss-tabs">
            <span class="ss-tab active">📖 เนื้อเรื่อง</span>
            <span class="ss-tab disabled" title="ปลดล็อกหลังอ่าน">🎮 กิจกรรม</span>
          </div>

          <div class="ss-hero">
            <div class="ss-hero-art">${sceneArt}</div>
            <div class="ss-hero-meta">
              <span class="ss-act">ACT ${actName}</span>
              <span class="ss-pid">${pageId} · ${idx+1}/${totalPages}</span>
            </div>
          </div>

          ${story.prev ? `
          <div class="ss-block ss-prev">
            <div class="ss-icon">⏪</div>
            <div class="ss-block-body">
              <div class="ss-h">เกิดขึ้นก่อนหน้า</div>
              <div class="ss-text">${story.prev}</div>
            </div>
          </div>` : ''}

          ${story.line ? `
          <div class="ss-block ss-quote">
            <div class="ss-portrait">${_npcPortrait(story.npc)}</div>
            <div class="ss-block-body">
              <div class="ss-npc"><b>${story.npc||'NPC'}</b><span class="ss-npc-role">${_npcRole(story.npc)}</span></div>
              <div class="ss-text ss-line">"${story.line}"</div>
            </div>
          </div>` : ''}

          ${story.now ? `
          <div class="ss-block ss-now">
            <div class="ss-icon ss-icon-pulse">▶</div>
            <div class="ss-block-body">
              <div class="ss-h">ภารกิจตอนนี้</div>
              <div class="ss-text">${story.now}</div>
            </div>
          </div>` : ''}

          ${story.objective ? `
          <div class="ss-obj">
            <span class="ss-obj-icon">🎯</span>
            <span class="ss-obj-tag">เป้าหมาย</span>
            <span class="ss-obj-text">${story.objective}</span>
          </div>` : ''}

          ${story.next ? `
          <div class="ss-block ss-next">
            <div class="ss-icon">📋</div>
            <div class="ss-block-body">
              <div class="ss-h">หลังกิจกรรมนี้</div>
              <div class="ss-text">${story.next}</div>
            </div>
          </div>` : ''}

          <button class="ss-enter" id="ssEnterBtn">
            <span class="ss-enter-icon">▶</span>
            <span class="ss-enter-text">เข้าสู่กิจกรรม</span>
            <span class="ss-enter-shimmer"></span>
          </button>
          <div class="ss-hint">อ่านเสร็จแล้วกดปุ่มเพื่อเริ่ม · เปิดเนื้อเรื่องอีกได้จากปุ่มมุมขวาบน</div>
        </div>
      `;
      // wire button
      setTimeout(() => {
        const btn = screen.querySelector('#ssEnterBtn');
        if (btn) btn.onclick = () => this._enter(pageId, screen);
      }, 0);
      return screen;
    },

    _enter(pageId, screen){
      // mark seen
      const seen = JSON.parse(localStorage.getItem(SEEN_KEY()) || '[]');
      const firstEnter = !seen.includes(pageId);
      if (firstEnter) {
        seen.push(pageId);
        localStorage.setItem(SEEN_KEY(), JSON.stringify(seen));
      }
      screen.classList.add('story-hidden');
      if (global.KPA) {
        KPA.research('storyEntered', { page: pageId, firstEnter });
        KPA.vpa(1, { kind:'story-read', summary: pageId });
      }
      // notify activity-side (Mystery Box, etc.) that the user is ready
      window.dispatchEvent(new CustomEvent('ep07:storyEntered',
        { detail:{ pageId, firstEnter } }));
    },

    _reopenButton(pageId, story){
      if (document.getElementById('storyReopenBtn')) return;
      const btn = document.createElement('button');
      btn.id = 'storyReopenBtn';
      btn.className = 'story-reopen-btn';
      btn.innerHTML = '📖 <span>เนื้อเรื่อง</span>';
      btn.title = 'เปิดเนื้อเรื่องอีกครั้ง';
      btn.onclick = () => {
        const screen = document.getElementById('storyScreen');
        if (screen) screen.classList.remove('story-hidden');
        if (global.KPA) KPA.research('storyReopened', { page: pageId });
      };
      document.body.appendChild(btn);
    },

    _missionLog(story){
      const cfg = global.EP_CONFIG || {};
      let pill = document.getElementById('missionLog');
      if (!pill) {
        pill = document.createElement('div');
        pill.id = 'missionLog';
        pill.className = 'mission-log';
        document.body.appendChild(pill);
      }
      const osDone = (global.Boot07 && Boot07.osList()) || [];
      const osTotal = (cfg.os || []).length || 4;
      pill.innerHTML = `
        <span class="ml-tag">🎯</span>
        <span class="ml-text">${story.objective || 'กู้คืนเทคโนฯ อวกาศ'}</span>
        <span class="ml-prog">${osDone.length}/${osTotal} OS</span>
      `;
    }
  };

  function _npcEmoji(npc){
    return ({
      'เคน':'🧑‍💻','อารยา':'👩‍🚀','พ่ออารยา':'👨‍✈️','โบลท์':'👦','ทีม':'👥','VOID':'👹'
    })[npc] || '🗣️';
  }

  function _npcRole(npc){
    return ({
      'เคน':'· วิศวกรคลื่น',
      'อารยา':'· นักบินอวกาศ',
      'พ่ออารยา':'· ผู้บัญชาการ',
      'โบลท์':'· ลูกศิษย์ใหม่ · กัปตันใหม่',
      'ทีม':'· ทุกคน',
      'VOID':'· ศัตรู'
    })[npc] || '';
  }

  function _npcPortrait(npc){
    // animated SVG portrait per character (gradient + emoji over)
    const palette = {
      'เคน':       { c1:'#3498db', c2:'#1a5c8a', e:'🧑‍💻' },
      'อารยา':     { c1:'#9be7c4', c2:'#3a8a6a', e:'👩‍🚀' },
      'พ่ออารยา':  { c1:'#ffd84a', c2:'#a07a2a', e:'👨‍✈️' },
      'โบลท์':     { c1:'#ff8a3d', c2:'#a04a2a', e:'👦' },
      'ทีม':       { c1:'#cfe',    c2:'#4a90e2', e:'👥' },
      'VOID':      { c1:'#ff6a6a', c2:'#5a0a0a', e:'👹' }
    };
    const p = palette[npc] || { c1:'#7ad6ff', c2:'#2a5a8e', e:'🗣️' };
    return `
      <svg viewBox="0 0 80 80" class="ss-portrait-svg">
        <defs>
          <radialGradient id="grad-${(npc||'x').replace(/\s/g,'')}" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="${p.c1}" stop-opacity="1"/>
            <stop offset="100%" stop-color="${p.c2}" stop-opacity=".3"/>
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="36" fill="url(#grad-${(npc||'x').replace(/\s/g,'')})"
          stroke="${p.c1}" stroke-width="2"/>
        <circle cx="40" cy="40" r="36" fill="none" stroke="${p.c1}" stroke-width="1"
          stroke-dasharray="3 3" opacity=".6">
          <animateTransform attributeName="transform" type="rotate" from="0 40 40" to="360 40 40" dur="20s" repeatCount="indefinite"/>
        </circle>
      </svg>
      <span class="ss-portrait-emoji">${p.e}</span>
    `;
  }

  /* SVG scene art — different illustration per page mood */
  function _sceneArt(pageId, act){
    // ACT-specific palettes
    const palettes = {
      'A': { sky:'#1a0808',     glow:'#ff6a6a' },  // emergency red
      'B': { sky:'#0a1226',     glow:'#7ad6ff' },  // electric blue
      'C': { sky:'#0e1a30',     glow:'#ff8a3d' },  // rocket orange
      'D': { sky:'#1a0e2a',     glow:'#9b59b6' }   // deep purple
    };
    const p = palettes[act] || palettes['B'];

    // page-specific scenes
    const scenes = {
      // --- ACT A ---
      p00: () => `<g><circle cx="100" cy="60" r="32" fill="#4a90e2" opacity=".7"/>
        <circle cx="100" cy="60" r="50" fill="none" stroke="#ff6a6a" stroke-width="1.5" stroke-dasharray="4 6" opacity=".7"/>
        <text x="100" y="115" text-anchor="middle" fill="#ff6a6a" font-size="13" font-weight="700">📡 OFFLINE · 4,800 sat</text></g>`,
      p01: () => `<g><rect x="60" y="30" width="80" height="60" rx="6" fill="none" stroke="#ff8a3d" stroke-width="2"/>
        <text x="100" y="55" text-anchor="middle" fill="#ff8a3d" font-size="14" font-weight="700">PRETEST</text>
        <text x="100" y="78" text-anchor="middle" fill="#cfe" font-size="11">8 ข้อ · M1-M7</text></g>`,
      p02: () => `<g><rect x="50" y="35" width="100" height="55" rx="8" fill="#0a0a0a" stroke="#ff6a6a" stroke-width="2"/>
        <text x="100" y="58" text-anchor="middle" fill="#ff6a6a" font-size="11">HUD · radar offline</text>
        <text x="100" y="76" text-anchor="middle" fill="#666" font-size="11">IR · X-ray · UV ❌</text>
        <text x="100" y="105" text-anchor="middle" fill="#f1c40f" font-size="11">เห็นแค่ visible</text></g>`,
      p03: () => `<g><polygon points="100,30 120,80 80,80" fill="${p.glow}" opacity=".7"/>
        <text x="100" y="65" text-anchor="middle" fill="#000" font-size="12" font-weight="700">▲</text>
        <text x="100" y="100" text-anchor="middle" fill="${p.glow}" font-size="12" font-weight="700">MISSION · 4 OS · 6 ชม.</text></g>`,
      // --- ACT B (กล้องคลื่น) ---
      p04: () => `<g>
        ${['#27ae60','#3498db','#e67e22','#f1c40f','#9b59b6','#00d4ff'].map((c,i)=>
          `<rect x="${30+i*23}" y="40" width="20" height="40" fill="${c}" rx="3"/>`
        ).join('')}
        <text x="100" y="100" text-anchor="middle" fill="#cfe" font-size="11">EM · 6 ช่วงคลื่น</text>
        <text x="100" y="118" text-anchor="middle" fill="#7a8aa8" font-size="10">ยาว → สั้น</text></g>`,
      p05: () => `<g><path d="M 30 70 Q 100 30 170 70" fill="none" stroke="#3498db" stroke-width="20" opacity=".4"/>
        <line x1="60" y1="20" x2="60" y2="60" stroke="#27ae60" stroke-width="3"/>
        <line x1="100" y1="20" x2="100" y2="60" stroke="#e67e22" stroke-width="3" stroke-dasharray="3 3"/>
        <line x1="140" y1="20" x2="140" y2="60" stroke="#00d4ff" stroke-width="3" stroke-dasharray="3 3"/>
        <text x="100" y="100" text-anchor="middle" fill="#cfe" font-size="11">บรรยากาศกั้น X-ray/UV/IR</text></g>`,
      p06: () => `<g>
        <path d="M 50 90 Q 100 30 150 90" fill="none" stroke="#27ae60" stroke-width="2"/>
        <circle cx="100" cy="55" r="20" fill="none" stroke="#27ae60" stroke-width="2"/>
        <circle cx="100" cy="55" r="12" fill="none" stroke="#27ae60" stroke-width="1"/>
        <circle cx="100" cy="55" r="4" fill="#27ae60"/>
        <text x="100" y="115" text-anchor="middle" fill="#27ae60" font-size="11" font-weight="700">📡 FAST · 1.4 GHz</text></g>`,
      p07: () => `<g><circle cx="100" cy="60" r="38" fill="#000" stroke="#f1c40f" stroke-width="2"/>
        <line x1="100" y1="40" x2="100" y2="80" stroke="#f1c40f" stroke-width="1" opacity=".4"/>
        <line x1="80" y1="60" x2="120" y2="60" stroke="#f1c40f" stroke-width="1" opacity=".4"/>
        <text x="60" y="35" font-size="14">👾</text><text x="125" y="50" font-size="14">👾</text><text x="90" y="80" font-size="14">👾</text>
        <text x="100" y="115" text-anchor="middle" fill="#f1c40f" font-size="11" font-weight="700">🔭 visible · lock drone</text></g>`,
      p08: () => `<g><ellipse cx="100" cy="60" rx="60" ry="25" fill="#4a2a1a" opacity=".7"/>
        <circle cx="100" cy="60" r="14" fill="#ff6a00" opacity=".9"/>
        <circle cx="100" cy="60" r="22" fill="none" stroke="#ff6a00" stroke-width="1" opacity=".5"/>
        <text x="100" y="110" text-anchor="middle" fill="#e67e22" font-size="11" font-weight="700">🔥 IR · ทะลุเมฆฝุ่น</text></g>`,
      p09: () => `<g><rect x="30" y="35" width="140" height="50" rx="8" fill="#1a2030" stroke="#9b59b6" stroke-width="2"/>
        <line x1="50" y1="50" x2="100" y2="60" stroke="#9b59b6" stroke-width="2" stroke-dasharray="4 2"/>
        <line x1="80" y1="70" x2="160" y2="60" stroke="#9b59b6" stroke-width="2" stroke-dasharray="4 2"/>
        <text x="100" y="110" text-anchor="middle" fill="#9b59b6" font-size="11" font-weight="700">🟣 UV · หา crack</text></g>`,
      p10: () => `<g><circle cx="100" cy="60" r="30" fill="#000" stroke="#00d4ff" stroke-width="2"/>
        <circle cx="100" cy="60" r="8" fill="#00d4ff"/>
        <circle cx="100" cy="60" r="44" fill="none" stroke="#00d4ff" stroke-width="1" opacity=".4">
          <animate attributeName="r" values="44;55;44" dur="2s" repeatCount="indefinite"/>
        </circle>
        <text x="100" y="115" text-anchor="middle" fill="#00d4ff" font-size="11" font-weight="700">⚡ Chandra · X-ray</text></g>`,
      p11: () => `<g>
        ${['#27ae60','#f1c40f','#3498db','#e67e22','#9b59b6','#00d4ff'].map((c,i)=>
          `<rect x="${22+i*26}" y="45" width="20" height="20" fill="${c}" rx="3"/>`
        ).join('')}
        <text x="100" y="85" text-anchor="middle" fill="#cfe" font-size="11">🔭 จับคู่ 6 กล้อง ↔ คลื่น</text>
        <text x="100" y="105" text-anchor="middle" fill="#ff8a3d" font-size="11" font-weight="700">OS-1 ปลดล็อก</text></g>`,
      // --- ACT C ---
      p12: () => `<g><circle cx="60" cy="60" r="20" fill="none" stroke="#7ad6ff" stroke-width="2"/>
        <text x="60" y="65" text-anchor="middle" font-size="18">🔭</text>
        <line x1="85" y1="60" x2="115" y2="60" stroke="#ff8a3d" stroke-width="2" marker-end="url(#arr)"/>
        <text x="140" y="65" text-anchor="middle" font-size="22">🚀</text>
        <text x="100" y="105" text-anchor="middle" fill="#cfe" font-size="11">กล้อง vs ยาน</text></g>`,
      p13: () => `<g>
        ${['🚀','🛰️','🛰️','🌙','🪐'].map((e,i)=>
          `<text x="${30+i*32}" y="70" text-anchor="middle" font-size="22">${e}</text>`
        ).join('')}
        <text x="100" y="110" text-anchor="middle" fill="#ff8a3d" font-size="11" font-weight="700">5 ยานสำรวจ</text></g>`,
      p14: () => `<g><circle cx="100" cy="60" r="36" fill="#3a0808" stroke="#ff0000" stroke-width="2">
          <animate attributeName="stroke-width" values="2;5;2" dur="0.8s" repeatCount="indefinite"/>
        </circle>
        <text x="100" y="68" text-anchor="middle" font-size="32">❤️</text>
        <text x="100" y="115" text-anchor="middle" fill="#ff6a6a" font-size="11" font-weight="700">⚠ CPR · 100 bpm</text></g>`,
      p15: () => `<g><circle cx="100" cy="60" r="14" fill="#4a90e2"/>
        <circle cx="100" cy="60" r="26" fill="none" stroke="#7ad6ff" stroke-width="1" stroke-dasharray="3 2"/>
        <circle cx="100" cy="60" r="40" fill="none" stroke="#7ad6ff" stroke-width="1" stroke-dasharray="3 4"/>
        <circle cx="100" cy="60" r="55" fill="none" stroke="#7ad6ff" stroke-width="1" stroke-dasharray="3 6"/>
        <text x="100" y="62" text-anchor="middle" font-size="9" fill="#cfe">🌍</text>
        <text x="156" y="55" font-size="11">📡</text>
        <text x="100" y="22" font-size="11">🛰️</text>
        <text x="44" y="55" font-size="11">📞</text>
        <text x="100" y="115" text-anchor="middle" fill="#7ad6ff" font-size="11" font-weight="700">LEO · MEO · GEO</text></g>`,
      p16: () => `<g><polygon points="100,15 115,55 100,55" fill="#ff8a3d"/>
        <rect x="93" y="55" width="14" height="40" fill="#ddd"/>
        <rect x="78" y="60" width="12" height="30" fill="#888"/>
        <rect x="110" y="60" width="12" height="30" fill="#888"/>
        <polygon points="100,95 90,108 110,108" fill="#ffeb3b" opacity=".8">
          <animate attributeName="opacity" values=".4;1;.4" dur="0.4s" repeatCount="indefinite"/>
        </polygon>
        <text x="100" y="125" text-anchor="middle" fill="#ff8a3d" font-size="11" font-weight="700">🚀 FORGE</text></g>`,
      p17: () => `<g><path d="M 40 100 Q 100 20 160 100" fill="none" stroke="#9be7c4" stroke-width="2" stroke-dasharray="4 2"/>
        <text x="100" y="60" font-size="22" text-anchor="middle">🚀</text>
        <text x="100" y="115" text-anchor="middle" fill="#9be7c4" font-size="11" font-weight="700">7.9 ≤ v &lt; 11.2 km/s</text></g>`,
      p18: () => `<g><circle cx="100" cy="55" r="28" fill="#a04a2a"/>
        <circle cx="92" cy="50" r="6" fill="#7a3a1a"/><circle cx="108" cy="60" r="4" fill="#7a3a1a"/>
        <text x="100" y="100" text-anchor="middle" fill="#ff8a3d" font-size="12" font-weight="700">🪐 MARS · 5 ปัจจัย</text></g>`,
      p19: () => `<g><rect x="40" y="40" width="120" height="50" rx="8" fill="#0a1226" stroke="#ff8a3d" stroke-width="2"/>
        <text x="60" y="60" font-size="11" fill="#cfe">🛡️ heat shield</text>
        <text x="60" y="78" font-size="11" fill="#cfe">🚀 v_escape</text>
        <text x="100" y="110" text-anchor="middle" fill="#ff8a3d" font-size="11" font-weight="700">DESIGN A</text></g>`,
      p20: () => `<g>
        <circle cx="60" cy="60" r="14" fill="#9be7c4"/><text x="60" y="65" text-anchor="middle" font-size="12">🏠</text>
        <circle cx="100" cy="60" r="14" fill="#ffd84a"/><text x="100" y="65" text-anchor="middle" font-size="12">🍅</text>
        <circle cx="140" cy="60" r="14" fill="#7ad6ff"/><text x="140" y="65" text-anchor="middle" font-size="12">💧</text>
        <text x="100" y="110" text-anchor="middle" fill="#9be7c4" font-size="11" font-weight="700">ที่อยู่ · อาหาร · น้ำ</text></g>`,
      p21: () => `<g><path d="M 30 80 Q 100 30 170 80" fill="none" stroke="#ff8a3d" stroke-width="2" stroke-dasharray="3 4"/>
        <text x="30" y="85" font-size="14">🌍</text>
        <text x="160" y="85" font-size="14">🪐</text>
        <text x="100" y="50" font-size="18">🚀</text>
        <text x="100" y="115" text-anchor="middle" fill="#ff8a3d" font-size="11" font-weight="700">7-DAY SIM</text></g>`,
      // --- ACT D ---
      p22: () => `<g><polygon points="100,25 130,75 70,75" fill="#ff8a3d"/>
        <text x="100" y="65" text-anchor="middle" font-size="20">🛡️</text>
        <line x1="40" y1="90" x2="160" y2="90" stroke="url(#heat)" stroke-width="6"/>
        <defs><linearGradient id="heat"><stop offset="0%" stop-color="#4a90e2"/><stop offset="50%" stop-color="#ff8a3d"/><stop offset="100%" stop-color="#ff0000"/></linearGradient></defs>
        <text x="100" y="115" text-anchor="middle" fill="#ff6a6a" font-size="11" font-weight="700">🔥 1500°C</text></g>`,
      p23: () => `<g>
        ${['🍎','🍚','🥩','🍝','🍫','🍲','🥛'].map((e,i)=>
          `<text x="${28+i*23}" y="70" font-size="18" text-anchor="middle">${e}</text>`
        ).join('')}
        <text x="100" y="110" text-anchor="middle" fill="#9be7c4" font-size="11" font-weight="700">freeze-dry · 7 มื้อ</text></g>`,
      p24: () => `<g><rect x="40" y="35" width="120" height="55" rx="10" fill="#0a1226" stroke="#9be7c4" stroke-width="2"/>
        <text x="65" y="60" font-size="20">🌡️</text>
        <text x="100" y="60" font-size="20">📷</text>
        <text x="135" y="60" font-size="20">❤️</text>
        <text x="100" y="110" text-anchor="middle" fill="#9be7c4" font-size="11" font-weight="700">🏥 NASA Spinoff</text></g>`,
      p25: () => `<g>
        <text x="40" y="55" font-size="20">🛏️</text>
        <text x="80" y="55" font-size="20">😎</text>
        <text x="120" y="55" font-size="20">🔥</text>
        <text x="160" y="55" font-size="20">☀️</text>
        <line x1="40" y1="75" x2="160" y2="75" stroke="#ff8a3d" stroke-width="1" opacity=".5"/>
        <text x="100" y="90" font-size="11" text-anchor="middle" fill="#cfe">↕</text>
        <text x="100" y="110" text-anchor="middle" fill="#ff8a3d" font-size="11" font-weight="700">ของในบ้าน ↔ NASA</text></g>`,
      p26: () => `<g><polygon points="100,15 145,80 55,80" fill="#ff0000" opacity=".7">
          <animate attributeName="opacity" values=".7;1;.7" dur="0.6s" repeatCount="indefinite"/>
        </polygon>
        <text x="100" y="60" text-anchor="middle" font-size="22">👹</text>
        <text x="100" y="110" text-anchor="middle" fill="#ff6a6a" font-size="13" font-weight="800">⚠ FINAL · 12 CRISIS</text></g>`,
      p27: () => `<g><rect x="50" y="30" width="100" height="60" rx="8" fill="#0a1226" stroke="#ffd84a" stroke-width="2"/>
        <text x="100" y="58" text-anchor="middle" font-size="22">🏆</text>
        <text x="100" y="78" text-anchor="middle" fill="#ffd84a" font-size="10" font-weight="700">SPECTRUM ENGINEER</text>
        <text x="100" y="110" text-anchor="middle" fill="#cfe" font-size="11">→ EP08 Genesis Again</text></g>`
    };
    const draw = scenes[pageId] || (() => `<text x="100" y="65" text-anchor="middle" font-size="40">📖</text>`);
    return `<svg viewBox="0 0 200 130" class="ss-scene-svg">
      <defs>
        <radialGradient id="bg-${pageId}" cx="50%" cy="40%" r="80%">
          <stop offset="0%" stop-color="${p.glow}" stop-opacity=".18"/>
          <stop offset="100%" stop-color="${p.sky}" stop-opacity="1"/>
        </radialGradient>
      </defs>
      <rect width="200" height="130" fill="url(#bg-${pageId})"/>
      ${draw()}
    </svg>`;
  }

  function _css(){
    if (document.getElementById('story-screen-css')) return;
    const s = document.createElement('style');
    s.id = 'story-screen-css';
    s.textContent = `
      .story-screen{
        position: fixed; inset: 0; z-index: 250;
        overflow-y: auto; padding: 50px 18px 30px;
        animation: ssIn .5s ease-out;
        background: #060a14;
      }
      .story-screen.story-hidden{
        animation: ssOut .35s ease-in forwards;
        pointer-events: none;
      }
      @keyframes ssIn { from{opacity:0; transform:scale(.96);} to{opacity:1; transform:scale(1);} }
      @keyframes ssOut { to{opacity:0; transform:translateY(-30px);} }

      /* === Cinematic background === */
      .ss-bg{ position: fixed; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; }
      .ss-stars{ position: absolute; inset: 0;
        background-image:
          radial-gradient(2px 2px at 20% 30%, #fff, transparent),
          radial-gradient(1px 1px at 60% 70%, #cfe, transparent),
          radial-gradient(1.5px 1.5px at 80% 20%, #fff, transparent),
          radial-gradient(1px 1px at 30% 80%, #7ad6ff, transparent),
          radial-gradient(1.5px 1.5px at 70% 40%, #fff, transparent),
          radial-gradient(1px 1px at 50% 60%, #cfe, transparent),
          radial-gradient(2px 2px at 90% 80%, #fff, transparent),
          radial-gradient(1px 1px at 10% 50%, #ff8a3d, transparent);
        background-repeat: repeat; background-size: 350px 350px;
        animation: starsTwinkle 4s ease-in-out infinite alternate;
      }
      .ss-stars-2{ background-size: 250px 250px; opacity:.5;
        animation-duration: 6s; animation-delay: 1s; transform: scale(1.3); }
      @keyframes starsTwinkle { from{opacity:.4;} to{opacity:.9;} }

      .ss-aurora{
        position: absolute; inset: 0;
        background:
          radial-gradient(circle at 20% 80%, rgba(122,214,255,.12) 0%, transparent 40%),
          radial-gradient(circle at 80% 20%, rgba(255,138,61,.12) 0%, transparent 40%),
          radial-gradient(circle at 50% 50%, rgba(155,89,182,.08) 0%, transparent 50%);
        animation: auroraFloat 12s ease-in-out infinite alternate;
      }
      @keyframes auroraFloat {
        from{ transform: translate(0,0) scale(1); }
        to  { transform: translate(20px,-15px) scale(1.05); }
      }

      /* ACT-specific background tint */
      .story-screen.act-A .ss-aurora{ background:
        radial-gradient(circle at 50% 50%, rgba(255,106,106,.18) 0%, transparent 50%); }
      .story-screen.act-B .ss-aurora{ background:
        radial-gradient(circle at 30% 70%, rgba(122,214,255,.15) 0%, transparent 50%),
        radial-gradient(circle at 70% 30%, rgba(0,212,255,.12) 0%, transparent 50%); }
      .story-screen.act-C .ss-aurora{ background:
        radial-gradient(circle at 50% 60%, rgba(255,138,61,.18) 0%, transparent 50%); }
      .story-screen.act-D .ss-aurora{ background:
        radial-gradient(circle at 50% 50%, rgba(155,89,182,.18) 0%, transparent 50%); }

      /* === Card === */
      .ss-card{
        position: relative;
        max-width: 720px; margin: 0 auto;
        background: linear-gradient(180deg, rgba(14,20,36,.92) 0%, rgba(10,14,28,.96) 100%);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 138, 61, .35);
        border-radius: 18px;
        padding: 22px 22px 18px;
        box-shadow:
          0 0 60px rgba(255, 138, 61, .12),
          0 8px 32px rgba(0,0,0,.5),
          inset 0 1px 0 rgba(255,255,255,.05);
      }

      /* === Tabs === */
      .ss-tabs{
        display: flex; gap: 6px; margin-bottom: 14px;
        border-bottom: 2px solid #2a3a55; padding-bottom: 10px;
      }
      .ss-tab{
        padding: 8px 18px; border-radius: 10px 10px 0 0;
        font: 700 14px 'Sarabun', system-ui;
        background: rgba(255,138,61,.1); color: #ff8a3d;
        border: 1px solid rgba(255,138,61,.4); border-bottom: none;
      }
      .ss-tab.active{
        background: linear-gradient(180deg, #ff8a3d 0%, #d65a18 100%);
        color: #1a0e00;
        box-shadow: 0 4px 12px rgba(255,138,61,.35);
      }
      .ss-tab.disabled{
        background: transparent; color: #4a5570; border-color: #2a3a55;
        cursor: not-allowed;
      }

      /* === Hero scene art === */
      .ss-hero{
        position: relative;
        margin: 0 0 16px;
        border-radius: 12px; overflow: hidden;
        border: 1px solid rgba(122,214,255,.22);
      }
      .ss-scene-svg{
        display: block; width: 100%; height: auto; aspect-ratio: 200/130;
        filter: drop-shadow(0 0 8px rgba(255,138,61,.15));
      }
      .ss-hero-meta{
        position: absolute; top: 8px; left: 8px; right: 8px;
        display: flex; justify-content: space-between;
        font-size: 10px; letter-spacing: .12em;
      }
      .ss-act{ background: rgba(11,20,36,.82); padding: 4px 12px; border-radius: 999px;
        border: 1px solid #4a90e2; color: #4a90e2; font-weight: 700; }
      .ss-pid{ background: rgba(11,20,36,.82); padding: 4px 12px; border-radius: 999px;
        border: 1px solid #2a3a55; color: #cfe; font-weight: 700; }

      /* === Block layout === */
      .ss-block{
        display: flex; gap: 12px; align-items: flex-start;
        background: rgba(10,18,38,.6);
        border: 1px solid rgba(42,58,85,.6);
        border-left-width: 4px; border-left-style: solid;
        border-radius: 10px;
        padding: 12px 14px;
        margin: 10px 0;
        transition: transform .25s, box-shadow .25s;
      }
      .ss-block:hover{ transform: translateX(2px); }

      .ss-prev{ border-left-color: #7ad6ff; }
      .ss-prev:hover{ box-shadow: 0 0 20px rgba(122,214,255,.15); }
      .ss-quote{ border-left-color: #9be7c4; background: rgba(10,24,18,.65); }
      .ss-quote:hover{ box-shadow: 0 0 20px rgba(155,231,196,.15); }
      .ss-now{ border-left-color: #ff8a3d; background: rgba(26,18,8,.7); }
      .ss-now:hover{ box-shadow: 0 0 20px rgba(255,138,61,.2); }
      .ss-next{ border-left-color: #9b59b6; }
      .ss-next:hover{ box-shadow: 0 0 20px rgba(155,89,182,.15); }

      .ss-icon{
        flex: 0 0 auto;
        width: 36px; height: 36px;
        display: flex; align-items: center; justify-content: center;
        background: rgba(0,0,0,.4); border-radius: 50%;
        font-size: 18px;
      }
      .ss-icon-pulse{
        animation: iconPulse 1.6s ease-in-out infinite;
        background: radial-gradient(circle, rgba(255,138,61,.5), transparent);
      }
      @keyframes iconPulse{
        0%,100%{ transform: scale(1); }
        50%{ transform: scale(1.15); box-shadow: 0 0 14px rgba(255,138,61,.6); }
      }

      .ss-block-body{ flex: 1; min-width: 0; }
      .ss-h{
        font: 700 11px 'Sarabun', system-ui;
        letter-spacing: .16em;
        text-transform: uppercase;
        margin-bottom: 6px;
      }
      .ss-prev .ss-h{ color: #7ad6ff; }
      .ss-now .ss-h{ color: #ff8a3d; }
      .ss-next .ss-h{ color: #9b59b6; }

      .ss-text{
        font-size: 16px; line-height: 1.6; color: #e3ecf8;
      }
      .ss-now .ss-text{ font-weight: 600; color: #fff; }
      .ss-line{
        font-style: italic; color: #cfe; font-size: 17px; line-height: 1.6;
        position: relative; padding-left: 4px;
      }

      /* === NPC portrait === */
      .ss-portrait{
        flex: 0 0 auto;
        position: relative; width: 56px; height: 56px;
      }
      .ss-portrait-svg{ width: 100%; height: 100%; }
      .ss-portrait-emoji{
        position: absolute; inset: 0;
        display: flex; align-items: center; justify-content: center;
        font-size: 30px;
        filter: drop-shadow(0 0 8px rgba(255,255,255,.4));
      }

      .ss-npc{
        font-size: 13px; color: #9be7c4; margin-bottom: 4px;
        display: flex; align-items: baseline; gap: 6px;
      }
      .ss-npc b{ color: #fff; font-style: normal; font-weight: 800; font-size: 15px; }
      .ss-npc-role{ font-size: 11px; color: #7a8aa8; font-style: italic; }

      /* === Objective pill === */
      .ss-obj{
        display: flex; align-items: center; gap: 10px;
        margin: 14px 0;
        padding: 10px 16px;
        background: linear-gradient(90deg, rgba(0,212,255,.12), rgba(0,212,255,.04));
        border: 1px solid #00d4ff; border-radius: 999px;
        font-size: 14px; color: #cfe;
        box-shadow: 0 0 18px rgba(0,212,255,.15);
      }
      .ss-obj-icon{ font-size: 18px; }
      .ss-obj-tag{ color: #00d4ff; font-weight: 800; letter-spacing: .1em; font-size: 11px; }
      .ss-obj-text{ font-weight: 600; }

      /* === Enter button === */
      .ss-enter{
        display: flex; align-items: center; justify-content: center; gap: 10px;
        position: relative;
        width: 100%;
        margin: 22px 0 8px;
        background: linear-gradient(90deg, #ff8a3d 0%, #ff6a18 50%, #ff8a3d 100%);
        background-size: 200% 100%;
        color: #1a0e00; border: none; border-radius: 14px;
        padding: 18px;
        font: 800 19px 'Sarabun', system-ui;
        letter-spacing: .04em;
        cursor: pointer;
        overflow: hidden;
        box-shadow:
          0 6px 24px rgba(255, 138, 61, .35),
          inset 0 1px 0 rgba(255,255,255,.3);
        transition: transform .15s, box-shadow .2s;
        animation: btnGlow 3s ease-in-out infinite;
      }
      @keyframes btnGlow{
        0%,100%{ background-position: 0% 50%; }
        50%{ background-position: 100% 50%; }
      }
      .ss-enter:hover{
        transform: translateY(-2px) scale(1.01);
        box-shadow: 0 10px 32px rgba(255, 138, 61, .55), inset 0 1px 0 rgba(255,255,255,.4);
      }
      .ss-enter-icon{
        display: inline-flex; align-items: center; justify-content: center;
        width: 32px; height: 32px;
        background: rgba(0,0,0,.18); border-radius: 50%;
      }
      .ss-enter-shimmer{
        position: absolute; top: 0; left: -50%;
        width: 50%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.4), transparent);
        animation: shimmer 2.5s ease-in-out infinite;
      }
      @keyframes shimmer{
        0%{ left: -50%; }
        100%{ left: 100%; }
      }

      .ss-hint{
        text-align: center; font-size: 12px; color: #7a8aa8;
        letter-spacing: .04em;
      }

      /* Re-open floating button (top-right) */
      .story-reopen-btn{
        position: fixed; top: 88px; right: 12px; z-index: 76;
        background: rgba(8,12,20,.92); backdrop-filter: blur(8px);
        border: 1px solid rgba(255,138,61,.5); color: #ff8a3d;
        border-radius: 999px;
        padding: 6px 12px;
        font: 700 12px 'Sarabun', system-ui;
        cursor: pointer;
        display: flex; align-items: center; gap: 4px;
      }
      .story-reopen-btn:hover{ background: rgba(255,138,61,.15); }
      @media(max-width: 600px){
        .story-reopen-btn span{ display: none; }
        .story-reopen-btn{ padding: 8px 10px; }
      }

      /* Mission Log pill (kept) */
      .mission-log{
        position: fixed; left: 50%; transform: translateX(-50%);
        top: 38px; z-index: 70;
        background: rgba(8,12,20,.95); backdrop-filter: blur(8px);
        border: 1px solid rgba(255,138,61,.35);
        border-radius: 999px; padding: 6px 14px;
        font-size: 12px; color: #cfe;
        max-width: calc(100% - 240px);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        display: flex; gap: 8px; align-items: center;
      }
      .ml-tag{ color: #ff8a3d; font-weight: 700; }
      .ml-prog{ background: #11182a; padding: 2px 8px; border-radius: 8px;
        border: 1px solid #2a3a55; color: #7ad6ff; font-weight: 700; }
      .ml-text{ overflow: hidden; text-overflow: ellipsis; }
      @media(max-width: 700px){ .mission-log{ display: none; } }

      /* Mobile screen tweaks */
      @media(max-width: 600px){
        .story-screen{ padding: 50px 10px 30px; }
        .ss-card{ padding: 16px 14px; }
        .ss-text{ font-size: 15px; }
        .ss-line{ font-size: 16px; }
      }
    `;
    document.head.appendChild(s);
  }

  document.addEventListener('DOMContentLoaded', () => {
    _css();
    setTimeout(() => StoryBridge.inject(), 30);
  });

  global.StoryBridge = StoryBridge;
})(window);
