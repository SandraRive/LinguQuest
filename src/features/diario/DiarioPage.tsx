import { useGame } from '../../lib/store';
import { LESSONS } from '../../content/curriculum';
import { dayKey } from '../../engine/srs/srs';
import { studyDays, totalXp } from '../../engine/gamification/progress';
import { PageHeader, Plate } from '../../ui/kit';

const fmt = (s: number) => (s < 3600 ? `${Math.round(s / 60)} min` : `${(s / 3600).toFixed(1)} h`);

export function DiarioPage() {
  const s = useGame();
  const d = Object.values(s.days);
  const ex = d.reduce((n, x) => n + x.exercises, 0);
  const ok = d.reduce((n, x) => n + x.correct, 0);
  const rev = d.reduce((n, x) => n + x.reviews, 0);
  const secs = d.reduce((n, x) => n + x.seconds, 0);
  const last14 = Array.from({ length: 14 }, (_, i) => {
    const dt = new Date(); dt.setDate(dt.getDate() - (13 - i));
    const k = dayKey(dt); const v = s.days[k];
    return { k, label: dt.toLocaleDateString('es-ES', { weekday: 'narrow' }), n: v ? v.exercises + v.reviews : 0 };
  });
  const max = Math.max(10, ...last14.map((x) => x.n));
  const bySource = Object.entries(s.xp.reduce<Record<string, number>>((acc, e) => { acc[e.source] = (acc[e.source] ?? 0) + e.amount; return acc; }, {})).sort((a, b) => b[1] - a[1]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow="Estadísticas" title="Diario del superviviente">Lo que has hecho, sin juicios. Los días sin estudio no restan.</PageHeader>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[['Días con estudio', String(studyDays(s).length)], ['Tiempo', fmt(secs)], ['Acierto', ex ? `${Math.round((ok / ex) * 100)} %` : '—'], ['Repasos', String(rev)]].map(([l, v]) => (
          <div key={l} className="rounded-xl border border-line bg-surface p-4"><p className="label">{l}</p><p className="font-display text-2xl mt-1 num">{v}</p></div>
        ))}
      </div>
      <Plate>
        <h2 className="font-display text-xl">Últimos 14 días</h2>
        <p className="text-sm text-muted">Ejercicios y repasos por día.</p>
        <div className="mt-4 flex h-40 items-end gap-1.5" role="img" aria-label="Actividad diaria de los últimos 14 días">
          {last14.map((x, i) => (
            <div key={x.k} className="flex flex-1 flex-col items-center gap-1 h-full justify-end">
              <span className="num text-[0.65rem] text-muted">{x.n || ''}</span>
              <div className={`w-full rounded-t-sm ${i === 13 ? 'bg-primary-fill' : 'bg-primary/50'}`} style={{ height: `${(x.n / max) * 100}%`, minHeight: x.n ? 4 : 1 }} />
              <span className="text-[0.7rem] text-muted uppercase">{x.label}</span>
            </div>
          ))}
        </div>
      </Plate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Plate>
          <h2 className="font-display text-xl">Salas</h2>
          <table className="mt-3 w-full text-sm">
            <thead><tr className="text-left"><th className="label pb-2">Sala</th><th className="label pb-2 text-right">Mejor</th><th className="label pb-2 text-right">Intentos</th></tr></thead>
            <tbody>
              {LESSONS.map((l) => { const p = s.lessons[l.id]; return (
                <tr key={l.id} className="border-t border-line"><td className="py-2">{l.title}</td><td className="py-2 text-right num">{p ? `${p.bestScore} %` : '—'}</td><td className="py-2 text-right num">{p?.attempts ?? 0}</td></tr>
              ); })}
            </tbody>
          </table>
        </Plate>
        <Plate>
          <h2 className="font-display text-xl">XP por origen</h2>
          <p className="num text-sm text-muted">Total: {totalXp(s)} XP</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {bySource.length === 0 && <li className="text-muted">Todavía nada.</li>}
            {bySource.map(([src, n]) => <li key={src} className="flex justify-between border-b border-line pb-1"><span>{src}</span><span className="num text-accent">{n}</span></li>)}
          </ul>
        </Plate>
      </div>
    </div>
  );
}
