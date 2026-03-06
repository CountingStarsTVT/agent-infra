---
description: Create Pull Request to specified or auto-detected target branch
---

Create a Pull Request. Optional argument: target branch $ARGUMENTS.

1. Determine target branch (from argument or `git log`).
2. Read PR template: `.github/PULL_REQUEST_TEMPLATE.md`.
3. View recent merged PRs for format reference: `gh pr list --state merged -L 3`.
4. Analyze current branch changes:
   `git log {target}..HEAD --oneline`
   `git diff {target}...HEAD --stat`
5. Push if not yet pushed: `git push -u origin {branch}`.
6. Create PR using `gh pr create` with template format.
