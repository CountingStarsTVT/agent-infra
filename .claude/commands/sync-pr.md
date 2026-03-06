---
description: Sync task progress to Pull Request comment
---

Sync progress of task $ARGUMENTS to its PR.

1. Find task file, get PR number from task.md.
2. Read context files (analysis.md, plan.md, implementation.md, review.md).
3. Generate progress summary with completed steps, current progress, next steps.
4. Post comment: `gh pr comment {pr-number} --body "{summary}"`.
5. Update task with last_synced_at.
