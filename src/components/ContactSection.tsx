import { profile } from "../data/mockData";
import { FloatingDock } from "./ui/floating-dock";
import "@google/model-viewer";
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
  return (
    <section
      className="py-20 md:py-32 px-6 md:px-12"
      id="contact"
    >
      <div className="section-label clip-reveal">005 — CONTACT</div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">

        {/* ── CTA left ── */}
        <div className="lg:col-span-8 reveal-item">
          <p className="text-muted font-mono text-xs tracking-widest uppercase mb-6">
            Open to freelance · collaboration · full-time
          </p>
          <h2 className="text-4xl md:text-6xl font-black leading-none tracking-tight text-[var(--text-primary)] mb-10 uppercase">
            <span style={{ color: "transparent", WebkitTextStroke: "1.5px var(--text-primary)" }}>Let's</span> <span className="normal-case font-bold" style={{ fontFamily: "'Lobster Two', cursive" }}>move to</span><br />
            <span style={{ color: "transparent", WebkitTextStroke: "1.5px var(--text-primary)" }}>my</span> <span className="normal-case font-bold" style={{ fontFamily: "'Lobster Two', cursive" }}>coffee</span> <span style={{ color: "transparent", WebkitTextStroke: "1.5px var(--text-primary)" }}>cart</span>.
          </h2>

          {/* Email — reduced size */}
          <div className="mb-8">
            <p className="font-mono text-[10px] text-faint tracking-widest uppercase mb-2">Reach me at</p>
            <a
              href={`mailto:${profile.email}`}
              className="contact-email-link"
              data-cursor-hover=""
            >
              {profile.email} ↗
            </a>
          </div>

          {/* Quick-action row */}
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="/assets/mayank_chaudhary_resume.pdf"
              download
              className="btn-brutal px-6 py-3 font-mono text-xs uppercase tracking-widest"
              data-cursor-hover=""
            >
              ⬇ Download Resume
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-sm"
              data-cursor-hover=""
            >
              View GitHub Profile ↗
            </a>
          </div>

          {/* Interactive Connect Dock */}
          <div className="mt-8">
            <div className="flex justify-start relative z-10 overflow-visible max-w-full">
              <FloatingDock
                items={dockItems}
                desktopClassName="!mx-0"
              />
            </div>
          </div>
        </div>

        {/* ── 3D Coffee Cart right ── */}
        <div
          onClick={() => window.location.href = `mailto:${profile.email}`}
          title="Click to Email Me"
          className="lg:col-span-4 lg:col-start-9 flex items-center justify-center reveal-item w-full h-[380px] md:h-[480px] cursor-pointer"
          style={{ transitionDelay: ".2s" }}
        >
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
        </div>
      </div>
    </section>
  );
}

