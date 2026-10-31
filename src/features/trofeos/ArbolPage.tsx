import { useGame } from '../../lib/store';
import { ATTRIBUTES, ATTR_SKILL, SKILL_TREE } from '../../engine/gamification/skills';
import { Chip, PageHeader } from '../../ui/kit';

export function ArbolPage() {
  const s = useGame();
  const got = SKILL_TREE.filter((n) => n.test(s)).length;
  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow={`${got}/${SKILL_TREE.length} perks desbloqueados`} title="Árbol de habilidades">
        Cada atributo es una destreza del inglés. Los perks se desbloquean solos cuando demuestras dominio real, no por entrar en una sala.
      </PageHeader>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ATTRIBUTES.map((a) => {
          const nodes = SKILL_TREE.filter((n) => n.attr === a);
          return (
            <section key={a} className="plate p-4">
              <p className="label pt-1">{ATTR_SKILL[a]}</p>
              <h2 className="font-display text-xl">{a}</h2>
              <ol className="mt-3 flex flex-col">
                {nodes.map((n, i) => {
                  const ok = n.test(s);
                  return (
                    <li key={n.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span aria-hidden="true" className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${ok ? 'bg-accent-fill text-ink' : 'border-2 border-dashed border-line text-muted'}`}>{n.tier}</span>
                        {i < nodes.length - 1 && <span aria-hidden="true" className={`w-0.5 flex-1 min-h-4 ${ok ? 'bg-accent-fill' : 'bg-line'}`} />}
                      </div>
                      <div className="pb-4 min-w-0">
                        <p className={`font-bold ${ok ? '' : 'text-muted'}`}>{n.name}</p>
                        <p className="text-sm text-muted">{n.desc}</p>
                        <div className="mt-1">{ok ? <Chip tone="success">Desbloqueado</Chip> : n.progress ? <Chip>{n.progress(s)}</Chip> : null}</div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </div>
  );
}
