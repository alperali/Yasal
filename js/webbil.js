/*---------------------------------------------------------------------------
 * Yasal, https://github.com/alperali/Yasal
 * Telif Hakkı/Copyright A. Alper Atıcı. Her Hakkı Saklıdır.
 * All Rights Reserved. This is not free software.
 *---------------------------------------------------------------------------*/

customElements.define('mvz-künye', class extends HTMLElement {
  static observedAttributes = ['tür', 'no', 'başlık', 'tarih',
                               'rgazete-tarih', 'rgazete-sayı', 'rgazete-mükerrer',
                               'düstur-tertip', 'düstur-cilt', 'düstur-sayfa'];

  constructor() {
    super();
  }

  get tür() {
    return this.getAttribute('tür');
  }

  get no() {
    return this.getAttribute('no');
  }

  get başlık() {
    return this.getAttribute('başlık');
  }

  get tarih() {
    return this.getAttribute('tarih');
  }

  get rgazete_tarih() {
    return this.getAttribute('rgazete-tarih');
  }

  get rgazete_sayı() {
    return this.getAttribute('rgazete-sayı');
  }

  get rgazete_mükerrer() {
    return this.getAttribute('rgazete-mükerrer');
  }

  get düstur_tertip() {
    return this.getAttribute('düstur-tertip');
  }

  get düstur_cilt() {
    return this.getAttribute('düstur-cilt');
  }

  get düstur_sayfa() {
    return this.getAttribute('düstur-sayfa');
  }
  connectedCallback() {
    const elem='künye';
    
    // top level element olduğunu varsayarak direkt #toc altına ekliyoruz
    const parenttoctag = 'toc';
    const toctag = `${parenttoctag}_${elem}`;
    const litm = this._build_li(toctag);
    document.querySelector(`#${parenttoctag}`).insertAdjacentHTML('beforeend', litm);

    const ttl =
    document.querySelector('#içndk-başlık').textContent = this.başlık.length <= 60 ? this.başlık : this.başlık.substring(0, 60).concat('…');
    document.title = `${this.no} : ${ttl}`;
    // document.querySelector('#yatay-içndk-başlık').textContent = `No: ${this.no}`;
    // document.querySelector('#yasa').insertAdjacentHTML('afterbegin',
    document.querySelector('#yasa > #bekle').insertAdjacentHTML('afterend',
       `<div class="row" toc-tag="${toctag}">
          <div class="col h5 fw-bold text-center pt-2 mb-1">${this.başlık}</div>
        </div>
        <div class="row border-bottom border-top py-1 mt-2">
          <div class="col-4 col-md-3 border-end">Kanun Numarası:</div><div class="col align-self-center">${this.no}</div>
        </div>
        <div class="row border-bottom py-1">
          <div class="col-4 col-md-3 border-end">Kabul Tarihi:</div><div class="col">${this.tarih}</div>
        </div>
        <div class="row border-bottom py-1">
          <div class="col-5 col-md-4 border-end">Yayımlandığı Resmi Gazete:</div>
          <div class="col col-md-3 align-self-center border-end">Tarih: ${this.rgazete_tarih}</div>
          <div class="col align-self-center">Sayı: ${this.rgazete_sayı}${this.rgazete_mükerrer ? ' (Mükerrer)':''}</div>
        </div>
        <div class="row border-bottom py-1 mb-3">
          <div class="col-5 col-md-4 align-self-center border-end">Yayımlandığı Düstur:</div>
          ${this.düstur_tertip ? '<div class="col col-md-2 align-self-center border-end">Tertip: '+this.düstur_tertip+'</div>' : ''}
          ${this.düstur_cilt ?  '<div class="col col-md-2 align-self-center border-end">Cilt: '+this.düstur_cilt+'</div>' : ''}
          ${this.düstur_sayfa ? '<div class="col align-self-center">Sayfa: '+this.düstur_sayfa+'</div>' : ''}
        </div>`);
  }

  _build_li(toctag) {
    // mvz-künye'ye özel olarak, toc'ta tıklandığında scroll etmesini sağlıyoruz (çünkü Madde'si yok)
    return `<li class="list-group-item">
              <a href="javascript:void(0)" onclick="document.querySelector('[toc-tag=${toctag}] div').scrollIntoView({block:'center'});window.matchMedia('(orientation: portrait)').matches && document.querySelector('#tocbuton').click()"
                class="link-body-emphasis link-offset-2 link-underline-opacity-10 link-underline-opacity-50-hover"
                data-toc-tag="${toctag}">[Künye]</a>
            </li>`;
  }
});

