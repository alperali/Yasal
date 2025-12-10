/*---------------------------------------------------------------------------
 * Yasal, https://github.com/alperali/Yasal
 * Telif Hakkı/Copyright A. Alper Atıcı. Her Hakkı Saklıdır.
 * All Rights Reserved. This is not free software.
 *---------------------------------------------------------------------------*/

self.addEventListener('install', evt => {
  // self.skipWaiting();
  evt.waitUntil( (async () => {
    const c = await caches.open('Yasal-1');
    return c.add('./yok.html');
  })() );
  console.log('servw install.');
});

self.addEventListener('activate', () => console.log('servw activate.'));

self.addEventListener('fetch', evt => {
  evt.respondWith( (async () => {
    let resp;
    const c = await caches.open('Yasal-1');
    try {
      resp = await fetch(evt.request);
      if (resp.ok) {
        c.put(evt.request, resp.clone());
        return resp;
      }
      else
        throw new Error('HTTP hata: '+resp.status);
    }
    catch(_geç) {
      return (await c.match(evt.request) ?? await c.match('./yok.html'));  
    }
  
  })() );
});
