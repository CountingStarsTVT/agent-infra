---
description: Implement a task based on the technical plan, write code and tests
argument-hint: <task-id>
---

Implement task $1 based on the technical plan. Write code and tests, then output an implementation report.

Execute the following steps:

1. Verify prerequisites:
   Check that these files exist:
   - .ai-workspace/active/$1/task.md
   - .ai-workspace/active/$1/plan.md
   If either is missing, ask the user to complete the prerequisite steps.

2. Read the technical plan:
   Carefully read .ai-workspace/active/$1/plan.md to understand:
   - Technical solution and implementation strategy
   - Detailed implementation steps
   - Files to create/modify
   - Test strategy

3. Execute code implementation:
   Follow the steps in plan.md:
   - Implement feature code per the plan
   - Write comprehensive unit tests
   - Follow project coding standards (refer to AGENTS.md)
   - When modifying files with copyright headers, run `date +%Y` and update the year

4. Run test verification:
   Execute the project's test workflow to confirm all tests pass.
   Refer to the `test` skill for project-specific test commands.

5. Output implementation report:
   Create .ai-workspace/active/$1/implementation.md containing:
   - Modified files list (new and changed files)
   - Key code explanations
   - Test results (test count, pass rate, output)
   - Deviations from plan (if any)
   - Items for reviewer attention

6. Update task status:
   - current_step: implementation
   - assigned_to: codex
   - updated_at: current time
   - Mark implementation as complete in workflow progress

7. Inform user:
   - Output modified file count, new file count, tests passed
   - Suggest next step: `/prompts:collaborator-review-task $1`

**Note**: Strictly follow plan.md. Do NOT auto-commit.
