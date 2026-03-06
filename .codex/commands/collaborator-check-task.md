---
description: Check a task's current status, progress, and context files
argument-hint: <task-id>
---

Check the current status, progress, and context files for task $1.

Execute the following steps:

1. Find the task file:
   Search in order:
   - .ai-workspace/active/$1/task.md (priority)
   - .ai-workspace/blocked/$1/task.md
   - .ai-workspace/completed/$1/task.md
   If not found, inform the user the task does not exist.

2. Read task metadata:
   Extract: id, type, workflow, status, current_step, assigned_to, created_at, updated_at.

3. Check context files:
   - analysis.md - Requirement analysis
   - plan.md - Technical plan
   - implementation.md - Implementation report
   - review.md - Review report

4. Output status report:
   ```
   Task Status Report

   **Basic Info**: Task ID, title, type, created time
   **Current Status**: Workflow, current step, assignee
   **Workflow Progress**: Status of each step
   **Context Files**: Existence status of each file
   **Next Step Suggestion**: Based on current status
   ```

**Next step rules**:
- Requirement analysis complete -> `/prompts:collaborator-plan-task $1`
- Technical plan complete -> Human review checkpoint, then `/prompts:collaborator-implement-task $1`
- Implementation complete -> `/prompts:collaborator-review-task $1`
- Review approved -> `/prompts:collaborator-commit`
- Review needs changes -> `/prompts:collaborator-refine-task $1`
- Task blocked -> Show blocking reason and unblock conditions
