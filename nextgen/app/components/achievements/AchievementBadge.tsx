"use client";

import { motion } from "framer-motion";
import {
  Code2,
  BookOpen,
  FileText,
  Users,
  Mic,
  Cpu,
  Trophy,
  Award,
  GitBranch,
  Cloud,
  Star,
  Crown,
  Calendar,
  Handshake,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  BookOpen,
  FileText,
  Users,
  Mic,
  Cpu,
  Trophy,
  Award,
  GitBranch,
  Cloud,
  Star,
  Crown,
  Calendar,
  Handshake,
};

interface AchievementBadgeProps {
  label: string;
  icon: string;
  index: number;
  isHighlighted?: boolean;
  isDimmed?: boolean;
}

export default function AchievementBadge({
  label,
  icon,
  index,
  isHighlighted = false,
  isDimmed = false,
}: AchievementBadgeProps) {
  const IconComponent = iconMap[icon] || Award;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.6 + index * 0.08 }}
      viewport={{ once: true }}
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
        isHighlighted
          ? "bg-[#4DBC1B]/20 border border-[#4DBC1B]/60 text-[#4DBC1B] shadow-[0_0_15px_rgba(77,188,27,0.3)]"
          : isDimmed
          ? "bg-white/[0.02] border border-white/5 text-gray-600"
          : "bg-[#4DBC1B]/10 border border-[#4DBC1B]/30 text-[#4DBC1B] hover:border-[#4DBC1B]/60 hover:shadow-[0_0_15px_rgba(77,188,27,0.3)]"
      }`}
    >
      <IconComponent className="w-3.5 h-3.5" />
      {label}
    </motion.span>
  );
}
