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

EBNF notasyonunda belgenin örgün betimlenişi aşağıdaki gibidir:
```ebnf
Kanun    =  künye , yasa , geçmişi ;

künye      =  '<mvz-künye' , k-attrib , '/>' ;
k-attrib   =  k-tür , k-no , k-başlık , k-tarih , k-rgtarih , k-rgsayı , [k-rgmükerrer] , [kd-tertip] , [kd-cilt] , [kd-sayfa] ;

k-tür      =  sp , 'tür="kanun"' ;
k-no       =  sp , 'no="' , num , '"' ;
k-başlık   =  sp , 'başlık="' , bharf-x , { bharf-sp-x } , '"' ;   (* adı *)
k-tarih    =  sp , 'tarih="' , tarih , '"' ;          (* kabul edildiği tarih *)
k-rgtarih  =  sp , 'rgazete-tarih="' , tarih , '"' ;  (* yayınlandığı resmi gazetenin tarihi *)
k-rgsayı   =  sp , 'rgazete-sayı="' , num , '"' ;     (* yayınlandığı resmi gazetenin sayısı *)
k-rgmükerrer = sp , 'rgazete-mükerrer="' , nzdgt , '"' ;
kd-tertip  =  sp , 'düstur-tertip="' , ( '3' | '4' | '5' ) , '"' ;
kd-cilt    =  sp , 'düstur-cilt="' , num , '"' ;
kd-sayfa   =  sp , 'düstur-sayfa="' , num , '"' ;

yasa    =  ? TBD ? ;

ab-b1     = '<mvz-b1' , b1-attrib , '>' , ( ab-b2ler | ab-b3ler | ab-b4ler | ab-b5ler | ab-b6lar | maddeler ) , '</mvz-b1>' ;
ab-b2     = '<mvz-b2' , b2-attrib , '>' , ( ab-b3ler | ab-b4ler | ab-b5ler | ab-b6lar | maddeler ) , '</mvz-b2>' ;
ab-b3     = '<mvz-b3' , b3-attrib , '>' , ( ab-b4ler | ab-b5ler | ab-b6lar | maddeler ) , '</mvz-b3>' ;
ab-b4     = '<mvz-b4' , b4-attrib , '>' , ( ab-b5ler | ab-b6lar | maddeler ) , '</mvz-b4>' ;
ab-b5     = '<mvz-b5' , b5-attrib , '>' , ( ab-b6lar | maddeler ) , '</mvz-b5>' ;
ab-b6     = '<mvz-b6' , b6-attrib , '>' , maddeler , '</mvz-b6>' ;

ab-b2ler  = ab-b2 , { ab-b2 } ;
ab-b3ler  = ab-b3 , { ab-b3 } ;
ab-b4ler  = ab-b4 , { ab-b4 } ;
ab-b5ler  = ab-b5 , { ab-b5 } ;
ab-b6ler  = ab-b6 , { ab-b6 } ;

b1-attrib = b1-no , b1-başlık ;
b1-no     = sp , 'no="' , ( 'A' | 'B' | 'C' | 'Ç' | 'D' | 'E' | 'F' | 'G' | 'Ğ' | 'H' | 'İ' | 'J' | 'K' | 'L' ) , '"' ;  (* b2 ile karışmaması için I yok *)
b1-başlık = sp , 'başlık="' , başlık , '"' ;

b2-attrib = b2-no , b2-başlık ;
b2-no     = sp , 'no="' , ( 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'X' | 'XI' | 'XII' | 'XIII' | 'XIV' | 'XV' | 'XVI' | 'XVII' | 'XVIII' | 'XIX' ) , '"' ;
b2-başlık = sp , 'başlık="' , başlık , '"' ;

b3-attrib = b3-no , b3-başlık ;
b3-no     = sp , 'no="' , num , '"' ;
b3-başlık = sp , 'başlık="' , başlık , '"' ;

b4-attrib = b4-no , b4-başlık ;
b4-no     = sp , 'no="' , kharf , '"' ;
b4-başlık = sp , 'başlık="' , başlık , '"' ;

b5-attrib = b5-no , b5-başlık ;                  (* bu alt başlık sadece 6102'de var *)
b5-no     = sp , 'no="' , kharf , kharf , '"' ;
b5-başlık = sp , 'başlık="' , başlık , '"' ;

b6-attrib = b6-no , b6-başlık ;                  (* bu alt başlık sadece 6102'de var *)
b6-no     = sp , 'no="' , kharf , kharf , kharf , '"' ;
b6-başlık = sp , 'başlık="' , başlık , '"' ;

maddeler  = ? TBD ? ;


geçmişi   =  '<mvz-geçmişi>' , { g-ide } , '</mvz-geçmişi>' ;
g-ide     =  '<mvz-ide' , g-attrib , '/>' ;      (* İptal/Değiş/Ekle *)
g-attrib  =  g-no , g-idea , g-idelen , g-tarih ;
g-no      =  sp , 'no="' , num , '"' ;           (* sıra numarası *)
g-idea    =  sp , 'idea="' , g-metin-i , '"' ;   (* iptal eden/değiştiren/ekleyen *)
g-idelen  =  sp , 'idelen="' , g-metin-a , '"' ; (* iptal edilen/değiştirilen/eklenen *)
g-tarih   =  sp , 'tarih="' , tarih , '"' ;      (* yürürlüğe giriş tarihi *)
g-metin-i =  ? iptal eden/değiştiren/ekleyen kanun/KHK/AM kararı ? ;
g-metin-a =  ? iptal edilen/değiştirilen/eklenen maddesi ? ;

sp    =  ' ' , {' '} ;
nzdgt =  '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' ;
dgt   =  nzdgt | '0' ;
num   =  nzdgt , { dgt } ;
bharf =  'A' | 'B' | 'C' | 'Ç' | 'D' | 'E' | 'F' | 'G' | 'Ğ' | 'H' | 'I' | 'İ' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'Ö' | 'P' | 'R' | 'S' | 'Ş' | 'T' | 'U' | 'Ü' | 'V' | 'Y' | 'Z' ;
bharf-x    = bharf | 'Â' | 'Î' | 'Û' | ',' ;
bharf-sp-x = bharf-x | sp ;
kharf = 'a' | 'b' | 'c' | 'ç' | 'd' | 'e' | 'f' | 'g' | 'ğ' | 'h' | 'ı' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'ö' | 'p' | 't' | 's' | 'ş' | 't' | 'u' | 'ü' | 'v' | 'y' | 'z' ;
tarih      =  nzdgt , [dgt] , tarih-sep , nzdgt , [dgt] , tarih-sep , nzdgt , 3 * dgt ;
tarih-sep  = '/' | '.' ;
başlık     = ? altbölüm/madde başlığı ? ;

```

[^1]: Başta [5210](https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5210&MevzuatTur=21&MevzuatTertip=5) sayılı yönetmelikteki
usul ve esaslara göre yazılan bu parser, pek çok kanun metninin ilgi yönetmeliğe uymadan yazılmış olması nedeniyle
deterministik olmaktan çıkıp heuristic bir hal almıştır.
[^2]: Büyük Türkçe Sözlük'te `ayırım` diye bir sözcük yoktur. Ancak 6098, 6100, 6102 gibi kanunlarda `fasıl` yerine kullanıldığı görülmüştür.
[^3]: Bazı yasa metinlerinde `madde` öncesi alt başlıklar görülmüştür. Büyük metinlerde bunların derinliği 6 aşamaya kadar çıkmaktadır.
