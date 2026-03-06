---
description: Create a release
agent: general
subtask: false
---

Create a new release version for the project.

Parse the version from `$ARGUMENTS`. If empty, respond:
"Please provide a version. Example: /release 1.2.0"
Then STOP.

1. **Validate version format**

Ensure the version follows semantic versioning (X.Y.Z). If not, respond:
"Invalid version format. Use semantic versioning: X.Y.Z (e.g., 1.2.0)"
Then STOP.

2. **Check current state**

!git status --short
!git log --oneline -5

Ensure the working directory is clean. If there are uncommitted changes, respond:
"Working directory has uncommitted changes. Please commit or stash them first."
Then STOP.

3. **Update version**

<!-- TODO: Replace with your project's version update process -->
<!-- Examples: -->
<!-- Node.js: npm version {version} --no-git-tag-version -->
<!-- Python: update pyproject.toml or setup.py -->
<!-- Java: mvn versions:set -DnewVersion={version} -->
!npm version $ARGUMENTS --no-git-tag-version

4. **Update changelog (if applicable)**

<!-- TODO: Replace with your project's changelog process -->
Check for CHANGELOG.md and update it with changes since the last release.

5. **Run tests**

<!-- TODO: Replace with your project's test command -->
!npm test

6. **Build the project**

<!-- TODO: Replace with your project's build command -->
!npm run build

7. **Report results**

Report the new version, changed files, and test results.

Do NOT auto-commit or create tags. Let the user review and use `/commit` followed by tag creation.

**Next step:** Use `/commit` to commit version changes, then create a Git tag and push.
