'use client';

import { useControls } from './ControlsContext';

export default function ControlsPanel() {
  const { triggerMeteorBurst } = useControls();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    btn.classList.remove('animate-button-burst');
    // force reflow to restart animation
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (btn as any).offsetHeight;
    btn.classList.add('animate-button-burst');
    // spark element
    const spark = document.createElement('span');
    spark.className = 'spark';
    btn.appendChild(spark);
    setTimeout(() => spark.remove(), 450);
    // fragments burst
    const count = 10 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      const frag = document.createElement('span');
      frag.className = 'fragment';
      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 50;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      frag.style.setProperty('--tx', `${tx}px`);
      frag.style.setProperty('--ty', `${ty}px`);
      btn.appendChild(frag);
      setTimeout(() => frag.remove(), 800);
    }
    triggerMeteorBurst();
  };

  return (
    <>
      <button
        className="asteroid-fab z-[70]"
        onClick={onClick}
        aria-label="Meteor shower"
        onMouseMove={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) / rect.width;
          const dy = (e.clientY - cy) / rect.height;
          const rx = (-dy * 12).toFixed(2);
          const ry = (dx * 12).toFixed(2);
          el.style.setProperty('--rx', `${rx}deg`);
          el.style.setProperty('--ry', `${ry}deg`);
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.removeProperty('--rx');
          el.style.removeProperty('--ry');
        }}
      >
        <span className="crater" style={{ width: 18, height: 18, left: 20, top: 24 }} />
        <span className="crater" style={{ width: 26, height: 26, right: 20, top: 40 }} />
        <span className="crater" style={{ width: 14, height: 14, left: 48, top: 64 }} />
        <div className="sheen" />
        <div className="fissure" style={{ left: 18, right: 18, top: 54 }} />
      </button>
    </>
  );
}


