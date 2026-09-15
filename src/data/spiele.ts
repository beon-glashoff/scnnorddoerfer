/**
 * Heimspiele des SC Norddörfer.
 *
 * ACHTUNG – diese Liste ist ein Abzug, kein Live-Feed.
 * Einmalig übernommen von den Mannschaftsseiten auf fussball.de
 * (Saison 2026/27, abgerufen am 15.09.2026).
 *
 * So wird sie aktualisiert:
 *   1. Auf der Vereinsseite bei fussball.de jede Mannschaft öffnen
 *      https://www.fussball.de/verein/sc-norddoerfer-schleswig-holstein/-/id/00ES8GN8JC000094VV0AG08LVUPGND5I
 *   2. Aus dem Spielplan die Partien heraussuchen, bei denen der SCN Heimrecht hat
 *   3. Hier eintragen und `heimspieleStand` hochsetzen
 *
 * Dauerhaft besser ist das Spielplan-Widget von fussball.de. Das lässt sich
 * aber erst erzeugen, wenn die Domain sc-norddoerfer.de steht – es wird fest
 * auf eine Domain registriert. Siehe README.
 *
 * Vergangene Partien werden automatisch ausgeblendet: beim Bauen der Seite
 * und zusätzlich im Browser, damit die Liste auch ohne neuen Build stimmt.
 */

export type Heimspiel = {
  /** Anstoß als lokale Zeit, Format JJJJ-MM-TTThh:mm */
  anstoss: string;
  /** Mannschaft des SCN, passend zu den Namen in verein.ts */
  mannschaft: string;
  gegner: string;
  wettbewerb: string;
};

export const heimspieleStand = '15.09.2026';

export const heimspiele: Heimspiel[] = [
  // --- September 2026 ---
  { anstoss: '2026-09-18T19:30', mannschaft: 'Herren', gegner: 'TSV Stedesand', wettbewerb: 'Kreisklasse A' },
  { anstoss: '2026-09-20T11:00', mannschaft: 'E-Jugend', gegner: 'SG Südtondern Nord', wettbewerb: 'Kreisklasse A' },
  { anstoss: '2026-09-26T13:00', mannschaft: 'A-Jugend', gegner: 'SC Weiche Flensburg II', wettbewerb: 'Kreisliga' },
  { anstoss: '2026-09-27T11:00', mannschaft: 'E-Jugend', gegner: 'SV Frisia 03 Risum-Lindholm', wettbewerb: 'Kreisklasse A' },
  { anstoss: '2026-09-27T13:00', mannschaft: 'Damen', gegner: 'SG Langenhorn/Enge-Sande II', wettbewerb: 'Kreisklasse A' },

  // --- Oktober 2026 ---
  { anstoss: '2026-10-02T16:30', mannschaft: 'D-Jugend', gegner: 'Husumer SV III', wettbewerb: 'Kreisklasse A' },
  { anstoss: '2026-10-02T19:30', mannschaft: 'Herren', gegner: 'SV Dörpum II', wettbewerb: 'Kreisklasse A' },
  { anstoss: '2026-10-03T13:00', mannschaft: 'A-Jugend', gegner: 'SG Rot-Blau Lagedeich', wettbewerb: 'Kreisliga' },
  { anstoss: '2026-10-03T16:00', mannschaft: 'C-Jugend', gegner: 'SG Satrup-Havetoft', wettbewerb: 'Kreisliga' },
  { anstoss: '2026-10-16T19:30', mannschaft: 'Herren', gegner: 'SV Blau-Weiß Löwenstedt III', wettbewerb: 'Kreisklasse A' },
  { anstoss: '2026-10-23T19:30', mannschaft: 'Herren', gegner: 'TSV Süderlügum', wettbewerb: 'Kreisklasse A' },
  { anstoss: '2026-10-30T17:00', mannschaft: 'D-Jugend', gegner: 'SV Frisia 03 Risum-Lindholm II', wettbewerb: 'Kreisklasse A' },
  { anstoss: '2026-10-31T16:00', mannschaft: 'C-Jugend', gegner: 'SG Nordau', wettbewerb: 'Kreisliga' },

  // --- November 2026 ---
  { anstoss: '2026-11-01T13:00', mannschaft: 'Damen', gegner: 'Husumer SV', wettbewerb: 'Kreisklasse A' },
  { anstoss: '2026-11-06T17:00', mannschaft: 'D-Jugend', gegner: 'SG Mitte NF', wettbewerb: 'Kreisklasse A' },
  { anstoss: '2026-11-07T13:00', mannschaft: 'A-Jugend', gegner: 'SG SDU Nord 2', wettbewerb: 'Kreisliga' },
  { anstoss: '2026-11-07T16:00', mannschaft: 'C-Jugend', gegner: 'SG Leck/Achtrup/Ladelund', wettbewerb: 'Kreisliga' },
  { anstoss: '2026-11-14T15:30', mannschaft: 'Herren', gegner: 'FC Ellingstedt-Silberstedt', wettbewerb: 'Kreisklasse A' },
  { anstoss: '2026-11-15T11:00', mannschaft: 'E-Jugend', gegner: 'TSV Rot-Weiß Niebüll', wettbewerb: 'Kreisklasse A' },

  // --- März 2027 ---
  { anstoss: '2027-03-05T19:30', mannschaft: 'Herren', gegner: 'SG Mitte NF II', wettbewerb: 'Kreisklasse A' },
];

/** Partien ab jetzt, aufsteigend sortiert. */
export function kommendeHeimspiele(jetzt = new Date()): Heimspiel[] {
  return heimspiele
    .filter((s) => new Date(s.anstoss).getTime() >= jetzt.getTime())
    .sort((a, b) => a.anstoss.localeCompare(b.anstoss));
}

const tagFormat = new Intl.DateTimeFormat('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' });
const zeitFormat = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit' });
const monatFormat = new Intl.DateTimeFormat('de-DE', { month: 'long', year: 'numeric' });

export const spielTag = (s: Heimspiel) => tagFormat.format(new Date(s.anstoss));
export const spielZeit = (s: Heimspiel) => zeitFormat.format(new Date(s.anstoss)) + ' Uhr';
export const spielMonat = (s: Heimspiel) => monatFormat.format(new Date(s.anstoss));
