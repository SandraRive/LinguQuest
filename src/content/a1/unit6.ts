import type { Lesson, Unit } from '../schema';
import { bd, ch, fl, fx, ls, mt, or, sp, tr } from '../helpers';

/* A1 · Unidad 2 · "El campamento": have got, there is/are, preposiciones de lugar y descripciones. */

export const L_HAVEGOT: Lesson = {
  id: 'a1-u2-l21', level: 'A1', unit: 'a1-u2', category: 'grammar',
  title: 'Have got', room: 'Inventario compartido',
  objectives: ['Decir lo que tienes con have got', 'Usar has got con he, she, it', 'Preguntar y negar sin do'],
  prerequisites: ['a1-u1-l20'],
  intro: 'Antes de salir de patrulla hay que saber qué tiene cada uno: "I\'ve got a map. Tom has got a torch. Have you got water?" Have got es la forma más común en el inglés británico para hablar de posesiones.',
  meaning: 'Have got significa "tener": posesiones, familia y rasgos físicos. I\'ve got a bike (tengo una bici). She\'s got blue eyes (tiene los ojos azules). Es lo mismo que have, pero se construye distinto.',
  when: ['Posesiones: I\'ve got a car.', 'Familia: She\'s got two brothers.', 'Rasgos físicos: He\'s got short hair.'],
  how: 'Afirmativa: I/you/we/they have got (\'ve got) · he/she/it has got (\'s got). Negativa: haven\'t got / hasn\'t got. Pregunta: Have / Has + sujeto + got…? Respuesta corta: Yes, I have. / No, she hasn\'t. ¡Sin do! En inglés americano es más común: Do you have…? I don\'t have…',
  table: {
    head: ['Sujeto', 'Afirmativa', 'Negativa', 'Pregunta'],
    rows: [
      ['I / you / we / they', "have got · 've got", "haven't got", 'Have … got?'],
      ['he / she / it', "has got · 's got", "hasn't got", 'Has … got?'],
    ],
  },
  affirmative: [
    { en: "I've got a map.", es: 'Tengo un mapa.' },
    { en: "Tom's got a torch.", es: 'Tom tiene una linterna.', note: "Tom's got = Tom has got" },
  ],
  negative: [
    { en: "We haven't got food.", es: 'No tenemos comida.' },
    { en: "She hasn't got a car.", es: 'Ella no tiene coche.' },
  ],
  interrogative: [
    { en: 'Have you got water? — Yes, I have.', es: '¿Tienes agua? — Sí.' },
    { en: "Has he got a bike? — No, he hasn't.", es: '¿Tiene bici? — No.' },
  ],
  examples: [
    { en: "She's got two brothers.", es: 'Tiene dos hermanos.' },
    { en: "He's got blue eyes.", es: 'Tiene los ojos azules.' },
    { en: "They've got a big tent.", es: 'Tienen una tienda grande.' },
    { en: 'Do you have a map? (US)', es: '¿Tienes un mapa?', note: 'Forma americana con have + do.' },
  ],
  errors: [
    { wrong: "He's got not a car.", right: "He hasn't got a car.", why: 'La negativa es hasn\'t got: el not va con has.' },
    { wrong: 'Do you have got a map?', right: 'Have you got a map?', why: 'Con have got no se usa do. O bien Do you have…?, pero sin got.' },
    { wrong: 'She have got a bike.', right: "She's got a bike.", why: 'Con he, she, it: has got.' },
    { wrong: "He's got 20 years.", right: "He's 20.", why: 'La edad sigue siendo con be, como aprendiste en PRE-A1.' },
  ],
  comparison: { title: "He's = he is o he has", body: "He's tired = he is tired. He's got a car = he has got a car. Mira si después viene got: si viene, es has." },
  simpler: [
    'Para decir "tengo" di I\'ve got. Para "tiene", he\'s got o she\'s got. Para negar, haven\'t got / hasn\'t got. Para preguntar, empieza con Have o Has.',
    'Trata have got como un bloque de dos piezas. Para preguntar, la primera pieza (have/has) salta al principio: You have got → Have you got? Para negar, se le engancha not: haven\'t got.',
  ],
  vocab: ['v-car', 'v-bike', 'v-hair', 'v-eyes'],
  concepts: [
    { id: 'c-hg-i', kind: 'expression', prompt: 'Tengo un mapa.', answers: ["I've got a map", 'I have got a map', 'I have a map'] },
    { id: 'c-hg-she', kind: 'expression', prompt: 'Ella tiene dos hermanos.', answers: ["She's got two brothers", 'She has got two brothers', 'She has two brothers'] },
    { id: 'c-hg-neg', kind: 'expression', prompt: 'No tenemos comida.', answers: ["We haven't got food", "We haven't got any food", 'We have not got food', "We don't have food", "We don't have any food"] },
    { id: 'c-hg-q', kind: 'expression', prompt: '¿Tienes agua?', answers: ['Have you got water', 'Have you got any water', 'Do you have water', 'Do you have any water'] },
    { id: 'c-hg-short', kind: 'expression', prompt: 'No (respuesta corta a "Has he got…?")', answers: ["No, he hasn't"] },
  ],
  guided: [
    ch('l21-g1', 'Completa', 'She ___ got a bike.', ['have', 'has'], 1, 'she → has got.', ['have-got'], 'she lleva has.'),
    ch('l21-g2', 'Elige la negativa', "Tom's got a car.", ["Tom's got not a car.", "Tom hasn't got a car.", "Tom don't have got a car."], 1, "hasn't got.", ['have-got']),
    or('l21-g3', ['got', 'you', 'Have', 'water?'], ['Have you got water'], '¿Tienes agua?', 'Have + you + got + water?', ['have-got']),
    ch('l21-g4', 'Responde', 'Have you got a torch? — Yes, ___', ['I have.', 'I got.', 'I do.'], 0, 'Yes, I have.', ['short-answer']),
  ],
  independent: [
    tr('l21-i1', 'Tiene los ojos azules (él).', ["He's got blue eyes", 'He has got blue eyes', 'He has blue eyes'], "He's got blue eyes.", ['have-got']),
    fx('l21-i2', 'Do you have got a map?', ['Have you got a map', 'Do you have a map'], 'Have you got…? (sin do)', ['have-got']),
    fl('l21-i3', 'Completa la negativa', 'They', 'got a tent.', ["haven't", 'have not'], "They haven't got a tent.", ['have-got'], 'No tienen tienda.'),
    sp('l21-i4', 'Toca la palabra incorrecta', ['My', 'sister', 'have', 'got', 'a', 'bike.'], 2, 'my sister = she → has.', ['have-got']),
    ch('l21-i5', '"He\'s got short hair" significa…', "He's got short hair.", ['Es bajo.', 'Tiene el pelo corto.', 'Está cansado.'], 1, "He's got = he has got.", ['have-got']),
  ],
  final: [
    tr('l21-f1', 'Tengo un mapa.', ["I've got a map", 'I have got a map', 'I have a map'], "I've got a map.", ['have-got']),
    fx('l21-f2', "She's got not a car.", ["She hasn't got a car", 'She has not got a car', "She doesn't have a car"], "hasn't got.", ['have-got']),
    ch('l21-f3', 'Completa', '___ your brother got a bike?', ['Have', 'Has', 'Does'], 1, 'your brother = he → Has.', ['have-got']),
    tr('l21-f4', 'Tienen una tienda grande.', ["They've got a big tent", 'They have got a big tent', 'They have a big tent'], "They've got a big tent.", ['have-got']),
    fx('l21-f5', "He's got 20 years.", ["He's 20", 'He is 20', "He's twenty", 'He is twenty'], 'La edad va con be.', ['be-age']),
  ],
};