customElements.define('mvz-giriş', class extends HTMLElement {
  static observedAttributes = ['başlık'];

  constructor() {
    super();
  }

  get başlık() {
    return this.getAttribute('başlık');
  }

  connectedCallback() {
    const elem='giriş';
    
    
    this.insertAdjacentHTML('afterbegin',
                     `<div class="h5 fw-bold stil-kısım text-center mt-5 mb-1">${this.başlık}</div>`);

    // top level element olduğunu varsayarak direkt #toc altına ekliyoruz
    const parenttoctag = 'toc';
    const toctag = `${parenttoctag}_${elem}`;
    const litm = this._build_li(toctag);
    document.querySelector(`#${parenttoctag}`).insertAdjacentHTML('beforeend', litm);
    
    this.setAttribute('toc-tag', toctag);
  }

  _build_li(toctag) {
    // mvz-giriş'e özel olarak, toc'ta tıklandığında scroll etmesini sağlıyoruz (çünkü Madde'si yok)
    return `<li class="list-group-item">
              <a href="javascript:void(0)" onclick="document.querySelector('[toc-tag=${toctag}] div').scrollIntoView({block:'center'});window.matchMedia('(orientation: portrait)').matches && document.querySelector('#tocbuton').click()"
                class="link-body-emphasis link-offset-2 link-underline-opacity-10 link-underline-opacity-50-hover"
                data-toc-tag="${toctag}">${this.başlık}</a>
            </li>`;
  }

});

class Ortak extends HTMLElement {

  static observedAttributes = ['no', 'başlık'];

  constructor() {
    super();
  }

  get no() {
    return this.getAttribute('no');
  }

  get başlık() {
    return this.getAttribute('başlık');
  }

  connectedCallback() {
    
    this.insertAdjacentHTML('afterbegin', this._parça());

    let toctag;
    let parenttoctag = this.parentElement.getAttribute('toc-tag');
    if (parenttoctag && this.parentElement.querySelector(`mvz-${this.elem}`) === this) {
        // bu node ilk child element, o zaman collapsible bir liste yap
        toctag = `${parenttoctag}_${this.elem}-${this._no_getir()}`;
        const e = document.querySelector(`a[data-toc-tag=${parenttoctag}]`);
        e.setAttribute('href', `#${parenttoctag}`);
        e.setAttribute('data-bs-toggle', 'collapse');
        e.setAttribute('aria-expanded', 'false');
        e.setAttribute('aria-controls', `${parenttoctag}`);
        e.setAttribute('role', 'button');
        const litm = this._build_li(toctag);
        document.querySelector(`a[data-toc-tag=${parenttoctag}]`).insertAdjacentHTML('afterend',
          `<ul class="list-group list-group-flush collapse" id="${parenttoctag}">${litm}</ul>`);
    }
    else {
      parenttoctag ??= 'toc';
      // bu ilk child değil, mevcut collapsible listenin sonuna ekle
      // veya
      // bu top level bir element (parenttoctag == null), o zaman direkt #toc altına ekle
      toctag = `${parenttoctag}_${this.elem}-${this._no_getir()}`;
      const litm = this._build_li(toctag);
      document.querySelector(`#${parenttoctag}`).insertAdjacentHTML('beforeend', litm);
    }

    this.setAttribute('toc-tag', toctag);
  }

  _build_li(toctag) {
    return `<li class="list-group-item ${this.stil_txt3}">
              <a href="javascript:void(0)"
                class="link-body-emphasis link-offset-2 link-underline-opacity-10 link-underline-opacity-50-hover"
                data-toc-tag="${toctag}">${this._no_getir()}. <span class="hcl2">${this.başlık}</span></a>
            </li>`;
  }

}

class Başlık extends Ortak {
  constructor() {
    super();
  }

  _parça() {
    return `<div class="h5 fw-bold ${this.stil_txt} mb-1 text-center">${this.no.substring(this.no.indexOf('-')+1)} ${this.başlık_txt}</div>
            <div class="h5 fw-bold ${this.stil_txt2} text-center">${this.başlık}</div>`;
  }

