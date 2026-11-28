"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

export default function Countdown({ lang }: Props) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

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
      className="snap-section px-5 py-14 pb-20"
      style={{ backgroundColor: "var(--bg-ivory)" }}
      aria-label="Countdown to wedding"
    >
      <div className="max-w-[300px] mx-auto flex flex-col gap-7 w-full">

        <ScrollReveal variant="up">
          <div className="flex flex-col items-center gap-1">
            <span className="section-label">{lang === "ar" ? "العد التنازلي" : "Counting Down"}</span>
            <p
              className="mt-1 text-center"
              style={{
                fontFamily: "var(--font-script)",
                fontSize: 32,
                color: "var(--sage-dark)",
              }}
            >
              {lang === "ar" ? "حتى يوم الفرح" : "Until the Big Day"}
            </p>
          </div>
        </ScrollReveal>

        {/* Countdown boxes */}
        <div className="grid grid-cols-4 gap-2.5">
          {boxes.map(({ val, label }, i) => (
            <ScrollReveal key={label} variant="springPop" delay={i * 0.08}>
              <div
                className="flex flex-col items-center justify-center rounded-2xl py-3.5 px-1"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--divider)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.16)",
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
                  className="mt-1.5"
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
        <ScrollReveal variant="fade" delay={0.28}>
          <div className="flex justify-center">
            <div
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full shadow-md"
              style={{
                background: "linear-gradient(90deg, var(--gold-warm), var(--gold-pale), var(--gold-warm))",
                backgroundSize: "200% 100%",
              }}
            >
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: "#1E2A1D", textTransform: "uppercase" }}>
                ✦ {lang === "ar" ? "احفظ التاريخ" : "Save the Date"} ✦
              </span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
