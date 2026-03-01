"use client";

import { createContext, useContext, useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

// ─── Context ────────────────────────────────────────────────────────────────

type ScrollTarget = string | HTMLElement | number;

interface ScrollContextValue {
    scrollTo: (target: ScrollTarget, options?: { offset?: number; duration?: number }) => void;
    lenis: React.MutableRefObject<Lenis | null>;
}

const ScrollContext = createContext<ScrollContextValue>({
    scrollTo: () => { },
    lenis: { current: null },
});

export function useScrollContext() {
    return useContext(ScrollContext);
}

// ─── Provider ────────────────────────────────────────────────────────────────

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            // smoothTouch is not in LenisOptions for v1.x — native touch scroll is used on mobile
            touchMultiplier: 1.5,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        }

        rafRef.current = requestAnimationFrame(raf);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            lenis.destroy();
        };
    }, []);

    const scrollTo = useCallback(
        (target: ScrollTarget, options: { offset?: number; duration?: number } = {}) => {
            if (!lenisRef.current) return;
            lenisRef.current.scrollTo(target as any, {
                offset: options.offset ?? 0,
                duration: options.duration ?? 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        },
        []
    );

    return (
        <ScrollContext.Provider value={{ scrollTo, lenis: lenisRef }}>
            {children}
        </ScrollContext.Provider>
    );
}
