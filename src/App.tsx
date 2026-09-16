import { useEffect, useState, CSSProperties } from "react";
import Lenis from "lenis";
import { AboutSection }     from "./components/AboutSection";
import { ContactSection }   from "./components/ContactSection";
import { StatsPanelSection } from "./components/StatsPanelSection";
import { HeroSection }      from "./components/HeroSection";
import { JourneySection }   from "./components/JourneySection";
import { Navigation }       from "./components/Navigation";
import { ProjectsSection }  from "./components/ProjectsSection";
import { TerminalSection }  from "./components/TerminalSection";
import { SpotifyWidget }    from "./components/SpotifyWidget";
import { FooterRevealSection } from "./components/FooterRevealSection";
import { useBootloader }    from "./hooks/useBootloader";
import { useReveal }        from "./hooks/useReveal";
import { useSpotlight }     from "./hooks/useSpotlight";
import { useWebShooter }    from "./hooks/useWebShooter";
import { SpideyExperience } from "./components/SpideyExperience";
import { StudioLoader }     from "./components/StudioLoader";
import { SpideyMobileBackground } from "./components/SpideyMobileBackground";

export function App() {
  const { cursorRef, spotlightRef, containerRef, cursorMode } = useSpotlight();
  const { booting, progress } = useBootloader();
  useReveal();

  /* ── Theme state (for web-shooter effect) ── */
  const [theme, setTheme] = useState(() => {
    if (typeof document !== "undefined") {
      const docTheme = document.documentElement.getAttribute("data-theme");
      const stored = localStorage.getItem("theme");
      return docTheme || stored || "night";
    }
    return "night";
  });

  const isSpidey = theme === "spidey";
  const webShots = useWebShooter(isSpidey);

  useEffect(() => {
    const updateTheme = () => {
      const docTheme = document.documentElement.getAttribute("data-theme");
      const stored = localStorage.getItem("theme");
      setTheme(docTheme || stored || "night");
    };
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("storage", updateTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", updateTheme);
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 2,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">

      {/* ── STUDIO ENTRANCE LOADER ──────────────────────── */}
      <StudioLoader booting={booting} progress={progress} />

      {/* ── GLOBAL OVERLAYS ─────────────────────────────── */}
      <div className="noise-overlay" aria-hidden />
      <div ref={spotlightRef} className="spotlight" aria-hidden />
      
      {/* ── SPIDEY HANGING WEB DECORATION REMOVED ── */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${cursorMode === "hero-name" ? "hero-name" : cursorMode === "hover" ? "hover" : ""}`}
        aria-hidden
      />

      {/* ── SPIDEY WEB SHOTS (only visible in spidey theme) ── */}
      {webShots.map(shot => (
        <div
          key={shot.id}
          className="fixed pointer-events-none z-[999999] animate-pop-out"
          style={{
            left: shot.x,
            top: shot.y,
            transform: `translate(-50%, -50%) rotate(${shot.rotation}deg)`,
          }}
        >
          <svg className="w-16 h-16 opacity-90 stroke-[#E23636] fill-none" style={{ filter: 'drop-shadow(2px 2px 0px #1A3A7A)' }} strokeWidth="2.5" viewBox="0 0 100 100">
            <path d="M50,50 L10,10 M50,50 L90,10 M50,50 L90,90 M50,50 L10,90 M50,50 L10,50 M50,50 L90,50 M50,50 L50,10 M50,50 L50,90" />
            <circle cx="50" cy="50" r="18" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="36" strokeDasharray="6 6" />
          </svg>
        </div>
      ))}

      {/* ── NAVIGATION ──────────────────────────────────── */}
      {!isSpidey && <Navigation isSpidey={isSpidey} />}

      {/* ── SPOTIFY BG MUSIC WIDGET ─────────────────────── */}
      {!isSpidey && <SpotifyWidget />}

      {/* ── SITE MAIN CARD ── */}
      {isSpidey ? (
        <main className="relative z-10">
          <SpideyMobileBackground />
          <HeroSection isSpidey={isSpidey} />
          <SpideyExperience />
        </main>
      ) : (
        <main className="relative z-10 bg-[var(--bg-primary)] border border-[var(--border-primary)] shadow-2xl rounded-b-[40px] md:rounded-b-[56px] overflow-hidden mx-5 mt-16 mb-[100vh]">
          <HeroSection isSpidey={isSpidey} />
          <AboutSection />
          <TerminalSection />
          <ProjectsSection />
          <StatsPanelSection />
          <JourneySection />
          <ContactSection />
        </main>
      )}

      {/* ── CURTAIN REVEAL FOOTER ── */}
      {!isSpidey && (
        <div className="fixed inset-0 z-1 pointer-events-auto overflow-hidden w-full h-screen">
          <FooterRevealSection />
        </div>
      )}
    </div>
  );
}
