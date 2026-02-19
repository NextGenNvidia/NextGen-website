"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const events = [
    {
        title: "AI Summit 2024",
        subtitle: "Annual Conference",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600",
        desc: "Join industry leaders and researchers for a deep dive into the latest advancements in Artificial Intelligence.",
    },
    {
        title: "HPC Workshop",
        subtitle: "Hands-on Training",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600",
        desc: "Master the art of High Performance Computing with our intensive weekend workshop.",
    },
    {
        title: "Hackathon",
        subtitle: "48-Hour Build",
        image: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?auto=format&fit=crop&q=80&w=600",
        desc: "Collaborate, innovate, and build amazing projects in our annual 48-hour coding marathon.",
    },
    {
        title: "Research Symposium",
        subtitle: "Paper Presentations",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600",
        desc: "Students and faculty present groundbreaking research papers on cutting-edge topics.",
    },
    {
        title: "GPU Programming",
        subtitle: "CUDA Workshop",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=600",
        desc: "Learn to harness the power of GPUs for massive parallel processing tasks.",
    },
    {
        title: "Cloud Summit",
        subtitle: "Infrastructure Talk",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
        desc: "Explore the future of cloud infrastructure and scalable solutions.",
    },
];

export default function EventsSection() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        const el = scrollRef.current;
        if (!el) return;
        const cardW = el.firstElementChild?.clientWidth ?? 320;
        el.scrollBy({ left: dir === "left" ? -(cardW + 24) : cardW + 24, behavior: "smooth" });
    };

    return (
        <section className="relative bg-black py-16 md:py-24 overflow-hidden">
            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-center mb-10 px-4"
            >
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                    <span className="text-white">LATEST EVENTS </span>
                    <span className="text-[#4DBC1B] text-glow">CONDUCTED</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Exploring the frontiers of technology through workshops, hackathons, and seminars.
                </p>
            </motion.div>

            {/* Carousel + nav buttons */}
            <div className="relative max-w-7xl mx-auto px-4 md:px-8">
                {/* Left arrow */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/70 border border-white/10 text-white hover:border-[#4DBC1B]/60 hover:text-[#4DBC1B] transition-all duration-200 -translate-x-1/2 hidden md:flex"
                    aria-label="Previous"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Snap scroll track */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-4"
                    style={{
                        scrollSnapType: "x mandatory",
                        WebkitOverflowScrolling: "touch",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {events.map((ev, i) => (
                        <motion.div
                            key={ev.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            viewport={{ once: true }}
                            className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-[#4DBC1B]/50 transition-colors duration-300 flex flex-col flex-shrink-0"
                            style={{
                                scrollSnapAlign: "start",
                                width: "clamp(280px, 80vw, 340px)",
                            }}
                        >
                            {/* Image */}
                            <div className="relative h-48 w-full overflow-hidden">
                                <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                                <img
                                    src={ev.image}
                                    alt={ev.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-700 text-gray-300">
                                    {ev.subtitle}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#4DBC1B] transition-colors">
                                    {ev.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
                                    {ev.desc}
                                </p>
                                <div className="mt-auto pt-4 border-t border-white/10">
                                    <button disabled className="block w-full py-2 text-center text-sm font-medium text-gray-500 bg-white/5 rounded-lg cursor-not-allowed">
                                        Event Ended
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Right arrow */}
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/70 border border-white/10 text-white hover:border-[#4DBC1B]/60 hover:text-[#4DBC1B] transition-all duration-200 translate-x-1/2 hidden md:flex"
                    aria-label="Next"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Swipe hint — mobile only */}
            <p className="text-center text-gray-600 text-xs mt-4 md:hidden tracking-widest uppercase">
                ← swipe →
            </p>

            {/* Background glows */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#4DBC1B]/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#4DBC1B]/5 rounded-full blur-[80px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
        </section>
    );
}
