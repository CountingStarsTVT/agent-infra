---
description: Mark task completed and archive to completed directory
---

Complete and archive task $ARGUMENTS.

1. Verify task exists in `.ai-workspace/active/`.
2. Check all prerequisites: workflow steps complete, code reviewed, code committed, tests passing.
3. Update task.md: status -> completed, add completed_at timestamp.
4. Archive: `mv .ai-workspace/active/{task-id} .ai-workspace/completed/`
5. Verify archive succeeded.
