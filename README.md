# IncidentPilot

An AI incident investigation assistant for SRE, DevOps, and backend engineering teams.

It turns raw observability data into root-cause hypotheses, evidence-backed debug steps, and postmortem drafts in minutes.

## Features

- **Log Analysis** - Paste or upload incident logs, automatically extract key events
- **AI Root Cause Analysis** - Evidence-based root cause hypotheses with confidence scores
- **Debug Checklist** - Structured debugging steps derived from the incident
- **Postmortem Draft** - One-click generation of Markdown incident reports
- **Multi-language** - Supports Simplified Chinese and English

## Demo Scenarios

1. **Database Connection Pool Exhaustion** - API returns 500 errors
2. **Redis Timeout** - Login interface latency issues
3. **Environment Variable Misconfiguration** - Deployment failure after release

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui
- **AI**: Mock analysis (ready for OpenAI/Claude API integration)
- **i18n**: React Context-based internationalization

## Project Structure

```
app/
  page.tsx           # Landing page
  incidents/         # Incident analysis page
  reports/          # Reports page
  dashboard/         # Dashboard page
components/          # UI components (shadcn/ui)
lib/
  ai/                # AI integration (planned)
  incidents/         # Incident types, mock analysis
  i18n/              # Internationalization
  splunk/            # Mock Splunk loader (planned)
data/
  sample-logs/       # Demo incident logs
public/
  data/sample-logs/ # Web-accessible sample logs
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Language

Switch between Simplified Chinese and English using the language selector in the header.

## Hackathon

This project is submitted to **Splunk Agentic Ops Hackathon 2026**.

## License

MIT
