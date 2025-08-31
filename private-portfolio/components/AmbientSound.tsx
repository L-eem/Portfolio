'use client';

import { useEffect, useRef } from 'react';
import { useControls } from './controls/ControlsContext';

export default function AmbientSound() {
  const { audioEnabled } = useControls();
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ o: OscillatorNode; g: GainNode } | null>(null);

  useEffect(() => {
    if (!audioEnabled) {
      if (nodesRef.current) {
        nodesRef.current.g.gain.exponentialRampToValueAtTime(0.0001, (ctxRef.current as AudioContext).currentTime + 0.3);
        setTimeout(() => {
          nodesRef.current?.o.stop();
          nodesRef.current?.o.disconnect();
          nodesRef.current?.g.disconnect();
          nodesRef.current = null;
        }, 350);
      }
      return;
    }

    const anyWindow = window as unknown as { webkitAudioContext?: typeof AudioContext };
    const Ctor = window.AudioContext || anyWindow.webkitAudioContext;
    const ctx = new Ctor();
    ctxRef.current = ctx;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = 140; // base hum
    g.gain.value = 0.0001;
    o.connect(g).connect(ctx.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.02, ctx.currentTime + 0.4);

    // slow frequency wobble
    let raf: number | null = null;
    const start = performance.now();
    const tick = (t: number) => {
      const delta = (t - start) / 1000;
      o.frequency.value = 130 + Math.sin(delta * 0.2) * 10 + Math.sin(delta * 0.07) * 6;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    nodesRef.current = { o, g };
    return () => {
      if (raf) cancelAnimationFrame(raf);
      try { o.stop(); } catch {}
      o.disconnect();
      g.disconnect();
      nodesRef.current = null;
    };
  }, [audioEnabled]);

  return null;
}




