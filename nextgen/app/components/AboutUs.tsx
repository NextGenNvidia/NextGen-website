"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useScrollContext } from "./SmoothScrollProvider";

const bootStepCommands = [
  { cmd: "ssh research@nextgen-cluster", text: "Authenticating...\nPassword: ********\nAuthentication successful.\nConnecting to gpu-node-01...\n\nWelcome to NextGen Research Cluster\nLast login: Today 10:24 AM" },
  { cmd: "module load cuda/12.2", text: "[00:00:01] Loaded CUDA 12.2 successfully." },
  { cmd: "module load pytorch", text: "[00:00:02] Loaded PyTorch 2.3.0 successfully." },
  { cmd: "module load opencv", text: "[00:00:03] Loaded OpenCV 4.9.0 successfully." },
  { cmd: "module load transformers", text: "[00:00:04] Loaded HuggingFace Transformers successfully." },
  { cmd: "module load nccl", text: "[00:00:05] Loaded NVIDIA NCCL 2.20 successfully." },
];

const interactiveDirectories = [
  { name: "projects/", target: "#projects" },
  { name: "journey/", target: "#riva" },
  { name: "riva/", target: "#riva" },
  { name: "team/", target: "/team" },
  { name: "events/", target: "#events" },
  { name: "contact/", target: "/contact" },
];

