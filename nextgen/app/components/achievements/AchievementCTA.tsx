"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AchievementCTA() {
  return (
    <section className="relative z-10 py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative top line */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#4DBC1B]/30 to-transparent mb-16" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            <span className="text-white">YOUR NEXT ACHIEVEMENT</span>
            <br />
            <span className="text-[#4DBC1B] text-glow">STARTS HERE</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Join NextGen Supercomputing and contribute to cutting-edge research,
          open source, AI, machine learning, and high-performance computing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="px-8 py-3 text-sm font-bold text-black bg-[#4DBC1B] rounded-md hover:bg-[#5dd420] hover:shadow-[0_0_25px_rgba(77,188,27,0.4)] transition-all duration-300 hover:scale-[1.02] tracking-wider uppercase"
          >
            Join NextGen
          </Link>
          <Link
            href="/"
            className="px-8 py-3 text-sm font-bold text-[#4DBC1B] border border-[#4DBC1B]/60 rounded-md hover:bg-[#4DBC1B]/10 hover:border-[#4DBC1B] hover:shadow-[0_0_20px_rgba(77,188,27,0.25)] transition-all duration-300 hover:scale-[1.02] tracking-wider uppercase"
          >
            View Projects
          </Link>
        </motion.div>

        {/* Decorative bottom line */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#4DBC1B]/30 to-transparent mt-16" />
      </div>
    </section>
  );
}
