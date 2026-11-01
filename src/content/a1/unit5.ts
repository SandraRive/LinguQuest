import type { Lesson, Unit } from '../schema';
import { bd, ch, fl, fx, ls, mt, or, sp, tr } from '../helpers';

/* A1 · Unidad 1 · "Vida en el bosque": Present Simple, Do/Does, frecuencia y rutinas. */

export const L_PS: Lesson = {
  id: 'a1-u1-l17', level: 'A1', unit: 'a1-u1', category: 'grammar',
  title: 'Present Simple (afirmativo)', room: 'El diario del campamento',
  objectives: ['Hablar de lo que haces habitualmente', 'Añadir -s con he, she e it', 'Escribir bien -s, -es e -ies'],
  prerequisites: ['pre-a1-u4-l16'],
  intro: 'Habéis llegado al campamento del bosque. Aquí cada uno tiene su tarea: Tom vigila la puerta, Ana cocina, tú estudias los mensajes de radio. Para contarlo necesitas el Present Simple, el tiempo de las costumbres.',
  meaning: 'El Present Simple sirve para hablar de lo que haces de forma habitual, de rutinas y de cosas que son siempre verdad: "I work in the camp" (trabajo en el campamento), "She lives in the forest" (vive en el bosque).',
  when: [
    'Rutinas y costumbres: I get up at seven.',
    'Cosas que son verdad de forma general: Water is cold in winter. Dogs like meat.',
    'Gustos: I like coffee.',
  ],
  how: 'Con I, you, we, they: sujeto + verbo tal cual (I work). Con he, she, it: sujeto + verbo + s (she works). Ortografía: verbos en -s, -sh, -ch, -x, -o añaden -es (watch → watches, go → goes). Consonante + y → -ies (study → studies). Have es irregular: he has.',
  table: {
    head: ['Sujeto', 'work', 'go', 'study', 'have'],
    rows: [
      ['I', 'work', 'go', 'study', 'have'],
      ['you', 'work', 'go', 'study', 'have'],
      ['he / she / it', 'works', 'goes', 'studies', 'has'],
      ['we', 'work', 'go', 'study', 'have'],
      ['they', 'work', 'go', 'study', 'have'],
    ],
  },
  affirmative: [
    { en: 'I work in the camp.', es: 'Trabajo en el campamento.' },
    { en: 'She works in the camp.', es: 'Ella trabaja en el campamento.', note: 'he, she, it → +s' },
    { en: 'Tom watches the gate.', es: 'Tom vigila la puerta.', note: 'watch termina en -ch → watches' },
    { en: 'Ana studies English.', es: 'Ana estudia inglés.', note: 'study → studies' },
  ],
  examples: [
    { en: 'We live in the forest.', es: 'Vivimos en el bosque.' },
    { en: 'The dog sleeps by the fire.', es: 'El perro duerme junto al fuego.', note: 'the dog = it → sleeps' },
    { en: 'My father cooks dinner.', es: 'Mi padre cocina la cena.' },
    { en: 'They drink water.', es: 'Beben agua.' },
    { en: 'Kate has a bike.', es: 'Kate tiene una bici.', note: 'have → has' },
    { en: 'I like coffee.', es: 'Me gusta el café.', note: 'En inglés el que "gusta" es el sujeto: I like.' },
  ],
  errors: [
    { wrong: 'She work in the camp.', right: 'She works in the camp.', why: 'Con he, she, it el verbo lleva -s. Es el error más frecuente en todos los niveles.' },
    { wrong: 'He haves a car.', right: 'He has a car.', why: 'have es irregular: con he, she, it se dice has.' },
    { wrong: 'Me like coffee.', right: 'I like coffee.', why: '"Me gusta" se dice con el sujeto I: I like.' },
    { wrong: 'They works.', right: 'They work.', why: 'La -s es solo para he, she, it. Con they, nada.' },
  ],
  comparison: { title: 'La -s de he, she, it', body: 'En español cada persona tiene su terminación (trabajo, trabajas, trabaja…). En inglés casi todo es igual: work, work, work… salvo he, she, it, que llevan -s. Solo hay que recordar esa -s.' },
  simpler: [
    'El verbo se queda igual con todos (I work, you work, we work, they work) menos con he, she, it, que llevan una -s: she works.',
    'Imagina que he, she e it son "una sola persona de la que hablas" y siempre llevan una mochila con una -s dentro. Cuando aparecen, la -s se pega al verbo: he works, she goes, it sleeps.',
  ],
  vocab: ['v-work', 'v-live', 'v-like', 'v-eat', 'v-drink', 'v-go', 'v-watch', 'v-study', 'v-cook', 'v-sleep'],
  concepts: [
    { id: 'c-ps-she', kind: 'grammar', prompt: 'work con she', answers: ['works', 'she works'] },
    { id: 'c-ps-go', kind: 'grammar', prompt: 'go con he', answers: ['goes', 'he goes'] },
    { id: 'c-ps-study', kind: 'grammar', prompt: 'study con she', answers: ['studies', 'she studies'] },
    { id: 'c-ps-have', kind: 'grammar', prompt: 'have con it', answers: ['has', 'it has'] },
    { id: 'c-ps-like', kind: 'expression', prompt: 'Me gusta el café.', answers: ['I like coffee'] },
    { id: 'c-ps-live', kind: 'expression', prompt: 'Ella vive en el bosque.', answers: ['She lives in the forest'] },
  ],
  guided: [
    ch('l17-g1', 'Completa', 'She ___ in the camp.', ['work', 'works', 'working'], 1, 'she → works.', ['third-person-s'], 'she lleva -s.'),
    ch('l17-g2', 'Completa', 'They ___ water.', ['drink', 'drinks'], 0, 'they → sin -s.', ['third-person-s']),
    ch('l17-g3', 'Elige la forma correcta de "watch" con he', 'he ___', ['watchs', 'watches', 'watchies'], 1, '-ch → -es.', ['third-person-s']),
    mt('l17-g4', [['go', 'goes'], ['study', 'studies'], ['have', 'has'], ['sleep', 'sleeps']], 'go → goes, study → studies, have → has, sleep → sleeps.', ['third-person-s'], 'Une cada verbo con su forma para he/she/it'),
  ],
  independent: [
    fl('l17-i1', 'Escribe la forma correcta de "live"', 'Ana', 'in the forest.', ['lives'], 'Ana = she → lives.', ['third-person-s'], 'Ana vive en el bosque.'),
    tr('l17-i2', 'Me gusta el café.', ['I like coffee'], 'I like coffee.', ['word-order']),
    fx('l17-i3', 'He haves a bike.', ['He has a bike'], 'have → has.', ['third-person-s']),
    sp('l17-i4', 'Toca la palabra incorrecta', ['My', 'sister', 'study', 'English.'], 2, 'my sister = she → studies.', ['third-person-s']),
    tr('l17-i5', 'Tom vigila la puerta.', ['Tom watches the gate', 'Tom watches the door'], 'Tom watches the gate.', ['third-person-s']),
  ],
  final: [
    ch('l17-f1', 'Completa', 'The dog ___ by the fire.', ['sleep', 'sleeps'], 1, 'the dog = it → sleeps.', ['third-person-s']),
    tr('l17-f2', 'Ella va al río.', ['She goes to the river'], 'go → goes.', ['third-person-s']),
    fx('l17-f3', 'They works in the camp.', ['They work in the camp'], 'they → sin -s.', ['third-person-s']),
    tr('l17-f4', 'Mi padre cocina la cena.', ['My father cooks dinner', 'My father cooks the dinner'], 'My father cooks dinner.', ['third-person-s']),
    or('l17-f5', ['English.', 'studies', 'Ana'], ['Ana studies English'], 'Ana estudia inglés.', 'Ana studies English.'),
  ],
};

