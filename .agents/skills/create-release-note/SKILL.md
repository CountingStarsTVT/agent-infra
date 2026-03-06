---
name: create-release-note
description: >
  Generate release notes from PRs and commits between two versions.
  Triggered when the user requests release note generation.
  Arguments: version number, optional previous version.
---

# Create Release Notes

## Steps

1. Determine version range:
   - Current version from argument
   - Previous version from argument or latest git tag
2. Collect changes:
   ```bash
   git log <prev-tag>..HEAD --oneline
   gh pr list --state merged --base main --json number,title,labels
   ```
3. Classify changes by type (features, fixes, docs, etc.) and module.
4. Generate release notes in Markdown format.
5. Create GitHub Draft Release:
   ```bash
   gh release create vX.Y.Z --draft --title "vX.Y.Z" --notes-file <notes-file>
   ```

**Note**: Review draft before publishing.
