"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    phase: number;
    speed: number;
}

const COLORS = ["#4DBC1B", "#60a5fa", "#22d3ee", "#a78bfa", "#f472b6", "#ffffff"];

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animFrameRef = useRef<number>(0);

    const initParticles = useCallback((width: number, height: number) => {
        const count = Math.min(180, Math.floor((width * height) / 8000));
        const particles: Particle[] = [];
        for (let i = 0; i < count; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            particles.push({
                x,
                y,
                baseX: x,
                baseY: y,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                alpha: Math.random() * 0.6 + 0.2,
                phase: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.02 + 0.005,
            });
        }
        particlesRef.current = particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.parentElement?.getBoundingClientRect();
            const w = rect?.width || window.innerWidth;
            const h = rect?.height || window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.scale(dpr, dpr);
            initParticles(w, h);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        let time = 0;
        let lastFrame = 0;
        const FRAME_MS = 1000 / 30; // throttle to 30fps
        const CONNECT_DIST_SQ = 100 * 100;
        const REPULSE_DIST_SQ = 120 * 120;

        const animate = (now: number) => {
            animFrameRef.current = requestAnimationFrame(animate);
            if (now - lastFrame < FRAME_MS) return;
            lastFrame = now;

            time += 1;
            const w = canvas.width / (window.devicePixelRatio || 1);
            const h = canvas.height / (window.devicePixelRatio || 1);
            ctx.clearRect(0, 0, w, h);

            const { x: mx, y: my } = mouseRef.current;
            const pts = particlesRef.current;
            const len = pts.length;

            // ── Update positions ──────────────────────────────────────────
            for (let i = 0; i < len; i++) {
                const p = pts[i];
                p.x += p.vx + Math.sin(time * p.speed + p.phase) * 0.3;
                p.y += p.vy + Math.cos(time * p.speed + p.phase) * 0.3;

                // Mouse repulsion — squared distance, no sqrt until inside
                const dx = p.x - mx;
                const dy = p.y - my;
                const dSq = dx * dx + dy * dy;
                if (dSq < REPULSE_DIST_SQ && dSq > 0) {
                    const dist = Math.sqrt(dSq);
                    const force = (120 - dist) / 120;
                    p.x += (dx / dist) * force * 3;
                    p.y += (dy / dist) * force * 3;
                }

                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;
                if (p.y < -10) p.y = h + 10;
                if (p.y > h + 10) p.y = -10;
            }

            // ── Draw particles (no shadowBlur — use fillStyle color directly) ──
            for (let i = 0; i < len; i++) {
                const p = pts[i];
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;

            // ── Draw connections — O(N*(N-1)/2) forward-only, no sqrt unless close ──
            for (let i = 0; i < len; i++) {
                const p = pts[i];
                for (let j = i + 1; j < len; j++) {
                    const p2 = pts[j];
                    const cdx = p.x - p2.x;
                    const cdy = p.y - p2.y;
                    const cdSq = cdx * cdx + cdy * cdy;
                    if (cdSq < CONNECT_DIST_SQ) {
                        const cdist = Math.sqrt(cdSq);
                        ctx.globalAlpha = (1 - cdist / 100) * 0.15;
                        ctx.strokeStyle = p.color;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1;
        };

        animFrameRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener("resize", handleResize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-auto"
            style={{ zIndex: 0 }}
        />
    );
}
