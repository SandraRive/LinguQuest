import type { Exercise } from './schema';
import { ch, fx, ls, or, tr } from './helpers';

export type Competency = 'grammar' | 'vocabulary' | 'listening' | 'reading' | 'writing' | 'speaking';
export const COMPETENCY_LABEL: Record<Competency, string> = {
  grammar: 'Grammar', vocabulary: 'Vocabulary', listening: 'Listening', reading: 'Reading', writing: 'Writing', speaking: 'Speaking',
};

export interface LevelExam {
  level: 'PRE_A1' | 'A1';
  title: string;
  passPct: number;
  reading: { title: string; text: string[] };
  sections: { competency: Competency; exercises: Exercise[] }[];
  /** Competencias que no se pueden evaluar con garantías sin un servicio real. */
  pending: { competency: Competency; why: string }[];
}

/** Jefe final de PRE-A1. Preguntas nuevas (no repetidas de las salas) para medir dominio real. */
export const EXAM_PRE_A1: LevelExam = {
  level: 'PRE_A1', title: 'La Horda de la Primera Noche', passPct: 70,
  reading: {
    title: 'Mensaje encontrado en la radio',
    text: [
      "Hello. My name's Emma and I'm from Dublin.",
      "I'm twenty-nine. I'm with my sister, Lucy.",
      "Her son is three. His name is Sam.",
      "We are in a blue house. It's cold, but we're safe.",
      "Today is Wednesday. Please answer on Friday.",
    ],
  },
  sections: [
    { competency: 'grammar', exercises: [
      ch('ex-g1', 'Completa', 'My parents ___ in Madrid.', ['is', 'are', 'am'], 1, 'Plural → are.', ['be-agreement']),
      fx('ex-g2', "She isn't a Spanish.", ["She isn't Spanish", "She's not Spanish", 'She is not Spanish'], 'Nacionalidad sin a.', ['article-job']),
      ch('ex-g3', 'Completa', '___ they hungry?', ['Is', 'Are', 'Do'], 1, 'Pregunta con they: Are…?', ['be-question-order']),
      ch('ex-g4', 'Completa (los hijos son de Kate)', 'Kate and ___ children.', ['his', 'her', 'their'], 1, 'Dueña: Kate → her.', ['possessive']),
      fx('ex-g5', 'They are two womans.', ['They are two women', "They're two women"], 'woman → women.', ['plural-form']),
      or('ex-g6', ['is', 'Where', 'bag?', 'the', 'orange'], ['Where is the orange bag'], '¿Dónde está la mochila naranja?', 'Where + is + the orange bag?', ['be-question-order']),
      ch('ex-g7', 'Completa', "It's ___ hour.", ['a', 'an'], 1, 'h muda: an hour.', ['article-a-an']),
      tr('ex-g8', 'No tenemos frío.', ["We aren't cold", "We're not cold", 'We are not cold'], "We aren't cold.", ['be-negative-order']),
    ] },
    { competency: 'vocabulary', exercises: [
      ch('ex-v1', '¿Qué significa "daughter"?', 'daughter', ['hija', 'hermana', 'madre'], 0, 'daughter = hija.'),
      tr('ex-v2', 'jueves', ['Thursday'], 'Thursday.'),
      ch('ex-v3', '¿Cómo se escribe 50?', '50', ['fifteen', 'fifty', 'fivety'], 1, 'fifty.', ['numbers']),
      tr('ex-v4', 'llave', ['key'], 'key.'),
      ch('ex-v5', 'Al irte a dormir dices…', 'despedida nocturna', ['Good evening', 'Good night', 'Good afternoon'], 1, 'Good night.', ['greetings']),
      tr('ex-v6', 'amarillo', ['yellow'], 'yellow.'),
    ] },
    { competency: 'listening', exercises: [
      ls('ex-l1', "I'm thirty-three.", ['Tiene 23 años', 'Tiene 33 años', 'Tiene 13 años'], 1, "thirty-three = 33.", ['numbers'], 'Escucha y elige qué significa'),
      ls('ex-l2', 'The keys are in the green box.', ['Las llaves están en la caja verde', 'Las llaves están en la mochila roja', 'La caja verde está vacía'], 0, 'in the green box.', [], 'Escucha y elige qué significa', 'en-US'),
      ls('ex-l3', 'My name is Jack. J, A, C, K.', ['G-A-C-K', 'J-A-C-K', 'J-E-C-K'], 1, 'J (yéi), A (éi), C, K.', ['letter-names'], 'Escucha y elige cómo se deletrea'),
      ls('ex-l4', "She isn't here. She's in the shelter.", ['Ella está aquí', 'Ella está en el refugio', 'Ella no está a salvo'], 1, "She's in the shelter.", [], 'Escucha y elige qué significa'),
      ls('ex-l5', 'See you on Tuesday.', ['El martes', 'El jueves', 'El miércoles'], 0, 'Tuesday = martes.', ['sounds'], 'Escucha: ¿qué día?', 'en-GB'),
    ] },
    { competency: 'reading', exercises: [
      ch('ex-r1', '¿De dónde es Emma?', 'Emma', ['Londres', 'Dublín', 'Madrid'], 1, "I'm from Dublin."),
      ch('ex-r2', '¿Cuántos años tiene Sam?', 'Sam', ['3', '29', '13'], 0, 'Her son is three.'),
      ch('ex-r3', '¿Quién es Lucy?', 'Lucy', ['La madre de Emma', 'La hermana de Emma', 'La hija de Emma'], 1, 'my sister, Lucy.'),
      ch('ex-r4', '¿Cuándo hay que responder?', 'Respuesta', ['El miércoles', 'El viernes', 'Hoy'], 1, 'answer on Friday.'),
    ] },
    { competency: 'writing', exercises: [
      tr('ex-w1', 'Me llamo Ana y soy de España.', ["My name is Ana and I'm from Spain", "My name's Ana and I'm from Spain", 'My name is Ana and I am from Spain', "I'm Ana and I'm from Spain", 'I am Ana and I am from Spain'], "My name is Ana and I'm from Spain.", ['country-nationality']),
      tr('ex-w2', 'Es una caja roja.', ["It's a red box", 'It is a red box'], "It's a red box.", ['adjective-order']),
      tr('ex-w3', '¿Cuántos años tienes?', ['How old are you'], 'How old are you?', ['be-question-order']),
      tr('ex-w4', 'Este es mi padre.', ['This is my father'], 'This is my father.', ['possessive']),
    ] },
  ],
  pending: [
    { competency: 'speaking', why: 'Evaluar el speaking con garantías necesita un servicio que analice el audio. Hasta entonces, este examen queda como provisional y no se emite nota de Speaking.' },
  ],
};

