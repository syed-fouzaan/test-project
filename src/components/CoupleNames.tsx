"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { invite } from "@/data/invite";
import ScrollReveal from "./ScrollReveal";
import { GardenArchHero } from "./ornaments/BotanicalArch";

interface Props {
  recipientName?: string;
  lang: "en" | "ar";
  scrollContainer: React.RefObject<HTMLDivElement | null>;
}

function RosePetal({ x, delay, size, duration }: { x: number; delay: number; size: number; duration: number }) {
  return (
    <div
      className="css-petal"
      style={{
        left: `${x}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 20 24" width={size} height={size}>
        <ellipse cx="10" cy="12" rx="7" ry="11" fill="#C8D9C4" opacity="0.65" transform="rotate(-15 10 12)" />
      </svg>
    </div>
  );
}

const petals = [
  { x: 12, delay: 0, size: 14, duration: 7.0 },
  { x: 28, delay: 1.5, size: 10, duration: 8.5 },
  { x: 48, delay: 0.8, size: 12, duration: 6.5 },
  { x: 65, delay: 2.2, size: 9, duration: 9.2 },
  { x: 80, delay: 0.3, size: 15, duration: 7.8 },
  { x: 90, delay: 3.1, size: 11, duration: 6.2 },
  { x: 5, delay: 2.8, size: 8, duration: 8.0 },
  { x: 55, delay: 1.1, size: 13, duration: 7.4 },
];

export default function CoupleNames({ recipientName, lang, scrollContainer }: Props) {
  const [verseOpen, setVerseOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    container: scrollContainer as React.RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });
  const namesY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const archScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="snap-section relative min-h-[100dvh] flex flex-col items-center justify-between pt-16 pb-10 px-6 text-center overflow-hidden"
      style={{ backgroundColor: "var(--bg-ivory)" }}
      aria-labelledby="names-heading"
    >
      {/* Falling CSS petals */}
      <motion.div className="absolute inset-0 pointer-events-none z-0" style={{ opacity: bgOpacity }}>
        {petals.map((p, i) => <RosePetal key={i} {...p} />)}
      </motion.div>

      {/* Illustrated Botanical Garden Arch with scroll scale */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ scale: archScale, opacity: bgOpacity }}
      >
        <GardenArchHero />
      </motion.div>

      {/* Bismillah + verse toggle */}
      <div className="relative z-10 w-full max-w-xs mx-auto flex flex-col items-center gap-3">
        {recipientName && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-4 py-1.5 rounded-full text-xs"
            style={{
              backgroundColor: "rgba(58,82,54,0.08)",
              color: "var(--sage-dark)",
              fontFamily: "var(--font-sans)",
              letterSpacing: "0.04em",
            }}
          >
            {lang === "ar" ? "ضيفنا الكريم: " : "Honoured Guest: "}
            <strong>{recipientName}</strong>
          </motion.div>
        )}

        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setVerseOpen((v) => !v)}
          className="focus:outline-none w-full flex flex-col items-center gap-1"
          aria-expanded={verseOpen}
          aria-label="Toggle Quranic verse"
        >
          <p
            lang="ar"
            dir="rtl"
            className="text-2xl"
            style={{ fontFamily: "var(--font-arabic)", color: "var(--sage-dark)", lineHeight: 1.8 }}
          >
            {invite.arabic.bismillah}
          </p>
          <span
            className="text-[9px] tracking-widest"
            style={{ fontFamily: "var(--font-sans)", color: "var(--sage-mid)" }}
          >
            {verseOpen ? "HIDE VERSE" : "TAP • QURAN 30:21"}
          </span>
        </motion.button>

        <AnimatePresence>
          {verseOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden w-full"
            >
              <div
                className="p-4 rounded-2xl text-center"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--divider)",
                  boxShadow: "0 4px 20px rgba(31,41,30,0.06)",
                }}
              >
                <p lang="ar" dir="rtl" className="text-sm leading-loose mb-2" style={{ color: "var(--sage-dark)", fontFamily: "var(--font-arabic)" }}>
                  {invite.arabic.verse.arabic}
                </p>
                <p className="text-xs italic" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-serif)", lineHeight: 1.6 }}>
                  &ldquo;{invite.arabic.verse.translation}&rdquo;
                </p>
                <p className="text-[9px] mt-1 tracking-wide" style={{ color: "var(--ink-light)", fontFamily: "var(--font-sans)" }}>
                  — {invite.arabic.verse.reference}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Couple names */}
      <motion.div
        className="relative z-10 flex flex-col items-center w-full max-w-xs mx-auto"
        style={{ y: namesY }}
      >
        <ScrollReveal variant="fade" delay={0.1}>
          <div className="leaf-divider mb-4" style={{ width: 180 }}>
            <span style={{ color: "var(--sage-soft)", fontSize: 13 }}>❧</span>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.15}>
          <p
            className="text-xs tracking-[0.14em] mb-3"
            style={{ fontFamily: "var(--font-sans)", color: "var(--sage-mid)", textTransform: "uppercase" }}
          >
            {lang === "ar" ? "نعلن بكل سرور زفاف" : "With the grace of Allah, we announce the Nikah of"}
          </p>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.22}>
          <h1
            id="names-heading"
            className="shimmer-name"
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "clamp(44px, 12vw, 58px)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            {invite.bride.name}
          </h1>
          <p
            className="text-xs mt-1"
            style={{ fontFamily: "var(--font-serif)", color: "var(--ink-muted)", fontStyle: "italic" }}
          >
            {lang === "ar" ? "كريمة " : "D/O "}{invite.bride.parents.join(" & ")}
          </p>
          <p className="text-[10px] mt-0.5 tracking-widest" style={{ fontFamily: "var(--font-sans)", color: "var(--sage-mid)" }}>
            {invite.bride.place}
          </p>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={0.3}>
          <div className="my-4 flex flex-col items-center gap-1">
            <div style={{ width: 1, height: 20, backgroundColor: "var(--divider)" }} />
            <span
              style={{
                fontFamily: "var(--font-script)",
                fontSize: 32,
                color: "var(--gold-warm)",
                lineHeight: 1,
              }}
            >
              &amp;
            </span>
            <div style={{ width: 1, height: 20, backgroundColor: "var(--divider)" }} />
          </div>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.35}>
          <h2
            className="shimmer-name"
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "clamp(38px, 10vw, 50px)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            {invite.groom.name}
          </h2>
          <p
            className="text-xs mt-1"
            style={{ fontFamily: "var(--font-serif)", color: "var(--ink-muted)", fontStyle: "italic" }}
          >
            {lang === "ar" ? "نجل " : "S/O "}{invite.groom.parents.join(" & ")}
          </p>
          <p className="text-[10px] mt-0.5 tracking-widest" style={{ fontFamily: "var(--font-sans)", color: "var(--sage-mid)" }}>
            {invite.groom.place}
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade" delay={0.42}>
          <div className="leaf-divider mt-5" style={{ width: 180 }}>
            <span style={{ color: "var(--sage-soft)", fontSize: 13 }}>❧</span>
          </div>
        </ScrollReveal>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex flex-col items-center gap-1"
        style={{ color: "var(--ink-light)" }}
      >
        <span
          className="text-[8px] tracking-[0.3em]"
          style={{ fontFamily: "var(--font-sans)", textTransform: "uppercase" }}
        >
          Scroll
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