  _no_getir() {
    return this.no.substring(0, this.no.indexOf('-'));
  }
}

class Altbaşlık extends Ortak {
  constructor() {
    super();
  }

  _parça() {
    return `<div class="h6 ${this.stil_txt}"><em>${this.no}. ${this.başlık}</em></div>`;
  }

  _no_getir() {
    return this.no;
  }
}

customElements.define('mvz-kitap', class extends Başlık {
  constructor() {
    super();
    this.elem = 'kitap';
    this.stil_txt = 'stil-kitap mt-5';
    this.stil_txt2 = '';
    this.stil_txt3 = 'toc-stil-kitap';
    this.başlık_txt = 'KİTAP';
  }
});

customElements.define('mvz-kısım', class extends Başlık {
  constructor() {
    super();
    this.elem = 'kısım';
    this.stil_txt = 'stil-kısım mt-5';
    this.stil_txt2 = '';
    this.stil_txt3 = 'toc-stil-kısım';
    this.başlık_txt = 'KISIM';
  }
});

customElements.define('mvz-bölüm', class extends Başlık {
  constructor() {
    super();
    this.elem = 'bölüm';
    this.stil_txt = 'stil-bölüm-bap bölüm-bap-fs mt-4';
    this.stil_txt2 = 'bölüm-bap-fs';
    this.stil_txt3 = 'toc-stil-bölüm-bap';
    this.başlık_txt = 'BÖLÜM';
  }
});

customElements.define('mvz-bap', class extends Başlık {
  constructor() {
    super();
    this.elem = 'bap';
    this.stil_txt = 'stil-bölüm-bap bölüm-bap-fs mt-4';
    this.stil_txt2 = 'bölüm-bap-fs';
    this.stil_txt3 = 'toc-stil-bölüm-bap';
    this.başlık_txt = 'BAP';
  }
});

customElements.define('mvz-ayırım', class extends Başlık {
  constructor() {
    super();
    this.elem = 'ayırım';
    this.stil_txt = 'stil-ayırım-fasıl ayırım-fasıl-fs mt-4';
    this.stil_txt2 = 'ayırım-fasıl-fs';
    this.stil_txt3 = 'toc-stil-ayırım-fasıl';
    this.başlık_txt = 'AYIRIM';
  }
});

customElements.define('mvz-fasıl', class extends Başlık {
  constructor() {
    super();
    this.elem = 'fasıl';
    this.stil_txt = 'stil-ayırım-fasıl ayırım-fasıl-fs mt-4';
    this.stil_txt2 = 'ayırım-fasıl-fs';
    this.stil_txt3 = 'toc-stil-ayırım-fasıl';
    this.başlık_txt = 'FASIL';
  }
});

customElements.define('mvz-b1', class extends Altbaşlık {
  constructor() {
    super();
    this.elem = 'b1';
    this.stil_txt = 'fw-bold stil-b1 mt-4';
    this.stil_txt2 = '';
    this.stil_txt3 = 'toc-stil-b1';
    this.başlık_txt = '';
  }
});

customElements.define('mvz-b2', class extends Altbaşlık {
  constructor() {
    super();
    this.elem = 'b2';
    this.stil_txt = 'stil-b2 mt-3';
    this.stil_txt2 = '';
    this.stil_txt3 = 'toc-stil-b2';
    this.başlık_txt = '';
  }
});

customElements.define('mvz-b3', class extends Altbaşlık {
  constructor() {
    super();
    this.elem = 'b3';
    this.stil_txt = 'stil-b3 mt-3';
    this.stil_txt2 = '';
    this.stil_txt3 = 'toc-stil-b3';
    this.başlık_txt = '';
  }
});

customElements.define('mvz-b4', class extends Altbaşlık {
  constructor() {
    super();
    this.elem = 'b4';
    this.stil_txt = 'stil-b4 mt-3';
    this.stil_txt2 = '';
    this.stil_txt3 = 'toc-stil-b4';
    this.başlık_txt = '';
  }
});

customElements.define('mvz-b5', class extends Altbaşlık {
  constructor() {
    super();
    this.elem = 'b5';
    this.stil_txt = 'mt-2';
    this.stil_txt2 = '';
    this.stil_txt3 = '';
    this.başlık_txt = '';
  }
});

