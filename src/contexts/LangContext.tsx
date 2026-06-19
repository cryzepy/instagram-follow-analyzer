import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Translations } from "../translations";
import { en, id } from "../translations";

type Lang = "en" | "id";

interface LangContextValue {
  lang: Lang;
  t: Translations;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "ig-analyzer:lang";

function getInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "id") return stored;
  } catch { /* ignore */ }
  // Detect browser/device language — default to Indonesian if "id"
  const browserLang = navigator.language?.slice(0, 2);
  if (browserLang === "id") return "id";
  return "en";
}

const MAP: Record<Lang, Translations> = { en, id };

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  }, []);

  return (
    <LangContext.Provider value={{ lang, t: MAP[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
