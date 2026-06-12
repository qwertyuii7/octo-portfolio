import { useRef, useEffect, useCallback, useState } from "react";
import { profile } from "../data/mockData";

const DAMPING = 0.82;
const GRAVITY = 2600;
const MASS = 1;
const CURSOR_FORCE = 3.2;
const AMBIENT_SWAY = 0.22;
const ROPE_LENGTH = 72;

interface PhysicsState {
  angle: number;
  vel: number;
}

function Lanyard({ length, color }: { length: number; color: string }) {
  return (
    <svg
      width="22"
      height={length}
      viewBox={`0 0 22 ${length}`}
      aria-hidden
      style={{ display: "block", margin: "0 auto", overflow: "visible" }}
    >
      <circle cx="11" cy="0" r="4" fill={color} />
      <path d={`M 9.5 0 L 8 ${length}`} stroke={color} strokeWidth="4.5" opacity="0.92" />
      <path d={`M 12.5 0 L 14 ${length}`} stroke={color} strokeWidth="4.5" opacity="0.92" />
      <rect x="7" y={length - 5} width="8" height="6" rx="1.5" fill="var(--card-clip)" />
      <circle cx="11" cy={length + 1.5} r="2.5" fill="var(--card-clip-ring)" />
    </svg>
  );
}

export function HangingDevCard() {
  const physRef = useRef<PhysicsState>({ angle: 0.06, vel: 0.45 });
  const rafRef = useRef<number | null>(null);
  const prevTimeRef = useRef<number | null>(null);
  const prevAngleRef = useRef(0);
  const isDraggingRef = useRef(false);
  const pivotRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const dragStartX = useRef(0);
  const dragAngle0 = useRef(0);
  const didDragRef = useRef(false);

  const [angle, setAngle] = useState(0.08);
  const reducedMotion = useRef(false);

  const tick = useCallback((now: number) => {
    if (prevTimeRef.current === null) prevTimeRef.current = now;
    const dt = Math.min((now - prevTimeRef.current) / 1000, 0.05);
    prevTimeRef.current = now;

    const s = physRef.current;

    if (!isDraggingRef.current && !reducedMotion.current) {
      const L = ROPE_LENGTH + 88;
      let torque =
        -(GRAVITY / L) * Math.sin(s.angle) -
        (DAMPING / MASS) * s.vel +
        Math.sin(now * 0.0016) * AMBIENT_SWAY;

      if (mouseRef.current.active && pivotRef.current) {
        const rect = pivotRef.current.getBoundingClientRect();
        const pivotX = rect.left + rect.width / 2;
        const dx = mouseRef.current.x - pivotX;
        const dy = Math.max(mouseRef.current.y - rect.bottom, 40);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 420) {
          const influence = (1 - dist / 420) * CURSOR_FORCE;
          torque += (dx / window.innerWidth) * influence;
        }
      }

      s.vel += torque * dt;
      s.angle += s.vel * dt;
      s.angle = Math.max(-1.2, Math.min(1.2, s.angle));
      setAngle(s.angle);
    } else if (isDraggingRef.current && dt > 0) {
      s.vel = (s.angle - prevAngleRef.current) / dt;
      prevAngleRef.current = s.angle;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) {
      physRef.current = { angle: 0, vel: 0 };
      setAngle(0);
      return;
    }

    rafRef.current = requestAnimationFrame(tick);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [tick]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (reducedMotion.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    didDragRef.current = false;
    dragStartX.current = e.clientX;
    dragAngle0.current = physRef.current.angle;
    prevAngleRef.current = physRef.current.angle;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) didDragRef.current = true;
    const L = ROPE_LENGTH + 88;
    const newAngle = dragAngle0.current - dx / L;
    const clamped = Math.max(-1.2, Math.min(1.2, newAngle));
    physRef.current.angle = clamped;
    setAngle(clamped);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    isDraggingRef.current = false;
  };

  const onCardClick = () => {
    if (didDragRef.current) return;
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const cardRotateDeg = angle * (180 / Math.PI);
  const badgeId = `MC-${new Date().getFullYear()}`;
  const stackLine = "MERN · C++ · Python · TS";

  return (
    <div className="hanging-card-root" ref={pivotRef}>
      <div className="hanging-card-anchor" aria-hidden />

      <div
        className="hanging-card-pendulum"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={onCardClick}
        role="link"
        tabIndex={0}
        aria-label="Open to opportunities — scroll to contact"
        data-cursor-hover=""
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onCardClick();
          }
        }}
        style={{ transform: `rotate(${cardRotateDeg}deg)` }}
      >
        <div className="hanging-card-lanyard">
          <Lanyard length={ROPE_LENGTH} color="var(--card-rope)" />
        </div>

        <div className="hanging-dev-card">
          <div className="hanging-dev-card__header">
            <span className="hanging-dev-card__org">Developer Access</span>
            <div className="hanging-dev-card__avatar-wrap">
              <img
                src={profile.avatarUrl}
                alt=""
                className="hanging-dev-card__avatar"
              />
            </div>
          </div>

          <div className="hanging-dev-card__body">
            <p className="hanging-dev-card__name">{profile.name}</p>
            <p className="hanging-dev-card__role">MERN Stack Developer · Student</p>
            <p className="hanging-dev-card__stack">{stackLine}</p>

            <div className="hanging-dev-card__divider" />

            <div className="hanging-dev-card__barcode" aria-hidden>
              {Array.from({ length: 22 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: i % 3 === 0 ? "2.5px" : "1.2px",
                    height: `${48 + Math.sin(i * 1.4) * 32}%`,
                  }}
                />
              ))}
            </div>

            <p className="hanging-dev-card__badge">{badgeId}</p>

            <div className="hanging-dev-card__status">
              <span className="hanging-dev-card__status-dot" />
              Open to Opportunities
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
