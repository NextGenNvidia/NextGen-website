"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Riva", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Team", href: "#" },
  { name: "Events", href: "#" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-black/50 backdrop-blur-md"
    >
      <div className="flex items-center gap-2">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-[#4ade80]">NEXTGEN</span>{" "}
          <span className="text-white">SuperComputing</span>
        </Link>
        <div className="h-0.5 w-full bg-gradient-to-r from-[#4ade80] to-transparent mt-1 absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-[#4ade80] transition-colors group relative magnetic-item px-2 py-1 rounded-md"
          >
            {link.name}
            <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />

          </Link>
        ))}
      </div>

      <div>
        <Link
          href="/contact"
          className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium text-[#4ade80] transition-all duration-300 bg-transparent border border-[#4ade80] rounded-full hover:bg-[#4ade80]/10 hover:shadow-[0_0_20px_rgba(74,222,128,0.5)] focus:outline-none magnetic-item"
        >
          <span className="relative">Contact Us</span>
        </Link>
      </div>
    </motion.nav>
  );
}
