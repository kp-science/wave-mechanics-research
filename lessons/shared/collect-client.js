/* ═══════════════════════════════════════════════════════════════════
 * CollectClient · Data-Collection Gate (per-room toggle)
 * ─────────────────────────────────────────────────────────────────
 * Default: OFF (กันไว้ก่อน · เปิดเฉพาะคาบสอน)
 * - Student/Page side: CollectClient.isEnabled() — sync read จาก cache
 *     · poll auto ทุก 8 วิ · default OFF จนกว่า server ตอบ enabled:true
 * - Teacher side:      CollectClient.set(true|false) — POST ไป Apps Script
 *
 * Cache: localStorage 'collect_<roomCode>' = {enabled, at, fetchedAt}
 *   - ใช้ขณะ network ตอบไม่ทัน · TTL 30s แล้วถือว่า stale → default OFF
 * ═══════════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';
  if (global.CollectClient && global.CollectClient._installed) return;

  const POLL_MS = 8000;
  const STALE_MS = 30000; // หลัง 30s ถือ cache ว่าหมดอายุ → OFF
  const KEY_PREFIX = 'collect_';

  let _cfg = null; // {apiUrl, roomCode}
  let _timer = null;

  function _key(room){ return KEY_PREFIX + (room || 'default'); }

  function _readCache(room){
    try { return JSON.parse(localStorage.getItem(_key(room)) || 'null'); }
    catch(_){ return null; }
  }
  function _writeCache(room, st){
    try { localStorage.setItem(_key(room), JSON.stringify(st)); } catch(_){}
  }

  /** Sync read · default OFF · returns boolean */
  function isEnabled(room){
    const r = room || (_cfg && _cfg.roomCode) || null;
    if (!r) return false;
    const c = _readCache(r);
    if (!c) return false;
    if (c.enabled !== true) return false;
    const fetchedAt = Number(c.fetchedAt || 0);
    if (Date.now() - fetchedAt > STALE_MS) return false; // stale → กันไว้
    return true;
  }

  async function fetchState(apiUrl, room){
    if (!apiUrl) return null;
    try {
      const url = apiUrl + '?action=collectGet&code=' + encodeURIComponent(room || 'default') + '&_=' + Date.now();
      const r = await fetch(url);
      const j = await r.json();
      if (j && j.status === 'ok' && j.collect){
        const st = { enabled: j.collect.enabled === true, at: j.collect.at || 0, fetchedAt: Date.now() };
        _writeCache(room, st);
        return st;
      }
    } catch(_){}
    return null;
  }

  /**
   * Start polling. Stash apiUrl + roomCode globally so isEnabled() works sync.
   * opts: { apiUrl, roomCode }
   */
  function start(opts){
    if (!opts || !opts.apiUrl || !opts.roomCode) return;
    _cfg = { apiUrl: opts.apiUrl, roomCode: opts.roomCode };
    if (_timer) clearInterval(_timer);
    fetchState(_cfg.apiUrl, _cfg.roomCode);
    _timer = setInterval(() => {
      if (document.hidden) return;
      fetchState(_cfg.apiUrl, _cfg.roomCode);
    }, POLL_MS);
  }

  function stop(){
    if (_timer) { clearInterval(_timer); _timer = null; }
  }

  /** Teacher action: POST collectSet (passwordless · code ต้อง auto_*) */
  async function set(enabled, opts){
    const apiUrl = (opts && opts.apiUrl) || (_cfg && _cfg.apiUrl);
    const roomCode = (opts && opts.roomCode) || (_cfg && _cfg.roomCode);
    if (!apiUrl || !roomCode) throw new Error('CollectClient: missing apiUrl/roomCode');
    // Optimistic cache update — UI ตอบสนองทันที
    _writeCache(roomCode, { enabled: !!enabled, at: Date.now(), fetchedAt: Date.now() });
    return fetch(apiUrl, {
      method: 'POST', mode: 'no-cors',
      headers: {'Content-Type':'text/plain;charset=utf-8'},
      body: JSON.stringify({ action:'collectSet', code: roomCode, enabled: !!enabled })
    });
  }

  /**
   * Auto-init: ถ้ามี window.KP_CONFIG.apiUrl + window.KP_COURSE → start อัตโนมัติ
   * page นักเรียนจะเรียกฟังก์ชันนี้เอง · teacher dashboard เรียก start() ด้วย apiUrl ตรง
   */
  function autoInit(){
    const apiUrl = (global.KP_CONFIG && global.KP_CONFIG.apiUrl) || global.API_URL || null;
    const course = global.KP_COURSE || null;
    if (apiUrl && course) start({ apiUrl, roomCode: 'auto_' + course });
  }

  global.CollectClient = {
    isEnabled,
    fetchState,
    start, stop, set,
    autoInit,
    _installed: true
  };

  // ลอง auto-init เมื่อ DOM พร้อม (ครั้งแรก) — หน้าที่โหลดสคริปต์นี้ก่อน config สามารถเรียกเองภายหลัง
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})(window);
