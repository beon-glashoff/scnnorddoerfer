# SC Norddörfer – Website

Astro-Projekt für den neuen Auftritt des Sport-Club Norddörfer Sylt e.V.

## Schnellstart

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # erzeugt ./dist
npm run preview    # gebauten Stand lokal prüfen
```

## Deployment

Die Seite wird komplett statisch gebaut. Auf Cloudflare läuft sie als reines
Static-Asset-Deployment – es gibt kein Worker-Script, nur den Ordner `dist`.

```bash
npx wrangler deploy
```

Ein separater `npm run build` davor ist nicht nötig: `wrangler.jsonc` enthält einen
`build.command`, den Wrangler vor jedem Deploy ausführt. Deshalb genügt in den
Cloudflare Workers Builds als Deploy-Befehl ebenfalls `npx wrangler deploy` –
ein eigener Build-Befehl im Dashboard muss nicht gesetzt sein.

Beim ersten lokalen Deploy fragt Wrangler nach dem Cloudflare-Login.

### Späterer Umzug zu Strato

Weil der Build rein statisch ist (`output: 'static'`, `build.format: 'directory'`),
reicht für den Umzug ein Upload des `dist`-Ordners auf den Webspace. Es sind keine
Cloudflare-spezifischen Funktionen im Code. Zu beachten wäre dann nur:

- `wrangler.jsonc` wird nicht mehr gebraucht
- ein Redirect von `www` auf die Hauptdomain im Strato-Panel setzen
- die `site`-Angabe in `astro.config.mjs` muss auf die finale Domain zeigen

## Aufbau

```
src/
  assets/fotos/     Bildmaterial, beim Build automatisch in WebP-Größen gerendert
  components/       Bausteine der Startseite
  data/verein.ts    Zentrale Inhalte: Sparten, Wochenplan, Mannschaften, Beiträge
  icons/            Ablage für eigene SVGs (Tabler-Icons kommen aus dem Paket)
  layouts/          Grundgerüst mit Kopf und Fuß
  pages/            Routen
  styles/global.css Design-System
```

### Design-System

Die Farben stammen aus dem Vereinswappen:

| Token | Wert | Verwendung |
|---|---|---|
| `--scn-red` | `#e30613` | Hauptakzent, Buttons |
| `--scn-blue` | `#005ba7` | Zweitfarbe, Flächen |
| `--scn-gold` | `#fcc133` | Highlights auf dunklem Grund |
| `--ink` | `#0b1720` | dunkle Abschnitte |
| `--sand` | `#f6f2ec` | helle Abschnitte |

Schriften: **Anton** für Headlines, **Inter** für Fließtext. Beide werden über
`@fontsource` mitgeliefert und lokal ausgeliefert – es gehen keine Anfragen an Google,
das erspart uns einen Punkt in der Datenschutzerklärung.

