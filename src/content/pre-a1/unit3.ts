import type { Lesson, Unit } from '../schema';
import { bd, ch, fl, fx, ls, mt, or, sp, tr } from '../helpers';

/* PRE-A1 · Unidad 3 · "El almacén": sustantivos, artículos, plural, objetos y colores. */

export const L_NOUNS: Lesson = {
  id: 'pre-a1-u3-l8', level: 'PRE_A1', unit: 'pre-a1-u3', category: 'grammar',
  title: 'Sustantivos', room: 'Censo del refugio',
  objectives: ['Reconocer sustantivos de personas y cosas', 'Saber que no tienen género', 'Usar mayúscula solo donde toca'],
  prerequisites: ['pre-a1-u2-l7'],
  intro: 'Hay que hacer el censo del refugio: personas, comida, agua. Todo eso son sustantivos, las palabras que nombran cosas y personas. En inglés son más fáciles que en español: no tienen género.',
  meaning: 'Un sustantivo nombra una persona (man, woman, child), una cosa (water, food) o un lugar (shelter). En inglés no son masculinos ni femeninos: la comida es "it", igual que el refugio.',
  when: ['Para nombrar todo lo que te rodea.', 'Detrás de a/an/the (lo verás en la siguiente sala).'],
  how: 'El sustantivo no cambia según el género. Para sustituirlo: personas → he/she/they; cosas → it/they. Mayúscula solo en nombres propios, países, nacionalidades, idiomas, días y meses: Ana, Spain, Spanish, Monday, May.',
  table: {
    head: ['Sustantivo', 'Español', 'Pronombre'],
    rows: [
      ['man', 'hombre', 'he'], ['woman', 'mujer', 'she'], ['child', 'niño / niña', 'he / she'],
      ['person', 'persona', 'he / she'], ['friend', 'amigo / amiga', 'he / she'],
      ['water', 'agua', 'it'], ['food', 'comida', 'it'], ['shelter', 'refugio', 'it'],
    ],
  },
  examples: [
    { en: 'The food is here.', es: 'La comida está aquí.' },
    { en: 'The water is cold.', es: 'El agua está fría.' },
    { en: 'She is a woman. He is a man.', es: 'Es una mujer. Es un hombre.' },
    { en: 'Ana is my friend. Tom is my friend.', es: 'Ana es mi amiga. Tom es mi amigo.', note: 'friend sirve para los dos: no cambia.' },
    { en: 'I am Spanish.', es: 'Soy española.', note: 'Las nacionalidades van con mayúscula.' },
  ],
  errors: [
    { wrong: 'the food → she', right: 'the food → it', why: '"La comida" es femenina en español, pero en inglés las cosas son it.' },
    { wrong: 'I am spanish.', right: 'I am Spanish.', why: 'Nacionalidades e idiomas van con mayúscula.' },
    { wrong: 'friendo / frienda', right: 'friend', why: 'El sustantivo no cambia por género.' },
  ],
  comparison: { title: 'El agua, la comida… en inglés, "the" para todo', body: 'En español aprendes el género de cada palabra (el agua, la comida). En inglés no hay que aprenderlo: todo es the, y las cosas son siempre it.' },
  simpler: [
    'Un sustantivo es el nombre de algo: persona, cosa o sitio. En inglés no son chico ni chica: las cosas siempre son it.',
    'Prueba así: si puedes poner "el" o "la" delante en español (el agua, la mujer), es un sustantivo. En inglés solo hay una opción, the, y nunca tienes que pensar en su género.',
  ],
  vocab: ['v-man', 'v-woman', 'v-child', 'v-person', 'v-people', 'v-water', 'v-food'],
  concepts: [
    { id: 'c-noun-man', kind: 'vocab', prompt: 'hombre', answers: ['man'] },
    { id: 'c-noun-woman', kind: 'vocab', prompt: 'mujer', answers: ['woman'] },
    { id: 'c-noun-child', kind: 'vocab', prompt: 'niño / niña', answers: ['child'] },
    { id: 'c-noun-person', kind: 'vocab', prompt: 'persona', answers: ['person'] },
    { id: 'c-noun-water', kind: 'vocab', prompt: 'agua', answers: ['water'] },
    { id: 'c-noun-food', kind: 'vocab', prompt: 'comida', answers: ['food'] },
  ],
  guided: [
    ch('l8-g1', 'Elige el pronombre', 'the food (la comida)', ['she', 'it', 'he'], 1, 'Una cosa: it.', ['it-for-things'], 'Es una cosa, aunque en español sea femenina.'),
    mt('l8-g2', [['man', 'hombre'], ['woman', 'mujer'], ['child', 'niño'], ['water', 'agua']], 'man, woman, child, water.'),
    ch('l8-g3', '¿Cuál está bien escrito?', 'Nacionalidad', ['I am spanish.', 'I am Spanish.'], 1, 'Spanish con mayúscula.', ['capitals']),
    ls('l8-g4', 'woman', ['man', 'woman', 'women'], 1, 'woman = «GÜÚ-man».', ['sounds']),
  ],
  independent: [
    tr('l8-i1', 'agua', ['water'], 'water.'),
    ch('l8-i2', 'Elige el pronombre', 'the shelter (el refugio)', ['he', 'it', 'they'], 1, 'Un lugar: it.', ['it-for-things']),
    tr('l8-i3', 'La comida está aquí.', ['The food is here', "The food's here"], 'The food is here.', ['missing-subject']),
    sp('l8-i4', 'Toca la palabra que debería ir con mayúscula', ['I', 'am', 'spanish.'], 2, 'Spanish va con mayúscula.', ['capitals']),
  ],
  final: [
    tr('l8-f1', 'mujer', ['woman'], 'woman.'),
    ch('l8-f2', 'Elige el pronombre', 'the water (el agua)', ['she', 'it', 'he'], 1, 'it.', ['it-for-things']),
    tr('l8-f3', 'El agua está fría.', ['The water is cold', "The water's cold"], 'The water is cold.'),
    ch('l8-f4', 'Ana es mi amiga, Tom es mi amigo. "Amigo/amiga" es…', 'friend', ['friend / frienda', 'friend para los dos', 'friendo / friend'], 1, 'friend no cambia.'),
    tr('l8-f5', 'niño', ['child'], 'child.'),
  ],
};

