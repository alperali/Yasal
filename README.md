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
Bu amaçla özel bir _heuristic parser_ geliştirilmiş ve dönüşüm bu araç yardımıyla önceden çevrim dışı yapılmıştır.
Başarı oranı ortalama %80'dir (%20 elle müdahale).
Metnin büyüklüğü ve "bozukluğu"na bağlı olarak bu işlem birkaç saat ile birkaç gün arası sürmektedir.

[Belge Yapısı](https://github.com/alperali/Yasal/wiki)
