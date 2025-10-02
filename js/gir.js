/*---------------------------------------------------------------------------
 * Yasal, https://github.com/alperali/Yasal
 * Telif Hakkı/Copyright A. Alper Atıcı. Her Hakkı Saklıdır.
 * All Rights Reserved. This is not free software.
 *---------------------------------------------------------------------------*/

// tema değiştir
// ========================================
document.querySelector('#tema').addEventListener('click', (() => {
  let sonraki, tema = localStorage.getItem('tema');

  if (!tema) {
    tema = 'light';
    sonraki = 'dark';
    localStorage.setItem('tema', tema);
  }
  else if (tema == 'dark') {
    sonraki = 'light';
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    document.querySelector('#tema-light').classList.add('d-none');
    document.querySelector('#yatay-tema-light').classList.add('d-none');
    document.querySelector('#tema-dark').classList.remove('d-none');
    document.querySelector('#yatay-tema-dark').classList.remove('d-none');
  }
  else
    sonraki = 'dark';

  return function(e) {
    document.querySelector(`#tema-${tema}`).classList.add('d-none');
    document.querySelector(`#yatay-tema-${tema}`).classList.add('d-none');
    document.querySelector(`#tema-${sonraki}`).classList.remove('d-none');
    document.querySelector(`#yatay-tema-${sonraki}`).classList.remove('d-none');
    [tema, sonraki] = [sonraki, tema];
    document.documentElement.setAttribute('data-bs-theme', tema);
    localStorage.setItem('tema', tema);
  };

})());
document.querySelector('#yatay-tema').addEventListener('click', () => document.querySelector('#tema').click());

// çubuk taşı (düşey)
// ===================================
document.querySelector('#çutaşı').addEventListener('click', (() => {
  let sonraki, çubuk = localStorage.getItem('dşy-çubuk');
  if (!çubuk) {
    çubuk = 'üst';
    sonraki = 'alt';
    localStorage.setItem('dşy-çubuk', çubuk);
    document.querySelector('#yasa').classList.add('üst-kaydır');
  }
  else if (çubuk == 'üst') {
    sonraki = 'alt';
    document.querySelector('#yasa').classList.add('üst-kaydır');
  }
  else {
    sonraki = 'üst';
    document.querySelector('#çubuk').classList.add('altta');
    document.querySelector('#yasa').classList.add('alt-kaydır');
    document.querySelector('#üst').classList.add('d-none');
    document.querySelector('#alt').classList.remove('d-none');
  }

  return function(e) {
    document.querySelector(`#${çubuk}`).classList.add('d-none');
    document.querySelector(`#${sonraki}`).classList.remove('d-none');
    [çubuk, sonraki] = [sonraki, çubuk];
    if (çubuk == 'alt') {
      document.querySelector('#çubuk').classList.add('altta');
      document.querySelector('#yasa').classList.remove('üst-kaydır');
      document.querySelector('#yasa').classList.add('alt-kaydır');
    }
    else {
      document.querySelector('#çubuk').classList.remove('altta');
      document.querySelector('#yasa').classList.remove('alt-kaydır');
      document.querySelector('#yasa').classList.add('üst-kaydır');
    }
    localStorage.setItem('dşy-çubuk', çubuk);
  };

})());

// çubuk taşı (yatay)
// ===================================
document.querySelector('#yatay-çutaşı').addEventListener('click', (() => {
  let sonraki, çubuk = localStorage.getItem('yty-çubuk');
  if (!çubuk) {
    çubuk = 'sol';
    sonraki = 'sağ';
    localStorage.setItem('yty-çubuk', çubuk);
    document.querySelector('#yatay-içndk').classList.add('border-end');
  }
  else if (çubuk == 'sol') {
    sonraki = 'sağ';
    document.querySelector('#yatay-içndk').classList.add('border-end');
  }
  else {
    sonraki = 'sol';
    document.querySelector('#yty-ekran').classList.add('flex-row-reverse');
    document.querySelector('#yatay-içndk').classList.add('border-start');
    document.querySelector(`#sol`).classList.add('d-none');
    document.querySelector(`#sağ`).classList.remove('d-none');
  }

  return function(e) {
    document.querySelector(`#${çubuk}`).classList.add('d-none');
    document.querySelector(`#${sonraki}`).classList.remove('d-none');
    [çubuk, sonraki] = [sonraki, çubuk];
    if (çubuk == 'sol') {
      document.querySelector('#yty-ekran').classList.remove('flex-row-reverse');
      document.querySelector('#yatay-içndk').classList.add('border-end');
      document.querySelector('#yatay-içndk').classList.remove('border-start');
    }
    else {
      document.querySelector('#yty-ekran').classList.add('flex-row-reverse');
      document.querySelector('#yatay-içndk').classList.remove('border-end');
      document.querySelector('#yatay-içndk').classList.add('border-start');
    }
    localStorage.setItem('yty-çubuk', çubuk);
  };

})());


const ekran_yatay = window.matchMedia("(orientation: landscape)");
if (ekran_yatay.matches) {
  // ilk baştan yatayda, o halde taşı
  document.querySelector('#yatay-tabpanel-toc')?.appendChild(document.querySelector('#toc'));
  document.querySelector('#yatay-tabpanel-madde')?.appendChild(document.querySelector('#madde'));
}

ekran_yatay.addEventListener('change', e => {
  if (e.matches) {
    document.querySelector('#yatay-tabpanel-toc')?.appendChild(document.querySelector('#toc'));
    document.querySelector('#yatay-tabpanel-madde')?.appendChild(document.querySelector('#madde'));
  }
  else {
    document.querySelector('#tabpanel-toc')?.appendChild(document.querySelector('#toc'));
    document.querySelector('#tabpanel-madde')?.appendChild(document.querySelector('#madde'));
  }
});
