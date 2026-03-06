---
description: Review task implementation and output a code review report
agent: general
subtask: false
---

Review the task's code implementation, check quality, compliance, and test coverage, then output a review report.

Parse the task ID from `$ARGUMENTS`. If empty, respond:
"Please provide a task ID. Example: /review-task TASK-20260101-120000"
Then STOP.

1. **Verify prerequisites**

Check that these files exist:
- `.ai-workspace/active/{task-id}/task.md`
- `.ai-workspace/active/{task-id}/implementation.md`

If either is missing, respond: "Implementation report not found. Run `/implement-task {task-id}` first." Then STOP.

2. **Read implementation report**

Read implementation.md to understand: modified files, key features, test results, items flagged for attention.

3. **Execute code review**

Review the actual code changes for:
- Code quality and coding conventions
- Bugs and potential issues
- Test coverage and test quality
- Error handling and edge cases
- Performance and security concerns
- Documentation and comments
- Consistency with the technical plan

4. **Output review report**

Create `.ai-workspace/active/{task-id}/review.md` with sections:

- Review summary (reviewer, time, scope, overall verdict)
- Blocker issues (must fix)
- Major suggestions (should fix)
- Minor suggestions (nice to fix)
- Highlights and strengths
- Compliance checks
- Test review
- Security review
- Performance review
- Plan consistency check
- Final verdict: Approved / Changes requested / Major rework needed

5. **Update task status**

Update task.md: current_step: code-review, assigned_to: opencode, updated_at: {current timestamp}.

6. **Report to user**

Report issue counts by severity and overall verdict.

**Next steps (based on verdict):**
- Approved: Use `/commit` to commit changes.
- Changes requested: Use `/refine-task {task-id}` to address feedback.
- Major rework: Use `/implement-task {task-id}` to redo implementation.
