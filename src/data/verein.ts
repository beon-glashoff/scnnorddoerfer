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
export const standDerDaten = 'November 2026';

export const verein = {
  kurzname: 'SC Norddörfer',
  gegruendet: 1963,
  vollname: 'Sport-Club Norddörfer Sylt e.V.',
  claim: 'Eine Insel, ein Verein!',
  strasse: 'Norderweg 4',
  plz: '25996',
  ort: 'Wenningstedt-Braderup',
  telefon: '+49 171 2144481',
  telefonHref: '+491712144481',
  email: 'info@sc-norddoerfer.de',
  instagram: 'https://www.instagram.com/scnorddoerfersylt/',
  facebook: 'https://www.facebook.com/scnorddoerferofficial',
  /** Vereinshymne bei Spotify */
  spotify: 'https://open.spotify.com/track/6uIOR1rqQxMgXqsy7PKqEO',
  vereinsregister: 'VR 194 NI, Amtsgericht Niebüll',
} as const;

/** Ansprechperson oder Trainer:in mit Telefonnummer */
export type Kontakt = { name: string; telefon?: string };

const listenFormat = new Intl.ListFormat('de-DE', { type: 'conjunction' });
/** Namen als Aufzaehlung, z. B. "Neal Saurin und Finn Wright" */
export const kontaktNamen = (kontakte: Kontakt[]) => listenFormat.format(kontakte.map((k) => k.name));

/** Inhalte der Spartenseite. Aufbau ist fuer alle Sparten gleich. */
export type SpartenDetail = {
  /** Einleitung direkt unter der Überschrift */
  intro: string;
  /** Fliesstext-Abschnitte mit eigener Überschrift */
  abschnitte: { titel: string; absaetze: string[] }[];
  /** Was zum Training mitzubringen ist */
  mitbringen?: string[];
  /** Hervorgehobener Hinweis, z. B. zur Aufsichtspflicht */
  hinweis?: { titel: string; text: string };
  /** Zitat als gestalterischer Akzent */
  zitat?: { text: string; quelle: string };
};

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
  /** Ansprechpersonen der Sparte, die erste steht vorn */
  kontakte: Kontakt[];
  /** true = Beschreibungstext liegt vor und ist freigegeben */
  textVorhanden: boolean;
  /** true = es gibt bereits eigenes Bildmaterial */
  fotoVorhanden: boolean;
  /** Ausfuehrliche Inhalte der Spartenseite */
  detail?: SpartenDetail;
};