export const L_DO: Lesson = {
  id: 'a1-u1-l18', level: 'A1', unit: 'a1-u1', category: 'grammar',
  title: 'Do / Does: negativa y preguntas', room: 'Interrogatorio en la puerta',
  objectives: ['Negar con don\'t y doesn\'t', 'Preguntar con Do y Does', 'Saber que con does el verbo pierde la -s'],
  prerequisites: ['a1-u1-l17'],
  intro: 'Llega un desconocido a la puerta del campamento y Tom le hace preguntas: "Do you live near here? Does your group have food?" Para preguntar y negar en Present Simple necesitas un ayudante: do o does.',
  meaning: 'Do y does no se traducen: son verbos auxiliares que sirven para hacer preguntas y negativas en Present Simple. Don\'t = do not. Doesn\'t = does not.',
  when: [
    'Para negar costumbres: I don\'t eat meat.',
    'Para preguntar por costumbres o gustos: Do you like coffee?',
    'Respuestas cortas: Yes, I do. / No, she doesn\'t.',
  ],
  how: 'Negativa: sujeto + don\'t / doesn\'t + verbo sin -s. Pregunta: Do / Does + sujeto + verbo sin -s? Con I, you, we, they → do. Con he, she, it → does. La -s se va a does: she works → she doesn\'t work → Does she work?',
  negative: [
    { en: "I don't eat meat.", es: 'No como carne.' },
    { en: "She doesn't work here.", es: 'Ella no trabaja aquí.', note: 'doesn\'t + work (sin -s)' },
    { en: "They don't live in the city.", es: 'No viven en la ciudad.' },
  ],
  interrogative: [
    { en: 'Do you like coffee? — Yes, I do.', es: '¿Te gusta el café? — Sí.' },
    { en: "Does he speak English? — No, he doesn't.", es: '¿Habla inglés? — No.' },
    { en: 'Do they live near here? — Yes, they do.', es: '¿Viven cerca de aquí? — Sí.' },
  ],
  table: {
    head: ['Sujeto', 'Negativa', 'Pregunta', 'Respuesta corta'],
    rows: [
      ['I / you / we / they', "don't work", 'Do … work?', "Yes, I do. / No, I don't."],
      ['he / she / it', "doesn't work", 'Does … work?', "Yes, she does. / No, she doesn't."],
    ],
  },
  examples: [
    { en: "My brother doesn't cook.", es: 'Mi hermano no cocina.' },
    { en: 'Does the dog sleep inside?', es: '¿El perro duerme dentro?' },
    { en: "We don't go out at night.", es: 'No salimos de noche.' },
    { en: 'Do you have a map?', es: '¿Tienes un mapa?' },
    { en: "Does Kate study English? — Yes, she does.", es: '¿Kate estudia inglés? — Sí.' },
  ],
  errors: [
    { wrong: "She doesn't works.", right: "She doesn't work.", why: 'La -s ya está en does. El verbo va sin -s.' },
    { wrong: 'Do she like coffee?', right: 'Does she like coffee?', why: 'Con he, she, it se pregunta con does.' },
    { wrong: 'You like coffee?', right: 'Do you like coffee?', why: 'En español basta con la entonación; en inglés hace falta do al principio.' },
    { wrong: "I no eat meat.", right: "I don't eat meat.", why: 'Para negar un verbo normal se usa don\'t, no "no".' },
  ],
  comparison: { title: 'Be vs Do', body: 'Con be (am, is, are) se pregunta cambiando el orden: Are you tired? Con los demás verbos hace falta do/does: Do you work? Nunca juntes los dos: "Do you are…?" está mal.' },
  simpler: [
    'Para negar o preguntar con verbos normales pon un ayudante: do (I, you, we, they) o does (he, she, it). Y cuando aparece does, el verbo pierde la -s.',
    'Piensa que la -s de she works "se muda" a does. Solo puede haber una -s en la frase: she works → she does + work → she doesn\'t work / Does she work?',
  ],
  vocab: ['v-speak'],
  concepts: [
    { id: 'c-do-neg-she', kind: 'expression', prompt: 'Ella no trabaja aquí.', answers: ["She doesn't work here", 'She does not work here'] },
    { id: 'c-do-q-you', kind: 'expression', prompt: '¿Te gusta el café?', answers: ['Do you like coffee'] },
    { id: 'c-do-q-he', kind: 'expression', prompt: '¿Habla inglés (él)?', answers: ['Does he speak English'] },
    { id: 'c-do-short', kind: 'expression', prompt: 'Sí (respuesta corta a "Does she…?")', answers: ['Yes, she does'] },
    { id: 'c-do-neg-i', kind: 'expression', prompt: 'No como carne.', answers: ["I don't eat meat", 'I do not eat meat'] },
  ],
  guided: [
    ch('l18-g1', 'Completa', '___ she like coffee?', ['Do', 'Does', 'Is'], 1, 'she → Does.', ['do-does'], 'she va con does.'),
    ch('l18-g2', 'Completa', "He doesn't ___ here.", ['work', 'works'], 0, 'Con doesn\'t el verbo va sin -s.', ['third-person-s']),
    fl('l18-g3', 'Escribe don\'t o doesn\'t', 'We', 'go out at night.', ["don't", 'do not'], 'we → don\'t.', ['do-does'], 'No salimos de noche.'),
    or('l18-g4', ['you', 'Do', 'map?', 'have', 'a'], ['Do you have a map'], '¿Tienes un mapa?', 'Do + you + have + a map?', ['do-does']),
  ],
  independent: [
    fx('l18-i1', "She doesn't works here.", ["She doesn't work here", 'She does not work here'], 'doesn\'t + work.', ['third-person-s']),
    tr('l18-i2', '¿Viven cerca de aquí?', ['Do they live near here'], 'Do they live near here?', ['do-does']),
    ch('l18-i3', 'Responde', 'Does Tom cook? — No, ___', ["he don't.", "he doesn't.", "he isn't."], 1, "No, he doesn't.", ['short-answer']),
    sp('l18-i4', 'Toca la palabra incorrecta', ['Do', 'she', 'speak', 'English?'], 0, 'she → Does.', ['do-does']),
    fx('l18-i5', 'You like coffee?', ['Do you like coffee'], 'Hace falta Do.', ['do-does']),
  ],
  final: [
    tr('l18-f1', 'No como carne.', ["I don't eat meat", 'I do not eat meat'], "I don't eat meat.", ['do-does']),
    ch('l18-f2', 'Completa', '___ your parents live in Madrid?', ['Does', 'Do', 'Are'], 1, 'your parents = they → Do.', ['do-does']),
    tr('l18-f3', '¿Kate estudia inglés?', ['Does Kate study English'], 'Does + Kate + study?', ['do-does']),
    fx('l18-f4', "My brother don't cook.", ["My brother doesn't cook", 'My brother does not cook'], 'my brother = he → doesn\'t.', ['do-does']),
    ch('l18-f5', 'Responde', 'Do you like dogs? — Yes, ___', ['I like.', 'I do.', 'I am.'], 1, 'Yes, I do.', ['short-answer']),
  ],
};

