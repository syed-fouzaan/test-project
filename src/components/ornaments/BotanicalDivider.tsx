"use client";

import { motion } from "framer-motion";

export default function BotanicalDivider({ bg = "var(--bg-ivory)" }: { bg?: string }) {
  return (
    <div
      className="w-full py-2 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: bg }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 240 34" width="210" height="30" fill="none">
        <motion.path
          d="M 10 17 Q 65 17 120 17 Q 175 17 230 17"
          stroke="rgba(178, 139, 69, 0.35)"
          strokeWidth="0.9"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M 120 17 Q 108 6 98 11 Q 104 20 120 17 Z"
          fill="#C8D9C4"
          stroke="#557050"
          strokeWidth="0.7"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ delay: 0.25, duration: 0.45 }}
        />
        <motion.path
          d="M 120 17 Q 132 6 142 11 Q 136 20 120 17 Z"
          fill="#C8D9C4"
          stroke="#557050"
          strokeWidth="0.7"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ delay: 0.3, duration: 0.45 }}
        />
        <motion.circle
          cx="120"
          cy="17"
          r="3"
          fill="#DFC98A"
          stroke="#B28B45"
          strokeWidth="0.8"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ delay: 0.35, type: "spring", stiffness: 300 }}
        />
      </svg>
    </div>
  );
}
