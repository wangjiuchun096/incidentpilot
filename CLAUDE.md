# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IncidentPilot is an AI incident investigation assistant for SRE, DevOps, and backend engineering teams. It analyzes raw observability data (logs, alerts) and generates root-cause hypotheses, evidence-backed debug steps, and postmortem drafts.

**Core MVP flow**: Paste/load incident logs → AI analyzes severity, impact, root cause → Evidence mapping → Debug checklist → Postmortem draft generation

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **AI**: OpenAI / Claude / Gemini via API
- **Database**: Supabase Postgres or local SQLite (for analysis history)
- **Deployment**: Vercel

## Key Architecture Decisions

### Directory Structure (per hackathon plan)
```
app/
  page.tsx           # Landing/entry
  incidents/         # Incident analysis pages
  reports/           # Postmortem reports
  dashboard/         # Analytics dashboard
  api/               # API routes
components/          # Reusable UI components
lib/
  ai/                # LLM integration, prompts, response parsing
  incidents/         # Incident data models, analysis logic
  splunk/            # Mock Splunk data loader, query formatting
  reports/           # Postmortem generation
data/
  sample-logs/       # Demo incident logs (db-connection-pool-exhaustion.log exists)
```

### AI Response Schema
The incident analysis returns a structured JSON:
```json
{
  "summary": "Brief description of the incident",
  "severity": "high|medium|low",
  "affectedServices": ["service1", "service2"],
  "probableRootCause": "Root cause hypothesis",
  "evidence": ["Log excerpt 1", "Log excerpt 2"],
  "debugSteps": ["Step 1", "Step 2"],
  "recommendedFix": "Fix recommendation",
  "postmortemDraft": "Markdown postmortem template"
}
```

### Sample Incident Scenarios
Three stable demos are planned:
1. **Database connection pool exhaustion** → `data/sample-logs/db-connection-pool-exhaustion.log` (exists, ready for use)
2. Redis timeout causing login latency
3. Environment variable misconfiguration after deployment

### Splunk Integration Path
- Phase 2 (2026-05-25 to 2026-05-31) adds mock Splunk query results
- Future: Real Splunk API or MCP integration
- Mock data includes: timestamp, service, host, source, message fields

## Development Commands

Not yet initialized — project scaffold scheduled for 2026-05-14. Expected commands once created:

```bash
npm install              # Install dependencies
npm run dev              # Start development server
npm run build            # Production build
npm run lint             # Run ESLint
npm test                 # Run tests
npm test -- --testNamePattern="test name"  # Run single test
```

## Demo Requirements

- Complete demo flow in under 3 minutes
- Analysis must cite specific log evidence (not generic conclusions)
- Generate readable incident report
- Confidence scores and evidence mapping required for Splunk theme alignment

## Sensitive Data

Never commit API keys, tokens, or credentials. Use environment variables for LLM API keys and database connections.

## Language

This project uses Chinese as the primary language for communication with the user. All responses, explanations, and documentation should be in Chinese unless the user explicitly requests otherwise.
