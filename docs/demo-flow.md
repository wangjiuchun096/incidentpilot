# IncidentPilot Demo Flow

## Product Name

IncidentPilot

## One-Line Pitch

IncidentPilot turns raw observability data into root-cause hypotheses, debug steps, and postmortem drafts in minutes.

## Core Demo Flow

```text
Load sample incident logs
-> Run AI incident analysis
-> Review severity, impact, root cause, and evidence
-> Follow recommended debug steps
-> Generate postmortem draft
```

## Demo Scenario

Scenario: Database connection pool exhaustion causes API 500 errors.

Narrative:

1. An on-call engineer receives an alert that checkout API errors are increasing.
2. The engineer loads the relevant logs into IncidentPilot.
3. IncidentPilot identifies the affected service, time window, and severity.
4. IncidentPilot highlights evidence from the logs:
   - HTTP 500 responses on checkout requests
   - Database connection acquisition timeout
   - Connection pool saturation warnings
   - Request latency spikes
5. IncidentPilot proposes the likely root cause.
6. IncidentPilot recommends immediate mitigation steps.
7. IncidentPilot generates a postmortem draft.

## Expected AI Output Shape

```json
{
  "summary": "Checkout API is returning elevated HTTP 500 errors because database connections cannot be acquired from the pool.",
  "severity": "high",
  "affectedServices": ["checkout-api", "postgres-primary"],
  "probableRootCause": "Database connection pool exhaustion",
  "evidence": [
    "checkout-api returned HTTP 500 for checkout requests",
    "connection acquisition timed out after 30000ms",
    "HikariPool reported active connections at max capacity"
  ],
  "debugSteps": [
    "Check current database connection count",
    "Inspect recent deploys for missing connection cleanup",
    "Review slow queries and transaction duration",
    "Temporarily raise pool size only if database capacity allows"
  ],
  "recommendedFix": "Identify and fix the connection leak or long-running transactions before increasing pool limits.",
  "postmortemDraft": "Draft incident report with impact, timeline, root cause, mitigation, and follow-up actions."
}
```

## Demo Video Outline

Target length: 2 to 3 minutes.

1. Problem: Incident response is slowed by fragmented logs, dashboards, and postmortem work.
2. Product: IncidentPilot analyzes observability data and generates evidence-backed response guidance.
3. Input: Load a noisy checkout-api incident log.
4. Analysis: Show severity, affected service, likely root cause, and evidence.
5. Action: Show debug steps and recommended fix.
6. Report: Generate postmortem draft.
7. Closing: Explain future Splunk integration path.

## Submission Positioning

Emphasize:

- Incident response
- Observability data
- Agentic operations
- Evidence-backed root-cause analysis
- Faster MTTR
- Postmortem automation

Avoid positioning it as:

- A generic chatbot
- A basic log summarizer
- A production auto-remediation tool

