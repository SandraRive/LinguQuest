import type { Lesson, Unit } from '../schema';

/* ──────────────────────────────────────────────────────────────
   PRE-A1 · Unidad 1 · "La primera noche"
   Sala 1: pronombres personales sujeto
   Sala 2: TO BE afirmativo
   Sala 3: TO BE negativo e interrogativo
   Regla: ninguna sala usa estructuras que aún no se han enseñado.
   ────────────────────────────────────────────────────────────── */

export const L_PRONOUNS: Lesson = {
  id: 'pre-a1-u1-l1',
  level: 'PRE_A1',
  unit: 'pre-a1-u1',
  category: 'grammar',
  title: 'Pronombres personales',
  room: 'La lista de supervivientes',
  objectives: [
    'Conocer los 7 pronombres sujeto del inglés',
    'Sustituir un nombre por su pronombre',
    'Saber cuándo usar it y cuándo they',
  ],
  prerequisites: [],
  intro:
    'Antes de hablar por radio necesitas nombrar a la gente sin repetir su nombre todo el rato. Para eso están los pronombres: palabras como "yo", "ella" o "nosotros". En inglés solo hay siete y los vas a usar en todas las frases.',
  meaning:
    'Un pronombre sujeto sustituye al nombre de quien hace algo o de quien hablamos. En vez de decir "María", dices "she" (ella).',
  when: [
    'Cuando ya sabemos de quién hablamos y no queremos repetir el nombre.',
    'Siempre que una frase necesite sujeto. En inglés casi nunca se omite (lo verás en la siguiente sala).',
  ],
  how:
    'Mira quién es: ¿eres tú? → I. ¿Es la persona con la que hablas? → you. ¿Un hombre? → he. ¿Una mujer? → she. ¿Una cosa, un animal o el tiempo? → it. ¿Tú y otros? → we. ¿Varias personas o cosas, sin ti? → they.',
  table: {
    head: ['Inglés', 'Español', 'Ojo'],
    rows: [
      ['I', 'yo', 'Siempre en mayúscula, aunque vaya en mitad de la frase.'],
      ['you', 'tú, usted, vosotros, ustedes', 'Una sola palabra para singular, plural, formal e informal.'],
      ['he', 'él', 'Para hombres y chicos.'],
      ['she', 'ella', 'Para mujeres y chicas.'],
      ['it', '(eso)', 'Para cosas, animales y el tiempo. En español normalmente no se dice nada.'],
      ['we', 'nosotros, nosotras', 'Tú + otras personas.'],
      ['they', 'ellos, ellas', 'Varias personas, pero también varias cosas.'],
    ],
  },
  examples: [
    { en: 'Maria → she', es: 'María → ella' },
    { en: 'Tom → he', es: 'Tom → él' },
    { en: 'the radio → it', es: 'la radio → (eso)', note: 'Una cosa siempre es it, aunque en español sea femenina.' },
    { en: 'the dog → it', es: 'el perro → (eso)', note: 'Si es tu mascota, mucha gente dice he o she.' },
    { en: 'Ana and I → we', es: 'Ana y yo → nosotras' },
    { en: 'Luis and Pedro → they', es: 'Luis y Pedro → ellos' },
    { en: 'the radios → they', es: 'las radios → ellas', note: 'they sirve también para cosas en plural.' },
  ],
  errors: [
    { wrong: 'Sandra and i', right: 'Sandra and I', why: 'I (yo) se escribe siempre en mayúscula.' },
    { wrong: 'the radio → she', right: 'the radio → it', why: 'En inglés las cosas no tienen género. "La radio" es femenina en español, pero en inglés es it.' },
    { wrong: 'the radios → it', right: 'the radios → they', why: 'Si son varias cosas, el pronombre es they, igual que para personas.' },
  ],
  comparison: {
    title: 'you: una palabra para cuatro',
    body: 'En español distingues tú, usted, vosotros y ustedes. En inglés todo es you. Para saber si es una persona o varias, mira el contexto.',
  },
  simpler: [
    'Piensa en los pronombres como etiquetas para no repetir nombres. Solo hay siete: I (yo), you (tú/vosotros), he (él), she (ella), it (una cosa), we (nosotros), they (ellos o varias cosas).',
    'Hazte dos preguntas. Primera: ¿es una persona o una cosa? Si es una cosa → it (o they si son varias). Segunda, si es una persona: ¿soy yo (I), eres tú (you), es él (he), es ella (she)? Si son varios: ¿estoy yo dentro? Sí → we. No → they.',
  ],
  vocab: ['v-i', 'v-you', 'v-he', 'v-she', 'v-it', 'v-we', 'v-they', 'v-radio', 'v-dog'],
  concepts: [
    { id: 'c-pron-i', kind: 'grammar', prompt: 'yo', answers: ['I'] },
    { id: 'c-pron-you', kind: 'grammar', prompt: 'tú / vosotros', answers: ['you'] },
    { id: 'c-pron-he', kind: 'grammar', prompt: 'él', answers: ['he'] },
    { id: 'c-pron-she', kind: 'grammar', prompt: 'ella', answers: ['she'] },
    { id: 'c-pron-it', kind: 'grammar', prompt: 'pronombre para una cosa (la radio)', answers: ['it'] },
    { id: 'c-pron-we', kind: 'grammar', prompt: 'nosotros', answers: ['we'] },
    { id: 'c-pron-they', kind: 'grammar', prompt: 'ellos / ellas / varias cosas', answers: ['they'] },
  ],
  guided: [
    { id: 'l1-g1', type: 'choice', instruction: 'Elige el pronombre', prompt: 'Maria', options: ['he', 'she', 'it'], answer: 1, hint: 'María es una mujer.', explain: 'Para una mujer usamos she.', tags: ['pronoun-choice'] },
    { id: 'l1-g2', type: 'choice', instruction: 'Elige el pronombre', prompt: 'the radio (la radio)', options: ['she', 'he', 'it'], answer: 2, hint: 'Es una cosa.', explain: 'Las cosas no tienen género en inglés: it.', tags: ['it-for-things'] },
    { id: 'l1-g3', type: 'choice', instruction: 'Elige el pronombre', prompt: 'Ana and I (Ana y yo)', options: ['they', 'we', 'you'], answer: 1, hint: '¿Estás tú dentro del grupo?', explain: 'Si tú formas parte del grupo, es we.', tags: ['pronoun-choice'] },
    { id: 'l1-g4', type: 'match', instruction: 'Une cada pronombre con su traducción', pairs: [['I', 'yo'], ['she', 'ella'], ['we', 'nosotros'], ['they', 'ellos']], explain: 'I = yo, she = ella, we = nosotros, they = ellos.', tags: ['pronoun-choice'] },
  ],
  independent: [
    { id: 'l1-i1', type: 'choice', instruction: 'Elige el pronombre', prompt: 'Luis and Pedro (Luis y Pedro)', options: ['we', 'they', 'he'], answer: 1, explain: 'Varias personas sin ti: they.', tags: ['pronoun-choice'] },
    { id: 'l1-i2', type: 'translate', instruction: 'Escribe en inglés', es: 'él', answers: ['he'], explain: 'él = he.', tags: ['pronoun-choice'] },
    { id: 'l1-i3', type: 'spot', instruction: 'Toca la pareja incorrecta', tokens: ['Tom → he', 'the dog → it', 'the radio → she', 'Ana → she'], wrong: 2, explain: 'La radio es una cosa: it, no she.', tags: ['it-for-things'] },
    { id: 'l1-i4', type: 'choice', instruction: '¿Cómo se escribe "yo"?', prompt: 'Sandra and ___', options: ['i', 'I', 'Me'], answer: 1, explain: 'I siempre va en mayúscula.', tags: ['i-lowercase'] },
    { id: 'l1-i5', type: 'choice', instruction: 'Elige el pronombre', prompt: 'the radios (las radios)', options: ['it', 'they', 'she'], answer: 1, explain: 'Varias cosas: they.', tags: ['it-for-things'] },
  ],
  final: [
    { id: 'l1-f1', type: 'translate', instruction: 'Escribe en inglés', es: 'nosotras', answers: ['we'], explain: 'nosotros y nosotras = we.', tags: ['pronoun-choice'] },
    { id: 'l1-f2', type: 'choice', instruction: 'Elige el pronombre', prompt: 'Tom', options: ['she', 'he', 'it'], answer: 1, explain: 'Un hombre: he.', tags: ['pronoun-choice'] },
    { id: 'l1-f3', type: 'choice', instruction: 'Elige el pronombre', prompt: 'the shelter (el refugio)', options: ['he', 'it', 'they'], answer: 1, explain: 'Una cosa o lugar: it.', tags: ['it-for-things'] },
    { id: 'l1-f4', type: 'translate', instruction: 'Escribe en inglés', es: 'ellas', answers: ['they'], explain: 'ellos y ellas = they.', tags: ['pronoun-choice'] },
    { id: 'l1-f5', type: 'choice', instruction: 'Hablas con tres supervivientes. ¿Cómo les llamas?', prompt: 'vosotros', options: ['they', 'we', 'you'], answer: 2, explain: 'vosotros = you, igual que tú.', tags: ['pronoun-choice'] },
  ],
};

