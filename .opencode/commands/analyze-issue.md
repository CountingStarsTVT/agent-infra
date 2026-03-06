---
description: Analyze a GitHub Issue and create a requirement analysis document
agent: general
subtask: false
---

Analyze a specified GitHub Issue, create a task, and output a requirement analysis document.

Parse the issue number from `$ARGUMENTS`. If empty, respond:
"Please provide an issue number. Example: /analyze-issue 207"
Then STOP.

1. **Fetch Issue information**

!gh issue view $ARGUMENTS --json number,title,body,labels

If the Issue does not exist, respond: "Issue #$ARGUMENTS not found." Then STOP.

2. **Check for existing task**

Search `.ai-workspace/active/` for a task already linked to this Issue. If found, ask whether to re-analyze or use the existing analysis.

3. **Create task directory and file**

!date -u +"%Y%m%d-%H%M%S"

Create directory: `.ai-workspace/active/TASK-{yyyyMMdd-HHmmss}/`
Create task.md from `.agents/templates/task.md` with issue_number field set.

4. **Perform requirement analysis**

- Read and understand the Issue description
- Search for related code files in the codebase
- Analyze code structure and impact scope
- Identify technical risks and dependencies
- Estimate complexity and effort

5. **Output analysis document**

Create `.ai-workspace/active/{task-id}/analysis.md` with sections:
- Requirement understanding
- Related files list
- Impact assessment (direct and indirect)
- Technical risks
- Dependencies
- Complexity and effort estimation

6. **Update task status**

Update task.md: current_step: requirement-analysis, assigned_to: opencode, updated_at: {current timestamp}. Mark analysis as complete.

7. **Report to user**

Report Issue number, task ID, title, output file paths.

**Next step:** Review the analysis, then use `/plan-task {task-id}` to design the technical plan.
