import { useState, useEffect, useRef } from "react";
import { profile } from "../data/mockData";
import { FloatingDock } from "./ui/floating-dock";
import {
  IconMail,
  IconBrandGithub,
  IconBrandLeetcode,
  IconBrandHackerrank,
  IconBrandX,
} from "@tabler/icons-react";

const HashnodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
    <path d="M22.351 8.019l-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.75a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5z" />
  </svg>
);


const dockItems = [
  {
    title: "Email Me",
    icon: <IconMail className="h-full w-full" />,
    href: `mailto:${profile.email}`,
  },
  {
    title: "GitHub",
    icon: <IconBrandGithub className="h-full w-full" />,
    href: profile.githubUrl,
  },
  {
    title: "LeetCode",
    icon: <IconBrandLeetcode className="h-full w-full" />,
    href: profile.leetcodeUrl,
  },
  {
    title: "HackerRank",
    icon: <IconBrandHackerrank className="h-full w-full" />,
    href: profile.hackerRankUrl,
  },
  {
    title: "Twitter / X",
    icon: <IconBrandX className="h-full w-full" />,
    href: "https://x.com/rm_mayank7",
  },
  {
    title: "Hashnode",
    icon: <HashnodeIcon />,
    href: "https://hashnode.com/@qwertyuii",
  },
];

