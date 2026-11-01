import { useState } from 'react';
import { useGame } from '../../lib/store';
import { BIOMES, LESSONS, PLAYABLE, UNITS, lessonById, levelIndex, type LevelCode } from '../../content/curriculum';
import { biomeGate, currentBiome, examSlug, hordeUnlocked, isPassed, isUnlocked, levelOpen } from '../../engine/gamification/progress';
import { Chip, LinkButton, Plate } from '../../ui/kit';
import { Scenery } from '../../ui/Scenery';
import { Biohazard, IconCheck, IconLock, IconSkull } from '../../ui/icons';

type NodeState = 'done' | 'current' | 'open' | 'locked';
interface PathNode { key: string; label: string; sub: string; href: string; state: NodeState; boss?: boolean }

const STEP = 150, PAD = 70, H = 240;
const yAt = (i: number) => 92 + Math.sin(i * 1.15) * 46;

/** Camino serpenteante con nodos: hecho (verde), actual (riesgo biológico rojo), bloqueado (candado). */
function TrailMap({ nodes, seed }: { nodes: PathNode[]; seed: number }) {
  const width = PAD * 2 + (nodes.length - 1) * STEP;
  const pts = nodes.map((_, i) => ({ x: PAD + i * STEP, y: yAt(i + seed) }));
  const seg = (a: { x: number; y: number }, b: { x: number; y: number }) => `M${a.x} ${a.y} C${a.x + STEP / 2} ${a.y}, ${b.x - STEP / 2} ${b.y}, ${b.x} ${b.y}`;
  return (
    <div className="overflow-x-auto pb-2">
      <div className="relative" style={{ width, height: H }}>
        <svg width={width} height={H} className="absolute inset-0" aria-hidden="true">
          {pts.slice(1).map((p, i) => {
            const done = nodes[i]!.state === 'done';
            return <path key={i} d={seg(pts[i]!, p)} fill="none" stroke={done ? 'var(--success-fill)' : 'var(--line)'} strokeWidth="3" strokeDasharray={done ? '0' : '2 9'} strokeLinecap="round" opacity={done ? 0.8 : 1} />;
          })}
        </svg>
        <ol className="absolute inset-0">
          {nodes.map((n, i) => {
            const p = pts[i]!;
            const size = n.boss ? 64 : 56;
            const circle = (
              <span className={`flex items-center justify-center rounded-full border-2 ${
                n.state === 'done' ? 'border-success-fill bg-success-tint text-success'
                : n.state === 'current' ? 'pulse border-primary-fill bg-primary-tint text-primary'
                : n.state === 'open' ? 'border-primary-fill/70 bg-surface-2 text-primary'
                : 'border-line bg-surface text-muted'}`} style={{ width: size, height: size }}>
                {n.state === 'done' ? <IconCheck size={26} /> : n.state === 'locked' ? <IconLock size={22} /> : n.boss ? <IconSkull size={30} /> : <Biohazard size={34} />}
              </span>
            );
            return (
              <li key={n.key} className="absolute flex w-[140px] -translate-x-1/2 flex-col items-center text-center" style={{ left: p.x, top: p.y - size / 2 }}>
                {n.state === 'locked'
                  ? <span title={n.sub}>{circle}</span>
                  : <a href={n.href} aria-label={`${n.label} (${n.state === 'done' ? 'superada' : 'abierta'})`} className="rounded-full">{circle}</a>}
                <span className={`mt-2 text-sm font-bold leading-tight ${n.state === 'locked' ? 'text-muted' : 'text-text'}`}>{n.label}</span>
                <span className="text-[0.72rem] leading-tight text-muted">{n.sub}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

const SUBTITLE: Record<string, string> = { PRE_A1: 'Cero absoluto', A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate', B2: 'Upper Intermediate' };

export function TallerPage() {
  const s = useGame();
  const [level, setLevel] = useState<LevelCode>(() => currentBiome(s).code);
  const biome = BIOMES[levelIndex(level)]!;
  const playable = PLAYABLE.includes(level);
  const open = levelOpen(s, level);
  const gate = biomeGate(s, level);
  const units = UNITS.filter((u) => u.level === level);
  const forest = level === 'A1';
  const nextB = BIOMES[levelIndex(level) + 1];
  let currentGiven = false;
  const mark = (isOpen: boolean, done: boolean): NodeState => {
    if (done) return 'done';
    if (!isOpen) return 'locked';
    if (!currentGiven) { currentGiven = true; return 'current'; }
    return 'open';
  };
  let n = LESSONS.filter((l) => levelIndex(l.level) < levelIndex(level)).length;

  return (
    <div className="flex flex-col gap-5">
      <Scenery seed={forest ? 31 : 23} height={190} moon="left" zombies={3} kind={forest ? 'forest' : 'city'} className="rounded-2xl border border-line">
        <div className="p-5 sm:p-7">
          <p className="label text-primary!">{biome.label} · {biome.biome}</p>
          <h1 className="font-display text-4xl leading-none sm:text-5xl">Ruta de aprendizaje</h1>
          <p className="mt-2 max-w-[36rem] text-muted">Tu camino de supervivencia del inglés: de cero a B2. Supera cada sala con un 80 % para abrir la siguiente, y vence al jefe final para abrir el siguiente nivel.</p>
        </div>
      </Scenery>

      {/* Niveles */}
      <div className="grid grid-cols-5 overflow-hidden rounded-xl border border-line" role="tablist" aria-label="Niveles">
        {BIOMES.map((b, i) => {
          const sel = b.code === level;
          const can = PLAYABLE.includes(b.code);
          const isOpenB = levelOpen(s, b.code);
          return (
            <button key={b.code} role="tab" aria-selected={sel} disabled={!can} onClick={() => setLevel(b.code)}
              className={`px-2 py-2.5 text-center ${sel ? 'bg-primary-tint text-text shadow-[inset_0_-3px_0_var(--primary-fill)]' : can ? 'bg-surface text-text hover:bg-surface-2' : 'bg-surface text-muted cursor-not-allowed'} ${i ? 'border-l border-line' : ''}`}>
              <p className="font-display whitespace-nowrap text-base leading-none sm:text-lg">{b.label}</p>
              <p className="mt-0.5 hidden text-xs sm:block">{SUBTITLE[b.code]}</p>
              {!can ? <p className="mt-0.5 flex items-center justify-center gap-1 text-[0.68rem]"><IconLock size={12} /> pronto</p>
                : !isOpenB ? <p className="mt-0.5 flex items-center justify-center gap-1 text-[0.68rem] text-muted"><IconLock size={12} /> jefe anterior</p>
                : s.levelExams[b.code]?.passed ? <p className="mt-0.5 flex items-center justify-center gap-1 text-[0.68rem] text-success"><IconCheck size={12} /> vencido</p> : null}
            </button>
          );
        })}
      </div>

      {playable && !open && (
        <Plate className="flex flex-wrap items-center justify-between gap-3">
          <div className="max-w-[40rem]">
            <p className="flex items-center gap-2 font-bold"><IconLock size={18} /> {biome.biome} está cerrado</p>
            <p className="mt-1 text-sm text-muted">Para entrar hay que vencer al jefe final de {BIOMES[levelIndex(level) - 1]!.label}: es el examen que demuestra que dominas el nivel anterior.</p>
          </div>
          <LinkButton href={`#jefe-${examSlug(BIOMES[levelIndex(level) - 1]!.code)}`}>Ir al jefe final</LinkButton>
        </Plate>
      )}

      {units.map((u, ui) => {
        const nodes: PathNode[] = u.lessons.map((id) => {
          const l = lessonById(id)!;
          n++;
          return { key: id, label: `${n}. ${l.title}`, sub: l.room, href: `#sala-${id}`, state: mark(isUnlocked(s, id), isPassed(s, id)) };
        });
        nodes.push({ key: u.horde.title, label: u.horde.title, sub: `Mini-horda · ${u.horde.passPct} %`, href: `#horda-${u.id}`, state: mark(open && hordeUnlocked(s, u.id), !!s.hordes[u.id]?.passed), boss: true });
        const done = u.lessons.filter((id) => isPassed(s, id)).length;
        return (
          <Plate key={u.id} className="p-4! sm:p-5!">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className="label">Unidad {ui + 1} · {u.building}</p>
                <h2 className="font-display text-2xl">{u.title}</h2>
              </div>
              <span className="num text-sm text-muted">{done}/{u.lessons.length} salas{s.hordes[u.id]?.passed ? ' · horda vencida' : ''}</span>
            </div>
            <TrailMap nodes={nodes} seed={ui * 2 + levelIndex(level)} />
          </Plate>
        );
      })}

      {/* Jefe final */}
      {playable && (
        <Scenery seed={forest ? 53 : 41} height={170} moon="right" tower={false} zombies={7} kind={forest ? 'forest' : 'city'} className="rounded-2xl border border-line">
          <div className="flex flex-wrap items-end justify-between gap-4 p-5 sm:p-7">
            <div className="max-w-[34rem]">
              <p className="label text-primary!">Jefe final de nivel · {biome.label}</p>
              <h2 className="font-display text-3xl">{biome.boss}</h2>
              <p className="text-muted">Examen por competencias: grammar, vocabulary, listening, reading y writing. Se abre al vencer las {units.length} hordas.{nextB ? ` Vencerlo abre ${nextB.biome} (${nextB.label}).` : ''}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {s.levelExams[level]?.passed ? <Chip tone="success">Vencido</Chip> : open && gate.allHordes ? <Chip tone="danger">Disponible</Chip> : <Chip>{units.filter((x) => s.hordes[x.id]?.passed).length}/{units.length} hordas</Chip>}
              {open && gate.allHordes && <LinkButton href={`#jefe-${examSlug(level)}`}>{s.levelExams[level] ? 'Volver a enfrentarlo' : 'Enfrentar al jefe'}</LinkButton>}
            </div>
          </div>
        </Scenery>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        <Plate>
          <h2 className="font-display text-2xl">Comparaciones</h2>
          <p className="mt-1 text-sm text-muted">a vs an, his vs her, Present Simple vs Continuous, Do vs Does… Se abren cuando conoces las dos piezas.</p>
          <LinkButton href="#comparaciones" variant="ghost" className="mt-3">Ver comparaciones</LinkButton>
        </Plate>
        {nextB && (
          <Plate>
            <h2 className="font-display text-2xl">Después: {nextB.biome} ({nextB.label})</h2>
            <p className="mt-1 text-sm text-muted">{PLAYABLE.includes(nextB.code) ? 'Se abre al vencer al jefe de este nivel. Temas:' : 'Sus salas se están construyendo. Temas:'}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {nextB.topics.map((t) => <li key={t.name}><Chip>{t.name}</Chip></li>)}
            </ul>
          </Plate>
        )}
      </div>
    </div>
  );
}
