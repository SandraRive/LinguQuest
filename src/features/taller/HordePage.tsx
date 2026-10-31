import { useState } from 'react';
import { useGame } from '../../lib/store';
import { UNITS } from '../../content/curriculum';
import { hordeUnlocked } from '../../engine/gamification/progress';
import { Sequence } from '../../engine/exercises/Sequence';
import { shuffled } from '../../engine/exercises/check';
import { useStudyTimer } from '../../lib/useStudyTimer';
import { Button, LinkButton, Plate } from '../../ui/kit';

export function HordePage({ unitId }: { unitId: string }) {
  const s = useGame();
  const unit = UNITS.find((u) => u.id === unitId);
  const [phase, setPhase] = useState<'brief' | 'fight' | 'end'>('brief');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  useStudyTimer();
  if (!unit) return <Plate><p>Esta horda no existe.</p><LinkButton href="#taller" className="mt-3">Volver</LinkButton></Plate>;
  if (!hordeUnlocked(s, unitId)) {
    return (
      <Plate>
        <p className="label">Aún no</p>
        <h1 className="font-display text-2xl">{unit.horde.title}</h1>
        <p className="mt-2 text-muted">Supera primero las tres salas de la unidad.</p>
        <LinkButton href="#taller" className="mt-4">Volver al taller</LinkButton>
      </Plate>
    );
  }
  // Interleaving: las preguntas se mezclan en un orden distinto cada intento.
  const exercises = shuffled(unit.horde.exercises, `${unitId}-${round}`);
  const passed = score >= unit.horde.passPct;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <a href="#taller" className="text-secondary font-bold text-sm">← Taller</a>
        <p className="label text-danger!">Mini-horda · {unit.building}</p>
        <h1 className="font-display text-3xl sm:text-4xl">{unit.horde.title}</h1>
      </header>
      {phase === 'brief' && (
        <Plate>
          <div className="hazard mb-4" />
          <p className="text-lg">Cae la noche. La horda pondrá a prueba todo lo de la unidad, mezclado: pronombres, be afirmativo, negativo y preguntas.</p>
          <ul className="mt-3 flex flex-col gap-1 text-muted">
            <li>▸ {unit.horde.exercises.length} preguntas, sin pistas.</li>
            <li>▸ Necesitas {unit.horde.passPct} % para superarla.</li>
            <li>▸ Puedes intentarlo las veces que quieras. Fallar no quita nada.</li>
          </ul>
          <Button className="mt-5" onClick={() => setPhase('fight')}>Empezar</Button>
        </Plate>
      )}
      {phase === 'fight' && (
        <Plate>
          <Sequence key={round} title={unit.horde.title} note="sin pistas" exercises={exercises} mode="exam" onFinish={(pct) => { setScore(pct); s.finishHorde(unitId, pct, unit.horde.passPct); setPhase('end'); }} />
        </Plate>
      )}
      {phase === 'end' && (
        <Plate className="pop">
          <p className="label">{passed ? 'Has resistido' : 'La horda ha pasado'}</p>
          <p className={`font-display text-5xl num mt-1 ${passed ? 'text-success' : 'text-primary'}`}>{score} %</p>
          <p className="mt-2">{passed
            ? 'Has sobrevivido a la primera noche. Las siguientes unidades de PRE-A1 llegarán en la próxima fase.'
            : `Te faltan ${unit.horde.passPct - score} puntos. Mira en el Refugio si tienes alguna infección y repasa esa sala.`}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {!passed && <Button onClick={() => { setRound(round + 1); setPhase('fight'); }}>Intentarlo otra vez</Button>}
            <LinkButton href="#refugio" variant={passed ? 'primary' : 'ghost'}>Ir al refugio</LinkButton>
          </div>
        </Plate>
      )}
    </div>
  );
}
