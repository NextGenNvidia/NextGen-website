"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AchievementHero() {
  return (
    <section className="relative z-10 pt-32 md:pt-40 pb-12 md:pb-16 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#4DBC1B]/30 bg-[#4DBC1B]/10 text-[#4DBC1B] text-xs font-bold tracking-widest uppercase mb-5"
      >
        <Sparkles className="w-3.5 h-3.5" />
        Neural Achievement Network
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
          <span className="text-white">ACHIEVE</span>
          <span className="text-[#4DBC1B] text-glow">MENTS</span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-gray-400 text-base md:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Recognizing the students pushing the boundaries of Artificial
          Intelligence, High Performance Computing, Open Source and Research.
        </motion.p>
      </motion.div>

      {/* Decorative scan line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 max-w-2xl mx-auto"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-[#4DBC1B]/30 to-transparent" />
      </motion.div>
    </section>
  );
}
