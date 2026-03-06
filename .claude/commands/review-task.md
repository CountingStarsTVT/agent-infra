---
description: Review task implementation and output code review report
---

Review the implementation of task $ARGUMENTS.

1. Verify `task.md` and `implementation.md` exist.
2. Read implementation report and view `git diff`.
3. Execute thorough code review:
   - Code quality and conventions
   - Bugs and potential issues
   - Test coverage and quality
   - Error handling
   - Performance and security
   - Consistency with plan
4. Output review report to `review.md` with severity levels:
   - Blocker: Must fix before merge
   - Major: Should fix
   - Minor: Nice to have
5. Update task status.
6. Suggest next step based on result:
   - No blockers: `/commit`
   - Has issues: `/refine-task {task-id}`
