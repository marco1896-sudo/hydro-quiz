/*
 * Grow-Quiz Application (Basis + Profi-Modul)
 *
 * - Basis: normale Module (alle Fragen ohne tier:'pro')
 * - Profi: 5 Profi-Fragen (nur Fragen mit tier:'pro') über Button am Ende
 * - Profi-Modus wird über URL-Parameter gesteuert: ?pro=1
 * - Fortschritt wird über localStorage gespeichert (pro/basis getrennt)
 */

import { questions } from './questions.js';

/*
 * Erweiterungen: Weiß-nicht-Option, Teilpunkte, Confidence-Integration,
 * Kategorieninterpretationen und Quellenliste. Die folgenden Konstanten
 * definieren Erläuterungen zu Fehlerkategorien und die wissenschaftliche
 * Quellenbasis. Diese Texte erscheinen in der Ergebnisdarstellung.
 */

// Kurze Interpretationen für häufige Fehlerkategorien. Jede Beschreibung
// umfasst 2–4 Sätze und beschreibt typische Ursachen, ohne konkrete
// Handlungsanweisungen zu liefern. Bei Bedarf können weitere Kategorien
// ergänzt werden.
const CATEGORY_INTERPRETATIONS = {
  'pH-Fehler':
    'Der pH-Wert beeinflusst die Verfügbarkeit vieler Nährstoffe. Zu niedrige oder zu hohe Werte können bestimmte Elemente unzugänglich machen und toxische Konzentrationen hervorrufen. Häufige Fehler sind das Vernachlässigen der logarithmischen Skala und die falsche Einschätzung des Einflusses von Wasserqualität und Nährstoffform.',
  'EC-Fehler':
    'Die elektrische Leitfähigkeit (EC) ist ein Indikator für die Salzkonzentration der Nährlösung. Zu hohe EC-Werte verursachen osmotischen Stress, während zu niedrige Werte zu Mangelernährung führen. Messfehler oder fehlende Anpassungen nach Verdunstung sind häufige Ursachen für EC-Probleme.',
  'Antagonismus':
    'Antagonismen zwischen Nährstoffen treten auf, wenn hohe Konzentrationen eines Elements die Aufnahme anderer Elemente blockieren. Kalium, Calcium und Magnesium konkurrieren z. B. um dieselben Transportmechanismen – ein ausgewogenes Verhältnis ist entscheidend. Unausgewogene Düngung führt schnell zu Mangelerscheinungen trotz ausreichender Gesamtmenge.',
  'Messfehler':
    'Messfehler entstehen oft durch schlecht kalibrierte oder verschmutzte Messgeräte. Ohne regelmäßige Kalibration liefern pH- und EC-Messgeräte unzuverlässige Werte, die zu falschen Managemententscheidungen führen können. Auch Temperaturkompensation und Elektrodenpflege sind wichtige Faktoren.',
  'pH-Dynamik':
    'Die pH-Dynamik beschreibt Veränderungen des pH-Wertes durch die Aufnahme von Kationen und Anionen. Ammoniumaufnahme senkt den pH-Wert, während Nitrataufnahme ihn erhöht. Das Verhältnis von Kationen zu Anionen bestimmt, ob eine Lösung sauer oder basisch wird – dieses Verständnis ist essenziell, um pH-Drift zu kontrollieren.',
  'Mikro-Fehler':
    'Mikronährstoffe wie Eisen, Mangan oder Zink sind nur in bestimmten pH-Bereichen verfügbar. Bei zu hohen pH-Werten fallen diese Elemente aus und können nicht mehr aufgenommen werden, obwohl sie im Substrat vorhanden sind. Die Auswahl geeigneter Chelattypen und eine stabile pH-Kontrolle sind daher wichtig.',
  'Zusätze':
    'Zusätze wie Chelate, Silikate oder organische Säuren beeinflussen die Nährstoffverfügbarkeit. Chelatoren (z. B. EDDHA) halten Spurenelemente in Lösung, während andere Zusätze die Aufnahme erleichtern oder Stress reduzieren. Unkenntnis über geeignete Zusätze führt leicht zu Mangelerscheinungen oder Ausfällungen.',
};

// Liste wissenschaftlicher Quellen, auf denen der Fragenkatalog basiert. Die
// Angaben werden am Ende des Tests unter „Quellenbasis“ aufgeführt.
const SOURCES_LIST = [
  {
    author: 'Oklahoma State University',
    title: 'Electrical Conductivity and pH Guide for Hydroponics',
    year: 2016,
    note:
      'Empfiehlt einen pH-Bereich von 5–6 und warnt vor hoher Alkalinität und osmotischem Stress.',
  },
  {
    author: 'MSU Extension',
    title: 'Calibrate your pH and EC meters for accurate nutrient management',
    year: 2023,
    note:
      'Betont die Wichtigkeit der Kalibrierung und erklärt die logarithmische pH-Skala.',
  },
  {
    author: 'e-GRO',
    title: 'Iron deficiency in hydroponic crops',
    year: 2022,
    note:
      'Erläutert, dass hohe pH-Werte (>6,5) die Eisenverfügbarkeit reduzieren und beschreibt Chelatoren wie EDDHA.',
  },
  {
    author: 'e-GRO',
    title: 'Cation nutrient antagonism: K, Ca and Mg',
    year: 2020,
    note:
      'Beschreibt, dass hohe Konzentrationen eines Kations die Aufnahme der anderen blockieren und ein Verhältnis von 3–5:1 empfiehlt.',
  },
  {
    author: 'Greenhouse Grower',
    title: 'Nitrogen source and pH dynamics in horticulture',
    year: 2021,
    note:
      'Erklärt, dass Ammoniumaufnahme den pH-Wert senkt und Nitrataufnahme den pH-Wert erhöht; Kationenaufnahme führt zu pH-Senkung, Anionenaufnahme zu pH-Anstieg.',
  },
];

// Profi-Modus via URL: ?pro=1
const PRO_MODE = new URLSearchParams(window.location.search).get('pro') === '1';
// Verwende neutrale Namen für die gespeicherten Sessions (grow statt hydro)
const SESSION_KEY = PRO_MODE ? 'growQuizSession_pro' : 'growQuizSession_base';

// Select the root element where pages are rendered
const appEl = document.getElementById('app');

// Global state for the current session
let state = {
  selectedModules: [],
  currentQuestions: [],
  currentIndex: 0,
  answers: [],
  startTime: null,
  finished: false,
};

