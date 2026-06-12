import { profile, skillGroups } from "../data/mockData";
import { useLiveStats } from "../hooks/useLiveStats";

export function AboutSection() {
  const { stats, isLoading } = useLiveStats(profile.githubUsername, profile.leetcodeUsername);

  // Recruiter-impressive: specific numbers tell a real story
  const HIGHLIGHTS = [
    { value: isLoading ? "..." : (stats.github ? `${stats.github.publicRepos}+` : "20+"),  label: "GitHub Repos",       sub: "Public projects shipped" },
    { value: isLoading ? "..." : (stats.leetcode ? `${stats.leetcode.totalSolved}+` : "135+"), label: "Problems Solved",     sub: "LeetCode (Easy/Med/Hard)" },
    { value: "3+",   label: "Years of Coding",     sub: "Self-taught since school" },
    { value: "5",    label: "Shipped Products",    sub: "Web · C++ · Python" },
  ];

  return (
    <section
      className="py-20 md:py-32 px-6 md:px-12 border-b"
      style={{ borderColor: "var(--border-primary)" }}
      id="about"
    >
      <div className="section-label clip-reveal">001 — ABOUT</div>

      {/* ── Bio row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        <div className="lg:col-span-7 reveal-item">
          <h2 className="text-2xl md:text-3xl font-bold leading-snug text-[var(--text-primary)] mb-6 tracking-tight">
            "I build clean, scalable systems that bridge the gap between complex backend logic and seamless user experiences."
          </h2>
          <p className="text-muted text-sm md:text-base leading-relaxed font-mono">
            {profile.bio}
          </p>
        </div>

        <div className="lg:col-span-4 lg:col-start-9 reveal-item" style={{ transitionDelay: ".15s" }}>
          <div>
            <p className="font-mono text-xs text-[var(--text-faint)] tracking-widest uppercase mb-6 border-b border-[var(--border-primary)] pb-4">Currently focused on</p>
            <ul className="space-y-3 mt-4">
              {["DSA & Problem Solving", "C++ Systems Design", "Full-Stack Web Dev", "Open Source · Freelancing"].map(item => (
                <li key={item} className="flex items-center gap-3 font-mono text-sm text-[var(--text-muted)]">
                  <span className="text-[var(--text-faint)]">/</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Highlight metrics (recruiter-impressive) ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-16 reveal-item" style={{ transitionDelay: ".2s", background: "var(--border-primary)" }}>
        {HIGHLIGHTS.map((h) => (
          <div key={h.label} className="stat-mini-card" style={{ background: "var(--bg-primary)" }}>
            <p className="font-black text-3xl md:text-4xl text-[var(--text-primary)] leading-none">{h.value}</p>
            <p className="font-mono text-xs text-[var(--text-primary)] tracking-wider mt-1">{h.label}</p>
            <p className="font-mono text-[10px] text-muted">{h.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Skills ── */}
      <div className="reveal-item" style={{ transitionDelay: ".3s" }} id="skills">
        <div className="mt-12">
          <p className="font-mono text-xs text-[var(--text-faint)] tracking-widest uppercase mb-6 border-b border-[var(--border-primary)] pb-4">Tech Stack &amp; Skills</p>
          <div className="flex flex-wrap gap-3 mt-6">
            {skillGroups.flatMap(g => g.items).map(skill => (
              <span key={skill} className="btn-outline-sm" style={{ cursor: "default" }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
