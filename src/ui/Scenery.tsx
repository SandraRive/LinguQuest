import { useMemo, type ReactNode } from 'react';

/**
 * Escena de apocalipsis dibujada en SVG: luna roja, ciudad en ruinas, torre de vigilancia,
 * valla y siluetas de zombies. Determinista (misma "semilla" = misma escena), sin imágenes externas.
 */
function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

const SIL = '#0c0909';
const FAR = '#211a19';
const MID = '#171211';

function Zombie({ x, y, s, flip }: { x: number; y: number; s: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} fill={SIL}>
      <circle cx="1" cy="-60" r="7.5" />
      <path d="M-7 -52 L7 -51 L9 -24 L5 0 L1 0 L0 -20 L-2 0 L-7 0 L-9 -25 Z" />
      <path d="M5 -48 L25 -42 L25 -38 L5 -41 Z" />
      <path d="M-5 -47 L-14 -30 L-11 -28 L-3 -42 Z" />
    </g>
  );
}

export function Scenery({ seed = 7, height = 220, moon = 'right', tower = true, zombies = 4, className = '', children }: {
  seed?: number; height?: number; moon?: 'left' | 'right' | 'none'; tower?: boolean; zombies?: number; className?: string; children?: ReactNode;
}) {
  const g = useMemo(() => {
    const r = rng(seed);
    const far: { x: number; w: number; h: number }[] = [];
    for (let x = -20; x < 1220;) { const w = 40 + r() * 70; far.push({ x, w, h: 70 + r() * 110 }); x += w + 4; }
    const mid: { x: number; w: number; h: number; broken: boolean; windows: { x: number; y: number }[] }[] = [];
    for (let x = -30; x < 1230;) {
      const w = 60 + r() * 90, h = 50 + r() * 120;
      const windows: { x: number; y: number }[] = [];
      for (let wy = 300 - h + 14; wy < 280; wy += 18) for (let wx = x + 10; wx < x + w - 12; wx += 16) if (r() < 0.07) windows.push({ x: wx, y: wy });
      mid.push({ x, w, h, broken: r() < 0.45, windows });
      x += w + 10 + r() * 30;
    }
    const zs = Array.from({ length: zombies }, (_, i) => ({ x: 120 + r() * 960, s: 0.7 + r() * 0.5, flip: i % 2 === 0, y: 296 }));
    return { far, mid, zs, towerX: moon === 'left' ? 980 : 150 };
  }, [seed, zombies, moon]);
  const moonX = moon === 'left' ? 230 : 960;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ minHeight: height }}>
      <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id={`sky${seed}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a1110" />
            <stop offset="0.6" stopColor="#1a1211" />
            <stop offset="1" stopColor="#141111" />
          </linearGradient>
          <radialGradient id={`moon${seed}`}>
            <stop offset="0" stopColor="#e0655a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#e0655a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`fog${seed}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#141111" stopOpacity="0" />
            <stop offset="1" stopColor="#141111" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <rect width="1200" height="300" fill={`url(#sky${seed})`} />
        {moon !== 'none' && (
          <g>
            <circle cx={moonX} cy="80" r="120" fill={`url(#moon${seed})`} />
            <circle cx={moonX} cy="80" r="44" fill="#c9554b" />
            <circle cx={moonX - 12} cy="70" r="8" fill="#b44a41" />
            <circle cx={moonX + 14} cy="92" r="5" fill="#b44a41" />
          </g>
        )}
        {g.far.map((b, i) => <rect key={`f${i}`} x={b.x} y={300 - b.h - 40} width={b.w} height={b.h + 40} fill={FAR} />)}
        {g.mid.map((b, i) => (
          <g key={`m${i}`}>
            <path d={b.broken
              ? `M${b.x} 300 V${300 - b.h} h${b.w * 0.3} l${b.w * 0.15} ${18} l${b.w * 0.2} ${-10} l${b.w * 0.35} ${22} V300 Z`
              : `M${b.x} 300 V${300 - b.h} h${b.w} V300 Z`} fill={MID} />
            {b.windows.map((w, k) => <rect key={k} x={w.x} y={w.y} width="6" height="8" fill="#e7a04c" opacity="0.55" />)}
          </g>
        ))}
        {tower && (
          <g fill={SIL} stroke={SIL}>
            <rect x={g.towerX - 30} y="150" width="60" height="26" />
            <path d={`M${g.towerX - 38} 150 L${g.towerX} 128 L${g.towerX + 38} 150 Z`} />
            <path d={`M${g.towerX - 24} 176 L${g.towerX - 40} 300 M${g.towerX + 24} 176 L${g.towerX + 40} 300 M${g.towerX - 32} 236 L${g.towerX + 32} 236 M${g.towerX - 30} 236 L${g.towerX + 36} 296 M${g.towerX + 30} 236 L${g.towerX - 36} 296`} strokeWidth="5" fill="none" />
            <rect x={g.towerX - 18} y="156" width="36" height="10" fill="#e7a04c" opacity="0.35" stroke="none" />
          </g>
        )}
        {/* valla */}
        <g stroke={SIL} strokeWidth="3" opacity="0.9">
          {Array.from({ length: 31 }, (_, i) => <line key={i} x1={i * 40} y1="246" x2={i * 40} y2="300" />)}
          <line x1="0" y1="250" x2="1200" y2="250" />
          <line x1="0" y1="272" x2="1200" y2="272" strokeWidth="1.5" />
        </g>
        {g.zs.map((z, i) => <Zombie key={i} x={z.x} y={z.y} s={z.s} flip={z.flip} />)}
        <rect y="180" width="1200" height="120" fill={`url(#fog${seed})`} />
      </svg>
      {children && <div className="relative">{children}</div>}
    </div>
  );
}

/** Cartel de madera clavado con el tema de la lección (como "TO BE = SER / ESTAR"). */
export function Sign({ text }: { text: string }) {
  return (
    <div className="relative inline-block -rotate-3 select-none" aria-hidden="true">
      <div className="h-24 w-2 absolute left-1/2 top-full -translate-x-1/2 bg-[#3b2a20]" />
      <div className="rounded-sm border-2 border-[#2a1d16] bg-[linear-gradient(180deg,#8a5a3c,#6e4630)] px-5 py-3 shadow-[var(--shadow)]">
        <p className="font-logo text-2xl leading-tight text-[#2a0f0c] [text-shadow:0_1px_0_rgba(255,255,255,0.15)]">{text}</p>
      </div>
    </div>
  );
}
