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
}

];
