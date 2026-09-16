import { profile } from "../data/mockData";
import { FlipWords } from "./ui/flip-words";

/* ── Spider Web SVG Corner Component ────────────── */
function SpiderWebCorner({ className }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none opacity-20 ${className}`}>
      <svg className="w-full h-full stroke-red-500 fill-none" strokeWidth="0.8" viewBox="0 0 100 100">
        <path d="M0,0 L100,0 M0,0 L0,100 M0,0 L90,40 M0,0 L70,70 M0,0 L40,90" />
        <path d="M20,0 A20,20 0 0,1 0,20 M40,0 A40,40 0 0,1 0,40 M60,0 A60,60 0 0,1 0,60 M80,0 A80,80 0 0,1 0,80 M100,0 A100,100 0 0,1 0,100" />
      </svg>
    </div>
  );
}

/* ── Action Burst Component ────────────── */
function ActionBurst({ text, color = "yellow", className = "" }: { text: string; color?: "yellow" | "red"; className?: string }) {
  const bg = color === "yellow" ? "bg-yellow-400" : "bg-red-600";
  const textColor = color === "yellow" ? "text-red-600" : "text-yellow-300";
  return (
    <div className={`select-none pointer-events-none ${className}`}>
      <div className={`clip-burst ${bg} border-2 border-black p-5 shadow-[4px_4px_0px_#000]`}>
        <span className={`font-comic-hero font-black text-xs ${textColor} tracking-tighter uppercase px-1`}>{text}</span>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [first, last] = profile.name.split(" ");

  const flipWords = [
    "web apps",
    "fullstack systems",
    "insane UI/UX",
    "high-perf backends",
    "zero-bug APIs",
  ];

  return (
    <section className="hero-section relative min-h-[calc(100vh-80px)] overflow-hidden" id="hero">
      {/* ── Background Layers ────────────── */}
      <div className="absolute inset-0 comic-halftone opacity-45 pointer-events-none" />
      <div className="absolute inset-0 speed-lines opacity-30 pointer-events-none" />

      {/* Radial gradient glows */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-[750px] h-[750px] bg-blue-900/25 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Spider web corners */}
      <SpiderWebCorner className="top-0 left-0 w-44 h-44" />
      <SpiderWebCorner className="top-8 right-0 w-36 h-36 rotate-90 opacity-15" />

      {/* Floating action bursts */}
      <ActionBurst text="POW!" className="absolute top-12 left-1/2 -translate-x-12 z-0 hidden lg:block rotate-12 scale-90" />
      <ActionBurst text="CRUNCH!" color="red" className="absolute bottom-16 left-6 z-0 hidden lg:block -rotate-12 scale-75" />

      {/* ── Hero Content ────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center py-10 md:py-16 min-h-[calc(100vh-80px)]">

        {/* ═══ LEFT: Comic Panel 1 ═══ */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">

          {/* Issue badge */}
          <div className="reveal-item inline-flex items-center gap-3 px-3.5 py-1.5 bg-neutral-900 border-2 border-black shadow-[3px_3px_0px_#E23636] mb-5" style={{ transitionDelay: ".05s" }}>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <span className="font-comic-mono text-xs text-red-500 font-bold uppercase tracking-wider">ISSUE #01: ORIGIN STORY</span>
            </div>
            <span className="text-neutral-600 font-bold text-xs">|</span>
            <span className="font-comic-mono text-xs text-yellow-400 font-semibold tracking-wider uppercase">EARTH-616 DIRECT EDITION</span>
            <span className="bg-red-600 text-white font-comic-hero text-[10px] font-black px-1 border border-black uppercase hidden sm:inline">APPROVED BY CCA</span>
          </div>

          {/* Speech bubble greeting */}
          <div className="reveal-item relative mb-3 inline-block" style={{ transitionDelay: ".15s" }}>
            <div className="relative bg-[#FFE81F] text-neutral-950 font-comic-hero font-black uppercase text-xl md:text-2xl px-5 py-2 border-4 border-black shadow-[4px_4px_0px_#000] speech-tail rotate-[-2.5deg] inline-flex items-center gap-2">
              <span>Hey! I'm</span>
              <span className="text-xl">👋</span>
            </div>
          </div>

          {/* Giant comic title name */}
          <div className="reveal-item relative w-full my-2" style={{ transitionDelay: ".2s" }}>
            <h1 className="font-comic-hero font-black uppercase tracking-tight text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.88] comic-title-3d select-none cursor-none" data-cursor="hero-name">
              {first}<br />
              <span className="text-red-600">{last}</span>
            </h1>

            {/* Floating THWIP burst */}
            <div className="absolute -top-7 right-4 md:right-16 z-20 rotate-[18deg] hover:rotate-12 transition-transform duration-200">
              <div className="clip-burst bg-yellow-400 border-3 border-black px-5 py-3 shadow-[4px_4px_0px_#000] cursor-pointer active:scale-95">
                <span className="font-comic-hero font-black text-base md:text-xl text-red-600 tracking-tighter uppercase drop-shadow-[1px_1px_0px_#000]">THWIP!</span>
              </div>
            </div>
          </div>

          {/* Cycling tagline */}
          <div className="reveal-item mt-4 mb-7 flex flex-col gap-2" style={{ transitionDelay: ".3s" }}>
            <div className="flex items-center flex-wrap gap-2 text-xl md:text-2xl font-bold font-comic-body text-neutral-200">
              <span>I build</span>
              <FlipWords
                words={flipWords}
                duration={2000}
                className="text-yellow-400 font-comic-hero font-black uppercase tracking-wider underline decoration-red-600 decoration-4 underline-offset-4"
              />
              <span className="text-neutral-400 font-normal">that conquer chaos.</span>
            </div>

            {/* Sarcastic Spider-Man quip */}
            <p className="font-comic-body text-neutral-400 text-sm md:text-base max-w-xl leading-relaxed border-l-4 border-red-600 pl-3.5 py-1 mt-1 bg-neutral-950/60">
              <span className="text-neutral-200 font-semibold italic">"With great computing power comes great responsibility to write clean code."</span>{" "}
              Full-stack architect by day, bug vigilante by 3 AM. Armed with React, TypeScript, and spider-sense debugging intuition.
            </p>
          </div>

          {/* Comic action CTAs */}
          <div className="reveal-item flex flex-wrap items-center gap-4 pt-1 w-full" style={{ transitionDelay: ".35s" }}>
            {/* Primary CTA */}
            <a href="#contact" className="comic-btn-primary group">
              <span className="text-yellow-300 text-2xl">⚡</span>
              <span>LET'S TALK</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>

            {/* Terminal launcher */}
            <a href="#terminal" className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-100 font-comic-mono text-sm font-bold uppercase tracking-wider px-5 py-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:border-yellow-400 transition-colors">
              <span className="text-red-500">$</span>
              <span>./view-arsenal.sh</span>
            </a>

            {/* Available badge */}
            <div className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border-2 border-neutral-800 shadow-[2px_2px_0px_#000]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="font-comic-mono text-xs text-neutral-300 font-semibold uppercase">READY FOR MISSION</span>
            </div>
          </div>

          {/* Footer meta */}
          <div className="reveal-item mt-8 flex items-center gap-4 text-xs font-comic-mono text-neutral-500" style={{ transitionDelay: ".4s" }}>
            <span>LOC: LUCKNOW / HYBRID</span>
            <span>•</span>
            <span>LATENCY: 12ms</span>
            <span>•</span>
            <span className="text-red-400 font-bold">SPIDER-SENSE: 100% OPERATIONAL</span>
          </div>
        </div>

        {/* ═══ RIGHT: Comic Panel 2 — Tilted Laptop ═══ */}
        <div className="lg:col-span-5 relative comic-perspective mt-8 lg:mt-0 reveal-item" style={{ transitionDelay: ".35s" }}>
          <div className="comic-tilted-panel relative bg-neutral-950 border-4 border-black p-4 md:p-6 shadow-[10px_10px_0px_0px_#E23636] z-10">

            {/* Corner tabs */}
            <div className="absolute -top-3 -left-3 bg-yellow-400 text-neutral-950 font-black text-[10px] px-2 py-0.5 border-2 border-black font-comic-hero uppercase rotate-[-6deg] z-20 shadow-[2px_2px_0px_#000]">
              PANEL #02
            </div>
            <div className="absolute -bottom-3 -right-3 bg-blue-700 text-white font-black text-[10px] px-2 py-0.5 border-2 border-black font-comic-hero uppercase rotate-[4deg] z-20 shadow-[2px_2px_0px_#000]">
              LIVE REPO FEED
            </div>

            {/* Bug free sticker */}
            <div className="absolute -top-6 -right-6 z-30 rotate-12 hover:rotate-0 transition-transform">
              <div className="bg-yellow-400 text-neutral-950 font-comic-hero font-black text-xs px-3 py-1.5 border-3 border-black shadow-[3px_3px_0px_#000] uppercase tracking-tight">
                100% BUG FREE*
                <span className="block text-[8px] font-comic-mono text-neutral-800">*(EXCEPT SPIDERS)</span>
              </div>
            </div>

            {/* Laptop display */}
            <div className="w-full bg-[#111317] border-3 border-neutral-900 rounded-t-lg overflow-hidden shadow-2xl">
              {/* Browser bar */}
              <div className="bg-neutral-900 px-4 py-2.5 border-b-2 border-black flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-600 border border-black" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500 border border-black" />
                </div>
                <div className="bg-neutral-950 px-3 py-0.5 rounded border border-neutral-800 text-[11px] font-comic-mono text-neutral-400 flex items-center gap-1">
                  <span className="text-red-500">🔒</span>
                  <span>github.com/qwertyuii7</span>
                </div>
                <span className="text-neutral-500 text-sm">⌨</span>
              </div>

              {/* Screen content */}
              <div className="p-4 space-y-4 font-comic-mono text-xs">
                {/* Mini profile */}
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full bg-red-600 border-2 border-yellow-400 p-0.5 shadow-[2px_2px_0px_#000]">
                      <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full rounded-full object-cover" />
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-black rounded-full" />
                    </div>
                    <div>
                      <div className="font-comic-hero font-black text-sm text-neutral-100 flex items-center gap-1">
                        <span>{profile.name}</span>
                        <span className="text-red-500">✓</span>
                      </div>
                      <div className="text-[10px] text-neutral-400 font-comic-mono">@{profile.githubUsername} • Level 99 Code Slinger</div>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="font-comic-hero font-black text-yellow-400 text-sm">2,418 COMMITS</div>
                    <div className="text-[9px] text-neutral-500">CURRENT STREAK: 142 DAYS</div>
                  </div>
                </div>

                {/* Commit grid */}
                <div className="bg-neutral-950 p-2.5 border border-neutral-800 rounded">
                  <div className="flex justify-between items-center text-[10px] text-neutral-400 mb-1.5">
                    <span className="font-bold uppercase tracking-wider text-neutral-300">Activity Grid (Year 2025)</span>
                    <span className="text-red-400 font-bold">Thwip Activity: MAX</span>
                  </div>
                  <div className="grid grid-flow-col grid-rows-4 gap-1.5 justify-between">
                    {Array.from({ length: 32 }, (_, i) => {
                      const colors = ["bg-neutral-800", "bg-red-600", "bg-red-500", "bg-red-700", "bg-emerald-500", "bg-yellow-400"];
                      return <div key={i} className={`w-2.5 h-2.5 ${colors[i % colors.length]} rounded-sm`} />;
                    })}
                  </div>
                </div>

                {/* Terminal output */}
                <div className="bg-black/90 p-2.5 border-l-2 border-red-500 font-comic-mono text-[10px] text-neutral-300">
                  <div className="text-emerald-400 font-bold">$ mayank --status --hero-mode</div>
                  <div className="text-neutral-400">&gt; Spider-Tracer connected to prod-us-east-1.</div>
                  <div className="text-yellow-300">&gt; 0 runtime exceptions detected. City is safe.</div>
                </div>
              </div>
            </div>

            {/* Laptop base */}
            <div className="h-3 bg-neutral-800 border-x-4 border-b-4 border-black rounded-b-lg flex justify-center items-center">
              <div className="w-16 h-1 bg-neutral-600 rounded-full" />
            </div>

            {/* Tech badges */}
            <div className="mt-4 flex flex-wrap items-center gap-2 justify-center">
              {["TypeScript", "React", "Next.js", "Node.js", "Tailwind"].map(tech => (
                <span key={tech} className="px-2.5 py-1 bg-neutral-900 text-neutral-200 border-2 border-black font-comic-mono text-xs font-bold shadow-[2px_2px_0px_#000]">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* BAM! burst behind laptop */}
          <ActionBurst text="BAM!" color="red" className="absolute -bottom-6 -left-6 z-20 rotate-[-15deg]" />
        </div>
      </div>

      {/* ── Comic section divider ────────────── */}
      <div className="w-full mt-12 border-b-4 border-neutral-900 relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-950 px-4 border-2 border-black text-[10px] font-comic-mono uppercase tracking-widest text-neutral-500">
          CONTINUED IN ISSUE #02
        </div>
      </div>
    </section>
  );
}
