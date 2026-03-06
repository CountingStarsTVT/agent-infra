---
description: Fix issues found during code review
argument-hint: <task-id>
---

Handle code review feedback for task $1 and fix the issues found during review.

Execute the following steps:

1. Verify prerequisites:
   Check that these files exist:
   - .ai-workspace/active/$1/task.md
   - .ai-workspace/active/$1/review.md
   If either is missing, ask the user to complete the prerequisite steps.

2. Read the review report:
   Carefully read .ai-workspace/active/$1/review.md and organize:
   - Blocker issues (must fix)
   - Major issues (should fix)
   - Minor issues (optional fix)

3. Fix issues by priority (Blocker -> Major -> Minor):
   - Understand root cause of each issue and implement fix
   - Run related tests after each fix to verify
   - Record the fix approach for each issue

4. Run test verification:
   Execute the project's test workflow.
   Refer to the `test` skill for project-specific test commands.
   Ensure all tests pass, including new regression tests.

5. Update implementation report:
   Append a "Fix Records" section to .ai-workspace/active/$1/implementation.md:
   - List each fixed issue and its fix approach
   - New or modified files
   - Test verification results

6. Update task status:
   - current_step: refinement
   - assigned_to: codex
   - updated_at: current time

7. Inform user:
   - Output fixed issue count (by severity level)
   - Suggest re-review: `/prompts:collaborator-review-task $1`
   - Or commit directly: `/prompts:collaborator-commit`

**Note**: Only fix issues from the review report. Do not add extra changes. Do NOT auto-commit.