export const L_THERE: Lesson = {
  id: 'a1-u2-l22', level: 'A1', unit: 'a1-u2', category: 'grammar',
  title: 'There is / There are', room: 'Reconocimiento del terreno',
  objectives: ['Decir lo que hay en un sitio', 'Usar there is con singular y there are con plural', 'Preguntar Is there…? / Are there…?'],
  prerequisites: ['a1-u2-l21'],
  intro: 'Vuelve la patrulla y cuenta lo que ha visto: "There\'s a river. There are two cars. There isn\'t any food." Para decir que algo existe en un lugar, el inglés usa there is / there are.',
  meaning: 'There is / there are = hay. There is con una cosa (singular) y there are con varias (plural).',
  when: ['Para describir un lugar: There\'s a tent next to the river.', 'Para preguntar si existe algo: Is there a shop near here?'],
  how: 'Singular: There is (There\'s) + a/an + cosa. Plural: There are + número/some + cosas. Negativa: There isn\'t a… / There aren\'t any… Pregunta: Is there a…? / Are there any…? Respuesta corta: Yes, there is. / No, there aren\'t. any se usa en negativas y preguntas con plural.',
  table: {
    head: ['', 'Singular', 'Plural'],
    rows: [
      ['Afirmativa', "There's a river.", 'There are two cars.'],
      ['Negativa', "There isn't a shop.", "There aren't any people."],
      ['Pregunta', 'Is there a shop?', 'Are there any people?'],
      ['Respuesta corta', "Yes, there is. / No, there isn't.", "Yes, there are. / No, there aren't."],
    ],
  },
  examples: [
    { en: "There's a river near the camp.", es: 'Hay un río cerca del campamento.' },
    { en: 'There are three tents.', es: 'Hay tres tiendas.' },
    { en: "There aren't any zombies here.", es: 'Aquí no hay zombis.' },
    { en: 'Is there a shop near here? — No, there isn\'t.', es: '¿Hay una tienda por aquí? — No.' },
    { en: 'How many people are there? — There are ten.', es: '¿Cuántas personas hay? — Hay diez.' },
  ],
  errors: [
    { wrong: 'Have a river near the camp.', right: "There's a river near the camp.", why: '"Hay" no se dice con have, sino con there is/are.' },
    { wrong: 'There is two cars.', right: 'There are two cars.', why: 'Con plural, there are.' },
    { wrong: 'There are a dog.', right: 'There is a dog.', why: 'Con una sola cosa, there is.' },
    { wrong: 'Is a shop near here?', right: 'Is there a shop near here?', why: 'En la pregunta no se puede quitar there.' },
  ],
  comparison: { title: '"Hay" vs "tener"', body: 'En español a veces decimos "tiene un río al lado". En inglés, para decir que algo existe en un sitio se usa there is: There\'s a river next to the camp. Have/have got es para posesiones de alguien.' },
  simpler: [
    '"Hay" se dice there is (una cosa) o there are (varias). Para preguntar: Is there…? / Are there…?',
    'Antes de hablar, cuenta: ¿es una? → There\'s a… ¿Son dos o más? → There are… Y para preguntar, da la vuelta a las dos primeras palabras: There is → Is there?',
  ],
  vocab: ['v-tent', 'v-tree', 'v-river', 'v-fire'],
  concepts: [
    { id: 'c-th-is', kind: 'expression', prompt: 'Hay un río.', answers: ["There's a river", 'There is a river'] },
    { id: 'c-th-are', kind: 'expression', prompt: 'Hay tres tiendas.', answers: ['There are three tents'] },
    { id: 'c-th-q', kind: 'expression', prompt: '¿Hay una tienda (comercio) por aquí?', answers: ['Is there a shop near here', 'Is there a store near here'] },
    { id: 'c-th-neg', kind: 'expression', prompt: 'Aquí no hay zombis.', answers: ["There aren't any zombies here", 'There are no zombies here', 'There are not any zombies here'] },
    { id: 'c-th-howmany', kind: 'expression', prompt: '¿Cuántas personas hay?', answers: ['How many people are there'] },
  ],
  guided: [
    ch('l22-g1', 'Completa', 'There ___ two cars.', ['is', 'are'], 1, 'Plural → are.', ['there-is-are'], 'Son dos.'),
    ch('l22-g2', 'Completa', 'There ___ a river.', ['is', 'are'], 0, 'Singular → is.', ['there-is-are']),
    ch('l22-g3', '¿Cómo se dice "Hay un perro"?', 'Hay un perro.', ['Have a dog.', "There's a dog.", "It's a dog."], 1, "There's a dog.", ['there-is-are']),
    or('l22-g4', ['shop', 'Is', 'a', 'there', 'here?', 'near'], ['Is there a shop near here'], '¿Hay una tienda por aquí?', 'Is there a shop near here?', ['there-is-are']),
  ],
  independent: [
    tr('l22-i1', 'Hay tres tiendas.', ['There are three tents'], 'There are three tents.', ['there-is-are']),
    fx('l22-i2', 'There is two trees.', ['There are two trees'], 'Plural → are.', ['there-is-are']),
    fx('l22-i3', 'Have a fire next to the tent.', ["There's a fire next to the tent", 'There is a fire next to the tent'], '"Hay" = there is.', ['there-is-are']),
    ch('l22-i4', 'Responde', 'Are there any people? — No, ___', ["there isn't.", "there aren't.", "they aren't."], 1, "No, there aren't.", ['short-answer']),
    ls('l22-i5', "There aren't any cars.", ['Hay coches', 'No hay coches', 'Hay un coche'], 1, "There aren't any = no hay.", [], 'Escucha y elige qué significa'),
  ],
  final: [
    tr('l22-f1', 'Hay un río cerca del campamento.', ["There's a river near the camp", 'There is a river near the camp'], "There's a river near the camp.", ['there-is-are']),
    ch('l22-f2', 'Completa', '___ there any food?', ['Is', 'Are'], 0, 'food es incontable (singular) → Is there any food?', ['there-is-are']),
    tr('l22-f3', '¿Cuántas personas hay?', ['How many people are there'], 'How many people are there?', ['wh-question']),
    fx('l22-f4', 'There are a tent.', ['There is a tent', "There's a tent"], 'Singular → is.', ['there-is-are']),
    bd('l22-f5', ["There", "aren't", 'any', 'zombies', 'here.', 'isn\'t', 'have'], ["There aren't any zombies here"], 'Aquí no hay zombis.', "There aren't any zombies here.", ['there-is-are']),
  ],
};

