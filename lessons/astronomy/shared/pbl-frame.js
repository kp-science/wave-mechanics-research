/* ===== COSMOS LOG · PBL Frame =====
 * Wraps every EP07 page into 6-phase Problem-Based Learning cycle:
 *   1 ENCOUNTER · 2 ACTIVATE · 3 INVESTIGATE · 4 SOLVE · 5 REFLECT · 6 TRANSFER
 * Each phase logs to KPA + research stream + advances economy rewards.
 * Usage in page: PBL.init({ id, problem, activate, investigate, solve, reflect, transfer })
 */
(function(global){
  const PHASES = ['encounter','activate','investigate','solve','reflect','transfer'];

  const PBL = {
    _state: null,

    init(cfg){
      this._state = {
        id: cfg.id || (document.body && document.body.dataset.page) || 'unknown',
        cfg, phase: 'encounter',
        startedAt: Date.now(),
        attempts: 0, hints: 0,
        completedPhases: new Set()
      };
      this._render();
      this._enter('encounter');
    },

    _enter(p){
      const s = this._state; if (!s) return;
      s.phase = p; s.completedPhases.add(p);
      if (global.KPA) {
        KPA.research('pblPhase', { id:s.id, phase:p, attempts:s.attempts });
      }
      this._render();
    },

    advance(){
      const s = this._state; if (!s) return;
      const idx = PHASES.indexOf(s.phase);
      if (idx < PHASES.length - 1) this._enter(PHASES[idx+1]);
      else this._complete();
    },

    attempt(success, ctx){
      const s = this._state; if (!s) return;
      s.attempts++;
      if (global.KPA) {
        KPA.problem(s.id, s.attempts, success ? 'success' : 'fail', ctx||{});
        if (success && s.attempts === 1) KPA.addCoin(5, 'first-try-solve');
        else if (success && s.attempts === 2) KPA.addCoin(3, 'second-try-solve');
        else if (success) KPA.addCoin(1, 'multi-try-solve');
        else KPA.spendEnergy(1, 'fail-attempt');
      }
    },

    hint(){
      const s = this._state; if (!s) return;
      s.hints++;
      if (global.KPA) KPA.spendEnergy(1, 'hint-used');
    },

    _complete(){
      const s = this._state; if (!s) return;
      const dur = Date.now() - s.startedAt;
      if (global.KPA) {
        KPA.research('pblComplete', {
          id:s.id, durationMs:dur,
          attempts:s.attempts, hints:s.hints,
          phasesCompleted: [...s.completedPhases]
        });
        KPA.addCoin(3, 'pbl-complete');
        KPA.vpa(1, { kind:'pbl-cycle', summary:s.id });
      }
      this._render();
      window.dispatchEvent(new CustomEvent('pbl:complete', { detail:{ id:s.id, attempts:s.attempts } }));
    },

    _render(){
      const s = this._state; if (!s) return;
      let el = document.getElementById('pblFrame');
      if (!el) {
        el = document.createElement('div');
        el.id = 'pblFrame';
        el.className = 'pbl-frame';
        document.body.appendChild(el);
      }
      const labels = {
        encounter:'1·เผชิญปัญหา', activate:'2·ทบทวน', investigate:'3·สืบค้น',
        solve:'4·แก้ไข', reflect:'5·สะท้อน', transfer:'6·เชื่อมโลก'
      };
      el.innerHTML = '<div class="pbl-track">' + PHASES.map(p => {
        const done = s.completedPhases.has(p);
        const cur = s.phase === p;
        return `<span class="pbl-step ${done?'done':''} ${cur?'cur':''}">${labels[p]}</span>`;
      }).join('') + '</div>';
    }
  };

  // inject minimal CSS once
  function _css(){
    if (document.getElementById('pbl-frame-css')) return;
    const s = document.createElement('style');
    s.id = 'pbl-frame-css';
    s.textContent = `
      .pbl-frame{position:fixed;top:0;left:0;right:0;background:rgba(8,12,20,.92);
        backdrop-filter:blur(6px);border-bottom:1px solid #2a3a55;z-index:80;padding:6px 10px;font-size:12px;}
      .pbl-track{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;}
      .pbl-step{padding:3px 8px;border-radius:10px;border:1px solid #2a3a55;color:#7a8aa8;background:#11182a;}
      .pbl-step.done{color:#9be7c4;border-color:#2a6a4a;background:#0e2a1e;}
      .pbl-step.cur{color:#ffe48a;border-color:#a07a2a;background:#2a200e;
        box-shadow:0 0 0 2px rgba(255,180,60,.18);}
      body{padding-top:34px !important;}
    `;
    document.head.appendChild(s);
  }
  document.addEventListener('DOMContentLoaded', _css);

  global.PBL = PBL;
})(window);
