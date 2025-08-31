'use client';

import { useEffect, useMemo, useRef } from "react";
import { useControls } from "./controls/ControlsContext";

export default function RocketCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const angleRef = useRef(0);
  const raf = useRef<number | null>(null);
  const trailRef = useRef<Array<{ x: number; y: number; life: number }>>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const afterburnerRef = useRef(false);
  const { magnetTarget } = useControls();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const onDown = () => { afterburnerRef.current = true; };
    const onUp = () => { afterburnerRef.current = false; };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      const tgt = magnetTarget || target.current;
      const dx = tgt.x - pos.current.x;
      const dy = tgt.y - pos.current.y;
      const newAngle = Math.atan2(dy, dx) + Math.PI / 2; // nose forward
      angleRef.current += (newAngle - angleRef.current) * 0.25;

      pos.current.x += dx * 0.18;
      pos.current.y += dy * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) rotate(${angleRef.current}rad)`;
        const scale = afterburnerRef.current ? 1.6 : 1.0;
        (ref.current as HTMLDivElement).style.setProperty("--flame-scale", String(scale));
      }

      // trail
      trailRef.current.push({ x: pos.current.x, y: pos.current.y, life: afterburnerRef.current ? 1.2 : 1 });
      for (let i = 0; i < trailRef.current.length; i++) {
        trailRef.current[i].life -= 0.03;
      }
      while (trailRef.current.length && trailRef.current[0].life <= 0) trailRef.current.shift();

      const c = canvasRef.current;
      if (c) {
        const ctx = c.getContext("2d");
        if (!ctx) { raf.current = requestAnimationFrame(tick); return; }
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.globalCompositeOperation = "lighter";
        for (let i = 0; i < trailRef.current.length; i++) {
          const p = trailRef.current[i];
          const alpha = Math.max(0, Math.min(1, p.life));
          const r = (afterburnerRef.current ? 6 : 4) * (i / trailRef.current.length);
          ctx.fillStyle = `rgba(255, 99, 164, ${0.06 + alpha * 0.18})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y + 10, r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalCompositeOperation = "source-over";
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("resize", resize);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[59]" />
      <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[60] -translate-x-1/2 -translate-y-1/2">
      <svg
        className="rocket-glow"
        width="36"
        height="36"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bodyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#00f5d4" />
          </linearGradient>
          <radialGradient id="flameGradient" cx="0.5" cy="0" r="1">
            <stop offset="0%" stopColor="#fff7ad" />
            <stop offset="60%" stopColor="#ff6fa3" />
            <stop offset="100%" stopColor="#ff3d81" />
          </radialGradient>
        </defs>
        <g>
          <path d="M32 4c8 8 10 20 10 24 0 6-4 10-10 10s-10-4-10-10c0-4 2-16 10-24z" fill="url(#bodyGradient)" />
          <circle cx="32" cy="26" r="4" fill="#0b0f17" />
          <path d="M22 30l-8 6 8 2" fill="#6c5ce7" opacity="0.8" />
          <path d="M42 30l8 6-8 2" fill="#6c5ce7" opacity="0.8" />
          <path d="M28 38l-2 8 6-4 6 4-2-8" fill="#7af8e6" opacity="0.9" />
          <g style={{ transformOrigin: "32px 48px", transform: "scaleY(var(--flame-scale,1))" }}>
            <ellipse className="flame" cx="32" cy="48" rx="4" ry="8" fill="url(#flameGradient)" />
          </g>
        </g>
      </svg>
      </div>
    </>
  );
}


