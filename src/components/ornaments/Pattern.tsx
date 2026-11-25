// Subtle geometric pattern tile (8-pt star lattice) as SVG background
export default function Pattern({
  opacity = 0.07,
  color = "#B8934A",
  className = "",
}: {
  opacity?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="islamic-geo"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          {/* Simple 8-pt star tile */}
          <g opacity={opacity} fill={color} stroke="none">
            <polygon points="20,2 22.4,8.8 29.6,8.8 23.8,13 26.2,20 20,15.8 13.8,20 16.2,13 10.4,8.8 17.6,8.8" />
          </g>
          {/* Cross lines */}
          <line x1="20" y1="0" x2="20" y2="40" stroke={color} strokeWidth="0.3" opacity={opacity * 0.5} />
          <line x1="0" y1="20" x2="40" y2="20" stroke={color} strokeWidth="0.3" opacity={opacity * 0.5} />
          <line x1="0" y1="0" x2="40" y2="40" stroke={color} strokeWidth="0.2" opacity={opacity * 0.3} />
          <line x1="40" y1="0" x2="0" y2="40" stroke={color} strokeWidth="0.2" opacity={opacity * 0.3} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-geo)" />
    </svg>
  );
}
