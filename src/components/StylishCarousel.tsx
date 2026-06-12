import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface StylishCarouselItem {
  src: string;
  title?: string;
  alt?: string;
}

export interface StylishCarouselProps {
  items: StylishCarouselItem[];
  initialIndex?: number;
  slideSize?: string;
  rotationDegrees?: number;
  inactiveScale?: number;
  yOffsetPercent?: number;
  springBounce?: number;
  springDuration?: number;
  showArrows?: boolean;
  showDots?: boolean;
  clickToNavigate?: boolean;
  autoPlay?: number;
  className?: string;
  onIndexChange?: (index: number) => void;
  borderRadius?: string;
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

export function StylishCarousel({
  items = [],
  initialIndex = 0,
  slideSize = "clamp(200px, 72vw, 320px)",
  rotationDegrees = 24,
  inactiveScale = 0.64,
  yOffsetPercent = 42,
  springBounce = 0.15,
  springDuration = 0.8,
  showArrows = true,
  showDots = true,
  clickToNavigate = true,
  autoPlay = 0,
  className,
  onIndexChange,
  borderRadius = "0.5rem",
}: StylishCarouselProps) {
  const clampedInitial = Math.max(0, Math.min(initialIndex, items.length - 1));
  const [activeIndex, setActiveIndex] = useState(clampedInitial);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, items.length - 1));
      setActiveIndex(clamped);
      onIndexChange?.(clamped);
    },
    [items.length, onIndexChange],
  );

  const toPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const toNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement) && document.activeElement !== document.body) return;
      if (e.key === "ArrowLeft") toPrev();
      if (e.key === "ArrowRight") toNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toPrev, toNext]);

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? toNext() : toPrev();
    touchStartX.current = null;
  };

  useEffect(() => {
    if (!autoPlay) return;
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev + 1 >= items.length ? 0 : prev + 1;
        onIndexChange?.(next);
        return next;
      });
    }, autoPlay);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, items.length, onIndexChange]);

  const spring = reducedMotion.current
    ? { duration: 0.01 }
    : { type: "spring" as const, bounce: springBounce, duration: springDuration };

  if (!items.length) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "stylish-carousel relative flex flex-col items-center select-none w-full",
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Image carousel"
      role="region"
    >
      <div
        style={{ width: slideSize }}
        className="relative mt-2 overflow-hidden rounded-xl"
      >
        <motion.div
          className="flex"
          style={{ width: `${items.length * 100}%` }}
          animate={{ x: `${(-activeIndex * 100) / items.length}%` }}
          transition={spring}
        >
          {items.map((item, i) => {
            const offset = i - activeIndex;
            const isActive = offset === 0;

            return (
              <motion.div
                key={item.src}
                style={{ width: `${100 / items.length}%`, aspectRatio: "4 / 3" }}
                className="flex-shrink-0 flex flex-col items-center gap-3 will-change-transform"
                animate={{
                  scale: isActive ? 1 : inactiveScale,
                }}
                transition={spring}
              >
                <div
                  className="relative w-full flex-1 min-h-0 overflow-hidden stylish-carousel__slide"
                  style={{ borderRadius }}
                >
                  <img
                    src={item.src}
                    alt={item.alt ?? item.title ?? `Slide ${i + 1}`}
                    draggable={false}
                    onClick={() => clickToNavigate && goTo(i)}
                    className={cn(
                      "w-full h-full object-cover transition-[filter] duration-300 will-change-transform",
                      !isActive && "brightness-[0.72]",
                      clickToNavigate && !isActive && "cursor-pointer",
                    )}
                    loading="lazy"
                  />

                  {isActive && (
                    <motion.div
                      layoutId="carousel-glow-ring"
                      className="absolute inset-0 rounded-[inherit] pointer-events-none stylish-carousel__ring"
                      style={{ borderRadius }}
                      transition={spring}
                    />
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {item.title && isActive && (
                    <motion.p
                      key={`caption-${i}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.28 }}
                      className="stylish-carousel__caption"
                    >
                      {item.title}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="stylish-carousel__controls mt-8">
        {showArrows && (
          <button
            type="button"
            aria-label="Previous slide"
            onClick={toPrev}
            disabled={activeIndex === 0}
            className="stylish-carousel__arrow"
            data-cursor-hover=""
          >
            <ChevronIcon direction="left" />
          </button>
        )}

        {showDots && (
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <motion.button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                animate={{
                  width: activeIndex === i ? 28 : 8,
                  opacity: activeIndex === i ? 1 : 0.35,
                }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                className="stylish-carousel__dot"
                style={{ minWidth: 8 }}
                data-cursor-hover=""
              />
            ))}
          </div>
        )}

        {showArrows && (
          <button
            type="button"
            aria-label="Next slide"
            onClick={toNext}
            disabled={activeIndex === items.length - 1}
            className="stylish-carousel__arrow"
            data-cursor-hover=""
          >
            <ChevronIcon direction="right" />
          </button>
        )}
      </div>

      <p className="stylish-carousel__counter mt-3">
        {activeIndex + 1} / {items.length}
      </p>
    </div>
  );
}

export default StylishCarousel;
