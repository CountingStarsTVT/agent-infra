---
description: Close a Code Scanning (CodeQL) alert with a documented reason
argument-hint: <alert-number>
---

Close Code Scanning (CodeQL) alert #$1. Requires user confirmation and a documented reason before closing.

Execute the following steps:

1. Fetch alert info:
   ```bash
   gh api "repos/{owner}/{repo}/code-scanning/alerts/$1"
   ```
   If already dismissed or fixed, inform the user and stop.

2. Display alert details:
   - Severity, rule ID, rule description, tool name, file location.

3. Ask for close reason:
   Options:
   1. False Positive - CodeQL rule misjudgment
   2. Won't Fix - architectural reasons not to fix
   3. Used in Tests - only appears in test code
   4. Cancel - do not close

4. Require detailed explanation (minimum 20 characters).

5. Confirm with user, then execute:
   ```bash
   gh api --method PATCH "repos/{owner}/{repo}/code-scanning/alerts/$1" \
     -f state=dismissed -f dismissed_reason="<reason>" -f dismissed_comment="<comment>"
   ```

6. Inform user:
   - Alert #$1 has been closed
   - To analyze other alerts: `/prompts:collaborator-analyze-codescan <alert-number>`

**Note**: Exercise caution with Critical/High alerts. Prefer fixing over dismissing. Consider using `/prompts:collaborator-analyze-codescan $1` first.
