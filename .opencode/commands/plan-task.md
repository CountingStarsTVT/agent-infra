---
description: Design a technical plan for a task
agent: general
subtask: false
---

Design a technical plan for the specified task and output a detailed implementation plan.

Parse the task ID from `$ARGUMENTS`. If empty, respond:
"Please provide a task ID. Example: /plan-task TASK-20260101-120000"
Then STOP.

1. **Locate task file**

Search in order:
- `.ai-workspace/active/{task-id}/task.md`
- `.ai-workspace/blocked/{task-id}/task.md`
- `.ai-workspace/completed/{task-id}/task.md`

If not found, respond: "Task {task-id} not found." Then STOP.

2. **Read requirement analysis**

Read `.ai-workspace/{status}/{task-id}/analysis.md`.
If not found, respond: "Analysis document not found. Run `/analyze-issue` or `/create-task` first." Then STOP.

3. **Understand the problem**

- Review analysis.md to understand the root cause and impact
- Identify technical constraints
- Identify special requirements (security, performance, backward compatibility)

4. **Design the solution**

- Propose multiple viable approaches
- Compare pros and cons of each approach
- Select the best approach with justification
- Define detailed implementation steps
- List files to create/modify
- Design verification strategy (tests, validation)
- Assess impact (performance, security, compatibility)
- Define risk controls and rollback plan

5. **Output plan document**

Create `.ai-workspace/{status}/{task-id}/plan.md` with sections: decision rationale, technical approach, implementation steps, file list, verification strategy, impact assessment, risk controls.

6. **Update task status**

Update task.md: current_step: technical-design, assigned_to: opencode, updated_at: {current timestamp}.

7. **Report to user**

Report the plan summary, output file path, and note this is a human review checkpoint.

**Next step:** Review the plan, then use `/implement-task {task-id}` to begin implementation.
