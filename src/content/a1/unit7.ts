import type { Lesson, Unit } from '../schema';
import { bd, ch, fx, ls, mt, or, sp, tr } from '../helpers';

/* A1 · Unidad 3 · "Patrulla": can, Present Continuous, WH questions y situaciones cotidianas. */

export const L_CAN: Lesson = {
  id: 'a1-u3-l25', level: 'A1', unit: 'a1-u3', category: 'grammar',
  title: "Can / Can't", room: 'Habilidades de patrulla',
  objectives: ['Decir lo que sabes y no sabes hacer', 'Pedir permiso y ayuda', 'Saber que can nunca cambia'],
  prerequisites: ['a1-u2-l24'],
  intro: 'Para formar la patrulla hay que saber quién sabe nadar, conducir o trepar: "I can swim. Tom can\'t drive. Can you climb trees?" Can es de los verbos más útiles y de los más fáciles.',
  meaning: 'Can expresa habilidad (saber hacer algo: I can swim = sé nadar), posibilidad y permiso o petición (Can I…? / Can you help me?). Can\'t = cannot (no puedo / no sé).',
  when: ['Habilidades: She can drive.', 'Peticiones: Can you help me?', 'Permiso: Can I have water?'],
  how: 'Sujeto + can / can\'t + verbo tal cual: She can swim. Pregunta: Can + sujeto + verbo? Respuesta corta: Yes, I can. / No, he can\'t. Can es igual con todas las personas (nada de -s) y nunca lleva to detrás.',
  table: {
    head: ['', 'Forma', 'Ejemplo'],
    rows: [
      ['Afirmativa', 'can + verbo', 'I can swim.'],
      ['Negativa', "can't + verbo", "She can't drive."],
      ['Pregunta', 'Can + sujeto + verbo?', 'Can you climb?'],
      ['Respuesta corta', "Yes, … can / No, … can't", "Yes, I can. / No, I can't."],
    ],
  },
  examples: [
    { en: 'I can swim.', es: 'Sé nadar.' },
    { en: "Tom can't drive.", es: 'Tom no sabe conducir.' },
    { en: 'Can you climb trees? — Yes, I can.', es: '¿Sabes trepar a los árboles? — Sí.' },
    { en: 'Can you help me?', es: '¿Me puedes ayudar?' },
    { en: 'Can I have water, please?', es: '¿Me das agua, por favor?' },
    { en: 'She can speak a little English.', es: 'Sabe hablar un poco de inglés.' },
  ],
  errors: [
    { wrong: 'I can to swim.', right: 'I can swim.', why: 'Después de can va el verbo directamente, sin to.' },
    { wrong: 'She cans drive.', right: 'She can drive.', why: 'Can no cambia nunca: no lleva -s.' },
    { wrong: 'She can drives.', right: 'She can drive.', why: 'El verbo después de can tampoco lleva -s.' },
    { wrong: 'Do you can swim?', right: 'Can you swim?', why: 'Can no usa do: se pone delante en la pregunta.' },
  ],
  comparison: { title: 'Saber / poder = can', body: 'En español distinguimos "sé nadar" (habilidad) y "puedo nadar" (posibilidad). En inglés los dos son can: I can swim.' },
  simpler: [
    'Can significa "sé" o "puedo". Va igual con todos (I can, she can) y detrás pones el verbo sin nada más: She can swim.',
    'Can es un verbo vago: nunca cambia, nunca lleva -s, no necesita do ni to. Para preguntar, solo salta delante: You can swim → Can you swim?',
  ],
  vocab: ['v-swim', 'v-drive', 'v-run', 'v-climb', 'v-help', 'v-speak'],
  concepts: [
    { id: 'c-can-swim', kind: 'expression', prompt: 'Sé nadar.', answers: ['I can swim'] },
    { id: 'c-can-neg', kind: 'expression', prompt: 'Tom no sabe conducir.', answers: ["Tom can't drive", 'Tom cannot drive'] },
    { id: 'c-can-help', kind: 'expression', prompt: '¿Me puedes ayudar?', answers: ['Can you help me'] },
    { id: 'c-can-short', kind: 'expression', prompt: 'Sí (respuesta corta a "Can you…?")', answers: ['Yes, I can'] },
    { id: 'c-can-climb', kind: 'vocab', prompt: 'trepar, escalar', answers: ['climb'] },
  ],
  guided: [
    ch('l25-g1', '¿Cuál está bien?', 'Sé nadar.', ['I can to swim.', 'I can swim.', 'I can swimming.'], 1, 'can + verbo, sin to.', ['can-form'], 'Sin to.'),
    ch('l25-g2', 'Completa', 'She ___ drive.', ['cans', 'can', 'can to'], 1, 'can no cambia.', ['can-form']),
    or('l25-g3', ['help', 'you', 'Can', 'me?'], ['Can you help me'], '¿Me puedes ayudar?', 'Can + you + help + me?', ['can-form']),
    ch('l25-g4', 'Responde', 'Can you climb trees? — No, ___', ["I don't.", "I can't.", "I'm not."], 1, "No, I can't.", ['short-answer']),
  ],
  independent: [
    tr('l25-i1', 'Tom no sabe conducir.', ["Tom can't drive", 'Tom cannot drive'], "Tom can't drive.", ['can-form']),
    fx('l25-i2', 'She can drives.', ['She can drive'], 'Después de can, verbo sin -s.', ['can-form']),
    fx('l25-i3', 'Do you can swim?', ['Can you swim'], 'Can sin do.', ['can-form']),
    sp('l25-i4', 'Toca la palabra que sobra', ['I', 'can', 'to', 'climb.'], 2, 'Sin to: I can climb.', ['can-form']),
    ls('l25-i5', "I can't swim.", ['Sé nadar', 'No sé nadar', 'Quiero nadar'], 1, "can't = no sé / no puedo.", ['can-form'], 'Escucha y elige qué significa'),
  ],
  final: [
    tr('l25-f1', 'Sé nadar.', ['I can swim'], 'I can swim.', ['can-form']),
    tr('l25-f2', '¿Me puedes ayudar?', ['Can you help me'], 'Can you help me?', ['can-form']),
    fx('l25-f3', 'He cans speak English.', ['He can speak English'], 'can no lleva -s.', ['can-form']),
    ch('l25-f4', 'Completa', '___ I have water, please?', ['Do', 'Can', 'Am'], 1, 'Can I have…?', ['can-form']),
    bd('l25-f5', ['She', "can't", 'drive.', 'drives', 'to'], ["She can't drive"], 'Ella no sabe conducir.', "She can't drive.", ['can-form']),
  ],
};

