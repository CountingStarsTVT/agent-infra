---
description: Review task implementation code and output a code review report
argument-hint: <task-id>
---

Review task $1 implementation code and output a code review report.

Execute the following steps:

1. Verify prerequisites:
   Check that these files exist:
   - .ai-workspace/active/$1/task.md
   - .ai-workspace/active/$1/implementation.md
   If either is missing, ask the user to complete the prerequisite steps.

2. Read context:
   - Read task.md for task description and requirements
   - Read plan.md for the technical solution
   - Read implementation.md for implementation details
   - View `git diff` for actual code changes

3. Execute code review:
   Compare plan.md against actual changes, checking:
   - Functional correctness: does the implementation match the plan?
   - Code quality: coding standards, naming, comments, complexity
   - Test coverage: are there sufficient test cases?
   - Security: injection, XSS, access control, etc.
   - Performance: algorithm complexity, resource usage
   - Edge cases: null handling, error handling

4. Output review report:
   Create .ai-workspace/active/$1/review.md containing:
   - Review summary (reviewer, time, scope, overall assessment)
   - Findings (categorized: Blocker / Major / Minor)
   - Standards compliance check
   - Security/performance review results
   - Plan consistency check
   - Conclusion and recommendation (Approved / Approved with changes / Needs major revision)

5. Update task status:
   - current_step: code-review
   - assigned_to: codex
   - updated_at: current time
   - Mark code-review as complete in workflow progress

6. Inform user:
   - Output review conclusion (approved/needs changes)
   - If changes needed: `/prompts:collaborator-refine-task $1`
   - If approved: `/prompts:collaborator-commit`

**Note**: Review against plan.md. Give specific, actionable suggestions.
