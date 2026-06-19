export function ConfirmModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="glass-card w-full max-w-sm rounded-xl p-6 text-center">
          <div className="mb-3 text-4xl">🗑️</div>
          <h3 className="mb-2 text-lg font-semibold text-white">
            Clear All Data?
          </h3>
          <p className="mb-6 text-sm text-white/60">
            All saved JSON data will be removed. This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-white/15"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 rounded-lg bg-rose-500/80 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-rose-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