export const L_PC: Lesson = {
  id: 'a1-u3-l26', level: 'A1', unit: 'a1-u3', category: 'grammar',
  title: 'Present Continuous', room: '¡Están viniendo!',
  objectives: ['Hablar de lo que pasa ahora mismo', 'Formar am/is/are + -ing', 'Distinguirlo del Present Simple'],
  prerequisites: ['a1-u3-l25'],
  intro: 'Suena la radio de la torre: "Look! They\'re coming! Tom is running to the gate!" Cuando algo está pasando en este momento, el inglés usa el Present Continuous.',
  meaning: 'El Present Continuous habla de acciones que están ocurriendo ahora mismo: I\'m cooking (estoy cocinando). Se parece mucho al español "estar + -ando/-iendo".',
  when: ['Acciones en este momento: She\'s sleeping now.', 'Con now, right now, look!, listen!', 'Para describir lo que ves: Two men are walking to the camp.'],
  how: 'Sujeto + am / is / are + verbo-ing. Negativa: I\'m not / isn\'t / aren\'t + -ing. Pregunta: Am / Is / Are + sujeto + -ing? Ortografía: come → coming (pierde la e), run → running, swim → swimming (doblan la consonante).',
  table: {
    head: ['Sujeto', 'Afirmativa', 'Negativa', 'Pregunta'],
    rows: [
      ['I', "I'm cooking", "I'm not cooking", 'Am I cooking?'],
      ['he / she / it', "she's cooking", "she isn't cooking", 'Is she cooking?'],
      ['you / we / they', "they're cooking", "they aren't cooking", 'Are they cooking?'],
    ],
  },
  affirmative: [
    { en: "I'm cooking now.", es: 'Ahora estoy cocinando.' },
    { en: "Look! They're coming!", es: '¡Mira! ¡Que vienen!', note: 'come → coming' },
  ],
  negative: [
    { en: "Tom isn't sleeping.", es: 'Tom no está durmiendo.' },
  ],
  interrogative: [
    { en: 'Are you waiting for Ana? — Yes, I am.', es: '¿Estás esperando a Ana? — Sí.' },
    { en: 'What are you doing?', es: '¿Qué estás haciendo?' },
  ],
  examples: [
    { en: "She's running to the gate.", es: 'Está corriendo hacia la puerta.', note: 'run → running' },
    { en: "We're waiting for Tom.", es: 'Estamos esperando a Tom.' },
    { en: "It's raining.", es: 'Está lloviendo.' },
    { en: 'I usually cook, but today Ana is cooking.', es: 'Normalmente cocino yo, pero hoy cocina Ana.', note: 'Costumbre (simple) vs ahora (continuous).' },
  ],
  errors: [
    { wrong: 'I cooking.', right: "I'm cooking.", why: 'Falta am / is / are.' },
    { wrong: 'I am cook now.', right: 'I am cooking now.', why: 'El verbo necesita -ing.' },
    { wrong: 'comeing / runing', right: 'coming / running', why: 'La e final se va (coming) y run dobla la n (running).' },
    { wrong: 'I am usually cooking.', right: 'I usually cook.', why: 'Para costumbres se usa el Present Simple, no el continuo.' },
  ],
  comparison: { title: 'Present Simple vs Present Continuous', body: 'Simple = costumbres y cosas que pasan siempre (I cook every day). Continuous = lo que pasa justo ahora (I\'m cooking now). Pista: every day, usually, always → simple; now, look!, right now → continuous.' },
  simpler: [
    'Para decir lo que está pasando ahora: am/is/are + verbo con -ing. I\'m eating = estoy comiendo.',
    'Es como en español: "estoy comiendo" = I am eating. "Estamos esperando" = we are waiting. Solo tienes que elegir am, is o are (como en PRE-A1) y añadir -ing al verbo.',
  ],
  vocab: ['v-wait', 'v-come', 'v-look', 'v-now'],
  concepts: [
    { id: 'c-pc-cook', kind: 'expression', prompt: 'Ahora estoy cocinando.', answers: ["I'm cooking now", 'I am cooking now'] },
    { id: 'c-pc-coming', kind: 'expression', prompt: '¡Que vienen! (están viniendo)', answers: ["They're coming", 'They are coming'] },
    { id: 'c-pc-doing', kind: 'expression', prompt: '¿Qué estás haciendo?', answers: ['What are you doing'] },
    { id: 'c-pc-neg', kind: 'expression', prompt: 'Tom no está durmiendo.', answers: ["Tom isn't sleeping", 'Tom is not sleeping', "Tom's not sleeping"] },
    { id: 'c-pc-running', kind: 'grammar', prompt: 'run + -ing', answers: ['running'] },
  ],
  guided: [
    ch('l26-g1', 'Completa', 'She ___ running.', ['is', 'are', 'am'], 0, 'she → is.', ['continuous-form'], 'she va con is.'),
    ch('l26-g2', '¿Cuál está bien?', 'Estoy cocinando.', ['I cooking.', "I'm cook.", "I'm cooking."], 2, 'am + -ing.', ['continuous-form']),
    mt('l26-g3', [['come', 'coming'], ['run', 'running'], ['wait', 'waiting'], ['swim', 'swimming']], 'coming, running, waiting, swimming.', ['continuous-form'], 'Une cada verbo con su forma -ing'),
    ch('l26-g4', '¿Simple o continuous?', 'I ___ every day.', ['cook', 'am cooking'], 0, 'every day → Present Simple.', ['continuous-form']),
  ],
  independent: [
    tr('l26-i1', 'Estamos esperando a Tom.', ["We're waiting for Tom", 'We are waiting for Tom'], "We're waiting for Tom.", ['continuous-form']),
    fx('l26-i2', 'They are comeing.', ["They're coming", 'They are coming'], 'come → coming.', ['continuous-form']),
    or('l26-i3', ['doing?', 'are', 'What', 'you'], ['What are you doing'], '¿Qué estás haciendo?', 'What are you doing?', ['wh-question']),
    ch('l26-i4', 'Completa', 'Look! Ana ___ to the gate.', ['runs', 'is running'], 1, 'Look! → ahora → is running.', ['continuous-form']),
    fx('l26-i5', 'I am usually cooking dinner.', ['I usually cook dinner'], 'Costumbre → Present Simple.', ['continuous-form']),
  ],
  final: [
    tr('l26-f1', 'Ahora estoy cocinando.', ["I'm cooking now", 'I am cooking now'], "I'm cooking now.", ['continuous-form']),
    fx('l26-f2', 'She sleeping.', ["She's sleeping", 'She is sleeping'], 'Falta is.', ['continuous-form']),
    ch('l26-f3', 'Completa', '___ they waiting for us?', ['Do', 'Is', 'Are'], 2, 'they → Are.', ['continuous-form']),
    ls('l26-f4', "Listen! Someone is coming.", ['Alguien viene (ahora)', 'Alguien viene todos los días', 'Nadie viene'], 0, 'is coming = está viniendo ahora.', ['continuous-form'], 'Escucha y elige qué significa'),
    tr('l26-f5', 'Tom no está durmiendo.', ["Tom isn't sleeping", 'Tom is not sleeping', "Tom's not sleeping"], "Tom isn't sleeping.", ['continuous-form']),
  ],
};

