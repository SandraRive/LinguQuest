import { useGame } from '../../lib/store';
import { BIOMES, TOTAL_TOPICS, lessonById } from '../../content/curriculum';
import {
  competencyPct, currentBiome, ERROR_LABELS, infections, nextLesson, progressToB2, recommend,
  sessionCards, studyDays, survivorLevel, topicsDone, totalXp,
} from '../../engine/gamification/progress';
import { missions } from '../../engine/gamification/missions';
import { ACHIEVEMENTS } from '../../engine/gamification/achievements';
import { dayKey } from '../../engine/srs/srs';
import { Bar, Chip, LinkButton, Plate } from '../../ui/kit';

const fmtTime = (s: number) => (s < 60 ? `${s} s` : s < 3600 ? `${Math.round(s / 60)} min` : `${(s / 3600).toFixed(1)} h`);

export function RefugioPage() {
  const s = useGame();
  const rec = recommend(s);
  const biome = currentBiome();
  const xp = totalXp(s);
  const lvl = survivorLevel(xp);
  const due = sessionCards(s).length;
  const infs = infections(s);
  const comp = competencyPct(s);
  const days = studyDays(s);
  const secs = Object.values(s.days).reduce((n, d) => n + d.seconds, 0);
  const last = s.lastLessonId ? lessonById(s.lastLessonId) : undefined;
  const next = nextLesson(s);
  const active = missions(s).filter((m) => !s.claimed[m.key]).slice(0, 3);
  const trophies = ACHIEVEMENTS.filter((a) => s.achievements[a.id]).length;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="label">Día {days.length} sobrevivido · bioma: {biome.biome}</p>
        <h1 className="font-display text-3xl sm:text-5xl leading-none">
          {s.settings.name ? `Hola, ${s.settings.name}.` : 'Bienvenida al refugio.'}
        </h1>
        <p className="text-muted max-w-[60ch]">Las radios de emergencia emiten en inglés. Cada sala que superas te acerca a entenderlas. Descansar nunca resta: los muros se agrietan, pero no caen.</p>
      </header>

      {/* Recomendación */}
      <section className="plate p-6 bg-primary-tint! border-primary-fill!">
        <div className="hazard mb-4 max-w-40" />
        <p className="label text-primary!">Siguiente paso recomendado</p>
        <h2 className="font-display text-2xl sm:text-3xl mt-1">{rec.title}</h2>
        <p className="text-muted mt-2 max-w-[60ch]">{rec.why}</p>
        <LinkButton href={rec.href} className="mt-4">{rec.cta}</LinkButton>
      </section>

      {/* Estado del superviviente */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Nivel MCER" value={biome.label} sub={biome.biome} />
        <Stat label="Superviviente" value={`Nv ${lvl.level}`} sub={`${xp} XP en total`} tone="accent" />
        <Stat label="Muros agrietados" value={String(due)} sub={due ? 'repasos pendientes' : 'refugio en buen estado'} tone={due ? 'primary' : 'success'} />
      </div>

      <Plate>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl">Camino a la Zona Segura (B2)</h2>
          <span className="num text-sm text-muted">{topicsDone(s)}/{TOTAL_TOPICS} temas · {progressToB2(s)} %</span>
        </div>
        <div className="mt-3"><Bar value={topicsDone(s)} max={TOTAL_TOPICS} label="Progreso hacia B2" /></div>
        <ol className="mt-4 grid grid-cols-5 gap-1 text-center">
          {BIOMES.map((b, i) => (
            <li key={b.code} className={`rounded-xl border px-1 py-2 ${i === 0 ? 'border-transparent bg-primary-fill text-ink' : 'border-line text-muted'}`}>
              <span className="block num text-xs font-bold">{b.label}</span>
              <span className="block text-[0.7rem] leading-tight">{b.biome}</span>
            </li>
          ))}
        </ol>
      </Plate>

      <div className="grid gap-4 sm:grid-cols-2">
        <Plate>
          <h2 className="font-display text-xl">Atributos</h2>
          <ul className="mt-3 flex flex-col gap-3">
            <Attr name="Ingeniería" comp="Grammar" pct={comp.grammar} />
            <Attr name="Recolección" comp="Vocabulary + expresiones" pct={comp.vocabulary} />
            <Attr name="Percepción" comp="Listening" pct={comp.listening} />
            <Attr name="Exploración" comp="Reading" pct={comp.reading} />
            <Attr name="Fabricación" comp="Writing" pct={comp.writing} />
            <Attr name="Comunicación" comp="Speaking" pct={comp.speaking} />
          </ul>
          <p className="mt-3 text-xs text-muted">Grammar y Vocabulary suben con el dominio real en Mantenimiento; las demás, con las actividades superadas de cada módulo.</p>
        </Plate>
        <Plate>
          <h2 className="font-display text-xl">Infecciones</h2>
          {infs.length === 0 ? (
            <p className="mt-3 text-muted">Ninguna. Una infección aparece cuando fallas 3 veces en lo mismo, y se cura con 3 aciertos seguidos.</p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2">
              {infs.map(([tag, e]) => (
                <li key={tag} className="flex items-center justify-between gap-2 rounded-xl bg-infection-tint p-3">
                  <span><b className="text-infection">{ERROR_LABELS[tag].label}</b><span className="block text-xs text-muted">cura: {e.cureStreak}/3 aciertos seguidos</span></span>
                  <LinkButton variant="ghost" href={`#sala-${ERROR_LABELS[tag].lesson}`}>Antídoto</LinkButton>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div><p className="label">Última sala</p><p className="font-bold">{last?.title ?? '—'}</p></div>
            <div><p className="label">Siguiente sala</p><p className="font-bold">{next?.title ?? 'Próxima fase'}</p></div>
          </div>
        </Plate>
      </div>

      <Plate>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl">Encargos activos</h2>
          <a href="#encargos" className="text-secondary font-bold">Ver tablón</a>
        </div>
        <ul className="mt-3 flex flex-col gap-2">
          {active.map((m) => {
            const done = m.objectives.filter((o) => o.done).length;
            return (
              <li key={m.key} className="flex items-center justify-between gap-3 rounded-xl bg-surface-2 p-3">
                <span className="min-w-0"><Chip tone={m.kind === 'historia' ? 'accent' : 'secondary'}>{m.kind}</Chip> <b className="ml-1">{m.title}</b></span>
                <span className="num text-sm text-muted shrink-0">{done}/{m.objectives.length}</span>
              </li>
            );
          })}
          {active.length === 0 && <li className="text-muted">Has reclamado todos los encargos de hoy.</li>}
        </ul>
      </Plate>

      <Plate>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl">Calendario de actividad</h2>
          <span className="text-sm text-muted">{fmtTime(secs)} de estudio · {trophies} trofeos</span>
        </div>
        <Calendar days={s.days} />
      </Plate>
    </div>
  );
}

function Stat({ label, value, sub, tone = 'text' }: { label: string; value: string; sub: string; tone?: 'text' | 'accent' | 'primary' | 'success' }) {
  const c = { text: 'text-text', accent: 'text-accent', primary: 'text-primary', success: 'text-success' }[tone];
  return (
    <div className="rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow)]">
      <p className="label">{label}</p>
      <p className={`font-display text-3xl mt-1 ${c}`}>{value}</p>
      <p className="text-sm text-muted">{sub}</p>
    </div>
  );
}

function Attr({ name, comp, pct }: { name: string; comp: string; pct: number | null }) {
  return (
    <li>
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span><b>{name}</b> <span className="text-muted">· {comp}</span></span>
        <span className="num text-muted">{pct === null ? 'fase 3–4' : `${pct} %`}</span>
      </div>
      <div className="mt-1"><Bar value={pct ?? 0} label={`${name}: ${comp}`} tone={pct === null ? 'secondary' : 'primary'} /></div>
    </li>
  );
}

/** 12 semanas, un cuadro por día. Más intensidad = más ejercicios y repasos. */
function Calendar({ days }: { days: Record<string, { exercises: number; reviews: number }> }) {
  const today = new Date();
  const start = new Date(today);
  // Empieza en lunes para que cada fila sea un día de la semana.
  start.setDate(start.getDate() - 77 - ((today.getDay() + 6) % 7));
  const cells: { key: string; n: number; future: boolean }[] = [];
  for (let i = 0; i < 84; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i);
    const k = dayKey(d);
    const v = days[k];
    cells.push({ key: k, n: v ? v.exercises + v.reviews : 0, future: d > today });
  }
  const shade = (n: number) => (n === 0 ? 'bg-surface-2' : n < 10 ? 'bg-secondary-tint' : n < 30 ? 'bg-secondary-fill' : 'bg-secondary');
  return (
    <div className="mt-3 overflow-x-auto">
      <div className="grid grid-flow-col grid-rows-7 gap-1 w-max" role="img" aria-label="Días con estudio en las últimas 12 semanas">
        {cells.map((c) => <span key={c.key} title={`${c.key}: ${c.n} actividades`} className={`h-3.5 w-3.5 rounded-[4px] ${c.future ? 'opacity-0' : shade(c.n)}`} />)}
      </div>
      <p className="mt-2 text-xs text-muted">Los días sin estudio no cuentan en contra.</p>
    </div>
  );
}
