'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useControls } from './controls/ControlsContext';

export default function RouteTransition() {
  const pathname = usePathname();
  const { motionEnabled } = useControls();
  const [active, setActive] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!motionEnabled) return;
    setActive(true);
    if (timer.current) cancelAnimationFrame(timer.current);
    const start = performance.now();
    const duration = 700;
    const tick = (t: number) => {
      if (t - start < duration) {
        timer.current = requestAnimationFrame(tick);
      } else {
        setActive(false);
      }
    };
    timer.current = requestAnimationFrame(tick);
    return () => { if (timer.current) cancelAnimationFrame(timer.current); };
  }, [pathname, motionEnabled]);

  if (!active) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden animate-warp-fade">
      {/* Warp streaks */}
      <div className="absolute inset-0 bg-[radial-gradient(40%_35%_at_50%_50%,rgba(0,245,212,0.12),transparent)]" />
      <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_50%_50%,black,transparent_70%)]">
        <div className="absolute left-1/2 top-1/2 h-[1px] w-[140vw] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)] animate-warp-streak" />
        <div className="absolute left-1/2 top-1/2 h-[1px] w-[160vw] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(167,139,250,0.6),transparent)] animate-warp-streak" style={{ transform: 'translate(-50%,-50%) rotate(8deg)' }} />
        <div className="absolute left-1/2 top-1/2 h-[1px] w-[160vw] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(0,245,212,0.45),transparent)] animate-warp-streak" style={{ transform: 'translate(-50%,-50%) rotate(-8deg)' }} />
      </div>
      {/* Soft blur */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />
    </div>
  );
}


