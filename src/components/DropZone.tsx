import { useState, useRef } from "react";
import { useLang } from "../contexts/LangContext";
import { Download } from "lucide-react";

export function DropZone({
  onFile,
  children,
}: {
  onFile: (content: string) => void;
  children: React.ReactNode;
}) {
  const { t } = useLang();
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (dragCounter.current === 1) {
      setIsDragging(true);
    }
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setIsDragging(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".json")) return;

    const reader = new FileReader();
    reader.onload = () => onFile(reader.result as string);
    reader.readAsText(file);
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative"
    >
      {children}
      {isDragging && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-xl border-2 border-dashed border-indigo-400/60 bg-indigo-500/25 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <Download size={32} className="mx-auto block text-white" />
            <p className="text-sm font-medium text-white">{t.dropJsonHere}</p>
          </div>
        </div>
      )}
    </div>
  );
}
