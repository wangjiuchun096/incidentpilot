"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import zhCN from "./zh-CN.json";
import en from "./en.json";

type Translations = typeof zhCN;
type Locale = "zh-CN" | "en";

const translations: Record<Locale, Translations> = {
  "zh-CN": zhCN,
  en: en,
};

interface I18nContextType {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }

  return typeof current === "string" ? current : path;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("zh-CN");

  const t = useCallback(
    (key: string): string => {
      return getNestedValue(translations[locale] as unknown as Record<string, unknown>, key);
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

export const locales: Locale[] = ["zh-CN", "en"];
export type { Locale };
