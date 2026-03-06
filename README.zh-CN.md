# ai-collaborator

用于初始化和维护 AI 多工具协作基础设施及项目治理配置的模板仓库和技能仓库。

[English](README.md)

## 什么是 ai-collaborator？

ai-collaborator 为 AI TUI 工具（Claude Code、Codex、Gemini CLI、OpenCode）提供标准化配置，使它们能在同一项目中高效协作。它**不是 CLI 工具** -- 所有操作通过 AI 技能驱动，任何 TUI 都可以执行。

### 核心特性

- **多 AI 协作**：为 Claude Code、Codex、Gemini CLI 和 OpenCode 提供结构化工作流
- **技能驱动**：所有操作（初始化、更新）都是 AI TUI 可执行的技能定义
- **双语支持**：所有面向用户的文件提供英文和中文两个版本
- **模块化设计**：两个独立模块（`ai` 和 `github`），可单独安装
- **活模板**：仓库自身即模板 -- 无需占位符语法
- **AI 智能合并**：更新时由大模型处理模板合并，保留用户定制内容

### 模块

| 模块 | 职责 | 包含内容 |
|------|------|---------|
| **ai** | AI 多工具协作基础设施 | `.agents/`、`.ai-workspace/`、`.claude/`、`.codex/`、`.gemini/`、`.opencode/`、`AGENTS.md`、`.mailmap` |
| **github** | 项目治理 + 基础配置 | `.github/`、`.editorconfig`、`.gitignore`、`License.txt`、`README.md`、`CONTRIBUTING.md`、`SECURITY.md` |

## 快速开始

### 1. 克隆模板源

```bash
git clone https://github.com/fitlab-ai/ai-collaborator ~/.ai-collaborator
```

### 2. 初始化新项目

在目标项目中打开任意 AI TUI，执行初始化命令：

| TUI | 命令 |
|-----|------|
| Claude Code | `/init-project` |
| Codex | `/prompts:collaborator-init-project` |
| Gemini CLI | `/collaborator:init-project` |
| OpenCode | `/init-project` |

AI 会交互式收集项目信息并生成协作基础设施。

### 3. 更新已有项目

先更新模板源，再在项目中执行更新命令：

```bash
# 更新模板源
git -C ~/.ai-collaborator pull

# 然后在 AI TUI 中
/update-project
```

## 文件管理策略

| 策略 | 含义 | 更新行为 |
|------|------|---------|
| **managed** | ai-collaborator 完全控制 | 更新时覆盖，用户不应修改 |
| **merged** | 模板 + 用户定制共存 | AI 智能合并，保留用户添加的内容 |
| **ejected** | 仅初始化时生成 | 永不更新 |

用户可在 `collaborator.json` 中按文件调整策略。

## 版本管理

通过 git tag 使用语义版本号。版本记录在 `collaborator.json` 中。

## 参与贡献

请参阅 [CONTRIBUTING.md](CONTRIBUTING.md) 了解开发指南。

## 许可协议

[MIT](License.txt)
