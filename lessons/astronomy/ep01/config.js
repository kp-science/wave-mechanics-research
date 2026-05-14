/* ===== COSMOS LOG · EP01 Config (สำหรับ resume-picker) =====
 * EP01 page list · sync กับ PAGES const ใน shared/book.js (source of truth)
 * ใช้เฉพาะหน้า index.html เพื่อแสดง resume picker (book.js ยังคุม navigation บน page อื่นๆ)
 */
window.EP_CONFIG = {
  id: 'ep01',
  title: 'The Collision · กำเนิดเอกภพ',
  subtitle: 'EP01 · Big Bang + CMB',
  badge: { icon: '💥', name: 'Big Bang Witness' },
  duration: 100,
  indicator: 'ว 7.1 ม.4-6/1',

  pages: [
    { id:'p01',  file:'p01-pretest.html',     title:'Entry Ticket · Pre-test',         type:'puzzle',     time:3 },
    { id:'p02',  file:'p02-team.html',        title:'เลือกทีม',                          type:'setup',      time:2 },
    { id:'p03',  file:'p03-collision.html',   title:'การปะทะ',                          type:'story',      time:3 },
    { id:'p04',  file:'p04-debris.html',      title:'วิเคราะห์ซาก',                       type:'puzzle',     time:7 },
    { id:'p05',  file:'p05-age.html',         title:'แสงอายุ 13.8B',                     type:'story',      time:2 },
    { id:'p06',  file:'p06-research.html',    title:'ค้น CMB',                          type:'puzzle',     time:8 },
    { id:'p07',  file:'p07-cmb.html',         title:'นี่คือ CMB',                         type:'story',      time:2 },
    { id:'p08',  file:'p08-arrive.html',      title:'ถึงสถานี A',                         type:'story',      time:2 },
    { id:'p09',  file:'p09-balloon.html',     title:'ลูกโป่งเอกภพ',                       type:'puzzle',     time:20 },
    { id:'p10',  file:'p10-hubble.html',      title:'ดร.ฮับเบิล · บิกแบง',                 type:'story',      time:5 },
    { id:'p11',  file:'p11-timeline.html',    title:'6 ยุคอนุภาค',                        type:'puzzle',     time:10 },
    { id:'p12',  file:'p12-galaxy.html',      title:'Galaxy A หายไปไหน',                 type:'story',      time:2 },
    { id:'p13',  file:'p13-shiplock.html',    title:'Ship Coordinate Lock',             type:'puzzle',     time:8 },
    { id:'p14',  file:'p14-void.html',        title:'VOID โผล่',                         type:'mixed',      time:8 },
    { id:'p15',  file:'p15-warp.html',        title:'วาร์ป',                              type:'story',      time:3 },
    { id:'p16',  file:'p16-review.html',      title:'รีวิวหนัง · เรียงฉาก',                 type:'puzzle',     time:7 },
    { id:'p17',  file:'p17-exercise.html',    title:'แบบฝึกหัด · Bloom',                   type:'puzzle',     time:10 },
    { id:'p18',  file:'p18-posttest.html',    title:'Post-test · วัดหลัง EP01',            type:'puzzle',     time:5 },
    { id:'p18b', file:'p18b-halloffame.html', title:'🏆 Hall of Fame · ทีมชนะ',            type:'reflection', time:3 },
    { id:'p19',  file:'p27-journal.html',     title:'Exit · 3-2-1 Journal',              type:'reflection', time:5 },
  ],
};