Icons: [Tabler Icons](https://tabler.io/icons) über `astro-icon`. Verwendung:
`<Icon name="tabler:ball-football" />`.

Das Wappen-Motiv aus Gold, Rot und Blau taucht als `.band` wiederholt im Layout auf.

### Inhalte pflegen

Sparten, Trainingszeiten, Mannschaften und Beiträge stehen alle in
`src/data/verein.ts`. Wer dort etwas ändert, ändert es überall – auf den Karten
der Startseite, im Wochenplan und (sobald gebaut) auf den Spartenseiten.

Quelle der Daten: `../01_Assets/07_MDs/03_Abgleich_Lieferung_Tom.md` und
`../01_Assets/04_Texte/SCN_Uebungsangebote_Hallenbelegung.csv`.

## Schreibweisen

- Im Fließtext immer **SC Norddörfer**
- Voller Vereinsname **Sport-Club Norddörfer Sylt e.V.** nur im Impressum und in den Kontaktdaten
- Claim: **Eine Insel, ein Verein!**

## fussball.de

Die Fußballseite verlinkt je Mannschaft auf Tabelle und Spielplan bei fussball.de.
Die Adressen werden in `src/data/verein.ts` aus drei Teilen zusammengesetzt:
`fussballDeSaison`, dem Pfad und der Team-ID der jeweiligen Mannschaft.

**Zum Saisonwechsel** muss `fussballDeSaison` hochgezählt werden. Die Team-IDs der
Jugendmannschaften ändern sich dabei häufig mit – sie stehen auf der
[Vereinsseite bei fussball.de](https://www.fussball.de/verein/sc-norddoerfer-schleswig-holstein/-/id/00ES8GN8JC000094VV0AG08LVUPGND5I).

G- und F-Jugend haben keinen Eintrag: Die G-Jugend spielt keinen Ligabetrieb,
die F-Jugend pausiert.

### Heimspiele

`src/data/spiele.ts` enthält die Heimspiele als **einmaligen Abzug** von fussball.de,
nicht als Live-Feed. Daraus speisen sich zwei Dinge:

- der Abschnitt „Nächste Heimspiele" unten auf der Fußballseite
- den goldenen Kasten in der Fußballsektion auf der Startseite

Vergangene Partien verschwinden von selbst – beim Bauen der Seite und zusätzlich
im Browser, damit die Liste auch zwischen zwei Builds stimmt. Ist die Liste
abgelaufen, blendet sich der Kasten aus und der Abschnitt verweist auf fussball.de.

**Die Liste muss von Hand nachgezogen werden.** Wie das geht, steht im Kopf von
`spiele.ts`. Spätestens wenn die letzte Partie gespielt ist, sollte jemand ran.

### Widget für die nächsten Spiele

fussball.de bietet offizielle Widgets an, unter anderem für Tabelle, Kader sowie
letzte und nächste Spiele. Der Einbettungscode wird auf fussball.de erzeugt
(Benutzermenü → „Inhalte verwalten" → „Deine Widgets") und dabei **fest auf eine
Domain registriert**. Das Widget lässt sich also erst erzeugen, wenn
sc-norddoerfer.de steht, und braucht ein Konto mit Zugriff auf den Verein.

Der Platz dafür ist auf der Fußballseite bereits angelegt.

## Seitenstruktur

```
/                        Startseite
/sportarten/             Übersicht aller acht Sparten
/sportarten/<slug>/      Spartenseite (ein Typ für alle)
/trainingszeiten/        Wochenplan
/mitglied-werden/        Ablauf, Beiträge, Anmeldeformular
/verein/                 Vereinstext, Vorstand, Sportstätten
/verein/anreise/         Zug, Bus, Auto, Parken
/kontakt/                Anschrift und alle Ansprechpartner
/mitmachen/              Ehrenamt, gesuchte F-Jugend-Trainer:in
/faq/                    Häufige Fragen
/bandenwerbung/          Werbetafeln am Sportplatz
/impressum/              Pflichtangaben
/datenschutz/            Datenschutzerklärung
```

Insgesamt 20 Seiten. `npm run pruefen` geht nach dem Build alle internen
Verweise durch und meldet, wenn einer ins Leere zeigt.

### Der Spartenseiten-Typ

Alle Sparten laufen über `src/pages/sportarten/[slug].astro`. Der Aufbau ist
überall gleich: Kopf, Eckdatenleiste, Inhalt, Galerie, Schnupper-Abschnitt.

Zwei Abweichungen gibt es:

- **Fußball** zeigt statt des Fließtexts die acht Mannschaften, jede mit eigenem
  Foto, Trainingszeiten, Trainerkontakt und dem Link zu fussball.de. Darüber
  liegen Sprungmarken, damit die Seite trotz ihrer Länge bedienbar bleibt.
- Sparten ohne eigene Fotos zeigen im Kopf und in der Galerie ein gestreiftes
  Farbfeld in ihrer Wappenfarbe statt eines Fremdbildes.

### Galerie

`src/components/Galerie.astro` ist eine waagerechte Spur mit Scroll-Einrasten –
ohne JavaScript, auf dem Telefon wischbar. Die Bilder je Sparte stehen in
`[slug].astro` in der Zuordnung `galerien`. Bisher ist nur Fußball befüllt;
für die übrigen Sparten erscheint ein Platzhalter.

## Offene Punkte

- **Die Datenschutzerklärung ist ein Entwurf.** Sie beschreibt den technischen Stand
  der Seite korrekt – im Browser nachgeprüft: keine Cookies, keine Analysewerkzeuge,
  Schriften lokal, ein einziger externer Dienst (DeinSylt). Vor dem Livegang gehört
  sie trotzdem einmal juristisch geprüft. Beim Wechsel des Hostings von Cloudflare
  zu Strato muss der Abschnitt „Hosting" angepasst werden.
- Der **Text für die Ehrenamt-Seite** stammt von uns. Tom hat die Rubrik abgesegnet,
  aber keinen eigenen Text geliefert – die vier Felder sind plausibel, aber nicht
  vom Verein bestätigt.
- Im **FAQ** fehlen Kündigungsfrist der Mitgliedschaft und Fälligkeit des ersten
  Beitrags. Beides steht in der Satzung, die uns nur als unlesbarer Scan vorliegt.
- Für sechs der acht Sparten fehlt eigenes Bildmaterial. Solange greifen Kopf,
  Karte und Galerie auf ein gestreiftes Farbfeld in der Wappenfarbe zurück.
- Die **Mannschaftsfotos** auf der Fußballseite sind Spielszenen aus dem jeweiligen
  Spiel, keine gestellten Mannschaftsfotos.
- Für **Vorstand und Ansprechpartner** fehlen die Porträtfotos.
- Das **fussball.de-Widget** für die nächsten Spiele braucht die finale Domain.
