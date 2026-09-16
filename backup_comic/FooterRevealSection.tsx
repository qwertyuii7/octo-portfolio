import { profile } from "../data/mockData";

export function FooterRevealSection() {
  return (
    <div
      data-cursor="hero-name"
      className="relative w-full min-h-[60vh] bg-neutral-950 overflow-hidden flex flex-col justify-between p-8 sm:p-14 md:p-20 select-none transition-colors duration-700 border-t-8 border-black"
    >
      {/* ── Halftone background ── */}
      <div className="absolute inset-0 comic-halftone opacity-40 pointer-events-none" />
      
      {/* Spider webs */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none opacity-20">
        <svg className="w-full h-full stroke-red-500 fill-none" strokeWidth="1" viewBox="0 0 100 100">
          <path d="M0,0 L100,0 M0,0 L0,100 M0,0 L90,40 M0,0 L70,70 M0,0 L40,90" />
          <path d="M20,0 A20,20 0 0,1 0,20 M40,0 A40,40 0 0,1 0,40 M60,0 A60,60 0 0,1 0,60 M80,0 A80,80 0 0,1 0,80 M100,0 A100,100 0 0,1 0,100" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none opacity-20 rotate-180">
        <svg className="w-full h-full stroke-blue-600 fill-none" strokeWidth="1" viewBox="0 0 100 100">
          <path d="M0,0 L100,0 M0,0 L0,100 M0,0 L90,40 M0,0 L70,70 M0,0 L40,90" />
          <path d="M20,0 A20,20 0 0,1 0,20 M40,0 A40,40 0 0,1 0,40 M60,0 A60,60 0 0,1 0,60 M80,0 A80,80 0 0,1 0,80 M100,0 A100,100 0 0,1 0,100" />
        </svg>
      </div>

      {/* ── EMPTY TOP SPACING FOR PERFECT VERTICAL BALANCE ── */}
      <div aria-hidden className="h-6 relative z-20" />

      {/* ── MAIN TYPOGRAPHY BLOCK ── */}
      <div className="relative z-20 my-auto flex flex-col items-center justify-center text-center max-w-full">
        {/* SUBTITLE */}
        <div className="bg-yellow-400 border-2 border-black px-4 py-1.5 shadow-[4px_4px_0px_#E23636] mb-8 rotate-[-2deg]">
          <p className="font-comic-hero text-lg sm:text-xl uppercase tracking-wider font-black text-black">
            NEXT ISSUE: YOUR PROJECT HERE
          </p>
        </div>

        {/* COLOSSAL STATIC NAME */}
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black font-comic-hero uppercase leading-none text-white max-w-full break-words tracking-tighter comic-title-3d">
          TO BE<br />CONTINUED...
        </h2>
      </div>

      {/* ── FOOTER MASTHEAD CREDITS ── */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 mt-12 border-t-4 border-neutral-900">
        <div className="flex items-center gap-4">
          <div className="bg-red-600 text-white font-comic-hero text-[10px] font-black px-2 py-1 border-2 border-black uppercase shadow-[2px_2px_0px_#FFD700]">
            APPROVED BY CCA
          </div>
          <p className="font-comic-mono text-[10px] tracking-widest uppercase font-bold text-neutral-500">
            © 2024-2026 MAYANK CHAUDHARY
          </p>
        </div>

        <div className="flex items-center gap-6 font-comic-hero text-lg tracking-wider uppercase font-black text-neutral-400">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-yellow-400 hover:scale-110 transition-all duration-300"
          >
            GitHub
          </a>
          <a
            href={profile.leetcodeUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-yellow-400 hover:scale-110 transition-all duration-300"
          >
            LeetCode
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-yellow-400 hover:scale-110 transition-all duration-300 text-red-500 underline decoration-2 underline-offset-4"
          >
            Email Me!
          </a>
        </div>
      </div>
    </div>
  );
}
