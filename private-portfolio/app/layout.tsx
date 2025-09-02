import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ControlsProvider, MotionDefaults } from "@/components/controls/ControlsContext";
import ControlsPanel from "@/components/controls/ControlsPanel";
import RouteTransition from "@/components/RouteTransition";
import AmbientSound from "@/components/AmbientSound";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Salim Arikat — AI Voice & Automation Portfolio",
  description: "AI voice, automation, and data integrations",
  openGraph: {
    title: "Salim Arikat — AI Voice & Automation Portfolio",
    description: "Recent AI/Automation projects: voice agents, scheduling, data flows",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Salim Arikat Portfolio",
      },
    ],
  },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ControlsProvider>
          <MotionDefaults />
          <RouteTransition />
          <AmbientSound />
          {children}
          <ControlsPanel />
          <Analytics />
        </ControlsProvider>
      </body>
    </html>
  );
}
