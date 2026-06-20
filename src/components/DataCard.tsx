import type { ReactNode } from "react";
import { useMemo } from "react";
import type { UserEntry } from "../types";
import { formatTimestamp } from "../utils/format";
import { useLang } from "../contexts/LangContext";
import { Search, FolderUp, CheckCircle, Calendar, Download, AlertTriangle } from "lucide-react";

export function DataCard({
  label,
  icon,
  raw,
  data,
  onUpload,
  onPreview,
}: {
  label: string;
  icon: ReactNode;
  raw: string;
  data: UserEntry[];
  onUpload: () => void;
  onPreview: () => void;
}) {
  const { t, lang } = useLang();
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
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/30 text-indigo-300">{icon}</span>
          {label}
        </h2>
        <div className="flex items-center gap-2">
          {raw && (
            <button onClick={onPreview} className="glass-btn inline-flex items-center gap-1 text-xs">
              <Search size={12} /> {t.detail}
            </button>
          )}
          <button onClick={onUpload} className="glass-btn inline-flex items-center gap-1 text-xs">
            <FolderUp size={12} /> {t.uploadJson}
          </button>
        </div>
      </div>

      {/* Body */}
      {data.length > 0 ? (
        <div className="rounded-lg bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle size={16} className="shrink-0 text-emerald-400" />
            <span className="text-white/80">{t.accountsDetected.replace("{count}", data.length.toLocaleString())}</span>
          </div>
          {latestTs > 0 && (
            <div className="mt-1 flex items-center gap-2 text-sm">
              <Calendar size={14} className="shrink-0 text-white/40" />
              <span className="text-white/50">{t.latest} {formatTimestamp(latestTs, lang === "id" ? "id-ID" : "en-US")}</span>
            </div>
          )}
        </div>
      ) : hasError ? (
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          <AlertTriangle size={14} className="inline-block align-middle shrink-0" /> <span className="inline-block align-middle">{t.invalidJson}</span>
        </div>
      ) : (
        <div className="rounded-lg border-2 border-dashed border-white/10 p-6 text-center">
          <Download size={28} className="mx-auto block text-white/40" />
          <p className="mt-2 text-sm text-white/40">{t.uploadOrDrop}</p>
        </div>
      )}
    </div>
  );
}
