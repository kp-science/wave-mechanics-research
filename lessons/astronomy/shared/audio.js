/* ===== Audio · Web Audio API · No file needed ===== */
/* Default OFF · user must tap toggle on cover · saved in localStorage  */
/* Haptic fallback via navigator.vibrate                                */

(function(global){
  if (global.SFX) return;

  const KEY = 'cosmosLog_ep04_sfx';

  const SFX = {
    _ctx: null,
    _enabled: false,

    init() {
      this._enabled = (localStorage.getItem(KEY) === '1');
      this._injectToggle();
    },

    _ensureCtx() {
      if (!this._enabled) return null;
      if (!this._ctx) {
        try { this._ctx = new (window.AudioContext || window.webkitAudioContext)(); }
        catch { this._ctx = null; }
      }
      // resume on iOS
      if (this._ctx && this._ctx.state === 'suspended') this._ctx.resume();
      return this._ctx;
    },

    _injectToggle() {
      if (document.getElementById('sfxToggle')) return;
      const b = document.createElement('button');
      b.id = 'sfxToggle';
      b.textContent = this._enabled ? '🔊' : '🔇';
      b.title = 'เสียง · เปิด/ปิด';
      b.style.cssText = 'position:fixed;top:6px;left:8px;z-index:50;padding:6px 10px;min-height:32px;background:rgba(0,0,0,0.6);border:1px solid #2a3050;color:#9aa3c0;border-radius:8px;font-size:14px;cursor:pointer;font-family:inherit;backdrop-filter:blur(6px);';
      b.onclick = () => this.toggle();
      document.body.appendChild(b);
    },

    toggle() {
      this._enabled = !this._enabled;
      localStorage.setItem(KEY, this._enabled ? '1' : '0');
      const b = document.getElementById('sfxToggle');
      if (b) b.textContent = this._enabled ? '🔊' : '🔇';
      if (this._enabled) this.play('toggle');
    },

    isOn() { return this._enabled; },

    _vibrate(ms) { if (navigator.vibrate) navigator.vibrate(ms); },

    _tone({ freq=440, dur=0.18, type='sine', vol=0.18, slide=null, delay=0 }) {
      const ctx = this._ensureCtx();
      if (!ctx) return;
      const t0 = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0);
      if (slide) osc.frequency.exponentialRampToValueAtTime(slide, t0 + dur);
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0); osc.stop(t0 + dur + 0.05);
    },

    _noise({ dur=0.3, vol=0.12 }) {
      const ctx = this._ensureCtx();
      if (!ctx) return;
      const buf = ctx.createBuffer(1, ctx.sampleRate*dur, ctx.sampleRate);
      const ch = buf.getChannelData(0);
      for (let i=0; i<ch.length; i++) ch[i] = (Math.random()*2-1) * (1 - i/ch.length);
      const src = ctx.createBufferSource();
      const g = ctx.createGain();
      g.gain.value = vol;
      src.buffer = buf;
      src.connect(g).connect(ctx.destination);
      src.start();
    },

    play(kind) {
      switch(kind) {
        case 'correct':
          this._tone({ freq:880, dur:0.12, type:'sine', vol:0.15 });
          this._tone({ freq:1320, dur:0.18, type:'sine', vol:0.12, delay:0.1 });
          this._vibrate(20);
          break;
        case 'wrong':
          this._tone({ freq:220, dur:0.22, type:'square', vol:0.12 });
          this._vibrate([40, 20, 40]);
          break;
        case 'tap':
          this._tone({ freq:600, dur:0.06, type:'triangle', vol:0.1 });
          break;
        case 'snap':
          this._tone({ freq:1200, dur:0.1, type:'sine', vol:0.14 });
          this._vibrate(15);
          break;
        case 'charge':
          this._tone({ freq:90, dur:0.45, type:'sawtooth', vol:0.08, slide:130 });
          break;
        case 'hit':
          this._noise({ dur:0.32, vol:0.18 });
          this._tone({ freq:65, dur:0.4, type:'sine', vol:0.18, slide:40 });
          this._vibrate([60, 30, 60]);
          break;
        case 'box':
          this._tone({ freq:400, dur:0.5, type:'sine', vol:0.12, slide:1600 });
          this._vibrate(80);
          break;
        case 'toggle':
          this._tone({ freq:660, dur:0.08, type:'triangle', vol:0.1 });
          break;
        case 'transition':
          this._tone({ freq:200, dur:0.7, type:'sine', vol:0.1, slide:1000 });
          break;
      }
    },
  };

  global.SFX = SFX;
})(window);
