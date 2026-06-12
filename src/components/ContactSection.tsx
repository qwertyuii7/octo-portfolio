import { profile } from "../data/mockData";

const SOCIALS = [
  { label: "GitHub",     url: profile.githubUrl,     handle: profile.githubUsername },
  { label: "LeetCode",   url: profile.leetcodeUrl,   handle: profile.leetcodeUsername },
  { label: "HackerRank", url: profile.hackerRankUrl, handle: profile.hackerRankUsername },
  { label: "Twitter / X", url: "https://x.com/rm_mayank7", handle: "rm_mayank7" },
];

export function ContactSection() {
  return (
    <section
      className="py-20 md:py-32 px-6 md:px-12"
      id="contact"
    >
      <div className="section-label clip-reveal">005 — CONTACT</div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">

        {/* ── CTA left ── */}
        <div className="lg:col-span-8 reveal-item">
          <p className="text-muted font-mono text-xs tracking-widest uppercase mb-6">
            Open to freelance · collaboration · full-time
          </p>
          <h2 className="text-4xl md:text-6xl font-black leading-none tracking-tight text-[var(--text-primary)] mb-10 uppercase">
            Let's build<br />something.
          </h2>

          {/* Email — reduced size */}
          <div className="mb-8">
            <p className="font-mono text-[10px] text-faint tracking-widest uppercase mb-2">Reach me at</p>
            <a
              href={`mailto:${profile.email}`}
              className="contact-email-link"
              data-cursor-hover=""
            >
              {profile.email} ↗
            </a>
          </div>

          {/* Quick-action row */}
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="/resume.pdf"
              download
              className="btn-brutal px-6 py-3 font-mono text-xs uppercase tracking-widest"
              data-cursor-hover=""
            >
              ⬇ Download Resume
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-sm"
              data-cursor-hover=""
            >
              View GitHub Profile ↗
            </a>
          </div>
        </div>

        {/* ── Socials right ── */}
        <div className="lg:col-span-3 lg:col-start-10 flex flex-col gap-4 reveal-item" style={{ transitionDelay: ".2s" }}>
          <p className="section-label" style={{ marginBottom: "12px" }}>Find me on</p>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between border-b pb-3 group"
              style={{ borderColor: "var(--border-primary)" }}
              data-cursor-hover=""
            >
              <span className="font-mono text-xs text-muted tracking-widest uppercase group-hover:text-[var(--text-primary)] transition-colors">
                {s.label}
              </span>
              <span className="font-mono text-[10px] text-faint group-hover:text-[var(--text-muted)] transition-colors">
                @{s.handle} ↗
              </span>
            </a>
          ))}

          {/* Availability status */}
          <div
            className="mt-4 border p-4"
            style={{ borderColor: "rgba(63,185,80,.2)", background: "rgba(63,185,80,.04)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="open-dot" />
              <span className="font-mono text-[10px] text-green-400 tracking-widest uppercase">Available Now</span>
            </div>
            <p className="font-mono text-[10px] text-muted leading-relaxed">
              Open to internships, freelance projects, and entry-level engineering roles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
