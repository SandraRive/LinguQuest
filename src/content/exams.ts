import type { Exercise } from './schema';
import { ch, fx, ls, or, tr } from './helpers';

export type Competency = 'grammar' | 'vocabulary' | 'listening' | 'reading' | 'writing' | 'speaking';
export const COMPETENCY_LABEL: Record<Competency, string> = {
  grammar: 'Grammar', vocabulary: 'Vocabulary', listening: 'Listening', reading: 'Reading', writing: 'Writing', speaking: 'Speaking',
};

export interface LevelExam {
  level: 'PRE_A1';
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