// Helper: Persist current session to localStorage
function saveSession() {
  const sessionData = {
    selectedModules: state.selectedModules,
    currentQuestions: state.currentQuestions.map((q) => q.id),
    currentIndex: state.currentIndex,
    answers: state.answers,
    startTime: state.startTime,
    finished: state.finished,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
}

// Helper: Load session from localStorage, returning null if none
function loadSession() {
  const data = localStorage.getItem(SESSION_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
}

// Helper: Clear sessions from localStorage (both base and pro)
function clearSession() {
  localStorage.removeItem('growQuizSession_base');
  localStorage.removeItem('growQuizSession_pro');
}

// Get unique modules from questions
function getUniqueModules() {
  const set = new Set();
  questions
    .filter((q) => (PRO_MODE ? q.tier === 'pro' : q.tier !== 'pro'))
    .forEach((q) => set.add(q.module));
  return Array.from(set);
}

// Shuffle array using Fisher–Yates
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Render landing / module selection page
function renderLanding(resumableData = null) {
  appEl.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'container landing-screen';

  const title = document.createElement('h1');
  title.textContent = PRO_MODE ? 'Grow-Quiz – Profi-Modul' : 'Grow-Quiz – Kompetenztest';
  container.appendChild(title);

  const intro = document.createElement('p');
  const proCount = questions.filter((q) => q.tier === 'pro').length;
  intro.innerHTML = PRO_MODE
    ? `Profi-Modul (${proCount} Fragen): deutlich schwerer, hydro-spezifisch und mit Fokus auf Systemdenken, Diagnose und Entscheidungen unter Dynamik.`
    : 'Anonymer Kompetenztest zu Nährstoffmanagement und Wechselwirkungen.<br><br> Wähle die Module aus, die du bearbeiten möchtest, oder starte den vollständigen Test.'+
  'Mit deiner freiwilligen Teilnahme und dem senden der auswertung unterstützt du ein zukünftiges Community-Projekt.';
  container.appendChild(intro);

  const modules = getUniqueModules();

  // Profi-Modus: keine Modulauswahl nötig, sofort starten (oder fortsetzen)
  if (PRO_MODE) {
    state.selectedModules = modules;

    // Fortsetzen im Profi-Modus anbieten, falls vorhanden
    if (resumableData && !resumableData.finished) {
      const resumeBtn = document.createElement('button');
      resumeBtn.classList.add('btn-secondary');
      resumeBtn.textContent = 'Profi-Modul fortsetzen';
      resumeBtn.addEventListener('click', () => resumeSession(resumableData));
      container.appendChild(resumeBtn);

      const resetBtn = document.createElement('button');
      resetBtn.classList.add('btn-tertiary');
      resetBtn.textContent = 'Profi-Modul reset';
      resetBtn.style.marginLeft = '0.5rem';
      resetBtn.addEventListener('click', () => {
        localStorage.removeItem('growQuizSession_pro');
        renderLanding();
      });
      container.appendChild(resetBtn);

      const backBtn = document.createElement('button');
      backBtn.classList.add('btn-secondary');
      backBtn.textContent = 'Zurück zum Basis-Test';
      backBtn.style.marginLeft = '0.5rem';
      backBtn.addEventListener('click', () => {
        // Profi-Session behalten oder löschen? -> behalten
        window.location.search = '';
      });
      container.appendChild(backBtn);

      appEl.appendChild(container);
      return;
    }

    // Kein Profi-Fortsetzen vorhanden -> direkt starten
    const startBtn = document.createElement('button');
    startBtn.classList.add('btn-primary');
    startBtn.textContent = 'Profi-Modul starten';
    startBtn.addEventListener('click', () => startTest());
    container.appendChild(startBtn);

    const backBtn = document.createElement('button');
    backBtn.classList.add('btn-secondary');
    backBtn.textContent = 'Zurück zum Basis-Test';
    backBtn.style.marginLeft = '0.5rem';
    backBtn.addEventListener('click', () => {
      window.location.search = '';
    });
    container.appendChild(backBtn);

    appEl.appendChild(container);
    return;
  }

  // ===== Basis-Modus: Module selection list =====
  const list = document.createElement('ul');
  list.className = 'module-list';
  modules.forEach((mod) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `mod-${mod}`;
    checkbox.value = mod;
    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = mod;
    li.appendChild(checkbox);
    li.appendChild(label);
    list.appendChild(li);
  });
  container.appendChild(list);

  // Option to select all modules
  const selectAllDiv = document.createElement('div');
  const selectAllCheckbox = document.createElement('input');
  selectAllCheckbox.type = 'checkbox';
  selectAllCheckbox.id = 'select-all';
  const selectAllLabel = document.createElement('label');
  selectAllLabel.htmlFor = 'select-all';
  selectAllLabel.textContent = 'Alle Module auswählen';
  selectAllDiv.appendChild(selectAllCheckbox);
  selectAllDiv.appendChild(selectAllLabel);
  container.appendChild(selectAllDiv);

  // When select all toggled, set others accordingly
  selectAllCheckbox.addEventListener('change', () => {
    const checks = list.querySelectorAll('input[type="checkbox"]');
    checks.forEach((c) => {
      c.checked = selectAllCheckbox.checked;
    });
  });

  // Start button
  const startBtn = document.createElement('button');
  startBtn.classList.add('btn-primary');
  startBtn.textContent = 'Test starten';
  startBtn.addEventListener('click', () => {
    const selected = [];
    const checks = list.querySelectorAll('input[type="checkbox"]');
    checks.forEach((c) => {
      if (c.checked) selected.push(c.value);
    });
    // If no module selected, assume all
    state.selectedModules = selected.length > 0 ? selected : modules;
    startTest();
  });
  container.appendChild(startBtn);

  // If resumable data exists (session not finished), show resume button
  if (resumableData && !resumableData.finished) {
    const resumeBtn = document.createElement('button');
    resumeBtn.classList.add('btn-secondary');
    resumeBtn.textContent = 'Fortsetzen';
    resumeBtn.style.marginLeft = '0.5rem';
    resumeBtn.addEventListener('click', () => {
      resumeSession(resumableData);
    });
    container.appendChild(resumeBtn);

    const resetBtn = document.createElement('button');
    resetBtn.classList.add('btn-tertiary');
    resetBtn.textContent = 'Reset';
    resetBtn.style.marginLeft = '0.5rem';
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('growQuizSession_base');
      renderLanding();
    });
    container.appendChild(resetBtn);
  }

  appEl.appendChild(container);
}

// Start the test: choose questions, shuffle them, initialize state
function startTest() {
  // Filter questions by selected modules AND by mode (base/pro)
  state.currentQuestions = questions
    .filter((q) => state.selectedModules.includes(q.module))
    .filter((q) => (PRO_MODE ? q.tier === 'pro' : q.tier !== 'pro'));

  // Safety: If no questions match (e.g. pro questions missing), show message and go back
  if (state.currentQuestions.length === 0) {
    alert(PRO_MODE
      ? 'Keine Profi-Fragen gefunden. Bitte prüfe, ob die 5 Profi-Fragen in questions.js tier: "pro" gesetzt haben.'
      : 'Keine Fragen gefunden. Bitte prüfe deine Module/Fragen.');
    window.location.search = '';
    return;
  }

  // Shuffle questions for random order
  state.currentQuestions = shuffle(state.currentQuestions);
  state.currentIndex = 0;
  state.answers = [];
  state.finished = false;
  state.startTime = Date.now();
  saveSession();
  renderQuestion();
}

