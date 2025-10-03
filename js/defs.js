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
  [ 2709, { başlık: 'TÜRKİYE CUMHURİYETİ ANAYASASI'} ],
  [ 3376, { başlık: 'ANAYASA DEĞİŞİKLİKLERİNİN HALKOYUNA SUNULMASI HAKKINDA KANUN'} ],
  [ 298,  { başlık: 'SEÇİMLERİN TEMEL HÜKÜMLERİ VE SEÇMEN KÜTÜKLERİ HAKKINDA KANUN'} ],
  [ 2839, { başlık: 'MİLLETVEKİLİ SEÇİMİ KANUNU'} ],
  [ 2972, { başlık: 'MAHALLİ İDARELER İLE MAHALLE MUHTARLIKLARI VE İHTİYAR HEYETLERİ SEÇİMİ HAKKINDA KANUN'} ],
  [ 6271, { başlık: 'CUMHURBAŞKANI SEÇİMİ KANUNU'} ],
  [ 7062, { başlık: 'YÜKSEK SEÇİM KURULUNUN TEŞKİLAT VE GÖREVLERİ HAKKINDA KANUN'} ],
  [ 3294, { başlık: 'SOSYAL YARDIMLAŞMA VE DAYANIŞMAYI TEŞVİK KANUNU'} ],
  [ 2108, { başlık: 'MUHTAR ÖDENEK VE SOSYAL GÜVENLİK YASASI'} ],
  [ 5510, { başlık: 'SOSYAL SİGORTALAR VE GENEL SAĞLIK SİGORTASI KANUNU'} ],
  [ 3201, { başlık: 'YURT DIŞINDA BULUNAN TÜRK VATANDAŞLARININ YURT DIŞINDA GEÇEN SÜRELERİNİN SOSYAL GÜVENLİKLERİ BAKIMINDAN DEĞERLENDİRİLMESİ HAKKINDA KANUN'} ],
  [ 2684, { başlık: 'İLKÖĞRETİM VE ORTAÖĞRETİMDE PARASIZ YATILI VEYA BURSLU ÖĞRENCİ OKUTMA VE BUNLARA YAPILACAK SOSYAL YARDIMLARA İLİŞKİN KANUN'} ],
  [ 224,  { başlık: 'SAĞLIK HİZMETLERİNİN SOSYALLEŞTİRİLMESİ HAKKINDA KANUN'} ],
  [ 506,  { başlık: 'SOSYAL SİGORTALAR KANUNU (Eski)'} ],
  [ 2828, { başlık: 'SOSYAL HİZMETLER KANUNU'} ],
  [ 2925, { başlık: 'TARIM İŞÇİLERİ SOSYAL SİGORTALAR KANUNU'} ],
  [ 168,  { başlık: 'YABANCI MEMLEKETLERDE TÜRK ASILLI VE YABANCI UYRUKLU ÖĞRETMENLERE SOSYAL YARDIM YAPILMASI HAKKINDA KANUN'} ],
  [ 3621, { başlık: 'KIYI KANUNU'} ],
  [ 6502, { başlık: 'TÜKETİCİNİN KORUNMASI HAKKINDA KANUN'} ],
  [ 4982, { başlık: 'BİLGİ EDİNME HAKKI KANUNU'} ],
  [ 4857, { başlık: 'İŞ KANUNU'} ],
  [ 1475, { başlık: 'İŞ KANUNU (Eski)'} ],
  [ 5326, { başlık: 'KABAHATLER KANUNU'} ],
  [ 7201, { başlık: 'TEBLİGAT KANUNU'} ],
  [ 4681, { başlık: 'CEZA İNFAZ KURUMLARI VE TUTUKEVLERİ İZLEME KURULLARI KANUNU'} ],
  [ 6331, { başlık: 'İŞ SAĞLIĞI VE GÜVENLİĞİ KANUNU'} ],
  [ 5237, { başlık: 'TÜRK CEZA KANUNU'} ],
  [ 5252, { başlık: 'TÜRK CEZA KANUNUNUN YÜRÜRLÜK VE UYGULAMA ŞEKLİ HAKKINDA KANUN'} ],
  [ 5271, { başlık: 'CEZA MUHAKEMESİ KANUNU'} ],
  [ 1632, { başlık: 'ASKERİ CEZA KANUNU'} ],
  [ 6102, { başlık: 'TÜRK TİCARET KANUNU'} ],
  [ 6103, { başlık: 'TÜRK TİCARET KANUNUNUN YÜRÜRLÜĞÜ VE UYGULAMA ŞEKLİ HAKKINDA KANUN'} ],
  [ 7528, { başlık: 'ÖĞRETMENLİK MESLEĞİ KANUNU'} ],
  [ 5580, { başlık: 'ÖZEL ÖĞRETİM KURUMLARI KANUNU'} ],
  [ 3308, { başlık: 'MESLEKİ EĞİTİM KANUNU'} ],
  [ 222,  { başlık: 'İLKÖĞRETİM VE EĞİTİM KANUNU'} ],
  [ 1739, { başlık: 'MİLLİ EĞİTİM TEMEL KANUNU'} ],
  [ 2923, { başlık: 'YABANCI DİL EĞİTİMİ VE ÖĞRETİMİ İLE TÜRK VATANDAŞLARININ FARKLI DİL VE LEHÇELERİNİN ÖĞRENİLMESİ HAKKINDA KANUN'} ],
  [ 7552, { başlık: 'İKLİM KANUNU'} ],
  [ 3568, { başlık: 'SERBEST MUHASEBECİ MALİ MÜŞAVİRLİK VE YEMİNLİ MALİ MÜŞAVİRLİK KANUNU'} ],
  [ 7036, { başlık: 'İŞ MAHKEMELERİ KANUNU'} ]
]);

export
const başlık_sıralı = Array.from(belgeler.keys()).sort((a,b) => belgeler.get(a).başlık.localeCompare(belgeler.get(b).başlık, 'tr', {sensitivity: 'base'}));

export
const sayı_sıralı = Array.from(belgeler.keys()).sort((a,b) => a - b);
