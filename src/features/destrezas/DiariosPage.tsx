import { useEffect, useRef, useState } from 'react';
import { useGame } from '../../lib/store';
import { READINGS, type ReadingText } from '../../content/skills';
import { speak, speakLines, speechAvailable } from '../../lib/speech';
import { Sequence } from '../../engine/exercises/Sequence';
import { useStudyTimer } from '../../lib/useStudyTimer';
import { WordText } from '../../ui/WordText';
import { Button, Chip, PageHeader, Plate } from '../../ui/kit';
import { ActivityCard } from './common';

export function DiariosPage() {
  const [open, setOpen] = useState<ReadingText | null>(null);
  if (open) return <Reader r={open} onExit={() => setOpen(null)} />;
  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow="Reading" title="Diarios encontrados">
        Diarios, notas y fichas que encuentras por el camino, adaptados a tu nivel. Toca cualquier palabra subrayada para ver qué significa.
      </PageHeader>
      <ul className="flex flex-col gap-3">
        {READINGS.map((r) => (
          <ActivityCard key={r.id} actKey={`lectura:${r.id}`} title={r.title} subtitle={`${r.level.replace('_', '-')} · ${r.kind}`} requires={r.requires} onOpen={() => setOpen(r)} />
        ))}
      </ul>
      <p className="text-sm text-muted">Los textos de A1 en adelante serán más largos y aumentarán de dificultad poco a poco.</p>
    </div>
  );
}

function Reader({ r, onExit }: { r: ReadingText; onExit: () => void }) {
  const s = useGame();
  useStudyTimer();
  const [es, setEs] = useState<Record<number, boolean>>({});
  const [structures, setStructures] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);
  const [stage, setStage] = useState<'read' | 'questions' | 'done'>('read');
  const [score, setScore] = useState(0);
  const stop = useRef<() => void>(() => {});
  useEffect(() => () => stop.current(), []);
  const { accent, speechRate } = s.settings;

  return (
    <div className="flex flex-col gap-5">
      <Button variant="quiet" className="self-start" onClick={onExit}>← Todos los diarios</Button>
      <header><p className="label">{r.kind}</p><h1 className="font-display text-3xl">{r.title}</h1></header>
      <Plate className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2 pt-1">
          {speechAvailable() && (playing === null
            ? <Button variant="ghost" onClick={() => { stop.current = speakLines(r.sentences.map((x) => x.en), accent, speechRate, setPlaying, () => setPlaying(null)); }}>Leer en voz alta</Button>
            : <Button variant="ghost" onClick={() => stop.current()}>Parar</Button>)}
          <Button variant="ghost" onClick={() => setStructures(!structures)}>{structures ? 'Ocultar estructuras' : 'Marcar estructuras gramaticales'}</Button>
          <Button variant="ghost" onClick={() => setEs(Object.keys(es).length === r.sentences.length ? {} : Object.fromEntries(r.sentences.map((_, i) => [i, true])))}>Traducir todo</Button>
        </div>
        <div className="rounded-2xl bg-accent-tint p-5 flex flex-col gap-3">
          {r.sentences.map((x, i) => (
            <div key={i} className={`rounded-xl p-2 ${playing === i ? 'bg-secondary-tint' : ''}`}>
              <div className="flex items-start gap-2">
                <button onClick={() => speak(x.en, accent, speechRate)} aria-label="Escuchar frase" className="mt-1 shrink-0 text-secondary hover:opacity-80">▶</button>
                <div className="min-w-0 flex-1">
                  <WordText text={x.en} className="text-xl leading-relaxed" />
                  {structures && x.structure && <span className="ml-2 align-middle"><Chip tone="infection">{x.structure}</Chip></span>}
                  {es[i] && <p className="text-muted">{x.es}</p>}
                </div>
                <button onClick={() => setEs({ ...es, [i]: !es[i] })} className="shrink-0 text-xs font-bold text-secondary hover:underline">{es[i] ? 'ocultar' : 'traducir'}</button>
              </div>
            </div>
          ))}
        </div>
      </Plate>
      {stage === 'read' && <Plate><h2 className="font-display text-xl">¿Lo has entendido?</h2><Button className="mt-3" onClick={() => setStage('questions')}>Responder preguntas</Button></Plate>}
      {stage === 'questions' && <Plate><Sequence exercises={r.questions} mode="exam" onFinish={(pct) => { setScore(pct); s.completeActivity(`lectura:${r.id}`, pct, 'Diario leído'); setStage('done'); }} /></Plate>}
      {stage === 'done' && (
        <Plate className="pop">
          <p className={`font-display text-4xl num ${score >= 60 ? 'text-success' : 'text-primary'}`}>{score} %</p>
          <p className="mt-2 text-muted">{score >= 60 ? 'Diario archivado en tu inventario.' : 'Vuelve a leer con las traducciones y prueba otra vez.'}</p>
          <div className="mt-3 flex gap-2"><Button onClick={() => setStage('questions')}>Repetir</Button><Button variant="ghost" onClick={onExit}>Otros diarios</Button></div>
        </Plate>
      )}
    </div>
  );
}