export const sparten: Sparte[] = [
  {
    slug: 'fussball',
    name: 'Fußball',
    kurz: 'Acht Mannschaften von der G-Jugend bis zu Herren und Damen – die größte Sparte im Verein.',
    icon: 'tabler:ball-football',
    farbe: 'rot',
    alter: 'ab 4 Jahren bis Ü30',
    zeiten: ['Di, Mi, Do und Fr – je nach Mannschaft'],
    zeitKurz: 'Di bis Fr, je nach Mannschaft',
    ort: 'Sportplatz, bei schlechtem Wetter in der Halle',
    kontakte: [{ name: 'Tom Langmaack', telefon: '0171 2144481' }],
    textVorhanden: true,
    fotoVorhanden: true,
    detail: {
      intro:
        'Acht Mannschaften, fünf Trainingstage in der Woche und ein Platz mit Flutlicht: Fußball ist ' +
        'die größte Sparte beim SC Norddörfer – vom ersten Ballgefühl in der G-Jugend ' +
        'bis zum Punktspiel der Herren und Damen.',
      abschnitte: [
        {
          titel: 'Jeder Jahrgang zählt',
          absaetze: [
            'Die Herren treten in der Kreisklasse A an, die Damen in der Frauen-Kreisklasse. Dazu kommen vier Jugendmannschaften im Ligabetrieb sowie F- und G-Jugend, die noch ohne Tabelle und Punkte spielen.',
            'Dass jeder Jahrgang eine Mannschaft hat, ist auf einer Insel nicht selbstverständlich. Wird ein Jahrgang zu dünn, legen wir zusammen: Unsere A-Jugend besteht heute zu großen Teilen aus B-Jugendlichen. Hauptsache, sie stehen auf dem Platz.',
          ],
        },
        {
          titel: 'Worauf es uns ankommt',
          absaetze: [
            'Neben der nötigen Portion Fußballverrücktheit zählen bei uns Fleiß, Zuverlässigkeit, Respekt, Toleranz, Teamgeist und Siegeswille.',
            'Und ganz wichtig: der Spaß. Wer mitspielen will, kann das bei uns – unabhängig davon, wie gut er oder sie schon ist.',
          ],
        },
        {
          titel: 'Wo wir spielen',
          absaetze: [
            'Trainiert wird draußen auf dem Sportplatz am Norderweg. Bis 2023 mussten wir in der dunklen Jahreszeit auf Nachbarplätze ausweichen – seit die Flutlichtanlage steht, finden Training und Heimspiele auf eigenem Platz statt. Möglich wurde sie durch das Engagement des Präsidiums und zahlreiche Spenden.',
            'Bei schlechtem Wetter und im Winter zieht das Training in die Norddörfer Halle um. Beides liegt an derselben Adresse, einmal quer über den Parkplatz.',
          ],
        },
      ],
    },
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
    kontakte: [{ name: 'Julia Filipenko', telefon: '0173 7966537' }],
    textVorhanden: true,
    fotoVorhanden: true,
    detail: {
      intro:
        'Jede Woche heißt es bei uns für die Lütten: einmal richtig auspowern. Spielerisch werden dabei ' +
        'Bewegung und Koordination gefördert – und Eltern und Großeltern sind mittendrin statt nur dabei.',
      abschnitte: [
        {
          titel: 'Was passiert in der Stunde?',
          absaetze: [
            'In der Halle warten jede Menge Möglichkeiten zum Toben, Spielen und Ausprobieren. Reckstangen, Ringe, Bälle, Matten und viele weitere Gelegenheiten zum Klettern und Balancieren wollen erobert werden.',
            'Die richtige Musik und gemeinsames Singen dürfen dabei natürlich nicht fehlen.',
          ],
        },
        {
          titel: 'Komm einfach vorbei',
          absaetze: [
            'Wenn auch Du Lust hast, mit anderen Kindern bei uns zu spielen, dann komm doch dienstags in die Norddörfer Halle. Deine Eltern und Großeltern sind ebenso herzlich willkommen.',
          ],
        },
      ],
      mitbringen: ['Gute Laune', 'Lust auf Bewegung', 'Sportkleidung', 'Deine Eltern oder Großeltern'],
      hinweis: {
        titel: 'Eltern bleiben dabei',
        text:
          'Die Eltern bleiben während der Einheit in der Halle und tragen die Verantwortung für ihr Kind. ' +
          'Sie unterstützen beim Sprung vom Trampolin, beim Balancieren und – ganz wichtig – beim Auf- und Abbau.',
      },
    },
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
    kontakte: [{ name: 'Esther El Ghazy', telefon: '0151 11606718' }],
    textVorhanden: true,
    fotoVorhanden: false,
    detail: {
      intro:
        'Montagnachmittag gehört die Halle den Tänzerinnen und Tänzern. In drei Gruppen, nach Alter ' +
        'sortiert, geht es vom ersten spielerischen Bewegen bis zum zeitgenössischen Tanz.',
      abschnitte: [
        {
          titel: 'Kreativer Kindertanz, 5 bis 7 Jahre',
          absaetze: [
            'Der kreative Kindertanz ist die Basis für alle weiteren Tanzarten – für klassisches Ballett ebenso wie für Modern Dance, zeitgenössischen Tanz oder Hip-Hop. Hier werden Kinder mit viel Phantasie spielerisch an den Tanz und seine vielfältigen Bewegungsmöglichkeiten herangeführt.',
            'Körperbewusstsein, Beweglichkeit, Kraft, Koordination und Rhythmik werden vermittelt – vor allem aber der Spaß an der Bewegung zur Musik. Tanztechnische Übungen und Elemente aus dem klassischen Tanz und dem Modern Dance fließen altersgerecht in den Stundenablauf ein.',
          ],
        },
        {
          titel: 'Contemporary Dance, 8 bis 15 Jahre',
          absaetze: [
            'Der zeitgenössische Tanz eignet sich hervorragend für Kinder und Jugendliche. Festgelegte Tanzübungen im Stand, am Boden und in der Fortbewegung schulen Koordination und Rhythmusgefühl und fördern gleichzeitig gesunden Muskelaufbau und Beweglichkeit.',
            'Kleine Improvisationen schärfen die Wahrnehmung von Raum und Musik und regen die Kreativität an. Getanzt wird zu den unterschiedlichsten Musikrichtungen, von Klassik bis Pop, und Elemente aus vielen Tanzrichtungen fließen in den Unterricht ein.',
          ],
        },
      ],
      mitbringen: [
        'Gute Laune und Lust auf Tanz',
        'Sportkleidung',
        'Turnschuhe reichen für den Anfang',
        'Bei regelmäßiger Teilnahme lohnen sich Ballettschläppchen',
      ],
      hinweis: {
        titel: 'Ohne Eltern in der Halle',
        text:
          'Der Unterricht findet ohne Begleitung der Eltern statt – selbstverständlich dürfen sie gerne ' +
          'in den Umkleidekabinen warten. Eine regelmäßige Teilnahme ist von Vorteil, um Fortschritte zu erzielen.',
      },
    },
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
    kontakte: [{ name: 'Birgit Stöver', telefon: '0170 3804070' }],
    textVorhanden: true,
    fotoVorhanden: false,
    detail: {
      intro:
        'Bei Fit for Fun erwartet dich ein umfangreiches Sportangebot. Wir trainieren Haltung und Bewegung, ' +
        'kräftigen und dehnen die Muskulatur und arbeiten an Gleichgewicht und Sturzprophylaxe.',
      abschnitte: [
        {
          titel: 'Für wen ist das?',
          absaetze: [
            'Wir sind eine bunt gemischte Gruppe ab 30 Jahren bis unbegrenzt – denn Bewegung trotz(t) Alter. Aber auch Jüngere sind herzlich willkommen.',
          ],
        },
        {
          titel: 'Was bieten wir an?',
          absaetze: [
            'Ein abwechslungsreiches Training mit Fitnesscircle, Stabitraining, Atmung, Koordination, Ausdauer, Dance, Muskelaufbau und -erhaltung, Spiraldynamik und Entspannung – und vielem mehr.',
            'Kommt einfach vorbei und macht mit, wir freuen uns auf euch.',
          ],
        },
      ],
      mitbringen: [
        'Spaß und Freude an der Bewegung',
        'Sportliche, bequeme Kleidung',
        'Turn- oder Gymnastikschuhe',
        'Handtuch und etwas zu trinken',
      ],
    },
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
    kontakte: [{ name: 'Kerrin Feddersen', telefon: '0170 3492035' }],
    textVorhanden: true,
    fotoVorhanden: false,
    detail: {
      intro:
        'Mittwochabend wird in der Halle getanzt und gedehnt: Kerrin kombiniert Zumba® mit CIRCL Mobility™. ' +
        'Wie sich die Stunde aufteilt, kann dabei von Woche zu Woche variieren.',
      abschnitte: [
        {
          titel: 'Was ist Zumba®?',
          absaetze: [
            'Zumba® ist ein energiegeladenes Tanz-Fitness-Programm, das mit lateinamerikanischen und internationalen Rhythmen Ausdauer, Koordination und Spaß am Bewegen fördert. Es ist für alle Altersgruppen und Fitnesslevel geeignet.',
          ],
        },
        {
          titel: 'Was ist CIRCL Mobility™?',
          absaetze: [
            'CIRCL Mobility™ ist ein von Zumba® entwickeltes Programm, das auf der wissenschaftlichen Grundlage der funktionellen Bewegung basiert. Es verbessert Beweglichkeit und Flexibilität des Körpers durch gezielte Mobilitäts-, Dehn- und Atemübungen.',
          ],
        },
        {
          titel: 'Zusammen ergibt das …',
          absaetze: [
            'Beide Formate vereint ein umfassendes Training: auspowern, Stress abbauen, Spaß haben und gleichzeitig Beweglichkeit, Balance und Körpergefühl verbessern.',
            'So fördern sie Gesundheit, Fitness und das Gemeinschaftsgefühl im Verein.',
          ],
        },
      ],
      mitbringen: [
        'Gute Laune',
        'Sportschuhe',
        'Etwas zu trinken',
        'Auf Wunsch die eigene Matte – für alle anderen liegen Matten bereit',
      ],
    },
  },
  {
    slug: 'taekwondo',
    name: 'Taekwondo',
    kurz: 'Koreanische Kampfkunst und olympische Disziplin – Technik, Formen, Selbstverteidigung.',
    icon: 'tabler:karate',
    farbe: 'blau',
    alter: 'ab 15 Jahren',
    zeiten: ['Dienstag, 18:45 – 20:00 Uhr', 'Donnerstag, 18:45 – 20:00 Uhr'],
    zeitKurz: 'Dienstag und Donnerstag, 18:45 Uhr',
    ort: 'Sporthalle',
    kontakte: [
      { name: 'Neal Saurin', telefon: '0171 3165942' },
      { name: 'Finn Wright', telefon: '0162 1376548' },
    ],
    textVorhanden: true,
    fotoVorhanden: true,
    detail: {
      intro:
        'Zweimal in der Woche wird es in der Norddörfer Halle laut: Beim Taekwondo lernst du eine ' +
        'traditionelle Kampfkunst, bei der es genauso um Technik und Kondition geht wie um Respekt ' +
        'und einen klaren Kopf.',
      abschnitte: [
        {
          titel: 'Was ist Taekwondo?',
          absaetze: [
            'Taekwondo ist eine koreanische Kampfsportart. Der Name setzt sich aus Tae (Fuß), Kwon (Faust) und Do (der Weg) zusammen.',
            'Und Taekwondo ist sogar eine olympische Disziplin.',
          ],
        },
        {
          titel: 'Was bieten wir an?',
          absaetze: [
            'Wir bringen euch das traditionelle Taekwondo bei. Ihr erlernt Grundtechniken und übt an den Pratzen.',
            'Dazu kommen Selbstverteidigung – die Abwehr von Angriffen mit Stock oder Messer, gegen einen oder mehrere Angreifer –, Formenlaufen, Wettkampf mit Schutzausrüstung und die Theorie.',
            'Und zur Prüfung gehört der spektakuläre Bruchtest.',
          ],
        },
      ],
      mitbringen: [
        'Spaß und Freude',
        'Lust auf eine tolle Kampfsportart',
        'Sportsachen – aber keine Schuhe',
      ],
    },
  },
  {
    slug: 'muay-thai',
    name: 'Muay Thai',
    kurz: 'Die Kunst der acht Gliedmaßen – Technik, Kondition und ein faires Miteinander.',
    icon: 'tabler:flame',
    farbe: 'rot',
    alter: 'ab 15 Jahren, ab 12 mit Zustimmung der Eltern',
    zeiten: ['Montag, 19:30 – 21:00 Uhr', 'Mittwoch, 20:00 – 21:00 Uhr'],
    zeitKurz: 'Montag und Mittwoch, abends',
    ort: 'Sporthalle',
    kontakte: [{ name: 'Marko Kobasic', telefon: '0176 47863543' }],
    textVorhanden: true,
    fotoVorhanden: false,
    detail: {
      intro:
        'Muay Thai ist eine traditionelle Kampfkunst aus Thailand. Sie wird auch die Kunst der acht ' +
        'Gliedmaßen genannt, weil Fäuste, Ellbogen, Knie und Schienbeine zum Einsatz kommen.',
      abschnitte: [
        {
          titel: 'Worum geht es?',
          absaetze: [
            'Neben Technik und Kondition spielen Respekt, Disziplin und Selbstbeherrschung eine wichtige Rolle. Ein faires Miteinander steht bei uns an erster Stelle.',
            'Vorkenntnisse sind nicht erforderlich.',
          ],
        },
        {
          titel: 'Was bieten wir an?',
          absaetze: [
            'Wir vermitteln die Grundlagen und Techniken des Muay Thai: Punches, Kicks, Knie- und Ellbogentechniken, Clinching und Sweeps.',
            'Trainiert wird unter anderem an Pratzen und Boxsäcken sowie mit Partnerübungen und Technikdrills. Dazu gehören Kondition, Kraft, Koordination und kontrolliertes Sparring.',
          ],
        },
        {
          titel: 'Ausrüstung',
          absaetze: [
            'Für regelmäßiges Training werden Handbandagen, Boxhandschuhe ab 10 oz und Schienbeinschoner benötigt.',
            'Für den Einstieg müsst ihr nichts anschaffen: Einige Handschuhe und Schienbeinschoner können ausgeliehen werden.',
          ],
        },
      ],
      mitbringen: [
        'Sportsachen',
        'Eine eigene Wasserflasche',
        'Spaß am Training',
        'Trainiert wird barfuß',
      ],
      hinweis: {
        titel: 'Ab 12 Jahren nur mit Zustimmung',
        text:
          'Regulär kann jeder ab 15 Jahren mitmachen. Jugendliche ab 12 Jahren können nach vorheriger ' +
          'Absprache und mit schriftlicher Zustimmung der Eltern teilnehmen – oder in Begleitung einer ' +
          'erwachsenen Person.',
      },
    },
  },
  {
    slug: 'dart',
    name: 'Dart',
    kurz: 'Das Team „Bulls Ei“ – seit 2008 am Board, seit 2022 beim SC Norddörfer und mittendrin im Sylter Ligabetrieb.',
    icon: 'tabler:target-arrow',
    farbe: 'blau',
    alter: 'von 16 bis 99 Jahren',
    zeiten: ['Montag, ab 19:00 Uhr', 'Donnerstag, 19:00 – 20:00 Uhr'],
    zeitKurz: 'Montag und Donnerstag, ab 19:00 Uhr',
    ort: 'Vereinsheim',
    kontakte: [{ name: 'Alexander „Ebi“ Ebert', telefon: '0151 50412257' }],
    textVorhanden: true,
    fotoVorhanden: true,
    detail: {
      intro:
        'Beim SC Norddörfer fliegen die Pfeile: Das Team Bulls Ei trainiert im Vereinsheim am Sportplatz ' +
        'und tritt im Sylter Ligabetrieb an – mit Ehrgeiz am Board und viel Gemeinschaft drumherum.',
      abschnitte: [
        {
          titel: 'Seit 2008 am Board',
          absaetze: [
            'Die Geschichte von Bulls Ei reicht bis ins Jahr 2008 zurück. Im März 2022 hat das Team beim SC Norddörfer ein Zuhause gefunden und spielt seitdem für den Verein in der Liga.',
            'Heimspielstätte ist das Vereinsheim am Sportplatz in Wenningstedt. Dort stehen vier Dartboards – genug Platz für Training und Ligaabende.',
          ],
        },
        {
          titel: 'Ligaspiele auf der Insel',
          absaetze: [
            'Auf Sylt wird in zwei Inselligen gespielt, einer A- und einer B-Liga. Die Saison läuft von Herbst bis ins Frühjahr.',
            'Technisch ließen sich Partien auch online zwischen zwei Orten austragen. Die Sylter Mannschaften treffen sich trotzdem lieber persönlich – denn neben dem Sport zählt hier auch das Miteinander.',
          ],
        },
        {
          titel: 'So wird gespielt',
          absaetze: [
            'Jedes Leg beginnt bei 501 Punkten. Die Treffer werden abgezogen, bis genau null erreicht ist – und der letzte Pfeil muss ein Doppelfeld treffen („Double Out“). Eine Partie gewinnt, wer zuerst zwei Legs für sich entscheidet.',
          ],
        },
        {
          titel: 'Dart hat Tradition im Verein',
          absaetze: [
            'Dart gehört beim SC Norddörfer schon lange dazu. Zu den Höhepunkten zählt eine Deutsche Meisterschaft: Gemeinsam mit dem Schleswig-Holsteinischen Dartverband wurde sie in der Norddörfer Halle ausgetragen, mit über 200 Darterinnen und Dartern aus ganz Deutschland.',
            'Auch das Vereinsheim trägt die Handschrift der Darter: In Eigenarbeit haben sie die Fläche fast verdoppelt. So entstanden optimale Bedingungen für Training und Heimspiele – und genug Platz, um im Vereinsheim auch größere Feiern auszurichten.',
          ],
        },
      ],
    },
  },
];