export const L_WH: Lesson = {
  id: 'a1-u3-l27', level: 'A1', unit: 'a1-u3', category: 'grammar',
  title: 'WH Questions', room: 'Preguntas al desconocido',
  objectives: ['Hacer preguntas abiertas', 'Elegir what, where, when, who, why, how', 'Ordenar bien la pregunta'],
  prerequisites: ['a1-u3-l26'],
  intro: 'Un superviviente desconocido llega al campamento. Para saber quién es necesitas preguntas abiertas: "Who are you? Where do you live? Why are you here?"',
  meaning: 'Las WH questions empiezan por una palabra interrogativa y piden información, no un sí o un no: What (qué), Where (dónde), When (cuándo), Who (quién), Why (por qué), How (cómo), How many (cuántos), What time (a qué hora).',
  when: ['Para pedir información concreta.', 'Se responden con información, no con yes/no.'],
  how: 'Con be: WH + be + sujeto? → Where is the map? Con otros verbos: WH + do/does + sujeto + verbo? → Where do you live? Where does she work? Con can o continuous: WH + can/am/is/are + sujeto…? → What can you do? What are you doing? Respuesta a Why: Because…',
  table: {
    head: ['Palabra', 'Significa', 'Ejemplo'],
    rows: [
      ['What', 'qué', 'What do you eat?'], ['Where', 'dónde', 'Where does she live?'], ['When', 'cuándo', 'When is dinner?'],
      ['Who', 'quién', 'Who is that man?'], ['Why', 'por qué', 'Why are you tired?'], ['How', 'cómo', 'How are you?'],
      ['How many', 'cuántos', 'How many people are there?'], ['What time', 'a qué hora', 'What time do you get up?'],
    ],
  },
  examples: [
    { en: 'Where do you live? — I live in Madrid.', es: '¿Dónde vives? — Vivo en Madrid.' },
    { en: 'Where does she work?', es: '¿Dónde trabaja ella?' },
    { en: 'Who is that man? — He\'s my brother.', es: '¿Quién es ese hombre? — Es mi hermano.' },
    { en: "Why are you tired? — Because I can't sleep.", es: '¿Por qué estás cansada? — Porque no puedo dormir.' },
    { en: 'What are you doing?', es: '¿Qué estás haciendo?' },
    { en: 'When is dinner? — At nine.', es: '¿Cuándo es la cena? — A las nueve.' },
  ],
  errors: [
    { wrong: 'Where you live?', right: 'Where do you live?', why: 'Con verbos normales hace falta do/does.' },
    { wrong: 'Where does she lives?', right: 'Where does she live?', why: 'Con does el verbo pierde la -s.' },
    { wrong: 'What time it is?', right: 'What time is it?', why: 'be va antes del sujeto en la pregunta.' },
    { wrong: 'Why you are here?', right: 'Why are you here?', why: 'Orden de pregunta: WH + be + sujeto.' },
  ],
  comparison: { title: 'Why vs Because', body: 'En español "por qué" (pregunta) y "porque" (respuesta) se parecen. En inglés son palabras distintas: Why? → Because…' },
  simpler: [
    'Pon la palabra de pregunta al principio y luego haz una pregunta normal de sí/no: Do you live in Madrid? → Where do you live?',
    'Truco en dos pasos. 1) Haz la pregunta de sí o no que ya sabes: Is the map here? / Does she work? 2) Pega delante la palabra WH: Where is the map? / Where does she work?',
  ],
  vocab: ['v-when', 'v-who', 'v-why', 'v-how', 'v-how-many'],
  concepts: [
    { id: 'c-wh-live', kind: 'expression', prompt: '¿Dónde vives?', answers: ['Where do you live'] },
    { id: 'c-wh-work', kind: 'expression', prompt: '¿Dónde trabaja ella?', answers: ['Where does she work'] },
    { id: 'c-wh-who', kind: 'expression', prompt: '¿Quién es ese hombre?', answers: ['Who is that man', "Who's that man"] },
    { id: 'c-wh-why', kind: 'vocab', prompt: 'por qué', answers: ['why'] },
    { id: 'c-wh-because', kind: 'vocab', prompt: 'porque', answers: ['because'] },
    { id: 'c-wh-when', kind: 'expression', prompt: '¿Cuándo es la cena?', answers: ['When is dinner', "When's dinner"] },
  ],
  guided: [
    ch('l27-g1', '¿Qué palabra pregunta por un lugar?', 'lugar', ['When', 'Where', 'Who'], 1, 'Where = dónde.', ['wh-question'], 'dónde'),
    mt('l27-g2', [['What', 'qué'], ['Who', 'quién'], ['When', 'cuándo'], ['Why', 'por qué']], 'What, Who, When, Why.', ['wh-question']),
    ch('l27-g3', '¿Cuál está bien?', '¿Dónde vives?', ['Where you live?', 'Where do you live?', 'Where live you?'], 1, 'WH + do + sujeto + verbo.', ['wh-question']),
    or('l27-g4', ['she', 'does', 'Where', 'work?'], ['Where does she work'], '¿Dónde trabaja ella?', 'Where + does + she + work?', ['wh-question']),
  ],
  independent: [
    tr('l27-i1', '¿Dónde vives?', ['Where do you live'], 'Where do you live?', ['wh-question']),
    fx('l27-i2', 'Where does she lives?', ['Where does she live'], 'does + live.', ['third-person-s']),
    fx('l27-i3', 'Why you are tired?', ['Why are you tired'], 'WH + are + you.', ['wh-question']),
    ch('l27-i4', 'Responde', 'Why are you here?', ['Because I need help.', 'Why I need help.', 'Yes, I am.'], 0, 'Why → Because…', ['wh-question']),
    ls('l27-i5', 'Who is that woman?', ['¿Dónde está esa mujer?', '¿Quién es esa mujer?', '¿Cómo está esa mujer?'], 1, 'Who = quién.', ['wh-question'], 'Escucha y elige qué significa'),
  ],
  final: [
    tr('l27-f1', '¿Quién es ese hombre?', ['Who is that man', "Who's that man"], 'Who is that man?', ['wh-question']),
    fx('l27-f2', 'What time it is?', ['What time is it'], 'is antes de it.', ['wh-question']),
    tr('l27-f3', '¿Qué estás haciendo?', ['What are you doing'], 'What are you doing?', ['continuous-form']),
    ch('l27-f4', 'Completa', '___ many people are there?', ['What', 'How', 'Who'], 1, 'How many = cuántos.', ['wh-question']),
    bd('l27-f5', ['When', 'is', 'dinner?', 'does', 'Where'], ['When is dinner'], '¿Cuándo es la cena?', 'When is dinner?', ['wh-question']),
  ],
};