export const L_ARTICLES: Lesson = {
  id: 'pre-a1-u3-l9', level: 'PRE_A1', unit: 'pre-a1-u3', category: 'grammar',
  title: 'Artículos: a, an, the', room: 'Etiquetas del almacén',
  objectives: ['Usar a y an según el sonido', 'Usar the para algo concreto', 'Poner a delante de profesiones y papeles'],
  prerequisites: ['pre-a1-u3-l8'],
  intro: 'Toca etiquetar las cajas del almacén: "a radio", "an egg", "the key". Tres palabras muy pequeñas que aparecen en casi todas las frases.',
  meaning: 'a / an = un, una (algo cualquiera, solo en singular). the = el, la, los, las (algo concreto que ya sabemos cuál es, en singular o plural).',
  when: [
    'a / an: la primera vez que mencionas algo, o para decir qué es: It\'s an egg.',
    'the: cuando los dos sabéis de qué hablas: The key is here.',
    'a / an delante de profesiones y papeles: I\'m a survivor. (En español no se pone).',
  ],
  how: 'a delante de sonido de consonante: a radio, a dog, a man. an delante de sonido de vocal: an egg, an apple, an hour (la h no suena). the vale para todo, sin cambiar.',
  table: {
    head: ['Artículo', 'Cuándo', 'Ejemplos'],
    rows: [
      ['a', 'Singular, sonido de consonante', 'a radio · a bag · a man'],
      ['an', 'Singular, sonido de vocal', 'an egg · an apple · an hour'],
      ['the', 'Algo concreto, singular o plural', 'the key · the keys · the shelter'],
    ],
  },
  examples: [
    { en: 'It\'s a radio.', es: 'Es una radio.' },
    { en: 'It\'s an egg.', es: 'Es un huevo.' },
    { en: 'An hour.', es: 'Una hora.', note: 'h muda: empieza por sonido de vocal.' },
    { en: 'I\'m a survivor.', es: 'Soy superviviente.', note: 'En inglés hace falta a.' },
    { en: 'The dog is hungry.', es: 'El perro tiene hambre.' },
    { en: 'The apples are here.', es: 'Las manzanas están aquí.' },
  ],
  errors: [
    { wrong: 'I\'m survivor.', right: 'I\'m a survivor.', why: 'Profesiones y papeles en singular llevan a/an.' },
    { wrong: 'a egg', right: 'an egg', why: 'egg empieza por sonido de vocal: an.' },
    { wrong: 'an radio', right: 'a radio', why: 'radio empieza por sonido de consonante: a.' },
  ],
  comparison: { title: 'a o an: manda el sonido, no la letra', body: 'an hour (la h no suena) pero a hotel. Y también a university (suena «iu»). Di la palabra en voz alta: si empieza por sonido de vocal, an.' },
  simpler: [
    'a y an significan "un/una". Usa an si la siguiente palabra empieza por a, e, i, o, u al decirla (an egg). Si no, a (a dog). the es "el, la, los, las" y nunca cambia.',
    'Truco: an existe para que no choquen dos vocales. Di "a egg" deprisa: suena raro, ¿verdad? Por eso se pone una n en medio: an egg. Y para "soy enfermera, soy superviviente", el inglés siempre pone a: I\'m a nurse, I\'m a survivor.',
  ],
  vocab: ['v-apple', 'v-egg', 'v-the'],
  concepts: [
    { id: 'c-art-egg', kind: 'expression', prompt: 'un huevo', answers: ['an egg'] },
    { id: 'c-art-apple', kind: 'expression', prompt: 'una manzana', answers: ['an apple'] },
    { id: 'c-art-hour', kind: 'expression', prompt: 'una hora', answers: ['an hour'] },
    { id: 'c-art-job', kind: 'expression', prompt: 'Soy superviviente.', answers: ["I'm a survivor", 'I am a survivor'] },
    { id: 'c-art-the', kind: 'expression', prompt: 'el perro', answers: ['the dog'] },
    { id: 'c-art-radio', kind: 'expression', prompt: 'una radio', answers: ['a radio'] },
  ],
  guided: [
    ch('l9-g1', 'Completa', '___ egg', ['a', 'an'], 1, 'Sonido de vocal: an egg.', ['article-a-an'], 'egg empieza por sonido de vocal.'),
    ch('l9-g2', 'Completa', '___ radio', ['a', 'an'], 0, 'Sonido de consonante: a radio.', ['article-a-an']),
    ch('l9-g3', 'Completa', '___ hour', ['a', 'an'], 1, 'La h no suena: an hour.', ['article-a-an'], 'Escucha la palabra: ¿suena la h?'),
    or('l9-g4', ['is', 'an', 'It', 'egg.'], ['It is an egg'], 'Es un huevo.', 'It + is + an + egg.'),
  ],
  independent: [
    fx('l9-i1', "I'm survivor.", ["I'm a survivor", 'I am a survivor'], 'Los papeles llevan a: I\'m a survivor.', ['article-job']),
    tr('l9-i2', 'Ella es superviviente.', ["She's a survivor", 'She is a survivor'], 'She is a survivor.', ['article-job']),
    sp('l9-i3', 'Toca la palabra incorrecta', ['He', 'is', 'an', 'man.'], 2, 'man empieza por consonante: a man.', ['article-a-an']),
    ch('l9-i4', 'Completa', '___ apple', ['a', 'an'], 1, 'an apple.', ['article-a-an']),
    tr('l9-i5', 'El perro tiene hambre.', ['The dog is hungry', "The dog's hungry"], 'The dog is hungry. (Tener hambre = be hungry).', ['be-age']),
  ],
  final: [
    ch('l9-f1', 'Completa', "It's ___ apple.", ['a', 'an', 'the a'], 1, 'an apple.', ['article-a-an']),
    tr('l9-f2', 'Soy superviviente.', ["I'm a survivor", 'I am a survivor'], 'I\'m a survivor.', ['article-job']),
    ch('l9-f3', 'Completa', "It's ___ dog.", ['a', 'an'], 0, 'a dog.', ['article-a-an']),
    fx('l9-f4', 'It is a egg.', ['It is an egg', "It's an egg"], 'an egg.', ['article-a-an']),
    tr('l9-f5', 'una hora', ['an hour'], 'an hour.', ['article-a-an']),
  ],
};