// Resume an existing session stored in localStorage
function resumeSession(data) {
  state.selectedModules = data.selectedModules;

  // reconstruct questions order by IDs
  state.currentQuestions = data.currentQuestions
    .map((id) => questions.find((q) => q.id === id))
    .filter(Boolean);

  state.currentIndex = data.currentIndex;
  state.answers = data.answers || [];
  state.startTime = data.startTime;
  state.finished = data.finished;

  // If questions list is empty (e.g. questions changed), restart cleanly
  if (!state.currentQuestions.length) {
    startTest();
    return;
  }

  renderQuestion();
}

// Render current question and collect user response
function renderQuestion() {
  // Safety check
  if (state.currentIndex >= state.currentQuestions.length) {
    if (PRO_MODE) finishTest();
    else renderDecision();
    return;
  }
  const q = state.currentQuestions[state.currentIndex];
  appEl.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'container question-screen';

  // Progress indicator
  const progressContainer = document.createElement('div');
  progressContainer.className = 'progress-container';
  const progressTrack = document.createElement('div');
  progressTrack.className = 'progress-track';
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  const displayIndex = state.currentIndex + 1;
  const percent = (displayIndex / state.currentQuestions.length) * 100;
  progressBar.style.width = `${percent}%`;
  progressTrack.appendChild(progressBar);
  progressContainer.appendChild(progressTrack);

  const progressText = document.createElement('p');
  progressText.className = 'progress-text';
  progressText.textContent = `Frage ${displayIndex} von ${state.currentQuestions.length} • ${Math.round(percent)} %`;
  progressContainer.appendChild(progressText);
  container.appendChild(progressContainer);

  // Question header
  const header = document.createElement('div');
  header.className = 'question-header';
  const h2 = document.createElement('h2');
  h2.textContent = `Frage ${state.currentIndex + 1} von ${state.currentQuestions.length}`;
  header.appendChild(h2);
  const moduleLabel = document.createElement('p');
  moduleLabel.textContent = `Modul: ${q.module}${PRO_MODE ? ' (Profi)' : ''}`;
  moduleLabel.style.fontStyle = 'italic';
  moduleLabel.style.marginBottom = '0.5rem';
  header.appendChild(moduleLabel);
  container.appendChild(header);

  // Question text
  const questionText = document.createElement('div');
  questionText.className = 'question-text';
  questionText.textContent = q.text;
  container.appendChild(questionText);

  // Options container
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'options-container';

  if (q.type === 'single' || q.type === 'scenario') {
    // radio buttons with "Weiß nicht" Option
    const ul = document.createElement('ul');
    ul.className = 'options';
    q.options.forEach((opt) => {
      const li = document.createElement('li');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'answer';
      input.value = opt.id;
      const label = document.createElement('label');
      label.textContent = opt.text;
      li.appendChild(input);
      li.appendChild(label);
      ul.appendChild(li);
    });
    // "Weiß nicht" as separate option for unknown
    const liDont = document.createElement('li');
    const inputDont = document.createElement('input');
    inputDont.type = 'radio';
    inputDont.name = 'answer';
    inputDont.value = 'dontknow';
    const labelDont = document.createElement('label');
    labelDont.textContent = 'Weiß nicht';
    liDont.appendChild(inputDont);
    liDont.appendChild(labelDont);
    ul.appendChild(liDont);
    // show confidence slider when any radio selected
    ul.addEventListener('change', () => {
      confidenceDiv.style.display = 'block';
    });
    optionsContainer.appendChild(ul);
  } else if (q.type === 'multi') {
    // checkboxes with "Weiß nicht" Option
    const ul = document.createElement('ul');
    ul.className = 'options';
    q.options.forEach((opt) => {
      const li = document.createElement('li');
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.name = 'answer';
      input.value = opt.id;
      const label = document.createElement('label');
      label.textContent = opt.text;
      li.appendChild(input);
      li.appendChild(label);
      ul.appendChild(li);
    });
    // "Weiß nicht" checkbox
    const liDont = document.createElement('li');
    const inputDont = document.createElement('input');
    inputDont.type = 'checkbox';
    inputDont.name = 'answer';
    inputDont.value = 'dontknow';
    const labelDont = document.createElement('label');
    labelDont.textContent = 'Weiß nicht';
    liDont.appendChild(inputDont);
    liDont.appendChild(labelDont);
    ul.appendChild(liDont);
    // handle mutual exclusivity: if "Weiß nicht" selected, uncheck others; if other selected, uncheck "Weiß nicht"
    ul.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.addEventListener('change', (e) => {
        const all = ul.querySelectorAll('input[type="checkbox"]');
        const dont = ul.querySelector('input[type="checkbox"][value="dontknow"]');
        if (e.target.value === 'dontknow' && e.target.checked) {
          all.forEach((c) => {
            if (c.value !== 'dontknow') c.checked = false;
          });
        } else if (e.target.checked) {
          if (dont) dont.checked = false;
        }
        confidenceDiv.style.display = 'block';
      });
    });
    optionsContainer.appendChild(ul);
  } else if (q.type === 'order') {
    // Draggable list for ordering with optional Up/Down controls
    const ul = document.createElement('ul');
    ul.className = 'sortable-list';
    q.options.forEach((opt) => {
      const li = document.createElement('li');
      // inner span for text
      const textSpan = document.createElement('span');
      textSpan.textContent = opt.text;
      textSpan.style.flexGrow = '1';
      li.appendChild(textSpan);
      li.dataset.id = opt.id;
      // Up/Down buttons
      const upBtn = document.createElement('button');
      upBtn.textContent = '▲';
      upBtn.className = 'order-btn';
      upBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const prev = li.previousElementSibling;
        if (prev) {
          ul.insertBefore(li, prev);
        }
        confidenceDiv.style.display = 'block';
      });
      const downBtn = document.createElement('button');
      downBtn.textContent = '▼';
      downBtn.className = 'order-btn';
      downBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const next = li.nextElementSibling;
        if (next) {
          ul.insertBefore(next, li);
        }
        confidenceDiv.style.display = 'block';
      });
      // container for controls
      const btnContainer = document.createElement('div');
      btnContainer.style.display = 'flex';
      btnContainer.style.flexDirection = 'column';
      btnContainer.style.marginLeft = '0.5rem';
      btnContainer.appendChild(upBtn);
      btnContainer.appendChild(downBtn);
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.appendChild(btnContainer);
      // drag ability only on large screens
      if (window.innerWidth > 600) {
        li.draggable = true;
      } else {
        li.draggable = false;
      }
      ul.appendChild(li);
    });
    // Drag and drop handlers (desktop)
    let draggedItem = null;
    ul.addEventListener('dragstart', (e) => {
      if (e.target && e.target.nodeName === 'LI') {
        draggedItem = e.target;
        e.target.classList.add('dragging');
      }
    });
    ul.addEventListener('dragend', () => {
      if (draggedItem) {
        draggedItem.classList.remove('dragging');
        draggedItem = null;
      }
      confidenceDiv.style.display = 'block';
    });
    ul.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(ul, e.clientY);
      const current = draggedItem;
      if (!current) return;
      if (afterElement == null) {
        ul.appendChild(current);
      } else {
        if (afterElement !== current) {
          ul.insertBefore(current, afterElement);
        }
      }
    });
    // show slider when clicking on list (touch devices)
    ul.addEventListener('click', () => {
      confidenceDiv.style.display = 'block';
    });
    optionsContainer.appendChild(ul);
  } else if (q.type === 'calc') {
    const input = document.createElement('input');
    input.type = 'number';
    input.step = 'any';
    input.placeholder = 'Zahl eingeben';
    // show slider when user enters a number
    input.addEventListener('input', () => {
      if (input.value !== '') {
        confidenceDiv.style.display = 'block';
      }
    });
    optionsContainer.appendChild(input);
  }

  container.appendChild(optionsContainer);

  // Confidence rating slider (initially ausgeblendet, wird nach Auswahl sichtbar)
  const confidenceDiv = document.createElement('div');
  confidenceDiv.className = 'confidence-panel';
  confidenceDiv.style.marginTop = '1rem';
  confidenceDiv.style.display = 'none';
  const confLabel = document.createElement('label');
  confLabel.textContent = 'Wie sicher bist du dir? (1 = unsicher, 5 = sehr sicher)';
  confLabel.style.display = 'block';
  const confInput = document.createElement('input');
  confInput.type = 'range';
  confInput.min = '1';
  confInput.max = '5';
  confInput.value = '3';
  confInput.step = '1';
  confInput.style.width = '100%';
  const confValueSpan = document.createElement('span');
  confValueSpan.style.marginLeft = '0.5rem';
  confValueSpan.textContent = confInput.value;
  confInput.addEventListener('input', () => {
    confValueSpan.textContent = confInput.value;
  });
  confidenceDiv.appendChild(confLabel);
  confidenceDiv.appendChild(confInput);
  confidenceDiv.appendChild(confValueSpan);
  container.appendChild(confidenceDiv);

  // Submit button
  const submitBtn = document.createElement('button');
  submitBtn.classList.add('btn-primary');
  submitBtn.textContent = 'Antwort absenden';
  submitBtn.addEventListener('click', () => {
    // Retrieve selected answer(s) depending on type
    let userAnswer;
    let dontKnow = false;

    if (q.type === 'single' || q.type === 'scenario') {
      const checked = optionsContainer.querySelector('input[type="radio"]:checked');
      if (!checked) {
        alert('Bitte wähle eine Antwort aus.');
        return;
      }
      userAnswer = checked.value;
      if (userAnswer === 'dontknow') {
        dontKnow = true;
      }
    } else if (q.type === 'multi') {
      const checked = optionsContainer.querySelectorAll('input[type="checkbox"]:checked');
      if (checked.length === 0) {
        alert('Bitte wähle mindestens eine Antwort.');
        return;
      }
      const values = Array.from(checked).map((c) => c.value);
      // Wenn "Weiß nicht" ausgewählt ist, behandeln wir es als Unwissen und ignorieren andere
      if (values.includes('dontknow')) {
        dontKnow = true;
        userAnswer = 'dontknow';
      } else {
        userAnswer = values;
      }
    } else if (q.type === 'order') {
      const lis = optionsContainer.querySelectorAll('li');
      userAnswer = Array.from(lis).map((li) => li.dataset.id);
      if (userAnswer.length !== q.options.length) {
        alert('Bitte ordne alle Elemente.');
        return;
      }
    } else if (q.type === 'calc') {
      const input = optionsContainer.querySelector('input');
      const value = parseFloat(input.value);
      if (isNaN(value)) {
        alert('Bitte gib eine Zahl ein.');
        return;
      }
      userAnswer = value;
    }

    // Confidence rating
    const confidence = parseInt(confInput.value, 10);

    // Time spent on this question (in seconds)
    const now = Date.now();
    const timeSpent = (now - state.startTime) / 1000; // seconds

    // Compute score and correctness
    let scoreEarned = 0;
    let correct = false;
    if (q.type === 'single' || q.type === 'scenario') {
      if (!dontKnow) {
        correct = userAnswer === q.answer;
        scoreEarned = correct ? 1 : 0;
      }
    } else if (q.type === 'multi') {
      if (!dontKnow) {
        const correctSet = new Set(q.answer);
        const userSet = new Set(userAnswer);
        const correctCount = correctSet.size;
        const totalOptions = q.options.length;
        let tp = 0;
        userSet.forEach((id) => {
          if (correctSet.has(id)) tp++;
        });
        let fp = 0;
        userSet.forEach((id) => {
          if (!correctSet.has(id)) fp++;
        });
        const wrongOptionsCount = totalOptions - correctCount;
        // Teilpunkte: Anteil richtig minus Anteil falscher; nie negativ
        const partial = (tp / correctCount) - (fp / wrongOptionsCount);
        scoreEarned = Math.max(0, Math.min(1, partial));
        correct = scoreEarned === 1;
      }
    } else if (q.type === 'order') {
      const correctOrder = q.answer;
      correct =
        correctOrder.length === userAnswer.length &&
        correctOrder.every((id, idx) => id === userAnswer[idx]);
      scoreEarned = correct ? 1 : 0;
    } else if (q.type === 'calc') {
      const tol = q.answer.tolerance;
      const correctValue = q.answer.value;
      correct = Math.abs(userAnswer - correctValue) <= tol;
      scoreEarned = correct ? 1 : 0;
    }

    // Determine error categories if incorrect and not "Weiß nicht"
    const errorCategories = (!correct && !dontKnow) ? (q.categories || []) : [];

    // Determine risk behaviour if defined (only for answered options)
    let risk = null;
    if (q.riskProfile && !dontKnow) {
      if (q.type === 'single' || q.type === 'scenario') {
        risk = q.riskProfile[userAnswer] || null;
      } else if (q.type === 'multi' && Array.isArray(userAnswer)) {
        risk = userAnswer.map((ans) => q.riskProfile[ans] || null);
      }
    }

    // Record answer with additional metadata
    state.answers.push({
      questionId: q.id,
      module: q.module,
      type: q.type,
      selected: userAnswer,
      correct,
      dontKnow,
      scoreEarned,
      confidence,
      timeSpent,
      categories: errorCategories,
      difficulty: q.difficulty,
      risk,
      tier: q.tier || 'base',
    });

    // Move to next question
    state.currentIndex++;
    state.startTime = now;
    saveSession();

    if (state.currentIndex < state.currentQuestions.length) {
      renderQuestion();
    } else {
      if (PRO_MODE) finishTest();
      else renderDecision();
    }
  });

  container.appendChild(submitBtn);
  appEl.appendChild(container);
}

