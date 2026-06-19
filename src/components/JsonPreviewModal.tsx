import { useLang } from "../contexts/LangContext";

export function JsonPreviewModal({
  json,
  onClose,
}: {
  json: string;
  onClose: () => void;
}) {
  const { t } = useLang();

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="glass-card flex w-full max-w-2xl flex-col rounded-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <h3 className="text-sm font-semibold text-white">📄 {t.rawJson}</h3>
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs text-white/60 transition-all hover:bg-white/20 hover:text-white"
            >
              ✕
            </button>
          </div>
          {/* Body */}
          <div className="overflow-auto p-5" style={{ maxHeight: "70vh" }}>
            <pre className="whitespace-pre-wrap break-all rounded-lg bg-black/40 p-4 font-mono text-xs leading-relaxed text-white/70">
              {json}
            </pre>
          </div>
          {/* Footer */}
          <div className="flex justify-end border-t border-white/10 px-5 py-3">
            <button onClick={onClose} className="glass-btn text-xs">{t.close}</button>
          </div>
        </div>
      </div>
    </>
  );
}