export const L_PLURAL: Lesson = {
  id: 'pre-a1-u3-l10', level: 'PRE_A1', unit: 'pre-a1-u3', category: 'grammar',
  title: 'Singular y plural', room: 'Recuento de suministros',
  objectives: ['Formar plurales con -s, -es e -ies', 'Conocer los plurales irregulares más usados', 'Saber que los adjetivos no tienen plural'],
  prerequisites: ['pre-a1-u3-l9'],
  intro: 'En el recuento ya no hay una caja, hay cinco boxes. Casi siempre basta con una -s, pero hay unas pocas palabras rebeldes que conviene conocer desde ya.',
  meaning: 'El plural indica que hay más de uno. Se marca en el sustantivo, nunca en el adjetivo: two red bags (no "reds").',
  when: ['Siempre que hables de más de una persona o cosa.', 'Con are y they: The boxes are here. They are here.'],
  how: 'Normal: + s (bag → bags). Termina en s, sh, ch, x: + es (box → boxes). Consonante + y: y → ies (family → families). Algunas en f/fe: → ves (knife → knives). Irregulares: man → men, woman → women, child → children, person → people.',
  table: {
    head: ['Regla', 'Singular', 'Plural'],
    rows: [
      ['+ s', 'bag · key · dog', 'bags · keys · dogs'],
      ['+ es (s, sh, ch, x)', 'box · torch', 'boxes · torches'],
      ['y → ies', 'family · baby', 'families · babies'],
      ['f → ves', 'knife', 'knives'],
      ['Irregular', 'man · woman', 'men · women'],
      ['Irregular', 'child · person', 'children · people'],
    ],
  },
  examples: [
    { en: 'Two bags.', es: 'Dos mochilas.' },
    { en: 'The boxes are here.', es: 'Las cajas están aquí.' },
    { en: 'Three knives.', es: 'Tres cuchillos.' },
    { en: 'The children are safe.', es: 'Los niños están a salvo.' },
    { en: 'Five people.', es: 'Cinco personas.' },
    { en: 'They are tired.', es: 'Están cansados.', note: 'tired no cambia: los adjetivos no tienen plural.' },
  ],
  errors: [
    { wrong: 'childs', right: 'children', why: 'child tiene plural irregular.' },
    { wrong: 'boxs', right: 'boxes', why: 'Después de x se añade -es.' },
    { wrong: 'They are tireds.', right: 'They are tired.', why: 'Los adjetivos nunca llevan -s.' },
    { wrong: 'peoples', right: 'people', why: 'people ya es plural de person.' },
  ],
  comparison: { title: 'Plural solo en el sustantivo', body: 'En español todo concuerda: las mochilas rojas. En inglés solo el sustantivo lleva plural: the red bags. El artículo the y el adjetivo red no cambian.' },
  simpler: [
    'Casi siempre: añade -s. Si acaba en s, sh, ch o x, añade -es para poder pronunciarlo (boxes = «bóksis»). Y aprende de memoria cuatro rebeldes: men, women, children, people.',
    'Imagina que la -s es una pegatina que solo se pone en las cajas (sustantivos), nunca en las etiquetas de color (adjetivos). Dos mochilas rojas = two red bags: la pegatina va en bag, no en red.',
  ],
  vocab: ['v-box', 'v-bag', 'v-knife'],
  concepts: [
    { id: 'c-pl-men', kind: 'vocab', prompt: 'hombres', answers: ['men'] },
    { id: 'c-pl-children', kind: 'vocab', prompt: 'niños', answers: ['children'] },
    { id: 'c-pl-people', kind: 'vocab', prompt: 'personas', answers: ['people'] },
    { id: 'c-pl-boxes', kind: 'vocab', prompt: 'cajas', answers: ['boxes'] },
    { id: 'c-pl-knives', kind: 'vocab', prompt: 'cuchillos', answers: ['knives'] },
    { id: 'c-pl-women', kind: 'vocab', prompt: 'mujeres', answers: ['women'] },
  ],
  guided: [
    ch('l10-g1', 'Plural de box', 'box', ['boxs', 'boxes', 'boxies'], 1, 'Después de x: -es.', ['plural-form'], 'Termina en x.'),
    ch('l10-g2', 'Plural de child', 'child', ['childs', 'children', 'childes'], 1, 'Irregular: children.', ['plural-form']),
    fl('l10-g3', 'Escribe el plural de "bag"', 'two', '', ['bags'], 'bag + s.', ['plural-form'], 'dos mochilas'),
    sp('l10-g4', 'Toca la palabra incorrecta', ['They', 'are', 'hungrys.'], 2, 'Los adjetivos no llevan -s: hungry.', ['adjective-plural']),
  ],
  independent: [
    tr('l10-i1', 'dos mujeres', ['two women'], 'woman → women.', ['plural-form']),
    fl('l10-i2', 'Escribe el plural de "child"', 'three', '', ['children'], 'children.', ['plural-form'], 'tres niños'),
    fx('l10-i3', 'The mans are here.', ['The men are here'], 'man → men.', ['plural-form']),
    ch('l10-i4', 'Plural de person', 'person', ['persons', 'people', 'peoples'], 1, 'person → people.', ['plural-form']),
    ch('l10-i5', 'Plural de knife', 'knife', ['knifes', 'knives', 'knifs'], 1, 'f → ves: knives.', ['plural-form']),
  ],
  final: [
    tr('l10-f1', 'cinco personas', ['five people'], 'five people.', ['plural-form']),
    fx('l10-f2', 'The childs are safe.', ['The children are safe'], 'children.', ['plural-form']),
    ch('l10-f3', 'Completa', 'The boxes ___ here.', ['is', 'are'], 1, 'Plural → are.', ['be-agreement']),
    fx('l10-f4', 'They are tireds.', ["They are tired", "They're tired"], 'tired no lleva -s.', ['adjective-plural']),
    tr('l10-f5', 'tres cajas', ['three boxes'], 'three boxes.', ['plural-form']),
  ],
};

