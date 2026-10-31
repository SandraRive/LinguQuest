import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import type { GameState } from '../../lib/store';
import {
  applyIncoming, compressionAvailable, currentData, decodeChunks, encodeAsText, encodeProgress, parseChunk,
  readBackup, restoreBackup, summarize, toChunks, type Chunk, type Summary,
} from '../../lib/transfer';
import { Button, Chip, Plate } from '../../ui/kit';

type View = 'menu' | 'send' | 'receive' | 'review' | 'text-send' | 'text-receive';

const QrIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3M21 14v.01M14 21h3M20 17v4" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="2.5" /><path d="M11 18h2" /></svg>
);

/** Sección de la Ficha: pasar el progreso a otro dispositivo con códigos QR (sin internet). */
export function TransferSection() {
  const [view, setView] = useState<View>('menu');
  const [incoming, setIncoming] = useState<GameState | null>(null);
  const [done, setDone] = useState('');
  const [backup, setBackup] = useState(readBackup());

  if (!compressionAvailable()) return (
    <Plate>
      <h2 className="font-display text-xl">Pasar a otro dispositivo</h2>
      <p className="mt-2 text-muted">Este navegador es demasiado antiguo para el traspaso. Actualízalo o usa Chrome, Edge, Firefox o Safari recientes.</p>
    </Plate>
  );

  const received = (d: GameState) => { setIncoming(d); setView('review'); };

  return (
    <Plate className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <h2 className="flex items-center gap-2 font-display text-xl"><QrIcon /> Pasar a otro dispositivo</h2>
        <Chip tone="secondary">Sin internet</Chip>
      </div>

      {view === 'menu' && (
        <>
          <p className="text-muted">Cada dispositivo guarda su propio progreso. Para pasarlo, por ejemplo del ordenador al móvil, enseña los códigos en uno y escanéalos con la cámara del otro. Tarda unos segundos.</p>
          {done && <p className="rounded-xl bg-success-tint p-3 font-bold text-success" role="status">{done}</p>}
          <div className="grid gap-3 sm:grid-cols-2">
            <OptionButton icon={<QrIcon />} title="Enviar desde aquí" sub="Muestra los códigos con todo tu progreso" onClick={() => { setDone(''); setView('send'); }} />
            <OptionButton icon={<PhoneIcon />} title="Recibir aquí" sub="Abre la cámara y escanea los códigos" onClick={() => { setDone(''); setView('receive'); }} />
          </div>
          <p className="text-sm text-muted">Al recibir, te enseño un resumen antes de cambiar nada, y guardo lo que había por si quieres volver atrás.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <button className="font-bold text-secondary hover:underline" onClick={() => setView('text-send')}>Sin cámara: copiar el progreso como texto</button>
            <button className="font-bold text-secondary hover:underline" onClick={() => setView('text-receive')}>Pegar un progreso copiado</button>
          </div>
          {backup && (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-surface-2 p-3 text-sm">
              <span>Tienes guardado el progreso anterior al último traspaso ({new Date(backup.at).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}).</span>
              <Button variant="ghost" onClick={() => { restoreBackup(); setBackup(null); setDone('Has vuelto al progreso anterior.'); }}>Deshacer el traspaso</Button>
            </div>
          )}
        </>
      )}

      {view === 'send' && <Sender onBack={() => setView('menu')} />}
      {view === 'receive' && <Receiver onBack={() => setView('menu')} onDone={received} onUseText={() => setView('text-receive')} />}
      {view === 'text-send' && <TextSender onBack={() => setView('menu')} />}
      {view === 'text-receive' && <TextReceiver onBack={() => setView('menu')} onDone={received} />}
      {view === 'review' && incoming && (
        <Review incoming={incoming}
          onCancel={() => { setIncoming(null); setView('menu'); }}
          onConfirm={() => { applyIncoming(incoming); setIncoming(null); setBackup(readBackup()); setDone('Progreso recibido. Ya puedes seguir donde lo dejaste.'); setView('menu'); }} />
      )}
    </Plate>
  );
}

function OptionButton({ icon, title, sub, onClick }: { icon: React.ReactNode; title: string; sub: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-3 rounded-2xl border border-line bg-surface-2 p-4 text-left hover:border-secondary">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-fill text-ink">{icon}</span>
      <span><b className="block">{title}</b><span className="text-sm text-muted">{sub}</span></span>
    </button>
  );
}

