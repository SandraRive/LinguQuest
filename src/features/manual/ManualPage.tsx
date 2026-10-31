import { useState } from 'react';
import { VOCAB } from '../../content/curriculum';
import { normalize } from '../../engine/exercises/check';
import { PageHeader, Plate, Speak } from '../../ui/kit';

export function ManualPage() {
  const [q, setQ] = useState('');
  const n = normalize(q);
  const res = VOCAB.filter((v) => !n || normalize(v.en).includes(n) || normalize(v.es).includes(n));
  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow="Diccionario" title="Manual de supervivencia">
        Busca en inglés o en español. El manual crece con cada fase: de momento contiene las {VOCAB.length} palabras de PRE-A1.
      </PageHeader>
      <div>
        <label htmlFor="manual-q" className="label">Buscar</label>
        <input id="manual-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="tired, refugio, ella…" autoComplete="off"
          className="mt-1 w-full rounded-xl border border-line bg-surface-2 px-3 py-3 text-lg outline-none focus:border-primary" />
      </div>
      {res.length === 0 && <p className="text-muted">No hay ninguna palabra con «{q}» en el manual todavía.</p>}
      <ul className="flex flex-col gap-3">
        {res.map((v) => (
          <li key={v.id}>
            <Plate className="p-4!">
              <div className="flex items-start gap-3 pt-1">
                <Speak text={v.en} />
                <div className="min-w-0 flex flex-col gap-1">
                  <p><b className="text-xl">{v.en}</b> <span className="text-muted">· {v.pos}</span></p>
                  <p className="text-primary font-bold">{v.es}</p>
                  <p className="text-sm num text-muted">{v.ipa} · suena como «{v.hint}»</p>
                  <p className="text-sm"><b>{v.example}</b> <span className="text-muted">· {v.exampleEs}</span></p>
                  {v.variants && <p className="text-xs text-secondary">{v.variants}</p>}
                </div>
              </div>
            </Plate>
          </li>
        ))}
      </ul>
    </div>
  );
}
