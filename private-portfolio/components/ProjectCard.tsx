'use client';

export type Project = {
  id: string;
  title: string;
  blurb: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  caseStudyUrl?: string;
  outcomes?: string[];
};

import NeoButton from "@/components/NeoButton";
import { useEffect, useState } from "react";
import ModalPortal from "@/components/ModalPortal";

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const [showCase, setShowCase] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowCase(false);
    };
    if (showCase) {
      document.addEventListener("keydown", onKey);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = prev;
      };
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [showCase]);

  // No expandable behavior; description is always visible.
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[color:rgb(10_12_18_/0.6)] p-4 transition will-change-transform hover:-translate-y-0.5 hover:border-[--color-iris-400]/50 hover:shadow-[0_12px_40px_-20px_rgba(99,102,241,0.6)] backdrop-blur-sm"
      onMouseMove={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
        const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
        el.style.transform = `translateY(-2px) rotateX(${(-dy * 4).toFixed(2)}deg) rotateY(${(dx * 4).toFixed(2)}deg)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = '';
      }}
    >
      <div className="absolute inset-0 -z-10 opacity-0 blur-2xl transition group-hover:opacity-30 bg-[radial-gradient(closest-side,rgba(99,102,241,0.5),transparent)]" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-white">{project.title}</h3>
          <p className="mt-1 text-sm text-slate-300">{project.blurb}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-md bg-[color:rgb(15_19_32_/0.7)] px-2 py-1 text-xs text-[--color-iris-200] ring-1 ring-inset ring-[--color-iris-500]/30"
          >
            {t}
          </span>
        ))}
      </div>

      <div>
        <p className="mt-4 text-sm leading-relaxed text-slate-200">{project.description}</p>
        <div className="mt-4 flex gap-3 quick-actions">
          {project.demoUrl ? <NeoButton href={project.demoUrl}>View Demo</NeoButton> : null}
          {project.id === "agency-automation" ? (
            <button
              className="relative inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium bg-gradient-to-r from-[--color-iris-500] via-[--color-plasma-500] to-[--color-aqua-400] text-white shadow-[0_0_24px_rgba(167,139,250,0.35)] transition hover:shadow-[0_0_40px_rgba(167,139,250,0.55)] focus:outline-none"
              onClick={() => setShowCase(true)}
            >
              Case Study
            </button>
          ) : project.caseStudyUrl ? (
            <NeoButton href={project.caseStudyUrl}>Case Study</NeoButton>
          ) : null}
        </div>
      </div>

      {showCase ? (
        <ModalPortal>
          <div className="fixed inset-0 z-[75] grid place-items-center p-4" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCase(false)} />
            <div className="relative z-[76] w-[min(92vw,720px)] max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 bg-black/80 p-6 text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-modal-zoom">
              <button
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-white/10 text-white/80 hover:bg-white/15"
                onClick={() => setShowCase(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="pr-10 text-lg md:text-xl font-semibold">Agency Automation – Case Study</h3>
              <p className="mt-3 text-sm text-slate-300">Daily player-data refresh for Monday.com via a local Electron/TypeScript app using Puppeteer (Transfermarkt).</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <h4 className="text-sm font-semibold text-white/90">Time comparison</h4>
                  <ul className="mt-2 list-none pl-0 text-sm text-slate-300">
                    <li>Manual: 2,500 profiles × 1 min = 2,500 min (≈ 41.7 hours)</li>
                    <li>Automation runtime: ~5 hours (hands-off)</li>
                    <li>Human time saved per run: ≈ 41.7 hours</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <h4 className="text-sm font-semibold text-white/90">Cost framing</h4>
                  <ul className="mt-2 list-none pl-0 text-sm text-slate-300">
                    <li>At $15/hr data entry: ≈ $625 saved per run</li>
                    <li>Calendar time reduction: ~88% faster (41.7h → ~5h)</li>
                  </ul>
                </div>
              </div>
              <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                <h4 className="text-sm font-semibold text-white/90">What’s updated</h4>
                <ul className="mt-2 list-none pl-0 text-sm text-slate-300">
                  <li>Place of Birth, Nationality, Current Club (contracted)</li>
                  <li>Market Value, Agency, Last Contract Extension (if available)</li>
                  <li>Commercial Outfitter, Transfermarkt ID & Profile URL</li>
                </ul>
              </div>
            </div>
          </div>
        </ModalPortal>
      ) : null}
    </div>
  );
}