/* ── Enviar: códigos QR que van pasando solos ── */
function Sender({ onBack }: { onBack: () => void }) {
  const [codes, setCodes] = useState<string[]>([]);
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [err, setErr] = useState('');
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const chunks = toChunks(await encodeProgress());
        const urls = await Promise.all(chunks.map((c) => QRCode.toDataURL(c, { errorCorrectionLevel: 'L', margin: 4, scale: 8, color: { dark: '#1f2a24', light: '#ffffff' } })));
        if (alive) setCodes(urls);
      } catch { if (alive) setErr('No se han podido generar los códigos.'); }
    })();
    return () => { alive = false; };
  }, []);
  useEffect(() => {
    if (!auto || codes.length < 2) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % codes.length), 1400);
    return () => window.clearInterval(t);
  }, [auto, codes.length]);

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="self-stretch text-muted">En el otro dispositivo, abre LinguQuest → Ficha → «Recibir aquí» y apunta la cámara a la pantalla. {codes.length > 1 ? 'Los códigos van cambiando solos: deja la cámara quieta hasta que se lean todos.' : ''}</p>
      {err && <p className="text-danger">{err}</p>}
      {!codes.length && !err && <p className="text-muted">Preparando códigos…</p>}
      {codes[i] && (
        <div className="rounded-2xl bg-white p-3 shadow-[var(--shadow)]">
          <img src={codes[i]} alt={`Código ${i + 1} de ${codes.length}`} className="h-auto w-[min(78vw,320px)]" style={{ imageRendering: 'pixelated' }} />
        </div>
      )}
      {codes.length > 0 && (
        <>
          <p className="num font-bold" aria-live="polite">Código {i + 1} de {codes.length}</p>
          {codes.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="ghost" onClick={() => { setAuto(false); setI((i - 1 + codes.length) % codes.length); }}>Anterior</Button>
              <Button variant="ghost" onClick={() => setAuto(!auto)}>{auto ? 'Pausar' : 'Reanudar'}</Button>
              <Button variant="ghost" onClick={() => { setAuto(false); setI((i + 1) % codes.length); }}>Siguiente</Button>
            </div>
          )}
        </>
      )}
      <Button variant="quiet" onClick={onBack}>Terminar</Button>
    </div>
  );
}

/* ── Recibir: cámara + lectura de QR ── */
function Receiver({ onBack, onDone, onUseText }: { onBack: () => void; onDone: (d: GameState) => void; onUseText: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const got = useRef(new Map<number, Chunk>());
  const [progress, setProgress] = useState<{ have: number[]; total: number }>({ have: [], total: 0 });
  const [err, setErr] = useState('');
  const [status, setStatus] = useState('Abriendo la cámara…');
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    let stream: MediaStream | null = null;
    let raf = 0, last = 0, stopped = false;
    const stop = () => { stopped = true; cancelAnimationFrame(raf); stream?.getTracks().forEach((t) => t.stop()); };
    const tick = (t: number) => {
      if (stopped) return;
      raf = requestAnimationFrame(tick);
      const v = video.current, c = canvas.current;
      if (!v || !c || v.readyState < 2 || t - last < 120) return;
      last = t;
      const w = 480, h = Math.round((v.videoHeight / v.videoWidth) * w) || 360;
      c.width = w; c.height = h;
      const ctx = c.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(v, 0, 0, w, h);
      const code = jsQR(ctx.getImageData(0, 0, w, h).data, w, h, { inversionAttempts: 'dontInvert' });
      if (!code) return;
      const chunk = parseChunk(code.data);
      if (!chunk) { setStatus('Ese código no es de LinguQuest.'); return; }
      const first = got.current.values().next().value as Chunk | undefined;
      if (first && first.id !== chunk.id) { got.current.clear(); setStatus('Códigos nuevos detectados: empezando de nuevo.'); }
      got.current.set(chunk.index, chunk);
      setProgress({ have: [...got.current.keys()].sort((a, b) => a - b), total: chunk.total });
      setStatus('Leyendo…');
      if (got.current.size === chunk.total) {
        stop();
        setStatus('Comprobando…');
        decodeChunks([...got.current.values()]).then((d) => doneRef.current(d)).catch((e: Error) => { setErr(e.message); got.current.clear(); });
      }
    };
    (async () => {
      if (!navigator.mediaDevices?.getUserMedia) { setErr('Este navegador no permite usar la cámara aquí.'); return; }
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        if (stopped) { stream.getTracks().forEach((t) => t.stop()); return; }
        if (video.current) { video.current.srcObject = stream; await video.current.play(); }
        setStatus('Apunta la cámara a los códigos del otro dispositivo.');
        raf = requestAnimationFrame(tick);
      } catch (e) {
        const name = (e as DOMException).name;
        setErr(name === 'NotAllowedError' ? 'No hay permiso para usar la cámara. Dale permiso en el navegador, o pega el progreso como texto.' : name === 'NotFoundError' ? 'No encuentro ninguna cámara en este dispositivo.' : 'No se ha podido abrir la cámara.');
      }
    })();
    return stop;
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {!err && (
        <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-black">
          <video ref={video} playsInline muted className="block h-auto w-full" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-[15%] rounded-2xl border-4 border-white/80" />
        </div>
      )}
      <canvas ref={canvas} hidden />
      {err ? <p className="rounded-xl bg-danger-tint p-3 text-danger" role="alert">{err}</p> : <p className="text-center text-muted" aria-live="polite">{status}</p>}
      {progress.total > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5" aria-label={`Leídos ${progress.have.length} de ${progress.total}`}>
          {Array.from({ length: progress.total }, (_, k) => (
            <span key={k} className={`num flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${progress.have.includes(k + 1) ? 'bg-success-fill text-ink' : 'bg-surface-2 text-muted'}`}>{k + 1}</span>
          ))}
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        <Button variant="ghost" onClick={onBack}>Cancelar</Button>
        {err && <Button variant="ghost" onClick={onUseText}>Pegar como texto</Button>}
      </div>
    </div>
  );
}

