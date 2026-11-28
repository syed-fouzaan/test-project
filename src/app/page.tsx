"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import BismillahIntro from "@/components/BismillahIntro";
import Gate from "@/components/Gate";
import CoupleNames from "@/components/CoupleNames";
import Families from "@/components/Families";
import DateTime from "@/components/DateTime";
import Countdown from "@/components/Countdown";
import Venue from "@/components/Venue";
import Memories from "@/components/Memories";
import DuaWall from "@/components/DuaWall";
import Closing from "@/components/Closing";
import ShareBar from "@/components/ShareBar";
import SectionDots, { SectionItem } from "@/components/SectionDots";
import BotanicalDivider from "@/components/ornaments/BotanicalDivider";
import { ScrollChapter } from "@/components/ScrollReveal";
import TapSparkles from "@/components/TapSparkles";
import { startAmbientSound, stopAmbientSound } from "@/lib/ambientAudio";

const SECTIONS: SectionItem[] = [
  { id: "hero", label: "Couple" },
  { id: "date", label: "Date" },
  { id: "countdown", label: "Countdown" },
  { id: "venue", label: "Venue" },
  { id: "families", label: "Families" },
  { id: "memories", label: "Memories" },
  { id: "duas", label: "Duas" },
  { id: "closing", label: "Closing" },
];

function sanitizeName(raw: string | null): string | undefined {
  if (!raw) return undefined;
  return raw.replace(/[<>&"']/g, "").replace(/[\x00-\x1F\x7F]/g, "").trim().slice(0, 40) || undefined;
}

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [recipientName, setRecipientName] = useState<string | undefined>();
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [theme, setTheme] = useState<"day" | "night">("night");
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const audioStartedRef = useRef(false);

  function ensureAudioPlaying() {
    if (audioStartedRef.current) return;
    if (startAmbientSound()) {
      audioStartedRef.current = true;
    }
  }

  useEffect(() => {
    const skipped = sessionStorage.getItem("gate-opened");
    const params = new URLSearchParams(window.location.search);
    if (skipped === "1" || params.get("skip") === "1") {
      setIntroDone(true);
      setGateOpen(true);
      if (params.get("skip") === "1") sessionStorage.setItem("gate-opened", "1");
    }
    setRecipientName(sanitizeName(params.get("to")));

    // Ensure ambient song starts looping on first user interaction anywhere if gate was skipped
    const unlockOnGesture = () => {
      ensureAudioPlaying();
    };
    window.addEventListener("pointerdown", unlockOnGesture, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockOnGesture);
      stopAmbientSound();
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      setScrollProgress(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  function handleGateOpen() {
    ensureAudioPlaying();
    setGateOpen(true);
    sessionStorage.setItem("gate-opened", "1");
  }

  function handleReplay() {
    sessionStorage.removeItem("gate-opened");
    scrollRef.current?.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setScrollProgress(0);
    setGateOpen(false);
    setIntroDone(false);
  }

  return (
    <div
      data-theme={theme}
      className="relative w-full h-[100dvh] overflow-hidden flex items-center justify-center transition-colors duration-500"
      style={{ backgroundColor: "var(--bg-outer)" }}
    >
      <AnimatePresence>
        {!introDone && (
          <BismillahIntro
            onComplete={() => {
              ensureAudioPlaying();
              setIntroDone(true);
            }}
          />
        )}
      </AnimatePresence>

      {introDone && !gateOpen && (
        <Gate onOpen={handleGateOpen} onStartAudio={ensureAudioPlaying} />
      )}

      {/* Phone frame */}
      <div
        ref={frameRef}
        className="relative w-full max-w-[430px] h-[100dvh] mx-auto overflow-hidden shadow-2xl transition-colors duration-500"
        style={{
          backgroundColor: "var(--bg-ivory)",
          borderLeft: "1px solid rgba(223,201,138,0.2)",
          borderRight: "1px solid rgba(223,201,138,0.2)",
        }}
      >
        <TapSparkles containerRef={frameRef} />
        {/* Scroll progress bar */}
        {gateOpen && (
          <div className="no-print absolute top-0 inset-x-0 h-[2px] z-40 pointer-events-none" style={{ backgroundColor: "rgba(223,201,138,0.12)" }}>
            <div
              className="h-full transition-[width] duration-100"
              style={{
                width: `${scrollProgress}%`,
                background: "linear-gradient(90deg, var(--sage-mid), var(--gold-warm))",
              }}
            />
          </div>
        )}

        {/* Top-right Theme & Back-to-Top micro controls */}
        {gateOpen && (
          <div className="no-print absolute top-3 right-3 z-40 flex items-center gap-1.5">
            {scrollProgress > 18 && (
              <button
                type="button"
                onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Scroll back to top"
                title="Back to top"
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm cursor-pointer transition-transform active:scale-90"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--divider)",
                  color: "var(--sage-dark)",
                }}
              >
                ↑
              </button>
            )}
            <button
              type="button"
              onClick={() => setTheme((t) => (t === "day" ? "night" : "day"))}
              aria-label={theme === "day" ? "Switch to Emerald Night theme" : "Switch to Ivory Day theme"}
              title={theme === "day" ? "Emerald Night theme" : "Ivory Day theme"}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-sm cursor-pointer transition-transform active:scale-90"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--divider)",
                color: "var(--ink-dark)",
              }}
            >
              {theme === "day" ? "🌙" : "☀️"}
            </button>
          </div>
        )}

        {/* Section dots navigator */}
        {gateOpen && <SectionDots sections={SECTIONS} scrollContainer={scrollRef} />}

        {/* Main scrollable content (pr-7 ensures SectionDots never overlaps cards on mobile) */}
        <main
          ref={scrollRef}
          className="invite-scroll pr-7"
          id="main-content"
          aria-label="Wedding invitation"
        >
          <CoupleNames
            recipientName={recipientName}
            lang={lang}
            scrollContainer={scrollRef}
          />
          <BotanicalDivider bg="var(--bg-linen)" />
          <ScrollChapter scrollContainer={scrollRef}><DateTime lang={lang} /></ScrollChapter>
          <BotanicalDivider bg="var(--bg-ivory)" />
          <ScrollChapter scrollContainer={scrollRef}><Countdown lang={lang} /></ScrollChapter>
          <BotanicalDivider bg="var(--bg-linen)" />
          <ScrollChapter scrollContainer={scrollRef}><Venue lang={lang} /></ScrollChapter>
          <BotanicalDivider bg="var(--bg-ivory)" />
          <ScrollChapter scrollContainer={scrollRef}><Families lang={lang} /></ScrollChapter>
          <BotanicalDivider bg="var(--bg-linen)" />
          <ScrollChapter scrollContainer={scrollRef}><Memories lang={lang} /></ScrollChapter>
          <BotanicalDivider bg="var(--bg-ivory)" />
          <ScrollChapter scrollContainer={scrollRef}><DuaWall lang={lang} /></ScrollChapter>
          <BotanicalDivider bg="var(--bg-linen)" />
          <ScrollChapter scrollContainer={scrollRef}><Closing onReplay={handleReplay} lang={lang} /></ScrollChapter>
        </main>

        {/* Floating bottom bar */}
        {gateOpen && (
          <ShareBar
            lang={lang}
            onToggleLang={() => setLang((p) => (p === "en" ? "ar" : "en"))}
            scrollProgress={scrollProgress}
          />
        )}
      </div>
    </div>
  );
}
