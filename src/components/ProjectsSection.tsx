import { useEffect, useRef } from "react";
import { projects } from "../data/mockData";

export function ProjectsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Mouse drag to scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
      el.classList.add('grabbing');
    };
    const onMouseLeave = () => { isDragging.current = false; el.classList.remove('grabbing'); };
    const onMouseUp = () => { isDragging.current = false; el.classList.remove('grabbing'); };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      el.scrollLeft = scrollLeft.current - walk;
    };
    // Wheel scroll (desktop)
    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth >= 768) {
        const isAtLeftEnd = el.scrollLeft <= 0;
        const isAtRightEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

        if (e.deltaY > 0 && !isAtRightEnd) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * 1.2;
        } else if (e.deltaY < 0 && !isAtLeftEnd) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * 1.2;
        }
      }
    };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  const handle3D = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    card.style.transform = `rotateX(${(y - cy) / 12}deg) rotateY(${(cx - x) / 12}deg)`;
    card.style.setProperty('--shine-x', `${x}px`);
    card.style.setProperty('--shine-y', `${y}px`);
  };

  const resetTilt = (card: HTMLDivElement) => {
    card.style.transform = 'rotateX(0) rotateY(0)';
  };

  return (
    <section
      className="py-20 md:py-32 border-b"
      style={{ borderColor: 'var(--border-primary)' }}
      id="work"
    >
      <div className="px-6 md:px-12 mb-10 flex items-end justify-between">
        <div className="section-label clip-reveal" style={{ marginBottom: 0 }}>
          002 — WORK
        </div>
        <p className="hidden md:block font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase">
          drag or scroll →
        </p>
      </div>

      <div className="projects-track px-6 md:px-12 pb-4" ref={trackRef}>
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="project-card-outer reveal-item"
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div
              className="project-card-inner group"
              onMouseMove={(e) => handle3D(e, e.currentTarget)}
              onMouseLeave={(e) => resetTilt(e.currentTarget)}
            >
              <div className="project-shine" />

              {/* Card content */}
              <div className="relative z-10">
                <div
                  className="font-mono text-6xl font-black text-[#1a1a1a] leading-none mb-8 select-none
                              group-hover:text-[var(--border-primary)] transition-colors duration-300"
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-lg font-bold uppercase tracking-wide text-[var(--text-primary)] leading-tight">
                    {project.name}
                  </h3>
                  {project.inProgress && (
                    <div className="flex items-center gap-2 border px-2 py-1 shrink-0" style={{ borderColor: "rgba(255,189,46,.3)", background: "rgba(255,189,46,.05)", borderRadius: "2px" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e] shadow-[0_0_4px_#ffbd2e] animate-pulse"></span>
                      <span className="font-mono text-[9px] text-[#ffbd2e] tracking-widest uppercase">In Progress</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-[var(--text-muted)] font-mono mb-2">{project.subtitle}</p>
                <p className="text-base text-[var(--text-muted)] leading-relaxed mt-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-[var(--text-muted)] border px-2 py-1 tracking-wider uppercase"
                      style={{ borderColor: 'var(--border-primary)', background: 'rgba(255,255,255,0.03)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Image Preview */}
              {project.imageUrl && (
                <div className="relative z-10 mt-6 mb-4 rounded-md overflow-hidden" style={{ border: '1px solid var(--border-primary)' }}>
                  <img src={project.imageUrl} alt={`${project.name} preview`} className="w-full h-32 md:h-40 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
              )}

              {/* Arrow links */}
              <div className="relative z-10 mt-6 flex flex-wrap gap-6">
                {project.deployedUrl && (
                  <a
                    href={project.deployedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-sm text-[var(--text-primary)] font-bold uppercase tracking-widest
                               hover:opacity-80 transition-opacity"
                    data-cursor-hover=""
                  >
                    Live Preview
                    <span className="inline-block group-hover:translate-x-1 transition-transform">↗</span>
                  </a>
                )}
                {project.videoUrl && (
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest
                               hover:opacity-80 transition-opacity"
                    style={{ color: "#ff4444" }}
                    data-cursor-hover=""
                  >
                    ▶ Watch Demo
                  </a>
                )}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm text-[var(--text-muted)] uppercase tracking-widest
                             hover:text-[var(--text-primary)] transition-colors"
                  data-cursor-hover=""
                >
                  {project.linkText || "View on GitHub"}
                  <span className="inline-block group-hover:translate-x-1 transition-transform">↗</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
