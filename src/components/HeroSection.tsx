import { profile } from "../data/mockData";
import { MacbookScroll } from "./ui/macbook-scroll";
import { FlipWords } from "./ui/flip-words";

export function HeroSection() {
  const [first, last] = profile.name.split(" ");

  const flipWords = [
    "web apps",
    "AI tools",
    "SaaS",
    "utilities",
    "Automation",
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
              <h1 className="hero-name-minimal">
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

          {/* Mobile Fallback: Clean Browser Mockup */}
          <div className="hero-mobile-fallback">
            <div className="hero-browser-frame">
              <div className="hero-browser-bar">
                <div className="hero-browser-dots">
                  <span className="hero-dot hero-dot--red" />
                  <span className="hero-dot hero-dot--yellow" />
                  <span className="hero-dot hero-dot--green" />
                </div>
                <div className="hero-browser-url">github.com/qwertyuii7</div>
              </div>
              <img
                src="/assets/github_profile_combined.png"
                alt="Mayank Chaudhary GitHub Profile"
                className="hero-browser-screenshot"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
