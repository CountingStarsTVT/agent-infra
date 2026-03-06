---
description: Mark task as blocked and record the blocking reason
agent: general
subtask: false
---

Mark a task as blocked when it cannot proceed, record the detailed reason, and move it to the blocked directory.

Parse the task ID from `$ARGUMENTS`. If empty, respond:
"Please provide a task ID. Example: /block-task TASK-20260101-120000"
Then STOP.

1. **Verify task exists**

Check `.ai-workspace/active/{task-id}/task.md`.
If not found, respond: "Task {task-id} not found in active directory." Then STOP.

2. **Analyze blocking reason**

Document:
- What specific problem was encountered
- At which step the problem occurred
- Root cause analysis
- Solutions already attempted and why they failed
- What help or resources are needed
- Estimated time to resolve

3. **Update task status**

Update task.md YAML frontmatter:
- status: blocked
- updated_at: {current timestamp}
- blocked_at: {current timestamp}
- blocked_by: opencode
- blocked_reason: {brief description}

Add a "Blocking Information" section to task.md with: summary, problem description, root cause, attempted solutions, needed help, unblocking conditions, fallback plans.

4. **Move to blocked directory**

!mkdir -p .ai-workspace/blocked
!mv .ai-workspace/active/{task-id} .ai-workspace/blocked/

Verify the move:
!test -d .ai-workspace/blocked/{task-id} && echo "Moved to blocked" || echo "ERROR: Move failed"

5. **Sync to Issue (optional)**

If the task has an associated issue, suggest using `/sync-issue` to update it.

6. **Report to user**

Report task ID, blocking step, reason, and what help is needed.

**To unblock:** Resolve the issue, then move the task back:
```
mv .ai-workspace/blocked/{task-id} .ai-workspace/active/
```
Then use `/check-task {task-id}` to continue.
