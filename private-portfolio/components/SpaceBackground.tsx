'use client';

import { useEffect, useRef, useState } from "react";
import { useControls } from "./controls/ControlsContext";

type Star = { x: number; y: number; z: number; size: number; speed: number; twinkle: number };
type Meteor = { x: number; y: number; vx: number; vy: number; length: number; thickness: number; life: number; ttl: number; mode: 'n' | 'b' };

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const meteorsRef = useRef<Meteor[]>([]);
  const raf = useRef<number | null>(null);
  const { constellations, onMeteorBurst } = useControls();
  const burstRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const init = () => {
      // Stars
      starsRef.current = Array.from({ length: Math.min(550, Math.floor((w * h) / 5500)) }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.5 + 0.5,
        size: Math.random() * 1.6 + 0.2,
        speed: Math.random() * 0.4 + 0.1,
        twinkle: Math.random(),
      }));

      // Meteors (3-6)
      const meteorCount = Math.min(6, Math.max(3, Math.round((w + h) / 1200)));
      meteorsRef.current = Array.from({ length: meteorCount }).map(() => spawnMeteorNormal());
    };

    const spawnMeteorNormal = (): Meteor => {
      const startX = w * (0.6 + Math.random() * 0.4);
      const startY = -20 - Math.random() * 100;
      const speed = 4 + Math.random() * 5;
      const angle = (Math.PI * 3) / 4 + (Math.random() - 0.5) * 0.25; // ~225deg
      const vx = -Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      return { x: startX, y: startY, vx, vy, length: 70 + Math.random() * 110, thickness: 1 + Math.random() * 2, life: 0, ttl: 60 + Math.random() * 120, mode: 'n' };
    };

    const spawnMeteorBurst = (): Meteor => {
      const edge = Math.floor(Math.random() * 4); // 0=top,1=right,2=bottom,3=left
      let startX = 0, startY = 0;
      if (edge === 0) { startX = Math.random() * w; startY = -50; }
      else if (edge === 1) { startX = w + 50; startY = Math.random() * h; }
      else if (edge === 2) { startX = Math.random() * w; startY = h + 50; }
      else { startX = -50; startY = Math.random() * h; }

      const speed = 6 + Math.random() * 10;
      const angle = Math.random() * Math.PI * 2;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      return { x: startX, y: startY, vx, vy, length: 80 + Math.random() * 140, thickness: 1 + Math.random() * 2, life: 0, ttl: 80 + Math.random() * 160, mode: 'b' };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // subtle nebula gradient
      const g = ctx.createRadialGradient(w * 0.1, h * -0.2, 100, w * 0.1, h * -0.2, Math.max(w, h));
      g.addColorStop(0, "rgba(99,102,241,0.12)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // (Planets removed per design request)

      // Stars
      for (const s of starsRef.current) {
        s.x -= s.speed * s.z; // drift left
        if (s.x < 0) s.x = w;
        const alpha = 0.5 + 0.5 * Math.sin((performance.now() / 700) * (0.5 + s.twinkle));
        ctx.fillStyle = `rgba(255,255,255,${0.4 + 0.6 * alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.z, 0, Math.PI * 2);
        ctx.fill();
      }

      // Constellations (light lines between nearby stars)
      if (constellations) {
        ctx.strokeStyle = "rgba(167,139,250,0.16)";
        ctx.lineWidth = 1;
        const step = 4; // sample subset for perf
        for (let i = 0; i < starsRef.current.length; i += step) {
          const a = starsRef.current[i];
          let links = 0;
          for (let j = i + step; j < starsRef.current.length && links < 2; j += step) {
            const b = starsRef.current[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 90 * 90) {
              const alpha = 1 - Math.sqrt(d2) / 90;
              ctx.strokeStyle = `rgba(122,248,230,${0.05 + alpha * 0.2})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
              links++;
            }
          }
        }
      }

      // Meteors
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < meteorsRef.current.length; i++) {
        const m = meteorsRef.current[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life += 1;

        // tail vector opposite of velocity
        const len = m.length;
        const nx = -m.vx;
        const ny = -m.vy;
        const mag = Math.hypot(nx, ny) || 1;
        const tx = (nx / mag) * len;
        const ty = (ny / mag) * len;

        const grad = ctx.createLinearGradient(m.x, m.y, m.x + tx, m.y + ty);
        grad.addColorStop(0, "rgba(255,255,255,0.9)");
        grad.addColorStop(0.3, "rgba(255, 250, 200, 0.7)");
        grad.addColorStop(1, "rgba(255, 61, 129, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.thickness;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x + tx, m.y + ty);
        ctx.stroke();

        // respawn when offscreen or expired
        const outOfScreen = m.x < -200 || m.x > w + 200 || m.y < -200 || m.y > h + 200;
        // keep normal meteors constrained to a top-right region
        const inTopRightRegion = m.x > w * 0.6 && m.y < h * 0.4;
        const outOfRegion = m.mode === 'n' && !inTopRightRegion;
        if (m.life > m.ttl || outOfScreen || outOfRegion) {
          meteorsRef.current[i] = spawnMeteorNormal();
        }
      }
      ctx.globalCompositeOperation = "source-over";
      raf.current = requestAnimationFrame(draw);
    };

    const onResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };

    init();
    draw();
    const off = onMeteorBurst(() => {
      // Spawn a burst of meteors from random edges and directions
      const burst = 24;
      for (let k = 0; k < burst; k++) {
        meteorsRef.current.push(spawnMeteorBurst());
      }
      // Trim back after a while
      setTimeout(() => {
        const meteorCount = Math.min(6, Math.max(3, Math.round((w + h) / 1200)));
        // Keep only normal meteors and refill if needed
        const normals = meteorsRef.current.filter((m) => m.mode === 'n');
        while (normals.length < meteorCount) normals.push(spawnMeteorNormal());
        meteorsRef.current = normals.slice(0, meteorCount);
      }, 3000);
    });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf.current) cancelAnimationFrame(raf.current);
      off();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(600px_200px_at_90%_-10%,rgba(0,245,212,0.08),transparent)]"
    />
  );
}


