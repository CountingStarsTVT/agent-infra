---
description: Execute version release workflow
---

Execute version release for $ARGUMENTS (X.Y.Z format).

1. Parse and validate version number.
2. Check workspace: `git status` (must be clean).

<!-- TODO: Add your project's release steps -->

3. Update version references in project files.
4. Create release commit:
   ```bash
   git add .
   git commit -m "chore: release v{version}"
   ```
5. Create git tag:
   ```bash
   git tag -a v{version} -m "Release v{version}"
   ```
6. Provide rollback instructions.

**Note**: Do NOT push automatically. Let user review and push.
