import { describe, expect, it } from 'vitest';
import { checkAnswer, matchesAny, normalize } from '../src/engine/exercises/check';
import { newCardFromLesson, review, criterionMastery } from '../src/engine/srs/srs';
import { LESSONS, UNITS } from '../src/content/curriculum';
import { missions } from '../src/engine/gamification/missions';

describe('corrección de respuestas', () => {
  it('normaliza apóstrofos, mayúsculas y puntuación', () => {
    expect(normalize("  I’M   Tired. ")).toBe("i'm tired");
    expect(matchesAny('yes I am', ['Yes, I am'])).toBe(true);
    expect(matchesAny('', ['I'])).toBe(false);
  });
  it('acepta contracción y forma completa', () => {
    const ex = LESSONS[1]!.final.find((e) => e.id === 'l2-f6')!;
    expect(checkAnswer(ex, { type: 'text', value: "I'm Sandra" })).toBe(true);
    expect(checkAnswer(ex, { type: 'text', value: 'I am Sandra.' })).toBe(true);
    expect(checkAnswer(ex, { type: 'text', value: 'Am Sandra' })).toBe(false);
  });
  it('ordenar palabras compara la frase completa', () => {
    const ex = LESSONS[2]!.guided.find((e) => e.id === 'l3-g3')!;
    expect(checkAnswer(ex, { type: 'tokens', value: ['Are', 'you', 'safe?'] })).toBe(true);
    expect(checkAnswer(ex, { type: 'tokens', value: ['you', 'Are', 'safe?'] })).toBe(false);
  });
});

