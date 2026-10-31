import { useState, type ReactNode } from 'react';
import { useGame, type Settings } from '../../lib/store';
import { hasEnglishVoice, speak, speechAvailable } from '../../lib/speech';
import { survivorLevel, totalXp } from '../../engine/gamification/progress';
import { Button, PageHeader, Plate } from '../../ui/kit';
import { TransferSection } from './TransferSection';

function Group<T extends string | number>({ label, value, options, onChange }: { label: string; value: T; options: { v: T; l: string }[]; onChange: (v: T) => void }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="label mb-2">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={String(o.v)} type="button" aria-pressed={value === o.v} onClick={() => onChange(o.v)}
            className={`rounded-xl border px-4 py-2 font-bold ${value === o.v ? 'border-primary bg-primary-tint' : 'border-line hover:bg-surface-2'}`}>{o.l}</button>
        ))}
      </div>
    </fieldset>
  );
}

const Row = ({ children }: { children: ReactNode }) => <div className="border-t border-line pt-5">{children}</div>;

export function FichaPage() {
  const s = useGame();
  const set = (p: Partial<Settings>) => s.setSettings(p);
  const [name, setName] = useState(s.settings.name);
  const [nameErr, setNameErr] = useState('');
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const lvl = survivorLevel(totalXp(s));

  const saveName = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    if (n.length > 30) { setNameErr('Como máximo 30 caracteres.'); return; }
    if (n && !/^[\p{L}\p{N} .'-]+$/u.test(n)) { setNameErr('Usa solo letras, números, espacios, puntos o guiones.'); return; }
    setNameErr(''); set({ name: n }); setSaved(true); window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow={`Superviviente · nivel ${lvl.level}`} title="Ficha del superviviente">Tu nombre, cómo se ve la app y cómo suena.</PageHeader>
      <Plate className="flex flex-col gap-5">
        <form onSubmit={saveName} className="flex flex-col gap-2 pt-2" noValidate>
          <label htmlFor="name" className="label">Nombre en clave</label>
          <div className="flex flex-wrap gap-2">
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} aria-invalid={!!nameErr} aria-describedby="name-err"
              className="flex-1 min-w-0 rounded-xl border border-line bg-surface-2 px-3 py-2.5 text-lg outline-none focus:border-primary" />
            <Button type="submit">Guardar</Button>
          </div>
          <p id="name-err" className={`text-sm ${nameErr ? 'text-danger' : 'text-success'}`}>{nameErr || (saved ? 'Guardado.' : '')}</p>
        </form>


        <Row><Group label="Tamaño del texto" value={s.settings.textScale} onChange={(v) => set({ textScale: v })}
          options={[{ v: 1, l: '100 %' }, { v: 1.15, l: '115 %' }, { v: 1.3, l: '130 %' }, { v: 1.5, l: '150 %' }]} /></Row>

        <Row><Group label="Conceptos nuevos al día (repasos)" value={s.settings.newPerDay ?? 10} onChange={(v) => set({ newPerDay: v })}
          options={[{ v: 5, l: '5 · tranquilo' }, { v: 10, l: '10 · normal' }, { v: 20, l: '20 · intensivo' }]} /></Row>

        <Row><Group label="Animaciones" value={s.settings.motion ? 'on' : 'off'} onChange={(v) => set({ motion: v === 'on' })}
          options={[{ v: 'on', l: 'Activadas' }, { v: 'off', l: 'Desactivadas' }]} /></Row>

        <Row>
          <Group label="Acento de las voces" value={s.settings.accent} onChange={(v) => set({ accent: v })}
            options={[{ v: 'en-GB', l: 'Británico' }, { v: 'en-US', l: 'Americano' }]} />
          <div className="mt-4 flex flex-col gap-2">
            <label htmlFor="rate" className="label">Velocidad de la voz: <span className="num">{s.settings.speechRate.toFixed(2)}×</span></label>
            <input id="rate" type="range" min={0.5} max={1.2} step={0.05} value={s.settings.speechRate} onChange={(e) => set({ speechRate: Number(e.target.value) })} className="accent-[var(--primary)] max-w-sm" />
            {speechAvailable() ? (
              <div><Button variant="ghost" onClick={() => speak('Hello. I am a survivor. Are you safe?', s.settings.accent, s.settings.speechRate)}>Probar la voz</Button></div>
            ) : <p className="text-sm text-danger">Este navegador no puede leer en voz alta.</p>}
            {speechAvailable() && !hasEnglishVoice() && <p className="text-sm text-muted">Si no oyes nada, puede que tu dispositivo no tenga voces en inglés instaladas o que aún estén cargando.</p>}
          </div>
        </Row>
      </Plate>

      <TransferSection />

      <Plate>
        <h2 className="font-display text-xl">Tu progreso</h2>
        <p className="mt-2 text-muted">Se guarda en este navegador. Para llevarlo a otro dispositivo, usa «Pasar a otro dispositivo».</p>
        {!confirmReset ? (
          <Button variant="danger" className="mt-4" onClick={() => setConfirmReset(true)}>Borrar todo el progreso</Button>
        ) : (
          <div className="mt-4 rounded-xl border border-danger p-4" role="alert">
            <p className="font-bold">¿Seguro? Se borran salas, repasos, XP y trofeos. No se puede deshacer.</p>
            <div className="mt-3 flex gap-2">
              <Button variant="danger" onClick={() => { s.resetAll(); setConfirmReset(false); }}>Sí, borrar</Button>
              <Button variant="ghost" onClick={() => setConfirmReset(false)}>Cancelar</Button>
            </div>
          </div>
        )}
      </Plate>
    </div>
  );
}

