import { z } from 'zod';

/** Etiquetas de error: cuando se repiten se convierten en "infecciones". */
export const ErrorTag = z.enum([
  'pronoun-choice',     // elegir mal el pronombre
  'it-for-things',      // usar he/she para cosas
  'missing-subject',    // omitir el sujeto ("Is tired")
  'i-lowercase',        // escribir "i" en minúscula
  'be-agreement',       // he are / they is
  'be-age',             // "I have 25 years"
  'be-negative-order',  // "I not am"
  'be-question-order',  // "You are tired?"
  'short-answer',       // "Yes, I'm."
  'word-order',
  'letter-names',       // E/I, G/J, A/E
  'pronunciation',      // e muda, "espánish", acento
  'sounds',             // th, h, sh, i larga/corta
  'numbers',            // forty, -teen/-ty, twenty-one
  'capitals',           // Spanish, Monday, May
  'article-a-an',       // a egg / an radio
  'article-job',        // I'm survivor
  'plural-form',        // childs, boxs
  'adjective-plural',   // reds bags
  'adjective-order',    // a bag red
  'possessive',         // his/her según el dueño
  'preposition-time',   // in Monday / on May
  'greetings',          // Good night para saludar
  'country-nationality',// I'm from Spanish
  'third-person-s',     // she work / he don't
  'do-does',            // Do she…? / I doesn't
  'frequency-position', // I go always
  'time-expressions',   // in 7 o'clock / at Monday
  'have-got',           // I have got not / Has you got
  'there-is-are',       // There are a dog / Have a dog in the box
  'preposition-place',  // on/in/under/next to
  'can-form',           // I can to swim / She cans
  'continuous-form',    // I working / I am work
  'wh-question',        // Where you live? / What time it is?
]);
export type ErrorTag = z.infer<typeof ErrorTag>;

const Base = z.object({
  id: z.string(),
  instruction: z.string(),
  hint: z.string().optional(),
  explain: z.string(),               // por qué la respuesta correcta es correcta
  tags: z.array(ErrorTag).default([]),
});

export const Exercise = z.discriminatedUnion('type', [
  Base.extend({ type: z.literal('choice'), prompt: z.string(), options: z.array(z.string()).min(2), answer: z.number() }),
  Base.extend({ type: z.literal('fill'), before: z.string(), after: z.string(), answers: z.array(z.string()).min(1), es: z.string().optional() }),
  Base.extend({ type: z.literal('order'), tokens: z.array(z.string()).min(2), answers: z.array(z.string()).min(1), es: z.string() }),
  Base.extend({ type: z.literal('build'), tokens: z.array(z.string()).min(2), answers: z.array(z.string()).min(1), es: z.string() }),
  Base.extend({ type: z.literal('translate'), es: z.string(), answers: z.array(z.string()).min(1) }),
  Base.extend({ type: z.literal('spot'), tokens: z.array(z.string()).min(2), wrong: z.number() }),
  Base.extend({ type: z.literal('fix'), wrongSentence: z.string(), answers: z.array(z.string()).min(1) }),
  Base.extend({ type: z.literal('match'), pairs: z.array(z.tuple([z.string(), z.string()])).min(2) }),
  /** Escuchar (voz del navegador) y elegir. accent opcional fuerza UK o US. */
  Base.extend({ type: z.literal('listen'), say: z.string(), accent: z.enum(['en-GB', 'en-US']).optional(), options: z.array(z.string()).min(2), answer: z.number() }),
]);
export type Exercise = z.infer<typeof Exercise>;
export type ExerciseType = Exercise['type'];

/** Lo mínimo que se repasa con repetición espaciada. */
export const Concept = z.object({
  id: z.string(),
  kind: z.enum(['grammar', 'vocab', 'expression', 'irregular']),
  prompt: z.string(),            // lo que ve el alumno (en español)
  answers: z.array(z.string()).min(1),
  note: z.string().optional(),
});
export type Concept = z.infer<typeof Concept>;

export const VocabItem = z.object({
  id: z.string(),
  en: z.string(),
  es: z.string(),
  ipa: z.string(),
  hint: z.string(),              // pronunciación orientativa
  pos: z.enum(['pronombre', 'verbo', 'sustantivo', 'adjetivo', 'adverbio', 'preposición', 'expresión', 'número', 'determinante', 'conjunción', 'letra']),
  topic: z.string(),
  example: z.string(),
  exampleEs: z.string(),
  variants: z.string().optional(),
  /** Respuestas aceptadas en las tarjetas (por defecto, `en`). */
  answers: z.array(z.string()).optional(),
});
export type VocabItem = z.infer<typeof VocabItem>;

const Example = z.object({ en: z.string(), es: z.string(), note: z.string().optional() });

export const Lesson = z.object({
  id: z.string(),
  level: z.enum(['PRE_A1', 'A1', 'A2', 'B1', 'B2']),
  unit: z.string(),
  category: z.enum(['grammar', 'vocabulary', 'pronunciation', 'communication']),
  title: z.string(),
  room: z.string(),              // nombre de la "sala" en el juego
  objectives: z.array(z.string()),
  prerequisites: z.array(z.string()),
  intro: z.string(),
  meaning: z.string(),
  when: z.array(z.string()),
  how: z.string(),
  affirmative: z.array(Example).optional(),
  negative: z.array(Example).optional(),
  interrogative: z.array(Example).optional(),
  table: z.object({ head: z.array(z.string()), rows: z.array(z.array(z.string())) }).optional(),
  examples: z.array(Example),
  errors: z.array(z.object({ wrong: z.string(), right: z.string(), why: z.string() })),
  comparison: z.object({ title: z.string(), body: z.string() }),
  /** Explicaciones alternativas, cada una más sencilla que la anterior (botón NO LO ENTIENDO). */
  simpler: z.array(z.string()).min(1),
  vocab: z.array(z.string()),     // ids de vocabulario que se enseñan aquí
  concepts: z.array(Concept),
  guided: z.array(Exercise),
  independent: z.array(Exercise),
  final: z.array(Exercise),
});
export type Lesson = z.infer<typeof Lesson>;

export const Unit = z.object({
  id: z.string(),
  level: z.enum(['PRE_A1', 'A1', 'A2', 'B1', 'B2']),
  title: z.string(),
  building: z.string(),
  lessons: z.array(z.string()),
  horde: z.object({ title: z.string(), exercises: z.array(Exercise), passPct: z.number() }),
});
export type Unit = z.infer<typeof Unit>;
