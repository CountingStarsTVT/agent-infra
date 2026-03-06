---
name: create-task
description: >
  Create a task from a natural language description and perform
  requirement analysis. Triggered when the user describes a new
  feature, bug, or improvement. Argument: task description text.
---

# Create Task

**Boundary**: Only produce task.md and analysis.md. Do NOT write business code.

## Steps

1. Get current timestamp, parse user description (title, type, workflow).
2. Create task directory based on `.agents/templates/task.md`.
3. Execute requirement analysis (analysis only, no business code).
4. Output analysis document to `analysis.md`.
5. Update task status, mark requirement-analysis as complete.
6. Suggest next step: execute the `plan-task` skill.

**STOP**: Stop immediately after completion. Do not continue to subsequent steps.
