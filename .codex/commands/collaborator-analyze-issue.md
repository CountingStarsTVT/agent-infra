---
description: Analyze a GitHub Issue and create a task with requirement analysis
argument-hint: <issue-number>
---

Analyze GitHub Issue #$1 and create a task file with requirement analysis document.

Execute the following steps:

1. Fetch Issue info:
   ```bash
   gh issue view $1 --json number,title,body,labels
   ```
   If the Issue does not exist, inform the user and stop.

2. Generate task ID:
   ```bash
   date +%Y%m%d-%H%M%S
   ```

3. Create task directory:
   ```bash
   mkdir -p .ai-workspace/active/TASK-<timestamp>/
   ```
   Create task.md based on `.agents/templates/task.md`:
   - Fill in metadata: issue_number=$1, title, created_at, workflow
   - created_by: human
   - current_step: requirement-analysis
   - assigned_to: codex

4. Execute requirement analysis (analysis only, no business code):
   - Read and understand the Issue description
   - Search related code files (read only, do not modify)
   - Analyze code structure and impact scope
   - Identify technical risks and dependencies
   - Estimate effort and complexity

5. Output analysis document to analysis.md containing:
   - Requirement understanding
   - Related files list (with file paths and line numbers)
   - Impact scope assessment
   - Technical risks
   - Dependencies
   - Effort and complexity estimate

6. Update task status:
   - current_step: requirement-analysis
   - updated_at: current time
   - Mark requirement-analysis as complete in workflow progress

7. Inform user:
   - Output task ID, title, workflow
   - Display output file paths
   - Suggest next step: `/prompts:collaborator-plan-task <task-id>`

**Note**: Do NOT write or modify any business code. Analysis only.

**STOP**: Stop immediately after completion. Do not continue to subsequent steps.
