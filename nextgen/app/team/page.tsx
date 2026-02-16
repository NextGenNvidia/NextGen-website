"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TeamMemberCard from "../components/TeamMemberCard";
import InteractiveDotGrid from "../components/InteractiveDotGrid";
import { motion } from "framer-motion";

const coreTeam = [
    { name: "Aditi Verma", role: "President", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aditi", bio: "Leading the vision and strategy for NextGen.", socials: { linkedin: "#", twitter: "#" } },
    { name: "Rohan Mehta", role: "Vice President", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan", bio: "Ensuring operational excellence and team cohesion.", socials: { linkedin: "#" } },
    { name: "Arjun Singh", role: "Technical Head", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun", bio: " overseeing technical projects and innovation.", socials: { github: "#", linkedin: "#" } },
    { name: "Sneha Kapoor", role: "Technical Head", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha", bio: "Expert in AI/ML architectures and research.", socials: { github: "#" } },
    { name: "Vikram Malhotra", role: "Technical Head", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram", bio: "Full-stack wizard and systems architect.", socials: { github: "#" } },
    { name: "Priya Sharma", role: "PR Head", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya", bio: "Managing public relations and outreach.", socials: { twitter: "#", linkedin: "#" } },
    { name: "Karan Johar", role: "Event Head", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karan", bio: "Organizing hackathons and tech talks.", socials: { linkedin: "#" } },
    { name: "Neha Gupta", role: "Event Head", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha", bio: "Coordinating logistics and attendee experience.", socials: { linkedin: "#" } },
    { name: "Rahul Dravid", role: "Treasurer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul", bio: "Managing finances and sponsorships.", socials: { linkedin: "#" } },
    { name: "Ananya Pandey", role: "Graphics Head", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya", bio: "Designing our visual identity and assets.", socials: { twitter: "#" } },
];

// Generate 50 members
const members = Array.from({ length: 50 }).map((_, i) => ({
    name: `Member ${i + 1}`,
    role: "Member",
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Member${i}`,
    bio: "Contributing to various projects and research initiatives.",
    socials: { linkedin: "#", github: "#" }
}));

export default function TeamPage() {
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
                        Meet the <span className="text-[#4DBC1B] text-glow">Team</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        The brilliant minds driving innovation at NextGen.
                    </p>
                </motion.div>
            </section>

            {/* Core Team Grid */}
            <section className="relative z-10 px-4 md:px-12 pb-20 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#4DBC1B]/50"></div>
                    <h2 className="text-3xl font-bold text-white tracking-widest uppercase">Core Team</h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#4DBC1B]/50"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                    {coreTeam.map((member, index) => (
                        <TeamMemberCard
                            key={index}
                            {...member}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </section>

            {/* Members Grid */}
            <section className="relative z-10 px-4 md:px-12 pb-32 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px flex-1 bg-white/20"></div>
                    <h2 className="text-2xl font-bold text-gray-400 tracking-widest uppercase">Members</h2>
                    <div className="h-px flex-1 bg-white/20"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {members.map((member, index) => (
                        <TeamMemberCard
                            key={index}
                            {...member}
                            delay={0.2} // Lazy load effect mostly handled by scroll view
                        />
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
