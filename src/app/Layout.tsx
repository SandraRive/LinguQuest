import { useEffect, useState, type ReactNode } from 'react';
import { useGame } from '../lib/store';
import { sessionCards, survivorLevel, totalXp, infections } from '../engine/gamification/progress';
import { Toasts } from '../ui/kit';
import { Avatar } from '../ui/Avatar';
import * as Ic from '../ui/icons';

interface NavItem { id: string; label: string; sub: string; phase?: number; icon: (p: { size?: number }) => ReactNode }
const NAV: { group: string; items: NavItem[] }[] = [
  { group: 'Base', items: [
    { id: 'refugio', label: 'El Refugio', sub: 'Inicio', icon: Ic.IconHome },
    { id: 'encargos', label: 'Tablón de encargos', sub: 'Misiones', icon: Ic.IconTarget },
    { id: 'trofeos', label: 'Trofeos', sub: 'Logros', icon: Ic.IconTrophy },
    { id: 'arbol', label: 'Árbol de habilidades', sub: 'Perks por destreza', icon: Ic.IconTree },
    { id: 'taquilla', label: 'Taquilla', sub: 'Recompensas cosméticas', icon: Ic.IconLocker },
    { id: 'diario', label: 'Diario del superviviente', sub: 'Estadísticas', icon: Ic.IconChart },
  ] },
  { group: 'Aprender', items: [
    { id: 'taller', label: 'Ruta de aprendizaje', sub: 'Salas, hordas y jefe', icon: Ic.IconHammer },
    { id: 'saqueo', label: 'Saqueo', sub: 'Vocabulario', icon: Ic.IconBag },
    { id: 'radio', label: 'Radio de onda corta', sub: 'Listening', icon: Ic.IconRadio },
    { id: 'diarios', label: 'Diarios encontrados', sub: 'Reading', icon: Ic.IconBook },
    { id: 'fabricacion', label: 'Banco de fabricación', sub: 'Writing', icon: Ic.IconPen },
    { id: 'walkie', label: 'Walkie-talkie', sub: 'Speaking', icon: Ic.IconWalkie },
  ] },
  { group: 'Apoyo', items: [
    { id: 'mantenimiento', label: 'Mantenimiento', sub: 'Repasos', icon: Ic.IconWrench },
    { id: 'manual', label: 'Manual de supervivencia', sub: 'Diccionario', icon: Ic.IconManual },
    { id: 'ficha', label: 'Ficha del superviviente', sub: 'Perfil y ajustes', icon: Ic.IconUser },
  ] },
];

const sectionOf = (route: string) => {
  if (route.startsWith('sala-') || route.startsWith('horda-') || route.startsWith('jefe-') || route === 'comparaciones') return 'taller';
  return route;
};