export const L_FREQ: Lesson = {
  id: 'a1-u1-l19', level: 'A1', unit: 'a1-u1', category: 'grammar',
  title: 'Adverbios de frecuencia', room: 'Turnos de guardia',
  objectives: ['Decir con qué frecuencia haces algo', 'Colocar el adverbio antes del verbo', 'Colocarlo después de be'],
  prerequisites: ['a1-u1-l18'],
  intro: 'En el tablón de guardias hay que saber quién vigila siempre, quién a veces y quién nunca. Para eso están los adverbios de frecuencia: always, usually, often, sometimes, never.',
  meaning: 'Los adverbios de frecuencia dicen cada cuánto pasa algo: always (siempre, 100 %), usually (normalmente), often (a menudo), sometimes (a veces) y never (nunca, 0 %).',
  when: ['Con el Present Simple, para hablar de rutinas: I always get up at seven.', 'Para preguntar: How often do you…? (¿Con qué frecuencia…?)'],
  how: 'Van ANTES del verbo normal: I always eat here. She never drinks coffee. Pero van DESPUÉS de be: I am always tired. He is never late. Never ya es negativo: no se usa con don\'t.',
  table: {
    head: ['Adverbio', 'Español', 'Frecuencia'],
    rows: [
      ['always', 'siempre', '100 %'], ['usually', 'normalmente', '≈ 80 %'], ['often', 'a menudo', '≈ 60 %'],
      ['sometimes', 'a veces', '≈ 30 %'], ['never', 'nunca', '0 %'],
    ],
  },
  examples: [
    { en: 'I always get up early.', es: 'Siempre me levanto pronto.' },
    { en: 'She never drinks coffee.', es: 'Ella nunca bebe café.' },
    { en: 'We often eat fish.', es: 'A menudo comemos pescado.' },
    { en: 'He is always tired.', es: 'Siempre está cansado.', note: 'Con be, el adverbio va detrás.' },
    { en: 'Tom sometimes watches the gate.', es: 'Tom a veces vigila la puerta.' },
    { en: 'How often do you study? — Every day.', es: '¿Con qué frecuencia estudias? — Todos los días.' },
  ],
  errors: [
    { wrong: 'I go always to the river.', right: 'I always go to the river.', why: 'Con verbos normales el adverbio va antes del verbo.' },
    { wrong: 'She always is tired.', right: 'She is always tired.', why: 'Con be el adverbio va detrás.' },
    { wrong: "I don't never eat meat.", right: 'I never eat meat.', why: 'never ya es negativo: no se combina con don\'t.' },
  ],
  comparison: { title: 'Antes del verbo, pero después de be', body: 'Regla rápida: el adverbio "se sienta" justo antes del verbo de acción (I always work), pero si el verbo es be, se sienta detrás (I am always happy).' },
  simpler: [
    'Pon always, usually, often, sometimes o never justo antes del verbo: I never eat meat. Si el verbo es am, is o are, ponlo detrás: I am never late.',
    'Piensa en una escala del 0 al 100: never (0), sometimes, often, usually, always (100). Y para colocarlo: delante de los verbos de acción, detrás de be.',
  ],
  vocab: ['v-always', 'v-usually', 'v-often', 'v-sometimes', 'v-never', 'v-every-day'],
  concepts: [
    { id: 'c-freq-always', kind: 'vocab', prompt: 'siempre', answers: ['always'] },
    { id: 'c-freq-never', kind: 'vocab', prompt: 'nunca', answers: ['never'] },
    { id: 'c-freq-sometimes', kind: 'vocab', prompt: 'a veces', answers: ['sometimes'] },
    { id: 'c-freq-pos', kind: 'expression', prompt: 'Siempre me levanto pronto.', answers: ['I always get up early'] },
    { id: 'c-freq-be', kind: 'expression', prompt: 'Siempre está cansado.', answers: ["He's always tired", 'He is always tired'] },
  ],
  guided: [
    ch('l19-g1', '¿Dónde va "always"?', 'I ___ go ___ to the river.', ['I always go to the river.', 'I go always to the river.'], 0, 'Antes del verbo: always go.', ['frequency-position'], 'Antes del verbo de acción.'),
    ch('l19-g2', '¿Cuál está bien?', 'is + usually', ['She usually is tired.', 'She is usually tired.'], 1, 'Con be, detrás.', ['frequency-position']),
    mt('l19-g3', [['always', 'siempre'], ['often', 'a menudo'], ['sometimes', 'a veces'], ['never', 'nunca']], 'always, often, sometimes, never.'),
    or('l19-g4', ['drinks', 'never', 'She', 'coffee.'], ['She never drinks coffee'], 'Ella nunca bebe café.', 'She never drinks coffee.', ['frequency-position']),
  ],
  independent: [
    fx('l19-i1', 'I eat usually at two.', ['I usually eat at two'], 'usually antes de eat.', ['frequency-position']),
    tr('l19-i2', 'A menudo comemos pescado.', ['We often eat fish'], 'We often eat fish.', ['frequency-position']),
    fx('l19-i3', "I don't never sleep late.", ['I never sleep late'], 'never ya es negativo.', ['frequency-position']),
    sp('l19-i4', 'Toca la palabra mal colocada', ['He', 'always', 'is', 'late.'], 1, 'Con be: He is always late.', ['frequency-position']),
    ls('l19-i5', 'I sometimes watch the gate.', ['siempre', 'a veces', 'nunca'], 1, 'sometimes = a veces.', [], 'Escucha: ¿con qué frecuencia vigila?'),
  ],
  final: [
    tr('l19-f1', 'Nunca salgo de noche.', ['I never go out at night'], 'I never go out at night.', ['frequency-position']),
    tr('l19-f2', 'Siempre está cansado.', ["He's always tired", 'He is always tired'], 'He is always tired.', ['frequency-position']),
    ch('l19-f3', '¿Cuál está bien?', 'often', ['Tom often cooks dinner.', 'Tom cooks often dinner.', 'Often Tom cook dinner.'], 0, 'Tom often cooks dinner.', ['frequency-position']),
    fx('l19-f4', 'She always is happy.', ["She's always happy", 'She is always happy'], 'Con be, detrás.', ['frequency-position']),
    or('l19-f5', ['you', 'often', 'How', 'study?', 'do'], ['How often do you study'], '¿Con qué frecuencia estudias?', 'How often do you study?', ['wh-question']),
  ],
};

