/**
 * Audio con la voz del propio navegador (Web Speech API, speechSynthesis).
 * Es TTS real, sin servidor. La calidad depende del sistema; si no hay voz inglesa, se avisa.
 * En la Fase 3 se sustituye por audios generados con un servicio TTS y guardados en Storage.
 */
export function speechAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function pickVoice(lang: string): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  return voices.find((v) => v.lang === lang) ?? voices.find((v) => v.lang.replace('_', '-').startsWith(lang)) ?? voices.find((v) => v.lang.startsWith('en'));
}

export function hasEnglishVoice(): boolean {
  if (!speechAvailable()) return false;
  return window.speechSynthesis.getVoices().some((v) => v.lang.startsWith('en'));
}

export function speak(text: string, lang: 'en-GB' | 'en-US', rate: number): 'ok' | 'no-speech' | 'no-voice' {
  if (!speechAvailable()) return 'no-speech';
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/→/g, ','));
  const voice = pickVoice(lang);
  u.lang = lang;
  if (voice) u.voice = voice;
  u.rate = rate;
  synth.speak(u);
  return voice || synth.getVoices().length === 0 ? 'ok' : 'no-voice';
}

/** Lee varias frases seguidas y avisa de cuál suena (para resaltar el texto sincronizado). */
export function speakLines(lines: string[], lang: 'en-GB' | 'en-US', rate: number, onLine: (i: number) => void, onDone: () => void): () => void {
  if (!speechAvailable()) { onDone(); return () => {}; }
  const synth = window.speechSynthesis;
  synth.cancel();
  let cancelled = false;
  const voice = pickVoice(lang);
  lines.forEach((text, i) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang; if (voice) u.voice = voice; u.rate = rate;
    u.onstart = () => { if (!cancelled) onLine(i); };
    if (i === lines.length - 1) u.onend = () => { if (!cancelled) onDone(); };
    synth.speak(u);
  });
  return () => { cancelled = true; synth.cancel(); onDone(); };
}

/* ── Reconocimiento de voz (Speech-to-Text del navegador) ── */
type Rec = { lang: string; interimResults: boolean; maxAlternatives: number; start: () => void; stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null; onend: (() => void) | null };

export function recognitionAvailable(): boolean {
  const w = window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown };
  return !!(w.SpeechRecognition || w.webkitSpeechRecognition);
}

/** Escucha una frase. Devuelve el texto reconocido o un código de error ('not-allowed', 'no-speech'…). */
export function listenOnce(lang: 'en-GB' | 'en-US'): Promise<{ text: string } | { error: string }> {
  return new Promise((resolve) => {
    const w = window as unknown as { SpeechRecognition?: new () => Rec; webkitSpeechRecognition?: new () => Rec };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) { resolve({ error: 'unsupported' }); return; }
    const rec = new Ctor();
    let done = false;
    rec.lang = lang; rec.interimResults = false; rec.maxAlternatives = 1;
    rec.onresult = (e) => { done = true; resolve({ text: e.results[0]?.[0]?.transcript ?? '' }); };
    rec.onerror = (e) => { if (!done) { done = true; resolve({ error: e.error }); } };
    rec.onend = () => { if (!done) { done = true; resolve({ error: 'no-speech' }); } };
    try { rec.start(); } catch { resolve({ error: 'not-allowed' }); }
  });
}
