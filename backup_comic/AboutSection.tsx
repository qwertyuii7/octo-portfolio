import { profile, skillGroups, aboutHighlights } from "../data/mockData";
import { useLiveStats } from "../hooks/useLiveStats";
import { TechMarquee3D } from "./TechMarquee3D";

export function AboutSection() {
  const { stats, isLoading } = useLiveStats(profile.githubUsername, profile.leetcodeUsername);

  const HIGHLIGHTS = [
    { value: isLoading ? "..." : (stats.github ? `${Math.max(40, Number(stats.github.publicRepos))}+` : "40+"), label: "GitHub Repos", sub: "Public projects shipped" },
    { value: isLoading ? "..." : (stats.leetcode ? `${Math.max(210, stats.leetcode.totalSolved)}+` : "210+"), label: "Problems Solved", sub: "DSA (Easy/Med/Hard)" },
    ...aboutHighlights,
  ];

  return (
    <section
      className="py-20 md:py-32 px-6 md:px-12 border-b-4 border-neutral-900 relative overflow-hidden"
      id="about"
    >
      {/* Halftone background */}
      <div className="absolute inset-0 comic-halftone-red opacity-20 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">

        {/* ── Comic Issue Header ── */}
        <div className="reveal-item inline-flex items-center gap-3 px-3 py-1.5 bg-neutral-900 border-2 border-black shadow-[3px_3px_0px_#E23636] mb-8">
          <span className="font-comic-mono text-xs text-red-500 font-bold uppercase tracking-wider">PANEL #02: ABOUT ME</span>
          <span className="text-neutral-600">|</span>
          <span className="font-comic-mono text-xs text-yellow-400 uppercase tracking-wider">ORIGIN STORY</span>
        </div>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 reveal-item">

            {/* Bio Quote — Comic narrative caption */}
            <div className="md:col-span-2 bg-[#FFE81F]/10 border-3 border-black p-6 shadow-[6px_6px_0px_0px_#000] relative">
              <div className="absolute -top-3 left-4 bg-yellow-400 text-black font-comic-hero text-[10px] px-2 py-0.5 border-2 border-black uppercase">
                NARRATOR
              </div>
              <h2 className="text-xl md:text-2xl font-bold leading-snug text-[var(--text-primary)] mb-6 tracking-tight font-comic-body">
                "I build clean, scalable systems that bridge the gap between complex backend logic and seamless user experiences."
              </h2>
              <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed font-comic-mono">
                {profile.bio}
              </p>
            </div>

            {/* Highlight Stats — Comic badge cards */}
            <div className="bg-neutral-900/80 border-3 border-black p-6 shadow-[4px_4px_0px_#E23636] relative">
              <div className="absolute -top-3 left-4 bg-red-600 text-white font-comic-hero text-[10px] px-2 py-0.5 border-2 border-black uppercase">
                POWER STATS
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {HIGHLIGHTS.map((h) => (
                  <div key={h.label} className="p-3 border-2 border-neutral-800 bg-neutral-950 hover:border-red-500 transition-colors">
                    <p className="font-comic-hero font-black text-2xl md:text-3xl text-yellow-400 leading-none">{h.value}</p>
                    <p className="font-comic-mono text-xs text-[var(--text-primary)] tracking-wider mt-1">{h.label}</p>
                    <p className="font-comic-mono text-[10px] text-[var(--text-muted)] mt-0.5">{h.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Currently Focused — Spider-Man style */}
            <div className="bg-neutral-900/80 border-3 border-black p-6 shadow-[4px_4px_0px_#1A3A7A] relative">
              <div className="absolute -top-3 left-4 bg-blue-700 text-white font-comic-hero text-[10px] px-2 py-0.5 border-2 border-black uppercase">
                SPIDER-SENSE LAB
              </div>
              <div className="mt-2">
                <p className="font-comic-mono text-xs text-[var(--text-faint)] tracking-widest uppercase mb-4 border-b border-neutral-800 pb-3">Currently exploring</p>
                <ul className="space-y-3 mt-3">
                  {["System Design", "WebSockets & Redis", "3D Web Experiences (Three.js)", "AI Agents & MCP"].map(item => (
                    <li key={item} className="flex items-center gap-3 font-comic-mono text-sm text-[var(--text-muted)]">
                      <span className="text-red-500 font-bold">›</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Spider-Man quote panel */}
          <div className="hidden lg:flex flex-col justify-center items-center">
            <div className="relative bg-neutral-900 border-3 border-black p-8 shadow-[8px_8px_0px_#E23636] max-w-sm">
              <p className="font-comic-hero text-3xl text-center text-yellow-400 uppercase tracking-wider leading-tight">
                "WITH GREAT CODE COMES GREAT RESPONSIBILITY."
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <span className="comic-badge comic-badge-red text-[10px]">EARTH-616 CODE-SLINGER</span>
              </div>
              {/* Action burst */}
              <div className="absolute -top-4 -right-4 rotate-12">
                <div className="clip-burst bg-yellow-400 border-2 border-black p-4 shadow-[3px_3px_0px_#000] scale-75">
                  <span className="font-comic-hero font-black text-xs text-red-600 uppercase">ZAP!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Skills — THE ARSENAL ── */}
        <div className="reveal-item" style={{ transitionDelay: ".3s" }} id="skills">
          <div className="mt-12">
            {/* Arsenal header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-neutral-900 border-2 border-black shadow-[3px_3px_0px_#FFD700]">
                <span className="font-comic-mono text-xs text-yellow-400 font-bold uppercase tracking-wider">PANEL #03: THE ARSENAL</span>
              </div>
              <div className="clip-burst bg-red-600 border-2 border-black p-4 shadow-[2px_2px_0px_#000] scale-50 -ml-2 hidden md:block">
                <span className="font-comic-hero font-black text-[10px] text-yellow-300 uppercase">THWIP!</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {skillGroups.map((group, idx) => {
                const colors = ["border-red-600", "border-blue-700", "border-yellow-500", "border-emerald-500", "border-purple-500", "border-cyan-500", "border-orange-500"];
                const bgColors = ["bg-red-600", "bg-blue-700", "bg-yellow-500", "bg-emerald-500", "bg-purple-500", "bg-cyan-500", "bg-orange-500"];
                return (
                  <div
                    key={group.title}
                    className={`border-2 border-black bg-neutral-900/80 shadow-[4px_4px_0px_#000] comic-card-hover overflow-hidden`}
                  >
                    {/* Category header */}
                    <div className={`${bgColors[idx % bgColors.length]} px-4 py-2 border-b-2 border-black`}>
                      <span className="font-comic-hero font-black text-sm text-white tracking-wider uppercase">
                        {group.title}
                      </span>
                    </div>
                    {/* Tech pills */}
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {group.items.map(skill => (
                          <span
                            key={skill}
                            className={`px-2.5 py-1 border ${colors[idx % colors.length]} bg-neutral-950 text-neutral-200 font-comic-mono text-[11px] font-bold hover:bg-neutral-800 transition-colors cursor-default`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── 3D Infinite Tech Stack Marquee ── */}
        <TechMarquee3D />
      </div>

      {/* Comic section divider */}
      <div className="w-full mt-12 border-b-4 border-neutral-900 relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--bg-primary)] px-4 border-2 border-black text-[10px] font-comic-mono uppercase tracking-widest text-neutral-500">
          CONTINUED IN ISSUE #03
        </div>
      </div>
    </section>
  );
}
