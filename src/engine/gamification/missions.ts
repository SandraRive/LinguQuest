import type { GameState } from '../../lib/store';
import { dayKey } from '../srs/srs';
import { isPassed, studyDays } from './progress';

export interface Objective { label: string; done: boolean; progress?: string }
export interface Mission { key: string; kind: 'historia' | 'diaria' | 'semanal'; title: string; brief: string; objectives: Objective[]; xp: number; badge?: string }

function weekStart(d = new Date()) {
  const x = new Date(d); const day = (x.getDay() + 6) % 7; x.setDate(x.getDate() - day); return dayKey(x);
}

export function missions(s: GameState): Mission[] {
  const t = dayKey(new Date());
  const day = s.days[t] ?? { seconds: 0, exercises: 0, correct: 0, reviews: 0, lessons: 0 };
  const ws = weekStart();
  const weekDays = studyDays(s).filter((k) => k >= ws).length;
  return [
    {
      key: 'story-first-contact', kind: 'historia', title: 'Primer contacto por radio', xp: 100, badge: 'First Steps',
      brief: 'Una voz pide identificación por radio. Aprende lo básico para responder.',
      objectives: [
        { label: 'Aprender los pronombres personales', done: isPassed(s, 'pre-a1-u1-l1') },
        { label: 'Comprender el verbo TO BE', done: isPassed(s, 'pre-a1-u1-l2') },
        { label: 'Construir cinco frases', done: s.builtSentences >= 5, progress: `${Math.min(5, s.builtSentences)}/5` },
        { label: 'Superar la Horda de la Primera Noche', done: !!s.hordes['pre-a1-u1']?.passed },
      ],
    },
    {
      key: 'story-north-signal', kind: 'historia', title: 'La señal del norte', xp: 120, badge: 'Operadora de radio',
      brief: 'Una estación del norte emite números y nombres deletreados. Aprende a entenderlos.',
      objectives: [
        { label: 'Aprender el alfabeto y los números', done: isPassed(s, 'pre-a1-u2-l7') },
        { label: 'Entender la transmisión «Deletreo urgente»', done: !!s.activities['radio:t2']?.completedAt },
        { label: 'Superar la Horda del apagón', done: !!s.hordes['pre-a1-u2']?.passed },
      ],
    },
    {
      key: 'story-reunion', kind: 'historia', title: 'Reencuentro', xp: 150, badge: 'Voz del campamento',
      brief: 'Ana busca a su hermano por radio. Prepárate para presentarte y ayudarla.',
      objectives: [
        { label: 'Aprender familia, saludos y presentaciones', done: isPassed(s, 'pre-a1-u4-l15') },
        { label: 'Entender la transmisión «Buscando a la familia»', done: !!s.activities['radio:t4']?.completedAt },
        { label: 'Presentarte por walkie-talkie', done: !!s.activities['walkie:s1']?.completedAt },
        { label: 'Vencer al jefe final de PRE-A1', done: !!s.levelExams['PRE_A1']?.passed },
      ],
    },
    {
      key: `daily-walls-${t}`, kind: 'diaria', title: 'Mantenimiento diario', xp: 20,
      brief: 'Repara 10 muros del refugio.',
      objectives: [{ label: 'Haz 10 repasos hoy', done: day.reviews >= 10, progress: `${Math.min(10, day.reviews)}/10` }],
    },
    {
      key: `daily-practice-${t}`, kind: 'diaria', title: 'Ronda de práctica', xp: 15,
      brief: 'Mantén las manos ocupadas.',
      objectives: [{ label: 'Acierta 15 ejercicios hoy', done: day.correct >= 15, progress: `${Math.min(15, day.correct)}/15` }],
    },
    {
      key: `weekly-days-${ws}`, kind: 'semanal', title: 'Patrulla semanal', xp: 60,
      brief: 'Estudia en 3 días distintos esta semana. No hace falta que sean seguidos.',
      objectives: [{ label: '3 días con estudio esta semana', done: weekDays >= 3, progress: `${Math.min(3, weekDays)}/3` }],
    },
  ];
}
