/* ===== Starfield · canvas BG ===== */
/* Auto-inject canvas behind body content · low CPU                    */
/* Uses setInterval(16) per EP03 gotcha (rAF doesn't fire in iframe)    */

(function(global){
  if (global.Starfield && global.Starfield._started) return;

  const Starfield = {
    _started: false,
    _canvas: null,
    _ctx: null,
    _stars: [],
    _w: 0, _h: 0,

    init(opts={}) {
      if (this._started) return;
      this._started = true;
      const c = document.createElement('canvas');
      c.id = 'starfieldCanvas';
      c.style.cssText = 'position:fixed;inset:0;z-index:-1;pointer-events:none;background:#02030a;';
      document.body.insertBefore(c, document.body.firstChild);
      this._canvas = c;
      this._ctx = c.getContext('2d');
      this._resize();
      window.addEventListener('resize', () => this._resize());
      this._spawn(opts.count || 80);
      this._loop();
    },

    _resize() {
      this._w = this._canvas.width = window.innerWidth;
      this._h = this._canvas.height = window.innerHeight;
    },

    _spawn(n) {
      this._stars = [];
      for (let i=0; i<n; i++) {
        this._stars.push({
          x: Math.random()*this._w,
          y: Math.random()*this._h,
          r: Math.random()*1.4 + 0.2,
          vy: Math.random()*0.15 + 0.05,
          a: Math.random()*0.6 + 0.2,
          tw: Math.random()*Math.PI*2,
        });
      }
    },

    _loop() {
      const tick = () => {
        const ctx = this._ctx;
        ctx.fillStyle = 'rgba(2,3,10,0.35)';
        ctx.fillRect(0, 0, this._w, this._h);
        const t = Date.now()*0.002;
        for (const s of this._stars) {
          s.y += s.vy;
          if (s.y > this._h) { s.y = -2; s.x = Math.random()*this._w; }
          const a = s.a * (0.7 + 0.3*Math.sin(s.tw + t));
          ctx.fillStyle = `rgba(180,200,255,${a})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
          ctx.fill();
        }
      };
      setInterval(tick, 16);
    },
  };

  global.Starfield = Starfield;
})(window);
