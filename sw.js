// Action Install Tracker — service worker (network-first, cache fallback)
const CACHE='ait-v1';
const SHELL=['install_index.html','install_log.html','install_recall.html','install_turnins.html','install_lookup.html','install_leaderboard.html','install_manager.html','rates.js','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).catch(()=>{}));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
    if(e.request.method!=='GET')return;
    const url=new URL(e.request.url);
    if(url.origin!==location.origin)return; // let Firebase/CDN requests pass through untouched
    e.respondWith(
        fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});return res;})
        .catch(()=>caches.match(e.request))
    );
});
