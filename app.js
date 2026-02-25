/*
 * Grow-Quiz Application (Basis + Profi-Modul)
 *
 * - Basis: normale Module (alle Fragen ohne tier:'pro')
 * - Profi: 5 Profi-Fragen (nur Fragen mit tier:'pro') über Button am Ende
 * - Profi-Modus wird über URL-Parameter gesteuert: ?pro=1
 * - Fortschritt wird über localStorage gespeichert (pro/basis getrennt)
 */

import { questions } from './questions.js';

// Profi-Modus via URL: ?pro=1
const PRO_MODE = new URLSearchParams(window.location.search).get('pro') === '1';
const SESSION_KEY = PRO_MODE ? 'hydroQuizSession_pro' : 'hydroQuizSession_base';

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
  localStorage.removeItem('hydroQuizSession_base');
  localStorage.removeItem('hydroQuizSession_pro');
}

// Get unique modules from questions
function getUniqueModules() {
  const set = new Set();
  questions.forEach((q) => set.add(q.module));
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
  container.className = 'container';

  const title = document.createElement('h1');
  title.textContent = PRO_MODE ? 'Grow-Quiz – Profi-Modul' : 'Grow-Quiz – Kompetenztest';
  container.appendChild(title);

  const intro = document.createElement('p');
  intro.innerHTML = PRO_MODE
    ? 'Profi-Modul (5 Fragen): deutlich schwerer, Fokus auf Systemdenken, Antagonismen, Praxislogik und Entscheidungen.'
    : 'Dieser Test bewertet dein Grundwissen über Nährstoffmanagement und Wechselwirkungen. Wähle die Module aus, die du bearbeiten möchtest, oder starte den vollständigen Test.';
  container.appendChild(intro);

  const modules = getUniqueModules();

  // Profi-Modus: keine Modulauswahl nötig, sofort starten (oder fortsetzen)
  if (PRO_MODE) {
    state.selectedModules = modules;

    // Fortsetzen im Profi-Modus anbieten, falls vorhanden
    if (resumableData && !resumableData.finished) {
      const resumeBtn = document.createElement('button');
      resumeBtn.textContent = 'Profi-Modul fortsetzen';
      resumeBtn.addEventListener('click', () => resumeSession(resumableData));
      container.appendChild(resumeBtn);

      const resetBtn = document.createElement('button');
      resetBtn.textContent = 'Profi-Modul reset';
      resetBtn.style.marginLeft = '0.5rem';
      resetBtn.addEventListener('click', () => {
        localStorage.removeItem('hydroQuizSession_pro');
        renderLanding();
      });
      container.appendChild(resetBtn);

      const backBtn = document.createElement('button');
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
    startBtn.textContent = 'Profi-Modul starten';
    startBtn.addEventListener('click', () => startTest());
    container.appendChild(startBtn);

    const backBtn = document.createElement('button');
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
    resumeBtn.textContent = 'Fortsetzen';
    resumeBtn.style.marginLeft = '0.5rem';
    resumeBtn.addEventListener('click', () => {
      resumeSession(resumableData);
    });
    container.appendChild(resumeBtn);

    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset';
    resetBtn.style.marginLeft = '0.5rem';
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('hydroQuizSession_base');
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
    finishTest();
    return;
  }
  const q = state.currentQuestions[state.currentIndex];
  appEl.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'container';

  // Progress indicator
  const progressContainer = document.createElement('div');
  progressContainer.className = 'progress-container';
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  const percent = (state.currentIndex / state.currentQuestions.length) * 100;
  progressBar.style.width = `${percent}%`;
  progressContainer.appendChild(progressBar);
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

  if (q.type === 'single' || q.type === 'scenario') {
    // radio buttons
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
      label.htmlFor = input.id;
      li.appendChild(input);
      li.appendChild(label);
      ul.appendChild(li);
    });
    optionsContainer.appendChild(ul);
  } else if (q.type === 'multi') {
    // checkboxes
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
      label.htmlFor = input.id;
      li.appendChild(input);
      li.appendChild(label);
      ul.appendChild(li);
    });
    optionsContainer.appendChild(ul);
  } else if (q.type === 'order') {
    // Draggable list for ordering
    const ul = document.createElement('ul');
    ul.className = 'sortable-list';
    q.options.forEach((opt) => {
      const li = document.createElement('li');
      li.textContent = opt.text;
      li.dataset.id = opt.id;
      li.draggable = true;
      ul.appendChild(li);
    });

    // Drag and drop handlers
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

    optionsContainer.appendChild(ul);
  } else if (q.type === 'calc') {
    const input = document.createElement('input');
    input.type = 'number';
    input.step = 'any';
    input.placeholder = 'Zahl eingeben';
    optionsContainer.appendChild(input);
  }

  container.appendChild(optionsContainer);

  // Confidence rating slider
  const confidenceDiv = document.createElement('div');
  confidenceDiv.style.marginTop = '1rem';
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
  submitBtn.textContent = 'Antwort absenden';
  submitBtn.addEventListener('click', () => {
    // Retrieve selected answer(s) depending on type
    let userAnswer;

    if (q.type === 'single' || q.type === 'scenario') {
      const checked = optionsContainer.querySelector('input[type="radio"]:checked');
      if (!checked) {
        alert('Bitte wähle eine Antwort aus.');
        return;
      }
      userAnswer = checked.value;
    } else if (q.type === 'multi') {
      const checked = optionsContainer.querySelectorAll('input[type="checkbox"]:checked');
      if (checked.length === 0) {
        alert('Bitte wähle mindestens eine Antwort.');
        return;
      }
      userAnswer = Array.from(checked).map((c) => c.value);
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

    // Determine correctness
    let correct = false;
    if (q.type === 'single' || q.type === 'scenario') {
      correct = userAnswer === q.answer;
    } else if (q.type === 'multi') {
      const ansSet = new Set(q.answer);
      const userSet = new Set(userAnswer);
      if (ansSet.size === userSet.size) {
        correct = Array.from(ansSet).every((id) => userSet.has(id));
      }
    } else if (q.type === 'order') {
      const correctOrder = q.answer;
      correct =
        correctOrder.length === userAnswer.length &&
        correctOrder.every((id, idx) => id === userAnswer[idx]);
    } else if (q.type === 'calc') {
      const tol = q.answer.tolerance;
      const correctValue = q.answer.value;
      correct = Math.abs(userAnswer - correctValue) <= tol;
    }

    // Determine error categories if incorrect
    const errorCategories = correct ? [] : (q.categories || []);

    // Determine risk behaviour if defined
    let risk = null;
    if (q.riskProfile) {
      if (q.type === 'single' || q.type === 'scenario') {
        risk = q.riskProfile[userAnswer] || null;
      } else if (q.type === 'multi') {
        risk = userAnswer.map((ans) => q.riskProfile[ans] || null);
      }
    }

    // Record answer
    state.answers.push({
      questionId: q.id,
      module: q.module,
      type: q.type,
      selected: userAnswer,
      correct,
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
      finishTest();
    }
  });

  container.appendChild(submitBtn);
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
  container.className = 'container';

  const h2 = document.createElement('h2');
  h2.textContent = PRO_MODE ? 'Ergebnisse (Profi-Modul)' : 'Ergebnisse';
  container.appendChild(h2);

  const totalQuestions = state.currentQuestions.length;
  const correctCount = state.answers.filter((a) => a.correct).length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  // Competence levels
  let competence;
  if (scorePercent < 40) competence = 'Beginner';
  else if (scorePercent < 60) competence = 'Fortgeschritten';
  else if (scorePercent < 80) competence = 'Profi';
  else competence = 'Experte';

  // Text summary
  const summaryP = document.createElement('p');
  summaryP.innerHTML = `Du hast <strong>${correctCount}</strong> von <strong>${totalQuestions}</strong> Fragen korrekt beantwortet. Gesamtscore: <strong>${scorePercent}%</strong>. Kompetenzlevel: <strong>${competence}</strong>.`;
  container.appendChild(summaryP);

  // Module subscores
  const modules = getUniqueModules();
  const subscores = {};
  modules.forEach((mod) => {
    const modQuestions = state.currentQuestions.filter((q) => q.module === mod);
    if (modQuestions.length === 0) return;
    const modAns = state.answers.filter((a) => a.module === mod);
    const modCorrect = modAns.filter((a) => a.correct).length;
    const modPercent = Math.round((modCorrect / modQuestions.length) * 100);
    subscores[mod] = { correct: modCorrect, total: modQuestions.length, percent: modPercent };
  });

  const subTable = document.createElement('table');
  subTable.className = 'results-table';
  let tr = document.createElement('tr');
  ['Modul', 'Richtig', 'Fragen', 'Prozent'].forEach((h) => {
    const th = document.createElement('th');
    th.textContent = h;
    tr.appendChild(th);
  });
  subTable.appendChild(tr);

  Object.entries(subscores).forEach(([mod, data]) => {
    tr = document.createElement('tr');
    const tdName = document.createElement('td');
    tdName.textContent = mod;
    const tdCorrect = document.createElement('td');
    tdCorrect.textContent = data.correct;
    const tdTotal = document.createElement('td');
    tdTotal.textContent = data.total;
    const tdPercent = document.createElement('td');
    tdPercent.textContent = data.percent + '%';
    tr.appendChild(tdName);
    tr.appendChild(tdCorrect);
    tr.appendChild(tdTotal);
    tr.appendChild(tdPercent);
    subTable.appendChild(tr);
  });
  container.appendChild(subTable);

  // Error categorisation
  const errorCounts = {};
  state.answers.forEach((ans) => {
    ans.categories.forEach((cat) => {
      if (!errorCounts[cat]) errorCounts[cat] = 0;
      errorCounts[cat]++;
    });
  });

  if (Object.keys(errorCounts).length > 0) {
    const errorTitle = document.createElement('h3');
    errorTitle.textContent = 'Fehlerkategorien';
    container.appendChild(errorTitle);
    const ul = document.createElement('ul');
    Object.entries(errorCounts).forEach(([cat, count]) => {
      const li = document.createElement('li');
      li.textContent = `${cat}: ${count}`;
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  // Personal feedback
  const feedbackTitle = document.createElement('h3');
  feedbackTitle.textContent = 'Persönliches Feedback';
  container.appendChild(feedbackTitle);

  const feedbackList = document.createElement('ul');
  let bestMod = null;
  let worstMod = null;

  Object.entries(subscores).forEach(([mod, data]) => {
    if (!bestMod || data.percent > subscores[bestMod].percent) bestMod = mod;
    if (!worstMod || data.percent < subscores[worstMod].percent) worstMod = mod;
  });

  if (bestMod) {
    const li = document.createElement('li');
    li.textContent = `Starkes Modul: ${bestMod} (${subscores[bestMod].percent}% richtig).`;
    feedbackList.appendChild(li);
  }
  if (worstMod) {
    const li = document.createElement('li');
    li.textContent = `Schwächstes Modul: ${worstMod} (${subscores[worstMod].percent}% richtig). Studiere dieses Thema genauer.`;
    feedbackList.appendChild(li);
  }

  const sortedErrors = Object.entries(errorCounts).sort((a, b) => b[1] - a[1]);
  if (sortedErrors.length > 0) {
    const top = sortedErrors[0];
    const li = document.createElement('li');
    li.textContent = `Häufigster Fehler: ${top[0]} (${top[1]} mal). Überprüfe deine Kenntnisse in diesem Bereich.`;
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

  // Advanced analysis
  const analysisTitle = document.createElement('h3');
  analysisTitle.textContent = 'Analyse';
  container.appendChild(analysisTitle);

  const analysisList = document.createElement('ul');
  const correctDifficulty = state.answers
    .filter((a) => a.correct)
    .reduce((sum, a) => sum + a.difficulty, 0);
  const incorrectDifficulty = state.answers
    .filter((a) => !a.correct)
    .reduce((sum, a) => sum + a.difficulty, 0);
  const numCorrect = state.answers.filter((a) => a.correct).length;
  const numIncorrect = state.answers.filter((a) => !a.correct).length;
  const avgCorrectDiff = numCorrect > 0 ? (correctDifficulty / numCorrect).toFixed(2) : '–';
  const avgIncorrectDiff = numIncorrect > 0 ? (incorrectDifficulty / numIncorrect).toFixed(2) : '–';

  const liDiff = document.createElement('li');
  liDiff.textContent = `Durchschnittlicher Schwierigkeitsgrad – richtig: ${avgCorrectDiff}, falsch: ${avgIncorrectDiff}`;
  analysisList.appendChild(liDiff);

  const liDisc = document.createElement('li');
  liDisc.textContent = 'Item-Discrimination: Kann erst mit mehreren Teilnehmern berechnet werden.';
  analysisList.appendChild(liDisc);

  const liDrop = document.createElement('li');
  const dropOff = state.currentIndex < state.currentQuestions.length ? 1 : 0;
  liDrop.textContent = `Drop-off-Rate: ${dropOff === 0 ? 'Keine (komplett absolviert)' : 'Test nicht abgeschlossen'}`;
  analysisList.appendChild(liDrop);

  container.appendChild(analysisList);

  // Data export buttons
  const exportTitle = document.createElement('h3');
  exportTitle.textContent = 'Datenexport';
  container.appendChild(exportTitle);

  const exportCSVBtn = document.createElement('button');
  exportCSVBtn.textContent = 'CSV herunterladen';
  exportCSVBtn.addEventListener('click', () => {
    const { csvContent, filename } = buildCSV();
    downloadData(csvContent, filename, 'text/csv;charset=utf-8');
  });
  container.appendChild(exportCSVBtn);

  const exportJSONBtn = document.createElement('button');
  exportJSONBtn.textContent = 'JSON herunterladen';
  exportJSONBtn.style.marginLeft = '0.5rem';
  exportJSONBtn.addEventListener('click', () => {
    const { jsonContent, filename } = buildJSON();
    downloadData(jsonContent, filename, 'application/json');
  });
  container.appendChild(exportJSONBtn);

  // ---- Anonyme Übermittlung an Google Sheets (Apps Script WebApp) ----
  const sendBtn = document.createElement('button');
  sendBtn.textContent = 'Ergebnisse anonym senden';
  sendBtn.style.marginLeft = '0.5rem';

  sendBtn.addEventListener('click', async () => {
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sende...';

    const payload = {
      timestamp: new Date().toISOString(),
      mode: PRO_MODE ? 'pro' : 'base',
      selectedModules: state.selectedModules,
      results: state.answers,
      scorePercent,
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
      sendBtn.textContent = 'Ergebnisse anonym senden';
    }
  });

  container.appendChild(sendBtn);

  // Profi-Modul Button / Zurück Button
  const hasProQuestions = questions.some((q) => q.tier === 'pro');

  if (!PRO_MODE && hasProQuestions) {
    const proBtn = document.createElement('button');
    proBtn.textContent = 'Profi-Modul starten (5 Fragen)';
    proBtn.style.marginLeft = '0.5rem';
    proBtn.addEventListener('click', () => {
      // Basis-Session behalten, aber Profi neu starten
      localStorage.removeItem('hydroQuizSession_pro');
      window.location.search = '?pro=1';
    });
    container.appendChild(proBtn);
  }

  if (PRO_MODE) {
    const backBtn = document.createElement('button');
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
  restartBtn.textContent = PRO_MODE ? 'Profi-Modul neu starten' : 'Neu starten';
  restartBtn.style.marginTop = '1rem';
  restartBtn.addEventListener('click', () => {
    if (PRO_MODE) localStorage.removeItem('hydroQuizSession_pro');
    else localStorage.removeItem('hydroQuizSession_base');
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
  const data = {
    timestamp: new Date().toISOString(),
    mode: PRO_MODE ? 'pro' : 'base',
    selectedModules: state.selectedModules,
    results: state.answers,
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
