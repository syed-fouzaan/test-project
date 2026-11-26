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
      className="absolute right-1.5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-1.5 py-2 px-1 rounded-full"
      style={{
        backgroundColor: "rgba(25, 39, 24, 0.55)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(223, 201, 138, 0.22)",
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
            className="group relative flex items-center justify-center p-0.5 focus:outline-none cursor-pointer"
          >
            <motion.span
              animate={{
                height: isActive ? 14 : 5,
                backgroundColor: isActive ? "#DFC98A" : "rgba(223, 201, 138, 0.35)",
              }}
              transition={{ type: "spring", stiffness: 360, damping: 24 }}
              className="block w-1.5 rounded-full"
            />
          </button>
        );
      })}
    </nav>
  );
}
