/*---------------------------------------------------------------------------
 * Yasal, https://github.com/alperali/Yasal
 * Telif Hakkı/Copyright A. Alper Atıcı. Her Hakkı Saklıdır.
 * All Rights Reserved. This is not free software.
 *---------------------------------------------------------------------------*/

import { readFile, writeFile } from 'fs';

// const EoL = '\r\n';
const EoL = '\n';

const idx = {
  "BİRİNCİ"   : "1",
  "İKİNCİ"    : "2",
  "ÜÇÜNCÜ"    : "3",
  "DÖRDÜNCÜ"  : "4",
  "BEŞİNCİ"   : "5",
  "ALTINCI"   : "6",
  "YEDİNCİ"   : "7",
  "SEKİZİNCİ" : "8",
  "DOKUZUNCU" : "9",
  "ONUNCU"    : "10",
  "ONBİRİNCİ" : "11",
  "ONİKİNCİ"  : "12",
  "ONÜÇÜNCÜ"  : "13",
  "ONDÖRDÜNCÜ": "14",
  "ONBEŞİNCİ" : "15",
  "ONALTINCI" : "16",
  "ONYEDİNCİ" : "17",
  "ONSEKİZİNCİ": "18"
};
const kaydır = ['  ', '    ', '      ', '        ', '          ', 
                '            ', '              ', '                ', '                  ', '                    ',
                '                      ',
                '                        ',
                '                          ',
                '                            '];

