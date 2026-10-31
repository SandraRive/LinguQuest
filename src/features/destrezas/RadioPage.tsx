import { useEffect, useRef, useState } from 'react';
import { useGame } from '../../lib/store';
import { TRANSMISSIONS, type Transmission } from '../../content/skills';
import { speak, speakLines, speechAvailable } from '../../lib/speech';
import { Sequence } from '../../engine/exercises/Sequence';
import { useStudyTimer } from '../../lib/useStudyTimer';
import { WordText } from '../../ui/WordText';
import { Button, Chip, PageHeader, Plate } from '../../ui/kit';
import { ActivityCard } from './common';

export function RadioPage() {
  const [open, setOpen] = useState<Transmission | null>(null);
  if (open) return <Player t={open} onExit={() => setOpen(null)} />;
  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow="Listening" title="Radio de onda corta">
        Transmisiones de otros supervivientes, con voces británicas y americanas. Escucha primero sin texto; luego usa la transcripción, la traducción y la reproducción frase a frase.
      </PageHeader>
      {!speechAvailable() && <Plate><p className="text-danger font-bold">Este navegador no puede reproducir voz. Prueba con Chrome, Edge o Safari.</p></Plate>}
      <ul className="flex flex-col gap-3">
        {TRANSMISSIONS.map((t) => (
          <ActivityCard key={t.id} actKey={`radio:${t.id}`} title={t.title} subtitle={`${t.level.replace('_', '-')} · ${t.caller}`} requires={t.requires} onOpen={() => setOpen(t)}
            extra={<Chip tone="secondary">{t.accent === 'en-GB' ? 'Británico' : 'Americano'}</Chip>} />
        ))}
      </ul>
      <p className="text-sm text-muted">Las transmisiones de A1 en adelante (conversaciones más largas y naturales) llegarán con cada nivel.</p>
    </div>
  );
}

function Player({ t, onExit }: { t: Transmission; onExit: () => void }) {
  const s = useGame();
  useStudyTimer();
  const [rate, setRate] = useState(Math.min(s.settings.speechRate, 0.85));
  const [showText, setShowText] = useState(false);
  const [showEs, setShowEs] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);
  const [usedText, setUsedText] = useState(false);
  const [stage, setStage] = useState<'listen' | 'questions' | 'done'>('listen');
  const [score, setScore] = useState(0);
  const stop = useRef<() => void>(() => {});
  useEffect(() => () => stop.current(), []);

  const playAll = () => { stop.current = speakLines(t.lines.map((l) => l.en), t.accent, rate, setPlaying, () => setPlaying(null)); };
  const reveal = () => { setShowText(true); setUsedText(true); };

  return (
    <div className="flex flex-col gap-5">
      <Button variant="quiet" className="self-start" onClick={onExit}>← Todas las transmisiones</Button>
      <header>
        <p className="label">{t.caller} · {t.accent === 'en-GB' ? 'inglés británico' : 'inglés americano'}</p>
        <h1 className="font-display text-3xl">{t.title}</h1>
      </header>

      <Plate className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button onClick={playAll} className="inline-flex items-center gap-3 rounded-full bg-secondary-fill px-6 py-3 text-lg font-bold text-ink hover:brightness-105">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M7 5v14l12-7z" /></svg>
            {playing !== null ? 'Reproduciendo…' : 'Escuchar la transmisión'}
          </button>
          {playing !== null && <Button variant="ghost" onClick={() => stop.current()}>Parar</Button>}
        </div>
        <div className="flex flex-col gap-1 max-w-sm">
          <label htmlFor="rate" className="label">Velocidad: <span className="num">{rate.toFixed(2)}×</span></label>
          <input id="rate" type="range" min={0.5} max={1.1} step={0.05} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="accent-[var(--secondary)]" />
        </div>
        <div>
          <p className="label mb-2">Frase a frase</p>
          <ol className="flex flex-col gap-2">
            {t.lines.map((l, i) => (
              <li key={i} className={`flex items-start gap-3 rounded-xl p-2 ${playing === i ? 'bg-secondary-tint' : ''}`}>
                <button onClick={() => { stop.current(); speak(l.en, t.accent, rate); }} aria-label={`Escuchar frase ${i + 1}`}
                  className="num shrink-0 rounded-full border border-line bg-surface-2 px-3 py-1 text-sm font-bold hover:bg-secondary-tint">{i + 1} ▶</button>
                <div className="min-w-0">
                  {showText ? <WordText text={l.en} className="text-lg font-bold" /> : <span className="text-muted">· · · · ·</span>}
                  {showEs && <p className="text-muted">{l.es}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" onClick={() => (showText ? setShowText(false) : reveal())}>{showText ? 'Ocultar transcripción' : 'Mostrar transcripción'}</Button>
          <Button variant="ghost" onClick={() => setShowEs(!showEs)}>{showEs ? 'Ocultar traducción' : 'Mostrar traducción'}</Button>
        </div>
        {showText && <p className="text-sm text-muted">Toca las palabras subrayadas para ver su significado.</p>}
      </Plate>

      {stage === 'listen' && (
        <Plate>
          <h2 className="font-display text-xl">Preguntas de comprensión</h2>
          <p className="mt-1 text-muted">{usedText ? 'Has usado la transcripción: perfecto para aprender.' : 'Reto: respóndelas sin haber visto el texto.'}</p>
          <Button className="mt-3" onClick={() => setStage('questions')}>Responder</Button>
        </Plate>
      )}
      {stage === 'questions' && (
        <Plate>
          <Sequence exercises={t.questions} mode="exam" onFinish={(pct) => { setScore(pct); s.completeActivity(`radio:${t.id}`, pct, 'Transmisión entendida', { noTranscript: !usedText }); setStage('done'); }} />
        </Plate>
      )}
      {stage === 'done' && (
        <Plate className="pop">
          <p className="label">Resultado</p>
          <p className={`font-display text-4xl num ${score >= 60 ? 'text-success' : 'text-primary'}`}>{score} %</p>
          <p className="mt-2 text-muted">{score >= 60 ? (usedText ? 'Transmisión entendida. La próxima vez, intenta responder antes de mirar el texto.' : '¡Entendida sin transcripción!') : 'Vuelve a escucharla frase a frase y prueba otra vez.'}</p>
          <div className="mt-3 flex gap-2"><Button onClick={() => setStage('questions')}>Repetir preguntas</Button><Button variant="ghost" onClick={onExit}>Otras transmisiones</Button></div>
        </Plate>
      )}
    </div>
  );
}
