"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { projects, Project } from "../data/mockData";

/* ── Comic Action Burst for badges ────────────── */
function ActionBurst({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`select-none pointer-events-none ${className}`}>
      <div className="clip-burst bg-yellow-400 border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
        <span className="font-comic-hero font-black text-[10px] sm:text-xs text-red-600 tracking-tighter uppercase px-1">{text}</span>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [active, setActive] = useState<Project | boolean | null>(null);
  const [showAll, setShowAll] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  const displayedProjects = showAll ? projects : projects.slice(0, 6); // Show 6 to fit nice grid

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
      className="py-20 md:py-32 border-b-4 border-neutral-900 relative bg-neutral-950 overflow-hidden"
      id="work"
    >
      {/* Background */}
      <div className="absolute inset-0 comic-halftone opacity-20 pointer-events-none" />

      <div className="px-6 md:px-12 mb-10 relative z-10 max-w-[1440px] mx-auto">
        {/* Issue Header */}
        <div className="reveal-item inline-flex items-center gap-3 px-3 py-1.5 bg-neutral-900 border-2 border-black shadow-[3px_3px_0px_#1A3A7A] mb-8">
          <span className="font-comic-mono text-xs text-blue-500 font-bold uppercase tracking-wider">PANEL #04: THE MULTIVERSE OF PROJECTS</span>
          <span className="text-neutral-600">|</span>
          <span className="font-comic-mono text-xs text-yellow-400 uppercase tracking-wider">ISSUE ARCHIVE</span>
        </div>

        <div className="flex items-end justify-between mb-6 reveal-item">
          <h2 className="font-comic-hero text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white comic-title-3d-sm">
            THE MULTIVERSE<br />OF PROJECTS
          </h2>
          <p className="hidden md:block font-comic-mono text-xs text-neutral-400 tracking-widest uppercase bg-neutral-900 border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#000]">
            CLICK COVER TO EXPAND ↗
          </p>
        </div>
      </div>

      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm h-full w-full z-50"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4 sm:p-6 pb-6 pt-20 overflow-y-auto">
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-2xl flex flex-col bg-neutral-900 border-4 border-black shadow-[12px_12px_0px_0px_#E23636] z-[100] overflow-hidden my-auto"
            >
              {/* Comic Book Cover / Modal Image */}
              <motion.div
                layoutId={`image-${active.name}-${id}`}
                className="relative border-b-4 border-black shrink-0 h-64 sm:h-80 bg-neutral-950 overflow-hidden"
              >
                <div className="absolute inset-0 comic-halftone opacity-30 mix-blend-overlay z-10 pointer-events-none" />
                <motion.button
                  key={`button-${active.name}-${id}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.05 } }}
                  className="flex absolute top-4 right-4 items-center justify-center bg-red-600 border-2 border-black w-10 h-10 shadow-[3px_3px_0px_0px_#000] text-white hover:bg-red-500 hover:-translate-y-0.5 transition-transform z-[101]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(null);
                  }}
                >
                  <span className="font-comic-hero font-black text-xl leading-none pt-1">X</span>
                </motion.button>
                <motion.img
                  layoutId={`image-src-${active.name}-${id}`}
                  src={active.imageUrl}
                  alt={active.name}
                  className="w-full h-full object-cover object-top filter grayscale contrast-125 sepia-[.2]"
                />
                
                {/* Comic price box corner */}
                <div className="absolute top-4 left-4 bg-yellow-400 border-2 border-black w-12 h-16 flex flex-col items-center justify-center z-20 shadow-[2px_2px_0px_#000] rotate-[-5deg]">
                  <span className="font-comic-hero font-black text-[9px] uppercase tracking-tighter leading-none border-b border-black w-full text-center pb-1">ISSUE</span>
                  <span className="font-comic-hero font-black text-2xl text-red-600 leading-none pt-1">#01</span>
                </div>
              </motion.div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 bg-neutral-900 relative">
                {/* Tech stamps */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {active.tags.map((t) => (
                    <span key={t} className="bg-neutral-800 border-2 border-black text-neutral-200 font-comic-mono text-[10px] font-bold uppercase px-2 py-1 shadow-[2px_2px_0px_#000]">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.name}-${id}`}
                      className="font-comic-hero font-black text-3xl sm:text-4xl uppercase text-white tracking-wide"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`desc-${active.name}-${id}`}
                      className="font-comic-mono text-sm text-neutral-400 mt-1 uppercase"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.url}
                    target="_blank"
                    rel="noreferrer"
                    className="comic-btn-primary px-4 py-2 text-base hidden sm:inline-flex shrink-0"
                  >
                    VIEW REPO
                  </motion.a>
                </div>

                <div className="border-t-2 border-neutral-800 my-6" />

                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-300 font-comic-body text-sm sm:text-base leading-relaxed space-y-4"
                >
                  <p>
                    {active.description || "In this thrilling issue, watch as complex bugs are defeated using state-of-the-art web technologies. A masterclass in full-stack architecture, featuring high-octane performance and zero-downtime deployments."}
                  </p>
                  
                  {/* Action items */}
                  <ul className="space-y-2 mt-4 font-comic-mono text-sm">
                    <li className="flex items-center gap-2"><span className="text-red-500 font-bold">›</span> Implemented custom web-shooters (API routes)</li>
                    <li className="flex items-center gap-2"><span className="text-red-500 font-bold">›</span> Defeated the Green Goblin (memory leaks)</li>
                    <li className="flex items-center gap-2"><span className="text-red-500 font-bold">›</span> Saved the city (deployed to production)</li>
                  </ul>
                </motion.div>
                
                {/* Mobile CTA */}
                <motion.a
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  href={active.url}
                  target="_blank"
                  rel="noreferrer"
                  className="comic-btn-primary w-full justify-center mt-8 sm:hidden"
                >
                  VIEW REPO
                </motion.a>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-8 px-6 md:px-12 relative z-10">
        {displayedProjects.map((project, idx) => (
          <motion.li
            layoutId={`card-${project.name}-${id}`}
            key={project.name}
            onClick={() => setActive(project)}
            className="group flex flex-col bg-neutral-900 border-4 border-black shadow-[8px_8px_0px_0px_#E23636] hover:shadow-[12px_12px_0px_0px_#FFD700] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden relative"
          >
            {/* Action burst hover effect */}
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rotate-12 scale-90 group-hover:scale-100">
              <div className="clip-burst bg-yellow-400 border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                <span className="font-comic-hero font-black text-xs text-red-600 tracking-tighter uppercase px-1">READ!</span>
              </div>
            </div>

            <motion.div layoutId={`image-${project.name}-${id}`} className="relative h-64 border-b-4 border-black overflow-hidden bg-neutral-950">
              {/* Comic cover halftone overlay */}
              <div className="absolute inset-0 comic-halftone opacity-40 mix-blend-overlay z-10 pointer-events-none group-hover:opacity-20 transition-opacity" />
              
              <img
                src={project.imageUrl}
                alt={project.name}
                className="w-full h-full object-cover object-top filter grayscale contrast-125 sepia-[.2] group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-500"
              />
              
              {/* Vintage Comic Price Box */}
              <div className="absolute top-3 left-3 bg-yellow-400 border-2 border-black w-10 h-14 flex flex-col items-center justify-center z-20 shadow-[2px_2px_0px_#000] rotate-[-5deg]">
                <span className="font-comic-hero font-black text-[8px] uppercase tracking-tighter leading-none border-b border-black w-full text-center pb-1 pt-0.5">ISSUE</span>
                <span className="font-comic-hero font-black text-xl text-red-600 leading-none pt-1">#{String(idx + 1).padStart(2, '0')}</span>
              </div>

              {/* CCA Stamp */}
              <div className="absolute bottom-3 right-3 bg-white border-2 border-black rounded-full w-8 h-8 flex items-center justify-center z-20 shadow-[2px_2px_0px_#000] rotate-[15deg]">
                <span className="font-comic-hero font-black text-[6px] text-black text-center leading-tight">APPROVED<br/>BY CCA</span>
              </div>
            </motion.div>

            <div className="p-5 flex flex-col bg-neutral-900">
              <motion.h3
                layoutId={`title-${project.name}-${id}`}
                className="font-comic-hero font-black text-2xl uppercase text-white tracking-wide group-hover:text-yellow-400 transition-colors line-clamp-1"
              >
                {project.name}
              </motion.h3>
              <motion.p
                layoutId={`desc-${project.name}-${id}`}
                className="font-comic-mono text-xs text-neutral-400 mt-1 uppercase line-clamp-2 min-h-[2rem]"
              >
                {project.description}
              </motion.p>
              
              {/* Tech stamps */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.tags.slice(0, 3).map((t) => (
                  <span key={t} className="bg-neutral-950 border border-neutral-700 text-neutral-300 font-comic-mono text-[9px] font-bold uppercase px-1.5 py-0.5">
                    {t}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="bg-neutral-950 border border-neutral-700 text-neutral-500 font-comic-mono text-[9px] font-bold uppercase px-1.5 py-0.5">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.li>
        ))}
      </ul>

      {/* Comic section divider */}
      <div className="w-full mt-16 border-b-4 border-neutral-900 relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-950 px-4 border-2 border-black text-[10px] font-comic-mono uppercase tracking-widest text-neutral-500">
          CONTINUED IN ISSUE #05
        </div>
      </div>
    </section>
  );
}
