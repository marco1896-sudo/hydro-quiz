# Hydro‑Quiz – Wissenschaftlicher Test für Nährstoff‑Management

![Hydroponic setup]({{file:GueqPBKUgLxnrvRf9hL5i4}})

## Übersicht

Dieses Projekt liefert einen **voll funktionsfähigen, mobil optimierten Web‑Test** zur Ermittlung des Wissensstandes im Bereich Hydroponik und Bodenbewirtschaftung. Der Test ist modular aufgebaut, deckt grundlegende bis fortgeschrittene Themen ab und wertet die Antworten datenbasiert aus. Die Anwendung kommt ohne Server‑Back‑End aus und kann **kostenlos auf Cloudflare Pages oder GitHub Pages** gehostet werden.

**Schlüsselmerkmale:**

* Modulare Struktur (Hydro Anfänger, Hydro Fortgeschritten, Hydro Experte, Erde, Wechselwirkungen & Zusätze)
* Diverse Fragetypen: Single‑ und Multiple‑Choice, Reihenfolge, Szenarien, Berechnungen
* Bewertungslogik mit Gesamtscore, Modul‑Subscores, Kompetenzlevel, Fehlerkategorien und persönlichem Feedback
* Speicherung der Antworten nur im Browser (LocalStorage) – keine persönlichen Daten werden übertragen
* Export der Ergebnisse als **CSV** oder **JSON**
* Erweiterbar und wissenschaftlich fundiert (siehe Frage‑Begründungen in `questions.js`)

## 1. Projektstruktur

```text
hydro‑quiz/
├── index.html       # Einstiegspunkt, lädt UI und Skripte
├── style.css        # Mobile‑first Styling
├── app.js           # Logik für Test, Auswertung und Export
├── questions.js     # Fragenkatalog mit Begründungen und Schwierigkeitslevel
├── README.md        # Diese Dokumentation
└── assets/          # Platz für zusätzliche Assets (Bilder, Logos)
```

### Architekturentscheidungen

* **Plain HTML/CSS/JS:** Um kostenloses Hosting ohne Build‑Schritt zu ermöglichen, wurde bewusst auf Frameworks verzichtet. Alle Module werden per ES‑Modul (`import`) eingebunden und im Browser ausgeführt.
* **LocalStorage:** Der aktuelle Fortschritt und die Antworten werden im Browser gespeichert. Dadurch wird keine Datenbank benötigt und der Test bleibt DSGVO‑sensibel.
* **Modularität:** Fragen sind in `questions.js` kapselt. Neue Module oder Fragen können einfach durch Hinzufügen von Einträgen im Array erweitert werden.
* **Drag‑and‑Drop Reihenfolgefragen:** Für „order“‑Fragen wird die native Drag‑and‑Drop‑API verwendet, um eine intuitive Sortierung ohne externe Bibliothek zu ermöglichen.

## 2. Setup & Entwicklung

1. **Repository klonen:**
   ```bash
   git clone <REPO_URL>
   cd hydro‑quiz
   ```
2. **Lokales Testen:** Da viele Browser das Laden von ES‑Modulen über `file://` blockieren, empfiehlt sich der Start eines lokalen Servers:
   ```bash
   python3 -m http.server 8000 --directory .
   ```
   Anschließend im Browser `http://localhost:8000/index.html` aufrufen.
3. **Anpassungen vornehmen:** Bearbeite `questions.js`, um Fragen zu ändern oder hinzuzufügen. In `app.js` kann die Bewertungslogik angepasst werden.

## 3. Kostenloses Hosting

### Option A: GitHub Pages

1. Ein neues Repository auf GitHub erstellen und den Projektordner hochladen.
2. In den Repository‑Einstellungen unter **Pages** als Quelle den Branch `main` (root) auswählen.
3. Nach wenigen Minuten ist die Seite unter `https://<username>.github.io/<repository>/` erreichbar.
4. Verlinkung: Der Test kann als Direktlink geteilt werden, z. B. `https://deinname.github.io/hydro‑quiz/`.

### Option B: Cloudflare Pages

