"use client";

import { motion } from "framer-motion";

export default function NeuralDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex flex-col items-center py-4 md:py-6"
    >
      {/* Top node */}
      <div className="w-2 h-2 rounded-full bg-[#4DBC1B]/40" />

      {/* Animated pulse line */}
      <div className="relative w-px h-16 md:h-20 overflow-hidden">
        {/* Static line */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#4DBC1B]/30 via-[#4DBC1B]/10 to-[#4DBC1B]/30" />

        {/* Moving pulse */}
        <div className="absolute w-full h-8 neural-divider-pulse bg-gradient-to-b from-transparent via-[#4DBC1B]/80 to-transparent" />
      </div>

      {/* Bottom node */}
      <div className="w-2 h-2 rounded-full bg-[#4DBC1B]/40" />
    </motion.div>
  );
}
