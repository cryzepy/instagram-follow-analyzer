const COLORS = [
  "#6366f1", "#8b5cf6", "#a855f7", "#d946ef",
  "#ec4899", "#f43f5e", "#f97316", "#eab308",
  "#22c55e", "#14b8a6", "#06b6d4", "#0ea5e9",
];

export function AvatarImg({ username, className }: { username: string; className?: string }) {
  const initial = (username[0] ?? "?").toUpperCase();
  const color = COLORS[
    username.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % COLORS.length
  ];

  return (
    <svg viewBox="0 0 64 64" className={className} aria-label={username} role="img">
      <rect width="64" height="64" rx="32" fill={color} />
      <text
        x="32" y="32"
        textAnchor="middle" dominantBaseline="central"
        fill="#fff"
        fontSize="22"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        {initial}
      </text>
    </svg>
  );
}
