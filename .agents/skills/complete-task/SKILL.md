---
name: complete-task
description: >
  Mark a task as completed and archive it to the completed directory.
  Triggered when the user requests task completion or archiving.
  Argument: task-id.
---

# Complete Task

## Prerequisites

All workflow steps completed, code reviewed and approved, code committed, all tests passing.

## Steps

1. Verify task exists and is complete.
2. Update task.md: status -> completed, add completed_at timestamp.
3. Archive: `mv .ai-workspace/active/<task-id> .ai-workspace/completed/`
4. Verify archive succeeded.
