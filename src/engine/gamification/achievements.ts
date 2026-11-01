import type { GameState } from '../../lib/store';

export interface Achievement { id: string; name: string; desc: string; icon: string; test: (s: GameState) => boolean }

const passedCount = (s: GameState) => Object.values(s.lessons).filter((l) => l.status === 'passed').length;
const reviewCount = (s: GameState) => Object.values(s.days).reduce((n, d) => n + d.reviews, 0);
const studyDays = (s: GameState) => Object.values(s.days).filter((d) => d.exercises + d.reviews > 0).length;

/** Trofeos: premian hacer cosas, nunca castigan no hacerlas. */
export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-room', name: 'Ingeniera novata', desc: 'Supera tu primera sala del Taller.', icon: '⚙', test: (s) => passedCount(s) >= 1 },
  { id: 'first-steps', name: 'First Steps', desc: 'Completa el encargo «Primer contacto por radio».', icon: '★', test: (s) => !!s.claimed['story-first-contact'] },
  { id: 'first-wall', name: 'Primer muro reparado', desc: 'Haz tu primer repaso.', icon: '▣', test: (s) => reviewCount(s) >= 1 },
  { id: 'walls-50', name: 'Albañil del apocalipsis', desc: 'Haz 50 repasos.', icon: '▦', test: (s) => reviewCount(s) >= 50 },
  { id: 'days-3', name: 'Tres días sobrevividos', desc: 'Estudia en 3 días distintos (no hace falta que sean seguidos).', icon: '☾', test: (s) => studyDays(s) >= 3 },
  { id: 'days-7', name: 'Una semana en pie', desc: 'Estudia en 7 días distintos.', icon: '☀', test: (s) => studyDays(s) >= 7 },
  { id: 'cure', name: 'Antídoto', desc: 'Cura una infección (un error que se repetía).', icon: '✚', test: (s) => Object.values(s.errors).some((e) => (e?.cured ?? 0) > 0) },
  { id: 'horde-1', name: 'Sobreviviste a la primera noche', desc: 'Supera la Horda de la Primera Noche.', icon: '⚔', test: (s) => !!s.hordes['pre-a1-u1']?.passed },
  { id: 'builder-10', name: 'Constructora de frases', desc: 'Construye 10 frases correctas.', icon: '⌂', test: (s) => s.builtSentences >= 10 },
  { id: 'radio-1', name: 'Señal recibida', desc: 'Entiende tu primera transmisión de radio.', icon: '≋', test: (s) => Object.keys(s.activities).some((k) => k.startsWith('radio:') && s.activities[k]?.completedAt) },
  { id: 'read-1', name: 'Rata de biblioteca', desc: 'Entiende tu primer diario encontrado.', icon: '❏', test: (s) => Object.keys(s.activities).some((k) => k.startsWith('lectura:') && s.activities[k]?.completedAt) },
  { id: 'write-1', name: 'Primera pieza', desc: 'Escribe una frase sin errores en el Banco de fabricación.', icon: '✎', test: (s) => Object.keys(s.activities).some((k) => k.startsWith('escritura:') && s.activities[k]?.completedAt) },
  { id: 'talk-1', name: 'Al habla', desc: 'Completa una conversación por walkie-talkie.', icon: '◉', test: (s) => Object.keys(s.activities).some((k) => k.startsWith('walkie:') && s.activities[k]?.completedAt) },
  { id: 'hordes-all', name: 'Refugio asegurado', desc: 'Supera las 4 hordas de PRE-A1.', icon: '⛨', test: (s) => ['pre-a1-u1', 'pre-a1-u2', 'pre-a1-u3', 'pre-a1-u4'].every((u) => s.hordes[u]?.passed) },
  { id: 'boss-pre-a1', name: 'Fin de la primera noche', desc: 'Vence al jefe final de PRE-A1.', icon: '♛', test: (s) => !!s.levelExams['PRE_A1']?.passed },
  { id: 'forest-in', name: 'Bienvenida al bosque', desc: 'Supera tu primera sala de A1.', icon: '♣', test: (s) => s.lessons['a1-u1-l17']?.status === 'passed' },
  { id: 'hordes-a1', name: 'Bosque asegurado', desc: 'Supera las 3 hordas de A1.', icon: '⛨', test: (s) => ['a1-u1', 'a1-u2', 'a1-u3'].every((u) => s.hordes[u]?.passed) },
  { id: 'boss-a1', name: 'Leñador derribado', desc: 'Vence al jefe final de A1.', icon: '♚', test: (s) => !!s.levelExams['A1']?.passed },
];
