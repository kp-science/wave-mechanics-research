/* ===== COSMOS LOG · Research Instruments =====
 * Pretest · Posttest · Embedded check · Confidence calibration UI
 * RI.pretest(items, onDone) · RI.posttest(items, onDone)
 * RI.embedded(label, items, onDone) · RI.confidence(prompt, onPick)
 */
(function(global){
  const RI = {
    pretest(items, onDone){ _quiz('pretest', 'Pretest · ก่อนเรียน', items, onDone); },
    posttest(items, onDone){ _quiz('posttest', 'Posttest · หลังเรียน', items, onDone); },
    embedded(label, items, onDone){ _quiz('embedded', 'Checkpoint · ' + label, items, onDone, label); },

    confidence(prompt, onPick){
      const wrap = document.createElement('div');
      wrap.className = 'ri-conf';
      wrap.innerHTML = `
        <div class="ri-conf-prompt">${prompt || 'มั่นใจในคำตอบแค่ไหน?'}</div>
        <div class="ri-conf-row">
          ${[1,2,3,4,5].map(n => `<button data-c="${n}">${n}</button>`).join('')}
        </div>
        <div class="ri-conf-key"><span>1·เดา</span><span>5·มั่นใจ</span></div>
      `;
      document.body.appendChild(wrap);
      wrap.querySelectorAll('button').forEach(b => b.onclick = () => {
        const c = +b.dataset.c;
        if (typeof onPick === 'function') onPick(c);
        wrap.remove();
      });
      _css();
    }
  };

  function _quiz(kind, title, items, onDone, label){
    const overlay = document.createElement('div');
    overlay.className = 'ri-overlay';
    let i = 0;
    const answers = [];
    const root = document.createElement('div');
    root.className = 'ri-card';
    overlay.appendChild(root);
    document.body.appendChild(overlay);

    function render(){
      if (i >= items.length) return finish();
      const it = items[i];
      root.innerHTML = `
        <div class="ri-h">${title}</div>
        <div class="ri-q">ข้อ ${i+1}/${items.length} · ${it.q}</div>
        <div class="ri-opts">
          ${(it.opts||[]).map((o,idx)=> `<button data-i="${idx}">${o}</button>`).join('')}
        </div>
        ${it.tag ? `<div class="ri-tag">${it.tag}</div>` : ''}
      `;
      root.querySelectorAll('.ri-opts button').forEach(b => b.onclick = () => {
        const pick = +b.dataset.i;
        const correct = pick === it.answer;
        answers.push({ q:it.q, pick, correct, tag:it.tag||null });
        if (global.KPA && it.tag) {
          if (correct) KPA.misconception(it.tag, 'resolved', { q:it.q, pick });
          else KPA.misconception(it.tag, 'persistent', { q:it.q, pick });
        }
        i++; render();
      });
    }
    function finish(){
      const correct = answers.filter(a => a.correct).length;
      if (global.KPA) {
        if (kind === 'pretest' || kind === 'posttest') {
          KPA.setPrePost(kind, { items, answers, score: correct, total: items.length });
        } else {
          KPA.research('embedded', { label, items, answers, score:correct, total:items.length });
        }
        KPA.addCoin(correct * 2, kind + '-correct');
      }
      root.innerHTML = `
        <div class="ri-h">${title}</div>
        <div class="ri-result">คะแนน ${correct}/${items.length}</div>
        <button class="ri-done">ปิด</button>
      `;
      root.querySelector('.ri-done').onclick = () => {
        overlay.remove();
        if (typeof onDone === 'function') onDone({ answers, score:correct, total:items.length });
      };
    }
    _css();
    render();
  }

  function _css(){
    if (document.getElementById('ri-css')) return;
    const s = document.createElement('style');
    s.id = 'ri-css';
    s.textContent = `
      .ri-overlay{position:fixed;inset:0;background:rgba(4,8,16,.92);z-index:280;
        display:flex;align-items:center;justify-content:center;padding:20px;}
      .ri-card{background:#0e1424;border:1px solid #4a90e2;border-radius:14px;
        padding:18px;max-width:520px;width:100%;color:#cfe;}
      .ri-h{font:700 16px system-ui;color:#ff8a3d;margin-bottom:10px;}
      .ri-q{font-size:16px;margin-bottom:12px;line-height:1.5;}
      .ri-opts{display:flex;flex-direction:column;gap:6px;}
      .ri-opts button{background:#11182a;color:#cfe;border:1px solid #2a3a55;
        border-radius:10px;padding:10px;text-align:left;font:15px system-ui;cursor:pointer;}
      .ri-opts button:hover{border-color:#4a90e2;background:#152040;}
      .ri-tag{margin-top:8px;font-size:12px;color:#7a8aa8;}
      .ri-result{font:700 22px system-ui;color:#9be7c4;text-align:center;margin:14px 0;}
      .ri-done{display:block;margin:0 auto;background:#00d4ff;color:#001824;
        border:none;border-radius:10px;padding:8px 20px;font-weight:700;cursor:pointer;}
      .ri-conf{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:90;
        background:#11182a;border:1px solid #4a90e2;border-radius:14px;padding:10px 14px;
        color:#cfe;}
      .ri-conf-prompt{font-size:13px;margin-bottom:6px;text-align:center;color:#7ad6ff;}
      .ri-conf-row{display:flex;gap:6px;justify-content:center;}
      .ri-conf-row button{background:#0a1226;color:#cfe;border:1px solid #2a3a55;
        border-radius:8px;width:36px;height:36px;font-weight:700;cursor:pointer;}
      .ri-conf-row button:hover{background:#ff8a3d;color:#1a0e00;}
      .ri-conf-key{display:flex;justify-content:space-between;font-size:11px;color:#7a8aa8;margin-top:4px;}
    `;
    document.head.appendChild(s);
  }

  global.RI = RI;
})(window);
