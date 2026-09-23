# O-SOME TASTE — geprüfter Implementierungsplan

Stand: 23.09.2026, Phase A abgeschlossen. Verbindliche Grundlage: `O_SOME_WEBSITE_RELAUNCH_CODEX_MASTER_v1.0_2026-09-22.md`, Dropbox-ID `id:tBVq8LNbZ_8AAAAAAAUh9g`, Revision `0165c195a5ca0b9000000034139cb83`.

## Projektidentität und Ausgangslage

- Arbeitsroot: `/Users/eleftheriossamouladas/Library/CloudStorage/Dropbox/[O-SOME]/[Website]`. Vor dieser Planung leer, keine `AGENTS.md`, kein Git, kein Build, keine Nutzerdateien. Codex-Projekt `[O-SOME]` zeigt genau auf diesen Root.
- Die aktuelle Domain `www.o-some.de` ist am 22.09.2026 noch eine Shopify-Seite. Der lokale Git-Checkout `osometaste-dawn-chelonaki` ist ein **gemeinsamer Chelonaki-Shopify-Theme-Generator** (`package.json`: `chelonaki-modular-shopify-theme`), Remote `github.com/o-some/osometaste-dawn-chelonaki`, HEAD `d2bd69d`. Er liegt außerhalb des Arbeitsroots, enthält Nutzeränderungen und wird ausschließlich gelesen. Er ist nicht das neue Markenwebsite-Projekt.
- Ein Sites-Export oder GitHub-Repository für die neue Markenwebsite ist nicht nachgewiesen. Es gibt daher keinen Sites-Workflow. Weder GitHub-Push noch Veröffentlichung sind Teil dieses Auftrags.
- CAF-Bootstrap 1.8.0 und Factory 1.21.1 wurden gelesen. Modul 108 (1.3.0), 109 (1.1.0), 146 (1.4.0) und die Web-Integration 1.7.1 wurden geprüft. Kein bestehender CAF-Zustand im leeren Projekt; kein `caf`-Executable im PATH. Deshalb ein kompakter lokaler Codex-Build, keine vorgetäuschte CAF-Ausführung, keine globale Änderung.

## Referenz 124 — visuell geprüft

Exakte Datei: `/[Chelonaki - The Quiet Author]/[Buchdesign]/[124] [Kochbuch] – Amalfi Sunstone.png`, Dropbox-ID `id:tBVq8LNbZ_8AAAAAAAKBUg`, Revision `01659cc68de2bdb000000034139cb83`, 2.855.635 Bytes, lokal 1536 × 1024 px, SHA-256 `64d979b326037c128e0466fae408cfe55dd80aedacb5208fb48621ae39d45870`. Die PNG wurde tatsächlich visuell geöffnet. Sichtbar sind helle Papierflächen, feine Serifentitel, kleine Kapitelziffern, knappe Textspalten, asymmetrische Text/Bild-Teilung und großflächige mediterrane Food-Motive. Printseiten, Küstenbilder, fremde Texte, Buchfotos und Ornamentbänder werden nicht kopiert. Web-Übersetzung: O-SOME-Packshots auf ruhigen Farbflächen, kapitelartige Überschriften, großzügiger Bildrhythmus, einfache mobile Neuordnung. Risiko: die gedruckte feine Schrift wäre im Web zu klein; Dekoration und Papiertextur dürfen Kontrast und Ladezeit nicht schädigen.

## Quelleninventar und Konflikte

