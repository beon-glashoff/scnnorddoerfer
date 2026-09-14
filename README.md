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

### Widget für die nächsten Spiele

fussball.de bietet offizielle Widgets an, unter anderem für Tabelle, Kader sowie
letzte und nächste Spiele. Der Einbettungscode wird auf fussball.de erzeugt
(Benutzermenü → „Inhalte verwalten" → „Deine Widgets") und dabei **fest auf eine
Domain registriert**. Das Widget lässt sich also erst erzeugen, wenn
sc-norddoerfer.de steht, und braucht ein Konto mit Zugriff auf den Verein.

Der Platz dafür ist auf der Fußballseite bereits angelegt.

## Offene Punkte

- Der DeinSylt-Newsfeed ist auf der Startseite nur als Platzhalter angelegt. Der
  Embed-Code liegt in `../01_Assets/08_Sonstiges/DeinSylt_News_Widget_Embed.html`
  und wird eingebunden, sobald die Datenschutzerklärung steht.
- Für sechs der acht Sparten fehlt noch eigenes Bildmaterial. Solange greifen die
  Karten auf ein gestreiftes Farbfeld in der jeweiligen Wappenfarbe zurück.
- Unterseiten (Sparten, Verein, Trainingszeiten, Mitglied werden, Kontakt, FAQ)
  sind noch nicht gebaut – die Navigation verweist bereits darauf.
