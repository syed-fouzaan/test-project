"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface GateProps {
  onOpen: () => void;
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
        fill="#3A5236"
      />
      <line x1="30" y1="85" x2="30" y2="20" stroke="#7E9B78" strokeWidth="0.8" />
      <path d="M30 55 Q18 50 14 42" stroke="#7E9B78" strokeWidth="0.6" fill="none" />
      <path d="M30 55 Q42 50 46 42" stroke="#7E9B78" strokeWidth="0.6" fill="none" />
      <path d="M30 42 Q20 38 16 30" stroke="#7E9B78" strokeWidth="0.5" fill="none" />
      <path d="M30 42 Q40 38 44 30" stroke="#7E9B78" strokeWidth="0.5" fill="none" />
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
          ? "linear-gradient(140deg, #5D7855 0%, #3A5236 50%, #2D4029 100%)"
          : "linear-gradient(220deg, #5D7855 0%, #3A5236 50%, #2D4029 100%)",
        borderRight: isLeft ? "2px solid rgba(178,139,69,0.6)" : "none",
        borderLeft: isLeft ? "none" : "2px solid rgba(178,139,69,0.6)",
        boxShadow: isLeft
          ? "inset -8px 0 24px rgba(0,0,0,0.25)"
          : "inset 8px 0 24px rgba(0,0,0,0.25)",
      }}
    >
      {/* Repeating leaf tile */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`tile-${side}`}
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20 15 Q32 5 42 20 Q28 28 20 15 Z"
              fill="#254A22"
            />
            <line x1="20" y1="15" x2="40" y2="20" stroke="#7E9B78" strokeWidth="0.7" />
            <path
              d="M55 50 Q66 40 72 55 Q59 62 55 50 Z"
              fill="#264823"
            />
            <line x1="55" y1="50" x2="70" y2="55" stroke="#7E9B78" strokeWidth="0.7" />
            <path
              d="M15 60 Q26 50 36 62 Q24 72 15 60 Z"
              fill="#2D4E2A"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#tile-${side})`} />
      </svg>
      {/* Door panel details */}
      <div
        className="absolute inset-4 rounded-lg opacity-15"
        style={{ border: "1px solid rgba(178,139,69,0.6)" }}
      />
      <div
        className="absolute inset-8 rounded opacity-10"
        style={{ border: "1px solid rgba(178,139,69,0.5)" }}
      />
      {/* Botanical corners */}
      <div style={{ position: "absolute", top: 20, left: isLeft ? "auto" : 20, right: isLeft ? 20 : "auto" }}>
        <BotanicalLeaf flip={!isLeft} />
      </div>
      <div style={{ position: "absolute", bottom: 40, left: isLeft ? 20 : "auto", right: isLeft ? "auto" : 20 }}>
        <BotanicalLeaf flip={isLeft} />
      </div>
    </div>
  );
}

export default function Gate({ onOpen }: GateProps) {
  const [stage, setStage] = useState<"idle" | "opening" | "done">("idle");

  function handleOpen() {
    if (stage !== "idle") return;
    setStage("opening");
    setTimeout(onOpen, 1200);
  }

  return (
    <motion.div
      animate={{ opacity: stage === "done" ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--bg-outer)" }}
    >
      <div
        className="relative w-full max-w-[430px] h-[100dvh] overflow-hidden shadow-2xl"
        style={{ backgroundColor: "var(--bg-ivory)" }}
      >
        {/* Background shimmer */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, #DFC98A22 0%, transparent 70%)",
          }}
        />

        {/* Curtains (behind doors) */}
        <div className="absolute inset-0 z-10 flex pointer-events-none">
          <motion.div
            animate={{ x: stage !== "idle" ? "-110%" : "0%" }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="w-1/2 h-full"
            style={{
              background:
                "repeating-linear-gradient(90deg, #F5EADB 0px, #E8D5BC 20px, #D4B994 32px, #F5EADB 48px)",
              borderRight: "2px dashed rgba(178,139,69,0.4)",
            }}
          />
          <motion.div
            animate={{ x: stage !== "idle" ? "110%" : "0%" }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="w-1/2 h-full"
            style={{
              background:
                "repeating-linear-gradient(90deg, #F5EADB 0px, #E8D5BC 20px, #D4B994 32px, #F5EADB 48px)",
              borderLeft: "2px dashed rgba(178,139,69,0.4)",
            }}
          />
        </div>

        {/* Doors */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleOpen}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleOpen(); } }}
          aria-label="Tap to open the wedding invitation"
          className="absolute inset-0 z-20 flex cursor-pointer select-none focus:outline-none"
        >
          <motion.div
            animate={{ x: stage !== "idle" ? "-104%" : "0%" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="w-1/2 h-full"
          >
            <DoorPanel side="left" />
          </motion.div>
          <motion.div
            animate={{ x: stage !== "idle" ? "104%" : "0%" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="w-1/2 h-full"
          >
            <DoorPanel side="right" />
          </motion.div>

          {/* Plaque */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={
              stage !== "idle"
                ? { scale: 0.82, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 240, damping: 18 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          >
            <div
              className="relative flex flex-col items-center justify-center px-6 py-9 text-center"
              style={{
                width: 160,
                height: 196,
                background: "linear-gradient(170deg, #FBF6EC 0%, #F0E2C8 100%)",
                borderRadius: "50% 50% 50% 50% / 30% 30% 30% 30%",
                border: "2px solid rgba(178,139,69,0.7)",
                boxShadow:
                  "0 16px 40px rgba(0,0,0,0.30), inset 0 0 0 5px #FBF6EC, inset 0 0 0 7px rgba(178,139,69,0.35)",
              }}
            >
              {/* Leaf ornament top */}
              <svg viewBox="0 0 36 20" width="30" height="17" className="mb-3" aria-hidden="true">
                <path d="M18 18 L18 3" stroke="#3A5236" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M18 11 Q10 7 9 2" stroke="#3A5236" strokeWidth="1.0" fill="none" strokeLinecap="round" />
                <path d="M18 11 Q26 7 27 2" stroke="#3A5236" strokeWidth="1.0" fill="none" strokeLinecap="round" />
                <path d="M18 7 Q13 4 12 1" stroke="#7E9B78" strokeWidth="0.7" fill="none" strokeLinecap="round" />
                <path d="M18 7 Q23 4 24 1" stroke="#7E9B78" strokeWidth="0.7" fill="none" strokeLinecap="round" />
              </svg>

              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.20em",
                  color: "#3A5236",
                  lineHeight: 1.3,
                }}
              >
                TAP TO{"\n"}OPEN
              </span>

              {/* Leaf ornament bottom (flipped) */}
              <svg viewBox="0 0 36 20" width="30" height="17" className="mt-3 rotate-180" aria-hidden="true">
                <path d="M18 18 L18 3" stroke="#3A5236" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M18 11 Q10 7 9 2" stroke="#3A5236" strokeWidth="1.0" fill="none" strokeLinecap="round" />
                <path d="M18 11 Q26 7 27 2" stroke="#3A5236" strokeWidth="1.0" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Accessibility skip */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleOpen(); }}
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-3 focus:py-1.5 focus:rounded-full focus:bg-white focus:text-black focus:text-xs"
        >
          Skip to invitation
        </a>
      </div>
    </motion.div>
  );
}
