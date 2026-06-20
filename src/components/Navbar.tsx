import { useState, useId } from "react";
import logoSvg from "../assets/icons/logo.svg";
import { useLang } from "../contexts/LangContext";
import { HelpCircle, Trash2 } from "lucide-react";

function FlagIcon({ country }: { country: "id" | "gb" }) {
  const uid = useId();
  if (country === "id") {
    return (
      <svg className="inline-block h-4 w-6 align-middle" viewBox="0 0 900 600">
        <path fill="#fff" d="M0 0H900V600H0z" />
        <path fill="red" d="M0 0H900V300H0z" />
      </svg>
    );
  }
  return (
    <svg className="inline-block h-4 w-6 align-middle" viewBox="0 0 50 30">
      <clipPath id={`${uid}-t`}>
        <path d="M25,15h25v15zv15h-25zh-25v-15zv-15h25z" />
      </clipPath>
      <path d="M0,0v30h50v-30z" fill="#012169" />
      <path d="M0,0 50,30M50,0 0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 50,30M50,0 0,30" clipPath={`url(#${uid}-t)`} stroke="#C8102E" strokeWidth="4" />
      <path d="M-1 11h22v-12h8v12h22v8h-22v12h-8v-12h-22z" fill="#C8102E" stroke="#FFF" strokeWidth="2" />
    </svg>
  );
}

export function Navbar({
  onClearData,
  onShowTutorial,
}: {
  onClearData: () => void;
  onShowTutorial: () => void;
}) {
  const { t, lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="glass-card sticky top-0 z-30 mx-auto mb-6 flex max-w-6xl items-center justify-between rounded-xl px-4 py-3 sm:px-6">
      {/* Left: Logo + Title (always English) */}
      <a href="/" className="flex items-center gap-2.5 no-underline">
        <img src={logoSvg} alt="logo" className="h-8 w-8 sm:h-9 sm:w-9" />
        <span className="truncate text-sm font-semibold text-white sm:text-base">
          Instagram Follow Analyzer
        </span>
      </a>

      {/* Right: Desktop actions */}
      <div className="hidden items-center gap-2 sm:flex">
        <button
          onClick={onShowTutorial}
          className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-indigo-500/30 to-violet-500/30 px-3 py-1.5 text-xs font-semibold text-indigo-200 ring-1 ring-indigo-400/30 transition-all hover:from-indigo-500/50 hover:to-violet-500/50 hover:text-white hover:ring-indigo-400/60"
          title="Help / Tutorial"
        >
          <HelpCircle size={14} /> {t.tutorialBtn}
        </button>
        <button
          onClick={() => setLang(lang === "en" ? "id" : "en")}
          className="glass-btn inline-flex items-center gap-1 text-xs font-medium"
          title={lang === "en" ? "Bahasa Indonesia" : "English"}
        >
          <FlagIcon country={lang === "en" ? "gb" : "id"} /> {lang === "en" ? "EN" : "ID"}
        </button>
        <button
          onClick={onClearData}
          className="glass-btn inline-flex items-center gap-1 text-xs"
          title={t.clearDataTitle}
        >
          <Trash2 size={14} /> {t.clearData}
        </button>
      </div>

      {/* Mobile: Hamburger */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="flex items-center justify-center sm:hidden"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? (
          <svg className="h-6 w-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile: Dropdown menu */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-white/10 bg-slate-900/95 p-3 shadow-xl backdrop-blur-xl sm:hidden">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => { onShowTutorial(); setMenuOpen(false); }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <HelpCircle size={14} /> {t.tutorialBtn}
            </button>
            <button
              onClick={() => { setLang(lang === "en" ? "id" : "en"); setMenuOpen(false); }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <FlagIcon country={lang === "en" ? "gb" : "id"} /> {lang === "en" ? "EN" : "ID"}
            </button>
            <button
              onClick={() => { onClearData(); setMenuOpen(false); }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-300/70 transition-all hover:bg-rose-500/10 hover:text-rose-300"
            >
              <Trash2 size={14} /> {t.clearData}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
