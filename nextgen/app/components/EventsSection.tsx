"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring, animate, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  ExternalLink,
  ArrowUpRight,
  Clock,
  Cpu,
} from "lucide-react";
import AIArena from "./Assets1/AIArena.png";
import AISummit from "./Assets1/AISummit.png";
import NextGenInauguration from "./Assets1/NextGenInauguration.png";

// ─── Event Data Interface ───────────────────────────────────────────────────
interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  longDescription?: string;
  image: string;
  registrationLink?: string;
}

// ─── Event Data ─────────────────────────────────────────────────────────────
const events: EventItem[] = [
  {
    id: "ai-arena-2026",
    title: "AI Arena Hackathon 2026",
    category: "24-HOUR HACKATHON",
    date: "March 19-20, 2026",
    time: "11:00 AM - 11:00 AM",
    location: "Central Library",
    description:
      "The AI Arena: Gotham Edition is a 24-hour National Level Machine Learning Hackathon followed by an exclusive AI Summit featuring industry leaders and innovators.",
    longDescription:
      "The AI Arena: Gotham Edition is a 24-hour National Level Machine Learning Hackathon followed by an exclusive AI Summit featuring industry leaders and innovators. Student teams compete in building cutting-edge ML models and high-performance computing pipelines.",
    image: AIArena.src,
    registrationLink: "https://hackathon.nextgen-supercomputing.in/",
  },
  {
    id: "ai-summit-2026",
    title: "AI Summit 2026",
    category: "AI & ML SUMMIT",
    date: "March 20, 2026",
    time: "11:00 AM - 5:00 PM",
    location: "Auditorium",
    description:
      "AI Summit 2026 explored Responsible AI and digital transformation. Through expert panels and power talks, the event fostered industry-academia connections and prepared attendees for an AI-driven future.",
    longDescription:
      "AI Summit 2026 explored Responsible AI and digital transformation. Through expert panels and power talks, the event fostered industry-academia connections and prepared attendees for an AI-driven future.",
    image: AISummit.src,
    registrationLink: "https://aisummit2026.com",
  },
  {
    id: "nextgen-inauguration",
    title: "NextGen Supercomputing Inauguration",
    category: "FLAGSHIP LAUNCH",
    date: "November 6, 2025",
    time: "11:00 AM",
    location: "NextGen Supercomputing Lab",
    description:
      "The 𝐃𝐞𝐩𝐚𝐫𝐭𝐦𝐞𝐧𝐭 𝐨𝐟 𝐂𝐒𝐄 (𝐀𝐈 & 𝐀𝐈𝐌𝐋) proudly launched the 𝐍𝐞𝐱𝐭𝐆𝐞𝐧 𝐒𝐮𝐩𝐞𝐫𝐜𝐨𝐦𝐩𝐮𝐭𝐢𝐧𝐠 𝐂𝐥𝐮𝐛 on 𝟔𝐭𝐡 𝐍𝐨𝐯𝐞𝐦𝐛𝐞𝐫 𝟐𝟎𝟐𝟓, driven by the motto “𝐁𝐮𝐢𝐥𝐝𝐢𝐧𝐠 𝐏𝐫𝐨𝐝𝐮𝐜𝐭𝐢𝐨𝐧 𝐁𝐫𝐚𝐢𝐧𝐬”. Powered by the 𝐍𝐕𝐈𝐃𝐈𝐀 𝐃𝐆𝐗 𝐀𝟏𝟎𝟎 𝐒𝐮𝐩𝐞𝐫𝐜𝐨𝐦𝐩𝐮𝐭𝐞𝐫, one of the most advanced AI systems in academia, the club will fuel cutting-edge research in AI, ML, Generative AI, and High-Performance Computing.",
    longDescription:
      "The 𝐃𝐞𝐩𝐚𝐫𝐭𝐦𝐞𝐧𝐭 𝐨𝐟 𝐂𝐒𝐄 (𝐀𝐈 & 𝐀𝐈𝐌𝐋) proudly launched the 𝐍𝐞𝐱𝐭𝐆𝐞𝐧 𝐒𝐮𝐩𝐞𝐫𝐜𝐨𝐦𝐩𝐮𝐭𝐢𝐧𝐠 𝐂𝐥𝐮𝐛 on 𝟔𝐭𝐡 𝐍𝐨𝐯𝐞𝐦𝐛𝐞𝐫 𝟐𝟎𝟐𝟓, driven by the motto “𝐁𝐮𝐢𝐥𝐝𝐢𝐧𝐠 𝐏𝐫𝐨𝐝𝐮𝐜𝐭𝐢𝐨𝐧 𝐁𝐫𝐚𝐢𝐧𝐬”. Powered by the 𝐍𝐕𝐈𝐃𝐈𝐀 𝐃𝐆𝐗 𝐀𝟏𝟎𝟎 𝐒𝐮𝐩𝐞𝐫𝐜𝐨𝐦𝐩𝐮𝐭𝐞𝐫, one of the most advanced AI systems in academia, the club will fuel cutting-edge research in AI, ML, Generative AI, and High-Performance Computing.",
    image: NextGenInauguration.src,
    registrationLink:
      "https://www.linkedin.com/posts/kiet-deemed-to-be-university_kiet-nextgensupercomputingclub-generativeai-activity-7392887757292896256-vvW2?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF45N74BG7Wta5OrNwAt7QaKqgnqpgm-hSI",
  },
];

