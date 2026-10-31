import { useGame, type GameState } from './store';

/**
 * Traspaso de progreso entre dispositivos sin internet.
 * El progreso se compacta, se comprime (deflate) y se parte en trozos que caben en códigos QR.
 * Formato de cada trozo: EQ1:<id>:<n.º>/<total>:<datos>
 */
const PREFIX = 'EQ1';
const CHUNK = 600;            // caracteres por código QR (versión ~16: fácil de leer con la cámara del móvil)
const BACKUP_KEY = 'english-quest-backup';

export function currentData(): GameState {
  const st = useGame.getState();
  return {
    settings: st.settings, lessons: st.lessons, hordes: st.hordes, cards: st.cards, errors: st.errors, days: st.days, xp: st.xp,
    builtSentences: st.builtSentences, achievements: st.achievements, claimed: st.claimed, lastLessonId: st.lastLessonId,
    activities: st.activities, levelExams: st.levelExams, cosmetics: st.cosmetics,
  };
}

/** Reduce el tamaño sin perder información útil: agrupa la XP por día y origen y redondea los números de FSRS. */
function compact(d: GameState): GameState {
  const xp = new Map<string, { source: string; amount: number; at: string }>();
  for (const e of d.xp) {
    const day = e.at.slice(0, 10);
    const k = `${day}|${e.source}`;
    const cur = xp.get(k);
    if (cur) cur.amount += e.amount; else xp.set(k, { source: e.source, amount: e.amount, at: `${day}T12:00:00.000Z` });
  }
  const r2 = (n: number) => Math.round(n * 100) / 100;
  const cards = Object.fromEntries(Object.entries(d.cards).map(([k, c]) => [k, { ...c, stability: r2(c.stability), difficulty: r2(c.difficulty) }]));
  return { ...d, xp: [...xp.values()], cards };
}

const toB64 = (bytes: Uint8Array) => {
  let s = '';
  bytes.forEach((b) => { s += String.fromCharCode(b); });
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
const fromB64 = (s: string) => {
  const b = atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4));
  return Uint8Array.from(b, (c) => c.charCodeAt(0));
};

async function pipe(bytes: Uint8Array, stream: CompressionStream | DecompressionStream): Promise<Uint8Array> {
  const out = new Blob([bytes]).stream().pipeThrough(stream);
  return new Uint8Array(await new Response(out).arrayBuffer());
}

function hash(s: string) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h.toString(36).slice(0, 5);
}

export const compressionAvailable = () => typeof CompressionStream !== 'undefined' && typeof DecompressionStream !== 'undefined';

export async function encodeProgress(d: GameState = currentData()): Promise<string> {
  const json = JSON.stringify({ v: 1, d: compact(d) });
  return toB64(await pipe(new TextEncoder().encode(json), new CompressionStream('deflate-raw')));
}

/** Parte el progreso en códigos. */
export function toChunks(payload: string, size = CHUNK): string[] {
  const id = hash(payload);
  const n = Math.max(1, Math.ceil(payload.length / size));
  return Array.from({ length: n }, (_, i) => `${PREFIX}:${id}:${i + 1}/${n}:${payload.slice(i * size, (i + 1) * size)}`);
}

export interface Chunk { id: string; index: number; total: number; data: string }
export function parseChunk(raw: string): Chunk | null {
  const m = /^EQ1:([a-z0-9]{1,6}):(\d+)\/(\d+):([A-Za-z0-9_-]*)$/.exec(raw.trim());
  if (!m) return null;
  const index = Number(m[2]), total = Number(m[3]);
  if (!index || !total || index > total || total > 200) return null;
  return { id: m[1]!, index, total, data: m[4]! };
}

/** Une los trozos, comprueba que no falte ninguno ni esté corrupto y devuelve el progreso. */
export async function decodeChunks(chunks: Chunk[]): Promise<GameState> {
  const first = chunks[0];
  if (!first) throw new Error('No hay códigos.');
  const sorted = [...chunks].sort((a, b) => a.index - b.index);
  if (sorted.length !== first.total || sorted.some((c, i) => c.index !== i + 1 || c.id !== first.id)) throw new Error('Faltan códigos o son de traspasos distintos.');
  const payload = sorted.map((c) => c.data).join('');
  if (hash(payload) !== first.id) throw new Error('Los códigos no coinciden. Vuelve a generarlos y escanéalos de nuevo.');
  let parsed: unknown;
  try {
    const bytes = await pipe(fromB64(payload), new DecompressionStream('deflate-raw'));
    parsed = JSON.parse(new TextDecoder().decode(bytes));
  } catch { throw new Error('No se ha podido leer el progreso. Vuelve a escanear los códigos.'); }
  const p = parsed as { v?: number; d?: Partial<GameState> };
  if (p.v !== 1 || !p.d || typeof p.d.lessons !== 'object' || typeof p.d.cards !== 'object' || !Array.isArray(p.d.xp)) throw new Error('Estos códigos no son de LinguQuest o son de otra versión.');
  return p.d as GameState;
}

/** Texto único (para copiar y pegar si no hay cámara). */
export async function encodeAsText(): Promise<string> {
  const payload = await encodeProgress();
  return toChunks(payload, payload.length + 1)[0]!;
}

export interface Summary { lessons: number; xp: number; cards: number; trophies: number; lastDay: string | null }
export function summarize(d: GameState): Summary {
  const days = Object.entries(d.days ?? {}).filter(([, v]) => v.exercises + v.reviews > 0).map(([k]) => k).sort();
  return {
    lessons: Object.values(d.lessons ?? {}).filter((l) => l.status === 'passed').length,
    xp: (d.xp ?? []).reduce((n, e) => n + e.amount, 0),
    cards: Object.keys(d.cards ?? {}).length,
    trophies: Object.keys(d.achievements ?? {}).length,
    lastDay: days.at(-1) ?? null,
  };
}

/** Reemplaza el progreso guardando antes una copia para poder deshacer. */
export function applyIncoming(d: GameState) {
  try { localStorage.setItem(BACKUP_KEY, JSON.stringify({ at: new Date().toISOString(), data: currentData() })); } catch { /* sin almacenamiento */ }
  useGame.getState().replaceAll({ ...d, settings: { ...useGame.getState().settings, ...d.settings } });
}

export function readBackup(): { at: string; data: GameState } | null {
  try { const raw = localStorage.getItem(BACKUP_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
export function restoreBackup(): boolean {
  const b = readBackup();
  if (!b) return false;
  useGame.getState().replaceAll(b.data);
  try { localStorage.removeItem(BACKUP_KEY); } catch { /* sin almacenamiento */ }
  return true;
}
