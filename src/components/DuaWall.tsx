"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface Props {
  lang: "en" | "ar";
}

interface Wish {
  id: string;
  name: string;
  text: string;
  time: string;
}

const INITIAL_WISHES: Wish[] = [
  {
    id: "seed-1",
    name: "Manchankoppa Family",
    text: "BarakAllahu Lakuma wa Baraka Alaikuma — wishing you a lifetime of barakah & sakinah.",
    time: "Blessed",
  },
  {
    id: "seed-2",
    name: "Gouli Family",
    text: "May Allah unite your hearts in faith, love, and endless mercy.",
    time: "Ameen",
  },
];

const QUICK_DUAS = [
  "BarakAllahu Lakuma 🤲",
  "Masha'Allah, Mubarak! 🌿",
  "May Allah bless your union ✨",
];

const STORAGE_KEY = "nikah-dua-wall-v1";

export default function DuaWall({ lang }: Props) {
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [justPosted, setJustPosted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Wish[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishes(parsed);
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  function addWish(e: React.FormEvent) {
    e.preventDefault();
    const cleanText = text.trim();
    if (!cleanText) return;
    const cleanName = name.trim() || (lang === "ar" ? "ضيف كريم" : "Well-wisher");
    const newWish: Wish = {
      id: `${Date.now()}`,
      name: cleanName.slice(0, 32),
      text: cleanText.slice(0, 140),
      time: lang === "ar" ? "الآن" : "Just now",
    };
    const next = [newWish, ...wishes].slice(0, 12);
    setWishes(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    setText("");
    setJustPosted(true);
    setTimeout(() => setJustPosted(false), 2400);
  }

  return (
    <section
      id="duas"
      className="snap-section px-5 py-14"
      style={{ backgroundColor: "var(--bg-ivory)" }}
      aria-label="Duas and Blessings Wall"
    >
      <div className="max-w-xs mx-auto flex flex-col gap-5 w-full">
        <ScrollReveal variant="up">
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="section-label">
              {lang === "ar" ? "سجل الدعوات" : "Blessings Wall"}
            </span>
            <p
              className="mt-1"
              style={{ fontFamily: "var(--font-script)", fontSize: 30, color: "var(--sage-dark)" }}
            >
              {lang === "ar" ? "اترك دعوة للعروسين" : "Leave a Dua"}
            </p>
          </div>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal variant="up" delay={0.08}>
          <form onSubmit={addWish} className="invite-card flex flex-col gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === "ar" ? "اسمك..." : "Your name..."}
              maxLength={32}
              className="w-full rounded-xl px-3.5 py-2 text-xs"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--ink-dark)",
                backgroundColor: "var(--bg-linen)",
                border: "1px solid var(--divider)",
                outline: "none",
              }}
            />

            {/* Quick dua chips */}
            <div className="flex flex-wrap gap-1.5">
              {QUICK_DUAS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setText(q)}
                  className="px-2.5 py-1 rounded-full text-[10px] cursor-pointer transition-transform active:scale-95"
                  style={{
                    backgroundColor: "var(--bg-linen)",
                    color: "var(--sage-dark)",
                    border: "1px solid var(--divider)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            <textarea
              rows={2}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={lang === "ar" ? "اكتب دعاءك أو تهنئتك..." : "Write a heartfelt dua or blessing..."}
              maxLength={140}
              className="w-full rounded-xl px-3.5 py-2 text-xs resize-none"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--ink-dark)",
                backgroundColor: "var(--bg-linen)",
                border: "1px solid var(--divider)",
                outline: "none",
              }}
            />

            <button type="submit" className="btn-sage w-full">
              {justPosted
                ? (lang === "ar" ? "✓ تم إرسال الدعاء" : "✓ Ameen — Dua Posted!")
                : (lang === "ar" ? "🤲 إرسال الدعاء" : "🤲 Post Blessing")}
            </button>
          </form>
        </ScrollReveal>

        {/* Wishes list */}
        <div className="flex flex-col gap-2.5 max-h-[220px] overflow-y-auto pr-0.5">
          <AnimatePresence initial={false}>
            {wishes.map((w) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl px-4 py-3"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--divider)",
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-[11px] font-semibold"
                    style={{ fontFamily: "var(--font-sans)", color: "var(--sage-dark)" }}
                  >
                    {w.name}
                  </span>
                  <span
                    className="text-[9px]"
                    style={{ fontFamily: "var(--font-sans)", color: "var(--ink-light)" }}
                  >
                    {w.time}
                  </span>
                </div>
                <p
                  className="text-xs italic leading-relaxed"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--ink-muted)" }}
                >
                  &ldquo;{w.text}&rdquo;
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
