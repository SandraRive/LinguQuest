import { LESSONS as LESSONS_U1, UNIT1 } from './pre-a1/unit1';
import { LESSONS_U2, UNIT2 } from './pre-a1/unit2';
import { LESSONS_U3, UNIT3 } from './pre-a1/unit3';
import { LESSONS_U4, UNIT4 } from './pre-a1/unit4';
import { LESSONS_U5, UNIT5 } from './a1/unit5';
import { LESSONS_U6, UNIT6 } from './a1/unit6';
import { LESSONS_U7, UNIT7 } from './a1/unit7';
import { VOCAB } from './vocab';
import { Lesson as LessonSchema, Unit as UnitSchema, VocabItem as VocabSchema } from './schema';
import type { Lesson } from './schema';

export type LevelCode = 'PRE_A1' | 'A1' | 'A2' | 'B1' | 'B2';

export interface Biome {
  code: LevelCode;
  label: string;
  biome: string;
  boss: string;
  /** Temas del MCER del spec. `lessons` = salas ya construidas para ese tema. */
  topics: { name: string; lessons: string[] }[];
}

export const BIOMES: Biome[] = [
  {
    code: 'PRE_A1', label: 'PRE-A1', biome: 'El Refugio', boss: 'Horda de la Primera Noche',
    topics: [
      { name: 'Alfabeto inglés', lessons: ['pre-a1-u2-l4'] }, { name: 'Pronunciación inicial', lessons: ['pre-a1-u2-l5'] },
      { name: 'Sonidos básicos', lessons: ['pre-a1-u2-l6'] },
      { name: 'Pronombres personales', lessons: ['pre-a1-u1-l1'] },
      { name: 'Verbo TO BE', lessons: ['pre-a1-u1-l2', 'pre-a1-u1-l3'] },
      { name: 'Artículos', lessons: ['pre-a1-u3-l9'] }, { name: 'Sustantivos', lessons: ['pre-a1-u3-l8'] },
      { name: 'Singular y plural', lessons: ['pre-a1-u3-l10'] }, { name: 'Números', lessons: ['pre-a1-u2-l7'] },
      { name: 'Colores', lessons: ['pre-a1-u3-l12'] }, { name: 'Días y meses', lessons: ['pre-a1-u4-l14'] },
      { name: 'Familia', lessons: ['pre-a1-u4-l13'] }, { name: 'Objetos cotidianos', lessons: ['pre-a1-u3-l11'] },
      { name: 'Frases sencillas', lessons: ['pre-a1-u4-l16'] }, { name: 'Saludos y presentaciones', lessons: ['pre-a1-u4-l15'] },
    ],
  },
  {
    code: 'A1', label: 'A1', biome: 'Bosque', boss: 'El Leñador',
    topics: [
      { name: 'Present Simple', lessons: ['a1-u1-l17'] }, { name: 'Do / Does', lessons: ['a1-u1-l18'] },
      { name: 'Adverbios de frecuencia', lessons: ['a1-u1-l19'] }, { name: 'Rutinas', lessons: ['a1-u1-l20'] },
      { name: 'Have got', lessons: ['a1-u2-l21'] }, { name: 'There is / There are', lessons: ['a1-u2-l22'] },
      { name: 'Preposiciones básicas', lessons: ['a1-u2-l23'] }, { name: 'Descripciones', lessons: ['a1-u2-l24'] },
      { name: "Can / Can't", lessons: ['a1-u3-l25'] }, { name: 'Present Continuous', lessons: ['a1-u3-l26'] },
      { name: 'WH Questions', lessons: ['a1-u3-l27'] }, { name: 'Situaciones cotidianas', lessons: ['a1-u3-l28'] },
    ],
  },
  {
    code: 'A2', label: 'A2', biome: 'Desierto', boss: 'La Tormenta de Arena',
    topics: ['Past Simple', 'Past Continuous', 'Future with Will', 'Going to', 'Comparatives', 'Superlatives', 'Modal verbs', 'Countable / uncountable', 'Much / Many / A lot of', 'Present Perfect básico', 'Conversaciones cotidianas', 'Textos sencillos'].map((name) => ({ name, lessons: [] })),
  },
  {
    code: 'B1', label: 'B1', biome: 'Nieve', boss: 'El Coloso de Hielo',
    topics: ['Present Perfect', 'Present Perfect Continuous', 'Past Perfect', 'Future forms', 'First Conditional', 'Second Conditional', 'Passive Voice', 'Reported Speech', 'Relative Clauses', 'Gerunds and Infinitives', 'Phrasal Verbs', 'Expresar opiniones', 'Narraciones', 'Argumentación'].map((name) => ({ name, lessons: [] })),
  },
  {
    code: 'B2', label: 'B2', biome: 'Tierra Yerma', boss: 'La Horda Final',
    topics: ['Mixed Conditionals', 'Third Conditional', 'Advanced Passive', 'Advanced Reported Speech', 'Advanced Modals', 'Advanced Phrasal Verbs', 'Idiomatic Expressions', 'Discourse Markers', 'Inversion', 'Complex Sentences', 'Formal / Informal', 'Debates', 'Essays', 'Reports', 'Advanced Listening', 'Natural Conversations'].map((name) => ({ name, lessons: [] })),
  },
];

