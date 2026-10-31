import type { ReactNode } from 'react';
import { useGame } from '../../lib/store';
import { lessonById } from '../../content/curriculum';
import { isPassed } from '../../engine/gamification/progress';
import { Chip } from '../../ui/kit';

/** Tarjeta de una actividad de destreza en la lista (abierta, superada o bloqueada por una sala). */
export function ActivityCard({ actKey, title, subtitle, requires, onOpen, extra }: { actKey: string; title: string; subtitle: string; requires: string; onOpen: () => void; extra?: ReactNode }) {
  const s = useGame();
  const open = isPassed(s, requires);
  const res = s.activities[actKey];
  return (
    <li className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4 ${open ? 'border-line bg-surface shadow-[var(--shadow)]' : 'border-dashed border-line opacity-70'}`}>
      <div className="min-w-0">
        <p className="text-xs text-muted">{subtitle}</p>
        <p className="font-bold text-lg">{title}</p>
        <div className="mt-1 flex flex-wrap gap-2">
          {res?.completedAt ? <Chip tone="success">Completada · {res.bestScore} %</Chip> : open ? <Chip tone="accent">Disponible</Chip> : <Chip>Requiere: {lessonById(requires)?.title}</Chip>}
          {extra}
        </div>
      </div>
      {open ? (
        <button onClick={onOpen} className="inline-flex min-h-11 items-center rounded-full bg-primary-fill px-5 py-2.5 font-bold text-ink hover:brightness-105">{res ? 'Repetir' : 'Empezar'}</button>
      ) : <span className="text-sm text-muted">Bloqueada</span>}
    </li>
  );
}
