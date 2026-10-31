import { useMemo, useState, type FormEvent } from 'react';
import type { Exercise } from '../../content/schema';
import { checkAnswer, correctText, shuffled, type Answer } from './check';
import { Button } from '../../ui/kit';
import { useGame } from '../../lib/store';
import { speak, speechAvailable } from '../../lib/speech';

const TYPE_LABEL: Record<Exercise['type'], string> = {
  choice: 'Seleccionar', fill: 'Completar', order: 'Ordenar', build: 'Construir',
  translate: 'Traducir', spot: 'Detectar el error', fix: 'Corregir', match: 'Relacionar', listen: 'Escuchar',
};

interface Props { ex: Exercise; allowHint: boolean; onAnswered: (correct: boolean) => void; onNext: () => void }

export function ExerciseView({ ex, allowHint, onAnswered, onNext }: Props) {
  const [result, setResult] = useState<null | boolean>(null);
  const [showHint, setShowHint] = useState(false);

  const submit = (a: Answer) => {
    if (result !== null) return;
    const ok = checkAnswer(ex, a);
    setResult(ok);
    onAnswered(ok);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="label text-secondary!">{TYPE_LABEL[ex.type]}</span>
        <span className="text-muted">·</span>
        <h2 className="text-lg font-bold">{ex.instruction}</h2>
      </div>

      <Body ex={ex} locked={result !== null} onSubmit={submit} />

      {allowHint && ex.hint && result === null && (
        <div>
          {showHint ? <p className="rounded-xl border border-dashed border-line p-3 text-muted"><b className="text-text">Pista:</b> {ex.hint}</p>
            : <Button variant="quiet" onClick={() => setShowHint(true)}>Ver pista</Button>}
        </div>
      )}

      {result !== null && (
        <div role="status" className={`pop rounded-2xl p-4 ${result ? 'bg-success-tint' : 'bg-danger-tint'}`}>
          <p className={`font-bold ${result ? 'text-success' : 'text-danger'}`}>{result ? '✓ Correcto' : '✗ No es correcto'}</p>
          {!result && <p className="mt-1">Respuesta correcta: <b>{correctText(ex)}</b></p>}
          <p className="mt-1 text-muted">{ex.explain}</p>
          <div className="mt-3"><Button onClick={onNext} autoFocus>Continuar</Button></div>
        </div>
      )}
    </div>
  );
}

function Body({ ex, locked, onSubmit }: { ex: Exercise; locked: boolean; onSubmit: (a: Answer) => void }) {
  switch (ex.type) {
    case 'choice':
      return (
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold">{ex.prompt}</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {ex.options.map((o, i) => (
              <button key={o} disabled={locked} onClick={() => onSubmit({ type: 'choice', index: i })}
                className="rounded-xl border border-line bg-surface-2 px-4 py-3 text-left text-lg font-bold hover:border-primary disabled:opacity-60">{o}</button>
            ))}
          </div>
        </div>
      );
    case 'fill': return <FillBody ex={ex} locked={locked} onSubmit={onSubmit} />;
    case 'translate':
    case 'fix': return <TextBody ex={ex} locked={locked} onSubmit={onSubmit} />;
    case 'order':
    case 'build': return <TokenBody ex={ex} locked={locked} onSubmit={onSubmit} />;
    case 'spot':
      return (
        <div className="flex flex-wrap gap-2">
          {ex.tokens.map((t, i) => (
            <button key={i} disabled={locked} onClick={() => onSubmit({ type: 'spot', index: i })}
              className="rounded-xl border border-line bg-surface-2 px-4 py-3 text-lg font-bold hover:border-danger disabled:opacity-60">{t}</button>
          ))}
        </div>
      );
    case 'match': return <MatchBody ex={ex} locked={locked} onSubmit={onSubmit} />;
    case 'listen': return <ListenBody ex={ex} locked={locked} onSubmit={onSubmit} />;
  }
}

