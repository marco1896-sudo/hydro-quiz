/*
 * Question definitions for the hydroponics competency test.
 *
 * Each question object contains:
 *  id: Unique identifier (string)
 *  module: Name of the module this question belongs to
 *  type: Type of the question. Supported values:
 *    - 'single'   : single‑choice multiple‑choice question
 *    - 'multi'    : multiple‑choice with multiple correct answers
 *    - 'order'    : ordering question where items must be ranked
 *    - 'calc'     : numerical calculation question with tolerance
 *    - 'scenario' : scenario or decision question (treated like 'single')
 *  text: The question prompt shown to the user
 *  options: Array of answer options (objects with id and text). Not used for calc
 *  answer: The correct answer. For 'single' and 'scenario' this is a single option
 *          id. For 'multi' it's an array of option ids. For 'order' it's an array
 *          specifying the correct order of option ids. For 'calc' it's an object
 *          { value: Number, tolerance: Number }.
 *  difficulty: Integer from 1 (easy) to 3 (hard). Used to weight scores.
 *  categories: Array of error categories associated with incorrect answers
 *  explanation: Text explaining the rationale and referencing scientific sources.
 *  riskProfile: (optional) Object mapping option ids to risk behaviour labels
 *               ('overreaction', 'underreaction', 'balanced'). Used in advanced
 *               feedback to characterise decision making. Not required for most
 *               questions.
 */

