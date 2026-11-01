import { useState } from 'react';
import { useGame } from '../../lib/store';
import { LESSONS, VOCAB } from '../../content/curriculum';
import { isPassed } from '../../engine/gamification/progress';
import { Chip, LinkButton, PageHeader, Plate, Speak } from '../../ui/kit';

export function SaqueoPage() {
  const s = useGame();
  const looted = new Set(LESSONS.filter((l) => isPassed(s, l.id)).flatMap((l) => l.vocab));
  const cats = ['todas', ...Array.from(new Set(VOCAB.map((v) => v.pos)))];
  const [cat, setCat] = useState('todas');
  const list = VOCAB.filter((v) => cat === 'todas' || v.pos === cat);
  const [flip, setFlip] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow="Vocabulario · PRE-A1 y A1" title="Saqueo">
        Cada sala que superas te da su botín de palabras. Toca una tarjeta para darle la vuelta: primero intenta recordar el significado.
      </PageHeader>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por categoría">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
            className={`rounded-full border px-3 py-1.5 text-sm font-bold capitalize ${cat === c ? 'border-primary bg-primary-tint' : 'border-line'}`}>{c}</button>
        ))}
        <span className="num ml-auto text-sm text-muted">{looted.size}/{VOCAB.length} recogidas</span>
      </div>
      {looted.size === 0 && (
        <Plate><p>El inventario está vacío. Supera la primera sala del Taller para conseguir tu primer botín.</p><LinkButton href="#taller" className="mt-3">Ir al taller</LinkButton></Plate>
      )}
      <ul className="grid gap-3 sm:grid-cols-2">
        {list.map((v) => {
          const have = looted.has(v.id);
          const open = flip === v.id;
          if (!have) return (
            <li key={v.id} className="rounded-xl border border-dashed border-line p-4 text-muted">
              <p className="font-display text-xl">? ? ?</p><p className="text-sm">{v.topic} · sin recoger</p>
            </li>
          );
          return (
            <li key={v.id} className="plate p-4 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2 pt-2">
                <button onClick={() => setFlip(open ? null : v.id)} className="text-left" aria-expanded={open}>
                  <p className="font-display text-2xl">{v.en}</p>
                  <p className="text-xs text-muted num">{v.ipa}</p>
                </button>
                <Speak text={v.en} />
              </div>
              {open ? (
                <div className="pop flex flex-col gap-1">
                  <p className="text-lg font-bold text-primary">{v.es}</p>
                  <p className="text-sm">Suena como: «{v.hint}»</p>
                  <p className="text-sm flex items-center gap-2"><Speak text={v.example} small /><span><b>{v.example}</b> <span className="text-muted">· {v.exampleEs}</span></span></p>
                  {v.variants && <p className="text-xs text-secondary">{v.variants}</p>}
                </div>
              ) : <button onClick={() => setFlip(v.id)} className="text-sm text-secondary font-bold text-left">Dar la vuelta</button>}
              <div><Chip>{v.pos}</Chip> <Chip>{v.topic}</Chip></div>
            </li>
          );
        })}
      </ul>
      <p className="text-sm text-muted">Cada palabra recogida entra también como tarjeta en Mantenimiento (español → inglés). Los falsos amigos y los verbos irregulares aparecerán cuando lleguen en A1 y A2.</p>
    </div>
  );
}
