import { useState } from 'react';
import { useGame } from '../../lib/store';
import { isPassed } from '../../engine/gamification/progress';
import { lessonById } from '../../content/curriculum';
import { Chip, PageHeader } from '../../ui/kit';

interface Comp { id: string; title: string; level: string; requires?: string[]; body?: string; examples?: [string, string][] }

/** Comparaciones de estructuras parecidas. Cada una se abre cuando ya conoces las dos piezas. */
const COMPARISONS: Comp[] = [
  { id: 'ser-estar', title: 'Ser vs estar = be', level: 'PRE-A1', requires: ['pre-a1-u1-l2'], body: 'Los dos son be. El significado lo da lo que va detrás.', examples: [["I'm Spanish.", 'Soy española.'], ["I'm tired.", 'Estoy cansada.']] },
  { id: 'tener-be', title: 'Tener años, hambre, frío → be', level: 'PRE-A1', requires: ['pre-a1-u1-l2'], body: 'Donde el español usa tener, el inglés usa be.', examples: [["I'm 25.", 'Tengo 25 años.'], ["I'm hungry.", 'Tengo hambre.']] },
  { id: 'it-they', title: 'it vs they', level: 'PRE-A1', requires: ['pre-a1-u1-l1'], body: 'it para una cosa; they para varias cosas o personas.', examples: [['the radio → it', 'la radio'], ['the radios → they', 'las radios']] },
  { id: 'a-an', title: 'a vs an', level: 'PRE-A1', requires: ['pre-a1-u3-l9'], body: 'Manda el sonido, no la letra.', examples: [['a radio, a map', 'sonido de consonante'], ['an egg, an hour', 'sonido de vocal']] },
  { id: 'his-her', title: 'his vs her', level: 'PRE-A1', requires: ['pre-a1-u4-l13'], body: 'Depende del dueño, no de la cosa.', examples: [['Ana and her brother', 'el hermano de Ana'], ['Tom and his sister', 'la hermana de Tom']] },
  { id: 'in-on', title: 'on vs in (fechas)', level: 'PRE-A1', requires: ['pre-a1-u4-l14'], body: 'on con días, in con meses.', examples: [['on Monday', 'el lunes'], ['in May', 'en mayo']] },
  { id: 'evening-night', title: 'Good evening vs Good night', level: 'PRE-A1', requires: ['pre-a1-u4-l15'], body: 'Good evening al llegar; Good night al irte.', examples: [['Good evening!', 'al llegar a las 21:00'], ['Good night!', 'al despedirte']] },
  { id: 'teen-ty', title: '-teen vs -ty', level: 'PRE-A1', requires: ['pre-a1-u2-l7'], body: 'thirTEEN (13) lleva la fuerza al final; THIRty (30), al principio.', examples: [['thirteen', '13'], ['thirty', '30']] },
  { id: 'spain-spanish', title: 'Spain vs Spanish', level: 'PRE-A1', requires: ['pre-a1-u4-l15'], body: 'from + país; be + nacionalidad.', examples: [["I'm from Spain.", 'Soy de España.'], ["I'm Spanish.", 'Soy española.']] },
  { id: 'ps-pc', title: 'Present Simple vs Present Continuous', level: 'A1', requires: ['a1-u3-l26'], body: 'Simple = costumbres (every day, usually). Continuous = lo que pasa justo ahora (now, look!).', examples: [['I cook every day.', 'Cocino todos los días.'], ["I'm cooking now.", 'Ahora estoy cocinando.']] },
  { id: 'do-does', title: 'Do vs Does', level: 'A1', requires: ['a1-u1-l18'], body: 'do con I, you, we, they; does con he, she, it. Con does el verbo pierde la -s.', examples: [['Do you work here?', '¿Trabajas aquí?'], ['Does she work here?', '¿Trabaja ella aquí?']] },
  { id: 'have-there', title: 'Have got vs There is', level: 'A1', requires: ['a1-u2-l22'], body: 'have got = tener (posesión). there is / are = hay (existencia en un lugar).', examples: [["I've got a tent.", 'Tengo una tienda.'], ["There's a tent by the river.", 'Hay una tienda junto al río.']] },
  { id: 'in-on-place', title: 'in vs on (lugar)', level: 'A1', requires: ['a1-u2-l23'], body: 'in = dentro; on = encima de una superficie.', examples: [['in the bag', 'en (dentro de) la mochila'], ['on the table', 'en (encima de) la mesa']] },
  { id: 'excuse-sorry', title: 'Excuse me vs Sorry', level: 'A1', requires: ['a1-u3-l28'], body: 'Excuse me antes de molestar; sorry para disculparte o pedir que repitan.', examples: [['Excuse me, where is the shop?', 'Perdone, ¿dónde está la tienda?'], ["Sorry, I'm late.", 'Perdón, llego tarde.']] },
  { id: 'much-many', title: 'Much vs Many', level: 'A2' },
  { id: 'was-were', title: 'Was vs Were', level: 'A2' },
  { id: 'will-going', title: 'Will vs Going to', level: 'A2' },
  { id: 'make-do', title: 'Make vs Do', level: 'A2' },
  { id: 'say-tell', title: 'Say vs Tell', level: 'A2' },
  { id: 'past-pp', title: 'Past Simple vs Present Perfect', level: 'B1' },
  { id: 'for-since', title: 'For vs Since', level: 'B1' },
];

export function ComparacionesPage() {
  const s = useGame();
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-6">
      <a href="#taller" className="text-secondary font-bold text-sm">← Taller</a>
      <PageHeader eyebrow="Gramática" title="Comparaciones">Estructuras que se confunden, una al lado de la otra. Cada comparación se abre cuando ya has aprendido las dos piezas.</PageHeader>
      <ul className="flex flex-col gap-3">
        {COMPARISONS.map((c) => {
          const ready = !!c.requires && c.requires.every((r) => isPassed(s, r));
          const isOpen = open === c.id;
          return (
            <li key={c.id} className={`rounded-2xl border p-4 ${ready ? 'border-line bg-surface shadow-[var(--shadow)]' : 'border-dashed border-line opacity-70'}`}>
              <button className="flex w-full items-center justify-between gap-3 text-left" disabled={!ready} onClick={() => setOpen(isOpen ? null : c.id)} aria-expanded={isOpen}>
                <span><b className="text-lg">{c.title}</b><span className="ml-2"><Chip tone={ready ? 'secondary' : 'muted'}>{c.level}</Chip></span></span>
                <span className="text-sm text-muted">{ready ? (isOpen ? 'Cerrar' : 'Ver') : c.requires ? `Requiere: ${lessonById(c.requires[0]!)?.title}` : `Llega con ${c.level}`}</span>
              </button>
              {isOpen && c.body && (
                <div className="pop mt-3">
                  <p>{c.body}</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {c.examples?.map(([en, es]) => <div key={en} className="rounded-xl bg-surface-2 p-3"><p className="font-bold">{en}</p><p className="text-sm text-muted">{es}</p></div>)}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
