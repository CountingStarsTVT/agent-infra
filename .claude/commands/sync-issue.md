---
description: Sync task progress to GitHub Issue comment
---

Sync progress of task $ARGUMENTS to its Issue.

1. Find task file, get issue_number from task.md.
2. Read context files.
3. Generate progress summary.
4. Post comment: `gh issue comment {issue-number} --body "{summary}"`.
5. Update task with last_synced_at.
