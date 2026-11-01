import type { GameState } from '../../lib/store';
import { BIOMES, LESSONS, PLAYABLE, TOTAL_TOPICS, UNITS, lessonById, levelIndex, type LevelCode } from '../../content/curriculum';
import { buildSession, dayKey, isDue } from '../srs/srs';
import type { ErrorTag } from '../../content/schema';
import { READINGS, SPEAKING, TRANSMISSIONS, WRITING_TASKS } from '../../content/skills';

export const totalXp = (s: GameState) => s.xp.reduce((n, e) => n + e.amount, 0);

/** Nivel de superviviente (cosmético, distinto del nivel MCER). Cada nivel cuesta 100 + 50·(n−1) XP. */
export function survivorLevel(xp: number) {
  let level = 1, need = 100, acc = 0;
  while (xp >= acc + need) { acc += need; level++; need = 100 + 50 * (level - 1); }
  return { level, into: xp - acc, need };
}

export const isPassed = (s: GameState, id: string) => s.lessons[id]?.status === 'passed';

/**
 * Un nivel está abierto si es el primero o si se ha vencido al jefe final del nivel anterior.
 * (El examen por competencias es la prueba de dominio; no basta con completar salas.)
 */
export const levelOpen = (s: GameState, level: LevelCode) => {
  const i = levelIndex(level);
  if (i <= 0) return true;
  return !!s.levelExams[BIOMES[i - 1]!.code]?.passed;
};

/** Una sala está abierta si su nivel está abierto y todos sus prerrequisitos están superados. */
export const isUnlocked = (s: GameState, id: string) => {
  const l = lessonById(id);
  return !!l && levelOpen(s, l.level) && l.prerequisites.every((p) => isPassed(s, p));
};

export const hordeUnlocked = (s: GameState, unitId: string) => {
  const u = UNITS.find((x) => x.id === unitId);
  return !!u && u.lessons.every((id) => isPassed(s, id));
};

/** Temas del MCER terminados: todas sus salas superadas (y existen salas). */
export function topicsDone(s: GameState) {
  return BIOMES.flatMap((b) => b.topics).filter((t) => t.lessons.length > 0 && t.lessons.every((id) => isPassed(s, id))).length;
}
export const progressToB2 = (s: GameState) => Math.round((topicsDone(s) / TOTAL_TOPICS) * 1000) / 10;

/** El nivel MCER actual: el primer nivel jugable cuyo jefe no se ha vencido. */
export const currentBiome = (s?: GameState) => {
  const code = s ? PLAYABLE.find((c) => !s.levelExams[c]?.passed) ?? PLAYABLE[PLAYABLE.length - 1]! : 'PRE_A1';
  return BIOMES[levelIndex(code)]!;
};
export const nextBiome = (s: GameState) => BIOMES[levelIndex(currentBiome(s).code) + 1];

/** Porcentaje de temas terminados de un nivel. */
export const levelPct = (s: GameState, level: LevelCode) => {
  const b = BIOMES[levelIndex(level)]!;
  const done = b.topics.filter((t) => t.lessons.length > 0 && t.lessons.every((id) => isPassed(s, id))).length;
  return Math.round((done / b.topics.length) * 100);
};

export const dueCards = (s: GameState) => Object.values(s.cards).filter((c) => isDue(c));
export const sessionCards = (s: GameState) => buildSession(Object.values(s.cards));
export const infections = (s: GameState) =>
  (Object.entries(s.errors) as [ErrorTag, NonNullable<GameState['errors'][ErrorTag]>][]).filter(([, e]) => e.infected);

export const nextLesson = (s: GameState) => LESSONS.find((l) => !isPassed(s, l.id) && isUnlocked(s, l.id));

export const studyDays = (s: GameState) => Object.entries(s.days).filter(([, d]) => d.exercises + d.reviews > 0).map(([k]) => k);

