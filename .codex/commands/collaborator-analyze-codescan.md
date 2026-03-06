---
description: Analyze a Code Scanning (CodeQL) alert, assess risk, and create a remediation task
argument-hint: <alert-number>
---

Analyze Code Scanning (CodeQL) alert #$1, assess security risk, and create a remediation task.

Execute the following steps:

1. Fetch alert info:
   ```bash
   gh api repos/{owner}/{repo}/code-scanning/alerts/$1
   ```
   Extract: rule.id, severity, security_severity_level, tool.name, location, message, html_url.

2. Create task directory and files:
   ```bash
   date +%Y%m%d-%H%M%S
   mkdir -p .ai-workspace/active/TASK-<timestamp>/
   ```
   Create task.md based on `.agents/templates/task.md`:
   - codescan_alert_number: $1
   - severity, rule_id, tool
   - current_step: security-analysis
   - assigned_to: codex

3. Locate and analyze source code:
   - Find the source file and line from alert location
   - Read surrounding context (20 lines before and after)
   - Analyze why the rule triggered
   - Check for the same pattern in other locations

4. Assess security risk:
   - Actual impact (exploitability)
   - Code path reachability (can external input reach the vulnerable point?)
   - Fix urgency and complexity

5. Output analysis document to analysis.md containing:
   - Alert basic info (number, severity, rule ID, tool)
   - Alert details (source location, code context, rule description)
   - Impact scope assessment (affected code and similar patterns)
   - Security risk assessment (exploitability, attack vectors, impact level)
   - Fix suggestions and complexity estimate
   - Reference links

6. Update task status:
   - current_step: security-analysis
   - updated_at: current time
   - Mark analysis.md as complete

7. Inform user:
   - Output severity, rule ID, task ID, risk level
   - To design fix: `/prompts:collaborator-plan-task <task-id>`
   - If false positive: `/prompts:collaborator-close-codescan $1`

**Note**: Critical/High -> handle immediately. Medium -> plan. Low -> may defer.
