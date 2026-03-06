---
description: Execute the version release workflow
argument-hint: <version>
---

# Version Release

Execute the version release workflow for version $1.

## Steps

1. Parse and validate version number ($1 must follow X.Y.Z format).

2. Check workspace state:
   ```bash
   git status --short
   ```
   Clean working directory required. If dirty, ask user to commit or stash changes first.

<!-- TODO: Add your project's release steps below -->

3. Update version references in project files:
   ```bash
   # Example: Update package.json version / pom.xml version / setup.py version
   ```

4. Create release commit:
   ```bash
   git add .
   git commit -m "$(cat <<'EOF'
   chore: release v$1

   Co-Authored-By: Codex <noreply@openai.com>
   EOF
   )"
   ```

5. Create git tag:
   ```bash
   git tag -a v$1 -m "Release v$1"
   ```

6. Provide rollback instructions:
   ```bash
   # If something goes wrong:
   git tag -d v$1
   git reset --soft HEAD~1
   ```

**Note**: Do NOT push automatically. Let the user review and push:
```bash
git push origin <branch> --follow-tags
```

## Next Steps

- Generate release notes: `/prompts:collaborator-create-release-note $1`
