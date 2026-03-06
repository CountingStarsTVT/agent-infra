---
name: sync-pr
description: >
  Sync task progress to the corresponding Pull Request as a comment.
  Triggered when the user requests syncing progress to a PR.
  Argument: task-id.
---

# Sync Progress to PR

## Steps

1. Find task file, get PR number from task.md.
2. Read context files, extract key progress.
3. Generate progress summary.
4. Sync: `gh pr comment <pr-number> --body "<summary>"`

**Note**: @mention relevant reviewers in the progress summary.
