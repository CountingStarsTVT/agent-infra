---
description: Initialize project with AI collaboration configuration
agent: general
subtask: false
---

Initialize the project with AI collaboration configuration files (.agents/, .ai-workspace/, etc.).

1. **Check existing configuration**

!ls -la .agents/ 2>/dev/null
!ls -la .ai-workspace/ 2>/dev/null

If `.agents/` already exists, ask the user whether to overwrite or skip.

2. **Create directory structure**

!mkdir -p .agents/templates
!mkdir -p .agents/workflows
!mkdir -p .agents/conventions
!mkdir -p .ai-workspace/active
!mkdir -p .ai-workspace/blocked
!mkdir -p .ai-workspace/completed

3. **Create task template**

Create `.agents/templates/task.md` with YAML frontmatter including fields: id, type, workflow, status, created_at, updated_at, created_by, current_step, assigned_to.

4. **Create workflow definitions**

Create `.agents/workflows/feature-development.yaml` with steps: requirement-analysis, technical-design, implementation, code-review, refinement, finalize.

5. **Update .gitignore**

Ensure `.ai-workspace/` runtime directories are ignored:

```
.ai-workspace/active/
.ai-workspace/blocked/
.ai-workspace/completed/
```

6. **Report results**

List all created files and directories. Suggest the user review the configuration and customize as needed.

**Next step:** Start working on tasks with `/create-task` or `/analyze-issue`.
