---
description: 使用 ai-collaborator 模板初始化新项目的 AI 协作基础设施
usage: /prompts:collaborator-init-project
---

# 初始化项目

使用 ai-collaborator 模板初始化新项目的 AI 协作基础设施和项目治理配置。

## 输入

询问用户以下信息：
- **project_name**: 项目名称
- **org_name**: 组织或所有者名称
- **repo_url**: GitHub 仓库 URL
- **branch_prefix**: 分支命名前缀（默认："{project_name}-"）
- **language**: "en" | "zh-CN"（技能、命令和文档的语言）
- **license**: "MIT" | "Apache-2.0"
- **modules**: 安装哪些模块（默认：全部）
  - [x] ai - AI 多工具协作（agents、skills、commands、workspace）
  - [x] github - 项目治理（issue 模板、PR 模板、CI、贡献指南、安全策略、编辑器配置、gitignore、许可证）

## 步骤 1：定位模板

从 ai-collaborator 仓库读取模板文件。
如果在 ai-collaborator 仓库内运行，使用当前目录。
否则，从 `~/.ai-collaborator/` 读取。

## 步骤 2：处理 ai 模块（如果选择）

### 2a：复制语言无关文件
直接复制：`.mailmap`、`.ai-workspace/` 目录结构。

### 2b：安装双语选择文件
根据语言设置选择对应版本并安装：
- 任务模板（.agents/templates/）
- 工作流（.agents/workflows/）
- .ai-workspace/README.md

### 2c：安装技能（语言感知）
跳过 `init-project/`，选择对应语言版本。包含 `update-project/` 技能。

### 2d：安装 AI 工具命令（语言感知）
为每个工具（Claude、Codex、Gemini、OpenCode）安装命令。
适配项目引用（将 "collaborator" 替换为 project_name）。

### 2e：生成 AGENTS.md（语言选择）
从模板适配，标记技术栈部分为 TODO。

### 2f：生成 AI 工具配置文件（语言选择）
适配各工具配置文件。

### 2g：生成 .agents/README.md（语言选择）
适配协作指南。

## 步骤 3：处理 github 模块（如果选择）

### 3a：复制 GitHub 配置
### 3b：复制基础配置
### 3c：生成文档

## 步骤 4：生成 collaborator.json

## 步骤 5：输出摘要

报告安装的模块、创建的文件、TODO 标记和后续步骤。

**停止**：不要设置技术栈或编写业务代码。
