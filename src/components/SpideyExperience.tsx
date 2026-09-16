import { motion } from "framer-motion";
import { useEffect } from "react";
import { earlyExperiences, terminalCommandResponses, projects, profile } from "../data/mockData";

import { X } from "lucide-react";

export function SpideyExperience() {
  const glassCard = "backdrop-blur-xl bg-black/30 border border-white/20 shadow-2xl p-6 md:p-10";

  useEffect(() => {
    // Force scroll to top when entering cinematic mode, overriding browser scroll restoration
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // Also disable scroll restoration if the browser supports it
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  const exitSpidey = () => {
    document.documentElement.setAttribute("data-theme", "night");
    localStorage.setItem("theme", "night");
    window.dispatchEvent(new Event("storage"));
    window.location.reload();
  };

  return (
    <div className="relative z-10 w-full text-white overflow-hidden pb-[15vh]">
      
      {/* ── EXIT SPIDEY BUTTON ── */}
      <button 
        onClick={exitSpidey}
        className="fixed top-6 right-6 z-50 p-3 bg-black/60 hover:bg-[#E23636] border-2 border-white/20 hover:border-black backdrop-blur-md text-white transition-all group shadow-xl flex items-center gap-2 pr-5"
      >
        <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="font-mono text-sm font-bold uppercase tracking-wider">Exit Cinematic Mode</span>
      </button>
      {/* ── Slide 1: TECH STACK ── */}
      <motion.section 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen flex items-center justify-center p-6 md:p-12"
      >
        <div className={`max-w-4xl w-full ${glassCard}`}>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#FACC15] uppercase tracking-widest" style={{ WebkitTextStroke: "1px #000" }}>The Core Arsenal</h2>
          <div className="font-mono text-sm md:text-base leading-relaxed whitespace-pre-wrap">
            {terminalCommandResponses.stack.split('\n').map((line, i) => (
              <div key={i} className="mb-2">
                <span className="font-bold text-[#E23636]">{line.split(':')[0]}:</span>
                <span className="text-gray-100">{line.split(':')[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Slide 2: THE JOURNEY ── */}
      <motion.section 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen flex items-center justify-center p-6 md:p-12"
      >
        <div className={`max-w-4xl w-full ${glassCard}`}>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[#FACC15] uppercase tracking-widest" style={{ WebkitTextStroke: "1px #000" }}>Origin Story</h2>
          <div className="flex flex-col gap-6">
            {earlyExperiences.map((exp, i) => (
              <div key={i} className="flex gap-4 items-start relative pl-4 border-l-2 border-[#E23636]">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-[#FACC15] border-2 border-black" />
                <div>
                  <span className="font-mono text-xs text-gray-300 mb-1 block">{exp.year}</span>
                  <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                  <p className="text-sm font-bold text-[#E23636] mb-2">{exp.org}</p>
                  <p className="text-gray-200 text-sm leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Slide 3: TOP MISSIONS (PROJECTS) ── */}
      <motion.section 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-[100vh] flex items-center justify-center p-6 md:p-12"
      >
        <div className={`max-w-5xl w-full ${glassCard}`}>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[#FACC15] uppercase tracking-widest" style={{ WebkitTextStroke: "1px #000" }}>Top Missions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(0, 4).map((project, i) => (
              <div key={i} className="group block h-full">
                <div className="p-5 border border-white/10 bg-white/5 hover:bg-[#E23636]/20 hover:border-[#E23636] transition-all duration-300 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#FACC15] transition-colors">{project.name}</h3>
                  <p className="text-sm text-[#E23636] font-mono mb-3">{project.subtitle}</p>
                  <p className="text-gray-200 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0,3).map(tag => (
                      <span key={tag} className="text-[10px] uppercase font-mono px-2 py-1 bg-black/50 border border-white/10">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex gap-4 pt-4 border-t border-white/10">
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noreferrer" className="text-xs font-mono font-bold uppercase tracking-widest text-white hover:text-[#FACC15] transition-colors">
                        GitHub ↗
                      </a>
                    )}
                    {project.deployedUrl && (
                      <a href={project.deployedUrl} target="_blank" rel="noreferrer" className="text-xs font-mono font-bold uppercase tracking-widest text-[#FACC15] hover:text-[#E23636] transition-colors">
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Slide 4: THE NETWORK (CONTACT) ── */}
      <motion.section 
        id="contact"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen flex items-center justify-center p-6 md:p-12"
      >
        <div className={`max-w-3xl w-full text-center ${glassCard}`}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#FACC15] uppercase tracking-widest" style={{ WebkitTextStroke: "1px #000" }}>The Network</h2>
          <p className="text-gray-300 mb-10 max-w-lg mx-auto">Open for freelance web development, product engineering, and open-source collaboration.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-black font-bold font-mono border border-white/20 transition-all uppercase tracking-widest text-sm hover:scale-105">
              GitHub
            </a>
            <a href={profile.leetcodeUrl} target="_blank" rel="noreferrer" className="px-8 py-4 bg-[#3B82F6]/20 hover:bg-[#3B82F6] text-white font-bold font-mono border border-[#3B82F6]/50 transition-all uppercase tracking-widest text-sm hover:scale-105">
              LeetCode
            </a>
            <a href="https://x.com/qwertyuii7" target="_blank" rel="noreferrer" className="px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-black font-bold font-mono border border-white/20 transition-all uppercase tracking-widest text-sm hover:scale-105">
              Twitter
            </a>
            <a href={`mailto:${profile.email}`} className="px-8 py-4 bg-[#E23636]/20 hover:bg-[#E23636] text-white font-bold font-mono border border-[#E23636]/50 transition-all uppercase tracking-widest text-sm hover:scale-105">
              Email Me
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
