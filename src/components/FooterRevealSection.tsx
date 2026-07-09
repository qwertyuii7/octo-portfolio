import { useEffect, useRef } from "react";
import { profile } from "../data/mockData";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export function FooterRevealSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 180 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 8000), 120);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Check current theme color for elegant contrast
      const isDraft = document.documentElement.getAttribute("data-theme") === "draft";
      const dotColor = isDraft ? "0, 0, 0" : "255, 255, 255";
      const accentColor = isDraft ? "63, 185, 80" : "88, 166, 255"; // Subtle green/blue elegance

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, ${p.alpha})`;
        ctx.fill();

        // Connect particles near each other
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 110) * 0.15;
            ctx.strokeStyle = `rgba(${dotColor}, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Connect particle to mouse with refined geometric constellation
        const mdx = p.x - mouseRef.current.x;
        const mdy = p.y - mouseRef.current.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < mouseRef.current.radius) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          const mouseAlpha = (1 - mDist / mouseRef.current.radius) * 0.35;
          ctx.strokeStyle = `rgba(${accentColor}, ${mouseAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Gentle magnetic pull towards mouse for organic feel
          p.x -= (mdx / mDist) * 0.3;
          p.y -= (mdy / mDist) * 0.3;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: 180,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000, radius: 180 };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="hero-name"
      className="relative w-full h-full bg-[var(--bg-secondary)] overflow-hidden flex flex-col justify-between p-8 sm:p-14 md:p-20 select-none transition-colors duration-700"
    >
      {/* ── INTERACTIVE CONSTELLATION & VELVET STARFIELD BG CANVAS ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      />

      {/* ── SUBTLE CLASSY VIGNETTE GRADIENT ── */}
      <div
        className="absolute inset-0 pointer-events-none z-15 opacity-40"
        style={{
          background:
            "radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.65) 100%)",
        }}
      />

      {/* ── EMPTY TOP SPACING FOR PERFECT VERTICAL BALANCE ── */}
      <div aria-hidden className="h-6 relative z-20" />

      {/* ── MAIN TYPOGRAPHY BLOCK (100% STATIC, SHARP & EFFECT-FREE) ── */}
      <div className="relative z-20 my-auto flex flex-col items-center justify-center text-center max-w-full">
        {/* SUBTITLE */}
        <p className="font-mono text-xs sm:text-sm md:text-base uppercase tracking-[0.35em] font-light text-[var(--text-muted)] mb-4 sm:mb-8">
          Built and Designed by
        </p>

        {/* COLOSSAL STATIC NAME */}
        <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10.5rem] font-black font-mono uppercase leading-none text-[var(--text-primary)] max-w-full break-words tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          <span>MAYANK</span>{" "}
          <span>CHAUDHARY</span>
        </h2>
      </div>

      {/* ── MINIMALIST PROFESSIONAL FOOTER LINKS ── */}
      <div className="relative z-20 flex items-center justify-center gap-8 sm:gap-14 pt-6 sm:pt-10 font-mono text-xs tracking-[0.28em] uppercase font-light text-[var(--text-muted)] border-t border-[var(--border-primary)]/30">
        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:text-[var(--text-primary)] transition-colors duration-300"
        >
          GitHub ↗
        </a>
        <a
          href={profile.leetcodeUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:text-[var(--text-primary)] transition-colors duration-300"
        >
          LeetCode ↗
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="hover:text-[var(--text-primary)] transition-colors duration-300"
        >
          Email ↗
        </a>
      </div>
    </div>
  );
}
