import { useEffect, useState } from 'react';

/** Rutas como #nombre simple (compatible con el visor de artifacts). */
export function useRoute(): string {
  const read = () => decodeURIComponent(window.location.hash.replace(/^#/, '')) || 'refugio';
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => { setRoute(read()); window.scrollTo({ top: 0 }); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

export const go = (name: string) => { window.location.hash = name; };
