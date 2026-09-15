/**
 * Prueft vor dem Build, ob alle im Quelltext verwendeten Tabler-Icons
 * im installierten Icon-Satz existieren. Ein falscher Name laesst den
 * Astro-Build sonst mitten im Rendern abbrechen.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const satz = JSON.parse(readFileSync('node_modules/@iconify-json/tabler/icons.json', 'utf8'));
const vorhanden = new Set([...Object.keys(satz.icons), ...Object.keys(satz.aliases ?? {})]);

const dateien = [];
(function sammeln(pfad) {
  for (const eintrag of readdirSync(pfad)) {
    const voll = join(pfad, eintrag);
    if (statSync(voll).isDirectory()) sammeln(voll);
    else if (/\.(astro|ts|js|md)$/.test(eintrag)) dateien.push(voll);
  }
})('src');

const fehlend = new Map();
for (const datei of dateien) {
  const inhalt = readFileSync(datei, 'utf8');
  for (const treffer of inhalt.matchAll(/tabler:([a-z0-9-]+)/g)) {
    if (!vorhanden.has(treffer[1])) {
      if (!fehlend.has(treffer[1])) fehlend.set(treffer[1], new Set());
      fehlend.get(treffer[1]).add(datei);
    }
  }
}

if (fehlend.size > 0) {
  console.error('\nUnbekannte Tabler-Icons:');
  for (const [name, orte] of fehlend) {
    console.error(`  tabler:${name}  ->  ${[...orte].join(', ')}`);
  }
  console.error('\nNamen nachschlagen: https://tabler.io/icons\n');
  process.exit(1);
}
