"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Position & Physics Refs (Zero React State for 60 FPS)
  const mouse = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const dot = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100, scaleX: 1, scaleY: 1, scale: 1 });
  const magnet = useRef({ x: 0, y: 0 });

  const hoverState = useRef<"default" | "button" | "card" | "link" | "image">("default");
  const isMouseDown = useRef(false);
  const isScrolling = useRef(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Trail particles pool
  const particles = useRef<Array<{ x: number; y: number; alpha: number; size: number }>>([]);

  useEffect(() => {
    // Disable on touch / mobile devices or reduced motion
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch) return;

    const dotEl = dotRef.current;
    const ringEl = ringRef.current;
    const pulseEl = pulseRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!dotEl || !ringEl) return;

    // Resize canvas for particles
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse Move Event
    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      // Check hovered elements for interactive states & magnetic pull
      const targetEl = e.target as HTMLElement | null;
      if (targetEl) {
        const buttonEl = targetEl.closest("button, .btn, a.rounded-full, [role='button']");
        const cardEl = targetEl.closest(".rounded-2xl, .rounded-xl, [class*='card']");
        const linkEl = targetEl.closest("a, nav a, .nav-link-animated");
        const imgEl = targetEl.closest("img, canvas, svg");

        if (buttonEl) {
          hoverState.current = "button";
          // Magnetic attraction calculation (max 10px)
          const rect = buttonEl.getBoundingClientRect();
          const btnCenterX = rect.left + rect.width / 2;
          const btnCenterY = rect.top + rect.height / 2;
          const distX = (btnCenterX - e.clientX) * 0.25;
          const distY = (btnCenterY - e.clientY) * 0.25;
          magnet.current.x = Math.max(-10, Math.min(10, distX));
          magnet.current.y = Math.max(-10, Math.min(10, distY));
        } else if (linkEl) {
          hoverState.current = "link";
          magnet.current = { x: 0, y: 0 };
        } else if (cardEl) {
          hoverState.current = "card";
          magnet.current = { x: 0, y: 0 };
        } else if (imgEl) {
          hoverState.current = "image";
          magnet.current = { x: 0, y: 0 };
        } else {
          hoverState.current = "default";
          magnet.current = { x: 0, y: 0 };
        }
      }

      // Add energy trail particle (max 8 particles)
      if (!prefersReducedMotion && Math.random() > 0.4) {
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          alpha: 0.6,
          size: Math.random() * 2 + 1.5,
        });
        if (particles.current.length > 8) particles.current.shift();
      }
    };

    // Scroll Detection (stretches outer ring)
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY.current);
      lastScrollY.current = currentY;

      if (delta > 2) {
        isScrolling.current = true;
        ring.current.scaleY = 1.25;
        ring.current.scaleX = 0.82;

        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          isScrolling.current = false;
        }, 150);
      }
    };

    // Click Event (Energy Pulse)
    const onMouseDown = () => {
      isMouseDown.current = true;
      if (pulseEl) {
        pulseEl.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) scale(0.2)`;
        pulseEl.style.opacity = "0.9";
        requestAnimationFrame(() => {
          pulseEl.style.transition = "transform 260ms cubic-bezier(0.16, 1, 0.3, 1), opacity 260ms ease-out";
          pulseEl.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) scale(2.8)`;
          pulseEl.style.opacity = "0";
        });
      }
    };

    const onMouseUp = () => {
      isMouseDown.current = false;
      if (pulseEl) {
        pulseEl.style.transition = "none";
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    // Main 60 FPS Animation RAF Loop
    let animFrameId: number;

    const render = () => {
      mouse.current.x = target.current.x + magnet.current.x;
      mouse.current.y = target.current.y + magnet.current.y;

      // Lerp positions (Dot fast, Ring smooth lag)
      const lerpDot = prefersReducedMotion ? 1 : 0.45;
      const lerpRing = prefersReducedMotion ? 1 : 0.16;

      dot.current.x += (mouse.current.x - dot.current.x) * lerpDot;
      dot.current.y += (mouse.current.y - dot.current.y) * lerpDot;

      ring.current.x += (mouse.current.x - ring.current.x) * lerpRing;
      ring.current.y += (mouse.current.y - ring.current.y) * lerpRing;

      // Smooth scroll stretch recovery
      if (!isScrolling.current) {
        ring.current.scaleX += (1 - ring.current.scaleX) * 0.2;
        ring.current.scaleY += (1 - ring.current.scaleY) * 0.2;
      }

      // Base Scale based on Hover State
      let targetScale = 1;
      if (hoverState.current === "button") targetScale = 1.6;
      else if (hoverState.current === "card") targetScale = 1.25;
      else if (hoverState.current === "link") targetScale = 0.75;
      else if (hoverState.current === "image") targetScale = 1.35;

      if (isMouseDown.current) targetScale *= 0.85;

      ring.current.scale += (targetScale - ring.current.scale) * 0.2;

      // Apply transforms
      dotEl.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%)`;
      ringEl.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${ring.current.scaleX * ring.current.scale}, ${ring.current.scaleY * ring.current.scale})`;

      // Render Trail Particles on Canvas
      if (ctx && canvas && !prefersReducedMotion) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.alpha -= 0.04;
          p.size *= 0.95;

          if (p.alpha <= 0) {
            particles.current.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(77, 188, 27, ${p.alpha})`;
          ctx.fill();
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <>
      {/* Particle Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9997] pointer-events-none hidden md:block"
      />

      {/* Primary Glowing Center Dot (8px) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block rounded-full bg-[#4DBC1B] shadow-[0_0_12px_#4DBC1B]"
        style={{
          width: 8,
          height: 8,
          willChange: "transform",
        }}
      />

      {/* Secondary Lagging Outer Ring (26px) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block rounded-full border border-[#4DBC1B]/60 shadow-[0_0_15px_rgba(77,188,27,0.25)] transition-colors duration-200"
        style={{
          width: 26,
          height: 26,
          backgroundColor: "rgba(77, 188, 27, 0.04)",
          willChange: "transform",
        }}
      />

      {/* Click Pulse Ripple */}
      <div
        ref={pulseRef}
        className="fixed top-0 left-0 z-[9996] pointer-events-none hidden md:block rounded-full border-2 border-[#4DBC1B]"
        style={{
          width: 24,
          height: 24,
          marginLeft: -12,
          marginTop: -12,
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}