export const L_ROUTINES: Lesson = {
  id: 'a1-u1-l20', level: 'A1', unit: 'a1-u1', category: 'communication',
  title: 'Rutinas y la hora', room: 'Un día en el campamento',
  objectives: ['Contar tu rutina diaria', 'Decir y preguntar la hora', 'Usar at, in y on con el tiempo'],
  prerequisites: ['a1-u1-l19'],
  intro: 'Para organizar el campamento hay que saber a qué hora hace cada uno sus tareas: quién se levanta a las seis, quién cocina a la una, quién vigila por la noche.',
  meaning: 'Para contar una rutina se usa el Present Simple con expresiones de tiempo: I get up at seven. We have lunch at two. In the morning, I study.',
  when: ['Para describir tu día: I get up, I have breakfast, I work…', 'Para quedar o planificar: What time is dinner?'],
  how: 'Hora en punto: It\'s seven o\'clock. Preguntar: What time is it? / What time do you get up? Preposiciones: at + hora (at seven), at night; in + parte del día (in the morning, in the afternoon, in the evening); on + día (on Monday, ya lo conoces). have + comida: have breakfast, have lunch, have dinner.',
  table: {
    head: ['Preposición', 'Con', 'Ejemplos'],
    rows: [
      ['at', 'horas y la noche', "at seven o'clock · at night"],
      ['in', 'partes del día, meses', 'in the morning · in the afternoon · in May'],
      ['on', 'días', 'on Monday · on Friday'],
    ],
  },
  examples: [
    { en: "What time is it? — It's eight o'clock.", es: '¿Qué hora es? — Son las ocho en punto.' },
    { en: 'I get up at seven.', es: 'Me levanto a las siete.' },
    { en: 'We have breakfast at eight.', es: 'Desayunamos a las ocho.', note: 'have breakfast = desayunar' },
    { en: 'In the morning, I study English.', es: 'Por la mañana estudio inglés.' },
    { en: 'Tom watches the gate at night.', es: 'Tom vigila la puerta por la noche.' },
    { en: 'What time do you have dinner?', es: '¿A qué hora cenas?' },
  ],
  errors: [
    { wrong: "in seven o'clock", right: "at seven o'clock", why: 'Con las horas se usa at.' },
    { wrong: 'in the night', right: 'at night', why: 'Es una excepción: at night.' },
    { wrong: 'I take breakfast.', right: 'I have breakfast.', why: 'Las comidas van con have: have breakfast, have lunch, have dinner.' },
    { wrong: 'What time is? ', right: 'What time is it?', why: 'Hace falta el sujeto it.' },
  ],
  comparison: { title: 'at / in / on', body: 'De lo más pequeño a lo más grande: at para un momento exacto (at seven), on para un día (on Monday) e in para periodos largos (in the morning, in May).' },
  simpler: [
    'Para las horas usa at (at seven). Para la mañana o la tarde, in (in the morning). Y para la noche, at night.',
    'Cuenta tu día como una lista: I get up at seven. I have breakfast at eight. I work in the morning. I have dinner at nine. I sleep at night. Cambia solo las horas y ya tienes tu rutina.',
  ],
  vocab: ['v-get-up', 'v-breakfast', 'v-lunch', 'v-dinner', 'v-morning', 'v-night', 'v-oclock'],
  concepts: [
    { id: 'c-rt-time', kind: 'expression', prompt: '¿Qué hora es?', answers: ['What time is it'] },
    { id: 'c-rt-seven', kind: 'expression', prompt: 'Son las siete en punto.', answers: ["It's seven o'clock", "It is seven o'clock"] },
    { id: 'c-rt-getup', kind: 'expression', prompt: 'Me levanto a las siete.', answers: ['I get up at seven', "I get up at seven o'clock"] },
    { id: 'c-rt-breakfast', kind: 'expression', prompt: 'desayunar', answers: ['have breakfast'] },
    { id: 'c-rt-night', kind: 'expression', prompt: 'por la noche', answers: ['at night'] },
    { id: 'c-rt-morning', kind: 'expression', prompt: 'por la mañana', answers: ['in the morning'] },
  ],
  guided: [
    ch('l20-g1', 'Completa', "I get up ___ seven o'clock.", ['in', 'at', 'on'], 1, 'Horas con at.', ['time-expressions'], 'Es una hora exacta.'),
    ch('l20-g2', 'Completa', '___ the morning', ['In', 'At', 'On'], 0, 'in the morning.', ['time-expressions']),
    ch('l20-g3', 'Completa', 'Tom watches the gate ___ night.', ['in', 'at'], 1, 'at night (excepción).', ['time-expressions']),
    or('l20-g4', ['time', 'What', 'it?', 'is'], ['What time is it'], '¿Qué hora es?', 'What time is it?', ['wh-question']),
  ],
  independent: [
    tr('l20-i1', 'Desayunamos a las ocho.', ['We have breakfast at eight', "We have breakfast at eight o'clock"], 'have breakfast + at eight.', ['time-expressions']),
    fx('l20-i2', 'I take lunch at two.', ['I have lunch at two'], 'Las comidas van con have.', ['time-expressions']),
    ls('l20-i3', "It's nine o'clock.", ['8:00', '9:00', '5:00'], 1, "nine o'clock = 9:00.", ['numbers'], 'Escucha: ¿qué hora es?'),
    fx('l20-i4', 'in the night', ['at night'], 'at night.', ['time-expressions']),
    bd('l20-i5', ['What', 'time', 'do', 'you', 'get', 'up?', 'does', 'at'], ['What time do you get up'], '¿A qué hora te levantas?', 'What time do you get up?', ['wh-question']),
  ],
  final: [
    tr('l20-f1', '¿Qué hora es?', ['What time is it'], 'What time is it?', ['wh-question']),
    tr('l20-f2', 'Me levanto a las siete.', ['I get up at seven', "I get up at seven o'clock"], 'I get up at seven.', ['time-expressions']),
    ch('l20-f3', 'Completa', 'She studies ___ the afternoon.', ['at', 'on', 'in'], 2, 'in the afternoon.', ['time-expressions']),
    tr('l20-f4', 'Cenamos a las nueve.', ['We have dinner at nine', "We have dinner at nine o'clock"], 'We have dinner at nine.', ['time-expressions']),
    fx('l20-f5', "It's in ten o'clock.", ["It's ten o'clock", "It is ten o'clock"], 'Para decir la hora no hace falta preposición.', ['time-expressions']),
  ],
};

