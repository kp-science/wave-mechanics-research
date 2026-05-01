/* ===== COSMOS LOG · Mystery Box v2 · Research Checkpoint =====
 * 7 fixed positions tied to research checkpoints (not random).
 * MysteryBoxV2.offer({ id, page, checkpoint, reward, snapshot, prompt })
 */
(function(global){
  const opened = new Set();

  const MysteryBoxV2 = {
    offer(spec){
      if (!spec || !spec.id || opened.has(spec.id)) return;
      const overlay = document.createElement('div');
      overlay.className = 'mb2-overlay';
      overlay.innerHTML = `
        <div class="mb2-card">
          <div class="mb2-title">🎁 พบกล่องวิจัย · ${spec.id}</div>
          <div class="mb2-sub">checkpoint: ${spec.checkpoint||'?'}</div>
          <div class="mb2-box" id="mb2Box">📦</div>
          <button class="mb2-open" id="mb2Open">เปิดกล่อง</button>
        </div>`;
      document.body.appendChild(overlay);
      overlay.querySelector('#mb2Open').onclick = () => {
        opened.add(spec.id);
        _reveal(overlay, spec);
      };
    }
  };

  function _reveal(overlay, spec){
    const card = overlay.querySelector('.mb2-card');
    const r = spec.reward || { coin:5 };
    if (r.coin)   global.KPA && KPA.addCoin(r.coin, 'mb-' + spec.id);
    if (r.energy) global.KPA && KPA.addEnergy(r.energy, 'mb-' + spec.id);

    const snapshot = spec.snapshot || {};
    const reflectId = 'mb2Reflect_' + spec.id;
    card.innerHTML = `
      <div class="mb2-title">🎁 ${spec.id} เปิดแล้ว</div>
      <div class="mb2-row mb2-reward">
        ${r.coin ? `<span>+${r.coin}🪙</span>` : ''}
        ${r.energy ? `<span>+${r.energy}⚡</span>` : ''}
        ${spec.cosmetic ? `<span>🎨 ${spec.cosmetic}</span>` : ''}
      </div>
      <div class="mb2-snap">
        <div class="mb2-snap-h">📊 ภาพการเรียนรู้ของเธอ ณ จุดนี้</div>
        ${Object.keys(snapshot).map(k =>
          `<div class="mb2-snap-row"><span>${k}</span><b>${snapshot[k]}</b></div>`
        ).join('')}
      </div>
      <div class="mb2-prompt">
        <div class="mb2-snap-h">💬 ${spec.prompt || 'ตอนนี้คุณเข้าใจอะไรเพิ่มขึ้นบ้าง?'}</div>
        <textarea id="${reflectId}" rows="2" placeholder="พิมพ์สั้นๆ 1 ประโยค"></textarea>
      </div>
      <button class="mb2-close" id="mb2Close">รับและไปต่อ</button>
    `;
    card.querySelector('#mb2Close').onclick = () => {
      const text = (card.querySelector('#'+reflectId).value || '').trim();
      if (global.KPA) {
        KPA.boxOpen({
          box_id: spec.id, checkpoint: spec.checkpoint,
          reward: r, snapshot, reflection: text
        });
        if (text) KPA.research('reflection', { boxId:spec.id, text });
        KPA.vpa(3, { kind:'mb-reflect', summary:spec.id, text });
      }
      if (global.HUD) HUD.incMB();
      overlay.remove();
      window.dispatchEvent(new CustomEvent('mb2:closed', { detail:{ id:spec.id } }));
    };
  }

  function _css(){
    if (document.getElementById('mb2-css')) return;
    const s = document.createElement('style');
    s.id = 'mb2-css';
    s.textContent = `
      .mb2-overlay{position:fixed;inset:0;background:rgba(4,8,16,.88);
        z-index:300;display:flex;align-items:center;justify-content:center;padding:20px;}
      .mb2-card{background:linear-gradient(180deg,#1a2540,#0e1424);
        border:1px solid #4a90e2;border-radius:16px;padding:18px;color:#cfe;
        max-width:480px;width:100%;box-shadow:0 0 40px rgba(74,144,226,.3);}
      .mb2-title{font:700 18px system-ui;color:#ff8a3d;margin-bottom:4px;}
      .mb2-sub{font-size:12px;color:#8aa;margin-bottom:12px;}
      .mb2-box{font-size:80px;text-align:center;margin:14px 0;
        animation:mb2Wob 1.2s ease-in-out infinite;}
      @keyframes mb2Wob{0%,100%{transform:rotate(-4deg);}50%{transform:rotate(4deg);}}
      .mb2-open,.mb2-close{display:block;margin:8px auto 0;background:#ff8a3d;
        color:#1a0e00;border:none;border-radius:10px;padding:10px 20px;
        font:700 15px system-ui;cursor:pointer;}
      .mb2-row{display:flex;gap:10px;justify-content:center;font-size:18px;margin:6px 0;}
      .mb2-snap{background:#0a1226;border:1px solid #2a3a55;border-radius:10px;
        padding:10px;margin:10px 0;}
      .mb2-snap-h{font-weight:700;font-size:13px;color:#7ad6ff;margin-bottom:4px;}
      .mb2-snap-row{display:flex;justify-content:space-between;font-size:13px;
        padding:2px 0;border-bottom:1px dashed #1d2a44;}
      .mb2-snap-row:last-child{border:none;}
      .mb2-prompt textarea{width:100%;background:#0a1226;color:#cfe;
        border:1px solid #2a3a55;border-radius:8px;padding:6px;font:14px system-ui;}
    `;
    document.head.appendChild(s);
  }
  document.addEventListener('DOMContentLoaded', _css);

  global.MysteryBoxV2 = MysteryBoxV2;
})(window);