export function ContactSection() {
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad3D(true);
          import("@google/model-viewer");
          observer.disconnect();
        }
      },
      { rootMargin: "450px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-32 px-6 md:px-12 relative overflow-hidden"
      id="contact"
    >
      {/* Background */}
      <div className="absolute inset-0 comic-halftone-blue opacity-15 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Issue header */}
      <div className="reveal-item inline-flex items-center gap-3 px-3 py-1.5 bg-neutral-900 border-2 border-black shadow-[3px_3px_0px_#E23636] mb-6">
        <span className="font-comic-mono text-xs text-red-500 font-bold uppercase tracking-wider">PANEL #06: TRANSMIT A SIGNAL</span>
        <span className="text-neutral-600">|</span>
        <span className="font-comic-mono text-xs text-yellow-400 uppercase tracking-wider">CLASSIFIED RELAY</span>
      </div>

      {/* Comic title */}
      <div className="reveal-item mb-4">
        <h2 className="text-4xl md:text-6xl font-comic-hero font-black leading-none tracking-tight text-[var(--text-primary)] comic-title-3d-sm uppercase">
          TRANSMIT<br />A SIGNAL
        </h2>
      </div>

      {/* Narrator dispatch */}
      <div className="reveal-item bg-[#FFE81F]/10 border-2 border-black px-5 py-3 shadow-[3px_3px_0px_#000] max-w-2xl mb-10 relative">
        <div className="absolute -top-2.5 left-4 bg-yellow-400 text-black font-comic-hero text-[9px] px-2 py-0.5 border border-black uppercase">
          NARRATOR
        </div>
        <p className="font-comic-body text-sm text-neutral-300 italic">
          "Found a glitch in your multiverse? Need a friendly neighborhood full-stack developer who slings clean code faster than Peter swings down Broadway? Drop a web-line below..."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">

        {/* ── Left: Spider Beacon + Contact Info ── */}
        <div className="lg:col-span-5 reveal-item">
          {/* Status card */}
          <div className="bg-neutral-900 border-3 border-black p-6 shadow-[6px_6px_0px_#E23636] mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
              </span>
              <span className="font-comic-hero text-lg text-emerald-400 uppercase tracking-wider">AVAILABLE FOR MISSIONS</span>
            </div>
            <p className="font-comic-mono text-xs text-neutral-400">Response latency: &lt; 2 Hours (Spider-Sense Alerted)</p>
          </div>

          {/* Contact cards */}
          <div className="space-y-3">
            <a href={`mailto:${profile.email}`} className="block bg-neutral-900 border-2 border-neutral-800 hover:border-red-500 p-4 shadow-[3px_3px_0px_#000] transition-colors group" data-cursor-hover="">
              <p className="font-comic-mono text-[10px] text-neutral-500 uppercase tracking-wider mb-1">📧 DIRECT DISPATCH</p>
              <p className="font-comic-body text-sm text-neutral-200 group-hover:text-yellow-400 transition-colors break-all">{profile.email}</p>
            </a>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="block bg-neutral-900 border-2 border-neutral-800 hover:border-yellow-400 p-4 shadow-[3px_3px_0px_#000] transition-colors group" data-cursor-hover="">
              <p className="font-comic-mono text-[10px] text-neutral-500 uppercase tracking-wider mb-1">🐙 CODE REPOSITORY</p>
              <p className="font-comic-body text-sm text-neutral-200 group-hover:text-yellow-400 transition-colors">@{profile.githubUsername}</p>
            </a>
            <div className="bg-neutral-900 border-2 border-neutral-800 p-4 shadow-[3px_3px_0px_#000]">
              <p className="font-comic-mono text-[10px] text-neutral-500 uppercase tracking-wider mb-1">📍 BASE OF OPERATIONS</p>
              <p className="font-comic-body text-sm text-neutral-200">{profile.location} [Earth-616 Coords]</p>
            </div>
          </div>

          {/* Platform badges */}
          <div className="mt-6 grid grid-cols-2 gap-2">
            {[
              { name: "GitHub", handle: profile.githubUsername, url: profile.githubUrl, color: "border-neutral-600" },
              { name: "LeetCode", handle: "210+ Solved", url: profile.leetcodeUrl, color: "border-yellow-600" },
              { name: "HackerRank", handle: "5★ Gold", url: profile.hackerRankUrl, color: "border-emerald-600" },
              { name: "GeeksforGeeks", handle: "Institute Rank", url: profile.geeksForGeeksUrl, color: "border-green-600" },
            ].map(p => (
              <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className={`bg-neutral-950 border-2 ${p.color} p-3 text-center hover:bg-neutral-900 transition-colors shadow-[2px_2px_0px_#000]`}>
                <p className="font-comic-hero text-xs text-neutral-200 uppercase">{p.name}</p>
                <p className="font-comic-mono text-[10px] text-neutral-500 mt-0.5">{p.handle}</p>
              </a>
            ))}
          </div>

          {/* Dock */}
          <div className="mt-6">
            <div className="flex justify-start relative z-10 overflow-visible max-w-full">
              <FloatingDock items={dockItems} desktopClassName="!mx-0" />
            </div>
          </div>
        </div>

        {/* ── Right: 3D Coffee Cart / Contact CTA ── */}
        <div className="lg:col-span-7 reveal-item" style={{ transitionDelay: ".2s" }}>
          <div className="bg-neutral-900 border-3 border-black p-8 shadow-[8px_8px_0px_#1A3A7A] relative">
            <div className="absolute -top-3 left-4 bg-red-600 text-white font-comic-hero text-[10px] px-3 py-0.5 border-2 border-black uppercase">
              TRANSMISSION GAUNTLET
            </div>

            {/* Quick-action buttons */}
            <div className="flex flex-wrap gap-3 mt-4 mb-6">
              <a
                href={`mailto:${profile.email}`}
                className="comic-btn-primary"
                data-cursor-hover=""
              >
                ⚡ SEND SIGNAL
              </a>
              <a
                href="/assets/mayank_chaudhary_resume.pdf"
                download
                className="inline-flex items-center gap-2 bg-neutral-800 text-neutral-100 px-6 py-3.5 border-3 border-black font-comic-hero text-lg uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:bg-neutral-700 transition-colors"
                data-cursor-hover=""
              >
                ⬇ Download Resume
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-neutral-800 text-neutral-100 px-6 py-3.5 border-3 border-black font-comic-hero text-lg uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:bg-neutral-700 transition-colors"
                data-cursor-hover=""
              >
                View GitHub ↗
              </a>
            </div>

            {/* 3D Model */}
            <div
              onClick={() => window.location.href = `mailto:${profile.email}`}
              title="Click to Email Me"
              className="w-full h-[380px] md:h-[480px] cursor-pointer border-2 border-neutral-800 bg-neutral-950 relative overflow-hidden"
            >
              {shouldLoad3D ? (
                <model-viewer
                  src="/assets/coffee_cart.glb"
                  alt="3D Coffee Cart"
                  camera-controls
                  disable-zoom
                  shadow-intensity="1"
                  camera-orbit="90deg 75deg 85%"
                  interaction-prompt="none"
                  onClick={() => window.location.href = `mailto:${profile.email}`}
                  style={{ width: "100%", height: "100%", backgroundColor: "transparent", cursor: "pointer" }}
                ></model-viewer>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 font-comic-mono text-xs gap-3">
                  <span className="animate-pulse">🕷️ Deploying Web-Shooter Model...</span>
                </div>
              )}

              {/* THWIP sticker */}
              <div className="absolute top-4 right-4 rotate-12 z-10">
                <div className="clip-burst bg-yellow-400 border-2 border-black p-4 shadow-[2px_2px_0px_#000] scale-75">
                  <span className="font-comic-hero font-black text-xs text-red-600 uppercase">THWIP!</span>
                </div>
              </div>
            </div>

            {/* Footer guarantee */}
            <p className="font-comic-mono text-[10px] text-neutral-600 text-center mt-4 uppercase tracking-wider">
              100% BUG FREE GUARANTEE (EXCEPT SPIDERS) // ENCRYPTED VIA WEB-PROTOCOL
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
