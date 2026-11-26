"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animate, stagger } from "animejs";
import ScrollReveal from "./ScrollReveal";
import { buildGoogleCalendarUrl, buildIcsDataUrl } from "@/lib/ics";
import { invite } from "@/data/invite";

interface Props { lang: "en" | "ar" }

function ScratchCard({ onReveal }: { onReveal: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [pct, setPct] = useState(0);
  const drawing = useRef(false);
  const revealFired = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill scratch layer
    ctx.fillStyle = "#3A5236";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw scratchy texture
    for (let i = 0; i < 80; i++) {
      ctx.strokeStyle = `rgba(90,120,80,${0.3 + Math.random() * 0.4})`;
      ctx.lineWidth = 1 + Math.random() * 2;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // "Scratch to Reveal" text
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.font = "bold 12px DM Sans, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("✦ Scratch to Reveal ✦", canvas.width / 2, canvas.height / 2 - 8);
    ctx.font = "10px DM Sans, system-ui";
    ctx.fillStyle = "rgba(201,176,138,0.9)";
    ctx.fillText("the wedding date", canvas.width / 2, canvas.height / 2 + 10);
  }, []);

  function getPos(e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function scratch(e: React.MouseEvent | React.TouchEvent) {
    if (revealed || !drawing.current) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const { x, y } = getPos(e, canvas);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Check coverage
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] === 0) cleared++;
    const p = Math.round((cleared / (canvas.width * canvas.height)) * 100);
    setPct(p);
    if (p > 55 && !revealFired.current) {
      revealFired.current = true;
      setRevealed(true);
      onReveal();
    }
  }

  return (
    <div className="relative w-full" style={{ aspectRatio: "2.4 / 1" }}>
      {/* Revealed layer underneath (explicit dark ink on gold foil for crisp readability) */}
      <div
        className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #EDE1CC 0%, #DFC98A 50%, #EDE1CC 100%)",
          border: "1px solid rgba(178,139,69,0.5)",
        }}
      >
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", color: "#3A5236", textTransform: "uppercase", marginBottom: 4 }}>
          Date Revealed ✦
        </span>
        <p style={{ fontFamily: "var(--font-script)", fontSize: 34, color: "#1E2A1D", lineHeight: 1 }}>
          19 December
        </p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, color: "#3A5236", letterSpacing: "0.14em", marginTop: 3 }}>
          2026 • 9 RAJAB 1448 AH
        </p>
      </div>

      {/* Scratch canvas */}
      <canvas
        ref={canvasRef}
        width={360}
        height={150}
        className="absolute inset-0 w-full h-full rounded-2xl touch-none"
        style={{
          cursor: revealed ? "default" : "crosshair",
          borderRadius: 16,
          opacity: revealed ? 0 : 1,
          transition: revealed ? "opacity 0.6s ease" : "none",
        }}
        onMouseDown={() => { drawing.current = true; }}
        onMouseUp={() => { drawing.current = false; }}
        onMouseLeave={() => { drawing.current = false; }}
        onMouseMove={scratch}
        onTouchStart={(e) => { e.preventDefault(); drawing.current = true; scratch(e); }}
        onTouchEnd={() => { drawing.current = false; }}
        onTouchMove={(e) => { e.preventDefault(); scratch(e); }}
        aria-label="Scratch card — scratch to reveal the wedding date"
      />

      {/* Progress hint */}
      {!revealed && pct > 5 && pct < 55 && (
        <div className="absolute bottom-2 right-3 text-[8px]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sans)" }}>
          {pct}% revealed
        </div>
      )}
    </div>
  );
}

