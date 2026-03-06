---
description: Generate release notes from PRs and commits
---

Generate release notes for version $ARGUMENTS.

1. Determine version range:
   - Current version from argument
   - Previous version: latest git tag or argument
2. Collect changes:
   ```bash
   git log {prev-tag}..HEAD --oneline
   gh pr list --state merged --base main --json number,title,labels
   ```
3. Classify changes by type (features, fixes, docs, etc.) and module.
4. Generate release notes in Markdown format.
5. Create GitHub Draft Release:
   ```bash
   gh release create v{version} --draft --title "v{version}" --notes-file {notes}
   ```

**Note**: Review draft before publishing.
