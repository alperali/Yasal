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
      // kullanıcı offline ise fetch() exception atar, catch() devreye girer
      resp = await fetch(evt.request);
      if (resp.ok) {
        const p = await c.match(evt.request);
        // if (!p || (p.headers.get('etag') != resp.headers.get('etag')))
        if (!p) {
          console.log(resp.url+' cache\'te yok.');
          c.put(evt.request, resp.clone());
        }
        else if (p.headers.get('etag') != resp.headers.get('etag')) {
          console.log(resp.url+' cache\'te var, fakat aynı değil.');
          c.put(evt.request, resp.clone());
        }
        else
          console.log(resp.url+' cache te var, ve değişmemiş.');

        return resp;
      }
      else
        // kullanıcı online fakat bir nedenle fetch() başarısız olduysa biz exception atarız, catch() devreye girer
        throw new Error('HTTP hata: '+resp.status);
    }
    catch(_geç) {
      // varsa cache'ten sayfayı getir, yoksa hata sayfasını göster
      return (await c.match(evt.request) ?? await c.match('./yok.html'));  
    }
  
  })() );
});