const logMessages = [
  "[INFO] Workspace synchronized.",
  "[INFO] New compute node available.",
  "[INFO] GPU utilization stable.",
  "[INFO] Training queue updated.",
  "[INFO] NCCL ring connection healthy.",
];

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.3 });
  const { scrollTo } = useScrollContext();

  const [bootStep, setBootStep] = useState<number>(0);
  const [showNvidiaSmi, setShowNvidiaSmi] = useState<boolean>(false);
  const [showLsPrompt, setShowLsPrompt] = useState<boolean>(false);
  const [commandInput, setCommandInput] = useState<string>("");
  const [logIndex, setLogIndex] = useState<number>(0);

  // Live System Metrics State
  const [metrics, setMetrics] = useState({
    gpu: 83,
    cpu: 31,
    ram: 58,
    nodes: "64 / 64",
    latency: "2 ms",
    queue: "4 Jobs",
  });

  // System Monitor live metric & log updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        gpu: Math.floor(80 + Math.random() * 8),
        cpu: Math.floor(28 + Math.random() * 8),
        ram: Math.floor(56 + Math.random() * 4),
        nodes: "64 / 64",
        latency: `${Math.floor(2 + Math.random() * 2)} ms`,
        queue: `${Math.floor(3 + Math.random() * 3)} Jobs`,
      });
      setLogIndex((prev) => (prev + 1) % logMessages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Boot sequence step controller
  useEffect(() => {
    if (!isInView) return;

    if (bootStep < bootStepCommands.length) {
      const timer = setTimeout(() => {
        setBootStep((prev) => prev + 1);
      }, 250);
      return () => clearTimeout(timer);
    } else if (!showNvidiaSmi) {
      const timer = setTimeout(() => setShowNvidiaSmi(true), 300);
      return () => clearTimeout(timer);
    } else if (!showLsPrompt) {
      const timer = setTimeout(() => setShowLsPrompt(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isInView, bootStep, showNvidiaSmi, showLsPrompt]);

  // Handle directory click (simulates `cd <dir>`)
  const handleDirectoryClick = useCallback(
    (dir: (typeof interactiveDirectories)[0]) => {
      setCommandInput(`cd ${dir.name}`);

      setTimeout(() => {
        if (dir.target.startsWith("#")) {
          scrollTo(dir.target, { offset: -80 });
        } else {
          window.location.href = dir.target;
        }
        setTimeout(() => setCommandInput(""), 500);
      }, 350);
    },
    [scrollTo]
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#050505] py-16 md:py-24 px-4 md:px-8 text-white select-none overflow-hidden"
    >
      {/* Background Subtle Tech Grid */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(77, 188, 27, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(77, 188, 27, 0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Soft Ambient Green Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#4DBC1B]/6 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* ─── 1. COMPACT TERMINAL WINDOW ────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto mb-20 md:mb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 w-full rounded-xl bg-[#050505] border border-[#4DBC1B]/30 shadow-[0_0_40px_rgba(77,188,27,0.12)] backdrop-blur-2xl overflow-hidden flex flex-col font-mono"
        >
          {/* Terminal Header Bar */}
          <div className="flex items-center justify-between px-3 py-2.5 bg-[#0a0a0a] border-b border-[#4DBC1B]/20 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 inline-block" />
            </div>

            <div className="text-gray-300 font-bold tracking-widest text-[10px] sm:text-[11px] uppercase flex items-center gap-2">
              <span className="text-[#4DBC1B]">NEXTGEN</span> HPC RESEARCH TERMINAL
            </div>

            <div className="flex items-center gap-1.5 text-[10px] tracking-wider text-[#4DBC1B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4DBC1B] animate-pulse" />
              <span>ONLINE</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 p-3 sm:p-5 md:p-6 gap-4 text-[10px] sm:text-xs leading-normal">
            <div className="lg:col-span-3 space-y-2.5">
              {/* Boot Command Logs */}
              {bootStepCommands.slice(0, bootStep).map((step, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <span className="text-[#4DBC1B] font-bold">research@gpu-node-01:~$</span>
                    <span className="text-white font-bold">{step.cmd}</span>
                  </div>
                  <div className="text-gray-400 pl-3 whitespace-pre-line text-[10px]">{step.text}</div>
                </div>
              ))}

              {/* NVIDIA-SMI Table Output */}
              {showNvidiaSmi && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1 pt-1"
                >
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <span className="text-[#4DBC1B] font-bold">research@gpu-node-01:~$</span>
                    <span className="text-white font-bold">nvidia-smi</span>
                  </div>

                  <div className="text-[9px] sm:text-[10px] text-[#4DBC1B]/90 overflow-x-auto font-mono bg-black/70 p-2 sm:p-2.5 rounded border border-[#4DBC1B]/20 leading-tight">
                    <pre>{`+-----------------------------------------------------------------------------+
| NVIDIA-SMI 560.35.02    Driver Version: 560.35.02    CUDA Version: 12.2     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
|===============================+======================+======================|
|   0  NVIDIA H100 80GB    On   | 00000000:00:04.0 Off |                  0%  |
|   1  NVIDIA H100 80GB    On   | 00000000:00:05.0 Off |                  0%  |
|   2  NVIDIA H100 80GB    On   | 00000000:00:06.0 Off |                  0%  |
|   3  NVIDIA H100 80GB    On   | 00000000:00:07.0 Off |                  0%  |
+-------------------------------+----------------------+----------------------+
Memory: 640 GB | CUDA: 12.2 | Driver: 560.xx`}</pre>
                  </div>
                </motion.div>
              )}

              {/* Interactive LS Directory Listing Prompt */}
              {showLsPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pt-2 border-t border-[#4DBC1B]/20 space-y-2"
                >
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <span className="text-[#4DBC1B] font-bold">research@gpu-node-01:~$</span>
                    <span className="text-white font-bold">ls -la</span>
                  </div>

                  <div className="text-[10px] text-gray-400 pl-2">
                    <p className="text-[9px] text-gray-500 mb-1.5">// Click directory to navigate:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-w-md">
                      {interactiveDirectories.map((dir) => (
                        <button
                          key={dir.name}
                          onClick={() => handleDirectoryClick(dir)}
                          className="text-left px-2 py-1 rounded bg-black/60 border border-[#4DBC1B]/30 text-[#4DBC1B] font-bold text-[10px] hover:bg-[#4DBC1B] hover:text-black transition-all duration-200"
                        >
                          {dir.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Input Prompt */}
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs pt-1.5">
                    <span className="text-[#4DBC1B] font-bold">research@gpu-node-01:~$</span>
                    {commandInput ? (
                      <span className="text-white font-bold">{commandInput}</span>
                    ) : (
                      <span className="w-1.5 h-3.5 bg-[#4DBC1B] inline-block animate-pulse" />
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Live System Telemetry Monitor */}
            <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-[#4DBC1B]/20 pt-3 lg:pt-0 lg:pl-4 space-y-2.5 text-[10px] font-mono">
              <div className="text-[#4DBC1B] font-bold tracking-widest text-[9px] uppercase border-b border-[#4DBC1B]/20 pb-1.5">
                // SYSTEM MONITOR
              </div>

              <div className="space-y-2 text-gray-300">
                <div>
                  <span className="text-gray-500 block text-[9px] uppercase">GPU UTILIZATION</span>
                  <span className="text-white font-bold">{metrics.gpu}%</span>
                  <div className="w-full bg-gray-900 h-1 rounded mt-0.5 overflow-hidden">
                    <div className="bg-[#4DBC1B] h-full transition-all duration-500" style={{ width: `${metrics.gpu}%` }} />
                  </div>
                </div>

                <div>
                  <span className="text-gray-500 block text-[9px] uppercase">CPU UTILIZATION</span>
                  <span className="text-white font-bold">{metrics.cpu}%</span>
                  <div className="w-full bg-gray-900 h-1 rounded mt-0.5 overflow-hidden">
                    <div className="bg-[#4DBC1B] h-full transition-all duration-500" style={{ width: `${metrics.cpu}%` }} />
                  </div>
                </div>

                <div className="flex justify-between border-t border-white/5 pt-1.5 text-[10px]">
                  <span className="text-gray-500">RAM USAGE</span>
                  <span className="text-white font-bold">{metrics.ram} GB</span>
                </div>

                <div className="flex justify-between text-[10px]">
                  <span className="text-gray-500">NODE STATUS</span>
                  <span className="text-[#4DBC1B] font-bold">{metrics.nodes}</span>
                </div>

                <div className="flex justify-between text-[10px]">
                  <span className="text-gray-500">LATENCY</span>
                  <span className="text-white font-bold">{metrics.latency}</span>
                </div>

                <div className="flex justify-between text-[10px]">
                  <span className="text-gray-500">QUEUE</span>
                  <span className="text-white font-bold">{metrics.queue}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#4DBC1B]/20">
                <div className="text-[9px] text-gray-500 uppercase mb-0.5">// CLUSTER LOGS</div>
                <motion.div
                  key={logIndex}
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[10px] text-[#4DBC1B] font-semibold truncate"
                >
                  {logMessages[logIndex]}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── 2. ABOUT US HEADING & DESCRIPTION SECTION ───────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        <div ref={headingRef} className="mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={
              isHeadingInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 60, scale: 0.92 }
            }
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl sm:text-7xl md:text-[8.5rem] font-black tracking-tighter leading-none text-center"
          >
            <span className="text-white">ABOUT </span>
            <span className="text-[#4DBC1B] text-glow">US</span>
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed font-sans font-light"
          >
            We’re a group of curious minds who don’t just learn AI from slides. We experiment with it. We train models on high-performance computing systems. We explore Artificial Intelligence, Machine Learning, Deep Learning and GenAI through hands-on projects, research ideas, and real-world challenges.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm sm:text-base md:text-lg italic leading-relaxed max-w-2xl mx-auto font-sans"
          >
            This is where curiosity turns into capability. Where ideas become projects. And where students grow into engineers who can actually build what they imagine. If you’ve ever wondered what it’s like to work with real supercomputing power, WELCOME!
          </motion.p>
        </div>
      </div>
    </section>
  );
}
