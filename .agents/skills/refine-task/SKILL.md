---
name: refine-task
description: >
  Handle code review feedback and fix issues found during review.
  Triggered when the user requests fixing review issues.
  Argument: task-id.
---

# Fix Review Issues

## Steps

1. Verify `task.md` and `review.md` exist.
2. Read review report, fix issues by priority (Blocker -> Major -> Minor).
3. Run test verification by executing the `test` skill.
4. Update `implementation.md`, append fix records.
5. Update task status.
6. Suggest re-review or direct commit.

**Note**: Do not add extra changes. Do NOT auto-commit.
