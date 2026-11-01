/** Avatar de superviviente dibujado en SVG (sin imágenes externas). */
const FRAME: Record<string, string> = { menta: 'var(--secondary-fill)', melocoton: 'var(--primary-fill)', mantequilla: 'var(--accent-fill)', lavanda: 'var(--infection-fill)', bosque: 'var(--success-fill)' };

export function Avatar({ avatar, frame, size = 56 }: { avatar: string; frame: string; size?: number }) {
  const ring = FRAME[frame] ?? FRAME.menta;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} role="img" aria-label={`Avatar: ${avatar}`}>
      <circle cx="32" cy="32" r="31" fill={ring} />
      <circle cx="32" cy="32" r="26" fill="var(--surface)" />
      {/* cuerpo */}
      <path d="M14 58c2-10 9-15 18-15s16 5 18 15" fill="var(--secondary-fill)" />
      {/* cara */}
      <circle cx="32" cy="31" r="11" fill="#f3d2bf" />
      <circle cx="28" cy="31" r="1.4" fill="#3a2f2a" /><circle cx="36" cy="31" r="1.4" fill="#3a2f2a" />
      <path d="M29 36c2 1.5 4 1.5 6 0" stroke="#3a2f2a" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {avatar === 'casco' && <path d="M20 28c0-8 5-13 12-13s12 5 12 13H20z M18 28h28v3H18z" fill="var(--accent-fill)" stroke="var(--accent)" strokeWidth="0.8" />}
      {avatar === 'gorra' && <path d="M21 27c0-7 5-11 11-11s11 4 11 11H21z M30 27h20v3H30z" fill="var(--primary-fill)" stroke="var(--primary)" strokeWidth="0.8" />}
      {avatar === 'capucha' && <path d="M17 40c0-16 6-24 15-24s15 8 15 24c-3-6-7-9-7-15H24c0 6-4 9-7 15z" fill="var(--infection-fill)" />}
      {avatar === 'auriculares' && <g fill="none" stroke="var(--text)" strokeWidth="2.2"><path d="M20 31c0-8 5-14 12-14s12 6 12 14" /><rect x="17" y="29" width="5" height="8" rx="2" fill="var(--secondary)" /><rect x="42" y="29" width="5" height="8" rx="2" fill="var(--secondary)" /></g>}
      {avatar === 'mascara' && <g><path d="M23 33h18v5c0 4-4 6-9 6s-9-2-9-6z" fill="var(--muted)" /><circle cx="32" cy="40" r="3" fill="var(--surface-2)" /><circle cx="27.5" cy="30.5" r="3.2" fill="var(--secondary-fill)" stroke="var(--muted)" /><circle cx="36.5" cy="30.5" r="3.2" fill="var(--secondary-fill)" stroke="var(--muted)" /></g>}
      {avatar === 'cinta' && <g><path d="M21 25h22v4H21z" fill="var(--danger-fill)" /><path d="M43 26l6-2-2 5z" fill="var(--danger-fill)" /></g>}
    </svg>
  );
}