function Confetti({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const dots = Array.from({ length: 24 }, (_, i) => {
      const d = document.createElement("div");
      d.style.cssText = `position:absolute;width:6px;height:6px;border-radius:50%;pointer-events:none;z-index:50;top:50%;left:50%;transform:translate(-50%,-50%)`;
      d.style.backgroundColor = ["#B28B45","#7E9B78","#EDE1CC","#3A5236","#DFC98A"][i % 5];
      el.appendChild(d);
      return d;
    });

    animate(dots, {
      translateX: () => (Math.random() - 0.5) * 280,
      translateY: () => -80 - Math.random() * 160,
      opacity: [1, 0],
      scale: [1, 0],
      duration: 900,
      delay: stagger(30),
      easing: "easeOutQuad",
    });

    const timer = setTimeout(() => dots.forEach((d) => d.remove()), 1200);
    return () => { clearTimeout(timer); dots.forEach((d) => d.remove()); };
  }, [containerRef]);
  return null;
}

export default function DateTime({ lang }: Props) {
  const [scratched, setScratched] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calUrl = buildGoogleCalendarUrl(invite.event);
  const icsUrl = buildIcsDataUrl(invite.event);

  function handleReveal() {
    setScratched(true);
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 3200);
  }

  return (
    <section
      id="date"
      className="snap-section relative px-5 py-14"
      style={{ backgroundColor: "var(--bg-linen)" }}
      aria-label="Wedding date and time"
    >
      {/* Masha'Allah Celebration Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[400px] px-4 py-3 rounded-2xl text-center shadow-xl pointer-events-none"
            style={{
              background: "linear-gradient(135deg, #3A5236 0%, #2D4029 100%)",
              border: "1px solid rgba(223,201,138,0.6)",
            }}
          >
            <p className="text-sm font-semibold" style={{ color: "#DFC98A", fontFamily: "var(--font-arabic)" }}>
              ما شاء الله • Masha&apos;Allah
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: "#FBF8F2", fontFamily: "var(--font-sans)" }}>
              19 December 2026 — Save the Date!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-xs mx-auto flex flex-col gap-6 w-full">

        <ScrollReveal variant="up" delay={0}>
          <div className="flex flex-col items-center gap-1">
            <span className="section-label">{lang === "ar" ? "التاريخ والوقت" : "Date & Time"}</span>
            <div className="leaf-divider mt-1" style={{ width: 160 }}>
              <span style={{ color: "var(--sage-soft)", fontSize: 12 }}>✦</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Scratch card */}
        <ScrollReveal variant="scale" delay={0.1}>
          <div ref={containerRef} className="relative">
            {scratched && <Confetti containerRef={containerRef} />}
            <ScratchCard onReveal={handleReveal} />
          </div>
        </ScrollReveal>

        {/* Date details */}
        <AnimatePresence>
          {scratched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="invite-card flex flex-col gap-3"
              >
                {[
                  { icon: "📅", label: lang === "ar" ? "التاريخ" : "Date", value: "Saturday, 19 December 2026" },
                  { icon: "🌙", label: lang === "ar" ? "التاريخ الهجري" : "Hijri Date", value: "9 Rajab 1448 AH (Insha'Allah)" },
                  { icon: "🕌", label: lang === "ar" ? "الوقت" : "Nikah Time", value: "11:45 AM onwards" },
                  { icon: "🌿", label: lang === "ar" ? "المكان" : "Venue", value: `${invite.event.venue.name}, ${invite.event.venue.address}` },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">{icon}</span>
                    <div>
                      <p className="section-label">{label}</p>
                      <p className="text-sm mt-0.5" style={{ fontFamily: "var(--font-serif)", color: "var(--ink-dark)", lineHeight: 1.4 }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Calendar buttons */}
        <ScrollReveal variant="up" delay={0.18}>
          <div className="flex flex-col gap-3">
            <a href={calUrl} target="_blank" rel="noopener noreferrer" className="btn-sage text-center no-underline">
              📅 &nbsp;{lang === "ar" ? "أضف إلى التقويم" : "Add to Google Calendar"}
            </a>
            <a href={icsUrl} download="nikah-zeba-yasin.ics" className="btn-ivory text-center no-underline">
              ⬇︎ &nbsp;{lang === "ar" ? "تحميل ملف ICS" : "Download .ics File"}
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
