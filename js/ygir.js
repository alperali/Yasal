/*---------------------------------------------------------------------------
 * Yasal, https://github.com/alperali/Yasal
 * Telif Hakkı/Copyright A. Alper Atıcı. Her Hakkı Saklıdır.
 * All Rights Reserved. This is not free software.
 *---------------------------------------------------------------------------*/

const hclwrk = new Worker('./js/seslemle.js', { type: 'module' });

let resp = await fetch('y.html');

document.querySelector('main').insertAdjacentHTML('afterbegin', await resp.text());

await import('./gir.js');

// const m = belgeler.get(parseInt(new URLSearchParams(window.location.search).get('m'))).pos;
const m = new URLSearchParams(window.location.search).get('m');

resp = await fetch(`./yasa/${m}.html`);

document.querySelector('#yasa').insertAdjacentHTML('beforeend', await resp.text());

await import('./webbil.js');

hclwrk.addEventListener('message', (() => {
  // let hclnodes = document.querySelectorAll('.hcl2, .hcl');
  let hclnodes = Array.from(document.querySelectorAll('.hcl2')).concat(Array.from(document.querySelectorAll('.hcl')));
  let n = 0
  // worker'dan gelen 'hazır' mesajını ignore edip postMessage() yaparak başlıyoruz
  return function(e) {
    if (e.data.msg == 'yanıt')
      hclnodes[n++].textContent = e.data.r;
    if (n < hclnodes?.length)
      hclwrk.postMessage({msg:'hecele', hcl: hclnodes[n].textContent});
    else {
      hclnodes = null;  // bellek tasarrufu
      console.log(`${((Date.now() - hecele_başla)/1000).toFixed(2)} sn.`);
    }
  }
})());

hclwrk.postMessage({msg:'hazır'});
const hecele_başla = Date.now();
