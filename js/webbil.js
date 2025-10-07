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
    document.title = `${this.no} - ${ttl}`;
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

customElements.define('mvz-kitap', class extends HTMLElement {      // aşağıda 'KİTAP' stringi ve elem const hariç Kısım ile aynı
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
    const elem='kitap';
    
    this.insertAdjacentHTML('afterbegin',
                     `<div class="h5 fw-bold stil-kitap text-center mt-5 mb-1">${this.no.substring(this.no.indexOf('-')+1)} KİTAP</div>
                      <div class="h5 fw-bold text-center">${this.başlık}</div>`);

    let toctag;
    let parenttoctag = this.parentElement.getAttribute('toc-tag');
    if (parenttoctag && this.parentElement.querySelector(`mvz-${elem}`) === this) {
        // bu node ilk child element, o zaman collapsible bir liste yap
        toctag = `${parenttoctag}_${elem}-${this.no.substring(0, this.no.indexOf('-'))}`;
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
      toctag = `${parenttoctag}_${elem}-${this.no.substring(0, this.no.indexOf('-'))}`;
      const litm = this._build_li(toctag);
      document.querySelector(`#${parenttoctag}`).insertAdjacentHTML('beforeend', litm);
    }

    this.setAttribute('toc-tag', toctag);
  }

  _build_li(toctag) {
    return `<li class="list-group-item toc-stil-kitap">
              <a href="javascript:void(0)"
                class="link-body-emphasis link-offset-2 link-underline-opacity-10 link-underline-opacity-50-hover"
                data-toc-tag="${toctag}">${this.no.substring(0, this.no.indexOf('-'))}. <span class="hcl2">${this.başlık}</span></a>
            </li>`;
  }
});

customElements.define('mvz-kısım', class extends HTMLElement {
  static observedAttributes = ['no', 'başlık'];

  constructor() {
    super();
    // console.log('Kısım ctor');
  }

  get no() {
    return this.getAttribute('no');
  }

  get başlık() {
    return this.getAttribute('başlık');
  }

  connectedCallback() {
    const elem='kısım';
    
    this.insertAdjacentHTML('afterbegin',
                     `<div class="h5 fw-bold stil-kısım text-center mt-5 mb-1">${this.no.substring(this.no.indexOf('-')+1)} KISIM</div>
                      <div class="h5 fw-bold text-center">${this.başlık}</div>`);

    let toctag;
    let parenttoctag = this.parentElement.getAttribute('toc-tag');
    if (parenttoctag && this.parentElement.querySelector(`mvz-${elem}`) === this) {
        // bu node ilk child element, o zaman collapsible bir liste yap
        toctag = `${parenttoctag}_${elem}-${this.no.substring(0, this.no.indexOf('-'))}`;
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
      toctag = `${parenttoctag}_${elem}-${this.no.substring(0, this.no.indexOf('-'))}`;
      const litm = this._build_li(toctag);
      document.querySelector(`#${parenttoctag}`).insertAdjacentHTML('beforeend', litm);
    }

    this.setAttribute('toc-tag', toctag);
  }

  _build_li(toctag) {
    return `<li class="list-group-item toc-stil-kısım">
              <a href="javascript:void(0)"
                class="link-body-emphasis link-offset-2 link-underline-opacity-10 link-underline-opacity-50-hover"
                data-toc-tag="${toctag}">${this.no.substring(0, this.no.indexOf('-'))}. <span class="hcl2">${this.başlık}</span></a>
            </li>`;
  }
});

