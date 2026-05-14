"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, Lightbulb, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 dark:from-zinc-900 dark:to-zinc-950">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            {t("home.title")}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            {t("home.subtitle")}
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/incidents">
              <Button size="lg">
                {t("home.startAnalysis")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg">
                {t("home.viewDashboard")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-2xl font-semibold">{t("home.features")}</h2>
          <p className="text-zinc-600 dark:text-zinc-400">{t("home.subtitle")}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <FileText className="mb-2 h-8 w-8 text-blue-600" />
              <CardTitle>{t("features.logAnalysis.title")}</CardTitle>
              <CardDescription>{t("features.logAnalysis.desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {t("features.logAnalysis.detail")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Lightbulb className="mb-2 h-8 w-8 text-amber-600" />
              <CardTitle>{t("features.rootCauseAnalysis.title")}</CardTitle>
              <CardDescription>{t("features.rootCauseAnalysis.desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {t("features.rootCauseAnalysis.detail")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Clock className="mb-2 h-8 w-8 text-green-600" />
              <CardTitle>{t("features.quickPostmortem.title")}</CardTitle>
              <CardDescription>{t("features.quickPostmortem.desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {t("features.quickPostmortem.detail")}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-zinc-50 py-16 dark:bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-semibold">{t("home.quickStart")}</h2>
            <p className="text-zinc-600 dark:text-zinc-400">{t("home.selectSample")}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="cursor-pointer transition-colors hover:border-blue-500">
              <Link href="/incidents?sample=db-connection-pool">
                <CardHeader>
                  <CardTitle className="text-base">{t("samples.dbConnectionPool")}</CardTitle>
                  <CardDescription>API 500</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-zinc-500">db-connection-pool-exhaustion.log</p>
                </CardContent>
              </Link>
            </Card>
            <Card className="cursor-pointer transition-colors hover:border-blue-500">
              <Link href="/incidents?sample=redis-timeout">
                <CardHeader>
                  <CardTitle className="text-base">{t("samples.redisTimeout")}</CardTitle>
                  <CardDescription>Login latency</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-zinc-500">redis-timeout-login-latency.log</p>
                </CardContent>
              </Link>
            </Card>
            <Card className="cursor-pointer transition-colors hover:border-blue-500">
              <Link href="/incidents?sample=env-misconfig">
                <CardHeader>
                  <CardTitle className="text-base">{t("samples.envMisconfig")}</CardTitle>
                  <CardDescription>Deployment failure</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-zinc-500">env-misconfig-deployment.log</p>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
