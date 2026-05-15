import { NextRequest, NextResponse } from "next/server";
import { buildAnalysisPrompt, getSystemPrompt, parseAnalysisResponse } from "@/lib/ai/prompts";
import { IncidentAnalysis } from "@/lib/incidents/types";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const { logs, locale } = await request.json();

    if (!logs || typeof logs !== "string" || logs.trim().length === 0) {
      return NextResponse.json(
        { error: "日志内容不能为空" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "未配置 AI API Key，请设置 OPENAI_API_KEY、ANTHROPIC_API_KEY 或 OPENROUTER_API_KEY 环境变量" },
        { status: 500 }
      );
    }

    const prompt = buildAnalysisPrompt(logs, locale);
    const systemPrompt = getSystemPrompt(locale);

    let result: Partial<IncidentAnalysis>;

    if (process.env.OPENROUTER_API_KEY) {
      result = await callOpenRouter(apiKey, prompt, systemPrompt);
    } else if (process.env.ANTHROPIC_API_KEY) {
      result = await callAnthropic(apiKey, prompt, systemPrompt);
    } else {
      result = await callOpenAI(apiKey, prompt, systemPrompt);
    }

    const analysis: IncidentAnalysis = {
      summary: result.summary || "无法生成摘要",
      severity: result.severity || "medium",
      affectedServices: result.affectedServices || ["unknown"],
      probableRootCause: result.probableRootCause || "无法确定根因",
      evidence: result.evidence || [],
      debugSteps: result.debugSteps || [],
      recommendedFix: result.recommendedFix || "无推荐修复",
      postmortemDraft: result.postmortemDraft || "# Postmortem\n\n无法生成",
      confidence: result.confidence || 0.5,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("分析失败:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "分析失败" },
      { status: 500 }
    );
  }
}

async function callOpenAI(apiKey: string, prompt: string, systemPrompt: string): Promise<Partial<IncidentAnalysis>> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.1,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API 错误: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return parseAnalysisResponse(data.choices[0]?.message?.content || "{}");
}

async function callAnthropic(apiKey: string, prompt: string, systemPrompt: string): Promise<Partial<IncidentAnalysis>> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API 错误: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return parseAnalysisResponse(data.content[0]?.text || "{}");
}

async function callOpenRouter(apiKey: string, prompt: string, systemPrompt: string): Promise<Partial<IncidentAnalysis>> {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || "anthropic/claude-3-haiku",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.1,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API 错误: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return parseAnalysisResponse(data.choices[0]?.message?.content || "{}");
}