function renderDecision() {
  appEl.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'container decision-screen';

  const title = document.createElement('h2');
  title.className = 'decision-title';
  title.textContent = 'Wie möchtest du fortfahren?';
  container.appendChild(title);

  const text = document.createElement('p');
  text.className = 'decision-subtext';
  text.textContent = 'Das Hydro / Profi-Modul ist optional, deutlich anspruchsvoller und stärker hydro-spezifisch. Deine Teilnahme hilft, die Auswertung und Fragenqualität weiterzuentwickeln.';
  container.appendChild(text);

  const primaryAction = document.createElement('div');
  primaryAction.className = 'decision-primary-action';

  const proBtn = document.createElement('button');
  proBtn.classList.add('btn-primary');
  proBtn.textContent = 'Hydro / Profi-Modul starten';
  proBtn.addEventListener('click', () => {
    window.location.search = '?pro=1';
  });
  primaryAction.appendChild(proBtn);
  container.appendChild(primaryAction);

  const actions = document.createElement('div');
  actions.className = 'button-row decision-secondary-actions';

  const evalBtn = document.createElement('button');
  evalBtn.classList.add('btn-secondary');
  evalBtn.textContent = 'Zur Auswertung';
  evalBtn.addEventListener('click', () => {
    finishTest();
  });
  actions.appendChild(evalBtn);

  const skipBtn = document.createElement('button');
  skipBtn.classList.add('btn-tertiary');
  skipBtn.textContent = 'Überspringen';
  skipBtn.addEventListener('click', () => {
    finishTest();
  });
  actions.appendChild(skipBtn);

  container.appendChild(actions);
  appEl.appendChild(container);
}

