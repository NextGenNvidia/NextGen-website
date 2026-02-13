"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
    baseX: number;
    baseY: number;
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    size: number;
    alpha: number;
}

const PARTICLE_COUNT = 700;
const DOT_COLOR = [77, 188, 27];
const REPULSION_RADIUS = 450;
const REPULSION_STRENGTH = 100;
const ANIMATION_SPEED = 0.35;

export default function InteractiveDotGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animFrameRef = useRef<number>(0);
    const sizeRef = useRef({ w: 0, h: 0 });

    const buildParticles = useCallback(() => {
        const w = sizeRef.current.w;
        const h = sizeRef.current.h;
        const particles: Particle[] = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const x = Math.random() * w;
            const y = Math.random() * h;
            particles.push({
                baseX: x,
                baseY: y,
                x,
                y,
                targetX: x,
                targetY: y,
                size: Math.random() * 1.1 + 0.5,
                alpha: Math.random() * 0.02 + 0.01,
            });
        }
        particlesRef.current = particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.parentElement?.getBoundingClientRect();
            const w = rect?.width || window.innerWidth;
            const h = rect?.height || window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            sizeRef.current = { w, h };
            buildParticles();
        };

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };

        let time = 0;

        const animate = () => {
            const w = sizeRef.current.w;
            const h = sizeRef.current.h;
            ctx.clearRect(0, 0, w, h);
            time += 0.008;

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            // Fluid pulse sphere — slowly orbits around the canvas
            const pulseX = w * 0.5 + Math.sin(time) * w * 0.35;
            const pulseY = h * 0.5 + Math.cos(time * 0.7) * h * 0.3;
            const pulseRadius = 200 + Math.sin(time * 2) * 50;

            particlesRef.current.forEach((p) => {
                const dx = p.baseX - mx;
                const dy = p.baseY - my;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < REPULSION_RADIUS && dist > 0) {
                    const t = 1 - dist / REPULSION_RADIUS;
                    const force = t * t * REPULSION_STRENGTH;
                    const angle = Math.atan2(dy, dx);
                    p.targetX = p.baseX + Math.cos(angle) * force;
                    p.targetY = p.baseY + Math.sin(angle) * force;
                } else {
                    p.targetX = p.baseX;
                    p.targetY = p.baseY;
                }

                p.x += (p.targetX - p.x) * ANIMATION_SPEED;
                p.y += (p.targetY - p.y) * ANIMATION_SPEED;

                // Distance from the moving pulse sphere
                const pulseDx = p.x - pulseX;
                const pulseDy = p.y - pulseY;
                const pulseDist = Math.sqrt(pulseDx * pulseDx + pulseDy * pulseDy);
                const pulseGlow = Math.max(0, 1 - pulseDist / pulseRadius);
                const pulseIntensity = pulseGlow * pulseGlow * 0.4;

                // Mouse proximity
                const distFromMouse = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2);
                const proximity = Math.max(0, 1 - distFromMouse / REPULSION_RADIUS);

                const scale = 1 + proximity * 2 + pulseIntensity * 1.5;
                const alpha = p.alpha + proximity * 0.75 + pulseIntensity;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * scale, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${DOT_COLOR[0]}, ${DOT_COLOR[1]}, ${DOT_COLOR[2]}, ${alpha})`;
                ctx.fill();
            });

            animFrameRef.current = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener("resize", resize);
        document.addEventListener("mousemove", onMouseMove);
        animate();

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener("resize", resize);
            document.removeEventListener("mousemove", onMouseMove);
        };
    }, [buildParticles]);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