/** Competencias: solo Grammar y Vocabulary tienen contenido evaluable por ahora. */
export function competencyPct(s: GameState) {
  const cards = Object.values(s.cards);
  const level = currentBiome(s).code;
  const pool = LESSONS.filter((l) => l.level === level);
  const grammarIds = new Set(pool.flatMap((l) => l.concepts.filter((c) => c.kind === 'grammar').map((c) => c.id)));
  const otherIds = new Set(pool.flatMap((l) => l.concepts.filter((c) => c.kind !== 'grammar').map((c) => c.id)));
  const g = cards.filter((c) => grammarIds.has(c.conceptId));
  const v = cards.filter((c) => otherIds.has(c.conceptId));
  const pct = (arr: typeof cards, total: number) => (total ? Math.round((arr.reduce((n, c) => n + c.mastery, 0) / (total * 4)) * 100) : 0);
  const totalG = grammarIds.size;
  const totalV = otherIds.size;
  const act = (prefix: string, items: { id: string; level: LevelCode }[]) => {
    const mine = items.filter((x) => x.level === level);
    return mine.length ? Math.round((mine.filter((x) => s.activities[`${prefix}${x.id}`]?.completedAt).length / mine.length) * 100) : 0;
  };
  return {
    grammar: pct(g, totalG), vocabulary: pct(v, totalV),
    listening: act('radio:', TRANSMISSIONS), reading: act('lectura:', READINGS),
    writing: act('escritura:', WRITING_TASKS), speaking: act('walkie:', SPEAKING),
  };
}

export const ERROR_LABELS: Record<ErrorTag, { label: string; lesson: string }> = {
  'pronoun-choice': { label: 'Elegir el pronombre', lesson: 'pre-a1-u1-l1' },
  'it-for-things': { label: 'it para cosas', lesson: 'pre-a1-u1-l1' },
  'missing-subject': { label: 'Olvidar el sujeto', lesson: 'pre-a1-u1-l2' },
  'i-lowercase': { label: 'I en minúscula', lesson: 'pre-a1-u1-l1' },
  'be-agreement': { label: 'am / is / are', lesson: 'pre-a1-u1-l2' },
  'be-age': { label: 'Edad, hambre, frío con be', lesson: 'pre-a1-u1-l2' },
  'be-negative-order': { label: 'Dónde va not', lesson: 'pre-a1-u1-l3' },
  'be-question-order': { label: 'Orden de la pregunta', lesson: 'pre-a1-u1-l3' },
  'short-answer': { label: 'Respuestas cortas', lesson: 'pre-a1-u1-l3' },
  'word-order': { label: 'Orden de palabras', lesson: 'pre-a1-u4-l16' },
  'letter-names': { label: 'Nombres de las letras', lesson: 'pre-a1-u2-l4' },
  pronunciation: { label: 'Pronunciación', lesson: 'pre-a1-u2-l5' },
  sounds: { label: 'Sonidos (th, h, sh)', lesson: 'pre-a1-u2-l6' },
  numbers: { label: 'Números', lesson: 'pre-a1-u2-l7' },
  capitals: { label: 'Mayúsculas', lesson: 'pre-a1-u3-l8' },
  'article-a-an': { label: 'a o an', lesson: 'pre-a1-u3-l9' },
  'article-job': { label: 'a con profesiones', lesson: 'pre-a1-u3-l9' },
  'plural-form': { label: 'Formar el plural', lesson: 'pre-a1-u3-l10' },
  'adjective-plural': { label: 'Adjetivos sin plural', lesson: 'pre-a1-u3-l10' },
  'adjective-order': { label: 'Adjetivo antes del sustantivo', lesson: 'pre-a1-u3-l12' },
  possessive: { label: 'his o her', lesson: 'pre-a1-u4-l13' },
  'preposition-time': { label: 'on (días) / in (meses)', lesson: 'pre-a1-u4-l14' },
  greetings: { label: 'Saludos', lesson: 'pre-a1-u4-l15' },
  'country-nationality': { label: 'País o nacionalidad', lesson: 'pre-a1-u4-l15' },
  'third-person-s': { label: 'La -s de he/she/it', lesson: 'a1-u1-l17' },
  'do-does': { label: 'do o does', lesson: 'a1-u1-l18' },
  'frequency-position': { label: 'Dónde va always/never', lesson: 'a1-u1-l19' },
  'time-expressions': { label: 'at / in / on con la hora', lesson: 'a1-u1-l20' },
  'have-got': { label: 'have got / has got', lesson: 'a1-u2-l21' },
  'there-is-are': { label: 'there is / there are', lesson: 'a1-u2-l22' },
  'preposition-place': { label: 'Preposiciones de lugar', lesson: 'a1-u2-l23' },
  'can-form': { label: 'can sin to ni -s', lesson: 'a1-u3-l25' },
  'continuous-form': { label: 'am/is/are + -ing', lesson: 'a1-u3-l26' },
  'wh-question': { label: 'Orden de las WH questions', lesson: 'a1-u3-l27' },
};

