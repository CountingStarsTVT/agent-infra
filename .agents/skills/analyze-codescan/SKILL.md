---
name: analyze-codescan
description: >
  Analyze a Code Scanning (CodeQL) alert, assess security risk,
  and create a remediation task. Triggered when the user requests
  code scanning alert analysis. Argument: alert number.
---

# Analyze Code Scanning Alert

## Steps

1. Fetch alert info:
   ```bash
   gh api repos/{owner}/{repo}/code-scanning/alerts/<alert-number>
   ```
2. Create task directory and files.
3. Locate source code from alert location, analyze why the rule triggered.
4. Assess security risk (exploitability, attack vectors).
5. Output analysis document to `analysis.md`.
6. Suggest next step: `plan-task` skill or `close-codescan` skill.

**Note**: Critical/High -> handle immediately. Medium -> plan. Low -> may defer.