- `docs/route-migration.csv` enthält das endliche URL-Inventar aus der am 22.09.2026 geladenen Shopify-Sitemap (DE/EN, Produkte, Collections, Seiten, Blog) plus Navigation und Rechtliches. Status und endgültige Migrationsentscheidung bleiben je URL überprüfbar. Keine pauschalen Redirects.
- Aktuelle Kategorien: `/collections/pesto` zeigt sieben Einzel-Pestos; `/collections/dressing` und `/collections/aioli` zeigen jeweils null Produkte. Ihre redaktionellen Seiten können als Geschmackswelten entstehen, dürfen aber keine nicht inventarisierten Produkte als verfügbar darstellen.
- Ein verifizierter Rezeptindex ist `/pages/rezepte`; der Blogindex ist `/blogs/rezepte`. Die Sitemap enthält einen Moussaka-Artikel. Beide Pfade erhalten eine dokumentierte Behandlung.
- Kontaktseite: `68526 Viernheim`; Impressum/Datenschutz: `68519 Viernheim`. Die Cloudflare-kodierte Adresse wurde aus dem aktuellen Quell-HTML dekodiert: `info@o-some.de` (Kontakt und Impressum). Die aktuellen Rechtstexte beziehen sich auf den alten Shop und können nicht blind übernommen werden. Betreiberadresse und Rechtstexte brauchen vor Launch eine Bestätigung.
- Das **exakt vorgegebene** Ziel `https://www.chelonaki.eu/shop` antwortete am 22.09.2026 mit HTTP 200, zeigte nach Text-/Titelprüfung aber die Chelonaki-Studioseite. Shop-Linkvertrag wird umgesetzt, externe Shop-Funktion bleibt Launch-Blocker.
- O-SOME-interne E-Mail-Kampagne enthält Original-Logo, Chili-Pesto-Packshot und ein Personenfoto. Herkunft ist dokumentiert; ausdrückliche Freigabe zur neuen öffentlichen Website liegt noch nicht vor. Andere Kundenassets und Bilder der Buchreferenz sind ausgeschlossen. Bilder der aktuellen O-SOME-Website dürfen für eine lokale Vorschau mit `rights: pending` inventarisiert werden, aber keine Freigabe vortäuschen.
- Die Live-Seite weist Shop- und Beispielkomponenten auf. Gutscheine, Bundles, Konten, Warenkorb und Preise werden nicht in die neue Markenwebsite migriert. Ihre Alt-URLs bleiben im Migrationsinventar und erfordern eine spätere betriebliche Entscheidung.

## Technische Entscheidung und geplante Änderungen

Der leere, ausdrücklich als O-SOME-Website angelegte Root erhält eine **statische, projektlokale Website mit Node.js-Build ohne neue Laufzeitabhängigkeiten**. Der Master nennt Astro als Standardvorschlag, lässt eine andere dokumentierte Wahl zu. Hier reduziert ein kleiner Generator mit dem vorhandenen Node 22 Abhängigkeiten, Kosten und Shopify-Kopplung; semantisches HTML/CSS und wenig natives JavaScript erfüllen denselben statischen Vertrag. Erst nach diesem Plan wird lokal Git initialisiert und ein Ausgangscommit/Hash erstellt.

Geplante Dateien innerhalb dieses Roots: `package.json`, `README.md`, `src/data.*` (Produkte, Navigation, Kontakt, Quellen), `src/build.*` (statische Routen/Templates), `src/styles.css`, `src/motion.js`, `assets/` (nur verifizierte O-SOME-Kopien/Derivate), `docs/sources.md`, `docs/assets.json`, `docs/launch-checklist.md`, `tests/`, `evidence/`; generierter `dist/` bleibt getrennt. Keine Dateien außerhalb des Roots werden geändert. Kein globales Suchen/Ersetzen.

Routen bleiben an vorhandenen Pfaden, soweit Inhalt belegt ist: `/`, `/collections/all`, `/collections/pesto`, `/collections/dressing`, `/collections/aioli`, passende `/products/<handle>`, `/pages/rezepte`, `/blogs/rezepte`, `/pages/uber-uns`, `/pages/geschaftskunden`, `/pages/private-label`, `/pages/contact`, `/policies/legal-notice`, `/policies/privacy-policy`, echte 404. EN-Bestand und auslaufende Shop-URLs werden vor einem Domainwechsel einzeln entschieden. Eine lokale Vorschau darf deshalb noch keine vollständige Domainmigration behaupten.

## Reihenfolge und Prüftore

