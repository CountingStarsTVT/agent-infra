---
description: Analyze GitHub Issue and create task with requirement analysis
---

Analyze GitHub Issue #$ARGUMENTS.

1. Fetch Issue info: `gh issue view $ARGUMENTS --json number,title,body,labels`.
2. Generate task ID with timestamp.
3. Create task directory from `.agents/templates/task.md`.
4. Execute requirement analysis (read-only, no business code):
   - Understand requirements
   - Search related code
   - Analyze impact scope
   - Identify risks and dependencies
   - Estimate effort
5. Output analysis to `analysis.md`.
6. Update task status.
7. Suggest next step: `/plan-task {task-id}`.

**Note**: Do NOT write or modify business code. Analysis only.