export const questions = [
  /** Module 1 – Hydro Anfänger */
  {
    id: 'M1Q1',
    module: 'Hydro Anfänger',
    type: 'single',
    text: 'What is the recommended pH range for hydroponic nutrient solutions?',
    options: [
      { id: 'A', text: '4.0–4.5' },
      { id: 'B', text: '5.0–6.0' },
      { id: 'C', text: '6.5–7.5' },
      { id: 'D', text: '7.5–8.5' }
    ],
    answer: 'B',
    difficulty: 1,
    categories: ['pH-Fehler'],
    explanation:
      'Optimal nutrient availability occurs when the nutrient solution pH is maintained between roughly 5 and 6.5. University extension guidelines recommend keeping the solution itself between pH 5 and 6 so that the root environment stays around pH 6–6.5【345985548017505†L142-L148】.',
  },
  {
    id: 'M1Q2',
    module: 'Hydro Anfänger',
    type: 'multi',
    text:
      'Why is it important to keep electrical conductivity (EC) within recommended limits in hydroponics? (Select all that apply)',
    options: [
      { id: 'A', text: 'High EC can cause osmotic stress and nutrient imbalance' },
      { id: 'B', text: 'Low EC can lead to nutrient deficiency and reduced growth' },
      { id: 'C', text: 'High EC ensures plants get more nutrients and grow faster' },
      { id: 'D', text: 'EC has no effect on plant health' }
    ],
    answer: ['A', 'B'],
    difficulty: 1,
    categories: ['EC-Fehler'],
    explanation:
      'Electrical conductivity is a measure of the total salt concentration in solution. Excessively high EC causes osmotic stress, ion toxicity and nutrient imbalance, while too low EC often leads to nutrient deficiencies and poor growth【345985548017505†L132-L136】.',
  },
  {
    id: 'M1Q3',
    module: 'Hydro Anfänger',
    type: 'single',
    text:
      'What water temperature range (°C) is generally recommended for hydroponic nutrient solutions to balance oxygen solubility and plant metabolism?',
    options: [
      { id: 'A', text: '10–15°C' },
      { id: 'B', text: '18–24°C' },
      { id: 'C', text: '28–32°C' },
      { id: 'D', text: '35–40°C' }
    ],
    answer: 'B',
    difficulty: 1,
    categories: ['Temperatur-Fehler'],
    explanation:
      'Research indicates that hydroponic nutrient solutions perform best when kept between about 18°C and 24°C. Temperatures above 24°C reduce dissolved oxygen and increase disease risk, while lower temperatures slow metabolism【164645360006830†L168-L177】.',
  },
  {
    id: 'M1Q4',
    module: 'Hydro Anfänger',
    type: 'single',
    text:
      'What dissolved oxygen (DO) concentration is generally considered optimal for most hydroponic crops?',
    options: [
      { id: 'A', text: '1–2 mg/L' },
      { id: 'B', text: '3–4 mg/L' },
      { id: 'C', text: '5–8 mg/L' },
      { id: 'D', text: '10–12 mg/L' }
    ],
    answer: 'C',
    difficulty: 1,
    categories: ['Sauerstoff-Fehler'],
    explanation:
      'General guidelines suggest keeping dissolved oxygen between roughly 5 and 8 mg/L for healthy hydroponic crops. Lower values can lead to root stress, while higher values are difficult to maintain at typical water temperatures【548792925273666†L200-L227】.',
  },
  {
    id: 'M1Q5',
    module: 'Hydro Anfänger',
    type: 'scenario',
    text:
      'Your nutrient solution starts at pH 5.8. After a day, the pH has risen to 6.5 without any adjustments. Which factor most likely explains this upward pH drift?',
    options: [
      { id: 'A', text: 'Plants absorbed nitrate (NO₃⁻) and released hydroxide (OH⁻), raising pH' },
      { id: 'B', text: 'Plants absorbed ammonium (NH₄⁺) and released hydrogen ions (H⁺), lowering pH' },
      { id: 'C', text: 'Microbial activity produced acids' },
      { id: 'D', text: 'Evaporation decreased water volume' }
    ],
    answer: 'A',
    difficulty: 2,
    categories: ['pH-Fehler'],
    explanation:
      'Plants absorb nitrogen in the form of nitrate (NO₃⁻) and ammonium (NH₄⁺). When they take up nitrate, they release hydroxide ions (OH⁻) into the nutrient solution, causing pH to rise【915996148411992†L159-L177】.',
  },

  /** Module 2 – Hydro Fortgeschritten */
  {
    id: 'M2Q1',
    module: 'Hydro Fortgeschritten',
    type: 'multi',
    text:
      'Excess potassium in a hydroponic nutrient solution can inhibit the uptake of which nutrients? (Select all that apply)',
    options: [
      { id: 'A', text: 'Nitrogen (N)' },
      { id: 'B', text: 'Calcium (Ca)' },
      { id: 'C', text: 'Magnesium (Mg)' },
      { id: 'D', text: 'Phosphorus (P)' }
    ],
    answer: ['A', 'B', 'C'],
    difficulty: 2,
    categories: ['Antagonismus'],
    explanation:
      'When one nutrient is present in excess it can inhibit uptake of others. Excess potassium can antagonise nitrogen, calcium and magnesium uptake【538023277037540†L1291-L1304】.',
  },
  {
    id: 'M2Q2',
    module: 'Hydro Fortgeschritten',
    type: 'single',
    text:
      'Why does high alkalinity of source water cause the nutrient solution pH to rise over time?',
    options: [
      { id: 'A', text: 'Bicarbonate ions act as a buffer and elevate pH' },
      { id: 'B', text: 'High alkalinity means water contains more hydrogen ions' },
      { id: 'C', text: 'High alkalinity eliminates the need for pH monitoring' },
      { id: 'D', text: 'It doesn’t affect pH' }
    ],
    answer: 'A',
    difficulty: 2,
    categories: ['pH-Fehler'],
    explanation:
      'Alkalinity is largely due to bicarbonate and carbonate ions, which raise pH and buffer against acids. High alkalinity water (> 75 ppm) will cause nutrient solution pH to rise and require acid injection for correction【345985548017505†L152-L159】.',
  },
  {
    id: 'M2Q3',
    module: 'Hydro Fortgeschritten',
    type: 'order',
    text:
      'Arrange the steps for preparing a nutrient solution to minimize precipitation and measurement errors.',
    options: [
      { id: 'A', text: 'Measure water volume and temperature' },
      { id: 'B', text: 'Add base nutrients (NPK mix)' },
      { id: 'C', text: 'Add calcium nitrate separately and mix' },
      { id: 'D', text: 'Add magnesium sulfate (Epsom salt)' },
      { id: 'E', text: 'Adjust pH and EC after all nutrients are dissolved' }
    ],
    answer: ['A', 'B', 'C', 'D', 'E'],
    difficulty: 2,
    categories: ['Timing-Fehler', 'Messfehler'],
    explanation:
      'A common mixing protocol is to measure water first, dissolve your base NPK nutrients, then add calcium nitrate separately before adding magnesium sulfate. Finally, adjust pH and EC. Mixing calcium nitrate directly with other concentrated salts can cause precipitation【898068303722320†L160-L167】.',
  },
  {
    id: 'M2Q4',
    module: 'Hydro Fortgeschritten',
    type: 'single',
    text:
      'What is a likely reason for the EC of a nutrient solution gradually increasing even when no additional fertilizer is added?',
    options: [
      { id: 'A', text: 'Evaporation of water concentrates salts' },
      { id: 'B', text: 'Plants absorb salts faster than water' },
      { id: 'C', text: 'Sensors are malfunctioning' },
      { id: 'D', text: 'Air temperature is decreasing' }
    ],
    answer: 'A',
    difficulty: 2,
    categories: ['EC-Fehler'],
    explanation:
      'As water evaporates from a reservoir, dissolved salts remain, increasing EC. Top‑off with fresh water or replace the solution to avoid salt accumulation.',
  },
  {
    id: 'M2Q5',
    module: 'Hydro Fortgeschritten',
    type: 'multi',
    text:
      'If EC becomes too high due to evaporation, which actions can help restore the proper concentration? (Select all that apply)',
    options: [
      { id: 'A', text: 'Dilute the solution with fresh water' },
      { id: 'B', text: 'Replace the solution with a new batch' },
      { id: 'C', text: 'Add more fertilizer' },
      { id: 'D', text: 'Reduce water temperature to slow plant uptake' }
    ],
    answer: ['A', 'B'],
    difficulty: 2,
    categories: ['EC-Fehler', 'Überreaktion'],
    explanation:
      'When EC rises due to evaporation, you can either dilute the solution with fresh water to bring EC down or replace the solution entirely. Adding more fertilizer makes EC higher and lowering temperature does not correct EC directly.',
    riskProfile: { A: 'balanced', B: 'balanced', C: 'overreaction', D: 'underreaction' },
  },

  /** Module 3 – Hydro Experte */
  {
    id: 'M3Q1',
    module: 'Hydro Experte',
    type: 'scenario',
    text:
      'Your reservoir holds 100 L of nutrient solution with EC 2.0 mS/cm and pH 5.8. You top off with 20 L of fresh water. After top‑off, EC drops to 1.7 mS/cm and pH rises to 6.2. Over the next two days, EC steadily increases to 2.5 mS/cm and pH drops to 5.0. What is the most appropriate next step?',
    options: [
      { id: 'A', text: 'Change the entire nutrient solution because salts have accumulated' },
      { id: 'B', text: 'Add more fertilizer to raise EC further' },
      { id: 'C', text: 'Add water only and ignore pH drift' },
      { id: 'D', text: 'Adjust pH with acid but keep the same solution' }
    ],
    answer: 'A',
    difficulty: 3,
    categories: ['Überreaktion', 'Nicht-Reaktion'],
    explanation:
      'An EC above the target range and a dropping pH suggest nutrient imbalance and salt accumulation. Flushing and replacing the solution resets the chemical environment; simply adding more fertilizer or water will not address the underlying imbalance.',
    riskProfile: { A: 'balanced', B: 'overreaction', C: 'underreaction', D: 'underreaction' },
  },
  {
    id: 'M3Q2',
    module: 'Hydro Experte',
    type: 'scenario',
    text:
      'In your NFT system you observe interveinal chlorosis (yellowing between veins) on the lower leaves. The nutrient solution pH is 7.5. Which deficiency is likely and what is the first corrective action?',
    options: [
      { id: 'A', text: 'Magnesium deficiency; lower pH to 5.5–6.0' },
      { id: 'B', text: 'Iron deficiency; add more iron chelate' },
      { id: 'C', text: 'Nitrogen deficiency; increase nitrogen' },
      { id: 'D', text: 'Calcium deficiency; spray calcium chloride' }
    ],
    answer: 'A',
    difficulty: 3,
    categories: ['pH-Fehler'],
    explanation:
      'High pH reduces the availability of magnesium and iron. Magnesium deficiency often appears as interveinal chlorosis on older leaves. The first step is to lower pH into the 5.5–6.0 range and then supplement if needed【538023277037540†L1349-L1398】.',
    riskProfile: { A: 'balanced', B: 'overreaction', C: 'overreaction', D: 'overreaction' },
  },
  {
    id: 'M3Q3',
    module: 'Hydro Experte',
    type: 'multi',
    text:
      'In a deep‑water culture (DWC) system running at 25°C, dissolved oxygen drops to 4 mg/L. Which actions will help increase dissolved oxygen? (Select all that apply)',
    options: [
      { id: 'A', text: 'Add an air pump or air stones to aerate the solution' },
      { id: 'B', text: 'Lower the water temperature' },
      { id: 'C', text: 'Add more fertilizer' },
      { id: 'D', text: 'Reduce airflow around plants' }
    ],
    answer: ['A', 'B'],
    difficulty: 2,
    categories: ['Sauerstoff-Fehler'],
    explanation:
      'Oxygen is supplied via agitation and diffusion. Air pumps or air stones increase gas exchange, while lowering water temperature increases oxygen solubility【164645360006830†L168-L177】. Adding fertilizer does not increase oxygen and reducing airflow has no effect on dissolved oxygen.',
    riskProfile: { A: 'balanced', B: 'balanced', C: 'overreaction', D: 'underreaction' },
  },
  {
    id: 'M3Q4',
    module: 'Hydro Experte',
    type: 'multi',
    text:
      'Which practices can help stabilize pH in hydroponic systems with high water alkalinity? (Select all that apply)',
    options: [
      { id: 'A', text: 'Use reverse osmosis (RO) or deionized water' },
      { id: 'B', text: 'Inject acid or use acidic fertilizer to neutralize bicarbonates' },
      { id: 'C', text: 'Use “pH‑perfect” fertilizers that balance ammonium and nitrate forms' },
      { id: 'D', text: 'Stop monitoring pH because plants adapt' }
    ],
    answer: ['A', 'B', 'C'],
    difficulty: 3,
    categories: ['pH-Fehler', 'Stabilität'],
    explanation:
      'High alkalinity water contains bicarbonates that raise pH. Using reverse osmosis or deionized water removes bicarbonates; injecting acid or using acidic fertilizers neutralizes them【345985548017505†L152-L159】. Balanced nutrient formulations that supply both nitrate and ammonium help stabilise pH by balancing uptake of cations and anions【915996148411992†L159-L177】.',
    riskProfile: { A: 'balanced', B: 'balanced', C: 'balanced', D: 'underreaction' },
  },
  {
    id: 'M3Q5',
    module: 'Hydro Experte',
    type: 'multi',
    text:
      'A miscalculation results in potassium levels ten times higher than recommended (2,050 ppm). Which deficiencies might you see due to nutrient antagonism? (Select all that apply)',
    options: [
      { id: 'A', text: 'Nitrogen deficiency (stunting, pale leaves)' },
      { id: 'B', text: 'Calcium deficiency (tip burn, blossom end rot)' },
      { id: 'C', text: 'Magnesium deficiency (interveinal chlorosis)' },
      { id: 'D', text: 'Iron deficiency (yellow young leaves)' }
    ],
    answer: ['A', 'B', 'C'],
    difficulty: 3,
    categories: ['Antagonismus'],
    explanation:
      'Excess potassium can competitively inhibit the uptake of nitrogen, calcium and magnesium【538023277037540†L1291-L1304】. Iron availability is influenced more by pH and chelation than by potassium levels.',
    riskProfile: { A: 'balanced', B: 'balanced', C: 'balanced', D: 'underreaction' },
  },

  /** Module 4 – Erde (organisch vs mineralisch) */
  {
    id: 'M4Q1',
    module: 'Erde (organisch vs mineralisch)',
    type: 'single',
    text:
      'In soil‑based cultivation, the soil acts as a buffer for pH and EC, making nutrient conditions more stable than in hydroponics.',
    options: [
      { id: 'A', text: 'True' },
      { id: 'B', text: 'False' }
    ],
    answer: 'A',
    difficulty: 1,
    categories: ['Puffer'],
    explanation:
      'Unlike soilless culture, soil has cation exchange capacity and carbonate buffering that stabilise pH and EC. Soilless systems require more careful monitoring because they lack this buffer【345985548017505†L163-L167】.',
  },
  {
    id: 'M4Q2',
    module: 'Erde (organisch vs mineralisch)',
    type: 'multi',
    text:
      'When switching from soil to hydroponics, which challenges arise due to the lack of soil buffering? (Select all that apply)',
    options: [
      { id: 'A', text: 'Need for more frequent pH monitoring' },
      { id: 'B', text: 'Need to precisely control nutrient concentrations' },
      { id: 'C', text: 'Risk of nutrient shock if solution strength changes abruptly' },
      { id: 'D', text: 'Ability to ignore nutrient balance because hydroponics is forgiving' }
    ],
    answer: ['A', 'B', 'C'],
    difficulty: 2,
    categories: ['Puffer', 'EC-Fehler', 'pH-Fehler'],
    explanation:
      'Soil moderates nutrient and pH fluctuations; in hydroponics these factors change rapidly, so growers must monitor pH frequently, adjust nutrient concentrations precisely, and avoid sudden changes that can shock plants.',
  },
  {
    id: 'M4Q3',
    module: 'Erde (organisch vs mineralisch)',
    type: 'multi',
    text:
      'Nutrient lockout can occur in soil or coco when nutrients become unavailable despite being present. Which factors commonly cause nutrient lockout? (Select all that apply)',
    options: [
      { id: 'A', text: 'Extreme pH (too high or too low)' },
      { id: 'B', text: 'High salt/EC build‑up in the root zone' },
      { id: 'C', text: 'Adding chelated micronutrients' },
      { id: 'D', text: 'Overwatering causing low oxygen' }
    ],
    answer: ['A', 'B', 'D'],
    difficulty: 2,
    categories: ['pH-Fehler', 'EC-Fehler', 'Sauerstoff-Fehler'],
    explanation:
      'Lockout occurs when environmental conditions prevent roots from absorbing nutrients. Extreme pH and high salinity reduce nutrient availability, and low oxygen due to waterlogged media reduces uptake. Adding chelated micronutrients generally enhances availability rather than causing lockout.',
  },
  {
    id: 'M4Q4',
    module: 'Erde (organisch vs mineralisch)',
    type: 'single',
    text:
      'According to e‑GRO, what approximate ratio of potassium (K) and calcium (Ca) to magnesium (Mg) in hydroponic nutrient solutions helps avoid uptake antagonism?',
    options: [
      { id: 'A', text: '1:1:1 (K:Ca:Mg)' },
      { id: 'B', text: '3–5:3–5:1 (K:Ca:Mg)' },
      { id: 'C', text: '10:10:1 (K:Ca:Mg)' },
      { id: 'D', text: '1:3:3 (K:Ca:Mg)' }
    ],
    answer: 'B',
    difficulty: 2,
    categories: ['Antagonismus'],
    explanation:
      'The e‑GRO edible alert on nutrient antagonisms notes that maintaining a K:Ca:Mg ratio of roughly 3–5 parts potassium and calcium to 1 part magnesium helps avoid antagonism and ensures balanced uptake【443725516370711†L64-L69】.',
  },
  {
    id: 'M4Q5',
    module: 'Erde (organisch vs mineralisch)',
    type: 'multi',
    text:
      'Which statements about using organic supplements (humic/fulvic acids) in hydroponics are accurate? (Select all that apply)',
    options: [
      { id: 'A', text: 'Humic and fulvic acids act as natural chelating agents, improving nutrient uptake' },
      { id: 'B', text: 'They buffer pH and prevent nutrient precipitation' },
      { id: 'C', text: 'They directly provide primary macronutrients (N‑P‑K) in large quantities' },
      { id: 'D', text: 'They degrade quickly and pose little risk of salt buildup' }
    ],
    answer: ['A', 'B'],
    difficulty: 2,
    categories: ['Zusätze'],
    explanation:
      'Humic and fulvic acids are natural chelating agents that neutralise nutrient charges, prevent oxidation and precipitation, and enhance uptake【58362107313850†L81-L100】【58362107313850†L114-L133】. They contribute trace minerals but do not supply large amounts of N‑P‑K, and they do not completely eliminate salt build‑up.',
  },

  /** Module 5 – Wechselwirkungen & Zusätze */
  {
    id: 'M5Q1',
    module: 'Wechselwirkungen & Zusätze',
    type: 'multi',
    text:
      'Which benefits do chelating agents like EDTA, DTPA, or fulvic acid provide in a hydroponic nutrient solution? (Select all that apply)',
    options: [
      { id: 'A', text: 'Neutralize the charge of micronutrients, improving their uptake' },
      { id: 'B', text: 'Prevent precipitation and oxidation of micronutrients' },
      { id: 'C', text: 'Reduce EC by removing salts' },
      { id: 'D', text: 'Allow plants to absorb nutrients across a wider pH range' }
    ],
    answer: ['A', 'B', 'D'],
    difficulty: 3,
    categories: ['Zusätze'],
    explanation:
      'Chelates bind metal ions, neutralising or reversing their charge and preventing oxidation and precipitation. This keeps nutrients soluble and available for uptake and allows them to remain available across a wider pH range【58362107313850†L83-L100】【58362107313850†L114-L133】.',
  },
  {
    id: 'M5Q2',
    module: 'Wechselwirkungen & Zusätze',
    type: 'single',
    text:
      'Why is silicon supplementation considered beneficial in hydroponic systems?',
    options: [
      { id: 'A', text: 'It mitigates environmental and pathogenic stresses' },
      { id: 'B', text: 'It is a required macronutrient for all plants' },
      { id: 'C', text: 'It increases pH permanently' },
      { id: 'D', text: 'It is rarely present in hydroponic solutions and thus harmful' }
    ],
    answer: 'A',
    difficulty: 2,
    categories: ['Zusätze'],
    explanation:
      'Silicon is considered a beneficial element that mitigates environmental and pathogenic stresses. Studies show that silicon supplementation can improve plant resistance to abiotic and biotic stresses and aid nutrient uptake【268910118176844†L142-L171】.',
  },
  {
    id: 'M5Q3',
    module: 'Wechselwirkungen & Zusätze',
    type: 'multi',
    text:
      'Which combinations of nutrients are particularly prone to forming insoluble precipitates if concentrated solutions are mixed together? (Select all that apply)',
    options: [
      { id: 'A', text: 'Calcium nitrate and phosphate‑containing fertilizers' },
      { id: 'B', text: 'Calcium nitrate and sulfate‑containing fertilizers' },
      { id: 'C', text: 'Iron chelate and sulfates' },
      { id: 'D', text: 'Potassium nitrate and magnesium sulfate' }
    ],
    answer: ['A', 'B'],
    difficulty: 2,
    categories: ['Ausfällung'],
    explanation:
      'Calcium nitrate should be mixed separately from phosphate‑ and sulfate‑containing fertilizers because it forms insoluble precipitates such as calcium phosphate and calcium sulfate if combined in concentrated form【898068303722320†L160-L167】. Potassium nitrate and magnesium sulfate are compatible.',
  },
  {
    id: 'M5Q4',
    module: 'Wechselwirkungen & Zusätze',
    type: 'calc',
    text:
      'A nutrient solution has a measured pH of 5.4. The target pH range is 5.5–6.0. Enter the maximum difference (tolerance) you would accept before adjusting the pH (enter as a decimal).',
    answer: { value: 0.3, tolerance: 0.1 },
    difficulty: 1,
    categories: ['pH-Fehler'],
    explanation:
      'Small pH fluctuations are normal and plants tolerate minor variation. Acceptable tolerance around the target range is typically ±0.2–0.3. Values below 5.2 or above 6.2 should be corrected.',
  },
  {
    id: 'M5Q5',
    module: 'Wechselwirkungen & Zusätze',
    type: 'scenario',
    text:
      'After adjusting your nutrient solution, you measure EC of 2.4 mS/cm, which is higher than recommended for your leafy greens (recommended 1.8–2.2 mS/cm). You have two options: (1) immediately dilute the solution to 1.8 mS/cm or (2) monitor plant response for 24 hours before adjusting. What is your next step?',
    options: [
      { id: 'A', text: 'Dilute now' },
      { id: 'B', text: 'Monitor and adjust if needed after 24 hours' }
    ],
    answer: 'B',
    difficulty: 2,
    categories: ['Überreaktion', 'Nicht-Reaktion'],
    explanation:
      'Slightly elevated EC may not harm plants immediately. Monitoring for 24 hours allows you to observe plant response before intervening. Diluting immediately could overshoot and destabilise the solution.',
    riskProfile: { A: 'overreaction', B: 'balanced' },
  },
];