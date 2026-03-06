---
description: Sync task progress to Pull Request comments
agent: general
subtask: false
---

Sync task progress summary to the associated Pull Request as a comment.

Parse the task ID from `$ARGUMENTS`. If empty, respond:
"Please provide a task ID. Example: /sync-pr TASK-20260101-120000"
Then STOP.

1. **Locate task file**

Search in order:
- `.ai-workspace/active/{task-id}/task.md`
- `.ai-workspace/blocked/{task-id}/task.md`
- `.ai-workspace/completed/{task-id}/task.md`

If not found, respond: "Task {task-id} not found." Then STOP.

2. **Read task information**

Extract from task.md: PR number, title, current_step, status, timestamps, issue_number.

If pr_number is missing, respond: "No PR number found in task file. Please update task.md with pr_number." Then STOP.

3. **Read context files**

Read available context files: analysis.md, plan.md, implementation.md, review.md.

4. **Generate progress summary**

Create a progress summary oriented toward code reviewers, including:
- Completed steps with timestamps and key points
- Current progress details
- Next steps
- Technical highlights and key decisions
- Links to task documents

5. **Post to PR**

!gh pr comment {pr-number} --body "{progress summary}"

6. **Update task metadata**

Record the sync timestamp in task.md.

7. **Report to user**

Display sync confirmation with PR link.
