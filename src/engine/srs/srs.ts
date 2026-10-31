import { createEmptyCard, fsrs, generatorParameters, Rating, State, type Card, type Grade } from 'ts-fsrs';

/** Estados de dominio (índice ordenado). */
export const MASTERY = ['nuevo', 'aprendiendo', 'en repaso', 'consolidado', 'dominado'] as const;
export type Mastery = (typeof MASTERY)[number];

/** Tarjeta serializable (las fechas se guardan como ISO). */
export interface SrsCard {
  conceptId: string;
  due: string;
  stability: number;
  difficulty: number;
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  state: State;
  lastReview: string | null;
  learnedAt: string;
  correctCount: number;
  errorCount: number;
  correctDays: string[];   // días distintos con acierto (YYYY-MM-DD)
  recent: boolean[];       // últimos 5 resultados
  interleavedCorrect: number;
  mastery: number;         // índice en MASTERY
}

const scheduler = fsrs(generatorParameters({ enable_short_term: false, enable_fuzz: false }));

export const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function toCard(c: SrsCard): Card {
  return {
    due: new Date(c.due), stability: c.stability, difficulty: c.difficulty,
    elapsed_days: c.elapsedDays, scheduled_days: c.scheduledDays, reps: c.reps,
    lapses: c.lapses, state: c.state, last_review: c.lastReview ? new Date(c.lastReview) : undefined,
  } as Card;
}

function fromCard(base: SrsCard, card: Card): SrsCard {
  return {
    ...base,
    due: card.due.toISOString(), stability: card.stability, difficulty: card.difficulty,
    elapsedDays: card.elapsed_days, scheduledDays: card.scheduled_days, reps: card.reps,
    lapses: card.lapses, state: card.state,
    lastReview: card.last_review ? new Date(card.last_review).toISOString() : null,
  };
}

/**
 * Criterio de dominio (ver plan técnico):
 * - aprendiendo: al menos 1 acierto
 * - en repaso: está en el calendario y lleva 2+ repeticiones
 * - consolidado: 3 aciertos en 3 días distintos y último intervalo ≥ 7 días
 * - dominado: 5 aciertos en días distintos, ≥85 % en los últimos 5, intervalo ≥ 21 días
 *             y al menos un acierto en una sesión mezclada (interleaving)
 */
export function criterionMastery(c: SrsCard): number {
  const days = c.correctDays.length;
  const acc = c.recent.length >= 5 ? c.recent.filter(Boolean).length / c.recent.length : 0;
  if (days >= 5 && acc >= 0.85 && c.scheduledDays >= 21 && c.interleavedCorrect >= 1) return 4;
  if (days >= 3 && c.scheduledDays >= 7) return 3;
  if (c.reps >= 2) return 2;
  if (c.correctCount >= 1) return 1;
  return 0;
}

/** Crea la tarjeta cuando se supera la lección: cuenta como primer acierto, primer repaso en ~1 día. */
export function newCardFromLesson(conceptId: string, now = new Date()): SrsCard {
  const empty = createEmptyCard(now);
  const base: SrsCard = {
    conceptId, due: now.toISOString(), stability: 0, difficulty: 0, elapsedDays: 0, scheduledDays: 0,
    reps: 0, lapses: 0, state: State.New, lastReview: null, learnedAt: now.toISOString(),
    correctCount: 1, errorCount: 0, correctDays: [dayKey(now)], recent: [true], interleavedCorrect: 0, mastery: 1,
  };
  const next = scheduler.next(empty, now, Rating.Hard).card;
  return fromCard(base, next);
}

/** Nota FSRS automática: el alumno no se autoevalúa. */
export function autoGrade(correct: boolean, usedHelp: boolean, ms: number): Grade {
  if (!correct) return Rating.Again;
  if (usedHelp || ms > 20000) return Rating.Hard;
  if (ms < 4000) return Rating.Easy;
  return Rating.Good;
}

export function review(c: SrsCard, correct: boolean, opts: { usedHelp: boolean; ms: number; mixed: boolean }, now = new Date()): SrsCard {
  const grade = autoGrade(correct, opts.usedHelp, opts.ms);
  const card = scheduler.next(toCard(c), now, grade).card;
  const today = dayKey(now);
  let next: SrsCard = fromCard(c, card);
  next = {
    ...next,
    correctCount: c.correctCount + (correct ? 1 : 0),
    errorCount: c.errorCount + (correct ? 0 : 1),
    correctDays: correct && !c.correctDays.includes(today) ? [...c.correctDays, today] : c.correctDays,
    recent: [...c.recent, correct].slice(-5),
    interleavedCorrect: c.interleavedCorrect + (correct && opts.mixed ? 1 : 0),
  };
  // Un acierto nunca baja el estado; un fallo baja UN estado, nunca por debajo de "aprendiendo".
  next.mastery = correct ? Math.max(c.mastery, criterionMastery(next)) : Math.max(1, c.mastery - 1);
  return next;
}

export const isDue = (c: SrsCard, now = new Date()) => new Date(c.due).getTime() <= now.getTime();

/** Modo regreso: como mucho 30 repasos por sesión, los más vencidos primero, mezclando lecciones. */
export function buildSession(cards: SrsCard[], now = new Date(), max = 30): SrsCard[] {
  return cards
    .filter((c) => isDue(c, now))
    .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime())
    .slice(0, max);
}
