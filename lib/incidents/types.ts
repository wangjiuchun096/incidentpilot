export interface IncidentAnalysis {
  summary: string;
  severity: "high" | "medium" | "low";
  affectedServices: string[];
  probableRootCause: string;
  evidence: string[];
  debugSteps: string[];
  recommendedFix: string;
  postmortemDraft: string;
  confidence: number;
  timestamp: string;
}

export interface SampleLog {
  id: string;
  name: string;
  description: string;
  filename: string;
}
