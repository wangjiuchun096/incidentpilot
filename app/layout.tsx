"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { I18nProvider, useI18n, locales } from "@/lib/i18n";
import { Globe } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function Header() {
  const { locale, setLocale, t } = useI18n();

  return (
    <header className="border-b bg-white dark:bg-zinc-950">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">IncidentPilot</span>
            <span className="text-xs text-zinc-500">AI Incident Analysis</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm hover:text-blue-600">{t("nav.home")}</Link>
            <Link href="/incidents" className="text-sm hover:text-blue-600">{t("nav.incidents")}</Link>
            <Link href="/reports" className="text-sm hover:text-blue-600">{t("nav.reports")}</Link>
            <Link href="/dashboard" className="text-sm hover:text-blue-600">{t("nav.dashboard")}</Link>
          </nav>
          <div className="flex items-center gap-2 border-l pl-4">
            <Globe className="h-4 w-4 text-zinc-500" />
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as typeof locale)}
              className="text-sm bg-transparent border-none cursor-pointer focus:outline-none"
            >
              {locales.map((l) => (
                <option key={l} value={l}>
                  {l === "zh-CN" ? "中文" : "English"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-4 text-center text-sm text-zinc-500">
        IncidentPilot - Splunk Agentic Ops Hackathon 2026
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <I18nProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
