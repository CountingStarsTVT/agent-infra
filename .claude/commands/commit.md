---
description: Commit current changes to Git with copyright header check and task status update
---

Commit current changes to Git.

**Step 0: Check local modifications (CRITICAL)**

1. View modified files:
   `git status --short`
2. View changes:
   `git diff`
3. Read the diff carefully. Make incremental edits on top of user modifications. Never overwrite user's work.

**Step 1: Update copyright header years (CRITICAL)**

1. Get current year:
   `date +%Y`
2. For each modified file, check for copyright headers and update the year.
   Use Edit tool. Never hardcode the year.

**Step 2: Analyze changes and generate commit message**

1. View changes:
   `git status`
   `git diff`
   `git log --oneline -5`
2. Generate commit message in Conventional Commits format:
   - `<type>(<scope>): <subject>` (English imperative mood, max 50 chars)
   - Body: 2-4 bullet points explaining what and why
   - Signature: `Co-Authored-By: Claude <noreply@anthropic.com>`

**Step 3: Create commit**

```bash
git add <specific-files>
git commit -m "$(cat <<'EOF'
<type>(<scope>): <subject>

<body>

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

**Step 4: Update task status (if task-related commit)**

Update task.md as appropriate.
