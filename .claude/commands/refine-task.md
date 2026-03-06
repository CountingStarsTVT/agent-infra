---
description: Handle code review feedback and fix issues
---

Fix review issues for task $ARGUMENTS.

1. Verify `task.md` and `review.md` exist.
2. Read review report, categorize issues (Blocker -> Major -> Minor).
3. Fix issues in priority order.
4. Run test verification by executing the `test` skill.
5. Update `implementation.md` with fix records.
6. Update task status.
7. Suggest: re-review with `/review-task` or `/commit` directly.

**Note**: Do not add extra changes. Do NOT auto-commit.
