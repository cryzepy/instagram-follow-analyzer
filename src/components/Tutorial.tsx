import { useLang } from "../contexts/LangContext";
import { BookOpen, X, Lightbulb, ArrowLeft } from "lucide-react";

export function Tutorial({ onClose }: { onClose: () => void }) {
  const { t } = useLang();

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-2xl p-4 pt-10 sm:p-8 sm:pt-16">
        <div className="glass-card rounded-xl p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white sm:text-xl">
              <BookOpen size={24} className="inline-block align-middle text-indigo-300" /> <span className="inline-block align-middle">{t.tutorialTitle}</span>
            </h2>
            <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs text-white/60 transition-all hover:bg-white/20 hover:text-white">
              <X size={12} />
            </button>
          </div>

          {/* Step 1 */}
          <Section title={t.tutorialStep1Title}>
            <p className="mb-2 text-sm text-white/60">{t.tutorialStep1Desc}</p>
            <ol className="ml-4 list-decimal space-y-1.5 text-sm text-white/70">
              <li>{t.tutorialStep1_1}</li>
              <li>{t.tutorialStep1_2}</li>
              <li>{t.tutorialStep1_3}</li>
              <li>{t.tutorialStep1_4}</li>
              <li>{t.tutorialStep1_5}</li>
            </ol>
          </Section>

          {/* Step 2 */}
          <Section title={t.tutorialStep2Title}>
            <p className="mb-2 text-sm text-white/60">{t.tutorialStep2Desc}</p>
            <ul className="ml-4 list-disc space-y-1.5 text-sm text-white/70">
              <li>{t.tutorialStep2_1}</li>
              <li>{t.tutorialStep2_2}</li>
              <li>{t.tutorialStep2_3}</li>
            </ul>
          </Section>

          {/* Step 3 */}
          <Section title={t.tutorialStep3Title}>
            <p className="mb-2 text-sm text-white/60">{t.tutorialStep3Desc}</p>
            <ul className="ml-4 list-disc space-y-1.5 text-sm text-white/70">
              <li>{t.tutorialStep3_single}</li>
              <li>{t.tutorialStep3_compare}</li>
            </ul>
          </Section>

          {/* Step 4 */}
          <Section title={t.tutorialStep4Title}>
            <p className="mb-2 text-sm text-white/60">{t.tutorialStep4Desc}</p>
            <ul className="ml-4 list-disc space-y-1.5 text-sm text-white/70">
              <li>{t.tutorialStep4_1}</li>
              <li>{t.tutorialStep4_2}</li>
              <li>{t.tutorialStep4_3}</li>
            </ul>
          </Section>

          {/* Footer */}
          <div className="mt-6 rounded-lg bg-white/5 p-4 text-sm text-white/50">
            <Lightbulb size={16} className="inline-block align-middle shrink-0 text-amber-400" /> <span className="inline-block align-middle">{t.tutorialFooter}</span>
          </div>

          {/* Back button */}
          <button onClick={onClose} className="glass-btn mt-4 w-full py-2.5 text-sm font-medium">
            <ArrowLeft size={14} className="inline-block align-middle" /> <span className="inline-block align-middle">{t.tutorialBack}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 rounded-lg bg-white/[0.03] p-4">
      <h3 className="mb-2 text-sm font-semibold text-indigo-200">{title}</h3>
      {children}
    </div>
  );
}
