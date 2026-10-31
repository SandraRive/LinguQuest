import { describe, expect, it } from 'vitest';
import { encodeProgress, toChunks, parseChunk, decodeChunks, summarize } from '../src/lib/transfer';
import { ALL_CONCEPTS, LESSONS } from '../src/content/curriculum';
import { newCardFromLesson } from '../src/engine/srs/srs';
import type { GameState } from '../src/lib/store';

/** Progreso "pesado": PRE-A1 completo, un año de actividad y 2000 eventos de XP. */
function heavy(): GameState {
  const cards = Object.fromEntries(ALL_CONCEPTS.map((c) => [c.id, { ...newCardFromLesson(c.id), correctDays: ['2026-10-01', '2026-10-05', '2026-10-12'], recent: [true, true, false, true, true] }]));
  const days = Object.fromEntries(Array.from({ length: 365 }, (_, i) => [new Date(2026, 0, 1 + i).toISOString().slice(0, 10), { seconds: 900, exercises: 30, correct: 25, reviews: 20, lessons: 0 }]));
  const xp = Array.from({ length: 2000 }, (_, i) => ({ source: ['Ejercicio', 'Muro reparado', 'Sala superada'][i % 3]!, amount: 5, at: new Date(2026, 0, 1 + (i % 300), 10, i % 60).toISOString() }));
  return {
    settings: { name: 'Sandra', theme: 'system', textScale: 1, motion: true, accent: 'en-GB', speechRate: 0.85 },
    lessons: Object.fromEntries(LESSONS.map((l) => [l.id, { status: 'passed' as const, bestScore: 90, attempts: 2 }])),
    hordes: {}, cards, errors: {}, days, xp, builtSentences: 40, achievements: { 'first-room': '2026-10-01' }, claimed: {}, lastLessonId: null,
    activities: {}, levelExams: {}, cosmetics: { avatar: 'casco', frame: 'menta' },
  };
}

describe('traspaso entre dispositivos', () => {
  it('ida y vuelta sin perder lo importante', async () => {
    const d = heavy();
    const chunks = toChunks(await encodeProgress(d));
    console.log('códigos QR para un año de uso:', chunks.length);
    expect(chunks.length).toBeLessThanOrEqual(25);
    const back = await decodeChunks(chunks.map((c) => parseChunk(c)!));
    expect(summarize(back).lessons).toBe(LESSONS.length);
    expect(summarize(back).xp).toBe(summarize(d).xp);
    expect(Object.keys(back.cards).length).toBe(ALL_CONCEPTS.length);
  });
  it('detecta códigos que faltan o son de otro traspaso', async () => {
    const chunks = toChunks(await encodeProgress(heavy())).map((c) => parseChunk(c)!);
    await expect(decodeChunks(chunks.slice(1))).rejects.toThrow();
    expect(parseChunk('hola')).toBeNull();
  });
});
