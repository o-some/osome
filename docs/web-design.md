# Phase B — O-SOME Web-DNA

Primärreferenz: Bild 124 „Amalfi Sunstone“ (visuell geprüft; Identität und SHA-256 in `implementation-plan.md`). Rolle: `PRIMARY_ART_DIRECTION`. Keine zweite Referenz.

## Übersetzung der Referenz

| Übertragbar | Nur Print, verworfen | Web-Chance / Risiko |
|---|---|---|
| Helles Papier, viel Ruhe, schmale Serif-Titel, kleine Kapitelzahlen | Doppelseiten, Buchfalz, winzige Bildunterschriften, Kachel-Ornamente, fremde Buchbilder | Asymmetrische Desktop-Splits und klare mobile Reihenfolge; Schriften mindestens gut lesbare Webgrößen |
| Kulinarische Nahaufnahme neben kurzem Text | Vorlagenfoto als Produktnachweis | Echte O-SOME-Packshots mit unverändertem Etikett; eigene Foodfotos nur mit geklärten Rechten |
| Warme Naturfarben und punktuelle kräftige Akzente | Mediterrane Herkunftsbehauptung | O-SOME-Magenta als Markenanker, Oliv/Papier als Bühne; kein „Made in Italy“ |

## Verbindliche Gestaltung

- Palette: Papier `#F5F0E5`, Oberfläche `#FFFDF7`, Oliv `#1C312B`, Ink `#1B241F`, Muted `#546257`, Saffran `#E8B546`, Terracotta `#A0442E`, Linie `#D8D2C4`; O-SOME-Magenta aus dem echten Logo bleibt ein kleiner Markenakzent. Saffran nie als Fließtext auf Papier.
- Mangels bestätigter CI-Fontdateien: `Georgia` für Display, System-Sans für UI/Body. Keine externen Fontrequests und kein unlizenzierter Fontdownload. Die vorgeschlagenen Fraunces/Manrope bleiben eine mögliche spätere Freigabe.
- Desktop: 12-Spalten-Denken, Text/Bild 5/7 und 7/5, maximale Inhaltsbreite 1380 px. Mobil: echter Einspaltenfluss mit Text vor dem Hero-Bild; Motive erhalten eigene `object-position` statt künstlicher Desktop-Collage.
- Wiederkehrend: Kapitellinie mit Index, Geschmacksfenster mit echtem Glas und Foodmotiv, kleiner dekorativer Sonnenpunkt ohne Siegelwirkung. O-SOME-Logo bleibt in Form und Farbe unverändert.
- Hero: „Geschmack, der den Unterschied macht.“; Primär-CTA „Zum Shop“ mit klarer Zielangabe, Sekundärlink zum redaktionellen Katalog. Produktdetail ohne Preis/Bestand.
- Navigation: Desktop alle Hauptziele plus sofort sichtbarer Shop; „Für Unternehmen“ als Linkgruppe mit klickbarem Disclosure; mobil Logo, Shop und Disclosure-Button. Ohne JS bleibt Navigation sichtbar und Shop direkt nutzbar.
- Motion: M1 einzelne Reveal-Gruppen 480 ms/14 px, per einmaligem Observer ohne verborgenen Basiszustand; M2 subtile Bildtiefe nur Desktop und nur falls Browsermessung flüssig (sonst weglassen); M3 Hover/Fokus 160 ms, Bildskalierung höchstens 1.025; M4 Menü 180 ms. Reduced Motion setzt sofort Endzustände, keine idle-RAF-Schleife.

## Bildslots und Copy-Grenzen

Priorität: IMG01 echtes Chili-Pesto-Glas auf ruhiger Fläche; IMG02 weitere Pesto-Sorte aus aktuellem Sortiment; IMG03/04 Dressing/Aioli nur als redaktionelle Geschmackswelt ohne erfundenen Packshot; IMG05 Chili-Detail; IMG06 tatsächliche Produktentwicklung oder neutrales Stillleben; IMG07–09 echte Rezept/Servierideen mit passender Quelle; IMG10 echtes Foto von Eleftherios, andere Teammitglieder zunächst als Text; IMG11 echtes Sortiment/Display; IMG12 neutrales Prozessmotiv ohne fremdes Label. Motivlücken und Rechte bleiben explizit im Assetmanifest. Keine fremden Bilder aus Referenz 124.

Faktische Copy nur aus aktuellen O-SOME-Seiten bzw. freigegebenen Projektquellen. Die drei ausgezeichneten Produkte 2024 und Chili 2026 dürfen nur mit Produkt/Jahr/Quelle genannt werden; Logo-Awards bis Rechteklärung nicht. Keine neu erfundenen Handels-, Herkunfts-, Gesundheits-, Vegan- oder Verfügbarkeitsaussagen. Rechts-/Adresskonflikt, EN-Migration und externes Shop-Ziel sind Launch-Gates.
