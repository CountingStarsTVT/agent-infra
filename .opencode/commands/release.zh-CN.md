---
description: 创建发布版本
agent: general
subtask: false
---

为项目创建新的发布版本。

从 `$ARGUMENTS` 中解析版本号。如果为空，回复：
"请提供版本号。示例：/release 1.2.0"
然后 STOP。

1. **验证版本格式**

确保版本号遵循语义化版本规范（X.Y.Z）。如果不符合，回复：
"无效的版本格式。请使用语义化版本：X.Y.Z（例如 1.2.0）"
然后 STOP。

2. **检查当前状态**

!git status --short
!git log --oneline -5

确保工作目录干净。如果有未提交的变更，回复：
"工作目录有未提交的变更。请先提交或暂存。"
然后 STOP。

3. **更新版本号**

<!-- TODO: 替换为你项目的版本更新流程 -->
<!-- 示例： -->
<!-- Node.js: npm version {version} --no-git-tag-version -->
<!-- Python: 更新 pyproject.toml 或 setup.py -->
<!-- Java: mvn versions:set -DnewVersion={version} -->
!npm version $ARGUMENTS --no-git-tag-version

4. **更新变更日志（如适用）**

<!-- TODO: 替换为你项目的变更日志流程 -->
检查 CHANGELOG.md 并更新自上次发布以来的变更。

5. **运行测试**

<!-- TODO: 替换为你项目的测试命令 -->
!npm test

6. **构建项目**

<!-- TODO: 替换为你项目的构建命令 -->
!npm run build

7. **报告结果**

报告新版本号、变更的文件和测试结果。

不要自动提交或创建标签。让用户审查后使用 `/commit`，然后创建 Git 标签并推送。

**下一步：** 使用 `/commit` 提交版本变更，然后创建 Git 标签并推送。
