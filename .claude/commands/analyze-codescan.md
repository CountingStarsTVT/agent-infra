---
description: Analyze Code Scanning alert and create remediation task
---

Analyze Code Scanning alert #$ARGUMENTS.

1. Fetch alert: `gh api repos/{owner}/{repo}/code-scanning/alerts/$ARGUMENTS`.
2. Create task directory.
3. Locate source code from alert location, analyze why the rule triggered.
4. Assess security risk.
5. Output analysis to `analysis.md`.
6. Suggest: `/plan-task {task-id}` to fix, or `/close-codescan` if not applicable.
