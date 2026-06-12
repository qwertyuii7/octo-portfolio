import { profile, journeyItems, milestoneCarouselItems, earlyExperiences as experiences } from "../data/mockData";
import { StylishCarousel } from "./StylishCarousel";

export function JourneySection() {

  return (
    <section
      className="py-20 md:py-32 px-6 md:px-12 border-b"
      style={{ borderColor: 'var(--border-primary)' }}
      id="journey"
    >
      <div className="section-label clip-reveal">004 — JOURNEY</div>

      {/* Timeline + Photo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-7 reveal-item">
          <div className="timeline-wrap">
            {experiences.map((exp, i) => (
              <div className="timeline-entry" key={i}>
                <p className="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase mb-2">
                  {exp.year}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-1 leading-tight">
                  {exp.title}
                </h3>
                <p className="font-mono text-sm text-[var(--text-muted)] mb-3 tracking-wide">{exp.org}</p>
                {exp.desc && (
                  <p className="text-base text-[var(--text-muted)] leading-relaxed">{exp.desc}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className="lg:col-span-4 lg:col-start-9 reveal-item mt-8 lg:mt-0"
          style={{ transitionDelay: '0.2s' }}
        >
          <div className="journey-photo-frame max-w-xs mx-auto lg:mx-0">
            <img
              src={profile.journeyImage}
              alt="Mayank at LucknowFOSS"
              className="journey-photo-img"
            />
            <span className="frame-corner fc-tl" />
            <span className="frame-corner fc-tr" />
            <span className="frame-corner fc-bl" />
            <span className="frame-corner fc-br" />
          </div>
          <p className="font-mono text-xs text-[var(--text-muted)] tracking-widest mt-6 text-center lg:text-left">
            LucknowFOSS · FOSS United · 2024
          </p>
        </div>
      </div>

      {/* Milestones + In the Field — full width below */}
      <div
        className="mt-16 border-t pt-12"
        style={{ borderColor: 'var(--border-primary)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 max-w-6xl mx-auto">

          {/* Milestones */}
          {journeyItems.length > 0 && (
            <div className="reveal-item">
              <p className="section-label" style={{ marginBottom: '24px' }}>Milestones</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {journeyItems.map((item) => (
                  <div
                    key={item.year}
                    className="border p-5 transition-colors duration-200"
                    style={{
                      borderColor: 'var(--border-primary)',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <p className="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase mb-2">{item.year}</p>
                    <p className="font-bold text-[var(--text-primary)] text-base mb-2">{item.title}</p>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* In the Field — Carousel */}
          <div className="reveal-item">
            <p className="section-label" style={{ marginBottom: "10px" }}>In the Field</p>
            <p
              className="font-mono text-[10px] tracking-[0.2em] uppercase mb-6"
              style={{ color: "var(--text-faint)" }}
            >
              Hackathons · FOSS · DevFests · Builder Days
            </p>
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
    </section>
  );
}
