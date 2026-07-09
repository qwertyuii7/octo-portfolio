import React from "react";

interface StudioLoaderProps {
  booting: boolean;
  progress: number;
}

export function StudioLoader({ booting, progress }: StudioLoaderProps) {
  const isFinished = progress >= 100;

  return (
    <div
      aria-hidden={!booting}
      className="fixed inset-0 z-[100000] flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none pointer-events-auto bg-[var(--bg-secondary)] text-[var(--text-primary)] overflow-hidden transition-all duration-[800ms] cubic-bezier(0.76,0,0.24,1)"
      style={{
        opacity: isFinished && !booting ? 0 : 1,
        transform: isFinished && !booting ? "translateY(-100%)" : "translateY(0%)",
        pointerEvents: booting ? "auto" : "none",
        visibility: booting || isFinished ? "visible" : "hidden",
      }}
    >
      {/* ── TOP BAR: CLASSY COFFEE & CODE HEADER ── */}
      <div className="flex items-center justify-between w-full font-mono text-xs tracking-[0.35em] uppercase text-[var(--text-muted)] border-b border-[var(--border-primary)]/40 pb-4">
        <span>MC — CAFFEINE & CODE</span>
        <span className="hidden sm:inline-block">ROASTED & BREWED IN INDIA</span>
      </div>

      {/* ── CENTER STAGE: MONUMENTAL TYPOGRAPHY & PRECISION TRACK ── */}
      <div className="my-auto flex flex-col items-start sm:items-center justify-center text-left sm:text-center max-w-full w-full">
        <p className="font-mono text-[10px] sm:text-xs tracking-[0.45em] uppercase font-light text-[var(--text-muted)] mb-3 sm:mb-5">
          Brewing Fresh Coffee & Ideas...
        </p>

        <h1 className="text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-black font-mono uppercase tracking-tight leading-none mb-6 sm:mb-10 text-[var(--text-primary)]">
          MAYANK CHAUDHARY
        </h1>

        {/* Ultra-Thin Precision Progress Track */}
        <div className="w-full sm:w-[480px] max-w-full h-[1px] bg-[var(--border-primary)]/50 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-[var(--text-primary)] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ── BOTTOM BAR: EDITORIAL COUNTER & BREW STATUS ── */}
      <div className="flex items-end justify-between w-full border-t border-[var(--border-primary)]/40 pt-4 sm:pt-6">
        <div className="flex flex-col font-mono text-xs tracking-[0.25em] uppercase text-[var(--text-muted)]">
          <span>BREW STATUS</span>
          <span className="text-[var(--text-primary)] font-medium mt-1">
            {isFinished ? "ESPRESSO READY // SERVING NOW" : "GRINDING BEANS // BREWING COFFEE..."}
          </span>
        </div>

        <div className="font-mono text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tighter leading-none text-[var(--text-primary)] tabular-nums">
          {progress < 10 ? `0${progress}` : progress}
          <span className="text-xl sm:text-3xl text-[var(--text-muted)] font-light ml-1">%</span>
        </div>
      </div>
    </div>
  );
}
