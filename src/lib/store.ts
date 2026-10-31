import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import type { ErrorTag, Exercise } from '../content/schema';
import { conceptsForLesson, lessonById } from '../content/curriculum';
import { dayKey, newCardFromLesson, review, type SrsCard } from '../engine/srs/srs';
import { ACHIEVEMENTS } from '../engine/gamification/achievements';

/**
 * Persistencia local (localStorage) detrás de una interfaz sencilla.
 * Para pasar el progreso a otro dispositivo: Ficha → «Pasar a otro dispositivo» (códigos QR).
 */
const memory = new Map<string, string>();
const safeStorage: StateStorage = {
  getItem: (k) => { try { return localStorage.getItem(k); } catch { return memory.get(k) ?? null; } },
  setItem: (k, v) => { try { localStorage.setItem(k, v); } catch { memory.set(k, v); } },
  removeItem: (k) => { try { localStorage.removeItem(k); } catch { memory.delete(k); } },
};

export type Theme = 'system' | 'dark' | 'light';
export interface Settings {
  name: string;
  theme: Theme;
  textScale: 1 | 1.15 | 1.3 | 1.5;
  motion: boolean;
  accent: 'en-GB' | 'en-US';
  speechRate: number;
  /** Máximo de conceptos nuevos que entran a repaso cada día. */
  newPerDay?: number;
}
export interface LessonProgress { status: 'in-progress' | 'passed'; bestScore: number; attempts: number; completedAt?: string }
export interface HordeProgress { passed: boolean; bestScore: number; attempts: number; passedAt?: string }
export interface ErrorStat { count: number; lastSeen: string; infected: boolean; cureStreak: number; cured: number }
export interface DayStat { seconds: number; exercises: number; correct: number; reviews: number; lessons: number }
export interface XpEvent { source: string; amount: number; at: string }
export interface ActivityResult { bestScore: number; attempts: number; completedAt?: string; noTranscript?: boolean }
export interface LevelExamResult { scores: Record<string, number>; passed: boolean; provisional: boolean; at: string }
export interface Cosmetics { avatar: string; frame: string }
export interface Toast { id: number; kind: 'xp' | 'trophy' | 'info'; text: string }

interface Data {
  settings: Settings;
  lessons: Record<string, LessonProgress>;
  hordes: Record<string, HordeProgress>;
  cards: Record<string, SrsCard>;
  errors: Partial<Record<ErrorTag, ErrorStat>>;
  days: Record<string, DayStat>;
  xp: XpEvent[];
  builtSentences: number;
  achievements: Record<string, string>;
  claimed: Record<string, string>;
  lastLessonId: string | null;
  activities: Record<string, ActivityResult>;
  levelExams: Record<string, LevelExamResult>;
  cosmetics: Cosmetics;
}

interface Actions {
  setSettings: (p: Partial<Settings>) => void;
  recordExercise: (ex: Exercise, correct: boolean) => void;
  startLesson: (id: string) => void;
  finishLesson: (id: string, scorePct: number) => boolean;
  finishHorde: (unitId: string, scorePct: number, passPct: number) => boolean;
  recordReview: (conceptId: string, correct: boolean, opts: { usedHelp: boolean; ms: number; mixed: boolean }) => void;
  addStudySeconds: (s: number) => void;
  claim: (key: string, xp: number, label: string) => void;
  dismissToast: (id: number) => void;
  resetAll: () => void;
  completeActivity: (key: string, scorePct: number, label: string, extra?: { noTranscript?: boolean }) => void;
  finishLevelExam: (level: string, scores: Record<string, number>, passed: boolean, provisional: boolean) => void;
  setCosmetics: (p: Partial<Cosmetics>) => void;
  replaceAll: (d: Partial<Data>) => void;
  toasts: Toast[];
}

export const PASS_PCT = 80;
const INFECTION_AT = 3;   // fallos con la misma etiqueta → infección
const CURE_AFTER = 3;     // aciertos seguidos con esa etiqueta → curada

const initial: Data = {
  settings: { name: '', theme: 'system', textScale: 1, motion: true, accent: 'en-GB', speechRate: 0.85 },
  lessons: {}, hordes: {}, cards: {}, errors: {}, days: {}, xp: [], builtSentences: 0,
  achievements: {}, claimed: {}, lastLessonId: null,
  activities: {}, levelExams: {}, cosmetics: { avatar: 'casco', frame: 'menta' },
};

