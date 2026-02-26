# Grow‑Quiz – Wissenschaftlicher Kompetenztest für Nährstoff‑Management

![Grow‑System Setup]({{file:GueqPBKUgLxnrvRf9hL5i4}})

## Übersicht

Dieses Projekt liefert einen **voll funktionsfähigen, mobil optimierten Web‑Test** zur Ermittlung des Wissensstandes im Bereich des Nährstoff‑Managements für Grow‑Systeme (inklusive Hydroponik und Erde). Der Test ist modular aufgebaut, deckt grundlegende bis fortgeschrittene Themen ab und wertet die Antworten datenbasiert aus. Die Sprache und Struktur wurde so angepasst, dass der Fokus nicht ausschließlich auf Hydroponik liegt, sondern generell auf Anbau‑ und Nährstoffmanagement.

**Schlüsselmerkmale:**

* **Modulare Struktur:** Anfänger, Fortgeschritten, Experte sowie ein separates Modul zu Wechselwirkungen & Zusätzen. Die Module decken Grundlagen bis hin zu komplexen Szenarien ab.
* Diverse Fragetypen: Single‑ und Multiple‑Choice, Reihenfolge, Szenarien, Berechnungen
* Bewertungslogik mit Gesamtscore, Modul‑Subscores, Kompetenzlevel, Fehlerkategorien und persönlichem Feedback
* Speicherung der Antworten nur im Browser (LocalStorage) – keine persönlichen Daten werden übertragen
* Export der Ergebnisse als **CSV** oder **JSON**
* Erweiterbar und wissenschaftlich fundiert (siehe Frage‑Begründungen in `questions.js`)



## 4. Bedienung

1. **Modulauswahl:** Auf der Startseite können ein oder mehrere Module ausgewählt werden. Werden keine Module ausgewählt, werden alle verwendet.
2. **Fragen beantworten:** Jede Frage wird einzeln präsentiert. Bei Single‑Choice‑ und Multi‑Choice‑Fragen steht zusätzlich eine Option **„Weiß nicht“** zur Verfügung, um Unwissen zu kennzeichnen. Bei Mehrfach‑Antworten werden Teilpunkte vergeben, wenn nur ein Teil der richtigen Optionen erkannt wird; falsche Optionen reduzieren den Anteil. Bei Reihenfolgefragen können die Elemente per Drag‑and‑Drop oder mithilfe von **Auf‑/Ab‑Buttons** (mobile Alternative) sortiert werden. Bei Berechnungen einen numerischen Wert eingeben.
3. **Confidence‑Rating:** Der Confidence‑Slider wird erst sichtbar, nachdem eine Antwort ausgewählt bzw. die Reihenfolge festgelegt wurde. Die Skala reicht von 1 (sehr unsicher) bis 5 (sehr sicher) und fließt in die psychometrische Analyse ein.
4. **Zwischenspeicherung:** Der Fortschritt wird automatisch gespeichert. Wenn der Browser geschlossen oder der Tab aktualisiert wird, kann der Test später fortgesetzt werden.
5. **Ergebnisanzeige:** Nach Abschluss werden Gesamtscore, Modul‑Subscores, Fehlerkategorien, persönliche Stärken/Schwächen und Zeitstatistiken angezeigt.
6. **Export:** Ergebnisse können im CSV‑ oder JSON‑Format heruntergeladen werden. Der CSV‑Export enthält unter anderem Frage‑ID, Module, Antwort, Korrektheit, Selbstbewertung und benötigte Zeit. JSON enthält die gleichen Informationen in strukturierter Form.

## 5. Auswertungslogik

* **Scoring:** Jede Frage trägt maximal einen Punkt zum Gesamtergebnis bei. Für Single‑Choice‑ und Szenario‑Fragen wird ein Punkt vergeben, wenn die Antwort korrekt ist. Für Multiple‑Choice‑Fragen wird **Teilcredit** vergeben: Anteil richtig ausgewählter Optionen minus Anteil ausgewählter falscher Optionen, begrenzt auf den Bereich 0–1. Die Option „Weiß nicht“ führt zu keinem Punktabzug. Reihenfolgefragen sind nur korrekt, wenn die Reihenfolge exakt stimmt; bei falscher Reihenfolge wird kein Punkt vergeben. Bei Berechnungen wird ein Toleranzbereich berücksichtigt.
* **Gesamtscore:** Die Summe aller erreichten Teilpunkte wird durch die Anzahl der Fragen geteilt und als Prozentsatz ausgegeben. Daraus wird das Kompetenzlevel abgeleitet: <25 % → **Stufe 1**, 25–49 % → **Stufe 2**, 50–74 % → **Stufe 3**, ≥75 % → **Stufe 4**.
* **Subscores:** Für jedes Modul wird die Summe der erzielten Punkte relativ zur Anzahl der Fragen im Modul berechnet und als Prozentwert dargestellt. Zusätzlich werden die Anzahl vollständig richtiger Antworten, Teilwissen, falsche Antworten und „Weiß nicht“‑Angaben aufgeführt.
* **Kategorienauswertung:** Jede Frage ist Kategorien wie „pH‑Fehler“, „EC‑Fehler“ oder „Antagonismus“ zugeordnet. Für jede Kategorie werden Punkteanteil, Anzahl richtiger/teilweiser/falscher/„Weiß nicht“‑Antworten und das durchschnittliche Vertrauen berechnet. Ein Interpretationsabschnitt erläutert typische Fehlannahmen pro Kategorie.
* **Zeitstatistik:** Es wird die Zeit pro Frage sowie die Gesamtzeit erfasst. Daraus lässt sich erkennen, wo längeres Nachdenken erforderlich war.
* **Psychometrische Kennwerte:** Der Schwierigkeitsgrad (`difficulty`) ist pro Frage hinterlegt (1–3). Die Auswertung zeigt den mittleren Schwierigkeitsgrad für vollständig richtige und falsche Antworten. Item‑Discrimination‑Parameter können erst mit einer größeren Teilnehmerzahl bestimmt werden.
* **Persönliches Feedback:** Das System identifiziert das stärkste und schwächste Modul sowie die Kategorie mit dem geringsten Punktanteil und leitet daraus individuelle Stärken und Lernfelder ab.

