"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { sampleLogs, loadSampleLog } from "@/lib/incidents/sample-logs";
import { analyzeIncident } from "@/lib/incidents/mock-analysis";
import { IncidentAnalysis } from "@/lib/incidents/types";
import { useI18n } from "@/lib/i18n";
import { AlertCircle, CheckCircle2, Clock, FileText, Loader2, Lightbulb, Zap } from "lucide-react";

async function callAnalyzeAPI(logs: string, locale: string): Promise<IncidentAnalysis> {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ logs, locale }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "分析失败");
  }

  return response.json();
}

function IncidentsContent() {
  const { t, locale } = useI18n();
  const searchParams = useSearchParams();
  const [logs, setLogs] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<IncidentAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sample = searchParams.get("sample");
    if (sample) {
      const sampleLog = sampleLogs.find((s) => s.id === sample);
      if (sampleLog) {
        loadSampleLog(sampleLog.filename).then(setLogs);
      }
    }
  }, [searchParams]);

  const handleAnalyze = async () => {
    if (!logs.trim()) return;
    setAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      let analysis: IncidentAnalysis;
      try {
        analysis = await callAnalyzeAPI(logs, locale);
      } catch {
        analysis = await analyzeIncident(logs);
      }
      setResult(analysis);
    } catch {
      setError(t("common.error"));
    } finally {
      setAnalyzing(false);
    }
  };

  const handleLoadSample = async (sample: (typeof sampleLogs)[0]) => {
    const content = await loadSampleLog(sample.filename);
    setLogs(content);
    setResult(null);
    setError(null);
  };

  const severityColors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-amber-100 text-amber-800 border-amber-200",
    low: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5" />
              {t("incidents.logInput")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {sampleLogs.map((sample) => (
                <Button
                  key={sample.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleLoadSample(sample)}
                >
                  {sample.name}
                </Button>
              ))}
            </div>
            <Textarea
              placeholder={t("incidents.pasteLogs")}
              value={logs}
              onChange={(e) => setLogs(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
            />
            <Button
              onClick={handleAnalyze}
              disabled={!logs.trim() || analyzing}
              className="w-full"
            >
              {analyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("incidents.analyzing")}
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  {t("incidents.analyze")}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {analyzing && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="mt-4 text-zinc-600">{t("common.loading")}</p>
            </CardContent>
          </Card>
        )}

        {result && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("incidents.analysisResult")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className={severityColors[result.severity]}>
                    {t("incidents.severity")}: {t(`severity.${result.severity}`).toUpperCase()}
                  </Badge>
                  <Badge variant="outline">
                    {t("incidents.confidence")}: {Math.round(result.confidence * 100)}%
                  </Badge>
                </div>

                <div>
                  <h3 className="mb-1 font-medium">{t("incidents.summary")}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{result.summary}</p>
                </div>

                <div>
                  <h3 className="mb-1 font-medium">{t("incidents.affectedServices")}</h3>
                  <div className="flex flex-wrap gap-1">
                    {result.affectedServices.map((service) => (
                      <Badge key={service} variant="secondary">{service}</Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-medium">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    {t("incidents.rootCause")}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{result.probableRootCause}</p>
                </div>

                <div>
                  <h3 className="mb-2 font-medium">{t("incidents.evidence")}</h3>
                  <div className="space-y-2">
                    {result.evidence.map((e, i) => (
                      <Alert key={i} className="py-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <AlertDescription className="text-xs font-mono">{e}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-medium">
                    <Clock className="h-4 w-4 text-blue-500" />
                    {t("incidents.debugSteps")}
                  </h3>
                  <ol className="space-y-2">
                    {result.debugSteps.map((step, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                          {i + 1}
                        </span>
                        <span className="text-zinc-600 dark:text-zinc-400">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-2 font-medium">{t("incidents.recommendedFix")}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{result.recommendedFix}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-2 font-medium">{t("incidents.postmortemDraft")}</h3>
                  <Button variant="outline" size="sm" className="mb-2">
                    {t("incidents.copyMarkdown")}
                  </Button>
                  <pre className="max-h-[300px] overflow-auto rounded-lg bg-zinc-100 p-4 text-xs dark:bg-zinc-800">
                    {result.postmortemDraft}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {!result && !analyzing && !error && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-zinc-300" />
              <p className="mt-4 text-zinc-500">{t("incidents.noResult")}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function IncidentsPage() {
  const { t } = useI18n();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold">{t("incidents.title")}</h1>
        <p className="text-zinc-600 dark:text-zinc-400">{t("incidents.subtitle")}</p>
      </div>

      <Suspense fallback={
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="mt-4 text-zinc-600">{t("common.loading")}</p>
          </CardContent>
        </Card>
      }>
        <IncidentsContent />
      </Suspense>
    </div>
  );
}
