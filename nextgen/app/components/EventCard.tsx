"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import Image from "next/image";

interface EventProps {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    image: string;
    status: "upcoming" | "past";
    registrationLink?: string;
    delay?: number;
}

export default function EventCard({
    title,
    date,
    time,
    location,
    description,
    image,
    status,
    registrationLink,
    delay = 0,
}: EventProps) {
    const isUpcoming = status === "upcoming";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-[#4DBC1B]/50 transition-colors duration-300 flex flex-col h-full"
        >
            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                {image && (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}

                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isUpcoming ? "bg-[#4DBC1B] text-black" : "bg-gray-700 text-gray-300"
                    }`}>
                    {isUpcoming ? "Upcoming" : "Past Event"}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#4DBC1B] transition-colors line-clamp-2">
                        {title}
                    </h3>

                    <div className="space-y-2 mt-3">
                        <div className="flex items-center text-gray-400 text-sm">
                            <Calendar className="w-4 h-4 mr-2 text-[#4DBC1B]" />
                            {date}
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                            <Clock className="w-4 h-4 mr-2 text-[#4DBC1B]" />
                            {time}
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                            <MapPin className="w-4 h-4 mr-2 text-[#4DBC1B]" />
                            {location}
                        </div>
                    </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {description}
                </p>

                {/* Footer / Action */}
                <div className="mt-auto pt-4 border-t border-white/10">
                    {isUpcoming ? (
                        <a
                            href={registrationLink || "#"}
                            className="block w-full py-2 text-center text-sm font-bold text-black bg-[#4DBC1B] rounded-lg hover:bg-[#3da015] transition-colors"
                        >
                            Register Now
                        </a>
                    ) : (
                        <button disabled className="block w-full py-2 text-center text-sm font-medium text-gray-500 bg-white/5 rounded-lg cursor-not-allowed">
                            Event Ended
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
