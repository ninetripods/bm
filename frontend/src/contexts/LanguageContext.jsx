import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { UI } from "../lib/i18n";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved =
      typeof window !== "undefined"
        ? window.localStorage.getItem("bm_lang")
        : null;
    return saved === "cn" ? "cn" : "en";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("bm_lang", lang);
    document.documentElement.lang = lang === "cn" ? "zh" : "en";
  }, [lang]);

  const toggle = useCallback(
    () => setLang((l) => (l === "en" ? "cn" : "en")),
    []
  );

  const value = useMemo(
    () => ({ lang, setLang, toggle, t: UI[lang] }),
    [lang, toggle]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
};
