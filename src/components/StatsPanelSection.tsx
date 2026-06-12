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
    <section className="section-pad border-b" style={{ borderColor: "var(--border-primary)" }} id="stats">
      <div className="section-label clip-reveal">003 — STATS</div>

      {/* ═══════════════════════════════════════════════════════
          ROW 1 — GitHub Contribution Calendar (full width)
          ═══════════════════════════════════════════════════════ */}
      <div className="stats-panel reveal-item mb-6">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: "var(--text-muted)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 4 }}>
              GitHub Contributions
            </p>
            <a
              href="https://github.com/qwertyuii7"
              target="_blank" rel="noreferrer"
              style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "#666", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "#666")}
            >
              @qwertyuii7 ↗
            </a>
          </div>
          {/* Quick stat pills */}
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {displayGithubStats.map(s => (
              <div key={s.label} style={{ textAlign: "right" }}>
                <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 18, fontWeight: 900, color: "var(--text-primary)", lineHeight: 1 }}>
                  {isLoading ? "..." : s.value}
                </p>
                <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: "#666", letterSpacing: ".12em", textTransform: "uppercase", marginTop: 4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar — horizontally scrollable on mobile */}
        <div style={{ overflowX: "auto", paddingBottom: 8, scrollbarWidth: "thin", scrollbarColor: "#222 transparent" }}>
          <GitHubCalendar
            username="qwertyuii7"
            colorScheme="dark"
            theme={{ dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"] }}
            style={{ color: "var(--text-muted)", fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, minWidth: 680 }}
            labels={{ totalCount: "{{count}} contributions in the last year" }}
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          ROW 2 — Problems Solved (3-column horizontal layout)
          ═══════════════════════════════════════════════════════ */}
      <div
        className="reveal-item"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 1,
          background: "var(--border-primary)",
          transitionDelay: ".15s",
        }}
      >
        {/* LeetCode panel */}
        <div className="stats-panel" style={{ borderRight: "none", borderLeft: "none", borderTop: "none", borderBottom: "none" }}>
          <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: "var(--text-muted)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 4 }}>
            LeetCode
          </p>
          <a href="https://leetcode.com/u/chaudharymayank/" target="_blank" rel="noreferrer"
            style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "#666", textDecoration: "none", display: "block", marginBottom: 20, transition: "color .2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={e => (e.currentTarget.style.color = "#666")}
          >
            @chaudharymayank ↗
          </a>
          <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 52, fontWeight: 900, color: "var(--text-primary)", lineHeight: 1, marginBottom: 20 }}>
            {isLoading ? "..." : displayLeetcodeTotal}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {displayLeetcodeRows.map(row => (
              <div key={row.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>{row.label}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "var(--text-primary)", fontWeight: 700 }}>
                    {isLoading ? "..." : row.value}
                  </span>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: isLoading ? "0%" : `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HackerRank panel */}
        <div className="stats-panel" style={{ borderRight: "none", borderLeft: "none", borderTop: "none", borderBottom: "none" }}>
          <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: "var(--text-muted)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 4 }}>
            HackerRank
          </p>
          <a href="https://www.hackerrank.com/profile/mayankchaudhar31" target="_blank" rel="noreferrer"
            style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: "var(--text-faint)", textDecoration: "none", display: "block", marginBottom: 20, transition: "color .2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-faint)")}
          >
            @mayankchaudhar31 ↗
          </a>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            {[
              { skill: "Problem Solving", stars: 5 },
              { skill: "C++",             stars: 4 },
              { skill: "Python",          stars: 3 },
            ].map(item => (
              <div key={item.skill} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: "var(--text-muted)" }}>{item.skill}</span>
                <span style={{ color: "var(--text-muted)", fontSize: 14, letterSpacing: 3 }}>
                  {"★".repeat(item.stars)}{"☆".repeat(5 - item.stars)}
                </span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--border-primary)", paddingTop: 16 }}>
            <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".12em" }}>
              Gold Badge — Problem Solving
            </p>
          </div>
        </div>

        {/* Platform summary panel */}
        <div className="stats-panel" style={{ borderRight: "none", borderLeft: "none", borderTop: "none", borderBottom: "none" }}>
          <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: "var(--text-muted)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 20 }}>
            Also On
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {platformLinks.map(p => (
              <a key={p.label} href={p.url} target="_blank" rel="noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  borderBottom: "1px solid var(--border-primary)", paddingBottom: 16,
                  textDecoration: "none",
                  transition: "all .2s",
                }}
                className="group"
                data-cursor-hover=""
              >
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".12em" }}>
                  {p.label}
                </span>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: "var(--text-faint)" }}>
                  @{p.handle} ↗
                </span>
              </a>
            ))}
          </div>
          {/* Available now card */}
          <div style={{ marginTop: 24, padding: "16px 20px", border: "1px solid rgba(63,185,80,.2)", background: "rgba(63,185,80,.04)", borderRadius: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#3fb950", boxShadow: "0 0 6px #3fb950", display: "inline-block" }} />
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: "#3fb950", letterSpacing: ".15em", textTransform: "uppercase" }}>
                Available Now
              </span>
            </div>
            <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "#777", lineHeight: 1.6 }}>
              Open to internships, freelance projects &amp; entry-level engineering roles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
