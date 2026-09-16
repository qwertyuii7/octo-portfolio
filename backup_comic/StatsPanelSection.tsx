import { GitHubCalendar } from "react-github-calendar";
import { githubStats as staticGithubStats, leetcodeRows as staticLeetcodeRows, platformLinks, profile } from "../data/mockData";
import { useLiveStats } from "../hooks/useLiveStats";

export function StatsPanelSection() {
  const { stats, isLoading } = useLiveStats(profile.githubUsername, profile.leetcodeUsername);

  // Fallbacks
  const displayGithubStats = stats.github ? [
    { label: "Public Repos", value: stats.github.publicRepos.toString() },
    { label: "Primary Stack", value: "C++ / Web" }, // static
    { label: "Recent Push", value: stats.github.recentPush },
    { label: "Profile Since", value: stats.github.profileSince },
  ] : staticGithubStats;

  const displayLeetcodeTotal = stats.leetcode ? stats.leetcode.totalSolved : staticLeetcodeRows.reduce((s, r) => s + parseInt(r.value), 0);

  const displayLeetcodeRows = stats.leetcode ? [
    { label: "Easy", value: stats.leetcode.easy.toString(), pct: stats.leetcode.easyPct },
    { label: "Medium", value: stats.leetcode.medium.toString(), pct: stats.leetcode.mediumPct },
    { label: "Hard", value: stats.leetcode.hard.toString(), pct: stats.leetcode.hardPct },
  ] : staticLeetcodeRows;

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 border-b-4 border-neutral-900 bg-[#0D0D0D] relative overflow-hidden" id="stats">
      {/* Background patterns */}
      <div className="absolute inset-0 comic-halftone opacity-30 pointer-events-none" />
      <div className="absolute inset-0 speed-lines opacity-20 pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Issue Header */}
        <div className="reveal-item inline-flex items-center gap-3 px-3 py-1.5 bg-neutral-900 border-2 border-black shadow-[3px_3px_0px_#E23636] mb-8">
          <span className="font-comic-mono text-xs text-red-500 font-bold uppercase tracking-wider">PANEL #04: POWER LEVELS</span>
          <span className="text-neutral-600">|</span>
          <span className="font-comic-mono text-xs text-yellow-400 uppercase tracking-wider">COMBAT RADAR</span>
        </div>

        <div className="mb-10 reveal-item">
          <h2 className="font-comic-hero text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white comic-title-3d-sm">
            POWER LEVELS &<br />COMBAT RADAR
          </h2>
        </div>

        {/* ═══════════════════════════════════════════════════════
            ROW 1 — GitHub Contribution Calendar (full width)
            ═══════════════════════════════════════════════════════ */}
        <div className="bg-neutral-900/90 border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#1A3A7A] reveal-item mb-8 relative">
          <div className="absolute -top-3 -left-3 bg-blue-700 text-white font-black text-[10px] px-2 py-0.5 border-2 border-black font-comic-hero uppercase rotate-[-4deg] z-20 shadow-[2px_2px_0px_#000]">
            GITHUB NETWORK
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <p className="font-comic-mono text-xs text-neutral-500 tracking-widest uppercase mb-1">
                Code Web Matrix
              </p>
              <a
                href="https://github.com/qwertyuii7"
                target="_blank" rel="noreferrer"
                className="font-comic-hero text-3xl text-white hover:text-blue-400 transition-colors tracking-wide uppercase"
              >
                @qwertyuii7 ↗
              </a>
            </div>
            
            {/* Quick stat pills */}
            <div className="flex flex-wrap gap-4 md:gap-8">
              {displayGithubStats.map(s => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-comic-hero font-black text-2xl text-blue-400">{s.value}</span>
                  <span className="font-comic-mono text-[10px] text-neutral-500 uppercase tracking-wider">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
            <div className="min-w-[750px]" style={{ filter: "drop-shadow(0 0 8px rgba(26,58,122,0.5))" }}>
              <GitHubCalendar
                username={profile.githubUsername}
                colorScheme="dark"
                theme={{
                  dark: ["#1e1e1e", "#1a3a7a", "#3b5998", "#4c70ba", "#E23636"],
                }}
                fontSize={12}
                blockSize={12}
                blockMargin={4}
              />
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            ROW 2 — LeetCode (left, flex-1) & Profiles (right, flex-1)
            ═══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEETCODE BATTLE STATS */}
          <div className="bg-neutral-900/90 border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#FFD700] reveal-item relative" style={{ transitionDelay: ".1s" }}>
            <div className="absolute -top-3 -left-3 bg-yellow-400 text-black font-black text-[10px] px-2 py-0.5 border-2 border-black font-comic-hero uppercase rotate-[3deg] z-20 shadow-[2px_2px_0px_#000]">
              ALGORITHM ARENA
            </div>
            
            {/* Floating POW burst */}
            <div className="absolute top-6 right-6 rotate-12 z-20 hidden sm:block">
              <div className="clip-burst bg-red-600 border-2 border-black p-3 shadow-[2px_2px_0px_#000] scale-90">
                <span className="font-comic-hero font-black text-[10px] text-yellow-300 tracking-tighter uppercase px-1">BOOM!</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8 border-b-2 border-neutral-800 pb-6">
              <div className="w-16 h-16 bg-yellow-400 border-3 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#E23636] rotate-[-5deg]">
                <span className="font-comic-hero font-black text-3xl text-black">LC</span>
              </div>
              <div>
                <a href={profile.leetcodeUrl} target="_blank" rel="noreferrer" className="font-comic-hero text-3xl text-white hover:text-yellow-400 transition-colors uppercase tracking-wide">
                  LeetCode
                </a>
                <p className="font-comic-mono text-xs text-neutral-500 uppercase tracking-widest mt-1">
                  Total Bosses Defeated: <span className="text-yellow-400 font-bold">{displayLeetcodeTotal}</span>
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {displayLeetcodeRows.map((row, i) => {
                const colors = ["bg-emerald-500", "bg-yellow-400", "bg-red-600"];
                const shadows = ["#10b981", "#fbbf24", "#dc2626"];
                return (
                  <div key={row.label} className="w-full">
                    <div className="flex justify-between font-comic-mono text-[10px] text-neutral-400 uppercase tracking-wider mb-2">
                      <span className="text-white font-bold">{row.label}</span>
                      <span>{row.value}</span>
                    </div>
                    {/* Comic Power Bar */}
                    <div className="w-full h-4 bg-neutral-950 border-2 border-black rounded-none overflow-hidden p-0.5">
                      <div
                        className={`h-full ${colors[i]}`}
                        style={{ width: `${row.pct}%`, boxShadow: `0 0 10px ${shadows[i]}` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 pt-4 border-t-2 border-neutral-800 text-center">
              <span className="font-comic-hero text-xl text-yellow-400 uppercase tracking-wider">
                "POWER LEVEL OVER 9000!"
              </span>
            </div>
          </div>

          {/* TRADING CARDS: OTHER PLATFORMS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal-item" style={{ transitionDelay: ".2s" }}>
            {platformLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="bg-neutral-900 border-3 border-black p-5 shadow-[4px_4px_0px_0px_#E23636] hover:shadow-[6px_6px_0px_0px_#FFD700] hover:-translate-y-1 transition-all group flex flex-col justify-between min-h-[140px] relative overflow-hidden"
              >
                {/* Subtle halftone bg in card */}
                <div className="absolute inset-0 comic-halftone opacity-10 pointer-events-none" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-comic-mono text-xs text-neutral-500 uppercase font-bold tracking-widest">{link.label}</span>
                  <span className="text-red-500 group-hover:text-yellow-400 transition-colors">↗</span>
                </div>
                
                <div className="relative z-10 mt-auto">
                  <div className="font-comic-hero text-2xl text-white group-hover:text-yellow-400 transition-colors uppercase tracking-wide">
                    {link.handle}
                  </div>
                  <div className="font-comic-mono text-[10px] text-neutral-400 uppercase mt-1">
                    {link.label}
                  </div>
                </div>
              </a>
            ))}
            
            {/* Decorative empty slot */}
            <div className="bg-neutral-950 border-3 border-dashed border-neutral-800 p-5 flex items-center justify-center opacity-50 min-h-[140px]">
              <span className="font-comic-mono text-[10px] text-neutral-600 uppercase text-center">
                SLOT RESERVED FOR<br/>FUTURE ARTIFACTS
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
