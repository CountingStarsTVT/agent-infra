---
name: close-dependabot
description: >
  Close a Dependabot security alert with a documented reason.
  Triggered when the user requests closing a Dependabot alert.
  Argument: alert number.
---

# Close Dependabot Alert

## Steps

1. Fetch alert info.
2. Display alert details.
3. Ask user for reason (false positive, not exploitable, mitigated, etc.).
4. Require detailed explanation (minimum 20 characters).
5. Confirm with user before closing.
6. Execute close:
   ```bash
   gh api --method PATCH "repos/{owner}/{repo}/dependabot/alerts/<alert-number>" \
     -f state=dismissed -f dismissed_reason="<reason>" -f dismissed_comment="<comment>"
   ```

**Note**: Exercise caution when closing high-severity alerts. Prefer fixing over dismissing.
