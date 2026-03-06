---
name: refine-title
description: >
  Deeply analyze Issue or PR content and reformat the title to
  Conventional Commits format. Triggered when the user requests
  title optimization. Argument: issue or PR number.
---

# Refine Title

## Steps

1. Identify target (Issue or PR), fetch detailed info.
2. Smart analysis: determine Type, Scope, Subject from content (not original title).
3. Generate suggested title, ask user for confirmation.
4. After confirmation, execute modification.
