/* ═══════════════════════════════════════════════════════════════════
 * COSMOS LOG · Team Competition (Per-EP) · ดาราศาสตร์
 * ─────────────────────────────────────────────────────────────────
 * ระบบแข่งขันรายทีมแยกแต่ละ EP (ไม่สะสมข้าม EP)
 *   • cap 8 คน/ทีม/ห้อง · 6 ทีม · รวม 48 (เผื่อ 45 คน)
 *   • คะแนนทีม = sum(energy) ของสมาชิกในห้องเดียวกัน
 *   • ทีมชนะของแต่ละ EP ได้รางวัลจากครู
 *
 * ใช้ Apps Script endpoint เดิม (submit + list) · ไม่ต้อง deploy ใหม่
 * Sheets ที่จะถูกสร้าง auto:
 *   • Team_Roster_EP{n}  — รายชื่อสมาชิกแต่ละทีม (1 แถวต่อนักเรียน)
 *   • Team_Score_EP{n}   — คะแนนรวม EP นั้น (อัปเดตตอนจบ)
 *
 * Usage:
 *   <script src="../shared/team-comp.js"></script>
 *   await TeamComp.checkCapacity(1);
 *   await TeamComp.register(1, teamId, teamName, role);
 *   await TeamComp.submitFinalScore(1);
 *   const rank = await TeamComp.fetchRanking(1);
 * ═══════════════════════════════════════════════════════════════════ */
