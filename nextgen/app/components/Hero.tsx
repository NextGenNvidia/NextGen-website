"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden">
            {/* Background Gradient/Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#4ade80]/10 rounded-full blur-[120px] -z-10"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
            >
                <span className="text-sm font-medium tracking-wide text-gray-400 uppercase">
                    <span className="text-[#4ade80]">NEXTGEN</span> SuperComputing
                </span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl"
            >
                From Code to Supercomputers
            </motion.h1>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-3xl md:text-5xl font-bold tracking-tight text-[#4ade80] mb-12"
            >
                Your Journey Starts Here
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col md:flex-row gap-6"
            >
                <Link
                    href="/luna"
                    className="px-8 py-3 text-lg font-medium text-[#4ade80] border border-[#4ade80] rounded-full hover:bg-[#4ade80]/10 transition-all duration-300 transform hover:scale-105 magnetic-item"
                >
                    Explore Riva
                </Link>
                <Link
                    href="/projects"
                    className="px-8 py-3 text-lg font-medium text-[#4ade80] border border-[#4ade80] rounded-full hover:bg-[#4ade80]/10 transition-all duration-300 transform hover:scale-105 magnetic-item"
                >
                    Other Projects
                </Link>
            </motion.div>

            {/* Footer Image/Graphic Placeholder */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-0 left-0 p-8"
            >
                {/*  We can add the circuit board image here if available, for now just a placeholder or ignored if not critical yet */}
            </motion.div>
        </section>
    );
}
