"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import InteractiveDotGrid from "../components/InteractiveDotGrid";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { useScrollContext } from "../components/SmoothScrollProvider";

const upcomingEvents = [
    {
        title: "AI Arena Hackathon 2026",
        date: "March 19-20, 2026",
        time: "11:00 AM - 11:00 AM",
        location: "Central Library",
        description: "The AI Arena: Gotham Edition is a 24-hour National Level Machine Learning Hackathon followed by an exclusive AI Summit featuring industry leaders and innovators.",
        image: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?auto=format&fit=crop&q=80&w=600",
        status: "upcoming" as const,
        registrationLink: "https://unstop.com/hackathons/ai-arena-gotham-edition-kiet-group-of-institutions-1640378?lb=i1Fw6PAU"
    },
    {
        title: "AI Summit 2026",
        date: "MArch 20, 2026",
        time: "11:00 AM - 5:00 PM",
        location: "Auditorium",
        description: "A hands-on workshop diving deep into neural networks and training models with PyTorch.",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=600",
        status: "upcoming" as const,
        registrationLink: "#"
    },
    {
        title: "Tech Talk: Future of Quantum Computing",
        date: "April 20, 2026",
        time: "4:00 PM - 6:00 PM",
        location: "Seminar Hall B",
        description: "An expert session discussing the breakthroughs and future potential of quantum processors.",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600",
        status: "upcoming" as const,
        registrationLink: "#"
    }
];

const pastEvents = [
    {
        title: "Intro to Cloud Computing",
        date: "January 10, 2026",
        time: "10:00 AM - 1:00 PM",
        location: "Virtual",
        description: "Covered the basics of AWS and Azure, deploying first web apps to the cloud.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
        status: "past" as const,
    },
    {
        title: "Cybersecurity Awareness Week",
        date: "December 05, 2025",
        time: "All Day",
        location: "Campus Wide",
        description: "A week-long event series focusing on digital safety, encryption, and ethical hacking.",
        image: "https://images.unsplash.com/photo-1563206767-5b1d972b9fb9?auto=format&fit=crop&q=80&w=600",
        status: "past" as const,
    }
];

export default function EventsPage() {
    const { scrollTo } = useScrollContext();
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 300);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#4DBC1B]/30 relative">
            <Navbar />

            {/* Background */}
            <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                <InteractiveDotGrid startAnimation={true} />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 pt-40 pb-16 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
                        Events & <span className="text-[#4DBC1B] text-glow">Workshops</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Compete, learn, and grow with our community-driven events.
                    </p>
                </motion.div>
            </section>

            {/* Upcoming Events */}
            <section className="relative z-10 px-4 md:px-12 pb-20 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#4DBC1B]/50"></div>
                    <h2 className="text-3xl font-bold text-white tracking-widest uppercase">Upcoming Events</h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#4DBC1B]/50"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map((event, index) => (
                        <EventCard
                            key={index}
                            {...event}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </section>

            {/* Past Events */}
            <section className="relative z-10 px-4 md:px-12 pb-32 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px flex-1 bg-white/20"></div>
                    <h2 className="text-2xl font-bold text-gray-400 tracking-widest uppercase">Past Events</h2>
                    <div className="h-px flex-1 bg-white/20"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-70 hover:opacity-100 transition-opacity duration-500">
                    {pastEvents.map((event, index) => (
                        <EventCard
                            key={index}
                            {...event}
                            delay={0.2}
                        />
                    ))}
                </div>
            </section>

            <Footer />

            {/* Scroll-to-top button */}
            <AnimatePresence>
                {showTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => scrollTo(0, { duration: 1.4 })}
                        className="fixed bottom-8 right-6 z-50 p-3 rounded-full bg-[#4DBC1B]/20 border border-[#4DBC1B]/50 text-[#4DBC1B] hover:bg-[#4DBC1B]/30 hover:shadow-[0_0_20px_rgba(77,188,27,0.4)] transition-all duration-300"
                        aria-label="Scroll to top"
                    >
                        <ChevronUp className="w-5 h-5" />
                    </motion.button>
                )}
            </AnimatePresence>
        </main>
    );
}
