---
description: Analyze a Dependabot security alert and create a security analysis document
agent: general
subtask: false
---

Analyze a specified Dependabot security alert, assess the risk, and create a task with a security analysis document.

Parse the alert number from `$ARGUMENTS`. If empty, respond:
"Please provide an alert number. Example: /analyze-dependabot 23"
Then STOP.

1. **Fetch alert information**

!gh api repos/{owner}/{repo}/dependabot/alerts/$ARGUMENTS

If the alert does not exist, respond: "Dependabot alert #$ARGUMENTS not found." Then STOP.

Extract: number, state, security_advisory (ghsa_id, cve_id, severity, summary, description), dependency (package name, ecosystem, manifest_path), vulnerable_version_range, first_patched_version.

2. **Create task directory and file**

!date -u +"%Y%m%d-%H%M%S"

Create directory: `.ai-workspace/active/TASK-{yyyyMMdd-HHmmss}/`
Create task.md with security_alert_number, severity, cve_id, ghsa_id fields.

3. **Analyze affected scope**

- Identify the affected dependency and version
- Search the project for all usage of the dependency
- Check dependency files for direct vs transitive dependency
- Analyze whether the vulnerable code path is actually used
- Locate affected code modules

4. **Assess security risk**

- Evaluate actual exploitability
- Analyze trigger conditions and scenarios
- Assess impact on system security
- Identify potential threats
- Determine fix urgency

5. **Output analysis document**

Create `.ai-workspace/active/{task-id}/analysis.md` with sections:
- Alert basic info (number, severity, GHSA/CVE IDs, status)
- Vulnerability details (package, versions, patched version)
- Dependency usage in the project
- Impact assessment
- Security risk evaluation (exploitability, trigger conditions, impact, urgency)
- Technical constraints
- Reference links

6. **Update task status**

Update task.md: current_step: security-analysis, assigned_to: opencode, updated_at: {current timestamp}.

7. **Report to user**

Report alert severity, affected package, task ID, risk level.

**Next steps:**
- Design a fix: `/plan-task {task-id}`
- If false positive: `/close-dependabot {alert-number}`
