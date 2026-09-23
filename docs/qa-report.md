# O-SOME TASTE — QA-Nachweis (lokale Vorschau)

Stand: 23.09.2026. **Status des lokalen QA-Laufs: LOCAL_PAGES_BUILD_TESTED.** Der geprüfte Build wurde mit `SITE_BASE_PATH=/osome/ PUBLIC_ORIGIN=https://o-some.github.io` erstellt: `dist/index.html` SHA-256 `081417e0538aeca6c2213f4c4b1514b6ab92c249f87f80c269d49c2f642362c1`, `dist/styles.css` SHA-256 `45fb8121afca443cb2ce741ba553d60e03c4f13cb917c7637ea58074f5ce2090`. Die zwischenzeitlich entmaterialisierten Dropbox-Bilder konnten erneut gelesen werden. Das bestehende GitHub-Repository `o-some/osome` ist als `origin` eingebunden. Versionierung, Deployment und Live-Befunde werden nach ihrem tatsächlichen Abschluss getrennt ergänzt.

## Durchgeführte Läufe

- `SITE_BASE_PATH=/osome/ PUBLIC_ORIGIN=https://o-some.github.io npm run build` und `SITE_BASE_PATH=/osome/ PUBLIC_ORIGIN=https://o-some.github.io npm test`: auf dem aktuellen Pages-Build erfolgreich; fünf statische Tests bestanden. Routen, Links, Bilder, Canonicals, Social-Bild-URLs, `noindex` und Asset-Manifest geprüft.
- `PREVIEW_URL=http://127.0.0.1:4321/osome QA_SCREENSHOTS=1 npm run test:browser`: aktueller Pages-Build, 165 Seitenansichten (15 Routen × 11 Breiten: 320, 360, 375, 390, 393, 430, 768, 1024, 1440, 1920, 2560 px), Höhen 667/844/900 px; fünf axe-core-Läufe, 0 Befunde. Menü/Escape/Breakpoint, Skip-Link, No-JS-Shop-Navigation, Reduced Motion, 200-%-Textvergrößerung, Drittanbieter-Requests und echte HTTP-404 ohne Befund. Rohdaten: `evidence/browser-qa.json` (lokal, nicht zum Commit vorgesehen).
- Visuelle Prüfung anhand aktueller Chrome-Screenshots bei 320/390/1440/2560 px und ausgewählten Unterseiten. Die Hero-Bilder sind nach `img.decode()` sichtbar. Aktuelle Screenshots: `evidence/qa-home-390.png`, `evidence/qa-home-1440.png`, `evidence/qa-all-{390,1440}.png` und weitere `qa-*`-Ansichten. Dies ist Browser-Emulation auf dem Mac, kein reales iPhone.
- Lighthouse 12.8.2, am 23.09.2026 sechs neue getrennte kalte Läufe auf dem **aktuellen** `/osome/`-Build, simuliertes Throttling: mobil RTT 150 ms / 1,64 Mbit/s / CPU ×4; Desktop RTT 40 ms / 10,24 Mbit/s / CPU ×1. Mobil Performance 99/99/99, Accessibility 100/100/100, LCP-Median 2,251 s, CLS 0, TBT 0, initiales Transfergewicht 243.043 B. Desktop Performance 100/100/100, Accessibility 100/100/100, LCP-Median 0,481 s, CLS 0, TBT 0, Transfergewicht 414.860 B. Lighthouse-SEO 66 in beiden Profilen wegen bewusstem `noindex`; kein Launch-SEO-PASS. Rohdaten: `evidence/lighthouse-owner-{mobile,desktop}-{1,2,3}.json` (lokal, nicht zum Commit vorgesehen).
- Reproduzierbarkeit: `npm ci` im Dropbox-synchronisierten, ignorierten `node_modules/` scheiterte an `ENOTEMPTY` beim Entfernen einer synchronisierten Abhängigkeit. Ein sauberer `npm ci` aus demselben Lockfile in `/private/tmp/osome-ci` bestand mit 0 Audit-Befunden; die zwei direkten lokalen Testabhängigkeiten wurden danach aus dieser sauberen Installation wiederhergestellt. Dies ist ein lokaler Dropbox-Dateisystembefund, kein nachgewiesener Fehler des GitHub-Actions-Runners.
- First-Party-JavaScript `src/motion.js`: 1.587 B roh, 650 B gzip. Keine Webfonts. `npm audit` nach Entfernen der nur für Laborläufe installierten Lighthouse-Abhängigkeit: 0 Schwachstellen (`evidence/npm-audit.json`).

