---
name: check-task
description: >
  View a task's current status, progress, and context files.
  Triggered when the user requests task status check.
  Argument: task-id.
---

# Check Task Status

## Steps

1. Find task file (search active/blocked/completed directories).
2. Read task.md metadata.
3. Check context files: analysis.md, plan.md, implementation.md, review.md.
4. Output status report with next step suggestions.
