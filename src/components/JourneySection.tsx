import { profile, journeyItems } from "../data/mockData";

export function JourneySection() {
  const experiences = [
    {
      year: "2022",
      title: "Completed 12th (PCM)",
      org: "Jawahar Navodaya Vidyalaya, Etawah",
      desc: "Science stream with Physics, Chemistry & Mathematics.",
    },
    {
      year: "2024 – Present",
      title: "CS Engineering Student",
      org: "Lucknow University, Lucknow",
      desc: "Currently entering 3rd year. Building projects in C++, Python, and Web technologies alongside academics.",
    },
    {
      year: "Now  ◉",
      title: "Finding work as a Freelancer",
      org: "Open to opportunities",
      desc: "Available for freelance web development, product engineering, and open-source collaboration.",
    },
  ];

  return (
    <section
      className="py-20 md:py-32 px-6 md:px-12 border-b"
      style={{ borderColor: 'var(--border-primary)' }}
      id="journey"
    >
      <div className="section-label clip-reveal">004 — JOURNEY</div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Timeline */}
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

          {/* Journey items from data */}
          {journeyItems.length > 0 && (
            <div className="mt-14 border-t pt-10" style={{ borderColor: 'var(--border-primary)' }}>
              <p className="section-label" style={{ marginBottom: '20px' }}>Milestones</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {journeyItems.map((item) => (
                  <div
                    key={item.year}
                    className="border p-5"
                    style={{ borderColor: 'var(--border-primary)', background: 'rgba(255,255,255,0.02)' }}
                  >
                    <p className="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase mb-2">{item.year}</p>
                    <p className="font-bold text-[var(--text-primary)] text-base mb-2">{item.title}</p>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Photo */}
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
    </section>
  );
}