## GitHub Pages und Live-Nachprüfung

- Repository: `https://github.com/o-some/osome`, Branch `main`; Pages-URL: `https://o-some.github.io/osome/`. Pages nutzt den manuellen Actions-Workflow, HTTPS ist erzwungen und `cname` ist `null`.
- Nach den ersten drei Commits bestand der GitHub-Build, die erste Live-QA fand jedoch auf der langen Moussaka-Archivroute mit URL-kodiertem Emoji einen HTTP 404. Ursache: Der Build schrieb die Prozentkodierung wörtlich in den Ordnernamen. Der Build schreibt jetzt den dekodierten Ordner, während Link und Canonical kodiert bleiben. Die lokale statische und Browser-QA wurden danach wiederholt; beide bestanden. Der zweite Pages-Deploy bestätigte für die Route HTTP 200 mit und ohne abschließenden Slash.
- Der Workflow wurde auf offizielle Node-24-Actions und `ubuntu-24.04` aktualisiert. Der für die Live-QA verwendete Run [35821413541](https://github.com/o-some/osome/actions/runs/35821413541) für Commit `08c82cd64cce8c5e324f541b01c975e9fde683ea` schloss Build und Deploy erfolgreich ab.
- Live-Browser-QA auf der tatsächlich ausgelieferten Pages-URL: 165 Ansichten (15 Routen × elf Breiten von 320 bis 2560 px), fünf axe-core-Läufe, null Befunde. Shop-Links, Tastatur/Skip-Link, Menü, JavaScript-Ausfall, Reduced Motion, Textvergrößerung und HTTP-404 erneut geprüft. Rohdaten: `evidence/browser-qa.json` (lokal, nicht im Git-Commit). Aktuelle visuelle Live-Stichproben: `evidence/pages-home-{mobile,desktop}.png`, `evidence/pages-legal-mobile.png` und `evidence/pages-recipe-mobile.png`.
- Zusätzliche HTTP-Prüfung: Startseite, Impressum, Datenschutz, Moussaka, CSS und Logo HTTP 200; unbekannte Route HTTP 404. Die ausgelieferte Startseite war bytegleich mit dem lokalen Build (SHA-256 `081417e0538aeca6c2213f4c4b1514b6ab92c249f87f80c269d49c2f642362c1`). Alle geprüften HTML-Seiten enthalten `noindex, nofollow`; die Rechtstexte nennen Chelonaki.
- `www.o-some.de` blieb unverändert. Pages besitzt keine Custom Domain; die read-only DNS-Prüfung für `www.o-some.de` lieferte weiterhin `104.21.60.76` und `172.67.193.220`, keinen CNAME.

## Q01–Q40

| ID | Status | Nachweis / offene Grenze |
|---|---|---|
| Q01 | PASS | Neues O-SOME-Projekt im angegebenen Root; keine anderen Kundenprojekte oder CAF-Dateien geändert. |
| Q02 | PASS | Ausgangsroot war leer, dokumentiert in `implementation-plan.md`; keine Nutzerdateien überschrieben. |
| Q03 | PASS | Referenz 124 über Dropbox-ID/Revision/SHA-256 identifiziert und PNG tatsächlich visuell geöffnet. |
| Q04 | PASS | Web-DNA und nicht übernommene Print-Elemente in `web-design.md` begründet. |
| Q05 | PASS | Echtes O-SOME-Logo als unveränderte Pixelquelle, daraus projektspezifisches Favicon; visuell geprüft. |
| Q06 | PASS | Alle Bilder und URLs vorhanden. Eigentümer bestätigte O-SOME-Rechte und Wiederverwendung am 23.09.2026; eingebettetes REWE-Grafikelement im Original-Packshot dokumentiert. |
| Q07 | PASS | Etiketten und Person aus verifizierten O-SOME-Quellen, keine KI-Ersatzdetails; Sichtprüfung ausgewählter Ansichten. |
| Q08 | PASS | Beschriftetes Shop-Symbol in Header und weiteren CTAs mobil/desktop sichtbar. |
| Q09 | PASS | Statischer Test aller `data-shop-link`: exakt `https://www.chelonaki.eu/shop`. |
| Q10 | PASS | No-JS-Test navigierte im selben Tab zur exakt vorgegebenen URL (Request abgefangen, keine Bestellung). |
| Q11 | PASS | Keine Warenkorb-, Checkout-, Login-, Merkzettel- oder Shop-SDK-Implementierung. |
| Q12 | PASS | Externes Ziel am 23.09.2026 HTTP 200; Betreiber bestätigte es als richtiges Ziel für den später separat entstehenden Shop. Aktuell Studioseite, noch keine Kaufbarkeit; Website behauptet keine Bestellung. |
| Q13 | PASS | Pflichtseiten und belegte Kerninhalte gebaut; 109 Alt-URLs einzeln inventarisiert. Redirect-Freigabe siehe Q35. |
| Q14 | PASS | Keine Dummy-Funktion. Impressum und Datenschutz auf Chelonaki und tatsächliche statische Pages-Datenflüsse angepasst; keine alten Shopify- oder Cloudflare-Behauptungen. |
| Q15 | PASS | Betreiber bestätigte Chelonaki und unveränderte Adresse. Aktuelles Chelonaki-Impressum nennt Inhaber Eleftherios Samouladas, 68519 Viernheim und Einzelunternehmen; GmbH-/HRB-Angaben nicht übertragen. |
| Q16 | PASS | `mailto:`/`tel:` geprüft; kein Formular oder fingierter Versand. |
| Q17 | PASS | Produktmerkmale und Award-Aussagen aus der bestehenden O-SOME-Quelle; Betreiber bestätigte O-SOME-Rechte. Eingebettetes REWE/Food-Camp-Grafikelement als Fremdzeichen im Originalbild offengelegt; keine neue Preis- oder Verfügbarkeitsaussage. |
| Q18 | PASS | 165 Browseransichten, kein horizontaler Überlauf; 200-%-Textfehler behoben und gezielt nachgetestet. |
| Q19 | PASS | Ausgewählte Seiten bei kurzer Höhe, Mobil/Desk/Ultrawide visuell geprüft; keine beobachteten Kollisionen. |
| Q20 | PASS | Gezielter mobiler Anker-Scrolltest bei 390 px und Reduced Motion: Zieloberkante 111,8 px, Headerunterkante 69 px; Ziel bleibt sichtbar. |
| Q21 | PASS | Mobiles Menü: Öffnen, Escape, Fokus auf Summary, Breakpointwechsel im vollständigen Browserlauf. |
| Q22 | PASS | Skip-Link per Tastatur fokussiert und aktiviert; Ziel erhält Fokus. Weitergehende manuelle Screenreaderprüfung bleibt offen. |
| Q23 | PASS | Fünf axe-core-Läufe ohne WCAG-A/AA-Befunde; Bild- und Farbzonen visuell geprüft. |
| Q24 | PASS | 200-%-Textvergrößerung nach Layoutkorrektur ohne horizontalen Überlauf. |
| Q25 | PASS | Reduced-Motion-Endzustand im Browser sichtbar, keine Pflichtanimation oder Parallax-JS. |
| Q26 | PASS | JavaScript deaktiviert: Inhalt, natives Menü und Shop-Navigation funktionieren. |
| Q27 | PASS | Quellprüfung: ein Motion-Observer, kein dauerhafter RAF-Loop. |
| Q28 | PASS | Dimensionierte WebP-Bilder, Ladelogik und Größenbudget im gemessenen Build; aktuelle Dropbox-Verfügbarkeit Q06. |
| Q29 | PASS | Aktueller `/osome/`-Produktionsbuild und fünf statische Tests erfolgreich. |
| Q30 | PASS | Nach Behebung des auf Pages gefundenen Rezept-404 vollständige lokale und öffentliche Browserläufe ohne Page-, Konsolen-, Ressourcen- oder Drittanbieterfehler. |
| Q31 | PASS | Sechs vergleichbare kalte Lighthouse-Läufe auf dem aktuellen Pages-Build; Profile, Scores und Median oben. Keine Feldwerte behauptet. |
| Q32 | PASS | Mobile/Desktop/Ultrawide-Screenshots geprüft, Emulation gekennzeichnet. |
| Q33 | NOT_RUN | Kein reales iOS-Gerät und kein Xcode-Simulator (`xcrun simctl` nicht verfügbar). Safari 27 auf macOS vorhanden, aber WebDriver verweigert Sitzungen ohne die globale Einstellung „Allow remote automation“; diese wurde nicht geändert. Bildschirmaufnahme war schwarz. Mobile Prüfung erfolgte in Chrome-Emulation. Der Betreiber gab nach Offenlegung dieses Befunds am 23.09.2026 das Pages-Deployment mit „Deploy“ ausdrücklich frei. Q33 bleibt `NOT_RUN` und ist kein PASS. |
| Q34 | PASS | Für die Pages-Projekt-URL: individuelle Titel/Descriptions, Canonicals, OG-URLs und absolute Social-Bild-URLs geprüft. `noindex` bleibt bewusst; finale Live-Domain-SEO ist separat offen. |
| Q35 | NOT_APPLICABLE | Für die getrennte Pages-Projekt-URL bleiben die 109 Alt-URLs auf `www.o-some.de` unverändert; Live-404 und kodierte Moussaka-Route nach Reparatur geprüft. EN-/Shop-Migration und echte HTTP-301-Tests sind vor einem späteren, gesondert freizugebenden Domainwechsel offen. |
| Q36 | PASS | HTML-`noindex` auf allen gebauten und live geprüften Seiten; HTTP-`X-Robots-Tag` nur im lokalen Previewserver. Keine Produktionsumschaltung der bestehenden Domain. |
| Q37 | PASS | Statischer Code ohne Tracker/externes SDK/Schlüssel; aktueller Browserlauf beobachtete keine Drittanbieter-Requests. |
| Q38 | PASS | Lockfile, direkte Testabhängigkeiten und finaler `npm audit`: 0 Befunde. |
| Q39 | PASS | README dokumentiert Start, Build, Pflege und zentrale Shop-URL. |
| Q40 | PASS | Dieser Bericht trennt lokale und öffentliche Tests, den akzeptierten Shop-Zwischenstand und die offen gebliebene reale iOS-Prüfung; keine pauschale Vollabnahme behauptet. |

## Offene Punkte nach Pages-Deploy

Die reale iOS/Safari-iOS-Prüfung bleibt mangels Gerät/Simulator `NOT_RUN`; der Betreiber hat die Pages-Veröffentlichung mit Kenntnis dieser Grenze ausdrücklich freigegeben. `https://www.chelonaki.eu/shop` ist das bestätigte externe Ziel, zeigt aktuell aber noch die Studioseite; ein separater Shop wird später aufgebaut. Für das im unveränderten Chili-Packshot eingebettete REWE/Food-Camp-Zeichen liegt keine separat dokumentierte Markenfreigabe vor. Ein späterer Domainwechsel erfordert gesonderte Freigabe sowie URL-, DNS-, CNAME- und Redirect-Arbeit. `www.o-some.de` wurde nicht umgestellt.
