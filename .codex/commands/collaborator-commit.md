---
description: Commit changes with copyright header year check and task status update
usage: /prompts:collaborator-commit
---

# Commit Changes

Commit current changes to Git, including copyright header year check and task status update.

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

For each modified file, check if it contains a copyright header.
If the year is not current, update it:
- `Copyright (C) 2024-2025` -> `Copyright (C) 2024-<current_year>`
- `Copyright (C) 2024` -> `Copyright (C) 2024-<current_year>`

**Checklist**:
- [ ] Used `date +%Y` to get current year dynamically (never hardcode)
- [ ] Checked all modified files for copyright headers
- [ ] Updated outdated copyright years
- [ ] Only updated modified files, not all project files

## Step 2: Analyze changes and generate commit message

Commit message format (Conventional Commits):
- `<type>(<scope>): <subject>`, subject in English imperative mood, max 50 chars

Codex signature:
```
Co-Authored-By: Codex <noreply@openai.com>
```

## Step 3: Create commit

```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <subject>

<body>

Co-Authored-By: Codex <noreply@openai.com>
EOF
)"
```

## Post-commit: Task status update

If in a task workflow, update task.md:
- Update `updated_at` to current time
- Update `current_step` as appropriate
- If task is complete, suggest executing the `complete-task` command

**Next steps**:
- Review code: `/prompts:collaborator-review-task <task-id>`
- Create PR: `/prompts:collaborator-create-pr <target-branch>`
- Complete task: `/prompts:collaborator-complete-task <task-id>`
