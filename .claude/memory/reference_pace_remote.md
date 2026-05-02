---
name: Teacher Pace Remote
description: รีโมทครูคุมจังหวะเดินหน้าทุกแผน · backend + client paths + pace data shape + deploy note
type: reference
originSessionId: 12c3c4fc-dd6e-4643-aa4f-fd33c6621913
---
ระบบ "ครูคุมจังหวะ" broadcast หน้าปัจจุบัน + unlockedUpTo ceiling → นักเรียน poll แล้ว soft-nav + hard-lock footer next

## Pace data shape (sent via setPage / stored)
```js
{ page: 'p05', unlockedUpTo: 'p07', ep: 'ep02', subject: 'astronomy', at: 1745... }
```
- `page` = หน้าที่ครูกำลังสอน (student เห็น banner "ครูพาไปหน้า X")
- `unlockedUpTo` = หน้าสูงสุดที่นักเรียนไปถึงได้ (cumulative · เดินหน้าได้ในช่วง 0..unlockedUpTo)

## Backend (Apps Script)
- ไฟล์: `_private/AppsScript_Code.gs` · actions `paceGet` (GET) · `paceSet` (POST · ต้อง teacher_pw)
- Storage: `PropertiesService` · key `PACE_<roomCode>` · value JSON
- ⚠️ **ต้อง redeploy Apps Script editor → New version** เมื่อแก้ไฟล์นี้ (URL อยู่ที่ `content/astronomy/config.js:24` · `content/physics3/config.js:24`)
- ตั้ง Script Property `TEACHER_PASSWORD` (fallback hardcoded)

## Generic client · `lessons/shared/pace-client.js`
- `window.PaceClient.watch({mode, apiUrl, roomCode, onChange, intervalMs})` · `stop()` · `setPage(opts)` · `peek(apiUrl, roomCode, mode)`
- Mode `'local'` = BroadcastChannel + localStorage (`paceLocal_<room>` · channel `pace_<room>`) — สำหรับ 2 tab ใน browser เดียว · ไม่ต้อง Apps Script
- Mode `'remote'` = HTTP GET paceGet / POST paceSet · skip polling ตอน `document.hidden`
- Default interval: local 2s · remote 8s
- Dedup key `paceKey(p) = p.page + '|' + p.unlockedUpTo` → fire onChange เมื่อ page **หรือ** unlockedUpTo เปลี่ยน

## Student (astronomy) · `Book.pace` ใน `shared/book.js`
- Opt-in via `?room=XXX` (persist localStorage.paceRoom · paceMode)
- URL flags: `?local=1` = local mode · `?pace=off` = disable + reload
- Banner "🔔 ครูพาไปหน้า X" + ปุ่ม "ไปเลย →" (soft nav)
- **Hard lock** ใน `Book.next()` → ถ้า `idx + 1 > unlockedUpToIdx` → `flashLocked()` (red toast + shake) + return
- **Belt-and-suspenders**: อ่าน localStorage สดก่อน lock check (กัน BC/poll พลาด)
- **HUD pace pill** แสดง mode [L/R] + สถานะ · คลิก = debug popup · คลิกขวา = disable
- **Footer btn-next** เปลี่ยนเป็น "🔒 รอครูปลดล็อค" (class `.pace-locked` · red pulse CSS)
- `visibilitychange` → refresh pace จาก localStorage

## Teacher UI · `lessons/astronomy/shared/teacher-remote.html`
- URL: `?ep=ep01|ep02&room=X&local=1` (local=1 ข้าม auth)
- Password prompt → localStorage.teacherPw_pace
- Load EP_CONFIG dynamically จาก `../<ep>/config.js`
- Checkbox ต่อหน้า · click = toggle unlock · ปลดล็อค/ล็อคทั้งหมด · timer ต่อหน้าจาก config.time
- Keyboard: `→`/`Space` = next · `←` = prev

## Scope + known gaps
- ✅ astronomy EP01/EP02 (share book.js · Book.pace)
- ✅ astronomy EP03–EP06 (Gate ใน ep0X-boot.js · ใช้ PaceResolver · รองรับ remote+local+multi-room ตั้งแต่ refactor 2026-05-02)
- ✅ astronomy EP07/EP08 (เพิ่ม EP07Gate/EP08Gate ใน boot · gate footer next anchor · lazy-load pace-client+resolver · refactor 2026-05-02)
- ❌ physics3 — ต้อง copy teacher-remote + adapt (ไม่ใช้ book.js · navigation ต่างกัน) + เปลี่ยน API_URL
- ❌ readiness counter · multi-room UI · active session list
- ⚠️ quota: 50 students × poll 8s × 60 min = ~22k req/hr · ชน Apps Script daily limit 20k (consumer)

## PaceResolver (เพิ่ม 2026-05-02) · `lessons/shared/pace-resolver.js`
- **Single source of truth** สำหรับ resolve pace config จาก URL+localStorage
- API: `PaceResolver.get({subject, ep})` → `{enabled, mode, roomCode, apiUrl, pollMs, reason}`
- URL flags: `?room=X` `?local=1` `?mode=remote` `?pace=off` `?solo=1`
- Auto-detect astronomy apiUrl ถ้าอยู่ใน `/lessons/astronomy/` (hardcoded mirror ของ `content/astronomy/config.js`)
- ใช้แทน hard-code `peek(null,'default','local')` ใน EP03–06 + boot ของ EP07/08
- ⚠️ ถ้า apiUrl เปลี่ยนใน `content/astronomy/config.js` ต้องอัพเดต SUBJECT_API ใน pace-resolver.js ด้วย

## Debugging tools
- นักเรียน: คลิก pace pill → alert แสดง mode/room/unlockedUpTo + localStorage raw
- Console: `[Book.next] pace check · idx=X unlockedUpTo=Y unlockedIdx=Z`
- Reset: `localStorage.clear(); location.reload()` หรือ `?pace=off`

## Cache busting
- `book.js?v=N` · `book.css?v=N` · bump เมื่อแก้ (ปัจจุบัน v=5)
