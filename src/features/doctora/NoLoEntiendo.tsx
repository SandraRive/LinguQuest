import { useState } from 'react';
import { Button } from '../../ui/kit';
import { IconHelp } from '../../ui/icons';

/**
 * Botón permanente «NO LO ENTIENDO».
 * Muestra explicaciones alternativas escritas para cada sala, cada una más sencilla.
 */
export function NoLoEntiendo({ simpler, lessonTitle, inline = false }: { simpler: string[]; lessonTitle: string; inline?: boolean }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const text = simpler[Math.min(step, simpler.length - 1)];
  const last = step >= simpler.length - 1;
  return (
    <>
      {inline ? (
        <button onClick={() => setOpen(true)} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-primary-fill px-4 py-2 font-bold text-ink hover:brightness-110">
          <IconHelp size={18} /> No lo entiendo
        </button>
      ) : (
        <div className="fixed z-30" style={{ right: 'max(16px, env(safe-area-inset-right, 0px))', bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}>
          <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-primary-fill px-5 py-3 font-bold text-ink shadow-[var(--shadow)] hover:brightness-110">
            <IconHelp size={20} /> ¡No lo entiendo!
          </button>
        </div>
      )}
      {open && (
        <div role="dialog" aria-modal="true" aria-labelledby="nle-title" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setOpen(false)}>
          <div className="plate w-full max-w-lg p-6 pop" onClick={(e) => e.stopPropagation()}>
            <div className="hazard mb-4" />
            <p className="label">Radio de ayuda</p>
            <h2 id="nle-title" className="font-display text-2xl mt-1">Otra forma de verlo</h2>
            <p className="text-sm text-muted mt-1">{lessonTitle} · explicación {Math.min(step, simpler.length - 1) + 1} de {simpler.length}</p>
            <p className="mt-4 text-lg leading-relaxed">{text}</p>
            {last && <p className="mt-4 text-sm text-muted">¿Sigue sin encajar? Vuelve a la tabla y a los ejemplos, y prueba los ejercicios guiados con pista.</p>}
            <div className="mt-5 flex flex-wrap gap-2">
              {!last && <Button onClick={() => setStep(step + 1)}>Sigo sin entenderlo, más fácil</Button>}
              <Button variant="ghost" onClick={() => setOpen(false)}>Ahora sí, cerrar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
