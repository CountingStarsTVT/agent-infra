---
description: Implement a task based on the technical plan
agent: general
subtask: false
---

Implement the specified task according to its technical plan, write code and tests, and output an implementation report.

Parse the task ID from `$ARGUMENTS`. If empty, respond:
"Please provide a task ID. Example: /implement-task TASK-20260101-120000"
Then STOP.

1. **Verify prerequisites**

Check that these files exist:
- `.ai-workspace/active/{task-id}/task.md`
- `.ai-workspace/active/{task-id}/plan.md`

If either is missing, respond: "Prerequisites not met. Run `/plan-task {task-id}` first." Then STOP.

2. **Read technical plan**

Read plan.md and understand: technical approach, implementation steps, files to create/modify, test strategy.

3. **Execute code implementation**

Follow the plan strictly:
- Implement code changes step by step
- Write unit tests for new code
- Run tests to verify functionality
- Update documentation and comments
- Follow project coding conventions

Do NOT deviate from the plan or add unplanned features.

4. **Run tests**

<!-- TODO: Replace with your project's test command -->
!npm test

Ensure all tests pass before continuing.

5. **Output implementation report**

Create `.ai-workspace/active/{task-id}/implementation.md` with sections:
- Modified files list (new and changed)
- Key code explanations
- Test results
- Deviations from plan (if any)
- Items for reviewer attention
- Known issues

6. **Update task status**

Update task.md: current_step: implementation, assigned_to: opencode, updated_at: {current timestamp}.

7. **Report to user**

Report file counts, test results, and output file path.

Do NOT auto-commit. Wait for code review.

**Next step:** Use `/review-task {task-id}` for code review.
