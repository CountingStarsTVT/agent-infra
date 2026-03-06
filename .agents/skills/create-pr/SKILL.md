---
name: create-pr
description: >
  Create a Pull Request to the specified or auto-detected target branch.
  Triggered when the user requests PR creation.
  Optional argument: target branch.
---

# Create Pull Request

## Steps

1. Determine target branch (user-specified or auto-detected).
2. Read PR template, review recent merged PR formats.
3. Analyze current branch changes completely.
4. Check remote branch status; push if not yet pushed.
5. Create PR with template format.

**Note**: Ensure PR title follows Conventional Commits format.
