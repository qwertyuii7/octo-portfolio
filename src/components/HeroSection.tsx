import { useEffect, useRef, useState } from "react";
import { profile } from "../data/mockData";

export function HeroSection() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!imgRef.current || window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
      const x = (e.clientX - window.innerWidth  / 2) / 80;
      const y = (e.clientY - window.innerHeight / 2) / 80;
      imgRef.current.style.transform = `scale(1.04) translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", { 
        timeZone: "Asia/Kolkata", 
        hour12: true, 
        hour: "numeric", 
        minute: "2-digit", 
        second: "2-digit" 
      });
      setTimeStr(`Lucknow, India · ${time} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const [first, last] = profile.name.split(" ");

  return (
    <section className="hero-section" id="hero">

      {/* ── LEFT: text content ──────────────────────────── */}
      <div className="hero-left">

        {/* Name */}
        <div className="reveal-item" style={{ transitionDelay: ".2s" }}>
          <h1 className="hero-name" style={{ display: 'flex', flexDirection: 'column' }}>
            <span>{first}</span>
            <span style={{ fontSize: 'clamp(32px, 5.5vw, 84px)' }}>{last}</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="reveal-item" style={{ transitionDelay: ".35s" }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 28, maxWidth: 420 }}>
            Senior Software Developer & MERN Stack Expert<br />
            Building in{" "}
            <span style={{ color: "var(--text-primary)" }}>MERN</span> ·{" "}
            <span style={{ color: "var(--text-primary)" }}>C++</span> ·{" "}
            <span style={{ color: "var(--text-primary)" }}>Python</span> ·{" "}
            <span style={{ color: "var(--text-primary)" }}>TypeScript</span>
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a href="#work"    className="btn-brutal" style={{ padding: "11px 24px", fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: ".12em" }} data-cursor-hover="">View Projects ↓</a>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="btn-brutal" style={{ padding: "11px 24px", fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: ".12em" }} data-cursor-hover="">GitHub ↗</a>
            <a href="#contact" className="btn-outline-sm" data-cursor-hover="">⬇ Resume</a>
          </div>
        </div>

        {/* Location */}
        <div className="reveal-item" style={{ transitionDelay: ".5s", marginTop: 32 }}>
          <p className="section-label" style={{ marginBottom: 0 }}>{timeStr || "Lucknow, India · UTC+5:30"}</p>
        </div>
      </div>

      {/* ── RIGHT: photo ────────────────────────────────── */}
      <div className="hero-right reveal-item" style={{ transitionDelay: ".3s" }}>
        <img
          ref={imgRef}
          src={profile.heroImage}
          alt={profile.name}
          className="hero-photo"
        />
        <div className="hero-photo-overlay" />

        {/* Caption overlay bottom-right */}
        <div style={{
          position: "absolute", bottom: 24, right: 24,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
          color: "rgba(239,239,239,.35)", letterSpacing: ".2em",
          textTransform: "uppercase", zIndex: 10,
        }}>
          Mayank Chaudhary · {new Date().getFullYear()}
        </div>
      </div>
    </section>
  );
}
