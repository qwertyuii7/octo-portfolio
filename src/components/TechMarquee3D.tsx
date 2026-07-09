"use client";
import React from "react";

// Tech stack items with sharp icons and accent colors
interface TechItem {
  name: string;
  category: string;
  color: string;
  icon: React.ReactNode;
}

const row1Items: TechItem[] = [
  {
    name: "JavaScript",
    category: "LANGUAGE",
    color: "#F7DF1E",
    icon: (
      <div className="w-6 h-6 bg-[#F7DF1E] text-black font-black text-xs flex items-center justify-center rounded-none font-mono">
        JS
      </div>
    ),
  },
  {
    name: "TypeScript",
    category: "LANGUAGE",
    color: "#3178C6",
    icon: (
      <div className="w-6 h-6 bg-[#3178C6] text-white font-black text-xs flex items-center justify-center rounded-none font-mono">
        TS
      </div>
    ),
  },
  {
    name: "C++",
    category: "LANGUAGE",
    color: "#00599C",
    icon: (
      <div className="w-6 h-6 bg-[#00599C] text-white font-black text-xs flex items-center justify-center rounded-none font-mono">
        C++
      </div>
    ),
  },
  {
    name: "Python",
    category: "LANGUAGE",
    color: "#3776AB",
    icon: (
      <div className="w-6 h-6 bg-[#3776AB] text-white font-black text-xs flex items-center justify-center rounded-none font-mono">
        PY
      </div>
    ),
  },
  {
    name: "React",
    category: "FRONTEND",
    color: "#61DAFB",
    icon: (
      <svg className="w-6 h-6 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
      </svg>
    ),
  },
  {
    name: "Vite",
    category: "FRONTEND",
    color: "#646CFF",
    icon: (
      <svg className="w-6 h-6 text-[#646CFF]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.984 2L2 6.55l2.4 12.8L11.984 22l7.584-2.65L22 6.55 11.984 2zm0 3.2l5.76 2.56-1.92 9.44-3.84 1.36-3.84-1.36-1.92-9.44 5.76-2.56z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    category: "FRONTEND",
    color: "#38B2AC",
    icon: (
      <svg className="w-6 h-6 text-[#38B2AC]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624 1.177-1.194 2.538-2.576 5.512-2.576z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    category: "BACKEND",
    color: "#339933",
    icon: (
      <div className="w-6 h-6 bg-[#339933] text-black font-black text-xs flex items-center justify-center rounded-none font-mono">
        NODE
      </div>
    ),
  },
  {
    name: "Express.js",
    category: "BACKEND",
    color: "#828282",
    icon: (
      <div className="w-6 h-6 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs flex items-center justify-center rounded-none font-mono">
        EX
      </div>
    ),
  },
  {
    name: "Socket.io",
    category: "BACKEND",
    color: "#010101",
    icon: (
      <div className="w-6 h-6 bg-black text-white border border-white/30 font-black text-xs flex items-center justify-center rounded-none font-mono">
        SKT
      </div>
    ),
  },
  {
    name: "REST APIs & JWT",
    category: "BACKEND",
    color: "#E535AB",
    icon: (
      <svg className="w-6 h-6 text-[#E535AB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    name: "Framer Motion",
    category: "FRONTEND",
    color: "#0055FF",
    icon: (
      <svg className="w-6 h-6 text-[#0055FF]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 2h16v8h-8l8 8v4H4v-8h8l-8-8V2z" />
      </svg>
    ),
  },
  {
    name: "GSAP",
    category: "FRONTEND",
    color: "#88CE02",
    icon: (
      <div className="w-6 h-6 bg-[#88CE02] text-black font-black text-xs flex items-center justify-center rounded-none font-mono">
        GS
      </div>
    ),
  },
];

const row2Items: TechItem[] = [
  {
    name: "AI Agents",
    category: "TOOLS & AI",
    color: "#A855F7",
    icon: (
      <svg className="w-6 h-6 text-[#A855F7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    name: "MCP Protocol",
    category: "TOOLS & AI",
    color: "#EC4899",
    icon: (
      <svg className="w-6 h-6 text-[#EC4899]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    category: "DATABASE",
    color: "#47A248",
    icon: (
      <div className="w-6 h-6 bg-[#47A248] text-white font-black text-xs flex items-center justify-center rounded-none font-mono">
        MDB
      </div>
    ),
  },
  {
    name: "Supabase",
    category: "DATABASE",
    color: "#3ECF8E",
    icon: (
      <svg className="w-6 h-6 text-[#3ECF8E]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.9 2.05c-.38-.45-1.12-.18-1.12.41v8.58H3.36c-.84 0-1.32.95-.82 1.62l8.56 11.29c.38.45 1.12.18 1.12-.41v-8.58h7.42c.84 0 1.32-.95.82-1.62L11.9 2.05z" />
      </svg>
    ),
  },
  {
    name: "Git & GitHub",
    category: "TOOLS",
    color: "#F05032",
    icon: (
      <svg className="w-6 h-6 text-[#F05032]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M6 21V9a9 9 0 0 0 9 9" />
      </svg>
    ),
  },
  {
    name: "Cursor AI",
    category: "TOOLS",
    color: "#00D8FF",
    icon: (
      <div className="w-6 h-6 bg-[#00D8FF] text-black font-black text-xs flex items-center justify-center rounded-none font-mono">
        AI
      </div>
    ),
  },
  {
    name: "Postman",
    category: "TOOLS",
    color: "#FF6C37",
    icon: (
      <div className="w-6 h-6 bg-[#FF6C37] text-white font-black text-xs flex items-center justify-center rounded-none font-mono">
        PM
      </div>
    ),
  },
  {
    name: "Docker / Linux",
    category: "TOOLS",
    color: "#2496ED",
    icon: (
      <svg className="w-6 h-6 text-[#2496ED]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="10" rx="0" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    name: "Three.js",
    category: "EXPLORING",
    color: "#ffffff",
    icon: (
      <svg className="w-6 h-6 text-[var(--text-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "WebSockets",
    category: "EXPLORING",
    color: "#01BAEF",
    icon: (
      <svg className="w-6 h-6 text-[#01BAEF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8L22 12L18 16" />
        <path d="M6 8L2 12L6 16" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    name: "System Design",
    category: "EXPLORING",
    color: "#F59E0B",
    icon: (
      <svg className="w-6 h-6 text-[#F59E0B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="8" rx="0" />
        <rect x="2" y="14" width="20" height="8" rx="0" />
        <line x1="6" y1="6" x2="6" y2="6.01" />
        <line x1="6" y1="18" x2="6" y2="18.01" />
      </svg>
    ),
  },
  {
    name: "Redis",
    category: "EXPLORING",
    color: "#DC382D",
    icon: (
      <div className="w-6 h-6 bg-[#DC382D] text-white font-black text-xs flex items-center justify-center rounded-none font-mono">
        RDS
      </div>
    ),
  },
];

export function TechMarquee3D() {
  return (
    <div className="mt-12 overflow-hidden relative select-none">
      {/* 3D Perspective Wrapper */}
      <div className="relative w-full [perspective:1400px] py-4 bg-[var(--bg-primary)]/40">
        {/* Subtle left & right gradient fade */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

        {/* Isometric 3D Tilted Plane */}
        <div className="flex flex-col gap-6 [transform-style:preserve-3d] transform-gpu rotate-[-1.5deg]">
          
          {/* TRACK 1: SCROLLING LEFT */}
          <div className="animate-marquee-left flex items-center gap-6 [transform-style:preserve-3d]">
            {[...row1Items, ...row1Items].map((item, idx) => (
              <div
                key={`r1-${item.name}-${idx}`}
                className="group relative flex items-center gap-4 px-5 py-3.5 bg-[var(--bg-primary)] border-2 border-[var(--border-primary)] rounded-none cursor-pointer transition-all duration-300 transform-gpu [transform-style:preserve-3d] hover:-translate-y-2 hover:border-[var(--card-accent)] shadow-[6px_6px_0px_0px_var(--border-primary)] hover:shadow-[10px_10px_0px_0px_var(--card-accent)] shrink-0 min-w-[210px]"
              >
                {/* 3D Isometric Extrusion Accent */}
                <div
                  className="absolute -top-2 -right-2 w-3 h-3 border border-[var(--border-primary)] rounded-none opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--card-accent)]"
                />

                <div className="shrink-0 p-1 bg-black/5 dark:bg-white/5 border border-[var(--border-primary)] rounded-none flex items-center justify-center">
                  {item.icon}
                </div>
                
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-[var(--text-faint)] leading-none mb-1">
                    {item.category}
                  </span>
                  <span className="font-mono text-sm font-black tracking-tight text-[var(--text-primary)] truncate">
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* TRACK 2: SCROLLING RIGHT */}
          <div className="animate-marquee-right flex items-center gap-6 [transform-style:preserve-3d]">
            {[...row2Items, ...row2Items].map((item, idx) => (
              <div
                key={`r2-${item.name}-${idx}`}
                className="group relative flex items-center gap-4 px-5 py-3.5 bg-[var(--bg-primary)] border-2 border-[var(--border-primary)] rounded-none cursor-pointer transition-all duration-300 transform-gpu [transform-style:preserve-3d] hover:-translate-y-2 hover:border-[var(--card-accent)] shadow-[6px_6px_0px_0px_var(--border-primary)] hover:shadow-[10px_10px_0px_0px_var(--card-accent)] shrink-0 min-w-[210px]"
              >
                {/* 3D Isometric Extrusion Accent */}
                <div
                  className="absolute -top-2 -right-2 w-3 h-3 border border-[var(--border-primary)] rounded-none opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--card-accent)]"
                />

                <div className="shrink-0 p-1 bg-black/5 dark:bg-white/5 border border-[var(--border-primary)] rounded-none flex items-center justify-center">
                  {item.icon}
                </div>
                
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-[var(--text-faint)] leading-none mb-1">
                    {item.category}
                  </span>
                  <span className="font-mono text-sm font-black tracking-tight text-[var(--text-primary)] truncate">
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
