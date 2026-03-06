---
description: Generate release notes from Git history
agent: general
subtask: false
---

Generate release notes based on Git commit history since the last release.

1. **Find the last release tag**

!git tag --sort=-version:refname | head -5

If no tags exist, use the initial commit as the starting point:
!git rev-list --max-parents=0 HEAD

2. **Collect commits since last release**

!git log {last-tag}..HEAD --oneline --no-merges

3. **Categorize changes**

Group commits by type based on Conventional Commits prefixes:
- **Features** (feat): New functionality
- **Bug Fixes** (fix): Bug fixes
- **Documentation** (docs): Documentation updates
- **Refactoring** (refactor): Code refactoring
- **Tests** (test): Test additions/modifications
- **Chores** (chore): Maintenance tasks

4. **Check for breaking changes**

Search commit messages for "BREAKING CHANGE" or "!" after the type:
!git log {last-tag}..HEAD --oneline --no-merges --grep="BREAKING"

5. **Generate release notes**

Format the release notes in Markdown:

```
## What's Changed

### Breaking Changes
- {breaking change descriptions}

### Features
- {feature descriptions with PR/commit references}

### Bug Fixes
- {fix descriptions}

### Other Changes
- {other changes}

### Contributors
- {list of contributors}

**Full Changelog:** {last-tag}...{new-tag}
```

6. **Output the release notes**

Display the generated release notes for the user to review and edit.

**Next step:** Copy the notes to create a GitHub release using `gh release create`.
