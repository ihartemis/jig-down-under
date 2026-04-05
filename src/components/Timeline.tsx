"use client";

import { motion } from "motion/react";
import { stops, phaseColors, isCurrentStop, isStopVisited, getTripStatus } from "@/lib/itinerary";
import { useState, useEffect } from "react";

export default function Timeline() {
  const mainStops = stops.filter((s) => s.type !== "waypoint");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [tripStatus, setTripStatus] = useState<"before" | "during" | "after">("before");

  // Auto-expand current stop
  useEffect(() => {
    setTripStatus(getTripStatus());
    const current = mainStops.find((s) => isCurrentStop(s));
    if (current) setExpandedId(current.id);
  }, []);

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-teal via-bush to-plum opacity-20 hidden md:block" />

      <div className="space-y-5 md:space-y-6">
        {mainStops.map((stop, i) => {
          const phase = phaseColors[stop.phase];
          const isStay = stop.type === "stay";
          const isExpanded = expandedId === stop.id;
          const current = tripStatus === "during" && isCurrentStop(stop);
          const visited = tripStatus === "during" && isStopVisited(stop);
          const future = tripStatus === "during" && !current && !visited;

          return (
            <motion.div
              key={stop.id}
              className={`relative flex gap-4 md:gap-6 ${future ? "opacity-50" : ""}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: future ? 0.5 : 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.05 * (i % 6) }}
            >
              {/* Timeline dot */}
              <div className="hidden md:flex flex-col items-center pt-5">
                {current ? (
                  <span className="relative flex h-[12px] w-[12px] z-10">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sienna opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-[12px] w-[12px] bg-sienna ring-4 ring-cream"></span>
                  </span>
                ) : (
                <motion.div
                  className={`w-[10px] h-[10px] rounded-full ring-4 ring-cream flex-shrink-0 z-10 ${visited ? "opacity-60" : ""}`}
                  style={{ backgroundColor: phase?.color || "#9CA3AF" }}
                  whileInView={{ scale: [0, 1.3, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * (i % 6) }}
                />
                )}
              </div>

              {/* Card */}
              <motion.div
                className={`flex-1 rounded-xl transition-all cursor-pointer select-none ${
                  current
                    ? "bg-white shadow-md border-2 border-sienna/30 ring-1 ring-sienna/10"
                    : isStay || stop.phase === "flight"
                    ? "bg-white shadow-sm border border-stone-100"
                    : "bg-cream-50 border border-stone-100/50"
                }`}
                whileHover={
                  isStay
                    ? { y: -2, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }
                    : {}
                }
                onClick={() =>
                  setExpandedId(isExpanded ? null : stop.id)
                }
                layout
              >
                <div className="p-5 md:p-6">
                  {/* Current badge */}
                  {current && (
                    <div className="flex items-center gap-2 mb-3 text-sienna">
                      {stop.phase === "flight" ? (
                        <span className="text-sm animate-bounce">✈️</span>
                      ) : (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sienna opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-sienna"></span>
                        </span>
                      )}
                      <span className="text-xs font-bold tracking-widest uppercase">
                        {stop.phase === "flight" ? "In the air right now" : "We\u2019re here now"}
                      </span>
                    </div>
                  )}
                  {/* Visited badge */}
                  {visited && (
                    <div className="flex items-center gap-1.5 mb-2 text-bush/50">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2.5 6.5L5 9L9.5 3.5"/></svg>
                      <span className="text-xs font-semibold tracking-wide uppercase">Visited</span>
                    </div>
                  )}
                  {/* Date badge row */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <motion.span
                      className="inline-block text-xs font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: current ? "#C4653A" : (phase?.color || "#9CA3AF") }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {stop.dateShort}
                    </motion.span>
                    {stop.driveTime && (
                      <span className="text-xs text-stone-400 font-medium flex items-center gap-1">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        {stop.driveTime}
                      </span>
                    )}
                    {stop.nights > 0 && (
                      <span className="text-xs text-stone-400 flex items-center gap-1">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                        {stop.nights} night{stop.nights > 1 ? "s" : ""}
                      </span>
                    )}
                    {/* Expand indicator */}
                    {isStay && (
                      <motion.span
                        className="ml-auto text-stone-300"
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </motion.span>
                    )}
                  </div>

                  {/* Location */}
                  <h3 className="font-display text-xl md:text-2xl text-charcoal mb-1">
                    {stop.location}
                  </h3>
                  <p className="text-sm text-stone-400 italic mb-1">
                    {stop.region}
                  </p>

                  {/* Highlight — always visible */}
                  <p className="text-base text-stone-600 font-medium">
                    {stop.highlight}
                  </p>

                  {/* Details — expandable */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2 mt-4 pt-4 border-t border-stone-100">
                      {stop.details.map((d, j) => (
                        <motion.li
                          key={j}
                          className="text-sm text-stone-500 flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={
                            isExpanded
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -10 }
                          }
                          transition={{ delay: j * 0.05 }}
                        >
                          <span
                            className="mt-0.5 flex-shrink-0 text-xs"
                            style={{ color: phase?.color || "#9CA3AF" }}
                          >
                            &#9679;
                          </span>
                          {d}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
