/*---------------------------------------------------------------------------
 * Yasal, https://github.com/alperali/Yasal
 * Telif Hakkı/Copyright A. Alper Atıcı. Her Hakkı Saklıdır.
 * All Rights Reserved. This is not free software.
 *---------------------------------------------------------------------------*/

export
const belgeler = new Map([
  [ 6098, { başlık: 'TÜRK BORÇLAR KANUNU'} ],
  [ 6101, { başlık: 'TÜRK BORÇLAR KANUNUNUN YÜRÜRLÜĞÜ VE UYGULAMA ŞEKLİ HAKKINDA KANUN'} ],
  [ 4721, { başlık: 'TÜRK MEDENİ KANUNU'} ],
  [ 4722, { başlık: 'TÜRK MEDENİ KANUNUNUN YÜRÜRLÜĞÜ VE UYGULAMA ŞEKLİ HAKKINDA KANUN'} ],
  [ 2709, { başlık: 'TÜRKİYE CUMHURİYETİ ANAYASASI'} ]
]);

export
const başlık_sıralı = Array.from(belgeler.keys()).sort((a,b) => belgeler.get(a).başlık.localeCompare(belgeler.get(b).başlık, 'tr', {sensitivity: 'base'}));

export
const sayı_sıralı = Array.from(belgeler.keys()).sort((a,b) => a - b);
