import type { ReactNode } from 'react';

/** Iconos de línea propios (sin dependencias). Heredan el color del texto. */
const I = ({ children, size = 20 }: { children: ReactNode; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
type P = { size?: number };

export const IconHome = (p: P) => <I {...p}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></I>;
export const IconTarget = (p: P) => <I {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><path d="M12 12l7-7M16 5h3v3" /></I>;
export const IconTrophy = (p: P) => <I {...p}><path d="M8 4h8v5a4 4 0 0 1-8 0V4z" /><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8M9 17h6" /></I>;
export const IconTree = (p: P) => <I {...p}><circle cx="12" cy="5" r="2" /><circle cx="6" cy="17" r="2" /><circle cx="18" cy="17" r="2" /><circle cx="12" cy="12" r="2" /><path d="M12 7v3M10.5 13.5l-3 2M13.5 13.5l3 2" /></I>;
export const IconLocker = (p: P) => <I {...p}><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M12 3v18M9 9h1M14 9h1" /></I>;
export const IconChart = (p: P) => <I {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></I>;
export const IconHammer = (p: P) => <I {...p}><path d="M14 6l4 4M12 8l-8 8 3 3 8-8" /><path d="M13 4l7 7 1.5-1.5-7-7z" /></I>;
export const IconBag = (p: P) => <I {...p}><path d="M6 8h12l1 12H5L6 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /><path d="M9 13h6" /></I>;
export const IconRadio = (p: P) => <I {...p}><rect x="3" y="9" width="18" height="11" rx="2" /><path d="M7 9l10-5" /><circle cx="15.5" cy="14.5" r="2.5" /><path d="M6 13h4M6 16h4" /></I>;
export const IconBook = (p: P) => <I {...p}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z" /><path d="M4 19a2 2 0 0 1 2-2h13" /></I>;
export const IconPen = (p: P) => <I {...p}><path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" /><path d="M14 6l3 3" /></I>;
export const IconWalkie = (p: P) => <I {...p}><rect x="7" y="7" width="10" height="14" rx="2" /><path d="M10 7V3M10 12h4M10 15h4" /></I>;
export const IconWrench = (p: P) => <I {...p}><path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5a4 4 0 0 0-2-2z" /></I>;
export const IconManual = (p: P) => <I {...p}><path d="M12 6c-2-1.5-5-2-8-1.5V19c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V4.5C17 4 14 4.5 12 6z" /><path d="M12 6v14.5" /></I>;
export const IconUser = (p: P) => <I {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></I>;
export const IconLock = (p: P) => <I {...p}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></I>;
export const IconCheck = (p: P) => <I {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></I>;
export const IconFlame = (p: P) => <I {...p}><path d="M12 21c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-5 5-5 8 0 4 3 7 7 7z" /></I>;
export const IconStar = (p: P) => <I {...p}><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" /></I>;
export const IconArrow = (p: P) => <I {...p}><path d="M5 12h14M13 6l6 6-6 6" /></I>;
export const IconBack = (p: P) => <I {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></I>;
export const IconChevron = (p: P) => <I {...p}><path d="M9 6l6 6-6 6" /></I>;
export const IconHeadphones = (p: P) => <I {...p}><path d="M4 15v-3a8 8 0 0 1 16 0v3" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></I>;
export const IconHelp = (p: P) => <I {...p}><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01" /></I>;
export const IconShield = (p: P) => <I {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /></I>;
export const IconSkull = (p: P) => <I {...p}><path d="M12 3a8 8 0 0 0-5 14v3h10v-3a8 8 0 0 0-5-14z" /><circle cx="9" cy="11" r="1.6" /><circle cx="15" cy="11" r="1.6" /><path d="M10 20v-2M14 20v-2" /></I>;

/** Símbolo de riesgo biológico (nodo actual de la ruta). */
export const Biohazard = ({ size = 34 }: P) => (
  <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" fill="currentColor">
    <circle cx="32" cy="34" r="5" />
    {[0, 120, 240].map((r) => (
      <g key={r} transform={`rotate(${r} 32 34)`}>
        <path d="M32 6a14 14 0 0 0-7 26.1A11 11 0 0 1 32 18a11 11 0 0 1 7 14.1A14 14 0 0 0 32 6z" />
      </g>
    ))}
    <circle cx="32" cy="34" r="16" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="10 8" />
  </svg>
);
