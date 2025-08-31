'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import NeoButton from '@/components/NeoButton';
import { useControls } from '@/components/controls/ControlsContext';

export default function Navbar() {
  const { setMagnetTarget } = useControls();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) =>
    `rounded-xl border px-3 py-1.5 transition motion-safe:animate-float ${
      pathname === href
        ? 'border-[--color-iris-400]/60 bg-white/10 text-white'
        : 'border-white/15 bg-white/5 text-white/90 hover:border-[--color-iris-400]/50 hover:bg-white/10'
    }`;

  return (
    <header className="mx-auto w-full max-w-6xl px-6 pt-10">
      <div className="flex items-center justify-end">
        <button
          className="md:hidden rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-white/90"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <nav className="hidden md:flex items-center gap-3 text-sm">
          <Link href="/" className={`${linkClass('/')} animate-bob-y`} style={{ animationDelay: '0ms' }}>Home</Link>
          <Link href="/testimonials" className={`${linkClass('/testimonials')} animate-bob-y`} style={{ animationDelay: '120ms' }}>Testimonials</Link>
          <span
            onMouseEnter={(e) => {
              const r = (e.currentTarget as HTMLSpanElement).getBoundingClientRect();
              setMagnetTarget({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
            }}
            onMouseLeave={() => setMagnetTarget(null)}
            className="inline-block animate-bob-y"
            style={{ animationDelay: '240ms' }}
          >
            <NeoButton href="/contact">Book a call</NeoButton>
          </span>
        </nav>
      </div>
      {open ? (
        <div className="mt-3 flex flex-col gap-2 md:hidden">
          <Link href="/" className={`${linkClass('/')} animate-bob-y`} style={{ animationDelay: '0ms' }} onClick={() => setOpen(false)}>Home</Link>
          <Link href="/testimonials" className={`${linkClass('/testimonials')} animate-bob-y`} style={{ animationDelay: '120ms' }} onClick={() => setOpen(false)}>Testimonials</Link>
          <span
            onMouseEnter={(e) => {
              const r = (e.currentTarget as HTMLSpanElement).getBoundingClientRect();
              setMagnetTarget({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
            }}
            onMouseLeave={() => setMagnetTarget(null)}
            onClick={() => setOpen(false)}
            className="inline-block animate-bob-y"
            style={{ animationDelay: '240ms' }}
          >
            <NeoButton href="/contact">Book a call</NeoButton>
          </span>
        </div>
      ) : null}
    </header>
  );
}


