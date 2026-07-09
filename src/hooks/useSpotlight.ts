import { useEffect, useState } from "react";

export function useSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorMode, setCursorMode] = useState<"default" | "hover" | "hero-name">("default");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest && target.closest('[data-cursor="hero-name"]')) {
        setCursorMode("hero-name");
        setIsHovering(true);
      } else if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        (target.closest && (
          target.closest('a') ||
          target.closest('button') ||
          target.closest('.cursor-pointer') ||
          target.closest('[data-cursor-hover]')
        ))
      ) {
        setCursorMode("hover");
        setIsHovering(true);
      } else {
        setCursorMode("default");
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return { position, isHovering, cursorMode };
}
