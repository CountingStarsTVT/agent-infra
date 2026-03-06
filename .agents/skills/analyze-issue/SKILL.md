---
name: analyze-issue
description: >
  Analyze a GitHub Issue and create a task file with requirement
  analysis document. Triggered when the user requests Issue analysis.
  Argument: issue number.
---

# Analyze Issue

## Steps

1. Fetch Issue info:
   ```bash
   gh issue view <issue-number> --json number,title,body,labels
   ```
2. Generate task ID, create task directory from `.agents/templates/task.md`.
3. Execute requirement analysis (analysis only, no business code).
4. Output analysis document to `analysis.md`.
5. Update task status, mark requirement-analysis as complete.
6. Suggest next step: execute the `plan-task` skill.

**Note**: Do NOT write or modify any business code. Analysis only.
