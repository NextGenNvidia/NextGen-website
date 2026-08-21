"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  MessageSquare,
  Sparkles,
  Users,
  Code2,
  Building2,
  Cpu,
  GraduationCap,
  ExternalLink,
  Send,
  CheckCircle2,
} from "lucide-react";

// Node Interface for Neural Network
interface NetworkNode {
  id: string;
  label: string;
  category: "social" | "research" | "collaboration" | "community";
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  size: number; // radius px
  icon: any;
  value: string;
  href: string;
  description: string;
  connections: string[]; // connected node IDs
}

const networkNodes: NetworkNode[] = [
  {
    id: "email",
    label: "Email",
    category: "social",
    x: 20,
    y: 35,
    size: 22,
    icon: Mail,
    value: "dgxcoe@kiet.edu",
    href: "mailto:dgxcoe@kiet.edu",
    description: "Direct line for general inquiries, media, and support.",
    connections: ["research", "partnerships", "workshops"],
  },
  {
    id: "github",
    label: "GitHub",
    category: "social",
    x: 38,
    y: 20,
    size: 24,
    icon: Github,
    value: "nextgen-supercomputing",
    href: "https://github.com",
    description: "Explore open-source HPC repositories and student code bases.",
    connections: ["opensource", "email", "community"],
  },
  {
    id: "discord",
    label: "Discord",
    category: "community",
    x: 50,
    y: 45,
    size: 26,
    icon: MessageSquare,
    value: "NextGen SuperComputing",
    href: "https://discord.com/channels/1532507711634145412/1532507712255037576",
    description: "Join our active developer and student researcher chat.",
    connections: ["github", "linkedin", "community", "workshops"],
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    category: "social",
    x: 62,
    y: 25,
    size: 24,
    icon: Linkedin,
    value: "NextGen SuperComputing",
    href: "https://www.linkedin.com/company/nextgen-supercomputing/",
    description: "Follow news, events, and industry career milestones.",
    connections: ["discord", "partnerships", "location"],
  },
  {
    id: "research",
    label: "Research Collaboration",
    category: "research",
    x: 28,
    y: 65,
    size: 28,
    icon: Cpu,
    value: "AI & HPC Labs",
    href: "mailto:dgxcoe@kiet.edu?subject=Research%20Collaboration",
    description: "Partner on deep learning models and CUDA cluster workloads.",
    connections: ["email", "partnerships", "workshops"],
  },
  {
    id: "partnerships",
    label: "Industry Partnerships",
    category: "collaboration",
    x: 75,
    y: 40,
    size: 26,
    icon: Building2,
    value: "Sponsorship & Tech Access",
    href: "mailto:dgxcoe@kiet.edu?subject=Industry%20Partnership",
    description: "Connect your enterprise with top student AI talent.",
    connections: ["linkedin", "email", "sponsorship"],
  },
  {
    id: "workshops",
    label: "Workshops & Training",
    category: "community",
    x: 42,
    y: 75,
    size: 24,
    icon: GraduationCap,
    value: "Hands-on GPU Labs",
    href: "mailto:dgxcoe@kiet.edu?subject=Workshop%20Inquiry",
    description: "Enroll or sponsor specialized parallel computing bootcamps.",
    connections: ["research", "discord", "community"],
  },
  {
    id: "opensource",
    label: "Open Source",
    category: "collaboration",
    x: 15,
    y: 18,
    size: 20,
    icon: Code2,
    value: "Public Repositories",
    href: "https://github.com",
    description: "Contribute to distributed AI models and research tools.",
    connections: ["github"],
  },
  {
    id: "community",
    label: "Community",
    category: "community",
    x: 60,
    y: 72,
    size: 22,
    icon: Users,
    value: "Student Innovators",
    href: "https://discord.com/channels/1532507711634145412/1532507712255037576",
    description: "Engage with curious minds building supercomputing projects.",
    connections: ["discord", "workshops"],
  },
  {
    id: "sponsorship",
    label: "Sponsorship",
    category: "collaboration",
    x: 82,
    y: 65,
    size: 22,
    icon: Sparkles,
    value: "Grant & Compute Sponsors",
    href: "mailto:dgxcoe@kiet.edu?subject=Sponsorship",
    description: "Sponsor hardware clusters and hackathon prize pools.",
    connections: ["partnerships"],
  },
  {
    id: "location",
    label: "Location",
    category: "social",
    x: 85,
    y: 20,
    size: 20,
    icon: MapPin,
    value: "KIET Deemed to be University, Ghaziabad",
    href: "#",
    description: "Visit our campus AI & Supercomputing Center of Excellence.",
    connections: ["linkedin"],
  },
];

