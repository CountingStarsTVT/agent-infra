---
description: Close Code Scanning alert with documented reason
---

Close Code Scanning alert #$ARGUMENTS.

1. Fetch alert info.
2. Display alert details (rule, location, message).
3. Ask reason: false positive, won't fix, test code.
4. Require detailed explanation (min 20 characters).
5. Confirm with user.
6. Execute:
   ```bash
   gh api --method PATCH "repos/{owner}/{repo}/code-scanning/alerts/$ARGUMENTS" \
     -f state=dismissed -f dismissed_reason="{reason}" -f dismissed_comment="{comment}"
   ```
