"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export type RevealVariant =
  | "up"
  | "left"
  | "right"
  | "scale"
  | "fade"
  | "zoomBlur"
  | "flipUp"
  | "springPop";

/** Reusable scroll-triggered reveal wrapper with multiple transition presets */
export default function ScrollReveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}) {
  const hidden: Record<RevealVariant, Record<string, number | string>> = {
    up:        { opacity: 0, y: 34 },
    left:      { opacity: 0, x: -34 },
    right:     { opacity: 0, x: 34 },
    scale:     { opacity: 0, scale: 0.86 },
    fade:      { opacity: 0 },
    zoomBlur:  { opacity: 0, scale: 0.9, filter: "blur(6px)" },
    flipUp:    { opacity: 0, rotateX: 28, y: 24 },
    springPop: { opacity: 0, scale: 0.72, y: 18 },
  };
  const visible: Record<RevealVariant, Record<string, number | string>> = {
    up:        { opacity: 1, y: 0 },
    left:      { opacity: 1, x: 0 },
    right:     { opacity: 1, x: 0 },
    scale:     { opacity: 1, scale: 1 },
    fade:      { opacity: 1 },
    zoomBlur:  { opacity: 1, scale: 1, filter: "blur(0px)" },
    flipUp:    { opacity: 1, rotateX: 0, y: 0 },
    springPop: { opacity: 1, scale: 1, y: 0 },
  };

  const transition =
    variant === "springPop"
      ? { type: "spring" as const, stiffness: 280, damping: 20, delay }
      : { duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.div
      className={className}
      style={variant === "flipUp" ? { perspective: 800 } : undefined}
      initial={hidden[variant]}
      whileInView={visible[variant]}
      viewport={{ once: true, margin: "-50px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

/** Continuous scroll-linked chapter transition (scale + opacity + y-glide) */
export function ScrollChapter({
  children,
  scrollContainer,
  className = "",
}: {
  children: React.ReactNode;
  scrollContainer?: React.RefObject<HTMLElement | null>;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainer as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.95, 1, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [0.4, 1, 1, 0.45]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

/** Parallax wrapper using scroll offset */
export function ParallaxLayer({
  children,
  scrollContainer,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  scrollContainer?: React.RefObject<HTMLElement | null>;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainer as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