// ─── 3D Coverflow Card Component ─────────────────────────────────────────────
function CoverflowCard({
  event,
  index,
  activeIndex,
  total,
  reducedMotion,
  onSelect,
  onOpenModal,
}: {
  event: EventItem;
  index: number;
  activeIndex: number;
  total: number;
  reducedMotion: boolean;
  onSelect: (index: number) => void;
  onOpenModal: (event: EventItem) => void;
}) {
  // Compute circular offset (-1, 0, 1) relative to active index
  let offset = (index - activeIndex) % total;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;

  const isActive = offset === 0;
  const absOffset = Math.abs(offset);

  // Depth and Coverflow spacing
  const cardWidth = 360;
  const spacing = 320;
  const x = offset * spacing;
  const z = -absOffset * 180;
  const rotateY = offset * -28;
  const scale = isActive ? 1.05 : Math.max(0.78, 1 - absOffset * 0.15);
  const opacity = Math.max(0.25, 1 - absOffset * 0.4);
  const blur = isActive ? 0 : Math.min(3, absOffset * 2);
  const zIndex = Math.round(100 - absOffset * 10);

  const handleClick = () => {
    if (isActive) {
      onOpenModal(event);
    } else {
      onSelect(index);
    }
  };

  return (
    <motion.div
      className="absolute top-0 left-1/2 cursor-pointer select-none"
      onClick={handleClick}
      style={{
        width: "clamp(290px, 85vw, 380px)",
        marginLeft: "-190px",
        zIndex,
        transformStyle: "preserve-3d",
      }}
      animate={{
        x,
        z,
        scale,
        opacity,
        rotateY: reducedMotion ? 0 : rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 24,
        mass: 0.8,
      }}
    >
      <motion.div
        whileHover={isActive ? { y: -6 } : { scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className={`group relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 ${
          isActive
            ? "bg-[#0c0f0d]/90 border-2 border-[#4DBC1B] shadow-[0_0_50px_rgba(77,188,27,0.22),0_20px_40px_rgba(0,0,0,0.9)]"
            : "bg-[#090a09]/75 border border-white/10 hover:border-[#4DBC1B]/50 shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
        }`}
        style={{
          filter: blur > 0 && !reducedMotion ? `blur(${blur}px)` : undefined,
        }}
      >
        {/* Animated Active Top Laser Line */}
        {isActive && (
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4DBC1B] to-transparent z-30 animate-pulse" />
        )}

        {/* Ambient Top Glow on Active */}
        {isActive && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#4DBC1B]/20 rounded-full blur-2xl pointer-events-none" />
        )}

        {/* Corner Brackets */}
        <div
          className={`absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 rounded-tl transition-colors duration-500 z-20 ${
            isActive ? "border-[#4DBC1B]" : "border-white/20 group-hover:border-[#4DBC1B]/50"
          }`}
        />
        <div
          className={`absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 rounded-tr transition-colors duration-500 z-20 ${
            isActive ? "border-[#4DBC1B]" : "border-white/20 group-hover:border-[#4DBC1B]/50"
          }`}
        />
        <div
          className={`absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 rounded-bl transition-colors duration-500 z-20 ${
            isActive ? "border-[#4DBC1B]" : "border-white/20 group-hover:border-[#4DBC1B]/50"
          }`}
        />
        <div
          className={`absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 rounded-br transition-colors duration-500 z-20 ${
            isActive ? "border-[#4DBC1B]" : "border-white/20 group-hover:border-[#4DBC1B]/50"
          }`}
        />

        {/* ─── Card Image Header ──────────────────────────────────────── */}
        <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-black border-b border-white/5">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                isActive ? "scale-105" : "scale-100 group-hover:scale-105 opacity-70"
              }`}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
              <Cpu className="w-10 h-10 text-[#4DBC1B]/40" />
            </div>
          )}

          {/* Image Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0d] via-transparent to-black/60 pointer-events-none" />

          {/* Category Badge */}
          <div className="absolute top-3.5 left-3.5 z-10">
            <span
              className={`inline-flex items-center gap-1 text-[9px] font-extrabold tracking-widest uppercase rounded-full px-2.5 py-1 backdrop-blur-md transition-colors duration-500 ${
                isActive
                  ? "text-[#4DBC1B] border border-[#4DBC1B]/50 bg-black/70 shadow-[0_0_12px_rgba(77,188,27,0.3)]"
                  : "text-gray-300 border border-white/10 bg-black/60"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4DBC1B] animate-ping inline-block mr-0.5" />
              {event.category}
            </span>
          </div>

          {/* System Index Indicator */}
          <span
            className={`absolute top-3.5 right-3.5 text-[11px] font-mono font-bold tracking-widest z-10 px-2 py-0.5 rounded bg-black/60 border border-white/10 ${
              isActive ? "text-[#4DBC1B]" : "text-gray-500"
            }`}
          >
            SYS // 0{index + 1}
          </span>
        </div>

        {/* ─── Card Body ──────────────────────────────────────────────── */}
        <div className="p-5 sm:p-6 flex flex-col justify-between" style={{ minHeight: "220px" }}>
          <div>
            <h3
              className={`text-lg sm:text-xl font-black tracking-tight leading-snug mb-2.5 transition-colors duration-300 ${
                isActive ? "text-white group-hover:text-[#4DBC1B]" : "text-white/80"
              }`}
            >
              {event.title}
            </h3>

            {/* Date & Location Pill Tags */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-400 mb-3">
              <span className="inline-flex items-center gap-1.5 bg-white/[0.04] border border-white/5 px-2.5 py-1 rounded-lg text-gray-300">
                <Calendar className="w-3.5 h-3.5 text-[#4DBC1B]" />
                {event.date}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/[0.04] border border-white/5 px-2.5 py-1 rounded-lg text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-[#4DBC1B]" />
                {event.location}
              </span>
            </div>

            {/* Description Snippet */}
            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">
              {event.description}
            </p>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#4DBC1B] flex items-center gap-1 group-hover:underline">
              {isActive ? "Click to View Details" : "Switch to Event"}
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>

            <div className="flex gap-1 items-center">
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#4DBC1B]" : "bg-white/20"}`} />
              <span className={`w-3 h-0.5 rounded-full ${isActive ? "bg-[#4DBC1B]" : "bg-white/20"}`} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function EventsSection() {
  const total = events.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragDistance = useRef(0);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedEvent(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const normalized = ((index % total) + total) % total;
      setActiveIndex(normalized);
    },
    [total]
  );

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedEvent) return;
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, selectedEvent]);

  // Mouse wheel scroll support with debouncing
  useEffect(() => {
    const el = containerRef.current;
    if (!el || selectedEvent) return;
    let timeout: NodeJS.Timeout;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > 25 || Math.abs(e.deltaY) > 25) {
        e.preventDefault();
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (e.deltaX > 20 || e.deltaY > 20) goNext();
          else if (e.deltaX < -20 || e.deltaY < -20) goPrev();
        }, 60);
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      clearTimeout(timeout);
    };
  }, [goNext, goPrev, selectedEvent]);

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragDistance.current = 0;
    dragStartX.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    dragDistance.current = e.clientX - dragStartX.current;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragDistance.current < -40) {
      goNext();
    } else if (dragDistance.current > 40) {
      goPrev();
    }
  };

  // Touch gestures for mobile
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    if (diff < -45) goNext();
    else if (diff > 45) goPrev();
  };

  return (
    <section id="events" className="relative bg-black py-20 md:py-32 px-4 md:px-8 overflow-hidden select-none">
      {/* Background Cyber Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f3b14_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#4DBC1B]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-16 md:mb-20"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#4DBC1B]/30 bg-[#4DBC1B]/5 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#4DBC1B]" />
          <span className="text-[#4DBC1B] text-[11px] font-bold tracking-[0.25em] uppercase">
            Campus Initiatives & Workshops
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
          LATEST EVENTS <span className="text-[#4DBC1B] drop-shadow-[0_0_25px_rgba(77,188,27,0.5)]">CONDUCTED</span>
        </h2>
      </motion.div>

      {/* ─── 3D Coverflow Container ────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative max-w-6xl mx-auto cursor-grab active:cursor-grabbing"
        style={{
          perspective: "1400px",
          perspectiveOrigin: "50% 40%",
          height: "460px",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
          {events.map((event, i) => (
            <CoverflowCard
              key={event.id}
              event={event}
              index={i}
              activeIndex={activeIndex}
              total={total}
              reducedMotion={reducedMotion}
              onSelect={(idx) => goTo(idx)}
              onOpenModal={(evt) => setSelectedEvent(evt)}
            />
          ))}
        </div>
      </div>

      {/* ─── Navigation Controls ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between max-w-lg mx-auto mt-8 md:mt-12 px-4">
        {/* Counter */}
        <div className="flex items-center gap-2 font-mono">
          <span className="text-[#4DBC1B] font-bold text-xl tabular-nums drop-shadow-[0_0_10px_rgba(77,188,27,0.5)]">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-zinc-600 text-sm">/ {String(total).padStart(2, "0")}</span>
        </div>

        {/* Interactive Segment Bar Indicator */}
        <div className="flex items-center gap-2">
          {events.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to event ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-400 ${
                i === activeIndex
                  ? "w-8 bg-[#4DBC1B] shadow-[0_0_12px_rgba(77,188,27,0.6)]"
                  : "w-2 bg-zinc-800 hover:bg-zinc-600"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next Action Buttons */}
        <div className="flex items-center gap-2.5">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={goPrev}
            aria-label="Previous event"
            className="w-10 h-10 rounded-full border border-[#4DBC1B]/40 bg-zinc-950/80 flex items-center justify-center text-[#4DBC1B] hover:bg-[#4DBC1B] hover:text-black transition-all shadow-[0_0_15px_rgba(77,188,27,0.15)]"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={goNext}
            aria-label="Next event"
            className="w-10 h-10 rounded-full border border-[#4DBC1B]/40 bg-zinc-950/80 flex items-center justify-center text-[#4DBC1B] hover:bg-[#4DBC1B] hover:text-black transition-all shadow-[0_0_15px_rgba(77,188,27,0.15)]"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* ─── ENHANCED EVENT MODAL (FIXED & SCROLLABLE WITH ALWAYS VISIBLE ACTIONS) ─── */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
              className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-[#0d0f0d] border border-[#4DBC1B]/40 shadow-[0_0_80px_rgba(77,188,27,0.25)] overflow-hidden"
            >
              {/* Top Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#4DBC1B]/15 blur-3xl pointer-events-none" />

              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-2xl border-[#4DBC1B] z-30 pointer-events-none" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-2xl border-[#4DBC1B] z-30 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-2xl border-[#4DBC1B] z-30 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-2xl border-[#4DBC1B] z-30 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 border border-white/20 hover:border-[#4DBC1B] hover:text-[#4DBC1B] flex items-center justify-center text-gray-300 transition-colors z-40 backdrop-blur-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* 📜 Scrollable Content Body */}
              <div
                data-lenis-prevent="true"
                className="flex-1 overflow-y-auto p-5 sm:p-7 md:p-8 overscroll-contain"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {/* Image Banner */}
                {selectedEvent.image && selectedEvent.image.trim() !== "" ? (
                  <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden mb-5 border border-white/10 bg-black flex items-center justify-center p-2 shadow-inner">
                    <img
                      src={selectedEvent.image}
                      alt={selectedEvent.title}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f0d]/90 via-transparent to-transparent pointer-events-none" />
                  </div>
                ) : null}

                {/* Category Tag */}
                <div className="mb-2.5">
                  <span className="text-[9px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full text-[#4DBC1B] border border-[#4DBC1B]/40 bg-[#4DBC1B]/10">
                    {selectedEvent.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
                  {selectedEvent.title}
                </h2>

                {/* Metadata Badges */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400 mb-5 bg-white/[0.03] border border-white/5 px-3 py-2 rounded-xl w-fit">
                  <span className="flex items-center gap-1.5 text-gray-200 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#4DBC1B]" />
                    {selectedEvent.date}
                  </span>
                  {selectedEvent.time && (
                    <>
                      <span className="h-2.5 w-px bg-white/20" />
                      <span className="flex items-center gap-1.5 text-gray-200 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#4DBC1B]" />
                        {selectedEvent.time}
                      </span>
                    </>
                  )}
                  <span className="h-2.5 w-px bg-white/20" />
                  <span className="flex items-center gap-1.5 text-gray-200 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#4DBC1B]" />
                    {selectedEvent.location}
                  </span>
                </div>

                {/* Overview Text */}
                <div className="space-y-2 mb-2">
                  <h4 className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                    Event Overview
                  </h4>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {selectedEvent.longDescription || selectedEvent.description}
                  </p>
                </div>
              </div>

              {/* 📌 Sticky Footer Actions */}
              <div className="relative z-30 px-5 sm:px-7 md:px-8 py-4 bg-[#090b09] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                {selectedEvent.registrationLink ? (
                  <a
                    href={selectedEvent.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#4DBC1B] text-black font-extrabold text-xs tracking-wider uppercase hover:bg-[#5dd420] transition-colors shadow-[0_0_20px_rgba(77,188,27,0.4)] cursor-pointer"
                  >
                    <span>Visit Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span />
                )}

                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 text-xs font-bold transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}