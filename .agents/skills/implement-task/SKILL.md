---
name: implement-task
description: >
  Implement a task based on the technical plan, write code and tests,
  and output an implementation report. Triggered when the user requests
  task implementation or coding. Argument: task-id.
---

# Implement Task

## Steps

1. Verify `task.md` and `plan.md` exist.
2. Read the technical plan.
3. Execute code implementation following `plan.md`. Write unit tests.
4. Run test verification by executing the `test` skill.
5. Output implementation report to `implementation.md`.
6. Update task status.
7. Suggest next step: execute the `review-task` skill.

**Note**: Strictly follow `plan.md`. Do NOT auto-commit.
