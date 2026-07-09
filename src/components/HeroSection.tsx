import { profile } from "../data/mockData";
import { MacbookScroll } from "./ui/macbook-scroll";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { FlipWords } from "./ui/flip-words";

export function HeroSection() {
  const [first, last] = profile.name.split(" ");

  const flipWords = [
    "web apps",
    "AI tools",
    "SaaS",
    "utilities",
    "Automation",
    "UI & UX",
  ];

  return (
    <section className="hero-section" id="hero">
      <div className="hero-grid">
        {/* ── LEFT COLUMN: MINIMAL COPY ────────────── */}
        <div className="hero-left-content">
          {/* Vertically centered main text block */}
          <div className="hero-text-center-block">
            {/* Small line above name */}
            <div className="reveal-item" style={{ transitionDelay: ".1s" }}>
              <p className="hero-greeting">
                Hey ! I&apos;m
              </p>
            </div>

            {/* Name */}
            <div className="reveal-item" style={{ transitionDelay: ".2s" }}>
              <h1 className="hero-name-minimal cursor-none" data-cursor="hero-name">
                <span>{first}</span>
                <span>{last}</span>
              </h1>
            </div>

            {/* Tagline with FlipWords */}
            <div className="reveal-item" style={{ transitionDelay: ".3s" }}>
              <p className="hero-tagline-minimal">
                <span className="hero-build-text">I build</span>
                <FlipWords
                  words={flipWords}
                  duration={1500}
                  className="hero-flip-word"
                />
                <span className="hero-build-text">&lt;/&gt;</span>
              </p>
            </div>

            {/* Sharp Corner Box CTA Button (Hidden on big devices where navbar has it, shown on mobile/small devices) */}
            <div className="reveal-item mt-6 sm:mt-8 md:hidden" style={{ transitionDelay: ".4s" }}>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 border-2 border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] font-mono text-xs sm:text-sm font-bold uppercase tracking-widest rounded-none shadow-[5px_5px_0px_0px_var(--border-primary)] hover:shadow-[8px_8px_0px_0px_var(--card-accent)] hover:-translate-y-1 transition-all"
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "0px",
                    background: "#3fb950",
                    boxShadow: "0 0 8px #3fb950",
                    display: "inline-block",
                    animation: "pulseGlow 2s ease-in-out infinite",
                  }}
                />
                Let&apos;s Talk ↗
              </a>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: MACBOOK SHOWCASE ───────────────────── */}
        <div className="hero-right-macbook reveal-item" style={{ transitionDelay: ".35s" }}>
          {/* Desktop 3D Macbook Scroll */}
          <div className="hero-macbook-desktop">
            <MacbookScroll
              src="/assets/github_profile_combined.png"
              showGradient={true}
              title={null}
            />
          </div>

          {/* Mobile Fallback: ContainerScroll Mockup */}
          <div className="hero-mobile-fallback">
            <ContainerScroll titleComponent={null}>
              <img
                src="/assets/github_profile_combined.png"
                alt="Mayank Chaudhary GitHub Profile"
                className="w-full h-auto object-contain rounded-2xl shadow-2xl"
                draggable={false}
              />
            </ContainerScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
