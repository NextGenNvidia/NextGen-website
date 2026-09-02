"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, animate, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Github, ExternalLink, User, Sparkles } from "lucide-react";

// ─── Project Data Interface ──────────────────────────────────────────────────
interface Project {
    title: string;
    description: string;
    longDescription?: string;
    tag: string;
    author: string;
    github: string;
}

// ─── Project Data ───────────────────────────────────────────────────────────
const projects: Project[] = [
    {
        title: "Omnitrix",
        description: "App for athletes for their correct physical training without human intervention.",
        longDescription: "An AI-powered automated fitness and form-correction mobile app that leverages computer vision to analyze biomechanics in real-time, providing instant auditory feedback and adaptive workout routines.",
        tag: "Health & AI",
        author: "NextGen AI Lab Team",
        github: "https://github.com/nextgen-supercomputing/omnitrix",
    },
    {
        title: "Neptune Nexus",
        description: "Ocean data analysis using a conversational AI chatbot.",
        longDescription: "A deep learning conversational interface processing terabytes of marine sensor telemetry, ocean current anomalies, and underwater temperature metrics to assist marine researchers.",
        tag: "Data & Environment",
        author: "Ocean AI Research Group",
        github: "https://github.com/nextgen-supercomputing/neptune-nexus",
    },
    {
        title: "Rockfall Prediction",
        description: "Message alert system for rockfall prediction in hill areas to keep communities safe.",
        longDescription: "An IoT-edge machine learning early warning framework detecting seismic vibrations and slope instability in mountainous terrain, broadcasting rapid SMS alerts to local authorities.",
        tag: "Safety & ML",
        author: "Geotech IoT Team",
        github: "https://github.com/nextgen-supercomputing/rockfall-prediction",
    },
    {
        title: "CodeGamma",
        description: "Pashuseva is an AI- and ML-powered platform for managing and monitoring MRL and AMU to support rural development.",
        longDescription: "A comprehensive veterinary diagnostics and agricultural monitoring portal leveraging classification models to curb anti-microbial resistance and track livestock health metrics across rural sectors.",
        tag: "AgriTech & AI",
        author: "CodeGamma Squad",
        github: "https://github.com/nextgen-supercomputing/codegamma-pashuseva",
    },
    {
        title: "JanMitr",
        description: "Crowdsourced civic issue reporting and resolution system connecting citizens with local governance.",
        longDescription: "A smart city civic engagement platform employing image geolocation, automatic department routing, and real-time SLA trackers to escalate municipal complaints seamlessly.",
        tag: "GovTech & Community",
        author: "CivicTech Innovators",
        github: "https://github.com/nextgen-supercomputing/janmitr",
    },
    {
        title: "TechYodhaas",
        description: "Digitize and showcase monasteries of Sikkim for tourism and cultural preservation.",
        longDescription: "An immersive 3D photogrammetry and archival web portal preserving Himalayan cultural heritage sites, augmented by interactive storytelling and virtual historical tours.",
        tag: "Heritage & Tech",
        author: "TechYodhaas Crew",
        github: "https://github.com/nextgen-supercomputing/techyodhaas",
    },
    {
        title: "HerbCollectors",
        description: "A blockchain-based system for botanical traceability of Ayurvedic herbs — from farmer to final formulation label.",
        longDescription: "A decentralized hyperledger ledger verifying herb authenticity, geographic origin, ethical harvesting certifications, and supply chain custody from forest foragers to pharmacies.",
        tag: "Blockchain & Health",
        author: "Web3 Research Lab",
        github: "https://github.com/nextgen-supercomputing/herb-collectors",
    },
    {
        title: "Nivaran",
        description: "Crowdsourced civic issue reporting and resolution system empowering communities to solve local problems.",
        longDescription: "Decentralized community moderation engine that allows neighborhood collectives to pool resources, track civic petitions, and verify completed infrastructure repairs.",
        tag: "GovTech & Community",
        author: "Nivaran Core Team",
        github: "https://github.com/nextgen-supercomputing/nivaran",
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
    onCardClick,
}: {
    project: Project;
    index: number;
    activeIndex: number;
    total: number;
    rotation: number;
    reducedMotion: boolean;
    onCardClick: () => void;
}) {
    const anglePerCard = 360 / total;
    const cardAngle = anglePerCard * index + rotation;

    let normalizedAngle = ((cardAngle % 360) + 540) % 360 - 180;
    const absAngle = Math.abs(normalizedAngle);

    const radius = 420;
    const x = Math.sin((normalizedAngle * Math.PI) / 180) * radius;
    const z = Math.cos((normalizedAngle * Math.PI) / 180) * radius - radius;

    const isActive = index === activeIndex;
    const scale = isActive ? 1.08 : Math.max(0.6, 1 - absAngle / 300);
    const opacity = Math.max(0.15, 1 - absAngle / 200);
    const blur = isActive ? 0 : Math.min(2, absAngle / 120);
    const zIndex = Math.round(1000 - absAngle);

    const floatOffset = reducedMotion ? 0 : undefined;

    return (
        <motion.div
            className="absolute top-0 left-1/2 cursor-pointer"
            onClick={onCardClick}
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
                animate={!reducedMotion && isActive ? { y: [0, -6, 0] } : {}}
                transition={
                    !reducedMotion && isActive
                        ? { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                        : {}
                }
            >
                <div
                    className={`relative rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-500 hover:scale-[1.02] ${
                        isActive
                            ? "bg-[#0d0d0d]/90 border border-[#4DBC1B]/50 shadow-[0_0_60px_rgba(77,188,27,0.15),0_8px_32px_rgba(0,0,0,0.8)] hover:border-[#4DBC1B]"
                            : "bg-[#0a0a0a]/70 border border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.6)] hover:border-[#4DBC1B]/40"
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

                    {/* Gradient border overlay */}
                    {isActive && (
                        <div
                            className="absolute inset-0 rounded-2xl pointer-events-none"
                            style={{
                                background:
                                    "linear-gradient(135deg, rgba(77,188,27,0.15) 0%, transparent 40%, transparent 60%, rgba(77,188,27,0.08) 100%)",
                            }}
                        />
                    )}

                    {/* Corner brackets */}
                    <div className={`absolute top-0 left-0 w-6 h-6 border-t border-l rounded-tl-2xl transition-colors duration-500 ${isActive ? "border-[#4DBC1B]/50" : "border-[#4DBC1B]/15"}`} />
                    <div className={`absolute top-0 right-0 w-6 h-6 border-t border-r rounded-tr-2xl transition-colors duration-500 ${isActive ? "border-[#4DBC1B]/50" : "border-[#4DBC1B]/15"}`} />
                    <div className={`absolute bottom-0 left-0 w-6 h-6 border-b border-l rounded-bl-2xl transition-colors duration-500 ${isActive ? "border-[#4DBC1B]/50" : "border-[#4DBC1B]/15"}`} />
                    <div className={`absolute bottom-0 right-0 w-6 h-6 border-b border-r rounded-br-2xl transition-colors duration-500 ${isActive ? "border-[#4DBC1B]/50" : "border-[#4DBC1B]/15"}`} />

                    {/* Content - Clickable Body */}
                    <div className="relative z-10 flex flex-col h-full p-6 md:p-8" style={{ minHeight: "280px" }}>
                        <span
                            className={`inline-block text-[10px] font-bold tracking-widest uppercase rounded-full px-3 py-1 mb-5 self-start transition-colors duration-500 ${
                                isActive
                                    ? "text-[#4DBC1B] border border-[#4DBC1B]/30 bg-[#4DBC1B]/5"
                                    : "text-[#4DBC1B]/50 border border-[#4DBC1B]/10"
                            }`}
                        >
                            {project.tag}
                        </span>

                        <span
                            className={`absolute top-4 right-6 text-6xl font-black select-none leading-none transition-colors duration-500 ${
                                isActive ? "text-[#4DBC1B]/12" : "text-[#4DBC1B]/5"
                            }`}
                        >
                            {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3
                            className={`text-xl md:text-2xl font-black tracking-tight mb-3 transition-colors duration-500 ${
                                isActive ? "text-white" : "text-white/70"
                            }`}
                        >
                            {project.title}
                        </h3>

                        <p
                            className={`text-sm leading-relaxed flex-1 transition-colors duration-500 line-clamp-3 ${
                                isActive ? "text-gray-300" : "text-gray-500"
                            }`}
                        >
                            {project.description}
                        </p>

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
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const rotationValue = useMotionValue(0);
    const smoothRotation = useSpring(rotationValue, { stiffness: 100, damping: 22, mass: 0.6 });
    const [currentRotation, setCurrentRotation] = useState(0);
    const [reducedMotion, setReducedMotion] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Drag vs Click detection
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragDistance = useRef(0);
    const dragStartRotation = useRef(0);

    // Check prefers-reduced-motion
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedProject(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Compute active index from rotation
    useEffect(() => {
        const unsubscribe = smoothRotation.on("change", (v) => {
            setCurrentRotation(v);
            const idx = Math.round((-v / anglePerCard) % total);
            setActiveIndex(((idx % total) + total) % total);
        });
        return unsubscribe;
    }, [smoothRotation, anglePerCard, total]);

    const goTo = useCallback(
        (index: number) => {
            const targetRotation = -index * anglePerCard;
            const current = rotationValue.get();
            const diff = targetRotation - current;
            const normalizedDiff = ((diff % 360) + 540) % 360 - 180;
            animate(rotationValue, current + normalizedDiff, {
                type: "spring",
                stiffness: 100,
                damping: 22,
                mass: 0.6,
            });
        },
        [anglePerCard, rotationValue]
    );

    const goNext = useCallback(() => {
        const nextIdx = (activeIndex + 1) % total;
        goTo(nextIdx);
    }, [activeIndex, total, goTo]);

    const goPrev = useCallback(() => {
        const prevIdx = (activeIndex - 1 + total) % total;
        goTo(prevIdx);
    }, [activeIndex, total, goTo]);

    // Clicking ANY card opens the modal directly
    const handleCardClick = (project: Project, index: number) => {
        if (Math.abs(dragDistance.current) > 10) return; // Ignore drag motions
        setSelectedProject(project);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedProject) return;
            if (e.key === "ArrowRight") goNext();
            else if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goNext, goPrev, selectedProject]);

    // Mouse wheel
    useEffect(() => {
        const el = containerRef.current;
        if (!el || selectedProject) return;
        let timeout: NodeJS.Timeout;
        const handleWheel = (e: WheelEvent) => {
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
    }, [goNext, goPrev, selectedProject]);

    // Pointer Drag
    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        isDragging.current = true;
        dragDistance.current = 0;
        dragStartX.current = e.clientX;
        dragStartRotation.current = rotationValue.get();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }, [rotationValue]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDragging.current) return;
        const dx = e.clientX - dragStartX.current;
        dragDistance.current = dx;
        const sensitivity = 0.3;
        rotationValue.set(dragStartRotation.current + dx * sensitivity);
    }, [rotationValue]);

    const handlePointerUp = useCallback(() => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const current = rotationValue.get();
        const nearestIdx = Math.round(-current / anglePerCard);
        const normalizedIdx = ((nearestIdx % total) + total) % total;
        goTo(normalizedIdx);
    }, [rotationValue, anglePerCard, total, goTo]);

    return (
        <section id="projects" className="relative bg-black py-24 md:py-32 px-4 md:px-8 overflow-hidden select-none">
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
                className="relative max-w-6xl mx-auto"
                style={{
                    perspective: "1200px",
                    perspectiveOrigin: "50% 50%",
                    height: "380px",
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                    {projects.map((project, i) => (
                        <CarouselCard
                            key={project.title}
                            project={project}
                            index={i}
                            activeIndex={activeIndex}
                            total={total}
                            rotation={currentRotation}
                            reducedMotion={reducedMotion}
                            onCardClick={() => handleCardClick(project, i)}
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

            {/* ─── ENHANCED PROJECT MODAL (POPUP WITH BLUR BACKGROUND) ─── */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl"
                    >
                        {/* Modal Box */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl rounded-3xl bg-[#0d0d0d] border border-[#4DBC1B]/40 p-6 md:p-10 shadow-[0_0_80px_rgba(77,188,27,0.25)] overflow-hidden"
                        >
                            {/* Decorative Top Glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#4DBC1B]/15 blur-3xl pointer-events-none" />

                            {/* Corner brackets */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-2xl border-[#4DBC1B]" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-2xl border-[#4DBC1B]" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-2xl border-[#4DBC1B]" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-2xl border-[#4DBC1B]" />

                            {/* Close button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#4DBC1B] hover:text-[#4DBC1B] flex items-center justify-center text-gray-400 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Modal Header */}
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase rounded-full px-3.5 py-1 text-[#4DBC1B] border border-[#4DBC1B]/40 bg-[#4DBC1B]/10">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    {selectedProject.tag}
                                </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
                                {selectedProject.title}
                            </h2>

                            {/* Author / Creator Badge */}
                            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 bg-white/[0.03] border border-white/5 px-4 py-2 rounded-xl w-fit">
                                <User className="w-4 h-4 text-[#4DBC1B]" />
                                <span>Author / Team:</span>
                                <span className="text-white font-semibold">{selectedProject.author}</span>
                            </div>

                            {/* Extended Description */}
                            <div className="space-y-3 mb-8">
                                <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase">Project Overview</h4>
                                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                                    {selectedProject.longDescription || selectedProject.description}
                                </p>
                            </div>

                            {/* Footer Actions */}
                            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                                <a
                                    href={selectedProject.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#4DBC1B] text-black font-extrabold text-xs tracking-wider uppercase hover:bg-[#5dd420] transition-colors shadow-[0_0_20px_rgba(77,188,27,0.4)]"
                                >
                                    <Github className="w-4 h-4" />
                                    <span>View Repository</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>

                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 text-xs font-bold transition-colors"
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