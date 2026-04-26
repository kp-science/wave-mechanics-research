/* ===== COSMOS LOG · Particle Simulation Engine ===== */

const PARTICLE_STYLES = {
  quark:         { color: '#ff5c7a', label: 'q',    size: 7,  name: 'ควาร์ก' },
  antiquark:     { color: '#ff8fa5', label: 'q̄',    size: 7,  name: 'แอนติควาร์ก' },
  electron:      { color: '#64d8ff', label: 'e⁻',   size: 6,  name: 'อิเล็กตรอน' },
  positron:      { color: '#ffcb6b', label: 'e⁺',   size: 6,  name: 'โพซิตรอน' },
  neutrino:      { color: '#9aa3c0', label: 'ν',    size: 4,  name: 'นิวทริโน' },
  antineutrino:  { color: '#6a7394', label: 'ν̄',    size: 4,  name: 'แอนตินิวทริโน' },
  photon:        { color: '#ffe09e', label: 'γ',    size: 5,  name: 'โฟตอน' },
  neutron:       { color: '#b5bed6', label: 'n',    size: 11, name: 'นิวตรอน' },
  proton:        { color: '#ff7a94', label: 'p⁺',   size: 11, name: 'โปรตอน (นิวเคลียส H)' },
  helium_nuc:    { color: '#b980ff', label: 'He²⁺', size: 16, name: 'นิวเคลียสฮีเลียม' },
  hydrogen_atom: { color: '#7effb2', label: 'H',    size: 14, name: 'อะตอมไฮโดรเจน' },
  helium_atom:   { color: '#a0e8ff', label: 'He',   size: 18, name: 'อะตอมฮีเลียม' },
  galaxy:        { color: '#d4b8ff', label: '🌀',   size: 48, name: 'กาแล็กซี' },
};

const ERA_DATA = {
  1: {
    label: '◦ ERA 1 · PLANCK / QUARK-LEPTON',
    title: 'ยุคแรกสุดของเอกภพ',
    meta: '10⁻⁴³ – 10⁻³² วินาที · 10³² – 10²⁷ เคลวิน',
    event: 'มีพลังงานเกิดขึ้น · อนุภาคพื้นฐานก่อตัวครั้งแรก',
    speed: 3.2,
    particles: ['quark','antiquark','electron','positron','neutrino','antineutrino'],
  },
  2: {
    label: '◦ ERA 2 · RADIATION',
    title: 'ยุคโฟตอนเริ่มปรากฏ',
    meta: '10⁻³² – 10⁻⁶ วินาที · 10²⁷ – 10¹³ เคลวิน',
    event: 'พลังงานเปลี่ยนเป็นสสาร-ปฏิสสาร · ทำลายกันเกิดโฟตอน',
    speed: 2.5,
    particles: ['quark','antiquark','electron','positron','neutrino','antineutrino','photon'],
  },
  3: {
    label: '◦ ERA 3 · NUCLEON',
    title: 'ยุคโปรตอนและนิวตรอนเกิด',
    meta: '10⁻⁶ วิ – 3 นาที · 10¹³ – 10⁹ เคลวิน',
    event: 'ควาร์กรวมตัวเป็นโปรตอน (นิวเคลียสไฮโดรเจน) และนิวตรอน',
    speed: 1.9,
    particles: ['electron','positron','neutrino','antineutrino','photon','neutron','proton'],
  },
  4: {
    label: '◦ ERA 4 · NUCLEOSYNTHESIS',
    title: 'ยุคสังเคราะห์นิวเคลียสฮีเลียม',
    meta: '3 นาที – 300,000 ปี · 10⁹ – 5,000 เคลวิน',
    event: 'โปรตอน-นิวตรอนรวมตัวเป็นนิวเคลียสฮีเลียม',
    speed: 1.3,
    particles: ['electron','neutrino','photon','neutron','proton','helium_nuc'],
  },
  5: {
    label: '◦ ERA 5 · RECOMBINATION',
    title: 'ยุคอะตอมเป็นกลาง · CMB เกิด',
    meta: '300,000 – 1,000 ล้านปี · 5,000 – 100 เคลวิน',
    event: 'นิวเคลียสดึงอิเล็กตรอน → อะตอมเป็นกลาง · เอกภพโปร่งแสง · โฟตอนอิสระ (= CMB)',
    speed: 0.8,
    particles: ['neutrino','photon','hydrogen_atom','helium_atom'],
  },
  6: {
    label: '◦ ERA 6 · PRESENT · GALAXY',
    title: 'ยุคกาแล็กซี · ปัจจุบัน',
    meta: '1,000 – 13,800 ล้านปี · 100 – 2.73 เคลวิน',
    event: 'แรงโน้มถ่วงรวมสสาร → เนบิวลา → ดาวฤกษ์ → กาแล็กซี',
    speed: 0.4,
    particles: ['neutrino','photon','galaxy'],
  },
};

const ALL_PARTICLE_ORDER = [
  'quark','antiquark','electron','positron','neutrino','antineutrino',
  'photon','neutron','proton','helium_nuc','hydrogen_atom','helium_atom','galaxy'
];

const ParticleSim = {
  particles: [], raf: null, eraId: null, canvas: null, ctx: null,

  start(canvasEl, eraId) {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext('2d');
    this.eraId = eraId;
    this.init(ERA_DATA[eraId]);
    this.loop();
  },

  stop() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = null;
  },

  init(data) {
    this.particles = [];
    const cv = this.canvas;
    data.particles.forEach(type => {
      const s = PARTICLE_STYLES[type];
      let count = 14;
      if (s.size > 13) count = 6;
      if (type === 'galaxy') count = 4;
      if (type === 'neutrino' || type === 'antineutrino') count = 20;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = data.speed * (0.5 + Math.random() * 0.8);
        this.particles.push({
          type,
          x: Math.random() * cv.width,
          y: Math.random() * cv.height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.05,
        });
      }
    });
  },

  loop() {
    const cv = this.canvas;
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(3, 4, 12, 0.25)';
    ctx.fillRect(0, 0, cv.width, cv.height);
    this.particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > cv.width) p.vx *= -1;
      if (p.y < 0 || p.y > cv.height) p.vy *= -1;
      p.rot += p.vr;
      this.draw(ctx, p);
    });
    this.raf = requestAnimationFrame(() => this.loop());
  },

  draw(ctx, p) {
    const s = PARTICLE_STYLES[p.type];
    if (p.type === 'galaxy') {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      for (let i = 0; i < 40; i++) {
        const t = i / 40;
        const r = t * s.size;
        const a = t * Math.PI * 4;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * r, Math.sin(a) * r, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 184, 255, ${1 - t * 0.7})`;
        ctx.fill();
      }
      ctx.restore();
      return;
    }
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, s.size * 2.2);
    grad.addColorStop(0, s.color + 'cc');
    grad.addColorStop(1, s.color + '00');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(p.x, p.y, s.size * 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = s.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, s.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#05060f';
    ctx.font = `bold ${Math.max(8, s.size)}px 'Space Grotesk', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(s.label, p.x, p.y + 0.5);
  }
};
