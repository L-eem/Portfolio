import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Agency Automation – Case Study",
  robots: { index: false, follow: false },
};

export default function AgencyAutomationCaseStudy() {
  const profiles = 2500;
  const minutesPerProfile = 1;
  const manualMinutes = profiles * minutesPerProfile; // 2500
  const manualHours = manualMinutes / 60; // 41.666...
  const hourlyRate = 15; // $15/hr data entry
  const manualCost = manualHours * hourlyRate;
  const automationHours = 5; // measured runtime

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[--color-cosmic-950] via-[--color-void-950] to-black text-slate-100">
      <Navbar />
      <section className="mx-auto w-full max-w-4xl px-6 py-10">
        <h1 className="text-2xl md:text-3xl font-semibold text-white">Agency Automation – Case Study</h1>
        <p className="mt-2 text-slate-300">
          A local Electron/TypeScript app that scrapes 2,500+ football player profiles from Transfermarkt using Puppeteer
          and updates a Monday.com board automatically.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-sm font-semibold text-white/90">Scope</h2>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-300">
              <li>Scrape player fields: Place of Birth, Nationality, Current Club (contracted), Market Value, Agency</li>
              <li>Optional: Last Contract Extension Date, Commercial Outfitter</li>
              <li>Transfermarkt Player ID and Profile URL saved for traceability</li>
              <li>Sync to Monday.com board via API</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-sm font-semibold text-white/90">Time & Cost Impact</h2>
            <ul className="mt-2 text-sm text-slate-300">
              <li>Manual (1 min/profile): {manualMinutes.toLocaleString()} minutes ≈ {manualHours.toFixed(1)} hours</li>
              <li>Automation runtime: ~{automationHours} hours (hands-off)</li>
              <li>Human time saved per run: ~{manualHours.toFixed(1)} hours</li>
              <li>At ${hourlyRate}/hr data entry: ≈ ${manualCost.toFixed(0)} saved per run</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-sm font-semibold text-white/90">Tech</h2>
          <p className="mt-2 text-sm text-slate-300">
            Electron + TypeScript, Puppeteer, better-sqlite3 (local logs), Supabase (cloud), Monday.com API.
          </p>
        </div>
      </section>
    </main>
  );
}




