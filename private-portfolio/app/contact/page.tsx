import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a call",
  description: "Schedule via Cal.com",
  robots: { index: false, follow: false },
};

import Navbar from "@/components/Navbar";
import CalEmbed from "@/components/CalEmbed";

export default function ContactPage() {
  // Fallbacks ensure embed works even if env vars are missing on Vercel
  const calUser = process.env.NEXT_PUBLIC_CAL_USERNAME || "salim-a";
  const calSlug = process.env.NEXT_PUBLIC_CAL_SLUG || "discovery-call";
  const calLink = `${calUser}/${calSlug}`;
  const fullUrl = process.env.NEXT_PUBLIC_CAL_FULL_URL;

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[--color-cosmic-950] via-[--color-void-950] to-black">
      <Navbar />
      <div className="mx-auto w-full max-w-4xl px-4 md:px-6 py-8 md:py-10">
        <h1 className="text-2xl md:text-3xl font-semibold text-white inline-block">
          {"Book a call".split("").map((ch, i) => (
            ch === " " ? (
              <span key={i} className="float-space" />
            ) : (
              <span key={i} className="float-letter" style={{ animationDelay: `${(i % 6) * 120}ms` }}>
                {ch}
              </span>
            )
          ))}
        </h1>
        <p className="mt-2 text-slate-300">Choose a time that works for you.</p>
        <div className="mt-4 md:mt-6 overflow-visible md:overflow-hidden rounded-xl border border-white/10 bg-black/30 p-1">
          <CalEmbed calLink={calLink} fullUrl={fullUrl} />
        </div>
      </div>
    </main>
  );
}


