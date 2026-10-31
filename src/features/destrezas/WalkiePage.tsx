import { useState, type FormEvent } from 'react';
import { useGame } from '../../lib/store';
import { REPEAT_PHRASES, SPEAKING, type SpeakingSituation } from '../../content/skills';
import { listenOnce, recognitionAvailable, speak } from '../../lib/speech';
import { normalize } from '../../engine/exercises/check';
import { isPassed } from '../../engine/gamification/progress';
import { lessonById } from '../../content/curriculum';
import { useStudyTimer } from '../../lib/useStudyTimer';
import { Button, Chip, PageHeader, Plate } from '../../ui/kit';
import { ActivityCard } from './common';

const MIC_ERRORS: Record<string, string> = {
  'not-allowed': 'El micrófono está bloqueado aquí (por ejemplo, dentro del visor de artifacts o sin permiso). Escribe tu respuesta, o abre la app en tu navegador y da permiso al micrófono.',
  'service-not-allowed': 'El navegador no permite el reconocimiento de voz en esta página. Escribe tu respuesta.',
  'no-speech': 'No he oído nada. Acércate al micrófono y vuelve a intentarlo.',
  'audio-capture': 'No encuentro ningún micrófono.',
  unsupported: 'Este navegador no reconoce voz (prueba con Chrome o Edge). Puedes escribir tu respuesta.',
  network: 'El reconocimiento de voz necesita conexión a internet.',
};

/** Captura una respuesta por voz o, si no se puede, por teclado. */
function useAnswer(lang: 'en-GB' | 'en-US') {
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState('');
  const record = async (): Promise<string | null> => {
    setMicError(''); setListening(true);
    const r = await listenOnce(lang);
    setListening(false);
    if ('error' in r) { setMicError(MIC_ERRORS[r.error] ?? 'No se ha podido usar el micrófono. Escribe tu respuesta.'); return null; }
    return r.text;
  };
  return { listening, micError, record };
}

export function WalkiePage() {
  const s = useGame();
  const [open, setOpen] = useState<SpeakingSituation | null>(null);
  if (open) return <Situation sit={open} onExit={() => setOpen(null)} />;
  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow="Speaking" title="Walkie-talkie">
        Habla con otros supervivientes por radio. Te hablan despacio, puedes repetir la pregunta tantas veces como quieras y cada respuesta tiene una explicación en español.
      </PageHeader>
      <Plate>
        <p className="font-bold">Sobre la pronunciación</p>
        <p className="mt-1 text-muted">La app comprueba qué palabras ha entendido el reconocimiento de voz de tu navegador, pero <b className="text-text">no puntúa tu pronunciación</b>: para eso hace falta un servicio que analice el audio de verdad, y se añadirá más adelante.</p>
        {!recognitionAvailable() && <p className="mt-2 text-sm text-danger">Tu navegador no tiene reconocimiento de voz. Puedes practicar escribiendo las respuestas.</p>}
      </Plate>
      <ul className="flex flex-col gap-3">
        {SPEAKING.map((sit) => (
          <ActivityCard key={sit.id} actKey={`walkie:${sit.id}`} title={sit.title} subtitle={`${sit.level.replace('_', '-')} · conversación`} requires={sit.requires} onOpen={() => setOpen(sit)} />
        ))}
      </ul>
      <Repeat />
      <p className="text-sm text-muted">Restaurante, compras, indicaciones, entrevistas y debates llegarán con los niveles A1–B2. {isPassed(s, 'pre-a1-u4-l16') ? '' : 'Supera las salas de PRE-A1 para abrir más situaciones.'}</p>
    </div>
  );
}

