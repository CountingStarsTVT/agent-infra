---
name: commit
description: >
  Commit current changes to Git, including copyright header year
  check and task status update. Triggered when the user requests
  a code commit or save changes.
---

# Commit Changes

## Step 0: Check local modifications (CRITICAL)

```bash
git status --short
git diff
```

Carefully read the `git diff` output. Make incremental edits on top of user modifications. Do not overwrite the user's implementation.

## Step 1: Copyright header year check (CRITICAL)

```bash
current_year=$(date +%Y)
echo "Current year: $current_year"
```

Check and update copyright headers for each modified file.

## Step 2: Analyze changes and generate commit message

Commit message format (Conventional Commits):
- `<type>(<scope>): <subject>`, subject in English imperative mood, max 50 chars

Signature (use your own model name):
```
Co-Authored-By: <Your Model Name> <noreply@provider.com>
```

## Step 3: Create commit

```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <subject>

<body>

Co-Authored-By: <Your Model Name> <noreply@provider.com>
EOF
)"
```

## Post-commit: Task status update

Update task status as appropriate.
