/**
 * Zentrale Inhaltsdaten des SC Norddörfer.
 *
 * Quelle: 01_Assets/07_MDs/03_Abgleich_Lieferung_Tom.md (Stand 14.09.2026)
 * sowie 01_Assets/04_Texte/SCN_Uebungsangebote_Hallenbelegung.csv
 *
 * Schreibweise: im Fliesstext immer "SC Norddörfer",
 * der volle Vereinsname nur im Impressum und in den Kontaktdaten.
 */

/**
 * Stand des letzten inhaltlichen Abgleichs mit dem Verein.
 * Wird auf der Seite bei den Trainingszeiten ausgewiesen – bitte bei jeder
 * Aktualisierung des Uebungsplans mitziehen.
 */
export const standDerDaten = 'September 2026';

export const verein = {
  kurzname: 'SC Norddörfer',
  gegruendet: 1963,
  vollname: 'Sport-Club Norddörfer Sylt e.V.',
  claim: 'Eine Insel, ein Verein!',
  strasse: 'Norderweg 4',
  plz: '25996',
  ort: 'Wenningstedt',
  telefon: '+49 171 2144481',
  telefonHref: '+491712144481',
  email: 'info@sc-norddoerfer.de',
  instagram: 'https://www.instagram.com/scnorddoerfersylt/',
  facebook: 'https://www.facebook.com/scnorddoerferofficial',
  vereinsregister: 'VR 194 NI, Amtsgericht Niebüll',
} as const;

export type Sparte = {
  slug: string;
  name: string;
  kurz: string;
  icon: string;
  farbe: 'rot' | 'blau' | 'gold';
  alter: string;
  zeiten: string[];
  /** Kompakte Angabe fuer Karten und Uebersichten */
  zeitKurz: string;
  ort: string;
  ansprechpartner: string;
  telefon?: string;
  /** true = Beschreibungstext liegt vor und ist freigegeben */
  textVorhanden: boolean;
  /** true = es gibt bereits eigenes Bildmaterial */
  fotoVorhanden: boolean;
};

