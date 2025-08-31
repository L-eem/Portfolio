'use client';

import { useEffect, useRef, useState } from 'react';
import { useControls } from './controls/ControlsContext';

export default function WaveformWidget() {
  const [open, setOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = (canvas.width = 240);
    let h = (canvas.height = 50);
    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, w, h);
      const bars = 48;
      for (let i = 0; i < bars; i++) {
        const p = (i + tRef.current) / bars;
        const amp = 8 + Math.sin(p * Math.PI * 2) * 6 + Math.sin(p * Math.PI * 6) * 2;
        const x = (i / bars) * w;
        ctx.fillStyle = 'rgba(122, 248, 230, 0.9)';
        ctx.fillRect(x, h / 2 - amp, w / bars * 0.6, amp * 2);
      }
      tRef.current += 0.5;
      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <div className="fixed left-4 bottom-4 z-[70]">
      <button className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/90 hover:bg-white/15" onClick={() => setOpen(true)}>Voice agent</button>
      {open && (
        <div className="fixed inset-0 z-[90] grid place-items-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative z-[91] w-[min(92vw,680px)] rounded-2xl border border-white/10 bg-black/70 p-6 backdrop-blur">
            <h3 className="text-white text-lg font-semibold">Voice Agent (Demo)</h3>
            <p className="mt-2 text-slate-300 text-sm">A placeholder demo area for your voice agent. Embed your real widget here.</p>
            <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3">
              <canvas ref={canvasRef} className="w-full" />
            </div>
            <div className="mt-4 flex justify-end">
              <button className="rounded-lg border border-white/15 bg-white/10 px-3 py-1 text-white/90 hover:bg-white/15" onClick={() => setOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


