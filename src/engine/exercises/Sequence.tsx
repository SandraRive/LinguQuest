import { useState } from 'react';
import type { Exercise } from '../../content/schema';
import { useGame } from '../../lib/store';
import { ExerciseView } from './ExerciseView';
import { Bar } from '../../ui/kit';

/**
 * Ejecuta una lista de ejercicios.
 * - practice: con pistas; lo que fallas vuelve al final de la cola una vez (feedback correctivo).
 * - exam: sin pistas ni repeticiones; la nota es el % de aciertos.
 * La nota siempre se calcula sobre el primer intento de cada ejercicio.
 */
export function Sequence({ exercises, mode, onFinish }: { exercises: Exercise[]; mode: 'practice' | 'exam'; onFinish: (scorePct: number) => void }) {
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
      <div className="flex items-center gap-3">
        <span className="num text-sm text-muted">{Math.min(pos + 1, queue.length)}/{queue.length}</span>
        <Bar value={pos} max={queue.length} tone="secondary" label="Progreso del bloque" />
      </div>
      {item.retry && <p className="text-sm text-accent font-bold">Segunda oportunidad: este lo fallaste antes.</p>}
      <ExerciseView key={`${item.ex.id}-${pos}`} ex={item.ex} allowHint={mode === 'practice'} onAnswered={answered} onNext={next} />
    </div>
  );
}
