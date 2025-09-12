import type { Metadata } from "next";
import SpaceBackground from "@/components/SpaceBackground";
import RocketCursor from "@/components/RocketCursor";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Client reviews and testimonials for Salim",
  robots: { index: false, follow: false },
};

type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
};

const testimonials: Testimonial[] = [
  {
    id: "lenny",
    quote:
      "I am pleased to recommend Salim, who served as lead developer on our recent AI voice agent project for an HVAC, plumbing, and electrical company running on ServiceTitan. Salim designed and implemented the agent’s key functions in checking appointment availability, booking appointments, locating existing customers, and creating new customer records, by orchestrating seamless integrations among Retell AI, Make.com, and ServiceTitan. He also refined the conversational prompts so the agent could trigger each function naturally and reliably. Throughout the project, Salim demonstrated deep technical expertise, clear communication, and a proactive approach to problem solving and deadlines. I trust his skills and professionalism and would gladly work with him again.",
    author: "Lenny Cowans",
    role: "Co‑Founder",
    company: "6omb Voice AI Agency",
  },
  {
    id: "yaseen",
    quote:
      "My agency and I worked with Salim on a couple of projects, and it was a very good experience. Salim is a true professional with exceptional communication skills, ensuring that all projects were completed smoothly. I highly recommend his services.",
    author: "Yaseen",
    role: "CEO",
    company: "Acsend AI",
  },
  {
    id: "rian",
    quote:
      "I hired Salim for a very complicated task integrating n8n with HubSpot. I needed it done the next day, and he pulled through after 8 long hours of hard work. Not only that, but overall a great person to work with, I never heard a complaint, just positive comments despite the turbulence we were facing. I will definitely be working with Salim in the near future.",
    author: "Rian",
    role: "CEO",
    company: "Sorority AI",
  },
  {
    id: "max",
    quote:
      "My agency contracted Salim to build a voice agent for a RV Park. He maintained the same level of enthusiasm, initiative, and support from the day we started to after the project was shipped. Communication was easy and reliable. He was able to bring things down to a level that I could comprehend as a non-technical person and helped us solve problems we didn’t even know we had.",
    author: "Max",
    role: "CEO",
    company: "Upside AI",
  },
  {
    id: "ritesh",
    quote:
      "Salim has been working with me on multiple software automation projects. He is extremely determined to get the job done with high quality and efficiency. He does not cut any corners when developing and makes sure the deliverable is above and beyond the call of duty.",
    author: "Ritesh V.",
    role: "CEO",
    company: "Slyte",
  },
  {
    id: "yusuf",
    quote:
      "Working with Salim has been a pleasure. The peace of mind knowing we could rely on a competent, resourceful and capable developer was important to us as we wanted to fulfil and deliver the best outcomes for our clients.\n\nHaving his strategic views on how best to structure and build automations was pivotal in creating work that was purposeful and impactful.\n\nWe 100% recommend Salim for dev work, AI systems and custom automations, and we look forward to further projects with him.",
    author: "Yusuf Kissi",
    role: "CEO",
    company: "Streemline AI",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <SpaceBackground />
      <RocketCursor />
      <main className="relative min-h-screen bg-gradient-to-b from-[--color-cosmic-950] via-[--color-void-950] to-black text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_10%_-10%,rgba(99,102,241,0.15),transparent)]" />

        <Navbar />

          <div className="mx-auto w-full max-w-6xl px-6 mt-8">
            <h1 className="relative inline-block text-3xl md:text-5xl font-bold leading-tight text-white">
              {"What my clients say".split("").map((ch, i) => (
                ch === " " ? (
                  <span key={i} className="float-space" />
                ) : (
                  <span
                    key={i}
                    className="float-letter"
                    style={{ animationDelay: `${(i % 6) * 120}ms` }}
                  >
                    {ch}
                  </span>
                )
              ))}
            </h1>
            <div className="mt-3 h-[3px] w-40 rounded-full bg-[linear-gradient(to_right,rgba(108,92,231,0.7),rgba(255,61,129,0.5),rgba(0,245,212,0.7))] shadow-[0_0_24px_rgba(99,102,241,0.4)]" />
          </div>

        <section className="mx-auto mt-12 w-full max-w-6xl px-6 pb-24">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {testimonials.map((t) => (
              <article
                key={t.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-20px_rgba(99,102,241,0.6)]"
              >
                <div className="absolute inset-0 -z-10 opacity-0 blur-2xl transition group-hover:opacity-30 bg-[radial-gradient(closest-side,rgba(99,102,241,0.5),transparent)]" />
                <p className="text-slate-200">“{t.quote}”</p>
                <div className="mt-4 text-sm text-slate-300">
                  — <span className="font-medium text-white">{t.author}</span>
                  {t.role ? <span>, {t.role}</span> : null}
                  {t.company ? <span>, {t.company}</span> : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}