/* ── Alternativa sin cámara ── */
function TextSender({ onBack }: { onBack: () => void }) {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState('');
  const area = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { encodeAsText().then(setText).catch(() => setText('')); }, []);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied('Copiado. Pégalo en el otro dispositivo.'); }
    catch { area.current?.select(); setCopied('Selecciona el texto y cópialo a mano (Ctrl+C o mantener pulsado).'); }
  };
  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted">Copia este texto y envíatelo (por ejemplo, en un mensaje a ti misma). Luego, en el otro dispositivo, usa «Pegar un progreso copiado».</p>
      <label htmlFor="eq-text-out" className="sr-only">Progreso como texto</label>
      <textarea id="eq-text-out" ref={area} readOnly value={text || 'Preparando…'} rows={4} className="num w-full break-all rounded-xl border border-line bg-surface-2 p-3 text-xs" onFocus={(e) => e.currentTarget.select()} />
      <p className="text-xs text-muted">{text.length.toLocaleString('es-ES')} caracteres</p>
      {copied && <p className="text-sm text-success" role="status">{copied}</p>}
      <div className="flex flex-wrap gap-2"><Button onClick={copy} disabled={!text}>Copiar</Button><Button variant="ghost" onClick={onBack}>Volver</Button></div>
    </div>
  );
}

function TextReceiver({ onBack, onDone }: { onBack: () => void; onDone: (d: GameState) => void }) {
  const [text, setText] = useState('');
  const [err, setErr] = useState('');
  const go = async () => {
    const chunk = parseChunk(text.replace(/\s+/g, ''));
    if (!chunk) { setErr('Ese texto no es un progreso de LinguQuest. Cópialo entero, empieza por «EQ1:».'); return; }
    try { onDone(await decodeChunks([chunk])); } catch (e) { setErr((e as Error).message); }
  };
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="eq-text-in" className="text-muted">Pega aquí el progreso que copiaste en el otro dispositivo:</label>
      <textarea id="eq-text-in" value={text} onChange={(e) => { setText(e.target.value); setErr(''); }} rows={4} placeholder="EQ1:…" className="num w-full break-all rounded-xl border border-line bg-surface-2 p-3 text-xs outline-none focus:border-primary" />
      {err && <p className="text-sm text-danger" role="alert">{err}</p>}
      <div className="flex flex-wrap gap-2"><Button onClick={go} disabled={!text.trim()}>Revisar</Button><Button variant="ghost" onClick={onBack}>Volver</Button></div>
    </div>
  );
}

/* ── Resumen antes de reemplazar ── */
function Review({ incoming, onConfirm, onCancel }: { incoming: GameState; onConfirm: () => void; onCancel: () => void }) {
  const a = summarize(currentData());
  const b = summarize(incoming);
  const rows: { label: string; k: keyof Summary }[] = [
    { label: 'Salas superadas', k: 'lessons' }, { label: 'XP total', k: 'xp' }, { label: 'Conceptos en repaso', k: 'cards' },
    { label: 'Trofeos', k: 'trophies' }, { label: 'Último día de estudio', k: 'lastDay' },
  ];
  const fmt = (v: string | number | null) => (v === null ? '—' : typeof v === 'string' ? new Date(v).toLocaleDateString('es-ES') : v.toLocaleString('es-ES'));
  const losesProgress = b.xp < a.xp;
  return (
    <div className="flex flex-col gap-3">
      <p className="font-bold">Códigos leídos. Esto es lo que va a cambiar:</p>
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-sm">
          <thead className="bg-surface-2"><tr><th className="label p-2 text-left"> </th><th className="label p-2 text-right">Ahora aquí</th><th className="label p-2 text-right">Lo que llega</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.k} className="border-t border-line">
                <td className="p-2">{r.label}</td>
                <td className="num p-2 text-right text-muted">{fmt(a[r.k])}</td>
                <td className="num p-2 text-right font-bold">{fmt(b[r.k])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {losesProgress && <p className="rounded-xl bg-accent-tint p-3 text-sm">Ojo: lo que llega tiene menos XP que lo que hay aquí. Si lo reemplazas, podrás deshacerlo después desde esta misma sección.</p>}
      <div className="flex flex-wrap gap-2">
        <Button onClick={onConfirm}>Reemplazar mi progreso</Button>
        <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
      </div>
    </div>
  );
}
