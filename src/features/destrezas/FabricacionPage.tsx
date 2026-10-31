import { useState, type FormEvent } from 'react';
import { useGame } from '../../lib/store';
import { WRITING_TASKS, type WritingTask } from '../../content/skills';
import { checkWriting, type WritingIssue } from '../../engine/writing';
import { isPassed } from '../../engine/gamification/progress';
import { lessonById } from '../../content/curriculum';
import { Button, Chip, PageHeader, Plate } from '../../ui/kit';

export function FabricacionPage() {
  const s = useGame();
  const done = WRITING_TASKS.filter((t) => s.activities[`escritura:${t.id}`]?.completedAt).length;
  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow="Writing · PRE-A1: palabras y frases cortas" title="Banco de fabricación">
        Rellena tu ficha de superviviente frase a frase. El corrector te explica cada error: qué escribiste, cómo se corrige, por qué, la regla y otro ejemplo.
      </PageHeader>
      <p className="num text-sm text-muted">{done}/{WRITING_TASKS.length} piezas fabricadas</p>
      <div className="flex flex-col gap-4">
        {WRITING_TASKS.map((t) => <Task key={t.id} t={t} />)}
      </div>
    </div>
  );
}

function Task({ t }: { t: WritingTask }) {
  const s = useGame();
  const open = isPassed(s, t.requires);
  const res = s.activities[`escritura:${t.id}`];
  const [v, setV] = useState('');
  const [showEx, setShowEx] = useState(false);
  const [out, setOut] = useState<null | { ok: boolean; issues: WritingIssue[]; corrected: string }>(null);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!v.trim()) return;
    const r = checkWriting(t, v);
    setOut(r);
    s.completeActivity(`escritura:${t.id}`, r.ok ? 100 : 0, 'Pieza fabricada');
  };
  if (!open) return (
    <div className="rounded-2xl border border-dashed border-line p-4 opacity-70">
      <p className="font-bold">{t.title}</p><p className="text-sm text-muted">Requiere: {lessonById(t.requires)?.title}</p>
    </div>
  );
  return (
    <Plate>
      <div className="flex flex-wrap items-center gap-2 pt-1"><b className="text-lg">{t.title}</b>{res?.completedAt && <Chip tone="success">Fabricada</Chip>}</div>
      <p className="mt-1">{t.prompt}</p>
      <form onSubmit={submit} className="mt-3 flex flex-col gap-2">
        <label htmlFor={`w-${t.id}`} className="sr-only">{t.prompt}</label>
        <input id={`w-${t.id}`} value={v} onChange={(e) => { setV(e.target.value); setOut(null); }} autoComplete="off" spellCheck={false} maxLength={120}
          className="rounded-xl border border-line bg-surface-2 px-3 py-3 text-lg outline-none focus:border-primary" placeholder="Escribe en inglés…" />
        <div className="flex flex-wrap gap-2">
          <Button type="submit" disabled={!v.trim()}>Revisar</Button>
          <Button type="button" variant="quiet" onClick={() => setShowEx(!showEx)}>{showEx ? 'Ocultar ejemplo' : 'Ver un ejemplo'}</Button>
        </div>
        {showEx && <p className="text-sm text-muted">Ejemplo: <b className="text-text">{t.example}</b></p>}
      </form>
      {out && (out.ok ? (
        <p className="pop mt-3 rounded-2xl bg-success-tint p-4 font-bold text-success">✓ Perfecto: «{v.trim()}»</p>
      ) : (
        <div className="pop mt-3 flex flex-col gap-3">
          {out.issues.map((i, k) => (
            <div key={k} className="rounded-2xl bg-danger-tint p-4 text-sm">
              <dl className="grid gap-x-4 gap-y-1 sm:grid-cols-[8rem_1fr]">
                <dt className="label">Original</dt><dd className="line-through decoration-danger">{i.original}</dd>
                <dt className="label">Corrección</dt><dd className="font-bold text-success">{i.correction}</dd>
                <dt className="label">Motivo</dt><dd>{i.why}</dd>
                <dt className="label">Regla</dt><dd>{i.rule}</dd>
                <dt className="label">Otro ejemplo</dt><dd>{i.example}</dd>
              </dl>
            </div>
          ))}
          {out.issues.length === 0 && <p className="rounded-2xl bg-accent-tint p-4 text-sm">No he encontrado un error concreto, pero la frase no tiene la forma que pide la tarea. {t.help} Ejemplo: <b>{t.example}</b></p>}
          {out.issues.length > 0 && <p className="text-sm text-muted">Prueba a escribir la versión corregida.</p>}
        </div>
      ))}
    </Plate>
  );
}
