import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useGame, PASS_PCT } from '../../lib/store';
import { lessonById, UNITS } from '../../content/curriculum';
import { vocabById } from '../../content/vocab';
import type { Lesson } from '../../content/schema';
import { isPassed, isUnlocked } from '../../engine/gamification/progress';
import { Sequence } from '../../engine/exercises/Sequence';
import { useStudyTimer } from '../../lib/useStudyTimer';
import { speakLines, speechAvailable } from '../../lib/speech';
import { NoLoEntiendo } from '../doctora/NoLoEntiendo';
import { Button, LinkButton, Plate, Speak } from '../../ui/kit';
import { Scenery, Sign } from '../../ui/Scenery';
import { IconBack, IconBook, IconChevron, IconHeadphones } from '../../ui/icons';

type Stage = 'teoria' | 'guiados' | 'independientes' | 'evaluacion' | 'resultado';
const STAGES: { id: Stage; label: string }[] = [
  { id: 'teoria', label: 'Plano' }, { id: 'guiados', label: 'Guiados' },
  { id: 'independientes', label: 'Solo' }, { id: 'evaluacion', label: 'Evaluación' },
];

export function LessonPage({ id }: { id: string }) {
  const lesson = lessonById(id);
  const s = useGame();
  const [stage, setStage] = useState<Stage>('teoria');
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const stop = useRef<() => void>(() => {});
  useStudyTimer();
  useEffect(() => { if (lesson && isUnlocked(s, lesson.id)) s.startLesson(lesson.id); }, [id]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { setStage('teoria'); window.scrollTo({ top: 0 }); }, [id]);
  useEffect(() => { window.scrollTo({ top: 0 }); }, [stage]);
  useEffect(() => () => stop.current(), []);

  if (!lesson) return <Missing />;
  if (!isUnlocked(s, lesson.id)) {
    const req = lesson.prerequisites.map((p) => lessonById(p)?.title).join(', ');
    return (
      <Plate>
        <p className="label">Sala bloqueada</p>
        <h1 className="font-display text-3xl mt-1">{lesson.title}</h1>
        <p className="mt-2 text-muted">Antes necesitas superar: <b className="text-text">{req}</b>. Así nunca se da por sabido algo que aún no has aprendido.</p>
        <LinkButton href="#taller" className="mt-4">Volver a la ruta</LinkButton>
      </Plate>
    );
  }

  const unit = UNITS.find((u) => u.id === lesson.unit);
  const roomNo = (unit?.lessons.indexOf(lesson.id) ?? 0) + 1;
  const finish = (pct: number) => { setScore(pct); s.finishLesson(lesson.id, pct); setStage('resultado'); };
  const idx = STAGES.findIndex((x) => x.id === stage);
  const allExamples = [...(lesson.affirmative ?? []), ...(lesson.negative ?? []), ...(lesson.interrogative ?? []), ...lesson.examples].map((e) => e.en);
  const listenAll = () => {
    if (playing) { stop.current(); return; }
    setPlaying(true);
    stop.current = speakLines(allExamples, s.settings.accent, s.settings.speechRate, () => {}, () => setPlaying(false));
  };
  const practice = (title: string, exercises: Lesson['guided'], mode: 'practice' | 'exam', onFinish: (pct: number) => void, note: string) => (
    <Plate>
      <Sequence title={`Misión: ${lesson.title}`} note={note} xp={mode === 'exam' ? 50 : undefined} exercises={exercises} mode={mode} onFinish={onFinish} />
      <span className="sr-only">{title}</span>
    </Plate>
  );

  return (
    <div className="flex flex-col gap-5">
      <nav aria-label="Ruta" className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        <a href="#taller" className="inline-flex items-center gap-1 font-bold text-text hover:text-primary"><IconBack size={16} /> {lesson.level.replace('_', '-')}</a>
        <IconChevron size={14} /><span>Unidad: {unit?.title}</span>
        <IconChevron size={14} /><span className="text-text">Sala {roomNo}</span>
      </nav>

      <div className="plate flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="text-primary"><IconBook size={26} /></span>
          <div className="min-w-0">
            <h1 className="font-display text-2xl leading-tight sm:text-3xl">{lesson.title}</h1>
            <p className="text-xs text-muted">Sala: {lesson.room}{isPassed(s, lesson.id) ? ` · superada con ${s.lessons[lesson.id]?.bestScore} %` : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {speechAvailable() && stage === 'teoria' && (
            <button onClick={listenAll} title={playing ? 'Parar' : 'Escuchar todos los ejemplos'} aria-label={playing ? 'Parar audio' : 'Escuchar todos los ejemplos'}
              className={`flex h-10 w-10 items-center justify-center rounded-full border ${playing ? 'border-secondary text-secondary' : 'border-line text-muted hover:text-text'}`}><IconHeadphones size={20} /></button>
          )}
          {stage !== 'evaluacion' && <NoLoEntiendo simpler={lesson.simpler} lessonTitle={lesson.title} inline />}
        </div>
      </div>

      {stage !== 'resultado' && (
        <ol className="grid grid-cols-4 gap-1" aria-label="Fases de la sala">
          {STAGES.map((st, i) => (
            <li key={st.id} aria-current={st.id === stage ? 'step' : undefined}
              className={`border-b-4 px-1 pb-1 text-center text-xs font-bold uppercase tracking-wider ${i < idx ? 'border-success-fill text-success' : i === idx ? 'border-primary-fill text-text' : 'border-line text-muted'}`}>{st.label}</li>
          ))}
        </ol>
      )}

      {stage === 'teoria' && <Theory lesson={lesson} onNext={() => setStage('guiados')} />}
      {stage === 'guiados' && practice('Guiados', lesson.guided, 'practice', () => setStage('independientes'), 'Ejercicios guiados · con pistas y segunda oportunidad')}
      {stage === 'independientes' && practice('Solo', lesson.independent, 'practice', () => setStage('evaluacion'), 'Ejercicios independientes · sin pistas')}
      {stage === 'evaluacion' && practice('Evaluación', lesson.final, 'exam', finish, `Evaluación final · necesitas ${PASS_PCT} %`)}
      {stage === 'resultado' && <Result lesson={lesson} score={score} onRetry={() => setStage('evaluacion')} onTheory={() => setStage('teoria')} />}
    </div>
  );
}

function ExampleList({ items }: { items: Lesson['examples'] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((e) => (
        <li key={e.en} className="flex items-start gap-3 rounded-xl bg-surface-2 p-3">
          <Speak text={e.en} small />
          <div className="min-w-0">
            <p className="text-lg font-bold">{e.en}</p>
            <p className="text-muted">{e.es}</p>
            {e.note && <p className="text-sm text-secondary mt-1">{e.note}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Theory({ lesson, onNext }: { lesson: Lesson; onNext: () => void }) {
  const vocab = lesson.vocab.map(vocabById).filter((v): v is NonNullable<typeof v> => !!v);
  const sections: { title: string; body: ReactNode }[] = [
    { title: 'Qué significa', body: <p>{lesson.meaning}</p> },
    { title: 'Cuándo se usa', body: <ul className="flex flex-col gap-1.5">{lesson.when.map((w) => <li key={w} className="flex gap-2"><span className="text-success">✓</span>{w}</li>)}</ul> },
    { title: 'Cómo se construye', body: <p className="rounded-xl border border-secondary/30 bg-secondary-tint p-4">{lesson.how}</p> },
  ];
  if (lesson.table) sections.push({ title: 'Tabla', body: (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full text-left">
        <thead className="bg-primary-tint"><tr>{lesson.table.head.map((h) => <th key={h} className="p-3 text-sm font-bold">{h}</th>)}</tr></thead>
        <tbody>
          {lesson.table.rows.map((r) => (
            <tr key={r[0]} className="border-t border-line">
              {r.map((c, i) => <td key={i} className={`p-3 align-top ${i === 0 ? 'font-bold text-lg whitespace-nowrap' : ''}`}>{i === 0 ? <span className="inline-flex items-center gap-2"><Speak text={c} small />{c}</span> : c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) });
  if (lesson.affirmative) sections.push({ title: 'Afirmativa', body: <ExampleList items={lesson.affirmative} /> });
  if (lesson.negative) sections.push({ title: 'Negativa', body: <ExampleList items={lesson.negative} /> });
  if (lesson.interrogative) sections.push({ title: 'Pregunta y respuesta', body: <ExampleList items={lesson.interrogative} /> });
  sections.push({ title: 'Ejemplos', body: <ExampleList items={lesson.examples} /> });
  sections.push({ title: 'Errores frecuentes', body: (
    <ul className="flex flex-col gap-2">
      {lesson.errors.map((e) => (
        <li key={e.wrong} className="rounded-xl border border-line bg-surface-2 p-3">
          <p><span className="text-danger line-through decoration-2 font-bold">{e.wrong}</span> <span className="text-muted">→</span> <span className="text-success font-bold">{e.right}</span></p>
          <p className="text-sm text-muted mt-1">{e.why}</p>
        </li>
      ))}
    </ul>
  ) });
  sections.push({ title: 'Comparativa', body: <div><p className="font-bold">{lesson.comparison.title}</p><p className="mt-1">{lesson.comparison.body}</p></div> });
  if (vocab.length) sections.push({ title: 'Botín (vocabulario)', body: (
    <ul className="grid gap-2 sm:grid-cols-2">
      {vocab.map((v) => (
        <li key={v.id} className="flex items-center gap-3 rounded-xl bg-surface-2 p-3">
          <Speak text={v.en.split('/')[0]!.trim()} small />
          <div className="min-w-0"><p className="font-bold">{v.en} <span className="font-normal text-muted">· {v.es}</span></p><p className="text-xs text-muted num">{v.ipa} · «{v.hint}»</p></div>
        </li>
      ))}
    </ul>
  ) });
  sections.push({ title: 'Ejercicios y evaluación', body: (
    <div className="flex flex-col gap-3">
      <p className="text-muted">Guiados ({lesson.guided.length}), independientes ({lesson.independent.length}) y evaluación final ({lesson.final.length}). Necesitas {PASS_PCT} % para abrir la siguiente sala.</p>
      <div><Button onClick={onNext}>Empezar a practicar</Button></div>
    </div>
  ) });
  const [active, setActive] = useState(0);
  const go = (i: number) => { setActive(i); document.getElementById(`sec-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  return (
    <div className="grid gap-5 lg:grid-cols-[230px_1fr]">
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="plate p-3">
          <p className="label px-2 pb-2 pt-1">Contenido de la lección</p>
          <ol className="flex gap-1 overflow-x-auto lg:flex-col">
            {sections.map((sec, i) => (
              <li key={sec.title} className="shrink-0">
                <button onClick={() => go(i)} aria-current={active === i ? 'true' : undefined}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm ${active === i ? 'bg-primary-tint text-text' : 'text-muted hover:bg-surface-2 hover:text-text'}`}>
                  <span className={`num flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs ${active === i ? 'border-primary-fill text-primary' : 'border-line'}`}>{i + 1}</span>
                  <span className="whitespace-nowrap lg:whitespace-normal">{sec.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col gap-5">
        <Scenery seed={lesson.id.length * 7 + lesson.title.length} height={210} moon="none" tower={false} zombies={3} kind={lesson.level === 'A1' ? 'forest' : 'city'} className="rounded-2xl border border-line">
          <div className="flex flex-wrap items-start justify-between gap-6 p-5 sm:p-6">
            <div className="max-w-[30rem]">
              <h2 className="font-display text-3xl">Para empezar</h2>
              <p className="mt-2">{lesson.intro}</p>
              <ul className="mt-3 flex flex-col gap-1 rounded-xl border border-line bg-[#120e0e]/80 p-3 text-sm backdrop-blur">
                <li className="label pb-1">Objetivos</li>
                {lesson.objectives.map((o) => <li key={o} className="flex gap-2"><span className="text-success">✓</span>{o}</li>)}
              </ul>
            </div>
            <div className="hidden pb-16 pr-4 sm:block"><Sign text={lesson.comparison.title} /></div>
          </div>
        </Scenery>

        <Plate className="flex flex-col gap-8">
          {sections.map((sec, i) => (
            <section key={sec.title} id={`sec-${i}`} className="scroll-mt-6 flex flex-col gap-2">
              <h2 className="flex items-center gap-3 font-display text-2xl">
                <span className="num flex h-7 w-7 items-center justify-center rounded-full border border-primary-fill text-sm text-primary">{i + 1}</span>{sec.title}
              </h2>
              <div className="flex flex-col gap-2 leading-relaxed">{sec.body}</div>
            </section>
          ))}
        </Plate>
      </div>
    </div>
  );
}

function Result({ lesson, score, onRetry, onTheory }: { lesson: Lesson; score: number; onRetry: () => void; onTheory: () => void }) {
  const passed = score >= PASS_PCT;
  return (
    <Plate className="pop">
      <div className="hazard mb-4 max-w-40" />
      <p className="label">{passed ? 'Sala superada' : 'Aún no'}</p>
      <h2 className={`font-display text-4xl mt-1 ${passed ? 'text-success' : 'text-primary'}`}><span className="num">{score} %</span></h2>
      {passed ? (
        <>
          <p className="mt-2">Plano aprendido: <b>{lesson.title}</b>. Sus conceptos ya están en Mantenimiento: el primer repaso será mañana. Dominarlo de verdad requiere varios aciertos en días distintos.</p>
          <div className="mt-4 flex flex-wrap gap-2"><LinkButton href="#taller">Volver a la ruta</LinkButton><LinkButton href="#refugio" variant="ghost">Ir al refugio</LinkButton></div>
        </>
      ) : (
        <>
          <p className="mt-2">Necesitas {PASS_PCT} % para abrir la siguiente sala. No pierdes nada por intentarlo de nuevo: repasa el plano o pulsa «NO LO ENTIENDO» para otra explicación.</p>
          <div className="mt-4 flex flex-wrap gap-2"><Button onClick={onTheory}>Repasar el plano</Button><Button variant="ghost" onClick={onRetry}>Repetir evaluación</Button></div>
        </>
      )}
    </Plate>
  );
}

function Missing() {
  return <Plate><h1 className="font-display text-2xl">Esta sala no existe</h1><LinkButton href="#taller" className="mt-4">Volver a la ruta</LinkButton></Plate>;
}