function Situation({ sit, onExit }: { sit: SpeakingSituation; onExit: () => void }) {
  const s = useGame();
  useStudyTimer();
  const { accent } = s.settings;
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState('');
  const [res, setRes] = useState<null | { text: string; ok: boolean }>(null);
  const [okCount, setOk] = useState(0);
  const { listening, micError, record } = useAnswer(accent);
  const turn = sit.turns[i];
  const slow = Math.max(0.6, s.settings.speechRate - 0.15);

  const evaluate = (text: string) => {
    const ok = new RegExp(turn!.expect, 'i').test(normalize(text));
    setRes({ text, ok });
    if (ok) setOk((n) => n + 1);
  };
  const next = () => {
    if (i + 1 >= sit.turns.length) {
      s.completeActivity(`walkie:${sit.id}`, Math.round(((okCount) / sit.turns.length) * 100), 'Conversación por radio');
      setI(sit.turns.length);
      return;
    }
    setI(i + 1); setRes(null); setTyped('');
  };

  if (!turn) {
    const pct = Math.round((okCount / sit.turns.length) * 100);
    return (
      <Plate className="pop">
        <p className="label">Fin de la conversación</p>
        <p className={`font-display text-4xl num ${pct >= 60 ? 'text-success' : 'text-primary'}`}>{okCount}/{sit.turns.length}</p>
        <p className="mt-2 text-muted">Respuestas adecuadas. Repite la conversación hasta que te salga sin mirar los modelos.</p>
        <div className="mt-3 flex gap-2"><Button onClick={() => { setI(0); setOk(0); setRes(null); }}>Repetir</Button><Button variant="ghost" onClick={onExit}>Otras situaciones</Button></div>
      </Plate>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <Button variant="quiet" className="self-start" onClick={onExit}>← Situaciones</Button>
      <header><p className="label">Turno {i + 1} de {sit.turns.length}</p><h1 className="font-display text-3xl">{sit.title}</h1></header>
      <Plate className="flex flex-col gap-4">
        <div className="flex items-start gap-3 pt-1">
          <span className="rounded-full bg-secondary-fill px-3 py-1 text-sm font-bold text-ink">Radio</span>
          <div>
            <p className="text-xl font-bold">{turn.say}</p>
            <p className="text-muted">{turn.es}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" onClick={() => speak(turn.say, accent, slow)}>Escuchar (despacio)</Button>
          <Button variant="ghost" onClick={() => speak(turn.say, accent, s.settings.speechRate)}>Repetir pregunta</Button>
        </div>
        {!res && (
          <>
            {recognitionAvailable() && (
              <Button onClick={async () => { const t = await record(); if (t !== null) evaluate(t); }} disabled={listening}>
                {listening ? 'Escuchando… habla ahora' : 'Responder hablando'}
              </Button>
            )}
            {micError && <p className="text-sm text-danger">{micError}</p>}
            <form onSubmit={(e: FormEvent) => { e.preventDefault(); if (typed.trim()) evaluate(typed); }} className="flex flex-wrap gap-2">
              <label htmlFor="typed" className="sr-only">Respuesta escrita</label>
              <input id="typed" value={typed} onChange={(e) => setTyped(e.target.value)} placeholder="…o escríbela aquí" autoComplete="off"
                className="min-w-0 flex-1 rounded-xl border border-line bg-surface-2 px-3 py-2.5 outline-none focus:border-primary" />
              <Button type="submit" variant="ghost" disabled={!typed.trim()}>Enviar</Button>
            </form>
          </>
        )}
        {res && (
          <div className={`pop rounded-2xl p-4 ${res.ok ? 'bg-success-tint' : 'bg-danger-tint'}`}>
            <p className="text-sm text-muted">He entendido: «{res.text || '—'}»</p>
            <p className={`mt-1 font-bold ${res.ok ? 'text-success' : 'text-danger'}`}>{res.ok ? '✓ Respuesta adecuada' : '✗ No es lo que se esperaba'}</p>
            <p className="mt-1">{turn.tip} Modelo: <b>{turn.model}</b></p>
            <div className="mt-3 flex gap-2">
              <Button onClick={next}>Siguiente</Button>
              {!res.ok && <Button variant="ghost" onClick={() => { setRes(null); setTyped(''); }}>Intentarlo otra vez</Button>}
            </div>
          </div>
        )}
      </Plate>
    </div>
  );
}

function Repeat() {
  const s = useGame();
  const { accent, speechRate } = s.settings;
  const phrases = REPEAT_PHRASES.filter((p) => isPassed(s, p.requires));
  const [k, setK] = useState(0);
  const [heard, setHeard] = useState<string | null>(null);
  const { listening, micError, record } = useAnswer(accent);
  const p = phrases[k % Math.max(1, phrases.length)];
  if (!p) return (
    <Plate><h2 className="font-display text-xl">Repite después de mí</h2><p className="mt-2 text-muted">Se abre al superar «{lessonById('pre-a1-u2-l6')?.title}».</p></Plate>
  );
  const target = normalize(p.en).split(' ');
  const got = heard ? normalize(heard).split(' ') : [];
  const matched = target.map((w) => got.includes(w));
  return (
    <Plate>
      <h2 className="font-display text-xl">Repite después de mí</h2>
      <p className="mt-1 text-sm text-muted">Escucha la frase y repítela. Verás qué palabras ha reconocido el navegador.</p>
      <p className="mt-3 text-2xl font-bold">{p.en}</p>
      <p className="text-muted">{p.es}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button variant="ghost" onClick={() => speak(p.en, accent, speechRate)}>Escuchar</Button>
        {recognitionAvailable() && <Button onClick={async () => { const t = await record(); if (t !== null) setHeard(t); }} disabled={listening}>{listening ? 'Escuchando…' : 'Repetir hablando'}</Button>}
        <Button variant="quiet" onClick={() => { setK(k + 1); setHeard(null); }}>Otra frase</Button>
      </div>
      {micError && <p className="mt-2 text-sm text-danger">{micError}</p>}
      {heard !== null && (
        <div className="pop mt-3">
          <p className="text-sm text-muted">Reconocido: «{heard}»</p>
          <p className="mt-2 flex flex-wrap gap-1">{target.map((w, i) => <Chip key={i} tone={matched[i] ? 'success' : 'danger'}>{w}</Chip>)}</p>
          <p className="mt-2 text-sm">{matched.filter(Boolean).length}/{target.length} palabras reconocidas. Las que salen en rosa conviene repetirlas escuchando el audio.</p>
        </div>
      )}
    </Plate>
  );
}
