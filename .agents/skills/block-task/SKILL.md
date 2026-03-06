---
name: block-task
description: >
  Mark a task as blocked and record the blocking reason, moving it
  to the blocked directory. Triggered when the user reports a task
  is blocked. Arguments: task-id, optional blocking reason.
---

# Block Task

## Steps

1. Verify task exists.
2. Analyze and record blocking reason.
3. Update task.md: status -> blocked.
4. Move to `.ai-workspace/blocked/`.

To unblock: `mv .ai-workspace/blocked/<task-id> .ai-workspace/active/`
