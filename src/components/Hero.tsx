"use client";

import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-bush text-cream min-h-[90vh] flex items-center justify-center">
      {/* Topo background */}
      <div className="topo-pattern absolute inset-0" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-teal/15 blur-3xl"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 15, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-sienna/10 blur-3xl"
        animate={{
          x: [0, -20, 30, 0],
          y: [0, 20, -15, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* Grain overlay */}
      <div className="grain absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 py-20 text-center">
        {/* Date pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block text-teal text-sm md:text-base font-semibold tracking-[0.25em] uppercase mb-6 px-4 py-1.5 rounded-full border border-teal/20 bg-teal/5">
            April 4 &ndash; 20, 2026
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-display text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-cream leading-[0.9]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          JIG
          <br />
          <span className="italic font-light text-cream/70">Down Under</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-cream/55 max-w-lg mx-auto leading-relaxed mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Ingrid, Julian & Griffin road-trip New Zealand&apos;s South Island
          &mdash; then hop the ditch to Melbourne.
        </motion.p>

        {/* Stats */}
        <motion.div
          className="flex justify-center gap-10 md:gap-16 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {[
            { num: "17", label: "days" },
            { num: "670+", label: "km driven" },
            { num: "37", label: "hrs in the air" },
            { num: "2", label: "countries" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-cream/50 text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.3 + i * 0.15 }}
            >
              <span className="block text-3xl md:text-4xl font-display text-cream/85 mb-1">
                {stat.num}
              </span>
              {stat.label}
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 text-cream/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 2, duration: 1 },
            y: { delay: 2, duration: 2, repeat: Infinity },
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="mx-auto"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
