"use client";

import { useState, useEffect, memo, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import InteractiveDotGrid from "./InteractiveDotGrid";
import { useScrollContext } from "./SmoothScrollProvider";

const MemoizedGrid = memo(InteractiveDotGrid);

// Lazy-load the Three.js scene (no SSR — canvas must be client-only)
const HeroScene = dynamic(() => import("./HeroScene"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#4DBC1B]/30 border-t-[#4DBC1B] rounded-full animate-spin" />
        </div>
    ),
});

// ─── Typewriter Text ─────────────────────────────────────────────────────────
const TypewriterText = memo(({
    text,
    speed = 50,
    startNow,
    onDone
}: {
    text: string;
    speed?: number;
    startNow: boolean;
    onDone?: () => void;
}) => {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!startNow) return;
        let i = 0;
        setDisplayed("");
        setDone(false);
        const interval = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) {
                clearInterval(interval);
                setDone(true);
                if (onDone) onDone();
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed, startNow]);

    return (
        <>
            {displayed}
            {!done && startNow && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-[#4DBC1B]"
                >
                    |
                </motion.span>
            )}
        </>
    );
});
TypewriterText.displayName = "TypewriterText";

// ─── Fade-up animation variants ──────────────────────────────────────────────
const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: 0.1 + i * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
    }),
};

