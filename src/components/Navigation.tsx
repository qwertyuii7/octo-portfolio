import { useState, useEffect } from "react";
import { navItems, profile } from "../data/mockData";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "night");

  useEffect(() => {
    if (theme === "draft") {
      document.documentElement.setAttribute("data-theme", "draft");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "night" ? "draft" : "night");
  };

  return (
    <>
      <nav
        id="navbar"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000,
          borderBottom: "1px solid var(--border-primary)",
          background: "var(--nav-bg)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <div className="px-6 md:px-12" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

          {/* Logo */}
          <a
            href="#hero"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "var(--text-primary)",
              textDecoration: "none",
              transition: "color .2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-muted)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-primary)")}
            data-cursor-hover=""
          >
            @{profile.githubUsername}
          </a>

          {/* Desktop nav links */}
          <ul style={{ display: "flex", alignItems: "center", gap: 36, listStyle: "none", margin: 0, padding: 0 }}
            className="hidden md:flex"
          >
            {navItems.map(item => (
              <li key={item.href}>
                <a href={item.href} className="nav-link" data-cursor-hover="">{item.label}</a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: 20 }}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: ".15em",
                color: "var(--text-muted)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px 0",
                transition: "color .2s"
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              data-cursor-hover=""
            >
              [ MODE: {theme.toUpperCase()} ]
            </button>

            {/* Hire badge */}
            <a
            href="#contact"
            className="hidden md:flex"
            style={{
              alignItems: "center", gap: 8,
              background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.18)",
              padding: "8px 24px",
              borderRadius: "24px",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "var(--text-primary)",
              textDecoration: "none",
              transition: "transform .2s, box-shadow .2s, background .2s",
              boxShadow: "0 8px 32px 0 rgba(0,0,0,0.37)"
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px 0 rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px 0 rgba(0,0,0,0.37)"; (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))"; }}
            data-cursor-hover=""
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3fb950", boxShadow: "0 0 6px #3fb950", display: "inline-block", animation: "pulseGlow 2s ease-in-out infinite" }} />
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}
            aria-label="Menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 24, height: 1.5, background: "var(--text-primary)",
                transition: "all .25s",
                transform: open
                  ? i === 0 ? "rotate(45deg) translateY(6.5px)"
                  : i === 2 ? "rotate(-45deg) translateY(-6.5px)"
                  : "scaleX(0)"
                  : "none",
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 8999,
        background: "var(--bg-primary)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transform: open ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity .3s, transform .3s",
        display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "0 32px",
      }}
      className="md:hidden"
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {navItems.map(item => (
            <li key={item.href} style={{ marginBottom: 28 }}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "clamp(28px, 8vw, 48px)",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  letterSpacing: "-.02em",
                  transition: "color .2s",
                }}
                className="mobile-nav-link"
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text-muted)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-primary)")}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ borderTop: "1px solid var(--border-primary)", paddingTop: 28, marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666", textDecoration: "none", letterSpacing: ".15em", textTransform: "uppercase" }}
          >
            github/@{profile.githubUsername} ↗
          </a>
          <button
            onClick={toggleTheme}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: ".15em",
              color: "var(--text-muted)",
              background: "none",
              border: "none",
              padding: "8px 0"
            }}
          >
            [ {theme.toUpperCase()} ]
          </button>
        </div>
      </div>
    </>
  );
}
