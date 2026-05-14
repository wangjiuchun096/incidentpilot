"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertTriangle, Clock, TrendingUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function DashboardPage() {
  const { t } = useI18n();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold">{t("dashboard.title")}</h1>
        <p className="text-zinc-600 dark:text-zinc-400">{t("dashboard.subtitle")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.totalAnalyses")}</CardTitle>
            <Activity className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-zinc-500">{t("dashboard.thisWeek")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.highSeverity")}</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-zinc-500">{t("dashboard.thisWeek")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.avgAnalysisTime")}</CardTitle>
            <Clock className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-zinc-500">{t("dashboard.noData")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.avgConfidence")}</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-zinc-500">{t("dashboard.noData")}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.recentAnalyses")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-500">
              {t("dashboard.noData")}。{" "}
              <a href="/incidents" className="text-blue-600 hover:underline">
                {t("nav.incidents")}
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