// Helper for drag and drop ordering: find element after which to insert
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY, element: null }
  ).element;
}

// Finish test: compute results and render summary
function finishTest() {
  state.finished = true;
  saveSession();

  appEl.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'container results-screen';

  const h2 = document.createElement('h2');
  h2.textContent = PRO_MODE ? 'Ergebnisse (Profi-Modul)' : 'Ergebnisse';
  container.appendChild(h2);

  const totalQuestions = state.currentQuestions.length;
  // Gesamte Punktzahl (Teilpunkte) summieren
  const totalScorePoints = state.answers.reduce((sum, a) => sum + a.scoreEarned, 0);
  const scorePercent = totalQuestions > 0 ? Math.round((totalScorePoints / totalQuestions) * 100) : 0;
  // Zählungen nach Typ
  const fullCorrectCount = state.answers.filter((a) => a.scoreEarned === 1 && !a.dontKnow).length;
  const partialCount = state.answers.filter((a) => a.scoreEarned > 0 && a.scoreEarned < 1).length;
  const dontKnowCount = state.answers.filter((a) => a.dontKnow).length;
  const wrongCount = state.answers.filter((a) => !a.dontKnow && a.scoreEarned === 0).length;

  // Neutrale Kompetenzstufen
  let competence;
  if (scorePercent < 25) competence = 'Stufe 1';
  else if (scorePercent < 50) competence = 'Stufe 2';
  else if (scorePercent < 75) competence = 'Stufe 3';
  else competence = 'Stufe 4';

  const scoreHero = document.createElement('div');
  scoreHero.className = 'score-hero';
  const scorePercentEl = document.createElement('div');
  scorePercentEl.className = 'score-percent';
  scorePercentEl.textContent = `${scorePercent}%`;
  const scorePointsEl = document.createElement('div');
  scorePointsEl.className = 'score-points';
  scorePointsEl.textContent = `${totalScorePoints.toFixed(2)} / ${totalQuestions} Punkte`;
  scoreHero.appendChild(scorePercentEl);
  scoreHero.appendChild(scorePointsEl);
  container.appendChild(scoreHero);

  // Text summary mit Teilpunkten und Counts
  const summaryP = document.createElement('p');
  summaryP.innerHTML = `Du hast insgesamt <strong>${totalScorePoints.toFixed(2)}</strong> von <strong>${totalQuestions}</strong> möglichen Punkten erzielt (Gesamtscore: <strong>${scorePercent}%</strong>). Vollständig richtig: <strong>${fullCorrectCount}</strong>, Teilwissen: <strong>${partialCount}</strong>, falsch: <strong>${wrongCount}</strong>, "Weiß nicht": <strong>${dontKnowCount}</strong>. Kompetenzstufe: <strong>${competence}</strong>.`;
  container.appendChild(summaryP);

  // Modul-Statistiken nach Teilpunkten
  const modules = getUniqueModules();
  const subscores = {};
  modules.forEach((mod) => {
    const modQuestions = state.currentQuestions.filter((q) => q.module === mod);
    if (modQuestions.length === 0) return;
    const modAns = state.answers.filter((a) => a.module === mod);
    const modScore = modAns.reduce((sum, a) => sum + a.scoreEarned, 0);
    const modPercent = Math.round((modScore / modQuestions.length) * 100);
    const modFull = modAns.filter((a) => a.scoreEarned === 1 && !a.dontKnow).length;
    const modPartial = modAns.filter((a) => a.scoreEarned > 0 && a.scoreEarned < 1).length;
    const modWrong = modAns.filter((a) => !a.dontKnow && a.scoreEarned === 0).length;
    const modUnknown = modAns.filter((a) => a.dontKnow).length;
    subscores[mod] = {
      score: modScore,
      total: modQuestions.length,
      percent: modPercent,
      full: modFull,
      partial: modPartial,
      wrong: modWrong,
      unknown: modUnknown,
    };
  });

  const subTable = document.createElement('table');
  subTable.className = 'results-table';
  let tr = document.createElement('tr');
  ['Modul', 'Punkte', 'Fragen', 'Prozent', 'Richtig', 'Teilwissen', 'Falsch', 'Weiß nicht'].forEach((h) => {
    const th = document.createElement('th');
    th.textContent = h;
    tr.appendChild(th);
  });
  subTable.appendChild(tr);
  Object.entries(subscores).forEach(([mod, data]) => {
    tr = document.createElement('tr');
    const tdName = document.createElement('td');
    tdName.textContent = mod;
    const tdScore = document.createElement('td');
    tdScore.textContent = data.score.toFixed(2);
    const tdTotal = document.createElement('td');
    tdTotal.textContent = data.total;
    const tdPercent = document.createElement('td');
    tdPercent.textContent = data.percent + '%';
    const tdFull = document.createElement('td');
    tdFull.textContent = data.full;
    const tdPart = document.createElement('td');
    tdPart.textContent = data.partial;
    const tdWrong = document.createElement('td');
    tdWrong.textContent = data.wrong;
    const tdUnknown = document.createElement('td');
    tdUnknown.textContent = data.unknown;
    tr.appendChild(tdName);
    tr.appendChild(tdScore);
    tr.appendChild(tdTotal);
    tr.appendChild(tdPercent);
    tr.appendChild(tdFull);
    tr.appendChild(tdPart);
    tr.appendChild(tdWrong);
    tr.appendChild(tdUnknown);
    subTable.appendChild(tr);
  });
  container.appendChild(subTable);

  // Kategorienstatistik: berechnet pro Kategorie Gesamtanzahl, Punkte, richtig/teilweise/falsch/weiß nicht und Durchschnittsvertrauen
  const categoryStats = {};
  state.answers.forEach((ans) => {
    // Finde Kategorien des jeweiligen Frageobjekts
    const q = state.currentQuestions.find((qu) => qu.id === ans.questionId);
    const cats = (q && q.categories) || [];
    cats.forEach((cat) => {
      if (!categoryStats[cat]) {
        categoryStats[cat] = {
          total: 0,
          scoreSum: 0,
          correct: 0,
          partial: 0,
          wrong: 0,
          dontKnow: 0,
          confidenceSum: 0,
        };
      }
      const c = categoryStats[cat];
      c.total++;
      c.scoreSum += ans.scoreEarned;
      c.confidenceSum += ans.confidence;
      if (ans.dontKnow) c.dontKnow++;
      else if (ans.scoreEarned === 1) c.correct++;
      else if (ans.scoreEarned > 0) c.partial++;
      else c.wrong++;
    });
  });

  if (Object.keys(categoryStats).length > 0) {
    const catTitle = document.createElement('h3');
    catTitle.textContent = 'Kategorienübersicht';
    container.appendChild(catTitle);
    const catTable = document.createElement('table');
    catTable.className = 'results-table';
    let trc = document.createElement('tr');
    ['Kategorie', 'Punkte%', 'Richtig', 'Teilwissen', 'Falsch', 'Weiß nicht', '∅ Vertrauen'].forEach((h) => {
      const th = document.createElement('th');
      th.textContent = h;
      trc.appendChild(th);
    });
    catTable.appendChild(trc);
    Object.entries(categoryStats).forEach(([cat, data]) => {
      const trRow = document.createElement('tr');
      const tdCat = document.createElement('td');
      tdCat.textContent = cat;
      const tdPercent = document.createElement('td');
      const percentVal = data.total > 0 ? Math.round((data.scoreSum / data.total) * 100) : 0;
      tdPercent.textContent = percentVal + '%';
      const tdC = document.createElement('td'); tdC.textContent = data.correct;
      const tdP = document.createElement('td'); tdP.textContent = data.partial;
      const tdW = document.createElement('td'); tdW.textContent = data.wrong;
      const tdU = document.createElement('td'); tdU.textContent = data.dontKnow;
      const tdConf = document.createElement('td');
      const avgConf = data.total > 0 ? (data.confidenceSum / data.total).toFixed(2) : '–';
      tdConf.textContent = avgConf;
      trRow.appendChild(tdCat);
      trRow.appendChild(tdPercent);
      trRow.appendChild(tdC);
      trRow.appendChild(tdP);
      trRow.appendChild(tdW);
      trRow.appendChild(tdU);
      trRow.appendChild(tdConf);
      catTable.appendChild(trRow);
    });
    container.appendChild(catTable);

    const categoryCardGrid = document.createElement('div');
    categoryCardGrid.className = 'category-card-grid';
    Object.entries(categoryStats).forEach(([cat, data]) => {
      const card = document.createElement('div');
      card.className = 'category-card';
      const catName = document.createElement('h4');
      catName.textContent = cat;
      const catPercent = document.createElement('p');
      const catScore = data.total > 0 ? Math.round((data.scoreSum / data.total) * 100) : 0;
      catPercent.textContent = `Leistung: ${catScore}%`;
      card.appendChild(catName);
      card.appendChild(catPercent);
      categoryCardGrid.appendChild(card);
    });
    container.appendChild(categoryCardGrid);
  }

  // Persönliches Feedback auf Basis der Modul- und Kategorienleistung
  const feedbackTitle = document.createElement('h3');
  feedbackTitle.textContent = 'Persönliches Feedback';
  container.appendChild(feedbackTitle);

  const feedbackList = document.createElement('ul');
  // Bestes und schwächstes Modul anhand Prozentwert
  let bestMod = null;
  let worstMod = null;
  Object.entries(subscores).forEach(([mod, data]) => {
    if (!bestMod || data.percent > subscores[bestMod].percent) bestMod = mod;
    if (!worstMod || data.percent < subscores[worstMod].percent) worstMod = mod;
  });
  if (bestMod) {
    const li = document.createElement('li');
    li.textContent = `Starkes Modul: ${bestMod} (${subscores[bestMod].percent} % Punkteausbeute).`;
    feedbackList.appendChild(li);
  }
  if (worstMod) {
    const li = document.createElement('li');
    li.textContent = `Schwächstes Modul: ${worstMod} (${subscores[worstMod].percent} % Punkteausbeute). Schau dir die Fragen in diesem Bereich nochmals an.`;
    feedbackList.appendChild(li);
  }
  // Kategorie mit niedrigstem Score
  let weakestCat = null;
  Object.entries(categoryStats).forEach(([cat, data]) => {
    const percentVal = data.total > 0 ? (data.scoreSum / data.total) : 0;
    if (weakestCat === null || percentVal < (categoryStats[weakestCat].scoreSum / categoryStats[weakestCat].total)) {
      weakestCat = cat;
    }
  });
  if (weakestCat) {
    const perc = categoryStats[weakestCat].total > 0 ? Math.round((categoryStats[weakestCat].scoreSum / categoryStats[weakestCat].total) * 100) : 0;
    const li = document.createElement('li');
    li.textContent = `Größte Herausforderung: ${weakestCat} (${perc} % Punkte). Lies die Interpretation unten für mehr Hintergrund.`;
    feedbackList.appendChild(li);
  }
  container.appendChild(feedbackList);

  // Time stats
  const totalTime = state.answers.reduce((sum, a) => sum + a.timeSpent, 0);
  const timeTitle = document.createElement('h3');
  timeTitle.textContent = 'Zeitstatistik';
  container.appendChild(timeTitle);

  const timeList = document.createElement('ul');
  modules.forEach((mod) => {
    const modTime = state.answers
      .filter((a) => a.module === mod)
      .reduce((sum, a) => sum + a.timeSpent, 0);
    if (modTime > 0) {
      const li = document.createElement('li');
      li.textContent = `${mod}: ${modTime.toFixed(1)} s`;
      timeList.appendChild(li);
    }
  });
  const liTotal = document.createElement('li');
  liTotal.textContent = `Gesamte Zeit: ${totalTime.toFixed(1)} s`;
  timeList.appendChild(liTotal);
  container.appendChild(timeList);

  // Fortgeschrittene Analyse: Durchschnittliche Schwierigkeit und Vertrauen pro Antworttyp
  const analysisTitle = document.createElement('h3');
  analysisTitle.textContent = 'Analyse';
  container.appendChild(analysisTitle);
  const analysisList = document.createElement('ul');
  // Durchschnittlicher Schwierigkeitsgrad für vollständig richtige und alle anderen Antworten
  const correctDifficulty = state.answers
    .filter((a) => a.scoreEarned === 1 && !a.dontKnow)
    .reduce((sum, a) => sum + a.difficulty, 0);
  const incorrectDifficulty = state.answers
    .filter((a) => a.scoreEarned === 0 && !a.dontKnow)
    .reduce((sum, a) => sum + a.difficulty, 0);
  const numCorrectFull = state.answers.filter((a) => a.scoreEarned === 1 && !a.dontKnow).length;
  const numWrong = state.answers.filter((a) => a.scoreEarned === 0 && !a.dontKnow).length;
  const avgCorrectDiff = numCorrectFull > 0 ? (correctDifficulty / numCorrectFull).toFixed(2) : '–';
  const avgWrongDiff = numWrong > 0 ? (incorrectDifficulty / numWrong).toFixed(2) : '–';
  const liDiff = document.createElement('li');
  liDiff.textContent = `Durchschnittlicher Schwierigkeitsgrad – vollständig richtig: ${avgCorrectDiff}, falsch: ${avgWrongDiff}`;
  analysisList.appendChild(liDiff);
  // Vertrauensmetriken
  const confStats = { full: { sum: 0, count: 0 }, partial: { sum: 0, count: 0 }, wrong: { sum: 0, count: 0 }, unknown: { sum: 0, count: 0 } };
  state.answers.forEach((ans) => {
    if (ans.dontKnow) {
      confStats.unknown.sum += ans.confidence;
      confStats.unknown.count++;
    } else if (ans.scoreEarned === 1) {
      confStats.full.sum += ans.confidence;
      confStats.full.count++;
    } else if (ans.scoreEarned > 0) {
      confStats.partial.sum += ans.confidence;
      confStats.partial.count++;
    } else {
      confStats.wrong.sum += ans.confidence;
      confStats.wrong.count++;
    }
  });
  const liConf = document.createElement('li');
  const avgFull = confStats.full.count ? (confStats.full.sum / confStats.full.count).toFixed(2) : '–';
  const avgPart = confStats.partial.count ? (confStats.partial.sum / confStats.partial.count).toFixed(2) : '–';
  const avgWrong = confStats.wrong.count ? (confStats.wrong.sum / confStats.wrong.count).toFixed(2) : '–';
  const avgUnknown = confStats.unknown.count ? (confStats.unknown.sum / confStats.unknown.count).toFixed(2) : '–';
  liConf.textContent = `Durchschnittliches Vertrauen – vollständig richtig: ${avgFull}, Teilwissen: ${avgPart}, falsch: ${avgWrong}, Weiß nicht: ${avgUnknown}`;
  analysisList.appendChild(liConf);
  // Drop-off Rate (immer 0, da Test abgeschlossen)
  const liDrop = document.createElement('li');
  liDrop.textContent = 'Drop-off-Rate: Keine (Test komplett absolviert).';
  analysisList.appendChild(liDrop);
  container.appendChild(analysisList);

  // Fachliche Interpretation der Defizite
  if (Object.keys(categoryStats).length > 0) {
    const interpTitle = document.createElement('h3');
    interpTitle.textContent = 'Fachliche Interpretation der Defizite';
    container.appendChild(interpTitle);
    const interpList = document.createElement('ul');
    Object.keys(categoryStats).forEach((cat) => {
      const li = document.createElement('li');
      const text = CATEGORY_INTERPRETATIONS[cat] || 'Keine spezifische Interpretation verfügbar.';
      li.innerHTML = `<strong>${cat}:</strong> ${text}`;
      interpList.appendChild(li);
    });
    container.appendChild(interpList);
  }

  // Quellenbasis (wissenschaftliche Nachweise)
  const srcTitle = document.createElement('h3');
  srcTitle.textContent = 'Quellenbasis';
  container.appendChild(srcTitle);
  const srcList = document.createElement('ul');
  SOURCES_LIST.forEach((src) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${src.author}</strong> (${src.year}): <em>${src.title}</em>. ${src.note}`;
    srcList.appendChild(li);
  });
  container.appendChild(srcList);

  // Methodik & Datenschutz Hinweis
  const methodTitle = document.createElement('h3');
  methodTitle.textContent = 'Methodik & Datenschutz';
  container.appendChild(methodTitle);
  const methodP = document.createElement('p');
  methodP.innerHTML = 'Die Auswertung berücksichtigt Teilpunkte und das Selbstvertrauen, um dein Wissensprofil differenziert abzubilden. "Weiß nicht"‑Angaben werden separat erfasst. Alle Antworten bleiben lokal gespeichert, es sei denn, du entscheidest dich, die anonymisierten Daten zu senden. Es werden keine persönlichen Daten übertragen.';
  container.appendChild(methodP);

  // Hinweis zur Bedeutung der Rückmeldung
  const feedbackImportantTitle = document.createElement('h3');
  feedbackImportantTitle.textContent = 'Warum deine Rückmeldung wichtig ist';
  container.appendChild(feedbackImportantTitle);
  // Bulletpoints zur Erklärung der Vorteile des Sendens
  const importantList = document.createElement('ul');
  importantList.className = 'send-info-list';
  const importantItems = [
    'Fragenqualität zu verbessern',
    'typische Fehlkonzepte zu erkennen',
    'Schwierigkeitsgrade valide einzustufen',
    'das System wissenschaftlich weiterzuentwickeln'
  ];
  importantItems.forEach((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    importantList.appendChild(li);
  });
  container.appendChild(importantList);
  const noDataP = document.createElement('p');
  noDataP.textContent = 'Es werden keine personenbezogenen Daten übertragen.';
  container.appendChild(noDataP);

  // Data export buttons
  const exportTitle = document.createElement('h3');
  exportTitle.textContent = 'Datenexport';
  container.appendChild(exportTitle);

  const exportCSVBtn = document.createElement('button');
  exportCSVBtn.classList.add('btn-secondary');
  exportCSVBtn.textContent = 'CSV herunterladen';
  exportCSVBtn.addEventListener('click', () => {
    const { csvContent, filename } = buildCSV();
    downloadData(csvContent, filename, 'text/csv;charset=utf-8');
  });
  container.appendChild(exportCSVBtn);

  const exportJSONBtn = document.createElement('button');
  exportJSONBtn.classList.add('btn-secondary');
  exportJSONBtn.textContent = 'JSON herunterladen';
  exportJSONBtn.style.marginLeft = '0.5rem';
  exportJSONBtn.addEventListener('click', () => {
    const { jsonContent, filename } = buildJSON();
    downloadData(jsonContent, filename, 'application/json');
  });
  container.appendChild(exportJSONBtn);

  // ---- Anonyme Übermittlung an Google Sheets (Apps Script WebApp) ----
  const sendBtn = document.createElement('button');
  sendBtn.classList.add('btn-primary');
  // Button zum anonymen Übermitteln mit Hinweis auf die Weiterentwicklung
  sendBtn.textContent = 'Ergebnisse anonym senden (unterstützt Weiterentwicklung)';
  sendBtn.style.marginLeft = '0.5rem';

  sendBtn.addEventListener('click', async () => {
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sende...';

    // Berechne erweiterte Metriken für den Payload, ohne bestehende Felder zu verändern
    const totalScorePointsSend = state.answers.reduce((sum, a) => sum + a.scoreEarned, 0);
    const totalQuestionsSend = state.currentQuestions.length;
    const sendPercent = totalQuestionsSend > 0 ? Math.round((totalScorePointsSend / totalQuestionsSend) * 100) : 0;
    const sendCompetence = sendPercent < 25 ? 'Stufe 1' : sendPercent < 50 ? 'Stufe 2' : sendPercent < 75 ? 'Stufe 3' : 'Stufe 4';
    const sendFullCorrect = state.answers.filter((a) => a.scoreEarned === 1 && !a.dontKnow).length;
    const sendPartial = state.answers.filter((a) => a.scoreEarned > 0 && a.scoreEarned < 1).length;
    const sendWrong = state.answers.filter((a) => !a.dontKnow && a.scoreEarned === 0).length;
    const sendUnknown = state.answers.filter((a) => a.dontKnow).length;
    // kompaktes Category Summary (nur Prozentwerte)
    const sendCatSummary = {};
    Object.entries(categoryStats).forEach(([cat, data]) => {
      sendCatSummary[cat] = {
        percent: data.total > 0 ? Math.round((data.scoreSum / data.total) * 100) : 0,
        correct: data.correct,
        partial: data.partial,
        wrong: data.wrong,
        unknown: data.dontKnow,
      };
    });
    const extended = {
      totalScorePoints: totalScorePointsSend,
      scorePercent: sendPercent,
      competence: sendCompetence,
      counts: {
        fullCorrect: sendFullCorrect,
        partial: sendPartial,
        wrong: sendWrong,
        dontKnow: sendUnknown,
      },
      categories: sendCatSummary,
    };
    const payload = {
      timestamp: new Date().toISOString(),
      mode: PRO_MODE ? 'pro' : 'base',
      selectedModules: state.selectedModules,
      results: state.answers,
      scorePercent: sendPercent,
      extended: JSON.stringify(extended),
    };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbwMkx66jcixsdcUs0aFeB-r972Et23lzE-__r3YJWxb5jPiMYu_w6hoG5Ur8j-H-ck-qw/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      alert('Ergebnisse wurden anonym übermittelt. Danke!');
    } catch (err) {
      alert('Senden fehlgeschlagen. Bitte später erneut versuchen.');
      console.error(err);
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = 'Ergebnisse anonym senden (unterstützt Weiterentwicklung)';
    }
  });

  container.appendChild(sendBtn);

  // Profi-Modul Button / Zurück Button
  const hasProQuestions = questions.some((q) => q.tier === 'pro');

  if (!PRO_MODE && hasProQuestions) {
    const proBtn = document.createElement('button');
    proBtn.classList.add('btn-secondary');
    const proCount = questions.filter((q) => q.tier === 'pro').length;
    proBtn.textContent = `Profi-Modul starten (${proCount} Fragen)`;
    proBtn.style.marginLeft = '0.5rem';
    proBtn.addEventListener('click', () => {
      // Basis-Session behalten, aber Profi neu starten
      localStorage.removeItem('growQuizSession_pro');
      window.location.search = '?pro=1';
    });
    container.appendChild(proBtn);
  }

  if (PRO_MODE) {
    const backBtn = document.createElement('button');
    backBtn.classList.add('btn-secondary');
    backBtn.textContent = 'Zurück zum Basis-Test';
    backBtn.style.marginLeft = '0.5rem';
    backBtn.addEventListener('click', () => {
      window.location.search = '';
    });
    container.appendChild(backBtn);
  }

  // Anonymous feedback
  const feedbackTitle2 = document.createElement('h3');
  feedbackTitle2.textContent = 'Anonymes Feedback (optional)';
  container.appendChild(feedbackTitle2);

  const textarea = document.createElement('textarea');
  textarea.className = 'feedback-area';
  textarea.placeholder = 'Dein Feedback zum Test...';
  container.appendChild(textarea);

  // Button to restart test
  const restartBtn = document.createElement('button');
  restartBtn.classList.add('btn-tertiary');
  restartBtn.textContent = PRO_MODE ? 'Profi-Modul neu starten' : 'Neu starten';
  restartBtn.style.marginTop = '1rem';
  restartBtn.addEventListener('click', () => {
    if (PRO_MODE) localStorage.removeItem('growQuizSession_pro');
    else localStorage.removeItem('growQuizSession_base');
    renderLanding();
  });
  container.appendChild(restartBtn);

  appEl.appendChild(container);
}

// Build CSV export string
function buildCSV() {
  const header = [
    'questionId',
    'module',
    'tier',
    'type',
    'selected',
    'scoreEarned',
    'dontKnow',
    'correctAnswer',
    'correct',
    'confidence',
    'timeSpent_s',
    'difficulty',
    'categories',
    'risk',
  ];
  const rows = [header.join(',')];

  state.answers.forEach((ans) => {
    const q = questions.find((q) => q.id === ans.questionId);
    const correctAns = (() => {
      if (!q) return '';
      if (q.type === 'multi' || q.type === 'order') return JSON.stringify(q.answer);
      if (q.type === 'calc') return q.answer.value;
      return q.answer;
    })();

    rows.push([
      ans.questionId,
      ans.module,
      ans.tier || (q && q.tier) || 'base',
      ans.type,
      JSON.stringify(ans.selected),
      ans.scoreEarned.toFixed(2),
      ans.dontKnow,
      correctAns,
      ans.correct,
      ans.confidence,
      ans.timeSpent.toFixed(2),
      ans.difficulty,
      JSON.stringify(ans.categories),
      JSON.stringify(ans.risk),
    ].join(','));
  });

  const csvContent = rows.join('\n');
  const filename = PRO_MODE ? 'grow_quiz_results_pro.csv' : 'grow_quiz_results_base.csv';
  return { csvContent, filename };
}

// Build JSON export string
function buildJSON() {
  // JSON enthält zusätzlich Gesamtscore und Prozentwerte
  const totalQuestions = state.currentQuestions.length;
  const totalScorePoints = state.answers.reduce((sum, a) => sum + a.scoreEarned, 0);
  const scorePercent = totalQuestions > 0 ? Math.round((totalScorePoints / totalQuestions) * 100) : 0;
  const competence = scorePercent < 25 ? 'Stufe 1' : scorePercent < 50 ? 'Stufe 2' : scorePercent < 75 ? 'Stufe 3' : 'Stufe 4';
  const data = {
    timestamp: new Date().toISOString(),
    mode: PRO_MODE ? 'pro' : 'base',
    selectedModules: state.selectedModules,
    results: state.answers,
    totalScorePoints,
    scorePercent,
    competence,
  };
  const jsonContent = JSON.stringify(data, null, 2);
  const filename = PRO_MODE ? 'grow_quiz_results_pro.json' : 'grow_quiz_results_base.json';
  return { jsonContent, filename };
}

// Download data by creating a hidden link
function downloadData(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// On page load: check for existing session and render accordingly
window.addEventListener('DOMContentLoaded', () => {
  const saved = loadSession();
  if (saved && !saved.finished) {
    renderLanding(saved);
  } else {
    renderLanding();
  }
});