export const L_BE_AFF: Lesson = {
  id: 'pre-a1-u1-l2',
  level: 'PRE_A1',
  unit: 'pre-a1-u1',
  category: 'grammar',
  title: 'Verbo TO BE (afirmativo)',
  room: 'Me presento por radio',
  objectives: [
    'Usar am, is y are con cada pronombre',
    'Decir quién eres, cómo estás y dónde estás',
    'Expresar edad, hambre y frío con be (no con have)',
  ],
  prerequisites: ['pre-a1-u1-l1'],
  intro:
    'La radio crepita: "Identify yourself". Para presentarte necesitas el verbo más importante del inglés: to be. Significa a la vez ser y estar.',
  meaning:
    'To be une a una persona o cosa con lo que es, cómo está o dónde está. "I am Sandra" (soy Sandra), "I am tired" (estoy cansada), "I am here" (estoy aquí).',
  when: [
    'Quién o qué eres: I am Sandra. I am a survivor.',
    'Cómo estás o te sientes: She is tired. We are happy.',
    'Dónde estás: They are in the shelter.',
    'Nacionalidad: He is Spanish.',
    'Edad: I am 25. (¡En inglés no se "tienen" años!)',
    'Hambre, frío y el tiempo: I am hungry. I am cold. It is cold.',
  ],
  how:
    'Pronombre + am / is / are + lo que sea. I va con am. He, she e it van con is. You, we y they van con are. En inglés hablado casi siempre se contrae: I am → I\'m.',
  affirmative: [
    { en: "I'm Sandra.", es: 'Soy Sandra.' },
    { en: "I'm a survivor.", es: 'Soy superviviente.', note: 'Delante de un papel o profesión en singular se pone a: a survivor.' },
    { en: 'She is tired.', es: 'Ella está cansada.' },
    { en: 'We are in the shelter.', es: 'Estamos en el refugio.', note: 'in the shelter = en el refugio. Apréndelo como bloque.' },
  ],
  table: {
    head: ['Forma completa', 'Contracción', 'Español'],
    rows: [
      ['I am', "I'm", 'yo soy / estoy'],
      ['you are', "you're", 'tú eres / estás · vosotros sois / estáis'],
      ['he is', "he's", 'él es / está'],
      ['she is', "she's", 'ella es / está'],
      ['it is', "it's", 'es / está (cosas, animales, el tiempo)'],
      ['we are', "we're", 'nosotros somos / estamos'],
      ['they are', "they're", 'ellos son / están'],
    ],
  },
  examples: [
    { en: 'He is Spanish.', es: 'Él es español.' },
    { en: "It's cold.", es: 'Hace frío.', note: 'Para el tiempo, el sujeto es it.' },
    { en: "I'm cold.", es: 'Tengo frío.' },
    { en: "I'm hungry.", es: 'Tengo hambre.' },
    { en: "I'm 25.", es: 'Tengo 25 años.' },
    { en: 'They are safe.', es: 'Están a salvo.' },
    { en: 'You are here.', es: 'Estás aquí. / Estáis aquí.' },
    { en: 'She is happy.', es: 'Ella está contenta.' },
  ],
  errors: [
    { wrong: 'Am tired.', right: "I'm tired.", why: 'En español puedes decir "Estoy cansada" sin "yo". En inglés el sujeto es obligatorio.' },
    { wrong: 'Is cold.', right: "It's cold.", why: 'Para el tiempo también hace falta sujeto: it.' },
    { wrong: 'I have 25 years.', right: "I'm 25.", why: 'La edad se dice con be, no con have.' },
    { wrong: 'I have hungry.', right: "I'm hungry.", why: 'Tener hambre o frío se dice con be: I\'m hungry, I\'m cold.' },
    { wrong: 'They is safe.', right: 'They are safe.', why: 'They va siempre con are.' },
  ],
  comparison: {
    title: 'Ser y estar = be',
    body: 'En español eliges entre ser y estar. En inglés no: los dos son be. "Soy española" y "estoy cansada" usan el mismo verbo: I\'m Spanish, I\'m tired. El significado lo da lo que va detrás.',
  },
  simpler: [
    'Be es el verbo que une a alguien con cómo es, cómo está o dónde está. Cambia según quién: I → am. He, she, it → is. You, we, they → are.',
    'Truco de las tres cajas. Caja AM: solo cabe I. Caja IS: una sola persona o cosa que no seas tú ni la persona con la que hablas (he, she, it). Caja ARE: todo lo demás (you, we, they). Antes de escribir, pregúntate en qué caja está tu sujeto.',
  ],
  vocab: ['v-be', 'v-tired', 'v-happy', 'v-cold', 'v-hungry', 'v-safe', 'v-spanish', 'v-survivor', 'v-shelter', 'v-here'],
  concepts: [
    { id: 'c-be-i', kind: 'grammar', prompt: 'BE con I (forma completa)', answers: ['am'] },
    { id: 'c-be-she', kind: 'grammar', prompt: 'BE con she (forma completa)', answers: ['is'] },
    { id: 'c-be-they', kind: 'grammar', prompt: 'BE con they (forma completa)', answers: ['are'] },
    { id: 'c-be-tired', kind: 'expression', prompt: 'Estoy cansada.', answers: ["I'm tired", 'I am tired'] },
    { id: 'c-be-age', kind: 'expression', prompt: 'Tengo 25 años.', answers: ["I'm 25", 'I am 25', "I'm twenty-five", 'I am twenty-five'], note: 'La edad va con be.' },
    { id: 'c-be-weather', kind: 'expression', prompt: 'Hace frío.', answers: ["It's cold", 'It is cold'] },
    { id: 'c-be-hungry', kind: 'expression', prompt: 'Tengo hambre.', answers: ["I'm hungry", 'I am hungry'] },
    { id: 'c-be-shelter', kind: 'expression', prompt: 'Ellos están en el refugio.', answers: ["They're in the shelter", 'They are in the shelter'] },
  ],
  guided: [
    { id: 'l2-g1', type: 'choice', instruction: 'Completa', prompt: 'She ___ tired.', options: ['am', 'is', 'are'], answer: 1, hint: 'She = una sola persona → caja IS.', explain: 'He, she e it van con is.', tags: ['be-agreement'] },
    { id: 'l2-g2', type: 'choice', instruction: 'Completa', prompt: 'We ___ in the shelter.', options: ['am', 'is', 'are'], answer: 2, hint: 'We → caja ARE.', explain: 'You, we y they van con are.', tags: ['be-agreement'] },
    { id: 'l2-g3', type: 'fill', instruction: 'Escribe la forma de be', before: 'I', after: 'Spanish.', es: 'Soy española.', answers: ['am'], hint: 'I solo tiene una caja: AM.', explain: 'I va con am.', tags: ['be-agreement'] },
    { id: 'l2-g4', type: 'fill', instruction: 'Escribe la forma de be', before: 'It', after: 'cold.', es: 'Hace frío.', answers: ['is'], explain: 'It va con is.', tags: ['be-agreement'] },
    { id: 'l2-g5', type: 'order', instruction: 'Ordena las palabras', tokens: ['tired.', "I'm"], answers: ["I'm tired"], es: 'Estoy cansada.', explain: 'Sujeto + be + estado.', tags: ['word-order'] },
    { id: 'l2-g6', type: 'order', instruction: 'Ordena las palabras', tokens: ['safe.', 'are', 'They'], answers: ['They are safe'], es: 'Están a salvo.', explain: 'Sujeto (They) + are + safe.', tags: ['word-order'] },
  ],
  independent: [
    { id: 'l2-i1', type: 'choice', instruction: '¿Cómo se dice "Tengo hambre"?', prompt: 'Tengo hambre.', options: ['I have hungry.', "I'm hungry.", 'I hungry.'], answer: 1, explain: 'Tener hambre = be hungry.', tags: ['be-age'] },
    { id: 'l2-i2', type: 'translate', instruction: 'Escribe en inglés', es: 'Tengo 25 años.', answers: ["I'm 25", 'I am 25', "I'm twenty-five", 'I am twenty-five'], explain: 'La edad va con be: I\'m 25.', tags: ['be-age'] },
    { id: 'l2-i3', type: 'translate', instruction: 'Escribe en inglés', es: 'Hace frío.', answers: ["It's cold", 'It is cold'], explain: 'Para el tiempo: It\'s cold.', tags: ['missing-subject'] },
    { id: 'l2-i4', type: 'spot', instruction: 'Toca la palabra incorrecta', tokens: ['They', 'is', 'in', 'the', 'shelter.'], wrong: 1, explain: 'They va con are: They are in the shelter.', tags: ['be-agreement'] },
    { id: 'l2-i5', type: 'fix', instruction: 'Corrige la frase', wrongSentence: 'Is cold.', answers: ["It's cold", 'It is cold'], explain: 'Falta el sujeto it.', tags: ['missing-subject'] },
    { id: 'l2-i6', type: 'build', instruction: 'Construye la frase (sobran palabras)', tokens: ['I', 'have', 'am', 'hungry.', 'years'], answers: ['I am hungry'], es: 'Tengo hambre.', explain: 'Tener hambre = be hungry. have y years sobran.', tags: ['be-age'] },
  ],
  final: [
    { id: 'l2-f1', type: 'choice', instruction: 'Completa', prompt: 'He ___ a survivor.', options: ['am', 'is', 'are'], answer: 1, explain: 'He va con is.', tags: ['be-agreement'] },
    { id: 'l2-f2', type: 'fill', instruction: 'Escribe la forma de be', before: 'You', after: 'safe here.', es: 'Aquí estás a salvo.', answers: ['are'], explain: 'You va con are.', tags: ['be-agreement'] },
    { id: 'l2-f3', type: 'translate', instruction: 'Escribe en inglés', es: 'Estamos en el refugio.', answers: ["We're in the shelter", 'We are in the shelter'], explain: 'We are in the shelter.', tags: ['missing-subject'] },
    { id: 'l2-f4', type: 'fix', instruction: 'Corrige la frase', wrongSentence: 'They is tired.', answers: ["They're tired", 'They are tired'], explain: 'They va con are.', tags: ['be-agreement'] },
    { id: 'l2-f5', type: 'order', instruction: 'Ordena las palabras', tokens: ['Spanish.', 'is', 'She'], answers: ['She is Spanish'], es: 'Ella es española.', explain: 'Sujeto + be + nacionalidad.', tags: ['word-order'] },
    { id: 'l2-f6', type: 'translate', instruction: 'Escribe en inglés', es: 'Soy Sandra.', answers: ["I'm Sandra", 'I am Sandra'], explain: 'Hace falta el sujeto: I\'m Sandra.', tags: ['missing-subject'] },
  ],
};