const rKitap = /^(BİRİNCİ|İKİNCİ|ÜÇÜNCÜ|DÖRDÜNCÜ|BEŞİNCİ|ALTINCI|YEDİNCİ|SEKİZİNCİ|DOKUZUNCU|ONUNCU|ONBİRİNCİ)\s+KİTAP$/;
const rKısım = /^(BİRİNCİ|İKİNCİ|ÜÇÜNCÜ|DÖRDÜNCÜ|BEŞİNCİ|ALTINCI|YEDİNCİ|SEKİZİNCİ|DOKUZUNCU|ONUNCU|ONBİRİNCİ|ONİKİNCİ|ONÜÇÜNCÜ)\s+KISIM$/;
const rBölüm = /^(BİRİNCİ|İKİNCİ|ÜÇÜNCÜ|DÖRDÜNCÜ|BEŞİNCİ|ALTINCI|YEDİNCİ|SEKİZİNCİ|DOKUZUNCU|ONUNCU|ONBİRİNCİ|ONİKİNCİ|ONÜÇÜNCÜ|ONDÖRDÜNCÜ|ONBEŞİNCİ|ONALTINCI|ONYEDİNCİ|ONSEKİZİNCİ)\s+BÖLÜM$/;
const rBap   = /^(BİRİNCİ|İKİNCİ|ÜÇÜNCÜ|DÖRDÜNCÜ|BEŞİNCİ|ALTINCI|YEDİNCİ|SEKİZİNCİ|DOKUZUNCU|ONUNCU|ONBİRİNCİ|ONİKİNCİ|ONÜÇÜNCÜ|ONDÖRDÜNCÜ|ONBEŞİNCİ)\s+BAP$/;
const rAyırım = /^(BİRİNCİ|İKİNCİ|ÜÇÜNCÜ|DÖRDÜNCÜ|BEŞİNCİ|ALTINCI|YEDİNCİ|SEKİZİNCİ|DOKUZUNCU|ONUNCU|ONBİRİNCİ|ONİKİNCİ|ONÜÇÜNCÜ|ONDÖRDÜNCÜ|ONBEŞİNCİ)\s+AYIRIM$/;
const rFasıl = /^(BİRİNCİ|İKİNCİ|ÜÇÜNCÜ|DÖRDÜNCÜ|BEŞİNCİ|ALTINCI|YEDİNCİ|SEKİZİNCİ|DOKUZUNCU|ONUNCU|ONBİRİNCİ|ONİKİNCİ|ONÜÇÜNCÜ|ONDÖRDÜNCÜ|ONBEŞİNCİ)\s+FASIL$/;
const rHarf = /[-–*,;:.`'"’“”)(<>0-9a-zA-ZûâıîşğüöçÂİŞĞÜÖÇ?/% ]+/;   // "falan maddenin (a) bendi" gibi ifadeleri kapsaması için parantezler var, parantez arası daha uzun ifadeler varsa bunları <> arasına almak lazım
const rÇıkart = /\([^)]{3,}\)|\(…\)|\[[^\]]+\]/g;   // "falan maddenin (a) bendindeki" gibi parantezli kısımları çıkarmasın, bu nedenle {2,} var. -ek (13) gibi bir ifadeyi de çıkarmasın diye {3, } yaptım.
const rB2 = new RegExp(`^([IVX]+)\\. +(${rHarf.source})$`);  // L, C, M şimdiye kadar görülmedi romen rakamlı başlıklarda
// Borçlar Kanunu, Medeni Kanun, Gümrük Kanunu (ve benzerinde) B1 ile B2 yeri değişiyor (şu an değişmiş halde)
const rB1 = new RegExp(`^([A-HİJKÇĞ])\\. +(${rHarf.source})$`);  // romen rakamları ile karışıyor o nedenle I V X yok (L, C, M şimdiye kadar görülmedi romen rakamlı başlıklarda)
const rB3 = new RegExp(`^([0-9]+)\\. +(${rHarf.source})$`);
const rB4 = new RegExp(`^([a-zçğıöşü])\\. +(${rHarf.source})$`); // bu sadece Borçlar ve Ticaret Kanununda görüldü
const rB5 = new RegExp(`^(([a-zçğıöşü])\\2)\\. +(${rHarf.source})$`); // bu sadece Ticaret Kanununda görüldü
const rB6 = new RegExp(`^(([a-zçğıöşü])\\2\\2)\\. +(${rHarf.source})$`); // bu sadece Ticaret Kanununda görüldü
const rMadde = /^(Mükerrer +|Ek +|Geç[İi]c[İi] +)?MADDE +([0-9]{1,4}( - [0-9]{1,4})?(\/[A-Za-z])?) *[–-] +(.+)$/i;  // MADDE 8/A gibi olabilir, rakamdan sonraki pattern o nedenle var
const rFıkra = new RegExp(`^((?![0-9A-Za-zçığşüöÇİĞŞÜÖ]{1,2}\\))(##)?${rHarf.source})$`);  // bent/altbent ile başlamayan satır (bent/altbentlerin 1 veya 2 basamaklı işaretlendiğini varsayıyorum)
const rBent = new RegExp(`^(([A-Za-zçığşüöÇİĞŞÜÖ]{1,2})\\) +|@@)(${rHarf.source})$`);
const raltBent = new RegExp(`^([0-9]+)\\) +(${rHarf.source})$`);
const rMaddeBaşlık = new RegExp(`^,,(${rHarf.source})$`);    // Madde başlıkları, varsa, çift virgül ile işaretlenmiş olmalı. İşaretlenmezse fıkradan ayırmak mümkün değil.
// const rNumarasızFıkra = new RegExp(`^##(${rHarf.source})$`); 

// Not: Fıkra gibi görünen ama numara verilmemesi gereken paragraflar ## ile işaretlenmiş olmalı (bunlara no=0 verilir)
// Not: Bent gibi görünen ama numara verilmemesi gereken paragraflar @@ ile işaretlenmiş olmalı (bunlara no=0 verilir)
// Not: Madde başlıkları, varsa, çift virgül ile işaretlenmiş olmalı. İşaretlenmezse fıkradan ayırmak mümkün değil.
// Not: Kalması istenen parentezler < > ile değiştirilmeli.
// Not: Aşağıda "Ek Geçici Madde..." ifadesini parse eden bir pattern yok, bunu metinde "Ek Madde" veya "Geçici Madde" yap, çıktıda eksik ifadeyi tür attribute'una elle ekle.

const madde_başlıkları_var = true;   // bu belgede madde başlıkları varsa bu true yapılacak, yoksa false
const fıkra_no_var = false;    // bu belgede fıkralar numaralandırılmışsa bu true yapılacak, yoksa false
const inp_dosya ='2918.txt';
const out_dosya = '2918.html';

const durum = { 'İptal': 'iptal', 'Mülga': 'mülga', '<İptal>': 'iptal', '<Mülga>': 'mülga'};

readFile(inp_dosya, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // mülga maddeleri işaretle(*), atıfları sil, boş satırları sil, boş madde satırını ilk fıkrası ile birleştir, satırları ayır, satır başı ve sonu boşlukları sil
    // * : iptal maddeleri işaretlemiyor, çünkü '(İptal.. ' diye başlayan madde sayısı çok az, onu da kapsayacak şekilde pattern'ı karmaşıklaştırmak yerine onları elle işaretle)
    const lins = data.replace(/^ *((Mükerrer +|Ek +|Geç[İi]c[İi] +)?MADDE +[0-9]{1,4}( - [0-9]{1,4})?(\/[A-Za-z])? *[–-]) +\(Mülga.+/igm, '$1 Mülga')
                     .replace(rÇıkart, '').replace(/^ *\n/gm,'')
                     .replace(/^ *((Mükerrer +|Ek +|Geç[İi]c[İi] +)?MADDE +[0-9]{1,4}( - [0-9]{1,4})?(\/[A-Za-z])? *[–-]) *\n/igm, '$1 ')
                     .split(EoL).map(e => e.trim());
    
    // sonda boş satır olmayacak (son satır sonunda EoL olmayacak)

    // writeFile('y.txt', lins.join('\r\n'), (e) => {
    //   if (e) throw e;
    // });

    // return;

    const prefx = 'mvz-'; // custom HTML element için gereken tireli ön ek 
    const stak=[];
    let i=0, k=-1, sn, f_say, f_no, b_no, kapat, maddeBaşlık='';
    let sonuç = 
`<!-- 
  Yasal, https://github.com/alperali/Yasal
  
  İşbu belge 5846 sayılı kanun madde 31'e dayanarak oluşturulmuş işlenme eserdir.
  
  Telif Hakkı/Copyright A. Alper Atıcı. Her Hakkı Saklıdır.
  All Rights Reserved. This is not free software.  -->

  <mvz-künye tür="kanun" no="" başlık=""
             tarih="" rgazete-tarih="" rgazete-sayı="" rgazete-mükerrer="1"
             düstur-tertip="5" düstur-cilt="22" düstur-sayfa="3" />
    
`;

    while (i < lins.length) {

      sn = lins[i].match(rKitap);
      if (sn) {
        if (stak.includes(`</${prefx}kitap>`))
          do {
            kapat = stak.pop();
            sonuç = sonuç.concat(kaydır[k--]).concat(kapat).concat(EoL);
          } while (kapat != `</${prefx}kitap>`);

        ++k;
        sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}kitap no="${idx[sn[1]]}-${sn[1]}" başlık="${lins[++i]}">`).concat(EoL);
        ++i;
        stak.push(`</${prefx}kitap>`);
      }

      sn = lins[i].match(rKısım);
      if (sn) {
        if (stak.includes(`</${prefx}kısım>`))
          do {
            kapat = stak.pop();
            sonuç = sonuç.concat(kaydır[k--]).concat(kapat).concat(EoL);
          } while (kapat != `</${prefx}kısım>`);

        ++k;
        sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}kısım no="${idx[sn[1]]}-${sn[1]}" başlık="${lins[++i]}">`).concat(EoL);
        ++i;
        stak.push(`</${prefx}kısım>`);
      }

      sn = lins[i]?.match(rBölüm);
      if (sn) {
        if (stak.includes(`</${prefx}bölüm>`))
          do {
            kapat = stak.pop();
            sonuç = sonuç.concat(kaydır[k--]).concat(kapat).concat(EoL);
          } while (kapat != `</${prefx}bölüm>`);
        
        ++k;
        sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}bölüm no="${idx[sn[1]]}-${sn[1]}" başlık="${lins[++i]}">`).concat(EoL);
        ++i;
        stak.push(`</${prefx}bölüm>`);
      }

      sn = lins[i]?.match(rBap);
      if (sn) {
        if (stak.includes(`</${prefx}bap>`))
          do {
            kapat = stak.pop();
            sonuç = sonuç.concat(kaydır[k--]).concat(kapat).concat(EoL);
          } while (kapat != `</${prefx}bap>`);
        
        ++k;
        sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}bap no="${idx[sn[1]]}-${sn[1]}" başlık="${lins[++i]}">`).concat(EoL);
        ++i;
        stak.push(`</${prefx}bap>`);
      }

      sn = lins[i]?.match(rAyırım);
      if (sn) {
        if (stak.includes(`</${prefx}ayırım>`))
          do {
            kapat = stak.pop();
            sonuç = sonuç.concat(kaydır[k--]).concat(kapat).concat(EoL);
          } while (kapat != `</${prefx}ayırım>`);
        
        ++k;
        sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}ayırım no="${idx[sn[1]]}-${sn[1]}" başlık="${lins[++i]}">`).concat(EoL);
        ++i;
        stak.push(`</${prefx}ayırım>`);
      }

      sn = lins[i]?.match(rFasıl);
      if (sn) {
        if (stak.includes(`</${prefx}fasıl>`))
          do {
            kapat = stak.pop();
            sonuç = sonuç.concat(kaydır[k--]).concat(kapat).concat(EoL);
          } while (kapat != `</${prefx}fasıl>`);
        
        ++k;
        sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}fasıl no="${idx[sn[1]]}-${sn[1]}" başlık="${lins[++i]}">`).concat(EoL);
        ++i;
        stak.push(`</${prefx}fasıl>`);
      }

      sn = lins[i]?.match(rB1);
      if (sn) {
        if (stak.includes(`</${prefx}b1>`))
          do {
            kapat = stak.pop();
            sonuç = sonuç.concat(kaydır[k--]).concat(kapat).concat(EoL);
          } while (kapat != `</${prefx}b1>`);

        ++k;
        sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}b1 no="${sn[1]}" başlık="${sn[2]}">`).concat(EoL);
        ++i;
        stak.push(`</${prefx}b1>`);
      }

      sn = lins[i]?.match(rB2);
      if (sn) {
        if (stak.includes(`</${prefx}b2>`))
          do {
            kapat = stak.pop();
            sonuç = sonuç.concat(kaydır[k--]).concat(kapat).concat(EoL);
          } while (kapat != `</${prefx}b2>`);

        ++k;
        sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}b2 no="${sn[1]}" başlık="${sn[2]}">`).concat(EoL);
        ++i;
        stak.push(`</${prefx}b2>`);
      }

      sn = lins[i]?.match(rB3);
      if (sn) {
        if (stak.includes(`</${prefx}b3>`))
          do {
            kapat = stak.pop();
            sonuç = sonuç.concat(kaydır[k--]).concat(kapat).concat(EoL);
          } while (kapat != `</${prefx}b3>`);

        ++k;
        sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}b3 no="${sn[1]}" başlık="${sn[2]}">`).concat(EoL);
        ++i;
        stak.push(`</${prefx}b3>`);
      }

      sn = lins[i]?.match(rB4);
      if (sn) {
        if (stak.includes(`</${prefx}b4>`))
          do {
            kapat = stak.pop();
            sonuç = sonuç.concat(kaydır[k--]).concat(kapat).concat(EoL);
          } while (kapat != `</${prefx}b4>`);

        ++k;
        sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}b4 no="${sn[1]}" başlık="${sn[2]}">`).concat(EoL);
        ++i;
        stak.push(`</${prefx}b4>`);
      }

      sn = lins[i]?.match(rB5);    // bu sadece Ticaret Kanununda görüldü
      if (sn) {
        if (stak.includes(`</${prefx}b5>`))
          do {
            kapat = stak.pop();
            sonuç = sonuç.concat(kaydır[k--]).concat(kapat).concat(EoL);
          } while (kapat != `</${prefx}b5>`);

        ++k;
        sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}b5 no="${sn[1]}" başlık="${sn[3]}">`).concat(EoL);
        ++i;
        stak.push(`</${prefx}b5>`);
      }

      sn = lins[i]?.match(rB6);    // bu sadece Ticaret Kanununda görüldü
      if (sn) {
        if (stak.includes(`</${prefx}b6>`))
          do {
            kapat = stak.pop();
            sonuç = sonuç.concat(kaydır[k--]).concat(kapat).concat(EoL);
          } while (kapat != `</${prefx}b6>`);

        ++k;
        sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}b6 no="${sn[1]}" başlık="${sn[3]}">`).concat(EoL);
        ++i;
        stak.push(`</${prefx}b6>`);
      }

      if (madde_başlıkları_var) {
        sn = lins[i].match(rMaddeBaşlık);
        if (sn) {
          // Madde başlığı buldu. Burada stak'a eklenecek bir şey yok, <template> içine alınacak bir şey de değil,
          // sonraki satırdaki maddeye aktarılması gereken bir bilgi,
          // i'yi arttırıp devam et, sonraki adımda madde bu başlığı alıp sıfırlayacak
          // (Madde başlıkları, varsa, önceden çift virgül ile işaretlenmiş olmalı)
          maddeBaşlık = sn[1];
          ++i;
          continue;
        }
        // aralarda başlığı olmayan madde olabilir, o zaman devam etsin maddeye
      }

      sn = lins[i]?.match(rMadde);
      if (sn) {
        f_say = 1;
        if (stak.includes(`</${prefx}madde>`))
          do {
            kapat = stak.pop();
            sonuç = sonuç.concat(kaydır[k--]).concat(kapat).concat(EoL);
          } while (kapat != `</${prefx}madde>`);
        
        ++k;
        // bu belgede fıkra numaraları varsa çıkart, yoksa iki defa numara çıkıyor render ederken (zaten herşeyi fıkra no yokmuş gibi yazdık, bir de olanlar için herşeyi değiştirmeyelim)
        if (fıkra_no_var)
          sn[5] = sn[5].replace(/^\([0-9]+\) +/, '');

        sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}madde no="${sn[2]}" başlık="${maddeBaşlık}"`);
        maddeBaşlık = '';

        stak.push(`</${prefx}madde>`);

        if (sn[1])
          sonuç = sonuç.concat(` tür="${sn[1].trim()}"`);

        if (sn[5].trim().match(/^Mülga$|^İptal$/)) {
          sonuç = sonuç.concat(` durum="${durum[sn[5].trim()]}">`).concat(EoL);
          ++i;
        }
        else {
          sonuç = sonuç.concat('>').concat(EoL);
        
          ++k;
          // aynı satırdaki fıkra, o nedenle ++i yapmıyoruz
          if (sn[5].trim().match(/^<Mülga>$|^<İptal>$/))
            sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}fıkra no="1" durum="${durum[sn[5].trim()]}">`).concat(EoL)
                         .concat(kaydır[k+1]).concat(`<template></template>`).concat(EoL);
          else
            sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}fıkra no="1">`).concat(EoL)
                         .concat(kaydır[k+1]).concat(`<template>${sn[5].replace(/</g, '(').replace(/>/g, ')')}</template>`).concat(EoL);
          ++i;
          stak.push(`</${prefx}fıkra>`);
        }

      }
      else {
        // buraya kadar geldiyse madde içinde ikinci veya sonraki fıkradadır, fıkra içinde bent olabilir, bent içinde altbent olabilir
        let match_yok = true;
        sn = lins[i]?.match(rFıkra);
        if (sn) {
          if (stak.includes(`</${prefx}fıkra>`))
            do {
              kapat = stak.pop();
              sonuç = sonuç.concat(kaydır[k--]).concat(kapat).concat(EoL);
            } while (kapat != `</${prefx}fıkra>`);

          // bu belgede fıkra numaraları varsa çıkart, yoksa iki defa numara çıkıyor render ederken  
          if (fıkra_no_var)
            sn[1] = sn[1].replace(/^\([0-9]+\) +/, '');

          // ## ile başlayan satır fıkra gibi görünen ama numara verilmemesi gereken paragraflar (bunlara no=0 verilir)
          // eğer ## ile başlıyorsa sn[2]'de match ediyor, yoksa sn[2] undefined oluyor.
          if (sn[2]) {
            f_no = 0;
            sn[1] = sn[1].replace(/^##/, '');  // ## işaretini kaldır
          }
          else
            f_no = ++f_say;

          ++k;
          if (sn[1].trim().match(/^<Mülga>$|^<İptal>$/))
            sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}fıkra no="${f_no}" durum="${durum[sn[1].trim()]}">`).concat(EoL)
                         .concat(kaydır[k+1]).concat(`<template></template>`).concat(EoL);
          else
            sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}fıkra no="${f_no}">`).concat(EoL)
                         .concat(kaydır[k+1]).concat(`<template>${sn[1].replace(/</g, '(').replace(/>/g, ')')}</template>`).concat(EoL);
          ++i;
          stak.push(`</${prefx}fıkra>`);
          match_yok = false;
        }

        sn = lins[i]?.match(rBent);
        if (sn) {
          if (stak.includes(`</${prefx}bent>`))
            do {
              kapat = stak.pop();
              sonuç = sonuç.concat(kaydır[k--]).concat(kapat).concat(EoL);
            } while (kapat != `</${prefx}bent>`);

          // @@ ile başlayan satır bent gibi görünen ama numara verilmemesi gereken paragraflar (bunlara no=0 verilir)
          // eğer @@ ile başlıyorsa sn[2] undefined ve sn[1] == '@@' oluyor.
          if (sn[1] == '@@')
            b_no = 0;
          else
            b_no = sn[2];

          ++k;
          if (sn[3].trim().match(/^<Mülga>$|^<İptal>$/))
            sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}bent no="${b_no}" durum="${durum[sn[3].trim()]}">`).concat(EoL)
                         .concat(kaydır[k+1]).concat(`<template></template>`).concat(EoL);
          else
            sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}bent no="${b_no}">`).concat(EoL)
                         .concat(kaydır[k+1]).concat(`<template>${sn[3].replace(/</g, '(').replace(/>/g, ')')}</template>`).concat(EoL);
          ++i;
          stak.push(`</${prefx}bent>`);
          match_yok = false;
        }

        // altbent'lerin Mülga/İptal olmadığını varsayıyorum, varsa yukarıdakiler gibi düzenle
        sn = lins[i]?.match(raltBent);
        if (sn) {
          if (stak.includes(`</${prefx}altbent>`))
            do {
              kapat = stak.pop();
              sonuç = sonuç.concat(kaydır[k--]).concat(kapat).concat(EoL);
            } while (kapat != `</${prefx}altbent>`);

          ++k;
          sonuç = sonuç.concat(kaydır[k]).concat(`<${prefx}altbent no="${sn[1]}">`).concat(EoL)
                      .concat(kaydır[k+1]).concat(`<template>${sn[2].replace(/</g, '(').replace(/>/g, ')')}</template>`).concat(EoL);
          ++i;
          stak.push(`</${prefx}altbent>`);
          match_yok = false;
        }

        if (match_yok) {
          console.error('-----------------------------------------')
          console.log(lins[i]);
          console.error('-----------------------------------------');
          console.error('burada fıkra/bent/altbent olması lazımdı. Hata.\r\n-----------------------------------------');
          // console.log(stak);
          break;
        }

      }
    
    } /* while */

    while (kapat=stak.pop()) {
      sonuç = sonuç.concat(kaydır[k--]).concat(kapat).concat(EoL);
    }

    // her yasa sonunda, boş da olsa, <mvz-geçmişi> olması gerekiyor (spinner'ı kaldırmak için)
    sonuç = sonuç.concat('  <mvz-geçmişi>').concat(EoL).concat('  </mvz-geçmişi>').concat(EoL);

    // console.log(sonuç);
    writeFile(out_dosya, sonuç, (e) => {
       if (e) throw e;
    });

});