customElements.define('mvz-b6', class extends Altbaşlık {
  constructor() {
    super();
    this.elem = 'b6';
    this.stil_txt = 'mt-2';
    this.stil_txt2 = '';
    this.stil_txt3 = '';
    this.başlık_txt = '';
  }
});

customElements.define('mvz-madde', class extends HTMLElement {
  static observedAttributes = ['no', 'başlık', 'tür', 'durum'];

  constructor() {
    super();
  }

  get no() {
    return this.getAttribute('no');
  }

  get başlık() {
    return this.getAttribute('başlık');
  }

  get tür() {
    return this.getAttribute('tür');
  }

  get durum() {
    return this.getAttribute('durum');
  }

  connectedCallback() {
    const elem = 'madde';
    const prfx = this.tür?.replace(/[ ]/g, '') ?? '';  // 'Ek Geçici' türündeki boşluk, daha sonra querySelector'da hataya neden oluyor, aşağıda

    let toctag;
    let parenttoctag = this.parentElement.getAttribute('toc-tag');
    if (parenttoctag && this.parentElement.querySelector(`mvz-${elem}`) === this) {
        // bu node ilk child element, o zaman collapsible bir liste yap
        toctag = `${parenttoctag}_${prfx}${elem}-${this.no.replace(/[/ ]/g, '')}`;  // madde numarasında boşluk veya / varsa querySelector hata veriyor (bunların kalkması id'nin unique kalmasına engel değil)
        const e = document.querySelector(`a[data-toc-tag=${parenttoctag}]`);
        e.setAttribute('href', `#${parenttoctag}`);
        e.setAttribute('data-bs-toggle', 'collapse');
        e.setAttribute('aria-expanded', 'false');
        e.setAttribute('aria-controls', `${parenttoctag}`);
        e.setAttribute('role', 'button');
        // const litm = this._build_li(toctag);
        document.querySelector(`a[data-toc-tag=${parenttoctag}]`).insertAdjacentHTML('afterend',
          `<ul class="list-group list-group-flush collapse" id="${parenttoctag}">${this._build_li(toctag, false)}</ul>`);
        document.querySelector('#madde').insertAdjacentHTML('beforeend', this._build_li(toctag, true));
    }
    else {
      parenttoctag ??= 'toc';
      // bu ilk child değil, mevcut collapsible listenin sonuna ekle
      // veya
      // bu top level bir element (parenttoctag == null), o zaman direkt #toc altına ekle
      toctag = `${parenttoctag}_${prfx}${elem}-${this.no.replace(/[/ ]/g, '')}`;  // madde numarasında boşluk veya / varsa querySelector hata veriyor (bunların kalkması id'nin unique kalmasına engel değil)
      // const litm = this._build_li(toctag);
      document.querySelector(`#${parenttoctag}`).insertAdjacentHTML('beforeend', this._build_li(toctag, false));
      document.querySelector('#madde').insertAdjacentHTML('beforeend', this._build_li(toctag, true));
    }

    this.setAttribute('toc-tag', toctag);

    const st = { 'iptal': 'İptal', 'mülga': 'Mülga'};
    let drm = ' ';
    if (this.durum?.match(/mülga|iptal/))
      drm = ` <em>${st[this.durum]}</em>`;

    let padtop='', ln='';
    if (this.başlık?.trim().length > 0)
      ln = `<div class="pt-2 fw-bold stil-madde-başlık">${this.başlık}</div>`;
    else
      padtop = 'pt-1 ';

    ln += `<div data-madde class="${padtop}mb-1"><strong>${this.tür ? this.tür+' ': ''}MADDE ${this.no}-</strong>${drm}</div>`;
    this.insertAdjacentHTML('afterbegin', ln);
  }

  _build_li(toctag, madde) {
    // madde  == true ise maddeler tablosuna ekleniyor, false ise başlıklar tablosuna ekleniyor demektir.
    //
    // block:'center' olarak scroll yapınca maddenin ortasına gidiyor, çok uzun maddelerde madde girişi kayboluyor,
    // bu nedenle selector'a div ekledim (ilk fıkraya hizalasın)
    let li_entry;
    if (madde)
      li_entry = `${this.tür ? this.tür+' ': ''}MADDE ${this.no}`;
    else
      li_entry = this.başlık?.trim().length > 0 ? `<span class="hcl2">${this.başlık}</span>` : `${this.tür ? this.tür+' ': ''}MADDE ${this.no}`;
    
    return `<li class="list-group-item">
            <a href="javascript:void(0)" onclick="document.querySelector('[toc-tag=${toctag}] div').scrollIntoView({block:'center'});window.matchMedia('(orientation: portrait)').matches && document.querySelector('#tocbuton').click()"
              class="link-body-emphasis link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover"
              data-toc-tag="${toctag}">${li_entry}</a>
          </li>`
  }

});

