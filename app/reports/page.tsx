"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function ReportsPage() {
  const { t } = useI18n();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold">{t("reports.title")}</h1>
        <p className="text-zinc-600 dark:text-zinc-400">{t("reports.subtitle")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <FileText className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle className="text-base">{t("reports.noHistory")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-500">{t("reports.noHistoryDetail")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
