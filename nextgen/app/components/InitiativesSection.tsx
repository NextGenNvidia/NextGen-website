"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useScrollContext } from "../components/SmoothScrollProvider";

const initiatives = [
    {
        id: "01",
        title: "Innovation",
        description: "Pushing the boundaries of AI with student-led research in computer vision, NLP, and generative models.",
        href: "#projects",
        linkText: "Explore Projects",
        align: "right"
    },
    {
        id: "02",
        title: "Collaboration",
        description: "Open-sourcing our tools to build a global community of developers and researchers working together.",
        href: "/contact",
        linkText: "Get in Touch",
        align: "left"
    },
    {
        id: "03",
        title: "Education",
        description: "Empowering the next generation through hands-on workshops, hackathons, and mentorship programs.",
        href: "/events",
        linkText: "View Events & Workshops",
        align: "right"
    }
];

export default function WorkingOnSection() {
    const router = useRouter();
    const { scrollTo } = useScrollContext();

    const handleInitiativeClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
        e.preventDefault(); // Prevents default jump

        if (href.startsWith("#")) {
            // 1. For Innovation (#projects) -> Smooth scroll on the same page
            const targetEl = document.querySelector(href);
            if (targetEl && scrollTo) {
                scrollTo(targetEl, { duration: 1.2 });
            } else if (targetEl) {
                targetEl.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            // 2. For Education (/events) and Collaboration (/contact) -> Navigate & open at the TOP
            if (scrollTo) {
                scrollTo(0, { immediate: true });
            }
            window.scrollTo(0, 0);
            router.push(href);
        }
    };

    return (
        <section className="relative bg-black py-32 px-4 md:px-8 overflow-hidden min-h-screen flex flex-col justify-center select-none">

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-32 uppercase tracking-widest font-bold text-xl md:text-3xl"
                >
                    <span className="text-white">What We're </span>
                    <span className="text-[#4DBC1B]">Working On</span>
                </motion.h2>

                <div className="flex flex-col gap-24 md:gap-40 relative">
                    {/* Vertical connecting line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#4DBC1B]/20 to-transparent hidden md:block" />

                    {initiatives.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex flex-col md:flex-row items-center relative ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                        >
                            {/* Number Background */}
                            <div className={`absolute top-1/2 -translate-y-1/2 ${index % 2 === 0 ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"} z-0 pointer-events-none hidden md:block`}>
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 0.1, scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="text-[300px] font-black text-gray-500 leading-none select-none"
                                >
                                    {index + 1}
                                </motion.span>
                            </div>

                            {/* Empty space / Alignment */}
                            <div className="flex-1 hidden md:block" />

                            {/* Content Box */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="flex-1 relative z-10 w-full md:w-auto"
                            >
                                <div
                                    onClick={(e) => handleInitiativeClick(e, item.href)}
                                    className="block group focus:outline-none cursor-pointer"
                                >
                                    <div
                                        className="relative p-6 md:p-10 border border-[#4DBC1B] rounded-none bg-black group-hover:bg-[#4DBC1B]/10 transition-all duration-500 group-hover:shadow-[0_0_35px_rgba(77,188,27,0.2)]"
                                        style={{
                                            boxShadow: "0 0 0 1px rgba(77, 188, 27, 0.2)"
                                        }}
                                    >
                                        {/* Outline corner brackets */}
                                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-[#4DBC1B] bg-black" />
                                        <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-[#4DBC1B] bg-black" />
                                        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-[#4DBC1B] bg-black" />
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[#4DBC1B] bg-black" />

                                        {/* Title + Action Arrow */}
                                        <div className="flex items-center justify-between mb-3 md:mb-4">
                                            <h3 className="text-2xl md:text-4xl font-bold text-white group-hover:text-[#4DBC1B] transition-colors uppercase tracking-tighter">
                                                {item.title}
                                            </h3>
                                            <div className="w-8 h-8 rounded-full border border-[#4DBC1B]/40 flex items-center justify-center text-[#4DBC1B] group-hover:bg-[#4DBC1B] group-hover:text-black group-hover:rotate-45 transition-all duration-300">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </div>
                                        </div>

                                        <p className="text-gray-400 text-base leading-relaxed mb-4">
                                            {item.description}
                                        </p>

                                        {/* Bottom Action Label */}
                                        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#4DBC1B] uppercase group-hover:underline">
                                            {item.linkText} &rarr;
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}