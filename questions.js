export const questions = [
  /* =========================
     MODUL 1 – Anfänger (Grundlagen)
  ========================= */
  {
    id: 'M1Q1',
    module: 'Anfänger',
    type: 'single',
    text: 'Welcher pH-Bereich ist für die meisten mineralischen Nährlösungen im Grow-Alltag häufig ein sinnvoller Startpunkt?',
    options: [
      { id: 'A', text: '4,0-4,5' },
      { id: 'B', text: '5,5-6,2' },
      { id: 'C', text: '6,8-7,5' },
      { id: 'D', text: '7,8-8,5' }
    ],
    answer: 'B',
    difficulty: 1,
    categories: ['pH-Management']
  },
  {
    id: 'M1Q2',
    module: 'Anfänger',
    type: 'single',
    text: 'Was beschreibt der EC-Wert primär?',
    options: [
      { id: 'A', text: 'Die elektrische Leitfähigkeit als Näherung für die gelöste Salzmenge' },
      { id: 'B', text: 'Den exakten Stickstoffgehalt der Lösung' },
      { id: 'C', text: 'Den Sauerstoffgehalt im Wurzelraum' },
      { id: 'D', text: 'Die Wasserhärte allein' }
    ],
    answer: 'A',
    difficulty: 1,
    categories: ['EC & Osmose']
  },
  {
    id: 'M1Q3',
    module: 'Anfänger',
    type: 'single',
    text: 'Welche Aussage zu Makronährstoffen trifft zu?',
    options: [
      { id: 'A', text: 'N, P und K werden in relativ größeren Mengen benötigt als Fe oder Zn' },
      { id: 'B', text: 'Makronährstoffe sind nur Spurenelemente' },
      { id: 'C', text: 'Makronährstoffe spielen nur in der Blüte eine Rolle' },
      { id: 'D', text: 'Makronährstoffe beeinflussen den Wasserhaushalt nicht' }
    ],
    answer: 'A',
    difficulty: 1,
    categories: ['Makronährstoffe']
  },
  {
    id: 'M1Q4',
    module: 'Anfänger',
    type: 'single',
    text: 'Welche Rolle haben Mikronährstoffe wie Eisen, Mangan oder Zink?',
    options: [
      { id: 'A', text: 'Sie werden nur in kleinen Mengen benötigt, sind aber essenziell für Enzyme und Stoffwechsel' },
      { id: 'B', text: 'Sie sind austauschbar mit Calcium und Kalium' },
      { id: 'C', text: 'Sie sind nur für Bodenmikroben relevant' },
      { id: 'D', text: 'Sie werden von der Pflanze nicht aktiv aufgenommen' }
    ],
    answer: 'A',
    difficulty: 1,
    categories: ['Mikronährstoffe']
  },
  {
    id: 'M1Q5',
    module: 'Anfänger',
    type: 'single',
    text: 'Was ist der zentrale Unterschied zwischen organischer und mineralischer Düngung?',
    options: [
      { id: 'A', text: 'Organische Systeme benötigen oft mikrobielle Umwandlung, mineralische liefern Ionen direkter' },
      { id: 'B', text: 'Mineralische Dünger wirken nur bei pH über 8' },
      { id: 'C', text: 'Organische Düngung enthält keine Nährstoffe' },
      { id: 'D', text: 'Beide Systeme sind chemisch identisch und wirken immer gleich schnell' }
    ],
    answer: 'A',
    difficulty: 1,
    categories: ['Substrat/Buffering/CEC']
  },
  {
    id: 'M1Q6',
    module: 'Anfänger',
    type: 'single',
    text: 'Welcher Zusammenhang beschreibt einen typischen Antagonismus?',
    options: [
      { id: 'A', text: 'Starker Kaliumüberschuss kann die Aufnahme von Calcium und Magnesium erschweren' },
      { id: 'B', text: 'Mehr Eisen erhöht immer die Phosphoraufnahme' },
      { id: 'C', text: 'Mehr Stickstoff neutralisiert jeden pH-Fehler' },
      { id: 'D', text: 'Calcium verhindert grundsätzlich alle Mängel' }
    ],
    answer: 'A',
    difficulty: 2,
    categories: ['Antagonismen/Synergien']
  },
  {
    id: 'M1Q7',
    module: 'Anfänger',
    type: 'single',
    text: 'Warum ist die regelmäßige Kalibrierung von pH- und EC-Messgeräten wichtig?',
    options: [
      { id: 'A', text: 'Um Messdrift zu korrigieren und Fehlentscheidungen zu vermeiden' },
      { id: 'B', text: 'Damit sich der EC-Wert automatisch senkt' },
      { id: 'C', text: 'Damit Nährstoffe schneller gelöst werden' },
      { id: 'D', text: 'Kalibrierung ist nur bei Laborgeräten nötig' }
    ],
    answer: 'A',
    difficulty: 1,
    categories: ['Messmethodik & Fehler']
  },
  {
    id: 'M1Q8',
    module: 'Anfänger',
    type: 'single',
    text: 'Wenn der EC deutlich zu hoch ist, was ist eine naheliegende unmittelbare Folge?',
    options: [
      { id: 'A', text: 'Osmotischer Stress mit gebremster Wasseraufnahme' },
      { id: 'B', text: 'Automatisch stärkeres Wurzelwachstum' },
      { id: 'C', text: 'Sofort stabilerer pH-Wert' },
      { id: 'D', text: 'Sicherer Schutz vor Antagonismen' }
    ],
    answer: 'A',
    difficulty: 1,
    categories: ['EC & Osmose']
  },
  {
    id: 'M1Q9',
    module: 'Anfänger',
    type: 'single',
    text: 'Welche Aussage zur pH-Skala ist korrekt?',
    options: [
      { id: 'A', text: 'Sie ist logarithmisch; eine Einheit entspricht einer Zehnerpotenz' },
      { id: 'B', text: 'Sie ist linear; jede Einheit entspricht einem Plus von 1 % Säure' },
      { id: 'C', text: 'Sie gilt nur für Boden, nicht für Nährlösungen' },
      { id: 'D', text: 'pH 6 ist doppelt so basisch wie pH 5' }
    ],
    answer: 'A',
    difficulty: 1,
    categories: ['pH-Management', 'Messmethodik & Fehler']
  },

  /* =========================
     MODUL 2 – Fortgeschritten (Systemdynamik)
  ========================= */
  {
    id: 'M2Q1',
    module: 'Fortgeschritten',
    type: 'scenario',
    text: 'Der pH-Wert steigt in einem stabil beleuchteten System über mehrere Tage leicht an. Welche Ursache ist häufig plausibel?',
    options: [
      { id: 'A', text: 'Überwiegende Nitrataufnahme verschiebt die Rhizosphärenreaktion in Richtung pH-Anstieg' },
      { id: 'B', text: 'Zu niedrige Luftfeuchte erhöht direkt den pH' },
      { id: 'C', text: 'Ein hoher Kalziumwert senkt den pH sofort' },
      { id: 'D', text: 'Eine frische Kalibrierung macht pH-Anstieg wahrscheinlicher' }
    ],
    answer: 'A',
    difficulty: 2,
    categories: ['pH-Management']
  },
  {
    id: 'M2Q2',
    module: 'Fortgeschritten',
    type: 'scenario',
    text: 'Im Drain steigt der EC über Tage, obwohl die Düngerkonzentration unverändert bleibt. Was ist am wahrscheinlichsten?',
    options: [
      { id: 'A', text: 'Salzakkumulation im Wurzelraum/Substrat' },
      { id: 'B', text: 'Sofortiger Stickstoffverlust aus der Nährlösung' },
      { id: 'C', text: 'Messgerät zeigt automatisch immer höhere Werte nach 7 Tagen' },
      { id: 'D', text: 'Der pH-Wert kann deshalb nicht mehr gemessen werden' }
    ],
    answer: 'A',
    difficulty: 2,
    categories: ['EC & Osmose', 'Substrat/Buffering/CEC']
  },
  {
    id: 'M2Q3',
    module: 'Fortgeschritten',
    type: 'single',
    text: 'Welche Wasserkenngröße beeinflusst die pH-Stabilität besonders stark?',
    options: [
      { id: 'A', text: 'Alkalinität (Säurebindungsvermögen, v. a. Hydrogencarbonat)' },
      { id: 'B', text: 'Wassertemperatur allein' },
      { id: 'C', text: 'Farbe des Wassers' },
      { id: 'D', text: 'Sauerstoffsättigung allein' }
    ],
    answer: 'A',
    difficulty: 2,
    categories: ['pH-Management']
  },
  {
    id: 'M2Q4',
    module: 'Fortgeschritten',
    type: 'multi',
    text: 'Welche Punkte sprechen für einen Messfehler statt eines echten Nährstoffproblems?',
    options: [
      { id: 'A', text: 'pH-Wert springt bei Wiederholmessung derselben Probe stark' },
      { id: 'B', text: 'Kalibrierpuffer sind abgelaufen oder verunreinigt' },
      { id: 'C', text: 'Messsonde wurde zwischen pH 4 und pH 7 frisch kalibriert' },
      { id: 'D', text: 'Messprobe wurde nicht homogenisiert (oben/unten unterschiedliche Werte)' }
    ],
    answer: ['A', 'B', 'D'],
    difficulty: 3,
    categories: ['Messmethodik & Fehler']
  },
  {
    id: 'M2Q5',
    module: 'Fortgeschritten',
    type: 'single',
    text: 'Warum sollte man kleine pH-Drifts nicht immer sofort aggressiv korrigieren?',
    options: [
      { id: 'A', text: 'Überkorrekturen können das System instabil machen' },
      { id: 'B', text: 'pH-Korrektur wirkt grundsätzlich nie' },
      { id: 'C', text: 'pH ist nur in Erde relevant' },
      { id: 'D', text: 'Die Pflanze benötigt täglich einen wechselnden pH über 2 Einheiten' }
    ],
    answer: 'A',
    difficulty: 2,
    categories: ['pH-Management']
  },
  {
    id: 'M2Q6',
    module: 'Fortgeschritten',
    type: 'single',
    text: 'Was beschreibt die CEC eines Substrats am besten?',
    options: [
      { id: 'A', text: 'Fähigkeit, Kationen zu binden und wieder abzugeben (Pufferwirkung)' },
      { id: 'B', text: 'Maximale Sauerstoffkapazität des Wassers' },
      { id: 'C', text: 'Direkte Messung des Lichtniveaus' },
      { id: 'D', text: 'Anteil ungelöster Düngersalze im Tank' }
    ],
    answer: 'A',
    difficulty: 2,
    categories: ['Substrat/Buffering/CEC']
  },
  {
    id: 'M2Q7',
    module: 'Fortgeschritten',
    type: 'single',
    text: 'Warum werden in Düngerschemata häufig A- und B-Komponenten getrennt gehalten?',
    options: [
      { id: 'A', text: 'Um konzentrierte Reaktionen und Ausfällungen (z. B. Ca mit Phosphat/Sulfat) zu vermeiden' },
      { id: 'B', text: 'Damit der EC nicht messbar ist' },
      { id: 'C', text: 'Weil Stickstoff nur in A stabil ist' },
      { id: 'D', text: 'Damit der pH-Wert immer auf 7 bleibt' }
    ],
    answer: 'A',
    difficulty: 2,
    categories: ['Zusätze & Chemie']
  },
  {
    id: 'M2Q8',
    module: 'Fortgeschritten',
    type: 'scenario',
    text: 'Junge Blätter zeigen interveinale Chlorose, der pH liegt wiederholt über 6,5. Was ist die plausibelste Ersthypothese?',
    options: [
      { id: 'A', text: 'Mikronährstoffverfügbarkeit (v. a. Fe/Mn) ist pH-bedingt eingeschränkt' },
      { id: 'B', text: 'Kaliumüberschuss ist sicher ausgeschlossen' },
      { id: 'C', text: 'Das Problem betrifft nur ältere Blätter und ist daher irrelevanter Messfehler' },
      { id: 'D', text: 'Der EC muss zwingend zu niedrig sein' }
    ],
    answer: 'A',
    difficulty: 3,
    categories: ['Mikronährstoffe', 'pH-Management']
  },
  {
    id: 'M2Q9',
    module: 'Fortgeschritten',
    type: 'single',
    text: 'Welche Interpretation ist bei gleichzeitig hohem EC und verlangsamtem Wachstum sinnvoll?',
    options: [
      { id: 'A', text: 'Osmotischer Stress/Überkonzentration ist wahrscheinlicher als Unterdüngung' },
      { id: 'B', text: 'Mehr Dünger löst das Problem fast immer sofort' },
      { id: 'C', text: 'Das ist ein sicherer Hinweis auf pH unter 4' },
      { id: 'D', text: 'Hoher EC verbessert immer die Wasseraufnahme' }
    ],
    answer: 'A',
    difficulty: 2,
    categories: ['EC & Osmose']
  },

  /* =========================
     MODUL 3 – Experte (Diagnose & Strategie)
  ========================= */
  {
    id: 'M3Q1',
    module: 'Experte',
    type: 'scenario',
    text: 'EC und pH liegen im Zielkorridor, dennoch verschlechtert sich das Pflanzenbild. Was ist als Nächstes am sinnvollsten?',
    options: [
      { id: 'A', text: 'Wurzelzone, Sauerstoffeintrag, Temperatur und Messplausibilität systematisch prüfen' },
      { id: 'B', text: 'Sofort Nährstoffkonzentration verdoppeln' },
      { id: 'C', text: 'Nur Blattfarbe fotografieren und 7 Tage warten' },
      { id: 'D', text: 'Alle Zusätze gleichzeitig erhöhen' }
    ],
    answer: 'A',
    difficulty: 3,
    categories: ['Messmethodik & Fehler', 'Hydro-spezifisch']
  },
  {
    id: 'M3Q2',
    module: 'Experte',
    type: 'scenario',
    text: 'Du vermutest entweder Messfehler oder echten Lockout. Welcher Schritt priorisiert Ursachen sauber?',
    options: [
      { id: 'A', text: 'Zuerst Messkette validieren (Kalibrierung, Gegenmessung), dann erst Rezeptur ändern' },
      { id: 'B', text: 'Sofort mit maximaler pH-Korrektur starten' },
      { id: 'C', text: 'Nur Blattanalyse ohne Prozessdaten nutzen' },
      { id: 'D', text: 'Ausschließlich EC betrachten und pH ignorieren' }
    ],
    answer: 'A',
    difficulty: 3,
    categories: ['Messmethodik & Fehler']
  },
  {
    id: 'M3Q3',
    module: 'Experte',
    type: 'multi',
    text: 'Welche minimalinvasiven Maßnahmen sind in einer instabilen Phase oft sinnvoll?',
    options: [
      { id: 'A', text: 'Kleine, dokumentierte Korrekturen statt großer Sprünge' },
      { id: 'B', text: 'Trend über 24-48 h beobachten, bevor erneut angepasst wird' },
      { id: 'C', text: 'Mehrere Variablen gleichzeitig stark verändern' },
      { id: 'D', text: 'Erst die wahrscheinlichste Primärursache abarbeiten' }
    ],
    answer: ['A', 'B', 'D'],
    difficulty: 3,
    categories: ['Messmethodik & Fehler']
  },
  {
    id: 'M3Q4',
    module: 'Experte',
    type: 'scenario',
    text: 'Bei gleichem Schema steigt die Mangelsymptomatik nach jeder CalMag-Erhöhung. Was ist die beste Hypothese?',
    options: [
      { id: 'A', text: 'Mögliches Kationen-Ungleichgewicht/Antagonismus statt echter Primärmangel' },
      { id: 'B', text: 'CalMag kann keine Nebenwirkungen haben' },
      { id: 'C', text: 'Nur Licht ist ursächlich' },
      { id: 'D', text: 'Messwerte sind damit automatisch unbrauchbar' }
    ],
    answer: 'A',
    difficulty: 3,
    categories: ['Antagonismen/Synergien']
  },
  {
    id: 'M3Q5',
    module: 'Experte',
    type: 'single',
    text: 'Welche Strategie ist bei mehrdeutiger Datenlage meist robuster?',
    options: [
      { id: 'A', text: 'Ursachen priorisieren und mit reversiblen Maßnahmen beginnen' },
      { id: 'B', text: 'Maximale Gegensteuerung in allen Parametern gleichzeitig' },
      { id: 'C', text: 'Nur auf Bauchgefühl ohne Messdaten setzen' },
      { id: 'D', text: 'Stets vollständigen Wasserwechsel als ersten Schritt erzwingen' }
    ],
    answer: 'A',
    difficulty: 3,
    categories: ['Messmethodik & Fehler']
  },
  {
    id: 'M3Q6',
    module: 'Experte',
    type: 'scenario',
    text: 'Nach pH-Korrektur treten wiederholt Ausreißer auf. Welche Ursache sollte priorisiert geprüft werden?',
    options: [
      { id: 'A', text: 'Unzureichende Durchmischung bzw. zeitnahes Messen nach Zugabe' },
      { id: 'B', text: 'Unvermeidbarer genetischer Effekt' },
      { id: 'C', text: 'Fehlendes Nitrat im Leitungswasser ist sicher die einzige Ursache' },
      { id: 'D', text: 'Jede pH-Sonde ist nach einer Woche unbrauchbar' }
    ],
    answer: 'A',
    difficulty: 3,
    categories: ['Messmethodik & Fehler', 'pH-Management']
  },
  {
    id: 'M3Q7',
    module: 'Experte',
    type: 'single',
    text: 'Wofür spricht ein Trend „EC steigt, Wasserverbrauch bleibt hoch“ in rezirkulierenden Systemen am ehesten?',
    options: [
      { id: 'A', text: 'Wasseraufnahme übersteigt Salzaufnahme; Konzentration nimmt zu' },
      { id: 'B', text: 'Automatische Verdünnung durch Pflanzen' },
      { id: 'C', text: 'Sichere Unterdüngung' },
      { id: 'D', text: 'Messwert ohne jede Aussagekraft' }
    ],
    answer: 'A',
    difficulty: 3,
    categories: ['EC & Osmose', 'Hydro-spezifisch']
  },
  {
    id: 'M3Q8',
    module: 'Experte',
    type: 'scenario',
    text: 'Du musst zwischen Antagonismus, Wurzelzonenstress und Messartefakt priorisieren. Welche Reihenfolge ist am logischsten?',
    options: [
      { id: 'A', text: 'Messartefakte ausschließen -> Wurzelzone prüfen -> Nährstoffantagonismen feinjustieren' },
      { id: 'B', text: 'Direkt Rezeptur komplett wechseln und dann messen' },
      { id: 'C', text: 'Nur Blattsymptome bewerten, Prozessdaten ignorieren' },
      { id: 'D', text: 'Immer zuerst Flush, unabhängig von Datenlage' }
    ],
    answer: 'A',
    difficulty: 3,
    categories: ['Messmethodik & Fehler', 'Antagonismen/Synergien']
  },

  /* =========================
     MODUL 4 – Wechselwirkungen & Zusätze
  ========================= */
  {
    id: 'M4Q1',
    module: 'Wechselwirkungen & Zusätze',
    type: 'single',
    text: 'Welche Aussage zu Eisen-Chelaten ist fachlich korrekt?',
    options: [
      { id: 'A', text: 'EDDHA ist in alkalischerem Milieu stabiler als EDTA und oft auch als DTPA' },
      { id: 'B', text: 'EDTA ist über den gesamten pH-Bereich immer am stabilsten' },
      { id: 'C', text: 'Chelate verhindern jede Form von Antagonismus vollständig' },
      { id: 'D', text: 'Chelate erhöhen den Sauerstoffgehalt der Nährlösung direkt' }
    ],
    answer: 'A',
    difficulty: 2,
    categories: ['Zusätze & Chemie', 'Mikronährstoffe']
  },
  {
    id: 'M4Q2',
    module: 'Wechselwirkungen & Zusätze',
    type: 'single',
    text: 'Warum wird Silizium im Anbau häufig ergänzend eingesetzt?',
    options: [
      { id: 'A', text: 'Es kann Stressresistenz und Gewebestabilität unterstützen, ersetzt aber keine Basisnährstoffe' },
      { id: 'B', text: 'Es ersetzt Calcium vollständig' },
      { id: 'C', text: 'Es hebt den EC nicht und ist deshalb immer neutral' },
      { id: 'D', text: 'Es korrigiert jeden pH-Fehler dauerhaft' }
    ],
    answer: 'A',
    difficulty: 2,
    categories: ['Zusätze & Chemie']
  },
  {
    id: 'M4Q3',
    module: 'Wechselwirkungen & Zusätze',
    type: 'single',
    text: 'Welche konservative Einordnung zu Humin- und Fulvosäuren passt?',
    options: [
      { id: 'A', text: 'Sie können komplexierend/puffernd wirken, sind aber kein Ersatz für korrekte Basisführung' },
      { id: 'B', text: 'Sie machen pH-Management überflüssig' },
      { id: 'C', text: 'Sie liefern automatisch alle Mikroelemente in ausreichender Menge' },
      { id: 'D', text: 'Sie sind nur in rein mineralischen Systemen nutzbar' }
    ],
    answer: 'A',
    difficulty: 2,
    categories: ['Zusätze & Chemie']
  },
  {
    id: 'M4Q4',
    module: 'Wechselwirkungen & Zusätze',
    type: 'scenario',
    text: 'Nach dem Mischen konzentrierter Komponenten trübt die Lösung ein. Was ist am wahrscheinlichsten passiert?',
    options: [
      { id: 'A', text: 'Ausfällung durch ungeeignete Mischreihenfolge/zu hohe lokale Konzentration' },
      { id: 'B', text: 'Der EC fällt immer bei korrekter Mischung auf null' },
      { id: 'C', text: 'Mikronährstoffe werden dadurch grundsätzlich besser verfügbar' },
      { id: 'D', text: 'Es ist nur ein optischer Effekt ohne chemische Bedeutung' }
    ],
    answer: 'A',
    difficulty: 2,
    categories: ['Zusätze & Chemie']
  },

  /* =========================
     MODUL 5 – Profi-Modul (Hydro-spezifisch)
  ========================= */
  {
    id: 'PRO1',
    module: 'Profi-Modul',
    tier: 'pro',
    type: 'scenario',
    text: 'Rezirkulierende Hydro ohne nennenswerte Alkalinität: pH fällt innerhalb von 24 h deutlich, EC bleibt nahezu gleich. Welche Primärursache ist plausibel?',
    options: [
      { id: 'A', text: 'Relativ hoher NH4-Anteil bzw. kationenlastige Aufnahme treibt Protonenfreisetzung' },
      { id: 'B', text: 'Verdunstung senkt zwangsläufig den pH unabhängig von Ionenbilanz' },
      { id: 'C', text: 'Chelate erhöhen sofort die Alkalinität' },
      { id: 'D', text: 'Das ist nur mit defektem EC-Meter erklärbar' }
    ],
    answer: 'A',
    difficulty: 4,
    categories: ['Hydro-spezifisch', 'pH-Management']
  },
  {
    id: 'PRO2',
    module: 'Profi-Modul',
    tier: 'pro',
    type: 'scenario',
    text: 'In einem kleinen DWC-Reservoir sinkt der Wasserstand stark, EC steigt täglich. Top-off erfolgt nur mit Wasser. Was ist die langfristig wahrscheinlichste Folge?',
    options: [
      { id: 'A', text: 'Ionische Verschiebung/Salzakkumulation, daher periodisch Rezeptur neu setzen statt nur verdünnen' },
      { id: 'B', text: 'Automatische Rückkehr zur Ausgangsrezeptur' },
      { id: 'C', text: 'Sichere Chelatzerstörung unabhängig vom pH' },
      { id: 'D', text: 'Stabile Nährstoffrelationen ohne Eingriff' }
    ],
    answer: 'A',
    difficulty: 4,
    categories: ['Hydro-spezifisch', 'EC & Osmose']
  },
  {
    id: 'PRO3',
    module: 'Profi-Modul',
    tier: 'pro',
    type: 'single',
    text: 'Warum ist in Hydro-Systemen mit geringem Puffervolumen ein mehrstündiges Abwarten nach einer Fehlmischung riskanter als in stark gepufferten Medien?',
    options: [
      { id: 'A', text: 'Fehler wirken schneller auf die Wurzelumgebung, weil weniger Substratpuffer vorhanden ist' },
      { id: 'B', text: 'Hydro neutralisiert Konzentrationssprünge grundsätzlich selbst' },
      { id: 'C', text: 'Nur der pH ist betroffen, nicht die Verfügbarkeit' },
      { id: 'D', text: 'Wurzelkontakt mit Nährlösung ist in Hydro geringer als in Erde' }
    ],
    answer: 'A',
    difficulty: 4,
    categories: ['Hydro-spezifisch']
  },
  {
    id: 'PRO4',
    module: 'Profi-Modul',
    tier: 'pro',
    type: 'scenario',
    text: 'pH driftet in NFT über 6,8, Symptome deuten auf Fe-Limitierung. Welche Anpassung ist am zielgerichtetsten?',
    options: [
      { id: 'A', text: 'pH-Führung stabilisieren und bei Bedarf auf pH-stabileres Eisenchelat (z. B. EDDHA-geeignet je nach System) umstellen' },
      { id: 'B', text: 'Nur EC massiv erhöhen' },
      { id: 'C', text: 'Kalium komplett streichen' },
      { id: 'D', text: 'Ohne Messung blind Mikropaket verdoppeln' }
    ],
    answer: 'A',
    difficulty: 4,
    categories: ['Hydro-spezifisch', 'Mikronährstoffe']
  },
  {
    id: 'PRO5',
    module: 'Profi-Modul',
    tier: 'pro',
    type: 'multi',
    text: 'Welche Signalkombination spricht am ehesten für ein Ionenverhältnisproblem statt für einen reinen Gesamt-EC-Fehler?',
    options: [
      { id: 'A', text: 'EC im Zielbereich, aber persistente kulturspezifische Mangelsymptome' },
      { id: 'B', text: 'Wiederholte Symptomverschiebung nach Einzelzusatz eines Kations' },
      { id: 'C', text: 'Stabile Entwicklung nach ausgewogenem Neuansatz' },
      { id: 'D', text: 'Messwerte aus unkalibriertem Gerät sind konstant' }
    ],
    answer: ['A', 'B'],
    difficulty: 4,
    categories: ['Hydro-spezifisch', 'Antagonismen/Synergien']
  },
  {
    id: 'PRO6',
    module: 'Profi-Modul',
    tier: 'pro',
    type: 'scenario',
    text: 'Nach Korrektur mehrerer Variablen gleichzeitig (pH, EC, Additive) verbessert sich das Bild kurz, kippt dann erneut. Was ist die professionellste Schlussfolgerung?',
    options: [
      { id: 'A', text: 'Konfundierung: Eingriffe entkoppeln, protokollieren und Ursache schrittweise isolieren' },
      { id: 'B', text: 'Noch mehr gleichzeitige Eingriffe erhöhen die Diagnosequalität' },
      { id: 'C', text: 'Hydro-Systeme sind grundsätzlich nicht diagnostizierbar' },
      { id: 'D', text: 'Das spricht sicher gegen Messfehler' }
    ],
    answer: 'A',
    difficulty: 4,
    categories: ['Hydro-spezifisch', 'Messmethodik & Fehler']
  }
];
