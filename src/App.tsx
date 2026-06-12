import { CSSProperties } from "react";
import { AboutSection }     from "./components/AboutSection";
import { ContactSection }   from "./components/ContactSection";
import { StatsPanelSection } from "./components/StatsPanelSection";
import { HeroSection }      from "./components/HeroSection";
import { JourneySection }   from "./components/JourneySection";
import { Navigation }       from "./components/Navigation";
import { ProjectsSection }  from "./components/ProjectsSection";
import { TerminalSection }  from "./components/TerminalSection";
import { useBootloader }    from "./hooks/useBootloader";
import { useReveal }        from "./hooks/useReveal";
import { useSpotlight }     from "./hooks/useSpotlight";

const BOOT_LINES = [
  { text: "[ OK ] SYSTEM_INIT",             cls: "boot-ok" },
  { text: "[ OK ] KERNEL_LOADED",           cls: "boot-ok" },
  { text: "[ OK ] CSS_MODULES_READY",       cls: "boot-ok" },
  { text: "[ OK ] NETWORK_PROTOCOL_READY",  cls: "boot-ok" },
  { text: "[ OK ] REACT_ENGINE_STARTED",    cls: "boot-ok" },
  { text: "[ OK ] USER_SESSION_ACTIVE",     cls: "boot-ok" },
  { text: "> LAUNCHING  portfolio_v2.0 ...", cls: "boot-final" },
];

export function App() {
  const { position, isHovering } = useSpotlight();
  const { booting, linesVisible } = useBootloader();
  useReveal();

  return (
    <div className="relative" style={{ "--mouse-x": `${position.x}px`, "--mouse-y": `${position.y}px` } as CSSProperties}>

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
        className={`custom-cursor ${isHovering ? "hover" : ""}`}
        style={{ left: position.x, top: position.y }}
        aria-hidden
      />

      {/* ── NAVIGATION ──────────────────────────────────── */}
      <Navigation />

      {/* ── SITE ────────────────────────────────────────── */}
      <main style={{ marginTop: 64, margin: "64px 20px 20px", border: "1px solid var(--border-primary)" }}>



        <HeroSection />
        <AboutSection />
        <TerminalSection />
        <ProjectsSection />
        <StatsPanelSection />
        <JourneySection />
        <ContactSection />

        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Mayank Chaudhary</span>
          <span>Built with React · TypeScript · Tailwind</span>
          <span>Lucknow, India</span>
        </footer>
      </main>
    </div>
  );
}
