---
description: Commit current changes to Git with conventional commit message
agent: general
subtask: false
---

Commit current changes to Git following Conventional Commits format.

1. **Check local modifications**

!git status --short
!git diff
!git diff --cached

If there are no changes (no untracked, modified, or staged files), respond:
"No changes to commit."
Then STOP.

2. **Check copyright headers**

!date +%Y

For each modified file, check if it contains a copyright header. If the year is outdated, update it to include the current year before committing.

3. **Review recent commits for style reference**

!git log --oneline -5

4. **Stage relevant files**

Stage files related to the current work. Do NOT stage sensitive files (.env, credentials, secrets).

5. **Draft commit message**

Analyze all staged changes and draft a commit message following Conventional Commits:

```
<type>(<scope>): <subject>
```

- type: feat, fix, docs, refactor, test, chore
- scope: optional, the affected module
- subject: English, imperative mood, under 50 characters

6. **Create the commit**

Execute the commit with the drafted message. Append the co-authored-by line:

```
Co-Authored-By: OpenCode <noreply@opencode.ai>
```

7. **Verify commit**

!git log --oneline -1
!git status --short

8. **Update task status if applicable**

If this commit is part of a task workflow, update the task.md file with the current timestamp and commit hash.

**Next step:** Use `/create-pr` to create a Pull Request, or `/complete-task` if the task is finished.
