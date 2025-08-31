"use client";

import { useMemo, useState } from "react";
import RocketCursor from "@/components/RocketCursor";
import SpaceBackground from "@/components/SpaceBackground";
import { useControls } from "@/components/controls/ControlsContext";
import NeoButton from "@/components/NeoButton";
import ProjectCard, { Project } from "@/components/ProjectCard";
import Navbar from "@/components/Navbar";

const projects: Project[] = [
  {
    id: "vr-clinic-voice-agent",
    title: "VR Mental Health Clinic Voice Agent",
    blurb: "Retell AI + n8n + HubSpot: books appointments with live availability.",
    description:
      "Implemented the API integration between a Retell AI voice agent, n8n, and HubSpot (prompt not authored by me). The integration fetches live appointment availability, presents open time slots to the caller, and books the appointment based on the confirmed time. It also updates client details (name, email, phone, insurance, appointment type).",
    tags: ["Retell AI", "n8n", "HubSpot API", "Booking", "Healthcare"],
    outcomes: ["24/7 phone booking", "Less back-and-forth, faster intake"],
  },
  {
    id: "hvac-voice-agent",
    title: "HVAC Voice Agent (ServiceTitan)",
    blurb: "AI phone agent for HVAC/plumbing/electrical company on ServiceTitan.",
    description:
      "Lead developer for an AI voice agent that checks appointment availability, books appointments, locates existing customers, and creates new customer records. Orchestrated seamless integrations among Retell AI (telephony/LLM), Make.com (workflows), and the ServiceTitan API, and refined conversational prompts so the agent could reliably trigger each function. Built for production reliability and clear operator handoff.",
    tags: ["Retell AI", "Make.com", "ServiceTitan API", "Voice Agent", "Automation"],
    outcomes: ["Automated booking & lookup"],
  },
  {
    id: "agency-automation",
    title: "Agency Automation",
    blurb: "Scrape 2,500+ players and auto-sync to Monday.com in ~5 hours.",
    description:
      "Built a TypeScript/Electron automation that scrapes football player data using Puppeteer with Transfermarkt, then updates a Monday.com board automatically. It refreshes 2,500+ contacts in about five hours with fields like Place of Birth, Nationality, Current Club (contracted only), Market Value, Agency, Last Contract Extension (if available), Commercial Outfitter, Transfermarkt ID, and Profile URL. The app runs locally via Electron, uses Supabase for connectivity, and provides a single 'Start' action—run once a day and the board stays up to date.",
    tags: [
      "Puppeteer",
      "Transfermarkt",
      "Monday.com API",
      "Electron",
      "TypeScript",
      "Supabase",
      "Scraping",
      "Automation",
    ],
    caseStudyUrl: "/projects/agency-automation",
    outcomes: ["~41.7h manual effort saved/run", "Data kept fresh daily"],
  },
  {
    id: "ghl-voiceflow-sms-bot",
    title: "Nursing School SMS Chatbot (GHL + Voiceflow)",
    blurb: "24/7 SMS support: answers, program recs, registration links, live handoff.",
    description:
      "Built an SMS chatbot using GoHighLevel (GHL) integrated with the Voiceflow API and chat memory. The agent is trained on the nursing school's data, provides 24/7 answers, recommends programs based on user questions, sends direct registration links when helpful, and routes to live support on request.",
    tags: [
      "GoHighLevel (GHL)",
      "Voiceflow API",
      "SMS",
      "Chat memory",
      "24/7 Support",
      "Education",
    ],
    outcomes: ["Fewer emails for staff", "Faster answers for students"],
  },
  {
    id: "sheikh-scents-chatbot",
    title: "Sheikh Scents Shopify Chatbot",
    blurb: "Conversational shopping with live inventory + AI recommendations.",
    description:
      "Built a conversational chatbot where users ask for perfumes/colognes; the bot checks live Shopify inventory and uses AI to suggest the best matching products. Connected a Voiceflow agent via n8n to the store for real-time product data, then returns personalized recommendations with product links, prices, images, and descriptions in the chat.",
    tags: ["Voiceflow", "n8n", "Shopify", "Inventory", "Recommendations", "Ecommerce", "Fragrances"],
    outcomes: ["Guided product discovery", "Up-to-date inventory in replies"],
  },
  {
    id: "rv-park-voice-agent",
    title: "RV Park Voice Agent",
    blurb: "Books RV reservations via email handoff; staff confirms by phone.",
    description:
      "Voice agent for an RV park that captures reservation requests and sends email confirmations to staff for callback and final confirmation. No real-time availability or API booking (provider lacked APIs), but supports direct email messages for reservations, complaints, cancellations, and edits.",
    tags: ["Voice Agent", "Email Handoff", "Reservations", "Operations"],
    outcomes: ["Less phone tag", "Clear email handoffs to staff"],
  },
];

export default function Home() {
  const { setMagnetTarget } = useControls();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const onToggle = (id: string) => setExpandedId((prev) => (prev === id ? null : id));
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <>
      <SpaceBackground />
      <RocketCursor />
      <main className="relative min-h-screen bg-gradient-to-b from-[--color-cosmic-950] via-[--color-void-950] to-black text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_10%_-10%,rgba(99,102,241,0.15),transparent)]" />

        <Navbar />

        {/* Upwork-style profile header */}
        <section className="mx-auto w-full max-w-6xl px-4 md:px-6 mt-6 md:mt-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 rounded-2xl border border-white/10 bg-[color:rgb(10_12_18_/0.6)] p-5 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <img
                src="/pfp.jpeg"
                alt="Salim Arikat"
                className="h-16 w-16 rounded-full object-cover border border-white/15"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Salim Arikat</h1>
                <p className="mt-1 text-sm md:text-base text-white/85">Voice AI Developer | Automation & System Integrations</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-emerald-300">Available now</span>
                  <span className="badge-glow rounded-full border border-emerald-400/40 bg-emerald-400/15 px-2 py-0.5 text-emerald-200">100% client satisfaction</span>
                </div>
              </div>
            </div>
            <div className="md:ml-auto w-full flex items-center justify-center md:justify-end gap-3">
              <span
                onMouseEnter={(e) => {
                  const r = (e.currentTarget as HTMLSpanElement).getBoundingClientRect();
                  setMagnetTarget({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
                }}
                onMouseLeave={() => setMagnetTarget(null)}
              >
                <NeoButton href="/contact">Book a call</NeoButton>
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 md:px-6 mt-6 md:mt-10">
          {/* Mobile: plain heading for clean wrapping */}
          <h1 className="md:hidden text-3xl font-extrabold tracking-tight text-white">Recent AI/Automation Projects</h1>
          {/* Desktop: zero-gravity per-letter */}
          <h1 className="hidden md:inline-block md:text-5xl text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {"Recent AI/Automation Projects".split("").map((ch, i) => (
              ch === " " ? (
                <span key={i} className="float-space" />
              ) : (
                <span key={i} className="float-letter" style={{ animationDelay: `${(i % 6) * 120}ms` }}>
                  {ch}
                </span>
              )
            ))}
          </h1>
          <p className="mt-2 max-w-3xl text-sm md:text-base text-white/85">5+ years in AI/automation</p>
          <p className="mt-1 text-sm md:text-base text-white/85">by Salim Arikat</p>
        </section>

        

        <section id="projects" className="mx-auto mt-8 md:mt-14 w-full max-w-6xl px-4 md:px-6 pb-24">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>

        

        
      </main>
      
    </>
  );
}