/** Fußballmannschaften – die größte Sparte des Vereins. */
/**
 * Saison-Kuerzel fuer die Links zu fussball.de.
 * Die Team-IDs dort sind saisonbezogen – zum Saisonwechsel muessen Kuerzel
 * und gegebenenfalls die IDs auf der Vereinsseite neu abgeholt werden:
 * https://www.fussball.de/verein/sc-norddoerfer-schleswig-holstein/-/id/00ES8GN8JC000094VV0AG08LVUPGND5I
 */
export const fussballDeSaison = '2627';

export const fussballDeVerein =
  'https://www.fussball.de/verein/sc-norddoerfer-schleswig-holstein/-/id/00ES8GN8JC000094VV0AG08LVUPGND5I';

/** Baut die Adresse der Mannschaftsseite auf fussball.de. */
export function fussballDeLink(pfad: string, teamId: string) {
  return `https://www.fussball.de/mannschaft/${pfad}/-/saison/${fussballDeSaison}/team-id/${teamId}`;
}

export type Mannschaft = {
  name: string;
  /** Jahrgaenge oder Altersspanne */
  jahrgang: string;
  zeiten: string[];
  /** Kurzform fuer die Uebersicht auf der Startseite */
  zeitenKurz: string[];
  trainer: Kontakt[];
  /** Liga laut fussball.de */
  liga?: string;
  /** Pfad- und ID-Teil der fussball.de-Adresse */
  fussballDe?: { pfad: string; teamId: string };
  /** Spielt keinen Ligabetrieb, steht daher nicht auf fussball.de */
  ohneLiga?: boolean;
};

