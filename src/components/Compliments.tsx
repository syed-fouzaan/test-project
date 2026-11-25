"use client";

import ScrollReveal from "./ScrollReveal";
import { invite } from "@/data/invite";

interface Props { lang: "en" | "ar" }

export default function Compliments({ lang }: Props) {
  return (
    <section
      id="compliments"
      className="snap-section px-5 py-14"
      style={{ backgroundColor: "var(--bg-ivory)" }}
      aria-label="Compliments"
    >
      <div className="max-w-xs mx-auto flex flex-col gap-5">

        <ScrollReveal variant="up">
          <div className="flex flex-col items-center gap-1">
            <span className="section-label">{lang === "ar" ? "بكل سرور من" : "Compliments of"}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={0.1}>
          <div
            className="invite-card flex flex-col items-center gap-3 text-center"
            style={{
              background: "linear-gradient(170deg, var(--bg-card) 0%, var(--bg-linen) 100%)",
            }}
          >
            {/* Mosque icon */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--sage-pale)", fontSize: 28 }}
              aria-hidden="true"
            >
              🕌
            </div>

            <div>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--ink-dark)",
                  lineHeight: 1.3,
                }}
              >
                {invite.compliments.masjid}
              </p>
              <p
                className="text-xs mt-1"
                style={{ fontFamily: "var(--font-sans)", color: "var(--ink-muted)", letterSpacing: "0.03em" }}
              >
                {invite.compliments.address}
              </p>
            </div>

            <div className="leaf-divider" style={{ width: 120 }}>
              <span style={{ color: "var(--sage-soft)", fontSize: 10 }}>✦</span>
            </div>

            <p
              className="text-xs"
              style={{ fontFamily: "var(--font-sans)", color: "var(--sage-mid)", letterSpacing: "0.06em" }}
            >
              {invite.compliments.by}
            </p>
          </div>
        </ScrollReveal>

        {/* Dress code note */}
        <ScrollReveal variant="fade" delay={0.18}>
          <div
            className="flex items-start gap-3 px-4 py-3 rounded-2xl"
            style={{ backgroundColor: "var(--sage-pale)", opacity: 0.85 }}
          >
            <span style={{ fontSize: 20 }}>👗</span>
            <div>
              <p className="section-label">{lang === "ar" ? "الزي المناسب" : "Dress Code"}</p>
              <p className="text-xs mt-1" style={{ fontFamily: "var(--font-serif)", color: "var(--ink-dark)" }}>
                {lang === "ar"
                  ? "الزي الإسلامي الرسمي — الألوان الفاتحة والمحتشمة"
                  : "Formal Islamic attire — modest, light colours preferred"}
              </p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