customElements.define('mvz-bölüm', class extends HTMLElement {      // aşağıda 'BÖLÜM' stringi ve elem const hariç Kısım ile aynı 
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
    const elem = 'bölüm';
    
    this.insertAdjacentHTML('afterbegin',
                     `<div class="h5 fw-bold stil-bölüm-bap bölüm-bap-fs text-center mt-4 mb-1">${this.no.substring(this.no.indexOf('-')+1)} BÖLÜM</div>
                      <div class="h5 fw-bold bölüm-bap-fs text-center">${this.başlık}</div>`);
  
    let toctag;
    let parenttoctag = this.parentElement.getAttribute('toc-tag');
    if (parenttoctag && this.parentElement.querySelector(`mvz-${elem}`) === this) {
        // bu node ilk child element, o zaman collapsible bir liste yap
        toctag = `${parenttoctag}_${elem}-${this.no.substring(0, this.no.indexOf('-'))}`;
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
      toctag = `${parenttoctag}_${elem}-${this.no.substring(0, this.no.indexOf('-'))}`;
      const litm = this._build_li(toctag);
      document.querySelector(`#${parenttoctag}`).insertAdjacentHTML('beforeend', litm);
    }

    this.setAttribute('toc-tag', toctag);
  }
  
  _build_li(toctag) {
    return `<li class="list-group-item toc-stil-bölüm-bap">
              <a href="javascript:void(0)"
                class="link-body-emphasis link-offset-2 link-underline-opacity-10 link-underline-opacity-50-hover"
                data-toc-tag="${toctag}">${this.no.substring(0, this.no.indexOf('-'))}. <span class="hcl2">${this.başlık}</span></a>
            </li>`;
  }
});

customElements.define('mvz-bap', class extends HTMLElement {      // aşağıda 'BAP' stringi ve elem const hariç Bölüm ile aynı 
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
    const elem = 'bap';
    
    this.insertAdjacentHTML('afterbegin',
                     `<div class="h5 fw-bold stil-bölüm-bap bölüm-bap-fs text-center mt-4 mb-1">${this.no.substring(this.no.indexOf('-')+1)} BAP</div>
                      <div class="h5 fw-bold bölüm-bap-fs text-center">${this.başlık}</div>`);
  
    let toctag;
    let parenttoctag = this.parentElement.getAttribute('toc-tag');
    if (parenttoctag && this.parentElement.querySelector(`mvz-${elem}`) === this) {
        // bu node ilk child element, o zaman collapsible bir liste yap
        toctag = `${parenttoctag}_${elem}-${this.no.substring(0, this.no.indexOf('-'))}`;
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
      toctag = `${parenttoctag}_${elem}-${this.no.substring(0, this.no.indexOf('-'))}`;
      const litm = this._build_li(toctag);
      document.querySelector(`#${parenttoctag}`).insertAdjacentHTML('beforeend', litm);
    }

    this.setAttribute('toc-tag', toctag);
  }
  
  _build_li(toctag) {
    return `<li class="list-group-item toc-stil-bölüm-bap">
              <a href="javascript:void(0)"
                class="link-body-emphasis link-offset-2 link-underline-opacity-10 link-underline-opacity-50-hover"
                data-toc-tag="${toctag}">${this.no.substring(0, this.no.indexOf('-'))}. <span class="hcl2">${this.başlık}</span></a>
            </li>`;
  }
});

customElements.define('mvz-ayırım', class extends HTMLElement {      // aşağıda 'AYIRIM' stringi ve const elem hariç Bölüm ile aynı 
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
    const elem = 'ayırım';
    
    this.insertAdjacentHTML('afterbegin',
                     `<div class="h5 fw-bold stil-ayırım-fasıl ayırım-fasıl-fs text-center mt-4 mb-1">${this.no.substring(this.no.indexOf('-')+1)} AYIRIM</div>
                      <div class="h5 fw-bold ayırım-fasıl-fs text-center">${this.başlık}</div>`);
  
    let toctag;
    let parenttoctag = this.parentElement.getAttribute('toc-tag');
    if (parenttoctag && this.parentElement.querySelector(`mvz-${elem}`) === this) {
        // bu node ilk child element, o zaman collapsible bir liste yap
        toctag = `${parenttoctag}_${elem}-${this.no.substring(0, this.no.indexOf('-'))}`;
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
      toctag = `${parenttoctag}_${elem}-${this.no.substring(0, this.no.indexOf('-'))}`;
      const litm = this._build_li(toctag);
      document.querySelector(`#${parenttoctag}`).insertAdjacentHTML('beforeend', litm);
    }

    this.setAttribute('toc-tag', toctag);
  }
  
  _build_li(toctag) {
    return `<li class="list-group-item toc-stil-ayırım-fasıl">
              <a href="javascript:void(0)"
                class="link-body-emphasis link-offset-2 link-underline-opacity-10 link-underline-opacity-50-hover"
                data-toc-tag="${toctag}">${this.no.substring(0, this.no.indexOf('-'))}. <span class="hcl2">${this.başlık}</span></a>
            </li>`;
  }
});

