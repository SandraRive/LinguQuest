import { useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useGame } from '../lib/store';
import { speak, speechAvailable } from '../lib/speech';

type Variant = 'primary' | 'ghost' | 'quiet' | 'danger';
export function Button({ variant = 'primary', className = '', ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-bold transition-[filter,background-color] shadow-none disabled:opacity-45 disabled:cursor-not-allowed min-h-11';
  const styles: Record<Variant, string> = {
    primary: 'bg-primary-fill text-ink hover:brightness-105',
    ghost: 'border border-line bg-surface text-text hover:bg-surface-2',
    quiet: 'text-secondary hover:underline px-2',
    danger: 'bg-danger-fill text-ink hover:brightness-105',
  };
  return <button className={`${base} ${styles[variant]} ${className}`} {...p} />;
}

export function LinkButton({ href, children, variant = 'primary', className = '' }: { href: string; children: ReactNode; variant?: Variant; className?: string }) {
  const styles: Record<Variant, string> = {
    primary: 'bg-primary-fill text-ink hover:brightness-105',
    ghost: 'border border-line bg-surface text-text hover:bg-surface-2',
    quiet: 'text-secondary hover:underline px-2',
    danger: 'bg-danger-fill text-ink',
  };
  return <a href={href} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-bold min-h-11 no-underline ${styles[variant]} ${className}`}>{children}</a>;
}

export function Plate({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`plate p-5 sm:p-6 ${className}`}>{children}</section>;
}

/** Barra tipo "vida/resistencia". */
export function Bar({ value, max = 100, tone = 'primary', label }: { value: number; max?: number; tone?: 'primary' | 'secondary' | 'accent' | 'success' | 'infection'; label: string }) {
  const pct = Math.max(0, Math.min(100, (value / (max || 1)) * 100));
  const color = { primary: 'bg-primary-fill', secondary: 'bg-secondary-fill', accent: 'bg-accent-fill', success: 'bg-success-fill', infection: 'bg-infection-fill' }[tone];
  return (
    <div role="progressbar" aria-label={label} aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} className="h-3 w-full rounded-full bg-surface-2 overflow-hidden">
      <div className={`h-full ${color} transition-[width] duration-500`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Chip({ children, tone = 'muted' }: { children: ReactNode; tone?: 'muted' | 'success' | 'danger' | 'accent' | 'infection' | 'secondary' }) {
  const c = { muted: 'text-muted border-line bg-surface-2', success: 'text-ink border-transparent bg-success-fill', danger: 'text-ink border-transparent bg-danger-fill', accent: 'text-ink border-transparent bg-accent-fill', infection: 'text-ink border-transparent bg-infection-fill', secondary: 'text-ink border-transparent bg-secondary-fill' }[tone];
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${c}`}>{children}</span>;
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="mb-6 flex flex-col gap-2">
      <p className="label">{eyebrow}</p>
      <h1 className="font-display text-3xl sm:text-4xl leading-tight text-text">{title}</h1>
      {children && <div className="text-muted max-w-[62ch]">{children}</div>}
    </header>
  );
}

/** Botón de audio con la voz del navegador. */
export function Speak({ text, small = false }: { text: string; small?: boolean }) {
  const { accent, speechRate } = useGame((s) => s.settings);
  const [msg, setMsg] = useState('');
  if (!speechAvailable()) return null;
  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={() => { const r = speak(text, accent, speechRate); setMsg(r === 'no-voice' ? 'Sin voz inglesa en este dispositivo' : ''); }}
        className={`inline-flex items-center justify-center rounded-full border bg-secondary-fill text-ink hover:brightness-105 ${small ? 'h-8 w-8' : 'h-10 w-10'}`}
        aria-label={`Escuchar: ${text}`}
        title="Escuchar"
      >
        <svg viewBox="0 0 24 24" width={small ? 16 : 18} height={small ? 16 : 18} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" /></svg>
      </button>
      {msg && <span className="text-xs text-muted">{msg}</span>}
    </span>
  );
}

export function Toasts() {
  const toasts = useGame((s) => s.toasts);
  const dismiss = useGame((s) => s.dismissToast);
  useEffect(() => {
    if (!toasts.length) return;
    const t = window.setTimeout(() => dismiss(toasts[0]!.id), 2600);
    return () => window.clearTimeout(t);
  }, [toasts, dismiss]);
  return (
    <div aria-live="polite" className="fixed z-40 flex flex-col gap-2" style={{ right: 'max(16px, env(safe-area-inset-right, 0px))', bottom: 'calc(84px + env(safe-area-inset-bottom, 0px))' }}>
      {toasts.map((t) => (
        <div key={t.id} className={`pop rounded-xl border px-4 py-2 font-bold shadow-lg bg-surface ${t.kind === 'trophy' ? 'border-accent text-accent' : t.kind === 'xp' ? 'border-primary text-text' : 'border-line text-text'}`}>
          <span className="num">{t.text}</span>
        </div>
      ))}
    </div>
  );
}
