"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { invite } from "@/data/invite";

interface Props { lang: "en" | "ar" }

export default function Rsvp({ lang }: Props) {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);

  const rsvpMsg = `Assalamu Alaikum!\n\nI (${name || "Guest"}) will Insha'Allah attend the Nikah.\nGuests: ${guests}`;
  const wa = `https://wa.me/${invite.rsvp.whatsapp}?text=${encodeURIComponent(rsvpMsg)}`;

  return (
    <section
      id="rsvp"
      className="snap-section px-5 py-14"
      style={{ backgroundColor: "var(--bg-linen)" }}
      aria-label="RSVP"
    >
      <div className="max-w-xs mx-auto flex flex-col gap-6">

        <ScrollReveal variant="up">
          <div className="flex flex-col items-center gap-1">
            <span className="section-label">{lang === "ar" ? "تأكيد الحضور" : "RSVP"}</span>
            <p
              className="mt-2 text-center"
              style={{ fontFamily: "var(--font-script)", fontSize: 30, color: "var(--sage-dark)" }}
            >
              {lang === "ar" ? "نتشوق لرؤيتكم" : "We'd love to see you"}
            </p>
            <p
              className="text-sm text-center"
              style={{ fontFamily: "var(--font-serif)", color: "var(--ink-muted)", fontStyle: "italic", marginTop: 4 }}
            >
              {lang === "ar"
                ? "يرجى تأكيد حضوركم عبر واتساب"
                : "Please confirm your attendance via WhatsApp"}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.1}>
          <div className="invite-card flex flex-col gap-4">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="rsvp-name"
                className="section-label"
              >
                {lang === "ar" ? "اسمك الكريم" : "Your Name"}
              </label>
              <input
                id="rsvp-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === "ar" ? "أدخل اسمك..." : "Enter your name..."}
                maxLength={40}
                className="w-full rounded-xl px-4 py-2.5 text-sm"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--ink-dark)",
                  backgroundColor: "var(--bg-linen)",
                  border: "1px solid var(--divider)",
                  outline: "none",
                }}
                onFocus={(e) => { e.target.style.borderColor = "var(--sage-mid)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--divider)"; }}
              />
            </div>

            {/* Guest count */}
            <div className="flex flex-col gap-1.5">
              <span className="section-label">{lang === "ar" ? "عدد الضيوف" : "Number of Guests"}</span>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <motion.button
                    key={n}
                    type="button"
                    whileTap={{ scale: 0.88 }}
                    onClick={() => setGuests(n)}
                    className="flex-1 py-2 rounded-xl text-sm font-medium"
                    style={{
                      fontFamily: "var(--font-sans)",
                      backgroundColor: guests === n ? "var(--sage-dark)" : "var(--bg-linen)",
                      color: guests === n ? "#FBF8F2" : "var(--ink-muted)",
                      border: "1px solid",
                      borderColor: guests === n ? "var(--sage-dark)" : "var(--divider)",
                      transition: "all 0.2s",
                    }}
                  >
                    {n}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* WhatsApp button */}
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sage text-center no-underline mt-1"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L.057 23.882a.5.5 0 00.611.611l6.03-1.483A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.993 0-3.868-.562-5.46-1.531l-.383-.229-3.978.979.995-3.955-.238-.396A9.959 9.959 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" />
              </svg>
              {lang === "ar" ? "تأكيد عبر واتساب" : "RSVP via WhatsApp"}
            </a>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