// ─── Hero Component ──────────────────────────────────────────────────────────
export default function Hero({ ready = true, skipAnimation = false }: { ready?: boolean; skipAnimation?: boolean }) {
    const { scrollTo } = useScrollContext();
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.97]);
    const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -40]);

    const [startLine1, setStartLine1] = useState(skipAnimation);
    const [line1Done, setLine1Done] = useState(skipAnimation);
    const [line2Done, setLine2Done] = useState(skipAnimation);

    const handleLine1Done = useCallback(() => setLine1Done(true), []);
    const handleLine2Done = useCallback(() => {
        setLine2Done(true);
        sessionStorage.setItem("nextgen_hero_done", "1");
    }, []);

    useEffect(() => {
        if (!ready || skipAnimation) return;
        const t = setTimeout(() => setStartLine1(true), 100);
        return () => clearTimeout(t);
    }, [ready, skipAnimation]);

    const showUI = line2Done;

    return (
        <section className="relative flex items-center min-h-screen overflow-hidden">
            {/* Fullscreen background particle grid */}
            <div className="absolute inset-0 z-0">
                <MemoizedGrid startAnimation={showUI} />
            </div>

            {/* Ambient background glow */}
            <motion.div
                animate={{ opacity: [0.06, 0.12, 0.06], scale: [1, 1.08, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-[#4DBC1B]/8 rounded-full blur-[160px] -z-10 will-change-transform pointer-events-none"
            />

            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="relative z-10 w-full flex flex-col lg:flex-row items-center lg:items-center min-h-screen"
            >
                {/* ─── LEFT: HPC Mission Control Interface Panel ────────────────────────────────── */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 pt-28 sm:pt-32 lg:pt-0 pb-8 lg:pb-0">
                    
                    {/* Control Panel Framed Box with Corner Bracket Accents */}
                    <div className="relative p-6 sm:p-8 rounded-xl border border-[#4DBC1B]/15 bg-black/40 backdrop-blur-md max-w-[560px]">
                        
                        {/* Corner Bracket Accents (┌ ┐ └ ┘) */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#4DBC1B]/60 rounded-tl-sm pointer-events-none" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#4DBC1B]/60 rounded-tr-sm pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#4DBC1B]/60 rounded-bl-sm pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#4DBC1B]/60 rounded-br-sm pointer-events-none" />

                        {/* Faint Background Grid Details */}
                        <div
                            className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{
                                backgroundImage: `linear-gradient(rgba(77,188,27,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(77,188,27,0.4) 1px, transparent 1px)`,
                                backgroundSize: "20px 20px",
                            }}
                        />

                        {/* 1. TOP STATUS BAR */}
                        <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-[#4DBC1B]/80 uppercase pb-4 mb-4 border-b border-[#4DBC1B]/20">
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#4DBC1B] animate-pulse" />
                                RESEARCH CLUSTER ACTIVE
                            </span>
                            <span className="text-gray-500 hidden sm:inline">SYS_ID: HPC-NODE-01</span>
                        </div>

                        {/* 2. MAIN TITLE & SUBTITLE */}
                        <div className="mb-5">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 leading-[1.1] min-h-[1.2em]">
                                <TypewriterText
                                    text="From Code to Supercomputers"
                                    speed={50}
                                    startNow={startLine1}
                                    onDone={handleLine1Done}
                                />
                            </h1>

                            <h2
                                className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#4DBC1B] leading-[1.15] min-h-[1.2em]"
                                style={{ textShadow: "0 0 30px rgba(77, 188, 27, 0.35)" }}
                            >
                                <TypewriterText
                                    text="Your Journey Starts Here"
                                    speed={50}
                                    startNow={line1Done}
                                    onDone={handleLine2Done}
                                />
                            </h2>
                        </div>

                        {/* Thin Divider */}
                        <div className="w-full h-[1px] bg-gradient-to-r from-[#4DBC1B]/30 via-[#4DBC1B]/15 to-transparent mb-5" />

                        {/* 3. DESCRIPTION */}
                        <motion.div
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate={showUI ? "visible" : "hidden"}
                            custom={0}
                            className="mb-5"
                        >
                            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-[460px] font-mono opacity-90">
                                Building next-generation high-performance computing infrastructure.
                                From GPU clusters to distributed AI systems — we push the boundaries
                                of what&apos;s possible.
                            </p>
                        </motion.div>

                        {/* Thin Divider */}
                        <div className="w-full h-[1px] bg-gradient-to-r from-[#4DBC1B]/30 via-[#4DBC1B]/15 to-transparent mb-5" />

                        {/* 4. PRIMARY ACTIONS AREA */}
                        <motion.div
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate={showUI ? "visible" : "hidden"}
                            custom={1}
                            className="mb-6"
                        >
                            <span className="block text-[10px] font-mono font-bold tracking-[0.2em] text-[#4DBC1B]/70 uppercase mb-3">
                                // COMMAND ACTIONS
                            </span>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => scrollTo("#riva", { offset: -80 })}
                                    className="px-7 py-2.5 text-xs sm:text-sm font-bold text-black bg-[#4DBC1B] rounded-md hover:bg-[#5dd420] hover:shadow-[0_0_25px_rgba(77,188,27,0.4)] transition-all duration-300 hover:scale-[1.02] tracking-wider uppercase"
                                >
                                    Explore Riva
                                </button>
                                <button
                                    onClick={() => scrollTo("#projects", { offset: -80 })}
                                    className="px-7 py-2.5 text-xs sm:text-sm font-bold text-[#4DBC1B] border border-[#4DBC1B]/60 rounded-md hover:bg-[#4DBC1B]/10 hover:border-[#4DBC1B] hover:shadow-[0_0_20px_rgba(77,188,27,0.25)] transition-all duration-300 hover:scale-[1.02] tracking-wider uppercase"
                                >
                                    Other Projects
                                </button>
                            </div>
                        </motion.div>

                        {/* Thin Divider */}
                        <div className="w-full h-[1px] bg-gradient-to-r from-[#4DBC1B]/30 via-[#4DBC1B]/15 to-transparent mb-5" />

                        {/* 5. SYSTEM METRICS PANELS */}
                        <motion.div
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate={showUI ? "visible" : "hidden"}
                            custom={2}
                        >
                            <span className="block text-[10px] font-mono font-bold tracking-[0.2em] text-[#4DBC1B]/70 uppercase mb-3">
                                // CLUSTER METRICS
                            </span>

                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { value: "50+", label: "GPU NODES" },
                                    { value: "10+", label: "PROJECTS" },
                                    { value: "99.9%", label: "UPTIME" },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="flex flex-col p-2.5 rounded border border-[#4DBC1B]/20 bg-black/60 hover:border-[#4DBC1B]/50 transition-colors"
                                    >
                                        <span className="text-[9px] font-mono text-gray-400 tracking-wider uppercase">
                                            {stat.label}
                                        </span>
                                        <span className="text-base sm:text-lg font-black text-white font-mono mt-0.5">
                                            {stat.value}
                                        </span>
                                        <div className="w-full h-[2px] bg-[#4DBC1B]/40 mt-1.5 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* ─── RIGHT: Three.js Scene (UNTOUCHED) ────────────────────────────── */}
                <motion.div
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate={showUI ? "visible" : "hidden"}
                    custom={1}
                    className="w-full lg:w-1/2 h-[50vh] sm:h-[55vh] lg:h-screen relative"
                >
                    <HeroScene />
                </motion.div>
            </motion.div>

            {/* ─── Scroll indicator ──────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={showUI ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
                    <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="text-gray-500">
                        <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="1.5" />
                        <motion.circle
                            cx="10" cy="10" r="3" fill="#4DBC1B"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </svg>
                </div>
            </motion.div>
        </section>
    );
}
