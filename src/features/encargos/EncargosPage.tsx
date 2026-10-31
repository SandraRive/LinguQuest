import { useGame } from '../../lib/store';
import { missions } from '../../engine/gamification/missions';
import { Button, Chip, PageHeader, Plate } from '../../ui/kit';

export function EncargosPage() {
  const s = useGame();
  const list = missions(s);
  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow="Misiones" title="Tablón de encargos">Encargos de historia, diarios y semanales. Los que no hagas simplemente caducan: nunca restan nada.</PageHeader>
      {list.map((m) => {
        const done = m.objectives.every((o) => o.done);
        const claimed = !!s.claimed[m.key];
        return (
          <Plate key={m.key} className={m.kind === 'historia' ? 'border-accent/60!' : ''}>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Chip tone={m.kind === 'historia' ? 'accent' : 'secondary'}>{m.kind}</Chip>
              <span className="num text-sm text-accent font-bold">+{m.xp} XP{m.badge ? ` · insignia ${m.badge}` : ''}</span>
            </div>
            <h2 className="font-display text-2xl mt-2">{m.title}</h2>
            <p className="text-muted">{m.brief}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {m.objectives.map((o) => (
                <li key={o.label} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <span aria-hidden="true" className={`inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs ${o.done ? 'border-success bg-success-fill text-ink' : 'border-line'}`}>{o.done ? '✓' : ''}</span>
                    <span className={o.done ? 'text-muted line-through' : ''}>{o.label}</span>
                    <span className="sr-only">{o.done ? '(completado)' : '(pendiente)'}</span>
                  </span>
                  {o.progress && <span className="num text-sm text-muted">{o.progress}</span>}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              {claimed ? <Chip tone="success">Recompensa recogida</Chip>
                : <Button disabled={!done} onClick={() => s.claim(m.key, m.xp, m.title)}>{done ? 'Recoger recompensa' : 'Completa los objetivos'}</Button>}
            </div>
          </Plate>
        );
      })}
    </div>
  );
}
