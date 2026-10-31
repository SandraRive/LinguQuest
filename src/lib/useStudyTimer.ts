import { useEffect } from 'react';
import { useGame } from './store';

/** Cuenta tiempo de estudio mientras la página está visible (bloques de 15 s). */
export function useStudyTimer() {
  const add = useGame((s) => s.addStudySeconds);
  useEffect(() => {
    const id = window.setInterval(() => { if (document.visibilityState === 'visible') add(15); }, 15000);
    return () => window.clearInterval(id);
  }, [add]);
}
