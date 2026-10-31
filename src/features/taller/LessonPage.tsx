import { useEffect, useState, type ReactNode } from 'react';
import { useGame, PASS_PCT } from '../../lib/store';
import { lessonById } from '../../content/curriculum';
import { vocabById } from '../../content/vocab';
import type { Lesson } from '../../content/schema';
import { isPassed, isUnlocked } from '../../engine/gamification/progress';
import { Sequence } from '../../engine/exercises/Sequence';
import { useStudyTimer } from '../../lib/useStudyTimer';
import { NoLoEntiendo } from '../doctora/NoLoEntiendo';
import { Button, Chip, LinkButton, Plate, Speak } from '../../ui/kit';

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
  useStudyTimer();
  useEffect(() => { if (lesson && isUnlocked(s, lesson.id)) s.startLesson(lesson.id); }, [id]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { setStage('teoria'); window.scrollTo({ top: 0 }); }, [id]);
  useEffect(() => { window.scrollTo({ top: 0 }); }, [stage]);

  if (!lesson) return <Missing />;
  if (!isUnlocked(s, lesson.id)) {
    const req = lesson.prerequisites.map((p) => lessonById(p)?.title).join(', ');
    return (
      <Plate>
        <p className="label">Sala bloqueada</p>
        <h1 className="font-display text-2xl mt-1">{lesson.title}</h1>
        <p className="mt-2 text-muted">Antes necesitas superar: <b className="text-text">{req}</b>. Así nunca se da por sabido algo que aún no has aprendido.</p>
        <LinkButton href="#taller" className="mt-4">Volver al taller</LinkButton>
      </Plate>
    );
  }

  const finish = (pct: number) => { setScore(pct); s.finishLesson(lesson.id, pct); setStage('resultado'); };
  const idx = STAGES.findIndex((x) => x.id === stage);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <a href="#taller" className="text-secondary font-bold text-sm">← Taller</a>
        <p className="label">PRE-A1 · Sala: {lesson.room}</p>
        <h1 className="font-display text-3xl sm:text-4xl leading-tight">{lesson.title}</h1>
        {isPassed(s, lesson.id) && <div><Chip tone="success">Superada · mejor nota {s.lessons[lesson.id]?.bestScore} %</Chip></div>}
      </header>

      {stage !== 'resultado' && (
        <ol className="grid grid-cols-4 gap-1" aria-label="Fases de la sala">
          {STAGES.map((st, i) => (
            <li key={st.id} aria-current={st.id === stage ? 'step' : undefined}
              className={`rounded-full border-b-4 px-1 pb-1 text-center text-xs font-bold uppercase tracking-wider ${i < idx ? 'border-success text-success' : i === idx ? 'border-primary text-text' : 'border-line text-muted'}`}>{st.label}</li>
          ))}
        </ol>
      )}

      {stage === 'teoria' && <Theory lesson={lesson} onNext={() => setStage('guiados')} />}
      {stage === 'guiados' && (
        <Plate>
          <p className="label mb-3">Ejercicios guiados · con pistas y segunda oportunidad</p>
          <Sequence exercises={lesson.guided} mode="practice" onFinish={() => setStage('independientes')} />
        </Plate>
      )}
      {stage === 'independientes' && (
        <Plate>
          <p className="label mb-3">Ejercicios independientes · sin pistas, con segunda oportunidad</p>
          <Sequence exercises={lesson.independent} mode="practice" onFinish={() => setStage('evaluacion')} />
        </Plate>
      )}
      {stage === 'evaluacion' && (
        <Plate>
          <p className="label mb-3">Evaluación final · necesitas {PASS_PCT} %</p>
          <Sequence exercises={lesson.final} mode="exam" onFinish={finish} />
        </Plate>
      )}
      {stage === 'resultado' && <Result lesson={lesson} score={score} onRetry={() => setStage('evaluacion')} onTheory={() => setStage('teoria')} />}

      {stage !== 'evaluacion' && <NoLoEntiendo simpler={lesson.simpler} lessonTitle={lesson.title} />}
    </div>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="flex items-baseline gap-3 text-xl font-bold"><span className="num text-sm text-primary">{String(n).padStart(2, '0')}</span>{title}</h2>
      <div className="flex flex-col gap-2 leading-relaxed">{children}</div>
    </section>
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
  let n = 0;
  const vocab = lesson.vocab.map(vocabById).filter((v): v is NonNullable<typeof v> => !!v);
  return (
    <Plate className="flex flex-col gap-7">
      <div>
        <p className="label">Objetivos</p>
        <ul className="mt-2 flex flex-col gap-1">{lesson.objectives.map((o) => <li key={o} className="flex gap-2"><span className="text-primary">▸</span>{o}</li>)}</ul>
      </div>
      <Section n={++n} title="Para empezar"><p>{lesson.intro}</p></Section>
      <Section n={++n} title="Qué significa"><p>{lesson.meaning}</p></Section>
      <Section n={++n} title="Cuándo se usa"><ul className="flex flex-col gap-1">{lesson.when.map((w) => <li key={w} className="flex gap-2"><span className="text-primary">▸</span>{w}</li>)}</ul></Section>
      <Section n={++n} title="Cómo se construye"><p className="rounded-2xl bg-secondary-tint p-4">{lesson.how}</p></Section>
      {lesson.table && (
        <Section n={++n} title="Tabla">
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-left">
              <thead className="bg-surface-2"><tr>{lesson.table.head.map((h) => <th key={h} className="label p-3">{h}</th>)}</tr></thead>
              <tbody>
                {lesson.table.rows.map((r) => (
                  <tr key={r[0]} className="border-t border-line">
                    {r.map((c, i) => <td key={i} className={`p-3 align-top ${i === 0 ? 'font-bold text-lg whitespace-nowrap' : ''}`}>{i === 0 ? <span className="inline-flex items-center gap-2"><Speak text={c} small />{c}</span> : c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}
      {lesson.affirmative && <Section n={++n} title="Afirmativa"><ExampleList items={lesson.affirmative} /></Section>}
      {lesson.negative && <Section n={++n} title="Negativa"><ExampleList items={lesson.negative} /></Section>}
      {lesson.interrogative && <Section n={++n} title="Pregunta y respuesta corta"><ExampleList items={lesson.interrogative} /></Section>}
      <Section n={++n} title="Ejemplos con traducción"><ExampleList items={lesson.examples} /></Section>
      <Section n={++n} title="Errores frecuentes de hispanohablantes">
        <ul className="flex flex-col gap-2">
          {lesson.errors.map((e) => (
            <li key={e.wrong} className="rounded-xl border border-line p-3">
              <p><span className="text-danger line-through decoration-2 font-bold">{e.wrong}</span> <span className="text-muted">→</span> <span className="text-success font-bold">{e.right}</span></p>
              <p className="text-sm text-muted mt-1">{e.why}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section n={++n} title={`Comparación: ${lesson.comparison.title}`}><p>{lesson.comparison.body}</p></Section>
      {vocab.length > 0 && (
        <Section n={++n} title="Botín de esta sala (vocabulario)">
          <ul className="grid gap-2 sm:grid-cols-2">
            {vocab.map((v) => (
              <li key={v.id} className="flex items-center gap-3 rounded-xl bg-surface-2 p-3">
                <Speak text={v.en} small />
                <div className="min-w-0"><p className="font-bold">{v.en} <span className="font-normal text-muted">· {v.es}</span></p><p className="text-xs text-muted num">{v.ipa} · «{v.hint}»</p></div>
              </li>
            ))}
          </ul>
        </Section>
      )}
      <div className="flex flex-col gap-2 border-t border-line pt-5">
        <p className="text-muted">Siguiente: ejercicios guiados ({lesson.guided.length}), independientes ({lesson.independent.length}) y evaluación final ({lesson.final.length}).</p>
        <div><Button onClick={onNext}>Empezar a practicar</Button></div>
      </div>
    </Plate>
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
          <div className="mt-4 flex flex-wrap gap-2"><LinkButton href="#taller">Volver al taller</LinkButton><LinkButton href="#refugio" variant="ghost">Ir al refugio</LinkButton></div>
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
  return <Plate><h1 className="font-display text-2xl">Esta sala no existe</h1><LinkButton href="#taller" className="mt-4">Volver al taller</LinkButton></Plate>;
}
