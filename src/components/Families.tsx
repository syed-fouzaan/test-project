"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { invite } from "@/data/invite";

interface Props { lang: "en" | "ar" }

type Tab = "both" | "bride" | "groom";

const TABS: { key: Tab; label: string; labelAr: string }[] = [
  { key: "both", label: "Both Families", labelAr: "الأسرتان" },
  { key: "bride", label: "Bride's Family", labelAr: "أسرة العروس" },
  { key: "groom", label: "Groom's Family", labelAr: "أسرة العريس" },
];

function FamilyCard({
  person,
  parents,
  place,
  role,
  lang,
}: {
  person: string;
  parents: string[];
  place: string;
  role: string;
  lang: "en" | "ar";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      className="invite-card flex flex-col gap-2"
    >
      <span className="section-label">{role}</span>
      <p
        style={{
          fontFamily: "var(--font-script)",
          fontSize: 26,
          color: "var(--ink-dark)",
          lineHeight: 1.1,
        }}
      >
        {person}
      </p>
      <div className="leaf-divider" style={{ width: 100 }}>
        <span style={{ color: "var(--sage-soft)", fontSize: 10 }}>✦</span>
      </div>
      <div className="flex flex-col gap-0.5">
        {parents.map((p) => (
          <p key={p} className="text-sm" style={{ fontFamily: "var(--font-serif)", color: "var(--ink-muted)" }}>
            {p}
          </p>
        ))}
      </div>
      <p className="text-[10px] tracking-widest mt-1" style={{ fontFamily: "var(--font-sans)", color: "var(--sage-mid)", textTransform: "uppercase" }}>
        {place}
      </p>
    </motion.div>
  );
}

export default function Families({ lang }: Props) {
  const [tab, setTab] = useState<Tab>("both");

  return (
    <section
      id="families"
      className="snap-section px-5 py-14"
      style={{ backgroundColor: "var(--bg-ivory)" }}
      aria-label="Families"
    >
      <div className="max-w-xs mx-auto flex flex-col gap-6">

        <ScrollReveal variant="up">
          <div className="flex flex-col items-center gap-1">
            <span className="section-label">{lang === "ar" ? "الأسرتان الكريمتان" : "The Families"}</span>
            <div className="leaf-divider mt-2" style={{ width: 160 }}>
              <span style={{ color: "var(--sage-soft)", fontSize: 12 }}>❧</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Tab switcher */}
        <ScrollReveal variant="fade" delay={0.08}>
          <div
            className="relative flex rounded-full p-1"
            style={{ backgroundColor: "var(--bg-linen)", border: "1px solid var(--divider)" }}
            role="tablist"
            aria-label="Family filter"
          >
            {TABS.map(({ key, label, labelAr }) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className="relative flex-1 py-2 text-center focus:outline-none"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 10,
                  fontWeight: 500,
                  color: tab === key ? "var(--bg-ivory)" : "var(--ink-muted)",
                  letterSpacing: "0.04em",
                  zIndex: 1,
                  borderRadius: 9999,
                  transition: "color 0.3s",
                }}
              >
                {tab === key && (
                  <motion.div
                    layoutId="family-tab-bg"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: "var(--sage-dark)", zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {lang === "ar" ? labelAr : label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Cards */}
        <AnimatePresence mode="wait">
          {(tab === "both" || tab === "bride") && (
            <FamilyCard
              key="bride"
              person={invite.bride.name}
              parents={invite.bride.parents}
              place={invite.bride.place}
              role={lang === "ar" ? "العروس" : "Bride"}
              lang={lang}
            />
          )}
          {(tab === "both" || tab === "groom") && (
            <FamilyCard
              key="groom"
              person={invite.groom.name}
              parents={invite.groom.parents}
              place={invite.groom.place}
              role={lang === "ar" ? "العريس" : "Groom"}
              lang={lang}
            />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
