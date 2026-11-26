"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface Props { lang: "en" | "ar" }

const TARGET = new Date("2026-12-19T11:45:00+05:30");

function pad(n: number) { return String(n).padStart(2, "0"); }

function getTimeLeft() {
  const diff = Math.max(0, TARGET.getTime() - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

const TIMELINE = [
  { time: "11:45 AM", label: "Nikah Ceremony", icon: "🕌", note: "Sunnah Nikah at Arsh Garden main pavilion — please join 15 mins early." },
  { time: "12:15 PM", label: "Qur'an Recitation & Dua", icon: "📖", note: "Blessed recitation & collective dua for the newlyweds." },
  { time: "01:00 PM", label: "Dawat-e-Nikah (Lunch)", icon: "🍽️", note: "Warm hospitality & traditional feast served for all guests." },
  { time: "02:30 PM", label: "Mubarak & Duas", icon: "🌸", note: "Meet the families, share blessings, and capture memories." },
];

export default function Countdown({ lang }: Props) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const boxes = [
    { val: pad(time.d), label: lang === "ar" ? "أيام" : "Days" },
    { val: pad(time.h), label: lang === "ar" ? "ساعات" : "Hours" },
    { val: pad(time.m), label: lang === "ar" ? "دقائق" : "Mins" },
    { val: pad(time.s), label: lang === "ar" ? "ثوانٍ" : "Secs" },
  ];

  return (
    <section
      id="countdown"
      className="snap-section px-5 py-14"
      style={{ backgroundColor: "var(--bg-ivory)" }}
      aria-label="Countdown to wedding"
    >
      <div className="max-w-xs mx-auto flex flex-col gap-6">

        <ScrollReveal variant="up">
          <div className="flex flex-col items-center gap-1">
            <span className="section-label">{lang === "ar" ? "العد التنازلي" : "Counting Down"}</span>
            <p
              className="mt-1 text-center"
              style={{
                fontFamily: "var(--font-script)",
                fontSize: 28,
                color: "var(--sage-dark)",
              }}
            >
              {lang === "ar" ? "حتى يوم الفرح" : "Until the Big Day"}
            </p>
          </div>
        </ScrollReveal>

        {/* Countdown boxes */}
        <div className="grid grid-cols-4 gap-2">
          {boxes.map(({ val, label }, i) => (
            <ScrollReveal key={label} variant="scale" delay={i * 0.08}>
              <div
                className="flex flex-col items-center justify-center rounded-2xl py-3 px-1"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--divider)",
                  boxShadow: "0 4px 16px rgba(31,41,30,0.06)",
                }}
              >
                <motion.span
                  key={val}
                  initial={{ opacity: 0.4, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 32,
                    fontWeight: 700,
                    color: "var(--ink-dark)",
                    lineHeight: 1,
                    display: "block",
                  }}
                >
                  {val}
                </motion.span>
                <span
                  className="mt-1"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 8,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--ink-light)",
                  }}
                >
                  {label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Save the date pill */}
        <ScrollReveal variant="fade" delay={0.3}>
          <div className="flex justify-center">
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
              style={{
                background: "linear-gradient(90deg, var(--gold-warm), var(--gold-pale), var(--gold-warm))",
                backgroundSize: "200% 100%",
              }}
            >
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#1E2A1D", textTransform: "uppercase" }}>
                ✦ Save the Date ✦
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Swipeable Programme Timeline */}
        <ScrollReveal variant="up" delay={0.22}>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="section-label">
                {lang === "ar" ? "برنامج اليوم" : "Day Programme"}
              </span>
              <span
                className="text-[9px] tracking-wider"
                style={{ fontFamily: "var(--font-sans)", color: "var(--ink-light)" }}
              >
                {lang === "ar" ? "اسحب لليمين ←" : "Swipe →"}
              </span>
            </div>

            <div className="timeline-strip px-1" role="region" aria-label="Day programme timeline">
              {TIMELINE.map(({ time: t, label, icon }, i) => {
                const isSelected = selectedIdx === i;
                return (
                  <motion.button
                    key={t}
                    type="button"
                    onClick={() => setSelectedIdx(isSelected ? null : i)}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.45 }}
                    className="snap-center shrink-0 w-[156px] rounded-2xl p-3.5 flex flex-col justify-between gap-3 cursor-pointer text-left"
                    style={{
                      background: "var(--bg-card)",
                      border: isSelected ? "1.5px solid var(--gold-warm)" : "1px solid var(--divider)",
                      boxShadow: isSelected
                        ? "0 8px 24px rgba(178,139,69,0.22)"
                        : "0 6px 20px rgba(0,0,0,0.14)",
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-2xl" aria-hidden="true">{icon}</span>
                      <span
                        className="px-2 py-0.5 rounded-full text-[9px] font-semibold"
                        style={{
                          backgroundColor: "var(--bg-linen)",
                          color: "var(--sage-dark)",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {t}
                      </span>
                    </div>
                    <p
                      className="text-sm leading-snug"
                      style={{ fontFamily: "var(--font-serif)", color: "var(--ink-dark)", fontWeight: 600 }}
                    >
                      {label}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Interactive programme detail card */}
            <AnimatePresence mode="wait">
              {selectedIdx !== null && TIMELINE[selectedIdx] && (
                <motion.div
                  key={selectedIdx}
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-xl px-3.5 py-2.5 text-xs"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--divider)",
                    color: "var(--ink-muted)",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  <strong style={{ color: "var(--sage-dark)" }}>{TIMELINE[selectedIdx].time}:</strong>{" "}
                  {TIMELINE[selectedIdx].note}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