export const L_OBJECTS: Lesson = {
  id: 'pre-a1-u3-l11', level: 'PRE_A1', unit: 'pre-a1-u3', category: 'vocabulary',
  title: 'Objetos cotidianos', room: 'Inventario de la mochila',
  objectives: ['Nombrar objetos de supervivencia', 'Preguntar "What\'s this?"', 'Responder "It\'s a…" y "They\'re…"'],
  prerequisites: ['pre-a1-u3-l10'],
  intro: 'Vacías la mochila sobre la mesa: llave, mapa, linterna, botella… Para pedir o encontrar cosas necesitas sus nombres y una pregunta muy útil: What\'s this?',
  meaning: 'What\'s this? = ¿Qué es esto? (algo cerca de ti). Se responde It\'s a… para una cosa y They\'re… para varias.',
  when: ['Cuando no sabes cómo se llama algo: What\'s this?', 'Para identificar objetos: It\'s a key. They\'re keys.'],
  how: 'Pregunta: What\'s this? (What is this?). Respuesta singular: It\'s a / an + objeto. Respuesta plural: They\'re + objetos (sin a). Algunas palabras cambian entre Reino Unido y EE. UU.: torch (UK) / flashlight (US).',
  table: {
    head: ['Inglés', 'Español', 'Ojo'],
    rows: [
      ['key', 'llave', 'suena «kí»'], ['phone', 'teléfono', 'ph = f'], ['bottle', 'botella', ''],
      ['torch / flashlight', 'linterna', 'UK / US'], ['map', 'mapa', ''], ['bed', 'cama', ''],
      ['table', 'mesa', ''], ['chair', 'silla', ''], ['door', 'puerta', ''],
    ],
  },
  examples: [
    { en: "What's this? — It's a key.", es: '¿Qué es esto? — Es una llave.' },
    { en: "What's this? — It's a torch.", es: '¿Qué es esto? — Es una linterna.', note: 'En EE. UU.: a flashlight.' },
    { en: "They're bottles.", es: 'Son botellas.', note: 'Plural sin a.' },
    { en: 'The map is on the table.', es: 'El mapa está en la mesa.' },
  ],
  errors: [
    { wrong: "It's key.", right: "It's a key.", why: 'En singular hace falta a/an.' },
    { wrong: "They're a keys.", right: "They're keys.", why: 'a/an solo va con una cosa.' },
    { wrong: 'What is it this?', right: "What's this?", why: 'this ya es el sujeto.' },
  ],
  comparison: { title: 'Inglés británico y americano', body: 'Algunos objetos tienen nombre distinto: torch (UK) / flashlight (US). Las dos formas son correctas; elige una y sé coherente. La app acepta ambas.' },
  simpler: [
    'Para preguntar qué es algo: What\'s this? Para contestar: It\'s a + cosa (si es una) o They\'re + cosas (si son varias).',
    'Imagina que sostienes el objeto en la mano. Tú: "What\'s this?". Tu compañero: "It\'s a map." Si sostienes dos: "They\'re maps." Con eso puedes pedir cualquier cosa del inventario.',
  ],
  vocab: ['v-key', 'v-phone', 'v-bottle', 'v-torch', 'v-map', 'v-bed', 'v-table', 'v-chair', 'v-door', 'v-this', 'v-what'],
  concepts: [
    { id: 'c-obj-key', kind: 'vocab', prompt: 'llave', answers: ['key'] },
    { id: 'c-obj-torch', kind: 'vocab', prompt: 'linterna', answers: ['torch', 'flashlight'] },
    { id: 'c-obj-map', kind: 'vocab', prompt: 'mapa', answers: ['map'] },
    { id: 'c-obj-bottle', kind: 'vocab', prompt: 'botella', answers: ['bottle'] },
    { id: 'c-obj-what', kind: 'expression', prompt: '¿Qué es esto?', answers: ["What's this", 'What is this'] },
    { id: 'c-obj-plural', kind: 'expression', prompt: 'Son llaves.', answers: ["They're keys", 'They are keys'] },
  ],
  guided: [
    mt('l11-g1', [['key', 'llave'], ['map', 'mapa'], ['chair', 'silla'], ['door', 'puerta']], 'key, map, chair, door.'),
    ls('l11-g2', 'torch', ['torch', 'chair', 'map'], 0, 'torch = linterna (UK).'),
    or('l11-g3', ['this?', "What's"], ["What's this"], '¿Qué es esto?', "What's this?", ['be-question-order']),
    ch('l11-g4', 'Elige la respuesta', 'Son botellas.', ["They're a bottles.", "They're bottles.", "It's bottles."], 1, 'Plural sin a, con they.', ['article-a-an']),
  ],
  independent: [
    tr('l11-i1', 'Es un mapa.', ["It's a map", 'It is a map'], "It's a map.", ['article-a-an']),
    ch('l11-i2', '"Linterna" en inglés americano', 'linterna (US)', ['torch', 'flashlight'], 1, 'flashlight (US), torch (UK).'),
    fx('l11-i3', "It's key.", ["It's a key", 'It is a key'], 'Falta a.', ['article-a-an']),
    ls('l11-i4', 'phone', ['phone', 'bone', 'door'], 0, 'phone: la ph suena f.', ['sounds']),
    tr('l11-i5', 'Son llaves.', ["They're keys", 'They are keys'], "They're keys.", ['plural-form']),
  ],
  final: [
    tr('l11-f1', 'linterna', ['torch', 'flashlight'], 'torch (UK) / flashlight (US).'),
    tr('l11-f2', '¿Qué es esto?', ["What's this", 'What is this'], "What's this?", ['be-question-order']),
    ch('l11-f3', 'Responde', "What's this? (una llave)", ["It's a key.", "It's key.", "They're a key."], 0, "It's a key.", ['article-a-an']),
    tr('l11-f4', 'Es una silla.', ["It's a chair", 'It is a chair'], "It's a chair."),
    fx('l11-f5', "They're a maps.", ["They're maps", 'They are maps'], 'Sin a en plural.', ['article-a-an']),
  ],
};

