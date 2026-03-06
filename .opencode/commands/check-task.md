---
description: Check task status and progress
agent: general
subtask: false
---

Display the current status, progress, and context files for a specified task.

Parse the task ID from `$ARGUMENTS`. If empty, respond:
"Please provide a task ID. Example: /check-task TASK-20260101-120000"
Then STOP.

1. **Locate task file**

Search in order:
- `.ai-workspace/active/{task-id}/task.md`
- `.ai-workspace/blocked/{task-id}/task.md`
- `.ai-workspace/completed/{task-id}/task.md`

If not found, respond: "Task {task-id} not found." Then STOP.

2. **Check context files**

Check which of these files exist:
- `analysis.md` - Requirement analysis
- `plan.md` - Technical plan
- `implementation.md` - Implementation report
- `review.md` - Review report
- `refinement-report.md` - Refinement report

3. **Analyze current state**

From the task file and context files, determine:
- Current workflow step
- Completed steps vs pending steps
- Current assignee
- Whether waiting for human review

4. **Output status report**

Display a formatted status report including:
- Basic info: task ID, title, type, issue number, timestamps
- Current state: workflow, step, assignee, status
- Workflow progress with step completion indicators
- Context files with existence status and sizes
- File paths
- Next step suggestion based on current state

Provide specific next-step command suggestions based on the current workflow step.