customElements.define('mvz-fasıl', class extends HTMLElement {      // aşağıda 'FASIL' stringi ve const elem hariç Bölüm ile aynı 
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
    const elem = 'fasıl';
    
    this.insertAdjacentHTML('afterbegin',
                     `<div class="h5 fw-bold stil-ayırım-fasıl ayırım-fasıl-fs text-center mt-4 mb-1">${this.no.substring(this.no.indexOf('-')+1)} FASIL</div>
                      <div class="h5 fw-bold ayırım-fasıl-fs text-center">${this.başlık}</div>`);
  
    let toctag;
    let parenttoctag = this.parentElement.getAttribute('toc-tag');
    if (parenttoctag && this.parentElement.querySelector(`mvz-${elem}`) === this) {
        // bu node ilk child element, o zaman collapsible bir liste yap
        toctag = `${parenttoctag}_${elem}-${this.no.substring(0, this.no.indexOf('-'))}`;
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
      toctag = `${parenttoctag}_${elem}-${this.no.substring(0, this.no.indexOf('-'))}`;
      const litm = this._build_li(toctag);
      document.querySelector(`#${parenttoctag}`).insertAdjacentHTML('beforeend', litm);
    }

    this.setAttribute('toc-tag', toctag);
  }
  
  _build_li(toctag) {
    return `<li class="list-group-item toc-stil-ayırım-fasıl">
              <a href="javascript:void(0)"
                class="link-body-emphasis link-offset-2 link-underline-opacity-10 link-underline-opacity-50-hover"
                data-toc-tag="${toctag}">${this.no.substring(0, this.no.indexOf('-'))}. <span class="hcl2">${this.başlık}</span></a>
            </li>`;
  }
});

customElements.define('mvz-b1', class extends HTMLElement {
  static observedAttributes = ['no', 'başlık'];

  constructor() {
    super();
    // console.log('B1 ctor');
  }

  get no() {
    return this.getAttribute('no');
  }

  get başlık() {
    return this.getAttribute('başlık');
  }

  connectedCallback() {
    const elem = 'b1';
    
    this.insertAdjacentHTML('afterbegin',
                     `<div class="h6 fw-bold stil-b1 mt-4"><em>${this.no}. ${this.başlık}</em></div>`);

    let toctag;
    let parenttoctag = this.parentElement.getAttribute('toc-tag');
    if (parenttoctag && this.parentElement.querySelector(`mvz-${elem}`) === this) {
        // bu node ilk child element, o zaman collapsible bir liste yap
        toctag = `${parenttoctag}_${elem}-${this.no}`;
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
      toctag = `${parenttoctag}_${elem}-${this.no}`;
      const litm = this._build_li(toctag);
      document.querySelector(`#${parenttoctag}`).insertAdjacentHTML('beforeend', litm);
    }

    this.setAttribute('toc-tag', toctag);
  }

  _build_li(toctag) {
    return `<li class="list-group-item toc-stil-b1">
              <a href="javascript:void(0)"
                class="link-body-emphasis link-offset-2 link-underline-opacity-10 link-underline-opacity-50-hover"
                data-toc-tag="${toctag}">${this.no}. <span class="hcl2">${this.başlık}</span></a>
            </li>`;
  }
});

customElements.define('mvz-b2', class extends HTMLElement {
  static observedAttributes = ['no', 'başlık'];

  constructor() {
    super();
    // console.log('B2 ctor');
  }

  get no() {
    return this.getAttribute('no');
  }

  get başlık() {
    return this.getAttribute('başlık');
  }

  connectedCallback() {
    const elem = 'b2';

    this.insertAdjacentHTML('afterbegin',
                     `<div class="h6 mt-3 stil-b2"><em>${this.no}. ${this.başlık}</em></div>`);

    let toctag;
    let parenttoctag = this.parentElement.getAttribute('toc-tag');
    if (parenttoctag && this.parentElement.querySelector(`mvz-${elem}`) === this) {
        // bu node ilk child element, o zaman collapsible bir liste yap
        toctag = `${parenttoctag}_${elem}-${this.no}`;
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
      toctag = `${parenttoctag}_${elem}-${this.no}`;
      const litm = this._build_li(toctag);
      document.querySelector(`#${parenttoctag}`).insertAdjacentHTML('beforeend', litm);
    }

    this.setAttribute('toc-tag', toctag);
  }

  _build_li(toctag) {
    return `<li class="list-group-item toc-stil-b2">
              <a href="javascript:void(0)"
                class="link-body-emphasis link-offset-2 link-underline-opacity-10 link-underline-opacity-50-hover"
                data-toc-tag="${toctag}">${this.no}. <span class="hcl2">${this.başlık}</span></a>
            </li>`;
  }
});

