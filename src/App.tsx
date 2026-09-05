import { useEffect, CSSProperties } from "react";
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
import { StudioLoader }     from "./components/StudioLoader";

export function App() {
  const { cursorRef, spotlightRef, containerRef, cursorMode } = useSpotlight();
  const { booting, progress } = useBootloader();
  useReveal();

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
      <div
        ref={cursorRef}
        className={`custom-cursor ${cursorMode === "hero-name" ? "hero-name" : cursorMode === "hover" ? "hover" : ""}`}
        aria-hidden
      />

      {/* ── NAVIGATION ──────────────────────────────────── */}
      <Navigation />

      {/* ── SPOTIFY BG MUSIC WIDGET ─────────────────────── */}
      <SpotifyWidget />

      {/* ── SITE MAIN CARD (Swipes up over the curtain reveal footer with rounded bottom corners) ── */}
      <main className="relative z-10 bg-[var(--bg-primary)] border border-[var(--border-primary)] shadow-2xl rounded-b-[40px] md:rounded-b-[56px] overflow-hidden mx-5 mt-16 mb-[100vh]">
        <HeroSection />
        <AboutSection />
        <TerminalSection />
        <ProjectsSection />
        <StatsPanelSection />
        <JourneySection />
        <ContactSection />
      </main>

      {/* ── CURTAIN REVEAL FOOTER (Fixed underneath filling 100% of the screen, revealed on swipe up) ── */}
      <div className="fixed inset-0 z-1 pointer-events-auto overflow-hidden w-full h-screen">
        <FooterRevealSection />
      </div>
    </div>
  );
}
