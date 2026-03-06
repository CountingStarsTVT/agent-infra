---
description: Create a task from natural language description and perform requirement analysis
---

Create a task from user's description. Argument: $ARGUMENTS

**CRITICAL**: Only produce task.md and analysis.md. Do NOT write business code.

1. Parse description: extract title (English, max 50 chars), type (feature/bugfix/refactor/docs/chore), workflow.
2. Get timestamp: `date +%Y%m%d-%H%M%S`
3. Create task directory: `.ai-workspace/active/TASK-{timestamp}/`
4. Create task.md from `.agents/templates/task.md`.
5. Execute requirement analysis (read-only, no business code).
6. Output analysis to `.ai-workspace/active/TASK-{timestamp}/analysis.md`.
7. Update task status.
8. Suggest next step: `/plan-task {task-id}`.

**STOP**: Do not continue to subsequent steps.
