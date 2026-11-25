export default function Star({
  size = 20,
  color = "#B8934A",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  // 8-pointed Rub el Hizb style star
  const r = size / 2;
  const pts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const outer = (i * Math.PI) / 4;
    const inner = outer + Math.PI / 8;
    pts.push(`${r + (r * 0.9) * Math.cos(outer)},${r + (r * 0.9) * Math.sin(outer)}`);
    pts.push(`${r + (r * 0.4) * Math.cos(inner)},${r + (r * 0.4) * Math.sin(inner)}`);
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className={className}
    >
      <polygon points={pts.join(" ")} fill={color} />
    </svg>
  );
}
