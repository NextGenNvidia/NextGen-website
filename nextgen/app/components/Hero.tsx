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
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            delay: 0.15 + i * 0.12,
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
            <div className="absolute inset-0 z-0">
                <MemoizedGrid startAnimation={showUI} />
            </div>
            {/* Subtle ambient glow — centered behind hero */}
            <motion.div
                animate={{ opacity: [0.06, 0.12, 0.06], scale: [1, 1.08, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-[#4DBC1B]/8 rounded-full blur-[160px] -z-10 will-change-transform pointer-events-none"
            />

            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="relative z-10 w-full flex flex-col lg:flex-row items-center lg:items-center min-h-screen"
            >
                {/* ─── LEFT: Text Content ────────────────────────────────── */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 pt-28 sm:pt-32 lg:pt-0 pb-8 lg:pb-0">
                    <div className="max-w-[560px]">
                        {/* Main heading */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3 leading-[1.1] min-h-[1.2em]">
                            <TypewriterText
                                text="From Code to Supercomputers"
                                speed={50}
                                startNow={startLine1}
                                onDone={handleLine1Done}
                            />
                        </h1>

                        {/* Subtitle */}
                        <h2
                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[#4DBC1B] mb-6 md:mb-8 leading-[1.15] min-h-[1.2em]"
                            style={{ textShadow: "0 0 40px rgba(77, 188, 27, 0.3)" }}
                        >
                            <TypewriterText
                                text="Your Journey Starts Here"
                                speed={50}
                                startNow={line1Done}
                                onDone={handleLine2Done}
                            />
                        </h2>

                        {/* Description */}
                        <motion.p
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate={showUI ? "visible" : "hidden"}
                            custom={0}
                            className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8 md:mb-10 max-w-[480px]"
                        >
                            Building next-generation high-performance computing infrastructure.
                            From GPU clusters to distributed AI systems — we push the boundaries
                            of what&apos;s possible.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate={showUI ? "visible" : "hidden"}
                            custom={1}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <button
                                onClick={() => scrollTo("#riva", { offset: -80 })}
                                className="px-8 py-3 text-base font-medium text-black bg-[#4DBC1B] rounded-full hover:bg-[#5dd420] hover:shadow-[0_0_30px_rgba(77,188,27,0.4)] transition-all duration-300 hover:scale-105"
                            >
                                Explore Riva
                            </button>
                            <button
                                onClick={() => scrollTo("#projects", { offset: -80 })}
                                className="px-8 py-3 text-base font-medium text-[#4DBC1B] border border-[#4DBC1B]/60 rounded-full hover:bg-[#4DBC1B]/10 hover:border-[#4DBC1B] hover:shadow-[0_0_25px_rgba(77,188,27,0.3)] transition-all duration-300 hover:scale-105"
                            >
                                Other Projects
                            </button>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate={showUI ? "visible" : "hidden"}
                            custom={2}
                            className="flex gap-8 mt-10 md:mt-14"
                        >
                            {[
                                { value: "50+", label: "GPU Nodes" },
                                { value: "10+", label: "Projects" },
                                { value: "99.9%", label: "Uptime" },
                            ].map((stat) => (
                                <div key={stat.label} className="flex flex-col">
                                    <span className="text-xl sm:text-2xl font-bold text-white">
                                        {stat.value}
                                    </span>
                                    <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* ─── RIGHT: Three.js Scene ────────────────────────────── */}
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
