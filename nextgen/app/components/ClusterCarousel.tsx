"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
    {
        title: "Omnitrix",
        description: "App for athletes for their correct physical training without human intervention.",
        tag: "Health & AI"
    },
    {
        title: "Neptune Nexus",
        description: "Ocean data analysis using a conversational AI chatbot.",
        tag: "Data & Environment"
    },
    {
        title: "Rockfall Prediction",
        description: "Message alert system for rockfall prediction in hill areas to keep communities safe.",
        tag: "Safety & ML"
    },
    {
        title: "CodeGamma",
        description: "Pashuseva is an AI- and ML-powered platform for managing and monitoring MRL and AMU to support rural development.",
        tag: "AgriTech & AI"
    },
    {
        title: "JanMitr",
        description: "Crowdsourced civic issue reporting and resolution system connecting citizens with local governance.",
        tag: "GovTech & Community"
    },
    {
        title: "TechYodhaas",
        description: "Digitize and showcase monasteries of Sikkim for tourism and cultural preservation.",
        tag: "Heritage & Tech"
    },
    {
        title: "HerbCollectors",
        description: "A blockchain-based system for botanical traceability of Ayurvedic herbs — from farmer to final formulation label.",
        tag: "Blockchain & Health"
    },
    {
        title: "Nivaran",
        description: "Crowdsourced civic issue reporting and resolution system empowering communities to solve local problems.",
        tag: "GovTech & Community"
    },
];

export default function ProjectsSection() {
    const [current, setCurrent] = useState(0);
    const total = projects.length;

    const prev = () => setCurrent((c) => (c === 0 ? total - 1 : c - 1));
    const next = () => setCurrent((c) => (c === total - 1 ? 0 : c + 1));

    // Show 3 cards: left, center, right
    const getIndices = () => [
        (current - 1 + total) % total,
        current,
        (current + 1) % total,
    ];

    return (
        <section id="projects" className="relative bg-black py-24 md:py-32 px-4 md:px-8 overflow-hidden">

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#4DBC1B]/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <p className="text-[#4DBC1B] text-xs font-bold tracking-[0.3em] uppercase mb-4">Student-Led Innovation</p>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                    <span className="text-white">OUR </span>
                    <span className="text-[#4DBC1B] text-glow">PROJECTS</span>
                </h2>
            </motion.div>

            {/* Carousel */}
            <div className="max-w-6xl mx-auto relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <AnimatePresence mode="popLayout">
                        {getIndices().map((idx, pos) => {
                            const project = projects[idx];
                            const isCenter = pos === 1;
                            return (
                                <motion.div
                                    key={`${idx}-${project.title}`}
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={{
                                        opacity: isCenter ? 1 : 0.45,
                                        scale: isCenter ? 1 : 0.93,
                                    }}
                                    exit={{ opacity: 0, scale: 0.85 }}
                                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className={`relative rounded-xl border bg-[#0a0a0a] overflow-hidden flex flex-col
                                        ${isCenter
                                            ? "border-[#4DBC1B]/40 shadow-[0_0_40px_rgba(77,188,27,0.12)]"
                                            : "border-[#4DBC1B]/10 hidden md:flex"}`}
                                    style={{ minHeight: "260px" }}
                                >
                                    {/* Corner brackets */}
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#4DBC1B]/40 rounded-tl-xl" />
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#4DBC1B]/40 rounded-tr-xl" />
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#4DBC1B]/40 rounded-bl-xl" />
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#4DBC1B]/40 rounded-br-xl" />

                                    {/* Subtle grid pattern */}
                                    <div
                                        className="absolute inset-0 opacity-[0.025]"
                                        style={{
                                            backgroundImage: "linear-gradient(rgba(77,188,27,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(77,188,27,0.5) 1px, transparent 1px)",
                                            backgroundSize: "30px 30px",
                                        }}
                                    />

                                    <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
                                        {/* Tag */}
                                        <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-[#4DBC1B]/70 border border-[#4DBC1B]/20 rounded-full px-3 py-1 mb-5 self-start">
                                            {project.tag}
                                        </span>

                                        {/* Index number */}
                                        <span className="absolute top-4 right-6 text-[#4DBC1B]/10 text-6xl font-black select-none leading-none">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>

                                        <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed flex-1">
                                            {project.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mt-8">
                    {/* Counter */}
                    <div className="flex items-center gap-2">
                        <span className="text-[#4DBC1B] font-bold text-lg tabular-nums">
                            {String(current + 1).padStart(2, "0")}
                        </span>
                        <span className="text-gray-700 text-sm">/ {String(total).padStart(2, "0")}</span>
                    </div>

                    {/* Dot indicators */}
                    <div className="flex gap-1.5">
                        {projects.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`rounded-full transition-all duration-300 ${i === current
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
                            onClick={prev}
                            className="w-10 h-10 rounded-full border border-[#4DBC1B]/30 flex items-center justify-center text-[#4DBC1B] hover:bg-[#4DBC1B]/10 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={next}
                            className="w-10 h-10 rounded-full border border-[#4DBC1B]/30 flex items-center justify-center text-[#4DBC1B] hover:bg-[#4DBC1B]/10 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
}
