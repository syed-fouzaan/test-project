export default function ArchSvg({
  className = "",
  goldStroke = "#B8934A",
  fill = "none",
}: {
  className?: string;
  goldStroke?: string;
  fill?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 280"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      fill={fill}
    >
      {/* Arch outline — pointed Mughal arch */}
      <path
        d="M20 280 L20 130 Q20 10 100 10 Q180 10 180 130 L180 280 Z"
        stroke={goldStroke}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner hairline */}
      <path
        d="M32 280 L32 134 Q32 28 100 28 Q168 28 168 134 L168 280 Z"
        stroke={goldStroke}
        strokeWidth="0.6"
        strokeDasharray="4 3"
        fill="none"
        opacity="0.5"
      />
      {/* Star at apex */}
      <g transform="translate(100, 14) scale(0.9)" fill={goldStroke}>
        {/* 8-point star */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1="0"
            y1="-6"
            x2="0"
            y2="6"
            transform={`rotate(${angle})`}
            stroke={goldStroke}
            strokeWidth="1"
            strokeLinecap="round"
          />
        ))}
        <circle r="2.5" fill={goldStroke} />
      </g>
    </svg>
  );
}
