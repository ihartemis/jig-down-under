"use client";

import { motion } from "motion/react";
import { updates } from "@/lib/updates";

export default function LatestDispatch() {
  if (updates.length === 0) return null;

  const latest = updates[0];

  return (
    <motion.div
      className="max-w-4xl mx-auto px-5 pt-8 pb-2"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <a
        href="#dispatches"
        className="group block bg-white rounded-xl border border-stone-200/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      >
        <div className="px-5 py-4 md:px-6 md:py-5 flex gap-4 items-start">
          <div className="shrink-0 mt-0.5">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sienna/10 text-sienna text-sm">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold tracking-wide uppercase text-sienna">
                Latest dispatch
              </span>
              <span className="text-xs text-stone-400">
                {latest.date} &middot; {latest.location}
              </span>
            </div>
            <p className="text-stone-700 text-sm leading-relaxed line-clamp-2">
              {latest.text}
            </p>
          </div>
          <div className="shrink-0 mt-1 text-stone-300 group-hover:text-sienna transition-colors">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
