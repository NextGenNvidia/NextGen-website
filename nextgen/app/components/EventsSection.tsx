"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

const events: EventItem[] = [
  {
    id: "ai-summit",
    title: "AI Summit 2024",
    category: "ANNUAL CONFERENCE",
    date: "Jan 20, 2024",
    location: "Bangalore",
    description: "Join industry leaders and researchers for a deep dive into the latest advancements in Artificial Intelligence.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "hpc-workshop",
    title: "HPC Workshop",
    category: "HANDS-ON TRAINING",
    date: "Mar 15, 2024",
    location: "New Delhi",
    description: "Master the art of High Performance Computing with our intensive weekend workshop.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "hackathon",
    title: "Hackathon 2024",
    category: "24-HOUR BUILD",
    date: "May 10, 2024",
    location: "Online",
    description: "Collaborate, innovate, and build amazing projects in our annual 24-hour coding marathon.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "research-symposium",
    title: "Research Symposium",
    category: "PAPER PRESENTATIONS",
    date: "Jul 22, 2024",
    location: "New Delhi",
    description: "Students and faculty present groundbreaking research papers on cutting-edge topics.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "gpu-programming",
    title: "GPU Programming",
    category: "CUDA WORKSHOP",
    date: "Sep 05, 2024",
    location: "Online",
    description: "Learn to harness the power of GPUs for massive parallel processing tasks.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "cloud-summit",
    title: "Cloud Summit",
    category: "INFRASTRUCTURE TALK",
    date: "Nov 12, 2024",
    location: "Hybrid",
    description: "Explore the future of cloud infrastructure and scalable supercomputing solutions.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
  },
];

// Highly optimized CoverFlow Card - Zero backdrop-filter or heavy CSS filters
const CoverFlowCard = memo(function CoverFlowCard({
  event,
  index,
  activeIndex,
  onSelect,
}: {
  event: EventItem;
  index: number;
  activeIndex: number;
  onSelect: (idx: number) => void;
}) {
  const offset = index - activeIndex;
  const absOffset = Math.abs(offset);
  const isActive = offset === 0;

  // Render only visible window (-2 to 2)
  if (absOffset > 2) return null;

  const cardWidth = 300;
  const spacing = 180;

  const translateX = offset * spacing;
  const translateZ = isActive ? 50 : -absOffset * 140;
  let rotateY = 0;
  let opacity = 1;
  let scale = 1;

  if (offset < 0) {
    rotateY = 38;
    opacity = 1 - absOffset * 0.3;
    scale = 0.86;
  } else if (offset > 0) {
    rotateY = -38;
    opacity = 1 - absOffset * 0.3;
    scale = 0.86;
  } else {
    scale = 1.1;
    opacity = 1;
  }

  const zIndex = 100 - absOffset * 10;

  return (
    <motion.div
      onClick={() => onSelect(index)}
      className="absolute top-0 left-1/2 cursor-pointer select-none"
      style={{
        width: `${cardWidth}px`,
        marginLeft: `-${cardWidth / 2}px`,
        zIndex,
        willChange: "transform, opacity",
      }}
      animate={{
        x: translateX,
        z: translateZ,
        rotateY: rotateY,
        scale: scale,
        opacity: opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 24,
      }}
    >
      {/* Crisp High-Performance Card Container (No backdrop-blur for max FPS) */}
      <div
        className={`relative rounded-2xl overflow-hidden transition-colors duration-300 border ${
          isActive
            ? "bg-[#111111] border-[#4DBC1B] shadow-[0_0_35px_rgba(77,188,27,0.25)]"
            : "bg-[#0a0a0a] border-white/10 hover:border-[#4DBC1B]/40"
        }`}
      >
        {/* Image */}
        <div className="relative h-44 w-full overflow-hidden bg-gray-900">
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />

          <div className="absolute top-3 left-3">
            <span
              className={`text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full border ${
                isActive
                  ? "text-[#4DBC1B] border-[#4DBC1B]/40 bg-black/80"
                  : "text-gray-300 border-white/10 bg-black/70"
              }`}
            >
              {event.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col min-h-[180px]">
          <h3
            className={`text-xl font-bold tracking-tight mb-2 ${
              isActive ? "text-white" : "text-gray-300"
            }`}
          >
            {event.title}
          </h3>

          <div className="flex items-center gap-3 text-xs text-gray-400 mb-2.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#4DBC1B]" />
              {event.date}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#4DBC1B]" />
              {event.location}
            </span>
          </div>

          <p
            className={`text-xs leading-relaxed flex-1 line-clamp-2 ${
              isActive ? "text-gray-300" : "text-gray-500"
            }`}
          >
            {event.description}
          </p>

          {isActive && (
            <div className="mt-4 pt-3 border-t border-[#4DBC1B]/20 flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#4DBC1B] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
              <button className="px-3.5 py-1.5 rounded-full text-xs font-bold text-black bg-[#4DBC1B] hover:bg-[#5dd420] transition-colors flex items-center gap-1">
                Details
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default function EventsSection() {
  // Default centered event on page load: Research Symposium (index 3)
  const [activeIndex, setActiveIndex] = useState<number>(3);
  const totalEvents = events.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalEvents);
  }, [totalEvents]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalEvents) % totalEvents);
  }, [totalEvents]);

  // Keyboard navigation only
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section id="events" className="relative bg-black py-20 md:py-32 px-4 overflow-hidden select-none">
      {/* Light background grid */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(77, 188, 27, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(77, 188, 27, 0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header */}
      <div className="relative z-10 text-center mb-12 md:mb-16 max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-white mb-4"
        >
          LATEST EVENTS <span className="text-[#4DBC1B] text-glow">CONDUCTED</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light"
        >
          Exploring the frontiers of technology through workshops, hackathons, and seminars.
        </motion.p>
      </div>

      {/* 3D Cover Flow Viewport */}
      <div
        className="relative z-10 max-w-6xl mx-auto h-[440px] flex items-center justify-center"
        style={{
          perspective: "1000px",
        }}
      >
        <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
          {events.map((event, index) => (
            <CoverFlowCard
              key={event.id}
              event={event}
              index={index}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 max-w-md mx-auto mt-6 flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-[#4DBC1B]/40 bg-black flex items-center justify-center text-[#4DBC1B] hover:bg-[#4DBC1B]/20 transition-colors"
            aria-label="Previous event"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black border border-white/10">
            {events.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-200 rounded-full ${
                  idx === activeIndex
                    ? "w-6 h-2 bg-[#4DBC1B]"
                    : "w-2 h-2 bg-white/20 hover:bg-white/50"
                }`}
                aria-label={`Go to event ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-[#4DBC1B]/40 bg-black flex items-center justify-center text-[#4DBC1B] hover:bg-[#4DBC1B]/20 transition-colors"
            aria-label="Next event"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
