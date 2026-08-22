"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import InteractiveDotGrid from "../components/InteractiveDotGrid";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { useScrollContext } from "../components/SmoothScrollProvider";
import AIArena from "./Assets/AIArena.png";
import AISummit from "./Assets/AISummit.png";
import NextGenInauguration from "./Assets/NextGenInauguration.png";

interface EventItem {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    image: string;
    status: "upcoming" | "past";
    registrationLink?: string;
}

const upcomingEvents: EventItem[] = [];

const pastEvents: EventItem[] = [
    {
        title: "AI Arena Hackathon 2026",
        date: "March 19-20, 2026",
        time: "11:00 AM - 11:00 AM",
        location: "Central Library",
        description: "The AI Arena: Gotham Edition is a 24-hour National Level Machine Learning Hackathon followed by an exclusive AI Summit featuring industry leaders and innovators.",
        // image: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?auto=format&fit=crop&q=80&w=600",
        image: AIArena.src,
        status: "past",
        registrationLink: "https://hackathon.nextgen-supercomputing.in/"
    },
    {
        title: "AI Summit 2026",
        date: "March 20, 2026",
        time: "11:00 AM - 5:00 PM",
        location: "Auditorium",
        description: "AI Summit 2026 explored Responsible AI and digital transformation. Through expert panels and power talks, the event fostered industry-academia connections and prepared attendees for an AI-driven future.",
        // image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=600",
        image: AISummit.src,
        status: "past",
        // Replace with your actual AI Summit website link:
        registrationLink: "https://aisummit2026.com" 
    },
    {
        title: "NextGen Supercomputing Inauguration",
        date: "November 6, 2025",
        time: "11:00 AM ",
        location: "NextGen Supercomputing Lab",
        description: "The 𝐃𝐞𝐩𝐚𝐫𝐭𝐦𝐞𝐧𝐭 𝐨𝐟 𝐂𝐒𝐄 (𝐀𝐈 & 𝐀𝐈𝐌𝐋) proudly launched the 𝐍𝐞𝐱𝐭𝐆𝐞𝐧 𝐒𝐮𝐩𝐞𝐫𝐜𝐨𝐦𝐩𝐮𝐭𝐢𝐧𝐠 𝐂𝐥𝐮𝐛 on 𝟔𝐭𝐡 𝐍𝐨𝐯𝐞𝐦𝐛𝐞𝐫 𝟐𝟎𝟐𝟓, driven by the motto “𝐁𝐮𝐢𝐥𝐝𝐢𝐧𝐠 𝐏𝐫𝐨𝐝𝐮𝐜𝐭𝐢𝐨𝐧 𝐁𝐫𝐚𝐢𝐧𝐬”. Powered by the 𝐍𝐕𝐈𝐃𝐈𝐀 𝐃𝐆𝐗 𝐀𝟏𝟎𝟎 𝐒𝐮𝐩𝐞𝐫𝐜𝐨𝐦𝐩𝐮𝐭𝐞𝐫, one of the most advanced AI systems in academia, the club will fuel cutting-edge research in AI, ML, Generative AI, and High-Performance Computing.",
        // image: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?auto=format&fit=crop&q=80&w=600",
        image: NextGenInauguration.src,
        status: "past",
        registrationLink: "https://www.linkedin.com/posts/kiet-deemed-to-be-university_kiet-nextgensupercomputingclub-generativeai-activity-7392887757292896256-vvW2?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF45N74BG7Wta5OrNwAt7QaKqgnqpgm-hSI"
    },
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

                {upcomingEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {upcomingEvents.map((event, index) => (
                            <a
                                key={index}
                                href={event.registrationLink || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4DBC1B] rounded-2xl"
                            >
                                <EventCard
                                    {...event}
                                    delay={index * 0.1}
                                />
                            </a>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-12 px-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm max-w-md mx-auto"
                    >
                        <p className="text-gray-300 text-lg font-medium">No upcoming events right now</p>
                        <p className="text-gray-500 text-sm mt-1">Check back soon for new announcements and workshops!</p>
                    </motion.div>
                )}
            </section>

            {/* Past Events */}
            <section className="relative z-10 px-4 md:px-12 pb-32 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px flex-1 bg-white/20"></div>
                    <h2 className="text-2xl font-bold text-gray-400 tracking-widest uppercase">Past Events</h2>
                    <div className="h-px flex-1 bg-white/20"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-90 hover:opacity-100 transition-opacity duration-500">
                    {pastEvents.map((event, index) => (
                        <a
                            key={index}
                            href={event.registrationLink || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4DBC1B] rounded-2xl"
                        >
                            <EventCard
                                {...event}
                                delay={0.2}
                            />
                        </a>
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