export const L_SITUATIONS: Lesson = {
  id: 'a1-u3-l28', level: 'A1', unit: 'a1-u3', category: 'communication',
  title: 'Situaciones cotidianas', room: 'El mercado de supervivientes',
  objectives: ['Pedir algo en una tienda o bar', 'Preguntar el precio', 'Pedir y dar indicaciones'],
  prerequisites: ['a1-u3-l27'],
  intro: 'En el pueblo seguro hay un pequeño mercado. Para conseguir lo que necesitas tendrás que pedir, preguntar precios y encontrar el camino. Todo con lo que ya sabes, más unas cuantas frases fijas.',
  meaning: 'Son frases hechas que se usan en situaciones del día a día: pedir algo (Can I have…?), preguntar el precio (How much is it?) y orientarse (Excuse me, where is…? Turn left).',
  when: ['En una tienda, un bar o un mercado.', 'Cuando te pierdes y necesitas indicaciones.'],
  how: 'Llamar la atención: Excuse me. Pedir: Can I have a coffee, please? / A bottle of water, please. Precio: How much is it? — It\'s five euros. Indicaciones: Where is the…? / Is there a … near here? — Go straight on. Turn left / right. It\'s next to the… Al terminar: Thank you!',
  table: {
    head: ['Situación', 'Tú dices', 'Te pueden decir'],
    rows: [
      ['Pedir', 'Can I have a coffee, please?', 'Here you are.'],
      ['Precio', 'How much is it?', "It's three euros."],
      ['Orientarse', 'Excuse me, where is the station?', 'Go straight on and turn left.'],
      ['Buscar', 'Is there a shop near here?', "Yes, it's next to the bank."],
    ],
  },
  examples: [
    { en: 'Excuse me, can I have a bottle of water, please?', es: 'Perdone, ¿me da una botella de agua, por favor?' },
    { en: "How much is it? — It's two euros.", es: '¿Cuánto es? — Son dos euros.' },
    { en: 'Here you are.', es: 'Aquí tiene.' },
    { en: 'Excuse me, where is the shop?', es: 'Perdone, ¿dónde está la tienda?' },
    { en: "Go straight on and turn right. It's next to the river.", es: 'Siga recto y gire a la derecha. Está al lado del río.' },
  ],
  errors: [
    { wrong: 'I want a coffee.', right: 'Can I have a coffee, please?', why: '"I want" suena brusco en inglés. Lo educado es Can I have…, please?' },
    { wrong: 'How much costs?', right: 'How much is it?', why: 'La forma más sencilla y correcta: How much is it?' },
    { wrong: 'Sorry, where is the station?', right: 'Excuse me, where is the station?', why: 'Para llamar la atención se usa excuse me; sorry es para disculparse.' },
  ],
  comparison: { title: 'Excuse me vs Sorry', body: 'Excuse me = perdone (antes de molestar a alguien). Sorry = lo siento (después de un error o para pedir que repitan: Sorry?).' },
  simpler: [
    'Cuatro frases te sacan de casi todo: Excuse me (perdone), Can I have…, please? (¿me da…?), How much is it? (¿cuánto es?) y Where is…? (¿dónde está?).',
    'Imagina la escena en el mercado. Tú: "Excuse me, can I have a coffee, please?" — "Here you are." — "How much is it?" — "It\'s two euros." — "Thank you!" Repítela en voz alta cambiando el producto.',
  ],
  vocab: ['v-how-much', 'v-excuse-me', 'v-left', 'v-right', 'v-straight-on', 'v-shop', 'v-coffee', 'v-euro'],
  concepts: [
    { id: 'c-sit-have', kind: 'expression', prompt: '¿Me pone un café, por favor?', answers: ['Can I have a coffee, please', 'Can I have a coffee please', 'Can I have a coffee'] },
    { id: 'c-sit-much', kind: 'expression', prompt: '¿Cuánto es?', answers: ['How much is it'] },
    { id: 'c-sit-excuse', kind: 'expression', prompt: 'Perdone (para llamar la atención)', answers: ['Excuse me'] },
    { id: 'c-sit-left', kind: 'expression', prompt: 'Gire a la izquierda.', answers: ['Turn left'] },
    { id: 'c-sit-straight', kind: 'expression', prompt: 'Siga todo recto.', answers: ['Go straight on', 'Go straight ahead'] },
  ],
  guided: [
    ch('l28-g1', '¿Cuál es más educado?', 'Pedir un café', ['I want a coffee.', 'Can I have a coffee, please?', 'Give me coffee.'], 1, 'Can I have…, please?', ['greetings'], 'Con please.'),
    ch('l28-g2', 'Para llamar la atención de alguien dices…', 'llamar la atención', ['Sorry.', 'Excuse me.', 'Goodbye.'], 1, 'Excuse me.', ['greetings']),
    mt('l28-g3', [['left', 'izquierda'], ['right', 'derecha'], ['straight on', 'todo recto'], ['next to', 'al lado de']], 'left, right, straight on, next to.'),
    or('l28-g4', ['much', 'is', 'How', 'it?'], ['How much is it'], '¿Cuánto es?', 'How much is it?', ['wh-question']),
  ],
  independent: [
    tr('l28-i1', '¿Cuánto es?', ['How much is it'], 'How much is it?', ['wh-question']),
    fx('l28-i2', 'How much costs?', ['How much is it'], 'How much is it?', ['wh-question']),
    ls('l28-i3', "It's four euros.", ['4 €', '14 €', '40 €'], 0, 'four = 4.', ['numbers'], 'Escucha: ¿cuánto cuesta?'),
    tr('l28-i4', 'Gire a la derecha.', ['Turn right'], 'Turn right.'),
    ch('l28-i5', 'Te dicen "Here you are." Significa…', 'Here you are.', ['Aquí estás.', 'Aquí tiene.', '¿Dónde estás?'], 1, 'Here you are = aquí tiene (al dar algo).'),
  ],
  final: [
    tr('l28-f1', '¿Me pone un café, por favor?', ['Can I have a coffee, please', 'Can I have a coffee please', 'Can I have a coffee'], 'Can I have a coffee, please?', ['can-form']),
    tr('l28-f2', 'Perdone, ¿dónde está la tienda?', ['Excuse me, where is the shop', 'Excuse me where is the shop', "Excuse me, where's the shop", 'Excuse me, where is the store'], 'Excuse me, where is the shop?', ['wh-question']),
    ch('l28-f3', 'Responde', 'How much is it?', ["It's three euros.", "It's three o'clock.", 'Three, please.'], 0, "It's three euros.", ['numbers']),
    ls('l28-f4', 'Go straight on and turn left.', ['Todo recto y a la izquierda', 'Todo recto y a la derecha', 'A la izquierda y luego atrás'], 0, 'straight on + left.', [], 'Escucha y elige las indicaciones'),
    fx('l28-f5', 'Sorry, can I have water, please?', ['Excuse me, can I have water, please', 'Excuse me, can I have water please', 'Excuse me, can I have some water, please'], 'Para llamar la atención: Excuse me.', ['greetings']),
  ],
};