/** Jefe final de A1 · El Leñador. Preguntas nuevas para medir dominio real del nivel. */
export const EXAM_A1: LevelExam = {
  level: 'A1', title: 'El Leñador', passPct: 70,
  reading: {
    title: 'Nota clavada en un árbol',
    text: [
      "Hi! I'm Leo. I live in a small house next to the river.",
      "I get up at six every day and I usually walk in the forest in the morning.",
      "I've got a dog. His name is Max and he's very friendly.",
      "There are two tents behind my house. They are for survivors.",
      "I can't drive, but I can swim. Right now I'm cooking dinner.",
      "Can you help me? Come on Saturday!",
    ],
  },
  sections: [
    { competency: 'grammar', exercises: [
      ch('exa1-g1', 'Completa', 'My sister ___ in a shop.', ['work', 'works', 'working'], 1, 'my sister = she → works.', ['third-person-s']),
      fx('exa1-g2', "He don't like fish.", ["He doesn't like fish", 'He does not like fish'], 'he → doesn\'t.', ['do-does']),
      ch('exa1-g3', '¿Cuál está bien?', 'frecuencia', ['I go often to the lake.', 'I often go to the lake.'], 1, 'Adverbio antes del verbo.', ['frequency-position']),
      ch('exa1-g4', 'Completa', '___ there any tents?', ['Is', 'Are', 'Have'], 1, 'Plural → Are there…?', ['there-is-are']),
      fx('exa1-g5', 'She can swims very well.', ['She can swim very well'], 'can + verbo sin -s.', ['can-form']),
      ch('exa1-g6', 'Completa', 'Shh! The baby ___.', ['sleeps', 'is sleeping', 'sleep'], 1, 'Shh! → ahora → is sleeping.', ['continuous-form']),
      or('exa1-g7', ['brother', 'does', 'Where', 'live?', 'your'], ['Where does your brother live'], '¿Dónde vive tu hermano?', 'Where does your brother live?', ['wh-question']),
      tr('exa1-g8', 'No tenemos coche.', ["We haven't got a car", 'We have not got a car', "We don't have a car", 'We do not have a car'], "We haven't got a car.", ['have-got']),
    ] },
    { competency: 'vocabulary', exercises: [
      ch('exa1-v1', '¿Qué significa "behind"?', 'behind', ['delante de', 'detrás de', 'debajo de'], 1, 'behind = detrás de.', ['preposition-place']),
      tr('exa1-v2', 'nunca', ['never'], 'never.'),
      ch('exa1-v3', '"Have breakfast" significa…', 'have breakfast', ['cenar', 'desayunar', 'comer'], 1, 'desayunar.'),
      tr('exa1-v4', 'trepar, escalar', ['climb'], 'climb.'),
      ch('exa1-v5', 'Lo contrario de "tall" (personas) es…', 'tall', ['small', 'short', 'young'], 1, 'tall ↔ short.'),
      tr('exa1-v6', 'izquierda', ['left'], 'left.'),
    ] },
    { competency: 'listening', exercises: [
      ls('exa1-l1', 'I usually get up at six, but today I get up at eight.', ['Hoy se levanta a las 8', 'Hoy se levanta a las 6', 'Nunca se levanta pronto'], 0, 'today… at eight.', ['time-expressions'], 'Escucha: ¿a qué hora se levanta hoy?'),
      ls('exa1-l2', "There's a shop next to the river.", ['La tienda está al lado del río', 'La tienda está detrás del río', 'No hay tienda'], 0, 'next to = al lado de.', ['preposition-place'], 'Escucha y elige qué significa', 'en-US'),
      ls('exa1-l3', "She can't drive but she can swim.", ['Sabe conducir', 'Sabe nadar pero no conducir', 'No sabe nadar'], 1, "can't drive / can swim.", ['can-form'], 'Escucha y elige qué significa'),
      ls('exa1-l4', "Where are you? — I'm waiting in front of the shop.", ['Delante de la tienda', 'Dentro de la tienda', 'Detrás de la tienda'], 0, 'in front of = delante de.', ['preposition-place'], 'Escucha: ¿dónde está?'),
      ls('exa1-l5', "It's six euros, please.", ['6 €', '16 €', '60 €'], 0, 'six = 6.', ['numbers'], 'Escucha: ¿cuánto cuesta?', 'en-GB'),
    ] },
    { competency: 'reading', exercises: [
      ch('exa1-r1', '¿Dónde vive Leo?', 'Leo', ['En la ciudad', 'Al lado del río', 'En una tienda de campaña'], 1, 'next to the river.'),
      ch('exa1-r2', '¿Qué hace normalmente por la mañana?', 'mañana', ['Pasear por el bosque', 'Nadar', 'Conducir'], 0, 'I usually walk in the forest in the morning.'),
      ch('exa1-r3', '¿Qué está haciendo ahora?', 'ahora', ['Paseando', 'Cocinando la cena', 'Durmiendo'], 1, "Right now I'm cooking dinner."),
      ch('exa1-r4', '¿Qué NO sabe hacer Leo?', 'no sabe', ['Nadar', 'Conducir', 'Cocinar'], 1, "I can't drive."),
    ] },
    { competency: 'writing', exercises: [
      tr('exa1-w1', 'Me levanto a las siete y desayuno a las ocho.', ['I get up at seven and I have breakfast at eight', 'I get up at seven and have breakfast at eight', "I get up at seven o'clock and I have breakfast at eight o'clock"], 'I get up at seven and I have breakfast at eight.', ['time-expressions']),
      tr('exa1-w2', 'Mi hermana tiene el pelo largo.', ["My sister's got long hair", 'My sister has got long hair', 'My sister has long hair'], "My sister's got long hair.", ['have-got']),
      tr('exa1-w3', '¿Sabes nadar?', ['Can you swim'], 'Can you swim?', ['can-form']),
      tr('exa1-w4', 'Ahora estamos esperando a Tom.', ["We're waiting for Tom now", 'We are waiting for Tom now', "Now we're waiting for Tom", 'Now we are waiting for Tom'], "We're waiting for Tom now.", ['continuous-form']),
    ] },
  ],
  pending: [
    { competency: 'speaking', why: 'Evaluar el speaking con garantías necesita un servicio que analice el audio. Hasta entonces, este examen queda como provisional y no se emite nota de Speaking.' },
  ],
};

export const EXAMS: Record<'PRE_A1' | 'A1', LevelExam> = { PRE_A1: EXAM_PRE_A1, A1: EXAM_A1 };
