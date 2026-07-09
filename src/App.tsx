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

const BOOT_LINES = [
  { text: "[ OK ] SYSTEM_INIT",             cls: "boot-ok" },
  { text: "[ OK ] KERNEL_LOADED",           cls: "boot-ok" },
  { text: "[ OK ] MEMORY_CHECK ... PASSED", cls: "boot-ok" },
  { text: "[ OK ] UI_SUBSYSTEM_ONLINE",     cls: "boot-ok" },
  { text: "[ OK ] NETWORK_PROTOCOL_READY",  cls: "boot-ok" },
  { text: "[ OK ] REACT_ENGINE_STARTED",    cls: "boot-ok" },
  { text: "[ OK ] USER_SESSION_ACTIVE",     cls: "boot-ok" },
  { text: "> LAUNCHING  portfolio_v2.0 ...", cls: "boot-final" },
];

export function App() {
  const { cursorRef, containerRef, cursorMode } = useSpotlight();
  const { booting, linesVisible } = useBootloader();
  useReveal();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
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

      {/* ── BOOT LOADER ─────────────────────────────────── */}
      <div
        id="boot-loader"
        style={{ opacity: booting ? 1 : 0, visibility: booting ? "visible" : "hidden", transition: "opacity .7s ease, visibility .7s" }}
        aria-hidden={!booting}
      >
        <div id="boot-logo">PORTFOLIO_OS / v2.0 / BOOT SEQUENCE</div>
        <div>
          {BOOT_LINES.slice(0, linesVisible).map((l, i) => (
            <p key={i} className={l.cls} style={{ animationDelay: `${i * 0.05}s` }}>{l.text}</p>
          ))}
          {linesVisible > 0 && <span className="boot-cursor" />}
        </div>
      </div>

      {/* ── GLOBAL OVERLAYS ─────────────────────────────── */}
      <div className="noise-overlay" aria-hidden />
      <div className="spotlight"     aria-hidden />
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
      <main className="relative z-10 bg-[var(--bg-primary)] border border-[var(--border-primary)] shadow-[0_35px_100px_rgba(0,0,0,0.95)] rounded-b-[40px] md:rounded-b-[56px] overflow-hidden mx-5 mt-16 mb-[100vh]">
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
