import { useRef, useState, type FormEvent } from 'react';
import { useGame } from '../../lib/store';
import { conceptById, lessonById } from '../../content/curriculum';
import { matchesAny } from '../../engine/exercises/check';
import { MASTERY } from '../../engine/srs/srs';
import { sessionCards } from '../../engine/gamification/progress';
import { useStudyTimer } from '../../lib/useStudyTimer';
import { NoLoEntiendo } from '../doctora/NoLoEntiendo';
import { Bar, Button, Chip, LinkButton, PageHeader, Plate, Speak } from '../../ui/kit';

const masteryTone = (m: number) => (['muted', 'danger', 'secondary', 'accent', 'success'] as const)[m] ?? 'muted';
const fmtDue = (iso: string) => {
  const d = Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);
  return d <= 0 ? 'hoy' : d === 1 ? 'mañana' : `en ${d} días`;
};

export function MantenimientoPage() {
  const s = useGame();
  const [session, setSession] = useState<string[] | null>(null);
  const due = sessionCards(s);
  const all = Object.values(s.cards).sort((a, b) => a.due.localeCompare(b.due));

  if (session) return <Review ids={session} onExit={() => setSession(null)} />;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow="Repetición espaciada · FSRS" title="Mantenimiento del refugio">
        Cada concepto aprendido es un muro. Cuando empieza a olvidarse aparece una grieta: repararlo a tiempo es lo que fija la memoria. Escribes la respuesta de memoria (recuperación activa), no la eliges.
      </PageHeader>

      <Plate>
        {all.length === 0 ? (
          <>
            <h2 className="font-display text-2xl">Aún no hay muros</h2>
            <p className="mt-2 text-muted">Los conceptos entran aquí cuando superas una sala del Taller.</p>
            <LinkButton href="#taller" className="mt-4">Ir al taller</LinkButton>
          </>
        ) : due.length === 0 ? (
          <>
            <h2 className="font-display text-2xl text-success">Refugio en buen estado</h2>
            <p className="mt-2 text-muted">No hay grietas hoy. El próximo repaso es {fmtDue(all[0]!.due)}. Repasar antes de tiempo no ayuda a la memoria, así que descansa tranquila.</p>
          </>
        ) : (
          <>
            <h2 className="font-display text-2xl"><span className="num text-primary">{due.length}</span> {due.length === 1 ? 'muro agrietado' : 'muros agrietados'}</h2>
            <p className="mt-2 text-muted">Se mezclan conceptos de varias salas (interleaving). Como máximo 30 por sesión, aunque hayas estado días sin entrar.</p>
            <Button className="mt-4" onClick={() => setSession(due.map((c) => c.conceptId))}>Reparar muros</Button>
          </>
        )}
      </Plate>

      {all.length > 0 && (
        <Plate>
          <h2 className="font-display text-xl">Inventario de muros</h2>
          <p className="text-sm text-muted mt-1">Dominado exige 5 aciertos en días distintos, casi sin fallos, con un intervalo de 3 semanas o más. Un fallo baja un estado, nunca a cero.</p>
          <ul className="mt-4 flex flex-col divide-y divide-line">
            {all.map((c) => {
              const concept = conceptById(c.conceptId);
              return (
                <li key={c.conceptId} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <div className="min-w-0">
                    <p className="font-bold">{concept?.prompt}</p>
                    <p className="text-xs text-muted num">{c.correctCount} aciertos · {c.errorCount} fallos · {c.correctDays.length} días · próximo {fmtDue(c.due)}</p>
                  </div>
                  <Chip tone={masteryTone(c.mastery)}>{MASTERY[c.mastery]}</Chip>
                </li>
              );
            })}
          </ul>
        </Plate>
      )}
    </div>
  );
}

function Review({ ids, onExit }: { ids: string[]; onExit: () => void }) {
  const s = useGame();
  useStudyTimer();
  const [i, setI] = useState(0);
  const [v, setV] = useState('');
  const [res, setRes] = useState<null | { ok: boolean; helped: boolean }>(null);
  const [okCount, setOk] = useState(0);
  const started = useRef(Date.now());
  const mixed = new Set(ids.map((id) => conceptById(id)?.lessonId)).size > 1;
  const id = ids[i];
  const concept = id ? conceptById(id) : undefined;

  if (!id || !concept) {
    return (
      <Plate className="pop">
        <p className="label">Sesión terminada</p>
        <h2 className="font-display text-3xl mt-1"><span className="num">{okCount}/{ids.length}</span> muros reparados</h2>
        <p className="mt-2 text-muted">Los fallos no se pierden: esos conceptos volverán antes para que los refuerces.</p>
        <div className="mt-4 flex gap-2"><Button onClick={onExit}>Ver inventario</Button><LinkButton href="#refugio" variant="ghost">Ir al refugio</LinkButton></div>
      </Plate>
    );
  }
  const lesson = lessonById(concept.lessonId);
  const card = s.cards[id];

  const answer = (helped: boolean) => (e?: FormEvent) => {
    e?.preventDefault();
    if (res) return;
    const ok = !helped && matchesAny(v, concept.answers);
    s.recordReview(id, ok, { usedHelp: helped, ms: Date.now() - started.current, mixed });
    if (ok) setOk((n) => n + 1);
    setRes({ ok, helped });
  };
  const next = () => { setI(i + 1); setV(''); setRes(null); started.current = Date.now(); };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <Button variant="quiet" onClick={onExit}>← Salir</Button>
        <span className="num text-sm text-muted">{i + 1}/{ids.length}</span>
      </div>
      <Bar value={i} max={ids.length} tone="secondary" label="Progreso del repaso" />
      <Plate>
        <p className="label">{lesson?.title} · escribe en inglés</p>
        <p className="font-display text-3xl mt-2">{concept.prompt}</p>
        <form onSubmit={answer(false)} className="mt-4 flex flex-col gap-3">
          <label htmlFor="srs-answer" className="sr-only">Tu respuesta</label>
          <input id="srs-answer" value={v} onChange={(e) => setV(e.target.value)} disabled={!!res} autoFocus autoComplete="off" autoCapitalize="off" spellCheck={false}
            className="rounded-xl border border-line bg-surface-2 px-3 py-3 text-xl outline-none focus:border-primary" />
          {!res && (
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={!v.trim()}>Comprobar</Button>
              <Button type="button" variant="ghost" onClick={() => answer(true)()}>No me acuerdo</Button>
            </div>
          )}
        </form>
        {res && (
          <div role="status" className={`pop mt-4 rounded-2xl p-4 ${res.ok ? 'bg-success-tint' : 'bg-danger-tint'}`}>
            <p className={`font-bold ${res.ok ? 'text-success' : 'text-danger'}`}>{res.ok ? '✓ Muro reparado' : res.helped ? 'Sin problema, aquí la tienes' : '✗ No es correcto'}</p>
            <p className="mt-1 flex items-center gap-2 text-lg"><Speak text={concept.answers[0]!} small /><b>{concept.answers[0]}</b></p>
            {concept.note && <p className="text-sm text-muted mt-1">{concept.note}</p>}
            {card && <p className="mt-2 text-sm">Estado: <Chip tone={masteryTone(card.mastery)}>{MASTERY[card.mastery]}</Chip> · próximo repaso {fmtDue(card.due)}</p>}
            <Button className="mt-3" onClick={next} autoFocus>Siguiente</Button>
          </div>
        )}
      </Plate>
      {lesson && <NoLoEntiendo simpler={lesson.simpler} lessonTitle={lesson.title} />}
    </div>
  );
}