const today = () => dayKey(new Date());
const emptyDay = (): DayStat => ({ seconds: 0, exercises: 0, correct: 0, reviews: 0, lessons: 0 });
let toastId = 1;

export const useGame = create<Data & Actions>()(
  persist(
    (set, get) => {
      /** Suma XP y comprueba logros tras cada cambio. */
      const commit = (patch: Partial<Data>, xp?: { amount: number; source: string }) => {
        const toasts: Toast[] = [];
        set((s) => {
          const next = { ...s, ...patch } as Data & Actions;
          if (xp && xp.amount > 0) {
            next.xp = [...s.xp, { amount: xp.amount, source: xp.source, at: new Date().toISOString() }].slice(-2000);
            toasts.push({ id: toastId++, kind: 'xp', text: `+${xp.amount} XP · ${xp.source}` });
          }
          const unlocked = { ...next.achievements };
          for (const a of ACHIEVEMENTS) {
            if (!unlocked[a.id] && a.test(next)) {
              unlocked[a.id] = new Date().toISOString();
              toasts.push({ id: toastId++, kind: 'trophy', text: `Trofeo: ${a.name}` });
            }
          }
          next.achievements = unlocked;
          next.toasts = [...s.toasts, ...toasts].slice(-4);
          return next;
        });
      };
      const bumpDay = (d: Partial<DayStat>) => {
        const k = today();
        const cur = get().days[k] ?? emptyDay();
        return { ...get().days, [k]: { ...cur, ...Object.fromEntries(Object.entries(d).map(([key, v]) => [key, (cur[key as keyof DayStat] ?? 0) + (v ?? 0)])) } };
      };
      const trackErrors = (tags: ErrorTag[], correct: boolean) => {
        const errors = { ...get().errors };
        for (const t of tags) {
          const e: ErrorStat = errors[t] ?? { count: 0, lastSeen: '', infected: false, cureStreak: 0, cured: 0 };
          if (correct) {
            if (e.infected) {
              const streak = e.cureStreak + 1;
              errors[t] = streak >= CURE_AFTER ? { ...e, infected: false, cureStreak: 0, count: 0, cured: e.cured + 1 } : { ...e, cureStreak: streak };
            }
          } else {
            const count = e.count + 1;
            errors[t] = { ...e, count, lastSeen: new Date().toISOString(), infected: e.infected || count >= INFECTION_AT, cureStreak: 0 };
          }
        }
        return errors;
      };

      return {
        ...initial,
        toasts: [],
        setSettings: (p) => set((s) => ({ settings: { ...s.settings, ...p } })),
        recordExercise: (ex, correct) => {
          const isSentence = correct && (ex.type === 'order' || ex.type === 'build');
          commit(
            {
              errors: trackErrors(ex.tags, correct),
              days: bumpDay({ exercises: 1, correct: correct ? 1 : 0 }),
              builtSentences: get().builtSentences + (isSentence ? 1 : 0),
            },
            correct ? { amount: 5, source: 'Ejercicio' } : undefined,
          );
        },
        startLesson: (id) => {
          const cur = get().lessons[id];
          set((s) => ({
            lastLessonId: id,
            lessons: { ...s.lessons, [id]: cur ?? { status: 'in-progress', bestScore: 0, attempts: 0 } },
          }));
        },
        finishLesson: (id, scorePct) => {
          const prev = get().lessons[id];
          const passed = scorePct >= PASS_PCT;
          const wasPassed = prev?.status === 'passed';
          const lessons = {
            ...get().lessons,
            [id]: {
              status: passed || wasPassed ? 'passed' : 'in-progress',
              bestScore: Math.max(prev?.bestScore ?? 0, scorePct),
              attempts: (prev?.attempts ?? 0) + 1,
              completedAt: passed && !wasPassed ? new Date().toISOString() : prev?.completedAt,
            } as LessonProgress,
          };
          let cards = get().cards;
          if (passed && !wasPassed && lessonById(id)) {
            // Límite diario de conceptos nuevos: los que no caben hoy entran en días siguientes.
            cards = { ...cards };
            const limit = get().settings.newPerDay ?? 10;
            const now = new Date();
            const t = dayKey(now);
            let slot = Object.values(cards).filter((c) => dayKey(new Date(c.learnedAt)) === t).length;
            for (const c of conceptsForLesson(id)) {
              if (cards[c.id]) continue;
              const offset = Math.floor(slot / limit);
              const when = new Date(now.getTime() + offset * 86400000);
              cards[c.id] = newCardFromLesson(c.id, when);
              slot++;
            }
          }
          commit(
            { lessons, cards, days: bumpDay({ lessons: passed && !wasPassed ? 1 : 0 }) },
            passed ? { amount: wasPassed ? 10 : 50, source: wasPassed ? 'Sala repetida' : 'Sala superada' } : undefined,
          );
          return passed;
        },
        finishHorde: (unitId, scorePct, passPct) => {
          const prev = get().hordes[unitId];
          const passed = scorePct >= passPct;
          commit(
            {
              hordes: {
                ...get().hordes,
                [unitId]: {
                  passed: passed || !!prev?.passed,
                  bestScore: Math.max(prev?.bestScore ?? 0, scorePct),
                  attempts: (prev?.attempts ?? 0) + 1,
                  passedAt: passed && !prev?.passed ? new Date().toISOString() : prev?.passedAt,
                },
              },
            },
            passed && !prev?.passed ? { amount: 80, source: 'Horda superada' } : undefined,
          );
          return passed;
        },
        recordReview: (conceptId, correct, opts) => {
          const card = get().cards[conceptId];
          if (!card) return;
          commit(
            { cards: { ...get().cards, [conceptId]: review(card, correct, opts) }, days: bumpDay({ reviews: 1 }) },
            correct ? { amount: 3, source: 'Muro reparado' } : undefined,
          );
        },
        addStudySeconds: (s) => set({ days: bumpDay({ seconds: s }) }),
        claim: (key, xp, label) => {
          if (get().claimed[key]) return;
          commit({ claimed: { ...get().claimed, [key]: new Date().toISOString() } }, { amount: xp, source: label });
        },
        dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
        resetAll: () => set({ ...initial, settings: get().settings, toasts: [] }),
        completeActivity: (key, scorePct, label, extra) => {
          const prev = get().activities[key];
          const first = !prev?.completedAt && scorePct >= 60;
          commit(
            {
              activities: {
                ...get().activities,
                [key]: {
                  bestScore: Math.max(prev?.bestScore ?? 0, scorePct),
                  attempts: (prev?.attempts ?? 0) + 1,
                  completedAt: scorePct >= 60 ? (prev?.completedAt ?? new Date().toISOString()) : prev?.completedAt,
                  noTranscript: !!prev?.noTranscript || (!!extra?.noTranscript && scorePct >= 60),
                },
              },
              days: bumpDay({ exercises: 1, correct: scorePct >= 60 ? 1 : 0 }),
            },
            first ? { amount: 15, source: label } : undefined,
          );
        },
        finishLevelExam: (level, scores, passed, provisional) => {
          const prev = get().levelExams[level];
          commit(
            { levelExams: { ...get().levelExams, [level]: { scores, passed: passed || !!prev?.passed, provisional, at: new Date().toISOString() } } },
            passed && !prev?.passed ? { amount: 200, source: 'Jefe final vencido' } : undefined,
          );
        },
        setCosmetics: (p) => set((st) => ({ cosmetics: { ...st.cosmetics, ...p } })),
        replaceAll: (d) => set({ ...initial, ...d }),
      };
    },
    {
      name: 'english-quest-v1',
      storage: createJSONStorage(() => safeStorage),
      merge: (persisted, current) => ({ ...current, ...(persisted as Partial<Data>), cosmetics: { ...initial.cosmetics, ...((persisted as Partial<Data>)?.cosmetics ?? {}) }, activities: (persisted as Partial<Data>)?.activities ?? {}, levelExams: (persisted as Partial<Data>)?.levelExams ?? {} }),
      partialize: (st): Data => ({
        settings: st.settings, lessons: st.lessons, hordes: st.hordes, cards: st.cards, errors: st.errors, days: st.days,
        xp: st.xp, builtSentences: st.builtSentences, achievements: st.achievements, claimed: st.claimed, lastLessonId: st.lastLessonId,
        activities: st.activities, levelExams: st.levelExams, cosmetics: st.cosmetics,
      }),
    },
  ),
);

export type GameState = Data;
