"use client";

import dynamic from "next/dynamic";
import Timeline from "@/components/Timeline";
import Updates from "@/components/Updates";
import Hero from "@/components/Hero";
import SectionReveal from "@/components/SectionReveal";
import LatestDispatch from "@/components/LatestDispatch";

const TripMap = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero */}
      <Hero />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-cream/80 backdrop-blur-xl border-b border-stone-200/40">
        <div className="max-w-4xl mx-auto px-5 flex gap-6 text-sm font-medium overflow-x-auto">
          {[
            { href: "#route", label: "Route" },
            { href: "#itinerary", label: "Itinerary" },
            { href: "#dispatches", label: "Dispatches" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-3 border-b-2 border-transparent hover:border-bush text-stone-400 hover:text-charcoal transition-all duration-300 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Latest Dispatch */}
      <LatestDispatch />

      {/* Map Section */}
      <section id="route" className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <SectionReveal>
          <h2 className="font-display text-3xl md:text-5xl mb-2 text-charcoal">
            The Route
          </h2>
          <p className="text-stone-400 mb-8 text-base">
            Nelson &rarr; Golden Bay &rarr; West Coast &rarr; Arthur&apos;s Pass
            &rarr; Christchurch &rarr; Melbourne
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200/40 h-[450px] md:h-[550px] ring-1 ring-black/5">
            <TripMap />
          </div>

          {/* Route legend */}
          <div className="flex flex-wrap gap-5 mt-5 text-xs text-stone-400">
            {[
              { color: "bg-teal", label: "Nelson & Golden Bay" },
              { color: "bg-bush", label: "West Coast" },
              { color: "bg-sienna", label: "Arthur's Pass" },
              { color: "bg-plum", label: "Christchurch" },
            ].map((item) => (
              <span key={item.label} className="flex items-center gap-1.5">
                <span className={`w-5 h-0.5 ${item.color} rounded`} />
                {item.label}
              </span>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* Itinerary Section */}
      <section
        id="itinerary"
        className="max-w-3xl mx-auto px-5 py-16 md:py-20"
      >
        <SectionReveal>
          <h2 className="font-display text-3xl md:text-5xl mb-2 text-charcoal">
            Day by Day
          </h2>
          <p className="text-stone-400 mb-10 text-base">
            Two weeks, one toddler, zero regrets (hopefully).
          </p>
        </SectionReveal>
        <Timeline />
      </section>

      {/* Dispatches Section */}
      <section
        id="dispatches"
        className="max-w-3xl mx-auto px-5 py-16 md:py-20"
      >
        <SectionReveal>
          <h2 className="font-display text-3xl md:text-5xl mb-2 text-charcoal">
            Dispatches
          </h2>
          <p className="text-stone-400 mb-10 text-base">
            Notes from the field. Updated when we have wifi (so, sporadically).
          </p>
        </SectionReveal>
        <Updates />
      </section>

      {/* Footer */}
      <footer className="relative bg-bush text-cream/50 py-14 text-center overflow-hidden">
        <div className="topo-pattern absolute inset-0 opacity-50" />
        <div className="relative z-10">
          <p className="font-display text-2xl text-cream/80 mb-2">
            Made with love by Ingrid
          </p>
          <p className="text-sm">
            Ingrid, Julian & Griffin — SLC &rarr; NZ &rarr; Melbourne &rarr;
            Home
          </p>
        </div>
      </footer>
    </main>
  );
}
