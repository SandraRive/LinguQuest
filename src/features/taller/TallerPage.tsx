import { useGame } from '../../lib/store';
import { BIOMES, UNITS, lessonById } from '../../content/curriculum';
import { biomeGate, hordeUnlocked, isPassed, isUnlocked } from '../../engine/gamification/progress';
import { Chip, LinkButton, PageHeader, Plate } from '../../ui/kit';

export function TallerPage() {
  const s = useGame();
    return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow="Gramática y vocabulario · PRE-A1 · El Refugio" title="Taller de construcción">
        Cada estructura gramatical es un plano. Aprende el plano en la sala, practica con ayuda y supera la evaluación final (80 %) para abrir la siguiente.
      </PageHeader>

      {UNITS.map((u) => {
        const hordeOpen = hordeUnlocked(s, u.id);
        const h = s.hordes[u.id];
        return (
          <Plate key={u.id}>
            <p className="label">Unidad · {u.building}</p>
            <h2 className="font-display text-2xl">{u.title}</h2>
            <ol className="mt-4 flex flex-col gap-3">
              {u.lessons.map((id, i) => {
                const l = lessonById(id)!;
                const open = isUnlocked(s, id);
                const done = isPassed(s, id);
                const p = s.lessons[id];
                return (
                  <li key={id} className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 ${done ? 'border-success/50' : open ? 'border-primary/60 bg-primary-tint' : 'border-line opacity-70'}`}>
                    <div className="min-w-0">
                      <p className="text-xs text-muted num">SALA {i + 1} · {l.room}</p>
                      <p className="font-bold text-lg">{l.title}</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {done ? <Chip tone="success">Superada · {p?.bestScore} %</Chip> : open ? <Chip tone="accent">Abierta</Chip> : <Chip>Requiere: {lessonById(l.prerequisites[0] ?? '')?.title}</Chip>}
                      </div>
                    </div>
                    {open ? <LinkButton href={`#sala-${id}`} variant={done ? 'ghost' : 'primary'}>{done ? 'Repasar sala' : p ? 'Continuar' : 'Entrar'}</LinkButton>
                      : <span className="text-sm text-muted">Bloqueada</span>}
                  </li>
                );
              })}
              <li className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 border-dashed p-4 ${h?.passed ? 'border-success/60' : hordeOpen ? 'border-danger/70' : 'border-line opacity-70'}`}>
                <div>
                  <p className="text-xs text-muted num">MINI-HORDA · examen de unidad</p>
                  <p className="font-bold text-lg">{u.horde.title}</p>
                  <p className="text-sm text-muted">Mezcla todo lo de la unidad. Sin pistas. Necesitas {u.horde.passPct} %.</p>
                </div>
                {hordeOpen ? <LinkButton href={`#horda-${u.id}`} variant={h?.passed ? 'ghost' : 'danger'}>{h?.passed ? `Superada · ${h.bestScore} %` : 'Enfrentar'}</LinkButton>
                  : <span className="text-sm text-muted">Supera las {u.lessons.length} salas</span>}
              </li>
            </ol>
          </Plate>
        );
      })}

      <Plate className="border-danger-fill!">
        <p className="label pt-1">Jefe final de nivel</p>
        <h2 className="font-display text-2xl">La Horda de la Primera Noche</h2>
        <p className="mt-1 text-muted">Examen por competencias (grammar, vocabulary, listening, reading, writing). Se abre al superar las 4 hordas.</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {s.levelExams['PRE_A1']?.passed ? <Chip tone="success">Vencido</Chip> : biomeGate(s).allHordes ? <Chip tone="danger">Disponible</Chip> : <Chip>{UNITS.filter((u) => s.hordes[u.id]?.passed).length}/4 hordas</Chip>}
          {biomeGate(s).allHordes && <LinkButton href="#jefe-pre-a1" variant="danger">{s.levelExams['PRE_A1'] ? 'Volver a enfrentarlo' : 'Enfrentar al jefe'}</LinkButton>}
        </div>
      </Plate>

      <Plate>
        <h2 className="font-display text-xl">Comparaciones de estructuras</h2>
        <p className="text-sm text-muted mt-1">a vs an, his vs her, on vs in, Good evening vs Good night… y las de niveles superiores cuando lleguen.</p>
        <LinkButton href="#comparaciones" variant="ghost" className="mt-3">Ver comparaciones</LinkButton>
      </Plate>

      <Plate>
        <h2 className="font-display text-xl">Próximo bioma: {BIOMES[1]!.biome} (A1)</h2>
        <p className="text-sm text-muted mt-1">Sus salas se están construyendo. Temas:</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {BIOMES[1]!.topics.map((t) => <li key={t.name}><Chip>{t.name}</Chip></li>)}
        </ul>
      </Plate>
    </div>
  );
}
