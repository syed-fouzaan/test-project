"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

/** Global tap/click gold & sage particle burst inside the phone frame */
export default function TapSparkles({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const layer = layerRef.current;
    if (!container || !layer) return;

    function handlePointerDown(e: PointerEvent) {
      if (!layer) return;
      const rect = layer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const sparks = Array.from({ length: 7 }, (_, i) => {
        const dot = document.createElement("span");
        dot.style.cssText = `
          position:absolute;
          left:${x}px;
          top:${y}px;
          width:5px;
          height:5px;
          border-radius:9999px;
          pointer-events:none;
          background:${i % 2 === 0 ? "#DFC98A" : "#7E9B78"};
          box-shadow:0 0 8px rgba(223,201,138,0.65);
        `;
        layer.appendChild(dot);
        return dot;
      });

      animate(sparks, {
        translateX: () => (Math.random() - 0.5) * 76,
        translateY: () => (Math.random() - 0.5) * 76,
        scale: [1.1, 0],
        opacity: [0.95, 0],
        duration: 580,
        delay: stagger(18),
        easing: "easeOutQuad",
      });

      setTimeout(() => {
        sparks.forEach((s) => s.remove());
      }, 650);
    }

    container.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => container.removeEventListener("pointerdown", handlePointerDown);
  }, [containerRef]);

  return (
    <div
      ref={layerRef}
      className="no-print absolute inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    />
  );
}