/** Absteigend sortiert: von den Herren bis zur G-Jugend. */
export const mannschaften: Mannschaft[] = [
  {
    name: 'Herren',
    jahrgang: '2007 und älter',
    zeiten: ['Dienstag, 20:00 – 21:00 Uhr'],
    zeitenKurz: ['Di 20:00 – 21:00'],
    trainer: [
      { name: 'Nick Erdmann', telefon: '0176 43450045' },
      { name: 'Thies Brodersen', telefon: '01577 2541957' },
    ],
    liga: 'Kreisklasse A 1',
    fussballDe: {
      pfad: 'sc-norddoerfer-sc-norddoerfer-schleswig-holstein',
      teamId: '01OPEIVMMO000000VV0AG80NVU94JLT0',
    },
  },
  {
    name: 'Damen',
    jahrgang: '2009 und älter',
    zeiten: ['Mittwoch, 19:00 – 20:00 Uhr, in der Halle'],
    zeitenKurz: ['Mi 19:00 – 20:00, Halle'],
    trainer: [{ name: 'Marko Schneider-Pauly', telefon: '0172 4195559' }],
    liga: 'Frauen KKA N-W (NF), 7er',
    fussballDe: {
      pfad: 'sc-norddoerfer-7er-sc-norddoerfer-schleswig-holstein',
      teamId: '031A82P5FC000000VS5489BSVU0ORN69',
    },
  },
  {
    name: 'A-Jugend',
    jahrgang: '2008 bis 2011, A- und B-Jahrgänge zusammengelegt',
    zeiten: ['Donnerstag, 20:00 – 21:00 Uhr'],
    zeitenKurz: ['Do 20:00 – 21:00'],
    trainer: [{ name: 'Maximilian Brachtendorf', telefon: '0151 20095586' }],
    liga: 'Kreisliga Vorrunde SL-FL, 9er',
    fussballDe: {
      pfad: 'sc-norddoerfer-9er-sc-norddoerfer-schleswig-holstein',
      teamId: '031ASDH9HK000000VS5489BSVU0ORN69',
    },
  },
  {
    name: 'C-Jugend',
    jahrgang: '2012 und 2013',
    zeiten: ['Mittwoch, 16:30 – 18:00 Uhr', 'Freitag, 16:30 – 18:00 Uhr'],
    zeitenKurz: ['Mi 16:30 – 18:00', 'Fr 16:30 – 18:00'],
    trainer: [{ name: 'Kevin Tillmann', telefon: '0176 66348264' }],
    liga: 'Kreisliga Vorrunde C-Junioren NF 1',
    fussballDe: {
      pfad: 'sc-norddoerfer-sc-norddoerfer-schleswig-holstein',
      teamId: '02PVSUB3O0000000VS5489B2VTB2M2VN',
    },
  },
  {
    name: 'D-Jugend',
    jahrgang: '2014 und 2015',
    zeiten: ['Mittwoch, 15:00 – 16:30 Uhr', 'Freitag, 15:00 – 16:30 Uhr'],
    zeitenKurz: ['Mi 15:00 – 16:30', 'Fr 15:00 – 16:30'],
    trainer: [{ name: 'Max Neumann', telefon: '0152 08772534' }],
    liga: 'KKA D-Junioren Quali Staffel 2',
    fussballDe: {
      pfad: 'sc-norddoerfer-sc-norddoerfer-schleswig-holstein',
      teamId: '02IKA5K69K000000VS5489B2VVQ9C6A6',
    },
  },
  {
    name: 'E-Jugend',
    jahrgang: '2016 und 2017',
    zeiten: ['Dienstag, 17:30 – 18:45 Uhr', 'Donnerstag, 17:30 – 18:45 Uhr'],
    zeitenKurz: ['Di 17:30 – 18:45', 'Do 17:30 – 18:45'],
    trainer: [{ name: 'Chris Jaeckstat', telefon: '0176 82492829' }],
    liga: 'E-Junioren Quali Staffel 1',
    fussballDe: {
      pfad: 'sc-norddoerfer-sc-norddoerfer-schleswig-holstein',
      teamId: '02B6OAD260000000VS5489B1VULH2T74',
    },
  },
  {
    name: 'F-Jugend',
    jahrgang: '2018 und 2019',
    zeiten: ['Dienstag, 15:00 – 16:30 Uhr', 'Donnerstag, 15:00 – 16:30 Uhr'],
    zeitenKurz: ['Di 15:00 – 16:30', 'Do 15:00 – 16:30'],
    trainer: [{ name: 'Chris Rühling', telefon: '0157 88871664' }],
    ohneLiga: true,
  },
  {
    name: 'G-Jugend',
    jahrgang: '2020 und jünger',
    zeiten: ['Donnerstag, 16:30 – 17:30 Uhr'],
    zeitenKurz: ['Do 16:30 – 17:30'],
    trainer: [{ name: 'Robert Schröder', telefon: '0152 54874305' }],
    ohneLiga: true,
  },
];

