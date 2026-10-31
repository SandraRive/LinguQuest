import type { ErrorTag, Exercise } from './schema';

/** Atajos para escribir ejercicios sin repetir tanto. `x` = explicación de la respuesta. */
type T = ErrorTag[];
export const ch = (id: string, instruction: string, prompt: string, options: string[], answer: number, explain: string, tags: T = [], hint?: string): Exercise =>
  ({ id, type: 'choice', instruction, prompt, options, answer, explain, tags, hint });
export const tr = (id: string, es: string, answers: string[], explain: string, tags: T = [], hint?: string): Exercise =>
  ({ id, type: 'translate', instruction: 'Escribe en inglés', es, answers, explain, tags, hint });
export const fl = (id: string, instruction: string, before: string, after: string, answers: string[], explain: string, tags: T = [], es?: string, hint?: string): Exercise =>
  ({ id, type: 'fill', instruction, before, after, answers, explain, tags, es, hint });
export const or = (id: string, tokens: string[], answers: string[], es: string, explain: string, tags: T = ['word-order'], hint?: string): Exercise =>
  ({ id, type: 'order', instruction: 'Ordena las palabras', tokens, answers, es, explain, tags, hint });
export const bd = (id: string, tokens: string[], answers: string[], es: string, explain: string, tags: T = ['word-order']): Exercise =>
  ({ id, type: 'build', instruction: 'Construye la frase (sobran palabras)', tokens, answers, es, explain, tags });
export const sp = (id: string, instruction: string, tokens: string[], wrong: number, explain: string, tags: T = []): Exercise =>
  ({ id, type: 'spot', instruction, tokens, wrong, explain, tags });
export const fx = (id: string, wrongSentence: string, answers: string[], explain: string, tags: T = [], instruction = 'Corrige la frase'): Exercise =>
  ({ id, type: 'fix', instruction, wrongSentence, answers, explain, tags });
export const mt = (id: string, pairs: [string, string][], explain: string, tags: T = [], instruction = 'Une cada palabra con su pareja'): Exercise =>
  ({ id, type: 'match', instruction, pairs, explain, tags });
export const ls = (id: string, say: string, options: string[], answer: number, explain: string, tags: T = [], instruction = 'Escucha y elige lo que oyes', accent?: 'en-GB' | 'en-US'): Exercise =>
  ({ id, type: 'listen', instruction, say, options, answer, explain, tags, accent });
