---
name: sync-issue
description: >
  Sync task progress to the corresponding GitHub Issue as a comment.
  Triggered when the user requests syncing progress to an Issue.
  Argument: task-id.
---

# Sync Progress to Issue

## Steps

1. Find task file, get issue_number from task.md.
2. Read context files, extract key progress.
3. Generate progress summary.
4. Sync: `gh issue comment <issue-number> --body "<summary>"`

**Note**: Keep summary concise and human-readable.
