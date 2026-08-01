"use client";

import { useState, useEffect, Fragment } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InteractiveDotGrid from "../components/InteractiveDotGrid";
import AchievementHero from "../components/achievements/AchievementHero";
import AchievementCard from "../components/achievements/AchievementCard";
import AchievementCTA from "../components/achievements/AchievementCTA";
import NeuralDivider from "../components/achievements/NeuralDivider";
import { achievementsData } from "../components/achievements/achievementsData";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useScrollContext } from "../components/SmoothScrollProvider";

export default function AchievementsPage() {
  const { scrollTo } = useScrollContext();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#4DBC1B]/30 relative">
      <Navbar />

      {/* Background: Interactive dot grid */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <InteractiveDotGrid startAnimation={true} />
      </div>

      {/* Background: Subtle grid overlay */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(77,188,27,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(77,188,27,0.4) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Background: Scan lines */}
      <div className="fixed inset-0 z-0 pointer-events-none achievements-scanlines" />

      {/* Background: Ambient glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#4DBC1B]/[0.04] rounded-full blur-[180px] pointer-events-none z-0" />

      {/* Hero Section */}
      <AchievementHero />

      {/* Achievement Cards */}
      <section className="relative z-10 px-4 md:px-8 pb-12 max-w-[1500px] mx-auto">
        {achievementsData.map((member, index) => (
          <Fragment key={member.id}>
            <AchievementCard member={member} index={index} />
            {index < achievementsData.length - 1 && <NeuralDivider />}
          </Fragment>
        ))}
      </section>

      {/* CTA Section */}
      <AchievementCTA />

      <Footer />

      {/* Scroll-to-top button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => scrollTo(0, { duration: 1.4 })}
            className="fixed bottom-8 right-6 z-50 p-3 rounded-full bg-[#4DBC1B]/20 border border-[#4DBC1B]/50 text-[#4DBC1B] hover:bg-[#4DBC1B]/30 hover:shadow-[0_0_20px_rgba(77,188,27,0.4)] transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