customElements.define('mvz-b3', class extends HTMLElement {
  static observedAttributes = ['no', 'başlık'];

  constructor() {
    super();
    // console.log('B3 ctor');
  }

  get no() {
    return this.getAttribute('no');
  }

  get başlık() {
    return this.getAttribute('başlık');
  }

  connectedCallback() {
    const elem = 'b3';

    this.insertAdjacentHTML('afterbegin',
                     `<div class="h6 mt-3 stil-b3"><em>${this.no}. ${this.başlık}</em></div>`);

    let toctag;
    let parenttoctag = this.parentElement.getAttribute('toc-tag');
    if (parenttoctag && this.parentElement.querySelector(`mvz-${elem}`) === this) {
        // bu node ilk child element, o zaman collapsible bir liste yap
        toctag = `${parenttoctag}_${elem}-${this.no}`;
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
      toctag = `${parenttoctag}_${elem}-${this.no}`;
      const litm = this._build_li(toctag);
      document.querySelector(`#${parenttoctag}`).insertAdjacentHTML('beforeend', litm);
    }

    this.setAttribute('toc-tag', toctag);
  }

  _build_li(toctag) {
    return `<li class="list-group-item toc-stil-b3">
              <a href="javascript:void(0)"
                class="link-body-emphasis link-offset-2 link-underline-opacity-10 link-underline-opacity-50-hover"
                data-toc-tag="${toctag}">${this.no}. <span class="hcl2">${this.başlık}</span></a>
            </li>`;
  }
});

customElements.define('mvz-b4', class extends HTMLElement {
  static observedAttributes = ['no', 'başlık'];

  constructor() {
    super();
    // console.log('B4 ctor');
  }

  get no() {
    return this.getAttribute('no');
  }

  get başlık() {
    return this.getAttribute('başlık');
  }

  connectedCallback() {
    const elem = 'b4';

    this.insertAdjacentHTML('afterbegin',
                     `<div class="h6 mt-3 stil-b4"><em>${this.no}. ${this.başlık}</em></div>`);

    let toctag;
    let parenttoctag = this.parentElement.getAttribute('toc-tag');
    if (parenttoctag && this.parentElement.querySelector(`mvz-${elem}`) === this) {
        // bu node ilk child element, o zaman collapsible bir liste yap
        toctag = `${parenttoctag}_${elem}-${this.no}`;
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
      toctag = `${parenttoctag}_${elem}-${this.no}`;
      const litm = this._build_li(toctag);
      document.querySelector(`#${parenttoctag}`).insertAdjacentHTML('beforeend', litm);
    }

    this.setAttribute('toc-tag', toctag);
  }

  _build_li(toctag) {
    return `<li class="list-group-item toc-stil-b4">
              <a href="javascript:void(0)"
                class="link-body-emphasis link-offset-2 link-underline-opacity-10 link-underline-opacity-50-hover"
                data-toc-tag="${toctag}">${this.no}. <span class="hcl2">${this.başlık}</span></a>
            </li>`;
  }
});

