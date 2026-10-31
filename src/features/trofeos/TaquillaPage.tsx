import { useGame } from '../../lib/store';
import { AVATARS, FRAMES } from '../../engine/gamification/skills';
import { Avatar } from '../../ui/Avatar';
import { PageHeader, Plate } from '../../ui/kit';

export function TaquillaPage() {
  const s = useGame();
  const { avatar, frame } = s.cosmetics;
  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow="Recompensas cosméticas" title="Taquilla">Equipo para tu superviviente. Solo cambia el aspecto: nunca da ventajas ni se pierde.</PageHeader>
      <Plate className="flex items-center gap-4">
        <Avatar avatar={avatar} frame={frame} size={96} />
        <div><p className="label">Equipado</p><p className="font-display text-2xl">{AVATARS.find((a) => a.id === avatar)?.name}</p><p className="text-muted">Marco {FRAMES.find((f) => f.id === frame)?.name.toLowerCase()}</p></div>
      </Plate>
      <section>
        <h2 className="font-display text-xl mb-3">Equipo</h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {AVATARS.map((a) => {
            const ok = a.test(s);
            return (
              <li key={a.id}>
                <button disabled={!ok} onClick={() => s.setCosmetics({ avatar: a.id })} aria-pressed={avatar === a.id}
                  className={`flex w-full flex-col items-center gap-2 rounded-2xl border p-4 ${avatar === a.id ? 'border-primary bg-primary-tint' : 'border-line bg-surface'} disabled:opacity-50`}>
                  <span className={ok ? '' : 'grayscale'}><Avatar avatar={a.id} frame={frame} size={64} /></span>
                  <span className="font-bold text-sm text-center">{a.name}</span>
                  <span className="text-xs text-muted text-center">{ok ? (avatar === a.id ? 'Equipado' : 'Equipar') : a.unlock}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <section>
        <h2 className="font-display text-xl mb-3">Marcos</h2>
        <ul className="flex flex-wrap gap-3">
          {FRAMES.map((f) => {
            const ok = f.test(s);
            return (
              <li key={f.id}>
                <button disabled={!ok} onClick={() => s.setCosmetics({ frame: f.id })} aria-pressed={frame === f.id}
                  className={`flex items-center gap-2 rounded-full border px-3 py-2 ${frame === f.id ? 'border-primary bg-primary-tint' : 'border-line bg-surface'} disabled:opacity-50`}>
                  <Avatar avatar={avatar} frame={f.id} size={32} />
                  <span className="text-sm"><b>{f.name}</b>{!ok && <span className="text-muted"> · {f.unlock}</span>}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
