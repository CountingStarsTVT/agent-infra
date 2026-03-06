---
description: Mark a task as blocked and record the blocking reason
argument-hint: <task-id> [reason]
---

Mark task $1 as blocked, record the blocking reason, and move it to the blocked directory.

**When to block**:
- Compilation failure that cannot be resolved
- Test failure with unknown cause
- Dependency library has a bug
- Requirements unclear, need clarification
- Waiting for external dependency

**Do NOT block for**:
- Code review found issues -> use `/prompts:collaborator-refine-task $1`
- Implementation difficulty that can be worked through -> continue implementing

Execute the following steps:

1. Verify task exists:
   ```bash
   test -f .ai-workspace/active/$1/task.md && echo "Task exists" || echo "ERROR: Task not found"
   ```

2. Analyze and record blocking reason:
   User-provided reason: $2
   If empty, ask the user to specify the blocking reason.
   Determine: blocking type (technical/requirements/resource/decision), description, root cause, attempted solutions, help needed.

3. Get current time:
   ```bash
   date '+%Y-%m-%d %H:%M:%S'
   ```

4. Update task.md:
   - status: blocked
   - updated_at: current time
   - blocked_at: current time
   - blocked_by: codex
   - blocked_reason: brief description

5. Add "Blocking Information" section to task.md (summary, description, root cause, attempted solutions, unblock conditions).

6. Move to blocked directory:
   ```bash
   mkdir -p .ai-workspace/blocked && mv .ai-workspace/active/$1 .ai-workspace/blocked/
   ```

7. Verify move succeeded.

8. Inform user:
   - Task $1 has been marked as blocked
   - Location: .ai-workspace/blocked/$1/
   - To unblock: `mv .ai-workspace/blocked/$1 .ai-workspace/active/`
   - Then check status: `/prompts:collaborator-check-task $1`

**Note**: Blocking information should be detailed, accurate, and objective.
