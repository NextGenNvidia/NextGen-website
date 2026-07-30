"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Project Data ───────────────────────────────────────────────────────────
const projects = [
    {
        title: "Omnitrix",
        description: "App for athletes for their correct physical training without human intervention.",
        tag: "Health & AI",
    },
    {
        title: "Neptune Nexus",
        description: "Ocean data analysis using a conversational AI chatbot.",
        tag: "Data & Environment",
    },
    {
        title: "Rockfall Prediction",
        description: "Message alert system for rockfall prediction in hill areas to keep communities safe.",
        tag: "Safety & ML",
    },
    {
        title: "CodeGamma",
        description: "Pashuseva is an AI- and ML-powered platform for managing and monitoring MRL and AMU to support rural development.",
        tag: "AgriTech & AI",
    },
    {
        title: "JanMitr",
        description: "Crowdsourced civic issue reporting and resolution system connecting citizens with local governance.",
        tag: "GovTech & Community",
    },
    {
        title: "TechYodhaas",
        description: "Digitize and showcase monasteries of Sikkim for tourism and cultural preservation.",
        tag: "Heritage & Tech",
    },
    {
        title: "HerbCollectors",
        description: "A blockchain-based system for botanical traceability of Ayurvedic herbs — from farmer to final formulation label.",
        tag: "Blockchain & Health",
    },
    {
        title: "Nivaran",
        description: "Crowdsourced civic issue reporting and resolution system empowering communities to solve local problems.",
        tag: "GovTech & Community",
    },
];