export const L_BE_NEG_Q: Lesson = {
  id: 'pre-a1-u1-l3',
  level: 'PRE_A1',
  unit: 'pre-a1-u1',
  category: 'grammar',
  title: 'TO BE: negativa y pregunta',
  room: 'Preguntas en la frecuencia',
  objectives: [
    'Negar con am not, isn\'t y aren\'t',
    'Hacer preguntas cambiando el orden',
    'Responder con respuestas cortas',
  ],
  prerequisites: ['pre-a1-u1-l2'],
  intro:
    'Por la radio te preguntan: "Are you safe?" Para entenderlo y responder, necesitas saber negar y preguntar con be. La buena noticia: no hace falta ningún verbo nuevo.',
  meaning:
    'La negativa dice que algo no es o no está: "I\'m not tired" (no estoy cansada). La pregunta pide información: "Are you tired?" (¿estás cansada?).',
  when: [
    'Para negar estados, lugares o identidades: It isn\'t cold.',
    'Para preguntar cómo está alguien o dónde está: Are they here?',
    'Para contestar rápido con sí o no: Yes, I am. / No, I\'m not.',
  ],
  how:
    'Negativa: pon not justo detrás de am, is o are. Pregunta: pasa am, is o are delante del sujeto. Respuesta corta: Yes / No + pronombre + be.',
  negative: [
    { en: "I'm not tired.", es: 'No estoy cansada.', note: 'No existe "amn\'t": se dice I\'m not.' },
    { en: "It isn't cold.", es: 'No hace frío.' },
    { en: "They aren't here.", es: 'No están aquí.' },
  ],
  interrogative: [
    { en: 'Are you safe? — Yes, I am.', es: '¿Estás a salvo? — Sí.' },
    { en: "Is she Spanish? — No, she isn't.", es: '¿Es española? — No.' },
    { en: 'Are they in the shelter? — Yes, they are.', es: '¿Están en el refugio? — Sí.' },
  ],
  table: {
    head: ['Afirmativa', 'Negativa', 'Pregunta'],
    rows: [
      ['I am', "I'm not", 'Am I…?'],
      ['you are', "you aren't · you're not", 'Are you…?'],
      ['he is', "he isn't · he's not", 'Is he…?'],
      ['she is', "she isn't · she's not", 'Is she…?'],
      ['it is', "it isn't · it's not", 'Is it…?'],
      ['we are', "we aren't · we're not", 'Are we…?'],
      ['they are', "they aren't · they're not", 'Are they…?'],
    ],
  },
  examples: [
    { en: "We aren't hungry.", es: 'No tenemos hambre.' },
    { en: 'Is it cold? — Yes, it is.', es: '¿Hace frío? — Sí.' },
    { en: 'Are you cold?', es: '¿Tienes frío?' },
    { en: "He isn't here.", es: 'Él no está aquí.' },
    { en: 'Am I safe here?', es: '¿Estoy a salvo aquí?' },
  ],
  errors: [
    { wrong: 'I not am tired.', right: "I'm not tired.", why: 'not va después de be, no antes.' },
    { wrong: 'I amn\'t tired.', right: "I'm not tired.", why: 'am no tiene contracción con not. Se dice I\'m not.' },
    { wrong: 'You are safe?', right: 'Are you safe?', why: 'En español la pregunta solo cambia la entonación. En inglés cambias el orden: be va primero.' },
    { wrong: 'Yes, I\'m.', right: 'Yes, I am.', why: 'Las respuestas cortas afirmativas no se contraen.' },
  ],
  comparison: {
    title: '¿Estás cansada? vs Are you tired?',
    body: 'En español escribes la misma frase con ¿ ? y cambias el tono. En inglés las palabras cambian de sitio: You are tired → Are you tired? El signo de interrogación solo va al final.',
  },
  simpler: [
    'Para decir que NO: pon not justo detrás de am, is o are. Para preguntar: coge am, is o are y ponlo al principio.',
    'Imagina la frase como vagones de tren: You | are | safe. Para preguntar, el vagón "are" pasa a ser la locomotora: Are | you | safe? Para negar, enganchas el vagón "not" detrás de "are": You | are | not | safe.',
  ],
  vocab: ['v-yes-no'],
  concepts: [
    { id: 'c-neg-i', kind: 'expression', prompt: 'No estoy cansada.', answers: ["I'm not tired", 'I am not tired'] },
    { id: 'c-q-you', kind: 'expression', prompt: '¿Estás a salvo?', answers: ['Are you safe'] },
    { id: 'c-short-yes', kind: 'expression', prompt: 'Sí (respuesta corta a "Are you…?")', answers: ['Yes, I am'] },
    { id: 'c-neg-it', kind: 'expression', prompt: 'No hace frío.', answers: ["It isn't cold", "It's not cold", 'It is not cold'] },
    { id: 'c-q-they', kind: 'expression', prompt: '¿Están ellos aquí?', answers: ['Are they here'] },
    { id: 'c-short-no', kind: 'expression', prompt: 'No (respuesta corta a "Is she…?")', answers: ["No, she isn't", "No, she's not"] },
  ],
  guided: [
    { id: 'l3-g1', type: 'choice', instruction: 'Elige la negativa de "She is cold."', prompt: 'She is cold.', options: ['She not is cold.', "She isn't cold.", "She aren't cold."], answer: 1, hint: 'not va detrás de is.', explain: "is + not = isn't.", tags: ['be-negative-order'] },
    { id: 'l3-g2', type: 'fill', instruction: 'Completa la negativa', before: 'I am', after: 'hungry.', es: 'No tengo hambre.', answers: ['not'], explain: 'I am not hungry.', tags: ['be-negative-order'] },
    { id: 'l3-g3', type: 'order', instruction: 'Ordena la pregunta', tokens: ['safe?', 'you', 'Are'], answers: ['Are you safe'], es: '¿Estás a salvo?', hint: 'be va primero.', explain: 'Be + sujeto + resto.', tags: ['be-question-order'] },
    { id: 'l3-g4', type: 'choice', instruction: 'Responde', prompt: 'Are you tired? — Yes, ___', options: ["I'm.", 'I am.', 'I are.'], answer: 1, explain: 'Respuesta corta afirmativa sin contracción: Yes, I am.', tags: ['short-answer'] },
  ],
  independent: [
    { id: 'l3-i1', type: 'translate', instruction: 'Escribe en inglés', es: 'No están aquí.', answers: ["They aren't here", "They're not here", 'They are not here'], explain: "They aren't here.", tags: ['be-negative-order'] },
    { id: 'l3-i2', type: 'spot', instruction: 'Toca la palabra incorrecta', tokens: ['I', "amn't", 'tired.'], wrong: 1, explain: "No existe amn't: I'm not tired.", tags: ['be-negative-order'] },
    { id: 'l3-i3', type: 'fix', instruction: 'Corrige la pregunta', wrongSentence: 'You are tired?', answers: ['Are you tired'], explain: 'En la pregunta, be va primero.', tags: ['be-question-order'] },
    { id: 'l3-i4', type: 'build', instruction: 'Construye la pregunta (sobran palabras)', tokens: ['Is', 'she', 'Spanish?', 'are', 'not'], answers: ['Is she Spanish'], es: '¿Es ella española?', explain: 'Is + she + Spanish?', tags: ['be-question-order'] },
    { id: 'l3-i5', type: 'choice', instruction: 'Responde', prompt: "Is it cold? — No, ___", options: ["it isn't.", 'it not.', "it aren't."], answer: 0, explain: "It va con is: No, it isn't.", tags: ['short-answer'] },
    { id: 'l3-i6', type: 'translate', instruction: 'Escribe en inglés', es: '¿Estamos a salvo?', answers: ['Are we safe'], explain: 'Are + we + safe?', tags: ['be-question-order'] },
  ],
  final: [
    { id: 'l3-f1', type: 'choice', instruction: 'Elige la negativa', prompt: 'They ___ in the shelter.', options: ["aren't", "isn't", 'not'], answer: 0, explain: "They + are + not = aren't.", tags: ['be-agreement'] },
    { id: 'l3-f2', type: 'fix', instruction: 'Corrige la frase', wrongSentence: 'I not am Spanish.', answers: ["I'm not Spanish", 'I am not Spanish'], explain: 'not va detrás de am.', tags: ['be-negative-order'] },
    { id: 'l3-f3', type: 'translate', instruction: 'Escribe en inglés', es: '¿Tienes frío?', answers: ['Are you cold'], explain: 'Tener frío = be cold. Pregunta: Are you cold?', tags: ['be-question-order'] },
    { id: 'l3-f4', type: 'order', instruction: 'Ordena la pregunta', tokens: ['here?', 'he', 'Is'], answers: ['Is he here'], es: '¿Está él aquí?', explain: 'Is + he + here?', tags: ['be-question-order'] },
    { id: 'l3-f5', type: 'fill', instruction: 'Completa la respuesta corta', before: "Are you hungry? — No, I'm", after: '.', answers: ['not'], explain: "No, I'm not.", tags: ['short-answer'] },
    { id: 'l3-f6', type: 'translate', instruction: 'Escribe en inglés', es: 'Ella no está cansada.', answers: ["She isn't tired", "She's not tired", 'She is not tired'], explain: "She isn't tired.", tags: ['be-negative-order'] },
  ],
};

