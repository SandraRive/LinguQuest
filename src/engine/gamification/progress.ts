import type { GameState } from '../../lib/store';
import { BIOMES, LESSONS, TOTAL_TOPICS, UNITS, lessonById } from '../../content/curriculum';
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

/** Una sala está abierta si todos sus prerrequisitos están superados. */
export const isUnlocked = (s: GameState, id: string) => {
  const l = lessonById(id);
  return !!l && l.prerequisites.every((p) => isPassed(s, p));
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

/** El nivel MCER actual: el primer bioma cuyo jefe no se ha vencido. Hoy solo existe el PRE-A1. */
export const currentBiome = () => BIOMES[0]!;

export const dueCards = (s: GameState) => Object.values(s.cards).filter((c) => isDue(c));
export const sessionCards = (s: GameState) => buildSession(Object.values(s.cards));
export const infections = (s: GameState) =>
  (Object.entries(s.errors) as [ErrorTag, NonNullable<GameState['errors'][ErrorTag]>][]).filter(([, e]) => e.infected);

export const nextLesson = (s: GameState) => LESSONS.find((l) => !isPassed(s, l.id) && isUnlocked(s, l.id));

export const studyDays = (s: GameState) => Object.entries(s.days).filter(([, d]) => d.exercises + d.reviews > 0).map(([k]) => k);

/** Competencias: solo Grammar y Vocabulary tienen contenido evaluable por ahora. */
export function competencyPct(s: GameState) {
  const cards = Object.values(s.cards);
  const grammarIds = new Set(LESSONS.flatMap((l) => l.concepts.filter((c) => c.kind === 'grammar').map((c) => c.id)));
  const g = cards.filter((c) => grammarIds.has(c.conceptId));
  const v = cards.filter((c) => !grammarIds.has(c.conceptId));
  const pct = (arr: typeof cards, total: number) => (total ? Math.round((arr.reduce((n, c) => n + c.mastery, 0) / (total * 4)) * 100) : 0);
  const totalG = grammarIds.size;
  const totalV = LESSONS.flatMap((l) => l.concepts).length - totalG;
  const act = (prefix: string, total: number) => total ? Math.round((Object.entries(s.activities).filter(([k, a]) => k.startsWith(prefix) && a.completedAt).length / total) * 100) : 0;
  return {
    grammar: pct(g, totalG), vocabulary: pct(v, totalV),
    listening: act('radio:', TRANSMISSIONS.length), reading: act('lectura:', READINGS.length),
    writing: act('escritura:', WRITING_TASKS.length), speaking: act('walkie:', SPEAKING.length),
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
  const unit = UNITS.find((u) => hordeUnlocked(s, u.id) && !s.hordes[u.id]?.passed);
  if (unit) return { title: unit.horde.title, why: `Has superado todas las salas de «${unit.building}». La horda mezcla todo lo aprendido.`, href: `#horda-${unit.id}`, cta: 'Enfrentar la horda' };
  const radio = TRANSMISSIONS.find((t) => isPassed(s, t.requires) && !s.activities[`radio:${t.id}`]?.completedAt);
  if (radio) return { title: `Transmisión: ${radio.title}`, why: 'Escuchar lo que ya sabes leer es lo que más ayuda a entender el inglés hablado.', href: '#radio', cta: 'Encender la radio' };
  const read = READINGS.find((r) => isPassed(s, r.requires) && !s.activities[`lectura:${r.id}`]?.completedAt);
  if (read) return { title: `Diario: ${read.title}`, why: 'Leer textos con lo que has aprendido fija el vocabulario en contexto.', href: '#diarios', cta: 'Leer el diario' };
  const wr = WRITING_TASKS.find((w) => isPassed(s, w.requires) && !s.activities[`escritura:${w.id}`]?.completedAt);
  if (wr) return { title: `Escribe: ${wr.title}`, why: 'Producir tus propias frases es la mejor prueba de que lo has entendido.', href: '#fabricacion', cta: 'Ir al banco' };
  if (UNITS.every((u) => s.hordes[u.id]?.passed) && !s.levelExams['PRE_A1']?.passed) return { title: 'Jefe final de PRE-A1', why: 'Has vencido todas las hordas. El examen por competencias decide si dominas el nivel.', href: '#jefe-pre-a1', cta: 'Enfrentar al jefe' };
  return { title: 'Todo al día', why: 'No hay repasos pendientes. Las próximas salas llegan en la siguiente fase. Descansar no resta nada.', href: '#saqueo', cta: 'Revisar el botín' };
}

export const todayKey = () => dayKey(new Date());

/** Puerta al siguiente bioma: jefe vencido + 80 % de los conceptos del nivel consolidados. */
export function biomeGate(s: GameState, level: 'PRE_A1' = 'PRE_A1') {
  const ids = LESSONS.filter((l) => l.level === level).flatMap((l) => l.concepts.map((c) => c.id));
  const consolidated = ids.filter((id) => (s.cards[id]?.mastery ?? 0) >= 3).length;
  const pct = ids.length ? Math.round((consolidated / ids.length) * 100) : 0;
  const allHordes = UNITS.filter((u) => u.level === level).every((u) => s.hordes[u.id]?.passed);
  const exam = s.levelExams[level];
  return { allHordes, examPassed: !!exam?.passed, provisional: !!exam?.provisional, consolidatedPct: pct, open: !!exam?.passed && pct >= 80 };
}
