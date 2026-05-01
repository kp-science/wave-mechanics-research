/* ===== REVEAL AFTER SUBMIT =====
 * แก้ปัญหา: ExplainBack/Journal/ConfidenceGate โผล่ก่อนนักเรียนตอบ ทำให้สับสน
 *           + feedback ของ submit อยู่ด้านบน · เห็นไม่ชัด · เหมือนหายไป
 *
 * วิธีแก้:
 *   1. ซ่อน #ebMount, #ljMount, #cgMount (display:none) จนกว่าจะ submit สำเร็จ
 *   2. ตอน Submit.onSubmit เรียก → fire event 'cosmosLog:submitted' พร้อม result
 *   3. รับ event แล้ว flash #resultHost + scroll เข้าจอ + ค่อย ๆ reveal EB → Journal → CG
 *   4. ถ้าตอบไม่ผ่าน · reveal เฉพาะ ConfidenceGate (ให้ self-check + ลองใหม่ได้)
 */
(function(global){
  // ----- inject CSS once -----
  if (!document.getElementById('revealStyle')){
    const s = document.createElement('style'); s.id='revealStyle';
    s.textContent = `
      /* ซ่อน mount points จนกว่าจะ submit · เก็บพื้นที่ไว้ไม่กระโดด */
      [data-stage-after-submit] {
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transform: translateY(8px);
        transition: max-height .5s ease, opacity .5s ease, transform .5s ease;
        pointer-events: none;
      }
      [data-stage-after-submit].revealed {
        max-height: 4000px;
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }
      /* feedback flash · ทำให้เห็นชัด */
      .answer-flash {
        animation: ansFlash 1.6s ease-out;
        scroll-margin-top: 80px;
      }
      @keyframes ansFlash {
        0%   { box-shadow: 0 0 0 0 rgba(126,255,178, 0); transform: scale(1); }
        20%  { box-shadow: 0 0 0 14px rgba(126,255,178, 0.55); transform: scale(1.02); }
        60%  { box-shadow: 0 0 0 6px rgba(126,255,178, 0.20); transform: scale(1.01); }
        100% { box-shadow: 0 0 0 0 rgba(126,255,178, 0); transform: scale(1); }
      }
      .answer-flash.wrong { animation-name: ansFlashRed; }
      @keyframes ansFlashRed {
        0%   { box-shadow: 0 0 0 0 rgba(255,92,122, 0); transform: scale(1); }
        20%  { box-shadow: 0 0 0 14px rgba(255,92,122, 0.55); transform: translateX(-6px); }
        40%  { transform: translateX(6px); }
        60%  { box-shadow: 0 0 0 6px rgba(255,92,122, 0.20); transform: translateX(-3px); }
        100% { box-shadow: 0 0 0 0 rgba(255,92,122, 0); transform: scale(1); }
      }
      /* big "ผลคำตอบ" ribbon บน resultHost */
      .answer-banner {
        display: inline-block; padding: 6px 14px; border-radius: 8px;
        font-family: Orbitron, monospace; font-size: 12px; letter-spacing: .18em;
        font-weight: 800; margin-bottom: 8px;
      }
      .answer-banner.ok   { background:#7effb2; color:#012b16; }
      .answer-banner.bad  { background:#ff5c7a; color:#2a0010; }
      .answer-banner.warn { background:#ffcb6b; color:#2a1a00; }
    `;
    document.head.appendChild(s);
  }

  // ----- mark mount points to be hidden until submit -----
  function markStaged(){
    ['ebMount','ljMount','cgMount'].forEach(id => {
      const el = document.getElementById(id);
      if (el && !el.hasAttribute('data-stage-after-submit')){
        el.setAttribute('data-stage-after-submit', '');
      }
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    markStaged();
    // run again after a tick because mount divs may be inserted by inline scripts
    setTimeout(markStaged, 50);
    setTimeout(markStaged, 300);
  });

  // ----- enhance result feedback when content appears -----
  function watchResultHost(){
    const host = document.getElementById('resultHost');
    if (!host) return;
    const obs = new MutationObserver(() => {
      const card = host.querySelector('.card');
      if (!card) return;
      // ตัดสินจากคลาสว่าถูก/ผิด
      const isOk  = card.classList.contains('green') || card.textContent.includes('PASSED') || card.textContent.includes('✓');
      const isBad = card.classList.contains('red')   || card.textContent.includes('⚠')      || card.textContent.includes('ผิด');

      // ใส่ banner ใหญ่ถ้ายังไม่มี
      if (!card.querySelector('.answer-banner')){
        const b = document.createElement('div');
        b.className = 'answer-banner ' + (isOk ? 'ok' : isBad ? 'bad' : 'warn');
        b.textContent = isOk ? '✓ ตอบถูก' : isBad ? '✗ ยังไม่ใช่' : '— ส่งแล้ว';
        card.insertBefore(b, card.firstChild);
      }

      // flash + scroll
      card.classList.remove('answer-flash', 'wrong');
      void card.offsetWidth; // restart anim
      card.classList.add('answer-flash');
      if (!isOk && isBad) card.classList.add('wrong');
      setTimeout(() => card.scrollIntoView({behavior:'smooth', block:'center'}), 80);
    });
    obs.observe(host, { childList:true, subtree:true, characterData:true });
  }

  // ----- patch Submit.wirePair to broadcast event -----
  function patchSubmit(){
    if (!global.Submit || global.Submit._revealPatched) return;
    const orig = global.Submit.wirePair.bind(global.Submit);
    global.Submit.wirePair = function(opts){
      const wrappedOnSubmit = opts.onSubmit;
      const newOpts = Object.assign({}, opts, {
        onSubmit: function(tag, n){
          // run original first → resultHost gets populated
          try { wrappedOnSubmit && wrappedOnSubmit(tag, n); } catch(e){ console.warn(e); }
          const isPerfect = (tag === 'perfect');
          // dispatch event after a tick so DOM mutations land
          setTimeout(() => {
            document.dispatchEvent(new CustomEvent('cosmosLog:submitted', {
              detail: { tag, perfect:isPerfect, page: opts.page }
            }));
          }, 50);
        }
      });
      return orig(newOpts);
    };
    global.Submit._revealPatched = true;
  }
  // try patch repeatedly until Submit module loaded
  let tries = 0;
  const tryPatch = () => {
    patchSubmit();
    if (!global.Submit && tries++ < 40) setTimeout(tryPatch, 50);
  };
  document.addEventListener('DOMContentLoaded', () => {
    tryPatch();
    watchResultHost();
  });

  // ----- handle submit event: reveal sequence -----
  document.addEventListener('cosmosLog:submitted', (e) => {
    const perfect = e.detail && e.detail.perfect;
    const reveal = (id, delay) => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.classList.add('revealed');
      }, delay);
    };
    if (perfect){
      reveal('ebMount', 800);   // explain after correct answer
      reveal('ljMount', 1600);  // journal after explain
      reveal('cgMount', 2400);  // confidence last
    } else {
      // ตอบไม่ผ่าน · ให้ confidence อย่างเดียว · ยังลองใหม่ได้
      reveal('cgMount', 800);
    }
  });

  // ----- if a page has no Submit (story-only) reveal everything immediately after first interaction -----
  // (กิจกรรมแบบเรื่องเล่าที่ไม่มี submit-btn — ให้ reveal หลังจาก scroll หรือกด anywhere 1 วิ)
  document.addEventListener('DOMContentLoaded', () => {
    const hasSubmit = document.querySelector('.submit-btn');
    if (hasSubmit) return;
    const isStoryPage = ['p00','p01','p02','p03','p04','p11','p12','p14','p15','p16','p22','p25','p26'].includes(document.body.dataset.page);
    if (!isStoryPage) return;
    // story page: reveal CG after 4s · ให้เวลาอ่าน
    setTimeout(() => {
      ['ebMount','ljMount','cgMount'].forEach((id,i) => {
        const el = document.getElementById(id);
        if (el) setTimeout(() => el.classList.add('revealed'), i*400);
      });
    }, 4000);
  });

})(window);
