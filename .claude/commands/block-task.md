---
description: Mark task as blocked and record blocking reason
---

Block task $ARGUMENTS.

1. Verify task exists in `.ai-workspace/active/`.
2. Analyze and record blocking reason (technical problem, unclear requirements, missing resources, etc.).
3. Update task.md: status -> blocked, add blocked_at, blocked_reason.
4. Move: `mv .ai-workspace/active/{task-id} .ai-workspace/blocked/`
5. Sync to Issue if applicable.

To unblock: `mv .ai-workspace/blocked/{task-id} .ai-workspace/active/`
