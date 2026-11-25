"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Reusable scroll-triggered reveal wrapper */
export default function ScrollReveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "up" | "left" | "right" | "scale" | "fade";
  delay?: number;
  className?: string;
}) {
  const hidden: Record<string, Record<string, number | string>> = {
    up:    { opacity: 0, y: 32 },
    left:  { opacity: 0, x: -28 },
    right: { opacity: 0, x: 28 },
    scale: { opacity: 0, scale: 0.88 },
    fade:  { opacity: 0 },
  };
  const visible: Record<string, Record<string, number | string>> = {
    up:    { opacity: 1, y: 0 },
    left:  { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
    scale: { opacity: 1, scale: 1 },
    fade:  { opacity: 1 },
  };

  return (
    <motion.div
      className={className}
      initial={hidden[variant]}
      whileInView={visible[variant]}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Parallax wrapper using scroll offset */
export function ParallaxLayer({
  children,
  speed = 0.3,
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
