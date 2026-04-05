"use client";

import { motion } from "motion/react";
import { updates } from "@/lib/updates";

export default function Updates() {
  if (updates.length === 0) return null;

  return (
    <div className="space-y-6">
      {updates.map((update, i) => (
        <motion.article
          key={update.id}
          className="bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
        >
          {update.photo && (
            <div className="aspect-video relative overflow-hidden">
              <img
                src={update.photo}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-block text-xs font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-sienna/10 text-sienna">
                {update.date}
              </span>
              <span className="text-xs text-stone-400 font-medium flex items-center gap-1">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {update.location}
              </span>
            </div>
            <p className="text-stone-700 leading-relaxed text-base">
              {update.text}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
