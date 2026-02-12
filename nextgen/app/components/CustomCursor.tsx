"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);
    const isMagnetic = useRef(false);

    // Motion values for raw mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation
    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(mouseX, smoothOptions);
    const smoothY = useSpring(mouseY, smoothOptions);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isMagnetic.current) {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Handle magnetic items
            const magneticItem = target.closest(".magnetic-item");
            if (magneticItem) {
                isMagnetic.current = true;
                setIsHovered(true);
                const rect = magneticItem.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                mouseX.set(centerX);
                mouseY.set(centerY);
                return;
            }

            // Handle other interactables
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovered(true);
                isMagnetic.current = false;
            } else {
                setIsHovered(false);
                isMagnetic.current = false;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block mix-blend-difference"
                style={{
                    x: smoothX,
                    y: smoothY,
                }}
            >
                <motion.div
                    animate={{
                        width: isHovered ? 80 : 12,
                        height: isHovered ? 80 : 12,
                        backgroundColor: isHovered ? "#4ade80" : "#ffffff",
                        opacity: isHovered ? 0.3 : 1,
                        x: "-50%",
                        y: "-50%",
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        mass: 0.5
                    }}
                    className="rounded-full pointer-events-none"
                />
            </motion.div>
        </>
    );
}