export const UNIT1: Unit = {
  id: 'pre-a1-u1',
  level: 'PRE_A1',
  title: 'La primera noche',
  building: 'El búnker',
  lessons: [L_PRONOUNS.id, L_BE_AFF.id, L_BE_NEG_Q.id],
  horde: {
    title: 'Horda de la Primera Noche',
    passPct: 80,
    exercises: [
      { id: 'h1-1', type: 'choice', instruction: 'Elige el pronombre', prompt: 'Ana and Luis', options: ['we', 'they', 'she'], answer: 1, explain: 'Varias personas sin ti: they.', tags: ['pronoun-choice'] },
      { id: 'h1-2', type: 'translate', instruction: 'Escribe en inglés', es: 'Ella está a salvo.', answers: ["She's safe", 'She is safe'], explain: 'She is safe.', tags: ['be-agreement'] },
      { id: 'h1-3', type: 'fix', instruction: 'Corrige la frase', wrongSentence: 'He are hungry.', answers: ["He's hungry", 'He is hungry'], explain: 'He va con is.', tags: ['be-agreement'] },
      { id: 'h1-4', type: 'order', instruction: 'Ordena la pregunta', tokens: ['Spanish?', 'you', 'Are'], answers: ['Are you Spanish'], es: '¿Eres español?', explain: 'Are + you + Spanish?', tags: ['be-question-order'] },
      { id: 'h1-5', type: 'choice', instruction: 'Elige el pronombre', prompt: 'the radio', options: ['she', 'it', 'he'], answer: 1, explain: 'Una cosa: it.', tags: ['it-for-things'] },
      { id: 'h1-6', type: 'fill', instruction: 'Completa la negativa', before: 'We', after: 'tired.', es: 'No estamos cansados.', answers: ["aren't", 'are not'], explain: "We aren't tired.", tags: ['be-negative-order'] },
      { id: 'h1-7', type: 'translate', instruction: 'Escribe en inglés', es: 'Tengo hambre.', answers: ["I'm hungry", 'I am hungry'], explain: 'Tener hambre = be hungry.', tags: ['be-age'] },
      { id: 'h1-8', type: 'choice', instruction: 'Responde', prompt: 'Is she happy? — Yes, ___', options: ["she's.", 'she is.', 'she are.'], answer: 1, explain: 'Respuesta corta afirmativa sin contracción.', tags: ['short-answer'] },
      { id: 'h1-9', type: 'translate', instruction: 'Escribe en inglés', es: 'No hace frío.', answers: ["It isn't cold", "It's not cold", 'It is not cold'], explain: "It isn't cold.", tags: ['missing-subject'] },
      { id: 'h1-10', type: 'spot', instruction: 'Toca la palabra incorrecta', tokens: ['They', 'is', 'safe.'], wrong: 1, explain: 'They va con are.', tags: ['be-agreement'] },
    ],
  },
};

export const LESSONS: Lesson[] = [L_PRONOUNS, L_BE_AFF, L_BE_NEG_Q];
