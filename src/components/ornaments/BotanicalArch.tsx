"use client";

import { motion } from "framer-motion";

export function GardenArchHero() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 390 680"
        className="w-full h-full max-w-[410px] opacity-40"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Outer Botanical Arch */}
        <motion.path
          d="M 28 660 L 28 240 C 28 110, 105 42, 195 34 C 285 42, 362 110, 362 240 L 362 660"
          stroke="#7E9B78"
          strokeWidth="1.4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Inner Gold Accent Arch */}
        <motion.path
          d="M 42 660 L 42 248 C 42 124, 114 58, 195 50 C 276 58, 348 124, 348 248 L 348 660"
          stroke="#B28B45"
          strokeWidth="0.9"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.75 }}
          transition={{ duration: 2.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Left Climbing Vine & Leaves */}
        <motion.path
          d="M 28 360 Q 16 300 32 230 Q 48 160 88 108"
          stroke="#557050"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
        />
        <motion.path
          d="M 28 280 Q 10 265 14 250 Q 26 256 28 280 Z"
          fill="#C8D9C4"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.85 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        />
        <motion.path
          d="M 40 190 Q 24 174 28 158 Q 42 166 40 190 Z"
          fill="#7E9B78"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ delay: 1.05, duration: 0.5 }}
        />

        {/* Right Climbing Vine & Leaves */}
        <motion.path
          d="M 362 360 Q 374 300 358 230 Q 342 160 302 108"
          stroke="#557050"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
        />
        <motion.path
          d="M 362 280 Q 380 265 376 250 Q 364 256 362 280 Z"
          fill="#C8D9C4"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.85 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        />
        <motion.path
          d="M 350 190 Q 366 174 362 158 Q 348 166 350 190 Z"
          fill="#7E9B78"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ delay: 1.05, duration: 0.5 }}
        />

        {/* Top Crown Rose Cluster */}
        <motion.g
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
        >
          <circle cx="195" cy="34" r="7" fill="#EDE1CC" stroke="#B28B45" strokeWidth="1" />
          <circle cx="180" cy="40" r="4.5" fill="#C8D9C4" stroke="#557050" strokeWidth="0.8" />
          <circle cx="210" cy="40" r="4.5" fill="#C8D9C4" stroke="#557050" strokeWidth="0.8" />
        </motion.g>

        {/* Subtle Bottom Garden Fountain Silhouette */}
        <motion.path
          d="M 135 645 Q 195 628 255 645 M 155 632 Q 195 616 235 632 M 195 616 L 195 595"
          stroke="#7E9B78"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.65 }}
          transition={{ delay: 0.8, duration: 1.2 }}
        />
      </svg>
    </div>
  );
}
