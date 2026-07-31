"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative bg-black pt-24 md:pt-32 pb-8 px-4 md:px-8 overflow-hidden">
            {/* CTA Area */}
            <div className="max-w-6xl mx-auto mb-20 md:mb-28 text-center md:text-left">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-5xl font-black leading-tight">
                        <span className="text-white">Experience power</span>
                        <br />
                        <span className="text-white">like </span>
                        <span className="text-[#4DBC1B] text-glow">NEVER BEFORE</span>
                    </h2>
                </motion.div>
            </div>

            {/* Large Brand Name */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h3 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black tracking-tight">
                    <span className="text-[#4DBC1B]">NEXTGEN</span>{" "}
                    <span className="text-white">SuperComputing</span>
                </h3>
            </motion.div>

            {/* Divider */}
            <div className="max-w-6xl mx-auto">
                <div className="h-px bg-gradient-to-r from-transparent via-[#4DBC1B]/20 to-transparent mb-6" />

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs text-gray-600">
                            <span className="text-[#4DBC1B]/60">NEXTGEN</span>{" "}
                            <span className="text-gray-600">SuperComputing</span>
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs text-gray-600">
                            © {new Date().getFullYear()} All rights reserved.
                        </span>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}