export const UNIT5: Unit = {
  id: 'a1-u1', level: 'A1', title: 'Vida en el bosque', building: 'El campamento del lago',
  lessons: [L_PS.id, L_DO.id, L_FREQ.id, L_ROUTINES.id],
  horde: {
    title: 'Horda del amanecer', passPct: 80,
    exercises: [
      ch('h5-1', 'Completa', 'Kate ___ in the camp.', ['live', 'lives'], 1, 'Kate = she → lives.', ['third-person-s']),
      tr('h5-2', 'Él no come carne.', ["He doesn't eat meat", 'He does not eat meat'], "He doesn't eat meat.", ['do-does']),
      ch('h5-3', 'Completa', '___ you have a map?', ['Does', 'Do', 'Are'], 1, 'you → Do.', ['do-does']),
      fx('h5-4', "She doesn't speaks English.", ["She doesn't speak English", 'She does not speak English'], 'doesn\'t + speak.', ['third-person-s']),
      tr('h5-5', 'Siempre me levanto a las siete.', ['I always get up at seven', "I always get up at seven o'clock"], 'I always get up at seven.', ['frequency-position']),
      fx('h5-6', 'He is late never.', ["He's never late", 'He is never late'], 'Con be, detrás: is never late.', ['frequency-position']),
      ch('h5-7', 'Completa', 'We study ___ the morning.', ['at', 'in', 'on'], 1, 'in the morning.', ['time-expressions']),
      ls('h5-8', 'Tom goes to the river every day.', ['Tom va al río todos los días', 'Tom nunca va al río', 'Tom va al río por la noche'], 0, 'every day = todos los días.', [], 'Escucha y elige qué significa'),
      tr('h5-9', '¿Qué hora es?', ['What time is it'], 'What time is it?', ['wh-question']),
      ch('h5-10', 'Responde', 'Does Ana cook? — Yes, ___', ['she cooks.', 'she does.', 'she is.'], 1, 'Yes, she does.', ['short-answer']),
    ],
  },
};

export const LESSONS_U5 = [L_PS, L_DO, L_FREQ, L_ROUTINES];