export const L_PREP: Lesson = {
  id: 'a1-u2-l23', level: 'A1', unit: 'a1-u2', category: 'grammar',
  title: 'Preposiciones de lugar', room: '¿Dónde está el botiquín?',
  objectives: ['Decir dónde está algo', 'Distinguir in, on, under', 'Usar next to, behind, in front of y between'],
  prerequisites: ['a1-u2-l22'],
  intro: 'Por la radio te piden que encuentres el botiquín: "It\'s under the table, next to the door." Sin las preposiciones de lugar no hay forma de guiar a nadie.',
  meaning: 'Las preposiciones de lugar dicen la posición de algo respecto a otra cosa: dentro (in), encima (on), debajo (under), al lado (next to), detrás (behind), delante (in front of) y entre (between).',
  when: ['Para decir dónde está algo: The key is on the table.', 'Con there is: There\'s a dog under the car.', 'Para responder a Where…?'],
  how: 'Cosa + be + preposición + the + lugar: The map is in the bag. Ojo: in front of y next to son bloques: no olvides el of ni el to. between va con dos cosas: between the tent and the river.',
  table: {
    head: ['Preposición', 'Español', 'Ejemplo'],
    rows: [
      ['in', 'en, dentro de', 'in the bag'], ['on', 'en, encima de', 'on the table'], ['under', 'debajo de', 'under the bed'],
      ['next to', 'al lado de', 'next to the door'], ['behind', 'detrás de', 'behind the tent'],
      ['in front of', 'delante de', 'in front of the car'], ['between', 'entre', 'between the trees'],
    ],
  },
  examples: [
    { en: 'The map is in the bag.', es: 'El mapa está en la mochila.' },
    { en: 'The keys are on the table.', es: 'Las llaves están encima de la mesa.' },
    { en: 'The dog is under the bed.', es: 'El perro está debajo de la cama.' },
    { en: "There's a car behind the house.", es: 'Hay un coche detrás de la casa.' },
    { en: 'The tent is between two trees.', es: 'La tienda está entre dos árboles.' },
    { en: 'Tom is in front of the door.', es: 'Tom está delante de la puerta.' },
  ],
  errors: [
    { wrong: 'The keys are in the table.', right: 'The keys are on the table.', why: 'Encima de una superficie es on. In es dentro.' },
    { wrong: 'next the door', right: 'next to the door', why: 'next to es un bloque: no te olvides del to.' },
    { wrong: 'in front the car', right: 'in front of the car', why: 'in front of: lleva of.' },
  ],
  comparison: { title: '"En" = in u on', body: 'En español "en" vale para todo: en la mochila, en la mesa. En inglés: in si está dentro (in the bag) y on si está encima de una superficie (on the table).' },
  simpler: [
    'in = dentro, on = encima, under = debajo. Para lo demás: next to (al lado), behind (detrás), in front of (delante), between (entre dos cosas).',
    'Imagina una caja y una pelota. Pelota dentro: in the box. Encima: on the box. Debajo: under the box. Al lado: next to the box. Detrás: behind the box. Delante: in front of the box.',
  ],
  vocab: ['v-in', 'v-on', 'v-under', 'v-next-to', 'v-behind', 'v-in-front', 'v-between'],
  concepts: [
    { id: 'c-pr-on', kind: 'expression', prompt: 'encima de la mesa', answers: ['on the table'] },
    { id: 'c-pr-under', kind: 'expression', prompt: 'debajo de la cama', answers: ['under the bed'] },
    { id: 'c-pr-next', kind: 'expression', prompt: 'al lado de la puerta', answers: ['next to the door'] },
    { id: 'c-pr-behind', kind: 'expression', prompt: 'detrás de la tienda (de campaña)', answers: ['behind the tent'] },
    { id: 'c-pr-front', kind: 'expression', prompt: 'delante del coche', answers: ['in front of the car'] },
    { id: 'c-pr-between', kind: 'vocab', prompt: 'entre', answers: ['between'] },
  ],
  guided: [
    ch('l23-g1', 'Completa', 'The keys are ___ the table.', ['in', 'on', 'under'], 1, 'Encima de una superficie: on.', ['preposition-place'], 'Están encima.'),
    ch('l23-g2', 'Completa', 'The map is ___ the bag.', ['in', 'on'], 0, 'Dentro: in.', ['preposition-place']),
    mt('l23-g3', [['under', 'debajo de'], ['behind', 'detrás de'], ['next to', 'al lado de'], ['between', 'entre']], 'under, behind, next to, between.', ['preposition-place']),
    ch('l23-g4', '¿Cuál está bien?', 'delante del coche', ['in front the car', 'in front of the car', 'front of the car'], 1, 'in front of.', ['preposition-place']),
  ],
  independent: [
    tr('l23-i1', 'El perro está debajo de la cama.', ['The dog is under the bed', "The dog's under the bed"], 'The dog is under the bed.', ['preposition-place']),
    fx('l23-i2', 'The tent is next the river.', ['The tent is next to the river'], 'next to.', ['preposition-place']),
    sp('l23-i3', 'Toca la preposición incorrecta (la taza está encima de la mesa)', ['The', 'cup', 'is', 'in', 'the', 'table.'], 3, 'Encima: on the table.', ['preposition-place']),
    tr('l23-i4', 'La tienda está entre dos árboles.', ['The tent is between two trees', "The tent's between two trees", 'The tent is between the trees'], 'between two trees.', ['preposition-place']),
    ls('l23-i5', 'The bag is behind the door.', ['delante de la puerta', 'detrás de la puerta', 'al lado de la puerta'], 1, 'behind = detrás.', ['preposition-place'], 'Escucha: ¿dónde está la mochila?'),
  ],
  final: [
    tr('l23-f1', 'Las llaves están encima de la mesa.', ['The keys are on the table'], 'on the table.', ['preposition-place']),
    ch('l23-f2', 'Completa', 'Tom is ___ the door. (delante)', ['behind', 'in front of', 'under'], 1, 'in front of.', ['preposition-place']),
    tr('l23-f3', 'Hay un coche detrás de la casa.', ["There's a car behind the house", 'There is a car behind the house'], 'There is a car behind the house.', ['there-is-are']),
    fx('l23-f4', 'The water is in front the tent.', ['The water is in front of the tent'], 'in front of.', ['preposition-place']),
    or('l23-f5', ['map?', 'the', 'Where', 'is'], ['Where is the map'], '¿Dónde está el mapa?', 'Where is the map?', ['wh-question']),
  ],
};

