---
description: Refine an Issue or PR title to Conventional Commits format
agent: general
subtask: false
---

Analyze the content of a GitHub Issue or PR and rewrite its title to follow Conventional Commits format: `type(scope): subject`.

Parse the ID from `$ARGUMENTS`. If empty, respond:
"Please provide an Issue or PR number. Example: /refine-title 1024"
Then STOP.

1. **Identify and fetch information**

Try to determine if the ID is an Issue or PR:

!gh issue view $ARGUMENTS --json number,title,body,labels,state 2>/dev/null
!gh pr view $ARGUMENTS --json number,title,body,labels,state,files 2>/dev/null

If neither exists, respond: "Issue/PR #$ARGUMENTS not found." Then STOP.

2. **Deep analysis**

Determine the type from body content, labels, and (for PRs) file changes:
- `fix` - bug fixes, labels like "type: bug"
- `feat` - new features, labels like "type: feature"
- `docs` - documentation only changes
- `test` - test only changes
- `refactor` - code restructuring
- `chore` - maintenance

Determine the scope from body mentions, labels, and file paths.

Generate the subject by reading the body (ignore the original title to avoid bias). Keep it under 50 characters, English, imperative mood, no period.

3. **Present suggestion**

Show the analysis and suggested new title:

```
Analysis target: Issue/PR #{id}

Current title: {original title}
--------------------------------------------------
Analysis:
- Intent: {one-sentence summary from body}
- Inferred type: {type} (based on: {evidence})
- Inferred scope: {scope} (based on: {evidence})
--------------------------------------------------
Suggested title: {type}({scope}): {subject}
```

Ask: "Confirm this title change? (y/n)"

4. **Execute change**

If confirmed:
- For Issues: `!gh issue edit $ARGUMENTS --title "{new-title}"`
- For PRs: `!gh pr edit $ARGUMENTS --title "{new-title}"`

If not confirmed, respond: "Cancelled. No changes made." Then STOP.
