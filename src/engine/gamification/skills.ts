import type { GameState } from '../../lib/store';
import { LESSONS, VOCAB_CONCEPTS, conceptById } from '../../content/curriculum';
import { READINGS, SPEAKING, TRANSMISSIONS, WRITING_TASKS } from '../../content/skills';
import { isPassed, survivorLevel, totalXp } from './progress';

export type Attribute = 'Ingeniería' | 'Recolección' | 'Percepción' | 'Exploración' | 'Fabricación' | 'Comunicación';
export interface SkillNode { id: string; attr: Attribute; tier: 1 | 2 | 3; name: string; desc: string; test: (s: GameState) => boolean; progress?: (s: GameState) => string }

const done = (s: GameState, prefix: string) => Object.entries(s.activities).filter(([k, v]) => k.startsWith(prefix) && v.completedAt).length;
const looted = (s: GameState) => new Set(LESSONS.filter((l) => isPassed(s, l.id)).flatMap((l) => l.vocab)).size;
const consolidated = (s: GameState, pred: (id: string) => boolean) => Object.values(s.cards).filter((c) => c.mastery >= 3 && pred(c.conceptId)).length;
const isVocabCard = (id: string) => id.startsWith('vc-') || conceptById(id)?.kind === 'vocab';

/** Árbol de habilidades: cada perk se gana con dominio real, nunca solo por entrar. */
export const SKILL_TREE: SkillNode[] = [
  { id: 'ing-1', attr: 'Ingeniería', tier: 1, name: 'Planos básicos', desc: 'Supera la sala de pronombres.', test: (s) => isPassed(s, 'pre-a1-u1-l1') },
  { id: 'ing-2', attr: 'Ingeniería', tier: 2, name: 'Constructora de be', desc: 'Domina el verbo TO BE (salas 2 y 3).', test: (s) => isPassed(s, 'pre-a1-u1-l3') },
  { id: 'ing-3', attr: 'Ingeniería', tier: 3, name: 'Estructuras firmes', desc: 'Consolida 15 conceptos de gramática.', test: (s) => consolidated(s, (id) => !isVocabCard(id)) >= 15, progress: (s) => `${consolidated(s, (id) => !isVocabCard(id))}/15` },
  { id: 'rec-1', attr: 'Recolección', tier: 1, name: 'Primer botín', desc: 'Recoge 20 palabras.', test: (s) => looted(s) >= 20, progress: (s) => `${looted(s)}/20` },
  { id: 'rec-2', attr: 'Recolección', tier: 2, name: 'Mochila llena', desc: 'Recoge 80 palabras.', test: (s) => looted(s) >= 80, progress: (s) => `${looted(s)}/80` },
  { id: 'rec-3', attr: 'Recolección', tier: 3, name: 'Memoria de elefante', desc: 'Consolida 20 palabras en Mantenimiento.', test: (s) => consolidated(s, isVocabCard) >= 20, progress: (s) => `${consolidated(s, isVocabCard)}/20` },
  { id: 'per-1', attr: 'Percepción', tier: 1, name: 'Oído atento', desc: 'Entiende una transmisión.', test: (s) => done(s, 'radio:') >= 1 },
  { id: 'per-2', attr: 'Percepción', tier: 2, name: 'Sin subtítulos', desc: 'Entiende 2 transmisiones sin mirar el texto.', test: (s) => Object.entries(s.activities).filter(([k, v]) => k.startsWith('radio:') && v.noTranscript).length >= 2 },
  { id: 'per-3', attr: 'Percepción', tier: 3, name: 'Dueña de la frecuencia', desc: 'Completa todas las transmisiones de tu nivel.', test: (s) => done(s, 'radio:') >= TRANSMISSIONS.length, progress: (s) => `${done(s, 'radio:')}/${TRANSMISSIONS.length}` },
  { id: 'exp-1', attr: 'Exploración', tier: 1, name: 'Lectora', desc: 'Lee y entiende un diario.', test: (s) => done(s, 'lectura:') >= 1 },
  { id: 'exp-2', attr: 'Exploración', tier: 2, name: 'Archivista', desc: 'Entiende todos los diarios de tu nivel.', test: (s) => done(s, 'lectura:') >= READINGS.length, progress: (s) => `${done(s, 'lectura:')}/${READINGS.length}` },
  { id: 'fab-1', attr: 'Fabricación', tier: 1, name: 'Primeras notas', desc: 'Fabrica 3 piezas de escritura sin errores.', test: (s) => done(s, 'escritura:') >= 3, progress: (s) => `${done(s, 'escritura:')}/3` },
  { id: 'fab-2', attr: 'Fabricación', tier: 2, name: 'Ficha completa', desc: 'Fabrica todas las piezas de tu nivel.', test: (s) => done(s, 'escritura:') >= WRITING_TASKS.length, progress: (s) => `${done(s, 'escritura:')}/${WRITING_TASKS.length}` },
  { id: 'com-1', attr: 'Comunicación', tier: 1, name: 'Primera llamada', desc: 'Completa una conversación por walkie.', test: (s) => done(s, 'walkie:') >= 1 },
  { id: 'com-2', attr: 'Comunicación', tier: 2, name: 'Voz del campamento', desc: 'Completa todas las conversaciones de tu nivel.', test: (s) => done(s, 'walkie:') >= SPEAKING.length, progress: (s) => `${done(s, 'walkie:')}/${SPEAKING.length}` },
];

export const ATTRIBUTES: Attribute[] = ['Ingeniería', 'Recolección', 'Percepción', 'Exploración', 'Fabricación', 'Comunicación'];
export const ATTR_SKILL: Record<Attribute, string> = { Ingeniería: 'Grammar', Recolección: 'Vocabulary', Percepción: 'Listening', Exploración: 'Reading', Fabricación: 'Writing', Comunicación: 'Speaking' };

/* ── Cosméticos ── */
export interface Cosmetic { id: string; name: string; unlock: string; test: (s: GameState) => boolean }
const lvl = (s: GameState) => survivorLevel(totalXp(s)).level;
export const AVATARS: Cosmetic[] = [
  { id: 'casco', name: 'Casco de obra', unlock: 'De serie', test: () => true },
  { id: 'gorra', name: 'Gorra de patrulla', unlock: 'Nivel 2 de superviviente', test: (s) => lvl(s) >= 2 },
  { id: 'capucha', name: 'Capucha', unlock: 'Nivel 3', test: (s) => lvl(s) >= 3 },
  { id: 'auriculares', name: 'Auriculares de radio', unlock: 'Trofeo «Oído atento»', test: (s) => SKILL_TREE.find((n) => n.id === 'per-1')!.test(s) },
  { id: 'mascara', name: 'Máscara de gas', unlock: 'Nivel 5', test: (s) => lvl(s) >= 5 },
  { id: 'cinta', name: 'Cinta de exploradora', unlock: 'Vencer al jefe de PRE-A1', test: (s) => !!s.levelExams['PRE_A1']?.passed },
];
export const FRAMES: Cosmetic[] = [
  { id: 'menta', name: 'Menta', unlock: 'De serie', test: () => true },
  { id: 'melocoton', name: 'Melocotón', unlock: 'Nivel 2', test: (s) => lvl(s) >= 2 },
  { id: 'mantequilla', name: 'Mantequilla', unlock: '3 trofeos', test: (s) => Object.keys(s.achievements).length >= 3 },
  { id: 'lavanda', name: 'Lavanda', unlock: 'Curar una infección', test: (s) => !!s.achievements['cure'] },
];
export { VOCAB_CONCEPTS };
