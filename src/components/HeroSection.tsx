import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { profile } from "../data/mockData";
import { MacbookScroll } from "./ui/macbook-scroll";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { FlipWords } from "./ui/flip-words";

export function HeroSection({ isSpidey }: { isSpidey?: boolean }) {
  const [isMuted, setIsMuted] = useState(true);
  const [isNameHovered, setIsNameHovered] = useState(false);
  const [first, last] = profile.name.split(" ");

  // Dispatch event when video is unmuted to pause background music
  useEffect(() => {
    if (!isMuted && isSpidey) {
      window.dispatchEvent(new CustomEvent("spidey-video-playing"));
    }
  }, [isMuted, isSpidey]);

  const flipWords = [
    "web apps",
    "AI tools",
    "SaaS",
    "utilities",
    "Automation",
    "UI & UX",
  ];

  return (
    <section className="hero-section relative" id="hero">
      {/* ── SPIDEY FULLSCREEN VIDEO ── */}
      {isSpidey && (
        <>
          <video
            src="/assets/spidey.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="spidey-bg-video fixed inset-0 w-full h-full z-[0] pointer-events-none"
          />
          
          {/* Sound Toggle Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="fixed bottom-6 left-6 z-50 p-3 bg-black/60 hover:bg-[#E23636] border-2 border-white/20 hover:border-black rounded-full backdrop-blur-md text-white transition-all group shadow-xl"
            aria-label="Toggle Sound"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 group-hover:scale-110 transition-transform" />
            ) : (
              <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </>
      )}

      <div className={`hero-grid relative ${isSpidey ? 'z-10 !flex !flex-col !items-center !justify-center !w-full' : ''}`}>
        {/* ── LEFT COLUMN: MINIMAL COPY ────────────── */}
        <div className={`hero-left-content ${isSpidey ? '!items-center !text-center !w-full !max-w-none !min-h-0' : ''}`}>
          {/* Vertically centered main text block */}
          <div className={`hero-text-center-block ${isSpidey ? '!flex !flex-col !items-center !justify-center !w-full' : ''}`}>
            {/* Small line above name */}
            <div className="reveal-item" style={{ transitionDelay: ".1s" }}>
              <p className={`hero-greeting ${isSpidey ? '!text-center !w-full' : ''}`}>
                Hey ! I&apos;m
              </p>
            </div>

            {/* Name */}
            <div className="reveal-item" style={{ transitionDelay: ".2s" }}>
              <h1 
                className={`hero-name-minimal cursor-none transition-all duration-300 ${isSpidey ? '!items-center !text-center !text-[#FACC15] uppercase tracking-widest' : ''}`} 
                style={isSpidey ? { WebkitTextStroke: "2px #000", textShadow: "4px 4px 0px #E23636" } : {}}
                data-cursor="hero-name"
                onMouseEnter={() => setIsNameHovered(true)}
                onMouseLeave={() => setIsNameHovered(false)}
              >
                {isSpidey && isNameHovered ? (
                  <>
                    <span>Miles</span>
                    <span>Morales</span>
                  </>
                ) : (
                  <>
                    <span>{first}</span>
                    <span>{last}</span>
                  </>
                )}
              </h1>
            </div>

            {/* Tagline with FlipWords */}
            <div className="reveal-item" style={{ transitionDelay: ".3s" }}>
              <p className={`hero-tagline-minimal ${isSpidey ? '!justify-center !text-center !text-white font-extrabold' : ''}`}
                 style={isSpidey ? { WebkitTextStroke: "1px #000", textShadow: "2px 2px 0px #E23636" } : {}}
              >
                <span className={`hero-build-text ${isSpidey ? '!text-white' : ''}`}>I build</span>
                <FlipWords
                  words={flipWords}
                  duration={1500}
                  className={`hero-flip-word ${isSpidey ? '!text-[#FACC15]' : ''}`}
                />
                <span className={`hero-build-text ${isSpidey ? '!text-white' : ''}`}>&lt;/&gt;</span>
              </p>
            </div>

            {/* Sharp Corner Box CTA Button (Hidden on big devices where navbar has it, shown on mobile/small devices) */}
            <div className={`reveal-item mt-6 sm:mt-8 md:hidden ${isSpidey ? '!flex !justify-center !w-full' : ''}`} style={{ transitionDelay: ".4s" }}>
              <a
                href="#contact"
                className={`inline-flex items-center justify-center gap-2.5 px-6 py-3 border-2 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-none transition-all ${
                  isSpidey 
                    ? 'border-white/20 bg-black/60 hover:bg-[#E23636] text-white hover:border-black font-mono shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[8px_8px_0px_0px_#FACC15] hover:-translate-y-1' 
                    : 'border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] font-mono shadow-[5px_5px_0px_0px_var(--border-primary)] hover:shadow-[8px_8px_0px_0px_var(--card-accent)] hover:-translate-y-1'
                }`}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "0px",
                    background: isSpidey ? "#FACC15" : "var(--card-accent)",
                    boxShadow: isSpidey ? "0 0 8px #FACC15" : "0 0 8px var(--card-accent)",
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
        {!isSpidey && (
          <div className="hero-right-macbook reveal-item" style={{ transitionDelay: ".35s" }}>
            {/* Desktop 3D Macbook Scroll */}
            <div className="hero-macbook-desktop">
              <MacbookScroll
                src="/assets/github_profile_combined.webp"
                showGradient={true}
                title={null}
              />
            </div>

            {/* Mobile Fallback: ContainerScroll Mockup */}
            <div className="hero-mobile-fallback">
              <ContainerScroll titleComponent={null}>
                <img
                  src="/assets/github_profile_combined.webp"
                  alt="Mayank Chaudhary GitHub Profile"
                  className="w-full h-auto object-contain rounded-2xl shadow-2xl"
                  draggable={false}
                />
              </ContainerScroll>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
