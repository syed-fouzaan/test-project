"use client";

import { motion } from "framer-motion";
import { buildShareUrl } from "@/lib/whatsapp";
import { invite } from "@/data/invite";

interface Props {
  lang: "en" | "ar";
  onToggleLang: () => void;
  scrollProgress: number;
}

export default function ShareBar({ lang, onToggleLang, scrollProgress }: Props) {
  function handleShare() {
    const url = buildShareUrl();
    if (navigator.share) {
      navigator.share({ title: invite.event.title, url });
    } else {
      navigator.clipboard.writeText(url);
    }
  }

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="no-print absolute bottom-0 inset-x-0 z-30 flex items-center justify-between px-4 py-3"
      style={{
        background:
          "linear-gradient(to top, rgba(251,248,242,0.98) 60%, rgba(251,248,242,0))",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Lang toggle */}
      <button
        type="button"
        onClick={onToggleLang}
        className="btn-ivory"
        aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
      >
        {lang === "en" ? "🇸🇦 عربي" : "🇬🇧 English"}
      </button>

      {/* Progress dot */}
      <div
        className="flex-1 mx-3 h-[2px] rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--divider)" }}
      >
        <div
          className="h-full rounded-full transition-[width] duration-150"
          style={{
            width: `${scrollProgress}%`,
            background: "linear-gradient(90deg, var(--sage-mid), var(--gold-warm))",
          }}
        />
      </div>

      {/* Share */}
      <button type="button" onClick={handleShare} className="btn-ivory" aria-label="Share invitation">
        🔗 {lang === "ar" ? "شارك" : "Share"}
      </button>
    </motion.div>
  );
}
