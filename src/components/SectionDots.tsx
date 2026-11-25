"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface SectionItem {
  id: string;
  label: string;
}

interface Props {
  sections: SectionItem[];
  scrollContainer: React.RefObject<HTMLDivElement | null>;
}

export default function SectionDots({ sections, scrollContainer }: Props) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const root = scrollContainer.current;
    if (!root) return;

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root,
        threshold: [0.35, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections, scrollContainer]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <nav
      aria-label="Section navigation"
      className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 py-2 px-1 rounded-full"
      style={{
        backgroundColor: "rgba(251, 248, 242, 0.7)",
        backdropFilter: "blur(6px)",
        border: "1px solid rgba(178, 139, 69, 0.2)",
      }}
    >
      {sections.map((sec) => {
        const isActive = activeId === sec.id;
        return (
          <button
            key={sec.id}
            type="button"
            onClick={() => scrollTo(sec.id)}
            aria-label={`Jump to ${sec.label}`}
            title={sec.label}
            className="group relative flex items-center justify-center p-1 focus:outline-none cursor-pointer"
          >
            <motion.span
              animate={{
                scale: isActive ? 1.35 : 1,
                backgroundColor: isActive ? "#3A5236" : "rgba(126, 155, 120, 0.45)",
              }}
              transition={{ type: "spring", stiffness: 360, damping: 24 }}
              className="block w-1.5 h-1.5 rounded-full"
            />
          </button>
        );
      })}
    </nav>
  );
}
