---
name: plan-task
description: >
  Design a technical solution for a task and output a detailed
  implementation plan. Triggered when the user requests a design
  or technical plan. Argument: task-id.
---

# Design Technical Solution

## Steps

1. Find the task file, read `analysis.md`.
2. Design solutions (compare multiple approaches, select optimal).
3. Output plan document to `plan.md`.
4. Update task status.
5. Inform user this is a **human review checkpoint**. After approval, execute the `implement-task` skill.