describe('contenido', () => {
  it('cada ejercicio de elección tiene una respuesta válida', () => {
    const all = [...LESSONS.flatMap((l) => [...l.guided, ...l.independent, ...l.final]), ...UNITS.flatMap((u) => u.horde.exercises)];
    for (const e of all) {
      if (e.type === 'choice') expect(e.options[e.answer]).toBeDefined();
      if (e.type === 'spot') expect(e.tokens[e.wrong]).toBeDefined();
      if (e.type === 'order' || e.type === 'build') {
        // las fichas permiten construir la respuesta
        const words = e.answers[0]!.split(' ');
        for (const w of words) expect(e.tokens.some((t) => normalize(t) === normalize(w))).toBe(true);
      }
    }
  });
  it('los ids son únicos', () => {
    const ids = [...LESSONS.flatMap((l) => [...l.guided, ...l.independent, ...l.final].map((e) => e.id)), ...UNITS.flatMap((u) => u.horde.exercises.map((e) => e.id))];
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('repetición espaciada y dominio', () => {
  it('una tarjeta nueva no está dominada y vuelve en ~1 día', () => {
    const now = new Date('2026-11-01T10:00:00');
    const c = newCardFromLesson('x', now);
    expect(c.mastery).toBe(1);
    const days = (new Date(c.due).getTime() - now.getTime()) / 86400000;
    expect(days).toBeGreaterThanOrEqual(1);
    expect(days).toBeLessThanOrEqual(3);
  });
  it('un solo acierto nunca marca dominado', () => {
    const now = new Date('2026-11-01T10:00:00');
    let c = newCardFromLesson('x', now);
    c = review(c, true, { usedHelp: false, ms: 3000, mixed: true }, new Date('2026-11-02T10:00:00'));
    expect(c.mastery).toBeLessThan(4);
  });
  it('llega a dominado tras aciertos espaciados en días distintos', () => {
    let t = new Date('2026-11-01T10:00:00');
    let c = newCardFromLesson('x', t);
    for (let i = 0; i < 8; i++) {
      t = new Date(c.due);
      c = review(c, true, { usedHelp: false, ms: 6000, mixed: true }, t);
    }
    expect(c.correctDays.length).toBeGreaterThanOrEqual(5);
    expect(c.mastery).toBe(4);
  });
  it('un fallo baja un solo estado y nunca a cero', () => {
    const c = { ...newCardFromLesson('x'), mastery: 3 };
    const after = review(c, false, { usedHelp: false, ms: 5000, mixed: false });
    expect(after.mastery).toBe(2);
    const low = review({ ...c, mastery: 1 }, false, { usedHelp: false, ms: 5000, mixed: false });
    expect(low.mastery).toBe(1);
    expect(criterionMastery({ ...c, correctCount: 0, reps: 0 })).toBe(0);
  });
});

describe('gamificación sin castigo', () => {
  it('sin actividad, ningún encargo resta ni se marca como fallido', () => {
    const state = { settings: {} as never, lessons: {}, hordes: {}, cards: {}, errors: {}, days: {}, xp: [], builtSentences: 0, achievements: {}, claimed: {}, lastLessonId: null, activities: {}, levelExams: {}, cosmetics: { avatar: 'casco', frame: 'menta' } };
    const m = missions(state);
    expect(m.every((x) => x.xp > 0)).toBe(true);
    expect(m.flatMap((x) => x.objectives).every((o) => o.done === false)).toBe(true);
  });
});

import { checkWriting } from '../src/engine/writing';
import { WRITING_TASKS, TRANSMISSIONS, READINGS } from '../src/content/skills';
import { EXAM_PRE_A1 } from '../src/content/exams';
import { ALL_CONCEPTS } from '../src/content/curriculum';

describe('contenido PRE-A1 completo', () => {
  it('hay 16 salas y los ejercicios de escucha son válidos', () => {
    expect(LESSONS.length).toBe(16);
    const all = [...LESSONS.flatMap((l) => [...l.guided, ...l.independent, ...l.final]), ...UNITS.flatMap((u) => u.horde.exercises), ...EXAM_PRE_A1.sections.flatMap((s) => s.exercises), ...TRANSMISSIONS.flatMap((t) => t.questions), ...READINGS.flatMap((r) => r.questions)];
    for (const e of all) {
      if (e.type === 'listen' || e.type === 'choice') expect(e.options[e.answer], e.id).toBeDefined();
      if (e.type === 'order' || e.type === 'build') for (const w of e.answers[0]!.split(' ')) expect(e.tokens.some((t) => normalize(t) === normalize(w)), `${e.id}: ${w}`).toBe(true);
    }
    expect(new Set(all.map((e) => e.id)).size).toBe(all.length);
  });
  it('cada sala tiene prerrequisito excepto la primera y no hay ciclos', () => {
    const ids = new Set(LESSONS.map((l) => l.id));
    LESSONS.slice(1).forEach((l) => { expect(l.prerequisites.length).toBeGreaterThan(0); l.prerequisites.forEach((p) => expect(ids.has(p)).toBe(true)); });
  });
  it('los ids de conceptos son únicos', () => {
    expect(new Set(ALL_CONCEPTS.map((c) => c.id)).size).toBe(ALL_CONCEPTS.length);
  });
});

describe('corrector de escritura', () => {
  const age = WRITING_TASKS.find((t) => t.id === 'w2')!;
  const from = WRITING_TASKS.find((t) => t.id === 'w3')!;
  it('detecta "I have 25 years" y lo corrige', () => {
    const r = checkWriting(age, 'i have 25 years');
    expect(r.ok).toBe(false);
    expect(r.corrected).toBe("I'm 25");
    expect(r.issues[0]!.rule).toMatch(/be/);
  });
  it('acepta respuestas correctas', () => {
    expect(checkWriting(age, "I'm twenty-five.").ok).toBe(true);
    expect(checkWriting(from, "I'm from Spain.").ok).toBe(true);
  });
  it('detecta país en minúscula y nacionalidad en vez de país', () => {
    expect(checkWriting(from, "I'm from spain").ok).toBe(false);
    expect(checkWriting(from, "I'm from Spanish").corrected).toBe("I'm from Spain");
  });
});
