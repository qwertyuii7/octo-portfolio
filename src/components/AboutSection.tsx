import { profile, skillGroups, aboutHighlights } from "../data/mockData";
import { useLiveStats } from "../hooks/useLiveStats";
import { TechMarquee3D } from "./TechMarquee3D";

export function AboutSection() {
  const { stats, isLoading } = useLiveStats(profile.githubUsername, profile.leetcodeUsername);

  // Recruiter-impressive: specific numbers tell a real story
  const HIGHLIGHTS = [
    { value: isLoading ? "..." : (stats.github ? `${stats.github.publicRepos}+` : "20+"),  label: "GitHub Repos",       sub: "Public projects shipped" },
    { value: isLoading ? "..." : (stats.leetcode ? `${stats.leetcode.totalSolved}+` : "135+"), label: "Problems Solved",     sub: "LeetCode (Easy/Med/Hard)" },
    ...aboutHighlights,
  ];

  return (
    <section
      className="py-20 md:py-32 px-6 md:px-12 border-b"
      style={{ borderColor: "var(--border-primary)" }}
      id="about"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="section-label clip-reveal">001 — ABOUT</div>

        {/* ── BENTO GRID on Left Side ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 reveal-item">

            {/* Bento Box 1: Bio Quote & profile.bio (Full Width across left side) */}
            <div className="bento-box md:col-span-2">
              <h2 className="text-xl md:text-2xl font-bold leading-snug text-[var(--text-primary)] mb-6 tracking-tight">
                "I build clean, scalable systems that bridge the gap between complex backend logic and seamless user experiences."
              </h2>
              <p className="text-muted text-sm md:text-base leading-relaxed font-mono">
                {profile.bio}
              </p>
            </div>

            {/* Bento Box 2: Highlight metrics */}
            <div className="bento-box flex flex-col justify-between">
              <div className="grid grid-cols-2 gap-3">
                {HIGHLIGHTS.map((h) => (
                  <div key={h.label} className="p-3 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-primary)]">
                    <p className="font-black text-2xl md:text-3xl text-[var(--text-primary)] leading-none">{h.value}</p>
                    <p className="font-mono text-xs text-[var(--text-primary)] tracking-wider mt-1">{h.label}</p>
                    <p className="font-mono text-[10px] text-muted mt-0.5">{h.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bento Box 3: Currently focused on */}
            <div className="bento-box flex flex-col justify-between">
              <div>
                <p className="font-mono text-xs text-[var(--text-faint)] tracking-widest uppercase mb-6 border-b border-[var(--border-primary)] pb-4">Currently focused on</p>
                <ul className="space-y-3 mt-4">
                  {["System Design", "WebSockets & Redis", "3D Web Experiences (Three.js)", "AI Agents & MCP"].map(item => (
                    <li key={item} className="flex items-center gap-3 font-mono text-sm text-[var(--text-muted)]">
                      <span className="text-[var(--text-faint)]">/</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Right side leaves exact 1.1fr space for the MacBook image coming down from Hero */}
          <div className="hidden lg:block"></div>
        </div>

        {/* ── Skills ── */}
        <div className="reveal-item" style={{ transitionDelay: ".3s" }} id="skills">
          <div className="mt-12">
            <p className="font-mono text-xs text-[var(--text-faint)] tracking-widest uppercase mb-6 border-b border-[var(--border-primary)] pb-4">Tech Stack &amp; Skills</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
              {skillGroups.map(group => (
                <div key={group.title} className="flex flex-col gap-3">
                  <span className="font-mono text-[11px] font-bold text-[var(--card-accent)] tracking-wider uppercase">
                    {group.title}
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map(skill => (
                      <span key={skill} className="btn-outline-sm" style={{ cursor: "default" }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 3D Infinite Tech Stack Marquee ── */}
        <TechMarquee3D />
      </div>
    </section>
  );
}