export const sparten: Sparte[] = [
  {
    slug: 'fussball',
    name: 'Fußball',
    kurz: 'Sieben Mannschaften von den G-Junioren bis zu Herren und Damen – die größte Sparte im Verein.',
    icon: 'tabler:ball-football',
    farbe: 'rot',
    alter: 'ab 4 Jahren bis Ü30',
    zeiten: ['Mo, Di, Mi, Do und Fr – je nach Mannschaft'],
    zeitKurz: 'Mo bis Fr, je nach Mannschaft',
    ort: 'Sportplatz, bei schlechtem Wetter in der Halle',
    ansprechpartner: 'Nick Erdmann',
    telefon: '0176 43450045',
    textVorhanden: true,
    fotoVorhanden: true,
  },
  {
    slug: 'eltern-kind-turnen',
    name: 'Eltern-Kind-Turnen',
    kurz: 'Toben, klettern, balancieren und singen – für die Lütten zusammen mit Eltern oder Großeltern.',
    icon: 'tabler:mood-kid',
    farbe: 'gold',
    alter: '2 bis 6 Jahre',
    zeiten: ['Dienstag, 16:30 – 17:30 Uhr'],
    zeitKurz: 'Dienstag, 16:30 – 17:30 Uhr',
    ort: 'Sporthalle',
    ansprechpartner: 'Annika Johannsen',
    telefon: '0151 21291761',
    textVorhanden: true,
    fotoVorhanden: true,
  },
  {
    slug: 'tanzen',
    name: 'Tanzen',
    kurz: 'Kreativer Kindertanz und Contemporary Dance – von der Vorschule bis ins Jugendalter.',
    icon: 'tabler:music',
    farbe: 'blau',
    alter: '5 bis 15 Jahre',
    zeiten: [
      'Montag, 15:00 – 16:00 Uhr · Kreativer Kindertanz, 5–7 Jahre',
      'Montag, 16:00 – 17:00 Uhr · Contemporary Dance, 8–12 Jahre',
      'Montag, 17:00 – 18:00 Uhr · Contemporary Dance, 13–15 Jahre',
    ],
    zeitKurz: 'Montags, drei Gruppen ab 15:00 Uhr',
    ort: 'Sporthalle',
    ansprechpartner: 'Esther El Ghazy',
    telefon: '0151 11606718',
    textVorhanden: true,
    fotoVorhanden: false,
  },
  {
    slug: 'fit-for-fun',
    name: 'Fit for Fun',
    kurz: 'Haltung, Kräftigung, Beweglichkeit und Gleichgewicht – Bewegung trotz(t) Alter.',
    icon: 'tabler:stretching',
    farbe: 'rot',
    alter: 'ab 30 Jahren, jüngere herzlich willkommen',
    zeiten: ['Montag, 18:30 – 19:30 Uhr'],
    zeitKurz: 'Montag, 18:30 – 19:30 Uhr',
    ort: 'Sporthalle',
    ansprechpartner: 'Birgit Stöver',
    telefon: '0170 3804070',
    textVorhanden: true,
    fotoVorhanden: false,
  },
  {
    slug: 'zumba-mobility',
    name: 'Zumba & Mobility',
    kurz: 'Tanz-Fitness zu lateinamerikanischen Rhythmen, kombiniert mit gezieltem Mobilitätstraining.',
    icon: 'tabler:yoga',
    farbe: 'gold',
    alter: 'alle Altersgruppen und Fitnesslevel',
    zeiten: ['Mittwoch, 18:00 – 19:00 Uhr'],
    zeitKurz: 'Mittwoch, 18:00 – 19:00 Uhr',
    ort: 'Sporthalle',
    ansprechpartner: 'Kerrin',
    textVorhanden: true,
    fotoVorhanden: false,
  },
  {
    slug: 'taekwondo',
    name: 'Taekwondo',
    kurz: 'Koreanische Kampfkunst und olympische Disziplin – Technik, Formen, Selbstverteidigung.',
    icon: 'tabler:karate',
    farbe: 'blau',
    alter: 'ab 15 Jahren',
    zeiten: ['Dienstag, 18:30 – 20:00 Uhr', 'Donnerstag, 18:30 – 20:00 Uhr'],
    zeitKurz: 'Dienstag und Donnerstag, 18:30 Uhr',
    ort: 'Sporthalle',
    ansprechpartner: 'Neal Saurin',
    telefon: '0171 3165942',
    textVorhanden: true,
    fotoVorhanden: false,
  },
  {
    slug: 'muay-thai',
    name: 'Muay Thai',
    kurz: 'Die Kunst der acht Gliedmaßen – Technik, Kondition und ein faires Miteinander.',
    icon: 'tabler:flame',
    farbe: 'rot',
    alter: 'ab 15 Jahren, ab 12 mit Zustimmung der Eltern',
    zeiten: ['Montag, ab 19:30 Uhr', 'Mittwoch, ab 19:00 Uhr'],
    zeitKurz: 'Montag und Mittwoch, abends',
    ort: 'Sporthalle',
    ansprechpartner: 'Marko Kobasic',
    telefon: '0176 47863543',
    textVorhanden: true,
    fotoVorhanden: false,
  },
  {
    slug: 'dart',
    name: 'Dart',
    kurz: 'Die „Blinddarters“ – seit über 20 Jahren fest in der Sylter Dart-Szene, mit zwei Ligamannschaften.',
    icon: 'tabler:target-arrow',
    farbe: 'blau',
    alter: 'von 16 bis 99 Jahren',
    zeiten: ['Montag, ab 19:00 Uhr', 'Donnerstag, 19:00 – 20:00 Uhr'],
    zeitKurz: 'Montag und Donnerstag, ab 19:00 Uhr',
    ort: 'Vereinsheim',
    ansprechpartner: 'Alexander „Ebi“ Ebert',
    telefon: '0151 50412257',
    textVorhanden: true,
    fotoVorhanden: false,
  },
];

/** Fußballmannschaften – die größte und belebteste Sparte. */
/** Absteigend sortiert: von den Herren bis zu den G-Junioren. */
export const mannschaften = [
  { name: 'Herren', zeiten: ['Di 19:00 – 20:30', 'Do 19:00 – 20:30'], trainer: 'Nick Erdmann' },
  { name: 'Damen', zeiten: ['Mi 18:30 – 20:00'], trainer: 'Marko Schneider-Pauly' },
  { name: 'A-Jugend', zeiten: ['Mo 19:00 – 20:30', 'Mi 19:00 – 20:30'], trainer: 'Maximilian Brachtendorf' },
  { name: 'C-Junioren', zeiten: ['Mi 17:30 – 19:00', 'Fr 17:30 – 19:00'], trainer: 'Kevin Tillmann' },
  { name: 'D-Junioren', zeiten: ['Mi 17:00 – 18:30', 'Fr 15:00 – 16:30'], trainer: 'Max Neumann' },
  { name: 'E-Junioren', zeiten: ['Di 17:30 – 19:00', 'Do 17:30 – 19:00'], trainer: 'Chris Jaeckstet' },
  { name: 'F-Junioren', zeiten: [], trainer: null, sucht: true },
  { name: 'G-Junioren', zeiten: ['Do 16:30 – 17:30'], trainer: 'Robert Schröder' },
];

