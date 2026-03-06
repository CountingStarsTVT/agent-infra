---
description: Address code review feedback and fix issues
agent: general
subtask: false
---

Process code review feedback, fix identified issues, and prepare for re-review.

Parse the task ID from `$ARGUMENTS`. If empty, respond:
"Please provide a task ID. Example: /refine-task TASK-20260101-120000"
Then STOP.

1. **Verify prerequisites**

Check that these files exist:
- `.ai-workspace/active/{task-id}/task.md`
- `.ai-workspace/active/{task-id}/review.md` (or review-supplement.md)
- `.ai-workspace/active/{task-id}/implementation.md`

If any is missing, respond: "Review report not found. Run `/review-task {task-id}` first." Then STOP.

2. **Read review report**

Extract all issues from the review report, categorized by severity:
- Blocker issues (must fix)
- Major suggestions (should fix)
- Minor suggestions (nice to fix)

3. **Plan fixes**

Create a prioritized fix list:
1. Fix all blocker issues first
2. Then fix major suggestions
3. Then consider minor suggestions

4. **Execute code fixes**

For each issue:
- Read the related file and understand the context
- Apply the fix according to the review suggestion
- Ensure the fix does not introduce new problems

5. **Run tests**

<!-- TODO: Replace with your project's test command -->
!npm test

Ensure all tests pass after fixes.

6. **Update task status**

Update task.md: current_step: refinement, assigned_to: opencode, updated_at: {current timestamp}.

7. **Create refinement report**

Create `.ai-workspace/active/{task-id}/refinement-report.md` documenting:
- Fixed blocker issues
- Fixed major suggestions
- Adopted minor suggestions
- Unfixed items with justification
- Test results after fixes

8. **Report to user**

Report fix counts by severity and suggest next steps.

**Next steps:**
- Re-review: Use `/review-task {task-id}` for another review pass.
- If fixes are minor and confident: Use `/commit` directly.
