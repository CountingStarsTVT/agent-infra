---
description: Generate release notes from PRs and commits between two versions
argument-hint: <version> [previous-version]
---

# Create Release Notes

Generate release notes for version $1. Previous version: $2 (if empty, use latest git tag).

## Steps

1. Determine version range:
   - Current version: $1
   - Previous version: $2 or latest git tag:
   ```bash
   git describe --tags --abbrev=0
   ```

2. Collect changes:
   ```bash
   git log <prev-tag>..HEAD --oneline
   gh pr list --state merged --base main --json number,title,labels
   ```

3. Classify changes by type and module:
   - Features (feat)
   - Bug Fixes (fix)
   - Documentation (docs)
   - Refactoring (refactor)
   - Other (chore, test, ci)

4. Generate release notes in Markdown format:
   ```markdown
   # v<version>

   ## Features
   - <feature descriptions>

   ## Bug Fixes
   - <fix descriptions>

   ## Other Changes
   - <other changes>

   **Full Changelog**: <prev-tag>...v<version>
   ```

5. Create GitHub Draft Release:
   ```bash
   gh release create v$1 --draft --title "v$1" --notes-file <notes-file>
   ```

**Note**: Review the draft before publishing. The release is created as a draft intentionally.
