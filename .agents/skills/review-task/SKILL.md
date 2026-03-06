---
name: review-task
description: >
  Review task implementation code and output a code review report.
  Triggered when the user requests code review. Argument: task-id.
---

# Code Review

## Steps

1. Verify `task.md` and `implementation.md` exist.
2. Read context, view `git diff`.
3. Execute code review (functionality, quality, tests, security, performance, edge cases).
4. Output review report to `review.md` (categorized: Blocker / Major / Minor).
5. Update task status.
6. Suggest next step: `refine-task` skill or `commit` skill.