export type Recommendation = { title: string; why: string; href: string; cta: string };

/** Qué estudiar ahora: repasos vencidos > infecciones > siguiente sala > horda. */
export function recommend(s: GameState): Recommendation {
  const due = sessionCards(s).length;
  if (due > 0) return { title: `Repara ${due} ${due === 1 ? 'muro' : 'muros'}`, why: 'Repasar justo cuando empiezas a olvidar es lo que fija la memoria a largo plazo.', href: '#mantenimiento', cta: 'Empezar repaso' };
  const inf = infections(s)[0];
  if (inf) {
    const info = ERROR_LABELS[inf[0]];
    return { title: `Cura la infección: ${info.label}`, why: 'Has fallado varias veces en lo mismo. Repasa la explicación y practica esa sala.', href: `#sala-${info.lesson}`, cta: 'Ir al antídoto' };
  }
  const next = nextLesson(s);
  if (next) return { title: `Sala: ${next.title}`, why: next.objectives[0] ?? '', href: `#sala-${next.id}`, cta: 'Entrar en la sala' };
  const unit = UNITS.find((u) => levelOpen(s, u.level) && hordeUnlocked(s, u.id) && !s.hordes[u.id]?.passed);
  if (unit) return { title: unit.horde.title, why: `Has superado todas las salas de «${unit.building}». La horda mezcla todo lo aprendido.`, href: `#horda-${unit.id}`, cta: 'Enfrentar la horda' };
  const boss = PLAYABLE.find((c) => levelOpen(s, c) && biomeGate(s, c).allHordes && !s.levelExams[c]?.passed);
  if (boss) {
    const b = BIOMES[levelIndex(boss)]!;
    return { title: `Jefe final: ${b.boss}`, why: `Has vencido todas las hordas de ${b.label}. El examen por competencias decide si dominas el nivel y abre el siguiente.`, href: `#jefe-${examSlug(boss)}`, cta: 'Enfrentar al jefe' };
  }
  const radio = TRANSMISSIONS.find((t) => isPassed(s, t.requires) && !s.activities[`radio:${t.id}`]?.completedAt);
  if (radio) return { title: `Transmisión: ${radio.title}`, why: 'Escuchar lo que ya sabes leer es lo que más ayuda a entender el inglés hablado.', href: '#radio', cta: 'Encender la radio' };
  const read = READINGS.find((r) => isPassed(s, r.requires) && !s.activities[`lectura:${r.id}`]?.completedAt);
  if (read) return { title: `Diario: ${read.title}`, why: 'Leer textos con lo que has aprendido fija el vocabulario en contexto.', href: '#diarios', cta: 'Leer el diario' };
  const wr = WRITING_TASKS.find((w) => isPassed(s, w.requires) && !s.activities[`escritura:${w.id}`]?.completedAt);
  if (wr) return { title: `Escribe: ${wr.title}`, why: 'Producir tus propias frases es la mejor prueba de que lo has entendido.', href: '#fabricacion', cta: 'Ir al banco' };
  return { title: 'Todo al día', why: 'No hay repasos pendientes y has terminado todo lo disponible. El siguiente nivel está en construcción. Descansar no resta nada.', href: '#saqueo', cta: 'Revisar el botín' };
}

export const todayKey = () => dayKey(new Date());

export const examSlug = (level: LevelCode) => level.toLowerCase().replace('_', '-');
export const slugToLevel = (slug: string): LevelCode | undefined => PLAYABLE.find((c) => examSlug(c) === slug);

/**
 * Estado del final de un nivel: hordas, jefe y consolidación.
 * Abre el siguiente nivel vencer al jefe; la consolidación (80 %) es la recomendación para no olvidar.
 */
export function biomeGate(s: GameState, level: LevelCode = 'PRE_A1') {
  const ids = LESSONS.filter((l) => l.level === level).flatMap((l) => l.concepts.map((c) => c.id));
  const consolidated = ids.filter((id) => (s.cards[id]?.mastery ?? 0) >= 3).length;
  const pct = ids.length ? Math.round((consolidated / ids.length) * 100) : 0;
  const allHordes = UNITS.filter((u) => u.level === level).every((u) => s.hordes[u.id]?.passed);
  const exam = s.levelExams[level];
  return { allHordes, examPassed: !!exam?.passed, provisional: !!exam?.provisional, consolidatedPct: pct, open: !!exam?.passed };
}
