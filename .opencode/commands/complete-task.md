---
description: Mark task as completed and archive to completed directory
agent: general
subtask: false
---

Mark a task as completed, update metadata, and archive it from active to completed directory.

Parse the task ID from `$ARGUMENTS`. If empty, respond:
"Please provide a task ID. Example: /complete-task TASK-20260101-120000"
Then STOP.

1. **Verify task exists**

Check `.ai-workspace/active/{task-id}/task.md`. If not in active, check blocked and completed directories.

If not found, respond: "Task {task-id} not found." Then STOP.
If already completed, respond: "Task {task-id} is already completed." Then STOP.

2. **Validate completion prerequisites**

Verify all conditions are met:
- All workflow steps are completed
- Code review passed (review.md shows approval)
- Code is committed to Git
- All tests pass

If any condition is not met, report what is missing and STOP.

3. **Update task status**

Update task.md YAML frontmatter:
- status: completed
- current_step: finalize
- updated_at: {current timestamp}
- completed_at: {current timestamp}

Mark all workflow steps as complete. Add a completion summary section.

4. **Archive task**

!mkdir -p .ai-workspace/completed
!mv .ai-workspace/active/{task-id} .ai-workspace/completed/

Verify the move:
!test -d .ai-workspace/completed/{task-id} && echo "Archived successfully" || echo "ERROR: Archive failed"

5. **Sync to Issue (optional)**

If the task has an associated issue_number, suggest using `/sync-issue` to update the Issue.

6. **Report to user**

Report task ID, type, completion time, archive location, and deliverables summary.
