# ai-collaborator

A template and skill repository for initializing and maintaining AI multi-tool collaboration infrastructure and project governance across software projects.

[中文版](README.zh-CN.md)

## What is ai-collaborator?

ai-collaborator provides standardized configuration for AI TUI tools (Claude Code, Codex, Gemini CLI, OpenCode) to collaborate effectively on the same project. It is **not a CLI tool** -- all operations are driven by AI skills that any TUI can execute.

### Key Features

- **Multi-AI Collaboration**: Structured workflows for Claude Code, Codex, Gemini CLI, and OpenCode to work together
- **Skill-Driven**: All operations (init, update) are Skill definitions executed by AI TUIs
- **Bilingual Support**: Every user-facing file is available in English and Chinese
- **Modular Design**: Two independent modules (`ai` and `github`) that can be installed separately
- **Live Templates**: The repository itself serves as the template -- no placeholder syntax needed
- **AI Intelligent Merge**: LLMs handle template merging during updates, preserving user customizations

### Modules

| Module | Responsibility | Contents |
|--------|---------------|----------|
| **ai** | AI multi-tool collaboration infrastructure | `.agents/`, `.ai-workspace/`, `.claude/`, `.codex/`, `.gemini/`, `.opencode/`, `AGENTS.md`, `.mailmap` |
| **github** | Project governance + base config | `.github/`, `.editorconfig`, `.gitignore`, `License.txt`, `README.md`, `CONTRIBUTING.md`, `SECURITY.md` |

## Quick Start

### 1. Clone the template source

```bash
git clone https://github.com/fitlab-ai/ai-collaborator ~/.ai-collaborator
```

### 2. Initialize a new project

Open your target project in any AI TUI and run the init command:

| TUI | Command |
|-----|---------|
| Claude Code | `/init-project` |
| Codex | `/prompts:collaborator-init-project` |
| Gemini CLI | `/collaborator:init-project` |
| OpenCode | `/init-project` |

The AI will interactively collect project info and generate the collaboration infrastructure.

### 3. Update an existing project

First update the template source, then run the update command in your project:

```bash
# Update template source
git -C ~/.ai-collaborator pull

# Then in your AI TUI
/update-project
```

## File Management Strategies

| Strategy | Meaning | Update Behavior |
|----------|---------|----------------|
| **managed** | ai-collaborator fully controls | Overwrite on update; users should not modify |
| **merged** | Template + user customizations coexist | AI intelligent merge preserving user additions |
| **ejected** | Generated only at init | Never updated |

Users can adjust strategies per file in `collaborator.json`.

## Version Management

Uses semantic versioning via git tags. Version tracked in `collaborator.json`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## License

[MIT](License.txt)
