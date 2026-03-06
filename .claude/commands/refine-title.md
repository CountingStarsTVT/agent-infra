---
description: Reformat Issue or PR title to Conventional Commits format
---

Reformat the title of Issue/PR #$ARGUMENTS.

1. Identify target (Issue or PR): `gh issue view $ARGUMENTS` or `gh pr view $ARGUMENTS`.
2. Analyze content to determine:
   - **Type**: from body keywords, labels, and file changes
   - **Scope**: from labels and affected modules
   - **Subject**: extracted from body content (not original title)
3. Generate suggested title: `type(scope): subject`.
4. Show analysis and ask user for confirmation.
5. If confirmed: `gh issue edit $ARGUMENTS --title "{new-title}"` or `gh pr edit`.
