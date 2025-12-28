/*---------------------------------------------------------------------------
 * Yasal, https://github.com/alperali/Yasal
 * Telif Hakkı/Copyright A. Alper Atıcı. Her Hakkı Saklıdır.
 * All Rights Reserved. This is not free software.
 *---------------------------------------------------------------------------*/

const _güncelle = 1;  // bu sabitin gerekçesi için dosya sonuna başvurunuz.

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
      // kullanıcı offline ise veya başka sebeple fetch() exception atarsa catch() devreye girer
      resp = await fetch(evt.request);
      if (resp.ok) {
        // fetch() başarılı, gelen sayfa cache'te var mı?
        const p = await c.match(evt.request);

        // gelen sayfa cache'te yok, veya var fakat cache'tekinden farklı (daha yeni), o zaman cache'e bunu koy
        if (!p || (p.headers.get('etag') != resp.headers.get('etag')))
          c.put(evt.request, resp.clone());

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

/*  Açıklama:
Sunucuya erişilemediğinde gösterilecek sayfaları cache'e "install" olayında koyabiliyoruz,
yok.html böyle bir sayfadır. Bu sayfada oluşabilecek bir değişikliği cache'e sokmanın yolu
service worker'ı "install" olayına mecbur etmektir. Bunun için worker dosyasında bir değişiklik
olması lazım. Bu amaçla bir sabit tanımlıyor ve başka değişiklik olmamış service worker'da
"install" olayını tetiklemek için bu sabitin değerini değiştiriyoruz (örneğin, 1 arttır).
*/