export const TOTAL_TOPICS = BIOMES.reduce((n, b) => n + b.topics.length, 0);
export const UNITS = [UNIT1, UNIT2, UNIT3, UNIT4, UNIT5, UNIT6, UNIT7];
export const LESSONS = [...LESSONS_U1, ...LESSONS_U2, ...LESSONS_U3, ...LESSONS_U4, ...LESSONS_U5, ...LESSONS_U6, ...LESSONS_U7];

/** Niveles con contenido jugable (tienen salas y jefe final). */
export const PLAYABLE: LevelCode[] = ['PRE_A1', 'A1'];
export const levelIndex = (code: LevelCode) => BIOMES.findIndex((b) => b.code === code);

// Validación del contenido al arrancar: si algo no cumple el esquema, falla en desarrollo.
LESSONS.forEach((l) => LessonSchema.parse(l));
UNITS.forEach((u) => UnitSchema.parse(u));
VOCAB.forEach((v) => VocabSchema.parse(v));

export const lessonById = (id: string): Lesson | undefined => LESSONS.find((l) => l.id === id);
const norm = (x: string) => x.toLowerCase().replace(/[^a-z' -]/g, '').trim();

/** Tarjetas de vocabulario (español → inglés) para las palabras de cada sala que no tengan ya concepto propio. */
const SKIP_POS = new Set(['pronombre', 'letra', 'determinante']);
const seenVocab = new Set<string>();
export const VOCAB_CONCEPTS = LESSONS.flatMap((l) => {
  const covered = new Set(l.concepts.flatMap((c) => c.answers.map(norm)));
  return l.vocab.flatMap((vid) => {
    const v = VOCAB.find((x) => x.id === vid);
    if (!v || SKIP_POS.has(v.pos) || seenVocab.has(vid)) return [];
    seenVocab.add(vid);
    const answers = v.answers ?? [v.en];
    if (answers.some((a) => covered.has(norm(a)))) return [];
    return [{ id: `vc-${v.id}`, kind: 'vocab' as const, prompt: v.es, answers, note: `${v.ipa} · suena «${v.hint}»`, lessonId: l.id }];
  });
});

export const ALL_CONCEPTS = [...LESSONS.flatMap((l) => l.concepts.map((c) => ({ ...c, lessonId: l.id }))), ...VOCAB_CONCEPTS];
export const conceptsForLesson = (id: string) => ALL_CONCEPTS.filter((c) => c.lessonId === id);
export const conceptById = (id: string) => ALL_CONCEPTS.find((c) => c.id === id);
export { VOCAB };
