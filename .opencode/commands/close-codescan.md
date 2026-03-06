---
description: Close a Code Scanning alert with a documented reason
agent: general
subtask: false
---

Close a specified Code Scanning (CodeQL) alert after user confirmation with a documented reason.

Parse the alert number from `$ARGUMENTS`. If empty, respond:
"Please provide an alert number. Example: /close-codescan 5"
Then STOP.

1. **Fetch alert information**

!gh api repos/{owner}/{repo}/code-scanning/alerts/$ARGUMENTS

If the alert does not exist, respond: "Code Scanning alert #$ARGUMENTS not found." Then STOP.
If already dismissed or fixed, respond: "Alert #$ARGUMENTS is already {state}." Then STOP.

2. **Display alert details**

Show the user: severity, rule ID, rule description, tool name, file location, alert message.

3. **Ask for dismissal reason**

Ask the user to choose a reason:
1. False Positive - CodeQL misjudged; code does not have this vulnerability
2. Won't Fix - known issue but not fixing for architectural/business reasons
3. Used in Tests - only appears in test code, no production impact
4. Cancel - do not close

If the user chooses Cancel, respond: "Cancelled." Then STOP.

4. **Request detailed explanation**

Ask the user to provide a detailed explanation (minimum 20 characters) for the dismissal record.

5. **Confirm before closing**

Show the dismissal summary and ask for final confirmation (y/N).
If not confirmed, respond: "Cancelled." Then STOP.

6. **Execute dismissal**

Map the user's choice to the GitHub API dismissed_reason:
- False Positive: `false positive`
- Won't Fix: `won't fix`
- Used in Tests: `used in tests`

!gh api --method PATCH repos/{owner}/{repo}/code-scanning/alerts/$ARGUMENTS -f state=dismissed -f dismissed_reason="{reason}" -f dismissed_comment="{explanation}"

7. **Update task if exists**

Search for a related task and update its status if found.

8. **Report to user**

Confirm closure with alert details, reason, and a link to the alert page.
