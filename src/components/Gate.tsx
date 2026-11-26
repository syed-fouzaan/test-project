"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface GateProps {
  onOpen: () => void;
  onStartAudio?: () => void;
}

function BotanicalLeaf({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 90"
      fill="none"
      className="absolute opacity-20 pointer-events-none"
      style={{
        width: 60,
        height: 90,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
      aria-hidden="true"
    >
      <path
        d="M30 85 Q28 60 10 45 Q28 48 30 20 Q32 48 50 45 Q32 60 30 85 Z"
        fill="#DFC98A"
      />
      <line x1="30" y1="85" x2="30" y2="20" stroke="#7E9B78" strokeWidth="0.8" />
    </svg>
  );
}

function DoorPanel({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: isLeft
          ? "linear-gradient(145deg, #243822 0%, #192718 55%, #101A0F 100%)"
          : "linear-gradient(215deg, #243822 0%, #192718 55%, #101A0F 100%)",
        borderRight: isLeft ? "2px solid rgba(223,201,138,0.55)" : "none",
        borderLeft: isLeft ? "none" : "2px solid rgba(223,201,138,0.55)",
        boxShadow: isLeft
          ? "inset -10px 0 28px rgba(0,0,0,0.45)"
          : "inset 10px 0 28px rgba(0,0,0,0.45)",
      }}
    >
      <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true">
        <defs>
          <pattern id={`tile-${side}`} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M20 15 Q32 5 42 20 Q28 28 20 15 Z" fill="#3A5236" />
            <line x1="20" y1="15" x2="40" y2="20" stroke="#DFC98A" strokeWidth="0.6" />
            <path d="M55 50 Q66 40 72 55 Q59 62 55 50 Z" fill="#2D4429" />
            <line x1="55" y1="50" x2="70" y2="55" stroke="#DFC98A" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#tile-${side})`} />
      </svg>
      <div className="absolute inset-4 rounded-lg opacity-25" style={{ border: "1px solid rgba(223,201,138,0.45)" }} />
      <div className="absolute inset-8 rounded opacity-15" style={{ border: "1px solid rgba(223,201,138,0.35)" }} />
      <div style={{ position: "absolute", top: 20, left: isLeft ? "auto" : 20, right: isLeft ? 20 : "auto" }}>
        <BotanicalLeaf flip={!isLeft} />
      </div>
      <div style={{ position: "absolute", bottom: 40, left: isLeft ? 20 : "auto", right: isLeft ? "auto" : 20 }}>
        <BotanicalLeaf flip={isLeft} />
      </div>
    </div>
  );
}

