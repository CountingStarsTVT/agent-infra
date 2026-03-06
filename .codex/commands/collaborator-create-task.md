---
description: Create a task from a natural language description and perform requirement analysis
argument-hint: <description>
---

Create a task from the user's natural language description and perform requirement analysis.

**Boundary**: Only produce task.md and analysis.md. Do NOT write business code.

User description: $ARGUMENTS

Execute the following steps:

1. Get current timestamp:
   ```bash
   date '+%Y-%m-%d %H:%M:%S'
   date +%Y%m%d-%H%M%S
   ```

2. Parse user description:
   Extract the following:
   - Task title: concise English title (under 50 chars)
   - Task type: feature|bugfix|refactor|docs|chore (inferred from description)
   - Workflow: feature/docs/chore -> feature-development, bugfix -> bug-fix, refactor -> refactoring

   If the description is unclear, ask the user for clarification before proceeding.

3. Create task directory:
   ```bash
   mkdir -p .ai-workspace/active/TASK-<timestamp>/
   ```
   Create task.md based on `.agents/templates/task.md`:
   - Fill in metadata: id, type, workflow, status, created_at, updated_at
   - created_by: human
   - current_step: requirement-analysis
   - assigned_to: codex

4. Execute requirement analysis (analysis only, no business code):
   - Understand the described requirements
   - Search related code files (read only, do not modify)
   - Analyze code structure and impact scope
   - Identify technical risks and dependencies
   - Estimate effort and complexity

5. Output analysis document to analysis.md containing:
   - Requirement source (user description, quote original text)
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
   - Output task ID, title, type, workflow
   - Display output file paths
   - Suggest next step: execute `plan-task`
     - `/prompts:collaborator-plan-task <task-id>`

**STOP**: Stop immediately after completion. Do not continue to subsequent steps.