export const L_COLOURS: Lesson = {
  id: 'pre-a1-u3-l12', level: 'PRE_A1', unit: 'pre-a1-u3', category: 'vocabulary',
  title: 'Colores', room: 'Señales de colores',
  objectives: ['Decir los colores básicos', 'Poner el color antes del sustantivo', 'Preguntar de qué color es algo'],
  prerequisites: ['pre-a1-u3-l11'],
  intro: 'En el campamento cada caja tiene un color: verde para comida, azul para agua, roja para botiquín. Para encontrarlas necesitas los colores y un cambio de orden respecto al español.',
  meaning: 'Los colores son adjetivos: describen un sustantivo. En inglés van delante del sustantivo y nunca cambian para plural.',
  when: ['Para describir cosas: a red bag.', 'Después de be: The bag is red.', 'Para preguntar: What colour is it?'],
  how: 'Color + sustantivo: a green box (no "a box green"). Plural: two green boxes (green no cambia). Pregunta: What colour is it? (UK) / What color is it? (US). Respuesta: It\'s blue. Ojo: orange empieza por vocal → an orange box.',
  table: {
    head: ['Inglés', 'Español', 'Ejemplo'],
    rows: [
      ['red', 'rojo', 'a red bag'], ['blue', 'azul', 'a blue box'], ['green', 'verde', 'a green door'],
      ['yellow', 'amarillo', 'yellow bottles'], ['black', 'negro', 'a black dog'], ['white', 'blanco', 'a white bed'],
      ['orange', 'naranja', 'an orange box'], ['grey / gray', 'gris', 'a grey chair'], ['brown', 'marrón', 'a brown table'], ['pink', 'rosa', 'a pink phone'],
    ],
  },
  examples: [
    { en: 'A red bag.', es: 'Una mochila roja.' },
    { en: 'Two green boxes.', es: 'Dos cajas verdes.', note: 'green no cambia en plural.' },
    { en: 'The door is blue.', es: 'La puerta es azul.' },
    { en: 'What colour is it? — It\'s yellow.', es: '¿De qué color es? — Es amarillo.' },
    { en: 'An orange box.', es: 'Una caja naranja.', note: 'orange empieza por vocal: an.' },
  ],
  errors: [
    { wrong: 'a bag red', right: 'a red bag', why: 'El adjetivo va antes del sustantivo.' },
    { wrong: 'two reds bags', right: 'two red bags', why: 'Los adjetivos no llevan plural.' },
    { wrong: 'a orange box', right: 'an orange box', why: 'orange empieza por sonido de vocal.' },
  ],
  comparison: { title: 'Orden al revés que en español', body: 'Español: una mochila roja (sustantivo + color). Inglés: a red bag (color + sustantivo). Piensa en que en inglés primero ves el color y después el objeto.' },
  simpler: [
    'En inglés el color va primero: a red bag (una roja mochila). Y nunca lleva -s: two red bags.',
    'Lee la frase inglesa como una etiqueta de almacén: "ROJA – MOCHILA". Primero el color, luego la cosa. Si son varias, la -s va al final de la cosa: red bags.',
  ],
  vocab: ['v-red', 'v-blue', 'v-green', 'v-yellow', 'v-black', 'v-white', 'v-orange', 'v-grey', 'v-brown', 'v-pink', 'v-colour'],
  concepts: [
    { id: 'c-col-red', kind: 'vocab', prompt: 'rojo', answers: ['red'] },
    { id: 'c-col-green', kind: 'vocab', prompt: 'verde', answers: ['green'] },
    { id: 'c-col-yellow', kind: 'vocab', prompt: 'amarillo', answers: ['yellow'] },
    { id: 'c-col-grey', kind: 'vocab', prompt: 'gris', answers: ['grey', 'gray'] },
    { id: 'c-col-order', kind: 'expression', prompt: 'una mochila roja', answers: ['a red bag'] },
    { id: 'c-col-q', kind: 'expression', prompt: '¿De qué color es?', answers: ['What colour is it', 'What color is it'] },
  ],
  guided: [
    ch('l12-g1', '¿Cuál está bien?', 'una mochila roja', ['a bag red', 'a red bag'], 1, 'Color antes del sustantivo.', ['adjective-order'], 'El color va primero.'),
    ls('l12-g2', 'yellow', ['yellow', 'white', 'red'], 0, 'yellow = amarillo.'),
    mt('l12-g3', [['red', 'rojo'], ['blue', 'azul'], ['green', 'verde'], ['black', 'negro']], 'red, blue, green, black.'),
    ch('l12-g4', 'Completa', '___ orange box', ['a', 'an'], 1, 'orange empieza por vocal: an.', ['article-a-an']),
  ],
  independent: [
    tr('l12-i1', 'un perro negro', ['a black dog'], 'a black dog.', ['adjective-order']),
    fx('l12-i2', 'The boxes are greens.', ['The boxes are green'], 'green no cambia.', ['adjective-plural']),
    bd('l12-i3', ['a', 'blue', 'map', 'an', 'blues'], ['a blue map'], 'un mapa azul', 'a blue map.', ['adjective-order']),
    tr('l12-i4', '¿De qué color es?', ['What colour is it', 'What color is it'], 'What colour is it?', ['be-question-order']),
    ls('l12-i5', 'brown', ['brown', 'green', 'blue'], 0, 'brown = marrón.'),
  ],
  final: [
    tr('l12-f1', 'una puerta verde', ['a green door'], 'a green door.', ['adjective-order']),
    fx('l12-f2', 'two reds bags', ['two red bags'], 'red no lleva -s.', ['adjective-plural']),
    ch('l12-f3', 'Responde', 'What colour is it? (amarillo)', ["It's yellow.", "It's a yellow.", 'Is yellow.'], 0, "It's yellow.", ['missing-subject']),
    tr('l12-f4', 'gris', ['grey', 'gray'], 'grey (UK) / gray (US).'),
    or('l12-f5', ['is', 'The', 'white.', 'bed'], ['The bed is white'], 'La cama es blanca.', 'The bed is white.'),
  ],
};