customElements.define('mvz-b5', class extends HTMLElement {
  static observedAttributes = ['no', 'başlık'];

  constructor() {
    super();
    // console.log('B5 ctor');
  }

  get no() {
    return this.getAttribute('no');
  }

  get başlık() {
    return this.getAttribute('başlık');
  }

  connectedCallback() {
    const elem = 'b5';

    this.insertAdjacentHTML('afterbegin',
                     `<div class="h6 mt-2"><em>${this.no}. ${this.başlık}</em></div>`);

    let toctag;
    let parenttoctag = this.parentElement.getAttribute('toc-tag');
    if (parenttoctag && this.parentElement.querySelector(`mvz-${elem}`) === this) {
        // bu node ilk child element, o zaman collapsible bir liste yap
        toctag = `${parenttoctag}_${elem}-${this.no}`;
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
      toctag = `${parenttoctag}_${elem}-${this.no}`;
      const litm = this._build_li(toctag);
      document.querySelector(`#${parenttoctag}`).insertAdjacentHTML('beforeend', litm);
    }

    this.setAttribute('toc-tag', toctag);
  }

  _build_li(toctag) {
    return `<li class="list-group-item">
              <a href="javascript:void(0)"
                class="link-body-emphasis link-offset-2 link-underline-opacity-10 link-underline-opacity-50-hover"
                data-toc-tag="${toctag}">${this.no}. <span class="hcl2">${this.başlık}</span></a>
            </li>`;
  }
});

customElements.define('mvz-b6', class extends HTMLElement {
  static observedAttributes = ['no', 'başlık'];

  constructor() {
    super();
    // console.log('B6 ctor');
  }

  get no() {
    return this.getAttribute('no');
  }

  get başlık() {
    return this.getAttribute('başlık');
  }

  connectedCallback() {
    const elem = 'b6';

    this.insertAdjacentHTML('afterbegin',
                     `<div class="h6 mt-2"><em>${this.no}. ${this.başlık}</em></div>`);

    // if (true)
    //   return;

    let toctag;
    let parenttoctag = this.parentElement.getAttribute('toc-tag');
    if (parenttoctag && this.parentElement.querySelector(`mvz-${elem}`) === this) {
        // bu node ilk child element, o zaman collapsible bir liste yap
        toctag = `${parenttoctag}_${elem}-${this.no}`;
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
      toctag = `${parenttoctag}_${elem}-${this.no}`;
      const litm = this._build_li(toctag);
      document.querySelector(`#${parenttoctag}`).insertAdjacentHTML('beforeend', litm);
    }

    this.setAttribute('toc-tag', toctag);
  }

  _build_li(toctag) {
    return `<li class="list-group-item">
              <a href="javascript:void(0)"
                class="link-body-emphasis link-offset-2 link-underline-opacity-10 link-underline-opacity-50-hover"
                data-toc-tag="${toctag}">${this.no}. <span class="hcl2">${this.başlık}</span></a>
            </li>`;
  }
});


