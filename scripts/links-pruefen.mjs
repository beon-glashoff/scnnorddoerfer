/**
 * Prueft nach dem Build, ob alle internen Verweise im Ordner dist
 * auch wirklich auf eine vorhandene Seite oder Datei zeigen.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const wurzel = 'dist';
if (!existsSync(wurzel)) {
  console.error('Kein dist-Ordner. Erst "npm run build" ausfuehren.');
  process.exit(1);
}

const seiten = [];
(function sammeln(pfad) {
  for (const eintrag of readdirSync(pfad)) {
    const voll = join(pfad, eintrag);
    if (statSync(voll).isDirectory()) sammeln(voll);
    else if (eintrag.endsWith('.html')) seiten.push(voll);
  }
})(wurzel);

const kaputt = [];
for (const seite of seiten) {
  const inhalt = readFileSync(seite, 'utf8');
  for (const treffer of inhalt.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const ziel = treffer[1];
    const kandidaten = [
      join(wurzel, ziel),
      join(wurzel, ziel, 'index.html'),
      join(wurzel, ziel.replace(/\/$/, '') + '.html'),
    ];
    if (!kandidaten.some((k) => existsSync(k))) {
      kaputt.push(`${seite.replace('dist/', '')}  ->  ${ziel}`);
    }
  }
}

if (kaputt.length > 0) {
  console.error('\nVerweise ins Leere:');
  for (const z of [...new Set(kaputt)]) console.error('  ' + z);
  console.error('');
  process.exit(1);
}
console.log(`Alle internen Verweise auf ${seiten.length} Seiten sind in Ordnung.`);
