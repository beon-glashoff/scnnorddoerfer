/**
 * Wochenplan als PDF zum Ausdrucken, A4 quer.
 *
 * Wird beim Build aus denselben Daten erzeugt wie der Wochenplan auf der Seite
 * (src/data/verein.ts) – wer dort etwas aendert, bekommt beim naechsten Build
 * automatisch ein passendes PDF. Nichts von Hand nachziehen.
 */
import type { APIRoute } from 'astro';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import PDFDocument from 'pdfkit';
import sharp from 'sharp';
import { verein, wochenplan, standDerDaten } from '../../data/verein';

const farbe = {
  rot: '#e30613',
  blau: '#005ba7',
  gold: '#fcc133',
  goldDunkel: '#e0a51c',
  ink: '#0b1720',
  gedaempft: '#55636e',
  linie: '#dcdfe1',
};

/** Farbpunkt je Ort – wie im Wochenplan auf der Seite */
const ortFarbe: Record<string, string> = {
  Halle: farbe.blau,
  Platz: farbe.rot,
  Vereinsheim: farbe.goldDunkel,
};

export const GET: APIRoute = async () => {
  const wurzel = process.cwd();
  const anton = readFileSync(join(wurzel, 'node_modules/@fontsource/anton/files/anton-latin-400-normal.woff'));
  // pdfkit kann kein SVG – das Wappen wird fuer den Druck als PNG gerastert.
  const { data: wappen, info: wappenInfo } = await sharp(join(wurzel, 'public/wappen-scn.svg'), { density: 300 })
    .resize({ height: 320 })
    .png()
    .toBuffer({ resolveWithObject: true });

  const doc = new PDFDocument({
    size: 'A4',
    layout: 'landscape',
    margin: 0,
    info: {
      Title: `Trainingszeiten ${verein.kurzname}`,
      Author: verein.kurzname,
      Subject: `Wochenplan, Stand ${standDerDaten}`,
    },
  });
  doc.registerFont('Anton', anton);

  const teile: Buffer[] = [];
  doc.on('data', (t: Buffer) => teile.push(t));
  const fertig = new Promise<Buffer>((ok) => doc.on('end', () => ok(Buffer.concat(teile))));

  const breite = doc.page.width;
  const hoehe = doc.page.height;
  const rand = 36;

  // Wappenband oben ueber die volle Breite
  [farbe.gold, farbe.rot, farbe.blau].forEach((f, i) => {
    doc.rect((breite / 3) * i, 0, breite / 3, 5).fill(f);
  });

  // Kopf: Wappen, Ueberschrift, Stand
  const wappenHoehe = 58;
  doc.image(wappen, rand, 28, { height: wappenHoehe });
  const kopfX = rand + wappenHoehe * (wappenInfo.width / wappenInfo.height) + 16;
  doc.font('Helvetica-Bold').fontSize(8).fillColor(farbe.rot)
    .text(`${verein.kurzname.toUpperCase()} · DIE WOCHE BEIM SCN`, kopfX, 34, { characterSpacing: 1.2 });
  doc.font('Anton').fontSize(32).fillColor(farbe.ink)
    .text('TRAININGSZEITEN', kopfX, 44, { lineBreak: false });

  doc.font('Helvetica').fontSize(8.5).fillColor(farbe.gedaempft);
  const rechts = { width: 260, align: 'right' as const };
  doc.text(`Stand: ${standDerDaten}`, breite - rand - 260, 40, rechts);
  doc.text('Immer aktuell: sc-norddoerfer.de/trainingszeiten', breite - rand - 260, 53, rechts);

  // Wochenraster: fuenf Spalten, alle Karten gleich hoch
  const oben = 108;
  const abstand = 10;
  const spalte = (breite - 2 * rand - 4 * abstand) / 5;
  const innen = 9;
  const textBreite = spalte - 2 * innen;
  const kopfHoehe = 26;

  const eintragHoehe = (was: string) => {
    doc.font('Helvetica-Bold').fontSize(10);
    return 11 + 3 + doc.heightOfString(was, { width: textBreite }) + 5 + 8;
  };
  const tagHoehe = (eintraege: { was: string }[]) =>
    eintraege.reduce((s, e) => s + eintragHoehe(e.was) + 2 * 7, 0) + 6;
  const kartenHoehe = kopfHoehe + Math.max(...wochenplan.map((t) => tagHoehe(t.eintraege)));

  wochenplan.forEach((tag, i) => {
    const x = rand + i * (spalte + abstand);

    doc.save();
    doc.roundedRect(x, oben, spalte, kartenHoehe, 7).clip();
    doc.rect(x, oben, spalte, kopfHoehe).fill(farbe.gold);
    doc.restore();
    doc.roundedRect(x, oben, spalte, kartenHoehe, 7).lineWidth(0.8).stroke(farbe.linie);

    doc.font('Anton').fontSize(12).fillColor(farbe.ink)
      .text(tag.tag.toUpperCase(), x + innen, oben + 5, { characterSpacing: 0.5, lineBreak: false });

    let y = oben + kopfHoehe + 3;
    tag.eintraege.forEach((e, j) => {
      if (j > 0) {
        doc.moveTo(x + innen, y).lineTo(x + spalte - innen, y).lineWidth(0.6).stroke(farbe.linie);
      }
      y += 7;
      doc.font('Helvetica-Bold').fontSize(7.5).fillColor(farbe.gedaempft)
        .text(e.zeit, x + innen, y, { characterSpacing: 0.3, lineBreak: false });
      y += 11 + 3;
      doc.font('Helvetica-Bold').fontSize(10).fillColor(farbe.ink);
      doc.text(e.was, x + innen, y, { width: textBreite });
      y += doc.heightOfString(e.was, { width: textBreite }) + 5;
      doc.circle(x + innen + 2.6, y + 2.8, 2.6).fill(ortFarbe[e.ort] ?? farbe.blau);
      doc.font('Helvetica-Bold').fontSize(6.5).fillColor(farbe.gedaempft)
        .text(e.ort.toUpperCase(), x + innen + 9, y, { characterSpacing: 0.7, lineBreak: false });
      y += 8 + 7;
    });
  });

  // Legende und Hinweise unter dem Raster
  let y = oben + kartenHoehe + 16;
  let x = rand;
  for (const [ort, f] of Object.entries(ortFarbe)) {
    doc.circle(x + 3, y + 3.2, 3).fill(f);
    doc.font('Helvetica-Bold').fontSize(8).fillColor(farbe.ink).text(ort, x + 10, y, { lineBreak: false });
    x += 10 + doc.widthOfString(ort) + 18;
  }
  doc.font('Helvetica').fontSize(8).fillColor(farbe.gedaempft)
    .text('Fußball bei schlechtem Wetter in der Halle. Alles liegt an einer Adresse.', x + 6, y, { lineBreak: false });

  // Fusszeile
  const fussY = hoehe - rand - 22;
  doc.moveTo(rand, fussY - 10).lineTo(breite - rand, fussY - 10).lineWidth(0.6).stroke(farbe.linie);
  doc.font('Helvetica-Bold').fontSize(9).fillColor(farbe.ink)
    .text('Einfach vorbeikommen – zum Schnuppern brauchst du keine Anmeldung.', rand, fussY, { lineBreak: false });
  doc.font('Helvetica').fontSize(8).fillColor(farbe.gedaempft)
    .text(
      `${verein.vollname} · ${verein.strasse}, ${verein.plz} ${verein.ort} · ${verein.telefon} · ${verein.email}`,
      rand, fussY + 13, { lineBreak: false },
    );
  doc.font('Anton').fontSize(10).fillColor(farbe.rot)
    .text(verein.claim.toUpperCase(), breite - rand - 200, fussY + 4, { width: 200, align: 'right', characterSpacing: 0.4 });

  doc.end();
  const pdf = await fertig;

  return new Response(new Uint8Array(pdf), {
    headers: { 'Content-Type': 'application/pdf' },
  });
};