1. **B:** Diese Referenzanalyse gegen O-SOME-Logo/Assets und die konkrete Bild-/Copy-/Motion-Planung abschließen.
2. **C:** Header, Hero, Geschmackswelt, Footer und zentraler Shop-Link; echte Screenshots bei 320/390/1440 px prüfen und reparieren.
3. **D:** Bestätigte Seiten und Produkte, B2B, Private Label, Kontakt, Rezepte und rechtliche Vorschauseiten aufbauen; alte URLs nur mit begründeter Zuordnung behandeln.
4. **E:** Build, Inhalts-/Linkchecks, Q01–Q40 mit `PASS/FAIL/NOT_RUN/BLOCKED`, Browserbreiten 320, 360, 375, 390, 393, 430, 768, 1024, 1440, 1920, 2560; Höhe 667/844/900; No-JS, Tastatur, Reduced Motion, Zoom, Kontrast, Performance und separat reale Safari/iOS-Evidenz. Maximal zwei Reparaturversuche je identischem Befund und drei komplette Review-Runden.
5. **F:** Lokalen Start/Build, Hashes/Revision, Quellen-/Bildmanifest, URL-Migration, Screenshots und offene Freigaben übergeben. **Kein Deployment, GitHub-Push, DNS-Wechsel oder Abschalten des Shopify-Shops.**

## Planprüfung

Scope: nur dieser Root schreibbar. Designbibliothek/CAF/Shopify-Generator nur gelesen. Routen: `/pages/rezepte` und `/blogs/rezepte` getrennt; keine neuen Duplikate. Fakten: ungeprüfte Claims, Produktverfügbarkeit und PLZ nicht still veröffentlichen. Rechte: `pending` sperrt Launch. Kosten: keine neuen kostenpflichtigen Dienste. Release: kein versteckter Veröffentlichungsschritt. Dieser Plan ist geprüft; Produktimplementierung kann nun projektlokal beginnen.

## GitHub-/Pages-Nachtrag vom 23.09.2026

Vor projektlokalen Pages-Änderungen geprüft: Der lokale Root hatte noch keinen Commit und keine Remotes; alle bisherigen Dateien waren untracked und wurden erhalten. `o-some/osome` ist das eindeutige öffentliche Markenwebsite-Repository, `main` zeigte auf `44c9161350a5102ccfa96747f1cc1841efb4585e` mit einer README. Es gab keine GitHub Actions, keine Pages-Konfiguration, keine Custom Domain und keinen CNAME. `origin` zeigt nun ausschließlich auf `https://github.com/o-some/osome.git`; `origin/main` wurde nur gelesen. Das private `o-some/osometaste-dawn-chelonaki` ist ein separater Shopify-Theme-Generator und bleibt unangetastet.

`www.o-some.de` ist weiterhin eine bestehende Live-Seite. Die read-only DNS-Prüfung zeigte keinen CNAME und Cloudflare-A-Adressen. Keine DNS- oder Domainänderung ist geplant oder freigegeben. Ein späterer Domainwechsel erfordert gesondert geprüfte URL-Migration, HTTP-Redirects, Canonicals, DNS/CNAME und ausdrückliche Freigabe.

Die Pages-Variante baut mit `SITE_BASE_PATH=/osome/`; ein projektlokaler URL-Prefix im HTML-Generator hält interne Links und Assets unter `https://o-some.github.io/osome/`. Das absolute Shopziel bleibt unverändert. Der manuell auslösbare Workflow baut und testet mit Node 20 und übergibt `dist/` als Pages-Artefakt. Manuelle Auslösung verhindert unbeabsichtigte Deployments durch spätere Commits. Vor dem ersten Commit, Push, der Pages-Einrichtung oder dem Workflow-Start müssen der lokale Produktionsbuild und die vollständige QA einschließlich offener Inhalts-, Rechte-, Rechts-, Shop- und Gerätegates bestanden sein. Nach Deployment folgt die Prüfung der tatsächlich ausgelieferten Desktop-/Mobile-Version. Kein Force-Push, kein zweites Repository und keine Branch-Löschung.