customElements.define('mvz-madde', class extends HTMLElement {
  static observedAttributes = ['no', 'başlık', 'tür'];

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

  connectedCallback() {
    const elem = 'madde';
    const prfx = this.tür ? this.tür : '';

    let toctag;
    let parenttoctag = this.parentElement.getAttribute('toc-tag');
    if (parenttoctag && this.parentElement.querySelector(`mvz-${elem}`) === this) {
        // bu node ilk child element, o zaman collapsible bir liste yap
        toctag = `${parenttoctag}_${prfx}${elem}-${this.no.replace('/', '')}`;  // 8/A gibi madde numarası olursa sonra querySelector hata veriyor / nedeniyle
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
      toctag = `${parenttoctag}_${prfx}${elem}-${this.no.replace('/', '')}`;  // 8/A gibi madde numarası olursa sonra querySelector hata veriyor / nedeniyle
      // const litm = this._build_li(toctag);
      document.querySelector(`#${parenttoctag}`).insertAdjacentHTML('beforeend', this._build_li(toctag, false));
      document.querySelector('#madde').insertAdjacentHTML('beforeend', this._build_li(toctag, true));
    }

    this.setAttribute('toc-tag', toctag);
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
  static observedAttributes = ['no'];

  constructor() {
    super();
  }

  get no() {
    return this.getAttribute('no');
  }

  connectedCallback() {
    let r;
    const fkr = this.querySelector('template').content.textContent;

    if (this.no.match(/^[1A]$/) && this.parentElement.nodeName == 'MVZ-MADDE') {  // Giriş'te Madde yazmasın diye MVZ-MADDE kontrolü eklendi (nodeName'ler hep upper-case)
                                                                         // (Giriş, Başlangıç gibi bölümlerde madde yok, direkt fıkralar yazılıyor)
      const p = fkr.trim().match(/^Mülga$|^[İi]ptal$|^(-[0-9]+)/i);
      // yukarıdaki pattern Madde için mülga/iptal kontrolü yapıyor, 1. fıkra mülga/iptal ise fıkra numarasız iptal/mülga yazması için
      // yukardaki pattern'da son kısım "MADDE 3 ila 24" gibi bir durumda fıkra no vermesin diye ("MADDE 3- -24: " diye render edilecek)
      if (p)
        if (p[1])
          r = `<span><strong>${p[1]}</strong>${fkr.substring(p[1].length)}</span>`;  // "MADDE 3- -24: " durumu. -24 kısmını bold yapıp sonra fıkranın gerisini ekliyor
        else
          r = `<span>${fkr}</span>`;
      else
        r = `<span class="stil-fıkra-no">(<strong>${this.no}</strong>)</span> <span class="hcl">${fkr}</span>`;

      let pad='', ln='';
      if (this.parentElement.başlık?.trim().length > 0)
        ln = `<div class="pt-2 fw-bold stil-madde-başlık">${this.parentElement.başlık}</div>`;
      else
        pad = 'pt-1 ';
      
      ln += `<div class="${pad}mb-1"><strong>${this.parentElement.tür ? this.parentElement.tür+' ': ''}MADDE ${this.parentElement.no}-</strong> ${r}</div>`;
      this.insertAdjacentHTML('afterbegin', ln);

      // this.insertAdjacentHTML('afterbegin',
      //   `<div class="mb-1">                                              
      //      <strong>${this.parentElement.tür ? this.parentElement.tür+' ': ''}MADDE ${this.parentElement.no}-</strong> ${r}</div>`);
      // if (this.parentElement.başlık?.trim().length > 0)                  
      //   this.insertAdjacentHTML('afterbegin', `<div class="pt-2 fw-bold">${this.parentElement.başlık}</div>`);
    }
    else {
      const f_no = +this.no == 0 ? '' : `<span class="stil-fıkra-no">(<strong>${this.no}</strong>)</span> `;
      this.insertAdjacentHTML('afterbegin', `<div class="mb-1">${f_no}<span class="hcl">${fkr}</span></div>`);
    }
  }

});

customElements.define('mvz-bent', class extends HTMLElement {
  static observedAttributes = ['no'];

  constructor() {
    super();
  }

  get no() {
    return this.getAttribute('no');
  }

  connectedCallback() {
    const b_no = this.no == '0' ? '' : `<span class="stil-bent-no"><strong>${this.no}</strong>${this.no.endsWith('.')?'':')'}</span> `;  // 1. gibi rakam ve nokta olarak girilmiş kuraldışı bentler için ) koymasın diye endsWith() kısmı
    this.insertAdjacentHTML('afterbegin', `<div class="ps-2 mb-1">${b_no}<span class="hcl">${this.querySelector('template').content.textContent}</span></div>`);
  }

});

customElements.define('mvz-altbent', class extends HTMLElement {
  static observedAttributes = ['no'];

  constructor() {
    super();
  }

  get no() {
    return this.getAttribute('no');
  }

  connectedCallback() {
    const ab_no = this.no == '0' ? '' : `<strong>${this.no}</strong>) `
    this.insertAdjacentHTML('afterbegin', `<div class="ps-3 mb-1">${ab_no}<span class="hcl">${this.querySelector('template').content.textContent}</span></div>`);
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

    this.insertAdjacentHTML('afterbegin',
        //  `<div class="text-center mt-5 mb-3 small" id="geçmişi">
        //     <div class="row align-items-stretch gx-1 border-bottom border-top border-dark" toc-tag="${toctag}">
        //       <div class="col border-start border-end border-dark-subtle d-flex align-items-center justify-content-center"><strong>Değiştiren / Ekleyen / İptal Eden</strong></div>
        //       <div class="col border-start border-end border-dark-subtle d-flex align-items-center justify-content-center"><strong>Değişen / Eklenen / İptal Edilen</strong></div>
        //       <div class="col border-start border-end border-dark-subtle d-flex align-items-center justify-content-center"><strong>Tarih</strong></div>
        //     </div>
        //   </div>`);


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
  // static observedAttributes = ['no'];

  constructor() {
    super();
  }

  // get no() {
    // return this.getAttribute('no');
  // }

  connectedCallback() {
    this.insertAdjacentHTML('afterbegin', `<div>${this.querySelector('template').innerHTML}</div>`);
  }

});