function FillBody({ ex, locked, onSubmit }: { ex: Extract<Exercise, { type: 'fill' }>; locked: boolean; onSubmit: (a: Answer) => void }) {
  const [v, setV] = useState('');
  const f = (e: FormEvent) => { e.preventDefault(); if (v.trim()) onSubmit({ type: 'text', value: v }); };
  return (
    <form onSubmit={f} className="flex flex-col gap-3">
      {ex.es && <p className="text-muted">«{ex.es}»</p>}
      <div className="flex flex-wrap items-center gap-2 text-2xl font-bold">
        <span>{ex.before}</span>
        <input id={`fill-${ex.id}`} aria-label="Hueco" value={v} onChange={(e) => setV(e.target.value)} disabled={locked} autoFocus autoComplete="off" autoCapitalize="off" spellCheck={false}
          className="w-32 rounded-xl border-b-4 border-primary bg-surface-2 px-2 py-1 text-center outline-none" />
        <span>{ex.after}</span>
      </div>
      {!locked && <div><Button type="submit" disabled={!v.trim()}>Comprobar</Button></div>}
    </form>
  );
}

function TextBody({ ex, locked, onSubmit }: { ex: Extract<Exercise, { type: 'translate' | 'fix' }>; locked: boolean; onSubmit: (a: Answer) => void }) {
  const [v, setV] = useState('');
  const f = (e: FormEvent) => { e.preventDefault(); if (v.trim()) onSubmit({ type: 'text', value: v }); };
  return (
    <form onSubmit={f} className="flex flex-col gap-3">
      <p className="text-2xl font-bold">{ex.type === 'translate' ? `«${ex.es}»` : <span className="text-danger line-through decoration-2">{ex.wrongSentence}</span>}</p>
      <label htmlFor={`text-${ex.id}`} className="label">{ex.type === 'translate' ? 'En inglés' : 'Frase corregida'}</label>
      <input id={`text-${ex.id}`} value={v} onChange={(e) => setV(e.target.value)} disabled={locked} autoFocus autoComplete="off" autoCapitalize="off" spellCheck={false}
        className="rounded-xl border border-line bg-surface-2 px-3 py-3 text-xl outline-none focus:border-primary" />
      <p className="text-xs text-muted">Puedes usar contracciones (I'm) o la forma completa (I am).</p>
      {!locked && <div><Button type="submit" disabled={!v.trim()}>Comprobar</Button></div>}
    </form>
  );
}

function TokenBody({ ex, locked, onSubmit }: { ex: Extract<Exercise, { type: 'order' | 'build' }>; locked: boolean; onSubmit: (a: Answer) => void }) {
  const bank = useMemo(() => shuffled(ex.tokens.map((t, i) => ({ t, i })), ex.id), [ex]);
  const [picked, setPicked] = useState<number[]>([]);
  const words = picked.map((i) => ex.tokens[i] as string);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted">«{ex.es}»</p>
      <div className="min-h-16 rounded-xl border-2 border-dashed border-line p-3 flex flex-wrap gap-2 items-center" aria-label="Tu frase">
        {picked.length === 0 && <span className="text-muted">Toca las palabras en orden</span>}
        {picked.map((i, k) => (
          <button key={`${i}-${k}`} disabled={locked} onClick={() => setPicked(picked.filter((_, j) => j !== k))}
            className="rounded-xl bg-primary-tint border border-primary px-3 py-2 text-lg font-bold">{ex.tokens[i]}</button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {bank.map(({ t, i }) => (
          <button key={i} disabled={locked || picked.includes(i)} onClick={() => setPicked([...picked, i])}
            className="rounded-xl border border-line bg-surface-2 px-3 py-2 text-lg font-bold disabled:opacity-30">{t}</button>
        ))}
      </div>
      {!locked && (
        <div className="flex gap-2">
          <Button disabled={picked.length === 0} onClick={() => onSubmit({ type: 'tokens', value: words })}>Comprobar</Button>
          <Button variant="ghost" disabled={picked.length === 0} onClick={() => setPicked([])}>Borrar</Button>
        </div>
      )}
    </div>
  );
}

function MatchBody({ ex, locked, onSubmit }: { ex: Extract<Exercise, { type: 'match' }>; locked: boolean; onSubmit: (a: Answer) => void }) {
  const right = useMemo(() => shuffled(ex.pairs.map((p) => p[1]), ex.id), [ex]);
  const [sel, setSel] = useState<string | null>(null);
  const [done, setDone] = useState<[string, string][]>([]);
  const [miss, setMiss] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);
  const pick = (r: string) => {
    if (!sel) return;
    const ok = ex.pairs.some(([a, b]) => a === sel && b === r);
    if (ok) {
      const next: [string, string][] = [...done, [sel, r]];
      setDone(next); setSel(null);
      if (next.length === ex.pairs.length) onSubmit({ type: 'match', pairs: miss === 0 ? next : [] });
    } else { setMiss(miss + 1); setFlash(r); window.setTimeout(() => setFlash(null), 500); }
  };
  const isDoneL = (l: string) => done.some((d) => d[0] === l);
  const isDoneR = (r: string) => done.some((d) => d[1] === r);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-muted text-sm">Toca una palabra de la izquierda y luego su pareja. {miss > 0 && <span className="text-danger">Fallos: {miss}</span>}</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          {ex.pairs.map(([l]) => (
            <button key={l} disabled={locked || isDoneL(l)} onClick={() => setSel(l)}
              className={`rounded-xl border px-3 py-3 text-lg font-bold ${isDoneL(l) ? 'border-success text-success opacity-70' : sel === l ? 'border-primary bg-primary-tint' : 'border-line bg-surface-2'}`}>{l}</button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {right.map((r) => (
            <button key={r} disabled={locked || isDoneR(r)} onClick={() => pick(r)}
              className={`rounded-xl border px-3 py-3 text-lg ${isDoneR(r) ? 'border-success text-success opacity-70' : flash === r ? 'border-danger bg-danger-tint' : 'border-line bg-surface-2'}`}>{r}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Escuchar: reproduce con la voz del navegador. Sin voz disponible, muestra el texto (pasa a ser lectura). */
function ListenBody({ ex, locked, onSubmit }: { ex: Extract<Exercise, { type: 'listen' }>; locked: boolean; onSubmit: (a: Answer) => void }) {
  const { accent, speechRate } = useGame((s) => s.settings);
  const [plays, setPlays] = useState(0);
  const canSpeak = speechAvailable();
  const play = (rate: number) => { speak(ex.say, ex.accent ?? accent, rate); setPlays((n) => n + 1); };
  return (
    <div className="flex flex-col gap-4">
      {canSpeak ? (
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => play(speechRate)} className="inline-flex items-center gap-3 rounded-full bg-secondary-fill px-6 py-4 text-lg font-bold text-ink hover:brightness-105">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" /></svg>
            {plays ? 'Escuchar otra vez' : 'Escuchar'}
          </button>
          <Button variant="ghost" onClick={() => play(Math.max(0.5, speechRate - 0.3))}>Más despacio</Button>
        </div>
      ) : (
        <p className="rounded-xl bg-surface-2 p-3 text-muted">Este navegador no puede reproducir audio. Lee la palabra: <b className="text-text">{ex.say}</b></p>
      )}
      <div className="grid gap-2 sm:grid-cols-3">
        {ex.options.map((o, i) => (
          <button key={o} disabled={locked || (canSpeak && plays === 0)} onClick={() => onSubmit({ type: 'choice', index: i })}
            className="rounded-xl border border-line bg-surface-2 px-4 py-3 text-left text-lg font-bold hover:border-primary disabled:opacity-50">{o}</button>
        ))}
      </div>
      {canSpeak && plays === 0 && <p className="text-sm text-muted">Pulsa «Escuchar» para activar las respuestas.</p>}
    </div>
  );
}
