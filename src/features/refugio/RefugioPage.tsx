import type { ReactNode } from 'react';
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
import { Avatar } from '../../ui/Avatar';
import { Scenery } from '../../ui/Scenery';
import * as Ic from '../../ui/icons';

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
  const pending = missions(s).filter((m) => !s.claimed[m.key]);
  const story = pending.find((m) => m.kind === 'historia');
  const others = pending.filter((m) => m !== story).slice(0, 3);
  const trophies = ACHIEVEMENTS.filter((a) => s.achievements[a.id]).length;
  const preA1 = BIOMES[0]!;
  const preDone = preA1.topics.filter((t) => t.lessons.every((id) => s.lessons[id]?.status === 'passed')).length;
  const prePct = Math.round((preDone / preA1.topics.length) * 100);

  return (
    <div className="flex flex-col gap-5">
      {/* Cabecera con escena */}
      <Scenery seed={11} height={230} moon="right" zombies={5} className="rounded-2xl border border-line">
        <div className="flex flex-wrap items-start justify-between gap-4 p-5 sm:p-7">
          <div className="max-w-[34rem]">
            <p className="label text-primary!">Día {days.length} sobrevivido · {biome.biome}</p>
            <h1 className="font-display mt-1 text-4xl leading-none sm:text-5xl">
              {s.settings.name ? `¡Bienvenida, ${s.settings.name}!` : '¡Bienvenida, superviviente!'}
            </h1>
            <p className="mt-2 text-muted">Las radios de emergencia emiten en inglés. Cada sala que superas te acerca a entenderlas. Descansar nunca resta.</p>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-line bg-[#120e0e]/85 px-4 py-2.5 backdrop-blur">
            <StatPill icon={<Ic.IconFlame size={18} />} label="Días" value={String(days.length)} />
            <StatPill icon={<Ic.IconStar size={18} />} label="XP" value={xp.toLocaleString('es-ES')} tone="text-accent" />
            <StatPill label="Nivel" value={String(lvl.level)} />
            <a href="#taquilla" title="Taquilla" className="no-underline"><Avatar avatar={s.cosmetics.avatar} frame={s.cosmetics.frame} size={44} /></a>
          </div>
        </div>
      </Scenery>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Progreso */}
        <Plate className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl">Tu progreso</h2>
              <p className="mt-1 text-muted">Nivel actual: <b className="text-text">{biome.label} · {biome.biome}</b></p>
            </div>
            <span className="relative flex h-16 w-16 shrink-0 items-center justify-center text-primary">
              <Ic.IconShield size={64} />
              <span className="font-display absolute text-[0.7rem] font-bold text-text">{biome.label}</span>
            </span>
          </div>
          <Bar value={prePct} label="Progreso del nivel actual" />
          <p className="num text-sm text-muted">{prePct} % hacia A1 · {topicsDone(s)}/{TOTAL_TOPICS} temas hasta B2 ({progressToB2(s)} %)</p>
          <ol className="mt-1 grid grid-cols-5 gap-1 text-center">
            {BIOMES.map((b, i) => (
              <li key={b.code} className={`rounded-lg border px-1 py-1.5 ${i === 0 ? 'border-primary-fill bg-primary-tint text-text' : 'border-line text-muted'}`}>
                <span className="block num text-xs font-bold">{b.label}</span>
                <span className="block text-[0.68rem] leading-tight">{b.biome}</span>
              </li>
            ))}
          </ol>
        </Plate>

        {/* Misión activa */}
        <Plate className="flex flex-col gap-3">
          <h2 className="font-display text-2xl">Misión activa</h2>
          {story ? (
            <>
              <p className="font-bold text-lg">Misión: {story.title}</p>
              <p className="text-muted">{story.brief}</p>
              <ul className="flex flex-col gap-1 text-sm">
                {story.objectives.map((o) => (
                  <li key={o.label} className="flex items-center gap-2">
                    <span className={o.done ? 'text-success' : 'text-muted'}>{o.done ? <Ic.IconCheck size={16} /> : '○'}</span>
                    <span className={o.done ? 'text-muted line-through' : ''}>{o.label}</span>
                    {o.progress && <span className="num text-muted">{o.progress}</span>}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-2">
                <LinkButton href={rec.href}>Continuar misión <Ic.IconArrow size={18} /></LinkButton>
                <Chip tone="accent">+{story.xp} XP</Chip>
              </div>
            </>
          ) : <p className="text-muted">Has completado todas las misiones de historia disponibles.</p>}
        </Plate>
      </div>

      {/* Siguiente paso */}
      <section className="plate flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="min-w-0 max-w-[40rem]">
          <p className="label text-primary!">Siguiente paso recomendado</p>
          <h2 className="font-display mt-1 text-2xl">{rec.title}</h2>
          <p className="text-muted">{rec.why}</p>
        </div>
        <LinkButton href={rec.href}>{rec.cta} <Ic.IconArrow size={18} /></LinkButton>
      </section>

      {/* Habilidades */}
      <Plate>
        <h2 className="font-display text-2xl">Progreso por habilidades</h2>
        <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
          <Skill icon={<Ic.IconHammer size={18} />} name="Gramática" pct={comp.grammar} />
          <Skill icon={<Ic.IconBag size={18} />} name="Vocabulario" pct={comp.vocabulary} />
          <Skill icon={<Ic.IconHeadphones size={18} />} name="Listening" pct={comp.listening} />
          <Skill icon={<Ic.IconWalkie size={18} />} name="Speaking" pct={comp.speaking} />
          <Skill icon={<Ic.IconBook size={18} />} name="Reading" pct={comp.reading} />
          <Skill icon={<Ic.IconPen size={18} />} name="Writing" pct={comp.writing} />
        </ul>
        <p className="mt-4 text-xs text-muted">Gramática y vocabulario suben con lo que recuerdas de verdad en Mantenimiento; el resto, con las actividades superadas de cada módulo.</p>
      </Plate>

      <div className="grid gap-5 lg:grid-cols-3">
        <Stat icon={<Ic.IconWrench size={18} />} label="Muros agrietados" value={String(due)} sub={due ? 'repasos pendientes' : 'refugio en buen estado'} tone={due ? 'text-primary' : 'text-success'} href="#mantenimiento" />
        <Stat icon={<Ic.IconBook size={18} />} label="Última sala" value={last?.title ?? '—'} sub={next ? `Siguiente: ${next.title}` : 'Próximo nivel en construcción'} small href="#taller" />
        <Stat icon={<Ic.IconTrophy size={18} />} label="Trofeos" value={`${trophies}/${ACHIEVEMENTS.length}`} sub={`${fmtTime(secs)} de estudio`} tone="text-accent" href="#trofeos" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Plate>
          <h2 className="font-display text-2xl">Infecciones</h2>
          {infs.length === 0 ? (
            <p className="mt-2 text-muted">Ninguna. Una infección aparece cuando fallas 3 veces en lo mismo, y se cura con 3 aciertos seguidos.</p>
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
        </Plate>
        <Plate>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-2xl">Encargos</h2>
            <a href="#encargos" className="text-secondary font-bold text-sm">Ver tablón</a>
          </div>
          <ul className="mt-3 flex flex-col gap-2">
            {others.map((m) => {
              const done = m.objectives.filter((o) => o.done).length;
              return (
                <li key={m.key} className="flex items-center justify-between gap-3 rounded-xl bg-surface-2 p-3">
                  <span className="min-w-0"><Chip tone="secondary">{m.kind}</Chip> <b className="ml-1">{m.title}</b></span>
                  <span className="num text-sm text-muted shrink-0">{done}/{m.objectives.length}</span>
                </li>
              );
            })}
            {others.length === 0 && <li className="text-muted">Has recogido todos los encargos de hoy.</li>}
          </ul>
        </Plate>
      </div>

      <Plate>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-2xl">Calendario de actividad</h2>
          <span className="text-sm text-muted">Los días sin estudio no cuentan en contra</span>
        </div>
        <Calendar days={s.days} />
      </Plate>
    </div>
  );
}

function StatPill({ icon, label, value, tone = 'text-text' }: { icon?: ReactNode; label: string; value: string; tone?: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {icon && <span className="text-primary">{icon}</span>}
      <div className="leading-tight"><p className="text-[0.68rem] uppercase tracking-wider text-muted">{label}</p><p className={`num font-bold ${tone}`}>{value}</p></div>
    </div>
  );
}

function Skill({ icon, name, pct }: { icon: ReactNode; name: string; pct: number }) {
  return (
    <li>
      <p className="flex items-center gap-1.5 text-sm"><span className="text-primary">{icon}</span>{name}</p>
      <div className="mt-2"><Bar value={pct} label={name} /></div>
      <p className="num mt-1 text-right text-xs text-muted">{pct} %</p>
    </li>
  );
}

function Stat({ icon, label, value, sub, tone = 'text-text', small, href }: { icon: ReactNode; label: string; value: string; sub: string; tone?: string; small?: boolean; href: string }) {
  return (
    <a href={href} className="plate block p-4 no-underline text-text hover:border-primary-fill/60">
      <p className="label flex items-center gap-1.5"><span className="text-primary">{icon}</span>{label}</p>
      <p className={`font-display mt-1 ${small ? 'text-xl' : 'text-3xl'} ${tone}`}>{value}</p>
      <p className="text-sm text-muted">{sub}</p>
    </a>
  );
}

/** 12 semanas, un cuadro por día. Más intensidad = más ejercicios y repasos. */
function Calendar({ days }: { days: Record<string, { exercises: number; reviews: number }> }) {
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - 77 - ((today.getDay() + 6) % 7));
  const cells: { key: string; n: number; future: boolean }[] = [];
  for (let i = 0; i < 84; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i);
    const k = dayKey(d);
    const v = days[k];
    cells.push({ key: k, n: v ? v.exercises + v.reviews : 0, future: d > today });
  }
  const shade = (n: number) => (n === 0 ? 'bg-surface-2' : n < 10 ? 'bg-primary-fill/35' : n < 30 ? 'bg-primary-fill/65' : 'bg-primary-fill');
  return (
    <div className="mt-3 overflow-x-auto">
      <div className="grid w-max grid-flow-col grid-rows-7 gap-1" role="img" aria-label="Días con estudio en las últimas 12 semanas">
        {cells.map((c) => <span key={c.key} title={`${c.key}: ${c.n} actividades`} className={`h-3.5 w-3.5 rounded-[3px] ${c.future ? 'opacity-0' : shade(c.n)}`} />)}
      </div>
    </div>
  );
}
