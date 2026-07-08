"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, useSpring, motion, MotionValue } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.88, 1] : [1.05, 1];
  };

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const rotate = useTransform(smoothProgress, [0, 0.55], [55, 0]);
  const scale = useTransform(smoothProgress, [0, 0.55], scaleDimensions());
  const translate = useTransform(smoothProgress, [0, 0.55], [0, 0]);

  return (
    <div
      className="flex items-center justify-center relative p-2 sm:p-6 md:p-12 w-full"
      ref={containerRef}
    >
      <div
        className="py-4 sm:py-6 md:py-10 w-full relative"
        style={{
          perspective: "1100px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        transformOrigin: "center top",
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl mt-6 sm:mt-8 md:mt-10 mx-auto h-auto w-full border sm:border-2 border-white/15 p-2 sm:p-4 md:p-5 bg-[#0e1117]/95 backdrop-blur-xl rounded-[20px] sm:rounded-[28px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)]"
    >
      <div className="h-auto w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#090c10] border border-white/5">
        {children}
      </div>
    </motion.div>
  );
};