## 6. Didaktisches Konzept

Der Test orientiert sich an **kompetenzbasiertem Lernen**. Jede Frage ist mit einem Lernziel und einer wissenschaftlichen Begründung verknüpft (siehe Kommentare in `questions.js`).

* **Anfänger:** Vermittelt die Grundlagen zu pH, EC, Makro‑ und Mikronährstoffen, organisch vs. mineralisch sowie einfachen Zusammenhängen. Lernziel: elementare Parameter kennen und typische Fehler vermeiden.
* **Fortgeschritten:** Behandelt Antagonismen, pH‑Dynamik, Salzakkumulation, Substrat‑Pufferung, Messfehler und Systemreaktionen. Lernziel: systematische Ursachen verstehen und präventiv handeln.
* **Experte:** Konzentriert sich auf Szenarioanalyse, Trendbewertung, Systemlogik, Stabilitätsstrategien, minimalinvasive Eingriffe und Risikoabwägung. Lernziel: komplexe Situationen einschätzen und situativ entscheiden.
* **Wechselwirkungen & Zusätze:** Widmet sich Chelaten, Silikaten, Huminsäuren, Mischprotokollen und Ausfällungen. Lernziel: chemische Zusammenhänge verstehen und Zusätze gezielt einsetzen.

Die Schwierigkeitsklassifizierung (1–3) erlaubt eine mehrstufige Analyse: Ein hoher Anteil richtig beantworteter schwerer Fragen deutet auf tiefergehendes Verständnis hin.

## 8. Wissenschaftliche Quellen

Die Fragen und Erklärungen basieren auf seriösen Publikationen und Extension‑Guides. Einige zentrale Quellen:

* pH‑ und EC‑Empfehlungen: Die Oklahoma State University empfiehlt für hydroponische Nährlösungen einen pH‑Bereich von 5–6, um Nährstoffverfügbarkeit zu maximieren【345985548017505†L142-L148】. Hohe EC‑Werte verursachen osmotischen Stress, zu niedrige EC‑Werte führen zu Mangelerscheinungen【345985548017505†L132-L136】.
* Temperaturempfehlung: Ideale Wassertemperaturen für Hydroponik liegen bei 18–24 °C; höhere Temperaturen senken den Sauerstoffgehalt und erhöhen das Krankheitsrisiko【164645360006830†L168-L177】.
* Optimale Sauerstoffkonzentration: 5–8 mg/L DO gelten als ideal für die meisten Kulturen【548792925273666†L200-L227】.
* Nährstoffantagonismen: Ein Überschuss an Kalium kann die Aufnahme von Stickstoff, Calcium und Magnesium hemmen【538023277037540†L1291-L1304】, und ein Verhältnis von 3–5 Teilen K und Ca zu 1 Teil Mg wird empfohlen【443725516370711†L64-L69】.
* Messgenauigkeit: Die Michigan State University weist darauf hin, dass pH‑ und EC‑Messwerte nur so genau sind wie die Kalibration der Geräte und dass ungenaue Kalibration zu falschen Managemententscheidungen führt【662407355993593†L31-L44】. Zudem ist der pH‑Wert logarithmisch; eine Erhöhung von pH 5 auf 6 entspricht einer Verzehnfachung der basischen Aktivität【662407355993593†L100-L105】.
* pH‑Drift & Stickstoffformen: Fachartikel erklären, dass Ammoniumaufnahme H⁺ freisetzt und somit den pH senkt, während Nitrataufnahme OH⁻ beziehungsweise HCO₃⁻ freisetzt und den pH erhöht; das Verhältnis von Kationen- zu Anionenaufnahme bestimmt somit die pH‑Dynamik【22835750182173†L145-L160】【22835750182173†L208-L219】.
* Mikronährstoffverfügbarkeit: Bei hydroponischen Systemen führen hohe pH‑Werte (>6,5) zur Ausfällung von Eisen und anderen Mikronährstoffen. Chelatoren wie EDDHA bleiben auch bei höheren pH‑Werten stabil und sichern die Verfügbarkeit【175059155401991†L189-L207】.
* Chelate und Zusätze: Huminsäuren und Fulvosäuren binden Metallionen, verhindern Ausfällung und verbessern die Nährstoffaufnahme【58362107313850†L83-L100】【58362107313850†L114-L133】. Silizium wirkt stressmindernd und stärkt Pflanzen【268910118176844†L142-L171】.
* pH‑Drift: Die Aufnahme von Nitrat hebt den pH‑Wert, während Ammonium ihn senkt【915996148411992†L159-L177】.
* Mixing‑Protokolle: Calciumnitrat darf nicht mit Phosphat‑ oder Sulfat‑Düngern gemischt werden, da sonst Ausfällungen entstehen【898068303722320†L160-L167】.

Diese Quellen sind im Kommentarbereich von `questions.js` referenziert. Es lohnt sich, die Originalartikel zu lesen, um das eigene Wissen zu vertiefen.

## 9. Fazit

Dieses Projekt zeigt, wie aus einem wissenschaftlich fundierten Fragenkatalog ein skalierbares, datenauswertbares Testsystem entwickelt werden kann. Dank des modularen Aufbaus und der klaren Architektur lässt sich der Test leicht erweitern und in ein professionelles Produkt überführen.