export function Layout({ route, children }: { route: string; children: ReactNode }) {
  const state = useGame();
  const { settings } = state;
  const [open, setOpen] = useState(false);
  const xp = totalXp(state);
  const lvl = survivorLevel(xp);
  const due = sessionCards(state).length;
  const inf = infections(state).length;
  const active = sectionOf(route);

  // Ajustes visuales globales
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--text-scale', String(settings.textScale));
    root.setAttribute('data-motion', settings.motion ? 'on' : 'off');
  }, [settings.textScale, settings.motion]);
  useEffect(() => setOpen(false), [route]);

  const nav = (
    <nav aria-label="Módulos" className="flex flex-col gap-5">
      {NAV.map((g) => (
        <div key={g.group} className="flex flex-col gap-1">
          <p className="label px-3">{g.group}</p>
          {g.items.map((it) => {
            const isActive = active === it.id;
            return (
              <a key={it.id} href={`#${it.id}`} aria-current={isActive ? 'page' : undefined}
                className={`group flex items-center justify-between gap-2 rounded-xl border px-3 py-2 no-underline ${isActive ? 'border-primary-fill/70 bg-primary-tint text-text' : 'border-transparent text-text hover:bg-surface-2'}`}>
                <span className={`shrink-0 ${isActive ? 'text-primary' : 'text-muted group-hover:text-text'}`}><it.icon size={20} /></span>
                <span className="flex flex-1 flex-col leading-tight min-w-0">
                  <span className="font-bold truncate">{it.label}</span>
                  <span className="text-xs text-muted">{it.sub}{it.phase ? ` · sin explorar (fase ${it.phase})` : ''}</span>
                </span>
                {it.id === 'mantenimiento' && due > 0 && <span className="num rounded-full bg-primary-fill px-2 text-xs font-bold text-ink">{due}</span>}
                {it.id === 'refugio' && inf > 0 && <span className="num rounded-full bg-infection-fill px-2 text-xs font-bold text-ink" title="Infecciones activas">{inf}</span>}
              </a>
            );
          })}
        </div>
      ))}
    </nav>
  );

  return (
    <div className="min-h-full lg:grid lg:grid-cols-[288px_1fr]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-surface focus:p-2">Saltar al contenido</a>
      {/* Barra superior (móvil) */}
      <header className="sticky z-20 flex items-center justify-between gap-3 border-b border-line bg-surface py-3 lg:hidden"
        style={{ top: 'env(safe-area-inset-top, 0px)', paddingLeft: 'max(16px, env(safe-area-inset-left, 0px))', paddingRight: 'max(16px, env(safe-area-inset-right, 0px))' }}>
        <a href="#refugio" className="font-logo text-2xl leading-none text-text no-underline">Lingu<span className="text-primary">Quest</span></a>
        <div className="flex items-center gap-3">
          <span className="num text-sm text-accent">Nv {lvl.level}</span>
          <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" className="rounded-xl border border-line px-3 py-2 font-bold">{open ? 'Cerrar' : 'Menú'}</button>
        </div>
      </header>
      {open && <div id="mobile-nav" className="lg:hidden border-b border-line bg-surface py-4 max-h-[75vh] overflow-y-auto" style={{ paddingLeft: 'max(16px, env(safe-area-inset-left, 0px))', paddingRight: 'max(16px, env(safe-area-inset-right, 0px))' }}>{nav}</div>}

      {/* Barra lateral (escritorio) */}
      <aside className="hidden lg:flex flex-col gap-6 border-r border-line bg-[#171313] p-5 sticky top-0 h-screen overflow-y-auto">
        <a href="#refugio" className="no-underline">
          <p className="font-logo text-[2.1rem] leading-[0.95] text-text">Lingu<br /><span className="text-primary">Quest</span></p>
          <p className="text-xs text-muted mt-2">Academia de supervivientes · 0 → B2</p>
        </a>
        <div className="rounded-2xl bg-surface-2 p-3">
          <div className="flex items-baseline justify-between">
            <span className="label">Superviviente</span>
            <span className="num text-accent font-bold">Nv {lvl.level}</span>
          </div>
          <a href="#taquilla" className="mt-1 flex items-center gap-2 no-underline text-text" title="Cambiar equipo en la Taquilla">
            <Avatar avatar={state.cosmetics.avatar} frame={state.cosmetics.frame} size={40} />
            <span className="font-bold truncate">{settings.name || 'Sin nombre'}</span>
          </a>
          <div className="mt-2 h-2 rounded-full bg-surface overflow-hidden" role="progressbar" aria-label="XP hacia el siguiente nivel" aria-valuenow={Math.round((lvl.into / lvl.need) * 100)} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full bg-accent-fill" style={{ width: `${(lvl.into / lvl.need) * 100}%` }} />
          </div>
          <p className="num text-xs text-muted mt-1">{lvl.into}/{lvl.need} XP · total {xp}</p>
        </div>
        {nav}
      </aside>

      <main id="main" className="mx-auto w-full max-w-5xl pb-32 pt-6 lg:pt-8"
        style={{ paddingLeft: 'max(16px, env(safe-area-inset-left, 0px))', paddingRight: 'max(16px, env(safe-area-inset-right, 0px))' }}>
        {children}
      </main>
      <Toasts />
    </div>
  );
}
