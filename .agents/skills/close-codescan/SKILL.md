---
name: close-codescan
description: >
  Close a Code Scanning (CodeQL) alert with a documented reason.
  Triggered when the user requests closing a code scanning alert.
  Argument: alert number.
---

# Close Code Scanning Alert

## Steps

1. Fetch alert info.
2. Display alert details (rule, location, message).
3. Ask user for reason (false positive, won't fix, test code).
4. Require detailed explanation (minimum 20 characters).
5. Confirm with user before closing.
6. Execute close:
   ```bash
   gh api --method PATCH "repos/{owner}/{repo}/code-scanning/alerts/<alert-number>" \
     -f state=dismissed -f dismissed_reason="<reason>" -f dismissed_comment="<comment>"
   ```

**Note**: Exercise caution when closing high-severity alerts. Prefer fixing over dismissing.
