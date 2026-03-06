---
description: Create a Pull Request to the specified or auto-detected target branch
argument-hint: <target-branch>
---

Create a Pull Request to the specified branch (default: auto-detect parent branch).

Execute the following steps:

1. Determine target branch:
   User-specified target branch: $1
   If empty, auto-detect:
   ```bash
   git branch --show-current
   git log --oneline --decorate --first-parent -20
   ```
   Inference rules:
   - On a core branch (main or version branch like X.Y.x) -> target is that branch
   - On a feature branch -> find nearest parent core branch from log
   - Cannot determine -> ask the user

2. Read PR template:
   ```bash
   cat .github/PULL_REQUEST_TEMPLATE.md
   ```

3. Review recent merged PRs for format reference:
   ```bash
   gh pr list --limit 3 --state merged --json number,title,body
   ```

4. Analyze current branch changes completely:
   ```bash
   git status
   git log <target-branch>..HEAD --oneline
   git diff <target-branch>...HEAD --stat
   ```

5. Check remote branch status; push if not yet pushed:
   ```bash
   git rev-parse --abbrev-ref --symbolic-full-name @{u}
   ```
   If not pushed:
   ```bash
   git push -u origin <current-branch>
   ```

6. Create PR using template format:
   ```bash
   gh pr create --base <target-branch> --title "<title>" --body "$(cat <<'EOF'
   <PR description following template>
   EOF
   )"
   ```

**Next steps**:
- Sync progress to PR: `/prompts:collaborator-sync-pr <task-id>`
- Complete task: `/prompts:collaborator-complete-task <task-id>`

**Note**: PR title must follow Conventional Commits format.
