"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { projects, Project } from "../data/mockData";

export function ProjectsSection() {
  const [active, setActive] = useState<Project | boolean | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section
      className="py-20 md:py-32 border-b"
      style={{ borderColor: "var(--border-primary)" }}
      id="work"
    >
      <div className="px-6 md:px-12 mb-10">
        <div className="flex items-end justify-between mb-6">
          <div className="section-label clip-reveal" style={{ marginBottom: 0 }}>
            002 — WORK
          </div>
          <p className="hidden md:block font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase">
            click card to expand →
          </p>
        </div>
        <p className="font-mono text-xs text-[var(--text-faint)] tracking-widest uppercase mb-6 border-b border-[var(--border-primary)] pb-4">
          Projects
        </p>
      </div>

      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-50"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4 pt-24 sm:p-6 sm:pt-28 md:p-10 md:pt-28 pb-6">
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-lg h-full sm:h-fit max-h-[70vh] sm:max-h-[70vh] flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-[100] border"
              style={{
                backgroundColor: "var(--card-surface)",
                borderColor: "var(--border-primary)",
              }}
            >
              <motion.div
                layoutId={`image-${active.name}-${id}`}
                className="relative border-b shrink-0"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-primary)",
                }}
              >
                <motion.button
                  key={`button-${active.name}-${id}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.05 } }}
                  className="flex absolute top-3 right-3 sm:top-4 sm:right-4 items-center justify-center rounded-full h-8 w-8 sm:h-9 sm:w-9 z-[101] border transition-all shadow-lg hover:scale-105"
                  style={{
                    backgroundColor: "var(--card-surface)",
                    borderColor: "var(--border-primary)",
                    color: "var(--text-primary)",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(null);
                  }}
                  aria-label="Close modal"
                >
                  <CloseIcon />
                </motion.button>
                {active.imageUrl ? (
                  <img
                    width={600}
                    height={300}
                    src={active.imageUrl}
                    alt={active.name}
                    className="w-full h-36 sm:h-44 object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-36 sm:h-44 flex flex-col items-center justify-center p-4 text-center">
                    <span className="font-mono text-5xl font-black mb-1" style={{ color: "var(--text-faint)" }}>{active.id}</span>
                    <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{active.language} SYSTEM ENGINEERING</span>
                  </div>
                )}
              </motion.div>

              <div className="flex flex-col flex-1 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                <div
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-5 border-b"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-primary)",
                  }}
                >
                  <div>
                    <div className="flex items-center gap-2.5">
                      <motion.h3
                        layoutId={`title-${active.name}-${id}`}
                        className="font-black text-xl sm:text-2xl uppercase tracking-wide"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {active.name}
                      </motion.h3>
                      {active.inProgress && (
                        <span className="font-mono text-[9px] text-[#ffbd2e] bg-[#ffbd2e]/10 border border-[#ffbd2e]/30 px-2 py-0.5 rounded uppercase tracking-widest animate-pulse">
                          In Progress
                        </span>
                      )}
                    </div>
                    <motion.p
                      layoutId={`subtitle-${active.subtitle}-${id}`}
                      className="text-xs sm:text-sm font-mono mt-0.5"
                      style={{ color: "var(--card-accent)" }}
                    >
                      {active.subtitle}
                    </motion.p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto mt-2 sm:mt-0">
                    {active.deployedUrl && (
                      <a
                        href={active.deployedUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-none text-center px-4 py-2 text-xs rounded-full font-mono font-bold uppercase tracking-widest transition-opacity shadow-md"
                        style={{
                          backgroundColor: "var(--card-accent)",
                          color: "var(--bg-primary)",
                        }}
                      >
                        Live Preview ↗
                      </a>
                    )}
                    <a
                      href={active.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-none text-center px-4 py-2 text-xs rounded-full font-mono font-bold uppercase tracking-widest border transition-opacity"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "var(--border-primary)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {active.linkText || "GitHub"} ↗
                    </a>
                  </div>
                </div>

                <div className="p-5 space-y-5">
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: "var(--text-faint)" }}>Overview</h4>
                    <p className="text-sm leading-relaxed font-sans" style={{ color: "var(--text-primary)" }}>
                      {active.description}
                    </p>
                  </div>

                  {active.features && active.features.length > 0 && (
                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: "var(--text-faint)" }}>Key Features</h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {active.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs p-2.5 rounded-lg border"
                            style={{
                              backgroundColor: "var(--bg-secondary)",
                              borderColor: "var(--border-primary)",
                              color: "var(--text-primary)",
                            }}
                          >
                            <span className="font-mono font-bold mt-0.5" style={{ color: "var(--card-accent)" }}>✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: "var(--text-faint)" }}>Technologies &amp; Tags</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {active.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] px-2.5 py-1 rounded border tracking-wide uppercase"
                          style={{
                            backgroundColor: "var(--bg-secondary)",
                            borderColor: "var(--border-primary)",
                            color: "var(--text-primary)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {active.videoUrl && (
                    <div className="pt-2 border-t" style={{ borderColor: "var(--border-primary)" }}>
                      <a
                        href={active.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-red-500 hover:opacity-80 transition-opacity py-1.5 font-bold"
                      >
                        ▶ Watch Video Demo on YouTube ↗
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="px-6 md:px-12">
        <ul className="max-w-5xl mx-auto w-full flex flex-col gap-4">
          {projects.map((project) => (
            <motion.div
              layoutId={`card-${project.name}-${id}`}
              key={project.id}
              onClick={() => setActive(project)}
              className="p-3.5 sm:p-5 flex flex-row justify-between items-center gap-3 sm:gap-6 border rounded-xl sm:rounded-2xl cursor-pointer transition-all group shadow-sm hover:shadow-md"
              style={{
                backgroundColor: "var(--card-surface)",
                borderColor: "var(--border-primary)",
              }}
            >
              <div className="flex gap-3 sm:gap-5 flex-row items-center min-w-0 flex-1">
                <motion.div
                  layoutId={`image-${project.name}-${id}`}
                  className="h-16 w-20 sm:h-24 sm:w-40 rounded-lg sm:rounded-xl overflow-hidden border shrink-0 flex items-center justify-center relative"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-primary)",
                  }}
                >
                  {project.imageUrl ? (
                    <img
                      width={300}
                      height={200}
                      src={project.imageUrl}
                      alt={project.name}
                      className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-1 sm:p-2 text-center">
                      <span className="font-mono text-xl sm:text-3xl font-black" style={{ color: "var(--text-faint)" }}>{project.id}</span>
                      <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{project.language}</span>
                    </div>
                  )}
                </motion.div>

                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1 flex-wrap">
                    <span className="font-mono text-xs font-bold" style={{ color: "var(--text-faint)" }}>{project.id}</span>
                    <motion.h3
                      layoutId={`title-${project.name}-${id}`}
                      className="font-bold text-sm sm:text-xl uppercase tracking-wide group-hover:opacity-80 transition-opacity truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {project.name}
                    </motion.h3>
                    {project.inProgress && (
                      <span className="font-mono text-[9px] text-[#ffbd2e] bg-[#ffbd2e]/10 border border-[#ffbd2e]/30 px-2 py-0.5 rounded uppercase tracking-widest animate-pulse">
                        In Progress
                      </span>
                    )}
                  </div>
                  <motion.p
                    layoutId={`subtitle-${project.subtitle}-${id}`}
                    className="text-xs sm:text-sm font-mono mb-1.5 sm:mb-3 line-clamp-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {project.subtitle}
                  </motion.p>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded border uppercase tracking-wider"
                        style={{
                          backgroundColor: "var(--bg-secondary)",
                          borderColor: "var(--border-primary)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end shrink-0 pl-1">
                <motion.button
                  layoutId={`button-${project.name}-${id}`}
                  className="px-3 py-1.5 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs rounded-full font-mono font-bold border transition-all uppercase tracking-widest shrink-0 shadow-sm group-hover:scale-105"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-primary)",
                    color: "var(--text-primary)",
                  }}
                >
                  Explore ↗
                </motion.button>
              </div>
            </motion.div>
          ))}
        </ul>
      </div>
    </section>
  );
}

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      style={{ color: "var(--text-primary)" }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
