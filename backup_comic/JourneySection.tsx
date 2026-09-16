import { profile, journeyItems, milestoneCarouselItems, earlyExperiences as experiences } from "../data/mockData";
import { StylishCarousel } from "./StylishCarousel";

export function JourneySection() {
  return (
    <section
      className="py-20 md:py-32 px-6 md:px-12 border-b-4 border-neutral-900 bg-neutral-950 relative overflow-hidden"
      id="journey"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 comic-halftone-red opacity-10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Issue Header */}
        <div className="reveal-item inline-flex items-center gap-3 px-3 py-1.5 bg-neutral-900 border-2 border-black shadow-[3px_3px_0px_#1A3A7A] mb-8">
          <span className="font-comic-mono text-xs text-blue-500 font-bold uppercase tracking-wider">PANEL #05: THE ORIGIN STORY</span>
          <span className="text-neutral-600">|</span>
          <span className="font-comic-mono text-xs text-yellow-400 uppercase tracking-wider">FLASHBACK SEQUENCE</span>
        </div>

        {/* Comic title */}
        <div className="reveal-item mb-12">
          <h2 className="font-comic-hero text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white comic-title-3d-sm">
            THE ORIGIN STORY
          </h2>
        </div>

        {/* Timeline + Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left: Timeline (Comic Strip Layout) */}
          <div className="lg:col-span-7 reveal-item relative">
            {/* Spider web connector line */}
            <div className="absolute left-6 top-8 bottom-0 w-1 bg-red-600/50 z-0">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjEwIj48cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjRTIzNjM2Ii8+PC9zdmc+')] opacity-50" />
            </div>

            <div className="space-y-8 relative z-10">
              {experiences.map((exp, i) => {
                const acts = ["ACT I: THE SPARK", "ACT II: THE BUILDUP", "ACT III: THE LAUNCH", "PRESENT: THE CRUSADE"];
                const actName = acts[i % acts.length];
                
                return (
                  <div className="flex gap-6 relative" key={i}>
                    {/* Comic dot */}
                    <div className="w-12 h-12 shrink-0 bg-neutral-900 border-3 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_#E23636] z-10 relative">
                      <span className="w-3 h-3 bg-yellow-400 rounded-full" />
                    </div>

                    {/* Comic narrative box */}
                    <div className="bg-[#FFE81F]/10 border-2 border-black p-5 shadow-[4px_4px_0px_#000] flex-1 relative mt-2 group hover:bg-[#FFE81F]/20 transition-colors">
                      <div className="absolute -top-3 left-4 bg-yellow-400 text-black font-comic-hero text-[10px] px-2 py-0.5 border border-black uppercase">
                        {actName}
                      </div>
                      <div className="absolute -top-3 right-4 bg-red-600 text-white font-comic-mono text-[9px] px-2 py-0.5 border border-black uppercase font-bold">
                        {exp.year}
                      </div>
                      
                      <h3 className="text-xl font-black font-comic-hero text-white mb-1 tracking-wide uppercase mt-2">
                        {exp.title}
                      </h3>
                      <p className="font-comic-mono text-xs text-red-400 mb-3 tracking-wider font-bold uppercase">{exp.org}</p>
                      
                      {exp.desc && (
                        <p className="text-sm font-comic-body text-neutral-300 leading-relaxed">{exp.desc}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Comic Polaroid Snapshot */}
          <div
            className="lg:col-span-4 lg:col-start-9 reveal-item mt-8 lg:mt-0 flex justify-center lg:block"
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="bg-white border-4 border-black p-4 pb-12 shadow-[8px_8px_0px_#1A3A7A] rotate-3 hover:rotate-0 transition-transform duration-300 relative max-w-sm w-full">
              {/* Paperclip */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-16 border-2 border-neutral-400 rounded-full bg-transparent z-20 pointer-events-none" />
              
              <div className="border-4 border-black overflow-hidden relative group">
                {/* Halftone overlay */}
                <div className="absolute inset-0 comic-halftone opacity-40 mix-blend-overlay z-10 pointer-events-none group-hover:opacity-10 transition-opacity" />
                <img
                  src={profile.journeyImage}
                  alt="Mayank at LucknowFOSS"
                  className="w-full aspect-[3/4] object-cover object-top filter grayscale contrast-125 sepia-[.3] group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-500"
                />
              </div>
              
              <div className="absolute bottom-4 left-0 w-full text-center">
                <p className="font-comic-hero text-xl text-black uppercase transform -rotate-2">
                  LUCKNOW FOSS • 2024
                </p>
              </div>

              {/* Action sticker */}
              <div className="absolute -bottom-6 -right-6 rotate-[-15deg] z-20">
                <div className="clip-burst bg-red-600 border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                  <span className="font-comic-hero font-black text-xs text-yellow-300 tracking-tighter uppercase px-1">SNAP!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Milestones + In the Field (Full Width Below) ── */}
        <div
          className="mt-20 border-t-4 border-neutral-900 pt-16 relative"
        >
          {/* Divider Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black font-comic-hero text-sm px-4 py-1 border-2 border-black shadow-[2px_2px_0px_#000] uppercase">
            MEANWHILE...
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 max-w-6xl mx-auto">
            
            {/* Milestones */}
            {journeyItems.length > 0 && (
              <div className="reveal-item">
                <div className="inline-block bg-blue-700 text-white font-comic-hero text-xl px-3 py-1 border-2 border-black shadow-[3px_3px_0px_#000] uppercase mb-8 rotate-[-2deg]">
                  MILESTONES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {journeyItems.map((item) => (
                    <div
                      key={item.year}
                      className="bg-neutral-900 border-2 border-black p-4 shadow-[3px_3px_0px_#E23636] hover:shadow-[4px_4px_0px_#FFD700] hover:-translate-y-1 transition-all group relative"
                    >
                      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                        <div className="bg-red-600 text-white text-[8px] font-bold py-0.5 px-3 transform rotate-45 translate-x-[6px] translate-y-[2px] shadow-sm uppercase font-comic-mono">
                          {item.year}
                        </div>
                      </div>
                      <p className="font-comic-mono text-[10px] text-red-500 font-bold tracking-widest uppercase mb-1">{item.year}</p>
                      <p className="font-comic-hero font-black text-white text-xl mb-1 uppercase tracking-wide group-hover:text-yellow-400 transition-colors">{item.title}</p>
                      <p className="font-comic-body text-sm text-neutral-400 leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* In the Field — Carousel */}
            <div className="reveal-item">
              <div className="inline-block bg-red-600 text-white font-comic-hero text-xl px-3 py-1 border-2 border-black shadow-[3px_3px_0px_#000] uppercase mb-2 rotate-[2deg]">
                IN THE FIELD
              </div>
              <p
                className="font-comic-mono text-[10px] tracking-widest uppercase mb-6 text-yellow-400 font-bold"
              >
                Hackathons · FOSS · DevFests · Builder Days
              </p>
              
              <div className="border-4 border-black p-2 bg-white shadow-[6px_6px_0px_#1A3A7A] rotate-1">
                <div className="border-2 border-black overflow-hidden relative">
                  <div className="absolute inset-0 comic-halftone opacity-30 mix-blend-overlay z-10 pointer-events-none" />
                  <StylishCarousel
                    items={milestoneCarouselItems.map((item) => ({
                      src: item.src,
                      title: item.title,
                      alt: item.alt,
                    }))}
                    autoPlay={6000}
                    slideSize="100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
