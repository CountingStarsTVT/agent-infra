---
description: Analyze a Code Scanning alert and create a security analysis document
agent: general
subtask: false
---

Analyze a specified Code Scanning (CodeQL) alert, assess the security risk, and create a task with a security analysis document.

Parse the alert number from `$ARGUMENTS`. If empty, respond:
"Please provide an alert number. Example: /analyze-codescan 5"
Then STOP.

1. **Fetch alert information**

!gh api repos/{owner}/{repo}/code-scanning/alerts/$ARGUMENTS

If the alert does not exist, respond: "Code Scanning alert #$ARGUMENTS not found." Then STOP.

Extract: number, state, rule (id, severity, description, security_severity_level), tool (name, version), most_recent_instance (location, message), html_url.

2. **Create task directory and file**

!date -u +"%Y%m%d-%H%M%S"

Create directory: `.ai-workspace/active/TASK-{yyyyMMdd-HHmmss}/`
Create task.md with codescan_alert_number, severity, rule_id, tool fields.

3. **Locate and analyze source code**

- Read the source file at the alert location with surrounding context
- Understand the CodeQL rule and what it detects
- Analyze why the code triggered the rule
- Search for similar patterns elsewhere in the project
- Evaluate whether this is a false positive

4. **Assess security risk**

- Evaluate actual exploitability
- Analyze whether external input can reach the code path
- Assess impact on system security
- Identify potential attack vectors
- Determine fix urgency and complexity

5. **Output analysis document**

Create `.ai-workspace/active/{task-id}/analysis.md` with sections:
- Alert basic info (number, severity, rule ID, tool, status)
- Alert details (source location, code context, rule explanation)
- Impact assessment
- Security risk evaluation (exploitability, attack vectors, impact, urgency)
- Fix recommendations
- Technical constraints
- Reference links

6. **Update task status**

Update task.md: current_step: security-analysis, assigned_to: opencode, updated_at: {current timestamp}.

7. **Report to user**

Report alert severity, rule, location, task ID, risk level.

**Next steps:**
- Design a fix: `/plan-task {task-id}`
- If false positive: `/close-codescan {alert-number}`
