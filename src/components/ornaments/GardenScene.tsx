"use client";

export function DrapedCurtains({ scrollY = 0 }: { scrollY?: number }) {
  const shift = Math.min(scrollY * 0.18, 42);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-44 overflow-hidden z-10" aria-hidden="true">
      {/* Left curtain swag — parts slightly as user scrolls */}
      <svg
        viewBox="0 0 220 180"
        className="absolute top-0 left-0 w-44 h-40"
        style={{
          transform: `translate3d(${-shift}px, ${-shift * 0.35}px, 0)`,
          transition: "transform 0.08s linear",
        }}
      >
        <defs>
          <linearGradient id="curtainL" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F3E8D4" />
            <stop offset="45%" stopColor="#DFCBB0" />
            <stop offset="80%" stopColor="#CBB18B" />
            <stop offset="100%" stopColor="#EADBC3" />
          </linearGradient>
        </defs>
        <path d="M0 0 L212 0 Q176 50 112 70 Q64 90 46 170 L0 170 Z" fill="url(#curtainL)" opacity="0.96" />
        <path d="M22 0 Q38 68 18 170" stroke="#B79A70" strokeWidth="2.4" fill="none" opacity="0.45" />
        <path d="M56 0 Q64 56 38 148" stroke="#B79A70" strokeWidth="2" fill="none" opacity="0.38" />
        <path d="M98 0 Q96 42 74 96" stroke="#B79A70" strokeWidth="1.6" fill="none" opacity="0.32" />
        <path
          d="M210 2 Q172 50 110 70 Q62 90 44 168"
          stroke="#C8A870"
          strokeWidth="3.2"
          strokeDasharray="1 5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Right curtain swag */}
      <svg
        viewBox="0 0 220 180"
        className="absolute top-0 right-0 w-44 h-40"
        style={{
          transform: `scaleX(-1) translate3d(${-shift}px, ${-shift * 0.35}px, 0)`,
          transition: "transform 0.08s linear",
        }}
      >
        <path d="M0 0 L212 0 Q176 50 112 70 Q64 90 46 170 L0 170 Z" fill="url(#curtainL)" opacity="0.96" />
        <path d="M22 0 Q38 68 18 170" stroke="#B79A70" strokeWidth="2.4" fill="none" opacity="0.45" />
        <path d="M56 0 Q64 56 38 148" stroke="#B79A70" strokeWidth="2" fill="none" opacity="0.38" />
        <path d="M98 0 Q96 42 74 96" stroke="#B79A70" strokeWidth="1.6" fill="none" opacity="0.32" />
        <path
          d="M210 2 Q172 50 110 70 Q62 90 44 168"
          stroke="#C8A870"
          strokeWidth="3.2"
          strokeDasharray="1 5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Center top valance */}
      <svg viewBox="0 0 260 56" className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-14">
        <path d="M0 0 Q65 44 130 14 Q195 44 260 0 Z" fill="#EADBC3" stroke="#C8A870" strokeWidth="0.8" />
        <path
          d="M4 2 Q65 44 130 16 Q195 44 256 2"
          stroke="#C8A870"
          strokeWidth="2.5"
          strokeDasharray="1 5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

function RoseCluster({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${flip ? -1 : 1}, 1)`}>
      {/* Leaves */}
      <path d="M-24 6 Q-10 -8 4 4 Q-10 14 -24 6 Z" fill="#3E5438" />
      <path d="M8 2 Q22 -10 34 2 Q20 12 8 2 Z" fill="#4E6647" />
      <path d="M-12 12 Q4 2 18 14 Q2 22 -12 12 Z" fill="#5A7252" />
      {/* Ivory & Blush Roses */}
      <g transform="translate(-8, 2)">
        <circle r="9" fill="#F3E8DC" />
        <circle r="6" fill="#E9CFC4" />
        <circle r="3" fill="#DCAEA0" />
      </g>
      <g transform="translate(10, 6)">
        <circle r="7.5" fill="#EBC8BE" />
        <circle r="4.5" fill="#DFABA0" />
        <circle r="2" fill="#C98D82" />
      </g>
      <g transform="translate(22, 10)">
        <circle r="5.5" fill="#F5EFE6" />
        <circle r="2.5" fill="#E3C4B8" />
      </g>
    </g>
  );
}

export function GardenFountain({ scrollY = 0 }: { scrollY?: number }) {
  const parallax = Math.min(scrollY * 0.08, 18);

  return (
    <div
      className="w-full max-w-[350px] mx-auto pointer-events-none select-none"
      style={{
        transform: `translate3d(0, ${-parallax}px, 0)`,
        transition: "transform 0.08s linear",
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 360 180" className="w-full h-auto">
        <defs>
          <radialGradient id="waterPool" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B6D4D2" />
            <stop offset="65%" stopColor="#81A8A5" />
            <stop offset="100%" stopColor="#5D827F" />
          </radialGradient>
          <linearGradient id="stoneCream" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F8F2E7" />
            <stop offset="100%" stopColor="#D6C6AE" />
          </linearGradient>
        </defs>

        {/* Ground Shadow */}
        <ellipse cx="180" cy="150" rx="164" ry="22" fill="#DDD1BC" opacity="0.55" />

        {/* Cypress & Olive Trees */}
        <path d="M40 122 Q52 38 64 122 Z" fill="#354A30" />
        <path d="M58 124 Q67 62 76 124 Z" fill="#496243" />
        <path d="M296 122 Q308 38 320 122 Z" fill="#354A30" />
        <path d="M284 124 Q293 62 302 124 Z" fill="#496243" />

        {/* Stone Pillars & Floral Urns */}
        <rect x="76" y="100" width="24" height="34" rx="2" fill="url(#stoneCream)" stroke="#C6B499" strokeWidth="0.8" />
        <rect x="260" y="100" width="24" height="34" rx="2" fill="url(#stoneCream)" stroke="#C6B499" strokeWidth="0.8" />
        <RoseCluster x={88} y={91} />
        <RoseCluster x={272} y={91} flip />

        {/* Center Stone Fountain Basin */}
        <ellipse cx="180" cy="136" rx="70" ry="23" fill="url(#stoneCream)" stroke="#C6B499" strokeWidth="1.2" />
        <ellipse cx="180" cy="133" rx="60" ry="17" fill="url(#waterPool)" />
        {/* Water ripples */}
        <ellipse cx="180" cy="133" rx="44" ry="11" fill="none" stroke="#E5F3F2" strokeWidth="0.7" opacity="0.6" />
        <ellipse cx="180" cy="133" rx="28" ry="6.5" fill="none" stroke="#E5F3F2" strokeWidth="0.7" opacity="0.5" />

        {/* Pedestal & Upper Bowl */}
        <rect x="174" y="107" width="12" height="25" fill="url(#stoneCream)" />
        <ellipse cx="180" cy="108" rx="23" ry="6.5" fill="url(#stoneCream)" stroke="#C6B499" strokeWidth="0.9" />
        {/* Fountain arcs */}
        <path d="M180 94 Q166 98 163 108" stroke="#EAF5F4" strokeWidth="1.4" fill="none" opacity="0.9" />
        <path d="M180 94 Q194 98 197 108" stroke="#EAF5F4" strokeWidth="1.4" fill="none" opacity="0.9" />
        <path d="M163 109 Q150 120 146 133" stroke="#EAF5F4" strokeWidth="1.1" fill="none" opacity="0.7" />
        <path d="M197 109 Q210 120 214 133" stroke="#EAF5F4" strokeWidth="1.1" fill="none" opacity="0.7" />

        {/* Foreground Rose Clusters */}
        <RoseCluster x={50} y={145} />
        <RoseCluster x={310} y={145} flip />
      </svg>
    </div>
  );
}
