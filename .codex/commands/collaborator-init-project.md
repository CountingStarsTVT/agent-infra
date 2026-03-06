---
description: Initialize a new project from ai-collaborator templates
usage: /prompts:collaborator-init-project
---

# Initialize Project

Initialize a new project with AI collaboration infrastructure and project governance from ai-collaborator templates.

## Input

Ask the user for the following information:
- **project_name**: Project name
- **org_name**: Organization or owner name
- **repo_url**: GitHub repository URL
- **branch_prefix**: Branch naming prefix (default: "{project_name}-")
- **language**: "en" | "zh-CN" (language for skills, commands, and docs)
- **license**: "MIT" | "Apache-2.0"
- **modules**: Which modules to install (default: all)
  - [x] ai - AI multi-tool collaboration (agents, skills, commands, workspace)
  - [x] github - Project governance (issue templates, PR template, CI, contributing, security, editor config, gitignore, license)

## Step 1: Locate templates

Read template files from ai-collaborator repository.
If running from within ai-collaborator repo, use the current directory.
Otherwise, read from `~/.ai-collaborator/`.

## Step 2: Process ai module (if selected)

### 2a: Copy language-neutral files
Copy directly (no modification needed): `.mailmap`, `.ai-workspace/` directory structure.

### 2b: Install bilingual-selected files
Based on the language setting, select the appropriate version and install:
- Task templates (.agents/templates/)
- Workflows (.agents/workflows/)
- .ai-workspace/README.md

### 2c: Install skills (language-aware)
For each skill directory in `.agents/skills/`:
- Skip `init-project/` (ai-collaborator only)
- Select language version: `SKILL.md` or `SKILL.zh-CN.md` -> `SKILL.md`
- Include `update-project/` skill

### 2d: Install AI tool commands (language-aware)
For each tool (Claude, Codex, Gemini, OpenCode):
- Read the tool's command files from ai-collaborator
- Select the appropriate language version
- Adapt project references (replace "collaborator" with project_name)
- Skip `init-project` command (ai-collaborator only)
- Include `update-project` command
- Install tool README files (language-selected)

### 2e: Generate AGENTS.md (language-selected)
Adapt from ai-collaborator, replace project name/org/repo URL.
Mark tech-stack sections with TODO comments.

### 2f: Generate AI tool config files (language-selected)
Adapt Claude Code, Codex, Gemini, and OpenCode config files.

### 2g: Generate .agents/README.md (language-selected)
Adapt the collaboration guide with project-specific info.

## Step 3: Process github module (if selected)

### 3a: Copy GitHub config
`.github/ISSUE_TEMPLATE/*`, PR template, `pr-title-check.yml`.

### 3b: Copy base config
`.editorconfig`, `.gitignore`.

### 3c: Generate documents
CONTRIBUTING.md, SECURITY.md, License.txt, README.md + README.zh-CN.md.

## Step 4: Generate collaborator.json

Create `collaborator.json` in project root with all config values.

## Step 5: Output summary

Report modules installed, files created, TODO markers, and next steps.

**STOP**: Do not set up tech stack or write business code.
