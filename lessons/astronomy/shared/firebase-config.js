/* ===== COSMOS LOG · Firebase Config (optional) ===== */
/* เปิดใช้งานโดยใส่ config ใน FIREBASE_CREDENTIALS ด้านล่าง                */
/* ถ้าไม่ใส่ · sync-client.js จะ fallback เป็น BroadcastChannel อัตโนมัติ  */

(function(global){
  // ⚠️ TODO: ใส่ config ของ Firebase Realtime Database ของคุณที่นี่
  // สมัครฟรีที่ https://console.firebase.google.com → Create Project → Realtime Database
  const FIREBASE_CREDENTIALS = null;
  /* ตัวอย่าง:
  const FIREBASE_CREDENTIALS = {
    apiKey: "AIzaSy...",
    authDomain: "cosmos-log.firebaseapp.com",
    databaseURL: "https://cosmos-log-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cosmos-log",
  };
  */

  global.FirebaseConfig = {
    isConfigured: () => FIREBASE_CREDENTIALS !== null,
    init: async () => {
      if (!FIREBASE_CREDENTIALS) return null;
      // Lazy-load Firebase SDK
      if (!global.firebase) {
        await new Promise((resolve, reject) => {
          const scripts = [
            'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js',
            'https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js',
          ];
          let loaded = 0;
          scripts.forEach(src => {
            const s = document.createElement('script');
            s.src = src;
            s.onload = () => { if (++loaded === scripts.length) resolve(); };
            s.onerror = reject;
            document.head.appendChild(s);
          });
        });
      }
      if (!global.firebase.apps.length) global.firebase.initializeApp(FIREBASE_CREDENTIALS);
      return global.firebase.database();
    },
    roomRef: (code) => {
      const db = global.firebase && global.firebase.database && global.firebase.database();
      return db ? db.ref('rooms/' + code) : null;
    },
    onValue: (ref, cb) => {
      if (!ref) return () => {};
      const fn = ref.on('value', cb);
      return () => ref.off('value', fn);
    },
    set: (ref, val) => { return ref && ref.set(val); },
  };
})(window);
