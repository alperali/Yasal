# Yasal

https://alperali.github.io/Yasal

Kanunların web tabanlı olarak modern ve pratik gösterimini sağlayan bir çalışmadır.

* Telefon, tablet, PC vs her ekran boyuna uygundur, yatay veya düşey ekran kullanılabilir.
* Açık/Koyu tema seçimi vardır.
* İçindekiler ve maddeler tablosu oluşturur (her iki tablo kullanıcı ile etkileşimlidir).
* Türkçe yazım kurallarına uygun satır sonu otomatik heceleme yapar.
* Favoriler listesi sağlar.

## Teknik Özellikler

HTML, CSS, Javascript, _web components_ kullanılmıştır.
[Bootstrap](https://github.com/twbs/bootstrap) tanımlarından faydalanır.
İçerik dinamik değil statik sayfalar halinde sunulur, veritabanı gerektirmez,
tarayıcı içinde _light DOM_ bazlı _rendering_ yapar, modern ve hızlıdır.

Kanun metinleri bu çalışmaya özgü tanımlanmış _custom HTML elements_ ile tek tek semantik işaretlenmiştir.
Hiçbir semantik bilgi içermeyen orijinal kanun metinlerinde bu dönüşümü sağlamak zorlu ve zaman alıcı bir iştir.
Bu amaçla özel bir _heuristic[^1] parser_ geliştirilmiş ve dönüşüm bu araç yardımıyla önceden çevrim dışı yapılmıştır.
Başarı oranı ortalama %80'dir (%20 elle müdahale).
Metnin büyüklüğü ve "bozukluğu"na bağlı olarak bu işlem birkaç saat ile birkaç gün arası sürmektedir.

<!-- [Belge Yapısı](https://github.com/alperali/Yasal/wiki) -->

## Belge Yapısı
100'den fazla yasanın incelenmesi sonucu görgül verilere dayalı belirlenen belge hiyerarşik yapısı aşağıdaki gibidir:


1. Künye
2. Kanun
   * Giriş / Başlangıç
   * Kitap
     * Kısım
       * Bölüm / Bap
         * Ayırım[^2] / Fasıl
           * Alt başlık[^3]
             * Madde
               * Fıkra
                 * Bent
                   * Alt bent
3. Geçmişi

---

EBNF notasyonu ile belgenin örgün betimlemesi aşağıdaki gibidir:
```ebnf
Kanun    =  künye , yasa , geçmişi ;

künye      =  '<mvz-künye' , k-attrib , '/>' ;
k-attrib   =  k-tür , k-no , k-başlık , k-tarih , k-rgtarih , k-rgsayı , [k-rgmükerrer] , [kd-tertip] , [kd-cilt] , [kd-sayfa] ;

k-tür      =  sp , 'tür="kanun"' ;
k-no       =  sp , 'no="' , num , '"' ;
k-başlık   =  sp , 'başlık="' , k-metin-b , '"' ;
k-tarih    =  sp , 'tarih="' , k-metin-k , '"' ;
k-rgtarih  =  sp , 'rgazete-tarih="' , k-metin-r , '"' ;
k-rgsayı   =  sp , 'rgazete-sayı="' , k-metin-s , '"' ;
k-rgmükerrer = sp , 'rgazete-mükerrer="' , nzdgt , '"' ;
kd-tertip  =  sp , 'düstur-tertip="' , k-metin-t , '"' ;
kd-cilt    =  sp , 'düstur-cilt="' , num , '"' ;
kd-sayfa   =  sp , 'düstur-sayfa="' , num , '"' ;

k-metin-b  =  bharf-x , { bharf-x } ;  (* adı *)
k-metin-k  =  tarih ;  (* kabul edildiği tarih *)
k-metin-r  =  tarih ;  (* yayınlandığı resmi gazetenin tarihi *)
k-metin-s  =  num   ;  (* yayınlandığı resmi gazetenin sayısı *)
k-metin-t  =  '3' | '4' | '5' ;

yasa    = (* TBD *) ;

geçmişi = (* TBD *) ;


sp    =  ' ' , {' '} ;
nzdgt =  '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' ;
dgt   = nzdgt | '0' ;
num   = nzdgt , { dgt } ;
bharf = 'A' | 'B' | 'C' | 'Ç' | 'D' | 'E' | 'F' | 'G' | 'Ğ' | 'H' | 'I' | 'İ' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'Ö' | 'P' | 'R' | 'S' | 'Ş' | 'T' | 'U' | 'Ü' | 'V' | 'Y' | 'Z' ;
bharf-x = bharf | 'Â' | 'Î' | 'Û' ;
tarih = nzdgt , [dgt] , tarih-sep , nzdgt , [dgt] , tarih-sep , nzdgt , 3 * dgt ;
tarih-sep = '/' | '.' ;
```

[^1]: Başta [5210](https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5210&MevzuatTur=21&MevzuatTertip=5) sayılı yönetmelikteki
usul ve esaslara göre yazılan bu parser, pek çok kanun metninin ilgi yönetmeliğe uymadan yazılmış olması nedeniyle
deterministik olmaktan çıkıp heuristic bir hal almıştır.
[^2]: Büyük Türkçe Sözlük'te `ayırım` diye bir sözcük yoktur. Ancak 6098, 6100, 6102 gibi kanunlarda `fasıl` yerine kullanıldığı görülmüştür.
[^3]: Bazı yasa metinlerinde `madde` öncesi alt başlıklar görülmüştür. Büyük metinlerde bunların derinliği 6 aşamaya kadar çıkmaktadır.