(function(global){
  'use strict';
  if (global.TeamComp && global.TeamComp._installed) return;

  const STU_KEY = 'wave_student';
  const CAP_PER_TEAM = 8;

  function _stu(){
    try { return JSON.parse(localStorage.getItem(STU_KEY) || 'null'); }
    catch(_){ return null; }
  }

  function _apiUrl(){
    return (global.KP_CONFIG && global.KP_CONFIG.apiUrl) || null;
  }

  async function _post(payload){
    const url = _apiUrl();
    if (!url) return { ok:false, reason:'no apiUrl' };
    try {
      const r = await fetch(url, {
        method:'POST', mode:'cors',
        headers:{'Content-Type':'text/plain;charset=utf-8'},
        body: JSON.stringify(payload)
      });
      if (!r.ok) throw new Error('HTTP '+r.status);
      const j = await r.json().catch(()=>({status:'ok'}));
      return { ok:true, data:j };
    } catch(e){ return { ok:false, reason:e.message }; }
  }

  async function _list(sheet){
    const url = _apiUrl();
    if (!url) return { ok:false, data:[] };
    try {
      const u = url + (url.includes('?') ? '&' : '?')
        + 'action=list&sheet=' + encodeURIComponent(sheet);
      const r = await fetch(u, { method:'GET', mode:'cors' });
      if (!r.ok) throw new Error('HTTP '+r.status);
      const j = await r.json();
      return { ok:true, data: (j && j.data) || [] };
    } catch(e){ return { ok:false, data:[], reason:e.message }; }
  }

  function _rosterSheet(ep){ return `Team_Roster_EP${ep}`; }
  function _scoreSheet(ep){  return `Team_Score_EP${ep}`;  }

  /**
   * ตรวจจำนวนสมาชิกแต่ละทีมในห้องของนักเรียนคนปัจจุบัน
   * @returns {Promise<{ok, counts: {[teamId]: n}, full: Set, total: number}>}
   */
  async function checkCapacity(ep){
    const stu = _stu();
    const cls = stu && stu.class || '';
    const r = await _list(_rosterSheet(ep));
    if (!r.ok) return { ok:false, counts:{}, full:new Set(), total:0 };
    // dedupe by student_id (เก็บแถวล่าสุดต่อ student)
    const latest = {};
    r.data.forEach(row => {
      const sid = String(row.student_id || '');
      if (!sid) return;
      if (cls && String(row.class||'') !== String(cls)) return; // เฉพาะห้องเดียวกัน
      const t = new Date(row.timestamp || 0).getTime();
      if (!latest[sid] || t > latest[sid]._t){ latest[sid] = { ...row, _t:t }; }
    });
    const counts = {};
    Object.values(latest).forEach(row => {
      const tid = String(row.team_id || '');
      if (!tid) return;
      counts[tid] = (counts[tid] || 0) + 1;
    });
    const full = new Set(Object.keys(counts).filter(k => counts[k] >= CAP_PER_TEAM));
    return { ok:true, counts, full, total:Object.values(counts).reduce((a,b)=>a+b,0), cap:CAP_PER_TEAM };
  }

  /**
   * ลงทะเบียนนักเรียนเข้าทีมสำหรับ EP นี้
   */
  async function register(ep, teamId, teamName, role){
    const stu = _stu();
    const payload = {
      action:'submit',
      sheet: _rosterSheet(ep),
      payload: {
        timestamp: new Date().toISOString(),
        ep,
        student_id: stu && stu.student_id || '',
        name: stu && stu.name || '',
        no: stu && stu.no || '',
        class: stu && stu.class || '',
        team_id: String(teamId),
        team_name: teamName || '',
        team_role: role || ''
      }
    };
    return _post(payload);
  }

  /**
   * อ่าน energy ปัจจุบันจาก engine ที่มี (Book สำหรับ EP01/02 · Photon สำหรับ EP03+)
   */
  function _currentEnergy(){
    // EP01/02 (G1/G1.5): Book.state.energy (สะสมข้าม EP · ใช้ snapshot diff)
    if (global.Book && global.Book.state && typeof global.Book.state.energy === 'number') return global.Book.state.energy;
    // EP03-06 (G2): Photon.get() (EP-aware key · snapshot=0 จะ ok)
    if (global.Photon && typeof global.Photon.get === 'function') return Number(global.Photon.get()) || 0;
    // EP07/08 (G3): KPA.economy().energy (EP-aware key เช่นกัน)
    if (global.KPA && typeof global.KPA.economy === 'function') {
      try { return Number(global.KPA.economy().energy) || 0; } catch(_){}
    }
    return 0;
  }

  /**
   * บันทึก snapshot energy ตอนเริ่ม EP (เรียกจากหน้าแรกของ EP)
   * ใช้คำนวณ "energy ที่ได้เฉพาะ EP นี้" = ตอนจบ - ตอนเริ่ม
   */
  function markEpStart(ep){
    const key = `cosmosLog_epStart_${ep}`;
    if (localStorage.getItem(key) != null) return; // mark ครั้งเดียวต่อ EP
    localStorage.setItem(key, String(_currentEnergy()));
  }

  function _epStart(ep){
    const v = localStorage.getItem(`cosmosLog_epStart_${ep}`);
    return v == null ? 0 : Number(v) || 0;
  }

  /**
   * ส่งคะแนนสุดท้ายของนักเรียนใน EP นี้ (เรียกที่หน้า Hall of Fame หรือก่อน journal)
   * คะแนน = energy ที่ได้เฉพาะ EP นี้ (ตอนจบ - snapshot ตอนเริ่ม)
   */
  /**
   * อ่าน team info จาก Book.state ถ้ามี · ไม่งั้นอ่านจาก localStorage `cosmosLog_state` ตรงๆ
   * (EP03+ อาจไม่โหลด book.js · แต่ teamId/Name ถูก save ตอน EP01 ใน localStorage แล้ว)
   */
  function _teamInfo(){
    if (global.Book && global.Book.state) {
      return {
        teamId: global.Book.state.teamId || '',
        teamName: global.Book.state.teamName || '',
        teamRole: global.Book.state.role || '',
        gates: global.Book.state.gates || {}
      };
    }
    try {
      const s = JSON.parse(localStorage.getItem('cosmosLog_state') || '{}');
      return {
        teamId: s.teamId || '',
        teamName: s.teamName || '',
        teamRole: s.role || '',
        gates: s.gates || {}
      };
    } catch(_){ return { teamId:'', teamName:'', teamRole:'', gates:{} }; }
  }

  async function submitFinalScore(ep){
    const stu = _stu();
    const energyNow = _currentEnergy();
    const energyStart = _epStart(ep);
    const energy = Math.max(0, energyNow - energyStart);
    const ti = _teamInfo();
    const teamId = ti.teamId, teamName = ti.teamName, teamRole = ti.teamRole;
    const completed = Object.keys(ti.gates).filter(k => ti.gates[k]).length;
    const payload = {
      action:'submit',
      sheet: _scoreSheet(ep),
      payload: {
        timestamp: new Date().toISOString(),
        ep,
        student_id: stu && stu.student_id || '',
        name: stu && stu.name || '',
        no: stu && stu.no || '',
        class: stu && stu.class || '',
        team_id: String(teamId),
        team_name: teamName,
        team_role: teamRole,
        energy,
        pages_completed: completed
      }
    };
    return _post(payload);
  }

  /**
   * ดึงอันดับทีมสำหรับ EP นี้ (เฉพาะห้องของนักเรียนปัจจุบัน)
   * คะแนนทีม = sum(energy) จากแถวล่าสุดต่อ student_id
   * @returns {Promise<{ok, ranking: [{teamId, teamName, score, members}]}>}
   */
  async function fetchRanking(ep){
    const stu = _stu();
    const cls = stu && stu.class || '';
    const r = await _list(_scoreSheet(ep));
    if (!r.ok) return { ok:false, ranking:[] };
    const latest = {};
    r.data.forEach(row => {
      const sid = String(row.student_id || '');
      if (!sid) return;
      if (cls && String(row.class||'') !== String(cls)) return;
      const t = new Date(row.timestamp || 0).getTime();
      if (!latest[sid] || t > latest[sid]._t){ latest[sid] = { ...row, _t:t }; }
    });
    const teams = {};
    Object.values(latest).forEach(row => {
      const tid = String(row.team_id || '');
      if (!tid) return;
      if (!teams[tid]) teams[tid] = { teamId:tid, teamName:row.team_name||('ทีม '+tid), score:0, members:0, memberList:[] };
      teams[tid].score += Number(row.energy || 0);
      teams[tid].members += 1;
      teams[tid].memberList.push({ name:row.name, no:row.no, energy:Number(row.energy||0) });
    });
    // เพิ่ม avg = score / members (ทีมไม่มีสมาชิก → 0)
    // เพื่อให้ทีมที่จำนวนคนต่างกันแข่งกันยุติธรรม
    Object.values(teams).forEach(t => {
      t.avg = t.members > 0 ? (t.score / t.members) : 0;
    });
    // sort default ยังคงใช้ score (sum) เพื่อ backward-compat กับ EP เดิม
    // EP ที่ต้องการ ranking แบบยุติธรรม ให้ sort ใหม่ด้วย .avg ตอน render
    const ranking = Object.values(teams).sort((a,b) => b.score - a.score);
    return { ok:true, ranking };
  }

  global.TeamComp = {
    checkCapacity, register, submitFinalScore, fetchRanking, markEpStart,
    CAP_PER_TEAM,
    _installed: true
  };

  // ─── Auto-snapshot energy ตอนเปิดหน้าแรกของ EP ─────────────────────
  // ตรวจ URL → ดึง EP number → ถ้ายังไม่ snapshot ก็ทำ
  function _autoSnapshot(){
    const m = location.pathname.match(/\/ep(\d+)\//i);
    if (!m) return;
    const ep = Number(m[1]);
    if (!ep) return;
    // รอ Book.state พร้อม
    let tries = 0;
    const tryMark = () => {
      tries++;
      const hasBook = !!(global.Book && global.Book.state);
      const hasPhoton = !!(global.Photon && global.Photon.get);
      const hasKPA = !!(global.KPA && global.KPA.economy);
      if (hasBook || hasPhoton || hasKPA) markEpStart(ep);
      else if (tries < 30) setTimeout(tryMark, 200);
      else markEpStart(ep); // fallback: snapshot 0
    };
    tryMark();
  }
  _autoSnapshot();

})(window);
