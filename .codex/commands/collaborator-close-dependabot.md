---
description: Close a Dependabot security alert with a documented reason
argument-hint: <alert-number>
---

Close Dependabot security alert #$1. Requires user confirmation and a documented reason before closing.

Execute the following steps:

1. Fetch alert info:
   ```bash
   gh api "repos/{owner}/{repo}/dependabot/alerts/$1"
   ```
   If already dismissed or fixed, inform the user and stop.

2. Display alert details:
   - Severity, vulnerability summary, affected package, fix version.

3. Ask for close reason:
   Options:
   1. False Positive - vulnerable code path not used
   2. Not Exploitable - cannot be exploited in current context
   3. Mitigated - other mitigation measures in place
   4. No Fix Available - risk is acceptable
   5. Dev Only - test or development dependency
   6. Cancel - do not close

4. Require detailed explanation (minimum 20 characters).

5. Confirm with user, then execute:
   ```bash
   gh api --method PATCH "repos/{owner}/{repo}/dependabot/alerts/$1" \
     -f state=dismissed -f dismissed_reason="<reason>" -f dismissed_comment="<comment>"
   ```

6. Inform user:
   - Alert #$1 has been closed
   - To analyze other alerts: `/prompts:collaborator-analyze-dependabot <alert-number>`

**Note**: Exercise caution with Critical/High alerts. Prefer fixing over dismissing. Consider using `/prompts:collaborator-analyze-dependabot $1` first.