export default function Gate({ onOpen, onStartAudio }: GateProps) {
  const [opening, setOpening] = useState(false);

  function handleOpen() {
    if (opening) return;
    onStartAudio?.();
    setOpening(true);
    setTimeout(onOpen, 1150);
  }

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={
        opening
          ? { opacity: 0, scale: 2.6 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--bg-outer)", transformOrigin: "50% 50%" }}
    >
      <div
        className="relative w-full max-w-[430px] h-[100dvh] overflow-hidden shadow-2xl"
        style={{ backgroundColor: "#142013", perspective: "1200px" }}
      >
        {/* Sci-fi portal glow behind doors */}
        <motion.div
          animate={
            opening
              ? { scale: [1, 3.2], opacity: [0.35, 1, 0] }
              : { scale: [1, 1.06, 1], opacity: [0.25, 0.4, 0.25] }
          }
          transition={
            opening
              ? { duration: 1.0, ease: "easeOut" }
              : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(223,201,138,0.45) 0%, rgba(126,155,120,0.15) 35%, transparent 70%)",
          }}
        />

        {/* Doors */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpen();
            }
          }}
          aria-label="Tap to open the wedding invitation"
          className="absolute inset-0 z-20 flex cursor-pointer select-none focus:outline-none"
        >
          <motion.div
            animate={opening ? { x: "-115%", rotateY: 28, opacity: 0.2 } : { x: "0%", rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="w-1/2 h-full"
            style={{ transformOrigin: "left center" }}
          >
            <DoorPanel side="left" />
          </motion.div>

          <motion.div
            animate={opening ? { x: "115%", rotateY: -28, opacity: 0.2 } : { x: "0%", rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="w-1/2 h-full"
            style={{ transformOrigin: "right center" }}
          >
            <DoorPanel side="right" />
          </motion.div>

          {/* Sci-Fi Orbital Reticle Rings around Center Plaque */}
          <motion.div
            animate={opening ? { scale: 4, opacity: 0, rotate: 90 } : { rotate: 360 }}
            transition={
              opening
                ? { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
                : { duration: 24, repeat: Infinity, ease: "linear" }
            }
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-25 pointer-events-none rounded-full"
            style={{
              width: 236,
              height: 236,
              border: "1px dashed rgba(223, 201, 138, 0.45)",
              boxShadow: "0 0 32px rgba(223, 201, 138, 0.14)",
            }}
          />

          <motion.div
            animate={opening ? { scale: 5, opacity: 0, rotate: -90 } : { rotate: -360 }}
            transition={
              opening
                ? { duration: 0.95, ease: [0.16, 1, 0.3, 1] }
                : { duration: 36, repeat: Infinity, ease: "linear" }
            }
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-25 pointer-events-none rounded-full"
            style={{
              width: 274,
              height: 274,
              border: "1px solid rgba(126, 155, 120, 0.28)",
            }}
          />

          {/* Center Plaque (Zooms in on tap) */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={
              opening
                ? { scale: 2.8, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={
              opening
                ? { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
                : { type: "spring", stiffness: 240, damping: 18 }
            }
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          >
            <div
              className="relative flex flex-col items-center justify-center px-6 py-9 text-center"
              style={{
                width: 164,
                height: 202,
                background: "linear-gradient(170deg, #1E2E1D 0%, #121D11 100%)",
                borderRadius: "50% 50% 50% 50% / 30% 30% 30% 30%",
                border: "2px solid rgba(223,201,138,0.8)",
                boxShadow:
                  "0 0 40px rgba(223,201,138,0.22), inset 0 0 0 5px #192718, inset 0 0 0 7px rgba(223,201,138,0.35)",
              }}
            >
              <svg viewBox="0 0 36 20" width="30" height="17" className="mb-3" aria-hidden="true">
                <path d="M18 18 L18 3" stroke="#DFC98A" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M18 11 Q10 7 9 2" stroke="#DFC98A" strokeWidth="1.0" fill="none" strokeLinecap="round" />
                <path d="M18 11 Q26 7 27 2" stroke="#DFC98A" strokeWidth="1.0" fill="none" strokeLinecap="round" />
              </svg>

              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: "#DFC98A",
                  lineHeight: 1.5,
                }}
              >
                TAP TO{"\n"}OPEN
              </span>

              <span
                className="mt-2 text-[8px] tracking-[0.2em] uppercase opacity-75"
                style={{ fontFamily: "var(--font-sans)", color: "#C8D9C4" }}
              >
                Enter Invite
              </span>

              <svg viewBox="0 0 36 20" width="30" height="17" className="mt-3 rotate-180" aria-hidden="true">
                <path d="M18 18 L18 3" stroke="#DFC98A" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M18 11 Q10 7 9 2" stroke="#DFC98A" strokeWidth="1.0" fill="none" strokeLinecap="round" />
                <path d="M18 11 Q26 7 27 2" stroke="#DFC98A" strokeWidth="1.0" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </motion.div>
        </div>

        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleOpen();
          }}
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-3 focus:py-1.5 focus:rounded-full focus:bg-white focus:text-black focus:text-xs"
        >
          Skip to invitation
        </a>
      </div>
    </motion.div>
  );
}
