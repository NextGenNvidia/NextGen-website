"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TeamMemberCard from "../components/TeamMemberCard";
import InteractiveDotGrid from "../components/InteractiveDotGrid";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Core Team
const coreTeam = [
    { name: "Shreya Jain", role: "President", bio: "Leading the vision and strategy for NextGen.", socials: { linkedin: "https://www.linkedin.com/in/shreya-jain-25564a334/", github: "https://github.com/Shreya7078" } },
    { name: "Samarth Shukla", role: "Vice President", bio: "Ensuring operational excellence and team cohesion.", socials: { linkedin: "#" } },
    { name: "Prateek Rai", role: "Technical Head", bio: "Overseeing technical projects and innovation.", socials: { linkedin: "https://www.linkedin.com/in/prateek-rai-969136342/", github: "https://github.com/Prat260104" } },
    { name: "Vinayank Rastogi", role: "Technical Head", bio: "Expert in AI/ML architectures and research.", socials: { github: "#" } },
    { name: "Ronak Goel", role: "Technical Head", bio: "Driving technical excellence and innovation.", socials: { linkedin: "https://www.linkedin.com/in/ronak-goel", github: "https://github.com/Ronak-Goel-2005" } },
    { name: "Ujjawal Tyagi", role: "PR Head", bio: "Managing public relations and outreach.", socials: { twitter: "#", linkedin: "#" } },
    { name: "Srashti Gupta", role: "Event Head", bio: "Organizing hackathons and tech talks.", socials: { linkedin: "https://www.linkedin.com/in/srashti-gupta-114b36325", github: "https://github.com/Srashticodes" } },
    { name: "Vidisha Goel", role: "Event Head", bio: "Coordinating logistics and attendee experience.", socials: { linkedin: "https://www.linkedin.com/in/vidisha-goel-b57a1a328/", github: "https://github.com/Vidisha21Goel" } },
    { name: "Preeti Singh", role: "Graphics Head", bio: "Creating visually stunning designs and graphics.", socials: { linkedin: "https://www.linkedin.com/in/preeti-singh-9b8554328", github: "https://github.com/preeti2428" } },
    { name: "Divyansh Verma", role: "Treasurer", bio: "Managing finances and sponsorships.", socials: { linkedin: "https://www.linkedin.com/in/divyansh-verma-045602274", github: "https://github.com/procoder-divyanshv" } },
];

