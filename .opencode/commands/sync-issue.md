---
description: Sync task progress to GitHub Issue comments
agent: general
subtask: false
---

Sync task progress summary to the associated GitHub Issue as a comment.

Parse the task ID from `$ARGUMENTS`. If empty, respond:
"Please provide a task ID. Example: /sync-issue TASK-20260101-120000"
Then STOP.

1. **Locate task file**

Search in order:
- `.ai-workspace/active/{task-id}/task.md`
- `.ai-workspace/blocked/{task-id}/task.md`
- `.ai-workspace/completed/{task-id}/task.md`

If not found, respond: "Task {task-id} not found." Then STOP.

2. **Read task information**

Extract from task.md: issue_number, title, current_step, status, timestamps.

If issue_number is missing, respond: "No issue number found in task file. Please update task.md with issue_number." Then STOP.

3. **Read context files**

Read available context files: analysis.md, plan.md, implementation.md, review.md.

4. **Generate progress summary**

Create a progress summary oriented toward project managers and stakeholders, including:
- Completed steps with timestamps and key points
- Current progress details
- Next steps
- Related file references

Keep it concise, logical, and highlight key decisions.

5. **Post to Issue**

!gh issue comment {issue-number} --body "{progress summary}"

6. **Update task metadata**

Record the sync timestamp in task.md.

7. **Report to user**

Display sync confirmation with Issue link:

!gh repo view --json owner,name -q '"https://github.com/" + .owner.login + "/" + .name + "/issues/{issue-number}"'