export const UNIT7: Unit = {
  id: 'a1-u3', level: 'A1', title: 'Patrulla', building: 'El camino al pueblo seguro',
  lessons: [L_CAN.id, L_PC.id, L_WH.id, L_SITUATIONS.id],
  horde: {
    title: 'Horda del camino', passPct: 80,
    exercises: [
      ch('h7-1', '¿Cuál está bien?', 'Sabe conducir.', ['She can drive.', 'She cans drive.', 'She can to drive.'], 0, 'can + verbo.', ['can-form']),
      tr('h7-2', '¿Me puedes ayudar?', ['Can you help me'], 'Can you help me?', ['can-form']),
      ch('h7-3', 'Completa', 'Look! They ___ coming!', ['is', 'are', 'do'], 1, 'they → are.', ['continuous-form']),
      fx('h7-4', 'I cooking now.', ["I'm cooking now", 'I am cooking now'], 'Falta am.', ['continuous-form']),
      ch('h7-5', '¿Simple o continuous?', 'She ___ every morning.', ['runs', 'is running'], 0, 'every morning → simple.', ['continuous-form']),
      tr('h7-6', '¿Dónde vives?', ['Where do you live'], 'Where do you live?', ['wh-question']),
      fx('h7-7', 'Where she works?', ['Where does she work'], 'WH + does + she + work.', ['wh-question']),
      ls('h7-8', 'Excuse me, how much is it?', ['Perdone, ¿cuánto es?', 'Perdone, ¿qué hora es?', 'Lo siento, ¿dónde está?'], 0, 'how much = cuánto.', [], 'Escucha y elige qué significa'),
      tr('h7-9', 'Gire a la izquierda.', ['Turn left'], 'Turn left.'),
      ch('h7-10', 'Responde', 'Why are you tired?', ['Because I work at night.', 'Why I work at night.', 'Yes, I am.'], 0, 'Why → Because.', ['wh-question']),
    ],
  },
};

export const LESSONS_U7 = [L_CAN, L_PC, L_WH, L_SITUATIONS];
