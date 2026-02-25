export const questions = [

/* =========================
   MODUL 1 – Grundlagen
========================= */

{
  id: 'M1Q1',
  module: 'Grundlagen',
  type: 'single',
  text: 'Welcher pH-Bereich ist für die meisten hydroponischen Systeme optimal?',
  options: [
    { id: 'A', text: '4,0–4,5' },
    { id: 'B', text: '5,5–6,2' },
    { id: 'C', text: '6,8–7,5' },
    { id: 'D', text: '7,5–8,5' }
  ],
  answer: 'B',
  difficulty: 1,
  categories: ['pH-Fehler'],
},

{
  id: 'M1Q2',
  module: 'Grundlagen',
  type: 'single',
  text: 'Ein zu hoher EC-Wert führt typischerweise zu …',
  options: [
    { id: 'A', text: 'schnellerem Wachstum' },
    { id: 'B', text: 'osmotischem Stress und Wurzelschäden' },
    { id: 'C', text: 'besserer Nährstoffaufnahme' },
    { id: 'D', text: 'stabilerem pH-Wert' }
  ],
  answer: 'B',
  difficulty: 1,
  categories: ['EC-Fehler'],
},

{
  id: 'M1Q3',
  module: 'Grundlagen',
  type: 'single',
  text: 'Warum ist zu warmes Nährwasser problematisch?',
  options: [
    { id: 'A', text: 'Weniger Sauerstoff löst sich im Wasser' },
    { id: 'B', text: 'Der EC sinkt automatisch' },
    { id: 'C', text: 'Der pH stabilisiert sich' },
    { id: 'D', text: 'Magnesium wird blockiert' }
  ],
  answer: 'A',
  difficulty: 1,
  categories: ['Sauerstoff-Fehler'],
},

   {
  id: 'M1Q12',
  module: 'Grundlagen',
  type: 'single',
  text: 'Mythos: „CalMag kann man immer bedenkenlos erhöhen, wenn Probleme auftreten.“',
  options: [
    { id: 'A', text: 'Stimmt – Calcium und Magnesium schaden nie' },
    { id: 'B', text: 'Falsch – Überdosierung kann Antagonismen verursachen' }
  ],
  answer: 'B',
  difficulty: 2,
  categories: ['Antagonismus']
},

{
  id: 'M1Q13',
  module: 'Grundlagen',
  type: 'single',
  text: 'Warum reagieren Hydro-Systeme schneller auf Überdüngung als Erde?',
  options: [
    { id: 'A', text: 'Hydro hat kaum Pufferkapazität' },
    { id: 'B', text: 'Hydro enthält mehr Sauerstoff' },
    { id: 'C', text: 'Hydro hat höheren pH' },
    { id: 'D', text: 'Hydro speichert weniger Wasser' }
  ],
  answer: 'A',
  difficulty: 2,
  categories: ['Systemverständnis']
},

{
  id: 'M1Q14',
  module: 'Grundlagen',
  type: 'single',
  text: 'Welche Aussage zu organischer Düngung ist korrekt?',
  options: [
    { id: 'A', text: 'Sie wirkt unabhängig von Mikroorganismen' },
    { id: 'B', text: 'Sie benötigt mikrobielle Umwandlung zur Nährstofffreisetzung' },
    { id: 'C', text: 'Sie beeinflusst den pH nie' },
    { id: 'D', text: 'Sie erhöht den EC sofort stark' }
  ],
  answer: 'B',
  difficulty: 2,
  categories: ['Organisch']
},

/* =========================
   MODUL 2 – Praxis & Dynamik
========================= */

{
  id: 'M2Q1',
  module: 'Praxis & Dynamik',
  type: 'scenario',
  text: 'Dein pH steigt täglich leicht an. Woran liegt das am wahrscheinlichsten?',
  options: [
    { id: 'A', text: 'Die Pflanze nimmt überwiegend Nitrat auf' },
    { id: 'B', text: 'Du hast zu viel Kalium im Tank' },
    { id: 'C', text: 'Der EC ist zu niedrig' },
    { id: 'D', text: 'Das Wasser ist zu kalt' }
  ],
  answer: 'A',
  difficulty: 2,
  categories: ['pH-Fehler'],
},

{
  id: 'M2Q2',
  module: 'Praxis & Dynamik',
  type: 'multi',
  text: 'Ein dauerhaft zu hoher EC kann welche Folgen haben?',
  options: [
    { id: 'A', text: 'Nährstoffblockaden' },
    { id: 'B', text: 'Verbrannte Blattspitzen' },
    { id: 'C', text: 'Wachstumsstopp' },
    { id: 'D', text: 'Bessere Blütenbildung' }
  ],
  answer: ['A','B','C'],
  difficulty: 2,
  categories: ['EC-Fehler'],
},

{
  id: 'M2Q3',
  module: 'Praxis & Dynamik',
  type: 'single',
  text: 'Warum sollte Calciumnitrat nicht direkt mit phosphathaltigem Dünger gemischt werden?',
  options: [
    { id: 'A', text: 'Es kommt zu Ausfällungen' },
    { id: 'B', text: 'Der EC sinkt sofort' },
    { id: 'C', text: 'Der pH wird neutral' },
    { id: 'D', text: 'Stickstoff wird zerstört' }
  ],
  answer: 'A',
  difficulty: 2,
  categories: ['Ausfällung'],
},

   {
  id: 'M2Q19',
  module: 'Praxis & Dynamik',
  type: 'single',
  text: 'Welche Folge kann ein dauerhaft zu hohes Calcium- und Magnesiumangebot bei gleichzeitig hohem Kalium haben?',
  options: [
    { id: 'A', text: 'Stabiler pH-Wert' },
    { id: 'B', text: 'Kationen-Ungleichgewicht und gegenseitige Verdrängung an Aufnahmeplätzen' },
    { id: 'C', text: 'Bessere Stickstoffaufnahme' },
    { id: 'D', text: 'Erhöhter Sauerstoffgehalt im Wasser' }
  ],
  answer: 'B',
  difficulty: 3,
  categories: ['Antagonismus']
},
   
 {
  id: 'M2Q16',
  module: 'Praxis & Dynamik',
  type: 'scenario',
  text: 'In Erde steigt der Drain-EC stetig an, obwohl moderat gedüngt wird. Was ist wahrscheinlich?',
  options: [
    { id: 'A', text: 'Salzansammlung im Substrat' },
    { id: 'B', text: 'Zu wenig Licht' },
    { id: 'C', text: 'Unterdüngung' },
    { id: 'D', text: 'Zu hoher Sauerstoffgehalt' }
  ],
  answer: 'A',
  difficulty: 3,
  categories: ['Erde','Lockout']
},

{
  id: 'M2Q17',
  module: 'Praxis & Dynamik',
  type: 'single',
  text: 'Warum kann ein starkes Cal/Mag-Verhältnis andere Nährstoffe indirekt blockieren?',
  options: [
    { id: 'A', text: 'Durch Konkurrenz an Kationen-Aufnahmeplätzen' },
    { id: 'B', text: 'Weil Calcium Stickstoff zerstört' },
    { id: 'C', text: 'Weil Magnesium den EC senkt' },
    { id: 'D', text: 'Weil CalMag den pH neutralisiert' }
  ],
  answer: 'A',
  difficulty: 3,
  categories: ['Antagonismus']
},

{
  id: 'M2Q18',
  module: 'Praxis & Dynamik',
  type: 'scenario',
  text: 'Du korrigierst jeden kleinen pH-Anstieg sofort. Welche Gefahr entsteht langfristig?',
  options: [
    { id: 'A', text: 'Systeminstabilität durch Überreaktion' },
    { id: 'B', text: 'Schnelleres Wachstum' },
    { id: 'C', text: 'Bessere Nährstoffaufnahme' },
    { id: 'D', text: 'Kein Effekt' }
  ],
  answer: 'A',
  difficulty: 3,
  categories: ['Überreaktion']
},
/* =========================
   MODUL 3 – Fortgeschritten
========================= */

{
  id: 'M3Q1',
  module: 'Fortgeschritten',
  type: 'multi',
  text: 'Ein extremer Kaliumüberschuss kann welche Nährstoffe blockieren?',
  options: [
    { id: 'A', text: 'Calcium' },
    { id: 'B', text: 'Magnesium' },
    { id: 'C', text: 'Stickstoff' },
    { id: 'D', text: 'Silizium' }
  ],
  answer: ['A','B','C'],
  difficulty: 3,
  categories: ['Antagonismus'],
},

{
  id: 'M3Q2',
  module: 'Fortgeschritten',
  type: 'scenario',
  text: 'Dein EC steigt trotz Nachfüllen mit Wasser langsam an. Was ist die sinnvollste Reaktion?',
  options: [
    { id: 'A', text: 'Kompletten Wasserwechsel durchführen' },
    { id: 'B', text: 'Mehr Dünger zugeben' },
    { id: 'C', text: 'Gar nichts tun' },
    { id: 'D', text: 'Temperatur senken' }
  ],
  answer: 'A',
  difficulty: 3,
  categories: ['Stabilität'],
},

{
  id: 'M3Q3',
  module: 'Fortgeschritten',
  type: 'single',
  text: 'Welche Wirkung haben Chelate wie EDTA oder Fulvinsäure?',
  options: [
    { id: 'A', text: 'Verbessern die Verfügbarkeit von Mikronährstoffen' },
    { id: 'B', text: 'Erhöhen direkt den EC' },
    { id: 'C', text: 'Senken dauerhaft den pH' },
    { id: 'D', text: 'Blockieren Eisen' }
  ],
  answer: 'A',
  difficulty: 2,
  categories: ['Zusätze'],
},

{
  id: 'M3Q4',
  module: 'Fortgeschritten',
  type: 'single',
  text: 'Warum wird Silizium oft supplementiert?',
  options: [
    { id: 'A', text: 'Stärkt Zellwände und Stressresistenz' },
    { id: 'B', text: 'Ersetzt Magnesium' },
    { id: 'C', text: 'Steigert sofort den Ertrag' },
    { id: 'D', text: 'Neutralisiert Nitrat' }
  ],
  answer: 'A',
  difficulty: 2,
  categories: ['Zusätze'],
},

   {
  id: 'M3Q18',
  module: 'Fortgeschritten',
  type: 'multi',
  text: 'Welche Faktoren beeinflussen die Nährstoffverfügbarkeit in Erde?',
  options: [
    { id: 'A', text: 'pH-Wert' },
    { id: 'B', text: 'Kationenaustauschkapazität (CEC)' },
    { id: 'C', text: 'Mikrobielle Aktivität' },
    { id: 'D', text: 'Lufttemperatur im Raum' }
  ],
  answer: ['A','B','C'],
  difficulty: 3,
  categories: ['Erde','Systemverständnis']
},

{
  id: 'M3Q19',
  module: 'Fortgeschritten',
  type: 'single',
  text: 'Warum kann ein „Flush“ bei organischer Erde weniger effektiv sein als bei mineralischer Überdüngung?',
  options: [
    { id: 'A', text: 'Weil organische Systeme Puffer- und Speicherprozesse enthalten' },
    { id: 'B', text: 'Weil Wasser organische Stoffe nicht beeinflusst' },
    { id: 'C', text: 'Weil EC in Erde nicht messbar ist' },
    { id: 'D', text: 'Weil Mikroben Wasser blockieren' }
  ],
  answer: 'A',
  difficulty: 3,
  categories: ['Organisch','Erde']
},

{
  id: 'M3Q20',
  module: 'Fortgeschritten',
  type: 'scenario',
  text: 'EC und pH sind korrekt, dennoch zeigen Pflanzen Mangeloptik. Welche systemische Ursache ist wahrscheinlich?',
  options: [
    { id: 'A', text: 'Antagonismus oder Wurzelzonenproblem' },
    { id: 'B', text: 'Unterdüngung' },
    { id: 'C', text: 'Zu viel Licht' },
    { id: 'D', text: 'Zu viel Sauerstoff' }
  ],
  answer: 'A',
  difficulty: 3,
  categories: ['Antagonismus','Wurzelzone']
},

   {
  id: 'M3Q18',
  module: 'Fortgeschritten',
  type: 'multi',
  text: 'Welche Faktoren beeinflussen die Nährstoffverfügbarkeit in Erde?',
  options: [
    { id: 'A', text: 'pH-Wert' },
    { id: 'B', text: 'Kationenaustauschkapazität (CEC)' },
    { id: 'C', text: 'Mikrobielle Aktivität' },
    { id: 'D', text: 'Lufttemperatur im Raum' }
  ],
  answer: ['A','B','C'],
  difficulty: 3,
  categories: ['Erde','Systemverständnis']
},

{
  id: 'M3Q19',
  module: 'Fortgeschritten',
  type: 'single',
  text: 'Warum kann ein „Flush“ bei organischer Erde weniger effektiv sein als bei mineralischer Überdüngung?',
  options: [
    { id: 'A', text: 'Weil organische Systeme Puffer- und Speicherprozesse enthalten' },
    { id: 'B', text: 'Weil Wasser organische Stoffe nicht beeinflusst' },
    { id: 'C', text: 'Weil EC in Erde nicht messbar ist' },
    { id: 'D', text: 'Weil Mikroben Wasser blockieren' }
  ],
  answer: 'A',
  difficulty: 3,
  categories: ['Organisch','Erde']
},

{
  id: 'M3Q20',
  module: 'Fortgeschritten',
  type: 'scenario',
  text: 'EC und pH sind korrekt, dennoch zeigen Pflanzen Mangeloptik. Welche systemische Ursache ist wahrscheinlich?',
  options: [
    { id: 'A', text: 'Antagonismus oder Wurzelzonenproblem' },
    { id: 'B', text: 'Unterdüngung' },
    { id: 'C', text: 'Zu viel Licht' },
    { id: 'D', text: 'Zu viel Sauerstoff' }
  ],
  answer: 'A',
  difficulty: 3,
  categories: ['Antagonismus','Wurzelzone']
},

   {
  id: 'PRO1',
  module: 'Fortgeschritten',
  tier: 'pro',
  type: 'scenario',
  text: 'Hydro: EC steigt, Wasserstand sinkt, pH steigt leicht. Wahrscheinlichste Systemlogik?',
  options: [
    { id: 'A', text: 'Pflanze nimmt mehr Wasser als Salze auf' },
    { id: 'B', text: 'Unterdüngung' },
    { id: 'C', text: 'Messfehler immer' },
    { id: 'D', text: 'Zu wenig Licht' }
  ],
  answer: 'A',
  difficulty: 4,
  categories: ['Systemverständnis']
},

{
  id: 'PRO2',
  module: 'Fortgeschritten',
  tier: 'pro',
  type: 'single',
  text: 'Warum kann übermäßiges CalMag in Erde langfristig strukturelle Probleme verursachen?',
  options: [
    { id: 'A', text: 'Ungleichgewicht an Austauschplätzen (CEC)' },
    { id: 'B', text: 'Es senkt dauerhaft den pH' },
    { id: 'C', text: 'Es erhöht die Bodenfeuchte' },
    { id: 'D', text: 'Es blockiert Sauerstoff' }
  ],
  answer: 'A',
  difficulty: 4,
  categories: ['Antagonismus','Erde']
},

{
  id: 'PRO3',
  module: 'Fortgeschritten',
  tier: 'pro',
  type: 'calc',
  text: 'Tank 40L, EC 2.0 → Ziel 1.5. Wie viel % Frischwasser zufügen? (±5)',
  answer: { value: 25, tolerance: 5 },
  difficulty: 4,
  categories: ['Berechnung']
},

{
  id: 'PRO4',
  module: 'Fortgeschritten',
  tier: 'pro',
  type: 'single',
  text: 'Welche Strategie ist langfristig stabiler?',
  options: [
    { id: 'A', text: 'Werte exakt täglich korrigieren' },
    { id: 'B', text: 'Trend beobachten und moderat eingreifen' }
  ],
  answer: 'B',
  difficulty: 4,
  categories: ['Systemdenken']
},

{
  id: 'PRO5',
  module: 'Fortgeschritten',
  tier: 'pro',
  type: 'multi',
  text: 'Welche Prozesse sind bei organischer Erde zentral?',
  options: [
    { id: 'A', text: 'Mikrobielle Mineralisierung' },
    { id: 'B', text: 'Kationenaustauschprozesse' },
    { id: 'C', text: 'Direkte Salzsteuerung wie in Hydro' },
    { id: 'D', text: 'Humus-Pufferung' }
  ],
  answer: ['A','B','D'],
  difficulty: 4,
  categories: ['Organisch','Erde','Systemverständnis']
},

];
