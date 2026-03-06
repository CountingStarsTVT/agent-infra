---
description: Create a task from natural language description with requirement analysis
agent: general
subtask: false
---

Create a task from the user's natural language description and perform requirement analysis. This command ONLY produces task.md and analysis.md files -- it does NOT implement anything.

Parse the task description from `$ARGUMENTS`. If empty, respond:
"Please provide a task description. Example: /create-task Add graceful shutdown support"
Then STOP.

1. **Parse user description**

Extract from the description:
- Task title: concise English title (under 50 chars)
- Task type: feature | bugfix | refactor | docs | chore
- Workflow: feature-development | bug-fix | refactoring
- Detailed description: organized version of the original input

If the description is unclear, ask the user for clarification before proceeding.

2. **Create task directory and file**

!date -u +"%Y%m%d-%H%M%S"

Create directory: `.ai-workspace/active/TASK-{yyyyMMdd-HHmmss}/`

Create `task.md` using the template from `.agents/templates/task.md` with metadata:
- id, type, workflow, status: active
- created_at, updated_at, created_by: human
- current_step: requirement-analysis, assigned_to: opencode

3. **Perform requirement analysis**

Analyze the codebase (read-only) to understand:
- Related code files and their structure
- Impact scope (direct and indirect)
- Technical risks and dependencies
- Complexity and effort estimation

4. **Output analysis document**

Create `.ai-workspace/active/{task-id}/analysis.md` with sections:
- Requirement source and original description
- Requirement understanding
- Related files list
- Impact assessment
- Technical risks
- Dependencies
- Complexity and effort estimation

5. **Update task status**

Update task.md: current_step: requirement-analysis, mark analysis as complete.

6. **Report to user**

Report task ID, title, type, workflow, output file paths, and suggest:

**Next step:** Review the analysis, then use `/plan-task {task-id}` to design the technical plan.

STOP here. Do NOT proceed to plan or implement.
