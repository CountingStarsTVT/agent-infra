---
name: release
description: >
  Execute the version release workflow. Triggered when the user
  requests a version release. Argument: version number (X.Y.Z).
---

# Version Release

## Steps

1. Parse and validate version number (X.Y.Z format).
2. Check workspace state (clean working directory required).

<!-- TODO: Add your project's release steps below -->

3. Update version references in project files.
   ```bash
   # Example: Update package.json version / pom.xml version / setup.py version
   ```

4. Create release commit.
   ```bash
   git add .
   git commit -m "chore: release vX.Y.Z"
   ```

5. Create git tag.
   ```bash
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   ```

6. Provide rollback instructions in case of issues.

**Note**: Do NOT push automatically. Let the user review and push.
