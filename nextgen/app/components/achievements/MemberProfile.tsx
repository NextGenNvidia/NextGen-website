"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import AchievementBadge from "./AchievementBadge";
import type { MemberAchievement } from "./achievementsData";

interface MemberProfileProps {
  member: MemberAchievement;
  highlightedCategories: string[];
}

export default function MemberProfile({
  member,
  highlightedCategories,
}: MemberProfileProps) {
  const hasHighlight = highlightedCategories.length > 0;

  return (
    <div className="flex flex-col gap-5 py-2">
      {/* Name & Role */}
      <div>
        <motion.h3
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-black tracking-tight text-white mb-1"
        >
          {member.name}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-sm font-bold text-[#4DBC1B] tracking-wider uppercase"
        >
          {member.role}
        </motion.p>
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        viewport={{ once: true }}
        className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-md"
      >
        {member.description}
      </motion.p>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2"
      >
        {member.skills.map((skill) => (
          <span
            key={skill}
            className="text-[10px] font-mono font-bold tracking-wider text-gray-500 bg-white/[0.03] border border-white/10 rounded px-2 py-0.5 uppercase"
          >
            {skill}
          </span>
        ))}
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        viewport={{ once: true }}
        className="flex items-center gap-3"
      >
        {member.socials.github && (
          <a
            href={member.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-gray-400 hover:text-[#4DBC1B] hover:border-[#4DBC1B]/40 hover:bg-[#4DBC1B]/10 transition-all duration-300"
          >
            <Github className="w-4 h-4" />
          </a>
        )}
        {member.socials.linkedin && (
          <a
            href={member.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-gray-400 hover:text-[#4DBC1B] hover:border-[#4DBC1B]/40 hover:bg-[#4DBC1B]/10 transition-all duration-300"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
        {member.socials.email && (
          <a
            href={member.socials.email}
            className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-gray-400 hover:text-[#4DBC1B] hover:border-[#4DBC1B]/40 hover:bg-[#4DBC1B]/10 transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
          </a>
        )}
      </motion.div>

      {/* Achievement Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2 pt-2"
      >
        {member.outputs.map((output, idx) => {
          const isHighlighted =
            hasHighlight &&
            output.categories.some((c) => highlightedCategories.includes(c));
          const isDimmed = hasHighlight && !isHighlighted;

          return (
            <AchievementBadge
              key={output.id}
              label={output.label}
              icon={output.icon}
              index={idx}
              isHighlighted={isHighlighted}
              isDimmed={isDimmed}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