Die lokale `main` hat noch keinen Commit. Nach bestandenen Gates wird sie zuerst auf die dann erneut geprüfte `origin/main`-Revision ausgerichtet, damit die vorhandene README-Historie erhalten bleibt; erst danach werden die geprüften Projektdateien in logisch getrennten Commits ergänzt. Kein Orphan-Commit und kein Force-Push.

### Nur dokumentiert: möglicher späterer Wechsel von `www.o-some.de`

Am 23.09.2026 lieferte die read-only DNS-Prüfung für `www.o-some.de` **keinen CNAME** und die A-Antworten `172.67.193.220`/`104.21.60.76`; der Apex `o-some.de` lieferte dieselben Antworten. Diese sichtbaren Cloudflare-Adressen belegen nicht, welches Ursprungsziel im DNS-Provider konfiguriert ist. Vor einer Entscheidung müssen die tatsächlichen Provider-Einträge, Proxy-Einstellungen, MX/TXT/CAA, bestehende Weiterleitungen und die aktuelle Shopify-Domainbindung geprüft werden.

Erst nach ausdrücklicher gesonderter Freigabe wäre die Reihenfolge: (1) URL-Migration samt echten HTTP-301-Regeln, Alt-Shop-/EN-Entscheidungen und Rollback klären; GitHub Pages allein stellt keine frei definierbaren HTTP-301-Regeln für die 109 Alt-URLs bereit. (2) Website für die neue Basis `/` und `PUBLIC_ORIGIN=https://www.o-some.de` bauen, Canonicals und alle internen Links/Assets lokal und auf einer geeigneten Vorschau vollständig testen. (3) Custom Domain `www.o-some.de` in den Pages-Einstellungen setzen und die Provider-DNS-Regel für `www` gezielt auf `o-some.github.io` ändern; das GitHub-Ziel enthält **nicht** `/osome`. Bei einem Actions-Deploy ist eine Repository-`CNAME`-Datei dafür nicht erforderlich. (4) HTTPS, tatsächliche DNS-Auflösung, Desktop/Mobile, Shop-Links, 301/404 und Suchmetadaten nach der Umstellung prüfen; einen Rückweg zur bisherigen Konfiguration bereithalten. Für den Apex `o-some.de` wäre eine eigene Entscheidung nötig. Bis dahin bleibt die Live-Domain unverändert. Quelle für die GitHub-spezifischen DNS-/CNAME-Schritte: [GitHub Docs – Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Betreiberklarstellung und Umsetzung vom 23.09.2026

Die obigen Phase-A- und GitHub-Abschnitte halten ihren damaligen Prüfstand fest. Der Betreiber bestätigte danach ausdrücklich die O-SOME-Rechte, Chelonaki als Betreiber (Inhaber Eleftherios Samouladas), die Adresse Zeppelinstraße 7, 68519 Viernheim und das Chelonaki-Shopziel als Platz für einen später separat entstehenden Shop. Diese neuere Anweisung ersetzt die früheren Rechte-, PLZ-, Betreiber- und Shop-Launch-Vorbehalte. Impressum und Datenschutz wurden auf Chelonaki und GitHub Pages angepasst. Die Master-Spezifikation liegt in Dropbox jetzt als Version 1.2 mit dieser Klarstellung vor. Die aktuelle QA steht in `qa-report.md`; reale iOS-Prüfung bleibt mangels Testziel offen. `www.o-some.de` und DNS bleiben unverändert.

## Ausdrückliche Pages-Deploy-Entscheidung vom 23.09.2026

Der Betreiber gab nach Offenlegung der nicht verfügbaren realen iOS/Safari-Prüfung mit „Deploy“ die Veröffentlichung auf der separaten GitHub-Pages-Projekt-URL frei. Q33 bleibt `NOT_RUN`; für einen späteren Domainwechsel gilt diese Ausnahme nicht. Die Dropbox-Master-MD dokumentiert dies in Version 1.3. Alle übrigen lokalen Build- und QA-Nachweise sowie die anschließende Pages-Live-Prüfung bleiben erforderlich.
