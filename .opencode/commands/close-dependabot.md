---
description: Close a Dependabot security alert with a documented reason
agent: general
subtask: false
---

Close a specified Dependabot security alert after user confirmation with a documented reason.

Parse the alert number from `$ARGUMENTS`. If empty, respond:
"Please provide an alert number. Example: /close-dependabot 23"
Then STOP.

1. **Fetch alert information**

!gh api repos/{owner}/{repo}/dependabot/alerts/$ARGUMENTS

If the alert does not exist, respond: "Dependabot alert #$ARGUMENTS not found." Then STOP.
If already dismissed or fixed, respond: "Alert #$ARGUMENTS is already {state}." Then STOP.

2. **Display alert details**

Show the user: severity, summary, affected package, current version, vulnerable range, patched version, GHSA/CVE IDs.

3. **Ask for dismissal reason**

Ask the user to choose a reason:
1. False Positive - vulnerable code path is not used
2. Not Exploitable - cannot be exploited in current context
3. Mitigated - risk addressed through other means
4. No Fix Available - acceptable risk with no fix
5. Dev Dependency Only - not used in production
6. Cancel - do not close

If the user chooses Cancel, respond: "Cancelled." Then STOP.

4. **Request detailed explanation**

Ask the user to provide a detailed explanation (minimum 20 characters) for the dismissal record.

5. **Confirm before closing**

Show the dismissal summary and ask for final confirmation (y/N).
If not confirmed, respond: "Cancelled." Then STOP.

6. **Execute dismissal**

Map the user's choice to the GitHub API dismissed_reason:
- False Positive: `not_used` or `inaccurate`
- Not Exploitable: `tolerable_risk`
- Mitigated: `tolerable_risk`
- No Fix Available: `tolerable_risk`
- Dev Dependency Only: `not_used`

!gh api --method PATCH repos/{owner}/{repo}/dependabot/alerts/$ARGUMENTS -f state=dismissed -f dismissed_reason="{reason}" -f dismissed_comment="{explanation}"

7. **Update task if exists**

Search for a related task and update its status if found.

8. **Report to user**

Confirm closure with alert details, reason, and a link to the alert page.
