"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import NeuralNetworkVisualization from "./NeuralNetworkVisualization";
import MemberProfile from "./MemberProfile";
import type { MemberAchievement } from "./achievementsData";

// Scroll entrance directions for alternating cards
const scrollVariants = [
  { initial: { opacity: 0, x: -80, y: 0 }, label: "left" },
  { initial: { opacity: 0, x: 80, y: 0 }, label: "right" },
  { initial: { opacity: 0, x: 0, y: 60 }, label: "up" },
  { initial: { opacity: 0, x: 0, y: -60 }, label: "down" },
];

interface AchievementCardProps {
  member: MemberAchievement;
  index: number;
}

export default function AchievementCard({ member, index }: AchievementCardProps) {
  const [highlightedCategories, setHighlightedCategories] = useState<string[]>([]);

  const handleHoverCategories = useCallback((categories: string[]) => {
    setHighlightedCategories(categories);
  }, []);

  const variant = scrollVariants[index % scrollVariants.length];

  return (
    <motion.div
      initial={variant.initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-80px" }}
      className="w-full max-w-[1400px] mx-auto"
    >
      <div className="group relative overflow-hidden rounded-2xl border border-[#4DBC1B]/20 bg-white/[0.02] backdrop-blur-xl hover:border-[#4DBC1B]/40 hover:shadow-[0_0_40px_rgba(77,188,27,0.15)] transition-all duration-500 hover:-translate-y-1">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(77,188,27,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(77,188,27,0.5) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Radial glow behind card */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#4DBC1B]/[0.04] rounded-full blur-[100px] pointer-events-none group-hover:bg-[#4DBC1B]/[0.08] transition-all duration-700" />

        {/* Content grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left: Neural Network Visualization */}
          <div className="p-6 md:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#4DBC1B]/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4DBC1B] animate-pulse" />
              <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#4DBC1B]/70 uppercase">
                Neural Inference Graph
              </span>
            </div>
            <NeuralNetworkVisualization
              memberName={member.name}
              inputs={member.inputs}
              outputs={member.outputs}
              onHoverCategories={handleHoverCategories}
            />
          </div>

          {/* Right: Member Profile */}
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4DBC1B] animate-pulse" />
              <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#4DBC1B]/70 uppercase">
                Member Profile
              </span>
            </div>
            <MemberProfile
              member={member}
              highlightedCategories={highlightedCategories}
            />
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="relative z-10 flex items-center justify-between px-6 md:px-10 py-3 border-t border-[#4DBC1B]/10 bg-black/30">
          <span className="text-[9px] font-mono tracking-[0.2em] text-gray-600 uppercase">
            ID: {member.id}
          </span>
          <span className="text-[9px] font-mono tracking-[0.2em] text-gray-600 uppercase">
            Nodes: {member.inputs.length} → 1 → {member.outputs.length}
          </span>
          <span className="flex items-center gap-1.5 text-[9px] font-mono tracking-[0.2em] text-[#4DBC1B]/60 uppercase">
            <span className="w-1 h-1 rounded-full bg-[#4DBC1B]/60" />
            Active
          </span>
        </div>
      </div>
    </motion.div>
  );
}
