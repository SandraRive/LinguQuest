import { useGame } from '../../lib/store';
import { ACHIEVEMENTS } from '../../engine/gamification/achievements';
import { PageHeader } from '../../ui/kit';

export function TrofeosPage() {
  const s = useGame();
  const got = ACHIEVEMENTS.filter((a) => s.achievements[a.id]).length;
  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow={`${got}/${ACHIEVEMENTS.length} conseguidos`} title="Trofeos">Chapas de superviviente. Se consiguen haciendo cosas; ninguna se pierde.</PageHeader>
      <ul className="grid gap-3 sm:grid-cols-2">
        {ACHIEVEMENTS.map((a) => {
          const at = s.achievements[a.id];
          return (
            <li key={a.id} className={`flex items-center gap-4 rounded-xl border p-4 ${at ? 'border-accent-fill bg-surface shadow-[var(--shadow)]' : 'border-dashed border-line opacity-60'}`}>
              <span aria-hidden="true" className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl ${at ? 'bg-accent-fill text-ink' : 'bg-surface-2 text-muted'}`}>{a.icon}</span>
              <div className="min-w-0">
                <p className="font-bold">{a.name}</p>
                <p className="text-sm text-muted">{a.desc}</p>
                {at && <p className="text-xs text-accent num mt-1">{new Date(at).toLocaleDateString('es-ES')}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
