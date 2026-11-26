"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { buildShareUrl } from "@/lib/whatsapp";
import { invite } from "@/data/invite";

interface Props {
  onReplay: () => void;
  lang: "en" | "ar";
}

export default function Closing({ onReplay, lang }: Props) {
  const shareUrl = buildShareUrl();
  const [ameenCount, setAmeenCount] = useState(19);
  const [hearts, setHearts] = useState<number[]>([]);

  function sendAmeen() {
    setAmeenCount((c) => c + 1);
    const id = Date.now() + Math.random();
    setHearts((prev) => [...prev.slice(-6), id]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h !== id));
    }, 1100);
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: invite.event.title, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied!");
    }
  }

  return (
    <section
      id="closing"
      className="snap-section px-5 py-16 pb-24"
      style={{ backgroundColor: "var(--bg-linen)" }}
      aria-label="Closing"
    >
      <div className="max-w-xs mx-auto flex flex-col gap-8 items-center text-center">

        {/* Bismillah / Dua */}
        <ScrollReveal variant="up">
          <div
            className="invite-card flex flex-col items-center gap-4"
            style={{
              background: "linear-gradient(170deg, #3A5236 0%, #2D4029 100%)",
              color: "#FBF8F2",
              border: "1px solid rgba(178,139,69,0.35)",
            }}
          >
            <p
              lang="ar"
              dir="rtl"
              className="text-xl leading-loose"
              style={{ fontFamily: "var(--font-arabic)", color: "#DFC98A" }}
            >
              {invite.arabic.dua.arabic}
            </p>
            <div style={{ width: "100%", height: 1, backgroundColor: "rgba(178,139,69,0.25)" }} />
            <p
              className="text-xs italic"
              style={{ fontFamily: "var(--font-serif)", color: "rgba(251,248,242,0.75)", lineHeight: 1.7 }}
            >
              &ldquo;{invite.arabic.dua.translation}&rdquo;
            </p>
          </div>
        </ScrollReveal>

        {/* Closing text */}
        <ScrollReveal variant="fade" delay={0.1}>
          <div className="flex flex-col items-center gap-2">
            <p
              style={{
                fontFamily: "var(--font-script)",
                fontSize: 24,
                color: "var(--sage-dark)",
              }}
            >
              {lang === "ar" ? "مع تحيات" : "With warm regards,"}
            </p>
            <p
              className="text-sm text-center"
              style={{ fontFamily: "var(--font-serif)", color: "var(--ink-muted)", fontStyle: "italic", lineHeight: 1.7 }}
            >
              {invite.closing}
            </p>
          </div>
        </ScrollReveal>

        {/* Botanical flourish */}
        <ScrollReveal variant="scale" delay={0.15}>
          <svg viewBox="0 0 200 60" width="180" aria-hidden="true">
            <path d="M100 55 Q90 40 70 30 Q80 28 100 20 Q120 28 130 30 Q110 40 100 55 Z" fill="none" stroke="#7E9B78" strokeWidth="1" />
            <path d="M100 20 L100 2" stroke="#7E9B78" strokeWidth="0.8" />
            <path d="M100 35 Q88 30 82 24" stroke="#7E9B78" strokeWidth="0.6" fill="none" />
            <path d="M100 35 Q112 30 118 24" stroke="#7E9B78" strokeWidth="0.6" fill="none" />
            <circle cx="100" cy="2" r="1.5" fill="#B28B45" />
            <circle cx="82" cy="24" r="1" fill="#7E9B78" />
            <circle cx="118" cy="24" r="1" fill="#7E9B78" />
            <path d="M20 30 Q40 20 65 28" stroke="#C8D9C4" strokeWidth="0.8" fill="none" />
            <path d="M180 30 Q160 20 135 28" stroke="#C8D9C4" strokeWidth="0.8" fill="none" />
          </svg>
        </ScrollReveal>

        {/* Action buttons */}
        <ScrollReveal variant="up" delay={0.2}>
          <div className="no-print flex flex-col gap-3 w-full">
            <div className="relative flex justify-center">
              <AnimatePresence>
                {hearts.map((id) => (
                  <motion.span
                    key={id}
                    initial={{ opacity: 1, y: 0, scale: 0.7 }}
                    animate={{ opacity: 0, y: -64, scale: 1.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.95, ease: "easeOut" }}
                    className="absolute -top-2 pointer-events-none text-lg"
                    aria-hidden="true"
                  >
                    💛
                  </motion.span>
                ))}
              </AnimatePresence>
              <motion.button
                type="button"
                whileTap={{ scale: 0.93 }}
                onClick={sendAmeen}
                className="btn-ivory w-full"
              >
                🤲 &nbsp;{lang === "ar" ? "آمين" : "Tap to Say Ameen"} ({ameenCount})
              </motion.button>
            </div>
            <button type="button" onClick={handleShare} className="btn-sage">
              🔗 &nbsp;{lang === "ar" ? "مشاركة الدعوة" : "Share this Invite"}
            </button>
            <button type="button" onClick={() => window.print()} className="btn-ivory">
              🖨 &nbsp;{lang === "ar" ? "حفظ كملف PDF" : "Save as PDF / Print"}
            </button>
            <button type="button" onClick={onReplay} className="btn-ivory">
              ↺ &nbsp;{lang === "ar" ? "إعادة التشغيل" : "Replay from Start"}
            </button>
          </div>
        </ScrollReveal>

        {/* Footer */}
        <ScrollReveal variant="fade" delay={0.25}>
          <p
            className="text-[9px] tracking-widest text-center"
            style={{ fontFamily: "var(--font-sans)", color: "var(--ink-light)", textTransform: "uppercase" }}
          >
            ✦ 19 · XII · 2026 · Hubli ✦
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
