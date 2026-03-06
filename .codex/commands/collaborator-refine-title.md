---
description: Analyze Issue or PR content and reformat the title to Conventional Commits format
argument-hint: <id>
---

Analyze GitHub Issue or PR #$1 content deeply and reformat the title to Conventional Commits format.

Execute the following steps:

1. Identify target and fetch info:
   Try Issue first:
   ```bash
   gh issue view $1 --json number,title,body,labels,state
   ```
   If that fails, try PR:
   ```bash
   gh pr view $1 --json number,title,body,labels,state,files
   ```

2. Smart analysis:
   2.1 Determine Type: read body, check labels (bug->fix, feature->feat), analyze files
   2.2 Determine Scope: analyze affected modules
   2.3 Generate Subject: extract core intent from body (ignore original title), English imperative mood, max 50 chars

3. Present suggestion and ask for confirmation:
   ```
   Analysis target: Issue/PR #$1
   Current title: <original title>
   Analysis basis: <reasoning for type and scope>
   Suggested title: <type>(<scope>): <subject>
   ```
   Ask user: "Confirm the change? (y/n)"

4. After confirmation, execute:
   Issue: `gh issue edit $1 --title "<new-title>"`
   PR: `gh pr edit $1 --title "<new-title>"`

5. Inform user:
   - Old title and new title
   - Confirmation of update

**Note**: Always analyze content first - do not just reformat the original title. Wait for user confirmation before making changes.