/** Wochenplan – gespiegelt aus SCN_Uebungsangebote_Hallenbelegung.csv */
export const wochenplan = [
  { tag: 'Montag', eintraege: [
    { zeit: '15:00 – 18:00', was: 'Tanzen · drei Gruppen', ort: 'Halle', slug: 'tanzen', einheiten: 3 },
    { zeit: '18:30 – 19:30', was: 'Fit for Fun', ort: 'Halle', slug: 'fit-for-fun' },
    { zeit: 'ab 19:00', was: 'Dart', ort: 'Vereinsheim', slug: 'dart' },
    { zeit: '19:30 – 21:00', was: 'Muay Thai', ort: 'Halle', slug: 'muay-thai' },
  ]},
  { tag: 'Dienstag', eintraege: [
    { zeit: '15:00 – 16:30', was: 'Fußball · F-Jugend', ort: 'Platz', slug: 'fussball' },
    { zeit: '16:30 – 17:30', was: 'Eltern-Kind-Turnen', ort: 'Halle', slug: 'eltern-kind-turnen' },
    { zeit: '17:30 – 18:45', was: 'Fußball · E-Jugend', ort: 'Platz', slug: 'fussball' },
    { zeit: '18:45 – 20:00', was: 'Taekwondo', ort: 'Halle', slug: 'taekwondo' },
    { zeit: '20:00 – 21:00', was: 'Fußball · Herren', ort: 'Platz', slug: 'fussball' },
  ]},
  { tag: 'Mittwoch', eintraege: [
    { zeit: '15:00 – 16:30', was: 'Fußball · D-Jugend', ort: 'Platz', slug: 'fussball' },
    { zeit: '16:30 – 18:00', was: 'Fußball · C-Jugend', ort: 'Platz', slug: 'fussball' },
    { zeit: '18:00 – 19:00', was: 'Zumba & Mobility', ort: 'Halle', slug: 'zumba-mobility' },
    { zeit: '19:00 – 20:00', was: 'Fußball · Damen', ort: 'Halle', slug: 'fussball' },
    { zeit: '20:00 – 21:00', was: 'Muay Thai', ort: 'Halle', slug: 'muay-thai' },
  ]},
  { tag: 'Donnerstag', eintraege: [
    { zeit: '15:00 – 16:30', was: 'Fußball · F-Jugend', ort: 'Platz', slug: 'fussball' },
    { zeit: '16:30 – 17:30', was: 'Fußball · G-Jugend', ort: 'Platz', slug: 'fussball' },
    { zeit: '17:30 – 18:45', was: 'Fußball · E-Jugend', ort: 'Platz', slug: 'fussball' },
    { zeit: '18:45 – 20:00', was: 'Taekwondo', ort: 'Halle', slug: 'taekwondo' },
    { zeit: '19:00 – 20:00', was: 'Dart', ort: 'Vereinsheim', slug: 'dart' },
    { zeit: '20:00 – 21:00', was: 'Fußball · A-Jugend', ort: 'Platz', slug: 'fussball' },
  ]},
  { tag: 'Freitag', eintraege: [
    { zeit: '15:00 – 16:30', was: 'Fußball · D-Jugend', ort: 'Platz', slug: 'fussball' },
    { zeit: '16:30 – 18:00', was: 'Fußball · C-Jugend', ort: 'Platz', slug: 'fussball' },
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

/** Vorstand des Vereins, Stand September 2026. */
export const vorstand = [
  { funktion: 'Gleichberechtigte Vorsitzende, Gemeinde Kampen', name: 'Steffi Böhm' },
  { funktion: 'Gleichberechtigter Vorsitzender, Gemeinde Wenningstedt-Braderup', name: 'Kai Müller' },
  { funktion: 'Geschäftsführender Vorsitzender', name: 'Tom Langmaack' },
  { funktion: 'Erste Schatzmeisterin', name: 'Nicole Lüdrichsen' },
  { funktion: 'Zweiter Schatzmeister', name: 'Torge Britchin' },
  { funktion: 'Jugendwart', name: 'Moritz Piossek' },
  { funktion: 'Schriftführerin', name: 'Rebecca Reckert-Diedenhofen' },
  { funktion: 'Pressewart', name: 'Tom Langmaack' },
  { funktion: '1. Beisitzer', name: 'Marko Schneider-Pauly' },
  { funktion: '2. Beisitzer', name: 'Nick Erdmann' },
];

/** Stand der Beitragsordnung – wird ueberall neben den Beitraegen ausgewiesen. */
export const beitraegeStand = 'Mai 2026';

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
