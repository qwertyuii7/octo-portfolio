interface StudioLoaderProps {
  booting: boolean;
  progress: number;
}

export function StudioLoader({ booting, progress }: StudioLoaderProps) {
  const isFinished = progress >= 100;

  return (
    <div
      aria-hidden={!booting}
      className="fixed inset-0 z-[100000] flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none pointer-events-auto bg-[#0D0D0D] text-[#F5F5F5] overflow-hidden transition-all duration-[800ms] cubic-bezier(0.76,0,0.24,1)"
      style={{
        opacity: isFinished && !booting ? 0 : 1,
        transform: isFinished && !booting ? "translateY(-100%)" : "translateY(0%)",
        pointerEvents: booting ? "auto" : "none",
        visibility: booting || isFinished ? "visible" : "hidden",
      }}
    >
      {/* ── Halftone background ── */}
      <div className="absolute inset-0 comic-halftone opacity-30 pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

      {/* ── TOP BAR ── */}
      <div className="relative z-10 flex items-center justify-between w-full font-comic-mono text-xs tracking-[0.35em] uppercase text-neutral-500 border-b-2 border-neutral-800 pb-4">
        <span className="text-red-500 font-bold">🕷️ SPIDER-VERSE PORTFOLIO</span>
        <span className="hidden sm:inline-block text-yellow-400">EARTH-616 DIRECT EDITION</span>
      </div>

      {/* ── CENTER: TITLE & PROGRESS ── */}
      <div className="relative z-10 my-auto flex flex-col items-start sm:items-center justify-center text-left sm:text-center max-w-full w-full">
        <p className="font-comic-mono text-[10px] sm:text-xs tracking-[0.45em] uppercase font-light text-red-400 mb-3 sm:mb-5">
          Loading Issue #01...
        </p>

        <h1 className="text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-comic-hero font-black uppercase tracking-tight leading-none mb-6 sm:mb-10 comic-title-3d select-none">
          MAYANK<br className="sm:hidden" /> CHAUDHARY
        </h1>

        {/* Progress bar with comic styling */}
        <div className="w-full sm:w-[480px] max-w-full h-[3px] bg-neutral-800 border border-neutral-700 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="relative z-10 flex items-end justify-between w-full border-t-2 border-neutral-800 pt-4 sm:pt-6">
        <div className="flex flex-col font-comic-mono text-xs tracking-[0.25em] uppercase text-neutral-500">
          <span className="text-red-500">SPIDER-SENSE STATUS</span>
          <span className="text-yellow-400 font-medium mt-1">
            {isFinished ? "SPIDER-SENSE ACTIVATED // READY" : "DEPLOYING WEB-SHOOTERS..."}
          </span>
        </div>

        <div className="font-comic-hero text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none text-red-500 tabular-nums">
          {progress < 10 ? `0${progress}` : progress}
          <span className="text-xl sm:text-3xl text-neutral-600 font-light ml-1">%</span>
        </div>
      </div>
    </div>
  );
}
