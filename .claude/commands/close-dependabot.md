---
description: Close Dependabot alert with documented reason
---

Close Dependabot alert #$ARGUMENTS.

1. Fetch alert info.
2. Display alert details to user.
3. Ask reason: false positive, not exploitable, mitigated, no fix available, dev dependency only.
4. Require detailed explanation (min 20 characters).
5. Confirm with user.
6. Execute:
   ```bash
   gh api --method PATCH "repos/{owner}/{repo}/dependabot/alerts/$ARGUMENTS" \
     -f state=dismissed -f dismissed_reason="{reason}" -f dismissed_comment="{comment}"
   ```

**Note**: Prefer fixing over dismissing for high-severity alerts.
