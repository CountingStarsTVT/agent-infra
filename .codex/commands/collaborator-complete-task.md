---
description: Mark a task as completed and archive it to the completed directory
argument-hint: <task-id>
---

Mark task $1 as completed, update metadata, and archive to the completed directory.

**Prerequisites**:
Before executing, confirm all conditions are met:
- All workflow steps completed
- Code reviewed and approved (review.md shows approval)
- Code committed to Git
- All tests passing
**If conditions are not fully met, do not execute this command.**

Execute the following steps:

1. Verify task exists:
   ```bash
   test -f .ai-workspace/active/$1/task.md && echo "Task exists" || echo "ERROR: Task not found"
   ```

2. Read and verify task status:
   - Check all steps are marked complete
   - Check file completeness: analysis.md, plan.md, implementation.md, review.md

3. Get current time:
   ```bash
   date '+%Y-%m-%d %H:%M:%S'
   ```

4. Update task status in task.md:
   - status: completed
   - current_step: finalize
   - updated_at: current time
   - completed_at: current time

5. Add completion summary to task.md (deliverables, completion criteria).

6. Archive task:
   ```bash
   mkdir -p .ai-workspace/completed && mv .ai-workspace/active/$1 .ai-workspace/completed/
   ```

7. Verify archive succeeded:
   ```bash
   test ! -d .ai-workspace/active/$1 && echo "Removed from active" || echo "ERROR: Still in active"
   test -d .ai-workspace/completed/$1 && echo "Archived to completed" || echo "ERROR: Archive failed"
   ```

8. Inform user:
   - Task $1 has been completed and archived
   - Archive location: .ai-workspace/completed/$1/
   - To check other tasks: `/prompts:collaborator-check-task <task-id>`

**Note**: Only archive truly completed tasks. Verify all documents exist before archiving.
