---
name: analyze-dependabot
description: >
  Analyze a Dependabot security alert, assess security risk, and
  create a remediation task. Triggered when the user requests
  Dependabot alert analysis. Argument: alert number.
---

# Analyze Dependabot Security Alert

## Steps

1. Fetch alert info:
   ```bash
   gh api repos/{owner}/{repo}/dependabot/alerts/<alert-number>
   ```
2. Create task directory and files.
3. Analyze affected scope (search for dependency usage in project).
4. Assess security risk (exploitability, attack vectors).
5. Output analysis document to `analysis.md`.
6. Suggest next step: `plan-task` skill or `close-dependabot` skill.

**Note**: Critical/High -> handle immediately. Medium -> plan. Low -> may defer.