customElements.define('mvz-fıkra', class extends HTMLElement {
  static observedAttributes = ['no', 'durum'];

  constructor() {
    super();
  }

  get no() {
    return this.getAttribute('no');
  }

  get durum() {
    return this.getAttribute('durum');
  }

  connectedCallback() {
    const st = { 'iptal': 'İptal', 'mülga': 'Mülga'};
    let fkr;
    const f_no = +this.no == 0 ? '' : `<span class="stil-fıkra-no">(<strong>${this.no}</strong>)</span>`;

    if (this.durum?.match(/mülga|iptal/))
      fkr = `<em>${st[this.durum]}</em>`;
    else if (this.durum == 'işlenmiş')
      fkr = `<em class="hcl">${this.querySelector('template').content.textContent}</em>`;
    else
      fkr = `<span class="hcl">${this.querySelector('template').content.textContent}</span>`;

    if (this.no.match(/^[1AI]$/) && this.parentElement.querySelector('div[data-madde]'))
      // condition'daki &&'den sonraki kısım, maddesi olmayan bir bölümün (mesela Anayasanın Girişi) ilk fıkrasında
      // buraya girmeyip else kısmına düşmesi için
      if (this.parentElement.durum == 'işlenmiş')
        // işlenmiş maddeye fıkra no vermesin, ve italik yapsın
        this.parentElement.querySelector('div[data-madde]').insertAdjacentHTML('beforeend', `<em>${fkr}</em>`);
      else
        this.parentElement.querySelector('div[data-madde]').insertAdjacentHTML('beforeend', `${f_no} ${fkr}`);
    else
      this.insertAdjacentHTML('beforebegin', `<div class="mb-1">${f_no} ${fkr}</div`);
  }

});

customElements.define('mvz-bent', class extends HTMLElement {
  static observedAttributes = ['no', 'durum'];

  constructor() {
    super();
  }

  get no() {
    return this.getAttribute('no');
  }

  get durum() {
    return this.getAttribute('durum');
  }

  connectedCallback() {
    const st = { 'iptal': 'İptal', 'mülga': 'Mülga'};
    let bnt;
    const b_no = this.no == '0' ? '' : `<span class="stil-bent-no"><strong>${this.no}</strong>${this.no.endsWith('.')?'':')'}</span> `;  // 1. gibi rakam ve nokta olarak girilmiş kuraldışı bent no.lar için ) koymasın diye endsWith() kısmı

    if (this.durum?.match(/mülga|iptal/))
      bnt = `<em>${st[this.durum]}</em>`;
    else if (this.durum == "işlenmiş")
      bnt = `<em class="hcl">${this.querySelector('template').content.textContent}</em>`;
    else
      bnt = `<span class="hcl">${this.querySelector('template').content.textContent}</span>`;

    this.insertAdjacentHTML('beforebegin', `<div class="ps-2 mb-1">${b_no} ${bnt}</div>`);
  }

});

customElements.define('mvz-altbent', class extends HTMLElement {
  static observedAttributes = ['no', 'durum'];

  constructor() {
    super();
  }

  get no() {
    return this.getAttribute('no');
  }

  get durum() {
    return this.getAttribute('durum');
  }

  connectedCallback() {
    const st = { 'iptal': 'İptal', 'mülga': 'Mülga'};
    let abnt;
    const ab_no = this.no == '0' ? '' : `<strong>${this.no}</strong>${this.no.endsWith('.')?'':')'} `;  // 1. gibi rakam ve nokta olarak girilmiş kuraldışı altbent no.lar için ) koymasın diye endsWith() kısmı

    if (this.durum?.match(/mülga|iptal/))
      abnt = `<em>${st[this.durum]}</em>`;
    else
      abnt = `<span class="hcl">${this.querySelector('template').content.textContent}</span>`;

    this.insertAdjacentHTML('beforebegin', `<div class="ps-3 mb-1">${ab_no} ${abnt}</div>`);
  }

});

