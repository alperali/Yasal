import { readFile, writeFile } from 'fs';

const EoL = '\n';

readFile('history.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // boş satırları sil, satırları ayır, satır başı ve sonu boşlukları sil
    const lins = data.replace(/^ *\n/gm,'').split(EoL).map(e => e.trim());

    let i=0, k=1, sonuç='';
    sonuç = sonuç.concat('  <mvz-geçmişi>').concat(EoL);
    while (i < lins.length) {
      sonuç = sonuç.concat(`    <mvz-ide no="${k}" idea="${lins[i]}" idelen="${lins[i+1]}" tarih="${lins[i+2]}" />`).concat(EoL);
      i += 3;
      ++k;
    }
    sonuç = sonuç.concat('  </mvz-geçmişi>').concat(EoL);

    writeFile('hist.out', sonuç, (e) => {
       if (e) throw e;
    });

  });
  