/** Wochenplan – gespiegelt aus SCN_Uebungsangebote_Hallenbelegung.csv */
export const wochenplan = [
  { tag: 'Montag', eintraege: [
    { zeit: '15:00 – 18:00', was: 'Tanzen · drei Gruppen', ort: 'Halle', slug: 'tanzen', einheiten: 3 },
    { zeit: '18:30 – 19:30', was: 'Fit for Fun', ort: 'Halle', slug: 'fit-for-fun' },
    { zeit: '19:00 – 20:30', was: 'Fußball · A-Jugend', ort: 'Platz', slug: 'fussball' },
    { zeit: 'ab 19:00', was: 'Dart', ort: 'Vereinsheim', slug: 'dart' },
    { zeit: 'ab 19:30', was: 'Muay Thai', ort: 'Halle', slug: 'muay-thai' },
  ]},
  { tag: 'Dienstag', eintraege: [
    { zeit: '16:30 – 17:30', was: 'Eltern-Kind-Turnen', ort: 'Halle', slug: 'eltern-kind-turnen' },
    { zeit: '17:30 – 19:00', was: 'Fußball · E-Junioren', ort: 'Platz', slug: 'fussball' },
    { zeit: '18:30 – 20:00', was: 'Taekwondo', ort: 'Halle', slug: 'taekwondo' },
    { zeit: '19:00 – 20:30', was: 'Fußball · Herren', ort: 'Platz', slug: 'fussball' },
  ]},
  { tag: 'Mittwoch', eintraege: [
    { zeit: '17:00 – 18:30', was: 'Fußball · D-Junioren', ort: 'Platz', slug: 'fussball' },
    { zeit: '17:30 – 19:00', was: 'Fußball · C-Junioren', ort: 'Platz', slug: 'fussball' },
    { zeit: '18:00 – 19:00', was: 'Zumba & Mobility', ort: 'Halle', slug: 'zumba-mobility' },
    { zeit: '18:30 – 20:00', was: 'Fußball · Damen', ort: 'Platz', slug: 'fussball' },
    { zeit: '19:00 – 20:30', was: 'Fußball · A-Jugend', ort: 'Platz', slug: 'fussball' },
    { zeit: 'ab 19:00', was: 'Muay Thai', ort: 'Halle', slug: 'muay-thai' },
  ]},
  { tag: 'Donnerstag', eintraege: [
    { zeit: '16:30 – 17:30', was: 'Fußball · G-Junioren', ort: 'Platz', slug: 'fussball' },
    { zeit: '17:30 – 19:00', was: 'Fußball · E-Junioren', ort: 'Platz', slug: 'fussball' },
    { zeit: '18:30 – 20:00', was: 'Taekwondo', ort: 'Halle', slug: 'taekwondo' },
    { zeit: '19:00 – 20:00', was: 'Dart', ort: 'Vereinsheim', slug: 'dart' },
    { zeit: '19:00 – 20:30', was: 'Fußball · Herren', ort: 'Platz', slug: 'fussball' },
  ]},
  { tag: 'Freitag', eintraege: [
    { zeit: '15:00 – 16:30', was: 'Fußball · D-Junioren', ort: 'Platz', slug: 'fussball' },
    { zeit: '17:30 – 19:00', was: 'Fußball · C-Junioren', ort: 'Platz', slug: 'fussball' },
  ]},
];

/**
 * Anzahl der Trainings- und Kurseinheiten pro Woche, abgeleitet aus dem Wochenplan.
 * Gebuendelte Eintraege (z. B. die drei Tanzgruppen) zaehlen ueber `einheiten`.
 */
export const einheitenProWoche = wochenplan.reduce(
  (summe, tag) => summe + tag.eintraege.reduce((t, e) => t + ('einheiten' in e ? e.einheiten : 1), 0),
  0,
);

/** Monatliche Mitgliedsbeiträge, Einzug vierteljährlich per Lastschrift. */
export const beitraege = [
  { wer: 'Kinder, Schüler, Studenten, Azubis', preis: '10,00 €' },
  { wer: 'Erwachsene', preis: '15,00 €' },
  { wer: 'Alleinerziehend mit Kind', preis: '15,00 €' },
  { wer: 'Familie (Ehepaar mit Kindern)', preis: '20,00 €' },
  { wer: 'Förderndes Mitglied', preis: '8,00 €' },
];

export const navigation = [
  { href: '/verein/', label: 'Verein' },
  { href: '/sportarten/', label: 'Sportarten' },
  { href: '/trainingszeiten/', label: 'Trainingszeiten' },
  { href: '/mitglied-werden/', label: 'Mitglied werden' },
  { href: '/kontakt/', label: 'Kontakt' },
];
