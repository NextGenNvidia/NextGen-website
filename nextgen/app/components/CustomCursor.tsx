"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const onMouseMove = (e: MouseEvent) => {
            cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
        };

        document.addEventListener("mousemove", onMouseMove, { passive: true });
        return () => document.removeEventListener("mousemove", onMouseMove);
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed z-[9999] pointer-events-none hidden md:block"
            style={{
                width: 12,
                height: 12,
                top: 0,
                left: 0,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                mixBlendMode: "difference",
                willChange: "transform",
            }}
        />
    );
}
