"use client";

import React, { createContext, useContext, useCallback } from "react";

// Context 
type ScrollTarget = string | HTMLElement | number;

interface ScrollContextValue {
    scrollTo: (target: ScrollTarget, options?: { offset?: number; duration?: number }) => void;
    lenis: { current: null };
}

const ScrollContext = createContext<ScrollContextValue>({
    scrollTo: () => { },
    lenis: { current: null },
});

export function useScrollContext() {
    return useContext(ScrollContext);
}

//  Provider (Zero-Lag Native Engine) 
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const scrollTo = useCallback(
        (target: ScrollTarget, options: { offset?: number } = {}) => {
            const offset = options.offset ?? 0;

            if (typeof target === "number") {
                window.scrollTo({
                    top: target + offset,
                    behavior: "smooth",
                });
            } else if (typeof target === "string") {
                const el = document.querySelector(target);
                if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY + offset;
                    window.scrollTo({ top, behavior: "smooth" });
                }
            } else if (target instanceof HTMLElement) {
                const top = target.getBoundingClientRect().top + window.scrollY + offset;
                window.scrollTo({ top, behavior: "smooth" });
            }
        },
        []
    );

    return (
        <ScrollContext.Provider value={{ scrollTo, lenis: { current: null } }}>
            {children}
        </ScrollContext.Provider>
    );
}