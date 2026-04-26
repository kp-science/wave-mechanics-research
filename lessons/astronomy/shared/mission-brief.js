/* ===== Mission Briefing · auto-inject component ===== */
/* Page sets <div data-mission-brief></div> · component reads          */
/* EP_CONFIG.briefings[pageId] and renders briefing card               */
/* Alternates VOID Hint and LEMAITRE Brief style based on data type    */

(function(global){
  if (global.MissionBrief) return;

  const MissionBrief = {
    init() {
      const slot = document.querySelector('[data-mission-brief]');
      if (!slot) return;
      const pageId = (document.body && document.body.dataset.page);
      if (!pageId) return;
      const briefs = (global.EP_CONFIG && global.EP_CONFIG.briefings) || {};
      const b = briefs[pageId];
      if (!b) return;
      slot.innerHTML = this._render(b);
    },

    _render(b) {
      // b = { type:'void'|'leader', taunt/brief, goal, criteria:[], time, reward }
      const isVoid = b.type === 'void';
      const headerColor = isVoid ? '#ff5c7a' : '#64d8ff';
      const headerBg = isVoid ? 'rgba(255,92,122,0.08)' : 'rgba(100,216,255,0.08)';
      const speaker = isVoid ? '👁️ VOID HINT' : '🤖 LEMAÎTRE BRIEFING';
      const taunt = b.taunt || b.brief || '';

      return `
      <div class="mission-brief" style="
        margin:14px 0; padding:18px; border-radius:14px;
        background:linear-gradient(160deg, ${headerBg}, rgba(0,0,0,0.3));
        border:2px solid ${headerColor};
        box-shadow:0 0 20px ${headerColor}33;">

        <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
          <span style="font-family:Orbitron,sans-serif; font-size:11px; letter-spacing:0.2em; color:${headerColor}; font-weight:700;">${speaker}</span>
          <span style="flex:1; height:1px; background:${headerColor}; opacity:0.4;"></span>
          <span style="font-family:Orbitron,monospace; font-size:10px; color:#9aa3c0; letter-spacing:0.1em;">MISSION ${b.no || ''}</span>
        </div>

        <div style="font-size:15.5px; line-height:1.7; color:${isVoid?'#ffb5c2':'#a0e8ff'}; ${isVoid?'font-style:italic;':''} padding:8px 12px; border-left:3px solid ${headerColor}; background:rgba(0,0,0,0.25); border-radius:0 8px 8px 0; margin-bottom:14px;">
          ${taunt}
        </div>

        <div style="margin:10px 0;">
          <div style="font-family:Orbitron,sans-serif; font-size:10px; letter-spacing:0.18em; color:#ffcb6b; margin-bottom:4px;">🎯 GOAL</div>
          <div style="font-size:14.5px; color:#ffe2a8; font-weight:700; line-height:1.5;">${b.goal || ''}</div>
        </div>

        ${b.criteria && b.criteria.length ? `
          <div style="margin:12px 0;">
            <div style="font-family:Orbitron,sans-serif; font-size:10px; letter-spacing:0.18em; color:#7effb2; margin-bottom:6px;">✅ SUCCESS CRITERIA</div>
            <ul style="padding-left:18px; margin:0; color:#bcffd6; font-size:13.5px; line-height:1.7;">
              ${b.criteria.map(c => `<li>${c}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <div style="display:flex; gap:14px; margin-top:12px; padding-top:10px; border-top:1px dashed rgba(120,140,220,0.3); font-size:12px; color:#9aa3c0;">
          ${b.time ? `<span>⏱ <b style="color:#e8ecf8;">${b.time}</b></span>` : ''}
          ${b.reward ? `<span>🎁 <b style="color:#ffcb6b;">${b.reward}</b></span>` : ''}
        </div>
      </div>
      `;
    },
  };

  global.MissionBrief = MissionBrief;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MissionBrief.init());
  } else {
    setTimeout(() => MissionBrief.init(), 50);
  }
})(window);
