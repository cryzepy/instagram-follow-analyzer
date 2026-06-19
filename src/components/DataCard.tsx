import { useMemo } from "react";
import type { UserEntry } from "../types";
import { formatTimestamp } from "../utils/format";

export function DataCard({
  label,
  icon,
  raw,
  data,
  onUpload,
  onPreview,
}: {
  label: string;
  icon: string;
  raw: string;
  data: UserEntry[];
  onUpload: () => void;
  onPreview: () => void;
}) {
  const latestTs = useMemo(() => {
    if (data.length === 0) return 0;
    return Math.max(...data.map((u) => u.timestamp));
  }, [data]);

  const hasError = raw.trim() !== "" && data.length === 0;

  return (
    <div className="glass-card rounded-xl p-5">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/30 text-xs">{icon}</span>
          {label}
        </h2>
        <div className="flex items-center gap-2">
          {raw && (
            <button onClick={onPreview} className="glass-btn text-xs">
              🔍 Detail
            </button>
          )}
          <button onClick={onUpload} className="glass-btn text-xs">
            📁 Upload JSON
          </button>
        </div>
      </div>

      {/* Body */}
      {data.length > 0 ? (
        <div className="rounded-lg bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm">
            <span>✅</span>
            <span className="text-white/80">{data.length.toLocaleString()} accounts detected</span>
          </div>
          {latestTs > 0 && (
            <div className="mt-1 flex items-center gap-2 text-sm">
              <span className="text-white/40">📅</span>
              <span className="text-white/50">Latest: {formatTimestamp(latestTs)}</span>
            </div>
          )}
        </div>
      ) : hasError ? (
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          ⚠️ Invalid JSON format. Please check your data.
        </div>
      ) : (
        <div className="rounded-lg border-2 border-dashed border-white/10 p-6 text-center">
          <div className="mb-1 text-2xl">📥</div>
          <p className="text-sm text-white/40">Upload or drag & drop a JSON file</p>
        </div>
      )}
    </div>
  );
}
