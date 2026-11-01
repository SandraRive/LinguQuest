import type { WritingTask } from '../content/skills';

/**
 * Corrector de escritura guiada (sin IA): reglas de errores típicos de hispanohablantes en PRE-A1.
 * Cada error devuelve texto original, corrección, motivo, regla y un ejemplo extra, como pide el spec.
 * Funciona sin internet y sin IA.
 */
export interface WritingIssue { original: string; correction: string; why: string; rule: string; example: string }

interface Detector { re: RegExp; fix: (s: string) => string; why: string; rule: string; example: string }

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const COUNTRIES = ['spain', 'england', 'france', 'italy', 'mexico', 'germany', 'portugal', 'argentina', 'colombia', 'chile', 'peru', 'london', 'madrid'];
const cap = (w: string) => w.charAt(0).toUpperCase() + w.slice(1);

const VERBS = ['work', 'live', 'like', 'eat', 'drink', 'sleep', 'cook', 'play', 'walk', 'read', 'swim', 'drive', 'run', 'help', 'speak'];
const ES_VERBS: Record<string, string> = { go: 'goes', watch: 'watches', study: 'studies', have: 'has', do: 'does' };
const thirdPerson = (v: string) => ES_VERBS[v] ?? `${v}s`;
const SUBJ3 = '(he|she|it|He|She|It|[Mm]y (?:mother|father|brother|sister|son|daughter|friend|dog)|(?!(?:They|We|You|My)\\b)[A-Z][a-z]+)';

