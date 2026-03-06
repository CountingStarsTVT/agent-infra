---
description: Create a Pull Request
agent: general
subtask: false
---

Create a Pull Request for the current branch.

1. **Determine target branch**

If `$ARGUMENTS` is provided, use it as the target branch. Otherwise, infer:

!git branch --show-current
!git log --oneline --decorate --first-parent -20

- On a main/version branch: target is the current branch
- On a feature branch: find the nearest parent main branch from log decorations
- If unclear: ask the user

2. **Read PR template**

Check for `.github/PULL_REQUEST_TEMPLATE.md` and read it if it exists.

3. **Review recent merged PRs for style reference**

!gh pr list --limit 3 --state merged --json number,title,body

4. **Analyze current branch changes**

!git status --short
!git log {target-branch}..HEAD --oneline
!git diff {target-branch}...HEAD --stat

5. **Push branch if needed**

!git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null || echo "No upstream"

If no upstream is set:
!git push -u origin $(git branch --show-current)

6. **Create Pull Request**

Create the PR using the template format, referencing recent PR styles. Include a generation marker at the end of the body.

!gh pr create --base {target-branch} --title "{title}" --body "{body}"

The PR body must end with a generation attribution line.

7. **Report to user**

Display the PR URL.

**Next step:** Use `/sync-pr {task-id}` to sync progress, or `/complete-task {task-id}` when done.
