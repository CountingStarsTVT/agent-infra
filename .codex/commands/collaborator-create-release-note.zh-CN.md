---
description: 根据 PR 和提交记录生成发布说明
argument-hint: <version> [previous-version]
---

# 创建发布说明

为版本 $1 生成发布说明。前一版本: $2（如果为空，使用最新的 git tag）。

## 步骤

1. 确定版本范围:
   - 当前版本: $1
   - 前一版本: $2 或最新 git tag:
   ```bash
   git describe --tags --abbrev=0
   ```

2. 收集变更:
   ```bash
   git log <prev-tag>..HEAD --oneline
   gh pr list --state merged --base main --json number,title,labels
   ```

3. 按类型和模块分类变更: Features、Bug Fixes、Documentation、Refactoring、Other。

4. 生成 Markdown 格式的发布说明。

5. 创建 GitHub Draft Release:
   ```bash
   gh release create v$1 --draft --title "v$1" --notes-file <notes-file>
   ```

**注意**: 发布为草稿状态，请审查后再正式发布。
