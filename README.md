# IncidentPilot

IncidentPilot is an AI incident investigation assistant for SRE, DevOps, and backend engineering teams.

It turns raw observability data into root-cause hypotheses, evidence-backed debug steps, and postmortem drafts in minutes.

## Hackathon

This project is planned for the Splunk Agentic Ops Hackathon.

## Problem

Production incidents are expensive because engineers must jump between alerts, logs, dashboards, runbooks, and postmortem templates while under time pressure.

Common pain points:

- Logs contain useful signals mixed with noisy events.
- Junior on-call engineers need guidance from senior responders.
- Root-cause analysis is often delayed until after service recovery.
- Postmortems take additional time after the incident is resolved.
- Incident knowledge is not consistently captured for future response.

## Solution

IncidentPilot helps an on-call engineer move from raw logs to an actionable investigation plan.

The first MVP focuses on one stable flow:

```text
Paste or load incident logs
-> AI analyzes severity, impact, and likely root cause
-> System shows evidence from the logs
-> System recommends debug steps and fixes
-> System generates a postmortem draft
```

## Target Users

- SRE engineers
- DevOps engineers
- Backend engineers on-call
- Small engineering teams without mature incident response tooling
- Teams already using observability platforms such as Splunk

## MVP Features

- Incident log input
- Sample incident scenarios
- AI-generated incident summary
- Severity and affected-service detection
- Root-cause hypothesis
- Evidence mapping from logs
- Debug checklist
- Recommended fix
- Postmortem draft generation
- Analysis history

## Planned Splunk-Oriented Capabilities

- Mock Splunk query result loader
- Timeline view based on timestamped events
- Service and host metadata display
- Evidence-backed incident analysis
- Future path for Splunk API or MCP integration

## Demo Story

The initial demo uses a database connection pool exhaustion incident.

An API service begins returning HTTP 500 errors. Logs show a rising request timeout rate, database connection acquisition failures, and warning messages from the connection pool. IncidentPilot analyzes the logs, identifies database connection exhaustion as the likely root cause, recommends immediate mitigation steps, and generates a postmortem draft.

## Tech Stack

Planned stack:

- Next.js
- TypeScript
- Tailwind CSS
- LLM API for structured analysis
- Local mock data for the first demo
- Vercel for deployment

## Success Criteria

The hackathon MVP is successful if it can:

- Complete the full demo flow in under 3 minutes.
- Produce useful analysis from realistic noisy logs.
- Show why each root-cause hypothesis is supported by log evidence.
- Generate a readable incident report.
- Clearly communicate how the product can fit into an observability workflow.

## Repository Status

This repository is currently in planning and MVP setup.

