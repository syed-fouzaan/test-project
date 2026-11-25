"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate } from "animejs";
import { invite } from "@/data/invite";

interface Props {
  onComplete: () => void;
}

export default function BismillahIntro({ onComplete }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      const paths = Array.from(svg.querySelectorAll("path, circle")) as SVGGeometryElement[];
      paths.forEach((p) => {
        if (typeof p.getTotalLength === "function") {
          const len = p.getTotalLength();
          p.style.strokeDasharray = `${len}`;
          p.style.strokeDashoffset = `${len}`;
        }
      });
      animate(paths, {
        strokeDashoffset: [
          (el: unknown) =>
            typeof (el as SVGGeometryElement).getTotalLength === "function"
              ? (el as SVGGeometryElement).getTotalLength()
              : 120,
          0,
        ],
        duration: 1300,
        delay: (_, i) => (i ?? 0) * 110,
        easing: "easeInOutSine",
      });
    }

    const timer = setTimeout(onComplete, 2600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }}
      onClick={onComplete}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onComplete();
        }
      }}
      aria-label="Bismillah opening animation — tap to continue"
      className="fixed inset-0 z-[60] flex items-center justify-center cursor-pointer select-none"
      style={{ backgroundColor: "var(--bg-outer)" }}
    >
      <div
        className="relative w-full max-w-[430px] h-[100dvh] flex flex-col items-center justify-center px-8 text-center shadow-2xl overflow-hidden"
        style={{ backgroundColor: "var(--bg-ivory)" }}
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 48%, rgba(223,201,138,0.22) 0%, transparent 65%)",
          }}
        />

        {/* Animated calligraphic gold arch & botanical frame */}
        <svg
          ref={svgRef}
          viewBox="0 0 260 120"
          width="240"
          height="110"
          fill="none"
          className="mb-4"
          aria-hidden="true"
        >
          <path
            d="M30 105 C30 45, 75 18, 130 12 C185 18, 230 45, 230 105"
            stroke="#B28B45"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M44 105 C44 55, 82 30, 130 24 C178 30, 216 55, 216 105"
            stroke="#7E9B78"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <path
            d="M115 14 Q130 2 145 14"
            stroke="#B28B45"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="130" cy="8" r="2.5" stroke="#B28B45" strokeWidth="1" />
        </svg>

        <motion.p
          lang="ar"
          dir="rtl"
          initial={{ opacity: 0, scale: 0.92, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl"
          style={{
            fontFamily: "var(--font-arabic)",
            color: "var(--sage-dark)",
            lineHeight: 1.9,
          }}
        >
          {invite.arabic.bismillah}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-2 text-xs italic"
          style={{ fontFamily: "var(--font-serif)", color: "var(--gold-warm)" }}
        >
          {invite.arabic.bismillahTranslit}
        </motion.p>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="mt-10 text-[9px] tracking-[0.26em] uppercase"
          style={{ fontFamily: "var(--font-sans)", color: "var(--ink-light)" }}
        >
          Tap anywhere to continue
        </motion.span>
      </div>
    </motion.div>
  );
}
