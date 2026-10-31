import type { Exercise } from '../../content/schema';

/** Normaliza una respuesta libre: minúsculas, apóstrofos rectos, sin puntuación ni espacios extra. */
export function normalize(s: string): string {
  return s
    .replace(/[‘’ʼ`´]/g, "'")
    .toLowerCase()
    .replace(/[.,!?¿¡;:"—–-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function matchesAny(input: string, answers: string[]): boolean {
  const n = normalize(input);
  return n.length > 0 && answers.some((a) => normalize(a) === n);
}

export type Answer =
  | { type: 'choice'; index: number }
  | { type: 'text'; value: string }
  | { type: 'tokens'; value: string[] }
  | { type: 'spot'; index: number }
  | { type: 'match'; pairs: [string, string][] };

export function checkAnswer(ex: Exercise, a: Answer): boolean {
  switch (ex.type) {
    case 'choice':
    case 'listen':
      return a.type === 'choice' && a.index === ex.answer;
    case 'fill':
    case 'translate':
    case 'fix':
      return a.type === 'text' && matchesAny(a.value, ex.answers);
    case 'order':
    case 'build':
      return a.type === 'tokens' && matchesAny(a.value.join(' '), ex.answers);
    case 'spot':
      return a.type === 'spot' && a.index === ex.wrong;
    case 'match':
      return (
        a.type === 'match' &&
        a.pairs.length === ex.pairs.length &&
        a.pairs.every(([l, r]) => ex.pairs.some(([pl, pr]) => pl === l && pr === r))
      );
  }
}

/** Texto de la respuesta correcta para mostrarla tras un fallo. */
export function correctText(ex: Exercise): string {
  switch (ex.type) {
    case 'choice':
    case 'listen': return ex.options[ex.answer] ?? '';
    case 'fill': return `${ex.before} ${ex.answers[0]} ${ex.after}`.replace(/\s+([.?!])/g, '$1');
    case 'translate':
    case 'fix':
    case 'order':
    case 'build': return ex.answers[0] ?? '';
    case 'spot': return `"${ex.tokens[ex.wrong]}" es lo incorrecto`;
    case 'match': return ex.pairs.map(([a, b]) => `${a} = ${b}`).join(' · ');
  }
}

/** Baraja determinista (para que el orden de fichas no cambie al re-renderizar). */
export function shuffled<T>(arr: T[], seed: string): T[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822519) >>> 0;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j] as T, out[i] as T];
  }
  return out;
}