const DETECTORS: Detector[] = [
  { re: new RegExp(`(^|\\.\\s)${SUBJ3} (doesn't|does not) (${[...VERBS, ...Object.keys(ES_VERBS)].map(thirdPerson).join('|')})\\b`), fix: (s) => s.replace(new RegExp(`\\b(doesn't|does not) (${[...VERBS, ...Object.keys(ES_VERBS)].map(thirdPerson).join('|')})\\b`), (_m, neg: string, v: string) => `${neg} ${Object.entries(ES_VERBS).find(([, t]) => t === v)?.[0] ?? v.replace(/s$/, '')}`),
    why: 'Con doesn\'t el verbo va sin -s: la -s ya está en does.', rule: 'doesn\'t + verbo tal cual.', example: "She doesn't work here." },
  { re: new RegExp(`^${SUBJ3} (always |usually |often |sometimes |never )?(${[...VERBS, ...Object.keys(ES_VERBS)].join('|')})\\b`), fix: (s) => s.replace(new RegExp(`^${SUBJ3} (always |usually |often |sometimes |never )?(${[...VERBS, ...Object.keys(ES_VERBS)].join('|')})\\b`), (_m, subj: string, adv: string | undefined, v: string) => `${subj} ${adv ?? ''}${thirdPerson(v)}`),
    why: 'Con he, she, it (o un nombre) el verbo lleva -s en Present Simple.', rule: 'he / she / it + verbo-s (works, goes, studies, has).', example: 'My sister works in a shop.' },
  { re: /\bcan to ([a-z]+)\b/i, fix: (s) => s.replace(/\bcan to ([a-z]+)\b/i, 'can $1'),
    why: 'Después de can no va to.', rule: 'can + verbo tal cual.', example: 'I can swim.' },
  { re: /\b(I|you|we|they) (always |usually |often |sometimes |never )?(gets up|works|lives|studies|goes|has)\b/, fix: (s) => s.replace(/\b(I|you|we|they) (always |usually |often |sometimes |never )?(gets up|works|lives|studies|goes|has)\b/, (_m, subj: string, adv: string | undefined, v: string) => `${subj} ${adv ?? ''}${({ 'gets up': 'get up', studies: 'study', goes: 'go', has: 'have' } as Record<string, string>)[v] ?? v.replace(/s$/, '')}`),
    why: 'La -s es solo para he, she, it.', rule: 'I / you / we / they + verbo sin -s.', example: 'I get up at seven.' },
  { re: /\bin (\d{1,2}|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)( o'clock)?\b/i, fix: (s) => s.replace(/\bin (\d{1,2}|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)( o'clock)?\b/i, 'at $1$2'),
    why: 'Con las horas se usa at.', rule: 'at + hora (at seven).', example: "I get up at seven o'clock." },
  { re: /\bin the night\b/i, fix: (s) => s.replace(/\bin the night\b/i, 'at night'),
    why: 'Se dice at night.', rule: 'at night (excepción).', example: 'We sleep at night.' },
  { re: /\bthere is (two|three|four|five|six|seven|eight|nine|ten|many|some|\d+)\b/i, fix: (s) => s.replace(/\b(there) is (two|three|four|five|six|seven|eight|nine|ten|many|some|\d+)\b/i, (_m, t: string, n: string) => `${t} are ${n}`),
    why: 'Con plural se usa there are.', rule: 'there is + singular · there are + plural.', example: 'There are two trees.' },
  { re: /\bnext (the|my)\b/i, fix: (s) => s.replace(/\bnext (the|my)\b/i, 'next to $1'),
    why: 'next to lleva to.', rule: 'next to = al lado de.', example: 'The bag is next to the bed.' },
  { re: /\bin front (the|my)\b/i, fix: (s) => s.replace(/\bin front (the|my)\b/i, 'in front of $1'),
    why: 'in front of lleva of.', rule: 'in front of = delante de.', example: 'Tom is in front of the door.' },
  { re: /\bi have (\d+|[a-z]+(-[a-z]+)?) years( old)?\b/i, fix: (s) => s.replace(/\bi have (\d+|[a-z]+(?:-[a-z]+)?) years( old)?\b/i, "I'm $1"),
    why: 'La edad no se "tiene" en inglés.', rule: 'Edad = be + número (sala «Me presento por radio»).', example: "She's thirty. / I'm 25." },
  { re: /\bi have (hungry|cold|thirsty)\b/i, fix: (s) => s.replace(/\bi have (hungry|cold|thirsty)\b/i, "I'm $1"),
    why: 'Tener hambre o frío se dice con be.', rule: 'be hungry / be cold.', example: "We're cold." },
  { re: /^(am|is|are)\b/i, fix: (s) => s.replace(/^(am)\b/i, "I'm").replace(/^(is)\b/i, "It's").replace(/^(are)\b/i, "We're"),
    why: 'Falta el sujeto al principio.', rule: 'En inglés el sujeto es obligatorio.', example: "It's cold. (no: Is cold.)" },
  { re: /(^|\s)i(\s|'|$)/, fix: (s) => s.replace(/(^|\s)i(?=\s|'|$)/g, '$1I'),
    why: '"I" (yo) va siempre en mayúscula.', rule: 'Mayúscula en I.', example: 'Ana and I are here.' },
  { re: /\b(he|she|it) are\b/i, fix: (s) => s.replace(/\b(he|she|it) are\b/i, '$1 is'),
    why: 'He, she e it van con is.', rule: 'Caja IS: he, she, it.', example: 'She is safe.' },
  { re: /\b(we|you|they) is\b/i, fix: (s) => s.replace(/\b(we|you|they) is\b/i, '$1 are'),
    why: 'You, we y they van con are.', rule: 'Caja ARE: you, we, they.', example: 'They are here.' },
  { re: /\bi is\b|\bi are\b/i, fix: (s) => s.replace(/\bi (is|are)\b/i, 'I am'),
    why: 'I va con am.', rule: 'Caja AM: solo I.', example: "I am tired. / I'm tired." },
  { re: /\ba (?=[aeiou])/i, fix: (s) => s.replace(/\ba (?=[aeiou])/i, 'an '),
    why: 'Delante de sonido de vocal se usa an.', rule: 'a / an según el sonido.', example: 'an egg, an orange box' },
  { re: /\ban (?=[bcdfgjklmnpqrstvwxyz])/i, fix: (s) => s.replace(/\ban (?=[bcdfgjklmnpqrstvwxyz])/i, 'a '),
    why: 'Delante de sonido de consonante se usa a.', rule: 'a / an según el sonido.', example: 'a red bag, a map' },
  { re: /\bfrom spanish\b/i, fix: (s) => s.replace(/\bfrom spanish\b/i, 'from Spain'),
    why: 'Después de from va el país, no la nacionalidad.', rule: "I'm from Spain = soy de España · I'm Spanish = soy español/a.", example: "I'm from Spain. I'm Spanish." },
  { re: new RegExp(`\\bfrom (${COUNTRIES.join('|')})\\b`), fix: (s) => s.replace(new RegExp(`\\bfrom (${COUNTRIES.join('|')})\\b`), (_m, c: string) => `from ${cap(c)}`),
    why: 'Los países y ciudades van con mayúscula.', rule: 'Mayúscula en nombres propios.', example: "I'm from Madrid, in Spain." },
  { re: new RegExp(`\\b(${DAYS.join('|')})\\b`), fix: (s) => s.replace(new RegExp(`\\b(${DAYS.join('|')})\\b`, 'g'), (d) => cap(d)),
    why: 'Los días de la semana van con mayúscula.', rule: 'Monday, Tuesday… siempre con mayúscula.', example: "It's Friday today." },
  { re: /\bin (monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i, fix: (s) => s.replace(/\bin ((?:mon|tues|wednes|thurs|fri|satur|sun)day)\b/i, 'on $1'),
    why: 'Con los días se usa on.', rule: 'on + día · in + mes.', example: 'on Monday, in May' },
  { re: /\bspanish\b/, fix: (s) => s.replace(/\bspanish\b/g, 'Spanish'),
    why: 'Las nacionalidades van con mayúscula.', rule: 'Spanish, English…', example: 'She is Spanish.' },
  { re: /\bmy name's is\b/i, fix: (s) => s.replace(/\bmy name's is\b/i, 'My name is'),
    why: "name's ya incluye is.", rule: "My name is… o My name's…", example: "My name's Kate." },
  { re: /\b(red|blue|green|yellow|black|white|orange|grey|gray|brown|pink)s\b/i, fix: (s) => s.replace(/\b(red|blue|green|yellow|black|white|orange|grey|gray|brown|pink)s\b/i, '$1'),
    why: 'Los adjetivos (colores) no llevan plural.', rule: 'Adjetivos sin -s.', example: 'two red bags' },
  { re: /\b(bag|bottle|box|key|map|phone|torch|flashlight|chair|table|door|bed|knife) (red|blue|green|yellow|black|white|orange|grey|gray|brown|pink)\b/i,
    fix: (s) => s.replace(/\b(bag|bottle|box|key|map|phone|torch|flashlight|chair|table|door|bed|knife) (red|blue|green|yellow|black|white|orange|grey|gray|brown|pink)\b/i, '$2 $1'),
    why: 'El color va antes del objeto.', rule: 'Adjetivo + sustantivo.', example: 'a green door' },
];

const tidy = (s: string) => s.trim().replace(/\s+/g, ' ').replace(/[.!]+$/, '');

export function checkWriting(task: WritingTask, raw: string): { ok: boolean; issues: WritingIssue[]; corrected: string } {
  const original = tidy(raw);
  let corrected = original;
  const issues: WritingIssue[] = [];
  for (const d of DETECTORS) {
    if (d.re.test(corrected)) {
      const next = d.fix(corrected);
      if (next !== corrected) {
        issues.push({ original: corrected, correction: next, why: d.why, rule: d.rule, example: d.example });
        corrected = next;
      }
    }
  }
  const accept = new RegExp(task.accept, task.acceptFlags ?? '');
  const ok = issues.length === 0 && accept.test(original);
  return { ok, issues, corrected };
}