customElements.define('mvz-geçmişi', class extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    const elem='geçmişi';
    
    // top level element olduğunu varsayarak direkt #toc altına ekliyoruz
    const parenttoctag = 'toc';
    const toctag = `${parenttoctag}_${elem}`;
    const litm = this._build_li(toctag);
    document.querySelector(`#${parenttoctag}`).insertAdjacentHTML('beforeend', litm);

    this.insertAdjacentHTML('beforebegin',
       `<table class="table table-responsive table-bordered table-striped table-sm small text-center mt-5">
          <thead toc-tag="${toctag}">
            <tr class="align-middle">
                <th scope="col">Değiştiren / Ekleyen / İptal Eden</th>
                <th scope="col">Değişen / Eklenen / İptal Edilen</th>
                <th scope="col">Yürürlüğe Giriş Tarihi</th>
            </tr>
          </thead>
          <tbody class="align-middle" id="geçmişi">
          </tbody>
        </table>`);

      // this.setAttribute('toc-tag', toctag);

    // busy cursor'ı gizle
    document.querySelector('#bekle').classList.add('d-none');
  }

  _build_li(toctag) {
    // mvz-geçmiş'e özel olarak, toc'ta tıklandığında scroll etmesini sağlıyoruz (çünkü Madde'si yok)
    return `<li class="list-group-item">
              <a href="javascript:void(0)" onclick="document.querySelector('[toc-tag=${toctag}]').scrollIntoView({block:'center'});window.matchMedia('(orientation: portrait)').matches && document.querySelector('#tocbuton').click()"
                class="link-body-emphasis link-offset-2 link-underline-opacity-10 link-underline-opacity-50-hover"
                data-toc-tag="${toctag}">[Geçmişi]</a>
            </li>`;
  }
});

customElements.define('mvz-ide', class extends HTMLElement {
  static observedAttributes = ['no', 'idea', 'idelen', 'tarih'];

  constructor() {
    super();
  }

  get no() {
    return this.getAttribute('no');
  }

  get idea() {
    return this.getAttribute('idea');
  }

  get idelen() {
    return this.getAttribute('idelen');
  }

  get tarih() {
    return this.getAttribute('tarih');
  }

  connectedCallback() {
    let rowspan = '', i;
    const parça = {
      "idelen": this.idelen.split('|-|'),
      "tarih" : this.tarih.split('|-|')
    };
    if (parça['idelen'].length > 1) {
      rowspan = ` rowspan="${parça['idelen'].length}"`;
      document.querySelector('#geçmişi').insertAdjacentHTML('beforeend',
          `<tr><td${rowspan}>${this.idea}</td><td>${parça['idelen'][0]}</td><td>${parça['tarih'][0]}</td></tr>`);
      for (i=1; i<parça['idelen'].length; ++i)  
        document.querySelector('#geçmişi').insertAdjacentHTML('beforeend',
          `<tr><td>${parça['idelen'][i]}</td><td>${parça['tarih'][i]}</td></tr>`);
    }
    else
      document.querySelector('#geçmişi').insertAdjacentHTML('beforeend', 
        // `<div class="row align-items-stretch gx-1 border-bottom border-dark-subtle">
        //    <div class="col border-start border-end border-dark-subtle d-flex align-items-center justify-content-center">${this.idea}</div>
        //    <div class="col border-start border-end border-dark-subtle d-flex align-items-center justify-content-center">${this.idelen}</div>
        //    <div class="col border-start border-end border-dark-subtle d-flex align-items-center justify-content-center">${this.tarih}</div>
        // </div>`);
        
        `<tr><td>${this.idea}</td><td>${this.idelen}</td><td>${this.tarih}</td></tr>`);
  }

});

customElements.define('mvz-literal', class extends HTMLElement {
  static observedAttributes = ['konu', 'tür'];

  constructor() {
    super();
  }

  get konu() {
    return this.getAttribute('konu');
  }

  get tür() {
    return this.getAttribute('tür');
  }

  connectedCallback() {
    this.insertAdjacentHTML('beforebegin', `<div>${this.querySelector('template').innerHTML}</div>`);
  }

});