export default function ContactPage() {
  const [activeNodeId, setActiveNodeId] = useState<string>("email");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const activeNode = networkNodes.find((n) => n.id === activeNodeId) || networkNodes[0];

  // Mouse parallax handler
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 20, y: y * 20 });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar ready={true} />
      <main className="bg-black text-white min-h-screen relative overflow-hidden select-none">

        {/* --- Background Sci-Fi Tech Mesh & Particles --- */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 30%, rgba(77, 188, 27, 0.15) 0%, transparent 70%),
                                linear-gradient(rgba(77, 188, 27, 0.08) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(77, 188, 27, 0.08) 1px, transparent 1px)`,
              backgroundSize: "100% 100%, 50px 50px, 50px 50px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#4DBC1B]/8 rounded-full blur-[180px] pointer-events-none z-0" />

        {/* --- HERO HEADER SECTION --- */}
        <section className="relative z-10 pt-32 pb-12 px-4 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#4DBC1B]/30 bg-[#4DBC1B]/10 text-[#4DBC1B] text-xs font-bold tracking-widest uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Network Contact Hub
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-4"
          >
            GET IN <span className="text-[#4DBC1B] text-glow">TOUCH</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            Connect directly to our high-performance computing network. Tap any node to inspect endpoints or reach our team.
          </motion.p>
        </section>

        {/* --- MAIN INTERACTIVE NEURAL NETWORK CONTACT HUB --- */}
        <section
          className="relative z-10 max-w-6xl mx-auto px-4 my-8 h-[520px] sm:h-[580px] md:h-[620px] rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center"
          onMouseMove={handleMouseMove}
        >
          {/* Network Background Glow Circle */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-[#4DBC1B]/5 blur-3xl pointer-events-none" />

          {/* SVG Connection Lines & Data Pulses */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {networkNodes.map((node) =>
              node.connections.map((targetId) => {
                const targetNode = networkNodes.find((n) => n.id === targetId);
                if (!targetNode) return null;

                const isConnectedToActive =
                  node.id === activeNodeId || targetNode.id === activeNodeId;

                return (
                  <g key={`${node.id}-${targetNode.id}`}>
                    <line
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${targetNode.x}%`}
                      y2={`${targetNode.y}%`}
                      stroke={isConnectedToActive ? "#4DBC1B" : "#4DBC1B"}
                      strokeOpacity={isConnectedToActive ? "0.85" : "0.15"}
                      strokeWidth={isConnectedToActive ? "2" : "1"}
                      strokeDasharray={isConnectedToActive ? "none" : "3 4"}
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })
            )}
          </svg>

          {/* Neural Nodes Floating in Space */}
          <div
            className="relative w-full h-full transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0px)`,
            }}
          >
            {networkNodes.map((node) => {
              const isActive = node.id === activeNodeId;
              const IconComponent = node.icon;

              return (
                <motion.div
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  style={{
                    position: "absolute",
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  whileHover={{ scale: 1.25 }}
                  className="cursor-pointer group z-20"
                >
                  {/* Outer Pulsing Aura */}
                  <div
                    className={`relative rounded-full flex items-center justify-center transition-all duration-500 ${isActive
                        ? "bg-[#4DBC1B] text-black shadow-[0_0_35px_#4DBC1B] border-2 border-[#4DBC1B]"
                        : "bg-black/80 text-[#4DBC1B] border border-[#4DBC1B]/40 hover:border-[#4DBC1B] hover:shadow-[0_0_20px_rgba(77,188,27,0.4)]"
                      }`}
                    style={{
                      width: `${node.size * 2}px`,
                      height: `${node.size * 2}px`,
                    }}
                  >
                    <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />

                    {/* Active Ping ring */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-full border border-[#4DBC1B] animate-ping opacity-40" />
                    )}
                  </div>

                  {/* Node Label underneath */}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 mt-2 text-[10px] sm:text-xs font-bold tracking-wider whitespace-nowrap transition-colors duration-300 ${isActive ? "text-[#4DBC1B]" : "text-gray-400 group-hover:text-white"
                      }`}
                  >
                    {node.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Floating Information Card Overlay for Active Node */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-6 right-6 z-30 max-w-sm w-[calc(100%-3rem)] bg-black/90 border border-[#4DBC1B] rounded-2xl p-5 shadow-[0_0_40px_rgba(77,188,27,0.3)] backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-widest text-[#4DBC1B] uppercase px-2.5 py-0.5 rounded-full border border-[#4DBC1B]/30 bg-[#4DBC1B]/10">
                  {activeNode.category}
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4DBC1B] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4DBC1B]" />
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-white mb-1 flex items-center gap-2">
                {activeNode.label}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">{activeNode.description}</p>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className="text-xs font-mono text-[#4DBC1B] truncate max-w-[180px]">
                  {activeNode.value}
                </span>
                <a
                  href={activeNode.href}
                  target={activeNode.href.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-black bg-[#4DBC1B] hover:bg-[#5dd420] transition-colors flex items-center gap-1"
                >
                  <span>Connect</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* --- 4 COMMUNICATION CARDS --- */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              COMMUNICATION <span className="text-[#4DBC1B] text-glow">CHANNELS</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Research Collaboration",
                icon: Cpu,
                desc: "Co-develop parallel algorithms, CUDA workloads, and machine learning models.",
                action: "Explore Research",
                nodeTarget: "research",
              },
              {
                title: "Industry Partnership",
                icon: Building2,
                desc: "Access student engineering talent and compute infrastructure sponsorships.",
                action: "Partner With Us",
                nodeTarget: "partnerships",
              },
              {
                title: "Open Source Contribution",
                icon: Code2,
                desc: "Contribute to NextGen student repositories and community developer tools.",
                action: "View Repositories",
                nodeTarget: "opensource",
              },
              {
                title: "General Contact",
                icon: Mail,
                desc: "Have a general question, feedback, or media inquiry for our executive team?",
                action: "Send Inquiry",
                nodeTarget: "email",
              },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveNodeId(card.nodeTarget)}
                className="group relative rounded-2xl bg-[#0a0a0a] border border-white/10 p-6 hover:border-[#4DBC1B]/60 hover:shadow-[0_0_30px_rgba(77,188,27,0.2)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#4DBC1B]/10 border border-[#4DBC1B]/30 flex items-center justify-center text-[#4DBC1B] mb-5 group-hover:scale-110 transition-transform">
                    <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#4DBC1B] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6">{card.desc}</p>
                </div>

                <button className="text-xs font-bold text-[#4DBC1B] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  <span>{card.action}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- CONTACT INFORMATION & COMPACT GLASS FORM --- */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8 items-start">

            {/* Left: Direct Contact Information */}
            <div className="md:col-span-1 space-y-6 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-black text-white mb-4">
                DIRECT <span className="text-[#4DBC1B]">ENDPOINTS</span>
              </h3>

              {[
                { icon: Mail, label: "Email", val: "dgxcoe@kiet.edu", href: "mailto:dgxcoe@kiet.edu" },
                { icon: Github, label: "GitHub", val: "nextgen-supercomputing", href: "https://github.com" },
                { icon: MessageSquare, label: "Discord", val: "NextGen SuperComputing", href: "https://discord.com/channels/1532507711634145412/1532507712255037576" },
                { icon: Linkedin, label: "LinkedIn", val: "NextGen SuperComputing", href: "https://www.linkedin.com/company/nextgen-supercomputing/" },
                { icon: MapPin, label: "Location", val: "KIET Deemed to be University, Ghaziabad", href: "#" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : "_self"}
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#4DBC1B]/10 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-[#4DBC1B]/10 text-[#4DBC1B] group-hover:bg-[#4DBC1B]/20 transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{item.label}</p>
                    <p className="text-xs font-semibold text-white group-hover:text-[#4DBC1B] truncate transition-colors">
                      {item.val}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Right: Glass Contact Form Panel */}
            <div className="md:col-span-2 bg-[#0a0a0a] border border-[#4DBC1B]/30 rounded-2xl p-6 sm:p-10 shadow-[0_0_40px_rgba(77,188,27,0.1)] backdrop-blur-xl">
              <h3 className="text-xl font-extrabold text-white mb-2">TRANSMIT MESSAGE</h3>
              <p className="text-xs text-gray-400 mb-6">Send a direct message to our lab administrators.</p>

              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-12 h-12 text-[#4DBC1B] mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-white mb-1">Transmission Received!</h4>
                  <p className="text-xs text-gray-400">Thank you for reaching out. We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/10 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-[#4DBC1B] transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/10 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-[#4DBC1B] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/10 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-[#4DBC1B] transition-colors"
                      placeholder="How can we collaborate?"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/10 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-[#4DBC1B] transition-colors resize-none"
                      placeholder="Describe your inquiry or proposal..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#4DBC1B] text-black font-extrabold text-xs tracking-wider uppercase rounded-lg hover:bg-[#5dd420] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{loading ? "Transmitting..." : "Send Transmission"}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}