export const L_DESCR: Lesson = {
  id: 'a1-u2-l24', level: 'A1', unit: 'a1-u2', category: 'vocabulary',
  title: 'Descripciones', room: 'Retratos de supervivientes',
  objectives: ['Describir a una persona', 'Describir un lugar', 'Usar very y unir adjetivos'],
  prerequisites: ['a1-u2-l23'],
  intro: 'Hay que hacer fichas de búsqueda de supervivientes perdidos: "She\'s tall. She\'s got long brown hair and blue eyes. She\'s very friendly." Para eso juntas be, have got y adjetivos.',
  meaning: 'Para describir se usa be + adjetivo (She is tall) para cómo es alguien, y have got + rasgo (She\'s got long hair) para lo que tiene. Very intensifica: very tall (muy alto).',
  when: ['Personas: altura, edad, carácter, pelo y ojos.', 'Lugares: The forest is quiet. The city is dangerous.'],
  how: 'be + (very) + adjetivo: He\'s very tall. have got + adjetivo(s) + rasgo: She\'s got long brown hair (tamaño antes que color). Recuerda de PRE-A1: el adjetivo va antes del sustantivo y no lleva plural. Para unir: and (y), but (pero).',
  table: {
    head: ['Con be', 'Con have got'],
    rows: [
      ["He's tall / short.", "He's got short hair."],
      ["She's young / old.", "She's got blue eyes."],
      ["They're friendly.", "They've got long brown hair."],
      ["It's big / small / quiet.", "It's got a big door."],
    ],
  },
  examples: [
    { en: "She's tall and she's got long brown hair.", es: 'Es alta y tiene el pelo largo y castaño.' },
    { en: "He's very friendly.", es: 'Es muy simpático.' },
    { en: "My brother is young. He's got blue eyes.", es: 'Mi hermano es joven. Tiene los ojos azules.' },
    { en: 'The forest is quiet but the city is dangerous.', es: 'El bosque está tranquilo pero la ciudad es peligrosa.' },
    { en: "It's a small tent.", es: 'Es una tienda pequeña.' },
  ],
  errors: [
    { wrong: 'She has hair long.', right: "She's got long hair.", why: 'El adjetivo va antes: long hair.' },
    { wrong: "She's got brown long hair.", right: "She's got long brown hair.", why: 'Primero el tamaño, luego el color.' },
    { wrong: 'He is very much tall.', right: 'He is very tall.', why: 'Delante de un adjetivo solo very.' },
    { wrong: 'She has blue eyes hairs.', right: "She's got blue eyes.", why: 'hair (pelo) no lleva -s cuando hablamos de la melena.' },
  ],
  comparison: { title: 'Ser vs tener al describir', body: 'Igual que en español: soy alta (be tall) y tengo el pelo largo (have got long hair). Lo que cambia es el orden: long hair, no "hair long".' },
  simpler: [
    'Para describir a alguien di cómo ES con be (She\'s tall) y lo que TIENE con have got (She\'s got blue eyes). Pon very delante del adjetivo para decir "muy".',
    'Haz la ficha en tres pasos: 1) She\'s + altura (tall/short). 2) She\'s got + pelo (long brown hair). 3) She\'s got + ojos (blue eyes). Y si quieres, añade su carácter: She\'s very friendly.',
  ],
  vocab: ['v-big', 'v-small', 'v-tall', 'v-short', 'v-young', 'v-long', 'v-very', 'v-friendly', 'v-dangerous', 'v-quiet'],
  concepts: [
    { id: 'c-ds-tall', kind: 'expression', prompt: 'Es muy alto.', answers: ["He's very tall", 'He is very tall'] },
    { id: 'c-ds-hair', kind: 'expression', prompt: 'Tiene el pelo largo (ella).', answers: ["She's got long hair", 'She has got long hair', 'She has long hair'] },
    { id: 'c-ds-order', kind: 'expression', prompt: 'pelo largo y castaño (orden)', answers: ['long brown hair'] },
    { id: 'c-ds-quiet', kind: 'expression', prompt: 'El bosque está tranquilo.', answers: ['The forest is quiet', "The forest's quiet"] },
    { id: 'c-ds-dangerous', kind: 'vocab', prompt: 'peligroso', answers: ['dangerous'] },
  ],
  guided: [
    ch('l24-g1', '¿Cuál está bien?', 'pelo largo', ['hair long', 'long hair'], 1, 'Adjetivo antes.', ['adjective-order'], 'El adjetivo va primero.'),
    ch('l24-g2', 'Completa', 'She ___ got blue eyes.', ['is', 'has'], 1, 'Rasgos con have got: has got.', ['have-got']),
    mt('l24-g3', [['tall', 'alto'], ['young', 'joven'], ['quiet', 'tranquilo'], ['friendly', 'simpático']], 'tall, young, quiet, friendly.'),
    ch('l24-g4', '¿Qué orden es correcto?', 'pelo largo y castaño', ['brown long hair', 'long brown hair'], 1, 'Tamaño antes que color.', ['adjective-order']),
  ],
  independent: [
    tr('l24-i1', 'Es muy simpático.', ["He's very friendly", 'He is very friendly'], "He's very friendly.", ['be-agreement']),
    fx('l24-i2', 'She has hair short.', ["She's got short hair", 'She has got short hair', 'She has short hair'], 'short hair.', ['adjective-order']),
    tr('l24-i3', 'Tiene los ojos azules (ella).', ["She's got blue eyes", 'She has got blue eyes', 'She has blue eyes'], "She's got blue eyes.", ['have-got']),
    sp('l24-i4', 'Toca la palabra incorrecta', ['He', 'is', 'very', 'much', 'tall.'], 3, 'Solo very: very tall.', ['adjective-order']),
    bd('l24-i5', ['The', 'city', 'is', 'dangerous.', 'has', 'got'], ['The city is dangerous'], 'La ciudad es peligrosa.', 'The city is dangerous.', ['be-agreement']),
  ],
  final: [
    tr('l24-f1', 'Es alta y tiene el pelo largo.', ["She's tall and she's got long hair", 'She is tall and she has got long hair', "She's tall and has got long hair", 'She is tall and has long hair', "She's tall and she has long hair"], "She's tall and she's got long hair.", ['have-got']),
    fx('l24-f2', "He's got brown short hair.", ["He's got short brown hair", 'He has got short brown hair', 'He has short brown hair'], 'Tamaño antes que color.', ['adjective-order']),
    tr('l24-f3', 'El bosque está tranquilo.', ['The forest is quiet', "The forest's quiet"], 'The forest is quiet.'),
    ls('l24-f4', "He's tall and he's got blue eyes.", ['Es bajo y tiene los ojos azules', 'Es alto y tiene los ojos azules', 'Es alto y tiene el pelo azul'], 1, 'tall = alto; blue eyes.', [], 'Escucha y elige la descripción'),
    tr('l24-f5', 'Es una tienda pequeña.', ["It's a small tent", 'It is a small tent'], "It's a small tent.", ['adjective-order']),
  ],
};

