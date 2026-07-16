import { useEffect, useState, useRef } from "react";

export function useSpotlight() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorMode, setCursorMode] = useState<"default" | "hover" | "hero-name">("default");

  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest && target.closest('[data-cursor="hero-name"]')) {
        setCursorMode("hero-name");
        setIsHovering(true);
      } else if (
        target && (
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          (target.closest && (
            target.closest('a') ||
            target.closest('button') ||
            target.closest('.cursor-pointer') ||
            target.closest('[data-cursor-hover]')
          ))
        )
      ) {
        setCursorMode("hover");
        setIsHovering(true);
      } else {
        setCursorMode("default");
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    let rafId: number;
    const animate = () => {
      // Ultra-crisp, buttery smooth interpolation factor (0.42) for immediate, non-laggy tracking
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.42;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.42;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Update ONLY the spotlight element's radial gradient directly to avoid top-level layout thrashing
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(circle 500px at ${currentPos.current.x}px ${currentPos.current.y}px, rgba(255, 255, 255, .022), transparent 80%)`;
      }

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { cursorRef, spotlightRef, containerRef, isHovering, cursorMode };
}