// PDF Data based Domain Teams (Exact Sequence)
const eventTeam = [
    { name: "Suryank Batham", role: "Event Team", bio: "2nd Year", socials: { linkedin: "https://www.linkedin.com/in/suryank-batham-814544328/", github: "https://github.com/SuryankB" } },
    { name: "Ravi Kishan", role: "Event Team", bio: "2nd Year", socials: { linkedin: "https://www.linkedin.com/in/ravi-kishan-a880a5328", github: "https://github.com/RAVI-KISHAN-ui" } },
    { name: "Sushant Sharma", role: "Event Team", bio: "2nd Year", socials: { linkedin: "https://www.linkedin.com/in/sushantsharma29/", github: "https://github.com/KRISURA" } },
    { name: "Arpit Abhinav Chauhan", role: "Event Team", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/arpit2527", github: "https://github.com/apt2527" } },
    { name: "Vaishali Singh", role: "Event Team", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/vaishali-singh-3470b5382/", github: "https://github.com/vaishalisingh102005-cc" } },
    { name: "Khushi Bhakuni", role: "Event Team", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/khushi-1-bhakuni", github: "https://github.com/khushi1bhakuni" } },
    { name: "Saurabh Kumar Gupta", role: "Event Team", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/saurabh-kumar-381b82381/", github: "https://github.com/Saurabh0770" } },
];

const graphicsTeam = [
    { name: "Raj Ojha", role: "Graphics Team", bio: "2nd Year", socials: { linkedin: "https://www.linkedin.com/in/raj-ojha-14a991327/", github: "https://www.linkedin.com/in/raj-ojha-14a9" } },
    { name: "Kishan Singh", role: "Graphics Team", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/kishansingh7x/", github: "https://github.com/kishansingh7x" } },
    { name: "Arjun", role: "Graphics Team", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/arjun-deo-singh-66ba65381/", github: "https://github.com/intruder1516y" } },
    { name: "Tooba Ashfaque", role: "Graphics Team", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/tooba-ashfaque/", github: "https://github.com/too-baa" } },
];

const prTeam = [
    { name: "Rudrika Singhal", role: "PR Team", bio: "2nd Year", socials: { linkedin: "https://www.linkedin.com/in/rudrika-singhal-74a705328/" } },
    { name: "Lucky Diwakar", role: "PR Team", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/lucky-diwakar-8b7713381/", github: "https://github.com/Lucky947-git" } },
];

const technicalTeam = [
    { name: "Himadri Sharma", role: "Member", bio: "3rd Year", socials: { linkedin: "https://www.linkedin.com/in/himadri-sharma-5569912a5", github: "https://github.com/himadritech21" } },
    { name: "Vaishnavi Mishra", role: "Member", bio: "2nd Year", socials: { linkedin: "https://www.linkedin.com/in/vsnvi11/", github: "https://github.com/the11dev" } },
    { name: "Sarthak Sharma", role: "Member", bio: "2nd Year", socials: { linkedin: "https://www.linkedin.com/in/sarthaksharmakiet", github: "https://github.com/Sarthak752008" } },
    { name: "Akshit vats", role: "Member", bio: "2nd Year", socials: { linkedin: "https://www.linkedin.com/in/akshitvats026", github: "https://github.com/Akshitvats026" } },
    { name: "Kartikey Kumar", role: "Member", bio: "2nd Year", socials: { linkedin: "https://www.linkedin.com/in/er-kk/", github: "https://github.com/kartikey-kk" } },
    { name: "Ashwani kumar Jaiswal", role: "Member", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/ashwanikumarj94/", github: "https://github.com/heyy-ashwani" } },
    { name: "Ritik Chaudhary", role: "Member", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/ritik-chaudhary-2kk7/", github: "https://github.com/Ritik-AIML" } },
    { name: "Anushka Gupta", role: "Member", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/anushka-gupta-616515329/", github: "https://github.com/anushkagupta200615-j" } },
    { name: "Sandhya singh", role: "Member", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/sandhya-singh-3019832a4/", github: "https://github.com/sandhyas6515" } },
    { name: "Ayush Pathak", role: "Member", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/ayush-pathak-0988b3381", github: "https://github.com/ayushpathak-957" } },
    { name: "Chirag Gupta", role: "Member", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/chiraq-qupta-aa3497379/", github: "https://github.com/chirag-gupta-07" } },
    { name: "Ayush Pathak", role: "Member", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/ayush-pathak-0988b3381/", github: "https://github.com/ayushpathak-957" } },
    { name: "Atul Kushwaha", role: "Member", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/atul-kushwaha-9b0290381/", github: "https://github.com/atulkushwaha0112-py" } },
    { name: "Ankit Kumar Singh", role: "Member", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/ankit-kumar-singh-927a81381", github: "https://github.com/ankit3890" } },
    { name: "Dakshita Singh", role: "Member", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/dakshita-singh-b24216383/", github: "https://github.com/dakshita-singh-codes" } },
    { name: "Divyansh Maheshwari", role: "Member", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/divyansh-maheshwari-6493b2381/", github: "https://github.com/divyanshmaheshwari61" } },
    { name: "Akansh Dwivedi", role: "Member", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/akansh-dwivedi-b79501355/", github: "https://github.com/Akanshdwi?tab=reposit" } },
    { name: "Aalishba", role: "Member", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/aalishba-khan-45758a27a/", github: "https://github.com/aalishba-7" } },
    { name: "Khushi Tripathi", role: "Member", bio: "1st Year", socials: { linkedin: "https://www.linkedin.com/in/khushi-tripathi-b6117636a/", github: "https://github.com/Khushi Tripathi762" } },
];

const treasurerTeam = [
    { name: "Isha Tyagi", role: "Treasurer Team", bio: "2nd Year", socials: { linkedin: "https://www.linkedin.com/in/isha-tyagi-989829328/", github: "https://github.com/Ishatyagi06" } },
    { name: "Swayam Srivastava", role: "Treasurer Team", bio: "2nd Year", socials: { linkedin: "https://www.linkedin.com/in/swayam-srivastava-8244a0328", github: "https://github.com/Swayam17032005" } },
    { name: "Rishi Patwa", role: "Treasurer Team", bio: "2nd Year", socials: { linkedin: "https://www.linkedin.com/in/rishi-patwa-437b0b328/", github: "https://share.google/v4JoxEWIZSq0zrmS" } },
    { name: "Deepak Joshi", role: "Treasurer Team", bio: "2nd Year", socials: { linkedin: "https://www.linkedin.com/in/deepak-joshi-23a42a327/", github: "https://github.com/Deepak-Joshii" } },
];

const domains = [
    { id: "technical", title: "Technical Domain", members: technicalTeam, color: "from-blue-500/20 to-cyan-500/20", borderColor: "group-hover:border-cyan-500/50" },
    { id: "event", title: "Event Management", members: eventTeam, color: "from-purple-500/20 to-pink-500/20", borderColor: "group-hover:border-purple-500/50" },
    { id: "graphics", title: "Graphics & Design", members: graphicsTeam, color: "from-green-500/20 to-emerald-500/20", borderColor: "group-hover:border-[#4DBC1B]/50" },
    { id: "pr", title: "Public Relations", members: prTeam, color: "from-orange-500/20 to-red-500/20", borderColor: "group-hover:border-orange-500/50" },
    { id: "treasurer", title: "Treasury & Finance", members: treasurerTeam, color: "from-yellow-500/20 to-amber-500/20", borderColor: "group-hover:border-yellow-500/50" },
];

function DomainSection({ title, members, color, borderColor }: { title: string, members: any[], color: string, borderColor: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-6 md:mb-8 w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] p-5 md:p-8 transition-all duration-300 hover:bg-white/5 ${borderColor}`}
            >
                <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex flex-col items-start gap-1 md:gap-2">
                        <h3 className="text-xl md:text-3xl font-bold text-white transition-colors text-left">
                            {title}
                        </h3>
                        <span className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-widest">
                            {members.length} Members
                        </span>
                    </div>

                    <div className={`p-2 md:p-3 rounded-full bg-white/5 border border-white/10 transition-transform duration-300 ${isOpen ? "rotate-180 bg-white/10" : ""}`}>
                        <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pt-6 md:pt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                            {members.map((member, index) => (
                                <TeamMemberCard
                                    key={index}
                                    {...member}
                                    delay={index * 0.05}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function TeamPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#4DBC1B]/30 relative">
            <Navbar />

            {/* Background */}
            <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                <InteractiveDotGrid startAnimation={true} />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 pt-32 md:pt-40 pb-12 md:pb-16 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-4 md:mb-6">
                        Meet the <span className="text-[#4DBC1B] text-glow">Team</span>
                    </h1>
                    <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
                        The brilliant minds driving innovation at NextGen.
                    </p>
                </motion.div>
            </section>

            {/* Core Team Grid */}
            <section className="relative z-10 px-4 md:px-12 pb-20 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8 md:mb-12">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#4DBC1B]/50"></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-widest uppercase">Core Team</h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#4DBC1B]/50"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8 justify-items-center">
                    {coreTeam.map((member, index) => (
                        <TeamMemberCard
                            key={index}
                            {...member}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </section>

            {/* Domain Sections */}
            <section className="relative z-10 px-4 md:px-12 pb-32 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px flex-1 bg-white/20"></div>
                    <h2 className="text-2xl font-bold text-gray-400 tracking-widest uppercase">Domains</h2>
                    <div className="h-px flex-1 bg-white/20"></div>
                </div>

                <div className="flex flex-col gap-4">
                    {domains.map((domain) => (
                        <DomainSection
                            key={domain.id}
                            title={domain.title}
                            members={domain.members}
                            color={domain.color}
                            borderColor={domain.borderColor}
                        />
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}