export const UNIT3: Unit = {
  id: 'pre-a1-u3', level: 'PRE_A1', title: 'El almacén', building: 'El almacén saqueado',
  lessons: [L_NOUNS.id, L_ARTICLES.id, L_PLURAL.id, L_OBJECTS.id, L_COLOURS.id],
  horde: {
    title: 'Horda del almacén', passPct: 80,
    exercises: [
      ch('h3-1', 'Elige el pronombre', 'the food', ['she', 'it'], 1, 'it.', ['it-for-things']),
      ch('h3-2', 'Completa', '___ egg', ['a', 'an'], 1, 'an egg.', ['article-a-an']),
      tr('h3-3', 'Soy superviviente.', ["I'm a survivor", 'I am a survivor'], "I'm a survivor.", ['article-job']),
      ch('h3-4', 'Plural de child', 'child', ['childs', 'children'], 1, 'children.', ['plural-form']),
      fx('h3-5', 'The boxs are here.', ['The boxes are here'], 'boxes.', ['plural-form']),
      tr('h3-6', '¿Qué es esto?', ["What's this", 'What is this'], "What's this?", ['be-question-order']),
      tr('h3-7', 'una mochila roja', ['a red bag'], 'a red bag.', ['adjective-order']),
      fx('h3-8', 'They are hungrys.', ['They are hungry', "They're hungry"], 'hungry sin -s.', ['adjective-plural']),
      ls('h3-9', 'women', ['woman', 'women'], 1, 'women = «GÜÍ-min» (plural).', ['plural-form']),
      tr('h3-10', 'Son llaves.', ["They're keys", 'They are keys'], "They're keys.", ['plural-form']),
    ],
  },
};

export const LESSONS_U3 = [L_NOUNS, L_ARTICLES, L_PLURAL, L_OBJECTS, L_COLOURS];
