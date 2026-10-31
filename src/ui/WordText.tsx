import { useState } from 'react';
import { VOCAB } from '../content/curriculum';
import type { VocabItem } from '../content/schema';
import { Speak } from './kit';

/** Índice palabra → entrada del manual (incluye variantes UK/US y plurales irregulares). */
const INDEX = new Map<string, VocabItem>();
for (const v of VOCAB) {
  for (const form of v.en.toLowerCase().split('/').map((x) => x.trim())) INDEX.set(form, v);
  v.answers?.forEach((a) => INDEX.set(a.toLowerCase(), v));
}
const IRREGULAR: Record<string, string> = { men: 'man', women: 'woman', children: 'child', knives: 'knife', parents: 'parents', people: 'people', am: 'be', is: 'be', are: 'be', "isn't": 'be', "aren't": 'be' };

export function lookup(token: string): VocabItem | undefined {
  let w = token.toLowerCase().replace(/[^a-z'-]/g, '');
  if (!w) return undefined;
  if (IRREGULAR[w]) w = IRREGULAR[w]!;
  const base = w.replace(/'(m|s|re|ll|ve|d)$/, '');
  return INDEX.get(w) ?? INDEX.get(base) ?? INDEX.get(base.replace(/es$/, '')) ?? INDEX.get(base.replace(/s$/, '')) ??
    (base === 'i' ? INDEX.get('i') : undefined);
}

/** Texto con palabras tocables: muestra la entrada del diccionario en contexto. */
export function WordText({ text, className = '' }: { text: string; className?: string }) {
  const [open, setOpen] = useState<VocabItem | null>(null);
  const tokens = text.split(/(\s+)/);
  return (
    <span className={className}>
      {tokens.map((t, i) => {
        if (/^\s+$/.test(t)) return t;
        const v = lookup(t);
        if (!v) return <span key={i}>{t}</span>;
        return (
          <button key={i} type="button" onClick={() => setOpen(open?.id === v.id ? null : v)}
            className={`rounded px-0.5 underline decoration-dotted decoration-secondary underline-offset-4 hover:bg-secondary-tint ${open?.id === v.id ? 'bg-secondary-tint' : ''}`}>{t}</button>
        );
      })}
      {open && (
        <span className="pop mt-2 flex items-start gap-3 rounded-xl bg-surface-2 p-3 text-base font-normal" role="note">
          <Speak text={open.en.split('/')[0]!.trim()} small />
          <span className="flex flex-col">
            <b>{open.en} <span className="font-normal text-muted">· {open.pos}</span></b>
            <span className="text-primary font-bold">{open.es}</span>
            <span className="text-xs text-muted num">{open.ipa} · suena «{open.hint}»</span>
          </span>
        </span>
      )}
    </span>
  );
}