// ─── 3D Carousel Card ──────────────────────────────────────────────────────
function CarouselCard({
    project,
    index,
    activeIndex,
    total,
    rotation,
    reducedMotion,
}: {
    project: (typeof projects)[0];
    index: number;
    activeIndex: number;
    total: number;
    rotation: number;
    reducedMotion: boolean;
}) {
    const anglePerCard = 360 / total;
    const cardAngle = anglePerCard * index + rotation;

    // Normalize angle to -180..180
    let normalizedAngle = ((cardAngle % 360) + 540) % 360 - 180;

    // Distance from front (0°)
    const absAngle = Math.abs(normalizedAngle);

    // Depth & scale based on angular distance
    const radius = 420;
    const x = Math.sin((normalizedAngle * Math.PI) / 180) * radius;
    const z = Math.cos((normalizedAngle * Math.PI) / 180) * radius - radius;

    const isActive = index === activeIndex;
    const scale = isActive ? 1.08 : Math.max(0.6, 1 - absAngle / 300);
    const opacity = Math.max(0.15, 1 - absAngle / 200);
    const blur = isActive ? 0 : Math.min(2, absAngle / 120);
    const zIndex = Math.round(1000 - absAngle);

    // Float animation offset (subtle)
    const floatOffset = reducedMotion ? 0 : undefined;

    return (
        <motion.div
            className="absolute top-0 left-1/2"
            style={{
                width: "clamp(280px, 80vw, 360px)",
                zIndex,
                transformStyle: "preserve-3d",
            }}
            animate={{
                x: x - 180,
                y: floatOffset,
                scale,
                opacity,
                rotateY: normalizedAngle * 0.3,
            }}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 25,
                mass: 0.8,
            }}
        >
            <motion.div
                animate={
                    !reducedMotion && isActive
                        ? { y: [0, -6, 0] }
                        : {}
                }
                transition={
                    !reducedMotion && isActive
                        ? { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                        : {}
                }
            >
                <div
                    className={`relative rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-500 ${
                        isActive
                            ? "bg-[#0d0d0d]/90 border border-[#4DBC1B]/50 shadow-[0_0_60px_rgba(77,188,27,0.15),0_8px_32px_rgba(0,0,0,0.8)]"
                            : "bg-[#0a0a0a]/70 border border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                    }`}
                    style={{
                        filter: blur > 0 ? `blur(${blur}px)` : undefined,
                        minHeight: "280px",
                    }}
                >
                    {/* Active glow pulse */}
                    {isActive && !reducedMotion && (
                        <motion.div
                            className="absolute inset-0 rounded-2xl pointer-events-none"
                            animate={{
                                boxShadow: [
                                    "inset 0 0 30px rgba(77,188,27,0.05)",
                                    "inset 0 0 50px rgba(77,188,27,0.1)",
                                    "inset 0 0 30px rgba(77,188,27,0.05)",
                                ],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                    )}

                    {/* Gradient border overlay on hover/active */}
                    {isActive && (
                        <div
                            className="absolute inset-0 rounded-2xl pointer-events-none"
                            style={{
                                background: "linear-gradient(135deg, rgba(77,188,27,0.15) 0%, transparent 40%, transparent 60%, rgba(77,188,27,0.08) 100%)",
                            }}
                        />
                    )}

                    {/* Subtle grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.02] pointer-events-none"
                        style={{
                            backgroundImage: "linear-gradient(rgba(77,188,27,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(77,188,27,0.5) 1px, transparent 1px)",
                            backgroundSize: "30px 30px",
                        }}
                    />

                    {/* Corner brackets */}
                    <div className={`absolute top-0 left-0 w-6 h-6 border-t border-l rounded-tl-2xl transition-colors duration-500 ${isActive ? "border-[#4DBC1B]/50" : "border-[#4DBC1B]/15"}`} />
                    <div className={`absolute top-0 right-0 w-6 h-6 border-t border-r rounded-tr-2xl transition-colors duration-500 ${isActive ? "border-[#4DBC1B]/50" : "border-[#4DBC1B]/15"}`} />
                    <div className={`absolute bottom-0 left-0 w-6 h-6 border-b border-l rounded-bl-2xl transition-colors duration-500 ${isActive ? "border-[#4DBC1B]/50" : "border-[#4DBC1B]/15"}`} />
                    <div className={`absolute bottom-0 right-0 w-6 h-6 border-b border-r rounded-br-2xl transition-colors duration-500 ${isActive ? "border-[#4DBC1B]/50" : "border-[#4DBC1B]/15"}`} />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full p-6 md:p-8" style={{ minHeight: "280px" }}>
                        {/* Tag */}
                        <span className={`inline-block text-[10px] font-bold tracking-widest uppercase rounded-full px-3 py-1 mb-5 self-start transition-colors duration-500 ${
                            isActive
                                ? "text-[#4DBC1B] border border-[#4DBC1B]/30 bg-[#4DBC1B]/5"
                                : "text-[#4DBC1B]/50 border border-[#4DBC1B]/10"
                        }`}>
                            {project.tag}
                        </span>

                        {/* Index number watermark */}
                        <span className={`absolute top-4 right-6 text-6xl font-black select-none leading-none transition-colors duration-500 ${
                            isActive ? "text-[#4DBC1B]/12" : "text-[#4DBC1B]/5"
                        }`}>
                            {String(projects.indexOf(project) + 1).padStart(2, "0")}
                        </span>

                        <h3 className={`text-xl md:text-2xl font-black tracking-tight mb-3 transition-colors duration-500 ${
                            isActive ? "text-white" : "text-white/70"
                        }`}>
                            {project.title}
                        </h3>

                        <p className={`text-sm leading-relaxed flex-1 transition-colors duration-500 ${
                            isActive ? "text-gray-300" : "text-gray-500"
                        }`}>
                            {project.description}
                        </p>

                        {/* Active indicator line */}
                        <motion.div
                            className="mt-5 h-[2px] rounded-full bg-gradient-to-r from-[#4DBC1B] to-[#4DBC1B]/0"
                            animate={{ width: isActive ? "60%" : "0%" }}
                            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function ProjectsSection() {
    const total = projects.length;
    const anglePerCard = 360 / total;

    const [activeIndex, setActiveIndex] = useState(0);
    const rotationValue = useMotionValue(0);
    const smoothRotation = useSpring(rotationValue, { stiffness: 100, damping: 22, mass: 0.6 });
    const [currentRotation, setCurrentRotation] = useState(0);
    const [reducedMotion, setReducedMotion] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragStartRotation = useRef(0);

    // Check prefers-reduced-motion
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    // Compute active index from rotation
    useEffect(() => {
        const unsubscribe = smoothRotation.on("change", (v) => {
            setCurrentRotation(v);
            // Closest card to front
            const idx = Math.round((-v / anglePerCard) % total);
            setActiveIndex(((idx % total) + total) % total);
        });
        return unsubscribe;
    }, [smoothRotation, anglePerCard, total]);

    const goTo = useCallback((index: number) => {
        const targetRotation = -index * anglePerCard;
        // Find shortest path
        const current = rotationValue.get();
        const diff = targetRotation - current;
        const normalizedDiff = ((diff % 360) + 540) % 360 - 180;
        animate(rotationValue, current + normalizedDiff, {
            type: "spring",
            stiffness: 100,
            damping: 22,
            mass: 0.6,
        });
    }, [anglePerCard, rotationValue]);

    const goNext = useCallback(() => {
        const nextIdx = (activeIndex + 1) % total;
        goTo(nextIdx);
    }, [activeIndex, total, goTo]);

    const goPrev = useCallback(() => {
        const prevIdx = (activeIndex - 1 + total) % total;
        goTo(prevIdx);
    }, [activeIndex, total, goTo]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") goNext();
            else if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goNext, goPrev]);

    // Mouse wheel
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        let timeout: NodeJS.Timeout;
        const handleWheel = (e: WheelEvent) => {
            // Only respond when section is visible and scroll is horizontal-ish
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || Math.abs(e.deltaY) > 30) {
                e.preventDefault();
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    if (e.deltaX > 20 || e.deltaY > 20) goNext();
                    else if (e.deltaX < -20 || e.deltaY < -20) goPrev();
                }, 50);
            }
        };
        el.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            el.removeEventListener("wheel", handleWheel);
            clearTimeout(timeout);
        };
    }, [goNext, goPrev]);

    // Mouse drag
    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        isDragging.current = true;
        dragStartX.current = e.clientX;
        dragStartRotation.current = rotationValue.get();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }, [rotationValue]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDragging.current) return;
        const dx = e.clientX - dragStartX.current;
        const sensitivity = 0.3;
        rotationValue.set(dragStartRotation.current + dx * sensitivity);
    }, [rotationValue]);

    const handlePointerUp = useCallback(() => {
        if (!isDragging.current) return;
        isDragging.current = false;
        // Snap to nearest card
        const current = rotationValue.get();
        const nearestIdx = Math.round(-current / anglePerCard);
        const normalizedIdx = ((nearestIdx % total) + total) % total;
        goTo(normalizedIdx);
    }, [rotationValue, anglePerCard, total, goTo]);

    // Touch swipe (mobile momentum)
    const touchStart = useRef({ x: 0, time: 0 });
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStart.current = { x: e.touches[0].clientX, time: Date.now() };
        dragStartRotation.current = rotationValue.get();
    }, [rotationValue]);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        const dx = e.touches[0].clientX - touchStart.current.x;
        rotationValue.set(dragStartRotation.current + dx * 0.3);
    }, [rotationValue]);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        const dx = e.changedTouches[0].clientX - touchStart.current.x;
        const dt = Date.now() - touchStart.current.time;
        const velocity = dx / Math.max(dt, 1);

        // Momentum: if fast swipe, go extra
        if (Math.abs(velocity) > 0.3) {
            const direction = velocity > 0 ? -1 : 1;
            const target = activeIndex + direction;
            goTo(((target % total) + total) % total);
        } else {
            // Snap to nearest
            const current = rotationValue.get();
            const nearestIdx = Math.round(-current / anglePerCard);
            goTo(((nearestIdx % total) + total) % total);
        }
    }, [activeIndex, anglePerCard, total, goTo, rotationValue]);

    return (
        <section id="projects" className="relative bg-black py-24 md:py-32 px-4 md:px-8 overflow-hidden">

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#4DBC1B]/5 rounded-full blur-[140px] pointer-events-none" />

            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <p className="text-[#4DBC1B] text-xs font-bold tracking-[0.3em] uppercase mb-4">Student-Led Innovation</p>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                    <span className="text-white">OUR </span>
                    <span className="text-[#4DBC1B] text-glow">PROJECTS</span>
                </h2>
            </motion.div>

            {/* 3D Carousel */}
            <div
                ref={containerRef}
                className="relative max-w-6xl mx-auto select-none"
                style={{
                    perspective: "1200px",
                    perspectiveOrigin: "50% 50%",
                    height: "380px",
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="relative w-full h-full"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {projects.map((project, i) => (
                        <CarouselCard
                            key={project.title}
                            project={project}
                            index={i}
                            activeIndex={activeIndex}
                            total={total}
                            rotation={currentRotation}
                            reducedMotion={reducedMotion}
                        />
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between max-w-md mx-auto mt-12">
                {/* Counter */}
                <div className="flex items-center gap-2">
                    <span className="text-[#4DBC1B] font-bold text-lg tabular-nums">
                        {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-gray-700 text-sm">/ {String(total).padStart(2, "0")}</span>
                </div>

                {/* Dot indicators */}
                <div className="flex gap-1.5">
                    {projects.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Go to project ${i + 1}`}
                            className={`rounded-full transition-all duration-300 ${
                                i === activeIndex
                                    ? "w-6 h-1.5 bg-[#4DBC1B]"
                                    : "w-1.5 h-1.5 bg-[#4DBC1B]/25 hover:bg-[#4DBC1B]/50"
                            }`}
                        />
                    ))}
                </div>

                {/* Arrows */}
                <div className="flex items-center gap-3">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={goPrev}
                        aria-label="Previous project"
                        className="w-10 h-10 rounded-full border border-[#4DBC1B]/30 flex items-center justify-center text-[#4DBC1B] hover:bg-[#4DBC1B]/10 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={goNext}
                        aria-label="Next project"
                        className="w-10 h-10 rounded-full border border-[#4DBC1B]/30 flex items-center justify-center text-[#4DBC1B] hover:bg-[#4DBC1B]/10 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
