---
description: Analyze a Dependabot security alert, assess risk, and create a remediation task
argument-hint: <alert-number>
---

Analyze Dependabot security alert #$1, assess security risk, and create a remediation task.

Execute the following steps:

1. Fetch alert info:
   ```bash
   gh api repos/{owner}/{repo}/dependabot/alerts/$1
   ```
   Extract: severity, summary, package name, vulnerable version range, first patched version, GHSA/CVE ID.

2. Create task directory and files:
   ```bash
   date +%Y%m%d-%H%M%S
   mkdir -p .ai-workspace/active/TASK-<timestamp>/
   ```
   Create task.md based on `.agents/templates/task.md`:
   - security_alert_number: $1
   - severity, cve_id, ghsa_id
   - current_step: security-analysis
   - assigned_to: codex

3. Analyze affected scope:
   - Search for dependency usage in the project
   - Determine if the vulnerable code path is used
   - Identify dependency relationship (direct vs transitive)

4. Assess security risk:
   - Actual impact (exploitability)
   - Trigger conditions and scenarios
   - Urgency of fix

5. Output analysis document to analysis.md containing:
   - Alert basic info (number, severity, GHSA/CVE)
   - Vulnerability details (affected package, version range, fix version)
   - Impact scope assessment
   - Security risk assessment (exploitability, trigger conditions, impact level)
   - Technical dependencies and constraints
   - Reference links

6. Update task status:
   - current_step: security-analysis
   - updated_at: current time
   - Mark analysis.md as complete

7. Inform user:
   - Output severity, task ID, risk level
   - To design fix: `/prompts:collaborator-plan-task <task-id>`
   - If false positive: `/prompts:collaborator-close-dependabot $1`

**Note**: Critical/High -> handle immediately. Medium -> plan. Low -> may defer.
