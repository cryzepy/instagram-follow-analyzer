export function StatCard({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: number;
  icon: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`glass-card rounded-lg p-4 text-center transition-all hover:scale-[1.02] ${
        highlight && value > 0 ? "ring-1 ring-rose-500/30" : ""
      }`}
    >
      <div className="mb-1 text-2xl">{icon}</div>
      <div className="text-2xl font-bold text-white">{value.toLocaleString()}</div>
      <div className="text-xs text-white/50">{label}</div>
    </div>
  );
}
