import { useState, useEffect } from "react";
import { navItems, profile } from "../data/mockData";
import { HangingDevCard } from "./HangingDevCard";
import SparkleNavbar from "./SparkleNavbar";

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

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    };
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === "night" ? "draft" : "night");
  };

  const sparkleColor = theme === "draft" ? "#2d6a4f" : "#3fb950";

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
          overflow: "visible",
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

          {/* Desktop nav links — sparkle navbar */}
          <div className="hidden md:block">
            <SparkleNavbar
              items={navItems.map((item) => item.label)}
              hrefs={navItems.map((item) => item.href)}
              color={sparkleColor}
            />
          </div>

          {/* Right actions — desktop only */}
          <div className="hidden md:flex items-center gap-4">
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

            {/* Hire badge — hanging developer ID card */}
            <HangingDevCard />
          </div>

          {/* Mobile menu toggle — small screens only */}
          <button
            className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2"
            onClick={() => setOpen(!open)}
            aria-label="Open navigation menu"
            aria-expanded={open}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 24, height: 1.5, background: "var(--text-primary)",
                transition: "all .25s",
                transform: open
                  ? i === 0 ? "translateY(6.5px) rotate(45deg)"
                  : i === 2 ? "translateY(-6.5px) rotate(-45deg)"
                  : "scaleX(0)"
                  : "none",
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile navigation drawer — small screens only */}
      <div
        className="md:hidden flex flex-col justify-start overflow-y-auto"
        style={{
          position: "fixed", inset: 0, zIndex: 8999,
          background: "var(--bg-primary)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity .3s, transform .3s",
          padding: "100px 32px 40px",
        }}
        aria-hidden={!open}
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
        <div style={{ borderTop: "1px solid var(--border-primary)", paddingTop: 28, marginTop: 20, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
          
          {/* Hire badge for mobile */}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            style={{
              display: "flex", justifyContent: "center", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0))",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "16px 24px",
              borderRadius: "24px",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "var(--text-primary)",
              textDecoration: "none",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3fb950", boxShadow: "0 0 6px #3fb950", display: "inline-block", animation: "pulseGlow 2s ease-in-out infinite" }} />
            Hire Me
          </a>
        </div>
      </div>
    </>
  );
}
