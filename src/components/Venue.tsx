"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { animate } from "animejs";
import ScrollReveal from "./ScrollReveal";
import { invite } from "@/data/invite";

interface Props { lang: "en" | "ar" }

function MosqueSilhouette() {
  return (
    <svg viewBox="0 0 320 90" width="100%" className="opacity-15" aria-hidden="true">
      <path
        d="M0 90 L0 60 L30 60 L30 50 L45 50 L45 60 L60 60 L60 45 Q80 10 100 45 L100 60 L115 60 L115 50 L130 50 L130 60 L145 60 L145 45 Q160 5 175 45 L175 60 L190 60 L190 50 L205 50 L205 60 L220 60 L220 45 Q240 10 260 45 L260 60 L275 60 L275 50 L290 50 L290 60 L320 60 L320 90 Z"
        fill="#3A5236"
      />
      <circle cx="100" cy="38" r="8" fill="none" stroke="#3A5236" strokeWidth="2" />
      <circle cx="175" cy="34" r="10" fill="none" stroke="#3A5236" strokeWidth="2" />
      <circle cx="250" cy="38" r="8" fill="none" stroke="#3A5236" strokeWidth="2" />
    </svg>
  );
}

export default function Venue({ lang }: Props) {
  const [copied, setCopied] = useState(false);
  const mosqueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mosqueRef.current;
    if (!el) return;
    const paths = Array.from(el.querySelectorAll("path, circle")) as HTMLElement[];
    if (paths.length === 0) return;
    animate(paths, {
      opacity: [0, 1],
      duration: 1000,
      delay: (_, i) => (i ?? 0) * 80,
      easing: "easeOutQuad",
    });
  }, []);

  function copyAddress() {
    navigator.clipboard
      .writeText(`${invite.event.venue.name}, ${invite.event.venue.address}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  }

  return (
    <section
      id="venue"
      className="snap-section px-5 py-14"
      style={{ backgroundColor: "var(--bg-linen)" }}
      aria-label="Wedding venue"
    >
      <div className="max-w-xs mx-auto flex flex-col gap-6">

        <ScrollReveal variant="up">
          <div className="flex flex-col items-center gap-1">
            <span className="section-label">{lang === "ar" ? "مكان الحفل" : "Venue"}</span>
            <p
              className="mt-2 text-center"
              style={{ fontFamily: "var(--font-script)", fontSize: 32, color: "var(--sage-dark)" }}
            >
              {invite.event.venue.name}
            </p>
            <p
              className="text-sm text-center"
              style={{ fontFamily: "var(--font-serif)", color: "var(--ink-muted)", fontStyle: "italic" }}
            >
              {invite.event.venue.address}
            </p>
          </div>
        </ScrollReveal>

        {/* Mosque silhouette */}
        <ScrollReveal variant="fade" delay={0.08}>
          <div ref={mosqueRef}>
            <MosqueSilhouette />
          </div>
        </ScrollReveal>

        {/* Map card */}
        <ScrollReveal variant="scale" delay={0.14}>
          <div className="invite-card overflow-hidden p-0">
            {/* Illustrated map */}
            <div
              className="relative w-full"
              style={{
                height: 160,
                background: "linear-gradient(135deg, #C8D9C4 0%, #EDE1CC 100%)",
              }}
            >
              <svg className="absolute inset-0 w-full h-full opacity-25" aria-hidden="true">
                <defs>
                  <pattern id="map-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#3A5236" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />
              </svg>
              {/* Road lines */}
              <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.6)" strokeWidth="6" />
                <line x1="160" y1="0" x2="160" y2="160" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />
              </svg>
              {/* Pin with pulsing radar rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 2.2], opacity: [0.55, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute w-12 h-12 rounded-full pointer-events-none"
                  style={{ border: "2px solid #3A5236" }}
                />
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  whileTap={{ scale: 1.25 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex flex-col items-center cursor-pointer"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg text-xl"
                    style={{ backgroundColor: "var(--sage-dark)", color: "white" }}
                  >
                    📍
                  </div>
                  <div
                    className="mt-1.5 px-3 py-1 rounded-lg"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.92)",
                      border: "1px solid var(--divider)",
                    }}
                  >
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 600, color: "#1E2A1D" }}>
                      {invite.event.venue.name}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-2.5">
              <a
                href={invite.event.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sage text-center no-underline"
              >
                🗺 &nbsp;{lang === "ar" ? "عرض على خرائط جوجل" : "Open in Google Maps"}
              </a>
              <button type="button" onClick={copyAddress} className="btn-ivory">
                {copied ? "✓ Copied!" : `📋 ${lang === "ar" ? "نسخ العنوان" : "Copy Address"}`}
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