export const UNIT6: Unit = {
  id: 'a1-u2', level: 'A1', title: 'El campamento', building: 'El claro del bosque',
  lessons: [L_HAVEGOT.id, L_THERE.id, L_PREP.id, L_DESCR.id],
  horde: {
    title: 'Horda del claro', passPct: 80,
    exercises: [
      ch('h6-1', 'Completa', 'Kate ___ got a bike.', ['have', 'has'], 1, 'has got.', ['have-got']),
      tr('h6-2', '¿Tienes agua?', ['Have you got water', 'Have you got any water', 'Do you have water', 'Do you have any water'], 'Have you got water?', ['have-got']),
      ch('h6-3', 'Completa', 'There ___ three tents.', ['is', 'are'], 1, 'Plural → are.', ['there-is-are']),
      fx('h6-4', 'Have a river near the camp.', ["There's a river near the camp", 'There is a river near the camp'], '"Hay" = there is.', ['there-is-are']),
      ch('h6-5', 'Completa', 'The keys are ___ the table. (encima)', ['in', 'on', 'under'], 1, 'on.', ['preposition-place']),
      tr('h6-6', 'al lado de la puerta', ['next to the door'], 'next to the door.', ['preposition-place']),
      fx('h6-7', 'She has hair long.', ["She's got long hair", 'She has got long hair', 'She has long hair'], 'long hair.', ['adjective-order']),
      ls('h6-8', "There's a car behind the tent.", ['Hay un coche detrás de la tienda', 'Hay un coche delante de la tienda', 'No hay coches'], 0, 'behind = detrás.', ['preposition-place'], 'Escucha y elige qué significa'),
      ch('h6-9', 'Responde', 'Is there a shop near here? — No, ___', ["there isn't.", "it isn't.", "there aren't."], 0, "No, there isn't.", ['short-answer']),
      tr('h6-10', 'Es muy alto.', ["He's very tall", 'He is very tall'], "He's very tall."),
    ],
  },
};

export const LESSONS_U6 = [L_HAVEGOT, L_THERE, L_PREP, L_DESCR];
