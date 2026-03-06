---
description: Analyze Dependabot security alert and create remediation task
---

Analyze Dependabot alert #$ARGUMENTS.

1. Fetch alert: `gh api repos/{owner}/{repo}/dependabot/alerts/$ARGUMENTS`.
2. Create task directory.
3. Analyze affected scope: find dependency usage in project.
4. Assess security risk (exploitability, attack vectors, impact).
5. Output analysis to `analysis.md`.
6. Suggest: `/plan-task {task-id}` to fix, or `/close-dependabot` if not applicable.

Critical/High -> handle immediately. Medium -> plan. Low -> may defer.
