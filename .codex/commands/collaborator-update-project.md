---
description: Update project AI collaboration config to latest ai-collaborator templates
usage: /prompts:collaborator-update-project
---

# Update Project

Update the current project's AI collaboration infrastructure and project governance to match the latest ai-collaborator templates. Intelligently merges template changes while preserving project-specific customizations.

## Step 1: Read project config

Read `collaborator.json` from project root.
Extract: source, project, org, branchPrefix, language, modules, files (managed/merged/ejected lists).

## Step 2: Locate template source

If source is "self" (ai-collaborator updating itself), use current repository.
Otherwise, read from `~/.ai-collaborator/`.
If not found, report error: "Template source not found. Please clone it first:
`git clone https://github.com/fitlab-ai/ai-collaborator ~/.ai-collaborator`"

## Step 3: Determine update scope

Only process files belonging to modules listed in `collaborator.json.modules`.

## Step 4: Process managed files

For each path in `files.managed` (filtered by active modules):
1. Read corresponding file(s) from template source
2. Select language version based on `language` setting
3. Adapt project references (project name, org, branch prefix)
4. Write to project (overwrite existing)
5. New files in template that don't exist locally -> create them
6. Files in template that were removed -> flag for user, do not auto-delete

## Step 5: Process merged files (AI intelligent merge)

For each path in `files.merged` (filtered by active modules):
1. Read latest template from template source
2. Read current local file
3. Analyze both files: identify template standard sections and user customizations
4. Produce merged result preserving user customizations
5. Write merged result

**Merge principles**:
- When in doubt, preserve user content
- Never silently delete user-added content
- If a template section was both updated and modified by user, keep user's version and note changes

## Step 6: Skip ejected files

Do not touch files listed in `files.ejected`.

## Step 7: Update collaborator.json

Set `templateVersion` to template source's current version.

## Step 8: Output report

Report organized by module and category:
- managed: files updated, new files created, removed files flagged
- merged: files merged, details of what changed
- ejected: files skipped

**STOP**: Do not make other changes to the project.
