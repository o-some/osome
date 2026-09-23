# O-SOME TASTE — Markenwebsite

Statische, deutschsprachige O-SOME-TASTE-Website ohne Warenkorb oder Checkout. Alle Kauf-Links nutzen zentral `SHOP_URL` in [`src/data.mjs`](src/data.mjs) und führen im selben Tab zu `https://www.chelonaki.eu/shop`.

## Start und Build

Node.js 20 oder neuer:

```sh
npm ci
npm run build
npm run preview
```

Danach lokal `http://127.0.0.1:4321` öffnen. `dist/` ist der statische Build. `npm test` prüft die generierten Routen, Links und Assets. `npm run test:browser` benötigt installiertes Chrome und prüft die Seite im Browser. Der lokale Vorschauserver liefert unbekannte Routen als echte HTTP 404.

Für die GitHub-Pages-Projekt-URL `https://o-some.github.io/osome/`:

```sh
SITE_BASE_PATH=/osome/ PUBLIC_ORIGIN=https://o-some.github.io npm run build
SITE_BASE_PATH=/osome/ PUBLIC_ORIGIN=https://o-some.github.io npm test
SITE_BASE_PATH=/osome/ npm run preview
PREVIEW_URL=http://127.0.0.1:4321/osome npm run test:browser
```

Der Workflow `.github/workflows/pages.yml` baut und testet denselben Pfad. Er wird manuell ausgelöst, sobald alle lokalen QA- und Inhaltsfreigaben erfüllt sind. `dist/`, lokale QA-Belege und unveröffentlichte Originaldateien werden nicht committed. Die bestehende Domain `www.o-some.de` bleibt unverändert.

Der Vorschauserver lädt den Build einmal beim Start in den Speicher. Nach jedem neuen Build den Server neu starten. Für neue Screenshots: `QA_SCREENSHOTS=1 npm run test:browser`.

## Pflege

- Produktnamen, Beschreibungen, Kategoriepfade, Kontakt und Shopziel: `src/data.mjs`.
- Seitenstruktur und Texte: `src/build.mjs`.
- Gestaltung und Motion: `src/styles.css`, `src/motion.js`.
- Originale: `input/originals/`; Webderivate: `public/images/`; Herkunft und Rechte: `docs/assets.json`.
- Alt-URLs und Entscheidungen: `docs/route-migration.csv`.

Die aktuelle Vorschau ist absichtlich `noindex`. Quellen, Konflikte und Freigaben stehen in `docs/sources.md` und `docs/launch-checklist.md`. Ein künftiger Domainwechsel braucht eine gesondert geprüfte Hosting-, Redirect- und Canonical-Konfiguration. GitHub Pages mit öffentlichem Repository wäre auch mit `noindex` öffentlich erreichbar.
