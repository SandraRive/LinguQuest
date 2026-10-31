import { useState } from 'react';
import type { Exercise } from '../../content/schema';
import { useGame } from '../../lib/store';
import { ExerciseView } from './ExerciseView';
import { Bar } from '../../ui/kit';
import { IconStar, IconTarget } from '../../ui/icons';

/**
 * Ejecuta una lista de ejercicios.
 * - practice: con pistas; lo que fallas vuelve al final de la cola una vez (feedback correctivo).
 * - exam: sin pistas ni repeticiones; la nota es el % de aciertos.
 * La nota siempre se calcula sobre el primer intento de cada ejercicio.
 */
export function Sequence({ exercises, mode, onFinish, title, note, xp }: { exercises: Exercise[]; mode: 'practice' | 'exam'; onFinish: (scorePct: number) => void; title?: string; note?: string; xp?: number }) {
  const record = useGame((s) => s.recordExercise);
  const [queue, setQueue] = useState<{ ex: Exercise; retry: boolean }[]>(() => exercises.map((ex) => ({ ex, retry: false })));
  const [pos, setPos] = useState(0);
  const [firstCorrect, setFirstCorrect] = useState(0);
  const [lastOk, setLastOk] = useState<boolean | null>(null);
  const item = queue[pos];
  if (!item) return null;

  const answered = (ok: boolean) => {
    record(item.ex, ok);
    setLastOk(ok);
    if (!item.retry && ok) setFirstCorrect((n) => n + 1);
  };
  const next = () => {
    let q = queue;
    if (mode === 'practice' && lastOk === false && !item.retry) {
      q = [...queue, { ex: item.ex, retry: true }];
      setQueue(q);
    }
    if (pos + 1 >= q.length) {
      onFinish(Math.round(((firstCorrect) / exercises.length) * 100));
      return;
    }
    setLastOk(null);
    setPos(pos + 1);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex min-w-0 items-center gap-3">
          <span className="text-primary"><IconTarget size={30} /></span>
          <div className="min-w-0">
            {title && <p className="font-display text-2xl leading-tight">{title}</p>}
            <p className="text-sm text-muted">Ejercicio {Math.min(pos + 1, queue.length)} de {queue.length}{note ? ` · ${note}` : ''}</p>
          </div>
        </div>
        <div className="min-w-32 flex-1"><Bar value={pos} max={queue.length} label="Progreso del bloque" /></div>
        {xp && <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent-tint px-3 py-1 text-sm font-bold text-accent"><IconStar size={16} /> +{xp} XP</span>}
      </div>
      {item.retry && <p className="text-sm text-accent font-bold">Segunda oportunidad: este lo fallaste antes.</p>}
      <ExerciseView key={`${item.ex.id}-${pos}`} ex={item.ex} allowHint={mode === 'practice'} onAnswered={answered} onNext={next} />
    </div>
  );
}
