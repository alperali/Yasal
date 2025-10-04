/*---------------------------------------------------------------------------
 * Yasal, https://github.com/alperali/Yasal
 * Telif Hakkı/Copyright A. Alper Atıcı. Her Hakkı Saklıdır.
 * All Rights Reserved. This is not free software.
 *---------------------------------------------------------------------------*/

import { belgeler, başlık_sıralı, sayı_sıralı } from './defs.js';

const cls_başlık_sıralı ='link-primary link-offset-2 link-underline-opacity-10 link-underline-opacity-100-hover';
const cls_sayı_sıralı   ='link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover';
const yıldız = '<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/></svg>';
const favoriler = JSON.parse(localStorage.getItem('favoriler')) ?? [];

let resp = await fetch('l.html');

document.querySelector('main').insertAdjacentHTML('afterbegin', await resp.text());

await import ('./gir.js');

function proc_fav() {
  if (this.checked && !favoriler.includes(this.dataset.no)) {
    favoriler.push(this.dataset.no);
    localStorage.setItem('favoriler', JSON.stringify(favoriler));
    if (document.querySelector('#lst-başlık').checked)
      document.querySelector('#tbfavoriler tbody').insertAdjacentHTML('beforeend',
      `<tr data-no="${+this.dataset.no}">
         <td><a href="./yasa.html?m=${+this.dataset.no}" class="${cls_başlık_sıralı}">${belgeler.get(+this.dataset.no).başlık}</a></td>
         <td class="align-middle">${+this.dataset.no}</td>
       </tr>`);
    else
      document.querySelector('#tbfavoriler tbody').insertAdjacentHTML('beforeend',
      `<tr data-no="${+this.dataset.no}">
         <td class="align-middle"><a href="./yasa.html?m=${+this.dataset.no}" class="${cls_sayı_sıralı}">${+this.dataset.no}</a></td>
         <td>${belgeler.get(+this.dataset.no).başlık}</td>
       </tr>`);
  }
  else if (!this.checked && favoriler.includes(this.dataset.no)) {
    favoriler.splice(favoriler.indexOf(this.dataset.no), 1);
    localStorage.setItem('favoriler', JSON.stringify(favoriler));
    document.querySelector(`#tbfavoriler tr[data-no="${this.dataset.no}"]`).remove();
  }
}

document.querySelector('#lst-başlık').addEventListener('change', () => {
  let tbl = '';
  başlık_sıralı
          .forEach(no => tbl = tbl.concat(`<tr>
    <td class="align-middle"><div class="form-check"><input class="form-check-input" type="checkbox" data-no="${no}"${favoriler.includes(no.toString()) ? ' checked':''}></div></td>
    <td><a href="./yasa.html?m=${no}" class="${cls_başlık_sıralı}">${belgeler.get(no).başlık}</a></td>
    <td class="align-middle">${no}</td>
    </tr>`));
  document.querySelector('#tbliste').replaceChildren();
  document.querySelector('#tbliste').insertAdjacentHTML('afterbegin',
    `<thead><tr><th scope="col">${yıldız}</th><th scope="col">Başlık</th><th scope="col">Sayı</th></tr></thead><tbody>${tbl}</tbody>`);
  document.querySelectorAll('#tbliste input[type=checkbox]').forEach(e => e.addEventListener('change', proc_fav));
  document.querySelector('#yatay-lst-başlık').checked = true;
  fav_tab_işle();

  localStorage.setItem('görünüm', 'başlık');
  if (init)
    init = false;
  else
    window.matchMedia('(orientation: portrait)').matches && document.querySelector('#tocbuton').click();

  function fav_tab_işle() {
    let tbl = '';
    favoriler.sort((a,b) => belgeler.get(+a).başlık.localeCompare(belgeler.get(+b).başlık, 'tr', {sensitivity: 'base'}))
             .forEach(no => tbl = tbl.concat(`<tr data-no="${+no}">
      <td><a href="./yasa.html?m=${+no}" class="${cls_başlık_sıralı}">${belgeler.get(+no).başlık}</a></td>
      <td class="align-middle">${+no}</td>
      </tr>`));
    document.querySelector('#tbfavoriler').replaceChildren();
    document.querySelector('#tbfavoriler').insertAdjacentHTML('afterbegin',
    `<thead><tr><th scope="col">Başlık</th><th scope="col">Sayı</th></tr></thead><tbody>${tbl}</tbody>`);
  }
});

document.querySelector('#yatay-lst-başlık').addEventListener('change', () => {
  document.querySelector('#lst-başlık').dispatchEvent(new Event('change'));
  document.querySelector('#lst-başlık').checked = true;
});

document.querySelector('#lst-sayı').addEventListener('change', () => {
  let tbl = '';
  sayı_sıralı
          .forEach(no => tbl = tbl.concat(`<tr>
    <td class="align-middle"><div class="form-check"><input class="form-check-input" type="checkbox" data-no="${no}"${favoriler.includes(no.toString()) ? ' checked':''}></div></td>
    <td class="align-middle"><a href="./yasa.html?m=${no}" class="${cls_sayı_sıralı}">${no}</a></td>
    <td>${belgeler.get(+no).başlık}</td></tr>`));
  document.querySelector('#tbliste').replaceChildren();
  document.querySelector('#tbliste').insertAdjacentHTML('afterbegin',
    `<thead><tr><th scope="col">${yıldız}</th><th scope="col">Sayı</th><th scope="col">Başlık</th></tr></thead><tbody>${tbl}</tbody>`);
  document.querySelectorAll('#tbliste input[type=checkbox]').forEach(e => e.addEventListener('change', proc_fav));
  document.querySelector('#yatay-lst-sayı').checked = true;
  fav_tab_işle();

  localStorage.setItem('görünüm', 'sayı');
  if (init)
    init = false;
  else
    window.matchMedia('(orientation: portrait)').matches && document.querySelector('#tocbuton').click();

  function fav_tab_işle() {
    let tbl = '';
    favoriler.sort((a,b) => +a - +b)
             .forEach(no => tbl = tbl.concat(`<tr data-no="${+no}">
      <td class="align-middle"><a href="./yasa.html?m=${+no}" class="${cls_sayı_sıralı}">${+no}</a></td>
      <td>${belgeler.get(+no).başlık}</td></tr>`));
    document.querySelector('#tbfavoriler').replaceChildren();
    document.querySelector('#tbfavoriler').insertAdjacentHTML('afterbegin',
    `<thead><tr><th scope="col">Sayı</th><th scope="col">Başlık</th></tr></thead><tbody>${tbl}</tbody>`);
  }
});

document.querySelector('#yatay-lst-sayı').addEventListener('change', () => {
  document.querySelector('#lst-sayı').dispatchEvent(new Event('change'));
  document.querySelector('#lst-sayı').checked = true;
});

document.querySelector('#favoriler-tab').addEventListener('click', () => sessionStorage.setItem('tabfav', true));
document.querySelector('#tamliste-tab').addEventListener('click', () => sessionStorage.setItem('tabfav', false));

const görün = localStorage.getItem('görünüm');
let init = true;
if (!görün) {
  document.querySelector('#yatay-lst-başlık').dispatchEvent(new Event('change'));
}
else if (görün == 'başlık')
  document.querySelector('#yatay-lst-başlık').dispatchEvent(new Event('change'));
else {
  document.querySelector('#yatay-lst-sayı').dispatchEvent(new Event('change'));
}

if (JSON.parse(sessionStorage.getItem('tabfav')))
  document.querySelector('#favoriler-tab').click();
