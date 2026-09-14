// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://sc-norddoerfer.de',
  output: 'static',
  // 'directory' erzeugt /verein/index.html – funktioniert auf Cloudflare genauso
  // wie spaeter auf einem klassischen Webspace bei Strato.
  build: { format: 'directory' },
  integrations: [icon()],
  image: {
    // Alle Bilder werden beim Build vorgerendert, kein Image-Service zur Laufzeit noetig.
    responsiveStyles: true,
    layout: 'constrained',
  },
});
