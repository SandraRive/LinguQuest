import { useState } from 'react';
import { useGame } from '../../lib/store';
import { COMPETENCY_LABEL, EXAM_PRE_A1, type Competency } from '../../content/exams';
import { biomeGate } from '../../engine/gamification/progress';
import { Sequence } from '../../engine/exercises/Sequence';
import { useStudyTimer } from '../../lib/useStudyTimer';
import { Bar, Button, Chip, LinkButton, PageHeader, Plate } from '../../ui/kit';

export function ExamPage() {
  const s = useGame();
  const exam = EXAM_PRE_A1;
  const gate = biomeGate(s);
  const [step, setStep] = useState(-1);
  const [scores, setScores] = useState<Partial<Record<Competency, number>>>({});
  useStudyTimer();

  if (!gate.allHordes) return (
    <Plate>
      <p className="label">Jefe final · PRE-A1</p>
      <h1 className="font-display text-2xl">{exam.title}</h1>
      <p className="mt-2 text-muted">Se abre cuando superes las 4 hordas de unidad del Refugio.</p>
      <LinkButton href="#taller" className="mt-4">Volver al taller</LinkButton>
    </Plate>
  );

  const section = exam.sections[step];
  const finish = (all: Partial<Record<Competency, number>>) => {
    const passed = exam.sections.every((sec) => (all[sec.competency] ?? 0) >= exam.passPct);
    s.finishLevelExam('PRE_A1', all as Record<string, number>, passed, exam.pending.length > 0);
    setStep(exam.sections.length);
  };

  return (
    <div className="flex flex-col gap-6">
      <a href="#taller" className="text-secondary font-bold text-sm">← Taller</a>
      <PageHeader eyebrow="Jefe final · examen de nivel PRE-A1" title={exam.title}>
        Examen por competencias con preguntas nuevas. Necesitas {exam.passPct} % en cada competencia. Es una puntuación interna de la app: <b className="text-text">no es una certificación oficial</b> (Cambridge, Trinity, EOI…).
      </PageHeader>

      {step === -1 && (
        <Plate>
          <div className="hazard mb-4 max-w-40" />
          <ul className="flex flex-col gap-2">
            {exam.sections.map((sec) => <li key={sec.competency} className="flex justify-between gap-3"><b>{COMPETENCY_LABEL[sec.competency]}</b><span className="text-muted">{sec.exercises.length} preguntas</span></li>)}
            {exam.pending.map((p) => <li key={p.competency} className="flex justify-between gap-3 text-muted"><b>{COMPETENCY_LABEL[p.competency]}</b><span>pendiente</span></li>)}
          </ul>
          <p className="mt-3 text-sm text-muted">{exam.pending[0]?.why}</p>
          <Button className="mt-4" onClick={() => { setScores({}); setStep(0); }}>Empezar el examen</Button>
        </Plate>
      )}

      {section && (
        <Plate>
          <div className="flex items-center justify-between gap-2 pt-1">
            <p className="label">{COMPETENCY_LABEL[section.competency]} · parte {step + 1} de {exam.sections.length}</p>
          </div>
          {section.competency === 'reading' && (
            <div className="my-4 rounded-2xl bg-accent-tint p-4">
              <p className="label mb-2">{exam.reading.title}</p>
              {exam.reading.text.map((t) => <p key={t} className="text-lg">{t}</p>)}
            </div>
          )}
          <Sequence key={section.competency} title={COMPETENCY_LABEL[section.competency]} note="examen de nivel" exercises={section.exercises} mode="exam" onFinish={(pct) => {
            const all = { ...scores, [section.competency]: pct };
            setScores(all);
            if (step + 1 >= exam.sections.length) finish(all); else setStep(step + 1);
          }} />
        </Plate>
      )}

      {step >= exam.sections.length && (
        <Plate className="pop">
          <h2 className="font-display text-2xl">{exam.sections.every((sec) => (scores[sec.competency] ?? 0) >= exam.passPct) ? 'Jefe vencido' : 'El jefe resiste'}</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {exam.sections.map((sec) => {
              const v = scores[sec.competency] ?? 0;
              return (
                <li key={sec.competency}>
                  <div className="flex justify-between text-sm"><b>{COMPETENCY_LABEL[sec.competency]}</b><span className={`num ${v >= exam.passPct ? 'text-success' : 'text-danger'}`}>{v} %</span></div>
                  <Bar value={v} label={COMPETENCY_LABEL[sec.competency]} tone={v >= exam.passPct ? 'success' : 'primary'} />
                </li>
              );
            })}
            <li className="text-sm text-muted">Speaking: pendiente (examen provisional).</li>
          </ul>
          <div className="mt-4 rounded-2xl bg-surface-2 p-4">
            <p className="font-bold">Puerta al Bosque (A1)</p>
            <p className="text-sm text-muted mt-1">Además del examen, necesitas tener consolidado el 80 % de los conceptos de PRE-A1 en Mantenimiento. Así se demuestra que lo recuerdas con el tiempo, no solo hoy.</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Chip tone={gate.examPassed ? 'success' : 'muted'}>Examen {gate.examPassed ? 'superado' : 'pendiente'}</Chip>
              <Chip tone={gate.consolidatedPct >= 80 ? 'success' : 'muted'}>Consolidado {gate.consolidatedPct} %</Chip>
            </div>
          </div>
          <div className="mt-4 flex gap-2"><Button onClick={() => setStep(-1)}>Volver a intentarlo</Button><LinkButton href="#refugio" variant="ghost">Ir al refugio</LinkButton></div>
        </Plate>
      )}
    </div>
  );
}
