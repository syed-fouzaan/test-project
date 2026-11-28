"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface Props {
  lang: "en" | "ar";
}

interface PolaroidItem {
  id: string;
  title: string;
  titleAr: string;
  subtitle: string;
  caption: string;
  captionAr: string;
  icon: string;
  rotate: number;
  gradient: string;
}

const MEMORIES: PolaroidItem[] = [
  {
    id: "dua",
    title: "Written in the Heavens",
    titleAr: "مكتوب في السماء",
    subtitle: "Two Souls, One Path",
    caption: "And We created you in pairs — Quran 78:8. Two families united in faith, love, and gratitude.",
    captionAr: "وَخَلَقْنَاكُمْ أَزْوَاجًا — أسرتان تجتمعان على المودة والرحمة.",
    icon: "🌿",
    rotate: -1.5,
    gradient: "linear-gradient(145deg, rgba(58,82,54,0.65) 0%, rgba(36,55,34,0.9) 100%)",
  },
  {
    id: "date",
    title: "19 December 2026",
    titleAr: "١٩ ديسمبر ٢٠٢٦",
    subtitle: "Arsh Garden, Hubli",
    caption: "A winter morning of duas, warm smiles, and celebration with everyone we hold dear.",
    captionAr: "صباح شتوي مليء بالدعاء والابتسامات والاحتفال مع الأحبة.",
    icon: "🕌",
    rotate: 1.5,
    gradient: "linear-gradient(145deg, rgba(45,66,43,0.8) 0%, rgba(178,139,69,0.28) 100%)",
  },
  {
    id: "blessing",
    title: "Together Forever",
    titleAr: "معاً إلى الأبد",
    subtitle: "Insha'Allah",
    caption: "Your presence and heartfelt duas are the greatest gift on our Nikah day.",
    captionAr: "حضوركم ودعاؤكم الصادق هو أجمل هدية في يوم زفافنا.",
    icon: "🤍",
    rotate: -1,
    gradient: "linear-gradient(145deg, rgba(32,49,30,0.85) 0%, rgba(58,82,54,0.6) 100%)",
  },
];

function PolaroidCard({ item, lang, index }: { item: PolaroidItem; lang: "en" | "ar"; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <ScrollReveal variant="up" delay={index * 0.1}>
      <div
        className="w-full cursor-pointer select-none"
        style={{ perspective: "1000px" }}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        aria-pressed={flipped}
        aria-label={`${item.title} — tap to flip card`}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0, rotateZ: flipped ? 0 : item.rotate }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[186px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front Face (Polaroid — dark & light adaptive contrast) */}
          <div
            className="absolute inset-0 rounded-2xl p-3 pb-4 flex flex-col justify-between shadow-lg"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--divider)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <div
              className="w-full h-[112px] rounded-xl flex flex-col items-center justify-center gap-1.5"
              style={{
                background: item.gradient,
                border: "1px solid var(--divider)",
              }}
            >
              <span className="text-3xl" aria-hidden="true">{item.icon}</span>
              <span
                className="text-[10px] font-semibold tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-sans)", color: "#DFC98A" }}
              >
                {item.subtitle}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2.5 px-1">
              <p
                style={{
                  fontFamily: lang === "ar" ? "var(--font-arabic)" : "var(--font-script)",
                  fontSize: lang === "ar" ? 16 : 24,
                  color: "var(--ink-dark)",
                  lineHeight: 1.15,
                }}
              >
                {lang === "ar" ? item.titleAr : item.title}
              </p>
              <span
                className="text-[9px] font-medium tracking-wider uppercase"
                style={{ fontFamily: "var(--font-sans)", color: "var(--sage-dark)" }}
              >
                {lang === "ar" ? "اقلب ↺" : "Tap ↺"}
              </span>
            </div>
          </div>

          {/* Back Face (Caption) */}
          <div
            className="absolute inset-0 rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-2.5 shadow-md"
            style={{
              background: "linear-gradient(160deg, #3A5236 0%, #2D4029 100%)",
              color: "#FBF8F2",
              border: "1px solid rgba(223,201,138,0.45)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <span className="text-xl" aria-hidden="true">{item.icon}</span>
            <p
              className="text-xs italic leading-relaxed"
              style={{ fontFamily: lang === "ar" ? "var(--font-arabic)" : "var(--font-serif)", color: "#FBF8F2" }}
            >
              &ldquo;{lang === "ar" ? item.captionAr : item.caption}&rdquo;
            </p>
            <span
              className="text-[8px] tracking-[0.2em] uppercase mt-1"
              style={{ fontFamily: "var(--font-sans)", color: "#DFC98A" }}
            >
              {lang === "ar" ? "اضغط للعودة" : "Tap to flip back"}
            </span>
          </div>
        </motion.div>
      </div>
    </ScrollReveal>
  );
}

export default function Memories({ lang }: Props) {
  return (
    <section
      id="memories"
      className="snap-section px-5 py-14 pb-20"
      style={{ backgroundColor: "var(--bg-linen)" }}
      aria-label="Keepsake memories"
    >
      <div className="max-w-xs mx-auto flex flex-col gap-5 w-full">
        <ScrollReveal variant="up">
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="section-label">
              {lang === "ar" ? "ذكرياتنا" : "Our Story"}
            </span>
            <p
              className="mt-1"
              style={{ fontFamily: "var(--font-script)", fontSize: 30, color: "var(--sage-dark)" }}
            >
              {lang === "ar" ? "رحلة مباركة" : "Moments & Duas"}
            </p>
            <p
              className="text-xs italic"
              style={{ fontFamily: "var(--font-serif)", color: "var(--ink-muted)" }}
            >
              {lang === "ar" ? "اضغط على أي بطاقة لقراءة الرسالة" : "Tap any keepsake card to flip"}
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-4">
          {MEMORIES.map((item, i) => (
            <PolaroidCard key={item.id} item={item} lang={lang} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
