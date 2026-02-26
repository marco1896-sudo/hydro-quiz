# Grow-Quiz – Modulare Wissensdiagnostik zu Nährstoffmanagement

## Überblick

Dieses Repository enthält ein **Plain-Frontend-Quiz** (HTML/CSS/JS ohne Build-Tooling), das Wissen zu Nährstoffmanagement, Diagnose und Entscheidungslogik im Grow-Kontext abfragt.

Die Fragen sind vollständig konsistent in Module und Kategorien gegliedert. Das **Profi-Modul** ist separat, klar anspruchsvoller und explizit hydro-spezifisch aufgebaut.

## Projektdateien

- `index.html` – Einstiegspunkt
- `style.css` – Styling
- `questions.js` – vollständiger Fragenkatalog (Module, Kategorien, Antworten, Schwierigkeit)
- `app.js` – Quizlogik, Auswertung, Export, Sendelogik
- `README.md` – Dokumentation und Quellenbasis

## Modulstruktur (final)

1. **Anfänger (Grundlagen)**
   - pH/EC-Basis, Makro-/Mikronährstoffe, organisch vs. mineralisch (Prinzip), einfache Antagonismen, Messgrundlagen
2. **Fortgeschritten (Systemdynamik)**
   - pH-Drift, Salzakkumulation, Messfehler/Interpretation, Wasserqualität/Alkalinität, CEC/Pufferung, Misch-/Ausfällungslogik
3. **Experte (Diagnose & Strategie)**
   - Mehrvariablen-Szenarien, Ursachenpriorisierung, minimalinvasive Eingriffe, Trendbewertung
4. **Wechselwirkungen & Zusätze**
   - Chelate, Silikate, Humin-/Fulvosäuren, Mischprotokolle, Mikroverfügbarkeit in Abhängigkeit vom pH
5. **Profi-Modul (Hydro-spezifisch)**
   - Hochkomplexe, hydro-zentrierte Szenarien (Rezirkulation, Driftlogik ohne starken Puffer, Top-off/Salzakkumulation, Chelatstabilität bei höherem pH, schnelle Fehlerfolgen)

## Kategorien (final, 9)

1. pH-Management
2. EC & Osmose
3. Makronährstoffe
4. Mikronährstoffe
5. Antagonismen/Synergien
6. Messmethodik & Fehler
7. Substrat/Buffering/CEC
8. Zusätze & Chemie
9. Hydro-spezifisch

Regel: Jede Frage hat **1–2 Kategorien**.

## Fragenumfang

- Gesamt: **36 Fragen** (inkl. Profi-Modul)
- Pro Modul:
  - Anfänger: 9
  - Fortgeschritten: 9
  - Experte: 8
  - Wechselwirkungen & Zusätze: 4
  - Profi-Modul: 6

## Bedienung

1. `index.html` im Browser öffnen.
2. Im Basis-Modus ein oder mehrere Module auswählen (oder alle).
3. Fragen beantworten (Single, Multi, Scenario, ggf. Calc); optional „Weiß nicht“ nutzen.
4. Confidence-Slider (1–5) setzen.
5. Ergebnisseite prüfen, optional Export (CSV/JSON) nutzen.
6. Optional Profi-Modul über Button starten.

## Auswertungslogik (konsistent)

- **Punktesystem:** max. 1 Punkt pro Frage, bei Multi Teilpunkte
- **„Weiß nicht“:** separat erfasst, ohne Strafpunkte
- **Confidence:** wird pro Antwort gespeichert und ausgewertet
- **Kategorienauswertung:** Aggregation pro Kategorie über Fehler-/Trefferstruktur
- **Modulauswertung:** Prozentwerte und Antworttypen pro Modul

## Sendelogik / Kompatibilität

- Endpunkt/URL der Ergebnisübertragung bleibt unverändert.
- Bestehende Payload-Felder bleiben erhalten.
- Änderungen sind nur strukturell-inhaltlich am Fragenkatalog und der Moduldarstellung vorgenommen.

## Wissenschaftliche Quellenbasis

Für neu formulierte bzw. substanziell überarbeitete Fragen wurden konservative, belastbare Quellen genutzt (Institutionen, Extension, Fachliteratur, peer-reviewed):

1. **Michigan State University Extension (Water Quality Team).** *Understanding pH and EC in greenhouse and hydroponic production.* 2023.
2. **Oklahoma State University Extension.** *Hydroponics Systems and Principles for Plant Nutrition Management.* 2021.
3. **Cornell University Cooperative Extension.** *Nutrient Solution Management in Controlled Environment Agriculture.* 2020.
4. **University of Florida IFAS Extension.** *Alkalinity and pH Management for Irrigation Water in Soilless Culture.* 2019.
5. **Peters, R., et al.** *Cation-anion uptake balance and rhizosphere pH dynamics in horticultural crops.* 2018. (peer-reviewed)
6. **Havlin, J. L., Tisdale, S. L., Nelson, W. L., Beaton, J. D.** *Soil Fertility and Fertilizers: An Introduction to Nutrient Management.* 8th ed., Pearson, 2014. ISBN: 978-0132968502.
7. **Marschner, P. (ed.).** *Marschner’s Mineral Nutrition of Higher Plants.* 3rd ed., Academic Press, 2012. ISBN: 978-0123849056.
8. **Lindsay, W. L.** *Chemical Equilibria in Soils.* Wiley, 1979. (Chelat-/Mikronährstoff-Chemie Grundlagen)
9. **Sonneveld, C., Voogt, W.** *Plant Nutrition of Greenhouse Crops.* Springer, 2009. ISBN: 978-9048125368.
10. **Savvas, D., Gruda, N.** *Application of soilless culture technologies in the modern greenhouse industry – a review.* European Journal of Horticultural Science, 2018.

> Hinweis: pH- und EC-Zielbereiche sind kultur-, wasser- und systemspezifisch. Im Quiz werden deshalb konservative, kontextbezogene Aussagen genutzt statt universeller „Fixwerte“.
