/* ===== COSMOS LOG · TIMELINE-VIZ =====
 * Cinematic FX library + 4-epoch timeline visualization
 * ใช้ใน EP08 page p05-p09 (epoch intro) + boss phase transitions
 *
 * API:
 *   TimelineViz.epochRibbon(host, currentEpoch)   -- SVG ribbon 4 epochs
 *   TimelineViz.epochCard(host, epochId)          -- single epoch big card
 *   FX.inflationBurst(canvas, x, y, opts)
 *   FX.cmbShower(canvas, opts)
 *   FX.nucleusFormation(canvas, x, y, opts)
 *   FX.starIgnition(canvas, x, y, opts)
 *   FX.galaxySpin(canvas, x, y, opts)
 *   FX.voidTendrilSlash(canvas, x1, y1, x2, y2, opts)
 *   FX.screenShake(el, intensity, ms)
 *   FX.slowMotion(scale, ms, cb)
 *   FX.bigBangFinale(canvas, opts)
 */
(function(global){
  const EPOCHS = [
    { id:1, key:'inflation',     name:'INFLATION',       th:'พองตัว',          time:'10⁻³⁶ s',  color:'#ff6ab8', desc:'อวกาศขยาย 10²⁶ เท่า' },
    { id:2, key:'nucleosynth',   name:'NUCLEOSYNTHESIS', th:'สังเคราะห์ธาตุ',  time:'3 นาที',   color:'#ff8a3d', desc:'H · He · Li ก่อตัว' },
    { id:3, key:'cmb',           name:'RECOMBINATION',   th:'ปลดปล่อย CMB',    time:'380 kyr',  color:'#ffd84a', desc:'อะตอมเกิด · CMB หลุด' },
    { id:4, key:'galaxies',      name:'STRUCTURE',       th:'กาแล็กซีก่อตัว',   time:'1 Gyr',    color:'#6a3aff', desc:'ดาว → กาแล็กซี → จักรวาลที่เห็น' }
  ];

  const TimelineViz = {
    EPOCHS,

    /** เรนเดอร์ ribbon แนวนอน 4 epoch · current ตำแหน่งจะ glow */
    epochRibbon(host, currentEpoch){
      if (!host) return;
      host.innerHTML = '';
      const wrap = document.createElement('div');
      wrap.className = 'tl-ribbon';
      EPOCHS.forEach((e, i) => {
        const node = document.createElement('div');
        node.className = 'tl-node ' + (e.id === currentEpoch ? 'active' : (e.id < currentEpoch ? 'done' : ''));
        node.style.setProperty('--ec', e.color);
        node.innerHTML = `
          <div class="tl-dot">${e.id}</div>
          <div class="tl-meta">
            <div class="tl-name">${e.name}</div>
            <div class="tl-time">${e.time}</div>
          </div>
        `;
        wrap.appendChild(node);
        if (i < EPOCHS.length - 1) {
          const seg = document.createElement('div');
          seg.className = 'tl-seg ' + (e.id < currentEpoch ? 'done' : '');
          wrap.appendChild(seg);
        }
      });
      host.appendChild(wrap);
      this._injectRibbonCSS();
    },

    /** การ์ดเดี่ยว epoch · ใช้ในหน้าแนะนำ epoch */
    epochCard(host, epochId){
      const e = EPOCHS.find(x => x.id === epochId);
      if (!host || !e) return;
      const card = document.createElement('div');
      card.className = 'tl-card';
      card.style.setProperty('--ec', e.color);
      card.innerHTML = `
        <div class="tl-card-num">${e.id}</div>
        <div class="tl-card-time">⏰ ${e.time}</div>
        <h2 class="tl-card-name">${e.name}</h2>
        <div class="tl-card-th">${e.th}</div>
        <p class="tl-card-desc">${e.desc}</p>
        <div class="tl-card-svg">${this._epochSVG(e.key)}</div>
      `;
      host.appendChild(card);
      this._injectRibbonCSS();
    },

    /** SVG cinematic per epoch (static, decorative) */
    _epochSVG(key){
      if (key === 'inflation') {
        return `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
          <defs><radialGradient id="ig1"><stop offset="0%" stop-color="#fff"/><stop offset="40%" stop-color="#ff6ab8"/><stop offset="100%" stop-color="#3a0a3a" stop-opacity="0"/></radialGradient></defs>
          <rect width="400" height="200" fill="#050108"/>
          <g><circle cx="200" cy="100" r="6" fill="url(#ig1)"><animate attributeName="r" from="6" to="180" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" from="1" to="0" dur="2s" repeatCount="indefinite"/></circle></g>
          <circle cx="200" cy="100" r="3" fill="#fff"/>
          <text x="200" y="190" fill="#ff6ab8" font-size="11" text-anchor="middle">10⁻³⁶ s · expand 10²⁶×</text>
        </svg>`;
      }
      if (key === 'nucleosynth') {
        return `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="200" fill="#0a0410"/>
          <g><circle cx="120" cy="100" r="10" fill="#ff8a3d"/><circle cx="120" cy="100" r="22" fill="none" stroke="#ff8a3d" stroke-opacity=".4"/>
            <circle cx="142" cy="100" r="4" fill="#fff"><animateTransform attributeName="transform" type="rotate" from="0 120 100" to="360 120 100" dur="3s" repeatCount="indefinite"/></circle>
            <circle cx="98" cy="100" r="4" fill="#fff" opacity=".7"><animateTransform attributeName="transform" type="rotate" from="180 120 100" to="540 120 100" dur="3s" repeatCount="indefinite"/></circle>
          </g>
          <text x="120" y="160" fill="#ff8a3d" font-size="14" text-anchor="middle">H</text>
          <g transform="translate(220,100)"><circle r="14" fill="#ffd84a"/><circle r="6" cx="-6" cy="-2" fill="#fff"/><circle r="6" cx="6" cy="2" fill="#fff" opacity=".8"/></g>
          <text x="220" y="160" fill="#ffd84a" font-size="14" text-anchor="middle">He</text>
          <g transform="translate(310,100)"><circle r="16" fill="#ff6ab8"/></g>
          <text x="310" y="160" fill="#ff6ab8" font-size="14" text-anchor="middle">Li</text>
          <text x="200" y="190" fill="#ff8a3d" font-size="11" text-anchor="middle">3 minutes · first nuclei</text>
        </svg>`;
      }
      if (key === 'cmb') {
        return `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
          <defs><radialGradient id="cmb1"><stop offset="0%" stop-color="#ffd84a"/><stop offset="100%" stop-color="#3a2a08"/></radialGradient></defs>
          <rect width="400" height="200" fill="url(#cmb1)" opacity=".7"/>
          <g opacity=".7">
            ${Array.from({length:30}).map(()=>{const x=Math.random()*400;const y=Math.random()*200;const r=Math.random()*3+1;return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/>`;}).join('')}
          </g>
          <text x="200" y="105" fill="#050108" font-size="22" text-anchor="middle" font-weight="800">2.73 K</text>
          <text x="200" y="125" fill="#050108" font-size="11" text-anchor="middle">CMB · 380,000 yr</text>
        </svg>`;
      }
      if (key === 'galaxies') {
        return `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="200" fill="#050108"/>
          <g transform="translate(200,100)">
            <ellipse rx="80" ry="22" fill="none" stroke="#6a3aff" stroke-width="2" opacity=".6" transform="rotate(20)"/>
            <ellipse rx="60" ry="16" fill="none" stroke="#6a3aff" stroke-width="2" opacity=".5" transform="rotate(-10)"/>
            <circle r="8" fill="#fff5e3"/>
            ${Array.from({length:50}).map(()=>{const a=Math.random()*Math.PI*2;const r=Math.random()*80;return `<circle cx="${Math.cos(a)*r}" cy="${Math.sin(a)*r*0.4}" r="${Math.random()*1.2+0.4}" fill="#fff"/>`;}).join('')}
          </g>
          <text x="200" y="190" fill="#6a3aff" font-size="11" text-anchor="middle">1 Gyr · structure formation</text>
        </svg>`;
      }
      return '';
    },

    _injectRibbonCSS(){
      if (document.getElementById('tl-ribbon-css')) return;
      const s = document.createElement('style');
      s.id = 'tl-ribbon-css';
      s.textContent = `
        .tl-ribbon{display:flex;align-items:center;justify-content:space-between;
          background:rgba(5,1,8,.6);border:1px solid rgba(255,216,74,.2);
          border-radius:12px;padding:12px;margin:14px 0;flex-wrap:wrap;gap:6px;}
        .tl-node{display:flex;align-items:center;gap:8px;flex:1;min-width:120px;opacity:.45;transition:all .3s;}
        .tl-node.done{opacity:.7;}
        .tl-node.active{opacity:1;transform:scale(1.05);}
        .tl-dot{width:36px;height:36px;border-radius:50%;background:var(--ec);
          color:#050108;font-weight:800;display:flex;align-items:center;justify-content:center;
          box-shadow:0 0 14px var(--ec);}
        .tl-node.active .tl-dot{box-shadow:0 0 28px var(--ec),0 0 6px #fff inset;}
        .tl-meta{display:flex;flex-direction:column;}
        .tl-name{font-size:12px;font-weight:700;color:var(--ec);}
        .tl-time{font-size:10px;color:#9bb;}
        .tl-seg{flex:0 0 12px;height:2px;background:rgba(255,255,255,.15);align-self:center;}
        .tl-seg.done{background:linear-gradient(90deg,#ffd84a,#6a3aff);}
        .tl-card{background:#0a0410;border:1px solid var(--ec);border-radius:14px;
          padding:18px;text-align:center;box-shadow:0 0 26px var(--ec)33;}
        .tl-card-num{font-size:42px;color:var(--ec);font-weight:800;line-height:1;}
        .tl-card-time{color:#9bb;font-size:13px;margin-bottom:6px;}
        .tl-card-name{color:var(--ec);font-size:24px;letter-spacing:.06em;margin:4px 0;}
        .tl-card-th{color:#fff5e3;font-size:16px;margin-bottom:6px;}
        .tl-card-desc{color:#cbd;font-size:14px;}
        .tl-card-svg{margin-top:10px;border-radius:10px;overflow:hidden;background:#000;}
        .tl-card-svg svg{width:100%;height:auto;display:block;}
      `;
      document.head.appendChild(s);
    }
  };

  /* =====================================================================
   * FX Library · canvas action effects
   * Each FX returns a tick function · FX layer manages animation loop
   * ===================================================================== */
  function _ctx(canvas){ return canvas.getContext('2d'); }

  const FX = {
    /** central FX manager */
    _list: [],
    _running: false,
    _last: 0,
    timeScale: 1,
    _shake: { intensity:0, until:0, host:null },

    attach(canvas){
      this._canvas = canvas;
      this._start();
    },

    add(effect){
      this._list.push(effect);
      if (!this._running) this._start();
    },

    _start(){
      if (this._running) return;
      this._running = true;
      this._last = performance.now();
      const loop = (now) => {
        const dt = Math.min(64, now - this._last) * this.timeScale;
        this._last = now;
        this._tick(dt);
        if (this._running) requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    },

    stop(){ this._running = false; },

    clear(){ this._list = []; },

    _tick(dt){
      if (!this._canvas) return;
      const ctx = _ctx(this._canvas);
      const w = this._canvas.width, h = this._canvas.height;

      // shake offset
      let sx = 0, sy = 0;
      if (performance.now() < this._shake.until){
        sx = (Math.random()-.5) * this._shake.intensity;
        sy = (Math.random()-.5) * this._shake.intensity;
      }
      ctx.save();
      ctx.translate(sx, sy);

      // step + draw all effects
      for (let i = this._list.length - 1; i >= 0; i--){
        const e = this._list[i];
        e.age += dt;
        if (e.age >= e.life){ this._list.splice(i, 1); continue; }
        try { e.draw(ctx, e.age, w, h); } catch(err){ this._list.splice(i,1); }
      }
      ctx.restore();
    },

    /** ระเบิดขยายแบบ inflation · ring + flash */
    inflationBurst(x, y, opts={}){
      const color = opts.color || '#ff6ab8';
      const maxR = opts.maxR || 600;
      const life = opts.life || 1400;
      this.add({
        age:0, life,
        draw(ctx, age){
          const t = age / life;
          const r = 6 + t * maxR;
          const a = Math.max(0, 1 - t);
          ctx.globalAlpha = a;
          ctx.lineWidth = 4 + (1-t)*8;
          ctx.strokeStyle = color;
          ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.stroke();
          // inner flash
          const grad = ctx.createRadialGradient(x, y, 0, x, y, r*0.6);
          grad.addColorStop(0, 'rgba(255,255,255,'+ (a*.7) +')');
          grad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = grad;
          ctx.beginPath(); ctx.arc(x, y, r*0.6, 0, Math.PI*2); ctx.fill();
          ctx.globalAlpha = 1;
        }
      });
      this.screenShake(8, 250);
    },

    /** ฝนทอง CMB ตกทั่วจอ */
    cmbShower(opts={}){
      const count = opts.count || 180;
      const life = opts.life || 3500;
      const w = (this._canvas && this._canvas.width) || 800;
      const h = (this._canvas && this._canvas.height) || 500;
      const drops = Array.from({length: count}).map(()=>({
        x: Math.random()*w, y: -Math.random()*h*0.5,
        vy: 0.05 + Math.random()*0.18,
        r: Math.random()*2 + 0.5,
        hue: 40 + Math.random()*20
      }));
      this.add({
        age:0, life,
        draw(ctx, age, W, H){
          const t = age / life;
          const a = Math.max(0, 1 - t*0.8);
          ctx.globalAlpha = a;
          drops.forEach(d => {
            d.y += d.vy * 16;
            if (d.y > H) d.y = -10;
            ctx.fillStyle = `hsl(${d.hue}, 100%, 70%)`;
            ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI*2); ctx.fill();
          });
          ctx.globalAlpha = 1;
        }
      });
    },

    /** การก่อตัวนิวเคลียส · 2 อนุภาควนเข้ามาชน */
    nucleusFormation(x, y, opts={}){
      const life = opts.life || 1200;
      const color = opts.color || '#ffd84a';
      this.add({
        age:0, life,
        draw(ctx, age){
          const t = age / life;
          const r = 30 * (1 - t);
          const ang = age * 0.012;
          ctx.fillStyle = color;
          ctx.beginPath(); ctx.arc(x + Math.cos(ang)*r, y + Math.sin(ang)*r, 4, 0, Math.PI*2); ctx.fill();
          ctx.fillStyle = '#fff';
          ctx.beginPath(); ctx.arc(x - Math.cos(ang)*r, y - Math.sin(ang)*r, 4, 0, Math.PI*2); ctx.fill();
          if (t > 0.85){
            const a = (t-0.85)/0.15;
            ctx.globalAlpha = 1-a;
            ctx.fillStyle = '#fff';
            ctx.beginPath(); ctx.arc(x, y, 14*a + 4, 0, Math.PI*2); ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
      });
    },

    /** ดาวติดไฟ · จุด→วงสว่าง+lens flare */
    starIgnition(x, y, opts={}){
      const life = opts.life || 1500;
      const color = opts.color || '#fff5e3';
      this.add({
        age:0, life,
        draw(ctx, age){
          const t = age / life;
          const r = 2 + t * 40;
          const a = 1 - t;
          ctx.globalAlpha = a;
          // core
          ctx.fillStyle = color;
          ctx.beginPath(); ctx.arc(x, y, r*0.4, 0, Math.PI*2); ctx.fill();
          // halo
          const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
          grad.addColorStop(0, color);
          grad.addColorStop(0.4, 'rgba(255,216,74,0.6)');
          grad.addColorStop(1, 'rgba(255,216,74,0)');
          ctx.fillStyle = grad;
          ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
          // cross flare
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x - r*1.4, y); ctx.lineTo(x + r*1.4, y);
          ctx.moveTo(x, y - r*1.4); ctx.lineTo(x, y + r*1.4);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });
    },

    /** กาแล็กซีหมุน · spiral arms 4 รอบ */
    galaxySpin(x, y, opts={}){
      const life = opts.life || 2400;
      const color = opts.color || '#6a3aff';
      this.add({
        age:0, life,
        draw(ctx, age){
          const t = age / life;
          const ang0 = age * 0.005;
          const a = Math.min(1, t*4) * (1 - t*0.6);
          ctx.globalAlpha = a;
          ctx.fillStyle = '#fff5e3';
          ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI*2); ctx.fill();
          for (let arm = 0; arm < 4; arm++){
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let i = 0; i < 80; i++){
              const r = i * 0.9;
              const a2 = ang0 + arm * (Math.PI/2) + i * 0.08;
              const px = x + Math.cos(a2) * r;
              const py = y + Math.sin(a2) * r * 0.4;
              if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
        }
      });
    },

    /** เงา VOID ฟัน · sine wave dark line */
    voidTendrilSlash(x1, y1, x2, y2, opts={}){
      const life = opts.life || 700;
      this.add({
        age:0, life,
        draw(ctx, age){
          const t = age / life;
          const a = 1 - t;
          ctx.globalAlpha = a;
          ctx.strokeStyle = '#0a0010';
          ctx.lineWidth = 8 + a*8;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          const segs = 12;
          for (let i = 1; i <= segs; i++){
            const ix = x1 + (x2-x1)*(i/segs);
            const iy = y1 + (y2-y1)*(i/segs) + Math.sin(i * 0.8 + age*0.02) * 12;
            ctx.lineTo(ix, iy);
          }
          ctx.stroke();
          // pink edge
          ctx.strokeStyle = '#ff6ab8';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });
    },

    /** ปะทะ · particle burst */
    impactBurst(x, y, opts={}){
      const life = opts.life || 600;
      const count = opts.count || 14;
      const color = opts.color || '#ffd84a';
      const parts = Array.from({length:count}).map(()=>({
        ang: Math.random()*Math.PI*2,
        sp: 1 + Math.random()*3,
        r: 1 + Math.random()*2
      }));
      this.add({
        age:0, life,
        draw(ctx, age){
          const t = age / life;
          ctx.globalAlpha = 1 - t;
          ctx.fillStyle = color;
          parts.forEach(p => {
            const px = x + Math.cos(p.ang) * p.sp * age * 0.08;
            const py = y + Math.sin(p.ang) * p.sp * age * 0.08;
            ctx.beginPath(); ctx.arc(px, py, p.r * (1-t), 0, Math.PI*2); ctx.fill();
          });
          ctx.globalAlpha = 1;
        }
      });
    },

    /** screen shake */
    screenShake(intensity, ms){
      this._shake.intensity = intensity;
      this._shake.until = performance.now() + ms;
    },

    /** slow motion · ใช้ก่อน finisher */
    slowMotion(scale, ms, cb){
      const old = this.timeScale;
      this.timeScale = scale;
      setTimeout(() => {
        this.timeScale = old;
        if (cb) cb();
      }, ms);
    },

    /** Big Bang finisher · whitewash + delayed star reveal */
    bigBangFinale(opts={}){
      const life = opts.life || 4000;
      const onCaption = opts.onCaption || (()=>{});
      this.add({
        age:0, life,
        draw(ctx, age, W, H){
          const t = age / life;
          if (t < 0.25){
            // whiteout
            const a = t / 0.25;
            ctx.fillStyle = `rgba(255,255,255,${a})`;
            ctx.fillRect(0, 0, W, H);
          } else if (t < 0.55){
            ctx.fillStyle = `rgba(255,255,255,1)`;
            ctx.fillRect(0, 0, W, H);
          } else {
            const a = 1 - (t - 0.55)/0.45;
            ctx.fillStyle = `rgba(255,255,255,${a})`;
            ctx.fillRect(0, 0, W, H);
          }
        }
      });
      setTimeout(onCaption, life * 0.55);
      this.screenShake(20, life * 0.4);
    }
  };

  global.TimelineViz = TimelineViz;
  global.GenesisFX = FX;
})(window);