1. Ein Konto bei [Cloudflare](https://pages.cloudflare.com/) erstellen.
2. Neues Projekt erstellen und das GitHub‑Repo verbinden.
3. Als Build Command **leer lassen** und das Output‑Verzeichnis auf `/` setzen.
4. Nach Abschluss des Deployments ist die Seite über eine `.pages.dev`‑Domain erreichbar. Optional kann eine eigene Domain verbunden werden.

### Teilnahme‑Link

Der Teilnahme‑Link ist einfach die URL, unter der `index.html` bereitgestellt wird. Beispiel: `https://deinname.pages.dev` oder `https://deinname.github.io/hydro‑quiz/`. Der Test funktioniert ohne Query‑Parameter und erfordert kein Login.

## 4. Bedienung

1. **Modulauswahl:** Auf der Startseite können ein oder mehrere Module ausgewählt werden. Werden keine Module ausgewählt, werden alle verwendet.
2. **Fragen beantworten:** Jede Frage wird einzeln präsentiert. Bei Mehrfach‑Antworten müssen alle richtigen Optionen gewählt werden. Bei Reihenfolgefragen werden die Elemente per Drag‑and‑Drop in die richtige Reihenfolge gebracht. Bei Berechnungen einen numerischen Wert eingeben.
3. **Confidence‑Rating:** Nach jeder Antwort kann die eigene Sicherheit auf einer Skala von 1 (bzw. unsicher) bis 5 (sehr sicher) bewertet werden. Diese Angabe fließt in die psychometrische Analyse ein.
4. **Zwischenspeicherung:** Der Fortschritt wird automatisch gespeichert. Wenn der Browser geschlossen oder der Tab aktualisiert wird, kann der Test später fortgesetzt werden.
5. **Ergebnisanzeige:** Nach Abschluss werden Gesamtscore, Modul‑Subscores, Fehlerkategorien, persönliche Stärken/Schwächen und Zeitstatistiken angezeigt.
6. **Export:** Ergebnisse können im CSV‑ oder JSON‑Format heruntergeladen werden. Der CSV‑Export enthält unter anderem Frage‑ID, Module, Antwort, Korrektheit, Selbstbewertung und benötigte Zeit. JSON enthält die gleichen Informationen in strukturierter Form.

## 5. Auswertungslogik

* **Scoring:** Jede Frage zählt gleich viel. Für Multiple‑Choice‑Fragen müssen alle richtigen Optionen gewählt werden, sonst gilt die Frage als falsch. Reihenfolgefragen sind nur korrekt, wenn die Reihenfolge exakt stimmt. Bei Berechnungen wird ein Toleranzbereich berücksichtigt.
* **Gesamtscore:** `(Anzahl korrekt beantworteter Fragen / Gesamtanzahl) × 100`. Daraus wird das Kompetenzlevel abgeleitet: <40 % → Beginner; 40–59 % → Fortgeschritten; 60–79 % → Profi; ≥80 % → Experte.
* **Subscores:** Für jedes Modul wird der prozentuale Anteil richtiger Antworten berechnet.
* **Fehlerkategorien:** In `questions.js` sind jeder Frage Kategorien wie „pH‑Fehler“, „EC‑Fehler“ oder „Überreaktion“ zugeordnet. Wird eine Frage falsch beantwortet, werden diese Kategorien gezählt, um Fehlerschwerpunkte zu identifizieren.
* **Zeitstatistik:** Es wird die Zeit pro Frage sowie die Gesamtzeit erfasst. Daraus lässt sich erkennen, wo längeres Nachdenken erforderlich war.
* **Psychometrische Kennwerte:** Der Schwierigkeitsgrad (`difficulty`) ist pro Frage hinterlegt (1–3). Im Ein‑User‑Modus können Item‑Discrimination‑Parameter nicht bestimmt werden; dafür ist eine größere Stichprobe nötig. Dennoch werden Mittelwerte für richtig und falsch beantwortete Fragen ausgegeben.
* **Persönliches Feedback:** Das System identifiziert das best‑ und das schlecht‑bewertete Modul und die häufigste Fehlerkategorie. Daraus werden Stärken und Verbesserungsbereiche abgeleitet.

## 6. Didaktisches Konzept

Der Test orientiert sich an **kompetenzbasiertem Lernen**. Jede Frage ist mit einem Lernziel und einer wissenschaftlichen Begründung verknüpft (siehe Kommentare in `questions.js`).

* **Hydro Anfänger:** Grundlagen zu pH, EC, Temperatur und Sauerstoffversorgung. Lernziel: elementare Parameter kennen und typische Fehler vermeiden.
* **Hydro Fortgeschritten:** Fokus auf Stabilitätsmanagement, Nährstoffmischung, Drift und Messfehler. Lernziel: systematische Ursachen verstehen und präventiv handeln.
* **Hydro Experte:** Komplexe Szenarien, Risikoabschätzung und Entscheidungslogik. Lernziel: situationsabhängig abwägen und minimalinvasiv agieren.
* **Erde (organisch vs mineralisch):** Vergleich von Boden und Hydroponik, Pufferkapazitäten, Lock‑out‑Risiken. Lernziel: Unterschiede erkennen und Transferleistung erbringen.
* **Wechselwirkungen & Zusätze:** Nährstoff‑Antagonismen, Chelate, Silikate, Ausfällungen. Lernziel: chemische Zusammenhänge verstehen und Zusätze gezielt einsetzen.

Die Schwierigkeitsklassifizierung (1–3) erlaubt eine mehrstufige Analyse: Ein hoher Anteil richtig beantworteter schwerer Fragen deutet auf tiefergehendes Verständnis hin.

## 7. Erweiterung und Anpassung

### Neue Fragen hinzufügen

1. Öffne `questions.js`.
2. Füge ein neues Objekt mit eindeutiger `id`, `module`, `type`, `text`, `options` (falls nötig), `answer`, `difficulty`, `categories`, `explanation` und optional `riskProfile` hinzu.
3. Speichere die Datei. Beim nächsten Laden wird die neue Frage automatisch berücksichtigt.

### Neue Module anlegen

1. Wähle einen Modulnamen und verwende ihn für alle zugehörigen Fragen in `questions.js`.
2. Die Modulauswahl auf der Startseite generiert die Optionen automatisch aus den vorhandenen Modulnamen.

### Persistente Datenspeicherung

Für MVP wird kein Server benötigt. Soll das System später für Forschung oder kommerzielle Zwecke genutzt werden, können Antworten über einen Serverless‑Endpunkt gespeichert werden (z. B. mittels [Cloudflare Workers](https://developers.cloudflare.com/workers/) oder [Supabase](https://supabase.com/)). Die Funktion `downloadData` in `app.js` kann angepasst werden, um die Ergebnisse per `fetch` zu senden.

### Monetarisierung

* **Freemium‑Modell:** Einige Module (z. B. Anfänger) kostenlos, fortgeschrittene Module kostenpflichtig. Implementiert durch eine Abfrage vor dem Start.
* **Individuelle Auswertungen:** Erweiterte psychometrische Analysen und personalisierte Empfehlungen gegen Gebühr.
* **Werbefreie Version:** Optional kostenpflichtiger Zugang ohne Logos oder mit Firmenbranding.

## 8. Wissenschaftliche Quellen

Die Fragen und Erklärungen basieren auf seriösen Publikationen und Extension‑Guides. Einige zentrale Quellen:

* pH‑ und EC‑Empfehlungen: Die Oklahoma State University empfiehlt für hydroponische Nährlösungen einen pH‑Bereich von 5–6, um Nährstoffverfügbarkeit zu maximieren【345985548017505†L142-L148】. Hohe EC‑Werte verursachen osmotischen Stress, zu niedrige EC‑Werte führen zu Mangelerscheinungen【345985548017505†L132-L136】.
* Temperaturempfehlung: Ideale Wassertemperaturen für Hydroponik liegen bei 18–24 °C; höhere Temperaturen senken den Sauerstoffgehalt und erhöhen das Krankheitsrisiko【164645360006830†L168-L177】.
* Optimale Sauerstoffkonzentration: 5–8 mg/L DO gelten als ideal für die meisten Kulturen【548792925273666†L200-L227】.
* Nährstoffantagonismen: Ein Überschuss an Kalium kann die Aufnahme von Stickstoff, Calcium und Magnesium hemmen【538023277037540†L1291-L1304】, und ein Verhältnis von 3–5 Teilen K und Ca zu 1 Teil Mg wird empfohlen【443725516370711†L64-L69】.
* Chelate und Zusätze: Huminsäuren und Fulvosäuren binden Metallionen, verhindern Ausfällung und verbessern die Nährstoffaufnahme【58362107313850†L83-L100】【58362107313850†L114-L133】. Silizium wirkt stressmindernd und stärkt Pflanzen【268910118176844†L142-L171】.
* pH‑Drift: Die Aufnahme von Nitrat hebt den pH‑Wert, während Ammonium ihn senkt【915996148411992†L159-L177】.
* Mixing‑Protokolle: Calciumnitrat darf nicht mit Phosphat‑ oder Sulfat‑Düngern gemischt werden, da sonst Ausfällungen entstehen【898068303722320†L160-L167】.

Diese Quellen sind im Kommentarbereich von `questions.js` referenziert. Es lohnt sich, die Originalartikel zu lesen, um das eigene Wissen zu vertiefen.

## 9. Fazit

Dieses Projekt zeigt, wie aus einem wissenschaftlich fundierten Fragenkatalog ein skalierbares, datenauswertbares Testsystem entwickelt werden kann. Dank des modularen Aufbaus und der klaren Architektur lässt sich der Test leicht erweitern und in ein professionelles Produkt überführen.
